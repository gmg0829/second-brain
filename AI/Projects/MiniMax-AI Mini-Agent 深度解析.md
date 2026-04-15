# MiniMax-AI/Mini-Agent 深度解析

> 项目地址: https://github.com/MiniMax-AI/Mini-Agent
> Stars: **2,393** | Language: **Python** | License: **MIT**
> 创建时间: 2025-10-31 | 最后推送: 2026-02-14
> 组织: MiniMax-AI

---

## 一、项目定位与核心理念

**Mini Agent 是一个教学级的单 Agent 演示项目**，明确声明自己是一个"demo"，目标是展示 Agent 的核心执行管道和生产级特性。它不是生产级系统，而是**理解 Agent 运行机制的教科书级参考实现**。

对比三大开源 Agent 框架：

| | **openai/codex** | **MiniMax-AI/Mini-Agent** | **openclaw** |
|---|---|---|---|
| **定位** | Production-grade 全栈平台 | 教学级参考实现 | 平台型多 Agent 系统 |
| **语言** | Rust | Python | TypeScript |
| **复杂度** | Monorepo (77 crates) | 平铺式 (约 20 模块) | 平台架构 |
| **沙箱** | 三平台完整沙箱 | 无（依赖 host 环境） | 基础隔离 |
| **文档** | 外部化到网站 | 自包含 MD 文档 | 自包含 |
| **坦诚度** | 不说自己是 demo | **明确声明 demo 性质** | 不明确 |

**核心亮点：代码极度透明，文档极度坦诚。** 这是它最大的价值——没有任何隐藏的实现，Agent 执行管道一目了然。

---

## 二、源码架构

### 目录结构

```
mini_agent/
├── agent.py              # Agent 主循环 (~350 行)
├── cli.py                # CLI 交互界面 (~450 行)
├── config.py             # 配置管理 (Pydantic models)
├── llm/                  # LLM 客户端
│   ├── base.py           # 抽象基类
│   ├── anthropic_client.py  # Anthropic/MiniMax 协议实现
│   ├── openai_client.py     # OpenAI 兼容协议
│   └── llm_wrapper.py    # 统一入口（provider 路由）
├── tools/                # 工具系统
│   ├── base.py           # Tool 抽象基类 + ToolResult
│   ├── bash_tool.py      # Bash/Shell/PowerShell 执行
│   ├── file_tools.py     # Read/Write/Edit
│   ├── note_tool.py      # Session Note (跨会话记忆)
│   ├── mcp_loader.py     # MCP 客户端加载器
│   ├── skill_loader.py   # Claude Skills 加载器
│   └── skill_tool.py     # Skill 调用工具
├── schema/               # 数据模型
│   └── schema.py         # Message, ToolCall, LLMResponse (Pydantic)
├── acp/                  # ACP 协议桥接
│   └── __init__.py       # ACP Server 封装
├── skills/               # Claude Skills (git submodule)
│   ├── algorithmic-art/
│   ├── artifacts-builder/
│   ├── canvas-design/    # 含 50+ 字体文件
│   ├── document-skills/  # docx + pdf + pptx + xlsx
│   ├── internal-comms/
│   ├── mcp-builder/
│   ├── skill-creator/
│   ├── slack-gif-creator/
│   ├── template-skill/
│   ├── theme-factory/
│   └── webapp-testing/
└── retry.py              # 重试机制

examples/                 # 6 个渐进式示例
docs/                     # 开发指南 + 生产指南 (中英双语)
tests/                    # 全面测试覆盖
scripts/                  # 自动化配置脚本
```

---

## 三、Agent 执行管道（核心 350 行）

`agent.py` 是整个项目的灵魂。以 `Agent.run()` 为核心的执行循环：

```
用户输入
  ↓
检查取消事件 (Esc/Ctrl+C)
  ↓
检查 token 限制 → 触发消息摘要
  ↓
格式化工具列表 + 日志记录
  ↓
LLM.generate() → 接收响应
  ↓
打印 thinking (Extended Thinking)
  ↓
打印 assistant content
  ↓
┌─ 无 tool_calls → 返回结果，结束
│
└─ 有 tool_calls → 逐个执行工具
    ↓
    工具执行结果加入消息历史
    ↓
    检查取消事件
    ↓
    返回 step 循环
```

