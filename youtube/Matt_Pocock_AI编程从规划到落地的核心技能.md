# Matt Pocock: Essential Skills for AI Coding — From Planning to Production
# Matt Pocock：AI 编程从规划到落地的核心技能

---

## 引言 / Introduction

**来源 / Source**: AI Engineer 频道，Matt Pocock @mattpocockuk
**视频 / Video**: https://www.youtube.com/watch?v=-QFHIoCo-Ko
**时长 / Duration**: 约1小时36分 | 546行转录文本
**形式 / Format**: 双语模式（中文 + English）

Matt Pocock 是 TypeScript 教学领域的知名人物，曾任 Vercel 工程师，现经营 AI 编程课程。这场工作坊的核心理念是：

> "我们所有人都以为 AI 是一个新范式，但实际上，软件工程的基础原理——那些在与人类协作中至关重要的东西——同样在与 AI 协作中极其有效。"

This workshop's core thesis: AI doesn't render software engineering fundamentals obsolete — it amplifies them. The skills that make you effective working with humans are the same skills that make you effective working with AI.

---

## 第一章　LLM 的两个根本性约束 / Two Fundamental LLM Constraints

### 1.1 智能区与愚蠢区 / Smart Zone vs. Dumb Zone

Matt 引入了 Dex Hy（Human Layer 公司）提出的一个关键概念：

> "当你在 LLM 中工作时，它有一个智能区和一个愚蠢区。当你开始一个新的对话，你从零开始——那是 LLM 表现最好的时刻，因为注意力关系最未被扭曲。每当你给 LLM 添加一个 token，就相当于给足球联赛添加一支球队。你想一想，每添加一支球队，比赛的场次增加量是二次方级别的。"

Every time you add a token to an LLM, you're adding attention relationships — each token attends to every other token. This creates quadratic scaling in computational complexity.

因此，大约在 40% 的上下文窗口利用率时（Matt 的新标准是约 100k tokens），LLM 就会开始变笨：

> "不管你使用的是 100 万上下文窗口还是 20 万上下文窗口，效果都一样。它总是会开始变笨，直到做出愚蠢的决定。"

Regardless of your context window size, performance degrades at roughly the same point. A 1M context window doesn't give you a smarter AI — it gives you more room to enter the dumb zone.

**核心结论 / Key Takeaway**: 将任务控制在智能区内，不要让 AI 一次承担过多工作。这与 Martin Fowler 在《重构》、Pragmatic Programmer 中"不要一口吃成胖子"的原则完全一致。

Task sizing within the smart zone mirrors traditional software engineering wisdom: keep tasks small enough that neither human nor AI loses control.

### 1.2 LLM 像《记忆碎片》男主 / LLM Like Memento

LLM 的第二个根本特征：**它们会不断遗忘**。

> "另一个奇怪的约束是：LLM 就像《记忆碎片》里的那个家伙。它们只是不断地重置回基础状态。"

Every session with an LLM follows the same pattern: System Prompt → Exploration → Implementation → Testing → Clear → Back to System Prompt.

Matt 提出了两种处理方式：

- **Compacting（压缩）**：将对话历史压缩成摘要，保留信息但损失细节
- **Clear（清空）**：完全回到系统提示词状态，像《记忆碎片》男主一样每次从零开始

Matt 的偏好是后者：

> "我更喜欢让 AI 像《记忆碎片》的男主，因为这个状态总是一样的——每次清空后回到起点。如果你能够为此优化，你就能处于一个非常好的位置。"

The clean reset is preferable because it guarantees you're always in the smart zone, always with a fresh context.

**监控工具 / Monitoring Tool**: 在每个编码会话中，Matt 建议始终关注 token 使用量计数器——知道距离"垃圾桶区"有多近，是确保工作质量的基础。

---

## 第二章　对齐引擎：Grill Me 技能 / The Alignment Engine: Grill Me Skill

### 2.1 Specs to Code 的陷阱 / The Specs-to-Code Trap

Matt 描述了一个普遍的错误做法——"Specs to Code 运动"：

> "人们说：你想构建一个 App，最好的方式是先写一些规格文档，然后把那份文档变成代码。怎么变？把它传给 AI。如果生成的代码有问题，你不看代码，你回头改规格，然后继续循环。这本质上是另一种 vibe coding——你完全忽略了代码。"

