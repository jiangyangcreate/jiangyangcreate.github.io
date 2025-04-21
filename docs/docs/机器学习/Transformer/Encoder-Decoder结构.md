---
sidebar_position: 1
title: 🚧Encoder-Decoder结构
---

在大模型的处理中，我们会把文本经过tokenizer转为token序列，通过嵌入层转为向量矩阵，经过一系列运算后得出新的向量矩阵，接着将这个新的矩阵最后一个向量与嵌入矩阵中的每个词计算相似度，返回最有相似的向量对应的token作为预测值，将token通过词表转化为文本。将新token追加到输入序列。

循环往复上述过程，直到遇到终止符，模型推理结束。

## 构建词表

词嵌入层（Embedding Layer）是编码器（Encoder）和解码器（Decoder）的组成部分，负责将输入Token映射为稠密向量。

不同的模型用了不同的语料，因此维度大小、Token划分都是不一样的（为了避免维度爆炸，我们一般指定维度大小，通过频次聚类压缩，使得维度不会太大）。即不同模型编码器与解码器不一样，如果混用则可能输出乱码，即发现乱码时需要查看 词嵌入向量 模块与模型是否出自同一家厂商。

训练大模型之前，一般先训练词嵌入向量库。训练前的词向量库会分配给每个token一个随机权重，如果不加训练也会输出乱码。训练后的词向量库每个token权重固定，相似词向量上体现一定的相似性。如果算力不够可以选择同时开源对应权重的【词嵌入向量库】

获得词嵌入向量的步骤：

分词：首先需要使用某种分词器对输入文本进行分词处理，将其划分为一个个 token。这个过程中英文的单词有时需要下载一个分词表（通常为 tokenizer.json：分词器配置文件，用于文本的分词处理。），单词拆为本身和前缀与后缀，这个词表是人工标注的，这也是为什么英语是大模型首选语言。

构建词表：根据分词结果，统计所有 token 的出现频率，并依据设定的词表大小，选择保留的词汇。通常会保留高频率词汇，同时也会加入一些特殊符号（如垫零符 `<PAD>`、未知词 `<UNK>` 等）。通常为 tokenizer_config.json：分词器配置文件，定义了分词器的行为。分好后的词放在 vocab.json：词汇表文件，存储了模型所使用的词汇。

初始化嵌入矩阵：创建一个二维矩阵，行数等于词表大小，列数等于嵌入维度（即每个词向量的维度）。这个矩阵可以随机初始化，也可以通过预训练模型加载。

学习词嵌入：在训练神经网络的过程中，嵌入矩阵会被当作可训练参数，随着反向传播不断调整，以使词向量能够更好地表示词语之间的语义关系。这一步骤可以通过多种方法实现。

获取词嵌入向量：当模型训练完成后，对于任何一个给定的 token，都可以通过查找嵌入矩阵快速得到其对应的词嵌入向量。

## 词嵌入

词嵌入的过程是分割好的词从【嵌入矩阵】中获取自己向量的过程，假设【嵌入矩阵】如下：

| 词汇/Token | 维度1 | 维度2 | 维度3 | 维度4 |
| ---------- | ----- | ----- | ----- | ----- |
| \<PAD\>    | 0.00  | 0.00  | 0.00  | 0.00  |
| \<UNK\>    | 0.12  | -0.51 | 0.32  | 0.89  |
| 我         | 0.87  | 0.42  | -0.26 | 0.35  |
| 机器       | 0.32  | 0.52  | 0.75  | 0.22  |
| 学习       | 0.45  | 0.68  | 0.21  | 0.37  |
| 爱         | 0.65  | 0.71  | 0.38  | -0.15 |


当输入一个句子"我爱学习机器学习"时，会被分词为["我", "爱", "学习", "机器", "学习"]，然后每个词在嵌入矩阵中查找对应的向量，得到一系列向量表示：

- "我" → [0.87, 0.42, -0.26, 0.35]
- "爱" → [0.65, 0.71, 0.38, -0.15]
- "学习" → [0.45, 0.68, 0.21, 0.37]
- "机器" → [0.32, 0.52, 0.75, 0.22]
- "学习" → [0.45, 0.68, 0.21, 0.37]

这样，原本的文本序列就被转换为向量序列，这个过程人可以通过肉眼直接看到，机器如何完成？你可以使用for循环加判断，但是有更简单快速的方式。

### 独热编码方式

独热编码是将每个词表示为一个向量，该向量的长度等于词表大小，只有对应词的位置为1，其余位置为0：

