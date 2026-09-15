"""脚本配置：env 变量名与原 ai.jiangmiemie.com 后端保持一致，便于直接复制 .env。

懒校验——只在真正用到对应服务时才要求必填：
- 生成摘要需要 TEXT_API_KEY / TEXT_BASE_URL / TEXT_MODEL
- 生成播客需要 TEXT_*（对谈台词，可用 TEXT_DIALOGUE_MODEL 单独指定便宜模型）+ TTS_API_KEY（语音合成）；缺失时跳过播客，仅生成文字摘要
- --hash-only 模式不需要任何密钥
"""

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

# 仓库根目录（scripts/summary/ 的上两级），所有默认路径以此锚定，与 cwd 无关
ROOT = Path(__file__).resolve().parents[2]

# 站点根地址，用于从摘要文件名反推文章 URL
SITE_URL = os.getenv("SITE_URL", "https://jiangmiemie.com").rstrip("/")

# RSS 来源：默认读本地构建产物（make build 生成），也可覆盖为线上 URL
BLOG_RSS = os.getenv("BLOG_RSS", str(ROOT / "build" / "blog" / "rss.xml"))

# 摘要 JSON / 播客 MP3 的输出目录
SUMMARY_DIR = Path(os.getenv("SUMMARY_DIR", str(ROOT / "static" / "blog" / "summary")))

# 文本模型（生成摘要、播客对谈台词时必填；OpenAI 兼容接口）
TEXT_API_KEY = os.getenv("TEXT_API_KEY", "")
TEXT_BASE_URL = os.getenv("TEXT_BASE_URL", "")
TEXT_MODEL = os.getenv("TEXT_MODEL", "")
# 对谈台词模型（可选）：默认沿用 TEXT_MODEL；可单独配置更便宜的模型跑台词
TEXT_DIALOGUE_MODEL = os.getenv("TEXT_DIALOGUE_MODEL", "") or TEXT_MODEL

# 播客 TTS（OpenAI audio/speech 接口；缺失 TTS_API_KEY 时跳过播客，仅生成文字摘要）
TTS_API_KEY = os.getenv("TTS_API_KEY", "")
TTS_BASE_URL = os.getenv("TTS_BASE_URL", "https://api.openai.com/v1")
TTS_MODEL = os.getenv("TTS_MODEL", "tts-1")
TTS_VOICE_MALE = os.getenv("TTS_VOICE_MALE", "onyx")
TTS_VOICE_FEMALE = os.getenv("TTS_VOICE_FEMALE", "nova")
# 片头音乐：一段 mp3，直接二进制拼接到语音最前；默认 scripts/summary/intro.mp3，缺失时跳过
TTS_INTRO_MUSIC = os.getenv(
    "TTS_INTRO_MUSIC", str(Path(__file__).resolve().parent / "intro.mp3")
)


def require(*names: str) -> None:
    """检查给定配置项均已提供，缺失则抛错。"""
    missing = [name for name in names if not str(globals().get(name, "")).strip()]
    if missing:
        raise RuntimeError(
            f"缺少配置：{', '.join(missing)}。"
            "请在 scripts/summary/.env 中填写（参考 .env.example）。"
        )
