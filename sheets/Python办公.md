---
tags: [python,office]
title: Python办公
---

## Python操作文件名
``` bash
小明的文件夹结构为：
|-docs
  |- 01a.md
  |- 02b.md
  |- 03c.md

随着知识储备增多，现在他想拓充自己的知识库,把目录结构修改为：

|-docs
 |- 01a
   |- a.md
 |- 02b
   |- b.md
 |- 03c
   |- c.md

请你设计一个程序完成这个功能
```

``` python
import os

path = "docs"

for i in os.listdir(path):
    # 读取文件夹下所有md结尾的文件
    if i[-2:] == "md":
        # 获取原文件路径
        file_path = os.path.join(path, i)
        # 获取要生成的文件夹路径，按自己想要的方式截取文件名作为文件夹的名字
        filef_path = os.path.join(path, i[:-3])
        # 创建文件夹
        os.makedirs(filef_path)
        # 生成移动到文件夹后的文件路径,去掉前面的2位数字，也可以用正则表达式
        new_file_path = os.path.join(filef_path, i[2:])
        # 移动文件：其实就是改指针
        os.rename(file_path, new_file_path)

# 如果后悔了想改回来
import os

path = "docs"

for a, b, c in os.walk(path):
    if c != []:
        file_path = os.path.join(a, c[0])
        new_file_path = a + ".md"
        os.rename(file_path, new_file_path)
        os.remove(a)


# 在每个文件的开头增加数据
import os

path = "docs"

for a, b, c in os.walk(path):
    if c != []:
        file_path = os.path.join(a, c[0])
        # r+ 可读可写
        with open(file_path,'r+',encoding='utf-8') as f:
            old = f.read()
            f.seek(0)
            f.write("---\nsidebar_position: 1\n---\n")
            f.write(old)
```

## Python操作EXCEL
### 表格分组聚合

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

### 复制表格样式

``` python

import copy
import openpyxl
from openpyxl.utils import get_column_letter

path = input('输入你需要复制格式的表格')
save_path = input('输入你需要复制格式后的表格路径')

wb = openpyxl.load_workbook(path)
wb2 = openpyxl.Workbook()

sheetnames = wb.sheetnames
for sheetname in sheetnames:
    print(sheetname)
    sheet = wb[sheetname]
    sheet2 = wb2.create_sheet(sheetname)

    # 复制tab颜色
    sheet2.sheet_properties.tabColor = sheet.sheet_properties.tabColor

    # 开始处理合并单元格形式为“(<CellRange A1：A4>,)，替换掉(<CellRange 和 >,)' 找到合并单元格
    wm = list(sheet.merged_cells)
    if len(wm) > 0:
        for i in range(0, len(wm)):
            cell2 = str(wm[i]).replace('(<CellRange ', '').replace('>,)', '')
            sheet2.merge_cells(cell2)

    # 遍历后，先写入数据
    for i, row in enumerate(sheet.iter_rows()):
        sheet2.row_dimensions[i+1].height = sheet.row_dimensions[i+1].height
        for j, cell in enumerate(row):
            sheet2.column_dimensions[get_column_letter(
                j+1)].width = sheet.column_dimensions[get_column_letter(j+1)].width
            sheet2.cell(row=i + 1, column=j + 1, value=cell.value)

            # 接着逐一设置单元格格式
            source_cell = sheet.cell(i+1, j+1)
            target_cell = sheet2.cell(i+1, j+1)
            target_cell.fill = copy.copy(source_cell.fill)

            # 默认样式是 Normal，如果是默认样式，返回False，不触发if，反之则进行复制
            if source_cell.has_style: 

                # 该StyleableObject实现将样式存储在单个列表中_style，并且单元格上的样式属性实际上是该数组的 getter 和 setter，所以你可以使用下方的写法，克隆样式更快
                target_cell._style = copy.copy(source_cell._style)

                # 复制字号
                target_cell.font = copy.copy(source_cell.font)

                # 复制边框
                target_cell.border = copy.copy(source_cell.border)

                # 复制填充样式
                target_cell.fill = copy.copy(source_cell.fill)

                # 复制字体样式
                target_cell.number_format = copy.copy(
                    source_cell.number_format)

                # 复制样式保护
                target_cell.protection = copy.copy(source_cell.protection)

                # 复制对齐样式
                target_cell.alignment = copy.copy(source_cell.alignment)

if 'Sheet' in wb2.sheetnames:
    del wb2['Sheet']
wb2.save(save_path)

wb.close()
wb2.close()
```

