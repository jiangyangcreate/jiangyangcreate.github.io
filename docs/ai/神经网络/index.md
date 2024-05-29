---
sidebar_position: 3
title: 神经网络入门
---

## PyTorch 数据的来源？

### PyTorch 数据集

PyTorch 也提供了一些内置的数据集类来加载常用的数据集，如图像、文本等。此外，你也可以使用第三方库来加载自定义的数据集。

这些数据集的详细信息可以在 PyTorch 官方文档中找到。

这些数据集包括了各种类型的数据，如图像、文本、音频等，可以用于各种任务，如分类、回归、聚类等。

| 数据集名称    | 加载方法                         | 模型类型 | 数据大小(样本数\*特征数) |
| ------------- | -------------------------------- | -------- | ------------------------ |
| MNIST         | torchvision.datasets.MNIST       | 分类     | 70000\*784               |
| CIFAR-10      | torchvision.datasets.CIFAR10    | 分类     | 60000\*3072              |
| Fashion MNIST | torchvision.datasets.FashionMNIST| 分类     | 70000\*784               |

```python
import torchvision.datasets as datasets
# 加载数据集
train_dataset = datasets.MNIST(root='./data', train=True, download=True)
test_dataset = datasets.MNIST(root='./data', train=False, download=True)
```

### 自定义数据生成器

与 TensorFlow 类似，你也可以使用 PyTorch 来生成自定义的数据集，以便创建具有特定属性的数据集，如特定的分布、特定的噪声水平等。

```python
import torch
# 创建一个线性数据集
X = torch.rand((1000, 1))
y = 3 * X + 2 + torch.randn((1000, 1))

# 创建一个分类数据集
X = torch.rand((1000, 2))
y = (torch.sum(X, dim=1) > 1).int()
```

### 自有数据集

如果你有自己的数据集，你可以使用 PyTorch 的 `torch.utils.data.Dataset` 类来加载和预处理数据。这个类支持各种数据格式，如 CSV、图片等。

```python
from torch.utils.data import Dataset
# 自定义数据集类
class CustomDataset(Dataset):
    def __init__(self, data_path):
        # 从文件加载数据
        self.data = torch.load(data_path)
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        return self.data[idx]
```


<DocCardList />