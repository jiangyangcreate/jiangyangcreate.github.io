## 前馈神经网络FNN

凡是模仿人的神经网络构建出来的数学模型，都叫神经网络,或者人工神经网络。

### 原理

神经网络可以归为三块：

- BP 神经网络

神经网络非常多，今天你根据生物神经网络构建一个模型，明天我根据生物神经网络构建一个。1986 年，来了两个家伙 Romelhart 和 Mcclelland，提出了一个特殊的结构，并命名： BP 神经网络 。BP 神经网络提出后，瞬间崛起后当了主力军。在不特指时，往往说神经网络都是指 BP 神经网络。

- 深度学习

BP 神经网络虽然很好用，但当要处理图象，音频，文字等问题时，却不行了，BP 神经网络的参数会随着输入个数指数增长。例如一个 50 _ 50 像素的图象，就有 2500 个输入 。假设有 100 个隐节点，则 2500 个输入在第一层的权重参数就有 2500 _ 100 个 ，
参数个数量级太爆炸，导致 BP 在求解时，很难找到优秀解就宕机了。这本来是个没办法的事，但偏偏图象，音频这些问题，它的输入存在很严重的相关性（例如相邻像素的值总是相近的）因此，可以根据这个业务特性，进行输入个数压缩，或者在求解时根据这个业务特性进行特殊讨巧（例如相邻输入对应的权重参数共享）使 BP 神经网络又可以解决这类问题了。问题解决了，BP 还是 BP，挂个名： 深度学习！你可以把深度学习看作是 BP 神经网络的一种加强版，解决输入极极极极多的问题。

- 其它神经网络

感知机、Hopfield 神经网络、径向基神经网络等等

BP 神经网络是可以解决很多问题的，比较万能，但我们不会所有问题都会使用 BP 神经网络。在我们在知道 X，Y 之间的一些特性的条件下，我们更愿意充分利用这些特性，建立其他模型，这样更具解释性 。例如，我们知道 X，Y 之间是线性关系，我们就会建立线性回归模型，而不是 BP 神经网络。

神经元与神经元之间是以神经冲动的模式进行传值,信号到了神经元，都是以电信号的形式存在,
当电信号在神经元积累到超过阈值时，就会触发神经冲动，将电信号传给其它神经元。  
正是根据这个思路，就构造出了以上的神经网络结构。

### 简单示例

一张 28\*28 的图片可以抽象为一个 784 维的向量，每个像素点的值就是向量的一个分量。我们可以将这个向量作为输入，通过神经网络，输出一个 10 维的向量，每个分量代表图片属于某个数字的概率。

一个有 784 个输入节点，16 个隐藏节点，10 个输出节点的神经网络结构，用线性代数的方法简洁表示层与层之间的权重：

$$
\begin{bmatrix}
a_{0}^{1} = \sigma \left( \sum_{1}^{784} (w_{0,i} \cdot a_{i}^{0}) + b_{0} \right)\\

a_{1}^{1} = \sigma \left( \sum_{1}^{784} (w_{1,i} \cdot a_{i}^{0}) + b_{1} \right)\\

...\\

a_{15}^{1} = \sigma \left( \sum_{1}^{784} (w_{15,i} \cdot a_{i}^{0}) + b_{15} \right)\\
\end{bmatrix}
$$

矩阵表示

$$
\begin{bmatrix}
    w_{0,0} & w_{0,1} & ... & w_{0,784} \\
    w_{1,0} & w_{1,1} & ... & w_{1,784} \\
    ... & ... & ... & ... \\
    w_{15,0} & w_{15,1} & ... & w_{15,784}
\end{bmatrix}
$$

