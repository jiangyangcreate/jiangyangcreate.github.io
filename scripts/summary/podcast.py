import asyncio
import hashlib
import json
import logging
import pathlib
import re
import subprocess
import tempfile
import time
from urllib.parse import urlparse

import httpx
import imageio_ffmpeg
from openai import OpenAI

import config

logger = logging.getLogger(__name__)

MALE = "male"
FEMALE = "female"

# 对话生成失败时的最大重试次数、合成并发数（可在 config 里覆盖）
DIALOGUE_ATTEMPTS = getattr(config, "TEXT_DIALOGUE_ATTEMPTS", 3)
TTS_CONCURRENCY = getattr(config, "TTS_CONCURRENCY", 4)

# 校验阈值
MIN_DIALOGUE_LINES = 6
MAX_SHORT_LINE_RATIO = 0.4  # 短行占比超过此值，视为"一句一行"
SHORT_LINE_CHARS = 8
MAX_LINE_CHARS = 400

_SPEAKER_ALIASES = {
    "a": MALE,
    "b": FEMALE,
}


_DIALOGUE_USER = """你是中文播客的脚本作者。把文章改写成两位主持人的口播，像朋友聊天，适合朗读。第一位提问、接话、过渡，第二位讲解。只输出对话正文，不要复述下面的示例。

格式：
一次发言占一行，行与行之间只用一个换行，不要空行。一次发言里不要换行，不要列表、编号或分点。
不要说话人标签，不要写「主持人甲」「主持人乙」「A：」「B：」。
第一行是第一位，之后严格交替。一次只问一个问题。
一件事讲完再换。事实多就继续问，不要把一整节压成一句，也不要为了凑短删掉数字、人名和过程。

内容：
第一位用两三句说本期要聊什么。第二位接一句，说这些是大家会遇到的问题。第一位再以「那我们就直接开始吧」引出第一个问题。
称写文章的人为「作者」，用第三人称，不要用「我」代替作者。作者对听众的建议说成「他建议你可以……」。
按文章顺序讲。换节目前，先接住刚听到的内容，再过渡并提问。
人名、书名、产品名、数字、原话和因果都留下。作者的判断按原意说。
数字和百分比读出来，例如「百分之二十一」「三分钟五十二秒」「八点七万亿元」。Cursor、Python、GPT 这类名字照读，不要翻译，也不要加「也就是」。
叙事按情节讲，留下场景和原话。代码不要逐行念，说它做了什么、页面上看到什么。
链接不必念出网址。没有脚注就不要编「有意思的延伸」；有脚注时，放到接近结尾，用一两句讲清人名、年份和结论。
不要编文章里没有的事实。结尾只由最后一位说一次：收回本期要点，感谢收听，以「我们下期再见，拜拜」结束。

示例（与正文无关，只示范格式和口气）：
这一期聊聊作者怎么给阳台的植物浇水。
听起来是小事，浇错了植物就活不了。
那我们就直接开始吧。作者原来是怎么浇的？
他每天下班浇一次，两个月后龟背竹的叶子发黄，盆土一直是湿的。
根会受不了。后来他改成了什么做法？
他换了一只能看水位的水壶，土干了再浇，浇到盆底刚渗水。他建议你可以先看土，再决定浇不浇。
从每天浇改成看土再浇，植物就稳住了。感谢收听，我们下期再见，拜拜。

文章如下：
{text}"""

_LEADING_LABEL = re.compile(
    r"^(?:[-*]\s*)?(?:\*\*|__)?(?:"
    r"[ABab]|第一位|第二位|男声?|女声?|主持人[甲乙AB]?|嘉宾"
    r")(?:\*\*|__)?\s*[:：]\s*"
)
# 行首的 markdown 残留：标题、列表、编号、引用
_MD_PREFIX = re.compile(r"^(?:#{1,6}\s*|[-*•]\s+|\d+[.、)]\s*|>\s*)")
# 行内的强调和代码标记
_MD_INLINE = re.compile(r"\*\*|__|`")
# 纯分隔线（---、***、===）
_MD_RULE = re.compile(r"^[-=_*\s]*$")

