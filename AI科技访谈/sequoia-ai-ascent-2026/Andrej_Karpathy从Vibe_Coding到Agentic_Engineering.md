---
title: "Andrej Karpathy: From Vibe Coding to Agentic Engineering"
source: https://www.youtube.com/watch?v=96jN2OCOfLs
channel: Sequoia Capital
date: AI Ascent 2026
duration: 29分49秒
cover: images/cover.jpg
description: "Andrej Karpathy（OpenAI 联合创始人、前 Tesla AI 负责人、Eureka Labs 创始人）与 Sequoia Stephanie Zhan 对话，解释为什么他自认为比以往任何时候都更落后于编程一线，Vibe Coding 到 Agentic Engineering 的进化，以及为什么 LLMs 应该被理解为"幽灵"——锯齿状的、统计性的、被召唤的实体，需要新的品味和判断力来引导。"
---

# Andrej Karpathy: From Vibe Coding to Agentic Engineering

**来源**：Sequoia Capital AI Ascent 2026
**嘉宾**：Andrej Karpathy（OpenAI 联合创始人、前 Tesla AI 负责人、Eureka Labs 创始人）
**主持**：Stephanie Zhan（Sequoia 合伙人）
**视频长度**：29分49秒，10个章节

---

## 一、核心概念速览

| 概念 | 解释 |
|------|------|
| **Vibe Coding** | 提升编程地板——任何人都可以 vibe coding任何东西 |
| **Agentic Engineering** | 保持质量 bar 不降低的前提下，用 agent 协调加速——需要对 agent 有工程级理解 |
| **Software 3.0** | 1.0 写代码；2.0 训练神经网络（编程 = 整理数据集）；3.0 写 prompt，上下文窗口是操控 LLM 的杠杆 |
| **Ghosts vs Animals** | 我们召唤的不是动物（内在动机驱动），而是幽灵（统计模拟电路 + RL 叠加）——需要不同的使用和评估方式 |
| **Verifiability** | 可验证性决定哪些领域会最快被自动化——RL 环境需要验证奖励 |
| **Jagged Intelligence** | 模型在可验证领域（数学、代码）极强，但在不可验证领域（常识推理）很弱——"草莓有几个 R"就是例子 |

---

## 二、逐章详解

### 2.1 Feeling Behind as a Coder

**"我从来没有感觉自己这么落后于编程一线"**

转折点：**2025 年 12 月**。之前 agent 工具在代码块层面有帮助，经常出错需要手动修正。12 月之后：
- 最新模型出的代码块直接就是对的
- 不断要求更多 → 不断给出 → 几乎不需要修正
- 进入了 **vibe coding 模式**

> "很多人都把 AI 当作 ChachiPT  adjacent 事物。但你必须重新看 December——因为一切已经从根本上改变了。"

### 2.2 Software 3.0 Explained

| 软件时代 | 编程方式 |
|---------|---------|
| **Software 1.0** | 写代码（explicit rules） |
| **Software 2.0** | 创建数据集 + 训练神经网络（ programming = 整理数据集和目标函数） |
| **Software 3.0** | 写 prompt；上下文窗口是操控 LLM 解释器的杠杆 |

> "训练这些 LLM 相当于构建了一台可编程计算机——在数字信息空间中进行计算。"

### 2.3 Agents as the Installer

OpenClaw 安装的案例：
- 传统：写 shell script（跨平台复杂度膨胀）
- **Software 3.0 版本**：直接复制一段文字粘贴给 agent，它自己检测环境、智能调试、解决依赖

> "这就是新的编程范式：什么是复制粘贴给你的 agent 让它安装 OpenClaw？"

### 2.4 Menu Gen vs Raw Prompts

**Menu Gen（老范式）**：
- 拍照 → OCR → 图像生成器 → 渲染菜单图片
- 构建了一整个 app（ Versel + 各种服务）
- 花大量时间部署配置

**Software 3.0 版本**：
- 把照片给 Gemini，说"用 Nanobanana 渲染菜单"
- 直接返回一张照片——精确地在原图像素上渲染了菜单项

