# Stanford CME295 Transformers & LLMs | Autumn 2025 | Lecture 8 - LLM Evaluation

> **课程代码**：CME 295
> **讲师**：Afshine Amidi & Shervin Minaee
> **视频URL**：https://www.youtube.com/watch?v=8fNP4N46RRo
> **主题**：LLM Evaluation——如何科学评估大模型的输出质量，包括人类评估、规则指标、LLM-as-a-Judge及各类基准测试

---

## 课程一句话总结

评估LLM是整个AI系统最难的环节之一：从理想的人工评分（太贵）到规则指标（如BLEU/ROUGE）再到**LLM-as-a-Judge**（用模型评判模型），核心挑战是Free-form输出没有标准答案。本讲覆盖评估方法论、主要偏差（Position/Verbosity/Self-enhancement）、Factuality评估、以及Benchmark全景图（Knowledge/Reasoning/Coding/Safety/Agent）。

---

## 章节详解

### 1. Introduction——为什么LLM评估如此困难？

#### 评估的不同含义

当人们说"评估LLM"时，可能指：
- **输出质量**：连贯性、事实性、有用性
- **延迟/系统性能**：响应速度、可用性
- **成本**：推理价格
- **定价**：商业化模型的收费

**本讲聚焦**：输出质量评估

#### 核心困难

LLM是text-to-text模型，输出是**自由格式**，可以生成自然语言、代码、数学推理等。没有通用指标能衡量所有类型的输出质量。

#### 理想但不可行的方案

```
Query → LLM Response → Human Rating → 收集评分
```

**问题**：
1. **成本极高**（需要大量人工）
2. **主观性强**（Inter-rater disagreement）
3. **速度慢**（人工评分慢）

### 2. Inter-rater Agreement Metrics——评估者之间的一致性

#### 问题引入

即使是人类评分员，对于主观问题也可能意见不一致。

**例子**：
```
Query: "What birthday gift should I get?"
Response: "A teddy bear is almost always a sweet gift. Just pick one that feels right for you."
评分员A: 很有用（给出了建议）
评分员B: 不够有用（没有具体说该买哪种）
```

#### Agreement Rate的问题

如果两个评分员随机给分（各50%概率给好/差评），仅凭随机概率也会有**50%的Agreement Rate**。这导致Agreement Rate无法区分"真实一致"和"随机巧合"。

#### 解决方案：Cohen's Kappa等指标

**核心思想**：与"随机情况下的期望一致率"做对比

$$\kappa = \frac{P_{observed} - P_{chance}}{1 - P_{chance}}$$

- $\kappa = 1$：完美一致
- $\kappa = 0$：和随机一样
- $\kappa < 0$：比随机还差（负相关）

**其他扩展**：
- Fleiss' Kappa：适用于多个评分员（>2个）
- Krippendorff's Alpha：更通用的Agreement度量

### 3. Rule-based Metrics——基于规则的评估指标

#### 核心思想

不让人工评分每个输出，而是让人工**预先写出标准答案（Reference）**，然后用算法比较LLM输出与Reference的相似度。

**优势**：可以反复迭代，不需要每次都请人工

#### 3.1 METEOR（Translation Evaluation）

$$Score = F_{mean} \times (1 - penalty)$$

- **Precision**：预测序列中匹配unigram的比例
- **Recall**：Reference中匹配unigram的比例
- **Penalty**：惩罚unigram顺序不一致的情况
- 需要预先给定Reference（无法评估开放生成）

**问题**：不允许同义改写、stylistic variation（"a plush teddy bear" vs "soft, stuffed bears often help kids feel safe"意思完全相同但METEOR得分会很低)

#### 3.2 BLEU（Bilingual Evaluation Understudy）

- **本质**：基于Precision的指标
- 关注预测中匹配n-gram的比例
- 加入Brevity Penalty（防止翻译过短而刷分）

#### 3.3 ROUGE（Recall-Oriented Understudy）

常用于**摘要评估**（Recall-oriented），关注Reference中有多少被预测覆盖。

#### 共同缺陷

| 缺陷 | 说明 |
|------|------|
| **不允许风格变化** | 同义改写会得低分 |
| **与人类评分相关性不高** | 公式中的超参数是经验性的 |
| **仍需要人类写Reference** | 成本依然存在 |

