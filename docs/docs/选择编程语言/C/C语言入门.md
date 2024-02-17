---
sidebar_position: 2
title: C语言入门
---

## 编写 C 语言程序工具

- 记事本(开发效率低)
- Vim(初学者入门门槛高)
- VSCode(不喜欢)
- eclipse(不喜欢)
- CLion(深爱, 但收费)
- Xcode(逼格高, 但得有苹果电脑)
- Qt Creator(开源免费,跨平台安装和运行)

**注意：学习 C 语言，选择任意一款你喜欢的工具即可。**

### 什么是 Qt Creator ?

- Qt Creator 是一款新的轻量级[集成开发环境](https://baike.baidu.com/item/%E9%9B%86%E6%88%90%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)（IDE）。它能够跨平台运行，支持的系统包括 Windows、Linux（32 位及 64 位）以及 Mac OS X
- Qt Creator 的设计目标是使开发人员能够利用 Qt 这个应用程序框架更加快速及轻易的完成开发任务
- 开源免费, 简单易用, 能够满足学习需求

> 集成开发环境（IDE，Integrated Development Environment ）是用于提供程序开发环境的应用程序，一般包括代码[编辑器](https://baike.baidu.com/item/%E7%BC%96%E8%BE%91%E5%99%A8)、[编译器](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91%E5%99%A8)、[调试](https://baike.baidu.com/item/%E8%B0%83%E8%AF%95)器和[图形用户界面](https://baike.baidu.com/item/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)等工具。集成了代码编写功能、分析功能、[编译](https://baike.baidu.com/item/%E7%BC%96%E8%AF%91)功能、调试功能等一体化的开发软件服务套。

---

### Qt Creator 安装

**Qt Creator 官网**：http://download.qt.io/

- **切记囫囵吞枣, 不要纠结里面的东西都是什么含义, 初学者安装成功就是一种成功**
- **下载 Qt Creator 离线安装包:**
- **版本和代码编辑器任意选择都可以**
- **qt 软件下载链接**：https://pan.baidu.com/s/1gx0hNDBJkA2gx5wF1Jx34w 提取码：0fg9
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/877a6fcffbba776d3e67aeca51372e43.png)

- **以管理身份运行离线安装包**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/047c5f665fbeb3876115dedfcad9c959.png)
- **下一步,下一步,下一步,等待 ing...**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/1a0f009c260fe516d234e815adf1d76b.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/5da94859c2fd9a5ffba1623c23ddbb40.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6f0aef48193dd947a4c8d48e54feae2e.png)

- **注意安装路径中最好不要出现中文**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6c5966d76281d17b54025e5fff8d5b0e.png)
- **对于初学者而言全选是最简单的方式(重点!!!)**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/bde285105bfa514e373b512bc3418d0a.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c3f2feae0f59c30a364833ed3c0135c2.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/deacb348d25d81efecc9ca4cd53c4a66.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c7c76eb76939a5d59b5773a0a7e75533.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/b696c49e0e91fbd9143e14c965e8c978.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c028d658c12f7d38128346afb414583a.png)

- **配置 Qt Creator 开发环境变量**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/563086d782d416ef6e77e19dfb72b7d7.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/46fa77ce612e3ec81e4febc884d646e7.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6588f6f8b5edfbeda00d11db44cb9a61.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/20b8ffc3d4c2b2a2cd25f2e2371dc985.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/66436cb34bffa2f8ab1cdd796dfa1e2a.png)

> 你的安装路径\5.11.0\mingw53_32\bin
> 你的安装路径\Tools\mingw530_32\bin

- **启动安装好的 Qt Creator**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/5c3a056827d8df57b3d5bad1037412b2.png)

---

- **非全选安装到此为止, 全选安装继续往下看**
  **出现这个错误, 忽略这个错误即可**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/1d4f8132efda2029a92b5c39327e8730.png)
- **等待安装完毕之后解决刚才的错误**
  **找到安装目录下的 strawberry.msi,双击运行**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/54ff9932b9a77c4ce2d8fcbe17573804.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/410bc3e1ba02c89ddcee187774f8a70f.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e563305d1ab0ac4cc331311a18a54e4b.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/3997a7fdc4c0179665b3e8e1defcadbc.png)

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/8a4507015ea7f1bf13f5ba330c29703a.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/07d8217977c80f60847db9a90e5c1374.png)

### Qt Creator 快捷键

- [Qt Creator Keyboard Shortcuts(Documentation)](http://doc.qt.io/qtcreator/creator-keyboard-shortcuts.html "Qt Creator Keyboard Shortcuts(Documentation)")
- [Qt Creator Keyboard Shortcuts(Wiki)](http://wiki.qt.io/Qt_Creator_Keyboard_Shortcuts "Qt Creator Keyboard Shortcuts(Wiki)")

### 什么是环境变量?

- 打开我们添加环境变量的两个目录, 不难发现里面大部分都是.exe 的可执行程序
- 如果我们不配置环境变量, 那么每次我们想要使用这些"可执行程序"都必须"先找到这些应用程序对应的文件夹"才能使用
- 为了方便我们在电脑上"任何地方"都能够使用这些"可执行程序", 那么我们就必须添加环境变量, 因为 Windows 执行某个程序的时候, 会先到"环境变量中 Path 指定的路径中"去查找

---

### 为什么要配置系统变量,不配置用户变量

- 用户变量只针对使用这台计算机指定用户
  - 一个计算机可以设置多个用户, 不同的用户用不同的用户名和密码
  - 当给计算机设置了多个用户的时候,启动计算机的时候就会让你选择哪个用户登录
- 系统变量针对使用这台计算机的所有用户
  - 也就是说设置了系统变量, 无论哪个用户登录这台计算机都可以使用你配置好的工具

### 如何创建 C 语言程序

- 这个世界上, 几乎所有程序员入门的第一段代码都是 Hello World.
- 原因是当年 C 语言的作者 Dennis Ritchie(丹尼斯 里奇)在他的名著`The C Programming Language`中第一次引入, 传为后世经典, 其它语言亦争相效仿, 以示敬意
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/8e87f83d4d2501a1c1248c61a786ccc5.png)

### 如何创建 C 语言文件

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/7ad55f94d20cdd623cf7b15c5d897971.png)

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/ad8b418e47011d7013e980d83b594485.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/fa41dbc82fb401f15894ccb19e7bca7f.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/1bcbe3046f4e7120812588ef785412d2.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/669f4cdc8bdc153e01e10feb70989214.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/d181a8a7e67e482b574bd6755f97e2c7.png)

## C 语言程序组成

- 手机有很多功能, "开机","关机","打电话","发短信","拍照"等等
- 手机中的每一个功能就相当于 C 语言程序中的一个程序段(函数)
- 众多功能中总有一个会被先执行,不可能多个功能一起执行
- 想使用手机必须先执行手机的开机功能
- 所以 C 语言程序也一样,由众多功能、众多程序段组成, 众多 C 语言程序段中总有一个会被先执行, 这个先执行的程序段我们称之为"主函数"
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/84a123dc560fb8f98ab74cc86816997d.png)

- 一个 C 语言程序由多个"函数"构成,每个函数有自己的功能
- 一个程序**有且只有一个主函数**
- 如果一个程序没有主函数,则这个程序不具备运行能力
- 程序运行时系统会**自动调用**主函数,而其它函数需要开发者**手动调用**
- 主函数有固定书写的格式和范写
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/ceee2f6f48a92f5d8a0239a7311330f5.png)

## 函数定义格式

- 主函数定义的格式:
  - int 代表函数执行之后会返回一个整数类型的值
  - main 代表这个函数的名字叫做 main
  - () 代表这是一个函数
  - {} 代表这个程序段的范围
  - return 0; 代表函数执行完之后返回整数 0

```c showLineNumbers
int main() {
    // insert code here...
    return 0;
}
```

- 其它函数定义的格式
  - int 代表函数执行之后会返回一个整数类型的值
  - call 代表这个函数的名字叫做 call
  - () 代表这是一个函数
  - {} 代表这个程序段的范围
  - return 0; 代表函数执行完之后返回整数 0

```c showLineNumbers
int call() {
    return 0;
}
```

---

## 如何执行定义好的函数

- 主函数(main)会由系统自动调用, 但其它函数不会, 所以想要执行其它函数就必须在 main 函数中手动调用
  - call 代表找到名称叫做 call 的某个东西
  - () 代表要找到的名称叫 call 的某个东西是一个函数
  - ; 代表调用函数的语句已经编写完成
  - 所以 call();代表找到 call 函数, 并执行 call 函数

```c showLineNumbers
int main() {
    call();
    return 0;
}
```

- 如何往屏幕上输出内容
  - 输出内容是一个比较复杂的操作, 所以系统提前定义好了一个专门用于输出内容的函数叫做 printf 函数,我们只需要执行系统定义好的 printf 函数就可以往屏幕上输出内容
  - 但凡需要执行一个函数, 都是通过函数名称+圆括号的形式来执行
  - 如下代码的含义是: 当程序运行时系统会自动执行 main 函数, 在系统自动执行 main 函数时我们手动执行了 call 函数和 printf 函数
  - 经过对代码的观察, 我们发现两个问题
    - 并没有告诉 printf 函数,我们要往屏幕上输出什么内容
    - 找不到 printf 函数的实现代码

```c showLineNumbers
int call(){
    return 0;
}

int main(){
    call();
    printf();
    return 0;
}
```

- 如何告诉 printf 函数要输出的内容
  - 将要输出的内容编写到 printf 函数后面的圆括号中即可
  - 注意: 圆括号中编写的内容必须用双引号引起来

```c showLineNumbers
printf("hello world\n");
```

- 如何找到 printf 函数的实现代码
  - 由于 printf 函数是系统实现的函数, 所以想要使用 printf 函数必须在使用之前告诉系统去哪里可以找到 printf 函数的实现代码
  - `\#include <stdio.h>` 就是告诉系统可以去 stdio 这个文件中查找 printf 函数的声明和实现