_OPENAI_INSTRUCTIONS = {
    MALE: (
        "Voice: native mainland Chinese man in his early thirties, hosting a casual podcast. "
        "Language: Mandarin only, standard Putonghua, no foreign accent. "
        "Tone: warm, relaxed, thinking out loud with a friend. "
        "Pacing: conversational, with a short pause at commas. "
        "Do not sound like a news anchor, translator, or audiobook narrator. "
        "Pronounce every Chinese character accurately. Read the line exactly and do not add words."
    ),
    FEMALE: (
        "Voice: native mainland Chinese woman in her late twenties, co-hosting a casual podcast. "
        "Language: Mandarin only, standard Putonghua, no foreign accent. "
        "Tone: bright, curious, quick to agree or ask a short question. "
        "Pacing: conversational, questions lift slightly at the end. "
        "Do not sound like a news anchor, customer-service bot, or translator. "
        "Pronounce every Chinese character accurately. Read the line exactly and do not add words."
    ),
}

_SPEECH_TAG = re.compile(
    r"\[(?:pause|long-pause|hum-tune|chuckle|laugh|giggle|cry|tsk|"
    r"tongue-click|lip-smack|breath|inhale|exhale|sigh)\]"
)
_WRAP_TAG = re.compile(
    r"</?(?:whisper|soft|loud|fast|slow|excited|sing|singing)>"
)


class PodcastGenerationError(RuntimeError):
    pass


def _build_dialogue_prompt(text: str) -> str:
    return _DIALOGUE_USER.replace("{text}", text)


def spoken_text(text: str, provider: str | None = None) -> str:
    if provider is None:
        provider = config.TTS_PROVIDER
    if provider == "grok":
        return text.strip()
    cleaned = _WRAP_TAG.sub("", _SPEECH_TAG.sub("", text))
    return re.sub(r"[ \t]{2,}", " ", cleaned).strip()


def _url_to_audio_filename(url: str, ext: str = "mp3") -> str:
    path = urlparse(url).path.lstrip("/")
    return f"{path.replace('/', '_')}.{ext}"


# ---------------------------------------------------------------------------
# 对话解析
# ---------------------------------------------------------------------------


def _normalize_speaker(speaker: str) -> str:
    key = str(speaker).strip().lower()
    if key not in _SPEAKER_ALIASES:
        raise ValueError(f"无法识别的说话人：{speaker!r}")
    return _SPEAKER_ALIASES[key]


def _strip_fence(raw: str) -> str:
    """只有整段输出被代码围栏包住时才剥掉，避免误吞正文。"""
    raw = raw.strip()
    fence = re.fullmatch(r"```(?:\w+)?\s*(.*?)\s*```", raw, flags=re.S)
    if fence:
        return fence.group(1).strip()
    return raw


def _parse_json_dialogue(raw: str) -> list[dict]:
    start, end = raw.find("["), raw.rfind("]")
    if start == -1 or end <= start:
        raise ValueError(f"对谈台词不是非空数组：{raw[:200]}")
    data = json.loads(raw[start : end + 1])
    if not isinstance(data, list) or not data:
        raise ValueError(f"对谈台词不是非空数组：{raw[:200]}")

    lines: list[dict] = []
    for index, item in enumerate(data):
        if not isinstance(item, dict):
            raise ValueError(f"第 {index} 条台词不是对象：{item!r}")
        speaker = _normalize_speaker(item.get("speaker", ""))
        text = str(item.get("text", "")).strip()
        if not text:
            raise ValueError(f"第 {index} 条台词 text 为空")
        lines.append({"speaker": speaker, "text": text})
    return lines


def _clean_line(line: str) -> str:
    stripped = line.strip()
    # markdown 标题不是发言，整行丢弃，否则会打乱两人交替
    if re.match(r"^#{1,6}\s", stripped):
        return ""
    text = _LEADING_LABEL.sub("", stripped)
    text = _MD_PREFIX.sub("", text)
    text = _MD_INLINE.sub("", text).strip()
    if _MD_RULE.fullmatch(text):
        return ""
    return text


