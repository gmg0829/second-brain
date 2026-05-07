---
title: "Anthropic's Boris Cherny: Why Coding Is Solved, and What Comes Next"
source: https://www.youtube.com/watch?v=SlGRN8jh2RI
channel: Sequoia Capital
date: AI Ascent 2026
duration: 24分36秒
cover: images/cover.jpg
description: "Boris Cherny, creator of Claude Code at Anthropic, joins Sequoia partner Lauren Reeder at AI Ascent 2026 to talk about where coding goes from here. He explains why he hasn't written a line of code in 2026, why he now ships dozens of PRs a day from his phone, and why he believes coding is effectively solved."
---

# Anthropic's Boris Cherny: Why Coding Is Solved, and What Comes Next

**来源**：Sequoia Capital AI Ascent 2026
**嘉宾**：Boris Cherny（Anthropic Claude Code 创始人）
**主持**：Lauren Reeder（Sequoia 团队）
**视频长度**：24分36秒，10个章节

---

## 一、核心观点速览

| 观点 | 内容 |
|------|------|
| **代码问题已解决** | 对 Boris 本人，100% 代码由 AI 写出，他每天从手机发几十个 PR，最高一天 150 个 |
| **Claude Code 起源** | 2024 年底在 Anthropic Labs 孵化，最初 6 个月几乎不可用，5 月 Opus 4 发布后指数增长 |
| **Loops 是未来** | `/loop` 命令让 AI 用 cron 调度任务，后台持续运行，自动修复 CI、监控反馈 |
| **印刷术类比** | 软件民主化就像印刷术让读写民主化——未来人人都会编程，就像今天人人都会发短信 |
| **SaaS 不是末日** | AI 改变的是工作流程和流程权力，但网络效应、规模经济、拐角资源等模式仍然重要 |
| **创业黄金期** | 小团队可以用 AI 从头构建，大公司要克服内部阻力。10 倍 startups 将到来 |

---

## 二、逐章详解

### 2.1 Introduction

Boris 是 Claude Code 的创造者，被称为"之父"。他曾是工程师中的工程师，写过 TypeScript 教科书。但有趣的反转：**2026 年他没写过一行代码**。

Lauren 调侃他："我团队亲切地说我有 Claude Code 精神病。"（现场很多人举手示意有同样症状。）

### 2.2 Claude Code Crowd Check

现场调查：
- CLI 用户：大多数
- Desktop 用户：不少
- VS Code / JetBrains：出乎意料地少
- **手机用户：Boris 本人**（全场笑）

### 2.3 Origin Story of Claude Code

Claude Code 诞生纯属**意外**。

2024 年底，Boris 加入 Anthropic Labs（内部孵化器）。团队做了 Claude Code、MCP 和桌面应用，使命完成后解散。后来 **Mike Krieger（Instagram 联合创始人、Anthropic CPO）带队重启**。

核心洞察：**产品溢出（product overhang）**——模型能力已超过任何现有产品能承载的上限。

### 2.4 From Typeahead to Agents

2024 年底的 SOTA 是**打字补全**（按 Tab 完成一行）。Sonnet 3.5 让这成为可能，但 Boris 觉得可以走得更远。

他花了 6 个月构建，**最初完全不可用**——只完成了约 10% 的代码。即使正式发布后，也**不是爆款**，没有指数增长。

转折点：**2025 年 5 月 Opus 4 发布**。从那一刻起指数增长，每次模型更新（4.5、4.6、4.7）都再次拉高。

> "我们一直在为下一个模型构建产品。6 个月没有 PMF，但这是计划的一部分。"

### 2.5 Is Coding Solved

现场调查：
- 谁 100% 手写代码？**几乎没人举手**
- 谁 100% 用 agent 写？**不少人举手**
- 谁两者之间？**笑**

**Boris 宣言：对我个人来说，编程已解决。**

Claude Code 代码库本身（TypeScript + React）100% 由模型编写。去年 10-11 月达到这个里程碑。现在他每天发几十个 PR，**有天达到 150 个 PR**。

但他承认：
- 大型复杂代码库仍有挑战
- 小众语言模型还不擅长
- 答案是：**等下一个模型**

### 2.6 Boris Personal Workflow

他 6 个月前分享了个人 setup，原以为平平无奇，结果上了热搜。

**现在他大部分工作从手机完成：**
- 打开 Claude App，侧边有代码 tab
- 同时保持 5-10 个 session
- 每个 session 有多个 agent
- 估计现场同时跑**几百个 agent**
- 每晚几千个在深度工作

**Loop 是他最爱的功能（/loop）：**
- 用 cron 调度重复任务
- 每分钟/每 5 分钟/每天运行
- 他同时跑几十个 loop：
  - babysitting PRs、自动 rebase
  - 修复 CI 健康度
  - 监控 flaky tests
  - 每 30 分钟抓 Twitter 反馈聚类

> "loop 就是未来。没试过的强烈推荐。"
> "我们刚发布 routines，是 server 版的 loop——关掉笔记本它还在跑。"

### 2.7 Future Teams and Generalists

**多面手才是未来：**

今天的多面手：iOS + web + server 都写（垂直多面手）

未来的多面手：**跨学科**
- 工程师 + 产品 + 设计
- 工程师 + 产品 + 数据科学

**Anthropic Claude Code 团队的真实情况：**
- 每个人——工程经理、产品经理、设计师、数据科学家、财务、用户研究员——**都写代码**
- 每个人都是某个领域的专家，同时都会编程

### 2.8 SaaS Apocalypse Predictions

**这不是 SaaS 末日，而是商业模式重组。**

Boris 用**Hamilton 的七种商业模式**框架分析：

