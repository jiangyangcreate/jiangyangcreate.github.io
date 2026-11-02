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
    parsed_url = urlparse(url).path
    return parsed_url.lstrip("/").replace("/", "_") + ".json"


def filename_to_url(filename: str) -> str:
    return config.SITE_URL + "/" + filename.replace("_", "/").replace(".json", "")


def fetch_entries() -> list[dict]:
    if not BLOG_RSS.startswith(("http://", "https://")) and not Path(BLOG_RSS).exists():
        raise FileNotFoundError(
            f"未找到 RSS 文件：{BLOG_RSS}。请先运行 make build 生成 build/blog/rss.xml。"
        )
    return feedparser.parse(BLOG_RSS)["entries"]


def extract_body(page: dict) -> str:
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

    @staticmethod
    def _audio_path(url: str) -> Path:
        return SUMMARY_DIR / Path(url_to_filename(url)).with_suffix(".mp3")

    def _clean_stale(self, active_filenames: set[str]) -> None:
        files = list(SUMMARY_DIR.glob("*.json")) + list(SUMMARY_DIR.glob("*.mp3"))
        for path in files:
            if path.name not in active_filenames:
                path.unlink()
                logger.info("Removed stale: %s", path.name)

    async def _process_entry(
        self, url: str, body_text: str, hash_value: str
    ) -> BlogResult:
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
        entries = fetch_entries()
        if not entries:
            raise RuntimeError("RSS 中没有任何文章条目，中止执行（避免误删现有摘要文件）。")
        cache = self._load_cache()
        active_filenames: set[str] = set()
        results: list[BlogResult] = []

        for page in entries:
            url = page["link"].split("#")[0]
            active_filenames.add(url_to_filename(url))
            audio_path = self._audio_path(url)
            active_filenames.add(audio_path.name)
            body_text = extract_body(page)
            hash_value = compute_hash(body_text)
            cached = cache.get(url)
            if cached and cached.get("content_hash") == hash_value:
                if (
                    not hash_only
                    and config.tts_configured()
                    and not audio_path.is_file()
                ):
                    logger.info("Podcast missing for %s, generating it", url)
                    try:
                        podcast_path = await generate_podcast(
                            url, body_text, output_dir=SUMMARY_DIR
                        )
                    except Exception as e:
                        logger.exception("Failed to generate podcast for %s", url)
                        results.append(BlogResult(url=url, status="error", message=str(e)))
                    else:
                        if podcast_path:
                            results.append(BlogResult(url=url, status="podcast-updated"))
                        else:
                            results.append(
                                BlogResult(
                                    url=url,
                                    status="unchanged",
                                    message="podcast skipped",
                                )
                            )
                    continue
                results.append(BlogResult(url=url, status="unchanged"))
                continue
            if hash_only:
                if cached:
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
            return results
        self._clean_stale(active_filenames)
        return results
