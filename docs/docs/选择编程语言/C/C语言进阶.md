---
sidebar_position: 4
title: C语言进阶
---

## 计数排序（Counting Sort）

- 计数排序是一个非基于比较的排序算法，该算法于 1954 年由 Harold H. Seward 提出。它的优势在于在`对一定范围内的整数排序`时，快于任何比较排序算法。
- 排序思路:

* 1.找出待排序数组最大值
* 2.定义一个索引最大值为待排序数组最大值的数组
* 3.遍历待排序数组, 将待排序数组遍历到的值作新数组索引
* 4.在新数组对应索引存储值原有基础上+1
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/eaed8e0890b2a50353ec24850941e789.png)

- 简单代码实现:

```c showLineNumbers
int main()
{
    // 待排序数组
    int nums[5] = {3, 1, 2, 0, 3};
    // 用于排序数组
    int newNums[4] = {0};
    // 计算待排序数组长度
    int len = sizeof(nums) / sizeof(nums[0]);
    // 遍历待排序数组
    for(int i = 0; i < len; i++){
        // 取出待排序数组当前值
        int index = nums[i];
        // 将待排序数组当前值作为排序数组索引
        // 将用于排序数组对应索引原有值+1
        newNums[index] = newNums[index] +1;
    }

    // 计算待排序数组长度
    int len2 = sizeof(newNums) / sizeof(newNums[0]);
    // 输出排序数组索引, 就是排序之后结果
    for(int i = 0; i < len2; i++){
        for(int j = 0; j < newNums[i]; j++){
            printf("%i\n", i);
        }
    }
    /*
    // 计算待排序数组长度
    int len2 = sizeof(newNums) / sizeof(newNums[0]);
    // 还原排序结果到待排序数组
    for(int i = 0; i < len2; i++){
        int index = 0;
        for(int i = 0; i < len; i++){
            for(int j = 0; j < newNums[i]; j++){
                nums[index++] = i;
            }
        }
    }
    */
    return 0;
}
```

## 选择排序

- 选择排序(Selection sort)是一种简单直观的排序算法。它的工作原理如下。首先在未排序序列中找到最小元素,存放到排序序列的起始位置,然后,再从剩余未排序元素中继续寻找最小元素,然后放到排序序列末尾。以此类推,直到所有元素均排序完毕。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/fe7b9e4e887e90b496fa9351b91f569c.gif)
- 排序思路:

* 假设按照升序排序
* 1.用第 0 个元素和后面所有元素依次比较
* 2.判断第 0 个元素是否大于当前被比较元素, 一旦小于就交换位置
* 3.第 0 个元素和后续所有元素比较完成后, 第 0 个元素就是最小值
* 4.排除第 0 个元素, 用第 1 个元素重复 1~3 操作, 比较完成后第 1 个元素就是倒数第二小的值
* 以此类推, 直到当前元素没有可比较的元素, 排序完成

- 代码实现:

```c showLineNumbers
// 选择排序
void selectSort(int numbers[], int length) {

    // 外循环为什么要-1?
    // 最后一位不用比较, 也没有下一位和它比较, 否则会出现错误访问
    for (int i = 0; i < length; i++) {
        for (int j = i; j < length - 1; j++) {
            // 1.用当前元素和后续所有元素比较
            if (numbers[i] < numbers[j + 1]) {
                //  2.一旦发现小于就交换位置
                swapEle(numbers, i, j + 1);
            }
        }
    }
}
// 交换两个元素的值, i/j需要交换的索引
void swapEle(int array[], int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

```

## 冒泡排序

- 冒泡排序(Bubble Sort)是一种简单的排序算法。它重复 地走访过要排序的数列,一次比较两个元素,如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换,也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/020ed41347b2d78bde3cfa328867ccdb.gif)
- 排序思路:

* 假设按照升序排序
* 1.从第 0 个元素开始, 每次都用相邻两个元素进行比较
* 2.一旦发现后面一个元素小于前面一个元素就交换位置
* 3.经过一轮比较之后最后一个元素就是最大值
* 4.排除最后一个元素, 以此类推, 每次比较完成之后最大值都会出现再被比较所有元素的最后
* 直到当前元素没有可比较的元素, 排序完成

- 代码实现:

```c showLineNumbers
// 冒泡排序
void bubbleSort(int numbers[], int length) {
    for (int i = 0; i < length; i++) {
        // -1防止`角标越界`: 访问到了不属于自己的索引
        for (int j = 0; j < length - i - 1; j++) {
           //  1.用当前元素和相邻元素比较
            if (numbers[j] < numbers[j + 1]) {
                //  2.一旦发现小于就交换位置
                swapEle(numbers, j, j + 1);
            }
        }
    }
}
// 交换两个元素的值, i/j需要交换的索引
void swapEle(int array[], int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
```

## 插入排序

- 插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/dcade1832cecd2072bd6d7e4b515ec2e.gif)
- 排序思路:

* 假设按照升序排序
* 1.从索引为 1 的元素开始向前比较, 一旦前面一个元素大于自己就让前面的元素先后移动
* 2.直到没有可比较元素或者前面的元素小于自己的时候, 就将自己插入到当前空出来的位置

- 代码实现:

```c showLineNumbers
int main()
{
    // 待排序数组
    int nums[5] = {3, 1, 2, 0, 3};
    // 0.计算待排序数组长度
    int len = sizeof(nums) / sizeof(nums[0]);

    //  1.从第一个元素开始依次取出所有用于比较元素
    for (int i = 1; i < len; i++)
    {
        // 2.取出用于比较元素
        int temp = nums[i];
        int j = i;
        while(j > 0){
            // 3.判断元素是否小于前一个元素
            if(temp < nums[j - 1]){
                // 4.让前一个元素向后移动一位
                nums[j] = nums[j - 1];
            }else{
                break;
            }
            j--;
        }
        // 5.将元素插入到空出来的位置
        nums[j] = temp;
    }
}
```

```c showLineNumbers
int main()
{
    // 待排序数组
    int nums[5] = {3, 1, 2, 0, 3};
    // 0.计算待排序数组长度
    int len = sizeof(nums) / sizeof(nums[0]);

    //  1.从第一个元素开始依次取出所有用于比较元素
    for (int i = 1; i < len; i++)
    {
        // 2.遍历取出前面元素进行比较
        for(int j = i; j > 0; j--)
        {
            // 3.如果前面一个元素大于当前元素,就交换位置
            if(nums[j-1] > nums[j]){
                int temp = nums[j];
                nums[j] = nums[j - 1];
                nums[j - 1] = temp;
            }else{
                break;
            }
        }
    }
}
```

## 希尔排序

- 1959 年 Shell 发明，第一个突破 O(n2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/385a1371f2859fbd2943203730eb3ba1.gif)
- 排序思路:

* 1.希尔排序可以理解为插入排序的升级版, 先将待排序数组按照指定步长划分为几个小数组
* 2.利用插入排序对小数组进行排序, 然后将几个排序的小数组重新合并为原始数组
* 3.重复上述操作, 直到步长为 1 时,再利用插入排序排序即可

- 代码实现:

```c showLineNumbers
int main()
{
    // 待排序数组
    int nums[5] = {3, 1, 2, 0, 3};
    // 0.计算待排序数组长度
    int len = sizeof(nums) / sizeof(nums[0]);

// 2.计算步长
    int gap = len / 2;
    do{
        //  1.从第一个元素开始依次取出所有用于比较元素
        for (int i = gap; i < len; i++)
        {
            // 2.遍历取出前面元素进行比较
            int j = i;
            while((j - gap) >= 0)
            {
                printf("%i > %i\n", nums[j - gap], nums[j]);
                // 3.如果前面一个元素大于当前元素,就交换位置
                if(nums[j - gap] > nums[j]){
                    int temp = nums[j];
                    nums[j] = nums[j - gap];
                    nums[j - gap] = temp;
                }else{
                    break;
                }
                j--;
            }
        }
        // 每个小数组排序完成, 重新计算步长
        gap = gap / 2;
    }while(gap >= 1);
}
```

## 折半查找

- **基本思路**
- 在有序表中,取中间元素作为比较对象,若给定值与中间元素的要查找的数相等,则查找成功;若给定值小于中间元素的要查找的数,则在中间元素的左半区继续查找;
- 若给定值大于中间元素的要查找的数,则在中间元素的右半区继续查找。不断重复上述查找过 程,直到查找成功,或所查找的区域无数据元素,查找失败

---

- **实现步骤**
- 在有序表中,取中间元素作为比较对象,若给定值与中间元素的要查找的数相等,则查找成功;
- 若给定值小于中间元素的要查找的数,则在中间元素的左半区继续查找;
- 若给定值大于中间元素的要查找的数,则在中间元素的右半区继续查找。
- 不断重复上述查找过 程,直到查找成功,或所查找的区域无数据元素,查找失败。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/b394e0af450fe9756414a64877b3b0f3.png)

- **代码实现**

```c showLineNumbers
int findKey(int values[], int length, int key) {
    // 定义一个变量记录最小索引
    int min = 0;
    // 定义一个变量记录最大索引
    int max = length - 1;
    // 定义一个变量记录中间索引
    int mid = (min + max) * 0.5;

    while (min <= max) {
        // 如果mid对应的值 大于 key, 那么max要变小
        if (values[mid] > key) {
            max = mid - 1;
            // 如果mid对应的值 小于 key, 那么min要变
        }else if (values[mid] < key) {
            min = mid + 1;
        }else {
            return mid;
        }
        // 修改完min/max之后, 重新计算mid的值
        mid = (min + max) * 0.5;
    }
    return -1;
}
```

## 进制转换(查表法)

- 实现思路:

* 将二进制、八进制、十进制、十六进制所有可能的字符都存入数组
* 利用按位与运算符和右移依次取出当前进制对应位置的值
* 利用取出的值到数组中查询当前位输出的结果
* 将查询的结果存入一个新的数组, 当所有位都查询存储完毕, 新数组中的值就是对应进制的值

- 代码实现

```c showLineNumbers
#include <stdio.h>
void toBinary(int num)
{
    total(num, 1, 1);
}
void toOct(int num)
{
    total(num, 7, 3);
}
void toHex(int num)
{
    total(num, 15, 4);
}

void total(int num , int base, int offset)
{
    //    1.定义表用于查询结果
    char cs[] = {
        '0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9', 'a', 'b',
        'c', 'd', 'e', 'f'
    };
    //    2.定义保存结果的数组
    char rs[32];
    //    计算最大的角标位置
    int length = sizeof(rs)/sizeof(char);
    int pos = length;//8

    while (num != 0) {
        int index = num & base;
        rs[--pos] = cs[index];
        num = num >> offset;
    }

    for (int i = pos; i < length; i++) {
        printf("%c", rs[i]);
    }
    printf("\n");
}
int main()
{
    toBinary(9);
    return 0;
}
```

## 二维数组

- 所谓二维数组就是一个一维数组的每个元素又被声明为一 维数组,从而构成二维数组. 可以说二维数组是特殊的一维数组。
- 示例:

```c showLineNumbers
int a[2][3] = { {80,75,92}, {61,65,71}};
```

- 可以看作由一维数组 a[0]和一维数组 a[1]组成，这两个一维数组都包含了 3 个 int 类型的元素
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c716d53c6b228ea211a524645a5d13a5.png)

## 二维数组的定义

- 格式:

* 数据类型 数组名[一维数组的个数][一维数组的元素个数]
* 其中"一维数组的个数"表示当前二维数组中包含多少个一维数组
* 其中"一维数组的元素个数"表示当前前二维数组中每个一维数组元素的个数

---

## 二维数组的初始化

- 二维数的初始化可分为两种:

* 定义的同时初始化
* 先定义后初始化

- 定义的同时初始化

```c showLineNumbers
int a[2][3]={ {80,75,92}, {61,65,71}};
```

- 先定义后初始化

```c showLineNumbers
int a[2][3];
a[0][0] = 80;
a[0][1] = 75;
a[0][2] = 92;
a[1][0] = 61;
a[1][1] = 65;
a[1][2] = 71;
```

- 按行分段赋值

```c showLineNumbers
int a[2][3]={ {80,75,92}, {61,65,71}};
```

- 按行连续赋值

```c showLineNumbers
int a[2][3]={ 80,75,92,61,65,71};
```

- 其它写法

* 完全初始化,可以省略第一维的长度

```c showLineNumbers
int a[][3]={{1,2,3},{4,5,6}};int a[][3]={1,2,3,4,5,6};
```

- 部分初始化,可以省略第一维的长度

```c showLineNumbers
int a[][3]={{1},{4,5}};int a[][3]={1,2,3,4};
```

> - 注意: 有些人可能想不明白，为什么可以省略行数，但不可以省略列数。也有人可能会问，可不可以只指定行数，但是省略列数？其实这个问题很简单，如果我们这样写：
>   int a[2][] = {1, 2, 3, 4, 5, 6}; // 错误写法
>   大家都知道，二维数组会先存放第 1 行的元素，由于不确定列数，也就是不确定第 1 行要存放多少个元素，所以这里会产生很多种情况，可能 1、2 是属于第 1 行的，也可能 1、2、3、4 是第一行的，甚至 1、2、3、4、5、6 全部都是属于第 1 行的

- 指定元素的初始化

```c showLineNumbers
int a[2][3]={[1][2]=10};int a[2][3]={[1]={1,2,3}}
```

## 二维数组的应用场景

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/f351a6ed231c8a1a5e6379da6816fd1c.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/dd8a18bdb49031d24c98bc311e80ab78.png)
![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/dee64b6cb0f5c043402880d0062d2393.png)

## 二维数组的遍历和存储

## 二维数组的遍历

- 二维数组 a[3][4],可分解为三个一维数组,其数组名分别为:

* 这三个一维数组都有 4 个元素,例如:一维数组 a[0]的 元素为 a[0][0],a[0][1],a[0][2],a[0][3]。
* 所以遍历二维数组无非就是先取出二维数组中得一维数组, 然后再从一维数组中取出每个元素的值

- 示例

```c showLineNumbers
    char cs[2][3] = {
        {'a', 'b', 'c'},
        {'d', 'e', 'f'}
    };
    printf("%c", cs[0][0]);// 第一个[0]取出一维数组, 第二个[0]取出一维数组中对应的元素
```

```c showLineNumbers
    char cs[2][3] = {
        {'a', 'b', 'c'},
        {'d', 'e', 'f'}
    };
    for (int i = 0; i < 2; i++) { // 外循环取出一维数组
        // i
        for (int j = 0; j < 3; j++) {// 内循环取出一维数组的每个元素
            printf("%c", cs[i][j]);
        }
        printf("\n");
    }
```

> 注意: 必须强调的是,a[0],a[1],a[2]不能当作下标变量使用,它们是数组名,不是一个单纯的下标变量

---

## 二维数组的存储

- 和以为数组一样

* 给数组分配存储空间从内存地址大开始分配
* 给数组元素分配空间, 从所占用内存地址小的开始分配
* 往每个元素中存储数据从高地址开始存储

