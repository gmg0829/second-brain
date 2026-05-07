# Building Pi and What Makes Self-Modifying Software So Fascinating

> **视频来源**: The Pragmatic Engineer Podcast
> **嘉宾**: Mario Zechner（Pi 创建者）、Armin Ronacher（Flask 创建者）
> **时长**: 约 94 分钟
> **链接**: https://www.youtube.com/watch?v=n5f51gtuGHE

---

## 嘉宾背景

### Mario Zechner（Pi 创建者）

Mario 的编程启蒙来自一台 **Amiga 500**。在那个时代，图形编程深深吸引了他——在屏幕上直接操控像素的体验让他着迷。Amiga 500 的图形子系统（Copper 和 Blitter）让他 early 就接触到硬件级编程，这种对图形和底层系统的热情贯穿了他的整个 career。

他后来创办的公司被 ARM 收购，收购后他在 ARM 工作了七年，从事嵌入式图形相关工作。这段经历让他对系统底层和性能优化有了深刻理解，也为他后来创建 Pi 奠定了基础。

### Armin Ronacher（Flask 创建者）

Armin 最早接触编程是在 **Windows NT** 环境下，他早期在 **Ubuntu 社区** 非常活跃，深度参与了 Ubuntu 的开发和社区建设。这段经历让他对开源项目的运营、社区建设和长期维护有了第一手经验。

他最著名的作品是 **Flask**——一个 Python 微框架。Flask 的设计哲学（简单、灵活、可扩展）直接反映了他对框架设计的理念：不要把开发者锁定在某种特定的做事方式里，而是提供最小的核心，让用户按需扩展。

---

## Pi 的设计理念：极简核心 +无限扩展点

### 核心理念

Mario 在创建 Pi 时的核心理念是：**一个极简的 core，加上大量精心设计的 hook points，让用户可以随意扩展**。

Pi 的核心工具集只有四个：
- `Read`（读取文件）
- `Write`（写入文件）
- `Edit`（编辑文件）
- `Bash`（执行命令）

**"Read, write, edit, bash. It's all you need."**

这就是 Pi 的全部内置能力。但 Mario 刻意保持了极简，因为他相信：

> "你拥有的工具越少，你就越能用好它们。当你有一把锤子时，所有东西看起来都像钉子。但当你有一整套工具时，你反而不知道该用哪个。"

### 扩展点机制

Pi 的扩展能力来自于它的 **hook points** 系统：

Mario 在 Pi 的核心中设计了大量的扩展接口，开发者可以通过简单的 TypeScript 模块连接到 Pi 的 Node.js 进程中，从而实现：

- **提供自定义工具**：开发者可以定义自己的工具，让 LLM 使用
- **自定义 compaction 实现**：改变上下文压缩的方式
- **完全重塑 TUI 界面**：修改终端用户界面的外观和行为

```typescript
// 扩展点示例：一个简单的 TypeScript 模块被加载到 Pi 进程中
// 就可以 hook 到核心的各个部分
```

这种设计的精妙之处在于：**Pi 本身并不内置 MCP 支持、plan mode 等功能，但用户可以自己添加这些功能**。

### 用户主导的扩展案例

Mario 分享了几个用户自己扩展 Pi 的案例：

**1. MCP 支持**：Pi 本身不支持 MCP，用户直接让 Pi 自己把 MCP 支持 build 进去。

**2. Plan Mode**：Armin 尝试了五种不同的 plan mode 实现，最终意识到 plan mode "is entirely useless"（完全没用），于是放弃了。

**3. 界面定制**：非技术用户修改 TUI 的视觉样式，让它更适合特定工作流。

**4. RL 执行环境**：有人把 Pi 的核心逻辑拿出来，构建了完整的 RL（强化学习）训练环境，用 Pi 作为 agent 来执行 RL 循环中的决策部分。

