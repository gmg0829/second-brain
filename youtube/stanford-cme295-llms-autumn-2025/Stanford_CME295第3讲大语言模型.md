---
title: "Stanford CME295 Transformers & LLMs | Autumn 2025 | Lecture 3 - Large Language Models"
source: "Stanford Online"
url: "https://www.youtube.com/watch?v=Q5baLehv5So"
duration: "6525秒（约1小时49分钟）"
description: "本讲涵盖LLM的定义与架构、Mixture of Experts（MoE）、密集与稀疏MoE、上下文长度与温度、采样策略（greedy、beam search、top-k、top-p）、提示策略、上下文学习、链式思考、自洽性、KV cache、PagedAttention、MLA等核心内容。"
---

## 一句话核心主旨

大型语言模型（LLM）本质上是规模巨大的仅解码器（decoder-only）Transformer，通过稀疏混合专家（Sparse MoE）实现高效扩展，采用采样驱动的文本生成策略，并借助KV cache、PagedAttention、MLA等技术优化推理效率。

---

## 逐章详解

### 第一章：引言与课程安排

本次讲座由Stanford的Afshine Amidi和Shervine Amidi主讲，正式引入大语言模型（LLM）概念。讲师首先宣布幻灯片将于每周四晚发布，便于学生下载和标注。讲座是对前两讲（自注意力机制和Transformer结构）的延续与升华。

### 第二章：Transformer模型回顾

课程回顾了三类基于Transformer的模型架构：

- **Encoder-Decoder模型**（如T5）：完整保留Transformer编码器和解码器，适合输入文本输出文本的任务。
- **Encoder-only模型**（如BERT）：仅保留编码器部分，输出为语义丰富的嵌入向量，适合分类、情感抽取等任务。CLS token的嵌入被广泛用于表示整个文档。
- **Decoder-only模型**（如GPT）：仅保留解码器，移除交叉注意力（因为无编码器），是当今主流LLM的核心架构，超过90%的现代LLM均采用纯Decoder-only结构。

### 第三章：LLM的定义与规模

LLM（Large Language Model）三要素：

1. **参数量级**：数百亿至数千亿参数不等，门槛通常在10亿参数以上。
2. **训练数据量**：以token数量衡量，通常在数千亿至数万亿token量级。
3. **计算资源需求**：需要大量GPU并行计算，但近年也有针对消费级GPU的优化方案。

讲师特别指出：按照当前业界通行定义，BERT不算LLM，因为它不生成文本，只有text-to-text的模型才能称为LLM。

代表模型包括GPT、Llama（Meta）、Gemma（Google）、DeepSeek、Mistral、Qwen等，均为Decoder-only架构。

### 第四章：混合专家（Mixture of Experts, MoE）核心思想

引入核心问题：生成下一个token时，是否需要激活所有参数？答案是否定的。

**比喻**：房间里有数学家、物理学家、化学家、历史学家。问数学问题时，显然只需问数学家，而非所有人。

MoE的基本架构：
- **n个专家（Experts）**：每个专家是一个独立网络（FFN）。
- **门控网络（Gate/Router）**：决定输入应流向哪些专家。
- **输出公式**：$\hat{y} = \sum_{i} g_i(x) \cdot E_i(x)$，其中$g_i(x)$是门控输出的权重。

门控和专家联合训练，通过反向传播进行。

### 第五章：密集MoE vs 稀疏MoE

- **密集MoE（Dense MoE）**：所有专家都被激活，权重为0到1之间的概率分布，数学家权重最高，历史学家权重最低，但所有人都参与计算。
- **稀疏MoE（Sparse MoE）**：只激活top-K个专家（K通常为1或2）。大大减少计算量（用FLOPS衡量），同时保持模型容量。

关键单位：**FLOPS**（Floating Point Operations）——衡量每次前向传播的计算量。稀疏MoE相比密集MoE拥有更低的FLOPS，但能维持更高的模型容量。

### 第六章：MoE在LLM中的应用

**最佳放置位置**：前馈神经网络（FFN）。原因：FFN将d_model投影到d_ff（通常为d_model的数倍，如4096→11008），参数量约为$d_{model} \times d_{ff} \times 2$，远大于注意力层投影矩阵的规模。

