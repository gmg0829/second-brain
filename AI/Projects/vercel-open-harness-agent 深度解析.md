---
created: 2026-04-14
tags:
  - AI-agent
  - engineering-analysis
  - coding-agent
  - vercel
source: https://github.com/vercel-labs/open-agents
---

# Open Harness Agent — 工程分析

> Repository: `vercel-labs/open-agents`
> 又名: Open Harness / Open Agents
> 分析日期: 2026-04-14

## 概览

一个基于 AI SDK 构建的 AI 编程 Agent 系统，后端跑在 Vercel 云沙箱（Firecracker MicroVMs）里，用户通过 Web UI 与 Agent 交互，Agent 在云端沙箱中读写代码、执行命令。

## 架构总览

```
┌─────────────────────────────────────────────────────────┐
│  Web UI (Next.js App Router)                            │
│  ├── 会话管理 / 聊天界面 / Sandbox 状态指示器            │
│  └── API Routes (Chat, Sandbox, GitHub, Workflow)        │
└──────────────────┬──────────────────────────────────────┘
                   │ createChatRuntime()
┌──────────────────▼──────────────────────────────────────┐
│  Agent (@open-harness/agent)                            │
│  ├── ToolLoopAgent (Vercel AI SDK)                     │
│  ├── 工具集: read/write/edit/grep/glob/bash/task/skill │
│  ├── Subagents: explorer / executor / design           │
│  └── System Prompt Builder (model-family aware)        │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│  Sandbox (@open-harness/sandbox)                        │
│  ├── VercelSandbox (Firecracker MicroVM)               │
│  ├── GitHub 凭证桥接 (自动注入 HTTP Auth)               │
│  ├── 文件/命令抽象层                                     │
│  └── Snapshot / Hibernation / Restore                  │
└─────────────────────────────────────────────────────────┘
```

## 核心组件

### 1. Agent (packages/agent)

**模型层:**
- 默认模型 `anthropic/claude-opus-4.6`，通过 `gateway()` 适配器支持多模型（Claude/GPT/Gemini）
- 支持 per-call 模型选择和 subagent 模型覆盖
- **Cache Control**: 对 Anthropic 模型自动注入 `cacheControl: { type: "ephemeral" }`，优化 token 成本

**工具集 (10 个):**

| 工具 | 用途 |
|------|------|
| `read` | 读文件（自动处理 `/README.md` → `workingDir/README.md` 的路径容错）|
| `write` | 写文件（自动创建父目录，自动大文件走 SDK streaming API）|
| `edit` | 字符串替换（精确匹配，支持 replace_all）|
| `grep` / `glob` | 代码搜索 |
| `bash` | 命令执行（危险命令需 approval，`detached` 模式支持后台进程）|
| `task` | 启动 subagent |
| `skill` | 调用技能扩展 |
| `ask_user_question` | 向用户提问 |
| `web_fetch` | 网页抓取 |

**System Prompt 分层策略:**

```
CORE (通用规则) → 模型家族覆盖 (Claude/GPT/Gemini) → 环境详情 → 云沙箱指令 → 自定义指令 → 技能列表
```

每个模型家族有专属行为调整：Claude 用 todo 列表追踪任务，GPT 强调自主迭代，Gemini 要求极简。

### 2. Subagents (3 个专业化 Agent)

| Subagent | 模型 | 步数限制 | 用途 |
|----------|------|----------|------|
| `explorer` | claude-haiku-4.5 | 100 步 | 只读代码探索，回答问题不修改文件 |
| `executor` | claude-haiku-4.5 | 100 步 | 实现任务，文件读写，全工具 |
| `design` | claude-haiku-4.5 | 100 步 | 高质量前端 UI 生成 |

所有 subagent **不能提问**，零样本执行，必须用固定格式回复 `Summary` + `Answer`。

### 3. Sandbox (packages/sandbox)

**Vercel Sandbox SDK 封装:**

