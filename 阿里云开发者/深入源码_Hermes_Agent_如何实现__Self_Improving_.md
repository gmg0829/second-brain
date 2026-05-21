     深入源码：Hermes Agent 如何实现 "Self-Improving"
=======================================

原创 三剑 阿里云开发者 2026-04-23 08:30 浙江

> 原文地址: [https://mp.weixin.qq.com/s/Qi68ptxQRyiA932JU49SYQ](https://mp.weixin.qq.com/s/Qi68ptxQRyiA932JU49SYQ)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1y2STOcej6MFiaC1kgiazAOBIb5BJON5wwN9END1BIIS09iccLF4Uicu29ic4cFfSMCz0uebuDViaDTJMJY5OssiaSxic5yxqRW1LKcCPc/640?wx_fmt=png&from=appmsg)

背景

OpenRouter 排行榜上正在发生一场换代：Hermes Agent 增速 +204%，Top Coding Agents 排第一，Top Productivity 排第二。上线不到半年，GitHub 从 0 到 106k+ Star。开发者在用数据说话——选的不是"另一个 OpenClaw"，是一种完全不同的东西。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1w9Rvib2W1YicPZBfoyF0ycLwKcPE4VgeCkibCY9unqyHJjwXye4IFXM4GPMhqsicgjlA9dm9eQhsicafbd873iaQ8zibtH8oqLQxPYHY/640?wx_fmt=png&from=appmsg)

区别在哪？OpenClaw 的 Skill 是手写的 Markdown 文件——你写多少它会多少，你不写它就不会。Hermes 做了一件 OpenClaw 架构上做不了的事：Agent 干完活之后，会自动把踩坑经验提炼成可复用的 Skill，下次遇到同类问题直接调用。用得越久，能力越强。这不是功能差异，是设计哲学的分野——一个靠人喂，一个自己长。

这篇文章拆开 Hermes 的源码，看看这个 Self-Improving 闭环到底怎么跑的。文末也会聊聊 RDSHermes 怎么把这套能力搬给不写代码的人用。

仓库地址：  

github.com/NousResearch/hermes-agent  

* * *

总览：三个子系统，一个闭环

大多数 Agent 每次会话结束后就"失忆"了。Hermes 在内部搭了一套学习闭环，由三个子系统撑起来：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1w4naJxD0mJusFqDEPobbtNeO9hqd95ggKydcTd4Mm7uhM0uJGvQ87UsTPmhC98P2kbribaVHAFq313w9QvnPX49vdnnvg8bBXk/640?wx_fmt=png&from=appmsg)

打个比方：Memory 是助理随身带的小本子，记着"老板喜欢喝美式"这些事实；Skill 是助理积累的操作手册——"部署 K8s 第 2 步一定要先推镜像"；Nudge Engine 是定时响的闹钟，提醒助理回头想想有没有什么值得记的。

* * *

Memory：越用越懂你

**两个文件，就是 Agent 对你的全部认知**

Memory 系统设计得很克制——两个纯文本文件，用 `§` 分隔条目：

    ~/.hermes/memories/

字符上限故意设得很紧：MEMORY 限 2200 chars，USER 限 1375 chars。容量有限就迫使 Agent 挑重要的记，不重要的自然被挤掉。对比 OpenClaw——它的 MEMORY.md 是纯追加模式，用几个月就膨胀成几万行的怪兽文件，找几个月前的一句话只能笨拙地通读全文。Hermes 的做法反过来：容量有限就倒逼 Agent 做信息压缩，过时的自然被挤掉，留下的都是高密度事实。

具体实现上，MemoryStore 维护两组平行状态——实时可写的条目列表，和会话开始时冻结的快照：

    # tools/memory_tool.py:116-122

但"设了上限"只是第一步，关键是超限之后怎么处理。Hermes 不会静默丢弃旧条目，也不会自动压缩——它选择让 `add` 直接失败，然后把当前所有条目返回给模型：

    # tools/memory_tool.py:248-259

错误信息里一句 "Replace or remove existing entries first" 就把模型引导到了 `replace` 和 `remove` 操作上。同时返回 `current_entries`，让模型能看到现有的所有条目，自己决定哪些过时了该删、哪些可以合并压缩。模型不是被动地执行淘汰规则，而是主动做信息整理——这本身就是一次"自我反思"。

