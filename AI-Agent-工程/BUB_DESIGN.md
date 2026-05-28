# Bub 项目设计文档

## 1. 项目概述

Bub 是一个 **hook-first** 的 Python Agent Runtime，旨在让 AI Agent 在共享环境（如群聊）中与人类协作。它基于 `pluggy` 插件框架构建，将 Agent 的每一轮处理流程拆解为可替换的 Hook，同时保持运行时本身极度精简。

- **语言**: Python 3.12+
- **许可证**: Apache-2.0
- **仓库**: https://github.com/bubbuild/bub
- **网站**: https://bub.build

---

## 2. 架构总览

### 2.1 分层架构

```
┌─────────────────────────────────────────────────────────┐
│                    CLI / Channels                        │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ CLI Chat │  │ bub run      │  │ Telegram Channel  │  │
│  │ (prompt_ │  │ (one-shot)   │  │ (python-telegram- │  │
│  │ toolkit) │  │              │  │  bot)             │  │
│  └────┬─────┘  └──────┬───────┘  └────────┬──────────┘  │
│       │               │                   │              │
├───────┴───────────────┴───────────────────┴──────────────┤
│                 ChannelManager                           │
│   消息分发 · 防抖缓冲 · 流式输出路由 · Session管理        │
├─────────────────────────────────────────────────────────┤
│                  BubFramework                            │
│   Hook注册 · Turn编排 · Plugin加载 · Error通知           │
├─────────────────────────────────────────────────────────┤
│                  HookRuntime                             │
│   安全的 Hook 执行包装器 · 异步/同步桥接 · 故障隔离       │
├─────────────────────────────────────────────────────────┤
│                   Hook Layer (pluggy)                     │
│  ┌──────────┬──────────┬──────────┬────────────────────┐ │
│  │resolve_  │build_    │run_model │ render_outbound    │ │
│  │session   │prompt    │          │ dispatch_outbound  │ │
│  └──────────┴──────────┴──────────┴────────────────────┘ │
│  ┌──────────┬──────────┬──────────┬────────────────────┐ │
│  │load_state│save_state│on_error  │ provide_channels   │ │
│  └──────────┴──────────┴──────────┴────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│                  Builtin Impl                             │
│  Agent(republic) · CLI · TapeStore · Skill发现 · Tools   │
├─────────────────────────────────────────────────────────┤
│               External Dependencies                       │
│  republic(LLM/Tape) · pluggy · any-llm-sdk · typer       │
└─────────────────────────────────────────────────────────┘
```

### 2.2 核心模块关系

```
bub/
├── __init__.py          # 公共 API 导出
├── __main__.py          # CLI 引导入口
├── framework.py         # BubFramework: 运行时核心
├── hookspecs.py          # Hook 契约定义
├── hook_runtime.py       # Hook 安全执行引擎
├── tools.py              # Tool 装饰器与注册中心
├── skills.py             # Skill 发现与加载
├── configure.py          # 配置管理 (pydantic-settings)
├── envelope.py           # 消息读取/标准化工具
├── types.py              # 核心类型别名
├── utils.py              # 工具函数
├── inquirer.py           # 交互式提问封装
│
├── builtin/              # 内置 Hook 实现
│   ├── hook_impl.py      # 核心 Hook 实现
│   ├── agent.py          # Agent 循环引擎
│   ├── cli.py            # CLI 命令
│   ├── settings.py       # Agent 配置
│   ├── tape.py           # Tape 服务
│   ├── store.py          # Fork/File Tape 存储
│   ├── context.py        # 上下文选择
│   ├── tools.py          # 内置工具集
│   ├── shell_manager.py  # 子进程 Shell 管理
│   └── auth.py           # OpenAI Codex OAuth
│
├── channels/             # 通道抽象
│   ├── base.py           # Channel 抽象基类
│   ├── manager.py        # ChannelManager
│   ├── message.py        # ChannelMessage 数据模型
│   ├── handler.py        # BufferedMessageHandler
│   ├── cli/              # CLI 通道 (prompt_toolkit + Rich)
│   └── telegram.py       # Telegram 通道
│
└── skills/               # 内置 Skills (git-clone)
```