**5. Mario 本人的扩展**：只有两个 trivial 的扩展——当 Pi 在终端中检测到 GitHub 的 issue 或 PR 链接时，自动通过 GitHub API 获取详情，在编辑器上方显示 issue 标题、作者账号和链接。这帮助他在处理开源事务时保持上下文。

### "Self-Modifying" 的真正含义

Mario 强调，Pi 的"自我修改"能力不是某种 AI 黑魔法，而是一个**设计选择**——把核心做得足够小、足够模块化，让扩展成为第一等公民。

> "Pi 不会自我修改——是你通过扩展点修改它。但因为你可以通过代码做到这一点，而代码可以由 LLM 生成，所以最终看起来像是系统在自我修改。"

---

## OpenClaw 与 Pi 的渊源

### OpenClaw 是什么

OpenClaw 是 Peter（序章中提到的工程师）构建的一个项目，最初是"Build stuff without looking at code"的实验。OpenClaw 底层使用 Pi 作为 agent 执行引擎。

### 合作起源

Mario 回忆，OpenClaw 与 Pi 的结合是"organic"（有机）发生的：

- 2024 年 10 月，Mario 开始构建 Pi
- 同月，Peter 开始构建 Vera（他的 WhatsApp 助手项目）
- 两人互相 review 对方的博客文章，交换想法
- Peter 在寻找一个"gentle copy"，先是 fork 了 Pi 并改名为"towel"
- 后来 Peter 意识到 fork 并维护一个独立版本太痛苦，干脆直接用 Mario 的代码
- 这就是为什么 OpenClaw 使用 Pi 作为底层

### 意外收获：Compaction

Mario 特别为 OpenClaw 构建了 **compaction** 功能（上下文压缩/摘要）。

> "Peter 在 chat 里抱怨需要 compaction，我说好，你用 compaction，但我会告诉所有用户不要用它，因为它对你不好。"

讽刺的是，今天 compaction 成了 Pi 的核心功能之一，而 Mario 依然建议大多数用户不要使用它——因为它会丢失信息。

---

## "Clankers" 现象

### 名字的由来

"Clanker" 来自 **Star Wars: Clone Wars**。在那个宇宙中，机器人士兵被称为"clankers"——因为它们移动时发出"clank clank"的声音。Mario 的朋友的孩子是 Star Wars 的粉丝，Mario 通过" osmosis"（潜移默化）学会了这些梗。

### Clanker 的定义

在当前 AI 编程的语境下，**Clanker** 指的是：

> 由 AI agent 自动生成代码、上传到 GitHub 但人类创建者可能完全不知情的代码仓库。

这创造了一种全新的开源景观——代码的存在本身不再意味着人类真正投入了意图和精力。

### Armin 的亲身体验

Armin 在维护 Pi 时遭遇了大量来自 Clankers 的 issue 和 PR：

- **自动发送 PR**：OpenClaw 的用户运行 agent，agent 发现 Pi 的 bug，自动 fork 并提交 PR
- **用户不知情**：PR 的创建者（人类）可能根本不知道这个 PR 存在
- **Armin 的修复被 Clanker revert**：Armin 花了一小时修复两个 bug，提交后五分钟，某个 Clanker 路过就 revert 了他的修复——因为 Clanker 只按自己的逻辑行事，不理解人类维护者的上下文

### 应对策略

Armin 发展出一套应对机制：

**1. Auto-close 所有未知 PR**：
- 他的 GitHub workflow 维护了一个已知贡献者名单
- 不在名单上的账户发送的 PR 会被自动关闭
- 自动回复："Thanks for contributing. Please open an issue in a human voice, no longer than a screen's worth of text. If I like it, I'll type 'looks good to me' and add your account to the allowlist."

**2. 3D 可视化工具**：
- Armin 构建了一个将 issue 和 PR 聚类到 3D 空间的工具
- 这样他可以看到相似问题的集群，批量处理

