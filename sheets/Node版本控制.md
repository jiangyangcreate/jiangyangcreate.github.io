---
tags: [Node]
---

## Windows

### 在Windows下完全卸载已安装的node.js

1. 从卸载程序卸载程序和功能，也可以直接右键node.js的安装包并选择卸载。

2. 重新启动（或者重新启动任务管理器杀死所有与节点相关的进程）。

3. 从下列的目录中找到相关的内容并删除掉：

> C:\Program Files (x86)\nodejs
> C:\Program Files\nodejs
> C:\Users\{User}\AppData\Roaming\npm（或%appdata%\npm）
> C:\Users\{User}\AppData\Roaming\npm-cache（或%appdata%\npm-cache）

4. 检查%PATH%环境变量以确保没有引用Nodejs或npm存在。

5. 重新启动电脑。

### 安装nvm-windows并使用

[到GitHub的项目下载地址](https://github.com/coreybutler/nvm-windows/releases)，选择下载nvm-setup.zip，解压后双击使用安装程序即可。

```bash
# 查看已安装的nodejs版本
nvm list

# 如果是第一次安装，使用该命令结果为：No installations recognized.

# 查看可安装的nodejs版本
nvm list available

# 安装指定版本的nodejs
nvm install 8.11.2 64-bit

# 使用指定版本的nodejs
nvm use 8.11.2

# 安装成功后可以验证下版本：
nvm list

# 删除指定版本的nodejs
nvm uninstall 8.11.2
```

## Linux

### 在 Ubuntu 上安装 NVM

```bash

sudo apt install curl

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# nvm 安装程序脚本为当前用户的登录脚本创建环境条目。您可以注销并再次登录以加载环境或执行以下命令来执行相同操作。
source ~/.profile

# 安装完成后，执行以下命令查看是否安装完成：
nvm --version

# 使用 NVM 安装 node.修改npm为国内镜像
npm config set registry "http://registry.npmmirror.com/"

# 查看设置
npm config get registry

# 安装cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com

# 版本查看
cnpm -v

# 您可以使用 nvm 安装多个 node.js 版本。并从已安装的 node.js 中为您的应用程序使用所需的版本。安装最新版本的 node.js。这里的 node 是最新版本的别名
nvm install node
nvm install 17.7.2

# 使用 NVM 列出当前用户已安装的节点版本
nvm ls

# 使用此命令，您可以找到用于安装的可用 node.js 版本
nvm ls-remote

# 为当前会话选择不同的版本。
nvm use 17.8.0

#要查找为当前用户设置的默认 node 版本，请键入
nvm run default --version
```

参考链接：

本地NODE版本控制
[https://blog.csdn.net/lewky_liu/article/details/87959839](https://blog.csdn.net/lewky_liu/article/details/87959839)

服务器NODE版本控制
[https://www.51cto.com/article/705992.html](https://www.51cto.com/article/705992.html)
