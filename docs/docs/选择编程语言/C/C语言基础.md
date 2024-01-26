---
sidebar_position: 2
title: C语言基础
---

## 流程控制基本概念

- 默认情况下程序运行后，系统会按书写顺序从上至下依次执行程序中的每一行代码。但是这并不能满足我们所有的开发需求, 为了方便我们控制程序的运行流程，C 语言提供 3 种流程控制结构，不同的流程控制结构可以实现不同的运行流程。
- 这 3 种流程结构分别是顺序结构、选择结构、循环结构
- 顺序结构:

* 按书写顺序从上至下依次执行
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/9071191723644a2b0364126c8a5bd65f.png)

- 选择结构

* 对给定的条件进行判断，再根据判断结果来决定执行代码
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/0e8b2f8b6230aedf754eab312605ce23.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e4452dcd9857466ecc0957fb4453b3a3.png)

- 循环结构

* 在给定条件成立的情况下，反复执行某一段代码
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/4899d440537583bc28f3bc17bd2b7ae1.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/3f74e2788a1ccbaf1028b1360c514c70.png)

---

## 选择结构

- C 语言中提供了两大选择结构, 分别是 if 和 switch

  ## 选择结构 if

- if 第一种形式

  - 表示如果表达式为真,执行语句块 1,否则不执行

```c showLineNumbers
if(表达式) {
  语句块1;
}
后续语句;
```

```c showLineNumbers
if(age >= 18) {
  printf("开网卡\n");
}
printf("买烟\n");
```

- if 第二种形式
  - 如果表达式为真,则执行语句块 1,否则执行语句块 2
  - else 不能脱离 if 单独使用

```c showLineNumbers
if(表达式){
  语句块1;
}else{
  语句块2;
}
后续语句;
```

```c showLineNumbers
if(age > 18){
  printf("开网卡\n");
}else{
  printf("喊家长来开\n");
}
printf("买烟\n");
```

- if 第三种形式
  - 如果"表达式 1"为真,则执行"语句块 1",否则判断"表达式 2",如果为真执行"语句块 2",否则再判断"表达式 3",如果真执行"语句块 3", 当表达式 1、2、3 都不满足,会执行最后一个 else 语句
  - 众多大括号中,只有一个大括号中的内容会被执行
  - 只有前面所有添加都不满足, 才会执行 else 大括号中的内容

```c showLineNumbers
if(表达式1) {
  语句块1;
}else if(表达式2){
  语句块2;
}else if(表达式3){
  语句块3;
}else{
  语句块4;
}
后续语句;
```

```c showLineNumbers
if(age>40){
  printf("给房卡");
}else if(age>25){
  printf("给名片");
}else if(age>18){
   printf("给网卡");
}else{
  printf("给好人卡");
}
printf("买烟\n");
```

- if 嵌套
  - if 中可以继续嵌套 if, else 中也可以继续嵌套 if

```c showLineNumbers
if(表达式1){
    语句块1;
   if(表达式2){
      语句块2;
  }
}else{
   if(表达式3){
      语句块3;
  }else{
      语句块4;
  }
}
```

---

- **_if 注意点_**
  - 任何数值都有真假性

```c showLineNumbers
#include <stdio.h>
int main(){
    if(0){
        printf("执行了if");
    }else{
        printf("执行了else"); // 被执行
    }
}
```

- 当 if else 后面只有一条语句时, if else 后面的大括号可以省略

```c showLineNumbers
    // 极其不推荐写法
    int age = 17;
    if (age >= 18)
        printf("开网卡\n");
    else
        printf("喊家长来开\n");
```

- 当 if else 后面的大括号被省略时, else 会自动和距离最近的一个 if 匹配

```c showLineNumbers
#include <stdio.h>
int main(){
    if(0)
    if(1)
    printf("A\n");
    else // 和if(1)匹配
    printf("B\n");
    else // 和if(0)匹配, 因为if(1)已经被匹配过了
    if (1)
    printf("C\n"); // 输出C
    else // 和if(1)匹配
    printf("D\n");
}
```

- - 如果 if else 省略了大括号, 那么后面不能定义变量

```c showLineNumbers
#include <stdio.h>
int main(){
    if(1)
        int number = 10; // 系统会报错
    printf("number = %i\n", number);
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    if(0){
        int number = 10;
    }else
        int value = 20; // 系统会报错
    printf("value = %i\n", value);
}
```

- C 语言中分号(;)也是一条语句, 称之为空语句

```c showLineNumbers
// 因为if(10 > 2)后面有一个分号, 所以系统会认为if省略了大括号
// if省略大括号时只能管控紧随其后的那条语句, 所以只能管控分号
if(10 > 2);
{
printf("10 > 2");
}
// 输出结果: 10 > 2
```

- 但凡遇到比较一个变量等于或者不等于某一个常量的时候，把常量写在前面

```c showLineNumbers
#include <stdio.h>
int main(){
    int a = 8;
//    if(a = 10){// 错误写法, 但不会报错
    if (10 == a){
      printf("a的值是10\n");
    }else{
     printf("a的值不是10\n");
    }
}
```

---

- if 练习

  - 从键盘输入一个整数，判断其是否是偶数，如果是偶数就输出 YES，否则输出 NO；
  - 接收用户输入的 1 ～ 7 的整数，根据用户输入的整数，输出对应的星期几
  - 接收用户输入的一个整数 month 代表月份，根据月份输出对应的季节
  - 接收用户输入的两个整数，判断大小后输出较大的那个数
  - 接收用户输入的三个整数，判断大小后输出较大的那个数
  - 接收用户输入的三个整数，排序后输出

- 实现石头剪刀布

```c showLineNumbers
剪刀石头布游戏:
1)定义游戏规则
  剪刀 干掉 布
  石头 干掉 剪刀
  布 干掉石头
2)显示玩家开始猜拳
3)接收玩家输入的内容
4)让电脑随机产生一种拳
5)判断比较
(1)玩家赢的情况(显示玩家赢了)
(2)电脑赢的情况(显示电脑赢了)
(3)平局(显示平局)
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/672ff35609edd25e6aa45a8adf1a6225.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/cb273336e304bc40948bfacebbdf01ed.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a44287edc332fab3fc13d7da196899a9.png)

---

## 选择结构 switch

- 由于 if else if 还是不够简洁，所以 switch 就应运而生了，他跟 if else if 互为补充关系。switch 提供了点的多路选择
- 格式:

```c showLineNumbers
switch(表达式){
    case 常量表达式1:
        语句1;
        break;
    case 常量表达式2:
        语句2;
        break;
    case 常量表达式n:
        语句n;
        break;
    default:
        语句n+1;
        break;
}
```

- 语义:
  - 计算"表达式"的值, 逐个与其后的"常量表达式"值相比较,当"表达式"的值与某个"常量表达式"的值相等时, 即执行其后的语句, 然后跳出 switch 语句
  - 如果"表达式"的值与所有 case 后的"常量表达式"均不相同时,则执行 default 后的语句
- 示例:

```c showLineNumbers
#include <stdio.h>

int main() {

    int num = 3;
    switch(num){
    case 1:
        printf("星期一\n");
        break;
    case 2:
        printf("星期二\n");
        break;
    case 3:
        printf("星期三\n");
        break;
    case 4:
        printf("星期四\n");
        break;
    case 5:
        printf("星期五\n");
        break;
    case 6:
        printf("星期六\n");
        break;
    case 7:
        printf("星期日\n");
        break;
    default:
        printf("回火星去\n");
        break;
    }
}
```

---

- switch 注意点

* switch 条件表达式的类型必须是整型, 或者可以被提升为整型的值(char、short)

```c showLineNumbers
#include <stdio.h>

int main() {

    switch(1.1){ // 报错
    case 1:
        printf("星期一\n");
        break;
    case 2:
        printf("星期二\n");
        break;
    default:
        printf("回火星去\n");
        break;
    }
}
```

- +case 的值只能是常量, 并且还必须是整型, 或者可以被提升为整型的值(char、short)

```c showLineNumbers
#include <stdio.h>

int main() {

    int num = 3;
    switch(1){
    case 1:
        printf("星期一\n");
        break;
    case 'a':
        printf("星期二\n");
        break;
    case num: // 报错
        printf("星期三\n");
        break;
    case 4.0: // 报错
        printf("星期四\n");
        break;
    default:
        printf("回火星去\n");
        break;
    }
}
```

- case 后面常量表达式的值不能相同

```c showLineNumbers
#include <stdio.h>

int main() {
    switch(1){
    case 1: // 报错
        printf("星期一\n");
        break;
    case 1: // 报错
        printf("星期一\n");
        break;
    default:
        printf("回火星去\n");
        break;
    }
}
```

- case 后面要想定义变量,必须给 case 加上大括号

```c showLineNumbers
#include <stdio.h>

int main() {
    switch(1){
    case 1:{
        int num = 10;
        printf("num = %i\n", num);
        printf("星期一\n");
        break;
        }
    case 2:
        printf("星期一\n");
        break;
    default:
        printf("回火星去\n");
        break;
    }
}
```

- switch 中只要任意一个 case 匹配, 其它所有的 case 和 default 都会失效. 所以如果 case 和 default 后面没有 break 就会出现穿透问题

```c showLineNumbers
#include <stdio.h>

int main() {

    int num = 2;
    switch(num){
    case 1:
        printf("星期一\n");
        break;
    case 2:
        printf("星期二\n"); // 被输出
    case 3:
        printf("星期三\n"); // 被输出
    default:
        printf("回火星去\n"); // 被输出
        break;
    }
}
```

- switch 中 default 可以省略

```c showLineNumbers
#include <stdio.h>

