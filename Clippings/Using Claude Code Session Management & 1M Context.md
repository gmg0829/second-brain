---
title: "Using Claude Code: Session Management & 1M Context使用 Claude Code：会话管理和 1M 上下文"
source: "https://x.com/trq212/status/2044548257058328723"
author:
  - "[[@trq212]]"
published: 2026-04-16
created: 2026-04-16
description: "In my recent calls with Claude Code users, one theme keeps coming up: the 1M token context window is a double-edged sword. 在我最近与 Claude Code..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HF-p1RUbEAIH-6t?format=jpg&name=large)

In my recent calls with Claude Code users, one theme keeps coming up: the 1M token context window is a double-edged sword. 在我最近与 Claude Code 用户的通话中，一个主题不断出现：100 万个令牌的上下文窗口是一把双刃剑。

It lets Claude Code operate autonomously for longer and handle tasks more reliably, but it also opens the door to context pollution if you're not deliberate about managing your sessions.它可以让 Claude Code 自主运行更长时间，更可靠地处理任务，但如果你不刻意管理会话，也可能导致上下文污染。

Session management matters more than ever and there seem to be a lot of questions about it. Do you keep one session open in a terminal, or two? Start fresh with every prompt? When should you use compact, rewind, or subagents? What causes a bad compact?会话管理比以往任何时候都更加重要，而且似乎有很多关于它的问题。终端中应该只打开一个会话，还是两个？每次提示符都从头开始吗？什么时候应该使用压缩、回滚或子代理？什么原因会导致压缩失败？

There’s a surprising amount of detail here that can really shape your experience with Claude Code and almost all of it comes from managing your context window.这里有很多细节可以真正影响你使用 Claude Code 的体验，而几乎所有这些细节都与管理上下文窗口有关。

## A Quick Primer on Context, Compaction & Context Rot关于语境、压实和语境腐烂的简要介绍

