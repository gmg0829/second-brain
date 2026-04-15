---
created: 2026-04-14
tags:
  - memory-system
  - AI-agent
  - engineering-analysis
  - golang
  - database
  - vector-search
source: https://github.com/mem9-ai/mem9
stars: 957
forks: 98
---

# mem9 / mnemos — 工程深度分析

> Repository: `mem9-ai/mem9`
> Stars: 957 | Forks: 98
> 语言: Go (server) + TypeScript (plugins/dashboard)
> 别名: mnemos / mnemo-server
> 定位: AI Agent 的持久化记忆层 — "Unlimited memory for OpenClaw"
> 分析日期: 2026-04-14

## 背景与定位

AI 编码 Agent（Claude Code、OpenCode、OpenClaw 等）在会话之间是完全失忆的。mem9 给每个 Agent 提供**云端持久化共享记忆**，跨越会话和机器，多 Agent 协作也能共享记忆池。

**核心设计原则**: Agent 插件保持无状态 — 所有状态存在于 mnemo-server，背后由 TiDB Cloud Serverless 支撑。

---

## 架构总览

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Agents (Stateless Plugins)                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Claude Code  │  │  OpenCode    │  │  OpenClaw    │  │   Any HTTP  │     │
│  │ Hooks+Skill │  │ Plugin SDK   │  │ Memory Plugin│  │   Client    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼────────────────┼────────────────┼────────────────┼─────────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                                 │ REST API
                                 ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  mnemo-server (Go)  — port 8080                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ Handler Layer: memory.go / recall.go / tenant.go / task.go            │  │
│  │ Service Layer: MemoryService + IngestService                           │  │
│  │ Repository Layer: TiDB / Postgres / DB9                               │  │
│  │ Tenant Pool: per-tenant DB connections with lifecycle management       │  │
│  │ Embedding: OpenAI-compatible / Ollama / LM Studio / TiDB EMBED_TEXT   │  │
│  │ Encryption: plaintext / MD5 / AWS KMS                                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
                                 │
                     ┌──────────┴──────────┐
                     ▼                     ▼
           ┌─────────────────┐    ┌─────────────────┐
           │ Control Plane   │    │  TiDB Cloud      │
           │ (tenants table) │    │  Serverless      │
           │   myDB          │    │  (per-tenant DB) │
           └─────────────────┘    │  memories table  │
                                  └─────────────────┘
```

---

## 核心数据模型

### Memory (domain/types.go)

```go
type Memory struct {
    ID          string           // UUID v4
    Content     string          // 记忆内容 (max 50,000 chars)
    MemoryType  MemoryType      // "pinned" | "insight" | "session"
    Source      string          // 来源 agent ID
    Tags        []string        // 标签 (max 20)
    Metadata    json.RawMessage
    Embedding   []float32       // 向量 (1536d / 1024d)

    AgentID     string          // 创建记忆的 Agent
    SessionID   string          // 来源 Session
    UpdatedBy   string
    SupersededBy string        // 替代者 ID (reconciliation 时)
    State       MemoryState     // "active" | "paused" | "archived" | "deleted"
    Version     int             // 乐观锁版本号
    Score       *float64        // 搜索相似度分数
    Confidence  *int            // 置信度
    RelativeAge string          // "3 days ago" (查询时动态填充)
    CreatedAt / UpdatedAt time.Time
}
```

### Tenant (multi-tenant 架构)

```go
type Tenant struct {
    ID          string         // UUID
    Name        string         // 租户名 (UNIQUE)
    // 连接信息 (从不暴露在 API 响应中)
    DBHost / DBPort / DBUser / DBPassword / DBName / DBTLS
    Provider    string         // "tidb_zero" | "tidb_pool" | "postgres" | "db9"
    ClusterID   string
    ClaimURL    string
    Status      TenantStatus  // "provisioning" | "active" | "suspended" | "deleted"
    SchemaVersion int
}
```

---

## 存储层 — 三后端适配

### Repository Factory (factory.go)

```
NewMemoryRepo(backend, db, autoModel, ftsEnabled, clusterID)
     │
     ├── "tidb"  → tidb.NewMemoryRepo()   [VECTOR type, EMBED_TEXT]
     ├── "postgres" → postgres.NewMemoryRepo()
     └── "db9"   → db9.NewMemoryRepo()
