---
sidebar_position: 2
title: 传统算法入门
---

## scikit-learn 数据的来源？

### 参考数据集

scikit-learn 内置有一些小型标准数据集，不需要从某个外部网站下载任何文件。

scikit-learn 提供也加载较大数据集的工具，并在必要时下载这些数据集。

数据特征说明可参考[https://scikit-learn.org/stable/modules/classes.html#module-sklearn.datasets](https://scikit-learn.org/stable/modules/classes.html#module-sklearn.datasets)

这些数据集有助于快速说明在 scikit 中实现的各种算法的行为。
然而，它们数据规模往往太小，无法代表真实世界的机器学习任务。
但是作为学习使用刚刚好。

| 数据集名称 | 加载方法         | 模型类型           | 数据大小(样本数\*特征数) |          |
| ---------- | ---------------- | ------------------ | ------------------------ | -------- |
| 0          | 波士顿房价数据集 | load_boston        | regression               | 506\*13  |
| 1          | 鸢尾花数据集     | load_iris          | classification           | 150\*4   |
| 2          | 手写数字数据集   | load_digits        | classification           | 1797\*64 |
| 3          | 糖尿病数据集     | load_diabetes      | regression               | 442\*10  |
| 4          | 葡萄酒数据集     | load_wine          | classification           | 178\*13  |
| 5          | 乳腺癌数据集     | load_breast_cancer | classification           | 569\*30  |
| 6          | 体能训练数据集   | load_linnerud      | 多重回归                 | 20\*3    |

```python showLineNumbers
import sklearn.datasets
# 加载小数据
data = sklearn.datasets.load_wine()
data.data

from sklearn.datasets import fetch_california_housing
# 加载大数据
housing = fetch_california_housing()
housing.data

from sklearn.datasets import load_sample_image
# 加载图片
china = load_sample_image("china.jpg")

```

### 样本生成器

scikit-learn 包括各种随机样本的生成器，可以用来建立可控制的大小和复杂性人工数据集。

```python showLineNumbers
from sklearn.datasets import make_blobs
# 创建KNN模型数据集
'''
X为样本特征，Y为样本簇类别，共1000个样本，

每个样本4个特征，共4个簇，簇中心在[-1,-1], [0,0], [1,1], [2,2],
簇方差分别为[0.4, 0.2, 0.2]
'''
x, y = make_blobs(n_samples=1000,
                  n_features=2,
                  centers=[[-1, -1], [0, 0], [1, 1], [2, 2]],
                  cluster_std=[0.4, 0.2, 0.2, 0.2],
                  )
from sklearn.datasets import make_regression
# 创建回归模型数据集
'''
X为样本特征，Y为样本簇类别，共1000个样本，

每个样本1个特征，
离散度为2
'''
x2,y2 = make_regression(n_samples=1000, n_features=1, n_targets=1, noise=2)
```

### 自有数据集

我们手上可能刚好有一些数据集，可以通过 pandas 或者 numpy 读取

```python showLineNumbers
# 通过pandas或者numpy读取
import pandas as pd
import numpy as np
data = pd.read_csv('./data/iris.csv')
# 通过numpy读取
data = np.loadtxt('./data/iris.csv', delimiter=",", skiprows=1)

```

import DocCardList from '@theme/DocCardList';

<DocCardList />