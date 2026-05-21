     深度解析 OpenClaw 在 Prompt / Context / Harness 三个维度中的设计哲学与实践
========================================================

原创 飞樰 阿里云开发者 2026-04-13 08:30 浙江

> 原文地址: [https://mp.weixin.qq.com/s/JycTfNd7EnmWCnJK-QCf0Q](https://mp.weixin.qq.com/s/JycTfNd7EnmWCnJK-QCf0Q)

![](https://mmbiz.qpic.cn/mmbiz_jpg/j7RlD5l5q1w64RYdWGzQqfvh23KnxRoeDyDTCQAdiboW3MWt5ClaAibokj04j5jJ3JmTXXWAqPkt9eTNpUPWeiabA4iaCK9FR0cRHGuayBw7PXk/640?wx_fmt=jpeg&from=appmsg)

阿里妹导读

  

本文的核心思路是从Prompt、Context和Harness这三个维度展开，分析OpenClaw的设计思路，提炼出其中可复用的方法论，来思考如何将这些精华的设计哲学应用到我们自己的Agent系统设计和业务落地中去。（文章内容基于作者个人技术实践与独立思考，旨在分享经验，仅代表个人观点。）

背景

2026年伊始，OpenClaw一下子就成为了AI圈“最靓的仔”了，彻底出圈，火遍了大江南北，除了科技界，很多非技术人员都参与了进来，掀起了一股全民的“养虾热”🦞。从各大厂纷纷推出基于OpenClaw或类似架构的产品，在“百模大战”之后，又出现了“百虾大战”，再到各社区里层出不穷的“养虾攻略”、“499安装OpenClaw之后再花299卸载”，这场狂欢可谓是盛况空前。

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1xja0h6aTCFuzhtZ2p4Zb8bHpc8oXknE8hjvzeTYNLyIlvI7NK07XZheQO4EiaSqAqs0sWHONAIv414JMTib56arWznItQXibicv6U/640?wx_fmt=png&from=appmsg)

然而，在这场热闹的“龙虾狂欢”背后，我更想地是要冷静下来，通过对OpenClaw源码进行剖析去思考它的设计思路，去探讨我们究竟应该从中学习什么，而不是仅仅停留在“跟风养只虾”或者“跑通一个Demo”的层面。所以，OpenClaw火了这几个月，我没有着急写文章，而是先去翻阅了它在Github官方库里的核心源码\[1\]及相关技术文章。

本质上讲，OpenClaw并不是一个突然“凭空诞生”的全新物种，它更像是将近年来Agent发展过程中沉淀的各种关键技术进行了一次系统性的集成与升华：无论是Prompt的动态组装、Context的压缩机制、Memory的管理、Agent Skills的模块化复用和渐进式披露、灵活的Hook机制、安全的Guardrail设计，还是强大的工具调用能力，尤其是将其权限边界扩展到了个人设备层面（Computer Use），都体现了这一趋势。正所谓，量变引起质变，当一些最新技术的集大成者结合到一起，会出现一些之前意想不到的效果（18年的BERT、22年底的ChatGPT、25年初的DeepSeek也是类似的情况）。而现在，这个质变的“点”变成了OpenClaw这只“小龙虾”🦞，之所以突然火出圈，还是因为它相比之前涌现出了更智能的感觉，也能做更多的事情了，让AI开始从一些普通的ChatBot或者单任务、垂类Agent一下子进化到了全面自主的、更私人助理化的强大Agent，带来了更大的“想象空间”。

同时，它在Prompt Engineering（提示词工程）、Context Engineering（上下文工程）以及新兴的Harness Engineering（驾驭工程/脚手架工程）等维度上也做了很多可值得学习和落地的工作。Prompt Engineering → Context Engineering → Harness Engineering也是现代AI系统的三大关键阶段，分别聚焦于“如何说”、“让AI看什么”以及“构建怎样的运行环境”，三者层层递进，共同致力于提升大模型在复杂任务中的可靠性与可控性‌，下图展示了三者的关系\[2\]。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1zCQTdSqjOzUg24hr0wdOhfaEeTkMbl5LicjiayNsqFasddjDibrjHXZXaaS5Am2RqcbH6uCEboEuqFEuNmbb1eMT25t7OytiaMsMo/640?wx_fmt=png&from=appmsg)

我近些时间一直在做Agent，所以我的关注重点一直是在“如何设计一个好用的Agent系统”，因此，我我不会把过多重点放在完整的项目前后端工程实现上，比如网页端、Channel、Gateway之类的内容我就不去细讲了，相关的技术架构文章也非常多，大家可以去搜索阅读。我的核心思路是从Prompt、Context和Harness这三个维度展开，分析OpenClaw的设计思路，提炼出其中可复用的方法论，来思考如何将这些精华的设计哲学应用到我们自己的Agent系统设计和业务落地中去。毕竟，技术浪潮总有起伏，在大潮来时，我们要敢于直面浪潮；而在大潮退去之时，我们更要能留下沉淀，汲取这场火热盛宴背后那些更本质、更长效的核心价值。

Prompt Engineering：动态组装与文件驱动

首先，我们先看OpenClaw最基础的Prompt Engineering（提示词工程）部分。

关于“如何写好提示词”这个话题，早在2023年就已经是各大技术社区的老生常谈了，相关的最佳实践文章数不胜数。但在今天，当我们审视像OpenClaw这样成熟的Agent系统时，会发现Prompt Engineering的内涵已经发生了质的变化：它不再仅仅是撰写一段固定的System Prompt，而是一套复杂的、动态的Prompt组装机制。

虽然从广义上讲，这些动态组装的内容都属于“Context Engineering”的范畴，但我之所以单独将Prompt Engineering拎出来分析，是因为OpenClaw在这一层的设计哲学非常值得借鉴——它将原本模糊的指令结构化、模块化，并通过外部机制实现了高效的动态注入。

