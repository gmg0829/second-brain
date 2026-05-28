# pi-agent-core 源码深度研究

> 基于 `/home/gaominggang/workspace/pi` 仓库的 TypeScript 源码分析

## 📁 源码结构概览

```
packages/
├── agent/          # pi-agent-core 核心包
│   └── src/
│       ├── agent-loop.ts      # 核心 Agent 循环实现
│       ├── agent.ts          # Agent 类（状态封装）
│       ├── types.ts          # 类型定义
│       ├── proxy.ts          # 代理工具
│       ├── index.ts          # 导出入口
│       └── harness/          # 高层抽象
│           ├── agent-harness.ts    # AgentHarness 类
│           ├── messages.ts         # 消息转换
│           ├── skills.ts           # Skill 加载
│           ├── prompt-templates.ts # 模板系统
│           ├── system-prompt.ts    # 系统提示
│           ├── compaction/         # 上下文压缩
│           └── session/            # 会话存储
├── ai/             # pi-ai LLM API 抽象层
│   └── src/
│       ├── stream.ts          # 流式 API 入口
│       ├── types.ts           # 统一类型定义
│       ├── api-registry.ts    # API 注册表
│       └── providers/         # 各 Provider 实现
└── coding-agent/   # pi CLI 应用
    └── src/
        ├── core/              # 核心实现
        │   ├── sdk.ts        # SDK 入口
        │   ├── agent-session.ts
        │   └── tools/        # 工具集
        └── modes/            # 交互模式
```

---

## 1️⃣ 核心架构：Agent Loop 模式

### 1.1 循环入口函数

```typescript
// agent-loop.ts

// 入口1：从新消息开始
export function agentLoop(
  prompts: AgentMessage[],
  context: AgentContext,
  config: AgentLoopConfig,
  signal?: AbortSignal,
  streamFn?: StreamFn,
): EventStream<AgentEvent, AgentMessage[]>

// 入口2：从现有上下文继续
export function agentLoopContinue(
  context: AgentContext,
  config: AgentLoopConfig,
  signal?: AbortSignal,
  streamFn?: StreamFn,
): EventStream<AgentEvent, AgentMessage[]>
```

### 1.2 主循环结构 (runLoop)

```typescript
async function runLoop(
  initialContext: AgentContext,
  newMessages: AgentMessage[],
  initialConfig: AgentLoopConfig,
  signal: AbortSignal | undefined,
  emit: AgentEventSink,
  streamFn?: StreamFn,
): Promise<void> {
  let pendingMessages: AgentMessage[] = [];
  
  // 外层循环：处理后续消息
  while (true) {
    let hasMoreToolCalls = true;
    
    // 内层循环：处理工具调用
    while (hasMoreToolCalls || pendingMessages.length > 0) {
      // 1. 处理待注入的消息
      if (pendingMessages.length > 0) {
        for (const message of pendingMessages) {
          await emit({ type: "message_start", message });
          await emit({ type: "message_end", message });
          currentContext.messages.push(message);
        }
        pendingMessages = [];
      }
      
      // 2. 流式获取 Assistant 响应
      const message = await streamAssistantResponse(...);
      
      // 3. 检查错误
      if (message.stopReason === "error" || message.stopReason === "aborted") {
        await emit({ type: "agent_end", messages: newMessages });
        return;
      }
      
      // 4. 执行工具调用
      const toolResults = [];
      const toolCalls = message.content.filter(c => c.type === "toolCall");
      if (toolCalls.length > 0) {
        const executedToolBatch = await executeToolCalls(...);
        toolResults.push(...executedToolBatch.messages);
        hasMoreToolCalls = !executedToolBatch.terminate;
      }
      
      // 5. 发射 turn_end
      await emit({ type: "turn_end", message, toolResults });
      
      // 6. 检查是否停止
      if (await config.shouldStopAfterTurn?.({...})) {
        await emit({ type: "agent_end", messages: newMessages });
        return;
      }
      
      // 7. 获取 steering 消息
      pendingMessages = await config.getSteeringMessages?.() || [];
    }
    
    // 外层：检查 follow-up 消息
    const followUpMessages = await config.getFollowUpMessages?.() || [];
    if (followUpMessages.length > 0) {
      pendingMessages = followUpMessages;
      continue;
    }
    
    break; // 退出外层循环
  }
  
  await emit({ type: "agent_end", messages: newMessages });
}
```