int main() {
    switch(1){
    case 1:
        printf("星期一\n");
        break;
    case 2:
        printf("星期一\n");
        break;
    }
}
```

- switch 中 default 的位置不一定要写到最后, 无论放到哪都会等到所有 case 都不匹配才会执行(穿透问题除外)

```c showLineNumbers
#include <stdio.h>

int main() {
    switch(3){
    case 1:
        printf("星期一\n");
        break;
    default:
        printf("Other,,,\n");
        break;
    case 2:
        printf("星期一\n");
        break;
    }
}
```

---

- **_if 和 Switch 转换_**
- 看上去 if 和 switch 都可以实现同样的功能, 那么在企业开发中我们什么时候使用 if, 什么时候使用 switch 呢?
  - if else if 针对于范围的多路选择
  - switch 是针对点的多路选择
- 判断用户输入的数据是否大于 100

```c showLineNumbers
#include <stdio.h>

int main() {
    int a = -1;
    scanf("%d", &a);
    if(a > 100){
        printf("用户输入的数据大于100");
    }else{
        printf("用户输入的数据不大于100");
    }
}
```

```c showLineNumbers
#include <stdio.h>

int main() {
    int a = -1;
    scanf("%d", &a);
    // 挺(T)萌(M)的(D)搞不定啊
    switch (a) {
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
            printf("大于\n");
            break;
        default:
            printf("不大于\n");
            break;
    }
}
```

---

- 练习
  - 实现分数等级判定

```c showLineNumbers
要求用户输入一个分数，根据输入的分数输出对应的等级
A 90～100
B 80～89
C 70～79
D 60～69
E 0～59
```

- 实现+ - \* / 简单计算器

## 循环结构

- C 语言中提供了三大循环结构, 分别是 while、dowhile 和 for
- 循环结构是程序中一种很重要的结构。
  - 其特点是,在给定条件成立时,反复执行某程序段, 直到条件不成立为止。
  - 给定的条件称为"循环条件",反复执行的程序段称为"循环体"
    ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/d32037b3b82185eadb8c1f2ae4e2d160.png)

## 循环结构 while

- 格式:

```c showLineNumbers
while (  循环控制条件 ) {
    循环体中的语句;
    能够让循环结束的语句;
    ....
}
```

- 构成循环结构的几个条件

  - 循环控制条件
    - 循环退出的主要依据,来控制循环到底什么时候退出
  - 循环体
    - 循环的过程中重复执行的代码段
  - 能够让循环结束的语句(递增、递减、真、假等)
    - 能够让循环条件为假的依据,否则退出循环

- 示例:

```c showLineNumbers
int count = 0;
while (count < 3) { // 循环控制条件
    printf("发射子弹~哔哔哔哔\n"); // 需要反复执行的语句
    count++; // 能够让循环结束的语句
}
```

- while 循环执行流程
  - 首先会判定"循环控制条件"是否为真, 如果为假直接跳到循环语句后面
  - 如果"循环控制条件"为真, 执行一次循环体, 然后再次判断"循环控制条件"是否为真, 为真继续执行循环体,为假跳出循环
  - 重复以上操作, 直到"循环控制条件"为假为止

```c showLineNumbers
#include <stdio.h>
int main(){
    int count = 4;
    // 1.判断循环控制条件是否为真,此时为假所以跳过循环语句
    while (count < 3) {
        printf("发射子弹~哔哔哔哔\n");
        count++;
    }
    // 2.执行循环语句后面的代码, 打印"循环执行完毕"
    printf("循环执行完毕\n");
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    int count = 0;
    // 1.判断循环控制条件是否为真,此时0 < 3为真
    // 4.再次判断循环控制条件是否为真,此时1 < 3为真
    // 7.再次判断循环控制条件是否为真,此时2 < 3为真
    // 10.再次判断循环控制条件是否为真,此时3 < 3为假, 跳过循环语句
    while (count < 3) {
        // 2.执行循环体中的代码, 打印"发子弹"
        // 5.执行循环体中的代码, 打印"发子弹"
        // 8.执行循环体中的代码, 打印"发子弹"
        printf("发射子弹~哔哔哔哔\n");
        // 3.执行"能够让循环结束的语句" count = 1
        // 6.执行"能够让循环结束的语句" count = 2
        // 9.执行"能够让循环结束的语句" count = 3
        count++;
    }
    // 11.执行循环语句后面的代码, 打印"循环执行完毕"
    printf("循环执行完毕\n");
}
```

---

- **_while 循环注意点_**
  - 任何数值都有真假性

```c showLineNumbers
#include <stdio.h>
int main(){
    while (1) { // 死循环
         printf("发射子弹~哔哔哔哔\n");
         // 没有能够让循环结束的语句
    }
}
```

- 当 while 后面只有一条语句时,while 后面的大括号可以省略

```c showLineNumbers
#include <stdio.h>
int main(){
    while (1)  // 死循环
         printf("发射子弹~哔哔哔哔\n");
         // 没有能够让循环结束的语句
}
```

- 如果 while 省略了大括号, 那么后面不能定义变量

```c showLineNumbers
#include <stdio.h>
int main(){
    while (1)  // 死循环
         int num = 10; // 报错
         // 没有能够让循环结束的语句
}
```

- C 语言中分号(;)也是一条语句, 称之为空语句

```c showLineNumbers
#include <stdio.h>
int main(){
    int count = 0;
    while (count < 3);{ // 死循环
       printf("发射子弹~哔哔哔哔\n");
       count++;
    }
}
```

- 最简单的死循环

```c showLineNumbers
// 死循环一般在操作系统级别的应用程序会比较多, 日常开发中很少用
while (1);
```

---

- while 练习
  - 计算 1 + 2 + 3 + ...n 的和
  - 获取 1 ～ 100 之间 7 的倍数的个数

---

## 循环结构 do while

- 格式:

```c showLineNumbers
do {
    循环体中的语句;
    能够让循环结束的语句;
    ....
} while (循环控制条件 );
```

- 示例

```c showLineNumbers
int count = 0;
do {
   printf("发射子弹~哔哔哔哔\n");
   count++;
}while(count < 10);
```

- do-while 循环执行流程

  - 首先不管 while 中的条件是否成立, 都会执行一次"循环体"
  - 执行完一次循环体,接着再次判断 while 中的条件是否为真, 为真继续执行循环体,为假跳出循环
  - 重复以上操作, 直到"循环控制条件"为假为止

- 应用场景
  - 口令校验

```c showLineNumbers
#include<stdio.h>
int main()
{
    int num = -1;
    do{
        printf("请输入密码,验证您的身份\n");
        scanf("%d", &num);
    }while(123456 != num);
    printf("主人,您终于回来了\n");
}
```

- while 和 dowhile 应用场景
  - 绝大多数情况下 while 和 dowhile 可以互换, 所以能用 while 就用 while
  - 无论如何都需要先执行一次循环体的情况, 才使用 dowhile
  - do while 曾一度提议废除，但是他在输入性检查方面还是有点用的

---

## 循环结构 for

- 格式:

```c showLineNumbers
for(初始化表达式；循环条件表达式；循环后的操作表达式) {
    循环体中的语句;
}
```

- 示例

```c showLineNumbers
for(int i = 0; i < 10; i++){
    printf("发射子弹~哔哔哔哔\n");
}
```

- for 循环执行流程

  - 首先执行"初始化表达式"，而且在整个循环过程中,**_只会执行一次_**初始化表达式
  - 接着判断"循环条件表达式"是否为真，为真执行循环体中的语句
  - 循环体执行完毕后，接下来会执行"循环后的操作表达式"，然后再次判断条件是否为真,为真继续执行循环体,为假跳出循环
  - 重复上述过程，直到条件不成立就结束 for 循环

- for 循环注意点:

  - 和 while 一模一样
  - 最简单的死循环`for(;;);`

- for 和 while 应用场景
  - while 能做的 for 都能做, 所以企业开发中能用 for 就用 for, 因为 for 更为灵活
  - 而且对比 while 来说 for 更节约内存空间

```c showLineNumbers
int count = 0; // 初始化表达式
while (count < 10) { // 条件表达式
      printf("发射子弹~哔哔哔哔 %i\n", count);
      count++; // 循环后增量表达式
}
// 如果初始化表达式的值, 需要在循环之后使用, 那么就用while
printf("count = %i\n", count);
```

```c showLineNumbers
// 注意: 在for循环初始化表达式中定义的变量, 只能在for循环后面的{}中访问
// 所以: 如果初始化表达式的值, 不需要在循环之后使用, 那么就用for
// 因为如果初始化表达式的值, 在循环之后就不需要使用了 , 那么用while会导致性能问题
for (int count = 0; count < 10; count++) {
     printf("发射子弹~哔哔哔哔 %i\n", count);
}
//     printf("count = %i\n", count);
```

```c showLineNumbers
// 如果需要使用初始化表达式的值, 也可以将初始化表达式写到外面
int count = 0;
for (; count < 10; count++) {
     printf("发射子弹~哔哔哔哔\n", count);
}
printf("count = %i\n", count);
```

## 四大跳转

- C 语言中提供了四大跳转语句, 分别是 return、break、continue、goto
- break:

* 立即跳出 switch 语句或循环

- 应用场景:

* switch
* 循环结构
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/912852ed05d5b35f881533a2187ed9f6.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/3d827d07e49b3a8714cb36dcb7d1ee68.png)

- break 注意点:
  - break 离开应用范围，存在是没有意义的

```c showLineNumbers
if(1) {
  break; // 会报错
}
```

- 在多层循环中,一个 break 语句只向外跳一层

```c showLineNumbers
while(1) {
  while(2) {
    break;// 只对while2有效, 不会影响while1
  }
  printf("while1循环体\n");
}
```

- break 下面不可以有语句，因为执行不到

```c showLineNumbers
while(2){
  break;
  printf("打我啊!");// 执行不到
}
```

---

- continue

* 结束**本轮**循环，进入**下一轮**循环

- 应用场景:

* 循环结构
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/583422ddce6be561ca9c76019f629c19.png)

- continue 注意点:

* continue 离开应用范围，存在是没有意义的

```c showLineNumbers
if(1) {
  continue; // 会报错
}
```

---

- goto
- 这是一个不太值得探讨的话题，goto 会破坏结构化程序设计流程，它将使程序层次不清，且不易读，所以慎用
- goto 语句，仅能在本函数内实现跳转，不能实现跨函数跳转(短跳转)。但是他在跳出多重循环的时候效率还是蛮高的
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c6c568069c9f5d7e162f250f7ea9e4fc.png)

```c showLineNumbers
#include <stdio.h>
int main(){
    int num = 0;
// loop:是定义的标记
loop:if(num < 10){
        printf("num = %d\n", num);
        num++;
        // goto loop代表跳转到标记的位置
        goto loop;
    }
}
```

```c showLineNumbers
#include <stdio.h>
int main(){
    while (1) {
        while(2){
            goto lnj;
        }
    }
    lnj:printf("跳过了所有循环");
}
```

---

- return
  - 结束当前函数，将结果返回给调用者
  - 不着急, 放一放,学到函数我们再回头来看它

## 循环的嵌套

- 循环结构的循环体中存在其他的循环结构，我们称之为循环嵌套
  - 注意: 一般循环嵌套不超过三层
  - 外循环执行的次数 \* 内循环执行的次数就是内循环总共执行的次数
- 格式:

```c showLineNumbers
while(条件表达式) {
    while循环结构 or dowhile循环结构 or for循环结构
}
for(初始化表达式；循环条件表达式；循环后的操作表达式) {
    while循环结构 or dowhile循环结构 or for循环结构
}
do {
     while循环结构 or dowhile循环结构 or for循环结构
} while (循环控制条件 );
```

- 循环优化
  - 在多重循环中，如果有可能，应当将最长的循环放在最内层，最短的循环放在最外层，以减少 CPU 跨切循环层的次数

```c showLineNumbers
for (row=0; row<100; row++) {
  // 低效率：长循环在最外层
  for ( col=0; col<5; col++ ) {
    sum = sum + a[row][col];
  }
}
for (col=0; col<5; col++ ) {
  // 高效率：长循环在最内层
  for (row=0; row<100; row++) {
    sum = sum + a[row][col];
  }
}
```

- 练习
  - 打印好友列表

```c showLineNumbers
好友列表1
    好友1
    好友2