**冻结快照机制**

每次会话启动时，Memory 加载后立刻捕获一份快照，之后系统提示词里用的都是这份快照：

    # tools/memory_tool.py:124-140

快照注入系统提示词后，Agent 还没看到用户消息就已经知道你的环境和偏好了。为什么"冻结"而不是实时更新？因为系统提示词会话内不变就能共享前缀缓存（Prefix Cache），省掉重复计费。新写入的内容只改磁盘，下一个会话才刷新进来。

**提示词引导：什么该记、什么不该记**

Agent 怎么知道什么时候该往 Memory 里写东西？靠 Prompt 引导。系统提示词中的 MEMORY\_GUIDANCE：

    # agent/prompt_builder.py:144-162

注意这里的区别：Memory 要求写成声明式事实（"User prefers concise responses"），而不是命令式指令（"Always respond concisely"）。前者是偏好，可以被当前上下文覆盖；后者是死命令，会限制 Agent 的灵活性。

Tool Schema 里还有一句关键的边界规则："If you've discovered a new way to do something, save it as a skill." —— Memory 不存操作步骤，操作步骤归 Skill 管。这一句话把两个系统的分工画清了。

* * *

Skill：把做过的事变成会做的事

**Skill 长什么样**

Memory 是"我知道什么"，Skill 是"我会做什么"。每个 Skill 是一个目录，核心是 SKILL.md 文件：

    ~/.hermes/skills/

一个典型的 SKILL.md：

    ---

Pitfalls 这一节不是预先写好的，而是 Agent 踩坑后追加的——这就是 Skill 层面的"self-improving"。

**什么时候创建 Skill**

Agent 不需要用户说"帮我创建一个 Skill"。驱动力来自 `skill_manage` 工具的 schema：

    # tools/skill_manager_tool.py:681-701

创建的门槛设得比较清楚：工具调用超过 5 次才值得创建（简单任务不记）、踩过坑再修复的经验才有价值、用户纠正过的做法要铭记。

OpenClaw 也有 Skill 系统，也是 SKILL.md + YAML frontmatter，但 Skill 要么是你手写的，要么是从社区装的。手写的成本高，懒得维护；社区装的不是针对你的环境。关键问题是：Agent 本身不会从工作中学到任何东西——干了一百次部署，第一百零一次犯的错跟第一次一模一样。HN 上有个帖子叫"Data Is the Final Moat"——当模型智能被商品化、Agent 框架被开源，真正的护城河是 Agent 在工作中积累的领域知识。OpenClaw 的 Skill 是手写的配置文件，用了一年还是那份手写的配置文件；Hermes 的 Skill 是越用越厚的经验资产——每一次踩坑都在加固护城河。这不是 OpenClaw 团队不想做，而是它的架构没有为"Agent 自主学习"预留通路——没有创建触发、没有 patch 机制、没有 review agent。要补这一课，是要重写核心架构。

Hermes 这边，Agent 踩了坑、修了 bug、用了 12 次工具调用才搞定一个部署——这些经验被自动提炼成 Skill，下次再遇到同类任务就是 6 次调用零错误。

系统提示词里还有一句"Skills that aren't maintained become liabilities"——通过提示词给 Agent 灌输责任感，防止它只管创建不管维护。

**Skill 的自我修补**

当 Agent 按照已有 Skill 执行，但中途发现步骤有遗漏或者踩了新坑时，它会在完成任务后回头修补 Skill。不是全量重写，而是做精确的局部 patch：

    # tools/skill_manager_tool.py:397-485

这里用了 fuzzy\_find\_and\_replace 做模糊匹配——Agent 给出的 old\_string 可能跟原文有格式差异，模糊匹配能容忍这些差异。每次修改后还要跑一遍 `_security_scan_skill()`，不通过就自动回滚。Agent 在踩完坑的当场就把 Pitfalls 补上了，下次同事遇到同样的场景，直接绕过去。

**Skill 的渐进式加载**

