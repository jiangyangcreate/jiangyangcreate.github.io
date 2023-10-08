---
tags: [单片机]
---
[thinker edge R](https://tinker-board.asus.com/product/tinker-edge-r.html) 是华硕的一款单片机产品,适用于 AI 应用的单板计算机。

- 支持Linux（Debian 9 ，最新版支持Debian 10）和安卓系统（9）。
- 处理器ARM架构最多6核。
- 内存DDR4 最大4GB（系统）+2GB（NPU）。
- 存储16GB+SD卡插槽
- 带有HDMI*1、typeC*1、USB3.0*3、以太网、音频接口、GPIO接口、摄像头接口、蓝牙、WiFi、GPS、NFC、蜂窝网络、摄像头接口等接口。
- TIP：SIM卡与SD卡的插槽在背面，同时背面绘制有此主板的具体型号，如：`Thinker Edge R 1.02`，下载配套的软件或驱动时，可认准此型号。

## 烧录系统流程

具体流程查看[开发者文档](https://tinker-board.asus.com/doc_er.html#started)，这里说一些注意事项。

### 镜像与工具安装的注意事项

Get Tinker Edge R ROM Image 与 Get Edge R Flash tool (Windows GUI version)是一个网址下载，这里华硕没有把他们分开，下载的时候注意看后缀，如果含有`Debian`则说明这是Linux系统的镜像，如果是`Flash Tool (GUI)`，说明这是刷机工具，同理，如果是 `Android`则说明这是安卓系统的镜像。

这里我们选择最早的`Tinker Edge R Flash Tool (GUI) V1.0.0`镜像选择与主板号对应的1.04，即`Tinker_Edge_R-Debian-Stretch-V1.0.4`

### 驱动的注意事项

把对应版本的压缩包（我的是1.04）`Tinker_Edge_R-Debian-Stretch-V1.0.4.zip`解压，阅读其中的readme.txt 根据提示解压tools文件夹下的`DriverAssitant_v4.91.zip`，安装驱动即可。驱动目前是支持到Windows 10，实测发现win11也可以用。

### 进入刷机模式注意事项

- 使用指定的typeC连接线连接电脑与单片机（此时主板有弱电流）
- 通过跳针短接重启键（此时主板有弱电流）
- 拔出跳针，连接电源，等待电脑识别设备。（连接电源后主板有强电流，所以请确保跳针先被拔出再通电）

### 刷机注意事项

图形化的刷机工具刷机会提示成功，此时连接显示器即可获得新电脑，用终端运行桌面的配置文件，会安装华硕推荐的一些软件包。

TIP：Flash工具-命令行（Windows、Linux）和图形化的刷机工具是AB方案，任选一种。不是先后顺序。

### 其他注意事项

- 烧录时不使用指定的连接线可能无法识别设备。
- 如果烧录了非指定系统，该单片机可能烧毁或无法工作，可以使用跳针来恢复刷机模式检测看能否继续使用。
- 工作温度：0℃ ~ 60℃，冬季请避免在室外使用，可能和ipad一样停止工作。

## 进阶

如果你需要大规模的铺货,需要默认安装一批自定义的内容。那么应该怎么办？

打包你的镜像是个不错的方案。

### 镜像格式的区别

- ISO文件通常来自光盘镜像，例如Windows安装光盘的ISO镜像文件。
- 而IMG文件可以来自多种渠道，例如从移动设备制造商下载的Android操作系统镜像文件，或者是从虚拟机软件中制作的虚拟机磁盘镜像文件。IMG格式是ISO的严格超集，ISO文件是IMG文件的一种特例。
