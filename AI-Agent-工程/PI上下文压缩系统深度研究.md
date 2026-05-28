# 上下文压缩系统（Compaction）深度研究

> 基于 `/home/gaominggang/workspace/pi/packages/agent/src/harness/compaction/`

---

## 1️⃣ 概述：为什么需要上下文压缩？

### 问题

```
┌────────────────────────────────────────────────────────────┐
│                     Context Window                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ History  │ │ History  │ │ History  │ │ Recent   │     │
│  │ (Old)   │ │          │ │          │ │ (New)    │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                            │
│  ←────────────────────────────────────────────  MAX TOKENS │
└────────────────────────────────────────────────────────────┘
                              ↓ 溢出！
```

### 解决方案

```
┌────────────────────────────────────────────────────────────┐
│                     Context Window                         │
│  ┌──────────────────────┐ ┌──────────────────────────┐   │
│  │     COMPACTED        │ │     Recent Context      │   │
│  │     (Summary)        │ │     (Full Messages)    │   │
│  │                     │ │                        │   │
│  │ ## Goal             │ │ [User]: New request    │   │
│  │ ## Progress         │ │ [Assistant]: ...       │   │
│  │ ## Key Decisions    │ │ [Tool]: ...           │   │
│  │ ## Next Steps       │ │ [Assistant]: ...       │   │
│  └──────────────────────┘ └──────────────────────────┘   │
│                                                            │
│  ←────────────────────────────────────────────  MAX TOKENS │
└────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ 核心类型定义

### 2.1 压缩设置

```typescript
// compaction.ts

interface CompactionSettings {
  /** 启用自动压缩决策 */
  enabled: boolean;
  
  /** 为摘要提示和输出预留的 token 数 */
  reserveTokens: number;
  
  /** 压缩后保留的近似 token 数 */
  keepRecentTokens: number;
}

const DEFAULT_COMPACTION_SETTINGS: CompactionSettings = {
  enabled: true,
  reserveTokens: 16384,      // 16K tokens 预留
  keepRecentTokens: 20000,   // 保留 20K tokens
};
```

### 2.2 压缩结果

```typescript
interface CompactionResult<T = unknown> {
  /** 摘要文本，替换压缩的历史 */
  summary: string;
  
  /** 压缩后保留的第一个条目的 ID */
  firstKeptEntryId: string;
  
  /** 压缩前的估计 token 数 */
  tokensBefore: number;
  
  /** 存储在压缩条目中的实现细节 */
  details?: T;
}

interface CompactionDetails {
  /** 在压缩历史中读取的文件 */
  readFiles: string[];
  
  /** 在压缩历史中修改的文件 */
  modifiedFiles: string[];
}
```

### 2.3 压缩准备

```typescript
interface CompactionPreparation {
  firstKeptEntryId: string;
  
  /** 要摘要的消息 */
  messagesToSummarize: AgentMessage[];
  
  /** 当压缩分割 turn 时单独摘要的前缀消息 */
  turnPrefixMessages: AgentMessage[];
  
  /** 压缩是否分割了 turn */
  isSplitTurn: boolean;
  
  tokensBefore: number;
  
  /** 用于迭代更新的前一个摘要 */
  previousSummary?: string;
  
  /** 从摘要历史中提取的文件操作 */
  fileOps: FileOperations;
  
  settings: CompactionSettings;
}
```

---

## 3️⃣ Token 估算

### 3.1 保守字符估计

```typescript
// 基于字符数 / 4 的粗略估算
export function estimateTokens(message: AgentMessage): number {
  let chars = 0;
  
  switch (message.role) {
    case "user": {
      const content = message.content;
      if (typeof content === "string") {
        chars = content.length;
      } else if (Array.isArray(content)) {
        for (const block of content) {
          if (block.type === "text" && block.text) {
            chars += block.text.length;
          }
        }
      }
      return Math.ceil(chars / 4);  // 4 字符 ≈ 1 token
    }
    
    case "assistant": {
      for (const block of assistant.content) {
        if (block.type === "text") {
          chars += block.text.length;
        } else if (block.type === "thinking") {
          chars += block.thinking.length;
        } else if (block.type === "toolCall") {
          chars += block.name.length + JSON.stringify(block.arguments).length;
        }
      }
      return Math.ceil(chars / 4);
    }
    
    case "custom":
    case "toolResult": {
      // 图像内容估计为 4800 tokens
      if (block.type === "image") {
        chars += 4800 * 4;
      }
      return Math.ceil(chars / 4);
    }
    
    case "bashExecution": {
      chars = message.command.length + message.output.length;
      return Math.ceil(chars / 4);
    }
    
    case "branchSummary":
    case "compactionSummary": {
      chars = message.summary.length;
      return Math.ceil(chars / 4);
    }
  }
}
```

### 3.2 上下文 Token 估计

```typescript
interface ContextUsageEstimate {
  /** 估计的总 context tokens */
  tokens: number;
  