**System Prompt的结构化动态组装**

现在的Agent系统中，System Prompt不再是直接书写的一段文本，虽然最终给到大模型的仍然是一个完整的System Prompt，但实际上这些Prompt是在运行的时候通过各种前置判断之后进行动态拼装而来的，其实是一个高度结构化组装而成的信息集合体。

在OpenClaw源代码src/agents/system-prompt.ts里面，我们可以看到System Prompt的细节实现，它由核心函数buildAgentSystemPrompt()构建，这个函数接收几十个参数，然后按照固定顺序，将一个个模块像搭积木一样「拼」在一起构建。

它清晰地给Agent定义了：你是谁？你的行为准则是什么？你拥有哪些可用Tools？Skills系统如何运作？必须遵守的Safety Guidelines和安全红线是什么？当前的Workspace（工作区）在哪里？沙箱状态、文档链接、系统时间等上下文信息如何加载？以及Memory Recall如何触发？长期记忆如何读取等等。

OpenClaw定义了三种提示词模式（PromptMode），适用于不同场景：

*   full（完整模式）：用于主Agent 与用户直接对话，所有模块全部加载
    
*   minimal（精简模式）：用于子Agent 执行独立任务，只保留核心模块（工具、工作区、运行时信息）
    
*   none（极简模式）：极简场景，基本上只有一行身份标识
    

为什么要做区分呢？因为 AI 的上下文窗口总归是有限的，根据不同的场景要求进行区分。

下面我将System Prompt的组装的模块大概有23个模块，完整拼接起来还是挺长的，给大家看看：

System Prompt组装过程
-----------------

    # 模块 1：身份标识 [永远存在] 

**Markdown驱动的文件注入机制**

Markdown驱动是OpenClaw比较精妙的设计之一，它通过引入了一套基于Markdown文件的配置体系，将这些关键信息从代码硬编码中解耦出来，并在运行时动态注入到System Prompt中。至于为什么要用Markdown文件来管理？我个人分析，应该主要是因为在File System（文件系统）里操作Markdown会更加方便，比纯文本TXT多了格式，能更容易刻画重点（比如标题、加粗、斜体）这些，同时又可以使用Shell或文件管理工具来管理，比如通过grep等命令就能很好的读取这些.md文件。

这套机制主要依赖以下几个核心.md文件，它们共同构成了Agent的“灵魂”与“骨架”：

*   AGENT.md（总纲）：这是Agent运行的核心规范要求。它定义了Agent的根本目标、运行逻辑以及与其他模块的交互原则。每次启动时，它是所有指令的基石。
    

AGENT.md

    # AGENTS.md - Your Workspace

*   SOUL.md（灵魂）：如果说AGENT.md是骨架，那SOUL.md就是灵魂。它详细描述了这只“龙虾”的人格特质、性格倾向、说话风格甚至价值观。这就很像演员在演戏之前拿到的一份详尽的“人物小传”，大模型一般用的都是通用模型，但是通过模仿这份“灵魂”的设定，才能呈现出千人千面的“养虾”效果。这也是为什么不同的OpenClaw实例能展现出截然不同个性的原因。
    

*   特别机制：这里还有一个有趣的约束机制——如果OpenClaw要更新修改SOUL.md，必须要通知用户，这保证了人设的稳定性和用户的知情权。
    

SOUL.md

    # SOUL.md - Who You Are

*   IDENTITY.md（身份信息）：你可以理解为这就是“龙虾”的“身份证”，它的外在标识，比如名字、类型、头像风格等。与SOUL.md侧重内在性格不同，IDENTITY.md更侧重于外在的固化信息展示。
    

IDENTITY.md

    # IDENTITY.md - Who Am I?

*   USER.md（主人档案）：记录了用户的个性化信息，包括称呼、偏好、厌恶、习惯等。正是通过对这些隐私数据的持续学习和引用，“龙虾”才能做到“越来越懂你”，实现真正的个性化服务。
    

USER.md

    # USER.md - About Your Human

*   TOOLS.md（工具清单）：动态记录当前环境下可用的工具信息及其使用说明，确保Agent知道“手里有什么武器”。
    

TOOLS.md

    # TOOLS.md - Local Notes

*   HEARTBEAT.md（心跳任务）：定义定时任务逻辑。例如每隔一段时间自动检查特定信息、刷新帖子或执行维护操作，让Agent具备“主动意识”。
    

HEARTBEAT.md

    # HEARTBEAT.md Template

*   BOOTSTRAP.md（首次启动）：有点像“出生证明”，甚至它的第一句是程序员们再熟悉不过的“Hello, World”它仅在首次启动时生效。它预设了一段引导对话，比如“你刚醒来...”，帮助新用户完成初始化设置（如起名、确立初始人设），完成之后就会自动删除。
    

BOOTSTRAP.md

    # BOOTSTRAP.md - Hello, World

*   BOOT.md（启动文件）：不同于BOOTSTRAP.md，BOOT.md会在OpenClaw启动的时候运行，这里会配合Hook机制使用，这个后面的Harness Engineering部分里会介绍。
    

BOOT.md

    # BOOT.md

*   MEMORY.md（长期记忆）：用于存储和读取跨会话的长期记忆（注：在群聊模式下通常不加载此部分，来避免泄露用户的隐私）。这个后面Context Engineering部分会介绍。
    

**“质量大于数量”的极简主义**

Prompt层面除了结构上的设计之外，OpenClaw在Prompt的措辞风格上也非常值得我们投入学习。

我们在编写提示词时，往往很容易陷入“啰嗦”导致Prompt越来越“冗长”，试图用大量的解释性语言去覆盖各种边界情况，导致token消耗巨大且重点模糊，模型也未必遵循的很好。而OpenClaw的原始Prompt展现了极高的简洁主义风格。