### 1.3 流式响应处理 (streamAssistantResponse)

```typescript
async function streamAssistantResponse(
  context: AgentContext,
  config: AgentLoopConfig,
  signal: AbortSignal | undefined,
  emit: AgentEventSink,
  streamFn?: StreamFn,
): Promise<AssistantMessage> {
  // 1. 应用上下文转换（可选）
  let messages = context.messages;
  if (config.transformContext) {
    messages = await config.transformContext(messages, signal);
  }
  
  // 2. 转换为 LLM 格式
  const llmMessages = await config.convertToLlm(messages);
  
  // 3. 构建 LLM 上下文
  const llmContext: Context = {
    systemPrompt: context.systemPrompt,
    messages: llmMessages,
    tools: context.tools,
  };
  
  // 4. 解析 API Key（支持动态刷新）
  const resolvedApiKey = await config.getApiKey?.(config.model.provider) || config.apiKey;
  
  // 5. 调用 LLM
  const response = await streamFunction(config.model, llmContext, {...});
  
  // 6. 处理流式事件
  for await (const event of response) {
    switch (event.type) {
      case "start":
        partialMessage = event.partial;
        await emit({ type: "message_start", message: {...} });
        break;
      case "text_delta":
      case "toolcall_delta":
        partialMessage = event.partial;
        await emit({ type: "message_update", ... });
        break;
      case "done":
      case "error":
        const finalMessage = await response.result();
        await emit({ type: "message_end", message: finalMessage });
        return finalMessage;
    }
  }
}
```

---

## 2️⃣ 消息转换管道

### 2.1 消息类型层级

```
AgentMessage (扩展接口)
├── Message (LLM 标准消息)
│   ├── UserMessage
│   ├── AssistantMessage
│   └── ToolResultMessage
└── CustomAgentMessages (声明合并扩展)
    ├── BashExecutionMessage
    ├── CustomMessage
    ├── BranchSummaryMessage
    └── CompactionSummaryMessage
```

### 2.2 convertToLlm 实现

```typescript
// harness/messages.ts

export function convertToLlm(messages: AgentMessage[]): Message[] {
  return messages.map(m => {
    switch (m.role) {
      case "bashExecution":
        if (m.excludeFromContext) return undefined;
        return {
          role: "user",
          content: [{ type: "text", text: bashExecutionToText(m) }],
          timestamp: m.timestamp,
        };
      case "custom":
        // 自定义消息转用户消息
        return { role: "user", content: m.content, timestamp: m.timestamp };
      case "branchSummary":
        return {
          role: "user",
          content: [{ type: "text", text: BRANCH_SUMMARY_PREFIX + m.summary + BRANCH_SUMMARY_SUFFIX }],
          timestamp: m.timestamp,
        };
      case "user":
      case "assistant":
      case "toolResult":
        return m;
      default:
        return undefined;
    }
  }).filter(m => m !== undefined);
}
```

---

## 3️⃣ 工具执行系统

### 3.1 执行模式

```typescript
// types.ts
type ToolExecutionMode = "sequential" | "parallel";

// sequential: 逐个执行
// parallel: 预检后并发执行
```

### 3.2 工具执行流程

```typescript
async function executeToolCalls(...) {
  const toolCalls = message.content.filter(c => c.type === "toolCall");
  
  // 检查是否有 sequential 工具
  const hasSequentialToolCall = toolCalls.some(
    tc => currentContext.tools?.find(t => t.name === tc.name)?.executionMode === "sequential"
  );
  
  if (config.toolExecution === "sequential" || hasSequentialToolCall) {
    return executeToolCallsSequential(...);
  }
  return executeToolCallsParallel(...);
}
```

### 3.3 工具生命周期

