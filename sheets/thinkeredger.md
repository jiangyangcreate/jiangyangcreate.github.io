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

## 进阶烧录系统流程

如果你需要大规模的铺货,需要默认安装一批自定义的内容。那么应该怎么办？

打包你的镜像是个不错的方案。

### 镜像格式的区别

- *.iso 是一种光盘的存档文件，被设计用于光盘存档，符合ISO 9660等光盘规范；
- *.img 是一种文件归档格式，被设计用于数字存储、传输、以及整片 磁盘/光盘 内容的复制；
- *.img 兼容 *.iso （*.iso 是*.img 的特例）

### 烧录

下载`balenaEtcher`
选择封装好的镜像
点击烧录

## SSH连接

账户与密码默认都是`linaro`

## 基础配置

### 1.更新源文件

中国区的使用者推荐使用阿里云的镜像源，源其实就是指向一个仓库的网址。
1.备份

``` bash
sudo mv /etc/apt/sources.list /etc/apt/sources.list.bak
```

2.编辑源

``` bash
sudo vim /etc/apt/sources.list
```

vim内容如下，`a`是进入编辑模式、`esc`是退出编辑模式，`:`是指令模式，`wq!`是保存指令

完整的操作就是：

- `a`是进入编辑模式
- 删除旧内容，粘贴新内容。
- `esc`退出编辑模式
- `:wq!`回车确认

``` bash
deb http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ buster/updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian-security/ buster/updates main non-free contrib
```

3.更新并下载源

``` bash
sudo apt-get update
sudo apt-get upgrade
```

参考链接：
<https://www.cnblogs.com/liqi175/p/16788629.html>

### 2.安装中文

1.安装 locales 软件包

``` bash
apt-get install locales
```

2.配置 locales 软件包

``` bash
dpkg-reconfigure locales
```

参考下方说明在界面中钩选上 `zh_CN.UTF-8 UTF-8`并确认

- `空格键`是选择
- `回车`代表确认并进入下一步
- `↑↓`上下移动光标

![图片](/2023/debiancn2.png)

系统默认的区域选择刚刚下载的 `zh_CN.UTF-8 UTF-8`，回车OK

![图片](/2023/debiancn1.png)

重启后即大功告成~

### 配置中文输入法

``` bash
# 安装im-config框架
sudo apt-get install im-config
# 安装开源输入法fcitx框架
sudo apt-get install fcitx
# 安装fcitx框架下的拼音输入法
sudo apt-get install fcitx pinyin
# 如果缺少组件或遇到报错可以用这条命令修复
sudo apt --fix-broken install
# 安装ui框架
sudo apt install fcitx-ui-classic
# 安装配置文件，增加中文输入模式
sudo apt install fcitx-config-gtk
```

全部安装完成后

在开始菜单找到`fcitx`进入输入法配置界面

点击`-`号移除所有的输入法（让系统重新读取）

点击`+`号，然后弹出“添加输入法”的窗口，先选择中文键盘(第一个输入法为非激活状态)，后选择拼音输入法

点击全局配置，点击显示高级选项，开启跨程序即可保持输入法持续被激活。

### 安装软件

在终端打开文件所在位置后，安装执行`sudo dpkg -i 包名`。以vscode为例,

``` bash
cd home/Desktop
sudo dpkg -i code_1.83.0-1696349969_arm64.deb
```
