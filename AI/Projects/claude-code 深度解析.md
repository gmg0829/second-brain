---
created: 2026-04-14
tags:
  - AI-agent
  - engineering-analysis
  - coding-agent
  - terminal
  - open-source
source: https://github.com/claude-code-best/claude-code
stars: 15697
forks: 14897
---

# Claude Code Best V5 (CCB) — 工程深度分析

> Repository: `claude-code-best/claude-code`
> Stars: 15,697 | Forks: 14,987
> 定位: Anthropic Claude Code CLI 的反编译/逆向还原实现
> 分析日期: 2026-04-14

## 背景

目标让任何人都能本地运行 Claude Code 核心功能，支持第三方 API 兼容服务（OpenAI、Anthropic、Gemini、Grok），无需 Anthropic 官方账号。支持 npm 全局安装 (`bun i -g claude-code-best`) 或源码运行 (`bun run dev`)。

## 架构总览

```
┌─────────────────────────────────────────────────────────────────────┐
│  CLI Entry (cli.tsx) — Bun/Node 入口                                │
│  ├── --version 快速路径 (零模块加载)                                  │
│  ├── --dump-system-prompt 快速路径                                   │
│  └── main() → init() → launchRepl()                                 │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│  init.ts — 引导阶段                                                  │
│  ├── enableConfigs() 启用配置系统                                    │
│  ├── applySafeConfigEnvironmentVariables()                           │
│  ├── preconnectAnthropicApi() TCP 预连接                            │
│  ├── initSentry() 错误追踪                                          │
│  ├── initLangfuse() 全链路 LLM 追踪                                 │
│  ├── initializeGrowthBook() 特性开关                                 │
│  ├── fetchBootstrapData() 拉取引导数据                               │
│  └── initializeTelemetryAfterTrust()                                 │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│  ReplLauncher — REPL 主循环                                         │
│  ├── TUI 渲染 (Ink/React-Reconciler)                               │
│  ├── 命令行解析 (Commander.js)                                       │
│  └── /login, /model, /skills 等内置命令                            │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│  QueryEngine / query.ts — Agent 核心循环                            │
│  ├── runQuery(): 用户输入 → API → 工具执行 → 响应                    │
│  ├── 并发: tool streaming, 工具进度回调                              │
│  └── 循环迭代: 直到 stopReason                                       │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐
│ Tool System  │  │   MCP SDK    │  │    Compact System        │
│ (50+ 工具)   │  │   Client     │  │ (5 种压缩策略)           │
└──────────────┘  └──────────────┘  └──────────────────────────┘
```

## 核心模块详解

### 1. 构建系统 — build.ts

构建策略:

```
输入: src/entrypoints/cli.tsx (一个入口)
       ↓
Bun.build({ splitting: true }) — Code Splitting
       ↓ (~450 个 chunk 文件)
dist/cli.js + dist/cli-bun.js + dist/cli-node.js
```

**Feature Flag 机制** — 构建时通过 `FEATURE_<NAME>=1` 注入宏定义：

- P0 (默认启用): `AGENT_TRIGGERS`, `ULTRATHINK`, `LODESTONE`
- P1 (API 依赖): `EXTRACT_MEMORIES`, `VERIFICATION_AGENT`, `KAIROS_BRIEF`
- P2 (进阶): `DAEMON`, `WORKFLOW_SCRIPTS`, `COORDINATOR_MODE`, `LAN_PIPES`
- P3 (穷鬼模式): `POOR` (关闭记忆提取)

**Node.js 兼容性补丁** — 构建后自动替换 `import.meta.require` 为 `module.createRequire()`，并注入 `globalThis.Bun` polyfill。

### 2. 工具系统 — 50+ 内置工具

```
packages/builtin-tools/src/tools/
├── AgentTool/         # 子 Agent 编排 (fork/join 模式)
├── BashTool/          # Shell 执行 (含沙箱模式)
├── PowerShellTool/    # Windows PowerShell
├── FileReadTool/      # 读文件 (含缓存)
├── FileEditTool/      # 编辑文件
├── FileWriteTool/     # 写文件
├── GlobTool/          # 文件搜索
├── GrepTool/          # 代码搜索
├── TaskCreateTool/    # 任务管理
├── TaskOutputTool/    # 任务输出获取
├── TaskStopTool/      # 停止任务
├── TodoWriteTool/     # TODO 列表
├── WebSearchTool/     # 网页搜索
├── WebFetchTool/      # 网页抓取
├── WebBrowserTool/    # 浏览器自动化
├── MCPTool/           # MCP 协议工具
├── SkillTool/         # 技能调用
├── AgentTool/         # Agent 创建 (fork subagent)
├── SendMessageTool/    # 团队消息
├── TeamCreateTool/    # 创建 Agent 团队
├── TeamDeleteTool/    # 删除团队
├── BriefTool/         # KAIROS 简报
├── SleepTool/         # 延迟执行 (PROACTIVE/KAIROS)
├── MonitorTool/       # 监控工具
├── ScheduleCronTool/  # 定时任务 (Cron)
├── ReviewArtifactTool/ # 代码审查
├── REPLTool/          # 内联 REPL
├── LSPTool/           # LSP 集成
├── ChromeUse/         # Chrome 浏览器控制
├── ComputerUse/       # 屏幕截图+键鼠控制
├── VoiceMode/         # 语音输入
└── SnipTool/          # 历史剪裁
```

### 3. Agent 循环 — query.ts (核心)