**典型配置**：K=1或K=2。即每个token只经过一个专家处理，但不同层之间路由到的专家可以不同。Router是层特定的（layer-specific），每层有独立可训练的门控网络。

**路由崩溃（Routing Collapse）问题**：训练时可能导致部分专家永远不被激活。解决方案：修改损失函数，加入额外项促进概率分布均匀化：
- $f_i$：路由到专家i的token分数
- $P_i$：专家i的平均路由概率
- 超参数$\alpha$乘以专家数量，控制均匀化强度

此外还提到**Noisy Gating**技术——在门控输出上添加噪声，强制其他专家也有机会被激活，类似Dropout的思想。

### 第七章：响应生成（Next Token Prediction）

LLM的核心任务是**下一个token预测**：输入一个token序列，输出下一个token的概率分布（词汇表大小的概率向量），通过softmax函数将模型输出投影到词汇空间并归一化为概率。

### 第八章：Greedy Decoding（贪心解码）& Beam Search（束搜索）

**贪心解码**：每个时间步选择概率最高的token。问题：
1. 完全确定性——相同输入必产生相同输出，缺乏多样性
2. 局部最优不等于全局最优——当前最高概率的token序列未必产生最高概率的完整序列

**Beam Search**：维护K条最可能路径（K=beam width/beam size）：
1. 第一步选择概率最高的K个token
2. 每一步扩展所有K条路径，选择总体概率最高的K条继续
3. 最终选择对数概率总和最高的序列

**注意**：由于概率在0-1之间，序列越长累积乘积越趋近于0，因此引入长度归一化项（$\frac{1}{|T|^\alpha}$）来平衡短序列偏好。

Beam Search的局限：
1. 计算和存储开销大
2. 仍然缺乏创造性，只生成"最可能"的序列
3. 实际应用中多用于机器翻译等需要准确性的任务

### 第九章：基于采样的方法（Sampling-Based Methods）

核心思想：不选择最高概率token，而是**按概率分布采样**下一个token：

**Top-K Sampling**：只从概率最高的K个token中采样。K=4时，只取最高的4个token然后按概率采样。

**Top-P（Nucleus Sampling）**：选择累积概率刚好超过阈值P的最高概率token集合，然后在集合内采样。

两种方法都引入了随机性，使输出更具创造性和多样性。

### 第十章：温度对预测的影响（Temperature）

温度参数T出现在softmax中：$P(token_i) = \frac{\exp(x_i / T)}{\sum_j \exp(x_j / T)}$

数学分析（以最大logit $x_k$为基准因子）：
- **T→0**：分布极度尖锐，最高概率token接近1，其余接近0——输出高度确定、缺乏创意
- **T→+∞**：分布趋近均匀——输出高度多样、创意强但质量不稳定

**实践建议**：
- 想要创意写作 → 用高温度
- 想要准确、确定的回答 → 用低温度
- **T=0** 时输出完全确定（理论上是，但GPU运算顺序不同可能导致实际不完全确定）

讲师提到了一篇关于"战胜LLM推理非确定性"的前沿文章：GPU在归约不同量级的浮点数时，运算顺序会影响结果精度。

### 第十一章：引导解码（Guided Decoding）

当需要生成特定格式（如JSON）时：
- **朴素方法**：让LLM生成JSON，若无效则重复
- **引导解码**：在生成过程中实时过滤无效next token——如果已知下一个token必须是`{`，则过滤掉所有其他选项

实现方式基于有限状态机（FSM）和上下文文法（Context Grammar）技术。

### 第十二章：提示策略（Prompting Strategies）

**上下文长度（Context Length）**：现代LLM可接受从数万到数百万token不等的输入。Gemini等模型已支持百万量级上下文。

**Context Overload现象**：研究发现，当上下文长度增加时，模型在"大海捞针"（Needle in a Haystack）测试中检索信息的能力会下降，上下文中的干扰信息越多，检索能力越差。

**Prompt的四个组成维度**：
1. **上下文（Context）**：设定场景，如"你是一个可爱的泰迪熊"、"今天是10月10日"
2. **指令（Instructions）**：告诉模型要做什么
3. **输入（Input）**：具体的问题或任务
4. **约束（Constraints）**：输出格式、安全限制等隐藏要求

### 第十三章：上下文学习（In-Context Learning）

