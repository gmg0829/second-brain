# How Anthropic uses Claude in Cybersecurity
## Anthropic 如何在网络安全中使用 Claude

> **视频来源**: YouTube (https://www.youtube.com/watch?v=FPPTnI88RR8)
> **发布频道**: Claude
> **主要内容**: Jackie Bow（Anthropic 检测平台工程团队技术负责人）分享如何使用 Claude Code 构建 CLUE 威胁检测平台，实现自动化警报分类和高效安全事件调查。

---

## 概述

Anthropic 的网络安全团队构建了一套前所未有的安全防护体系。作为检测平台工程团队的技术负责人，Jackie Bow 主导开发了 CLUE——一个利用 Claude Code 实现的威胁检测与响应平台，该平台能够自动化处理警报分类，大幅缩短安全事件调查时间。

---

## 核心内容

### 1. 网络安全在 Anthropic 的独特地位

Jackie 认为网络安全是公司最有意思的领域之一。由于 Anthropic 的业务本质上是全新的前沿领域，相应的安全防护也没有先例可循——**" securing it is also kind of a new frontier"**（守护它也是一个全新的前沿）。

### 2. 传统安全工作的痛点

在实际安全事件调查中，以往安全分析员（具备实战经验的一线人员）面临巨大挑战：

- **工具碎片化**: 调查一个安全事件需要在 **5 到 6 个不同工具** 之间跳转
- **查询语言多样**: 需要掌握并使用 **3 到 4 种不同的查询语言** 来查询不同数据库
- **时间成本高昂**: 简单的调查也至少需要 **几个小时**，复杂的调查甚至需要 **几天**

这正是 CLUE 平台诞生的原因。

### 3. CLUE 平台的核心能力

CLUE 是一个检测与响应平台，其强大之处在于：

| 能力 | 说明 |
|------|------|
| **内部系统集成** | 通过 tool use 连接数据仓库查询 |
| **公司内部知识获取** | 可访问 Slack 消息和代码库等内部知识 |
| **上下文告警 | 将警报置于实际环境中进行上下文分析 |

Jackie 特别强调：**"That is usually like that missing piece that really helps alerts be contextualized for your environment"**（这通常是帮助警报在实际环境中获得上下文的关键缺失部分）。

### 4. 实际工作流程演示

Jackie 演示了一个真实场景：**"一个开发者刚刚给自己赋予了管理员权限，这是否经过授权？检查是否有凭证泄露，以及之后他们采取了什么行动？"**

Claude 在 CLUE 中的处理流程：

1. **分析问题，制定计划** — Claude 会提出一个包含 6 个步骤的调查计划
2. **执行查询，收集信息** — 通过各种工具向系统发起查询请求
3. **分析数据，形成判断** — 例如识别出这是"经典的权限提升"攻击模式
4. **深入挖掘，关联威胁情报** — 查询 VirusTotal 等来源，发现源 IP 来自俄罗斯数据中心且被标记为恶意
5. **得出结论，提供后续建议** — 虽然事件已被隔离，但系统会指出安全态势中的缺口，并提出具体改进建议

### 5. Claude 对团队效率的惊人提升

Jackie 分享了一个具体案例：

> 原计划：开发一个 suppression engine（抑制引擎），预计需要 **1 到 2 个月**
> 实际：一位新入职的员工 **仅用一周就完成了**

关键原因在于 **Claude Code 能够清楚地解释系统架构和运作方式**，让新人能够快速上手。

Jackie 评价道：**"I'm giving them a tool that will give them that autonomy rather than them having to, you know, kind of like swim in the deep end immediately"**（我给他们的是一个能够赋予他们自主性的工具，而不是让他们一开始就必须在深水区游泳）。

### 6. 从业者到研究者的转变

Jackie 对自己工作意义的描述充满了热情：

> "I'm building the tools that I wish that I had"
> （我正在构建那些我曾经希望拥有的工具）

通过 Claude，她终于能够：

- **测试曾经只能想象的 数据处理方式**
- **获得以前根本无法企及的 系统可见性**
- **从实际操作者转变为 研究者和科学家**

---

## 技术亮点总结

| 方面 | 传统方式 | CLUE + Claude |
|------|---------|---------------|
| 工具切换 | 5-6 个工具 | 统一平台 |
| 查询语言 | 3-4 种 | 自然语言 |
| 简单调查时间 | 数小时 | 即时响应 |
| 复杂调查时间 | 数天 | 大幅缩短 |
| 新人上手 | 长时间摸索 | AI 辅助快速上手 |
| 警报处理 | 人工逐一排查 | 自动筛选关键告警 |

---

## 核心价值

CLUE 的核心价值在于：

> **"This ability to go through immense amounts of data, immense amounts of alerts and then just raise what actually a human should look at"**
>
> （这种能够处理海量数据、海量警报，然后仅将真正需要人类关注的内容提出来的能力）

Claude 真正做到了——将人从信息过载中解放出来，专注于真正需要人类判断的安全事件。