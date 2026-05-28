# 会话存储系统（Session）深度研究

> 基于 `/home/gaominggang/workspace/pi/packages/agent/src/harness/session/`

---

## 1️⃣ 概述：会话存储架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Session API                                   │
│                  (会话操作的高层接口)                                  │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                      Session<T>                                       │
│  • 管理 SessionTreeEntry 的增删改查                                    │
│  • 构建上下文 (buildContext)                                          │
│  • 分支导航 (moveTo)                                                │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                    SessionStorage                                     │
│  • 接口抽象                                                        │
│  • 具体实现：                                                       │
│    ├── JsonlSessionStorage    (持久化)                               │
│    └── InMemorySessionStorage (内存)                                 │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                    FileSystem                                        │
│  • JSONL 文件格式                                                   │
│  • append-only 追加写入                                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ 核心概念：会话树

### 2.1 为什么是树形结构？

```
                    Root
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    Turn 1        Turn 2         Turn 3
        │             │
    ┌───┴───┐     ┌─┴─┐
    │       │     │   │
   Tool   Tool   User  User...
   Result Result
        │
    ┌───┴───┐
    │       │
   ...    Branch (分支探索)
           │
       Summary (返回时的摘要)
```

### 2.2 SessionTreeEntry 类型

```typescript
// session.ts / types.ts

type SessionTreeEntry =
  | MessageEntry           // 消息
  | ThinkingLevelChangeEntry  // 思考级别变更
  | ModelChangeEntry      // 模型变更
  | CompactionEntry       // 压缩记录
  | BranchSummaryEntry    // 分支摘要
  | CustomEntry          // 自定义数据
  | CustomMessageEntry    // 自定义消息
  | LabelEntry           // 标签
  | SessionInfoEntry     // 会话信息
  | LeafEntry;          // 叶子节点指针
```

### 2.3 条目结构

```typescript
// 所有条目的基础结构
interface SessionTreeEntryBase {
  type: string;           // 条目类型
  id: string;            // 唯一标识 (UUIDv7 前缀)
  parentId: string | null;  // 父节点 ID
  timestamp: string;     // ISO 时间戳
}

// 消息条目
interface MessageEntry extends SessionTreeEntryBase {
  type: "message";
  message: AgentMessage;
}

// 模型变更
interface ModelChangeEntry extends SessionTreeEntryBase {
  type: "model_change";
  provider: string;
  modelId: string;
}

// 压缩条目
interface CompactionEntry<T = unknown> extends SessionTreeEntryBase {
  type: "compaction";
  summary: string;
  firstKeptEntryId: string;  // 保留的第一个条目
  tokensBefore: number;     // 压缩前的 tokens
  details?: T;
  fromHook?: boolean;
}

// 分支摘要
interface BranchSummaryEntry<T = unknown> extends SessionTreeEntryBase {
  type: "branch_summary";
  fromId: string;
  summary: string;
  details?: T;
  fromHook?: boolean;
}

// 叶子节点指针 (关键！)
interface LeafEntry extends SessionTreeEntryBase {
  type: "leaf";
  targetId: string | null;  // 指向当前叶子节点
}
```

---

## 3️⃣ Session 类

### 3.1 核心接口

```typescript
class Session<TMetadata extends SessionMetadata = SessionMetadata> {
  private storage: SessionStorage<TMetadata>;
  
  // 元数据
  getMetadata(): Promise<TMetadata>
  getStorage(): SessionStorage<TMetadata>
  
  // 节点查询
  getEntry(id: string): Promise<SessionTreeEntry | undefined>
  getEntries(): Promise<SessionTreeEntry[]>
  getLabel(id: string): Promise<string | undefined>
  
  // 分支操作
  getLeafId(): Promise<string | null>
  getBranch(fromId?: string): Promise<SessionTreeEntry[]>  // 获取到根的路径
  buildContext(): Promise<SessionContext>  // 构建 LLM 上下文
  
  // 追加条目
  appendMessage(message: AgentMessage): Promise<string>
  appendModelChange(provider, modelId): Promise<string>
  appendThinkingLevelChange(level): Promise<string>
  appendCompaction(summary, firstKeptEntryId, tokensBefore): Promise<string>
  appendCustomEntry(customType, data?): Promise<string>
  appendCustomMessageEntry(...): Promise<string>
  appendLabel(targetId, label): Promise<string>
  appendSessionName(name): Promise<string>
  
  // 分支导航
  moveTo(entryId: string | null, summary?): Promise<string | undefined>
}
```

