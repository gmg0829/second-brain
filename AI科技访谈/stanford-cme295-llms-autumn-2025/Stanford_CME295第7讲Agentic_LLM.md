# Stanford CME295 Transformers & LLMs | Autumn 2025 | Lecture 7 - Agentic LLMs

> **课程代码**：CME 295
> **讲师**：Afshine Amidi & Shervin Minaee
> **视频URL**：https://www.youtube.com/watch?v=h-7S6HNq0Vg
> **主题**：Agentic LLMs——让大模型连接外部世界、调用工具、自主执行任务

---

## 课程一句话总结

本讲解决了vanilla LLM的两大局限：**知识时效性**（用RAG获取最新信息）和**只说不做**（用Tool Calling + Agent工作流让模型真正执行动作）。核心架构是从Retrieve-Augment-Generate（RAG）到Tool Calling再到ReAct Agent的层层叠加，最终实现"给定目标，自主规划、行动、直到完成任务"。

---

## 章节详解

### 1. Introduction——从vanilla LLM到Agentic LLM的进化

#### 回顾Lecture 6的核心内容

- **Reasoning Model**：让模型先输出推理链，再给答案（<think>...</think>）
- **GRPO**：不需要Value Function，用group内相对奖励计算Advantage
- **Length Bias**：GRPO loss中的1/|O|因子导致短错误答案被过度惩罚 → DAPO/Dr. GRPO修复

#### 本讲的两大核心问题

| 问题 | 根源 | 解决方案 |
|------|------|----------|
| 知识有截止日期 | 预训练数据是静态的，无法获取最新信息 | RAG（检索增强生成） |
| 只说不做 | LLM无法访问外部系统、执行动作 | Tool Calling + Agent |

### 2. RAG Overview——检索增强生成

#### 2.1 背景：为什么不能直接把最新信息塞进Context？

**问题1：Context Length有限**
- GPT-4o上下文窗口：400,000 tokens
- 1 token ≈ 4个字符 → 约等于一本很厚重的书
- 无法容纳无限信息

**问题2：LLM对无关信息敏感**
- **Needle in a Haystack实验**：在大段无关文本中插入关键信息，LLM在长文本 + 关键信息位于前半段时召回率显著下降
- 即便context无限，把所有信息都塞进去也会让LLM困惑

**问题3：按Token计费**
- GPT-5约 $1/million tokens
- 塞入过多无关信息 = 浪费钱

#### 2.2 RAG的核心思想

```
Query（问题）
    ↓ [检索]
相关文档片段（chunks）
    ↓ [增强]
Augmented Prompt（原文+相关片段）
    ↓ [生成]
最终回答
```

**RAG = Retrieve + Augment + Generate**

### 3. RAG的两阶段架构

#### 阶段1：Candidate Retrieval（候选检索）

**目标**：从海量文档中快速筛选出可能相关的候选（数量级从millions→hundreds）

**核心方法：Embedding + Cosine Similarity**

1. **Chunking（分块）**：
   - 将文档切分为固定长度的块（通常500 tokens左右）
   - 相邻块之间有少量重叠（overlap，通常低百tokens）
   - 块太大 → embedding无法准确表示内容
   - 块太小 → 上下文丢失

2. **Embedding（向量化）**：
   - 每个chunk通过Encoder模型（如SBERT）编码为向量
   - 典型embedding维度：~1500维
   - 使用Approximate Nearest Neighbor（ANN）技术加速海量向量检索

3. **Bi-encoder架构**：
   - Query和Chunk分别通过独立的Encoder → 分别得到向量
   - 用Cosine Similarity比较相似度
   - 速度快但不捕捉Query-Chunk之间的交互

#### 阶段2：Ranking/Re-ranking（排序）

**目标**：从候选中选出真正最相关的Top-K

**方法：Cross-Encoder**
- Query和Chunk一起喂入Encoder → 直接输出相关分数
- 比Bi-encoder更准确（因为能看到两者的交互）
- 但速度慢，只能在候选数量少时使用

#### 关键超参数总结

| 超参数 | 典型值 | 说明 |
|--------|--------|------|
| Embedding维度 | ~1500 | 太大增加计算量，太小表示能力不足 |
| Chunk大小 | ~500 tokens | 平衡上下文完整性和语义准确性 |
| Overlap | 低百tokens | 避免在chunk边界丢失信息 |

### 4. BM25——基于关键词的启发式检索

