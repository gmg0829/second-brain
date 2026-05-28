---
title: "Context Engineering"
source: "https://docs.claude-mem.ai/context-engineering"
author:
published:
created: 2026-04-20
description: "Best practices for curating optimal token sets for AI agents"
tags:
  - "clippings"
---
## Context Engineering for AI Agents面向人工智能代理的上下文工程

## Core Principle 核心原则

**Find the smallest possible set of high-signal tokens that maximize the likelihood of your desired outcome.  
找到能够最大限度提高实现预期结果可能性的最小高信号令牌集合。**

---

## Context Engineering vs Prompt Engineering情境工程与提示工程

**Prompt Engineering**: Writing and organizing LLM instructions for optimal outcomes (one-time task)  
**提示工程** ：编写和组织 LLM 指令以获得最佳结果（一次性任务）

**Context Engineering**: Curating and maintaining the optimal set of tokens during inference across multiple turns (iterative process)  
**上下文工程** ：在多轮推理过程中，精心挑选并维护最佳的词元集（迭代过程）

Context engineering manages:  
上下文工程管理：

- System instructions 系统说明
- Tools 工具
- Model Context Protocol (MCP)  
	模型上下文协议（MCP）
- External data 外部数据
- Message history 消息历史记录
- Runtime data retrieval 运行时数据检索

---

## The Problem: Context Rot 问题：语境腐烂

**Key Insight**: LLMs have an “attention budget” that gets depleted as context grows  
**关键洞察** ：LLM（学习型硕士）的“注意力预算”会随着内容的增加而消耗殆尽。

- Every token attends to every other token (n² relationships)  
	每个令牌都关注其他所有令牌（n² 个关系）
- As context length increases, model accuracy decreases  
	随着上下文长度的增加，模型准确率会降低。
- Models have less training experience with longer sequences  
	模型在处理较长序列方面训练经验较少。
- Context must be treated as a finite resource with diminishing marginal returns  
	必须将背景视为一种有限资源，其边际收益递减。

---

## System Prompts: Find the “Right Altitude”系统提示：找到“合适的高度”

### The Goldilocks Zone 金发姑娘区

**Too Prescriptive** ❌  
**过于死板** ❌

- Hardcoded if-else logic 硬编码的 if-else 逻辑
- Brittle and fragile 易碎
- High maintenance complexity  
	高维护复杂性

**Too Vague** ❌  
**太模糊** 了❌

- High-level guidance without concrete signals  
	缺乏具体信号的高层指导
- Falsely assumes shared context  
	错误地假设了共享上下文
- Lacks actionable direction  
	缺乏可操作的方向

**Just Right** ✅  
**刚刚好** ✅

- Specific enough to guide behavior effectively  
	具体到足以有效指导行为
- Flexible enough to provide strong heuristics  
	足够灵活，能够提供强大的启发式方法
- Minimal set of information that fully outlines expected behavior  
	能够完整描述预期行为的最小信息集

### Best Practices 最佳实践

- Use simple, direct language  
	使用简洁明了的语言
- Organize into distinct sections (`<background_information>`, `<instructions>`, `## Tool guidance`, etc.)  
	将内容组织成不同的部分（ `<background_information>` 、 `<instructions>` 、 `## Tool guidance` 等）
- Use XML tags or Markdown headers for structure  
	使用 XML 标签或 Markdown 标题来构建结构
- Start with minimal prompt, add based on failure modes  
	首先提供最少的提示，然后根据故障模式添加提示。
- Note: Minimal ≠ short (provide sufficient information upfront)  
	注意：极简≠简短（请提前提供足够的信息）

---

## Tools: Minimal and Clear 工具：简洁明了

### Design Principles 设计原则

- **Self-contained**: Each tool has a single, clear purpose  
	**独立性强** ：每种工具都有其单一、明确的用途。
- **Robust to error**: Handle edge cases gracefully  
	**容错能力强** ：能够优雅地处理极端情况
- **Extremely clear**: Intended use is unambiguous  
	**非常清晰** ：预期用途明确无误。
- **Token-efficient**: Returns relevant information without bloat  
	**令牌高效** ：返回相关信息，避免冗余。
- **Descriptive parameters**: Unambiguous input names (e.g., `user_id` not `user`)  
	**描述性参数** ：明确的输入名称（例如， `user_id` 而不是 `user` ）

### Critical Rule 关键规则

**If a human engineer can’t definitively say which tool to use in a given situation, an AI agent can’t be expected to do better.  
如果人类工程师都无法明确指出在特定情况下应该使用哪种工具，就不能指望人工智能代理做得更好。**

