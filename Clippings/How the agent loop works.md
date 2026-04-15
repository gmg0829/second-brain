---
title: "How the agent loop works"
source: "https://code.claude.com/docs/en/agent-sdk/agent-loop"
author:
published:
created: 2026-04-14
description: "Understand the message lifecycle, tool execution, context window, and architecture that power your SDK agents."
tags:
  - "clippings"
---
The Agent SDK lets you embed Claude Code’s autonomous agent loop in your own applications. The SDK is a standalone package that gives you programmatic control over tools, permissions, cost limits, and output. You don’t need the Claude Code CLI installed to use it.  
Agent SDK 允许您将 Claude Code 的自主代理循环嵌入到您自己的应用程序中。该 SDK 是一个独立的软件包，可让您以编程方式控制工具、权限、成本限制和输出。您无需安装 Claude Code CLI 即可使用它。 When you start an agent, the SDK runs the same [execution loop that powers Claude Code](https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop): Claude evaluates your prompt, calls tools to take action, receives the results, and repeats until the task is complete. This page explains what happens inside that loop so you can build, debug, and optimize your agents effectively.  
启动代理时，SDK 会运行 [与 Claude Code 相同的执行循环](https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop) ：Claude 会评估您的提示，调用工具执行操作，接收结果，然后重复此过程直至任务完成。本页将解释该循环内部发生的情况，以便您能够有效地构建、调试和优化代理。

## The loop at a glance循环概览

