---
title: "Stanford CME295 Transformers & LLMs | Lecture 2 - Transformer Based Models & Tricks"
source: "Stanford Online"
url: "https://www.youtube.com/watch?v=yT84Y5zCnaA"
duration: "107分钟19秒 (6439秒)"
description: "本讲深入解析Transformer架构中的关键 Tricks：位置编码（正弦、 learned、RoPE、ALiBi）、层归一化（PostNorm / PreNorm / RMSNorm）、注意力近似（MHA / MQA / GQA）、稀疏注意力；并系统讲解基于Encoder的模型家族（BERT深度解析：MLM、NSP、WordPiece分词器、Segment Encoding）、BERT微调范式，以及DistilBERT蒸馏、RoBERTa改进（动态Masking、去掉NSP、数据策略升级）等扩展方向。
---

## 一句话核心主旨

Transformer架构（2017）之所以历久弥新，关键在于位置编码、层归一化、注意力机制三大组件的持续演进：从正弦位置编码到RoPE旋转式位置嵌入，从PostNorm到PreNorm/RMSNorm，从标准MHA到MQA/GQA稀疏近似；BERT在此基础上以Encoder-only架构 + MLM/NSP双目标预训练 + 分层微调，开创了NLP预训练时代。

---

## 逐章详解

### 00:00:00 Introduction

课程开场说明两项事务性通知：其一，Lecture 1录音质量欠佳，本讲更换了设备配置；其二，期末考试日期（12月10日）可能调整，请关注后续通知。随后快速回顾上讲内容——Self-Attention机制的基本原理：Query-Key-Value矩阵运算，Softmax(QK^T / √d_k)V公式，以及Transformer Encoder-Decoder整体架构。

---

### 00:01:30 Recap of Transformers

回顾Self-Attention的核心公式 **Softmax(QK^T / √d_k)V**，强调该公式由矩阵乘法构成，硬件高度优化、计算效率极高。Transformer由Encoder（处理源语言输入）和Decoder（生成目标语言翻译）两大组件构成。

**Multi-Head Attention的理解**：每个Head代表一种将输入投影为Query、Key、Value的方式——每个Head有独立的投影矩阵，所有Head并行计算后Concatenate，再通过输出矩阵投影。引入了Attention Map的概念来可视化解释：取某个Token对应的Query，与所有其他Token的Key做点积，得到的注意力权重反映"该Token认为哪些词与它最相似"。论文中以"making ... legal"为例，高注意力权重落在"law"和"application"上，说明模型能学到语义关联。

**关键QA**：不同Head是否共享MLP？——答案是否定的，每个Head有独立的投影矩阵，并行计算，本质上只是不同的线性投影。

---

### 00:10:37 Overview of Position Embeddings

Self-Attention中所有Token直接交互、无视顺序，因此天然缺失位置信息（与RNN的顺序处理相反）。需要人为注入位置信号。

**第一种方法：Learned Position Embedding**
为每个位置分配一个可学习的Embedding（Position 1、2、3...），与Token Embedding直接相加（Add）输入。

**局限性**：
1. 严重依赖训练数据的分布——若训练集中某位置总与特定语义绑定，学到的Embedding会携带这种偏置
2. 无法泛化到训练时未见过的最大位置——若训练最大序列长度为512，则无法处理更长推理序列

**两种方法对比**： Learned方法在训练数据内表现好；Sinusoidal方法可外推到任意长度。

---

### 00:15:36 Sinusoidal Embeddings

**正弦位置编码**（原始Transformer论文采用）：不为每个位置学习Embedding，而是用固定数学公式生成。

对于位置m，构建d_model维向量，第i维为：
- **sin(ω_i · m)**，其中 ω_i = 10000^(-2i/d_model)
- **cos(ω_i · m)**

**数学直觉**：两个位置m和n的Embedding点积是 **cos(ω_i(m-n))** 的加权和——即相对距离的函数。

这意味着：
- m = n（同一位置）时，点积最大（cos(0)=1），相似度最高——符合"相近Token应更相似"的直觉
- 距离越远，余弦值越小，相似度越低

