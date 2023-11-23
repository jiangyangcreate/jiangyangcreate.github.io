---
tags: [python,题库]
title: Python笔试
---

## 后缀表达式

### 描述

后缀表达式，又称逆波兰式，指的是不包含括号，运算符放在两个运算对象的后面，所有的计算按运算符出现的顺序，严格从左向右进行（不再考虑运算符的优先规则）。

例如：后缀表达式为“2 3 + 4 × 5 -”计算过程如下：
（1）从左至右扫描，将 2 和 3 压入堆栈；
（2）遇到 + 运算符，因此弹出 3 和 2（ 3 为栈顶元素，2 为次顶元素，注意与前缀表达式做比较），计算出 3+2 的值，得 5，再将 5 入栈；
（3）将 4 入栈；
（4）接下来是 × 运算符，因此弹出 4 和 5，计算出 4 × 5 = 20，将 20 入栈；
（5）将 5 入栈；
（6）最后是-运算符，计算出 20-5 的值，即 15，由此得出最终结果。

示例

listx = [15, 7, 1, 1, "+", "-", "/", 3, "*", 2, 1, 1, "+", "+", "-"]

### 题解

```python

# 方法1-python人思维
while len(listx) > 1:
    print(listx)
    for i in range(len(listx)):
        if str(listx[i]) in '+-*/':
            if listx[i] == '+':
                new = listx[i-2] + listx[i-1]
            if listx[i] == '-':
                new = listx[i-2] - listx[i-1]
            if listx[i] == '*':
                new = listx[i-2] * listx[i-1]
            if listx[i] == '/':
                new = listx[i-2] / listx[i-1]
            del listx[i]
            del listx[i-1]
            listx[i-2] = new
            break
print(listx)

# 方法2-利用pop 和 append 仿c语言栈操作
listy = []
for i in listx:
    if str(i) not in "+-*/":
        listy.append(i)  # 入栈
    else:
        if i == "+":
            new = listy.pop() + listy.pop()  # 出栈
        if i == "-":
            new = listy.pop() - listy.pop()
        if i == "*":
            new = listy.pop() * listy.pop()
        if i == "/":
            new = listy.pop() / listy.pop()
        listy.append(new)
print(listy)
```

## 求解密码

### 描述

Python中的string模块包含了许多字符，请根据以下提示设计一个函数：

参数1：不同的密码组合类型
参数2：密码长度

输出：所以可能的组合数量

示例：当仅用**小写字母**和**数字**来组成1位密码时，共有36种可能（26+10）

string.ascii_letters 所有字母
string.ascii_uppercase  大写字母
string.ascii_lowercase  小写字母
string.digits   数字
string.punctuation  标点符号
string.printable    可打印字符
string.whitespace   空白字符

### 题解

```python
import string
# 方法1 正常Python人思维
def generate_pwd_list(dic, max_len):
    """
    description:生成指定长度的密码序列
    param {*} dic   字典
    param {*} pwd_len   最大密码长度
    return {*}
    """
    k = itertools.product(dic, repeat=max_len)  # 迭代器
    allkey = ("".join(i) for i in k)
    if max_len == 1:
        return list(allkey)
    return generate_pwd_list(dic, max_len - 1) + list(allkey)


keys = generate_pwd_list(string.ascii_lowercase + string.digits, 1)
print(len(keys))


# 方法2 递归
def combi(seq):
    if not seq:
        yield []
    else:
        for element in seq[0]:
            for rest in combi(seq[1:]):
                yield [element] + rest


def sets(dic, pwd_len):
    n = []
    for i in range(pwd_len):
        n.append(dic)
    return list(combi(n))


print(len(sets(string.ascii_lowercase + string.digits, 2)))



# 方法3 迭代器


res = []


def func(arr, index, temp):
    if len(temp) == len(arr):
        res.append(temp[:])
    else:
        for i in range(len(arr[index])):
            temp.append(arr[index][i])
            func(arr, index + 1, temp)
            temp.pop()


def sets(dic, pwd_len):
    n = []
    for i in range(pwd_len):
        n.append(dic)
    func(
        n,
        0,
        [],
    )


sets(string.ascii_lowercase + string.digits, 2)
print(len(res))


```

```python
"""
小明拿到了一个电影+演员的数据名单，他想设计一个程序，要求：
1.输入演员名
2.如果演员出演了电影，则打印他+他出演的全部电影。程序结束
3.如果演员没有出演电影，则打印查无此人。程序继续
电影 = [
'妖猫传',['黄轩','染谷将太'],
'无问西东',['章子怡','王力宏','祖峰'],
'超时空同居',['雷佳音','佟丽娅','黄轩']]
"""



电影 = [
'妖猫传',['黄轩','染谷将太'],
'无问西东',['章子怡','王力宏','祖峰'],
'超时空同居',['雷佳音','佟丽娅','黄轩']]
# 如果查到了：打印出演员+【所有的】电影，循环结束
# 如果没查到，就 循环继续，并且打印【查无此人】
找到了吗 = 0 
while True:
    name = input('你要找的演员')
    for i in 电影:
        if name not in i : 
            a = i #暂存---for 是逐一提取数据，并赋值
        else:
            print(name,'出演了',a)
            找到了吗 += 1        
    if 找到了吗 != 0 : # 不等于 0 就代表它找到了
        break
    print('【查无此人】') # 1号位
```

## 质数分解

### 描述

每个数字可以写成多个质数的乘积，给定一个数字，请你分解为多个质数

### 题解

```python


def fun(num, list=None):
    if list is None:
        list = []
    for i in range(2, num):
        while num % i == 0:
            list.append(i)
            num = int(num / i)
            if num > 1:
                fun(num)
    return list
x = 9*5
print(fun(x))
```

