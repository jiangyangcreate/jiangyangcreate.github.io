---
tags: [python,office]
title: Python操作图片
---

## 图片转方图并切成九宫格

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

## 图片拼接

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
