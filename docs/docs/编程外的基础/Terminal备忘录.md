---
sidebar_position: 4
title: Terminal备忘录
---

Terminals, 也称为命令行或控制台，使我们能够在我们的计算机上完成和自动化任务，而无需图形用户界面。 终端起源于 1950 年代到 1960 年代左右，从那时起，它一直是所有操作系统的一个不变特征——从台式机到隐藏在云中的服务器，再到像 Raspberry PI Zero 这样的微型计算机，甚至手机。 在大多数情况下，终端、命令行意味着同一件事。

[网道 bash 教程](https://wangdoc.com/bash/intro)是开源的 bash 文档，教科书式的篇章划分能帮助学习者系统的了解终端命令。

[tldr](https://tldr.inbrowser.app/)是社区维护的命令行工具帮助页面合集，支持在线查询终端命令，有不同平台选择，支持不同语言显示


## 端口

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

## 系统

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

## 文件

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

## 编辑

```bash showLineNumbers
vim 文件路径
```

- `a`是进入编辑模式
- `esc`退出编辑模式
- `:wq!`回车确认
