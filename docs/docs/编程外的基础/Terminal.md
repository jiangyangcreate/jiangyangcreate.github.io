---
sidebar_position: 4
title: Terminal
---

Terminals

也称为命令行或控制台，使我们能够在我们的计算机上完成和自动化任务，而无需图形用户界面。 终端起源于 1950 年代到 1960 年代左右，从那时起，它一直是所有操作系统的一个不变特征——从台式机到隐藏在云中的服务器，再到像 Raspberry PI Zero 这样的微型计算机，甚至手机。 在大多数情况下，终端、命令行意味着同一件事。

[网道 bash 教程](https://wangdoc.com/bash/intro)是开源的 bash 文档，教科书式的篇章划分能帮助学习者系统的了解终端命令。

[tldr](https://tldr.inbrowser.app/)是社区维护的命令行工具帮助页面合集，支持在线查询终端命令，有不同平台选择，支持不同语言显示

## 进入和退出方法

进入命令行环境以后，一般就已经打开 Bash 了。如果你的 Shell 不是 Bash，可以输入 bash 命令启动 Bash。

```bash showLineNumbers
# 进入
bash
# 退出
exit
```

## 基本语法

### 命令格式

命令行环境中，主要通过使用 Shell 命令，进行各种操作。Shell 命令基本都是下面的格式。

```bash showLineNumbers
$ command [ arg1 ... [ argN ]]
# 示例
$ ls -l
$ ls --list
```

上面这个命令中，ls 是命令，-l 是参数。

有些参数是命令的配置项，这些配置项一般都以一个连词线开头，比如上面的-l。同一个配置项往往有长和短两种形式，比如-l 是短形式，--list 是长形式，它们的作用完全相同。短形式便于手动输入，长形式一般用在脚本之中，可读性更好，利于解释自身的含义。

Bash 单个命令一般都是一行，用户按下回车键，就开始执行。有些命令比较长，写成多行会有利于阅读和编辑，这时可以在每一行的结尾加上反斜杠，Bash 就会将下一行跟当前行放在一起解释。

```bash showLineNumbers
$ echo foo bar

# 等同于
$ echo foo \
bar
```

### 空格

Bash 使用空格（或 Tab 键）区分不同的参数。

```bash showLineNumbers
$ echo foo bar
```

上面命令中，foo 和 bar 之间有一个空格，所以 Bash 认为它们是两个参数。

如果参数之间有多个空格，Bash 会自动忽略多余的空格。

### 分号与命令的组合符

分号（`;`）是命令的结束符，使得一行可以放置多个命令，上一个命令执行结束后，再执行第二个命令。

```bash
$ clear; ls
```

上面例子中，Bash 先执行`clear`命令，执行完成后，再执行`ls`命令。

注意，使用分号时，第二个命令总是接着第一个命令执行，不管第一个命令执行成功或失败。

```bash
Command1 && Command2
```

上面命令的意思是，如果`Command1`命令运行成功，则继续运行`Command2`命令。

```bash
Command1 || Command2
```

上面命令的意思是，如果`Command1`命令运行失败，则继续运行`Command2`命令。

### type 命令

Bash 本身内置了很多命令，同时也可以执行外部程序。怎么知道一个命令是内置命令，还是外部程序呢？

`type`命令用来判断命令的来源。

```bash
$ type echo
echo is a shell builtin
$ type ls
ls is hashed (/bin/ls)
```

上面代码中，`type`命令告诉我们，`echo`是内部命令，`ls`是外部程序（`/bin/ls`）。

`type`命令本身也是内置命令。

如果要查看一个命令的所有定义，可以使用`type`命令的`-a`参数。

```bash
$ type -a echo
echo is shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

上面代码表示，`echo`命令既是内置命令，也有对应的外部程序。

`type`命令的`-t`参数，可以返回一个命令的类型：别名（alias），关键词（keyword），函数（function），内置命令（builtin）和文件（file）。

```bash
$ type -t bash
file
$ type -t if
keyword
```

上面例子中，`bash`是文件，`if`是关键词。

### 快捷键

Bash 提供很多快捷键，可以大大方便操作。下面是一些最常用的快捷键：

- `Ctrl + L`：清除屏幕并将当前行移到页面顶部。
- `Ctrl + C`：中止当前正在执行的命令。
- `Shift + PageUp`：向上滚动。
- `Shift + PageDown`：向下滚动。
- `Ctrl + U`：从光标位置删除到行首。
- `Ctrl + K`：从光标位置删除到行尾。
- `Ctrl + W`：删除光标位置前一个单词。
- `Ctrl + D`：关闭 Shell 会话。
- `↑`，`↓`：浏览已执行命令的历史记录。

除了上面的快捷键，Bash 还具有自动补全功能。命令输入到一半的时候，可以按下 Tab 键，Bash 会自动完成剩下的部分。比如，输入`tou`，然后按一下 Tab 键，Bash 会自动补上`ch`。

除了命令的自动补全，Bash 还支持路径的自动补全。有时，需要输入很长的路径，这时只需要输入前面的部分，然后按下 Tab 键，就会自动补全后面的部分。如果有多个可能的选择，按两次 Tab 键，Bash 会显示所有选项，让你选择。

## 常用命令

### 运行程序

下面这个代码指向一个 WeChat 可执行文件，若路径有效，则可以同时启动两个微信登录界面

```bash showLineNumbers
start  C:\"Program Files (x86)"\Tencent\WeChat\WeChat.exe
start  C:\"Program Files (x86)"\Tencent\WeChat\WeChat.exe
```

### 端口

查看端口号占用情况

```bash showLineNumbers
netstat -tunlp | grep 端口号

lsof -i:端口号
```

杀掉指定端口的应用(以 6022 为例)

```bash showLineNumbers
kill -9 $(lsof -i tcp:6022 -t)
```

后台运行程序(以 fast_api.py 为例)

```bash showLineNumbers
nohup python3 fast_api.py &
```

### 系统

查看内存/显示系统当前进程信息

```bash showLineNumbers
top
```

安装软件

```bash showLineNumbers
dpkg -i 包名
dpkg -i code_1.83.0-1696349969_arm64.deb
```

更新并下载源

```bash showLineNumbers
apt-get update
```

查看磁盘储存状况

```bash showLineNumbers
df -h
```

查看报告系统运行时长及平均负载

```bash showLineNumbers
uptime
```

重启

```bash showLineNumbers
sudo reboot
```

### 文件

显示工作路径

```bash showLineNumbers
pwd
```

复制文件

```bash showLineNumbers
cp old.txt new.txt

-a ：将文件的特性一起复制
-p ：连同文件的属性一起复制，而非使用默认方式，与-a相似，常用于备份
-i ：若目标文件已经存在时，在覆盖时会先询问操作的进行
-r ：递归持续复制，用于目录的复制行为
-u ：目标文件与源文件有差异时才会复制
```

### 编辑

```bash showLineNumbers
vim 文件路径
```

- `a`是进入编辑模式
- `esc`退出编辑模式
- `:wq!`回车确认