---

## 3. Hook 系统设计

### 3.1 Turn 生命周期

每个入站消息经过一个完整的 **Turn Pipeline**，每个阶段都是可插拔的 Hook：

```
resolve_session  →  load_state  →  build_prompt  →  run_model
                                                          ↓
           dispatch_outbound  ←  render_outbound  ←  save_state
```

### 3.2 Hook 契约一览

| Hook | 类型 | 说明 |
|------|------|------|
| `resolve_session` | `firstresult` | 解析 session id |
| `load_state` | `call_many` | 加载 session 状态 |
| `build_prompt` | `firstresult` | 构建模型 prompt（支持文本或多模态） |
| `run_model` | `firstresult` | 同步执行模型调用 |
| `run_model_stream` | `firstresult` | 流式执行模型调用 |
| `save_state` | `call_many` | 持久化状态 |
| `render_outbound` | `call_many` | 渲染出站消息 |
| `dispatch_outbound` | `call_many` | 分发到外部通道 |
| `register_cli_commands` | `call_many_sync` | 注册 CLI 命令 |
| `onboard_config` | `call_many` | 交互式配置收集 |
| `on_error` | `call_many` | 错误观察 |
| `system_prompt` | `call_many_sync` | 系统提示 |
| `provide_tape_store` | `firstresult` | 提供 Tape 存储 |
| `provide_channels` | `call_many` | 提供通道实例 |
| `build_tape_context` | `firstresult` | 构建 Tape 上下文 |

### 3.3 Hook 执行策略

- **firstresult**: 按优先级倒序执行，返回第一个非 None 值（后注册的插件优先级更高）
- **call_many**: 执行所有实现，收集所有返回值
- **故障隔离**: 单个 Hook 实现的异常不会影响其他实现
- **异步/同步桥接**: `HookRuntime` 自动检测函数是否为协程并正确处理
- **跳过值**: `_SKIP_VALUE` 哨兵对象允许 Hook 实现优雅跳过

---

## 4. BubFramework 设计

### 4.1 核心职责

`BubFramework` 是整个运行时的中央协调器：

```python
class BubFramework:
    def __init__(self, config_file: Path)
    def load_hooks(self)           # 加载 builtin → 外部 plugins
    def create_cli_app(self)       # 收集 Hook 注册的 CLI 命令
    async def process_inbound(self, inbound, stream_output)  # 执行完整 Turn
    async def _run_model(self, ...)  # 模型调用 + 流式输出处理
    def hook_report(self)          # Hook 诊断报告
    def get_channels(self)         # 发现所有 Channel
```

### 4.2 Plugin 加载顺序

1. **内置 BuiltinImpl** 最先注册（最低优先级）
2. **外部 Plugins** 通过 `entry_points(group="bub")` 发现并注册（后注册覆盖内置）
3. 支持两种加载方式：
   - 直接加载实例
   - 调用工厂函数 `plugin(framework)` 返回实例

### 4.3 Turn 处理流程

```
process_inbound(envelope)
├── resolve_session → session_id
├── load_state × N → 合并 state
├── build_prompt → prompt
├── _run_model
│   ├── 流式: run_model_stream → iterate events → 拼接文本
│   │   └── 支持 OutboundChannelRouter.wrap_stream() 包装流
│   └── 非流式: run_model → 直接返回文本
├── save_state × N
├── _collect_outbounds (render_outbound × N + fallback)
└── dispatch_outbound × N
```

---

## 5. Agent 引擎设计 (`builtin/agent.py`)

### 5.1 架构

`Agent` 是 builtin 的模型执行引擎，基于 `republic` 库：