This approach fails because you lose touch with the actual implementation. You need to shape the code — the code is your battleground.

### 2.2 Grill Me 技能的设计 / The Grill Me Skill

Matt 的核心实践是一个极度简洁的技能——"Grill Me"：

```
Interview me relentlessly about every aspect of this plan until we reach a shared understanding.
Walk down each branch of the design tree, resolving dependencies one at a time.
For each question, provide your recommended answer.
Ask the questions one at a time.
```

Grill Me 的工作流程：

1. 清空上下文（确保进入智能区）
2. 调用 Grill Me 技能，传入客户需求
3. AI 以子代理（Sub Agent）形式探索代码库，消耗隔离的上下文窗口
4. 子代理探索完成后，向用户提出一系列深度问题
5. 用户逐个回答，双方逐步建立共享的设计概念

Matt 强调：**你需要的不是一个计划（Plan），而是一种共享的理解（Shared Understanding）**。

Frederick P. Brooks 在《设计的设计》中说：当所有人共同构建某样东西时，参与者之间存在一个共享的设计概念——这就是 Matt 与 AI 协作时追求的状态。

### 2.3 对话式对齐的价值 / Value of Conversational Alignment

在 Grill Me 会话中，AI 会问：

> "积分经济：哪些行为获得积分？获得多少？"
"每日签到的连续性如何设计？"
"积分应该是追溯性的吗？现有课程进度记录怎么办？"

Should points be retroactive? There are existing lesson progress records. Are we going to backfill all timestamps?

这些问题往往连提出需求的客户（Sarah Chen）自己都没有想过。Grill Me 的价值在于：**它强制你面对那些被忽略的边界情况**。

Matt 分享了一个案例：关于积分是否追溯的问题，他请全场听众投票决定——让 AI 提出问题，然后人类投票确认，这是对齐的过程，而不是单方面下发规格说明。

---

## 第三章　从想法到 PRD：落地文档 / From Idea to PRD: The Destination Document

### 3.1 两个核心文档 / Two Essential Documents

Matt 认为，从想法到落地需要两个文档：

1. **Destination Document（目的地文档）**：定义我们要去哪里长什么样，包含所有用户故事和完成定义
2. **Journey Document（旅程文档）**：记录我们如何到达那里，即任务拆分

> "PRD 的功能就是目的地文档。它记录问题陈述、解决方案、一组用户故事、实现决策列表，以及测试决策列表。"

PRD 记录了从 Grill Me 会话中提炼出的设计概念，是人类和 AI 共享的理解的正式化载体。

### 3.2 AI 生成 PRD 的局限性 / Limitations of AI-Generated PRD

值得注意的是，Matt 不会阅读 AI 生成的 PRD 内容：

> "我不看这些东西。我在看什么呢？LLM 最擅长的就是总结——既然我们已经通过 Grill Me 达到了相同的波长，我所做的就只是在检验 LLM 的总结能力。"

Matt doesn't read the AI-generated PRD because at that point he's just testing the LLM's ability to summarize, not testing the actual design concept. The real validation happens through Grill Me, not through PRD review.

---

## 第四章　垂直切片与看板：任务拆分方法论 / Vertical Slices & Kanban: Task Decomposition Methodology

### 4.1 AI 喜欢水平编码 / AI Prefers Horizontal Coding

Matt 发现一个关键问题：**AI 喜欢水平地编码（Layer by Layer）**。

Phase 1：完成所有数据库相关工作、所有 schema
Phase 2：完成所有 API 层
Phase 3：添加前端

> "有谁能告诉我这个图有什么问题吗？"

**答案**：直到 Phase 3 完成之前，你完全没有得到任何集成反馈——你没有一个可以测试的完整系统流程。

Without vertical slices, you don't get integrated feedback until the final phase. The entire development happens blind.

### 4.2 垂直切片：Tracer Bullets / Vertical Slices: Tracer Bullets

Matt 引用了 Pragmatic Programmer 中的概念——**Tracer Bullets（示踪子弹）**：

> "想象一个防空炮手在夜间看着天空。如果你只是发射普通子弹，你不知道自己在瞄准什么。但曳光弹会在路径上发出磷光——每隔几发子弹，你就看到天空中的一条轨迹。垂直切片的思路就是：增加反馈层级，获得近乎即时的构建反馈。"