Skill 多了以后不能全塞进系统提示词——这也是 OpenClaw 的一个痛点：它采用"重型背包"模式，每次会话把 SOUL.md、IDENTITY.md 和各种设定一股脑塞进上下文，设定越多背包越沉，Token 浪费严重，模型注意力也被稀释。Hermes 更像一座"动态图书馆"，默认上下文极其轻量，只放一个轻量索引——每个 Skill 的名字和一句话描述：

    Available skills:

Agent 判断某个 Skill 跟当前任务相关时，才通过 `skill_view` 加载完整内容。"先看目录再翻全文"，按需加载。

开源版的 Skill 需要 Agent 从零积累。RDSHermes 的 Skill Hub 则提供了另一条路：预装智能巡检、慢 SQL 诊断、索引优化等数据库专业技能——Agent 上线第一天就具备领域能力，不用等它踩完所有坑。换句话说，Skill Hub 解决冷启动，自进化解决越用越强——两条腿走路。

* * *

Nudge Engine：谁来提醒 Agent "该学习了"

Memory 和 Skill 都是存储系统，写入需要有人触发。Nudge Engine 就是这个触发器——运行时维护两个计数器，定时提醒 Agent 该停下来想想了。

**两个计数器，两种粒度**

    # run_agent.py:1328-1331 — Memory 计数器

粒度不同是有道理的：Memory 的信息来自用户输入，按回合计；Skill 的经验来自工具使用过程，按迭代计。计数器到阈值就触发审查，Agent 主动调用了 `memory` 或 `skill_manage` 则重置——已经在做了就不用催。

**后台 fork Agent：不打扰用户的静默审查**

Nudge 触发后怎么处理？它不会在主对话中插一条"让我想想有没有什么该记的"——那样太打扰用户了。而是在后台 fork 一个独立的 Agent 实例，拿着主对话的快照去做审查：

    # run_agent.py:2665-2711

几个细节：输出重定向到 `/dev/null`，用户完全无感知；最多 8 次工具调用，不会无限消耗 API；review agent 自身的 nudge 被禁用，避免无限递归；和主 agent 共享同一份 Memory，写入直接生效。"干活"和"反思"拆成两个实例，互不干扰。

Review Agent 靠两套审查提示词决定做什么：Memory Review 关注用户偏好和个人信息，Skill Review 关注非平凡的解题过程。每个 prompt 都以 "If nothing is worth saving, just say 'Nothing to save.' and stop." 收尾——防止 review agent 每次都往里塞东西来"交差"。审查在响应发送给用户之后才触发，用户收到回复后该干嘛干嘛，Agent 在后台默默复盘。

* * *

完整案例：从"不会"到"精通"的三次会话

用一个 K8s 部署场景串一下三个子系统的协同。

**第 1 次会话：冷启动**

    用户: 帮我把这个 Flask 应用部署到 K8s 集群

Memory 和 Skills 都是空的，Agent 靠基座知识摸索，12 次工具调用，踩了两个坑：

      iter 1:  terminal("kubectl version")             → 确认集群版本

12 次迭代触发 Skill Review，Review Agent 看到两次报错和修复过程，创建了一个 Skill：

    Review Agent 执行:

安全扫描通过后写入磁盘，用户对这一切毫不知情。

**第 2 次会话：Skill 复用 + 自我修补**

    用户: 帮我再部署一个 Django 应用到 K8s

系统提示词里多了 Skills 索引，Agent 加载 `flask-k8s-deploy` 后照着步骤做：

      iter 1:  skill_view("flask-k8s-deploy")   → 加载完整 Skill

从 12 次调用降到 9 次，已知坑被绕过，但遇到 Django 特有的新坑。Review Agent 一口气做了三件事：写入用户画像、记住 registry 地址、patch Skill 补上 ALLOWED\_HOSTS 坑。

**第 3 次会话：零错误，一次搞定**

    用户: 帮我部署一个新的 FastAPI 微服务

    Agent 已经知道你是谁、registry 在哪、集群在哪，Skill 里也包含了 ALLOWED_HOSTS 的坑——6 次调用，零错误。

三次对比：

维度

会话 1 (冷启动)

会话 2 (Skill 复用)

会话 3 (全协同)

工具调用

12 次

9 次

6 次

错误数

2

1

0

Memory

无

触发写入

系统提示词注入

Skill

触发创建