```
Agent
├── run(session_id, prompt, state)          # 非流式执行
│   └── _agent_loop → 步骤循环
│       └── _run_once → tape.run_tools_async()
│           └── LLM 调用 + Tool 执行 + 自动重试
│
├── run_stream(session_id, prompt, state)    # 流式执行
│   └── _agent_loop → 步骤循环
│       └── _run_once → tape.stream_events_async()
│
├── tapas (TapeService)                      # Tape 管理
│
└── _system_prompt()                         # 系统提示组装
    ├── framework.get_system_prompt()
    ├── tools_prompt (内置工具列表)
    └── skills_prompt (可用 Skill 列表)
```

### 5.2 Agent Loop 设计

每个步骤 (step) 的循环逻辑：

1. 调用 `tape.run_tools_async()` / `tape.stream_events_async()`
2. 解析返回结果类型：
   - **text**: 最终文本输出，结束循环
   - **工具调用/结果**: 继续下一步（`CONTINUE_PROMPT`）
   - **错误**: 
     - 如果是上下文长度错误 → 自动 handoff（最多重试 1 次）
     - 其他错误 → 抛出 RuntimeError
3. 最大步数限制：`max_steps`（默认 50）
4. 超时控制：`model_timeout_seconds`（`asyncio.timeout`）

### 5.3 System Prompt 组装

```
system_prompt =
    DEFAULT_SYSTEM_PROMPT
    + AGENTS.md 内容（workspace 下）
    + tools_prompt（内置工具列表）
    + skills_prompt（发现的 Skills）
```

### 5.4 Tape 机制

- **Session Tape**: `{workspace_hash}__{session_id_hash}` 命名，全局唯一
- **ForkTapeStore**: 每次运行在 fork 的 InMemory 存储上执行，结束后合并回父存储
- **Anchor**: 重要状态点标记（如 session/start、handoff）
- **Auto-handoff**: 上下文溢出时自动创建 anchor 截断历史
- **检索**: 支持全文搜索 + fuzzy 匹配

### 5.5 Tape 上下文选择 (`builtin/context.py`)

`default_tape_context()` 定义了从 Tape entries 重建消息列表的逻辑：

```
entries → messages:
  anchor    → [assistant] 系统锚点信息
  message   → [user/assistant] 聊天消息
  tool_call → [assistant] + tool_calls
  tool_result → [tool] 工具返回
```

---

## 6. Channel 系统设计

### 6.1 Channel 抽象

```python
class Channel(ABC):
    name: ClassVar[str]               # 通道名称标识
    async def start(stop_event)        # 启动监听
    async def stop()                   # 停止并清理
    async def send(message)            # 发送消息（可选）
    def stream_events(msg, stream)      # 包装输出流（可选）
    needs_debounce: bool               # 是否需要防抖
    enabled: bool                      # 是否启用
```

### 6.2 ChannelManager

`ChannelManager` 负责：

- **消息路由**: `on_receive()` → `process_inbound()`
- **防抖缓冲**: `BufferedMessageHandler` 用于需要防抖的通道（如 Telegram）
  - 活跃窗口内合并消息
  - debounce 等待后批量处理
- **流式输出**: `wrap_stream()` 将流事件路由到对应 Channel
- **Session 隔离**: 每个 session 独立的任务管理，`quit` 时可取消全部任务

### 6.3 CLI Channel (`channels/cli/`)

基于 `prompt_toolkit` + `Rich` 实现：

- **Agent/Shell 双模式**: Ctrl-X 切换
- **流式输出**: `Live` 面板实时刷新
- **命令补全**: 所有内置工具的 WordCompleter
- **历史记录**: 按 workspace hash 分离的 FileHistory

### 6.4 Telegram Channel (`channels/telegram.py`)

- 基于 `python-telegram-bot` v21+
- **消息解析**: 支持 text/photo/audio/sticker/video/voice/document/video_note
- **群聊过滤**: `@mention` 或关键词 "bub" 触发
- **访问控制**: `allow_users` / `allow_chats` 白名单
- **媒体支持**: 2MB 以下媒体自动下载为 base64 data URL
- **发送状态**: 持续发送 typing 状态

---

## 7. Tool 系统设计

### 7.1 Tool 装饰器

