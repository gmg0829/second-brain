# Stanford CME295 Transformers & LLMs | Autumn 2025 | Lecture 6 - LLM Reasoning

> **课程代码**：CME 295
> **讲师**：Afshine Amidi & Shervin Minaee
> **视频URL**：https://www.youtube.com/watch?v=k5Fh-UgTuCo
> **主题**：LLM Reasoning——如何让大语言模型学会"先思考再回答"

---

## 课程一句话总结

本讲揭示了**推理模型（Reasoning Model）**的本质：不是更强大的知识库，而是学会了**将复杂问题拆解为多步推理链**的大模型。训练核心不是SFT，而是**强化学习（GRPO）**，通过可验证的奖励信号（答案是否正确）让模型自己学会思考。

---

## 章节详解

### 1. Introduction——为什么要研究推理模型？

#### 从vanilla LLM到Reasoning Model的跨越

lecture 4讲预训练（next-token prediction），lecture 5讲偏好对齐（PPO/RLHF），本讲是这两者的自然延伸。

**Vanilla LLM的三大弱点：**

| 弱点 | 描述 | 例子 |
|------|------|------|
| 有限推理能力 | 只会token补全，不具备真正的多步推理 | 复杂数学题会迷路 |
| 知识有截止日期 | 预训练数据是静态的 | 2024年选举结果无法回答 |
| 只说不做 | 无法执行动作 | 无法帮你下单 |
| 评估困难 | 自由文本输出难以用传统BLEU/ROUGE衡量 | 没有标准答案可对比 |

**推理模型要解决的问题**：给定一个复杂问题（如数学题、代码调试），模型需要先输出推理链（think），再给出最终答案（answer）。

#### Chain of Thought的直觉

- 核心思想：**让模型分步思考**，而非直接给答案
- 预训练阶段模型学的是"如何让回答听起来 plausibly correct"，对于难题，模型很难蒙对
- 思维链的本质：**将复杂问题分解为可处理的子问题**，每个子问题都更可能在训练数据中出现过

```
问题：2020年出生的熊，2025年多大？
→ 需要知道"今年是2025年"（上下文）
→ 计算：2025 - 2020 = 5岁
→ 答案：5岁
```

**推理的本质**：多步推理过程 + 最终可验证的答案

### 2. Reasoning Models时间线

| 时间 | 事件 | 意义 |
|------|------|------|
| 2024年9月 | OpenAI发布o1-preview | 首个推理模型，震惊社区 |
| 2024年12月 | Google Gemini 2.0 Flash Thinking | 跟进推理能力 |
| 2025年1月 | DeepSeek R1论文发布 | **关键突破**：用纯RL方法（GRPO）匹配OpenAI推理水平，方法完全公开 |
| 2025年起 | XAI、Anthropic、Mistral等纷纷加入 | 推理能力成为模型标配 |

### 3. Benchmarks——如何量化推理能力？

#### 3.1 Coding（代码能力）

- **HumanEval**：164道人类编写的编程题
- **Codeforces**：竞赛编程题目
- **SW-Bench**：来自GitHub真实issue的代码修复问题

**验证方式**：生成的代码能通过所有测试用例 = 正确

#### 3.2 Math（数学能力）

- **AIME**：美国数学奥林匹克资格赛题目
- **GSM8K**：小学数学应用题

**验证方式**：模型输出答案 → 与标准答案比较（可要求模型将答案放在`[ANSWER]`盒子中便于解析）

### 4. Pass@k指标

#### 4.1 定义

**Pass@k = 至少一个答案在K次尝试中通过测试的概率**

直觉：在coding等场景，可以**花更多时间生成多个答案**，只要有一个通过就行——这比只生成一个答案更实用。

这类似于lecture 5的**Best-of-N**方法，区别在于没有reward model，而是**确定性验证**（代码通过测试/答案匹配）。

#### 4.2 数学推导

**问题**：生成n个答案，其中c个正确。问：从这n个中随机选k个，至少有一个正确的概率？

**技巧**：至少有一个 = 1 - 全部k个都不正确