**被削弱的模式：**
- 转换成本（switching costs）——AI 可以轻松迁移
- 流程权力（process power）——AI 越来越擅长爬流程，4.7 已经可以自己迭代直到达成目标

**仍然重要的模式：**
- 网络效应
- 规模经济
- 拐角资源

**真正的变化：**
- 未来 10 年，startups 数量将**增加 10 倍**
- 小团队可以构建与大公司同等价值的产品
- 大公司必须克服内部阻力、用 AI 重新训练所有流程
- **新人没有历史包袱，从零用 AI 原生构建**

> "这是创业的最好时机。"
> "这是做 startup 的最好时机。有如此多的颠覆即将到来。"

### 2.9 Audience Q&A Deep Dive（精华问答）

**Q: Claude Code 成功中模型 vs 产品决策的比例？**

A: 早期约 **50/50**。YC 教会他——不管技术多好，最终要**构建人们喜欢的产品**。细节决定体验。

预测：1-2 年后，模型对齐度大幅提升，安全机制（prompt injection 防护、权限模式、human-in-the-loop）会变得不那么重要。

---

**Q: 软件构建会变成像 Microsoft Office 一样的技能吗？**

A: 是的，但会**更极端**——像发短信一样。

**印刷术类比（全场最精彩段落）：**

15 世纪欧洲，90% 人口是文盲。识字的人往往受雇于国王和领主。第一台印刷机出现后：
- 50 年内出版的文献**超过之前千年之和**
- 书价下降 **100 倍**
- 但花了几百年才让 70% 全球人口识字

软件民主化会快得多，不会花 50 年。

**最佳写会计软件的人选：不是工程师，而是最优秀的会计**——因为懂领域才是难点，编程很简单。

---

**Q: Anthropic 内部 vs 外部的差距有多大？**

A: **模型没有差距**——内部用的和外部一样（Mithos + Opus 4.7）。

真正的差距是**组织和流程**：
- Anthropic 用 Claude 处理一切
- 各 Claude 之间通过 Slack 互相沟通
- 没有手动写代码的地方
- 所有 SQL 都是模型写的

创业公司的优势：**没有历史包袱，从一开始就用 AI 原生构建**

---

**Q: 多 agent 并行化——用户需要自己判断何时并行吗？**

A: **不，这是产品设计问题**，不是用户的问题。

4.7 已经可以主动开始 loop：
- "去拉这个数据查询"
- "我注意到数据在变化，我会启动一个 loop，每 30 分钟给你发一份报告"
- "能不能发到 Slack？"
- AI 自己调用 Slack MCP 完成

> "随着模型越来越强，它自然学会并行。不该是用户来想这些。"

---

**Q: 本地模型 vs 云端？未来 3-5 年怎么走？**

A: **其实不重要**。几年后，模型会自己决定用本地还是云端——**用户不需要做这个决定**。

---

**Q: Codex 等工具如何做到给普通用户和开发者一样强的体验？（Cowork 问题）**

A: **MCP 就是答案**。
- Salesforce、Google Docs、Google Calendar 都可以通过 MCP 连接
- 不支持 MCP 的系统：computer use 是兜底方案——通过 Co-work 可以操作电脑上任何软件

### 2.10 Closing and What's Next

**如果现在要构建产品，瞄向什么？**

- **Claude Design**：今天已经很棒，未来会更好
- **Loop / Batch**：大规模并行 agent 会变得更好
- **Computer Use**：另一个大方向

> "Claude Code 未来可能只需要 100 行代码。"
> "我们正在开发一些会在未来几周发布的东西。"

---

## 三、金句摘录

| # | 金句 |
|---|------|
| 1 | "We were building for the next model. And that was the idea pretty much the whole time." |
| 2 | "For me, it's 100%. The model writes 100% of my code." |
| 3 | "I did 150 PRs in a day. I was just trying to see how far I can get it." |
| 4 | "Loops are the future. If you haven't experimented with it, highly recommend it." |
| 5 | "The best person to write accounting software is not an engineer — it's a really good accountant." |
| 6 | "This is the printing press in Europe. Software will be fully democratized. Much faster than 50 years." |
| 7 | "The model is just going to be doing all the code. Starting the agents. Building the environments. We won't be making these decisions as engineers anymore." |
| 8 | "I think it's the best time to build. There's so much disruption coming." |
| 9 | "It doesn't matter what the product is. You still have to build a thing that people love." |

---

## 四、关键数据点

| 指标 | 数值 |
|------|------|
| 每日 PR 数量（普通） | 几十个 |
| 每日 PR 数量（最高纪录） | 150 个 |
| 同时 running agents | 几百个 |
| 每晚深度工作 agents | 几千个 |
| 运行中的 loop 数量 | 几十个 |
| 视频时长 | 24 分 36 秒 |
| 章节数 | 10 |

---

## 五、Claude Code 产品时间线

```
2024 年底  → Anthropic Labs 孵化 Claude Code
           → 最初 6 个月几乎不可用，10% 替代率

2025 年 5 月  → Opus 4 发布，指数增长开始
           → 然后 4.5、4.6、4.7 每次都拉高增长

2025 年 10-11 月  → Claude Code 代码库 100% AI 编写（Boris 个人）
           → Boris 完全停止手写代码

2026 年    → 手机成为主要编程设备
           → Loop / Routines 发布
           → 多 agent 并行成为日常
```

---

## 六、主题分类标签

`Anthropic` `Claude Code` `Boris Cherny` `Coding Solved` `Agentic AI` `Loops` `Multi-Agent` `Printing Press` `SaaS Apocalypse` `Startup` `Sequoia Capital` `AI Ascent 2026` `Generalists` `MCP` `Computer Use` `Product Design` `AI Democratization`
