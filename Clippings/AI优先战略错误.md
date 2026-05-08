---
title: "Why Your “AI-First” Strategy Is Probably Wrong  为什么你的“人工智能优先”战略可能是错误的"
source: "https://x.com/intuitiveml/status/2043545596699750791"
author:
  - "[[@intuitiveml]]"
published: 2026-04-13
created: 2026-04-14
description: "99% of our production code is written by AI. Last Tuesday, we shipped a new feature at 10 AM, A/B tested it by noon, and killed it by 3 PM b..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HFwEJl_bEAAPyc8?format=jpg&name=large)

99% of our production code is written by AI. Last Tuesday, we shipped a new feature at 10 AM, A/B tested it by noon, and killed it by 3 PM because the data said no. We shipped a better version at 5 PM. Three months ago, a cycle like that would have taken six weeks.我们 99%的生产代码都是由人工智能编写的。上周二，我们上午 10 点发布了一项新功能，中午进行了 A/B 测试，下午 3 点就下架了，因为数据表明效果不佳。下午 5 点，我们发布了一个改进版本。三个月前，这样的周期需要六周时间。

We didn't get here by adding Copilot to our IDE. We dismantled our engineering process and rebuilt it around AI. We changed how we plan, build, test, deploy, and organize the team. We changed the role of everyone in the company.我们并非通过在集成开发环境 (IDE) 中添加 Copilot 就取得了今天的成就。我们彻底拆解了原有的工程流程，并围绕人工智能进行了重建。我们改变了规划、构建、测试、部署和团队组织的方式。我们改变了公司里每个人的角色。

CREAO is an agent platform. Twenty-five employees, 10 engineers. We started building agents in November 2025, and two months ago I restructured the entire product architecture and engineering workflow from the ground up.CREAO 是一个智能代理平台，拥有 25 名员工，其中 10 名是工程师。我们从 2025 年 11 月开始构建智能代理，两个月前，我从零开始重构了整个产品架构和工程工作流程。

OpenAI published a concept in February 2026 that captured what we'd been doing. They called it harness engineering: the primary job of an engineering team is no longer writing code. It is enabling agents to do useful work. When something fails, the fix is never "try harder." The fix is: what capability is missing, and how do we make it legible and enforceable for the agent?OpenAI 在 2026 年 2 月发布了一个概念，概括了我们一直在做的事情。他们称之为“赋能工程”：工程团队的主要工作不再是编写代码，而是赋能智能体完成有用的工作。当出现故障时，解决方法不再是“再努力尝试”，而是：缺少什么能力？我们如何让智能体能够理解并执行这些能力？

We arrived at that conclusion on our own. We didn't have a name for it.这是我们自己得出的结论。我们当时并不知道该如何称呼它。

## AI-First Is Not the Same as Using AI人工智能优先并不等同于使用人工智能