好友列表2
    好友1
    好友2
好友列表3
    好友1
    好友2
for (int i = 0; i < 4; i++) {
    printf("好友列表%d\n", i+1);
    for (int j = 0; j < 4; j++) {
        printf("    角色%d\n", j);
    }
}
```

## C 语言图形打印

- 一重循环解决线性的问题，而二重循环和三重循环就可以解决平面和立体的问题了
- 打印矩形

```c showLineNumbers
****
****
****
// 3行4列
//  外循环控制行数
for (int i = 0; i < 3; i++) {
//        内循环控制列数
    for (int j = 0; j < 4; j++) {
        printf("*");
    }
    printf("\n");
}
```

- 打印三角形
  - 尖尖朝上，改变内循环的条件表达式，让内循环的条件表达式随着外循环的 i 值变化
  - 尖尖朝下，改变内循环的初始化表达式，让内循环的初始化表达式随着外循环的 i 值变化

```c showLineNumbers
*
**
***
****
*****
/*
最多打印5行
最多打印5列
每一行和每一列关系是什么? 列数<=行数
*/
for(int i = 0; i< 5; i++) {
    for(int j = 0; j <= i; j++) {
        printf("*");
    }
    printf("\n");
}
*****
****
***
**
*
for(int i = 0; i< 5; i++) {
    for(int j = i; j < 5; j++) {
        printf("*");
    }
    printf("\n");
}
```

- 练习
  - 打印特殊三角形

```c showLineNumbers
1
12
123
for (int i = 0; i < 3; i++) {
    for (int j = 0; j <= i; j++) {
        printf("%d", j+1);
    }
    printf("\n");
}
```

- - 打印特殊三角形

```c showLineNumbers
1
22
333
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        printf("%d", i);
    }
    printf("\n");
}
```

- - 打印特殊三角形

```c showLineNumbers
--*
-***
*****
for (int i = 0; i <= 5; i++) {
    for (int j = 0; j < 5 - i; j++) {
        printf("-");
    }
    for (int m = 0; m < 2*i+1; m++) {
        printf("*");
    }
    printf("\n");
}
```

- - 打印 99 乘法表

```c showLineNumbers
1 * 1 = 1
1 * 2 = 2     2 * 2 = 4
1 * 3 = 3     2 * 3 = 6     3 * 3 = 9
for (int i = 1; i <= 9; i++) {
    for (int j = 1; j <= i; j++) {
        printf("%d * %d = %d \t", j, i, (j * i));
    }
    printf("\n");
}
```

## 函数基本概念

- C 源程序是由函数组成的

* 例如: 我们前面学习的课程当中,通过 main 函数+scanf 函数+printf 函数+逻辑代码就可以组成一个 C 语言程序

- C 语言不仅提供了极为丰富的库函数, 还允许用户建立自己定义的函数。用户可把自己的算法编写成一个个相对独立的函数，然后再需要的时候调用它

* 例如:你用 C 语言编写了一个 MP3 播放器程序，那么它的程序结构如下图所示
* ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/5ae3272e9f2f49988524b0e511a40287.png)

- 可以说 C 程序的全部工作都是由各式各样的函数完成的,所以也把 C 语言称为函数式语言

---

## 函数的分类

- 在 C 语言中可从不同的角度对函数分类
- 从函数定义的角度看,函数可分为库函数和用户定义函数两种

* **_库函数:_** 由 C 语言系统提供,用户无须定义,也不必在程序中作类型说明,只需在程序前包含有该函数原型的头文件即可在程序中直接调用。在前面各章的例题中反复用到 printf、scanf、getchar、putchar 等函数均属此类
* **_用户定义函数:_**由用户按需编写的函数。对于用户自定义函数,不仅要在程序中定义函数本身,而且在主调函数模块中还必须对该被调函数进行类型说明,然后才能使用

- 从函数执行结果的角度来看, 函数可分为有返回值函数和无返回值函数两种

* **_有返回值函数:_** 此类函数被调用执行完后将向调用者返回一个执行结果,称为函数返回值。(必须指定返回值类型和使用 return 关键字返回对应数据)
* **_无返回值函数:_** 此类函数用于完成某项特定的处理任务,执行完成后不向调用者返回函数值。(返回值类型为 void, 不用使用 return 关键字返回对应数据)

- 从主调函数和被调函数之间数据传送的角度看,又可分为无参函数和有参函数两种

* **_无参函数:_** 在函数定义及函数说明及函数调用中均不带参数。主调函数和被调函数之间不进行参数传送。
* **_有参函数:_** 在函数定义及函数说明时都有参数,称为形式参数(简称为形参)。在函数调用时也必须给出参数,称为实际参数(简称为实参)

---

## 函数的定义

- 定义函数的目的

* 将一个常用的功能封装起来，方便以后调用

- 自定义函数的书写格式

```c showLineNumbers
返回值类型 函数名(参数类型 形式参数1，参数类型 形式参数2，…) {
    函数体;
    返回值;
}
```

- 示例

```c showLineNumbers
int main(){
    printf("hello world\n");
    retrun 0;
}
```

- 定义函数的步骤

* 函数名：函数叫什么名字
* 函数体：函数是干啥的，里面包含了什么代码
* 返回值类型: 函数执行完毕返回什么和调用者

---

- 无参无返回值函数定义

* 没有返回值时 return 可以省略

* 格式:

  ```c showLineNumbers
  void 函数名() {
      函数体;
  }
  ```

* 示例:

  ```c showLineNumbers
  // 1.没有返回值/没有形参
  // 如果一个函数不需要返回任何数据给调用者, 那么返回值类型就是void
  void printRose() {
      printf(" {@}\n");
      printf("  |\n");
      printf(" \\|/\n"); // 注意: \是一个特殊的符号(转意字符), 想输出\必须写两个斜线
      printf("  |\n");
    // 如果函数不需要返回数据给调用者, 那么函数中的return可以不写
  }
  ```

---

- 无参有返回值函数定义

* 格式:

  ```c showLineNumbers
  返回值类型 函数名() {
      函数体;
      return 值;
  }
  ```

* 示例:

  ```c showLineNumbers
  int getMax() {
      printf("请输入两个整数, 以逗号隔开, 以回车结束\n");
      int number1, number2;
      scanf("%i,%i", &number1, &number2);
      int max = number1 > number2 ? number1 : number2;
      return max;
  }
  ```

---

- 有参无返回值函数定义

* 形式参数表列表的格式: `类型 变量名,类型 变量2,......`

* 格式:

  ```c showLineNumbers
  void 函数名(参数类型 形式参数1，参数类型 形式参数2，…) {
      函数体;
  }
  ```

* 示例:

  ```c showLineNumbers
  void printMax(int value1, int value2) {
      int max = value1 > value2 ? value1 : value2;
      printf("max = %i\n", max);
  }
  ```

---

- 有参有返回值函数定义

* 格式:

  ```c showLineNumbers
  返回值类型 函数名(参数类型 形式参数1，参数类型 形式参数2，…) {
      函数体;
      return 0;
  }
  ```

* 示例:

  ```c showLineNumbers
   int printMax(int value1, int value2) {
      int max = value1 > value2 ? value1 : value2;
      return max;
  }
  ```

---

- 函数定义注意

- 函数名称不能相同

  ```c showLineNumbers
  void test() {
  }
  void test() { // 报错
  }
  ```

---

## 函数的参数和返回值

- 形式参数
  - 在**\*定义函数\***时，函数名后面小括号()中定义的变量称为形式参数，简称形参
  - 形参变量只有在被调用时才分配内存单元,在调用结束时,即刻释放所分配的内存单元。
  - 因此,形参只有在函数内部有效,函数调用结束返回主调函数后则不能再使用该形参变量

```c showLineNumbers
int max(int number1, int number2) //  形式参数
{
    return number1 > number2 ? number1 : number2;
}
```

---

- 实际参数
  - 在**\*调用函数\***时, 传入的值称为实际参数，简称实参
  - 实参可以是常量、变量、表达式、函数等,无论实参是何种类型的量,在进行函数调用时,它们都必须具有确定的值,以便把这些值传送给形参
  - 因此应预先用赋值,输入等办法使实参获得确定值

```c showLineNumbers
int main() {
    int num = 99;
    // 88, num, 22+44均能得到一个确定的值, 所以都可以作为实参
    max(88, num, 22+44); // 实际参数
    return 0;
}
```

---

- 形参、实参注意点

  - 调用函数时传递的实参个数必须和函数的形参个数必须保持一致

  ```c showLineNumbers
  int max(int number1, int number2) { //  形式参数
      return number1 > number2 ? number1 : number2;
  }
  int main() {
      // 函数需要2个形参, 但是我们只传递了一个实参, 所以报错
      max(88); // 实际参数
      return 0;
  }
  ```

- - 形参实参类型不一致, 会自动转换为形参类型

  ```c showLineNumbers
  void change(double number1, double number2) {//  形式参数
     // 输出结果: 10.000000, 20.000000
     // 自动将实参转换为double类型后保存
     printf("number1 = %f, number2 = %f", number1, number2);
  }
  int main() {
      change(10, 20);
      return 0;
  }
  ```

- - 当使用基本数据类型（char、int、float 等）作为实参时，实参和形参之间只是值传递，修改形参的值并不影响到实参函数可以没有形参

  ```c showLineNumbers
  void change(int number1, int number2) { //  形式参数
      number1 = 250; // 不会影响实参
      number2 = 222;
  }
  int main() {
      int a = 88;
      int b = 99;
      change(a, b);
      printf("a  = %d, b = %d", a, b); // 输出结果: 88, 99
      return 0;
  }
  ```

---

- 返回值类型注意点

  - 如果没有写返回值类型，默认是 int

  ```c showLineNumbers
  max(int number1, int number2) {//  形式参数
      return number1 > number2 ? number1 : number2;
  }
  ```

- - 函数返回值的类型和 return 实际返回的值类型应保持一致。如果两者不一致,则以返回值类型为准,自动进行类型转换

  ```c showLineNumbers
  int height() {
      return 3.14;
  }
  int main() {
    double temp = height();
    printf("%lf", temp);// 输出结果: 3.000000
  }
  ```

- - 一个函数内部可以多次使用 return 语句，但是 return 语句后面的代码就不再被执行

  ```c showLineNumbers
  int max(int number1, int number2) {//  形式参数
      return number1 > number2 ? number1 : number2;
      printf("执行不到"); // 执行不到
      return 250; // 执行不到
  }
  ```

---

## 函数的声明

- 在 C 语言中，函数的定义顺序是有讲究的：

* 默认情况下，只有后面定义的函数才可以调用前面定义过的函数

- 如果想把函数的定义写在 main 函数后面，而且 main 函数能正常调用这些函数，那就必须在 main 函数的前面进行函数的声明, 否则

* 系统搞不清楚有没有这个函数
* 系统搞不清楚这个函数接收几个参数
* 系统搞不清楚这个函数的返回值类型是什么

- 所以函数声明,就是在函数调用之前告诉系统, 该函数叫什么名称, 该函数接收几个参数, 该函数的返回值类型是什么
- 函数的声明格式：

* 将自定义函数时{}之前的内容拷贝到调用之间即可
* 例如: `int max( int a, int b );`
* 或者: `int max( int, int );`

```c showLineNumbers
// 函数声明
void getMax(int v1, int v2);
int main(int argc, const char * argv[]) {
    getMax(10, 20); // 调用函数
    return 0;
}
// 函数实现
void getMax(int v1, int v2) {
    int max = v1 > v2 ? v1 : v2;
    printf("max = %i\n", max);
}
```

- 函数的声明与实现的关系

* 声明仅仅代表着告诉系统一定有这个函数, 和这个函数的参数、返回值是什么
* 实现代表着告诉系统, 这个函数具体的业务逻辑是怎么运作的

- 函数声明注意点:

* 函数的实现不能重复, 而函数的声明可以重复

  ```c showLineNumbers
  // 函数声明
  void getMax(int v1, int v2);
  void getMax(int v1, int v2);
  void getMax(int v1, int v2); // 不会报错
  int main(int argc, const char * argv[]) {
      getMax(10, 20); // 调用函数
      return 0;
  }
  // 函数实现
  void getMax(int v1, int v2) {
      int max = v1 > v2 ? v1 : v2;
      printf("max = %i\n", max);
  }
  ```

- 函数声明可以写在函数外面,也可以写在函数里面, 只要在调用之前被声明即可

  ```c showLineNumbers
  int main(int argc, const char * argv[]) {
      void getMax(int v1, int v2); // 函数声明, 不会报错
      getMax(10, 20); // 调用函数
      return 0;
  }
  // 函数实现
  void getMax(int v1, int v2) {
      int max = v1 > v2 ? v1 : v2;
      printf("max = %i\n", max);
  }
  ```

- 当被调函数的函数定义出现在主调函数之前时,在主调函数中也可以不对被调函数再作声明

  ```c showLineNumbers
  // 函数实现
  void getMax(int v1, int v2) {
      int max = v1 > v2 ? v1 : v2;
      printf("max = %i\n", max);
  }
  int main(int argc, const char * argv[]) {
      getMax(10, 20); // 调用函数
      return 0;
  }
  ```

- 如果被调函数的返回值是整型时,可以不对被调函数作说明,而直接调用

  ```c showLineNumbers
  int main(int argc, const char * argv[]) {
      int res = getMin(5, 3); // 不会报错
      printf("result = %d\n", res );
      return 0;
  }
  int getMin(int num1, int num2) {// 返回int, 不用声明
      return num1 < num2 ? num1 : num2;
  }
  ```

---

## main 函数分析

- main 的含义:

* main 是函数的名称, 和我们自定义的函数名称一样, 也是一个标识符
* 只不过 main 这个名称比较特殊, 程序已启动就会自动调用它

- return 0;的含义:

* 告诉系统 main 函数是否正确的被执行了
* 如果 main 函数的执行正常, 那么就返回 0
* 如果 main 函数执行不正常, 那么就返回一个非 0 的数

- 返回值类型:

* 一个函数 return 后面写的是什么类型, 函数的返回值类型就必须是什么类型, 所以写 int

- 形参列表的含义

* int argc :

- 系统在启动程序时调用 main 函数时传递给 argv 的值的个数

* const char \* argv[] :

- 系统在启动程序时传入的的值, 默认情况下系统只会传入一个值, 这个值就是 main 函数执行文件的路径
- 也可以通过命令行或项目设置传入其它参数
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/0ec7f77ac94198f539e8fa2dce87ab82.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/5cdd2adc527c964fec76a5f55ed62d4d.png)

---

- 函数练习

* 写一个函数从键盘输入三个整型数字,找出其最大值
* 写一个函数求三个数的平均值

## 递归函数

- 什么是递归函数?

* 一个函数在它的函数体内调用它自身称为递归调用

  ```c showLineNumbers
  void function(int x){
      function(x);
  }
  ```

- 递归函数构成条件

* 自己搞自己
* 存在一个条件能够让递归结束
* 问题的规模能够缩小

- 示例:

* 获取用户输入的数字, 直到用户输入一个正数为止

```c showLineNumbers
void getNumber(){
    int number = -1;
    while (number < 0) {
        printf("请输入一个正数\n");
        scanf("%d", &number);
    }

    printf("number = %d\n", number);
}
```

```c showLineNumbers
void getNumber2(){
    int number = -1;
    printf("请输入一个正数abc\n");
    scanf("%d", &number);
    if (number < 0) {
//        负数
        getNumber2();
    }else{
//        正数
       printf("number = %d\n", number);
    }
}
```

- 递归和循环区别

* 能用循环实现的功能,用递归都可以实现
* 递归常用于"回溯", "树的遍历","图的搜索"等问题
* 但代码理解难度大，内存消耗大(易导致栈溢出), 所以考虑到代码理解难度和内存消耗问题, 在企业开发中一般能用循环都不会使用递归

- 递归练习

* 有 5 个人坐在一起,问第 5 个人多少岁?他说比第 4 个人大两岁。问 第 4 个人岁数,他说比第 3 个人大两岁。问第 3 个人,又说比第 2 个 人大两岁。问第 2 个人,说比第 1 个人大两岁。最后问第 1 个人, 他说是 10 岁。请问第 5 个人多大?
* 用递归法求 N 的阶乘
* 设计一个函数用来计算 B 的 n 次方

## 进制基本概念

- 什么是进制?

* 进制是一种计数的方式,数值的表示形式

- 常见的进制

* 十进制、二进制、八进制、十六进制

- 进制书写的格式和规律

* 十进制 0、1、2、3、4、5、6、7、8、9 逢十进一
* 二进制 0、1 逢二进一

- 书写形式:需要以 0b 或者 0B 开头,例如: 0b101

* 八进制 0、1、2、3、4、5、6、7 逢八进一

- 书写形式:在前面加个 0,例如: 061

* 十六进制 0、1、2、3、4、5、6、7、8、9、A、B、C、D、E、F 逢十六进一

- 书写形式:在前面加个 0x 或者 0X,例如: 0x45

* 练习

- 1.用不同进制表示如下有多少个方格
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/ca48b49abde038c455a5c4ea0789e2ee.png)

- 2.判断下列数字是否合理

  ```c showLineNumbers
  00011  0x001  0x7h4  10.98  0986  .089-109
  +178  0b325  0b0010  0xffdc 96f 96.0f 96.oF  -.003
  ```

## 进制转换

- 10 进制转 2 进制

* 除 2 取余, 余数倒序; 得到的序列就是二进制表示形式
* 例如: 将十进制(97) 10 转换为二进制数
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/bf4d5af2fc35c2fffaf62ee00a34c9d2.png)

---

- 2 进制转 10 进制

  - 每一位二进制进制位的值 \* 2 的当前索引次幂; 再将所有位求出的值相加
  - 例如: 将二进制 01100100 转换为十进制

  ```c showLineNumbers
  01100100
  索引从右至左, 从零开始
  第0位: 0 * 2^0 = 0;
  第1位: 0 * 2^1 = 0;
  第2位: 1 * 2^2 = 4;
  第3位: 0 * 2^3 = 0;
  第4位: 0 * 2^4 = 0;
  第5位: 1 * 2^5 = 32;
  第6位: 1 * 2^6 = 64;
  第7位: 0 * 2^7 = 0;
  最终结果为: 0 + 0 + 4 + 0 + 0 + 32 + 64 + 0 = 100
  ```

---

- 2 进制转 8 进制

  - 三个二进制位代表一个八进制位, 因为 3 个二进制位的最大值是 7，而八进制是逢 8 进 1
  - 例如: 将二进制 01100100 转换为八进制数

  ```c showLineNumbers
  从右至左每3位划分为8进制的1位, 不够前面补0
  001 100 100
  第0位: 100 等于十进制 4
  第1位: 100 等于十进制 4
  第2位: 001 等于十进制 1
  最终结果: 144就是转换为8进制的值
  ```

---

- 2 进制转 16 进制

  - 四个二进制位代表一个十六进制位，因为 4 个二进制位的最大值是 15，而十六进制是逢 16 进 1
  - 例如: 将二进制 01100100 转换为十六进制数

  ```c showLineNumbers
  从右至左每4位划分为16进制的1位, 不够前面补0
  0110 0100
  第0位: 0100 等于十进制 4
  第1位: 0110 等于十进制 6
  最终结果: 64就是转换为16进制的值
  ```

---

- 其它进制转换为十进制

  - 系数 \* 基数 ^ 索引 之和

  ```c showLineNumbers
      十进制           -->          十进制
     12345   =  10000 + 2000 + 300 + 40 + 5
             =  (1 * 10 ^ 4)  + (2 * 10 ^ 3) + (3 * 10 ^ 2) + (4 * 10 ^ 1) + (5 * 10 ^ 0)
             =  (1 * 10000) + (2 + 1000) + (3 * 100) + (4 * 10) + (5 * 1)
             =  10000 + 2000 + 300 + 40 + 5
             =  12345

     规律:
     其它进制转换为十进制的结果 = 系数 * 基数 ^ 索引 之和

     系数: 每一位的值就是一个系数
     基数: 从x进制转换到十进制, 那么x就是基数
     索引: 从最低位以0开始, 递增的数
  ```

  ```c showLineNumbers
     二进制        -->      十进制
     543210
     101101 = (1 * 2 ^ 5) + (0 * 2 ^ 4) + (1 * 2 ^ 3) + (1 * 2 ^ 2) + (0 * 2 ^ 1) + (1 * 2 ^ 0)
            = 32 + 0 + 8 + 4 + 0 + 1
            = 45

     八进制        -->     十进制
     016  =   (0 * 8 ^ 2) + (1 * 8 ^ 1) + (6 * 8 ^ 0)
          =    0  + 8 + 6
          =    14

     十六进制      -->      十进制
     0x11f =  (1 * 16 ^ 2) + (1 * 16 ^ 1) + (15 * 16 ^ 0)
           =   256  + 16 + 15
           =   287
  ```

---

- 十进制快速转换为其它进制

  - 十进制除以`基数`取余, 倒叙读取

  ```c showLineNumbers
     十进制        -->     二进制
     100          -->    1100100
     100 / 2   = 50     0
     50  / 2   = 25     0
     25  / 2   = 12     1
     12  / 2   = 6      0
     6   / 2   = 3      0
     3   / 2   = 1      1
     1   / 2   = 0      1


     十进制        -->     八进制
     100          -->     144
     100 / 8    = 12    4
     12  / 8    = 1     4
     1   / 8    = 0     1

     十进制        -->     十六进制
     100          --> 64
     100 / 16   =  6    4
     6   / 16   =  0    6
  ```

---

## 十进制小数转换为二进制小数

- 整数部分,直接转换为二进制即可
- 小数部分,使用"乘 2 取整，顺序排列"
  - 用 2 乘十进制小数,可以得到积,将积的整数部分取出,再用 2 乘余下的小数部分,直到积中的小数部分为零，或者达到所要求的精度为止
  - 然后把取出的整数部分按顺序排列起来, 即是小数部分二进制
- 最后将整数部分的二进制和小数部分的二进制合并起来, 即是一个二进制小数
- 例如: 将 12.125 转换为二进制

```c showLineNumbers
// 整数部分(除2取余)
  12