```python showLineNumbers
import numpy

# 确保绘图在此nb中进行，而不是在外部窗口中
class NeuralNetwork:
    # 初始化神经网络
    def __init__(self, inputnodes, hiddennodes, outputnodes, learningrate):
        # 设置每个输入、隐藏和输出层的节点数
        self.inodes = inputnodes
        self.hnodes = hiddennodes
        self.onodes = outputnodes
        # 连接权重矩阵，wih 和 who
        # 数组中的权重是 w_i_j，其中链接从上一层的节点 i 到下一层的节点 j
        # w11 w21
        # w12 w22 等等
        # 返回正态分布数据
        self.wih = numpy.random.normal(0.0, pow(self.inodes, -0.5), (self.hnodes, self.inodes))
        self.who = numpy.random.normal(0.0, pow(self.hnodes, -0.5), (self.onodes, self.hnodes))
        # 学习率
        self.lr = learningrate
        # 激活函数是 sigmoid 函数
        self.activation_function = lambda x: 1 / (1 + numpy.exp(-x))
        pass

    # 训练神经网络
    def train(self, 输入列表, 目标列表):
        # 将输入列表转换为 2D 数组
        inputs = numpy.array(输入列表, ndmin=2).T
        targets = numpy.array(目标列表, ndmin=2).T
        # 计算进入隐藏层的信号
        hidden_inputs = numpy.dot(self.wih, inputs)
        # 计算从隐藏层出来的信号
        hidden_outputs = self.activation_function(hidden_inputs)

        # 计算进入最终输出层的信号
        final_inputs = numpy.dot(self.who, hidden_outputs)
        # 计算从最终输出层出来的信号
        final_outputs = self.activation_function(final_inputs)

        # 输出层误差是 (目标 - 实际)
        output_errors = targets - final_outputs
        # 隐藏层误差是输出误差，按权重拆分，重新组合在隐藏节点处
        hidden_errors = numpy.dot(self.who.T, output_errors)

        # 更新隐藏层和输出层之间的链接权重
        self.who += self.lr * numpy.dot((output_errors * final_outputs * (1.0 - final_outputs)), numpy.transpose(hidden_outputs))

        # 更新输入层和隐藏层之间的链接权重
        self.wih += self.lr * numpy.dot((hidden_errors * hidden_outputs * (1.0 - hidden_outputs)), numpy.transpose(inputs))

        pass

    # 查询神经网络
    def query(self, 输入列表):
        # 将输入列表转换为 2D 数组
        inputs = numpy.array(输入列表, ndmin=2).T

        # 计算进入隐藏层的信号
        hidden_inputs = numpy.dot(self.wih, inputs)
        # 计算从隐藏层出来的信号
        hidden_outputs = self.activation_function(hidden_inputs)

        # 计算进入最终输出层的信号
        final_inputs = numpy.dot(self.who, hidden_outputs)
        # 计算从最终输出层出来的信号
        final_outputs = self.activation_function(final_inputs)

        return final_outputs


input_nodes = 64
hidden_nodes = 32
output_nodes = 10

# 学习率
learning_rate = 0.2

# 创建神经网络实例
n = NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate)

from sklearn import datasets
from sklearn.model_selection import train_test_split
# 加载数据集
digits = datasets.load_digits()
X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target, test_size=0.1,random_state=0)

epochs = 2  # 回声增加样本量

for i in range(epochs):
    for record in zip(y_train, X_train):
        y, X = record
        # 缩放和移动输入
        inputs = (numpy.asfarray(X) / 16.0 * 0.99) + 0.01
        # 创建目标输出值（全部为 0.01，除了所需标签为 0.99）
        targets = numpy.zeros(output_nodes) + 0.01
        # all_values[0] 是此记录的目标标签
        targets[int(y)] = 0.99
        n.train(inputs, targets)
# 我们自己的图像测试数据集
our_own_dataset = []

for i in zip(y_test, X_test):
    label, img_array = i
    # img_data  = 16.0 - img_array
    # 然后将数据缩放到范围从 0.01 到 1.0
    img_data = (img_array / 16.0 * 0.99) + 0.01
    # 将标签和图像数据附加到测试数据集
    record = numpy.append(label, img_data)
    our_own_dataset.append(record)
    pass

right = 0
error = 0
for item in range(len(our_own_dataset)):
    # 正确答案是第一个值
    correct_label = our_own_dataset[item][0]
    # print(correct_label)

    # 数据是剩余的值
    inputs = our_own_dataset[item][1:]

    # 查询网络
    outputs = n.query(inputs)

    # 最高值的索引对应于标签
    label = numpy.argmax(outputs)
    if label != correct_label:
        error += 1
    else:
        right += 1
print(right / (right + error))

```

### 实战应用

在现实生活中并不存在一个场景，给你单独一个数字让你进行识别。但是有一些类似的场景，譬如：车牌号、发票号码、网站的验证码等。针对这些场景，我提供一些思路：

- 我们需要对图像进行分割，下面是一个分割 4 个字的验证码的例子,
- 分割完成后再将结果依次做标准化处理，譬如压缩数组大小
- 逐一识别，返回结果

