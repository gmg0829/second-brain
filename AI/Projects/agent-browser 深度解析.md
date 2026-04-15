---
created: 2026-04-14
tags:
  - browser-automation
  - AI-agent
  - engineering-analysis
  - rust
  - cli
  - cdp
source: https://github.com/vercel-labs/agent-browser
stars: 29057
forks: 1764
---

# agent-browser — 工程深度分析

> Repository: `vercel-labs/agent-browser`
> Stars: 29,057 | Forks: 1,764
> 语言: Rust (核心) + TypeScript (CLI wrapper) + React (Dashboard)
> 版本: 0.25.4
> 定位: AI Agent 的浏览器自动化 CLI — Fast native Rust CLI
> 分析日期: 2026-04-14

## 背景与定位

agent-browser 是 Vercel Labs 出品的 AI Agent 浏览器自动化工具，用 Rust 编写核心逻辑，提供快速、原生的浏览器控制能力。 Stars 高达 29K，是目前最受欢迎的浏览器自动化 CLI 之一。

**核心设计原则**: 不依赖 Playwright 或 Puppeteer，直接通过 Chrome DevTools Protocol (CDP) 控制浏览器，Rust 实现保证高性能和低延迟。

---

## 架构总览

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLI Entry (bin/agent-browser.js → Node.js wrapper)                        │
│  └── Rust binary (cargo build)                                              │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLI Layer (cli/src/main.rs + connection.rs)                               │
│  ├── parse_command() → 解析命令                                            │
│  ├── send_command() → 与 Daemon 通信 (Unix Socket / TCP)                   │
│  ├── proxy parsing (HTTP/SOCKS5 支持)                                      │
│  └── session management (list/kill/resume)                                 │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │ Unix Domain Socket (Unix) / TCP (Windows)
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  Daemon (cli/src/native/daemon.rs) — 长驻进程                               │
│  ├── run_daemon() → Unix Socket 监听                                       │
│  ├── DaemonState (浏览器实例 + CDP 客户端)                                 │
│  └── StreamServer (WebSocket runtime 事件流)                               │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CDP Layer (cli/src/native/cdp/)                                           │
│  ├── CdpClient → WebSocket 连接 Chrome                                     │
│  ├── chrome.rs → Chrome CDP 实现                                           │
│  ├── lightpanda.rs → LightPanda 支持 (实验性)                             │
│  ├── discovery.rs → 浏览器发现                                             │
│  └── types.rs → CDP 命令/事件类型                                          │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  Browser (Chrome via CDP)                                                  │
│  ├── 页面导航 / 截图 / DOM 操作                                             │
│  ├── 网络拦截 / Cookie 管理                                                │
│  ├── 开发者工具协议 (DevTools)                                             │
│  └── Console 输出捕获                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 核心模块详解

### 1. CLI 与 Daemon 通信 (connection.rs)

```
CLI (Rust binary)                                   Daemon (Long-lived process)
     │                                                    │
     │  1. ensure_daemon()                                │
     │     - 检查 socket 是否存在                         │
     │     - 不存在则 spawn daemon                        │
     │                                                    │
     │  2. send_command()                                 │
     │     - Unix Socket (Unix) / TCP (Windows)           │
     │     - Request { id, action, ...extra }             │
     │     - Response { success, data, error, warning }   │
     │                                                    │
     └────────────────────────────────────────────────────┘
```

**Socket 文件**: `{socket_dir}/{session}.sock`
**PID 文件**: `{socket_dir}/{session}.pid`
**版本文件**: `{socket_dir}/{session}.version`

### 2. Daemon 架构 (daemon.rs)

```rust
pub async fn run_daemon(session: &str) {
    // 1. 创建 socket 目录
    // 2. 写入 PID 和版本文件
    // 3. 创建 Unix domain socket 监听
    // 4. 初始化 CDP 客户端
    // 5. 启动 StreamServer (WebSocket)
    // 6. 进入主循环: 接收命令 → 执行 → 响应
}
```

**关键特性**:
- **Session 隔离**: 每个 session 独立 daemon 进程
- **状态清理**: `AGENT_BROWSER_STATE_EXPIRE_DAYS` 自动清理过期状态
- **Debug 模式**: `AGENT_BROWSER_DEBUG` 将 stderr 重定向到日志文件
- **Crash 隔离**: stderr 重定向到 /dev/null 防止父进程退出导致 daemon 崩溃