### 关键设计决策

**1. 消息摘要（Context 管理）**

```python
# 双阈值触发：本地估算 + API 报告
should_summarize = (
    estimated_tokens > self.token_limit or
    self.api_total_tokens > self.token_limit
)
```

摘要策略（Agent 模式）：
- 保留所有 user 消息（用户意图）
- 每次 user-user 之间执行一次 LLM 摘要
- 结构：`system → user1 → summary1 → user2 → summary2 → ...`
- 摘要后跳过下一轮 token 检查（避免连续触发）
- 使用 tiktoken `cl100k_base` 编码器精确计算

**2. 取消机制（三个层次）**

```python
# 层次 1: step 循环开始前检查
if self._check_cancelled():
    self._cleanup_incomplete_messages()
    return "Task cancelled by user."

# 层次 2: 工具执行前检查
if self._check_cancelled(): ...

# 层次 3: 每个工具执行后检查
if self._check_cancelled(): ...
```

外部通过 `self.cancel_event: asyncio.Event` 设置取消信号。CLI 端启动 Esc 键监听线程：

```python
# Unix: select + termios
# Windows: msvcrt
# 检测到 Esc (0x1b) → cancel_event.set()
```

**3. 不完整消息清理**

取消时只清理当前 step 的不完整消息（最后一个 assistant message 及其后续 tool results），已完成步骤全部保留。这保证了消息历史的一致性。

**4. Tool Result 错误处理**

```python
try:
    result = await tool.execute(**args)
except Exception as e:
    # 工具执行异常 → 转为 ToolResult 失败
    result = ToolResult(success=False, error=f"...{traceback}...")
```

工具层异常不会打断 Agent 循环，而是作为 tool result 反馈给 LLM，让模型决定如何处理。

---

## 四、LLM 客户端设计（Provider 模式）

### 架构

```
LLMClient (llm_wrapper.py)
  ├── AnthropicClient (Anthropic 协议)
  │     ├── thinking 块解析
  │     ├── tool_use 块解析
  │     └── Anthropic token usage 提取
  └── OpenAIClient (OpenAI 协议)
        └── ...
```

### MiniMax M2.5 的 Anthropic 兼容层

MiniMax M2.5 使用 **Anthropic 兼容 API**（`/anthropic` endpoint），但 MiniMax 的 `api.minimax.io` / `api.minimaxi.com` 需要特殊处理：

```python
# llm_wrapper.py 自动处理 endpoint 路由
if "api.minimax" in api_base:
    if provider == "anthropic":
        full_api_base = f"{api_base}/anthropic"
    elif provider == "openai":
        full_api_base = f"{api_base}/v1"
else:
    # 第三方 API 直接使用
    full_api_base = api_base
```

### Anthropic Client 的消息格式转换

```python
# Assistant 消息（含 thinking + tool_use）
{
    "role": "assistant",
    "content": [
        {"type": "thinking", "thinking": "..."},
        {"type": "text", "text": "..."},
        {"type": "tool_use", "id": "...", "name": "...", "input": {...}}
    ]
}

# Tool 结果消息（Anthropic 格式）
{
    "role": "user",  # 注意：是 user，不是 tool
    "content": [
        {"type": "tool_result", "tool_use_id": "...", "content": "..."}
    ]
}
```

### Token Usage 提取

Anthropic 返回的 usage 包含 cache tokens：

```python
cache_read = getattr(response.usage, "cache_read_input_tokens", 0) or 0
cache_create = getattr(response.usage, "cache_creation_input_tokens", 0) or 0
total_input = input_tokens + cache_read + cache_create
```

---

## 五、工具系统

### 工具基类

```python
class Tool:
    name: str          # 工具名称
    description: str   # 给 LLM 的描述
    parameters: dict   # JSON Schema 格式

    async def execute(**kwargs) -> ToolResult
    def to_schema() -> dict   # Anthropic 格式
    def to_openai_schema() -> dict  # OpenAI 格式
```

### BashTool（最复杂的工具）

**前后台执行分离：**

