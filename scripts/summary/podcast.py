"""用 OpenAI text-to-speech 为博客正文生成"男 + 女"双人对谈播客。

流程：
1. 调用 TEXT_* 文本模型，把正文改写成双人对谈脚本（speaker 取值 male / female）。
2. 按台词逐条调用 OpenAI audio/speech（TTS_*，男女各一个 voice）合成 mp3。
3. 若存在片头音乐（TTS_INTRO_MUSIC），整段二进制拼接到语音流最前。

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

_DIALOGUE_SYSTEM = "你是中文播客编导，擅长把技术文章改写成自然、口语化的双人闲聊播客。"

_DIALOGUE_USER = """请把下面的文章改写成一段「男声 + 女声」的双人对谈播客台词：

要求：
1. 输出必须是严格的 JSON 数组，且只输出 JSON，不要代码块、不要前后解释：
   [{"speaker": "male", "text": "……"}, {"speaker": "female", "text": "……"}]
2. speaker 只能取 "male"（男声）或 "female"（女声），两人尽量交替发言。
3. 台词是真实播客口吻：开场寒暄并点题，中间围绕文章聊重点、例子与观点，结尾收束道别；
   不要旁白、场景说明或"下面是……"之类的解说词。
4. 台词必须口语化，像真人聊天、念出来顺口：多用短句、问句、语气词和自然承接
   （如"对""确实""等等，""那你说说……"）；严禁书面语、播音腔和作文腔，
   不要出现"首先/其次/综上所述/值得注意的是/我们来看一下"这类书面连接词，
   也不要逐句复述文章，挑重点聊、允许适当发散。
5. 每条 text 是一整句到三句口语，约 30~100 个汉字，不含换行、不含 speaker 标记。
6. 全篇 12~20 条台词，篇幅与文章信息量匹配，宁短勿灌水。

文章如下：
{text}"""


class PodcastGenerationError(RuntimeError):
    """已配置播客服务但本次生成失败，调用方应保留任务以便重试。"""


def _build_dialogue_prompt(text: str) -> str:
    """将文章插入提示词，且不把 JSON 示例的大括号当作格式化字段。"""
    return _DIALOGUE_USER.replace("{text}", text)


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


def generate_dialogue(text: str) -> list[dict]:
    """用 TEXT_* 文本模型把文章改写成双人对谈台词。"""
    config.require("TEXT_API_KEY", "TEXT_BASE_URL", "TEXT_DIALOGUE_MODEL")
    client = OpenAI(api_key=config.TEXT_API_KEY, base_url=config.TEXT_BASE_URL)
    completion = client.chat.completions.create(
        model=config.TEXT_DIALOGUE_MODEL,
        messages=[
            {"role": "system", "content": _DIALOGUE_SYSTEM},
            {"role": "user", "content": _build_dialogue_prompt(text)},
        ],
        temperature=0.7,
    )
    content = completion.choices[0].message.content or ""
    content = re.sub(r"<think>.*?</think>", "", content, flags=re.S)
    return parse_dialogue(content)


def _get_tts_client() -> OpenAI:
    return OpenAI(api_key=config.TTS_API_KEY, base_url=config.TTS_BASE_URL)


def _synthesize_utterance(
    client: OpenAI, voice: str, utterance: str, encoding: str
) -> bytes:
    """单条台词 -> OpenAI audio/speech -> 音频二进制（如 mp3）。"""
    response = client.audio.speech.create(
        model=config.TTS_MODEL,
        voice=voice,
        input=utterance,
        response_format=encoding,
    )
    return response.content


def _synthesize_with_retry(
    client: OpenAI, voice: str, utterance: str, encoding: str, retries: int = 3
) -> bytes:
    for attempt in range(1, retries + 1):
        try:
            return _synthesize_utterance(client, voice, utterance, encoding)
        except Exception as e:
            if attempt == retries:
                raise
            logger.warning(
                "TTS 合成第 %d 次失败（%s），重试…", attempt, e
            )
            time.sleep(attempt)
    raise RuntimeError("unreachable")


def _read_intro_music() -> bytes:
    """读取片头音乐；文件缺失时跳过（仅告警，不中断）。"""
    path = pathlib.Path(config.TTS_INTRO_MUSIC)
    if not path.is_file():
        logger.warning(
            "片头音乐不存在（%s），本次播客不带片头", path
        )
        return b""
    with path.open("rb") as f:
        data = f.read()
    logger.info("使用片头音乐：%s（%d 字节）", path, len(data))
    return data


async def generate_podcast(
    url: str,
    text: str,
    encoding: str = "mp3",
    output_dir: pathlib.Path | None = None,
) -> str | None:
    """为博客正文生成「男 + 女」双人对谈播客音频。

    片头音乐与各条台词一律以原始二进制顺序拼接，不做转码。
    成功时返回输出文件路径，跳过或失败时返回 None。
    """
    if not config.TTS_API_KEY:
        logger.warning("Podcast skipped: TTS_API_KEY not configured")
        return None
    if output_dir is None:
        output_dir = config.SUMMARY_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / _url_to_audio_filename(url, encoding)

    try:
        lines = await asyncio.to_thread(generate_dialogue, text)
        if not lines:
            raise RuntimeError(f"No dialogue lines generated for {url}")

        segments: list[bytes] = []
        intro = await asyncio.to_thread(_read_intro_music)
        if intro:
            segments.append(intro)

        client = await asyncio.to_thread(_get_tts_client)
        for index, line in enumerate(lines, start=1):
            voice = (
                config.TTS_VOICE_MALE
                if line["speaker"] == MALE
                else config.TTS_VOICE_FEMALE
            )
            audio = await asyncio.to_thread(
                _synthesize_with_retry, client, voice, line["text"], encoding
            )
            if not audio:
                logger.warning(
                    "第 %d 条台词返回空音频，跳过（%s）", index, url
                )
                continue
            segments.append(audio)

        if len(segments) <= (1 if intro else 0):
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