```c showLineNumbers
#include <stdio.h>

int call(){
    return 0;
}

int main(){
    call();
    printf("hello world\n");
    return 0;
}
```

## 如何运行编写好的程序

- 方式 1:
- 点击小榔头将"源代码"编译成"可执行文件"
- 找到编译后的源代码, 打开终端(CMD)运行可执行文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a5f93efcc499ec5ea5bcd9d338972c8a.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a21ccb686fca0771cd10af728c270cd2.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/d7542b666e2558d47daf9cb7d631ddaf.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/4a8afead10db1343317a7368fb3042ca.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/0036733ed61b532efc2ef9907ba267bd.png)
- 方式 2
- 直接点击 Qt 开发工具运行按钮
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/97092b77d385d7f19e815f818dd0ec57.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/9d800a25ef0a1a9679b64a25de4b979b.png)

---

## main 函数注意点及其它写法

- C 语言中,每条完整的语句后面都必须以分号结尾

```c showLineNumbers
int main(){
    printf("hello world\n") // 如果没有分号编译时会报错
    return 0;
}
```

```c showLineNumbers
int main(){
    // 如果没有分号,多条语句合并到一行时, 系统不知道从什么地方到什么地方是一条完整语句
    printf("hello world\n") return 0;
}
```

- C 语言中除了注释和双引号引起来的地方以外都不能出现中文

```c showLineNumbers
int main(){
    printf("hello world\n"); // 这里的分号如果是中文的分号就会报错
    return 0;
}
```

- 一个 C 语言程序只能有一个 main 函数

```c showLineNumbers
int main(){
    return 0;
}
int main(){ // 编译时会报错, 重复定义
    return 0;
}
```

- 一个 C 语言程序不能没有 main 函数

```c showLineNumbers
int call(){ // 编译时报错, 因为只有call函数, 没有main函数
    return 0;
}
```

```c showLineNumbers
int mian(){ // 编译时报错, 因为main函数的名称写错了,还是相当于没有main函数
    return 0;
}
```

- main 函数前面的 int 可以不写或者换成 void

```c showLineNumbers
#include <stdio.h>
main(){ // 不会报错
    printf("hello world\n");
    return 0;
}
```

```c showLineNumbers
#include <stdio.h>
void main(){  // 不会报错
    printf("hello world\n");
    return 0;
}
```

- main 函数中的 return 0 可以不写

```c showLineNumbers
int main(){ // 不会报错
    printf("hello world\n");
}
```

- 多种写法不报错的原因
  - C 语言最早的时候只是一种规范和标准(例如 C89, C11 等)
  - 标准的推行需要各大厂商的支持和实施
  - 而在支持的实施的时候由于各大厂商利益、理解等问题,导致了实施的标准不同,发生了变化
    - Turbo C
    - Visual C(VC)
    - GNU C(GCC)
  - 所以大家才会看到不同的书上书写的格式有所不同, 有的返回 int,有的返回 void,有的甚至没有返回值
  - 所以大家只需要记住最标准的写法即可, no zuo no die

```c showLineNumbers
#include <stdio.h>
int main(){
    printf("hello world\n");
    return 0;
}
```

> Tips:
> 语法错误：编译器会直接报错
> 逻辑错误：没有语法错误，只不过运行结果不正确

## C 语言程序练习

- 编写一个 C 语言程序,用至少 2 种方式在屏幕上输出以下内容

```c showLineNumbers
   *** ***
  *********
   *******
    ****
     **
```

- 普通青年实现

```c showLineNumbers
printf(" *** *** \n");
printf("*********\n");
printf(" *******\n");
printf("  ****\n");
printf("   **\n");
```

- 2B 青年实现

```c showLineNumbers
printf(" *** *** \n*********\n *******\n  ****\n   **\n");
```

- 文艺青年实现(装逼的, 先不用理解)

```c showLineNumbers
int  i = 0;
while (1) {
    if (i % 2 == 0) {
        printf(" *** *** \n");
        printf("*********\n");
        printf(" *******\n");
        printf("  ****\n");
        printf("   **\n");
    }else
    {
        printf("\n");
        printf("   ** ** \n");
        printf("  *******\n");
        printf("   *****\n");
        printf("    **\n");
    }
    sleep(1);
    i++;
    system("cls");
}
```

## 初学者如何避免程序出现 BUG

```c showLineNumbers
                          _ooOoo_
                         o8888888o
                         88" . "88
                         (| -_- |)
                          O\ = /O
                      ____/`---'\____
                    .   ' \\| |// `.
                     / \\||| : |||// \
                   / _||||| -:- |||||- \
                     | | \\\ - /// | |
                   | \_| ''\---/'' | |
                    \ .-\__ `-` ___/-. /
                 ___`. .' /--.--\ `. . __
              ."" '< `.___\_<|>_/___.' >'"".
             | | : `- \`.;`\ _ /`;.`/ - ` : | |
               \ \ `-. \_ __\ /__ _/ .-` / /
       ======`-.____`-.___\_____/___.-`____.-'======
                          `=---='

       .............................................
              佛祖保佑                   有无BUG
```

```c showLineNumbers
━━━━━━神兽出没━━━━━━
     　　  ┏┓　　　 ┏┓
      　　┏┛┻━━━━━━┛┻┓
      　　┃　　　     ┃
      　　┃　　　━    ┃
      　　┃　┳┛　  ┗┳ ┃
      　　┃　　　     ┃
      　　┃　　　┻    ┃
      　　┃          ┃
      　　┗━┓　　　 ┏━┛Code is far away from bug with the animal protecting
      　　  ┃　　 　┃    神兽保佑,代码无bug
      　  　┃　　 　┃
      　  　┃　　　 ┗━━━┓
      　  　┃　　　     ┣┓
      　　  ┃　　　  ┏━━┛┛
      　　  ┗┓┓┏━┳┓┏┛
      　　   ┃┫┫ ┃┫┫
      　　   ┗┻┛ ┗┻┛

      ━━━━━━感觉萌萌哒━━━━━━
```

```c showLineNumbers
        ´´´´´´´´██´´´´´´´
        ´´´´´´´████´´´´´´
        ´´´´´████████´´´´
        ´´`´███▒▒▒▒███´´´´´
        ´´´███▒●▒▒●▒██´´´
        ´´´███▒▒▒▒▒▒██´´´´´
        ´´´███▒▒▒▒██´                      项目：第一个C语言程序
        ´´██████▒▒███´´´´´                 语言： C语言
        ´██████▒▒▒▒███´´                   编辑器： Qt Creator
        ██████▒▒▒▒▒▒███´´´´                版本控制：git-github
        ´´▓▓▓▓▓▓▓▓▓▓▓▓▓▒´´                 代码风格：江哥style
        ´´▒▒▒▒▓▓▓▓▓▓▓▓▓▒´´´´´
        ´.▒▒▒´´▓▓▓▓▓▓▓▓▒´´´´´
        ´.▒▒´´´´▓▓▓▓▓▓▓▒
        ..▒▒.´´´´▓▓▓▓▓▓▓▒
        ´▒▒▒▒▒▒▒▒▒▒▒▒
        ´´´´´´´´´███████´´´´´
        ´´´´´´´´████████´´´´´´´
        ´´´´´´´█████████´´´´´´
        ´´´´´´██████████´´´´             大部分人都在关注你飞的高不高，却没人在乎你飞的累不累，这就是现实！
        ´´´´´´██████████´´´                     我从不相信梦想，我，只，相，信，自，己！
        ´´´´´´´█████████´´
        ´´´´´´´█████████´´´
        ´´´´´´´´████████´´´´´
        ________▒▒▒▒▒
        _________▒▒▒▒
        _________▒▒▒▒
        ________▒▒_▒▒
        _______▒▒__▒▒
        _____ ▒▒___▒▒
        _____▒▒___▒▒
        ____▒▒____▒▒
        ___▒▒_____▒▒
        ███____ ▒▒
        ████____███
        █ _███_ _█_███