### 4. LLM-as-a-Judge——用模型评估模型

#### 4.1 核心思想

> 我们花了大价钱预训练和微调了这些大模型，它们已经学到了大量人类知识和偏好，为什么不用它们来评估？

**结构**：
```
Input to Judge LLM:
- Prompt（原始用户Query）
- Response（待评估的LLM输出）
- Criteria（评估维度，如helpfulness/factuality）

Output from Judge LLM:
- Rationale（解释为什么给这个分数）
- Score（评级）
```

**两个关键优势**：
1. **不需要Reference**（不需要预先写标准答案）
2. **可解释性**：不仅给分数，还能解释原因

#### 4.2 Reasoning before Scoring（思维先于评分）

**技巧**：让Judge LLM先输出Rationale，再输出Score。

这与Lecture 6中的Reasoning Model思想一致——让模型在给出答案前先生成思维链，评分质量更高。

#### 4.3 Structured Output——保证输出格式

**问题**：Judge LLM的输出是自由格式，可能无法被程序解析。

**解决方案**：
- Lecture 3的**Constrained Guided Decoding**（约束解码，只采样"有效token"）
- OpenAI等provider统称为**Structured Output**——指定输出格式（如JSON schema），LLM只能输出符合格式的内容

#### 4.4 两种变体

| 类型 | 场景 | Judge输出 |
|------|------|-----------|
| **Pointwise（单点）** | 评估单个Response | Pass/Fail 或具体分数 |
| **Pairwise（成对）** | 比较两个Response哪个更好 | Preference（A或B） |

**Pairwise方法的价值**：可以用来**合成偏好数据**（Preference Data），用于训练Reward Model（Lecture 5的PPO/GRPO阶段需要）

### 5. LLM-as-a-Judge的三大偏差

#### 5.1 Position Bias（位置偏差）

**问题**：把Response A放在前面时，模型倾向于认为A更好。

**解决方案**：
- 正反两次提问（A vs B 和 B vs A），取多数票
- 或者用更贵的模型（通常更强的模型position bias更小）

#### 5.2 Verbosity Bias（冗长度偏差）

**问题**：模型倾向于偏好更长、更详细的回答（即使内容质量相同）。

**解决方案**：
1. 在Guidelines中明确说明"不要偏好长度"
2. 提供Few-shot示例，展示长度不是衡量标准
3. Pairwise评分时对输出长度做惩罚项

#### 5.3 Self-enhancement Bias（自我提升偏差）

**问题**：用**同一个模型**生成Response并做Judge，模型会偏向自己生成的答案。

**原因**：模型觉得自己生成的序列在概率上最合理，因此主观认为"合理的答案=正确答案"。

**解决方案**：Judge模型和生成模型**使用不同的模型**（且Judge模型通常更大、推理能力更强）

### 6. Best Practices——LLM-as-a-Judge实践建议

| 建议 | 说明 |
|------|------|
| **给出明确的Guidelines** | 清晰定义"好"vs"不好"的具体标准 |
| **使用Binary Scale** | Pass/Fail 比多级评分（如1-10）更好——减少噪声，也更符合人类直觉 |
| **先输出Rationale再输出Score** | 借鉴Reasoning Model思想 |
| **校准与Human Ratings的相关性** | 定期对比LLM评分和人类评分，确保代理目标仍然有效 |
| **使用Low Temperature（0-0.2）** | 确保评估可复现 |

### 7. Factuality评估——如何评估事实性

#### 挑战

Factuality不是Binary的——有些内容完全错误，有些部分错误，有些完全正确。需要捕捉**错误的程度**。

#### 两步法

**例子**："Teddy bears first created in the 1920s were named after President Theodore Roosevelt after he proudly wanted to shoot a captured bear on a hunting trip."
- 错误1：不是1920s，是1900s
- 错误2：Roosevelt是**拒绝**射杀，而不是"proudly wanted to shoot"

#### Step 1：用LLM将文本拆分为事实列表

将一段文本分解为多个原子事实（如4个独立的事实声明）。

#### Step 2：Fact-checking + 加权聚合