> "我所有 menu gen 的代码都是多余的。它工作在旧范式中。这个 app 不应该存在。"

### 2.5 What's Obvious by 2026

**未来的 Computer 形态预测**：

- 未来可能：**神经网格成为 host process，CPU 成为 co-processor**
- 完全神经化的计算机：输入 raw video/audio，通过 diffusion 渲染独特 UI
- 类比：1950-60 年代，计算机应该像计算器还是神经网络？最终走了计算器路线

> "神经网格将承担重型计算工作，tool use 成为历史附件——这是一个非常陌生的世界。"

### 2.6 Verifiability and Jagged Skills

**可验证性是理解 AI 能力的关键框架**：

- 传统计算机自动化：**能写成代码的**
- LLM 能自动化：**能验证的**（RL 训练需要验证奖励）
- 模型是"锯齿状的"（jagged）：在可验证领域（数学、代码）极强，在其他领域弱

**Jagged 例子**：
- GPT-3.5 → GPT-4 国际象棋大幅提升 → 不是简单的进步，而是**有人把象棋数据放进了预训练集**

**经典反例**（模型Jjagged的极端体现）：
> "我要去洗车，车在 50 米外。我应该开车还是走路？"
> 最先进的 Opus 4.7 会告诉你走路（太近了）。
> 同时它能重构 10 万行代码库，发现零日漏洞。

**这说明什么**：
1. 模型在某方面有问题
2. 你必须 stay in the loop，把它们当作工具
3. 你必须知道自己在哪些"电路"里（RL circuits vs data distribution）

> "如果你在 RL circuits 里，你飞。如果你不在数据分布里，你挣扎。"

### 2.7 Founder Advice and Automation

**在 AI 加速的浪潮中，Founder 的机会在哪？**

- 如果你所在领域**可验证** → 你可以创建 RL 环境，做自己的 fine-tuning
- 如果你所在领域**不可验证** → 仍然有价值，但需要不同的方法

**最终答案**：几乎一切都可以被自动化，只是难度不同。即使是写作，也可以用 LLM 法官委员会来验证。

### 2.8 From Vibe Coding to Agentic Engineering

| | Vibe Coding | Agentic Engineering |
|---|---|---|
| **目标** | 提升编程地板，让任何人都能 coding | 保持质量 bar 不降低，用 agent 加速 |
| **质量要求** | 随便，能跑就行 | 不允许引入漏洞 |
| **责任人** | 模糊 | 仍然是你的责任 |
| **天花板** | 有上限 | 极高，10x 都不止 |

**Agentic Engineering 的核心问题**：
- Agent 是** stochastic 的、有点 fable 的实体**
- 如何协调它们加速而不牺牲质量？
- 做到这一点的人，**远不止 10x**。

### 2.9 什么是 AI Native 程序员？

Sam Altman 说过：
- 30 岁的人用 ChatGPT 替代 Google
- 青少年用 ChatGPT 作为互联网网关

**Coding 的对应现象**：
- 不好的程序员 vs AI native 程序员的区别
- **不是会不会用工具，而是 invest 多深到自己的 setup**
- 用尽工具的所有功能

**招聘新范式**：
- 不再是解谜题
- 给一个大项目（比如做一个 Twitter clone for agents）
- 让 agents 模拟活动
- 用 10 个 Codex 5.4x 来 try to break it
- 看能不能被攻破

### 2.10 什么人类技能会变得更重要

**人类仍然必须负责的**：
- **Aesthetics**（审美）
- **Judgment**（判断）
- **Taste**（品味）
- **Spec / Design**（规格和设计）
- **Oversight**（监督）

**典型 agent 仍然会犯的奇怪错误**（Menu Gen 案例）：
- Google 账号和 Stripe 账号 email 不同
- Agent 用 email 地址来交叉关联用户资金
- 这是一个非常奇怪的关联方式——人类永远不会这样做

> "你不需要 care API 的细节了（reshape vs permute vs transpose 细节忘了也没关系），但你需要知道 underlying tensor 有 view vs copy，需要知道什么时候会不必要地复制内存。"

