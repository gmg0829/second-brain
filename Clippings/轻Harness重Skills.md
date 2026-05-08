---
title: "Thin Harness, Fat Skills细腰带，粗身技巧"
source: "https://x.com/garrytan/status/2042925773300908103"
author:
  - "[[@garrytan]]"
published: 2026-04-11
created: 2026-04-15
description: "Steve Yegge says people using AI coding agents are \"10x to 100x as productive as engineers using Cursor and chat today, and roughly 1000x as..."
tags:
  - "clippings"
---
Steve Yegge says people using AI coding agents are "10x to 100x as productive as engineers using Cursor and chat today, and roughly 1000x as productive as Googlers were back in 2005."Steve Yegge 表示，使用 AI 编码代理的人的生产力是“如今使用 Cursor 和聊天工具的工程师的 10 到 100 倍，大约是 2005 年谷歌员工的 1000 倍”。

That's a real number. I've seen it. I've lived it. But when people hear it, they reach for the wrong explanation. Better models. Smarter Claude. More parameters. The 2x people and the 100x people are using the same models. The difference isn't intelligence. It's architecture — and it fits on an index card.这是一个真实的数字。我亲眼见过，亲身经历过。但人们一听到这个数字，就往往会用错误的解释来搪塞。更好的模型？更聪明的克劳德？更多的参数？其实，效率提升2倍的人和效率提升100倍的人用的都是同样的模型。区别不在于智力，而在于架构——而且架构其实可以用一张索引卡片概括。

## The harness is the product安全带是产品

On March 31, 2026, Anthropic accidentally shipped the entire source code for Claude Code to the npm registry. 512,000 lines. I read it. It confirmed everything I'd been teaching at YC: the secret isn't the model. It's the thing wrapping the model.2026 年 3 月 31 日，Anthropic 意外地将 Claude Code 的全部源代码上传到了 npm 仓库。足足 512,000 行。我读了一遍。它印证了我在 YC 上讲的所有内容：秘诀不在于模型本身，而在于封装模型的东西。

Live repo context. Prompt caching. Purpose-built tools. Context bloat minimization. Structured session memory. Parallel sub-agents. None of that makes the model smarter. All of it gives the model the right context, at the right time, without drowning it in noise.实时仓库上下文、提示缓存、专用工具、上下文膨胀最小化、结构化会话内存、并行子代理——这些都不会让模型变得更智能，但它们都能在恰当的时间为模型提供恰当的上下文，而不会使其被噪声淹没。

That wrapper is called the harness. And the question every AI builder should be asking is: what goes in the harness, and what stays out? The answer has a specific shape. I call it **thin harness, fat skills**.这个封装层被称为“ 框架” 。每个人工智能开发者都应该问自己的问题是：框架里应该包含哪些内容，哪些内容应该保留？答案具有特定的形状。我称之为“ **精简框架，饱满技能”** 。

## Five definitions五个定义

The bottleneck is never the model's intelligence. Models already know how to reason, synthesize, and write code. They fail because they don't understand your data — your schema, your conventions, the particular shape of your problem. Five definitions fix this.瓶颈从来不在于模型的智能。模型本身就懂得如何推理、综合和编写代码。它们失败的原因在于它们不理解你的数据——你的模式、你的约定以及你问题的具体情况。五个定义可以解决这个问题。

**1\. Skill files1. 技能文件**

A skill file is a reusable markdown document that teaches the model how to do something. Not what to do — the user supplies that. The skill supplies the process.技能文件是一个可重用的 Markdown 文档，它教导模型如何做某事，而不是做什么——做什么由用户提供。技能文件提供的是具体流程。

Here's the key insight most people miss: **a skill file works like a method call.** It takes parameters. You invoke it with different arguments. The same procedure produces radically different capabilities depending on what you pass in.这里有一个大多数人都忽略的关键点： **技能文件的工作方式类似于方法调用。** 它接受参数。你可以用不同的参数来调用它。同一个过程会根据你传入的参数产生截然不同的功能。

Consider a skill called /investigate. It has seven steps: scope the dataset, build a timeline, diarize every document, synthesize, argue both sides, cite sources. It takes three parameters: TARGET, QUESTION, and DATASET. Point it at a safety scientist and 2.1 million discovery emails, and you get a medical research analyst determining whether a whistleblower was silenced. Point it at a shell company and FEC filings, and you get a forensic investigator tracing coordinated campaign donations.考虑一个名为“/investigate”的技能。它包含七个步骤：确定数据集范围、构建时间线、记录每份文档、综合分析、正反两方论证、引用来源。它需要三个参数：目标、问题和数据集。如果将其指向一位安全科学家和 210 万封调查邮件，你就能得到一位医学研究分析师，他正在判断举报人是否被噤声。如果将其指向一家空壳公司和联邦选举委员会（FEC）的备案文件，你就能得到一位法证调查员，他正在追踪协调一致的竞选捐款。

