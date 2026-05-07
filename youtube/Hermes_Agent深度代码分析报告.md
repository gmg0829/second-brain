# Hermes Agent 深度代码分析报告

**仓库:** https://github.com/nousresearch/hermes-agent
**分析日期:** 2026-04-24
**分析深度:** 架构 + 实现模式

---

## 项目概览

**Hermes Agent** 是 [Nous Research](https://nousresearch.com) 开发的一款自进化 AI Agent，核心理念是"The agent that grows with you"——内置学习循环，从经验中创建技能、持续改进、跨会话持久化知识。

| 指标 | 值 |
|------|-----|
| GitHub Stars | 113K+ |
| GitHub Forks | 16K+ |
| 语言 | Python ≥3.11 |
| 许可证 | MIT |
| 定位 | 自进化 Agent 框架 |
| 文档 | https://hermes-agent.nousresearch.com/docs/ |

---

## 目录结构

```
hermes-agent/
├── run_agent.py              # AIAgent 核心类 (~12k LOC) - 对话循环
├── model_tools.py            # Tool编排、发现、函数调用处理
├── toolsets.py               # 工具集定义
├── hermes_state.py           # SessionDB - SQLite + FTS5 状态管理
├── cli.py                    # HermesCLI 类 (~11k LOC) - 交互式 CLI
├── hermes_cli/               # CLI 子命令、设置向导、插件加载器
│   ├── main.py, commands.py, curses_ui.py
│   ├── config.py, env_loader.py
│   ├── auth.py, *auth.py
│   ├── model_switch.py, models.py
│   └── gateway.py, platform_*.py
├── agent/                    # Agent 内部核心模块
│   ├── transports/            # LLM 传输层抽象
│   │   ├── base.py              # ProviderTransport ABC
│   │   ├── anthropic.py         # Anthropic Messages API
│   │   ├── bedrock.py           # AWS Bedrock
│   │   ├── chat_completions.py  # OpenAI 兼容
│   │   └── codex.py             # OpenAI Codex
│   ├── anthropic_adapter.py     # Anthropic 适配器 (OAuth/思考预算)
│   ├── bedrock_adapter.py       # Bedrock 适配器
│   ├── gemini_native_adapter.py # Gemini 原生适配器
│   ├── google_code_assist.py   # Google Code Assist
│   ├── codex_responses_adapter.py
│   ├── moonshot_schema.py
│   ├── memory_manager.py        # 记忆编排 (1外部 + builtin)
│   ├── memory_provider.py       # 记忆 Provider ABC
│   ├── context_engine.py        # 上下文压缩引擎 ABC
│   ├── context_compressor.py    # 默认压缩实现
│   ├── prompt_builder.py       # System prompt 组装 + 威胁扫描
│   ├── context_references.py    # 上下文引用管理
│   ├── model_metadata.py        # 模型元数据/能力
│   ├── skill_commands.py
│   ├── skill_utils.py
│   ├── display.py
│   ├── error_classifier.py
│   ├── insights.py
│   └── retry_utils.py
├── tools/                     # 40+ 内置工具 (自注册)
│   ├── registry.py              # ToolRegistry 单例 + AST 发现
│   ├── memory_tool.py           # 内置记忆工具
│   ├── skill_manager_tool.py    # 技能创建/管理
│   ├── delegate_task.py         # 子 Agent 委托
│   └── *.py                     # 终端、文件、Web、Delegate 等
├── gateway/                    # 消息网关
│   ├── platforms/               # Telegram, Discord, Slack, WhatsApp, Signal, Email
│   ├── builtin_hooks/
│   ├── run.py
│   ├── channel_directory.py
│   ├── delivery.py
│   └── session.py
├── skills/                    # 内置 Skills 系统
├── plugins/                   # 插件系统
│   ├── memory/                 # 记忆 Provider 插件
│   └── context_engine/          # 上下文引擎插件
├── environments/               # RL/研究环境
├── cron/                      # 定时自动化
├── acp_adapter/               # Agent Client Protocol 适配器
├── acp_registry/              # ACP 注册表
├── optional-skills/           # 可选技能模块
├── docker/                    # Docker 相关
├── packaging/                 # 打包
└── nix/                       # Nix 包定义
```

---

## 技术栈

**核心语言:** Python ≥3.11

**关键依赖:**

| 类别 | 库 |
|------|-----|
| AI Models | `openai`, `anthropic`, `mistralai`, `boto3` (Bedrock) |
| CLI | `prompt_toolkit`, `rich`, `pyyaml` |
| Web/Network | `httpx[socks]`, `requests`, `fire`, `exa-py`, `firecrawl-py` |
| TTS/STT | `edge-tts`, `faster-whisper` |
| Messaging | `python-telegram-bot`, `discord.py`, `slack-bolt` |
| RL/Research | `atroposlib`, `tinker`, `wandb` |
| MCP | `mcp` (Model Context Protocol) |
| Optional | Modal, Daytona, Docker, Singularity |

---

## 核心设计模式

### 1. Tool 自注册模式

**文件:** `tools/registry.py`

Hermes 采用 **AST 解析** 实现工具自注册，无需显式导入每个工具文件：

```python
# 每个工具文件在模块导入时调用 registry.register()
def check_requirements() -> bool:
    return bool(os.getenv("API_KEY"))

def my_tool(param: str, task_id: str = None) -> str:
    return json.dumps({"success": True, "data": "..."})

registry.register(
    name="my_tool",
    toolset="my_toolset",
    schema={
        "name": "my_tool",
        "description": "...",
        "parameters": {...}
    },
    handler=lambda args, **kw: my_tool(**args, **kw),
    check_fn=check_requirements,
    requires_env=["API_KEY"],
    is_async=False,
    description="...",
    emoji="",
    max_result_size_chars=None,
)
```

**发现机制 - AST 解析:**

```python
def _module_registers_tools(module_path: Path) -> bool:
    """Return True when the module contains a top-level registry.register(...) call."""
    source = module_path.read_text(encoding="utf-8")
    tree = ast.parse(source, filename=str(module_path))
    return any(_is_registry_register_call(stmt) for stmt in tree.body)
```

**导入链 (循环导入安全):**

```
tools/registry.py  (无依赖)
       ↑
tools/*.py  (每个工具在导入时调用 registry.register())
       ↑
model_tools.py  (导入 tools/registry + 触发发现)
       ↑
run_agent.py, cli.py, batch_runner.py
```

**工具集组合 - 菱形继承安全:**

```python
TOOLSETS = {
    "hermes-cli": {
        "description": "完整交互式CLI工具集",
        "tools": _HERMES_CORE_TOOLS,  # ~40 tools
        "includes": []
    },
    "safe": {
        "description": "无终端的安全工具集",
        "tools": [],
        "includes": ["web", "vision", "image_gen"]  # 可组合!
    }
}
```

---

### 2. Transport 抽象层 (LLM Provider 多态)

**文件:** `agent/transports/base.py`

通过 `ProviderTransport` ABC 实现 Provider 无感知的 LLM 接口：

```python
class ProviderTransport(ABC):
    """Base class for provider-specific format conversion and normalization."""

    @property
    @abstractmethod
    def api_mode(self) -> str:
        """The api_mode string this transport handles (e.g. 'anthropic_messages')."""

    @abstractmethod
    def convert_messages(self, messages: List[Dict[str, Any]], **kwargs) -> Any:
        """Convert OpenAI-format messages to provider-native format."""

    @abstractmethod
    def convert_tools(self, tools: List[Dict[str, Any]]) -> Any:
        """Convert OpenAI-format tool definitions to provider-native format."""

    @abstractmethod
    def build_kwargs(self, model: str, messages: List[Dict],
                     tools: Optional[List[Dict]] = None, **params) -> Dict[str, Any]:
        """Build the complete API call kwargs dict."""

    @abstractmethod
    def normalize_response(self, response: Any, **kwargs) -> NormalizedResponse:
        """Normalize a raw provider response to the shared NormalizedResponse type."""
```

**支持的传输层实现:**

| 文件 | Provider |
|------|----------|
| `anthropic.py` | Anthropic Messages API |
| `bedrock.py` | AWS Bedrock Claude |
| `chat_completions.py` | OpenAI / OpenRouter 兼容 |
| `codex.py` | OpenAI Codex |

**多认证支持 - Credential 池化:**

```python
# agent/credential_pool.py
# 多凭证故障转移策略: fill_first, round_robin, random, least_used
```

---

### 3. Plugin 化 Memory 系统

**文件:** `agent/memory_provider.py`

采用 **插件架构** 实现记忆 Provider 可替换：

```python
class MemoryProvider(ABC):
    """Abstract base class for memory providers."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Short identifier (e.g. 'builtin', 'honcho', 'hindsight')."""

    @abstractmethod
    def is_available(self) -> bool:
        """Return True if this provider is configured and ready."""

    @abstractmethod
    def initialize(self, session_id: str, **kwargs) -> None:
        """Initialize for a session."""

    @abstractmethod
    def get_tool_schemas(self) -> List[Dict[str, Any]]:
        """Return tool schemas this provider exposes."""

    # 核心生命周期
    def system_prompt_block(self) -> str:      # 静态文本 - 系统 prompt
    def prefetch(self, query: str, *, session_id: str = "") -> str:  # 每轮前调用
    def sync_turn(self, user_content: str, assistant_content: str, *, session_id: str = ""):
        # 每轮后调用 - 持久化
```

**MemoryManager 强制"一个外部 Provider"限制:**

```python
class MemoryManager:
    """Orchestrates the built-in provider plus at most one external provider."""

    def add_provider(self, provider: MemoryProvider) -> None:
        """Only ONE external (non-builtin) provider is allowed at a time."""
        is_builtin = provider.name == "builtin"
        if not is_builtin and self._has_external:
            logger.warning("Rejected memory provider '%s' — external provider already registered")
            return
        ...
```

**内置记忆永远启用**，外部 Provider (Honcho, Hindsight, Mem0, Supermemory, Byterover, Holographic, OpenViking, RetainDB) 作为增量添加。

---

### 4. Pluggable Context Engine

**文件:** `agent/context_engine.py`

```python
class ContextEngine(ABC):
    """Abstract base class for pluggable context engines."""

    # 子类必须维护这些属性 (用于显示/日志)
    last_prompt_tokens: int = 0
    last_completion_tokens: int = 0
    last_total_tokens: int = 0
    threshold_tokens: int = 0
    context_length: int = 0
    compression_count: int = 0

    # 可配置压缩参数
    threshold_percent: float = 0.75   # 75% 上下文时触发压缩
    protect_first_n: int = 3          # 从不压缩前N条消息
    protect_last_n: int = 6          # 永远保留后N条消息

    @abstractmethod
    def update_from_response(self, usage: Dict[str, Any]) -> None:
        """Update tracked token usage from an API response."""

    @abstractmethod
    def should_compress(self, prompt_tokens: int = None) -> bool:
        """Return True if compaction should fire this turn."""

    @abstractmethod
    def compress(self, messages: List[Dict[str, Any]],
                 current_tokens: int = None) -> List[Dict[str, Any]]:
        """Compact the message list and return the new message list."""
```

**默认实现:** `ContextCompressor` 使用摘要 + DAG 构建实现上下文压缩。

---

### 5. Prompt 组装 + 威胁扫描

**文件:** `agent/prompt_builder.py`

```python
# 上下文威胁检测 - 防止 Prompt Injection
_CONTEXT_THREAT_PATTERNS = [
    (r'ignore\s+(previous|all|above|prior)\s+instructions', "prompt_injection"),
    (r'do\s+not\s+tell\s+the\s+user', "deception_hide"),
    (r'STROP\s+YOUR\s+(FILTERING|CENSORING)', "safety_override"),
    # ... 更多模式
]

def _scan_context_content(content: str, filename: str) -> str:
    """Scan context file content for injection. Returns sanitized content."""
    # 剥离不可见 unicode、威胁模式
    for char in _CONTEXT_INVISIBLE_CHARS:
        if char in content:
            findings.append(f"invisible unicode U+{ord(char):04X}")
    ...
```

**身份与指导分离 (Compositional):**

| 组件 | 用途 |
|------|------|
| `DEFAULT_AGENT_IDENTITY` | 核心人格定义 |
| `MEMORY_GUIDANCE` | 记忆使用说明 |
| `SESSION_SEARCH_GUIDANCE` | 跨会话召回指令 |
| `SKILLS_GUIDANCE` | 技能创建/维护指南 |
| `TOOL_USE_ENFORCEMENT_GUIDANCE` | 模型特定执行纪律 |
| `GOOGLE_MODEL_OPERATIONAL_GUIDANCE` | Gemini/Gemma 特定指令 |

---

### 6. Anthropic 适配器详解

**文件:** `agent/anthropic_adapter.py`

**OAuth + API Key 自动检测:**

```python
def build_anthropic_client(api_key: str, base_url: str = None, timeout: float = None):
    """Create an Anthropic client, auto-detecting setup-tokens vs API keys."""

    # Auth 检测链:
    # 1. OAuth tokens (sk-ant-oat*, eyJ*) → Bearer auth
    # 2. Regular API keys (sk-ant-api*) → x-api-key header
    # 3. Third-party endpoints (Azure, Bedrock, MiniMax) → their own auth
    # 4. Claude Code credentials → ~/.claude/.credentials.json with refresh
```

**思考预算映射:**

```python
THINKING_BUDGET = {
    "xhigh": 32000,
    "high": 16000,
    "medium": 8000,
    "low": 4000
}
# Maps Hermes effort levels to Anthropic adaptive thinking effort
```

---

## Agent 核心循环

**文件:** `run_agent.py` (AIAgent 类)

```python
while (api_call_count < max_iterations
       and iteration_budget.remaining > 0) \
       or budget_grace_call:

    if interrupt_requested:
        break

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        tools=tool_schemas
    )

    if response.tool_calls:
        for tool_call in response.tool_calls:
            result = handle_function_call(
                tool_call.name,
                tool_call.args,
                task_id
            )
            messages.append(tool_result_message(result))
        api_call_count += 1
    else:
        return response.content
```

**AIAgent 对外接口:**

```python
class AIAgent:
    def chat(self, messages: List[Dict], **kwargs) -> str:
        """Simple interface → returns final response string"""

    def run_conversation(self, messages: List[Dict], **kwargs) -> Dict:
        """Full interface → returns dict with final_response + messages"""
```

---

## 状态管理

**文件:** `hermes_state.py` - SessionDB

| 特性 | 实现 |
|------|------|
| 存储 | SQLite + WAL 模式 |
| 并发 | 并发读 + 单 writer |
| 搜索 | FTS5 虚拟表 - 跨会话全文搜索 |
| 迁移 | Schema 版本迁移支持 |
| 跟踪 | Token 计数、成本跟踪 |

**SessionDB Schema:**

```sql
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    created_at INTEGER,
    updated_at INTEGER,
    model TEXT,
    budget_tokens INTEGER,
    ...
);

CREATE VIRTUAL TABLE sessions_fts USING fts5(
    session_id UNINDEXED,
    message_index,
    role,
    content,
    tokenize='trigram'
);
```

---

## 配置模式

| 配置项 | 文件 | 说明 |
|--------|------|------|
| 用户设置 | `~/.hermes/config.yaml` | CLI 配置 |
| API Keys | `.env` | 仅 secrets |
| 多实例 | `_apply_profile_override()` | 通过 `HERMES_HOME` 隔离 |
| 示例配置 | `cli-config.yaml.example` | 49KB 完整模板 |

---

## 关键设计模式总结

| 模式 | 位置 | 用途 |
|------|------|------|
| **Transport 抽象** | `agent/transports/base.py` | Provider 无感知 LLM 接口 |
| **自注册 Tools** | `tools/registry.py` | AST 发现工具，零配置扩展 |
| **Plugin Memory** | `agent/memory_provider.py` | 可交换持久化后端 |
| **Context Engine** | `agent/context_engine.py` | 可插拔上下文压缩 |
| **Credential 池化** | `agent/credential_pool.py` | 多 key 故障转移 |
| **Prompt 组装** | `agent/prompt_builder.py` | 威胁扫描 Prompt 装配 |
| **Provider 适配器** | `agent/*_adapter.py` | Anthropic, Gemini, Bedrock, Codex |
| **Toolset 组合** | `toolsets.py` | Diamond-free 递归解析 + 循环检测 |

---

## 特殊功能

- **Skills 系统:** 程序化记忆、自主技能创建
- **MCP 集成:** 连接任意 MCP 服务器
- **终端后端:** Local, Docker, SSH, Daytona, Singularity, Modal
- **RL/研究:** 批量轨迹生成、Atropos RL、轨迹压缩
- **Honcho 集成:** 方言用户建模

---

## 入口点

| 命令 | 入口 |
|------|------|
| `hermes` | Shell 脚本 → CLI |
| `hermes model` | 模型 Provider 配置 |
| `hermes gateway` | 启动消息网关 |
| `hermes setup` | 完整设置向导 |
| `hermes tools` | 工具配置 |
| `hermes claw migrate` | OpenClaw 迁移 |

**Python 入口 (from `pyproject.toml`):**

| 命令 | 入口 |
|------|------|
| `hermes` | `hermes_cli.main:main` |
| `hermes-agent` | `run_agent:main` |
| `hermes-acp` | `acp_adapter.entry:main` |

---

## 总结

Hermes Agent 是一个设计精良的自进化 Agent 框架，核心架构特点：

1. **多 Provider 抽象** - 通过 Transport 层支持 Anthropic, OpenAI, Bedrock, Codex 等多种 LLM
2. **自注册工具系统** - AST 发现机制，工具文件即插即用
3. **插件化记忆** - MemoryProvider ABC 支持多种后端
4. **可组合工具集** - 菱形安全的递归包含解析
5. **上下文压缩** - Pluggable ContextEngine 支持多种压缩策略
6. **Prompt 安全** - 内置威胁模式检测，防 Prompt Injection
7. **Credential 池化** - 多 API Key 故障转移，高可用

---

## 自我进化机制 (Self-Evolution)

Hermes Agent 的核心理念是"The agent that grows with you"——能够从经验中学习、将成功方法转化为可复用技能、跨会话持久化知识。

### 核心架构

```
用户完成复杂任务
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  Agent Loop (run_agent.py)                          │
│  经过 N 次工具调用后且未使用 skill_manage            │
│  → 设置 _should_review_skills = True               │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  后台审查线程 (spawned post-response)                │
│  Forked AIAgent (相同 model + tools)              │
│  接收 _SKILL_REVIEW_PROMPT + 对话历史             │
│  Agent 决定: 创建 / 更新 / 跳过                     │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  skill_manage 工具 (skill_manager_tool.py)         │
│  安全扫描 → 原子写入 → ~/.hermes/skills/          │
│  或 patch (模糊匹配) → 更新已有技能               │
└─────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  下次调用时通过 /skill-name 加载技能              │
│  作为 user message 注入 (prompt cache 友好)       │
│  Agent 自动遵循存储的流程                         │
└─────────────────────────────────────────────────────┘

并行学习循环:
  每轮结束后 → memory_manager.sync_all()
  外部插件 (honcho, hindsight, mem0, ...) 学习
  下轮开始 → prefetch 注入相关记忆
```

---

### 1. Skills 系统 — Agent 的程序化记忆

**核心理念**: Skills 是 Agent 的"程序化记忆"——捕获"需要摸索才能完成的特定任务的流程"。

#### 1.1 核心工具: `skill_manage`

**文件**: `tools/skill_manager_tool.py` (817 lines)

**Docstring**:
> *"Allows the agent to create, update, and delete skills, turning successful approaches into reusable procedural knowledge."*

**Actions**:

| Action | 描述 |
|--------|------|
| `create` | 从零创建新技能 (SKILL.md + 目录结构) |
| `edit` | 完全替换已有技能内容 |
| `patch` | 模糊匹配修补 — 找到最佳匹配段落并更新 |
| `delete` | 删除技能 |
| `write_file` | 写入技能目录中的支持文件 |
| `remove_file` | 删除技能目录中的支持文件 |

**关键实现细节**:

- **安全扫描**: `_security_scan_skill()` 扫描 Agent 创建的技能中的危险内容。当 `skills.guard_agent_created` 启用时（默认关闭），危险判定阻止技能创建，警告判定请求确认。
- **原子写入**: `_create_skill()` 先写临时文件，再用 `os.replace()` 原子重命名 — 防止崩溃损坏。
- **安全阻断回滚**: 如果安全扫描在技能部分写入后失败，会清理。
- **大小限制**: SKILL.md 上限 100,000 chars；支持文件每个上限 1 MiB。
- **Patch 模糊匹配**: `_find_best_matching_section()` 使用内容相似度定位要修补的最佳段落。

**文件位置**: 所有 Agent 创建的技能存放在 `~/.hermes/skills/<skill-name>/SKILL.md`。

#### 1.2 技能激活: `skill_commands`

**文件**: `agent/skill_commands.py` (508 lines)

Slash 命令网关 (`/skill-name`)：

1. 从 `~/.hermes/skills/<name>/` 解析技能目录
2. 读取 SKILL.md
3. 提取 YAML frontmatter (name, description, triggers, tags)
4. 执行平台匹配和禁用技能检查
5. 将技能内容作为 **user message** 注入（而非 system prompt）— 保持 prompt cache 效率
6. 收集技能 frontmatter 中声明的环境变量
7. 注入 `HERMES_SKILL_*` 环境变量到工具执行环境

#### 1.3 技能浏览: `skills_tool`

**文件**: `tools/skills_tool.py` (1408+ lines)

提供 `skills_list` 和 `skill_view`，支持**渐进式披露**：

| Tier | 内容 |
|------|------|
| Tier 1 | 仅元数据 (name, description, triggers, tags) |
| Tier 2–3 | 完整 SKILL.md 内容 + 支持文件 |

还处理外部技能目录和插件提供的技能（通过命名空间限定名 `namespace:skill`）。

---

### 2. Memory 系统 — 跨会话持久化学习

#### 2.1 核心记忆工具: `memory_tool`

**文件**: `tools/memory_tool.py` (584 lines)

两个有界的文件持久化存储：

| Store | 文件 | 用途 | 单条上限 |
|-------|------|------|---------|
| `memory` | `~/.hermes/memory/MEMORY.md` | Agent 个人笔记 — 环境事实、项目约定、工具特点、经验教训 | 2200 chars |
| `user` | `~/.hermes/memory/USER.md` | 用户 profile — 姓名、角色、偏好、沟通风格、工作习惯 | 1375 chars |

**Entry 分隔符**: `§` (section sign)。条目通过 `action=add` 追加，通过 `action=replace` 替换，通过 `action=remove` 删除。

**关键设计**: Frozen snapshot pattern 注入 system prompt（稳定的 prefix cache 以提高 token 效率）。维护 live state 用于会话中写入。使用 `temp_file + os.replace()` 原子写入。

**记忆优先级** (from schema):
> *"User preferences and corrections > environment facts > procedural knowledge."*

**何时保存**:
- 用户纠正 / "记住这个"
- 偏好、个人细节、沟通风格
- 环境发现 (OS, tools, project structure)
- 约定、API 特点、工作流
- 对未来会话有用的稳定事实

**不要保存**: 任务进度、会话日志、原始数据转储、临时状态。

#### 2.2 Memory Manager: `memory_manager`

**文件**: `agent/memory_manager.py` (373 lines)

编排内置 memory provider 加上**一个**外部插件 memory provider。管理：
- Provider 注册
- System prompt 构建
- Prefetch/recall
- Sync
- 工具路由
- 生命周期钩子: `on_turn_start`, `on_session_end`, `on_pre_compress`, `on_delegation`

#### 2.3 Memory Provider 接口: `memory_provider`

**文件**: `agent/memory_provider.py` (231 lines)

可插拔 memory provider 抽象基类：

```python
class MemoryProvider(ABC):
    @abstractmethod
    def initialize() -> None: ...

    @abstractmethod
    def system_prompt_block() -> List[Dict]: ...

    @abstractmethod
    def prefetch(user_message: str) -> Optional[List[Dict]]: ...

    @abstractmethod
    def sync_turn(user_message: str, assistant_response: str) -> None: ...

    @abstractmethod
    def get_tool_schemas() -> List[Dict]: ...

    @abstractmethod
    def handle_tool_call(tool_name: str, args: dict, **kwargs) -> Optional[str]: ...

    @abstractmethod
    def shutdown() -> None: ...

    # 可选钩子
    def on_turn_start() -> None: ...
    def on_session_end() -> None: ...
    def on_pre_compress(messages: List[Dict]) -> None: ...
    def on_delegation(delegated_agent_id: str) -> None: ...
    def on_memory_write(entries: List[Dict]) -> None: ...
```

#### 2.4 外部 Memory 插件 (7个)

**目录**: `plugins/memory/`

| Provider | 描述 |
|----------|------|
| `honcho` | per-user/per-workspace memory with observation toggles |
| `hindsight` | 回顾/复盘 memory |
| `mem0` | 通用 memory |
| `byterover` | — |
| `holographic` | — |
| `openviking` | — |
| `supermemory` | Link to Twitter, read-it-later, and more |
| `retaindb` | — |

---

### 3. 自我改进触发器 — Agent 如何被引导学习

#### 3.1 周期性后台审查 (主循环)

**文件**: `run_agent.py`, lines 11889–11915

每次响应发送后，Agent 检查：

```python
if (self._skill_nudge_interval > 0
        and self._iters_since_skill >= self._skill_nudge_interval
        and "skill_manage" in self.valid_tool_names):
    _should_review_skills = True
    self._iters_since_skill = 0
```

Nudge 计数器在实际调用 `skill_manage` 时**重置**。默认间隔是 **10 次工具调用迭代**（可通过 `skills.creation_nudge_interval` 配置）。

#### 3.2 后台审查 Agent

**文件**: `run_agent.py`, lines 2855–2960

根据触发条件使用三种审查 prompt：

**`_SKILL_REVIEW_PROMPT`** (lines 2855–2863):
> *"Review the conversation above and consider saving or updating a skill if appropriate. Focus on: was a non-trivial approach used to complete a task that required trial and error, or changing course due to experiential findings along the way, or did the user expect or desire a different method or outcome? If a relevant skill already exists, update it with what you learned. Otherwise, create a new skill if the approach is reusable."*

**`_MEMORY_REVIEW_PROMPT`** (lines 2845–2853):
> *"Review the conversation above and consider saving things to memory. Focus on: user preferences, personal details, corrections, expectations about how you should behave, work style..."*

**`_COMBINED_REVIEW_PROMPT`** (lines 2865–2877): 包含 memory 和 skills 审查。

**Spawning 机制** (`_spawn_background_review`, lines 2879–2960):
- 创建与父 Agent 相同 model + tools 的**完整 fork**
- 在后台线程运行，stdout/stderr 抑制
- 与父 Agent **共享** memory store (`review_agent._memory_store = self._memory_store`)
- 设置 `_skill_nudge_interval=0` 和 `_memory_nudge_interval=0` 防止递归
- 完成后扫描工具结果中的 `"created"`, `"updated"`, `"added"`，向用户展示简洁消息 `💾 Memory updated · Skill created`

#### 3.3 迭代计数器重置逻辑

**文件**: `run_agent.py`, line 9054–9058

```python
if (self._skill_nudge_interval > 0
        and "skill_manage" in self.valid_tool_names):
    self._iters_since_skill += 1
```

但当 `skill_manage` 实际被调用时 (line 7808, 8131):

```python
self._iters_since_skill = 0  # Reset on actual skill use
```

这意味着：如果 Agent 超过 **10 次迭代** 没有创建/更新技能，就会触发 nudge。

---

### 4. 学习循环 — 反馈与经验整合

#### 4.1 Housekeeping 工具检测

**文件**: `run_agent.py`, lines 11267–11276

```python
_HOUSEKEEPING_TOOLS = frozenset({"memory", "todo", "skill_manage", "session_search"})
```

当 Agent 仅调用 housekeeping 工具时，输出**静音** — housekeeping 对用户不可见，但模型仍能看到。这让 Agent 可以静默保存记忆和创建技能，不打断用户。

#### 4.2 每轮后的 Memory Sync

**文件**: `run_agent.py`, lines 11897–11904

每次响应后：

```python
self._memory_manager.sync_all(original_user_message, final_response)
self._memory_manager.queue_prefetch_all(original_user_message)
```

这让外部 memory 插件从每轮完成中学习。

#### 4.3 上下文压缩时保留记忆

**文件**: `agent/context_engine.py`

当对话接近 token 限制时，`ContextCompressor` 压缩历史。`memory_manager.on_pre_compress()` 钩子让 memory provider 标记必须保留的内容。

---

### 5. 自我修改安全机制

#### 5.1 Agent 创建技能的守卫 (可选)

**文件**: `tools/skill_manager_tool.py`, lines 48–92; `tools/skills_guard.py`

当 `skills.guard_agent_created` 启用时（默认关闭）：
- Agent 创建的技能经过安全扫描 (`scan_skill`)
- 警告级别发现触发用户确认
- 危险级别发现直接阻止

这是**自我修改的安全阀** — Agent 可以创建技能，但危险技能需要人工批准。

#### 5.2 通过 `patch` 改进技能

**文件**: `tools/skill_manager_tool.py`, lines ~450–600

`patch` action 执行模糊段落匹配 — Agent 可以说"在已有 `testing` 技能中添加关于 `pytest` 的技巧"，系统找到最佳匹配段落更新，保留周围内容。

#### 5.3 Skills Hub — 社区技能发现与同步

**文件**: `hermes_cli/skills_hub.py`, `tools/skills_hub.py`

技能可以发布到社区 hub 并安装。Agent 可以发现、浏览和安装来自其他人的技能 — 使 Agent 能接触外部学习模式。

---

### 6. 自我进化关键文件汇总

| 文件 | 角色 |
|------|------|
| `tools/skill_manager_tool.py` | Skill CRUD — 写入机制 |
| `tools/memory_tool.py` | 双存储持久记忆 (MEMORY.md, USER.md) |
| `agent/memory_manager.py` | 编排内置 + 一个外部 memory provider |
| `agent/memory_provider.py` | 外部 memory 系统的插件接口 |
| `agent/skill_commands.py` | Slash 命令激活 (`/skill-name`) |
| `agent/skill_utils.py` | YAML frontmatter 解析，平台匹配 |
| `tools/skills_tool.py` | 技能列表、查看、渐进式披露 |
| `run_agent.py` (11889–11917) | Skill nudge 触发 + 后台审查 spawn |
| `run_agent.py` (2855–2960) | 后台审查线程 + prompts |
| `run_agent.py` (9054–9058) | 迭代计数器递增 |
| `agent/context_engine.py` | 带 memory provider 钩子的压缩 |
| `plugins/memory/*/` | 8 个外部 memory provider 插件 |