## Python操作图片

### 图片转方图并切成九宫格

``` python
'''
转方图并切成九宫格
'''
from PIL import Image
import sys
import winreg
import os
#将图片填充为正方形
def fill_image(image):
    width, height = image.size
    #选取长和宽中较大值作为新图片的
    new_image_length = width if width > height else height
    #生成新图片[白底]
    new_image = Image.new(image.mode, (new_image_length, new_image_length), color='white')
    #将之前的图粘贴在新图上，居中
    if width > height:#原图宽大于高，则填充图片的竖直维度
        new_image.paste(image, (0, int((new_image_length - height) / 2)))#(x,y)二元组表示粘贴上图相对下图的起始位置
    else:
        new_image.paste(image, (int((new_image_length - width) / 2),0))
    return new_image
#切图
def cut_image(image):
    width, height = image.size
    item_width = int(width / 3)
    box_list = []
    # (left, upper, right, lower)
    for i in range(0,3):
        for j in range(0,3):
            #print((i*item_width,j*item_width,(i+1)*item_width,(j+1)*item_width))
            box = (j*item_width,i*item_width,(j+1)*item_width,(i+1)*item_width)
            box_list.append(box)
    
    image_list = [image.crop(box) for box in box_list]

    return image_list
#保存
def save_images(image_list):
    Desktoppath = winreg.QueryValueEx(winreg.OpenKey(winreg.HKEY_CURRENT_USER,r'Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders'), "Desktop")[0]#获取电脑系统桌面路径
    os.makedirs(Desktoppath+"\\result") #创建一个文件夹
    newfiledirs = Desktoppath+"\\result"
    index = 1
    for image in image_list:
        image.save(newfiledirs+"\\"+str(index) + '.png', 'PNG')
        index += 1
        
if __name__ == '__main__':
    文件路径 = input('请输入你的转化的文件路径（别忘了加文件后缀名哦）：')
    image = Image.open(文件路径)#放入图片路径
    image = fill_image(image) #填充
    image_list = cut_image(image) #切割
    save_images(image_list) #保存
```

### 图片拼接

``` python
'''
图片拼接
'''

# encoding: utf-8
def merge_LR(pics): #左右拼接
    from imageio import imread
    import skimage.io as io
    import numpy as np
    A_wordcould_path = 'wordcould1.png'#合并后图片的名字
    #横向拼接
    图片1 = io.imread(pics[0])   # np.ndarray, [h, w, c], 值域(0, 255), RGB
    图片2 = io.imread(pics[1])   # np.ndarray, [h, w, c], 值域(0, 255), RGB
    #print(图片1.dtype)
    图片1_h = 图片1.shape[0]   #查看图片的大小
    图片1_w = 图片1.shape[1]
    图片1_c = 图片1.shape[2]
    图片2_h = 图片2.shape[0]   #查看图片的大小
    图片2_w = 图片2.shape[1]
    if 图片1_h >= 图片2_h :
        pj1 = np.zeros((图片1_h,图片1_w+图片2_w,图片1_c))   #横向拼接
    else:
        pj1 = np.zeros((图片2_h,图片1_w+图片2_w,图片1_c))  #横向拼接
    pj1[:,:图片1_w,:] = 图片1.copy()   #图片图片1在左
    pj1[:,图片2_w:,:] = 图片2.copy()   #图片图片2在右
    pj1=np.array(pj1,dtype=np.uint8)   #将pj1数组元素数据类型的改为"uint8"
    io.imsave(A_wordcould_path, pj1)   #保存拼接后的图片

def merge_UD(pics): #上下拼接
    from imageio import imread
    import skimage.io as io
    import numpy as np
    B_wordcould_path = 'wordcould2.png'
    # 上面与下面拼接
    图片1 = io.imread(pics[0])   # np.ndarray, [h, w, c], 值域(0, 255), RGB
    图片2 = io.imread(pics[1])   # np.ndarray, [h, w, c], 值域(0, 255), RGB
    图片1_h = 图片1.shape[0]   #查看图片的大小
    图片1_w = 图片1.shape[1]
    图片1_c = 图片1.shape[2]
    图片2_h = 图片2.shape[0]   #查看图片的大小
    图片2_w = 图片2.shape[1]
    if 图片1_w >= 图片2_w :
        pj = np.zeros((图片1_h+图片2_h,图片1_w,图片1_c))   #竖向拼接
    else:
        pj = np.zeros((图片2_h+图片2_h,图片2_w,图片1_c))  #竖向拼接
    #计算最终图片的像素大小
    pj[:图片1_h,:,:] = 图片1.copy()   #图片图片1在左
    pj[图片2_h:,:,:] = 图片2.copy()   #图片图片2在右
    pj=np.array(pj,dtype=np.uint8)   #将pj数组元素数据类型的改为"uint8"
    io.imsave(B_wordcould_path, pj)   #保存拼接后的图片

pics = ['3.png','4.png']
merge_LR(pics) #左右
#merge_UD(pics)#上下

```


