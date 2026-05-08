---
url: "https://x.com/Vtrivedy10/status/2031408954517971368"
author: "Viv (@Vtrivedy10)"
title: "The Anatomy of an Agent Harness"
source: "X (Twitter)"
date: "2026-03-17"
tags: [AI, Agents, Engineering, Harness]
---

# The Anatomy of an Agent Harness

## TLDR

Agent = Model + Harness. Harness engineering is how we build systems around models to turn them into work engines. The model contains the intelligence and the harness makes that intelligence useful. We define what a harness is and derive the core components today's and tomorrow's agents need.

---

## 中文

**TLDR**：Agent = Model + Harness（模型 + 骨架）。Harness 工程是我们围绕模型构建系统以将其转变为工作引擎的方式。模型包含智能，而 Harness 使这种智能变得有用。我们将定义什么是 Harness，并推导出当今和未来 Agent 所需的核心组件。

---

## Can Someone Please Define a "Harness"?

Agent = Model + Harness

If you're not the model, you're the harness.

A harness is every piece of code, configuration, and execution logic that isn't the model itself. A raw model is not an agent. But it becomes one when a harness gives it things like state, tool execution, feedback loops, and enforceable constraints.

Concretely, a harness includes things like:

- System Prompts
- Tools, Skills, MCPs and their descriptions
- Bundled Infrastructure (filesystem, sandbox, browser)
- Orchestration Logic (subagent spawning, handoffs, model routing)
- Hooks/Middleware for deterministic execution (compaction, continuation, lint checks)

There are many messy ways to split the boundaries of an agent system between the model and the harness. But in my opinion, this is the cleanest definition because it forces us to think about designing systems around model intelligence.

---

## 中文

## 谁能定义一下 "Harness"？

Agent = Model + Harness

如果你不是模型，你就是 harness。

Harness 是模型本身之外的所有代码、配置和执行逻辑。原始模型不是 Agent。但当 Harness 赋予它状态、工具执行、反馈循环和可强制约束时，它就变成了 Agent。

具体来说，Harness 包括：

- 系统提示词
- 工具、Skills、MCP 及其描述
- 捆绑基础设施（文件系统、沙箱、浏览器）
- 编排逻辑（子 Agent 启动、交接、模型路由）
- 用于确定性执行的 Hooks/中间件（压缩、继续、lint 检查）

在模型和 Harness 之间划分 Agent 系统边界有很多混乱的方式。但在我看来，这是最清晰的定义，因为它迫使我们围绕模型智能设计系统。

---

## Why Do We Need Harnesses…From a Model's Perspective

There are things we want an agent to do that a model cannot do out of the box. This is where a harness comes in.

Models (mostly) take in data like text, images, audio, video and they output text. That's it. Out of the box they cannot:

- Maintain durable state across interactions
- Execute code
- Access realtime knowledge
- Setup environments and install packages to complete work

These are all harness level features. The structure of LLMs requires some sort of machinery that wraps them to do useful work.

For example, to get a product UX like "chatting", we wrap the model in a while loop to track previous messages and append new user messages. Everyone reading this has already used this kind of harness.

---

## 中文

## 为什么我们需要 Harness？……从模型的视角

有些事情我们希望 Agent 能做，但模型本身无法做到。这就是 Harness 的用武之地。

模型（大多数情况下）接收文本、图像、音频、视频等数据，并输出文本，就这样。它们本身无法：

- 在交互之间维持持久状态
- 执行代码
- 访问实时知识
- 设置环境并安装包来完成工作

这些全部是 Harness 级别的功能。LLM 的结构需要某种机制来包装它们以完成有用的工作。

例如，为了获得"聊天"的产品体验，我们将模型包装在 while 循环中以跟踪 previous messages 并附加新的用户消息。阅读本文的每个人都使用过这种 Harness。

---

## Working Backwards from Desired Agent Behavior to Harness Engineering

Harness Engineering helps humans inject useful priors to guide agent behavior. And as models have gotten more capable, harnesses have been used to surgically extend and correct models to complete previously impossible tasks.

We won't go over an exhaustive list of every harness feature. The goal is to derive a set of features from the starting point of helping models do useful work. We'll follow a pattern like this:

**Behavior we want** (or want to fix) → **Harness Design** to help the model achieve this.

---

## 中文

## 从期望的 Agent 行为反向推导 Harness 工程