## 九九乘法表

### 描述

要求使用循环代码打印一个九九乘法表出来.如下

```bash
1*1=1 

1*2=2 2*2=4 

1*3=3 2*3=6 3*3=9 

1*4=4 2*4=8 3*4=12 4*4=16 

1*5=5 2*5=10 3*5=15 4*5=20 5*5=25 

1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36 

1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49 

1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64        

1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81 
```

### 题解

```python
#方法一
for i in range(1,10):
    print()
    for j in range(1,i+1):
        print('%d*%d=%d' % (j,i,i*j),end=' ')

#方法二
i=1
while i<10: #控制行，1到9
    j=1
    while j <= i: #控制每行显示的数量，1到9
        print("%d*%d=%d"%(j,i,i*j),end=' ') #输出
        j+=1 #每行显示的数量加1
    print("\n") #每一行结束换行
    i+=1 #行数加1

```

## 字典排序

### 描述

将字典数组按字典的某个key排序

### 题解

```python
# 方法1：
sorted(d.cop(),key = lambda i:i[k])

# 方法2：
heappush(h,(i[k],i)) for i in d
```

## 冒泡排序

### 描述

给定一个列表，请你对列表的元素进行     从大到小排序   与从小到大排序

### 题解

```python


list1 = [13, 22, 6, 99, 11, 0]

for a in range(len(list1)):
    for b in range(a,len(list1)):
        if list1[a] < list1[b]:  #如果m大于了n
           list1[a] ,list1[b] =  list1[b],list1[a]#交换位置
print(list1)
```

## 快速排序

### 描述

快速排序（Quicksort）是对冒泡排序的一种改进算法。

该算法的实现基本可分为以下几步：

在数组中选一个基准数（通常为数组第一个）。
将数组中小于基准数的数据移到基准数左边，大于基准数的移到右边
对于基准数左、右两边的数组，不断重复以上两个过程，直到每个子集只有一个元素，即为全部有序。

请你编写它的实现代码。

### 题解

```python
def partition(arr, low: int, high: int):
    pivot, j = arr[low], low  # 获取底部元素与 对应的初始下标

    for i in range(low + 1, high + 1):  # 从第2个元素开始，到最后一个元素
        if arr[i] <= pivot:  # 如果这个元素，小于第1个元素
            j += 1  # 初始下标+1
            arr[j], arr[i] = arr[i], arr[j]  # 把这个小元素和标的元素换位置
    arr[low], arr[j] = arr[j], arr[low]  # arr[low]是等于自己的，现在把他挪到中间位置
    return j  # 返回这个中间位置


def quick_sort_between(arr, low: int, high: int):
    if high-low <= 1:  # 递归结束条件
        return

    m = partition(arr, low, high)
    quick_sort_between(arr, low, m - 1) # 二分后自我调用，直到递归结束条件触发
    quick_sort_between(arr, m + 1, high)


def quick_sort(arr):
    """
    快速排序(in-place)
    :param arr: 待排序的List
    :return: 快速排序是就地排序(in-place)
    """
    quick_sort_between(arr, 0, len(arr)-1)  # arr[0] - arr[len(arr)-1]

# 测试数据
if __name__ == '__main__':
    arr = [17, 56, 71, 38, 61, 62, 48, 28, 57, 42, 10, 21, 12, 90]  # 长度为10
    quick_sort(arr)
    print("快速排序结果：", arr)
```

## 抽奇数

### 描述

要求：0-N，每次抽走奇数，打印剩余的那个数字

### 题解

```python
aList = []
for i in range(0,2023):
    aList.append(i)

while len(aList)>1:
    aList = aList[1::2]
    print(aList)
print(aList)
```

## 平方和

### 描述

两个数字的平方和是2022，请问这2个数分别是多少

### 题解

```python

for a in range(1,2022):
    if (2022 - a*a)**0.5 in range(1,2022):
        print(a)
```

## 规整的打印考场号

### 描述

学校有440人参加考试，1号考场有80个座位，要求座位号为0101--0180
后面每个考场40个座位：
2号考场考试号要求为0201--0240
3号考场考试号要求为0301--0440
后续考场以此类推，请你打印出来这些考场号吧

### 题解

```python

for i in range(1,440):
    if i <= 80 :
        print('01{:0>2d}'.format(i))
    elif i <= 440:
        if i%40 == 0:
            print('{:0>2d}{:0>2d}'.format(i//40-1,40))
        else:
            print('{:0>2d}{:0>2d}'.format(i//40,i%40))
```

## 打印时间

### 描述

请从00:00依次打印出一天的时间
示例：

- 23 : 52
- 23 : 53
- 23 : 54

### 题解

```python

for 时钟 in range(24):
    for 分钟 in range(60):
        print(时钟, ':', 分钟)

```

## 数羊问题

### 描述

编写一段代码，模拟我们数羊到入睡的过程：
每数五只羊，就提问一次：睡着了吗？
如果没有睡着，继续循环，并打印“继续数羊”。
如果睡着了，则停止循环，并打印“终于睡着了”。

### 题解

```python

i = 0
while True:
    i += 1
    left_endpoint = 1 + 5 * ( i - 1 )
    right_endpoint = 1 + 5 * i
    for i in range(left_endpoint, right_endpoint):
        print(str(i)+'只羊')
    answer = input('睡着了吗？回答是或否：')
    if answer == '是':
        break
    print('继续数羊')
print('终于睡着了')

#方法二
睡觉的状态 = '还没睡'
a = 0
while 睡觉的状态 != '睡着': # 只要不是睡着，就继续数
    a +=1
    print(str(a)+'只羊')
    if a%9 == 0 : # %是取余数 每次数5只羊
        睡觉的状态 = input('睡着了嘛？')
```
