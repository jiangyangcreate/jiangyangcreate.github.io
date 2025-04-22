<!--
 * @Author: jiangyangcreate jiangyangcreate@gmail.com
 * @Date: 2025-03-27 17:13:15
 * @LastEditors: jiangyangcreate jiangyangcreate@gmail.com
 * @LastEditTime: 2025-04-22 08:43:38
 * @FilePath: \jiangyangcreate.github.io\docs\docs\机器学习\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
sidebar_position: 7
title: 🚧机器学习
---

机器学习是当前发展最热门的方向之一，可以称之为计算机科学的明珠。

机器学习的原理其实很简单，创建一个复杂函数，猜测其中的权重的值。然后根据结果来更新这个值。

具体的内容我们可以尝试编写一个求某个数的平方根的例子：

```python showLineNumbers

import numpy as np
import matplotlib.pyplot as plt

# 我们要求解的数
target_number = 17.0

# 初始化权重（我们的猜测值）
weight = 1
print(f"初始随机猜测值: {weight}")

# 超参数
learning_rate = 0.01  # 学习率
epochs = 1000        # 训练轮数

# 存储训练过程
weights_history = []
loss_history = []

# 训练过程
for epoch in range(epochs):
    # 前向传播: 计算预测值 (weight * weight 应该等于 target_number)
    prediction = weight * weight
    
    # 计算损失: 均方误差 (MSE)
    loss = (prediction - target_number) ** 2

    # 反向传播: 计算梯度
    gradient = 2 * (prediction - target_number) * 2 * weight
    
    # 更新权重 (梯度下降)
    weight = weight - learning_rate * gradient
    
    # 记录历史
    weights_history.append(weight)
    loss_history.append(loss)
    
    # 每隔100轮打印一次结果
    if epoch % 100 == 0 or epoch == epochs - 1:
        print(f"轮次 {epoch}, 当前估计值: {weight}, 预测值的平方: {prediction}, 损失: {loss}")

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

<DocCardList />