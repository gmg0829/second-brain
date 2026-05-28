# Thin Harness, Fat Skills: The New Way To Build Software

## 演讲概要

**标题**: Thin Harness, Fat Skills: The New Way To Build Software
**演讲者**: Gary Tan (Y Combinator CEO) + 主持对话
**链接**: https://www.youtube.com/watch?v=57lDpTwiW6g
**主题**: 一个人如何用 AI Agent 在 13 年不写代码后，产出 400 倍代码量

---

## 核心概念

### Thin Harness, Fat Skills

- **Harness（工具链）**：LLM 调用循环、工具执行等基础设施——越薄越好，不要重复造轮子
- **Skills（技能/提示词）**：具体的 prompt、markdown、工作流定义——越丰富越好

Gary 的比喻：开 AI Agent 就像开法拉利——令人兴奋、速度极快，但它也会在关键时刻抛锚，你必须会自己掀开引擎盖修理。

---

## Gary 的转变经历

- **13 年不写代码**，转行做投资
- 2025 年 1 月重新开始写代码（用 Claude Code）
- 结果：**400x 的代码产出**，几个月内产出数十万行代码，GitHub 10 万+ stars 的开源项目

### 契机：重建 Posterous（第三次）

- 第一次（2008）：$400 万 + 6-7 人 + 一年半
- 第二次：$100 万 + 2 人 + 3 个月
- 第三次：仅花 **$200**（Claude Code Max 订阅）+ **5 天时间**，功能更完整（RAG、agentic retrieval、深度研究等）

---

## Gary's List：Journalist 级产品

Gary 做的产品不只是一个博客平台，而是**能替代高质量调查记者的软件**：

- 每次 ~$5-10 的 Opus 调用
- 能做完整的研究——读几十篇文章、整本书、标注
- 生成加州/SF 政治问题的深度报道

核心思路：**"Boil the ocean"（煮沸海洋）**——不满足于一个来源，能用 20 个来源就交叉验证，用机器做人类一个月才能完成的调研工作。

---

## Tokenmaxxing

Gary 提出了一个反直觉的观点：

- **不要吝啬 token**——如果能让结果更完整、更准确，多花 token 是值得的
- "Tokenmaxxing" 是现在最酷的事，不是浪费
- 类比：早期在 SF 租房子，$4000/月 看起来很贵，但"住在 SF 之外更贵"——token 花销是同理的

---

## GStack 的诞生

GStack 是 Gary 意外创建的 AI 开发工具集合。

### 起源

Gary 厌倦了重复输入相同的内容，于是把常用的操作写成 notes，最后变成了 skills。

### 关键发现

1. **让 AI 先画架构图**：要求 Claude 在开始工作前先生成 ASCII 图，展示数据流、输入输出、用户流程、错误信息等
   - 这样 AI 会更完整地"沸腾海洋"，分解成多个模块（架构审查、代码质量、测试等）

2. **100% 测试覆盖率**（后来修正为 80-90%）：Gary 发现当用户真正使用时，vibe coding 的 80% 覆盖率不够，会崩溃

3. **Harness vs Skills 的分离**：不要重复造 harness（Claude Code 已经做得很好），要把时间花在写更丰富的 skills/markdown 上

### GStack 的技能栈

- **Office Hours / CEO review**：像 YC 合伙人与创始人对话一样问产品问题
- **Design**：设计师视角
- **Developer Experience review**：代码质量审查
- **Review**：整体审查
- **Codex**：当 Claude Code 搞不定时，调用一个"200 IQ 几乎不说话"的 CTO（Codex）

---

## 工作流（每天）

1. **Queue up PRs**：随时有新想法就往 Conductor 里加
2. **用 CEO skill 审查**：在 plan mode 下让 AI 全面检查
3. **Approve**：Claude 自动实现
4. **QA**：用 Playwright MCP 做自动化测试
5. **Codex 做 final review**：修复所有 bug

---

## Thin Harness 的具体含义

**Markdown 是代码**，只是编译方式不同：

- 工作流定义用 markdown 写（给 AI 读）
- 确定性动作用代码（调用 Twilio 等 API）
- **不要把该用 markdown 的东西写成代码**——代码是 brittle 的，不理解特殊情况和上下文

Gary 举的例子：婚礼策划师会写清单教下一个人怎么做，但不会用 markdown 去打 20 个电话——那要调用 Twilio API。

---

## AI Agent 的本质

- **确定性代码**：执行 0 和 1，brittle，不理解你
- **LLM**：有 latent space，理解你是谁、你的动机，能处理通用情况
- **工程师的工作**：弄清楚哪些放 LLM 里，哪些放确定性代码里

---

## AI Agent 工具链的选择

- **Claude Code**：更适合 ADHD CEO——快、即时反馈、容易上手
- **OpenCode**：适合需要 200 IQ CTO 的复杂问题
- 可以互相调用（Claude Code 调 Codex，OpenCode 调 Claude）

---

## 未来：Personal AI vs Corporate AI

Gary 提出的核心问题：

> **你会控制自己的 AI，还是你的 AI 控制你？**

未来两种可能：

1. **Personal AI**：每个人有自己的 AI、数据、集成、写自己的 prompt
2. **Corporate AI**：使用平台提供的 AI，不知道算法谁写的、为谁服务

就像当年 PC 革命一样——要么拥有自己的工具，要么被大型机/主机统治。

---

## 金句

> "I can buy millions of years of consciousness of machine consciousness. Now I can be a time billionaire."

> "We're in the kit car Ferrari phase. We can drive anywhere."

> "Don't fight it. Just open Claude Code and try it."

---

## 一句话总结

> **用薄 harness（基础设施）+ 厚 skills（提示词/markdown）+ 舍得烧 token = 一个人 > 一个团队的时代**