### 3.2 构建上下文

```typescript
function buildSessionContext(pathEntries: SessionTreeEntry[]): SessionContext {
  let thinkingLevel = "off";
  let model: { provider: string; modelId: string } | null = null;
  let compaction: CompactionEntry | null = null;
  
  // 1. 遍历收集元数据
  for (const entry of pathEntries) {
    if (entry.type === "thinking_level_change") {
      thinkingLevel = entry.thinkingLevel;
    } else if (entry.type === "model_change") {
      model = { provider: entry.provider, modelId: entry.modelId };
    } else if (entry.type === "message" && entry.message.role === "assistant") {
      model = { provider: entry.message.provider, modelId: entry.message.model };
    } else if (entry.type === "compaction") {
      compaction = entry;
    }
  }
  
  // 2. 收集消息
  const messages: AgentMessage[] = [];
  
  const appendMessage = (entry: SessionTreeEntry) => {
    if (entry.type === "message") {
      messages.push(entry.message as AgentMessage);
    } else if (entry.type === "custom_message") {
      messages.push(createCustomMessage(...));
    } else if (entry.type === "branch_summary" && entry.summary) {
      messages.push(createBranchSummaryMessage(...));
    }
  };
  
  // 3. 处理压缩
  if (compaction) {
    // 先添加压缩摘要
    messages.push(createCompactionSummaryMessage(...));
    
    // 找到压缩点
    const compactionIdx = pathEntries.findIndex(
      e => e.type === "compaction" && e.id === compaction.id
    );
    
    // 保留 firstKeptEntryId 及之后的消息
    let foundFirstKept = false;
    for (let i = 0; i < compactionIdx; i++) {
      if (pathEntries[i].id === compaction.firstKeptEntryId) {
        foundFirstKept = true;
      }
      if (foundFirstKept) appendMessage(pathEntries[i]);
    }
    
    // 压缩之后的所有消息
    for (let i = compactionIdx + 1; i < pathEntries.length; i++) {
      appendMessage(pathEntries[i]);
    }
  } else {
    // 无压缩，全部添加
    for (const entry of pathEntries) {
      appendMessage(entry);
    }
  }
  
  return { messages, thinkingLevel, model };
}
```

### 3.3 分支导航

```typescript
async moveTo(
  entryId: string | null,
  summary?: { summary: string; details?: unknown; fromHook?: boolean }
): Promise<string | undefined> {
  // 1. 验证目标条目存在
  if (entryId !== null && !(await this.storage.getEntry(entryId))) {
    throw new SessionError("not_found", `Entry ${entryId} not found`);
  }
  
  // 2. 设置叶子节点
  await this.storage.setLeafId(entryId);
  
  // 3. 如果有摘要，创建摘要条目
  if (!summary) return undefined;
  
  return this.appendTypedEntry({
    type: "branch_summary",
    id: await this.storage.createEntryId(),
    parentId: entryId,
    timestamp: new Date().toISOString(),
    fromId: entryId ?? "root",
    summary: summary.summary,
    details: summary.details,
    fromHook: summary.fromHook,
  } satisfies BranchSummaryEntry);
}
```

---

## 4️⃣ SessionStorage 接口

### 4.1 接口定义

```typescript
interface SessionStorage<TMetadata extends SessionMetadata = SessionMetadata> {
  // 元数据
  getMetadata(): Promise<TMetadata>
  
  // 叶子节点
  getLeafId(): Promise<string | null>
  setLeafId(leafId: string | null): Promise<void>
  
  // ID 生成
  createEntryId(): Promise<string>
  
  // 条目操作
  appendEntry(entry: SessionTreeEntry): Promise<void>
  getEntry(id: string): Promise<SessionTreeEntry | undefined>
  findEntries<TType>(type: TType): Promise<Extract<SessionTreeEntry, { type: TType }>[]>
  
  // 标签
  getLabel(id: string): Promise<string | undefined>
  
  // 路径查询
  getPathToRoot(leafId: string | null): Promise<SessionTreeEntry[]>
  getEntries(): Promise<SessionTreeEntry[]>
}
```

### 4.2 路径回溯算法