  /** 最近的 assistant usage 报告的 tokens */
  usageTokens: number;
  
  /** 最近 assistant usage 之后的估计 tokens */
  trailingTokens: number;
  
  /** 提供 usage 的消息索引 */
  lastUsageIndex: number | null;
}

export function estimateContextTokens(messages: AgentMessage[]): ContextUsageEstimate {
  // 优先使用 provider 报告的 usage
  const usageInfo = getLastAssistantUsageInfo(messages);
  
  if (!usageInfo) {
    // 回退到字符估计
    let estimated = 0;
    for (const message of messages) {
      estimated += estimateTokens(message);
    }
    return { tokens: estimated, usageTokens: 0, trailingTokens: estimated, lastUsageIndex: null };
  }
  
  // 使用 provider usage + 尾部估计
  const usageTokens = calculateContextTokens(usageInfo.usage);
  let trailingTokens = 0;
  for (let i = usageInfo.index + 1; i < messages.length; i++) {
    trailingTokens += estimateTokens(messages[i]);
  }
  
  return {
    tokens: usageTokens + trailingTokens,
    usageTokens,
    trailingTokens,
    lastUsageIndex: usageInfo.index,
  };
}
```

### 3.3 是否需要压缩

```typescript
export function shouldCompact(
  contextTokens: number,
  contextWindow: number,
  settings: CompactionSettings
): boolean {
  if (!settings.enabled) return false;
  
  // 超过阈值则压缩
  return contextTokens > contextWindow - settings.reserveTokens;
}
```

---

## 4️⃣ 切割点查找

### 4.1 有效切割点

```typescript
// 找到所有可以作为切割点的位置
function findValidCutPoints(
  entries: SessionTreeEntry[],
  startIndex: number,
  endIndex: number
): number[] {
  const cutPoints: number[] = [];
  
  for (let i = startIndex; i < endIndex; i++) {
    const entry = entries[i];
    
    if (entry.type === "message") {
      const role = entry.message.role;
      switch (role) {
        // 可以作为切割点
        case "bashExecution":
        case "custom":
        case "branchSummary":
        case "compactionSummary":
        case "user":
        case "assistant":
          cutPoints.push(i);
          break;
        // toolResult 不能单独切割
        case "toolResult":
          break;
      }
    }
    
    // branch_summary 和 custom_message 也是有效切割点
    if (entry.type === "branch_summary" || entry.type === "custom_message") {
      cutPoints.push(i);
    }
  }
  
  return cutPoints;
}
```

### 4.2 Turn 开始索引

```typescript
// 找到包含指定条目的 turn 开始位置
export function findTurnStartIndex(
  entries: SessionTreeEntry[],
  entryIndex: number,
  startIndex: number
): number {
  for (let i = entryIndex; i >= startIndex; i--) {
    const entry = entries[i];
    
    if (entry.type === "branch_summary" || entry.type === "custom_message") {
      return i;
    }
    
    if (entry.type === "message") {
      const role = entry.message.role;
      if (role === "user" || role === "bashExecution") {
        return i;
      }
    }
  }
  return -1;
}
```

### 4.3 切割点查找算法

```typescript
interface CutPointResult {
  /** 压缩后保留的第一个条目索引 */
  firstKeptEntryIndex: number;
  
  /** 当切割分割 turn 时的 turn 开始索引，否则为 -1 */
  turnStartIndex: number;
  
  /** 选择的切割是否分割了一个进行中的 turn */
  isSplitTurn: boolean;
}

