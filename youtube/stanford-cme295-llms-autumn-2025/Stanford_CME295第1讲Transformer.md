---
title: "Stanford CME295 Transformers & LLMs | Lecture 1 - Transformer"
source: "Stanford Online"
url: "https://www.youtube.com/watch?v=Ub3GoFaUcds"
duration: "1小时42分钟 (6119秒)"
description: "CME295 秋季课程第一讲，系统讲解 Transformer 架构基础。内容涵盖 NLP 背景、Tokenization、词嵌入、Word2Vec、RNN/LSTM、注意力机制、Transformer 编码器-解码器结构、多头注意力、标签平滑，并附完整前向传播示例。"
---

# Stanford CME295：Transformer 与大语言模型 · 第一讲

**课程**: CME295 Transformers & LLMs | Autumn 2025
**讲师**: Afshine Amidi & Shervine Amidi（Stanford 兼职讲师，Netflix ML 团队背景）
**录制日期**: 2025年9月26日
**视频时长**: 1小时42分钟

---

## 一句话核心主旨

> Transformer 抛弃了 RNN 的顺序依赖结构，通过**自注意力机制**让序列中任意位置的两个 token 直接建立关联，再配合位置编码、多头注意力和堆叠堆叠（stacking），实现了并行训练与并行推理，成为现代大语言模型的基石架构。

---

## 逐章详解

### 1. 课程介绍（00:00 ~ 00:03:54）

本节为开课欢迎环节。讲师 Afshine Amidi 与 Shervine Amidi 为双胞胎兄弟，均毕业于法国 Telecom Paris，随后分别前往 MIT（Afshine）和 Stanford ICME（Shervine）深造。工业经历方面，两人先后在 Uber 和 Google 共事，现同时加入 Netflix 从事大语言模型相关工作。自2021年起，二人开始以工作坊形式向公众传授 NLP 与 LLM 知识，ChatGPT 出现后（2022年）需求激增，2025年春季正式在 Stanford 以 CME295 课程形式开设，这是该课程的第二次开课。

**核心信息**: 课程面向不同背景的学习者——有志成为研究科学家或 ML 科学家的人、想用 LLM 开发个人项目的人，以及其他领域希望了解 GenAI/LLM 工作原理的人。最低 prerequisites 为：具备机器学习基础（了解模型训练和神经网络概念）以及线性代数基础（矩阵乘法等）。

---

### 2. 课程安排（00:03:54 ~ 00:09:40）

本节说明课程 logistics。课程每周五 15:30 ~ 17:20，共两个学时、两个学分，可选 letter 或 credit/non-credit 评分方式。考核方式为两次考试：期中考试（10月24日）占 50%，期末考试（12月8日那周，日期待定）占 50%，无作业。考试内容为纯概念题，无编程题。

课程资源将在每次授课后发布幻灯片和录像于课程网站，教材为《The Super Study Guide Transformer LLMs》，此外还有 VIP cheat sheet（GitHub 开源，已被翻译成多种语言）。答疑渠道包括 Canvas 和 Ed Discussion。

**关键信息**: 50% 期中 + 50% 期末，无编程题，考试内容全部为课堂概念。

---

### 3. NLP 概述（00:09:40 ~ 00:22:57）

本节建立 NLP 任务的高层分类体系，将所有 NLP 任务划分为三大类：

**分类（Classification）**
输入为文本，输出为单一预测标签。
- 情感分析（Sentiment Analysis）：判断正面/负面/中性
- 意图检测（Intent Detection）：从文本推断用户意图（如 "create an alarm" → intent = create_alarm）
- 语言检测（Language Detection）
- 主题建模（Topic Modeling）

**多标签分类（Multi-token Classification）**
输入为文本，输出为多个标签。
- 命名实体识别（NER）：标注文本中哪些词属于地名、人名、时间等实体类别
- 词性标注（POS Tagging）：标注每个词的词性（名词、动词等）
- 句法分析（Dependency / Constituency Parsing）

**生成（Generation）**
输入为文本，输出也是文本，输出长度事先未知（变长）。
- 机器翻译（Machine Translation）
- 问答系统（Question Answering）
- 摘要生成（Summarization）
- 代码生成、诗歌创作等开放式生成任务

**评估指标**讲解了分类任务的 Accuracy、Precision、Recall、F1 Score，强调当类别极度不平衡时 Accuracy 会产生误导（例如99%正类时，全预测正类的模型 Accuracy=99%，但毫无意义）。BLEU 和 ROUGE 用于翻译/生成任务的参考文本比对评估，越高越好。Perplexity（困惑度）通过模型输出的概率分布衡量模型对自身输出的"惊讶程度"，越低越好，且无需参考文本。