复用 + 自我修补

复用已修补版本

在开源 Hermes 中，这些经验积累在单个用户的 `~/.hermes/` 目录下。RDSHermes 把 Skill 存储从本地磁盘搬到了云端——一个 DBA 踩过的坑，团队里所有人的 Agent 都能绕过。自我进化不再是单点的，而是组织级的。

* * *

安全机制：进化也需要约束

Agent 能往自己"脑子"里写东西，也就意味着攻击面。Hermes 做了两层防护。

第一层，Memory 内容扫描：

    # tools/memory_tool.py:65-81

因为 Memory 最终会注入系统提示词，如果被诱导记住 "ignore all previous instructions"，下次会话就等于被劫持了。

第二层，Skill 安全扫描：

    # tools/skill_manager_tool.py:56-74

自创的和从 Hub 安装的 Skill 走同一套扫描，不通过就回滚。

开源 Hermes 的安全扫描解决了单机场景的问题。但在团队落地时，还有一个开源版管不到的风险：密钥安全。API Key 写在环境变量里、数据库密码明文存配置文件——一旦 Agent 有了终端权限，这些凭证就暴露在攻击面上。RDSHermes 用加密托管解决了这个问题：AK/SK 由网关代理鉴权，密钥不落盘，不暴露给 Agent 也不暴露给用户。Agent 自我进化的自由度越大，凭证隔离就越不可少。

* * *

设计取舍一览

源码中的设计取舍：

设计决策

表面效果

背后的考量

Memory 限 2200 chars

迫使 Agent 挑重要的记

低质量 Memory 注入系统提示词 = 每次 API 调用都带噪声

声明式事实 vs 操作步骤分离

Memory 存事实，Skill 存步骤

两者的更新频率、触发条件、安全风险完全不同

冻结快照模式

系统提示词会话内不变

保护前缀缓存，避免每轮 API 调用重新计费

后台 fork 审查

用户感知不到 review 过程

自省不应占用用户任务的 attention budget

Nudge 计数器可配置

默认 10

太频繁浪费 API 成本，太稀疏错过学习机会

patch 优先于全量重写

局部修复 Skill

保留已验证的稳定部分，只改需要改的

安全扫描 + 自动回滚

拒绝恶意写入

Memory/Skill 最终进入系统提示词，是一等安全边界

* * *

Skill 自动进化的下一步

"自动创建"和"自我修补"已经跑通了，接下来几个方向值得做：

生命周期管理：目前 YAML frontmatter 只有 `name`、`description`、`version`。加上 `last_used`、`use_count`、`success_rate` 就能实现自动降权、归档和过时检测。

技能组合：现在 Skill 是孤立的。如果能自动识别经常一起用的 Skill 合成工作流（如 `flask-k8s-deploy` + `nginx-reverse-proxy` → `full-stack-deploy`），就不只是"记住"，而是"思考"了。

创建透明度：Skill 创建是静默的，用户没有参与感。创建后给个简短通知，用户就能审核和纠正。

团队治理：一个人用还好，团队落地需要知道"谁让 Agent 做了什么"。RDSHermes 的做法是写操作需二次确认才执行，每一次会话可追溯、可审计——Agent 能自我进化，但每一步操作都在审计链路上。

* * *

RDSHermes：

从"开发者工具"到"团队都能用"
----------------

前面讲的 Self-Improving 是 Hermes 的核心竞争力，但说实话，开源版 Hermes 仍然是一个偏开发者的工具——你得会写 `config.yaml`，得懂怎么配 API Key 和 Gateway，出了问题要看日志排查。对于不写代码的团队成员来说，这个门槛还是太高了。

RDSHermes 解决的就是这个问题：把 Hermes 的自进化能力包装成开箱即用的服务。

对比开源 Hermes 的使用门槛：

开源 Hermes Agent

RDSHermes

开始使用

命令行安装，手写 config.yaml

控制台一键开通，零配置

对话界面

终端 CLI

内置 WebUI，打开浏览器就能对话

接入 IM

内置 Gateway，config.yaml 配凭证后命令行启动

控制台里填个 App ID 就完成

数据库连接

手动配连接串，密码明文写配置

一键接入 RDS 实例，密码自动加密

