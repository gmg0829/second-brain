# openai/codex 深度解析

> 项目地址: https://github.com/openai/codex
> Stars: **75.1k** | Forks: **10.6k** | Commits: **5,328** | Tags: **862** | Branches: **2,133**
> 创建时间: 2025-04-13 | 最后推送: 2026-04-14 (1 hour ago)
> 语言: **Rust** | License: **Apache-2.0** | 组织: openai
> CI 状态: failure (1 hour ago)

---

## 一、项目本质：OpenAI 的 Coding Agent 全栈平台

**这不是一个简单的 CLI 工具——这是 OpenAI Codex 的完整开源实现，是 Rust 写成的 production-grade coding agent 基础设施。**

75k stars（GitHub 上最大的开源 coding agent 项目之一），5,328 次 commits，**几乎全是 OpenAI 内部团队开发**（外部代码贡献是邀请制的，见 CONTRIBUTING.md）。

核心特点：
- **语言：Rust** — 不是 Python/TypeScript，是 Rust。这是整个项目的最大亮点，也是最难移植的护城河
- **三端合一**：CLI (Rust TUI) + Desktop App (codex app-server 后端) + Web (Codex Web = chatgpt.com/codex)
- **三层 SDK**：Python SDK + TypeScript SDK + MCP Server 模式
- **双构建系统**：Bazel (主构建) + Cargo (开发构建)

---

## 二、源码架构总览

### 根目录结构

```
openai/codex/
├── codex-rs/          # 核心 Rust Monorepo (3826 files)
├── codex-cli/         # CLI 入口包装 (14 files)
├── sdk/               # 公共 SDK
│   ├── python/        # Python SDK (codex_app_server)
│   ├── typescript/    # TypeScript SDK (@openai/codex-sdk)
│   └── python-runtime/# Python SDK 运行时
├── docs/              # 文档 (23 files)
├── scripts/           # 工具脚本
├── tools/             # 辅助工具
├── third_party/       # 第三方依赖
├── .codex/            # Codex 自己的 agent 配置
│   └── skills/         # 项目级 skills (bug triage, babysit-pr, etc.)
├── .devcontainer/     # Dev Container 配置
└── patches/           # 补丁 (29 files)
```

---

## 三、codex-rs 深度解析（核心 3826 文件）

### Crate 地图（77 个 crate）

```
TUI 层 (922 files):
├── tui/               # TUI 主界面 (ratatui 驱动)

Protocol 层:
├── protocol/          # 协议定义 (48 files)
└── app-server-protocol/  # App Server 协议 (669 files, TypeBox schemas)

Agent 核心:
├── core/              # Agent 核心逻辑 (524 files) — 最大危险区
├── skills/            # Skills 加载和管理 (72 files)
├── core-skills/       # 内置 core skills 引擎 (19 files)
├── code-mode/         # 代码模式
├── collaboration-mode-templates/

执行引擎:
├── exec/               # CLI exec 模式 (非交互运行)
├── exec-server/        # 命令执行服务 (JSON-RPC over UDS)
├── execpolicy/         # 执行策略引擎 (Starlark DSL)
├── execpolicy-legacy/  # 遗留策略引擎
├── shell-command/      # Shell 命令解析
├── shell-escalation/   # Shell 权限提升

沙箱系统 (跨平台):
├── sandboxing/         # 通用沙箱管理器 (Seatbelt/Landlock/bwrap)
├── linux-sandbox/      # Linux 沙箱 (bwrap + landlock)
├── windows-sandbox-rs/ # Windows 沙箱 (ACL + token)
├── process-hardening/  # 进程加固

LLM/Provider:
├── models-manager/     # 模型管理
├── model-provider-info/ # 模型元信息
├── responses-api-proxy/ # OpenAI Responses API 代理
├── lmstudio/          # LMStudio 支持
├── ollama/            # Ollama 支持
├── chatgpt/           # ChatGPT 订阅集成

MCP (Model Context Protocol):
├── codex-mcp/         # MCP Client (连外部 MCP 服务器)
├── mcp-server/        # MCP Server (Codex 作为 MCP 服务器供其他 agent 用)
└── rmcp-client/       # Remote MCP Client

Provider 集成:
├── codex-api/         # Codex API 客户端
├── codex-backend-openapi-models/  # OpenAPI 模型定义
├── codex-client/      # 通用 Codex 客户端
├── backend-client/     # 后端连接
├── debug-client/      # 调试客户端
└── cloud-tasks/       # 云端任务系统

工具:
├── tools/             # Agent 工具集 (51 files)
├── file-search/       # 文件搜索
├── git-utils/         # Git 操作
├── apply-patch/       # Patch 应用

登录/认证:
├── login/             # 登录系统 (OAuth/API Key)
├── keyring-store/     # 密钥链存储
└── secrets/           # 密钥管理

会话/状态:
├── state/             # 状态管理
├── rollout/           # Rollout/会话历史

网络/代理:
├── network-proxy/     # 网络代理
└── stdio-to-uds/      # stdio 到 Unix Domain Socket 桥接

可观测性:
├── otel/              # OpenTelemetry
├── feedback/           # 用户反馈
└── analytics/          # 分析

存储:
├── config/            # 配置管理 (TOML)
├── cloud-requirements/

辅助:
├── utils/             # 工具函数 (154 files)
├── vendor/            # Vendored 依赖 (62 files)
└── v8-poc/           # V8 实验
```

