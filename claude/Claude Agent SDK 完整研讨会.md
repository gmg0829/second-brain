

## 研讨会简介

本文档是 Anthropic 工程师 Thariq Shihipar 主讲的 Claude Agent SDK 完整研讨会的中文翻译版本。这是一场深入探讨如何使用 Claude Agent SDK（前身为 Claude Code SDK）构建 AI 驱动开发工作流的技术研讨会。

研讨会从高层理论——将"代理"定义为管理自身上下文和轨迹的自主系统——逐步深入到实时编码演示。Shihipar 从零开始构建代理"Harness"，实现核心的**代理循环**（上下文 → 思考 → 行动 → 观察），集成用于通用计算机使用的 **Bash 工具**，并通过文件系统演示**上下文工程**以在长任务中维护状态。

## 研讨会议程

**时间轴概览：**

- **00:00** - 介绍：议程和"代理"定义
    
- **05:15** - "Harness"概念：工具、提示和技能
    
- **10:10** - 实时编码设置：初始化代理类和环境
    
- **15:45** - 实现"思考"步骤：让模型在行动前进行推理
    
- **25:20** - 代理循环：连接 `act`、`observe` 和 `loop`
    
- **33:10** - 工具执行：处理 XML 解析和工具输入
    
- **42:00** - "Bash"工具：为代理提供命令行访问权限
    
- **49:30** - 安全与权限："只读"与"读写"文件访问
    
- **58:15** - 上下文工程：使用 `ls` 和 `cat` 构建动态上下文
    
- **01:05:00** - 监视器：实时查看代理的思考过程
    
- **01:12:45** - 处理"卡住"状态：反馈循环和错误纠正
    
- **01:21:20** - 多轮复杂任务：构建"研究代理"演示
    
- **01:35:10** - 重构模式："钩子"和确定性覆盖
    
- **01:48:39** - 问答：可重复性、辅助脚本和非确定性
    
- **01:50:31** - 问答：处理大型代码库（5000万+行）的策略
    
- **01:52:00** - 结束语和未来 SDK 路线图
    

## AI 能力的演进

### 从功能到工作流再到代理

Shihipar 提出，我们正在从以下阶段演进：

**1. LLM 功能（单次交互）**

- 分类任务
    
- 单次响应
    
- 示例：将内容分类到预定义类别中
    

**2. 工作流（结构化多步骤）**

- 结构化的多步骤链
    
- RAG（检索增强生成）
    
- 示例：给定代码库，通过索引返回下一个补全或需要编辑的文件
    

**3. 代理（自主系统）**

- **构建自己的上下文**
    
- **决定自己的轨迹**
    
- **高度自主工作**
    
- 不遵循刚性管道，而是灵活调整策略
    

Shihipar 的核心观点：_"代理构建自己的上下文，决定自己的轨迹，并且工作非常自主。"_ 这与传统工作流的刚性结构形成鲜明对比。

## 什么是 Claude Agent SDK？

### 为什么选择 Claude Agent SDK？

Claude Agent SDK 直接构建在 **Claude Code** 之上，原因是：

> "我们发现在构建代理时，我们不断地重复构建相同的部分。"

Anthropic 团队意识到，无论是工程师、财务人员、数据科学家还是营销人员，都开始使用 Claude Code 完成非编码任务。这促使他们将这些经验教训打包成 SDK。

### Harness 架构

一个健壮的代理不仅仅需要模型，还需要一个完整的 "Harness"（工具集），包含：

**核心组件：**

1. **模型（Models）** - 底层 LLM
    
2. **工具（Tools）** - 执行特定操作的接口
    
3. **提示（Prompts）** - 核心代理提示和指导
    
4. **文件系统（File System）** - 用于上下文工程的关键组件
    
5. **技能（Skills）** - 可重用的专业知识包
    
6. **子代理（Sub-agents）** - 处理特定子任务
    
7. **记忆（Memory）** - 跨会话的状态管理
    

**扩展功能：**

- 网络搜索
    
- 研究能力
    
- 上下文压缩
    
- 钩子（Hooks）
    
- 记忆系统
    

## Anthropic 构建代理的方式

### 核心理念

Claude Agent SDK 是**高度主观的**，基于 Anthropic 在部署 Claude Code 时学到的经验教训。主要原则包括：

**1. Unix 原语优先**

- Bash 和文件系统作为核心工具
    
- 利用现有的 Unix 工具链
    

**2. 代理构建自己的上下文**