```typescript
// 1. prepareToolCall - 参数准备和验证
async function prepareToolCall(...) {
  const tool = currentContext.tools?.find(t => t.name === toolCall.name);
  if (!tool) return { kind: "immediate", result: createErrorToolResult("Tool not found"), isError: true };
  
  // 验证参数
  const validatedArgs = validateToolArguments(tool, preparedToolCall);
  
  // 调用 beforeToolCall 钩子
  if (config.beforeToolCall) {
    const beforeResult = await config.beforeToolCall({ assistantMessage, toolCall, args, context }, signal);
    if (beforeResult?.block) {
      return { kind: "immediate", result: createErrorToolResult(beforeResult.reason), isError: true };
    }
  }
  
  return { kind: "prepared", toolCall, tool, args: validatedArgs };
}

// 2. executePreparedToolCall - 执行工具
async function executePreparedToolCall(prepared, signal, emit) {
  try {
    const result = await prepared.tool.execute(
      prepared.toolCall.id,
      prepared.args,
      signal,
      (partialResult) => {  // 流式更新回调
        emit({ type: "tool_execution_update", partialResult });
      }
    );
    return { result, isError: false };
  } catch (error) {
    return { result: createErrorToolResult(error.message), isError: true };
  }
}

// 3. finalizeExecutedToolCall - 最终化结果
async function finalizeExecutedToolCall(...) {
  let result = executed.result;
  let isError = executed.isError;
  
  // 调用 afterToolCall 钩子
  if (config.afterToolCall) {
    const afterResult = await config.afterToolCall({ toolCall, args, result, isError, context });
    if (afterResult) {
      result = {
        content: afterResult.content ?? result.content,
        details: afterResult.details ?? result.details,
        terminate: afterResult.terminate ?? result.terminate,
      };
      isError = afterResult.isError ?? isError;
    }
  }
  
  return { toolCall, result, isError };
}
```

---

## 4️⃣ 事件流系统

### 4.1 事件类型

```typescript
// AgentEvent 类型
type AgentEvent =
  // Agent 生命周期
  | { type: "agent_start" }
  | { type: "agent_end"; messages: AgentMessage[] }
  
  // Turn 生命周期
  | { type: "turn_start" }
  | { type: "turn_end"; message: AgentMessage; toolResults: ToolResultMessage[] }
  
  // Message 生命周期
  | { type: "message_start"; message: AgentMessage }
  | { type: "message_update"; message: AgentMessage; assistantMessageEvent: AssistantMessageEvent }
  | { type: "message_end"; message: AgentMessage }
  
  // 工具执行生命周期
  | { type: "tool_execution_start"; toolCallId: string; toolName: string; args: any }
  | { type: "tool_execution_update"; toolCallId: string; toolName: string; args: any; partialResult: any }
  | { type: "tool_execution_end"; toolCallId: string; toolName: string; result: any; isError: boolean };
```

### 4.2 完整事件序列

```
agent_start
  turn_start
    message_start (user)
    message_end (user)
    message_start (assistant - streaming)
      message_update...
      message_update...
    message_end (assistant)
    tool_execution_start (tool1)
      tool_execution_update...
      tool_execution_update...
    tool_execution_end (tool1)
    message_start (toolResult)
    message_end (toolResult)
    tool_execution_start (tool2)
    tool_execution_end (tool2)
    message_start (toolResult)
    message_end (toolResult)
  turn_end
  turn_start
    message_start (assistant)
    message_end (assistant)
  turn_end
agent_end
```

---

## 5️⃣ AgentHarness 高级抽象

### 5.1 AgentHarness vs Agent

| 特性 | Agent | AgentHarness |
|------|-------|--------------|
| 层级 | 低级 | 高级 |
| 会话管理 | ❌ | ✅ JSONL 存储 |
| 技能系统 | ❌ | ✅ SKILL.md |
| 上下文压缩 | ❌ | ✅ Compaction |
| 分支摘要 | ❌ | ✅ Branch Summary |
| 事件系统 | ✅ | ✅ 扩展钩子 |

### 5.2 核心方法

```typescript
class AgentHarness {
  // 提示入口
  async prompt(text: string, options?: { images?: ImageContent[] }): Promise<AssistantMessage>
  
  // 技能调用
  async skill(name: string, additionalInstructions?: string): Promise<AssistantMessage>
  
  // 模板调用
  async promptFromTemplate(name: string, args: string[]): Promise<AssistantMessage>
  
  // 运行时注入
  async steer(text: string): Promise<void>
  async followUp(text: string): Promise<void>
  async nextTurn(text: string): Promise<void>
  
  // 会话管理
  async compact(customInstructions?: string): Promise<{ summary: string; firstKeptEntryId: string; tokensBefore: number }>
  async navigateTree(targetId: string, options?: { summarize?: boolean }): Promise<NavigateTreeResult>
  
  // 模型控制
  async setModel(model: Model<any>): Promise<void>
  async setThinkingLevel(level: ThinkingLevel): Promise<void>
  
  // 工具控制
  async setActiveTools(toolNames: string[]): Promise<void>
  
  // 生命周期钩子
  on<TType extends keyof AgentHarnessEventResultMap>(type: TType, handler: ...): () => void
}
```

