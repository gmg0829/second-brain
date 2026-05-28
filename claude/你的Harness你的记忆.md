---
title: "Your harness, your memory你的安全带，你的记忆"
source: "https://x.com/hwchase17/status/2042978500567609738"
author:
  - "[[@hwchase17]]"
published: 2026-04-04
created: 2026-04-15
description: "Agent harnesses are becoming the dominant way to build agents, and they are not going anywhere. These harnesses are intimately tied to agent..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HFnud7cakAMK5DE?format=jpg&name=large)

Agent harnesses are becoming the dominant way to build agents, and they are not going anywhere. These harnesses are intimately tied to agent memory. If you used a closed harness - especially if it’s behind a proprietary API - you are choosing to yield control of your agent’s memory to a third party. Memory is incredibly important to creating good and sticky agentic experiences. This creates incredible lock in. Memory - and therefor harnesses - should be open, so that you own your own memory代理框架正逐渐成为构建代理的主流方式，并且这种趋势不会改变。这些框架与代理的内存紧密相连。如果您使用封闭的框架——尤其是当它位于专有 API 之后时——您实际上是将代理内存的控制权拱手让给了第三方。内存对于创建良好且用户粘性的代理体验至关重要。这会导致严重的锁定效应。内存（以及框架）应该是开放的，这样您才能真正拥有自己的内存。

## Agent Harnesses are how you build agents, and they’re not going anywhere代理框架是构建代理的方式，而且它们不会消失。