——————————————————————————女神保佑，代码无bug——————————————————————
```

##

注意：编程是一门做中学的学科，BUG 需要亲自动手解决。

## 多语言对比

- C 语言

```c showLineNumbers
#include<stdio.h>
int main() {
    printf("南哥带你装B带你飞");
    return 0;
}
```

- C++语言

```c showLineNumbers
#include<iostream>
using namespace std;
int main() {
    cout << "南哥带你装B带你飞" << endl;
    return 0;
}
```

- OC 语言

```c showLineNumbers
#import <Foundation/Foundation.h>
int main() {
    NSLog(@"南哥带你装B带你飞");
    return 0;
}
```

- Java 语言

```java showLineNumbers
class Test
{
    public static viod main()
    {
        system.out.println("南哥带你装B带你飞");
    }
}
```

- Go 语言

```go showLineNumbers
package main
import  "fmt" //引入fmt库
func main() {
    fmt.Println("南哥带你装B带你飞")
}
```

注意：编程是一门做中学的学科，最好的学习方式就是狂敲代码。

## 什么是注释?

- 注释是在所有计算机语言中都非常重要的一个概念，从字面上看，就是注解、解释的意思
- 注释可以用来解释某一段程序或者某一行代码是什么意思，方便程序员之间的交流沟通
- 注释可以是任何文字，也就是说可以写中文
- 被注释的内容在开发工具中会有特殊的颜色

---

## 为什么要使用注释?

- 没有编写任何注释的程序

```c showLineNumbers
void printMap(char map[6][7] , int row, int col);
int main(int argc, const char * argv[])
{
    char map[6][7] = {
        {'#', '#', '#', '#', '#', '#', '#'},
        {'#', ' ', ' ', ' ', '#' ,' ', ' '},
        {'#', 'R', ' ', '#', '#', ' ', '#'},
        {'#', ' ', ' ', ' ', '#', ' ', '#'},
        {'#', '#', ' ', ' ', ' ', ' ', '#'},
        {'#', '#', '#', '#', '#', '#', '#'}
    };
    int row = sizeof(map)/sizeof(map[0]);
    int col = sizeof(map[0])/ sizeof(map[0][0]);
    printMap(map, row, col);
    int pRow = 2;
    int pCol = 1;
    int endRow = 1;
    int endCol = 6;
    while ('R' != map[endRow][endCol]) {
        printf("亲, 请输入相应的操作\n");
        printf("w(向上走) s(向下走) a(向左走) d(向右走)\n");
        char run;
        run = getchar();
        switch (run) {
            case 's':
                if ('#' != map[pRow + 1][pCol]) {
                    map[pRow][pCol] = ' ';
                    pRow++;//3
                    map[pRow][pCol] = 'R';
                }
                break;
            case 'w':
                if ('#' != map[pRow - 1][pCol]) {
                    map[pRow][pCol] = ' ';
                    pRow--;
                    map[pRow][pCol] = 'R';
                }
                break;
            case 'a':
                if ('#' != map[pRow][pCol - 1]) {
                    map[pRow][pCol] = ' ';
                    pCol--;
                    map[pRow][pCol] = 'R';
                }
                break;
            case 'd':
                if ('#' != map[pRow][pCol + 1]) {
                    map[pRow][pCol] = ' ';
                    pCol++;
                    map[pRow][pCol] = 'R';
                }
                break;
        }
        printMap(map, row, col);
    }
    printf("你太牛X了\n");
    printf("想挑战自己,请购买完整版本\n");
    return 0;
}
void printMap(char map[6][7] , int row, int col)
{
    system("cls");
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            printf("%c", map[i][j]);
        }
        printf("\n");
    }
}
```

- 编写了注释的程序

```c showLineNumbers
/*
     R代表一个人
     #代表一堵墙
//   0123456
     ####### // 0
     #   #   // 1
     #R ## # // 2
     #   # # // 3
     ##    # // 4
     ####### // 5

     分析:
     >1.保存地图(二维数组)
     >2.输出地图
     >3.操作R前进(控制小人行走)
      3.1.接收用户输入(scanf/getchar)
      w(向上走) s(向下走) a(向左走) d(向右走)
      3.2.判断用户的输入,控制小人行走
         3.2.1.替换二维数组中保存的数据
             (
                1.判断是否可以修改(如果不是#就可以修改)
                2.修改现有位置为空白
                3.修改下一步为R
             )
      3.3.输出修改后的二维数组
     4.判断用户是否走出出口
*/
// 声明打印地图方法
void printMap(char map[6][7] , int row, int col);
int main(int argc, const char * argv[])
{
    // 1.定义二维数组保存迷宫地图
    char map[6][7] = {
        {'#', '#', '#', '#', '#', '#', '#'},
        {'#', ' ', ' ', ' ', '#' ,' ', ' '},
        {'#', 'R', ' ', '#', '#', ' ', '#'},
        {'#', ' ', ' ', ' ', '#', ' ', '#'},
        {'#', '#', ' ', ' ', ' ', ' ', '#'},
        {'#', '#', '#', '#', '#', '#', '#'}
    };
    // 2.计算地图行数和列数
    int row = sizeof(map)/sizeof(map[0]);
    int col = sizeof(map[0])/ sizeof(map[0][0]);
    // 3.输出地图
    printMap(map, row, col);
    // 4.定义变量记录人物位置
    int pRow = 2;
    int pCol = 1;
    // 5.定义变量记录出口的位置
    int endRow = 1;
    int endCol = 6;
    // 6.控制人物行走
    while ('R' != map[endRow][endCol]) {
        // 6.1提示用户如何控制人物行走
        printf("亲, 请输入相应的操作\n");
        printf("w(向上走) s(向下走) a(向左走) d(向右走)\n");
        char run;
        run = getchar();
        // 6.2根据用户输入控制人物行走
        switch (run) {
            case 's':
                if ('#' != map[pRow + 1][pCol]) {
                    map[pRow][pCol] = ' ';
                    pRow++;//3
                    map[pRow][pCol] = 'R';
                }
                break;
            case 'w':
                if ('#' != map[pRow - 1][pCol]) {
                    map[pRow][pCol] = ' ';
                    pRow--;
                    map[pRow][pCol] = 'R';
                }
                break;
            case 'a':
                if ('#' != map[pRow][pCol - 1]) {
                    map[pRow][pCol] = ' ';
                    pCol--;
                    map[pRow][pCol] = 'R';
                }
                break;
            case 'd':
                if ('#' != map[pRow][pCol + 1]) {
                    map[pRow][pCol] = ' ';
                    pCol++;
                    map[pRow][pCol] = 'R';
                }
                break;
        }
        // 6.3重新输出行走之后的地图
        printMap(map, row, col);
    }
    printf("你太牛X了\n");
    printf("想挑战自己,请购买完整版本\n");
    return 0;
}

/**
 * @brief printMap
 * @param map 需要打印的二维数组
 * @param row 二维数组的行数
 * @param col 二维数组的列数
 */
void printMap(char map[6][7] , int row, int col)
{
    // 为了保证窗口的干净整洁, 每次打印都先清空上一次的打印
    system("cls");
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            printf("%c", map[i][j]);
        }
        printf("\n");
    }
}
```

---

## 注释的分类

- 单行注释

  - // 被注释内容
  - 使用范围:任何地方都可以写注释：函数外面、里面，每一条语句后面
  - 作用范围: 从第二个斜线到这一行末尾
  - 快捷键:Ctrl+/

- 多行注释
  - /\* 被注释内容 \*/
  - 使用范围:任何地方都可以写注释：函数外面、里面，每一条语句后面
  - 作用范围: 从第一个/\*到最近的一个\*/

---

## 注释的注意点

- 单行注释可以嵌套单行注释、多行注释

```c showLineNumbers
// 南哥 // 公号代码情缘
// /* 江哥 */
// 瓜哥
//公众号代码情缘
```

- 多行注释可以嵌套单行注释

```c showLineNumbers
/*
// 作者：LNJ
// 描述：第一个C语言程序作用：这是一个主函数，C程序的入口点
 */
```

- 多行注释**_不能_**嵌套多行注释

```c showLineNumbers
/*
哈哈哈
     /*嘻嘻嘻*/
 呵呵呵
*/
```

---

## 注释的应用场景

- 思路分析

```c showLineNumbers
/*
     R代表一个人
     #代表一堵墙
//   0123456
     ####### // 0
     #   #   // 1
     #R ## # // 2
     #   # # // 3
     ##    # // 4
     ####### // 5

     分析:
     >1.保存地图(二维数组)
     >2.输出地图
     >3.操作R前进(控制小人行走)
      3.1.接收用户输入(scanf/getchar)
      w(向上走) s(向下走) a(向左走) d(向右走)
      3.2.判断用户的输入,控制小人行走
         3.2.1.替换二维数组中保存的数据
             (
                1.判断是否可以修改(如果不是#就可以修改)
                2.修改现有位置为空白
                3.修改下一步为R
             )
      3.3.输出修改后的二维数组
     4.判断用户是否走出出口
*/
```

- 对变量进行说明

```c showLineNumbers
// 2.计算地图行数和列数
int row = sizeof(map)/sizeof(map[0]);
int col = sizeof(map[0])/ sizeof(map[0][0]);
```

- 对函数进行说明

```c showLineNumbers
/**
 * @brief printMap
 * @param map 需要打印的二维数组
 * @param row 二维数组的行数
 * @param col 二维数组的列数
 */
void printMap(char map[6][7] , int row, int col)
{
    system("cls");
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            printf("%c", map[i][j]);
        }
        printf("\n");
    }
}
```

- 多实现逻辑排序

```c showLineNumbers
    // 1.定义二维数组保存迷宫地图
    char map[6][7] = {
        {'#', '#', '#', '#', '#', '#', '#'},
        {'#', ' ', ' ', ' ', '#' ,' ', ' '},
        {'#', 'R', ' ', '#', '#', ' ', '#'},
        {'#', ' ', ' ', ' ', '#', ' ', '#'},
        {'#', '#', ' ', ' ', ' ', ' ', '#'},
        {'#', '#', '#', '#', '#', '#', '#'}
    };
    // 2.计算地图行数和列数
    int row = sizeof(map)/sizeof(map[0]);
    int col = sizeof(map[0])/ sizeof(map[0][0]);
    // 3.输出地图
    printMap(map, row, col);
    // 4.定义变量记录人物位置
    int pRow = 2;
    int pCol = 1;
    // 5.定义变量记录出口的位置
    int endRow = 1;
    int endCol = 6;
    // 6.控制人物行走
    while ('R' != map[endRow][endCol]) {
        ... ...
    }