NLP 发展简史：80年代出现 RNN 原型，90年代有 LSTM，但受限于计算资源和数据；2013年 Word2Vec 提出可解释的词嵌入；2017年 Transformer 论文《Attention Is All You Need》发表；2020年代进入 LLM 时代，通过增大模型规模和数据量催生了现代大语言模型。

---

### 4. Tokenization（00:22:57 ~ 00:30:28）

本节讲解如何将原始文本切分为模型可处理的最小单位——Token。

**三种切分策略**

| 策略 | 方式 | 优点 | 缺点 |
|------|------|------|------|
| 任意切分（Arbitrary） | 按任意字符边界切分 | 简单 | 无语义关联 |
| 词级别（Word-level） | 按空格/标点分词 | 语义完整 | OOV 严重；同根词（如 run/runs, bear/bears）被当作完全不同 token |
| 子词级别（Subword-level） | 拆解词根（如 bear + s） | 共享词根，减少 OOV，平衡序列长度 | 序列会比 word-level 更长 |
| 字符级别（Character-level） | 逐字符切分 | 对拼写错误、大小写不敏感 | 序列极长，单字符语义难以解释 |

**OOV（Out-of-Vocabulary）问题**：词级别 tokenizer 中，训练时未见的词（unseen words）在推理时会被映射为 `<UNK>`（未知 token），这是该方法的核心缺陷。Subword 方法大幅缓解了 OOV 问题。

**词表规模参考**：单语言任务通常 tens of thousands（约2万~5万）；多语言或代码模型可达 hundreds of thousands（数十万）。

---

### 5. 词表示（Word Representation / Embeddings）（00:30:28 ~ 00:53:23）

本节讲解如何将离散的 token 转化为连续的向量表示。

**One-Hot Encoding（OHE）**
用长度为 |V|（词表大小）的向量表示每个词。如 Vocabulary = {book, soft, teddy_bear}，则 soft = [1,0,0]，teddy_bear = [0,1,0]。问题：所有向量两两正交（夹角90°），无法表示语义相似性。

**语义相似度度量**
用 Cosine Similarity（余弦相似度）衡量两个向量在 n 维空间中的方向接近程度。方向越一致 → 相似度越高；正交 → 独立；相反方向 → 负相关。Norm 不影响余弦相似度（已归一化）。

**Word2Vec（2013）**
通过代理任务（Proxy Task）从数据中学习有语义的词嵌入。核心思想：能预测上下文的词，其嵌入向量必然"知道"词的语义。

两种训练方式：
- **CBOW（Continuous Bag of Words）**：用周围词预测中心词
- **Skip-gram**：用中心词预测周围词

以 Skip-gram 为例：
1. 输入词的 one-hot 向量（维度 V）
2. 乘以权重矩阵 W（V×D），得到隐藏层向量 h（维度 D，D << V，如 D=768）
3. 再乘以 W'（D×V），通过 softmax 得到对下一个词的预测概率分布
4. 与真实下一个词的 one-hot 向量比较，计算交叉熵损失，反向传播更新 W 和 W'
5. 训练收敛后，取 W（或 W'）的行作为词嵌入表

**关键设计**：隐藏层维度 D 远小于词表 V。太大 → 计算慢；太小 → 嵌入不够丰富。实践中通常数百到数千。

**OOV 处理**：词表预留 `<UNK>` 槽位，所有未知词共享该表示。

**停止训练信号**：监控代理任务的损失函数曲线，当损失收敛（趋于平稳）时停止训练。

**停止生成信号**：模型输出 `<EOS>`（End-of-Sequence）特殊 token 时停止解码。

**维度选择**：取决于下游任务复杂度、延迟/成本约束。768 是 BERT 等模型中常见的隐藏层维度。

---

### 6. 循环神经网络（Recurrent Neural Networks）（00:53:23 ~ 01:06:47）

本节讲解 RNN 及其问题，引出对注意力机制的需求。

**RNN 基本原理**
不再逐个独立处理 token，而是维护一个隐藏状态 H（context vector），在每个时间步 t：
1. 接收当前 token 的 one-hot 向量和上一时刻的隐藏状态 H_{t-1}
2. 计算新的隐藏状态 H_t = f(H_{t-1}, x_t)
3. 输出预测（如预测下一个词）

隐藏状态 H_t 本质上是"到当前时刻为止的序列"的压缩表示。

**RNN 应用方式**
- 分类任务：取句子最后一个 token 的隐藏状态 H_last，投影到标签空间得到分类结果
- NER 任务：每个 token 的隐藏状态独立投影到标签空间
- 生成任务：用编码后的 context vector 作为解码器初始隐藏状态，逐步生成输出