The “best” way to build agentic systems has changed dramatically over the past three years. When ChatGPT came out, all you could do were simple RAG chains ([LangChain](https://github.com/langchain-ai/langchain)). Then the models got a little better, and could create more complex flows ([LangGraph](https://github.com/langchain-ai/langgraph)). Then they got a lot better, and that gave rise to a new type of scaffolding - [agent harnesses](https://blog.langchain.com/the-anatomy-of-an-agent-harness/).过去三年里，构建智能体的“最佳”方法发生了巨大变化。ChatGPT 刚问世时，你只能创建简单的 RAG 链（ [朗链](https://github.com/langchain-ai/langchain)然后模型变得更好一些，可以创建更复杂的流程（ [LangGraph](https://github.com/langchain-ai/langgraph) 后来他们的技术有了很大的进步，这催生了一种新型的脚手架—— [代理线束](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) 。

Examples of agent harnesses include [Claude Code](https://code.claude.com/docs/en/overview), [Deep Agents](https://github.com/langchain-ai/deepagents), [Pi](https://github.com/badlogic/pi-mono) (powers [OpenClaw](https://docs.openclaw.ai/)), [OpenCode](https://opencode.ai/), [Codex](https://openai.com/codex/), [Letta Code](https://www.letta.com/blog/letta-code), and many more.代理框架的例子包括 Claude Code、Deep Agents、Pi（OpenClaw 的驱动者）、OpenCode、Codex、Letta Code 等等。

![Image](https://pbs.twimg.com/media/HFnuRGXXgAAo6ci?format=png&name=large)

💡**Agent harnesses are not going away.**💡 **代理安全带不会消失。**

There is sometimes sentiment that models will absorb more and more of the scaffolding. This is not true. What has happened (and will continue to happen) is that a lot of the scaffolding needed in 2023 is no longer needed. But this has been replaced by other types of scaffolding. An agent, by definition, is an LLM interacting with tools and other sources of data. There will always be a system around the LLM to facilitate that type of interaction. Need evidence? When Claude Code’s source code was leaked, there was [512k lines of code](https://www.reddit.com/r/technology/comments/1scyuod/anthropic_leaked_512k_lines_of_claude_codebut/). That code is the harness. Even the makers of the best model in the world are investing heavily in harnesses.有时人们会认为模型会吸收越来越多的脚手架。事实并非如此。已经发生（并将继续发生）的是，2023 年所需的许多脚手架已不再需要。但这些脚手架已被其他类型的脚手架所取代。根据定义，代理是与工具和其他数据源交互的逻辑逻辑模型 (LLM)。LLM 周围始终会有一个系统来促进这种交互。需要证据吗？当 Claude Code 的源代码泄露时，就出现了这种情况。 [512k 行代码](https://www.reddit.com/r/technology/comments/1scyuod/anthropic_leaked_512k_lines_of_claude_codebut/)那段代码就是框架。即使是世界上最好的模型制造商，也在框架上投入巨资。

When things like web search are built into OpenAI and Anthropic’s APIs - they are not “part of the model”. Rather, they are part of a lightweight harness that sits behind their APIs and orchestrates the model with those web search APIs (via nothing other than tool calling).当像网络搜索这样的功能被集成到 OpenAI 和 Anthropic 的 API 中时，它们并不是“模型的一部分”。相反，它们是位于 API 背后的轻量级框架的一部分，该框架通过工具调用来协调模型与这些网络搜索 API 之间的交互。

## Harnesses are tied to memory线束与记忆相连

Sarah Wooders wrote a [great blog](https://x.com/sarahwooders/status/2040121230473457921) on why “memory isn’t a plugin (it’s the harness)”, and I couldn’t agree with it more.莎拉·伍德斯写了一篇[很棒的博客](https://x.com/sarahwooders/status/2040121230473457921)关于“内存不是插件（而是框架）”这一点，我完全同意。

> Apr 4

There is sometimes sentiment that memory is a standalone service, separate from any particular harness. At this point in time, that is not true.有些人认为内存是一种独立服务，与任何特定的硬件平台都无关。但就目前而言，这种观点并不正确。

A large responsibility of the harness is to interact with context. As Sarah puts it:安全带的一项重要职责是与环境互动。正如莎拉所说：

> Asking to plug memory into an agent harness is like asking to plug driving into a car. Managing context, and therefore memory, is a core capability and responsibility of the agent harness.要求将内存接入代理程序框架，就好比要求将驾驶功能接入汽车一样。管理上下文（因此也包括内存）是代理程序框架的核心能力和职责。

Memory is just a form of context. Short term memory (messages in the conversation, large tool call results) are handled by the harness. Long term memory (cross session memory) needs to be updated and read by the harness. Sarah lists out many other ways the harness is tied to memory:记忆只是一种上下文形式。短期记忆（对话中的消息、大型工具调用结果）由框架处理。长期记忆（跨会话记忆）需要由框架更新和读取。Sarah 还列举了框架与记忆相关的其他许多方式：

> How is the [AGENTS.md](http://agents.md/) or [CLAUDE.md](http://claude.md/) file loaded into context? How is skill metadata shown to the agents? (in the system prompt? in system messages?) Can the agent modify its own system instructions? What survives compaction, and what's lost? Are interactions stored and made queryable? How is memory metadata presented to the agent? How is the current working directory represented? How much filesystem information is exposed?

Right now, memory as a concept is in it’s infancy. It’s so early for memory. Transparently, we see that long term memory is often not part of the MVP. First you need to get an agent working generally, then you can worry about personalization. This means that we (as an industry) are still figuring out memory. This means there are not well known or common abstractions for memory. If memory does become more known, and as we discover best practices, it is possible that separate memory systems start to make sense. But not at this point in time. Right now, as Sarah said, “ultimately, how the harness manages context and state in general is the foundation for agent memory.”目前，记忆的概念还处于萌芽阶段。记忆的研究还处于非常早期的阶段。显而易见，长期记忆通常不在最小可行产品（MVP）的范畴之内。首先，你需要让智能体能够基本正常运行，然后才能考虑个性化。这意味着我们（作为一个行业）仍在探索记忆的本质。这意味着目前还没有公认的或通用的记忆抽象概念。如果记忆的概念日趋成熟，并且我们不断探索最佳实践，那么独立的记忆系统或许会变得有意义。但就目前而言，这还为时尚早。正如 Sarah 所说，“归根结底，系统如何管理上下文和状态才是智能体记忆的基础。”

## if you don't own your harness, you don't own your memory如果你不拥有你的安全带，你就不拥有你的记忆。

The harness is intimately tied to memory. 安全带与记忆紧密相连。

![Image](https://pbs.twimg.com/media/HFnyQkOaMAA5Yju?format=jpg&name=large)

💡**If you use a closed harness, especially if its behind an API, you don’t own your memory.** 💡 **如果你使用封闭式框架，尤其是当它位于 API 之后时，你就无法拥有你的内存。**

This manifests itself in several ways.这体现在以下几个方面。

Mildly bad: If you use a stateful API (like OpenAI’s Responses API, or Anthropic’s server side compaction), you are storing state on their server. If you want to swap models and resume previous threads - that is no longer doable.略微不好：如果你使用有状态的 API（例如 OpenAI 的 Responses API 或 Anthropic 的服务器端压缩），你实际上是将状态存储在他们的服务器上。如果你想切换模型并恢复之前的线程，那就无法实现了。

![Image](https://pbs.twimg.com/media/HFnyS21XMAAuaBj?format=jpg&name=large)

Bad: If you use a closed harness (like Claude Agent SDK, which uses Claude Code under the hood, which is not open source), this harness interacts with memory in a way that is unknown to you. Maybe it creates some artifacts client side - but what is the shape of those, and how should a harness use those? That is unknown, and therefor non-transferrable from one harness to another.缺点：如果您使用封闭式框架（例如 Claude Agent SDK，其底层使用非开源的 Claude 代码），该框架会以您未知的方式与内存交互。它可能会在客户端创建一些工件——但这些工件的具体形式是什么？框架又该如何使用它们？这些都是未知的，因此无法从一个框架迁移到另一个框架。

![Image](https://pbs.twimg.com/media/HFnyWT3XwAA0P8e?format=jpg&name=large)

💡**But worst is something else - when the whole harness, including long term memory is behind an API.**💡 **但最糟糕的情况是——当整个系统，包括长期存储器，都位于 API 之后时。**

In this situation, you have zero ownership or visibility into memory, including long term memory. You do not know the harness (which means you don’t know how to use the memory). But even worse - you don’t even own the memory! Maybe some parts are exposed via API, maybe no parts are - you have no control over that.在这种情况下，您对内存（包括长期内存）没有任何所有权或访问权限。您不了解内存的底层架构（这意味着您不知道如何使用内存）。更糟糕的是——您甚至不拥有内存！也许部分内存通过 API 公开，也许没有公开——您对此完全没有控制权。

![Image](https://pbs.twimg.com/media/HFnyZ5vXgAAMD_u?format=jpg&name=large)

When people say that the “models will absorb more and more of the harness” - this is what they really mean. They mean that these memory related parts will go behind the APIs that model providers offer.人们常说“模型将占用越来越多的资源”，这才是他们的真正意思。他们的意思是，这些与内存相关的部分将不再依赖于模型提供商提供的 API。

💡**This is incredibly alarming - it means that memory will become locked into a single platform, a single model.**💡 **这非常令人担忧——这意味着内存将被锁定在单一平台、单一型号中。**

Model providers are incredibly incentivized to do this. And they are starting to. Anthropic launched [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview). This puts literally everything behind an API, locked into their platform.

Even if the whole harness isn’t behind the API, model providers are incentivized to move more and more behind APIs - and are already doing so. For example: even though Codex is an open source, it generates an encrypted compaction summary (that is not usable outside of the OpenAI ecosystem).即使整个框架并非都基于 API，模型提供商也有动力将越来越多的部分转移到 API 之后——而且他们已经开始这样做了。例如：尽管 Codex 是开源的，但它生成的是加密的压缩摘要（无法在 OpenAI 生态系统之外使用）。

Why are they doing this? Because memory is important, and it creates lock in that they don’t get from just the model.他们为什么要这样做？因为内存很重要，而且它能提供仅靠模型无法获得的锁定。

## Memory is important, and it creates lock in内存很重要，它会造成锁定。

Although memory is early, it is clear to everyone that it is important. It is what allows agents to get better as users interact with them, and allows you build up a data flywheel. It is what allows your agent to be personalized to each of your users, and build up an agentic experience that molds to their desires and usage patterns.虽然记忆功能尚处于早期阶段，但其重要性毋庸置疑。它使智能体能够随着用户互动不断改进，并构建起数据飞轮效应。它使智能体能够根据每位用户的需求进行个性化定制，并打造符合其愿望和使用习惯的智能体验。

💡**Without memory, your agents are easily replicable by anyone who has access to the same tools.**💡 **由于没有内存，任何拥有相同工具的人都可以轻松复制您的代理。**

With memory, you build up a proprietary dataset - a dataset of user interactions and preferences. This proprietary dataset allows you to provide a differentiated and increasingly intelligent experience.借助内存，您可以构建专属数据集——包含用户交互和偏好信息的数据集。这个专属数据集使您能够提供差异化​​且日益智能化的用户体验。

It’s been relatively easy to switch model providers to date. They have similar, if not identical, APIs. Sure, you have to change prompts a little bit, but that’s not that hard.到目前为止，切换模型提供商相对容易。它们的 API 相似，甚至完全相同。当然，你需要稍微修改一下提示信息，但这并不难。

But this is all because they are stateless.但这都是因为他们没有国籍。

As soon as there is any state associated, its much harder to switch. Because this memory matters. And if you switch, you lose access to it.一旦某个状态与之关联，切换就变得非常困难。因为这段内存很重要。如果切换，就会失去对它的访问权限。

Let me tell a story. I have an email assistant internally. It’s built on top of a template in [Fleet](https://www.langchain.com/langsmith/fleet), our no-code platform for building Enterprise ready OpenClaws. This platform has memory built in, so as I interacted with my email assistant over the past few months it built up memory. A few weeks ago, my agent got deleted by accident. I was pissed! I tried to create an agent from the same template - but the experience was so much worse. I had to reteach it all my preferences, my tone, everything.

The plus side of my email agent deleted - it made me realize how powerful and sticky memory could be.我的电子邮件代理删除了我的邮件，这也有好处——它让我意识到记忆的力量和持久性。

## Open Memory, Open Harnesses开放内存，开放线束

Memory needs to be opened, owned by whomever is developing the agentic experience. It allows you to build up a proprietary dataset that you actually control.内存需要开放，并归开发智能体体验的人员所有。这允许您构建一个真正由您掌控的专有数据集。

Memory (and therefor harnesses) should be separate from model providers. You should want optionality to try out whatever models are best for your use case. Model providers are incentivized to create lock in via memory.内存（以及相应的框架）应该与模型提供者分离。您应该希望能够灵活地尝试最适合您用例的模型。模型提供者则倾向于通过内存来锁定用户。

This is why we are building [Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview). Deep Agents:

- Is open source是开源的
- Is model agnostic是否与模型无关
- Uses open standards like [agents.md](http://agents.md/) and [skills](https://agentskills.io/home)
- Has plugins to [Mongo](https://www.mongodb.com/docs/atlas/ai-integrations/langgraph/), Postgres, Redis and others for storing memories
- Is deployable: (1) via [LangSmith Deployment](https://docs.langchain.com/langsmith/deployment) (self hostable, can be deployed on any cloud, can bring your own database to serve as a memory store); (2) behind any standard web hosting framework

**In order to own your memory, you need to be using an Open Harness为了拥有自己的内存，你需要使用开放式线束。**

**Try out** [Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview) **today.**

Thank you to a few people for review and thoughts:感谢以下几位朋友的评论和建议：

- [Sydney Runkle](https://x.com/sydneyrunkle), who is doing a lot of great Deep Agents and memory work
- [Viv Trivedy](https://x.com/Vtrivedy10), who is a leading voice on agent harnesses
- [Nuno Campos](https://x.com/nfcampos), who has some great writing on context engineering for finance agents
- [Sarah Wooders](https://x.com/sarahwooders), who is CTO of Letta, a company that has consistently been at the forefront of stateful agents