def _parse_alternating_lines(raw: str) -> list[dict]:
    lines: list[dict] = []
    for line in raw.splitlines():
        text = _clean_line(line)
        if not text:
            continue
        speaker = MALE if len(lines) % 2 == 0 else FEMALE
        lines.append({"speaker": speaker, "text": text})
    if not lines:
        raise ValueError(f"对谈台词里没有发言：{raw[:200]}")
    return lines


def parse_dialogue(content: str) -> list[dict]:
    raw = _strip_fence(content.strip())
    if re.search(r"\[\s*\{", raw):
        try:
            return _parse_json_dialogue(raw)
        except (ValueError, json.JSONDecodeError):
            pass
    return _parse_alternating_lines(raw)


def validate_dialogue(lines: list[dict]) -> None:
    """脚本不合格就抛 ValueError，让调用方重试。"""
    if len(lines) < MIN_DIALOGUE_LINES:
        raise ValueError(f"台词太少：{len(lines)} 行")
    short = sum(1 for line in lines if len(line["text"]) < SHORT_LINE_CHARS)
    if short / len(lines) > MAX_SHORT_LINE_RATIO:
        raise ValueError(f"短行过多（{short}/{len(lines)}），疑似一句一行")
    longest = max(len(line["text"]) for line in lines)
    if longest > MAX_LINE_CHARS:
        raise ValueError(f"存在过长的单次发言：{longest} 字")


def generate_dialogue(text: str, attempts: int | None = None) -> list[dict]:
    config.require("TEXT_API_KEY", "TEXT_BASE_URL", "TEXT_DIALOGUE_MODEL")
    if attempts is None:
        attempts = DIALOGUE_ATTEMPTS
    client = OpenAI(api_key=config.TEXT_API_KEY, base_url=config.TEXT_BASE_URL)

    last_error: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            completion = client.chat.completions.create(
                model=config.TEXT_DIALOGUE_MODEL,
                messages=[
                    {"role": "user", "content": _build_dialogue_prompt(text)},
                ],
                reasoning_effort="medium",
            )
            choice = completion.choices[0]
            if choice.finish_reason == "length":
                raise ValueError("输出被截断（finish_reason=length）")
            content = re.sub(
                r"<think>.*?</think>", "", choice.message.content or "", flags=re.S
            )
            lines = parse_dialogue(content)
            validate_dialogue(lines)
            return lines
        except Exception as e:
            last_error = e
            logger.warning("对话生成第 %d/%d 次不合格：%s", attempt, attempts, e)
    raise PodcastGenerationError(f"对话生成失败：{last_error}")


# ---------------------------------------------------------------------------
# TTS
# ---------------------------------------------------------------------------


def _voice_for(speaker: str) -> str:
    if config.TTS_PROVIDER == "fish":
        return config.FISH_VOICE_A if speaker == MALE else config.FISH_VOICE_B
    if config.TTS_PROVIDER == "grok":
        return config.XAI_VOICE_MALE if speaker == MALE else config.XAI_VOICE_FEMALE
    return config.TTS_VOICE_MALE if speaker == MALE else config.TTS_VOICE_FEMALE


def _get_tts_client() -> OpenAI:
    return OpenAI(api_key=config.TTS_API_KEY, base_url=config.TTS_BASE_URL)


def _synthesize_openai(client: OpenAI, speaker: str, voice: str, utterance: str) -> bytes:
    kwargs = {
        "model": config.TTS_MODEL,
        "voice": voice,
        "input": utterance,
        "response_format": "mp3",
    }
    if not config.TTS_MODEL.startswith("tts-1"):
        kwargs["instructions"] = _OPENAI_INSTRUCTIONS[speaker]
    response = client.audio.speech.create(**kwargs)
    return response.content