export function findCutPoint(
  entries: SessionTreeEntry[],
  startIndex: number,
  endIndex: number,
  keepRecentTokens: number
): CutPointResult {
  // 1. 获取所有有效切割点
  const cutPoints = findValidCutPoints(entries, startIndex, endIndex);
  
  if (cutPoints.length === 0) {
    return { firstKeptEntryIndex: startIndex, turnStartIndex: -1, isSplitTurn: false };
  }
  
  // 2. 从后向前累积 token 数
  let accumulatedTokens = 0;
  let cutIndex = cutPoints[0];
  
  for (let i = endIndex - 1; i >= startIndex; i--) {
    const entry = entries[i];
    if (entry.type !== "message") continue;
    
    const messageTokens = estimateTokens(entry.message as AgentMessage);
    accumulatedTokens += messageTokens;
    
    // 达到保留预算
    if (accumulatedTokens >= keepRecentTokens) {
      // 找到最近的切割点
      for (let c = 0; c < cutPoints.length; c++) {
        if (cutPoints[c] >= i) {
          cutIndex = cutPoints[c];
          break;
        }
      }
      break;
    }
  }
  
  // 3. 跳过非消息条目
  while (cutIndex > startIndex) {
    const prevEntry = entries[cutIndex - 1];
    if (prevEntry.type === "compaction" || prevEntry.type === "message") {
      break;
    }
    cutIndex--;
  }
  
  // 4. 确定是否分割了 turn
  const cutEntry = entries[cutIndex];
  const isUserMessage = cutEntry.type === "message" && cutEntry.message.role === "user";
  const turnStartIndex = isUserMessage 
    ? -1 
    : findTurnStartIndex(entries, cutIndex, startIndex);
  
  return {
    firstKeptEntryIndex: cutIndex,
    turnStartIndex,
    isSplitTurn: !isUserMessage && turnStartIndex !== -1,
  };
}
```

---

## 5️⃣ 压缩准备

### 5.1 prepareCompaction

```typescript
export function prepareCompaction(
  pathEntries: SessionTreeEntry[],
  settings: CompactionSettings
): Result<CompactionPreparation | undefined, CompactionError> {
  // 1. 检查是否需要压缩
  if (pathEntries.length === 0) {
    return ok(undefined);
  }
  
  // 2. 如果最后一个条目是压缩，不需要再次压缩
  if (pathEntries[pathEntries.length - 1].type === "compaction") {
    return ok(undefined);
  }
  
  // 3. 查找前一个压缩位置
  let prevCompactionIndex = -1;
  for (let i = pathEntries.length - 1; i >= 0; i--) {
    if (pathEntries[i].type === "compaction") {
      prevCompactionIndex = i;
      break;
    }
  }
  
  // 4. 确定压缩边界
  let previousSummary: string | undefined;
  let boundaryStart = 0;
  
  if (prevCompactionIndex >= 0) {
    const prevCompaction = pathEntries[prevCompactionIndex] as CompactionEntry;
    previousSummary = prevCompaction.summary;
    
    // 从前一个压缩保留的位置开始
    const firstKeptEntryIndex = pathEntries.findIndex(
      (entry) => entry.id === prevCompaction.firstKeptEntryId
    );
    boundaryStart = firstKeptEntryIndex >= 0 ? firstKeptEntryIndex : prevCompactionIndex + 1;
  }
  
  const boundaryEnd = pathEntries.length;
  
  // 5. 估计 token 数
  const tokensBefore = estimateContextTokens(
    buildSessionContext(pathEntries).messages
  ).tokens;
  
  // 6. 查找切割点
  const cutPoint = findCutPoint(
    pathEntries, 
    boundaryStart, 
    boundaryEnd, 
    settings.keepRecentTokens
  );
  
  const firstKeptEntry = pathEntries[cutPoint.firstKeptEntryIndex];
  if (!firstKeptEntry?.id) {
    return err(new CompactionError("invalid_session", "First kept entry has no UUID"));
  }
  
  // 7. 收集要摘要的消息
  const historyEnd = cutPoint.isSplitTurn 
    ? cutPoint.turnStartIndex 
    : cutPoint.firstKeptEntryIndex;
  
  const messagesToSummarize: AgentMessage[] = [];
  for (let i = boundaryStart; i < historyEnd; i++) {
    const msg = getMessageFromEntryForCompaction(pathEntries[i]);
    if (msg) messagesToSummarize.push(msg);
  }
  
  // 8. 如果分割 turn，收集前缀消息
  const turnPrefixMessages: AgentMessage[] = [];
  if (cutPoint.isSplitTurn) {
    for (let i = cutPoint.turnStartIndex; i < cutPoint.firstKeptEntryIndex; i++) {
      const msg = getMessageFromEntryForCompaction(pathEntries[i]);
      if (msg) turnPrefixMessages.push(msg);
    }
  }
  
  // 9. 提取文件操作
  const fileOps = extractFileOperations(messagesToSummarize, pathEntries, prevCompactionIndex);
  
  return ok({
    firstKeptEntryId: firstKeptEntry.id,
    messagesToSummarize,
    turnPrefixMessages,
    isSplitTurn: cutPoint.isSplitTurn,
    tokensBefore,
    previousSummary,
    fileOps,
    settings,
  });
}
```

---

## 6️⃣ 摘要生成

### 6.1 摘要系统提示

```typescript
const SUMMARIZATION_SYSTEM_PROMPT = `You are a context summarization assistant. 
Your task is to read a conversation between a user and an AI coding assistant, 
then produce a structured summary following the exact format specified.

Do NOT continue the conversation. Do NOT respond to any questions in the conversation. 
ONLY output the structured summary.`;
```

### 6.2 初始摘要提示

```typescript
const SUMMARIZATION_PROMPT = `The messages above are a conversation to summarize. 
Create a structured context checkpoint summary that another LLM will use to continue the work.

Use this EXACT format:

## Goal
[What is the user trying to accomplish? Can be multiple items if the session covers different tasks.]

## Constraints & Preferences
- [Any constraints, preferences, or requirements mentioned by user]
- [Or "(none)" if none were mentioned]

## Progress
### Done
- [x] [Completed tasks/changes]

### In Progress
- [ ] [Current work]

### Blocked
- [Issues preventing progress, if any]

## Key Decisions
- **[Decision]**: [Brief rationale]

## Next Steps
1. [Ordered list of what should happen next]

## Critical Context
- [Any data, examples, or references needed to continue]
- [Or "(none)" if not applicable]

Keep each section concise. Preserve exact file paths, function names, and error messages.`;
```

### 6.3 更新摘要提示

```typescript
const UPDATE_SUMMARIZATION_PROMPT = `The messages above are NEW conversation messages to 
incorporate into the existing summary provided in <previous-summary> tags.

Update the existing structured summary with new information. RULES:
- PRESERVE all existing information from the previous summary
- ADD new progress, decisions, and context from the new messages
- UPDATE the Progress section: move items from "In Progress" to "Done" when completed
- UPDATE "Next Steps" based on what was accomplished
- PRESERVE exact file paths, function names, and error messages
- If something is no longer relevant, you may remove it

Use this EXACT format:

## Goal
[Preserve existing goals, add new ones if the task expanded]

## Constraints & Preferences
- [Preserve existing, add new ones discovered]

## Progress
### Done
- [x] [Include previously done items AND newly completed items]

### In Progress
- [ ] [Current work - update based on progress]

### Blocked
- [Current blockers - remove if resolved]

## Key Decisions
- **[Decision]**: [Brief rationale] (preserve all previous, add new)

## Next Steps
1. [Update based on current state]

## Critical Context
- [Preserve important context, add new if needed]

Keep each section concise. Preserve exact file paths, function names, and error messages.`;
```

### 6.4 Turn 前缀摘要提示

```typescript
const TURN_PREFIX_SUMMARIZATION_PROMPT = `This is the PREFIX of a turn that was too large to keep. 
The SUFFIX (recent work) is retained.

Summarize the prefix to provide context for the retained suffix:

## Original Request
[What did the user ask for in this turn?]

## Early Progress
- [Key decisions and work done in the prefix]

## Context for Suffix
- [Information needed to understand the retained recent work]

Be concise. Focus on what's needed to understand the kept suffix.`;
```

### 6.5 generateSummary 实现

```typescript
export async function generateSummary(
  currentMessages: AgentMessage[],
  model: Model<any>,
  reserveTokens: number,
  apiKey: string,
  headers?: Record<string, string>,
  signal?: AbortSignal,
  customInstructions?: string,
  previousSummary?: string,
  thinkingLevel?: ThinkingLevel,
): Promise<Result<string, CompactionError>> {
  // 1. 计算最大输出 tokens
  const maxTokens = Math.min(
    Math.floor(0.8 * reserveTokens),  // 使用 80% 的预留空间
    model.maxTokens > 0 ? model.maxTokens : Infinity,
  );
  
  // 2. 选择提示模板
  let basePrompt = previousSummary 
    ? UPDATE_SUMMARIZATION_PROMPT 
    : SUMMARIZATION_PROMPT;
  
  if (customInstructions) {
    basePrompt = `${basePrompt}\n\nAdditional focus: ${customInstructions}`;
  }
  
  // 3. 序列化对话
  const llmMessages = convertToLlm(currentMessages);
  const conversationText = serializeConversation(llmMessages);
  
  // 4. 构建提示
  let promptText = `<conversation>\n${conversationText}\n</conversation>\n\n`;
  
  if (previousSummary) {
    promptText += `<previous-summary>\n${previousSummary}\n</previous-summary>\n\n`;
  }
  promptText += basePrompt;
  
  // 5. 发送请求
  const response = await completeSimple(
    model,
    { 
      systemPrompt: SUMMARIZATION_SYSTEM_PROMPT, 
      messages: [{
        role: "user",
        content: [{ type: "text", text: promptText }],
        timestamp: Date.now(),
      }]
    },
    {
      maxTokens,
      signal,
      apiKey,
      headers,
      reasoning: thinkingLevel && thinkingLevel !== "off" ? thinkingLevel : undefined,
    }
  );
  
  // 6. 处理响应
  if (response.stopReason === "aborted") {
    return err(new CompactionError("aborted", "Summarization aborted"));
  }
  
  if (response.stopReason === "error") {
    return err(new CompactionError("summarization_failed", response.errorMessage));
  }
  
  // 7. 提取文本内容
  const textContent = response.content
    .filter((c): c is { type: "text"; text: string } => c.type === "text")
    .map((c) => c.text)
    .join("\n");
  
  return ok(textContent);
}
```

---

## 7️⃣ 执行压缩

### 7.1 compact 函数

```typescript
export async function compact(
  preparation: CompactionPreparation,
  model: Model<any>,
  apiKey: string,
  headers?: Record<string, string>,
  customInstructions?: string,
  signal?: AbortSignal,
  thinkingLevel?: ThinkingLevel,
): Promise<Result<CompactionResult, CompactionError>> {
  const {
    firstKeptEntryId,
    messagesToSummarize,
    turnPrefixMessages,
    isSplitTurn,
    tokensBefore,
    previousSummary,
    fileOps,
    settings,
  } = preparation;
  
  let summary: string;
  
  // 情况1: 分割了 turn，需要双重摘要
  if (isSplitTurn && turnPrefixMessages.length > 0) {
    const [historyResult, turnPrefixResult] = await Promise.all([
      // 历史摘要（可能包含前一个摘要的更新）
      messagesToSummarize.length > 0
        ? generateSummary(
            messagesToSummarize,
            model,
            settings.reserveTokens,
            apiKey,
            headers,
            signal,
            customInstructions,
            previousSummary,
            thinkingLevel,
          )
        : Promise.resolve(ok<string, CompactionError>("No prior history.")),
      
      // Turn 前缀摘要
      generateTurnPrefixSummary(
        turnPrefixMessages,
        model,
        settings.reserveTokens,
        apiKey,
        headers,
        signal,
        thinkingLevel,
      ),
    ]);
    
    if (!historyResult.ok) return err(historyResult.error);
    if (!turnPrefixResult.ok) return err(turnPrefixResult.error);
    
    // 组合两个摘要
    summary = `${historyResult.value}\n\n---\n\n**Turn Context (split turn):**\n\n${turnPrefixResult.value}`;
  } 
  // 情况2: 正常摘要
  else {
    const summaryResult = await generateSummary(
      messagesToSummarize,
      model,
      settings.reserveTokens,
      apiKey,
      headers,
      signal,
      customInstructions,
      previousSummary,
      thinkingLevel,
    );
    
    if (!summaryResult.ok) return err(summaryResult.error);
    summary = summaryResult.value;
  }
  
  // 8. 添加文件操作信息
  const { readFiles, modifiedFiles } = computeFileLists(fileOps);
  summary += formatFileOperations(readFiles, modifiedFiles);
  
  return ok({
    summary,
    firstKeptEntryId,
    tokensBefore,
    details: { readFiles, modifiedFiles },
  });
}
```

---

## 8️⃣ 文件操作追踪

### 8.1 文件操作数据结构

```typescript
interface FileOperations {
  read: Set<string>;     // 读取的文件
  written: Set<string>;   // 写入的文件
  edited: Set<string>;    // 编辑的文件
}

