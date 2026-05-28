# AgentHarness 深度研究

> 基于 `/home/gaominggang/workspace/pi/packages/agent/src/harness/agent-harness.ts`
> 源码行数：~900 行

---

## 1️⃣ 概述：Harness 在架构中的位置

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│                   (pi CLI, VS Code Extension)              │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   AgentHarness                             │
│  • 会话管理 (JSONL Storage)                                │
│  • 技能系统 (Skills)                                      │
│  • 上下文压缩 (Compaction)                                 │
│  • 分支摘要 (Branch Summary)                               │
│  • 钩子系统 (Hooks)                                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      Agent                                 │
│  • 状态管理 (Messages, Tools, Model)                       │
│  • 队列控制 (Steering, Follow-up)                         │
│  • 事件订阅 (Event Subscription)                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Agent Loop                               │
│  • LLM 调用                                               │
│  • 工具执行                                               │
│  • 事件流处理                                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     pi-ai                                  │
│  • 统一 LLM API                                           │
│  • 多 Provider 支持                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ 核心状态

```typescript
class AgentHarness {
  // 核心依赖
  readonly env: ExecutionEnv;              // 文件系统 + Shell 执行
  private session: Session;                // 会话存储
  
  // 运行时状态
  private phase: AgentHarnessPhase = "idle";  // idle | turn | compaction | branch_summary | retry
  private runAbortController?: AbortController;
  private runPromise?: Promise<void>;
  
  // 待写入的会话变更（运行时队列）
  private pendingSessionWrites: PendingSessionWrite[] = [];
  
  // 模型和推理
  private model: Model<any>;
  private thinkingLevel: ThinkingLevel;
  
  // 系统提示
  private systemPrompt: string | ((context) => string | Promise<string>);
  
  // 流配置
  private streamOptions: AgentHarnessStreamOptions;
  private getApiKeyAndHeaders?: (model) => Promise<{ apiKey, headers }>;
  
  // 资源（Skills + Prompt Templates）
  private resources: AgentHarnessResources;
  
  // 工具
  private tools = new Map<string, TTool>();
  private activeToolNames: string[];
  
  // 消息队列
  private steerQueue: UserMessage[] = [];        // 运行时注入
  private followUpQueue: UserMessage[] = [];      // 完成后注入
  private nextTurnQueue: AgentMessage[] = [];    // 下一轮消息
  private steeringQueueMode: QueueMode;           // all | one-at-a-time
  private followUpQueueMode: QueueMode;
  
  // 事件处理器
  private handlers = new Map<string, Set<AgentHarnessHandler>>();
}
```

---

## 3️⃣ 生命周期管理

### 3.1 Phase 状态机

```typescript
type AgentHarnessPhase = 
  | "idle"           // 空闲，可接受 prompt/compact/navigateTree
  | "turn"           // 执行 turn 中
  | "compaction"     // 执行压缩中
  | "branch_summary" // 生成分支摘要中
  | "retry";         // 重试中（预留）
```

### 3.2 Phase 保护

```typescript
// 所有可能阻塞的操作都需要检查 phase
async prompt(...) {
  if (this.phase !== "idle") 
    throw new AgentHarnessError("busy", "AgentHarness is busy");
  this.phase = "turn";
  try {
    return await this.executeTurn(turnState, text, options);
  } finally {
    this.phase = "idle";  // 关键：必须恢复到 idle
  }
}

async compact(...) {
  if (this.phase !== "idle")
    throw new AgentHarnessError("busy", "compact() requires idle harness");
  this.phase = "compaction";
  try {
    // ...
  } finally {
    this.phase = "idle";
  }
}
```

---

## 4️⃣ Turn 执行流程

### 4.1 executeTurn 详解