**优势**：可泛化到任意序列长度，不受训练数据位置分布限制。

**频率特性**：低维度（i小）→ ω_i大 → 变化快（高频）；高维度（i大）→ ω_i小 → 变化慢（低频）。图中横轴为维度，纵轴为50个位置的编码值，展示了低频到高频的连续变化。

---

### 00:25:56 T5 Bias, ALiBi

**核心问题**：将位置编码加在Input侧是一种间接方式——我们真正希望影响的是Attention层的相似度计算，而非仅仅在输入层面叠加信号。

**T5的相对位置偏置（Relative Position Bias）**：
不再对位置做绝对编码，而是对Query-Key的相对距离m-n做Bucketization（分桶），然后让模型学习这些偏置量，加入Softmax内部。Softmax本身会归一化，所以偏置可正可负（远距离偏负、近距离偏正）。

**ALiBi（Attention with Linear Biases）**：
不做学习，而是用确定性公式 **-|m-n|** 作为偏置，直接加到注意力 logits 上。论文来自TrainShort Teslong团队。

**问题**：两者均未成为主流——T5偏置需要学习、仍受训练数据影响；ALiBi公式过于简单、表达能力有限。

---

### 00:31:02 RoPE（Rotary Position Embeddings）

**核心思想**：不向输入或注意力添加偏置，而是**旋转**Query和Key向量，使它们的位置信息自然编码在旋转矩阵中。

**2D旋转直觉**：
向量 v = [x, y] = r[cosφ, sinφ]，乘以旋转矩阵 R(θ) = [[cosθ, -sinθ], [sinθ, cosθ]]，得到旋转后向量 r[cos(φ+θ), sin(φ+θ)]。

**在RoPE中的应用**：
将Query向量旋转角度θ_m = ω_i · m，Key向量旋转角度θ_n = ω_i · n。旋转后两者的点积变为 **cos(θ_m - θ_n)** = **cos(ω_i(m-n))**——正好是相对距离的函数！

**重要意义**：
1. 最终得到的注意力权重 **q·k^T** 是相对距离的函数，自然满足"近距离高相似"的需求
2. 不需要任何可学习参数（θ固定为ω_i），避免过拟合
3. **当今大多数LLM均采用RoPE**（LLaMA、Qwen等），是本讲最重要的技术点

**额外观察**：注意力上界随相对距离增大呈**长期衰减（Long-term Decay）**——有数学证明，远距离Token的注意力上界逐渐变小，但并非完美衰减（有小幅振荡）。

**维度扩展**：将d_model分成d/2个2D块，每块独立应用旋转，θ_i = 10000^(-2i/d)。

---

### 00:43:42 Layer Normalization

**Add & Norm** 残差连接 + 层归一化：将子层输出与输入相加，再归一化，加速收敛、提升训练稳定性。

**归一化公式**：对向量x，计算 **γ · (x - μ) / σ + β**，其中μ和σ为均值和标准差，γ和β为可学习参数。

**内部协变量偏移（Internal Covariate Shift）**：各层激活值分量数值范围差异大时，模型权重学习困难；归一化将激活值拉到稳定范围。

**PostNorm vs PreNorm**：
- 原始Transformer：先Add后Norm（PostNorm，即在残差相加之后再归一化）
- 现代模型：先Norm再进入子层（PreNorm，即在残差相加之前就归一化）——现在主流做法

**BatchNorm vs LayerNorm**：
- BatchNorm：在Batch维度上归一化（即不同样本同一特征），依赖Batch统计量，训练/推理行为不一致
- LayerNorm：在单个样本内归一化，行为稳定——Transformer中更常用

**RMSNorm（Root Mean Square Normalization）**：
仅用 **x / RMS(x)** 归一化（去掉均值），只学习γ（省去β参数）。收敛性质相近，但参数量更少、计算更快。

---

### 00:50:39 Sparse Attention

**问题**：标准Self-Attention复杂度为 **O(N²)**，N为序列长度，计算量极大。

**滑动窗口注意力（Sliding Window Attention）**：
每个Token只与相邻W个Token交互（局部注意力），而非全连接。

