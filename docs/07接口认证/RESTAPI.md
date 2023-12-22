## FastAPI


### 基础用法
```python
from fastapi import FastAPI
import uvicorn
import random
from fastapi.responses import HTMLResponse

app = FastAPI()

# 返回一个1-100的随机数
@app.get("/random")
def get_random_num():
    num = random.randint(1, 100)
    return {"random": num}

# 返回一个html页面
@app.get("/all", response_class=HTMLResponse)
def get_all():
    html = """<html></html>"""
    return html
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6022)
```

### 视频推流直播

FastAPI除了可以传输文本数据，还可传输图片、视频等数据，cv2可以捕获屏幕，将两者结合起来，实现内网直播功能，可以在局域网内通过浏览器观看屏幕共享。

```python
import os
from importlib import import_module
from flask import Flask, render_template, Response,render_template_string


from io import BytesIO
import cv2
from PIL import ImageGrab, Image
import time
import threading
try:
    from greenlet import getcurrent as get_ident
except ImportError:
    try:
        from thread import get_ident
    except ImportError:
        from _thread import get_ident


class CameraEvent(object):
    def __init__(self):
        self.events = {}

    def wait(self):
        ident = get_ident()
        if ident not in self.events:
            self.events[ident] = [threading.Event(), time.time()]
        return self.events[ident][0].wait()

    def set(self):
        now = time.time()
        remove = None
        for ident, event in self.events.items():
            if not event[0].isSet():
                event[0].set()
                event[1] = now
            else:
                if now - event[1] > 5:
                    remove = ident
        if remove:
            del self.events[remove]

    def clear(self):
        self.events[get_ident()][0].clear()


class BaseCamera(object):
    thread = None
    frame = None
    last_access = 0
    event = CameraEvent()

    def __init__(self):
        if BaseCamera.thread is None:
            BaseCamera.last_access = time.time()

            BaseCamera.thread = threading.Thread(target=self._thread)
            BaseCamera.thread.start()

            while self.get_frame() is None:
                time.sleep(0)

    def get_frame(self):
        BaseCamera.last_access = time.time()

        BaseCamera.event.wait()
        BaseCamera.event.clear()

        return BaseCamera.frame

    @staticmethod
    def frames():
        raise RuntimeError('Must be implemented by subclasses.')

    @classmethod
    def _thread(cls):
        print('Starting camera thread.')
        frames_iterator = cls.frames()
        for frame in frames_iterator:
            BaseCamera.frame = frame
            BaseCamera.event.set()
            time.sleep(0)
            if time.time() - BaseCamera.last_access > 10:
                frames_iterator.close()
                print('Stopping camera thread due to inactivity.')
                break
        BaseCamera.thread = None



class Camera(BaseCamera):
    video_source = 0

    @staticmethod
    def set_video_source(source):
        Camera.video_source = source

    @staticmethod
    def frames():
        camera = cv2.VideoCapture(Camera.video_source)
        if not camera.isOpened():
            raise RuntimeError('Error')

        while True:
            image = ImageGrab.grab()  # 获取屏幕数据
            # w, h = image.size
            image = image.resize((1366, 750), Image.ANTIALIAS)  # 图片缩放
            output_buffer = BytesIO()  # 创建二进制对象
            image.save(output_buffer, format='JPEG', quality=100)  # quality提升图片分辨率
            frame = output_buffer.getvalue()  # 获取二进制数据
            yield frame  # 生成器返回一张图片的二进制数据






app = Flask(__name__)


@app.route('/')
def index():
    """
    视图函数
    :return:
    """
    return render_template_string('''<html>

<head>
    <title>屏幕共享</title>
</head>

<body>
    <img src="{{ url_for('video_feed') }}">
</body>

</html>''')


def gen(camera):
    """
    流媒体发生器
    """
    while True:
        frame = camera.get_frame()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    """流媒体数据"""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    ip_host = '127.0.0.1'# 本机ip地址
    ip_host2 = '0.0.0.0'# 内网ip地址
    app.run(threaded=True, host=ip_host2, port=80)
````