function createFileOps(): FileOperations {
  return { read: new Set(), written: new Set(), edited: new Set() };
}
```

### 8.2 从消息中提取

```typescript
function extractFileOpsFromMessage(
  message: AgentMessage, 
  fileOps: FileOperations
): void {
  if (message.role !== "assistant") return;
  if (!Array.isArray(message.content)) return;
  
  for (const block of message.content) {
    if (block.type !== "toolCall") continue;
    
    const args = block.arguments as Record<string, unknown>;
    const path = typeof args.path === "string" ? args.path : undefined;
    
    if (!path) continue;
    
    switch (block.name) {
      case "read":
        fileOps.read.add(path);
        break;
      case "write":
        fileOps.written.add(path);
        break;
      case "edit":
        fileOps.edited.add(path);
        break;
    }
  }
}
```

### 8.3 提取历史文件操作

```typescript
function extractFileOperations(
  messages: AgentMessage[],
  entries: SessionTreeEntry[],
  prevCompactionIndex: number,
): FileOperations {
  const fileOps = createFileOps();
  
  // 1. 从前一个压缩条目继承
  if (prevCompactionIndex >= 0) {
    const prevCompaction = entries[prevCompactionIndex] as CompactionEntry;
    if (!prevCompaction.fromHook && prevCompaction.details) {
      const details = prevCompaction.details as CompactionDetails;
      if (Array.isArray(details.readFiles)) {
        for (const f of details.readFiles) fileOps.read.add(f);
      }
      if (Array.isArray(details.modifiedFiles)) {
        for (const f of details.modifiedFiles) fileOps.edited.add(f);
      }
    }
  }
  
  // 2. 从当前消息中提取
  for (const msg of messages) {
    extractFileOpsFromMessage(msg, fileOps);
  }
  
  return fileOps;
}
```

### 8.4 计算文件列表

```typescript
function computeFileLists(fileOps: FileOperations): { 
  readFiles: string[]; 
  modifiedFiles: string[] 
} {
  // 修改的文件 = 编辑 + 写入
  const modified = new Set([...fileOps.edited, ...fileOps.written]);
  
  // 只读文件 = 读取但未修改
  const readOnly = [...fileOps.read].filter((f) => !modified.has(f)).sort();
  const modifiedFiles = [...modified].sort();
  
  return { readFiles: readOnly, modifiedFiles };
}
```

### 8.5 格式化文件操作

```typescript
function formatFileOperations(
  readFiles: string[], 
  modifiedFiles: string[]
): string {
  const sections: string[] = [];
  
  if (readFiles.length > 0) {
    sections.push(`<read-files>\n${readFiles.join("\n")}\n</read-files>`);
  }
  
  if (modifiedFiles.length > 0) {
    sections.push(`<modified-files>\n${modifiedFiles.join("\n")}\n</modified-files>`);
  }
  
  if (sections.length === 0) return "";
  return `\n\n${sections.join("\n\n")}`;
}
```

---

## 9️⃣ 对话序列化

### 9.1 serializeConversation

```typescript
const TOOL_RESULT_MAX_CHARS = 2000;