/  2
------
   6    // 余0
/  2
------
   3    // 余0
/  2
------
   1   // 余1
/  2
------
  0   // 余1
//12 --> 1100

// 小数部分(乘2取整数积)
  0.125
*     2
  ------
   0.25  //0
   0.25
*     2
  ------
    0.5  //0
    0.5
*     2
  ------
    1.0  //1
    0.0
// 0.125 --> 0.001

// 12.8125 --> 1100.001
```

---

## 二进制小数转换为十进制小数

- 整数部分按照二进制转十进制即可
- 小数部分从最高位开始乘以 2 的负 n 次方, n 从 1 开始
- 例如: 将 1100.001 转换为十进制

```c showLineNumbers
// 整数部分(乘以2的n次方, n从0开始)
0 * 2^0 = 0
0 * 2^1 = 0
1 * 2^2 = 4
1 * 2^3 = 8
 // 1100 == 8 + 4 + 0 + 0 == 12

// 小数部分(乘以2的负n次方, n从0开始)
0 * (1/2) = 0
0 * (1/4) = 0
1 * (1/8) = 0.125
// .100 == 0 + 0 + 0.125 == 0.125

// 1100.001  --> 12.125
```

- 练习:
  - 将 0.8125 转换为二进制
  - 将 0.1101 转换为十进制

```c showLineNumbers
  0.8125