```c showLineNumbers
#include <stdio.h>
int main()
{
    char cs[2][3] = {
        {'a', 'b', 'c'},
        {'d', 'e', 'f'}
    };
    // cs == &cs == &cs[0] == &cs[0][0]
    printf("cs = %p\n", cs);                // 0060FEAA
    printf("&cs = %p\n", &cs);              // 0060FEAA
    printf("&cs[0] = %p\n", &cs[0]);        // 0060FEAA
    printf("&cs[0][0] = %p\n", &cs[0][0]);  // 0060FEAA
    return 0;
}
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/b3da2217fbaf93e346a390a47cad9a50.png)

## 二维数组与函数

- 值传递

```c showLineNumbers
#include <stdio.h>

// 和一位数组一样, 只看形参是基本类型还是数组类型
// 如果是基本类型在函数中修改形参不会影响实参
void change(char ch){
    ch = 'n';
}
int main()
{
    char cs[2][3] = {
        {'a', 'b', 'c'},
        {'d', 'e', 'f'}
    };
    printf("cs[0][0] = %c\n", cs[0][0]); // a
    change(cs[0][0]);
    printf("cs[0][0] = %c\n", cs[0][0]); // a
    return 0;
}
```

- 地址传递

```c showLineNumbers
#include <stdio.h>

// 和一位数组一样, 只看形参是基本类型还是数组类型
// 如果是数组类型在函数中修改形参会影响实参
void change(char ch[]){
    ch[0] = 'n';
}
int main()
{
    char cs[2][3] = {
        {'a', 'b', 'c'},
        {'d', 'e', 'f'}
    };
    printf("cs[0][0] = %c\n", cs[0][0]); // a
    change(cs[0]);
    printf("cs[0][0] = %c\n", cs[0][0]); // n
    return 0;
}
```

```c showLineNumbers
#include <stdio.h>

// 和一位数组一样, 只看形参是基本类型还是数组类型
// 如果是数组类型在函数中修改形参会影响实参
void change(char ch[][3]){
    ch[0][0] = 'n';
}
int main()
{
    char cs[2][3] = {
        {'a', 'b', 'c'},
        {'d', 'e', 'f'}
    };
    printf("cs[0][0] = %c\n", cs[0][0]); // a
    change(cs);
    printf("cs[0][0] = %c\n", cs[0][0]); // n
    return 0;
}
```

- 形参错误写法

```c showLineNumbers
void test(char cs[2][]) // 错误写法
{
    printf("我被执行了\n");
}

void test(char cs[2][3]) // 正确写法
{
    printf("我被执行了\n");
}

void test(char cs[][3]) // 正确写法
{
    printf("我被执行了\n");
}
```

- 二维数组作为函数参数，在被调函数中不能获得其有多少行，需要通过参数传入

```c showLineNumbers
void test(char cs[2][3])
{
    int row = sizeof(cs); // 输出4或8
    printf("row = %zu\n", row);
}
```

- 二维数组作为函数参数，在被调函数中可以计算出二维数组有多少列

```c showLineNumbers
void test(char cs[2][3])
{
    size_t col = sizeof(cs[0]); // 输出3
    printf("col = %zd\n", col);
}
```

## 作业

- 玩家通过键盘录入 w,s,a,d 控制小人向不同方向移动,其中 w 代表向上移动,s 代表向 下移动,a 代表向左移动,d 代表向右移动,当小人移动到出口位置,玩家胜利

- 思路:
- 1.定义二维数组存放地图

```c showLineNumbers
     ######
     #O #
     # ## #
     #  # #
     ##   #
     ######
```

- 2.规定地图的方向
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/7331a7700b09543cef73fa0bbddc3c16.png)
- 3.编写程序控制方向

* 当输入 w 或者 W, 小人向上移动. x-1
* 当输入 s 或者 S, 小人向下. x+1
* 当输入 a 或者 A, 小人向左. y-1
* 当输入 d 或者 D, 小人向右. y+1

- 4.移动小人

* 用变量记录小人当前的位置
  - 1)如果小人将要移动的位置是墙,则无法移动
  - 2)如果小人将要移动的位置是路,则可以移动

- 5.判断是否走出迷宫

## 字符串的基本概念

- 字符串是位于双引号中的字符序列

* 在内存中以“\0”结束,所占字节比实际多一个
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e0f0831ff1b110569a7e34440ab62e9e.png)

## 字符串的初始化

- 在 C 语言中没有专门的字符串变量,通常用一个字符数组来存放一个字符串。
- 当把一个字符串存入一个数组时,会把结束符‘\0’存入数组,并以此作为该字符串是否结束的标志。
- 有了‘\0’标志后,就不必再用字符数组 的长度来判断字符串的长度了
- 初始化

```c showLineNumbers
    char name[9] = "lnj"; //在内存中以“\0”结束， \0ASCII码值是0
    char name1[9] = {'l','n','j','\0'};
    char name2[9] = {'l','n','j',0};
    // 当数组元素个数大于存储字符内容时, 未被初始化的部分默认值是0, 所以下面也可以看做是一个字符串
    char name3[9] = {'l','n','j'};
```

- 错误的初始化方式

```c showLineNumbers
    //省略元素个数时, 不能省略末尾的\n
    // 不正确地写法，结尾没有\0 ，只是普通的字符数组
    char name4[] = {'l','n','j'};

     //   "中间不能包含\0", 因为\0是字符串的结束标志
     //    \0的作用：字符串结束的标志
    char name[] = "c\0ool";
     printf("name = %s\n",name);
输出结果: c
```

---

## 字符串输出

- 如果字符数组中存储的是一个字符串, 那么字符数组的输入输出将变得简单方便。

* 不必使用循环语句逐个地输入输出每个字符
* 可以使用 printf 函数和 scanf 函数一次性输出输入一个字符数组中的字符串

- 使用的格式字符串为“%s”,表示输入、输出的是一个字符串 字符串的输出

---

- **输出**

* %s 的本质就是根据传入的 name 的地址逐个去取数组中的元素然后输出，直到遇到\0 位置

```c showLineNumbers
char chs[] = "lnj";
printf("%s\n", chs);
```

- 注意点:

* \0 引发的脏读问题

```c showLineNumbers
char name[] = {'c', 'o', 'o', 'l' , '\0'};
char name2[] = {'l', 'n', 'j'};
printf("name2 = %s\n", name2); // 输出结果: lnjcool
```

---

- **输入**

```c showLineNumbers
char ch[10];
scanf("%s",ch);
```

- 注意点:

* 对一个字符串数组, 如果不做初始化赋值, 必须指定数组长度
* ch 最多存放由 9 个字符构成的字符串，其中最后一个字符的位置要留给字符串的结尾标示‘\0’
* 当用 scanf 函数输入字符串时,字符串中不能含有空格,否则将以空格作为串的结束符

## 字符串常用方法

- C 语言中供了丰富的字符串处理函数,大致可分为字符串的输入、输出、合并、修改、比较、转 换、复制、搜索几类。

* 使用这些函数可大大减轻编程的负担。
* 使用输入输出的字符串函数,在使用前应包含头文件"stdio.h"
* 使用其它字符串函数则应包含头文件"string.h"

---

- 字符串输出函数:puts
- 格式: puts(字符数组名)
- 功能:把字符数组中的字符串输出到显示器。即在屏幕上显示该字符串。
- 优点:

* 自动换行
* 可以是数组的任意元素地址

- 缺点

* 不能自定义输出格式, 例如 puts("hello %i");

```c showLineNumbers
char ch[] = "lnj";
puts(ch); //输出结果: lnj
```

> - puts 函数完全可以由 printf 函数取代。当需要按一定格式输出时,通常使用 printf 函数

---

- 字符串输入函数:gets
- 格式: gets (字符数组名)
- 功能:从标准输入设备键盘上输入一个字符串。

```c showLineNumbers
char ch[30];
gets(ch); // 输入:lnj
puts(ch); // 输出:lnj
```

> - 可以看出当输入的字符串中含有空格时,输出仍为全部字符串。说明 gets 函数并不以空格作为字符串输入结束的标志,而只以回车作为输入结束。这是与 scanf 函数不同的。
> - 注意 gets 很容易导致数组下标越界，是一个不安全的字符串操作函数

---

- 字符串长度
- 利用 sizeof 字符串长度

* 因为字符串在内存中是逐个字符存储的,一个字符占用一个字节,所以字符串的结束符长度也是占用的内存单元的字节数。

```c showLineNumbers
    char name[] = "it666";
    int size = sizeof(name);// 包含\0
    printf("size = %d\n", size); //输出结果:6
```

---

- 利用系统函数

* 格式: strlen(字符数组名)
* 功能:测字符串的实际长度(不含字符串结束标志‘\0’)并作为函数返回值。

```c showLineNumbers
    char name[] = "it666";
    size_t len = strlen(name2);
    printf("len = %lu\n", len); //输出结果:5
```

---

- 以“\0”为字符串结束条件进行统计

```c showLineNumbers
/**
 *  自定义方法计算字符串的长度
 *  @param name 需要计算的字符串
 *  @return 不包含\0的长度
 */
int myStrlen2(char str[])
{
    //    1.定义变量保存字符串的长度
    int length = 0;
    while (str[length] != '\0')
    {
        length++;//1 2 3 4
    }
    return length;
}
/**
 *  自定义方法计算字符串的长度
 *  @param name  需要计算的字符串
 *  @param count 字符串的总长度
 *  @return 不包含\0的长度
 */
int myStrlen(char str[], int count)
{
//    1.定义变量保存字符串的长度
    int length = 0;
//    2.通过遍历取出字符串中的所有字符逐个比较
    for (int i = 0; i < count; i++) {
//        3.判断是否是字符串结尾
        if (str[i] == '\0') {
            return length;
        }
        length++;
    }
    return length;
}
```

---

- 字符串连接函数:strcat
- 格式: strcat(字符数组名 1,字符数组名 2)
- 功能:把字符数组 2 中的字符串连接到字符数组 1 中字符串的后面,并删去字符串 1 后的串标志 “\0”。本函数返回值是字符数组 1 的首地址。

```c showLineNumbers
char oldStr[100] = "welcome to";
char newStr[20] = " lnj";
strcat(oldStr, newStr);
puts(oldStr); //输出: welcome to lnj"
```

> - 本程序把初始化赋值的字符数组与动态赋值的字符串连接起来。要注意的是,字符数组 1 应定义足 够的长度,否则不能全部装入被连接的字符串。

---

- 字符串拷贝函数:strcpy
  `- 格式: strcpy(字符数组名1,字符数组名2)
`- 功能:把字符数组 2 中的字符串拷贝到字符数组 1 中。串结束标志“\0”也一同拷贝。字符数名 2, 也可以是一个字符串常量。这时相当于把一个字符串赋予一个字符数组。

```c showLineNumbers
char oldStr[100] = "welcome to";
char newStr[50] = " lnj";
strcpy(oldStr, newStr);
puts(oldStr); // 输出结果:  lnj // 原有数据会被覆盖
```

> - 本函数要求字符数组 1 应有足够的长度,否则不能全部装入所拷贝的字符串。

---

- 字符串比较函数:strcmp
- 格式: strcmp(字符数组名 1,字符数组名 2)
- 功能:按照 ASCII 码顺序比较两个数组中的字符串,并由函数返回值返回比较结果。

* 字符串 1=字符串 2,返回值=0;
* 字符串 1`>`字符串 2,返回值`>`0;
* 字符串 1`<`字符串 2,返回值`<`0。

```c showLineNumbers
    char oldStr[100] = "0";
    char newStr[50] = "1";
    printf("%d", strcmp(oldStr, newStr)); //输出结果:-1
    char oldStr[100] = "1";
    char newStr[50] = "1";
    printf("%d", strcmp(oldStr, newStr));  //输出结果:0
    char oldStr[100] = "1";
    char newStr[50] = "0";
    printf("%d", strcmp(oldStr, newStr)); //输出结果:1
```

## 练习

- 编写一个函数 char_contains(char str[],char key)， 如果字符串 str 中包含字符 key 则返回数值 1，否则返回数值 0

## 字符串数组基本概念

- 字符串数组其实就是定义一个数组保存所有的字符串

* 1.一维字符数组中存放一个字符串，比如一个名字 char name[20] = “nj”
* 2.如果要存储多个字符串，比如一个班所有学生的名字，则需要二维字符数组，char names[15][20]可以存放 15 个学生的姓名(假设姓名不超过 20 字符)
* 如果要存储两个班的学生姓名，那么可以用三维字符数组 char names[2][15][20] ##字符串数组的初始化

```c showLineNumbers
char names[2][10] = { {'l','n','j','\0'}, {'l','y','h','\0'} };
char names2[2][10] = { {"lnj"}, {"lyh"} };
char names3[2][10] = { "lnj", "lyh" };
```

## 指针基本概念

- 什么是地址

* 生活中的地址:
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/9485373b7cb46f41f6c996303419ba4c.png)
* 内存地址:
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e46d975be9e95178136726209b2c237f.png)

- 地址与内存单元中的数据是两个完全不同的概念

* 地址如同房间编号, 根据这个编号我们可以找到对应的房间
* 内存单元如同房间, 房间是专门用于存储数据的

- 变量地址:

* 系统分配给"变量"的"内存单元"的起始地址

```c showLineNumbers
int num = 6; // 占用4个字节
//那么变量num的地址为: 0ff06

char c = 'a'; // 占用1个字节
//那么变量c的地址为:0ff05
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/13eb965757dd130d813a953506335b89.png)

---

## 什么是指针

- 在计算机中所有数据都存储在内存单元中,而每个内存单元都有一个对应的地址, 只要通过这个地址就能找到对应单元中存储的数据.
- 由于通过地址能找到所需的变量单元，所以我们说该地址指向了该变量单元。将地址形象化的称为“指针”

- 内存单元的指针(地址)和内存单元的内容是两个不同的概念。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/540000371e0da0fb105248642ef9db24.png)

## 什么是指针变量

- 在 C 语言中,允许用一个变量来存放其它变量的地址, 这种专门用于存储其它变量地址的变量, 我们称之为指针变量
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/02442ae9685e56146470369e56ca18ab.png)
- 示例:

```bash showLineNumbers
    int age;// 定义一个普通变量
    num = 10;
    int *pnAge; // 定义一个指针变量
    pnAge = &age;
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/8b7b4d0976ad6e192e3ad6e26282fa8a.png)

## 定义指针变量的格式

- 指针变量的定义包括两个内容:

* 指针类型说明,即定义变量为一个指针变量;
* 指针变量名;
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c051703dcae8535c264ef47c20881b53.png)

- 示例:

```c showLineNumbers
char ch = 'a';
char *p; // 一个用于指向字符型变量的指针
p = &ch;
int num = 666;
int *q; // 一个用于指向整型变量的指针
q = &num;
```

> - 其中,\*表示这是一个指针变量
> - 变量名即为定义的指针变量名
> - 类型说明符表示本指针变量所指向的变量的数据类型

---

## 指针变量的初始化方法

- 指针变量初始化的方法有两种:定义的同时进行初始化和先定义后初始化

* 定义的同时进行初始化

```c showLineNumbers
int a = 5;
int *p = &a;
```

- 先定义后初始化

```c showLineNumbers
int a = 5;
int *p;
p=&a;
```

- 把指针初始化为 NULL

```c showLineNumbers
int *p=NULL;
int *q=0;
```

- 不合法的初始化:

* 指针变量只能存储地址, 不能存储其它类型

```c showLineNumbers
int *p;
p =  250; // 错误写法
```

- 给指针变量赋值时,指针变量前不能再加“\*”

```c showLineNumbers
int *p;
*p=&a; //错误写法
```

- 注意点:

* 多个指针变量可以指向同一个地址
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/d4c9b29d8ddb808d1a12252fdcdf538a.png)

- 指针的指向是可以改变的

```c showLineNumbers
int a = 5;
int *p = &a;
int b = 10;
p = &b; // 修改指针指向
```

- 指针没有初始化里面是一个垃圾值,这时候我们这是一个野指针

* 野指针可能会导致程序崩溃
* 野指针访问你不该访问数据
* 所以指针必须初始化才可以访问其所指向存储区域
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e38cdad483acddca8cfcd85e7ac0be78.png)

## 访问指针所指向的存储空间

- C 语言中提供了地址运算符&来表示变量的地址。其一般形式为:

* &变量名;

- C 语言中提供了\*来定义指针变量和访问指针变量指向的内存存储空间

* 在定义变量的时候 \* 是一个类型说明符,说明定义的这个变量是一个指针变量

```c showLineNumbers
int *p=NULL; // 定义指针变量
```

- 在不是定义变量的时候 \*是一个操作符,代表访问指针所指向存储空间

```c showLineNumbers
int a = 5;
int *p = &a;
printf("a = %d", *p); // 访问指针变量
```

## 指针类型

- 在同一种编译器环境下,一个指针变量所占用的内存空间是固定的。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a95f575889111ad8d64cc2c1aa8ecb1e.png)

- 虽然在同一种编译器下, 所有指针占用的内存空间是一样的,但不同类型的变量却占不同的字节数

* 一个 int 占用 4 个字节，一个 char 占用 1 个字节，而一个 double 占用 8 字节；
* 现在只有一个地址，我怎么才能知道要从这个地址开始向后访问多少个字节的存储空间呢，是 4 个，是 1 个，还是 8 个。
* 所以指针变量需要它所指向的数据类型告诉它要访问多少个字节存储空间
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/af1fd05a523d9ba4e196e326f537589b.png)

---

## 二级指针

- 如果一个指针变量存放的又是另一个指针变量的地址,则称这个指针变量为指向指针的指针 ￼ 变量。也称为“二级指针”

```c showLineNumbers
    char c = 'a';
    char *cp;
    cp = &c;
    char **cp2;
    cp2 = &cp;
    printf("c = %c", **cp2);
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/af331163ce03df7573810fc05ceb03c6.png)

- 多级指针的取值规则

```c showLineNumbers
int ***m1;  //取值***m1
int *****m2; //取值*****m2
```

---

## 练习

- 定义一个函数交换两个变量的值
- 写一个函数，同时返回两个数的和与差

## 数组指针的概念及定义

- 数组元素指针

* 一个变量有地址,一个数组包含若干元素,每个数组元素也有相应的地址, 指针变量也可以保存数组元素的地址
* 只要一个指针变量保存了数组元素的地址, 我们就称之为数组元素指针
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/69b98c6401a04bf8fce52a78c80b9565.png)

```c showLineNumbers
    printf(“%p %p”, &(a[0]), a); //输出结果:0x1100, 0x1100
```

> - 注意: 数组名 a 不代表整个数组,只代表数组首元素的地址。
> - “p=a;”的作用是“把 a 数组的首元素的地址赋给指针变量 p”,而不是“把数组 a 各元素的值赋给 p”

##

## 指针访问数组元素

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/13c0dd997ce619b1249220ce09610ad4.png)

```c showLineNumbers
    int main (void)
{
      int a[5] = {2, 4, 6, 8, 22};
      int *p;
      // p = &(a[0]);
      p = a;
      printf(“%d %d\n”,a[0],*p); // 输出结果: 2, 2
}

```

- 在指针指向数组元素时,允许以下运算:

* 加一个整数(用+或+=),如 p+1
* 减一个整数(用-或-=),如 p-1
* 自加运算,如 p++,++p
* 自减运算,如 p--,--p

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6c563fff4c62724055337604c2d31623.png)

> - 如果指针变量 p 已指向数组中的一个元素,则 p+1`指向`同一数组中的下一个元素,p-1`指向`同 一数组中的上一个元素。

- 结论: 访问数组元素,可用下面两种方法:

* 下标法, 如 a[i]形式
* 指针法, \*(p+i)形式

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/e00312fbc775c04e2a449d7d8d473eb9.png)

- 注意:

* 数组名虽然是数组的首地址，但是数组名所所保存的数组的首地址是不可以更改的

```c showLineNumbers
  int x[10];
	x++;  //错误
	int* p = x;
	p++; //正确
```

##

## 指针与字符串

- 定义字符串的两种方式

* 字符数组

```c showLineNumbers
char string[]=”I love lnj!”;
printf("%s\n",string);
```

- 字符串指针指向字符串

```c showLineNumbers
// 数组名保存的是数组第0个元素的地址, 指针也可以保存第0个元素的地址
char *str = "abc"
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/cb21fae540cb3290bbc41e7e223d3a41.png)

- 字符串指针使用注意事项

* 可以查看字符串的每一个字符

```c showLineNumbers
har *str = "lnj";
for(int i = 0; i < strlen(str);i++)
{
  printf("%c-", *(str+i)); // 输出结果:l-n-j
}
```

- - 不可以修改字符串内容

```c showLineNumbers
//   + 使用字符数组来保存的字符串是保存栈里的,保存栈里面东西是可读可写,所有可以修改字符串中的的字符
//   + 使用字符指针来保存字符串,它保存的是字符串常量地址,常量区是只读的,所以我们不可以修改字符串中的字符
char *str = "lnj";
*(str+2) = 'y'; // 错误
```

- - 不能够直接接收键盘输入

```c showLineNumbers
// 错误的原因是:str是一个野指针,他并没有指向某一块内存空间
// 所以不允许这样写如果给str分配内存空间是可以这样用 的
char *str;
scanf("%s", str);
```

## 指向函数指针

- 为什么指针可以指向一个函数？

* 函数作为一段程序，在内存中也要占据部分存储空间，它也有一个起始地址
* 函数有自己的地址，那就好办了，我们的指针变量就是用来存储地址的。
* 因此可以利用一个指针指向一个函数。其中，函数名就代表着函数的地址。

- 指针函数的定义

* 格式: `返回值类型 (*指针变量名)(形参1, 形参2, ...);`

```c showLineNumbers
    int sum(int a,int b)
    {
        return a + b;
    }

    int (*p)(int,int);
    p = sum;
```

- 指针函数定义技巧

* 1、把要指向函数头拷贝过来
* 2、把函数名称使用小括号括起来
* 3、在函数名称前面加上一个\*
* 4、修改函数名称

- 应用场景

* 调用函数
* 将函数作为参数在函数间传递

- 注意点:

* 由于这类指针变量存储的是一个函数的入口地址，所以对它们作加减运算(比如 p++)是无意义的
* 函数调用中"(指针变量名)"的两边的括号不可少,其中的不应该理解为求值运算,在此处它 只是一种表示符号

## 什么是结构体

- 结构体和数组一样属于构造类型
- 数组是用于保存一组相同类型数据的, 而结构体是用于保存一组不同类型数组的
- 例如,在学生登记表中,姓名应为字符型;学号可为整型或字符型;年龄应为整型;性别应为字符型;成绩可为整型或实型。
- 显然这组数据不能用数组来存放, 为了解决这个问题,C 语言中给出了另一种构造数据类型——“结构(structure)”或叫“结构体”。

---

## 定义结构体类型

- 在使用结构体之前必须先定义结构体类型, 因为 C 语言不知道你的结构体中需要存储哪些类型数据, 我们必须通过定义结构体类型来告诉 C 语言, 我们的结构体中需要存储哪些类型的数据
- 格式:

```c showLineNumbers
struct　结构体名{
     类型名1　成员名1;
     类型名2　成员名2;
     ……
     类型名n　成员名n;
 };
```

- 示例:

```c showLineNumbers
struct Student {
    char *name; // 姓名
    int age; // 年龄
    float height; // 身高
};
```

---

## 定义结构体变量

- 定好好结构体类型之后, 我们就可以利用我们定义的结构体类型来定义结构体变量
- 格式: `struct 结构体名 结构体变量名;`
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a19ef99bede1b3b0d689959881390bd0.png)

- 先定义结构体类型，再定义变量

```c showLineNumbers
struct Student {
     char *name;
     int age;
 };

 struct Student stu;
```

- 定义结构体类型的同时定义变量

```c showLineNumbers
struct Student {
    char *name;
    int age;
} stu;
```

- 匿名结构体定义结构体变量

```c showLineNumbers
struct {
    char *name;
    int age;
} stu;
```

> - 第三种方法与第二种方法的区别在于,第三种方法中省去了结构体类型名称,而直接给出结构变量,这种结构体最大的问题是结构体类型不能复用

---

## 结构体成员访问

- 一般对结构体变量的操作是以成员为单位进行的，引用的一般形式为：`结构体变量名.成员名`

```c showLineNumbers
struct Student {
     char *name;
     int age;
 };
 struct Student stu;
 // 访问stu的age成员
 stu.age = 27;
 printf("age = %d", stu.age);
```

---

## 结构体变量的初始化

- 定义的同时按顺序初始化

```c showLineNumbers
struct Student {
     char *name;
     int age;
 };
struct Student stu = {“lnj", 27};
```

- 定义的同时不按顺序初始化

```c showLineNumbers
struct Student {
     char *name;
     int age;
 };
struct Student stu = {.age = 35, .name = “lnj"};
```

- 先定义后逐个初始化

```c showLineNumbers
struct Student {
     char *name;
     int age;
 };
 struct Student stu;
stu.name = "lnj";
stu.age = 35;
```

- 先定义后一次性初始化

```c showLineNumbers
struct Student {
     char *name;
     int age;
 };
struct Student stu;
stu2 = (struct Student){"lnj", 35};
```

---

## 结构体类型作用域

- 结构类型定义在函数内部的作用域与局部变量的作用域是相同的

* 从定义的那一行开始, 直到遇到 return 或者大括号结束为止

- 结构类型定义在函数外部的作用域与全局变量的作用域是相同的

* 从定义的那一行开始,直到本文件结束为止

```c showLineNumbers
//定义一个全局结构体,作用域到文件末尾
struct Person{
    int age;
    char *name;
};

int main(int argc, const char * argv[])
{
    //定义局部结构体名为Person,会屏蔽全局结构体
    //局部结构体作用域,从定义开始到“}”块结束
    struct Person{
        int age;
    };
    // 使用局部结构体类型
    struct Person pp;
    pp.age = 50;
    pp.name = "zbz";

    test();
    return 0;
}

void test() {

    //使用全局的结构体定义结构体变量p
    struct Person p = {10,"sb"};
    printf("%d,%s\n",p.age,p.name);
}
```

## 结构体数组

- 结构体数组和普通数组并无太大差异, 只不过是数组中的元素都是结构体而已
- 格式: `struct 结构体类型名称 数组名称[元素个数]`

```c showLineNumbers
struct Student {
    char *name;
    int age;
};
struct Student stu[2];
```

- 结构体数组初始化和普通数组也一样, 分为先定义后初始化和定义同时初始化
  - 定义同时初始化

```c showLineNumbers
struct Student {
    char *name;
    int age;
};
struct Student stu[2] = {{"lnj", 35},{"zs", 18}};
```

- - 先定义后初始化

```c showLineNumbers
struct Student {
    char *name;
    int age;
};
struct Student stu[2];
stu[0] = {"lnj", 35};
stu[1] = {"zs", 18};
```

## 结构体指针

- 一个指针变量当用来指向一个结构体变量时,称之为结构体指针变量
- 格式: `struct 结构名 *结构指针变量名`
- 示例:

```c showLineNumbers
      // 定义一个结构体类型
      struct Student {
          char *name;
          int age;
      };

     // 定义一个结构体变量
     struct Student stu = {“lnj", 18};

     // 定义一个指向结构体的指针变量
     struct Student *p;

    // 指向结构体变量stu
    p = &stu;

     /*
      这时候可以用3种方式访问结构体的成员
      */
     // 方式1：结构体变量名.成员名
     printf("name=%s, age = %d \n", stu.name, stu.age);

     // 方式2：(*指针变量名).成员名
     printf("name=%s, age = %d \n", (*p).name, (*p).age);

     // 方式3：指针变量名->成员名
     printf("name=%s, age = %d \n", p->name, p->age);

     return 0;
 }
```

- 通过结构体指针访问结构体成员, 可以通过以下两种方式

* (\*结构指针变量).成员名
* 结构指针变量->成员名(用熟)

> - (pstu)两侧的括号不可少,因为成员符“.”的优先级高于“”。
> - 如去掉括号写作 pstu.num 则等效于(pstu.num),这样,意义就完全不对了。

## 结构体内存分析

- 给结构体变量开辟存储空间和给普通开辟存储空间一样, 会从内存地址大的位置开始开辟
- 给结构体成员开辟存储空间和给数组元素开辟存储空间一样, 会从所占用内存地址小的位置开始开辟
- 结构体变量占用的内存空间永远是所有成员中占用内存最大成员的倍数(对齐问题)

> +多实际的计算机系统对基本类型数据在内存中存放的位置有限制,它们会要求这些数据的起始地址的值是 某个数 k 的倍数,这就是所谓的内存对齐,而这个 k 则被称为该数据类型的对齐模数(alignment modulus)。
>
> - 这种强制的要求一来简化了处理器与内存之间传输系统的设计,二来可以提升读取数据的速度。比如这么一种处理器,它每次读写内存的时候都从某个 8 倍数的地址开始,一次读出或写入 8 个字节的数据,假如软件能 保证 double 类型的数据都从 8 倍数地址开始,那么读或写一个 double 类型数据就只需要一次内存操作。否则,我们就可能需要两次内存操作才能完成这个动作,因为数据或许恰好横跨在两个符合对齐要求的 8 字节 内存块上

## 结构体变量占用存储空间大小

```c showLineNumbers
    struct Person{
        int age; // 4
        char ch; // 1
        double score; // 8
    };
    struct Person p;
    printf("sizeof = %i\n", sizeof(p)); // 16
```

- 占用内存最大属性是 score, 占 8 个字节, 所以第一次会分配 8 个字节
- 将第一次分配的 8 个字节分配给 age4 个,分配给 ch1 个, 还剩下 3 个字节
- 当需要分配给 score 时, 发现只剩下 3 个字节, 所以会再次开辟 8 个字节存储空间
- 一共开辟了两次 8 个字节空间, 所以最终 p 占用 16 个字节

```c showLineNumbers
    struct Person{
        int age; // 4
        double score; // 8
        char ch; // 1
    };
    struct Person p;
    printf("sizeof = %i\n", sizeof(p)); // 24
```

- 占用内存最大属性是 score, 占 8 个字节, 所以第一次会分配 8 个字节
- 将第一次分配的 8 个字节分配给 age4 个,还剩下 4 个字节
- 当需要分配给 score 时, 发现只剩下 4 个字节, 所以会再次开辟 8 个字节存储空间
- 将新分配的 8 个字节分配给 score, 还剩下 0 个字节
- 当需要分配给 ch 时, 发现上一次分配的已经没有了, 所以会再次开辟 8 个字节存储空间
- 一共开辟了 3 次 8 个字节空间, 所以最终 p 占用 24 个字节

## 结构体嵌套定义

- 成员也可以又是一个结构,即构成了嵌套的结构

```c showLineNumbers
struct Date{
     int month;
     int day;
     int year;
}
struct  stu{
     int num;
    char *name;
    char sex;
    struct Date birthday;
    Float score;
}
```

- 在 stu 中嵌套存储 Date 结构体内容
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/de4aedd768012888dc7b2e70a744c86d.png)

> - 注意:
> - 结构体不可以嵌套自己变量,可以嵌套指向自己这种类型的指针
>
> ```c showLineNumbers
> struct Student {
>  int age;
>  struct Student stu;
> };
> ```

- 对嵌套结构体成员的访问
  - 如果某个成员也是结构体变量，可以连续使用成员运算符"."访问最低一级成员

```c showLineNumbers
struct Date {
       int year;
       int month;
       int day;
  };