**RNN 的三大缺陷**
1. **长期依赖问题（Long Range Dependencies）**：越靠前的 token 信息在不断前向传播中被"稀释"，模型难以记住远处的依赖关系
2. **梯度消失/爆炸（Vanishing/Exploding Gradient）**：反向传播时误差需要回传所有时间步，涉及多次连乘。因子 >1 → 爆炸；< 1 → 消失，导致参数更新困难
3. **顺序计算慢（Sequential Computation）**：无法并行，必须等前一个时间步算完才能算下一个

**LSTM（Long Short-Term Memory）**
通过引入 Cell State（细胞状态）C_t 提供一条"高速公路"，让远距离的信息可以直接传递，一定程度缓解了梯度消失问题。但仍未根本解决，且增加了计算复杂度。

**注意力机制（Attention Mechanism，2014）的动机**：与其让所有信息通过唯一的隐藏状态逐时间步传递，不如在解码当前词时，直接回头看源序列中任意位置的隐藏状态，建立"直接连接"。这是 Transformer 架构的直接前身。

---

### 7. 自注意力机制（Self-Attention Mechanism）（01:06:47 ~ 01:13:53）

本节是整个课程的理论核心，讲解 Transformer 的注意力思想。

**核心洞察**
摒弃序列顺序处理的思路，让每个 token 同时"看到"序列中的所有其他 token，直接建立任意两点之间的关联。这就是 **Self-Attention（自注意力）**。

**Query、Key、Value（Q、K、V）三元组**

| 符号 | 角色 | 作用 |
|------|------|------|
| **Q（Query）** | 查询 | 当前 token"在问"：我需要从其他 token 获取什么信息？ |
| **K（Key）** | 键 | 其他 token 提供的"索引标签"，用于和 Q 匹配计算相似度 |
| **V（Value）** | 值 | 其他 token 的实际信息内容，按相似度加权求和后输出 |

直觉理解：Q 就是"问题"，K 是"问题的答案索引"，V 是"答案内容"。通过 Q 和 K 的匹配程度（点积后 softmax）决定每个 V 的权重，最后对 V 加权求和得到当前 token 的新表示。

**为什么用 Q、K、V 三个投影？**
它们不是固定的，而是通过可学习的投影矩阵 W^Q、W^K、W^V 从原始嵌入变换而来。不同投影让模型能够学习不同角度的"查询/索引/内容"关系。这三个矩阵的梯度由最终损失函数反向传播得到，模型自动学习最优的表示方式。

**Self-Attention 的输出**：序列中每个 token 都得到一个**上下文相关**的表示——同一个词在不同的上下文中（如"bank"在"river bank"和"rob a bank"中）会得到完全不同的向量，解决了 Word2Vec 的上下文无关问题。

---

### 8. Transformer 架构（Transformer Architecture）（01:13:53 ~ 01:29:53）

本节讲解 Transformer 的完整编码器-解码器结构，以及各组件细节。

**整体架构：Encoder + Decoder**

```
输入文本 → [Encoder] → 上下文相关表示 → [Decoder] → 生成目标语言
           (N×)                 (N×)              (逐词生成)
```

**Encoder（编码器）**
- **Input Embedding + Positional Encoding**：将 token 转为嵌入向量，并加入位置编码（原始论文用 sin/cos 函数）告知模型 token 在序列中的位置
- **Multi-Head Self-Attention**：所有输入 token 彼此 attends to each other，每个 token 的新表示是整个序列的加权组合
- **Feed-Forward Network（FFN）**：两层全连接网络（通常内层维度是输入的4倍，如 768 → 3072 → 768），提供额外的非线性变换和表示复杂度
- Add & Norm（残差连接 + Layer Normalization）：每个子层都有跳跃连接和归一化，提升训练稳定性
- **N× 个 Encoder Block 堆叠**（原论文 N=6）

**Decoder（解码器）—— 生成目标语言**
- **Masked Multi-Head Self-Attention**：只在已生成的部分 self-attend（因果掩码），防止看到未来信息
- **Cross-Attention（交叉注意力）**：Q 来自解码器当前层，K 和 V 来自编码器的最终输出。解码器在生成每个新词时，"询问"编码器："输入序列中哪些词最重要？"
- **Feed-Forward Network**：同编码器中的 FFN
- **N× 个 Decoder Block 堆叠**
- **Linear + Softmax**：最终将解码向量投影到词表维度，用 softmax 得到下一个词的概率分布