```python
@tool(name="fs.read", context=True)
def fs_read(path: str, offset: int = 0, limit: int = None, *, context: ToolContext) -> str:
```

特性：
- **自动注册**: 装饰后自动加入全局 `REGISTRY`
- **日志包装**: 自动记录调用参数、耗时、结果
- **Pydantic 支持**: 可定义 `model` 参数用于结构化输入
- **Context 注入**: `context=True` 时注入 `ToolContext`
- **名称别名**: `.` 分隔的名称自动转为 `_` 分隔（兼容不同 API）

### 7.2 内置工具一览

| 工具名 | 功能 | 类型 |
|--------|------|------|
| `bash` | 执行 Shell 命令 | 同步/异步/后台 |
| `bash.output` | 读取后台 Shell 输出 | 异步 |
| `bash.kill` | 终止后台 Shell | 异步 |
| `fs.read` | 读取文件 | 同步 |
| `fs.write` | 写入文件 | 同步 |
| `fs.edit` | 编辑文件（str_replace） | 同步 |
| `skill` | 加载 Skill 内容 | 同步 |
| `tape.info` | 查看 Tape 信息 | 异步 |
| `tape.search` | 搜索 Tape 条目 | 异步 |
| `tape.reset` | 重置 Tape | 异步 |
| `tape.handoff` | 创建 Handoff Anchor | 异步 |
| `tape.anchors` | 列出 Anchors | 异步 |
| `web.fetch` | HTTP GET 请求 | 异步 |
| `subagent` | 启动子 Agent | 异步 |
| `help` | 显示帮助 | 同步 |
| `quit` | 终止 Session | 异步 |

### 7.3 Shell Manager

`ShellManager` 单例管理所有子进程：

```python
class ShellManager:
    async start(cmd, cwd, session_id) → ManagedShell
    get(shell_id) → ManagedShell
    async terminate(shell_id) → ManagedShell
    async terminate_session(session_id) → int
    async wait_closed(shell_id) → ManagedShell
```

- 支持后台进程：`bash(background=True)` + `bash.output(shell_id)`
- 超时终止：先 SIGTERM，3 秒后 SIGKILL
- Session 级清理：`quit` 时终止该 session 所有 Shell

---

## 8. Skill 系统设计

### 8.1 发现机制