![Image](https://pbs.twimg.com/media/HFwEVlnbkAAYtWM?format=jpg&name=large)

Most companies bolt AI onto their existing process. An engineer opens Cursor. A PM drafts specs with ChatGPT. QA experiments with AI test generation. The workflow stays the same. Efficiency goes up 10 to 20 percent. Nothing structurally changes.大多数公司将人工智能融入到现有流程中。工程师打开 Cursor，项目经理使用 ChatGPT 起草规范，质量保证人员使用人工智能生成的测试用例进行实验。工作流程保持不变，效率提升了 10% 到 20%，结构上没有任何改变。

That is AI-assisted.这是人工智能辅助的。

**AI-first means you redesign your process, your architecture, and your organization around the assumption that AI is the primary builder.** You stop asking "how can AI help our engineers?" and start asking "how do we restructure everything so AI does the building, and engineers provide direction and judgment?"**“AI 优先”意味着围绕“AI 是主要构建者”这一假设，重新设计你的流程、架构和组织。** 你不再问“AI 如何帮助我们的工程师？”，而是开始问 “我们如何重组一切，让 AI 负责构建，而工程师提供方向和判断？”

The difference is multiplicative.两者之间的差异是乘法关系。

I see teams claim AI-first while running the same sprint cycles, the same Jira boards, the same weekly standups, the same QA sign-offs. They added AI to the loop. They didn't redesign the loop.我看到一些团队声称“AI 优先”，但他们使用的仍然是同样的迭代周期、同样的 Jira 看板、同样的每周站会、同样的 QA 验收流程。他们只是在原有流程中添加了 AI，并没有重新设计整个流程。

A common version of this is what people call vibe coding. Open Cursor, prompt until something works, commit, repeat. That produces prototypes. A production system needs to be stable, reliable, and secure. You need a system that can guarantee those properties when AI writes the code. You build the system. The prompts are disposable.一种常见的实现方式是所谓的“直觉式编码”。打开光标，不断提示直到某个功能实现，然后提交，如此循环。这样就能生成原型。而生产系统需要稳定、可靠且安全。你需要一个系统，能够在人工智能编写代码时保证这些特性。系统由你构建，提示信息是可以丢弃的。

## Why We Had to Change我们为何必须改变

Last year, I watched how our team worked and saw three bottlenecks that would kill us.去年，我观察了我们团队的工作情况，发现了三个会让我们失败的瓶颈。

**The Product Management Bottleneck产品管理瓶颈**

Our PMs spent weeks researching, designing, specifying features. Product management has worked this way for decades. But agents can implement a feature in two hours. When build time collapses from months to hours, a weeks-long planning cycle becomes the constraint.我们的产品经理花费数周时间进行研究、设计和明确功能。产品管理一直都是这样运作的。但实际操作人员只需两小时就能实现一个功能。当构建时间从数月缩短到数小时时，长达数周的规划周期就成了制约因素。

It doesn't make sense to think about something for months and then build it in two hours.花几个月时间思考某件事，然后只花两个小时就把它做出来，这毫无意义。

PMs needed to evolve into product-minded architects who work at the speed of iteration, or step out of the build cycle. Design needed to happen through rapid prototype-ship-test-iterate loops, not specification documents reviewed in committee.产品经理需要转型为以产品为导向的架构师，以迭代的速度工作，或者退出产品开发周期。设计需要通过快速的原型制作-交付-测试-迭代循环来实现，而不是通过委员会审查规范文档。

**The QA Bottleneck质量保证瓶颈**

Same dynamic. After an agent shipped a feature, our QA team spent days testing corner cases. Build time: two hours. Test time: three days.同样的情况。代理商发布新功能后，我们的测试团队花了几天时间测试各种极端情况。构建时间：两小时。测试时间：三天。

We replaced manual QA with AI-built testing platforms that test AI-written code. Validation has to move at the same speed as implementation. Otherwise you've built a new bottleneck ten feet downstream from the old one.我们用人工智能构建的测试平台取代了人工质量保证，这些平台可以测试人工智能编写的代码。验证必须与实现速度保持同步。否则，你就会在原有瓶颈下游十英尺的地方设置了一个新的瓶颈。

**The Headcount Bottleneck人员数量瓶颈**

Our competitors had 100x or more people doing comparable work. We have 25. We couldn't hire our way to parity. We had to redesign our way there.我们的竞争对手拥有我们100倍甚至更多的人从事类似的工作，而我们只有25人。我们无法通过招聘来达到同样的水平，只能通过重新设计流程来实现。

Three systems needed AI running through them: how we design product, how we implement product, and how we test product. If any single one stays manual, it constrains the whole pipeline.有三个系统需要人工智能来运行：产品设计、产品实现和产品测试。如果其中任何一个环节仍然依赖人工操作，都会限制整个流程的效率。

## The Bold Decision: Unifying the Architecture大胆的决定：统一架构

![Image](https://pbs.twimg.com/media/HFwEjnpbEAAXeFc?format=jpg&name=large)

I had to fix the codebase first.我得先修复代码库。

Our old architecture was scattered across multiple independent systems. A single change might require touching three or four repositories. From a human engineer's perspective, it is manageable. From an AI agent's perspective, opaque. The agent can't see the full picture. It can't reason about cross-service implications. It can't run integration tests locally.我们原有的架构分散在多个独立的系统中。一次改动可能需要修改三四个代码库。从人类工程师的角度来看，这尚可管理。但从人工智能代理的角度来看，这却很不透明。代理无法了解全局，无法推断跨服务的影响，也无法在本地运行集成测试。

I had to unify all the code into a single monorepo. One reason: so AI could see everything.我必须将所有代码合并到一个单体仓库中。原因之一：这样人工智能才能看到所有内容。

This is a harness engineering principle in practice. The more of your system you pull into a form the agent can inspect, validate, and modify, the more leverage you get. A fragmented codebase is invisible to agents. A unified one is legible.这是工程学原理的实际应用。你将系统中越多的部分整合到代理可以检查、验证和修改的形式中，就能获得越大的权限。分散的代码库对代理来说是不可见的，而统一的代码库则清晰易读。

I spent one week designing the new system: planning stage, implementation stage, testing stage, integration testing stage. Then another week re-architecting the entire codebase using agents.我花了一周时间设计新系统：包括规划阶段、实现阶段、测试阶段和集成测试阶段。然后又花了一周时间使用代理对整个代码库进行重新架构。

CREAO is an agent platform. We used our own agents to rebuild the platform that runs agents. If the product can build itself, it works.CREAO 是一个代理平台。我们使用自己的代理程序重建了运行代理程序的平台。如果产品能够自我构建，那么它就是有效的。

## The Stack堆栈

Here is our stack and what each piece does.以下是我们的组件栈以及每个组件的功能。

**Infrastructure: AWS基础设施：AWS**

We run on AWS with auto-scaling container services and circuit-breaker rollback. If metrics degrade after a deployment, the system reverts on its own.我们使用 AWS 云平台，并配备了自动扩展的容器服务和熔断回滚机制。如果部署后指标下降，系统会自动回滚。

CloudWatch is the central nervous system. Structured logging across all services, over 25 alarms, custom metrics queried daily by automated workflows. Every piece of infrastructure exposes structured, queryable signals. If AI can't read the logs, it can't diagnose the problem.CloudWatch 是中枢神经系统。它提供跨所有服务的结构化日志记录、超过 25 种告警，以及由自动化工作流每日查询的自定义指标。基础设施的每个部分都会暴露结构化的、可查询的信号。如果 AI 无法读取日志，就无法诊断问题。

**CI/CD: GitHub ActionsCI/CD：GitHub Actions**

Every code change passes through a six-phase pipeline:每次代码更改都要经过六个阶段的流程：

Verify CI → Build and Deploy Dev → Test Dev → Deploy Prod → Test Prod → Release验证 CI → 构建并部署开发环境 → 测试开发环境 → 部署生产环境 → 测试生产环境 → 发布

The CI gate on every pull request enforces typechecking, linting, unit and integration tests, Docker builds, end-to-end tests via Playwright, and environment parity checks. No phase is optional. No manual overrides. The pipeline is deterministic, so agents can predict outcomes and reason about failures.每个拉取请求都会触发持续集成 (CI) 门控，强制执行类型检查、代码检查、单元测试和集成测试、Docker 构建、通过 Playwright 进行的端到端测试以及环境一致性检查。所有阶段都必不可少，不允许手动覆盖。该流水线是确定性的，因此代理可以预测结果并分析失败原因。

**AI Code Review: ClaudeAI 代码审查：克劳德**

Every pull request triggers three parallel AI review passes using Claude Opus 4.6:每个拉取请求都会触发使用 Claude Opus 4.6 的三轮并行 AI 审查：

Pass 1: Code quality. Logic errors, performance issues, maintainability.第一阶段：代码质量。逻辑错误、性能问题、可维护性。

Pass 2: Security. Vulnerability scanning, authentication boundary checks, injection risks.第二阶段：安全性。漏洞扫描、身份验证边界检查、注入风险。

Pass 3: Dependency scan. Supply chain risks, version conflicts, license issues.第三阶段：依赖关系扫描。供应链风险、版本冲突、许可问题。

These are review gates, not suggestions. They run alongside human review, catching what humans miss at volume. When you deploy eight times a day, no human reviewer can sustain attention across every PR.这些是审核门槛，而非建议。它们与人工审核并行运行，能够捕捉到人工审核在大量发布过程中遗漏的内容。当每天发布八次时，任何人工审核员都无法持续关注每一项 PR。

Engineers also tag [@claude](https://x.com/@claude) in any GitHub issue or PR for implementation plans, debugging sessions, or code analysis. The agent sees the whole monorepo. Context carries across conversations.工程师们也给它贴标签 [@claude](https://x.com/@claude) 在任何 GitHub issue 或 PR 中，都可以讨论实现计划、调试会话或代码分析。代理可以看到整个单体仓库。上下文信息会在对话之间传递。

**The Self-Healing Feedback Loop自愈反馈回路**

This is the centerpiece.这是中心装饰品。

Every morning at 9:00 AM UTC, an automated health workflow runs. Claude Sonnet 4.6 queries CloudWatch, analyzes error patterns across all services, and generates an executive health summary delivered to the team via Microsoft Teams. Nobody had to ask for it.每天早上 9:00（UTC 时间），系统都会自动运行健康工作流。Claude Sonnet 4.6 会查询 CloudWatch，分析所有服务中的错误模式，并生成一份执行健康摘要，通过 Microsoft Teams 发送给团队。这一切都是自动完成的，无需任何人主动询问。

One hour later, the triage engine runs. It clusters production errors from CloudWatch and Sentry, scores each cluster across nine severity dimensions, and auto-generates investigation tickets in Linear. Each ticket includes sample logs, affected users, affected endpoints, and suggested investigation paths.一小时后，故障分诊引擎启动。它将来自 CloudWatch 和 Sentry 的生产环境错误进行聚类，并根据九个严重性维度对每个聚类进行评分，然后在 Linear 中自动生成调查工单。每个工单都包含示例日志、受影响用户、受影响端点和建议的调查路径。

The system deduplicates. If an open issue covers the same error pattern, it updates that issue. If a previously closed issue recurs, it detects the regression and reopens.系统会进行去重。如果一个未解决的问题涵盖了相同的错误模式，系统会更新该问题。如果一个先前已关闭的问题再次出现，系统会检测到该回归问题并将其重新打开。

When an engineer pushes a fix, the same pipeline handles it. Three Claude review passes evaluate the PR. CI validates. The six-phase deploy pipeline promotes through dev and prod with testing at each stage. After deployment, the triage engine re-checks CloudWatch. If the original errors are resolved, the Linear ticket auto-closes.当工程师提交修复程序时，同一条流水线会处理它。Claude 会进行三次审核，评估 PR。持续集成 (CI) 会进行验证。六阶段部署流水线会依次部署到开发环境和生产环境，并在每个阶段进行测试。部署完成后，故障排查引擎会重新检查 CloudWatch。如果原始错误已解决，Linear 工单将自动关闭。

![Image](https://pbs.twimg.com/media/HFwUNbua4AA65-z?format=jpg&name=large)

Each tool handles one phase. No tool tries to do everything. The daily cycle creates a self-healing loop where errors are detected, triaged, fixed, and verified with minimal manual intervention.每个工具负责一个阶段。没有哪个工具试图包揽一切。每日循环形成一个自我修复的回路，在这个回路中，错误会被检测、分类、修复和验证，而人工干预则降至最低。

I told a reporter from Business Insider: "AI will make the PR and the human just needs to review whether there's any risk."我告诉《商业内幕》的一名记者：“人工智能将负责公关稿的撰写，而人只需要审查是否存在任何风险。”

**Feature Flags and the Supporting Stack功能标志和支持堆栈**

Statsig handles feature flags. Every feature ships behind a gate. The rollout pattern: enable for the team, then gradual percentage rollout, then full release or kill. The kill switch toggles a feature off instantly, no deploy needed. If a feature degrades metrics, we pull it within hours. Bad features die the same day they ship. A/B testing runs through the same system.Statsig 负责处理功能开关。每个功能都需经过层层审核才能发布。发布模式为：先对团队启用，然后逐步按比例推广，最后全面发布或终止。终止开关会立即关闭功能，无需部署。如果某个功能导致指标下降，我们会在数小时内将其撤回。糟糕的功能会在发布当天就被移除。A/B 测试也通过同一系统运行。

Graphite manages PR branching: merge queues rebase onto main, re-run CI, merge only if green. Stacked PRs allow incremental review at high throughput.Graphite 管理 PR 分支：合并队列会重新基于主分支，重新运行 CI，仅当 PR 通过审核时才合并。堆叠式 PR 允许以高吞吐量进行增量审查。

Sentry reports structured exceptions across all services, merged with CloudWatch by the triage engine for cross-tool context. Linear is the human-facing layer: auto-created tickets with severity scores, sample logs, and suggested investigation. Deduplication prevents noise. Follow-up verification auto-closes resolved issues.Sentry 会报告所有服务的结构化异常，并通过分类引擎将其与 CloudWatch 合并，以提供跨工具的上下文信息。Linear 是面向用户的层：自动创建包含严重性评分、示例日志和调查建议的工单。去重功能可防止数据干扰。后续验证会自动关闭已解决的问题。

## How a Feature Moves from Idea to Production一部电影如何从构思走向制作

![Image](https://pbs.twimg.com/media/HFwUDbna8AAQ8_F?format=jpg&name=large)

**New Feature Path新特征路径**

1. The architect defines the task as a structured prompt with codebase context, goals, and constraints.架构师将任务定义为包含代码库上下文、目标和约束的结构化提示。
2. An agent decomposes the task, plans implementation, writes code, and generates its own tests.代理会分解任务、规划实现方案、编写代码并生成自己的测试。
3. A PR opens. Three Claude review passes evaluate it. A human reviewer checks for strategic risk, not line-by-line correctness.公关稿提交后，会经过三轮 Claude 审核。人工审核员会检查战略风险，而不是逐行检查正确性。
4. CI validates: typecheck, lint, unit tests, integration tests, end-to-end tests.CI 验证：类型检查、代码检查、单元测试、集成测试、端到端测试。
5. Graphite's merge queue rebases, re-runs CI, merges if green.Graphite 的合并队列会重新定基，重新运行 CI，如果通过则合并。
6. Six-phase deploy pipeline promotes through dev and prod with testing at each stage.六阶段部署流程，从开发环境到生产环境，每个阶段都进行测试。
7. Feature gate turns on for the team. Gradual percentage rollout. Metrics monitored.团队功能门已开启。逐步按百分比推出。指标受到监控。
8. Kill switch available if anything degrades. Circuit-breaker auto-rollback for severe issues.如果任何部件性能下降，可使用紧急停止开关。严重问题时，断路器会自动回滚。

**Bug Fix Path错误修复路径**

1. CloudWatch and Sentry detect errors.CloudWatch 和 Sentry 可以检测错误。
2. Claude triage engine scores severity, creates a Linear issue with full investigation context.Claude 分诊引擎对严重程度进行评分，并创建一个包含完整调查背景的线性问题。
3. An engineer investigates. AI has already done the diagnosis. The engineer validates and pushes a fix.一位工程师展开调查。人工智能已经完成了诊断。工程师验证后提交了修复方案。
4. Same review, CI, deploy, and monitoring pipeline.相同的审查、持续集成、部署和监控流程。
5. Triage engine re-verifies. If resolved, ticket auto-closes.分诊引擎会再次核实。如果问题已解决，工单将自动关闭。

Both paths use the same pipeline. One system. One standard.两条路径使用同一条管道。同一个系统，同一个标准。

## The Results结果

![Image](https://pbs.twimg.com/media/HFwUohKbcAAi0cm?format=png&name=large)

Over 14 days, we averaged three to eight production deployments per day. Under our old model, that entire two-week period would have produced not even a single release to production.在14天的时间里，我们平均每天进行三到八次生产环境部署。而按照我们之前的模式，两周的时间里甚至连一次生产环境发布都做不到。

Bad features get pulled the same day they ship. New features go live the same day they're conceived. A/B tests validate impact in real time.糟糕的功能会在发布当天就被移除。新功能会在构思之初就上线。A/B 测试可以实时验证其影响。

People assume we're trading quality for speed. User engagement went up. Payment conversion went up. We produce better results than before, because the feedback loops are tighter. You learn more when you ship daily than when you ship monthly.人们以为我们为了速度牺牲了质量。但用户参与度提高了，支付转化率也提高了。我们取得了比以往更好的成果，因为反馈循环更加顺畅。每天发布比每月发布更能让我们学到东西。

## The New Engineering Org新工程组织

Two types of engineers will exist.将会存在两种类型的工程师。

**The Architect建筑师**

One or two people. They design the standard operating procedures that teach AI how to work. They build the testing infrastructure, the integration systems, the triage systems. They decide architecture and system boundaries. They define what "good" looks like for the agents.一两个人。他们设计标准操作流程，教导人工智能如何工作。他们构建测试基础设施、集成系统和故障排查系统。他们决定架构和系统边界。他们定义智能体的“良好”表现标准。

This role requires deep critical thinking. You criticize AI. You don't follow it. When the agent proposes a plan, the architect finds the holes. What failure modes did it miss? What security boundaries did it cross? What technical debt is it accumulating?这个角色需要深度批判性思维。你要批判人工智能，而不是盲目跟从。当智能体提出方案时，架构师要找出其中的漏洞。它遗漏了哪些故障模式？它越过了哪些安全边界？它正在积累哪些技术债务？

I have a PhD in physics. The most useful thing my PhD taught me was how to question assumptions, stress-test arguments, and look for what's missing. The ability to criticise AI will be more valuable than the ability to produce code.我拥有物理学博士学位。攻读博士学位期间，我学到的最有用的技能是如何质疑假设、检验论证的可靠性以及找出其中的不足之处。批判人工智能的能力比编写代码的能力更有价值。

This is also the hardest role to fill.这也是最难找到合适人选的职位。

**The Operator操作员**

Everyone else. The work matters. The structure is different.其他人。工作本身很重要。结构不同。

AI assigns tasks to humans. The triage system finds a bug, creates a ticket, surfaces the diagnosis, and assigns it to the right person. The person investigates, validates, and approves the fix. AI makes the PR. The human reviews whether there's risk.人工智能将任务分配给人类。分诊系统发现漏洞，创建工单，显示诊断结果，并将其分配给合适的人员。该人员进行调查、验证并批准修复方案。人工智能创建 PR（问题提交）。人类审核是否存在风险。

The tasks are bug investigation, UI refinement, CSS improvements, PR review, verification. They require skill and attention. They don't require the architectural reasoning the old model demanded.这些任务包括漏洞调查、用户界面优化、CSS 改进、PR 审核和验证。它们需要技巧和细致的观察力，但不需要像旧模型那样进行架构推理。

**Who Adapts Fastest谁适应速度最快**

I noticed a pattern I didn't expect. Junior engineers adapted faster than senior engineers.我注意到一个意想不到的现象：初级工程师的适应速度比高级工程师更快。

Junior engineers with less traditional practice felt empowered. They had access to tools that amplified their impact. They didn't carry a decade of habits to unlearn.经验较少的初级工程师感到更有自主权。他们可以使用各种工具来扩大自身影响力。他们无需摒弃十年来养成的习惯。

Senior engineers with strong traditional practice had the hardest time. Two months of their work could be completed in one hour by AI. That is a hard thing to accept after years of building a rare skill set.那些拥有深厚传统经验的资深工程师们遭遇了最大的打击。他们两个月的工作量，人工智能一个小时就能完成。对于苦练多年、积累了稀缺技能的他们来说，这无疑是难以接受的现实。

I'm not making a judgment. I'm describing what I observed. In this transition, adaptability matters more than accumulated skill.我并非在妄下断言，只是在描述我的观察。在这个转型时期，适应能力比积累的技能更为重要。

## The Human Side人性的一面

**Management Collapsed管理层崩溃**

Two months ago, I spent 60% of my time managing people. Aligning priorities. Running meetings. Giving feedback. Coaching engineers.两个月前，我60%的时间都花在了管理人员上。包括协调工作优先级、主持会议、提供反馈以及指导工程师。

Today: below 10%.今天：低于 10%。

The traditional CTO model says to empower your team to do architecture work, train them, delegate. But if the system only needs one or two architects, I need to do it myself first. I went from managing to building. I code from 9 AM to 3 AM most days. I design the SOPs and architecture of the system. I maintain the harness.传统的 CTO 模式是授权团队进行架构设计工作，对他们进行培训，并分配任务。但如果系统只需要一两个架构师，我就得先亲自上阵。我从管理者转型为架构师。我每天从早上 9 点一直写到凌晨 3 点。我负责设计系统的标准操作流程（SOP）和架构，并维护系统框架。

More stressful. But I'm enjoying building, not aligning.压力更大。但我喜欢的是建设，而不是协调。

**Less Arguing, Better Relationships少争吵，关系更好**

My relationships with co-founders and engineers are better than before.我和联合创始人以及工程师的关系比以前更好了。

Before the transition, most of my interaction with the team was alignment meetings. Discussing trade-offs. Debating priorities. Disagreeing about technical decisions. Those conversations are necessary in a traditional model. They're also draining.转型之前，我与团队的大部分互动都集中在协调会议上。讨论权衡取舍，辩论优先级，以及在技术决策上产生分歧。这些对话在传统模式下必不可少，但也令人精疲力竭。

Now I still talk to my team. We talk about other things. Non-work topics. Casual conversations. Offsite trips. We get along better because we stopped arguing about work that can be easily done by our system.现在我仍然和我的团队保持联系。我们聊些其他事情，比如工作以外的话题、轻松的闲聊，还有外出旅行。我们相处得更好了，因为我们不再为那些系统可以轻松完成的工作争论不休。

**Uncertainty Is Real不确定性是真实存在的。**

I won't pretend everyone is happy.我不会假装每个人都很开心。

When I stopped talking to people every day, some team members felt uncertain. What does the CTO not talking to me mean? What is my value in this new world? Reasonable concerns.当我不再每天与团队成员交流时，一些成员感到不安。首席技术官不跟我说话意味着什么？在这个新局面下，我的价值何在？这些担忧不无道理。

Some people spend more time debating whether AI can do their work than doing the work. The transition period creates anxiety. I don't have a clean answer for it.有些人花在争论人工智能能否胜任他们的工作上的时间，比实际工作的时间还多。这种过渡期会引发焦虑。我对此没有简单的解决办法。

I do have a principle: we don't fire an engineer because they introduced a production bug. We improve the review process. We strengthen testing. We add guardrails. The same applies to AI. If AI makes a mistake, we build better validation, clearer constraints, stronger observability.我的原则是：我们不会因为工程师引入了生产环境的漏洞就解雇他们。我们会改进代码审查流程，加强测试，并增加安全防护措施。这同样适用于人工智能。如果人工智能犯了错误，我们会构建更完善的验证机制、更清晰的约束条件和更强的可观测性。

## Beyond Engineering超越工程

I see other companies adopt AI-first engineering and leave everything else manual.我看到其他公司采用人工智能优先的工程设计，而其他所有工作都保持人工操作。

If engineering ships features in hours but marketing takes a week to announce them, marketing is the bottleneck. If the product team still runs a monthly planning cycle, planning is the bottleneck.如果工程部门几个小时就能完成功能开发，但市场部门却要花一周时间才能发布，那么市场部门就是瓶颈。如果产品团队仍然沿用每月一次的计划周期，那么计划部门就是瓶颈。

At CREAO, we pushed AI-native operations into every function:在 CREAO，我们将 AI 原生操作融入到每个功能中：

- Product release notes: AI-generated from changelogs and feature descriptions.产品发布说明：由人工智能根据变更日志和功能描述生成。
- Feature intro videos: AI-generated motion graphics.特色介绍视频：人工智能生成的动态图形。
- Daily posts on socials: AI-orchestrated and auto-published.社交媒体每日发帖：由人工智能策划并自动发布。
- Health reports and analytics summaries: AI-generated from CloudWatch and production databases.健康报告和分析摘要：由人工智能从 CloudWatch 和生产数据库生成。

Engineering, product, marketing, and growth run in one AI-native workflow. If one function operates at agent speed and another at human speed, the human-speed function constrains everything.工程、产品、市场营销和增长都在一个原生人工智能工作流程中运行。如果一个功能以智能体的速度运行，而另一个功能以人类的速度运行，那么以人类速度运行的功能将限制所有其他功能。

## What This Means这意味着什么

**For Engineers致工程师**

Your value is moving from code output to decision quality. The ability to write code fast is worth less every month. The ability to evaluate, criticize, and direct AI is worth more.你的价值正从代码输出转向决策质量。快速编写代码的能力价值逐月下降，而评估、批判和指导人工智能的能力则价值更高。

Product sense or taste matters. Can you look at a generated UI and know it's wrong before the user tells you? Can you look at an architecture proposal and see the failure mode the agent missed?对产品的感知或品味很重要。你能否在用户反馈之前，通过查看生成的用户界面就发现问题？你能否通过查看架构方案，发现代理程序遗漏的故障模式？

I tell our 19-year-old interns: train critical thinking. Learn to evaluate arguments, find gaps, question assumptions. Learn what good design looks like. Those skills compound.我告诉我们19岁的实习生：培养批判性思维。学会评估论点，找出漏洞，质疑假设。学习好的设计是什么样的。这些技能会不断积累。

**For CTOs and Founders致首席技术官和创始人**

If your PM process takes longer than your build time, start there.如果你的项目管理流程耗时比产品开发时间长，那就从产品管理流程入手。

Build the testing harness before you scale agents. Fast AI without fast validation is fast-moving technical debt.在扩展代理规模之前，务必构建测试框架。缺乏快速验证的快速人工智能，只会加速技术债务的产生。

Start with one architect. One person who builds the system and proves it works. Onboard others into operator roles after the system runs.先从一名架构师开始。由他/她构建系统并验证其有效性。系统运行后，再逐步引入其他人担任运维角色。

Push AI-native into every function.将原生人工智能融入到每个功能中。

Expect resistance. Some people will push back.预料到会遇到阻力。有些人会反对。

**For the Industry对于行业而言**

OpenAI, Anthropic, and multiple independent teams converged on the same principles: structured context, specialized agents, persistent memory, and execution loops. Harness engineering is becoming a standard.OpenAI、Anthropic 和多个独立团队都遵循相同的原则：结构化上下文、专用代理、持久内存和执行循环。资源管理正在成为一种标准。

Model capability is the clock driving this. I attribute the entire shift at CREAO to the last two months. Opus 4.5 couldn't do what Opus 4.6 does. Next-gen models will accelerate it further.模型性能是推动这一切的关键因素。我认为 CREAO 的整个转变都发生在过去两个月。Opus 4.5 无法做到 Opus 4.6 所能做到的。下一代模型将进一步加速这一进程。

I believe one-person companies will become common. If one architect with agents can do the work of 100 people, many companies won't need a second employee.我认为一人公司会变得很普遍。如果一个建筑师和他的代理人就能完成一百个人的工作，那么很多公司就不需要第二个员工了。

## We're Early我们来早了。

Most founders and engineers I talk to still operate the traditional way. Some think about making the shift. Very few have done it.我接触的大多数创始人和工程师仍然沿用传统的工作方式。有些人考虑过转型，但真正付诸行动的却寥寥无几。

A reporter friend told me she'd talked to about five people on this topic. She said we were further along than anyone: "I don't think anyone's just totally rebuilt their entire workflow the way you have."一位记者朋友告诉我，她就这个话题和大约五个人聊过。她说我们比任何人都走得更远：“我认为没有人像你们这样彻底重建了整个工作流程。”

The tools exist for any team to do this. Nothing in our stack is proprietary.任何团队都可以使用现有的工具来完成这项工作。我们的技术栈中没有任何专有技术。

The competitive advantage is the decision to redesign everything around these tools, and the willingness to absorb the cost. The cost is real: uncertainty among employees, the CTO working 18-hour days, senior engineers questioning their value, a two-week period where the old system is gone and the new one isn't proven.竞争优势在于决定围绕这些工具重新设计一切，并愿意承担相应的成本。成本是实实在在的：员工的不安、首席技术官每天工作18个小时、资深工程师质疑自身价值，以及旧系统被移除而新系统尚未经过验证的两周时间。

We absorbed that cost. Two months later, the numbers speak.我们承担了这笔费用。两个月后，数据说明了一切。

We build an agent platform. We built it with agents.我们打造了一个经纪人平台。我们和经纪人一起打造了这个平台。