**Multi-Head Attention（多头注意力）**
将 Q、K、V 分别投影 h 次（h = number of heads），每个 head 独立执行自注意力计算，最后将 h 个输出拼接（Concat）并再进行一次线性投影 W^O 恢复原始维度。

直观理解：类比计算机视觉中的多个卷积核——不同 head 学会捕捉不同类型的关联（如语法关系、语义相似、指代消解等）。

**Label Smoothing（标签平滑）**
传统交叉熵损失要求模型以100%概率预测目标词。但实际上下一个词往往有多个合理选择（如填空 "What a great ___" 可以填 day/lecture/book 等）。

标签平滑将硬标签（one-hot）软化为：

```
(1 - ε) × 目标词概率 + ε/V × 其他词概率
```

即让模型对目标词给出高概率但不是100%，对其他词给予小概率。这让模型更"谦虚"、更鲁棒，实践表明能提升 BLEU 等评估指标。

**三种注意力层的作用对比**

| 层类型 | Q 来源 | K,V 来源 | 作用 |
|--------|--------|----------|------|
| Encoder Self-Attention | 输入序列 | 输入序列 | 捕捉输入 token 之间的相互关系 |
| Decoder Masked Self-Attention | 已生成序列 | 已生成序列 | 保持因果性，防止信息泄露 |
| Cross-Attention | 解码器 | 编码器输出 | 根据输入序列内容指导生成下一个词 |

---

### 9. 详细示例（Detailed Example）（01:29:53 ~ 01:41:59）

本节由 Shervine 讲师执笔，给出 Transformer 前向传播的完整数值示例。

**Step 1: Tokenization**
输入句子 "A cute teddy bear is reading" 加上 BOS（Begin of Sequence）和 EOS（End of Sequence）特殊 token，切分为 subword 或 word tokens。

**Step 2: 构建 Token Embeddings 矩阵**
每个 token 乘以嵌入矩阵得到 d_model 维向量，排列成矩阵 X ∈ ℝ^{d_model × T}（T = 序列长度）。

**Step 3: 加入 Positional Encoding**
将 sin/cos 位置编码向量逐元素加到 X 上，得到位置感知的 token 表示。

**Step 4: Encoder Self-Attention（前向计算）**

1. 将 X 通过三个投影矩阵得到 Q = X W^Q、K = X W^K、V = X W^V（Q, K, V ∈ ℝ^{d_model × T}）
2. 计算注意力分数：Q K^T ∈ ℝ^{T × T}（每对 token 之间的相似度）
3. **缩放（Scaling）**：除以 √d_k（d_k = d_model / h），防止 d_k 过大时点积值过大导致 softmax 梯度接近零
4. **Softmax**：对每行做 softmax，得到注意力权重矩阵（每行和为1的概率分布）
5. **加权求和**：注意力权重 × V，得到自注意力的输出 Z ∈ ℝ^{d_model × T}

**Step 5: Multi-Head**
将 d_model 维的 Q,K,V 拆分成 h 份（每个 head 维度 d_k = d_model / h），各 head 并行执行 Step 4，将 h 个输出 Z_i 在列维度拼接，再乘以 W^O 投影回 d_model 维。

**Step 6: FFN + 堆叠**
通过 Add & Norm 后，每个 block 的输出经过 FFN（两层网络，内层维度通常为 d_model × 4）。重复 N 次 encoder block，得到编码后的上下文嵌入矩阵。

**Step 7: 解码器前向（生成下一个词）**
1. 以 `<BOS>` token 启动解码器
2. 经过 Masked Self-Attention（在解码器侧，注意力只在已生成 token 上）
3. Cross-Attention：解码器的 Q "询问"编码器输出的 K,V，生成新的上下文感知表示
4. FFN → Linear → Softmax → 词表概率分布
5. 取概率最大的 token 作为输出（如 "a"）
6. 将新 token 加入解码器输入，重复 Step 2 ~ 5，直到输出 `<EOS>` 为止

**关于 Multi-Head 为什么不学习相同表示**：模型有端到端损失函数驱动，梯度下降自然引导不同 head 收敛到不同权重（无约束但有学习目标的间接约束），实践中通常确实学到不同类型的关联模式。

---

## 金句摘录

