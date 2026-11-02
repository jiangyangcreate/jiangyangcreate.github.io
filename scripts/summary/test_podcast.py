import unittest

from podcast import _build_dialogue_prompt, parse_dialogue, spoken_text


class DialoguePromptTests(unittest.TestCase):
    def test_prompt_uses_labeled_dialogue_and_inserts_article(self) -> None:
        prompt = _build_dialogue_prompt("测试文章", provider="openai")

        self.assertIn('每一段发言以"A："或"B："开头', prompt)
        self.assertIn("那我们就直接开始吧", prompt)
        self.assertIn("原来如此", prompt)
        self.assertIn("有意思的延伸", prompt)
        self.assertIn("他建议你可以", prompt)
        self.assertIn("我们下期再见，拜拜", prompt)
        self.assertTrue(prompt.endswith("测试文章"))
        self.assertNotIn("[pause]", prompt)

    def test_prompt_does_not_change_with_tts_provider(self) -> None:
        self.assertEqual(
            _build_dialogue_prompt("测试文章", provider="openai"),
            _build_dialogue_prompt("测试文章", provider="grok"),
        )

    def test_openai_strips_speech_tags_that_would_be_read_aloud(self) -> None:
        self.assertEqual(
            spoken_text("对。[pause] 这个挺实际的。[chuckle]", provider="openai"),
            "对。 这个挺实际的。",
        )
        self.assertEqual(
            spoken_text("对。[pause] 这个挺实际的。", provider="grok"),
            "对。[pause] 这个挺实际的。",
        )

    def test_parse_dialogue_maps_labeled_speakers_to_voices(self) -> None:
        dialogue = parse_dialogue("A：你好。\nB：你好！\nA：那我们就直接开始吧。")

        self.assertEqual(
            dialogue,
            [
                {"speaker": "male", "text": "你好。"},
                {"speaker": "female", "text": "你好！"},
                {"speaker": "male", "text": "那我们就直接开始吧。"},
            ],
        )

    def test_parse_dialogue_still_accepts_json(self) -> None:
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
