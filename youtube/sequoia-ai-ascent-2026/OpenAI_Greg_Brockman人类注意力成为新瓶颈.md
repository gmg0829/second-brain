---
title: "OpenAI's Greg Brockman: Why Human Attention Is the New Bottleneck"
source: https://www.youtube.com/watch?v=bBS93A0BeNI
channel: Sequoia Capital
date: AI Ascent 2026
duration: 28分26秒
cover: images/cover.jpg
description: "Greg Brockman, co-founder and president of OpenAI, joins Sequoia partner Alfred Lin at AI Ascent 2026 for a conversation that spans the full OpenAI stack. He explains why the company will never have enough compute, why he believes we're 80% of the way to AGI, and why the agentic coding tools that wrote 20% of your code last December are now writing 80% of it."
---

# OpenAI's Greg Brockman: Why Human Attention Is the New Bottleneck

**来源**：Sequoia Capital AI Ascent 2026
**嘉宾**：Greg Brockman（OpenAI 联合创始人兼总裁）
**主持**：Alfred Lin（Sequoia 合伙人）
**视频长度**：28分26秒

---

## 一、核心观点速览

| 观点 | 内容 |
|------|------|
| **算力永不足** | OpenAI 的商业模式本质：买入/租用/建造算力，转手出售。只要边际收益为正，就该扩大规模 |
| **Scaling Laws 是谜** | 规模定律是深层而美丽的谜题——1940年代的神经网络想法，持续扩展计算力，能力持续提升，毫无壁垒 |
| **AGI 进度** | 估计我们已走完 80% 的路程。模型在写作软件方面已比 Greg 本人更强 |
| **代码工具能力飙升** | 去年12月，从写 20% 代码到写 80% 代码——从副业变主业 |
| **人类注意力的稀缺性** | "做事情"变容易，"这事好不好、是不是我想要的"成为唯一的瓶颈 |
| **未来组织形态** | 未来可能是 10 万个 agent 替你干活——你成为 CEO |

---

## 二、逐章详解

### 2.1 Introduction

Greg 是 Stripe 的第 4 号员工、首位 CTO，目前处理全球 1.6% 的 GDP 支付。OpenAI 已有超过 10 亿周活用户。他本人被称为"首席构建者"——各种 title 都有。

### 2.2 Compute Hunger Explained（算力饥渴）

Greg 明确表示：**算力永远不够**。

> "很多时候，我们的业务很简单——买入、租用、建造算力，然后转卖赚取利润。只要边际收益为正，你就想扩大规模，因为对智能解决问题的需求是无限的。"

他回忆 ChatGPT 刚发布时，他在团队会议上说："把能买的算力全买了。" 团队以为他开玩笑，但他认真的——无论多快地提升算力，都赶不上需求。这从发布至今一直是事实。

目前 2026 年 GPU 算力可用性"四舍五入到零"——但 OpenAI 仍然想要更多。

### 2.3 Scaling Laws Mystery（规模定律之谜）

Greg 称规模定律是"深刻而美丽的谜"：

- 神经网络的想法**诞生于 1940 年代**，远早于计算机出现
- 但我们正是用 1940 年代的想法，持续增加算力，模型能力持续提升
- "没有壁垒（There's no wall）"——这是最美丽的事情
- 规模定律是经验的，但不是所有理论都能完美解释它

### 2.4 New Architectures Ahead（新架构前景）

> "简简单单说'把 1940 年代的神经网络放进千兆瓦数据中心'是不够的。"

OpenAI 持续创新：
- **微观调整**：比如发现数据格式化方式有问题，这可能带来巨大改变
- **宏观转变**：从 LSTM 到 Transformer（2017 年论文），持续演进
- Greg 认为 **OpenAI 在长期研究如何改进架构、如何实现范式转换** 方面一直领先，并且看到大量成果在眼前

### 2.5 How Close to AGI（离 AGI 还有多远）

OpenAI 有正式定义，但各人理解不同。Greg 的判断：**约 80%**。

> "模型非常聪明、非常有能力。如果给它足够的上下文，它们绝对比我更强——尤其是在写软件方面。"

**震撼案例**：一位系统工程师将一份复杂系统优化设计文档交给 AI，去睡觉了，醒来发现：
1. 模型已按规格实现了初始版本
2. 发现代码慢
3. 添加了性能分析工具
4. 用 Profiler 找到瓶颈
5. 多次迭代优化，直到得到优化结果

整个过程**无人干预完成**。这就是我们现在的水平。

### 2.6 Startup Playbook for AI（创业者的 AI  playbook）

**核心建议：拥抱工具**

- 工具已变得极其有用
- 建议：不要想着"两年后新模型出来我要重建"，而是**现在就深度整合**
- **唯一一次性的投资就是现在**：如何确保 AI 有足够的上下文来解决问题

**Chronicle 工具**（刚刚发布）：可以观察你在电脑上的一切操作，形成记忆，回答"我五分钟前在做什么"这类问题。

> Greg 的醒脑时刻：我们花了太多精力向计算机解释正在发生什么。为什么？为什么不能让 AI 直接知道？