**推导过程**：
1. 第一个不正确的概率 = (n-c)/n
2. 第二个不正确的概率 = (n-c-1)/(n-1)
3. 继续...第k个不正确的概率 = (n-c-k+1)/(n-k+1)
4. 全部不正确的概率 = 連乘积

最终公式：

```
Pass@k = 1 - C(n-c, k) / C(n, k)
```

其中C为组合数。**Pass@1**（只生成一个答案）则简化为c/n，即正确率。

#### 4.3 Temperature与Pass@k的关系

| Temperature | 效果 |
|-------------|------|
| T=0（很低） | 答案质量高但**缺乏多样性**，增加样本数不会提高Pass@k |
| T适中（如0.4-0.8） | 质量和多样性平衡，Pass@k最优 |
| T过高 | 多样性高但质量下降，错误答案的tokens变得可能 |

**论文中必须报告所采用的temperature**，因为它直接影响结果可复现性。

#### 4.4 其他指标

- **Consensus@k**：K个答案中出现次数最多的答案作为最终答案
- **Self-consistency**：类似思想，多路径推理取多数票

### 5. Scaling with RL——为什么用强化学习训练推理模型？

#### 5.1 为什么SFT不够用？

1. **没有现成的推理链数据**：从头编写大量高质量推理链成本极高
2. **人类推理方式≠模型推理方式**：强制用人类思维教模型可能不是最优
3. **推理任务有天然奖励信号**：代码看测试是否通过，数学看答案是否正确

#### 5.2 奖励设计

```
总奖励 = 格式奖励（是否用了<think>标签）+ 答案正确奖励（可验证）
```

只需要两个简单的规则判断，不需要reward model！

#### 5.3 动态推理预算（Open Problem）

- **问题**：简单问题不需要长推理链，但模型会对所有问题都过度思考
- **解决方案1**：快速分类器——判断问题是"高思考需求"还是"低思考需求"
- **解决方案2**：Budget Forcing（在推理中途强制插入`[BREAK]`或`[ANSWER NOW]`令牌）
- **解决方案3**：Continuous Thoughts——用隐藏表示而非token来表示思考过程（更压缩）

### 6. GRPO算法

#### 6.1 什么是GRPO？

**Group Relative Policy Optimization** = 2024年至今推理训练的主流RL算法。

**两个核心目标（与PPO相同）**：
1. **Advantage Maximization**：产生比"平均水平"更好的答案
2. **避免策略偏移过大**：不能与参考模型（SFT模型或上一轮模型）差太远

#### 6.2 GRPO vs PPO：关键区别在于Advantage的计算方式

| | PPO | GRPO |
|---|---|---|
| **Advantage计算** | 需要训练一个**Value Function**（价值函数）来预测未来累积奖励 | **不需要Value Function**——直接用一组采样的奖励来计算相对优势 |
| **采样** | 每个prompt只采样**1个**completion | 每个prompt采样**G个**completions（group） |
| **计算方式** | Advantage = reward - Value(current token) | Advantage = (reward - mean(rewards)) / std(rewards) |
| **训练代价** | 高（需要同时训练Policy + Value两个模型） | 低（只训练Policy模型） |

#### 6.3 GRPO的直观理解

> "把当前答案的奖励，放到同组其他答案奖励的背景下来看——如果一个难题被答对了，它的价值远比简单题答对高。"

**例子**：
- 简单题：5个答案，4个正确 → 奖励=1
- 难题：5个答案，只有1个正确 → 奖励=1（和简单题一样）

但从**group relative**角度看，难题正确答案的advantage = (1-mean(0.2)) / std(...) 远高于简单题正确答案的advantage。

### 7. GRPO vs PPO损失函数对比

两者形式几乎相同，都基于概率比值的clipping：

```
J = E[ min(r(θ) * A, clip(r(θ), 1-ε, 1+ε) * A) ] - β * KL(π_θ || π_ref)
```

**核心区别**：

| 特征 | PPO | GRPO |
|------|-----|------|
| KL散度位置 | 在advantage计算中（隐式） | 在目标函数中（显式，β系数） |
| Advantage来源 | Reward + Value Function | Group内reward的均值/标准差 |
| 需要训练的模型 | Policy + Value Function | 仅Policy |