export function serializeConversation(messages: Message[]): string {
  const parts: string[] = [];
  
  for (const msg of messages) {
    if (msg.role === "user") {
      // 用户消息
      const content = typeof msg.content === "string"
        ? msg.content
        : msg.content
            .filter((c): c is { type: "text"; text: string } => c.type === "text")
            .map((c) => c.text)
            .join("");
      
      if (content) parts.push(`[User]: ${content}`);
    } 
    else if (msg.role === "assistant") {
      // Assistant 消息
      const textParts: string[] = [];
      const thinkingParts: string[] = [];
      const toolCalls: string[] = [];
      
      for (const block of msg.content) {
        if (block.type === "text") {
          textParts.push(block.text);
        } else if (block.type === "thinking") {
          thinkingParts.push(block.thinking);
        } else if (block.type === "toolCall") {
          const args = block.arguments as Record<string, unknown>;
          const argsStr = Object.entries(args)
            .map(([k, v]) => `${k}=${safeJsonStringify(v)}`)
            .join(", ");
          toolCalls.push(`${block.name}(${argsStr})`);
        }
      }
      
      if (thinkingParts.length > 0) {
        parts.push(`[Assistant thinking]: ${thinkingParts.join("\n")}`);
      }
      if (textParts.length > 0) {
        parts.push(`[Assistant]: ${textParts.join("\n")}`);
      }
      if (toolCalls.length > 0) {
        parts.push(`[Assistant tool calls]: ${toolCalls.join("; ")}`);
      }
    } 
    else if (msg.role === "toolResult") {
      // 工具结果（截断）
      const content = msg.content
        .filter((c): c is { type: "text"; text: string } => c.type === "text")
        .map((c) => c.text)
        .join("");
      
      if (content) {
        const truncated = content.length > TOOL_RESULT_MAX_CHARS
          ? content.slice(0, TOOL_RESULT_MAX_CHARS) + "\n\n[... truncated ...]"
          : content;
        parts.push(`[Tool result]: ${truncated}`);
      }
    }
  }
  
  return parts.join("\n\n");
}
```

---

## 🔟 分支摘要

### 10.1 collectEntriesForBranchSummary

```typescript
interface CollectEntriesResult {
  /** 要摘要的条目（按时间顺序） */
  entries: SessionTreeEntry[];
  