```typescript
async getPathToRoot(leafId: string | null): Promise<SessionTreeEntry[]> {
  if (leafId === null) return [];
  
  const path: SessionTreeEntry[] = [];
  let current = this.byId.get(leafId);
  
  if (!current) throw new SessionError("not_found", `Entry ${leafId} not found`);
  
  // 沿 parentId 向上回溯
  while (current) {
    path.unshift(current);  // 头部插入，保持顺序
    
    if (!current.parentId) break;
    
    const parent = this.byId.get(current.parentId);
    if (!parent) {
      throw new SessionError("invalid_session", 
        `Entry ${current.parentId} not found`
      );
    }
    current = parent;
  }
  
  return path;
}
```

---

## 5️⃣ JSONL 存储实现

### 5.1 为什么用 JSONL？

```
优势：
✓ append-only：追加写入，无需锁
✓ 流式读取：按行解析，大文件友好
✓ 简单可靠：无需数据库
✓ 易调试：每行一个 JSON

格式：
{"type":"session","version":3,"id":"...","timestamp":"...","cwd":"/path"}
{"type":"message","id":"...","parentId":"...","timestamp":"...","message":{...}}
{"type":"leaf","id":"...","parentId":"...","timestamp":"...","targetId":"..."}
```

### 5.2 文件格式

```
文件结构：
┌─────────────────────────────────────────────────────────────┐
│ Header (第1行)                                               │
│ {"type":"session","version":3,"id":"abc123","timestamp":"..." │
│  ,"cwd":"/project","parentSession":"/old/session.jsonl"}    │
├─────────────────────────────────────────────────────────────┤
│ Entries (第2行开始)                                          │
│ {"type":"message","id":"001","parentId":null,...}          │
│ {"type":"message","id":"002","parentId":"001",...}         │
│ {"type":"message","id":"003","parentId":"002",...}         │
│ {"type":"leaf","id":"004","parentId":"003",...,"targetId":"│
│  003"}                                                      │
│ {"type":"message","id":"005","parentId":"003",...}         │
│ {"type":"leaf","id":"006","parentId":"004",...,"targetId":"│
│  005"}                                                      │
└─────────────────────────────────────────────────────────────┘

文件名格式：
2024-01-15T10-30-00.123Z_abc123.jsonl
  ↑ 时间戳              ↑ 会话 ID
```

### 5.3 头部解析

```typescript
interface SessionHeader {
  type: "session";
  version: 3;           // 版本号
  id: string;             // 会话 ID
  timestamp: string;      // 创建时间
  cwd: string;            // 工作目录
  parentSession?: string;  // 父会话路径（用于分叉）
}

function parseHeaderLine(line: string, filePath: string): SessionHeader {
  const parsed = JSON.parse(line);
  
  // 验证必填字段
  if (parsed.type !== "session") {
    throw invalidSession(filePath, "first line is not a valid session header");
  }
  if (parsed.version !== 3) {
    throw invalidSession(filePath, "unsupported session version");
  }
  if (!parsed.id || !parsed.timestamp || !parsed.cwd) {
    throw invalidSession(filePath, "missing required fields");
  }
  
  return parsed;
}
```

### 5.4 JsonlSessionStorage 实现

```typescript
class JsonlSessionStorage implements SessionStorage<JsonlSessionMetadata> {
  private readonly fs: JsonlSessionStorageFileSystem;
  private readonly filePath: string;
  private readonly metadata: JsonlSessionMetadata;
  
  private entries: SessionTreeEntry[];    // 内存缓存
  private byId: Map<string, SessionTreeEntry>;  // ID 索引
  private labelsById: Map<string, string>;     // 标签索引
  private currentLeafId: string | null;
  
  // 工厂方法：打开现有会话
  static async open(fs, filePath): Promise<JsonlSessionStorage> {
    const loaded = await loadJsonlStorage(fs, filePath);
    return new JsonlSessionStorage(
      fs, filePath, 
      loaded.header, 
      loaded.entries, 
      loaded.leafId
    );
  }
  
  // 工厂方法：创建新会话
  static async create(fs, filePath, options): Promise<JsonlSessionStorage> {
    const header: SessionHeader = {
      type: "session",
      version: 3,
      id: options.sessionId,
      timestamp: new Date().toISOString(),
      cwd: options.cwd,
      parentSession: options.parentSessionPath,
    };
    
    // 写入头部
    await fs.writeFile(filePath, `${JSON.stringify(header)}\n`);
    
    return new JsonlSessionStorage(
      fs, filePath, header, [], null
    );
  }
  
  // 追加条目（核心方法）
  async appendEntry(entry: SessionTreeEntry): Promise<void> {
    // 1. 写入文件
    await this.fs.appendFile(
      this.filePath, 
      `${JSON.stringify(entry)}\n`
    );
    
    // 2. 更新内存缓存
    this.entries.push(entry);
    this.byId.set(entry.id, entry);
    
    // 3. 更新索引
    updateLabelCache(this.labelsById, entry);
    
    // 4. 更新叶子节点
    this.currentLeafId = leafIdAfterEntry(entry);
  }
  
  // 设置叶子节点（移动指针）
  async setLeafId(leafId: string | null): Promise<void> {
    if (leafId !== null && !this.byId.has(leafId)) {
      throw new SessionError("not_found", `Entry ${leafId} not found`);
    }
    
    const entry: LeafEntry = {
      type: "leaf",
      id: generateEntryId(this.byId),
      parentId: this.currentLeafId,
      timestamp: new Date().toISOString(),
      targetId: leafId,
    };
    
    await this.fs.appendFile(this.filePath, `${JSON.stringify(entry)}\n`);
    
    this.entries.push(entry);
    this.byId.set(entry.id, entry);
    this.currentLeafId = leafId;
  }
}
```

