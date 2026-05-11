---
title: "Lessons from Building Claude Code: Seeing like an Agent 从构建 Claude Code 中汲取的经验教训：像代理一样思考"
source: "https://x.com/trq212/status/2027463795355095314"
author:
  - "[[Thariq]]"
published: 2026-02-28
created: 2026-03-23
description:
tags:
  - "clippings"
---
One of the hardest parts of building an agent harness is constructing its action space.构建代理框架最困难的部分之一是构建其动作空间。

Claude acts through Tool Calling, but there are a number of ways tools can be constructed in the Claude API with primitives like bash, skills and recently code execution (read more about programmatic tool calling on the Claude API in [@RLanceMartin's new article](https://x.com/RLanceMartin/status/2027450018513490419)).Claude 通过工具调用来实现功能，但 Claude API 提供了多种构建工具的方式，包括使用 bash、技能以及最近新增的代码执行等原语（更多关于 Claude API 中程序化工具调用的信息，请阅读相关文档）。 [@RLanceMartin 的新文章](https://x.com/RLanceMartin/status/2027450018513490419) ）。

Given all these options, how do you design the tools of your agent? Do you need just one tool like code execution or bash? What if you had 50 tools, one for each use case your agent might run into?面对这么多选择，你该如何设计代理的工具？你只需要一个工具，比如代码执行工具或 Bash 脚本工具吗？如果你有 50 个工具，每个工具对应代理可能遇到的一个用例，你又该如何设计？

To put myself in the mind of the model I like to imagine being given a difficult math problem. What tools would you want in order to solve it? It would depend on your own skills!为了设身处地地站在模型的角度思考，我喜欢想象自己遇到一道难题。你会用什么工具来解决它呢？这取决于你自身的技能！

Paper would be the minimum, but you’d be limited by manual calculations. A calculator would be better, but you would need to know how to operate the more advanced options. The fastest and most powerful option would be a computer, but you would have to know how to use it to write and execute code.纸张是最基本的工具，但只能手动计算，非常不方便。计算器当然更好，但你需要掌握一些高级功能。最快捷、最强大的选择是电脑，但你必须知道如何用电脑编写和执行代码。

This is a useful framework for designing your agent. You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent. 这是一个设计智能体的实用框架。你需要赋予它符合自身能力的工具。但如何才能知道它有哪些能力呢？你需要仔细观察，解读它的输出，并进行实验。你要学会像智能体一样思考。

Here are some lessons we’ve learned from paying attention to Claude while building Claude Code.以下是我们通过关注 Claude 并在此基础上构建 Claude Code 而学到的一些经验教训。

# Improving Elicitation & the AskUserQuestion tool改进信息获取和“询问用户问题”工具

![Image](https://pbs.twimg.com/media/HCLxg2JbsAA3Ag_?format=jpg&name=large)

When building the AskUserQuestion tool, our goal was to improve Claude’s ability to ask questions (often called elicitation). 在构建 AskUserQuestion 工具时，我们的目标是提高 Claude 提问的能力（通常称为启发式提问）。

While Claude could just ask questions in plain text, we found answering those questions felt like they took an unnecessary amount of time. How could we lower this friction and increase the bandwidth of communication between the user and Claude?虽然克劳德可以直接用纯文本提问，但我们发现回答这些问题似乎花费了太多不必要的时间。我们该如何降低这种摩擦，提高用户与克劳德之间的沟通效率呢？

## Attempt #1 - Editing the ExitPlanTool尝试 1 - 编辑退出计划工具

The first thing we tried was adding a parameter to the ExitPlanTool to have an array of questions alongside the plan. This was the easiest thing to implement, but it confused Claude because we were simultaneously asking for a plan and a set of questions about the plan. What if the user’s answers conflicted with what the plan said? Would Claude need to call the ExitPlanTool twice? We needed another approach.我们首先尝试在 ExitPlanTool 中添加一个参数，以便在提供计划的同时，还能包含一系列问题。这虽然实现起来最简单，但却让 Claude 感到困惑，因为我们既要求用户提供计划，又要求他们回答一系列关于该计划的问题。如果用户的回答与计划内容相冲突怎么办？Claude 是否需要调用两次 ExitPlanTool？我们需要另一种方法。

(you can read more about why we made an ExitPlanTool in [our post on prompt caching](https://x.com/trq212/status/2024574133011673516))（您可以阅读更多关于我们为什么创建退出计划工具的信息） [我们关于提示缓存的帖子](https://x.com/trq212/status/2024574133011673516) ）

## Attempt #2 - Changing Output Format尝试 2 - 更改输出格式

Next we tried modifying Claude’s output instructions to serve a slightly modified markdown format that it could use to ask questions. For example, we could ask it to output a list of bullet point questions with alternatives in brackets. We could then parse and format that question as UI for the user.接下来，我们尝试修改 Claude 的输出指令，使其能够使用略微修改过的 Markdown 格式来提问。例如，我们可以让它输出一个包含选项的列表，选项用括号括起来。然后，我们可以解析并格式化这些问题，使其成为用户用户界面。

While this was the most general change we could make and Claude even seemed to be okay at outputting this, it was not guaranteed. Claude would append extra sentences, omit options, or use a different format altogether.虽然这是我们能做的最通用的改动，而且克劳德似乎也能接受这种输出方式，但这并不能保证成功。克劳德可能会添加额外的句子、省略选项，或者完全使用不同的格式。

## Attempt #3 - The AskUserQuestion Tool尝试 3 - AskUserQuestion 工具

![Image](https://pbs.twimg.com/media/HCL0gcObkAA4tKt?format=jpg&name=large)

Finally, we landed on creating a tool that Claude could call at any point, but it was particularly prompted to do so during plan mode. When the tool triggered we would show a modal to display the questions and block the agent's loop until the user answered.最终，我们决定创建一个工具，克劳德可以在任何时候调用它，尤其是在计划模式下。当该工具被触发时，我们会显示一个模态框来呈现问题，并阻塞代理的循环，直到用户回答为止。

This tool allowed us to prompt Claude for a structured output and it helped us ensure that Claude gave the user multiple options. It also gave users ways to compose this functionality, for example calling it in the Agent SDK or using referring to it in skills.这个工具使我们能够引导 Claude 生成结构化的输出，并确保 Claude 为用户提供多种选项。它还为用户提供了组合此功能的方法，例如在 Agent SDK 中调用它，或在技能中引用它。

Most importantly, Claude seemed to like calling this tool and we found its outputs worked well. Even the best designed tool doesn’t work if Claude doesn’t understand how to call it.最重要的是，克劳德似乎很喜欢调用这个工具，而且我们发现它的输出结果也很好用。即使是设计得最好的工具，如果克劳德不知道怎么调用，也发挥不了作用。

Is this the final form of elicitation in Claude Code? We’re not sure. As you’ll see in the next example, what works for one model may not be the best for another.这是克劳德代码中最终的启发式方法吗？我们并不确定。正如您将在下一个示例中看到的那样，适用于一种模型的方法可能并不适用于另一种模型。

# Updating with Capabilities - Tasks & Todos更新功能 - 任务和待办事项

![Image](https://pbs.twimg.com/media/HCLxrfXbEAUXwRV?format=jpg&name=large)

When we first launched Claude Code, we realized that the model needed a Todo list to keep it on track. Todos could be written at the start and checked off as the model did work. To do this we gave Claude the TodoWrite tool, which would write or update Todos and display them to the user.在最初推出 Claude Code 时，我们意识到该模型需要一个待办事项列表来跟踪进度。待办事项可以在开始时编写，并在模型完成工作后逐一勾选。为此，我们为 Claude 添加了 TodoWrite 工具，它可以编写或更新待办事项并将其显示给用户。

But even then we often saw Claude forgetting what it had to do. To adapt, we inserted system reminders every 5 turns that reminded Claude of its goal.但即便如此，我们还是经常看到克劳德忘记它该做什么。为了解决这个问题，我们每隔5回合就插入系统提醒，提醒克劳德它的目标。

But as models improved, they not only did not need to be reminded of the Todo List but could find it limiting. Being sent reminders of the todo list made Claude think that it had to stick to the list instead of modifying it. We also saw Opus 4.5 also get much better at using subagents, but how could subagents coordinate on a shared Todo List?但随着模型的改进，它们不仅不再需要被提醒待办事项清单，反而会觉得这种提醒过于苛刻。收到待办事项清单的提醒会让 Claude 认为它必须严格遵守清单，而不能对其进行修改。我们也看到 Opus 4.5 在子代理的使用方面有了显著提升，但子代理如何才能在共享的待办事项清单上进行协调呢？

Seeing this, we replaced TodoWrite with the Task Tool ([read more on Tasks here](https://x.com/trq212/status/2014480496013803643)). Whereas Todos were about keeping the model on track, Tasks were more about helping agents communicate with each other. Tasks could include dependencies, share updates across subagents and the model could alter and delete them.鉴于此，我们将 TodoWrite 替换为任务工具（ [点击此处阅读更多关于任务的信息](https://x.com/trq212/status/2014480496013803643)待办事项（Todos）旨在确保模型按计划运行，而任务（Tasks）则更侧重于帮助智能体之间进行沟通。任务可以包含依赖关系，在子智能体之间共享更新，模型也可以修改和删除它们。

As model capabilities increase, the tools that your models once needed might now be constraining them. It’s important to constantly revisit previous assumptions on what tools are needed. This is also why it's useful to stick to a small set of models to support that have a fairly similar capabilities profile.随着模型功能的增强，模型曾经所需的工具现在可能反而会限制它们的发展。因此，不断重新审视之前对所需工具的假设至关重要。这也是为什么坚持使用功能较为相似的少量模型进行支持会很有帮助的原因。

# Designing a Search Interface 设计搜索界面

A particularly important set of tools for Claude are the search tools that can be used to build its own context.对于 Claude 来说，一套特别重要的工具是可以用来构建自身上下文的搜索工具。

When Claude Code first came out, we used a RAG vector database to find context for Claude. While RAG was powerful and fast it required indexing and setup and could be fragile across a host of different environments. More importantly, Claude was given this context instead of finding the context itself.Claude Code 最初发布时，我们使用 RAG 向量数据库来查找 Claude 的上下文。虽然 RAG 功能强大且速度很快，但它需要索引和配置，并且在各种不同的环境中可能不太稳定。更重要的是，Claude 是被预先获取了上下文，而不是自己去查找。

But if Claude could search on the web, why not search your codebase? By giving Claude a Grep tool, we could let it search for files and build context itself.但既然 Claude 可以搜索网络，为什么不能搜索你的代码库呢？通过给 Claude 提供一个 Grep 工具，我们可以让它搜索文件并自行构建上下文。

This is a pattern we’ve seen as Claude gets smarter, it becomes increasingly good at building its context if it’s given the right tools. 我们已经看到，随着 Claude 变得越来越聪明，如果给予它合适的工具，它就会越来越擅长构建自己的上下文。

When we introduced Agent Skills we formalized the idea of progressive disclosure, which allows agents to incrementally discover relevant context through exploration.当我们引入智能体技能时，我们正式提出了渐进式披露的概念，它允许智能体通过探索逐步发现相关背景。

Claude could read skill files and those files could then reference other files that the model could read recursively. In fact, a common use of skills is to add more search capabilities to Claude like giving it instructions on how to use an API or query a database.Claude 可以读取技能文件，而这些文件又可以引用模型可以递归读取的其他文件。事实上，技能的一个常见用途是为 Claude 添加更多搜索功能，例如指导它如何使用 API 或查询数据库。

Over the course of a year Claude went from not really being able to build its own context, to being able to do nested search across several layers of files to find the exact context it needed.一年多的时间里，Claude 从无法构建自己的上下文，发展到能够跨多个文件层进行嵌套搜索，找到所需的确切上下文。

Progressive disclosure is now a common technique we use to add new functionality without adding a tool.渐进式披露现在是我们常用的一种技术，可以在不添加新工具的情况下添加新功能。

# Progressive Disclosure - The Claude Code Guide Agent渐进式披露——克劳德密码特工指南

Claude Code currently has ~20 tools, and we are constantly asking ourselves if we need all of them. The bar to add a new tool is high, because this gives the model one more option to think about.Claude Code 目前拥有大约 20 个工具，我们一直在思考是否真的需要所有这些工具。添加新工具的门槛很高，因为这会给模型增加一个需要考虑的选项。

For example, we noticed that Claude did not know enough about how to use Claude Code. If you asked it how to add a MCP or what a slash command did, it would not be able to reply.例如，我们注意到克劳德对如何使用克劳德代码了解不足。如果你问它如何添加 MCP 或斜杠命令的作用，它都无法回答。

We could have put all of this information in the system prompt, but given that users rarely asked about this, it would have added context rot and interfered with Claude Code’s main job: writing code.我们本可以将所有这些信息放在系统提示符中，但考虑到用户很少询问这些信息，这样做会增加上下文信息混乱，并干扰 Claude Code 的主要工作：编写代码。

Instead, we tried a form of progressive disclosure. We gave Claude a link to its docs which it could then load to search for more information. This worked but we found that Claude would load a lot of results into context to find the right answer when really all you needed was the answer. 我们尝试了一种渐进式披露的方式。我们给 Claude 提供了一个指向其文档的链接，它可以加载该链接来搜索更多信息。这种方法确实有效，但我们发现 Claude 会加载大量结果并将其与上下文关联起来以找到正确答案，而实际上我们只需要答案本身即可。

So we built the Claude Code Guide subagent which Claude is prompted to call when you ask about itself, the subagent has extensive instructions on how to search docs well and what to return.因此，我们构建了 Claude Code Guide 子代理，当您询问 Claude 自身时，Claude 会提示调用该子代理。该子代理包含有关如何有效搜索文档以及返回什么内容的详细说明。

While this isn’t perfect, Claude can still get confused when you ask it about how to set itself up, it is much better than it used to be! We were able to add things to Claude's action space without adding a tool.虽然这并非完美无缺，比如当你询问 Claude 如何设置自身时，它仍然会感到困惑，但比以前好多了！我们现在无需添加工具即可向 Claude 的操作空间添加内容。

## An Art, not a Science一门艺术，而非科学

If you were hoping for a set of rigid rules on how to build your tools, unfortunately that is not this guide. Designing the tools for your models is as much an art as it is a science. It depends heavily on the model you're using, the goal of the agent and the environment it’s operating in.如果你希望找到一套构建工具的硬性规则，那么很遗憾，本指南并非如此。为模型设计工具既是一门科学，也是一门艺术。它很大程度上取决于你使用的模型、智能体的目标以及它所处的环境。

Experiment often, read your outputs, try new things. See like an agent.多做实验，分析输出结果，尝试新方法。像代理人一样思考。