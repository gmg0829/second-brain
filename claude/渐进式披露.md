---
title: "Progressive disclosure"
source: "https://docs.claude-mem.ai/progressive-disclosure"
author:
published:
created: 2026-04-20
description: "Persistent memory compression system that preserves context across Claude Code sessions"
tags:
  - "clippings"
---
## Progressive Disclosure: Claude-Mem’s Context Priming Philosophy渐进式披露：克劳德-梅姆的语境启动哲学

## Core Principle 核心原则

**Show what exists and its retrieval cost first. Let the agent decide what to fetch based on relevance and need.  
首先展示已存在的数据及其检索成本。然后让智能体根据相关性和需求决定检索哪些数据。**

---

## What is Progressive Disclosure?什么是渐进式披露？

Progressive disclosure is an information architecture pattern where you reveal complexity gradually rather than all at once. In the context of AI agents, it means:  
渐进式披露是一种信息架构模式，它强调逐步揭示复杂性，而不是一次性全部呈现。在人工智能代理的背景下，这意味着：

1. **Layer 1 (Index)**: Show lightweight metadata (titles, dates, types, token counts)  
	**第 1 层（索引）** ：显示轻量级元数据（标题、日期、类型、词元计数）
2. **Layer 2 (Details)**: Fetch full content only when needed  
	**第 2 层（详细信息）** ：仅在需要时获取完整内容
3. **Layer 3 (Deep Dive)**: Read original source files if required  
	**第三层（深度解析）** ：如有需要，请阅读原始源文件。

This mirrors how humans work: We scan headlines before reading articles, review table of contents before diving into chapters, and check file names before opening files.  
这与人类的工作方式类似：我们会在阅读文章之前浏览标题，在深入阅读章节之前查看目录，在打开文件之前检查文件名。

---

## The Problem: Context Pollution问题：语境污染

Traditional RAG (Retrieval-Augmented Generation) systems fetch everything upfront:  
传统的 RAG（检索增强生成）系统会预先获取所有数据：

```text
❌ Traditional Approach:
┌─────────────────────────────────────┐
│ Session Start                        │
│                                      │
│ [15,000 tokens of past sessions]    │
│ [8,000 tokens of observations]      │
│ [12,000 tokens of file summaries]   │
│                                      │
│ Total: 35,000 tokens                │
│ Relevant: ~2,000 tokens (6%)        │
└─────────────────────────────────────┘
```

**Problems:问题：**

- Wastes 94% of attention budget on irrelevant context  
	浪费了94%的注意力预算在无关内容上
- User prompt gets buried under mountain of history  
	用户提示被埋没在历史的洪流中。
- Agent must process everything before understanding task  
	代理必须先处理所有信息才能理解任务。
- No way to know what’s actually useful until after reading  
	读完之后才能知道什么才是真正有用的。

---

## Claude-Mem’s Solution: Progressive Disclosure克劳德-梅姆的解决方案：渐进式披露

```text
✅ Progressive Disclosure Approach:
┌─────────────────────────────────────┐
│ Session Start                        │
│                                      │
│ Index of 50 observations: ~800 tokens│
│ ↓                                    │
│ Agent sees: "🔴 Hook timeout issue"  │
│ Agent decides: "Relevant!"           │
│ ↓                                    │
│ Fetch observation #2543: ~120 tokens│
│                                      │
│ Total: 920 tokens                   │
│ Relevant: 920 tokens (100%)         │
└─────────────────────────────────────┘
```

**Benefits:好处：**

- Agent controls its own context consumption  
	代理控制自身的上下文消费
- Directly relevant to current task  
	与当前任务直接相关
- Can fetch more if needed  
	如有需要，可以获取更多信息。
- Can skip everything if not relevant  
	如果无关，可以跳过所有内容。
- Clear cost/benefit for each retrieval decision  
	每次检索决策的明确成本效益分析

---

## How It Works in Claude-Mem克劳德-梅姆是如何运作的

### The Index Format 索引格式

Every SessionStart hook provides a compact index:  
每个 SessionStart 钩子都提供一个简洁的索引：