  /** 旧叶子节点和目标节点之间的最深公共祖先 */
  commonAncestorId: string | null;
}

export async function collectEntriesForBranchSummary(
  session: Session,
  oldLeafId: string | null,
  targetId: string,
): Promise<CollectEntriesResult> {
  if (!oldLeafId) {
    return { entries: [], commonAncestorId: null };
  }
  
  // 1. 获取旧叶子到根的路径
  const oldPath = new Set(
    (await session.getBranch(oldLeafId)).map((e) => e.id)
  );
  
  // 2. 获取目标到根的路径
  const targetPath = await session.getBranch(targetId);
  
  // 3. 找到公共祖先
  let commonAncestorId: string | null = null;
  for (let i = targetPath.length - 1; i >= 0; i--) {
    if (oldPath.has(targetPath[i].id)) {
      commonAncestorId = targetPath[i].id;
      break;
    }
  }
  
  // 4. 收集从旧叶子到公共祖先的条目
  const entries: SessionTreeEntry[] = [];
  let current: string | null = oldLeafId;
  
  while (current && current !== commonAncestorId) {
    const entry = await session.getEntry(current);
    if (!entry) throw new SessionError("invalid_session", `Entry ${current} not found`);
    entries.push(entry as SessionTreeEntry);
    current = entry.parentId;
  }
  entries.reverse();
  
  return { entries, commonAncestorId };
}
```

### 10.2 分支摘要提示

```typescript
const BRANCH_SUMMARY_PREAMBLE = `The user explored a different conversation branch before returning here.
Summary of that exploration:

`;