Harness 工程帮助人类注入有用的先验来引导 Agent 行为。随着模型变得更强大，Harness 被用于精心扩展和修正模型，以完成以前不可能完成的任务。

我们不会详述每个 Harness 功能的详尽列表。目标是从帮助模型完成有用工作的起点推导出一套功能。我们将遵循这样的模式：

**我们想要的行为**（或想要修复的）→ **Harness 设计** 帮助模型实现这一点。

---

## Filesystems for Durable Storage and Context Management

We want agents to have durable storage to interface with real data, offload information that doesn't fit in context, and persist work across sessions.

Models can only directly operate on knowledge within their context window. Before filesystems, users had to copy/paste content directly to the model, that's clunky UX and doesn't work for autonomous agents.

The world was already using filesystems to do work so models were naturally trained on billions of tokens of how to use them. The natural solution became:

**Harnesses ship with filesystem abstractions and tools for fs-ops.**

The filesystem is arguably the most foundational harness primitive because of what it unlocks:

- Agents get a workspace to read data, code, and documentation.
- Work can be incrementally added and offloaded instead of holding everything in context.
- The filesystem is a natural collaboration surface. Multiple agents and humans can coordinate through shared files.
- Git adds versioning to the filesystem so agents can track work, rollback errors, and branch experiments.

---

## 中文

## 文件系统用于持久存储和上下文管理

我们希望 Agent 具有持久存储，以便与真实数据交互、卸载不适合放在上下文中的信息，并在会话之间保持工作。

模型只能直接操作其上下文窗口内的知识。在使用文件系统之前，用户必须将内容直接复制/粘贴到模型中，这对于自主 Agent 来说是很笨拙的用户体验。

世界已经在使用文件系统来工作，因此模型自然接受了数十亿个关于如何使用文件系统的 token 的训练。自然的解决方案变成：

**Harness 附带文件系统抽象和 fs-ops 工具。**

文件系统可以说是最基础的 Harness 原语，因为它解锁了：

- Agent 获得工作区来读取数据、代码和文档。
- 工作可以增量添加和卸载，而不是将所有内容保存在上下文中。
- 文件系统是自然的协作表面。多个 Agent 和人类可以通过共享文件协调。
- Git 为文件系统添加版本控制，以便 Agent 跟踪工作、回滚错误和分支实验。

---

## Bash + Code as a General Purpose Tool

We want agents to autonomously solve problems without humans needing to pre-design every tool.

The main agent execution pattern today is a ReAct loop, where a model reasons, takes an action via a tool call, observes the result, and repeats in a while loop. But harnesses can only execute the tools they have logic for.

Instead of forcing users to build tools for every possible action, a better solution is to give agents a general purpose tool like bash.

**Harnesses ship with a bash tool so models can solve problems autonomously by writing & executing code.**

Bash + code exec is a big step towards giving models a computer and letting them figure out the rest autonomously.

---

## 中文

## Bash + 代码作为通用工具

我们希望 Agent 能够自主解决问题，而无需人类预先设计每个工具。

今天主要的 Agent 执行模式是 ReAct 循环，模型推理、通过工具调用采取行动、观察结果，并在 while 循环中重复。但 Harness 只能执行它们有逻辑的工具。

更好的解决方案是给 Agent 一个像 bash 这样的通用工具，而不是强迫用户为每个可能的操作构建工具。

**Harness 附带 bash 工具，以便模型可以通过编写和执行代码自主解决问题。**

Bash + 代码执行是赋予模型计算机并让它们自主弄清楚其余部分的重要一步。

---

## Sandboxes and Tools to Execute & Verify Work

Agents need an environment with the right defaults so they can safely act, observe results, and make progress.

We've given models storage and the ability to execute code, but all of that needs to happen somewhere. Running agent-generated code locally is risky and a single local environment doesn't scale to large agent workloads.

**Sandboxes give agents safe operating environments.** Instead of executing locally, the harness can connect to a sandbox to run code, inspect files, install dependencies, and complete tasks. This creates secure, isolated execution of code.

Good environments come with good default tooling. Harnesses are responsible for configuring tooling so agents can do useful work. This includes pre-installing language runtimes and packages, CLIs for git and testing, browsers for web interaction and verification.

---

## 中文

## 沙箱和执行验证工作的工具

Agent 需要具有正确默认值的环境，以便它们可以安全地行动、观察结果并取得进展。

