---
sidebar_position: 1
title: numpy
---

## numpy

### 数组：array

很多其他科学计算的第三方库都是以 Numpy 为基础建立的。

Numpy 的一个重要特性是它的数组计算。

使用前一定要先导入 Numpy 包，导入的方法有以下几种：

```
import numpy
import numpy as np
from numpy import *
from numpy import array, sin
```

导入 numpy，最常用为这种:

```python showLineNumbers
import numpy as np
```

假如我们想将列表中的每个元素增加 1，但列表不支持这样的操作（报错）：

```python showLineNumbers
a = [1, 2]

# a + 1 # 报错
```

使用 numpy.array：

```python showLineNumbers
a = np.array(a)
a  # [1 2]
```

```python showLineNumbers
b = a + 1
b  # array([2,3])
```

与另一个 array 相加，得到对应元素相加的结果：

```python showLineNumbers
c = a + b
print(c)  # array([3,5])

# 对应元素相乘：
print(a * b)  # [2 6]

# 对应元素乘方：
print(a ** b)  # [1 8]
```

#### 数组的合并

```python showLineNumbers
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.arange(2) # np.array([0, 1])
print(a, b)
'''[[1 2]
 [3 4]] [0 1]'''

# 正确的做法是：
np.append(a, b) # array([1, 2, 3, 4, 0, 1])

# 错误的做法是：
print(list(a)+ list(b)) # [array([1, 2]), array([3, 4]), 0, 1]
```

#### 提取数组中的元素

```python showLineNumbers
# 提取第一个
a = np.array([1, 2, 3, 4])
print(a[0])  # 1

# 提取前两个元素：
print(a[:2])  # [1 2]

# 最后两个元素
print(a[-2:])  # [3 4]

# 相加：
print(a[:2] + a[-2:])  # [4 6]
```

#### 修改数组形状

查看 array 的形状：

```python showLineNumbers
b = a.shape
b  # (4,)
```

```python showLineNumbers
# 修改 array 的形状：
a.shape = 2, 2
a
# [[1 2]
# [3 4]]
```

```python showLineNumbers
# 多维数组
# a 现在变成了一个二维的数组，可以进行加法：
a + a
# [[2 4]
#  [6 8]]
```

```python showLineNumbers
# 乘法仍然是对应元素的乘积，并不是按照矩阵乘法来计算：
a * a
# [[ 1  4]
# [ 9 16]]
```

### Numpy 索引：index

```python showLineNumbers
import numpy as np

# 查看形状，会返回一个元组，每个元素代表这一维的元素数目：
a = np.array([1, 2, 3, 5])
# 1维数组，返回一个元组
a.shape
```

```python showLineNumbers
# 查看元素数目：
a.size
```

使用 fill 方法设定初始值

可以使用 fill 方法将数组设为指定值：

```python showLineNumbers
print(a)
a.fill(-4)
print(a)
```

```python showLineNumbers
# 切片，支持负索引：
a = np.array([11, 12, 13, 14, 15])
print(a[1:-2])  # [12 13]
```

```python showLineNumbers
# 省略参数：
print(a[::2])  # [11 13 15]
print(a[-2:])  # array([14, 15])
```

假设我们记录一辆汽车表盘上每天显示的里程数：

```python showLineNumbers
rec = np.array([21000, 21180, 21240, 22100, 22400])
dist = rec[1:] - rec[:-1] # 后一天减去前一天的
dist
```

#### 多维数组的索引

```python showLineNumbers
a = np.array([[1, 2, 3], [7, 8, 9]])
a
```

```python showLineNumbers
# 查看形状：
print(a.shape)

# 查看总的元素个数：
print(a.size)

# 查看维数：
print(a.ndim)

# 对于二维数组，可以传入两个数字来索引：
print(a[1, 1])

# 索引一整行内容：
print(a[0])
```

多维数组的复杂一点的例子:

```python showLineNumbers
a = np.array([[0, 1, 2, 3, 4, 5],
               [10, 11, 12, 13, 14, 15],
               [20, 21, 22, 23, 24, 25],
               [30, 31, 32, 33, 34, 35],
               [40, 41, 42, 43, 44, 45],
               [50, 51, 52, 53, 54, 55]])

# 想得到第一行的第 4 和第 5 两个元素：
print(a[0, 3:5])  # [3 4]

# 得到最后两行的最后两列：
print(a[4:, 4:])  # [[44 45][54 55]]

# 得到第三列：
print(a[:, 2])  # [ 2 12 22 32 42 52]
```

取出 3，5 行的奇数列：

```python showLineNumbers
b = a[2::2, ::2]
b
```

**切片在内存中使用的是引用机制**

引用机制意味着，Python 并没有为 b 分配新的空间来存储它的值，
而是让 b 指向了 a 所分配的内存空间，因此，改变 b 会改变 a 的值：

```python showLineNumbers
a = np.array([0, 1, 2, 3, 4])
b = a[2:4]

b
```

```python showLineNumbers
b[0] = 10

b
```

```python showLineNumbers
a
```

```python showLineNumbers
# 而这种现象在列表中并不会出现：
b = a[2:3]
b[0] = 12
print(a)

# 解决方法是使用copy()方法产生一个复制，这个复制会申请新的内存：
b = a[2:4].copy()
b[0] = 10
print(a, b)
```

#### 一维花式索引

与 range 函数类似，我们可以使用 arange 函数来产生等差数组。

```python showLineNumbers
a = np.arange(0, 80, 10)
a
```

```python showLineNumbers
# 花式索引需要指定索引位置：
indices = [1, 2, -3]
y = a[indices]

y
```

```python showLineNumbers
# 还可以使用布尔数组来花式索引：
mask = np.array([0, 1, 1, 0, 0, 1, 0, 1], dtype=bool)
a[mask]  # [10 20 50 70]
```

选出了所有大于 0.5 的值：

```python showLineNumbers
from numpy.random import rand

a = rand(10)
a
```

```python showLineNumbers
mask = a > 0.5
a[mask]
```

#### “不完全”索引

只给定行索引的时候，返回整行：

```python showLineNumbers
a = np.array([[0, 1, 2, 3, 4, 5],
           [10, 11, 12, 13, 14, 15],
           [20, 21, 22, 23, 24, 25],
           [30, 31, 32, 33, 34, 35],
           [40, 41, 42, 43, 44, 45],
           [50, 51, 52, 53, 54, 55]])
b = a[:3]
b
```

```python showLineNumbers
# 这时候也可以使用花式索引取出第2，3，5行：
condition = np.array([0, 1, 1, 0, 1, 0], dtype=bool)
c = a[condition]
c
```

#### where 语句

where(array)

where 函数会返回所有非零元素的索引。

```python showLineNumbers
a = np.array([1, 2, 4, 6])
a > 2  # [False False  True  True]
```

```python showLineNumbers
b = np.where(a > 2)
b # 返回的是索引位置
```

```python showLineNumbers
# 注意到 where 的返回值是一个元组。
index = np.where(a > 2)[0]
print(index)  # [2 3]

# 可以直接用 where 的返回值进行索引：
loc = np.where(a > 2)
b = a[loc]
print(b)  # [4 6]
```

考虑二维数组：

```python showLineNumbers
a = np.array([[0, 12, 5, 20],
           [1, 2, 11, 15]])
loc = np.where(a > 10)
print(loc)  # (array([0, 0, 1, 1]), array([1, 3, 2, 3]))

# 也可以直接用来索引a：
b = a[loc]
print(b)  # [12 20 11 15]
```

或者可以这样：

```python showLineNumbers
rows, cols = np.where(a > 10)
print(rows)
print(cols)
print(a[rows, cols])
```

例子：

```python showLineNumbers
a = np.arange(20)
a.shape = 5, 4
a
```

```python showLineNumbers
a > 12
```