```markdown
### Oct 26, 2025

**General**
| ID | Time | T | Title | Tokens |
|----|------|---|-------|--------|
| #2586 | 12:58 AM | 🔵 | Context hook file exists but is empty | ~51 |
| #2587 | ″ | 🔵 | Context hook script file is empty | ~46 |
| #2589 | ″ | 🟡 | Investigated hook debug output docs | ~105 |

**src/hooks/context-hook.ts**
| ID | Time | T | Title | Tokens |
|----|------|---|-------|--------|
| #2591 | 1:15 AM | ⚖️ | Stderr messaging abandoned | ~155 |
| #2592 | 1:16 AM | ⚖️ | Web UI strategy redesigned | ~193 |
```

**What the agent sees:代理人看到的：**

- **What exists**: Observation titles give semantic meaning  
	**存在什么** ：观察标题赋予语义意义
- **When it happened**: Timestamps for temporal context  
	**事件发生时间** ：时间戳，用于提供时间背景
- **What type**: Icons indicate observation category  
	**类型** ：图标指示观察类别
- **Retrieval cost**: Token counts for informed decisions  
	**检索成本** ：令牌计数对知情决策的影响
- **Where to get it**: MCP search tools referenced at bottom  
	**获取途径** ：请参阅文末提及的 MCP 搜索工具。

### The Legend System 传奇系统

```text
🎯 session-request  - User's original goal
🔴 gotcha          - Critical edge case or pitfall
🟡 problem-solution - Bug fix or workaround
🔵 how-it-works    - Technical explanation
🟢 what-changed    - Code/architecture change
🟣 discovery       - Learning or insight
🟠 why-it-exists   - Design rationale
🟤 decision        - Architecture decision
⚖️ trade-off       - Deliberate compromise
```

**Purpose:目的：**

- Visual scanning (humans and AI both benefit)  
	视觉扫描（人类和人工智能均受益）
- Semantic categorization 语义分类
- Priority signaling (🔴 gotchas are more critical)  
	优先级信号（🔴 陷阱更为关键）
- Pattern recognition across sessions  
	跨会话的模式识别

### Progressive Disclosure Instructions渐进式披露指示

The index includes usage guidance:  
该索引包含使用指南：

```markdown
💡 **Progressive Disclosure:** This index shows WHAT exists and retrieval COST.
- Use MCP search tools to fetch full observation details on-demand
- Prefer searching observations over re-reading code for past decisions
- Critical types (🔴 gotcha, 🟤 decision, ⚖️ trade-off) often worth fetching immediately
```

**What this does:它的作用是：**

- Teaches the agent the pattern  
	教会代理人这种模式
- Suggests when to fetch (critical types)  
	建议何时获取（关键类型）
- Recommends search over code re-reading (efficiency)  
	建议使用搜索功能而不是重新阅读代码（效率更高）。
- Makes the system self-documenting  
	使系统能够自我记录

---

## The Philosophy: Context as Currency哲学理念：语境即货币

### Mental Model: Token Budget as Money思维模型：代币预算即货币

Think of context window as a bank account:  
把上下文窗口想象成一个银行账户：

| Approach 方法 | Metaphor 隐喻 | Outcome 结果 |
| --- | --- | --- |
| **Dump everything 把所有东西都扔掉** | Spending your entire paycheck on groceries you might need someday   把整个月的工资都花在将来可能需要的食品杂货上 | Waste, clutter, can’t afford what you actually need   浪费、杂乱，买不起真正需要的东西 |
| **Fetch nothing 什么也拿不到** | Refusing to spend any money   拒绝花一分钱 | Starvation, can’t accomplish tasks   饥饿，无法完成任务 |
| **Progressive disclosure 渐进式披露** | Check your pantry, make a shopping list, buy only what you need   检查一下你的食品储藏室，列个购物清单，只买你需要的东西。 | Efficiency, room for unexpected needs   效率高，能应对意外需求 |

### The Attention Budget 注意力预算

LLMs have finite attention:  
LLM 的注意力是有限的：