### Common Failure Modes to Avoid应避免的常见故障模式

- Bloated tool sets covering too much functionality  
	臃肿的工具集涵盖了过多的功能
- Tools with overlapping purposes  
	用途重叠的工具
- Ambiguous decision points about which tool to use  
	关于使用哪种工具的决策点存在歧义

---

## Examples: Diverse, Not Exhaustive例如：多种多样，但并非穷尽所有

**Do** ✅ **执行** ✅

- Curate a set of diverse, canonical examples  
	精心挑选一系列多样化的经典范例
- Show expected behavior effectively  
	有效展现预期行为
- Think “pictures worth a thousand words”  
	想想“一图胜千言”这句话。

**Don’t** ❌ **不要** ❌

- Stuff in a laundry list of edge cases  
	把各种极端情况都列成一长串清单。
- Try to articulate every possible rule  
	尽量阐明每一条可能的规则
- Overwhelm with exhaustive scenarios  
	被大量的场景淹没

---

## Context Retrieval Strategies上下文检索策略

### Just-In-Time Context (Recommended for Agents)即时上下文（推荐给代理商）

**Approach**: Maintain lightweight identifiers (file paths, queries, links) and dynamically load data at runtime  
**方法** ：维护轻量级标识符（文件路径、查询、链接），并在运行时动态加载数据。

**Benefits**:  
**好处** ：

- Avoids context pollution  
	避免语境污染
- Enables progressive disclosure  
	实现渐进式披露
- Mirrors human cognition (we don’t memorize everything)  
	反映了人类的认知方式（我们不可能记住所有东西）
- Leverages metadata (file names, folder structure, timestamps)  
	利用元数据（文件名、文件夹结构、时间戳）
- Agents discover context incrementally  
	智能体逐步发现上下文

**Trade-offs**:  
**权衡取舍** ：

- Slower than pre-computed retrieval  
	比预先计算的检索速度慢
- Requires proper tool guidance to avoid dead-ends  
	需要正确的工具引导以避免陷入死胡同

### Pre-Inference Retrieval (Traditional RAG)推理前检索（传统 RAG）

**Approach**: Use embedding-based retrieval to surface context before inference  
**方法** ：使用基于嵌入的检索方法来提取上下文信息，然后再进行推理。

**When to Use**: Static content that won’t change during interaction  
**适用场景** ：交互过程中不会改变的静态内容

### Hybrid Strategy (Best of Both)混合策略（兼具两者优势）

**Approach**: Retrieve some data upfront, enable autonomous exploration as needed  
**方法** ：预先检索部分数据，根据需要启用自主探索功能。

**Example**: Claude Code loads CLAUDE.md files upfront, uses glob/grep for just-in-time retrieval  
**例如** ：Claude Code 预先加载 CLAUDE.md 文件，并使用 glob/grep 进行即时检索。

**Rule of Thumb**: “Do the simplest thing that works”  
**经验法则** ：“做最简单有效的事”

---

## Long-Horizon Tasks: Three Techniques长期任务：三种方法

### 1\. Compaction 1. 压实

**What**: Summarize conversation nearing context limit, reinitiate with summary  
**内容** ：总结即将超出上下文限制的对话，并以总结重新开始。

**Implementation**:  
**执行** ：

- Pass message history to model for compression  
	将消息历史记录传递给模型进行压缩
- Preserve critical details (architectural decisions, bugs, implementation)  
	保留关键细节（架构决策、错误、实现）
- Discard redundant outputs  
	丢弃冗余输出
- Continue with compressed context + recently accessed files  
	继续使用压缩上下文和最近访问的文件

**Tuning Process**:  
**调校过程** ：

1. **First**: Maximize recall (capture all relevant information)  
	**首先** ：最大化召回率（捕获所有相关信息）
2. **Then**: Improve precision (eliminate superfluous content)  
	**然后** ：提高精度（去除冗余内容）

**Low-Hanging Fruit**: Clear old tool calls and results  
**唾手可得的成果** ：清除旧的工具调用和结果

**Best For**: Tasks requiring extensive back-and-forth  
**最适合** ：需要大量来回沟通的任务

### 2\. Structured Note-Taking (Agentic Memory)2. 结构化笔记（主动记忆）

**What**: Agent writes notes persisted outside context window, retrieved later  
**内容** ：代理会将笔记保存在上下文窗口之外，稍后可以检索这些笔记。