**3. 信息检索作为 bottleneck**：
- Armin 强调他需要的不是"验证你是人类"，而是需要一个 **bottleneck**——让他能以人类的速度处理涌入的信息
- 否则，即使他知道某个 PR 是好的，他也没有时间去 review

### 第二修正定律

Armin 提出了一个深刻的类比：

> "Everything degrades towards chaos. 这是热力学第二定律。你必须持续投入能量来维持秩序。而当工程师停止感受代码库的 pain 时——他们就感受不到约束，会不停地往里添加东西。"

**Agents don't feel pain**——它们不会像人类一样，因为感受到代码库变复杂、变乱、难以维护而停下来反思。

---

## 开源与 AI：真的改变了吗？

### Armin 的观点：Volume 变了，Fundamental 没变

Armin 认为 AI 没有根本改变开源，只是改变了**volume（数量）**：

- 过去：新项目存活两周后就死掉
- 现在：新项目两天后就死掉
- 但**真正长期有价值、有人维护的项目，数量可能没怎么变**

> "Open source 成功的核心在于：人们因为内在驱动（intrinsic motivation）聚在一起解决 hard problems。这种动力从来没有变过。"

### Mario 的观察：意图消失了

Mario 观察到的一个重要变化是**意图的消失**：

- **过去**：一个人发送 PR，是因为他们真的关心这个问题，花了时间研究，付出了 effort
- **现在**："Agent, please fix this. Make no mistake, send it to this repository."——创建者甚至不关心这件事是否会成功

他把这比喻成一种新的"entitlement"——不付出真正的努力，却期待得到结果。

### GitHub 的基础设施压力

大量的 Clankers 正在对 GitHub 的基础设施造成巨大压力：

> "Everybody complains about GitHub going down. I actually think they're doing a pretty good job. It's basically OpenClaw instances hammering their infra."

---

## 复杂度是 Agent 最大的敌人

### Armin 的核心论点

Armin 提出了一个重要的数学论证：

假设：
- 一个 agent 的 context window 是 200K tokens
- 一个代码库有 600K 行代码
- agent 每次能看到代码库的 **1/3**

即使解决了信息检索问题（让 agent 找到所有相关代码），还有另一个问题：

**Agent 自己生成的代码也在消耗 context window**。

> "The complexity they add is their own worst enemy, because eventually the codebase will be so big and so complicated and so interconnected that the agent has absolutely no way on a technical level to ingest all the context it needs to do the new task."

### 训练数据的平均化问题

更根本的问题是：LLM 从互联网的训练数据中学习，而互联网上的代码：

> "While there are some pearls, there's also a lot of swine. Because we have a gazillion GitHub projects from the olden days where we just tried out things. And because instances like Linux or any other really well-maintained and well-written open source project are minuscule compared to all the rest of the garbage... a machine learning model will kind of converge towards the mean."

LLM 的"平均"是垃圾到平庸，而不是精品。

### 信息检索：尚未解决的问题

Mario 指出了 agentic search 的核心问题：

> "Are you sure that the agent finds all the relevant code it needs to find to fulfill a thing? That's also where all the garbage code comes from——because it doesn't see all the thing it needs to see."

即使 RAG 和 context retrieval 技术在进步，**"我是否找到了所有需要知道的"这个元问题**，在技术上并没有被解决。

---

## Armin 的 Startup 体验与"Agentic Regret"

### 2024年的"Honeymoon Period"

Armin 描述了他创业初期的经历：

2024 年 4 月到 10 月期间，他沉浸在 AI coding 的兴奋中：

> "It felt like I can do so much. There was no heightened expectation like the world has not yet gotten used to this idea that everything has to now move at 10x the speed."

他用 iPhone 在"Vibe Tunnel"（一个通过手机与机器对话的系统）上工作，感觉前所未有的自由和快乐。

### "Slow the F Down" 博文

Armin 在博客上写了一篇病毒式传播的文章，核心论点是：

**Agent 可以每天生成 10 倍于人类的代码，但它同时也会产生 10 倍的错误。** 即使 agent 的错误率只有人类的一半，你每天面对的错误数量仍然是增加的。