```typescript
private async executeTurn(
  turnState: AgentHarnessTurnState,
  text: string,
  options?: { images?: ImageContent[] }
): Promise<AssistantMessage> {
  let activeTurnState = turnState;
  
  // 1. 构建消息列表
  let messages: AgentMessage[] = [createUserMessage(text, options?.images)];
  
  // 2. 注入 nextTurn 队列中的消息
  if (this.nextTurnQueue.length > 0) {
    const queuedMessages = this.nextTurnQueue.splice(0);
    messages = [...queuedMessages, messages[0]!];
  }
  
  // 3. 触发 before_agent_start 钩子
  const beforeResult = await this.emitHook({
    type: "before_agent_start",
    prompt: text,
    images: options?.images,
    systemPrompt: turnState.systemPrompt,
    resources: turnState.resources,
  });
  
  // 4. 允许钩子注入额外消息
  if (beforeResult?.messages) {
    messages = [...messages, ...beforeResult.messages];
  }
  
  // 5. 允许钩子修改系统提示
  const finalSystemPrompt = beforeResult?.systemPrompt;
  
  // 6. 创建 abort controller
  const abortController = new AbortController();
  
  // 7. 创建状态快照闭包
  const getTurnState = () => activeTurnState;
  const setTurnState = (next) => { activeTurnState = next; };
  
  // 8. 运行 agent loop
  this.runAbortController = abortController;
  const runResultPromise = runAgentLoop(
    messages,
    this.createContext(turnState, finalSystemPrompt),
    this.createLoopConfig(getTurnState, setTurnState),
    (event) => this.handleAgentEvent(event, abortController.signal),
    abortController.signal,
    this.createStreamFn(getTurnState),
  );
  
  // 9. 提取 assistant 消息
  try {
    const newMessages = await runResultPromise;
    for (let i = newMessages.length - 1; i >= 0; i--) {
      const message = newMessages[i]!;
      if (message.role === "assistant") {
        return message;
      }
    }
    throw new AgentHarnessError("invalid_state", "No assistant message");
  } finally {
    await this.flushPendingSessionWrites();
    this.runAbortController = undefined;
  }
}
```

### 4.2 createTurnState

```typescript
private async createTurnState(): Promise<AgentHarnessTurnState> {
  // 1. 从会话构建上下文（包含历史消息）
  const context = await this.session.buildContext();
  
  // 2. 获取资源
  const resources = this.getResources();
  
  // 3. 获取会话元数据
  const sessionMetadata = await this.session.getMetadata();
  
  // 4. 获取工具
  const tools = [...this.tools.values()];
  const activeTools = this.activeToolNames
    .map(name => this.tools.get(name))
    .filter((tool): tool is TTool => tool !== undefined);
  
  // 5. 解析系统提示（支持函数形式）
  let systemPrompt = "You are a helpful assistant.";
  if (typeof this.systemPrompt === "string") {
    systemPrompt = this.systemPrompt;
  } else if (this.systemPrompt) {
    systemPrompt = await this.systemPrompt({
      env: this.env,
      session: this.session,
      model: this.model,
      thinkingLevel: this.thinkingLevel,
      activeTools,
      resources,
    });
  }
  
  return {
    messages: context.messages,
    resources,
    streamOptions: cloneStreamOptions(this.streamOptions),
    sessionId: sessionMetadata.id,
    systemPrompt,
    model: this.model,
    thinkingLevel: this.thinkingLevel,
    tools,
    activeTools,
  };
}
```

---

## 5️⃣ 会话写入管理

### 5.1 Pending Writes 队列

```typescript
// 运行时，所有会话变更都进入队列
private pendingSessionWrites: PendingSessionWrite[] = [];

// 写入类型
type PendingSessionWrite = 
  | { type: "message", message: AgentMessage }
  | { type: "model_change", provider, modelId }
  | { type: "thinking_level_change", thinkingLevel }
  | { type: "custom", customType, data }
  | { type: "custom_message", customType, content, display, details }
  | { type: "label", targetId, label }
  | { type: "session_info", name }
  | { type: "leaf", targetId };
```

### 5.2 批量 Flush

```typescript
private async flushPendingSessionWrites(): Promise<void> {
  while (this.pendingSessionWrites.length > 0) {
    const write = this.pendingSessionWrites[0]!;
    
    if (write.type === "message") {
      await this.session.appendMessage(write.message);
    } else if (write.type === "model_change") {
      await this.session.appendModelChange(write.provider, write.modelId);
    } else if (write.type === "thinking_level_change") {
      await this.session.appendThinkingLevelChange(write.thinkingLevel);
    }
    // ... 其他类型
    
    this.pendingSessionWrites.shift();
  }
}
```

### 5.3 事件驱动的 Flush