```

---

## 使用注释的好处

- 注释是一个程序员必须要具备的良好习惯
- 帮助开发人员整理实现思路
- 解释说明程序, 提高程序的可读性
  - 初学者编写程序可以养成习惯：先写注释再写代码
  - 将自己的思想通过注释先整理出来，在用代码去体现
  - 因为代码仅仅是思想的一种体现形式而已

---

## 什么是关键字?

- 关键字,也叫作保留字。是指一些被 C 语言赋予了特殊含义的单词
- 关键字特征:
  - 全部都是小写
  - 在开发工具中会显示特殊颜色
- 关键字注意点:
  - 因为关键字在 C 语言中有特殊的含义, 所以不能用作变量名、函数名等
- C 语言中一共有 32 个关键字

| 1       | 2       | 3      | 4    | 5        | 6      | 7      | 8        |
| ------- | ------- | ------ | ---- | -------- | ------ | ------ | -------- |
| char    | short   | int    | long | float    | double | if     | else     |
| return  | do      | while  | for  | switch   | case   | break  | continue |
| default | goto    | sizeof | auto | register | static | extern | unsigned |
| signed  | typedef | struct | enum | union    | void   | const  | volatile |

> 这些不用专门去记住,用多了就会了。在编译器里都是有特殊颜色的。 我们用到时候会一个一个讲解这个些关键字怎么用,现在浏览下,有个印象就 OK 了

---

## 关键字分类

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/3f73cc45cf0a0bb4e4f0f1b9c972b2be.png)

## 什么是标识符?

- 从字面上理解,就是用来标识某些东西的符号，标识的目的就是为了将这些东西区分开来
- 其实标识符的作用就跟人类的名字差不多，为了区分每个人，就在每个人出生的时候起了个名字
- C 语言是由函数构成的，一个 C 程序中可能会有多个函数，为了区分这些函数，就给每一个函数都起了个名称, 这个名称就是标识符
- 综上所述: 程序员在程序中给函数、变量等起名字就是标识符

---

## 标识符命名规则

- 只能由字母(a~z、 A~Z)、数字、下划线组成
- 不能包含除下划线以外的其它特殊字符串
- 不能以数字开头
- 不能是 C 语言中的关键字
- 标识符严格区分大小写, test 和 Test 是两个不同的标识符

---

## 练习

- 下列哪些是合法的标识符

|           |         |            |            |            |           |           |
| --------- | ------- | ---------- | ---------- | ---------- | --------- | --------- |
| fromNo22  | from#22 | my_Boolean | my-Boolean | 2ndObj     | GUI       | lnj       |
| Mike2jack | 江哥    | \_test     | test!32    | haha(da)tt | jack_rose | jack&rose |

---

## 标识符命名规范

- 见名知意,能够提高代码的可读性
- 驼峰命名,能够提高代码的可读性
- 驼峰命名法就是当变量名或函数名是由多个单词连接在一起,构成标识符时,第一个单词以小写字母开始;第二个单词的首字母大写.
- 例如: myFirstName、myLastName 这样的变量名称看上去就像驼峰一样此起彼伏
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/2b8f50edb3b6449fb02a26a07c671ab4.png)

## 什么是数据？

- 生活中无时无刻都在跟数据打交道
- 例如:人的体重、身高、收入、性别等数据等

- 在我们使用计算机的过程中，也会接触到各种各样的数据
- 例如: 文档数据、图片数据、视频数据等

---

## 数据分类

- 静态的数据

  - **静态数据是指一些永久性的数据，一般存储在硬盘中**。硬盘的存储空间一般都比较大，现在普通计算机的硬盘都有 500G 左右，因此硬盘中可以存放一些比较大的文件
  - 存储的时长：**计算机关闭之后再开启，这些数据依旧还在，只要你不主动删掉或者硬盘没坏，这些数据永远都在**
  - 哪些是静态数据：静态数据一般是以文件的形式存储在硬盘上，比如文档、照片、视频等。

- 动态的数据
  - **动态数据指在程序运行过程中，动态产生的临时数据，一般存储在内存中**。内存的存储空间一般都比较小，现在普通计算机的内存只有 8G 左右，因此要谨慎使用内存，不要占用太多的内存空间
  - 存储的时长：**计算机关闭之后，这些临时数据就会被清除**
  - 哪些是动态数据：当运行某个程序（软件）时，整个程序就会被加载到内存中，在程序运行过程中，会产生各种各样的临时数据，这些临时数据都是存储在内存中的。当程序停止运行或者计算机被强制关闭时，这个程序产生的所有临时数据都会被清除。
- 既然硬盘的存储空间这么大，为何不把所有的应用程序加载到硬盘中去执行呢？
  - 主要**原因就是内存的访问速度比硬盘快 N 倍**

---

- 静态数据和动态数据的相互转换
- 也就是从磁盘加载到内存
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a6b6212999cefecf6467abd427c27bbf.png)
- 动态数据和静态数据的相互转换
- 也就是从内存保存到磁盘
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/8a9f31e02e46723156c2ffba4a00819c.png)
- 数据的计量单位
- 不管是静态还是动态数据，都是 0 和 1 组成的
- 数据越大，包含的 0 和 1 就越多

```c showLineNumbers
1 B(Byte字节) = 8 bit(位)
// 00000000 就是一个字节
// 111111111 也是一个字节
// 10101010 也是一个字节
// 任意8个0和1的组合都是一个字节
1 KB(KByte) = 1024 B
1 MB = 1024 KB
1 GB = 1024 MB
1 TB = 1024 GB
```

## C 语言数据类型

- **作为程序员, 我们最关心的是内存中的动态数据**,因为我们写的程序就是在内存中运行的
- 程序在运行过程中会产生各种各样的临时数据,**为了方便数据的运算和操作, C 语言对这些数据进行了分类**, 提供了丰富的数据类型
- C 语言中有 4 大类数据类型:**基本类型、构造类型、指针类型、空类型**

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/73b03f1ce2062d094514e574bf3d0089.png)

## 什么是常量?

- "量"表示数据。常量，则表示一些固定的数据，也就是不能改变的数据
- 就好比现实生活中生男生女一样, 生下来是男孩永远都是男孩, 生下来是女孩就永远都是女孩, 所以性别就是现实生活中常量的一种体现
- 不要和江哥吹牛 X 说你是泰国来的, 如果你真的来自泰国, 我只能说你赢了

---

## 常量的类型

- 整型常量
  - 十进制整数。例如:666,-120, 0
  - 八进制整数,八进制形式的常量都以 0 开头。例如:0123,也就是十进制的 83;-011,也就是十进 制的-9
  - 十六进制整数,十六进制的常量都是以 0x 开头。例如:0x123,也就是十进制的 291
  - 二进制整数,逢二进一 0b 开头。例如: 0b0010,也就是十进制的 2
- 实型常量
  - 小数形式
  - 单精度小数:以字母 f 或字母 F 结尾。例如:0.0f、1.01f
  - 双精度小数:十进制小数形式。例如:3.14、 6.66
  - 默认就是双精度
  - 可以没有整数位只有小数位。例如: .3、 .6f
  - 指数形式
  - 以幂的形式表示, 以字母 e 或字母 E 后跟一个 10 为底的幂数
  - 上过初中的都应该知道科学计数法吧,指数形式的常量就是科学计数法的另一种表 示,比如 123000,**_用科学计数法表示为 1.23×10 的 5 次方_**
  - **_用 C 语言表示就是 1.23e5 或 1.23E5_**
  - 字母 e 或字母 E 后面的指数必须为整数
  - 字母 e 或字母 E 前后必须要有数字
  - 字母 e 或字母 E 前后不能有空格
- 字符常量
  - 字符型常量都是用''(单引号)括起来的。例如:'a'、'b'、'c'
  - 字符常量的单引号中只能有一个字符
  - 特殊情况: 如果是转义字符,单引号中可以有两个字符。例如:'\n'、'\t'
- 字符串常量
  - 字符型常量都是用""(双引号)括起来的。例如:"a"、"abc"、"lnj"
  - 系统会自动在字符串常量的末尾加一个字符'\0'作为字符串结束标志
- 自定义常量

  - 后期讲解内容, 此处先不用了解

- 常量类型练习

|     |      |     |     |     |     |          |
| --- | ---- | --- | --- | --- | --- | -------- |
| 123 | 1.1F | 1.1 | .3  | 'a' | "a" | "李南江" |

## 什么是变量?

- "量"表示数据。变量，则表示一些不固定的数据，也就是可以改变的数据
- 就好比现实生活中人的身高、体重一样, 随着年龄的增长会不断发生改变, 所以身高、体重就是现实生活中变量的一种体现
- 就好比现实生活中超市的储物格一样, 同一个格子在不同时期不同人使用,格子中存储的物品是可以变化的。张三使用这个格子的时候里面放的可能是尿不湿, 但是李四使用这个格子的时候里面放的可能是面包

---

## 如何定义变量

- 格式 1: 变量类型 变量名称 ;
  - 为什么要定义变量?
  - 任何变量在使用之前，必须先进行定义, 只有定义了变量才会分配存储空间, 才有空间存储数据
  - 为什么要限定类型?
  - 用来约束变量所存放数据的类型。一旦给变量指明了类型，那么这个变量就只能存储这种类型的数据
  - 内存空间极其有限,不同类型的变量占用不同大小的存储空间
  - 为什么要指定变量名称?
  - 存储数据的空间对于我们没有任何意义, 我们需要的是空间中存储的值
  - 只有有了名称, 我们才能获取到空间中的值

```c showLineNumbers
int a;
float b;
char ch;
```

- 格式 2:变量类型 变量名称,变量名称;
  - 连续定义, 多个变量之间用逗号(,)号隔开

```c showLineNumbers
int a,b,c;
```

- 变量名的命名的规范
  - 变量名属于标识符,所以必须严格遵守标识符的命名原则

---

## 如何使用变量？

- 可以利用=号往变量里面存储数据
  - 在 C 语言中,利用=号往变量里面存储数据, 我们称之为给变量赋值

```c showLineNumbers
int value;
value = 998; // 赋值
```

- 注意:
  - 这里的=号，并不是数学中的“相等”，而是 C 语言中的**_赋值运算符_**，作用是将右边的整型常量 998 赋值给左边的整型变量 value
  - 赋值的时候,= 号的左侧必须是变量 (10=b,错误)
  - 为了方便阅读代码, 习惯在 = 的两侧 各加上一个 空格

---

## 变量的初始化

- C 语言中, 变量的第一次赋值，我们称为“初始化”
- 初始化的两种形式
  - 先定义,后初始化
  - `int value;  value = 998; // 初始化`
  - 定义时同时初始化
  - `int a = 10;  int b = 4, c = 2;`
  - 其它表现形式(不推荐)

```c showLineNumbers
int a, b = 10; //部分初始化
int c, d, e;
c = d = e =0;
```

- 不初始化里面存储什么?
  - 随机数
  - 上次程序分配的存储空间,存数一些 内容,“垃圾”
  - 系统正在用的一些数据

---

## 如何修改变量值?

- 多次赋值即可
  - 每次赋值都会覆盖原来的值

```c showLineNumbers
int i = 10;
i = 20; // 修改变量的值
```

---

## 变量之间的值传递

- 可以将一个变量存储的值赋值给另一个变量

```c showLineNumbers
 int a = 10;
 int b = a; // 相当于把a中存储的10拷贝了一份给b
```

---

## 如何查看变量的值?