$$Factuality = \sum_{i} \alpha_i \cdot \mathbb{1}[fact_i \text{ is correct}]$$

其中$\alpha_i$是每个事实的重要性权重（可以全设为1，也可以按重要性加权）。

### 8. Agent Evaluation——评估Agent工作流

#### Tool Call的三阶段及可能的Failure Modes

```
User Query
    ↓ [Tool Prediction]
选择正确的工具 + 正确的参数
    ↓ [Tool Execution]
执行工具，获得结果
    ↓ [Synthesis]
将结果合成为自然语言回答
```

**7种主要Failure Modes**：

| 阶段 | Failure Mode | 原因 | 解决方案 |
|------|-------------|------|----------|
| Tool Prediction | **没有调用工具**（punt） | 工具选择器recall不够 | 改进tool router |
| Tool Prediction | **选了工具但没有用** | LLM不知道要用工具 | 重新SFT或改进Prompt |
| Tool Prediction | **调用不存在的工具**（hallucination） | 模型太弱/API描述不清晰 | 升级模型/改进API描述 |
| Tool Prediction | **选了正确的工具但参数错误** | 缺少上下文信息 | 确保context中有必要信息 |
| Tool Execution | **工具返回错误** | 工具实现有bug | 软件工程修复 |
| Tool Execution | **工具返回空/无意义** | 返回格式问题 | 使用结构化输出 |
| Synthesis | **无法将结果合成为回答** | 结果太多被稀释/格式不清晰 | 改进工具返回格式 |

### 9. Benchmarks全景图

#### 9.1 Knowledge Benchmark（MMLU）

**MMLU** = Massive Multitask Language Understanding

- **格式**：多项选择题（4选1），约60个不同领域
- **评估内容**：模型从预训练数据中保留知识的能力
- **特点**：不需要自由生成，答案可被程序提取（问模型输出特定字母）
- **适用场景**：衡量预训练质量

#### 9.2 Reasoning Benchmarks

##### AIME（数学）

- 美国数学奥林匹克资格赛题目
- **格式**：问题 + 最终答案是3位数字（可解析）
- **要求**：模型需要先推理再给出答案

##### PIQA（Physical Interaction Question Answering）

- **物理世界常识推理**（非数学）
- **例子**："How do I find something I lost on the carpet?" → 答案是"用带孔的吸尘器（不是密封的那种）"
- **格式**：二选一，20,000道题

#### 9.3 Coding Benchmark（SWE-bench）

**SWE-bench** = Software Engineering Benchmark

**构建方法**：
1. 从热门Python仓库中筛选包含Pull Request的issue（附有测试用例）
2. 测试在修复前不通过，修复后通过
3. 模型需要生成修复补丁（patch）

**评估方式**：模型生成patch → 应用到代码库 → 运行测试 → 检查是否通过

#### 9.4 Safety Benchmark（HarmBench）

**4类危害**：
1. **Standard**：标准有害行为
2. **Copyright**：生成版权内容
3. **Contextual**：文本多模态有害内容
4. **Multimodel**：其他模态的有害内容

**评估挑战**：有害内容往往是开放性的，无法用正则匹配。需要训练**分类器**来评估（分类器本身可能有误差）。

#### 9.5 Agent Benchmark（Tau-Bench）

**Tau** = Tool Agent Users（希腊字母τ）

**评估方式**：
- 提供Tools API + Policy（明确Agent能做什么/不能做什么）
- 模拟用户对话（用另一个LLM模拟用户多轮交互）
- 评估最终是否完成任务（数据库状态变化）

**新指标 Pass-hat@K**：
- Pass@K = 至少一次成功
- Pass-hat@K = **所有K次都成功**（更高要求，保证可靠性）

### 10. Benchmark实践建议

#### Pareto Frontier

在多个维度（性能/价格/安全性/上下文长度）之间做权衡。最优解的边界称为**Pareto Frontier**。

#### Data Contamination风险

模型可能"见过"benchmark数据导致虚假高分。防护措施：
- 使用Hash值验证数据未被见过
- 使用动态生成的测试题

#### "Goodhart's Law"

> "当一个指标变成目标时，它就不再是一个好指标。"

