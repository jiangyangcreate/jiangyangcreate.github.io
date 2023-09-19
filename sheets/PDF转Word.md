---
tags: [python]
---

``` python
from pdf2docx import Converter
pdf_file = input('请输入pdf文件路径:')
docx_file = input('请输入转换后的word文件的路径:')
cv = Converter(pdf_file)# 实例化 Converter 类并传入pdf文件的路径
cv.convert(docx_file, start=0, end=None)# 调用 convert 方法转换为 word文件,start参数为起始页,end为终止页
cv.close()

#纯文字+图片的PDF识别效果最好，超链接等其他格式将不被保留
```