```
用户输入
  │
  ├── @文件引用解析 ──► 读取文件内容
  ├── 权限检查 ──► canUseTool() hooks
  └── 上下文预取 ──► 记忆文件 / MCP 资源 / Skills
  │
  ▼
微压缩 (microcompact) ──► 时间触发的工具结果清理
  │
  ▼
自动压缩 (autocompact) ──► Token 超阈值时对话摘要
  │ (含 Snip / Session Memory / Context Collapse)
  ▼
API 调用 (Anthropic Messages API)
  │ (含 Token Budget / Thinking 块处理)
  ▼
流式响应循环 ──► 工具执行 ──► 进度回调
  │
  ▼
compaction boundary 消息注入 → TUI 渲染
```

### 4. 上下文压缩系统 — 5 层策略

| Layer | 策略 | 触发条件 |
|-------|------|----------|
| 1 | Snip (历史剪裁) | 手动/自动 |
| 2 | Microcompact (微压缩) | 时间衰减 / 计数衰减 |
| 3 | Auto-compact (自动压缩) | Token 超阈值 |
| 4 | Session Memory | 跨会话持久化 |
| 5 | Context Collapse | 仅内部使用 |

**Microcompact 核心逻辑**: 保留 `tool_use_id`，替换旧工具结果内容为 `[Old tool result content cleared]`，支持时间衰减和计数衰减两种策略。

### 5. MCP Client

```
packages/mcp-client/
├── types.ts       — 配置/连接/资源类型
├── errors.ts      — McpError/McpConnectionError/McpAuthError/...
├── transport/     — stdio / SSE / WebSocket / HTTP / SDK / Claude AI Proxy
```

### 6. Remote Control Server (RCS)

- `DAEMON` 模式下启动 headless bridge server
- 支持 Docker 自托管部署
- Web UI 用于远程会话管理和工作目录控制

### 7. @ant 包 — Claude 内部扩展

| 包 | 用途 |
|----|------|
| `@ant/ink` | React-Reconciler TUI 渲染框架 |
| `@ant/computer-use-mcp` | MCP 协议的 Computer Use |
| `@ant/computer-use-swift` | Swift 实现的 Computer Use |
| `@ant/computer-use-input` | 键鼠控制输入层 |
| `@ant/claude-for-chrome-mcp` | Chrome 浏览器集成 |

### 8. 权限系统

```
权限模式: accept-all / accept-edits / ask / deny

Hook 系统生命周期:
  PreToolUse / PostToolUse
  UserPromptSubmit
  SessionStart / Setup
  SubagentStart / SubagentFinish
  ToolError
  MinimizeThinking
```

### 9. 监控与可观测性

| 系统 | 用途 |
|------|------|
| **Langfuse** | LLM 调用 / 工具执行 / 多 Agent 全链路追踪 |
| **Sentry** | 错误追踪 |
| **GrowthBook** | Feature Flag 管理 |
| **Startup Profiler** | 模块加载耗时分析 |
| **OpenTelemetry** | 分布式追踪 (OTLP 导出) |
| **Asciicast** | 会话录制回放 |

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| 运行时 | Bun + Node.js 双支持 |
| UI | React 19 + react-reconciler + 自研 Ink TUI |
| 构建 | Bun.build + custom post-processing |
| 类型 | TypeScript 6 + Zod 4 |
| 工具定义 | `@anthropic-ai/sdk` |
| MCP 协议 | `@modelcontextprotocol/sdk` |
| Web 框架 (RCS) | Hono |
| 云厂商 SDK | AWS Bedrock / GCP Vertex / Azure |
| 容器化 | Docker (RCS 自托管) |
| 代码质量 | Biome (lint + format) |

## 亮点设计

### 1. Zero-Import 快速路径
`--version` 等特殊标志在加载任何模块前就返回结果。

### 2. Feature Flag + DCE 自动化
通过 `bun:bundle` 的 `feature()` 宏在构建时消除未启用功能的代码。

### 3. 记忆系统分层
- `EXTRACT_MEMORIES`: 每个 Turn 后提取关键信息
- `/dream`: 手动触发记忆整理
- `claude.md`: 持久化跨会话知识
- `KAIROS_BRIEF`: 离线简报生成

### 4. 多实例协作 (Pipe IPC)
- 同机: Unix Domain Socket (UDS)
- LAN: 自动发现 + mDNS/Bonjour
- 远程: Remote Control Server (WebSocket)

### 5. 双重 Entry Point
- `dist/cli-bun.js` — 完整 Bun 运行时
- `dist/cli-node.js` — Bun API polyfill + Node 运行时

### 6. /poor 穷鬼模式
关闭 `EXTRACT_MEMORIES` 和 `prompt_suggestion`，减少 API token 消耗。

## 两个工程对比

| 维度 | Open Harness Agent | Claude Code Best |
|------|--------------------|--------------------|
| **运行位置** | 云沙箱 (Vercel Firecracker VM) | 本地终端 (本地文件系统) |
| **沙箱策略** | 每次交互全新 VM，Snapshot/Restore | 无沙箱，直接本地 shell |
| **生命周期** | Durable Workflow (sleep + snapshot) | 会话级，无持久化 |
| **用户界面** | Web UI + Streaming | TUI (Ink/React-Reconciler) |
| **远程控制** | Vercel 托管 | 自托管 RCS (Docker) |
| **上线时间** | 需 Vercel 账号 | npm 全局安装即可 |

**最大差异**: Open Harness 是"云优先"的企业 Agent 平台；CCB 是"本地优先"的终端工具。两者解决不同场景，但核心 Agent 循环的设计思路惊人地相似。
