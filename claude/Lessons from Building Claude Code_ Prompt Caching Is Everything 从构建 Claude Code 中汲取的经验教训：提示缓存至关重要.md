---
title: "Lessons from Building Claude Code: Prompt Caching Is Everything 从构建 Claude Code 中汲取的经验教训：提示缓存至关重要"
source: "https://x.com/trq212/status/2024574133011673516"
author:
  - "[[Thariq]]"
published: 2026-02-20
created: 2026-03-23
description:
tags:
  - "clippings"
---
It is often said in engineering that "Cache Rules Everything Around Me", and the same rule holds for agents.工程学中常说“缓存决定一切”，这条规则同样适用于代理。

Long running agentic products like Claude Code are made feasible by **prompt caching** which allows us to reuse computation from previous roundtrips and significantly decrease latency and cost. 像 Claude Code 这样的长时间运行的代理产品之所以可行，是因为有了**及时缓存** ，我们可以重用以前往返的计算结果，从而显著降低延迟和成本。

What is prompt caching, how does it work and how do you implement it technically? [Read more in @RLanceMartin's piece on prompt caching and our new auto-caching launch.](https://x.com/RLanceMartin/status/2024573404888911886)什么是提示缓存？它是如何工作的？如何从技术上实现它？ [请阅读 @RLanceMartin 关于提示缓存和我们新推出的自动缓存功能的文章，了解更多信息。](https://x.com/RLanceMartin/status/2024573404888911886)

At Claude Code, we build our entire harness around prompt caching. A high prompt cache hit rate decreases costs and helps us create more generous rate limits for our subscription plans, so we run alerts on our prompt cache hit rate and declare SEVs if they're too low.在 Claude Code，我们整个系统都围绕提示缓存构建。较高的提示缓存命中率可以降低成本，并帮助我们为订阅计划设定更宽松的速率限制，因此我们会监控提示缓存命中率，并在命中率过低时发出严重事件警报 (SEV)。

These are the (often unintuitive) lessons we've learned from optimizing prompt caching at scale.以下是我们从大规模优化提示缓存中学到的（通常不符合直觉的）经验教训。

## Lay Out Your Prompt for Caching规划缓存提示

![Image](https://pbs.twimg.com/media/HBipHa1boAAXD_A?format=jpg&name=large)

Prompt caching works by prefix matching — the API caches everything from the start of the request up to each cache\_control breakpoint. This means the order you put things in matters enormously, you want as many of your requests to share a prefix as possible.提示缓存的工作原理是前缀匹配——API 会缓存从请求开始到每个 cache\_control 断点之间的所有内容。这意味着请求的顺序至关重要，您应该尽可能让多个请求共享同一个前缀。

The best way to do this is static content first, dynamic content last. For Claude Code this looks like:最佳做法是先添加静态内容，最后添加动态内容。对于 Claude Code 来说，这看起来像这样：

1. **Static system prompt** & Tools (globally cached)**静态系统提示符**和工具（全局缓存）
2. **Claude.MD** (cached within a project)**Claude.MD** （缓存于项目内）
3. **Session context** (cached within a session)**会话上下文** （缓存于会话中）
4. **Conversation messages** **对话消息**

This way we maximize how many sessions share cache hits.这样可以最大限度地增加共享缓存命中次数的会话数量。

But this can be surprisingly fragile! Examples of reasons we’ve broken this ordering before include: putting an in-depth timestamp in the static system prompt, shuffling tool order definitions non-deterministically, updating parameters of tools (e.g. what agents the AgentTool can call), etc.但这种机制可能非常脆弱！我们之前破坏这种排序的原因包括：在静态系统提示符中放置详细的时间戳、不确定地打乱工具顺序定义、更新工具的参数（例如 AgentTool 可以调用哪些代理）等等。

## Use Messages for Updates使用消息进行更新

There may be times when the information you put in your prompt becomes out of date, for example if you have the time or if the user changes a file. It may be tempting to update the prompt, but that would result in a cache miss and could end up being quite expensive for the user.有时，您在提示信息中输入的内容可能会过时，例如当您没有时间更新，或者用户更改了文件时。您可能很想更新提示信息，但这会导致缓存未命中，最终可能会给用户带来相当大的开销。

Consider if you can pass in this information via messages in the next turn instead. In Claude Code, we add a <system-reminder> tag in the next user message or tool result with the updated information for the model (e.g. it is now Wednesday), which helps preserve the cache.考虑一下你是否可以在下一回合通过消息传递这些信息。在克劳德代码中，我们添加了一个<system-reminder>在下一个用户消息或工具结果中标记模型的更新信息（例如，现在是星期三），这有助于保存缓存。

## Don't change Models Mid-Session不要在会话中途更改模型

Prompt caches are unique to models and this can make the math of prompt caching quite unintuitive.提示缓存是特定模型独有的，这使得提示缓存的数学计算相当反直觉。

If you're 100k tokens into a conversation with Opus and want to ask a question that is fairly easy to answer, it would actually be more expensive to switch to Haiku than to have Opus answer, because we would need to rebuild the prompt cache for Haiku.如果你已经和 Opus 进行了 10 万次对话，并且想问一个很容易回答的问题，那么切换到 Haiku 实际上会比让 Opus 回答更昂贵，因为我们需要重建 Haiku 的提示缓存。

If you need to switch models, the best way to do it is with subagents, where Opus would prepare a "handoff" message to another model on the task that it needs done. We do this often with the Explore agents in Claude Code which use Haiku.如果需要切换模型，最佳方法是使用子代理，Opus 会准备一条“交接”消息，将需要完成的任务传递给另一个模型。我们在 Claude Code 中使用 Haiku 的 Explore 代理时经常这样做。

## Never Add or Remove Tools Mid-Session切勿在会话期间添加或删除工具

Changing the tool set in the middle of a conversation is one of the most common ways people break prompt caching. It seems intuitive — you should only give the model tools you think it needs right now. But because tools are part of the cached prefix, adding or removing a tool invalidates the cache for the entire conversation.在对话过程中更改工具集是破坏提示缓存最常见的方式之一。这看似合乎直觉——你应该只给模型提供它当前需要的工具。但由于工具是缓存前缀的一部分，添加或删除工具会使整个对话的缓存失效。

**Plan Mode — Design Around the Cache规划模式——围绕缓存进行设计**

Plan mode is a great example of designing features around caching constraints. The intuitive approach would be: when the user enters plan mode, swap out the tool set to only include read-only tools. But that would break the cache.计划模式是围绕缓存限制设计功能的一个很好的例子。直观的做法是：当用户进入计划模式时，将工具集替换为仅包含只读工具。但这会破坏缓存。

Instead, we keep all tools in the request at all times and use EnterPlanMode and ExitPlanMode as tools themselves. When the user toggles plan mode on, the agent gets a system message explaining that it's in plan mode and what the instructions are — explore the codebase, don't edit files, call ExitPlanMode when the plan is complete. The tool definitions never change.相反，我们始终将所有工具保留在请求中，并将 EnterPlanMode 和 ExitPlanMode 本身用作工具。当用户启用计划模式时，代理会收到一条系统消息，说明其已处于计划模式以及相应的指令——浏览代码库、不要编辑文件、在计划完成后调用 ExitPlanMode。工具定义始终保持不变。

This has a bonus benefit: because EnterPlanMode is a tool the model can call itself, it can autonomously enter plan mode when it detects a hard problem, without any cache break.这还有一个额外的好处：因为 EnterPlanMode 是模型可以调用自身的一个工具，所以当它检测到难题时，它可以自主进入计划模式，而不会中断缓存。

**Tool Search — Defer Instead of Remove工具搜索 — 延迟删除**

The same principle applies to our tool search feature. Claude Code can have dozens of MCP tools loaded, and including all of them in every request would be expensive. But removing them mid-conversation would break the cache.同样的原理也适用于我们的工具搜索功能。Claude Code 可以加载数十个 MCP 工具，如果每次请求都包含所有工具，开销会很大。但如果在对话过程中移除这些工具，又会破坏缓存。

Our solution: defer\_loading. Instead of removing tools, we send lightweight stubs — just the tool name, with defer\_loading: true — that the model can "discover" via a ToolSearch tool when needed. The full tool schemas are only loaded when the model selects them. This keeps the cached prefix stable: the same stubs are always present in the same order.我们的解决方案：延迟加载。我们不会移除工具，而是发送轻量级的工具存根——仅包含工具名称，并将 \`defer\_loading: true\` 设置为 true——模型可以在需要时通过 \`ToolSearch\` 工具“发现”这些存根。完整的工具架构仅在模型选择它们时才会加载。这样可以保持缓存前缀的稳定性：相同的存根始终以相同的顺序存在。

Luckily you can use the [tool search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) tool through our API to simplify this.幸运的是，你可以使用[工具搜索](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)通过我们的 API 工具简化此过程。

## Forking Context — Compaction分叉上下文 — 压缩

![Image](https://pbs.twimg.com/media/HBitEdRbUAMVSnM?format=jpg&name=large)

Compaction is what happens when you run out of the context window. We summarize the conversation so far and continue a new session with that summary.当上下文窗口超出范围时，就会发生压缩。我们会总结目前为止的对话内容，并使用该总结结果继续新的会话。

Surprisingly, compaction has many edge cases with prompt caching that can be unintuitive.令人惊讶的是，压缩在即时缓存方面有很多特殊情况，这可能不太直观。

In particular, when we compact we need to send the entire conversation to the model to generate a summary. If this is a separate API call with a different system prompt and no tools (which is the simple implementation), the cached prefix from the main conversation doesn't match at all. You pay full price for all those input tokens, drastically increasing the cost for the user.具体来说，当我们进行压缩时，需要将整个对话发送给模型以生成摘要。如果这是一个单独的 API 调用，带有不同的系统提示且未使用任何工具（这是最简单的实现方式），则主对话中缓存的前缀将完全不匹配。用户需要为所有这些输入令牌支付全额费用，从而大幅增加成本。

**The Solution — Cache-Safe Forking解决方案——缓存安全分叉**

When we run compaction, we use the exact same system prompt, user context, system context, and tool definitions as the parent conversation. We prepend the parent's conversation messages, then append the compaction prompt as a new user message at the end.执行压缩操作时，我们使用与父会话完全相同的系统提示符、用户上下文、系统上下文和工具定义。我们会将父会话的消息添加到压缩提示符之前，然后在末尾添加新的用户消息。

From the API's perspective, this request looks nearly identical to the parent's last request — same prefix, same tools, same history — so the cached prefix is reused. The only new tokens are the compaction prompt itself.从 API 的角度来看，这个请求几乎与父级请求的最后一个请求完全相同——相同的前缀、相同的工具、相同的历史记录——因此缓存的前缀被重用。唯一的新标记是压缩提示本身。

This does mean however that we need to save a "compaction buffer" so that we have enough room in the context window to include the compact message and the summary output tokens.但这意味着我们需要保存一个“压缩缓冲区”，以便在上下文窗口中有足够的空间来包含压缩消息和摘要输出标记。

Compaction is tricky but luckily, you don't need to learn these lessons yourself — based on our learnings from Claude Code we built [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction#prompt-caching) directly into the API, so you can apply these patterns in your own applications.压缩很棘手，但幸运的是，你不需要自己去学习这些经验——基于我们从 Claude Code 那里学到的知识，我们构建了[压实](https://platform.claude.com/docs/en/build-with-claude/compaction#prompt-caching)直接集成到 API 中，因此您可以将这些模式应用到您自己的应用程序中。

## Lessons Learned经验教训

1. **Prompt caching is a prefix match.** Any change anywhere in the prefix invalidates everything after it. Design your entire system around this constraint. Get the ordering right and most of the caching works for free.**提示缓存采用前缀匹配。** 前缀中任何位置的更改都会使该位置之后的所有内容失效。请围绕此约束设计您的整个系统。只要顺序正确，大部分缓存功能就能免费发挥作用。
2. **Use messages instead of system prompt changes**. You may be tempted to edit the system prompt to do things like entering plan mode, changing the date, etc. but it would actually be better to insert these into messages during the conversation.**使用消息而不是修改系统提示** 。您可能想通过编辑系统提示来执行诸如进入计划模式、更改日期等操作，但实际上最好在对话过程中将这些操作插入到消息中。
3. **Don't change tools or models mid-conversation.** Use tools to model state transitions (like plan mode) rather than changing the tool set. Defer tool loading instead of removing tools.**不要在对话过程中切换工具或模型。** 使用工具来模拟状态转换（例如计划模式），而不是更改工具集。延迟加载工具，而不是移除工具。
4. **Monitor your cache hit rate like you monitor uptime.** We alert on cache breaks and treat them as incidents. A few percentage points of cache miss rate can dramatically affect cost and latency.**像监控正常运行时间一样监控缓存命中率。** 我们会对缓存中断发出警报，并将其视为事件进行处理。即使缓存未命中率只有几个百分点，也会对成本和延迟产生显著影响。
5. **Fork operations need to share the parent's prefix.** If you need to run a side computation (compaction, summarization, skill execution), use identical cache-safe parameters so you get cache hits on the parent's prefix.**分支操作需要共享父进程的前缀。** 如果需要运行额外的计算（例如压缩、摘要、技能执行），请使用相同的缓存安全参数，以便缓存能够命中父进程的前缀。

Claude Code is built around prompt caching from day one, you should do the same if you’re building an agent.Claude Code 从一开始就围绕提示缓存构建，如果你要构建代理，你也应该这样做。