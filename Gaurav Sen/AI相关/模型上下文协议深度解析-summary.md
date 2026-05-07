---
title: "Model Context Protocol: A Deep Dive into the future of AI systems"
video_id: uBL0siiliGo
channel: Gaurav Sen
url: https://www.youtube.com/watch?v=uBL0siiliGo
original_language: en
transcript_source: /home/gaominggang/workspace/youtube-transcript/gaurav-sen/model-context-protocol-a-deep-dive-into-the-future-of-ai-systems/transcript.md
summary_language: zh
generated_at: 2026-04-30
github_resource: github.com/InterviewReady/mcp-server/
---

# Model Context Protocol: A Deep Dive into the future of AI systems
Model Context Protocol（MCP）深度解析：AI系统的未来

## 内容概要

本视频是Gaurav Sen对Model Context Protocol（MCP）这一协议的深度解析。视频指出，MCP是一个被AI热潮掩盖的"极度被低估"的概念——它正在解决大语言模型面临的一个核心问题：**让LLM能够执行真实行动（Perform Actions），而不仅仅是生成文本建议。**

视频从MCP的基本原理出发，通过生产故障排除的例子说明MCP解决的问题，并深入分析了MCP在SEO（搜索引擎优化）、RAG（检索增强生成）和应用程序聚合三大领域的具体应用。结尾部分，Gaurav还探讨了MCP与OAuth类授权体系的融合前景，以及AI个人代理的终极愿景。

---

## 核心观点

### 1. 当前AI系统的核心局限性

**"能说不能做"是LLM的根本瓶颈：**

大语言模型目前具备一定的智能——能告诉你应该做什么——但**无法真正替你执行这些操作**。它们只能以文本（或其他媒介）形式输出结果，而不能操作外部系统。

Gaurav举了一个极具说明性的例子：

> 想象你是DevOps工程师，生产环境出现故障。你希望LLM能自动完成以下流程：收集该服务器接收的所有请求 → 本地运行请求 → 找出问题所在 → 修改代码 → 部署新分支到main。

如果这个繁琐流程可以被LLM自动完成，工程师们就可以去果阿度假而不是值夜班。但目前的LLM做不到，因为它们**没有执行能力**。

### 2. MCP是什么：让AI从"顾问"变成"执行者"

MCP（Model Context Protocol）引入了一个**双层系统**：

- **MCP Client（客户端）**：大语言模型（如GPT-4、Gemini等）
- **MCP Server（服务器）**：暴露标准API的传统服务器

当用户向LLM提出请求时，MCP允许LLM向外部MCP服务器发送请求，让服务器执行实际操作。**这本质上是将LLM的智能决策能力与外部系统的执行能力连接起来。**

Gaurav强调，MCP并非新概念——之前已有IFTTT（If This Then That）等系统允许从外部系统触发事件并做出反应。但MCP的独特之处在于：**LLM比简单的"如果-那么"条件判断更聪明——它能根据当前情况动态决定应该采取什么行动。**

### 3. MCP的三大应用场景

**场景一：SEO（搜索引擎优化）**

传统SEO的核心是Google根据查询的相关性对页面进行排名——排名越高，流量越大。

但MCP正在改变这个游戏规则：

- 当LLM需要回答用户问题时，它会访问各种MCP服务器获取结构化的信息
- 如果一个网站通过MCP服务器暴露了清晰的API，LLM更可能把它纳入最终答案
- Gaurav举例：如果要获取Codeforces前100名程序员名单，与其让LLM爬网页（慢且结构化程度低），不如直接调用一个MCP服务器获取结构化数据

这意味着：
- **LLM替代了传统搜索引擎的角色**——用户不再需要自己搜索，LLM直接聚合信息回答问题
- 网站需要将自己的内容通过MCP服务器暴露给LLM，而非仅仅被人类用户看到
- 这个新领域被称为 **"ELMo"（Language Model Optimization）**——类比SEO，但目标受众是LLM

**关键洞察**：未来，你的网页可能不是被人类用户访问，而是被LLM访问。LLM不太关心页面的"视觉感受"和"易读性"，只关心信息是否存在且准确。

**场景二：RAG（检索增强生成）**

RAG在最近6个月已经证明了它不愧是炒作背后的真实价值：

- 过去LLM会回答"我的知识截止到XXXX，我无法回答这个问题"
- RAG允许LLM主动搜索最新数据源，将数据转换为向量，用这些信息来回答问题
- 此外还可以使用本地数据源（更新频率与模型不同，如每小时更新一次 vs 模型每6个月更新一次）

**MCP对RAG的增强在于**：外部数据源可以通过标准化MCP服务器以更优的格式回答LLM的查询，速度更快，信息更准确。

核心价值主张：**将数据更新频率与模型训练频率解耦**——模型训练非常昂贵，但获取数据非常便宜。

**场景三：应用聚合（Applications）**

这是一个非常有意思的商业模式创新场景：

以"租一辆车"这个用户需求为例：
- 传统方案：用户需要在多个网站之间手动搜索比较
- 聚合网站（如Kayak）：将搜索结果聚合到一处让用户比较

但Gaurav指出了MCP时代的进一步演进：**聚合结果本身变成一个MCP API**：

- 如果你想找最好的租车方案，你的应用中的MCP服务器可以去不同网站抓取结果
- 聚合成一个统一的API返回给LLM
- 对LLM而言：响应速度更快，内容更聚合
- 对网站而言：LLM调用它的API可能需要付费，或者竞价让自己出现在更优先的位置