```typescript
private async handleAgentEvent(event: AgentEvent, signal?: AbortSignal): Promise<void> {
  if (event.type === "message_end") {
    // 运行时：先入队
    if (this.phase !== "idle") {
      this.pendingSessionWrites.push({ type: "message", message: event.message });
    } else {
      // 空闲时：直接写入
      await this.session.appendMessage(event.message);
    }
    await this.emitAny(event, signal);
    return;
  }
  
  if (event.type === "turn_end") {
    // Turn 结束时触发 flush
    await this.emitAny(event, signal);
    const hadPendingMutations = this.pendingSessionWrites.length > 0;
    await this.flushPendingSessionWrites();
    await this.emitOwn({ type: "save_point", hadPendingMutations });
    return;
  }
}
```

---

## 6️⃣ 钩子系统

### 6.1 钩子类型定义

```typescript
type AgentHarnessOwnEvent =
  | { type: "before_agent_start"; prompt, images, systemPrompt, resources }
  | { type: "context"; messages }
  | { type: "before_provider_request"; model, sessionId, streamOptions }
  | { type: "before_provider_payload"; model, payload }
  | { type: "after_provider_response"; status, headers }
  | { type: "tool_call"; toolCallId, toolName, input }
  | { type: "tool_result"; toolCallId, toolName, input, content, details, isError }
  | { type: "session_before_compact"; preparation, branchEntries, customInstructions }
  | { type: "session_compact"; compactionEntry }
  | { type: "session_before_tree"; preparation }
  | { type: "session_tree"; newLeafId, oldLeafId, summaryEntry }
  | { type: "model_select"; model, previousModel, source }
  | { type: "thinking_level_select"; level, previousLevel }
  | { type: "resources_update"; resources, previousResources }
  | { type: "queue_update"; steer, followUp, nextTurn }
  | { type: "save_point"; hadPendingMutations }
  | { type: "abort"; clearedSteer, clearedFollowUp }
  | { type: "settled"; nextTurnCount };
```

### 6.2 钩子注册

```typescript
// 注册泛型订阅（监听所有事件）
subscribe(listener: (event, signal) => Promise<void> | void): () => void {
  const handlers = this.handlers.get("*");
  handlers.add(listener);
  return () => handlers.delete(listener);
}

// 注册特定类型钩子
on<TType extends keyof AgentHarnessEventResultMap>(
  type: TType,
  handler: (event) => AgentHarnessEventResultMap[TType]
): () => void {
  const handlers = this.handlers.get(type);
  handlers.add(handler);
  return () => handlers.delete(handler);
}
```

### 6.3 钩子发射

```typescript
private async emitHook<TType extends keyof AgentHarnessEventResultMap>(
  event: Extract<AgentHarnessOwnEvent, { type: TType }>
): Promise<AgentHarnessEventResultMap[TType] | undefined> {
  const handlers = this.getHandlers(event.type);
  if (!handlers || handlers.size === 0) return undefined;
  
  let lastResult: AgentHarnessEventResultMap[TType] | undefined;
  for (const handler of handlers) {
    try {
      const result = await handler(event);
      if (result !== undefined) {
        lastResult = result;  // 保留最后一个结果
      }
    } catch (error) {
      throw normalizeHookError(error);
    }
  }
  return lastResult;
}
```

### 6.4 关键钩子用途

| 钩子 | 时机 | 常见用途 |
|------|------|---------|
| `before_agent_start` | Agent 开始前 | 修改提示词、注入上下文 |
| `context` | 上下文转换前 | 动态上下文管理 |
| `before_provider_request` | LLM 请求前 | 添加请求头、修改超时 |
| `before_provider_payload` | Payload 发送前 | 日志、脱敏 |
| `after_provider_response` | LLM 响应后 | 响应日志 |
| `tool_call` | 工具执行前 | 拦截、验证 |
| `tool_result` | 工具结果后 | 修改结果、记录 |
| `session_before_compact` | 压缩前 | 取消、提供摘要 |
| `session_compact` | 压缩后 | 通知 |
| `session_before_tree` | 树导航前 | 取消、提供摘要 |
| `session_tree` | 树导航后 | 通知 |

---

## 7️⃣ 三大核心功能

### 7.1 Prompt / Skill / Template 入口