- 实现上利用tiling等技巧避免真的构造完整N×N矩阵
- Mistral等模型在每层使用滑动窗口，但Token可通过多层堆叠间接关注远距离Token——类似于CNN的感受野（Receptive Field）
- 多层局部注意力的叠加可以指数级扩大有效感受野：第k层Token可关注约 k·W 个Token

**与CNN的类比**：类比计算机视觉中卷积神经网络的感受野概念——单层局部注意力受限，多层叠加后远距离信息得以流通。

**现代实践**：某些层局部注意力 + 某些层全局注意力交替使用，具体配置因模型而异，无固定recipe。

---

### 00:55:38 Sharing Attention Heads

**核心动机**：Key和Value在解码时需要反复使用（每次生成新Token都要Attend to所有历史Token），形成KV Cache。若共享K/V投影矩阵，可显著节省内存。

**三种策略（按共享程度从低到高）**：

| 模式 | Query投影 | Key投影 | Value投影 | 备注 |
|------|-----------|---------|-----------|------|
| **MHA**（标准多头注意力） | H个独立 | H个独立 | H个独立 | 原始Transformer做法 |
| **GQA**（分组查询注意力） | H个独立 | G个共享（G=H/组大小） | G个共享 | LLaMA等主流模型采用 |
| **MQA**（多查询注意力） | H个独立 | 1个共享 | 1个共享 | 最激进，内存占用最小 |

**为什么只共享K/V不共享Q**：Q负责"问"相似性问题，需要多样性；K/V是"答"，被反复复用，共享可节省缓存。

**GQA是当前主流**：在内存节省和模型质量之间取得良好平衡，大多数现代LLM采用。

---

### 01:02:42 Transformer-Based Models

**三大架构范式**：

1. **Encoder-Decoder（原始Transformer）**：T5家族（Text-to-Text Transfer Transformer）
   - 目标函数：Span Corruption（替换连续Token为哨兵Token，Decoder重建）
   - MT5：多语言版本；ByT5：Tokenizer-free，直接操作Byte级别（词汇表=256）

2. **Encoder-Only（仅Encoder）**：BERT系列，用于分类任务
   - 丢弃Decoder，仅用Encoder堆叠
   - 无生成能力，但适合各种分类任务

3. **Decoder-Only（仅Decoder）**：现代LLM主流架构（如GPT、LLaMA）
   - 丢弃Encoder和Cross-Attention
   - 每层只有Masked Self-Attention + FFN
   - 简化为最简形式 + 最大计算预算投入解码器
   - Next Token Prediction目标最简单、最易规模化

**为何Decoder-Only崛起**：计算预算最佳投资方向是让解码器更强；Next Token Prediction最简单且Scaling效果最好；与构建聊天助手/助手类应用高度对齐。

---

### 01:11:38 BERT Deep Dive

**BERT = Bidirectional Encoder Representations from Transformers**

**核心特性**：仅用Encoder，因此每个Token可以真正Attend to序列中所有其他Token（无Mask限制），获得真正的双向上下文表示——这是与GPT（单向）的本质区别。

**与Elmo的对比**：
- Elmo（同年）也是双向上下文的BiLSTM，但因RNN的递归性难以规模化
- BERT赶上Transformer浪潮，Elmo被掩盖——论文名字均为Sesame Street角色（有趣的文化梗）

**输入表示（三重Embedding相加）**：
1. **Token Embedding**：WordPiece分词器，约30k词汇表
2. **Position Embedding**：同Transformer，可学习或固定
3. **Segment Embedding**：区分句子A/句子B（仅两个可学习向量）——服务于NSP任务

**特殊Token**：
- **[CLS]**（Classification）：序列开头的占位Token，其输出Embedding携带整个序列的双向聚合信息，用于分类任务
- **[SEP]**（Separator）：句子分隔符

**预训练双目标**：

1. **MLM（Masked Language Model）**：随机Mask 15% Token
   - 80%替换为[MASK]
   - 10%替换为随机词（增加鲁棒性）
   - 10%保持不变（防止预训练/微调分布不一致）
   - 预测被Mask的Token，需要看到左右双向上下文——这是BERT学到的核心

