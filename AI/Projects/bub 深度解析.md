---
title: Bub 深度解析
tags: [agent, ai, python, hook-architecture]
date: 2026-04-15
---

> Bub - "A common shape for agents that live alongside people"

## 项目概览

| 属性 | 值 |
|------|-----|
| **仓库** | [bubbuild/bub](https://github.com/bubbuild/bub) |
| **描述** | Bub it. Build it. A common shape for agents that live alongside people. |
| **Stars** | 1,238 |
| **Forks** | 111 |
| **语言** | Python |
| **许可** | Apache License 2.0 |
| **创建时间** | 2025-07-13 |
| **最后更新** | 2026-04-14 |
| **Python 版本** | 3.12+ |

## 核心理念

Bub 起源于**群聊**场景 — 不是演示或私人助手，而是一个必须与真实人类和其他代理共存的队友。在并发任务、不完整上下文、没有等待的环境中成长，这塑造了其独特的设计哲学。

### 设计核心

1. **Hook-first 架构** - 基于 [pluggy](https://pluggy.readthedocs.io/)
2. **小核心** - 约 200 行 + 可替换的内置插件
3. **Context from tape** - 上下文来自追加式的事实存储，而非会话累积
4. **单一管道跨通道** - CLI 和 Telegram 共享相同的 `process_inbound()` 路径

## 架构解析

### 核心文件结构

```
src/bub/
├── __main__.py           # Typer CLI 入口
├── framework.py          # Turn 编排和出站路由
├── hookspecs.py          # Hook 合约定义
├── hook_runtime.py      # Hook 执行辅助
├── envelope.py          # 消息信封
├── skills.py             # Skill 发现
├── tools.py              # 工具注册
├── types.py              # 类型定义
├── utils.py              # 工具函数
│
├── builtin/              # 内置运行时
│   ├── hook_impl.py     # 内置 Hook 实现
│   ├── agent.py        # Agent 核心
│   ├── auth.py          # 认证
│   ├── cli.py           # CLI 接线
│   ├── context.py       # 上下文
│   ├── settings.py      # 设置
│   ├── shell_manager.py # Shell 管理
│   ├── store.py         # 存储
│   ├── tape.py          # Tape 上下文
│   └── tools.py         # 工具
│
├── channels/            # 通道抽象
│   ├── base.py          # 通道基类
│   ├── cli/             # CLI 适配器
│   ├── telegram.py     # Telegram 适配器
│   ├── handler.py      # 消息处理
│   ├── manager.py      # 通道管理
│   └── message.py       # 消息定义
│
└── skills/              # 打包的 Skills
```

### Turn Pipeline (核心流程)

```
resolve_session → load_state → build_prompt → run_model
                                              ↓
           dispatch_outbound ← render_outbound ← save_state
```

每个阶段都是一个 **Hook**，内置插件最先注册，后续插件可以覆盖。没有特殊例外。

### Hook 规范

关键 Hook 接口定义在 `hookspecs.py`:

- `resolve_session` - 解析会话
- `load_state` - 加载状态
- `build_prompt` - 构建提示词
- `run_model` - 运行模型
- `render_outbound` - 渲染输出
- `save_state` - 保存状态
- `dispatch_outbound` - 分发输出

### Skills as Documents

Bub 的 Skills 是 `SKILL.md` 文件，包含验证的 frontmatter，而非代码模块。这与传统的 agent 系统形成鲜明对比。

```yaml
---
name: example-skill
description: 技能描述
tags: []
---
# Skill 文档正文
```

## 技术栈

### 核心依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| pluggy | ≥1.6.0 | Hook 插件系统 |
| pydantic | ≥2.0.0 | 数据验证 |
| typer | ≥0.9.0 | CLI 框架 |
| any-llm-sdk | - | LLM 客户端 |
| rich | ≥13.0.0 | 终端渲染 |
| prompt-toolkit | ≥3.0.0 | CLI 输入 |
| python-telegram-bot | ≥21.0 | Telegram 集成 |
| loguru | ≥0.7.2 | 日志 |

### 依赖管理

- 使用 `uv` 进行包管理
- 插件项目独立于 `~/.bub/bub-project`

## 配置与环境

### 环境变量

| 变量 | 默认值 | 描述 |
|------|--------|------|
| `BUB_MODEL` | `openrouter:qwen/qwen3-coder-next` | 模型标识 |
| `BUB_API_KEY` | - | Provider 密钥 |
| `BUB_API_BASE` | - | 自定义端点 |
| `BUB_API_FORMAT` | `completion` | API 格式 |
| `BUB_MAX_STEPS` | `50` | 最大工具调用迭代 |
| `BUB_MAX_TOKENS` | `1024` | 每次调用最大 token |
| `BUB_TELEGRAM_TOKEN` | - | Telegram Bot Token |

### CLI 命令

```bash
bub chat                    # 交互式 REPL
bub run "message"          # 单次任务
bub gateway                # 通道监听模式
bub install               # 安装/同步插件依赖
bub update                # 更新插件依赖
bub login openai          # OpenAI Codex OAuth
```

## 与其他 Agent 框架的对比

| 特性 | Bub | OpenAI Agents SDK | Claude Code |
|------|-----|-------------------|-------------|
| **架构** | Hook-first | Agent/handoff | ACP |
| **Context** | Tape (append-only) | 累积 | 会话历史 |
| **多代理共存** | 原生支持 | 有限 | 有限 |
| **技能格式** | SKILL.md | 代码模块 | 指令 |
| **核心大小** | ~200 行 | 较大 | 较大 |
| **通道支持** | CLI/Telegram | 主要 API | ACP |

## 核心亮点

### 1. Context from Tape

上下文存储在追加式的事实表中，带有锚点标记阶段转换。上下文按需组装 — 不累积，不压缩成有损的摘要。

> "Context is not baggage to carry forever — it is a working set, constructed when needed and let go when done."

### 2. Hooks All The Way Down

整个 Turn 管道就是 Hooks。覆盖 `build_prompt`、`run_model` 或 `render_outbound` 来改变行为。核心不特权化自己的内置插件。

### 3. 多代理共存

Bub 在多人聊天中成长，多个代理同时运行。单用户流程隐藏结构问题；共享环境快速暴露问题。这塑造了：

- 隔离的会话状态
- 非阻塞的处理模式
- 清晰的错误边界

### 4. 扩展方式

```python
from bub import hookimpl

class EchoPlugin:
    @hookimpl
    def build_prompt(self, message, session_id, state):
        return f"[echo] {message['content']}"

    @hookimpl
    async def run_model(self, prompt, session_id, state):
        return prompt
```

## 开发与测试

```bash
uv sync                           # 安装依赖
uv run ruff check .                # Lint 检查
uv run mypy src                  # 类型检查
uv run pytest -q                # 测试
uv run bub chat                  # 交互式 CLI
uv run bub gateway              # 通道监听
```

## 文档资源

- [官方网站](https://bub.build)
- [Architecture](https://bub.build/architecture/)
- [Features](https://bub.build/features/)
- [Channels](https://bub.build/channels/)
- [Skills](https://bub.build/skills/)
- [Extension Guide](https://bub.build/extension-guide/)
- [Deployment](https://bub.build/deployment/)

## 关键文件

| 文件 | 描述 |
|------|------|
| [`src/bub/framework.py`](https://github.com/bubbuild/bub/blob/main/src/bub/framework.py) | Turn 编排器 |
| [`src/bub/hookspecs.py`](https://github.com/bubbuild/bub/blob/main/src/bub/hookspecs.py) | Hook 合约 |
| [`src/bub/builtin/hook_impl.py`](https://github.com/bubbuild/bub/blob/main/src/bub/builtin/hook_impl.py) | 内置 Hook |
| [`src/bub/skills.py`](https://github.com/bubbuild/bub/blob/main/src/bub/skills.py) | Skill 发现 |
| [AGENTS.md](https://github.com/bubbuild/bub/blob/main/AGENTS.md) | 开发指南 |

## 总结

Bub 是一个精心设计的 ** Agent 框架**，其核心理念是��

1. **小核心 + 可替换内置** - 保持核心简洁，通过 Hook 扩展
2. **多代理共存** - 在真实环境中演进，而非演示
3. **Tape 上下文** - 按需构建，避免累积膨胀
4. **Skills as Documents** - 更友好的技能定义方式

它与主流 Agent 框架走了不同的路线，更强调**共享环境下的协作能力**，而非单一用户的全能助手定位。对于需要多代理协作或群聊场景的项目，Bub 是一个值得关注的选择。