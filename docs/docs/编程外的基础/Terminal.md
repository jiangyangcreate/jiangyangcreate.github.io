---
sidebar_position: 4
title: Terminal
---

Terminals

也称为命令行或控制台，使我们能够在计算机上完成和自动化任务，而无需图形用户界面。终端起源于 1950 年代到 1960 年代左右，从那时起就一直是所有操作系统的重要组成部分——从台式机到隐藏在云中的服务器，再到像 Raspberry PI Zero 这样的微型计算机，甚至手机。在大多数情况下，终端、命令行意味着同一件事。

面试中命令行通常特指类Unix系统，如Linux、macOS、Ubuntu等，这些系统与生产环境保持一致。

如果你是 Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）或 Windows 11 ：推荐使用 <HoverText text="WSL（Windows Subsystem for Linux）" explanation="可以在 Windows 上直接使用 Linux 应用程序、实用工具和 Bash 命令行工具（未经修改），无需传统虚拟机或双包设置的开销。"/>

## WSL 安装

```bash showLineNumbers
# 安装wsl
wsl --install

# 查看可用的Linux发行版列表
wsl --list --online

# 安装指定的Linux发行版
wsl --install -d <distro-name>
# 示例：wsl --install -d Ubuntu-24.04

# 列出已安装的发行版的名称、运行状态、wsl版本
wsl -l -v

# 设置默认发行版（配置后输入wsl命令即可进入）
wsl --set-default <distro-name>

# 导出
wsl --export <你的Ubuntu发行版名称> <导出的文件路径>.tar
# 示例：wsl --export Ubuntu-24.04 ubuntu-24.04-wsl-ros2.tar

# 从文件导入
wsl --import <新实例的名称> C:\<新实例的文件夹> <压缩包的完整路径>
# 示例：wsl --import Ubuntu-ROS2 C:\WSL_ROS2 D:\windows_app\systools\ubuntu-24.04-wsl-ros2.tar


# 启动指定wsl
wsl -d <新实例的名称>
# 示例：wsl -d Ubuntu-ROS2

```

如果你不属于以上系统，推荐购买云服务器并选择Linux系统配置，然后使用SSH连接到服务器。