- 不依赖预处理的上下文
    
- 主动探索和收集信息
    

**3. 代码生成用于非编码任务**

- 使用代码生成来生成文档
    
- 查询网络
    
- 进行数据分析
    
- 执行非结构化操作
    

**4. 每个代理都有容器**

- 本地托管或容器化
    
- 需要文件系统和 Bash 访问权限
    

### 为什么基于 Claude Code？

一旦 Claude Code 发布，Anthropic 观察到一个意外现象：

> "工程师开始使用它，然后财务人员开始使用它，数据科学人员开始使用它，营销人员也开始使用它。"

团队意识到人们使用 Claude Code 完成非编码任务，这种模式成为构建通用代理的基础。**秘诀在于 Bash 工具。**

## Bash 是你所需的一切

### 为什么 Bash 如此强大？

**核心洞察：** Bash 是第一个"代码模式"或"程序化工具调用"。

**传统方法的问题：**

假设你在设计代理工具集，可能会这样做：

- 搜索工具
    
- Lint 工具
    
- 执行工具
    
- ...每个新用例都需要一个新工具
    

**Bash 方法的优势：**

Claude 只需使用现有工具：

- 使用 `grep` 搜索
    
- 使用包管理器（如 `npm`）
    
- 运行 `npm run test.ts`
    
- 执行 `npm run lint`
    
- 如果没有 linter，可以建议："我可以为你安装 eslint 吗？"
    

**Bash 的能力：**

1. **存储结果** - 将工具调用结果保存到文件
    
2. **动态生成脚本** - 创建可重用的脚本
    
3. **组合功能** - 使用管道（pipe）、`tail`、`grep` 等
    
4. **利用现有软件** - `ffmpeg`、`LibreOffice`、`git` 等
    
5. **通用操作** - 不需要为每个用例创建专用工具
    

### 实际示例：电子邮件代理

**场景：** "我这周在共享出行上花了多少钱？"

**方法 A：没有 Bash**

用户查询 → 搜索工具 → 返回 100 封邮件  
→ 模型需要直接处理所有邮件  
→ 类似于给某人一堆纸质邮件让他们阅读  
→ 需要极高的精确度和召回率

**方法 B：使用 Bash**

# 搜索相关邮件  
gmail_search.sh "Uber OR Lyft" > emails.txt  
​  
# 提取价格  
cat emails.txt | grep -E '\$[0-9]+\.[0-9]{2}' > prices.txt  
​  
# 添加行号以便验证  
cat -n prices.txt > prices_numbered.txt  
​  
# 计算总和  
awk '{sum+=$2} END {print sum}' prices.txt  
​  
# 验证每个价格对应的邮件  
for price in $(cat prices.txt); do  
  grep -B5 -A5 "$price" emails.txt  
done

**关键优势：**

- 可以保存中间结果
    
- 可以验证工作
    
- 可以重新检查每个价格
    
- 使用管道进行动态信息处理
    
- 避免模型处理大量原始数据
    

### 更多示例

**视频会议代理：**

# 找到演讲者说"季度业绩"的所有时刻  
ffmpeg -i earnings_call.mp4 -vf "select='...',setpts=N/FRAME_RATE/TB" output_%03d.mp4  
​  
# 使用 jq 分析转录的 JSON  
cat transcript.json | jq '.[] | select(.text | contains("quarterly results"))'

**邮件 API 组合：**

# 获取本周给我发邮件的人  
inbox_api --this-week | jq '.[].from' | sort -u > senders.txt  
​  
# 查找联系信息  
while read sender; do  
  contact_api --lookup "$sender"  
done < senders.txt > contacts.json

## 工作流 vs 代理

### 何时使用哪种？

**代理适用场景：**

- 需要自然语言交互
    
- 灵活的操作
    
- 与业务数据对话
    
- 获取洞察或生成仪表板
    
- 代码生成
    

**工作流适用场景：**

- 严格定义的输入和输出
    
- 可重复的业务流程
    
- 示例：GitHub Actions - 接收 PR，返回代码审查
    

**重要提示：** 两者都可以使用 Agent SDK！最近发布的**结构化输出**功能使工作流构建更加容易。

### Anthropic 的内部实践

团队构建了许多基于 Agent SDK 的 GitHub 和 Slack 自动化：

**示例：问题分类机器人**

- 看起来像工作流（分类传入的问题）
    
