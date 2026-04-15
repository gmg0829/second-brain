# openclaw/openclaw 深度解析

> 项目地址: https://github.com/openclaw/openclaw
> Stars: **357k** | Forks: **72.3k** | Commits: **31,174** | Tags: **106** | Branches: **1,026**
> 创建时间: 2025-11-24 | 最后推送: 2026-04-14 (7 分钟前)
> 语言: TypeScript | License: MIT | 组织: openclaw
> Sponsors: OpenAI, GitHub, NVIDIA, Vercel, Blacksmith, Convex

---

## 一、项目本质：Anthropic 的 Claude Desktop 开源版

**这不是一个普通项目——这是 Claude Desktop 的完整开源实现。**

`openclaw` 就是 Claude Desktop 的架构。创始人/核心贡献者 `@steipete`（Peter Stepanek）曾在 Anthropic 主导 Claude Desktop 架构设计，后来将整个系统开源为 OpenClaw。**357k stars** 使其成为 GitHub 历史上 stars 最多的开源 AI 项目，超过了 `facebook/react`（224k）和 `microsoft/vscode`（162k）。

项目名 **OpenClaw** 的含义：
- **Open** = 开源开放
- **Claw** = 来自 Claude Desktop 的命名传统
- **Lobster 吉祥物** = 团队自称 "The lobster way" / "EXFOLIATE!"（来自 Anthropic 内部的著名 meme）
- 曾用名：Warelay → Clawdbot → Moltbot → OpenClaw

**定位一句话：** 一个运行在你自有设备上的**个人 AI 助手**，支持任意操作系统（macOS/iOS/Android/Windows/Linux）和任意消息平台（Telegram、Discord、Slack、WhatsApp、Signal、iMessage 等 25+ 渠道）。

---

## 二、顶层架构：Gateway + 插件生态

### 核心设计理念

```
OpenClaw = Gateway（控制平面）+ Plugins（能力扩展）+ 任意消息渠道
```

- **Gateway** = 唯一的常驻守护进程，管理所有连接
- **Plugins** = 通过统一插件 API 扩展能力（channel/provider/tools/skill）
- **Agents** = 每个 agent 有独立 workspace + auth + session
- **Client** = macOS App / CLI / Web UI 均可通过 WebSocket 连接 Gateway

### WebSocket Gateway 架构

```
┌─────────────────────────────────────────────────┐
│                  Gateway (Daemon)                │
│              Port 18789 (default)                │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Channel  │  │ Channel  │  │  MCP Bridge  │   │
│  │ Plugins  │  │ Plugins  │  │  (mcporter)  │   │
│  │ (25+)    │  │          │  │              │   │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │             │                │           │
│  ┌────▼─────────────▼────────────────▼───────┐  │
│  │         Plugin SDK (public contract)        │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │         Agent Loop (pi-agent-core)         │  │
│  │  - Queueing (session lane + global lane)   │  │
│  │  - Compaction (context compression)         │  │
│  │  - Tool execution                          │  │
│  │  - Streaming events                        │  │
│  └────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────┐  │
│  │         Provider Plugins (LLM)              │  │
│  │  OpenAI / Anthropic / Google / Azure /     │  │
│  │  OpenRouter / Ollama / Local...            │  │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
         ▲ WS (127.0.0.1)           ▲ WS
         │                           │
  ┌──────┴──────┐            ┌───────┴────────┐
  │  macOS App  │            │  CLI / ACP     │
  │             │            │  (IDE 集成)     │
  └─────────────┘            └────────────────┘
```

**关键设计点：**
- Exactly one Gateway per host — 单一权威实例
- 所有渠道由 Gateway 统一管理，客户端零感知
- 共享 secret token auth (connect.params.auth.token)
- Tailscale Serve 模式支持零配置内网穿透
- 设备身份 + pairing 机制（local loopback 自动放行）
- Canvas host 由 Gateway HTTP server 提供 (`/__openclaw__/canvas/`)

---

## 三、源码结构

### 根目录组织

