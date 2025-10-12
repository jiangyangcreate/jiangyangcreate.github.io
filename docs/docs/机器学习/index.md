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

在我们这个时代有许多优秀的机器学习框架，其中`pytorch`明显优于其他框架。

许多著名的深度学习模型和框架都是基于 `PyTorch（Torch）`二次开发的。例如：`YOLOv11`、`Transformers (Hugging Face)`、`Stable Diffusion`等。还有一些开源项目使用`pytorch`构建出可用的多模态大模型。上限非常高。

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
### torch框架

<MarkmapHooks initialMarkdown={`

# torch

## 主模块

### torch

- torch模块本身包含了PyTorch经常使用的一些激活函数，比如Sigmoid（torch.sigmoid）​、ReLU（torch.relu）和Tanh（torch.tanh）​，以及PyTorch张量的一些操作，比如矩阵的乘法（torch.mm）​、张量元素的选择（torch.select）​。
- 需要注意的是，这些操作的对象大多数都是张量，因此，传入的参数需要是PyTorch的张量，否则会报错（一般报类型错误，即TypeError）​。

### torch.Tensor

- torch.Tensor模块定义了torch中的张量类型，其中的张量有不同的数值类型，如单精度、双精度浮点、整数类型等，而且张量有一定的维数和形状。

### torch.sparse

- torch.sparse模块定义了稀疏张量，其中构造的稀疏张量采用的是COO格式（Coordinate）​，主要方法是用一个长整型定义非零元素的位置

### torch.cuda

- torch.cuda模块定义了与CUDA运算相关的一系列函数，包括但不限于检查系统的CUDA是否可用，当前进程对应的GPU序号（在多GPU情况下）​，清除GPU上的缓存，设置GPU的计算流（Stream）​，同步GPU上执行的所有核函数（Kernel）等。

### **torch.nn**

- torch.nn是一个非常重要的模块，是PyTorch神经网络模块化的核心。这个模块定义了一系列模块，包括卷积层nn.ConvNd（N=1，2，3）和线性层（全连接层）nn.Linear等。当构建深度学习模型的时候，可以通过继承nn.Module类并重写forward方法来实现一个新的神经网络（后续会提到如何通过组合神经网络模块来构建深度学习模型）​。另外，torch.nn中也定义了一系列的损失函数，包括平方损失函数（torch.nn.MSELoss）​、交叉熵损失函数（torch.nn.CrossEntropyLoss）等。

### torch.nn.functional

- torch.nn.functional是PyTorch的函数模块，定义了一些核神经网络相关的函数，包括卷积函数和池化函数等，这些函数也是深度学习模型构建的基础。需要指出的是，torch.nn中定义的模块一般会调用torch.nn.functional里的函数，比如，nn.ConvNd模块（N=1，2，3）会调用torch.nn.functional.convNd函数（N=1，2，3）​。另外，torch.nn.functional里面还定义了一些不常用的激活函数，包括torch.nn.functional.relu6和torch.nn.functional.elu等。

### torch.nn.init

- torch.nn.init模块定义了神经网络权重的初始化。前面已经介绍过，如果初始的神经网络权重取值不合适，就会导致后续的优化过程收敛很慢，甚至不熟练。这个模块中的函数就是为了解决神经网络权重的初始化问题，其中使用了很多初始化方法，包括均匀初始化torch.nn.init.uniform_和正态分布归一化torch.nn.init.normal_等。

### **torch.optim**

- torch.optim模块定义了一系列的优化器，包括但不限于前一章介绍的优化器，如torch.optim.SGD（随机梯度下降算法）​、torch.optim.Adagrad（AdaGrad算法）​、torch.optim.RMSprop（RMSProp算法）和torch.optim.Adam（Adam算法）等。当然，这个模块还包含学习率衰减的算法的子模块，即torch.optim.lr_scheduler，这个子模块中包含了诸如学习率阶梯下降算法torch.optim.lr_scheduler.StepLR和余弦退火算法torch.optim.lr_scheduler.CosineAnnealingLR等学习率衰减算法。

### torch.autograd

- torch.autograd模块是PyTorch的自动微分算法模块，定义了一系列的自动微分函数，包括torch.autograd.backward函数，主要用于在求得损失函数之后进行反向梯度传播，torch.autograd.grad函数用于一个标量张量（即只有一个分量的张量）对另一个张量求导，以及在代码中设置不参与求导的部分。另外，这个模块还内置了数值梯度功能和检查自动微分引擎是否输出正确结果的功能。

### ~torch.distributed~

- torch.distributed是PyTorch的分布式计算模块，主要功能是提供PyTorch并行运行环境，其主要支持的后端有MPI、Gloo和NCCL三种。PyTorch的分布式工作原理主要是启动多个并行的进程，每个进程都拥有一个模型的备份，然后输入不同的训练数据到多个并行的进程，计算损失函数，每个进程独立地做反向传播，最后对所有进程权重张量的梯度做归约（Reduce）​。用到后端的部分主要是数据的广播（Broadcast）和数据的收集（Gather）​，其中，前者是把数据从一个节点（进程）传播到另一个节点（进程）​，比如归约后梯度张量的传播，后者则是把数据从其他节点（进程）转移到当前节点（进程）​，比如把梯度张量从其他节点转移到某个特定的节点，然后对所有的张量求平均。PyTorch的分布式计算模块不但提供了后端的一个包装，还提供了一些启动方式来启动多个进程，包括但不限于通过网络（TCP）​、通过环境变量、通过共享文件等。

### ~torch.distributions~

- torch.distributions模块提供了一系列类，使得PyTorch能够对不同的分布进行采样，并且生成概率采样过程的计算图。在一些应用过程中，比如强化学习（Reinforcement Learning）​，经常会使用一个深度学习模型来模拟在不同环境条件下采取的策略（Policy）​，其最后的输出是不同动作的概率。当深度学习模型输出概率之后，需要根据概率对策略进行采样来模拟当前的策略概率分布，最后用梯度下降方法来让最优策略的概率最大（这个算法称为策略梯度算法，Policy Gradient）​。实际上，因为采样的输出结果是离散的，无法直接求导，所以不能使用反向传播的方法来优化网络。torch.distributions模块的存在目的就是为了解决这个问题。我们可以结合torch.distributions.Categorical进行采样，然后使用对数求导技巧来规避这个问题。当然，除了服从多项式分布的torch.distributions.Categorical类，PyTorch还支持其他的分布（包括连续分布和离散分布）​，比如torch.distributions.Normal类支持连续的正态分布的采样，可以用于连续的强化学习的策略。

### torch.hub

- torch.hub提供了一系列预训练的模型供用户使用。比如，可以通过torch.hub.list函数来获取某个模型镜像站点的模型信息。通过torch.hub.load来载入预训练的模型，载入后的模型可以保存到本地，并可以看到这些模型对应类支持的方法。更多torch.hub支持的模型可以参考PyTorch官网中的相关页面。

### torch.jit

- torch.jit是PyTorch的即时编译器（Just-In-Time Compiler，JIT）模块。这个模块存在的意义是把PyTorch的动态图转换成可以优化和序列化的静态图，其主要工作原理是通过输入预先定义好的张量，追踪整个动态图的构建过程，得到最终构建出来的动态图，然后转换为静态图（通过中间表示，即Intermediate Representation，来描述最后得到的图）​。通过JIT得到的静态图可以被保存，并且被PyTorch其他的前端（如C++语言的前端）支持。另外，JIT也可以用来生成其他格式的神经网络描述文件，如前文叙述的ONNX。需要注意的一点是，torch.jit支持两种模式，即脚本模式（ScriptModule）和追踪模式（Tracing）​。前者和后者都能构建静态图，区别在于前者支持控制流，后者不支持，但是前者支持的神经网络模块比后者少，比如脚本模式不支持torch.nn.GRU（详细的描述可以参考PyTorch官方提供的JIT相关的文档）​。

### torch.multiprocessing

- torch.multiprocessing定义了PyTorch中的多进程API。通过使用这个模块，可以启动不同的进程，每个进程运行不同的深度学习模型，并且能够在进程间共享张量（通过共享内存的方式）​。共享的张量可以在CPU上，也可以在GPU上，多进程API还提供了与Python原生的多进程API（即multiprocessing库）相同的一系列函数，包括锁（Lock）和队列（Queue）等。

### **torch.random**

- torch.random提供了一系列的方法来保存和设置随机数生成器的状态，包括使用get_rng_state函数获取当前随机数生成器状态，set_rng_state函数设置当前随机数生成器状态，并且可以使用manual_seed函数来设置随机种子，也可使用initial_seed函数来得到程序初始的随机种子。因为神经网络的训练是一个随机的过程，包括数据的输入、权重的初始化都具有一定的随机性。设置一个统一的随机种子可以有效地帮助我们测试不同结构神经网络的表现，有助于调试神经网络的结构。

### torch.onnx

- torch.onnx定义了PyTorch导出和载入ONNX格式的深度学习模型描述文件。前面已经介绍过，ONNX格式的存在是为了方便不同深度学习框架之间交换模型。引入这个模块可以方便PyTorch导出模型给其他深度学习框架使用，或者让PyTorch可以载入其他深度学习框架构建的深度学习模型。

## 辅助工具

### torch.utils.bottleneck

- torch.utils.bottleneck可以用来检查深度学习模型中模块的运行时间，从而可以找到导致性能瓶颈的那些模块，通过优化那些模块的运行时间，从而优化整个深度学习模型的性能。

### torch.utils.checkpoint

- torch.utils.checkpoint可以用来节约深度学习使用的内存。通过前面的介绍我们知道，因为要进行梯度反向传播，在构建计算图的时候需要保存中间的数据，而这些数据大大增加了深度学习的内存消耗。为了减少内存消耗，让迷你批次的大小得到提高，从而提升深度学习模型的性能和优化时的稳定性，我们可以通过这个模块记录中间数据的计算过程，然后丢弃这些中间数据，等需要用到的时候再重新计算这些数据。这个模块设计的核心思想是以计算时间换内存空间，当使用得当的时候，深度学习模型的性能可以有很大的提升。

### torch.utils.cpp_extension

- torch.utils.cpp_extension定义了PyTorch的C++扩展，其主要包含两个类：CppExtension定义了使用C++来编写的扩展模块的源代码相关信息，CUDAExtension则定义了C++/CUDA编写的扩展模块的源代码相关信息。在某些情况下，用户可能需要使用C++实现某些张量运算和神经网络结构

### torch.utils.data

- torch.utils.data引入了数据集（Dataset）和数据载入器（DataLoader）的概念，前者代表包含了所有数据的数据集，通过索引能够得到某一条特定的数据，后者通过对数据集的包装，可以对数据集进行随机排列（Shuffle）和采样（Sample）​，得到一系列打乱数据顺序的迷你批次。

### torch.utils.dlpack

- torch.utils.dlpack定义了PyTorch张量和DLPack张量存储格式之间的转换，用于不同框架之间张量数据的交换。

### torch.utils.tensorboard

- torch.utils.tensorboard是PyTorch对TensorBoard数据可视化工具的支持。TensorBoard原来是TensorFlow自带的数据可视化工具，能够显示深度学习模型在训练过程中损失函数、张量权重的直方图，以及模型训练过程中输出的文本、图像和视频等。TensorBoard的功能非常强大，而且是基于可交互的动态网页设计的，使用者可以通过预先提供的一系列功能来输出特定的训练过程的细节（如某一神经网络层的权重的直方图，以及训练过程中某一段时间的损失函数等）​。PyTorch支持TensorBoard可视化之后，在PyTorch的训练过程中，可以很方便地观察中间输出的张量，也可以方便地调试深度学习模型。

`} />



