import unittest

from podcast import _build_dialogue_prompt, parse_dialogue, spoken_text


class DialoguePromptTests(unittest.TestCase):
    def test_json_example_is_preserved_when_inserting_article(self) -> None:
        prompt = _build_dialogue_prompt("测试文章", provider="openai")

        self.assertIn(
            '[{"speaker": "male", "text": "……"}, '
            '{"speaker": "female", "text": "……"}]',
            prompt,
        )
        self.assertTrue(prompt.endswith("测试文章"))
        self.assertNotIn("[pause]", prompt)

    def test_grok_prompt_allows_speech_tags(self) -> None:
        prompt = _build_dialogue_prompt("测试文章", provider="grok")

        self.assertIn("[pause]", prompt)
        self.assertTrue(prompt.endswith("测试文章"))

    def test_openai_strips_speech_tags_that_would_be_read_aloud(self) -> None:
        self.assertEqual(
            spoken_text("对。[pause] 这个挺实际的。[chuckle]", provider="openai"),
            "对。 这个挺实际的。",
        )
        self.assertEqual(
            spoken_text("对。[pause] 这个挺实际的。", provider="grok"),
            "对。[pause] 这个挺实际的。",
        )

    def test_parse_dialogue_accepts_expected_two_speakers(self) -> None:
        dialogue = parse_dialogue(
            '[{"speaker": "male", "text": "你好。"}, '
            '{"speaker": "female", "text": "你好！"}]'
        )

        self.assertEqual(
            dialogue,
            [
                {"speaker": "male", "text": "你好。"},
                {"speaker": "female", "text": "你好！"},
            ],
        )


if __name__ == "__main__":
    unittest.main()
