# State of the Claw — Peter Steinberger

> 来源：[YouTube](https://www.youtube.com/watch?v=zgNvts_2TUE) | AI Engineer Conference
> 讲者：Peter Steinberger（OpenClaw 创始人）

---

## 核心观点总结

### 1. OpenClaw：史上增长最快的开源项目

- **5个月**达成 GitHub 星标最大规模
- 约 **30,000 次提交**，接近 **30,000 PRs**，即将突破 **2,000 贡献者**
- 增长曲线呈"脱衣舞杆"式（stripper pole growth）——前所未有的陡峭增长

### 2. 开源维护的挑战

- **基金会模式**：OpenClaw Foundation 正在建立，类似"瑞士"——保持独立于任何单一公司
- **Bus Factor 问题**：逐步改善，但尚未达标
- **企业支持**：Nvidia（全职安全加固）、Microsoft（Windows/Teams）、Red Hat（Docker/安全）、Tencent/ByteDance（用户量最大）等纷纷加入

### 3. 安全威胁：真实但被夸大

**数据对比**：
- Linux Kernel：每天 8-9 个安全公告
- OpenClaw：每天约 **16 个**，是 curl 的两倍
- 总计 **1,142 个**安全咨询，99 个 critical，已关闭 60%

**真实攻击面**：
- 远程代码执行（RCE）、代码注入、路径遍历
- 国家级黑客（朝鲜 APT 组织 "Ghost Claw"）
- 供应链攻击（XZS 依赖漏洞）

**被夸大的威胁**：
- 媒体报道刻意忽略官方安全建议
- 研究报告"Agents of Chaos"详细描述架构但不提安全配置
- CVSS 10 分的漏洞在 99% 场景下实际无害（仅影响"云端代码配置错误"的用户）

### 4. AI 生成安全报告的困境

- 大部分安全咨询由 AI 生成，仍需人工审查
- 收到报告时：太礼貌/太道歉 → 疑似 AI 生成
- 很少收到"报告+修复"的优质提交
- 大量志愿者维护已接近崩溃边缘

### 5. OpenAI 与 OpenClaw 的关系

- **OpenAI 没有"买下"OpenClaw**——Peter 加入是为了推进 AI 民主化
- OpenAI 理解：更多人玩 AI → 更多企业需求 AI 工具 → 商业机会
- OpenClaw **必须保持独立**，不能成为任何一家公司的附庸
- OpenAI 提供资源，但 Peter 刻意不从 OpenAI 引入过多人员，避免"被接管"形象

### 6. 本地模型的重要性

- **数据主权**：欧洲用户不希望自己的数据被大公司掌控
- **绕过壁垒**：企业连接 Gmail 需要半年审批；OpenClaw 可以直接让 Agent 点击网页获取数据
- 支持任何模型（OpenAI、Claude、本地模型等）

### 7. 开发工作流：从 PR 到 Prompt 的转变

- **并发开发**：高峰期同时运行 **10 个会话**，现在约 **5-6 个窗口**
- 传统 PR → AI 时代的 **Prompt Request**
- Fast Mode 提速后不再需要分屏并发
- **不认可"Dark Factory"（完全不审查代码）**——软件构建不是直线过程，需要迭代、探索、发现

### 8. Taste：AI 时代的护城河

> "Low level taste: 闻起来不像 AI"——Peter Steinberger

- 识别 AI 写的 UI/文字就像识别 AI 生成图像一样容易（紫色渐变、蓝色边框等）
- **高阶 Taste**：细节打磨——OpenClaw 的彩蛋（roast 用户的消息）不是高层 prompt 能生成的
- Shopify CTO（前 Bing 团队）：Chatbot 需要"灵魂"
- **有趣的悖论**：OpenClaw 不可能从美国大公司诞生——法务会在发布前就 kill 掉它

### 9. AI Agent 的人格化

- WhatsApp 对话风格需要调整：更简短、更像真人
- Claude Code 本身已有一定人格，但需要适配不同平台
- 目标：Agent 像"疯子+一点科幻"的感觉

### 10. 未来愿景

**Ubiquitous Agents（无处不在的 Agent）**：
- 理想：Star Trek 的 "Computer"——在家任何房间都能对话
- iPad 遍布各房间 → Agent 知道你在哪 → 投影到最近屏幕
- 最终：私人 Agent + 工作 Agent 可以互相通信，但公司和你都感到安全

**Smart Home 应用**：
- Andre Karpathy、Marvin von Haden 用 OpenClaw 管理智能家居
- 讽刺现实：正因为大多数 IoT 设备安全性极差，OpenClaw 才能接管它们

**Dreaming（记忆整合）**：
- 人类睡眠时大脑整理记忆 → Agent 也需要类似机制
- Entropic 源代码泄露显示他们也在做类似研究
- OpenClaw 的模块化设计：每个人可以安装自己的 memory、wiki、dreaming 模块

### 11. Prompt Injection 的解决方向

- 前端模型已能较好识别注入攻击
- **小参数模型风险更高**：20B 参数模型没有防御训练，警告用户
- Simon Willison 的"双 LLM 方案"（一个专门检测 prompt injection）
- **信任体系**：基于声誉的访问权限——积累更多信任的实体获得更多特权

### 12. AI 时代人类应培养的技能

| 技能 | 原因 |
|------|------|
| **Taste** | 区分 AI 生成的垃圾和真正有价值的产品 |
| **System Design** | 定义边界——防止被技术债务困住 |
| **说"不"的能力** | 想法太多，每个"疯狂点子"只是一个 prompt；但组合起来就是问题 |

---

## 金句摘录

> "Software at this pace—you kind of need an army."
> *——Peter Steinberger*

> "The first idea you have about your project is very unlikely to be the final project."
> *——Peter Steinberger on why Dark Factory doesn't work*

> "Taste is like a smell. Even if you can't pinpoint it, you know."
> *——Peter Steinberger*

> "OpenClaw would never have come out of an American company. It would have been killed in legal long before release."
> *——Peter Steinberger*

---

## 关键启示

1. **开源 AI Agent 面临前所未有的安全问题**——但很多是被媒体夸大的
2. **维护开源项目需要商业支持**——纯志愿者模式不可持续
3. **独立性和开放性是 OpenClaw 的核心价值**——不能让任何单一公司控制
4. **Taste 是人类在 AI 时代最后的护城河**
5. **未来的 Agent 应该是无处不在的、模块化的、有记忆的**