Same skill. Same seven steps. Same markdown file. The skill describes a process of judgment. The invocation supplies the world.同样的技能。同样的七个步骤。同样的 Markdown 文件。这项技能描述的是一个判断过程。而召唤则提供了整个世界。

This is not prompt engineering. This is software design, using markdown as the programming language and human judgment as the runtime. Markdown is, in fact, a more perfect encapsulation of capability than rigid source code, because it describes process, judgment, and context in the language the model already thinks in.这并非快速工程，而是软件设计，它使用 Markdown 作为编程语言，以人的判断作为运行时环境。事实上，Markdown 比僵化的源代码更能完美地封装能力，因为它用模型本身所熟悉的语言描述了过程、判断和上下文。

**2\. The harness2. 安全带**

The harness is the program that runs the LLM. It does four things: runs the model in a loop, reads and writes your files, manages context, and enforces safety. That's it. That's the "thin."这个程序叫做 harring，它运行 LLM 模型。它做四件事：循环运行模型、读写文件、管理上下文以及确保安全。就这些。这就是它的“精简版”。

The anti-pattern is a fat harness with thin skills. You've seen it: 40+ tool definitions eating half the context window. God-tools with 2-to-5-second MCP round-trips. REST API wrappers that turn every endpoint into a separate tool. Three times the tokens, three times the latency, three times the failure rate.这种反模式就像一个臃肿的工具，却只有一些薄弱的技能。你肯定见过：40 多个工具定义占据了半个上下文窗口；功能强大的工具，MCP 往返却要 2 到 5 秒；REST API 封装器把每个端点都变成了一个独立的工具。三倍的令牌，三倍的延迟，三倍的失败率。

What you want instead is purpose-built tooling that's fast and narrow. A Playwright CLI that does each browser operation in 100 milliseconds, not a Chrome MCP that takes 15 seconds for screenshot-find-click-wait-read. That's 75x faster. Software doesn't have to be precious anymore. Build exactly what you need, and nothing else.你真正需要的是快速且功能精准的专用工具。比如，Playwright CLI 能在 100 毫秒内完成所有浏览器操作，而不是 Chrome MCP 耗时 15 秒完成截图、查找、点击、等待、读取等一系列操作。速度提升了 75 倍。软件不再需要如此娇贵。只构建你真正需要的东西，无需其他。

**3\. Resolvers3. 解析器**

A resolver is a routing table for context. When task type X appears, load document Y first.解析器是上下文的路由表。当出现任务类型 X 时，首先加载文档 Y。

Skills tell the model how. Resolvers tell it what to load and when. A developer changes a prompt. Without the resolver, they ship it. With the resolver, the model reads docs/EVALS.md first — which says: run the eval suite, compare scores, if accuracy drops more than 2%, revert and investigate. The developer didn't know the eval suite existed. The resolver loaded the right context at the right moment.技能告诉模型如何操作。解析器告诉模型加载什么以及何时加载。开发者修改了一个提示信息。如果没有解析器，他们就直接发布。有了解析器，模型会先读取 docs/EVALS.md 文件——该文件指示：运行评估套件，比较分数，如果准确率下降超过 2%，则回滚并进行调查。开发者并不知道评估套件的存在。解析器在正确的时间加载了正确的上下文。

