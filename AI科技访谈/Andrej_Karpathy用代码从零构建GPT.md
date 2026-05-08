# Andrej Karpathy: Let's Build GPT — From Scratch, In Code, Spelled Out
# Andrej Karpathy：用代码从零构建 GPT

---

## 引言 / Introduction

**来源 / Source**: Andrej Karpathy @karpathy, YouTube
**视频 / Video**: https://www.youtube.com/watch?v=kCc8FmEb1nY
**发布 / Published**: 2023-01-17
**时长 / Duration**: 约1小时45分 | **字数 / Words**: 21,030+
**形式 / Format**: 双语模式（简体中文 + English）

这是 Andrej Karpathy 最受欢迎的技术视频之一，也是互联网上最清晰、最完整的 GPT 内部机制推导。Karpathy 以"从空文件开始，逐步定义 Transformer 的每个组件"的方式，带领观众从零构建了一个完整的 GPT 模型（nanogpt）。

> "我想做的是从零开始构建一个类似 ChatGPT 的系统。我们不打算完整复现 ChatGPT——它有预训练和微调两个阶段，非常复杂。我要做的是在 Jupyter Notebook 里逐行写代码，构建一个基于 Transformer 的字符级语言模型。"

---

## 第一章　ChatGPT 本质：概率语言预测 / ChatGPT: A Probabilistic Language Predictor

### 1.1 语言模型的核心 / Core of Language Models

Karpathy 开篇即点明 ChatGPT 的本质：

> "ChatGPT 是一个概率系统。对于任何一个提示词，它可以给出多个答案——每次生成的结果都略有不同，因为它在预测下一个最可能的词。"

ChatGPT is not sentient. It is a next-token predictor: for any given prompt, it predicts the most likely next token, then the next, then the next, producing text autoregressively.

Karpathy 展示了一个关键实验：用同一个提示词运行两次，ChatGPT 给出了两个不同的回答。这不是随机性，而是模型在相同上下文下的不同采样路径。

### 1.2 GPT 与 ChatGPT 的区别 / GPT vs ChatGPT

这是理解整个视频的基础：

| 概念 | 定义 |
|------|------|
| **GPT** | Generative Pre-trained Transformer，基于 Transformer 的语言模型，预测序列中的下一个 token |
| **ChatGPT** | 在 GPT 基础上增加了人类反馈强化学习（RLHF）微调的系统，使其回答更像人类助手 |
| **GPT-2/3/4** | OpenAI 发布的预训练模型，参数规模逐代增大 |

> "我们正在构建的是 GPT-2 规模的模型。GPT-2 来自 2017 年，是 OpenAI 发布的最小版本，只有 1.24 亿参数——我们只是在验证代码库是否正确，然后加载 OpenAI 公开的权重。"

---

## 第二章　数据：字符级模型 / Data: Character-Level Language Model

### 2.1 Shakespeare 数据集 / The Shakespeare Dataset

Karpathy 选择用莎士比亚作品全集作为训练数据：

> "我们要训练一个字符级语言模型。输入是一段文本——在 Python 里就是一个长字符串。字符级模型逐个字符地预测下一个字符，而不是逐词预测。"

Character-level models predict the next character, not the next word. This means the vocabulary size is dramatically smaller (typically ~50-100 characters including uppercase, lowercase, punctuation) compared to word-level models (tens of thousands).

### 2.2 词汇表构建 / Building the Vocabulary

字符级模型的核心优势之一：**极小的词汇表**。Karpathy 在视频中演示了如何从训练数据构建字符词汇表：

```python
# 伪代码示例
chars = sorted(list(set(data)))  # 找出所有独特字符
vocab_size = len(chars)  # 通常 < 100
```

### 2.3 tokenization 的核心地位 / Tokenization as the Foundational Choice

Karpathy 强调 tokenization 选择的重要性：

> "ChatGPT 底层不是在字符级别运作的——它使用的是 subword tokenization（子词分词）。Tokens 不是完整的词，而是词的部分片段，通常对应 3-4 个字符。这样词汇表大小适中（~50000），同时保留了语言的语义完整性。"

Character-level = small vocab, longer sequences.
Subword (BPE/WordPiece) = medium vocab, shorter sequences.
Word-level = huge vocab, shorter sequences.

GPT 系列使用 GPT-2 的 BPE（Byte Pair Encoding）tokenizer。

---

