---
tags: [python,ipynb,md]
title: Python操作ipynb
---

## ipynb合并

``` python

# 合并文件夹下所有ipynb文件
def merge_ipynb(wpt):
    if wpt.endswith("/"):
        return
    else:
        wpt = wpt + "/"
    path = wpt[:-1]

    for root, dirs, files in os.walk(wpt):
        flst = files
    flst = [wpt + f for f in flst if f.endswith(".ipynb")]
    jmain = json.load(open(flst[0], "r", encoding="utf-8"))
    for f in flst[1:]:
        jn = json.load(open(f, "r", encoding="utf-8"))
        jmain["cells"].extend(jn["cells"])

    with open("{}.ipynb".format(path), "w", encoding="utf-8") as wf:
        json.dump(jmain, wf)  # 写入文件
```

## ipynb转md

``` python
# ipynb转md
def ipynb2md(wpt, save_path=""):
    md_file_name = os.path.join(save_path, wpt.replace(".ipynb", ".md"))
    file_name = wpt.split("\\")[-1].split(".")[0]

    try:
        print(wpt)
        ja = json.load(open(wpt, "r", encoding="utf-8"))
        md_str = ""  # 两种模式：直接装到一个字符串里或装到列表里，一行是一个字符串

        for c in ja["cells"]:
            if c["cell_type"] == "markdown":
                md_str = md_str + "\n" + "".join(c["source"]) + "\n\n"
            elif c["cell_type"] == "code":
                md_str = md_str + "\n```python \n" + "".join(c["source"]) + "\n```\n\n"
        with open(md_file_name, "w", encoding="utf-8") as wf:
            wf.write(md_str.replace("<>", "**<** **>**"))
    except EOFError as e:
        print(e)
```