def _synthesize_grok(voice: str, utterance: str) -> bytes:
    response = httpx.post(
        config.XAI_TTS_URL,
        headers={
            "Authorization": f"Bearer {config.XAI_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "text": utterance,
            "voice_id": voice,
            "language": "zh",
            "text_normalization": True,
            "output_format": {
                "codec": "mp3",
                "sample_rate": 24000,
                "bit_rate": 128000,
            },
        },
        timeout=120,
    )
    if response.status_code >= 400:
        detail = response.text[:300]
        raise RuntimeError(f"Grok TTS {response.status_code}: {detail}")
    content_type = response.headers.get("content-type", "")
    if "json" in content_type and not response.content.startswith(b"\xff"):
        raise RuntimeError(f"Grok TTS 返回的不是音频：{response.text[:300]}")
    return response.content


def _synthesize_fish(voice: str, utterance: str) -> bytes:
    response = httpx.post(
        config.FISH_TTS_URL,
        headers={
            "Authorization": f"Bearer {config.FISH_API_KEY}",
            "model": config.FISH_MODEL,
        },
        json={
            "text": utterance,
            "reference_id": voice,
            "format": "mp3",
        },
        timeout=120,
    )
    if response.status_code >= 400:
        raise RuntimeError(f"Fish TTS {response.status_code}: {response.text[:300]}")
    content_type = response.headers.get("content-type", "")
    if "json" in content_type and not response.content.startswith((b"\xff", b"ID3")):
        raise RuntimeError(f"Fish TTS 返回的不是音频：{response.text[:300]}")
    if not response.content:
        raise RuntimeError("Fish TTS 返回空音频")
    return response.content


def _synthesize_utterance(client: OpenAI | None, speaker: str, utterance: str) -> bytes:
    voice = _voice_for(speaker)
    if config.TTS_PROVIDER == "fish":
        return _synthesize_fish(voice, utterance)
    if config.TTS_PROVIDER == "grok":
        return _synthesize_grok(voice, utterance)
    if client is None:
        raise RuntimeError("OpenAI TTS client 未初始化")
    return _synthesize_openai(client, speaker, voice, utterance)


def _synthesize_with_retry(
    client: OpenAI | None, speaker: str, utterance: str, retries: int = 3
) -> bytes:
    for attempt in range(1, retries + 1):
        try:
            return _synthesize_utterance(client, speaker, utterance)
        except Exception as e:
            if attempt == retries:
                raise
            logger.warning("TTS 合成第 %d 次失败（%s），重试…", attempt, e)
            time.sleep(attempt)
    raise RuntimeError("unreachable")


# ---------------------------------------------------------------------------
# 拼接
# ---------------------------------------------------------------------------


def _run_ffmpeg(args: list[str], what: str) -> None:
    result = subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", *args],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "无输出").strip()
        raise RuntimeError(f"{what}失败：{detail[-500:]}")


def _write_podcast_mp3(output_path: pathlib.Path, segments: list[bytes]) -> None:
    """先把每一段统一解码成 24kHz 单声道 wav，再无损拼接，最后只编码一次 mp3。

    这样不同来源（片头音乐 / TTS / 留白）的采样率、声道数不一致时也不会变速变调，
    也避免多次有损编码。
    """
    temporary = output_path.with_suffix(".writing.mp3")
    try:
        with tempfile.TemporaryDirectory(prefix="podcast-") as tmp:
            root = pathlib.Path(tmp)
            wav_cache: dict[str, pathlib.Path] = {}
            lines: list[str] = []
            for index, segment in enumerate(segments):
                # 相同内容（例如句间留白）只转换一次
                key = hashlib.md5(segment).hexdigest()
                wav = wav_cache.get(key)
                if wav is None:
                    src = root / f"{index}.src"
                    wav = root / f"{index}.wav"
                    src.write_bytes(segment)
                    _run_ffmpeg(
                        [
                            "-i", str(src),
                            "-ar", "24000",
                            "-ac", "1",
                            "-c:a", "pcm_s16le",
                            str(wav),
                        ],
                        f"第 {index} 段音频转换",
                    )
                    src.unlink(missing_ok=True)
                    wav_cache[key] = wav
                escaped = str(wav).replace("'", r"'\''")
                lines.append(f"file '{escaped}'")

            list_path = root / "list.txt"
            list_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
            _run_ffmpeg(
                [
                    "-f", "concat",
                    "-safe", "0",
                    "-i", str(list_path),
                    "-c:a", "libmp3lame",
                    "-b:a", "128k",
                    str(temporary),
                ],
                "拼接播客",
            )
            if not temporary.is_file():
                raise RuntimeError("拼接播客失败：未生成输出文件")
        temporary.replace(output_path)
    finally:
        temporary.unlink(missing_ok=True)


