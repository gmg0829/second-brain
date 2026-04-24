---
title: Deep Agents 深度解析
tags: [agent, ai, langchain, langgraph, python]
date: 2026-04-15
---

> The batteries-included agent harness

## 项目概览

| 属性 | 值 |
|------|-----|
| **仓库** | [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents) |
| **描述** | Agent harness built with LangChain and LangGraph |
| **Stars** | 20,742 |
| **Forks** | 2,880 |
| **语言** | Python |
| **许可** | MIT License |
| **创建时间** | 2025-07-27 |
| **最后更新** | 2026-04-15 |
| **Python 版本** | 3.11+ |

## 核心理念

Deep Agents 是一个**开箱即用的 Agent 框架**，基于 LangChain 和 LangGraph 构建：

> "Instead of wiring up prompts, tools, and context management yourself, you get a working agent immediately and customize what you need."

### 设计哲学

- **Plan first** - 使用 `write_todos` 进行任务分解和进度跟踪
- **Filesystem** - 文件读写操作
- **Shell access** - 命令执行（带沙箱）
- **Sub-agents** - 子代理委托，隔离上下文
- **Smart defaults** - 内置提示词优化
- **Context management** - 自动摘要，大输出保存到文件

## 技术架构

### Monorepo 结构

```
libs/
├── deepagents/      # 核心 SDK
├── cli/            # CLI 工具
├── acp/            # Agent Context Protocol 支持
├── evals/          # 评估套件
├── partners/        # 集成包 (Daytona 等)
└── repl/          # REPL
```

### 核心包结构 (libs/deepagents/)

```
deepagents/
├── graph.py              # 核心图构建 (create_deep_agent)
├── __init__.py           # 导出
├── backends/             # 后端实现
│   ├── filesystem.py   # 文件系统后端
│   ├── sandbox.py     # 沙箱后端
│   ├── state.py      # 状态后端
│   ├── store.py     # 存储后端
│   └── local_shell.py # 本地 Shell
├── middleware/           # 中间件
│   ├── filesystem.py   # 文件系统中间件
│   ├── subagents.py  # 子代理中间件
│   ├── async_subagents.py
│   ├── skills.py   # Skills 中间件
│   ├── summarization.py
│   ├── permissions.py
│   ├── memory.py
│   └── patch_tool_calls.py
├── profiles/            # 配置文件
└── tests/
```

### 核心技术栈

| 类别 | 技术 |
|------|------|
| **框架** | LangChain, LangGraph |
| **运行时** | Python 3.11+ |
| **依赖** | langchain-core, langchain-anthropic, langchain-google-genai |
| **工具** | ruff, ty (类型检查), pytest |

## 核心功能

### 1. create_deep_agent

主入口点，返回编译后的 LangGraph 图：

```python
from deepagents import create_deep_agent

agent = create_deep_agent()
result = agent.invoke({"messages": [{"role": "user", "content": "Research LangGraph and write a summary"}]})
```

可配置项：
- `model` - 语言模型（默认 Claude Sonnet 4）
- `tools` - 自定义工具
- `system_prompt` - 自定义系统提示词
- `sub_agents` - 子代理配置

### 2. 工具系统

| 工具 | 功能 |
|------|------|
| `read_file` | 读取文件 |
| `write_file` | 写入文件 |
| `edit_file` | 编辑文件 |
| `ls` | 列出目录 |
| `glob` | 文件搜索 |
| `grep` | 内容搜索 |
| `execute` | Shell 命令执行 |
| `write_todos` | 任务规划 |
| `task` | 子代理委托 |

### 3. 中间件系统

基于 LangGraph 中间件架构：

```python
from langchain.agents.middleware import TodoListMiddleware, HumanInTheLoopMiddleware

# TodoListMiddleware - 任务清单
# FilesystemMiddleware - 文件系统操作
# SubAgentMiddleware - 子代理
# SkillsMiddleware - 技能系统
# MemoryMiddleware - 记忆管理
# SummarizationMiddleware - 自动摘要
# PermissionsMiddleware - 权限控制
```

### 4. Backend 系统

后端可插拔设计：

```python
from deepagents.backends import (
    FilesystemBackend,
    SandboxBackend,
    StateBackend,
    StoreBackend,
)
```

### 5. CLI