Claude Code has a built-in resolver. Every skill has a description field, and the model matches user intent to skill descriptions automatically. You never have to remember that /ship exists. The description is the resolver.Claude Code 内置了解析器。每个技能都有一个描述字段，模型会自动将用户意图与技能描述进行匹配。您无需记住 \`/ship\` 命令的存在。描述本身就是解析器。

A confession: my CLAUDE.md was 20,000 lines. Every quirk, every pattern, every lesson I'd ever encountered. Completely ridiculous. The model's attention degraded. Claude Code literally told me to cut it back. The fix was about 200 lines — just pointers to documents. The resolver loads the right one when it matters. Twenty thousand lines of knowledge, accessible on demand, without polluting the context window.坦白说：我的 CLAUDE.md 文件足足有两万行。里面包含了所有我遇到的怪癖、模式和经验教训。简直荒谬至极。模型的注意力都下降了。Claude Code 甚至直接建议我精简一下。最终的解决方案只需要两百行左右——全部都是指向文档的指针。解析器会在需要的时候加载正确的文档。两万行的知识，按需访问，而且不会污染上下文窗口。

**4\. Latent vs. deterministic4. 潜在与确定性**

Every step in your system is one or the other, and confusing them is the most common mistake in agent design.系统中的每一步要么是其中之一，要么是其中之一，将两者混淆是代理设计中最常见的错误。

**Latent space** is where intelligence lives. The model reads, interprets, decides. Judgment. Synthesis. Pattern recognition.**潜在空间**是智能的栖息之地。模型读取、解释、决策。判断。综合。模式识别。

**Deterministic** is where trust lives. Same input, same output. Every time. SQL queries. Compiled code. Arithmetic.信任建立在**确定性**之上。相同的输入，相同的输出。每一次都是如此。SQL 查询。编译后的代码。算术运算。

An LLM can seat 8 people at a dinner table, accounting for personalities and social dynamics. Ask it to seat 800 and it will hallucinate a seating chart that looks plausible but is completely wrong. That's a deterministic problem — combinatorial optimization — forced into latent space. The worst systems put the wrong work on the wrong side of this line. The best systems are ruthless about it.一个潜在逻辑模型（LLM）可以考虑到每个人的性格和社会动态，为 8 个人安排餐桌座位。但如果让它安排 800 人的座位，它就会臆造出一个看似合理实则完全错误的座位图。这是一个确定性问题——组合优化——被强行放到了潜在空间中。最糟糕的系统会把错误的任务放到这条线的另一边。而最好的系统则会毫不留情地纠正这个问题。

**5\. Diarization5. 分裂**

Diarization is the step that makes AI useful for real knowledge work. The model reads everything about a subject and writes a structured profile — a single page of judgment distilled from dozens or hundreds of documents.数据拆分是使人工智能能够应用于真正知识工作的关键步骤。模型会读取关于某个主题的所有信息，并生成一个结构化的概况——一份从数十甚至数百份文档中提炼出的判断报告。

No SQL query produces this. No RAG pipeline produces this. The model has to actually read, hold contradictions in mind, notice what changed and when, and synthesize structured intelligence. It's the difference between a database lookup and an analyst's brief.没有哪个 SQL 查询能生成这样的结果。也没有哪个 RAG 流水线能生成这样的结果。模型必须真正读取数据，记住其中的矛盾之处，注意到哪些内容发生了变化以及变化的时间，并综合出结构化的情报。这就是数据库查询和分析师简报之间的区别。

## The architecture建筑

These five concepts compose into a simple three-layer architecture.这五个概念构成了一个简单的三层架构。

**Fat skills** sit on top: markdown procedures that encode judgment, process, and domain knowledge. This is where 90% of the value lives.**核心技能**位于最顶层：这些 Markdown 流程编码了判断、过程和领域知识。90% 的价值都蕴藏于此。

**A thin CLI harness** sits in the middle: about 200 lines of code. JSON in, text out. Read-only by default.中间部分是**一个轻量级的命令行界面框架** ：大约 200 行代码。输入 JSON 数据，输出文本。默认情况下为只读模式。

**Your application** sits on the bottom: QueryDB, ReadDoc, Search, Timeline — the deterministic foundation.**您的应用程序**位于最底层：QueryDB、ReadDoc、Search、Timeline——确定性的基础。

The principle is directional. Push intelligence up into skills. Push execution down into deterministic tooling. Keep the harness thin. When you do this, every improvement to the model automatically improves every skill, while the deterministic layer stays perfectly reliable.原则是方向性的。将智能提升到技能层面，将执行下推到确定性工具层面，保持框架精简 。这样做，模型的每一次改进都会自动提升所有技能，同时确定性层也能保持绝对可靠。

## The system that learns学习系统

Let me show you all five definitions working together. Not in theory — in an actual system we're building at YC.让我向你们展示这五个定义如何协同运作。不是理论上的，而是在我们 YC 正在构建的实际系统中。

Chase Center. July 2026. Six thousand founders at Startup School. Each one has a structured application, questionnaire answers, transcripts from 1:1 advisor chats, and public signals: posts on X, GitHub commits, Claude Code transcripts showing how fast they ship.大通中心。2026 年 7 月。创业学校的六千名创始人。每位创始人都有一份结构化的申请表、问卷调查答案、一对一导师谈话记录以及公开信息：X 论坛帖子、GitHub 提交记录、Claude Code 记录，这些都展现了他们的产品交付速度。

The traditional approach: a program team of 15 reads applications, makes gut calls, updates a spreadsheet. It works at 200 founders. It breaks at 6,000. No human can hold that many profiles in working memory and notice that the three best candidates for the infrastructure-for-AI-agents cohort are a dev tools founder in Lagos, a compliance founder in Singapore, and a CLI-tooling founder in Brooklyn — all of whom described the same pain point in different words during their 1:1 chats.传统方法：一个由 15 人组成的项目团队阅读申请材料，凭直觉做出判断，然后更新电子表格。这种方法适用于 200 位创始人，但到了 6000 位创始人时就行不通了。没有人能在工作记忆中记住这么多创始人的资料，并且注意到人工智能代理基础设施团队中最优秀的三位候选人分别是：一位来自拉各斯的开发工具创始人、一位来自新加坡的合规性创始人，以及一位来自布鲁克林的命令行工具创始人——他们在各自的一对一交流中，用不同的方式描述了同一个痛点。

The model can. Here's how.该模型可以做到。方法如下。

**Enrichment.** A skill called /enrich-founder pulls all sources, runs enrichments, diarizes, and highlights the gap between what founders say and what they're actually building. The deterministic layer handles SQL lookups, GitHub stats, browser tests on demo URLs, social signal pulls, CrustData queries. A cron runs nightly. Six thousand profiles, always fresh.**信息丰富化。** 名为 /enrich-founder 的技能会提取所有来源的信息，进行信息丰富化，记录创始人的日记，并突出显示创始人言论与其实际产品之间的差距 。确定性层负责处理 SQL 查询、GitHub 统计数据、演示 URL 的浏览器测试、社交信号提取和 CrustData 查询。每日定时任务运行。六千个创始人画像，始终保持最新。

The diarization output catches things no keyword search would find:分割输出结果可以捕捉到关键词搜索无法找到的内容：

FOUNDER: Maria Santos COMPANY: Contrail ([contrail.dev](https://contrail.dev/)) SAYS: "Datadog for AI agents" ACTUALLY BUILDING: 80% of commits are in billing module. She's building a FinOps tool disguised as observability.创始人：玛丽亚·桑托斯 公司：Contrail（ [倒影.dev](https://contrail.dev/) ） SAYS：“Datadog for AI agents” 实际构建情况：80% 的提交都在计费模块中。 她正在开发一款伪装成可观测性的 FinOps 工具。

That gap — "says" versus "actually building" — requires reading the GitHub commit history, the application, and the advisor transcript, and holding all three in mind at once. No embedding similarity search finds this. No keyword filter finds it. The model has to read the full profile and make a judgment. (This is the perfect decision to put in latent space!) 这种差距——“说”与“实际做”之间的差距——需要阅读 GitHub 提交历史、申请材料和导师访谈记录，并同时考虑这三者。任何嵌入相似性搜索都无法发现这一点，任何关键词过滤也无济于事。模型必须读取完整的资料并做出判断。（这正是应该放在潜在空间中的原因！）

**Matching.** This is where skill-as-method-call shines. Three invocations of the same matching skill, three completely different strategies:**匹配。** 这正是技能即方法调用大放异彩之处。三次调用相同的匹配技能，却采用了三种截然不同的策略：

/match-breakout takes 1,200 founders, clusters by sector affinity, 30 per room. Embedding plus deterministic assignment. /match-lunch takes 600, does serendipity matching across sectors, 8 per table, no repeats — the LLM invents the themes, then a deterministic algorithm assigns seats. /match-live handles whoever is in the building right now, nearest-neighbor embedding, 200ms, 1:1 pairs, excluding people who've already met./match-breakout 活动面向 1200 位创始人，按行业关联度分组，每间房间 30 人。采用嵌入算法和确定性分配。/match-lunch 活动面向 600 位创始人，跨行业进行随机匹配，每桌 8 人，不重复——LLM 会构思主题，然后由确定性算法分配座位。/match-live 活动面向当前在场的所有人员，采用最近邻嵌入算法，200 毫秒内完成一对一匹配，排除已见过面的人员。

And the model makes judgment calls a clustering algorithm never could: "Santos and Oram are both AI infra, but they're not competitors — Santos is cost attribution, Oram is orchestration. Put them in the same group." Or: "Kim applied as 'developer tools' but his 1:1 transcript reveals he's building compliance automation for SOC2. Move him to FinTech/RegTech."该模型能够做出聚类算法永远无法做出的判断：“Santos 和 Oram 都是人工智能基础设施，但它们并非竞争对手——Santos 侧重于成本归因，Oram 侧重于流程编排。将它们归为同一类。”或者：“Kim 申请的是‘开发者工具’职位，但他的一对一交流记录显示他正在为 SOC2 构建合规自动化系统。把他调到金融科技/监管科技领域。”

No embedding captures the Kim reclassification. The model has to read the entire profile.没有嵌入能够捕捉到 Kim 的重新分类。模型必须读取整个个人资料。

**The learning loop.** After the event, an /improve skill reads NPS surveys, diarizes the mediocre responses — not the bad ones, the "OK" ones, where the system almost worked but didn't — and extracts patterns. Then it proposes new rules and writes them back into the matching skills:**学习循环。** 事件发生后，/improve 技能会读取 NPS 调查，记录那些表现平平的回复——不是糟糕的回复，而是“还可以”的回复，也就是系统几乎有效但最终失败的那些回复——并提取其中的模式。然后，它会提出新的规则，并将它们写回相应的技能中：

When attendee says "AI infrastructure" but startup is 80%+ billing code: → Classify as FinTech, not AI Infra. When two attendees in same group already know each other: → Penalize proximity. Prioritize novel introductions.当与会者提到“人工智能基础设施”时 但启动资金占比超过 80% 的计费代码： → 应归类为金融科技，而非人工智能基础设施。 同一组的两个参与者 彼此已经认识： → 对邻近行为施加惩罚。 优先引入新颖的元素。

These rules get written back into the skill file. The next run uses them automatically. The skill rewrites itself.这些规则会被写回技能文件中。下次运行时会自动应用这些规则。技能会进行自我重写。

July event: 12% "OK" ratings. Next event: 4%. The skill file learned what "OK" actually meant, and the system got better without anyone rewriting code.7 月份活动：12% 的评分为“合格”。下次活动：4%。技能文件理解了“合格”的真正含义，系统在无需任何人重写代码的情况下得到了改进。

The same pattern transfers everywhere: retrieve, read, diarize, count, synthesize. Then: survey, investigate, diarize, rewrite the skill. 同样的模式适用于所有情况： 检索、阅读、记录、统计、综合 。然后： 调查、研究、记录、重写技能 。

If you want to know what the most valuable loops are in 2026, it's those. We can apply them to every discipline and walk of life of knowledge work in existence. 如果你想知道2026年最有价值的循环是什么，那就是这些。我们可以将它们应用于现存的所有学科和知识工作领域。

## Skills are permanent upgrades技能是永久性的提升

I tweeted an instruction I gave to my OpenClaw recently that resonated more than I expected:我最近在推特上发布了一条我给 OpenClaw 设置的指令，没想到反响如此热烈：

> You are not allowed to do one-off work. If I ask you to do something and it's the kind of thing that will need to happen again, you must: do it manually the first time on 3 to 10 items. Show me the output. If I approve, codify it into a skill file. If it should run automatically, put it on a cron.The test: if I have to ask you for something twice, you failed.你不能只做一次性工作。如果我让你做某件事，而且这件事需要反复进行，你必须：第一次手动操作 3 到 10 项，并把结果给我看。如果我批准，就把它写成一个技能文件。如果需要自动运行，就把它添加到 cron 任务中。测试标准：如果我需要你做某件事两次，你就失败了。

A thousand likes and twenty-five hundred bookmarks. People thought it was a prompt engineering trick. It's not. It's the architecture I've been describing. Every skill you write is a permanent upgrade to your system. It never degrades. It never forgets. It runs at 3 AM while you sleep. And when the next model drops, every skill instantly gets better — the judgment in the latent steps improves while the deterministic steps stay perfectly reliable.一千个赞，两千五百个收藏。人们以为这是个速成工程技巧。其实不是。这就是我一直在描述的架构。你编写的每一个技能都是对系统的永久升级。它永不退化，永不遗忘。即使在凌晨三点你睡觉的时候，它也在运行。而且，当下一个模型发布时，每个技能都会立即得到提升——潜在步骤中的判断力增强，而确定性步骤则保持绝对可靠。

That's how you get Yegge's 100x. Not a smarter model. Fat skills, thin harness, and the discipline to codify everything.这就是你如何获得 Yegge 的 100 倍成就的秘诀。不是什么更聪明的模型。而是扎实的技能、轻便的装备，以及将一切系统化所需的自律。

The system compounds. Build it once. It runs forever.系统具有复合特性。只需构建一次，即可永久运行。