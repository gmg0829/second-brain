---
title: "Stanford CME295 Transformers & LLMs | Autumn 2025 | Lecture 5 - LLM Tuning"
source: Stanford Online CME295
url: "https://www.youtube.com/watch?v=PmW_TMQ3l0I"
duration: "1h47m41s"
description: "本讲系统讲解 LLM 对齐技术中的偏好调优（Preference Tuning），覆盖 RLHF 框架（奖励模型、Bradley-Terry 公式、PPO 优化器及变体）、DPO（Direct Preference Optimization）算法原理及二者对比，并讨论偏好数据收集方法与 Best-of-N 策略。"
---

## 一句话核心主旨

**偏好调优的核心思想是：不给模型指定"正确答案"，而是告诉模型哪两个答案中哪个更好，从而以更稀疏的监督信号实现模型行为的对齐，且这一过程可以在监督学习框架下（DPO）而非必须在强化学习框架下（RLHF）完成。**

---

## 逐章详解

### 1. Introduction（00:00 ~ 04:50）

LLM 训练经历三个阶段：预训练（pre-training）教模型语言结构与知识；SFT（Supervised Fine-Tuning）将模型微调为专用助手；**第三阶段是偏好调优（Preference Tuning），用于对齐模型输出与人类偏好**，解决 SFT 模型虽然知道"如何说话"但输出语气、友好度、安全性可能不理想的问题。与 SFT 不同，偏好调优能够注入负向信号（告诉模型不应该生成什么）。

### 2. Preference Tuning（00:04:50 ~ 11:31）

偏好调优的核心是构造**偏好对（preference pair）**：给定同一个 prompt，模型给出一个"差"response 和一个"好"response，模型学习的不是具体输出内容，而是"对这个 prompt，我更偏好哪个 response"。这比让人类从零写一首诗更难，但比让人判断两首诗哪个更好更简单，因此数据收集成本更低、噪声更少。此外，SFT 数据分布对 prompt 类型敏感——若某类 prompt 过多会导致模型偏差，而偏好调优可以更灵活地校正行为而不引入这种偏差。LoRA 可用于降低偏好调优的参数量，与 SFT 阶段使用的方法不冲突。

### 3. Data Collection（00:11:31 ~ 17:43）

偏好数据的构建有三种范式：**Pointwise**（给每个 response 打绝对分，难点在于人类难以给出一致的绝对分数）、**Pairwise**（给两个 response 打相对偏好，最常用）、**Listwise**（给 N 个 response 排序，比 Pairwise 复杂但比 Pointwise 简单）。实践中通常采用 binary pairwise 偏好（哪个更好）。生成两个 response 的方式：同一个 prompt 以 positive temperature 送入模型两次获得不同答案；对比方式有人类评分、LLM as a judge、规则指标（Bleu/Rouge）等；也可在日志中找到不满意 response 并重写为好的版本再配对。

### 4. RLHF Overview（00:17:43 ~ 28:24）

RLHF（Reinforcement Learning from Human Feedback）将 LLM 调优建模为 RL 问题：LLM 是 agent，state 是已输入的 prompt，action 是预测 next token，policy = LLM 输出分布。RLHF 分两步：**第一步训练奖励模型（Reward Model）**，输入 prompt+response，输出一个标量分数来衡量这个 response 的好坏；**第二步用强化学习（PPO）利用奖励模型更新 LLM 策略**，使其生成高奖励输出同时不偏离 base 模型太远（防止灾难性遗忘和 reward hacking）。

### 5. Reward Model（00:28:24 ~ 29:46）

奖励模型接收 (prompt X, response Y)，输出一个标量分数。模型架构可以是 decoder-only LLM + 分类头，或 encoder-only 模型（如 BERT）投影 [CLS] token。训练数据规模通常在数万条以上。偏好数据来自人类则为 RLHF（若来自 AI 则为 RLAIF）。Reward Bench 是评估奖励模型质量的流行 benchmark。

### 6. Bradley-Terry Formulation（00:29:46 ~ 46:02）

Bradley-Terry 公式建立了偏好概率与奖励分数之间的数学关系：对于两个 response Yi 和 Yj，偏好概率 P(Yi > Yj) = σ(R(Yi) - R(Yj))，其中 σ 是 sigmoid 函数。训练目标是最大化观测到偏好数据的似然，即 minimize 负对数似然 -E[log σ(R_w - R_l)]，其中 R_w 是 winning response 的分数、R_l 是 losing response 的分数。关键洞察：训练过程是 pairwise 的，但推理时奖励模型是 **pointwise** 的——给定一个 (prompt, response) 直接输出一个标量分数，而非需要成对比较。

### 7. Reinforcement Learning（00:46:02 ~ 53:54）