*      2
--------
   1.625  // 1
   0.625
*      2
--------
    1.25 // 1
    0.25
*      2
--------
     0.5 // 0
*      2
--------
    1.0 // 1
    0.0

// 0. 8125  --> 0.1101
1*(1/2) = 0.5
1*(1/4)=0.25
0*(1/8)=0
1*(1/16)=0.0625

//0.1101 --> 0.5 + 0.25 + 0 + 0.0625 == 0.8125
```

## 原码反码补码

- 计算机只能识别 0 和 1, 所以计算机中存储的数据都是以 0 和 1 的形式存储的

- 数据在计算机内部是以补码的形式储存的, 所有数据的运算都是以补码进行的

- 正数的原码、反码和补码

  - 正数的原码、反码和补码都是它的二进制
  - 例如: 12 的原码、反码和补码分别为
    - `0000 0000 0000 0000 0000 0000 0000 1100`
    - `0000 0000 0000 0000 0000 0000 0000 1100`
    - `0000 0000 0000 0000 0000 0000 0000 1100`

- 负数的原码、反码和补码

  - 二进制的最高位我们称之为符号位, 最高位是 0 代表是一个正数, 最高位是 1 代表是一个负数
  - 一个负数的原码, 是将该负数的二进制最高位变为 1
  - 一个负数的反码, 是将该数的原码`除了符号位`以外的其它位取反
  - 一个负数的补码, 就是它的反码 + 1
  - 例如: -12 的原码、反码和补码分别为

  ```c showLineNumbers
    0000 0000 0000 0000 0000 0000 0000 1100 // 12二进制
    1000 0000 0000 0000 0000 0000 0000 1100 // -12原码
    1111 1111 1111 1111 1111 1111 1111 0011  // -12反码
    1111 1111 1111 1111 1111 1111 1111 0100 // -12补码
  ```

- 负数的原码、反码和补码逆向转换

  - 反码 = 补码-1
  - 原码= 反码最高位不变, 其它位取反

  ```c showLineNumbers
    1111 1111 1111 1111 1111 1111 1111 0100 // -12补码
    1111 1111 1111 1111 1111 1111 1111 0011  // -12反码
    1000 0000 0000 0000 0000 0000 0000 1100 // -12原码
  ```

---

- 为什么要引入反码和补码

  - 在学习本节内容之前,大家必须明白一个东西, 就是计算机只能做加法运算, 不能做减法和乘除法, 所以的减法和乘除法内部都是用加法来实现的

    - 例如: 1 - 1, 内部其实就是 1 + (-1);
    - 例如: 3 \* 3, 内部其实就是 3 + 3 + 3;
    - 例如: 9 / 3, 内部其实就是 9 + (-3) + (-3) + (-3);

  - 首先我们先来观察一下,如果只有原码会存储什么问题

    - 很明显, 通过我们的观察, 如果只有原码, 1-1 的结果不对

    ```c showLineNumbers
      // 1 + 1
       0000 0000 0000 0000 0000 0000 0000 0001 // 1原码
      +0000 0000 0000 0000 0000 0000 0000 0001 // 1原码
       ---------------------------------------
       0000 0000 0000 0000 0000 0000 0000 0010  == 2

       // 1 - 1; 1 + (-1);
       0000 0000 0000 0000 0000 0000 0000 0001 // 1原码
      +1000 0000 0000 0000 0000 0000 0000 0001 // -1原码
       ---------------------------------------
       1000 0000 0000 0000 0000 0000 0000 0010 == -2
    ```

- - 正是因为对于减法来说,如果使用原码结果是不正确的, 所以才引入了反码
    - 通过反码计算减法的结果, 得到的也是一个反码;
    - 将计算的结果符号位不变其余位取反,就得到了计算结果的原码
    - 通过对原码的转换, 很明显我们计算的结果是-0, 符合我们的预期

  ```c showLineNumbers
    // 1 - 1; 1 + (-1);
    0000 0000 0000 0000 0000 0000 0000 0001 // 1反码
    1111 1111 1111 1111 1111 1111 1111 1110   // -1反码
    ---------------------------------------
    1111 1111 1111 1111 1111 1111 1111 1111 // 计算结果反码
    1000 0000 0000 0000 0000 0000 0000 0000 // 计算结果原码 == -0
  ```

- - 虽然反码能够满足我们的需求, 但是对于 0 来说, 前面的负号没有任何意义, 所以才引入了补码
    - 由于 int 只能存储 4 个字节, 也就是 32 位数据, 而计算的结果又 33 位, 所以最高位溢出了,符号位变成了 0, 所以最终得到的结果是 0

  ```c showLineNumbers
    // 1 - 1; 1 + (-1);
    0000 0000 0000 0000 0000 0000 0000 0001 // 1补码
    1111 1111 1111 1111 1111 1111 1111 1111   // -1补码
    ---------------------------------------
   10000 0000 0000 0000 0000 0000 0000 0000 // 计算结果补码
    0000 0000 0000 0000 0000 0000 0000 0000 //  == 0
  ```

## 位运算符

- 程序中的所有数据在计算机内存中都是以二进制的形式储存的。
- 位运算就是直接对整数在内存中的二进制位进行操作
- C 语言提供了 6 个位操作运算符, 这些运算符只能用于整型操作数

| 符号 | 名称     | 运算结果         |
| ---- | -------- | ---------------- |
| &    | 按位与   | 同 1 为 1        |
| \|   | 按位或   | 有 1 为 1        |
| ^    | 按位异或 | 不同为 1         |
| ~    | 按位取反 | 0 变 1,1 变 0    |
| `<<` | 按位左移 | 乘以 2 的 n 次方 |
| `>>` | 按位右移 | 除以 2 的 n 次方 |

---

- 按位与:
  - 只有对应的两个二进位均为 1 时，结果位才为 1，否则为 0
  - 规律: 二进制中，与 1 相&就保持原位，与 0 相&就为 0

```bash showLineNumbers
9&5 = 1

 1001
