# No Vibes Allowed: Solving Hard Problems in Complex Codebases

> 来源：[YouTube](https://www.youtube.com/watch?v=rmvDxxNubIg) | AI Engineer Conference
> 讲者：Dex Horthy（HumanLayer）

---

## 核心观点

### 1. AI 编码工具的现状：Greenfield vs Brownfield

**Stanford 研究数据**：
- AI 辅助开发确实在**加速输出**
- 但同时产生了**大量返工和代码 churn**
- **Greenfield 场景**（新项目、小型任务）→ 效果很好
- **Brownfield 场景**（10年+老代码库、复杂问题）→ 效果很差

> "你在不断产出，但你产出的大部分只是在重写上周生成的 slop"

### 2. Context Engineering：如何用好当前模型

**核心洞察**：
> LLMs 不是 pure functions，但它们是 **stateless** 的
> 唯一提升输出的方式 = 往 context window 里喂更好的 tokens

**Context Window 优先级（从高到低）**：
1. **错误信息** → 最糟糕
2. **缺失信息**
3. **过多噪音**

### 3. Dumb Zone 概念：40% 临界点

```
Context Window (168K tokens)
├── Smart Zone (0-40%)     ← 最佳效果
└── Dumb Zone (40%+)       ← 收益递减
```

- 超过 40% 利用率 → 开始出现收益递减
- MCP 工具太多 → 永远在 Dumb Zone，永远拿不到好结果

### 4. Intentional Compaction（刻意压缩）

**是什么**：定期将 context window 压缩成 markdown 文件，供新 agent 直接开始工作

**压缩内容**：
- 关键文件 + 行号
- 代码流程
- 编辑历史
- 测试/构建输出
- ❌ 不要把 MCP 的 UUID dump 进去

### 5. Sub-agents 的正确用法

> Sub-agents 不是用来给人起名字搞角色扮演的
> **Sub-agents 是用来控制 context 的**

**正确用法**：
```
Parent Agent
└── Sub-agent: "去找到这个功能在哪个文件"
    └── 返回：简洁的消息 + 文件路径
Parent Agent
└── 只读那一个文件 → 开工
```

### 6. Research Plan Implement 工作流

保持待在 Smart Zone 的工作流：

| 阶段 | 目标 | 输出物 |
|------|------|--------|
| **Research** | 理解系统、找对文件、保持客观 | 研究文档 |
| **Plan** | 精确步骤 + 文件名 + 行号片段 + 测试计划 | Plan 文件（含代码片段）|
| **Implement** | 执行计划 | 代码 |

**实战结果**：
- 7 小时 → 35,000 行代码（BAML 项目）
- CTO 评价：相当于 1-2 周工作量

### 7. 不要外包思考

> "AI cannot replace thinking. It can only amplify the thinking you have done or the lack of thinking you have done."
> *——Dex Horthy*

**Spec-Driven Dev 已死**（Semantic Diffusion）：
- 每个人对 "Spec" 的理解都不一样
- 有人说是更好的 prompt
- 有人说是 PRD
- 有人说是用 markdown 文件替代代码
- 有人说是文档
- → 术语扩散到毫无意义

### 8. Onboarding Agents：不了解代码就会 hallucinate

**Memento 问题**：
- Agent 没有记忆，需要通过代码里的 tattoos（注释/上下文）了解自己
- 不做 onboarding → Agent 一定会编造

**解决方案：Progressive Disclosure**

```
Root Context (每个 repo 根目录)
├── 模块级上下文 (subcontext)
│   └── 更细粒度的上下文
└── 按需拉取 → 只在 Smart Zone 工作
```

### 9. Internal Docs 的谎言问题

**真相**：代码、函数名、注释、文档 → **文档是最多谎言的地方**

**正确做法：On-Demand Compressed Context**
- 不维护静态文档（会过时）
- 让 research prompt/sub-agent 按需构建
- **压缩的是 truth**，不是 fiction

### 10. Mental Alignment：代码审查的真正目的

> "Code review 最重要的不是检查对错，而是让团队里的每个人对代码库如何变化、为什么变化保持一致"

**Plan 应该包含**：
- 完整步骤
- 你运行的 prompts
- 你运行的测试
- 让 reviewer 能**跟着你走一遍**

### 11. Plan 最佳实践

**可靠性和可读性的权衡**：
- Plan 越长 → 可靠性越高
- Plan 越长 → 可读性越低

**找到你和团队的 Sweet Spot**

**关键原则**：
- 一个糟糕的 plan 可能是 100 行糟糕的代码
- 一个糟糕的 research 理解 → 整个方向都是错的
- ❌ 不要外包思考 → 必须读 Plan

### 12. AI 时代的技术领导力挑战

**正在发生的分裂**：
```
Senior Engineers
└── 不愿用 AI（对他们帮助不大）
└── 不断清理 Junior/Mid 用 AI 生成的 slop
└── 越来越讨厌 AI

Junior/Mid Engineers
└── 大量使用 AI（填补技能缺口）
└── 产出大量 slop
```

> 这不是 AI 的错，也不是 Junior 的错
> **文化变革必须从顶层开始**

---

## 核心结论

| 问题 | 解决方案 |
|------|----------|
| AI 在 Brownfield 代码库表现差 | Context Engineering + Compaction |
| Context Window 溢出 | 保持 < 40%，定期压缩 |
| 产出 slop | Research → Plan → Implement 工作流 |
| 文档过时/有谎言 | On-Demand Compressed Context |
| 团队对齐困难 | Plan 包含完整 journey + mental alignment |

---

## 金句摘录

> "The only way to get better performance out of an LLM is to put better tokens in."
> *——Dex Horthy*

> "AI cannot replace thinking. It can only amplify the thinking you have done or the lack of thinking you have done."
> *——Dex Horthy*

> "A bad line of code is a bad line of code. A bad part of a plan could be a hundred bad lines of code."
> *——Dex Horthy*

> "Semantic diffusion: there will never be a year of agents because of semantic diffusion."
> *——Dex Horthy*

---

## 行动建议

1. **选一个工具，刻意练习** → 不要同时在多个工具间横跳
2. **建立 Research Plan Implement 工作流** → 保持待在 Smart Zone
3. **把 Plan 当成团队对齐的工具** → 包含完整的 journey
4. **定期 compaction** → 不要让 context window 溢出
5. **文化变革从顶层开始** → Senior 需要学会用 AI，而不是排斥它
