"""脚本配置：env 变量名与原 ai.jiangmiemie.com 后端保持一致，便于直接复制 .env。

懒校验——只在真正用到对应服务时才要求必填：
- 生成摘要需要 TEXT_API_KEY / TEXT_BASE_URL / TEXT_MODEL
- 生成播客需要 PODCAST_*（缺失时跳过播客，仅生成文字摘要）
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

# 文本模型（生成摘要时必填；OpenAI 兼容接口）
TEXT_API_KEY = os.getenv("TEXT_API_KEY", "")
TEXT_BASE_URL = os.getenv("TEXT_BASE_URL", "")
TEXT_MODEL = os.getenv("TEXT_MODEL", "")

# 播客 TTS（字节火山 SAMI）
PODCAST_BASE_URL = os.getenv("PODCAST_BASE_URL", "")
PODCAST_APPID = os.getenv("PODCAST_APPID", "")
PODCAST_ACCESS_TOKEN = os.getenv("PODCAST_ACCESS_TOKEN", "")
PODCAST_APP_KEY = os.getenv("PODCAST_APP_KEY", "")
PODCAST_RESOURCE_ID = os.getenv("PODCAST_RESOURCE_ID", "")


def require(*names: str) -> None:
    """检查给定配置项均已提供，缺失则抛错。"""
    missing = [name for name in names if not str(globals().get(name, "")).strip()]
    if missing:
        raise RuntimeError(
            f"缺少配置：{', '.join(missing)}。"
            "请在 scripts/summary/.env 中填写（参考 .env.example）。"
        )