强化学习阶段利用训练好的奖励模型来调优 LLM：LLM 生成完整 completion（也叫 rollout）→ 奖励模型打分 → 根据奖励更新 LLM 权重。奖励模型是 frozen 的，只更新 LLM。目标是最大化奖励，同时约束策略不要偏离 SFT base 模型太远，原因有三：base 模型已具备丰富知识（灾难性遗忘风险）；奖励模型不完美存在 reward hacking 风险（优化过度导致实际目标背离）；训练不稳定性。奖励信号比 SFT 稀疏得多（SFT 每个 token 都有监督，RL 只在 completion 结束时得到一个信号）。

### 8. PPO（00:53:54 ~ 57:56）

PPO（Proximal Policy Optimization）是核心 RL 算法，其命名源于"近端"约束——不让策略在每次更新中变化太大。PPO loss 包含两部分：**奖励项**（最大化 advantage）和 **KL 散度惩罚项**（限制当前策略偏离 reference SFT 模型）。KL 散度衡量两个概率分布的差异，始终 ≥ 0，当两分布相等时等于 0。PPO 需要同时维护：当前策略模型、value function（用于 advantage 估计）、奖励模型、reference 模型——共四个模型。

### 9. Advantage, Value Function（00:57:56 ~ 01:03:39）

实际优化的不是原始奖励 R，而是 **advantage** A = R - baseline，即当前输出比"平均水平"好多少。使用 baseline 能减少方差、加速训练。Value function 是一个 token 级别的回归模型，输入 (prompt + partial generation)，预测若按当前策略继续生成最终能获得的累积奖励。Value function 与策略联合训练。Advantage 通过 Generalized Advantage Estimation（GAE）公式估算，详细公式超出课程范围，可参考 High-dimensional continuous control using generalized advantage estimation 论文。

### 10. PPO Variants: Clip, KL-penalty（01:03:39 ~ 01:16:20）

PPO 有两个主要变体。**PPO-Clip**：引入概率比率 r(θ) = π_θ(a|s) / π_{old}(a|s)（当前策略 vs 上一迭代策略的概率比），对 r(θ) 做 clipping 来防止单次更新过大。正 advantage 时鼓励增加该 action 概率但 clip 到 1+ε 上方使其不会无限增加；负 advantage 时鼓励降低概率但 clip 到 1-ε 下方使其不会无限降低。**KL Penalty（REMAX 等）**：用 β × KL(π_θ || π_ref) 替代 clip 项，直接惩罚偏离 reference 模型的行为。现代实践经常混合两者。需要区分"old policy"指的是上一轮 RL 迭代的模型，而非最终的 reference 模型（SFT model）。

### 11. Challenges（01:16:20 ~ 01:19:58）

RLHF 面临多重挑战：两阶段 pipeline 存在依赖（reward model 有问题就得从头重来）；超参数多（β、ε、GAE 的 λ/γ 等）且调参困难；训练不稳定；缺乏像 cross entropy 那样直观的监控指标（只能看平均奖励）；需要强制模型进行 exploration 以保证生成多样性——若每次生成结果太相似则无法学到有效偏好信号。此外，对不熟悉 RL 的工程师来说引入门槛高。

### 12. On-policy vs Off-policy（01:19:58 ~ 01:22:43）

**On-policy** 指训练数据来自当前正在更新的策略（PPO 是 on-policy）——模型自己生成数据、自己学习；**Off-policy** 指训练数据来自其他策略生成（如 DPO 在这方面更接近传统 SFT）。这是 RLHF 与 SFT 的本质区别之一：SFT 使用固定数据集，不要求模型自生成数据。

### 13. Best-of-N（01:22:43 ~ 01:29:47）

对于不想承受 RL 复杂度的团队，Best-of-N（也叫 Bun）是一种推理时策略：给定 prompt，用 SFT 模型生成 N 个 completion，将每个 completion 送入奖励模型打分，返回得分最高的那一个。优点是绕过 RL 训练，缺点是**将计算成本转移到推理阶段**——需要生成 N 次、查询奖励模型 N 次，当 serving 流量大时成本急剧上升。标度的相对顺序在 Best-of-N 中不影响结果（缩放后最高分仍是最优），但缩放本身在 RL 的 loss 函数中才起作用。

### 14. DPO（01:29:47 ~ 01:47:41）