### torchvision

torchvision 是 PyTorch 项目的一部分。由流行的数据集、模型架构和计算机视觉的常见图像转换组成。

这些数据集包括了各种类型的数据，如图像、文本、音频等，可以用于各种任务，如分类、回归、聚类等。

安装：`pip install torchvision`

| 数据集名称    | 加载方法                         | 模型类型 | 数据大小(样本数\*特征数) |
| ------------- | -------------------------------- | -------- | ------------------------ |
| MNIST         | torchvision.datasets.MNIST       | 分类     | 70000\*784               |
| CIFAR-10      | torchvision.datasets.CIFAR10    | 分类     | 60000\*3072              |
| Fashion MNIST | torchvision.datasets.FashionMNIST| 分类     | 70000\*784               |

```python showLineNumbers
import torchvision.datasets as datasets
# 加载数据集
train_dataset = datasets.MNIST(root='./data', train=True, download=True)
test_dataset = datasets.MNIST(root='./data', train=False, download=True)
```

### torchtext

简化文本数据处理（分词/词嵌入/标记化）,内置 NLP 数据集（IMDB 影评等）

安装：`pip install torchtext`

```python showLineNumbers
  # 情感分析快速实现
  from torchtext.data import Field, TabularDataset
  
  TEXT = Field(tokenize='spacy')
  LABEL = Field(sequential=False)
  train_data = TabularDataset(path='train.csv', format='csv', 
                             fields=[('text', TEXT), ('label', LABEL)])
``` 


