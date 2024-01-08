---
sidebar_position: 1
title: C语言基础
---

本文完全转载自[https://github.com/coderit666/CNote](https://github.com/coderit666/CNote),如果对你有帮助，请至源项目下支持原作者。


## 编写C语言程序工具

- 记事本(开发效率低)
- Vim(初学者入门门槛高)
- VSCode(不喜欢)
- eclipse(不喜欢)
- CLion(深爱, 但收费) 
- Xcode(逼格高, 但得有苹果电脑)
- Qt Creator(开源免费,跨平台安装和运行)

**注意：学习 C 语言，选择任意一款你喜欢的工具即可。**



### 什么是Qt Creator ? 

-  Qt Creator 是一款新的轻量级[集成开发环境](https://baike.baidu.com/item/%E9%9B%86%E6%88%90%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)（IDE）。它能够跨平台运行，支持的系统包括 Windows、Linux（32 位及 64 位）以及 Mac OS X 
-  Qt Creator 的设计目标是使开发人员能够利用 Qt 这个应用程序框架更加快速及轻易的完成开发任务
-  开源免费, 简单易用, 能够满足学习需求

> 集成开发环境（IDE，Integrated Development Environment ）是用于提供程序开发环境的应用程序，一般包括代码[编辑器](https://baike.baidu.com/item/%E7%BC%96%E8%BE%91%E5%99%A8)、[编译器](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91%E5%99%A8)、[调试](https://baike.baidu.com/item/%E8%B0%83%E8%AF%95)器和[图形用户界面](https://baike.baidu.com/item/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)等工具。集成了代码编写功能、分析功能、[编译](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91)功能、调试功能等一体化的开发软件服务套。

---

### Qt Creator安装

  **Qt Creator 官网**：http://download.qt.io/

- **切记囫囵吞枣, 不要纠结里面的东西都是什么含义, 初学者安装成功就是一种成功**
- **下载Qt Creator离线安装包:**
- **版本和代码编辑器任意选择都可以**
- **qt软件下载链接**：https://pan.baidu.com/s/1gx0hNDBJkA2gx5wF1Jx34w    提取码：0fg9
  ![](https://img-blog.csdnimg.cn/img_convert/877a6fcffbba776d3e67aeca51372e43.png)

- **以管理身份运行离线安装包**
  ![](https://img-blog.csdnimg.cn/img_convert/047c5f665fbeb3876115dedfcad9c959.png)
- **下一步,下一步,下一步,等待ing...**
  ![](https://img-blog.csdnimg.cn/img_convert/1a0f009c260fe516d234e815adf1d76b.png)
  ![](https://img-blog.csdnimg.cn/img_convert/5da94859c2fd9a5ffba1623c23ddbb40.png)
  ![](https://img-blog.csdnimg.cn/img_convert/6f0aef48193dd947a4c8d48e54feae2e.png)

- **注意安装路径中最好不要出现中文**
  ![](https://img-blog.csdnimg.cn/img_convert/6c5966d76281d17b54025e5fff8d5b0e.png)
- **对于初学者而言全选是最简单的方式(重点!!!)**
  ![](https://img-blog.csdnimg.cn/img_convert/bde285105bfa514e373b512bc3418d0a.png)
  ![](https://img-blog.csdnimg.cn/img_convert/c3f2feae0f59c30a364833ed3c0135c2.png)
  ![](https://img-blog.csdnimg.cn/img_convert/deacb348d25d81efecc9ca4cd53c4a66.png)
  ![](https://img-blog.csdnimg.cn/img_convert/c7c76eb76939a5d59b5773a0a7e75533.png)
  ![](https://img-blog.csdnimg.cn/img_convert/b696c49e0e91fbd9143e14c965e8c978.png)
  ![](https://img-blog.csdnimg.cn/img_convert/c028d658c12f7d38128346afb414583a.png)

- **配置Qt Creator开发环境变量**
  ![](https://img-blog.csdnimg.cn/img_convert/563086d782d416ef6e77e19dfb72b7d7.png)
  ![](https://img-blog.csdnimg.cn/img_convert/46fa77ce612e3ec81e4febc884d646e7.png)
  ![](https://img-blog.csdnimg.cn/img_convert/6588f6f8b5edfbeda00d11db44cb9a61.png)
  ![](https://img-blog.csdnimg.cn/img_convert/20b8ffc3d4c2b2a2cd25f2e2371dc985.png)
  ![](https://img-blog.csdnimg.cn/img_convert/66436cb34bffa2f8ab1cdd796dfa1e2a.png)

> 你的安装路径\5.11.0\mingw53_32\bin
> 你的安装路径\Tools\mingw530_32\bin

- **启动安装好的Qt Creator**
  ![](https://img-blog.csdnimg.cn/img_convert/5c3a056827d8df57b3d5bad1037412b2.png)

---

- **非全选安装到此为止, 全选安装继续往下看**
  **出现这个错误, 忽略这个错误即可**
  ![](https://img-blog.csdnimg.cn/img_convert/1d4f8132efda2029a92b5c39327e8730.png)
- **等待安装完毕之后解决刚才的错误**
  **找到安装目录下的strawberry.msi,双击运行**
  ![](https://img-blog.csdnimg.cn/img_convert/54ff9932b9a77c4ce2d8fcbe17573804.png)
  ![](https://img-blog.csdnimg.cn/img_convert/410bc3e1ba02c89ddcee187774f8a70f.png)
  ![](https://img-blog.csdnimg.cn/img_convert/e563305d1ab0ac4cc331311a18a54e4b.png)
  ![](https://img-blog.csdnimg.cn/img_convert/3997a7fdc4c0179665b3e8e1defcadbc.png)

![](https://img-blog.csdnimg.cn/img_convert/8a4507015ea7f1bf13f5ba330c29703a.png)
![](https://img-blog.csdnimg.cn/img_convert/07d8217977c80f60847db9a90e5c1374.png)



### Qt Creator快捷键

- [Qt Creator Keyboard Shortcuts(Documentation)](http://doc.qt.io/qtcreator/creator-keyboard-shortcuts.html "Qt Creator Keyboard Shortcuts(Documentation)")
- [Qt Creator Keyboard Shortcuts(Wiki)](http://wiki.qt.io/Qt_Creator_Keyboard_Shortcuts "Qt Creator Keyboard Shortcuts(Wiki)")




### 什么是环境变量?

- 打开我们添加环境变量的两个目录, 不难发现里面大部分都是.exe的可执行程序
- 如果我们不配置环境变量, 那么每次我们想要使用这些"可执行程序"都必须"先找到这些应用程序对应的文件夹"才能使用
- 为了方便我们在电脑上"任何地方"都能够使用这些"可执行程序", 那么我们就必须添加环境变量, 因为Windows执行某个程序的时候, 会先到"环境变量中Path指定的路径中"去查找

---

### 为什么要配置系统变量,不配置用户变量

- 用户变量只针对使用这台计算机指定用户
  - 一个计算机可以设置多个用户, 不同的用户用不同的用户名和密码
  - 当给计算机设置了多个用户的时候,启动计算机的时候就会让你选择哪个用户登录
  
- 系统变量针对使用这台计算机的所有用户
  - 也就是说设置了系统变量, 无论哪个用户登录这台计算机都可以使用你配置好的工具
  


### 如何创建C语言程序

- 这个世界上, 几乎所有程序员入门的第一段代码都是Hello World.
- 原因是当年C语言的作者Dennis Ritchie(丹尼斯 里奇)在他的名著`The C Programming Language`中第一次引入, 传为后世经典, 其它语言亦争相效仿, 以示敬意
  ![](https://img-blog.csdnimg.cn/img_convert/8e87f83d4d2501a1c1248c61a786ccc5.png)

### 如何创建C语言文件

![](https://img-blog.csdnimg.cn/img_convert/7ad55f94d20cdd623cf7b15c5d897971.png)

![](https://img-blog.csdnimg.cn/img_convert/ad8b418e47011d7013e980d83b594485.png)
![](https://img-blog.csdnimg.cn/img_convert/fa41dbc82fb401f15894ccb19e7bca7f.png)
![](https://img-blog.csdnimg.cn/img_convert/1bcbe3046f4e7120812588ef785412d2.png)
![](https://img-blog.csdnimg.cn/img_convert/669f4cdc8bdc153e01e10feb70989214.png)
![](https://img-blog.csdnimg.cn/img_convert/d181a8a7e67e482b574bd6755f97e2c7.png)