```python showLineNumbers
b = np.where(a > 12)
b
# (array([3, 3, 3, 4, 4, 4, 4]), array([1, 2, 3, 0, 1, 2, 3]))
```

```python showLineNumbers
a[b]  # [13 14 15 16 17 18 19]
```

### Numpy 方法

Numpy 的常用方法。

```python showLineNumbers
import numpy as np

a = np.array([[0, 1, 2, 3], [4, 5, 6, 7]])
a
```

```python showLineNumbers
for row in a:
    print(row)
```

所有元素的迭代器：

```python showLineNumbers
for i in a.flat:
    print(i)
```

#### 矩阵转置

```python showLineNumbers
print(a)
print(a.T)
print(a)
print(a.shape)  # 数组形状 (m,n,o,...)
```

```python showLineNumbers
print(a.size)  # 数组元素数
a.resize((4, 2))
print(a)
print(a.shape)
```

#### squeeze

把 shape 为 1 的维度去掉：

```python showLineNumbers
a = np.arange(10).reshape(1,10)
a
```

```python showLineNumbers
a.shape
```

```python showLineNumbers
b = np.squeeze(a)
b
```

```python showLineNumbers
b.shape
```

再举个多维的例子：

```python showLineNumbers
a = np.arange(10).reshape(1, 2, 5)
print(a)

print(a.shape)
```

```python showLineNumbers
b = np.squeeze(a)
b.shape
```

```python showLineNumbers
a.shape
```

#### 复制

```python showLineNumbers
a = np.array([[0, 1, 2, 3], [4, 5, 6, 7]])
b = a.copy()
b[0][0] = -1

b
```

#### 填充

```python showLineNumbers
b.fill(9)
b
```

```python showLineNumbers
# 转化为列表：
a.tolist()
```

#### 复数

```python showLineNumbers
# 实部：
b = np.array([1 + 2j, 3 + 4j, 5 + 6j])
c = b.real
print(c)

# 虚部：
d = b.imag
print(d)
```

```python showLineNumbers
# 共轭：
print(b.conj())

# 保存成文本：
a.dump("file.txt")


import os
os.path.exists('file.txt')
```

```python showLineNumbers
with open('file.txt', 'rb') as f:
    m = f.read()
m
```

```python showLineNumbers
# 字符串：
a.dumps()
```

```python showLineNumbers
# 写入文件
a.tofile('foo.csv', sep=',', format="%s")
os.path.exists('foo.csv')
```

```python showLineNumbers
with open('foo.csv') as f:
    m = f.read()
m
```

#### 排序

非零元素的索引：

```python showLineNumbers
b = a.nonzero()
a
```

```python showLineNumbers
b
```

```python showLineNumbers
# 排序：
b = np.array([3, 2, 7, 4, 1])
b.sort()
b
```

```python showLineNumbers
# 排序的索引位置：
b = np.array([2, 3, 1])
b.argsort(axis=-1)  # array([2, 0, 1])
```

```python showLineNumbers
# 将 b 插入 a 中的索引，使得 a 保持有序：
a = np.array([1, 3, 4, 6])
b = np.array([0, 2, 5])
print(a.searchsorted(b))
```

### 元素的数学操作

clip，限制在一定范围：

```python showLineNumbers
a = np.array([[4, 1, 3], [2, 1, 5]])
a.clip(0, 2)
```

```python showLineNumbers
a
```

```python showLineNumbers
# 近似：
a = np.array([1.344, 2.449, 2.558])
b = a.round(decimals=2)
b  # [ 1.34  2.45  2.56]
```

```python showLineNumbers
# 是否全部非零：
print(a.all())
```

```python showLineNumbers
import os

os.remove('foo.csv')
os.remove('file.txt')
```

#### 数组与字符串的转换

tobytes 函数

```python showLineNumbers
a = np.array([[1, 2], [3, 4]], dtype=np.uint8)
print(a)
print(a.tobytes())
```

frombuffer 函数

可以使用 frombuffer 函数从字符串中读出数据，不过要指定类型：