- 在 Firecracker MicroVM 中运行，每次交互一个新 VM
- **命名沙箱 + 持久化**: 可通过 `name` 恢复之前的 VM 状态
- **Snapshot**: 文件系统快照，支持休眠/恢复（hibernation）
- **GitHub 凭证桥接**: 自动将用户 OAuth token 注入到 VM 网络请求中（无需在命令中暴露 token）
- **命令执行**:
  - `exec()`: 同步执行，50K 输出截断，120s 超时
  - `execDetached()`: 后台进程，2s 快速探活
- **预览 URL**: 自动为暴露的端口生成 `{port}-{hash}.vercel.run` URL
- **超时管理**: 主动式超时（比 Vercel API 硬限制提前 30s 触发）

### 4. Sandbox 生命周期管理

```
active ──( inactivity 30min )──► hibernating ──► hibernated
  │                                  ▲               │
  │                            resume/重新连接        │
  │                                                    │
  └────────( hard timeout 5h )───────────────────────┘
```

- **Durable Workflow**: 用 Vercel Workflow SDK 的 `sleep()` 做持久休眠调度（ survive deploys 和 serverless cold starts）
- **Lease 机制**: 每个 session 最多一个 workflow run，防止并发冲突
- **Safety Net**: 状态 API 每 15s 轮询，超期未休眠则触发 workflow kick

### 5. 技能系统

- 技能发现：扫描 sandbox 内 `~/.hermes/skills/` 和项目内 skills 目录
- 技能缓存：按 `sessionId + sandboxState` 缓存避免重复扫描
- 支持 **model invocation** 和 **user invocation**（slash commands）两种模式

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| 运行时 | Bun |
| Web 框架 | Next.js App Router (TypeScript) |
| Agent 框架 | `ai` SDK (Vercel) — `ToolLoopAgent` |
| 沙箱 | `@vercel/sandbox` (Firecracker MicroVMs) |
| 数据库 | Neon (Postgres) + Drizzle ORM |
| 持久化 | Vercel Workflows (Temporal SDK) |
| 代码质量 | Ultracite (oxlint + oxfmt) |
| 验证 | Zod schemas |

## 亮点设计

1. **多模型适配**: 通过 `gateway()` 和 model-family 检测，自动调整 system prompt 行为
2. **凭证安全**: GitHub token 通过 Vercel 网络策略注入，不出现在命令参数中
3. **Subagent 隔离**: explorer/executor/design 分工明确，主 agent 只做编排
4. **沙箱持久化**: 命名沙箱 + Snapshot/Restore 实现"边工作边休眠"
5. **Durable 调度**: 用 Workflow `sleep()` 而非 setTimeout，确保 serverless 冷启动不影响休眠逻辑
6. **自动 checkpoint**: 每次有意义改动都要求 commit + push，防止 VM 丢失工作
7. **Context 管理**: `addCacheControl()` 自动为 Anthropic 模型优化缓存

## Lessons Learned (工程陷阱)

- snapshot 后 VM 会自动 stop
- `sdk.domain(port)` 对无路由端口抛异常
- reconnect 时 `remainingTimeout=0` 导致本地 wrapper 立即过期
- 不要在 `/api/sandbox/reconnect` 中触发 activity 刷新
- Lifecycle workflow 必须 retry "not-due-yet" 否则沙箱永不休眠
- GitHub App 必须设为 **public** 才能在 org 上出现安装选项

## 文件结构

```
apps/
  web/                    # Next.js Web UI
    app/
      api/chat/           # Chat API + activity tracking
      api/sandbox/        # Sandbox CRUD + reconnect + status
      workflows/          # Durable Workflow (sandbox-lifecycle)
    lib/
      github/             # GitHub OAuth token 管理
      sandbox/            # 生命周期 + 配置 + Vercel CLI auth
packages/
  agent/                  # 核心 Agent + 工具 + Subagents + System Prompt
  sandbox/                # Vercel Sandbox 封装
  shared/                 # 共享工具
```

## 总结

Vercel 内部使用的 AI 编程 Agent 产品，从 Web UI 到云端沙箱到 GitHub 集成到 Git 工作流到自动休眠恢复，全链路自洽。核心工程价值在于把"在云 VM 里跑 AI coding agent"这件事做得足够稳。