```typescript
// 1. 直接提示
async prompt(text: string, options?: { images }): Promise<AssistantMessage> {
  const turnState = await this.createTurnState();
  return await this.executeTurn(turnState, text, options);
}

// 2. 技能调用
async skill(name: string, additionalInstructions?: string): Promise<AssistantMessage> {
  const turnState = await this.createTurnState();
  const skill = turnState.resources.skills?.find(s => s.name === name);
  if (!skill) throw new AgentHarnessError("invalid_argument", `Unknown skill: ${name}`);
  
  // 格式化技能调用
  return await this.executeTurn(
    turnState, 
    formatSkillInvocation(skill, additionalInstructions)
  );
}

// 3. 模板调用
async promptFromTemplate(
  name: string, 
  args: string[] = []
): Promise<AssistantMessage> {
  const turnState = await this.createTurnState();
  const template = turnState.resources.promptTemplates?.find(t => t.name === name);
  if (!template) throw new AgentHarnessError("invalid_argument", `Unknown template: ${name}`);
  
  return await this.executeTurn(
    turnState,
    formatPromptTemplateInvocation(template, args)
  );
}
```

### 7.2 上下文压缩 (Compaction)

```typescript
async compact(customInstructions?: string): Promise<{
  summary: string;
  firstKeptEntryId: string;
  tokensBefore: number;
  details?: unknown;
}> {
  if (this.phase !== "idle") 
    throw new AgentHarnessError("busy", "compact() requires idle harness");
  
  this.phase = "compaction";
  try {
    // 1. 获取分支条目
    const branchEntries = await this.session.getBranch();
    
    // 2. 准备压缩
    const preparationResult = prepareCompaction(branchEntries, DEFAULT_COMPACTION_SETTINGS);
    if (!preparationResult.ok) throw preparationResult.error;
    
    // 3. 触发钩子（可取消或提供摘要）
    const hookResult = await this.emitHook({
      type: "session_before_compact",
      preparation,
      branchEntries,
      customInstructions,
    });
    
    if (hookResult?.cancel) throw new AgentHarnessError("compaction", "Cancelled");
    
    // 4. 执行压缩
    const provided = hookResult?.compaction;  // 钩子可能已提供
    const compactResult = provided
      ? { ok: true, value: provided }
      : await compact(preparation, model, apiKey, ...);
    
    // 5. 写入会话
    const entryId = await this.session.appendCompaction(
      result.summary,
      result.firstKeptEntryId,
      result.tokensBefore,
      result.details,
      provided !== undefined,
    );
    
    // 6. 触发钩子
    await this.emitOwn({ type: "session_compact", compactionEntry: entry });
    
    return result;
  } finally {
    this.phase = "idle";
  }
}
```

### 7.3 分支导航 (navigateTree)

```typescript
async navigateTree(
  targetId: string,
  options?: {
    summarize?: boolean;      // 是否生成摘要
    customInstructions?: string;
    replaceInstructions?: boolean;
    label?: string;
  }
): Promise<NavigateTreeResult> {
  this.phase = "branch_summary";
  try {
    const oldLeafId = await this.session.getLeafId();
    
    // 1. 收集分支条目
    const { entries, commonAncestorId } = await collectEntriesForBranchSummary(
      this.session, 
      oldLeafId, 
      targetId
    );
    
    // 2. 触发钩子（可取消或提供摘要）
    const hookResult = await this.emitHook({
      type: "session_before_tree",
      preparation: { targetId, oldLeafId, commonAncestorId, entriesToSummarize: entries, ... }
    });
    
    if (hookResult?.cancel) return { cancelled: true };
    
    // 3. 生成分支摘要
    let summaryText: string | undefined = hookResult?.summary?.summary;
    if (!summaryText && options?.summarize) {
      const branchSummary = await generateBranchSummary(entries, { model, apiKey, ... });
      summaryText = branchSummary.value.summary;
    }
    
    // 4. 移动到目标节点
    const newLeafId = targetEntry.type === "message" && targetEntry.message.role === "user"
      ? targetEntry.parentId  // 用户消息：跳到父节点
      : targetId;             // 其他：直接跳转
    
    const summaryId = await this.session.moveTo(
      newLeafId,
      summaryText ? { summary: summaryText, details: summaryDetails } : undefined
    );
    
    // 5. 返回结果
    return {
      cancelled: false,
      editorText,      // 目标用户消息内容
      summaryEntry,    // 摘要条目
    };
  } finally {
    this.phase = "idle";
  }
}
```

---

## 8️⃣ 消息注入机制

### 8.1 三种队列