![Image](https://pbs.twimg.com/media/HF-nqWCbEAE3Oan?format=jpg&name=large)

The context window is everything the model can "see" at once when generating its next response. It includes your system prompt, the conversation so far, every tool call and its output, and every file that's been read. Claude Code has a context window of one million tokens.上下文窗口是指模型在生成下一个响应时能够一次性“看到”的所有内容。它包括系统提示符、当前对话、每次工具调用及其输出，以及每个已读取的文件。Claude Code 的上下文窗口大小为一百万个词元。

Unfortunately using context has a slight cost, which is often called context rot. Context rot is the observation that model performance degrades as context grows because attention gets spread across more tokens, and older, irrelevant content starts to distract from the current task. For our 1MM context model, we see some level of context rot happen around ~300-400k tokens, but it is highly dependent on the task- not a fast rule.遗憾的是，使用上下文会带来一些代价，通常被称为上下文衰减。上下文衰减是指随着上下文数量的增长，模型性能会下降，因为注意力会被分散到更多的词元上，而过时的、无关的内容会开始分散对当前任务的注意力。对于我们100万词元的上下文模型，我们观察到在大约30万到40万词元时会出现一定程度的上下文衰减，但这很大程度上取决于任务——并非一个通用的规律。

Context windows are a hard cutoff, so when you’re nearing the end of the context window, you will need to summarize the task you’ve been working on into a smaller description and continue the work in a new context window, we call this compaction. You can also trigger compaction yourself.上下文窗口是硬性截止的，所以当上下文窗口即将结束时，你需要将正在处理的任务总结成更简短的描述，然后在新的上下文窗口中继续工作，我们称之为压缩。你也可以手动触发压缩。

![Image](https://pbs.twimg.com/media/HF-ntaxboAAZuCm?format=jpg&name=large)

# Every Turn Is a Branching Point每一步都是分岔点

Say you've just asked Claude to do something and it's finished, you’ve now got some information in your context (tool calls, tool outputs, your instructions) and you have a surprising number of options for what to do next:假设你刚刚让 Claude 做某事，现在事情已经完成，你现在掌握了一些上下文信息（工具调用、工具输出、你的指令），并且你有很多选择来决定下一步该做什么：

- **Continue** — send another message in the same session**继续** ——在同一会话中发送另一条消息
- **/rewind (esc esc)** — jump back to a previous message and try again from there**/rewind（Esc 键）** ——跳转到上一条消息并从那里重试。
- **/clear** — start a new session, usually with a brief you've distilled from what you just learned**/clear** — 开始一个新的会话，通常会简要说明你刚刚学到的内容。
- **Compact** — summarize the session so far and keep going on top of the summary**精简** ——总结目前为止的会议内容，并在此基础上继续讨论。
- **Subagents** — delegate the next chunk of work to an agent with its own clean context, and only pull its result back in**子代理** ——将下一部分工作委托给一个拥有自身清晰上下文的代理，并且仅将其结果拉回。

While the most natural is just to continue, the other four options exist to help manage your context.虽然最自然的做法是继续，但还有其他四种选择可以帮助你管理你的上下文。

![Image](https://pbs.twimg.com/media/HF-n6mMbEAEImhv?format=jpg&name=large)

## When to Start a New Session何时开始新会话

The new 1M context windows means that you can now do longer tasks more reliably, for example to have it build a full-stack app from scratch. But just because your model hasn't run out of context, it doesn't mean you shouldn't start a new session.新的 1M 上下文窗口意味着您现在可以更可靠地执行更长时间的任务，例如从头开始构建一个全栈应用程序。但是，即使您的模型尚未耗尽上下文，也不意味着您不应该启动新的会话。

Our general rule of thumb is when you start a new task, you should also start a new session.我们通常的经验法则是，当你开始一项新任务时，也应该开始一个新的会话。

A grey area is when you may want to do related tasks where some of the context is still necessary, but not all. 灰色地带是指当你想执行相关任务时，某些背景信息仍然是必要的，但并非所有背景信息都是必要的。

For example, writing the documentation for a feature you just implemented. While you could start a new session, Claude would have to reread the files that you just implemented, which would be slower and more expensive. Since documentation may not be a highly intelligence sensitive task, the extra context is probably worth the efficiency gain of not having to re-read the relevant files again.例如，编写你刚刚实现的功能的文档。虽然你可以新建一个会话，但 Claude 需要重新阅读你刚刚实现的文件，这会更慢也更费时。由于文档编写可能并非一项高度依赖智能的任务，因此无需再次阅读相关文件所带来的效率提升，或许值得你为此付出额外的上下文信息。

## Rewinding Instead of Correcting倒带而不是纠正

![Image](https://pbs.twimg.com/media/HF-oDqjbEAI94h5?format=jpg&name=large)

If I had to pick one habit that signals good context management, it’s rewind.如果非要我选一个能体现良好情境管理能力的习惯，那就是回溯。

In Claude Code, double-tapping Esc(or running /rewind) lets you jump back to any previous message and re-prompt from there. The messages after that point are dropped from the context.在 Claude Code 中，双击 Esc 键（或运行 /rewind 命令）可以跳转到之前的任何一条消息，并从那里重新开始提示。之后的消息将从上下文中移除。

Rewind is often the better approach to correction. For example, Claude reads five files, tries an approach, and it doesn't work. Your instinct may be to type "that didn't work, try X instead." but the better move is to rewind to just after the file reads, and re-prompt with what you learned. "Don't use approach A, the foo module doesn't expose that — go straight to B."回溯通常是更好的纠正方法。例如，Claude 读取了五个文件，尝试了一种方法，但失败了。你可能本能地会输入“这种方法行不通，试试 X”，但更好的做法是回溯到文件读取之后，并根据你学到的知识重新提示。“不要使用方法 A，foo 模块没有提供这种方法——直接使用方法 B。”

You can also use “summarize from here” to have Claude summarize its learnings and create a handoff message, kind of like a message to the previous iteration of Claude from its future self that tried something and it didn’t work.你还可以使用 “从这里总结” 功能 ，让 Claude 总结它的经验教训并创建交接消息，就像未来的 Claude 向之前的 Claude 版本发送消息，表示它尝试了某些事情但没有成功。

![Image](https://pbs.twimg.com/media/HF-oKwBbEAAdb6I?format=jpg&name=large)

## Compacting vs. Fresh Sessions压缩会话与全新会话

Once a session gets long, you have two ways to shed weight: /compact or /clear (and start fresh). They feel similar but behave very differently.如果会话时间过长，你有两种方法可以减少训练量：/compact 或 /clear（然后重新开始）。它们的感觉相似，但实际效果却截然不同。

**Compact** asks the model to summarize the conversation so far, then replaces the history with that summary. It's lossy, you're trusting Claude to decide what mattered, but you didn't have to write anything yourself and Claude might be more thorough in including important learnings or files. You can also steer it by passing instructions (/compact focus on the auth refactor, drop the test debugging).**Compact** 会要求模型总结到目前为止的对话，然后用该总结替换历史记录。这是一种有损数据的方法，你需要信任 Claude 来判断哪些信息是重要的，但好处是你无需自己编写任何代码，而且 Claude 可能会更全面地包含重要的学习成果或文件。你还可以通过传递指令来控制它（例如，\`/compact focus on the auth refactor, drop the test debugging\`）。

![Image](https://pbs.twimg.com/media/HF-oPtxaAAAUKMr?format=jpg&name=large)

With /clear you write down what matters ("we're refactoring the auth middleware, the constraint is X, the files that matter are A and B, we've ruled out approach Y") and start clean. It's more work, but the resulting context is what you decided was relevant.使用 /clear 把重要的事情写下来（“我们要重构身份验证中间件，限制条件是 X，相关的文件是 A 和 B，我们已经排除了方案 Y”），然后从头开始。这样做工作量更大，但最终得到的上下文信息才是你认为真正相关的。

## What Causes a Bad Compact?什么原因会导致合同违约？

![Image](https://pbs.twimg.com/media/HF-oy22bEAE_Jd8?format=jpg&name=large)

If you run a lot of long running sessions, you might have noticed times in which compacting might be particularly bad. In this case we’ve often found that bad compacts can happen when the model can’t predict the direction your work is going.如果你运行过很多长时间的计算任务，你可能会注意到某些时候压缩效果特别差。在这种情况下，我们发现，当模型无法预测计算方向时，往往会出现压缩效果不佳的情况。

For example autocompact fires after a long debugging session and summarizes the investigation and your next message is "now fix that other warning we saw in [bar.ts](http://bar.ts/)."例如，在长时间调试会话后，自动压缩功能会触发并总结调查结果，而你的下一条消息是“现在修复我们在调试会话中看到的另一个警告”。 [bar.ts](http://bar.ts/) “

But because the session was focused on debugging, the other warning might have been dropped from the summary.但由于本次会议的重点是调试，因此其他警告可能已从摘要中省略。

This is particularly difficult, because due to context rot, the model is at its least intelligent point when compacting. With one million context, you have more time to /compact proactively with a description of what you want to do.这尤其困难，因为由于上下文信息衰减，模型在压缩时处于最不智能的状态。有了 100 万条上下文信息，你就有更多时间主动使用/compact 命令，并描述你想要执行的操作。

## Subagents & Fresh Context Windows子代理和新鲜上下文窗口

![Image](https://pbs.twimg.com/media/HF-o6v1bQAA7pS6?format=jpg&name=large)

Subagents are a form of context management, useful for when you know in advance that a chunk of work will produce a lot of intermediate output you won't need again.子代理是一种上下文管理形式，当您预先知道一项工作会产生大量您以后不再需要的中间输出时，子代理非常有用。

When Claude spawns a subagent via the Agent tool, that subagent gets its own fresh context window. It can do as much work as it needs to, and then synthesize its results so only the final report comes back to the parent.当 Claude 通过“代理”工具生成一个子代理时，该子代理会获得一个全新的上下文窗口。它可以执行所需的所有工作，然后综合结果，最终只有最终报告会返回给父代理。

The mental test we use: will I need this tool output again, or just the conclusion?我们使用的心理测试是： 我是否需要再次使用此工具的输出结果，还是只需要结论？

While Claude Code will automatically call subagents, you may want to tell it to explicitly do this. For example, you may want to tell it to:虽然 Claude Code 会自动调用子代理，但您可能希望明确地告诉它这样做。例如，您可能希望告诉它：

- “Spin up a subagent to verify the result of this work based on the following spec file”“根据以下规范文件启动一个子代理来验证这项工作的结果”
- “Spin off a subagent to read through this other codebase and summarize how it implemented the auth flow, then implement it yourself in the same way”“派出一个子代理来仔细阅读另一个代码库，总结它是如何实现身份验证流程的，然后你自己以同样的方式实现它。”
- “Spin off a subagent to write the docs on this feature based on my git changes”“派出一个子代理，根据我的 Git 修改来编写此功能的文档。”

# Summary概括

In summary, when Claude has ended a turn and you’re about to send a new message, you have a decision point. 总之，当克劳德结束一个回合，而你即将发送新消息时，你就面临一个抉择点。

Overtime we expect that Claude will help you handle this itself, but for now this is one of the ways you can guide Claude's output.我们希望克劳德能够帮助你处理这个问题，但目前这是你可以指导克劳德输出结果的方法之一。

![Image](https://pbs.twimg.com/media/HF-qwt9bEAEa1eq?format=jpg&name=large)