我们已经赋予了模型存储和执行代码的能力，但所有这些都需要在某个地方发生。在本地运行 Agent 生成的代码是有风险的，而且单个本地环境无法扩展到大型 Agent 工作负载。

**沙箱为 Agent 提供安全的操作环境。** Harness 可以连接到沙箱来运行代码、检查文件、安装依赖项并完成任务，而不是在本地执行。这创建了安全、隔离的代码执行。

良好的环境配备良好的默认工具。Harness 负责配置工具，以便 Agent 可以完成有用的工作。这包括预装语言运行时和包、用于 git 和测试的 CLI、用于网页交互和验证的浏览器。

---

## Memory & Search for Continual Learning

Agents should remember what they've seen and access information that didn't exist when they were trained.

Models have no additional knowledge beyond their weights and what's in their current context. Without access to edit model weights, the only way to "add knowledge" is via context injection.

For memory, the filesystem is again a core primitive. **Harnesses support memory file standards like AGENTS.md which get injected into context on agent start.** As agents add and edit this file, harnesses load the updated file into context. This is a form of continual learning.

For up-to-date knowledge, Web Search and MCP tools like Context7 help agents access information beyond the knowledge cutoff.

---

## 中文

## 记忆和搜索用于持续学习

Agent 应该记住它们见过什么，并访问训练时不存在的信息。

模型除了权重和当前上下文中的内容外，没有额外的知识。在无法编辑模型权重的情况下，"添加知识"的唯一方法是通过上下文注入。

对于记忆，文件系统再次成为核心原语。**Harness 支持记忆文件标准，如 AGENTS.md，在 Agent 启动时注入上下文。** 随着 Agent 添加和编辑此文件，Harness 将更新后的文件加载到上下文中。这是一种持续学习的形式。

对于最新知识，Web Search 和 Context7 等 MCP 工具帮助 Agent 访问超出知识截止日期的信息。

---

## Battling Context Rot

Agent performance shouldn't degrade over the course of work.

**Context Rot** describes how models become worse at reasoning and completing tasks as their context window fills up. Context is a precious and scarce resource, so harnesses need strategies to manage it.

**Compaction** addresses what to do when the context window is close to filling up. The harness has to use some strategy for this case – intelligently offloads and summarizes the existing context window so the agent can continue working.

**Tool call offloading** helps reduce the impact of large tool outputs that can noisily clutter the context window. The harness keeps the head and tail tokens and offloads the full output to the filesystem.

**Skills** address the issue of too many tools loaded into context on agent start which degrades performance. Skills are a harness level primitive that solve this via progressive disclosure.

---

## 中文

## 对抗上下文腐烂

Agent 的性能不应该在工作过程中下降。

**上下文腐烂** 描述了模型随着上下文窗口填满而在推理和完成任务方面变得更差的情况。上下文是宝贵且稀缺的资源，因此 Harness 需要策略来管理它。

**压缩** 解决上下文窗口接近填满时该怎么办的问题。Harness 必须为此使用某种策略——智能地卸载和总结现有上下文窗口，以便 Agent 可以继续工作。

**工具调用卸载** 有助于减少大型工具输出的影响，这些输出可能会杂乱地填满上下文窗口。Harness 保留头部和尾部 token，并将完整输出卸载到文件系统。

**Skills** 解决在 Agent 启动时加载过多工具到上下文中导致性能下降的问题。Skills 是 Harness 级别的原语，通过渐进式披露来解决这个问题。

---

## Long Horizon Autonomous Execution

We want agents to complete complex work, autonomously, correctly, over long time horizons.

Autonomous software creation is the holy grail for coding agents. But today's models suffer from early stopping, issues decomposing complex problems, and incoherence as work stretches across multiple context windows.

A good harness has to design around all of this:

- **Filesystems and git** for tracking work across sessions
- **Ralph Loops** for continuing work – intercepts the model's exit attempt via a hook and reinjects the original prompt in a clean context window
- **Planning and self-verification** to stay on track – planning is when a model decomposes a goal into a series of steps

---

## 中文

## 长周期自主执行

我们希望 Agent 能够自主、正确地完成复杂工作，时间跨度很长。

自主软件创作是编码 Agent 的圣杯。但今天的模型存在提前停止、分解复杂问题困难以及跨多个上下文窗口工作时不连贯的问题。

好的 Harness 必须围绕所有这些进行设计：