| 工具 | 功能 | 参数 |
|------|------|------|
| `bash` | 执行命令（前台/后台） | `command`, `timeout`, `run_in_background` |
| `bash_output` | 读取后台进程输出 | `bash_id`, `filter_str` (正则) |
| `bash_kill` | 终止后台进程 | `bash_id` |

**BackgroundShellManager 架构：**

```
_background_shells: dict[bash_id] = BackgroundShell
_monitor_tasks: dict[bash_id] = asyncio.Task

BackgroundShell:
  - output_lines: list[str]  # 收集的行
  - last_read_index: int      # 上次读取位置（增量读取）
  - status: running|completed|failed|terminated|error
  - exit_code: int
```

核心设计：**`bash_output` 永远只返回"新"输出**，通过 `last_read_index` 实现增量读取。这对于监控长运行时服务（如 dev server）非常有用。

**filter_str 正则过滤：**

```python
# 只返回匹配 regex 的行
new_lines = [line for line in new_lines if pattern.search(line)]
# 过滤后这些行就不再可读了
```

**跨平台支持：**

```python
if platform.system() == "Windows":
    shell_cmd = ["powershell.exe", "-NoProfile", "-Command", command]
else:
    shell_cmd = command  # bash
```

### 文件工具

```python
ReadTool(workspace_dir)    # 读取文件
WriteTool(workspace_dir)   # 写入文件
EditTool(workspace_dir)    # 智能编辑（需要细看实现）
```

### NoteTool（Session 记忆）

- 存储到 `~/.mini-agent/memory/` 的 JSON 文件
- 跨会话持久化关键信息
- LLM 可以主动写入/读取

---

## 六、MCP 集成（MCP Loader）

### 支持的连接类型

```
stdio  ──────────── subprocess 启动本地 MCP 服务器
sse    ──────────── HTTP + Server-Sent Events
http   ──────────── 标准 HTTP
streamable_http ─── MCP 官方的 streamable HTTP (默认 URL 类型)
```

### 超时管理

```python
class MCPTimeoutConfig:
    connect_timeout: float = 10.0   # 连接超时
    execute_timeout: float = 60.0    # 工具执行超时
    sse_read_timeout: float = 120.0  # SSE 读取超时
```

每个服务器可在 `mcp.json` 中覆盖全局默认值：

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "execute_timeout": 120
    }
  }
}
```

### async timeout 保护

```python
async with asyncio.timeout(timeout):
    result = await self._session.call_tool(name, arguments=kwargs)
# TimeoutError → ToolResult(success=False, error="timed out")
```

---

## 七、Skills 系统（Claude Skills 兼容）

### 格式规范

每个 skill 是一个目录，必须包含 `SKILL.md`：

```yaml
---
name: my-skill
description: What this skill does and when to use it
license: MIT  # 可选
allowed-tools: []  # 可选，仅 Claude Code 支持
metadata: {}  # 可选
---

# Markdown body
Instructions, scripts, resources...
```

### SkillLoader 加载流程

1. 扫描 skills 目录下的所有 `SKILL.md`
2. 解析 YAML frontmatter（name + description 必填）
3. 处理相对路径 → 绝对路径（支持从任意工作目录调用）
4. 元数据注入 system prompt（Progressive Disclosure Level 1）

### 预置 Skills 清单

| Skill | 功能 | 复杂度 |
|-------|------|--------|
| `algorithmic-art` | 生成 ASCII/算法艺术 | 简单 |
| `artifacts-builder` | 构建 Web artifacts (HTML/CSS/JS) | 中等 |
| `canvas-design` | Canvas 设计（50+ 字体） | 复杂 |
| `document-skills/docx` | DOCX 创建 + OOXML schema 验证 | 复杂 |
| `document-skills/pdf` | PDF 操作 + 表单填充 | 复杂 |
| `document-skills/pptx` | PPTX 创建 + HTML2PPTX | 复杂 |
| `document-skills/xlsx` | Excel 操作 + 公式重算 | 中等 |
| `internal-comms` | 内部沟通文档生成 | 简单 |
| `mcp-builder` | MCP 服务器构建指南 | 参考型 |
| `skill-creator` | 创建新 skill 的脚手架 | 元 |
| `slack-gif-creator` | Slack GIF 生成（15 种动画模板） | 中等 |
| `template-skill` | 空白模板 | 极简 |
| `theme-factory` | 设计主题系统 | 参考型 |
| `webapp-testing` | Web 应用自动化测试 | 工具 |

**亮点：** `document-skills` 包含完整的 **OOXML ISO-IEC29500-4 schema**，说明文档生成可以达到生产级精度校验。

---

## 八、ACP 协议桥接

### ACP 是什么

ACP = Agent Client Protocol，是 MCP 的前身/变种，由 Anthropic 推广（现已转向 MCP）。Mini-Agent 保留了 ACP 桥接，目标是支持 Zed Editor 等 ACP 客户端。

### MiniMaxACPAgent 适配器

```python
class MiniMaxACPAgent:
    async def initialize() -> InitializeResponse
    async def newSession() -> NewSessionResponse
    async def prompt() -> PromptResponse
    async def cancel() -> None
    async def _run_turn() -> str  # 核心 turn 循环
