---
sidebar_position: 10
title: ROS 2
---

本章目标：了解并安装ROS 2

:::info
与传统的用于门锁、音响的微控制器不同，ROS 2需要依赖于Ubuntu系统，其微控制器相较于普通MCU成本更高。

因此ROS 2主要用于高级机器人。
:::

## 了解ROS 2

### 丰富的通信类型

ROS 2节省自己搭建网络、定义通信类型、管理连接的时间。

| 通信模式 | 作用 | 特点 | 应用场景 |
| :--- | :--- | :--- | :--- |
| **话题：发布-订阅 (Publish-Subscribe)** | 单向、异步数据流 | 高效、解耦，适用于传感器数据流、状态更新 | 传感器数据流（如相机图像、激光雷达数据）、机器人状态更新（如位置、速度） |
| **服务：服务端-客户端 (Service-Client)** | 同步、请求-响应 | 阻塞式通信，用于需要明确结果的任务 | 触发特定动作（如抓取物体）、查询物体 ID |
| **动作 (Actions)** | 长时任务处理 | 异步、支持进度反馈和取消 | 移动机器人到指定位置、机械臂执行复杂任务 |
| **参数 (Parameters)** | 动态配置节点行为 | 非实时通信，用于启动时或运行时的配置调整 | 调整 PID 控制器增益、修改传感器发布频率 |


### 自动发现机制

同为ROS 2，在同一网段下的不同设备可以<Highlight>自动发现</Highlight>。

:::info
自动发现前提：指要求中继设备允许子设备自由通信。

中继设备可能是路由器、或者手机的热点、随身WIFI等。

允许子设备自由通信有利有弊，如果你在商场或者咖啡馆连接他们的WIFI，你的电脑可能提醒你：你的网络活动可能被其他设备发现。自由通信会带来一定的安全隐患。因此并不是所有的路由器都默认允许允许子设备自由通信。

有的设备会有防火墙，临时关闭防火墙：`sudo ufw disable`，另外要允许`UDP`多播端口（默认7400~7500）。
:::

如果一切正常，你应该可以通过`ping <其他机器的IP>`并联通成功。

此时你可以通过`ros2`运行节点发布消息，其他设备的接收者会收到你的消息。

### 隔离机制

如果你同个网段下，有无人机和机器狗。你想将其编队为：空军 + 陆军；又或者5台无人机 + 机器狗为一组。

ROS 2提供了通信<Highlight>隔离机制</Highlight>。

在同个编队的所有设备终端中执行：`export ROS_DOMAIN_ID=1`。（值范围为0~101，0为默认值）

这个命令是设置了一个环境变量。ROS 2通过判断这个环境变量来识别是否为一组。不同ID节点无法通信。

因此如果你想将其分为两组，只需要在一半的设备上改为非0的，相同的ID即可。

### 多设备跨域通信

如果你的设备分别在两个城市，可以通过配置一台公网下的服务器(也可以在两个网段下，配置一个都能访问的设备作为中继)，将两个城市的设备连接到这台服务器上。这种通信方式被称为<Highlight>Fast-DDS</Highlight>。

在服务器上运行：`fastdds discovery --server-id 0`。

服务器开放11888端口。`sudo ufw allow 11888/tcp`

在设备上运行：`export ROS_DISCOVERY_SERVERS=<服务器IP>:<服务器端口>`。（端口默认11888）

设置ROS中间件为`rmw_fastrtps_cpp`(别人写好的包)：`export RMW_IMPLEMENTATION=rmw_fastrtps_cpp`
然后重新监听：`ros2 daemon stop`，再重新启动：`ros2 daemon start`。

## 模块仓库

ROS 2有大量写好的机器人相关的包，包也称：模块、功能包、库。

安装相机标定：
`sudo apt install ros-jazzy-camera-calibration`

安装SLAM：
`sudo apt install ros-jazzy-slam-toolbox`

你会发现你只需要安装一个包，就可以获得一个功能。和Python通过pip安装包一样。安装后即可实现"一行代码"实现某个功能。


## ROS 2与依赖的安装

安装过程中注意：ROS 2的版本往往与ubuntu的版本有关。查看[https://docs.ros.org/](https://docs.ros.org/)可获得目前主流的版本。

### 设置编码

```bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 
export LANG=en_US.UTF-8
```

### 添加源

```bash
sudo apt update && sudo apt install curl gnupg lsb-release 
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg 
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

### 安装ROS 2

```bash
sudo apt update

sudo apt upgrade

# 如果你是ubuntu 24.04，那么安装jazzy版本
sudo apt install ros-jazzy-desktop
```

### 设置环境变量

```bash
# 立刻执行脚本
source /opt/ros/jazzy/setup.bash

# 之后每次开启终端执行执行脚本
echo " source /opt/ros/jazzy/setup.bash" >> ~/.bashrc 
```

你也可以使用Docker简化这个过程。


复杂的功能需要很多依赖，系统中默认的Python3出于安全考虑，可能不让你在全局环境中安装包。代码的提示给了很多选项，例如安装在虚拟环境中，删除安全文件。加上关键字，<Highlight>你应该学会通过翻译软件，翻译报错信息。它让你看某个文件，也请学会使用翻译软件，翻译文件内容。</Highlight>

```bash
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.
    
    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.
    Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
    sure you have python3-full installed.
    
    If you wish to install a non-Debian packaged Python application,
    it may be easiest to use pipx install xyz, which will manage a
    virtual environment for you. Make sure you have pipx installed.
    
    See /usr/share/doc/python3.12/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

根据提示，得到的解决方式之一：`pip3 install 你的包 --break-system-packages`

或者可以把`externally managed`文件删除。

```bash
sudo apt install -y python3-pip

sudo pip3 install rosdepc --break-system-packages

sudo rosdepc init

rosdepc update
```