```python showLineNumbers
from PIL import ImageFont,Image,ImageDraw
# 生成一个验证码
c_chars = "0 1 2 3 4"
path = 'test.png'
size = (100,24)                             #图片大小
img = Image.new("RGB",size)
draw = ImageDraw.Draw(img)                  #draw一个
font = ImageFont.truetype("arial.ttf", 23)      #字体
draw.text((5,0),c_chars,font=font,fill="white") #字颜色
# img.show()
img.save(path)

# 分割图片
def sliceImg(img_path, count = 5):
    img = Image.open(img_path).convert("L")
    w, h = img.size
    eachWidth = int(w/count)
    for i in range(count):
        box = (i * eachWidth, 0, (i + 1) * eachWidth, h)
        yield img.crop(box)

# 转化图片
def exchange(img):
    target_size = (8, 8)
    resized_image = img.resize(target_size)
    # resized_image.show()
    return resized_image


out = ""
for i in sliceImg(path):
    # .flatten()方法将数组转化为列表
    original_array =  numpy.array(exchange(i)).flatten()
    # 将数据0-1化
    inputs = (original_array / 255.0 * 0.99) + 0.01
    # 查询网络
    outputs = n.query(inputs)
    # print(outputs)
    # 最高值的索引对应于标签
    label = numpy.argmax(outputs)
    out+=str(label)
print(out)
```

从结果上我们可以看到，0、1、2、4 被正确的识别了。但数字 3 没有被正确的识别。请思考这个案例中，最有效的优化方式。

答案 A：优化图片裁切结构，使用其他膨胀、侵蚀、over padding 等算法

答案 B：增加回声，强化模型能力

答案 C：.....

<details>

```python showLineNumbers
# 这里我检查了转化后8*8的数字3的图片，对比了手写数字3和手写数字8，
# 我认为生成的数字3与手写8更接近相对于与手写3
# 所以我认为的解决的方案是：给模型再喂一些生成数字3的样本。

from PIL import ImageFont,Image,ImageDraw
# 生成一个验证码
c_chars = "3 3 3 3 3"
path = 'test.png'
size = (100,24)                             #图片大小
img = Image.new("RGB",size)
draw = ImageDraw.Draw(img)                  #draw一个
font = ImageFont.truetype("arial.ttf", 23)      #字体
draw.text((5,0),c_chars,font=font,fill="white") #字颜色
# img.show()
img.save(path)

# 分割图片
def sliceImg(img_path, count = 5):
    img = Image.open(img_path).convert("L")
    w, h = img.size
    eachWidth = int(w/count)
    for i in range(count):
        box = (i * eachWidth, 0, (i + 1) * eachWidth, h)
        yield img.crop(box)

# 转化图片
def exchange(img):
    target_size = (8, 8)
    resized_image = img.resize(target_size)
    # resized_image.show()
    return resized_image


for i in sliceImg(path):
    # .flatten()方法将数组转化为列表
    original_array =  numpy.array(exchange(i)).flatten()
    # 将数据0-1化
    inputs = (original_array / 255.0 * 0.99) + 0.01
    targets = numpy.zeros(output_nodes) + 0.01
    # all_values[0] 是此记录的目标标签
    targets[int(3)] = 0.99
    n.train(inputs, targets)

# 生成一个验证码
c_chars = "0 1 2 3 4"
path = 'test.png'
size = (100,24)                             #图片大小
img = Image.new("RGB",size)
draw = ImageDraw.Draw(img)                  #draw一个
font = ImageFont.truetype("arial.ttf", 23)      #字体
draw.text((5,0),c_chars,font=font,fill="white") #字颜色
# img.show()
img.save(path)

out = ""
for i in sliceImg(path):
    # .flatten()方法将数组转化为列表
    original_array =  numpy.array(exchange(i)).flatten()
    # 将数据0-1化
    inputs = (original_array / 255.0 * 0.99) + 0.01
    # 查询网络
    outputs = n.query(inputs)
    # print(outputs)
    # 最高值的索引对应于标签
    label = numpy.argmax(outputs)
    out+=str(label)
print(out)

# 移除生成的图片，保持文件夹的整洁
import os
os.remove(path)
```

可以看到输出的结果已经正确的显示为 1、2、3、4。如此一来。模型就算训练完成了。

</details>