- Every token attends to every other token (n² relationships)  
	每个令牌都关注其他所有令牌（n² 个关系）
- 100,000 token window ≠ 100,000 tokens of useful attention  
	100,000 个令牌的窗口 ≠ 100,000 个有效注意力令牌
- Context “rot” happens as window fills  
	随着窗口填充，上下文“腐烂”就会发生。
- Later tokens get less attention than earlier ones  
	后期发行的代币不如早期发行的代币受到关注。

**Claude-Mem’s approach:克劳德-梅姆的方法：**

- Start with ~1,000 tokens of index  
	初始索引约 1,000 个令牌。
- Agent has 99,000 tokens free for task  
	代理人有 99,000 个可用代币用于任务
- Agent fetches ~200 tokens when needed  
	代理会在需要时获取约 200 个令牌。
- Final budget: ~98,000 tokens for actual work  
	最终预算：实际工作约需 98,000 个代币

### Design for Autonomy 自主设计

> “As models improve, let them act intelligently”  
> “随着模型的改进，让它们能够智能地行动。”

Progressive disclosure treats the agent as an **intelligent information forager**, not a passive recipient of pre-selected context.  
渐进式披露将代理视为 **智能信息搜寻者** ，而不是预先选定背景的被动接受者。

**Traditional RAG:传统 RAG：**

```text
System → [Decides relevance] → Agent
        ↑
   Hope this helps!
```

**Progressive Disclosure:渐进式披露：**

```text
System → [Shows index] → Agent → [Decides relevance] → [Fetches details]
                          ↑
                   You know best!
```

The agent knows:特工知道：

- The current task context  
	当前任务背景
- What information would help  
	哪些信息会有帮助？
- How much budget to spend  
	预算是多少？
- When to stop searching  
	何时停止搜索

We don’t.我们不。

---

## Implementation Principles实施原则

### 1\. Make Costs Visible 1. 让成本透明化

Every item in the index shows token count:  
索引中的每个项目都显示标记计数：

```text
| #2591 | 1:15 AM | ⚖️ | Stderr messaging abandoned | ~155 |
                                                        ^^^^
                                                    Retrieval cost
```

**Why:为什么：**

- Agent can make informed ROI decisions  
	代理人可以做出明智的投资回报率决策
- Small observations (~50 tokens) are “cheap” to fetch  
	获取少量观测值（约 50 个标记）的成本很低。
- Large observations (~500 tokens) require stronger justification  
	大量观测数据（约 500 个样本）需要更充分的理由。
- Matches how humans think about effort  
	这与人类对努力的看法相符。

### 2\. Use Semantic Compression2. 使用语义压缩

Titles compress full observations into ~10 words:  
标题将完整的观察结果压缩到大约 10 个字：

**Bad title:标题不佳：**

```text
Observation about a thing
```

**Good title:好的标题：**

```text
🔴 Hook timeout issue: 60s default too short for npm install
```

**What makes a good title:  
好的标题应具备哪些要素：**

- Specific: Identifies exact issue  
	具体：指出确切问题
- Actionable: Clear what to do  
	可操作性：明确要做什么
- Self-contained: Doesn’t require reading observation  
	自包含：无需阅读观察
- Searchable: Contains key terms (hook, timeout, npm)  
	可搜索：包含关键词（hook、timeout、npm）
- Categorized: Icon indicates type  
	已分类：图标指示类型

### 3\. Group by Context 3. 按背景分组

Observations are grouped by:  
观测结果按以下方式分组：

- **Date**: Temporal context  
	**日期** ：时间背景
- **File path**: Spatial context (work on specific files)  
	**文件路径** ：空间上下文（处理特定文件）
- **Project**: Logical context  
	**项目** ：逻辑上下文

```markdown
**src/hooks/context-hook.ts**
| ID | Time | T | Title | Tokens |
|----|------|---|-------|--------|
| #2591 | 1:15 AM | ⚖️ | Stderr messaging abandoned | ~155 |
| #2594 | 1:17 AM | 🟠 | Removed stderr section from docs | ~93 |
```

