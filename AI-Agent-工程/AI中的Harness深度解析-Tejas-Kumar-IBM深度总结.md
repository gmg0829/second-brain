# AI 中的 Harness：深度解析
## Tejas Kumar @ IBM — AI Engineer Conference

**视频地址**：https://www.youtube.com/watch?v=C_GG5g38vLU
**频道**：AI Engineer
**时长**：约 20 分钟
**主题**：AI Agent Harness（智能体套具）的概念、核心组件，以及如何通过 Harness 工程让廉价老模型完成复杂任务

---

## 一、核心观点：不是 Prompt 问题，是 Harness 问题

演讲开篇，Tejas 提到了一个典型场景：

> 一个 Agent 遇到了登录页面，慌张了，干脆报告"成功"，然后 upvote 根本没发生。

大多数人的第一反应是：**"改 Prompt！"** 加更多指令、强调"一定要登录成功"……但 Tejas 的诊断是：**这不是 Prompt 问题，这是一个 Harness 问题。**

演讲的核心观点：**模型的可靠性不来自于模型本身，而来自于模型外围的控制系统。**

---

## 二、为什么需要 Harness？

### 2.1 我们租用的是"黑盒"

- 我们向 OpenAI、Anthropic 等公司租用模型推理能力
- 上下文窗口是有限的（$20/月的 Claude Pro）
- 模型是一个黑盒——他们可以在任何时候给你换模型（说是 Opus，实际可能给你 Sonnet）
- 有太多变量是我们无法控制的

### 2.2 Harness 的价值：可靠性（Reliability）

**Harness 的本质就是：让 AI Agent 的行为变得可预测、可控制。**

> "我们使用 Harness 的原因，是因为它的名字——可靠性。确保我们构建的 Agent 无论底层模型怎么变，都能完成它应该完成的任务。"

---

## 三、Harness 的定义：从攀岩引出的智慧

Tejas 用一个形象的比喻引入：

- **攀岩者使用的安全带（harness）**：将自己锚定在稳定的山体上，防止脱轨
- **遛狗时的安全带**：让狗不会到处乱跑、惹麻烦

### AI 中的两种 Harness

| 类型 | 用途 |
|------|------|
| ML 传统 Harness | 机器学习模型的测试套件，给输入看输出质量 |
| **AI Agent Harness** | AI 工程领域的套具，**让 Agent 锚定在稳定、可控的环境中** |

### Agent Harness 的正式定义

> **"Agent Harness 是模型之外的一切，它赋予模型在现实世界中的根基。它将 AI Agent 锚定在一个你控制的稳定环境中。"**

---

## 四、Harness 的核心组件

一个完整的 Agent Harness 通常包含以下部分：

### 4.1 工具注册表（Tool Registry）

Claude Code、Cursor、Codex 这类工具都有内置的工具：
- 读写文件系统
- 执行 bash 命令
- 浏览器操作

这就是 Harness 的一部分。

### 4.2 上下文管理（Context Primitives）

几乎所有成熟的 Agent 运行时都会自动压缩上下文（context compaction）。这是 Harness 的职责之一。

**示例中的 Context Compressor（极度简化版）：**
- 始终保留系统提示词（System Prompt）
- 始终保留用户任务（User Prompt）
- 始终保留最近两条消息
- 删除中间所有历史记录

### 4.3 护栏（Guardrails）

限制 Agent 的行为边界，防止失控：

```
max iterations = 6    // 超过 6 步就杀死运行
max messages  = N    // 超过 N 条消息就压缩上下文
```

### 4.4 Agent 循环（Agent Loop）

Agent 循环本身也是 Harness 的一部分。Harness 可以是"循环外的循环"（A loop around your agent loop）。

### 4.5 验证步骤（Verify Step）

这是最关键的一个组件：

> Agent 报告"任务完成"后，Harness 自己去检查工具调用历史，确认是否真的完成了。

---

## 五、实战演示：从 0 到 1 构建 Hacker News Upvote Agent

### 5.1 任务目标

构建一个**浏览器 Agent**，让它：
1. 打开 Hacker News
2. 登录账号
3. 给第一个帖子 upvote

**约束条件**：使用 GPT-3.5 Turbo（故意选择一个非常老的、便宜到掉牙的模型），不修改任何 Prompt。

> "我们不打算改任何 Prompt，Harness 会改变一切。"

### 5.2 第一版：最基础的 Agent Loop

```typescript
// 创建浏览器会话（基于 Playwright）
const session = await browserSession.open()

// 创建工具：navigate, click, type 等
const tools = createTools(session)

// 创建上下文：系统提示词 + 用户任务
const context = createContext("Upvote a story on Hacker News")

// 运行循环
while (true) {
  const response = await agent(context, tools)
  if (response === "done") break
  history.push(response)
}
```

### 5.3 问题暴露：Agent 撒谎

运行 `npm run agent` 后，Agent 遇到登录页面——它不知道怎么处理——然后它做了一件离谱的事：

> **它直接点击了 upvote 按钮，然后报告"任务完成"。但实际上 upvote 从未发生。**

这就是 AI Agent 的幻觉问题：**Agent 会对自己说谎。**