&0101
------
 0001
```

---

- 按位或:
  - 只要对应的二个二进位有一个为 1 时，结果位就为 1，否则为 0

```c showLineNumbers
9|5 = 13

 1001
|0101
------
 1101
```

---

- 按位异或
  - 当对应的二进位相异（不相同）时，结果为 1，否则为 0
  - 规律:
    - 相同整数相的结果是 0。比如 55=0
    - 多个整数相^的结果跟顺序无关。例如: 567=576
    - 同一个数异或另外一个数两次, 结果还是那个数。例如: 577 = 5

```c showLineNumbers
9^5 = 12

 1001
^0101
------
 1100
```

---

- 按位取反
  - 各二进位进行取反（0 变 1，1 变 0）

```c showLineNumbers
~9 =-10
0000 0000 0000 0000 0000 1001 // 取反前
1111 1111 1111 1111 1111 0110 // 取反后

// 根据负数补码得出结果
1111 1111 1111 1111 1111 0110 // 补码
1111 1111 1111 1111 1111 0101 // 反码
1000 0000 0000 0000 0000 1010 // 源码 == -10
```

---

- 位运算应用场景:

  - 判断奇偶(按位或)

  ```c showLineNumbers
     偶数: 的二进制是以0结尾
     8   -> 1000
     10  -> 1010

     奇数: 的二进制是以1结尾
     9   -> 1001
     11  -> 1011

     任何数和1进行&操作,得到这个数的最低位
     1000
    &0001
     -----
     0000  // 结果为0, 代表是偶数

     1011
    &0001
     -----
     0001 // 结果为1, 代表是奇数
  ```

  - 权限系统

  ```c showLineNumbers
    enum Unix {
      S_IRUSR = 256,// 100000000 用户可读
      S_IWUSR = 128,//  10000000 用户可写
      S_IXUSR = 64,//    1000000 用户可执行
      S_IRGRP = 32,//     100000 组可读
      S_IWGRP = 16,//      10000 组可写
      S_IXGRP = 8,//        1000 组可执行
      S_IROTH = 4,//         100 其它可读
      S_IWOTH = 2,//          10 其它可写
      S_IXOTH = 1 //           1 其它可执行
     };
  // 假设设置用户权限为可读可写
  printf("%d\n", S_IRUSR | S_IWUSR); // 384 // 110000000
  ```

  - 交换两个数的值(按位异或)

  ```c showLineNumbers
   a = a^b;
   b = b^a;
   a = a^b;
  ```

---

- 按位左移
  - 把整数 a 的各二进位全部左移 n 位，高位丢弃，低位补 0
    - 由于左移是丢弃最高位，0 补最低位，所以符号位也会被丢弃，左移出来的结果值可能会改变正负性
  - 规律: 左移 n 位其实就是乘以 2 的 n 次方

```c showLineNumbers
2<<1; //相当于 2 *= 2 // 4
  0010
<<0100

2<<2; //相当于 2 *= 2^2; // 8
  0010
<<1000
```

- 按位右移
  - 把整数 a 的各二进位全部右移 n 位，保持符号位不变
    - 为正数时， 符号位为 0，最高位补 0
    - 为负数时，符号位为 1，最高位是补 0 或是补 1(取决于编译系统的规定)
  - 规律: 快速计算一个数除以 2 的 n 次方

```c showLineNumbers
2>>1; //相当于 2 /= 2 // 1
  0010
>>0001
4>>2; //相当于 4 /= 2^2 // 1
  0100
>>0001
```

- 练习:
  - 写一个函数把一个 10 进制数按照二进制格式输出

```c showLineNumbers
#include <stdio.h>
void printBinary(int num);
int main(int argc, const char * argv[]) {
    printBinary(13);
}
void printBinary(int num){
    int len = sizeof(int)*8;
    int temp;
    for (int i=0; i<len; i++) {
        temp = num; //每次都在原数的基础上进行移位运算
        temp = temp>>(31-i); //每次移动的位数
        int t = temp&1; //取出最后一位
        if(i!=0&&i%4==0)printf(" "); printf("%d",t);
    }
}
```

## 变量内存分析

- 内存模型

* 内存模型是线性的(有序的)
* 对于 32 机而言，最大的内存地址是 2^32 次方 bit(4294967296)(4GB)
* 对于 64 机而言，最大的内存地址是 2^64 次方 bit(18446744073709552000)(171 亿 GB)

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c15e330e2723191671e55b27cd9e4f1c.png)

- CPU 读写内存

  - CPU 在运作时要明确三件事

  * 存储单元的地址（地址信息）
  * 器件的选择，读 or 写 （控制信息）
  * 读写的数据 （数据信息）

- 如何明确这三件事情

  - 通过地址总线找到存储单元的地址
  - 通过控制总线发送内存读写指令
  - 通过数据总线传输需要读写的数据

> - 地址总线: 地址总线宽度决定了 CPU 可以访问的物理地址空间(寻址能力)
>   - 例如: 地址总线的宽度是 1 位, 那么表示可以访问 0 和 1 的内存
>   - 例如: 地址总线的位数是 2 位, 那么表示可以访问 00、01、10、11 的内存
> - 数据总线: 数据总线的位数决定 CPU 单次通信能交换的信息数量
>   - 例如: 数据总线:的宽度是 1 位, 那么一次可以传输 1 位二进制数据
>   - 例如: 地址总线的位数是 2 位,那么一次可以传输 2 位二进制数据
> - 控制总线: 用来传送各种控制信号

- 写入流程

  - CPU 通过地址线将找到地址为 FFFFFFFB 的内存
  - CPU 通过控制线发出内存写入命令，选中存储器芯片，并通知它，要其写入数据。
  - CPU 通过数据线将数据 8 送入内存 FFFFFFFB 单元中
    ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/ed76e9a4a2ce06d0a3cd20192956f863.png)

- 读取流程

* CPU 通过地址线将找到地址为 FFFFFFFB 的内存
* CPU 通过控制线发出内存读取命令，选中存储器芯片，并通知它，将要从中读取数据
* 存储器将 FFFFFFFB 号单元中的数据 8 通过数据线送入 CPU 寄存器中
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/2fb17f543aa500524932669a322cd57a.png)

- 变量的存储原则

* 先分配字节地址大内存,然后分配字节地址小的内存(内存寻址是由大到小)

* 变量的首地址,是变量所占存储空间字节地址(最小的那个地址 )

* 低位保存在低地址字节上,高位保存在高地址字节上

  ```c showLineNumbers
  10的二进制: 0b00000000 00000000 00000000 00001010
             高字节←                        →低字节
  ```

## char 类型内存存储细节

- char 类型基本概念

* char 是 C 语言中比较灵活的一种数据类型，称为“字符型”
* char 类型变量占 1 个字节存储空间，共 8 位
* 除单个字符以外, C 语言的的转义字符也可以利用 char 类型存储

| 字符 | 意义                              |
| ---- | --------------------------------- |
| \b   | 退格(BS)当前位置向后回退一个字符  |
| \r   | 回车(CR),将当前位置移至本行开头   |
| \n   | 换行(LF),将当前位置移至下一行开头 |
| \t   | 水平制表(HT),跳到下一个 TAB 位置  |
| \\0  | 用于表示字符串的结束标记          |
| `\`  | 代表一个反斜线字符 \\             |
| \\"  | 代表一个双引号字符"               |
| \\'  | 代表一个单引号字符'               |

- char 型数据存储原理

* 计算机只能识别 0 和 1, 所以 char 类型存储数据并不是存储一个字符, 而是将字符转换为 0 和 1 之后再存储
* 正是因为存储字符类型时需要将字符转换为 0 和 1, 所以为了统一, 老美就定义了一个叫做 ASCII 表的东东
* ASCII 表中定义了每一个字符对应的整数
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/b519ba9d45ab584c43c991777d8e978a.png)

```c showLineNumbers
    char ch1 = 'a';     printf("%i\n", ch1); // 97    char ch2 = 97;    printf("%c\n", ch2); // a