---

## 四、三种运行模式

### Mode 1: TUI 交互模式 (默认)

```
codex
```
- 使用 `ratatui` 库构建的全功能终端 UI
- 922 个文件，极度复杂
- `codex-tui` crate 是最大的 UI 组件
- 快捷键驱动、streaming 输出、文件 diff 展示

### Mode 2: exec 非交互模式

```bash
codex exec "fix the bug in auth.rs"
codex exec --ephemeral "summarize this"
```
- 将 prompt 作为参数传入
- `codex-rs/exec/` crate 实现
- 输出直接打印到终端
- `--ephemeral` 不保存会话历史

### Mode 3: MCP Server 模式

```bash
codex mcp-server
```
- Codex 本身作为 MCP 服务器运行
- 其他 MCP 客户端（如 Zed、Cursor、Claude Desktop）可以接入 Codex
- 使用 `@modelcontextprotocol/inspector` 调试
- `codex mcp` 管理 MCP server 配置

---

## 五、沙箱系统（三平台实现）

Codex 的沙箱是**目前最完整的跨平台实现**，超过了 openclaw 和 pi-mono。

### macOS — Seatbelt (sandbox-exec)

```
codex-rs/sandboxing/src/seatbelt.rs
```
- 使用 Apple 的 `sandbox-exec`
- Seatbelt policy: `seatbelt_base_policy.sbpl` + `seatbelt_network_policy.sbpl`
- 支持网络策略配置

### Linux — bwrap + Landlock

```
codex-rs/linux-sandbox/src/
├── bwrap.rs          # bubblewrap 实现
├── landlock.rs       # Landlock (内核 5.13+)
├── launcher.rs       # 沙箱启动器
├── proxy_routing.rs  # 代理路由
└── linux_run_main.rs # 主程序
```

- **bubblewrap (bwrap)**：无 root 权限的 namespace 沙箱
- **Landlock**：Linux 内核级别的文件系统沙箱（比 bwrap 更细粒度）
- 支持 `--full-auto` 模式

### Windows — ACL + Token

```
codex-rs/windows-sandbox-rs/src/
├── acl.rs            # ACL 访问控制
├── cap.rs            # Capabilities
├── token.rs          # Token 隔离
├── sandbox_users.rs  # 沙箱用户账户
├── firewall.rs       # Windows 防火墙
├── dpapi.rs          # Data Protection API
├── conpty/           # ConPTY (Pseudo Console)
├── elevated/         # 提权进程
└── workspace_acl.rs  # Workspace ACL
```

- 使用 Windows Sandbox (基于 Hyper-V)
- ACL + Capability-based security
- DPAPI 保护敏感数据
- **Setup Orchestrator**：复杂的沙箱初始化流程

### 三种沙箱策略

```toml
# config.toml
[sandbox]
mode = "workspace-write"  # 写权限范围
# or "read-only"
# or "danger-full-access"
```

| 策略 | 文件读取 | 文件写入 | 网络 |
|------|---------|---------|------|
| `read-only` | ✓ cwd + 特定目录 | ✗ | ✗ |
| `workspace-write` | ✓ 所有文件 | cwd + writable_roots | 配置决定 |
| `danger-full-access` | ✓ 无限制 | ✓ 无限制 | ✓ 无限制 |