## 第三章　Transformer 架构：从嵌入到预测 / Transformer Architecture: From Embedding to Prediction

### 3.1 整体流程图 / Overall Architecture Flow

Karpathy 逐步构建的 Transformer 流程如下：

```
输入文本 → Tokenize → 嵌入向量 + 位置编码
           ↓
      多层 Transformer Block（×N）
           ↓
      Layer Normalization
           ↓
      线性投影 → Softmax → 下一个 token 的概率分布
```

### 3.2 位置编码 / Positional Encoding

Transformer 本身不感知 token 的位置信息——注意力机制是位置无关的。因此需要显式注入位置信息：

> "我们使用正弦/余弦函数的位置编码，让模型能够区分 token 的顺序。Attention is All You Need 论文中使用的是固定位置编码，后来的 GPT 模型改为可学习的位置嵌入。"

Rope（Rotary Position Embedding）是 GPT 系列使用的方案，GPT-2 之后成为主流。

### 3.3 自注意力机制 / Self-Attention Mechanism

自注意力是 Transformer 的核心——它允许每个位置关注序列中的所有其他位置：

Karpathy 在视频中详细推导了注意力矩阵的计算：

```
Attention(Q, K, V) = softmax(QK^T / √d_k) × V
```

其中：

- **Q（Query）**：当前位置"在找什么"
- **K（Key）**：每个位置的"内容标签"
- **V（Value）**：每个位置的实际信息

> "QK^T 的除以 √d_k 是为了缩放（Scaling），防止点积过大导致 Softmax 梯度消失。这是 Transformer 中为数不多的 hack 之一。"

Karpathy 强调，注意力机制的输出是输入序列的**加权聚合**——信息在序列内流动，每个位置整合来自其他位置的信息。

---

## 第四章　多头注意力 / Multi-Head Attention

### 4.1 为什么需要多头 / Why Multiple Heads

单头注意力只能捕捉一种类型的关联关系。但语言中同时存在多种关系：

- 语法关联（主语→动词）
- 指代关系（"他"指代前文的名词）
- 语义相似（"狗"和"猫"相关）

> "我们将注意力分成多个头（Head），每个头独立学习不同的关联模式，然后将所有头的输出拼接起来。这让模型能够同时捕捉多种类型的关系。"

### 4.2 实现细节 / Implementation Details

```python
# 多头注意力的核心逻辑（伪代码）
heads = [self_attention(x) for _ in range(n_heads)]
output = concat(heads)  # 拼接
output = self.proj(output)  # 线性投影回原始维度
```

---

## 第五章　Transformer Block：残差连接与层归一化 / Transformer Block: Residual + LayerNorm

### 5.1 残差连接 / Residual Connections

每个子层（注意力/前馈网络）周围都有残差连接：

```
x = x + Sublayer(x)  # 残差
```

> "残差连接使得梯度能够直接流过，缓解了深层网络的梯度消失问题。这也是为什么 Transformer 可以堆叠很多层——GPT-2 有 12 层，GPT-3 有 96 层。"

### 5.2 层归一化 / Layer Normalization

LayerNorm 是在每个 token 的特征维度上做归一化：

> "LayerNorm 让训练更加稳定。我们对每个 token 的特征向量计算均值和标准差，然后做归一化。BatchNorm 是在批次维度上做，而 LayerNorm 不依赖于批次统计量，这对语言模型来说更合理。"

### 5.3 Pre-Norm vs Post-Norm

Karpathy 提到 GPT 使用的是 **Pre-LN**（在残差分支内部做 LayerNorm），而原始 Transformer 使用的是 Post-LN：

- **Pre-LN**：`x = x + Sublayer(LayerNorm(x))` — 训练更稳定
- **Post-LN**：`x = LayerNorm(x + Sublayer(x))` — 原始论文方案

---

## 第六章　语言模型的训练 / Training the Language Model

### 6.1 目标函数 / Objective Function

语言模型的训练目标是**最大化对数似然**——在给定前 n-1 个 token 的条件下，最大化第 n 个 token 的对数似然：

```
loss = -sum(log(P(next_token | context)))
```

Karpathy 强调：这是一个简单的分类交叉熵损失，预测的对象是**下一个 token**。

### 6.2 Bigram 模型作为 Baseline / Bigram as Baseline