#### 与Semantic Search的对比

| 方法 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| **Bi-encoder + Cosine** | 语义相似（意思相近） | 可以找到表述不同但含义相同的文档 | 不保证包含query中的关键词 |
| **BM25** | 关键词重叠 | 保证包含query关键词 | 无法找到语义相关但表述不同的文档 |

**例子**：
```
Query: "where is cuddly?"
Bi-encoder可能找到"huggy the bear is here"（语义相似但没有cuddly）
BM25会找到包含"cuddly"的文档
```

**最佳实践**：Hybrid Search = Bi-encoder + BM25 组合使用

### 5. HyDE & Contextual Retrieval——解决Query-Document不匹配问题

#### 问题

Query通常很短（一个问题），而Document是一段文本。用同一个Encoder编码两者，它们的向量空间分布不同，直接比较效果差。

#### 解决方案

**HyDE（Hypothetical Document Embeddings）**：
1. 让LLM根据Query先**生成一个假文档**（hypothetical document）
2. 用同一个Encoder编码这个假文档
3. 用假文档的向量去检索真实文档

**另一个思路**：Query和Document用**不同的Encoder**（但维护成本高，一般不推荐）

#### Contextual Retrieval（上下文增强分块）

**问题**：Chunk在切分后可能失去上下文，变得难以理解。

**解决方案**：
1. 对每个Chunk，用LLM生成一小段**上下文描述**（context）
2. 将这个context prepend到chunk前面
3. 代价高，但可以用**Prompt Caching**优化

### 6. Prompt Caching——减少重复计算

**核心观察**：Decoder-only模型中，所有共享相同前缀的prompt会产生相同的激活值。

**优化方法**：
- 第一次计算完整的前缀激活，保存起来（cached）
- 后续请求只需计算后缀部分 + cache lookup
- 价格对比：**Cached tokens = Regular tokens价格的1/10**

### 7. 检索评估指标

#### NDCG（Normalized Discounted Cumulative Gain）

**核心思想**：排名越靠前的相关文档，得分越高

$$NDCG = \frac{DCG}{IDCG}$$

- DCG：按排名位置对相关性的折扣累计（排第1位的文档贡献最大）
- IDCG：理想情况下的DCG（即最优排名）
- 归一化后，最高分为1.0

#### MRR（Mean Reciprocal Rank）

$$MRR = \frac{1}{|Q|} \sum_{q \in Q} \frac{1}{rank_q}$$

- 只看**第一个**相关文档的排名
- 简单高效，与NDCG高度相关

#### Precision@K / Recall@K

- **Recall@K**：在所有相关文档中，有多少进入了Top-K
- **Precision@K**：在Top-K中，有多少是真正相关的

### 8. Tool Calling——让LLM调用外部工具

#### 8.1 背景

RAG解决的是"知识查询"问题，但有些任务需要**动态执行**：
- 查天气、查股价（实时信息）
- 执行代码（计算能力扩展）
- 发送邮件、操作日历（代表用户行动）

#### 8.2 Tool Calling的定义

> "Tool calling allows autonomous systems to complete complex tasks by dynamically accessing and acting upon external resources." — IBM

**三个关键点**：
1. 完成任务（而非仅回答问题）
2. 可能依赖外部资源
3. 动态访问

#### 8.3 Function Calling的工作流程

```
用户Query: "Find a teddy bear near Stanford"
    ↓ [第1步：LLM识别需要调用的工具]
Tool: find_teddy_bear(location="Stanford")
    ↓ [第2步：执行工具（API调用，非LLM）]
返回: [{name: "Cuddly", location: "Stanford Mall"}, ...]
    ↓ [第3步：LLM根据工具返回结果生成最终回答]
"Stanford Mall有一家叫Cuddly的玩具店..."
```

**注意**：LLM只看到**Function API的签名和文档**（输入输出格式），不看到实现代码。

### 9. Tool Calling的训练方法

#### 方法1：SFT（监督微调）

**需要两套SFT数据**：

1. **Tool Recognition SFT**：
   - 输入：Query + Function API描述
   - 输出：正确的Function Call（如`find_teddy_bear(location="Stanford")`）

2. **Response Formatting SFT**：
   - 输入：完整对话历史（Query + Tool结果）
   - 输出：自然语言最终回答

#### 方法2：Few-shot Prompting（无需SFT）