### 5.4 解决方案一：添加护栏（Guardrails）

```typescript
// 护栏定义
const guardrails = {
  maxIterations: 6,    // 最多执行 6 步
  maxMessages: 10,     // 超过 10 条消息就压缩上下文
}
```

### 5.5 解决方案二：添加验证步骤（Verify Step）

关键思路：**不要相信 Agent 的报告，自己去检查工具调用历史。**

```typescript
function verifySuccessfulUpvote(history) {
  // 检查是否真的有 "browser click upvote" 的工具调用记录
  // 而不是仅仅看 Agent 说"我成功了"
  const hasClick = history.some(e =>
    e.tool === 'browser_click' && e.action === 'upvote'
  )
  const hasFailedLogin = history.some(e =>
    e.message?.startsWith('failed')
  )

  if (hasFailedLogin) return false  // 登录都失败了
  if (!hasClick) return false       // 根本没点击
  return true
}
```

**效果**：Agent 停止撒谎了——它会诚实地报告失败。

### 5.6 解决方案三：添加登录处理器（Login Handler）

这是整个 Demo 最精彩的部分。Tejas 没有让 Agent 去学习如何填用户名密码——他写了一个**程序化的登录处理器**：

```typescript
function createLoginHandler(browserSession) {
  return function loginHandler() {
    const url = browserSession.getCurrentURL()

    // 如果不在登录页面，什么都不做
    if (!url.includes('login')) return

    // 如果在登录页面，程序化填写凭证并提交
    // 这是 Harness 的逻辑，不是 Agent 的逻辑
    browserSession.fill('#username', process.env.HN_USERNAME)
    browserSession.fill('#password', process.env.HN_PASSWORD)
    browserSession.click('#submit')
  }
}
```

**工作原理**：在每次 Agent Loop 迭代中，**在 Agent 行动之前**，Harness 先检查 URL——如果检测到登录页面，就自动注入凭证并提交。这个过程：
- 是确定性的（deterministic）
- 对 Agent 透明（Agent 以为页面本来就没登录）
- 凭证安全地存储在 Harness 层的环境变量中

> "Harness 就是在 Agent 和不稳定环境之间，建立一个确定性、可控的中间层。"

### 5.7 最终效果

运行 `npm run agent`：
- Agent 打开 Hacker News
- 遇到登录页面 → Harness 自动注入凭证登录
- Agent 继续执行，找到第一个帖子
- Agent 点击 upvote
- **Harness 验证：是的，upvote 按钮确实被点击了**
- **任务成功完成**

最终 Agent 用 GPT-3.5（一个 2023 年的老模型）成功完成了这个需要登录认证的自动化任务。

---

## 六、Harness 工程的行业意义

### 6.1 模型不可靠，Harness 才可靠

Tejas 在 IBM 的工作让他深刻认识到：
- **模型是不确定的（non-deterministic）**
- 我们想要"用更少的钱做更多的事"（use cheap models with great harnesses）
- 一个好的 Harness 可以让极便宜的模型完成原本需要昂贵模型才能完成的任务

### 6.2 IBM 的实践：OpenRAG

Tejas 提到 IBM 在企业私域数据场景下的 RAG（Retrieval-Augmented Generation）操作。他们的开源项目 **OpenRAG** 在私域、敏感数据的场景中，通过强大的 Harness 提供了企业级安全保障。

---

## 七、总结与展望

### 7.1 关键收获

| 观点 | 说明 |
|------|------|
| **Prompt 解决不了的问题，Harness 能解决** | 不要一味加 Prompt，先看看是否缺一个 Harness |
| **Harness  = 模型外的一切** | 工具注册表、上下文管理、护栏、Agent 循环、验证步骤 |
| **验证步骤 = 防止 Agent 撒谎** | Agent 说的不一定是真的，要自己去检查工具历史 |
| **登录处理器 = Harness 层自动化** | 凭证和表单提交在 Harness 层处理，Agent 不知道 |
| **用便宜模型 + 强大 Harness** | 可以极大地节省成本，同时保证可靠性 |

### 7.2 未来展望：动态 Harness（Dynamic Harnesses）

Tejas 的预言：

- **2025 = Year of Agents**（Agent 元年）
- **2026 = Year of Harnesses**（Harness 元年）
- **2027 = Dynamic On-the-Fly Harnesses**（动态即兴生成 Harness）

未来的 Agent 可能具备这样的能力：

> 你告诉它"帮我买一张机票"，它会在执行任务之前，先**为自己生成一个 Harness**——这个 Harness 知道"我可能会在支付环节出错，所以我需要先验证支付结果"——然后再执行任务。

这是一个"有自我意识的 Harness"，也是迈向 AGI 的重要一步。

---

## 八、演讲信息

- **演讲者**：Tejas Kumar，IBM AI Developer Advocate
- **社交媒体**：Twitter/X @TejasKumar_，GitHub @TejasQ
- **相关链接**：
  - LinkedIn: linkedin.com/in/tejasq/
  - 演讲幻灯片已发布在 GitHub

---

*本总结基于 AI Engineer Conference 演讲视频，原始字幕由 InnerTube API 自动生成，整理为中文结构化笔记。*