2. **NSP（Next Sentence Prediction）**：判断句子A和句子B是否连续
   - 50%为真实连续句子对，50%为随机配对
   - 二分类任务，CLS token输出接线性层判断

**为什么需要NSP**（后来被RoBERTa质疑）：NSP被假设能学到句子间关系（如QA任务中的句子匹配），但后续研究显示其收益存疑。

**模型规模**：BERT_BASE（L=12隐藏层，H=768，Attention Heads=12）约1.1亿参数；BERT_LARGE更大。

---

### 01:33:24 BERT Finetuning

**两阶段范式**：

**阶段1 - 预训练**：在大规模无标注文本上通过MLM + NSP学习通用语言表示

**阶段2 - 微调**：
- 冻结预训练权重，在下游任务上只训练新增的分类头（线性层）
- 也可以联合微调（部分/全部参数一起训练），但计算成本高

**分类头设计**：
- **序列级分类**（情感分析等）：只取CLS token的输出Embedding，接线性层
- **Token级分类**（QA答案边界检测、NER等）：每个token输出各自接一个FFN，分别预测开始/结束位置

**CLS token的特殊性**：通过Self-Attention，所有token的信息都已汇聚到CLS的输出Embedding中——它是一个天然的序列级聚合表示。

**为何丢弃其他Embedding**：分类任务只需一个聚合表示，CLS就是为此设计；Token级任务才需要各token的独立表示。

---

### 01:43:30 Extensions of BERT

**DistilBERT（蒸馏）**：

引用Hinton、Vapnik、Dean等人的观点："模型输出的软分布（soft targets）包含了几乎所有知识"——比硬标签更有信息量。

**蒸馏原理**：
- Teacher模型（BERT_BASE）输出软概率分布
- Student模型（更小的BERT）学习去匹配这个分布
- 损失函数：KL_divergence(Student || Teacher)，而非传统交叉熵
- 硬标签是软目标的特例（one-hot分布）

**DistilBERT结果**：层数减少一半（6层而非12层），仍保留97%性能，推理速度提升40%——蒸馏+减少层数的组合是关键。

**RoBERTa（优化预训练）**：

三个关键改进：

1. **去掉NSP**：实验证明NSP对最终性能几乎无贡献，直接移除，简化预训练目标
2. **动态Masking**：每个epoch对同一文本使用不同的随机Mask模式（而非固定Mask），增加数据多样性
3. **更大的训练数据**：显著扩大训练语料库的规模和多样性

**最终结果**：在多项基准上超越BERT，展示了预训练策略优化的重要性。

---

## 金句摘录

| 序号 | 时间戳 | 原文 | 解读 |
|------|--------|------|------|
| 1 | 00:43 | "Softmax is going to normalize it anyways. So you can think of the bias as being something that is maybe more negative for things that are far apart." | Softmax的归一化特性使得在内部添加偏置成为可能，远距离获得更负的偏置 |
| 2 | 00:47 | "Most models these days, they use RoPE, which is why it's important." | RoPE是当今主流位置编码方案 |
| 3 | 00:49 | "The intuition is that if you look at your model you have several layers in some layers your model your vector your activation to be more precise." | 层归一化解决深层网络激活值尺度不一致的问题 |
| 4 | 00:56 | "Every time you want to decode something, you need to kind of attend to all other things again and again. So we're going to see in I think next lecture that there's something called the KV cache." | K/V共享的核心动机是KV Cache的内存压力 |
| 5 | 01:02 | "Next word prediction is the simplest thing you can do and it showed it proved to wonders." | Next Token Prediction因简单而强大，是Scaling的基础 |
| 6 | 01:14 | "What we're trying to show is that the CLS token is just one token like any other. It does all its attention computation." | CLS token并非特殊魔法，只是参与正常Self-Attention的普通Token |
| 7 | 01:44 | "The soft targets contain almost all the knowledge." | 蒸馏的核心洞察：软目标比硬标签信息更丰富 |
| 8 | 01:45 | "If you reduce the number of layers by two you have a lot of gains and almost the same performance." | DistilBERT的发现：减少层数+蒸馏可近乎保留性能 |

