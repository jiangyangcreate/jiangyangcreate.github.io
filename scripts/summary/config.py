import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

ROOT = Path(__file__).resolve().parents[2]

SITE_URL = os.getenv("SITE_URL", "https://jiangmiemie.com").rstrip("/")

BLOG_RSS = os.getenv("BLOG_RSS", str(ROOT / "build" / "blog" / "rss.xml"))

SUMMARY_DIR = Path(os.getenv("SUMMARY_DIR", str(ROOT / "static" / "blog" / "summary")))

TEXT_API_KEY = os.getenv("TEXT_API_KEY", "")
TEXT_BASE_URL = os.getenv("TEXT_BASE_URL", "")
TEXT_MODEL = os.getenv("TEXT_MODEL", "")
TEXT_DIALOGUE_MODEL = os.getenv("TEXT_DIALOGUE_MODEL", "") or TEXT_MODEL

TTS_PROVIDER = os.getenv("TTS_PROVIDER", "openai").strip().lower()
TTS_API_KEY = os.getenv("TTS_API_KEY", "")
TTS_BASE_URL = os.getenv("TTS_BASE_URL", "https://api.openai.com/v1")
TTS_MODEL = os.getenv("TTS_MODEL", "gpt-4o-mini-tts")
TTS_VOICE_MALE = os.getenv("TTS_VOICE_MALE", "cedar")
TTS_VOICE_FEMALE = os.getenv("TTS_VOICE_FEMALE", "marin")
XAI_API_KEY = os.getenv("XAI_API_KEY", "")
XAI_TTS_URL = os.getenv("XAI_TTS_URL", "https://api.x.ai/v1/tts")
XAI_VOICE_MALE = os.getenv("XAI_VOICE_MALE", "kepler")
XAI_VOICE_FEMALE = os.getenv("XAI_VOICE_FEMALE", "iris")
FISH_API_KEY = os.getenv("FISH_API_KEY", "")
FISH_TTS_URL = os.getenv("FISH_TTS_URL", "https://api.fish.audio/v1/tts")
FISH_MODEL = os.getenv("FISH_MODEL", "s2.1-pro-free")
FISH_VOICE_A = os.getenv("FISH_VOICE_A", "4f201abba2574feeae11e5ebf737859e")
FISH_VOICE_B = os.getenv("FISH_VOICE_B", "5c353fdb312f4888836a9a5680099ef0")
_ASSETS = Path(__file__).resolve().parent
TTS_INTRO_MUSIC = os.getenv("TTS_INTRO_MUSIC", str(_ASSETS / "intro.mp3"))
TTS_GAP_MUSIC = os.getenv("TTS_GAP_MUSIC", str(_ASSETS / "gap.mp3"))


def tts_configured() -> bool:
    if TTS_PROVIDER == "grok":
        return bool(XAI_API_KEY.strip())
    if TTS_PROVIDER == "fish":
        return bool(FISH_API_KEY.strip())
    return bool(TTS_API_KEY.strip())


def require(*names: str) -> None:
    missing = [name for name in names if not str(globals().get(name, "")).strip()]
    if missing:
        raise RuntimeError(
            f"缺少配置：{', '.join(missing)}。"
            "请在 scripts/summary/.env 中填写（参考 .env.example）。"
        )