**Examples**:  
**例如** ：

- To-do lists 待办事项清单
- NOTES.md files NOTES.md 文件
- Game state tracking (Pokémon example: tracking 1,234 steps of training)  
	游戏状态跟踪（例如宝可梦：跟踪 1,234 步训练）
- Project progress logs 项目进度日志

**Benefits**:  
**好处** ：

- Persistent memory with minimal overhead  
	持久内存，开销极小
- Maintains critical context across tool calls  
	在工具调用过程中保持关键上下文
- Enables multi-hour coherent strategies  
	支持数小时的连贯策略

**Best For**: Iterative development with clear milestones  
**最适合** ：具有明确里程碑的迭代开发

### 3\. Sub-Agent Architectures3. 子代理架构

**What**: Specialized sub-agents handle focused tasks with clean context windows  
**内容** ：专门的子代理利用清晰的上下文窗口处理特定任务。

**How It Works**:  
**工作原理** ：

- Main agent coordinates high-level plan  
	主代理人协调高层计划
- Sub-agents perform deep technical work  
	次级代理人执行深入的技术工作
- Sub-agents explore extensively (tens of thousands of tokens)  
	子代理进行广泛探索（数万个令牌）
- Return condensed summaries (1,000-2,000 tokens)  
	返回精简摘要（1000-2000 个词条）

**Benefits**:  
**好处** ：

- Clear separation of concerns  
	明确区分关注点
- Parallel exploration 平行探索
- Detailed context remains isolated  
	详细背景信息仍然孤立。

**Best For**: Complex research and analysis tasks  
**最适合** ：复杂的调研和分析任务

---

## Quick Decision Framework 快速决策框架

| Scenario 设想 | Recommended Approach 推荐方法 |
| --- | --- |
| Static content 静态内容 | Pre-inference retrieval or hybrid   预推理检索或混合检索 |
| Dynamic exploration needed   需要动态探索 | Just-in-time context 即时性背景 |
| Extended back-and-forth 长时间的来回 | Compaction 压实 |
| Iterative development 迭代开发 | Structured note-taking 结构化笔记 |
| Complex research 复杂研究 | Sub-agent architectures 子代理架构 |
| Rapid model improvement 快速模型改进 | ”Do the simplest thing that works”   “做最简单有效的事” |

---

## Key Takeaways 要点总结

1. **Context is finite**: Treat it as a precious resource with an attention budget  
	**语境是有限的** ：要像对待宝贵的资源一样对待它，并合理分配注意力。
2. **Think holistically**: Consider the entire state available to the LLM  
	**整体思考** ：考虑 LLM 可利用的整个州的情况。
3. **Stay minimal**: More context isn’t always better  
	**保持简洁** ：并非越多越好。
4. **Be iterative**: Context curation happens each time you pass to the model  
	**迭代进行** ：每次将数据传递给模型时，都会进行上下文整理。
5. **Design for autonomy**: As models improve, let them act intelligently  
	**自主设计** ：随着模型的改进，让它们智能地行动。
6. **Start simple**: Test with minimal setup, add based on failure modes  
	**从简单的配置开始** ：先用最小的配置进行测试，然后根据故障模式添加其他配置。

---

## Anti-Patterns to Avoid 应避免的反模式

- ❌ Cramming everything into prompts  
	❌ 把所有内容都塞进提示里
- ❌ Creating brittle if-else logic  
	❌ 创建脆弱的 if-else 逻辑
- ❌ Building bloated tool sets  
	❌ 构建臃肿的工具集
- ❌ Stuffing exhaustive edge cases as examples  
	❌ 将穷举的极端情况作为示例
- ❌ Assuming larger context windows solve everything  
	❌ 认为更大的上下文窗口可以解决所有问题
- ❌ Ignoring context pollution over long interactions  
	❌ 忽略长时间互动中的上下文污染

---

## Remember 记住

> “Even as models continue to improve, the challenge of maintaining coherence across extended interactions will remain central to building more effective agents.”  
> “即使模型不断改进，在长时间的交互中保持一致性的挑战，对于构建更有效的智能体而言仍然是核心问题。”

Context engineering will evolve, but the core principle stays the same: **optimize signal-to-noise ratio in your token budget**.  
上下文工程将会不断发展，但核心原则保持不变： **优化代币预算中的信噪比** 。

---

*Based on Anthropic’s “Effective context engineering for AI agents” (September 2025)  
基于 Anthropic 的《人工智能代理的有效上下文工程》（2025 年 9 月）*