然后，如果有 **100 个 agents** 同时对你的代码库工作……

### Dark Factory（黑暗工厂）

Armin 提出了一个概念——**Dark Factory**：

> "Tens or hundreds or thousands of agents. You give them a spec, they go and they break it up, they organize themselves, they have a QA agent. They have roles. They have context. And they spend enormous amounts of tokens. And the hope is that your software will be done."

问题是：**Software will be done, but it will be garbage.** 数量上去了，质量却无法保证。

### Armin 的"Agentic Regret"

Armin 坦诚地说：

> "I definitely have a genetic regret. [gentic = generative + regret，指"生成式后悔"] I feel like now with a little bit of power of hindsight I learned some things that I wish I would have learned probably in November."

他意识到自己被 speed 绑架了——因为 agents 可以快速生成代码，他也期待快速看到结果，但这种期待让他做了很多本来不会做的决定。

### 测量复杂度的土方法

Armin 提到一个有趣的观察：

> "If I scan through my sessions on a project from start to current date, the frequency of curse words increases—because the agent starts messing up more because it itself cannot deal with the complexity of the [codebase]."

**咒骂词频率**可以成为代码库健康状况的一个反向指标。

---

## 摩擦的价值

### "Ship Without Friction" 的陷阱

Armin 提到一个讽刺的讽刺：

一家公司（有安全问题的公司）的 tagline 是 **"ship without friction"**。Armin 认为这恰恰是问题所在：

> "We used to talk about getting rid of all the things in the way so that you feel happy shipping stuff. But there always were changes where you really wanted to think: Do you want to drop the database? Do you want to merge this migration which might take a table lock?"

**摩擦（friction）不是敌人——它是思考的催化剂。**

### 故意注入的摩擦

好的工程组织会**故意注入摩擦**：

- Tier-1 服务需要 director 审批才能做配置变更
- 关键系统变更需要多轮 code review
- 定义 SLOs，建立期望

> "These are not bureaucracy. If you do this correctly, it saves you time. You're not waking up at 3AM."

**摩擦让人在三思**——在按"同意"之前停下来思考这个变更的真正风险。

### Bottleneck 才是答案

Armin 说他不 necessarily 需要"human verification"或"human check"——他需要的是一个 **bottleneck**：

> "I just need a bottleneck that allows me to process the amount of incoming things as a human, because in order for Pi to not deteriorate into a pile of garbage, I still believe it needs me and other capable people reviewing at least the important code."

---

## MCPs vs CLI

### Armin 对 MCP 的批评

**1. 规范本身太复杂**：
MCP 的 spec 定义了大量的复杂性，虽然这在某种程度上是规范设计的通病。

**2. 本质是 RAG，不是代码执行**：
MCP 的核心模式是"调用某个东西，把结果塞回 context，然后处理"——这对某些场景有效，但相比直接运行代码，它缺少了：

> "Agents are just very, very, very good at running code. And MCP is not quite running code."

**3. 不可组合**：
当你有两个不同 MCP server 的输出时，组合它们需要模型自己完成数据转换——这不如 Unix pipe 优雅。

### CLI/Pipe 的哲学优势

Unix pipe 的哲学是：

> "The model only sees the end result, and it is super free in how it massages that data."

CLI 天然是**组合的**——`curl | grep | awk | sed`，每个工具只做一件事，组合起来却无比强大。

### MCP 的真实适合场景

Mario 指出 MCP 其实找到了自己的 product-market fit：

**企业场景**——大型公司内部，需要安全管控、合规审计、权限隔离的环境，MCP 是一种可行的方案。

**消费者场景**——让不懂代码的人通过自然语言调用各种服务（邮箱、日历、云盘），MCP 是一种自然的集成方式。

### Code Mode 的解法

当 MCP 在组合多个数据源时失败，一个变通方案是 **Code Mode**：