### 5.5 标签缓存

```typescript
function updateLabelCache(
  labelsById: Map<string, string>, 
  entry: SessionTreeEntry
): void {
  if (entry.type !== "label") return;
  
  const label = entry.label?.trim();
  if (label) {
    // 设置标签
    labelsById.set(entry.targetId, label);
  } else {
    // 删除标签
    labelsById.delete(entry.targetId);
  }
}

function buildLabelsById(entries: SessionTreeEntry[]): Map<string, string> {
  const labelsById = new Map<string, string>();
  for (const entry of entries) {
    updateLabelCache(labelsById, entry);
  }
  return labelsById;
}
```

---

## 6️⃣ 内存存储实现

### 6.1 InMemorySessionStorage

```typescript
class InMemorySessionStorage<TMetadata>
  implements SessionStorage<TMetadata> {
  
  private readonly metadata: TMetadata;
  private entries: SessionTreeEntry[];
  private byId: Map<string, SessionTreeEntry>;
  private labelsById: Map<string, string>;
  private leafId: string | null;
  
  constructor(options?: { entries?: SessionTreeEntry[]; metadata?: TMetadata }) {
    // 初始化
    this.entries = options?.entries ? [...options.entries] : [];
    this.byId = new Map(this.entries.map(e => [e.id, e]));
    this.labelsById = buildLabelsById(this.entries);
    this.leafId = null;
    
    // 设置叶子节点
    for (const entry of this.entries) {
      this.leafId = leafIdAfterEntry(entry);
    }
    
    // 验证叶子节点有效
    if (this.leafId !== null && !this.byId.has(this.leafId)) {
      throw new SessionError("invalid_session", `Entry ${this.leafId} not found`);
    }
    
    this.metadata = options?.metadata ?? {
      id: uuidv7(), 
      createdAt: new Date().toISOString()
    } as TMetadata;
  }
  
  // 所有方法的实现与 JsonlSessionStorage 类似
  // 区别在于不需要文件操作
}
```

---

## 7️⃣ 仓库层 (Repo)

### 7.1 SessionRepo 接口

```typescript
interface SessionRepo<
  TMetadata extends SessionMetadata,
  TCreateOptions extends SessionCreateOptions,
  TListOptions
> {
  create(options: TCreateOptions): Promise<Session<TMetadata>>
  open(metadata: TMetadata): Promise<Session<TMetadata>>
  list(options?: TListOptions): Promise<TMetadata[]>
  delete(metadata: TMetadata): Promise<void>
  fork(
    source: TMetadata, 
    options: SessionForkOptions & TCreateOptions
  ): Promise<Session<TMetadata>>
}
```

### 7.2 JsonlSessionRepo