## Python操作ipynb
### ipynb合并

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

### ipynb转md

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

## Python操作PDF
### 拆合PDF

``` python

from PyPDF2 import PdfFileWriter, PdfFileReader, PdfFileMerger
import os
from PyPDF2 import PdfFileReader, PdfFileMerger


def get_reader(filename, password):
    try:
        old_file = open(filename, "rb")
    except IOError as err:
        print("文件打开失败！" + str(err))
        return None

    pdf_reader = PdfFileReader(old_file, strict=False)  # 创建读实例
    # 解密操作
    if pdf_reader.isEncrypted:
        if password is None:
            print("%s文件被加密，需要密码！" % filename)
            return None
        else:
            if pdf_reader.decrypt(password) != 1:
                print("%s密码不正确！" % filename)
                return None
    if old_file in locals():
        old_file.close()
    return pdf_reader


def encrypt_pdf(filename, new_password, old_password=None, encrypted_filename=None):
    """对filename所对应的文件进行加密,并生成一个新的文件
    :param filename: 文件对应的路径
    :param new_password: 对文件加密使用的密码
    :param old_password: 如果旧文件进行了加密，需要密码
    :param encrypted_filename: 加密之后的文件名，省却时使用filename_encrypted;
    :return:"""

    pdf_reader = get_reader(filename, old_password)  # 创建一个Reader实例
    if pdf_reader is None:
        return
    pdf_writer = PdfFileWriter()  # 创建一个写操作的实例
    pdf_writer.appendPagesFromReader(pdf_reader)  # 从之前Reader中将数据写入到Writer中
    pdf_writer.encrypt(new_password)  # 重新使用新密码加密
    if encrypted_filename is None:
        encrypted_filename = (
            "".join(filename.split(".")[:-1]) + "_" + "encrypted" + ".pdf"
        )  # 使用旧文件名 + encrypted 作为新的文件名
    pdf_writer.write(open(encrypted_filename, "wb"))


def decrypt_pdf(filename, password, decrypted_filename=None):
    """将加密的文件及逆行解密，并生成一个无需密码pdf文件
    :param filename: 原先加密的pdf文件
    :param password: 对应的密码
    :param decrypted_filename: 解密之后的文件名
    :return:"""
    pdf_reader = get_reader(filename, password)  # 生成一个Reader和Writer
    if pdf_reader is None:
        return
    if not pdf_reader.isEncrypted:
        print("文件没有被加密，无需操作！")
        return
    pdf_writer = PdfFileWriter()
    pdf_writer.appendPagesFromReader(pdf_reader)
    if decrypted_filename is None:
        decrypted_filename = (
            "".join(filename.split(".")[:-1]) + "_" + "decrypted" + ".pdf"
        )
    pdf_writer.write(open(decrypted_filename, "wb"))  # 写入新文件


def split_by_pages(filename, pages, password=None):
    """将文件按照页数进行平均分割
    :param filename: 所要分割的文件名
    :param pages: 分割之后每个文件对应的页数
    :param password: 如果文件加密，需要进行解密操作
    :return:"""
    pdf_reader = get_reader(filename, password)  # 得到Reader
    if pdf_reader is None:
        return
    pages_nums = pdf_reader.numPages  # 得到总的页数
    if pages <= 1:
        print("每份文件必须大于1页！")
        return
    pdf_num = (
        pages_nums // pages + 1 if pages_nums % pages else int(pages_nums / pages)
    )  # 得到切分之后每个pdf文件的页数
    print("pdf文件被分为%d份，每份有%d页！" % (pdf_num, pages))
    for cur_pdf_num in range(1, pdf_num + 1):  # 依次生成pdf文件
        pdf_writer = PdfFileWriter()  # 创建一个新的写实例
        split_pdf_name = (
            "".join(filename)[:-1] + "_" + str(cur_pdf_num) + ".pdf"
        )  # 生成对应的文件名称
        start = pages * (cur_pdf_num - 1)  # 计算出当前开始的位置
        end = (
            pages * cur_pdf_num if cur_pdf_num != pdf_num else pages_nums
        )  # 计算出结束的位置，如果是最后一份就直接返回最后的页数，否则用每份页数*已经分好的文件数
        # print(str(start) + ',' + str(end))
        for i in range(start, end):  # 依次读取对应的页数
            pdf_writer.addPage(pdf_reader.getPage(i))
        pdf_writer.write(open(split_pdf_name, "wb"))  # 写入文件


def split_by_num(filename, nums, password=None):
    """将pdf文件分为nums份
    :param filename: 文件名
    :param nums: 要分成的份数
    :param password: 如果需要解密，输入密码
    :return:"""
    pdf_reader = get_reader(filename, password)
    if not pdf_reader:
        return
    if nums < 2:
        print("份数不能小于2！")
        return
    pages = pdf_reader.numPages  # 得到pdf的总页数
    if pages < nums:
        print("份数不应该大于pdf总页数！")
        return
    each_pdf = pages // nums  # 计算每份应该有多少页
    print("pdf共有%d页，分为%d份，每份有%d页！" % (pages, nums, each_pdf))

    for num in range(1, nums + 1):
        pdf_writer = PdfFileWriter()  # 生成对应的文件名称
        split_pdf_name = "".join(filename)[:-1] + "_" + str(num) + ".pdf"  # 计算出当前开始的位置
        start = each_pdf * (num - 1)  # 计算出结束的位置，如果是最后一份就直接返回最后的页数，否则用每份页数*已经分好的文件数
        end = each_pdf * num if num != nums else pages
        print(str(start) + "," + str(end))
        for i in range(start, end):
            pdf_writer.addPage(pdf_reader.getPage(i))
        pdf_writer.write(open(split_pdf_name, "wb"))


def merger_pdf(filenames, merged_name, passwords=None):
    """传进来一个文件列表，将其依次融合起来
    :param filenames: 文件列表
    :param passwords: 对应的密码列表
    :return:"""
    filenums = len(filenames)  # 计算共有多少文件
    pdf_merger = PdfFileMerger(False)  # 注意需要使用False 参数
    for i in range(filenums):
        if passwords is None:  # 得到密码
            password = None
        else:
            password = passwords[i]
        pdf_reader = get_reader(filenames[i], password)
        if not pdf_reader:
            return
        pdf_merger.append(pdf_reader)  # append默认添加到最后
    pdf_merger.write(open(merged_name, "wb"))


def insert_pdf(pdf1, pdf2, insert_num, merged_name, password1=None, password2=None):
    """将pdf2全部文件插入到pdf1中第insert_num页
    :param pdf1: pdf1文件名称
    :param pdf2: pdf2文件名称
    :param insert_num: 插入的页数
    :param merged_name: 融合后的文件名称
    :param password1: pdf1对应的密码
    :param password2: pdf2对应的密码
    :return:"""
    pdf1_reader = get_reader(pdf1, password1)
    pdf2_reader = get_reader(pdf2, password2)
    if not pdf1_reader or not pdf2_reader:  # 如果有一个打不开就返回
        return
    pdf1_pages = pdf1_reader.numPages  # 得到pdf1的总页数
    if insert_num < 0 or insert_num > pdf1_pages:
        print("插入位置异常，想要插入的页数为：%d，pdf1文件共有：%d页！" % (insert_num, pdf1_pages))
        return
    m_pdf = PdfFileMerger(False)  # 注意需要使用False参数，可能会出现中文乱码的情况
    m_pdf.append(pdf1)
    m_pdf.merge(insert_num, pdf2)
    m_pdf.write(open(merged_name, "wb"))


def auto_input(path,result_name): #合并PDF为一份
    result_pdf= PdfFileMerger() #新建实例对象
    for pdf in os.listdir(path):  #遍历文件夹
        with open (pdf,'rb') as fp:  # 打开要合并的子PDF
            pdf_reder = PdfFileReader(fp)  #读取PDF内容
            if pdf_reder.isEncrypted:   # 判断是否被加密
                print(f'忽略加密文件：{pdf}')  # 如果加密则跳过，并打印忽略加密文件
                continue
            result_pdf.append(pdf_reder,import_bookmarks = True) # 将刚刚读取到的PDF内容追加到实例对象内
    result_pdf.write(result_name) # 写入保存
    result_pdf.close()    # 关闭程序


if __name__ == "__main__":
    # 加密
    # encrypt_pdf('ex1.pdf', 'leafage')

    # 解密
    # decrypt_pdf('ex1123_encrypted.pdf', 'leafage')

    # 按页数拆分
    # split_by_pages('ex1.pdf', 5)

    # 按拆分后的文件数拆分
    split_by_num("示例.pdf", 2)

    # 合并PDF文件
    # merger_pdf(['ex1.pdf', 'ex2.pdf'], 'merger.pdf')

    # 插入PDF至指定位置
    # insert_pdf('ex1.pdf', 'ex2.pdf', 10, 'pdf12.pdf')
```