```python
import numpy as np

# 假设我们有一个词表和嵌入矩阵
vocab = {"<PAD>": 0, 
         "<UNK>": 1, 
         "我": 2, 
         "爱": 3, 
         "学习": 4, 
        #..........
         "机器": 5000,
        }
embedding_matrix = np.array([
    # 假设为N个维度，N列，这里具象化为4列
    [0.00, 0.00, 0.00, 0.00],  # <PAD>
    [0.12, -0.51, 0.32, 0.89], # <UNK>
    [0.87, 0.42, -0.26, 0.35], # 我
    [0.65, 0.71, 0.38, -0.15], # 爱
    [0.45, 0.68, 0.21, 0.37],  # 学习
    # ........
    [0.32, 0.52, 0.75, 0.22],  # 机器
])

# 将词转换为独热编码
def word_to_onehot(word, vocab_size):
    onehot = np.zeros(vocab_size)
    if word in vocab:
        onehot[vocab[word]] = 1 
        # 以 “我”这个字为例，vocab[“我”] 为2，对应下标位置的值为1，其他为0. 
        # onehot[2] = 1 即[0,0,1,0,0,.....,0]
    else:
        onehot[vocab["<UNK>"]] = 1 # 即未知为1.其他为0 [0,1,0,0,0,.....,0]
    return onehot # 形状为 ：1,5000

# 通过独热编码获取词嵌入
def get_embedding_via_onehot(word, vocab, embedding_matrix):
    onehot = word_to_onehot(word, len(vocab)) 
    return np.dot(onehot, embedding_matrix) # 1,5000  @ 5000,N列 =  1,N列

# 示例
tokens = ["我", "爱", "学习", "机器", "学习"] # 5个词
embeddings = [get_embedding_via_onehot(token, vocab, embedding_matrix) for token in tokens]
# 形状为 5 行 N列，每行即是词对应的向量
```

### 嵌入查找方式（更高效）

实际应用中，我们通常直接使用词索引进行查找，避免独热编码的稀疏计算：

```python
import torch
import numpy as np
embedding_matrix = np.array([
    # 假设为N个维度，N列，这里具象化为4列
    [0.00, 0.00, 0.00, 0.00],  # <PAD>
    [0.12, -0.51, 0.32, 0.89], # <UNK>
    [0.87, 0.42, -0.26, 0.35], # 我
    [0.65, 0.71, 0.38, -0.15], # 爱
    [0.45, 0.68, 0.21, 0.37],  # 学习
    # ........
    [0.32, 0.52, 0.75, 0.22],  # 机器
])

# 使用PyTorch的Embedding层
vocab_size,embedding_dim = embedding_matrix.shape
# embedding_dim 表示词嵌入向量的维度大小，即每个词被映射为4维向量，自己根据预定义的嵌入矩阵设置
# vocab_size 表示词汇表的大小，自己根据预定义的嵌入矩阵设置

# 假设我们有一个词表和嵌入矩阵
vocab = {"<PAD>": 0, 
         "<UNK>": 1, 
         "我": 2, 
         "爱": 3, 
         "学习": 4, 
        #..........
         "机器": 5000,
        }

# 创建嵌入层并初始化权重
embedding = torch.nn.Embedding(vocab_size, embedding_dim)
# 设置预定义的嵌入矩阵
embedding.weight.data = torch.tensor(embedding_matrix, dtype=torch.float)

# 将文本转换为索引
def tokens_to_indices(tokens, vocab):
    return [vocab.get(token, vocab["<UNK>"]) for token in tokens]

# 示例
tokens = ["我", "爱", "学习", "机器", "学习"]
indices = tokens_to_indices(tokens, vocab)
token_indices = torch.tensor(indices)
token_embeddings = embedding(token_indices) # 并行计算

print(token_embeddings)
'''

在实际的Transformer模型中，词嵌入通常是模型训练的一部分，会根据任务目标不断优化调整。这种基于查表的方式比循环判断更高效，可以并行处理整个序列的所有词，大大提高了计算速度。

词嵌入只考虑了词的语义信息，但在序列中，词的位置也很重要。Transformer通过位置编码（Positional Encoding）来捕捉序列中词的位置信息
'''
def get_positional_encoding(seq_len, d_model):
    pe = np.zeros((seq_len, d_model))
    for pos in range(seq_len):
        for i in range(0, d_model, 2):
            pe[pos, i] = np.sin(pos / (10000 ** (i / d_model)))
            if i + 1 < d_model:
                pe[pos, i + 1] = np.cos(pos / (10000 ** (i / d_model)))
    return pe

# 示例：生成长度为(根据输入的序列长度)，维度为4的位置编码
seq_len = len(tokens)
positional_encoding = get_positional_encoding(seq_len,embedding_dim)
print(positional_encoding)

# 将位置编码加到词嵌入上(不会改变形状)
final_embeddings = token_embeddings + torch.tensor(positional_encoding, dtype=torch.float)
```

位置编码和词嵌入相加后，就得到了包含语义和位置信息的完整表示，这将作为编码器的输入。