---
title: "Lessons from Building Claude Code: How We Use Skills 从构建克劳德代码中汲取的经验教训：我们如何运用技能"
source: "https://x.com/trq212/status/2033949937936085378"
author:
  - "[[Thariq]]"
published: 2026-03-18
created: 2026-03-23
description:
tags:
  - "clippings"
---
Skills have become one of the most used extension points in Claude Code. They’re flexible, easy to make, and simple to distribute.技能已成为 Claude Code 中最常用的扩展功能之一。它们灵活、易于创建且易于分发。

But this flexibility also makes it hard to know what works best. What type of skills are worth making? What's the secret to writing a good skill? When do you share them with others?但这种灵活性也使得我们难以判断哪种方法最有效。哪些类型的技能值得培养？编写好的技能说明的秘诀是什么？何时应该与他人分享这些技能？

We've been using skills in Claude Code extensively at Anthropic with hundreds of them in active use. These are the lessons we've learned about using skills to accelerate our development.在 Anthropic，我们广泛使用 Claude Code 中的各种技能，其中数百项技能已投入使用。以下是我们从运用这些技能加速产品开发过程中总结出的经验教训。

## What are Skills?什么是技能？

If you’re new to skills, I’d recommend [reading our docs](https://code.claude.com/docs/en/skills) or watching our newest course on [new Skilljar on Agent Skills](https://anthropic.skilljar.com/introduction-to-agent-skills), this post will assume you already have some familiarity with skills.如果你是技能新手，我建议[阅读我们的文档](https://code.claude.com/docs/en/skills)或者观看我们最新的课程[特工技能新增 Skilljar 功能](https://anthropic.skilljar.com/introduction-to-agent-skills)本文假设您已经具备一定的技能。

A common misconception we hear about skills is that they are “just markdown files”, but the most interesting part of skills is that they’re not just text files. They’re folders that can include scripts, assets, data, etc. that the agent can discover, explore and manipulate.我们经常听到的一种关于技能的误解是，它们“只是 Markdown 文件”，但技能最有趣的地方在于它们不仅仅是文本文件。它们是文件夹，可以包含脚本、资源、数据等，代理可以发现、探索和操作这些内容。

In Claude Code, skills also have a [wide variety of configuration options](https://code.claude.com/docs/en/skills#frontmatter-reference) including registering dynamic hooks.在克劳德代码中，技能也具有[多种配置选项](https://code.claude.com/docs/en/skills#frontmatter-reference)包括注册动态钩子。

We’ve found that some of the most interesting skills in Claude Code use these configuration options and folder structure creatively.我们发现 Claude Code 中一些最有趣的技能创造性地利用了这些配置选项和文件夹结构。

# Types of Skills技能类型

After cataloging all of our skills, we noticed they cluster into a few recurring categories. The best skills fit cleanly into one; the more confusing ones straddle several. This isn't a definitive list, but it is a good way to think about if you're missing any inside of your org.在对所有技能进行分类后，我们发现它们大致可以归为几个类别。最优秀的技能可以清晰地归入某一类别；而那些比较复杂的技能则可能跨越多个类别。这并非一份完整的清单，但它可以帮助您思考组织内部是否存在技能缺失。

![Image](https://pbs.twimg.com/media/HDlvMmubEAIzF-N?format=jpg&name=large)

## 1\. Library & API Reference1. 库和 API 参考

Skills that explain how to correctly use a library, CLI, or SDKs. These could be both for internal libraries or common libraries that Claude Code sometimes has trouble with. These skills often included a folder of reference code snippets and a list of gotchas for Claude to avoid when writing a script.这些技能讲解了如何正确使用库、命令行界面 (CLI) 或软件开发工具包 (SDK)。这些库可能包括内部库，也可能包括 Claude Code 有时遇到问题的常用库。这些技能通常包含一个参考代码片段文件夹，以及一份 Claude 在编写脚本时需要避免的陷阱列表。

**Examples:例如：**

- billing-lib — your internal billing library: edge cases, footguns, etc.billing-lib — 您的内部计费库：特殊情况、意外情况等。
- internal-platform-cli — every subcommand of your internal CLI wrapper with examples on when to use theminternal-platform-cli — 内部 CLI 包装器的每个子命令，以及何时使用它们的示例
- frontend-design — make Claude better at your design system前端设计——让 Claude 更擅长你的设计系统

## 2\. Product Verification2. 产品验证

Skills that describe how to test or verify that your code is working. These are often paired with an external tool like playwright, tmux, etc. for doing the verification.这些技能描述了如何测试或验证代码是否正常运行。这些技能通常会与 Playwright、tmux 等外部工具配合使用，以进行验证。

Verification skills are extremely useful for ensuring Claude's output is correct. It can be worth having an engineer spend a week just making your verification skills excellent.验证技能对于确保克劳德的输出正确性至关重要。花一周时间专门提升你的验证技能是值得的。

Consider techniques like having Claude record a video of its output so you can see exactly what it tested, or enforcing programmatic assertions on state at each step. These are often done by including a variety of scripts in the skill.可以考虑一些技巧，例如让 Claude 录制输出视频，以便您准确了解它测试的内容；或者在每个步骤中强制执行状态的程序化断言。这些通常是通过在技能中包含各种脚本来实现的。

**Examples:例如：**

- signup-flow-driver — runs through signup → email verify → onboarding in a headless browser, with hooks for asserting state at each stepsignup-flow-driver — 在无头浏览器中运行注册 → 邮箱验证 → 引导流程，并在每个步骤提供状态断言钩子。
- checkout-verifier — drives the checkout UI with Stripe test cards, verifies the invoice actually lands in the right state结账验证器 — 使用 Stripe 测试卡驱动结账用户界面，验证发票是否实际进入正确的状态
- tmux-cli-driver — for interactive CLI testing where the thing you're verifying needs a TTYtmux-cli-driver — 用于交互式 CLI 测试，尤其适用于需要 TTY 的测试。

## 3\. Data Fetching & Analysis3. 数据获取与分析

Skills that connect to your data and monitoring stacks. These skills might include libraries to fetch your data with credentials, specific dashboard ids, etc. as well as instructions on common workflows or ways to get data.与您的数据和监控系统相关的技能。这些技能可能包括使用凭据、特定仪表板 ID 等获取数据的库，以及有关常见工作流程或数据获取方法的说明。

**Examples:例如：**

- funnel-query — "which events do I join to see signup → activation → paid" plus the table that actually has the canonical user\_id漏斗查询——“我应该加入哪些事件才能查看注册→激活→付费”以及实际包含规范用户 ID 的表
- cohort-compare — compare two cohorts' retention or conversion, flag statistically significant deltas, link to the segment definitions队列比较 — 比较两个队列的留存率或转化率，标记具有统计学意义的差异，并链接到细分定义。
- grafana — datasource UIDs, cluster names, problem → dashboard lookup tableGrafana — 数据源 UID、集群名称、问题 → 仪表盘查找表

## 4\. Business Process & Team Automation4. 业务流程和团队自动化

Skills that automate repetitive workflows into one command. These skills are usually fairly simple instructions but might have more complicated dependencies on other skills or MCPs. For these skills, saving previous results in log files can help the model stay consistent and reflect on previous executions of the workflow.这些技能可以将重复性工作流程自动化为一条命令。这些技能通常是相当简单的指令，但可能与其他技能或主控程序 (MCP) 存在更复杂的依赖关系。对于这些技能，将先前的结果保存到日志文件中可以帮助模型保持一致性，并反映工作流程的先前执行情况。

**Examples:例如：**

- standup-post — aggregates your ticket tracker, GitHub activity, and prior Slack → formatted standup, delta-onlystandup-post — 聚合您的工单跟踪器、GitHub 活动和之前的 Slack 记录 → 格式化的站会，仅显示增量信息
- create-<ticket-system>-ticket — enforces schema (valid enum values, required fields) plus post-creation workflow (ping reviewer, link in Slack)创造-<ticket-system> -ticket — 强制执行架构（有效的枚举值、必填字段）以及创建后的工作流程（通知审核人员、在 Slack 中提供链接）
- weekly-recap — merged PRs + closed tickets + deploys → formatted recap post每周回顾 — 合并的 PR + 已关闭的工单 + 部署 → 格式化的回顾文章

## 5\. Code Scaffolding & Templates5. 代码脚手架和模板

Skills that generate framework boilerplate for a specific function in codebase. You might combine these skills with scripts that can be composed. They are especially useful when your scaffolding has natural language requirements that can’t be purely covered by code.这些技能可以生成代码库中特定功能的框架样板代码。您可以将这些技能与可组合的脚本结合使用。当您的脚手架具有无法完全通过代码实现的自然语言要求时，这些技能尤其有用。

**Examples:例如：**

- new-<framework>-workflow — scaffolds a new service/workflow/handler with your annotations新的-<framework> -workflow — 使用您的注解搭建一个新的服务/工作流/处理程序
- new-migration — your migration file template plus common gotchas新迁移 — 您的迁移文件模板以及常见陷阱
- create-app — new internal app with your auth, logging, and deploy config pre-wired创建应用 — 创建一个新的内部应用，其中预先配置了身份验证、日志记录和部署设置

## 6\. Code Quality & Review6. 代码质量与审查

Skills that enforce code quality inside of your org and help review code. These can include deterministic scripts or tools for maximum robustness. You may want to run these skills automatically as part of hooks or inside of a GitHub Action.这些技能可以确保组织内部的代码质量，并有助于代码审查。它们可以包括用于最大限度提高健壮性的确定性脚本或工具。您可能希望将这些技能作为钩子的一部分或在 GitHub Action 中自动运行。

- adversarial-review — spawns a fresh-eyes subagent to critique, implements fixes, iterates until findings degrade to nitpicks对抗性审查——生成一个具有全新视角的子代理进行批判，实施修复，不断迭代，直到发现的问题都只是吹毛求疵为止。
- code-style — enforces code style, especially styles that Claude does not do well by default.代码风格 — 强制执行代码风格，特别是 Claude 默认情况下处理不佳的风格。
- testing-practices — instructions on how to write tests and what to test.测试实践——关于如何编写测试以及测试什么的说明。

## 7\. CI/CD & Deployment7. CI/CD 和部署

Skills that help you fetch, push, and deploy code inside of your codebase. These skills may reference other skills to collect data.这些技能可以帮助您在代码库中获取、推送和部署代码。这些技能可能会引用其他技能来收集数据。

**Examples:例如：**

- babysit-pr — monitors a PR → retries flaky CI → resolves merge conflicts → enables auto-mergebabysit-pr — 监控 PR → 重试不稳定的 CI → 解决合并冲突 → 启用自动合并
- deploy-<service> — build → smoke test → gradual traffic rollout with error-rate comparison → auto-rollback on regression部署-<service> — 构建 → 冒烟测试 → 逐步上线并比较错误率 → 回归测试自动回滚
- cherry-pick-prod — isolated worktree → cherry-pick → conflict resolution → PR with templatecherry-pick-prod — 隔离的工作树 → cherry-pick → 冲突解决 → 使用模板的 PR

## 8\. Runbooks8. 运行手册

Skills that take a symptom (such as a Slack thread, alert, or error signature), walk through a multi-tool investigation, and produce a structured report.能够根据症状（例如 Slack 线程、警报或错误签名）进行多工具调查，并生成结构化报告的技能。

**Examples:例如：**

- <service>-debugging — maps symptoms → tools → query patterns for your highest-traffic services<service>-调试 — 将症状映射到工具 → 查询模式，以分析您流量最高的服务
- oncall-runner — fetches the alert → checks the usual suspects → formats a finding值班运行程序 — 获取警报 → 检查常见嫌疑对象 → 格式化调查结果
- log-correlator — given a request ID, pulls matching logs from every system that might have touched it日志关联器——给定一个请求 ID，从所有可能访问过该请求的系统中拉取匹配的日志。

## 9\. Infrastructure Operations9. 基础设施运营

Skills that perform routine maintenance and operational procedures — some of which involve destructive actions that benefit from guardrails. These make it easier for engineers to follow best practices in critical operations.执行日常维护和操作程序所需的技能——其中一些操作可能具有破坏性，因此需要采取防护措施。这些措施有助于工程师在关键操作中遵循最佳实践。

**Examples:例如：**

- <resource>-orphans — finds orphaned pods/volumes → posts to Slack → soak period → user confirms → cascading cleanup<resource>-orphans — 查找孤立的 pod/volumes → 发布到 Slack → 等待一段时间 → 用户确认 → 级联清理
- dependency-management — your org's dependency approval workflow依赖管理 — 贵组织的依赖审批工作流程
- cost-investigation — "why did our storage/egress bill spike" with the specific buckets and query patterns成本调查——“为什么我们的存储/出站流量费用飙升”，并分析具体的存储桶和查询模式

# Tips for Making Skills提升技能的技巧

![Image](https://pbs.twimg.com/media/HDoKg58bEAAL1bw?format=jpg&name=large)

Once you've decided on the skill to make, how do you write it? These are some of the best practices, tips, and tricks we've found.一旦你决定要制作什么技能，该如何编写代码呢？以下是我们总结的一些最佳实践、技巧和窍门。

We also recently released [Skill Creator](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills) to make it easier to create skills in Claude Code.我们最近也发布了[技能创建者](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)使在 Claude Code 中创建技能更加容易。

## Don’t State the Obvious不要说显而易见的事

Claude Code knows a lot about your codebase, and Claude knows a lot about coding, including many default opinions. If you’re publishing a skill that is primarily about knowledge, try to focus on information that pushes Claude out of its normal way of thinking.Claude Code 对你的代码库非常了解，也精通编程，包括许多默认观点。如果你发布的技能主要涉及知识，请尝试提供能够打破 Claude 固有思维模式的信息。

The [frontend design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) is a great example — it was built by one of the engineers at Anthropic by iterating with customers on improving Claude’s design taste, avoiding classic patterns like the Inter font and purple gradients.这[前端设计技能](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)就是一个很好的例子——它是由 Anthropic 的一位工程师通过与客户反复沟通，改进 Claude 的设计品味而打造的，避免了 Inter 字体和紫色渐变等经典图案。

## Build a Gotchas Section建立陷阱部分

![Image](https://pbs.twimg.com/media/HDlwEG1bEAUdmcV?format=jpg&name=large)

The highest-signal content in any skill is the Gotchas section. These sections should be built up from common failure points that Claude runs into when using your skill. Ideally, you will update your skill over time to capture these gotchas.任何技能中最具价值的内容都是“陷阱”部分。这些部分应该基于克劳德在使用技能时常遇到的失败点构建而成。理想情况下，你应该随着时间的推移不断更新技能，以涵盖这些陷阱。

## Use the File System & Progressive Disclosure使用文件系统和渐进式披露

![Image](https://pbs.twimg.com/media/HDlwhSjbEAIJSc9?format=jpg&name=large)

Like we said earlier, a skill is a folder, not just a markdown file. You should think of the entire file system as a form of context engineering and progressive disclosure. Tell Claude what files are in your skill, and it will read them at appropriate times.正如我们之前所说，技能是一个文件夹，而不仅仅是一个 Markdown 文件。你应该把整个文件系统看作是一种上下文工程和渐进式披露。告诉 Claude 你的技能里有哪些文件，它会在适当的时候读取它们。

The simplest form of progressive disclosure is to point to other markdown files for Claude to use. For example, you may split detailed function signatures and usage examples into references/api.md.最简单的渐进式披露方式是指向其他 Markdown 文件供 Claude 使用。例如，您可以将详细的函数签名和使用示例拆分到 references/api.md 文件中。

Another example: if your end output is a markdown file, you might include a template file for it in assets/ to copy and use.另一个例子：如果你的最终输出是 markdown 文件，你可以在 assets/ 中包含一个模板文件以供复制和使用。

You can have folders of references, scripts, examples, etc., which help Claude work more effectively.您可以创建文件夹，存放参考资料、脚本、示例等，这有助于 Claude 更有效地工作。

## Avoid Railroading Claude避免铁路克劳德

Claude will generally try to stick to your instructions, and because Skills are so reusable you’ll want to be careful of being too specific in your instructions. Give Claude the information it needs, but give it the flexibility to adapt to the situation. For example:克劳德通常会尽量遵循你的指令，但由于技能可以重复使用，所以你的指令要谨慎，不要过于具体。给克劳德提供所需的信息，但也要赋予它适应不同情况的灵活性。例如：

![Image](https://pbs.twimg.com/media/HDlwurvbEAM5ZNu?format=jpg&name=large)

## Think through the Setup仔细考虑一下设置

![Image](https://pbs.twimg.com/media/HDlw1mYbEAY-Bul?format=jpg&name=large)

Some skills may need to be set up with context from the user. For example, if you are making a skill that posts your standup to Slack, you may want Claude to ask which Slack channel to post it in.有些技能可能需要根据用户提供的上下文进行设置。例如，如果您创建的技能是将您的站会发布到 Slack，您可能需要让 Claude 询问要发布到哪个 Slack 频道。

A good pattern to do this is to store this setup information in a config.json file in the skill directory like the above example. If the config is not set up, the agent can then ask the user for information.一个好的做法是将这些配置信息存储在技能目录下的 config.json 文件中，就像上面的示例一样。如果配置未设置，代理可以向用户询问相关信息。

If you want the agent to present structured, multiple choice questions you can instruct Claude to use the AskUserQuestion tool.如果您希望代理提出结构化的多项选择题，您可以指示 Claude 使用 AskUserQuestion 工具。

## The Description Field Is For the Model描述字段用于模型

When Claude Code starts a session, it builds a listing of every available skill with its description. This listing is what Claude scans to decide "is there a skill for this request?" Which means the description field is not a summary — it's a description of when to trigger this PR.当 Claude Code 启动会话时，它会创建一个包含所有可用技能及其描述的列表。Claude 会扫描此列表以判断“是否存在满足此请求的技能？”。这意味着描述字段并非摘要，而是对何时触发此 PR 的描述。

![Image](https://pbs.twimg.com/media/HDlw5ULbEAQOqtJ?format=jpg&name=large)

## Memory & Storing Data内存与数据存储

![Image](https://pbs.twimg.com/media/HDoImh1bEAU-mMI?format=jpg&name=large)

Some skills can include a form of memory by storing data within them. You could store data in anything as simple as an append only text log file or JSON files, or as complicated as a SQLite database.某些技能可以通过存储数据来实现某种形式的记忆。你可以将数据存储在任何类型的存储介质中，例如仅追加的文本日志文件或 JSON 文件，也可以存储到像 SQLite 数据库这样复杂的介质中。

For example, a standup-post skill might keep a standups.log with every post it's written, which means the next time you run it, Claude reads its own history and can tell what's changed since yesterday.例如，站立发帖技能可能会为它撰写的每篇帖子保留一个 standups.log 文件，这意味着下次运行它时，Claude 会读取它自己的历史记录，并知道自昨天以来发生了哪些变化。

Data stored in the skill directory may be deleted when you upgrade the skill, so you should store this in a stable folder, as of today we provide \`${**CLAUDE\_PLUGIN\_DATA**}\` as a stable folder per plugin to store data in.技能目录中存储的数据可能会在技能升级时被删除，因此您应该将其存储在稳定的文件夹中。目前，我们为每个插件提供了一个稳定的文件夹 \`${ **CLAUDE\_PLUGIN\_DATA** }\` 来存储数据。

## Store Scripts & Generate Code存储脚本并生成代码

One of the most powerful tools you can give Claude is code. Giving Claude scripts and libraries lets Claude spend its turns on composition, deciding what to do next rather than reconstructing boilerplate.你能给 Claude 的最强大的工具之一就是代码。给 Claude 提供脚本和库，就能让 Claude 将精力集中在组合代码上，决定下一步该做什么，而不是重复编写样板代码。

For example, in your data science skill you might have a library of functions to fetch data from your event source. In order for Claude to do complex analysis, you could give it a set of helper functions like so:例如，在你的数据科学技能中，你可能有一个函数库，用于从事件源获取数据。为了让 Claude 进行复杂的分析，你可以像这样给它提供一组辅助函数：

![Image](https://pbs.twimg.com/media/HDlxbtkbkAAOse7?format=jpg&name=large)

Claude can then generate scripts on the fly to compose this functionality to do more advanced analysis for prompts like “What happened on Tuesday?”然后，Claude 可以即时生成脚本来组合此功能，从而对“星期二发生了什么事？”之类的提示进行更高级的分析。

![Image](https://pbs.twimg.com/media/HDlxfEIb0AA2E7l?format=jpg&name=large)

## On Demand Hooks按需钩子

Skills can include hooks that are only activated when the skill is called, and last for the duration of the session. Use this for more opinionated hooks that you don’t want to run all the time, but are extremely useful sometimes.技能可以包含仅在技能被调用时激活、且持续到游戏结束的钩子。这适用于一些你不想一直使用，但有时又非常有用的特殊钩子。

For example:例如：

- /**careful** — blocks rm -rf, DROP TABLE, force-push, kubectl delete via PreToolUse matcher on Bash. You only want this when you know you're touching prod — having it always on would drive you insane注意 **——** 在 Bash 中，PreToolUse 匹配器会阻止 rm -rf、DROP TABLE、force-push 和 kubectl delete 命令。只有在确定要操作生产环境时才需要启用此功能——始终启用会让人抓狂。
- /**freeze** — blocks any Edit/Write that's not in a specific directory. Useful/ **freeze** — 阻止对指定目录之外的所有编辑/写入操作。很有用。
- when debugging: "I want to add logs but I keep accidentally 'fixing' unrelated调试时：“我想添加日志，但我总是不小心‘修复’了无关的问题。”

# Distributing Skills技能分配

One of the biggest benefits of Skills is that you can share them with the rest of your team.技能最大的好处之一就是你可以与团队中的其他成员共享它们。

There are two ways you might to share skills with others:你可以通过两种方式与他人分享技能：

- check your skills into your repo (under ./.claude/skills)将你的技能提交到你的代码仓库（位于 ./.claude/skills 目录下）
- make a **plugin** and have a Claude Code Plugin marketplace where users can upload and install plugins (read more on the [documentation](https://code.claude.com/docs/en/plugin-marketplaces) here)创建一个**插件** ，并建立一个 Claude Code 插件市场，用户可以在其中上传和安装插件（了解更多信息）。 [文档](https://code.claude.com/docs/en/plugin-marketplaces)这里）

For smaller teams working across relatively few repos, checking your skills into repos works well. But every skill that is checked in also adds a little bit to the context of the model. As you scale, an internal plugin marketplace allows you to distribute skills and let your team decide which ones to install.对于规模较小的团队来说，在代码库数量相对较少的情况下，将技能提交到代码库中是一个不错的选择。但每个提交的技能都会为模型增添一些上下文信息。随着团队规模的扩大，内部插件市场可以让你分发技能，并让团队成员决定安装哪些技能。

## Managing a Marketplace管理市场

How do you decide which skills go in a marketplace? How do people submit them?如何决定哪些技能可以放到技能交易平台上？人们如何提交技能信息？

We don't have a centralized team that decides; instead we try and find the most useful skills organically. If you have a skill that you want people to try out, you can upload it to a sandbox folder in GitHub and point people to it in Slack or other forums.我们没有一个集中决策的团队；相反，我们会尽量自然地发现最有用的技能。如果您有想让大家试用的技能，可以将其上传到 GitHub 的沙盒文件夹中，然后在 Slack 或其他论坛上分享给大家。

Once a skill has gotten traction (which is up to the skill owner to decide), they can put in a PR to move it into the marketplace.一旦某项技能获得关注（这取决于技能所有者的决定），他们就可以提交 PR 将其推向市场。

A note of warning, it can be quite easy to create bad or redundant skills, so making sure you have some method of curation before release is important.需要提醒的是，很容易创建不好的或冗余的技能，因此在发布之前确保有一些审核方法非常重要。

## Composing Skills作曲技巧

You may want to have skills that depend on each other. For example, you may have a file upload skill that uploads a file, and a CSV generation skill that makes a CSV and uploads it. This sort of dependency management is not natively built into marketplaces or skills yet, but you can just reference other skills by name, and the model will invoke them if they are installed.您可能需要一些相互依赖的技能。例如，您可以创建一个文件上传技能来上传文件，以及一个 CSV 生成技能来生成并上传 CSV 文件。目前，市场或技能库尚未原生支持这种依赖关系管理，但您可以直接通过名称引用其他技能，如果这些技能已安装，模型会自动调用它们。

## Measuring Skills技能评估

To understand how a skill is doing, we use a PreToolUse hook that lets us log skill usage within the company ([example code here](https://gist.github.com/ThariqS/24defad423d701746e23dc19aace4de5)). This means we can find skills that are popular or are undertriggering compared to our expectations.为了解某项技能的使用情况，我们使用 PreToolUse 钩子来记录公司内部的技能使用情况（ [示例代码如下](https://gist.github.com/ThariqS/24defad423d701746e23dc19aace4de5)这意味着我们可以发现一些热门技能，或者与我们的预期相比，这些技能的触发程度较低。

# Conclusion结论

Skills are incredibly powerful, flexible tools for agents, but it’s still early and we’re all figuring out how to use them best.技能是经纪人非常强大、灵活的工具，但目前还处于早期阶段，我们都在摸索如何才能最好地使用它们。

Think of this more as a grab bag of useful tips that we’ve seen work than a definitive guide. The best way to understand skills is to get started, experiment, and see what works for you. Most of ours began as a few lines and a single gotcha, and got better because people kept adding to them as Claude hit new edge cases.与其说这是一份权威指南，不如说它更像是一个实用技巧大全，汇集了我们亲身实践过的有效方法。掌握技能的最佳途径就是动手实践，不断尝试，找出适合自己的方法。我们的大多数技巧最初都只是寥寥几行代码和一个小小的陷阱，随着克劳德遇到新的极端情况，大家不断补充完善，技巧也随之不断改进。

I hope this was helpful, let me know if you have any questions.希望这对您有所帮助，如有任何疑问，请随时联系我。