Vertical slices cross all layers of the system in each phase. Each slice is a thin, end-to-end feature that can be tested and reviewed immediately.

Matt 建议的 PRD to Issues 技能工作流程：

1. 定位 PRD（再次确认目的地）
2. 探索代码库（如有必要）
3. **起草垂直切片**：将 PRD 分解为"示踪子弹"式的 Issues
4. 向用户确认切片划分
5. 创建独立的 Issues 文件

### 4.3 看板的并行化价值 / Kanban's Parallelization Value

看板的核心优势是**允许并行工作**：

- Issue 1 完成 → Issue 2 和 Issue 3 可同时进行（并行 AFK 代理）
- Issue 4 阻塞于 1、2、3 → 最后执行

> "顺序计划只能被一个代理使用。看板让你可以把任务分配给多个并行工作的代理。"

Sequential plans limit you to one agent; Kanban enables true parallelization across multiple simultaneous agents.

Matt 在这个阶段的关键观点：**任务分解必须由人类把关**，AI 在这方面的表现还不完美——你需要确保第一个切片是真正的垂直切片，而不是一个孤立的水平层。

---

## 第五章　AFK 代理与 Ralph Loop / AFK Agents & The Ralph Loop

### 5.1 人类在环 vs AFK 任务 / Human-in-the-Loop vs AFK Tasks

Matt 将 AI 时代的工作分为两类：

- **Human-in-the-Loop（人类在环）任务**：需要人类持续参与的规划、对齐、决策
- **AFK（离开键盘）任务**：人类可以离开，AI 自主执行

> "人类在环的任务必须有人的参与——不幸的是，规划阶段必须有人在环。可一旦我们进入了实现阶段，人类就可以退出了。"

Planning, alignment, and design decisions require human judgment. Implementation can be delegated to autonomous agents.

### 5.2 Ralph Loop 的结构 / Ralph Loop Structure

Ralph Loop（以《辛普森一家》中的 Ralph Wiggum 命名）的核心流程：

```
1. 传入本地 Issues 文件（整个待办清单）
2. 传入最近 5 次 Git 提交（让 AI 了解当前状态）
3. 运行 Claude Code（权限模式：允许编辑）
4. AFK 代理执行以下循环：
   - 选择下一个任务（优先顺序：关键 Bug > 开发基础设施 > 垂直切片 > 快速改进 > 重构）
   - 探索代码库
   - 使用 TDD 完成
   - 运行反馈循环（测试、类型检查）
5. 如果所有 AFK 任务完成，输出 "No more tasks"
```

### 5.3 Sand Castle：并行化基础设施 / Sand Castle: Parallelization Infrastructure

Matt 开发了一个 TypeScript 工具 **Sand Castle**，用于在 Docker 沙箱中运行并行化代理循环：

```typescript
// 核心流程
1. Planner Agent → 从看板选择可并行的 Issues
2. 为每个 Issue 创建 Docker 沙箱
3. 在各沙箱中并行运行 Implement Agent
4. 收集所有 Commits
5. Merger Agent → 处理合并冲突
```

Sand Castle 让多个代理同时在独立沙箱中工作，最终合并结果——这是 Matt 目前的主要工作流程。

> "用 Opus 进行代码审查（需要更聪明的大脑），用 Sonnet 进行实现（速度优先）。"

Review requires smarter models (Opus); implementation benefits from speed (Sonnet).

---

## 第六章　TDD 与反馈循环 / TDD and Feedback Loops

### 6.1 为什么 TDD 对 AI 至关重要 / Why TDD Is Essential for AI

Matt 发现 **TDD（测试驱动开发）对 AI 编程极为关键**，原因是 AI 在没有反馈的情况下是"完全盲目编码"的。

> "如果没有反馈循环，AI 就是在盲目编码。你必须建立反馈循环才能让 AI 产出任何合理的东西。实际上，反馈循环的质量决定了 AI 编程的上限。"

The quality of your feedback loops determines the ceiling of your AI's coding ability.

TDD 的 Red-Green-Refactor 循环对 AI 特别有效：

1. **Red（失败测试）**：AI 先写一个失败的测试（因为模块尚不存在）
2. **Green（通过实现）**：AI 实现代码让测试通过
3. **Refactor（重构）**：AI 改进代码