  struct Student {
      char *name;
      struct Date birthday;
 };

 struct Student stu;
 stu.birthday.year = 1986;
 stu.birthday.month = 9;
 stu.birthday.day = 10;
```

---

## 结构体和函数

- 结构体虽然是构造类型, 但是结构体之间赋值是值拷贝, 而不是地址传递

```c showLineNumbers
    struct Person{
        char *name;
        int age;
    };
    struct Person p1 = {"lnj", 35};
    struct Person p2;
    p2 = p1;
    p2.name = "zs"; // 修改p2不会影响p1
    printf("p1.name = %s\n", p1.name); // lnj
    printf("p2.name = %s\n", p2.name); //  zs
```

- 所以结构体变量作为函数形参时也是值传递, 在函数内修改形参, 不会影响外界实参

```c showLineNumbers
#include <stdio.h>

struct Person{
    char *name;
    int age;
};

void test(struct Person per);

int main()
{
    struct Person p1 = {"lnj", 35};
    printf("p1.name = %s\n", p1.name); // lnj
    test(p1);
    printf("p1.name = %s\n", p1.name); // lnj
    return 0;
}
void test(struct Person per){
    per.name = "zs";
}
```

## 共用体

- 和结构体不同的是, 结构体的每个成员都是占用一块独立的存储空间, 而共用体所有的成员都占用同一块存储空间
- 和结构体一样, 共用体在使用之前必须先定义共用体类型, 再定义共用体变量
- 定义共用体类型格式:

```c showLineNumbers
union 共用体名{
    数据类型 属性名称;
    数据类型 属性名称;
    ...   ....
};
```

- 定义共用体类型变量格式:

```c showLineNumbers
union 共用体名 共用体变量名称;
```

- 特点: 由于所有属性共享同一块内存空间, 所以只要其中一个属性发生了改变, 其它的属性都会受到影响
- 示例:

```c showLineNumbers
    union Test{
        int age;
        char ch;
    };
    union Test t;
    printf("sizeof(p) = %i\n", sizeof(t));

    t.age = 33;
    printf("t.age = %i\n", t.age); // 33
    t.ch = 'a';
    printf("t.ch = %c\n", t.ch); // a
    printf("t.age = %i\n", t.age); // 97
```

- 共用体的应用场景
  - （1）通信中的数据包会用到共用体，因为不知道对方会发送什么样的数据包过来，用共用体的话就简单了，定义几种格式的包，收到包之后就可以根据包的格式取出数据。
  - （2）节约内存。如果有 2 个很长的数据结构，但不会同时使用，比如一个表示老师，一个表示学生，要统计老师和学生的情况，用结构体就比较浪费内存，这时就可以考虑用共用体来设计。 +（3）某些应用需要大量的临时变量，这些变量类型不同，而且会随时更换。而你的堆栈空间有限，不能同时分配那么多临时变量。这时可以使用共用体让这些变量共享同一个内存空间，这些临时变量不用长期保存，用完即丢，和寄存器差不多，不用维护。

## 枚举

- 什么是枚举类型?

* 在实际问题中,有些变量的取值被限定在一个有限的范围内。例如,一个星期内只有七天,一年只有十二个月,一个班每周有六门课程等等。如果把这些量说明为整型,字符型或其它类型 显然是不妥当的。
* C 语言提供了一种称为“枚举”的类型。在“枚举”类型的定义中列举出所有可能的取值, 被说明为该“枚举”类型的变量取值不能超过定义的范围。
* 该说明的是,枚举类型是一种基本数据类型,而不是一种构造类型,因为它不能再分解为任何基本类型。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/d475ee4ee2d87374bd67b5f25152548c.png)

- 枚举类型的定义

* 格式:

```c showLineNumbers
enum　枚举名　{
    枚举元素1,
    枚举元素2,
    ……
};
```

- 示例:

```c showLineNumbers
// 表示一年四季
enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
};
```

- 枚举变量

* 先定义枚举类型，再定义枚举变量

```c showLineNumbers
enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
};
enum Season s;
```

- 定义枚举类型的同时定义枚举变量

```c showLineNumbers
enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
} s;
```

- 省略枚举名称，直接定义枚举变量

```c showLineNumbers
enum {
    Spring,
    Summer,
    Autumn,
    Winter
} s;
```

- 枚举类型变量的赋值和使用

```c showLineNumbers
enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
} s;
s = Spring; // 等价于 s = 0;
s = 3; // 等价于 s = winter;
printf("%d", s);
```

- 枚举使用的注意

* C 语言编译器会将枚举元素(spring、summer 等)作为整型常量处理，称为枚举常量。
* 枚举元素的值取决于定义时各枚举元素排列的先后顺序。默认情况下，第一个枚举元素的值为 0，第二个为 1，依次顺序加 1。
* 也可以在定义枚举类型时改变枚举元素的值

```c showLineNumbers
enum Season {
    Spring,
    Summer,
    Autumn,
    Winter
};
// 也就是说spring的值为0，summer的值为1，autumn的值为2，winter的值为3
```

```c showLineNumbers
enum Season {
    Spring = 9,
    Summer,
    Autumn,
    Winter
};
// 也就是说spring的值为9，summer的值为10，autumn的值为11，winter的值为12
```

## 全局变量和局部变量

- 变量作用域基本概念

* 变量作用域：变量的可用范围
* 按照作用域的不同，变量可以分为：局部变量和全局变量

- 局部变量

* 定义在函数内部的变量以及函数的形参, 我们称为局部变量
* 作用域：从定义的那一行开始, 直到遇到}结束或者遇到 return 为止
* 生命周期: 从程序运行到定义哪一行开始分配存储空间到程序离开该变量所在的作用域
* 存储位置: 局部变量会存储在内存的栈区中
* 特点：
* 相同作用域内不可以定义同名变量
* 不同作用范围可以定义同名变量，内部作用域的变量会覆盖外部作用域的变量

- 全局变量

* 定义在函数外面的变量称为全局变量
* 作用域范围：从定义哪行开始直到文件结尾
* 生命周期:程序一启动就会分配存储空间,直到程序结束
* 存储位置：静态存储区
* 特点: 多个同名的全局变量指向同一块存储空间

## auto 和 register 关键字

- auto 关键字(忘记)

* 只能修饰局部变量, 局部变量如果没有其它修饰符, 默认就是 auto 的
* 特点: 随用随开, 用完即销

```c showLineNumbers
auto int num; // 等价于 int num;
```

- register 关键字(忘记)

* 只能修饰局部变量, 原则上将内存中变量提升到 CPU 寄存器中存储, 这样访问速度会更快
* 但是由于 CPU 寄存器数量相当有限, 通常不同平台和编译器在优化阶段会自动转换为 auto

```c showLineNumbers
register int num;
```

## static 关键字

- **对局部变量的作用**

* 延长局部变量的生命周期,从程序启动到程序退出,但是它并没有改变变量的作用域
* 定义变量的代码在整个程序运行期间仅仅会执行一次

```c showLineNumbers
#include <stdio.h>
void test();
int main()
{
    test();
    test();
    test();

    return 0;
}
void test(){
    static int num = 0; // 局部变量
    num++;
    // 如果不加static输出 1 1 1
    // 如果添加static输出 1 2 3
    printf("num = %i\n", num);
}
```

- **对全局变量的作用**
- 全局变量分类：

* 内部变量:只能在本文件中访问的变量
* 外部变量:可以在其他文件中访问的变量,默认所有全局变量都是外部变量

- 默认情况下多个同名的全局变量共享一块空间, 这样会导致全局变量污染问题
- 如果想让某个全局变量只在某个文件中使用, 并且不和其他文件中同名全局变量共享同一块存储空间, 那么就可以使用 static

```c showLineNumbers
// A文件中的代码
int num; // 和B文件中的num共享
void test(){
    printf("ds.c中的 num = %i\n", num);
}
```

```c showLineNumbers
// B文件中的代码
#include <stdio.h>
#include "ds.h"

int num; // 和A文件中的num共享
int main()
{
    num = 666;
    test(); // test中输出666
    return 0;
}
```

```c showLineNumbers
// A文件中的代码
static int num; // 不和B文件中的num共享
void test(){
    printf("ds.c中的 num = %i\n", num);
}
```

```c showLineNumbers
// B文件中的代码
#include <stdio.h>
#include "ds.h"

int num; // 不和A文件中的num共享
int main()
{
    num = 666;
    test(); // test中输出0
    return 0;
}
```

---

## extern 关键字

- 对局部变量的作用

* extern 不能用于局部变量
* extern 代表声明一个变量, 而不是定义一个变量, 变量只有定义才会开辟存储空间
* 所以如果是局部变量, 虽然提前声明有某个局部变量, 但是局部变量只有执行到才会分配存储空间

```c showLineNumbers
#include <stdio.h>

int main()
{
    extern int num;
    num = 998; // 使用时并没有存储空间可用, 所以声明了也没用
    int num; // 这里才会开辟
    printf("num = %i\n", num);
    return 0;
}
```

- 对全局变量的作用

* 声明一个全局变量, 代表告诉编译器我在其它地方定义了这个变量, 你可以放心使用

```c showLineNumbers
#include <stdio.h>

int main()
{
    extern int num; // 声明我们有名称叫做num变量
    num = 998; // 使用时已经有对应的存储空间
    printf("num = %i\n", num);
    return 0;
}
int num; // 全局变量, 程序启动就会分配存储空间
```

## static 与 extern 对函数的作用

- 内部函数:只能在本文件中访问的函数
- 外部函数:可以在本文件中以及其他的文件中访问的函数
- 默认情况下所有的函数都是外部函数

- **static 作用**
- 声明一个内部函数

```c showLineNumbers
static int sum(int num1,int num2);
```

- 定义一个内部函数

```c showLineNumbers
static int sum(int num1,int num2)
{
  return num1 + num2;
}
```

- **extern 作用**

* 声明一个外部函数

```c showLineNumbers
extern int sum(int num1,int num2);
```

- 定义一个外部函数

```c showLineNumbers
extern int sum(int num1,int num2)
{
  return num1 + num2;
}
```

> - 注意点:
> - 由于默认情况下所有的函数都是外部函数, 所以 extern 一般会省略
> - 如果只有函数声明添加了 static 与 extern, 而定义中没有添加 static 与 extern, 那么无效

---

## Qt Creator 编译过程做了什么?

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/68665a597da91a563b24cf3787665031.png)

- 当我们按下运行按钮的时, 其实 Qt Creator 编译器做了 5 件事情

* 对源文件进行预处理, 生成预处理文件
* 对预处理文件进行编译, 生成汇编文件
* 对汇编文件进行编译, 生成二进制文件
* 对二进制文件进行链接, 生成可执行文件
* 运行可执行文件

---

- Qt Creator 编译过程验证

* **1.编写代码, 保存源文件:**

  ```c showLineNumbers
  #include <stdio.h>
  int main(){
    printf("hello lnj\n");
    return 0;
  }
  ```

- **2.执行预处理编译**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/2af92e78efb66b239f4ca96a99c6e228.png)

- 执行预处理编译后生成的文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/362d51ee291b27f51140908a7244f463.png)

- 打开预处理编译后生成的文件

* 处理源文件中预处理相关的指令
* 处理源文件中多余注释等
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/85fd0abb9c2aab02e1c4563bc1ec9ef8.png)

---

- **3.执行汇编编译**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/4fd0ccaf482c9cc55f01e765c417cf5e.png)
- 执行汇编编译后生成的文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a4c1f0baf9e24d3048dca3b46d6b466c.png)
- 打开汇编编译后生成的文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6f772a00140c7cf1676c8c20eb29a2e4.png)

---

- **4.执行二进制编译**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/35f2d59e43f7964b22a3bce00ac0b704.png)
- 执行二进制编译后生成的文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/7869895f908c7b3527c3f8421852a3fd.png)
- 打开二进制编译后生成的文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/aff25b0d0e698d8790b640cb1acc332e.png)

---

- **5.执行链接操作**

* 将依赖的一些 C 语言函数库和我们编译好的二进制合并为一个文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/b0f09e30dd95ab87c87a5b3a8568bdf9.png)

- 执行链接操作后生成的文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6a20b54e83c2e2973ef46bd0cc015b72.png)

---

- **6.运行链接后生成的文件**
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/c336c50cce49b91c0088449099ebeb88.png)

## 计算机运算过程分析

- 1.编写一个简单的加法运算
- 2.调试编写好的代码, 查看对应的汇编文件
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/cd7728553a54887d4fc8f8d7be76ff3c.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/6d73e8b907457511093f7bd71ec2b1f0.png)
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/f48a45d6d63c16e7415ff225b28681f2.png)
- 结论:

* 1.通过地址线找到对应地址的存储单元
* 2.通过控制线发送内存读取指令
* 3.通过数据线将内存中的值传输到 CPU 寄存器中
* 4.在 CPU 中完成计算操作
* 5.通过地址线找到对应地址的存储单元
* 6.通过控制线发送内存写入指令
* 7.通过数据线将计算结果传输到内存中

## 预处理指令

## 预处理指令的概念

- C 语言在对源程序进行编译之前，会先对一些特殊的预处理指令作解释(比如之前使用的#include 文件包含指令)，产生一个新的源程序(这个过程称为编译预处理),之后再进行通常的编译
- 为了区分预处理指令和一般的 C 语句，所有预处理指令都以符号“#”开头，并且结尾不用分号
- 预处理指令可以出现在程序的任何位置，它的作用范围是从它出现的位置到文件尾。习惯上我们尽可能将预处理指令写在源程序开头，这种情况下，它的作用范围就是整个源程序文件
- C 语言提供了多种预处理功能,如宏定义、文件包含、条件编译等。合理地使用预处理功能编写的程序便于阅读、修改、移植和调试,也有利于模块化程序设计。

---

## 宏定义

- 被定义为“宏”的标识符称为“宏名”。在编译预处理时,对程序中所有出现的“宏名”,都用宏定义中的字符串去代换,这称为“宏代换”或“宏展开”。
- 宏定义是由源程序中的宏定义命令完成的。宏代换是由预处理程序自动完成的。在 C 语言中,“宏”分为有参数和无参数两种。 ##不带参数的宏定义
- 格式:`#define 标识符 字符串`

