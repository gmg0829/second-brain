# 系统设计面试的五大常见错误

## 内容概要

系统设计面试是软件工程师求职过程中最具挑战性的环节之一——它不仅仅考察编码能力，更是对工程师综合系统思维、架构设计能力和工程判断力的全面检验。Gaurav Sen 在本视频中基于其作为面试官和应聘者的双重经验，总结了六条（含一条额外 bonus）在系统设计面试中最容易犯的错误，其中第一条的错误本身甚至带有讽刺意味。许多候选人看过 Gaurav 的系统设计视频后，在面试中形成了一种固定的开场白模式：首先画一个大方框表示用户，然后放上负载均衡器，再连上会话服务——这套"标准开场"在每次面试的前五分钟就被机械地重复，却完全没有针对具体问题进行定制。Gaurav 坦言，Gateway 在真实系统中确实极其重要，它能隔离内外系统、引入安全性、数据限流等多项功能，但这并不意味着每次系统设计面试都需要从它开始。正确的做法是直接聚焦于系统的核心问题，根据具体场景决定哪些组件需要展开讨论。

第二个常见错误是无意义地进行容量规划（Capacity Planning）。很多候选人完成开场后就立即开始讨论系统每天会有多少活跃用户、上传多少数据，却没有任何明确的目的性。Gaurav 明确指出，容量规划的真正价值在于它可能影响架构决策——比如某个方案在数据量达到一亿用户时不可行。如果核心系统并不会因为规模问题而崩溃或不可行，就没有必要提前做大量的容量估算。正确的做法是先识别出潜在顾虑（concern），与面试官讨论并获得认同后，再进入具体的计算环节。这种"先确认必要性、再动手"的工作方式，实际上也是真实工程环境中问题解决的标准流程。

第三个错误是高级工程师也常常踩的坑：画出了微服务的方框图，却无法说清各服务之间究竟如何通信。许多候选人能设计出看似完整的微服务架构，但在被问到"内部使用什么网络协议、为什么"时哑口无言。Gaurav 以视频上传场景为例：外部通信用 HTTP，但内部服务间通信如果用 GRPC，具体带来了什么好处？网络协议的选择在真实系统中代价不菲，它直接影响延迟、吞吐量和系统整体性能。因此，对网络协议及其适用场景的深入理解，是从 Senior 工程师迈向更高职级的重要分水岭。

第四个错误是对数据库内部机制的了解严重不足。候选人在面试中经常提及 Cassandra 或 ElasticSearch 等名字，却对其内部工作原理一无所知。Gaurav 举例说，如果你对 Cassandra 的 gossip 协议等核心机制毫无概念，只知道它是一个 NoSQL 数据库，这本身就是一个危险信号（red flag）。面试官通过这个问题考察的，是你是否真正理解了自己使用的系统，并能够将这种理解泛化到新系统的构建中。例如，了解 Cassandra 的一致性哈希实现后，即使当前项目不适合用 gossip 协议，Cassandra 的其他优秀设计理念仍然可以迁移应用。

第五个错误是只谈系统"做什么"，而不讨论"放弃了什么"。Gaurav 以支付系统的邮件通知设计为例：用户完成支付后，系统需要发送邮件通知。方案A是支付服务直接触发邮件发送；方案B是通过消息队列解耦——支付服务只负责发出支付事件，由独立的邮件订阅服务从队列中读取并发送邮件。方案B带来了系统解耦的好处，但同时也引入了消息队列的成本、邮件批量发送的成本，以及自建解决方案与使用第三方付费 API 之间的权衡。知道 trade-off（权衡）存在，并能够具体分析每种方案的利弊，是系统设计面试的核心考察点——而这种能力，恰恰来源于对系统内部机制和边界条件的深度理解。

## 核心观点

**从核心向外扩展，而非从外围向内收缩：** Gaurav 最后总结的 Bonus 第六点是对所有错误的根本性纠正。系统设计面试的核心是"从核心问题出发，向外扩展"——先理解系统要解决的核心问题，把核心设计讨论清楚，再逐步引入 Gateway、容量规划等外围话题，而不是反过来。固定的通用开场白和漫无目的的容量估算，都是偏离核心的表现。

**容量规划必须服务于决策，而非展示数学功底：** 容量估算只有在可能推翻某个架构方案时才有意义。如果核心系统不会因为规模问题而崩溃，提前做大量计算只是在浪费宝贵的面试时间。先识别顾虑，再与面试官确认是否必要，最后才动手。

**网络协议是微服务架构的"真实成本"：** 在真实系统中，box 与 box 之间的通信代价是真实的。高级工程师不仅要会画架构图，还要能解释为什么选择 GRPC 而不是 HTTP，为什么某个场景需要 RTMP，以及这些选择的具体性能含义。

**Trade-off 分析能力是系统设计面试的核心：** 会使用某个技术栈和真正理解这个技术栈的局限性之间，隔着一道鸿沟。只有深入了解系统的内部机制，才能在多种方案之间做出明智的权衡选择。

## 关键语录

> "Don't have a set introduction. That's the first point. Focus on the core of the system."

> "Don't do capacity estimation without any reason. If you have a concern, first note that. Mention it to the interviewer, make it a discussion, involve them in the calculation."

> "The way that the system communicates with each other — that this box communicates with this box — is a real cost in the real world."

> "If you know nothing about how Cassandra works internally, that is a red flag. It means you used the system without having any idea of how you can generalize these learnings."

> "A system design interview is not about building a working system. It's about measuring your aptitude."

> "Stay close to the core, move outwards. And as you expand outwards, keep these things in mind."