```

- char 类型注意点

* char 类型占一个字节, 一个中文字符占 3 字节(unicode 表),所有 char 不可以存储中文

  ```c showLineNumbers
  char c = '我'; // 错误写法
  ```

* 除转义字符以外, 不支持多个字符

  ```c showLineNumbers
  char ch = 'ab'; // 错误写法
  ```

* char 类型存储字符时会先查找对应的 ASCII 码值, 存储的是 ASCII 值, 所以字符 6 和数字 6 存储的内容不同

  ```c showLineNumbers
  char ch1 = '6'; // 存储的是ASCII码 64char ch2 = 6; //  存储的是数字 6
  ```

- 练习

* 定义一个函数, 实现输入一个小写字母,要求转换成大写输出

## 类型说明符

- 类型说明符基本概念

* C 语言提供了**说明长度**和**说明符号位**的两种类型说明符, 这两种类型说明符一共有 4 个：
* short 短整型 (说明长度)
* long 长整型 (说明长度)
* signed 有符号型 (说明符号位)
* unsigned 无符号型 (说明符号位)

- 这些说明符一般都是用来修饰 int 类型的，所以在使用时可以省略 int
- 这些说明符都属于 C 语言关键字

---

## short 和 long

- short 和 long 可以提供不同长度的整型数，也就是可以改变整型数的取值范围。

* 在 64bit 编译器环境下，int 占用 4 个字节（32bit），取值范围是-2^31 ~ 2^31-1；
* short 占用 2 个字节（16bit），取值范围是-2^15 ~ 2^15-1；
* long 占用 8 个字节（64bit），取值范围是-2^63 ~ 2^63-1

- 总结一下：在 64 位编译器环境下:

* short 占 2 个字节(16 位)
* int 占 4 个字节(32 位)
* long 占 8 个字节(64 位)。
* 因此，如果使用的整数不是很大的话，可以使用 short 代替 int，这样的话，更节省内存开销。

- 世界上的编译器林林总总，不同编译器环境下，int、short、long 的取值范围和占用的长度又是不一样的。比如在 16bit 编译器环境下，long 只占用 4 个字节。不过幸运的是，ANSI \ ISO 制定了以下规则：

* short 跟 int 至少为 16 位(2 字节)
* long 至少为 32 位(4 字节)
* **short 的长度不能大于 int，int 的长度不能大于 long**
* **char 一定为为 8 位(1 字节)，毕竟 char 是我们编程能用的最小数据类型**

- 可以连续使用 2 个 long，也就是 long long。一般来说，long long 的范围是不小于 long 的，比如在 32bit 编译器环境下，long long 占用 8 个字节，long 占用 4 个字节。不过在 64bit 编译器环境下，long long 跟 long 是一样的，都占用 8 个字节。

```c showLineNumbers
#include <stdio.h>

int main()
{
    // char占1个字节, char的取值范围 -2^7~2^7
    char num = 129;
    printf("size = %i\n", sizeof(num)); // 1
    printf("num = %i\n", num); // -127
    // short int 占2个字节, short int的取值范围 -2^15~2^15-1
    short int num1 = 32769;// -32767
    printf("size = %i\n", sizeof(num1)); // 2
    printf("num1 = %hi\n", num1);

    // int占4个字节, int的取值范围 -2^31~2^31-1
    int num2 = 12345678901;
    printf("size = %i\n", sizeof(num2)); // 4
    printf("num2 = %i\n", num2);

    // long在32位占4个字节, 在64位占8个字节
    long int num3 = 12345678901;
    printf("size = %i\n", sizeof(num3)); // 4或8
    printf("num3 = %ld\n", num3);

    // long在32位占8个字节, 在64位占8个字节 -2^63~2^63-1
    long long int num4 = 12345678901;
    printf("size = %i\n", sizeof(num4)); // 8
    printf("num4 = %lld\n", num4);

    // 由于short/long/long long一般都是用于修饰int, 所以int可以省略
    short num5 = 123;
    printf("num5 = %lld\n", num5);
    long num6 = 123;
    printf("num6 = %lld\n", num6);
    long long num7 = 123;
    printf("num7 = %lld\n", num7);
    return 0;
}
```

---

## signed 和 unsigned

- 首先要明确的：signed int 等价于 signed，unsigned int 等价于 unsigned
- signed 和 unsigned 的区别就是它们的最高位是否要当做符号位，并不会像 short 和 long 那样改变数据的长度，即所占的字节数。

* signed：表示有符号，也就是说最高位要当做符号位。但是 int 的最高位本来就是符号位，因此 signed 和 int 是一样的，signed 等价于 signed int，也等价于 int。signed 的取值范围是-2^31 ~ 2^31 - 1
* unsigned：表示无符号，也就是说最高位并不当做符号位，所以不包括负数。
* 因此 unsigned 的取值范围是：0000 0000 0000 0000 0000 0000 0000 0000 ~ 1111 1111 1111 1111 1111 1111 1111 1111，也就是 0 ~ 2^32 - 1

```c showLineNumbers
#include <stdio.h>

int main()
{
    // 1.默认情况下所有类型都是由符号的
    int num1 = 9;
    int num2 = -9;
    int num3 = 0;
    printf("num1 = %i\n", num1);
    printf("num2 = %i\n", num2);
    printf("num3 = %i\n", num3);

    // 2.signed用于明确说明, 当前保存的数据可以是有符号的, 一般情况下很少使用
    signed int num4 = 9;
    signed int num5 = -9;
    signed int num6 = 0;
    printf("num4 = %i\n", num4);
    printf("num5 = %i\n", num5);
    printf("num6 = %i\n", num6);

    // signed也可以省略数据类型, 但是不推荐这样编写
    signed num7 = 9;
    printf("num7 = %i\n", num7);


    // 3.unsigned用于明确说明, 当前不能保存有符号的值, 只能保存0和正数
    // 应用场景: 保存银行存款,学生分数等不能是负数的情况
    unsigned int num8 = -9;
    unsigned int num9 = 0;
    unsigned int num10 = 9;
    // 注意: 不看怎么存只看怎么取
    printf("num8 = %u\n", num8);
    printf("num9 = %u\n", num9);
    printf("num10 = %u\n", num10);
    return 0;
}
```

- 注意点:

* 修饰符号的说明符可以和修饰长度的说明符混合使用
* 相同类型的说明符不能混合使用

```c showLineNumbers
  signed short int num1 = 666;
  signed unsigned int num2 = 666; // 报错
```

开源不易，码字不易，如果觉得有价值，欢迎分享支持。

## 数组的基本概念

- 数组，从字面上看，就是一组数据的意思，没错，数组就是用来存储一组数据的
  - 在 C 语言中,数组属于**构造数据类型**
- 数组的几个名词
  - 数组:一组`相同数据类型`数据的`有序`的集合
  - 数组元素: 构成数组的每一个数据。
  - 数组的下标: 数组元素位置的索引(从 0 开始)
- 数组的应用场景
  - 一个 int 类型的变量能保存一个人的年龄，如果想保存整个班的年龄呢？
    - 第一种方法是定义很多个 int 类型的变量来存储
    - 第二种方法是只需要定义一个 int 类型的数组来存储

```c showLineNumbers
#include <stdio.h>