### PDF添加水印

``` python
'''
- 准备添加水印的物料放置于同级「初始物料」文件夹内
- 准备好的水印文件放置于同级「水印文件」文件夹内（仅限1张水印文件）
- 若修改了水印文件，需要将最后一行调用create_watermark函数的watermark参数进行调整

文件结构如下
|- 此py文件
|- 初始物料
  |- 你要添加水印的文件.pdf
  |- 你要添加水印的文件2.pdf
  |- 你要添加水印的文件3.pdf
|- 水印文件
  |- 水印.pdf
|- 水印版物料
'''
import os
from PyPDF2 import PdfFileWriter, PdfFileReader

# 添加水印功能的函数


def create_watermark(input_pdf, output_pdf, watermark):
    # 获取水印
    watermark_obj = PdfFileReader(watermark, strict=False)
    watermark_page = watermark_obj.getPage(0)

    # 创建读取对象和写入对象
    pdf_reader = PdfFileReader(input_pdf, strict=False)
    pdf_writer = PdfFileWriter()

    # 给所有页面添加水印，并新建pdf文件
    for page in range(pdf_reader.getNumPages()):
        page = pdf_reader.getPage(page)
        page.mergePage(watermark_page)
        pdf_writer.addPage(page)

    with open(output_pdf, 'wb') as out:
        pdf_writer.write(out)


if __name__ == '__main__':
    # 筛选pdf物料，并执行添加水印功能的函数
    # 代码中的文件路径均使用相对路径，因此在运行时需要注意文件当前层级，以免运行出错
    pdf_file_path = './初始物料'
    pdf_files = os.listdir(pdf_file_path)
    for pdf_file in pdf_files:
        if pdf_file[-3:] == 'pdf':
            input_pdf = pdf_file_path + '/' + pdf_file
            output_pdf = './水印版物料/'+pdf_file[0:-3]+'pdf'
            create_watermark(
                input_pdf=input_pdf, output_pdf=output_pdf, watermark='./水印文件/编程水印.pdf')

```