- 使用 printf 输出一个或多个变量的值

```c showLineNumbers
int a = 10, c = 11;
printf("a=%d, c=%d", a, c);
```

- 输出其它类型变量的值

```c showLineNumbers
double height = 1.75;
char blood = 'A';
printf("height=%.2f, 血型是%c", height,  blood);
```

---

## 变量的作用域

- C 语言中所有变量都有自己的作用域
- 变量定义的位置不同,其作用域也不同
- 按照作用域的范围可分为两种, 即局部变量和全局变量

---

- 局部变量
  - 局部变量也称为内部变量
  - 局部变量是在**_代码块内_**定义的, 其作用域仅限于代码块内, 离开该代码块后无法使用

```c showLineNumbers
int main(){
    int i = 998; // 作用域开始
    return 0;// 作用域结束
}
```

```c showLineNumbers
int main(){
    {
        int i = 998; // 作用域开始
    }// 作用域结束
    printf("i = %d\n", i); // 不能使用
    return 0;
}
```

```c showLineNumbers
int main(){
    {
        {
            int i = 998;// 作用域开始
        }// 作用域结束
        printf("i = %d\n", i); // 不能使用
    }
    return 0;
}
```

---

- 全局变量
  - 全局变量也称为外部变量,它是在代码块外部定义的变量

```c showLineNumbers
int i = 666;
int main(){
    printf("i = %d\n", i); // 可以使用
    return 0;
}// 作用域结束
int call(){
    printf("i = %d\n", i); // 可以使用
    return 0;
}
```

---

- 注意点:
  - 同一作用域范围内不能有相同名称的变量

```c showLineNumbers
int main(){
    int i = 998; // 作用域开始
    int i = 666; // 报错, 重复定义
    return 0;
}// 作用域结束
```

```c showLineNumbers
int i = 666;
int i = 998; // 报错, 重复定义
int main(){
    return 0;
}
```

- 不同作用域范围内可以有相同名称的变量

```c showLineNumbers
int i = 666;
int main(){
    int i = 998; // 不会报错
    return 0;
}
```

```c showLineNumbers
int main(){
    int i = 998; // 不会报错
    return 0;
}
int call(){
    int i = 666;  // 不会报错
    return 0;
}
```

---

## 变量内存分析（简单版）

- 字节和地址
  - 为了更好地理解变量在内存中的存储细节，先来认识一下内存中的“字节”和“地址”
  - **每一个小格子代表一个字节**
  - **每个字节都有自己的内存地址**
  - **内存地址是连续的**

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/5515a7f3bbb5194db1f67b4f98de31c5.png)

- 变量存储占用的空间
- 一个变量所占用的存储空间，和**_定义变量时声明的类型_**以及**_当前编译环境_**有关

| 类型      | 16 位编译器 | 32 位编译器 | 64 位编译器 |
| --------- | ----------- | ----------- | ----------- |
| char      | 1           | 1           | 1           |
| int       | 2           | 4           | 4           |
| float     | 4           | 4           | 4           |
| double    | 8           | 8           | 8           |
| short     | 2           | 2           | 2           |
| long      | 4           | 4           | 8           |
| long long | 8           | 8           | 8           |
| void\*    | 2           | 4           | 8           |

- 变量存储的过程

  - 根据定义变量时声明的类型和当前编译环境确定需要开辟多大存储空间
  - 在内存中开辟一块存储空间，开辟时从内存地址大的开始开辟（内存寻址从大到小）
  - 将数据保存到已经开辟好的对应内存空间中

  ```c showLineNumbers
  int main(){
    int number;
    int value;
    number = 22;
    value = 666;
  }
  ```

  ```c showLineNumbers
  #include <stdio.h>
  int main(){
      int number;
      int value;
      number = 22;
      value = 666;
      printf("&number = %p\n", &number); // 0060FEAC
      printf("&value = %p\n", &value);   // 0060FEA8
  }
  ```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/3ac2c92b7d317d38441f3948865d98d0.png)

> 先不要着急, 刚开始接触 C 语言, 我先了解这么多就够了. 后面会再次更深入的讲解存储的各种细节。

## printf 函数

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/1a1d70de9ee22c638b43de8009048570.png)

- printf 函数称之为格式输出函数,方法名称的最后一个字母 f 表示 format。其功能是按照用户指定的格式,把指定的数据输出到屏幕上
- printf 函数的调用格式为:
  - `printf("格式控制字符串",输出项列表 );`
  - 例如:`printf("a = %d, b = %d",a, b);`
    ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/30dae0fb7fa2f93706031066d3cd99cf.png)
  - 非格式字符串原样输出, 格式控制字符串会被输出项列表中的数据替换
  - 注意: 格式控制字符串和输出项在数量和类型上**_必须一一对应_**

---

- 格式控制字符串
  - 形式: `%[标志][输出宽度][.精度][长度]类型`

---

- 类型
  - 格式: `printf("a = %类型", a);`
  - 类型字符串用以表示输出数据的类型, 其格式符和意义如下所示

| 类型  | 含义                                |
| ----- | ----------------------------------- |
| d     | 有符号 10 进制整型                  |
| i     | 有符号 10 进制整型                  |
| u     | 无符号 10 进制整型                  |
| o     | 无符号 8 进制整型                   |
| x     | 无符号 16 进制整型                  |
| X     | 无符号 16 进制整型                  |
| f     | 单、双精度浮点数(默认保留 6 位小数) |
| e / E | 以指数形式输出单、双精度浮点数      |
| g / G | 以最短输出宽度,输出单、双精度浮点数 |
| c     | 字符                                |
| s     | 字符串                              |
| p     | 地址                                |

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    int b = -10;
    float c = 6.6f;
    double d = 3.1415926;
    double e = 10.10;
    char f = 'a';
    // 有符号整数(可以输出负数)
    printf("a = %d\n", a); // 10
    printf("a = %i\n", a); // 10

    // 无符号整数(不可以输出负数)
    printf("a = %u\n", a); // 10
    printf("b = %u\n", b); // 429496786

    // 无符号八进制整数(不可以输出负数)
    printf("a = %o\n", a); // 12
    printf("b = %o\n", b); // 37777777766

    // 无符号十六进制整数(不可以输出负数)
    printf("a = %x\n", a); // a
    printf("b = %x\n", b); // fffffff6

    // 无符号十六进制整数(不可以输出负数)
    printf("a = %X\n", a); // A
    printf("b = %X\n", b); // FFFFFFF6

    // 单、双精度浮点数(默认保留6位小数)
    printf("c = %f\n", c); // 6.600000
    printf("d = %lf\n", d); // 3.141593

    // 以指数形式输出单、双精度浮点数
    printf("e = %e\n", e); // 1.010000e+001
    printf("e = %E\n", e); // 1.010000E+001

    // 以最短输出宽度,输出单、双精度浮点数
    printf("e = %g\n", e); // 10.1
    printf("e = %G\n", e); // 10.1

    // 输出字符
    printf("f = %c\n", f); // a
}
```

---

- 宽度
  - 格式: `printf("a = %[宽度]类型", a);`
  - 用十进制整数来指定输出的宽度, 如果实际位数多于指定宽度,则按照实际位数输出, 如果实际位数少于指定宽度则以空格补位

```c showLineNumbers
#include <stdio.h>
int main(){
    // 实际位数小于指定宽度
    int a = 1;
    printf("a =|%d|\n", a); // |1|
    printf("a =|%5d|\n", a); // |    1|
    // 实际位数大于指定宽度
    int b = 1234567;
    printf("b =|%d|\n", b); // |1234567|
    printf("b =|%5d|\n", b); // |1234567|
}
```

---

- 标志
  - 格式: `printf("a = %[标志][宽度]类型", a);`

| 标志 | 含义                                                  |
| ---- | ----------------------------------------------------- |
| -    | 左对齐, 默认右对齐                                    |
| +    | 当输出值为正数时,在输出值前面加上一个+号, 默认不显示  |
| 0    | 右对齐时, 用 0 填充宽度.(默认用空格填充)              |
| 空格 | 输出值为正数时,在输出值前面加上空格, 为负数时加上负号 |
| #    | 对 c、s、d、u 类型无影响                              |
| #    | 对 o 类型, 在输出时加前缀 o                           |
| #    | 对 x 类型,在输出时加前缀 0x                           |

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 1;
    int b = -1;
    // -号标志
    printf("a =|%d|\n", a); // |1|
    printf("a =|%5d|\n", a); // |    1|
    printf("a =|%-5d|\n", a);// |1    |
    // +号标志
    printf("a =|%d|\n", a); // |1|
    printf("a =|%+d|\n", a);// |+1|
    printf("b =|%d|\n", b); // |-1|
    printf("b =|%+d|\n", b);// |-1|
    // 0标志
    printf("a =|%5d|\n", a); // |    1|
    printf("a =|%05d|\n", a); // |00001|
    // 空格标志
    printf("a =|% d|\n", a); // | 1|
    printf("b =|% d|\n", b); // |-1|
    // #号
    int c = 10;
    printf("c = %o\n", c); // 12
    printf("c = %#o\n", c); // 012
    printf("c = %x\n", c); // a
    printf("c = %#x\n", c); // 0xa
}
```

---

- 精度
  - 格式: `printf("a = %[精度]类型", a); `
  - 精度格式符以"."开头, 后面跟上十进制整数, 用于指定需要输出多少位小数, 如果输出位数大于指定的精度, 则删除超出的部分

```c showLineNumbers
#include <stdio.h>
int main(){
    double a = 3.1415926;
    printf("a = %.2f\n", a); // 3.14
}
```

- 动态指定保留小数位数
  - 格式: `printf("a = %.*f", a);`

```c showLineNumbers
#include <stdio.h>
int main(){
    double a = 3.1415926;
    printf("a = %.*f", 2, a); // 3.14
}
```