```typescript
class JsonlSessionRepo implements JsonlSessionRepoApi {
  private readonly fs: JsonlSessionRepoFileSystem;
  private readonly sessionsRootInput: string;
  private sessionsRoot: string | undefined;
  
  // 创建新会话
  async create(options: JsonlSessionCreateOptions): Promise<Session<JsonlSessionMetadata>> {
    const id = options.id ?? createSessionId();
    const createdAt = createTimestamp();
    
    // 确保目录存在
    const sessionDir = await this.getSessionDir(options.cwd);
    await this.fs.createDir(sessionDir, { recursive: true });
    
    // 创建文件
    const filePath = await this.createSessionFilePath(
      options.cwd, id, createdAt
    );
    
    const storage = await JsonlSessionStorage.create(this.fs, filePath, {
      cwd: options.cwd,
      sessionId: id,
      parentSessionPath: options.parentSessionPath,
    });
    
    return toSession(storage);
  }
  
  // 打开现有会话
  async open(metadata: JsonlSessionMetadata): Promise<Session<JsonlSessionMetadata>> {
    if (!await this.fs.exists(metadata.path)) {
      throw new SessionError("not_found", `Session not found: ${metadata.path}`);
    }
    
    const storage = await JsonlSessionStorage.open(this.fs, metadata.path);
    return toSession(storage);
  }
  
  // 列出所有会话
  async list(options: JsonlSessionListOptions = {}): Promise<JsonlSessionMetadata[]> {
    const dirs = options.cwd 
      ? [await this.getSessionDir(options.cwd)] 
      : await this.listSessionDirs();
    
    const sessions: JsonlSessionMetadata[] = [];
    
    for (const dir of dirs) {
      const files = await this.fs.listDir(dir);
      
      for (const file of files) {
        if (file.kind === "directory" || !file.name.endsWith(".jsonl")) {
          continue;
        }
        
        try {
          sessions.push(await loadJsonlSessionMetadata(this.fs, file.path));
        } catch (error) {
          // 跳过无效文件
        }
      }
    }
    
    // 按时间倒序
    sessions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return sessions;
  }
  
  // 分叉会话
  async fork(
    sourceMetadata: JsonlSessionMetadata,
    options: JsonlSessionCreateOptions & ForkOptions
  ): Promise<Session<JsonlSessionMetadata>> {
    const source = await this.open(sourceMetadata);
    const forkedEntries = await getEntriesToFork(
      source.getStorage(), 
      options
    );
    
    // 创建新会话，复制选中的条目
    const newSession = await this.create({
      ...options,
      cwd: options.cwd ?? sourceMetadata.cwd,
      parentSessionPath: options.parentSessionPath ?? sourceMetadata.path,
    });
    
    // 复制条目
    for (const entry of forkedEntries) {
      await newSession.appendMessage(entry.message);
    }
    
    return newSession;
  }
}
```

---

## 8️⃣ UUIDv7 实现

### 8.1 为什么要用 UUIDv7？

```
UUIDv1 (时间戳优先):
  ┌────────────────┬──────────┬────────┬────────────────┐
  │ timestamp_low │ timestamp_mid │ clock_seq │ node      │
  └────────────────┴──────────┴────────┴────────────────┘

UUIDv7 (时间戳优先，可排序):
  ┌────────────────┬────┬────┬────────────────────────────┐
  │ timestamp_ms  │ ver│var │ random                     │
  └────────────────┴────┴────┴────────────────────────────┘
                     ↑4    ↑2         74 bits random

优势：
✓ 时间有序：UUID 可按创建时间排序
✓ 隐私：随机部分不暴露信息
✓ 唯一性：基于时间和随机
```

### 8.2 实现

```typescript
let lastTimestamp = -Infinity;
let sequence = 0;

export function uuidv7(): string {
  const random = new Uint8Array(16);
  fillRandomBytes(random);
  const timestamp = Date.now();
  
  // 处理时间回拨
  if (timestamp > lastTimestamp) {
    // 新时间戳，重置序列
    sequence = random[6] * 0x1000000 + random[7] * 0x10000 + random[8] * 0x100 + random[9];
    lastTimestamp = timestamp;
  } else {
    // 同一毫秒内，递增序列
    sequence = (sequence + 1) >>> 0;
    if (sequence === 0) {
      lastTimestamp++;  // 序列溢出，进位
    }
  }
  
  // 构建字节数组
  const bytes = new Uint8Array(16);
  bytes[0] = (lastTimestamp / 0x10000000000) & 0xff;
  bytes[1] = (lastTimestamp / 0x100000000) & 0xff;
  bytes[2] = (lastTimestamp / 0x1000000) & 0xff;
  bytes[3] = (lastTimestamp / 0x10000) & 0xff;
  bytes[4] = (lastTimestamp / 0x100) & 0xff;
  bytes[5] = lastTimestamp & 0xff;
  
  // UUIDv7 版本和变体
  bytes[6] = 0x70 | ((sequence >>> 28) & 0x0f);  // version 7
  bytes[7] = (sequence >>> 20) & 0xff;
  bytes[8] = 0x80 | ((sequence >>> 14) & 0x3f);  // variant
  bytes[9] = (sequence >>> 6) & 0xff;
  bytes[10] = ((sequence & 0x3f) << 2) | (random[10] & 0x03);
  
  // 填充随机部分
  bytes[11] = random[11];
  bytes[12] = random[12];
  bytes[13] = random[13];
  bytes[14] = random[14];
  bytes[15] = random[15];
  
  return formatUuid(bytes);
}

function formatUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-` +
         `${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-` +
         `${hex.slice(10, 16).join("")}`;
}