```typescript
// 1. Steer Queue - 运行时注入（打断当前执行）
private steerQueue: UserMessage[] = [];
async steer(text: string, options?: { images }): Promise<void> {
  if (this.phase === "idle") 
    throw new AgentHarnessError("invalid_state", "Cannot steer while idle");
  this.steerQueue.push(createUserMessage(text, options?.images));
  await this.emitQueueUpdate();
}

// 2. Follow-up Queue - 完成后注入（Agent 停止后）
private followUpQueue: UserMessage[] = [];
async followUp(text: string, options?: { images }): Promise<void> {
  if (this.phase === "idle")
    throw new AgentHarnessError("invalid_state", "Cannot follow up while idle");
  this.followUpQueue.push(createUserMessage(text, options?.images));
  await this.emitQueueUpdate();
}

// 3. Next Turn Queue - 下一轮注入（消息入队但不立即处理）
private nextTurnQueue: AgentMessage[] = [];
async nextTurn(text: string, options?: { images }): Promise<void> {
  this.nextTurnQueue.push(createUserMessage(text, options?.images));
  await this.emitQueueUpdate();
}
```

### 8.2 队列模式

```typescript
type QueueMode = "all" | "one-at-a-time";

// 队列消费
private async drainQueuedMessages(
  queue: AgentMessage[], 
  mode: QueueMode
): Promise<AgentMessage[]> {
  const messages = mode === "all" 
    ? queue.splice(0)           // 消费所有
    : queue.splice(0, 1);       // 消费一个
  
  if (messages.length === 0) return messages;
  
  try {
    await this.emitQueueUpdate();
    return messages;
  } catch (error) {
    queue.unshift(...messages);  // 失败回滚
    throw error;
  }
}

// 在 AgentLoopConfig 中
getSteeringMessages: async () => 
  this.drainQueuedMessages(this.steerQueue, this.steeringQueueMode),

getFollowUpMessages: async () => 
  this.drainQueuedMessages(this.followUpQueue, this.followUpQueueMode),
```

---

## 9️⃣ Stream 函数创建

```typescript
private createStreamFn(
  getTurnState: () => AgentHarnessTurnState
): StreamFn {
  return async (model, context, streamOptions) => {
    const turnState = getTurnState();
    
    // 1. 获取认证
    const auth = await this.getApiKeyAndHeaders?.(model);
    
    // 2. 合并请求头
    const snapshotOptions: AgentHarnessStreamOptions = {
      ...turnState.streamOptions,
      headers: mergeHeaders(turnState.streamOptions.headers, auth?.headers),
    };
    
    // 3. 触发 before_provider_request 钩子
    const requestOptions = await this.emitBeforeProviderRequest(
      model, 
      turnState.sessionId, 
      snapshotOptions
    );
    
    // 4. 调用 LLM
    return streamSimple(model, context, {
      cacheRetention: requestOptions.cacheRetention,
      headers: requestOptions.headers,
      maxRetries: requestOptions.maxRetries,
      maxRetryDelayMs: requestOptions.maxRetryDelayMs,
      metadata: requestOptions.metadata,
      
      // Payload 钩子
      onPayload: async (payload) => 
        await this.emitBeforeProviderPayload(model, payload),
      
      // Response 钩子
      onResponse: async (response) => {
        await this.emitOwn({
          type: "after_provider_response",
          status: response.status,
          headers: response.headers as Record<string, string>
        });
      },
      
      reasoning: streamOptions?.reasoning,
      signal: streamOptions?.signal,
      sessionId: turnState.sessionId,
      timeoutMs: requestOptions.timeoutMs,
      transport: requestOptions.transport,
      apiKey: auth?.apiKey,
    });
  };
}
```

---

## 🔟 LoopConfig 工厂