* 其中的“#”表示这是一条预处理命令。凡是以“#”开头的均为预处理命令。“define”为宏定义命令。“标识符”为所定义的宏名。“字符串”可以是常数、表达式、格式串等。

```c showLineNumbers
#include <stdio.h>

  // 源程序中所有的宏名PI在编译预处理的时候都会被3.14所代替
  #define PI 3.14

 // 根据圆的半径计radius算周长
 float girth(float radius) {
    return 2 * PI *radius;
}

int main ()
 {
    float g = girth(2);

    printf("周长为：%f", g);
    return 0;
}
```

- **注意点:**
  1. 宏名一般用大写字母，以便与变量名区别开来，但用小写也没有语法错误
- 2)对程序中用双引号扩起来的字符串内的字符，不进行宏的替换操作

```c showLineNumbers
#define R 10
 int main ()
 {
     char *s = "Radio"; // 在第1行定义了一个叫R的宏，但是第4行中"Radio"里面的'R'并不会被替换成10

     return 0;
 }
```

- 3)在编译预处理用字符串替换宏名时，不作语法检查，只是简单的字符串替换。只有在编译的时候才对已经展开宏名的源程序进行语法检查

```c showLineNumbers
#define I 100
 int main ()
 {
     int i[3] = I;
     return 0;
 }
```

- 4. 宏名的有效范围是从定义位置到文件结束。如果需要终止宏定义的作用域，可以用#undef 命令

```c showLineNumbers
#define PI 3.14
int main ()
 {
    printf("%f", PI);
    return 0;
}
#undef PI
void test()
{
    printf("%f", PI); // 不能使用
}
```

- 5. 定义一个宏时可以引用已经定义的宏名

```c showLineNumbers
#define R  3.0
#define PI 3.14
#define L  2*PI*R
#define S  PI*R*R
```

- 6. 可用宏定义表示数据类型,使书写方便

```c showLineNumbers
#define String char *
int main(int argc, const char * argv[])
{
     String str = "This is a string!";
     return 0;
}
```

---

## 带参数的宏定义

- C 语言允许宏带有参数。在宏定义中的参数称为形式参数,在宏调用中的参数称为实际参数。对带参数的宏,在调用中,不仅要宏展开,而且要用实参去代换形参
- 格式: `#define 宏名(形参表) 字符串`

```c showLineNumbers
// 第1行中定义了一个带有2个参数的宏average，
 #define average(a, b) (a+b)/2

int main ()
  {
  // 第4行其实会被替换成：int a = (10 + 4)/2;，
      int a = average(10, 4);
  // 输出结果为：7是不是感觉这个宏有点像函数呢？
      printf("平均值：%d", a);
     return 0;
 }
```

- **注意点:**
- 1)宏名和参数列表之间不能有空格，否则空格后面的所有字符串都作为替换的字符串.

```c showLineNumbers
#define average (a, b) (a+b)/2

 int main ()
 {
     int a = average(10, 4);
     return 0;
 }
注意第1行的宏定义，宏名average跟(a, b)之间是有空格的，于是，第5行就变成了这样：
int a = (a, b) (a+b)/2(10, 4);
这个肯定是编译不通过的
```

- 2)带参数的宏在展开时，只作简单的字符和参数的替换，不进行任何计算操作。所以在定义宏时，一般用一个小括号括住字符串的参数。

```c showLineNumbers
#include <stdio.h>
  // 下面定义一个宏D(a)，作用是返回a的2倍数值：
  #define D(a) 2*a
  // 如果定义宏的时候不用小括号括住参数

  int main ()
  {
  // 将被替换成int b = 2*3+4;，输出结果10，如果定义宏的时候用小括号括住参数，把上面的第3行改成：#define D(a) 2*(a)，注意右边的a是有括号的，第7行将被替换成int b = 2*(3+4);，输出结果14

     int b = D(3+4);
     printf("%d", b);
     return 0;
 }
```

- 3)计算结果最好也用括号括起来

```c showLineNumbers
#include <stdio.h>
// 下面定义一个宏P(a)，作用是返回a的平方
#define Pow(a) (a) * (a) // 如果不用小括号括住计算结果

int main(int argc, const char * argv[])      {
// 代码被替换为:int b = (10) * (10) / (2) * (2);
// 简化之后：int b = 10 * (10 / 2) * 2;，最后变量b为:100
      int b = Pow(10) / Pow(2);

      printf("%d", b);
      return 0;
}
```

```c showLineNumbers
#include <stdio.h>
// 计算结果用括号括起来
#define Pow(a) ( (a) * (a) )

int main(int argc, const char * argv[])      {
// 代码被替换为:int b = ( (10) * (10) ) / ( (2) * (2) );
// 简化之后：int b = (10 * 10) / (2 *2);，最后输出结果：25
      int b = Pow(10) / Pow(2);

      printf("%d", b);
      return 0;
}
```

## 条件编译

- 在很多情况下，我们希望程序的其中一部分代码只有在满足一定条件时才进行编译，否则不参与编译(只有参与编译的代码最终才能被执行)，这就是条件编译。
- 为什么要使用条件编译
  - 1)按不同的条件去编译不同的程序部分,因而产生不同的目标代码文件。有利于程序的移植和调试。
  - 2)条件编译当然也可以用条件语句来实现。 但是用条件语句将会对整个源程序进行编译,生成 的目标代码程序很长,而采用条件编译,则根据条件只编译其中的程序段 1 或程序段 2,生成的目 标程序较短。
    ##if-#else 条件编译指令
- 第一种格式:
  - 它的功能是,如常量表达式的值为真(非 0),则将 code1 编译到程序中,否则对 code2 编译到程序中。
  - 注意:
  - 是将代码编译进可执行程序, 而不是执行代码
  - 条件编译后面的条件表达式中不能识别变量,它里面只能识别常量和宏定义

```c showLineNumbers
#if 常量表达式
    ..code1...
#else
    ..code2...
#endif
```

```c showLineNumbers
#define SCORE 67
#if SCORE > 90
    printf("优秀\n");
#else
    printf("不及格\n");
#endif
```

- 第二种格式:

```c showLineNumbers
#if 条件1
  ...code1...
 #elif 条件2
  ...code2...
 #else
  ...code3...
 #endif
```

```c showLineNumbers
#define SCORE 67
#if SCORE > 90
    printf("优秀\n");
#elif SCORE > 60
    printf("良好\n");
#else
    printf("不及格\n");
#endif
```

## typedef 关键字

- C 语言不仅 􏰀 供了丰富的数据类型,而且还允许由用户自己定义类型说明符,也就是说允许由用户为数据类型取“别名”。
- 格式: `typedef 原类型名 新类型名;`

* 其中原类型名中含有定义部分,新类型名一般用大写表示,以便于区别。
* 有时也可用宏定义来代替 typedef 的功能,但是宏定义是由预处理完成的,而 typedef 则是在编译 时完成的,后者更为灵活方便。
  ##typedef 使用

- 基本数据类型

```c showLineNumbers
typedef int INTEGER
INTEGER a; // 等价于 int a;
```

- 也可以在别名的基础上再起一个别名

```c showLineNumbers
typedef int Integer;

typedef Integer MyInteger;

```

- 用 typedef 定义数组、指针、结构等类型将带来很大的方便,不仅使程序书写简单而且使意义更为 明确,因而增强了可读性。

- 数组类型

```c showLineNumbers
typedef char NAME[20]; // 表示NAME是字符数组类型,数组长度为20。然后可用NAME 说明变量,
NAME a; // 等价于 char a[20];
```

- 结构体类型

* 第一种形式:

```c showLineNumbers
 struct Person{
    int age;
    char *name;
};

typedef struct Person PersonType;
```

    + 第二种形式:

```c showLineNumbers
typedef struct Person{
    int age;
    char *name;
} PersonType;
```

    + 第三种形式:

```c showLineNumbers
typedef struct {
    int age;
    char *name;
} PersonType;
```

- 枚举

* 第一种形式:

```c showLineNumbers
enum Sex{
    SexMan,
    SexWoman,
    SexOther
};
typedef enum Sex SexType;
```

    + 第二种形式:

```c showLineNumbers
typedef enum Sex{
    SexMan,
    SexWoman,
    SexOther
} SexType;
```

    + 第三种形式:

```c showLineNumbers
typedef enum{
    SexMan,
    SexWoman,
    SexOther
} SexType;
```

- 指针

* typedef 与指向结构体的指针

```c showLineNumbers
 // 定义一个结构体并起别名
  typedef struct {
      float x;
      float y;
  } Point;

 // 起别名
 typedef Point *PP;

```

- typedef 与指向函数的指针

```c showLineNumbers
// 定义一个sum函数，计算a跟b的和
  int sum(int a, int b) {
      int c = a + b;
      printf("%d + %d = %d", a, b, c);
      return c;
 }
 typedef int (*MySum)(int, int);

// 定义一个指向sum函数的指针变量p
 MySum p = sum;
```

## 宏定义与函数以及 typedef 区别

- 与函数的区别

* 从整个使用过程可以发现，带参数的宏定义，在源程序中出现的形式与函数很像。但是两者是有本质区别的：
* 1> 宏定义不涉及存储空间的分配、参数类型匹配、参数传递、返回值问题
* 2> 函数调用在程序运行时执行，而宏替换只在编译预处理阶段进行。所以带参数的宏比函数具有更高的执行效率

- typedef 和#define 的区别

* 用宏定义表示数据类型和用 typedef 定义数据说明符的区别。
* 宏定义只是简单的字符串替换,￼ 是在预处理完成的
* typedef 是在编译时处理的,它不是作简单的代换,而是对类型说明符 ￼ 重新命名。被命名的标识符具有类型定义说明的功能

```c showLineNumbers
typedef char *String;
int main(int argc, const char * argv[])
{
     String str = "This is a string!";
     return 0;
}


#define String char *
int main(int argc, const char * argv[])
{
    String str = "This is a string!";
     return 0;
}
```

```c showLineNumbers
typedef char *String1; // 给char *起了个别名String1
#define String2 char * // 定义了宏String2
int main(int argc, const char * argv[]) {
        /*
        只有str1、str2、str3才是指向char类型的指针变量
        由于String1就是char *，所以上面的两行代码等于:
        char *str1;
        char *str2;
        */
      String1 str1, str2;
        /*
        宏定义只是简单替换, 所以相当于
        char *str3, str4;
        *号只对最近的一个有效, 所以相当于
        char *str3;
        char str4;
        */
      String2 str3, str4;
      return 0;
}
```

## const 关键字

- const 是一个类型修饰符

* 使用 const 修饰变量则可以让变量的值不能改变
  ##const 有什么主要的作用?

- (1)可以定义 const 常量,具有不可变性

```c showLineNumbers
const int Max=100;
int Array[Max];
```

- (2)便于进行类型检查,使编译器对处理内容有更多了解,消除了一些隐患。

```c showLineNumbers
 void f(const int i) { .........}
```

- 编译器就会知道 i 是一个常量,不允许修改;

* (3)可以避免意义模糊的数字出现,同样可以很方便地进行参数的调整和修改。 同宏定义一样,可以做到不变则已,一变都变!如(1)中,如果想修改 Max 的内容,只需要:const int Max=you want;即可!

* (4)可以保护被修饰的东西,防止意外的修改,增强程序的健壮性。 还是上面的例子,如果在 函数体内修改了 i,编译器就会报错;

```c showLineNumbers
void f(const int i) { i=10;//error! }
```

- (5) 可以节省空间,避免不必要的内存分配。

```c showLineNumbers
#define PI 3.14159 //常量宏
const doulbe Pi=3.14159; //此时并未将Pi放入ROM中 ...... double i=Pi; //此时为Pi分配内存,以后不再分配!
double I=PI; //编译期间进行宏替换,分配内存
double j=Pi; //没有内存分配
double J=PI; //再进行宏替换,又一次分配内存! const定义常量从汇编的角度来看,只是给出了对应的内存地址,而不是象#define一样给出的是立即数,所以,const定义的常量在程序运行过程中只有一份拷贝,而#define定义的常量在内存 中有若干个拷贝。
```

- (6) 􏰀 高了效率。编译器通常不为普通 const 常量分配存储空间,而是将它们保存在符号表 中,这使得它成为一个编译期间的常量,没有了存储与读内存的操作,使得它的效率也很高。

---

## 如何使用 const?

- (1)修饰一般常量一般常量是指简单类型的常量。这种常量在定义时,修饰符 const 可以用在类型说明符前,也可以用在类型说明符后

```c showLineNumbers
int const x=2; 或 const int x=2;
```

- (当然,我们可以偷梁换柱进行更新: 通过强制类型转换,将地址赋给变量,再作修改即可以改变 const 常量值。)

```c showLineNumbers
    // const对于基本数据类型, 无论写在左边还是右边, 变量中的值不能改变
    const int a = 5;
    // a = 666; // 直接修改会报错
    // 偷梁换柱, 利用指针指向变量
    int *p;
    p = &a;
    // 利用指针间接修改变量中的值
    *p = 10;
    printf("%d\n", a);
    printf("%d\n", *p);
```

- (2)修饰常数组(值不能够再改变了)定义或说明一个常数组可采用如下格式:

```c showLineNumbers
int const a[5]={1, 2, 3, 4, 5};
const int a[5]={1, 2, 3, 4, 5};
```

```
const int a[5]={1, 2, 3, 4, 5};
a[1] = 55; // 错误
```

- (3)修饰函数的常参数 const 修饰符也可以修饰函数的传递参数,格式如下:void Fun(const int Var); 告诉编译器 Var 在函数体中的无法改变,从而防止了使用者的一些无 意的或错误的修改。

- (4)修饰函数的返回值: const 修饰符也可以修饰函数的返回值,是返回值不可被改变,格式如 下:

```c showLineNumbers
const int Fun1();
const MyClass Fun2();
```

- (5)修饰常指针

  - const int \*A; //const 修饰指针,A 可变,A 指向的值不能被修改
  - int const \*A; //const 修饰指向的对象,A 可变,A 指向的对象不可变
  - int \*const A; //const 修饰指针 A, A 不可变,A 指向的对象可变
  - const int \*const A;//指针 A 和 A 指向的对象都不可变