**Benefit:** If agent is working on `src/hooks/context-hook.ts`, related observations are already grouped together.  
**好处：** 如果代理正在处理 `src/hooks/context-hook.ts` ，则相关的观察结果已经分组在一起。

### 4\. Provide Retrieval Tools4. 提供检索工具

The index is useless without retrieval mechanisms:  
如果没有检索机制，索引就毫无用处：

```markdown
*Use claude-mem MCP search to access records with the given ID*
```

**Available MCP tools:可用的 MCP 工具：**

- `search` - Search memory index (Layer 1: Get IDs)  
	`search` - 搜索内存索引（第 1 层：获取 ID）
- `timeline` - Get chronological context (Layer 2: See narrative arc)  
	`timeline` - 获取时间顺序背景（第二层：查看叙事弧线）
- `get_observations` - Fetch full details (Layer 3: Deep dive)  
	`get_observations` - 获取完整详细信息（第 3 层：深度分析）

The 3-layer workflow ensures progressive disclosure: index → context → details.  
三层工作流程确保逐步披露：索引 → 上下文 → 详细信息。

---

## Real-World Example 真实案例

### Scenario: Agent asked to fix a bug in hooks场景：代理人被要求修复钩子程序中的一个漏洞

**Without progressive disclosure:  
如果没有逐步披露：**

```text
SessionStart injects 25,000 tokens of past context
Agent reads everything
Agent finds 1 relevant observation (buried in middle)
Total tokens consumed: 25,000
Relevant tokens: ~200
Efficiency: 0.8%
```

**With progressive disclosure:  
通过逐步披露：**

```text
SessionStart shows index: ~800 tokens
Agent sees title: "🔴 Hook timeout issue: 60s too short"
Agent thinks: "This looks relevant to my bug!"
Agent fetches observation #2543: ~155 tokens
Total tokens consumed: 955
Relevant tokens: 955
Efficiency: 100%
```

### The Index Entry 索引条目

```markdown
| #2543 | 2:14 PM | 🔴 | Hook timeout: 60s too short for npm install | ~155 |
```

**What the agent learns WITHOUT fetching:  
代理在不获取数据的情况下学习到的内容：**

- There’s a known gotcha (🔴) about hook timeouts  
	关于钩子超时，有一个已知的陷阱（🔴）。
- It’s related to npm install taking too long  
	这与 npm install 耗时过长有关。
- Full details are ~155 tokens (cheap)  
	完整详情约为 155 个代币（便宜）
- Happened at 2:14 PM (recent)  
	发生于下午 2:14（最近）

**Decision tree:决策树：**

```text
Is my task related to hooks? → YES
Is my task related to timeouts? → YES
Is my task related to npm? → YES
155 tokens is cheap → FETCH IT
```

---

## The Three-Layer Workflow 三层工作流程

Claude-Mem implements progressive disclosure through a 3-layer workflow pattern:  
Claude-Mem 通过三层工作流程模式实现渐进式披露：

### Layer 1: Search (Index) 第一层：搜索（索引）

Start by searching to get a compact index with IDs:  
首先搜索以获取包含 ID 的精简索引：

```typescript
search({
  query: "hook timeout",
  limit: 10
})
```

**Returns:返回：**

```text
Found 3 observations matching "hook timeout":

| ID | Date | Type | Title |
|----|------|------|-------|
| #2543 | Oct 26 | gotcha | Hook timeout: 60s too short |
| #2891 | Oct 25 | how-it-works | Hook timeout configuration |
| #2102 | Oct 20 | problem-solution | Fixed timeout in CI |
```

**Cost:** ~50-100 tokens per result **Value:** Agent can scan and decide which observations are relevant  
**费用：** 每次结果约需 50-100 个代币 **价值：** 智能体可以扫描并判断哪些观测结果是相关的。

### Layer 2: Timeline (Context)第二层：时间线（背景）

Get chronological context around interesting observations:  
获取有关有趣观察结果的时间背景：

```typescript
timeline({
  anchor: 2543,  // Observation ID from search
  depth_before: 3,
  depth_after: 3
})
```