云凭证管理

AK/SK 写进环境变量或配置文件

加密托管，网关代理鉴权，密钥不落盘

技能管理

Agent 自动创建，磁盘文件

Skill Hub 预装专业技能

简单说：开源 Hermes 是给开发者的引擎，RDSHermes 是给整个团队的成品车。

它在 Hermes 的 Self-Improving 能力之上，补齐了四件事：

*   数据库安全纳管：MySQL、PostgreSQL、SQL Server、MariaDB 多引擎一键接入，密码提交瞬间加密。可以设只读模式——Agent 能查但不能改，生产环境安全有底线。
    
*   身份认证托管：AK/SK 加密托管，Agent 调用云 API 时由网关代理鉴权，密钥不暴露给 Agent 也不暴露给用户。
    
*   内置数据库专业技能：Skill Hub 预装智能巡检、慢 SQL 诊断、索引优化等技能。DBA 说一句"帮我巡检一下 prod-mysql"，Agent 连着你的库做真实分析。
    
*   全链路监控审计：写操作需确认才执行，会话可追溯，Token 消耗可监控，安全事件有告警。
    

效果是什么？市场部的同事打开 WebUI 用一句话查渠道数据，不需要装任何东西；开发者排查线上问题不用等 DBA 排期；DBA 在飞书群里 @一下就能做晨间巡检，从 40 分钟缩短到 2 分钟。不是所有人都会写 `config.yaml`，但所有人都会打字。

RDSHermes 现已上线阿里云 RDS AI 应用市场，支持免费试用。如果你已经在用 OpenClaw/RDSClaw，`hermes claw migrate` 一条命令就能导入全部配置和记忆数据，平滑切换。

* * *

总结

Hermes Agent 的 Self-Improving 就是三件事的配合：Memory 记住你是谁，Skill 记住怎么做事，Nudge Engine 保证这个循环不停转。用得越久，Agent 帮你干活就越快、踩坑就越少。

OpenClaw 在 AI Agent 普及上立下了汗马功劳。但一个需要"调教指南"的工具、一个升级就崩溃的系统、一个越用记忆文件越大越慢的架构——它正在完成自己的历史使命。

开发者正在用数据说话。不是因为 Hermes 的功能更多，而是因为 Hermes 做了一件 OpenClaw 架构上做不了的事：用得越久，越好用。v0.6.0 之前，Hermes 还有"只能跑单 Agent"的硬伤；现在 Profiles 补上了多实例、MCP Server Mode 打通了 IDE 生态、迁移工具覆盖了 sessions/cron/memory——OpenClaw 用户的切换门槛已经被系统性地拆掉了。再加上 RDSHermes 把数据库和云资源的安全访问也管起来了，Agent 能触达的边界远不止写代码。

如果你现在还在手写 Skill、手动维护 MEMORY.md、每次升级前先做好心理建设——不妨想想：你的时间应该花在给 Agent 做运维上，还是让 Agent 自己学会做事上？

欢迎点击阅读原文详细了解RDS AI 应用～

  

  