### 3. CDP 客户端 (cdp/client.rs)

```rust
pub struct CdpClient {
    ws_tx: SplitSink<WebSocketStream>,  // WebSocket 发送端
    next_id: AtomicU64,                  // CDP message ID
    pending: Mutex<HashMap<u64, oneshot::Sender<CdpMessage>>>,  // 等待响应的回调
    event_tx: broadcast::Sender<CdpEvent>,  // 事件广播
    raw_tx: broadcast::Sender<RawCdpMessage>,  // 原始消息广播
}
```

**WebSocket 保持活跃**: 每 30 秒发送 ping 帧防止代理断开

### 4. CDP 协议层 (cdp-protocol/)

```json
browser_protocol.json  — Chrome Browser Domain
js_protocol.json       — Chrome Runtime/Debugger/DOM 等
```

手写的 CDP 协议定义，用于类型安全地构建 CDP 请求。

### 5. 浏览器发现 (cdp/discovery.rs + native/browser.rs)

```rust
// 查找 Chrome 方式:
1. AGENT_BROWSER_EXECUTABLE 环境变量
2. Chrome for Testing (agent-browser install)
3. 系统已安装 Chrome
4. Brave / Edge / Playwright 安装
5. Chrome User Data Directory 发现
```

**Chrome Profile 支持**: `run_profiles()` 列出所有 Chrome profile

### 6. 核心动作 (native/actions.rs)

CLI 命令到 CDP 操作的映射：

| 命令 | CDP 操作 |
|------|---------|
| `open <url>` | Page.navigate |
| `click <sel>` | DOM.getBoundingBox + Input.dispatchMouseEvent |
| `fill <sel> <text>` | DOM.focus + Input.insertText |
| `type <sel> <text>` | DOM.focus + Runtime.evaluate (key events) |
| `screenshot` | Page.captureScreenshot |
| `snapshot` | DOM.getDocument + Accessibility.getPartialAXTree |
| `eval <js>` | Runtime.evaluate |
| `wait` | Page.lifecycleEvent / DOM.subtreeUpdated |

### 7. 可访问性快照 (native/snapshot.rs)

**核心输出格式**:
```json
{
  ...,
  elements: [
    { role: 'heading', name: 'Sign In', ref: '@e1' },
    { role: 'textbox', name: 'Email', ref: '@e2' },
    { role: 'button', name: 'Submit', ref: '@e3' }
  ]
}
```

- 生成带 ref 标记的 accessibility tree
- `@e1`, `@e2` 等引用用于后续命令
- AI Agent 可直接使用 ref 而非 CSS 选择器

### 8. 语义定位器 (native/element.rs + commands.rs)

```bash
# 语义定位器 (优先推荐)
agent-browser find role button click --name Submit
agent-browser find text Sign In click
agent-browser find label Email fill test@test.com

# 传统选择器
agent-browser click #submit
agent-browser fill #email test@test.com

# 混合
agent-browser find first .item click
agent-browser find nth 2 a text
```

**支持的语义定位器**: role, text, label, placeholder, alt, title, testid

### 9. 流式事件 (native/stream/)

```bash
# 启动 runtime WebSocket 流
agent-browser stream enable [--port <port>]

# 检查状态
agent-browser stream status

# 停止
agent-browser stream disable
```

**用途**: 实时获取 console.log、网络请求、DOM 变化等事件

### 10. 录制与回放 (native/recording.rs)

```bash
agent-browser record start
# ... 执行操作 ...
agent-browser record stop

agent-browser replay <recording.json>
```

支持 UI 测试的录制/回放

### 11. AI Chat 模式 (cli/src/chat.rs)

```bash
# 单次对话
agent-browser chat '点击登录按钮然后截图'

# 交互 REPL
agent-browser chat
> 点击登录
> 输入邮箱 test@example.com
> 截图
```

自然语言控制浏览器，底层可能调用其他 AI 进行意图理解

### 12. Dashboard (packages/dashboard/)

```
packages/dashboard/
├── next.config.ts   — Next.js App Router
├── src/             — React 组件
├── public/          — 静态资源
└── postcss.config.mjs
```