**DPO（Direct Preference Optimization）** 将 preference tuning 从 RL 框架转变为纯监督学习框架。其核心思想是从 PPO 目标函数出发，通过解析求解最优策略 π* 的表达式，发现 reward 可重新表达为 policy 的函数，从而将整个目标化为仅含 β 和 π_θ（当前策略）的函数。Loss 形式为 -E[log σ(β log(π(y_w|x)/π_ref(y_w|x) / β log(π(y_l|x)/π_ref(y_l|x)))]，本质是 Bradley-Terry 公式在 reward 被 policy 替换后的等价形式。**优势**：不需要 reward 模型、不需要 value function、不需要多个模型副本（只需 policy + frozen reference），训练是标准的监督学习流程。**缺点**：存在 distribution shift——直接用 preference pairs 做 SFT 风格优化并不完全等同于模型在训练分布上的真实行为，性能略逊于 PPO（PPO 在 benchmark 上整体优于 DPO）。Beta 参数通常取 0.1 量级。论文标题为 "Your Language Model is Secretly a Reward Model"，因为从 DPO loss 反推出来的"reward"直接是 policy 的函数。

---

## 金句摘录

| # | 时间戳 | 原句（英） | 中文翻译 |
|---|--------|-----------|---------|
| 1 | 00:12:10 | "Preference tuning is not the answer to everything. Maybe it's better sometimes to just check your SFT data set for some issues." | 偏好调优不是万能药。有时候先检查 SFT 数据集的问题会更好。 |
| 2 | 00:24:30 | "SFT is all about teaching the model about what it should predict but it does not teach the model about what it should NOT predict." | SFT 教模型应该预测什么，但不教模型不应该预测什么。偏好调优可以注入这种负向信号。 |
| 3 | 00:45:20 | "We want to maximize rewards but then without going too far from the initial model." | 我们希望最大化奖励，但不能让模型偏离初始模型太远。 |
| 4 | 01:13:30 | "Reward hacking is when you optimize too much for a metric that is imperfect, and you can maximize the rewards but not fulfill what you actually want." | Reward hacking 是指你过度优化一个不完美的指标，可以最大化奖励但实际目标却没有达成。 |
| 5 | 01:38:15 | "Your language model is secretly a reward model." | 你的语言模型本质上就是一个奖励模型（DPO 论文核心洞察）。 |
| 6 | 01:45:30 | "If you want to get a quick preference tuning that shows good results but maybe not the best, DPO is your friend. If you're an expert at RL, PPO might be a better way." | 如果你想要一个快速展示良好效果的偏好调优方法，DPO 是你的朋友。如果你是 RL 专家、追求极致性能，PPO 可能是更好的选择。 |

---

## 关键数据点

| 数据点 | 内容 |
|--------|------|
| RLHF 训练数据规模 | 通常至少 10 万条 preference pairs |
| KL 散度符号 | KL(P‖Q) ≥ 0，当且仅当 P=Q 时等于 0 |
| KL 散度证明方法 | Jensen 不等式 |
| Beta 参考值 | DPO 中 β 通常取 ~0.1 量级 |
| Epsilon (PPO-Clip) | 控制策略更新幅度的超参数 |
| DPO 模型数量 | 仅需 2 个（policy + reference），RLHF 需要 4 个 |
| Best-of-N 延迟问题 | 即使有无限预算并行生成，仍需等待最慢的那一次，latency 分布右偏导致用户体验不确定性 |
| Reward Model 架构选择 | 主流使用 decoder-only LLM + classification head（BERT/encoder 方案也有人用） |

---

## 概念层级关系

```
LLM Tuning
├── Pre-training
│   └── 教模型语言结构、代码、知识（预测下一个token）
├── SFT (Supervised Fine-Tuning)
│   ├── 教模型具体行为（给定prompt应生成什么）
│   ├── 无法注入负向信号
│   └── LoRA 可用于参数高效微调
└── Preference Tuning（第三阶段）
    ├── 目标：使模型输出对齐人类偏好
    ├── 数据：Pairwise preference pairs（好/坏 response 对）
    ├── 方法一：RLHF
    │   ├── Step 1: 训练 Reward Model（Bradley-Terry 公式）
    │   └── Step 2: 用 PPO 最大化 advantage + KL 惩罚
    │       ├── PPO-Clip：clip 概率比
    │       └── KL-Penalty：β × KL divergence
    │       └── 需要：policy + value function + reward model + reference（4个模型）
    │   ├── 方法二：Best-of-N（推理时策略）
    │   │   └── 生成N次 → 奖励模型打分 → 返回最高
    │   └── 方法三：DPO（直接偏好优化）
    │       ├── 从 PPO 目标解析推导最优策略
    │       ├── 发现 reward 可表达为 policy 的函数
    │       ├── Loss = -E[log σ(β log ratio 差值)]
    │       └── 仅需 2 个模型（policy + reference），纯监督学习
    └── 核心洞察：
        ├── Bradley-Terry：P(Yi>Yj) = σ(Ri - Rj)
        ├── Advantage = R - baseline（减少方差）
        ├── Reward hacking：过度优化不完美指标
        └── "你的语言模型就是一个奖励模型"
```

---

## 主题分类标签

`#LLM-tuning` `#Preference-Tuning` `#RLHF` `#DPO` `#Bradley-Terry` `#PPO` `#KL-Penalty` `#Reward-Model` `#Best-of-N` `#On-policy-vs-Off-policy` `#Advantage-Estimation` `#Reward-Hacking` `#Alignment` `#Stanford-CME295` `#LLMs`