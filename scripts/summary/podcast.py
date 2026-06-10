import asyncio
import json
import logging
import pathlib
import uuid
from urllib.parse import urlparse

import websockets

import config
from podcast_protocols import (
    EventType,
    MsgType,
    finish_connection,
    finish_session,
    receive_message,
    start_connection,
    start_session,
    wait_for_event,
)

logger = logging.getLogger(__name__)


def _url_to_audio_filename(url: str, ext: str = "mp3") -> str:
    path = urlparse(url).path.lstrip("/")
    return f"{path.replace('/', '_')}.{ext}"


async def generate_podcast(
    url: str,
    text: str,
    encoding: str = "mp3",
    output_dir: pathlib.Path | None = None,
) -> str | None:
    """通过 Volcengine TTS 为博客正文生成播客音频

    正文以 input_text 直接传给 TTS（而非让服务端抓取 URL），
    因此新文章在部署上线前也能生成播客。
    url 仅用于推导输出文件名。
    成功时返回输出文件路径，跳过或失败时返回 None。
    """
    if not config.PODCAST_APPID or not config.PODCAST_ACCESS_TOKEN:
        logger.warning("Podcast skipped: appid / access_token not configured")
        return None
    if output_dir is None:
        output_dir = config.SUMMARY_DIR
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / _url_to_audio_filename(url, encoding)

    headers = {
        "X-Api-App-Id": config.PODCAST_APPID,
        "X-Api-App-Key": config.PODCAST_APP_KEY,
        "X-Api-Access-Key": config.PODCAST_ACCESS_TOKEN,
        "X-Api-Resource-Id": config.PODCAST_RESOURCE_ID,
        "X-Api-Connect-Id": str(uuid.uuid4()),
    }

    req_params = {
        "input_id": str(uuid.uuid4()),
        "input_text": text,
        "action": 0,
        "use_head_music": True,
        "use_tail_music": False,
        "input_info": {
            "return_audio_url": False,
            "only_nlp_text": False,
        },
        "speaker_info": {"random_order": False},
        "audio_config": {
            "format": encoding,
            "sample_rate": 24000,
            "speech_rate": 0,
        },
    }

    is_round_end = True
    last_round_id = -1
    task_id = ""
    websocket = None
    retries_left = 5
    podcast_audio = bytearray()
    audio_buffer = bytearray()
    current_round = 0

    try:
        while retries_left > 0:
            websocket = await websockets.connect(
                config.PODCAST_BASE_URL, additional_headers=headers
            )

            if not is_round_end:
                req_params["retry_info"] = {
                    "retry_task_id": task_id,
                    "last_finished_round_id": last_round_id,
                }

            await start_connection(websocket)
            await wait_for_event(
                websocket, MsgType.FullServerResponse, EventType.ConnectionStarted
            )

            session_id = str(uuid.uuid4())
            if not task_id:
                task_id = session_id

            await start_session(
                websocket, json.dumps(req_params).encode(), session_id
            )
            await wait_for_event(
                websocket, MsgType.FullServerResponse, EventType.SessionStarted
            )
            await finish_session(websocket, session_id)

            while True:
                msg = await receive_message(websocket)

                if (
                    msg.type == MsgType.AudioOnlyServer
                    and msg.event == EventType.PodcastRoundResponse
                ):
                    audio_buffer.extend(msg.payload)

                elif msg.type == MsgType.Error:
                    raise RuntimeError(f"Server error: {msg.payload.decode()}")

                elif msg.type == MsgType.FullServerResponse:
                    if msg.event == EventType.PodcastRoundStart:
                        data = json.loads(msg.payload)
                        current_round = data.get("round_id")
                        is_round_end = False

                    if msg.event == EventType.PodcastRoundEnd:
                        data = json.loads(msg.payload)
                        if data.get("is_error"):
                            break
                        is_round_end = True
                        last_round_id = current_round
                        if audio_buffer:
                            podcast_audio.extend(audio_buffer)
                            audio_buffer.clear()

                if msg.event == EventType.SessionFinished:
                    break

            await finish_connection(websocket)
            await wait_for_event(
                websocket, MsgType.FullServerResponse, EventType.ConnectionFinished
            )

            if is_round_end:
                if podcast_audio:
                    with open(output_path, "wb") as f:
                        f.write(podcast_audio)
                    logger.info("Saved podcast: %s", output_path)
                    return str(output_path)
                logger.warning("No audio data for %s", url)
                return None

            retries_left -= 1
            logger.warning(
                "Incomplete round, retrying from %d (%d left)",
                last_round_id,
                retries_left,
            )
            await asyncio.sleep(1)
            if websocket:
                await websocket.close()
                websocket = None

    except Exception:
        logger.exception("Podcast generation failed for %s", url)
        return None
    finally:
        if websocket:
            await websocket.close()
