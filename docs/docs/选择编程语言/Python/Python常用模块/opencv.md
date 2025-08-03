---
sidebar_position: 3
title: opencv
---
## opencv

### 安装

[opencv-python](https://github.com/opencv/opencv-python)需要根据环境选择正确的包

有4个不同的包（参见下面的选项 1、2、3 和 4），你**只能选择其中的一个**。不要在同一环境中安装多个不同的包。没有插件架构：所有包都使用相同的名称空间（`cv2`）。如果你在同一环境中安装了多个不同的包，请使用 ``pip uninstall`` 卸载所有包，然后只重新安装一个包。

**a.** 针对标准桌面环境的包（适用于 Windows、macOS、几乎所有 GNU/Linux 发行版）

- 选项 1 - 主模块包：``pip install opencv-python``
- 选项 2 - 完整包（包含主模块和 contrib/extra 模块）：``pip install opencv-contrib-python``（请参考 [OpenCV 文档](https://docs.opencv.org/master/) 中的 contrib/extra 模块列表）

**b.** 针对服务器（无窗口）环境的包（例如 Docker、云环境等），无 GUI 库依赖

这些包比前面两种包更小，因为它们不包含任何图形用户界面功能（未编译 Qt 或其他 GUI 组件）。这意味着这些包避免了对 X11 库的庞大依赖，从而例如可以生成更小的 Docker 镜像。如果你不使用 `cv2.imshow` 等函数，或者你使用其他包（例如 PyQt）来构建界面而非 OpenCV，则应始终使用这些包。

- 选项 3 - 无窗口主模块包：``pip install opencv-python-headless``
- 选项 4 - 无窗口完整包（包含主模块和 contrib/extra 模块）：``pip install opencv-contrib-python-headless``（请参考 [OpenCV 文档](https://docs.opencv.org/master/) 中的 contrib/extra 模块列表）


### 教程指引

OpenCv作为开源软件，自然有大量的教程，我读过一些纸质书籍，也看过一些开源教程，总体来说，对于入门与进阶来说，需要的是细致的基础讲解、完整的处理流程，非常推荐官方的[OpenCV-Python教程](https://opencv-python-tutorials.readthedocs.io/)。


### 图像读取与显示

```python showLineNumbers
# 导入库
import cv2
# 读取图片, 读取的图片为BGR格式, 如果需要读取为RGB格式, 则需要使用cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# 如果读取失败, 则返回None
img = cv2.imread('imgs/img/10.jpg')
print(img.shape) 
# 打印图像的形状，(height, width, channels) 其中channels为3、4，表示通道数为RGB、RGBA（A是透明度），如果是灰度、二值图，通道数为1的情况会报错。

# 显示图片, 参数：img: 图像对象, 'Image': 窗口名称
# 如果窗口名称重复，则不会创建新的窗口，而是将图像显示在已有的窗口中
cv2.imshow('Image', img)
# 等待按键按下，0表示无限等待，其他数字表示等待时间（毫秒）
# 这个方法会阻塞程序，直到按键按下，返回值为按键的ASCII码。如果设置了中文输入法，键盘的捕获会被输入法占用，导致无法正常等待按键按下。
key = cv2.waitKey(0)    
# 如果按键为q，则退出
if key == ord('q'):
    # 关闭指定窗口
    cv2.destroyWindow('Image') 
# 关闭所有窗口
cv2.destroyAllWindows()
```

### 图像绘制

```python showLineNumbers
# 导入库
import cv2
# 读取图片
img = cv2.imread('imgs/img/10.jpg')
# 绘制直线
# 参数：img: 图像对象, (100, 100): 起点坐标, (200, 200): 终点坐标, (0, 0, 255): 颜色, 2: 线宽
cv2.line(img, (100, 100), (200, 200), (0, 0, 255), 2)
# 绘制矩形
# 参数：img: 图像对象, (100, 100): 左上角坐标, (200, 200): 右下角坐标, (0, 0, 255): 颜色, 2: 线宽
cv2.rectangle(img, (100, 100), (200, 200), (0, 0, 255), 2)
# 绘制圆形
# 参数：img: 图像对象, (150, 150): 圆心坐标, 50: 半径, (0, 0, 255): 颜色, 2: 线宽
cv2.circle(img, (150, 150), 50, (0, 0, 255), 2)
# 绘制多边形
# 参数：img: 图像对象, [pts]: 顶点列表, True: 是否闭合, (0, 0, 255): 颜色, 2: 线宽
pts = np.array([[100, 100], [200, 100], [200, 200], [100, 200]])
cv2.polylines(img, [pts], True, (0, 0, 255), 2)
# 绘制椭圆
# 参数：img: 图像对象, (150, 150): 椭圆中心坐标, (100, 50): 椭圆长轴和短轴长度, 0: 椭圆旋转角度, 0: 椭圆起始角度, 360: 椭圆结束角度, (0, 0, 255): 颜色, 2: 线宽
cv2.ellipse(img, (150, 150), (100, 50), 0, 0, 360, (0, 0, 255), 2)
# 显示图片
cv2.imshow('Image', img)
# 等待按键按下
cv2.waitKey(0)
# 关闭所有窗口
cv2.destroyAllWindows()
```

#### 绘制中文

cv2的在图片上的绘制语法主要缺陷为无法绘制中文，需要使用PIL库来绘制中文。

```python showLineNumbers
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
# 打开图片
img = Image.open('imgs/img/10.jpg')  # 替换为你的图片路径
# 设置字体（确保路径正确，Windows下常见字体路径如下）
font_path = "simhei.ttf"  # 黑体
font_size = 60
font = ImageFont.truetype(font_path, font_size)
# 要绘制的文字
text = "机器视觉"
# 创建绘图对象
draw = ImageDraw.Draw(img)
# 计算文字尺寸
text_width, text_height = draw.textsize(text, font=font)
# 计算图片中心
img_width, img_height = img.size
x = (img_width - text_width) // 2
y = (img_height - text_height) // 2
# 绘制文字（可设置颜色和描边等）
draw.text((x, y), text, font=font, fill=(255, 0, 0))  # 红色
# 保存或显示图片
img.show()
# img.save('output.jpg')
```

### 案例-人脸识别：录入并识别不同人脸

- 这段程序首先会读取摄像头，并自动截取一定数量的人脸用作训练。
- 然后将截取的人脸进行训练，生成一个训练模型。
- 最后通过摄像头实时识别人脸

使用下方代码时，需要保证当前文件夹存在以下内容。（如必须在非当前目录执行，请替换相关路径为绝对路径，你可能需要根据自己的摄像头修改代码中的CID = 0的值）

- `dataSet`文件夹  
如不存在可自行创建一个空文件夹，注意大小写敏感。

- `haarcascade_frontalface_default.xml`文件 可以通过 `everthing` 搜索 ，移动到当前目录。


```python showLineNumbers
import os
import cv2
import numpy as np

# 摄像头被分配到的设备ID，window通常为0，linux通常为1，AIBox通常为9~13
CID = 0


# 输入人脸,id为人脸对应的id，同个id的人脸会被识别为同一个人
def get_face(id="1"):
    faceDetect = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
    cam = cv2.VideoCapture(CID)
    sampleNum = 0
    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = faceDetect.detectMultiScale(gray, 1.3, 5)
        for x, y, w, h in faces:
            sampleNum = sampleNum + 1
            cv2.imwrite(
                "dataSet/User." + str(id) + "." + str(sampleNum) + ".png",
                gray[y : y + h, x : x + w],
            )
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
            cv2.waitKey(100)
        cv2.imshow("Face", img)
        cv2.waitKey(1)
        if sampleNum > 20:
            break
    cam.release()
    cv2.destroyAllWindows()


# 训练数据
def trainer_face(path="dataSet"):
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    imagePaths = [os.path.join(path, f) for f in os.listdir(path)]
    faces = []
    IDs = []
    for imagePath in imagePaths:
        faceImg = cv2.imread(imagePath,0)
        faceNp = np.array(faceImg, "uint8")
        ID = int(os.path.split(imagePath)[-1].split(".")[1])
        faces.append(faceNp)
        IDs.append(ID)
        cv2.imshow("training", faceNp)
        cv2.waitKey(10)
    recognizer.train(faces, np.array(IDs))
    recognizer.save("trainningData.yml")
    cv2.destroyAllWindows()


# 识别人脸
def recognizer(labels={"p1": 1, "p2": 2}):
    # 加载人脸识别器
    face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

    # 加载已训练的人脸识别模型
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("trainningData.yml")

    # 初始化摄像头
    cap = cv2.VideoCapture(CID)
    font = cv2.FONT_HERSHEY_COMPLEX_SMALL
    while True:
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # 检测人脸
        faces = face_cascade.detectMultiScale(
            gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30)
        )

        rgb_color = (0, 0, 0)
        for x, y, w, h in faces:
            # 识别人脸
            id, confidence = recognizer.predict(gray[y : y + h, x : x + w])
            person = ""
            if confidence < 100:
                for name, label in labels.items():
                    if label == id:
                        person = name
                        break
                confidence = int(100 - confidence)
                if int(confidence) > 40:
                    rgb_color = (0, 255, 0)  # 绿色
                    person = f"{person}: {confidence}%"

                elif 0 < int(confidence) < 40:
                    rgb_color = (255, 0, 0)  # 红色
                    person = "unkonw"
            cv2.putText(
                frame,
                str(person),
                (x, y + h),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                2,
            )  # 更新为cv2.putText()
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.imshow("Face Recognition", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    get_face(id="1")
    trainer_face(path="dataSet")
    recognizer()
```