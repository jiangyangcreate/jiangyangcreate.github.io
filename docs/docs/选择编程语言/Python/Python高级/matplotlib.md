---
sidebar_position: 3
title: matplotlib
---

## matplotlib

### 二维直线图

```python showLineNumbers
import numpy as np
from matplotlib import pyplot as plt
#  生成一个-3到3的等差数列，共100个数
a = np.linspace(-3, 3, 10)

# 三角函数
b = np.sin(a)
```

```python showLineNumbers
plt.plot(a, b)
# 等价于 plt.plot(b)
plt.show() # 正弦图
```

### 绘制多条数据线

```python showLineNumbers
# 画出多条数据线：
plt.plot(a, np.sin(a))
plt.plot(a, np.sin(2 * a))
plt.show()
```

### 线条修饰

```python showLineNumbers
# 使用字符串，给定线条参数：
# b:蓝色
# -- : 虚线
# o : 圆点
'''
完整参数可参考
https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html#matplotlib.pyplot.plot
'''
plt.plot(a, np.sin(a), 'b--o')
plt.show()
```

### 散点图

```python showLineNumbers
plt.plot(a, np.sin(a), 'bo')
plt.show()  # 二维散点图
# 等价于
plt.scatter(a, np.sin(a),color='blue',marker='o')
plt.show()
```

```python showLineNumbers
t = np.linspace(0, 2 * np.pi, 50)
x = np.sin(t)
plt.plot(t, x, 'bo', t, np.sin(2 * t), 'r-^', label='sin', color='red', )
plt.legend()
plt.xlabel('radians')
plt.ylabel('amplitude', fontsize='large')
plt.title('Sin(x)')
plt.grid()
plt.show()
```

```python showLineNumbers
# 直方图
data = np.array([1234, 321, 400, 120, 11, 30, 2000])
plt.hist(data, 7)
plt.show()
```

### 绘制三维数据

```python showLineNumbers
# 高维 RBF 插值
# 三维数据点：
import numpy as np
from matplotlib import pyplot as plt
x, y = np.mgrid[-np.pi / 2:np.pi / 2:5j, -np.pi / 2:np.pi / 2:5j]
z = np.cos(np.sqrt(x ** 2 + y ** 2))
fig = plt.figure(figsize=(12, 6))
ax = fig.add_subplot(projection='3d')
ax.scatter(x, y, z)
fig.savefig("mplot3d.jpg")
plt.show()
```

### 直方图

```python showLineNumbers
import numpy as np
from matplotlib import pyplot as plt
# 正态分布
from scipy.stats import norm
x_norm = norm.rvs(size=500)
x_norm.shape

plt.ion() #开启interactive mode

h = plt.hist(x_norm)
print('counts, ', h[0])
print('bin centers', h[1])
figure = plt.figure(1)  # 创建图表1
plt.show()
```

归一化直方图（用出现频率代替次数），将划分区间变为 20（默认 10）：

```python showLineNumbers
h = plt.hist(x_norm, bins=20)
plt.show()
```

多组直方图

```python showLineNumbers
from scipy.stats import norm
from scipy.stats import ttest_ind

# 独立样本 t 检验
# 两组参数不同的正态分布：
n1 = norm(loc=0.3, scale=1.0)
n2 = norm(loc=0, scale=1.0)

# 从分布中产生两组随机样本：
n1_samples = n1.rvs(size=100)
n2_samples = n2.rvs(size=100)

# 将两组样本混合在一起：
samples = np.hstack((n1_samples, n2_samples))

# 最大似然参数估计：
loc, scale = norm.fit(samples)
n = norm(loc=loc, scale=scale)

# 比较：
x = np.linspace(-3, 3, 100)

plt.hist([samples, n1_samples, n2_samples])
plt.plot(x, n.pdf(x), 'b-')
plt.plot(x, n1.pdf(x), 'g-')
plt.plot(x, n2.pdf(x), 'r-')
plt.show()
```

### 离散分布

```python showLineNumbers
# 离散分布
from scipy.stats import randint

# 离散均匀分布的概率质量函数（PMF）：
high = 10
low = -10

x = np.arange(low, high + 1, 0.5)
p = plt.stem(x, randint(low, high).pmf(x))  # 杆状图
plt.show()
```

### 图内填充

```python showLineNumbers
from scipy.integrate import trapz

x1 = np.linspace(-2, 2, 108)
p = trapz(norm.pdf(x1), x1)
print('{:.2%} of the values lie between -2 and 2'.format(p))

plt.fill_between(x1, norm.pdf(x1), color='red')
plt.plot(x, norm.pdf(x), 'k-')
plt.show()
```