// 示例输出:
// "0192a3b7-c4d5-7f89-abcd-ef0123456789"
```

---

## 9️⃣ 分叉 (Fork) 功能

### 9.1 分叉算法

```typescript
async function getEntriesToFork(
  storage: SessionStorage,
  options: { entryId?: string; position?: "before" | "at" }
): Promise<SessionTreeEntry[]> {
  if (!options.entryId) {
    // 无指定位置，复制全部
    return storage.getEntries();
  }
  
  const target = await storage.getEntry(options.entryId);
  if (!target) {
    throw new SessionError("invalid_fork_target", 
      `Entry ${options.entryId} not found`
    );
  }
  
  let effectiveLeafId: string | null;
  
  if ((options.position ?? "before") === "at") {
    // "at": 分叉到该条目本身
    effectiveLeafId = target.id;
  } else {
    // "before": 分叉到该条目之前（必须是用户消息）
    if (target.type !== "message" || target.message.role !== "user") {
      throw new SessionError("invalid_fork_target",
        `Entry ${options.entryId} is not a user message`
      );
    }
    effectiveLeafId = target.parentId;
  }
  
  // 获取从根到该点的路径
  return storage.getPathToRoot(effectiveLeafId);
}
```

### 9.2 分叉示例

```
原会话:
  Root → A(user) → B(assistant) → C(user) → D(assistant) → E(user)
                                                          ↑
                                                        leafId

执行 fork(entryId=C.id, position="at"):
  新会话: Root → A → B → C
  新叶子: C

执行 fork(entryId=C.id, position="before"):
  新会话: Root → A → B
  新叶子: B

执行 fork() (无参数):
  新会话: Root → A → B → C → D → E (完整复制)
  新叶子: E
```

---

## 🔟 完整操作流程图

### 10.1 创建新会话

```
User
  │
  ▼
JsonlSessionRepo.create({ cwd: "/project" })
  │
  ├── generate UUIDv7
  │
  ├── mkdir sessions/--project--
  │
  └── write "session.jsonl"
      │
      └── Line 1: {"type":"session","version":3,...}
      
  ▼
Return Session instance
```

### 10.2 追加消息

```
User: "Hello"
  │
  ▼
session.appendMessage({ role: "user", content: "Hello" })
  │
  ├── generate entry ID
  │
  └── append to JSONL:
      │
      └── {"type":"message","id":"abc","parentId":null,
            "timestamp":"...","message":{...}}
          
  ▼
Update memory cache
```

### 10.3 分支导航

```
Current: Root → A → B → C → D (leaf=C)
              ↑
           leafId

User: navigate to B
  │
  ▼
session.moveTo(B.id)
  │
  ├── setLeafId(B.id)
  │
  └── append leaf entry:
      │
      └── {"type":"leaf","id":"xyz","parentId":"C-id",
            "timestamp":"...","targetId":"B-id"}
          
  ▼
New state: Root → A → B → C → D (leaf=B)
```

---

## 1️⃣1️⃣ 会话上下文重建

```
JSONL File:
┌────────────────────────────────────────────────────────────┐
│ {"type":"session",...}                                     │
│ {"type":"message","id":"001","parentId":null,...}         │
│ {"type":"model_change","id":"002","parentId":"001",...}   │
│ {"type":"message","id":"003","parentId":"002",...}        │
│ {"type":"compaction","id":"004",...,"firstKeptEntryId":"003",...}│
│ {"type":"message","id":"005","parentId":"004",...}        │
│ {"type":"leaf","id":"006",...,"targetId":"005"}           │
└────────────────────────────────────────────────────────────┘
                      │
                      ▼
           Session.buildContext()
                      │
         ┌─────────────┴─────────────┐
         │                             │
   有 Compaction                   无 Compaction
         │                             │
   ┌─────▼─────┐                 ┌─────▼─────┐
   │ 1. 添加摘要  │                 │ 添加所有消息│
   │ 2. 跳过到   │                 └────────────┘
   │    firstKept│
   │ 3. 添加之后  │
   └─────────────┘
                      │
                      ▼
         ┌─────────────────────────────┐
         │ SessionContext              │
         │ {                           │
         │   messages: [              │
         │     CompactionSummary,      │
         │     Message(005),          │
         │     ...                     │
         │   ],                        │
         │   thinkingLevel: "...",     │
         │   model: { provider, id }  │
         │ }                           │
         └─────────────────────────────┘