基于 Next.js 的可视化 Dashboard，用于监控浏览器会话、查看截图历史等

### 13. Skills 系统 (skills/)

```
skills/agent-browser/
├── SKILL.md         — Skill 定义
├── references/      — 参考文档
└── templates/      — 模板
```

让 AI Agent 可以直接调用 agent-browser 技能的 skill 定义

### 14. Eval 系统 (evals/)

```
evals/
├── cases/           — 测试用例
├── lib/             — 测试框架
├── run.ts           — 运行器
└── scenarios.ts     — 场景定义
```

自动化评估浏览器自动化的正确性和鲁棒性

### 15. Benchmark 系统 (benchmarks/)

```bash
# 性能基准测试
pnpm run bench
```

测试浏览器操作延迟、吞吐量等性能指标

---

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| **核心语言** | Rust 2021 Edition |
| **异步运行时** | Tokio (rt-multi-thread, macros, net, io-util, time, sync, signal, process) |
| **WebSocket** | tokio-tungstenite (rustls-tls-webpki-roots) |
| **HTTP 客户端** | reqwest (rustls-tls, stream) |
| **CDP 协议** | 手写 JSON 定义 (browser_protocol.json, js_protocol.json) |
| **图片处理** | image 0.25 |
| **CLI 包装** | Node.js + npm (bin/agent-browser.js) |
| **Dashboard** | Next.js + React + TypeScript |
| **测试** | Bun (evals), temp file (Rust) |
| **构建** | Cargo (Rust) + pnpm (JS) |
| **CI/CD** | GitHub Actions |
| **容器化** | Docker (Linux/Windows 构建) |

---

## 命令体系

### 核心命令

| 命令 | 用途 |
|------|------|
| `open <url>` | 导航到 URL |
| `click <sel>` | 点击元素 (`--new-tab` 新标签页) |
| `dblclick` | 双击 |
| `focus` | 聚焦元素 |
| `type` | 输入 (带 key events) |
| `fill` | 清空后填入 |
| `press` | 按键 (Enter/Tab/Control+a) |
| `keyboard type` | 全局键入 (无需 selector) |
| `hover` | 悬停 |
| `select` | 下拉选择 |
| `check/uncheck` | 复选框 |
| `scroll` | 滚动 |
| `screenshot` | 截图 (`--full`, `--annotate`, `--screenshot-dir`, `--screenshot-format`) |
| `pdf` | 保存为 PDF |
| `snapshot` | 获取可访问性树 (带 refs) |
| `eval` | 执行 JS (`-b` base64, `--stdin`) |
| `close` | 关闭浏览器 |

### 信息获取

| 命令 | 用途 |
|------|------|
| `get text` | 获取文本 |
| `get html` | 获取 innerHTML |
| `get value` | 获取输入值 |
| `get attr` | 获取属性 |
| `get title` | 获取页面标题 |
| `get url` | 获取当前 URL |
| `get cdp-url` | 获取 CDP WebSocket URL |
| `get count` | 统计元素数量 |
| `get box` | 获取边界框 |
| `get styles` | 获取计算样式 |

### 状态检查

| 命令 | 用途 |
|------|------|
| `is visible` | 是否可见 |
| `is enabled` | 是否可用 |
| `is checked` | 是否选中 |

### 语义定位器

| 定位器 | 用途 |
|--------|------|
| `find role <role> <action>` | ARIA role 定位 |
| `find text <text> <action>` | 文本内容定位 |
| `find label <label> <action>` | 标签文本定位 |
| `find placeholder <ph> <action>` | 占位符定位 |
| `find alt <text> <action>` | alt 属性定位 |
| `find title <text> <action>` | title 属性定位 |
| `find testid <id> <action>` | data-testid 定位 |
| `find first/last/nth <n>` | 位置限定 |

### 等待

| 命令 | 用途 |
|------|------|
| `wait <selector>` | 等待元素可见 |
| `wait <ms>` | 等待时间 |
| `wait --text` | 等待文本出现 |
| `wait --url` | 等待 URL 匹配 |
| `wait --load` | 等待加载状态 (load/domcontentloaded/networkidle) |
| `wait --fn` | 等待 JS 条件 |

