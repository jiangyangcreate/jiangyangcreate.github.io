---
sidebar_position: 1
title: K均值算法
---

## K 均值算法

这是一种解决聚类问题的非监督式学习算法。这个方法简单地利用了一定数量的集群（假设 K 个集群）对给定数据进行分类。同一集群内的数据点是同类的，不同集群的数据点不同类。

还记得你是怎样从墨水渍中辨认形状的么？K 均值算法的过程类似，你也要通过观察集群形状和分布来判断集群数量
K 均值算法如何划分集群：

1. 从每个集群中选取 K 个数据点作为质心（centroids）。

2. 将每一个数据点与距离自己最近的质心划分在同一集群，即生成 K 个新集群。

3. 找出新集群的质心，这样就有了新的质心。

4. 重复 2 和 3，直到结果收敛，即不再有新的质心出现。

怎样确定 K 的值：

如果我们在每个集群中计算集群中所有点到质心的距离平方和，再将不同集群的距离平方和相加，我们就得到了这个集群方案的总平方和。

我们知道，随着集群数量的增加，总平方和会减少。但是如果用总平方和对 K 作图，你会发现在某个 K 值之前总平方和急速减少，但在这个 K 值之后减少的幅度大大降低，这个值就是最佳的集群数。

距离计算公式：

一维坐标系中,设 A(x1),B(x2),则 A,B 之间的距离为

$
|AB|=√[(x1−x2)2]
$

二维坐标系中,设 A(x1,y1),B(x2,y2),则 A,B 之间的距离为

$
|AB|=√[(x1−x2)2+(y1−y2)2]
$

三维坐标系中,设 A(x1,y1,z1),B(x2,y2,z2),则 A,B 之间的距离为

$
|AB|=√[(x1−x2)2+(y1−y2)2+(z1−z2)2]
$

以此类推

```python showLineNumbers
from sklearn.cluster import KMeans
import numpy as np

# 创建一些示例数据
X = np.array([[1, 2], [2, 3], [2, 5], [3, 2], [3, 3], [4, 5]])

# 创建K均值模型
k = 2  # 指定要分为的簇的数量
model = KMeans(n_clusters=k)

# 拟合模型
# .fit()方法用于训练模型，即让模型从数据中学习
model.fit(X)

# 获取簇中心点
cluster_centers = model.cluster_centers_

# 预测每个样本所属的簇
labels = model.labels_

print("簇中心点:", cluster_centers)
print("样本所属簇:", labels)

```

### 简单示例

```python showLineNumbers
# 导入必要的库
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
# 加载数据
iris = load_iris()
iris_X = iris.data
iris_y = iris.target

# 创建K均值模型
kmeans = KMeans(n_clusters=3)
# 拟合模型，注意看这是无监督学习，这里只填写了数据集，没有给标签。
kmeans.fit(iris_X)

# 获取簇中心和簇标签
centers = kmeans.cluster_centers_
labels = kmeans.labels_
print(iris_y)
print(labels)

# 我们发现他把0、1、2分类成了1、0、2，这是因为K均值算法是无监督学习，他不知道我们的标签是什么，所以他自己给我们分了一套标签。
```

### 效果评估

```python showLineNumbers
# 使用列表推导式将0、1、2转换成1、0、2
exchange={0:1,1:0,2:2}
exchange_labels = [exchange[i] if i in exchange else i for i in labels]

right = 0
error = 0
for i in zip(exchange_labels,iris_y):
    if i[0] == i[1]:
        right +=1
    else:
        error +=1

print('正确率：{}%'.format(right/(right+error)*100))
```

### 二维可视化结果

```python showLineNumbers
# 选取第1、2特征值与中心点
plt.scatter(iris_X[:, 0], iris_X[:, 1], c=labels)
plt.scatter(centers[:, 0], centers[:,1], c="red", marker="x")
plt.title("Kmeans")
plt.show()
# 选取第3、4项特征值与中心点
plt.scatter(iris_X[:, 2], iris_X[:,3], c=labels)
plt.scatter(centers[:, 2], centers[:,3], c="red", marker="x")
plt.show()
```

### 寻找最佳 K

```python showLineNumbers
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris

iris = load_iris()
X = iris.data
y = iris.target

k_range = range(1, 31)
k_scores = []
for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    # loss = -cross_val_score(knn, X, y, cv=10, scoring='mean_squared_error') # for regression
    # 10折交叉验证,对于分类问题，scoring参数默认为accuracy，对于回归问题，默认为r2，或mean_squared_error
    # 原理是将数据分成10份，每次取其中一份作为测试集，其余9份作为训练集，进行10次训练和测试，最后取平均值
    # 是一种常用的验证分类性能好坏的方法
    scores = cross_val_score(knn, X, y, cv=10, scoring='accuracy') # for classification

    # .mean()方法用于计算平均值
    k_scores.append(scores.mean())

plt.plot(k_range, k_scores)
plt.xlabel('Value of K for KNN')
plt.ylabel('Cross-Validated Accuracy')
plt.show()
```

### 颜色量化

#### 描述

图片的颜色数量越多，图片就越难以压缩，图片的大小就越大，因此需要对图片进行颜色量化，减少图片的大小，将图像所需的颜色数量从 96615 减少到 64，同时保持整体外观质量。

图像来源`sklearn.datasets.load_sample_image("china.jpg")`

#### 题解

```python showLineNumbers
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin
from sklearn.datasets import load_sample_image
from sklearn.utils import shuffle
from time import time

n_colors = 64

# Load the Summer Palace photo
china = load_sample_image("china.jpg")

# Convert to floats instead of the default 8 bits integer coding. Dividing by
# 255 is important so that plt.imshow behaves works well on float data (need to
# be in the range [0-1])
china = np.array(china, dtype=np.float64) / 255

# Load Image and transform to a 2D numpy array.
w, h, d = original_shape = tuple(china.shape)
assert d == 3
image_array = np.reshape(china, (w * h, d))

print("Fitting model on a small sub-sample of the data")
t0 = time()
image_array_sample = shuffle(image_array, random_state=0)[:1000]
kmeans = KMeans(n_clusters=n_colors, random_state=0).fit(image_array_sample)
print("done in %0.3fs." % (time() - t0))

# Get labels for all points
print("Predicting color indices on the full image (k-means)")
t0 = time()
labels = kmeans.predict(image_array)
print("done in %0.3fs." % (time() - t0))


codebook_random = shuffle(image_array, random_state=0)[:n_colors]
print("Predicting color indices on the full image (random)")
t0 = time()
labels_random = pairwise_distances_argmin(codebook_random,
                                          image_array,
                                          axis=0)
print("done in %0.3fs." % (time() - t0))


def recreate_image(codebook, labels, w, h):
    """Recreate the (compressed) image from the code book & labels"""
    d = codebook.shape[1]
    image = np.zeros((w, h, d))
    label_idx = 0
    for i in range(w):
        for j in range(h):
            image[i][j] = codebook[labels[label_idx]]
            label_idx += 1
    return image

# Display all results, alongside original image
plt.figure(1)
plt.clf()
plt.axis('off')
plt.title('Original image (96,615 colors)')
plt.imshow(china)

plt.figure(2)
plt.clf()
plt.axis('off')
plt.title('Quantized image (64 colors, K-Means)')
plt.imshow(recreate_image(kmeans.cluster_centers_, labels, w, h))

plt.figure(3)
plt.clf()
plt.axis('off')
plt.title('Quantized image (64 colors, Random)')
plt.imshow(recreate_image(codebook_random, labels_random, w, h))

```