### Ignite 

训练流程管理库，可以简化训练循环代码、内置进度条/早停/模型保存等实用功能、官方示例丰富

安装：`pip install pytorch-ignite`

```python showLineNumbers
from ignite.engine import Events, create_supervised_trainer

trainer = create_supervised_trainer(model, optimizer, loss_fn)

@trainer.on(Events.ITERATION_COMPLETED(every=100))
def log_loss(engine):
    print(f"Epoch {engine.state.epoch}, Loss: {engine.state.output:.2f}")
```

## 机器学习步骤

### 数据清洗

数据决定着模型预测的上界，模型则是尽可能达到这个上界。


<MarkmapHooks initialMarkdown={`
# 数据清洗

## 数据分桶

### 等频分桶
- 适用于特征值分布不均时，使每个桶中样本数量相同

### 等距分桶
- 适用于特征分布较均匀、想保持原始间隔信息的场景

### Best KS分桶
- 适用于二分类模型，提升模型区分度（如信用评分）

### 卡方分桶
- 适用于类别变量分桶，保持变量与目标变量的相关性

## 特征归一化/标准化

### 标准化
- 适用于数据服从正态分布或模型对尺度敏感（如线性模型、SVM）

### 归一化
- 适用于特征值范围差异较大，且模型对距离敏感（如KNN）

### 离散分布处理
- 适用于处理非连续型变量，使其适配连续模型输入

## 缺失值处理

### 删除
- 适用于缺失占比过高且该特征非关键的场景

### 不处理
- 适用于XGBoost、LightGBM等能自动处理缺失的模型

### 统计量补全

#### 均值
- 适用于连续特征，数据大致对称分布

#### 中位数
- 适用于连续特征，数据有偏或存在异常值

#### 众数
- 适用于离散的分类变量

### 差值补全
- 适用于时间序列数据中连续缺失值较少的情况

### 高维映射

#### 感知压缩补全
- 适用于图像/文本等高维稀疏特征的补全

#### 矩阵补全
- 适用于用户行为推荐系统中用户-物品矩阵补全

### 建模预测
- 适用于关键特征缺失，需要通过其他特征预测补全

### 多重插补
- 适用于数据缺失模式复杂、追求补全后数据分布一致性

## 异常值处理

### 通过箱线图或3-Sigma分析异常值
- 适用于正态或近似正态分布的连续变量

### BOX-COX转换
- 适用于右偏（长尾）分布的变量，转化为近似正态分布

### 长尾截断
- 适用于异常值严重影响模型表现时的情况
`} />