### AI 对话

| 命令 | 用途 |
|------|------|
| `chat <instruction>` | 单次自然语言指令 |
| `chat` | 交互 REPL 模式 |

---

## 安装方式

```bash
# npm 全局安装 (推荐)
npm install -g agent-browser
agent-browser install  # 下载 Chrome for Testing

# 项目本地安装
npm install agent-browser

# Homebrew (macOS)
brew install agent-browser

# Cargo (Rust)
cargo install agent-browser

# 源码
git clone ...
pnpm install
pnpm build
pnpm build:native
pnpm link --global

# Linux 依赖
agent-browser install --with-deps

# 升级
agent-browser upgrade
```

---

## 特性亮点

### 1. 原生 Rust 实现
不是 Node.js 包装 Playwright，而是从零用 Rust 实现，性能最优。Build 使用 `lto = true, codegen-units = 1, strip = true` 做极致优化。

### 2. CDP 直连
不依赖 Playwright/Puppeteer，直接通过 WebSocket 连接 Chrome DevTools Protocol。这使得：
- 体积更小 (无 Playwright Chromium 副本)
- 延迟更低 (直接协议，无中间层)
- 兼容更好 (任何 CDP 兼容浏览器)

### 3. AI-Friendly 输出
`snapshot` 命令输出带 ref 的 accessibility tree，AI Agent 可以直接用 `@e1`, `@e2` 引用元素，无需理解 CSS 选择器。

### 4. 语义定位器优先
推荐 `find role button click --name Submit` 方式而非 CSS 选择器，更接近自然语言，AI 更容易理解和生成。

### 5. 多平台支持
- **macOS**: Homebrew + Apple Silicon + Intel 双架构 build
- **Linux**: Docker 构建 + 系统依赖自动安装
- **Windows**: Docker 构建 + TCP socket (Unix domain socket 不可用)
- **Chrome 探测**: 自动发现 Chrome/Brave/Edge/Playwright

### 6. 会话持久化
```
session list   — 列出活跃会话
session kill   — 终止会话
session resume — 恢复会话
```
Session 状态通过 socket 文件持久化，重启后可以恢复。

### 7. 流式事件
`stream enable` 开启 WebSocket 实时推送，AI Agent 可以监听 console.log、网络请求等事件。

### 8. AI Chat 模式
自然语言控制浏览器，底层可能调用 LLM 进行意图理解后转换为具体操作。

### 9. 录制回放
`record start/stop` + `replay` 支持 UI 测试自动化。

### 10. 截图标注
`--annotate` 选项在截图上标注元素编号，方便调试和文档。

---

## 局限与注意事项

1. **仅支持 Chrome/Chromium**: 不支持 Firefox (无 CDP) 和 WebKit
2. **Windows 使用 TCP**: Unix domain socket 仅 Unix 可用，Windows 用 TCP
3. **需要 Chrome**: 需运行 `agent-browser install` 下载或使用已有 Chrome
4. **Session 隔离**: 每个 session 一个 daemon，资源占用较高
5. **无内置 OCR**: 截图识别需配合外部服务

---

## 在 Agent 工程中的位置

```
┌─────────────────────────────────────────────────────────────┐
│  AI Agent (Claude Code / OpenCode / Kimi CLI)               │
│  └── 使用 agent-browser 工具操作浏览器                       │
└─────────────────────────┬───────────────────────────────────┘
                          │ agent-browser CLI
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  agent-browser (Rust CLI)                                    │
│  ├── CLI → Daemon 通信 (Unix Socket / TCP)                   │
│  ├── Daemon → CDP 通信 (WebSocket)                          │
│  └── 语义定位器 + Accessibility Tree                         │
└─────────────────────────┬───────────────────────────────────┘
                          │ CDP Protocol
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Chrome / Chromium (via DevTools Protocol)                  │
│  ├── 页面渲染                                                │
│  ├── DOM 操作                                                │
│  ├── 网络拦截                                                │
│  └── 开发者工具                                              │
└─────────────────────────────────────────────────────────────┘
```

agent-browser 是 AI Agent 的**浏览器控制层**，让 Agent 能够像人一样操作浏览器（点击、填表、截图），是实现网页自动化任务的核心工具。