这意味着一种**新的变现模式**：

- 网站可以向LLM收取"展示费"——让内容在LLM给出最终答案前被优先推送
- 类似于Google Ads，但发生在LLM的上下文构建阶段
- 这是一个尚未完全成型的商业模式，但Gaurav预测它即将到来

### 4. MCP的未来：OAuth式授权体系的融合

MCP目前的一个核心限制是：**它只能执行已有授权的操作**。

Gaurav举了一个具体例子：

> 如果你要LLM帮你发一封Gmail邮件，但LLM没有Gmail的访问权限——那它就无法发送邮件。但如果Gmail提供了一个MCP服务器呢？

这引出了**授权问题**：

- Gmail需要用户授权，LLM才能代发邮件
- 类似OAuth的"用Google登录"机制——用户授权后，网站可以获取你的信息

Gaurav展望了一个更宏大的愿景：

> 如果MCP协议和授权协议融合——你用Google账号登录并授权日历权限——那么LLM通过MCP服务器就能获得极大的能力：帮你预约日程、发送邮件、管理你的数字生活。**这就是LLM和个人Agent的终极形态。**

关键判断：**如果大型公司（Google、Microsoft等）采用并支持MCP，它就能真正改变世界。但如果它们忽视它或各自推出自己的版本（就像Android一样），生态就会碎片化。**

---

## 关键术语

| 英文 | 中文 |
|------|------|
| Model Context Protocol (MCP) | 模型上下文协议 |
| Tool Calling | 工具调用 |
| MCP Server / MCP Client | MCP服务器 / MCP客户端 |
| Perform Actions | 执行行动 |
| ELMo (Language Model Optimization) | 语言模型优化（类比SEO的新领域） |
| RAG (Retrieval Augmented Generation) | 检索增强生成 |
| OAuth | 开放授权协议 |
| SEO (Search Engine Optimization) | 搜索引擎优化 |
| Aggregator | 聚合器 |
| Personal Agent | 个人代理 |
| API Economy | API经济 |

---

## 关键语录

> "LLMs have some intelligence. They can tell you what you should do, but they can't do the thing for you. They can't perform actions. They can only give outputs in text or other mediums."
> （LLM有一定的智能。它们能告诉你应该做什么，但它们不能替你做。它们无法执行行动，只能以文本或其他媒介输出。）

> "If this tedious process could be taken up by a large language model, then you would require less engineers to do the same jobs. And you could send the engineers to Goa instead of having them on call."
> （如果这个繁琐的流程可以被LLM承担，那么完成同样的工作将需要更少的工程师。你们可以把工程师送到果阿度假，而不是让他们值班。）

> "LLMs are smarter than just if-this-then-that conditions. They can pick the decision required in the given situation."
> （LLM比简单的"如果-那么"条件判断更聪明。它们能根据当前情况选择所需的决策。）

> "Your page may not be accessed by a human. It might be accessed by a LLm, which doesn't really care so much about the look and feel, or how easy it is to read. As long as the information is there, it's good."
> （你的页面可能不是被人类访问的。它可能被LLM访问——LLM不太关心页面的外观和易读性。只要信息在那里，就足够了。）

> "What you have done is separated the frequency of data updates from the frequency of model updates. Model training is very expensive while fetching data is super cheap."
> （你所做的是将数据更新频率与模型更新频率解耦。模型训练非常昂贵，而获取数据非常便宜。）

> "The benefit for you is either the LM paying you for using your API, or the websites paying you to rank themselves higher in the result."
> （对你的好处是：要么LLM为使用你的API付费，要么网站付费让自己在结果中排名更靠前。）

> "If larger companies pick up MCP servers or some sort of capability servers that large language models can use, then you see the amount of human work reduced dramatically."
> （如果大型公司采用MCP服务器或某种LLM可用的能力服务器，你会发现人类工作量大幅减少。）

---

## 应用场景 / 案例

### MCP与SEO：从搜索引擎优化到语言模型优化

**传统SEO的优化重点**：
- 页面加载速度
- 移动端友好性
- 关键词密度
- 反向链接数量

**ELMo（LLM优化）的重点**：
- 你的内容是否能通过MCP服务器被结构化暴露
- 你的API响应格式是否便于LLM理解和聚合
- 你的内容是否足够准确（LLM不会引用错误信息）
- 你的网站是否提供了MCP服务器供LLM调用

### MCP的开发者机会

Gaurav在视频中宣布为InterviewReady创建了一个开源MCP服务器（GitHub: github.com/InterviewReady/mcp-server/），供学习目的使用。

对于开发者而言，构建MCP服务器的价值在于：

1. **提前占据ELMo生态位**：成为某个垂直领域（如旅游、汽车、金融）的数据提供方
2. **新的变现路径**：向调用你API的LLM或应用收费
3. **技术护城河**：早入场积累的MCP服务器和数据资产难以被复制

### MCP+RAG的最佳实践

将MCP与RAG结合使用是当前最具实用价值的架构之一：

- 企业内部知识库 → 向量数据库 → MCP服务器 → LLM调用
- 实现：**敏感数据不出本地，LLM仍能获得最新信息**
- 适合：内部知识助手、合规要求高的行业（金融、医疗）

---

*本摘要由AI生成，基于视频英文Transcript整理*