```

关键设计：**Session 自动创建**。如果客户端跳过了 `newSession`，`prompt` 方法会自动创建一个新 session：

```python
if session_id not in self._sessions:
    logger.warning(f"Session not found, auto-creating...")
    new_session = await self.newSession(NewSessionRequest(cwd=None))
```

### Zed Editor 集成

```json
// Zed settings.json
{
  "agent_servers": {
    "mini-agent": {
      "command": "/path/to/mini-agent-acp"
    }
  }
}
```

---

## 九、CLI 交互设计

### 启动流程

```
main()
  → 解析参数 (workspace, task, version, subcommands)
  → run_agent(workspace_dir, task?)
      → Config.load()  (Pydantic YAML)
      → LLMClient init
      → initialize_base_tools()
          ├── BashOutputTool + BashKillTool
          ├── SkillLoader → create_skill_tools()
          └── load_mcp_tools_async()
      → add_workspace_tools()
          ├── BashTool (with cwd)
          ├── Read/Write/Edit
          └── SessionNoteTool
      → 加载 System Prompt
      → 注入 Skills Metadata
      → Agent(...)
      → Interactive loop / Single task mode
```

### Interactive 模式功能

| 功能 | 实现 |
|------|------|
| **历史命令** | prompt_toolkit `FileHistory` → `~/.mini-agent/.history` |
| **自动补全** | `WordCompleter` (`/help`, `/clear`, `/history`, etc.) |
| **多行输入** | `Ctrl+J` / `Ctrl+Enter` 插入换行 |
| **清空输入** | `Ctrl+U` |
| **清屏** | `Ctrl+L` |
| **取消运行** | Esc 键监听线程 → `cancel_event.set()` |
| **日志查看** | `/log` + `open_directory_in_file_manager()` |
| **会话统计** | `/stats` 显示消息类型分布 + token 使用 |

### 配置搜索优先级

```
Config.load():
  1. mini_agent/config/config.yaml (开发模式)
  2. ~/.mini-agent/config/config.yaml (用户模式)
  3. <package>/config/config.yaml (安装模式)
```

---

## 十、重试机制

```python
class RetryConfig:
    enabled: bool = True
    max_retries: int = 3
    initial_delay: float = 1.0
    max_delay: float = 60.0
    exponential_base: float = 2.0

    def calculate_delay(attempt: int) -> float:
        delay = initial_delay * (exponential_base ** attempt)
        return min(delay, max_delay)
```

装饰器模式使用：

```python
@async_retry(RetryConfig(max_retries=3, on_retry=on_retry_callback))
async def _make_api_request(...):
    return await self.client.messages.create(...)
```

`on_retry` callback 在 CLI 层显示友好的重试提示，而不是沉默重试。

---

## 十一、日志系统

每次 agent run 生成一个独立日志文件 `~/.mini-agent/log/agent_run_YYYYMMDD_HHMMSS.log`：

```
[1] REQUEST
  LLM Request: {messages[], tools[]}

[2] RESPONSE
  LLM Response: {content, thinking, tool_calls, finish_reason}

[3] TOOL_RESULT
  Tool Execution: {tool_name, arguments, success, result/error}