比如，当AGENT.md里要求在群聊的时候不要每条都回复，Prompt通过一句Quality > quantity就非常清晰的传达了“注重核心信息、拒绝废话、保证高价值输出”的复杂指令。再比如，当OpenClaw在不确定的、模糊的时候需要去询问用户，Prompt里用了一句Ask anything you're uncertain about。

很多时候都是这样，上面我把完整的Prompt都贴出来了，大家可以仔细阅读以下。这种极简主义的表达方式，极大地节省了宝贵的Context Window（上下文窗口）。当我们需要注入大量的AGENT.md、USER.md等Markdown文件的时候，每一个token都弥足珍贵。通过精简指令本身，我们为业务数据留出了更多的Context Window额度，从而可以提升整个系统的性价比和运行效率。

总得来说，OpenClaw的Prompt Engineering设计的还是比较有想法的，并不是就写个提示词那么简单，而是一场关于结构化设计、动态组装与简洁主义的“最佳实践”。它告诉我们：优秀的Prompt不是写得越长越好，而是越清晰、越模块化、越节省资源越好。

Context Engineering：扩展、压缩和记忆

如果说Prompt Engineering解决的是“大模型应该做什么和怎么做”的问题，那么Context Engineering（上下文工程） 的核心使命则是解决“如何让大模型更好地完成任务”的难题。

在Agent的实际运行中，我们面临的最大挑战并非指令不够清晰，而是上下文窗口（Context Window）的爆炸。如果一味地堆砌Prompt、历史记录和工具返回结果，不仅会导致推理耗时急剧增加、成本飙升，更会引发Lost in the Middle现象，导致模型无法遵循核心指令。因此，对上下文进行高效的压缩、管理和修剪，是构建高性能 Agent 的关键

在 OpenClaw 的架构中，Context Engineering可以从这三个核心角度来解析：可扩展的Agent Skills机制、动态的上下文压缩（Compaction）与修剪（Pruning）、以及分层的记忆存储系统（Memory）。

**可扩展的Skills机制**

首先，OpenClaw要解决的是“如何让模型掌握海量技能而不出现上下文爆炸”的问题。在这个问题下，当前业界的“最佳实践”就是Agent Skills（技能）机制，其核心理念源自Anthropic，具有高度的可复用性和渐进式披露（Progressive Disclosure）的能力。

OpenClaw默认并不具备所有能力，只有最基础的Agent能力和部分工具，像制作PPT、TTS语音合成等功能默认是不支持的，但是OpenClaw通过一个类似"App Store"的ClawHub市场\[3\] ，或者通过用户导入或自动发现第三方编写的Skill包，从而获得更多原来所没有的能力。当任务需要时，系统才将对应的Skill名称和描述注入上下文。这种机制让Agent拥有了近乎无限的能力边界，同时保证了日常运行的轻量级上下文。

当然，技术一般都是双刃剑，Skills能力的开放也给Agent带来了安全风险。由于Skill里面是包含可执行的脚本包，恶意开发者可能在其中植入病毒、后门或WebShell攻击，这就有点像用户在电脑上下载了非官方渠道的带毒APP软件一样。针对这个安全隐患，OpenClaw在近期的更新中强化了安全机制，并对 ClawHub实施了更严格的来源管控、鉴权和对未知Skills的识别，想要在“能力无限”与“运行安全”之间找到平衡点。

关于Skills机制的更多描述，我在文章《[Agent / Skills / Teams架构演进过程及技术选型之道](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247558921&idx=1&sn=3fddd356f8f072b31742f0e8be772b63&scene=21#wechat_redirect)》的“Agent Skills：可复用与渐进式的能力披露”部分已经讲得比较详细了，有兴趣的朋友可以移步此文，这里就不再赘述了。

**上下文压缩与修剪（Compaction & Pruning）**

Context Window其实一般包含三个部分：System Prompt本身、对话的完整History（包含工具调用）、Skills的各种md文件，其中System Prompt和Skills这个都是固定的内容了，很难去进行调整。那么，能够再进一步去节约token空间的，主要就是对话的History部分了。

为了在有限的Context Window内维持长对话的连贯性，OpenClaw 设计了一套对话记录的压缩与修剪策略。我举个例子，如果把对话过程比喻比为一场“开卷考试”：明确了课本学到了第50页，然后最后的45~50页是最近学习的，是必考的部分，前面40页是内容随机抽查，而你只能带10页纸进入考场，你要如何规划这10页纸的内容，来提高你的成绩呢？

比较好的一种策略是：完整保留最近必考的重点（45~50页），将前面的知识压缩成精炼的摘要（前面45页）。

上下文压缩算法（Compaction）：分块与多阶段摘要

OpenClaw在上下文的压缩这里，提供了两种触发模式：

*   手动触发：用户可通过 /compact 命令显式要求压缩，并可指定保留的关键信息，比如： /compact 请特别保留关于项目架构的讨论内容。
    
*   自动触发：这是系统的默认行为。系统会实时监控Token用量，设定一个水位线，等到当前token用量 > 上下文窗口大小 - 预留空间 时自动触发，例如：总上下文窗口20万，预留2万缓冲，当token用量> 18万时触发自动的上下文压缩Compaction。一旦触及水位线，系统会自动对早期的对话历史（如保留最近5轮，压缩之前的N-5轮）进行摘要提取，生成高信息密度的Summary，从而腾出空间给新的交互。
    

压缩过程用一个例子来看的话，如图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1zvbz9Hs420Rut62zEsLACqr6OPJP16hQsw17EMkXnXfw87KmPZw1JzcpPnuyIXibffWhpUOC9DB7FQSicqYCcG4Q4S2Ldx7wnIM/640?wx_fmt=png&from=appmsg)

