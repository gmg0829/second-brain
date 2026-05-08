# Stanford CME295 Transformers & LLMs | Autumn 2025 | Lecture 9 - Recap & Current Trends

> **视频来源**: Stanford Online | CME295: Transformers and LLMs Autumn 2025
> **原始视频**: https://www.youtube.com/watch?v=9P8HzYzVKKs
> **讲者**: Ashin (第一部分&第二部分), Shervin (第三部分)
> **字幕整理**: AI 整理 | **分析**: AI 深度分析
> **分析日期**: 2025-05-06

---

## Table of Contents

- [课程全貌回顾](#课程全貌回顾)
  - [第一部分：九周课程复盘](#第一部分九周课程复盘)
    - [Transformer 基础](#transformer-基础)
    - [Transformer 改进技巧](#transformer-改进技巧)
    - [大语言模型 (LLM)](#大语言模型-llm)
    - [LLM 训练](#llm-训练)
    - [LLM 对齐与微调](#llm-对齐与微调)
    - [LLM 推理能力](#llm-推理能力)
    - [Agentic LLMs (RAG & Tool Calling)](#agentic-llms-rag--tool-calling)
    - [LLM 评估](#llm-评估)
  - [第二部分：2025 年趋势话题](#第二部分2025-年趋势话题)
    - [Vision Transformer (ViT)](#vision-transformer-vit)
    - [Diffusion-based LLMs](#diffusion-based-llms)
  - [第三部分：结束语与展望](#第三部分结束语与展望)
- [金句摘录](#金句摘录)
- [关键数据点](#关键数据点)
- [概念层级关系](#概念层级关系)
- [主题标签](#主题标签)

---

## 课程全貌回顾

Lecture 9 是整个课程的最后一讲，采用三段式结构：

1. **第一部分**：系统性复盘整个季度（Lecture 1-8）的核心内容
2. **第二部分**：展望 2025 年最火热的研究方向（ViT + Diffusion-based LLMs）
3. **第三部分**：讲者 Shervin 的结束语与未来展望

---

### 第一部分：九周课程复盘

#### Transformer 基础

**Tokenization（分词）**

- 将输入文本切分为原子单元（atomic units）——即 token
- 最常用的分词算法：**Subword-level Tokenizer**
  - 优势：词根（roots of words）可以被复用，降低词汇表大小
- 例子：单词 "running" 可被拆为 "run" + "ning" 两个子词 token

**Embedding（词嵌入）**

- 早期方法 Word2Vec：通过代理任务（预测中心词或上下文词）学习词向量
- **核心局限**：Word2Vec 生成的向量是**上下文无关（context-independent）**的
  - 同一个词在不同句子中拥有完全相同的向量表示
  - 无法捕捉一词多义现象

**RNN 的局限**

- RNN 具有循环结构，逐 token 处理，保留序列的内部表示
- **核心问题**：长期依赖（Long-range Dependency）——序列越长，早期 token 的信息越难保留
- 距离远的 token 信息在反向传播中容易被稀释

**Self-Attention（自注意力）**

- 核心洞察：token 可以**无视位置距离**直接相互 attend
- 三元组术语：**Query (Q), Key (K), Value (V)**
  - Query：当前位置想要查询的信息
  - Key：每个 token 携带的"索引标签"，用于与 Query 匹配
  - Value：实际携带的内容信息
- 计算流程：
  1. 计算 Q 与所有 K 的相似度（dot product + softmax）
  2. 用相似度权重对 V 做加权平均
  3. 得到最终表示

**核心公式**：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

- $\sqrt{d_k}$ 为缩放因子，防止点积过大导致 softmax 梯度消失

**Transformer 架构**

- 2017 年《Attention is All You Need》论文提出
- 两大部分：**Encoder（编码器）** + **Decoder（解码器）**
- Encoder 侧：输入序列全面 attend（双向注意力）
- Decoder 侧：带掩码的自注意力（Masked Self-Attention），防止看到未来 token
- 机器翻译任务验证了 Transformer 的卓越性能

---

#### Transformer 改进技巧

**RoPE（Rotary Position Embedding，旋转位置编码）**

- 原始 Transformer：绝对位置编码（每个位置有独立 embedding，加到 token embedding 上）
- 问题：我们关心的是 token 之间的**相对位置**，而非绝对位置
- RoPE 解决方案：对 Q 和 K 进行旋转，位置信息完全由**相对距离**决定
- 目前已被大多数现代 LLM 采用（如 LLaMA、PaLM）

**Group Query Attention（分组查询注意力）**

- Multi-Head Attention 中，K 和 V 的投影矩阵可以分组共享，减少参数量
- 平衡了计算效率与模型表达能力

**Normalization 位置**

- 原始（Post-Norm）：在每个子层之后做 LayerNorm
- 现代（Pre-Norm）：在每个子层之前做 LayerNorm
- 目前主流模型大多采用 Pre-Norm 方案

**三大模型范式（基于 Transformer 变体）**

| 模型类型 | 代表模型 | Encoder only? | Decoder only? | 特点 |
|---|---|---|---|---|
| Encoder-only | BERT | ✅ | ❌ | 适合分类、embedding 提取；不能生成文本 |
| Decoder-only | GPT 系列 | ❌ | ✅ | 自回归生成；text-to-text 范式 |
| Encoder-Decoder | T5 | ✅ | ✅ | 适合 seq2seq 任务（如翻译、摘要） |

- BERT：使用 [CLS] token 的编码向量做分类
- GPT：Decoder-only，自回归生成
- T5：同时保留 Encoder 和 Decoder

---

#### 大语言模型 (LLM)

**Decoder-only Transformer**

- 现代 LLM 本质上是**仅解码器（Decoder-only）**的 Transformer
- 核心任务：**预测下一个 token（Next Token Prediction）**

**MoE（Mixture of Experts，混合专家）**

- 背景：LLM 参数规模庞大，每次前向传播是否需要激活全部参数？
- MoE 思想：**稀疏激活**——对于每个输入，只激活部分 Expert（FFN）
- 实现：Gate 机制（门控网络）决定哪个 Expert 处理哪个 token
- Token 级别的路由粒度：
  - 允许不同 token 被路由到不同 GPU，实现计算并行
  - 不同 Expert 可放置在不同硬件上
- 典型应用：Mixtral 8x7B、DeepSeek-MoE

**采样策略与 Temperature**

- **Greedy Decoding**：选择概率最高的 token（确定性，但缺乏多样性）
- **Sampling**：从输出概率分布中采样（引入随机性）
- **Temperature**：控制分布的"平滑度"
  - Temperature → 0：分布变得"尖锐"，趋向确定性输出
  - Temperature → 高：分布变得"平滑"，趋向多样性/创造性输出

---

#### LLM 训练

**Scaling Laws（扩展定律）**

- 核心发现（2020 年 Kaplan 等人）：模型性能随**计算量（Compute）**、**数据量（Dataset Size）**、**参数量（Parameters）**增加而提升
- 测试损失（Test Loss）越低，性能越好

**Chinchilla 定律与"20x 规则"**

- 许多早期 LLM 存在**训练不足（Undertrained）**问题——模型参数量增长快于数据量增长
- 经验规则：要充分发挥 N 参数模型的性能，需要用 **~20N** 的 token 量训练
  - 例如：100B 参数模型 → 至少 2T tokens 训练数据

**Flash Attention**

- GPU 内存层级：HBM（大但慢）/ SRAM（小但快）
- 核心思想：最小化对 HBM（慢速内存）的读写次数
- 实现方式：将计算切分为小块，送入 SRAM 完成端到端计算后再写回
- 额外优化：**重计算（Recomputation）**——不存储中间结果，需要时重新计算，换取更少内存访问
- 优势：**精确方法**（无近似误差）+ 显著加速

**并行训练策略**

- **Data Parallelism（数据并行）**：将数据分片到多 GPU，每 GPU 有完整模型副本
- **Model Parallelism（模型并行）**：单次前向传播跨越多个 GPU，将模型不同层分配到不同设备

**LLM 训练三阶段**

| 阶段 | 名称 | 目的 | 数据 |
|---|---|---|---|
| Stage 1 | **Pre-training（预训练）** | 学会语言结构、代码模式 | 数万亿 tokens（web scale） |
| Stage 2 | **SFT（Supervised Fine-Tuning，监督微调）** | 学会"怎么做"——特定任务的行为模式 | 人工标注的 input-output 对 |
| Stage 3 | **Preference Tuning（偏好对齐）** | 学会"不要做"——注入负面信号 | 偏好数据（pairwise comparisons） |

- Stage 2 结束时：模型能做特定任务，但不知道什么不该做
- Stage 3 引入 RL 机制，利用人类偏好数据（helpfulness、safety、friendliness、tone 等维度）

---

#### LLM 对齐与微调

**LLM 与强化学习的类比**

- LLM = Policy（策略）
  - 输入 = State（当前已生成的序列）
  - 输出 Action（预测下一个 token）
  - 环境 = Token space（token 的宇宙）
- Completion = Rollout（轨迹展开）
- Reward = 人类偏好（Preference Data）

**Reward Model（奖励模型）**

- Bradley-Terry 公式：建模"输出 I 优于输出 J"的概率

$$
P(i \succ j) = \sigma(r_i - r_j)
$$

- 训练方式：**Pairwise**——输入两个输出，标注哪个更好
- 推理时：只输入单个输出，预测其 score $R_A$
- 注意：训练时 pairwise，推理时 single（即给一个输出打总分）

**PPO 算法（Proximal Policy Optimization）**

- 经典 RL 算法，用于 LLM 偏好对齐
- 需要额外训练 **Value Function（价值函数）**
  - 作用：预测"如果遵循当前策略，未来的总奖励是多少"
  - 提供相对基准，让 advantage 估计更稳定
- Generalized Advantage Estimation (GAE)：结合 reward 预测和 value 预测计算 advantage
- Loss 函数设计：最大化 reward + 与 reference model（防止模型偏离 SFT base 太远）+ KL 约束（防止每次迭代更新过大）

**Reward Hacking 问题**

- Reward 是 imperfect 的——模型可能找到"作弊"方式刷高 reward 而非真正对齐
- Reference model 约束是防止 reward hacking 的关键正则化手段

**GRPO 算法（Group Relative Policy Optimization）**

- 2024-2025 年崛起，成为推理模型训练的主流算法
- 对比 PPO 的关键差异：

| 方面 | PPO | GRPO |
|---|---|---|
| Value Function | 需要单独的 value 网络 | **不需要**（用采样结果做相对估计） |
| Reward 估计 | 依赖 learned value function | 采样多个 completion，用公式计算相对 reward |
| 计算开销 | 高（需维护和训练 value network） | 低（仅需 policy model + reference model） |

- GRPO 核心：对采样的多个 completion 两两比较 reward，构造相对 advantage
- 最适合场景：**可验证奖励（Verifiable Reward）**——如数学题（答案唯一），无需训练 reward model

**GRPO 的 Length Bias（长度偏差）问题**

- GRPO 原版 loss 有归一化项，会对短回答中的错误 token 惩罚更重
- 后果：模型学会用"更长但错误的回答"来规避惩罚 → 输出越来越长
- 修复方案：DR-GRPO（移除归一化项）、DAPO（另一种 variance 控制方法）

---

#### LLM 推理能力

**Chain of Thought（CoT，思维链）**

- 核心思想：让 LLM **先输出推理链，再输出最终答案**
- 源于 Lecture 3 的 prompting 技术——通过 few-shot prompting 激发模型逐步推理
- 效果：显著提升模型在数学、逻辑等复杂任务上的表现

**推理模型训练（Lecture 6）**

- 核心方法：使用 Lecture 5 的 RL 技术（主要是 GRPO）训练模型输出推理链
- 训练信号：使用可验证奖励（数学题有标准答案）

**Pass@k 指标**

- 衡量生成质量的指标：生成 k 个答案，其中至少有一个正确的概率
- 用于评估推理模型的可靠性和多样性

**AIME Benchmark**

- 经典数学基准，用于衡量推理模型能力
- 随训练进行，推理模型在 AIME 上的准确率持续提升

---

#### Agentic LLMs (RAG & Tool Calling)

**RAG（Retrieval-Augmented Generation，检索增强生成）**

- 背景：LLM 的知识截止于训练数据的日期（knowledge cutoff）
- RAG 核心价值：让 LLM 能够在推理时**动态获取最新/私有知识**
- 两阶段架构：
  1. **Candidate Retrieval（候选检索）**：Bi-encoder 架构，做语义搜索
     - 计算 query embedding，在预计算的文档 embedding 库中做 cosine similarity 搜索
     - 初步过滤候选文档
  2. **Ranking/Reranking（排序/重排）**：Cross-encoder 架构
     - 将 query 和 candidate document 一起喂入模型，输出精细化评分
     - 取 top-K 文档加入 prompt（Augmented 部分）
  3. **Generation（生成）**：将检索到的文档拼入 prompt，让 LLM 基于上下文生成答案

**Tool Calling（工具调用）**

- 目标：让 LLM 能够使用外部工具（API、计算器、搜索等）
- 两阶段流程：
  1. **Tool Selection**：模型决定调用哪个工具 + 传入什么参数
  2. **Execution + Feedback**：执行工具，将结果返回给 LLM，LLM 生成最终答案

**MCP 协议（Model Context Protocol）**

- Agent 工作流的通信标准协议
- 定义了工具描述、调用格式、结果回传等规范

**ReAct Agent 循环**

- Observe → Plan → Act → ... → 循环直到完成
- 模型在循环中不断根据外部反馈调整策略

---

#### LLM 评估

**传统基于规则的指标**

- BLEU、ROUGE、METEOR：依赖 n-gram 匹配，无法捕捉语义等价但表述不同的情况
- 局限性：语言的多样性使得"标准答案"思路不可行

**LLM-as-a-Judge（LLM 评测）**

- 核心流程：
  1. 输入 prompt + 待评测 response + 评估标准
  2. LLM 输出**推理过程（Rationale）** + **评分**
  3. 输出通常为二元判断（pass/fail）或等级分数
- 推理链先于评分的输出顺序本身就能提升判断质量（类似 CoT）

**LLM-as-a-Judge 的三大偏差**

| 偏差类型 | 描述 | 缓解方法 |
|---|---|---|
| **Position Bias（位置偏差）** | LLM 倾向于偏好排在前面的选项 | 两两比较时交换位置，计算平均 |
| **Verbosity Bias（冗长偏差）** | LLM 偏好更长的输出（即使质量不一定更高） | 在评估标准中明确加入"简洁性"维度 |
| **Self-enhancement Bias（自我增强偏差）** | LLM 偏好自己的输出 | 使用独立的 judge model（非被测模型） |

**Agent Evaluation 的 7 类 Failure Modes**

- 略（详见 Lecture 8 分析）

**主流 Benchmark 全景**

| 类别 | 代表 Benchmark | 衡量维度 |
|---|---|---|
| 知识 | MMLU | 跨学科知识 |
| 数学推理 | AIME | 数学竞赛题 |
| 物理 | PIQA | 物理常识推理 |
| 代码 | SWE-bench | 真实 GitHub Issue |
| 安全 | HarmBench | 对抗性安全 |
| Agent | Tau-bench | 工具使用能力 |

---

### 第二部分：2025 年趋势话题

#### Vision Transformer (ViT)

**核心问题：Transformer 能否处理非文本输入？**

- Self-Attention 的本质是：**Query 与 Key-Value 对进行匹配**，文本只是其中一种输入形式
- 将图像切分为 patches，每个 patch 就是一个"token"
- 做法（2020 年 ViT 论文）：
  1. 将图像划分为固定大小的 patches（如 16x16 像素）
  2. 每个 patch 通过线性投影得到一个向量（类似 token embedding）
  3. 加入 position embedding 保留空间位置信息
  4. 添加 [CLS] token（用于分类）
  5. 通过 Transformer Encoder 处理
  6. 取 [CLS] token 的编码向量，通过 FFN 投影到类别空间

**ViT 的惊人发现**

- 用**大量数据**训练后，ViT 性能超越传统 CNN（Convolutional Neural Network）
- 关键洞察：**Inductive Bias（归纳偏置）**的问题
  - CNN 的设计天然假设"图像局部性"——以滑动窗口方式扫描图像
  - ViT 完全放弃这种归纳偏置，允许所有 patches 相互 attend
  - 结论：足够多的数据可以让模型**自己学会**图像的局部特征

**Vision-Language Model（VLM，视觉语言模型）**

- 目标：让 LLM 能够理解和回答关于图像的问题（如 ChatGPT 的多模态能力）
- 两类主流架构：
  1. **Early Fusion（早期融合）**（更常见）：图像 token 直接和文本 token 拼接输入 LLM
     - 代表模型：LLaVA——图像 encoder + LLM，图像 token 经投影后与文本 token一起喂入 decoder
  2. **Late Fusion / Cross-Attention（晚期融合/交叉注意力）**：图像 token 不进入输入层，而是在 cross-attention 层与文本交互
     - 代表：LLaMA 3 的某些多模态方案

**Transformer 的跨领域扩展**

- Transformer 起源于机器翻译，但成功泛化到：
  - 文本（GPT、BERT 等）
  - 图像（ViT）
  - 代码（Codex、Copilot）
  - 推荐系统、语音等
- Diffusion Transformer：用于图像生成的 Transformer，将 self-attention 用于去噪过程

---

#### Diffusion-based LLMs

**Auto-Regressive Model（ARM）的局限**

- 核心特点：逐 token 生成（Next Token Prediction），严格依赖前一 token
- **Inference Time 无法并行**：生成第 N 个 token 必须等待第 N-1 个完成
- 但 Training Time 可以并行（causal mask 防止偷看未来 token）

**Diffusion 背景（来自图像生成）**

- 从噪声生成图像的自然性：
  - 噪声（高斯分布）易于采样、数学性质好
  - Michelangelo 雕像比喻："石像已在石头中，我只是凿去多余的部分"
  - 去噪 = 从噪声中恢复图像
- 两步过程：
  1. **Forward Process（加噪）**：从干净图像逐步添加噪声，直到完全变成噪声
  2. **Reverse Process（去噪）**：学习从噪声中重建原始图像（预测并去除噪声）

**文本离散的挑战**

- 图像是连续的（像素值在 0-255 或归一化后连续）
- 文本是**离散的**（token 是离散符号）
- 连续噪声不适用于离散 token 序列

**Mask as Noise（掩码即噪声）——文本的等价物**

- 核心洞察：**图像中的噪声 ↔ 文本中的 [MASK] token**
- Forward Process：逐步遮蔽（mask）输入文本中的 token，直到全部被遮蔽
- Reverse Process：学习从全 mask 序列中逐步重建原始 token

**Masked Diffusion Model（MDM）/ Diffusion-based LLM（DLLM）**

- 训练目标：给定 masked 序列，学会预测被 mask 掉的 token
- 推理时：从全 mask 序列出发，逐步 unmask（去噪）
- 优势：
  1. **解码并行性**：整个输出序列可以在少数几步 diffusion 步骤内同时生成
  2. **Fill-in-the-Middle（FIM）友好**：能同时填补序列中间的内容（传统 AR 很难做到）

**Diffusion LLM 的速度优势**

- AR 模型：生成 N 个 token 需要 N 次前向传播（每个 token 一次）
- Diffusion 模型：只需固定的 D（D << N）次前向传播（如 D=10-20）
- 实测加速：**最高可达 10x 加速**（尤其在长输出场景，如代码生成）
- 代码生成场景受益明显：低延迟对用户体验影响大

**Diffusion LLM 的现状**

- 早期性能不如 SOTA AR 模型，但正在快速追赶
- 挑战：如何将 CoT 等技术适配到 diffusion 框架
- 代表工作：MDM（Masked Diffusion Model）、LADA（Large Language Diffusion with Masking）

---

### 第三部分：结束语与展望

**跨模态的知识迁移**

- 图像 → 文本：Diffusion 思想被引入文本生成
- 文本 → 图像：ViT 证明了 Transformer 替换 CNN 的可行性
- 跨模态 trick 迁移：RoPE 被扩展到 2D 形式（用于图像和多模态场景）
- DeepSeek OCR：证明图像 patch token 的表征能力极强（emoji 就是例子）

**仍在快速迭代的设计决策**

- **Optimizer**：AdamW 仍为主流，但新的 muon optimizer 正在崛起（Muon + MuonClip）
- **Normalization**：LayerNorm → RMSNorm（减少参数量）
- **Attention 变体**：Group Query Attention 被广泛采用，各层可以使用不同的 attention 配置
- **Activation Functions**：ReLU → GeLU / SwiGLU
- **架构超参数**：Layer 数、Head 数、FFN 维度等尚无定论，每篇论文都有自己的设计

**数据挑战：LLM 生成内容的污染**

- 互联网内容正在被 LLM 生成的数据侵蚀（"80% 的搜索结果都是 LLM 生成的"）
- 后果：**Model Collapse**——LLM 生成内容的多样性下降，导致训练信号退化
- 解决方案：Data Curation + Mid-training 阶段（pre-training 后增加一个 mid-training 用更高质量数据）
- 新范式：Pre-training → **Mid-training** → Fine-tuning（三阶段训练）

**未来研究方向**

- **Pareto Frontier（帕累托前沿）**：在性能与成本之间寻找最优平衡
- **Small Language Models（SLM）**：小而精的模型，专为特定任务优化，成本更低
- **硬件协同设计**：Transformer 的核心操作（QK^T）不是单纯的矩阵乘法——Flash Attention 证明了理解硬件特性对优化的重要性
  - 模拟信号/脉冲神经网络：所有计算作为硬件物理特性的副产物（Kirchhoff 定律），极低延迟+极低能耗

**尚未解决的核心挑战**

- **Continuous Learning（持续学习）**：当前 LLM 权重固定，RAG/Tool Calling 只是补救措施
- **Hallucination（幻觉）**：LLM 本质是"预测下一个 token"，而非"将陈述映射到事实"——幻觉是架构设计的固有局限
- **Personalization（个性化）**
- **Interpretability（可解释性）**
- **Safety（安全）**

**持续学习的资源推荐**

- **论文归档**：arXiv
- **论文+代码**：Hugging Face Trending Papers（比传统arXiv更有组织）
- **社交媒体**：Twitter/X 上的 AI 研究社区（大量一手论文讨论）
- **YouTube**：
  - Yannic Kilcher（2017 年首批详解 Transformer 论文的 YouTuber）
  - Andrej Karpathy（斯坦福校友，顶级教育者）
- **课程资源**：课程配套的 Study Guide（将持续每年更新，支持多语言）

---

## 金句摘录

| # | 讲者 | 原句 | 启示 |
|---|---|---|---|
| 1 | Ashin | "The sculpture is already complete within the marble block before I start my work. It is already there. I just have to chisel away the superflous material." | Michelangelo名言——Diffusion去噪的本质：去除多余部分 |
| 2 | Ashin | "You want the LLM to not be too far from the base model which is actually already a good model. So it's a way to regularize." | KL约束防止reward hacking，让模型不要偏离SFT基础太远 |
| 3 | Ashin | "GRPO does not rely on a value model... What we're going to do instead is generate several completions and then have some formula that compares the rewards." | GRPO vs PPO的核心区别——用采样相对比较替代learned value function |
| 4 | Ashin | "We saw that if you give your model enough data then it will actually learn how to classify your images in these classes." | ViT的精髓——足够的数据可以弥补inductive bias的缺失 |
| 5 | Shervin | "80% of the first results are LLM generated." | 互联网数据污染的惊人现实 |
| 6 | Shervin | "Hallucination is in some sense a core design choice of these LLMs." | 深刻指出幻觉的本质——next token prediction不等于fact mapping |
| 7 | Shervin | "It has become quite important to know how to use them if you want to speed up everything you do in your daily life." | LLM作为效率工具的时代已经到来 |
| 8 | Shervin | "Keep doing that [asking AI about concepts during lecture]. I think it will be a growing use case." | 实时学习+AI反馈循环是最有效的学习方式 |

---

## 关键数据点

| 数据点 | 描述 | 意义 |
|---|---|---|
| **20x 规则** | N 参数模型需要 ~20N tokens 训练数据 | Chinchilla定律的实践指导（如100B参数→2T tokens） |
| **Flash Attention** | GPU SRAM (小但快) vs HBM (大但慢) | 通过最小化HBM读写实现3-4x加速 |
| **GRPO** | 无需value function，仅需policy + reference model | 大幅降低推理模型训练的计算成本 |
| **AIME Benchmark** | 数学竞赛基准 | 衡量推理模型能力的核心指标 |
| **ViT** | 2020年论文 | 证明Transformer可以在足够数据下超越CNN |
| **Diffusion LLM** | 10x 推理加速（长输出场景） | AR vs Diffusion的核心差异 |
| **D=10-20 steps** | Diffusion LLM的典型去噪步数 | 远少于典型输出的token数（如1000 tokens → 20 steps） |
| **LLaVA** | 图像token + 文本token → LLM | 早期融合VLM的代表性工作 |
| **MoE** | Sparse activation，token-level routing | 在保持质量的同时大幅降低计算成本 |
| **Temperature** | 0=最确定，高=最多样 | 控制生成多样性的超参数 |

---

## 概念层级关系

```
[Transformer 架构] (2017, Attention is All You Need)
├── Self-Attention
│   ├── Q, K, V 矩阵
│   ├── Scaled Dot-Product Attention
│   └── RoPE (Rotary Position Embedding) ← 相对位置编码
├── Encoder-only → BERT
├── Decoder-only → GPT 系列 (ARM)
│   └── MoE (Sparse FFN Experts)
└── Encoder-Decoder → T5

[LLM Training 三阶段]
├── Pre-training (Next Token Prediction, ~Trillions tokens)
├── SFT (Supervised Fine-Tuning, input-output pairs)
└── Preference Tuning
    ├── PPO (需要Value Function)
    └── GRPO (不需要Value Function, 用采样相对reward)
        ├── Length Bias → DR-GRPO / DAPO 修复
        └── 最佳场景: Verifiable Reward (数学)

[LLM 能力扩展]
├── Chain of Thought (推理链输出)
├── RAG (Retrieval-Augmented Generation)
│   ├── Bi-encoder (Candidate Retrieval)
│   └── Cross-encoder (Reranking)
├── Tool Calling / Agentic LLMs
│   ├── ReAct Loop (Observe-Plan-Act)
│   └── MCP 协议
└── Evaluation
    └── LLM-as-a-Judge
        ├── Position Bias
        ├── Verbosity Bias
        └── Self-enhancement Bias

[跨领域扩展]
├── Text → ViT (Vision Transformer)
│   └── Image Patches as Tokens
└── Diffusion → Diffusion-based LLM
    ├── Mask Token ≡ Noise
    └── Fill-in-the-Middle

[未来挑战]
├── Data: Model Collapse (LLM生成内容污染)
├── Architecture: Continuous Learning
├── Hallucination: Next Token ≠ Fact Mapping
└── Hardware: Analog Signal / Pulsed Neural Networks
```

---

## 主题标签

`#StanfordCME295` `#Transformers` `#LLM` `#Recap` `#2025Trends` `#ViT` `#DiffusionLLM` `#GRPO` `#RAG` `#ToolCalling` `#AgenticAI` `#FlashAttention` `#MoE` `#ChainOfThought` `#LLMEvaluation` `#RoPE` `#PreferenceTuning` `#SFT` `#VisionTransformer` `#MaskedDiffusion` `#ModelCollapse` `#SmallLanguageModels` `#Multimodal` `#CrossModalTransfer`

---

*本讲是 Stanford CME295: Transformers and LLMs Autumn 2025 的最后一讲（Lecture 9）。课程系统性覆盖了从 Transformer 基础 → LLM 训练 → 对齐 → 推理 → Agent → 评估的完整知识图谱，并延伸至 ViT 和 Diffusion-based LLM 等前沿方向。讲者 Ashin 和 Shervin 在结束语中鼓励学生持续关注最新研究，善用 AI 辅助学习，并在未来探索这些技术的进一步突破。*