```

### TiDB Schema 特点

```sql
CREATE TABLE memories (
    id          VARCHAR(36) PRIMARY KEY,
    content     MEDIUMTEXT NOT NULL,
    embedding   VECTOR(1536) NULL,   -- TiDB 原生向量类型

    memory_type VARCHAR(20) DEFAULT 'pinned',
    agent_id    VARCHAR(100) NULL,
    session_id  VARCHAR(100) NULL,
    state       VARCHAR(20)  DEFAULT 'active',
    version     INT         DEFAULT 1,
    superseded_by VARCHAR(36) NULL,

    -- 索引
    INDEX idx_memory_type (memory_type),
    INDEX idx_source (source),
    INDEX idx_state (state),
    INDEX idx_agent (agent_id),
    INDEX idx_session (session_id),
    INDEX idx_updated (updated_at)
);
```

**TiDB 独有特性**:
- `VECTOR(1536)` 原生向量列（无需 Pinecone/Qdrant）
- `EMBED_TEXT()` 服务器端自动生成 embedding（不需要 OpenAI key）
- `VEC_COSINE_DISTANCE()` 向量距离计算
- Full-text search (`MULTILINGUAL` parser) — 支持中英文
- `ADD_COLUMNAR_REPLICA_ON_DEMAND` 自动 TiFlash 列存储

---

## 多租户隔离 — Tenant Pool

```
Control Plane (myDB)          Tenant Pool                  Data Plane (per tenant)
┌──────────────────┐    ┌─────────────────────┐    ┌─────────────────────────┐
│ tenants 表        │    │ TenantPool          │    │ tidb-xxx.tidbcloud.com  │
│ (单例 DB)         │───►│  - per-tenant 动态连接  │───►│ (tenant_A 的 DB)        │
│                   │    │  - MaxIdle/MaxOpen  │    │                         │
│                   │    │  - Lifetime/IdleTimeout │ └─────────────────────────┘
│                   │    │  - TotalLimit=200  │    └─────────────────────────┐
│                   │    │  - 自动清理过期连接   │              │              │
│                   │    └─────────────────────┘              ▼              │
└──────────────────┘                    │         ┌─────────────────────────┐
                                        └────────►│ tidb-yyy.tidbcloud.com  │
                                                  │ (tenant_B 的 DB)        │
                                                  └─────────────────────────┘
```

**自动 Provisioning**: `MNEMO_TIDB_ZERO_ENABLED=true` 时，通过 TiDB Zero API 自动创建集群，无需手动注册。

---

## 核心服务

### 1. MemoryService — 记忆 CRUD

```go
Create(ctx, agentID, content, tags, metadata) → Memory
  │
  ├── 无 LLM → 直接 embed + 写库
  └── 有 LLM → 触发 IngestService.smartPipeline

Search(ctx, filter: MemoryFilter) → []Memory
  ├── hybrid_search = VEC_COSINE_DISTANCE + keyword_match
  └── SecondHop: 首轮 top-3 结果作为种子做二次召回 (RRF 融合)

UpdateOptimistic(ctx, memory, expectedVersion)
  └── 乐观锁: version 字段

Delete(ctx, id)
  └── 软删除: state='deleted'
```

**Hybrid Search 策略**:

```go
secondHopWeight   = 0.3   // 二次召回权重
secondHopTopN     = 3     // 首轮取 top-3 作为种子
secondHopGateScore = 0.5  // 首轮分数 < 0.5 跳过二轮

// RRF (Reciprocal Rank Fusion) 融合多路召回结果
recallRRFMaxScore = 2.0 / 61.0
```

### 2. IngestService — Smart Memory Pipeline

```
输入: IngestRequest{
        Messages: []IngestMessage,  // 对话消息
        SessionID: string,
        AgentID: string,
        Mode: "smart" | "raw"
      }
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: Extract (LLM 抽取事实)                             │
│                                                             │
│ LLM(system="Extract atomic facts from conversation...")     │
│   ↓                                                         │
│ [ExtractedFact{content, tags, factType, confidence}]        │
│   • factType: "observation" | "preference" | "preference+" │
│     | "query_intent" | "raw_fallback"                       │
│   • confidence: 0-100                                       │
│   • skip query_intent 类型的事实                             │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Reconcile (与已有记忆对账)                         │
│                                                             │
│ 对每个 ExtractedFact:                                        │
│   1. 在已有记忆中搜索相似内容                                  │
│   2. 相似 > 阈值 → UPDATE existing memory                   │
│   3. 相似 < 阈值 → CREATE new memory                        │
│   4.superseded_by 链接旧记录                                  │
│   ↓                                                          │
│ IngestResult{                                                │
│   Status: "complete" | "partial" | "failed",                │
│   MemoriesChanged: N,                                        │
│   InsightIDs: [...],                                         │
│   Warnings: N                                                │
│ }                                                            │
└─────────────────────────────────────────────────────────────┘
```

**无 LLM 回退**: 当 `MNEMO_LLM_API_KEY` 未设置时，走 `ModeRaw` — 直接存储原始对话，embedding 由 `embed.Embedder` 生成。

### 3. Embedder — 向量嵌入

```go
// 支持三种 embedding 来源
1. TiDB EMBED_TEXT()     — MNEMO_EMBED_AUTO_MODEL 设置后优先
2. OpenAI API            — MNEMO_EMBED_API_KEY + MNEMO_EMBED_MODEL
3. Ollama/LM Studio      — MNEMO_EMBED_BASE_URL (本地无 key)