### PDF转WORD

``` python
from pdf2docx import Converter
pdf_file = input('请输入pdf文件路径:')
docx_file = input('请输入转换后的word文件的路径:')
cv = Converter(pdf_file)# 实例化 Converter 类并传入pdf文件的路径
cv.convert(docx_file, start=0, end=None)# 调用 convert 方法转换为 word文件,start参数为起始页,end为终止页
cv.close()

#纯文字+图片的PDF识别效果最好，超链接等其他格式将不被保留
```

### 万物转PDF

``` python
import os
from pathlib import Path
from win32com.client import Dispatch, gencache, DispatchEx
import win32com.client
# 定义类


class PDFConverter:
    def __init__(self, pathname):
        self._handle_postfix = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx']
        self._filename_list = list()
        self._export_folder = os.path.join(os.path.abspath('.'), outpath)
        if not os.path.exists(self._export_folder):
            os.mkdir(self._export_folder)
        self._enumerate_filename(pathname)

    def _enumerate_filename(self, pathname):
        full_pathname = os.path.abspath(pathname)
        if os.path.isfile(full_pathname):
            if self._is_legal_postfix(full_pathname):
                self._filename_list.append(full_pathname)
            else:
                raise TypeError('文件 {} 后缀名不合法！仅支持如下文件类型：{}。'.format(
                    pathname, '、'.join(self._handle_postfix)))
        elif os.path.isdir(full_pathname):
            for relpath, _, files in os.walk(full_pathname):
                for name in files:
                    filename = os.path.join(full_pathname, relpath, name)
                    if self._is_legal_postfix(filename):
                        self._filename_list.append(os.path.join(filename))
        else:
            raise TypeError('文件/文件夹 {} 不存在或不合法！'.format(pathname))

    def _is_legal_postfix(self, filename):
        return filename.split('.')[-1].lower() in self._handle_postfix and not os.path.basename(filename).startswith('~')

    def run_conver(self):
        '''
        进行批量处理，根据后缀名调用函数执行转换
        '''
        print('需要转换的文件数：', len(self._filename_list))
        for filename in self._filename_list:
            postfix = filename.split('.')[-1].lower()
            funcCall = getattr(self, postfix)
            print('原文件：', filename)
            funcCall(filename)
        print('转换完成！')

    def doc(self, filename):
        '''
        doc 和 docx 文件转换
        '''
        name = os.path.basename(filename).split('.')[0] + '.pdf'
        word = Dispatch('Word.Application')
        doc = word.Documents.Open(filename)
        pdf_file = os.path.join(self._export_folder, name)
        doc.SaveAs(pdf_file, FileFormat=17)
        doc.Close()
        word.Quit()

    def docx(self, filename):
        self.doc(filename)

    def xls(self, filename):
        '''
        xls 和 xlsx 文件转换
        '''
        name = os.path.basename(filename).split('.')[0] + '.pdf'
        exportfile = os.path.join(self._export_folder, name)
        xlApp = DispatchEx("Excel.Application")
        xlApp.Visible = False
        xlApp.DisplayAlerts = 0
        books = xlApp.Workbooks.Open(filename, False)
        books.ExportAsFixedFormat(0, exportfile)
        books.Close(False)
        print('保存 PDF 文件：', exportfile)
        xlApp.Quit()

    def xlsx(self, filename):
        self.xls(filename)

    def ppt(self,filename):
        """
        PPT文件导出为pdf格式
        :param filename: PPT文件的名称
        :param output_filename: 导出的pdf文件的名称
        :return:
        """
        name = os.path.basename(filename).split('.')[0] + '.pdf'
        exportfile = os.path.join(self._export_folder, name)
        ppt_app = win32com.client.Dispatch('PowerPoint.Application')
        ppt = ppt_app.Presentations.Open(filename)
        ppt.SaveAs(exportfile, 32)
        print('保存 PDF 文件：', exportfile)
        ppt_app.Quit()

    def pptx(self, filename):
        self.ppt(filename)


def main(In_Path):
    my_file = Path(In_Path)
    if my_file.is_dir():  # 判断是否为文件夹
        pathname = os.path.join(os.path.abspath('.'), In_Path)
    else:
        pathname = In_Path  # 单个文件的转换
    pdfConverter = PDFConverter(pathname)
    pdfConverter.run_conver()

if __name__ == "__main__":
    outpath = '转化后'
    main(input('输入你要转化的文件或文件夹路径'))
```

