## 卷积神经网络CNN

### 原理

卷积神经网络的核心是卷积核，卷积核在图像处理领域可以用来提取图像的纵向和横向特征。

卷积核的大小一般为奇数，如 3x3，5x5，7x7 等，卷积核通常与图像处理（over padding）后的图像进行卷积操作，卷积核在图像上滑动，每次滑动一个像素，对应位置的像素值与卷积核对应位置的值相乘，然后求和，最后将求和的结果作为卷积核中心像素的值，这样就得到了一个新的图像。

新的图像可以用更少的数据反应出图像的特征。这个过程就是特征提取。

### 简单示例

MNIST 手写数字识别任务

使用了 TensorFlow 的高级 API（tf.keras）来创建和训练一个卷积神经网络模型。模型包含一个卷积层，一个最大池化层，一个全连接层和一个输出层。用 Adam 优化器和交叉熵损失函数，并设置了训练的周期数和批次大小。

这个模型的输入是 28x28 的图像，输出是 10 类的概率分布。

如果之前的你能熟练使用 Sklearn，你会发现这个模型的构建和训练非常简单。

```python showLineNumbers
import tensorflow as tf

# 加载 MNIST 数据集
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

# 数据预处理
# 将图像数据从 (28, 28) 转换为 (28, 28, 1)，并且归一化到 [0,1] 区间
x_train, x_test = x_train[..., tf.newaxis]/255.0, x_test[..., tf.newaxis]/255.0

# 将标签转换为 one-hot 编码
y_train, y_test = tf.one_hot(y_train, 10), tf.one_hot(y_test, 10)

# 创建模型
model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32, kernel_size=(3, 3), activation='relu',
                           input_shape=(28, 28, 1)),  # 卷积层，32个3x3的卷积核
    tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),  # 最大池化层，2x2池化窗口
    tf.keras.layers.Flatten(),  # 扁平化层，将上一层的输出转为一维数组
    tf.keras.layers.Dense(128, activation='relu'),  # 全连接层，128个神经元
    tf.keras.layers.Dense(10, activation='softmax')  # 输出层，10个神经元，对应10个类别
])

# 编译模型，使用 Adam 优化器和交叉熵损失函数，评价指标为准确率
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# 训练模型，进行5个周期，每个批次128个样本
model.fit(x_train, y_train, epochs=5, batch_size=128)

# 评估模型在测试集上的性能
test_loss, test_acc = model.evaluate(x_test, y_test)
print('Test accuracy:', test_acc)

# Test accuracy: 0.9861000180244446
```
