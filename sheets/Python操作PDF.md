---
tags: [python,office]
title: Python操作PDF
---

## 拆合PDF

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

## PDF添加水印

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

## PDF转WORD

``` python
from pdf2docx import Converter
pdf_file = input('请输入pdf文件路径:')
docx_file = input('请输入转换后的word文件的路径:')
cv = Converter(pdf_file)# 实例化 Converter 类并传入pdf文件的路径
cv.convert(docx_file, start=0, end=None)# 调用 convert 方法转换为 word文件,start参数为起始页,end为终止页
cv.close()

#纯文字+图片的PDF识别效果最好，超链接等其他格式将不被保留
```

## 万物转PDF

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
