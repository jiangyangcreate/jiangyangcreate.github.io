---
sidebar_position: 4
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

### 人脸识别：录入并识别不同人脸

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