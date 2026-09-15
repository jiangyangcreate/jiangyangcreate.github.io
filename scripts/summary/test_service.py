import asyncio
import tempfile
import unittest
from pathlib import Path
from unittest.mock import AsyncMock, patch

import config
import service


class PodcastRetryTests(unittest.TestCase):
    def test_unchanged_article_with_missing_audio_regenerates_podcast(self) -> None:
        url = "https://example.com/blog/example/"
        body = "这是测试正文。"
        entry = {"link": url, "content": [{"value": f"<p>{body}</p>"}]}

        with tempfile.TemporaryDirectory() as directory:
            summary_dir = Path(directory)
            with (
                patch.object(service, "SUMMARY_DIR", summary_dir),
                patch.object(config, "TTS_API_KEY", "test-key"),
                patch.object(config, "SITE_URL", "https://example.com"),
                patch("service.fetch_entries", return_value=[entry]),
                patch(
                    "service.generate_podcast",
                    new=AsyncMock(return_value=str(summary_dir / "example.mp3")),
                ) as generate_podcast,
            ):
                manager = service.BlogManager()
                manager._save(
                    url,
                    {"content_hash": service.compute_hash(body), "summary": {}},
                )

                results = asyncio.run(manager.run())

        generate_podcast.assert_awaited_once_with(
            url, body, output_dir=summary_dir
        )
        self.assertEqual(results[0].status, "podcast-updated")


if __name__ == "__main__":
    unittest.main()
