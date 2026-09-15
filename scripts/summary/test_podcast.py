import unittest

from podcast import _build_dialogue_prompt, parse_dialogue


class DialoguePromptTests(unittest.TestCase):
    def test_json_example_is_preserved_when_inserting_article(self) -> None:
        prompt = _build_dialogue_prompt("测试文章")

        self.assertIn(
            '[{"speaker": "male", "text": "……"}, '
            '{"speaker": "female", "text": "……"}]',
            prompt,
        )
        self.assertTrue(prompt.endswith("测试文章"))

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