```typescript
private createLoopConfig(
  getTurnState: () => AgentHarnessTurnState,
  setTurnState: (turnState) => void,
): AgentLoopConfig {
  return {
    model: turnState.model,
    reasoning: turnState.thinkingLevel === "off" 
      ? undefined 
      : turnState.thinkingLevel,
    
    convertToLlm,  // 消息转换
    
    // 上下文转换钩子
    transformContext: async (messages) => {
      const result = await this.emitHook({ type: "context", messages: [...messages] });
      return result?.messages ?? messages;
    },
    
    // 工具调用前钩子
    beforeToolCall: async ({ toolCall, args }) => {
      const result = await this.emitHook({
        type: "tool_call",
        toolCallId: toolCall.id,
        toolName: toolCall.name,
        input: args as Record<string, unknown>,
      });
      return result ? { block: result.block, reason: result.reason } : undefined;
    },
    
    // 工具调用后钩子
    afterToolCall: async ({ toolCall, args, result, isError }) => {
      const patch = await this.emitHook({
        type: "tool_result",
        toolCallId: toolCall.id,
        toolName: toolCall.name,
        input: args,
        content: result.content,
        details: result.details,
        isError,
      });
      return patch ? {
        content: patch.content,
        details: patch.details,
        isError: patch.isError,
        terminate: patch.terminate,
      } : undefined;
    },
    
    // 下一轮准备
    prepareNextTurn: async () => {
      await this.flushPendingSessionWrites();
      const nextTurnState = await this.createTurnState();
      setTurnState(nextTurnState);
      return {
        context: this.createContext(nextTurnState),
        model: nextTurnState.model,
        thinkingLevel: nextTurnState.thinkingLevel,
      };
    },
    
    // 消息队列
    getSteeringMessages: async () => 
      this.drainQueuedMessages(this.steerQueue, this.steeringQueueMode),
    
    getFollowUpMessages: async () => 
      this.drainQueuedMessages(this.followUpQueue, this.followUpQueueMode),
  };
}
```

---

## 1️⃣1️⃣ 错误处理

### 11.1 错误归一化

```typescript
function normalizeHarnessError(
  error: unknown, 
  fallbackCode: AgentHarnessErrorCode
): AgentHarnessError {
  if (error instanceof AgentHarnessError) return error;
  
  const cause = toError(error);
  
  // 包装底层错误
  if (cause instanceof SessionError) 
    return new AgentHarnessError("session", cause.message, cause);
  if (cause instanceof CompactionError)
    return new AgentHarnessError("compaction", cause.message, cause);
  if (cause instanceof BranchSummaryError)
    return new AgentHarnessError("branch_summary", cause.message, cause);
  
  return new AgentHarnessError(fallbackCode, cause.message, cause);
}
```

### 11.2 失败消息创建

```typescript
function createFailureMessage(
  model: Model<any>, 
  error: unknown, 
  aborted: boolean
): AssistantMessage {
  return {
    role: "assistant",
    content: [{ type: "text", text: "" }],
    api: model.api,
    provider: model.provider,
    model: model.id,
    stopReason: aborted ? "aborted" : "error",
    errorMessage: error instanceof Error ? error.message : String(error),
    timestamp: Date.now(),
    usage: { /* zeroed */ },
  };
}
```

### 11.3 Run 失败处理

```typescript
private async emitRunFailure(
  model: Model<any>,
  error: unknown,
  aborted: boolean,
  signal: AbortSignal,
): Promise<AgentMessage[]> {
  const failureMessage = createFailureMessage(model, error, aborted);
  
  await this.handleAgentEvent({ type: "message_start", message: failureMessage }, signal);
  await this.handleAgentEvent({ type: "message_end", message: failureMessage }, signal);
  await this.handleAgentEvent({ type: "turn_end", message: failureMessage, toolResults: [] }, signal);
  await this.handleAgentEvent({ type: "agent_end", messages: [failureMessage] }, signal);
  
  return [failureMessage];
}
```

---

## 1️⃣2️⃣ Abort 机制

```typescript
async abort(): Promise<AbortResult> {
  // 1. 记录清除的队列
  const clearedSteer = [...this.steerQueue];
  const clearedFollowUp = [...this.followUpQueue];
  
  // 2. 清空队列
  this.steerQueue = [];
  this.followUpQueue = [];
  
  // 3. 中止运行
  this.runAbortController?.abort();
  
  const errors: Error[] = [];
  
  // 4. 发射队列更新
  try {
    await this.emitQueueUpdate();
  } catch (error) {
    errors.push(toError(error));
  }
  
  // 5. 等待空闲
  try {
    await this.waitForIdle();
  } catch (error) {
    errors.push(toError(error));
  }
  
  // 6. 发射 abort 事件
  try {
    await this.emitOwn({ type: "abort", clearedSteer, clearedFollowUp });
  } catch (error) {
    errors.push(toError(error));
  }
  
  // 7. 如果有错误，抛出聚合错误
  if (errors.length > 0) {
    const cause = errors.length === 1 
      ? errors[0] 
      : new AggregateError(errors, "Abort completed with errors");
    throw normalizeHarnessError(cause, "hook");
  }
  
  return { clearedSteer, clearedFollowUp };
}
```

---

## 1️⃣3️⃣ 关键设计模式

### 13.1 Turn State 闭包