```python showLineNumbers
s = a.tobytes()
b = np.frombuffer(s, dtype=np.uint8)
b
```

此时，返回的数组是一维的，需要重新设定维度：

```python showLineNumbers
b.shape = 2, 2
b
```

```python showLineNumbers
# 可以使用reshape：
b = np.frombuffer(s, dtype=np.uint8).reshape(2, 2)
b
```

### 文本中读取数组

对于读文本文件，推荐使用:

- loadtxt
- genfromtxt
- savetxt

对于二进制文本文件，推荐使用

- save
- load
- savez

#### loadtxt 函数

```
loadtxt(fname, dtype=<type 'float'>,
        comments='#', delimiter=None,
        converters=None, skiprows=0,
        usecols=None, unpack=False, ndmin=0)
```

- loadtxt 有很多可选参数，其中 delimiter 就是刚才用到的分隔符参数。
- skiprows 参数表示忽略开头的行数，可以用来读写含有标题的文本

```python showLineNumbers
data_file = "../data/numpy/data.txt"
c = np.loadtxt(data_file, dtype=int)
c
```

```python showLineNumbers
c.shape
```

#### genfromtxt

genfromtxt 函数功能更为全面，
能处理更多的情况，但相应的速度和效率会慢一些。

```python showLineNumbers
help(np.genfromtxt)
```

```python showLineNumbers
g = np.genfromtxt(data_file)
g
```

当然，还有很笨的写法：

首先将数据转化成一个列表组成的列表，再将这个列表转换为数组：

```python showLineNumbers
data = []

with open(data_file) as f:
    # 每次读一行
    for line in f:
        fileds = line.split()
        row_data = [float(x) for x in fileds]
        data.append(row_data)

data = np.array(data)
data
```

```python showLineNumbers
# loadtxt 的更多特性
sp_file = '../data/numpy/special_data.txt'
data = np.loadtxt(sp_file,
                  dtype=int,
                  comments='%',  # 百分号为注释符
                  delimiter=',',  # 逗号分割
                  skiprows=1,  # 忽略第一行
                  usecols=(0, 1, 2, 4))  # 指定使用哪几列数据
data
```

#### loadtxt 自定义转换方法

loadtxt 返回的值为字节字符串 bytes, 对字符串解码用函数 decode(‘asii’)，变成 str 格式：

```python showLineNumbers
import datetime


def date_converter(s):
    return datetime.datetime.strptime(s.decode('ascii'), "%Y-%m-%d")

date_file = '../data/numpy/datetime_data.txt'
data = np.loadtxt(date_file,
                  dtype=object,  # 数据类型为对象
                  converters={0: date_converter,  # 第一列使用自定义转换方法
                              1: float,  # 第二第三列使用浮点数转换
                              2: float})

data
```

#### 将数组写入文件

savetxt 可以将数组写入文件，默认使用科学计数法的形式保存：

```python showLineNumbers
a = np.array([[1, 2, 3], [5, 6, 7]])
np.savetxt('out.txt', a)

# 可以用类似printf 的方式指定输出的格式：
a = np.array([[1, 2, 3], [5, 6, 7]])
print(a.shape)

np.savetxt('out_fmt.txt', a, fmt=['%d'] * a.shape[1], newline='\n')
```

```python showLineNumbers
with open('out_fmt.txt') as f:
    for line in f:
        print(line)
```

```python showLineNumbers
m = zip([1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e'])
m = list(m)

z = np.array(m)
print(z)

np.savetxt('out_str_fmt.txt', z, fmt=['%s'] * z.shape[1])
```

```python showLineNumbers
import os
os.remove('out.txt')
os.remove('out_fmt.txt')
os.remove('out_str_fmt.txt')
```

### Numpy 二进制格式

保存的方法：

- save(file, arr) 保存单个数组，.npy 格式
- savez(file, \*args, \*\*kwds) 保存多个数组，无压缩的 .npz 格式
- savez_compressed(file, \*args, \*\*kwds) 保存多个数组，有压缩的 .npz 格式