- 但需要代理能力：
    
    - 克隆代码库
        
    - 启动 Docker 容器
        
    - 测试问题
        
    - 中间有许多自由流动的步骤
        
- 最后提供结构化输出
    

## 代理循环的三个部分

### 核心循环：上下文 → 行动 → 验证

Shihipar 强调：_"构建成功的代理循环有点像艺术或直觉。"_

**1. 收集上下文（Gather Context）**

**目的：** 主动找到相关信息

**Claude Code 示例：**

- 使用 `grep` 查找所需文件
    
- 搜索特定函数或变量
    
- 浏览目录结构
    

**电子邮件代理示例：**

- 查找相关邮件
    
- 提取发件人信息
    
- 获取时间范围数据
    

**关键洞察：** 许多人跳过或低估这一步。代理需要**主动构建自己的上下文**，而不是被动接收预处理的数据。

**2. 采取行动（Take Action）**

**目的：** 执行实际工作

**工具选择：**

- 代码生成
    
- Bash 脚本
    
- API 调用
    
- 文件操作
    

**问题：** 代理是否有正确的工具？它们是否足够灵活？

**3. 验证工作（Verify Work）**

**目的：** 确认结果正确

**验证方法：**

**编码任务：**

- Linting（语法检查）
    
- 编译检查
    
- 运行测试
    
- 执行代码查看结果
    

**研究任务：**

- 引用来源
    
- 交叉验证事实
    
- 检查一致性
    

**关键标准：** 如果你能验证工作，该任务就非常适合代理处理。如果无法验证，代理的通用性会受限。

### 循环的力量

代理循环允许**自我纠正**——这是刚性工作流所缺少的能力：

收集上下文 → 采取行动 → 验证  
     ↑                      ↓  
     └──────── 反馈 ────────┘

如果验证失败，代理可以：

- 收集更多上下文
    
- 尝试不同方法
    
- 调整策略
    
- 请求帮助
    

## 工具 vs Bash vs 代码生成

### 三种方法的比较

**工具（Tools）**

**优点：**

- 极度结构化
    
- 非常可靠
    
- 快速输出
    
- 最少错误和重试
    

**缺点：**

- 高上下文使用量（50-100 个工具会混淆模型）
    
- 缺乏可发现性
    
- 不可组合
    
- 每个新用例需要新工具
    

**适用场景：**

- 需要完全控制的原子操作
    
- 示例：写文件、发送邮件、不可逆操作
    

**Bash**

**优点：**

- 高度可组合
    
- 静态脚本
    
- 低上下文使用量
    
- 利用现有软件生态系统
    

**缺点：**

- 需要发现时间（`--help`、手册页）
    
- 可能较低的首次成功率
    

**适用场景：**

- 可组合操作（搜索、lint、内存管理）
    
- 需要灵活性的任务
    

**代码生成（Code Generation）**

**优点：**

- 高度可组合
    
- 动态脚本
    
- 极大灵活性
    

**缺点：**

- 执行时间最长
    
- 需要 linting 和可能的编译
    
- API 设计变得关键
    

**适用场景：**

- 高度动态逻辑
    
- API 组合
    
- 数据分析
    
- 深度研究
    
- 重用模式
    

### 实践指南

**何时使用工具：**

# 写文件 - 用户需要查看和批准  
write_file(path="output.txt", content=data)  
​  
# 发送邮件 - 不可逆操作  
send_email(to="user@example.com", subject="...", body="...")

**何时使用 Bash：**

# 搜索文件夹  
find . -name "*.py" -type f | grep "test"  
​  
# Lint 代码  
npm run lint  
​  
# 检查错误  
./run_tests.sh 2>&1 | grep "ERROR"

**何时使用代码生成：**

# 数据分析  
import pandas as pd  
df = pd.read_csv('data.csv')  
result = df.groupby('category').sum()  
​  
# API 组合  
response1 = api1.fetch()  
processed = transform(response1.data)  
api2.send(processed)

## 上下文工程与文件系统

### 文件系统作为上下文管理工具

**核心理念：** 不仅仅是"提示工程"，而是**"上下文工程"**。

**文件系统的三大用途：**

**1. 记忆存储**

# 代理可以写入文件来"记住"事情  
echo "用户偏好蓝色主题" > memory/preferences.txt  
​  
# 创建自己的文档  
cat > CLAUDE.md << EOF  
## 项目上下文  
这是一个电商网站  
使用 React 和 Node.js  
数据库是 PostgreSQL  
EOF