const BRANCH_SUMMARY_PROMPT = `Create a structured summary of this conversation branch for context when returning later.

Use this EXACT format:

## Goal
[What was the user trying to accomplish in this branch?]

## Constraints & Preferences
- [Any constraints, preferences, or requirements mentioned]
- [Or "(none)" if none were mentioned]

## Progress
### Done
- [x] [Completed tasks/changes]

### In Progress
- [ ] [Work that was started but not finished]

### Blocked
- [Issues preventing progress, if any]

## Key Decisions
- **[Decision]**: [Brief rationale]

## Next Steps
1. [What should happen next to continue this work]

Keep each section concise. Preserve exact file paths, function names, and error messages.`;
```

### 10.3 generateBranchSummary

```typescript
export async function generateBranchSummary(
  entries: SessionTreeEntry[],
  options: GenerateBranchSummaryOptions,
): Promise<Result<BranchSummaryResult, BranchSummaryError>> {
  const { model, apiKey, headers, signal, customInstructions, replaceInstructions, reserveTokens = 16384 } = options;
  
  const contextWindow = model.contextWindow || 128000;
  const tokenBudget = contextWindow - reserveTokens;
  
  // 1. 准备条目（在 token 预算内）
  const { messages, fileOps } = prepareBranchEntries(entries, tokenBudget);
  
  if (messages.length === 0) {
    return ok({ summary: "No content to summarize", readFiles: [], modifiedFiles: [] });
  }
  
  // 2. 序列化对话
  const llmMessages = convertToLlm(messages);
  const conversationText = serializeConversation(llmMessages);
  
  // 3. 构建提示
  let instructions: string;
  if (replaceInstructions && customInstructions) {
    instructions = customInstructions;
  } else if (customInstructions) {
    instructions = `${BRANCH_SUMMARY_PROMPT}\n\nAdditional focus: ${customInstructions}`;
  } else {
    instructions = BRANCH_SUMMARY_PROMPT;
  }
  
  const promptText = `<conversation>\n${conversationText}\n</conversation>\n\n${instructions}`;
  
  // 4. 调用 LLM
  const response = await completeSimple(
    model,
    { 
      systemPrompt: SUMMARIZATION_SYSTEM_PROMPT, 
      messages: [{
        role: "user",
        content: [{ type: "text", text: promptText }],
        timestamp: Date.now(),
      }]
    },
    { apiKey, headers, signal, maxTokens: 2048 }
  );
  
  // 5. 处理响应
  let summary = response.content
    .filter((c): c is { type: "text"; text: string } => c.type === "text")
    .map((c) => c.text)
    .join("\n");
  
  summary = BRANCH_SUMMARY_PREAMBLE + summary;
  
  // 6. 添加文件信息
  const { readFiles, modifiedFiles } = computeFileLists(fileOps);
  summary += formatFileOperations(readFiles, modifiedFiles);
  
  return ok({ summary, readFiles, modifiedFiles });
}
```

---

## 1️⃣1️⃣ 完整压缩流程图

```
┌─────────────────────────────────────────────────────────────────┐
│                     Compress Request                            │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  prepareCompaction()                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 1. 检查是否需要压缩                                      │    │
│  │ 2. 找到前一个压缩位置                                    │    │
│  │ 3. 确定压缩边界 (boundaryStart → boundaryEnd)           │    │
│  │ 4. 估计 tokensBefore                                   │    │
│  │ 5. findCutPoint() 查找切割点                            │    │
│  │ 6. 收集 messagesToSummarize                            │    │
│  │ 7. 如果分割 turn，收集 turnPrefixMessages               │    │
│  │ 8. 提取文件操作 fileOps                                │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  compact()                                                       │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Case 1: isSplitTurn && turnPrefixMessages.length > 0     │   │
│  │                                                           │   │
│  │   ┌─────────────────┐    ┌─────────────────────────┐      │   │
│  │   │ generateSummary  │    │ generateTurnPrefixSummary│     │   │
│  │   │ (历史摘要)       │    │ (Turn 前缀摘要)         │     │   │
│  │   └────────┬─────────┘    └──────────┬────────────┘      │   │
│  │            │                         │                    │   │
│  │            └──────────┬──────────────┘                    │   │
│  │                       │                                   │   │
│  │                       ▼                                   │   │
│  │              ┌──────────────────┐                       │   │
│  │              │ 组合两个摘要       │                       │   │
│  │              │ history + prefix │                       │   │
│  │              └──────────────────┘                       │   │
│  │                                                         │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Case 2: 正常摘要                                         │   │
│  │                                                           │   │
│  │   ┌─────────────────────────────────────────────────┐    │   │
│  │   │ generateSummary(messagesToSummarize, previous)   │    │   │
│  │   └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ 添加文件操作信息                                          │   │
│  │ formatFileOperations(readFiles, modifiedFiles)           │   │
│  └───────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  CompactionResult                                                │
│  {                                                              │
│    summary: "...",        // 摘要文本                            │
│    firstKeptEntryId: "...", // 保留的第一个条目 ID              │
│    tokensBefore: 50000,   // 压缩前的 tokens                    │
│    details: {              // 细节                               │
│      readFiles: [...],    // 读取的文件                         │
│      modifiedFiles: [...]  // 修改的文件                        │
│    }                                                             │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣2️⃣ 摘要示例

### 初始摘要

```markdown
## Goal
Build a React todo application with TypeScript and Tailwind CSS.

## Constraints & Preferences
- Use functional components with hooks
- Prefer TypeScript strict mode
- (none)

## Progress
### Done
- [x] Created project structure with Vite
- [x] Installed dependencies (react, react-dom, tailwindcss)
- [x] Configured Tailwind CSS
- [x] Created TodoItem component
- [x] Created TodoList component

### In Progress
- [ ] Implement addTodo functionality
- [ ] Add localStorage persistence

### Blocked
- (none)

## Key Decisions
- **Vite over CRA**: Faster builds and better DX
- **Tailwind utility-first**: Quick styling iteration

## Next Steps
1. Create TodoInput component with validation
2. Implement addTodo state management
3. Add todo deletion functionality
4. Add localStorage persistence

## Critical Context
- src/components/TodoItem.tsx
- src/components/TodoList.tsx

<modified-files>
src/components/TodoItem.tsx
src/components/TodoList.tsx
</modified-files>
```

### 更新摘要

```markdown
## Goal
Build a React todo application with TypeScript and Tailwind CSS.

## Constraints & Preferences
- Use functional components with hooks
- Prefer TypeScript strict mode
- (none)

## Progress
### Done
- [x] Created project structure with Vite
- [x] Installed dependencies (react, react-dom, tailwindcss)
- [x] Configured Tailwind CSS
- [x] Created TodoItem component
- [x] Created TodoList component
- [x] Created TodoInput component with validation
- [x] Implemented addTodo state management
- [x] Added todo deletion functionality

### In Progress
- [ ] Add localStorage persistence
- [ ] Add edit todo functionality

### Blocked
- (none)

## Key Decisions
- **Vite over CRA**: Faster builds and better DX
- **Tailwind utility-first**: Quick styling iteration
- **useReducer for state**: Better for complex state logic

## Next Steps
1. Add localStorage persistence
2. Implement edit todo functionality
3. Add filters (all/active/completed)

## Critical Context
- src/components/TodoItem.tsx
- src/components/TodoList.tsx
- src/components/TodoInput.tsx
- src/hooks/useTodos.ts

<modified-files>
src/components/TodoItem.tsx
src/components/TodoList.tsx
src/components/TodoInput.tsx
src/hooks/useTodos.ts
</modified-files>
```

---

## 总结

| 组件 | 功能 |
|------|------|
| `estimateTokens()` | 估算单条消息的 token 数 |
| `estimateContextTokens()` | 估算整个上下文的 token 数 |
| `findValidCutPoints()` | 找到所有有效切割点 |
| `findTurnStartIndex()` | 找到 turn 开始位置 |
| `findCutPoint()` | 确定压缩切割点 |
| `prepareCompaction()` | 准备压缩参数 |
| `generateSummary()` | 生成摘要（支持迭代更新） |
| `compact()` | 执行压缩 |
| `serializeConversation()` | 序列化对话用于摘要 |
| `extractFileOpsFromMessage()` | 提取文件操作 |

**核心设计**：
1. **保守估计**：使用字符数/4估算 token
2. **智能切割**：在 turn 边界切割，避免破坏语义
3. **迭代摘要**：支持多次压缩时的增量更新
4. **文件追踪**：记录历史中的文件操作
5. **双摘要**：分割 turn 时对前后两部分分别摘要