**Returns:** Chronological view showing what happened before/during/after observation #2543  
**返回结果：** 按时间顺序显示观察 #2543 之前/期间/之后发生的事情

**Cost:** Variable based on depth **Value:** Understand narrative arc and context  
**费用：** 根据深度而变化 **价值：** 理解叙事弧线和背景

### Layer 3: Get Observations (Details)第 3 层：获取观测结果（详细信息）

Fetch full details only for relevant observations:  
仅获取相关观测结果的完整详细信息：

```typescript
get_observations({
  ids: [2543, 2102]  // Selected from search results
})
```

**Returns:返回：**

```text
#2543 🔴 Hook timeout: 60s too short for npm install
─────────────────────────────────────────────────
Date: Oct 26, 2025 2:14 PM
Type: gotcha
Project: claude-mem

Narrative:
Discovered that the default 60-second hook timeout is insufficient
for npm install operations, especially with large dependency trees
or slow network conditions. This causes SessionStart hook to fail
silently, preventing context injection.

Facts:
- Default timeout: 60 seconds
- npm install with cold cache: ~90 seconds
- Configured timeout: 120 seconds in plugin/hooks/hooks.json:25

Files Modified:
- plugin/hooks/hooks.json

Concepts: hooks, timeout, npm, configuration
```

**Cost:** ~155 tokens for full details **Value:** Complete understanding of the issue  
**费用：** 约 155 个代币（详情请见下文） **价值：** 对问题的全面理解

---

## Cognitive Load Theory 认知负荷理论

Progressive disclosure is grounded in **Cognitive Load Theory**:  
渐进式披露是基于 **认知负荷理论的** ：

### Intrinsic Load 固有负荷

The inherent difficulty of the task itself.  
任务本身固有的难度。

**Example:** “Fix authentication bug”  
**例如：** “修复身份验证漏洞”

- Must understand auth system  
	必须了解授权系统
- Must understand the bug  
	必须了解这个漏洞
- Must write the fix  
	必须编写修复程序

This load is unavoidable.  
这笔负担是不可避免的。

### Extraneous Load 额外负荷

The cognitive burden of poorly presented information.  
信息呈现方式不佳带来的认知负担。

**Traditional RAG adds extraneous load:  
传统 RAG（破旧换新）会增加额外的负担：**

- Scanning irrelevant observations  
	扫描无关观测结果
- Filtering out noise 过滤噪声
- Remembering what to ignore  
	记住要忽略什么
- Re-contextualizing after each section  
	每节课后重新进行语境化

**Progressive disclosure minimizes extraneous load:  
逐步披露可最大限度地减少额外负担：**

- Scan titles (low effort)  
	扫描标题（轻松）
- Fetch only relevant (targeted effort)  
	仅获取相关信息（有针对性的努力）
- Full attention on current task  
	全神贯注于当前任务

### Germane Load 德国负荷

The effort of building mental models and schemas.  
构建心智模型和图式的努力。

**Progressive disclosure supports germane load:  
渐进式披露支持相关负荷：**

- Consistent structure (legend, grouping)  
	一致的结构（图例、分组）
- Clear categorization (types, icons)  
	清晰的分类（类型、图标）
- Semantic compression (good titles)  
	语义压缩（优秀标题）
- Explicit costs (token counts)  
	显式成本（代币数量）

---

## Anti-Patterns to Avoid 应避免的反模式

### ❌ Verbose Titles ❌ 冗长的标题

**Bad:坏的：**

```text
| #2543 | 2:14 PM | 🔴 | Investigation into the issue where hooks time out | ~155 |
```

**Good:好的：**

```text
| #2543 | 2:14 PM | 🔴 | Hook timeout: 60s too short for npm install | ~155 |
```

### ❌ Hiding Costs ❌ 隐藏成本

**Bad:坏的：**

```text
| #2543 | 2:14 PM | 🔴 | Hook timeout issue |
```

**Good:好的：**

```text
| #2543 | 2:14 PM | 🔴 | Hook timeout issue | ~155 |
```