在OpenClaw源代码的src/agents/compaction.ts里面，我们可以看到压缩算法的更多细节实现。

*   自适应分块：上下文压缩之前，旧消息会被切分成多个“块”（chunks），每块独立生成Summary。分块策略是自适应的：
    

分块逻辑

    关键常量：

*   摘要分层策略：模型有三种层级的Summary策略，summarizeInStages()、summarizeWithFallback()、summarizeChunks()这三个函数构成了一个分层降级的Context Summary系统，从底层执行到高层策略，确保在不同场景下都能安全完成上下文压缩。
    

摘要的分层设计

    顶层策略: summarizeInStages()

OpenClaw在生成Summary的时候，会被特别要求保留当前活跃的任务、重要的决策和结论、待办事项（TODO）、做过的承诺、所有不透明标识符（如UUID、哈希值等，必须原文保留，不能自己瞎改）。而且，在将要压缩的内容送入Summary模型之前，会先调用stripToolResultDetails()移除工具输出中的一些details的字段。这是因为工具的结果中可能包含一些冗长的内容，不适合直接送入Summary模型。

在做上下文压缩的时候，OpenClaw也考虑了一些情况，比如：

*   超时保护：压缩操作最多运行5分钟（EMBEDDED\_COMPACTION\_TIMEOUT\_MS = 300000），超时自动中止，防止压缩过程占用较多耗时影响主流程体验
    
*   写锁：压缩期间会锁定会话文件，防止并发写入导致数据损坏，这个过程要保障数据的一致性
    
*   标识符保留：默认使用identifierPolicy: "strict"，确保Summary中保留所有重要的 ID、名称等标识符
    
*   可配置压缩模型：可以用便宜的模型来做压缩（在 openclaw.json 中配置 agents.defaults.compaction.model）
    

精细化修剪（Pruning）

除了对话历史的压缩，工具调用的返回结果往往是占用上下文的“大户”。一个大型文件的读取结果或复杂的JSON或者xml格式的响应可能瞬间消耗数万token，比如在阿里云的服务域，好多API的返回结果就足以让Context Window直接爆炸。对于这个问题，OpenClaw采用了一些的精细化修剪策略，相关代码在src/agents/pi-embedded-runner/tool-result-truncation.ts文件里：

*   头尾保留，中间省略：基于经验法则，Exception、Error、Traceback等这些报错的关键信息通常位于开头和结尾，而正常的如JSON这样的数据结构的核心定义也在头部。因此，系统在检测到超长输出时，会智能地保留首尾部分，将中间内容替换为 ... 或简略标记。
    
*   止损策略：虽然这种裁剪可能在极端情况下损失部分细节，但在上下文受限的硬约束下，这是避免整体理解偏差的必要妥协。系统通常会控制裁剪比例（不超过 50%），以最大程度保留核心语义。
    

同样的，修建过程用一个例子来看的话，如图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1yNibQWnoapkHsQQDekUDkibKSSkDmCHIHgo4d79bIQeDtz6FyNciatJyib5GnVFRHa4dVTPzMpYOnOTAgSzVYAoLbuicqOTehchc3g/640?wx_fmt=png&from=appmsg)

另外，由于很多大模型的服务商提供了KV Cache缓存机制，在相同的前缀匹配（Prefix Caching）的情况下，模型会通过缓存优化推理速度，保证上下文的增长也不影响耗时和token计费。但是，这类KV Cache通常都是有个时间窗口期的，比如5~15分钟，过了这个时间段，模型还是会失去缓存，造成再次计费，并且过长的上下文会显著拖慢推理速度。基于此问题，OpenClaw引入了时间窗口优化，系统会在Cache的时间窗口过期后，主动剔除无关的旧会话片段。这不仅是节省了token，更是为了提升推理Latency，确保Agent的响应速度。

上下文压缩 vs 修剪的对比

那么，在讲完上下文压缩和修剪机制之后，我们对比一下这两者的区别：

特性

压缩（Compaction）

修剪（Pruning）

核心操作

生成Summary替换旧消息

直接删减部分工具或会话结果

信息保留

摘要保留关键信息

信息直接丢失

成本

需要调用LLM来生成摘要

规则修剪，低成本

使用场景

对话历史记录太长

工具结果占用太大或会话太多

**Memory的双层管理**

最后，是“长期记忆不丢失”的问题，我经常开玩笑说，目前大模型就像是一个“高度定时失忆患者”，每天早上起来所有记忆就“全部遗忘”。那么，想要回忆起之前发生过什么，只能通过每天记录到一个“小本本”里，在忘记的时候就读一遍（全部阅读或者按需阅读）来辅助回忆。因此，一个Agent如果想要记住东西，不忘记，Memory系统的设计至关重要。基于这个背景，OpenClaw的做法是构建了一套双层的记忆系统，将长期记忆与每日记忆分离存储。Memory的管理引擎相关代码请参阅src/memory/manager.ts，Memory工具相关代码参阅src/agents/tools/memory-tool.ts。

*   长期记忆：
    

*   长期记忆通过MEMORY.md来实现的，这个在前面Prompt Engineering的时候提到了，但没展开，这里主要是存储高价值、持久化的事实与偏好。
    
*   比如，用户常用Python的哪些库、项目的核心目标或重要事件都可以记录到这里面。这是“龙虾”的“长期核心记忆”，是一定不能忘记的信息。
    
*   MEMORY.md会被自动注入到每次对话的系统提示词中！也就是说，OpenClaw每次开始新对话时，都会先“翻看”这个文件。但有个限制：它被截断到200行之后就不再显示了（为了控制系统提示词大小）。所以 MEMORY.md应该保持精简，把最重要的信息放在前面。
    

*   每日记忆：
    

*   memory/日期.md里面存储每日的笔记，适用于比较低频、细节化的日常交互。例如某天具体写了哪段代码、聊了什么琐事。这些细节不会都记录到核心的长期记忆（防止过载），但在需要时可被追溯。
    