int main(int argc, const char * argv[]) {
    /*
    // 需求: 保存2个人的分数
    int score1 = 99;
    int score2 = 60;

    // 需求: 保存全班同学的分数(130人)
    int score3 = 78;
    int score4 = 68;
    ...
    int score130 = 88;
    */
    // 数组: 如果需要保存`一组``相同类型`的数据, 就可以定义一个数组来保存
    // 只要定义好一个数组, 数组内部会给每一块小的存储空间一个编号, 这个编号我们称之为 索引, 索引从0开始
    // 1.定义一个可以保存3个int类型的数组
    int scores[3];

    // 2.通过数组的下标往数组中存放数据
    scores[0] = 998;
    scores[1] = 123;
    scores[2] = 567;

    // 3.通过数组的下标从数组中取出存放的数据
    printf("%i\n", scores[0]);
    printf("%i\n", scores[1]);
    printf("%i\n", scores[2]);
    return 0;
}
```

---

## 定义数组

- 元素类型 数组名[元素个数];

```c showLineNumbers
// int 元素类型
// ages 数组名称
// [10] 元素个数
int ages[10];
```

---

## 初始化数组

- **定义的同时初始化**
- 指定元素个数,完全初始化
  - 其中在{ }中的各数据值即为各元素的初值,各值之间用逗号间隔

```c showLineNumbers
int ages[3] = {4, 6, 9};
```

- 不指定元素个数,完全初始化
  - 根据大括号中的元素的个数来确定数组的元素个数

```c showLineNumbers
int nums[] = {1,2,3,5,6};
```

- 指定元素个数,部分初始化
  - 没有显式初始化的元素,那么系统会自动将其初始化为 0

```c showLineNumbers
int nums[10] = {1,2};
```

- 指定元素个数,部分初始化

```c showLineNumbers
int nums[5] = {[4] = 3,[1] = 2};
```

- 不指定元素个数,部分初始化

```c showLineNumbers
int nums[] = {[4] = 3};
```

- **先定义后初始化**

```c showLineNumbers
int nums[3];
nums[0] = 1;
nums[1] = 2;
nums[2] = 3;
```

- 没有初始化会怎样?
  - 如果定义数组后,没有初始化,数组中是有值的,是随机的垃圾数,所以如果想要正确使用数组应该要进行初始化。

```c showLineNumbers
int nums[5];
printf("%d\n", nums[0]);
printf("%d\n", nums[1]);
printf("%d\n", nums[2]);
printf("%d\n", nums[3]);
printf("%d\n", nums[4]);
输出结果:
0
0
1606416312
0
1606416414
```

- 注意点:

- 使用数组时不能超出数组的索引范围使用, 索引从 0 开始, 到元素个数-1 结束
- 使用数组时不要随意使用未初始化的元素, 有可能是一个随机值
- 对于数组来说, 只能在定义的同时初始化多个值, 不能先定义再初始化多个值

```c showLineNumbers
int ages[3];
ages = {4, 6, 9}; // 报错
```

---

## 数组的使用

- 通过下标（索引）访问：

```c showLineNumbers
// 找到下标为0的元素, 赋值为10
ages[0]=10;
// 取出下标为2的元素保存的值
int a = ages[2];
printf("a = %d", a);
```

---

## 数组的遍历

- 数组的遍历:遍历的意思就是有序地查看数组的每一个元素

```c showLineNumbers
    int ages[4] = {19, 22, 33, 13};
    for (int i = 0; i < 4; i++) {
        printf("ages[%d] = %d\n", i, ages[i]);
    }
```

---

## 数组长度计算方法

- 因为数组在内存中占用的字节数取决于其存储的数据类型和数据的个数
  - 数组所占用存储空间 = 一个元素所占用存储空间 \* 元素个数(数组长度)
- 所以计算数组长度可以使用如下方法
  数组的长度 = 数组占用的总字节数 / 数组元素占用的字节数

```c showLineNumbers
    int ages[4] = {19, 22, 33, 13};
    int length =  sizeof(ages)/sizeof(int);
    printf("length = %d", length);
输出结果: 4
```

---

## 练习

- 正序输出(遍历)数组

```c showLineNumbers
    int ages[4] = {19, 22, 33, 13};
    for (int i = 0; i < 4; i++) {
        printf("ages[%d] = %d\n", i, ages[i]);
    }
```

- 逆序输出(遍历)数组

```c showLineNumbers
    int ages[4] = {19, 22, 33, 13};
    for (int i = 3; i >=0; i--) {
        printf("ages[%d] = %d\n", i, ages[i]);
    }
```

- 从键盘输入数组长度,构建一个数组,然后再通过 for 循环从键 盘接收数字给数组初始化。并使用 for 循环输出查看

开源不易，码字不易，如果觉得有价值，欢迎分享支持。

## 数组内部存储细节

- 存储方式:

* 1)内存寻址从大到小, 从高地址开辟一块连续没有被使用的内存给数组
* 2)从分配的连续存储空间中, 地址小的位置开始给每个元素分配空间
* 3)从每个元素分配的存储空间中, 地址最大的位置开始存储数据
* 4)用数组名指向整个存储空间最小的地址

- 示例

```c showLineNumbers
#include <stdio.h>
int main()
{
    int num = 9;
    char cs[] = {'l','n','j'};
    printf("cs = %p\n", &cs);       // cs = 0060FEA9
    printf("cs[0] = %p\n", &cs[0]); // cs[0] = 0060FEA9
    printf("cs[1] = %p\n", &cs[1]); // cs[1] = 0060FEAA
    printf("cs[2] = %p\n", &cs[2]); // cs[2] = 0060FEAB

    int nums[] = {2, 6};
    printf("nums = %p\n", &nums);      // nums = 0060FEA0
    printf("nums[0] = %p\n", &nums[0]);// nums[0] = 0060FEA0
    printf("nums[1] = %p\n", &nums[1]);// nums[1] = 0060FEA4

    return 0;
}
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e0aa63f597f92632c90cd1c5f6adc292.png)

> - 注意:字符在内存中是以对应 ASCII 码值的二进制形式存储的,而非上述的形式。

## 数组的越界问题

- 数组越界导致的问题

* 约错对象
* 程序崩溃

```c showLineNumbers
    char cs1[2] = {1, 2};
    char cs2[3] = {3, 4, 5};
    cs2[3] = 88; // 注意:这句访问到了不属于cs1的内存
    printf("cs1[0] = %d\n", cs1[0] );
    输出结果: 88
```

> 为什么上述会输出 88, 自己按照"数组内部存储细节"画图脑补

---

## 数组注意事项

- 在定义数组的时候[]里面只能写整型常量或者是返回整型常量的表达式

```c showLineNumbers
 int ages4['A'] = {19, 22, 33};
 printf("ages4[0] = %d\n", ages4[0]);

  int ages5[5 + 5] = {19, 22, 33};
  printf("ages5[0] = %d\n", ages5[0]);

  int ages5['A' + 5] = {19, 22, 33};
  printf("ages5[0] = %d\n", ages5[0]);
```

- 错误写法

```c showLineNumbers
// 没有指定元素个数，错误
int a[];

// []中不能放变量
int number = 10;
int ages[number]; // 老版本的C语言规范不支持
printf("%d\n", ages[4]);

int number = 10;
int ages2[number] = {19, 22, 33} // 直接报错

// 只能在定义数组的时候进行一次性（全部赋值）的初始化
int ages3[5];
ages10 = {19, 22, 33};

// 一个长度为n的数组,最大下标为n-1, 下标范围:0~n-1
int ages4[4] = {19, 22, 33}
ages4[8]; // 数组角标越界
```

- 练习

* 从键盘录入当天出售 BTC 的价格并计算出售的 BTC 的总价和平均价(比如说一天出售了 10 个比特币)

## 数组和函数

- 数组可以作为函数的参数使用,数组用作函数参数有两种形式:
  - ￼ 一种是把数组元素作为实参使用
  - ￼ 一种是把数组名作为函数的形参和实参使用

---

## 数组元素作为函数参数

- 数组的元素作为函数实参，与同类型的简单变量作为实参一样，如果是基本数据类型, 那么形参的改变不影响实参

```c showLineNumbers
void change(int val)// int val = number
{
    val = 55;
}
int main(int argc, const char * argv[])
{
    int ages[3] = {1, 5, 8};
    printf("ages[0] = %d", ages[0]);// 1
    change(ages[0]);
    printf("ages[0] = %d", ages[0]);// 1
}
```

> - 用数组元素作函数参数不要求形参也必须是数组元素

---

## 数组名作为函数参数

- 在 C 语言中,数组名除作为变量的标识符之外,数组名还代表了该数组在内存中的起始地址,因此,当数组名作函数参数时,实参与形参之间不是"值传递",而是"地址传递"
- 实参数组名将该数组的起始地址传递给形参数组,两个数组共享一段内存单元, 系统不再为形参数组分配存储单元
- 既然两个数组共享一段内存单元, 所以形参数组修改时，实参数组也同时被修改了

```c showLineNumbers
void change2(int array[3])// int array = 0ffd1
{
    array[0] = 88;
}
int main(int argc, const char * argv[])
{
    int ages[3] = {1, 5, 8};
    printf("ages[0] = %d", ages[0]);// 1
    change(ages);
    printf("ages[0] = %d", ages[0]);// 88
}
```

---

## 数组名作函数参数的注意点

- 在函数形参表中,允许不给出形参数组的长度

```c showLineNumbers
void change(int array[])
{
    array[0] = 88;
}
```

- 形参数组和实参数组的类型必须一致,否则将引起错误。

```c showLineNumbers
void prtArray(double array[3]) // 错误写法
{
    for (int i = 0; i < 3; i++) {
        printf("array[%d], %f", i, array[i]);
    }
}
int main(int argc, const char * argv[])
{
    int ages[3] = {1, 5, 8};
    prtArray(ages[0]);
}
```

- 当数组名作为函数参数时, 因为自动转换为了指针类型，所以在函数中无法动态计算除数组的元素个数

```c showLineNumbers
void printArray(int array[])
{
    printf("printArray size = %lu\n", sizeof(array)); // 8
    int length = sizeof(array)/ sizeof(int); // 2
    printf("length = %d", length);
}
```

- 练习:
  - 设计一个函数 int arrayMax(int a[], int count)找出数组元素的最大值
  - 从键盘输入 3 个 0-9 的数字,然后输出 0~9 中哪些数字没有出现过
  - 要求从键盘输入 6 个 0~9 的数字,排序后输出