Every agent session follows the same cycle:  
每次代理会话都遵循相同的流程：![Agent loop: prompt enters, Claude evaluates, branches to tool calls or final answer](https://mintcdn.com/claude-code/gvy2DIUELtNA8qD3/images/agent-loop-diagram.svg?w=2500&fit=max&auto=format&n=gvy2DIUELtNA8qD3&q=85&s=354e2d1dfdb65dfc337052188a072265)

Agent loop: prompt enters, Claude evaluates, branches to tool calls or final answer

1. **Receive prompt.** Claude receives your prompt, along with the system prompt, tool definitions, and conversation history. The SDK yields a [`SystemMessage`](#message-types) with subtype `"init"` containing session metadata.  
	**接收提示。Claude** 会收到您的提示，以及系统提示、工具定义和对话历史记录。SDK 会生成一个子类型为 `"init"` 的 [`SystemMessage`](#message-types) ，其中包含会话元数据。
2. **Evaluate and respond.** Claude evaluates the current state and determines how to proceed. It may respond with text, request one or more tool calls, or both. The SDK yields an [`AssistantMessage`](#message-types) containing the text and any tool call requests.  
	**评估并响应。Claude** 会评估当前状态并确定下一步操作。它可能会以文本形式响应，请求一个或多个工具调用，或者两者都执行。SDK 会生成一个包含文本和所有工具调用请求的 [`AssistantMessage`](#message-types) 。
3. **Execute tools.** The SDK runs each requested tool and collects the results. Each set of tool results feeds back to Claude for the next decision. You can use [hooks](https://code.claude.com/docs/en/agent-sdk/hooks) to intercept, modify, or block tool calls before they run.  
	**执行工具。SDK** 会运行每个请求的工具并收集结果。每组工具结果都会反馈给 Claude，用于下一步决策。您可以使用 [钩子](https://code.claude.com/docs/en/agent-sdk/hooks) 在工具运行前拦截、修改或阻止工具调用。
4. **Repeat.** Steps 2 and 3 repeat as a cycle. Each full cycle is one turn. Claude continues calling tools and processing results until it produces a response with no tool calls.  
	**重复。** 步骤 2 和 3 循环重复。每个完整循环为一回合。Claude 会持续调用工具并处理结果，直到不再调用工具且产生响应为止。
5. **Return result.** The SDK yields a final [`AssistantMessage`](#message-types) with the text response (no tool calls), followed by a [`ResultMessage`](#message-types) with the final text, token usage, cost, and session ID.  
	**返回结果。SDK** 会返回一个包含文本响应（不调用任何工具）的最终 [`AssistantMessage`](#message-types) ，随后返回一个包含最终文本、令牌使用情况、费用和会话 ID 的 [`ResultMessage`](#message-types) 。
A quick question (“what files are here?”) might take one or two turns of calling `Glob` and responding with the results. A complex task (“refactor the auth module and update the tests”) can chain dozens of tool calls across many turns, reading files, editing code, and running tests, with Claude adjusting its approach based on each result.  
一个简单的问题（“这里有哪些文件？”）可能只需要调用 `Glob` 一两次并返回结果。而一个复杂的任务（“重构身份验证模块并更新测试”）则可能需要调用数十个工具，经过多次迭代，包括读取文件、编辑代码和运行测试，Claude 会根据每个结果调整其方法。

## Turns and messages 轮次和信息

A turn is one round trip inside the loop: Claude produces output that includes tool calls, the SDK executes those tools, and the results feed back to Claude automatically. This happens without yielding control back to your code. Turns continue until Claude produces output with no tool calls, at which point the loop ends and the final result is delivered.  
一次循环是指循环内的一个往返：Claude 生成包含工具调用的输出，SDK 执行这些工具，并将结果自动反馈给 Claude。整个过程无需将控制权交还给你的代码。循环持续进行，直到 Claude 不再生成任何工具调用的输出为止，此时循环结束，并输出最终结果。 Consider what a full session might look like for the prompt “Fix the failing tests in auth.ts”.  
设想一下，对于“修复 auth.ts 中失败的测试”这个提示，完整的会话可能会是什么样子。 First, the SDK sends your prompt to Claude and yields a [`SystemMessage`](#message-types) with the session metadata. Then the loop begins:  
首先，SDK 会将您的提示发送给 Claude，并返回包含会话元数据的 [`SystemMessage`](#message-types) 消息。然后循环开始：
1. **Turn 1:** Claude calls `Bash` to run `npm test`. The SDK yields an [`AssistantMessage`](#message-types) with the tool call, executes the command, then yields a [`UserMessage`](#message-types) with the output (three failures).  
	**第一回合：** Claude 调用 `Bash` 运行 `npm test` 会返回一个包含工具调用信息 [`AssistantMessage`](#message-types) ，执行该命令，然后返回一个包含输出信息的 [`UserMessage`](#message-types) （三次失败）。
2. **Turn 2:** Claude calls `Read` on `auth.ts` and `auth.test.ts`. The SDK returns the file contents and yields an `AssistantMessage`.  
	**第二回合：** Claude 调用 `auth.ts` 和 `auth.test.ts` 的 `Read` 函数。SDK 返回文件内容并生成一个 `AssistantMessage` 。
3. **Turn 3:** Claude calls `Edit` to fix `auth.ts`, then calls `Bash` to re-run `npm test`. All three tests pass. The SDK yields an `AssistantMessage`.  
	**第三步：** Claude 调用 `Edit` 修复 `auth.ts` ，然后调用 `Bash` 重新运行 `npm test` 。所有三个测试都通过了。SDK 返回一个 `AssistantMessage` 对象。
4. **Final turn:** Claude produces a text-only response with no tool calls: “Fixed the auth bug, all three tests pass now.” The SDK yields a final `AssistantMessage` with this text, then a [`ResultMessage`](#message-types) with the same text plus cost and usage.  
	**最后一步：** Claude 生成一条纯文本响应，不调用任何工具：“已修复身份验证错误，所有三个测试现在都通过了。” SDK 会生成一条包含此文本的最终 `AssistantMessage` ，然后生成一条包含相同文本以及费用和使用情况 [`ResultMessage`](#message-types) 。
That was four turns: three with tool calls, one final text-only response.  
一共四轮：三轮使用工具呼叫，最后一轮仅回复文字。 You can cap the loop with `max_turns` / `maxTurns`, which counts tool-use turns only. For example, `max_turns=2` in the loop above would have stopped before the edit step. You can also use `max_budget_usd` / `maxBudgetUsd` to cap turns based on a spend threshold.  
您可以使用 `max_turns` / `maxTurns` 来限制循环次数，该参数仅计算工具使用次数。例如，如果上述循环中的 `max_turns=2` 则循环会在编辑步骤之前停止。您还可以使用 `max_budget_usd` / `maxBudgetUsd` 根据支出阈值来限制循环次数。 Without limits, the loop runs until Claude finishes on its own, which is fine for well-scoped tasks but can run long on open-ended prompts (“improve this codebase”). Setting a budget is a good default for production agents. See [Turns and budget](#turns-and-budget) below for the option reference.  
如果没有限制，循环会一直运行直到 Claude 自行完成，这对于范围明确的任务来说没问题，但对于开放式提示（例如“改进此代码库”）则可能会运行很长时间。为生产环境代理设置预算是一个不错的默认设置。有关选项的参考，请参阅下文 [“轮次和预算”](#turns-and-budget) 。

## Message types 消息类型

As the loop runs, the SDK yields a stream of messages. Each message carries a type that tells you what stage of the loop it came from. The five core types are:  
循环运行时，SDK 会生成一个消息流。每条消息都带有类型标识，用于指示它来自循环的哪个阶段。五种核心类型是：
- **`SystemMessage`:** session lifecycle events. The `subtype` field distinguishes them: `"init"` is the first message (session metadata), and `"compact_boundary"` fires after [compaction](#automatic-compaction). In TypeScript, the compact boundary is its own [`SDKCompactBoundaryMessage`](https://code.claude.com/docs/en/agent-sdk/typescript#sdk-compact-boundary-message) type rather than a subtype of `SDKSystemMessage`.  
	**`SystemMessage` ：** 会话生命周期事件。 `subtype` 字段用于区分它们： `"init"` 是第一条消息（会话元数据），而 `"compact_boundary"` 在 [压缩](#automatic-compaction) 后触发。在 TypeScript 中，压缩边界是其自身的 [`SDKCompactBoundaryMessage`](https://code.claude.com/docs/en/agent-sdk/typescript#sdk-compact-boundary-message) 类型，而不是 `SDKSystemMessage` 的子类型。
- **`AssistantMessage`:** emitted after each Claude response, including the final text-only one. Contains text content blocks and tool call blocks from that turn.  
	**`AssistantMessage` ：** 在克劳德每次做出回应后发出，包括最后一次纯文本回应。包含该回合的文本内容块和工具调用块。
- **`UserMessage`:** emitted after each tool execution with the tool result content sent back to Claude. Also emitted for any user inputs you stream mid-loop.  
	**`UserMessage` ：** 每次工具执行完毕后发出，并将工具执行结果内容发送回 Claude。循环过程中任何用户输入也会发出此消息。
- **`StreamEvent`:** only emitted when partial messages are enabled. Contains raw API streaming events (text deltas, tool input chunks). See [Stream responses](https://code.claude.com/docs/en/agent-sdk/streaming-output).  
	**`StreamEvent` ：** 仅在启用部分消息时发出。包含原始 API 流事件（文本增量、工具输入块）。请参阅 [流响应](https://code.claude.com/docs/en/agent-sdk/streaming-output) 。
- **`ResultMessage`:** the last message, always. Contains the final text result, token usage, cost, and session ID. Check the `subtype` field to determine whether the task succeeded or hit a limit. See [Handle the result](#handle-the-result).  
	**`ResultMessage` ：** 始终包含最后一条消息。其中包含最终文本结果、令牌使用情况、成本和会话 ID。检查 `subtype` 字段以确定任务是否成功或达到限制。请 [参阅“处理结果”](#handle-the-result) 。
These five types cover the full agent loop lifecycle in both SDKs. The TypeScript SDK also yields additional observability events (hook events, tool progress, rate limits, task notifications) that provide extra detail but are not required to drive the loop. See the [Python message types reference](https://code.claude.com/docs/en/agent-sdk/python#message-types) and [TypeScript message types reference](https://code.claude.com/docs/en/agent-sdk/typescript#message-types) for the complete lists.  
这五种类型涵盖了两个 SDK 中代理循环的完整生命周期。TypeScript SDK 还会生成额外的可观测性事件（钩子事件、工具进度、速率限制、任务通知），这些事件提供更多细节，但并非驱动循环所必需。完整列表请参阅 [Python 消息类型参考](https://code.claude.com/docs/en/agent-sdk/python#message-types) 和 [TypeScript 消息类型参考](https://code.claude.com/docs/en/agent-sdk/typescript#message-types) 。

### Handle messages 处理消息

Which messages you handle depends on what you’re building:  
您处理哪些消息取决于您正在构建什么：
- **Final results only:** handle `ResultMessage` to get the output, cost, and whether the task succeeded or hit a limit.  
	**仅处理最终结果：** 处理 `ResultMessage` 以获取输出、成本以及任务是否成功或达到限制。
- **Progress updates:** handle `AssistantMessage` to see what Claude is doing each turn, including which tools it called.  
	**进度更新：** 处理 `AssistantMessage` 以查看 Claude 每回合正在做什么，包括它调用了哪些工具。
- **Live streaming:** enable partial messages (`include_partial_messages` in Python, `includePartialMessages` in TypeScript) to get `StreamEvent` messages in real time. See [Stream responses in real-time](https://code.claude.com/docs/en/agent-sdk/streaming-output).  
	**实时流：** 启用部分消息（Python 中的 `include_partial_messages` ，TypeScript 中的 `includePartialMessages` ）以实时获取 `StreamEvent` 消息。请参阅 [实时流响应](https://code.claude.com/docs/en/agent-sdk/streaming-output) 。
How you check message types depends on the SDK:  
检查消息类型的方法取决于 SDK：
- **Python:** check message types with `isinstance()` against classes imported from `claude_agent_sdk` (for example, `isinstance(message, ResultMessage)`).  
	**Python：** 使用 `isinstance()` 检查从 `claude_agent_sdk` 导入的类的消息类型（例如， `isinstance(message, ResultMessage)` ）。
- **TypeScript:** check the `type` string field (for example, `message.type === "result"`). `AssistantMessage` and `UserMessage` wrap the raw API message in a `.message` field, so content blocks are at `message.message.content`, not `message.content`.  
	**TypeScript：** 检查 `type` 字符串字段（例如， `message.type === "result"` ）。 `AssistantMessage` 和 `UserMessage` 将原始 API 消息包装在 `.message` 字段中，因此内容块位于 `message.message.content` ，而不是 `message.content` 。

```python
from claude_agent_sdk import query, AssistantMessage, ResultMessage

async for message in query(prompt="Summarize this project"):
    if isinstance(message, AssistantMessage):
        print(f"Turn completed: {len(message.content)} content blocks")
    if isinstance(message, ResultMessage):
        if message.subtype == "success":
            print(message.result)
        else:
            print(f"Stopped: {message.subtype}")
```

## Tool execution 工具执行

Tools give your agent the ability to take action. Without tools, Claude can only respond with text. With tools, Claude can read files, run commands, search code, and interact with external services.  
工具赋予您的代理执行操作的能力。如果没有工具，Claude 只能回复文本。有了工具，Claude 可以读取文件、运行命令、搜索代码并与外部服务交互。

### Built-in tools 内置工具

The SDK includes the same tools that power Claude Code:  
该 SDK 包含了与 Claude Code 相同的工具：

| Category 类别 | Tools 工具 | What they do 他们做什么 |
| --- | --- | --- |
| **File operations 文件操作** | `Read`, `Edit`, `Write`   `Read` 、 `Edit` 、 `Write` | Read, modify, and create files   读取、修改和创建文件 |
| **Search 搜索** | `Glob`, `Grep`   `Glob` ， `Grep` | Find files by pattern, search content with regex   按模式查找文件，使用正则表达式搜索内容 |
| **Execution 执行** | `Bash` 巴什 | Run shell commands, scripts, git operations   运行 shell 命令、脚本和 git 操作 |
| **Web 网站** | `WebSearch`, `WebFetch`   `WebSearch` 、 `WebFetch` | Search the web, fetch and parse pages   搜索网络，获取并解析页面 |
| **Discovery 发现** | `ToolSearch` 工具搜索 | Dynamically find and load tools on-demand instead of preloading all of them   动态地按需查找和加载工具，而不是预先加载所有工具。 |
| **Orchestration 管弦乐** | `Agent`, `Skill`, `AskUserQuestion`, `TodoWrite`   `Agent` 、 `Skill` 、 `AskUserQuestion` 、 `TodoWrite` | Spawn subagents, invoke skills, ask the user, track tasks   生成子代理、调用技能、询问用户、跟踪任务 |

Beyond built-in tools, you can:  
除了内置工具之外，您还可以：
- **Connect external services** with [MCP servers](https://code.claude.com/docs/en/agent-sdk/mcp) (databases, browsers, APIs)  
	**将外部服务** （数据库、浏览器、API）与 [MCP 服务器](https://code.claude.com/docs/en/agent-sdk/mcp) 连接
- **Define custom tools** with [custom tool handlers](https://code.claude.com/docs/en/agent-sdk/custom-tools)  
	定义带有 [自定义工具处理器的](https://code.claude.com/docs/en/agent-sdk/custom-tools) **自定义工具**
- **Load project skills** via [setting sources](https://code.claude.com/docs/en/agent-sdk/claude-code-features) for reusable workflows  
	通过 [设置可重用工作流程的来源](https://code.claude.com/docs/en/agent-sdk/claude-code-features) 来 **加载项目技能**

### Tool permissions 工具权限

Claude determines which tools to call based on the task, but you control whether those calls are allowed to execute. You can auto-approve specific tools, block others entirely, or require approval for everything. Three options work together to determine what runs:  
Claude 会根据任务决定调用哪些工具，但您可以控制是否允许这些调用执行。您可以自动批准特定工具、完全阻止其他工具，或者要求所有工具都经过批准。以下三个选项共同决定哪些工具会运行：
- **`allowed_tools` / `allowedTools`** auto-approves listed tools. A read-only agent with `["Read", "Glob", "Grep"]` in its allowed tools list runs those tools without prompting. Tools not listed are still available but require permission.  
	**`allowed_tools` / `allowedTools`** 会自动批准列出的工具。只读代理的允许工具列表中包含 `["Read", "Glob", "Grep"]` 时，无需提示即可运行这些工具。未列出的工具仍然可用，但需要获得权限。
- **`disallowed_tools` / `disallowedTools`** blocks listed tools, regardless of other settings. See [Permissions](https://code.claude.com/docs/en/agent-sdk/permissions) for the order that rules are checked before a tool runs.  
	**`disallowed_tools` / `disallowedTools`** 会阻止列出的工具运行，不受其他设置的影响。有关工具运行前规则的检查顺序，请参阅 [“权限”部分](https://code.claude.com/docs/en/agent-sdk/permissions) 。
- **`permission_mode` / `permissionMode`** controls what happens to tools that aren’t covered by allow or deny rules. See [Permission mode](#permission-mode) for available modes.  
	**`permission_mode` / `permissionMode`** 控制未被允许或拒绝规则涵盖的工具的处理方式。有关可用模式，请参阅 [“权限模式”](#permission-mode) 部分。
You can also scope individual tools with rules like `"Bash(npm:*)"` to allow only specific commands. See [Permissions](https://code.claude.com/docs/en/agent-sdk/permissions) for the full rule syntax.  
您还可以使用类似 `"Bash(npm:*)"` 这样的规则来限定单个工具的权限范围，仅允许执行特定命令。有关完整的规则语法，请参阅 [“权限”部分](https://code.claude.com/docs/en/agent-sdk/permissions) 。 When a tool is denied, Claude receives a rejection message as the tool result and typically attempts a different approach or reports that it couldn’t proceed.  
当工具被拒绝时，Claude 会收到一条拒绝消息作为工具结果，通常会尝试不同的方法或报告无法继续。

### Parallel tool execution 并行工具执行

When Claude requests multiple tool calls in a single turn, both SDKs can run them concurrently or sequentially depending on the tool. Read-only tools (like `Read`, `Glob`, `Grep`, and MCP tools marked as read-only) can run concurrently. Tools that modify state (like `Edit`, `Write`, and `Bash`) run sequentially to avoid conflicts.  
当 Claude 在单次操作中请求多个工具调用时，两个 SDK 可以根据工具的不同，选择并发或顺序运行。只读工具（例如 `Read` 、 `Glob` 、 `Grep` 和标记为只读的 MCP 工具）可以并发运行。修改状态的工具（例如 `Edit` 、 `Write` 和 `Bash` ）则顺序运行，以避免冲突。 Custom tools default to sequential execution. To enable parallel execution for a custom tool, mark it as read-only in its annotations: `readOnly` in [TypeScript](https://code.claude.com/docs/en/agent-sdk/typescript#tool) or `readOnlyHint` in [Python](https://code.claude.com/docs/en/agent-sdk/python#tool).  
自定义工具默认顺序执行。要为自定义工具启用并行执行，请在其注解中将其标记为只读： [TypeScript](https://code.claude.com/docs/en/agent-sdk/typescript#tool) 中的 `readOnly` 或 [Python](https://code.claude.com/docs/en/agent-sdk/python#tool) 中的 `readOnlyHint` 。

## Control how the loop runs控制循环的运行方式

You can limit how many turns the loop takes, how much it costs, how deeply Claude reasons, and whether tools require approval before running. All of these are fields on [`ClaudeAgentOptions`](https://code.claude.com/docs/en/agent-sdk/python#claude-agent-options) (Python) / [`Options`](https://code.claude.com/docs/en/agent-sdk/typescript#options) (TypeScript).  
您可以限制循环次数、成本、Claude 推理的深度，以及工具运行前是否需要审批。所有这些设置都可以在 [`ClaudeAgentOptions`](https://code.claude.com/docs/en/agent-sdk/python#claude-agent-options) （Python）/ [`Options`](https://code.claude.com/docs/en/agent-sdk/typescript#options) （TypeScript）中找到。

### Turns and budget 转弯和预算

| Option 选项 | What it controls 它控制着什么 | Default 默认 |
| --- | --- | --- |
| Max turns (`max_turns` / `maxTurns`)   最大匝数 ( `max_turns` / `maxTurns` ) | Maximum tool-use round trips   工具使用往返次数最大化 | No limit 无限制 |
| Max budget (`max_budget_usd` / `maxBudgetUsd`)   最大预算（ `max_budget_usd` / `maxBudgetUsd` ） | Maximum cost before stopping   停止前的最大成本 | No limit 无限制 |

When either limit is hit, the SDK returns a `ResultMessage` with a corresponding error subtype (`error_max_turns` or `error_max_budget_usd`). See [Handle the result](#handle-the-result) for how to check these subtypes and [`ClaudeAgentOptions`](https://code.claude.com/docs/en/agent-sdk/python#claude-agent-options) / [`Options`](https://code.claude.com/docs/en/agent-sdk/typescript#options) for syntax.  
当达到任一限制时，SDK 会返回一个包含相应错误子类型（ `error_max_turns` 或 `error_max_budget_usd` ）的 `ResultMessage` 。有关如何检查这些子类型，请参阅“处理结果” [部分；有关语法，请参阅](#handle-the-result) [`ClaudeAgentOptions`](https://code.claude.com/docs/en/agent-sdk/python#claude-agent-options) / [`Options`](https://code.claude.com/docs/en/agent-sdk/typescript#options) 部分。

### Effort level 努力程度

The `effort` option controls how much reasoning Claude applies. Lower effort levels use fewer tokens per turn and reduce cost. Not all models support the effort parameter. See [Effort](https://platform.claude.com/docs/en/build-with-claude/effort) for which models support it.  
`effort` 选项控制克劳德运用推理的程度。较低的努力程度每回合使用的标记更少，从而降低成本。并非所有模型都支持“努力程度”参数。请参阅 [“努力程度”](https://platform.claude.com/docs/en/build-with-claude/effort) 了解哪些模型支持该参数。

| Level 等级 | Behavior 行为 | Good for 有利于 |
| --- | --- | --- |
| `"low"` “低的” | Minimal reasoning, fast responses   推理简洁，反应迅速 | File lookups, listing directories   文件查找，列出目录 |
| `"medium"` “中等的” | Balanced reasoning 平衡推理 | Routine edits, standard tasks   例行编辑，标准任务 |
| `"high"` “高的” | Thorough analysis 深入分析 | Refactors, debugging 重构、调试 |
| `"max"` “最大限度” | Maximum reasoning depth 最大推理深度 | Multi-step problems requiring deep analysis   需要深入分析的多步骤问题 |

If you don’t set `effort`, the Python SDK leaves the parameter unset and defers to the model’s default behavior. The TypeScript SDK defaults to `"high"`.  
如果未设置 `effort` ，Python SDK 将保持该参数未设置状态，并遵循模型的默认行为。TypeScript SDK 的默认值为 `"high"` 。

`effort` trades latency and token cost for reasoning depth within each response. [Extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) is a separate feature that produces visible chain-of-thought blocks in the output. They are independent: you can set `effort: "low"` with extended thinking enabled, or `effort: "max"` without it.  
`effort` 以延迟和令牌成本为代价，换取每次响应中推理的深度。 [扩展思考](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) 是一项独立功能，它会在输出中生成可见的思路链模块。它们是相互独立的：您可以启用扩展思考并设置 `effort: "low"` ，或者禁用扩展思考并 `effort: "max"` 。

Use lower effort for agents doing simple, well-scoped tasks (like listing files or running a single grep) to reduce cost and latency. `effort` is set at the top-level `query()` options, not per-subagent.  
对于执行简单、范围明确的任务（例如列出文件或运行单个 grep 命令）的代理，使用较低的资源消耗，以降低成本和延迟。 `effort` 是在顶层 `query()` 选项中设置的，而不是针对每个子代理单独设置的。

### Permission mode 权限模式

The permission mode option (`permission_mode` in Python, `permissionMode` in TypeScript) controls whether the agent asks for approval before using tools:  
权限模式选项（Python 中的 `permission_mode` ，TypeScript 中的 `permissionMode` ）控制代理在使用工具之前是否请求批准：

| Mode 模式 | Behavior 行为 |
| --- | --- |
| `"default"` “默认” | Tools not covered by allow rules trigger your approval callback; no callback means deny   未在允许规则中涵盖的工具会触发您的批准回调；没有回调则表示拒绝 |
| `"acceptEdits"` “接受编辑” | Auto-approves file edits and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, etc.); other Bash commands follow default rules   自动批准文件编辑和常用文件系统命令（ `mkdir` 、 `touch` 、 `mv` 、 `cp` 等）；其他 Bash 命令遵循默认规则 |
| `"plan"` “计划” | No tool execution; Claude produces a plan for review   未执行任何工具操作；克劳德制定了一份审查计划。 |
| `"dontAsk"` “dontAsk” | Never prompts. Tools pre-approved by [permission rules](https://code.claude.com/docs/en/settings#permission-settings) run, everything else is denied   从不弹出提示。只有 [权限规则](https://code.claude.com/docs/en/settings#permission-settings) 预先批准的工具才能运行，其他所有操作均被拒绝。 |
| `"auto"` (TypeScript only)   `"auto"` （仅限 TypeScript） | Uses a model classifier to approve or deny each tool call. See [Auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) for availability and behavior   使用模型分类器来批准或拒绝每次工具调用。有关可用性和行为，请参阅 [自动模式](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) 。 |
| `"bypassPermissions"` "绕过权限" | Runs all allowed tools without asking. Cannot be used when running as root on Unix. Use only in isolated environments where the agent’s actions cannot affect systems you care about   无需询问即可运行所有允许的工具。在 Unix 系统上以 root 用户身份运行时无法使用。仅在隔离环境中使用，确保代理的操作不会影响您关心的系统。 |

For interactive applications, use `"default"` with a tool approval callback to surface approval prompts. For autonomous agents on a dev machine, `"acceptEdits"` auto-approves file edits and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`, etc.) while still gating other `Bash` commands behind allow rules. Reserve `"bypassPermissions"` for CI, containers, or other isolated environments. See [Permissions](https://code.claude.com/docs/en/agent-sdk/permissions) for full details.  
对于交互式应用程序，请使用带有工具审批回调的 `"default"` 选项来显示审批提示。对于开发机器上的自主代理， `"acceptEdits"` 选项会自动批准文件编辑和常用文件系统命令（例如 `mkdir` 、 `touch` 、 `mv` 、 `cp` 等），同时仍然使用允许规则来限制其他 `Bash` 命令的执行。 `"bypassPermissions"` 选项仅供 CI、容器或其他隔离环境使用。有关详细信息，请参阅 [“权限”文档](https://code.claude.com/docs/en/agent-sdk/permissions) 。

### Model 模型

If you don’t set `model`, the SDK uses Claude Code’s default, which depends on your authentication method and subscription. Set it explicitly (for example, `model="claude-sonnet-4-6"`) to pin a specific model or to use a smaller model for faster, cheaper agents. See [models](https://platform.claude.com/docs/en/about-claude/models) for available IDs.  
如果您未设置 `model` ，SDK 将使用 Claude Code 的默认模型，该模型取决于您的身份验证方法和订阅。您可以显式设置模型（例如， `model="claude-sonnet-4-6"` ）以指定特定模型，或使用更小的模型来构建速度更快、成本更低的代理。有关可用 ID，请参阅 [模型部分](https://platform.claude.com/docs/en/about-claude/models) 。

## The context window 上下文窗口

The context window is the total amount of information available to Claude during a session. It does not reset between turns within a session. Everything accumulates: the system prompt, tool definitions, conversation history, tool inputs, and tool outputs. Content that stays the same across turns (system prompt, tool definitions, CLAUDE.md) is automatically [prompt cached](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), which reduces cost and latency for repeated prefixes.  
上下文窗口是指克劳德在会话期间可获取的全部信息量。它不会在会话内的回合之间重置。所有内容都会累积：系统提示、工具定义、对话历史记录、工具输入和工具输出。回合间保持不变的内容（系统提示、工具定义、CLAUDE.md）会自动 [进行提示缓存](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) ，从而降低重复前缀的开销和延迟。

### What consumes context 什么消耗语境

Here’s how each component affects context in the SDK:  
以下是各组件如何影响 SDK 中的上下文：

| Source 来源 | When it loads 加载时 | Impact 影响 |
| --- | --- | --- |
| **System prompt 系统提示** | Every request 每一个请求 | Small fixed cost, always present   固定成本低，始终存在 |
| **CLAUDE.md files CLAUDE.md 文件** | Session start, when [`settingSources`](https://code.claude.com/docs/en/agent-sdk/claude-code-features) is enabled   会话开始，当 [`settingSources`](https://code.claude.com/docs/en/agent-sdk/claude-code-features) 已启用时 | Full content in every request (but prompt-cached, so only the first request pays full cost)   每次请求都包含完整内容（但会进行缓存，因此只有第一次请求需要支付全部费用） |
| **Tool definitions 工具定义** | Every request 每一个请求 | Each tool adds its schema; use [MCP tool search](https://code.claude.com/docs/en/agent-sdk/mcp#mcp-tool-search) to load tools on-demand instead of all at once   每个工具都会添加自己的架构；使用 [MCP 工具搜索功能](https://code.claude.com/docs/en/agent-sdk/mcp#mcp-tool-search) 可以按需加载工具，而不是一次性全部加载。 |
| **Conversation history 对话历史** | Accumulates over turns 轮次累积 | Grows with each turn: prompts, responses, tool inputs, tool outputs   随着每一次操作而增长：提示、响应、工具输入、工具输出 |
| **Skill descriptions 技能描述** | Session start (with setting sources enabled)   会话开始（已启用设置源） | Short summaries; full content loads only when invoked   简短摘要；完整内容仅在调用时加载。 |

Large tool outputs consume significant context. Reading a big file or running a command with verbose output can use thousands of tokens in a single turn. Context accumulates across turns, so longer sessions with many tool calls build up significantly more context than short ones.  
大型工具的输出会消耗大量的上下文信息。读取一个大文件或运行一个输出详细的命令，在单次操作中就可能消耗数千个令牌。上下文信息会在多轮操作中累积，因此，较长的会话（包含多次工具调用）比短会话积累的上下文信息要多得多。

### Automatic compaction 自动压实

When the context window approaches its limit, the SDK automatically compacts the conversation: it summarizes older history to free space, keeping your most recent exchanges and key decisions intact. The SDK emits a message with `type: "system"` and `subtype: "compact_boundary"` in the stream when this happens (in Python this is a `SystemMessage`; in TypeScript it is a separate `SDKCompactBoundaryMessage` type).  
当上下文窗口接近其限制时，SDK 会自动压缩对话：它会汇总较早的历史记录以释放空间，同时保留最近的交流和关键决策。此时，SDK 会在流中发出一个 `type: "system"` 且 `subtype: "compact_boundary"` 消息（在 Python 中，这是一个 `SystemMessage` ；在 TypeScript 中，这是一个单独的 `SDKCompactBoundaryMessage` 类型）。 Compaction replaces older messages with a summary, so specific instructions from early in the conversation may not be preserved. Persistent rules belong in CLAUDE.md (loaded via [`settingSources`](https://code.claude.com/docs/en/agent-sdk/claude-code-features)) rather than in the initial prompt, because CLAUDE.md content is re-injected on every request.  
压缩操作会将较早的消息替换为摘要，因此对话早期的一些具体指令可能无法保留。持久规则应放在 CLAUDE.md 文件（通过 [`settingSources`](https://code.claude.com/docs/en/agent-sdk/claude-code-features) 加载）中，而不是初始提示符中，因为 CLAUDE.md 的内容会在每次请求时重新注入。 You can customize compaction behavior in several ways:  
您可以通过多种方式自定义压缩行为：
- **Summarization instructions in CLAUDE.md:** The compactor reads your CLAUDE.md like any other context, so you can include a section telling it what to preserve when summarizing. The section header is free-form (not a magic string); the compactor matches on intent.  
	**CLAUDE.md 中的摘要说明：** 压缩器会像读取其他任何上下文一样读取您的 CLAUDE.md 文件，因此您可以添加一个部分来告诉它在摘要时要保留哪些内容。部分标题是自由格式的（不是固定字符串）；压缩器会根据意图进行匹配。
- **`PreCompact` hook:** Run custom logic before compaction occurs, for example to archive the full transcript. The hook receives a `trigger` field (`manual` or `auto`). See [hooks](https://code.claude.com/docs/en/agent-sdk/hooks).  
	**`PreCompact` 钩子：** 在压缩操作执行前运行自定义逻辑，例如归档完整成绩单。该钩子接收一个 `trigger` 字段（ `manual` 或 `auto` ）。请参阅 [钩子](https://code.claude.com/docs/en/agent-sdk/hooks) 。
- **Manual compaction:** Send `/compact` as a prompt string to trigger compaction on demand. (Slash commands sent this way are SDK inputs, not CLI-only shortcuts. See [slash commands in the SDK](https://code.claude.com/docs/en/agent-sdk/slash-commands).)  
	**手动压缩：** 发送 `/compact` 作为提示字符串可按需触发压缩。（以这种方式发送的斜杠命令是 SDK 输入，而非仅限 CLI 使用的快捷方式。请参阅 [SDK 中的斜杠命令](https://code.claude.com/docs/en/agent-sdk/slash-commands) 。）

Add a section to your project’s CLAUDE.md telling the compactor what to preserve. The header name isn’t special; use any clear label.

```markdown
# Summary instructions

When summarizing this conversation, always preserve:
- The current task objective and acceptance criteria
- File paths that have been read or modified
- Test results and error messages
- Decisions made and the reasoning behind them
```

### Keep context efficient 保持上下文简洁高效

A few strategies for long-running agents:  
针对长期运行的代理人，以下是一些策略：
- **Use subagents for subtasks.** Each subagent starts with a fresh conversation (no prior message history, though it does load its own system prompt and project-level context like CLAUDE.md). It does not see the parent’s turns, and only its final response returns to the parent as a tool result. The main agent’s context grows by that summary, not by the full subtask transcript. See [What subagents inherit](https://code.claude.com/docs/en/agent-sdk/subagents#what-subagents-inherit) for details.  
	**子任务使用子代理。** 每个子代理都从一个全新的对话开始（没有之前的消息历史记录，但会加载自己的系统提示和项目级上下文，例如 CLAUDE.md）。它看不到父代理的轮次，只有它的最终回复会作为工具结果返回给父代理。主代理的上下文会根据该摘要进行扩展，而不是根据完整的子任务记录。有关详细信息，请参阅 [“子代理继承的内容”](https://code.claude.com/docs/en/agent-sdk/subagents#what-subagents-inherit) 。
- **Be selective with tools.** Every tool definition takes context space. Use the `tools` field on [`AgentDefinition`](https://code.claude.com/docs/en/agent-sdk/subagents#agent-definition-configuration) to scope subagents to the minimum set they need, and use [MCP tool search](https://code.claude.com/docs/en/agent-sdk/mcp#mcp-tool-search) to load tools on demand instead of preloading all of them.  
	**谨慎选择工具。** 每个工具定义都会占用上下文空间。使用 [`AgentDefinition`](https://code.claude.com/docs/en/agent-sdk/subagents#agent-definition-configuration) 中的 `tools` 字段将子代理的范围限定为所需的最小集合，并使用 [MCP 工具搜索](https://code.claude.com/docs/en/agent-sdk/mcp#mcp-tool-search) 按需加载工具，而不是预加载所有工具。
- **Watch MCP server costs.** Each MCP server adds all its tool schemas to every request. A few servers with many tools can consume significant context before the agent does any work. The `ToolSearch` tool can help by loading tools on-demand instead of preloading all of them. See [MCP tool search](https://code.claude.com/docs/en/agent-sdk/mcp#mcp-tool-search) for configuration.  
	**注意 MCP 服务器的成本。** 每个 MCP 服务器都会将其所有工具架构添加到每个请求中。少数拥有大量工具 `ToolSearch` 服务器可能会在代理执行任何工作之前消耗大量上下文信息。ToolSearch 工具可以通过按需加载工具而不是预加载所有工具来解决这个问题。有关配置，请参阅 [MCP 工具搜索](https://code.claude.com/docs/en/agent-sdk/mcp#mcp-tool-search) 。
- **Use lower effort for routine tasks.** Set [effort](#effort-level) to `"low"` for agents that only need to read files or list directories. This reduces token usage and cost.  
	**对于例行任务，请使用较低的工作量。** 将仅需读取文件或列出目录的代理的 [工作量](#effort-level) 设置为 `"low"` 。这样可以减少令牌使用量和成本。
For a detailed breakdown of per-feature context costs, see [Understand context costs](https://code.claude.com/docs/en/features-overview#understand-context-costs).  
有关每个功能上下文成本的详细细分，请参阅 [了解上下文成本](https://code.claude.com/docs/en/features-overview#understand-context-costs) 。

## Sessions and continuity 会议和连续性

Each interaction with the SDK creates or continues a session. Capture the session ID from `ResultMessage.session_id` (available in both SDKs) to resume later. The TypeScript SDK also exposes it as a direct field on the init `SystemMessage`; in Python it’s nested in `SystemMessage.data`.  
每次与 SDK 交互都会创建或延续一个会话。从 `ResultMessage.session_id` （两个 SDK 都可用）获取会话 ID 以便稍后恢复。TypeScript SDK 还将其作为 \`init `SystemMessage` 中的一个直接字段公开；在 Python 中，它嵌套在 `SystemMessage.data` 中。 When you resume, the full context from previous turns is restored: files that were read, analysis that was performed, and actions that were taken. You can also fork a session to branch into a different approach without modifying the original.  
恢复后，之前所有步骤的完整上下文都会被恢复：已读取的文件、已执行的分析以及已采取的操作。您还可以 fork 一个会话，以便在不修改原始会话的情况下尝试不同的方法。 See [Session management](https://code.claude.com/docs/en/agent-sdk/sessions) for the full guide on resume, continue, and fork patterns.  
有关恢复、继续和分支模式的完整指南，请参阅 [会话管理](https://code.claude.com/docs/en/agent-sdk/sessions) 。

In Python, `ClaudeSDKClient` handles session IDs automatically across multiple calls. See the [Python SDK reference](https://code.claude.com/docs/en/agent-sdk/python#choosing-between-query-and-claude-sdk-client) for details.  
在 Python 中， `ClaudeSDKClient` 会自动处理跨多个调用的会话 ID。详情请参阅 [Python SDK 参考文档](https://code.claude.com/docs/en/agent-sdk/python#choosing-between-query-and-claude-sdk-client) 。

## Handle the result 处理结果

When the loop ends, the `ResultMessage` tells you what happened and gives you the output. The `subtype` field (available in both SDKs) is the primary way to check termination state.  
循环结束后， `ResultMessage` 会告知您发生了什么并给出输出结果。 `subtype` 字段（两个 SDK 中均可用）是检查终止状态的主要方法。

| Result subtype 结果子类型 | What happened 发生了什么 | `result` field available?   `result` 字段可用吗？ |
| --- | --- | --- |
| `success` 成功 | Claude finished the task normally   克劳德正常地完成了任务。 | Yes 是的 |
| `error_max_turns` 错误最大转弯数 | Hit the `maxTurns` limit before finishing   在完成之前达到 `maxTurns` 限制 | No 不 |
| `error_max_budget_usd` 错误最大预算美元 | Hit the `maxBudgetUsd` limit before finishing   在完成之前达到 `maxBudgetUsd` 限额 | No 不 |
| `error_during_execution` 执行过程中出错 | An error interrupted the loop (for example, an API failure or cancelled request)   循环因错误而中断（例如，API 故障或请求取消）。 | No 不 |
| `error_max_structured_output_retries` | Structured output validation failed after the configured retry limit   结构化输出验证在达到配置的重试次数限制后失败 | No 不 |

The `result` field (the final text output) is only present on the `success` variant, so always check the subtype before reading it. All result subtypes carry `total_cost_usd`, `usage`, `num_turns`, and `session_id` so you can track cost and resume even after errors. In Python, `total_cost_usd` and `usage` are typed as optional and may be `None` on some error paths, so guard before formatting them. See [Tracking costs and usage](https://code.claude.com/docs/en/agent-sdk/cost-tracking) for details on interpreting the `usage` fields.  
`result` 字段（最终文本输出）仅在 `success` 变体中存在，因此在读取结果之前务必检查其子类型。所有结果子类型都包含 `total_cost_usd` 、 `usage` 、 `num_turns` 和 `session_id` 字段，以便您可以跟踪成本并在发生错误后恢复运行。在 Python 中， `total_cost_usd` 和 `usage` 被定义为可选字段，并且在某些错误路径中可能为 `None` ，因此在格式化它们之前需要进行保护。有关如何解释 `usage` 字段的详细信息，请参阅 [“跟踪成本和使用情况”](https://code.claude.com/docs/en/agent-sdk/cost-tracking) 。 The result also includes a `stop_reason` field (`string | null` in TypeScript, `str | None` in Python) indicating why the model stopped generating on its final turn. Common values are `end_turn` (model finished normally), `max_tokens` (hit the output token limit), and `refusal` (the model declined the request). On error result subtypes, `stop_reason` carries the value from the last assistant response before the loop ended. To detect refusals, check `stop_reason === "refusal"` (TypeScript) or `stop_reason == "refusal"` (Python). See [`SDKResultMessage`](https://code.claude.com/docs/en/agent-sdk/typescript#sdk-result-message) (TypeScript) or [`ResultMessage`](https://code.claude.com/docs/en/agent-sdk/python#result-message) (Python) for the full type.  
结果中还包含一个 `stop_reason` 字段（TypeScript 中为 `string | null` ，Python 中为 `str | None` ），用于指示模型在最后一轮停止生成的原因。常见值包括 `end_turn` （模型正常完成）、 `max_tokens` （达到输出标记限制）和 `refusal` （模型拒绝了请求）。对于错误结果子类型， `stop_reason` 值取自循环结束前最后一个助手响应。要检测拒绝操作，请检查 `stop_reason === "refusal"` （TypeScript）或 `stop_reason == "refusal"` （Python）。有关完整类型，请参阅 [`SDKResultMessage`](https://code.claude.com/docs/en/agent-sdk/typescript#sdk-result-message) （TypeScript）或 [`ResultMessage`](https://code.claude.com/docs/en/agent-sdk/python#result-message) （Python）。

## Hooks 钩子

[Hooks](https://code.claude.com/docs/en/agent-sdk/hooks) are callbacks that fire at specific points in the loop: before a tool runs, after it returns, when the agent finishes, and so on. Some commonly used hooks are:  
[钩子](https://code.claude.com/docs/en/agent-sdk/hooks) 是回调函数，会在循环中的特定点触发：例如工具运行之前、工具返回之后、代理完成操作时等等。一些常用的钩子包括：

| Hook 钩 | When it fires 发射时 | Common uses 常见用途 |
| --- | --- | --- |
| `PreToolUse` 工具预使用 | Before a tool executes 在工具执行之前 | Validate inputs, block dangerous commands   验证输入，阻止危险命令 |
| `PostToolUse` | After a tool returns 工具返回后 | Audit outputs, trigger side effects   审计输出，引发副作用 |
| `UserPromptSubmit` 用户提示提交 | When a prompt is sent   当发送提示时 | Inject additional context into prompts   在提示信息中添加更多上下文。 |
| `Stop` 停止 | When the agent finishes 当代理人完成 | Validate the result, save session state   验证结果，保存会话状态 |
| `SubagentStart` / `SubagentStop` | When a subagent spawns or completes   当子代理生成或完成时 | Track and aggregate parallel task results   跟踪和汇总并行任务结果 |
| `PreCompact` 预压缩 | Before context compaction   上下文压缩之前 | Archive full transcript before summarizing   先存档完整文字稿，再进行总结。 |

Hooks run in your application process, not inside the agent’s context window, so they don’t consume context. Hooks can also short-circuit the loop: a `PreToolUse` hook that rejects a tool call prevents it from executing, and Claude receives the rejection message instead.  
钩子函数在应用程序进程中运行，而不是在代理的上下文窗口中运行，因此它们不会消耗上下文。钩子函数还可以绕过循环：例如，一个拒绝工具调用的 `PreToolUse` 钩子函数会阻止该调用执行，Claude 会收到拒绝消息。 Both SDKs support all the events above. The TypeScript SDK includes additional events that Python does not yet support. See [Control execution with hooks](https://code.claude.com/docs/en/agent-sdk/hooks) for the complete event list, per-SDK availability, and the full callback API.  
两个 SDK 都支持上述所有事件。TypeScript SDK 还包含 Python 尚未支持的其他事件。有关完整的事件列表、各 SDK 的可用性以及完整的回调 API，请参阅 [“使用钩子控制执行”](https://code.claude.com/docs/en/agent-sdk/hooks) 。

## Put it all together 把所有内容整合起来

This example combines the key concepts from this page into a single agent that fixes failing tests. It configures the agent with allowed tools (auto-approved so the agent runs autonomously), project settings, and safety limits on turns and reasoning effort. As the loop runs, it captures the session ID for potential resumption, handles the final result, and prints the total cost.  
此示例将本页的关键概念整合到一个代理中，该代理可以修复失败的测试。它配置代理，包括允许使用的工具（自动批准，以便代理自主运行）、项目设置以及回合数和推理工作量的安全限制。循环运行时，它会捕获会话 ID 以便必要时恢复，处理最终结果，并打印总成本。

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage

async def run_agent():
    session_id = None

    async for message in query(
        prompt="Find and fix the bug causing test failures in the auth module",
        options=ClaudeAgentOptions(
            allowed_tools=[
                "Read",
                "Edit",
                "Bash",
                "Glob",
                "Grep",
            ],  # Listing tools here auto-approves them (no prompting)
            setting_sources=[
                "project"
            ],  # Load CLAUDE.md, skills, hooks from current directory
            max_turns=30,  # Prevent runaway sessions
            effort="high",  # Thorough reasoning for complex debugging
        ),
    ):
        # Handle the final result
        if isinstance(message, ResultMessage):
            session_id = message.session_id  # Save for potential resumption

            if message.subtype == "success":
                print(f"Done: {message.result}")
            elif message.subtype == "error_max_turns":
                # Agent ran out of turns. Resume with a higher limit.
                print(f"Hit turn limit. Resume session {session_id} to continue.")
            elif message.subtype == "error_max_budget_usd":
                print("Hit budget limit.")
            else:
                print(f"Stopped: {message.subtype}")
            if message.total_cost_usd is not None:
                print(f"Cost: ${message.total_cost_usd:.4f}")

asyncio.run(run_agent())
```

## Next steps 下一步

Now that you understand the loop, here’s where to go depending on what you’re building:  
既然你已经理解了循环，接下来就根据你要构建的内容，看看该怎么做：
- **Haven’t run an agent yet?** Start with the [quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart) to get the SDK installed and see a full example running end to end.  
	**还没运行过代理程序？** 先从 [快速入门](https://code.claude.com/docs/en/agent-sdk/quickstart) 指南开始，安装 SDK 并查看完整的端到端运行示例。
- **Ready to hook into your project?** [Load CLAUDE.md, skills, and filesystem hooks](https://code.claude.com/docs/en/agent-sdk/claude-code-features) so the agent follows your project conventions automatically.  
	**准备好接入您的项目了吗？** [加载 CLAUDE.md、技能和文件系统钩子，](https://code.claude.com/docs/en/agent-sdk/claude-code-features) 以便代理自动遵循您的项目约定。
- **Building an interactive UI?** Enable [streaming](https://code.claude.com/docs/en/agent-sdk/streaming-output) to show live text and tool calls as the loop runs.  
	**正在构建交互式用户界面？** 启用 [流式传输功能](https://code.claude.com/docs/en/agent-sdk/streaming-output) ，即可在循环运行时显示实时文本和工具调用。
- **Need tighter control over what the agent can do?** Lock down tool access with [permissions](https://code.claude.com/docs/en/agent-sdk/permissions), and use [hooks](https://code.claude.com/docs/en/agent-sdk/hooks) to audit, block, or transform tool calls before they execute.  
	**需要更严格地控制代理的操作？** 使用 [权限](https://code.claude.com/docs/en/agent-sdk/permissions) 锁定工具访问权限，并使用 [钩子](https://code.claude.com/docs/en/agent-sdk/hooks) 在工具调用执行之前对其进行审核、阻止或转换。
- **Running long or expensive tasks?** Offload isolated work to [subagents](https://code.claude.com/docs/en/agent-sdk/subagents) to keep your main context lean.  
	**运行耗时或成本高昂的任务？** 将孤立的工作卸载到 [子代理](https://code.claude.com/docs/en/agent-sdk/subagents) ，以保持主上下文的简洁性。
For the broader conceptual picture of the agentic loop (not SDK-specific), see [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works).  
有关代理循环的更广泛概念图（非 SDK 特有的），请参阅 [Claude Code 的工作原理](https://code.claude.com/docs/en/how-claude-code-works) 。