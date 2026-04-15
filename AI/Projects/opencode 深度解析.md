---
title: OpenCode 深度解析
tags: [agent, ai, coding, typescript, tui]
date: 2026-04-15
---

> The open source AI coding agent

## 项目概览

| 属性 | 值 |
|------|-----|
| **仓库** | [anomalyco/opencode](https://github.com/anomalyco/opencode) |
| **描述** | The open source coding agent |
| **Stars** | 143,286 |
| **Forks** | 16,142 |
| **语言** | TypeScript |
| **许可** | MIT License |
| **创建时间** | 2025-04-30 |
| **最后更新** | 2026-04-15 |
| **默认分支** | dev |

## 核心理念

OpenCode 是一个开源的 AI 编程代理，与 Claude Code 的核心理念相似，但有一些关键差异：

- **100% 开源** - 完全透明
- **不绑定 Provider** - 可使用任何 LLM (Claude, OpenAI, Google, 本地模型)
- **开箱即用的 LSP 支持** - 内置语言服务器协议
- **TUI 为核心** - 由 neovim 用户和 terminal.shop 创建者打造
- **客户端/服务器架构** - 可以远程控制，本地运行

## 技术架构

### Monorepo 结构

使用 **Bun** + **Turborepo** 管理多包项目：

```
packages/
├── opencode/          # 核心 CLI 应用
├── console/           # Web 控制台 (Solid.js)
├── desktop/           # 桌面应用 (Tauri)
├── desktop-electron/ # Electron 桌面
├── server/            # 后端服务 (Effect)
├── function/         # Cloudflare Functions
├── sdk/              # JavaScript SDK
├── web/               # 营销网站
├── docs/              # 文档
├── ui/                # UI 组件库
├── util/              # 工具函数
├── extensions/        # 扩展
├── identity/          # 认证服务
├── enterprise/        # 企业功能
├── slack/             # Slack 集成
└── plugin/            # 插件系统
```

### 核心技术栈

| 类别 | 技术 |
|------|------|
| **运行时** | Bun, Node.js |
| **语言** | TypeScript |
| **框架** | Effect (函数式), Solid.js (前端) |
| **数据库** | Drizzle ORM + SQLite |
| **Terminal** | node-pty |
| **UI** | 自研 TUI 组件 |
| **桌面** | Tauri, Electron |

## 核心功能模块

### 1. Agent 系统 (`packages/opencode/src/agent/`)

内置两个 Agent，可通过 `Tab` 键切换：

| Agent | 描述 | 权限 |
|-------|------|------|
| **build** | 默认，完全访问的开发 Agent | 全部权限 |
| **plan** | 只读，分析和代码探索 | 默认拒绝文件编辑 |

还有一个 **general** 子代理用于复杂搜索和多步骤任务。

### 2. 会话管理 (`packages/opencode/src/session/`)

- `processor.ts` - 会话处理
- `message.ts` / `message-v2.ts` - 消息处理
- `prompt.ts` - 提示词管理
- `compaction.ts` - 上下文压缩
- `summary.ts` - 摘要生成
- `revert.ts` - 操作回滚

### 3. 工具系统 (`packages/opencode/src/tool/`)

核心工具：

| 工具 | 功能 |
|------|------|
| `bash` | Shell 命令执行 |
| `read` | 文件读取 |
| `write` | 文件写入 |
| `edit` | 编辑文件 |
| `glob` | 文件搜索 |
| `grep` | 内容搜索 |
| `lsp` | Language Server Protocol |
| `webfetch` | 网页抓取 |
| `websearch` | 网页搜索 |
| `task` | 任务管理 |
| `todo` | 待办事项 |
| `apply_patch` | 补丁应用 |
| `skull` | MCP 工具 |

### 4. ACP 协议 (`packages/opencode/src/acp/`)

```typescript
// ACP (Agent Client Protocol)
// 用于外部客户端连接
acp/
├── agent.ts        # Agent 定义
├── session.ts     # 会话管理
└── types.ts       # 类型定义
```

### 5. TUI 系统 (`packages/opencode/src/cli/cmd/tui/`)

完整的终端 UI 实现：

- 组件系统 (dialog, prompt, spinner)
- 主题系统 (30+ 主题)
- 快捷键绑定
- 信号系统
- 插件系统

主题目录：`cli/cmd/tui/context/theme/`

支持的 themes: aura, ayu, carbonfox, catppuccin, cobalt2, dracula, gruvbox, kanagawa, material, monokai, nord, one-dark, opencode, tokyonight 等

### 6. Provider 支持 (`packages/opencode/src/provider/`)

多 Provider 支持：

- OpenAI
- Anthropic
- Google (Gemini)
- Alibaba (通义)
- Microsoft Copilot
- 本地模型

### 7. 存储层 (`packages/opencode/src/storage/`)

- SQLite + Drizzle ORM
- 支持 Bun 和 Node.js 适配器

### 8. LSP 集成 (`packages/opencode/src/lsp/`)

- LSP 客户端
- 语言服务器启动
- 代码补全和诊断

## 安装方式

```bash
# YOLO (推荐)
curl -fsSL https://opencode.ai/install | bash

# npm
npm i -g opencode-ai@latest

# Homebrew (macOS/Linux)
brew install anomalyco/tap/opencode

# Arch Linux
sudo pacman -S opencode

# Windows
scoop install opencode

# 桌面应用 (Beta)
brew install --cask opencode-desktop  # macOS
scoop install extras/opencode-desktop  # Windows
```

## CLI 命令

```bash
opencode chat              # 交互式会话
opencode chat --attach   # 附加到现有会话
opencode run "prompt"    # 单次执行
opencode serve           # 服务器模式
opencode models         # 列出可用模型
opencode providers      # 列出 Provider
opencode account       # 账户管理
opencode import        # 导入会话
opencode export       # 导出会话
opencode upgrade      # 升级
```

## 与 Claude Code 对比

| 特性 | OpenCode | Claude Code |
|------|---------|----------|
| **开源** | ✅ 100% | ❌ 部分 |
| **Provider** | 不绑定 | 绑定 Anthropic |
| **架构** | 客户端/服务器 | 集成 |
| **TUI** | 核心优先 | 支持 |
| **桌面应用** | Beta | 无 |
| **多平台** | CLI/TUI/Web/Desktop | CLI/ACP |
| **Stars** | 143k+ | 类似量级 |

## 开发规范 (AGENTS.md)

### 命名规则

- **强制单字命名** - 变量、函数默认使用单字
- 避免引入多字组合名称
- 如需多字，明确性高于简洁性

```typescript
// Good
const foo = 1
function journal(dir: string) {}

// Bad
const fooBar = 1
function prepareJournal(dir: string) {}
```

### 代码风格

- 没有 `try/catch` 除非必要
- 避免 `any` 类型
- 使用 Bun APIs (`Bun.file()`)
- 使用 TypeScript 类型推断
- 功能数组方法 (`flatMap`, `filter`, `map`)
- 避免 `else`，使用 early return

### Drizzle Schema

- 使用 snake_case 列名

```typescript
// Good
const table = sqliteTable("session", {
  id: text().primaryKey(),
  project_id: text().notNull(),
})
```

## 项目规模

从仓库规模来看，OpenCode 是一个**大型生产级项目**：

- 20+ 子包
- 完整的 Web 控制台
- 桌面应用 (Tauri + Electron)
- 服务端支持 (Cloudflare Workers)
- 认证系统
- 企业功能

## 关键文件

| 文件 | 描述 |
|------|------|
| [packages/opencode/src/agent/agent.ts](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/agent/agent.ts) | Agent 核心 |
| [packages/opencode/src/session/processor.ts](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/session/processor.ts) | 会话处理 |
| [packages/opencode/src/tool/registry.ts](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/tool/registry.ts) | 工具注册 |
| [AGENTS.md](https://github.com/anomalyco/opencode/blob/dev/AGENTS.md) | 开发规范 |

## 总结

OpenCode 是目前**最热门的开源 AI 编程代理**之一 (143k+ stars)。其核心优势：

1. **完全开源** - 无供应商锁定
2. **客户端/服务器架构** - 支持远程控制
3. **强大的 TUI** - 由专业团队打造
4. **多 Provider 支持** - 灵活性高
5. **完整生态** - CLI + Web + Desktop + Enterprise

与 Claude Code 相比，OpenCode ���强��**开放性**和**可扩展性**，适合需要自托管或多云部署的场景。