---

## 6️⃣ 上下文压缩系统

### 6.1 Compaction 工作流程

```typescript
// compaction.ts

export interface CompactionPreparation {
  firstKeptEntryId: string;
  messagesToSummarize: AgentMessage[];
  turnPrefixMessages: AgentMessage[];  // 被分割的 Turn 的前缀
  isSplitTurn: boolean;
  tokensBefore: number;
  previousSummary?: string;
  fileOps: FileOperations;
  settings: CompactionSettings;
}

export async function compact(
  preparation: CompactionPreparation,
  model: Model<any>,
  apiKey: string,
  ...
): Promise<Result<CompactionResult>> {
  let summary: string;
  
  if (isSplitTurn && turnPrefixMessages.length > 0) {
    // 双摘要：历史 + Turn 前缀
    const [historyResult, turnPrefixResult] = await Promise.all([
      generateSummary(messagesToSummarize, ...),
      generateTurnPrefixSummary(turnPrefixMessages, ...),
    ]);
    summary = `${historyResult}\n\n**Turn Context (split turn):**\n\n${turnPrefixResult}`;
  } else {
    summary = await generateSummary(messagesToSummarize, ...);
  }
  
  return { summary, firstKeptEntryId, tokensBefore, details: { readFiles, modifiedFiles } };
}
```

### 6.2 摘要提示词

```typescript
const SUMMARIZATION_PROMPT = `
The messages above are a conversation to summarize. Create a structured context checkpoint summary.

Use this EXACT format:

## Goal
[What is the user trying to accomplish?]

## Constraints & Preferences
- [Any constraints mentioned by user]

## Progress
### Done
- [x] [Completed tasks]

### In Progress
- [ ] [Current work]

### Blocked
- [Issues if any]

## Key Decisions
- **[Decision]**: [Rationale]

## Next Steps
1. [Ordered list]

## Critical Context
- [Files, references needed]
`;
```

---

## 7️⃣ 会话存储系统

### 7.1 会话数据结构

```typescript
// session/session.ts

class Session<TMetadata> {
  async getBranch(fromId?: string): Promise<SessionTreeEntry[]>
  async buildContext(): Promise<SessionContext>
  async appendMessage(message: AgentMessage): Promise<string>
  async appendCompaction(...): Promise<string>
  async appendModelChange(...): Promise<string>
  async appendThinkingLevelChange(...): Promise<string>
  async moveTo(entryId: string | null, summary?: {...}): Promise<string | undefined>
}
```

### 7.2 Entry 类型

```typescript
type SessionTreeEntry =
  | MessageEntry           // 消息
  | ModelChangeEntry      // 模型切换
  | ThinkingLevelChangeEntry  // 思考级别切换
  | CompactionEntry        // 压缩记录
  | BranchSummaryEntry     // 分支摘要
  | CustomEntry           // 自定义数据
  | LabelEntry            // 标签
  | SessionInfoEntry;     // 会话信息
```

---

## 8️⃣ pi-ai 统一 API 层

### 8.1 核心类型

```typescript
// ai/types.ts

interface Model<TApi extends Api> {
  id: string;
  name: string;
  api: TApi;           // API 类型
  provider: Provider;  // 提供商
  baseUrl: string;
  reasoning: boolean;
  thinkingLevelMap?: ThinkingLevelMap;
  contextWindow: number;
  maxTokens: number;
  cost: { input, output, cacheRead, cacheWrite };
}

interface Context {
  systemPrompt?: string;
  messages: Message[];
  tools?: Tool[];
}
```

### 8.2 支持的 API 类型

```typescript
type KnownApi =
  | "openai-completions"
  | "mistral-conversations"
  | "openai-responses"
  | "azure-openai-responses"
  | "anthropic-messages"
  | "bedrock-converse-stream"
  | "google-generative-ai"
  | "google-vertex";
```