[网道 bash 教程](https://wangdoc.com/bash/intro)是开源的 bash 文档，教科书式的篇章划分能帮助学习者系统的了解终端命令。

[tldr](https://tldr.inbrowser.app/)是社区维护的命令行工具帮助页面合集，支持在线查询终端命令，有不同平台选择，支持不同语言显示

## 基本语法

### 命令格式

| 组成部分 | 格式 | 示例 | 说明 |
|----------|------|------|------|
| 基本格式 | `command [ arg1 ... [ argN ]]` | `ls -l` | command是命令，后面跟参数 |
| 短参数 | `-参数` | `ls -l` | 便于手动输入 |
| 长参数 | `--参数名` | `ls --list` | 用在脚本中，可读性更好 |
| 多行命令 | `命令 \` `续行内容` | `echo foo \` `bar` | 使用反斜杠连接多行 |

### 命令分隔与组合

| 符号 | 功能 | 示例 | 说明 |
|------|------|------|------|
| `;` | 命令分隔符 | `clear; ls` | 顺序执行多个命令，不管前一个是否成功 |
| `&&` | 逻辑与 | `Command1 && Command2` | 第一个命令成功后才执行第二个 |
| `\|\|` | 逻辑或 | `Command1 \|\| Command2` | 第一个命令失败后才执行第二个 |

### 空格处理规则

| 情况 | 处理方式 | 示例 | 说明 |
|------|----------|------|------|
| 参数分隔 | 用空格或Tab分隔 | `echo foo bar` | foo和bar被认为是两个参数 |
| 多余空格 | 自动忽略 | `echo  foo   bar` | 多个空格会被忽略为一个 |
| 路径含空格 | 使用引号保护 | `"C:\Program Files"` | 防止路径被错误分割 |

### type命令

| 用法 | 命令 | 示例输出 | 说明 |
|------|------|----------|------|
| 基本用法 | `type 命令名` | `echo is a shell builtin` | 判断命令类型 |
| 查看所有定义 | `type -a 命令名` | 显示所有可能的定义 | 一个命令可能有多种实现 |
| 返回类型 | `type -t 命令名` | `file`、`builtin`、`alias`等 | 返回命令的具体类型 |

### 命令类型说明

| 类型 | 英文 | 说明 | 示例 |
|------|------|------|------|
| 别名 | alias | 用户自定义的命令别名 | `ll` 通常是 `ls -l` 的别名 |
| 关键词 | keyword | Shell的保留关键字 | `if`、`for`、`while` |
| 函数 | function | 用户定义的Shell函数 | 自定义函数 |
| 内置命令 | builtin | Shell内置的命令 | `echo`、`cd`、`pwd` |
| 外部文件 | file | 独立的可执行文件 | `/bin/ls`、`/usr/bin/grep` |

## 快捷键

### 常用快捷键

| 快捷键 | 功能 | 使用场景 |
|--------|------|----------|
| `Ctrl + L` | 清除屏幕并将当前行移到页面顶部 | 清理屏幕内容 |
| `Ctrl + C` | 中止当前正在执行的命令 | 停止运行中的程序 |
| `Shift + PageUp` | 向上滚动 | 查看历史输出 |
| `Shift + PageDown` | 向下滚动 | 查看历史输出 |
| `Ctrl + U` | 从光标位置删除到行首 | 快速删除命令开头部分 |
| `Ctrl + K` | 从光标位置删除到行尾 | 快速删除命令结尾部分 |
| `Ctrl + W` | 删除光标位置前一个单词 | 删除单个单词 |
| `Ctrl + D` | 关闭 Shell 会话 | 退出终端 |
| `↑`、`↓` | 浏览已执行命令的历史记录 | 重复使用历史命令 |

### 自动补全功能

| 操作 | 按键 | 功能 | 示例 |
|------|------|------|------|
| 命令补全 | `Tab` | 自动补全命令名 | 输入 `tou` + Tab → `touch` |
| 路径补全 | `Tab` | 自动补全文件路径 | 输入部分路径 + Tab |
| 显示选项 | `Tab` + `Tab` | 显示所有可能的补全选项 | 当有多个匹配项时 |

## 文件增删改查

### 基本文件操作

| 操作类型 | 命令 | 示例 | 说明 |
|----------|------|------|------|
| 显示当前路径 | `pwd` | `pwd` | 显示当前工作目录的完整路径 |
| 复制文件 | `cp old.txt new.txt` | `cp readme.txt backup.txt` | 复制文件 |

### CP命令参数详解

| 参数 | 功能 | 使用场景 |
|------|------|----------|
| `-a` | 将文件的特性一起复制 | 完整复制文件属性 |
| `-p` | 连同文件的属性一起复制，而非使用默认方式，与-a相似 | 常用于备份 |
| `-i` | 若目标文件已经存在时，在覆盖时会先询问操作的进行 | 防止意外覆盖重要文件 |
| `-r` | 递归持续复制 | 用于目录的复制行为 |
| `-u` | 目标文件与源文件有差异时才会复制 | 增量备份 |

### 文件编辑

| 操作 | 按键/命令 | 说明 |
|------|-----------|------|
| 打开文件编辑 | `vim 文件路径` | 使用vim编辑器打开文件 |
| 进入编辑模式 | `a` | 在当前光标位置进入插入模式 |
| 退出编辑模式 | `Esc` | 回到命令模式 |
| 保存并退出 | `:wq!` + Enter | 强制保存并退出vim |

### 文件权限详解

#### 权限基础概念

Linux文件权限使用三位数字表示，每位数字代表不同用户组的权限：
- **第一位**：文件所有者（owner）的权限
- **第二位**：同组用户（group）的权限  
- **第三位**：其他用户（others）的权限

#### 权限数字含义

| 数字 | 二进制 | 权限组合 | 说明 |
|------|--------|----------|------|
| 0 | 000 | --- | 无任何权限 |
| 1 | 001 | --x | 仅执行权限 |
| 2 | 010 | -w- | 仅写入权限 |
| 3 | 011 | -wx | 写入+执行权限 |
| 4 | 100 | r-- | 仅读取权限 |
| 5 | 101 | r-x | 读取+执行权限 |
| 6 | 110 | rw- | 读取+写入权限 |
| 7 | 111 | rwx | 读取+写入+执行权限（完全权限） |

#### 常用权限组合示例

| 权限码 | 权限分布 | 适用场景 | 说明 |
|--------|----------|----------|------|
| 644 | rw-r--r-- | 普通文件 | 所有者可读写，其他人只读 |
| 755 | rwxr-xr-x | 可执行文件/目录 | 所有者完全权限，其他人可读可执行 |
| 777 | rwxrwxrwx | 临时文件 | 所有人完全权限（不安全，少用） |
| 600 | rw------- | 私密文件 | 仅所有者可读写，其他人无权限 |
| 700 | rwx------ | 私密目录 | 仅所有者有完全权限 |
| 664 | rw-rw-r-- | 共享文档 | 所有者和组可读写，其他人只读 |

#### 权限修改命令详解

| 命令格式 | 示例 | 说明 |
|----------|------|------|
| `chmod 数字 文件` | `chmod 644 file.txt` | 使用数字设置权限 |
| `chmod u+rwx 文件` | `chmod u+rwx script.sh` | 给所有者添加读写执行权限 |
| `chmod g-w 文件` | `chmod g-w file.txt` | 移除组用户的写权限 |
| `chmod o=r 文件` | `chmod o=r file.txt` | 设置其他用户只有读权限 |
| `chmod -R 755 目录` | `chmod -R 755 /var/www` | 递归设置目录及其内容权限 |

#### 符号说明

| 符号 | 含义 | 使用示例 |
|------|------|----------|
| u | user（所有者） | `chmod u+x file` |
| g | group（组） | `chmod g+w file` |
| o | others（其他人） | `chmod o-r file` |
| a | all（所有人） | `chmod a+x file` |
| + | 添加权限 | `chmod +x file` |
| - | 移除权限 | `chmod -w file` |
| = | 设置权限 | `chmod u=rwx file` |

#### 查看文件权限

| 命令 | 示例输出 | 说明 |
|------|----------|------|
| `ls -l 文件名` | `-rw-r--r-- 1 user group 1024 Dec 15 10:30 file.txt` | 查看单个文件权限 |
| `ls -la` | 列出所有文件（包括隐藏文件）的详细权限信息 | 查看目录下所有文件权限 |
| `stat 文件名` | 显示文件的详细状态信息，包括权限的八进制表示 | 获取更详细的权限信息 |

#### 权限输出解读示例

以 `ls -l` 输出 `-rw-r--r-- 1 user group 1024 Dec 15 10:30 file.txt` 为例：

| 部分 | 含义 | 解释 |
|------|------|------|
| `-` | 文件类型 | `-`表示普通文件，`d`表示目录，`l`表示链接 |
| `rw-` | 所有者权限 | 可读可写，不可执行 |
| `r--` | 组权限 | 仅可读 |
| `r--` | 其他人权限 | 仅可读 |
| `user` | 文件所有者 | 用户名 |
| `group` | 文件所属组 | 组名 |

#### 安全建议

| 权限设置 | 安全级别 | 建议使用场景 |
|----------|----------|--------------|
| 644 | 安全 | 普通文档、配置文件 |
| 755 | 安全 | 脚本、程序、目录 |
| 600/700 | 高安全 | 密钥文件、私人目录 |
| 666/777 | 不安全 | 仅在临时测试时使用，生产环境禁用 |

:::warning 权限安全提醒
- **避免使用777权限**：所有用户都有完全权限，存在安全隐患
- **私密文件使用600权限**：如SSH密钥、密码文件等
- **脚本文件使用755权限**：确保可以执行，但不给其他用户写权限
- **定期检查关键文件权限**：确保系统安全
:::

## 系统信息

| 功能 | 命令 | 说明 | 常用参数 |
|------|------|------|----------|
| 查看进程 | `top` | 实时显示系统进程和资源使用情况 | 交互式界面，q退出 |
| 安装软件包 | `dpkg -i 包名` | 安装deb格式的软件包 | `dpkg -i code_1.83.0-1696349969_arm64.deb` |
| 更新软件源 | `apt-get update` | 更新软件包列表 | 通常在安装新软件前执行 |
| 查看磁盘空间 | `df -h` | 显示文件系统磁盘空间使用情况 | -h 以人类可读格式显示 |
| 系统运行时间 | `uptime` | 显示系统运行时长及平均负载 | 显示当前时间、运行时长、用户数、负载 |
| 系统重启 | `sudo reboot` | 重新启动系统 | 需要管理员权限 |

## 环境变量

环境变量就像"电子便利贴"，电脑可以在上面记录一些重要信息（比如你的名字、文件路径等），任何程序都可以查看这些便利贴。

### 不同系统环境变量操作对比

| 特性 | Windows (PowerShell) | Linux/Mac (Bash) | 说明 |
|------|----------------------|-------------------|------|
| **进程可见(临时)变量** | `$env:VAR = "值"` | `export VAR="值"` | 其他程序可以通过os.getenv等方法访问 |
| **仅Shell可见(临时)变量** | `$VAR = "值"` | `VAR="值"` | 其他程序看不到，关闭窗口后消失 |
| **纯数字设置** | `$env:AGE = 30` | `export AGE=30` | 数字也以字符串形式存储 |
| **永久生效方法** | 系统属性 → 环境变量 | 写入 `~/.bashrc` 或 `~/.zshrc` | 重启后仍然生效 |
| **值含空格时** | 必须加引号 | 必须加引号 | 避免空格引发歧义 |
| **特殊字符处理** | 需引号保护 | 需引号保护 | 保护特殊字符不被解释 |
| **本质数据类型** | 始终是字符串 | 始终是字符串 | 环境变量本质都是字符串 |

### PowerShell特殊示例

```powershell showLineNumbers
# 启动两个微信登录界面（Windows路径含空格示例）
start  C:\"Program Files (x86)"\Tencent\WeChat\WeChat.exe
start  C:\"Program Files (x86)"\Tencent\WeChat\WeChat.exe
```

## 端口管理

| 操作类型 | 命令 | 示例 | 说明 |
|----------|------|------|------|
| 查看端口占用 | `netstat -tunlp \| grep 端口号` | `netstat -tunlp \| grep 8080` | 查看指定端口占用情况 |
| 查看端口占用 | `lsof -i:端口号` | `lsof -i:8080` | 另一种查看端口占用的方法 |
| 杀掉端口进程 | `kill -9 $(lsof -i tcp:端口号 -t)` | `kill -9 $(lsof -i tcp:6022 -t)` | 强制终止占用指定端口的进程 |
| 后台运行程序 | `nohup 命令 &` | `nohup python3 fast_api.py &` | 程序在后台持续运行，不受终端关闭影响 |

## 远程连接

### SSH连接

| 操作步骤 | 命令/操作 | 说明 |
|----------|-----------|------|
| SSH登录 | `ssh linaro@192.168.3.55` | 默认账户和密码都是 linaro |

## 文件传输

- 如果你想在本机和设备间文件传输，可以使用`scp`命令，在你的电脑上重新打开一个终端，输入对应的指令即可。

| 传输方向 | 命令格式 | 示例 | 说明 |
|----------|----------|------|------|
| 本地→远程 | `scp /path/to/local/file username@remote_host:/path/to/remote/directory` | `scp "Z:\test99.py" linaro@192.168.3.55:~/Downloads` | 将本地文件复制到远程主机 |
| 远程→本地 | `scp username@remote_host:/path/to/remote/file /path/to/local/directory` | `scp linaro@192.168.3.55:~/test.py ./` | 将远程文件复制到本地 |
| 目录传输 | `scp -r /path/to/local/directory username@remote_host:/path/to/remote/directory` | `scp -r ./myproject linaro@192.168.3.55:~/` | 递归复制整个目录 |

### 特殊符号说明

| 符号 | 含义 | 示例 |
|------|------|------|
| `~` | 用户主目录 | `~/Downloads` 表示用户主目录下的Downloads文件夹 |
| `-r` | 递归选项 | 用于复制目录及其内容 |

## Linux版本信息

:::info
Linux 内核衍生版本众多，譬如 ubuntu、debian、centos、fedora、archlinux 等。

不同版本之间存在差异，譬如 ubuntu 大版本号之外，小版本号也很重要，此外有时候版本号和代号会混用，譬如 ros 2（一种机器人操作系统）只能使用 Ubuntu 的 noble 即 Ubuntu 24.04。
:::

| Ubuntu版本 | 代号 | 特殊说明 |
|------------|------|----------|
| 24.10 | oracular | 最新版本 |
| 24.04 | noble | ROS 2 支持版本 |

## 有趣的命令行体验

### 终端娱乐命令

| 命令名称 | 安装命令 | 使用方法 | 功能说明 |
|----------|----------|----------|----------|
| hollywood | `sudo apt-get install hollywood` | `hollywood` | 让终端像好莱坞大片一样显示各种电脑参数 |
| cowsay | `sudo apt-get install cowsay` | `cowsay "消息内容"` | 让一头牛说话，显示指定消息 |
| fortune | `sudo apt-get install fortune` | `fortune` | 显示随机名言、谚语或幽默语句 |
| lolcat | `sudo apt-get install lolcat` | `命令 \| lolcat` | 将文本输出为彩虹颜色 |

### 命令组合示例

| 组合效果 | 命令 | 说明 |
|----------|------|------|
| 彩色牛说谚语 | `fortune \| cowsay \| lolcat` | 结合三个命令：随机谚语 + 牛说话 + 彩色输出 |
| 退出娱乐模式 | `Ctrl + C` | C表示Cancel（取消），退出当前运行的程序 |

### 重要概念说明


sudo ：以超级用户（root）身份执行命令 

su 表示 super user（超级用户） do 表示 执行。

apt-get 包管理器名称，用于下载和安装软件包

示例：`sudo apt-get install <软件包>` 

`su 用户名`表示切换到该用户，如果不填用户名则默认切换到`root`


管道符 `\|`  将前一个命令的输出作为后一个命令的输入 ,示例 `command1 \| command2` |

## 系统管理实战案例

### 案例1：系统状态报告和管理脚本

#### 工作环境设置

| 操作类型 | 命令 | 说明 |
|----------|------|------|
| 创建工作目录 | `mkdir -p /tmp/system_report` | 创建目录（包括父目录） |
| 进入目录 | `cd /tmp/system_report` | 切换到工作目录 |
| 记录当前路径 | `pwd > current_directory.txt` | 将当前路径保存到文件 |
| 列出目录内容 | `ls -l > directory_listing.txt` | 详细列出文件和文件夹信息 |

#### 系统和用户信息收集

| 信息类型 | 命令 | 说明 |
|----------|------|------|
| 当前时间 | `date > system_datetime.txt` | 获取系统日期和时间 |
| 当前用户 | `whoami > current_user.txt` | 显示当前登录用户 |
| 内核版本 | `uname -r > kernel_version.txt` | 显示系统内核版本信息 |
| root用户ID | `echo "Root user ID: $(id -u root)" > root_user_id.txt` | 获取root用户的ID |

#### 文件和目录信息

| 操作 | 命令 | 说明 |
|------|------|------|
| 查看配置目录 | `ls -l /etc > etc_directory_listing.txt` | 列出/etc目录内容 |
| 查看文件权限 | `ls -l /etc/passwd > file_permissions.txt` | 检查passwd文件权限 |
| 修改文件权限 | `chmod 644 /tmp/system_report/* > chmod_output.txt 2>&1` | 设置文件权限为644（所有者读写，组用户和其他用户只读） |

#### 系统日志和资源信息

| 信息类型 | 命令 | 说明 |
|----------|------|------|
| 内核消息 | `dmesg > dmesg.log` | 收集内核环形缓冲区消息 |
| 系统日志 | `journalctl -xe > system_journal.log` | 获取系统详细日志 |
| 运行时间 | `uptime > uptime_info.txt` | 系统运行时间和负载信息 |
| 文件类型 | `file /etc/passwd > file_type.txt` | 检查文件类型信息 |

#### 磁盘和进程信息

| 信息类型 | 命令 | 说明 |
|----------|------|------|
| 磁盘使用 | `df -h > disk_usage.txt` | 磁盘空间使用情况（人类可读格式） |
| 进程列表 | `ps -aux > process_list.txt` | 显示所有进程信息 |
| 实时进程（批处理） | `top -b -n 1 > top_output.txt` | 一次性获取top信息 |
| htop信息 | `htop -C -b -n 1 > htop_output.txt` | 一次性获取htop信息 |

#### 网络信息收集

| 信息类型 | 命令 | 说明 |
|----------|------|------|
| 网络连接 | `sudo netstat -tulnp > network_connections.txt` | 显示当前网络连接状态 |

#### 文件压缩和传输

| 操作 | 命令 | 说明 |
|------|------|------|
| 创建压缩包 | `tar -czvf system_report.tar.gz *.txt *.log` | 压缩所有文本和日志文件 |
| 发送给管理员 | `scp system_report.tar.gz admin@example.com:/reports/` | 通过scp传输报告文件 |

### 案例2：系统安全监控

#### 安全监控命令

| 监控类型 | 命令 | 说明 |
|----------|------|------|
| 失败登录记录 | `grep "Failed password" /var/log/auth.log` | 查找登录失败记录 |
| 活动用户 | `w` | 显示当前登录的用户 |
| 最后登录信息 | `last` | 显示用户登录历史 |
| 开放端口 | `ss -tuln` | 显示监听的端口 |
| 文件完整性 | `find /etc -type f -exec md5sum {} \;` | 检查配置文件完整性 |

## Linux系统测试题库

### 单选题

| 题目 | 选项 | 正确答案 |
|------|------|----------|
| 在Linux中，以下哪个命令用于查看当前目录的内容？ | A. cd B. ls C. pwd D. mkdir | B |
| 哪个命令用于在Linux中创建一个新目录？ | A. mkdir B. rmdir C. touch D. rm | A |
| 在Linux中，以下哪个命令用于删除文件？ | A. delete B. remove C. rm D. del | C |
| 哪个命令用于在Linux中查看文件内容？ | A. view B. cat C. see D. read | B |
| 在Linux中，以下哪个命令用于复制文件？ | A. copy B. cp C. duplicate D. clone | B |
| 哪个命令用于在Linux中移动或重命名文件？ | A. move B. rename C. mv D. shift | C |
| 在Linux中，以下哪个命令用于查看磁盘使用情况？ | A. disk B. df C. space D. usage | B |
| 哪个命令用于在Linux中查看当前运行的进程？ | A. processes B. ps C. running D. tasks | B |
| 在Linux中，以下哪个命令用于终止进程？ | A. stop B. end C. kill D. terminate | C |
| 哪个命令用于在Linux中压缩文件？ | A. compress B. zip C. tar D. pack | C |

### 判断题

| 题目 | 正确答案 |
|------|----------|
| 在Linux中，`pwd`命令用于显示当前工作目录的路径。 | 对 |
| `chmod`命令用于更改文件的权限。 | 对 |
| `exit`命令用于退出当前Shell会话。 | 对 |
| `echo`命令用于输出文本到终端。 | 对 |
| `tar`命令可以用于压缩和解压文件。 | 对 |
| 在Linux中，`kill`命令只能终止当前用户的进程。 | 错 |
| `find`命令只能搜索文件名，不能搜索目录。 | 错 |
| `crontab`命令用于管理定时任务。 | 对 |
| 在Linux中，`lsof`命令用于列出打开的文件。 | 对 |
| `iptables`命令用于配置文件权限。 | 错 |
| 在Linux中，`ls`命令用于列出目录中的文件。 | 对 |
| Bash脚本中，注释行以`#`开头。 | 对 |
| 在Linux中，`rm`命令用于移动文件。 | 错 |
| `cd ..`命令用于切换到上一级目录。 | 对 |
| Linux中，`/bin`目录通常包含二进制可执行文件。 | 对 |
| `chmod`命令用于修改文件的所有者。 | 错 |
| 在Linux中，`man`命令用于查看命令的手册页。 | 对 |
| `df -h`命令用于查看磁盘空间使用情况。 | 对 |
| `ps`命令用于显示当前系统的进程信息。 | 对 |
| `mkdir`命令用于删除目录。 | 错 |

### 多选题

| 题目 | 选项 | 正确答案 |
|------|------|----------|
| 以下哪些命令可以用于在Bash中定义和调用函数？ | A. func B. function C. () D. def | B, C |
| 在Bash中，以下哪些符号可以用于重定向标准输出？ | A. > B. >> C. < D. \| | A, B |
| 以下哪些命令可以用于SSH登录到远程服务器？ | A. ssh B. scp C. sftp D. rsync | A, B, C |
| Bash脚本中，以下哪些符号用于逻辑运算？ | A. && B. \|\| C. ! D. == | A, B, C |
| 在SSH配置文件`~/.ssh/config`中，以下哪些选项可以用于配置主机？ | A. Host B. User C. Port D. Password | A, B, C |
| Bash中，以下哪些命令可以用于文本处理？ | A. awk B. sed C. grep D. ls | A, B, C |
| 以下哪些命令可以用于查看和管理SSH密钥？ | A. ssh-keygen B. ssh-add C. ssh-agent D. ssh-copy-id | A, B, C, D |
| 在Bash中，以下哪些命令可以用于控制流操作？ | A. if B. for C. while D. switch | A, B, C |
| 以下哪些命令可以用于查看Bash中的环境变量？ | A. printenv B. env C. set D. export | A, B, C |
| 在Bash中，以下哪些命令可以用于信号处理？ | A. trap B. kill C. sigaction D. signal | A, B |
| 在Linux中，以下哪些命令可以用于文件操作？ | A. cp B. mv C. rm D. all of the above | A, B, C |
| 以下哪些命令可以显示文件内容？ | A. cat B. less C. more D. tail | A, B, C, D |
| 以下哪些命令可以用于查看磁盘使用情况？ | A. df B. du C. ls D. top | A, B |
| 以下哪些命令可以用于搜索文件中的文本内容？ | A. grep B. find C. locate D. awk | A, D |
| 以下哪些命令可以用于网络管理？ | A. ifconfig B. ip C. ping D. netstat | A, B, C, D |
| 在Linux中，以下哪些命令可以用于进程管理？ | A. ps B. top C. kill D. all of the above | A, B, C |
| 以下哪些命令可以用于压缩和解压文件？ | A. tar B. gzip C. unzip D. zip | A, B, C, D |
| 在Linux中，以下哪些目录通常包含配置文件？ | A. /etc B. /var C. /home D. /usr | A, D |
| 以下哪些命令可以用于监控系统性能？ | A. top B. htop C. vmstat D. iostat | A, B, C, D |
| 在Linux中，以下哪些命令可以用于管理服务？ | A. systemctl B. service C. init D. all of the above | A, B, C |

### 重要提示

:::warning
终端的命令通过空格和反斜杠来区分参数或者换行，示例中的引号并不是字符串的引号，而是为了避免空格和反斜杠引发歧义。<Highlight>环境变量本质都是字符串，建议新手始终使用引号包裹环境变量。</Highlight>
:::

不光是环境变量，其他命令的变量也遵循这个引号使用规则。正确理解和使用这些规则对于避免命令执行错误非常重要。