- **文件系统和 git** 用于跨会话跟踪工作
- **Ralph Loops** 用于继续工作——通过 hook 拦截模型的退出尝试，并在干净的上下文窗口中重新注入原始提示词
- **计划和自我验证** 以保持正轨——计划是模型将目标分解为一系列步骤

---

## The Future of Harnesses

## The Coupling of Model Training and Harness Design

Today's agent products like Claude Code and Codex are post-trained with models and harnesses in the loop. This helps models improve at actions that the harness designers think they should be natively good at like filesystem operations, bash execution, planning, or parallelizing work with subagents.

This creates a feedback loop. Useful primitives are discovered, added to the harness, and then used when training the next generation of models.

But this co-evolution has interesting side effects for generalization. It shows up in ways like how changing tool logic leads to worse model performance.

But this doesn't mean that the best harness for your task is the one a model was post-trained with. **The Terminal Bench 2.0 Leaderboard is a good example. Opus 4.6 in Claude Code scores far below Opus 4.6 in other harnesses.** There's a lot of juice to be squeezed out of optimizing the harness for your task.

---

## 中文

## Harness 的未来

## 模型训练和 Harness 设计的耦合

当今的 Agent 产品如 Claude Code 和 Codex 在训练过程中将模型和 Harness 纳入循环。这有助于模型在 Harness 设计者认为它们应该天生擅长的动作上改进，如文件系统操作、bash 执行、计划或与子 Agent 并行工作。

这创建了一个反馈循环。有用的原语被发现，添加到 Harness，然后用于训练下一代模型。

但这种共同进化对泛化有有趣的副作用。例如，改变工具逻辑会导致模型性能下降。

但这并不意味着最适合你任务的 Harness 是模型后训练时使用的那个。**Terminal Bench 2.0 排行榜就是一个很好的例子。Claude Code 中的 Opus 4.6 得分远低于其他 Harness 中的 Opus 4.6。** 针对你的任务优化 Harness 还有很多空间可以挖掘。

---

## Where Harness Engineering is Going

As models get more capable, some of what lives in the harness today will get absorbed into the model. Models will get better at planning, self-verification, and long horizon coherence natively, thus requiring less context injection.

That suggests harnesses should matter less over time. But just as prompt engineering continues to be valuable today, it's likely that harness engineering will continue to be useful for building good agents.

It's true that harnesses today patch over model deficiencies, but they also engineer systems around model intelligence to make them more effective. A well-configured environment, the right tools, durable state, and verification loops make any model more efficient regardless of its base intelligence.

---

## 中文

## Harness 工程走向何方

随着模型变得更强大，今天存在于 Harness 中的一些东西将被吸收到模型中。模型将在计划、自我验证和长周期一致性方面变得更好，从而需要更少的上下文注入。

这表明 Harness 应该随着时间推移变得不那么重要。但就像提示工程在今天仍然有价值一样，Harness 工程很可能继续对构建好的 Agent 有用。

诚然，今天的 Harness 修补了模型的缺陷，但它们也围绕模型智能设计系统以使其更有效。配置良好的环境、正确的工具、持久的状态和验证循环使任何模型更高效，无论其基础智能如何。

---

## Open Problems

Harness engineering is a very active area of research that we use to improve our harness building library deepagents at LangChain. Here are a few open and interesting problems we're exploring today:

- orchestrating hundreds of agents working in parallel on a shared codebase
- agents that analyze their own traces to identify and fix harness-level failure modes
- harnesses that dynamically assemble the right tools and context just-in-time for a given task instead of being pre-configured

---

## 中文

## 开放问题

Harness 工程是一个非常活跃的研究领域，我们用它来改进在 LangChain 的 Harness 构建库 deepagents。以下是我们目前正在探索的一些开放且有趣的问题：

- 编排数百个 Agent 在共享代码库上并行工作
- 分析自己的 traces 以识别和修复 Harness 级别故障模式的 Agent
- 动态组装正确的工具和上下文以即时完成给定任务的 Harness，而不是预先配置

---

## Conclusion

The model contains the intelligence and the harness is the system that makes that intelligence useful.

To more harness building, better systems, and better agents.

---

## 中文

## 结论

模型包含智能，而 Harness 是使这种智能变得有用的系统。

更多的 Harness 构建，更好的系统，更好的 Agent。

---

*Original by Viv (@Vtrivedy10)*  
*Translation: gmg-clawbot 🦞*