// 工厂函数 (autoModel 非空时返回 nil，依赖 TiDB 服务器端 embedding)
func New(cfg Config) *Embedder
func (e *Embedder) Embed(ctx context.Context, text string) ([]float32, error)
```

---

## Recall (记忆召回) — 最复杂的子系统

`recall.go` 是整个工程最有技术含量的文件。它不是简单做向量相似度搜索，而是模拟人类的"记忆召回"心理过程。

### 查询分类 (recallQueryShape)

```go
recallQueryShapeGeneral     // 一般查询 (no specific shape)
recallQueryShapeEntity     // 实体查询 ("who did X", "what is Y")
recallQueryShapeCount      // 数量查询 ("how many", "couple", "several")
recallQueryShapeTime       // 时间查询 ("yesterday", "last week", "2024年")
recallQueryShapeLocation   // 地点查询 ("in/at/from/near X")
recallQueryShapeEnumeration // 枚举查询 ("what books", "which activities")
recallQueryShapeExact      // 精确查询
```

**分类依据**: 检测正则表达式模式

```go
answerCNLocationSuffixRe  // 位置后缀 ("市|省|区|县|州|国|路|街")
answerCNCountRe           // 数量词 ("零一二三四五六七八九十百千万两")
answerCNTimeRe            // 中文时间 ("2024年|3月|15号|10点")
answerRelativeTimeRe      // 英文相对时间 ("yesterday|tomorrow|last week")
recallEnumerationPluralRe // 枚举复数 ("activities|books|events|items")
```

### Recall 三路候选召回

```
用户查询
  │
  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Pinned       │  │ Insight      │  │ Session      │
│ (max 5)      │  │ (max 10)     │  │ (max 10)     │
│ confidence   │  │ confidence   │  │ confidence   │
│ filtering    │  │ filtering    │  │ filtering    │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                │                │
       ▼                ▼                ▼
applyRecallConfidence()  (根据 query shape 调整置信度)
       │                │                │
       ▼                ▼                ▼
selectPinnedRecallCandidates()
  (pinned keep max: 2, 置信度 >= 70)
       │
       ▼
selectMixedRecallCandidates()
  (RRF 融合 + confidence gap stop)
       │
       ▼
最终输出 (注入 Agent Prompt)
```

** Confidence Gap Stop**: 连续候选项分数差 > 18 分时截断，防止低置信度结果干扰。

** Enumeration Budget**: 枚举类查询限制预算 `20` 条，支持二次召回 (second hop)。

---

## Agent 插件 — 无状态记忆集成

### OpenClaw Plugin (TypeScript)

```
openclaw-plugin/
  hooks.ts        — 4 个 lifecycle hook
  backend.ts     — REST API 调用 mnemo-server
  server-backend.ts — 服务端 backend
  types.ts       — Memory / IngestMessage 类型
```

**Hook 生命周期**:

| Hook | 时机 | 行为 |
|------|------|------|
| `before_prompt_build` | 每次 LLM 调用前 | 向量搜索 → 注入相关记忆 (max 10) |
| `agent_end` | 会话结束时 | Smart ingest pipeline (size-aware message selection) |
| `before_reset` | `/reset` 前 | 保存 session context |
| `after_compaction` | 上下文压缩后 | (占位符，待扩展) |

**size-aware message selection**:
```
selectMessages(messages, maxBytes=200KB, maxCount=20)
  │ 从最新消息往回选，直到吃满 budget
  │ 至少保留 1 条消息
  ▼
