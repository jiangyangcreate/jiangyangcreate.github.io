---
sidebar_position: 4
title: Terminal备忘录
---

## 端口

查看端口号占用情况

``` bash
netstat -tunlp | grep 端口号

lsof -i:端口号
```

杀掉指定端口的应用(以6022为例)

``` bash
kill -9 $(lsof -i tcp:6022 -t)
```

后台运行程序(以fast_api.py为例)
``` bash
nohup python3 fast_api.py &
```

## 系统

查看内存/显示系统当前进程信息

``` bash
top
```

安装软件

``` bash
dpkg -i 包名
dpkg -i code_1.83.0-1696349969_arm64.deb
```

更新并下载源

``` bash
apt-get update
```

查看磁盘储存状况

``` bash
df -h
```

查看报告系统运行时长及平均负载

``` bash
uptime
```

重启

``` bash
sudo reboot
```

## 文件

显示工作路径

``` bash
pwd
```

复制文件

``` bash
cp old.txt new.txt

-a ：将文件的特性一起复制
-p ：连同文件的属性一起复制，而非使用默认方式，与-a相似，常用于备份
-i ：若目标文件已经存在时，在覆盖时会先询问操作的进行
-r ：递归持续复制，用于目录的复制行为
-u ：目标文件与源文件有差异时才会复制
```

## 编辑

``` bash
vim 文件路径
```

- `a`是进入编辑模式
- `esc`退出编辑模式
- `:wq!`回车确认