## Python操作WORD
### 修改word文件

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

### 更改Word方向

```python
import docx
import os

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
    # 保存为新文件
    doc.save(os.path.join(result_path,word_path)) 
 
if __name__ == '__main__':

    #获取文件夹下的word文档列表,路径自定义
    path = 'path'
    spam=os.listdir(path)
    os.chdir(path)
    for i in spam:
        if i.endswith('.docx'):
            change_forward(str(i),'new')
```

### 提取Word内图片

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

## 二维码

### 解析二维码
``` python
from easyqr import easyqr as qr# 解析模块
#上传图片
path = 'ME.png'#使用你自己的微信二维码截图即可
url = qr.upload(path)
#获得解析的地址
url =qr.online(url)
```
### 生成二维码
``` python
from MyQR import myqr #动态二维码模块，结果不支持中文
myqr.run(
    words= str(url)          ,  # 扫描二维码后，显示的内容，或是跳转的链接
    version=9                ,  # 设置容错率
    level='L'                ,  # 控制纠错水平，范围是L、M、Q、H，从左到右依次升高
    picture='gif.gif' ,  # 图片所在目录，可以是动图
    colorized=True           ,  # 黑白(False)还是彩色(True)
    contrast=1.0             ,  # 用以调节图片的对比度，1.0 表示原始图片。默认为1.0。
    brightness=1.0           ,  # 用来调节图片的亮度，用法同上。
    save_name='xxxxx.gif'        ,  # 控制输出文件名，格式可以是 .jpg， .png ，.bmp ，.gif
    )

import qrcode #静态二维码模块，支持中文
img = qrcode.make('DESKTOP')# 填写你想要扫码出现的内容（文字/链接）
img.save('DESKTOP.png') # 填写文件保存路径
```