**2. 验证真实情况**

# 创建文件后验证  
if [ -f "output.txt" ]; then  
  echo "文件成功创建"  
  cat output.txt  # 检查内容  
fi

**3. 渐进式上下文披露**

不是一次性加载所有上下文，而是：

# 首先列出目录结构  
ls -R  
​  
# 然后只读取需要的文件  
cat src/main.py  
​  
# 深入特定函数  
grep -A 20 "def process_data" src/main.py

### [CLAUDE.md](http://CLAUDE.md) 文件

**最佳实践：** 在项目根目录创建 `CLAUDE.md`：

# Claude 项目指南  
​  
## 项目概述  
[项目的高级描述]  
​  
## 架构  
[系统设计概览]  
​  
## 重要脚本  
- `scripts/deploy.sh` - 部署到生产环境  
- `scripts/test.sh` - 运行完整测试套件  
​  
## 开发工作流  
1. 创建功能分支  
2. 运行测试  
3. 提交 PR  
​  
## 注意事项  
- 永远不要直接提交到 main  
- 所有 API 密钥都在 `.env` 中

这为代理提供了稳定的参考点，帮助它理解项目结构和约定。

## 安全与权限

### 瑞士奶酪防御（Swiss Cheese Defense）

Shihipar 介绍了多层安全策略：

**层级 1：模型对齐**

- Claude 模型经过大量对齐训练
    
- 最近发布了关于奖励黑客攻击的论文
    
- 模型行为本质上是对齐的
    

**层级 2：Harness 权限**

**提示和权限：**

# 定义文件系统权限  
permissions = {  
    "read": ["./src", "./data"],  
    "write": ["./output"],  
    "forbidden": ["./secrets", "./credentials"]  
}

**Bash 解析器：**

- SDK 包含 Bash 命令解析器
    
- 可靠地识别 Bash 工具的实际操作
    
- **不要自己构建** - 这是复杂且关键的安全功能
    

**层级 3：沙箱环境**

**致命三要素（Lethal Trifecta）：**

1. 在环境中执行代码的能力
    
2. 更改文件系统的能力
    
3. 外泄数据的能力
    

**防御措施：**

- 沙箱化网络请求
    
- 限制文件系统操作在特定目录内
    
- 使用沙箱容器（Cloudflare Workers、Modal、E2B、Daytona）
    
- 不在个人计算机或包含生产密钥的机器上托管
    

### 读写权限

# 只读模式 - 安全探索  
agent = Agent(file_permissions="readonly")  
​  
# 读写模式 - 小心使用  
agent = Agent(file_permissions="readwrite")

**建议：** 从只读开始，根据需要逐步授予写权限。

## 技能系统（Skills）

### 什么是技能？

**定义：** 技能是可重用的专业知识包，存储为文件夹结构。

**核心概念：**

- 技能只是**文件夹**
    
- 代理可以 `cd` 进入并读取
    
- 渐进式上下文披露的例子
    
- 包含详细的执行指导
    

### 技能示例

**前端设计技能：**

skills/  
  frontend-design/  
    SKILL.md          # 主要指导  
    examples/         # 设计示例  
    components/       # 可重用组件  
    best-practices.md # 设计原则

**DOCX 生成技能：**

skills/  
  docx-generation/  
    SKILL.md          # 如何生成 DOCX  
    templates/        # 文档模板  
    scripts/          # 辅助脚本  
    examples/         # 示例文档

### 何时使用技能

**适用场景：**

- 可重复的指令
    
- 需要大量专业知识
    
- 复杂的多步骤过程
    
- 超出分布的任务
    

**工作流程：**

# 用户请求创建 DOCX 文件  
→ 代理 cd skills/docx-generation  
→ 读取 SKILL.md  
→ 按照指导编写脚本  
→ 执行并验证

### Skills vs [CLAUDE.md](http://CLAUDE.md) vs API