```

每个 entry 带时间戳，完整记录 LLM 请求/响应/工具调用，是调试 Agent 行为的完整追踪。

---

## 十二、与 openai/codex 的详细对比

| 维度 | **openai/codex** | **MiniMax-AI/Mini-Agent** |
|------|-------------------|---------------------------|
| **规模** | 75.1k stars, 5,328 commits | 2,393 stars, 活跃开发中 |
| **语言** | Rust (77 crates, Bazel) | Python (20 模块, uv) |
| **Agent Loop** | 524 files in `core/` | **350 行 in `agent.py`** |
| **LLM Provider** | 多 provider + 云端 | MiniMax M2.5 (Anthropic 兼容) |
| **沙箱** | 三平台完整沙箱 | 无（直接执行在 host 环境） |
| **MCP** | 双向 (client + server) | 纯 client（连外部 MCP 服务器） |
| **Skills** | 项目级 skills | Claude Skills 格式（完整兼容） |
| **文档** | 外部化到 website | 自包含 (中英双语 dev/prod guide) |
| **日志** | 结构化日志 | 每次 run 一个 JSON log 文件 |
| **执行策略** | Starlark DSL (execpolicy) | 无（信任 LLM） |
| **Session 管理** | 多 session + rollback | 单 session（可清空） |
| **取消机制** | cancel_event | Esc 键监听线程 |
| **工具超时** | exec-server 统一管理 | asyncio.timeout per MCP tool |
| **Zed 集成** | MCP Server 模式 | ACP 桥接 |
| **错误恢复** | 重试 + 优雅降级 | 基础重试装饰器 |
| **自省** | Plan mode, 推理 effort | Extended Thinking (M2.5 原生) |
| **配置** | TOML + JSON Schema | YAML + Pydantic validation |
| **构建** | Bazel + Cargo | uv + pyproject.toml |
| **测试** | 全面 + CI | 全面 (pytest) |

---

## 十三、生产部署建议（文档诚实指出）

`PRODUCTION_GUIDE.md` 明确列出了需要升级的方向：

### 当前 Demo 实现 vs 生产需求

| 功能 | Demo 现状 | 生产需求 |
|------|-----------|---------|
| **Context 管理** | SessionNoteTool 文件存储 + tiktoken 摘要 | 分布式存储 + 多策略压缩 |
| **模型容错** | 单模型，失败直接报错 | 模型池 + 健康检查 + 熔断 |
| **幻觉检测** | 无，直接信任 LLM 输出 | 输入参数安全检查 + 工具结果反射 |
| **资源限制** | 无限制 | K8s/Docker CPU/Memory limits |
| **工具安全** | Bash 直接执行在 host | 沙箱隔离 |
| **可观测性** | 基础日志文件 | OpenTelemetry + 结构化追踪 |

---

## 十四、总结：为什么这个项目值得研究

**不是因为它功能强大，恰恰相反——是因为它功能克制，代码透明。**

Mini-Agent 的核心价值：

1. **Agent 教科书** — 350 行核心循环涵盖了一个完整 Agent 的所有必要组件：消息历史管理、工具调用、错误处理、取消机制、token 限制下的摘要策略
2. **Python 最佳实践** — Pydantic 数据验证、asyncio 并发、上下文管理器、装饰器模式、类型提示
3. **MCP 集成参考** — 完整的 MCP Python SDK 使用示例，包含超时、连接管理、工具包装
4. **Claude Skills 格式** — 官方 Skills 规范的完整实现，包含加载、路径处理、元数据注入
5. **文档质量** — 中英双语文档，明确声明 demo 性质和升级路径，没有虚假宣传
6. **MiniMax M2.5 展示** — 作为 M2.5 模型的"说明书"，展示 Extended Thinking、Anthropic 兼容 API 的使用

如果你要**构建自己的 Agent 框架**，Mini-Agent 是比 LangChain/LlamaIndex 更干净的起点——没有任何框架包袱，核心逻辑一目了然。

如果你要**理解 Agent 执行管道**，Mini-Agent 是比 openai/codex 更友好的起点——Rust + Bazel 的认知负担远高于 Python + uv。

---

标签: #AI #coding-agent #Python #MiniMax #MCP #Claude-Skills #Agent #demo #open-source