> "我通常发现 AI 喜欢在测试中作弊——它会分层做所有工作，先做完整实现，再做完整测试层。但如果使用 TDD，因为它必须在写代码之前先写测试，作弊就难得多了。"

Without TDD, AI writes tests after implementation and tends to write trivial tests that just assert the implementation is correct. TDD enforces discipline.

### 6.2 反馈循环的类型 / Types of Feedback Loops

Matt 在实现流程中建立了多个反馈层：

- **npm test**：单元测试
- **npm run type-check**：TypeScript 类型检查
- **人工 QA**：在开发完成后的手工验证

Matt 强调人工 QA 的不可替代性：

> "你需要一个人类来把关，否则你最终产出的是垃圾。AI 没有视觉审美，没有对'品味'的理解——这些必须由人类导入。"

Without human QA, you get slop. AI lacks taste, aesthetic judgment, and the ability to understand whether something actually works as intended in the real world.

---

## 第七章　代码库架构：深度模块 vs 浅层模块 / Codebase Architecture: Deep vs Shallow Modules

### 7.1 浅层模块的问题 / The Problem with Shallow Modules

Matt 引入了 John Ousterhout《软件设计的哲学》中的核心概念：

**浅层模块（Shallow Modules）**：大量小文件，每个文件暴露少量功能，相互依赖关系复杂。AI 难以追踪这种依赖图谱，测试边界模糊。

**深层模块（Deep Modules）**：小接口（简单 API）、内部实现丰富。易于测试——只需在模块外层包裹一个大测试边界即可。

> "我发现，如果不加干预，AI 生成的代码库会变成大量浅层模块的集合。这使得测试困难，让 AI 导航复杂化，也让代码库难以维护。"

Unassisted AI tends to produce shallow, complex codebases. Deep modules with clean interfaces are the antidote.

### 7.2 Improve Codebase Architecture 技能 / Improve Codebase Architecture Skill

Matt 开发了一个专门用于改善代码库架构的技能——扫描代码库，识别可以合并为深层模块的相关文件簇：

> "它发现了 Quiz Scoring Service 这个模块，目前有零个测试——这是最大的缺口。它识别了哪些模块相互依赖，为什么它们应该被合并，以及如何测试它们。"

这个技能的价值在于：**让 AI 能够看到完整的系统流程，并针对整个流程进行测试**，而不必在碎片化的小模块之间艰难导航。

### 7.3 人类如何保持对代码库的理解 / Retaining Codebase Awareness

Matt 提出了一个严峻的观察：

> "举起手来，如果你感觉自己现在比以往任何时候都更努力地工作。举起手来，如果你觉得自己对代码库的理解不如以前了。"

这是真实的困境：当我们快速交付、委托更多工作时，我们失去了对代码库的感知。

Matt 的解决思路：**把模块当作灰盒（Gray Boxes）**——知道模块的形状（接口和行为），但将具体实现委托给 AI。这样人类保持对代码库整体架构的理解，同时不失去速度。

Design the interface for modules, delegate the implementation. Know what each module does and how it behaves without needing to understand every internal detail.

---

## 第八章　推拉策略：代码标准的传递 / Push & Pull: Conveying Code Standards

Matt 区分了向 AI 传递编码标准的两种方式：

| 策略 | 描述 | 适用场景 |
|-------|------|----------|
| **Push（推送）** | 将信息推送给 LLM（如 CLAUDE.md 中的指令） | AI 需要主动遵循的规则 |
| **Pull（拉动）** | 为 AI 提供拉取信息的机会（如 Skills） | AI 主动查询时获取信息 |

Matt 的建议：

> "在实现阶段，让编码标准通过 Pull 方式可用（AI 有问题时可以查询）。在自动化审查阶段，让编码标准通过 Push 方式传递（审查者需要有标准来对比代码）。"

In implementation, let the agent pull coding standards as needed. In code review, push standards to the reviewer so it can compare against them.

---

## 附录一：核心概念双语对照 / Appendix I: Bilingual Key Terms