![](http://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1zsMO0HEywEjicRXGH5MTLyLhxbAz1qQ3U4jPFnrdGQbFPOXKYT6A4D6R48bZNzIAHDcCNyLTRBO4bnd0UrLrEtD2lWB6gKr6EE/0?wx_fmt=png) 阿里云开发者

 ![](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3C!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --%3E%3Cg fill='none' stroke='%23888888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/g%3E%3C/svg%3E) 阅读![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.154 6.797l-.177 2.758h4.009c1.346 0 2.359 1.385 2.155 2.763l-.026.148-1.429 6.743c-.212.993-1.02 1.713-1.977 1.783l-.152.006-13.707-.006c-.553 0-1-.448-1-1v-8.58a1 1 0 0 1 1-1h2.44l1.263-.03.417-.018.168-.015.028-.005c1.355-.315 2.39-2.406 2.58-4.276l.01-.16.022-.572.022-.276c.074-.707.3-1.54 1.08-1.883 2.054-.9 3.387 1.835 3.274 3.62zm-2.791-2.52c-.16.07-.282.294-.345.713l-.022.167-.019.224-.023.604-.014.204c-.253 2.486-1.615 4.885-3.502 5.324l-.097.018-.204.023-.181.012-.256.01v8.218l9.813.004.11-.003c.381-.028.72-.304.855-.709l.034-.125 1.422-6.708.02-.11c.099-.668-.354-1.308-.87-1.381l-.098-.007h-5.289l.26-4.033c.09-1.449-.864-2.766-1.594-2.446zM7.5 11.606l-.21.005-2.241-.001v8.181l2.45.001v-8.186z' fill='%23000'/%3E%3C/svg%3E) 赞 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath d='M0 0h24v24H0z'/%3E    %3Cpath fill='%23576B95' d='M13.707 3.288l7.171 7.103a1 1 0 0 1 .09 1.32l-.09.1-7.17 7.104a1 1 0 0 1-1.705-.71v-3.283c-2.338.188-5.752 1.57-7.527 5.9-.295.72-1.02.713-1.177-.22-1.246-7.38 2.952-12.387 8.704-13.294v-3.31a1 1 0 0 1 1.704-.71zm-.504 5.046l-1.013.16c-4.825.76-7.976 4.52-7.907 9.759l.007.287c1.594-2.613 4.268-4.45 7.332-4.787l1.581-.132v4.103l6.688-6.623-6.688-6.623v3.856z'/%3E  %3C/g%3E%3C/svg%3E) 分享 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cdefs%3E    %3Cpath id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-a' d='M0 0h24v24H0z'/%3E  %3C/defs%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cmask id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-b' fill='%23fff'%3E      %3Cuse xlink:href='%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-a'/%3E    %3C/mask%3E    %3Cg mask='url(%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-b)'%3E      %3Cg transform='translate(0 -2.349)'%3E        %3Cpath d='M0 2.349h24v24H0z'/%3E        %3Cpath fill='%23576B95' d='M16.45 7.68c-.954 0-1.94.362-2.77 1.113l-1.676 1.676-1.853-1.838a3.787 3.787 0 0 0-2.63-.971 3.785 3.785 0 0 0-2.596 1.112 3.786 3.786 0 0 0-1.113 2.687c0 .97.368 1.938 1.105 2.679l7.082 6.527 7.226-6.678a3.787 3.787 0 0 0 .962-2.618 3.785 3.785 0 0 0-1.112-2.597A3.687 3.687 0 0 0 16.45 7.68zm3.473.243a4.985 4.985 0 0 1 1.464 3.418 4.98 4.98 0 0 1-1.29 3.47l-.017.02-7.47 6.903a.9.9 0 0 1-1.22 0l-7.305-6.73-.008-.01a4.986 4.986 0 0 1-1.465-3.535c0-1.279.488-2.56 1.465-3.536A4.985 4.985 0 0 1 7.494 6.46c1.24-.029 2.49.4 3.472 1.29l.01.01L12 8.774l.851-.85.01-.01c1.046-.951 2.322-1.434 3.59-1.434 1.273 0 2.52.49 3.472 1.442z'/%3E      %3C/g%3E    %3C/g%3E  %3C/g%3E%3C/svg%3E) 推荐 ![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.242 7a2.5 2.5 0 0 0-2.5-2.5h-14a2.5 2.5 0 0 0-2.5 2.5v8.5a2.5 2.5 0 0 0 2.5 2.5h2.5v1.59a1 1 0 0 0 1.707.7l1-1a.569.569 0 0 0 .034-.03l1.273-1.273a.6.6 0 0 0-.8-.892v-.006L9.441 19.1l.001-2.3h-3.7l-.133-.007A1.3 1.3 0 0 1 4.442 15.5V7l.007-.133A1.3 1.3 0 0 1 5.742 5.7h14l.133.007A1.3 1.3 0 0 1 21.042 7v4.887a.6.6 0 1 0 1.2 0V7z' fill='%23000' fill-opacity='.9'/%3E%3Crect x='14.625' y='16.686' width='7' height='1.2' rx='.6' fill='%23000' fill-opacity='.9'/%3E%3Crect x='18.725' y='13.786' width='7' height='1.2' rx='.6' transform='rotate(90 18.725 13.786)' fill='%23000' fill-opacity='.9'/%3E%3C/svg%3E) 留言