对于强大模型（如GPT-4），只需在prompt中给出示例（输入→应该调用的工具），模型就能泛化。

#### 方法3：让更强模型帮写Prompt（推荐）

- 人工写初稿
- 用Reasoning模型评估效果
- 让模型根据评估结果迭代优化Prompt描述
- 比人工硬写效果好得多

### 10. Tool Selection——如何扩展到大量工具

#### 问题

当工具有几十上百个时，全部塞入context会导致：
1. **Context Length爆炸**
2. **LLM在大量工具中迷失**（类似Needle in Haystack问题）
3. 大量无关工具造成干扰

#### 解决方案：Tool Selector / Router

```
用户Query
    ↓ [Step 1: Tool Selection]
选择最相关的2-3个工具API（只传API名+一句话描述）
    ↓ [Step 2: Full Tool Call]
将选中的工具API完整描述+用户Query一起送入LLM
    ↓
执行选中的工具...
```

**Tool Selection本身可以用LLM实现**（给它工具列表，让它选），也可以用RAG思想来做。

### 11. MCP（Model Context Protocol）——工具标准化

**背景**：每个LLM提供商对工具的定义和调用方式各不相同，造成重复实现。

**MCP = Anthropic提出的工具标准化协议**

| 概念 | 说明 |
|------|------|
| **MCP Server** | 提供工具的实际服务方（如书籍提供商） |
| **MCP Client** | LLM宿主（如Claude）上的客户端 |
| **Tools** | 函数的标准化定义 |
| **Prompts** | 使用模板，帮助模型理解如何调用工具 |
| **Resources** | 外部数据源（数据库等） |

**实际例子**：Book Provider MCP Server → 提供书籍查询/推荐工具 → Claude通过MCP Client调用

### 12. Agents with ReAct——自主规划和执行

#### 12.1 Agent vs Tool的本质区别

| | Tool | Agent |
|---|---|---|
| **核心能力** | 单次调用完成特定任务 | 多步循环、自主规划 |
| **推理** | 无 | 有（Observe-Plan-Act循环） |
| **自主性** | 低（按指令执行） | 高（自主决策是否继续） |

#### 12.2 ReAct（Reason + Act）

> **ReAct** = Reasoning + Acting，将复杂任务分解为Observe-Plan-Act的循环迭代

**循环流程**：
```
[Observe] → 理解当前状态，识别未知信息
    ↓
[Plan] → 规划下一步行动（可能需要调用工具）
    ↓
[Act] → 执行工具调用，获取结果
    ↓
循环直到目标达成 → 输出最终回答
```

**实际例子**：智能温控

```
用户Query: "My teddy bear is cold, please do something"

Observe: teddy bear觉得冷 → 可能是室温太低
Plan: 需要先知道室温 → 调用get_temperature工具
Act: get_temperature() → 返回"65°F"（偏低）
    ↓
Observe: 室温65°F低于舒适温度
Plan: 需要调高温度 → 调用increase_temperature工具
Act: increase_temperature(delta=5) → 温度升高
    ↓
Observe: 温度已调节到舒适范围 → 目标达成
Output: "我已经把室温升高了5°F，现在舒适了~"
```

#### 12.3 Multi-Agent系统

- 不同领域的Agent（温控、照明、能源）可以协作
- Google发布**Agent-to-Agent Protocol**（A2A）标准化Agent之间的通信
- 每个Agent暴露自己的**Skills**（能力描述）和**执行状态**

### 13. Safety——Agent带来的新安全挑战

#### 主要风险

1. **数据泄露（Data Exfiltration）**：
   - 如果有一个email工具，恶意prompt可能诱使LLM发送包含密码的邮件

2. **工具滥用**：
   - 恶意prompt让LLM执行有害操作

#### 防护手段

| 阶段 | 方法 |
|------|------|
| **训练阶段** | SFT/RL中加入Safety数据（Harmlessness奖励） |
| **推理阶段** | Safety Classifier：对LLM输出进行安全检查 |

#### 实践案例

Anthropic在2025年遭受大规模网络攻击，攻击者利用工具和Agent能力。Anthropic发布了详细报告，分析攻击路径和防护措施——说明**攻防双方都在利用这些新技术**。

### 14. 构建Agent的建议（Practical Advice）