### 特征工程

好的特征工程就像是衡量人的体重是否超标时，构造出BMI。这种数据直觉是AI较难替代的。

$$
BMI = \text{体重}_{\text{kg}} / (\text{身高}_{\text{m}})^2
$$

<MarkmapHooks initialMarkdown={`
# 特征工程

## 特征构造

### 常见特征

- 统计量特征：计数、求和、比例、标准差等
- 时间特征：相对时间和绝对时间、节假日、双休日等
- 空间特征：包括分箱、分布编码等方法

### 处理方法

- 非线性变化：log/平方/根号等
- 特征组合、特征交叉

### 核心概念

- 依托数据洞察和业务理解

## 特征选择

### 过滤式（filter）

- 概述：先对数据进行特征选择，再训练学习器

#### 方法

- Relief
- 方差选择
- 相关系数
- 卡方检验
- 互信息

### 包裹式（wrapper）

- 概述：直接把最终要使用的学习器的性能作为特征子集的评价准则

#### 方法

- LVM（Las Vegas Wrapper）

### 嵌入式（embedded）

- 概述：结合过滤式和包裹式，学习器训练过程中自动进行特征选择

#### 方法

- Lasso回归

## 降维

- PCA
- LDA
- LCA
- 特征选择也是一种降维
`} />

### 模型参数调节

至少从抽象层面上了解每个模型的工作原理，才能理解参数的含义。

<MarkmapHooks initialMarkdown={`
# 建模调参

## 嵌入式特征选择

- Lasso回归
- Ridge回归
- 决策树

## 模型对比

- 常用线性模型
- 常用非线性模型

## 线性回归模型

- 线性回归对于特征的要求
- 标签变化、处理长尾分布
- 理解线性回归模型

## 模型调参

- 贪心调参法
- 网格调参法
- 贝叶斯调参法

## 模型性能验证

### 函数

- 评价函数
- 目标函数

### 方法

- 交叉验证方法
- 留一验证方法
- 针对时间序列问题的验证

### 实现

- 绘制学习率曲线
- 绘制验证曲线
`} />

### 模型融合

实在没有办法提升性能，可以试试多模型融合，模型是可以互补的。

<MarkmapHooks initialMarkdown={`
# 模型融合
## 简单加权融合
### 回归
#### 算术平均融合
#### 几何平均融合
### 分类
#### 投票
#### 排序融合
### 综合
#### log融合
## boosting/bagging
### 在XGBoost, Adaboost, GBDT中已经用到
## stacking/blending
### 构建多层模型，并利用预测结果再拟合预测
`} />


<DocCardList />