### 8. Length Bias（长度偏差）——GRPO的重大缺陷

#### 8.1 问题现象

训练过程中发现：随着RL步数增加，模型输出的**平均长度持续增长**。初期这与性能提升相关（推理链更精细），但到后期：**性能趋于稳定，但输出长度仍在增加**。

#### 8.2 问题根源

GRPO loss中有这个因子：$\frac{1}{|O_i|}$（O_i是第i个输出序列的长度）

- 短输出中的token获得的**权重更大**（因为要除以一个更小的数）
- 当advantage为负（错误答案）时，短输出中的token被**更剧烈地降权**

**后果**：模型学会了一种不良行为——**即使答案错误，也要生成更长的错误推理链**，因为短错误答案会被惩罚得更厉害。

```
坏的行为：长错误推理链 > 短错误推理链（但都是错的！）
```

### 9. DAPO / Dr. GRPO——修复方案

| 论文 | 修复方式 |
|------|----------|
| **DAPO**（2025年3月） | 移除$\frac{1}{|O_i|}$，改为**统一归一化**——所有token贡献相同 |
| **Dr. GRPO** | 直接**完全移除**长度归一化因子 |

**效果**：修正后，错误推理的平均长度显著下降（接近正确推理的长度），而正确推理长度基本不变——模型不再被激励生成冗长的错误思考。

### 10. DeepSeek R1完整训练配方

#### 阶段一览

```
Pre-trained Base Model（DeepSeek V3）
    ↓
[冷启动] Cold-Start SFT（人类重写的CoT数据，微调格式/语言一致性）
    ↓
[阶段1] GRPO RL（可验证奖励 + 格式奖励 + 语言一致性奖励）→ R10（验证概念）
    ↓
[阶段2] Large-scale SFT（拒绝采样筛选高质量推理数据，混入非推理数据 1:3）
    ↓
[阶段3] GRPO RL + Helpfulness/Harmlessness（非推理部分也做对齐）→ R1
```

#### 10.1 R10：纯RL的Proof of Concept

- 直接在预训练模型上应用GRPO + 可验证奖励（无需任何SFT）
- **惊人发现**：纯RL就能让模型学会推理，基准测试性能随训练步数显著提升
- **遗留问题**：推理链中出现语言混杂（mix languages）和格式混乱

#### 10.2 R1：完整pipeline

**冷启动数据（Cold-Start）**：
- 用R10生成的CoT（有问题）→ 人类重写 → 修复格式和语言一致性问题
- 数据量远小于后续阶段（可能只有约「数万」量级）

**第一阶段GRPO奖励函数**：
```
R = R_answer（答案正确性）+ R_format（格式规范）+ R_language（语言一致性）
```
语言一致性奖励：计算目标语言token在推理链中的比例，激励单一语言

**第二阶段SFT（拒绝采样）**：
- 推理数据：使用当前模型采样 → LLM Judge筛选高质量答案 → 保留
- 非推理数据：复用DeepSeek V3的200k SFT数据
- **混合比例**：推理:非推理 = 3:1

**第三阶段GRPO（最终对齐）**：
- 推理数据：保持可验证奖励
- 非推理数据：Helpfulness + Harmlessness奖励（整个输出都要无害，但helpfulness只看最终答案）

#### 10.3 Distillation——小模型也能有推理能力

不需要600B参数。用大模型（R1）生成推理链数据，然后用SFT蒸馏到小模型：

**蒸馏 vs 传统distillation的区别**：
- 传统distillation：蒸馏**next-token probability distribution**（软标签）
- 推理distillation：直接拟合**完整序列**（包含`<think>`标签的整个思考过程）

**结论**：小模型蒸馏比从零训练RL更高效（DeepSeek-Distill-Qwen-7B在AIME上可与OpenAI o1-mini竞争）

---

## 金句摘录