*   写入策略：
    

*   显式写入：用户明确指令“请记住..."时，直接调用工具写入对应文件。
    
*   隐式闪存（Memory Flush）：在会话结束、开启新 Session 或触发上下文压缩时，系统自动调用Memory Flush机制，将当前对话中的关键信息提炼并归档到相应的记忆文件中。
    

*   读取与召回：
    

*   索引构建：随着记忆的文件越来越多，全量加载已经是不可能。OpenClaw采用了一种轻量级的方案，将每日的Memory文件进行切片（Chunk），并向量化（Embedding），然后使用SQLite进行分块和索引的存储。
    
*   精准召回：
    

*   被动注入：在System Prompt组装阶段，根据当前语境自动检索最相关的记忆片段注入，召回阶段也是使用的经典配方：BM25的文本匹配 + 向量匹配双路召回。
    
*   主动搜索：当用户提及特定话题时，Agent可调用memory search工具进行深度检索。
    
*   深层钻取：若检索到的片段信息不全，Agent 还能进一步调用工具，精确读取原始文件的特定行号，实现“由点到面”的信息获取。
    

*   遗忘机制：
    

*   目前，所有的记忆文件都不会被自动删除，需人工定期清理以防止越积越多。其中的核心长期记忆文件MEMORY.md会一直保存不会衰减；而带有日期的每日笔记则具备时间衰减机制——随着时间推移，旧文件在检索中的相关性权重会逐渐降低，模拟人类的“自然遗忘”，确保记忆库始终聚焦于近期和高价值信息。下面是具体的时间衰减的逻辑：
    

OpenClaw时间衰减逻辑

    时间衰减公式：

最后，我们将这双层的记忆机制对比如下：

特性

MEMORY.md（长期记忆）

memory/日期.md（每日笔记）

文件数量

只有一个

每天一个

写入方式

整理后写入（覆盖或编辑）

追加写入（append）

内容类型

持久的事实和偏好

每日的上下文笔记

注入方式

每次对话都注入到系统提示词

只通过搜索访问

时间衰减

不衰减（“保持常青”的内容）

随时间衰减

适合记什么

比较重要的项目名称

今天讨论了API重构问题

综上所述，在Context Engineering的设计中，通过可扩展的Skills机制 + 上下文压缩&修剪 + Memory双层记忆管理，OpenClaw成功地在有限的上下文窗口内，实现了无限的知识扩展、高效的对话管理和持久的记忆保持。这正是Context Engineering的精髓所在：不是简单地堆砌数据，而是像一位经验丰富的图书管理员，懂得何时该把书放进仓库（压缩/记忆），何时该迅速抽出一本递给你（检索/注入）。

Harness Engineering：约束与引导控制

最后，我们来探讨一个最近兴起却至关重要的概念：Harness Engineering（驾驭工程/马具工程/脚手架工程，目前翻译不太统一）。

**什么是Harness Engineering**

“Harness”一词原意指“马具”，在软件工程语境下常被译为“脚手架”。2025年11月，Anthropic在\[4\] 中就提到了在长运行Agent任务中构建高效的“Harnesses”的博文。到了2026年2月，OpenAI在\[5\]文章中出现了“Harness Engineering”的说法。尽管各家大厂的定义或理解略有差异，但其核心本质高度一致：

如果说Prompt Engineering是告诉模型“做什么和怎么做（What & How）”，Context Engineering是让模型“做得更好（How Better）”，那么Harness Engineering的核心使命则是确保模型“可控地做（How Controlled）”。

我们可以用一个生动的比喻来理解：

大模型/Agent 是一匹天赋异禀的“千里马”，拥有强大的推理和执行能力。不加Harness的Agent就像在草原上自由奔跑的野马，虽然速度快，但方向不可控，随时可能偏离轨道。所以，Harness Engineering就是为这匹马套上精致的“马具”。它既让人类骑手能够稳稳地骑乘（可交互），又通过缰绳和马鞭（约束与引导）确保马匹严格按照预定路线奔跑，能在指定地点停下，也能在陷入泥潭时被拉出来。下面这张图比较形象的做了个对比：

![](https://mmbiz.qpic.cn/sz_mmbiz/j7RlD5l5q1yYXyZbDpjrlvOmhblfeNeojm4g1cUwEYMQezVMZibh7yaqRrWgCicpKEWTDN7EMrgGibpgJicbrEJBLxtG4Dqtp4AjjXGd2b8LHG0/640?wx_fmt=other&from=appmsg)

简而言之，Harness Engineering就是在大模型之外构建一套外部的运行环境与约束机制，通过接口（Interface）、钩子（Hooks）、护栏（Guardrails）等手段，约束、引导、检验、评估Agent的行为，使其能够可靠地完成复杂、长周期的任务。

**为什么我们需要Harness**

在没有 Harness 的“裸奔”模式下，Agent极易出现以下典型问题：

*   过早终止：比如AI Coding场景，模型写完代码就认为任务完成，完全不顾及代码是否有报错、是否经过测试。
    
*   缺乏反思：任务执行完毕后，没有自我验证环节，导致交付成果质量低下。
    
*   死循环陷阱：在遇到无法解决的错误时，模型可能在同一个逻辑死角里无限重试，浪费资源且无果。
    
*   高风险场景：在执行高风险操作（如删除文件、调用外部API）时缺乏必要的审批或熔断机制。
    

引入Harness后，我们将原本依赖模型“自觉”的流程，转变为强制性的工程约束。例如，在一个软件开发任务中，我们可以通过Harness来强制要求：

1.分步执行：限制每次只开发一个模块，禁止一次性生成所有代码。

2.强制测试：代码编写完成后，必须自动运行测试用例。

3.闭环修复：若测试失败，必须进入修复循环，直到通过为止。

4.最终验收：任务结束前，必须进行自我反思和完整性检查。

这种“带着镣铐跳舞”的方式，虽然增加了模型和系统运行复杂度，但却极大地提升了大模型运行的确定性和健壮性，提升了任务运行的成功率。

**Harness和Workflow有什么异同**

说到Harness是对Agent的外侧通过增加约束来保障其可控的执行，那么就有人问了：那为什么不用Workflow？Workflow不就是用来对Agent做约束的吗？Workflow也可以做到让Agent按照既定流程运行啊？在这里，我根据自己的理解，稍微介绍下这两者的区别。

之前，为了提升Agent稳定性，大家确实常会经常用Workflow来约束大模型，也有称作Agentic Workflow的方式来约束大模型，这个和Harness Engineering目标是一致的——为了限制大模型的“自由发挥”以提升可控性，但在实现逻辑和灵活性上还是有着本质的区别。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1wDLic8vlmZFNYR69Dc9LrdlfLAVZ0w7A9W8lb7m1lh5eVn2z1ZOaX6a4zd9iceLuxMSSXroPJrCia09ccNbexX3piaYyxmnGxLUHY/640?wx_fmt=png&from=appmsg)

