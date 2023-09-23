---
tags: [python,word]
---
``` python
import docx
import os


def replace_words(path, old, new):
    """
    :param path:文件路径
    :param old:需要替换的keyword
    :param new:新的替换后的keyword
    """
    if path.endswith(".docx"):
        # 不支持读取doc格式的文件
        doc = docx.Document(path)
        for paragraph in doc.paragraphs:
            for run in paragraph.runs:
                if run.text:
                    run.text = run.text.replace(old, new)
            doc.save(path)
    else:
        raise ValueError("只支持docx文件格式!")


if __name__ == '__main__':
    dir_path = './replace_word_keyword'
    old_keyword = "AI"
    new_keyword = "人工智能"
    files = os.listdir(path=dir_path)
    for file in files:
        try:
            replace_words(os.path.join(dir_path, file), old_keyword, new_keyword)
            print("{}已经修改成功".format(file))
        except ValueError as e:
            print("{}发生如下错误\n{}".format(file, e))
```
