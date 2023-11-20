---
tags: [python,备忘录]
title: Python工具备忘录
---

## 二维码

生成二维码/解析二维码、生成动态二维码的模块

``` python
from easyqr import easyqr as qr# 解析模块
#上传图片
path = 'ME.png'#使用你自己的微信二维码截图即可
url = qr.upload(path)
#获得解析的地址
url =qr.online(url)

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

## 邮件

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