### 8.3 支持的 Provider

```typescript
type KnownProvider =
  | "anthropic"          // Anthropic
  | "openai"             // OpenAI
  | "google"             // Google AI
  | "azure-openai-responses"
  | "deepseek"           // DeepSeek
  | "github-copilot"     // GitHub Copilot
  | "xai"                // xAI Grok
  | "groq"               // Groq
  | "cerebras"           // Cerebras
  | "openrouter"         // OpenRouter
  | "mistral"            // Mistral
  | "minimax"            // MiniMax
  | "moonshotai"         // Moonshot
  | "fireworks"          // Fireworks.ai
  | "together"           // Together AI
  | "kimi-coding"        // Kimi Coding
  | "cloudflare-workers-ai"
  // ... 更多
```

---

## 9️⃣ 关键设计模式

### 9.1 声明合并扩展

```typescript
// types.ts
export interface CustomAgentMessages {
  // 空 - 由应用通过声明合并扩展
}

declare module "../types.ts" {
  interface CustomAgentMessages {
    bashExecution: BashExecutionMessage;
    custom: CustomMessage;
    branchSummary: BranchSummaryMessage;
    compactionSummary: CompactionSummaryMessage;
  }
}
```

### 9.2 事件流订阅

```typescript
// Agent.ts
class Agent {
  subscribe(listener: (event: AgentEvent, signal: AbortSignal) => Promise<void> | void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

// 使用
const unsubscribe = agent.subscribe(async (event, signal) => {
  if (event.type === "message_end") {
    console.log("Message received:", event.message);
  }
});
```

### 9.3 钩子系统

```typescript
// AgentLoopConfig 钩子
interface AgentLoopConfig {
  // 上下文转换
  transformContext?: (messages: AgentMessage[], signal?: AbortSignal) => Promise<AgentMessage[]>;
  
  // LLM 消息转换
  convertToLlm: (messages: AgentMessage[]) => Message[] | Promise<Message[]>;
  
  // API Key 解析
  getApiKey?: (provider: string) => Promise<string | undefined>;
  
  // 工具调用钩子
  beforeToolCall?: (context: BeforeToolCallContext) => Promise<BeforeToolCallResult | undefined>;
  afterToolCall?: (context: AfterToolCallContext) => Promise<AfterToolCallResult | undefined>;
  
  // 停止决策
  shouldStopAfterTurn?: (context: ShouldStopAfterTurnContext) => boolean;
  
  // 下一轮准备
  prepareNextTurn?: (context: PrepareNextTurnContext) => AgentLoopTurnUpdate | undefined;
  
  // 消息队列
  getSteeringMessages?: () => Promise<AgentMessage[]>;
  getFollowUpMessages?: () => Promise<AgentMessage[]>;
}
```

---

## 🔟 源码文件索引

| 文件 | 行数 | 功能 |
|------|------|------|
| `agent-loop.ts` | ~600 | 核心 Agent 循环实现 |
| `agent.ts` | ~400 | Agent 类状态封装 |
| `types.ts` | ~500 | 类型定义 |
| `harness/agent-harness.ts` | ~900 | 高级抽象封装 |
| `harness/messages.ts` | ~200 | 消息转换 |
| `harness/skills.ts` | ~500 | 技能加载系统 |
| `harness/compaction/compaction.ts` | ~700 | 上下文压缩 |
| `harness/session/session.ts` | ~300 | 会话管理 |
| `ai/stream.ts` | ~100 | LLM API 入口 |
| `ai/types.ts` | ~1200 | 统一类型系统 |

---

## 总结

**pi-agent-core** 是一个精心设计的 Agent 运行时框架：

1. **分层架构**：从低级的 `agent-loop` 到高级的 `AgentHarness`，满足不同复杂度的需求
2. **消息驱动**：通过事件流系统实现细粒度的状态跟踪
3. **可扩展性**：通过钩子系统和声明合并支持无限扩展
4. **会话持久化**：内置 JSONL 会话存储和上下文压缩
5. **多提供商支持**：通过 `pi-ai` 层统一抽象多种 LLM API

**核心创新**：
- Steering/Follow-up 机制实现运行时注入
- 工具执行的分层验证和钩子系统
- 自动上下文压缩避免上下文溢出
- Branch Summary 支持分支会话回溯