---

## 六、Skills 系统

### Codex 自己的 Skills (`.codex/skills/`)

```
.codex/skills/
├── babysit-pr/       # 监视 PR 状态
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   ├── references/github-api-notes.md
│   ├── references/heuristics.md
│   └── scripts/gh_pr_watch.py
├── codex-bug/        # Bug 问题分类
│   └── SKILL.md
├── remote-tests/     # 远程测试
│   └── SKILL.md
└── test-tui/         # TUI 测试
    └── SKILL.md
```

### Skill 格式 (SKILL.md)

每个 skill 是一个目录，包含：
- `SKILL.md` — Skill 指令定义
- `agents/` — agent 配置（YAML）
- `references/` — 参考文档
- `scripts/` — 辅助脚本

### 内置 Skill Creator

```
codex-rs/skills/src/assets/samples/skill-creator/
```
内置了 skill 创建器 skill，说明 OpenAI 鼓励用户创建自己的 skills。

### Skill 加载引擎

```
codex-rs/core-skills/src/
├── lib.rs
├── loader.rs          # Skill 加载器
├── manager.rs         # Skill 管理器
├── invocation_utils.rs # Skill 调用工具
├── render.rs          # Skill 渲染
├── system.rs          # 系统级 skill
├── model.rs           # 模型相关
├── remote.rs          # 远程 skill
├── config_rules.rs    # 配置规则
└── env_var_dependencies.rs
```

### 代码级 Skill 注入

```
codex-rs/core-skills/src/injection.rs
codex-rs/core-skills/src/invocation_utils.rs
```
Skills 可以通过环境变量依赖、配置规则等机制注入到 agent 运行环境中。

---

## 七、execpolicy 执行策略引擎

### 设计哲学

Codex 的执行策略不是简单的 allow/deny 列表，而是**声明式 DSL**：

```starlark
# Policy 文件 (.codexpolicy)
prefix_rule(
    pattern = ["git", ["status", "commit", "push"]],
    decision = "allow",
    justification = "Git read operations are safe",
    match = [["git", "status"], "git commit -m 'fix'"],
    not_match = [["git", "reset", "--hard"]],
)

prefix_rule(
    pattern = ["rm", "-rf"],
    decision = "forbidden",
    justification = "Recursive forced delete is too dangerous. Use rm -ri instead.",
    match = ["rm -rf /"],
    not_match = ["rm -rf node_modules"],
)
```

### 特性

- **Starlark 语法** — 声明式、可测试
- **前缀匹配** — 命令按 token 前缀匹配
- **match/not_match** — 规则内建单元测试
- **justification** — 每个规则有人类可读的解释
- **host_executable** — 可信程序白名单（路径验证）
- CLI: `codex execpolicy check --rules policy.rules cmd args...`

### Legacy 引擎

`execpolicy-legacy/` 是旧的规则匹配器，保持向后兼容。

---

## 八、MCP 双向架构

Codex 同时实现了 **MCP Client** 和 **MCP Server**，形成双向能力：

### Codex 作为 MCP Client

```
codex-mcp/
├── src/mcp/              # MCP 协议实现
├── src/mcp/auth.rs       # OAuth 认证
├── src/mcp/skill_dependencies.rs  # Skill 依赖解析
└── src/mcp_connection_manager.rs   # 连接管理器
```

- Codex 可以连接**外部 MCP 服务器**
- 配置在 `config.toml` 的 `mcp_servers` 下
- 支持 `supports_parallel_tool_calls` 配置
- OAuth 登录支持（MCP 服务器认证）
- Skill 依赖自动发现

### Codex 作为 MCP Server

```
mcp-server/
├── src/codex_tool_config.rs   # 工具配置
├── src/codex_tool_runner.rs    # 工具执行器
├── src/exec_approval.rs       # 执行审批
├── src/patch_approval.rs      # Patch 审批
├── src/message_processor.rs   # 消息处理
└── src/outgoing_message.rs    # 出站消息
```

- `codex mcp-server` 将 Codex 暴露为 MCP 服务器
- 其他 MCP 客户端（Zed, Cursor, Claude Desktop, 任何 MCP 工具）可以接入 Codex
- Codex 的 tools 通过 MCP 协议暴露
- 执行审批（approval）通过 MCP 协议传递