- 技巧

```c showLineNumbers
 先看“*”的位置
 如果const 在 *的左侧 表示值不能修改,但是指向可以改。
 如果const 在 *的右侧 表示指向不能改,但是值可以改
 如果在“*”的两侧都有const 标识指向和值都不能改。
```

## 内存管理

## 进程空间

- 程序，是经源码编译后的可执行文件，可执行文件可以多次被执行，比如我们可以多次打开 office。
- 而进程，是程序加载到内存后开始执行，至执行结束，这样一段时间概念，多次打开的 wps,每打开一次都是一个进程，当我们每关闭一个 office，则表示该进程结束。
- 程序是静态概念，而进程动态/时间概念。 ###进程空间图示
  有了进程和程序的概念以后，我们再来看一下，程序被加载到内存以后内存空间布局是什么样的
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/5d2e966e95f1518585804e57779e7fe6.png)

---

## 栈内存(Stack)

- 栈中存放任意类型的变量，但必须是 auto 类型修饰的，即自动类型的局部变量， 随用随开，用完即消。
- 内存的分配和销毁系统自动完成，不需要人工干预
- 栈的最大尺寸固定，超出则引起栈溢出

* 局部变量过多，过大 或 递归层数太多等就会导致栈溢出

```c showLineNumbers
int ages[10240*10240]; // 程序会崩溃, 栈溢出
```

```c showLineNumbers
#include <stdio.h>

int main()
{
    // 存储在栈中, 内存地址从大到小
    int a = 10;
    int b = 20;
    printf("&a = %p\n", &a); // &a = 0060FEAC
    printf("&b = %p\n", &b); // &b = 0060FEA8

    return 0;
}
```

---

## 堆内存(Heap)

- 堆内存可以存放任意类型的数据，但需要自己申请与释放
- 堆大小，想像中的无穷大，但实际使用中，受限于实际内存的大小和内存是否连续性

```c showLineNumbers
int *p = (int *)malloc(10240 * 1024); // 不一定会崩溃
```

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>

int main()
{
    // 存储在栈中, 内存地址从小到大
    int *p1 = malloc(4);
    *p1 = 10;
    int *p2 = malloc(4);
    *p2 = 20;

    printf("p1 = %p\n", p1); //  p1 = 00762F48
    printf("p2 = %p\n", p2); // p2 = 00762F58

    return 0;
}
```

## malloc 函数

| 函数声明           | void \* malloc(size_t \_Size);                         |
| ------------------ | ------------------------------------------------------ |
| 所在文件           | stdlib.h                                               |
| 函数功能           | 申请堆内存空间并返回,所申请的空间并未初始化。          |
| 常见的初始化方法是 | memset 字节初始化。                                    |
| 参数及返回解析     |                                                        |
| 参数               | size_t \_size 表示要申请的字符数                       |
| 返回值             | void \* 成功返回非空指针指向申请的空间 ，失败返回 NULL |

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    /*
     * malloc
     * 第一个参数: 需要申请多少个字节空间
     * 返回值类型: void *
     */
    int *p = (int *)malloc(sizeof(int));
    printf("p = %i\n", *p); // 保存垃圾数据
    /*
     * 第一个参数: 需要初始化的内存地址
     * 第二个初始: 需要初始化的值
     * 第三个参数: 需要初始化对少个字节
     */
    memset(p, 0, sizeof(int)); // 对申请的内存空间进行初始化
    printf("p = %i\n", *p); // 初始化为0
    return 0;
}
```

## free 函数

- 注意: 通过 malloc 申请的存储空间一定要释放, 所以 malloc 和 free 函数总是成对出现

| 函数声明       | void free(void \*p);        |
| -------------- | --------------------------- |
| 所在文件       | stdlib.h                    |
| 函数功能       | 释放申请的堆内存            |
| 参数及返回解析 |                             |
| 参数           | void\* p 指向手动申请的空间 |
| 返回值         | void 无返回                 |

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 1.申请4个字节存储空间
    int *p = (int *)malloc(sizeof(int));
    // 2.初始化4个字节存储空间为0
    memset(p, 0, sizeof(int));
    // 3.释放申请的存储空间
    free(p);
    return 0;
}
```

## calloc 函数

| 函数声明       | void \*calloc(size_t nmemb, size_t size);              |
| -------------- | ------------------------------------------------------ |
| 所在文件       | stdlib.h                                               |
| 函数功能       | 申请堆内存空间并返回，所申请的空间，自动清零           |
| 参数及返回解析 |                                                        |
| 参数           | size_t nmemb 所需内存单元数量                          |
| 参数           | size_t size 内存单元字节数量                           |
| 返回值         | void \* 成功返回非空指针指向申请的空间 ，失败返回 NULL |

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    /*
    // 1.申请3块4个字节存储空间
    int *p = (int *)malloc(sizeof(int) * 3);
    // 2.使用申请好的3块存储空间
    p[0] = 1;
    p[1] = 3;
    p[2] = 5;
    printf("p[0] = %i\n", p[0]);
    printf("p[1] = %i\n", p[1]);
    printf("p[2] = %i\n", p[2]);
    // 3.释放空间
    free(p);
    */

    // 1.申请3块4个字节存储空间
    int *p = calloc(3, sizeof(int));
    // 2.使用申请好的3块存储空间
    p[0] = 1;
    p[1] = 3;
    p[2] = 5;
    printf("p[0] = %i\n", p[0]);
    printf("p[1] = %i\n", p[1]);
    printf("p[2] = %i\n", p[2]);
    // 3.释放空间
    free(p);

    return 0;
}
```

## realloc 函数

| 函数声明       | void *realloc(void *ptr, size_t size);                                                |
| -------------- | ------------------------------------------------------------------------------------- |
| 所在文件       | stdlib.h                                                                              |
| 函数功能       | 扩容(缩小)原有内存的大小。通常用于扩容，缩小会会导致内存缩去的部分数据丢失。          |
| 参数及返回解析 |                                                                                       |
| 参数           | void \* ptr 表示待扩容(缩小)的指针， ptr 为之前用 malloc 或者 calloc 分配的内存地址。 |
| 参数           | size_t size 表示扩容(缩小)后内存的大小。                                              |
| 返回值         | void\* 成功返回非空指针指向申请的空间 ，失败返回 NULL。                               |

- 注意点:
  - 若参数 ptr==NULL，则该函数等同于 malloc
  - 返回的指针，可能与 ptr 的值相同，也有可能不同。若相同，则说明在原空间后面申请，否则，则可能后续空间不足，重新申请的新的连续空间，原数据拷贝到新空间， 原有空间自动释放

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 1.申请4个字节存储空间
    int *p = NULL;
    p = realloc(p, sizeof(int)); // 此时等同于malloc
    // 2.使用申请好的空间
    *p = 666;
    printf("*p = %i\n",  *p);
    // 3.释放空间
    free(p);

    return 0;
}
```

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 1.申请4个字节存储空间
    int *p = malloc(sizeof(int));
    printf("p = %p\n", p);
    // 如果能在传入存储空间地址后面扩容, 返回传入存储空间地址
    // 如果不能在传入存储空间地址后面扩容, 返回一个新的存储空间地址
    p = realloc(p, sizeof(int) * 2);
    printf("p = %p\n", p);
    // 2.使用申请好的空间
    *p = 666;
    printf("*p = %i\n",  *p);
    // 3.释放空间
    free(p);

    return 0;
}
```

## 链表

- 链表实现了，内存零碎数据的有效组织。比如，当我们用 malloc 来进行内存申请的时候，当内存足够，但是由于碎片太多，没有连续内存时，只能以申请失败而告终，而用链表这种数据结构来组织数据，就可以解决上类问题。
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/eba20792779d9d9a99e7d4ff0d23ef13.png)

## 静态链表

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/44a5722c917071e937da435fe5695a26.png)

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1.定义链表节点
typedef struct node{
    int data;
    struct node *next;
}Node;
int main()
{

    // 2.创建链表节点
    Node a;
    Node b;
    Node c;

    // 3.初始化节点数据
    a.data = 1;
    b.data = 3;
    c.data = 5;

    // 4.链接节点
    a.next = &b;
    b.next = &c;
    c.next = NULL;

    // 5.创建链表头
    Node *head = &a;

    // 6.使用链表
    while(head != NULL){
        int currentData = head->data;
        printf("currentData = %i\n", currentData);
        head = head->next;
    }
    return 0;
}
```

## 动态链表

- 静态链表的意义不是很大，主要原因，数据存储在栈上，栈的存储空间有限，不能动态分配。所以链表要实现存储的自由，要动态的申请堆里的空间。
- 有一个点要说清楚，我们的实现的链表是带头节点。至于，为什么带头节点，需等大家对链表有个整体的的认知以后，再来体会，会更有意义。

- 空链表

* 头指针带了一个空链表节点, 空链表节点中的 next 指向 NULL
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/21a038cfb75cce739e0f1d333126db74.png)

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>

// 1.定义链表节点
typedef struct node{
    int data;
    struct node *next;
}Node;
int main()
{
    Node *head = createList();
    return 0;
}
// 创建空链表
Node *createList(){
    // 1.创建一个节点
    Node *node = (Node *)malloc(sizeof(Node));
    if(node == NULL){
        exit(-1);
    }
    // 2.设置下一个节点为NULL
    node->next = NULL;
    // 3.返回创建好的节点
    return node;
}
```

- 非空链表

* 头指针带了一个非空节点, 最后一个节点中的 next 指向 NULL
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/4f238221615ee2ef930526bd53cdc0ef.png)

## 动态链表头插法

- 1.让新节点的下一个节点等于头结点的下一个节点
- 2.让头节点的下一个节点等于新节点

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>

// 1.定义链表节点
typedef struct node{
    int data;
    struct node *next;
}Node;
Node *createList();
void printNodeList(Node *node);
int main()
{
    Node *head = createList();
    printNodeList(head);
    return 0;
}
/**
 * @brief createList 创建链表
 * @return  创建好的链表
 */
Node *createList(){
    // 1.创建头节点
    Node *head = (Node *)malloc(sizeof(Node));
    if(head == NULL){
        return NULL;
    }
    head->next = NULL;

    // 2.接收用户输入数据
    int num = -1;
    printf("请输入节点数据\n");
    scanf("%i", &num);

    // 3.通过循环创建其它节点
    while(num != -1){
        // 3.1创建一个新的节点
        Node *cur = (Node *)malloc(sizeof(Node));
        cur->data = num;

        // 3.2让新节点的下一个节点指向头节点的下一个节点
        cur->next = head->next;
        // 3.3让头节点的下一个节点指向新节点
        head->next = cur;

        // 3.4再次接收用户输入数据
        scanf("%i", &num);
    }

    // 3.返回创建好的节点
    return head;
}
/**
 * @brief printNodeList 遍历链表
 * @param node 链表指针头
 */
void printNodeList(Node *node){
    Node *head = node->next;
    while(head != NULL){
        int currentData = head->data;
        printf("currentData = %i\n", currentData);
        head = head->next;
    }
}
```

## 动态链表尾插法

- 1.定义变量记录新节点的上一个节点
- 2.将新节点添加到上一个节点后面
- 3.让新节点成为下一个节点的上一个节点

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>

// 1.定义链表节点
typedef struct node{
    int data;
    struct node *next;
}Node;
Node *createList();
void printNodeList(Node *node);
int main()
{
    Node *head = createList();
    printNodeList(head);
    return 0;
}
/**
 * @brief createList 创建链表
 * @return  创建好的链表
 */
Node *createList(){
    // 1.创建头节点
    Node *head = (Node *)malloc(sizeof(Node));
    if(head == NULL){
        return NULL;
    }
    head->next = NULL;

    // 2.接收用户输入数据
    int num = -1;
    printf("请输入节点数据\n");
    scanf("%i", &num);

    // 3.通过循环创建其它节点
    // 定义变量记录上一个节点
    Node *pre = head;
    while(num != -1){
        // 3.1创建一个新的节点
        Node *cur = (Node *)malloc(sizeof(Node));
        cur->data = num;

        // 3.2让新节点链接到上一个节点后面
        pre->next = cur;
        // 3.3当前节点下一个节点等于NULL
        cur->next = NULL;
        // 3.4让当前节点编程下一个节点的上一个节点
        pre = cur;

        // 3.5再次接收用户输入数据
        scanf("%i", &num);
    }

    // 3.返回创建好的节点
    return head;
}
/**
 * @brief printNodeList 遍历链表
 * @param node 链表指针头
 */
void printNodeList(Node *node){
    Node *head = node->next;
    while(head != NULL){
        int currentData = head->data;
        printf("currentData = %i\n", currentData);
        head = head->next;
    }
}
```

## 动态链优化

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>

// 1.定义链表节点
typedef struct node{
    int data;
    struct node *next;
}Node;
Node *createList();
void printNodeList(Node *node);
void insertNode1(Node *head, int data);
void insertNode2(Node *head, int data);
int main()
{
    // 1.创建一个空链表
    Node *head = createList();
    // 2.往空链表中插入数据
    insertNode1(head, 1);
    insertNode1(head, 3);
    insertNode1(head, 5);
    printNodeList(head);
    return 0;
}
/**
 * @brief createList 创建空链表
 * @return  创建好的空链表
 */
Node *createList(){
    // 1.创建头节点
    Node *head = (Node *)malloc(sizeof(Node));
    if(head == NULL){
        return NULL;
    }
    head->next = NULL;
    // 3.返回创建好的节点
    return head;
}
/**
 * @brief insertNode1 尾插法插入节点
 * @param head 需要插入的头指针
 * @param data 需要插入的数据
 * @return  插入之后的链表
 */
void insertNode1(Node *head, int data){
    // 1.定义变量记录最后一个节点
    Node *pre = head;
    while(pre != NULL && pre->next != NULL){
        pre = pre->next;
    }
    // 2.创建一个新的节点
    Node *cur = (Node *)malloc(sizeof(Node));
    cur->data = data;

    // 3.让新节点链接到上一个节点后面
    pre->next = cur;
    // 4.当前节点下一个节点等于NULL
    cur->next = NULL;
    // 5.让当前节点编程下一个节点的上一个节点
    pre = cur;
}
/**
 * @brief insertNode1 头插法插入节点
 * @param head 需要插入的头指针
 * @param data 需要插入的数据
 * @return  插入之后的链表
 */
void insertNode2(Node *head, int data){
    // 1.创建一个新的节点
    Node *cur = (Node *)malloc(sizeof(Node));
    cur->data = data;

    // 2.让新节点的下一个节点指向头节点的下一个节点
    cur->next = head->next;
    // 3.让头节点的下一个节点指向新节点
    head->next = cur;
}
/**
 * @brief printNodeList 遍历链表
 * @param node 链表指针头
 */
void printNodeList(Node *node){
    Node *head = node->next;
    while(head != NULL){
        int currentData = head->data;
        printf("currentData = %i\n", currentData);
        head = head->next;
    }
}
```

## 链表销毁

```c showLineNumbers
/**
 * @brief destroyList 销毁链表
 * @param head 链表头指针
 */