### ❌ No Retrieval Path ❌ 无检索路径

**Bad:坏的：**

```text
Here are 10 observations. [No instructions on how to get full details]
```

**Good:好的：**

```text
Here are 10 observations.
*Use MCP search tools to fetch full observation details on-demand*
```

### ❌ Skipping the Index Layer❌ 跳过索引层

**Bad:坏的：**

```typescript
// Fetching full details immediately
get_observations({
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  // Guessing which are relevant
})
```

**Good:好的：**

```typescript
// Follow the 3-layer workflow
// Layer 1: Search for index
search({
  query: "hooks",
  limit: 20
})

// Layer 2: Review index, identify 2-3 relevant IDs

// Layer 3: Fetch only relevant observations
get_observations({
  ids: [2543, 2891]  // Just the most relevant
})
```

---

## Key Design Decisions 关键设计决策

### Why Token Counts? 为什么需要进行令牌计数？

**Decision:** Show approximate token counts (~155, ~203) rather than exact counts.  
**决定：** 显示近似的词元计数（~155，~203），而不是精确的计数。

**Rationale:理由：**

- Communicates scale (50 vs 500) without false precision  
	传达规模（50 与 500）而不产生虚假精确度
- Maps to human intuition (small/medium/large)  
	映射到人类直觉（小/中/大）
- Allows agent to budget attention  
	允许代理人合理分配注意力
- Encourages cost-conscious retrieval  
	鼓励注重成本效益的检索

### Why Icons Instead of Text Labels?为什么使用图标而不是文字标签？

**Decision:** Use emoji icons (🔴, 🟡, 🔵) rather than text (GOTCHA, PROBLEM, HOWTO).  
**决定：** 使用表情符号（🔴、🟡、🔵）而不是文字（抓到你了、问题、操作方法）。

**Rationale:理由：**

- Visual scanning (pattern recognition)  
	视觉扫描（模式识别）
- Token efficient (1 char vs 10 chars)  
	令牌效率高（1 个字符 vs 10 个字符）
- Language-agnostic 与语言无关
- Aesthetically distinct 美学上截然不同
- Works for both humans and AI  
	对人类和人工智能都适用

### Why Index-First, Not Smart Pre-Fetch?为什么采用索引优先而不是智能预取？

**Decision:** Always show index first, even if we “know” what’s relevant.  
**决定：** 始终先显示索引，即使我们“知道”哪些内容是相关的。

**Rationale:理由：**

- We can’t know what’s relevant better than the agent  
	我们不可能比代理人更清楚什么是相关的。
- Pre-fetching assumes we understand the task  
	预取的前提是我们理解任务。
- Agent knows current context, we don’t  
	智能体了解当前上下文，而我们则不了解。
- Respects agent autonomy 尊重代理自主性
- Fails gracefully (can always fetch more)  
	能够优雅地处理失败（可以随时获取更多数据）

### Why Group by File Path?为什么按文件路径分组？

**Decision:** Group observations by file path in addition to date.  
**决定：** 除了按日期分组外，还按文件路径分组观测结果。

**Rationale:理由：**

- Spatial locality: Work on file X likely needs context about file X  
	空间局部性：对文件 X 的工作可能需要有关文件 X 的上下文信息。
- Reduces scanning effort 减少扫描工作量
- Matches how developers think  
	与开发者的思维方式相符
- Clear semantic boundaries  
	清晰的语义边界

---

## Measuring Success 衡量成功

Progressive disclosure is working when:  
渐进式披露机制在以下情况下有效：

### ✅ Low Waste Ratio ✅ 低浪费率

```text
Relevant Tokens / Total Context Tokens > 80%
```

Most of the context consumed is actually useful.  
大部分所获取的信息实际上都很有用。

### ✅ Selective Fetching ✅ 选择性获取

```text
Index Shown: 50 observations
Details Fetched: 2-3 observations
```

Agent is being selective, not fetching everything.  
代理会进行选择性获取，而不是获取所有内容。

### ✅ Fast Task Completion ✅ 快速完成任务

