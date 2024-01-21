---
sidebar_position: 1
title: C语言学习
---

本文完全转载自[https://github.com/coderit666/CNote](https://github.com/coderit666/CNote),仅对错别字、大纲排版做简单修正，因此如果这篇文章对你有帮助，请至源项目下支持原作者。



## 什么是 C 语言?

- **C语言是一种用于和计算机交流的高级语言, 它既具有高级语言的特点，又具有汇编语言的特点**
  + 非常接近自然语言
  + 程序的执行效率非常高
- C语言是所有编程语言中的经典，很多高级语言都是从C语言中衍生出来的，
  + 例如:C++、C#、Object-C、Java、Go等等
- C语言是所有编程语言中的经典，很多著名的系统软件也是C语言编写的
  + 几乎所有的操作系统都是用C语言编写的
  + 几乎所有的计算机底层软件都是用C语言编写的
  + 几乎所有的编辑器都是C语言编写的



### C语言历史

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/61231e41c3ac5ebf9aa13e98a46c6505.png)

- 最早的高级语言:FORTRAN-->ALGOL-->CPL-->BCPL-->C-->C++等

> “初,世间无语言,仅电路与连线。及大牛出,天地开,始有 FORTRAN、 LISP、ALGOL 随之, 乃有万种语”

- 1963年英国剑桥大学推出了CPL(Combined Programming Langurage)语言。 CPL语言在ALGOL 60的基础上接近硬件一些,但规模比较大,难以实现
- 1967年英国剑桥大学的 Matin Richards(理查兹)对CPL语言做了简化,推出了 BCPL (Base Combined Programming Langurage)语言
- 1970年美国贝尔实验室的 Ken Thompson(肯·汤普逊) 以 BCPL 语言为基础,又作了进一步的简化,设计出了很简单的而且很接近硬件的 B 语言(取BCPL的第一个字母),并用B语言写出了第一个 UNIX 操作系统。但B语言过于简单,功能有限
- 1972年至1973年间,贝尔实验室的 Dennis.Ritchie(丹尼斯·里奇) 在 B语言的基础上设计出了C语言(取BCPL的第二个字母)。C语言即保持 BCPL 语言和B语言的优点(精练、接近硬件),又克服了他们的缺点(过于简单,数据无类型等)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/4ba25f6defb66dda5e45a1e6048089f5.png)

### C语言标准

- 1983年美国国家标准局(American National Standards Institute，**简称ANSI**)成立了一个委员会，开始制定C语言标准的工作
- 1989年C语言标准被批准，这个版本的C语言标准通常被称为ANSI C(**C89**)
- 1999年，国际标准化组织ISO又对C语言标准进行修订，在基本保留原C语言特征的基础上，针对应该的需要，增加了一些功能，命名为**C99**
- 2011年12月，ANSI采纳了ISO/IEC 9899:2011标准。这个标准通常即**C11，它是C程序语言的现行标准**



### C语言现状

- 年度编程语言
- 该奖项颁发给了一年中最热门的编程语言
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/3d49b9d00bab09124c51ac3620dbbc51.png)
- [编程语言排行榜查看](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html)



### 为什么要学习C语言?

- 40多年经久不衰
- 了解操作系统、编译原理、数据结构与算法等知识的最佳语言
- 了解其它语言底层实现原理必备语言
- 基础语法与其它高级语言类似,学会C语言之后再学习其它语言事半功倍,且知根知底

> 当你想了解底层原理时,你才会发现后悔当初没有学习C语言
> 当你想学习一门新的语言时, 你才会发现后悔当初没有学习C语言
> 当你使用一些高级框架、甚至系统框架时发现提供的 API 都是C语言编写的, 你才发现后悔当初没有学习 C 语言
> 学好数理化,走遍天下都不拍
> 学好C语言,再多语言都不怕