### RMCP (Remote MCP) Client

```
rmcp-client/
├── src/oauth.rs              # OAuth 流程
├── src/rmcp_client.rs       # RMCP 客户端
├── src/elicitation_client_service.rs  # Elicitation
└── src/program_resolver.rs   # 程序解析
```

- 支持 OAuth 认证的远程 MCP 连接
- 支持 Streamable HTTP 传输

---

## 九、SDK 生态

### Python SDK

```python
from codex_app_server import Codex

with Codex() as codex:
    thread = codex.thread_start(model="gpt-5")
    result = thread.run("Say hello in one sentence.")
    print(result.final_response)
```

- 基于 `codex app-server` 的 JSON-RPC v2 over stdio
- Pydantic 模型（camelCase ↔ snake_case 自动转换）
- 支持异步
- 完整的示例集（14 个 examples + Jupyter notebook）
- 打包为 PyPI 包

### TypeScript SDK

```typescript
import { Codex } from "@openai/codex-sdk";

const codex = new Codex();
const thread = codex.startThread();
const turn = await thread.run("Diagnose the test failure");
console.log(turn.finalResponse);
```

- npm 包 `@openai/codex-sdk`
- Node.js 18+
- 支持 streaming events
- 完整的测试覆盖

### codex app-server

```
app-server/
├── app-server-protocol/    # 协议定义 (669 files, TypeBox schemas)
├── app-server-client/      # App Server 客户端
├── app-server-test-client/ # 测试客户端
└── ...
```

- Desktop App 的后端服务
- JSON-RPC v2 over stdio
- Protocol 通过 TypeBox schemas 定义
- 支持端到端的类型安全

---

## 十、exec-server 执行服务

```
exec-server/
├── src/server/           # 服务端
│   ├── handler.rs         # 请求处理器
│   ├── process_handler.rs # 进程处理
│   ├── file_system_handler.rs # 文件系统处理
│   ├── processor.rs      # 处理器
│   ├── session_registry.rs # 会话注册
│   ├── registry.rs       # 注册表
│   └── transport.rs      # 传输层
├── src/fs_sandbox.rs     # 文件系统沙箱
├── src/sandboxed_file_system.rs # 沙箱文件系统
├── src/remote_file_system.rs # 远程文件系统
├── src/remote_process.rs # 远程进程
└── src/protocol.rs       # 协议定义
```

- JSON-RPC over Unix Domain Socket（本地）或 WebSocket（远程）
- 沙箱化的文件系统和进程执行
- Session 管理
- 进程生命周期管理

---

## 十一、配置系统

### TOML 配置 (`~/.codex/config.toml`)

```toml
# 模型
[models]
default = "gpt-5"

# MCP Servers
[mcp_servers.docs]
command = "docs-server"
supports_parallel_tool_calls = true

[mcp_servers.docs.tools.search]
approval_mode = "approve"

# 沙箱
[sandbox]
mode = "workspace-write"

# 通知
[notify]
script = "/path/to/notify.sh"

# 执行策略
[[rules]]
pattern = ["git", "status"]
decision = "allow"
```

- `config.schema.json` 由 `just write-config-schema` 自动生成
- 环境变量覆盖：`CODEX_SQLITE_HOME`, `CODEX_CA_CERTIFICATE`, `RUST_LOG`

---

## 十二、工程质量

| 维度 | 实现 | 评分 |
|------|------|------|
| **语言** | Rust (严格 + Clippy + fmt) | ★★★★★ |
| **构建** | Bazel (主) + Cargo (开发) | ★★★★☆ |
| **Linter** | Clippy + argument-comment-lint (自定义) | ★★★★★ |
| **Formatter** | rustfmt | ★★★★★ |
| **测试** | cargo-nextest + Bazel | ★★★★★ |
| **CI** | GitHub Actions (2,133 branches) | ★★★★☆ |
| **发布** | 862 tags，GitHub Releases | ★★★★★ |
| **协议** | TypeBox → JSON Schema → TypeScript codegen | ★★★★★ |
| **跨平台** | macOS/Linux/Windows 完整沙箱 | ★★★★★ |
| **文档** | docs/ + AGENTS.md + inline comments | ★★★★☆ |
| **Secret** | `detect-secrets` baseline | ★★★★☆ |
| **CLA** | Contributor License Agreement | ★★★★★ |