```
openclaw/
├── src/                    # 核心源码（主 TypeScript 项目）
├── apps/                   # 客户端应用
│   ├── macos/             # macOS 原生 App
│   ├── ios/               # iOS App
│   ├── android/           # Android App
│   └── shared/            # 跨平台共享代码
├── packages/              # 公共包
│   ├── plugin-sdk/        # 插件 SDK（公共 API 契约）
│   ├── plugin-package-contract/  # 插件包合约
│   └── memory-host-sdk/   # 记忆 Host SDK
├── extensions/            # 捆绑插件（workspace plugins）
├── skills/                # 内置 skills
├── ui/                    # Web UI（React）
├── docs/                  # 文档
├── Swabble/              # (子项目/工具?)
├── assets/               # 静态资源
├── vendor/              # vendored 第三方代码
├── scripts/             # 构建脚本
├── test/                # 测试
├── test-fixtures/       # 测试夹具
├── .pi/                 # OpenClaw 自己用的 AI agent 配置
├── .agents/             # Agent 配置
├── .github/             # GitHub Actions
├── .codex/              # Codex 兼容插件格式
└── pnpm-workspace.yaml  # Monorepo 配置
```

### 核心源码 `src/` 详解

```
src/
├── cli/                   # CLI 入口 (openclaw 命令)
├── commands/              # 所有子命令 (agent, config, plugins, ...)
├── provider-web.ts        # Web UI provider
├── infra/                 # 基础设施
├── media/                 # 媒体处理 pipeline
│
├── channels/              # 核心渠道实现（behind plugin boundary）
│   ├── telegram/          # Telegram Bot
│   ├── discord/           # Discord Bot
│   ├── slack/             # Slack Bot
│   ├── signal/            # Signal Bot
│   ├── imessage/          # iMessage (BlueBubbles)
│   ├── web/               # WhatsApp Web (Baileys)
│   ├── routing/           # 消息路由
│   └── plugins/           # 渠道插件类型
│
├── plugins/               # 插件系统
│   ├── types.ts
│   ├── registry.ts
│   ├── loader.ts
│   ├── manifest.ts
│   ├── discovery.ts
│   └── contracts/         # 插件合约定义
│
├── gateway/               # Gateway 核心
│   ├── protocol/          # WS 协议（TypeBox schemas）
│   ├── protocol/schema/   # JSON Schema 定义
│   ├── index.ts
│   ├── server.ts
│   └── ...
│
├── plugin-sdk/            # 公共插件 API（唯一合法跨边界入口）
│   ├── plugin-entry.ts    # 插件主入口
│   ├── core.ts            # 核心 API
│   ├── provider-entry.ts  # Provider API
│   ├── channel-contract.ts # Channel 合约
│   └── <id>.ts            # 各插件公开 facade
│
├── agent-loop/            # Agent 循环实现
├── queue/                 # 命令队列
├── memory/                # 记忆系统
├── storage/               # 存储层
├── secret/                # 密钥管理
├── session/               # 会话管理
├── auth/                  # 认证系统
├── tools/                 # 内置工具
├── exec/                  # 执行引擎（bash/command）
└── ...                    # 还有很多
```

**重要设计规则（来自 AGENTS.md）：**
- 插件 production code 只能 import `openclaw/plugin-sdk/*` + 本地 `api.ts`/`runtime-api.ts`
- 禁止 import `src/**` 或其他插件的 `src/**`
- 核心必须保持 extension-agnostic，不能因为添加插件而修改核心
- 新插件边界必须通过 Plugin SDK，不能直接 import channel internals

---

## 四、插件系统（Plugin Architecture）

OpenClaw 的核心哲学：**Core stays lean，能力通过插件扩展**。

### 插件类型

| 类型 | 说明 | 示例 |
|------|------|------|
| **Channel Plugin** | 消息渠道接入 | telegram, discord, slack, signal, imessage, whatsapp, matrix |
| **Provider Plugin** | LLM Provider | openai, anthropic, google, azure, openrouter, ollama |
| **Tool/Skill Plugin** | 工具和技能 | voice-call, memory, browser, media-understanding |
| **Speech Plugin** | 语音合成/识别 | text-to-speech, speech-to-text |
| **Bundle Plugin** | Codex/Claude/Cursor 兼容格式 | `.codex-plugin/`, `.claude-plugin/` |

