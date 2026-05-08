# The New Code — Sean Grove, OpenAI

> 来源：[YouTube](https://www.youtube.com/watch?v=8rABwKRsec4) | AI Engineer Conference
> 讲者：Sean Grove（OpenAI Alignment Research）

---

## 核心观点

### 1. 代码的真正价值：只占 10-20%

软件工程师的工作流程：
1. 与用户沟通 → 理解挑战
2. 提炼故事 → 构思解决方案
3. 制定计划 → 与同事分享
4. **翻译成代码** → 测试验证

> 代码只是最终产物，80-90% 的价值在于**结构化沟通**

### 2. Specification（规格说明）才是新代码

**问题**：Vibe Coding 的致命缺陷
- 我们保留生成的代码，**删除 prompts**
- 这就像：销毁源代码，只保留二进制文件

**正确做法**：
- Prompt 才是源代码——包含意图和价值观
- 生成的代码只是下游产物
- **Specification 是真正的有价值 artifact**

### 3. 为什么 Specification 比代码更强大

| 维度 | 代码 | Specification |
|------|------|---------------|
| 可读性 | 仅工程师能读 | 所有人能读（自然语言）|
| 可版本控制 | ✅ | ✅ |
| 可测试 | ✅ | ✅ |
| 可组合 | ✅ | ✅ |
| 表达意图 | ❌（丢失）| ✅（完整保留）|
| 多目标输出 | 单一 | TypeScript、Rust、文档、教程、博客、播客 |

### 4. Specification 的解剖：以 OpenAI Model Spec 为例

Model Spec 是 OpenAI 的**价值声明文档**：

```
markdown 特点：
├── 人类可读
├── 版本可控
├── 变更日志
└── 非技术人员也能贡献（产品、法律、安全、政策）
```

**双重用途**：
1. **人类对齐**：让公司内外所有人对 AI 行为达成共识
2. **模型对齐**：通过 Deliberative Alignment 技术，直接将规格融入模型权重

### 5. Sycophancy 案例：Spec 如何建立信任

**Sycophancy 问题**：
- 用户夸 AI → AI 盲目恭维用户
- 这对短期友好，对长期有害

**Model Spec 的价值**：
- 早已在文档中声明"不要做马屁精"
- 问题出现时 → 有文档可查 → 快速回滚修复
- Spec 成为**信任锚点**

### 6. 法律制定者 = 程序员？

美国宪法 = **国家级 Model Spec**

| 维度 | 编程 | 法律法规 |
|------|------|----------|
| 源代码 | 代码 | 宪法文本 |
| 编译器 | - | 司法审查 |
| 测试用例 | 单元测试 | 判例 |
| 训练循环 | CI/CD | 执法机制 |

### 7. 所有人都是 Specification 作者

| 职业 | 对齐对象 | 工具 |
|------|----------|------|
| 程序员 | 硅基（代码）| 编程语言 |
| 产品经理 | 团队 | 产品规格 |
| 法律制定者 | 公民 | 法规 |
| **你（AI时代）** | **AI 模型** | **Prompts = Proto-Spec** |

### 8. 新 IDE 愿景：Integrated Thought Clarifier

未来的 IDE 应该：
- 写作规格说明时
- 自动识别歧义
- 要求澄清
- 让人类和模型都能更好理解意图

---

## 行动呼吁

> 每次开发 AI 功能时：
> 1. **从规格说明开始**——你期望发生什么？成功标准是什么？
> 2. **辩论是否清晰表达**——是否已经清楚写下来并沟通？
> 3. **让规格可执行**——喂给模型并测试
> 4. **验证是否对齐**

---

## 金句摘录

> "The person who communicates most effectively is the most valuable programmer."
> *——Sean Grove*

> "Code is a lossy projection from the specification."
> *——Sean Grove*

> "Whenever you're doing a prompt, it's a proto-specification. You are in the business of aligning AI models."
> *——Sean Grove*

> "Software engineering has never been about code. Coding is an incredible skill, but it is not the end goal."
> *——Sean Grove*

---

## 关键启示

1. **AI 时代最稀缺技能**：写出能完整捕获意图和价值观的规格说明
2. **Specification > Code**：代码只是规格的"编译产物"，规格才是源代码
3. **每个 prompt 都是 proto-specification**——你已经在对齐 AI 了
4. **结构化沟通是真正的瓶颈**——而不是写代码
5. **开发者工具革命将至**：下一代 IDE 将是"思考澄清器"