核心思想：不调权重，通过在上下文（prompt）中提供示例来"教"模型任务。

**Zero-shot**：只给任务描述和输入，不给示例。
**Few-shot**：在prompt中提供多个输入-输出示例（如泰迪熊名字和对应故事）。

**重要洞察**：提供示例（few-shot）通常能更好地引导模型，但会消耗更多token和计算。更重要的是，当模型推理能力足够强时，通过改进指令（instruction）本身可以达到甚至超过few-shot的效果——因为示例会限制模型的泛化能力。

论文引用：*Plan and Solve* —— 让模型先计划再执行，能显著提升推理表现。

### 第十四章：链式思考（Chain-of-Thought, CoT）& 自洽性（Self-Consistency）

**Chain-of-Thought**：强制模型在给出最终答案前，先输出推理过程。研究发现这对数学、逻辑任务尤其有效。好处：
1. 提升回答质量
2. 增强可解释性，便于调试（若推理过程出错，可追溯原因）
3. 是In-context Learning的自然扩展

**Self-Consistency（自洽性）**：
1. 对同一问题，采样多次生成多条不同推理路径
2. 提取每条路径的最终答案
3. 通过多数投票选择最一致的答案

实施要点：
- 所有采样并行进行（延迟≈最长路径的延迟）
- 需要在prompt中要求模型把最终答案放在末尾，便于提取
- 可用正则表达式或另一个LLM来提取答案

### 第十五章：推理优化——KV Cache

**问题**：生成第t个token时，需要让当前token attend到之前所有token。需要重复计算之前token的Key和Value。

**KV Cache解决方案**：
- 缓存所有历史token的Key和Value矩阵
- 生成新token时直接复用，不再重复计算
- 训练时用Teacher Forcing，整个序列一次前向传播，不需要KV Cache

**进一步优化**：
- **Group Query Attention（GQA）**：将H个key头和H个value头分组共享，减少存储量
- 不同注意力头独立，expert数量与注意力头数量无关

### 第十六章：PagedAttention & MLA

**PagedAttention解决的问题**：

传统做法：为每个请求预留最大上下文长度的内存（如2K），造成大量浪费（内部碎片化+外部碎片化）。

PagedAttention解决方式：将内存分块管理（每块大小16），用映射表将token位置索引到缓存块。类比操作系统的虚拟内存页表，大幅减少碎片。

**MLA（Multi-Latent Attention）**：

优化KV Cache存储体积：
1. 将高维Key和Value投影到低维潜在空间（压缩）
2. 压缩矩阵在Key和Value之间共享，甚至在所有注意力头之间共享
3. 结果：每个Transformer block每个token只需存储一个低维向量，大幅降低缓存体积
4. 额外发现：这种压缩带来的正则化效果实际上还提升了模型性能

### 第十七章：推测解码（Speculative Decoding）

用小模型（draft）快速生成多个候选token，然后将所有候选一起送给大模型（target）验证：
- 计算draft预测token的概率 $p_{draft}$ 和 target模型对该token的概率 $p_{target}$
- 若 $p_{draft} > p_{target}$ → 接受；否则按比例拒绝或接受
- 证明：基于全概率公式，推导出的边际分布与target模型分布完全一致

关键洞察：推理时是内存瓶颈而非计算瓶颈——用小模型批量生成，再一次性用大模型验证，比逐token用大模型生成更高效。

### 第十八章：多token预测（Multi-Token Prediction）

 draft模型不再是独立的小模型，而是同一大模型的多个附加预测头。
- 训练时：同时预测多个未来token
- 推理时：用附加头生成多个候选token，然后送回主头验证
- 与Speculative Decoding的关系：draft是同模型的内嵌部分，而非外部小模型

---

## 金句摘录

