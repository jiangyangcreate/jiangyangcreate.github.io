"""把博客正文生成「男 + 女」双人对谈播客。

流程：
1. 调用 TEXT_* 文本模型，把正文改写成 A（提问）/ B（讲解）对谈，再映射为男声 / 女声。
2. 按台词逐条合成语音。TTS_PROVIDER=fish 时走 Fish Audio /v1/tts（A、B 两个 reference_id）；
   =openai 时走 audio/speech；=grok 时走 xAI /v1/tts，并指定 language=zh。
3. 片头音乐（TTS_INTRO_MUSIC）放在最前，句与句之间插入短留白（TTS_GAP_MUSIC）。
   采样率不一致时先转成 24 kHz 单声道 mp3 再拼接。

正文以 input_text 直接传给模型（而非让服务端抓取 URL），
因此新文章在部署上线前也能生成播客。
url 仅用于推导输出文件名。
成功时返回输出文件路径，跳过或失败时返回 None。
"""

import asyncio
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

# 台词里允许出现的 speaker 写法 -> 统一为 male / female。A 提问，B 讲解。
_SPEAKER_ALIASES = {
    MALE: MALE,
    "a": MALE,
    "男": MALE,
    "男声": MALE,
    "男生": MALE,
    "主持人": MALE,
    "host": MALE,
    FEMALE: FEMALE,
    "b": FEMALE,
    "女": FEMALE,
    "女声": FEMALE,
    "女生": FEMALE,
    "嘉宾": FEMALE,
    "guest": FEMALE,
    "co-host": FEMALE,
}

_DIALOGUE_SYSTEM = "你是中文播客的脚本作者。只输出带 A：/B：标签的对话文本。"

_DIALOGUE_USER = """你是中文播客的脚本作者。请把下面的文章改写成两位主持人的对话脚本，语气自然口语，适合朗读。

说话人标签：每一段发言以"A："或"B："开头。A 负责提问、引导和过渡；B 负责解读讲解。两人轮流发言，不要出现其他角色或名字。
开场：A 用 2 到 4 句交代本期要聊什么，B 简短附和这些都是大家常遇到或常聊的问题，再由 A 以"那我们就直接开始吧"收尾。不要念标题、日期、标签和链接。
人称：称原作者为"作者"，转述其观点和经历时用第三人称，不要用"我"代入作者。作者的建议则对听众说"你"，例如"他建议你可以……"。
按文章章节顺序推进。章节之间由 A 用"我们接下来要聊的是……"过渡，并抛出一个问题引出内容。
用一问一答推进。B 回答后，A 用"对""没错""原来如此"等短句回应，并给出一句简短评价。
篇幅由文章内容自然决定，不设固定长度。每个章节只保留最有代表性的数字、案例或专有名词；表格、长列表压缩成一句概括；与主旨关系不大的细节可以省略；链接和网址不念，人名和站名保留。
代码块不要逐行念，用口语说明它做了什么、得到什么效果，必要时可以根据代码推断运行结果。
脚注和引用保留其核心信息（人名、年份、结论），放在接近结尾处，作为一个"有意思的延伸"来讲，并回扣前文相关的观点。
如果文章是叙事或抒情类，不要复述情节，改为解读主题、情绪和象征。
每个章节讲完，用一句话点出结论。
结尾由 A 回顾本期要点，感谢收听，以"我们下期再见，拜拜"收尾。
只输出带标签的对话文本，不加 markdown、标题或舞台提示。

文章如下：
{text}"""

_SPEAKER_LINE = re.compile(
    r"^\s*(?:[-*]\s*)?(?:\*\*|__)?([ABab])(?:\*\*|__)?\s*[:：]\s*(.*?)\s*$",
    re.M,
)

# OpenAI gpt-4o-mini-tts 才理会 instructions；tts-1 会忽略，而且中文口音重。
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
    """已配置播客服务但本次生成失败，调用方应保留任务以便重试。"""


def _build_dialogue_prompt(text: str, provider: str | None = None) -> str:
    """将文章插入提示词。台词规则不随 TTS 提供商变化。"""
    del provider
    return _DIALOGUE_USER.replace("{text}", text)


def spoken_text(text: str, provider: str | None = None) -> str:
    """OpenAI 会把 [pause] 当成要念出来的字，只有 Grok 保留这些标记。"""
    if provider is None:
        provider = config.TTS_PROVIDER
    if provider == "grok":
        return text.strip()
    cleaned = _WRAP_TAG.sub("", _SPEECH_TAG.sub("", text))
    return re.sub(r"[ \t]{2,}", " ", cleaned).strip()


def _url_to_audio_filename(url: str, ext: str = "mp3") -> str:
    path = urlparse(url).path.lstrip("/")
    return f"{path.replace('/', '_')}.{ext}"


def _normalize_speaker(speaker: str) -> str:
    key = str(speaker).strip().lower()
    if key not in _SPEAKER_ALIASES:
        raise ValueError(f"无法识别的说话人：{speaker!r}（仅支持 A / B）")
    return _SPEAKER_ALIASES[key]


def _strip_fence(raw: str) -> str:
    fence = re.search(r"```(?:\w+)?\s*(.*?)```", raw, flags=re.S)
    if fence:
        return fence.group(1).strip()
    return raw.strip()


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


def _parse_labeled_dialogue(raw: str) -> list[dict]:
    """解析「A：…… / B：……」逐行台词。续行并入上一位说话人。"""
    lines: list[dict] = []
    current: dict | None = None
    for line in raw.splitlines():
        match = _SPEAKER_LINE.match(line)
        if match:
            if current and current["text"]:
                lines.append(current)
            current = {
                "speaker": _normalize_speaker(match.group(1)),
                "text": match.group(2).strip(),
            }
            continue
        if current is not None and line.strip():
            extra = line.strip()
            current["text"] = f"{current['text']} {extra}".strip() if current["text"] else extra
    if current and current["text"]:
        lines.append(current)
    if not lines:
        raise ValueError(f"对谈台词里没有 A：/B：发言：{raw[:200]}")
    return lines


