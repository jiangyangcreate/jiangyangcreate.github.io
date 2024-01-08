---
sidebar_position: 2
title: Python基础
---

### 安装Python

[Python官网下载网址](https://www.python.org/downloads/)

- 本教程使用的是Python3.11

安装过程全部勾选。

- 下载好的Python是一个（编程）语言包

如果我们安装了中文语言包，那么我们的系统就可以识别与显示中文。
如果我们安装了Python语言包，那么我们的系统就可以识别与运行Python程序。

#### pip

在部分系统预装版中，`python`名为`python3`，`pip`为`pip3`

Python安装完成后，pip也会自动安装完成。

后续代码示例以`python`和`pip`为例

#### 更新

- `python -m pip install --upgrade pip`
- `python -m pip install  -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip`

#### 换源

- Windows/ MacOS系统临时使用： `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple {包名}`

- Windows永久使用：

第一步: 在C:\Users\Administrator 目录下 创建pip文件夹

第二步：在第一步创建的文件夹下（C:\Users\Administrator\pip）创建pip.ini文件

第三步：记事本编辑保存pip.ini文件内容为以下部分：

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple/
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

- MAC永久使用：

```
cd ~
mkdir .pip
cd .pip
vi pip.conf
```

写入以下内容

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple/
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

#### 批量下载

注意执行本条命令时，需要在requirements.txt文件所在的目录下执行。

- `pip install -r requirements.txt`

- `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt`

requirements.txt参考内容

```bash
opencv-python
opencv-contrib-python
imageio
scipy
pillow
numpy
matplotlib
pandas
scikit-learn
tensorflow
```

#### Vscode安装

[Vscdoe官网下载网址](https://code.visualstudio.com/download)

- VSCode（Visual Studio Code）是一款通用跨平台的编辑器

它不会运行程序，它需要安装相应的语言包才能运行程序。它可以编辑任何语言的程序，支持几乎所有主流的开发语言的语法高亮、智能代码补全等。安装过程全部勾选。

- 注意与Visual Studio区别

Visual Studio是一个集成的开发环境。

#### Vscode安装插件

Vscode左侧菜单通常为：文件、搜索、源代码管理、调试、应用商店等等（不同版本显示不同）

逐一打开，找到应用商店，在其中搜索插件名称即可下载。推荐下载插件：

- 简体中文包：包名：`Chinese (Simplified) Language Pack for Visual Studio Code`
- Python包：包名：`Python`

#### 拓展：Vscode的个性化设置

- 主题颜色

在设置中点击主题颜色，可以选择自己喜欢的主题颜色。推荐主题颜色为`深色+`

- 保存时代码自动格式化

安装成功后可以在Vscode的设置中搜索`format on save`，勾选即可。

测试：在Vscode中新建一个xxx.py文件，输入以下内容：

```python
print("hello world")
```

运行方式1：点击右上角的三角形运行按钮

运行方式2.在编辑器中输入`python xxx.py`运行

运行方式3：在编辑器中输入`python -m xxx.py`运行

可以看到输出结果为`hello world`。

python xxx.py和python -m xxx.py是两种加载py文件的方式:
1叫做直接运行
2把模块当作脚本来启动(注意：但是__name__的值为'main' )

#### vscode使用技巧

跳转到定义： 使用 F12 快捷键或者右键选择 "Go to Definition" 可以跳转到光标所在符号的定义处。

格式化代码：使用 Alt + Shift + F 快捷键来格式化整个文件。

多行编辑： 使用 Alt + Shift + I 来进行多行编辑。

断点调试： 使用 F5 启动调试器，可以设置断点、单步执行、查看变量等。

### 变量与数据类型

#### 变量

变量是一个盒子用于存放数据，变量名是盒子的名字，数据是盒子里面的东西。

语法示例：

变量名 = 数据

变量名 = 变量名2 = 变量名3 = 数据

变量名1, 变量名2, 变量名3 = 数据1, 数据2, 数据3

变量名1 = 数据1, 变量名2 = 数据2, 变量名3 = 数据3

#### Python变量命名规则

1. 变量名只能包含字母、数字和下划线。变量名可以字母或下划线打头，但不能以数字打头，例如，可将变量命名为message_1，但不能将其命名为1_message。

2. 变量名不能包含空格，但可使用下划线来分隔其中的单词。例如，变量名greeting_message可行，但变量名greeting message会引发错误。

3. 不要将Python关键字和函数名用作变量名，即不要使用Python保留用于特殊用途的单词，如print。

4. 变量名应既简短又具有描述性。例如，name比n好，student_name比s_n好，name_length比length_of_persons_name好。

5. 慎用小写字母l和大写字母O，因为它们可能被人错看成数字1和0。

#### 数据类型

Python的最基础的**独立数据类型**有：

1. 整数：Python可以处理任意大小的整数，当然包括负整数，在程序中的表示方法和数学上的写法一模一样，例如：1，100，-8080，0，等等。

2. 浮点数：浮点数也就是小数，因为浮点数也可能表示为科学计数法（如1.23e9，或者12.3e8），所以，浮点数运算结果也可能有误差。

3. 字符串：字符串是以单引号'或双引号"括起来的任意文本，比如'abc'，"xyz"等等。字符串还有一些特殊字符，可以通过转义字符\来表示，比如：

    - \n表示换行
    - \t表示制表符
    - \\表示的字符就是\
    - \u表示Unicode编码
    - \U表示Unicode编码
    - \x表示十六进制数
    - \0表示八进制数

4. 布尔值：布尔值和布尔代数的表示完全一致，一个布尔值只有True、False两种值，要么是True，要么是False，在Python中，可以直接用True、False表示布尔值（请注意大小写），也可以通过布尔运算计算出来：

    - and运算是与运算，只有所有都为True，and运算结果才是True
    - or运算是或运算，只要其中有一个为True，or运算结果就是True
    - not运算是非运算，它是一个单目运算符，把True变成False，False变成True

5. 空值：空值是Python里一个特殊的值，用None表示。None不能理解为0，因为0是有意义的，而None是一个特殊的空值。

#### 介绍字符串的索引

```python
# 字符串的索引
s = 'good morning'
# 查看类型 
print(type(s))
s[0]  # g
```

```python
s[-2]  # n
```

#### 切分操作

分片用来从序列中提取出想要的子序列，其用法为：

var[lower:upper:step]

其范围包括 lower ，但不包括 upper ，即 [lower, upper)，
step 表示取值间隔大小，如果没有默认为1。

```python
s[-3:]  # ing
```

```python
s[:-3]  # good morn
```

```python
s[:]  # good morning
```

其他切分操作，练习：step

```python
print(s[::2])  # go onn
print(s[::-1])  # gninrom doog
print(s[:100])
```

### 运算符

Python的运算符需要掌握如下知识点：

1. 算术运算符

2. 比较（关系）运算符

3. 赋值运算符

4. 逻辑运算符

5. 位运算符

6. 成员运算符

7. 身份运算符

8. 运算符优先级

#### 算术运算符

| 运算符 | 描述 | 实例 |
| --- | --- | --- |
| + | 加 - 两个对象相加 | a + b 输出结果 30 |
| - | 减 - 得到负数或是一个数减去另一个数 | a - b 输出结果 -10 |
| * | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 | a * b 输出结果 200 |
| / | 除 - x除以y | b / a 输出结果 2 |
| % | 取模 - 返回除法的余数 | b % a 输出结果 0 |
| ** | 幂 - 返回x的y次幂 | a**b 为10的20次方， 输出结果 100000000000000000000 |

#### 比较（关系）运算符

| 运算符 | 描述 | 实例 |
| --- | --- | --- |
| == | 等于 - 比较对象是否相等 | (a == b) 返回 False。 |
| != | 不等于 - 比较两个对象是否不相等 | (a != b) 返回 true. |
| `<>`| 不等于 - 比较两个对象是否不相等 | (a `<>` b) 返回 true。这个运算符类似 != 。 |
| > | 大于 - 返回x是否大于y | (a > b) 返回 False。 |
| `<` | 小于 - 返回x是否小于y。所有比较运算符返回1表示真，返回0表示假。这分别与特殊的变量True和False等价。注意，这些变量名的大写。 | (a `<` b) 返回 true。 |
| >= | 大于等于 - 返回x是否大于等于y。 | (a >= b) 返回 False。 |
| `<=` | 小于等于 - 返回x是否小于等于y。 | (a `<= b`) 返回 true。 |

#### 赋值运算符

| 运算符 | 描述 | 实例 |
| --- | --- | --- |
| = | 简单的赋值运算符 | c = a + b 将 a + b 的运算结果赋值为 c |
| += | 加法赋值运算符 | c += a 等效于 c = c + a |
| -= | 减法赋值运算符 | c -= a 等效于 c = c - a |
| *= | 乘法赋值运算符 | c *= a 等效于 c = c* a |
| /= | 除法赋值运算符 | c /= a 等效于 c = c / a |
| %= | 取模赋值运算符 | c %= a 等效于 c = c % a |
| **= | 幂赋值运算符 | c **= a 等效于 c = c** a |
| //= | 取整除赋值运算符 | c //= a 等效于 c = c // a |

#### 逻辑运算符

| 运算符 | 逻辑表达式 | 描述 | 实例 |
| --- | --- | --- | --- |
| and | x and y | 布尔"与" - 如果 x 为 False，x and y 返回 False，否则它返回 y 的计算值。 | (a and b) 返回 20。 |
| or | x or y | 布尔"或" - 如果 x 是非 0，它返回 x 的值，否则它返回 y 的计算值。 | (a or b) 返回 10。 |
| not | not x | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。 | not(a and b) 返回 False |

#### 位运算符

| 运算符 | 描述 | 实例 |
| --- | --- | --- |
| & | 按位与运算符 | a & b 输出结果 12 ，二进制解释： 0000 1100 |
| \| | 按位或运算符 | a \| b 输出结果 61 ，二进制解释： 0011 1101 |
| ^ | 按位异或运算符 | a ^ b 输出结果 49 ，二进制解释： 0011 0001 |
| ~ | 按位取反运算符 | ~a 输出结果 -61 ，二进制解释： 1100 0011 ，在一个有符号二进制数的补码形式。 |
| `<<` | 左移动运算符 | a `<<` 2 输出结果 240 ，二进制解释： 1111 0000 |
| `>>` | 右移动运算符 | a `>>` 2 输出结果 15 ，二进制解释： 0000 1111 |

#### 成员运算符

| 运算符 | 描述 | 实例 |
| --- | --- | --- |
| in | 如果在指定的序列中找到值返回 True，否则返回 False。 | x 在 y 序列中 , 如果 x 在 y 序列中返回 True。 |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False。 | x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True。 |

#### 身份运算符

| 运算符 | 描述 | 实例 |
| --- | --- | --- |
| is | is 是判断两个标识符是不是引用自一个对象 | x is y, 类似 id(x) == id(y) , 如果引用的是同一个对象则返回 True，否则返回 False |
| is not | is not 是判断两个标识符是不是引用自不同对象 | x is not y ， 类似 id(a) != id(b)。如果引用的不是同一个对象则返回结果 True，否则返回 False。 |

#### 运算符优先级

| 运算符 | 描述 |
| --- | --- |
| ** | 指数 (最高优先级) |
| ~ + - | 按位翻转, 一元加号和减号 (最后两个的方法名为 +@ 和 -@) |
| * / % // | 乘，除，取模和取整除 |
| + - | 加法减法 |
| `>> <<` | 右移，左移运算符 |
| & | 位 'AND' |
| ^ \| | 位运算符 |
| `<= < > >=` | 比较运算符 |
| `< >` == != | 等于运算符 |
| = %= /= //= -= += *= **= | 赋值运算符 |
| is is not | 身份运算符 |
| in not in | 成员运算符 |
| not or and | 逻辑运算符 |

### 列表

介绍列表的方法及示例演示其使用，包括：长度、修改列表、取值、排序

#### 创建列表

```python
empty_list = list()
print(empty_list)  # 同 empty_list = []

'''
[]是解析后的list，所以[]比list()更快
'''
```

查看列表长度：

```python
# len 查看列表长度
a = [1, 2, 3]
b = [2, 3, 'hello']
c = a + b
print(c)  # [1, 2, 3, 2, 3, u'hello']
```

```python
len(c)
```

Python字符串可以和列表可以方便扩展：

```python
d = b * 2
print(d)  # [2, 3, u'hello', 2, 3, u'hello']
```

```python
d[-1]
```

#### 修改列表

```python
print(a)
a[0] = 100
a
```

这种赋值也适用于分片，例如，将列表的第2，3两个元素换掉：

```python
a[1:3] = [200, 300]
print(a)
```

事实上，对于连续的分片（即步长为 1 ），Python采用的是整段替换的方法，两者的元素个数并不需要相同，

```python
# 例如，将 [11,12] 替换为 [1,2,3,4]：
a = [10, 11, 12, 13, 14]
a[1:3] = [1, 2, 3, 4]
print(a)  # [10, 1, 2, 3, 4, 13, 14]
```

用这种方法来删除列表中一个连续的分片：

```python
a = [10, 1, 2, 11, 12]
print(a[1:3])
a[1:3] = []
print(a)
```

对于不连续（间隔step不为1）的片段进行修改时，两者的元素数目必须一致：

```python
a = [10, 11, 12, 13, 14]
a[::2] = [1, 2, 3]
print(a)  # [1, 11, 2, 13, 3]
```

Python提供了删除列表中元素的方法 'del':

```python
a = [100, 'a', 'b', 200]
del a[0]
print(a)  # [u'a', u'b', 200]
```

```python
# 删除间隔的元素：
a = ['a', 1, 'b', 2, 'c']
del a[::2]
print(a)  # [1, 2]
```

用 in 来看某个元素是否在某个序列（不仅仅是列表）中，
用not in来判断是否不在某个序列中。

```python
a = [1, 2, 3, 4, 5]
print(1 in a)
print(1 not in a)

# 也可以作用于字符串：
s = 'hello world'
print("'he' in s : ", 'he' in s)  # True
print("'world' not in s : ", 'world' not in s)  # False
```

列表中可以包含各种对象，甚至可以包含列表：

```python
a = [1, 2, 'six', [3, 4]]
print(a[3])  # [3,4]
# a[3]是列表，可以对它再进行索引：
print(a[3][1])  # 4
```

#### 列表方法

```python
# 列表中某个元素个数
a = [1, 1, 2, 3, 4, 5]
print(len(a))  # 总个数：6
# 元素1出现的个数
print(a.count(1))  # 2
# l.index(ob) 返回列表中元素 ob 第一次出现的索引位置，如果 ob 不在 l 中会报错。
print(a.index(1))  # 0
```

#### 列表添加元素

```python
# 向列表添加单个元素
# a.append(ob) 将元素 ob 添加到列表 a 的最后。
a = [1, 1, 2, 3, 4, 5]
a.append(10)
print(a)  # [1, 1, 2, 3, 4, 5, 10]

# append每次只添加一个元素，并不会因为这个元素是序列而将其展开：
a.append([11, 12])
print(a)  # [1, 1, 2, 3, 4, 5, 10, [11, 12]]

```

```python
# 向列表添加序列
# l.extend(lst) 将序列 lst 的元素依次添加到列表 l 的最后，作用相当于 l += lst。
a = [1, 2, 3, 4]
a.extend([6, 7, 1])
print(a)  # [1, 2, 3, 4, 6, 7, 1]

# 插入元素
# l.insert(idx, ob) 在索引 idx 处插入 ob ，之后的元素依次后移。
a = [1, 2, 3, 4]
# 在索引 3 插入 'a'
a.insert(3, 'a')
print(a)  # [1, 2, 3, u'a', 4]
a
```

#### 移除元素

```python
# l.remove(ob) 会将列表中第一个出现的 ob 删除，如果 ob 不在 l 中会报错。
a = [1, 1, 2, 3, 4]
# 移除第一个1
a.remove(1)
print(a)  # [1, 2, 3, 4]

# 弹出元素
# l.pop(idx) 会将索引 idx 处的元素删除，并返回这个元素。
a = [1, 2, 3, 4]
b = a.pop(0)  # 1
print('pop:', b, ' ;result:', a)
```

#### 排序

```python
# l.sort() 会将列表中的元素按照一定的规则排序：
a = [10, 1, 11, 13, 11, 2]
a.sort()
print(a)  # [1, 2, 10, 11, 11, 13]
```

```python
# 如果不想改变原来列表中的值，可以使用 sorted 函数：
a = [10, 1, 11, 13, 11, 2]
b = sorted(a)
print(a)  # [10, 1, 11, 13, 11, 2]
print(b)  # [1, 2, 10, 11, 11, 13]

# 列表反向
# list.reverse() 会将列表中的元素从后向前排列。
a = [1, 2, 3, 4, 5, 6]
a.reverse()
print(a)  # [6, 5, 4, 3, 2, 1]
```

```python
# 如果不想改变原来列表中的值，可以使用这样的方法：
a = [1, 2, 3, 4, 5, 6]
b = a[::-1]
print(a)
print(b)
a
```

如果不清楚用法，可以查看帮助： help(a.sort)

```python
a=[1,2,3]
help(a.sort)
```

显示帮助：

```python
# Signature: a.sort(*, key=None, reverse=False)
# Docstring:
# Sort the list in ascending order and return None.
#
# The sort is in-place (i.e. the list itself is modified) and stable (i.e. the
# order of two equal elements is maintained).
#
# If a key function is given, apply it once to each list item and sort them,
# ascending or descending, according to their function values.
#
# The reverse flag can be set to sort in descending order.
# Type:      builtin_function_or_method
```

#### 列表推导式

循环可以用来生成列表：

```python
values = [2, 2, 3]
squares = []
for x in values:
    squares.append(x ** 2)
print(squares)  # [4, 4, 9]
```

列表推导式可以使用更简单的方法来创建这个列表：

```python
values = [3, 8, 10, 14]
squares = [x ** 2 for x in values]
print(squares)  # [9, 64, 100, 196]
```

可以加入条件筛选，在上面的例子中，

假如只想保留列表中不大于8的数的平方：

```python
squares = [x ** 2 for x in values if x <= 10]
print(squares)  # [9, 64, 100]
```

平方的结果不大于100的：

```python
squares = [x ** 2 for x in values if x ** 2 <= 80]
print(squares)  # [9, 64]
```

使用推导式生成集合和字典：

```python
values = [10, 21, 4, 7, 12]
square_set = {x ** 2 for x in values if x <= 10}

print(square_set)  # set([16, 49, 100])
```

```python
square_dict = {x: x ** 2 for x in values if x <= 10}
print(square_dict)  # {10: 100, 4: 16, 7: 49}
```

计算上面例子中生成的列表中所有元素的和：

```python
total = sum([x ** 2 for x in values if x < 10])
total  # 65
```

但是，Python会生成这个列表，然后在将它放到垃圾回收机制中（因为没有变量指向它），

这毫无疑问是种浪费。

为了解决这种问题，与range()类似，Python使用产生式表达式来解决这个问题：

```python
total = sum(x ** 2 for x in values if x < 10)
total  # 65
```

与上面相比，只是去掉了括号，但这里并不会一次性的生成这个列表。

```python
import time

# 比较一下两者的用时：
x = range(1000000)
t1 = time.time()

total = sum([x ** 3 for x in values if x < 10])
print("list speed: ", time.time() - t1)
```

```python
t2 = time.time()
total = sum(x ** 3 for x in values if x < 10)
print("comprehension speed:", time.time() - t2)
```

ipython 下可以输入:

```python
x = range(1000000)
%timeit total = sum([i**2 for i in x])
%timeit total = sum(i**2 for i in x)
```

#### 列表vs字符串

列表是可变的（Mutable）

```python
a = [1, 2, 3, 4]
a[0] = 100
a.insert(3, 200)
a  # [100, 2, 3, 200, 4]
```

字符串是不可变的（Immutable）:

```python
s = "hello world"

# 通过索引改变会报错
s[0] = 'k'
```

```python
s.insert(3, 'm')
```

字符串方法只是返回一个新字符串，并不改变原来的值：

```python
print(s.replace('world', 'Mars'))  # hello Mars
print(s)  # hello world

# 如果想改变字符串的值，可以用重新赋值的方法：
s = s.replace('world', 'YunYun')
print(s)  # hello YunYun
```

### 元组

与列表相似，元组tuple也是个有序序列，但是元组是不可变的，用()生成。

```python
a = (10, 11, 12, 13, 14)
print(a)

# 可以索引，切片：
c = a[0]
print(c)

c = a[1:3]
print(c)  # (11, 12)
c
```

单个元素的元组生成

采用下列方式定义只有一个元素的元组：

```python
a = (10,)
print(a)
print(type(a))  # <type 'tuple'>
```

```python
a = [1, 2, 3]
b = tuple(a)
print(b)  # (1, 2, 3)
```

由于元组是不可变的，所以只能有一些不可变的方法，

例如计算元素个数 count 和元素位置 index ，用法与列表一样。

```python
c = a.count(1)
print(c)  # 1

c = a.index(3)
print(c)  # 索引位置为：2
```

#### TIP

1. 可变数据类型: list, dictionary, set, numpy array, user defined objects
2. 不可变数据类型: integer, float, long, complex, string, tuple, frozenset，强调下 tuple 是不可变的

### 字典

字典 dictionary ，在一些编程语言中也称为 hash ， map ，
是一种由键值对组成的数据结构。

```python
a = {}
print(type(a))  # <type 'dict'>
a = dict()
print(type(a))
```

#### 操作dict

```python
# 插入键值
a['f'] = 'num 1'
a['s'] = 'num 2'
print(a)  # {u's': u'num 2', u'f': u'num 1'}
```

```python
# 查看键值
print(a['s'])  # num 2
```

```python
# 更新
a['f'] = 'num 3'
print(a)  # {u's': u'num 2', u'f': u'num 3'}
```

```python
# 初始化字典
a = {'first': 'num 1', 'second': 'num 2', 3: 'num 3'}
print(a['first'])  # num 1
print(a[3])  # num 3
```

Python中不能用支持用数字索引按顺序查看字典中的值，
而且数字本身也有可能成为键值，这样会引起混淆:

a[0] 会报错

```python
try:
    print(a[0])
except KeyError as e:
    print('error:', e)
#a[0]
```

#### dict的应用示例

```python
# 定义四个字典
e1 = {'mag': 0.05, 'width': 20}
e2 = {'mag': 0.04, 'width': 25}
e3 = {'mag': 0.05, 'width': 80}
e4 = {'mag': 0.03, 'width': 30}

# 以字典作为值传入新的字典
events = {500: e1, 760: e2, 3001: e3, 4180: e4}
# {760: {u'width': 25, u'mag': 0.04},
# 3001: {u'width': 80, u'mag': 0.05},
# 500: {u'width': 20, u'mag': 0.05},
# 4180: {u'width': 30, u'mag': 0.03}}
print(events)
```

```python
# 另一个例子
people = [
    {'first': 'Sam', 'last': 'Malone', 'name': 35},
    {'first': 'Woody', 'last': 'Boyd', 'name': 21},
    {'first': 'Norm', 'last': 'Peterson', 'name': 34},
    {'first': 'Diane', 'last': 'Chambers', 'name': 33}
]
# [{'first': 'Sam', 'last': 'Malone', 'name': 35},
#  {'first': 'Woody', 'last': 'Boyd', 'name': 21},
#  {'first': 'Norm', 'last': 'Peterson', 'name': 34},
#  {'first': 'Diane', 'last': 'Chambers', 'name': 33}]
print(people)
```

使用 dict 初始化字典：

```python
# 除了通常的定义方式，还可以通过 dict() 转化来生成字典：
my_dict = dict([('name', 'lili'),
                ('sex', 'female'),
                ('age', 32),
                ('address', 'beijing')])
# {u'age': 32,
# u'address': u'beijing',
# u'name': u'lili',
# u'sex': u'female'}
print(my_dict)
```

利用索引直接更新键值对：

```python
my_dict['age'] += 1
print(my_dict)  # u'age': 33
```

dict可以使用元组作为键值：

```python
# 例如，可以用元组做键来表示从第一个城市飞往第二个城市航班数的多少：
connections = {}
connections[('New York', 'Seattle')] = 100
connections[('Austin', 'New York')] = 200
connections[('New York', 'Austin')] = 400
connections
```

```python
# 元组是有序的，
# 因此 ('New York', 'Austin') 和 ('Austin', 'New York') 是两个不同的键：
print(connections[('Austin', 'New York')])  # 200
print(connections[('New York', 'Austin')])  # 400
```

#### 字典方法

get 方法 : d.get(key, default = None)

之前已经见过，用索引可以找到一个键对应的值，
但是当字典中没有这个键的时候，Python会报错

```python
a = {'first': 'num 1', 'second': 'num 2'}
# error:
# print(a['third'])

# get 返回字典中键 key 对应的值，
# 如果没有这个键，返回 default 指定的值（默认是 None ）。
print(a.get('third'))  # None
```

```python
# 指定默认值参数：
b = a.get("three", "num 0")
b  # num 0
```

#### pop 方法删除元素

pop 方法可以用来弹出字典中某个键对应的值，同时也可以指定默认参数：

d.pop(key, default = None)

```python
a = {'first': 'num 1', 'second': 'num 2'}
c = a.pop('first')
print(c)  # num 1
print(a)  # {u'second': u'num 2'}
```

```python
# 弹出不存在的键值：
d = a.pop("third", 'not exist')
print(d)  # not exist
```

```python
# 与列表一样，del 函数可以用来删除字典中特定的键值对，例如：
a = {'first': 'num 1', 'second': 'num 2'}
del a["first"]
print(a)  # {u'second': u'num 2'}
```

#### update方法更新字典

之前已经知道，可以通过索引来插入、修改单个键值对，
但是如果想对多个键值对进行操作，这种方法就显得比较麻烦，好在有 update 方法：

```python
my_dict = dict([('name', 'lili'),
                ('sex', 'female'),
                ('age', 32),
                ('address', 'beijing')])
# 把 ‘lili' 改成 'lucy'，同时插入 'single' 到 'marriage'
dict_update = {'name': 'lucy', 'marriage': 'single'}
my_dict.update(dict_update)
print(my_dict)
```

```python
import pprint
# {u'marriage': u'single',
# u'name': u'lucy',
# u'address': u'beijing',
# u'age': 32,
# u'sex': u'female'}
pprint.pprint(my_dict)  # 华丽丽的显示方式
```

```python
my_dict # ipython的dict显示跟pprint的格式一样华丽
```

通过关键词 `in` 查询字典中是否有该键：

```python
barn = {'cows': 1, 'dogs': 5, 'cats': 3}
# in 可以用来判断字典中是否有某个特定的键：
print('chickens' in barn)  # False
print('cows' in barn)  # True
```

#### keys 方法，values 方法和items 方法

- `d.keys()` 返回一个由所有键组成的列表；
- `d.values()` 返回一个由所有值组成的列表；
- `d.items()` 返回一个由所有键值对元组组成的列表；

```python
print(barn.keys())  # [u'cows', u'cats', u'dogs']
print(barn.values())  # [1, 3, 5]
print(barn.items())  # [(u'cows', 1), (u'cats', 3), (u'dogs', 5)]
```

```python
for key, val in barn.items():
    print(key, val)
    # cows 1
    # cats 3
    # dogs 5
```

### 集合

列表和字符串都是一种有序序列，而集合 set 是一种无序的序列。

因为集合是无序的，所以当集合中存在两个同样的元素的时候，只会保存其中的一个（唯一性）；
同时为了确保其中不包含同样的元素，集合中放入的元素只能是不可变的对象（确定性）。

#### 创建集合

```python
# 可以用set()函数来显示的生成空集合：
a = set()
print(a)
print(type(a))
```

```python
# 使用一个列表来初始化一个集合：
a = set([1, 2, 3, 1])
a  # 集合会自动去除重复元素 1。
```

```python
# 集合中的元素是用大括号{}包含起来的，这意味着可以用{}的形式来创建集合：
a = {1, 2, 3, 1}
print(a)  # {1, 2, 3}
```

```python
# 但是创建空集合的时候只能用set来创建，因为在Python中{}创建的是一个空的字典：
s = {}
print(type(s))  # <type 'dict'>
```

#### 集合操作

```python
a = {1, 2, 3, 4}
b = {2, 3, 4, 5}
```

##### 并

两个集合的并，返回包含两个集合所有元素的集合（去除重复）。
可以用方法 a.union(b) 或者操作 a | b 实现。

```python
c = a.union(b)
print(c)  # {1, 2, 3, 4, 5, 6}

# 操作 a | b 实现
d = a | b
print(c)
```

```python
c == d
```

##### 交

两个集合的交，返回包含两个集合共有元素的集合。

可以用方法 a.intersection(b) 或者操作 a & b 实现。

```python
c = a.intersection(b)
print(c)  # set([2, 3, 4])

d = a & b
print(d)

c == d
```

##### 差

a 和 b 的差集，返回只在 a 不在 b 的元素组成的集合。

可以用方法 a.difference(b) 或者操作 a - b 实现。

```python
c = a.difference(b)
print(c)  # set([1])
d = a - b
print(d)
```

##### 对称差

a 和b 的对称差集，返回在 a 或在 b 中，但是不同时在 a 和 b 中的元素组成的集合。

可以用方法 a.symmetric_difference(b) 或者操作 a ^ b 实现（异或操作符）。

```python
c = a.symmetric_difference(b)
print(c)  # set([1, 5])

d = a ^ b
print(d)
```

##### 包含关系

要判断 b 是不是 a 的子集，可以用 b.issubset(a) 方法，
或者更简单的用操作 b `<=` a ：

```python
a = {1, 2, 3}
b = {1, 2}

c = b.issubset(a)
print(c)  # True

d = (b <= a)
print(d)
```

也可以用 a.issuperset(b) 或者 a >= b 来判断：

```python
print(a >= b)
```

方法只能用来测试子集，但是操作符可以用来判断真子集：

```python
print(a < a)  # False
print(a <= a)  # True
```

#### 集合方法

##### add 方法向集合添加单个元素

跟列表的 append 方法类似，用来向集合添加单个元素。

s.add(a) 将元素 a 加入集合 s 中。

```python
s = {1, 3, 4}
s.add(4)
print(s)  # set([1, 3, 4])

s.add(5)
print(s)  # set([1, 3, 4, 5])
```

##### update 方法向集合添加多个元素

跟列表的extend方法类似，用来向集合添加多个元素。

s.update(seq)

```python
s.update([10, 11, 12])
print(s)  # set([1, 3, 4, 5, 10, 11, 12])
```

```python
# remove 方法移除单个元素
s = {1, 3, 4}
s.remove(1)
print(s)  # set([3, 4])
```

##### pop 方法弹出元素

由于集合没有顺序，不能像列表一样按照位置弹出元素，

所以 pop 方法删除并返回集合中任意一个元素，如果集合中没有元素会报错。

```python
s = {1, 3, 4}
d = s.pop()
print(s, d)
```

```python
# discard 方法作用与 remove 一样
s = {1, 3, 4}
s.discard(3)
print(s)  # set([1, 4])
```

##### difference_update方法

a.difference_update(b) 从a中去除所有属于b的元素：

```python
a = {1, 2, 3, 4}
b = {2, 3, 4, 5}
a.difference_update(b)
print(a)  # set([1])
```

### 条件语句

```python
a = 62
print("exam score check:")
if a >= 60:
    print("student pass")
elif a == 0:
    print("student 0: not pass")
else:
    print("student not pass")
```

可以使用 and ， or , not 等关键词结合多个判断条件：

```python
a = 10
b = -5
print(a > 0 and b < 0)  # True
print(not a > 0)  # False
print(a < 0 or b < 0)  # True
```

#### 一个例子

```python
year = 1900
if year % 400 == 0:
    print("This is a leap year!")
# 两个条件都满足才执行
elif year % 4 == 0 and year % 100 != 0:
    print("This is a leap year!")
else:
    print("This is not a leap year.")
# This is not a leap year.
```

#### 判断列表

```python
my_list = [1, 2]
# 判断一个列表是否为空。
if len(my_list) > 0:
    print("the first element is: ", my_list[0])
else:
    print("no element.")

```

### 循环

#### for循环

```python
# for 循环
total = 0
for i in range(100000):
    total += i
print(total)  # 4999950000
```

#### while 循环

```python
while <condition>:
     <statesments>
    
```

Python会循环执行**statesments**，直到**condition**不满足为止。

```python
i = 0
total = 0
while i <= 100:
    total += i
    i += 1
print(total)  # 5050
```

举个例子，通过while遍历集合：

```python
# 空容器会被当成False，因此可以用while循环读取容器的所有元素
plays = set(['Hamlet', 'Mac', 'King'])
while plays:
    play = plays.pop()
    print('Perform', play)
```

#### continue 语句

遇到 continue 的时候，程序会返回到循环的最开始重新执行。

```python
values = [7, 6, 4, 7, 19, 2, 1]
for i in values:
    if i % 2 != 0:
        # 忽略奇数
        continue
    print(i)
# 6
# 4
# 2
```

#### break 语句

遇到 break 的时候，程序会跳出循环，不管循环条件是不是满足

```python
command_list = ['start',
                '1',
                '2',
                '3',
                '4',
                'stop',
                'restart',
                '5',
                '6']
while command_list:
    command = command_list.pop(0)
    if command == 'stop':
        break
    print(command)
# start
# 1
# 2
# 3
# 4

```

### 函数

为了减少重复，函数登场。

#### 定义函数

在Python中可以使用 def 关键字来定义函数，程序中函数的参数就相当于是数学上说的函数的自变量，可以通过 return 关键字来返回一个值，这相当于数学上说的函数的因变量。

```python
def add(a, b):
    """
    add two nums
    :param a: first num
    :param b: second num
    :return: result
    """
    c = a + b
    return c
```

#### 使用函数

使用函数时，只需要将参数换成特定的值传给函数。

```python
# Python并没有限定参数的类型，因此可以使用不同的参数类型：
print(add(2, 3))

print(add('foo', 'bar'))  # foobar
```

传入参数时，Python提供了两种选项，

第一种是上面使用的按照位置传入参数，

另一种则是使用关键词模式，显式地指定参数的值：

```python
add(a=2, b=3)
```

```python
add(b='morning', a='good')
```

```python
add(2, b=3)  # 5
```

#### 设定默认参数

```python
def quad(x, a=1, b=0, c=0):
    return a * x * x + b * x + c
```

```python
quad(2.0)
```

```python
quad(2.0, b=3)
```

#### 接收不定参数

使用如下方法，可以使函数接受不定数目的参数,类似java的..多个参数：

```python
def add(x, *args):
    total = x
    for arg in args:
        total += arg
    return total
```

*args 表示参数数目不定，可以看成一个元组，

把第一个参数后面的参数当作元组中的元素。

```python
print(add(1, 2, 3, 4, 5))  # 15
print(add(1, 2))  # 3
```

#### 使用关键词传入参数

```python
def add(x, **kwargs):
    total = x
    for arg, val in kwargs.items():
        print("adding ", arg)
        total += val
    return total
```

**kwargs 表示参数数目不定，相当于一个字典，关键词和值对应于键值对。

```python
add(1, a=2, b=3)  # 6
```

```python
# 可以接收任意数目的位置参数和键值对参数：
def fun1(*args, **kwargs):
    print(args, kwargs)
    
fun1(2, 3, a="bar", b=10)  # (2, 3) {'a': u'bar', 'b': 10}
```

#### 返回多个值

```python
# 函数可以返回多个值：
def to_val(x, y):
    r = (x ** 2 + y ** 2) ** 0.5
    total = x + y
    return r, total
```

```python
a, b = to_val(3, 4)
print(a, b)  # 5.0 7
```

```python
# 事实上，Python将返回的两个值变成了元组：
print(to_val(3, 4))  # (5.0, 7)
```

```python
# 列表也有相似的功能,可以用来赋值：
a, b, c = [1, 2, 3]
print(a, b, c)
```

```python
# 可以将参数用元组传入：
def add(a, b):
    return a + b

c = (2, 3)
print(add(*c))  # 5
# 这里的*必须要。
```

```python
# 还可以用字典传入参数哦：
d = {'a': 2, 'b': 5}
print(add(**d))  # 7
```

#### map 方法生成序列

map函数

map() 会根据提供的函数对指定序列做映射。

map(aFun, aSeq)

```python
def sqr(x):
    return x ** 2
```

```python
a = [2, 3, 4]
result = map(sqr, a)  # [4,9,16]
type(result)
```

```python
# map返回的是个迭代器对象, 可以转化为list显示

list(result)
```

事实上，根据函数参数的多少，map 可以接受多组序列，
将其对应的元素作为参数传入函数：

```python
def add(a, b):
    return a + b

a = [2, 3, 4]
list(map(sqr, a))  # [4,9,16]
```

```python
a = (2, 3, 4)
b = [10, 11, 15]
list(map(add, a, b))  # [12, 14, 19]
```

#### reduce

reduce() 函数会对参数序列中元素进行累积。

```python
from functools import reduce

def add(x, y) :            # 两数相加
    return x + y
sum1 = reduce(add, [1,2,3,4,5])   # 计算列表和：1+2+3+4+5
sum2 = reduce(lambda x, y: x+y, [1,2,3,4,5])  # 使用 lambda 匿名函数
print(sum1)
print(sum2)
```

### 高级函数

在 Python 中，函数是一种基本类型的对象，这意味着可以将函数作为参数传给另一个函数。

将函数作为字典的值储存，将函数作为另一个函数的返回值：

```python
def square(x):
    """Square of x."""
    return x * x


def cube(x):
    """Cube of x."""
    return x * x * x


# 函数的作为字典的值
funcs = {'square': square, 'cube': cube, }
x = 2
for func in sorted(funcs):
    print(func, funcs[func](x))
```

```python
func
```

```python
funcs
```

#### 函数参数

引用传递

传递给函数 f 的是一个指向 x 所包含内容的引用，
如果我们修改了这个引用所指向内容的值（例如 x[0]=999），
那么外面的 x 的值也会被改变：

```python
def mod_f(x):
    x[0] = 999
    return x

x = [1, 2, 3]

x # [1, 2, 3]
```

```python
mod_f(x) # [999, 2, 3]
```

```python
x # [999, 2, 3]
```

过如果我们在函数中赋给 x 一个新的值（例如另一个列表），

那么在函数外面的 x 的值不会改变：

```python
def no_mod_f(x):
    x = [4, 5, 6]
    return x


x = [1, 2, 3]

print(x)
print(mod_f(x))
print(x)
# [1, 2, 3]
# [999, 2, 3]
# [999, 2, 3]
```

#### 高阶函数

以函数作为参数，或者返回一个函数的函数是高阶函数，
常用的例子有 map 和 filter 函数

map(f, sq) 函数将 f 作用到 sq 的每个元素上去，并返回结果组成的列表，

相当于：[f(s) for s in sq]

```python
map(square, range(5))  # [0, 1, 4, 9, 16]
```

```python
# 外面套个list，强转为list类型，是为了打印出函数的值
list(map(square, range(5)))
```

```python
def is_even(x):
    return x % 2 == 0


list(filter(is_even, range(5)))  # [0, 2, 4]
```

```python
list(map(square, filter(is_even, range(5))))  # [0, 4, 16]
```

reduce(f, sq) 函数接受一个二元操作函数 f(x,y)，
并对于序列 sq 每次合并两个元素：

```python
from functools import reduce
def my_add(x, y):
    return x + y


reduce(my_add, [1, 2, 3])
```

返回一个函数：

```python
def get_logger_func(target):
    def write_logger(data):
        with open(target, 'a') as f:
            f.write(data + '\n')

    return write_logger


fun_logger = get_logger_func('foo.txt')
fun_logger('hello')
```

```python
# 查看foo.txt 是否生成
import os
os.path.exists('foo.txt')
```

#### 匿名函数lambda

```python
list(map(square, range(5)))
```

```python
# 用匿名函数替换为：
list(map(lambda x: x * x, range(5)))
```

匿名函数虽然写起来比较方便（省去了定义函数的烦恼），
但是有时候会比较难于阅读：

```python
s1 = reduce(lambda x, y: x + y, map(lambda x: x ** 2, range(1, 3)))
print(s1)  # 5
```

```python
# 简单的写法：
s2 = sum(x ** 2 for x in range(1, 3))
print(s2)  # 5
```

#### global 变量

要在函数中修改全局变量的值，需要加上 global 关键字：

```python
x = 15

def print_newx():
    global x
    x = 18
    print(x)


print_newx()
print(x)

# 18
# 18
```

如果不加上这句 global 那么全局变量的值不会改变：

```python
x = 15


def print_newx2():
    x = 18
    print(x)


print_newx2()
print(x)


# 18
# 15
```

#### 递归

一般对于分治法，要用递归，不过在python中不怎么用，更高效的处理非波切利算法：

```python
def fib(n):
    """Fib without recursion."""
    a, b = 0, 1
    for i in range(1, n + 1):
        a, b = b, a + b
    return b


print([fib(i) for i in range(10)])

```

### 模块

用模块管理函数，Python中每个文件就代表了一个模块（module），

Python会将所有 .py 结尾的文件认定为Python代码文件。

在使用函数的时候我们通过import关键字导入指定的模块：

`module1.py`

```python
def foo():
    print('hello, world!')

```

`module2.py`

```python
def foo():
    print('goodbye, world!')
```

`test.py`

```python
from module1 import foo

# 输出hello, world!
foo()

from module2 import foo

# 输出goodbye, world!
foo()
```

#### **name** 属性

有时候我们想将一个 .py 文件既当作脚本，又能当作模块用，
这个时候可以使用 **name** 这个属性。

```python
PI = 3.14


def get_sum(lst):
    """
    Sum the values in the list
    :param lst:
    :return:
    """
    total = 0
    for v in lst:
        total = total + v
    return total

```

上文保存为ex.py

```python
with open('ex.py', 'w') as f:
    f.write("""
PI = 3.14
def get_sum(lst):
    total = 0
    for v in lst:
        total = total + v
    return total
    """)
```

使用 ! 调用shell命令：

```python
!cat ex.py
```

可以从ex模块中导入函数get_sum和变量：

```python
from ex import PI, get_sum

print(PI)  # 3.14
print(get_sum([2, 3]))  # 5

# 可以使用 * 导入所有变量, 不提倡，因为可能覆盖一些已有的函数
```

```python
# 删除文件：
import os

os.remove('ex.py')
```

#### 模块导入顺序

通常情况下，当使用 import 语句导入模块后，Python 会按照以下顺序查找指定的模块文件：

> 前目录，即当前执行的程序文件所在目录下查找；

> 到 PYTHONPATH（环境变量）下的每个目录中查找；

> 到 Python 默认的安装目录下查找。

以上所有涉及到的目录，都保存在标准模块 sys 的 sys.path 变量中，通过此变量我们可以看到指定程序文件支持查找的所有目录。换句话说，如果要导入的模块没有存储在 sys.path 显示的目录中，那么导入该模块并运行程序时，Python 解释器就会抛出 ModuleNotFoundError（未找到模块）异常。

解决“Python找不到指定模块”的方法有 3 种，分别是：

> 向 sys.path 中临时添加模块文件存储位置的完整路径；

> 将模块放在 sys.path 变量中已包含的模块加载路径中；

> 设置 path 系统环境变量。

#### 垃圾回收机制

如果持续不断加载数据，调用函数模块，计算机的内存会溢出，Python的垃圾回收机制。是计数机制，当一个对象的引用数为0时，它就会被垃圾回收机制回收。

```python
import sys
# 生以下四种情况的时候，该对象的引用计数器+1
a= 999 # 对象被创建  
b=a   # 对象被引用 
def func(a):
    return
func(a)   # 对象被作为参数,传到函数中
List=[a,"a","b",2]   # 对象作为一个元素，存储在容器中   
sys.getrefcount(a)
# python系统内部很多地方都在使用一些常用的对象，这些对象在python解释器启动时就被创建出来。

#发生以下四种情况时，该对象的引用计数器**-1**

#该对象的别名被显式销毁时    
del a
#该对象的引别名被赋予新的对象，   
a = 999
#个对象离开它的作用域，例如 func函数执行完毕时，函数里面的局部变量的引用计数器就会减一（但是全局变量不会）
#该元素从容器中删除时，或者容器被销毁时。
b = a  # 当前计数器为2
del b # 删除变量b：b对应的对象的引用计数器-1   （此时计数器为1）
del a # 删除变量a：a对应的对象的引用计数器-1    (此时引用计数器为0)

# 当引用计数器为0 时，意味着没有人再使用这个对象，这个对象就变成垃圾，垃圾回收。
# 回收：1.对象从refchain的链表移除。
#.将对象进行销毁，内存归还给操作系统，可用内存就增加。
sys.getrefcount(a)
```