**AGENTS.md 设计规范亮点：**
- Rust 模块目标 < 500 LoC（排除测试）
- 超 800 LoC 必须拆分新模块
- 优先使用 `match` exhaustive matching
- Clippy 规则强制执行
- `just argument-comment-lint` 强制参数注释规范
- 不得往 `codex-core` 随意添加代码（文档明确警告）
- `fmt` 之后不重跑测试

---

## 十三、与 pi-mono、openclaw 的三角对比

| 维度 | openai/codex | openclaw | pi-mono |
|------|---------------|----------|---------|
| **Stars** | 75.1k | 357k | 35k |
| **语言** | Rust | TypeScript | TypeScript |
| **架构** | Monorepo (77 crates) | Monorepo | Monorepo (7 packages) |
| **产品** | CLI + Desktop + Web | Gateway + App + Web | CLI only |
| **沙箱** | 三平台完整 | 基于 pi-agent-core | 基础 exec 隔离 |
| **Skills** | Skill 系统 + 项目级 skills | Skill 系统 + Plugin hooks | Skill 系统 |
| **MCP** | 双向 (client + server) | mcporter 桥接 | 原生 MCP |
| **IDE 集成** | TypeScript SDK + MCP Server | ACP Bridge | RPC 模式 |
| **SDK** | Python + TypeScript | 无 | 无 |
| **执行策略** | Starlark DSL (execpolicy) | Plugin hooks | 内置 tools |
| **协议** | TypeBox schemas | TypeBox schemas | TypeScript types |
| **外部贡献** | 邀请制 | 开放 PR | 开放 |
| **许可** | Apache-2.0 | MIT | MIT |
| **自举** | .codex/skills/ | .pi/ | .pi/ |

**核心差异：**

```
openclaw     → 平台型：消息渠道 + 多 Agent + 记忆系统（最全）
openai/codex → 工具型：Rust 性能 + 三端合一 + MCP 双向 + 完整沙箱（最安全）
pi-mono      → 框架型：极简理念 + 自举开发 + 开发者友好（最透明）
```

---

## 十四、技术债务 & 观察

1. **`codex-core` 膨胀警告** — AGENTS.md 明确说"resist adding code to codex-core"（524 个文件已经是最大危险区）
2. **Bazel + Cargo 双构建** — 复杂性加倍，Bazel lockfile 需要单独维护
3. **CI 当前失败** — `failure` 状态，2,133 个分支并行，CI 压力大
4. **文档外部化** — 大部分 docs/ 目录是 stub，真实文档在 `developers.openai.com/codex`。这是闭源/开源混合的内容策略
5. **外部贡献封闭** — 明确的"invitation only"政策。最大价值是 bug report、analysis 和 design discussion，不是代码
6. **Rust 学习曲线** — 对于想 fork/修改的开发者，Rust + Bazel 是极高的门槛（vs TypeScript 的低门槛）
7. **MCP Server 实验性** — `codex mcp-server` 是 experimental 功能，API 可能变化
8. **v8-poc 存在** — 说明团队在探索 V8 JavaScript 引擎集成（可能是 WebAssembly 或脚本化扩展方向）

---

## 十五、总结

**openai/codex 是 OpenAI Codex 的 production-grade Rust 实现**，代表了 coding agent 领域的最高工程水准：

- **Rust 语言**：性能、安全、并发原生支持
- **三平台沙箱**：macOS Seatbelt + Linux bwrap/Landlock + Windows ACL/Capability
- **双向 MCP**：既可以驱动外部 MCP 服务器，也可以被其他 agent 通过 MCP 驱动
- **三层 SDK**：Python + TypeScript + MCP Server，覆盖所有主流编程语言和 IDE
- **execpolicy DSL**：声明式、可测试的命令执行策略引擎
- **双构建系统**：Bazel 规模化构建 + Cargo 快速开发迭代

如果你是**应用开发者**想快速集成 coding agent 能力，Python/TypeScript SDK 是最佳起点。如果你是**安全研究者**，三平台沙箱实现值得深入研究。如果你是**AI infra 工程师**，execpolicy DSL 和 MCP 双向架构是当前最完整的设计参考。

---

标签: #AI #coding-agent #Rust #OpenAI #sandbox #MCP #TypeScript #Python #SDK #open-source