| # | 原始语句 | 核心含义 |
|---|---------|---------|
| 1 | "LLMs are basically everywhere now." | LLM 已渗透各行业 |
| 2 | "Attention is all you need." | 注意力机制是 Transformer 的核心 |
| 3 | "King is to queen as Paris is to France." | 词嵌入捕捉语义类比关系 |
| 4 | "The meaning of the sentence is solely encapsulated into the hidden state." | RNN 的致命缺陷——信息瓶颈 |
| 5 | "Instead of processing words one at a time, what they do is they keep a hidden representation of the sentence so far." | RNN 的本质思想 |
| 6 | "The attention mechanism tries to have a direct link between what we're trying to predict and something from the past." | 注意力机制的核心洞察 |
| 7 | "The key is there for you to figure out which one is most similar to the query and the value is the actual value that is associated with that." | Q/K/V 三元组的核心语义 |
| 8 | "Label smoothing says: predict this word, but there's a chance it's not this word." | 标签平滑的直觉解释 |
| 9 | "You want tokens that mean the same to have a high similarity, and tokens that are not similar to be orthogonal." | 我们对词嵌入的期望性质 |
| 10 | "In NLP, when you want to predict what comes next, there is typically more than one way." | 标签平滑存在的合理性 |

---

## 关键数据点表格

| 数据项 | 数值/内容 | 备注 |
|--------|----------|------|
| 视频时长 | 1小时42分（6119秒） | 2025年9月26日录制 |
| NLP 任务分类 | 3大类 | Classification / Multi-token / Generation |
| 词表大小（单语言） | tens of thousands（约2万~5万） | |
| 词表大小（多语言/代码） | hundreds of thousands（10万+） | |
| Word2Vec 隐藏层维度 | 通常 D = 768（或其他数百~数千值） | 远小于词表 V |
| BLEU/ROUGE | 越高越好 | 需要参考文本 |
| Perplexity | 越低越好 | 无参考文本，衡量模型"惊讶度" |
| Transformer 论文发表 | 2017年 | 《Attention Is All You Need》 |
| Transformer 原型 N | N = 6（编码器/解码器各堆叠6次） | 原论文设定 |
| 多头注意力头数 h | 典型值 8/12/16 | d_k = d_model / h |
| FFN 内层维度 | d_model × 4（如 768 → 3072 → 768） | 提供非线性复杂度 |
| 位置编码方式 | sin/cos 函数（原始论文） | 无需学习 |
| 标签平滑 ε | 通常 0.1 | (1-ε) 给目标词，其余 ε/V |
| 注意力缩放因子 | √d_k（或 √d_model） | 防止点积过大导致 softmax 梯度消失 |
| 解码停止信号 | `<EOS>` token | 出现即停止生成 |
| 课程考核 | 50% 期中 + 50% 期末 | 无编程题，无作业 |
| 期中考试日期 | 2025年10月24日 | 第5周 |

---

## 概念层级关系

```
NLP 任务
├── Classification（单一标签）
├── Multi-token Classification（多标签/序列标注）
└── Generation（文本→文本，变长输出）
    ├── Machine Translation
    ├── Question Answering
    └── Summarization

Tokenization 策略
├── Word-level（高 OOV 风险，序列短）
├── Subword-level（推荐方案，平衡 OOV 与序列长度）
└── Character-level（低 OOV，序列极长，语义难解释）

词表示方法
├── One-Hot Encoding（OHE）→ 正交无语义
└── Learned Embeddings（Word2Vec）→ 语义丰富
    ├── CBOW（上下文 → 中心词）
    └── Skip-gram（中心词 → 上下文）

序列建模演进
├── RNN（顺序处理，梯度消失，难以并行）
│   └── LSTM（Cell State 缓解长期依赖）
└── Transformer（并行处理，直接全局注意力）

Transformer 核心机制
├── Self-Attention（Q,K,V 三元组）
│   ├── Scaled Dot-Product Attention：softmax(QK^T/√d_k)V
│   └── Multi-Head Attention（多个 head 并行，Concat + W^O）
├── Position Encoding（sin/cos，无需学习）
├── Feed-Forward Network（两层，维度放大4倍）
└── Add & Norm（残差连接 + Layer Norm）

Transformer 完整架构
├── Encoder（N × Block）
│   ├── Multi-Head Self-Attention
│   └── Feed-Forward
└── Decoder（N × Block）
    ├── Masked Multi-Head Self-Attention（因果）
    ├── Cross-Attention（Q 解码器，K,V 编码器）
    └── Feed-Forward

训练技巧
├── Label Smoothing（软化 one-hot 标签）
└── BOS/EOS 特殊 Token（控制解码起止）
```

---

## 主题分类标签

```
#NLP #Transformer #Self-Attention #Word2Vec #RNN #LSTM
#Tokenization #Embedding #PositionalEncoding #MultiHeadAttention
#Encoder-Decoder #LabelSmoothing #Perplexity #BLEU #ROUGE
#CME295 #Stanford #LLM #大语言模型 #注意力机制
#机器学习 #深度学习 #自然语言处理 #词嵌入
```