IngestRequest → POST /v1alpha1/.../ingest
```

### Claude Code Plugin (TypeScript)

```
claude-plugin/
  hooks/         — Hook 脚本 (Shell 命令)
  skills/        — Skill 脚本
    recall/       — recall skill (记忆召回)
    store/        — store skill (记忆存储)
    setup/        — setup skill (会话初始化)
```

### OpenCode Plugin (JSON Config)

```json
{
  "plugin": ["@mem9/opencode"],
  // system.transform 注入 memories
  // session.idle 自动捕获
}
```

---

## Dashboard (前端)

```
dashboard/app/
  Vite + React 18 + TypeScript
  src/
    ... React components
  public/         — 静态资源 (SVG wordmark)
  scripts/        — 构建脚本
```

**前后端分离**:
- 前端: `dashboard/app/` (本 repo)
- 后端 API: `mem9-node` repo 的 `apps/api` + `apps/worker`

Dashboard 功能: 记忆浏览 / 搜索 / 管理 / 分析可视化。

---

## Benchmark (评估)

```
benchmark/
  BASELINE.md       — 基线定义
  MR-NIAH/          — Multi-Recall Needle-in-a-Haystack 评估
  locomo/            — Locomo 基准
  prompts/          — 评估用 prompt 模板
  results/          — 评估结果
  scripts/          — 评估脚本
  workspace/        — 测试用工作区