- 实型(浮点类型)有效位数问题
  - 对于单精度数,使用%f 格式符输出时,仅前 6~7 位是有效数字
  - 对于双精度数,使用%lf 格式符输出时,前 15~16 位是有效数字
  - 有效位数和精度(保留多少位)不同, 有效位数是指从第一个非零数字开始,误差不超过本数位半个单位的、精确可信的数位
  - 有效位数包含小数点前的非零数位

```c showLineNumbers
#include <stdio.h>
int main(){
    //        1234.567871093750000
    float a = 1234.567890123456789;
    //         1234.567890123456900
    double b = 1234.567890123456789;
    printf("a = %.15f\n", a); // 前8位数字是准确的, 后面的都不准确
    printf("b = %.15f\n", b); // 前16位数字是准确的, 后面的都不准确
}
```

---

- 长度
  - 格式: `printf("a = %[长度]类型", a);`

| 长度 | 修饰类型      | 含义               |
| ---- | ------------- | ------------------ |
| hh   | d、i、o、u、x | 输出 char          |
| h    | d、i、o、u、x | 输出 short int     |
| l    | d、i、o、u、x | 输出 long int      |
| ll   | d、i、o、u、x | 输出 long long int |

```c showLineNumbers
#include <stdio.h>
int main(){
    char a = 'a';
    short int b = 123;
    int  c = 123;
    long int d = 123;
    long long int e = 123;
    printf("a = %hhd\n", a); // 97
    printf("b = %hd\n", b); // 123
    printf("c = %d\n", c); // 123
    printf("d = %ld\n", d); // 123
    printf("e = %lld\n", e); // 123
}
```

- 转义字符
  - 格式: `printf("%f%%", 3.1415);`
  - %号在格式控制字符串中有特殊含义, 所以想输出%必须添加一个转移字符

```c showLineNumbers
#include <stdio.h>
int main(){
    printf("%f%%", 3.1415); // 输出结果3.1415%
}
```

---

## Scanf 函数

- scanf 函数用于接收键盘输入的内容, 是一个阻塞式函数,程序会停在 scanf 函数出现的地方, 直到接收到数据才会执行后面的代码
- printf 函数的调用格式为:

* `scanf("格式控制字符串", 地址列表);`
* 例如: `scanf("%d", &num);`
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6df3856aa41baa48cfc65ead2e0294de.png)

---

- 基本用法

* 地址列表项中只能传入变量地址, 变量地址可以通过&符号+变量名称的形式获取

```c showLineNumbers
#include <stdio.h>
int main(){
    int number;
    scanf("%d", &number); // 接收一个整数
    printf("number = %d\n", number);
}
```

- 接收非字符和字符串类型时, 空格、Tab 和回车会被忽略

```c showLineNumbers
#include <stdio.h>
int main(){
    float num;
    // 例如:输入 Tab 空格 回车 回车 Tab 空格 3.14 , 得到的结果还是3.14
    scanf("%f", &num);
    printf("num = %f\n", num);
}
```

- 非格式字符串原样输入, 格式控制字符串会赋值给地址项列表项中的变量

* 不推荐这种写法

```c showLineNumbers
#include <stdio.h>
int main(){
    int number;
    // 用户必须输入number = 数字  , 否则会得到一个意外的值
    scanf("number = %d", &number);
    printf("number = %d\n", number);
}
```

- 接收多条数据

* 格式控制字符串和地址列表项在数量和类型上必须一一对应
* 非字符和字符串情况下如果没有指定多条数据的分隔符, 可以使用空格或者回车作为分隔符(不推荐这种写法)
* 非字符和字符串情况下建议明确指定多条数据之间分隔符

```c showLineNumbers
#include <stdio.h>
int main(){
    int number;
    scanf("%d", &number);
    printf("number = %d\n", number);
    int value;
    scanf("%d", &value);
    printf("value = %d\n", value);
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int number;
    int value;
    // 可以输入 数字 空格 数字, 或者 数字 回车 数字
    scanf("%d%d", &number, &value);
    printf("number = %d\n", number);
    printf("value = %d\n", value);
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int number;
    int value;
    // 输入 数字,数字 即可
    scanf("%d,%d", &number, &value);
    printf("number = %d\n", number);
    printf("value = %d\n", value);
}
```

- \n 是 scanf 函数的结束符号, 所以格式化字符串中不能出现\n

```c showLineNumbers
#include <stdio.h>
int main(){
    int number;
    // 输入完毕之后按下回车无法结束输入
    scanf("%d\n", &number);
    printf("number = %d\n", number);
}
```

## scanf 运行原理

- 系统会将用户输入的内容先放入输入缓冲区
- scanf 方式会从输入缓冲区中逐个取出内容赋值给变量
- 如果输入缓冲区的内容不为空,scanf 会一直从缓冲区中获取,而不要求再次输入

```c showLineNumbers
#include <stdio.h>
int main(){
    int num1;
    int num2;
    char ch1;
    scanf("%d%c%d", &num1, &ch1, &num2);
    printf("num1 = %d, ch1 = %c, num2 = %d\n", num1, ch1, num2);
    char ch2;
    int num3;
    scanf("%c%d",&ch2, &num3);
    printf("ch2 = %c, num3 = %d\n", ch2, num3);
}
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/29187affda3f7e082e9067fbfb927769.png)

- 利用 fflush 方法清空缓冲区(不是所有平台都能使用)
  - 格式: `fflush(stdin);`
  - C 和 C++的标准里从来没有定义过 fflush(stdin)
  - MSDN 文档里清除的描述着"fflush on input stream is an extension to the C standard" （fflush 是在标准上扩充的函数, 不是标准函数, 所以不是所有平台都支持）
- 利用 setbuf 方法清空缓冲区(所有平台有效)
  - 格式: `setbuf(stdin, NULL);`

```c showLineNumbers
#include <stdio.h>
int main(){
    int num1;
    int num2;
    char ch1;
    scanf("%d%c%d", &num1, &ch1, &num2);
    printf("num1 = %d, ch1 = %c, num2 = %d\n", num1, ch1, num2);
    //fflush(stdin); // 清空输入缓存区
    setbuf(stdin, NULL); // 清空输入缓存区
    char ch2;
    int num3;
    scanf("%c%d",&ch2, &num3);
    printf("ch2 = %c, num3 = %d\n", ch2, num3);
}
```

---

## putchar 和 getchar

- putchar: 向屏幕输出一个字符

```c showLineNumbers
#include <stdio.h>
int main(){
    char ch = 'a';
    putchar(ch); // 输出a
}
```

- getchar: 从键盘获得一个字符

```c showLineNumbers
#include <stdio.h>
int main(){
    char ch;
    ch = getchar();// 获取一个字符
    printf("ch = %c\n", ch);
}
```

## 运算符基本概念

- 和数学中的运算符一样, C 语言中的运算符是告诉程序执行特定算术或逻辑操作的符号

  - 例如告诉程序, 某两个数相加, 相减,相乘等
    ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/9660218fe17b25a2de09e5438d889037.png)

- 什么是表达式
  - 表达式就是利用运算符链接在一起的有意义,有结果的语句;
  - 例如: a + b; 就是一个算数表达式, 它的意义是将两个数相加, 两个数相加的结果就是表达式的结果
  - 注意: 表达式一定要有结果

---

## 运算符分类

- 按照功能划分:
  - 算术运算符
  - 赋值运算符
  - 关系运算符
  - 逻辑运算符
  - 位运算符
- 按照参与运算的操作数个数划分:
  - 单目运算
    - 只有一个操作数 如 : i++;
  - 双目运算
    - 有两个操作数 如 : a + b;
  - 三目运算
    - C 语言中唯一的一个,也称为问号表达式 如: a>b ? 1 : 0;

---

## 运算符的优先级和结合性

- 早在小学的数学课本中,我们就学习过"从左往右,先乘除后加减,有括号的先算括号里面的", 这句话就蕴含了优先级和结合性的问题
- C 语言中,运算符的运算优先级共分为 15 级。1 级最高,15 级最低

* 在 C 语言表达式中,不同优先级的运算符, 运算次序按照由高到低执行
* 在 C 语言表达式中,相同优先级的运算符, 运算次序按照结合性规定的方向执行
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/56c97e103145e96707a17273cebcdf6a.png)![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/89de357c15677f49a7316c497a6d3fc7.png)

---

## 算数运算符

| 优先级 | 名称                  | 符号 | 说明                    |
| ------ | --------------------- | ---- | ----------------------- |
| 3      | 乘法运算符            | \*   | 双目运算符,具有左结合性 |
| 3      | 除法运算符            | /    | 双目运算符,具有左结合性 |
| 3      | 求余运算符 (模运算符) | %    | 双目运算符,具有左结合性 |
| 4      | 加法运算符            | +    | 双目运算符,具有左结合性 |
| 4      | 减法运算符            | -    | 双目运算符,具有左结合性 |

- 注意事项
  - 如果参与运算的两个操作数皆为整数, 那么结果也为整数
  - 如果参与运算的两个操作数其中一个是浮点数, 那么结果一定是浮点数
  - 求余运算符, 本质上就是数学的商和余"中的余数
  - 求余运算符, 参与运算的两个操作数必须都是整数, 不能包含浮点数
  - 求余运算符, 被除数小于除数, 那么结果就是被除数
  - 求余运算符, 运算结果的正负性取决于被除数,跟除数无关, 被除数是正数结果就是正数,被除数是负数结果就是负数
  - 求余运算符, 被除数为 0, 结果为 0
  - 求余运算符, 除数为 0, 没有意义(不要这样写)

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    int b = 5;
    // 加法
    int result = a + b;
    printf("%i\n", result); // 15
    // 减法
    result = a - b;
    printf("%i\n", result); // 5
    // 乘法
    result = a * b;
    printf("%i\n", result); // 50
    // 除法
    result = a / b;
    printf("%i\n", result); // 2

    // 算术运算符的结合性和优先级
    // 结合性: 左结合性, 从左至右
    int c = 50;
    result = a + b + c; // 15 + c;  65;
    printf("%i\n", result);

    // 优先级: * / % 大于 + -
    result = a + b * c; // a + 250; 260;
    printf("%i\n", result);
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    // 整数除以整数, 结果还是整数
    printf("%i\n", 10 / 3); // 3

    // 参与运算的任何一个数是小数, 结果就是小数
    printf("%f\n", 10 / 3.0); // 3.333333
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    // 10 / 3 商等于3, 余1
    int result = 10 % 3;
    printf("%i\n", result); // 1

    // 左边小于右边, 那么结果就是左边
    result = 2 % 10;
    printf("%i\n", result); // 2

    // 被除数是正数结果就是正数,被除数是负数结果就是负数
    result = 10 % 3;
    printf("%i\n", result); // 1
    result = -10 % 3;
    printf("%i\n", result); // -1
    result = 10 % -3;
    printf("%i\n", result); // 1
}
```