> "We take all the MCP servers, you expose that as functions in TypeScript, and then the model can write code that calls the MCP service and does the composition in code."

这本质上是：**不要让 MCP 调用编排工作流，让代码执行编排工作流。**

---

## 预测（2025-2026）

### Mario 的预测

**1. Self-modifying 软件将扩展到非技术领域**

> "I think we will see more of that, not only to the tech sector but also to non-tech applications of agentic AI tools."

**2. 7 dog years（狗年）**

Mario 说 AI 领域的一年相当于狗的七年，所以任何预测都很难准确。

**3. 基础设施依赖将成为大问题**

> "We're now engineering teams already telling me they have codebases they think they couldn't maintain anymore without the machine... My strong guess is that one of those companies will be public and all of a sudden it'll be expensive."

### Armin 的预测

**1. Self-correction 会发生**

> "I think it will self-correct because it's not sustainable."

**2. Honeymoon 效应已经结束**

Armin 观察到：

> "In about 2 months time, a lot of them were like, 'Hang on, it introduced all this complexity. It has these things. I'm not going as fast as I thought I would be.'"

**3. 地理因素**

Armin 庆幸自己不在 San Francisco——那里的 hype cycle 更强烈，更难保持清醒。**安静的环境、有孩子的日常、非技术的朋友，反而帮助他保持视角。**

---

## 如何跟上变化

### Mario 的策略

- **不追 hype**：Twitter 上的热点三周后还存在，说明它真正重要
- **等待 discourse 稳定**：如果一个东西在 discourse 中存活了三周，它可能真的有价值
- **有孩子**：强制你需要去外面、爬树、溜冰，而不是整天盯着屏幕

### Armin 的策略

- **关闭通知**：不主动 reading emails，不被 notification 绑架
- **相信时间的力量**：如果一个东西真的重要，它会以其他方式重新出现
- **拥抱 entropy**：接受混乱会存在，然后找到自己的应对节奏

---

## 推荐书籍

### Armin 推荐：*Code* by Pet S一起去

> "Classic. I just love it. It's just such a great read. It's also for non-techies. It's the first thing I recommend if anybody asks me what's my job."

这本书讨论的是：**编程与你的想象中非常不同，它更多地关于人、协作、沟通，而不是计算机本身。**

### Mario 推荐：最近在读的一本（名字听不太清楚，似乎是关于中国/欧洲/美国差异的书）

---

## 核心语录

1. **"Read, write, edit, bash. It's all you need."** —— Mario

2. **"The complexity they add is their own worst enemy."** —— Armin

3. **"Agents don't feel pain. When a codebase gets too complex, the human engineer feels the issues. Agents just keep adding to the complexity."** —— Armin

4. **"The best possible spec is the software itself."** —— Armin（关于 AI 用 training data 填充 spec 中的空白）

5. **"Everything degrades towards chaos. You have to put extra energy in to keep it away."** —— Armin（第二修正定律）

6. **"Agents are just very, very, very good at running code. And MCP is not quite running code."** —— Armin

7. **"I'm not saying agents or humans are better. They're clearly not. But agents also don't solve the problem [of garbage quality]."** —— Armin

8. **"Slow the f down."** —— Armin

9. **"The most capable personal agents, OpenClaw being a good example, they're just coding agents hidden from you."** —— Mario

10. **"If coding agents hadn't become so popular, the idea of code generation for non-code related problems probably wouldn't have taken off quite as much too."** —— Mario

---

## 视频结构索引

- 00:00 - 开场
- 32:18 - Pi 介绍
- 48:09 - OpenClaw + Pi
- 50:54 - "Clankers"
- 57:32 - 开源与 AI
- 01:00:22 - 复杂度是敌人
- 01:02:50 - AI 原生创业体验
- 01:11:52 - "Slow the F down"
- 01:16:40 - MCPs vs CLI
- 01:25:03 - 预测

---

*总结完成于 2026-04-30*