---

## 关键数据点

| 数据点 | 值 | 说明 |
|--------|-----|------|
| 位置编码维度 | d_model | 与Token Embedding维度相同，相加时需匹配 |
| Sinusoidal频率参数 | ω_i = 10000^(-2i/d_model) | 控制各维度变化速度，低维高频、高维低频 |
| 序列长度上限（原始BERT） | 512 tokens | BERT早期版本的重要限制 |
| WordPiece词汇表大小 | 约30,000 | 原始BERT采用；Byte-level方法（ByT5）仅256 |
| MLM Mask比例 | 15%的Token | 其中80%→[MASK]，10%→随机词，10%保持不变 |
| NSP正负样本比例 | 50% / 50% | 连续句对 vs 随机配对 |
| BERT_BASE参数量 | 约1.1亿（110M） | L=12, H=768, A=12 |
| DistilBERT层数减少 | 12层→6层（减半） | 蒸馏后保留97%性能，推理速度提升40% |
| MQA极端共享 | 所有Head共享1个K/V投影 | 内存最省但可能损失表达能力 |
| GQA当前主流分组 | H/G通常为4~8 | 在内存和性能间取得平衡 |

---

## 概念层级关系

```
Transformer 架构（2017，Attention Is All You Need）
│
├── 位置编码（Position Embeddings）
│   ├── 绝对位置编码
│   │   ├── Learned Position Embedding（可学习）
│   │   └── Sinusoidal Position Embedding（固定公式）
│   │       └── 核心：cos(ω_i(m-n))，相对距离的函数
│   ├── 相对位置编码（注入Attention层）
│   │   ├── T5 Relative Position Bias（可学习桶化偏置）
│   │   ├── ALiBi（确定性线性偏置 -|m-n|）
│   │   └── RoPE ★（旋转Q/K向量，当今主流）
│   │       └── 旋转矩阵 → cos(ω_i(m-n)) 自然涌现
│   │
├── 层归一化（Layer Normalization）
│   ├── PostNorm（原始Transformer：先Add后Norm）
│   ├── PreNorm（现代主流：先Norm再进子层）
│   └── RMSNorm（只保留γ，去掉β，参数量更少）
│
├── 注意力机制（Attention）
│   ├── MHA（标准多头注意力）——原始Transformer
│   ├── MQA（多查询注意力）——全部Head共享K/V
│   └── GQA（分组查询注意力）★——现代LLM主流
│       └── 内存节省 + 表达能力平衡
│
├── 稀疏注意力（Sparse Attention）
│   └── Sliding Window Attention（局部注意力）
│       └── 多层叠加 → 有效感受野指数扩展
│
└── 模型架构变体
    ├── Encoder-Decoder（T5家族）
    │   └── Span Corruption目标函数
    ├── Encoder-Only ★（BERT系列）
    │   ├── MLM（双向语言模型）
    │   ├── NSP（下一句预测，后被RoBERTa质疑）
    │   ├── WordPiece分词器
    │   ├── Segment Embedding
    │   └── 预训练 + 微调两阶段范式
    │       ├── DistilBERT（蒸馏压缩）
    │       └── RoBERTa（去掉NSP + 动态Mask + 更大数据）
    └── Decoder-Only（现代LLM主流）
        └── Masked Self-Attention（三角Mask）
        └── Next Token Prediction目标
```

---

## 主题分类标签

`#Transformer架构` `#位置编码` `#RoPE` `#ALiBi` `#Sinusoidal编码` `#层归一化` `#RMSNorm` `#PreNorm` `#注意力近似` `#MHA` `#MQA` `#GQA` `#稀疏注意力` `#滑动窗口注意力` `#Encoder-Only` `#BERT` `#MLM` `#NSP` `#WordPiece` `#Segment Embedding` `#CLS Token` `#预训练与微调` `#DistilBERT` `#知识蒸馏` `#RoBERTa` `#T5` `#Span-Corruption` `#Decoder-Only` `#LLM` `#Transformer变体`