## 发送邮件

需要先开启两个服务：
IMAP/SMTP服务已开启
POP3/SMTP服务已开启

schedule模块是定时任务，需要程序一直运行。
增加附件与附图

```python
import time,schedule
from smtplib import SMTP_SSL, SMTP
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

def send_mail(message, Subject, sender_show, recipient_show, to_addrs,filelanguage = 'cn',filepath=None,imagepath=None, cc_show=''):
    """
    :param message: str 邮件内容
    :param Subject: str 邮件主题描述
    :param sender_show: str 发件人显示，不起实际作用如："xxx"
    :param recipient_show: str 收件人显示，不起实际作用 多个收件人用','隔开如："xxx,xxxx"
    :param to_addrs: str 实际收件人
    :param cc_show: str 抄送人显示，不起实际作用，多个抄送人用','隔开如："xxx,xxxx"
    """
    # 填写真实的发邮件服务器用户名、密码
    user = 'xxx@126.com'
    password = 'xxx'
    #发送附件的方法定义为一个变量
    msg=MIMEMultipart()                             
    # 邮件内容
    content='邮件正文' 
    #发送正文
    msg.attach(MIMEText(content,'html', 'utf-8'))  
    #调用传送附件模块，传送附件
    if filepath != None:
        att=MIMEText(open(filepath,'rb').read(),'base64','utf-8')    
        #修改下方filename为文件名（文本型，不支持中文）
        att["Content-Type"]='application/octet-stream' 
        if filelanguage == 'cn':
            show_file_name = '中文附件.xlsx' # 填写你希望展示出来的附件名称
            att.add_header("Content-Disposition", "attachment", filename=("gbk", "", show_file_name))
        else:
            show_file_name = 'English.XLSX' # 填写你希望展示出来的附件名称
            att["Content-Disposition"]=f'attachment;filename="{show_file_name}"' 
        
        msg.attach(att)#发送附件

    if imagepath != None:
        #批量添加图片时需要修改值
        mime_images = '<p><img src="cid:imageid{0}" alt="imageid{0}"></p>'.format(1)
        mime_img = MIMEImage(open(imagepath, 'rb').read(), _subtype='octet-stream')
        mime_img.add_header('Content-ID', 'imageid')
        #上传图片至缓存空间
        msg.attach(mime_img)
        # 上传正文
        mime_html = MIMEText('<html><body><p>{0}</p>{1}</body></html>'.format('', mime_images), 'html', 'utf-8')
        # 添加附图至正文
        msg.attach(mime_html)

    # 邮件主题描述
    msg["Subject"] = Subject
    # 发件人显示，不起实际作用
    msg["from"] = sender_show
    # 收件人显示，不起实际作用
    msg["to"] = recipient_show
    # 抄送人显示，不起实际作用
    msg["Cc"] = cc_show
    try:
        with SMTP_SSL(host="smtp.126.com", port=465) as smtp:
            # 登录发邮件服务器
            smtp.login(user=user, password=password)
            # 实际发送、接收邮件配置
            smtp.sendmail(from_addr=user, to_addrs=to_addrs.split(','), msg=msg.as_string())
            print('send ok.')
    except Exception as e:
        print("send error.", e)




if __name__ == '__main__':
    message = 'Python 测试邮件...'
    Subject = '主题测试'
    # 显示发送人
    sender_show = 'xxx'
    # 显示收件人
    recipient_show = 'xxx'
    # 实际发给的收件人
    to_addrs = 'xxx@qq.com,'
    def job():
        send_mail(message, Subject, sender_show, recipient_show, to_addrs)

    # 每隔10分钟执行一次任务
    # schedule.every(10).minutes.do(job)
    # 每隔一小时执行一次任务
    # schedule.every().hour.do(job)
    # 每天10:30执行一次任务
    # schedule.every().day.at("10:30").do(job)
    # 每周一的这个时候执行一次任务
    # schedule.every().monday.do(job)
    # 每周三13:15执行一次任务
    # schedule.every().wednesday.at("13:15").do(job)
    # 每周五18：00执行一次任务
    schedule.every().friday.at("18:00").do(job)
    while True:
        schedule.run_pending()
        time.sleep(1)
```
