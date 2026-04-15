---
title: "How Claude Code works"
source: "https://code.claude.com/docs/en/how-claude-code-works"
author:
published:
created: 2026-04-14
description: "Understand the agentic loop, built-in tools, and how Claude Code interacts with your project."
tags:
  - "clippings"
---
Claude Code is an agentic assistant that runs in your terminal. While it excels at coding, it can help with anything you can do from the command line: writing docs, running builds, searching files, researching topics, and more.  
Claude Code 是一款运行在终端中的智能助手。它虽然擅长编码，但也能帮助你完成任何可以通过命令行执行的操作：编写文档、运行构建、搜索文件、研究主题等等。 This guide covers the core architecture, built-in capabilities, and [tips for working effectively](#work-effectively-with-claude-code). For step-by-step walkthroughs, see [Common workflows](https://code.claude.com/docs/en/common-workflows). For extensibility features like skills, MCP, and hooks, see [Extend Claude Code](https://code.claude.com/docs/en/features-overview).  
本指南涵盖核心架构、内置功能以及 [高效工作技巧](#work-effectively-with-claude-code) 。如需分步演练，请参阅 [“常用工作流程”](https://code.claude.com/docs/en/common-workflows) 。如需了解技能、MCP 和钩子等扩展功能，请参阅 [“扩展 Claude 代码”](https://code.claude.com/docs/en/features-overview) 。

## The agentic loop 代理循环

When you give Claude a task, it works through three phases: **gather context**, **take action**, and **verify results**. These phases blend together. Claude uses tools throughout, whether searching files to understand your code, editing to make changes, or running tests to check its work.  
当你给 Claude 布置任务时，它会经历三个阶段： **收集上下文** 、 **执行操作** 和 **验证结果** 。这三个阶段相互交织。Claude 会在整个过程中使用各种工具，例如搜索文件以理解你的代码、编辑文件以进行修改，或者运行测试来检查其工作情况。![The agentic loop: Your prompt leads to Claude gathering context, taking action, verifying results, and repeating until task complete. You can interrupt at any point.](https://mintcdn.com/claude-code/c5r9_6tjPMzFdDDT/images/agentic-loop.svg?w=2500&fit=max&auto=format&n=c5r9_6tjPMzFdDDT&q=85&s=dfee4a0224b22047f2fecdaf8b3eba3e)

The agentic loop: Your prompt leads to Claude gathering context, taking action, verifying results, and repeating until task complete. You can interrupt at any point.

The loop adapts to what you ask. A question about your codebase might only need context gathering. A bug fix cycles through all three phases repeatedly. A refactor might involve extensive verification. Claude decides what each step requires based on what it learned from the previous step, chaining dozens of actions together and course-correcting along the way.  
循环会根据你的问题进行调整。关于代码库的问题可能只需要收集上下文信息。修复 bug 会反复循环所有三个阶段。重构可能需要大量的验证。Claude 会根据从上一步中学到的信息来决定每个步骤需要做什么，将数十个操作串联起来，并在过程中不断调整方向。 You’re part of this loop too. You can interrupt at any point to steer Claude in a different direction, provide additional context, or ask it to try a different approach. Claude works autonomously but stays responsive to your input.  
你也是这个循环的一部分。你可以随时打断它，引导克劳德朝不同的方向前进，提供更多背景信息，或者让它尝试不同的方法。克劳德会自主运行，但始终会对你的输入做出响应。 The agentic loop is powered by two components: [models](#models) that reason and [tools](#tools) that act. Claude Code serves as the **agentic harness** around Claude: it provides the tools, context management, and execution environment that turn a language model into a capable coding agent.  
智能体循环由两个组件驱动：推理 [模型](#models) 和执行 [工具](#tools) 。Claude Code 作为 Claude 的 **智能体框架** ：它提供工具、上下文管理和执行环境，将语言模型转化为功能强大的编码智能体。

### Models 模型

Claude Code uses Claude models to understand your code and reason about tasks. Claude can read code in any language, understand how components connect, and figure out what needs to change to accomplish your goal. For complex tasks, it breaks work into steps, executes them, and adjusts based on what it learns.  
Claude Code 使用 Claude 模型来理解您的代码并进行任务推理。Claude 可以读取任何语言的代码，理解组件之间的连接方式，并找出实现目标所需的更改。对于复杂的任务，它会将工作分解成多个步骤，逐一执行，并根据学习到的信息进行调整。 [Multiple models](https://code.claude.com/docs/en/model-config) are available with different tradeoffs. Sonnet handles most coding tasks well. Opus provides stronger reasoning for complex architectural decisions. Switch with `/model` during a session or start with `claude --model <name>`.  
[有多种模型](https://code.claude.com/docs/en/model-config) 可供选择，各有优缺点。Sonnet 可以很好地处理大多数编码任务。Opus 为复杂的架构决策提供了更强大的推理能力。在会话期间使用 `/model` 切换模型，或使用 `claude --model <name>` 启动。 When this guide says “Claude chooses” or “Claude decides,” it’s the model doing the reasoning.  
本指南中所说的“克劳德选择”或“克劳德决定”是指模型进行推理。

### Tools 工具

Tools are what make Claude Code agentic. Without tools, Claude can only respond with text. With tools, Claude can act: read your code, edit files, run commands, search the web, and interact with external services. Each tool use returns information that feeds back into the loop, informing Claude’s next decision.  
工具赋予了 Claude Code 自主行动的能力。没有工具，Claude 只能回复文本。有了工具，Claude 就能采取行动：读取代码、编辑文件、运行命令、搜索网络以及与外部服务交互。每次使用工具都会返回信息，这些信息会反馈到循环中，为 Claude 的下一步决策提供依据。 The built-in tools generally fall into five categories, each representing a different kind of agency.  
内置工具大致分为五类，每一类都代表一种不同的代理类型。

| Category 类别 | What Claude can do 克劳德能做什么 |
| --- | --- |
| **File operations 文件操作** | Read files, edit code, create new files, rename and reorganize   读取文件、编辑代码、创建新文件、重命名和重新组织文件 |
| **Search 搜索** | Find files by pattern, search content with regex, explore codebases   按模式查找文件，使用正则表达式搜索内容，浏览代码库 |
| **Execution 执行** | Run shell commands, start servers, run tests, use git   运行 shell 命令、启动服务器、运行测试、使用 Git |
| **Web 网站** | Search the web, fetch documentation, look up error messages   搜索网络，获取文档，查找错误信息 |
| **Code intelligence 代码智能** | See type errors and warnings after edits, jump to definitions, find references (requires [code intelligence plugins](https://code.claude.com/docs/en/discover-plugins#code-intelligence))   编辑后查看类型错误和警告，跳转到定义，查找引用（需要 [代码智能插件](https://code.claude.com/docs/en/discover-plugins#code-intelligence) ） |

These are the primary capabilities. Claude also has tools for spawning subagents, asking you questions, and other orchestration tasks. See [Tools available to Claude](https://code.claude.com/docs/en/tools-reference) for the complete list.  
这些是主要功能。Claude 还提供用于生成子代理、向您提问以及其他编排任务的工具。有关完整列表，请参阅 [“Claude 可用工具”](https://code.claude.com/docs/en/tools-reference) 。 Claude chooses which tools to use based on your prompt and what it learns along the way. When you say “fix the failing tests,” Claude might:  
Claude 会根据你的提示以及它在此过程中学习到的信息来选择使用哪些工具。当你说“修复失败的测试”时，Claude 可能会：
1. Run the test suite to see what’s failing  
	运行测试套件，查看哪些测试失败。
2. Read the error output  
	读取错误输出
3. Search for the relevant source files  
	查找相关源文件
4. Read those files to understand the code  
	阅读这些文件以了解代码
5. Edit the files to fix the issue  
	编辑文件以修复此问题
6. Run the tests again to verify  
	再次运行测试以验证
Each tool use gives Claude new information that informs the next step. This is the agentic loop in action.  
克劳德每次使用工具都会获得新的信息，这些信息会指导他下一步的操作。这就是能动循环的运作方式。 **Extending the base capabilities:** The built-in tools are the foundation. You can extend what Claude knows with [skills](https://code.claude.com/docs/en/skills), connect to external services with [MCP](https://code.claude.com/docs/en/mcp), automate workflows with [hooks](https://code.claude.com/docs/en/hooks), and offload tasks to [subagents](https://code.claude.com/docs/en/sub-agents). These extensions form a layer on top of the core agentic loop. See [Extend Claude Code](https://code.claude.com/docs/en/features-overview) for guidance on choosing the right extension for your needs.  
**扩展基础功能：** 内置工具是基础。您可以利用 [技能](https://code.claude.com/docs/en/skills) 扩展 Claude 的认知范围，利用 [MCP](https://code.claude.com/docs/en/mcp) 连接外部服务，利用 [钩子](https://code.claude.com/docs/en/hooks) 自动化工作流程，并将任务卸载给 [子代理](https://code.claude.com/docs/en/sub-agents) 。这些扩展在核心代理循环之上构成了一个额外的层。请参阅 [“扩展 Claude 代码”](https://code.claude.com/docs/en/features-overview) 以获取有关如何选择适合您需求的扩展的指导。

## What Claude can access 克劳德可以访问什么

This guide focuses on the terminal. Claude Code also runs in [VS Code](https://code.claude.com/docs/en/vs-code), [JetBrains IDEs](https://code.claude.com/docs/en/jetbrains), and other environments.  
本指南主要介绍终端操作。Claude Code 也可在 [VS Code](https://code.claude.com/docs/en/vs-code) 、 [JetBrains IDE](https://code.claude.com/docs/en/jetbrains) 和其他环境中运行。 When you run `claude` in a directory, Claude Code gains access to:  
当您在某个目录中运行 `claude` 时，Claude Code 将获得以下访问权限：
- **Your project.** Files in your directory and subdirectories, plus files elsewhere with your permission.  
	**您的项目。** 包括您目录及其子目录中的文件，以及经您许可的其他位置的文件。
- **Your terminal.** Any command you could run: build tools, git, package managers, system utilities, scripts. If you can do it from the command line, Claude can too.  
	**你的终端。** 任何你能运行的命令：构建工具、git、包管理器、系统实用程序、脚本。只要你能从命令行做到的，Claude 也能做到。
- **Your git state.** Current branch, uncommitted changes, and recent commit history.  
	**你的 Git 状态。** 当前分支、未提交的更改和最近的提交历史记录。
- **Your [CLAUDE.md](https://code.claude.com/docs/en/memory).** A markdown file where you store project-specific instructions, conventions, and context that Claude should know every session.  
	**你的 [CLAUDE.md](https://code.claude.com/docs/en/memory) 文件。** 这是一个 markdown 文件，用于存储 Claude 在每个会话中应该知道的项目特定说明、约定和上下文。
- **[Auto memory](https://code.claude.com/docs/en/memory#auto-memory).** Learnings Claude saves automatically as you work, like project patterns and your preferences. The first 200 lines or 25KB of MEMORY.md, whichever comes first, load at the start of each session.  
	**[自动记忆](https://code.claude.com/docs/en/memory#auto-memory) 。Claude** 会在您工作时自动保存学习成果，例如项目模式和您的偏好设置。每次会话开始时，都会加载 MEMORY.md 文件的前 200 行或 25KB（以先到者为准）。
- **Extensions you configure.** [MCP servers](https://code.claude.com/docs/en/mcp) for external services, [skills](https://code.claude.com/docs/en/skills) for workflows, [subagents](https://code.claude.com/docs/en/sub-agents) for delegated work, and [Claude in Chrome](https://code.claude.com/docs/en/chrome) for browser interaction.  
	**您配置的扩展程序包括：** 用于外部服务的 [MCP 服务器](https://code.claude.com/docs/en/mcp) 、用于工作流的 [技能](https://code.claude.com/docs/en/skills) 、用于委派工作的 [子代理](https://code.claude.com/docs/en/sub-agents) ，以及用于浏览器交互的 [Chrome 中的 Claude](https://code.claude.com/docs/en/chrome) 。
Because Claude sees your whole project, it can work across it. When you ask Claude to “fix the authentication bug,” it searches for relevant files, reads multiple files to understand context, makes coordinated edits across them, runs tests to verify the fix, and commits the changes if you ask. This is different from inline code assistants that only see the current file.  
由于 Claude 可以查看整个项目，因此它可以跨项目工作。当您让 Claude “修复身份验证错误”时，它会搜索相关文件，读取多个文件以了解上下文，协调地编辑这些文件，运行测试以验证修复，并在您要求时提交更改。这与只能查看当前文件的内联代码助手不同。

## Environments and interfaces环境和接口

The agentic loop, tools, and capabilities described above are the same everywhere you use Claude Code. What changes is where the code executes and how you interact with it.  
上述的代理循环、工具和功能在 Claude Code 的所有使用环境中都相同。变化的是代码的执行位置以及您与代码的交互方式。

### Execution environments 执行环境

Claude Code runs in three environments, each with different tradeoffs for where your code executes.  
Claude Code 在三种环境下运行，每种环境对代码的执行位置都有不同的权衡取舍。

| Environment 环境 | Where code runs 代码运行位置 | Use case 用例 |
| --- | --- | --- |
| **Local 当地的** | Your machine 您的机器 | Default. Full access to your files, tools, and environment   默认设置。完全访问您的文件、工具和环境 |
| **Cloud 云** | Anthropic-managed VMs 人类管理的虚拟机 | Offload tasks, work on repos you don’t have locally   卸载任务，处理本地没有的代码库 |
| **Remote Control 遥控** | Your machine, controlled from a browser   您的设备，可通过浏览器控制 | Use the web UI while keeping everything local   使用 Web 用户界面，同时保持所有内容本地化。 |

### Interfaces 接口

You can access Claude Code through the terminal, the [desktop app](https://code.claude.com/docs/en/desktop), [IDE extensions](https://code.claude.com/docs/en/vs-code), [claude.ai/code](https://claude.ai/code), [Remote Control](https://code.claude.com/docs/en/remote-control), [Slack](https://code.claude.com/docs/en/slack), and [CI/CD pipelines](https://code.claude.com/docs/en/github-actions). The interface determines how you see and interact with Claude, but the underlying agentic loop is identical. See [Use Claude Code everywhere](https://code.claude.com/docs/en/overview#use-claude-code-everywhere) for the full list.  
您可以通过终端、 [桌面应用程序](https://code.claude.com/docs/en/desktop) 、 [IDE 扩展](https://code.claude.com/docs/en/vs-code) 、 [claude.ai/](https://claude.ai/code) code、 [远程控制](https://code.claude.com/docs/en/remote-control) 、 [Slack](https://code.claude.com/docs/en/slack) 和 [CI/CD 流水线](https://code.claude.com/docs/en/github-actions) 访问 Claude Code。界面决定了您查看和与 Claude 交互的方式，但底层代理循环是相同的。有关完整列表，请参阅 [“在任何地方使用 Claude Code”](https://code.claude.com/docs/en/overview#use-claude-code-everywhere) 。

## Work with sessions 与会议合作

Claude Code saves your conversation locally as you work. Each message, tool use, and result is written to a plaintext JSONL file under `~/.claude/projects/`, which enables [rewinding](#undo-changes-with-checkpoints), [resuming, and forking](#resume-or-fork-sessions) sessions. Before Claude makes code changes, it also snapshots the affected files so you can revert if needed. For paths, retention, and how to clear this data, see [application data in `~/.claude`](https://code.claude.com/docs/en/claude-directory#application-data).  
Claude Code 会在您工作时将对话保存到本地。每条消息、工具使用情况和结果都会写入 `~/.claude/projects/` 目录下的纯文本 JSONL 文件，这使得您可以 [回滚](#undo-changes-with-checkpoints) 、 [恢复和创建](#resume-or-fork-sessions) 会话。在 Claude 进行代码更改之前，它还会对受影响的文件进行快照，以便您在需要时进行还原。有关路径、保留期限以及如何清除此数据，请参阅 [`~/.claude` 中的应用程序数据](https://code.claude.com/docs/en/claude-directory#application-data) 。 **Sessions are independent.** Each new session starts with a fresh context window, without the conversation history from previous sessions. Claude can persist learnings across sessions using [auto memory](https://code.claude.com/docs/en/memory#auto-memory), and you can add your own persistent instructions in [CLAUDE.md](https://code.claude.com/docs/en/memory).  
**会话是独立的。** 每个新会话都会启动一个全新的上下文窗口，不会继承之前会话的对话历史记录。Claude 可以使用 [自动记忆功能](https://code.claude.com/docs/en/memory#auto-memory) 跨会话保存学习成果，您也可以在 [CLAUDE.md 文件](https://code.claude.com/docs/en/memory) 中添加自定义的持久化指令。

### Work across branches 跨部门协作

Each Claude Code conversation is a session tied to your current directory. When you resume, you only see sessions from that directory.  
每个 Claude Code 对话都是一个与当前目录关联的会话。恢复对话后，您只会看到该目录中的会话。 Claude sees your current branch’s files. When you switch branches, Claude sees the new branch’s files, but your conversation history stays the same. Claude remembers what you discussed even after switching.  
Claude 可以看到你当前分支的文件。当你切换分支时，Claude 会看到新分支的文件，但你们的对话记录保持不变。即使切换分支后，Claude 仍然会记住你们讨论过的内容。 Since sessions are tied to directories, you can run parallel Claude sessions by using [git worktrees](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees), which create separate directories for individual branches.  
由于会话与目录绑定，因此可以使用 [git 工作树](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees) 来运行并行的 Claude 会话，git 工作树会为各个分支创建单独的目录。

### Resume or fork sessions 恢复或分叉会话

When you resume a session with `claude --continue` or `claude --resume`, you pick up where you left off using the same session ID. New messages append to the existing conversation. Your full conversation history is restored, but session-scoped permissions are not. You’ll need to re-approve those.  
使用 `claude --continue` 或 `claude --resume` 命令恢复会话时，您将使用相同的会话 ID 从上次中断的地方继续。新消息将追加到现有对话中。您的完整对话历史记录将被恢复，但会话范围的权限不会被恢复。您需要重新授予这些权限。![Session continuity: resume continues the same session, fork creates a new branch with a new ID.](https://mintcdn.com/claude-code/c5r9_6tjPMzFdDDT/images/session-continuity.svg?w=2500&fit=max&auto=format&n=c5r9_6tjPMzFdDDT&q=85&s=d83b5f81e9d6d42d2bff0daa44d6a3ec)

Session continuity: resume continues the same session, fork creates a new branch with a new ID.

To branch off and try a different approach without affecting the original session, use the `--fork-session` flag:  
要在不影响原始会话的情况下尝试不同的方法，请使用 `--fork-session` 标志：

```shellscript
claude --continue --fork-session
```

This creates a new session ID while preserving the conversation history up to that point. The original session remains unchanged. Like resume, forked sessions don’t inherit session-scoped permissions.  
这将创建一个新的会话 ID，同时保留到目前为止的对话历史记录。原始会话保持不变。与恢复会话类似，分叉的会话不会继承会话范围的权限。 **Same session in multiple terminals**: If you resume the same session in multiple terminals, both terminals write to the same session file. Messages from both get interleaved, like two people writing in the same notebook. Nothing corrupts, but the conversation becomes jumbled. Each terminal only sees its own messages during the session, but if you resume that session later, you’ll see everything interleaved. For parallel work from the same starting point, use `--fork-session` to give each terminal its own clean session.  
**在多个终端中恢复同一会话** ：如果您在多个终端中恢复同一会话，则所有终端都会写入同一个会话文件。来自两个终端的消息会交错显示，就像两个人同时在同一个笔记本上写作一样。虽然不会造成数据损坏，但对话内容会变得混乱。在会话期间，每个终端只能看到自己的消息，但如果您稍后恢复该会话，则会看到所有消息交错显示。要从同一起点并行工作，请使用 `--fork-session` 为每个终端分配一个独立的会话。

### The context window 上下文窗口

Claude’s context window holds your conversation history, file contents, command outputs, [CLAUDE.md](https://code.claude.com/docs/en/memory), [auto memory](https://code.claude.com/docs/en/memory#auto-memory), loaded skills, and system instructions. As you work, context fills up. Claude compacts automatically, but instructions from early in the conversation can get lost. Put persistent rules in CLAUDE.md, and run `/context` to see what’s using space.  
Claude 的上下文窗口会显示你的对话历史记录、文件内容、命令输出、 [CLAUDE.md](https://code.claude.com/docs/en/memory) 文件、 [自动记忆](https://code.claude.com/docs/en/memory#auto-memory) 、已加载技能和系统指令。随着你的操作，上下文窗口会逐渐被填满。Claude 会自动压缩上下文，但对话早期的一些指令可能会丢失。你可以在 CLAUDE.md 文件中添加持久化规则，然后运行 `/context` 来查看哪些内容占用了空间。 For an interactive walkthrough of what loads and when, see [Explore the context window](https://code.claude.com/docs/en/context-window).  
要查看加载内容及其加载时间的交互式演练，请参阅 [“探索上下文窗口”](https://code.claude.com/docs/en/context-window) 。

#### When context fills up 当上下文填满时

Claude Code manages context automatically as you approach the limit. It clears older tool outputs first, then summarizes the conversation if needed. Your requests and key code snippets are preserved; detailed instructions from early in the conversation may be lost. Put persistent rules in CLAUDE.md rather than relying on conversation history.  
当您接近限制时，Claude Code 会自动管理上下文。它会先清除较早的工具输出，然后在需要时总结对话。您的请求和关键代码片段会被保留；但对话早期的一些详细说明可能会丢失。建议您将持久规则放在 CLAUDE.md 文件中，而不是依赖对话历史记录。 To control what’s preserved during compaction, add a “Compact Instructions” section to CLAUDE.md or run `/compact` with a focus (like `/compact focus on the API changes`).  
要控制压缩过程中保留的内容，请在 CLAUDE.md 中添加“压缩说明”部分，或者运行 `/compact` 并聚焦（例如 `/compact focus on the API changes` ）。 If a single file or tool output is so large that context refills immediately after each summary, Claude Code stops auto-compacting after a few attempts and shows an error instead of looping. See [Auto-compaction stops with a thrashing error](https://code.claude.com/docs/en/troubleshooting#auto-compaction-stops-with-a-thrashing-error) for recovery steps.  
如果单个文件或工具输出过大，导致每次摘要后上下文立即重新填充，Claude Code 会在几次尝试后停止自动压缩并显示错误，而不是循环执行。有关恢复步骤，请参阅 [“自动压缩停止并出现抖动错误”](https://code.claude.com/docs/en/troubleshooting#auto-compaction-stops-with-a-thrashing-error) 。 Run `/context` to see what’s using space. MCP tool definitions are deferred by default and loaded on demand via [tool search](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search), so only tool names consume context until Claude uses a specific tool. Run `/mcp` to check per-server costs.  
运行 `/context` 查看空间占用情况。MCP 工具定义默认延迟加载，并通过 [工具搜索](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search) 按需加载，因此只有工具名称会占用上下文，直到 Claude 使用特定工具为止。运行 `/mcp` 查看每个服务器的成本。

#### Manage context with skills and subagents利用技能和子代理管理上下文

Beyond compaction, you can use other features to control what loads into context.  
除了压缩之外，您还可以使用其他功能来控制加载到上下文中的内容。 [Skills](https://code.claude.com/docs/en/skills) load on demand. Claude sees skill descriptions at session start, but the full content only loads when a skill is used. For skills you invoke manually, set `disable-model-invocation: true` to keep descriptions out of context until you need them.  
[技能](https://code.claude.com/docs/en/skills) 按需加载。Claude 在会话开始时可以看到技能描述，但只有在使用技能时才会加载完整内容。对于手动调用的技能，请设置 `disable-model-invocation: true` ，以便在需要时才显示描述。 [Subagents](https://code.claude.com/docs/en/sub-agents) get their own fresh context, completely separate from your main conversation. Their work doesn’t bloat your context. When done, they return a summary. This isolation is why subagents help with long sessions.  
[子代理](https://code.claude.com/docs/en/sub-agents) 拥有独立于主对话之外的全新上下文。它们的工作不会使上下文变得臃肿。完成后，它们会返回一个摘要。正是这种隔离性使得子代理有助于长时间会话。 See [context costs](https://code.claude.com/docs/en/features-overview#understand-context-costs) for what each feature costs, and [reduce token usage](https://code.claude.com/docs/en/costs#reduce-token-usage) for tips on managing context.  
查看 [上下文成本](https://code.claude.com/docs/en/features-overview#understand-context-costs) ，了解每项功能的成本，并 [减少令牌使用量](https://code.claude.com/docs/en/costs#reduce-token-usage) ，获取管理上下文的技巧。

## Stay safe with checkpoints and permissions通过检查站和许可制度确保安全。

Claude has two safety mechanisms: checkpoints let you undo file changes, and permissions control what Claude can do without asking.  
Claude 具有两种安全机制：检查点允许您撤销文件更改，权限控制 Claude 在未经询问的情况下可以执行哪些操作。

### Undo changes with checkpoints使用检查点撤销更改

**Every file edit is reversible.** Before Claude edits any file, it snapshots the current contents. If something goes wrong, press `Esc` twice to rewind to a previous state, or ask Claude to undo.  
**所有文件编辑都是可逆的。** 在 Claude 编辑任何文件之前，它都会对当前内容进行快照。如果出现问题，按两次 `Esc` 即可回滚到之前的状态，或者让 Claude 撤销操作。 Checkpoints are local to your session, separate from git. They only cover file changes. Actions that affect remote systems (databases, APIs, deployments) can’t be checkpointed, which is why Claude asks before running commands with external side effects.  
检查点仅限于您的会话，与 Git 无关。它们仅涵盖文件更改。影响远程系统（数据库、API、部署）的操作无法创建检查点，这就是为什么 Claude 会在运行具有外部副作用的命令之前询问的原因。

### Control what Claude can do控制克劳德能做什么

Press `Shift+Tab` to cycle through permission modes:  
按 `Shift+Tab` 可在权限模式之间切换：
- **Default**: Claude asks before file edits and shell commands  
	**默认设置** ：Claude 会在编辑文件和执行 shell 命令前询问。
- **Auto-accept edits**: Claude edits files and runs common filesystem commands like `mkdir` and `mv` without asking, still asks for other commands  
	**自动接受编辑** ：Claude 会自动编辑文件并运行常见的文件系统命令（例如 `mkdir` 和 `mv` ，无需询问，但仍会询问其他命令。
- **Plan mode**: Claude uses read-only tools only, creating a plan you can approve before execution  
	**计划模式** ：Claude 仅使用只读工具，创建计划供您在执行前审批。
- **Auto mode**: Claude evaluates all actions with background safety checks. Currently a research preview  
	**自动模式** ：Claude 会对所有操作进行后台安全检查。目前为研究预览版。
You can also allow specific commands in `.claude/settings.json` so Claude doesn’t ask each time. This is useful for trusted commands like `npm test` or `git status`. Settings can be scoped from organization-wide policies down to personal preferences. See [Permissions](https://code.claude.com/docs/en/permissions) for details.  
您还可以在 `.claude/settings.json` 中允许特定命令，这样 Claude 就无需每次都询问。这对于像 `npm test` 或 `git status` 这样的受信任命令非常有用。设置的范围可以从组织级策略到个人偏好。详情请参阅 [“权限”部分](https://code.claude.com/docs/en/permissions) 。

---

## Work effectively with Claude Code与 Claude Code 有效合作

These tips help you get better results from Claude Code.  
这些技巧可以帮助您更好地使用 Claude Code。

### Ask Claude Code for help请向克劳德·科德寻求帮助

Claude Code can teach you how to use it. Ask questions like “how do I set up hooks?” or “what’s the best way to structure my CLAUDE.md?” and Claude will explain.  
Claude Code 可以教你如何使用它。你可以问一些问题，比如“如何设置钩子？”或者“CLAUDE.md 文件的最佳结构是什么？”，Claude 会为你解答。 Built-in commands also guide you through setup:  
内置命令还可以指导您完成设置：
- `/init` walks you through creating a CLAUDE.md for your project  
	`/init` 会引导您为项目创建 CLAUDE.md 文件。
- `/agents` helps you configure custom subagents  
	`/agents` 帮助您配置自定义子代理
- `/doctor` diagnoses common issues with your installation  
	`/doctor` 诊断您的安装常见问题

### It’s a conversation 这是一场对话

Claude Code is conversational. You don’t need perfect prompts. Start with what you want, then refine:  
Claude Code 采用对话式方法。你不需要完美的提示。从你想要表达的内容开始，然后逐步完善：

```text
Fix the login bug
```

\[Claude investigates, tries something\]  
\[克劳德展开调查，尝试了一些方法\]

```text
That's not quite right. The issue is in the session handling.
```

\[Claude adjusts approach\]  
\[克劳德调整策略\] When the first attempt isn’t right, you don’t start over. You iterate.  
第一次尝试不成功时，不要从头开始，而是反复迭代。

#### Interrupt and steer 打断并引导

You can interrupt Claude at any point. If it’s going down the wrong path, just type your correction and press Enter. Claude will stop what it’s doing and adjust its approach based on your input. You don’t have to wait for it to finish or start over.  
你可以随时打断克劳德的行动。如果它走错了方向，只需输入你的修改意见并按回车键。克劳德会停止当前操作，并根据你的输入调整策略。你无需等待它完成或重新开始。

### Be specific upfront 务必提前明确说明。

The more precise your initial prompt, the fewer corrections you’ll need. Reference specific files, mention constraints, and point to example patterns.  
你的初始提示越精确，需要修改的地方就越少。请引用具体文件，说明限制条件，并提供示例模式。

```text
The checkout flow is broken for users with expired cards.
Check src/payments/ for the issue, especially token refresh.
Write a failing test first, then fix it.
```

Vague prompts work, but you’ll spend more time steering. Specific prompts like the one above often succeed on the first attempt.  
模糊的提示虽然有效，但你会花更多时间在操控上。像上面那样具体的提示往往一次就能成功。

### Give Claude something to verify against给克劳德一些可以用来验证的东西

Claude performs better when it can check its own work. Include test cases, paste screenshots of expected UI, or define the output you want.  
Claude 在能够检查自身工作结果时表现更佳。请添加测试用例、粘贴预期 UI 的屏幕截图，或定义所需的输出。

```text
Implement validateEmail. Test cases: 'user@example.com' → true,
'invalid' → false, 'user@.com' → false. Run the tests after.
```

For visual work, paste a screenshot of the design and ask Claude to compare its implementation against it.  
对于视觉设计，请粘贴设计图的截图，并请 Claude 将其实现与设计图进行比较。

### Explore before implementing在实施前进行探索

For complex problems, separate research from coding. Use plan mode (`Shift+Tab` twice) to analyze the codebase first:  
对于复杂问题，应将研究与编码分开。首先使用计划模式（ `Shift+Tab` 两次）分析代码库：

```text
Read src/auth/ and understand how we handle sessions.
Then create a plan for adding OAuth support.
```

Review the plan, refine it through conversation, then let Claude implement. This two-phase approach produces better results than jumping straight to code.  
审阅计划，通过讨论加以完善，然后让克劳德执行。这种两阶段方法比直接编写代码效果更好。

### Delegate, don’t dictate 授权，不要独断专行

Think of delegating to a capable colleague. Give context and direction, then trust Claude to figure out the details:  
考虑将任务委托给一位能干的同事。提供背景信息和方向，然后相信克劳德会处理好细节：

```text
The checkout flow is broken for users with expired cards.
The relevant code is in src/payments/. Can you investigate and fix it?
```

You don’t need to specify which files to read or what commands to run. Claude figures that out.  
你不需要指定要读取哪些文件或运行哪些命令，克劳德会自动处理。