Benchmark高分≠在实际应用中表现好。**最终还是要自己试用模型**，找到最适合自己用例的那个。

---

## 金句摘录

| # | 句子 | 页码/时间戳 |
|---|------|-------------|
| 1 | "When a measure becomes a target, it ceases to be a good measure." | Goodhart's Law引用 |
| 2 | "LLM-as-a-judge doesn't need human ratings to get started, because our LLM already has a lot of knowledge that has acquired during pre-training and human preferences." | 约第25分钟 |
| 3 | "The first tip is to output the rationale before outputting the score — this follows the same ideas of outputting a chain of thought before providing the response." | 约第33分钟 |
| 4 | "Benchmarks are here to characterize the profile of your LLM — it's not all good or all bad." | 约第70分钟 |
| 5 | "You should try out these models and see for yourself which one corresponds to you best." | 约第70分钟 |

---

## 关键数据点

| 数据点 | 值 | 含义 |
|--------|-----|------|
| MMLU任务数 | ~60个不同领域 | 覆盖面极广的知识评估 |
| PIQA题库大小 | 20,000道 | 大规模常识推理测试 |
| AIME格式 | 答案=3位数字 | 易于自动评估的约束格式 |
| Temperature推荐 | 0.1或0.2 | 评估需要可复现性，用低温度 |
| SWE-bench评估方式 | 模型生成patch → 运行测试 | 真实代码修复能力 |
| Tau-bench Pass-hat@K | 所有K次都成功 | 比Pass@K更高标准，保证可靠性 |

---

## 概念层级关系

```
LLM Evaluation
├── 评估挑战：Free-form输出，没有通用指标
│
├── 人类评估（理想但不可行）
│   ├── 成本高
│   ├── 主观性强（Inter-rater disagreement）
│   └── 速度慢
│
├── Inter-rater Agreement
│   ├── Cohen's Kappa（两人）
│   ├── Fleiss' Kappa（多人）
│   └── Krippendorff's Alpha
│
├── Rule-based Metrics
│   ├── METEOR（翻译，Precision+Recall+顺序惩罚）
│   ├── BLEU（翻译，Precision-focused）
│   └── ROUGE（摘要，Recall-oriented）
│   共同缺陷：不许风格变化，与人类评分相关性不高
│
├── LLM-as-a-Judge（核心方法）
│   ├── 输入：Prompt + Response + Criteria
│   ├── 输出：Rationale + Score
│   ├── 不需要Reference
│   ├── 可解释性强
│   ├── 偏差：Position Bias / Verbosity Bias / Self-enhancement Bias
│   └── Structured Output保证格式
│
├── Factuality评估
│   ├── Step1：LLM将文本分解为原子事实列表
│   ├── Step2：Fact-check每个事实 + 加权聚合
│   └── 可用RAG/web search辅助fact-check
│
└── Benchmarks全景
    ├── Knowledge（MMLU）→ 预训练知识保留
    ├── Reasoning（AIME + PIQA）→ 数学/常识推理
    ├── Coding（SWE-bench）→ 真实代码修复
    ├── Safety（HarmBench）→ 有害行为检测
    └── Agent（Tau-bench）→ 工具使用/多轮对话/任务完成
```

---

## 主题标签

`#LLM评估` `#LLMasajudge` `#InterraterAgreement` `#CohensKappa` `#METEOR` `#BLEU` `#ROUGE` `#StructuredOutput` `#PositionBias` `#VerbosityBias` `#SelfEnhancementBias` `#Factuality` `#MMLU` `#PIQA` `#SWEbench` `#HarmBench` `#Taubench` `#PassatK` `#ParetoFrontier` `#Stanford CME295`

---

## 延伸阅读

1. **LLM-as-a-Judge原始论文**（2023）：引入用LLM做评估者的方法
2. **Constrained Guided Decoding**：Lecture 3提到的约束解码技术 = Structured Output的基础
3. **HarmBench论文**：有害行为基准测试
4. **SWE-bench论文**：软件工程基准测试
5. **Tau-bench论文**：Tool Agent Users基准测试
6. **MMLU**： Massive Multitask Language Understanding
7. **PIQA**：Physical Interaction Question Answering