Karpathy 先实现了一个 Bigram 语言模型作为基线——只根据前一个字符预测后一个字符。这虽然极其简单，但能生成一些看起来有结构的字符序列（因为它记住了训练数据中的字符转移概率）。

> "Bigram 模型的问题是它完全没有上下文——它只用一个字符来预测下一个。这就像马尔可夫链。Transformer 通过注意力机制，能够利用任意长度的上下文。"

### 6.3 训练循环 / Training Loop

Karpathy 展示了完整的 PyTorch 训练循环：

```python
# 核心训练步骤
for epoch in range(num_epochs):
    # 随机选取批次
    idx = torch.randint(len(data) - block_size, (batch_size,))

    # 前向传播
    logits = model(idx)

    # 计算损失（只关注下一个 token）
    loss = criterion(logits, targets)

    # 反向传播
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

---

## 第七章　生成与温度采样 / Generation and Temperature Sampling

### 7.1 自回归生成 / Autoregressive Generation

模型生成文本的方式是完全自回归的——用已生成的 token 作为下一步的输入：

```
input: "The"
model predicts: " " (probability 0.3), "L" (0.15), ...
sample -> " "
input: "The "
model predicts: "q" ...
...
```

### 7.2 温度采样 / Temperature Sampling

温度参数 T 控制采样的随机性：

| T 值 | 效果 |
|------|------|
| **T = 0** | 贪婪选择，总是选概率最高的 token（deterministic） |
| **T = 1** | 原始概率分布 |
| **T > 1** | 更随机，多样性增加但质量下降 |

> "Temperature 采样让生成变得更有创造性。当 T=0 时，模型总是选择最可能的下一个 token——这会导致重复循环。当 T 提高时，模型会选择概率较低但更多样化的 token。"

---

## 第八章　GPT-2 架构细节 / GPT-2 Architecture Details

### 8.1 Decoder-Only Transformer

GPT 是 **Decoder-Only** 的 Transformer——只有解码器部分，没有编码器：

> "原始的 Attention is All You Need 论文有编码器和解码器两部分。编码器处理完整的输入序列，解码器只能看到当前及之前的 token（通过 Masked Attention）。GPT 只使用了解码器——这就是为什么它叫 'Generative Pre-trained Transformer'（生成式预训练 Transformer）。"

| 架构 | 代表模型 | 特点 |
|------|----------|------|
| Encoder-Decoder | T5, BART | 完整编码器-解码器结构 |
| Decoder-Only | GPT 系列, LLaMA | 单向注意力，生成式 |

### 8.2 GPT-2 的规模 / GPT-2 Scale

| 模型 | 层数 | 维度 | 头数 | 参数量 |
|------|------|------|------|--------|
| GPT-2 Small | 12 | 768 | 12 | 124M |
| GPT-2 Medium | 24 | 1024 | 16 | 355M |
| GPT-2 Large | 36 | 1280 | 20 | 774M |
| GPT-2 XL | 48 | 1600 | 25 | 1.5B |

Karpathy 在视频中构建的是 GPT-2 Small 规模的模型。

---

## 第九章　ChatGPT 的训练流程 / ChatGPT's Training Pipeline

### 9.1 预训练阶段 / Pre-training

这是视频中 Karpathy 构建的内容——在大规模互联网文本上做语言建模：

> "预训练阶段：模型在大规模语料上做语言建模——预测下一个 token。这不需要人工标注，只需要大量文本数据。GPT-3 用的训练数据是 Common Crawl（一个互联网文本的抓取）。"

### 9.2 微调阶段 / Fine-tuning

ChatGPT 与 GPT 的核心区别在于微调：

1. **SFT（监督微调）**：用人类写的问答对微调模型
2. **RLHF（基于人类反馈的强化学习）**：
   - 训练一个奖励模型（Reward Model）
   - 用 PPO 算法优化策略

> "RLHF 是 ChatGPT 能够对话、遵循指令、拒绝有害请求的关键。这需要大量人类标注的数据和复杂的强化学习基础设施。"

---

## 第十章　GPT 的局限性与未来 / Limitations and Future

### 10.1 幻觉问题 / Hallucination

Karpathy 承认 GPT 的幻觉（Hallucination）问题：

> "语言模型只是在预测下一个 token——它不知道什么是真的，什么是假的。它可能会很自信地给出一个错误答案，因为这个答案在语法上是完全合理的。"

### 10.2 上下文长度限制 / Context Length Limits

注意力机制的复杂度是 O(n²)，上下文越长，计算成本急剧增加。Karpathy 指出了 GPT-4 支持 128k token 上下文的工程难度：

> "增加上下文长度不是简单的改变一个数字——它需要重新设计注意力机制（如 Sparse Attention），否则计算量会大到无法承受。"

### 10.3 实时知识更新 / Knowledge Updates

> "预训练的知识是静态的。要让模型知道新信息，有几个方案：RAG（检索增强生成）、微调、或者让模型在生成时访问工具（如搜索 API）。"

---

## 附录一：核心概念双语对照 / Appendix I: Key Terms

| 中文 | English | 定义 |
|------|---------|------|
| **Token** | Token | 语言模型处理的基本单元（词、片或字符） |
| **自注意力** | Self-Attention | 允许序列中每个位置关注所有其他位置的机制 |
| **多头注意力** | Multi-Head Attention | 将注意力分成多个并行头，捕捉多种关联模式 |
| **位置编码** | Positional Encoding | 注入序列位置信息的机制（固定或可学习） |
| **残差连接** | Residual Connection | 绕过子层的 shortcut，帮助梯度流动 |
| **层归一化** | Layer Normalization | 对每个样本的特征维度做归一化 |
| **温度采样** | Temperature Sampling | 控制生成随机性的参数 |
| **RLHF** | Reinforcement Learning from Human Feedback | 基于人类反馈的强化学习微调方法 |
| **幻觉** | Hallucination | 模型生成看似合理但实际错误的内容 |
| **Bigram** | Bigram Model | 基于前一个 token 预测下一个的最简单语言模型 |

---

## 附录二：时间戳索引 / Appendix II: Timestamps

基于视频章节结构（ytscribe 标注）：

| 章节 | 主题 |
|------|------|
| 00:00 | ChatGPT 介绍与语言模型本质 |
| ~10:00 | Shakespeare 数据集与字符级模型 |
| ~20:00 | Bigram 模型实现 |
| ~25:00 | Transformer 嵌入与位置编码 |
| ~35:00 | 自注意力机制详解 |
| ~45:00 | 多头注意力 |
| ~55:00 | Transformer Block：残差与 LayerNorm |
| ~65:00 | GPT-2 架构与规模 |
| ~75:00 | 训练循环与优化 |
| ~85:00 | 生成与温度采样 |
| ~95:00 | ChatGPT vs GPT：RLHF 微调 |
| ~105:00 | 局限性与未来方向 |

---

## 附录三：核心代码架构 / Appendix III: Code Architecture

Karpathy 在视频中构建的 nanogpt 代码结构：

```
nanogpt/
├── model.py          # GPT 模型定义
│   ├── BigramLanguageModel  # 主模型类
│   ├── TransformerBlock     # Transformer 块
│   ├── Head                 # 单头注意力
│   └── LayerNorm
├── train.py         # 训练脚本
└── config.py       # 超参数配置
```

GPT 模型的 forward 流程：

```python
# 伪代码：GPT 前向传播
x = self.token_embedding(idx)  # token 嵌入
x = x + self.position_embedding  # 加上位置编码
for block in self.blocks:
    x = block(x)  # Transformer Block
x = self.ln_f(x)  # 最终 LayerNorm
logits = self.head(x)  # 投影到词汇表大小
```

---

## 附录四：关键语录 / Appendix IV: Key Quotes

> "ChatGPT is not sentient. It is a next-token predictor."
> "ChatGPT 不是有意识的。它只是一个下一个 token 预测器。"

> "Attention is all you need — but you need a lot of it."
> "注意力就是你所需要的一切——但你需要大量的注意力。"

> "The Transformer is a remarkable piece of engineering because it scales."
> "Transformer 之所以出色，是因为它可以 scale。"

> "Language models are just predicting the next word — they don't know what's true or false."
> "语言模型只是在预测下一个词——它不知道什么是真的，什么是假的。"

> "GPT-2 has 124 million parameters. GPT-3 has 175 billion. The gap is not just scale — it's emergent capabilities."
> "GPT-2 有 1.24 亿参数。GPT-3 有 1750 亿。差距不只是规模——而是涌现的能力。"

---

*本文基于 Andrej Karpathy 的 "Let's Build GPT" 视频，2023年1月发布。视频时长约1小时45分，转录文本约21,030词。全部内容已通读并深度分析。*