```python showLineNumbers
a = np.array([[1, 2], [3, 4]])
np.save('out.npy', a)
```

```python showLineNumbers
# 二进制与文本大小比较
a = np.arange(10000.)
np.savetxt('a.txt', a)
```

```python showLineNumbers
# 查看大小：
import os

print(os.stat('a.txt').st_size)

# 保存为二进制
np.save('a.npy', a)
print(os.stat('a.npy').st_size)
```

二进制文件大约是文本文件的三分之一。

```python showLineNumbers
# 保存多个数组
a = np.array([[1, 2], [3, 4]])
b = np.arange(1000)
print(a)
print(b)
```

```python showLineNumbers
np.savez('ab.npz', a=a, b=b)
```

```python showLineNumbers
# 加载数据
ab = np.load('ab.npz')
print(os.stat('ab.npz').st_size)  # file size
print(ab.keys())
print(list(ab.keys()))

print(ab['a'].shape)
print(ab['b'].shape)
```

```python showLineNumbers
np.savez_compressed('ab_compressed.npz', a=a, b=b)
print(os.stat('ab_compressed.npz').st_size)  # file size
```

```python showLineNumbers
os.remove('out.npy')
os.remove('a.txt')
os.remove('a.npy')
os.remove('ab.npz')
os.remove('ab_compressed.npz')
```

### 生成数组的函数

#### arange 生成数组，[start,stop)

arange(start, stop=None, step=1, dtype=None)

```python showLineNumbers
np.arange(5)  # [0 1 2 3 4]
```

```python showLineNumbers
a = np.arange(0, 2 * np.pi, np.pi / 4)
a
```

#### linspace

linspace(start,stop,N)

产生 N 个等距分布在[start,stop]间的元素组成的数组，包括 start,stop

```python showLineNumbers
np.linspace(0, 1, 5)  # [ 0.    0.25  0.5   0.75  1.  ]
```

#### logspace

logspace(start, stop, N)

产生 N 个对数等距分布的数组，默认以 10 为底：

```python showLineNumbers
np.logspace(0, 1, 5)
```

产生的值为$\left[10^0, 10^{0.25},10^{0.5},10^{0.75},10^1\right]$。

#### meshgrid

二维平面中生成一个网格

```python showLineNumbers
x_ticks = np.linspace(-1, 1, 5)
y_ticks = np.linspace(-1, 1, 5)
x, y = np.meshgrid(x_ticks, y_ticks)
print(x_ticks)
print(x)
```

#### 图例

```python showLineNumbers
import matplotlib.pyplot as plt
from matplotlib import cm


def f(x, y):
    # sinc 函数
    r = np.sqrt(x ** 2 + y ** 2)
    result = np.sin(r) / r
    result[r == 0] = 1.0
    return result


x_ticks = np.linspace(-10, 10, 51)
y_ticks = np.linspace(-10, 10, 51)

x, y = np.meshgrid(x_ticks, y_ticks, sparse=True)
print(x)  # x, y 中有很多冗余的元素，这里提供了一个 sparse 的选项去冗余
```

```python showLineNumbers
z = f(x, y)
```

```python showLineNumbers
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.plot_surface(x, y, z,
                rstride=1, cstride=1,
                cmap=cm.YlGnBu_r)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
plt.show()
```

### 内存映射

Numpy 有对内存映射的支持。

内存映射也是一种处理文件的方法，主要的函数有：

- memmap
- frombuffer
- ndarray constructor

使用内存映射文件处理存储于磁盘上的文件时，将不必再对文件执行 I/O 操作，
使得内存映射文件在处理大数据量的文件时能起到相当重要的作用。

```python showLineNumbers
memmap(filename,
       dtype=uint8,
       mode='r+'
       offset=0
       shape=None
       order=0)
```

mode 表示文件被打开的类型：

- r 只读
- c 复制+写，但是不改变源文件
- r+ 读写，使用 flush 方法会将更改的内容写入文件
- w+ 写，如果存在则将数据覆盖