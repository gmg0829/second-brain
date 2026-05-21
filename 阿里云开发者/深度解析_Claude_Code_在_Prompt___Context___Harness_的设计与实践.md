     深度解析 Claude Code 在 Prompt / Context / Harness 的设计与实践
====================================================

原创 飞樰 阿里云开发者 2026-04-20 08:30 浙江

> 原文地址: [https://mp.weixin.qq.com/s/YgGW92VBP8s846yzIxjVWQ](https://mp.weixin.qq.com/s/YgGW92VBP8s846yzIxjVWQ)

![](https://mmbiz.qpic.cn/mmbiz_jpg/Z6bicxIx5naJRhRBXuJl5wRKQFfIZNGHxjG7AkHMNic4JFLycricE9BHPG0EWgqpBL52z6BnFrsJ5LQZlI7O76blg/640?wx_fmt=jpeg)

阿里妹导读

  

文章内容基于作者个人技术实践与独立思考，旨在分享经验，仅代表个人观点。

背景

前几天写了一篇对OpenClaw的深度解析文章《[深度解析 OpenClaw 在 Prompt / Context / Harness 三个维度中的设计哲学与实践](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247559511&idx=1&sn=64e933b0264e47f0940e693e315e0c82&scene=21#wechat_redirect)》，深入探讨了一下OpenClaw在Prompt Engineering（提示词工程）、Context Engineering（上下文工程）以及新兴的Harness Engineering（驾驭工程/脚手架工程）等维度上所做的很多可值得学习和落地工作。

Claude Code是一个非常好用的AI Coding Agent，我在使用的时候经常会感觉到令人“Amazing”的时候，因为其对长程任务、复杂度较高的任务完成的是比较出色的，这里面除了Claude Opus4.6基座模型本身的强大之外，Claude Code这个CLI程序里的工程设计也绝对是“顶级”的，因为你会发现在Claude Code之外的其他地方使用Claude API的时候，相比Claude Code也会感觉有所逊色，这就说明在模型之外，Claude Code的很多设计也是极其“增色”的。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j7RlD5l5q1wLUwMiaj1Nca5Z1MS2nWr1EImiaBicJ0MRdjSvf1jWX6SrpiaYiaPibiajCvcggNLj1FHsX2e867laMFcRU47MyBXGbg0JQU0lenhYiaw/640?wx_fmt=jpeg&from=appmsg)

那么，这就引起了我对Claude Code具体实现的好奇心了，还是老样子，我的视角从来不在具体的前后端工程实现上，而是关注“如何设计一个好用的Agent系统”，因此，我会和之前分析 OpenClaw 一样，从Prompt Engineering、Context Engineering和Harness Engineering这三个维度展开，来分析 Claude Code 的设计思路，提炼出其中可以给我们设计Agent系统过程中，能够复用的方法论。声明一下：本文所分析的所有信息均来自于网络他人整理的公开信息，仅供学习研究之用，无任何其他用途。

Prompt Engineering → Context Engineering → Harness Engineering被称作是现代AI系统的三大关键阶段，分别聚焦于“如何说”、“让AI看什么”以及“构建怎样的运行环境”，三者层层递进，共同致力于提升大模型在复杂任务中的可靠性与可控性‌。比如说，我想做一个95分的Agent系统，直接通过Prompt Engineering拿到90+分是非常不现实的，顶多可以实现70+分，通过Context Engineering可以将其提高到80~85分，最后再通过Harness Engineering的约束，才可以再将其提升到90~95分。关于这些方面的内容，大家可以阅读我之前的文章《[深度解析 OpenClaw 在 Prompt / Context / Harness 三个维度中的设计哲学与实践](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247559511&idx=1&sn=64e933b0264e47f0940e693e315e0c82&scene=21#wechat_redirect)》，里面有比较详细的介绍。

那么，接下来让我们看看Claude Code里面在Prompt/Context/Harness三个维度上的关键设计，以及与OpenClaw对比有哪些相同的地方，又有哪些不同的地方。

Prompt Engineering：静态与动态信息的组装

首先，我们先看Claude Code最基础的Prompt Engineering（提示词工程）部分。关于“如何写好Prompt”这类话题，相关的最佳实践已经不胜枚举。但如果我们把视角拉回到Claude Code这样成熟的Agent系统实践中，会发现“Prompt Engineering”的内涵其实早就已经发生了质的变化：它不再仅仅是针对单次任务撰写一段固定的System Prompt，而是一套复杂的、动态的Prompt组装机制。

很多人容易陷入一个误区，认为写个漂亮的“提示词”就是做好了提示词工程，但实际上，真正的“工程”体现在实际生产环境中，提示词是如何根据身份人设、系统行为、安全守则、任务要求、工具规范、Skill要求、约束条件等等动态信息进行实时拼接和组装的，以适应更加复杂多变的任务场景。这也正是为什么行业内越来越多人开始将关注点从单纯的“提示词如何写好”转向更宏观的“提示词如何组装”的原因所在。

Claude Code的System Prompt和OpenClaw一样，是一个多层级、动态组装的过程。它由多个文件协同工作，最终拼装成一个字符串数组然后发送给Claude大模型的API接口。整个组装流程就像搭积木一样：先放好固定的底座（静态内容），再根据当前环境和用户配置，往上叠加各种积木块（动态内容），最后把整个积木塔完整，就是最终的System Prompt。

当然，这也不是说就可以不关注Claude Code的System Prompt本身写的内容了，虽然说我要做一个95分的Agent系统，可以通过Prompt + Context + Harness的方式实现，但是Prompt一定是这三者的基石，如果没有一个70+分的底子，即使你再怎么设计和调优Context、Harness，Agent的基线已经拉低了，因此，一个好的Prompt是绝对的效果保障和底气。

通过对Claude Code的深入学习和分析，我一直在感叹，Anthropic真的把很多细节做的非常的细致，“细节决定成败”这句话体现的淋漓尽致，这种极致的产品体验背后其实就是“极致的工程优化”和“细节打磨”，这种精神值得所有AI产品或项目的开发者们学习。

**System Prompt的动态组装过程**

首先，我们来看一下，System Prompt是如何一步一步组装起来的。

第1步：QueryEngine发起请求

当用户输入消息后，在QueryEngine.ts 里的 ask()函数就开始启动，这是Query引擎的主入口：

    QueryEngine.ask()

第2步：获取三大组件

在queryContext.ts中有个函数叫fetchSystemPromptParts()，它会并行去获取三样东西：

1.defaultSystemPrompt — 调用constants/prompts.ts中的getSystemPrompt() 构建的默认 prompt（如果没有自定义 prompt）

2.systemContext — 调用context.ts中的getSystemContext() 获取 Git 状态信息

3.userContext — 调用context.ts中的getUserContext()获取CLAUDE.md内容 + 当前日期

第3步：组装默认System Prompt

这是最核心的函数，在constants/prompts.ts中的getSystemPrompt()。它把 prompt 分成静态部分和动态部分两大块：

    返回的数组结构：

第4步：优先级决策

在utils/systemPrompt.ts中buildEffectiveSystemPrompt()会按照以下优先级选择最终使用的 prompt：

    优先级从高到低：

第5步：注入上下文信息

最后在System Prompt里，还会做两件事：

1.appendSystemContext() — 调用文件context.ts中的getSystemContext()把 Git 状态等信息追加到System Prompt末尾

2.prependUserContext() — context.ts中的getUserContext()会把 CLAUDE.md 内容和当前日期作为一条特殊的<system-reminder>消息，插入到用户消息列表的最前面

第6步：缓存分块

在constants/systemPromptSections.ts中的splitSysPromptPrefix()模块会负责把最终的System Prompt数组拆分成缓存友好的块，这样明确的告诉Claude哪些是前缀Prefix，就可以显式的走KV Cache，哪些是不需要做KV Cache的，这样做的好处是容易提高缓存命中率：

    打包后的结构：

**System Prompt完整组装结果**

下面我将System Prompt的组装的模块给大家完整拼接起来看看，也是非常长的，而且这里面有好多细节，大家可以细读一下。

静态Prompt部分
----------

下面的内容每个用户都会有这些静态的Prompt：

    # 模块 1：身份介绍（Intro Section）

动态Prompt部分
----------

在静态Prompt和动态Prompt之间有一个 SYSTEM\_PROMPT\_DYNAMIC\_BOUNDARY ，然后就是动态Prompt了，是每个用户/会话可能不同的内容：

    # 模块 1：会话特定指导（Session Guidance）

上下文注入
-----

除了前面的静态Prompt和动态Prompt，还有两个重要的上下文注入模块，一个是在系统上下文后面（appendSystemContext）注入的：

    # 这一段追加到 System Prompt 末尾，包含 git 状态快照：

以及在用户上下文前面（prependUserContext）注入的：

    # 这一段追加到 User Prompt 之前，作为一条特殊消息插入到对话最前面：

**给子Agent分配任务的Prompt**

Claude Code 的主Agent需要把任务委派给一个子Agent，不是简单的调用一个子Agent那么简单，Agent之间的通信是一个难题，我之前在文章《[Agent / Skills / Teams 架构演进过程及技术选型之道](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247558921&idx=1&sn=3fddd356f8f072b31742f0e8be772b63&scene=21#wechat_redirect)》中讲过：Multi-Agent架构虽然解决了不同Agent隔离问题，却将复杂度转移到了Agent之间的通信带宽与协同上。如果想要保证Agent效果，就需要投入巨大的成本去打磨Agent之间的通信过程，设计精细的摘要策略等等。

举个例子，就像你是一个老的管理者，这时候新来了一个管理者，你需要教会这个新管理者如何给下属布置任务，而且要让下属更好的完成任务。这里面有很多细节点：

*   你得告诉他有哪些下属（Agent 列表）
    
*   你得告诉他什么时候该自己干、什么时候该委派（When NOT to use）
    
*   你得教他怎么写工作说明（Writing the prompt）
    
*   你得防止他瞎指挥（反模式警告）
    

AgentTool里面的Prompt就是做这件事的，它最后动态组装的Prompt不是给用户看的，而是给主 Agent看的指导手册，教主Agent怎么使用AgentTool来派遣子Agent。篇幅有限，这里具体细节就不展开讲了。

Context Engineering：引导、压缩和记忆

**CLAUDE.md 项目说明**

在用户上下文的前面通过prependUserContext注入了一个特殊的文件叫做“CLAUDE.md”，这个文件其实就是你给 Claude Code写的“项目说明书”和“行为规范”。 它的内容会被注入到System Prompt中，Claude 在每次对话中都会遵守里面的指令。

从对话History角度看，CLAUDE.md 的内容最终被注入为对话的第一条消息，用 标签包裹，并带有一句强调：“Codebase and user instructions are shown below. Be sure to adhere to these instructions.”。所以 Claude 会把它当作必须遵守的用户指令来对待，优先级很高。

比如说可以在CLAUDE.md里写这个项目是一个基于何种语言的项目，采用什么样的管理模式，后端 API 在哪里实现。在编码规范上，使用那种函数或组件，变量命名遵循什么样的风格，选用哪种测试框架。行为约束、常用命令，以及一些描述项目特殊约定等等。

另外，CLAUDE.md是可以存放在四种路径的，而且不同路径适合存放不同的内容：

*   个人通用偏好类：通常位于 ~/.claude/CLAUDE.md。适合定义开发者个人的“全局人设”，比如“始终用中文回复”、“我喜欢简洁的代码风格”等。它的特点是跨项目生效，属于用户维度的静态配置，确保无论在任何项目中，Agent 都能第一时间对齐你的个人习惯。
    
*   项目共享规范：通常放置在项目根目录下的CLAUDE.md。这是团队协作的基石，必须提交到 Git版本管理中。这里可以包含项目架构说明、统一的编码规范、构建命令等公共知识。它的核心价值在于“标准化”，确保团队内所有成员对项目的理解是一致的，避免因信息不对称导致的幻觉或错误实现。
    
*   个人私有指令：对应 CLAUDE.local.md文件。这一层非常关键，它用于存储那些“不该公开”但又是当前开发者必需的上下文，例如“我负责 payment 模块”、“我的测试账号是 xxx”等敏感或个性化信息。由于涉及隐私或特定环境配置，这类文件明确不应提交到 Git，从而在享受个性化定制的同时，保障了代码仓库的安全性。
    
*   按文件类型分类的规则：通过 .claude/rules/\*.md目录来实现。当项目复杂度进一步提升，通用的项目规范可能无法覆盖所有场景，这时就需要按文件类型或业务领域进行拆分。例如，我们可以分别定义前端规则、后端规则、测试规则等，甚至利用 Frontmatter 来限定某些规则仅在特定文件路径下生效。这种模块化的管理方式，让Claude Code在处理具体任务时，能够动态加载最精准的上下文，既避免了上下文窗口的浪费，又极大提升了指令执行的准确度。
    

这里，我想对比一下OpenClaw，因为Claude Code是一个AI Coding Agent，所以它需要的是“项目要求”，通过能够CLAUDE.md这样的文件说明具体项目的任务要求即可；而OpenClaw是一个私人AI助理Agent，所以我在之前的文章中介绍过，所以他有AGENT.md（Agent总纲）、SOUL.md（灵魂）、IDENTITY.md（身份信息）、USER.md（主人档案）、TOOLS.md（工具清单）、HEARTBEAT.md（心跳任务）、MEMORY.md（长期记忆）等等。因此，从这里可以看出，两者都是基于Markdown的文件系统来驱动的任务，但是所设计的.md文件的类型又有所不同，这也跟两者的定位关系贴合的比较紧密，因此在设计你自己的Agent系统的时候，你也应该仔细想想自己场景里的.md文件应该如何设计？

**三层渐进式压缩体系**

在Claude Code 的这种AI Coding的Agent中，“上下文窗口”是制约 Agent 长程任务执行能力的核心瓶颈。随着对话轮数的增加，海量的工具调用输出、代码片段和历史交互会迅速耗尽 token 配额，导致模型“失忆”或响应延迟。为了解决这一痛点，Claude Code提供了一套先进的上下文管理思路，就是这个三层渐进式压缩体系，它按照激进程度递增，巧妙地在“保留关键信息”与“节省 token 成本”之间找到了平衡点：

*   Layer 1: MicroCompact（微压缩） — 无 LLM 调用，纯规则驱动，极致轻量。
    
*   Layer 2: Session Memory Compact（会话记忆压缩） — 基于已有会话记忆进行替换，零额外推理成本。
    
*   Layer 3: Full LLM Compact（完全压缩） — 调用 LLM 生成结构化摘要，精度最高但成本也最高。
    

接下来，我们就从Claude Code的上下文工程落地的角度，拆解这三层压缩是如何协同工作的。

MicroCompact（微压缩）—— 规则驱动的“第一道防线”
--------------------------------

在很多人的认知里，压缩上下文似乎必须依赖大模型的总结摘要能力，但这往往带来了不必要的延迟和成本。实际上，对于大量结构化的工具输出，规则驱动的微压缩才是 ROI 最高的选择。

在 src/services/compact/microCompact.ts 路径的实现中，Claude Code提供了这种设计的细节。系统定义了一个可压缩工具白名单（COMPACTABLE\_TOOLS），仅针对如 Bash、Read、Grep、Glob 等产生大量标准输出的工具进行压缩处理；而对于 Edit、Write 等涉及核心状态变更的操作，其输出则被完整保留，以确保后续决策的准确性。这种“抓大放小”的策略，既控制了体积，又守住了安全底线。

此外，在处理多模态内容时，为了避免复杂的图像识别计算开销，系统采用了固定 token 估算策略：所有图片内容统一按 2000 token 估算。这种工程上的“近似处理”，在绝大多数场景下足以满足调度需求，却换来了显著的性能提升。

微压缩主要包含两条执行路径：

1.基于时间的路径：直接对超过一定时间阈值的旧消息工具输出进行截断。

2.基于缓存的路径：智能识别 KV Cache 的边界，仅在边界之外执行压缩，最大化利用缓存命中率。

Session Memory Compact（会话记忆压缩）—— 复用已有的“智慧”
------------------------------------------

当微压缩不足以缓解上下文压力时，Claude Code进入第二层压缩：会话记忆压缩。这一层的核心理念是“不要重复造轮子”。

在之前的交互中，Claude Code 可能已经生成过高质量的会话记忆（Session Memory）。这一层的策略就是直接利用这些现有的摘要来替换冗长的原始历史消息，而无需再次调用 LLM 进行新的总结。

从配置上看（DEFAULT\_SM\_COMPACT\_CONFIG），这是一个相对保守但高效的策略：

*   触发门槛：只有当上下文 Token 数 ≥ 10,000 且文本消息条数 ≥ 5 条时才触发，避免频繁操作干扰短期记忆。
    
*   压缩上限：单次最大压缩 40,000 token，防止一次性丢失过多细节。
    
*   执行逻辑：将符合条件的旧消息替换为会话记忆摘要，同时严格保留最近几轮的消息不动，确保模型对当前任务的“近因效应”感知不被破坏。
    

Full LLM Compact（完全 LLM 压缩）—— 高精度的“终极手段”
----------------------------------------

如果前两层依然无法将上下文控制在安全范围内，或者任务场景极其复杂，Claude Code需要动用“重型武器”：调用 LLM 进行全量压缩。

这一步并非简单的“请帮我总结”，而是一项精密的上下文工程。在services/compact/compact.ts的 compactConversation 的实现中，Claude Code强制模型遵循一套严格的9 段式结构化模板：

    1. Primary Request and Intent

为了保证摘要的质量并防止模型“偷懒”或产生幻觉，这里引入了两个关键的 Prompt Engineering 技巧：

*   隐式思维链（Implicit CoT）优化：Claude Code在 Prompt 中明确要求模型在输出最终摘要前，先在 <analysis> 标签内进行全面的逻辑推演和分析，然后再在 <summary> 标签中输出结果。在实际返回给系统的过程中，<analysis> 块会被程序剥离，只保留纯净的摘要。这种做法极大地提升了摘要的逻辑连贯性和信息密度。
    
*   反工具调用保护：这是一个非常容易被忽视但至关重要的细节。Claude Code在 Prompt 头部加入了强约束指令（NO\_TOOLS\_PREAMBLE），严厉禁止模型在压缩过程中调用任何工具（如 Read、Bash 等）。明确告知模型：“工具调用将被拒绝，且会浪费你唯一的一次机会，导致任务失败”。这有效防止了模型在压缩阶段产生不可控的副作用。
    

自动压缩触发机制 —— 智能的“流量调节阀”
----------------------

有了上述三种压缩手段，如何让它们自动、有序地运转？这就需要一个智能的自动压缩触发器（AutoCompact）。

Claude Code的策略是设定一个安全缓冲水位线（AUTOCOMPACT\_BUFFER\_TOKENS = 13,000）。当上下文窗口剩余空间低于这个阈值时，系统会自动介入判断是否需要压缩。

整个决策流程是一个典型的分级回退策略（Fallback Strategy）：

*   首选快速路径：首先尝试 Session Memory Compact。因为它不需要额外的 LLM 调用，速度最快、成本最低。如果满足触发条件（Token 数和消息数达标），立即执行。
    
*   降级重型路径：如果 SM Compact 不满足条件（例如记忆尚未生成）或压缩后仍无法满足要求，系统会自动回退到 Full LLM Compact，不惜成本地生成高质量摘要以保全任务继续运行。
    

从微压缩的规则拦截，到会话记忆的复用，再到 LLM 的深度总结，这套三层体系完美诠释了“上下文工程”的真谛：它是构建一套动态的、分层的、具备成本意识的系统工程。 只有在正确的时机，用合适的成本，做恰到好处的信息压缩，才能让 Agent 在长程任务中始终保持“头脑清醒”。

**Memdir 结构化记忆系统**

随着交互轮次的不断增加，项目可能会进入长周期时间，Claude Code 是如何做到能够记住项目的目标、要求和已经开发过哪些内容呢？

Claude Code 设计了一套名为 Memdir 的结构化记忆机制。为什么强调“结构化”？因为非结构化的记忆虽然灵活，但在实际工程中极易导致上下文膨胀和检索噪声。这套机制将记忆明确拆解为四种核心类型，每种类型承载不同的业务语义：

*   User（用户级）：记录用户的个人偏好、操作习惯及特定指令风格，让 Claude Code 越用越懂你；
    
*   Feedback（反馈级）：存储模型行为的修正记录和历史纠错案例，形成“避坑指南”，防止同类错误复发；
    
*   Project（项目级）：固化项目层面的技术选型、架构决策和约束条件，确保多轮对话中技术立场的一致性；
    
*   Reference（参考级）：沉淀通用的文档片段和代码模式，作为高频调用的知识底座。
    

有了分类，接下来的挑战是如何高效地加载这些记忆而不拖慢响应速度。Claude Code在 memdir/memdir.ts 中实现了 loadMemoryPrompt 作为记忆加载的主入口。这个函数并非简单的文件读取，而是一个精密的“过滤器”：它首先扫描记忆目录，将分散的记忆条目按上述四种类型进行归类整理；紧接着，它会严格应用预算限制，根据当前任务的上下文窗口大小，动态裁剪记忆内容；最后，生成格式化后的记忆提示词注入到 Prompt 中。这一步至关重要，它确保了进入 LLM 上下文的每一字节都是高价值的，避免了因记忆过载导致的“注意力分散”。

当然，仅仅依靠规则过滤在面对海量记忆时依然显得力不从心。当记忆库规模扩大，如何从成千上万条记录中精准捞出当前最需要的几条？Claude Code引入了 LLM-in-the-loop 的检索策略。在 memdir/findRelevantMemories.ts 中，Claude使用的是Sonnet模型来理解语义驱动检索过程。系统不再依赖简单的关键词匹配或固定的相似度阈值，而是让大模型亲自充当“图书管理员”，对候选记忆进行语义相关性判断，并强制约束其只返回最多5条最相关的记忆。

这种设计巧妙地平衡了“召回率”与“精确度”：一方面利用大模型的推理能力解决了传统检索在复杂语义下的失效问题，另一方面通过数量限制严格控制了 Token 消耗和延迟。从静态的规则组装到动态的 LLM 语义筛选，这套记忆体系让 Claude Code 不再是“用完即走”的一次性工具，而是具备了持续学习和自我修正能力的AI Coding Agent。

相比而言，OpenClaw 的Memory设计相对而言更多是在MEMORY.md中记录了长期记忆，在memory/日期.md里面存储每日的笔记，将长期和短期记忆相结合，并且引入了记忆检索和时间衰减来模拟一个真实的“人”的记忆的衰减过程。还是那句话，Agent系统定位的区别，导致Memory记忆机制的设计差异，Claude Code更偏向于记忆项目文档、参考、用户偏好和反馈，而OpenClaw则记录的更多是对话中的重点历史信息。

Harness Engineering：环境、约束与控制

最后一部分，还是来到最复杂的一环，就是 Harness Engineering。

“Harness”这个词呢原意指“马具”，在软件工程语境下常被译为“脚手架”。简而言之，Harness Engineering 就是在大模型之外构建一套外部的运行环境与约束机制，通过接口（Interface）、钩子（Hooks）、护栏（Guardrails）等手段，约束、引导、检验、评估Agent 的行为，使其能够可靠地完成复杂、长周期的任务。

如果说 Prompt Engineering 是告诉模型“做什么和怎么做（What & How）”，Context Engineering 是让模型“做得更好（How Better）”，那么 Harness Engineering 的核心使命则是确保模型“可控地做（How Controlled）”。

做一个比喻呢，大模型/Agent是一匹天赋异禀的“千里马”，拥有强大的推理和执行能力。不加Harness 的Agent就像在草原上自由奔跑的野马，虽然速度快，但方向不可控，随时可能偏离轨道。所以，Harness Engineering就是为这匹马套上精致的“马具”。它既让人类骑手能够稳稳地骑乘（可交互），又通过缰绳和马鞭（约束与引导）确保马匹严格按照预定路线奔跑，能在指定地点停下，也能在陷入泥潭时被拉出来。关于Harness Engineering 的详细介绍可以阅读我的文章《[深度解析OpenClaw在Prompt/Context/Harness三个维度中的设计哲学与实践](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247559511&idx=1&sn=64e933b0264e47f0940e693e315e0c82&scene=21#wechat_redirect)》中“什么是Harness Engineering”的部分。

接下来，我们来看下 Claude Code 是如何实现“顶级”的 Harness Engineering 的。

**系统级强提醒引导**

Claude Code在处理复杂上下文注入时，提出并实现了一套非常精妙的机制 —— System Reminder动态注入机制。这个设计恰恰说明了真正的 Harness Engineering 就是在于如何在系统运行过程中，动态、结构化且安全地引导模型走向正确的方向。

首先，从核心实现来看，Claude Code 定义了一个关键的包装函数wrapInSystemReminder（位于utils/messages.ts）。这个函数的作用非常明确：它将所有需要注入系统的元信息（如配置文件内容、日期、工具执行结果等）统一包裹在<system-reminder>...</system-reminder>标签中。为什么要这么做？因为在多轮对话的用户消息流中，模型极易混淆“用户输入”与“系统指令”。通过这种显式的标签隔离，系统能够向模型清晰地传达：“这部分内容是系统注入的元信息，而非用户的自然语言输入”，从而有效避免了模型对上下文的误解或指令跟随的偏移。

其次，让我们看看这一机制在实际场景中是如何应用的。在 Claude Code 的架构中，<system-reminder>几乎贯穿了 Agent 交互的全生命周期：

*   用户上下文初始化：在第一条用户消息发送前，系统会自动注入CLAUDE.md的项目规范、当前日期等基础信息，为 Agent 设定初始认知框架。
    
*   工具结果反馈：当 Agent 调用工具完成后，工具的输出（如文件读取内容、记忆片段）会被包裹进该标签追加到对话历史中，确保模型能基于最新的执行结果进行推理。
    
*   钩子（Hook）反馈：在复杂的自动化流程中，Hook 的执行结果同样通过此机制注入，让模型实时感知流程状态。
    
*   周期性任务与能力描述：无论是待办任务的状态提醒，还是会话级别的技能列表（Skill List）、可用代理类型（Agent List），都通过这种标准化的方式动态挂载到上下文中。这种多维度的注入策略，保证了 Agent 在任何时刻拥有的上下文都是完整、即时且结构清晰的。
    

再者，从工程化的角度审视，这一机制被深度集成到了消息规范化流程中。在normalizeMessagesForAPI函数（utils/messages.ts）里，系统在将内部消息格式转换为大模型 API 所需的格式时，会自动识别需要注入的内容，并强制调用wrapInSystemReminder进行包裹。这意味着，上下文的组装不再是依赖开发人员手动拼接字符串的“艺术活”，而变成了一套标准化的、可复用的“工程流水线”。无论是在钩子系统（utils/hooks.ts）中处理执行反馈，还是在其他模块中动态加载配置，这套机制确保了所有注入数据格式的一致性，极大地降低了因格式混乱导致的模型幻觉风险。

透过 Claude Code 的这个实践，我们可以得到深刻的启示：构建一个高可用的 Agent，必须建立一套好用的“提醒引导机制”。通过不断的系统级的提醒，让Agent时刻不忘记要做的任务目标和当前阶段。

**六大系统内置AgentTool**

1\. General-Purpose Agent：万能打工人
-------------------------------

这是 Claude Code 的“默认工人”。当主 Agent 遇到复杂的多步骤任务，但又不知道该交给谁时，就会派这个 Agent 出马。其核心特点如下：

*   工具权限：tools: \['\*'\] ，拥有所有工具的使用权限，是权限最大的一个Agent
    
*   不指定模型：使用系统默认的子Agent模型（通常是更便宜的模型以节约成本）
    
*   System Prompt很简洁：
    

    "You are an agent for Claude Code. Given the user's message,

翻译过来就是：“把活干完，别镀金（过度工程化），也别干一半就跑。”

典型使用场景： 搜索关键词、跨文件调查、执行多步骤的研究任务。

2\. Explore Agent：代码库侦察兵
------------------------

你是不是经常在给 Claude Code 分配一个任务的时候，它就会显示一个“Explore”，因为它接到命令马上就开始探索调研了，是一个速度优先的只读搜索专家。它的存在解决了一个痛点：主 Agent 在搜索代码时，往往需要多轮尝试，产生大量中间输出——这些输出会填满上下文窗口。Explore Agent 就像一个派出去侦察的小兵，它自己消化搜索过程，只带回最终结果。其核心特点如下：

*   严格只读：被明确禁止创建、修改、删除任何文件，甚至不能创建临时文件
    
*   使用Haiku模型：小、快、便宜，仅对外部用户，Anthropic内部员工用的还是主模型
    
*   不加载CLAUDE.md ：omitClaudeMd: true，因为它不需要项目规范，只需要搜索
    
*   强调效率：系统提示词要求它“尽可能多地并行调用工具”
    

有意思的设计细节：调用时可以指定搜索的“彻底程度”："quick"是快速搜索、"medium"是适度探索、"very thorough"是全面分析。还有一个EXPLORE\_AGENT\_MIN\_QUERIES = 3 的常量，意思是至少要搜索 3 次才值得动用这个Agent，否则直接用 Glob/Grep 会更快。

3\. Plan Agent：软件架构师
--------------------

当你让 Claude Code 做一个大工程之前，它可以先派出这位“架构师”来制定实施方案。其核心特点如下：

*   严格只读：与 Explore Agent 一样不能修改任何文件
    
*   继承父模型：用和主 Agent 一样的聪明模型，因为架构设计需要高质量思考
    
*   结构化输出：系统提示词要求它最后必须输出：
    

    ### Critical Files for Implementation

工作流程是标准的“四步法”： 理解需求 → 深入探索代码库（找已有模式、相似功能） →  设计解决方案（考虑权衡和架构决策） →  详细规划（步骤、依赖、风险）

4\. Verification Agent：质量检验官
----------------------------

这是六大 Agent 中设计最精妙、提示词最长的一个。它的存在解决了 AI 编程中一个核心问题：AI 写的代码，AI 自己说"写好了"——但真的写好了吗？也是最体现Harness Engineering精髓的一个Agent。这里重点介绍一下它，有下面五种设计哲学。

设计哲学一：红蓝对抗

它的开场白就奠定了基调：“You are a verification specialist. Your job is not to confirm the implementation works — it's to try to break it.”，翻译一下就是：你是验证专家。你的工作不是确认代码能跑——而是想办法把它搞崩。

这是经典的红蓝对抗思维：有点像GAN神经网络，就是专门给代码挑刺的，让Agent自己发现问题所在。

设计哲学二：不要随便给PASS

Verification的System Prompt里，毫不留情地指出了它在做验证时需要避免的两个“典型问题”：

*   验证逃避（Verification Avoidance）：“面对一个检查项，你会找各种理由不去真的运行它——你读读代码，叙述一下你‘会’测试什么，写上 PASS，然后就溜了。”
    
*   被前80%迷惑（Seduced by the First 80%）：“你看到一个漂亮的 UI 或者通过的测试套件，就倾向于给 PASS，而没注意到一半按钮其实什么都不做，状态刷新后就消失，或者后端在遇到坏输入时直接崩溃。前 80% 是容易的部分。你的全部价值在于找到最后那 20%。”
    

设计哲学三：严格的权限控制

它只能看，不能改。唯一的例外是可以往 /tmp 写临时测试脚本（用 Bash 重定向），用完要自己清理。它在对话过程中会被反复注入提醒：“CRITICAL: This is a VERIFICATION-ONLY task. You CANNOT edit, write, or create files IN THE PROJECT DIRECTORY.”

它不被允许调用各种工具，比如：不能再生成子Agent、不能退出计划模式、不能编辑文件、不能写文件、不能编辑笔记本等等。

设计哲学四：按变更类型分类的验证策略

在System Prompt里为十几种变更类型定义了专门的验证策略，主要有下面这些变更类型：

*   前端变更：启动开发服务器 → 浏览器自动化 → 检查子资源加载
    
*   后端/API：启动服务 → curl 测试端点 → 验证响应结构 → 测试错误处理
    
*   CLI/脚本：用代表性输入运行 → 验证 stdout/stderr/退出码
    
*   基础设施：语法验证 → 干运行（terraform plan, kubectl --dry-run）
    
*   Bug修复：先复现 Bug → 验证修复 → 回归测试
    
*   数据库迁移：运行迁移 → 验证 schema → 测试回滚（可逆性）
    
*   重构：现有测试必须不改动地通过 → diff 公共 API
    
*   移动端：清理构建 → 模拟器安装 → dump UI 树 → 点击验证
    

设计哲学五：反偷懒话术

在System Prompt里有一组“AI 常见的自我开脱话术”，然后逐一拆穿，列举一下：

*   代码看起来是对的 —— 看起来不是验证，运行它
    
*   实现者的测试已经通过了 —— 实现者也是 AI。独立验证
    
*   这大概没问题 —— “大概”不是“验证过了”，运行它
    
*   让我启动服务器然后看看代码 —— 不，启动服务器然后打端点
    
*   我没有浏览器 —— 你检查过有没有playwright MCP工具
    
*   这个太耗时了 —— 不是你说了算的
    
*   在写解释而不是运行命令 —— 停下来，运行命令
    

5\. Claude Code Guide Agent：Claude Code使用说明书
--------------------------------------------

这是 Claude Code 的“自我说明书”。当用户问Claude Code“怎么用”这类问题时，它会被唤起，然后去官方文档网站查文档，基于文档给出回答。其核心特点如下：

*   知识领域：Claude Code CLI、Claude Agent SDK、Claude API
    
*   使用Haiku模型：使用最便宜的模型即可
    
*   权限模式dontAsk：不需要向用户请求权限，直接调用
    
*   动态上下文注入：System Prompt会动态包含自定义技能、Agent、MCP服务器配置和用户设置
    

6\. Statusline Setup Agent：状态栏安装
--------------------------------

这是一个“小而美”的 Agent，专门负责帮用户配置终端状态栏。其核心特点如下：

*   只有两个工具：Read 和 Edit，就这两个就够了
    
*   使用Sonnet模型 ：比 Haiku 聪明一点，因为需要理解Shell的配置
    
*   橙色标识：暖色，表示“装修中”
    
*   知道怎么转换 PS1 ：能把 Shell 的 PS1 变量转成 Claude Code 的 statusLine 配置
    

7\. Fork Sub Agent：隐藏的第七人
-------------------------

虽然不在系统内置的六大Agent里面，但 Claude Code 还有一个特殊的 Fork Sub Agent。它不是一个独立的角色，而是主Agent 的“分身”——当主 Agent 想把一个任务甩出去但又不想丢失上下文时，可以fork出一个继承完整对话历史的子Agent进程。其核心特点如下：

*   共享Prompt Cache：fork 出来的子进程和父进程共享 prompt cache，所以非常便宜
    
*   严格的输出格式：fork 子进程必须以 Scope: 开头，报告控制在 500 字以内
    
*   防止递归fork： 通过检测对话历史中是否存在<fork-boilerplate>标签来阻止子进程再 fork
    
*   Worktree 隔离：可以在独立的 git worktree 中运行，改了文件也不影响主仓库
    

8\. 设计思考：为什么要设计这么多Agent
-----------------------

那么，Claude Code为什么要做什么多的Agent呢？我认为主要有下面几方面的考虑：

1.token成本：Explore、Guide都用 Haiku，比用Opus便宜很多

2.安全隔离：Verification Agent不能改文件，Explore Agent不能写文件，通过禁用工具实现“最小权限原则”

3.上下文管理：子Agent 的工具输出不会污染主Agent的上下文窗口

4.并行效率：Verification Agent在后台运行，不阻塞用户

**精细化的安全体系**

针对安全问题，Claude Code构建了从规则驱动的权限控制，到环境级的沙箱隔离的安全防御体系。

### Permission Engine：规则的精细化权限控制

这是安全防线的“大脑”，负责在工具调用发生前进行快速的逻辑判定。在工程实现上，这往往是一个庞大而复杂的模块（例如在相关项目中，`permissions.ts` 文件高达 61KB，是核心逻辑最密集的文件之一）。其核心在于定义清晰的“三行为模型”：

*   Allow（自动允许）：针对低风险、高频次的操作，直接放行以保障效率。
    

*   Deny（自动拒绝）：针对明确禁止的高危操作，直接阻断。
    
*   Ask（请求确认）：针对不确定或中等风险的操作，暂停执行并提示用户介入确认。
    

为了确保策略的灵活性，该引擎通常支持多源规则配置，并遵循严格的优先级覆盖机制：`settings.json`（全局配置）→ `CLI 参数`（启动时指定）→ `命令行规则` → `session 规则`（会话级动态规则）。当 Agent 发起工具调用时，引擎会立即检索匹配规则，输出判定行为。这种设计既保证了默认的安全基线，又允许用户在特定场景下动态调整权限边界。

### Sandbox Isolation：操作系统原型的沙箱隔离

即便权限引擎放行了某些操作，我们仍需假设代码可能存在未知风险或误操作。因此，第二层防线引入了操作系统级别的隔离机制。在 Linux 环境下，通常基于 `bubblewrap (bwrap)` 构建轻量级沙箱（对应代码中约 986 行的 `sandbox-adapter.ts`）。这一层提供了硬核的物理隔离能力：

*   文件系统隔离：通过只读挂载根目录和白名单目录机制，防止 Agent 随意篡改系统关键文件。
    
*   网络与进程隔离：利用独立的 Network 和 PID 命名空间，限制网络访问范围，防止进程逃逸。
    
*   用户权限降级：强制以非 root 用户身份运行，从源头上杜绝提权风险。
    

值得注意的是，沙箱并非“一刀切”。系统内部维护了一套智能决策逻辑（如 `shouldUseSandbox` 函数），它会检测命令特征。对于那些需要交互式终端（TTY）、特殊网络设备或不兼容沙箱环境的命令，系统会自动识别并将其排除在沙箱之外，转为直接执行（当然，这通常会配合更严格的权限校验）。这种“按需隔离”的策略，在安全性和兼容性之间找到了最佳平衡点。

### 异步生成器驱动的主循环

传统的 Agent 实现往往是一个巨大的同步函数，一旦启动就很难中途干预，且难以实时反馈中间状态。而 Claude Code 这种成熟的架构， 在`queryLoop`中，主循环被重构为一个`async function*`（异步生成器）。这种设计带来了四个维度的质的飞跃：

1.流式处理与实时反馈：通过 `yield` 关键字，Claude Code 不再需要等到所有任务完成才返回结果。它可以在思考、工具调用、文件读取等每一个关键节点，逐步向调用者推送中间状态（Stream Events）。这对于前端展示“正在思考...”、“正在读取文件...”等动态进度条至关重要，极大地提升了用户体验。

2.协作式控制：调用者拥有了对执行流的“暂停/恢复”权。由于生成器的特性，外部控制器可以在任意 `yield` 点介入，比如等待用户确认某个高危操作，或者根据业务逻辑动态调整后续策略，而无需杀死进程或重启会话。

3.优雅的取消机制：在长程任务中，用户随时可能想要停止。异步生成器原生支持 `return()` 方法，允许系统在收到取消信号时，优雅地终止当前迭代，清理资源，而不是粗暴地杀掉线程，避免了状态不一致的风险。

4.有状态的上下文维持：在多次 `yield` 之间，生成器内部可以完美维护局部变量和运行时状态（如已消耗的命令 UUID 集合 `consumedCommandUuids`），确保了多轮交互中上下文的一致性和连续性。

在这个异步生成器内部，包裹着一个严谨的 `while(true)` 无限循环，它将单次交互拆解为一条标准化的六步Pipline：

1.消息预处理 Pipline：对输入消息进行清洗、格式化及元数据注入（前文提到的 `<system-reminder>` 就是在此阶段完成）。

2.大模型 API 调用：将构建好的上下文发送给 LLM，获取推理结果。

3.响应解析与规划：解析模型返回的内容，识别是最终回答还是工具调用请求。

4.工具执行与安全校验：触发前文所述的“三层安全体系”，执行具体的工具操作。

5.结果产出：将当前的执行状态、工具输出或中间结论通过 `yield` 抛给上层调用者。

6.终止条件检查：判断是否达到最大轮次、任务已完成或遇到不可恢复错误，从而决定是继续循环还是退出。

为了让 Claude Code 在生产环境中真正“皮实”，这个循环还内置了强大的错误重试与恢复策略，能够自动应对各种异常场景：

*   上下文超长保护：当遇到 `prompt-too-long` 错误时，系统不会直接报错退出，而是启动前面“上下文工程”中提到的三级压缩机制：先尝试微压缩，若不行则升级为绘画记忆压缩，最后执行完全LLM压缩，尽最大努力保留核心信息并继续运行。
    
*   输出截断自动续写：针对 `max-output-tokens` 限制导致的回答中断，系统支持最多 3 次自动重试，并通过发送 `continue` 指令引导模型接着上一句说完，确保任务执行的完整性。
    
*   网络波动平滑处理：面对不稳定的网络环境，集成了指数退避（Exponential Backoff）重试算法，避免因瞬时抖动导致整个 Agent 任务失败。
    

通过将主循环重构为异步生成器，并辅以精细化的流水线和自愈机制，Claude Code成功将一个复杂的 AI 推理过程转化为了一个可观测、可干预、高可用的工程系统。

### 可编程的钩子拦截机制

Claude Code 在约束层面，和OpenClaw一样，在`hooks.ts`中实现了一个庞大的钩子系统，开发者可以注入自定义的逻辑来干预工具的生命周期。这套系统覆盖了 20+ 种关键事件类型，将 Agent 的运行过程完全透明化、可编程化，具体的过程如下：

生命周期

钩子名称

触发时机

工具生命周期

`PreToolUse`

工具调用前

`PostToolUse`

工具调用后

`ToolError`

工具执行出错

会话生命周期

`SessionStart`

会话开始

`SessionEnd`

会话结束

`SessionPause`

会话暂停

`SessionResume`

会话恢复

消息生命周期

`PreSampling`

模型采样前

`PostSampling`

模型采样后

`UserPromptSubmit`

用户提交输入

文件操作

`PreFileEdit`

文件编辑前

`PostFileEdit`

文件编辑后

`PreFileWrite`

文件写入前

`PostFileWrite`

文件写入后

这些钩子的触发时机相比OpenClaw要多了很多，在很多比较细节的操作前后都可以触发，这也就给了Claude Code一个很强的灵活约束能力。

钩子Hook机制的强大之处不仅在于“监听”，更在于“干预”。所有 Hook 的执行结果都支持返回结构化的 JSON 数据（通过 `processHookJSONOutput` 函数处理），从而赋予外部脚本直接修改系统行为的能力：

*   阻断执行：返回 `{ "blocked": true, "reason": "..." }` 可直接熔断高危操作，作为安全沙箱之外的第二道软性防线。
    
*   动态篡改：通过 `{ "input": {...} }` 或 `{ "output": {...} }`，Hook 可以实时修正工具的输入参数（例如自动补全缺失的路径）或清洗输出结果（例如脱敏敏感信息），而无需修改 Agent 核心代码。
    
*   反馈注入：利用 `{ "message": "..." }`，Hook 可以向对话流中插入系统提示或用户通知，实现人机交互的增强。
    

*   这种配置通常集中在 `settings.json` 中，通过声明式的方式定义匹配规则（如 `match: { "tool": "Edit" }`）和执行命令（如 `command: "my-linter --check"`），极大地降低了使用门槛，让非核心开发人员也能轻松扩展 Agent 能力。
    

当然，赋予外部代码如此高的权限也带来了风险：如果某个 Hook 脚本陷入死循环或网络阻塞，整个 Agent 系统将随之挂起。为此，系统在工程层面引入了严格的超时保护机制。在 `hooks.ts` 中，定义了全局常量 `TOOL_HOOK_EXECUTION_TIMEOUT_MS`（默认 10 分钟）。任何 Hook 的执行一旦超过此时限，将被强制终止并抛出超时错误。这一设计确保了即使外部插件表现不佳，也不会拖垮主进程，保障了 Agent 整体运行的鲁棒性和可用性。

综上所述，钩子机制统将原本封闭的 Agent 黑盒变成了一个开放的、可插拔的平台。它让我们能够在不侵入核心推理逻辑的前提下，灵活地适配各种复杂的业务规范、安全合规要求以及定制化工作流。对于致力于落地企业级 Agent 的团队来说，构建这样一套完善的事件驱动架构，是实现从“Demo 玩具”到“生产级应用”跨越的关键一步。

**有趣的彩蛋**

Claude Code这个项目除了上面Harness Engineering的几个方面的设计非常出彩之外，你会发现它不仅仅是一个AI Coding工具，Anthropic开发者们在这个严肃、专业的软件程序中，还埋藏了大量有趣的设计，我们来一一介绍下。

### Caffeinate——给电脑灌咖啡，防止休眠

当 Claude Code 在帮你干活的时候，你可能去泡了杯茶——回来发现电脑睡着了，API 请求超时了。为了解决这个问题，Claude Code 悄悄地给你的电脑灌了咖啡。

macOS 有一个内置命令叫 `caffeinate`（字面意思就是“注入咖啡因”），可以阻止电脑休眠。Claude Code 利用了它，只阻止空闲休眠（最温和的选项），显示器仍然可以关，5 分钟后自动退出——这是一个安全措施。每 4 分钟重启一次 caffeinate 进程（5 分钟超时前重启），确保持续生效。

这里其实挺有意思的，为什么不直接设个很长的超时？因为如果 Claude Code 被直接强制杀进程了（SIGKILL）不会触发清理回调，那么这个 caffeinate 进程会在 5 分钟后自动退出——不会让你的电脑永远不休眠。

有意思的是，这个命令只在Mac电脑生效，因为只有Mac有这个命令，其他操作系统没有。

### Anti-Distillation：反蒸馏，防止模型被“偷学”

Claude Code 内置了防止其输出被用来训练竞争对手模型的机制，分两个层面：

*   假的工具注入：有一段代码在 API 请求中设置 `anti_distillation: ['fake_tools']`——告诉服务端注入假的工具定义。如果有人复制Claude Code的输入输出来训练自己的模型（即“蒸馏”），假工具定义会混入训练数据中。学生模型学到这些假工具后，会在实际使用中尝试调用不存在的工具，导致行为异常——相当于在数据里投毒。
    
*   输出格式的蒸馏抵抗：有个“精简输出模式”是给SDK的用户看的——它会把工具调用过程汇总成一行（比如 “searched 3 patterns, read 2 files, wrote 1 file”），而不是暴露每个工具调用的详细参数。这样正常用户只看到简洁的进度摘要，体验更好。想蒸馏的人看不到详细的工具调用链，无法复制 Claude Code 的“行为方式”。Thinking Content（思考过程）被直接丢弃，最有价值的推理过程不会泄露。
    

### Undercover Mode：卧底模式

这可能是整个代码库中最有“谍战片”味道的功能。Anthropic 的内部员工在为公共/开源项目贡献代码时，需要隐藏自己的 AI 身份——就像一个特工在执行潜伏任务。当卧底模式激活时，系统会注入一段非常严肃的指令，在commit 消息禁止出现“Claude Code”、“Co-Authored-By”、任何模型代号。以避免暴露代码是由 AI 写的。

### Dogfooding 内部吃狗粮模式

英文中有一句俚语叫做“Eating your own dog food”，一般就是指的公司大范围内部使用自己开发的产品，来更好的优化产品。在 Claude Code 中也大量通过 `process.env.USER_TYPE === 'ant'` 来区分内部和外部用户，"ant" 就是 Anthropic 的缩写，内部员工会通过 Dogfooding 来使用各种内部功能。

### 用户情绪辱骂处理：AI也知道你在骂它

当用户对 Claude Code 感到沮丧，忍不住敲出一句脏话时——它也是真的在听哦，有一个叫用正则表达式匹配用户输入中的负面关键词的函数来检测，覆盖面相当全面：从温和到激烈都能识别，比如w开头、f开头、s开头的一系列词（这里就不一一列出来了，以免被当做敏感词）。不过，这个功能在只在Anthropic内部员工开放，并未对外开放出。

当 Claude 检测到用户在骂人后，系统不是把你拉黑或者回怼——而是弹出一个反馈调查，邀请你分享对话记录以帮助改进产品。逻辑很人性化：你骂它，说明你真的很挫败，那我们来看看到底哪里做得不好，而不是假装没听到。

并且，它还在检测用户是否在说“继续”，检测到一句话必须只有一句`continue`的完整输入才算，而`keep going`则可以出现在句子中间——因为“continue”可能出现在代码上下文里（比如 “use continue statement”），但“keep going”几乎只用于催促。

### 荒诞的加载动词：让等待变得有趣

你应该会发现，当 Claude Code 在思考的时候，终端会显示一个旋转动画加一个动词 —— 不是无聊的“Loading...” 或 “Processing...”，而是有一百多个疯狂的动词列表中随机选择。

比如有什么：Boondoggling（做无意义的工作）、Flibbertigibbeting（像个话唠一样叽叽喳喳）、Discombobulating（把人搞迷糊中）、Lollygagging（磨洋工中、慢吞吞中）、Canoodling（卿卿我我中）、Prestidigitating（变魔术中）、Razzmatazzing（花里胡哨地表演中）、Shenaniganing（搞恶作剧中）、Tomfoolering（犯傻中）、Whatchamacalliting（那个什么来着）、Photosynthesizing（光合作用中）、Moonwalking（太空步中）、Clauding（Claude化中）、Osmosing（渗透中）、Quantumizing（量子化中）、Symbioting（共生化中），甚至还有些烹饪类、舞蹈类的动词，是真的在玩抽象啊。

就比如我刚刚运行了一下，出现的是“Hullaballooing...”，翻译成中文是“吵闹中”：

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j7RlD5l5q1wXoBU2ouBPkRHB9FL7KakbKkdRIxHibf90zFTl8cHEaQhmJAFoXiazRkurJEDebshBzqyB9QnIKQ0vQ3WGPmVB3vG62KQtYQmPI/640?wx_fmt=jpeg&from=appmsg)

### Buddy System：养个电子宠物

这也是 Claude Code 中“最可爱”的功能 —— 可以用 `/buddy` 命令“孵化”一个专属于你的电子宠物，它会一直陪着你写代码。

这里面提供了十几种宠物，从常见的猫、鸭子、企鹅，到奇怪的水蜥、仙人掌、蘑菇，甚至还有一个叫“chonk”（胖墩）的物种。每个物种都是手工绘制的ASCII艺术精灵，5行12字符宽，还有多帧动画！

![](https://mmbiz.qpic.cn/mmbiz_jpg/j7RlD5l5q1y6d19rkw4YoR3DdXTiaCExdcNg6CY2LPia8ib6hWichwYUwbk5ryhRNbyl7FIaAicwmqibklL5fRlVn8u4DLGO1pPibpErQenuLaKXVc/640?wx_fmt=jpeg&from=appmsg)

而且，你的宠物是“命中注定”的，并不是随机抽取的，它是由你的用户ID通过Mulberry32伪随机数生成器确定性生成的。这就意味着，同一个用户永远得到同一只宠物；你不能通过刷新来“重新抽卡”；你改配置文件也没用，因为他每次都从UserId重新计算。

为什么这样设计呢？因为他就是想让你“抽一次性的卡”，用户不能通过编辑配置文件来作弊获得传说级宠物。Claude甚至还搞了个稀有度系统，可以看到抽卡概率是：common（普通）是60%、uncommon（非普通）是25%、rare（稀有）是10%、epic（史诗级）是4%、legendary（传说级）只有 1% 的概率——而且你没法刷，因为是UserID决定的，稀有度还影响：

*   帽子：普通宠物没帽子，稀有以上可以戴皇冠、高礼帽、螺旋桨帽、光环、巫师帽、毛线帽、甚至头顶一只小鸭子
    
*   属性点数：稀有度越高，属性基础值越高
    
*   闪光（Shiny）：1% 概率是闪光版，稀有中的稀有
    

另外，宠物还有五大属性，不知道是否和编程有关，有DEBUGGING（调试能力）、PATIENCE（耐心）、CHAOS（混乱值）、WISDOM（智慧）、SNARK（毒舌），每只宠物有一个“王牌属性”（特别高）和一个“废柴属性”（特别低），其余随机。

同时，宠物分为骨骼（Bones）和灵魂（Soul）两部分，骨骼包含物种、稀有度、眼睛、帽子、属性——确定性生成，不存储；灵魂（Soul）有名字和性格——由 AI 模型在第一次"孵化"时生成，存储在配置中，也就是说，Claude 会给你的宠物起一个独特的名字，写一段个性描述——每个人的宠物都是独一无二的。

写到这里，我只能说，Anthropic你还开发啥AI Coding啊，去做游戏吧，一个小小的宠物系统，就已经深得游戏公司真传啦！

这些彩蛋呢，其实也反映了Anthropic公司的一种企业文化，在严肃中带着一些幽默，在技术中带着一些温暖，其实上面这一堆彩蛋功能，直接删掉它们 Claude Code 照样能跑的很好。但正是这些“没必要”的东西，让一个AI Coding的命令行工具有了更多人情味，也有了很多的可玩性。

总结

Claude Code 在Prompt/Context/Harness几个方面的分析基本上先写就到这里了。当然，这个项目的设计理念是非常成熟且庞大的，细节点也非常多，我也没有办法在一篇文章中写的那么详细、清楚，有兴趣的朋友可以再去深入分析研究一下这个项目，才会有更深的体感。

本文通过深度挖掘 Claude Code 背后蕴含的设计哲学，知道了它的 System Prompt 是如何进行模块化拼装与解耦的；指令设计又是如何做到极致且明确的；它是如何借助上下文压缩算法以及记忆架构，确保业务系统在长周期运行中依然能维持上下文的稳定性和token爆炸；又是如何在代码生成与工具调用的关键链路中，植入严密的校验与约束逻辑，以显著提升 Agent 执行的成功率的；最后，我们也看到了很多有意思的彩蛋和巧妙的设计。

在当下这个从“用大模型”转向“用好大模型”的时间节点，如何构建一套卓越的Agent系统，驱使基座大模型稳定、高效且可控地攻克复杂、长程任务，是我们需要持续关注和努力攻克的命题。像Claude Code、OpenClaw这些经过诸多开发者们验证过的最佳实践，无疑为我们树立了一个极佳的技术标杆。

以上仅是我个人基于现阶段实践的一些粗浅思考与方法论沉淀，难免有疏漏或偏颇之处，权作抛砖引玉。AI 技术的浪潮奔涌向前，迭代速度日新月异，我们只有能始终保持敏锐的技术嗅觉，才能致力于让 Agent 技术在各自的领域里落地。而且在这个 AI 技术发展如此迅速的今天，谁也不知道未来还会有哪些令人惊喜和兴奋的技术突破在等着我们。

![](http://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1zsMO0HEywEjicRXGH5MTLyLhxbAz1qQ3U4jPFnrdGQbFPOXKYT6A4D6R48bZNzIAHDcCNyLTRBO4bnd0UrLrEtD2lWB6gKr6EE/0?wx_fmt=png) 阿里云开发者

 ![](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3C!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --%3E%3Cg fill='none' stroke='%23888888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/g%3E%3C/svg%3E) 阅读![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.154 6.797l-.177 2.758h4.009c1.346 0 2.359 1.385 2.155 2.763l-.026.148-1.429 6.743c-.212.993-1.02 1.713-1.977 1.783l-.152.006-13.707-.006c-.553 0-1-.448-1-1v-8.58a1 1 0 0 1 1-1h2.44l1.263-.03.417-.018.168-.015.028-.005c1.355-.315 2.39-2.406 2.58-4.276l.01-.16.022-.572.022-.276c.074-.707.3-1.54 1.08-1.883 2.054-.9 3.387 1.835 3.274 3.62zm-2.791-2.52c-.16.07-.282.294-.345.713l-.022.167-.019.224-.023.604-.014.204c-.253 2.486-1.615 4.885-3.502 5.324l-.097.018-.204.023-.181.012-.256.01v8.218l9.813.004.11-.003c.381-.028.72-.304.855-.709l.034-.125 1.422-6.708.02-.11c.099-.668-.354-1.308-.87-1.381l-.098-.007h-5.289l.26-4.033c.09-1.449-.864-2.766-1.594-2.446zM7.5 11.606l-.21.005-2.241-.001v8.181l2.45.001v-8.186z' fill='%23000'/%3E%3C/svg%3E) 赞 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath d='M0 0h24v24H0z'/%3E    %3Cpath fill='%23576B95' d='M13.707 3.288l7.171 7.103a1 1 0 0 1 .09 1.32l-.09.1-7.17 7.104a1 1 0 0 1-1.705-.71v-3.283c-2.338.188-5.752 1.57-7.527 5.9-.295.72-1.02.713-1.177-.22-1.246-7.38 2.952-12.387 8.704-13.294v-3.31a1 1 0 0 1 1.704-.71zm-.504 5.046l-1.013.16c-4.825.76-7.976 4.52-7.907 9.759l.007.287c1.594-2.613 4.268-4.45 7.332-4.787l1.581-.132v4.103l6.688-6.623-6.688-6.623v3.856z'/%3E  %3C/g%3E%3C/svg%3E) 分享 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cdefs%3E    %3Cpath id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-a' d='M0 0h24v24H0z'/%3E  %3C/defs%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cmask id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-b' fill='%23fff'%3E      %3Cuse xlink:href='%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-a'/%3E    %3C/mask%3E    %3Cg mask='url(%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-b)'%3E      %3Cg transform='translate(0 -2.349)'%3E        %3Cpath d='M0 2.349h24v24H0z'/%3E        %3Cpath fill='%23576B95' d='M16.45 7.68c-.954 0-1.94.362-2.77 1.113l-1.676 1.676-1.853-1.838a3.787 3.787 0 0 0-2.63-.971 3.785 3.785 0 0 0-2.596 1.112 3.786 3.786 0 0 0-1.113 2.687c0 .97.368 1.938 1.105 2.679l7.082 6.527 7.226-6.678a3.787 3.787 0 0 0 .962-2.618 3.785 3.785 0 0 0-1.112-2.597A3.687 3.687 0 0 0 16.45 7.68zm3.473.243a4.985 4.985 0 0 1 1.464 3.418 4.98 4.98 0 0 1-1.29 3.47l-.017.02-7.47 6.903a.9.9 0 0 1-1.22 0l-7.305-6.73-.008-.01a4.986 4.986 0 0 1-1.465-3.535c0-1.279.488-2.56 1.465-3.536A4.985 4.985 0 0 1 7.494 6.46c1.24-.029 2.49.4 3.472 1.29l.01.01L12 8.774l.851-.85.01-.01c1.046-.951 2.322-1.434 3.59-1.434 1.273 0 2.52.49 3.472 1.442z'/%3E      %3C/g%3E    %3C/g%3E  %3C/g%3E%3C/svg%3E) 推荐 ![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.242 7a2.5 2.5 0 0 0-2.5-2.5h-14a2.5 2.5 0 0 0-2.5 2.5v8.5a2.5 2.5 0 0 0 2.5 2.5h2.5v1.59a1 1 0 0 0 1.707.7l1-1a.569.569 0 0 0 .034-.03l1.273-1.273a.6.6 0 0 0-.8-.892v-.006L9.441 19.1l.001-2.3h-3.7l-.133-.007A1.3 1.3 0 0 1 4.442 15.5V7l.007-.133A1.3 1.3 0 0 1 5.742 5.7h14l.133.007A1.3 1.3 0 0 1 21.042 7v4.887a.6.6 0 1 0 1.2 0V7z' fill='%23000' fill-opacity='.9'/%3E%3Crect x='14.625' y='16.686' width='7' height='1.2' rx='.6' fill='%23000' fill-opacity='.9'/%3E%3Crect x='18.725' y='13.786' width='7' height='1.2' rx='.6' transform='rotate(90 18.725 13.786)' fill='%23000' fill-opacity='.9'/%3E%3C/svg%3E) 留言