"""博客 AI 摘要 / 播客生成入口

用法（在仓库根目录）：
    make summary   # 为新/变更博文生成摘要 + 播客
    make hash      # 仅刷新 content_hash，不调用任何模型
"""

import argparse
import asyncio
import logging

from service import BlogManager


def main() -> None:
    parser = argparse.ArgumentParser(description="生成博客 AI 摘要与播客")
    parser.add_argument(
        "--hash-only",
        action="store_true",
        help="仅刷新已有摘要的 content_hash（样式/重构类改动用，不调用模型）",
    )
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    # TTS 二进制协议日志过于啰嗦，默认压低
    logging.getLogger("podcast_protocols").setLevel(logging.WARNING)

    results = asyncio.run(BlogManager().run(hash_only=args.hash_only))

    counts: dict[str, int] = {}
    for result in results:
        counts[result.status] = counts.get(result.status, 0) + 1
        line = f"[{result.status}] {result.url}"
        if result.message:
            line += f" — {result.message}"
        print(line)
    stats = ", ".join(f"{status} {count}" for status, count in sorted(counts.items()))
    print(f"共 {len(results)} 篇：{stats}")


if __name__ == "__main__":
    main()