```

**MR-NIAH**: 在大海捞针式评估中测试多路召回质量。

---

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| **服务器** | Go (>=1.21) |
| **数据库** | TiDB Cloud Serverless (MySQL 兼容) / PostgreSQL / DB9 |
| **向量** | TiDB VECTOR type (原生) / OpenAI embeddings |
| **LLM** | OpenAI-compatible API (gpt-4o-mini 默认) |
| **Agent 插件** | TypeScript (OpenClaw/OpenCode/Claude Code) |
| **Dashboard** | Vite + React 18 + TypeScript |
| **API** | Go net/http (无框架) |
| **连接池** | 手动 TenantPool (sync.RWMutex) |
| **监控** | Prometheus metrics |
| **加密** | plaintext / MD5 / AWS KMS |
| **部署** | Docker |

---

## 环境变量体系

### Core Server
| Variable | 默认值 | 用途 |
|----------|--------|------|
| `MNEMO_DSN` | — | 控制平面数据库连接 |
| `MNEMO_PORT` | 8080 | HTTP 端口 |
| `MNEMO_DB_BACKEND` | tidb | 后端类型 |
| `MNEMO_RATE_LIMIT` | 100 req/s | 限速 |

### Provisioning
| Variable | 用途 |
|----------|------|
| `MNEMO_TIDB_ZERO_ENABLED` | TiDB Zero 自动创建集群 |
| `MNEMO_TIDBCLOUD_POOL_ID` | TiDB Cloud Pool ID |
| `MNEMO_TENANT_POOL_*` | 连接池参数 |

### Embedding & Ingest
| Variable | 用途 |
|----------|------|
| `MNEMO_EMBED_AUTO_MODEL` | TiDB EMBED_TEXT() 模型 |
| `MNEMO_EMBED_API_KEY` | OpenAI embedding key |
| `MNEMO_EMBED_BASE_URL` | 本地 embedding 端点 (Ollama) |
| `MNEMO_INGEST_MODE` | "smart" / "raw" |
| `MNEMO_LLM_API_KEY` | LLM API key (smart ingest) |

### Security
| Variable | 用途 |
|----------|------|
| `MNEMO_ENCRYPT_TYPE` | "plain" / "md5" / "kms" |
| `MNEMO_ENCRYPT_KEY` | 加密密钥 |

---

## 完整 API 路由

### v1alpha1 (Legacy, URL path auth)
```
POST /v1alpha1/mem9s                          — 创建租户
GET  /v1alpha1/mem9s/{id}/memories           — 搜索
POST /v1alpha1/mem9s/{id}/memories            — 创建
GET  /v1alpha1/mem9s/{id}/memories/:id        — 获取
PUT  /v1alpha1/mem9s/{id}/memories/:id        — 更新
DELETE /v1alpha1/mem9s/{id}/memories/:id      — 删除
```

### v1alpha2 (Preferred, API Key auth)
```
POST /v1alpha2/mem9s/memories                — Smart ingest
GET  /v1alpha2/mem9s/memories               — 混合搜索
GET  /v1alpha2/mem9s/memories/:id            — 获取
PUT  /v1alpha2/mem9s/memories/:id            — 更新
DELETE /v1alpha2/mem9s/memories/:id          — 删除
```

---

## 五个 Agent 工具 (统一接口)

所有插件暴露相同的 5 个工具，调用 mnemo-server REST API：

| 工具 | 用途 |
|------|------|
| `memory_store` | 存储新记忆 / 智能抽取 |
| `memory_search` | 混合向量+关键词搜索 |
| `memory_get` | 按 ID 获取单条记忆 |
| `memory_update` | 更新记忆内容 |
| `memory_delete` | 软删除记忆 |

---

## 工程亮点

### 1. Smart Ingest Pipeline
不是简单存储对话，而是用 LLM 从对话中抽取原子事实，与已有记忆对账（相似则更新，不相似则新增）。这是区别于普通 KV 存储的核心价值。

### 2. Multi-hop Recall + RRF
首轮 top-3 结果作为二轮召回种子，防止"关键词命中但不语义相关"的问题。RRF 融合确保多路召回结果公平排序。

### 3. Query Shape Detection
不是对所有查询都用同一策略，而是先识别查询类型（实体/时间/数量/地点/枚举），再动态调整候选数、置信度阈值和预算。

### 4. TiDB VECTOR 原生支持
不需要独立的向量数据库（Pincone/Qdrant）。TiDB Cloud Serverless 的 `VECTOR(1536)` 类型 + `EMBED_TEXT()` 函数 + `VEC_COSINE_DISTANCE()` 实现完整的混合搜索栈。

### 5. TiDB Zero Auto-provisioning
通过 TiDB Zero API 在首次请求时自动创建集群，用户零配置即可使用。免费 tier (25GiB + 250M RU) 足够个人和小型团队使用。

### 6. Tenant-level 隔离
每个租户有独立数据库，连接池动态管理（Lifetime/IdleTimeout），控制面和数据面分离，安全性高。

### 7. Confidence Gap Stop
连续候选项分数差 > 18 分时自动截断，减少低质量记忆对 Agent 的干扰。

### 8. Stateless Agent Plugins
Agent 插件完全不持有状态，所有状态在 mnemo-server。这意味着可以部署任意数量 Agent 实例，全部共享同一记忆池。

---

## 局限与注意事项

1. **TiDB FTS 需手动开启**: 注释掉的 `ALTER TABLE` 脚本需在支持 FTS 的集群上手动执行
2. **Postgres 无 Session 表**: 非 TiDB 后端使用 stub SessionRepo，sessions 搜索返回 501
3. **KMS 加密一次性决策**: `MNEMO_ENCRYPT_TYPE` 部署后不可更改
4. **Auto-embedding 仅 TiDB/db9**: Postgres 走客户端 embedding
5. **Second-hop gate**: 首轮分数 < 0.5 跳过二轮，防止对抗性查询注入噪声

---

## mem9 在 Agent 工程生态中的位置

```
┌─────────────────────────────────────────────────────────────┐
│  Agent Runtime (Claude Code / OpenClaw / OpenCode)          │
│  ├── 会话管理、上下文压缩、工具执行                           │
│  └── Hook System (before_prompt_build / agent_end)          │
└─────────────────────────┬───────────────────────────────────┘
                          │ Hook 回调
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  mem9 Plugin (Stateless, 无状态)                            │
│  ├── recall skill → memory_search → mnemo-server           │
│  ├── store skill  → memory_store → mnemo-server            │
│  └── hooks.ts → before_prompt_build / agent_end             │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  mnemo-server (Go)                                         │
│  ├── Recall (混合搜索 + 多跳召回)                          │
│  ├── Ingest (Smart Pipeline)                               │
│  └── Tenant Pool (多租户连接管理)                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  TiDB Cloud Serverless (MySQL 兼容)                        │
│  ├── Control Plane: tenants 表                             │
│  └── Data Plane: per-tenant memories 表 (VECTOR)          │
└─────────────────────────────────────────────────────────────┘
```

mem9 解决了 AI Agent 生态中最根本的问题：**记忆持久化**。不是改进 Agent 本身，而是作为基础设施层，让任何 Agent 都能拥有跨会话、跨机器、跨实例的持久化记忆。
