---
tags: [python,exe]
title: Python分发程序
---

## 封装程序为可执行文件

官方文档：<https://www.pyinstaller.org/>

命令行：

``` bash
# 直接封装
pyinstaller -F app.py 
# 指定图标
pyinstaller -F -i app.ico app.py
# 指定图标 不展示终端框
pyinstaller -F -i app.ico app.py --noconsole
# 将数据文件添加到捆绑包中，中间使用分号分隔，前面是源目录地址，后面是目的目录地址
pyinstaller -F -i app.ico app.py --add-data="C:\mediapipe\modules;mediapipe/modules" --noconsole
```

## 构建包

Python构建包的官方文档：<https://packaging.python.org/tutorials/packaging-projects/>

``` bash
配置pyproject.toml、setup.py、LICENSE、README.md
配置.pypirc 如果是Linux/mac 路径为 $HOME/.pypirc 如果是Windows 则为C:\Users\<your username>\.pypirc


root:[.]
+--LICENSE
+--pyproject.toml
+--README.md
+--setup.py
+--src
| +--Vulncapture
| | +--dialogui.png
| | +--mshei.ttf
| | +--requirements.txt
| | +--titlegui.png
| | +--Vulncapture.py
| | +--__init__.py

自建Python构建包
py -m build 
python -m pip install --user --upgrade setuptools wheel
python setup.py sdist bdist_wheel
py -m twine upload dist/*

```
