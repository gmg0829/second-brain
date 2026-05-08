# Claude Code Full Course — Nick Saraev

> 来源：[YouTube](https://www.youtube.com/watch?v=QoQBzR1NIqI) | Nick Saraev
> 时长：4小时 | 定位：零基础到实战

---

## 核心内容概览

这是一门**完整的 Claude Code 实操课程**，讲师用 Claude Code 管理年利润 $400 万的业务，并教 2000+ 人使用。课程从安装开始，一直讲到如何用 Claude Code 从零构建并部署一个完整的全栈应用（PandaDoc 竞品）。

---

## 第一部分：基础设置

### 安装与认证

1. 订阅 Claude Code Pro（$17/月）
2. 终端安装：`curl` 命令
3. 或使用 VS Code / Antigravity 图形界面
4. 认证：`/login`

### 核心概念

| 概念 | 说明 |
|------|------|
| **Context Window** | 从 0-100%，显示对话历史占比 |
| **Context Compression** | Claude 自动压缩历史，保持信息密度 |
| **Token** | 类比"词"，不是完全相同，但可近似理解 |
| **Modes** | ask before edits / edit automatically / plan mode / bypass permissions |

### Claude Code 的本质

> Claude Code 连接到你的本地电脑，可以直接修改文件、运行终端命令、本地自动化。

---

## 第二部分：CLAUDE.md — 项目大脑

### 工作原理

Claude Code 启动时，会在对话最前面**自动注入 CLAUDE.md 的内容**。这就像给船在出港时一个精确的初始方向——如果初始方向偏了一度，航行几万公里后会偏得离谱。

### 核心原则

**Claude.md 的注入顺序**：
```
[全局 CLAUDE.md] → [本地 CLAUDE.md] → [你的 Prompt]
```

### 最佳实践

| Do | Don't |
|----|-------|
| 用 bullet points + 短标题，高信息密度书写 | 不要语音转录直接粘贴一整块文字 |
| 最重要的 guardrails 放在最前面（ primacy bias）| 不要粘贴整本 API 文档 |
| 定期 review 和修剪 | 不要写模糊的 aspirational 规则（如"要聪明"、"不要犯错"）|
| 200-500 行上限 | 不要让它每次都读所有文件 |
| Claude 犯同一个错 2-3 次 → 让它记到 CLAUDE.md 里 | |

### 使用 `/init` 自动生成

在空文件夹运行 `/init`，Claude Code 会分析整个代码库并生成 CLAUDE.md。

---

## 第三部分：网页设计三流派

### 方法一：设计参考 + Screenshot Loop（推荐）

1. 在 godly.website 找参考设计
2. 用浏览器 DevTools 截全页截图
3. 压缩图片到 <5MB
4. 复制 CSS styles
5. 喂给 Claude Code，让它循环对比、迭代

> "给 AI 一个参考设计，它能做出 80% 相似度 → 截图对比 → 90% → 95% → 99%"

### 方法二：语音转录 + AI 生成

- 按住 FN 键语音输入
- 说话速度 200 words/min vs 打字 50-70 words/min
- 2.5-3x 效率提升
- 适合没有设计稿的情况

### 方法三：组件市场（21st.dev）

- 设计师在组件库上传组件
- 一键复制 prompt
- 粘贴给 Claude Code 安装

---

## 第四部分：高级功能

### .claude 目录结构

```
.claude/
├── settings.json          # hooks 和权限
├── settings.local.json     # 本地覆盖
├── CLAUDE.md              # 项目大脑（可拆分成 rules/）
├── agents/                # 子代理定义
│   └── *.md              # 每个代理的定义
├── skills/               # 技能定义
│   └── *.md              # 每个技能的指令
├── rules/                # 规则拆分
│   ├── workflow.md
│   ├── tech-defaults.md
│   └── design-rules.md
└── memory.md             # 全局记忆

还有全局层级的 ~/.claude/ 和企业级的 CLAUDE.md
```

### 三层优先级

```
[企业级 CLAUDE.md] → [全局 ~/.claude/CLAUDE.md] → [本地 ./CLAUDE.md]
```

### 记忆机制（Memory）

告诉 Claude 个人信息 → 它会保存到 memory.md → 新 session 自动注入。

---

## 第五部分：子代理（Sub-Agents）

### 核心思想

> 子代理不是为了"角色扮演"，而是为了**控制 context**。

### 最有价值的三类子代理

| 代理 | 作用 | 为什么 |
|------|------|--------|
| **Research Agent** | 专职研究，结论传回父代理 | 用子窗口自己的 context，不污染父代理。节省 50x token |
| **Reviewer Agent** | 代码审查 | 没有 context 偏见，能客观看代码 |
| **QA/Testing Agent** | 自动化测试 | 不污染主模型，专注验证 |

### Research Agent 的 Token 经济学

- Research Agent 可能消耗 100K tokens
- 但只传回 2K tokens 的摘要给父代理
- = 50x 成本节省
- 可以用 Sonnet/Haiku 等更便宜的模型

---

## 第六部分：Skills（技能）

### Skills vs 子代理

- **子代理**：有独立 context 的独立 agent
- **Skills**：给父代理的高阶指令列表

### Skills 实战案例

- **Shop Amazon**：让 Claude 帮你在 Amazon 找产品、加购物车
- **Upwork Scrape Apply**：自动找 Upwork 工作并申请
- **Lead Scraping**：批量找潜在客户
- **Welcome Email Automation**：新客户欢迎邮件流程

### 制作方法

1. 告诉 Claude："帮我建一个做 X 的 skill"
2. Claude 生成 skill 定义
3. 测试 → 反馈 → 迭代 → 达到 98-99% 准确率

---

## 第七部分：权限模式

| 模式 | 行为 |
|------|------|
| **ask before edits** | 改任何文件前都问你 |
| **edit automatically** | 自动改已有文件，新建文件仍问 |
| **bypass permissions** | 完全不管，什么都干 |
| **plan mode** | 只读、只研究，不实际执行 |

### bypass permissions 风险

- 极端案例：Linux 上有人让它跑 `sudo rm -rf` 删光了整个硬盘
- 现实风险：不断创建不需要的临时文件，workspace 膨胀到 10000 个文件

---

## 第八部分：Plan Mode — 核心工作流

### 为什么 Plan Mode 价值连城

> **1 分钟规划 = 节省 10 分钟构建**

```
Scenario 1（无 Plan）：
构建 15min → 测试发现问题 → 重建 15min → 再测试 → 总计 35min+

Scenario 2（Plan Mode）：
规划 5min → 发现方案有问题 → 重规划 5min → 构建 15min → 一次过 → 总计 25min
```

### Plan Mode 的本质

- 只读、只研究、只写 plan
- 不触碰实际文件
- 把所有错误留在"纸面上"（plan 文件）而不是"物理世界"（代码）

### Plan Mode 交互流程

1. 描述你想要什么（语音转录 → 直接粘贴）
2. Claude 问你技术问题（框架选择、API 方案等）
3. 你回答，Claude 继续深化 plan
4. 看完 plan → 满意 → 切换 bypass permissions → 开始构建

---

## 第九部分：实战 — 从零构建 PandaDoc 竞品

### 项目目标

- 全栈 Web 应用（前端 + 认证 + 后端）
- 提案生成平台
- 支持 e-signature + 支付
- 模板化提案生成

### 构建流程

```
1. 用语音输入所有需求（不是技术语言，是业务语言）
2. Plan Mode 展开提问 → 你回答 → 形成详细 plan
3. 获得 plan 后 → bypass permissions
4. Claude 自动构建全栈代码
5. 你做 QA → 反馈 → Claude 迭代
```

### 实际成本

- 讲师的 SaaS 业务：年利润 $400 万
- Claude Code 订阅：$17/月
- 讲师自评：Claude Code 每月带来 **$10,000-$15,000** 的生产力提升

---

## 第十部分：MCP（Model Context Protocol）

### MCP 的作用

让 Claude Code 能够连接**任何没有官方 API 的服务**（如 Amazon）。

### 实战案例

通过 Chrome DevTools MCP，Claude 可以：
- 打开浏览器
- 操作网页
- 获取网页数据
- **相当于给任何网站做了一个 API**

### 自动化场景

- 自动逛 Amazon 找产品
- 自动抓取竞品信息
- 自动化任何有网页界面的工作

---

## 第十一部分：Agent Teams

- 一个主代理协调多个子代理
- 主代理做规划和协调
- 子代理各自独立执行任务
- 用 `delegate` 权限模式

---

## 第十二部分：部署

### 工具链

| 工具 | 用途 |
|------|------|
| **Netlify / Vercel** | 前端部署 |
| **Modal** | 后端 API 部署 |
| **GitHub Actions** | CI/CD |
| **Superbase** | 数据库 + 认证 |
| **Stripe** | 支付 |

### 讲师的 2026 版本工作流

- 讲师自己不懂编程
- 完全用 Claude Code 构建、部署
- 一周内上线多个 SaaS 产品

---

## 关键思维模式

### Verification Loop（验证循环）

> "AI 的价值不是一次做对，而是速度快——可以让它快速迭代 5 轮，每轮 5 分钟，而不是人类花 5 小时一次做对。"

```
Task → Do → Verify → Adjust → Do → Verify → ...
```

### Context 是瓶颈

- Token 越多，输出质量越低
- 永远把 context window 看作**稀缺资源**
- 用 sub-agents 隔离 context，用 skills 压缩指令

### Claude Code 的正确用法

```
不要：Task → Do → Task → Do → Task → Do → ...
要：Task → Plan → Do → Verify → Adjust → Done
```

---

## 金句摘录

> "The bottleneck is no longer typing. It's thinking."
> *——Nick Saraev（引用 Peter Steinberger 的洞见）*

> "AI is not going to be perfect the very first time. The value of AI is its speed."
> *——Nick Saraev*

> "A minute of planning saves you 10 minutes of building."
> *——Nick Saraev*

> "Agents change who can build things."
> *——Nick Saraev（引用 Peter Steinberger）*

---

## 总结：Claude Code 生产力飞轮

```
[高信息密度 CLAUDE.md] → [精确的 Plan] → [Verification Loop] → [Sub-agents 隔离 Context]
        ↑                                                        |
        └────────────────────────────────────────────────────┘
                          持续迭代优化
```

**核心洞察**：Claude Code 不是让你"少写代码"，而是让你**从打字者变成思考者 + 指挥官**。