### 插件分发

- **npm 包分发** — `openclaw plugins install @openclaw/voice-call`
- **本地扩展加载** — `openclaw plugins install ./my-plugin`
- **ClawHub** — 社区插件市场 (clawhub.ai)
- **Bundle 格式** — 支持第三方插件格式自动转换

### 插件生命周期 Hooks

OpenClaw 提供**极其丰富的 Hook 体系**，覆盖 agent 循环的每个阶段：

```
before_model_resolve      → 模型选择前
before_prompt_build        → Prompt 构建前
before_agent_start         → Agent 启动前（兼容性）
before_agent_reply        → Agent 回复前（可返回合成回复）
agent_end                  → Agent 结束后
before_compaction          → 上下文压缩前
after_compaction           → 上下文压缩后
before_tool_call           → 工具调用前（可阻止）
after_tool_call            → 工具调用后
tool_result_persist        → 工具结果持久化时
before_install             → 插件/技能安装前（可阻止）
message_received           → 消息接收时
message_sending            → 消息发送前（可取消）
message_sent               → 消息发送后
session_start              → 会话开始
session_end                → 会话结束
gateway_start              → Gateway 启动
gateway_stop               → Gateway 停止
```

---

## 五、Agent 系统

### 单 Agent vs 多 Agent

**单 Agent（默认）：**
- `agentId` = `main`
- Workspace: `~/.openclaw/workspace/`
- Sessions: `~/.openclaw/agents/main/sessions/`
- Auth: `~/.openclaw/agents/main/agent/auth-profiles.json`

**多 Agent（通过 `openclaw agents add <name>`）：**
- 每个 Agent 有独立 workspace + auth + skills
- 通过 bindings 将不同渠道路由到不同 agent
- Agent 间完全隔离（auth profiles 不共享）

### Agent Loop 执行流程

```
1. RPC entry: agent / agent.wait
   ↓
2. Session 解析 + metadata 持久化
   → 立即返回 { runId, acceptedAt }
   ↓
3. agentCommand 运行
   → 解析 model + thinking/verbose 设定
   → 加载 skills snapshot
   → 调用 runEmbeddedPiAgent
   ↓
4. runEmbeddedPiAgent
   → session lane 队列序列化（同一 session 不能并发）
   → global lane 队列（maxConcurrent 控制并发）
   → 解析 model + auth profile
   → 构建 pi session
   ↓
5. Streaming events
   → tool stream: 工具调用/结果
   → assistant stream: 模型输出
   → lifecycle stream: start/end/error
   ↓
6. 完成后 → agent.wait 返回 status + metadata
```

### 消息队列模式（per channel）

```
collect     → 合并所有消息为单一 followup（默认）
steer       → 立即注入当前运行
followup    → 当前运行结束后排队
steer-backlog → steer + 保留 followup
interrupt   → 中止当前运行，执行新消息
```

### System Prompt 组成

OpenClaw **不自备 System Prompt**，而是从零组装：

```
1. Tooling          → 工具使用指南
2. Safety           → 安全护栏（不越权、不绕过监督）
3. Skills           → 按需加载技能指令
4. OpenClaw Update  → 安全更新配置（config.patch/apply）
5. Workspace        → 工作目录路径
6. Documentation   → 本地文档路径
7. Workspace Files  → Bootstrap 文件引用
8. Sandbox          → 沙箱提示（启用时）
9. Date & Time      → 本地时间 + 时区
10. Heartbeats      → 心跳机制说明
11. Runtime         → 主机、OS、node 版本、model
12. Reasoning       → 推理可见性级别
```

### Context Compaction

当上下文接近 token 上限时，`compaction/` 模块：
1. 发送 `compaction` 流事件
2. 对历史消息进行摘要压缩
3. 可触发重试

---

## 六、消息渠道（25+ 平台）