```

---

## 1️⃣2️⃣ 文件操作示例

### 12.1 典型 JSONL 文件

```jsonl
{"type":"session","version":3,"id":"0192a3b7c4d57f89","timestamp":"2024-01-15T10:30:00.123Z","cwd":"/home/user/project"}
{"type":"message","id":"001","parentId":null,"timestamp":"2024-01-15T10:30:01.000Z","message":{"role":"user","content":"Hello, write a function"}}
{"type":"message","id":"002","parentId":"001","timestamp":"2024-01-15T10:30:02.000Z","message":{"role":"assistant","content":"Here's the function..."}}
{"type":"thinking_level_change","id":"003","parentId":"002","timestamp":"2024-01-15T10:30:03.000Z","thinkingLevel":"medium"}
{"type":"message","id":"004","parentId":"003","timestamp":"2024-01-15T10:30:05.000Z","message":{"role":"user","content":"Great!"}}
{"type":"message","id":"005","parentId":"004","timestamp":"2024-01-15T10:30:06.000Z","message":{"role":"assistant","content":"You're welcome!"}}
{"type":"compaction","id":"006","parentId":"005","timestamp":"2024-01-15T11:00:00.000Z","summary":"User asked to write a function...","firstKeptEntryId":"004","tokensBefore":50000}
{"type":"message","id":"007","parentId":"006","timestamp":"2024-01-15T11:00:10.000Z","message":{"role":"user","content":"Now add tests"}}
{"type":"leaf","id":"008","parentId":"007","timestamp":"2024-01-15T11:05:00.000Z","targetId":"007"}
{"type":"message","id":"009","parentId":"006","timestamp":"2024-01-15T11:05:05.000Z","message":{"role":"assistant","content":"Here's the test..."}}
{"type":"message","id":"010","parentId":"009","timestamp":"2024-01-15T11:05:06.000Z","message":{"role":"assistant","content":"..."}}
{"type":"leaf","id":"011","parentId":"010","timestamp":"2024-01-15T11:10:00.000Z","targetId":"010"}
```

### 12.2 对应的会话树

```
                              Root
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
      [001]user             [004]user             [007]user
         │                      │                      │
      [002]assistant      [005]assistant      [009]assistant
         │                      │                      │
      [003]thinking-level                           │
         │                      │                      │
      [004]user (kept)     [006]compaction     [010]assistant
         │                      │                      │
      [005]assistant           │                  [011]leaf ←── leafId
         │                      │
      [006]compaction          │
         │                      │
      [007]user ─────────────────┤
         │                      │
      [008]leaf              [009]assistant ←── 从 006 分支探索
         │                      │
      [009]assistant          [010]assistant
         │                      │
      [010]assistant          [011]leaf ←── leafId
         │
      [011]leaf ←── leafId
```

---

## 总结

| 组件 | 职责 |
|------|------|
| `Session` | 会话操作高层 API |
| `SessionStorage` | 存储抽象接口 |
| `JsonlSessionStorage` | JSONL 持久化实现 |
| `InMemorySessionStorage` | 内存实现 |
| `SessionRepo` | 仓库层，创建/打开/列表 |
| `JsonlSessionRepo` | JSONL 仓库实现 |

**核心设计**：

1. **树形结构**：支持分支探索和回溯
2. **Append-only**：JSONL 追加写入，简单可靠
3. **叶子指针**：LeafEntry 记录当前活动位置
4. **UUIDv7**：时间有序的唯一 ID
5. **内存缓存**：内存索引加速查询
6. **分叉支持**：完整复制或选择性复制

**关键优势**：
- 无数据库依赖
- 支持大文件（流式读取）
- 易于调试和迁移
- 支持分支和历史