void destroyList(Node *head){
    Node *cur = NULL;
    while(head != NULL){
        cur = head->next;
        free(head);
        head = cur;
    }
}
```

## 链表长度计算

```c showLineNumbers
/**
 * @brief listLength 计算链表长度
 * @param head 链表头指针
 * @return 链表长度
 */
int listLength(Node *head){
    int count = 0;
    head = head->next;
    while(head){
       count++;
       head = head->next;
    }
    return count;
}
```

## 链表查找

```c showLineNumbers
/**
 * @brief searchList 查找指定节点
 * @param head 链表头指针
 * @param key 需要查找的值
 * @return
 */
Node *searchList(Node *head, int key){
    head = head->next;
    while(head){
        if(head->data == key){
            break;
        }else{
            head = head->next;
        }
    }
    return head;
}
```

## 链表删除

```c showLineNumbers
void deleteNodeList(Node *head, Node *find){
    while(head->next != find){
        head = head->next;
    }
    head->next = find->next;
    free(find);
}
```

## 作业

- 给链表排序

```c showLineNumbers
/**
 * @brief bubbleSort 对链表进行排序
 * @param head 链表头指针
 */
void bubbleSort(Node *head){
    // 1.计算链表长度
    int len = listLength(head);
    // 2.定义变量记录前后节点
    Node *cur = NULL;
   // 3.相邻元素进行比较, 进行冒泡排序
    for(int i = 0; i < len - 1; i++){
        cur = head->next;
        for(int j = 0; j < len - 1 - i; j++){
            printf("%i, %i\n", cur->data, cur->next->data);
            if((cur->data) > (cur->next->data)){
                int temp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = temp;
            }
            cur = cur->next;
        }
    }
}
```

```c showLineNumbers
/**
 * @brief sortList 对链表进行排序
 * @param head 链表头指针
 */
void sortList(Node *head){
    // 0.计算链表长度
    int len = listLength(head);
    // 1.定义变量保存前后两个节点
    Node *sh, *pre, *cur;
    for(int i = 0; i < len - 1; i ++){
        sh = head; // 头节点
        pre = sh->next; // 第一个节点
        cur = pre->next; // 第二个节点
        for(int j = 0; j < len - 1 - i; j++){
            if(pre->data > cur->data){
                // 交换节点位置
                sh->next = cur;
                pre->next = cur->next;
                cur->next = pre;
                // 恢复节点名称
                Node *temp = pre;
                pre = cur;
                cur = temp;
            }
            // 让所有节点往后移动
            sh = sh->next;
            pre = pre->next;
            cur = cur->next;
        }
    }
}
```

- 链表反转

```c showLineNumbers
/**
 * @brief reverseList 反转链表
 * @param head 链表头指针
 */
void reverseList(Node *head){
    // 1.将链表一分为二
    Node *pre, *cur;
    pre = head->next;
    head->next = NULL;
    // 2.重新插入节点
    while(pre){
        cur = pre->next;
        pre->next = head->next;
        head->next = pre;

        pre = cur;
    }
}
```

## 文件基本概念

- 文件流:

* C 语言把文件看作是一个字符的序列，即文件是由一个一个字符组成的字符流，因此 c 语言将文件也称之为文件流。

- 文件分类

* 文本文件
* 以 ASCII 码格式存放，**一个字节存放一个字符**。` 文本文件的每一个字节存放一个 ASCII 码，代表一个字符`。这便于对字符的逐个处理，但占用存储空间
  较多，而且要花费时间转换。
* .c 文件就是以文本文件形式存放的

* 二进制文件
* 以补码格式存放。二进制文件是把数据以二进制数的格式存放在文件中的，其占用存储空间较少。`数据按其内存中的存储形式原样存放`
* .exe 文件就是以二进制文件形式存放的

---

- **文本文件和二进制文件示例**

* 下列代码暂时不要求看懂, 主要理解什么是文本文件什么是二进制文件

```c showLineNumbers
#include <stdio.h>

int main()
{
    /*
     * 以文本形式存储
     * 会将每个字符先转换为对应的ASCII,
     * 然后再将ASCII码的二进制存储到计算机中
     */
    int num = 666;
    FILE *fa = fopen("ascii.txt", "w");
    fprintf(fa, "%d", num);
    fclose(fa);

    /*
     * 以二进制形式存储
     * 会将666的二进制直接存储到文件中
     */
    FILE *fb = fopen("bin.txt", "w");
    fwrite(&num, 4, 1, fb);
    fclose(fb);

    return 0;
}
```

- 内存示意图
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/a989b57283bdbcd82ae8bfb0c6fb4b8d.png)

- 通过文本工具打开示意图
  ![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/61ccbc31fd2ed870fde8de4598d52ee3.png)

> - 文本工具默认会按照 ASCII 码逐个直接解码文件, 由于文本文件存储的就是 ASCII 码, 所以可以正常解析显示, 由于二进制文件存储的不是 ASCII 码, 所以解析出来之后是乱码

## 文件的打开和关闭

- FILE 结构体

* FILE 结构体是对缓冲区和文件读写状态的记录者，所有对文件的操作，都是通过 FILE 结构体完成的。

```c showLineNumbers
  struct _iobuf {
    char *_ptr;  //文件输入的下一个位置
    int _cnt;  //当前缓冲区的相对位置
    char *_base; //文件的起始位置)
    int _flag; //文件标志
    int _file;  //文件的有效性验证
    int _charbuf; //检查缓冲区状况,如果无缓冲区则不读取
    int _bufsiz; // 缓冲区大小
    char *_tmpfname; //临时文件名
  };
  typedef struct _iobuf FILE;
```

---

- fileopen 函数

| 函数声明 | FILE _ fopen ( const char _ filename, const char \* mode );                              |
| -------- | ---------------------------------------------------------------------------------------- |
| 所在文件 | stdio.h                                                                                  |
| 函数功能 | 以 mode 的方式，打开一个 filename 命名的文件，返回一个指向该文件缓冲的 FILE 结构体指针。 |

|参数及返回解析
|参数| char*filaname :要打开，或是创建文件的路径。|
|参数| char*mode :打开文件的方式。|
|返回值| FILE\* 返回指向文件缓冲区的指针，该指针是后序操作文件的句柄。|

| mode | 处理方式  | 当文件不存在时 | 当文件存在时     | 向文件输入 | 从文件输出 |
| ---- | --------- | -------------- | ---------------- | ---------- | ---------- |
| r    | 读取      | 出错           | 打开文件         | 不能       | 可以       |
| w    | 写入      | 建立新文件     | 覆盖原有文件     | 可以       | 不能       |
| a    | 追加      | 建立新文件     | 在原有文件后追加 | 可以       | 不能       |
| r+   | 读取/写入 | 出错           | 打开文件         | 可以       | 可以       |
| w+   | 写入/读取 | 建立新文件     | 覆盖原有文件     | 可以       | 可以       |
| a+   | 读取/追加 | 建立新文件     | 在原有文件后追加 | 可以       | 可以       |

> 注意点:
>
> - Windows 如果读写的是二进制文件，则还要加 b,比如 rb, r+b 等。 unix/linux 不区分文本和二进制文件

---

- fclose 函数

| 函数声明       | int fclose ( FILE \* stream );                                 |
| -------------- | -------------------------------------------------------------- |
| 所在文件       | stdio.h                                                        |
| 函数功能       | fclose()用来关闭先前 fopen()打开的文件.                        |
| 函数功能       | 此动作会让缓冲区内的数据写入文件中, 并释放系统所提供的文件资源 |
| 参数及返回解析 |                                                                |
| 参数           | FILE\* stream :指向文件缓冲的指针。                            |
| 返回值         | int 成功返回 0 ，失败返回 EOF(-1)。                            |

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    fclose(fp);
    return 0;
}
```

--

## 一次读写一个字符

- 写入

| 函数声明       | int fputc (int ch, FILE \* stream );                 |
| -------------- | ---------------------------------------------------- |
| 所在文件       | stdio.h                                              |
| 函数功能       | 将 ch 字符，写入文件。                               |
| 参数及返回解析 |                                                      |
| 参数           | FILE\* stream :指向文件缓冲的指针。                  |
| 参数           | int : 需要写入的字符。                               |
| 返回值         | int 写入成功，返回写入成功字符，如果失败，返回 EOF。 |

```c showLineNumbers
#include <stdio.h>

int main()
{
    // 1.打开一个文件
    FILE *fp = fopen("test.txt", "w+");

    // 2.往文件中写入内容
    for(char ch = 'a'; ch <= 'z'; ch++){
        // 一次写入一个字符
        char res = fputc(ch, fp);
        printf("res = %c\n", res);
    }

    // 3.关闭打开的文件
    fclose(fp);
    return 0;
}
```

- 读取

| 函数声明       | int fgetc ( FILE \* stream );                          |
| -------------- | ------------------------------------------------------ |
| 所在文件       | stdio.h                                                |
| 函数功能       | 从文件流中读取一个字符并返回。                         |
| 参数及返回解析 |                                                        |
| 参数           | FILE\* stream :指向文件缓冲的指针。                    |
| 返回值         | int 正常，返回读取的字符；读到文件尾或出错时，为 EOF。 |

```c showLineNumbers
#include <stdio.h>

int main()
{
    // 1.打开一个文件
    FILE *fp = fopen("test.txt", "r+");

    // 2.从文件中读取内容
    char res = EOF;
    while((res = fgetc(fp)) != EOF){
        printf("res = %c\n", res);
    }

    // 3.关闭打开的文件
    fclose(fp);
    return 0;
}
```

- 判断文件末尾
  - feof 函数

| 函数声明       | int feof( FILE \* stream );               |
| -------------- | ----------------------------------------- |
| 所在文件       | stdio.h                                   |
| 函数功能       | 判断文件是否读到文件结尾                  |
| 参数及返回解析 |                                           |
| 参数           | FILE\* stream :指向文件缓冲的指针。       |
| 返回值         | int 0 未读到文件结尾，非零 读到文件结尾。 |

```c showLineNumbers
#include <stdio.h>

int main()
{
    // 1.打开一个文件
    FILE *fp = fopen("test.txt", "r+");

    // 2.从文件中读取内容
    char res = EOF;
    // 注意: 由于只有先读了才会修改标志位,
    // 所以通过feof判断是否到达文件末尾, 一定要先读再判断, 不能先判断再读
    while((res = fgetc(fp)) && (!feof(fp))){
        printf("res = %c\n", res);
    }

    // 3.关闭打开的文件
    fclose(fp);
    return 0;
}
```

> - 注意点:
> - feof 这个函数，是去读标志位判断文件是否结束的。
> - 而标志位只有读完了才会被修改, 所以如果先判断再读标志位会出现多打一次的的现象
> - 所以企业开发中使用 feof 函数一定要先读后判断, 而不能先判断后读

- 作业

* 实现文件的简单加密和解密

```c showLineNumbers
#include <stdio.h>
#include <string.h>
void encode(char *name, char *newName, int code);
void decode(char *name, char *newName, int code);
int main()
{
    encode("main.c", "encode.c", 666);
    decode("encode.c", "decode.c", 666);
    return 0;
}
/**
 * @brief encode 加密文件
 * @param name 需要加密的文件名称
 * @param newName 加密之后的文件名称
 * @param code 秘钥
 */
void encode(char *name, char *newName, int code){
    FILE *fw = fopen(newName, "w+");
    FILE *fr = fopen(name, "r+");
    char ch = EOF;
    while((ch = fgetc(fr)) && (!feof(fr))){
        fputc(ch ^ code, fw);
    }
    fclose(fw);
    fclose(fr);
}
/**
 * @brief encode 解密文件
 * @param name 需要解密的文件名称
 * @param newName 解密之后的文件名称
 * @param code 秘钥
 */
void decode(char *name, char *newName, int code){
    FILE *fw = fopen(newName, "w+");
    FILE *fr = fopen(name, "r+");
    char ch = EOF;
    while((ch = fgetc(fr)) && (!feof(fr))){
        fputc(ch ^ code, fw);
    }
    fclose(fw);
    fclose(fr);
}
```

---

## 一次读写一行字符

- 什么是行

* 行是文本编辑器中的概念，文件流中就是一个字符。这个在不同的平台是有差异的。window 平台 '\r\n'，linux 平台是'\n'

- 平台差异

* windows 平台在写入'\n'是会体现为'\r\n'，linux 平台在写入'\n'时会体现为'\n'。windows 平台在读入'\r\n'时，体现为一个字符'\n'，linux 平台在读入'\n'时，体现为一个字符'\n'
* linux 读 windows 中的换行，则会多读一个字符，windows 读 linux 中的换行，则没有问题

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fw = fopen("test.txt", "w+");
    fputc('a', fw);
    fputc('\n', fw);
    fputc('b', fw);
    fclose(fw);
    return 0;
}
```

![](https://images.weserv.nl/?url=https://img-blog.csdnimg.cn/img_convert/1d80c69a41198813f0bb19cef89b74ea.png)

---

- 写入一行

| 函数声明       | int fputs(char *str,FILE *fp)             |
| -------------- | ----------------------------------------- |
| 所在文件       | stdio.h                                   |
| 函数功能       | 把 str 指向的字符串写入 fp 指向的文件中。 |
| 参数及返回解析 |                                           |
| 参数           | char \* str : 表示指向的字符串的指针。    |
| 参数           | FILE \*fp : 指向文件流结构的指针。        |
| 返回值         | int 正常，返 0；出错返 EOF。              |

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fw = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("lnj\n", fw);
    fputs("it666\n", fw);
    fclose(fw);
    return 0;
}
```

- 遇到\0 自动终止写入

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs写入时遇到\0就会自动终止写入
    fputs("lnj\0it666\n", fp);

    fclose(fp);
    return 0;
}
```

---

- 读取一行

| 函数声明       | char *fgets(char *str,int length,FILE \*fp)                                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 所在文件       | stdio.h                                                                                                                                                         |
| 函数功能       | 从 fp 所指向的文件中，至多读 length-1 个字符，送入字符数组 str 中， 如果在读入 length-1 个字符结束前遇\n 或 EOF，读入即结束，字符串读入后在最后加一个‘\0’字符。 |
| 参数及返回解析 |                                                                                                                                                                 |
| 参数           | char \* str :指向需要读入数据的缓冲区。                                                                                                                         |
| 参数           | int length :每一次读数字符的字数。                                                                                                                              |
| 参数           | FILE\* fp :文件流指针。                                                                                                                                         |
| 返回值         | char \* 正常，返 str 指针；出错或遇到文件结尾 返空指针 NULL。                                                                                                   |

- 最多只能读取 N-1 个字符

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("it666\n", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 从fp中读取4个字符, 存入到str中
    // 最多只能读取N-1个字符, 会在最后自动添加\0
    fgets(str, 4, fp);

    printf("str = %s", str); // it6
    fclose(fp);
    return 0;
}
```

- 遇到\n 自动结束

