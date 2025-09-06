---
sidebar_position: 7
title: 机器学习
---

- 人工智能（Artificial Intelligence）属于计算机科学的分支，是让各类机器载体上模拟并拥有类似生物的智能，让机器可以进行感知、学习、识别、推理等行为的计算机科学技术。

- 机器学习（Machine Learning,ML）是实现人工智能的核心方法，传统的机器学习主要关注如何学习一个预测模型，将数据表示为特征后将特征输入到预测模型，并输出预测结果。现代机器学习则主要由神经网络来完成。

下面是一个只用加减乘除实现求某数平方根的示例：

```python showLineNumbers
# 我们要求解的数
target_number = 17.0

# 初始化权重（我们的猜测值）
weight = 1

# 超参数
learning_rate = 0.01  # 学习率
epochs = 1000        # 训练轮数

# 训练过程
for epoch in range(epochs):
    # 前向传播: 计算预测值 (weight * weight 应该等于 target_number)
    prediction = weight * weight
    
    # 计算损失: 均方误差 (MSE)
    loss = (prediction - target_number) ** 2

    # 反向传播: 计算损失（loss）对权重（weight）的梯度
    gradient = 2 * (prediction - target_number) * 2 * weight
    
    # 更新权重 (梯度下降)
    weight = weight - learning_rate * gradient

# 最终结果
print(f"\n训练后的平方根估计值: {weight}")
print(f"误差: {target_number - prediction}")
```

上述代码展示了机器学习的核心概念：

1. **学习率**：控制每次参数更新的步长
2. **前向传播**：使用当前权重进行预测
3. **损失计算**：衡量预测值与目标值之间的差距
4. **反向传播**：计算损失对权重的梯度
5. **梯度下降**：沿梯度方向更新权重，最小化损失函数

这个简单的例子虽然不是典型的神经网络，但展示了机器学习的基本原理：通过不断调整参数，使模型输出逐渐接近目标值。

不同的接近方法即为不同的<Highlight>算法</Highlight>，要注意，没有一个算法是万能的，需要根据具体问题选择合适的算法。<HoverText text="“All models are wrong, but some are useful.”" explanation="所有模型都有偏差，但有些仍然有用。——乔治·博克斯"/>

如果<Highlight>数据</Highlight>较大，则必须要对数据做各种预处理，数据的质量决定了模型的上限。这也是一个非常耗费时间且需要经验的工作。

现代深度学习往往需要大量的<Highlight>算力</Highlight>，如何高效的利用算力，也是一个方向，例如分布式训练、混合精度训练、模型剪枝、知识蒸馏、高效微调等。

## PyTorch

在我们这个时代有许多优秀的机器学习框架，其中`pytorch`明显优于其他框架，许多著名的深度学习模型和框架都是基于 `PyTorch（Torch）`二次开发的。例如：`YOLOv11`、`Transformers (Hugging Face)`、`Stable Diffusion`等。还有一些开源项目使用`pytorch`构建出可用的多模态大模型。上限非常高。

PyTorch 可以利用计算加速设备（例如GPU、NPU），为了达成这一目的，PyTorch 的安装会绑定对应的cuda版本，PyTorch 使用 cuda 的接口来操作底层硬件。

:::info

**CUDA**：NVIDIA 专为自家 GPU 设计的 C++ 并行计算框架，其运行依赖于 NVIDIA 显卡驱动程序。它允许开发者利用 GPU 强大的并行计算能力加速各类计算密集型任务。能把复杂的计算任务（比如矩阵乘法、神经网络运算）翻译成GPU能理解的指令。没有CUDA，GPU只能处理简单的图形渲染，无法参与深度学习的计算。

**cuDNN**：cuDNN 是专门为深度学习优化的“外挂包”，它基于 CUDA 开发，针对神经网络的关键操作（如卷积、池化层）做了极致优化，相当于给数学天才（GPU）配了一把趁手的“瑞士军刀”。如果用原始 CUDA 开发大模型，就像用菜刀切牛排——能切但效率低。cuDNN直接提供预制好的高效函数，比如把图像识别中的卷积运算速度提升2倍以上，还能减少内存占用，让大模型跑得更流畅。

**CUDA Toolkit (NVIDIA 官方版)**：完整的 CUDA 开发环境，包含：
- NVIDIA 显卡驱动程序
- **NVCC**：NVIDIA CUDA 编译器，是 CUDA Toolkit 的核心组件，负责将 CUDA 代码编译为可在 NVIDIA GPU 上执行的二进制代码。
- 完整的 CUDA 开发工具链（编译器、IDE、调试器等）
- 各种 CUDA 加速库及其头文件
- 文档和示例代码

**CUDA Toolkit (PyTorch 版)**：精简版 CUDA 工具包，主要包含：
- 运行 CUDA 功能所需的核心动态链接库
- 不包含驱动程序、开发工具及完整文档
- 专为支持 PyTorch 等框架的 CUDA 功能而设计
:::

不过同样的测试代码，在[WSL2中安装的cuda对显卡性能](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local)会存在一定的影响。

```bash showLineNumbers
# windows原生环境
name: NVIDIA GeForce RTX 3090 Ti
write speed: 5063.91 MB/s
read speed: 5565.53 MB/s

# windows下的WSL2 Ubuntu-24.04 环境
name: NVIDIA GeForce RTX 3090 Ti
write speed: 2632.96 MB/s
read speed: 4429.29 MB/s
```


### PyTorch 数据集

PyTorch 提供了一些内置的数据集类来加载常用的数据集，如图像、文本等。此外，你也可以使用第三方库来加载自定义的数据集。

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