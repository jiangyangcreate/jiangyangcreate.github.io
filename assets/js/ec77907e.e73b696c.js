"use strict";(self.webpackChunkjiangmiemie=self.webpackChunkjiangmiemie||[]).push([[8357],{5949:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>d,default:()=>o,frontMatter:()=>t,metadata:()=>f,toc:()=>s});var p=r(5893),a=r(1151);const t={tags:["python","office"],title:"Python\u64cd\u4f5cPDF"},d=void 0,f={id:"Python\u64cd\u4f5cPDF",title:"Python\u64cd\u4f5cPDF",description:"\u62c6\u5408PDF",source:"@site/sheets/Python\u64cd\u4f5cPDF.md",sourceDirName:".",slug:"/Python\u64cd\u4f5cPDF",permalink:"/sheets/Python\u64cd\u4f5cPDF",draft:!1,unlisted:!1,editUrl:"https://github.com/jiangmiemie/blog/blob/master/sheets/Python\u64cd\u4f5cPDF.md",tags:[{label:"python",permalink:"/sheets/tags/python"},{label:"office",permalink:"/sheets/tags/office"}],version:"current",frontMatter:{tags:["python","office"],title:"Python\u64cd\u4f5cPDF"},sidebar:"tutorialSidebar",previous:{title:"Python\u64cd\u4f5cEXCEL",permalink:"/sheets/Python\u64cd\u4f5cEXCEL"},next:{title:"Python\u64cd\u4f5cWORD",permalink:"/sheets/Python\u64cd\u4f5cWORD"}},i={},s=[{value:"\u62c6\u5408PDF",id:"\u62c6\u5408pdf",level:2},{value:"PDF\u6dfb\u52a0\u6c34\u5370",id:"pdf\u6dfb\u52a0\u6c34\u5370",level:2},{value:"PDF\u8f6cWORD",id:"pdf\u8f6cword",level:2},{value:"\u4e07\u7269\u8f6cPDF",id:"\u4e07\u7269\u8f6cpdf",level:2}];function l(e){const n={code:"code",h2:"h2",pre:"pre",...(0,a.a)(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(n.h2,{id:"\u62c6\u5408pdf",children:"\u62c6\u5408PDF"}),"\n",(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:"language-python",children:'\nfrom PyPDF2 import PdfFileWriter, PdfFileReader, PdfFileMerger\nimport os\nfrom PyPDF2 import PdfFileReader, PdfFileMerger\n\n\ndef get_reader(filename, password):\n    try:\n        old_file = open(filename, "rb")\n    except IOError as err:\n        print("\u6587\u4ef6\u6253\u5f00\u5931\u8d25\uff01" + str(err))\n        return None\n\n    pdf_reader = PdfFileReader(old_file, strict=False)  # \u521b\u5efa\u8bfb\u5b9e\u4f8b\n    # \u89e3\u5bc6\u64cd\u4f5c\n    if pdf_reader.isEncrypted:\n        if password is None:\n            print("%s\u6587\u4ef6\u88ab\u52a0\u5bc6\uff0c\u9700\u8981\u5bc6\u7801\uff01" % filename)\n            return None\n        else:\n            if pdf_reader.decrypt(password) != 1:\n                print("%s\u5bc6\u7801\u4e0d\u6b63\u786e\uff01" % filename)\n                return None\n    if old_file in locals():\n        old_file.close()\n    return pdf_reader\n\n\ndef encrypt_pdf(filename, new_password, old_password=None, encrypted_filename=None):\n    """\u5bf9filename\u6240\u5bf9\u5e94\u7684\u6587\u4ef6\u8fdb\u884c\u52a0\u5bc6,\u5e76\u751f\u6210\u4e00\u4e2a\u65b0\u7684\u6587\u4ef6\n    :param filename: \u6587\u4ef6\u5bf9\u5e94\u7684\u8def\u5f84\n    :param new_password: \u5bf9\u6587\u4ef6\u52a0\u5bc6\u4f7f\u7528\u7684\u5bc6\u7801\n    :param old_password: \u5982\u679c\u65e7\u6587\u4ef6\u8fdb\u884c\u4e86\u52a0\u5bc6\uff0c\u9700\u8981\u5bc6\u7801\n    :param encrypted_filename: \u52a0\u5bc6\u4e4b\u540e\u7684\u6587\u4ef6\u540d\uff0c\u7701\u5374\u65f6\u4f7f\u7528filename_encrypted;\n    :return:"""\n\n    pdf_reader = get_reader(filename, old_password)  # \u521b\u5efa\u4e00\u4e2aReader\u5b9e\u4f8b\n    if pdf_reader is None:\n        return\n    pdf_writer = PdfFileWriter()  # \u521b\u5efa\u4e00\u4e2a\u5199\u64cd\u4f5c\u7684\u5b9e\u4f8b\n    pdf_writer.appendPagesFromReader(pdf_reader)  # \u4ece\u4e4b\u524dReader\u4e2d\u5c06\u6570\u636e\u5199\u5165\u5230Writer\u4e2d\n    pdf_writer.encrypt(new_password)  # \u91cd\u65b0\u4f7f\u7528\u65b0\u5bc6\u7801\u52a0\u5bc6\n    if encrypted_filename is None:\n        encrypted_filename = (\n            "".join(filename.split(".")[:-1]) + "_" + "encrypted" + ".pdf"\n        )  # \u4f7f\u7528\u65e7\u6587\u4ef6\u540d + encrypted \u4f5c\u4e3a\u65b0\u7684\u6587\u4ef6\u540d\n    pdf_writer.write(open(encrypted_filename, "wb"))\n\n\ndef decrypt_pdf(filename, password, decrypted_filename=None):\n    """\u5c06\u52a0\u5bc6\u7684\u6587\u4ef6\u53ca\u9006\u884c\u89e3\u5bc6\uff0c\u5e76\u751f\u6210\u4e00\u4e2a\u65e0\u9700\u5bc6\u7801pdf\u6587\u4ef6\n    :param filename: \u539f\u5148\u52a0\u5bc6\u7684pdf\u6587\u4ef6\n    :param password: \u5bf9\u5e94\u7684\u5bc6\u7801\n    :param decrypted_filename: \u89e3\u5bc6\u4e4b\u540e\u7684\u6587\u4ef6\u540d\n    :return:"""\n    pdf_reader = get_reader(filename, password)  # \u751f\u6210\u4e00\u4e2aReader\u548cWriter\n    if pdf_reader is None:\n        return\n    if not pdf_reader.isEncrypted:\n        print("\u6587\u4ef6\u6ca1\u6709\u88ab\u52a0\u5bc6\uff0c\u65e0\u9700\u64cd\u4f5c\uff01")\n        return\n    pdf_writer = PdfFileWriter()\n    pdf_writer.appendPagesFromReader(pdf_reader)\n    if decrypted_filename is None:\n        decrypted_filename = (\n            "".join(filename.split(".")[:-1]) + "_" + "decrypted" + ".pdf"\n        )\n    pdf_writer.write(open(decrypted_filename, "wb"))  # \u5199\u5165\u65b0\u6587\u4ef6\n\n\ndef split_by_pages(filename, pages, password=None):\n    """\u5c06\u6587\u4ef6\u6309\u7167\u9875\u6570\u8fdb\u884c\u5e73\u5747\u5206\u5272\n    :param filename: \u6240\u8981\u5206\u5272\u7684\u6587\u4ef6\u540d\n    :param pages: \u5206\u5272\u4e4b\u540e\u6bcf\u4e2a\u6587\u4ef6\u5bf9\u5e94\u7684\u9875\u6570\n    :param password: \u5982\u679c\u6587\u4ef6\u52a0\u5bc6\uff0c\u9700\u8981\u8fdb\u884c\u89e3\u5bc6\u64cd\u4f5c\n    :return:"""\n    pdf_reader = get_reader(filename, password)  # \u5f97\u5230Reader\n    if pdf_reader is None:\n        return\n    pages_nums = pdf_reader.numPages  # \u5f97\u5230\u603b\u7684\u9875\u6570\n    if pages <= 1:\n        print("\u6bcf\u4efd\u6587\u4ef6\u5fc5\u987b\u5927\u4e8e1\u9875\uff01")\n        return\n    pdf_num = (\n        pages_nums // pages + 1 if pages_nums % pages else int(pages_nums / pages)\n    )  # \u5f97\u5230\u5207\u5206\u4e4b\u540e\u6bcf\u4e2apdf\u6587\u4ef6\u7684\u9875\u6570\n    print("pdf\u6587\u4ef6\u88ab\u5206\u4e3a%d\u4efd\uff0c\u6bcf\u4efd\u6709%d\u9875\uff01" % (pdf_num, pages))\n    for cur_pdf_num in range(1, pdf_num + 1):  # \u4f9d\u6b21\u751f\u6210pdf\u6587\u4ef6\n        pdf_writer = PdfFileWriter()  # \u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5199\u5b9e\u4f8b\n        split_pdf_name = (\n            "".join(filename)[:-1] + "_" + str(cur_pdf_num) + ".pdf"\n        )  # \u751f\u6210\u5bf9\u5e94\u7684\u6587\u4ef6\u540d\u79f0\n        start = pages * (cur_pdf_num - 1)  # \u8ba1\u7b97\u51fa\u5f53\u524d\u5f00\u59cb\u7684\u4f4d\u7f6e\n        end = (\n            pages * cur_pdf_num if cur_pdf_num != pdf_num else pages_nums\n        )  # \u8ba1\u7b97\u51fa\u7ed3\u675f\u7684\u4f4d\u7f6e\uff0c\u5982\u679c\u662f\u6700\u540e\u4e00\u4efd\u5c31\u76f4\u63a5\u8fd4\u56de\u6700\u540e\u7684\u9875\u6570\uff0c\u5426\u5219\u7528\u6bcf\u4efd\u9875\u6570*\u5df2\u7ecf\u5206\u597d\u7684\u6587\u4ef6\u6570\n        # print(str(start) + \',\' + str(end))\n        for i in range(start, end):  # \u4f9d\u6b21\u8bfb\u53d6\u5bf9\u5e94\u7684\u9875\u6570\n            pdf_writer.addPage(pdf_reader.getPage(i))\n        pdf_writer.write(open(split_pdf_name, "wb"))  # \u5199\u5165\u6587\u4ef6\n\n\ndef split_by_num(filename, nums, password=None):\n    """\u5c06pdf\u6587\u4ef6\u5206\u4e3anums\u4efd\n    :param filename: \u6587\u4ef6\u540d\n    :param nums: \u8981\u5206\u6210\u7684\u4efd\u6570\n    :param password: \u5982\u679c\u9700\u8981\u89e3\u5bc6\uff0c\u8f93\u5165\u5bc6\u7801\n    :return:"""\n    pdf_reader = get_reader(filename, password)\n    if not pdf_reader:\n        return\n    if nums < 2:\n        print("\u4efd\u6570\u4e0d\u80fd\u5c0f\u4e8e2\uff01")\n        return\n    pages = pdf_reader.numPages  # \u5f97\u5230pdf\u7684\u603b\u9875\u6570\n    if pages < nums:\n        print("\u4efd\u6570\u4e0d\u5e94\u8be5\u5927\u4e8epdf\u603b\u9875\u6570\uff01")\n        return\n    each_pdf = pages // nums  # \u8ba1\u7b97\u6bcf\u4efd\u5e94\u8be5\u6709\u591a\u5c11\u9875\n    print("pdf\u5171\u6709%d\u9875\uff0c\u5206\u4e3a%d\u4efd\uff0c\u6bcf\u4efd\u6709%d\u9875\uff01" % (pages, nums, each_pdf))\n\n    for num in range(1, nums + 1):\n        pdf_writer = PdfFileWriter()  # \u751f\u6210\u5bf9\u5e94\u7684\u6587\u4ef6\u540d\u79f0\n        split_pdf_name = "".join(filename)[:-1] + "_" + str(num) + ".pdf"  # \u8ba1\u7b97\u51fa\u5f53\u524d\u5f00\u59cb\u7684\u4f4d\u7f6e\n        start = each_pdf * (num - 1)  # \u8ba1\u7b97\u51fa\u7ed3\u675f\u7684\u4f4d\u7f6e\uff0c\u5982\u679c\u662f\u6700\u540e\u4e00\u4efd\u5c31\u76f4\u63a5\u8fd4\u56de\u6700\u540e\u7684\u9875\u6570\uff0c\u5426\u5219\u7528\u6bcf\u4efd\u9875\u6570*\u5df2\u7ecf\u5206\u597d\u7684\u6587\u4ef6\u6570\n        end = each_pdf * num if num != nums else pages\n        print(str(start) + "," + str(end))\n        for i in range(start, end):\n            pdf_writer.addPage(pdf_reader.getPage(i))\n        pdf_writer.write(open(split_pdf_name, "wb"))\n\n\ndef merger_pdf(filenames, merged_name, passwords=None):\n    """\u4f20\u8fdb\u6765\u4e00\u4e2a\u6587\u4ef6\u5217\u8868\uff0c\u5c06\u5176\u4f9d\u6b21\u878d\u5408\u8d77\u6765\n    :param filenames: \u6587\u4ef6\u5217\u8868\n    :param passwords: \u5bf9\u5e94\u7684\u5bc6\u7801\u5217\u8868\n    :return:"""\n    filenums = len(filenames)  # \u8ba1\u7b97\u5171\u6709\u591a\u5c11\u6587\u4ef6\n    pdf_merger = PdfFileMerger(False)  # \u6ce8\u610f\u9700\u8981\u4f7f\u7528False \u53c2\u6570\n    for i in range(filenums):\n        if passwords is None:  # \u5f97\u5230\u5bc6\u7801\n            password = None\n        else:\n            password = passwords[i]\n        pdf_reader = get_reader(filenames[i], password)\n        if not pdf_reader:\n            return\n        pdf_merger.append(pdf_reader)  # append\u9ed8\u8ba4\u6dfb\u52a0\u5230\u6700\u540e\n    pdf_merger.write(open(merged_name, "wb"))\n\n\ndef insert_pdf(pdf1, pdf2, insert_num, merged_name, password1=None, password2=None):\n    """\u5c06pdf2\u5168\u90e8\u6587\u4ef6\u63d2\u5165\u5230pdf1\u4e2d\u7b2cinsert_num\u9875\n    :param pdf1: pdf1\u6587\u4ef6\u540d\u79f0\n    :param pdf2: pdf2\u6587\u4ef6\u540d\u79f0\n    :param insert_num: \u63d2\u5165\u7684\u9875\u6570\n    :param merged_name: \u878d\u5408\u540e\u7684\u6587\u4ef6\u540d\u79f0\n    :param password1: pdf1\u5bf9\u5e94\u7684\u5bc6\u7801\n    :param password2: pdf2\u5bf9\u5e94\u7684\u5bc6\u7801\n    :return:"""\n    pdf1_reader = get_reader(pdf1, password1)\n    pdf2_reader = get_reader(pdf2, password2)\n    if not pdf1_reader or not pdf2_reader:  # \u5982\u679c\u6709\u4e00\u4e2a\u6253\u4e0d\u5f00\u5c31\u8fd4\u56de\n        return\n    pdf1_pages = pdf1_reader.numPages  # \u5f97\u5230pdf1\u7684\u603b\u9875\u6570\n    if insert_num < 0 or insert_num > pdf1_pages:\n        print("\u63d2\u5165\u4f4d\u7f6e\u5f02\u5e38\uff0c\u60f3\u8981\u63d2\u5165\u7684\u9875\u6570\u4e3a\uff1a%d\uff0cpdf1\u6587\u4ef6\u5171\u6709\uff1a%d\u9875\uff01" % (insert_num, pdf1_pages))\n        return\n    m_pdf = PdfFileMerger(False)  # \u6ce8\u610f\u9700\u8981\u4f7f\u7528False\u53c2\u6570\uff0c\u53ef\u80fd\u4f1a\u51fa\u73b0\u4e2d\u6587\u4e71\u7801\u7684\u60c5\u51b5\n    m_pdf.append(pdf1)\n    m_pdf.merge(insert_num, pdf2)\n    m_pdf.write(open(merged_name, "wb"))\n\n\ndef auto_input(path,result_name): #\u5408\u5e76PDF\u4e3a\u4e00\u4efd\n    result_pdf= PdfFileMerger() #\u65b0\u5efa\u5b9e\u4f8b\u5bf9\u8c61\n    for pdf in os.listdir(path):  #\u904d\u5386\u6587\u4ef6\u5939\n        with open (pdf,\'rb\') as fp:  # \u6253\u5f00\u8981\u5408\u5e76\u7684\u5b50PDF\n            pdf_reder = PdfFileReader(fp)  #\u8bfb\u53d6PDF\u5185\u5bb9\n            if pdf_reder.isEncrypted:   # \u5224\u65ad\u662f\u5426\u88ab\u52a0\u5bc6\n                print(f\'\u5ffd\u7565\u52a0\u5bc6\u6587\u4ef6\uff1a{pdf}\')  # \u5982\u679c\u52a0\u5bc6\u5219\u8df3\u8fc7\uff0c\u5e76\u6253\u5370\u5ffd\u7565\u52a0\u5bc6\u6587\u4ef6\n                continue\n            result_pdf.append(pdf_reder,import_bookmarks = True) # \u5c06\u521a\u521a\u8bfb\u53d6\u5230\u7684PDF\u5185\u5bb9\u8ffd\u52a0\u5230\u5b9e\u4f8b\u5bf9\u8c61\u5185\n    result_pdf.write(result_name) # \u5199\u5165\u4fdd\u5b58\n    result_pdf.close()    # \u5173\u95ed\u7a0b\u5e8f\n\n\nif __name__ == "__main__":\n    # \u52a0\u5bc6\n    # encrypt_pdf(\'ex1.pdf\', \'leafage\')\n\n    # \u89e3\u5bc6\n    # decrypt_pdf(\'ex1123_encrypted.pdf\', \'leafage\')\n\n    # \u6309\u9875\u6570\u62c6\u5206\n    # split_by_pages(\'ex1.pdf\', 5)\n\n    # \u6309\u62c6\u5206\u540e\u7684\u6587\u4ef6\u6570\u62c6\u5206\n    split_by_num("\u793a\u4f8b.pdf", 2)\n\n    # \u5408\u5e76PDF\u6587\u4ef6\n    # merger_pdf([\'ex1.pdf\', \'ex2.pdf\'], \'merger.pdf\')\n\n    # \u63d2\u5165PDF\u81f3\u6307\u5b9a\u4f4d\u7f6e\n    # insert_pdf(\'ex1.pdf\', \'ex2.pdf\', 10, \'pdf12.pdf\')\n'})}),"\n",(0,p.jsx)(n.h2,{id:"pdf\u6dfb\u52a0\u6c34\u5370",children:"PDF\u6dfb\u52a0\u6c34\u5370"}),"\n",(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:"language-python",children:"'''\n- \u51c6\u5907\u6dfb\u52a0\u6c34\u5370\u7684\u7269\u6599\u653e\u7f6e\u4e8e\u540c\u7ea7\u300c\u521d\u59cb\u7269\u6599\u300d\u6587\u4ef6\u5939\u5185\n- \u51c6\u5907\u597d\u7684\u6c34\u5370\u6587\u4ef6\u653e\u7f6e\u4e8e\u540c\u7ea7\u300c\u6c34\u5370\u6587\u4ef6\u300d\u6587\u4ef6\u5939\u5185\uff08\u4ec5\u96501\u5f20\u6c34\u5370\u6587\u4ef6\uff09\n- \u82e5\u4fee\u6539\u4e86\u6c34\u5370\u6587\u4ef6\uff0c\u9700\u8981\u5c06\u6700\u540e\u4e00\u884c\u8c03\u7528create_watermark\u51fd\u6570\u7684watermark\u53c2\u6570\u8fdb\u884c\u8c03\u6574\n\n\u6587\u4ef6\u7ed3\u6784\u5982\u4e0b\n|- \u6b64py\u6587\u4ef6\n|- \u521d\u59cb\u7269\u6599\n  |- \u4f60\u8981\u6dfb\u52a0\u6c34\u5370\u7684\u6587\u4ef6.pdf\n  |- \u4f60\u8981\u6dfb\u52a0\u6c34\u5370\u7684\u6587\u4ef62.pdf\n  |- \u4f60\u8981\u6dfb\u52a0\u6c34\u5370\u7684\u6587\u4ef63.pdf\n|- \u6c34\u5370\u6587\u4ef6\n  |- \u6c34\u5370.pdf\n|- \u6c34\u5370\u7248\u7269\u6599\n'''\nimport os\nfrom PyPDF2 import PdfFileWriter, PdfFileReader\n\n# \u6dfb\u52a0\u6c34\u5370\u529f\u80fd\u7684\u51fd\u6570\n\n\ndef create_watermark(input_pdf, output_pdf, watermark):\n    # \u83b7\u53d6\u6c34\u5370\n    watermark_obj = PdfFileReader(watermark, strict=False)\n    watermark_page = watermark_obj.getPage(0)\n\n    # \u521b\u5efa\u8bfb\u53d6\u5bf9\u8c61\u548c\u5199\u5165\u5bf9\u8c61\n    pdf_reader = PdfFileReader(input_pdf, strict=False)\n    pdf_writer = PdfFileWriter()\n\n    # \u7ed9\u6240\u6709\u9875\u9762\u6dfb\u52a0\u6c34\u5370\uff0c\u5e76\u65b0\u5efapdf\u6587\u4ef6\n    for page in range(pdf_reader.getNumPages()):\n        page = pdf_reader.getPage(page)\n        page.mergePage(watermark_page)\n        pdf_writer.addPage(page)\n\n    with open(output_pdf, 'wb') as out:\n        pdf_writer.write(out)\n\n\nif __name__ == '__main__':\n    # \u7b5b\u9009pdf\u7269\u6599\uff0c\u5e76\u6267\u884c\u6dfb\u52a0\u6c34\u5370\u529f\u80fd\u7684\u51fd\u6570\n    # \u4ee3\u7801\u4e2d\u7684\u6587\u4ef6\u8def\u5f84\u5747\u4f7f\u7528\u76f8\u5bf9\u8def\u5f84\uff0c\u56e0\u6b64\u5728\u8fd0\u884c\u65f6\u9700\u8981\u6ce8\u610f\u6587\u4ef6\u5f53\u524d\u5c42\u7ea7\uff0c\u4ee5\u514d\u8fd0\u884c\u51fa\u9519\n    pdf_file_path = './\u521d\u59cb\u7269\u6599'\n    pdf_files = os.listdir(pdf_file_path)\n    for pdf_file in pdf_files:\n        if pdf_file[-3:] == 'pdf':\n            input_pdf = pdf_file_path + '/' + pdf_file\n            output_pdf = './\u6c34\u5370\u7248\u7269\u6599/'+pdf_file[0:-3]+'pdf'\n            create_watermark(\n                input_pdf=input_pdf, output_pdf=output_pdf, watermark='./\u6c34\u5370\u6587\u4ef6/\u7f16\u7a0b\u6c34\u5370.pdf')\n\n"})}),"\n",(0,p.jsx)(n.h2,{id:"pdf\u8f6cword",children:"PDF\u8f6cWORD"}),"\n",(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:"language-python",children:"from pdf2docx import Converter\npdf_file = input('\u8bf7\u8f93\u5165pdf\u6587\u4ef6\u8def\u5f84:')\ndocx_file = input('\u8bf7\u8f93\u5165\u8f6c\u6362\u540e\u7684word\u6587\u4ef6\u7684\u8def\u5f84:')\ncv = Converter(pdf_file)# \u5b9e\u4f8b\u5316 Converter \u7c7b\u5e76\u4f20\u5165pdf\u6587\u4ef6\u7684\u8def\u5f84\ncv.convert(docx_file, start=0, end=None)# \u8c03\u7528 convert \u65b9\u6cd5\u8f6c\u6362\u4e3a word\u6587\u4ef6,start\u53c2\u6570\u4e3a\u8d77\u59cb\u9875,end\u4e3a\u7ec8\u6b62\u9875\ncv.close()\n\n#\u7eaf\u6587\u5b57+\u56fe\u7247\u7684PDF\u8bc6\u522b\u6548\u679c\u6700\u597d\uff0c\u8d85\u94fe\u63a5\u7b49\u5176\u4ed6\u683c\u5f0f\u5c06\u4e0d\u88ab\u4fdd\u7559\n"})}),"\n",(0,p.jsx)(n.h2,{id:"\u4e07\u7269\u8f6cpdf",children:"\u4e07\u7269\u8f6cPDF"}),"\n",(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:"language-python",children:"import os\nfrom pathlib import Path\nfrom win32com.client import Dispatch, gencache, DispatchEx\nimport win32com.client\n# \u5b9a\u4e49\u7c7b\n\n\nclass PDFConverter:\n    def __init__(self, pathname):\n        self._handle_postfix = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx']\n        self._filename_list = list()\n        self._export_folder = os.path.join(os.path.abspath('.'), outpath)\n        if not os.path.exists(self._export_folder):\n            os.mkdir(self._export_folder)\n        self._enumerate_filename(pathname)\n\n    def _enumerate_filename(self, pathname):\n        full_pathname = os.path.abspath(pathname)\n        if os.path.isfile(full_pathname):\n            if self._is_legal_postfix(full_pathname):\n                self._filename_list.append(full_pathname)\n            else:\n                raise TypeError('\u6587\u4ef6 {} \u540e\u7f00\u540d\u4e0d\u5408\u6cd5\uff01\u4ec5\u652f\u6301\u5982\u4e0b\u6587\u4ef6\u7c7b\u578b\uff1a{}\u3002'.format(\n                    pathname, '\u3001'.join(self._handle_postfix)))\n        elif os.path.isdir(full_pathname):\n            for relpath, _, files in os.walk(full_pathname):\n                for name in files:\n                    filename = os.path.join(full_pathname, relpath, name)\n                    if self._is_legal_postfix(filename):\n                        self._filename_list.append(os.path.join(filename))\n        else:\n            raise TypeError('\u6587\u4ef6/\u6587\u4ef6\u5939 {} \u4e0d\u5b58\u5728\u6216\u4e0d\u5408\u6cd5\uff01'.format(pathname))\n\n    def _is_legal_postfix(self, filename):\n        return filename.split('.')[-1].lower() in self._handle_postfix and not os.path.basename(filename).startswith('~')\n\n    def run_conver(self):\n        '''\n        \u8fdb\u884c\u6279\u91cf\u5904\u7406\uff0c\u6839\u636e\u540e\u7f00\u540d\u8c03\u7528\u51fd\u6570\u6267\u884c\u8f6c\u6362\n        '''\n        print('\u9700\u8981\u8f6c\u6362\u7684\u6587\u4ef6\u6570\uff1a', len(self._filename_list))\n        for filename in self._filename_list:\n            postfix = filename.split('.')[-1].lower()\n            funcCall = getattr(self, postfix)\n            print('\u539f\u6587\u4ef6\uff1a', filename)\n            funcCall(filename)\n        print('\u8f6c\u6362\u5b8c\u6210\uff01')\n\n    def doc(self, filename):\n        '''\n        doc \u548c docx \u6587\u4ef6\u8f6c\u6362\n        '''\n        name = os.path.basename(filename).split('.')[0] + '.pdf'\n        word = Dispatch('Word.Application')\n        doc = word.Documents.Open(filename)\n        pdf_file = os.path.join(self._export_folder, name)\n        doc.SaveAs(pdf_file, FileFormat=17)\n        doc.Close()\n        word.Quit()\n\n    def docx(self, filename):\n        self.doc(filename)\n\n    def xls(self, filename):\n        '''\n        xls \u548c xlsx \u6587\u4ef6\u8f6c\u6362\n        '''\n        name = os.path.basename(filename).split('.')[0] + '.pdf'\n        exportfile = os.path.join(self._export_folder, name)\n        xlApp = DispatchEx(\"Excel.Application\")\n        xlApp.Visible = False\n        xlApp.DisplayAlerts = 0\n        books = xlApp.Workbooks.Open(filename, False)\n        books.ExportAsFixedFormat(0, exportfile)\n        books.Close(False)\n        print('\u4fdd\u5b58 PDF \u6587\u4ef6\uff1a', exportfile)\n        xlApp.Quit()\n\n    def xlsx(self, filename):\n        self.xls(filename)\n\n    def ppt(self,filename):\n        \"\"\"\n        PPT\u6587\u4ef6\u5bfc\u51fa\u4e3apdf\u683c\u5f0f\n        :param filename: PPT\u6587\u4ef6\u7684\u540d\u79f0\n        :param output_filename: \u5bfc\u51fa\u7684pdf\u6587\u4ef6\u7684\u540d\u79f0\n        :return:\n        \"\"\"\n        name = os.path.basename(filename).split('.')[0] + '.pdf'\n        exportfile = os.path.join(self._export_folder, name)\n        ppt_app = win32com.client.Dispatch('PowerPoint.Application')\n        ppt = ppt_app.Presentations.Open(filename)\n        ppt.SaveAs(exportfile, 32)\n        print('\u4fdd\u5b58 PDF \u6587\u4ef6\uff1a', exportfile)\n        ppt_app.Quit()\n\n    def pptx(self, filename):\n        self.ppt(filename)\n\n\ndef main(In_Path):\n    my_file = Path(In_Path)\n    if my_file.is_dir():  # \u5224\u65ad\u662f\u5426\u4e3a\u6587\u4ef6\u5939\n        pathname = os.path.join(os.path.abspath('.'), In_Path)\n    else:\n        pathname = In_Path  # \u5355\u4e2a\u6587\u4ef6\u7684\u8f6c\u6362\n    pdfConverter = PDFConverter(pathname)\n    pdfConverter.run_conver()\n\nif __name__ == \"__main__\":\n    outpath = '\u8f6c\u5316\u540e'\n    main(input('\u8f93\u5165\u4f60\u8981\u8f6c\u5316\u7684\u6587\u4ef6\u6216\u6587\u4ef6\u5939\u8def\u5f84'))\n"})})]})}function o(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(l,{...e})}):l(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>f,a:()=>d});var p=r(7294);const a={},t=p.createContext(a);function d(e){const n=p.useContext(t);return p.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function f(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:d(e.components),p.createElement(t.Provider,{value:n},e.children)}}}]);