```typescript
// 每次 turn 创建新的状态快照
private async executeTurn(...) {
  let activeTurnState = turnState;  // 可变引用
  
  const getTurnState = () => activeTurnState;
  const setTurnState = (next) => { activeTurnState = next; };
  
  // 传递给可能改变状态的回调
  const loopConfig = this.createLoopConfig(getTurnState, setTurnState);
  const streamFn = this.createStreamFn(getTurnState);
  
  // 当 prepareNextTurn 被调用时，状态被更新
  // 下一次 getTurnState() 返回新状态
}
```

### 13.2 Option 快照

```typescript
// streamOptions 在 turn 开始时被快照
private async createTurnState() {
  return {
    // ...
    streamOptions: cloneStreamOptions(this.streamOptions),
    // ...
  };
}

// 钩子可以修改快照，但不影响主配置
private createStreamFn(getTurnState) {
  return async (model, context, options) => {
    const turnState = getTurnState();  // 获取快照
    // turnState.streamOptions 是独立的副本
  };
}
```

### 13.3 双重发射模式

```typescript
private async emitOwn(event): Promise<void> {
  // 发射给 "*" 通配符订阅者
  for (const listener of this.getHandlers("*") ?? []) {
    await listener(event);
  }
}

private async emitAny(event): Promise<void> {
  // 发射给 Agent 事件订阅者
  for (const listener of this.getHandlers("*") ?? []) {
    await listener(event);  // Agent 事件也被 harness 订阅
  }
}

// handleAgentEvent 使用
private async handleAgentEvent(event, signal?) {
  if (event.type === "message_end") {
    await this.session.appendMessage(event.message);
    await this.emitAny(event, signal);  // 事件流向订阅者
    return;
  }
  // ...
  await this.emitAny(event, signal);
}
```

---

## 1️⃣4️⃣ 使用示例

### 14.1 基础使用

```typescript
const harness = new AgentHarness({
  env: nodeEnv,
  session: jsonlSession,
  model: anthropicModel,
  thinkingLevel: "medium",
  tools: [readTool, writeTool, bashTool],
  systemPrompt: "You are a helpful coding assistant.",
});

const response = await harness.prompt("Write a hello world program");
console.log(response.content);
```

### 14.2 带技能系统

```typescript
const harness = new AgentHarness({
  // ...
  resources: {
    skills: [
      { name: "create-slide", description: "...", content: "...", filePath: "..." },
      { name: "translate", description: "...", content: "...", filePath: "..." },
    ],
    promptTemplates: [
      { name: "greeting", description: "...", content: "Hello $1!" },
    ],
  },
});

// 调用技能
const response = await harness.skill("translate", "Translate to Spanish: Hello");
```

### 14.3 钩子使用

```typescript
// 记录所有工具调用
harness.on("tool_call", (event) => {
  console.log(`Calling ${event.toolName}:`, event.input);
});

// 拦截工具结果
harness.on("tool_result", (event) => {
  if (event.toolName === "read" && event.isError) {
    return { content: [{ type: "text", text: "File not found" }], isError: true };
  }
});

// 修改请求
harness.on("before_provider_request", (event) => {
  return {
    streamOptions: {
      headers: { "X-Custom-Header": "value" }
    }
  };
});
```

### 14.4 上下文压缩

```typescript
// 检查是否需要压缩
const context = await session.buildContext();
const tokens = estimateContextTokens(context.messages);
if (shouldCompact(tokens, model.contextWindow, DEFAULT_COMPACTION_SETTINGS)) {
  const result = await harness.compact("Focus on recent changes");
  console.log(`Compressed ${result.tokensBefore} tokens to summary`);
}
```

---

## 总结

**AgentHarness** 是 pi-agent-core 的高级抽象层，提供了：

| 能力 | 说明 |
|------|------|
| **会话持久化** | JSONL 存储，支持分支和历史 |
| **技能系统** | SKILL.md 加载和调用 |
| **上下文压缩** | 自动摘要，避免 token 溢出 |
| **分支导航** | 树形会话，支持摘要回溯 |
| **钩子系统** | 25+ 钩子点，可扩展性强 |
| **队列机制** | Steer/Follow-up/NextTurn |
| **Phase 保护** | 防止并发操作冲突 |

**核心设计**：
- Turn State 闭包保证状态隔离
- Pending Writes 队列保证原子性
- 快照机制防止配置漂移
- 错误归一化统一异常处理