---

## 赋值运算符

| 优先级 | 名称                      | 符号 | 说明                    |
| ------ | ------------------------- | ---- | ----------------------- |
| 14     | 赋值运算符                | =    | 双目运算符,具有右结合性 |
| 14     | 除后赋值运算符            | /=   | 双目运算符,具有右结合性 |
| 14     | 乘后赋值运算符 (模运算符) | \*=  | 双目运算符,具有右结合性 |
| 14     | 取模后赋值运算符          | %=   | 双目运算符,具有右结合性 |
| 14     | 加后赋值运算符            | +=   | 双目运算符,具有右结合性 |
| 14     | 减后赋值运算符            | -=   | 双目运算符,具有右结合性 |

- 简单赋值运算符

```c showLineNumbers
#include <stdio.h>
int main(){
    // 简单的赋值运算符 =
    // 会将=右边的值赋值给左边
    int a = 10;
    printf("a = %i\n", a); // 10
}
```

- 复合赋值运算符

```c showLineNumbers
#include <stdio.h>
int main(){
     // 复合赋值运算符 += -= *= /= %=
     // 将变量中的值取出之后进行对应的操作, 操作完毕之后再重新赋值给变量
     int num1 = 10;
     // num1 = num1 + 1; num1 = 10 + 1; num1 = 11;
     num1 += 1;
     printf("num1 = %i\n", num1); // 11
     int num2 = 10;
     // num2 = num2 - 1; num2 = 10 - 1; num2 = 9;
     num2 -= 1;
     printf("num2 = %i\n", num2); // 9
     int num3 = 10;
     // num3 = num3 * 2; num3 = 10 * 2; num3 = 20;
     num3 *= 2;
     printf("num3 = %i\n", num3); // 20
     int num4 = 10;
     // num4 = num4 / 2; num4 = 10 / 2; num4 = 5;
     num4 /= 2;
     printf("num4 = %i\n", num4); // 5
     int num5 = 10;
     // num5 = num5 % 3; num5 = 10 % 3; num5 = 1;
     num5 %= 3;
     printf("num5 = %i\n", num5); // 1
}
```

- 结合性和优先级

```c showLineNumbers
#include <stdio.h>
int main(){
    int number = 10;
    // 赋值运算符优先级是14, 普通运算符优先级是3和4, 所以先计算普通运算符
    // 普通运算符中乘法优先级是3, 加法是4, 所以先计算乘法
    // number += 1 + 25; number += 26; number = number + 26; number = 36;
    number += 1 + 5 * 5;
    printf("number = %i\n", number); // 36
}
```

---

## 自增自减运算符

- 在程序设计中,经常遇到“i=i+1”和“i=i-1”这两种极为常用的操作。
- C 语言为这种操作提供了两个更为简洁的运算符,即++和--

| 优先级 | 名称             | 符号 | 说明                    |
| ------ | ---------------- | ---- | ----------------------- |
| 2      | 自增运算符(在后) | i++  | 单目运算符,具有左结合性 |
| 2      | 自增运算符(在前) | ++i  | 单目运算符,具有右结合性 |
| 2      | 自减运算符(在后) | i--  | 单目运算符,具有左结合性 |
| 2      | 自减运算符(在前) | --i  | 单目运算符,具有右结合性 |

---

- 自增
  - 如果只有**_单个_**变量, 无论++写在前面还是后面都会对变量做+1 操作

```c showLineNumbers
#include <stdio.h>
int main(){
    int number = 10;
    number++;
    printf("number = %i\n", number); // 11
    ++number;
    printf("number = %i\n", number); // 12
}
```

- 如果出现在一个表达式中, 那么++写在前面和后面就会有所区别
  - 前缀表达式:++x, --x;其中 x 表示变量名,先完成变量的自增自减 1 运算,再用 x 的值作为表达式的值;即“先变后用”,也就是变量的值先变,再用变量的值参与运算
  - 后缀表达式:x++, x--;先用 x 的当前值作为表达式的值,再进行自增自减 1 运算。即“先用后变”,也就是先用变量的值参与运算,变量的值再进行自增自减变化

```c showLineNumbers
#include <stdio.h>
int main(){
    int number = 10;
    // ++在后, 先参与表达式运算, 再自增
    // 表达式运算时为: 3 + 10;
    int result = 3 + number++;
    printf("result = %i\n", result); // 13
    printf("number = %i\n", number); // 11
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int number = 10;
    // ++在前, 先自增, 再参与表达式运算
    // 表达式运算时为: 3 + 11;
    int result = 3 + ++number;
    printf("result = %i\n", result); // 14
    printf("number = %i\n", number); // 11
}
```

- 自减

```c showLineNumbers
#include <stdio.h>
int main(){
    int number = 10;
    // --在后, 先参与表达式运算, 再自减
    // 表达式运算时为: 10 + 3;
    int result = number-- + 3;
    printf("result = %i\n", result); // 13
    printf("number = %i\n", number); // 9
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int number = 10;
    // --在前, 先自减, 再参与表达式运算
    // 表达式运算时为: 9 + 3;
    int result = --number + 3;
    printf("result = %i\n", result); // 12
    printf("number = %i\n", number); // 9
}
```

- 注意点:
  - 自增、自减运算只能用于单个变量,只要是标准类型的变量,不管是整型、实型,还是字符型变量等,但不能用于表达式或常量
    - 错误用法: `++(a+b); 5++;`
  - 企业开发中尽量让++ -- 单独出现, 尽量不要和其它运算符混合在一起

```c showLineNumbers
int i = 10;
int b = i++; // 不推荐
或者
int b = ++i; // 不推荐
或者
int a = 10;
int b = ++a + a++;  // 不推荐
```

- 请用如下代码替代

```c showLineNumbers
int i = 10;
int b = i; // 推荐
i++;
或者;
i++;
int b = i; // 推荐
或者
int a = 10;
++a;
int b = a + a; // 推荐
a++;
```

- C 语言标准没有明确的规定，`同一个表达式中同一个变量自增或自减后如何运算`, 不同编译器得到结果也不同, 在企业开发中千万不要这样写

```c showLineNumbers
    int a = 1;
    // 下列代码利用Qt运行时6, 利用Xcode运行是5
    // 但是无论如何, 最终a的值都是3
   //  在C语言中这种代码没有意义, 不用深究也不要这样写
   // 特点: 参与运算的是同一个变量, 参与运算时都做了自增自减操作, 并且在同一个表达式中
    int b = ++a + ++a;
    printf("b = %i\n", b);
```

---

## sizeof 运算符

- sizeof 可以用来计算一个变量或常量、数据类型所占的内存字节数

  - 标准格式: sizeof(常量 or 变量);

- sizeof 的几种形式

  - sizeof( 变量\常量 );
    - `sizeof(10);`
    - `char c = 'a'; sizeof(c);`
  - sizeof 变量\常量;
    - `sizeof 10;`
    - `char c = 'a'; sizeof c;`
  - sizeof( 数据类型);
    - `sizeof(float);`
    - `如果是数据类型不能省略括号`

- sizeof 面试题:
  - sizeof()和+=、\*=一样是一个复合运算符, 由 sizeof 和()两个部分组成, 但是代表的是一个整体
  - 所以 sizeof 不是一个函数, 是一个运算符, 该运算符的优先级是 2

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    double b = 3.14;
    // 由于sizeof的优先级比+号高, 所以会先计算sizeof(a);
    // a是int类型, 所以占4个字节得到结果4
    // 然后再利用计算结果和b相加, 4 + 3.14 = 7.14
    double res = sizeof a+b;
    printf("res = %lf\n", res); // 7.14
}
```

---

## 逗号运算符

- 在 C 语言中逗号“,”也是一种运算符,称为逗号运算符。 其功能是把多个表达式连接起来组成一个表达式,称为逗号表达式
- 逗号运算符会从左至右依次取出每个表达式的值, 最后整个逗号表达式的值等于最后一个表达式的值
- 格式: `表达式1，表达式2，… …，表达式n;`

* 例如: `int result = a+1,b=3*4;`

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10, b = 20, c;
    // ()优先级高于逗号运算符和赋值运算符, 所以先计算()中的内容
    // c = (11, 21);
    // ()中是一个逗号表达式, 结果是最后一个表达式的值, 所以计算结果为21
    // 将逗号表达式的结果赋值给c, 所以c的结果是21
    c = (a + 1, b + 1);
    printf("c = %i\n", c); // 21
}
```

---

## 关系运算符

- 为什么要学习关系运算符

* 默认情况下，我们在程序中写的每一句正确代码都会被执行。但很多时候，我们想在某个条件成立的情况下才执行某一段代码
* 这种情况的话可以使用条件语句来完成，但是学习条件语句之前，我们先来看一些更基础的知识：如何判断一个条件是否成立

---

- C 语言中的真假性

* 在 C 语言中，条件成立称为“真”，条件不成立称为“假”，因此，判断条件是否成立，就是判断条件的“真假”
* 怎么判断真假呢？C 语言规定，任何数值都有真假性，任何非 0 值都为“真”，只有 0 才为“假”。也就是说，108、-18、4.5、-10.5 等都是“真”，0 则是“假”
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/bca554bbef13027b7dabc1bb67f47a6d.png)

---

- 关系运算符的运算结果只有 2 种：如果条件成立，结果就为 1，也就是“真”；如果条件不成立，结果就为 0，也就是“假”