```c showLineNumbers
#include <stdio.h>
int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("lnj\n", fp);
    fputs("it666\n", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 从fp中读取1024个字符, 存入到str中
    // 但是读到第4个就是\n了, 函数会自动停止读取
    // 注意点: \n会被读取进来
    fgets(str, 1024, fp);

    printf("str = %s", str); // lnj
    fclose(fp);
    return 0;
}
```

- 读取到 EOF 自动结束

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("lnj\n", fp);
    fputs("it666", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 每次从fp中读取1024个字符, 存入到str中
    // 读取到文件末尾自动结束
    while(fgets(str, 1024, fp)){
        printf("str = %s", str);
    }
    fclose(fp);
    return 0;
}
```

- 注意点:
  - 企业开发中能不用 feof 函数就不用 feof 函数
  - 如果最后一行，没有行‘\n’的话则少读一行

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    // 注意: fputs不会自动添加\n
    fputs("12345678910\n", fp);
    fputs("12345678910\n", fp);
    fputs("12345678910", fp);

    // 将FILE结构体中的读写指针重新移动到最前面
    // 注意: FILE结构体中读写指针每读或写一个字符后都会往后移动
    rewind(fp);
    char str[1024];
    // 每次从fp中读取1024个字符, 存入到str中
    // 读取到文件末尾自动结束
    while(fgets(str, 1024, fp) && !feof(fp)){
        printf("str = %s", str);
    }
    fclose(fp);
    return 0;
}
```

- 作业:
  - 利用 fgets(str, 5, fp)读取下列文本会读取多少次?

```bash showLineNumbers
12345678910
12345
123
```

---

## 一次读写一块数据

- C 语言己经从接口的层面区分了，文本的读写方式和二进制的读写方式。前面我们讲的是文本的读写方式。
- 所有的文件接口函数，要么以 '\0'，表示输入结束，要么以 '\n'， EOF(0xFF)表示读取结束。 '\0' '\n' 等都是文本文件的重要标识，而所有的二进制接口对于这些标识，是不敏感的。 +二进制的接口可以读文本，而文本的接口不可以读二进制

* 一次写入一块数据

| 函数声明 | int fwrite(void *buffer, int num_bytes, int count, FILE *fp) |
| -------- | ------------------------------------------------------------ |
| 所在文件 | stdio.h                                                      |
| 函数功能 | 把 buffer 指向的数据写入 fp 指向的文件中                     |
| 参数     | char \* buffer : 指向要写入数据存储区的首地址的指针          |
|          | int num_bytes: 每个要写的字段的字节数 count                  |
|          | int count : 要写的字段的个数                                 |
|          | FILE\* fp : 要写的文件指针                                   |
| 返回值   | int 成功，返回写的字段数；出错或文件结束，返回 0。           |

```c showLineNumbers
#include <stdio.h>
#include <string.h>

int main()
{
    FILE *fp = fopen("test.txt", "wb+");
    // 注意: fwrite不会关心写入数据的格式
    char *str = "lnj\0it666";
     /*
     * 第一个参数: 被写入数据指针
     * 第二个参数: 每次写入多少个字节
     * 第三个参数: 需要写入多少次
     * 第四个参数: 已打开文件结构体指针
     */
    fwrite((void *)str, 9, 1, fp);

    fclose(fp);
    return 0;
}
```

- 一次读取一块数据

| 函数声明 | int fread(void *buffer, int num_bytes, int count, FILE *fp) |
| -------- | ----------------------------------------------------------- |
| 所在文件 | stdio.h                                                     |
| 函数功能 | 把 fp 指向的文件中的数据读到 buffer 中。                    |
| 参数     | char \* buffer : 指向要读入数据存储区的首地址的指针         |
|          | int num_bytes: 每个要读的字段的字节数 count                 |
|          | int count : 要读的字段的个数                                |
|          | FILE\* fp : 要读的文件指针                                  |
| 返回值   | int 成功，返回读的字段数；出错或文件结束，返回 0。          |

```c showLineNumbers
#include <stdio.h>

int main()
{
    // test.txt中存放的是"lnj\0it666"
    FILE *fr = fopen("test.txt", "rb+");
    char buf[1024] = {0};
    // fread函数读取成功返回读取到的字节数, 读取失败返回0
    /*
     * 第一个参数: 存储读取到数据的容器
     * 第二个参数: 每次读取多少个字节
     * 第三个参数: 需要读取多少次
     * 第四个参数: 已打开文件结构体指针
     */
    int n = fread(buf, 1, 1024, fr);
    printf("%i\n", n);
    for(int i = 0; i < n; i++){
        printf("%c", buf[i]);
    }
    fclose(fr);
    return 0;
}
```

> - 注意点:
> - 读取时 num_bytes 应该填写读取数据类型的最小单位, 而 count 可以随意写
> - 如果读取时 num_bytes 不是读取数据类型最小单位, 会引发读取失败
> - 例如: 存储的是 char 类型 6C 6E 6A 00 69 74 36 36 36
>   如果 num_bytes 等于 1, count 等于 1024, 那么依次取出 6C 6E 6A 00 69 74 36 36 36 , 直到取不到为止
>   如果 num_bytes 等于 4, count 等于 1024, 那么依次取出[6C 6E 6A 00][69 74 36 36] , 但是最后还剩下一个 36, 但又不满足 4 个字节, 那么最后一个 36 则取不到

```c showLineNumbers
#include <stdio.h>
#include <string.h>

int main()
{

    // test.txt中存放的是"lnj\0it666"
    FILE *fr = fopen("test.txt", "rb+");
    char buf[1024] = {0};
    /*
    while(fread(buf, 4, 1, fr) > 0){
        printf("%c\n", buf[0]);
        printf("%c\n", buf[1]);
        printf("%c\n", buf[2]);
        printf("%c\n", buf[3]);
    }
    */
    /*
    while(fread(buf, 1, 4, fr) > 0){
        printf("%c\n", buf[0]);
        printf("%c\n", buf[1]);
        printf("%c\n", buf[2]);
        printf("%c\n", buf[3]);
    }
    */
    while(fread(buf, 1, 1, fr) > 0){
        printf("%c\n", buf[0]);
    }
    fclose(fr);
    return 0;
}
```

> - 注意: fwrite 和 fread 本质是用来操作二进制的
> - 所以下面用法才是它们的正确打开姿势

```c showLineNumbers
#include <stdio.h>

int main()
{

    FILE *fp = fopen("test.txt", "wb+");
    int ages[4] = {1, 3, 5, 6};
    fwrite(ages, sizeof(ages), 1, fp);
    rewind(fp);
    int data;
    while(fread(&data, sizeof(int), 1, fp) > 0){
        printf("data = %i\n", data);
    }
    return 0;
}
```

## 读写结构体

- 结构体中的数据类型不统一，此时最适合用二进制的方式进行读写
- 读写单个结构体

```c showLineNumbers
#include <stdio.h>

typedef struct{
    char *name;
    int age;
    double height;
} Person;

int main()
{
    Person p1 = {"lnj", 35, 1.88};
//    printf("name = %s\n", p1.name);
//    printf("age = %i\n", p1.age);
//    printf("height = %lf\n", p1.height);

    FILE *fp = fopen("person.stu", "wb+");
    fwrite(&p1, sizeof(p1), 1, fp);

    rewind(fp);
    Person p2;
    fread(&p2, sizeof(p2), 1, fp);
    printf("name = %s\n", p2.name);
    printf("age = %i\n", p2.age);
    printf("height = %lf\n", p2.height);

    return 0;
}
```

- 读写结构体数组

```c showLineNumbers
#include <stdio.h>

typedef struct{
    char *name;
    int age;
    double height;
} Person;

int main()
{
    Person ps[] = {
      {"zs", 18, 1.65},
      {"ls", 21, 1.88},
      {"ww", 33, 1.9}
    };


    FILE *fp = fopen("person.stu", "wb+");
    fwrite(&ps, sizeof(ps), 1, fp);

    rewind(fp);
    Person p;
    while(fread(&p, sizeof(p), 1, fp) > 0){
        printf("name = %s\n", p.name);
        printf("age = %i\n", p.age);
        printf("height = %lf\n", p.height);
    }
    return 0;
}
```

- 读写结构体链表

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>

typedef struct person{
    char *name;
    int age;
    double height;
    struct person* next;
} Person;
Person *createEmpty();
void  insertNode(Person *head, char *name, int age, double height);
void printfList(Person *head);
int saveList(Person *head, char *name);
Person *loadList(char *name);

int main()
{

//    Person *head = createEmpty();
//    insertNode(head, "zs", 18, 1.9);
//    insertNode(head, "ls", 22, 1.65);
//    insertNode(head, "ws", 31, 1.78);
//    printfList(head);
//    saveList(head, "person.list");
    Person *head = loadList("person.list");
    printfList(head);
    return 0;
}

/**
 * @brief loadList 从文件加载链表
 * @param name 文件名称
 * @return  加载好的链表头指针
 */
Person *loadList(char *name){
    // 1.打开文件
    FILE *fp = fopen(name, "rb+");
    if(fp == NULL){
        return NULL;
    }
    // 2.创建一个空链表
    Person *head = createEmpty();
    // 3.创建一个节点
    Person *node = (Person *)malloc(sizeof(Person));
    while(fread(node, sizeof(Person), 1, fp) > 0){
        // 3.进行插入
        // 3.1让新节点的下一个节点 等于 头节点的下一个节点
        node->next = head->next;
        // 3.2让头结点的下一个节点 等于 新节点
        head->next = node;

        // 给下一个节点申请空间
        node = (Person *)malloc(sizeof(Person));
    }
    // 释放多余的节点空间
    free(node);
    fclose(fp);
    return head;
}

/**
 * @brief saveList 存储链表到文件
 * @param head 链表头指针
 * @param name 存储的文件名称
 * @return  是否存储成功 -1失败 0成功
 */
int saveList(Person *head, char *name){
    // 1.打开文件
    FILE *fp = fopen(name, "wb+");
    if(fp == NULL){
        return -1;
    }
    // 2.取出头节点的下一个节点
    Person *cur = head->next;
    // 3.将所有有效节点保存到文件中
    while(cur != NULL){
        fwrite(cur, sizeof(Person), 1, fp);
        cur = cur->next;
    }
    fclose(fp);
    return 0;
}
/**
 * @brief printfList 遍历链表
 * @param head 链表的头指针
 */
void printfList(Person *head){
    // 1.取出头节点的下一个节点
    Person *cur = head->next;
    // 2.判断是否为NULL, 如果不为NULL就开始遍历
    while(cur != NULL){
        // 2.1取出当前节点的数据, 打印
        printf("name = %s\n", cur->name);
        printf("age = %i\n", cur->age);
        printf("height = %lf\n", cur->height);
        printf("next = %x\n", cur->next);
        printf("-----------\n");
        // 2.2让当前节点往后移动
        cur = cur->next;
    }
}

/**
 * @brief insertNode 插入新的节点
 * @param head 链表的头指针
 * @param p 需要插入的结构体
 */
void  insertNode(Person *head, char *name, int age, double height){
    // 1.创建一个新的节点
    Person *node = (Person *)malloc(sizeof(Person));
    // 2.将数据保存到新节点中
    node->name = name;
    node->age = age;
    node->height = height;

    // 3.进行插入
    // 3.1让新节点的下一个节点 等于 头节点的下一个节点
    node->next = head->next;
    // 3.2让头结点的下一个节点 等于 新节点
    head->next = node;
}
/**
 * @brief createEmpty 创建一个空链表
 * @return 链表头指针, 创建失败返回NULL
 */
Person *createEmpty(){
    // 1.定义头指针
    Person *head = NULL;
    // 2.创建一个空节点, 并且赋值给头指针
    head = (Person *)malloc(sizeof(Person));
    if(head == NULL){
        return head;
    }
    head->next = NULL;
    // 3.返回头指针
    return head;
}
```

## 其它文件操作函数

- ftell 函数

| 函数声明       | long ftell ( FILE \* stream );                                         |
| -------------- | ---------------------------------------------------------------------- |
| 所在文件       | stdio.h                                                                |
| 函数功能       | 得到流式文件的当前读写位置,其返回值是当前读写位置偏离文件头部的字节数. |
| 参数及返回解析 |                                                                        |
| 参数           | FILE \* 流文件句柄                                                     |
| 返回值         | int 成功，返回当前读写位置偏离文件头部的字节数。失败， 返回-1          |

```c showLineNumbers
#include <stdio.h>

int main()
{
    char *str = "123456789";
    FILE *fp = fopen("test.txt", "w+");
    long cp = ftell(fp);
    printf("cp = %li\n", cp); // 0
    // 写入一个字节
    fputc(str[0], fp);
    cp = ftell(fp);
    printf("cp = %li\n", cp); // 1
    fclose(fp);
    return 0;
}
```

- rewind 函数

| 函数声明                                  | void rewind ( FILE \* stream ); |
| ----------------------------------------- | ------------------------------- |
| 所在文件                                  | stdio.h                         |
| 函数功能 将文件指针重新指向一个流的开头。 |                                 |
| 参数及返回解析                            |                                 |
| 参数                                      | FILE \* 流文件句柄              |
| 返回值                                    | void 无返回值                   |

```c showLineNumbers
#include <stdio.h>

int main()
{
    char *str = "123456789";
    FILE *fp = fopen("test.txt", "w+");
    long cp = ftell(fp);
    printf("cp = %li\n", cp); // 0
    // 写入一个字节
    fputc(str[0], fp);
    cp = ftell(fp);
    printf("cp = %li\n", cp); // 1
    // 新指向一个流的开头
    rewind(fp);
    cp = ftell(fp);
    printf("cp = %li\n", cp); // 0
    fclose(fp);
    return 0;
}
```

- fseek 函数

| 函数声明       | int fseek ( FILE \* stream, long offset, int where); |
| -------------- | ---------------------------------------------------- |
| 所在文件       | stdio.h                                              |
| 函数功能       | 偏移文件指针。                                       |
| 参数及返回解析 |                                                      |
| 参 数          | FILE \* stream 文件句柄                              |
|                | long offset 偏移量                                   |
|                | int where 偏移起始位置                               |
| 返回值         | int 成功返回 0 ，失败返回-1                          |

- 常用宏

```c showLineNumbers
#define SEEK_CUR 1 当前文字
#define SEEK_END 2 文件结尾
#define SEEK_SET 0 文件开头
```

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp = fopen("test.txt", "w+");
    fputs("123456789", fp);
    // 将文件指针移动到文件结尾, 并且偏移0个单位
    fseek(fp, 0, SEEK_END);
    int len = ftell(fp); // 计算文件长度
    printf("len = %i\n", len);
    fclose(fp);
    return 0;
}
```

```c showLineNumbers
#include <stdio.h>

int main()
{
    FILE *fp;
   fp = fopen("file.txt","w+");
   fputs("123456789", fp);

   fseek( fp, 7, SEEK_SET );
   fputs("lnj", fp);
   fclose(fp);
    return 0;
}
```