1. **Start Small**：先在简单场景下验证，再逐步扩展
2. **Start Smart**：先用最强模型验证能力上限，再优化延迟/成本
3. **利用Chain-of-Thought**：LLM输出的推理链是debug的最好工具
4. **当前最实用的Agent应用**：AI Coding Assistant（但要注意：生成代码便宜，判断代码是否正确才是难点）

---

## 金句摘录

| # | 句子 | 页码/时间戳 |
|---|------|-------------|
| 1 | "When you let the LLM generate more tokens, you're just giving it more compute." | Lecture 6回顾 |
| 2 | "RAG stands for retrieval augmented generation. And the idea here is to augment the prompt with relevant information." | 约第10分钟 |
| 3 | "LLM's knowledge is bound to the cutoff date at which we cut off our pre-training data." | 约第5分钟 |
| 4 | "Tool calling allows autonomous systems to complete complex tasks by dynamically accessing and acting upon external resources." | IBM定义引用 |
| 5 | "Agents is a system that autonomously pursues goals and completes tasks on a user's behalf." | 约第58分钟 |

---

## 关键数据点

| 数据点 | 值 | 含义 |
|--------|-----|------|
| GPT-5上下文窗口 | 400,000 tokens | 约一本厚重书籍 |
| GPT-5 Knowledge Cutoff | 2024年9月30日 | 模型知识有截止日期 |
| GPT-5价格 | ~$1/million tokens | 按token计费 |
| Prompt Caching折扣 | 1/10（cached = 0.1 × regular） | 共享前缀的成本优化 |
| 典型Embedding维度 | ~1500维 | 表示能力与计算成本权衡 |
| 典型Chunk大小 | ~500 tokens | 上下文完整性和语义准确性平衡 |
| 典型Overlap | 低百tokens | 避免chunk边界信息丢失 |

---

## 概念层级关系

```
Agentic LLMs（让LLM连接外部世界）
├── 知识时效性问题 → RAG（Retrieval Augmented Generation）
│   ├── Candidate Retrieval（Bi-encoder + Cosine Similarity）
│   │   ├── Chunking（~500 tokens）
│   │   ├── Embedding（SBERT, ~1500维）
│   │   └── ANN加速（Approximate Nearest Neighbor）
│   ├── Keyword Search → BM25（关键词匹配）
│   ├── HyDE（用假文档解决Query-Document不匹配）
│   ├── Contextual Retrieval（为每个chunk生成上下文）
│   ├── Prompt Caching（降低重复计算成本）
│   └── Ranking/Re-ranking（Cross-encoder精确排序）
│
├── 评估指标
│   ├── NDCG（考虑排名位置的相关性得分）
│   ├── MRR（第一个相关文档的倒数排名）
│   └── Precision@K / Recall@K
│
└── 动作执行问题 → Tool Calling + Agent
    ├── Tool Calling（Function Calling）
    │   ├── Function API定义（输入/输出/文档）
    │   ├── 训练方法1：SFT（两阶段）
    │   ├── 训练方法2：Few-shot Prompting
    │   └── 训练方法3：让强模型帮写Prompt
    ├── Tool Selection（Router）→ 解决工具过多问题
    │   └── 两阶段：先选工具 → 再完整调用
    ├── MCP（Model Context Protocol）→ 工具标准化
    │   ├── MCP Server（工具提供方）
    │   ├── MCP Client（LLM宿主）
    │   └── Tools / Prompts / Resources
    └── Agent（ReAct循环）
        ├── Observe（理解当前状态）
        ├── Plan（规划下一步行动）
        ├── Act（执行工具调用）
        └── Loop until goal reached
```

---

## 主题标签

`#RAG` `#检索增强生成` `#BiEncoder` `#CrossEncoder` `#BM25` `#HyDE` `#PromptCaching` `#NDCG` `#MRR` `#ToolCalling` `#FunctionCalling` `#MCP` `#ReAct` `#Agent` `#多Agent协作` `#A2A协议` `#Agent安全` `#Stanford CME295`

---

## 延伸阅读

1. **Sentence-BERT (SBERT)**：https://arxiv.org/abs/1908.10084
2. **HyDE (Hypothetical Document Embeddings)**：https://arxiv.org/abs/2212.10496
3. **ReAct Paper**：https://arxiv.org/abs/2210.03629（Reason + Act）
4. **MCP官方文档**：Anthropic提出的工具标准化协议
5. **Google Agent-to-Agent Protocol (A2A)**：Agent间通信标准化
6. **Agent Safety Bench**：评估Agent安全风险的基准测试