*   Workflow约束：更多是指传统的、硬编码的业务流程编排。在这种模式下，开发者预先定义好了一条固定的执行路径（Step A → Step B → Step C），大模型仅仅被当作其中的一个“节点”，负责在既定环节中完成特定的子任务（如提取参数、生成文案、规划步骤等等）。它的优势是确定性极高、运行速度快且易于调试，但缺点也非常明显：一旦遇到预设流程之外的异常或复杂分支，整个链路容易断裂，缺乏动态调整的能力。从这里可以看出，大模型只是执行者，主导权在“人”的手里。
    
*   Harness约束：通常指基于框架的动态约束，是一种更高级的“软约束”。它不再强制规定死板的线性路径，而是为大模型提供一个包含工具集、状态记忆和反思在内的一种系统机制，这个机制叫做Harness。在这个机制内，Agent大模型依然拥有自主规划（Planning）和循环迭代（Looping）的权利，它可以自己决定调用哪些工具，如果结果不满意可以自我反思并重新尝试，或者根据上下文动态路由或调整。由此可见，Harness只是辅助AI更好地完成任务，主导权仍在“AI大模型”手里。
    

简而言之，Workflow和Harness最大的区别还是在于主导权是谁。在基础大模型越来越强的情况下，基于Workflow模式的弊端越来越大于优势，因此基于Harness的这种设计，更符合当前时间窗口的需求，能尽最大程度发挥大模型本身的能力，同时又能约束其不过于失控。

**OpenClaw中的 Harness 实践**

回到 OpenClaw，它是如何将这一理念落地的？虽然它没有显式地宣称自己构建了完整的“Harness 框架”，但其底层架构中处处体现了Harness Engineering的一些精髓：

全生命周期的Hook钩子机制

OpenClaw一个比较典型的Harness能力体现在Hook系统。这套系统允许开发者在Agent运行的关键节点插入自定义逻辑，实现“事前预防”和“事后纠偏”。

这些Hook钩子贯穿了Agent运行的全生命周期，让你能在Agent过程的关键节点去插入自定义逻辑：

钩子名称

触发时机

典型用途

`before_prompt_build`

构建提示词之前

注入额外上下文

`before_tool_call`

执行工具之前

拦截或修改工具参数

`after_tool_call`

工具执行之后

处理工具结果

`before_compaction`

上下文压缩之前

观察或标注压缩过程

`after_compaction`

上下文压缩之后

后处理

`message_received`

收到消息时

消息预处理

`message_sending`

发送消息前

消息后处理

*   实战场景：参数校验与自动纠错 以阿里云服务场景为例，大模型很容易就在对话中混淆各类实例ID格式，比如ECS的实例ID必须是以i-开头，而轻量应用服务器的实例ID是32位的数字或字母组合。
    

*   无Harness时：模型偶发会传入错误实例ID -> 工具报错 -> 对话中断或进入错误循环。
    
*   有Harness时：在before\_tool\_call阶段，可以通过Hook脚本去做实例ID的参数校验，通过正则表达式拦截参数。如果发现实例ID的格式不符，直接返回“参数错误”的提示，迫使模型进入 重新发起tool\_call来修正参数，而非盲目执行。
    

通过Harness这样的形式，将错误拦截在执行之前，大幅提升了工具调用的调用成功率，而且这个Hook可以一次配置，在调用各类工具之前的时候都能完成校验，不需要每个工具内部再单独再去做校验，非常方便。

再比如，在AI Coding场景中，可以通过Hook配置一个“强制测试器”。当模型在生成完成代码后，使自动触发语法检查或单元测试。若发现Bug，立即将错误日志反馈给模型，要求其修复，直到测试通过才允许交付。这实现了从“写完即止”到“写完必测”的质量跃迁。

安全沙箱护栏机制

随着OpenClaw能力的增强，其边界也在扩展。为了应对更复杂的安全挑战，OpenClaw在Agent运行环境做了三层独立机制的纵深防御，三层彼此独立，也彼此互补。

*   第一层：文件系统沙箱。严格限制Workspace的访问范围。模型被“禁锢”在指定目录内，任何试图访问系统根目录、修改关键配置文件或越界读取的行为都会被安全直接阻断。
    
*   第二层：命令执行沙箱。针对系统调用实施精细化管控：通过Security模式基于白名单限制可执行命令，杜绝危险指令；引入Ask模式，在关键节点暂停流程请求人工确认；设立safeBins豁免名单，平衡只读工具的执行效率与安全。
    