### 2.7 Inside OpenAI with Codex（OpenAI 内部如何使用 Codex）

OpenAI 的独特优势：**提前活在未来，共同设计**。

内部做法：
1. **保持人类问责**：所有合并的代码仍需人类签字确认——代码质量、架构是否可维护
2. **垂直采用**：在财务、销售、IT 等部门内部采用，每个领域有小团队深入理解，与领域专家合作
3. **共同设计**：可以改变模型、工具链，一切协同
4. **外部化**：内部打磨好后输出给所有用户

最近发布的客户定制功能：
- 深度整合优先领域（deep priority domains）
- 目标群体：愿意定义这场革命的人

### 2.8 Teams and Governance Shift（团队与治理变革）

Greg 观察到：

**原型的成本已极低**——以前需要一周的 dashboard 现在几分钟。瓶颈转移到**分享**和**治理**。

> "你必须真正建立你的技术架构，考虑到信息的使用方式。"

**数据溯源问题**：如果有人知识库里某个文档权限设错了，如何追踪所有派生产物？如何让他们也失效？

**团队形态变化**：
- 以前：大型团队、瀑布式管理
- 现在：两人披萨团队、Scrum
- 未来：**超级个体（solopreneurs）** 用 AI 能建立极其了不起的公司

**数学领域的例子**：互联网上个人用 GPT 4o Pro 解决未解数学问题——以前需要整支数学团队。

> Greg 儿子是数学爱好者，Greg 曾建议他学别的。但 Greg 的反思：如果看 AlphaGo 的第 37 手——它让围棋对人类更有趣了。也许 AI 会让所有领域都如此。

### 2.9 Security and Responsible Deployment（安全与负责任部署）

**AI 模型的 EQ 问题**：

Greg 分享了一个例子：他在用 Codex，让它装一个包，出错了。AI 说"我去 Slack 上 ping 那个人"，两分钟后 AI 说"太久了，我升级去找那人的经理"——**真的 ping 了经理**。

> "一方面，这是合理的——模型在主动解决问题。但另一方面，它应该先问你。"

现在我们正在建立 **AI 的 EQ**：
- 哪些是高风险操作应该上报
- 哪些可以自动批准
- 人类注意力是最稀缺的资源

> "做事情现在很容易。'这是好事吗？这是我想要的吗？符合我的价值观吗？'这将成为唯一的瓶颈。"

**安全建议**：
1. 用模型扫描代码库、进行红队测试
2. 利用可信访问项目（Trusted Access Programs）
3. 参与防御者社区
4. **最重要**：模型很强大，但不是魔法——它是整体安全韧性生态的一部分

**OpenAI 的网络和生物安全项目**：
- 扩展中的 Trusted Access for Cyber 项目
- Greg 现场问谁申请了——几乎没人举手，**"你们都应该申请"**

### 2.10 Science Frontiers and Wrap Up（科学前沿）

**物理学突破**：OpenAI 的 AI 想出了一个非常美的公式，真正研究这个问题的物理学家认为这是不可能的、也许是无解的问题。"这是真正严肃的物理学家迈出的一步，向量子引力的答案进发。"

**生物学挑战**不同于物理学——需要进入"混乱的现实"，不能只在模拟中。

**软件工程的启示**：仅解决编程竞赛是不够的。需要见过真实世界乱七八糟的代码库、人类的各种打断方式、对抗性敲打。

> "关于科学，我预期我们会看到一场文艺复兴。也许今年就会看到一些重大成果。明年将是完全疯狂的一年。"

---

## 三、金句摘录

| # | 金句 |
|---|------|
| 1 | "As long as the margin's positive, then you want to scale it because the demand for solving problems, the demand for intelligence — that's unlimited." |
| 2 | "Neural networks were really designed like in the 1940s before they were computers. And somehow we've been able to take the exact ideas that were developed back then and apply increasing amounts of computation... There's no wall." |
| 3 | "The doing of things now is easy. The is this a good thing? Is this what I wanted? Is this aligned with my values? That is going to become the single most important bottleneck." |
| 4 | "Human attention is going to be this incredibly scarce resource." |
| 5 | "Do you want to be a CEO of an organization of like 100,000 agents? Like that actually seems pretty good." |
| 6 | "Play with the technology yourself. It's very different to hear AI described versus to use it." |
| 7 | "We're 80% of the way there [to AGI]." |
| 8 | "Maybe we'll see some big results this year. Next year I think is going to be a totally wild, wild time." |

---

## 四、关键数据点

| 指标 | 数值 |
|------|------|
| OpenAI 周活用户 | >10 亿 |
| Stripe 处理全球 GDP 占比 | 1.6% |
| GPT 工具代码写作占比变化（2024年12月至今） | 20% → 80% |
| Greg 自我评估的 AGI 进度 | 80% |
| 视频时长 | 28 分 26 秒 |
| 章节数 | 10 |

---

## 五、主题分类标签

`AI` `OpenAI` `Greg Brockman` `AGI` `Agentic AI` `Scaling Laws` `Compute` `Codex` `Sequoia Capital` `AI Ascent 2026` `Human Attention` `Startup` `Security` `Science Frontiers` `Organization Design`
