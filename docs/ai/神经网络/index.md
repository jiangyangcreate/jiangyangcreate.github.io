---
sidebar_position: 3
title: 神经网络入门
---

## TensorFlow 数据的来源？

### TensorFlow 数据集

TensorFlow 提供了一个名为 `tensorflow_datasets` 的库，其中包含了大量的公开数据集，可以用于训练各种类型的机器学习模型。这些数据集已经被处理成 TensorFlow 可以直接使用的格式。

数据集的详细信息可以参考 [https://www.tensorflow.org/datasets/catalog/overview](https://www.tensorflow.org/datasets/catalog/overview)。

这些数据集包括了各种类型的数据，如图像、文本、音频和视频等，可以用于各种任务，如分类、回归、聚类、生成模型等。

| 数据集名称    | 加载方法                   | 模型类型 | 数据大小(样本数\*特征数) |
| ------------- | -------------------------- | -------- | ------------------------ |
| MNIST         | tfds.load('mnist')         | 分类     | 70000\*784               |
| CIFAR-10      | tfds.load('cifar10')       | 分类     | 60000\*3072              |
| IMDB Reviews  | tfds.load('imdb_reviews')  | 文本分类 | 50000\*1                 |
| Fashion MNIST | tfds.load('fashion_mnist') | 分类     | 70000\*784               |
| SVHN          | tfds.load('svhn_cropped')  | 分类     | 99289\*3072              |

```python showLineNumbers
import tensorflow_datasets as tfds
# 加载数据集
ds, info = tfds.load('mnist', with_info=True)
```

### 自定义数据生成器

TensorFlow 也提供了工具来生成自定义的数据集，这可以用于创建具有特定属性的数据集，如特定的分布、特定的噪声水平等。

```python showLineNumbers
import tensorflow as tf
# 创建一个线性数据集
X = tf.random.uniform((1000, 1))
y = 3 * X + 2 + tf.random.normal((1000, 1))

# 创建一个分类数据集
X = tf.random.uniform((1000, 2))
y = tf.cast(tf.reduce_sum(X, axis=1) > 1, tf.int32)
```

### 自有数据集

如果你有自己的数据集，你可以使用 TensorFlow 的 `tf.data` API 来加载和预处理数据。这个 API 支持各种数据格式，如 CSV、TFRecord、图片等。

```python showLineNumbers
# 从 CSV 文件加载数据
ds = tf.data.experimental.CsvDataset('./data/iris.csv', [tf.float32]*4+[tf.int32])

# 从图片文件加载数据
ds = tf.data.Dataset.list_files('./data/images/*.jpg').map(tf.io.read_file)
```



<DocCardList />