*   第三层：网络访问沙箱。严控数据出口，通过白名单域名控制限制OpenClaw仅能访问可信端点，防止连接恶意服务；同时建立防泄露机制，确保即便命令执行成功，敏感数据也无法流出外部环境。
    

最后，底层依托操作系统最小权限兜底：做了运行时安全管控，将安全机制解耦为独立的进程插件与可选编排服务，形成了一道坚硬的“外部骨架”。它不依赖模型自身的自我约束，而是通过系统级的强制力来保障安全。这相当于给“马匹”装上了“电子围栏”，防止其越界，同时也在下面几点做了安全防护：

*   防注入攻击：拦截恶意的Prompt注入尝试，防止模型被诱导执行非预期指令。
    
*   防越权调用：严格校验工具调用的权限边界，禁止未授权的操作。
    
*   防敏感泄露：防止敏感API Key或密码被意外输出或泄露。
    
*   防恶意篡改：监控对本地文件的写操作，防止模型被利用进行破坏性修改。
    

强约束执行与人工干预

在Prompt Engineering部分曾提到过两个md文件：HEARTBEAT.md 和 BOOTSTRAP.md，这实际上是OpenClaw定义的一套特定的任务。例如，HEARTBEAT.md里的心跳机制强制模型定期完成某些任务，就可以做固定的巡检（不过，有很多时候都是强制让龙虾去MoltBook刷帖“摸鱼”了……）。或者在BOOTSTRAP.md启动脚本阶段，强制让模型在初始化阶段完成身份确认和环境检查等等。这些都不是模型自发的行为，而是Harness强加的“规定动作”。

另外，Harness也不仅仅是自动化的规则，还包含了人机交互的接口。当模型遇到不确定情况或高风险操作时，OpenClaw会通过特定的UI或指令暂停执行，等待人类用户的明确指令，这种人在环路（Human-in-the-Loop）的“随时可接管”的能力，是Harness赋予人类对Agent的最终控制权，是避免Agent走向失控的约束手段。这一点Claude Code也是类似，几乎每一个“写类型”的操作，都一定会让人来确认，以免出现失控或错误的局面。

需要客观指出的是，Harness Engineering作为一个非常新的技术概念，今年2月才由被业界广泛关注。因此，回顾OpenClaw的早期版本，其在细粒度的Harness的约束上尚显单薄，更多依赖模型自身的“自觉”，并没有OpenAI或者Anthropic那样专门做了很多Harness Engineering的优化。

然而，技术迭代的速度远超预期。在最近的更新中，OpenClaw明显加强了Harness相关的建设，最显著的标志便是引入了严格的一些安全机制，比如对ClawHub中的Skills也做了鉴权等强管控。可以预见，随着社区对Harness Engineering理解的深入，未来OpenClaw必将引入更多细粒度的约束策略，使得“马具”更加精密，从而驾驭更复杂的业务场景。

刚开始看到Harness的时候，还是感觉比较抽象的，但是在深入到OpenClaw的具体实现中，就很容易理解到Harness Engineering的精髓，这时候你就会发现它也并非一个很虚无的概念，而是被具象化为一系列可执行、可配置的工程机制。

总的来说，这正是Harness Engineering的真谛：不要指望一匹野马能自己认路，也不要指望它能自己避开前方的“坑”。 只有给这匹“马”配上合适的“马具”，我们才能真正驾驭它，让它成为我们业务中可靠、高效、安全的得力助手。我们需要做的就是设计一套精密的“马具”和“赛道”，让Agent在安全的范围内，以最可控的方式向目标不断迈进。

总结

OpenClaw的迭代速度令人惊叹，时至今日，也在不停的更新版本号，前几天的更新还让很多“龙虾”崩掉。本文的分析主要截止到3月底的架构形态，未来必然会有更多创新的机制涌现，值得我们后面进一步追踪与学习。

然而，我们学习OpenClaw的终极目的，绝不仅仅是为了跟风“养一只虾”，体验一下AI时代的极乐趣仅此而已。更重要的是，我们要透过现象看本质，去深度思考：

*   为什么Peter Steinberger和OpenClaw的贡献者们要这样设计？
    
*   这种设计架构背后的核心原因是什么？
    
*   我们如何将这些经过验证的设计思想，迁移并应用到我们自己的业务系统中？
    

我们必须清醒地认识到，OpenClaw的形态并不一定能直接复刻到你的生产环境中。尤其是在to B的企业级场景下，我们面临着更严苛的时效性要求、数据安全红线以及可控性标准，完全照搬一个开源的“个人助理”形态往往是不现实的。

而OpenClaw真正的价值在于设计哲学，值得我们去深入学习。比如学习它的System Prompt是如何组装的，是怎么分的这些模块，Prompt是如何精简设计的；如何通过Skills机制、上下文压缩和分层记忆，让业务系统在长周期运行中保持上下文稳定，避免token爆炸；如何能在代码生成、工具执行过程中进行校验与约束，从而提升Agent运行过程的成功率。

相较于Cloud Code、Codex等闭源产品，我们只能通过黑盒推演其架构实现；而OpenClaw作为完全开源的项目，让我们有机会深入源码，抽丝剥茧地理解其每一个设计决策。在当下这个“如何用好大模型”的时代，如何构建一套优秀的架构体系，让通用的基座模型能够稳定、高效、可控地完成复杂的、长程的任务，才是我们最值得深入探讨的地方。OpenClaw为我们提供了一个非常好的学习范本，是当今AI Agent领域一次重要的技术里程碑。

本文仅是我个人基于当前阶段的一些探索与思考，一家之言，难免有疏漏之处。AI 的浪潮奔涌向前，变化日新月异，希望我们能共同保持敏锐的观察力，在潮起潮落中沉淀出真正属于我们自己的方法论，将 Agent 技术更好地落地于各自的业务土壤之中。未来已在加速狂奔，让我们一起期待并见证更多的可能。