| 中文 | English | 定义 |
|------|---------|------|
| 智能区 | Smart Zone | LLM 上下文未过载、表现最好的工作区间 |
| 愚蠢区 | Dumb Zone | 上下文过长导致 LLM 性能下降的区域 |
| 压缩 | Compacting | 将对话历史压缩为摘要的上下文管理方式 |
| Grill Me | Grill Me Skill | 通过强制提问达到人类与 AI 共享理解的技能 |
| 共享设计概念 | Shared Design Concept | 人类与 AI 对目标的共同认知状态 |
| 垂直切片 | Vertical Slice | 贯穿系统所有层的薄功能片 |
| 示踪子弹 | Tracer Bullet | 带有即时反馈的快速原型方法 |
| AFK 代理 | AFK Agent | 可离开键盘自主执行的 AI 代理 |
| Ralph Loop | Ralph Loop | 基于子代理循环的自主编码工作流 |
| 深度模块 | Deep Module | 小接口、大内部实现的模块设计模式 |
| 浅层模块 | Shallow Module | 大接口、复杂依赖的模块设计模式 |

---

## 附录二：时间戳索引 / Appendix II: Timestamps

| 时间戳 | 章节主题 |
|--------|----------|
| 00:00 | 开场与问题收集方式介绍 |
| 00:03 | LLM 约束：智能区与愚蠢区 |
| 00:07 | LLM 像《记忆碎片》——状态重置 |
| 00:12 | Grill Me 技能演示与客户需求分析 |
| 00:30 | PRD 生成与目的地文档 |
| 00:39 | 看板与垂直切片方法论 |
| 00:53 | Ralph Loop 与 AFK 代理 |
| 01:06 | TDD 与反馈循环 |
| 01:14 | 代码库架构：深度 vs 浅层模块 |
| 01:29 | Sand Castle 并行化基础设施 |
| 01:32 | Improve Codebase Architecture 技能 |
| 01:34 | 总结与核心阅读建议 |

---

## 附录三：关键技能索引 / Appendix III: Skills Referenced

| 技能名 | 功能 | 章节 |
|--------|------|------|
| **Grill Me** | 通过强制提问达到人类与 AI 对齐 | Ch2 |
| **Write a PRD** | 生成产品需求文档（目的地文档） | Ch3 |
| **PRD to Issues** | 将 PRD 拆解为看板 Issues（垂直切片） | Ch4 |
| **Ralph Loop / Once** | 单次运行 AFK 编码代理 | Ch5 |
| **Improve Codebase Architecture** | 扫描代码库识别架构改进机会 | Ch7 |
| **Red Green Refactor** | TDD 循环（内置于多个工作流） | Ch6 |

---

## 附录四：Matt 的工作流全貌 / Appendix IV: Full Workflow Overview

```
[IDEA] → [GRILL ME] → [PRD] → [KANBAN / VERTICAL SLICES]
    ↑                                           ↓
    ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
              Human in the Loop (Planning Phase)

[AFK IMPLEMENTATION] → [TDD + FEEDBACK LOOPS] → [QA]
        ↓
  [PARALLEL AGENTS via Sand Castle]
        ↓
  [MERGE + CODE REVIEW] → [HUMAN APPROVAL]
        ↓
  [PULL REQUESTS / TEAM REVIEW]
```

Matt 的核心原则：**在规划阶段充分人类参与，在实现阶段充分放手。**

---

## 附录五：核心语录摘选 / Appendix V: Key Quotes

> "LLM 有智能区和愚蠢区。每添加一个 token，它就变笨一点。"
"LLMs have a smart zone and a dumb zone. Every time you add a token, it just gets dumber."

> "代码就是你的战场。你需要塑造它，而不是忽略它。"
"The code is your battleground. You need to shape it, not ignore it."

> "反馈循环的质量决定了 AI 编程的上限。"
"The quality of your feedback loops determines the ceiling of your AI's coding ability."

> "糟糕的代码库产出糟糕的 AI。"
"Bad codebases make bad AI agents."

> "你需要人类来把关——否则你最终产出的是垃圾。"
"You need a human touch when you're building this stuff — without that you just end up with slop."

> "把模块当作灰盒：知道它的形状，但将实现委托出去。"
"Treat modules as gray boxes: know their shape, but delegate the implementation."

---

*本文基于 Matt Pocock 在 AI Engineer 频道的工作坊转录文本，时长约1小时36分，共546行。全部内容已通读并深度分析。*