类 Claude Code 的终端应用：

```bash
curl -LsSf https://raw.githubusercontent.com/langchain-ai/deepagents/main/libs/cli/scripts/install.sh | bash
```

功能：
- Interactive TUI
- Web 搜索
- Headless 模式
- MCP 支持
- Remote Sandboxes

## 与 Claude Code 对比

| 特性 | Deep Agents | Claude Code |
|------|----------|------------|
| **开源** | ✅ MIT | ❌ 部分闭源 |
| **Provider** | 多 (Anthropic, Google, OpenAI) | 主要 Anthropic |
| **架构** | LangGraph | 自有 |
| **CLI** | ✅ | ✅ |
| **后端** | 可插拔 | 固定 |
| **LangSmith** | 原生集成 | 无 |

## 代码示例

### 基本用法

```python
from langchain.chat_models import init_chat_model
from deepagents import create_deep_agent

# 自定义模型
agent = create_deep_agent(
    model=init_chat_model("openai:gpt-4o"),
    tools=[my_custom_tool],
    system_prompt="You are a research assistant.",
)
```

### 自定义后端

```python
from deepagents import create_deep_agent
from deepagents.backends import SandboxBackend

agent = create_deep_agent(
    backend=SandboxBackend(),
)
```

### LangGraph 集成

```python
from deepagents import create_deep_agent
from langgraph.checkpoint.memory import MemorySaver

agent = create_deep_agent(
    checkpointer=MemorySaver(),
)

# 使用流式输出
for event in agent.stream({"messages": [...]}):
    print(event)
```

## 开发规范

### 代码质量

- 必须有类型注解和返回类型
- 使用描述性变量名
- 避免 `any` 类型
- 优先单字变量名

```python
def filter_unknown_users(users: list[str], known_users: set[str]) -> list[str]:
    """Filter users not in the known set.

    Args:
        users: List of user identifiers to filter.
        known_users: Set of known/valid user identifiers.

    Returns:
        List of users not in the known set.
    """
```

### 测试

- 单元测试：`tests/unit_tests/`（无网络调用）
- 集成测试：`tests/integration_tests/`（允许网络调用）
- 每个新功能必须有测试覆盖

### Lint 规则

- 使用 `ruff` 进行 lint 和格式化
- 使用 `ty` 进行类型检查
- 优先 inline `# noqa: RULE` 抑制规则

```python
# GOOD - 精确的 inline 抑制
timeout = 30  # noqa: PLR2004 - default HTTP timeout
```

## 安全模型

> Deep Agents follows a "trust the LLM" model. The agent can do anything its tools allow. Enforce boundaries at the tool/sandbox level, not by expecting the model to self-police.

- 在工具/沙箱层强制边界
- 不依赖模型自我约束
- 明确的权限控制

## 版本与发布

- 使用 `setuptools` 构建
- 自动版本管理
- 多包独立版本

## 关键文件

| 文件 | 描述 |
|------|------|
| [libs/deepagents/deepagents/graph.py](https://github.com/langchain-ai/deepagents/blob/main/libs/deepagents/deepagents/graph.py) | 核心 Agent 创建 |
| [libs/deepagents/deepagents/middleware/](https://github.com/langchain-ai/deepagents/tree/main/libs/deepagents/deepagents/middleware/) | 中间件实现 |
| [libs/deepagents/deepagents/backends/](https://github.com/langchain-ai/deepagents/tree/main/libs/deepagents/deepagents/backends/) | 后端实现 |
| [libs/cli/deepagents_cli/](https://github.com/langchain-ai/deepagents/tree/main/libs/cli/deepagents_cli) | CLI 实现 |
| [AGENTS.md](https://github.com/langchain-ai/deepagents/blob/main/AGENTS.md) | 开发规范 |

## 总结

Deep Agents 是 **LangChain 官方** 打造的"开箱即用"Agent 框架：

1. **基于 LangGraph** - 生产级运行时，流式、持久化、检查点
2. **Provider 无关** - 支持任何支持工具调用的大模型
3. **完整功能** - 规划、文件访问、子代理、上下文管理
4. **可定制** - 工具、提示词、模型均可替换
5. **MIT 开源** - 完全可扩展

灵感主要来自 **Claude Code**，目标是把"是什么让 Claude Code 通用"提取出来并使其更加通用。