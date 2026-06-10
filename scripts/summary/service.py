import asyncio
import hashlib
import json
import logging
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse

import feedparser
from parsel import Selector

import config
from llm import generate_summary
from podcast import generate_podcast

SUMMARY_DIR = config.SUMMARY_DIR
BLOG_RSS = config.BLOG_RSS
SUMMARY_SEPARATOR = "此内容根据文章生成，仅用于文章内容的解释与总结"

logger = logging.getLogger(__name__)


def url_to_filename(url: str) -> str:
    """
    将博客URL转换为文件名


    输入：https://jiangmiemie.com/blog/2026/2/28/
    输出：blog_2026_2_28_.json
    """
    parsed_url = urlparse(url).path
    return parsed_url.lstrip("/").replace("/", "_") + ".json"


def filename_to_url(filename: str) -> str:
    """
    将文件名转换为博客URL

    输入：blog_2026_2_28_.json
    输出：https://jiangmiemie.com/blog/2026/2/28/
    """
    return config.SITE_URL + "/" + filename.replace("_", "/").replace(".json", "")


def fetch_entries() -> list[dict]:
    if not BLOG_RSS.startswith(("http://", "https://")) and not Path(BLOG_RSS).exists():
        raise FileNotFoundError(
            f"未找到 RSS 文件：{BLOG_RSS}。请先运行 make build 生成 build/blog/rss.xml。"
        )
    return feedparser.parse(BLOG_RSS)["entries"]


def extract_body(page: dict) -> str:
    """从 RSS 条目中提取正文文本，去掉 AI 生成的头部摘要"""
    raw_html = page["content"][0]["value"]
    parts = raw_html.split(SUMMARY_SEPARATOR)
    body_html = "".join(parts[1:]) if len(parts) > 1 else raw_html
    return "".join(Selector(text=body_html).xpath(".//text()").getall())


def compute_hash(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()


@dataclass
class BlogResult:
    url: str
    status: str
    message: str = ""


class BlogManager:
    """博客 AI 生成管理器，基于内容哈希检测变更

    对每个内容哈希发生变化的 RSS 条目：
      1. 通过 LLM 生成文字摘要
      2. 通过 Volcengine TTS 生成播客
      3. 持久化到磁盘
    """

    def __init__(self):
        SUMMARY_DIR.mkdir(parents=True, exist_ok=True)

    def _load_cache(self) -> dict:
        cache: dict = {}
        for path in SUMMARY_DIR.glob("*.json"):
            with path.open("r", encoding="utf-8") as f:
                cache[filename_to_url(path.name)] = json.load(f)
        return cache

    def _save(self, url: str, data: dict) -> None:
        path = SUMMARY_DIR / url_to_filename(url)
        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def _clean_stale(self, active_filenames: set[str]) -> None:
        files = list(SUMMARY_DIR.glob("*.json")) + list(SUMMARY_DIR.glob("*.mp3"))
        for path in files:
            if path.name not in active_filenames:
                path.unlink()
                logger.info("Removed stale: %s", path.name)

    async def _process_entry(
        self, url: str, body_text: str, hash_value: str
    ) -> BlogResult:
        """为单个变更的博客条目生成摘要 + 播客"""
        try:
            summary = await asyncio.to_thread(generate_summary, body_text)
            podcast_path = await generate_podcast(url, body_text, output_dir=SUMMARY_DIR)
            if podcast_path:
                logger.info("Saved %s podcast to: %s", url, podcast_path)
                message = "AI info generated"
            else:
                logger.warning("Podcast generation skipped or failed for %s", url)
                message = "summary generated, podcast skipped or failed"

            data: dict = {"content_hash": hash_value, "summary": summary}
            self._save(url, data)

            return BlogResult(url=url, status="updated", message=message)
        except Exception as e:
            logger.exception("Failed to process %s", url)
            return BlogResult(url=url, status="error", message=str(e))

    async def run(self, hash_only: bool = False) -> list[BlogResult]:
        """扫描本地构建的 RSS，对变更条目重新生成 AI 信息

        hash_only=True 时只刷新已有 JSON 的 content_hash（不调用模型），
        对应旧后端的 /blog/update_hash，用于样式/重构类不改变文意的改动。
        """
        # 获取最新的 RSS 文章列表（默认来自 build/blog/rss.xml）
        entries = fetch_entries()
        if not entries:
            raise RuntimeError("RSS 中没有任何文章条目，中止执行（避免误删现有摘要文件）。")
        # 加载本地缓存
        cache = self._load_cache()
        # 新建活跃文件列表
        active_filenames: set[str] = set()
        results: list[BlogResult] = []

        for page in entries:
            url = page["link"].split("#")[0]
            # 将还在 RSS 中的文章文件名 .json 和 .mp3 加入活跃文件列表
            # 未加入的会被删除
            active_filenames.add(url_to_filename(url))
            active_filenames.add(Path(url_to_filename(url)).with_suffix(".mp3").name)
            # 提取文章正文
            body_text = extract_body(page)
            # 计算文章正文哈希值
            hash_value = compute_hash(body_text)
            # 获取本地缓存
            cached = cache.get(url)
            # 如果hash值相等，则跳过生成环节
            if cached and cached.get("content_hash") == hash_value:
                results.append(BlogResult(url=url, status="unchanged"))
                continue
            if hash_only:
                if cached:
                    # 仅刷新旧文的 content_hash，摘要原样保留
                    cached["content_hash"] = hash_value
                    self._save(url, cached)
                    results.append(BlogResult(url=url, status="hash-updated"))
                else:
                    results.append(BlogResult(
                        url=url, status="missing",
                        message="缺少摘要，请运行 make summary 生成",
                    ))
                continue
            logger.info("Content changed for %s, generating AI info", url)
            result = await self._process_entry(url, body_text, hash_value)
            results.append(result)

        if hash_only:
            # hash-only 模式跳过清理环节，避免误删
            return results
        self._clean_stale(active_filenames)
        return results


if __name__ == "__main__":
    manager = BlogManager()
    results = asyncio.run(manager.run(hash_only=True))
    print(results)