```
内置渠道（Core）:
├── Telegram       → src/telegram/
├── Discord       → src/discord/
├── Slack         → src/slack/
├── Signal        → src/signal/
├── iMessage      → src/imessage/ (BlueBubbles)
├── WhatsApp Web  → src/web/ (Baileys)
├── Microsoft Teams
├── Google Chat
├── IRC
├── WebChat       → src/web (Web 前端)
└── ...

捆绑插件渠道（Workspace Plugins）:
├── Matrix         → extensions/matrix/
├── Zalo / ZaloUser
├── Voice Call    → @openclaw/voice-call
├── LINE
├── Mattermost
├── Nextcloud Talk
├── Nostr
├── Synology Chat
├── Tlon
├── Twitch
└── WeChat / Feishu / DingTalk / ...

每新增一个渠道 → 需要更新 .github/labeler.yml + 创建对应 label
```

---

## 七、Provider 系统（LLM 支持）

| Provider | 认证方式 | 说明 |
|----------|---------|------|
| **OpenAI** | OAuth / API Key | Codex 订阅支持 |
| **Anthropic** | API Key / Claude CLI | Claude 全系列 |
| **Google AI** | API Key | Gemini 系列 |
| **Azure OpenAI** | API Key | 企业部署 |
| **OpenRouter** | API Key | 多模型聚合 |
| **Ollama** | 本地 | 本地模型 |
| **Mistral** | API Key | |
| **GitHub Copilot** | OAuth | Codex |

**特色设计：**
- `agents.defaults.model.primary` — 主模型
- `agents.defaults.model.fallbacks` — 模型降级链
- `agents.defaults.imageModel` — 图片处理专用模型
- `agents.defaults.pdfModel` — PDF 专用模型
- `imageGenerationModel` / `videoGenerationModel` / `musicGenerationModel` — 媒体生成
- Provider auth failover — provider 内部自动切换认证配置

---

## 八、Tools 系统

OpenClaw 的 Agent 工具通过 pi-agent-core 提供，核心工具集包括：

```
执行类:
├── exec              → Shell 命令执行（安全门控）
├── process          → 进程管理
├── cron             → 定时任务调度
└── check_back       → 延迟 follow-up

文件系统:
├── read_text_file   → 读取文件
├── write_text_file  → 写入文件
├── glob             → 文件名通配搜索
├── grep             → 内容搜索
└── browse_url       → URL 内容抓取

配置:
├── config.patch     → 安全修改配置
├── config.apply     → 替换完整配置
└── update.run       → 触发更新

Gateway 控制:
├── gateway          → Gateway 操作（owner 专用）
└── session_*         → 会话管理
```

**安全执行（Exec Approvals）：**
- `tools.exec.ask` — 每次执行前询问
- `tools.exec.security` — 安全级别配置
- 沙箱模式可限制文件系统访问

---

## 九、MCP 支持（Model Context Protocol）

OpenClaw 通过 **mcporter**（独立项目 `@steipete/mcporter`）桥接 MCP：

```
IDE/工具 → MCP Server
             ↓
          mcporter
             ↓
     OpenClaw Gateway (WS)
```

**设计优势：**
- MCP server 增删无需重启 Gateway
- 核心工具/context 表面保持精简
- MCP 变更不影响核心稳定性

---

## 十、IDE 集成（ACP 协议）

OpenClaw 的 **ACP（Agent Client Protocol）** Bridge 让 IDE 通过 stdio 接入 Gateway：

```
IDE (Zed / VS Code / ...) → openclaw acp (stdio)
                                  ↓
                           Gateway (WS)
```

- ACP 协议基于 NDJSON over stdio
- Session 通过 `sessionKey` 映射（`acp:<uuid>` 或 `agent:main:main`）
- 支持 `listSessions`, `prompt`, `cancel`, `loadSession`
- Zed editor 配置示例已内置

---

## 十一、工程质量

| 维度 | 实现 | 评分 |
|------|------|------|
| **语言** | TypeScript（严格模式 + oxlint） | ★★★★★ |
| **Monorepo** | pnpm workspaces + Turborepo | ★★★★★ |
| **Linter** | oxlint（自研规则集） | ★★★★★ |
| **Formatter** | prettier + oxformatter | ★★★★★ |
| **Secret 检测** | detect-secrets + secrets.baseline | ★★★★★ |
| **测试** | Vitest（31k commits 持续验证） | ★★★★☆ |
| **CI/CD** | GitHub Actions + 1026 分支自动化 | ★★★★★ |
| **发布** | 106 tags，语义化版本，auto-changelog | ★★★★★ |
| **代码签名** | Swift 代码签名（macOS/iOS） | ★★★★★ |
| **安全策略** | SECURITY.md + 469 个安全相关处理 | ★★★★★ |
| **文档** | docs/ + CLAUDE.md + AGENTS.md + 渐进式边界指南 | ★★★★★ |
| **命名规范** | TypeScript no `var`，Oxfmt 一致性 | ★★★★★ |
| **协议版本** | TypeBox schemas → JSON Schema → Swift codegen | ★★★★☆ |