遵循 [Agent Skills](https://agentskills.io/) 规范，从三个源发现：

| 源 | 路径 | 优先级 |
|----|------|--------|
| Project | `<workspace>/.agents/skills/` | 最高 |
| Legacy | `<workspace>/.agent/skills/` | 高（已废弃） |
| Global | `~/.agents/skills/` | 中 |
| Builtin | `src/skills/` | 最低 |

### 8.2 SKILL.md 格式

```markdown
---
name: skill-creator
description: Guide for creating effective skills
---

Skill body content with template variables:
- ${SKILL_DIR} - skill 目录路径
- ${config.xxx} - 配置变量
```

### 8.3 内置 Skills

- **skill-creator**: 创建新 Skill 的指南
- **gh**: GitHub 相关操作
- **telegram**: Telegram 消息发送

---

## 9. 配置系统设计

### 9.1 配置架构

基于 `pydantic-settings` 的分层配置：

```python
@config()              # 注册到 CONFIG_MAP
class AgentSettings(Settings):
    model: str = "openrouter:openrouter/free"
    api_key: str | dict | None
    api_base: str | dict | None
    api_format: Literal["completion", "responses", "messages"]
    max_steps: int = 50
    max_tokens: int = 16384
    model_timeout_seconds: int | None
    client_args: dict | None
    verbose: int = 0

@config(name="telegram")
class TelegramSettings(Settings):
    token: str
    allow_users: str | None
    allow_chats: str | None
    proxy: str | None
```

### 9.2 配置优先级

1. **环境变量**: `BUB_MODEL`, `BUB_TELEGRAM_TOKEN` 等
2. **配置文件**: `~/.bub/config.yml` (YAML)
3. **默认值**: 类定义中的默认值

### 9.3 Provider-Specific 配置

支持按 Provider 分别配置 API Key 和 Base URL：

```bash
BUB_OPENAI_API_KEY=sk-xxx
BUB_ANTHROPIC_API_KEY=sk-ant-xxx
BUB_OPENROUTER_API_KEY=sk-or-xxx
```

---

## 10. Store 系统设计

### 10.1 ForkTapeStore

核心设计模式 —— **写时复制 + 合并**：

```
ForkTapeStore(parent)
├── fork(tape, merge_back)
│   ├── 创建 InMemoryTapeStore 子存储
│   ├── fetch_all: 父存储 entries + 子存储 entries（按 anchor 重置）
│   └── 结束时 merge_back: 将子存储 entries 写入父存储
│
└── reset(tape)
    ├── 标记 _current_was_reset
    └── merge_back 时也 reset 父存储
```

使用 `contextvars` 实现线程/协程安全的存储切换。

### 10.2 FileTapeStore

持久化到 `~/.bub/tapes/{tape_name}.jsonl`：

```jsonl
{"id": 1, "kind": "anchor", "payload": {"name": "session/start", ...}, "date": "..."}
{"id": 2, "kind": "message", "payload": {"role": "user", "content": "..."}, "date": "..."}
```

- **增量读取**: 维护 `_read_offset` 仅读取新增部分
- **线程安全**: `threading.Lock` 保护读写
- **fuzzy 搜索**: 基于 `rapidfuzz` 的令牌级模糊匹配

---

## 11. 数据流全景

```
用户输入
│
├── CLI: prompt_toolkit → ChannelMessage (lifespan=request_completed)
├── Telegram: python-telegram-bot → ChannelMessage (lifespan=typing_task)
│
↓ ChannelManager.on_receive()
│
├── 命令消息 ("," 开头) → 直接处理
├── 需要防抖 → BufferedMessageHandler 缓冲合并
│
↓ BubFramework.process_inbound(inbound)
│
├── resolve_session → session_id
├── load_state → state (含 _runtime_agent)
├── build_prompt → prompt (text 或 multimodal parts)
├── _run_model
│   ├── fork_tape → Agent.run/run_stream
│   │   ├── tape.ensure_bootstrap_anchor()
│   │   ├── system_prompt 组装
│   │   ├── agent_loop
│   │   │   └── _run_once → tape.run_tools_async()
│   │   │       ├── LLM 调用 (via republic + any-llm-sdk)
│   │   │       ├── Tool 调用 (从 REGISTRY)
│   │   │       └── 自动 handoff (上下文溢出)
│   │   └── merge_back → 写入 FileTapeStore
│   └── 流式 : dispatch 到 Channel (Live panel / Telegram)
├── save_state → lifespan.__aexit__
├── render_outbound → ChannelMessage
└── dispatch_outbound → ChannelManager → Channel.send()
```

---

## 12. CLI 命令体系

| 命令 | 说明 |
|------|------|
| `bub chat` | 交互式 REPL |
| `bub run <message>` | 一次性任务 |
| `bub gateway` | 启动通道监听器 |
| `bub onboard` | 交互式初始配置 |
| `bub login openai` | OpenAI Codex OAuth 登录 |
| `bub install [specs]` | 安装插件 |
| `bub uninstall <names>` | 卸载插件 |
| `bub update [names]` | 更新插件 |
| `bub hooks` (hidden) | 显示 Hook 注册情况 |

内部命令（`,` 前缀）：

| 命令 | 说明 |
|------|------|
| `,help` | 帮助 |
| `,quit`, `,exit` | 退出 |
| `,skill name=<name>` | 查看 Skill |
| `,tape.info` | Tape 信息 |
| `,tape.search query=<q>` | 搜索 Tape |
| `,fs.read path=<p>` | 读文件 |
| `,fs.write path=<p> content=<c>` | 写文件 |
| `,bash cmd=<c> background=true` | 后台 Shell |
| 任意其他命令 | 作为 Shell 执行 |

---

## 13. Plugin 系统

### 13.1 注册方式

```toml
# pyproject.toml
[project.entry-points."bub"]
my-plugin = "my_package.plugin:MyPlugin"
```

### 13.2 Plugin 结构

```python
from bub import hookimpl

class MyPlugin:
    def __init__(self, framework):  # 可选，接收 BubFramework 实例
        self.framework = framework

    @hookimpl
    def build_prompt(self, message, session_id, state):
        # 自定义 prompt 构建
        return modified_prompt

    @hookimpl
    def run_model(self, prompt, session_id, state):
        # 自定义模型调用
        return model_output
```

### 13.3 Plugin 管理

- **安装**: `bub install <spec>` — 支持 git URL、owner/repo、bub-contrib 包名
- **环境**: 独立的 uv 项目（`~/.bub/bub-project/`），隔离于 Bub 自身环境
- **更新**: `bub update` 升级所有或指定包

---

## 14. 关键设计决策

### 14.1 Hook-First 而非继承

选择 `pluggy` 而非传统的 OOP 继承体系，原因：
- 多个独立插件可以 concurrent 注册同一个 Hook，互不干扰
- 后注册的插件自动覆盖先注册的（`reversed()` 迭代），无需显式配置覆盖顺序
- 新功能可作为独立 pip 包分发，无需修改核心代码

### 14.2 Tape 而非可变 Session

选择 append-only Tape 而非可变 session state：
- 完整的操作记录可审计、可回放、可移交
- ForkTapeStore 模式允许 agent 在隔离环境中试验，结果可选择性合并
- 上下文重建逻辑（`build_tape_context`）与存储分离

### 14.3 Envelope 抽象

`Envelope = Any` 的宽松类型允许不同 Channel 使用不同消息格式，通过 `field_of()` / `content_of()` 统一读取。

### 14.4 Channel 的 Lifespan

ChannelMessage 携带 `lifespan: AbstractAsyncContextManager`，在 Turn 执行期间保持资源（如 Telegram typing 状态、CLI 的 request_completed 事件）。

### 14.5 Subagent

`subagent` 工具通过 `fork_tape` + 独立的 `session_id` 实现隔离的子任务执行，支持独立的模型选择和工具限制。

---

## 15. 依赖关系

### 15.1 核心依赖

| 包 | 用途 |
|----|------|
| `pluggy` | Hook 框架 |
| `republic` | LLM 调用抽象 + Tape 存储框架 |
| `any-llm-sdk[anthropic]` | 多 Provider LLM SDK |
| `pydantic` / `pydantic-settings` | 数据验证和配置管理 |
| `typer` | CLI 框架 |
| `rich` | 终端渲染 |
| `prompt-toolkit` | CLI 交互 |
| `python-telegram-bot` | Telegram Bot API |
| `rapidfuzz` | 模糊搜索 |
| `aiohttp` / `httpx` | HTTP 客户端 |
| `loguru` | 日志 |
| `pyyaml` | YAML 解析 |
| `inquirer-textual` | 交互式提问 |

### 15.2 包结构

```
pi-monorepo/
├── packages/tui/        # 终端 UI 库
├── packages/ai/         # 多 Provider LLM API
├── packages/agent/      # Agent 运行时
└── packages/coding-agent/  # 交互式 Coding Agent CLI
```

---

## 16. 测试体系

20 个测试文件覆盖：

| 文件 | 测试范围 |
|------|---------|
| `test_framework.py` | Turn 处理流程 |
| `test_hook_runtime.py` | Hook 执行引擎 |
| `test_builtin_hook_impl.py` | 内置 Hook 实现 |
| `test_builtin_agent.py` | Agent 循环 |
| `test_builtin_tools.py` | 内置工具 |
| `test_builtin_cli.py` | CLI 命令 |
| `test_channels.py` | 通道系统 |
| `test_skills.py` | Skill 发现 |
| `test_tape_search_output.py` | Tape 搜索 |
| `test_tools.py` | Tool 系统 |
| `test_store_*.py` | 存储系统 |
| 等 | |
