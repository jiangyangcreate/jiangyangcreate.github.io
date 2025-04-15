---
sidebar_position: 3
title: 🚧神经网络入门
---

## skorch

至此，我们已经学习了 scikit-learn 的很多算法。完成了传统机器学习的任务。

但是，sklearn本身不支持GPU加速。遇到更复杂的任务，需要使用神经网络并调用GPU来完成。

skorch 是一个基于 PyTorch 的神经网络库，提供了 scikit-learn 风格的 API。它将 PyTorch 的灵活性与 scikit-learn 的易用性相结合，使得神经网络的训练和评估变得更加简单和高效。支持GPU加速。

它可以让你仅仅替换 sklearn 的模型为 pytorch 的模型，不改变其他代码。作为衔接 pytorch 和 sklearn 的桥梁。

skorch 的安装非常简单，只需要使用 pip 安装即可。

```bash
pip install skorch
```

### 简单示例

```python showLineNumbers
# 导入必要的库
import numpy as np
from sklearn import datasets
from torch import nn
from skorch import NeuralNetClassifier
from sklearn.model_selection import train_test_split
import time
from sklearn.linear_model import LinearRegression
import torch

# 加载数据集
digits = datasets.load_digits()
# 获取特征和目标变量
X = digits.data.astype(np.float32)  # 转换为float32类型
y = digits.target.astype(np.int64)  # 目标变量转换为int64

# 修改后的神经网络模型定义
class MyModule(nn.Module):
    def __init__(self, num_units=256, nonlin=nn.ReLU()):  # 增加隐藏单元数
        super().__init__()
        self.dense0 = nn.Linear(64, num_units)  # 修正输入维度为64（8x8图像）
        self.bn0 = nn.BatchNorm1d(num_units)     # 添加批量归一化
        self.nonlin = nonlin
        self.dropout = nn.Dropout(0.3)           # 调整dropout比例
        self.dense1 = nn.Linear(num_units, num_units//2)  # 新增隐藏层
        self.dense2 = nn.Linear(num_units//2, num_units//4)
        self.output = nn.Linear(num_units//4, 10)
        self.softmax = nn.Softmax(dim=-1)

    def forward(self, X, **kwargs):
        X = self.nonlin(self.bn0(self.dense0(X)))
        X = self.dropout(X)
        X = self.nonlin(self.dense1(X))
        X = self.nonlin(self.dense2(X))
        X = self.softmax(self.output(X))
        return X

# 修改后的神经网络配置
net = NeuralNetClassifier(
    MyModule,
    max_epochs=20,            # 增加训练轮次
    lr=0.0005,                # 调整学习率
    optimizer=torch.optim.AdamW,  # 使用更好的优化器
    optimizer__weight_decay=0.001,  # 添加权重衰减
    iterator_train__shuffle=True,
    device='cuda',
)

# 修改为线性回归模型（注意这是回归模型，需要转换预测结果为分类）
clf = LinearRegression()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
# 修改标准化部分
X_train = (X_train / 16.0).astype(np.float32)  # 保持float32类型
X_test = (X_test / 16.0).astype(np.float32)

# 保存原始训练和测试数据
X_train_orig = X_train.copy()
y_train_orig = y_train.copy()
X_test_orig = X_test.copy()  # 新增测试集备份

# 原始数据、10倍数据、100倍数据
for i in range(3):
    # 通过复制数据增加样本量
    multiplier = 10 ** i
    X_train = np.tile(X_train_orig, (multiplier, 1))
    y_train = np.tile(y_train_orig, multiplier)
    X_test = X_test_orig.copy()  # 保持测试集不变
    
    len_data = len(X_train)
    for model in [net, clf]:
        # 对比sklearn和skorch的训练时间
        start_time = time.time()
        net.fit(X_train, y_train)
        accuracy = net.score(X_test, y_test)
        end_time = time.time() - start_time
        print(f"{len_data}条数据下，{model.__class__.__name__}训练时间: {end_time:.2f}秒，准确率: {accuracy:.2f}")
'''
1257条数据下，NeuralNetClassifier训练时间: 1.26秒，准确率: 0.98
1257条数据下，LinearRegression训练时间: 0.33秒，准确率: 0.97

12570条数据下，NeuralNetClassifier训练时间: 2.91秒，准确率: 0.98
12570条数据下，LinearRegression训练时间: 2.93秒，准确率: 0.98

125700条数据下，NeuralNetClassifier训练时间: 32.05秒，准确率: 0.99
125700条数据下，LinearRegression训练时间: 32.31秒，准确率: 0.99
'''
```

显而易见，在处理更多数据时，skorch 的训练时间小于 sklearn 的训练时间。数据越多，skorch 的优势越明显。

接下来，你可以使用 skorch 来复现更多之前的项目，同时熟悉Pytorch的用法。接下来我们会开始使用pytorch来完成更多复杂和有趣的任务。


## PyTorch

PyTorch 可以利用计算加速设备（例如GPU、NPU），为了达成这一目的，PyTorch 的安装会绑定对应的cuda版本，PyTorch 使用 cuda 的接口来操作底层硬件。

:::info

**CUDA**：NVIDIA 专为自家 GPU 设计的 C++ 并行计算框架，其运行依赖于 NVIDIA 显卡驱动程序。它允许开发者利用 GPU 强大的并行计算能力加速各类计算密集型任务。

**cuDNN**：专门为深度学习计算优化的高性能神经网络库，提供了高度优化的实现，用于常见深度学习操作如卷积、池化、归一化等。

**CUDA Toolkit (NVIDIA 官方版)**：完整的 CUDA 开发环境，包含：
- NVIDIA 显卡驱动程序
- 完整的 CUDA 开发工具链（编译器、IDE、调试器等）
- 各种 CUDA 加速库及其头文件
- 文档和示例代码

**CUDA Toolkit (PyTorch 版)**：精简版 CUDA 工具包，主要包含：
- 运行 CUDA 功能所需的核心动态链接库
- 不包含驱动程序、开发工具及完整文档
- 专为支持 PyTorch 等框架的 CUDA 功能而设计

**NVCC**：NVIDIA CUDA 编译器，是 CUDA Toolkit 的核心组件，负责将 CUDA 代码编译为可在 NVIDIA GPU 上执行的二进制代码。
:::



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