def parse_dialogue(content: str) -> list[dict]:
    """把模型输出解析成 [{"speaker": "male"|"female", "text": str}, ...]

    正式格式是 A：/B：逐行台词。A 映射为男声，B 映射为女声。
    仍兼容旧的 JSON 数组，以及 ``` 代码块围栏。
    """
    raw = _strip_fence(content.strip())
    if _SPEAKER_LINE.search(raw):
        return _parse_labeled_dialogue(raw)
    return _parse_json_dialogue(raw)


def generate_dialogue(text: str, provider: str | None = None) -> list[dict]:
    """用 TEXT_* 文本模型把文章改写成双人对谈台词。"""
    config.require("TEXT_API_KEY", "TEXT_BASE_URL", "TEXT_DIALOGUE_MODEL")
    client = OpenAI(api_key=config.TEXT_API_KEY, base_url=config.TEXT_BASE_URL)
    completion = client.chat.completions.create(
        model=config.TEXT_DIALOGUE_MODEL,
        messages=[
            {"role": "system", "content": _DIALOGUE_SYSTEM},
            {"role": "user", "content": _build_dialogue_prompt(text, provider)},
        ],
        temperature=0.7,
    )
    content = completion.choices[0].message.content or ""
    content = re.sub(r"<think>.*?</think>", "", content, flags=re.S)
    return parse_dialogue(content)


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


def _write_podcast_mp3(output_path: pathlib.Path, segments: list[bytes]) -> None:
    """把片头、台词和句间留白转成一条 24 kHz 单声道 mp3。"""
    temporary = output_path.with_suffix(".writing.mp3")
    try:
        with tempfile.TemporaryDirectory(prefix="podcast-") as tmp:
            root = pathlib.Path(tmp)
            lines: list[str] = []
            for index, segment in enumerate(segments):
                src = root / f"{index}.mp3"
                src.write_bytes(segment)
                escaped = str(src).replace("'", r"'\''")
                lines.append(f"file '{escaped}'")
            list_path = root / "list.txt"
            list_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
            result = subprocess.run(
                [
                    imageio_ffmpeg.get_ffmpeg_exe(),
                    "-y",
                    "-loglevel",
                    "error",
                    "-f",
                    "concat",
                    "-safe",
                    "0",
                    "-i",
                    str(list_path),
                    "-ar",
                    "24000",
                    "-ac",
                    "1",
                    "-c:a",
                    "libmp3lame",
                    "-b:a",
                    "128k",
                    str(temporary),
                ],
                capture_output=True,
                text=True,
            )
            if result.returncode != 0 or not temporary.is_file():
                detail = (result.stderr or result.stdout or "无输出").strip()
                raise RuntimeError(f"拼接播客失败：{detail[-500:]}")
        temporary.replace(output_path)
    finally:
        temporary.unlink(missing_ok=True)


def _read_mp3(path: pathlib.Path, label: str) -> bytes:
    """读取一段配套 mp3；文件缺失时跳过（仅告警，不中断）。"""
    if not path.is_file():
        logger.warning("%s不存在（%s），本次跳过", label, path)
        return b""
    data = path.read_bytes()
    logger.info("使用%s：%s（%d 字节）", label, path, len(data))
    return data


async def generate_podcast(
    url: str,
    text: str,
    encoding: str = "mp3",
    output_dir: pathlib.Path | None = None,
) -> str | None:
    """为博客正文生成「男 + 女」双人对谈播客音频。

    片头、句间留白与各条台词写成一条 mp3。
    成功时返回输出文件路径；未配置密钥时返回 None。
    """
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
        lines = await asyncio.to_thread(generate_dialogue, text, config.TTS_PROVIDER)
        if not lines:
            raise RuntimeError(f"No dialogue lines generated for {url}")
        for index, line in enumerate(lines, start=1):
            logger.info("台词 %d %s：%s", index, line["speaker"], line["text"])

        segments: list[bytes] = []
        intro = await asyncio.to_thread(
            _read_mp3, pathlib.Path(config.TTS_INTRO_MUSIC), "片头音乐"
        )
        gap = await asyncio.to_thread(
            _read_mp3, pathlib.Path(config.TTS_GAP_MUSIC), "句间留白"
        )
        if intro:
            segments.append(intro)

        client = None
        if config.TTS_PROVIDER not in {"grok", "fish"}:
            client = await asyncio.to_thread(_get_tts_client)
        speech_count = 0
        for index, line in enumerate(lines, start=1):
            utterance = spoken_text(line["text"], config.TTS_PROVIDER)
            if not utterance:
                continue
            audio = await asyncio.to_thread(
                _synthesize_with_retry, client, line["speaker"], utterance
            )
            if not audio:
                logger.warning("第 %d 条台词返回空音频，跳过（%s）", index, url)
                continue
            segments.append(audio)
            speech_count += 1
            if gap and index != len(lines):
                segments.append(gap)

        if speech_count == 0:
            raise RuntimeError(f"No audio data for {url}")

        await asyncio.to_thread(_write_podcast_mp3, output_path, segments)
        logger.info(
            "Saved podcast: %s（%d 段，%d 字节）",
            output_path,
            len(segments),
            output_path.stat().st_size,
        )
        return str(output_path)
    except Exception as error:
        logger.exception("Podcast generation failed for %s", url)
        raise PodcastGenerationError(f"播客生成失败：{url}") from error