| 序号 | 原文 | 核心含义 |
|------|------|----------|
| 1 | "Do you really need to have all these parameters be activated during a forward pass to make a simple prediction?" | MoE的出发点——不是所有参数都需要被激活 |
| 2 | "Sparse MoE gives you lower FLOPS but you keep the capacity." | 稀疏MoE的核心价值：保持容量同时降低计算量 |
| 3 | "If you always choose the token with the highest probability, you're locally optimal, but not necessarily globally optimal." | 贪心解码的局限性 |
| 4 | "Low temperature will create a spiky distribution; high temperature will create a uniform distribution." | 温度的本质效果 |
| 5 | "Nothing in the transformer architecture is probabilistic. The only thing that is not deterministic is how you sample the next token." | Transformer本身是确定性的，随机性只来自采样 |
| 6 | "In-context learning is a bit of an overloaded term because you don't actually learn anything with respect to the weights of the LLM." | 上下文学习并非权重学习 |
| 7 | "The more tokens you add that are below 1, the more this quantity will go towards zero." | 序列概率连乘趋近于零是Beam Search需要归一化的原因 |
| 8 | "Speculative decoding: inference time is memory bound, not compute bound." | 推理瓶颈在内存而非计算 |
| 9 | "You want to do more tokens per pass. That's why you use a smaller model to draft and a larger model to verify." | 推测解码的直观动机 |

---

## 关键数据点表格

| 指标 | 数值/描述 |
|------|-----------|
| LLM参数量级 | 数十亿至数千亿参数（最低门槛约10亿） |
| 训练token量级 | 数千亿至数万亿tokens |
| 现代LLM中Decoder-only占比 | 超过90% |
| FFN中d_ff与d_model的比值 | 通常为4倍（如4096→11008） |
| MoE中典型top-K值 | K=1或K=2 |
| Sparse MoE vs Dense MoE | 更低FLOPS，保持模型容量 |
| Top-P采样阈值P | 典型值0.9左右 |
| PagedAttention块大小 | 16 tokens/block |
| MLA低秩维度 | 固定设计参数（同一模型内统一） |
| GQA组数 | 实践中选择合适的分组数量 |

---

## 概念层级关系

```
大型语言模型 (LLM)
│
├── 架构基础
│   ├── Decoder-only Transformer（去掉编码器和交叉注意力）
│   │   └── 关键层：Masked Self-Attention + FFN + Add&Norm
│   └── 纯Text-to-Text任务范式
│
├── Scaling技术：Mixture of Experts (MoE)
│   ├── Gate/Router（决定token→expert路由）
│   ├── Expert（FFN网络，每层独立）
│   ├── 密集MoE：所有专家激活
│   ├── 稀疏MoE：仅top-K激活 ← 现代LLM主流
│   ├── 路由崩溃问题 → 加入辅助损失均匀化
│   └── 训练：联合训练gate和experts
│
├── 文本生成策略
│   ├── 确定性：Greedy Decoding（选最高概率）
│   ├── 全局优化：Beam Search（维护K条最优路径）
│   └── 采样方法：Top-K / Top-P（引入随机性）
│       └── 温度T控制：T↓尖锐分布，T↑均匀分布
│
├── Prompting技术
│   ├── Zero-shot（仅指令）
│   ├── Few-shot（示例引导）
│   ├── Chain-of-Thought（强制推理过程）
│   ├── Self-Consistency（多数投票）
│   └── Prompt四要素：Context + Instruction + Input + Constraints
│
├── 推理优化
│   ├── KV Cache（缓存Keys和Values）
│   ├── Group Query Attention (GQA)（减少K/V头数）
│   ├── PagedAttention（分块管理内存，减少碎片）
│   ├── MLA（低秩压缩共享，减小KV cache体积）
│   ├── Speculative Decoding（小模型draft，大模型verify）
│   └── Multi-Token Prediction（同一模型多头预测）
│
└── 关键挑战
    ├── 路由崩溃（Routing Collapse）
    ├── Context Overload（上下文过长导致检索退化）
    └── 推理内存瓶颈（memory bound而非compute bound）
```

---

## 主题分类标签

**核心主题**：`LLM` `Transformer` `Decoder-only` `MoE` `推理优化`

**生成策略**：`Greedy Decoding` `Beam Search` `Top-K Sampling` `Top-P Sampling` `Temperature` `Speculative Decoding`

**Prompting技术**：`Zero-shot` `Few-shot` `In-context Learning` `Chain-of-Thought` `Self-Consistency`

**架构优化**：`KV Cache` `PagedAttention` `GQA` `MLA` `Multi-Token Prediction`

**理论概念**：`Routing Collapse` `Context Overload` `FLOPS` `Memory Bound` `Needle in a Haystack`