| 优先级 | 名称           | 符号 | 说明                    |
| ------ | -------------- | ---- | ----------------------- |
| 6      | 大于运算符     | `>`  | 双目运算符,具有左结合性 |
| 6      | 小于运算符     | `<`  | 双目运算符,具有左结合性 |
| 6      | 大于等于运算符 | `>=` | 双目运算符,具有左结合性 |
| 6      | 小于等于运算符 | `<=` | 双目运算符,具有左结合性 |
| 7      | 等于运算符     | ==   | 双目运算符,具有左结合性 |
| 7      | 不等于运算符   | !=   | 双目运算符,具有左结合性 |

```c showLineNumbers
#include <stdio.h>
int main(){
    int result = 10 > 5;
    printf("result = %i\n", result); // 1
    result = 5 < 10;
    printf("result = %i\n", result); // 1
    result = 5 > 10;
    printf("result = %i\n", result); // 0
    result = 10 >= 10;
    printf("result = %i\n", result); // 1
    result = 10 <= 10;
    printf("result = %i\n", result); // 1
    result = 10 == 10;
    printf("result = %i\n", result); // 1
    result = 10 != 9;
    printf("result = %i\n", result); // 1
}
```

- 优先级和结合性

```c showLineNumbers
#include <stdio.h>
int main(){
    // == 优先级 小于 >, 所以先计算>
    // result = 10 == 1; result = 0;
    int result = 10 == 5 > 3;
    printf("result = %i\n", result); // 0
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    // == 和 != 优先级一样, 所以按照结合性
    // 关系运算符是左结合性, 所以从左至右计算
    // result = 0 != 3; result = 1;
    int result = 10 == 5 != 3;
    printf("result = %i\n", result); // 1
}
```

- 练习: 计算 result 的结果

```c showLineNumbers
int result1 = 3 > 4 + 7
int result2 = (3>4) + 7
int result3 = 5 != 4 + 2 * 7 > 3 == 10
```

- 注意点:
  - 无论是 float 还是 double 都有精度问题, 所以一定要避免利用==判断浮点数是否相等

```c showLineNumbers
#include <stdio.h>
int main(){
    float a = 0.1;
    float b = a * 10 + 0.00000000001;
    double c = 1.0 + + 0.00000000001;
    printf("b = %f\n", b);
    printf("c = %f\n", c);
    int result = b == c;
    printf("result = %i\n", result); // 0
}
```

---

## 逻辑运算符

| 优先级 | 名称         | 符号   | 说明                    |
| ------ | ------------ | ------ | ----------------------- |
| 2      | 逻辑非运算符 | !      | 单目运算符,具有右结合性 |
| 11     | 逻辑与运算符 | &&     | 双目运算符,具有左结合性 |
| 12     | 逻辑或运算符 | `\|\|` | 双目运算符,具有左结合性 |

- 逻辑非

* 格式: `! 条件A;`

* 运算结果: 真变假,假变真

* 运算过程:

  - 先判断条件 A 是否成立，如果添加 A 成立, 那么结果就为 0，即“假”；
  - 如果条件 A 不成立，结果就为 1，即“真”

  * 使用注意:

  - 可以多次连续使用逻辑非运算符
  - !!!0;相当于(!(!(!0)));最终结果为 1

```c showLineNumbers
#include <stdio.h>
int main(){
    // ()优先级高, 先计算()里面的内容
    // 10==10为真, 所以result = !(1);
    // !代表真变假, 假变真,所以结果是假0
    int result = !(10 == 10);
    printf("result = %i\n", result); // 0
}
```

---

- 逻辑与

  - 格式: `条件A && 条件B;`
  - 运算结果:一假则假
  - 运算过程:

  * 总是先判断"条件 A"是否成立
  * 如果"条件 A"成立，接着再判断"条件 B"是否成立, 如果"条件 B"也成立，结果就为 1，即“真”
  * 如果"条件 A"成立，"条件 B"不成立，结果就为 0，即“假”
  * 如果"条件 A"不成立，不会再去判断"条件 B"是否成立, 因为逻辑与只要一个不为真结果都不为真

  - 使用注意:

  * "条件 A"为假, "条件 B"不会被执行

```c showLineNumbers
#include <stdio.h>
int main(){
    //               真     &&    真
    int result = (10 == 10) && (5 != 1);
    printf("result = %i\n", result); // 1
    //          假     &&    真
    result = (10 == 9) && (5 != 1);
    printf("result = %i\n", result); // 0
    //          真     &&    假
    result = (10 == 10) && (5 != 5);
    printf("result = %i\n", result); // 0
    //          假     &&    假
    result = (10 == 9) && (5 != 5);
    printf("result = %i\n", result); // 0
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    int b = 20;
    // 逻辑与, 前面为假, 不会继续执行后面
    int result = (a == 9) && (++b);
    printf("result = %i\n", result); // 1
    printf("b = %i\n", b); // 20
}
```

---

- 逻辑或

  - 格式: `条件A || 条件B;`
  - 运算结果:一真则真
  - 运算过程:

  * 总是先判断"条件 A"是否成立
  * 如果"条件 A"不成立，接着再判断"条件 B"是否成立, 如果"条件 B"成立，结果就为 1，即“真”
  * 如果"条件 A"不成立，"条件 B"也不成立成立, 结果就为 0，即“假”
  * 如果"条件 A"成立, 不会再去判断"条件 B"是否成立, 因为逻辑或只要一个为真结果都为真

  - 使用注意:

  * "条件 A"为真, "条件 B"不会被执行

```c showLineNumbers
#include <stdio.h>
int main(){
    //               真     ||    真
    int result = (10 == 10) || (5 != 1);
    printf("result = %i\n", result); // 1
    //          假     ||    真
    result = (10 == 9) || (5 != 1);
    printf("result = %i\n", result); // 1
    //          真     ||    假
    result = (10 == 10) || (5 != 5);
    printf("result = %i\n", result); // 1
    //          假     ||    假
    result = (10 == 9) || (5 != 5);
    printf("result = %i\n", result); // 0
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    int b = 20;
    // 逻辑或, 前面为真, 不会继续执行后面
    int result = (a == 10) || (++b);
    printf("result = %i\n", result); // 1
    printf("b = %i\n", b); // 20
}
```

- 练习: 计算 result 的结果

```c showLineNumbers
int result = 3>5 || 2<4 && 6<1;
```

---

## 三目运算符

- 三目运算符，它需要 3 个数据或表达式构成条件表达式
- 格式: `表达式1？表达式2(结果A)：表达式3(结果B)`

* 示例: `考试及格 ? 及格 : 不及格;`
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/47bcf1ddf7899400abb76c917b613962.png)

- 求值规则:

* 如果"表达式 1"为真，三目运算符的运算结果为"表达式 2"的值(结果 A)，否则为"表达式 3"的值(结果 B)

```c showLineNumbers
示例:
    int a = 10;
    int b = 20;
    int max = (a > b) ? a : b;
    printf("max = %d", max);
    输出结果: 20
等价于:
    int a = 10;
    int b = 20;
    int max = 0;
    if(a>b){
      max=a;
    }else {
       max=b;
    }
    printf("max = %d", max);
```

- 注意点

* 条件运算符的运算优先级低于关系运算符和算术运算符,但高于赋值符
* 条件运算符?和:是一个整体,不能分开使用

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    int b = 5;
    // 先计算 a > b
    // 然后再根据计算结果判定返回a还是b
    // 相当于int max= (a>b) ? a : b;
    int max= a>b ? a : b;
    printf("max = %i\n", max); // 10
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 10;
    int b = 5;
    int c = 20;
    int d = 10;
    // 结合性是从右至左, 所以会先计算:后面的内容
    // int res = a>b?a:(c>d?c:d);
    // int res = a>b?a:(20>10?20:10);
    // int res = a>b?a:(20);
    // 然后再计算最终的结果
    // int res = 10>5?10:(20);
    // int res = 10;
    int res = a>b?a:c>d?c:d;
    printf("res = %i\n", res);
}
```

---

## 类型转换

| 强制类型转换(显示转换)   | 自动类型转换(隐式转换) |
| ------------------------ | ---------------------- |
| (需要转换的类型)(表达式) | 1.算数转换 2.赋值转换  |

- 强制类型转换(显示转换)

```c showLineNumbers
// 将double转换为int
int a = (int)10.5;
```

- 算数转换
  - 系统会自动对占用内存较少的类型做一个“自动类型提升”的操作, 先将其转换为当前算数表达式中占用内存高的类型, 然后再参与运算

```c showLineNumbers
// 当前表达式用1.0占用8个字节, 2占用4个字节
// 所以会先将整数类型2转换为double类型之后再计算
double b = 1.0 / 2;
```

- 赋值转换

```c showLineNumbers
// 赋值时左边是什么类型,就会自动将右边转换为什么类型再保存
int a = 10.6;
```

- 注意点:

* 参与计算的是什么类型, 结果就是什么类型

```c showLineNumbers
// 结果为0, 因为参与运算的都是整型
double a = (double)(1 / 2);
// 结果为0.5, 因为1被强制转换为了double类型, 2也会被自动提升为double类型
double b = (double)1 / 2;
```

- 类型转换并不会影响到原有变量的值

```c showLineNumbers
#include <stdio.h>
int main(){
    double d = 3.14;
    int num = (int)d;
    printf("num = %i\n", num); // 3
    printf("d = %lf\n", d); // 3.140000
}
```

## 阶段练习

- 从键盘输入一个整数, 判断这个数是否是 100 到 200 之间的数
- 表达式 6 ＝＝ 6 ＝＝ 6 的值是多少？
- 用户从键盘上输入三个整数,找出最大值,然后输入最大值
- 用两种方式交换两个变量的保存的值

```c showLineNumbers
交换前
int a = 10; int b = 20;
交换后
int a = 20; int b = 10;
```

C 语言编程基础阶段就到此结束了，接下来我们进入 C 语言入门阶段。