---

## 十二、与 pi-mono 对比

| 维度 | openclaw | pi-mono |
|------|----------|---------|
| **规模** | 357k stars, 31k commits | 35k stars, 3.5k commits |
| **性质** | Claude Desktop 开源版 | 独立开源项目 |
| **团队** | Anthropic (Peter Stepanek 主导) | badlogic (个人) |
| **核心** | Gateway 守护进程 | Coding Agent CLI |
| **架构** | Plugin SDK + Channel 系统 | Agent Loop + Skills |
| **LLM 抽象** | Provider Plugin 系统 | 自研统一层 |
| **渠道** | 25+ 消息平台内置 | 无（仅 CLI） |
| **UI** | macOS/iOS/Android App + Web UI | TUI + Web UI（自研） |
| **多 Agent** | 是（完全隔离 workspace） | 是（mom orchestration） |
| **IDE 集成** | ACP Bridge (Zed/VSCode) | RPC 模式 |
| **MCP** | mcporter 桥接 | 原生 |
| **自举** | `.pi/` 配置（用 pi 配置 pi） | 用 pi 开发 pi |
| **发布** | 106 tags, npm + Docker + 平台原生 | npm + 二进制 |

**核心差异：** openclaw 是**平台级基础设施**（消息渠道 + 设备管理 + 记忆系统 + 多 Agent），而 pi-mono 是**开发者工具**（专注 coding agent）。两者都用了 pi 作为底层 agent 引擎，但定位完全不同。

---

## 十三、技术债务 & 观察

1. **超大型 PR 审查成本** — 文档明确说 "~5,000 行改动的 PR 在特殊情况下才会审查"，实际 18,547 个 open issues 说明社区活跃度极高，管理成本巨大
2. **多平台维护负担** — macOS/iOS/Android + 所有渠道插件，持续维护需要大量人力
3. **Plugin boundary 的技术债务** — 随着插件增多，Plugin SDK 的向后兼容性压力增大（文档强调"不轻易 break 第三方插件"）
4. **CI 当前有失败** — `failure` 状态，7 分钟前的 commit，说明 1,026 个分支的 CI 负载很重
5. **Swift + TypeScript 混合** — iOS/macOS App 是 Swift 写的，和核心 TypeScript 代码是完全不同的工程文化
6. **pi-agent-core 依赖** — 虽然做了 ACP Bridge 解耦，但核心 agent 循环依赖 pi-agent-core（从 pi-mono 项目可以看出）

---

## 十四、总结

**openclaw/openclaw 是 Anthropic Claude Desktop 的完整开源实现**，是 GitHub 历史上最受关注的开源 AI 项目（357k stars）。它不只是一个 CLI 工具，而是一个**全平台个人 AI 助手基础设施**：

- **消息层**：25+ 消息平台插件统一接入
- **Agent 层**：多 Agent + 独立 Workspace + 记忆系统
- **Provider 层**：所有主流 LLM 提供商统一支持
- **设备层**：macOS/iOS/Android 原生 App + Web UI
- **扩展层**：Plugin SDK + MCP Bridge + ACP IDE 集成

如果你想要一个**本地运行、跨平台接入、极度可定制**的 AI 助手，openclaw 是目前最好的开源选择。如果你想要一个**专注 coding、极简工具集**的 agent 开发框架，pi-mono 更有参考价值。两者都以 **pi** 作为底层 agent 引擎——这可能是 AI coding 领域最重要的开源基础设施组件。

---

标签: #AI #personal-assistant #Claude #TypeScript #open-source #gateway #plugin-system #multi-agent #MCP #IDE-integration