```text
Session with index: 30 seconds to find relevant context
Session without: 90 seconds scanning all context
```

Time-to-relevant-information is faster.  
获取相关信息的速度更快。

### ✅ Appropriate Depth ✅ 合适的深度

```text
Simple task: Only index needed
Medium task: 1-2 observations fetched
Complex task: 5-10 observations + code reads
```

Depth scales with task complexity.  
深度随任务复杂度而变化。

---

## Future Enhancements 未来改进

### Adaptive Index Size 自适应指数大小

```typescript
// Vary index size based on session type
SessionStart({ source: "startup" }):
  → Show last 10 sessions (small index)

SessionStart({ source: "resume" }):
  → Show only current session (micro index)

SessionStart({ source: "compact" }):
  → Show last 20 sessions (larger index)
```

### Relevance Scoring 相关性评分

```typescript
// Use embeddings to pre-sort index by relevance
search({
  query: "authentication bug",
  orderBy: "relevance"  // Based on semantic similarity (future enhancement)
})
```

### Cost Forecasting 成本预测

```markdown
💡 **Budget Estimate:**
- Fetching all 🔴 gotchas: ~450 tokens
- Fetching all file-related: ~1,200 tokens
- Fetching everything: ~8,500 tokens
```

### Progressive Detail Levels渐进式细节级别

```text
Layer 1: Index (titles only)
Layer 2: Summaries (2-3 sentences)
Layer 3: Full details (complete observation)
Layer 4: Source files (referenced code)
```

---

## Key Takeaways 要点总结

1. **Show, don’t tell**: Index reveals what exists without forcing consumption  
	**展示而非讲述** ：指数揭示了存在之物，而不强迫消费。
2. **Cost-conscious**: Make retrieval costs visible for informed decisions  
	**注重成本** ：公开检索成本，以便做出明智的决策。
3. **Agent autonomy**: Let the agent decide what’s relevant  
	**智能体自主性** ：让智能体决定哪些内容是相关的。
4. **Semantic compression**: Good titles make or break the system  
	**语义压缩** ：好的标题决定系统的成败
5. **Consistent structure**: Patterns reduce cognitive load  
	**一致的结构** ：模式可以降低认知负荷
6. **Two-tier everything**: Index first, details on-demand  
	**两级式结构** ：先列出索引，再按需提供详细信息
7. **Context as currency**: Spend wisely on high-value information  
	**以语境为货币** ：明智地将资金投入到高价值信息中。

---

## Remember 记住

> “The best interface is one that disappears when not needed, and appears exactly when it is.”  
> “最好的界面就是不需要时消失，需要时恰到好处地出现。”

Progressive disclosure respects the agent’s intelligence and autonomy. We provide the map; the agent chooses the path.  
渐进式披露尊重了主体的智慧和自主性。我们提供路线图，主体选择路径。

---

## Further Reading 延伸阅读

- [Context Engineering for AI Agents](https://docs.claude-mem.ai/context-engineering) - Foundational principles  
	[人工智能代理的上下文工程](https://docs.claude-mem.ai/context-engineering) ——基础原则
- [Claude-Mem Architecture](https://docs.claude-mem.ai/architecture/overview) - How it all fits together  
	[克劳德-梅姆建筑事务所](https://docs.claude-mem.ai/architecture/overview) ——一切是如何契合的
- Cognitive Load Theory (Sweller, 1988)  
	认知负荷理论（Sweller，1988）
- Information Foraging Theory (Pirolli & Card, 1999)  
	信息觅食理论（Pirolli & Card，1999）
- Progressive Disclosure (Nielsen Norman Group)  
	渐进式披露（尼尔森诺曼集团）

---

*This philosophy emerged from real-world usage of Claude-Mem across hundreds of coding sessions. The pattern works because it aligns with both human cognition and LLM attention mechanics.  
这种理念源于克劳德-梅姆模型在数百次编码会话中的实际应用。该模式之所以有效，是因为它既符合人类认知，也符合低层次记忆模型（LLM）的注意力机制。*