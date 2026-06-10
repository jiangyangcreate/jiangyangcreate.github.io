import functools
import re

from openai import OpenAI

import config


def _strip_think_tags(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return re.sub(r"<think>.*?</think>", "", result, flags=re.DOTALL)
    return wrapper


def _get_client() -> OpenAI:
    config.require("TEXT_API_KEY", "TEXT_BASE_URL", "TEXT_MODEL")
    return OpenAI(api_key=config.TEXT_API_KEY, base_url=config.TEXT_BASE_URL)


@_strip_think_tags
def generate_summary(text: str) -> str | None:
    """调用 LLM 生成 200-250 字的导读式摘要"""
    client = _get_client()
    completion = client.chat.completions.create(
        model=config.TEXT_MODEL,
        messages=[
            {"role": "system", "content": "你是一个高水平的总结大师。"},
            {
                "role": "user",
                "content": (
                    "阅读下面的博文，提供一个200~250字的导读式总结。"
                    f"只需要回复总结后的文本：{text}"
                ),
            },
        ],
        temperature=0.2,
    )
    return completion.choices[0].message.content
