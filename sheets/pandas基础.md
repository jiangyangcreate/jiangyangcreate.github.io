---
tags: [pandas,python]
---

``` python
import pandas as pd

# 分组聚合
def group(path, name):
    wb = pd.read_excel(path)  # 打开excel表格
    grade_df1 = wb.groupby(name)  # 按name分组
    n = 1
    for i in grade_df1:
        writer = "{}.xlsx".format(n)
        i[1].to_excel(writer, header=True, index=None)  # 生成表格
        n += 1


path = r"data.xlsx"
group(path, "years")  # 单个标签分组
group(path, ["code", "years"])  # 多个标签分组





```