### 2.11 Ghosts vs Animals

**核心类比**：
- **Animals**（动物智能）：有内在动机、有好奇心、有 empowerment——进化塑造的
- **Ghosts**（幽灵智能）：统计模拟电路 + RL 叠加——被召唤的

**为什么这个类比重要**：
- 对着 AI 吼叫不会让它变得更好或更差
- 它没有内在情感反馈
- 你需要不同的 mental model 来使用它

**但这不代表它无效**——只是你需要理解它的本质。

### 2.12 Agents Everywhere and Learning

**Agent Native 世界的基础设施需求**：

当前所有东西都是为人类写的：
- Docs 仍然是给人类读的，不是给 agent 复制的
- **API 不是 agent native 的**

Karpathy 最喜欢的 pet peeve：
> "为什么还在告诉我做什么？我不想做任何事。我只想知道应该把什么复制粘贴给我的 agent。"

**Agent Native 的未来**：
- 描述你想要 → agent 构建 → 自动部署，无需你触碰任何东西
- agent 代表个人或组织，有自己的 agent
- 你的 agent 和对方的 agent 直接对话协调会议细节

**关于教育和学习的终极洞察**：

> "你可以外包你的思考，但你无法外包你的理解。"
> — tweet that blew his mind

- 工具可以增强理解
- 你仍然需要 something to direct the thinking
- LLM Knowledge Bases 是他处理信息的方式——reading article → wiki built up → asking questions

> "你不能成为一个好的 director，如果 LLM 在理解方面并不出色。你仍然是 uniquely in charge of that。"

---

## 三、金句摘录

| # | 金句 |
|---|------|
| 1 | "You could outsource your thinking but you can't outsource your understanding." |
| 2 | "I was vibe coding and I couldn't remember the last time I corrected it." |
| 3 | "Software 3.0 — your prompt is your lever over the interpreter that is the LLM." |
| 4 | "OpenClaw installation is just a copy paste of text to give to your agent. That's the programming paradigm." |
| 5 | "All of my Menu Gen code is spurious. The app shouldn't exist. It's working in the old paradigm." |
| 6 | "The neural net becomes the host process and the CPUs become the co-processor." |
| 7 | "State-of-the-art Opus 4.7 will refactor a 100,000 line codebase or find zero day vulnerabilities, yet tells me to walk to a car wash 50 meters away. This is insane." |
| 8 | "If you're in the circuits that were part of the RL, you fly. If you're out of the data distribution, you struggle." |
| 9 | "Agents are these intern entities. You have to be in charge of the spec, the plan, the taste." |
| 10 | "We're not building animals. We're summoning ghosts — jagged, statistical, summoned entities shaped by data and reward functions." |
| 11 | "There's no manual for this thing. It works in certain settings, but not in some settings." |
| 12 | "I don't want to do anything. What is the thing I should copy paste to my agent?" |

---

## 四、关键数据点

| 指标 | 数值 |
|------|------|
| 视频时长 | 29 分 49 秒 |
| 章节数 | 10 |
| Agent 加速效果 | 远超 10x（Karpathy 观察） |

---

## 五、概念层级关系

```
Software 1.0    → 写代码（explicit rules）
Software 2.0    → 训练NN（编程 = 整理数据集）
Software 3.0    → 写prompt（上下文窗口是杠杆）

Vibe Coding     → 提升地板，让任何人能编程
Agentic Eng.    → 保持质量 bar，用 agent 加速，专业工程学科

Animals         → 进化驱动，有内在动机
Ghosts          → 数据+RL塑造，被召唤的，无内在动机

Verifiability   → 决定哪些领域最快被自动化
Jaggedness      → 模型在可验证领域强，在不可验证领域弱
```

---

## 六、主题分类标签

`Andrej Karpathy` `Vibe Coding` `Agentic Engineering` `Software 3.0` `Ghosts vs Animals` `Verifiability` `Jagged Intelligence` `Sequoia Capital` `AI Ascent 2026` `Menu Gen` `Eureka Labs` `LLM` `Outsource Thinking` `Agent Native` `Taste` `Judgment`
