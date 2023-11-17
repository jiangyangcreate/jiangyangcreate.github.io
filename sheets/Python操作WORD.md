---
tags: [python,office]
title: Python操作WORD
---

## 修改word文件

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

## 更改Word方向

```python
import docx
import nos

def change_forward(word_path, result_path):
    '''
    改变word文档的方向
    :param word_path: word路径
    '''
    # 创建保存路径
    if not os.path.exists(result_path):
        os.makedirs(result_path)
    doc = docx.Document(word_path)
    for section in doc.sections:
        # 交替宽高
        section.page_width,section.page_height = section.page_height ,section.page_width
    # 保存为新文件，结尾为X.docx
    doc.save(os.path.join(result_path,word_path.replace('.docx','X.docx'))) 
 
if __name__ == '__main__':

    #获取文件夹下的word文档列表,路径自定义
    path = 'path'
    spam=os.listdir(path)
    os.chdir(path)
    for i in spam:
        if i.endswith('.docx'):
            change_forward(str(i),'new')
```

## 提取Word内图片

```python

import docx,os, re,cv2
import numpy as np

def get_pictures(word_path, result_path):
    """
    图片提取
    :param word_path: word路径
    :result_path: 保存路径
    :return: 
    """
    # 创建保存路径
    if not os.path.exists(result_path):
        os.makedirs(result_path)
    # 读取文件
    doc = docx.Document(word_path)

    # 获取图片
    dict_rel = doc.part._rels
    for rel in dict_rel:
        rel = dict_rel[rel]
        if "image" in rel.target_ref:            
            img_name = re.findall("/(.*)", rel.target_ref)[0]
            word_name = os.path.splitext(word_path)[0]
            if os.sep in word_name:
                new_name = word_name.split('\\')[-1]
            else:
                new_name = word_name.split('/')[-1]
            # cv2获取图片大小
            imgdata = np.frombuffer(rel.target_part.blob,np.uint8)
            img_cv = cv2.imdecode(imgdata,cv2.IMREAD_ANYCOLOR)
            img_name = '{}-{}-{}-{}'.format(new_name,img_cv.shape[0],img_cv.shape[1],img_name)
            # 直接二进制写入兼容性比使用CV2的保存图片好
            with open(f'{result_path}/{img_name}','wb') as f:
                f.write(rel.target_part.blob)
        else:
            pass
 
if __name__ == '__main__':

    #获取文件夹下的word文档列表,路径自定义
    path = '第二章 创享Robot'
    spam=os.listdir(path)
    os.chdir(path)
    for i in spam:
        if i.endswith('.docx'):
            get_pictures(str(i),os.getcwd())
```