References
==========

\[1\] OpenClaw Github库：https://github.com/openclaw/openclaw

\[2\] DEV Community：https://dev.to/ljhao/prompt-engineering-vs-context-engineering-vs-harness-engineering-whats-the-difference-in-2026-37pb

\[3\] ClawHub 官方库：https://clawhub.ai/

\[4\] Anthropic：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

\[5\] OpenAI：https://openai.com/zh-Hans-CN/index/harness-engineering/

![](http://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1zsMO0HEywEjicRXGH5MTLyLhxbAz1qQ3U4jPFnrdGQbFPOXKYT6A4D6R48bZNzIAHDcCNyLTRBO4bnd0UrLrEtD2lWB6gKr6EE/0?wx_fmt=png) 阿里云开发者

 ![](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3C!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --%3E%3Cg fill='none' stroke='%23888888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/g%3E%3C/svg%3E) 阅读![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.154 6.797l-.177 2.758h4.009c1.346 0 2.359 1.385 2.155 2.763l-.026.148-1.429 6.743c-.212.993-1.02 1.713-1.977 1.783l-.152.006-13.707-.006c-.553 0-1-.448-1-1v-8.58a1 1 0 0 1 1-1h2.44l1.263-.03.417-.018.168-.015.028-.005c1.355-.315 2.39-2.406 2.58-4.276l.01-.16.022-.572.022-.276c.074-.707.3-1.54 1.08-1.883 2.054-.9 3.387 1.835 3.274 3.62zm-2.791-2.52c-.16.07-.282.294-.345.713l-.022.167-.019.224-.023.604-.014.204c-.253 2.486-1.615 4.885-3.502 5.324l-.097.018-.204.023-.181.012-.256.01v8.218l9.813.004.11-.003c.381-.028.72-.304.855-.709l.034-.125 1.422-6.708.02-.11c.099-.668-.354-1.308-.87-1.381l-.098-.007h-5.289l.26-4.033c.09-1.449-.864-2.766-1.594-2.446zM7.5 11.606l-.21.005-2.241-.001v8.181l2.45.001v-8.186z' fill='%23000'/%3E%3C/svg%3E) 赞 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath d='M0 0h24v24H0z'/%3E    %3Cpath fill='%23576B95' d='M13.707 3.288l7.171 7.103a1 1 0 0 1 .09 1.32l-.09.1-7.17 7.104a1 1 0 0 1-1.705-.71v-3.283c-2.338.188-5.752 1.57-7.527 5.9-.295.72-1.02.713-1.177-.22-1.246-7.38 2.952-12.387 8.704-13.294v-3.31a1 1 0 0 1 1.704-.71zm-.504 5.046l-1.013.16c-4.825.76-7.976 4.52-7.907 9.759l.007.287c1.594-2.613 4.268-4.45 7.332-4.787l1.581-.132v4.103l6.688-6.623-6.688-6.623v3.856z'/%3E  %3C/g%3E%3C/svg%3E) 分享 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cdefs%3E    %3Cpath id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-a' d='M0 0h24v24H0z'/%3E  %3C/defs%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cmask id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-b' fill='%23fff'%3E      %3Cuse xlink:href='%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-a'/%3E    %3C/mask%3E    %3Cg mask='url(%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-b)'%3E      %3Cg transform='translate(0 -2.349)'%3E        %3Cpath d='M0 2.349h24v24H0z'/%3E        %3Cpath fill='%23576B95' d='M16.45 7.68c-.954 0-1.94.362-2.77 1.113l-1.676 1.676-1.853-1.838a3.787 3.787 0 0 0-2.63-.971 3.785 3.785 0 0 0-2.596 1.112 3.786 3.786 0 0 0-1.113 2.687c0 .97.368 1.938 1.105 2.679l7.082 6.527 7.226-6.678a3.787 3.787 0 0 0 .962-2.618 3.785 3.785 0 0 0-1.112-2.597A3.687 3.687 0 0 0 16.45 7.68zm3.473.243a4.985 4.985 0 0 1 1.464 3.418 4.98 4.98 0 0 1-1.29 3.47l-.017.02-7.47 6.903a.9.9 0 0 1-1.22 0l-7.305-6.73-.008-.01a4.986 4.986 0 0 1-1.465-3.535c0-1.279.488-2.56 1.465-3.536A4.985 4.985 0 0 1 7.494 6.46c1.24-.029 2.49.4 3.472 1.29l.01.01L12 8.774l.851-.85.01-.01c1.046-.951 2.322-1.434 3.59-1.434 1.273 0 2.52.49 3.472 1.442z'/%3E      %3C/g%3E    %3C/g%3E  %3C/g%3E%3C/svg%3E) 推荐 ![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.242 7a2.5 2.5 0 0 0-2.5-2.5h-14a2.5 2.5 0 0 0-2.5 2.5v8.5a2.5 2.5 0 0 0 2.5 2.5h2.5v1.59a1 1 0 0 0 1.707.7l1-1a.569.569 0 0 0 .034-.03l1.273-1.273a.6.6 0 0 0-.8-.892v-.006L9.441 19.1l.001-2.3h-3.7l-.133-.007A1.3 1.3 0 0 1 4.442 15.5V7l.007-.133A1.3 1.3 0 0 1 5.742 5.7h14l.133.007A1.3 1.3 0 0 1 21.042 7v4.887a.6.6 0 1 0 1.2 0V7z' fill='%23000' fill-opacity='.9'/%3E%3Crect x='14.625' y='16.686' width='7' height='1.2' rx='.6' fill='%23000' fill-opacity='.9'/%3E%3Crect x='18.725' y='13.786' width='7' height='1.2' rx='.6' transform='rotate(90 18.725 13.786)' fill='%23000' fill-opacity='.9'/%3E%3C/svg%3E) 留言