def _read_mp3(path: pathlib.Path, label: str) -> bytes:
    if not path.is_file():
        logger.warning("%s不存在（%s），本次跳过", label, path)
        return b""
    data = path.read_bytes()
    logger.info("使用%s：%s（%d 字节）", label, path, len(data))
    return data


async def _synthesize_all(
    client: OpenAI | None, lines: list[dict], url: str
) -> list[bytes]:
    """并发合成所有台词，返回与 lines 下标一一对应的音频（失败/空为 b""）。"""
    semaphore = asyncio.Semaphore(max(1, TTS_CONCURRENCY))
    results: list[bytes] = [b""] * len(lines)

    async def worker(index: int, line: dict) -> None:
        utterance = spoken_text(line["text"], config.TTS_PROVIDER)
        if not utterance:
            return
        async with semaphore:
            audio = await asyncio.to_thread(
                _synthesize_with_retry, client, line["speaker"], utterance
            )
        if not audio:
            logger.warning("第 %d 条台词返回空音频，跳过（%s）", index + 1, url)
            return
        results[index] = audio

    await asyncio.gather(*(worker(i, line) for i, line in enumerate(lines)))
    return results


async def generate_podcast(
    url: str,
    text: str,
    encoding: str = "mp3",
    output_dir: pathlib.Path | None = None,
) -> str | None:
    if not config.tts_configured():
        logger.warning(
            "Podcast skipped: %s credentials not configured", config.TTS_PROVIDER
        )
        return None
    if encoding != "mp3":
        raise ValueError("目前只拼接 mp3")
    if output_dir is None:
        output_dir = config.SUMMARY_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / _url_to_audio_filename(url, encoding)

    try:
        lines = await asyncio.to_thread(generate_dialogue, text)
        if not lines:
            raise RuntimeError(f"No dialogue lines generated for {url}")
        for index, line in enumerate(lines, start=1):
            logger.info("台词 %d %s：%s", index, line["speaker"], line["text"])

        intro = await asyncio.to_thread(
            _read_mp3, pathlib.Path(config.TTS_INTRO_MUSIC), "片头音乐"
        )
        gap = await asyncio.to_thread(
            _read_mp3, pathlib.Path(config.TTS_GAP_MUSIC), "句间留白"
        )

        client = None
        if config.TTS_PROVIDER not in {"grok", "fish"}:
            client = await asyncio.to_thread(_get_tts_client)

        audios = await _synthesize_all(client, lines, url)
        spoken = [audio for audio in audios if audio]
        if not spoken:
            raise RuntimeError(f"No audio data for {url}")

        # 只在两段有效语音之间放留白，最后一段后面不留
        segments: list[bytes] = []
        if intro:
            segments.append(intro)
        for position, audio in enumerate(spoken):
            segments.append(audio)
            if gap and position != len(spoken) - 1:
                segments.append(gap)

        await asyncio.to_thread(_write_podcast_mp3, output_path, segments)
        logger.info(
            "Saved podcast: %s（%d 段语音，%d 字节）",
            output_path,
            len(spoken),
            output_path.stat().st_size,
        )
        return str(output_path)
    except Exception as error:
        logger.exception("Podcast generation failed for %s", url)
        raise PodcastGenerationError(f"播客生成失败：{url}") from error