| # | 句子 | 页码/时间戳 |
|---|------|-------------|
| 1 | "The core idea is to decompose the problem into tractable ones, and then rely on the patterns that it has seen during training to solve all these more tractable problems." | 约第7分钟 |
| 2 | "When you let the LLM generate more tokens, you're just giving it more compute." | 约第8分钟 |
| 3 | "GRPO differs from PPO in that GRPO does not need a value function." | 约第40分钟 |
| 4 | "The fact of dividing by the length of the output is incentivizing your model to downweight even more tokens if the same tokens in a short output." | 约第52分钟 |
| 5 | "You don't want to pay a lot, right? You want your model to do what you want, but you do not want it to generate too much so that you're getting charged for it." | 约第50分钟 |

---

## 关键数据点

| 数据点 | 值 | 含义 |
|--------|-----|------|
| Reasoning Model元年 | 2024年9月（OpenAI o1-preview） | 推理模型浪潮起点 |
| DeepSeek R1论文发布 | 2025年1月 | 完全公开方法匹配OpenAI推理能力 |
| DAPO论文发布 | 2025年3月 | 提出移除长度归一化的修复 |
| GRPO vs PPO训练效率 | GRPO不需要训练Value Function | 显著降低计算成本 |
| R1训练数据混合比例 | 推理:非推理 = 3:1（SFT阶段） | 保持推理能力同时扩展到通用场景 |
| 非推理SFT数据量 | ~200k pairs（复用DeepSeek V3数据） | 成本控制 |
| DeepSeek-Distill-Qwen-7B | 可与o1-mini竞争 | 小模型蒸馏可行性证明 |

---

## 概念层级关系

```
LLM Reasoning
├── 什么是推理（Reasoning）
│   ├── 定义：通过多步推理过程解决复杂问题
│   ├── vs 知识查询（如"斯坦福课程代码是什么"→ CME295）
│   └── 核心：Chain of Thought（分步思考）
│
├── 推理模型（Reasoning Model）
│   ├── 输出结构：<think>推理链</think> + <answer>答案</answer>
│   ├── 训练方法：强化学习（而非SFT）
│   └── 推理预算控制（动态/静态/Budget Forcing）
│
├── Benchmarks
│   ├── Coding：HumanEval / Codeforces / SW-Bench（测试用例验证）
│   └── Math：AIME / GSM8K（答案匹配验证）
│
├── Pass@k指标
│   ├── 定义：K次尝试中至少一次成功的概率
│   ├── 公式：1 - C(n-c, k) / C(n, k)
│   └── Temperature权衡：质量 vs 多样性
│
├── 强化学习训练（Scaling with RL）
│   ├── 奖励设计：格式奖励 + 答案正确奖励（无需reward model）
│   ├── GRPO算法
│   │   ├── 核心：用group内相对奖励替代Value Function
│   │   ├── 优势：无须训练Value Function，采样效率高
│   │   └── vs PPO：Advantage计算方式不同
│   └── 长度偏差问题（Length Bias）
│       ├── 根源：1/|O| 因子导致短错误答案被过度惩罚
│       └── 修复：DAPO（统一归一化）/ Dr. GRPO（移除因子）
│
└── DeepSeek R1训练配方
    ├── 阶段1：冷启动SFT（人类重写CoT）
    ├── 阶段2：GRPO RL（R10 proof of concept）
    ├── 阶段3：大规模SFT（拒绝采样，推理:非推理=3:1）
    ├── 阶段4：最终GRPO对齐（helpfulness + harmlessness）
    └── Distillation：R1 → 小模型（如Qwen-7B）
```

---

## 主题标签

`#LLM推理` `#ChainOfThought` `#GRPO` `#PPO对比` `#强化学习训练` `#Pass@k指标` `#DeepSeekR1` `#推理模型蒸馏` `#长度偏差` `#DAPO` `#DrGRPO` `#推理预算控制` `#数学基准测试` `#代码基准测试` `#推理链` `#Stanford CME295`

---

## 延伸阅读

1. **DeepSeek R1论文**（2025年1月）：https://arxiv.org/abs/2501.12599
2. **DeepSeek R10论文**：纯RL proof of concept，仅用可验证奖励训练推理能力
3. **DAPO论文**（2025年3月）：移除长度归一化的改进GRPO
4. **Dr. GRPO**：https://arxiv.org/abs/2503.24062
5. **PPO原始论文**（2017）：Schulman et al.
6. **GRPO论文**（DeepSeek, 2024）：Group Relative Policy Optimization