[**CLAUDE.md**](http://CLAUDE.md)**：**

- 项目特定上下文
    
- 始终可用
    
- 高级概述
    

**Skills：**

- 可重用专业知识
    
- 按需加载
    
- 详细的操作指导
    

**API：**

- 程序化访问
    
- 实时数据
    
- 外部服务
    

**建议：** 阅读代理转录，看它自然想要什么。如果它寻找 `API.py` 文件，就提供那个。如果它寻找技能文件夹，就使用技能。

## 子代理（Sub-agents）

### 为什么使用子代理？

**主要优势：**

**1. 上下文管理**

- 主代理将工作委托给专门的子代理
    
- 避免上下文污染
    
- 保持主代理专注于高级协调
    

**2. 并行处理**

# 并行处理大型电子表格  
sub_agents = []  
for sheet in workbook.sheets:  
    agent = SubAgent(task=f"汇总 {sheet.name}")  
    sub_agents.append(agent)  
​  
results = await asyncio.gather(*[a.run() for a in sub_agents])

**3. 专业化**

- 每个子代理可以有特定的工具集
    
- 针对特定任务优化
    
- 更清晰的责任分离
    

### 实际示例

**研究代理：**

主代理（协调）  
  ├─ 搜索子代理（查找来源）  
  ├─ 分析子代理（提取见解）  
  └─ 写作子代理（生成报告）

**数据处理管道：**

主代理  
  ├─ 子代理 1：提取数据  
  ├─ 子代理 2：转换数据  
  ├─ 子代理 3：验证数据  
  └─ 子代理 4：加载到数据库

### 在 Agent SDK 中使用

from anthropic import Agent, SubAgent  
​  
main_agent = Agent(  
    name="coordinator",  
    tools=[...],  
    file_system=fs  
)  
​  
# 创建子代理  
research_agent = SubAgent(  
    name="researcher",  
    parent=main_agent,  
    tools=[web_search_tool],  
    instructions="深入研究给定主题"  
)  
​  
# 主代理委托任务  
result = main_agent.delegate_to(  
    research_agent,  
    task="研究 Claude Agent SDK 的最佳实践"  
)

## 处理大型代码库

### 5000 万行以上代码的挑战

**常见问题：**

- 标准 `grep` 失败
    
- 上下文窗口填充无效
    
- 语义搜索脆弱
    

### 语义搜索的局限性

**问题：** 虽然语义搜索是常见解决方案，但它**很脆弱**。

**原因：**

> "模型没有针对特定语义索引进行训练。"

**结果：**

- 可能错过相关代码
    
- 返回不相关的匹配
    
- 缺乏代码结构理解
    

### 推荐策略

**1. 优秀的 [CLAUDE.md](http://CLAUDE.md) 文件**

# 大型代码库指南  
​  
## 架构概述  
系统分为 5 个主要服务...  
​  
## 导航  
- 认证逻辑：`services/auth/`  
- API 路由：`api/v1/routes/`  
- 数据库模型：`models/`  
​  
## 关键入口点  
- 主应用：`src/main.ts`  
- 配置：`config/app.config.ts`  
​  
## 常见任务  
- 添加新端点：参见 `docs/api-development.md`  
- 数据库迁移：使用 `scripts/migrate.sh`

**2. 在特定子目录中启动代理**

# 不要从根目录启动  
cd /codebase  # ❌ 太广泛  
​  
# 在相关子目录中启动  
cd /codebase/services/payments  # ✅ 范围限定

**3. 渐进式探索**

# 步骤 1：高级结构  
ls -la  
​  
# 步骤 2：找到相关目录  
find . -type d -name "*payment*"  
​  
# 步骤 3：检查该区域  
cd src/payments  
ls -la  
​  
# 步骤 4：读取关键文件  
cat README.md  
cat main.py

**4. 使用抽象层**

# 创建辅助脚本来抽象大型代码库  
# scripts/find_function.py  
def find_function(name: str, directory: str):  
    """在大型代码库中查找函数定义"""  
    # 使用 AST 解析和索引  
    # 返回准确位置

### 不要尝试索引所有内容

**关键教训：** 不要试图一次索引 5000 万行。

**替代方法：**

- 限制范围
    
- 使用好的文档
    
- 让代理主动探索
    
- 依赖渐进式上下文披露
    

## 确定性与钩子（Hooks）

### 处理非确定性行为

**问题：** 代理有时会"幻觉"或跳过步骤。

**示例场景：**

任务：获取 Pokemon 的统计数据  
代理行为：猜测统计数据而不是检查脚本  
期望行为：编写脚本获取实际数据

### 钩子解决方案

**钩子是什么？**

钩子可以拦截代理响应并注入反馈，在不重新训练模型的情况下强制执行规则。

**实现示例：**

def verify_script_usage(response):  
    """确保代理使用脚本而不是猜测"""  
    if "pokemon_stats" in response.task:  
        if "guess" in response.text or "estimate" in response.text:  
            # 注入反馈  
            return Feedback(  
                message="请确保编写脚本。请确保读取数据。",  
                retry=True  
            )  
    return response  
​  
agent.add_hook("post_think", verify_script_usage)

**常见钩子模式：**

**1. 读取后写入**

def enforce_read_before_write(action):  
    if action.type == "write_file":  
        if not agent.has_read(action.file_path):  
            return Feedback("在写入前请先读取文件")  
    return action

**2. 验证必需工具**

def require_tool_usage(action):  
    if action.task_requires("database"):  
        if "query_db" not in action.tools_used:  
            return Feedback("此任务需要数据库查询")  
    return action

**3. 强制验证步骤**

def enforce_verification(action):  
    if action.type == "code_generation":  
        if not action.includes_test:  
            return Feedback("请包含测试以验证您的代码")  
    return action

### 何时使用钩子

**适用场景：**

- 强制最佳实践
    
- 防止常见错误
    
- 添加保护措施
    
- 实施业务规则
    

**不适用场景：**

- 不要过度使用
    
- 不要限制代理创造力
    
- 不要创建过于复杂的规则系统
    

## 实践最佳实践

### 读取转录

**最重要的元学习：**

> "只需一遍又一遍地阅读转录。每次看到代理运行时，只需阅读它并弄清楚，嘿，它在做什么？为什么这样做？我能以某种方式帮助它吗？"

**如何阅读转录：**

1. **观察模式** - 代理总是卡在哪里？
    
2. **识别瓶颈** - 上下文收集、工具使用还是验证？
    
3. **注意重复** - 代理是否一遍又一遍地做同样的事情？
    
4. **检查思维** - 代理的推理过程是什么？
    
5. **迭代改进** - 根据观察结果调整提示、工具或结构
    

### 实验文化

**快速迭代：**

AI 可以让我们编写代码快 10 倍  
→ 我们也应该扔掉代码快 10 倍

**建议：**

- 每 6 个月重新思考代理代码
    
- 不要害怕重写
    
- 功能发展迅速
    
- 今天有效的方法才是最重要的
    

### 启动建议

**对于初学者：**

- 从 Replit 或 Lovable 开始进行 UI 实验
    
- 获得 AI 辅助开发的感觉
    

**对于有经验的开发者：**

- 直接使用 Windsurf、Cursor 或 Claude Code
    
- 利用 Bash 和文件系统的全部功能
    

**通用建议：**

- 从只读权限开始
    
- 逐步添加功能
    
- 监控代理行为
    
- 迭代改进
    

## 总结与关键要点

### 核心原则

1. **Bash 是最强大的代理工具** - 提供灵活性、可组合性和通用性
    
2. **文件系统用于上下文工程** - 不仅仅是提示，还有记忆、验证和渐进式披露
    
3. **代理循环至关重要** - 收集上下文 → 采取行动 → 验证工作
    
4. **安全是多层的** - 模型对齐 + Harness 权限 + 沙箱
    
5. **验证能力决定代理适用性** - 如果可以验证工作，就很适合代理处理
    

### 技术选择

**何时使用：**

- **工具：** 原子、受控、不可逆的操作
    
- **Bash：** 可组合操作、探索、记忆
    
- **代码生成：** 动态逻辑、API 组合、复杂任务
    

### 高级技术

- **子代理：** 上下文管理和并行处理
    
- **技能：** 可重用的专业知识包
    
- **钩子：** 不重新训练就强制执行行为
    
- [**CLAUDE.md**](http://CLAUDE.md)**：** 项目理解的稳定参考点
    

### 未来展望

Claude Agent SDK 和代理功能正在快速发展。关键是：

- **保持实验精神**
    
- **读取和学习转录**
    
- **快速迭代**
    
- **不要害怕重写**
    
- **专注于今天有效的方法**
    

### 资源链接

- **官方文档：** [https://platform.claude.com/docs/en/agent-sdk/overview](https://platform.claude.com/docs/en/agent-sdk/overview)
    
- **Thariq Shihipar Twitter：** [https://x.com/trq212](https://x.com/trq212)
    
- **Claude Code：** 内置于 Claude 应用中
    
- **插件市场：** 在 Claude Code 中使用 `/plugins`
    

---

这个研讨会为构建强大、灵活和安全的 AI 代理提供了全面的基础。通过遵循这些原则和最佳实践，开发者可以充分利用 Claude Agent SDK 的能力，创建能够处理复杂、现实世界任务的自主系统。