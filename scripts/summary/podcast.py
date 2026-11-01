"""把博客正文生成「男 + 女」双人对谈播客。

流程：
1. 调用 TEXT_* 文本模型，把正文改写成口语化双人对谈（speaker 取值 male / female）。
2. 按台词逐条合成语音。TTS_PROVIDER=openai 时走 audio/speech；
   =grok 时走 xAI /v1/tts，并指定 language=zh。
3. 片头音乐（TTS_INTRO_MUSIC）放在最前，句与句之间插入短留白（TTS_GAP_MUSIC）。
   三段都是 24 kHz / 128 kbps 单声道 mp3，按原始帧顺序拼接。

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
import time
from urllib.parse import urlparse

import httpx
from openai import OpenAI

import config

logger = logging.getLogger(__name__)

MALE = "male"
FEMALE = "female"

# 台词 JSON 里允许出现的 speaker 写法 -> 统一为 male / female
_SPEAKER_ALIASES = {
    MALE: MALE,
    "男": MALE,
    "男声": MALE,
    "男生": MALE,
    "主持人": MALE,
    "host": MALE,
    FEMALE: FEMALE,
    "女": FEMALE,
    "女声": FEMALE,
    "女生": FEMALE,
    "嘉宾": FEMALE,
    "guest": FEMALE,
    "co-host": FEMALE,
}

_DIALOGUE_SYSTEM = (
    "你是中文播客编导。你写的台词会被直接拿去念，"
    "所以必须像两个朋友坐下来聊天，而不是在读稿、写摘要或做播音。"
)

_DIALOGUE_USER = """请把下面的文章改写成一段「男声 + 女声」的双人对谈播客台词。

听感要对齐这种开场（只学口气，不要照抄内容）：
男：今天咱们想聊的是，一件事看起来大家都在参与，其实背后是谁在赢、谁在亏。
女：对，这个挺实际的。那咱们直接开始吧。
男：先把三种情况说清楚。一起把蛋糕做大，是一种；蛋糕就那么大、你多我少，是另一种。
女：嗯。还有一种是分之前就被抽走一笔，最后大家一起亏。

要求：
1. 输出必须是严格的 JSON 数组，且只输出 JSON，不要代码块、不要前后解释：
   [{"speaker": "male", "text": "……"}, {"speaker": "female", "text": "……"}]
2. speaker 只能取 "male"（男声）或 "female"（女声），两人交替。男声先开口点题。
3. 口气像上面那样：用「咱们」「你」「对」「嗯」「那咱们……」。
   不要旁白，不要「大家好，欢迎收听本期节目」，不要「首先 / 其次 / 综上所述 / 值得注意的是 / 我们来看一下」。
4. 把文章讲成对话，不要逐句复述。一位抛出一个具体事实或判断，另一位用短句接住（赞同、追问、补一句人话），再往下走。
   反应句可以很短，比如「嗯。」「对。」「然后呢？」内容句一般一两句，别写成小段落。
5. 全部写成口播：不要阿拉伯数字和百分号（21% 写成「百分之二十一」，3.15 写成「三点一五」）。
   「致某人的信」说成「写给某人的信」。冷僻书名或难读的英文工具名只出现一次，马上用白话解释，另一位用解释接话，不要反复硬念原名。
6. 全篇 18 到 28 条。信息多就多聊几句，不要为了凑数空转，也不要压成三分钟摘要。
{extra}
文章如下：
{text}"""

_GROK_EXTRA = """
7. 语音引擎能识别少量语气标记。大约每四五句用一次 [pause] 或 [chuckle]，放在句中或句末，不要每句都加，不要用别的括号标记。
"""

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
    """将文章插入提示词，且不把 JSON 示例的大括号当作格式化字段。"""
    if provider is None:
        provider = config.TTS_PROVIDER
    extra = _GROK_EXTRA if provider == "grok" else ""
    return _DIALOGUE_USER.replace("{extra}", extra).replace("{text}", text)


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
        raise ValueError(f"无法识别的说话人：{speaker!r}（仅支持 male / female）")
    return _SPEAKER_ALIASES[key]


def parse_dialogue(content: str) -> list[dict]:
    """把模型输出解析成 [{"speaker": "male"|"female", "text": str}, ...]

    容忍 ```json 代码块围栏，以及模型在 JSON 前后附带的无用文字。
    """
    raw = content.strip()
    fence = re.search(r"```(?:json)?\s*(.*?)```", raw, flags=re.S)
    if fence:
        raw = fence.group(1).strip()
    start, end = raw.find("["), raw.rfind("]")
    if start != -1 and end > start:
        raw = raw[start : end + 1]
    data = json.loads(raw)
    if not isinstance(data, list) or not data:
        raise ValueError(f"对谈台词不是非空数组：{content[:200]}")

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


def _synthesize_utterance(client: OpenAI | None, speaker: str, utterance: str) -> bytes:
    voice = _voice_for(speaker)
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

    片头、句间留白与各条台词按原始 mp3 帧顺序拼接。
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
        if config.TTS_PROVIDER != "grok":
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

        with open(output_path, "wb") as f:
            for segment in segments:
                f.write(segment)
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
