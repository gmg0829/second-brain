---
title: "Resolvers: The Routing Table for Intelligence解析器：智能路由表"
source: "https://x.com/garrytan/status/2044479509874020852"
author:
  - "[[@garrytan]]"
published: 2026-04-16
created: 2026-04-16
description: "In \"Thin Harness, Fat Skills\", I introduced five definitions for building agent systems that actually work. Skills got all the attention. Pe..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HF9v5r1bEAEhngG?format=jpg&name=large)

In "[Thin Harness, Fat Skills](https://x.com/garrytan/status/2042925773300908103)", I introduced five definitions for building agent systems that actually work. Skills got all the attention. People bookmarked the skill-as-method-call pattern, the diarization concept, the thin harness architecture. Good. Those matter.在 ” [细腰带，粗身技巧](https://x.com/garrytan/status/2042925773300908103)我提出了五个构建真正有效的代理系统的定义。技能引起了所有人的关注。人们收藏了技能即方法调用模式、角色分割概念和轻量级架构。很好。这些都很重要。

But the one that got almost no attention is the one that matters most. Resolvers. And the reason they got ignored is the same reason they're so important: they're invisible when they work, and catastrophic when they don't.但最容易被忽视的，恰恰是那些最关键的因素：问题解决者。它们之所以被忽视，恰恰是因为它们如此重要：它们发挥作用时悄无声息，而一旦失灵，后果不堪设想。

A resolver is a routing table for context. When task type X appears, load document Y first. That's it. One sentence. But that one sentence is the difference between an agent that compounds intelligence and an agent that slowly forgets what it knows.解析器是上下文的路由表。当任务类型 X 出现时，首先加载文档 Y。就这么简单。一句话。但这一句话却决定了智能体是不断积累智能，还是逐渐遗忘已知知识。

This is the story of how I learned that the hard way.这是我如何付出惨痛代价才明白这个道理的故事。

## The 20,000-line confession两万行的自白

My CLAUDE.md was 20,000 lines.我的 CLAUDE.md 文件有 20,000 行。

I'm not proud of this. Every quirk, every pattern, every lesson I'd ever encountered with Claude Code, every convention for my codebase, every edge case I'd been burned by. I kept adding. The file kept growing. It felt productive. It felt like I was making the model smarter.我并不为此感到骄傲。我把使用 Claude Code 时遇到的每一个怪癖、每一个模式、每一个教训，我代码库的每一个约定，以及我曾被坑过的每一个极端情况，都一一记录下来。文件不断增长。我感觉自己很有成就感，感觉自己让模型变得更智能了。

I wasn't. I was drowning it.我不是。我是在溺水。

The model's attention degraded. Responses got slower and less precise. Claude Code literally told me to cut it back. That's when you know you've gone too far — the AI is telling **you** to stop talking.模型的注意力下降了。反应变得缓慢且不准确。克劳德·科德甚至直接告诉我别说了。这时你就知道自己做得太过火了——人工智能都在告诉**你**别再说了。

The instinct is natural. You want the model to know everything. So you cram everything into the system prompt, the instructions file, the context window. You're trying to make the model omniscient by proximity. It doesn't work. You can't make someone smarter by shouting louder. You make them smarter by giving them the right book at the right moment.这种本能是人之常情。你希望模型无所不知，于是把所有信息都塞进系统提示符、指令文件和上下文窗口。你试图通过“接近”来让模型无所不知。但这行不通。你不可能通过提高音量让别人变聪明，而应该在合适的时机给他们合适的书。

The fix was about 200 lines. A numbered decision tree. Pointers to documents. When the model needs to file something, it walks the tree: 修复方案大约用了 200 行代码。一个编号的决策树。指向文档的指针。当模型需要归档文件时，它会遍历这棵树：

- Is it a person? → /people/ directory这是一个人吗？→ /people/ 目录
- A company? → /companies/ directory一家公司？→ /companies/ 目录
- A policy analysis? → /civic/ directory政策分析？→ /civic/ 目录

Twenty thousand lines of knowledge, accessible on demand, without polluting the context window.两万行知识，可随时获取，且不会污染上下文窗口。

That 200-line file is the resolver. It replaced 20,000 lines of instructions. And the system immediately got better — faster responses, more accurate filing, fewer hallucinations. Not because the model got smarter. Because I stopped blinding it with noise.那份 200 行的文件就是解析器。它取代了 2 万行指令。系统立刻变得更好了——响应速度更快，归档更准确，错误更少。这并非因为模型变得更智能，而是因为我不再用噪声干扰它。

The misfiling that revealed everything错归档暴露了一切

I asked my agent to ingest Will Manidis's essay "No New Deal for OpenAI" — a devastating policy analysis of OpenAI's industrial policy brief. It's the kind of piece that breaks down a company's regulatory strategy, maps the political implications, names the institutional actors. Sharp civic analysis.我让我的经纪人仔细研读威尔·马尼迪斯的文章《OpenAI 无需新政》——一篇对 OpenAI 产业政策简报进行深刻剖析的政策分析。这篇文章深入剖析了一家公司的监管策略，阐述了其政治影响，并指出了相关机构的作用。这是一篇极具洞察力的公民分析文章。

The agent filed it in \`sources/\`.代理人将其归档到 \`sources/\` 目录下。

Wrong. \`sources/\` is for raw data dumps and bulk imports. CSV files. API exports. Scraped datasets. This was political analysis — it belongs in \`civic/\`, where policy pieces, political actors, and institutional dynamics live.错了。\`sources/\` 目录用于存放原始数据转储和批量导入的文件，例如 CSV 文件、API 导出文件和抓取的数据集。而这是政治分析——它应该放在 \`civic/\` 目录下，那里存放着政策文件、政治人物和制度动态等内容。

Why did it happen? The idea-ingest skill had hardcoded \`brain/sources/\` as the default directory. It didn't consult the resolver. It had its own half-assed filing logic baked into the skill itself. When no explicit path was given, it fell back to \`sources/\` the way a lazy intern throws everything in the "misc" folder.为什么会发生这种情况？创意吸收技能将默认目录硬编码为 \`brain/sources/\`，而没有参考解析器。它自身内置了一套粗糙的归档逻辑。当没有明确指定路径时，它就回退到 \`sources/\`，就像一个懒惰的实习生把所有东西都扔进“杂项”文件夹一样。

One misfiled article. I could have fixed it and moved on. Instead I pulled the thread.一篇归档错误的文章。我本来可以改正然后继续做其他事。但我却把那篇文章删掉了。

## The audit审计

When I caught the Manidis misfiling, I audited every skill that writes to the brain. I have 13 of them. Skills for ingesting articles, PDFs, meeting transcripts, videos, investor updates, voice notes, tweets. Each one writes pages to the brain repo.当我发现 Manidis 归档错误后，我审核了所有会向大脑写入数据的技能。我总共有 13 个这样的技能，包括用于接收文章、PDF、会议记录、视频、投资者更新、语音笔记和推文的技能。每个技能都会向大脑存储库写入页面。

Only 3 out of 13 referenced the resolver.13 人中只有 3 人引用了解析器。

The other 10 had hardcoded paths. Idea-ingest defaulted to \`sources/\`. PDF-ingest defaulted to \`originals/\`. Meeting-ingest wrote to \`meetings/\`. Each skill had internalized its own filing assumptions. Each one was a potential misfiling waiting to happen.其余 10 个任务都使用了硬编码路径。“创意导入”默认写入 \`sources/\` 目录，“PDF 导入”默认写入 \`originals/\` 目录，“会议导入”写入 \`meetings/\` 目录。每个任务都内置了自身的归档假设。每一个假设都存在潜在的归档错误风险。

This is the pattern that kills agent systems. Not a dramatic failure. Not a hallucination that produces nonsense. A slow, silent drift where information goes to the wrong place, connections don't form, and the knowledge base gradually becomes a junk drawer with 14,700 files in it instead of a structured intelligence layer.这就是扼杀智能体的模式。并非突如其来的灾难，也非胡言乱语的幻觉，而是一种缓慢而悄无声息的演变：信息流向错误的地方，连接无法建立，知识库逐渐沦为堆满14700个文件的杂物抽屉，而非结构化的智能层。

The fix wasn't fixing 10 skills individually. That's whack-a-mole. You fix one, another drifts. The fix was a shared filing rules document — \`\_brain-filing-rules.md\` — and a mandate that every brain-writing skill reads \`RESOLVER.md\` before creating any page. One rule. Ten skills fixed.解决之道并非逐一修复十项技能。那样就像打地鼠，修好一项，另一项又会冒出来。真正的解决方案是制定一份共享的文件归档规则文档——\`\_brain-filing-rules.md\`——并强制要求所有脑力写作技能在创建任何页面之前都必须阅读\`RESOLVER.md\`。一条规则，十项技能的问题就迎刃而解了。

The filing rules doc also catalogs common misfiling patterns. Sources vs. originals. People vs. companies (when someone IS a company). Civic vs. sources (the Manidis case). Every mistake, documented, so the same mistake can't happen a different way.归档规则文件还列举了常见的归档错误模式，例如：来源与原件；个人与公司（当某人本身就是公司时）；公民身份与来源（例如马尼迪斯案）。所有错误均被记录在案，以防止类似错误再次发生。

Zero misfilings since. Every new skill that writes to the brain now has a two-line mandate at the top: \*Before creating any new brain page, read \`brain/RESOLVER.md\` and \`skills/\_brain-filing-rules.md\`. File by primary subject, not by source format or skill name.\*此后未发生任何归档错误。现在，每个写入 Brain 的新技能页面顶部都有两行强制性说明：\*在创建任何新的 Brain 页面之前，请阅读 \`brain/RESOLVER.md\` 和 \`skills/\_brain-filing-rules.md\`。请按主要主题归档，而不是按来源格式或技能名称归档。\*

## The invisible skill problem隐形技能问题

The above example talks about where to put files in your memory repo, but it applies to **skill files (fat skills)** and **code to call (fat code)** as well. 上面的例子讨论了将文件放在内存库中的哪个位置，但它也适用于**技能文件（胖技能）** 和**要调用的代码（胖代码）** 。

A resolver routes tasks to skills. But what happens when a skill exists and the resolver doesn't know about it?解析器会将任务路由到相应的技能。但是，如果某个技能已经存在，而解析器却不知道它的存在，会发生什么情况呢？

For my OpenClaw, we built a signature-tracking system inside the executive assistant skill. It worked perfectly. Tracked DocuSign deadlines, surfaced unsigned documents, drafted reminders. Beautiful piece of engineering. Completely invisible.在我的 OpenClaw 项目中，我们在行政助理技能中构建了一个签名跟踪系统。它运行完美，能够跟踪 DocuSign 的截止日期，显示未签名的文档，并自动生成提醒。这是一项精妙的工程设计，而且完全隐形。

When someone asked "check my signatures" or "what do I need to sign," the system shrugged. The resolver didn't have a trigger for signatures. The skill existed. The capability existed. The system couldn't reach it. It's like having a surgeon on staff but not listing them in the hospital directory.当有人问“检查我的签名”或“我需要签什么”时，系统却无动于衷。解析器没有触发签名验证的机制。这项技能和能力都存在，但系统却无法调用。这就像医院里有外科医生，却没有把他列入医院名录一样。

This is worse than not having the skill at all. A missing skill is honest — the system says "I can't do that" and you know to build it. A skill that exists but isn't reachable creates the illusion of capability. You think the system handles signatures. It doesn't. And you don't find out until the moment it matters.这比完全没有这项技能更糟糕。 缺少一项技能是诚实的——系统会说“我做不到”，然后你知道该如何学习。而一项技能存在却无法掌握，会造成一种能力的错觉。你以为系统会处理签名，其实不然。直到关键时刻，你才会发现这一点。

After a month of building, we had 40+ skills. Some created in response to specific incidents, others spawned by sub-agents running crons. Nobody was maintaining the resolver table. Skills were being born but not registered. The system had capabilities it didn't know it had.经过一个月的开发，我们拥有了 40 多个技能。有些是针对特定事件创建的，有些是由运行定时任务的子代理生成的。没有人维护解析器表。技能不断生成，却没有被注册。系统拥有它自己都不知道的功能。

So I built resolver trigger evals. A test suite of 50 sample inputs with expected outputs:所以我构建了解析器触发器评估。一个包含 50 个示例输入及其预期输出的测试套件：

> Input: "check my signatures" Expected: executive-assistant (signature section) Input: "who is Pedro Franceschi" Expected: brain-ops → gbrain search Input: "save this article to brain" Expected: idea-ingest + RESOLVER.md输入：“检查我的签名” 预期：行政助理（签字部分） 输入：“佩德罗·弗朗切斯基是谁？” 预期结果：brain-ops → gbrain 搜索 输入：“将这篇文章保存到大脑中” 预期：想法摄入 + RESOLVER.md

Two failure modes. False negative: skill should fire but doesn't, because the trigger description is wrong or missing. False positive: wrong skill fires, because two triggers overlap. Both fixable by editing markdown. No code changes. The resolver is a document, and documents are cheap to fix.两种故障模式。漏报：技能应该触发但未触发，因为触发器描述错误或缺失。误报：错误的技能触发，因为两个触发器重叠。这两种情况都可以通过编辑 Markdown 文件来修复，无需更改代码。解析器是一个文档，而文档的修复成本很低。

I told my Claw: "Make sure the resolver is tested and also there are proper eval LLM tests for all the prompts and skills that use the resolver." This isn't optional. If you can't prove the right skill fires for the right input, you don't have a system. You have a collection of skills and a prayer.我告诉我的爪子：“确保解析器经过测试，并且所有使用该解析器的提示和技能都有合适的评估 LLM 测试。” 这并非可选项。如果你无法证明正确的输入会触发正确的技能，那你拥有的就不是一个系统，而只是一堆技能和祈祷。

## The meta-skill元技能

The trigger evals catch routing failures. But there's a deeper problem: skills that exist but have no path from the resolver at all. Not a wrong path — no path.触发器评估会捕获路由失败。但还有一个更深层次的问题：有些技能存在，但从解析器根本找不到路径。不是路径错误——而是根本没有路径。

I was debugging a skill that should have fired and didn't. The usual drill: check the trigger description, check the resolver table, trace the chain. And I realized there was no systematic way to verify that a skill was reachable. You could check one skill at a time. You couldn't check all of them.我当时正在调试一个应该触发却没触发的技能。通常的做法是：检查触发器描述，检查解析器表，追踪调用链。但我发现并没有系统性的方法来验证一个技能是否可调用。你一次只能检查一个技能，无法检查所有技能。

So I invented \`check-resolvable\`. A meta-skill that walks the entire chain — AGENTS.md → skill file → code — and finds dead links.所以我发明了“check-resolvable”。这是一个元技能，它会遍历整个链条——AGENTS.md → 技能文件 → 代码——并找出失效的链接。

I told my agent: "Check if there is a direct line between the agents.md resolver all the way to this running. And then remember this as a 'check-resolvable' skill. The skill should actually check if this skill or codepath is either directly called out in the resolver or callable via something in the resolver. And if it isn't, figure out what resolvable skill should call it."我告诉我的代理：“检查一下 agents.md 解析器到当前运行状态之间是否存在直接的调用路径。然后记住这是一个‘可解析性检查’技能。该技能应该检查这个技能或代码路径是否在解析器中被直接调用，或者是否可以通过解析器中的某些东西调用。如果不是，那就找出哪个可解析的技能应该调用它。”

First run found 6 unreachable skills. Six capabilities the system had built but couldn't access. A flight tracker that nobody could invoke by asking about flights. A content-ideas generator that only ran on cron but couldn't be triggered manually. A citation fixer that existed in the skills directory but wasn't listed in the resolver at all.首次运行发现 6 项无法访问的技能。这 6 项功能是系统已构建但无法访问的。例如，一个航班追踪器，任何人都无法通过查询航班信息来调用它；一个内容创意生成器，它只能通过定时任务运行，但无法手动触发；以及一个引用修复器，它存在于技能目录中，但根本没有被列入解析器中。

Six. Out of 40+. Fifteen percent of the system's capabilities were dark.6. 在 40 多项功能中。系统 15% 的功能处于未启用状态。

Fixed in an hour. Just added triggers to AGENTS.md. Now check-resolvable runs weekly. It's the resolver equivalent of a linter — it tells you what's broken before a user discovers it the hard way.一小时就搞定了。只是在 AGENTS.md 里添加了触发器。现在 check-resolvable 每周运行一次。它相当于解析器的代码检查器——在用户费劲发现问题之前就告诉你哪里出错了。

## Context rot上下文腐烂

Here's the thing nobody tells you about resolvers: they decay.关于解析器，没人会告诉你一件事：它们会衰减。

Day 1, the routing table is perfect. Every skill is registered. Every trigger is accurate. Every path resolves. You feel like a genius.第一天，路由表完美无缺。所有技能都已注册，所有触发器都准确无误，所有路径都能解析。你感觉自己像个天才。

Day 30, three new skills exist that nobody added to the resolver. They were built in response to real needs, by sub-agents running at 3 AM, and nobody updated the table.第 30 天，出现了三个新技能，但没有人将其添加到解析器中。这些技能是响应实际需求而构建的，由凌晨 3 点运行的子代理创建，但没有人更新过解析器表。

Day 60, two trigger descriptions don't match how users actually phrase things. The skill handles "track this flight" but users say "is my flight delayed?" The description says one thing. The user says another. The skill doesn't fire.第 60 天，有两个触发描述与用户实际的表达方式不符。该技能处理的是“追踪航班”，但用户会问“我的航班延误了吗？”。描述是一回事，用户说的又是另一回事。因此，该技能无法触发。

Day 90, the resolver is a historical document. An artifact of what the system \*used to\* be able to do. Not what it can do now.第 90 天，解析器已成为历史文档，它反映的是系统\*过去\*的功能，而不是它现在的功能。

I noticed the system was drifting. Skills were being invoked by direct instruction — "read skills/flight-tracker/SKILL.md" — instead of through the resolver, because the resolver didn't have the right triggers. The system worked because I knew which skill to call. That's not a system. That's a person with a filing cabinet.我注意到系统出现了偏差。技能不是通过解析器调用，而是通过直接指令——“读取 skills/flight-tracker/SKILL.md”——来调用，因为解析器缺少正确的触发器。系统之所以还能运行，是因为我知道该调用哪个技能。但这算不上系统，这只是一个人拿着文件柜在操作而已。

Yesterday, in office hours with a YC company, a CTO asked me: "Could an RLM be used to solve context rot particularly around resolvers?"昨天，在与一家 YC 公司的办公时间里，一位 CTO 问我：“RLM 能否用于解决上下文腐烂问题，特别是围绕解析器的问题？”

The idea: a reinforcement learning loop where the system observes every task dispatch. Which skill fired. Which didn't. Which tasks had no match. Which tasks matched the wrong skill. And periodically — maybe nightly, maybe weekly — it rewrites the resolver based on observed evidence. Not a human maintaining a table. The table maintaining itself.其思路是：构建一个强化学习循环，系统观察每一次任务调度。哪些技能被触发，哪些没有，哪些任务没有匹配项，哪些任务匹配了错误的技能。然后，系统会定期（可能是每晚，也可能是每周）根据观察到的证据重写解析器。无需人工维护数据表，数据表可以自我维护。

Eight hundred task dispatches over a month. The system sees that "is my flight on time" never triggers flight-tracker but "check my flight" does. It rewrites the trigger description. The system sees that pdf-ingest fires for investor update emails, but investor-update-ingest should have caught them first. It adjusts priority.一个月内共发出八百个任务。系统发现“我的航班准点吗？”这个任务从未触发航班追踪器，而“检查我的航班”却会触发。因此，系统重写了触发描述。系统还发现，pdf-ingest 会为投资者更新邮件触发，但投资者更新-ingest 应该先捕获到这些邮件。因此，系统调整了优先级。

This is forward-looking. We haven't fully built it. Claude Code's AutoDream system — memory consolidation during idle time — is a primitive version. It reviews accumulated context and compresses it. Apply that principle to the resolver specifically, and you get a routing table that improves with use.这是前瞻性的。我们尚未完全实现。Claude Code 的 AutoDream 系统——在空闲时间进行内存整合——是一个早期版本。它会审查累积的上下文并将其压缩。将这一原理具体应用于解析器，就能得到一个随着使用而不断改进的路由表。

A resolver that learns from its own traffic. That's the endgame for agent governance.一个能够从自身流量中学习的解析器。这才是代理治理的最终目标。

## Resolvers are fractal解析器是分形的

One more principle, and it's the one that makes everything click.还有一个原则，正是这个原则让一切都变得清晰明了。

Resolvers compose. They exist at every layer of the system, not just the top.解析器是组合的。它们存在于系统的每一层，而不仅仅是顶层。

The **skill resolver** lives in AGENTS.md. It maps task types to skill files. "Who is this person?" → brain-ops. "Ingest this PDF" → pdf-ingest. "Check my calendar" → google-calendar. This is the one everyone thinks of.技能**解析器**位于 AGENTS.md 文件中。它将任务类型映射到技能文件。“这个人是谁？”→ brain-ops。“读取此 PDF”→ pdf-ingest。“查看我的日历”→ google-calendar。这是每个人都会想到的例子。

The **filing resolver** lives in RESOLVER.md. It maps content types to directories. Person → \`people/\`. Company → \`companies/\`. Policy analysis → \`civic/\`. This is the one that caught the Manidis misfiling.文件**解析器**位于 RESOLVER.md 文件中。它将内容类型映射到目录。例如：人员 → \`people/\`；公司 → \`companies/\`；政策分析 → \`civic/\`。正是这个解析器发现了 Manidis 的文件归档错误。

The **context resolver** lives inside each skill. When the executive assistant skill fires, it has its own internal routing: email triage goes one way, scheduling goes another, signature tracking goes a third. Sub-routing within the skill.上下文**解析器**存在于每个技能内部。当行政助理技能触​​发时，它有自己的内部路由：邮件分类走一条路，日程安排走另一条路，签名跟踪走第三条路。这是技能内部的子路由。

Claude Code already has this pattern. Every skill has a description field. The model matches user intent to skill descriptions automatically. You never have to remember that \`/ship\` exists. The description \*is\* the resolver. It's resolvers all the way down.Claude Code 已经实现了这种模式。每个技能都有一个描述字段。模型会自动将用户意图与技能描述匹配。你无需记住 \`/ship\` 的存在。描述本身就是解析器。它层层解析，直至最终解析器。

The same architecture, at every layer. That's what makes it scale from 5 skills to 50, from 1,000 files to 25,000, from a toy demo to a production system that processes 200 inputs a day.每一层都采用相同的架构。这使得它可以从 5 个技能扩展到 50 个技能，从 1,000 个文件扩展到 25,000 个文件，从玩具演示扩展到每天处理 200 个输入的生产系统。

## The shape of the thing物体的形状

Let me pull this together.让我来整理一下。

A resolver is 200 lines of markdown that replaced 20,000 lines of crammed context. When it's missing, skills invent their own filing logic and everything slowly degrades. When it's present but untested, capabilities go dark — you have a surgeon the hospital can't find. When it's tested but static, it rots within 90 days. When it's tested and self-healing, the system compounds.解析器是 200 行 Markdown 代码，它取代了 20,000 行杂乱无章的上下文。当解析器缺失时，技能会自行摸索归档逻辑，导致系统逐渐退化。当解析器存在但未经测试时，功能就会失效——就像医院找不到外科医生一样。当解析器经过测试但内容一成不变时，它会在 90 天内失效。当解析器经过测试并具备自我修复功能时，系统问题会不断累积。

The pattern:模式：

- Load the right context at the right moment. Don't cram.在合适的时机加载合适的上下文。不要临时抱佛脚。
- Mandate that every skill consults the resolver. Don't trust individual filing logic.强制要求所有技能都必须咨询解析器。不要依赖个人的归档逻辑。
- Test the routing, not just the output. Trigger evals.测试路由，而不仅仅是输出。触发评估。
- Audit reachability. Check-resolvable. Weekly.审核可达性。可检查事项。每周一次。
- Make the resolver learn from its own traffic. The endgame.让解析器从自身的流量中学习。这是最终目标。

The resolver is the governance layer of an agent system. The traffic cop, the filing clerk, the org chart, and the institutional memory, all in one document that a model can read in 200 milliseconds.解析器是代理系统的治理层。它集交通警察、档案管理员、组织结构图和机构记忆于一体，所有内容都集成在一个文档中，模型可以在 200 毫秒内读取完毕。

Almost nobody is building them explicitly. Everyone is cramming 20,000 lines into the system prompt and wondering why the model seems dumber than it should be. The model isn't dumb. It's drowning. Give it a routing table and watch what happens.几乎没人会特意去构建它们。每个人都往系统提示符里塞两万行代码，然后纳闷为什么模型看起来比实际应该的更笨。模型不是笨，而是不堪重负。给它加个路由表，看看会发生什么。

## The thing I didn’t realize I was building我当时并没有意识到自己正在建造的东西

Up to this point, I’ve been describing resolvers as a technical pattern. A way to make agents work better. Route tasks. Load the right context. Avoid drowning the model.到目前为止，我一直把解析器描述为一种技术模式，一种让代理更好地工作、路由任务、加载正确的上下文、避免模型过载的方法。

That framing is true. It’s also too small.这种构图没错，但尺寸也太小了。

What I actually built is closer to management.我实际构建的体系更接近管理。

Think about what’s happening in a real system with 40+ skills and 25,000 files. You don’t just have code. You have an organization.想想在一个拥有 40 多种技能和 25000 个文件的真实系统中会发生什么。你面对的不仅仅是代码，而是一个组织。

Skills are employees. Each one has a capability. Some are specialists. Some are generalists. Some only run on cron. Some are user-facing.技能就是员工。每个人都具备某种能力。有些是专家，有些是通才，有些只依赖定时任务运行，有些则直接面向用户。

The resolver is the org chart. It defines who handles what, how tasks get routed, and what happens when something doesn’t match. It’s also escalation logic — when one path fails, where does it go next?解析器就是组织结构图。它定义了谁负责什么，任务如何路由，以及当出现不匹配的情况时会发生什么。它还包含升级逻辑——当一条路径失败时，下一步该怎么做？

The filing rules are internal process. Where information lives. How decisions get recorded. What counts as a “person” vs a “company” vs a “policy analysis.” Without that, you don’t have a knowledge base. You have a junk drawer.文件归档规则是内部流程，它决定了信息的存储位置、决策的记录方式，以及区分“个人”、“公司”和“政策分析”的范畴。没有这些规则，就没有知识库，只有一堆杂物。

check-resolvable is audit and compliance. It doesn’t care if the code is beautiful. It asks a simpler question: can the system actually do what it claims? Are there capabilities that exist but can’t be reached?check-resolvable 是审计和合规性检查。它并不关心代码是否优美，而是提出一个更简单的问题：系统真的能做到它声称的功能吗？是否存在一些功能存在但却无法实现？

Trigger evals are performance reviews. Given a real input, does the right part of the organization respond? If not, you don’t retrain the model. You fix the description. You update the routing. You make the org legible.触发评估就是绩效考核。给定一个真实的输入，组织中正确的部门是否做出了响应？如果不是，你不需要重新训练模型，而是应该修正描述，更新路由，使组织结构清晰易懂。

Once you see it this way, a lot of the confusion around agents disappears.一旦你这样理解了，很多关于经纪人的困惑就会消失。

The problem isn’t that models aren’t smart enough. The problem is that we’ve been building organizations with no management layer. Just a pile of talented employees and a vague hope they’ll coordinate.问题不在于模型不够智能，而在于我们构建的组织缺乏管理层级，只有一群才华横溢的员工，以及他们能够协调合作的模糊希望。

Resolvers are that missing layer.解析器就是缺失的那一层。

And once you treat them that way, the goal changes. You’re not just wiring up tools. You’re designing an organization that can grow, adapt, and stay coherent over time.一旦你这样对待他们，目标就改变了。你不再只是在组装工具，而是在设计一个能够随着时间推移而成长、适应并保持凝聚力的组织。

That’s a different problem. And a much bigger one.那是另一个问题，而且是个大得多的问题。

## I want you to build your own brain我希望你构建自己的大脑

Everything in this article — the resolver pattern, the trigger evals, check-resolvable, the filing rules, the self-healing loop — runs in production, every day, on my personal agent. It processes 200 inputs daily. It has 25,000 files. It compounds.本文中的所有内容——解析器模式、触发器评估、可解析性检查、归档规则、自愈循环——每天都在我的个人代理上实际运行。它每天处理 200 个输入。它有 25,000 个文件。它会不断累积。

I open-sourced the entire system.我已将整个系统开源。

**My open source project GBrain** ships with the resolver pattern built in. \`gbrain init\` creates RESOLVER.md, the decision tree, and the disambiguation rules. Your agent starts filing correctly from day one. The check-resolvable skill comes built-in. You don't have to discover these patterns by breaking things — the system embodies them.**我的开源项目 GBrain** 内置了解析器模式。\`gbrain init\` 会创建 RESOLVER.md 文件、决策树和消歧规则。您的代理从第一天起就能正确归档。检查可解析性技能也已内置。您无需通过破坏现有系统来发现这些模式——系统已经包含了它们。

**GStack** is the coding layer. Fat skills in markdown. 72,000+ stars on GitHub. The skills in GStack call the knowledge in GBrain. Together they're the full architecture: intelligence on tap.**GStack** 是编码层，它以 Markdown 格式呈现丰富的技能，在 GitHub 上拥有超过 72,000 个星标。GStack 中的技能调用 GBrain 中的知识。它们共同构成完整的架构：智能触手可及。

**OpenClaw** or **Hermes Agent** is the conductor — the thin harness that runs the agent loop, manages sessions, and executes crons. GBrain and GStack are skills that plug into it. Your agent reads GBrain's compiled truth before answering. Your crons run the rollup pipelines while you sleep.**OpenClaw** 或 **Hermes Agent** 是核心组件——一个轻量级的框架，负责运行代理循环、管理会话并执行定时任务。GBrain 和 GStack 是与之集成的技能。你的代理会在回答问题前读取 GBrain 编译后的真值。你的定时任务会在你睡觉时运行 Rollup 管道。

This isn't a SaaS product. It's an architecture. The source code is open. The skills are markdown. The brain is a git repo you own. If any piece disappeared tomorrow, your knowledge survives as plain text files.这不是一款 SaaS 产品，而是一种架构。源代码是开源的。技能以 Markdown 格式呈现。大脑是一个由你拥有的 Git 仓库。即使明天其中任何一部分丢失，你的知识仍然以纯文本文件的形式保存下来。

This is the new dawn of personal software. This is not packaged software. This is software that you build for yourself, but with the fat skills and fat code and thin harness that is your own personal mini-AGI. The future is already here, and I want you to have it in your pocket. 这是个人软件的新纪元。这不是现成的软件包，而是你为自己构建的软件，它融合了你精湛的技能、丰富的代码和轻量级的框架，是你专属的迷你通用人工智能（AGI）。未来已来，我希望你能把它装进口袋。

The architecture fits on an index card. The knowledge fits in a git repo. The only thing missing is you starting.架构图可以写在一张索引卡片上。知识库可以存入一个 Git 代码库。现在就差你开始行动了。

