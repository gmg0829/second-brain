---
title: "Transcript for Jensen Huang: NVIDIA - The $4 Trillion Company & the AI Revolution | Lex Fridman Podcast #494"
source: "https://lexfridman.com/jensen-huang-transcript"
author:
  - "[[Lex Fridman]]"
published: 2026-03-24
created: 2026-03-24
description: "This is a transcript of Lex Fridman Podcast #494 with Jensen Huang. The timestamps in the transcript are clickable links that take you directly to that point in the main video. Please note that the transcript is human generated, and may have errors. Here are some useful links: Go back to this episode’s main page Watch the full YouTube version of the podcast Table of Contents Here are the loose “chapters” in the conversation. Click link to jump approximately to that part in the transcript: 0:00 – Introduction 0:33 – Extreme co-design and rack-scale engineering 3:18 – How Jensen runs"
tags:
  - "clippings"
---
This is a transcript of Lex Fridman Podcast #494 with Jensen Huang. The timestamps in the transcript are clickable links that take you directly to that point in the main video. Please note that the transcript is human generated, and may have errors. Here are some useful links:  
这是 Lex Fridman Podcast 第 494 期（嘉宾：Jensen Huang）的文字稿。文字稿中的时间戳是可点击的链接，可直接跳转到视频中的相应位置。请注意，文字稿为人工生成，可能存在错误。以下是一些实用链接：

- Go back to [this episode’s main page](https://lexfridman.com/jensen-huang/)  
	返回 [本集主页](https://lexfridman.com/jensen-huang/)
- Watch the [full YouTube version of the podcast](https://youtube.com/watch?v=vif8NQcjVf0)  
	观看 [播客的完整 YouTube 版本。](https://youtube.com/watch?v=vif8NQcjVf0)

## Table of Contents 目录

Here are the loose “chapters” in the conversation. Click link to jump approximately to that part in the transcript:  
以下是对话的大致“章节”。点击链接即可跳转到文字记录中的相应部分：

- [0:00 – Introduction 0:00 – 引言](https://lexfridman.com/jensen-huang-transcript#chapter0_introduction)
- [0:33 – Extreme co-design and rack-scale engineering  
	0:33 – 极致协同设计和机架级工程](https://lexfridman.com/jensen-huang-transcript#chapter1_extreme_co_design_and_rack_scale_engineering)
- [3:18 – How Jensen runs NVIDIA  
	3:18 – Jensen 如何运营 NVIDIA](https://lexfridman.com/jensen-huang-transcript#chapter2_how_jensen_runs_nvidia)
- [22:40 – AI scaling laws  
	22:40 – 人工智能扩展定律](https://lexfridman.com/jensen-huang-transcript#chapter3_ai_scaling_laws)
- [37:40 – Biggest blockers to AI scaling laws  
	37:40 – 人工智能扩展定律的最大障碍](https://lexfridman.com/jensen-huang-transcript#chapter4_biggest_blockers_to_ai_scaling_laws)
- [39:23 – Supply chain  
	39:23 – 供应链](https://lexfridman.com/jensen-huang-transcript#chapter5_supply_chain)
- [41:18 – Memory 41:18 – 记忆](https://lexfridman.com/jensen-huang-transcript#chapter6_memory)
- [47:24 – Power 47:24 – 权力](https://lexfridman.com/jensen-huang-transcript#chapter7_power)
- [52:43 – Elon and Colossus  
	52:43 – 埃隆和巨像](https://lexfridman.com/jensen-huang-transcript#chapter8_elon_and_colossus)
- [56:11 – Jensen’s approach to engineering and leadership  
	56:11 – 詹森的工程和领导力方法](https://lexfridman.com/jensen-huang-transcript#chapter9_jensen_s_approach_to_engineering_and_leadership)
- [1:01:37 – China 1:01:37 – 中国](https://lexfridman.com/jensen-huang-transcript#chapter10_china)
- [1:09:50 – TSMC and Taiwan  
	1:09:50 – 台积电和台湾](https://lexfridman.com/jensen-huang-transcript#chapter11_tsmc_and_taiwan)
- [1:15:04 – NVIDIA’s moat  
	1:15:04 – 英伟达的护城河](https://lexfridman.com/jensen-huang-transcript#chapter12_nvidia_s_moat)
- [1:20:41 – AI data centers in space  
	1:20:41 – 太空人工智能数据中心](https://lexfridman.com/jensen-huang-transcript#chapter13_ai_data_centers_in_space)
- [1:24:30 – Will NVIDIA be worth $10 trillion?  
	1:24:30 – 英伟达的市值会达到 10 万亿美元吗？](https://lexfridman.com/jensen-huang-transcript#chapter14_will_nvidia_be_worth_10_trillion_)
- [1:34:39 – Leadership under pressure  
	1:34:39 – 压力下的领导力](https://lexfridman.com/jensen-huang-transcript#chapter15_leadership_under_pressure)
- [1:48:25 – Video games  
	1:48:25 – 电子游戏](https://lexfridman.com/jensen-huang-transcript#chapter16_video_games)
- [1:55:16 – AGI timeline  
	1:55:16 – AGI 时间线](https://lexfridman.com/jensen-huang-transcript#chapter17_agi_timeline)
- [1:57:29 – Future of programming  
	1:57:29 – 编程的未来](https://lexfridman.com/jensen-huang-transcript#chapter18_future_of_programming)
- [2:11:01 – Consciousness 2:11:01 – 意识](https://lexfridman.com/jensen-huang-transcript#chapter19_consciousness)
- [2:17:22 – Mortality 2:17:22 – 死亡率](https://lexfridman.com/jensen-huang-transcript#chapter20_mortality)
![](https://www.youtube.com/watch?v=vif8NQcjVf0
## Introduction 介绍

Lex Fridman 莱克斯·弗里德曼 The following is a conversation with Jensen Huang, CEO of NVIDIA, one of the most important and influential companies in the history of human civilization. NVIDIA is the engine powering the AI revolution, and a lot of its success can be directly attributed to Jensen’s sheer force of will and his many brilliant bets and decisions as a leader, engineer, and innovator. This is Lex Fridman Podcast. And now dear friends, here’s Jensen Huang.  
以下是与英伟达首席执行官黄仁勋的对话。英伟达是人类文明史上最重要、最具影响力的公司之一，也是人工智能革命的引擎。英伟达的成功很大程度上归功于黄仁勋作为领导者、工程师和创新者所展现出的强大意志力和诸多卓越的决策。这里是莱克斯·弗里德曼播客。亲爱的朋友们，现在请黄仁勋上台。

## Extreme co-design and rack-scale engineering极致的协同设计和机架级工程

Lex Fridman 莱克斯·弗里德曼 You’ve propelled NVIDIA into a new era in AI, moving beyond his focus on chip scale design to now rack scale design.  
你带领英伟达进入了人工智能的新时代，从专注于芯片级设计转向了机架级设计。

Lex Fridman 莱克斯·弗里德曼 And I think it’s fair to say that winning for NVIDIA for a long time used to be about building the best GPU possible, and you still do, but now you’ve expanded that to extreme co-design of GPU, CPU memory, networking, storage, power cooling, software, the rack itself, the pod that you’ve announced, and even the data center. So let’s talk about extreme co-design. What is the hardest part of co-designing a system with that many complex components and design variables?  
我认为可以公平地说，NVIDIA 长期以来的成功之道在于打造尽可能最好的 GPU，现在依然如此，但你们已经将这种理念扩展到 GPU、CPU 内存、网络、存储、电源散热、软件、机架本身、你们发布的 pod，甚至数据中心等各个组件的极致协同设计。那么，我们来谈谈极致协同设计。对于一个包含如此多复杂组件和设计变量的系统来说，协同设计中最难的部分是什么？

Jensen Huang 黄仁森 Yeah, thanks for that question. So first of all, the reason why extreme co-design is necessary is because the problem no longer fits inside one computer to be accelerated by one GPU. The problem that you’re trying to solve is you would like to go faster than the number of computers that you add. So you added 10,000 computers, but you would like it to go a million times faster. Then all of a sudden you have to take the algorithm, you have to break up the algorithm, you have to refactor it, you have to shard the pipeline, you have to shard the data, you have to shard the model. Now all of a sudden when you distribute the problem this way, not just scaling up the problem, but you’re distributing the problem, then everything gets in the way.  
好的，谢谢你的提问。首先，之所以需要极致的协同设计，是因为问题已经无法用一台计算机或单个 GPU 加速解决。你要解决的问题是，你希望速度比增加的计算机数量更快。假设你增加了 1 万台计算机，但你希望速度提升一百万倍。那么，你突然需要对算法进行拆分、重构，对管道、数据和模型进行分片。当你以这种方式分散问题时——不仅仅是扩展问题规模，而是分散问题本身——所有因素都会相互干扰。

Jensen Huang 黄仁森 This is the Amdahl’s law problem where the amount of speed up you have for something depends on how much of the total workload it is. And so if computation represents 50% of the problem, and I sped up computation infinitely like a million times, you know, I only sped up the total workload by a factor of two. Now all of a sudden, not only do you have to distribute a computation, you have to shard the pipeline somehow. You also have to solve the networking problem because you’ve got all of these computers are all connected together. And so distributed computing at the scale that we do, the CPU is a problem, the GPU is a problem, the networking is a problem, the switching is a problem. And distributing the workload across all these computers is a problem.  
这就是阿姆达尔定律的问题，即某项任务的加速程度取决于它在整个工作负载中所占的比例。例如，如果计算任务占整个问题的 50%，即使我将计算速度无限提升一百万倍，也只能使整个工作负载的加速程度翻倍。现在，你不仅需要分布式计算，还需要以某种方式对流水线进行分片。此外，你还需要解决网络问题，因为所有这些计算机都是连接在一起的。因此，在我们这种规模的分布式计算中，CPU 是个问题，GPU 是个问题，网络是个问题，交换机也是个问题。将工作负载分配到所有这些计算机上也是个问题。

Jensen Huang 黄仁森 It’s just a massively complex computer science problem. And so we just gotta bring every technology to bear. Otherwise, we scale up linearly or we scale up based on the capabilities of Moore’s Law, which has largely slowed because Dennard scaling has slowed.  
这的确是一个极其复杂的计算机科学问题。所以我们必须调动所有技术手段。否则，我们只能线性扩展，或者根据摩尔定律的能力进行扩展，而摩尔定律的扩展速度已经大幅放缓，因为丹纳德扩展速度已经下降。

## How Jensen runs NVIDIAJensen 如何运营英伟达

Lex Fridman 莱克斯·弗里德曼 I’m sure there’s trade-offs there. Plus you have a complete disparate disciplines here. I’m sure you have specialists in each one of these high bandwidth memory, the network and the NVLink, the NICs, the optics and the copper that you’re doing, the power delivery, the cooling, all of that. I mean, there’s like world experts in each of those. How do you get ’em in a room together to figure out-  
我确信这里面肯定有权衡取舍。而且这里涉及的学科完全不同。我相信你们每个领域都有专家，比如高带宽内存、网络和 NVLink、网卡、光模块和铜缆、电源传输、散热等等。我的意思是，每个领域都有世界级的专家。你们怎么把他们聚在一起，共同探讨解决方案呢？

Jensen Huang 黄仁森 That’s why my staff is so large. Yeah.  
这就是我的员工人数这么多的原因。是的。

Lex Fridman 莱克斯·弗里德曼 What’s the pro- can you take me through the process of the specialists and the generalists? Like how do you put together the rack when you know the s- the set of things you have to shove into a rack together? Like what does that process look like of designing it all together?  
专业技能是什么？你能给我讲解一下专家和通才的工作流程吗？比如，当你知道需要把哪些东西放进货架上时，该如何组装货架？整个设计过程是怎样的？

Jensen Huang 黄仁森 Yeah. There’s the first question, which is: what is extreme co-design? We’re optimizing across the entire stack of software from architectures to chips, to systems, to system software, to the algorithms, to the applications. That’s one layer. The second thing that you and I just talked about goes beyond CPUs and GPUs and networking chips and scale up switches and scale out switches. And then of course, you gotta include power and cooling and all of that because all these computers are extremely power hungry. They do a lot of work and they’re very energy efficient, but they in aggregate still consume a lot of power. And so that’s one. The first question is, what is it?  
是的。第一个问题是：什么是极致协同设计？我们正在对整个软件栈进行优化，从架构到芯片，再到系统、系统软件、算法和应用程序。这是其中一层。你我刚才谈到的第二点，则超越了 CPU、GPU、网络芯片、纵向扩展交换机和横向扩展交换机。当然，你还得考虑电源、散热等等，因为所有这些计算机都非常耗电。它们虽然工作量很大，而且能效很高，但总体而言仍然消耗大量电力。所以，这是第一点。第一个问题是，它到底是什么？

Jensen Huang 黄仁森 The second question is, why is it, and we just spoke about the reason, you know you want to distribute the workload so that you can exceed the benefit of just increasing the number of computers. And the, and then the third question is, how is it, how do you do it?  
第二个问题是，为什么？我们刚才也谈到了原因，你知道，你想分散工作负载，这样才能获得比单纯增加计算机数量更大的收益。然后，第三个问题是，如何做到？

Jensen Huang 黄仁森 And, and that’s the, that’s kind of the miracle of this company. You know, when you’re designing a computer, you have to have an operating system of computers. When you’re designing a company, you should first think about what is it that you want the company to produce. You know, I see a lot of companies’ organization charts, and they all look the same. Hamburger organization charts, soft organization charts, and car company organization charts. They all look the same. And it doesn’t make any sense to me. You know, the goal of a comp- of a company is to be the machinery, the mechanism, the system that produces the output. And that output is the product that we like to create. It is also designed, the architecture of the company should reflect the environment by which it exists.  
而这正是这家公司的奇迹所在。你知道，设计电脑时，你必须要有操作系统。设计公司时，首先应该思考的是公司想要生产什么。我见过很多公司的组织结构图，它们看起来都一样。汉堡包式的组织结构图、软性组织结构图，还有汽车公司的组织结构图，都千篇一律。这让我很费解。你知道，公司的目标在于成为生产产品的机器、机制和系统。而这个产品就是我们想要创造的产品。公司的架构也应该反映其所处的环境。

Jensen Huang 黄仁森 It almost directly says what you should do with the organization. My direct staff is 60 people. You know, I don’t have one-on-ones with ’em because it’s impossible. You can’t have 60 people on your staff if you’re, you know, gonna get work done and-  
它几乎直接说明了你应该如何管理组织。我的直接下属有 60 人。你知道，我不可能和他们一对一谈话，因为这根本不可能。如果你想把工作做好，就不能让 60 个人同时工作——

Lex Fridman 莱克斯·弗里德曼 So you still have 60 reports. You still have across-  
所以你还有 60 份报告。你还有跨……

Jensen Huang 黄仁森 More, yeah.  
是的，更多。

Lex Fridman 莱克斯·弗里德曼 More. And most stars at least have a foot in engineering.  
更多。而且大多数明星至少都与工程学有一定联系。

Jensen Huang 黄仁森 Almost all of them. There’s experts in memory, there’s experts in CPUs, there’s experts in optical. All-  
几乎所有人。有内存方面的专家，有 CPU 方面的专家，有光驱方面的专家。所有——

Lex Fridman 莱克斯·弗里德曼 That’s incredible.  
真是不可思议。

Jensen Huang 黄仁森 Yeah, GPUs and- Architecture, algorithms, design-  
是的，GPU 以及架构、算法、设计——

Lex Fridman 莱克斯·弗里德曼 So, you constantly have an eye on the entire stack, and you’re having to have, like, intense discussions about the design of the entire stack?  
所以，你们要时刻关注整个技术栈，并且需要就整个技术栈的设计进行深入的讨论？

Jensen Huang 黄仁森 And no conversation is ever one person. That’s why I don’t do one-on-ones. We present a problem and all of us attack it. You know, because we’re doing extreme co-design. And literally, the company is doing extreme co-design all the time.  
而且，任何对话都不是一个人的。这就是为什么我不做一对一谈话。我们提出问题，然后大家一起解决。你知道，因为我们做的是极致的协同设计。实际上，公司一直在做极致的协同设计。

Lex Fridman 莱克斯·弗里德曼 So, even if you’re talking about a particular component, like cooling, networking, everybody’s listening in?  
所以，即使你谈论的是某个特定组件，比如散热、网络，所有人都会听吗？

Jensen Huang 黄仁森 Yeah, exactly.  
没错，正是如此。

Lex Fridman 莱克斯·弗里德曼 And they can contribute, “Well, this doesn’t work for the power distribution. This doesn’t-“  
他们还可以提出：“嗯，这种电力分配方式行不通。这种方式不行——”

Jensen Huang 黄仁森 Exactly.  
没错。

Lex Fridman 莱克斯·弗里德曼 “… This doesn’t work for the memory. This doesn’t work for this.”  
“……这对内存不起作用。这对这个不起作用。”

Jensen Huang 黄仁森 Exactly. And whoever wants to tune out, tune out. You know what I’m saying? And the reason for that is because the people who are on the staff, they know when to pay attention. There’s supposed… You know, it’s something they could have contributed to, they didn’t contribute to, “I’m going to call them out.” You know? And so, “Hey, come on, let’s get in here.”  
没错。谁想走神就走神吧。你明白我的意思吗？原因在于，工作人员知道什么时候该注意。有些事他们本来可以参与，但他们没有，比如“我要指出他们的错误”。你知道吗？所以，“嘿，来吧，咱们进去看看。”

Lex Fridman 莱克斯·弗里德曼 So, as you mentioned, NVIDIA is this company that’s adapting to the environment. So, which point can you say, did the environment change and began adapting sort of secretly- … in the early days from GPU for gaming, maybe the early deep learning revolution to we’re now going to start thinking of it as an AI factory? What does NVIDIA do? It produces AI; let’s build a factory that makes AI.  
正如您所说，NVIDIA 是一家不断适应环境的公司。那么，您认为环境是从什么时候开始发生变化，NVIDIA 又是如何悄然做出调整的呢？……从早期 GPU 用于游戏，到早期深度学习革命，再到现在我们开始将其视为人工智能工厂？NVIDIA 的业务是什么？它生产人工智能；让我们建造一座生产人工智能的工厂。

Jensen Huang 黄仁森 I could reason through that systematically. We started out as an accelerator company. But the problem with accelerators is that the application domain’s too narrow. It has the benefit of being incredibly optimized for the job. You know, any specialist has that benefit. The problem with intense specialization is that, of course, your market reach is narrower, but that’s even fine. The problem is, the market size also dictates your R&D capacity. And your R&D capacity ultimately dictates the influence and impact that you can possibly have in computing. And so, when we first started out as an accelerator, very specific accelerator, we always knew that was going to be our first step.  
我可以系统地分析这个问题。我们最初是一家加速器公司。但加速器的问题在于其应用领域过于狭窄。它的优势在于针对特定任务进行了高度优化。你知道，任何专业公司都具备这种优势。高度专业化的问题在于，当然，你的市场覆盖范围会更窄，但这本身并没有什么问题。问题在于，市场规模也决定了你的研发能力。而你的研发能力最终决定了你在计算机领域可能产生的影响力。因此，当我们最初作为一家非常专业的加速器起步时，我们始终清楚这将是我们的第一步。

Jensen Huang 黄仁森 We had to find a way to become accelerated computing. But the problem is, when you become a computing company, it’s too general purpose and it takes away from your specialization. The tur- I connected two words that actually have fundamental tension. The better computing company we become, the worse we became as a specialist. The more of a specialist, the less capacity we have to do overall computing. And so, that… And I connected those two words together on purpose, that the company has to find that really narrow path, step by step by step, to expand our aperture of computing, but not give up on the most important specialization that we had. Okay, so the first step that we took beyond acceleration was we invented a programmable pixel shader.  
我们必须找到一条通往加速计算的道路。但问题是，当你成为一家计算公司时，你的业务就过于通用，从而削弱了你的专业性。我把两个实际上存在根本矛盾的词放在一起。我们越是成为一家优秀的计算公司，我们作为专业公司的能力就越弱。我们越是专业化，我们进行整体计算的能力就越弱。所以……我特意把这两个词放在一起，公司必须找到一条真正狭窄的道路，一步一步地拓展我们的计算范围，但又不能放弃我们最重要的专业领域。好的，所以我们超越加速计算的第一步是发明了一种可编程像素着色器。

Jensen Huang 黄仁森 So, that was the first step towards programmability. It was our first journey towards moving into the world of computing. The second thing that we did was we created, we put FP32 into our shaders. That FP32 step, IEEE-compatible FP32, was a huge step in the direction of computing. It was the reason why all of the people who were working on stream processors and, you know, other types of data flow processors discovered us. And they said, “Hey, all of a sudden, you know, we might be able to use this GPU that’s incredibly computationally intensive, and it’s now, you know, compliant with IEEE.”  
所以，这是我们迈向可编程性的第一步，也是我们进入计算领域的第一步。我们做的第二件事是创建了 FP32，并将它集成到着色器中。这一步，即 IEEE 兼容的 FP32，是朝着计算方向迈出的一大步。正因如此，所有从事流处理器和其他类型数据流处理器开发的人员都发现了我们。他们说：“嘿，突然之间，我们或许可以使用这款计算能力极其强大的 GPU，而且它现在符合 IEEE 标准了。”

Jensen Huang 黄仁森 I can take my software that I was writing, you know, previously on CPUs, and I can see about using the GPU for that. And which led us to create, put C on top of FP32, what’s called, we call Cg. The Cg path took us to eventually CUDA. CUDA, step by step by step we… Well, the putting CUDA on GeForce, that was a strategic decision that was very, very hard to do, because it cost the company enormous amounts of our profits, and we couldn’t afford it at the time. But we did it anyway because we wanted to be a computing company. A computing company has a computing architecture. A computing architecture has to be compatible across all of the chips that we build.  
我可以把我之前在 CPU 上编写的软件，尝试用 GPU 来运行。这促使我们开发了基于 FP32 的 C 语言，我们称之为 Cg。Cg 最终引领我们走向了 CUDA。CUDA，一步一步地……嗯，把 CUDA 集成到 GeForce 显卡上，这是一个非常非常艰难的战略决策，因为它让公司损失了巨额利润，而我们当时根本负担不起。但我们还是这么做了，因为我们想成为一家计算机公司。一家计算机公司必须拥有自己的计算架构。而计算架构必须与我们生产的所有芯片兼容。

Lex Fridman 莱克斯·弗里德曼 Can you take me through that decision? So, putting CUDA on GeForce, could not afford to do? Can you explain that decision? Why boldly choose to do that anyway? Can you explain that decision?  
你能详细解释一下这个决定吗？所以，在 GeForce 显卡上加入 CUDA，是你们负担不起的？你能解释一下这个决定吗？为什么你们当时会如此大胆地选择这样做？你能解释一下这个决定吗？

Jensen Huang 黄仁森 Yeah, excellent. That was… I would say that that was the first strategic decision that is as close to an existential threat.  
是的，太好了。那……我想说，那是第一个最接近生存威胁的战略决策。

Lex Fridman 莱克斯·弗里德曼 For people who don’t know, it turned out to be, spoiler alert, one of the most incredibly brilliant decisions ever made by a company. So, CUDA turned out to be an incredible foundation for computation in this AI infrastructure world. So, so- … just setting the context. It turned out to be a good decision.  
对于那些不了解情况的人来说，剧透一下，这最终成为了公司有史以来最英明的决定之一。CUDA 最终成为了人工智能基础设施领域计算能力的强大基石。所以，所以……我只是想交代一下背景。事实证明，这是一个明智的决定。

Jensen Huang 黄仁森 Yeah, it turned out to have been a good decision. I think the… So, here’s the way it went. So, we invented this thing called CUDA, and it expanded the aperture of applications that we can accelerate with our accelerator. The question is, how do we attract developers to CUDA? Because a computing platform is all about developers. And developers don’t come to a computing platform just because, you know, it could perform something interesting. They come to a computing platform because the install base is large. Because a developer, like anybody else, wants to develop software that reaches a lot of people. So, the install base is, in fact, the single most important part of an architecture. The architecture could attract enormous amounts of criticism.  
是的，事实证明这是个明智的决定。我认为……事情是这样的。我们发明了 CUDA，它扩展了我们加速器能够加速的应用范围。问题是，我们如何吸引开发者使用 CUDA？因为计算平台的核心在于开发者。开发者选择某个计算平台，并非仅仅因为它能实现一些有趣的功能。他们选择该平台是因为其庞大的用户群。因为开发者和其他人一样，都希望开发出能够触达大量用户的软件。所以，用户群实际上是架构中最重要的一部分。架构本身可能会招致大量的批评。

Jensen Huang 黄仁森 For example, no architecture has ever attracted more criticism than the x86… you know, as a less than elegant architecture, but yet it is the defining architecture of today. It gives you an example that in fact so many RISC architectures which were beautifully architected, incredibly well-designed by some of the brightest computer scientists in the world, largely failed. And so I’ve given you two examples where one is, you know, one is elegant, the other one’s barely aesthetic, and so yet x86 survived and the reason for-  
例如，没有任何一种架构比 x86 架构招致了更多批评……你知道，它被认为是一种不够优雅的架构，但它却是当今的标志性架构。这说明，事实上，许多由世界上最杰出的计算机科学家精心设计的 RISC 架构，尽管架构精美，却大多以失败告终。所以我举了两个例子，一个优雅，另一个则几乎称不上美观，但 x86 架构却存活了下来，原因在于——

Lex Fridman 莱克斯·弗里德曼 Install base is everything.  
用户基数决定一切。

Jensen Huang 黄仁森 Install base defines an architecture. Not… Everything else is secondary, okay? And so there were other architectures at the time. CUDA came out, OpenCL was here. There were… You know, there’s several other competing architectures. But the thing that… The decision that we made that was good was we said, “Hey, look, ultimately it’s about install base and what is the best way we could get a new computing architecture into the world?” By that timeframe, GeForce had become successful.  
安装基础决定了架构。不是……其他一切都是次要的，明白吗？当时确实存在其他架构。CUDA 出现了，OpenCL 也出现了。你知道，还有其他几种竞争架构。但我们做出的明智决定是：“嘿，归根结底，关键在于安装基础，以及我们如何才能以最佳方式将新的计算架构推向市场。” 到那时，GeForce 已经取得了成功。

Jensen Huang 黄仁森 We were already selling millions and millions of GeForce GPUs a year, and we said, “You know, we, we ought to put CUDA on GeForce and put it into every single PC whether customers use it or not, and use it as a starting point of cultivating our install base.” Meanwhile, we’ll go and attract developers, and we went to universities and wrote books and taught classes and put CUDA everywhere. And eventually people discover… And at the time, the PC was the primary computing vehicle. There was no cloud, and we could put a supercomputer in the hands of every researcher in school, every scientist, you know, every engineering school, every… or every student in school, and eventually something amazing will happen.  
当时我们每年已经卖出数百万块 GeForce GPU，于是我们说：“我们应该把 CUDA 集成到 GeForce 显卡里，装进每一台 PC，不管用户用不用，都把它作为拓展用户群的起点。”与此同时，我们开始吸引开发者，我们走进大学，写书，开课，把 CUDA 推广到各个角落。最终人们会发现……当时，PC 是主要的计算工具。还没有云计算，我们可以把超级计算机送到每个学校的研究人员、每个科学家、每个工程学院的学生手中，最终奇迹就会发生。

Jensen Huang 黄仁森 Well, the problem was CUDA increased our cost of that GPU, which is a consumer product, so tremendously, it completely consumed all of the company’s gross profit dollars. And so at the time, the company was probably, you know, worth, I don’t know, at the time, eight… Was it like $8 billion or something? Like six, $7 billion or something like that. After we launched CUDA, I recognized that it was going to add so much cost, but it was something we believed in. You know, our market cap went down to like one and a half billion dollars. And so we were down there for a while and we clawed our way back slowly, but we carried CUDA on GeForce. I always say that NVIDIA is the house that GeForce built, because it was GeForce that took CUDA out to everybody.  
问题在于，CUDA 大幅增加了我们 GPU 的成本，而 GPU 是消费级产品，成本增加之大，几乎吞噬了公司所有的毛利润。当时，公司的市值大概是……呃，大概 80 亿美元吧？或者 60 亿美元、70 亿美元左右。CUDA 发布后，我意识到它会增加很多成本，但我们仍然坚信它的价值。结果，我们的市值跌到了 15 亿美元左右。我们一度陷入低谷，然后慢慢地艰难复苏，但我们始终坚持在 GeForce 平台上使用 CUDA。我常说，NVIDIA 是 GeForce 一手打造的，因为正是 GeForce 将 CUDA 带给了所有人。

Jensen Huang 黄仁森 Researchers, scientists, they discovered CUDA on GeForce because they were all, you know… Many of ’em were gamers. Many of them built their own PCs anyways. In a university lab, many of them built clusters themselves, you know, using PC components. And, and so that, you know, that’s kind of how we got going.  
研究人员、科学家们在 GeForce 显卡上发现了 CUDA，因为他们都是游戏玩家。他们中的许多人本来就自己组装电脑。在大学实验室里，他们中的许多人用电脑组件搭建集群。所以，你知道，这就是我们开始做 CUDA 的缘由。

Lex Fridman 莱克斯·弗里德曼 And then that became the platform and the foundation for the deep learning revolution.  
然后，它成为了深度学习革命的平台和基础。

Jensen Huang 黄仁森 That was also another great, great observation. Yeah.  
那也是一个非常棒的见解。是的。

Lex Fridman 莱克斯·弗里德曼 That existential moment, do you remember… Like, what were those meetings like? What were those discussions like, deciding as a company, risking everything?  
你还记得那个决定成败的时刻吗……比如，那些会议是什么样的？那些讨论是什么样的？作为一个公司，我们要做决定，冒着一切风险？

Jensen Huang 黄仁森 Well I had to make it clear to the board what we’re trying to do, and the management team knew our gross margins were gonna get crushed. So you could imagine a world where GeForce would carry the burden of CUDA and none of the gamers would appreciate it and none of the gamers would pay for it. You know, they only pay certain price and it doesn’t matter what your cost is. And so the… You know, we increased our cost by 50% and that consumed… And we were a 35% gross margin company, and so it was a… It was quite a difficult decision to make. But you could imagine that someday this would go into workstations and it would go into supercomputers and in those segments, maybe we can capture more margin.  
我必须向董事会明确说明我们的目标，管理团队也知道我们的毛利率会大幅下降。你可以想象一下，如果 GeForce 承担 CUDA 的重担，而玩家们既不会欣赏它，也不会为此买单，那会是怎样一番景象。你知道，他们只会支付固定的价格，成本多少对他们来说无关紧要。所以……你知道，我们的成本增加了 50%，这消耗了……而我们原本的毛利率只有 35%，所以……这是一个非常艰难的决定。但你可以想象，未来这项技术可能会应用到工作站和超级计算机领域，在这些领域，或许我们能获得更高的利润。

Jensen Huang 黄仁森 So you could reason your way into being able to afford this, but it still took… It took a decade.  
所以你可以通过理性思考来负担得起这笔钱，但这仍然需要……需要十年时间。

Lex Fridman 莱克斯·弗里德曼 But that, but that’s more of, like, conversation with the board convincing them, but you psychologically- … as NVIDIA’s continued to make bold bets that predict the future, and in part, especially now, define the future. So I’m almost looking for wisdom about how you’re able to make those decisions, to make leaps- … like that as a company.  
但是，这更像是与董事会的对话，说服他们，而你从心理上来说……随着英伟达不断进行大胆的押注，预测未来，并且在某种程度上，尤其是在现在，定义了未来。所以我几乎是在寻求智慧，想知道你们是如何做出这些决定，如何作为一个公司实现这样的飞跃的。

Jensen Huang 黄仁森 Well, first of all, I’m informed by a lot of curiosity. At some point, there’s a reasoning system that convinces me so clearly this outcome will happen. That this will happen. And so I believe it in my mind, and when I believe it in my mind, you know how it is. You manifest a future and that future is so convincing, there’s no way it won’t happen. There’s a lot of suffering in between, but you’ve gotta believe what you believe.  
首先，我很大程度上是出于好奇心。在某个时刻，我会形成一套逻辑体系，让我确信某个结果一定会发生，这件事一定会发生。所以我会在心里相信它，你知道，当我心里相信的时候，事情就是这样。你想象出一个未来，而这个未来如此令人信服，它就一定会发生。中间会经历很多苦难，但你必须相信你所相信的。

Lex Fridman 莱克斯·弗里德曼 So you, you, you envision the future- … and you essentially, from a sort of engineering perspective, manifest it?  
所以，你，你，你设想未来——……然后你基本上是从某种工程角度将其变为现实？

Jensen Huang 黄仁森 Yeah. And you reason about how to get there. You reason about why it must exist. And you know, I reason… We all reason it here. The management team would reason about it. All the people that I… We spend a lot of time reasoning about it. The thing that… The next part of it is probably a skill thing, which is, you know, oftentimes in leadership the leadership stays quiet or they learn about something, and then they do some manifesto, and it’s a brand-new year, and somehow at the end of the year, next year, we’re gonna have a brand-new plan. Big huge layoff this way, big huge organization change this way, new mission statement… brand new logos, you know, that kind of stuff.  
是的。你会思考如何实现目标。你会思考它存在的意义。你知道，我思考……我们这里所有人都会思考这个问题。管理团队也会思考这个问题。所有和我在一起的人……我们花了很多时间思考这个问题。接下来要说的可能是一种技能，你知道，在领导层中，领导者常常保持沉默，或者他们了解了一些事情，然后他们发布一些宣言，新的一年开始了，不知怎么的，到了年底，明年，我们就会有一个全新的计划。大规模裁员，大规模组织变革，新的使命宣言……全新的标志，你知道，诸如此类。

Jensen Huang 黄仁森 We’ve just never, I never do things that way. When I learn about something and it’s starting to influence how I think, I’ll make it very clear to everybody near me that, you know, this is interesting. This is going to make a difference. This is going to impact that. And I reason about things step by step by step. Oftentimes, I’ve already made up my mind, but I’ll take every possible opportunity—external information, new insights, new discoveries, new engineering revelations, new milestones developed—I’ll take those opportunities and I’ll use it to shape everybody else’s belief system. And I’m doing that literally every single day. I’m doing that with my board, I’m doing that with my management team, I’m doing that with my employees.  
我从来不那样做事。当我了解到某件事，并且它开始影响我的想法时，我会非常清楚地告诉身边的每个人，这件事很有意思，它会产生影响，它会带来一些改变。我会一步一步地思考问题。很多时候，我已经有了决定，但我会抓住每一个机会——外部信息、新的见解、新的发现、新的工程突破、新的里程碑——我会利用这些机会来塑造其他人的信念体系。我每天都在这样做。我与董事会这样做，与我的管理团队这样做，与我的员工这样做。

Jensen Huang 黄仁森 I’m trying to shape their belief systems such that when I come the day I say, “Hey, let’s buy Mellanox,” it’s completely obvious to everybody that we absolutely should. On the day that I said, “Hey guys, let’s go all in on deep learning,” and let me tell you why. I’ve already been laying down the bricks to different organizations inside the company. Every organization and everybody, many of the people might have heard everything. Most of the company hears, of course, pieces of it. And on the day that I announce it, everybody’s kind of bought in to many pieces of it.  
我正在努力塑造他们的信念体系，这样，当我宣布“嘿，我们收购 Mellanox 吧”的时候，每个人都会毫不犹豫地认为我们绝对应该这么做。就像我宣布“嘿，伙计们，让我们全力投入深度学习”那天一样，让我来解释一下原因。我已经在公司内部各个部门铺垫了一番。每个部门、每个人，很多人可能都听到了全部内容。当然，公司里的大多数人都听到了部分内容。所以，当我正式宣布的时候，大家基本上都认同了其中的大部分内容。

Jensen Huang 黄仁森 And in a lot of ways, I like to announce these things, and I imagine that the employees are kind of saying, “You know, Jensen, what took you so long?” And in fact, I’ve been shaping their belief system for some time, and therefore leadership. Sometimes it looks like you’re leading from behind, but you’ve been shaping their, you know, to the point where on the day that I declared it, 100% buy-in. But that’s what you want. You want to bring everybody along. Otherwise, we announce something about deep learning and everybody goes, “What are you talking about?” You know, you announce something about let’s go all in on this thing, and your management team, your board, your employees, your customers, they’re kind of like, “Where’s this coming from?”  
在很多方面，我喜欢宣布这些事情，我猜员工们会说：“詹森，你怎么才宣布？” 事实上，我已经塑造他们的信念体系一段时间了，因此也塑造了他们的领导力。有时候看起来好像你在幕后领导，但实际上你已经在潜移默化地影响他们，直到我宣布那天，他们百分之百地认同。但这正是你想要的。你想让每个人都参与进来。否则，如果我们宣布要全面投入深度学习，每个人都会问：“你在说什么？” 你知道，如果你宣布要全力投入，你的管理团队、董事会、员工、客户都会问：“这到底是怎么回事？”

Jensen Huang 黄仁森 You know, this is insane.” And so, so GTC effect, if you go back in time, you look at, look at the keynotes, I’m also shaping the belief system of my partners in the industry and, and I’m using that to shape, you know, the belief system of my own employees. And, and, and so by the time that I announce something, like for example, we just announ- we just announced Grok. We’ve been late… I’ve been talking about the stepping stones for two and a half years. You just go back and go, “Oh my gosh, they’ve been talking about it for two and a half years.” And so I’ve been laying the foundation step by step by step, so when the time comes you announce it, everybody’s saying, “You know, what took you so long?”  
你知道，这太疯狂了。” 所以，GTC 效应，如果你回顾过去，看看那些主题演讲，你会发现我同时也在塑造着行业合作伙伴的信念体系，并且我也在利用这种信念体系来塑造我自己的员工的信念体系。所以，当我宣布一些事情的时候，比如我们刚刚宣布的 Grok，我们已经晚了……我已经谈论这些垫脚石两年半了。你回过头来看，你会惊呼：“我的天哪，他们已经谈论了两年半了。” 所以我一直在一步一步地打基础，所以当时机到来，你宣布的时候，每个人都会问：“你知道吗，你到底在干什么？”

Lex Fridman 莱克斯·弗里德曼 But it’s not just inside the company. You’re shaping the landscape, the broader global landscape of innovation. Like, putting those ideas out there, you really are manifesting reality.  
但这不仅仅局限于公司内部。你正在塑造整个格局，更广阔的全球创新格局。就像，把你的想法表达出来，你实际上是在将现实变为现实。

Jensen Huang 黄仁森 We don’t build computers. We actually don’t build clouds. We don’t… As it turns out, we’re a computing platform company. And so nobody can buy anything from us. That’s the weird thing. You know, we vertically design, vertically integrate to design and optimize, but then we open up the entire platform at every single layer to be integrated into other companies’ products and services and clouds and supercomputers and OEM computers, and so the amazing thing is, I can’t do what I do without having convinced them first. And so most of GTC is about manifesting a future that by the time that we… My product is ready, they’re going, “What took you so long?”  
我们不造电脑。实际上，我们也不建云。我们不……结果发现，我们是一家计算平台公司。所以没人能从我们这里买到任何东西。这很奇怪。你知道，我们采用垂直设计、垂直整合的方式来设计和优化，但之后我们会开放整个平台的每一层，以便集成到其他公司的产品、服务、云平台、超级计算机和 OEM 电脑中。所以神奇的是，如果我不先说服他们，我就无法开展我的工作。因此，GTC 的大部分内容都是在描绘一个未来，等到……我的产品准备就绪时，他们会问：“你们怎么花了这么长时间？”

## AI scaling laws 人工智能规模定律

Lex Fridman 莱克斯·弗里德曼 Yeah. So one of the things you’ve been a believer for a long time is scaling laws, broadly defined. So are you still a believer in the scaling laws?  
是的。你一直以来都相信尺度定律，广义上讲。那么你现在还相信尺度定律吗？

Jensen Huang 黄仁森 Yeah, yeah. Yeah, we have more scaling laws now.  
是啊，是啊。是啊，我们现在有更多的尺度定律了。

Lex Fridman 莱克斯·弗里德曼 So I think you’ve outlined four of them with pre-training, post-training, test time, and agentic scaling. What do you think, when you think about the future, deep future and the near-term future, what are the blockers that you’re most concerned about that keep you up at night that you have to overcome in order to keep scaling?  
所以，我认为您已经概述了四个方面：训练前、训练后、测试时间和智能体扩展。当您思考未来、长远未来和近期未来时，您认为最令您担忧、夜不能寐、必须克服的障碍是什么？

Jensen Huang 黄仁森 Well, we can go back and reflect on what people thought were blockers. So in the beginning, we were… The pre-training scaling law. You know, people thought, rightfully so, that the amount of data that we have, high-quality data that we have, will limit the intelligence that we achieve. And that scaling law was an important, very important scaling law. The larger the model, the correspondingly more data results in a smarter AI. And so that was pre-training. And Ilya Sutskever said, “We’re out of data,” or something like that. “Pre-training is over,” or something like that. The industry panicked, you know, that this is the end of AI. And of course, that’s obviously not true.  
我们可以回顾一下人们最初认为的阻碍因素。一开始，我们面临的是……预训练扩展定律。你知道，人们当时的想法不无道理，认为我们拥有的数据量，尤其是高质量数据量，会限制我们所能达到的智能水平。而这个扩展定律非常重要。模型越大，相应的数据量就越多，人工智能也就越智能。这就是预训练。伊利亚·苏茨克维尔（Ilya Sutskever）说：“我们没有足够的数据了”，或者类似的话。“预训练已经结束了”，或者类似的话。整个行业都恐慌了，认为人工智能的末日到了。当然，这显然不是事实。

Jensen Huang 黄仁森 We’re gonna keep on scaling the amount of data that we have to train with. A lot of that data is probably gonna be synthetic, and that also confused people, you know? And what people don’t realize is they’ve kind of forgotten that most of the data that we are training, that we teach each other with, inform each other with, is synthetic. You know, it’s synthetic because it didn’t come out of nature. You created it. I’m consuming it. I modify it, augment it, I regenerate it, somebody else consumes it. And so we’ve now reached a level where AI is able to take ground truth, augment it… Enhance it, synthetically generate an enormous amount of data.  
我们会不断扩大训练数据量。其中很多数据可能是合成的，这也让一些人感到困惑，你知道吗？人们没有意识到的是，他们似乎忘记了我们用来训练、互相学习、互相启发的大部分数据都是合成的。之所以说是合成的，是因为它并非源于自然。它是你创造的，我使用它，我修改它，增强它，我重新生成它，然后其他人使用它。因此，我们现在已经达到了这样的水平：人工智能能够获取真实数据，对其进行增强……改进，并合成生成海量数据。

Jensen Huang 黄仁森 And that part of post-training continues to scale, and so the amount of data that we could use that is human generated will be smaller, and smaller, and smaller. The amount of data that we use to train models is going to continue to scale to the point where we’re no longer limited… Training is no longer limited by… Data is now limited by compute. And the reason for that is most of the data is synthetic. Then the next phase is test time, and I still remember people telling me that, “Inference? Oh, yeah, that’s easy. Pre-training, that’s hard.” These are giant systems that people are talking about. Inference must be easy. And so inference chips are gonna be little tiny chips, and-  
后训练的这一部分规模会不断扩大，因此我们能够使用的由人类生成的数据量会越来越小。我们用于训练模型的数据量将继续扩大，直到不再受限于……训练不再受限于……数据现在受限于计算能力。原因在于大部分数据都是合成数据。接下来是测试阶段，我还记得有人跟我说：“推理？哦，那很简单。预训练，那才难。”人们谈论的是庞大的系统。推理肯定很简单。所以推理芯片将会是很小的芯片，而且——

Jensen Huang 黄仁森 … you know, they’re not, they’re not like NVIDIA’s chips. Oh, those are gonna be complicated and expensive, and, you know, we could make… And this is- … in, in the future, inference is gonna be the biggest market, and it’s gonna be easy, and we’re gonna commoditize it. You know, everybody can build their own chips. And, and that was always illogical to me because inference is thinking, and I think thinking is hard. Thinking is way harder than reading.  
……你知道，它们不一样，它们不像英伟达的芯片。哦，那些芯片会很复杂也很贵，而且，你知道，我们可以制造……而且，在未来，推理将成为最大的市场，它会变得很容易，我们会把它商品化。你知道，每个人都可以制造自己的芯片。而且，这对我来说一直都不合逻辑，因为推理就是思考，而我认为思考很难。思考比阅读难得多。

Jensen Huang 黄仁森 You know, pre-training is just memorization and generalization, you know, and looking for patterns in relationships. You’re reading and reading, versus thinking, reasoning, solving problems, taking unexplored experiences, new experiences, and breaking it down into… Decomposing it into, you know, solvable pieces that we then go off, either through first principle reasoning, or, you know, through previous examples, prior experiences. You know, or just exploration and search and, you know, trying different things. And that whole process of test time scaling inference, is really about thinking. And it’s about reasoning, it’s about planning, it’s about search, it’s about…  
你知道，预训练只是死记硬背和概括，寻找关系中的模式。你只是不停地阅读，而不是思考、推理、解决问题，把未探索过的经验、新的经验分解成……分解成可解决的部分，然后我们再根据这些部分，通过第一性原理推理，或者通过之前的例子和经验，或者仅仅是探索和搜索，尝试不同的方法。整个测试时间尺度推理的过程，实际上都是关于思考的。它关乎推理，关乎计划，关乎搜索，关乎……

Jensen Huang 黄仁森 And so how could that possibly be compute light? And we were absolutely right about that. You know, so test time scaling is intensely compute intensive. Then the question is, okay, now we’re at inference and we’re at test time scaling, what’s beyond that? Well, obviously we have now created, you know, one agentic person, and that one agentic person has a large language model that we’ve now developed. But during test time, that agentic system goes off and does research and bangs on databases, and it goes out and, you know, uses tools, and one of the most important things it does is spins off and spawns off a whole bunch of sub-agents. Which means we’re now creating large teams. It’s so much easier to scale NVIDIA by hiring more employees than it is to scale myself.  
那么，这怎么可能算得上轻量级计算呢？我们之前的判断完全正确。你知道，测试阶段的扩展计算量非常大。那么问题来了，现在我们已经到了推理阶段，也达到了测试阶段的扩展，那么之后呢？显然，我们现在创建了一个智能体，这个智能体拥有我们开发的大型语言模型。但在测试阶段，这个智能体系统会进行研究，访问数据库，使用各种工具，其中最重要的功能之一就是派生出大量的子智能体。这意味着我们现在需要创建庞大的团队。相比于我自己扩展规模，通过雇佣更多员工来扩展英伟达要容易得多。

Jensen Huang 黄仁森 And so the next scaling law is the agentic scaling law. It’s kind of like multiplying AI. Multiplying AI, we could spin off agents as fast as you want to spin off agents. And so, you know, I… You know, I have four scaling laws. And as we use the agentic systems, they’re gonna create a lot more data, they’re gonna create a lot of experiences. Some of it we’re gonna say, “Wow, this is really good. We ought to memorize this.”  
所以下一个扩展定律是智能体扩展定律。它有点像人工智能的倍增。人工智能倍增意味着我们可以随心所欲地快速生成智能体。所以，你知道，我……你知道，我有四个扩展定律。随着我们使用智能体系统，它们会产生更多的数据，也会产生大量的经验。其中一些我们会说：“哇，这真不错。我们应该记住它。”

Jensen Huang 黄仁森 That data set then comes all the way back to pre-training. We memorize and generalize it. We then refine it and fine-tune it back into post-training. Then we enhance it even more with test time, you know, and the agentic systems, you know, put it out to the industry. And so this loop, this cycle, is gonna go on and on and on. It kinda comes down to basically intelligence is gonna scale by one thing, and that’s compute.  
然后，这个数据集会一直回到预训练阶段。我们记住它并进行泛化。之后，我们对其进行精炼和微调，进入后训练阶段。然后，我们通过测试进一步增强它，最终，智能系统会将其应用于实际应用。因此，这个循环会一直持续下去。归根结底，智能的发展取决于一个因素，那就是计算能力。

Lex Fridman 莱克斯·弗里德曼 But there’s a tricky thing there that you have to anticipate and predict, which is some of these components, it requires different kind of hardware to really do it optimally. So you have to anticipate where the AI innovation’s going to lead. For example, a mixture of-  
但这里有个棘手的问题需要预先考虑和预测，那就是某些组件需要不同的硬件才能真正发挥最佳性能。所以你必须预测人工智能创新将把我们引向何方。例如，混合使用——

Jensen Huang 黄仁森 Perfect.  
完美。

Lex Fridman 莱克斯·弗里德曼 … experts with sparsity.  
……稀疏性专家。

Jensen Huang 黄仁森 Perfect.  
完美。

Lex Fridman 莱克斯·弗里德曼 With hardware, you can’t just pivot on a week’s notice. You have to anticipate what that’s going to look like. It has some-  
硬件方面，你不可能在一周之内就做出调整。你必须预先考虑到会是什么样子。它有一些——

Jensen Huang 黄仁森 So good.  
太棒了。

Lex Fridman 莱克斯·弗里德曼 … that’s so scary and difficult to do, right?  
……那太可怕也太难做了，对吧？

Jensen Huang 黄仁森 For example, these AI model architectures are being invented about once every six months. Right? And system architectures and hardware architectures kind of every three years. And so you need to anticipate what likely is going to happen, you know, two, three years from now. And there’s a couple ways that you could do that. First of all, we could do research internally ourselves, and that’s one of the reasons why we have basic research, we have applied research.  
例如，人工智能模型架构大约每六个月就会出现一次。对吧？系统架构和硬件架构则大约每三年出现一次。所以你需要预测未来两三年可能发生的事情。有几种方法可以做到这一点。首先，我们可以进行内部研究，这也是我们开展基础研究和应用研究的原因之一。

Jensen Huang 黄仁森 We create our own models. And so we have hands-on life experience right here. This is part of the co-design that I’m talking about. We’re also the only AI company in the world that works with literally every AI company in the world. And to the extent that we can, we try to get a sense of what are the challenges that people are experiencing.  
我们创建自己的模型。因此，我们拥有丰富的实践经验。这就是我所说的协同设计的一部分。我们也是全球唯一一家与世界上所有人工智能公司都有合作的人工智能公司。我们会尽我们所能，了解人们面临的挑战。

Lex Fridman 莱克斯·弗里德曼 So you’re listening to the whispers across the industry, the AI labs.  
所以你正在倾听整个行业，人工智能实验室的窃窃私语。

Jensen Huang 黄仁森 That’s right. You got to listen and learn from everybody. And have a… And then the last part is to have an architecture that’s flexible, that can adapt and move with the wind. And one of the benefits of CUDA is that it’s, you know, on the one hand, an incredible accelerator. On the other hand, it’s really flexible. And so that balance, incredible balance between specialization, otherwise we can’t accelerate the CPU, versus generalization, so that we can adapt with changing algorithms, that’s really, really important. That’s the reason why CUDA has been so resilient on the one hand, and yet we continue to enhance it.  
没错。你必须倾听并向所有人学习。而且……最后一点是，架构要灵活，能够适应变化，顺应潮流。CUDA 的优势之一在于，一方面，它是一个强大的加速器；另一方面，它又非常灵活。因此，在专业化（否则我们就无法加速 CPU）和通用化（以便我们能够适应不断变化的算法）之间取得平衡至关重要。这正是 CUDA 一方面如此强大，另一方面我们又不断对其进行改进的原因。

Jensen Huang 黄仁森 We’re at CUDA 13.2, and so we’re evolving the architecture so fast that we can stay with the modern algorithms. For example… When mixtures of experts came out, that’s the reason why we had NVLink 72 instead of NVLink 8. We could now take an entire 4 trillion, 10 trillion parameter model and put it in one computing domain as if it’s running on one GPU. People probably didn’t notice, I said it, but if you look at the architecture of the Grace Blackwell racks, it was completely focused on doing one thing, processing the LLM. All of a sudden, one year later, you’re looking at a Vera Rubin rack. It has storage accelerators. It has this incredible new CPU called Vera. It has Vera Rubin and NVLink 72 to run the LLMs.  
我们现在用的是 CUDA 13.2，所以我们的架构发展速度非常快，能够跟上现代算法的步伐。例如……当混合专家模型出现时，我们用 NVLink 72 代替了 NVLink 8。现在我们可以把一个包含 4 万亿到 10 万亿个参数的模型放在一个计算域里运行，就像它只在一个 GPU 上运行一样。我之前说过，大家可能没注意到，但如果你看看 Grace Blackwell 机架的架构，你会发现它完全专注于一件事：处理 LLM（逻辑线性模型）。突然之间，仅仅一年之后，你就看到了 Vera Rubin 机架。它配备了存储加速器，搭载了名为 Vera 的全新强大 CPU，以及用于运行 LLM 的 Vera Rubin 和 NVLink 72。

Jensen Huang 黄仁森 It also has this new additional rack called Rock. And so this entire rack system is completely different than the previous one, and it’s got all these new components in it. And the reason for that is because the last one was designed to run MoE large language models, inference. And this one is to run agents and agents bang on tools, and-  
它还有一个叫做 Rock 的全新机架。整个机架系统与之前的完全不同，它包含了许多新的组件。原因是之前的机架是为运行 MoE 大型语言模型和推理而设计的，而这个机架是为运行智能体以及智能体与工具的集成而设计的。

Lex Fridman 莱克斯·弗里德曼 Obviously, the design of the system had to have been done before Claude Code, Codex, OpenClaw. So you were anticipating the future, essentially. And that, and that comes from what? From the whispers, from the understanding what all the state-  
显然，这套系统的设计肯定是在 Claude Code、Codex 和 OpenClaw 出现之前完成的。所以本质上，你是在预见未来。而这一切，又源于什么呢？源于那些耳语，源于对所有现状的理解——

Jensen Huang 黄仁森 No  
否

Lex Fridman 莱克斯·弗里德曼 … of the art is about?  
……这门艺术是关于什么的？

Jensen Huang 黄仁森 No, it’s easier than that. You just reason about it. First of all, you just reason. No matter, no matter what happens, at some point in order for that large language model to be a digital worker… Let’s just use that metaphor. Let’s say that we want the LLM to be a digital worker. What does that have to do? It has to access ground truth. That’s our file system. It has to be able to do research. It doesn’t know everything. We don’t have… And I don’t wanna wait until this AI becomes, you know, universally smart about everything, past, present, and future before I make it useful. And so therefore, I might as well let it go do research. It’s obvious; if it wants to help me, it’s gotta use my tools.  
不，其实没那么复杂。你只要好好想想就行了。首先，你只要好好想想就行了。不管怎样，不管发生什么，为了让这个大型语言模型成为一个数字员工……我们就用这个比喻吧。假设我们想让这个语言模型成为一个数字员工。它需要做什么呢？它必须能够访问真实数据。那就是我们的文件系统。它必须能够进行研究。它不可能无所不知。我们没有……我不想等到这个人工智能变得无所不知，无所不能，包括过去、现在和未来，才让它发挥作用。所以，我不如让它去做研究。这很明显；如果它想帮我，就必须使用我的工具。

Jensen Huang 黄仁森 You know, a lot of people would say, “You know AI is gonna completely destroy software. We don’t need software anymore. We don’t even need tools anymore.” That’s ridiculous. Let’s use the… Let’s use a thought experiment. And you could just sit there, enjoy a glass of whiskey, and think about all these things, and it would become completely obvious. Like, if I were to create the most amazing agent that we can imagine in the next 10 years. Let’s say it’d be a humanoid robot. If that humanoid robot were to be created, is it more likely that the humanoid robot comes into my house and uses the tools that I have to do the work that it needs to do?  
你知道，很多人会说：“人工智能会彻底摧毁软件。我们不再需要软件了。我们甚至不再需要工具了。”这太荒谬了。我们来做个思想实验。你可以坐在那里，喝杯威士忌，好好想想这些问题，答案就会变得显而易见。比如说，如果我在未来十年内创造出我们能想象到的最神奇的智能体，假设它是一个人形机器人。如果这个人形机器人真的被创造出来，它更有可能走进我的房子，使用我现有的工具来完成它需要做的工作吗？

Jensen Huang 黄仁森 Or does this hand turn into a 10-pound hammer in one instance, turn into a scalpel in another instance, and in order to boil water, it beams, you know, microwaves out of its fingers? You know, or is it more likely just to use a microwave, you know? And the first time it goes up to the microwave, it probably doesn’t know how to use it. But that’s okay. It’s connected to the internet. It reads the manual of this microwave, reads it, instantly becomes an expert. And so it uses it. And so I think the… I just described, in fact, almost all of the properties of OpenClaw.  
或者，这只手一会儿变成一把 10 磅重的锤子，一会儿又变成一把手术刀，为了烧开水，它还会从手指里发射微波？或者，它更有可能直接用微波炉？第一次用微波炉的时候，它可能不知道怎么用。不过没关系。它连着网。它会看微波炉的使用手册，看完之后立刻就成了专家。然后它就能用了。所以我觉得……我刚才描述的，实际上几乎涵盖了 OpenClaw 的所有特性。

Jensen Huang 黄仁森 You know, that it’s gonna use tools, that it’s gonna access files, it’s gonna be able to do research. It has an IO subsystem. And when you’re done reasoning through it, reasoning about it in that way, then you say, “Oh, my gosh, the impact to the future of computing is deeply profound.” And the reason for that is, I think we’ve just reinvented the computer. And then now you say, “Okay, when did we reason about that? When did we reason about OpenClaw?” If you take the OpenClaw schematic that I used at GTC, you’ll find it two years ago. Literally, two years ago at GTC, I was talking about agentic systems that exactly reflect OpenClaw today. And, of course, the confluence of many things had to happen.  
你知道，它会使用工具，会访问文件，还能进行研究。它有一个 I/O 子系统。当你完成对它的推理，以这种方式进行推理之后，你会说：“我的天哪，它对未来计算的影响是极其深远的。” 原因在于，我认为我们刚刚重新发明了计算机。然后你可能会问：“好吧，我们什么时候推理过这一点？我们什么时候推理过 OpenClaw？” 如果你看看我在 GTC 上使用的 OpenClaw 示意图，你会发现它早在两年前就出现了。确切地说，两年前的 GTC 上，我谈论的智能体系统与今天的 OpenClaw 完全吻合。当然，这其中有很多因素的共同作用。

Jensen Huang 黄仁森 First of all, we needed Claude and GPT and, you know, all of these models to reach a level of capability. So their innovation and their breakthroughs and their continued advances was really important. And then, of course, somebody had to create an open source project that was sufficiently robust and sufficiently complete and that we can all put to work. And I think OpenClaw did for agentic systems what ChatGPT did for generative systems. And I just think it’s a very big deal.  
首先，我们需要 Claude 和 GPT，以及所有这些模型达到一定的水平。所以，它们的创新、突破和持续进步至关重要。当然，之后还需要有人创建一个足够强大、足够完善的开源项目，供我们所有人使用。我认为 OpenClaw 之于智能体系统，正如 ChatGPT 之于生成系统。我认为这意义非凡。

Lex Fridman 莱克斯·弗里德曼 Yeah, it’s a really special moment. I’m not exactly sure why it captured so much of the world’s attention, but it did, more than Claude Code and Codex and so on.  
是啊，这真是个特别的时刻。我不太确定为什么它吸引了全世界如此多的关注，但它确实如此，甚至超过了克劳德·科德和科德克斯等等。

Jensen Huang 黄仁森 Because consumers could reach it.  
因为消费者能够接触到它。

Lex Fridman 莱克斯·弗里德曼 Sure, yeah. But there’s also so much of this is vibes. And Peter, I had a podcast with him, he’s a wonderful human being. So part of it is also the humans that represent the thing.  
当然，没错。但这其中也有很多氛围因素。我和彼得一起录过播客，他是个很棒的人。所以，这其中一部分也取决于代表这件事的人。

Jensen Huang 黄仁森 Yeah, no doubt.  
是的，毫无疑问。

Lex Fridman 莱克斯·弗里德曼 Part of it is memes and the— ‘Cause we’re all trying to figure it out. There’s really serious and complicated security concerns about when you have such powerful technology, how do you hand over your data so they can do useful stuff? But then there’s scary things associated with that. And we, as a civilization, as individual people and as a civilization, are figuring out how to find that right balance.  
一部分原因是网络迷因，还有——因为我们都在努力弄明白。拥有如此强大的技术，确实存在着非常严重且复杂的安全问题：如何交出你的数据，让他们能够做有用的事情？但这同时也伴随着一些可怕的后果。而我们，作为一个文明，作为个体，作为一个文明整体，都在努力寻找合适的平衡点。

Jensen Huang 黄仁森 Yeah, we jumped on it right away and we sent a bunch of security experts this way. And we did this thing called OpenShell. It’s already been integrated into OpenClaw.  
是的，我们立即着手处理，并派了一批安全专家过来。我们开发了一个叫做 OpenShell 的东西。它已经集成到 OpenClaw 中了。

Lex Fridman 莱克斯·弗里德曼 And NVIDIA put forward NemoClaw.  
NVIDIA 提出了 NemoClaw。

Jensen Huang 黄仁森 Yep, exactly.  
没错，正是如此。

Lex Fridman 莱克斯·弗里德曼 They install super easy. It makes sure that it’s secure.  
安装超级简单。而且非常安全。

Jensen Huang 黄仁森 We give you two out of three rights. Agentic systems can access sensitive information, it can execute code, and it can communicate externally. We could keep things safe if we gave you two out of those three capabilities at any time, but not all three. And out of those two out of three capabilities, we also give you access control based on whatever rights that you’re given by enterprise. And then we connect it to a policy engine that all these enterprises already have. And so we’re going to try to do our best to help OpenClaw become a better claw.  
我们赋予您三项权限中的两项。代理系统可以访问敏感信息、执行代码并进行外部通信。如果我们在任何时候只赋予您这三项权限中的两项，而不是全部三项，就能确保安全。在这两项权限的基础上，我们还会根据企业授予您的权限进行访问控制。然后，我们会将其连接到所有企业都已拥有的策略引擎。因此，我们将尽最大努力帮助 OpenClaw 成为一个更强大的工具。

## Biggest blockers to AI scaling laws人工智能扩展定律的最大障碍

Lex Fridman 莱克斯·弗里德曼 So you eloquently explained how we have a long history of blockers that we thought were going to be blockers, and we overcame them. But now looking into the future, what do you think might be the blockers now that it’s clear that agents will be everywhere? So it’s obviously we’re going to need compute. So what is going to be the blocker for that scaling?  
您刚才精彩地解释了我们过去是如何克服那些我们原本认为会成为阻碍的难题的。但展望未来，既然智能体将无处不在，您认为未来可能出现的阻碍是什么？显然，我们需要计算能力。那么，这种扩展的障碍是什么？

Jensen Huang 黄仁森 Power is a concern, but it’s not the only concern. But that’s the reason why we’re pushing so hard on extreme co-design, so that we can improve the tokens per second per watt orders of magnitude every single year. And so in the last 10 years, Moore’s Law would have progressed computing about 100 times in the last 10 years. We progressed and scaled up computing by a million times in the last 10 years. And so we’re gonna keep on doing that through extreme co-design. So energy efficiency, perf per watt, completely affects the revenues of a company. It affects the revenues of a factory. And we’re just going to push that to the limit so that we can keep on driving token costs down as fast as we can.  
功耗固然重要，但并非唯一需要考虑的问题。正因如此，我们才如此大力推进极限协同设计，力求每年将每瓦每秒的代币产量提升几个数量级。过去十年，摩尔定律本应使计算能力提升约 100 倍，而我们却实现了计算能力百万倍的飞跃。我们将继续通过极限协同设计来实现这一目标。能源效率，也就是每瓦性能，直接影响着公司和工厂的收益。我们将竭尽全力，不断降低代币成本。

Jensen Huang 黄仁森 You know, our computer price is going up, but our token generation effectiveness is going up so much faster that token cost is coming down. It’s just coming down an order of magnitude every year.  
你知道，我们的电脑价格在上涨，但我们的代币生成效率提升速度远超电脑价格，因此代币成本正在下降。它每年都在下降一个数量级。

Lex Fridman 莱克斯·弗里德曼 So power, that’s an interesting one. So the way to try to get around the power blocker is to try to, with the tokens per second per watt, try to make it more and more efficient. Of course, there’s the question of how do we get more power.  
所以，功率是个很有意思的问题。要解决功率瓶颈，就要想办法提高每瓦每秒产生的代币数量，使其效率越来越高。当然，问题在于我们如何才能获得更多功率。

Jensen Huang 黄仁森 We should also get more power.  
我们也应该获得更多权力。

## Supply chain 供应链

Lex Fridman 莱克斯·弗里德曼 That’s a really complicated one. You’ve talked about small modular nuclear power plants. There’s all kinds of ideas for energy. How much does it keep you up at night? The bottlenecks in the supply chain of AI, like ASML with EUV lithography machines, TSMC with advanced packaging like CoWoS, and SK Hynix with the high bandwidth memory?  
这确实是个很复杂的问题。您谈到了小型模块化核电站。关于能源，有很多不同的想法。这些问题让您夜不能寐吗？比如人工智能供应链中的瓶颈，像 ASML 的 EUV 光刻机、台积电的先进封装技术（如 CoWoS）以及 SK 海力士的高带宽存储器？

Jensen Huang 黄仁森 All the time, and we’re working on it all the time. No company in history has ever grown at a scale that we’re growing while accelerating that growth. It’s incredible. And it’s hard for people to even understand this. In the overall world of AI computing, we’re increasing share. And so supply chain, upstream and downstream, are really important to us. I spend a lot of time informing all the CEOs that I work with: what are the dynamics that’s going to cause the growth to continue or even accelerate? It’s part of the reasons why to the entire right-hand side of me were CEOs of practically the entire IT industry upstream and practically the entire infrastructure industry downstream.  
我们一直在努力，而且一直在为此努力。历史上没有任何一家公司能像我们这样在保持增长的同时还能加速增长。这简直不可思议。人们甚至很难理解这一点。在整个人工智能计算领域，我们的市场份额正在不断扩大。因此，供应链，包括上游和下游，对我们至关重要。我花了很多时间向所有与我合作的 CEO 们解释：哪些因素将推动增长持续甚至加速？这也是为什么我右边的所有人几乎都是整个 IT 行业上游和下游基础设施行业的 CEO 的原因之一。

Jensen Huang 黄仁森 And they were all… There were several hundred CEOs. And I don’t think there’s ever been keynotes where several hundred CEOs show up. And part of it is, I’m telling them about our business condition now. I’m telling them about the growth drivers in the very near future and what’s happening. And I’m also describing where are we going to go next so that they could use all of this information and all of the dynamics that are here to inform how they want to invest. And so I inform them that way like I inform my own employees.  
他们都是……有好几百位 CEO。我想从来没有哪个主题演讲能吸引这么多 CEO 参加。一方面，我要向他们介绍我们目前的业务状况，以及近期内的增长动力和正在发生的事情。另一方面，我还要阐述我们下一步的发展方向，以便他们能够利用这些信息和各种动态因素来指导他们的投资决策。我向他们介绍情况的方式，就像我向自己的员工介绍情况一样。

## Memory 记忆

Jensen Huang 黄仁森 And then of course, then I make trips out to them and make sure that, “Hey, listen, I want you to know this quarter, this coming year, this next year, these things are going to happen.” And if you look at the CEOs of the DRAM industry—the number one DRAM in the world was DDR memory for CPUs in data centers. About three years ago, I was able to convince several of the CEOs that even though at the time HBM memory was used quite scarcely, and barely by supercomputers, that this was going to be a mainstream memory for data centers in the future. At first it sounded ridiculous, but several of the CEOs believed me and decided to invest in building HBM memories.  
当然，之后我还会亲自去拜访他们，确保他们明白：“嘿，听着，我想让你们知道，这个季度、明年、后年，这些事情将会发生。” 如果你看看 DRAM 行业的 CEO 们——当时全球排名第一的 DRAM 是数据中心 CPU 使用的 DDR 内存。大约三年前，我成功说服了几位 CEO，尽管当时 HBM 内存的使用率很低，几乎只在超级计算机上使用，但它未来将成为数据中心的主流内存。起初这听起来很荒谬，但几位 CEO 相信了我，并决定投资研发 HBM 内存。

Jensen Huang 黄仁森 Another memory was rather odd to put into a data center: the low power memories that we use for cell phones. And we wanted them to adapt them for supercomputers in the data center. And they go, “Cell phone memory for supercomputers?” And I explained to them why. Well, look at these two memories, LPDDR5, HBM4. The volumes are so incredible. All three of them had record years in history, and these are 45-year companies. And so, you know, I… That’s part of my job, is to inform and shape, inspire, you know.  
还有一种存储器用在数据中心里相当奇怪：就是我们手机用的那种低功耗存储器。我们想让他们把这种存储器改造一下，用在数据中心的超级计算机上。他们问：“手机存储器用在超级计算机上？” 我向他们解释了原因。你看这两种存储器，LPDDR5 和 HBM4。它们的容量简直惊人。这三种存储器都创下了历史纪录，而且它们所在的公司都有 45 年的历史了。所以，你知道，我的工作之一就是传播知识、塑造理念、启发灵感。

Lex Fridman 莱克斯·弗里德曼 So you’re not just manifesting the future and maybe inspiring NVIDIA, the different engineers of the company, you’re manifesting the supply chain of the future. So you’re having conversations with TSMC, with ASML.  
所以你不仅是在描绘未来，或许还能激励英伟达和公司里的其他工程师，你更是在描绘未来的供应链。所以你正在和台积电、阿斯麦等公司进行对话。

Jensen Huang 黄仁森 Upstream, downstream.  
上游，下游。

Lex Fridman 莱克斯·弗里德曼 Upstream, downstream. So that’s the thing.  
上游，下游。就是这样。

Jensen Huang 黄仁森 GEV, Caterpillar. Yeah, that’s downstream from us. Yeah, yeah, there you go.  
GEV，卡特彼勒。对，就在我们下游。对，对，就是那儿。

Lex Fridman 莱克斯·弗里德曼 Yeah, the whole thing. I mean, but that’s so… There’s so much incredibly difficult engineering that happens in the entire semiconductor industry, and it just feels scary how intricate the supply chain is, how many components there are, but it works somehow.  
是啊，整个过程都是如此。我的意思是，这太……整个半导体行业涉及太多极其复杂的工程技术，供应链的复杂性、零部件的数量之多，都让人感到害怕，但它却能以某种方式运转下去。

Jensen Huang 黄仁森 Exactly, the deep science. The deep engineering, the incredible manufacturing, and so much of the manufacturing is already robotics, but we have a couple of hundred suppliers that contribute the technology that goes into our 1.3 million component rack. Each rack is 1.3, one and a half million components. There are 200 suppliers across the Vera Rubin rack.  
没错，是深厚的科学技术。深厚的工程技术，精湛的制造工艺，以及大量的机器人制造，但我们还有几百家供应商为我们那拥有 130 万个元件的机架提供技术支持。每个机架包含 130 万个元件。Vera Rubin 机架共有 200 家供应商。

Lex Fridman 莱克斯·弗里德曼 So it’s interesting that you don’t list that as the thing that keeps you up at night in the list of blockers.  
所以，有趣的是，你并没有把这件事列为让你夜不能寐的障碍之一。

Jensen Huang 黄仁森 But I’m doing, I’m doing all the things necessary to-  
但我正在做，我正在做所有必要的事情——

Lex Fridman 莱克斯·弗里德曼 Okay.  
好的。

Jensen Huang 黄仁森 … yeah, see? I can go to sleep because I checked it off. I said, “Okay,” you know, I go, I can go to sleep and I go, “Well, let’s see, let’s reason about this. What’s important for us?” Because let’s reason about this. Because we changed the system architecture from the original DGX-1 that you remembered to NVLink-72 rack scale computing- … what’s gonna… What does that, what does that mean? What does that mean to software? What does that mean to engineering? What does that mean to how we design and test? And what does that mean to the supply chain? Well, one of the things that it meant was we moved supercomputer integration at the data center into supercomputer manufacturing in the supply chain.  
……是啊，你看？我可以睡觉了，因为我已经把它完成了。我说，“好了，”你知道，我可以睡觉了，然后我想，“嗯，我们来想想，什么对我们来说最重要？”因为我们得好好想想。因为我们把系统架构从你还记得的最初的 DGX-1 改成了 NVLink-72 机架式计算……这……这意味着什么？这对软件意味着什么？对工程意味着什么？对我们的设计和测试方式意味着什么？对供应链又意味着什么？嗯，其中一点就是，我们把数据中心的超级计算机集成转移到了供应链中的超级计算机制造环节。

Jensen Huang 黄仁森 If you’re doing that, you also have to recognize you’re gonna move one… And if your total footprint of whatever data center you’re gonna build, let’s say you would like to have, you know, 50 gigawatts of supercomputers that are running simultaneously, and it takes one week to manufacture that 50 gigawatts of supercomputers, then each week in the supply chain, the supercomputers are gonna need a gigawatt of power. And so we’re gonna need the supply chain to increase the amount of power it has to build and test the supercomputers in the supply chain before I ship it.  
如果你要这样做，你也必须意识到你将要搬迁一个……假设你要建造的数据中心总占地面积为 50 吉瓦，并且需要同时运行 50 吉瓦的超级计算机，而制造这 50 吉瓦的超级计算机需要一周时间，那么在供应链中，每周这些超级计算机都需要 1 吉瓦的电力。因此，我们需要供应链增加电力供应，以便在发货前完成超级计算机的制造和测试。

Lex Fridman 莱克斯·弗里德曼 Oh.  
哦。

Jensen Huang 黄仁森 Well, NVLink-72 literally builds supercomputers in the supply chain and ships ’em two, three tons at a time per rack. It used to be they used to come in parts and we used to assemble ’em inside the data center. But that’s impossible now because NVLink-72 is so dense. And so that’s an example. And I would have to go and fly into the supply chain, go meet my partners saying, “Hey,” I said, “guess what? So here’s what I’m going to do with… This is the way we used to build our DGXs. We’re gonna build them this way. This is gonna be so much better because we’re going to need ’em for inference.” The market for inference is, you know, coming. The inflection point for inference is coming. It’s gonna be a big market.  
嗯，NVLink-72 实际上是在供应链中组装超级计算机，每个机架一次就要运送两三吨。以前它们是分部件运输的，我们在数据中心内部组装。但现在这不可能了，因为 NVLink-72 的密度太高了。这就是一个例子。我得飞到供应链里，去见我的合作伙伴，跟他们说：“嘿，”我说，“猜猜怎么着？我要这么做……我们以前就是这么组装 DGX 的。现在我们要用这种方式组装。这样会好得多，因为我们需要它们来进行推理。” 推理市场正在崛起。推理的转折点即将到来。这将是一个巨大的市场。

Jensen Huang 黄仁森 And so I first explain to them what’s going on, why it’s gonna happen, and then I ask ’em to make several billion dollars of capital investments each. And because they trust me and I’m very respectful of ’em, and I give ’em every opportunity to question me and I spend time to explain things to people and I reason about it. I draw pictures and I reason about it in first principles. And by the time I’m done with them, they know what to do.  
所以我先向他们解释事情的来龙去脉，以及事情发生的原因，然后要求他们每人进行数十亿美元的资本投资。因为他们信任我，我也非常尊重他们，所以我给了他们充分的机会提问，花时间向他们解释，并进行推理。我会画图，并从基本原理出发进行论证。等我解释完之后，他们就明白该怎么做了。

Lex Fridman 莱克斯·弗里德曼 So a lot of it is about relationships and building a shared view of the future. But do you worry about certain bottlenecks? I mean, what are the biggest bottlenecks in the supply chain? Are you worried about ASML’s EUV tooling? Are you worried about the packaging, CoWoS packaging of TSMC, about how fast it could scale? Like you said, you’re not only growing incredibly fast, you’re accelerating your growth. So it feels like everybody in the supply chain, and those are certainly bottlenecks, would have to scale up. Are you having conversations with them, like, how can you scale up faster?  
所以很多时候都关乎人际关系以及构建对未来的共同愿景。但您是否担心某些瓶颈？我的意思是，供应链中最大的瓶颈是什么？您是否担心 ASML 的 EUV 光刻工具？您是否担心台积电的 CoWoS 封装技术，以及它能否快速扩展产能？正如您所说，你们不仅增长迅猛，而且还在加速增长。因此，感觉供应链上的每个人——这些当然都是瓶颈——都必须扩大产能。您是否正在与他们沟通，探讨如何更快地扩大产能？

Jensen Huang 黄仁森 All the time.  
一直如此。

Lex Fridman 莱克斯·弗里德曼 Do you worry about it?  
你担心吗？

Jensen Huang 黄仁森 No.  
编号

Lex Fridman 莱克斯·弗里德曼 Okay.  
好的。

Jensen Huang 黄仁森 Because I told ’em what I needed. They understood what I need. They told me what they’re gonna go do, and I believe them what they’re going to do.  
因为我告诉了他们我的需求。他们理解了我的需求。他们告诉我他们打算怎么做，我相信他们要做的事。

## Power 力量

Lex Fridman 莱克斯·弗里德曼 Interesting. That’s great to hear. So maybe if we can just linger on the power for a little bit. What are your hopes for how to solve the energy problem?  
很有意思。听到这个消息真好。那么，我们不妨再花点时间谈谈电力问题。您对解决能源问题有什么期望？

Jensen Huang 黄仁森 One of the areas, Lex, that I would love us to talk about and just get the message out, you know, our power grid is designed for the worst case condition with some margin. Well, 99% of the time we’re nowhere near the worst case condition because the worst case condition is a few days in the winter, a few days in the summer, and extreme weather. Most of the time we’re nowhere near the worst case condition and we’re probably running around, call it 60% of peak.  
莱克斯，我想和你谈谈一个方面，也想传达一个信息：我们的电网设计时预留了应对最坏情况的余量。但实际上，99% 的时间里，我们远未达到最坏情况，因为最坏情况通常只出现在冬季的几天、夏季的几天以及极端天气条件下。大多数时候，我们的用电量远低于最坏情况，大概只有峰值的 60% 左右。

Jensen Huang And so 99% of the time, our power grid has excess power, and they’re just sitting idle, but they have to be there sitting idle because just in case, when the time comes, hospitals have to be powered and, you know, infrastructure has to be powered and airports have to run and so on and so forth. And so the question that I have is whether we could go and help them understand and create contractual agreements and design computer architecture systems, data centers, such that when they need the maximum power for infrastructure in society, that the data centers would get less.

Jensen Huang But that’s in a very rare instance anyways. And during that time, we either have a backup generator for that little part of it, or we just have our computers shift the workload somewhere else, or we have the computers just run slower. You know, we could degrade our performance, reduce our power consumption and provide for a, you know, slightly longer latency response, you know, when somebody asks for, you know, asks for an answer. And so I think that that, that way of using computers, of building data centers, instead of expecting 100% uptime—and these contracts that are really, really quite rigorous, it’s putting a lot of pressure on the grid to be able to… Now, they’re gonna have to increase from their maximum. I just wanna use their excess. It’s just sitting there.

Lex Fridman Yeah, that’s not talked about enough. So what’s stopping there? Is it regulation? Is it bureaucracy?

Jensen Huang I think it’s a three-way problem. It starts with the end customer. The end customer puts requirements on the data centers that they can never not be available, okay? So that the end customer expects perfection. Now, in order to deliver that perfection, you need a combination of backup generators and your grid power supplier to deliver on perfection. And so everybody’s gotta have six nines. Well, I think first of all, right now, we ought to have everybody understand that when the customer asks for these things, you have somebody in your data center operations team disconnected from the CEO. I bet the CEO doesn’t know this. I’m gonna talk to all the CEOs.

Jensen Huang The CEOs are probably not paying any attention to the contracts that are being signed, and so everybody wants to sign the best contract, of course. And they go down to cloud service providers, and the two contract negotiators that are… You, I could just see them now. You know, negotiating these multi-year contracts. Both sides want, you know, the best contract. As a result, the CSPs then have to go down to the utilities, and they expect the nine, the six nines. And so I think, I think the first thing is just make sure that, that all of the customers, the CEOs and the customers realize what they’re asking for. Now, the second thing is we have to build data centers that gracefully degrade.

Jensen Huang And so if the power, if the utility, if the grid tells us, “Listen, we’re gonna have to back you down to about 80%,” we’re gonna say, “That’s no problem at all.” We’re just gonna move our workload around. We’re gonna make sure that data’s never lost, but we can reduce the computing rate and use less energy. The quality of service degrades a little bit. For the critical workloads, I shift that somewhere else right away so I don’t have that problem, and so, you know, whichever data center still has 100% uptime, and so…

Lex Fridman 莱克斯·弗里德曼 How difficult of an engineering problem is that, that smart, dynamic allocation of power in a data center?  
在数据中心实现智能、动态的电力分配，这究竟是一个多么困难的工程问题？

Jensen Huang 黄仁森 As soon as you could specify, you could engineer it. Beautifully put. So long as it obeys the laws of physics on first principles, I think we’re good.  
只要你能明确具体要求，就能设计出来。说得真好。只要它符合基本的物理定律，我想就没问题了。

Lex Fridman 莱克斯·弗里德曼 What was the third thing you were mentioning?  
你刚才提到的第三件事是什么来着？

Jensen Huang 黄仁森 So the second thing is the, the data centers. And the third thing is we need the utilities to also recognize that this is an opportunity- … and instead of saying, “Look, it’s gonna take me five years to increase my grid capability,” if you have, if you’re willing to take power of this level of guarantee, I can make them available for you next month and at this price. And so if utilities also offered more segments of power delivery promises, then I think everybody will figure out what to do with it. Yeah, but there’s just way too much waste in the grid right now. We should go after it.  
所以第二点是数据中心。第三点是我们需要电力公司也意识到这是一个机会——……他们不应该说，“你看，我需要五年时间才能提升电网容量”，而是应该说，如果你愿意接受这种级别的电力保障，我下个月就能以这个价格为你提供电力。如果电力公司也能提供更多分段式的电力输送承诺，那么我认为大家都会找到解决办法。是的，但目前电网的浪费实在太多了。我们应该着手解决这个问题。

## Elon and Colossus 埃隆和巨像

Lex Fridman 莱克斯·弗里德曼 You’ve highly lauded Elon and xAI’s accomplishment in Memphis, in building Colossus supercomputer, probably in record time in just four months. It’s now at 200,000 GPUs and growing very quickly. Is there something that you could speak to the understanding about his approach that’s instructive to, broadly to all the data center creators that enabled that kind of accomplishment? His approach to engineering, his approach to the whole management of construction, everything?  
您高度赞扬了埃隆·马斯克和 xAI 在孟菲斯建造 Colossus 超级计算机的成就，他们可能仅用了四个月就以创纪录的速度完成了这项壮举。现在它已经拥有 20 万个 GPU，并且还在快速增长。您能否谈谈他的方法，以便大家更好地理解，并对所有促成这一成就的数据中心建设者有所启发？比如他的工程方法、他对整个建设管理的方法等等？

Jensen Huang 黄仁森 First of all, Elon is deep in so many different topics. Yet he’s also a really good systems thinker. And so he’s able to think through multiple disciplines, and he obviously pushes things, questions everything, where they’re, number one, is it necessary? Number two, does it have to be done this way? And then number three, you know, does it have to take this long? And so he has the ability to question everything to the point where everything is down to its minimal amount that’s necessary, you can’t take anything else out. And yet the necessary capabilities of the product remains, you know? And so he is as minimalist as you could possibly imagine, and he does it at a system scale. I think… I also love the fact that he is represented. He is present at the point of action.  
首先，埃隆涉猎广泛，涉猎极深。同时，他也是一位非常优秀的系统思考者。因此，他能够从多个学科的角度进行思考，并且他显然会不断推进事物发展，质疑一切，首先，这件事是否必要？其次，这件事是否必须以这种方式完成？第三，这件事是否必须耗时这么久？他有能力质疑一切，直到所有环节都精简到必要的最低限度，再也没有任何可以舍弃的地方。然而，产品所需的必要功能却依然保留。所以，他可以说是极简主义者，而且他是在系统层面上做到这一点的。我认为……我也很喜欢他能够出现在行动现场这一点。

Jensen Huang 黄仁森 You know, he’ll just go there. If there’s a problem, he’ll just go there and then, “Show me the problem.” You know, when you do all of this in combination, you overcome a lot of previous, “This is just the way we do it.” “You know, I’m waiting for them.” You know, I mean, it’s just, everybody has a lot of excuses. And so, and then the last thing is when you act personally with so much urgency, it causes everybody else to act with urgency, you know? And every supplier has a lot of customers going on. Every supplier has a lot of projects going on, and he makes it his business that he’s the top priority of everybody else’s projects. And so he does that by demonstrating it.  
你知道，他会直接去那里。如果出了问题，他会直接去那里，然后说：“把问题告诉我。” 你知道，当你把所有这些结合起来做的时候，你就能克服很多以前那种“我们一直都是这么做的”“你知道，我在等他们”之类的借口。你知道，我的意思是，每个人都有很多借口。所以，最后一点是，当你以如此紧迫的态度亲自行动时，会带动其他人也以紧迫的态度行动，你知道吗？每个供应商都有很多客户在忙。每个供应商都有很多项目在进行，而他会确保自己成为所有其他项目最重要的合作伙伴。所以他通过实际行动来做到这一点。

Lex Fridman 莱克斯·弗里德曼 Yeah, I’ve been in a bunch of those meetings. It’s just, it’s fun to watch, ’cause really, not enough people ask the question like, “Okay, so can this be done a lot faster, and how? Why does it have to take this long?”  
是啊，我参加过很多这样的会议。看着挺有意思的，因为很少有人会问这样的问题：“好吧，这件事能不能做得更快？怎么做？为什么非得花这么长时间？”

Jensen Huang 黄仁森 Yeah, right.  
是啊，没错。

Lex Fridman 莱克斯·弗里德曼 And then in the… That becomes an engineering question often. And yes, I think when you get the ground truth of actually… I remember… One of the times I was hanging out with him, he literally is going through the entire process of how to plug in cables into a rack. He’s working with an engineer on the ground that’s doing that task, and he’s just trying to understand what does that process look like so it can be less error-prone. And just building up that intuition from every single task involved in putting together a data center-  
然后……这通常会变成一个工程问题。是的，我认为当你真正了解实际情况后……我记得……有一次我和他在一起，他正在演示如何将线缆连接到机架上的整个过程。他正在和现场负责这项工作的工程师一起工作，他只是想了解这个过程是什么样的，以便减少出错的可能性。通过对数据中心搭建过程中每一个环节的了解，逐步建立起这种直觉——

Lex Fridman 莱克斯·弗里德曼 … you start to immediately get a sense at the detailed scale and at the broad systems scale of where the inefficiencies are, and so you can make it more and more and more efficient. Plus you have the big hammer of being able to say, “Let’s do it totally different-“  
……你很快就能从细节层面和宏观系统层面感受到效率低下的地方，从而不断提高效率。此外，你还拥有一个强大的工具，那就是可以大胆地说：“让我们彻底改变一下——”

Jensen Huang 黄仁森 Yeah. That’s right.  
是的，没错。

Lex Fridman 莱克斯·弗里德曼 “… and remove all possible blockers.”  
“……并清除所有可能的障碍。”

Jensen Huang 黄仁森 That’s right.  
没错。

## Jensen’s approach to engineering and leadership詹森的工程和领导力方法

Lex Fridman 莱克斯·弗里德曼 Is there parallels in the NVIDIA Extreme Systems co-design approach that you see in the way Elon approaches systems engineering?  
NVIDIA Extreme Systems 的协同设计方法与埃隆·马斯克的系统工程方法之间是否存在相似之处？

Jensen Huang 黄仁森 Well, first of all, co-design is an ultimate systems engineering problem. And so we approach the work that we do from that first principle. The other thing that we do and this is a philosophy that, a thought, a state of mind, I guess, a method that I started 30 years ago, and it’s called the speed of light. The speed of light is not just about the speed. The speed of light is my shorthand for what’s the limit of what physics can do. And so every single thing that we do is compared against the speed of light. Memory speed, math speed, power, cost, time, effort, number of people, manufacturing cycle time.  
首先，协同设计本质上是一个系统工程问题。因此，我们开展工作正是基于这一基本原则。我们所做的另一件事，这是一种理念，或者说是一种思维方式，或者说是一种方法，是我 30 年前创立的，它被称为“光速”。光速不仅仅是速度。光速是我用来指代物理学极限的简写。因此，我们所做的每一件事都要与光速进行比较：内存速度、数学运算速度、功率、成本、时间、精力、人员数量、制造周期等等。

Jensen Huang 黄仁森 And when you think about latency versus throughput when you think about cost versus throughput, cost versus capacity, all of these things you test against the speed of light to achieve all of these different constraints separately. And then when you consider it together, you know you have to make compromises because a system that achieves extremely low latency versus a cheap, a system that achieves very high throughput are architected fundamentally differently. But you want to know what’s the speed of light of a system that achieves high throughput, what’s the speed of light of a system that achieves low latency? And then when you think about the total system, you can make trade-offs. And so I force everybody to think about what’s the first principles, the limits-  
当你考虑延迟与吞吐量、成本与吞吐量、成本与容量时，所有这些因素都需要以光速为基准进行测试，以分别满足所有这些不同的约束条件。然后，当你综合考虑所有这些因素时，你就会明白必须做出妥协，因为实现极低延迟的系统与实现极高吞吐量的低成本系统在架构上有着根本的不同。但你想知道实现高吞吐量的系统的光速是多少，实现低延迟的系统的光速又是多少？然后，当你考虑整个系统时，你就可以进行权衡取舍。因此，我要求每个人都思考什么是基本原则，什么是极限——

Jensen Huang 黄仁森 … the physical limits for everything before we do anything. And we test everything against that. And so that’s a good frame of mind. I don’t love the other methods, which is continuous improvement. The problem with continuous improvement, it… First of all, you should engineer something from first principles at the speed, you know, with speed of light thinking. Limit it only by physical limits, and physics limits. And after that, of course you would improve it over time. But I don’t like going into a problem and somebody says, “Hey, you know, it takes 74 days to do this today-” “… Right now. And we can do it for you in 72 days.” You know, I’d rather strip it all back to zero-  
……在做任何事情之前，我们都要先确定所有事物的物理极限。然后我们用这些极限来测试一切。所以这是一种很好的思维方式。我不喜欢其他方法，比如持续改进。持续改进的问题在于……首先，你应该从第一性原理出发，以光速思维来设计事物。只受限于物理极限和物理学极限。之后，当然你会随着时间的推移而改进它。但我不喜欢遇到问题时，有人说：“嘿，你知道，今天做这件事需要 74 天——”“……现在。我们可以在 72 天内帮你完成。”你知道，我宁愿把一切都从零开始——

Jensen Huang 黄仁森 … and say, “First of all, explain to me why 74 days in the first place. And l- let’s note, let’s think about what’s possible today. And if I were to- to build it completely from scratch, you know, how long would it take?” Oftentimes, you’d be surprised. It might come to six days. Now, the rest of the six days, the 74, could be very well-reasoned and compromises, and, you know, cost reductions, and all kinds of different things. But at least you know what they are. And then now that you know that six days is possible, then the conversation from 74 to six, surprisingly much more effective.  
……然后说：“首先，请解释一下为什么一开始是 74 天。我们不妨想想，现在能做到什么程度。如果我从零开始完全重建，需要多长时间？”通常你会感到惊讶。可能只需要六天。当然，剩下的六天，也就是 74 天，可能有很多合理的理由，比如妥协、成本削减等等。但至少你知道这些理由是什么。既然你知道六天就能完成，那么从 74 天到六天的讨论就会出奇地有效得多。

Lex Fridman 莱克斯·弗里德曼 In such incredibly complex systems that you’re working with, is simplicity sometimes a good heuristic to reach for? I mean, if I can just… I mean, the pod, the Vera Rubin pod that you announced is just incredible. We’re talking about seven chips, seven chip types, five purpose-built rack types, 40 racks, 1.2 quadrillion transistors, nearly 20,000 NVIDIA dies, over 1,100 Rubin GPUs, 60 exaflops, 10 petabytes per second of scale bandwidth. That’s all just one…  
在您所处理的如此极其复杂的系统中，有时追求简洁是否是一种有效的启发式方法？我的意思是，如果我能……我的意思是，您发布的 Vera Rubin 处理器简直令人难以置信。它包含七种芯片，七种芯片类型，五种专用机架类型，40 个机架，1.2 千万亿个晶体管，近 2 万个 NVIDIA 芯片，超过 1100 个 Rubin GPU，60 exaflops 的运算能力，以及每秒 10 PB 的扩展带宽。这仅仅是其中之一……

Jensen Huang 黄仁森 That’s just one pod.  
那只是一个舱。

Lex Fridman 莱克斯·弗里德曼 That’s just one pod.  
那只是一个舱。

Jensen Huang 黄仁森 Yeah, that’s just one pod.  
是的，那只是一个舱。

Lex Fridman 莱克斯·弗里德曼 I mean, in- … so you have the… And then even the NVL72 rack alone is 1.3 million components, 1300 chips, 4,000 pods crammed into a single 19-inch wide rack.  
我的意思是，在……所以你有……然后即使是 NVL72 机架本身，也有 130 万个组件、1300 个芯片、4000 个模块，全部塞进一个 19 英寸宽的机架中。

Jensen Huang 黄仁森 And Lex, we’re probably gonna have to crank out about 200 of these pods a week, just to put it in perspective.  
莱克斯，为了让你有个概念，我们可能每周要生产大约 200 个这样的播客。

Lex Fridman 莱克斯·弗里德曼 The amount of different components, I suppose simplicity is impossible, but is that a metric that you kind of reach for in trying to design things?  
不同组件的数量，我想简洁是不可能的，但这是否是你在设计事物时会追求的一个指标呢？

Jensen Huang 黄仁森 You know, the phrase that I use most often is, we need things to be as complex as necessary, but as simple as possible. And so the question is, is all that complexity there necessary? And we ought to test for that. And we got to challenge that. And then after that, everything else above it, you know, is gratuitous.  
你知道，我最常说的一句话是，我们需要事物既要足够复杂，又要尽可能简单。所以问题是，所有这些复杂性都是必要的吗？我们应该检验这一点。我们必须质疑这一点。在那之后，其他的一切，你知道，都是多余的。

Lex Fridman 莱克斯·弗里德曼 But it’s still almost incredible. Semiconductor industry broadly, but what NVIDIA is doing is some of the greatest engineering in history. So these systems are just truly, truly marvels of engineering.  
但这仍然令人难以置信。整个半导体行业，尤其是英伟达所做的，堪称历史上最伟大的工程之一。所以这些系统真的是工程奇迹。

Jensen Huang 黄仁森 It is the most complex computer the world has ever made.  
这是世界上制造过的最复杂的计算机。

Lex Fridman 莱克斯·弗里德曼 Yeah, the engineering teams, I mean- … I don’t, it’s not a competition, but I don’t know. If it was like an Olympics of engineering teams, I mean, TSMC does incredible engineering. Like I said, ASML at every scale, but NVIDIA is gonna give them a run for their money. Just incredible, incredible teams.  
是啊，工程团队，我的意思是……我不知道，这不是比赛，但我真的不知道。如果这是工程团队的奥运会，我的意思是，台积电的工程技术非常出色。就像我说的，ASML 在各个方面都很厉害，但英伟达肯定会给他们带来不小的挑战。他们的团队都非常非常出色。

Jensen Huang 黄仁森 Well, it’s gold medalists in every single, in every single sport, all assembled right here.  
嗯，所有体育项目的金牌得主都聚集在这里。

## China 中国

Lex Fridman 莱克斯·弗里德曼 And have to work together. And report directly to you. This is wonderful. You recently traveled to China. So it’s interesting to ask you, China’s been incredibly successful in building up its technology sector. What do you understand about how China’s able to, over the past 10 years, build so many incredible world-class companies, world-class engineering teams, and just this technology ecosystem- … that produces so many incredible products?  
而且他们还要一起工作，直接向您汇报。这太好了。您最近去过中国。所以，我想问问您，中国在发展科技产业方面取得了巨大的成功。您如何看待中国在过去十年中打造了如此多世界一流的公司、世界一流的工程团队，以及整个科技生态系统——并由此产生了如此多令人惊叹的产品？

Jensen Huang A whole bunch of reasons for… Well, first of all, let’s start, let’s start with some facts. 50% of the world’s AI researchers are Chinese, plus or minus, and they’re mostly in China still. We have many of them here, but there’s amazing researchers still in China. They—their tech industry showed up at precisely the right time. At the time of the mobile cloud era, their way of contributing was software, and so this is a country’s incredible science and math really well-educated kids. Their tech industry was created during the era of software. They’re very comfortable with modern software. China is not one giant economic country. It’s got many provinces and cities with mayors all competing with each other.  
原因有很多……好吧，首先，我们先来看一些事实。全球约有 50%的人工智能研究人员是中国人，而且他们大多仍然在中国。我们这里也有很多，但中国仍然有很多杰出的研究人员。他们的科技产业恰逢其时。在移动云计算时代，他们贡献的方式是软件开发，因此，中国拥有非常优秀的科学和数学人才，培养了一批受过良好教育的孩子。他们的科技产业诞生于软件时代。他们对现代软件非常熟悉。中国并非一个单一的经济体。它由许多省市组成，各省市的市长之间相互竞争。

Jensen Huang 黄仁森 That’s the reason why there’s so many EV companies. That’s the reason why there’s so many AI companies. That’s the reason why there’s so many—every company you could imagine, they all create some of them. And, and as a result, they have insane competition internally. And, you know, what remains is an incredible company. They also have a social culture where, where it’s family first, friends second, and company third. And so the amount of conversation that goes back and forth between… They’re essentially open source all the time.  
这就是为什么会有这么多电动汽车公司。这就是为什么会有这么多人工智能公司。这就是为什么你能想到的所有公司，它们都在开发人工智能产品。因此，它们内部竞争异常激烈。而最终留下的，是那些令人惊叹的公司。它们还有一种独特的企业文化，那就是家庭第一，朋友第二，公司第三。所以，它们之间会进行大量的交流……它们基本上一直都是开源的。

Jensen Huang 黄仁森 So the fact that they contribute more to open source is so sensible because they’re probably, “What are we protecting?” You know, my engineers, their brothers are in that company, their friends are in that company, and they’re all schoolmates. You know, the schoolmate concept. There’s a, you know, one schoolmate, you’re brother for life. And and so they, they, they share knowledge very, very quickly. And so there’s no sense keeping technology hidden. You might as well put it on open source. And so the open source community then amplifies, accelerates the, the innovation process. So you get this rapid, incredible great talent, rapid innovation because of open source and just, you know, the nature of friends, and, and insane competition.  
所以，他们更多地参与开源项目是完全合理的，因为他们可能会想：“我们到底在保护什么？”你知道，我的工程师们，他们的兄弟在那家公司，他们的朋友在那家公司，他们都是校友。你知道，校友情谊就是这么回事。一个校友，就是一辈子的兄弟。所以，他们能够非常迅速地分享知识。因此，把技术藏起来毫无意义。不如把它开源。这样，开源社区就能放大并加速创新进程。所以，由于开源、朋友间的友谊以及激烈的竞争，你就能获得如此迅速、令人难以置信的优秀人才和快速的创新。

Jensen Huang 黄仁森 Among the company, what emerges is incredible stuff. And so this is the fastest innovating country in the world today, and this is something that has everything that, everything that I’ve just said is fundamental to just how the kids were grown, the fact that they have excellent education, the fact that they, parents want them to do well in school, the fact that they, their culture is that way. These are, you know, these are just the thing about their country, and they showed up at precisely the time when technology is going through that exponential.  
在公司里，涌现出了很多令人惊叹的东西。这是当今世界上创新速度最快的国家，它拥有我刚才提到的所有要素，这些要素对孩子们的成长至关重要：他们接受良好的教育，他们的父母希望他们在学校取得好成绩，他们的文化也是如此。这些都是他们国家的特点，而他们恰好赶上了科技呈指数级增长的时代。

Lex Fridman 莱克斯·弗里德曼 Plus culturally, it’s pretty cool to be an engineer. It connects to all the components that you’re mentioning…  
而且从文化角度来看，当工程师也很酷。它与你提到的所有方面都有联系……

Jensen Huang 黄仁森 It’s a builder nation.  
这是一个建设者之国。

Lex Fridman 莱克斯·弗里德曼 It’s a builder nation.  
这是一个建设者之国。

Jensen Huang 黄仁森 Yeah, it’s a builder nation. Our country’s leaders, incredible, but they’re mostly lawyers. Their country’s leaders—and because we’re, they’re trying to keep us safe, rule of law governing—their country was built out of poverty. And so most of their leaders are incredible engineers. Some of the brightest minds.  
是啊，那是个建设者之国。我们国家的领导人很了不起，但他们大多是律师。他们的领导人——正因为他们努力保障我们的安全，维护法治——他们的国家是从贫困中建立起来的。所以他们的大多数领导人都是杰出的工程师，一些最聪明的头脑。

Lex Fridman 莱克斯·弗里德曼 To take a small tangent, because you mentioned open source, I have to go to Perplexity here, who you have been a fan of a long time.  
稍微跑题一下，因为你提到了开源软件，所以我得提一下 Perplexity，你一直是它的粉丝。

Jensen Huang 黄仁森 Love it, yeah.  
喜欢，是的。

Lex Fridman 莱克斯·弗里德曼 And thank you for releasing open source Nemotron 3 Super, which you can also use inside Perplexity to look stuff up. Now, which is 120 billion parameter open weight MoE model. What’s your vision with open source? So you mentioned China with, with DeepSeek and MiniMax, with all these companies really pushing forward the open source AI movement, and NVIDIA is really leading the way in close to state-of-the-art open source LLMs. What’s your vision there?  
感谢您发布开源的 Nemotron 3 Super，您也可以在 Perplexity 中使用它来查找信息。这是一个拥有 1200 亿参数的开放权重 MoE 模型。您对开源有何愿景？您提到了中国，以及 DeepSeek 和 MiniMax 等公司，它们都在积极推动开源 AI 的发展，而 NVIDIA 在接近最先进的开源 LLM 方面也处于领先地位。您对开源的未来有何展望？

Jensen Huang 黄仁森 First, if we’re gonna be a great AI computing company, we have to understand how AI models are evolving.  
首先，如果我们想成为一家伟大的人工智能计算公司，我们就必须了解人工智能模型是如何演变的。

Jensen Huang 黄仁森 One of the things that I love about Nemotron 3 is it’s not just a pure transformer model, it’s transformer and SSMs. And we were early in developing the, the conditional GANs, which, that progressive GANs, which led step-by-step to diffusion. And so the fact that we’re doing basic research in model architecture and in different domains gives us visibility into, you know, what kind of computing systems would do a good job for future models. And so it is part of our extreme co-design strategy. Second, I think we rightfully recognize that on the one hand, we want world-class models as products, and they should be proprietary. On the other hand, we also want AI to diffuse into every industry and every country, every researcher, every student.  
我喜欢 Nemotron 3 的一点是，它不仅仅是一个纯粹的 Transformer 模型，而是 Transformer 和 SSM 的结合。我们很早就开始开发条件生成对抗网络（Conditional GANs），也就是渐进式生成对抗网络（Progressive GANs），它逐步推动了扩散型人工智能的发展。因此，我们在模型架构和不同领域进行基础研究，使我们能够了解哪些计算系统能够很好地支持未来的模型。这也是我们高度协同设计策略的一部分。其次，我认为我们理所当然地认识到，一方面，我们希望将世界一流的模型作为产品，并且这些模型应该是专有的。另一方面，我们也希望人工智能能够普及到每个行业、每个国家、每个研究人员、每个学生。

Jensen Huang 黄仁森 And if everything is proprietary, it’s hard to do research and it’s hard to innovate on top of, around, with. And so… Open source is fundamentally necessary for many industries to join the AI revolution. NVIDIA has the scale and we have the motives—not only skills, scale, and motivation—to build and continue to build these AI models for as long as we shall live. And so therefore, we ought to do that. We can open up, we can activate every industry, every researcher, you know, every country to be able to join the AI revolution. There’s the third reason, which is from that, to recognizing that AI is not just language. These AIs will likely use tools and models and sub-agents that were trained on other modalities of information.  
如果所有东西都是专有的，研究就很难开展，创新也难以进行。因此……开源对于许多行业加入人工智能革命至关重要。英伟达拥有规模，我们也有动力——不仅仅是技能、规模和动力——去构建并持续构建这些人工智能模型，直到我们有生之年。因此，我们应该这样做。我们可以开放，我们可以激活每个行业、每个研究人员、每个国家，让他们都能加入人工智能革命。第三个原因也由此而来，那就是认识到人工智能不仅仅是语言。这些人工智能很可能会使用基于其他信息模式训练的工具、模型和子智能体。

Jensen Huang 黄仁森 Maybe it’s biology or chemistry or you know, laws of physics, or you know, fluids and thermodynamics, and not all of it is in language structure. And so somebody has to go make sure that weather prediction, biology, AI, AI for biology, physical AI, all of that stuff stays, can be pushed to the limits and pushed to the frontier. We don’t build cars, but we wanna make sure every car company has access to great models. We don’t discover drugs, but I wanna make sure that Lilly has the world’s best biology AI systems, so that they can go use it for discovering drugs. And so these three fundamental reasons, both in recognizing that AI is not just language, that AI is really broad, that we wanna engage everybody into the world of AI, and then also co-design of AI.  
也许是生物学、化学，或者物理定律，又或者流体力学和热力学，这些并非都能用语言结构表达。因此，必须有人确保天气预报、生物学、人工智能、生物学人工智能、物理人工智能等等这些领域能够得以保留，并被推向极限，开拓前沿。我们不造车，但我们希望确保每家汽车公司都能获得优秀的模型。我们不研发药物，但我希望确保礼来公司拥有世界上最好的生物学人工智能系统，以便他们能够利用这些系统进行药物研发。这三个根本原因在于：首先，我们认识到人工智能不仅仅是语言，它的范畴非常广泛；其次，我们希望让每个人都参与到人工智能的世界中来；最后，我们希望人工智能能够协同设计。

Lex Fridman Well, I have to say, once again, thank you for open sourcing, really truly open sourcing Nemotron 3 and …

Jensen Huang Yeah, I appreciate you were saying that. We open sourced the models, we open sourced the weights, we open sourced the data, we open sourced how we created it. Yeah, it’s pretty amazing.

## TSMC and Taiwan

Lex Fridman It’s really incredible. You’re originally from Taiwan and have a close relationship with TSMC. So I have to ask TSMC I think also is a legendary company in terms of the engineering teams, in terms of the incredible engineering work that they do. What do you understand about TSMC culture and their approach that explains how they’re able to achieve this singular unmatched success in everything they’re doing with semiconductors?

Jensen Huang You know, first of all, the deepest misunderstanding about TSMC is that their technology is all they have. That somehow they have a really great transistor, and if somebody shows up another transistor, game over. It’s the technology and, of course, you know, I don’t mean just the transistor, the metallization systems, the packaging, the 3D packaging, the silicon photonics, the, you know, all of the technology that they have. That technology is really what makes the company special. Their technology makes the company special.

Jensen Huang But their ability to orchestrate the demands, the dynamic demands of hundreds of companies in the world as they’re moving up, shifting out, you know, increasing, decreasing, pushing out, pulling in, changing from customer to customer, wafer starting, wafer stopping, emergency wafer starts, you know, all of this dynamics of the world’s complexity as the world is shape-shifting all the time, and somehow they’re running a factory with high throughput, high yields, really great costs, excellent customer service. They take their promises seriously.

Jensen Huang They, when your wafer—because they know that they’re helping you run your company—when the wafers were promised to show up, the wafers show up, you know, so that you could run your company appropriately. And so their system, their manufacturing system is completely miraculous, I would say. Then the second thing is their culture. This culture is simultaneously technology focused on one hand, advancing technology; simultaneously customer service oriented on the other hand. A lot of companies are very customer service oriented, but they’re not very technology excellent. They’re not at the bleeding edge of technology.  
他们知道，晶圆是用来帮助你运营公司的，所以当晶圆按时交付时，晶圆就会按时交付，这样你才能正常运营公司。因此，他们的系统，他们的制造系统，可以说是非常神奇的。其次是他们的企业文化。这种文化一方面注重技术，不断推进技术发展；另一方面又以客户服务为导向。很多公司非常注重客户服务，但他们的技术水平并不高，也并非处于技术前沿。

Jensen Huang 黄仁森 There are a lot of companies who are tech, at the bleeding edge of technology, but they’re not the best customer service oriented company. And so it just depends on somehow they’ve, they’ve balanced these two and they’re world-class at both. And then probably the third thing is the technology that I most value in them that they created this, you know, this, this intangible called trust. I trust them to put my company on top of them. That’s a very big deal.  
很多公司都是科技公司，处于技术前沿，但它们的客户服务却不尽如人意。所以，关键在于它们能否在这两者之间取得平衡，并在两方面都达到世界一流水平。第三点，也是我最看重的一点，是它们所拥有的技术，以及它们所创造的这种无形的东西——信任。我相信它们能够让我的公司在它们面前脱颖而出。这至关重要。

Lex Fridman 莱克斯·弗里德曼 When they trust, I mean, there’s a really close relationship there that you’ve established, and that trust is established based on many years of performance, but there’s human relationships involved there as well.  
当他们信任你的时候，我的意思是，你们之间建立了一种非常亲密的关系，这种信任是基于多年的表现而建立的，但其中也涉及到人际关系。

Jensen Huang 黄仁森 Three decades, I don’t know how many tens, hundreds of billions of dollars of business we’ve done through them, and we don’t have a contract. That’s pretty great.  
三十年来，我不知道我们通过他们完成了多少数百亿美元、数千亿美元的业务，而我们却没有签合同。这真是太棒了。

Lex Fridman 莱克斯·弗里德曼 Amazing. Okay, there’s this story … … That in 2013, the founders of TSMC, Morris Chang offered you the chance to become TSMC’s chief executive and you said you already had a job. Is this story true?  
太棒了。好吧，有个故事……据说在 2013 年，台积电的创始人张忠谋曾邀请你担任台积电的首席执行官，而你说你当时已经有工作了。这个故事是真的吗？

Jensen Huang 黄仁森 Story is true. I didn’t, I didn’t dismiss it. But I was deeply honored and, and of course, I knew then as I know now, TSMC is one of the most consequential companies in history. And Morris is one of the highest regarded executives and business and personal friend that I’ve had in my life. And, for him to ask, I was humbled and really honored. But the work that I’m doing here is really important, and I’ve seen, you know, in my mind’s eye, what NVIDIA was going to be and what the impact that we could have. And it was really important work. And it’s my responsibility, you know, my sole responsibility to make this happen. And so I declined it, not because it wasn’t an incredible offer. It’s an unbelievable offer, but I simply couldn’t take it.  
故事是真的。我没有，我没有拒绝。但我深感荣幸，当然，我当时就知道，就像现在一样，台积电是历史上最具影响力的公司之一。莫里斯是我一生中最受尊敬的高管之一，也是我的商业和私人朋友。他向我发出邀请，我感到无比荣幸和谦卑。但我在这里所做的工作非常重要，我已经在脑海中预见了英伟达的未来，以及我们能够产生的影响。这是一项非常重要的工作。实现这一切是我的责任，是我唯一的责任。所以我拒绝了，不是因为这份邀请不够诱人。这份邀请确实非常诱人，但我实在无法接受。

Lex Fridman 莱克斯·弗里德曼 I think NVIDIA, both NVIDIA and TSMC are two of the greatest companies in the history of human civilization. And running either one, I’m sure, is an incredibly complicated effort and takes… You have to truly be all in. Everybody at every scale, not just at the CEO level. Everybody is really truly all in-  
我认为英伟达，英伟达和台积电都是人类文明史上最伟大的两家公司。运营其中任何一家，我确信都是极其复杂且需要付出巨大努力的……你必须全身心投入。不仅是 CEO，公司上下所有层级的每个人都必须如此。每个人都必须真正地全身心投入。

Jensen Huang 黄仁森 Yeah. Yeah, no doubt.  
是啊，毫无疑问。

Lex Fridman 莱克斯·弗里德曼 … To, to accomplish this kind of complexity.  
……为了实现这种复杂性。

Jensen Huang 黄仁森 So now I can help both companies.  
所以现在我可以同时帮助这两家公司了。

## NVIDIA’s moat 英伟达的护城河

Lex Fridman 莱克斯·弗里德曼 Exactly. So NVIDIA is now the most valuable company in the world. I have to ask, what is the NVIDIA’s biggest moat, as the folks in the tech sector say? The edge you have that protects you from the competition.  
没错。所以英伟达现在是全球市值最高的公司。我得问问，正如科技界人士所说，英伟达最大的护城河是什么？就是那种能让你免受竞争冲击的优势。

Jensen Huang 黄仁森 Our single most important property as a company is the install base of our computing platform. Our single most important thing today is the install base of CUDA. Now, the reason why 20 years ago, of course, there was no install base. But what makes… And if somebody came up with a GUDA or TUDA, it wouldn’t make any difference at all. And the reason for that is because it’s never been just about the technology. The technology, of course, was incredible, visionary. But it’s the fact that the company was dedicated to it, stuck with it, expanded its reach. It wasn’t three people that made CUDA successful. It was 43,000 people that made CUDA successful.  
作为一家公司，我们最重要的资产是我们计算平台的安装基础。如今，我们最看重的是 CUDA 的安装基础。当然，20 年前，CUDA 的安装基础几乎为零。但关键在于……即便有人开发出 GUDA 或 TUDA，也丝毫不会改变现状。原因在于，CUDA 的成功从来不仅仅取决于技术本身。当然，这项技术本身非常出色，极具远见。但真正重要的是公司对它的投入、坚持和不断拓展。CUDA 的成功并非仅仅归功于三个人，而是 43000 名员工的共同努力。

Jensen Huang 黄仁森 And the several million developers that believed in us that trusted that we were going to continue to make CUDA 1, 2, 3, 13, that they decided to port and dedicate their software on top of it, their mountain of software on top of it. And so the install base is the number one most important advantage. That install base, when you amplify it with the velocity of our execution at the scale that we’re talking about, no company in history had ever built systems of this complexity, period. And then to build it once a year is impossible. And that velocity combined with the install base, in the developer’s mind, you just go now, take the developer’s mind. From the developer’s perspective, if I support CUDA, tomorrow it’ll be 10 times better. I just have to wait six months on average.  
数百万开发者相信我们，相信我们会继续开发 CUDA 1、2、3、13，他们决定将自己的软件移植到 CUDA 之上，构建庞大的软件库。因此，庞大的用户群是我们最重要的优势。这个庞大的用户群，再加上我们如此高效的执行速度，在如此巨大的规模下，历史上没有任何一家公司构建过如此复杂的系统。而且，每年只开发一次是不可能的。这种速度加上庞大的用户群，在开发者看来，如果支持 CUDA，明天就能提升十倍。我只需要平均等待六个月。

Jensen Huang 黄仁森 Not only that, if I develop it on CUDA, I reach a few hundred million people, computers. I’m in every cloud, I’m in every computer company, I’m in every single industry, I’m in every single country. So if I create an open source package and I put it on CUDA first, I get these both attributes simultaneously. And not only that, I trust 100% that NVIDIA is going to keep CUDA around and maintain it and improve it and keep optimizing the libraries for as long as they shall live. You could take that to the bank, and that last part, trust. You put all that stuff together, if I were a developer today, I would target CUDA first. I would target CUDA most. And that’s the reason that I think in the final analysis is our first, that’s even our first-  
不仅如此，如果我用 CUDA 开发，就能触及数亿用户和计算机。我的应用遍布所有云平台、所有计算机公司、所有行业、所有国家。所以，如果我创建一个开源软件包，并首先将其发布到 CUDA 平台，就能同时获得这两个优势。不仅如此，我百分之百相信 NVIDIA 会一直维护 CUDA，不断改进和优化库，直到它停止发展。这一点毋庸置疑，尤其是最后一点——信任。综合所有这些因素，如果我是今天的开发者，我会首先选择 CUDA。我会优先考虑 CUDA。这就是为什么我认为最终 CUDA 是我们的首要目标，甚至是我们的首要目标——

Jensen Huang 黄仁森 … core advantage. Our second one is our ecosystem. The fact that we vertically integrated this incredibly complex system, but we integrate it horizontally into every single company’s computers. We’re into Google Cloud, we’re into Amazon, we’re in Azure. You know, we’re ramping up AWS like crazy right now. We’re in new companies like CoreWeave and Nscale. We’re in supercomputers at Lilly. We’re in enterprise computers. We’re at the edge in radio base stations. You know, I mean, it’s just crazy. One architecture is in all these different systems. We’re in cars, we’re in robots, we’re in satellites, we’re out in space. And so the fact that you have this one architecture and the ecosystem is so broad, it basically covers every single industry in the world.  
……核心优势。我们的第二个优势是我们的生态系统。我们不仅垂直整合了这个极其复杂的系统，还将其水平整合到每一家公司的计算机中。我们与谷歌云、亚马逊云、Azure 都有合作。你知道，我们现在正在疯狂地扩展 AWS 的规模。我们还与 CoreWeave 和 Nscale 等新兴公司合作。我们在礼来公司的超级计算机中也有应用。我们在企业级计算机中也有应用。我们在无线基站等边缘计算领域也有应用。你知道，我的意思是，这简直太疯狂了。一个架构就能应用于所有这些不同的系统。我们在汽车中应用，我们在机器人中应用，我们在卫星中应用，我们在太空中应用。因此，拥有这样一个架构，并且生态系统如此广泛，它基本上涵盖了世界上的每一个行业。

Lex Fridman 莱克斯·弗里德曼 Well, how does the CUDA install base evolve into the future with AI factories as a moat? What do you… Do you think it’s possible that NVIDIA of the future is all about the AI factory?  
那么，随着人工智能工厂的崛起，CUDA 的用户基础未来将如何发展？您认为……您认为英伟达的未来发展方向有可能就是人工智能工厂吗？

Jensen Huang 黄仁森 Well, the unit of computing used to be GPU to us. Then it became a computer, then it became a cluster. Now it’s an entire AI factory. When I see a computer, when I see what NVIDIA builds, in the old days, I would, you know, I visualize the chip. And then when I announced the new product, new generation, like, “Ladies and gentlemen, we’re announcing Ampere today,” I’d pick up the chip. That was my mental model- … of what I was building. Today, I wouldn’t… Picking up the chip is kind of still adorable.  
嗯，以前对我们来说，计算单元是 GPU。后来变成了计算机，再后来变成了集群。现在它已经是一个完整的 AI 工厂了。以前，当我看到一台计算机，看到 NVIDIA 的产品时，我会想象芯片的样子。然后，当我发布新产品、新一代产品时，比如“女士们先生们，我们今天发布 Ampere 架构”，我会拿起芯片。那就是我当时的思维模型……也就是我所构建的产品。现在，我不会……拿起芯片这种做法现在看来还是有点可爱。

Jensen Huang 黄仁森 But it’s adorable. It’s not my mental model of what I’m doing. My mental model is this giant gigawatt thing that has power generations connected to the grid. It’s got cooling systems and networking of incredible monstrosity, you know. 10,000 people are in there trying to install it, hundreds of networking engineers in there, thousands of engineers behind it trying to power it up. You know, powering up one of those factories, as you know, it’s not somebody going, “It’s on now.” It takes thousands of people to bring it up.  
但它很可爱。这跟我设想的完全不一样。我设想的是一个巨型千兆瓦级装置，它连接着多个发电厂和电网。它有极其庞大的冷却系统和网络，你知道的。一万人在里面安装它，数百名网络工程师在里面，还有数千名工程师在后面启动它。你知道，启动一个这样的工厂，不是某个人说“现在启动了”就能完成的。它需要成千上万的人才能启动。

Lex Fridman 莱克斯·弗里德曼 So mentally, you’re actually… When you’re thinking about a single unit of compute, you’re like literally, when you go to bed at night, you’re thinking now about a collection of racks, so pods, not individual chips.  
所以从心理上来说，你实际上是……当你思考单个计算单元时，你就像真的，当你晚上睡觉时，你现在想的是一堆机架，也就是模块，而不是单个芯片。

Jensen Huang 黄仁森 Entire infrastructure. And I’m hoping my next click is when I’m thinking about building computers, it’s planetary scale. That’ll be the next click.  
整个基础设施。我希望我的下一次点击，是在思考如何构建行星级规模的计算机的时候。那将是我的下一次点击。

## AI data centers in space太空人工智能数据中心

Lex Fridman 莱克斯·弗里德曼 Well, what do you think about the space angle that Elon has talked about, doing compute in space for solving some of the… It makes some of the energy issues in terms of scaling energy easier.  
嗯，你觉得埃隆谈到的太空角度怎么样？利用太空计算来解决一些问题……这可以更容易地解决一些能源规模化方面的问题。

Jensen Huang 黄仁森 Cooling issues is not easy. Yeah.  
散热问题确实不容易解决。是的。

Lex Fridman 莱克斯·弗里德曼 Cooling. Well, there’s a large number of engineering complexities involved with that. So what… You know, NVIDIA has also announced that you’re already thinking about that.  
散热。嗯，这其中涉及很多复杂的工程问题。所以……你知道，英伟达也已经宣布他们正在考虑这个问题。

Jensen Huang 黄仁森 Yeah, we’re already there. NVIDIA GPUs are the first GPUs in space. And I didn’t realize it, it was so interesting to… I would have declared it maybe. We’re in space. You know, little, little astronaut suit on one of our GPUs. But we’ve been in space. It’s the right place to do a lot of imaging.  
是啊，我们已经做到了。NVIDIA 的 GPU 是首批进入太空的 GPU。我之前都没意识到这一点，这太有趣了……我本来可能会宣布的。我们已经进入太空了。你知道，我们的 GPU 上装了一套小小的宇航服。但我们确实已经进入太空了。那里是进行大量成像工作的理想场所。

Jensen Huang 黄仁森 You know, because those satellites have really high resolution imaging systems, and they’re sweeping the Earth, you know, continuously now. And you want, you know, centimeter scale imaging that is done continuously for the world, so that, you know, you’ll basically have real time telemetry of everything. You don’t wanna beam that back down to Earth. It’s just, you know, petabytes and petabytes of data. You gotta just do AI right there at the edge, throw away everything you don’t need, you’ve seen before, didn’t change, and then just keep the stuff that you need. And so AI had to be done at the edge. Obviously we have 24/7 solar, if we put it at the polars. And but, you know, there’s no conduction, no convection.  
你知道，因为这些卫星配备了非常高分辨率的成像系统，它们正在持续不断地扫描地球。你需要的是厘米级分辨率的全球连续成像，这样你就能实时掌握所有信息的遥测数据。你不想把这些数据传回地球，因为那可是 PB 级的数据。你必须在边缘进行人工智能处理，丢弃所有不需要的、以前见过的、没有变化的数据，只保留你需要的。所以人工智能必须在边缘进行。显然，如果我们把人工智能放在极地，就能获得全天候的太阳能。但是，你知道，那里没有传导，也没有对流。

Jensen Huang 黄仁森 And so, you know, you’re pretty much just radiation. And but, you know, space is big. I guess, you know, we’re just gonna put big, giant radiators out there.  
所以，你知道，你基本上就是辐射。但是，你知道，太空很大。我想，我们只能在那里放置巨大的散热器了。

Lex Fridman 莱克斯·弗里德曼 How crazy of an idea do you think it is? Like is this five years out, 10 years out, 20 years out? So we’re talking about blockers for AI scaling.  
你觉得这个想法有多疯狂？比如，五年后、十年后、二十年后？所以我们讨论的是人工智能规模化发展的障碍。

Jensen Huang You know, I’m just so much more practical. I look for where my next, next bucket of opportunities are first. Meanwhile, I’m cultivating space. And so I send, I send engineers to go work on the problem. We’re starting to… We’re learning a lot about it. How do we deal with radiation? How do we deal with degrading performance? How do we deal with a continuous testing and attestation of defects? And you know, how do we deal with redundancy? And how do we degrade gracefully and things like that? And so we could do a… What about software? How do you think about software and redundancy and performance out in space?  
你知道，我这个人比较务实。我会先寻找下一个、下一个机会。同时，我也在开拓太空领域。所以我派工程师去解决问题。我们开始……我们正在深入了解这方面。我们该如何应对辐射？如何应对性能下降？如何进行持续的缺陷测试和验证？还有，我们该如何解决冗余问题？如何实现优雅降级等等？所以我们可以……软件方面呢？你如何看待太空环境下的软件、冗余和性能问题？

Jensen Huang 黄仁森 Make it so that the computer never breaks, it just gets slower, you know. And I… So we could start doing a lot of engineering exploration upfront. But in the meantime, my favorite answer is eliminate waste. You know, we’ve got all that idle power, I want to evacuate it as fast as possible.  
要让电脑永远不会坏，只会变慢，你知道的。而且……所以我们可以提前做很多工程探索。但与此同时，我最喜欢的答案是消除浪费。你知道，我们有那么多闲置的电力，我想尽快把它们消耗掉。

Lex Fridman 莱克斯·弗里德曼 Yeah. There, there… Yeah, there’s a lot of low-hanging fruit here on Earth- … That we can utilize for the AI scaling. Quick pause. Quick 30-second thank you to our sponsors. Check them out in the description. It really is the best way to support this podcast. Go to lexfridman.com/sponsors. We got Perplexity for curiosity-driven knowledge exploration, Shopify for selling stuff online, LMNT for electrolytes, Fin for customer service AI agents, and Quo for a phone system, like calls, texts, contacts, for your business. Choose wisely, my friends. And now, back to my conversation with Jensen Huang. Do you think NVIDIA may be worth 10 trillion at some point? Let’s, let’s ask it this way. What does the future of the world look like where that’s true?  
是啊。没错……没错，地球上有很多唾手可得的资源……我们可以利用它们来扩展人工智能。稍作停顿。快速感谢一下我们的赞助商，只需 30 秒。请在简介中查看他们的信息。这真的是支持本播客的最佳方式。请访问 lexfridman.com/sponsors。我们赞助了 Perplexity（用于好奇心驱动的知识探索）、Shopify（用于在线销售商品）、LMNT（用于电解质）、Fin（用于客户服务人工智能代理）以及 Quo（用于电话系统，例如通话、短信、联系人等，适用于您的企业）。朋友们，请谨慎选择。现在，回到我和黄仁勋的对话。你认为英伟达的市值在某个时候会达到 10 万亿美元吗？我们换个角度问：如果这是真的，世界的未来会是什么样子？

## Will NVIDIA be worth $10 trillion?英伟达的市值会达到10万亿美元吗？

Jensen Huang 黄仁森 I think that NVIDIA’s growth is extremely likely, and in my mind, inevitable. And let me explain why. We’re the largest computer company in history. That alone should beg the question, why? And the reason of course… Two reasons. First, two foundational technical reasons. The first reason is that computing went from being a retrieval-based, file retrieval system. Almost everything is a file… We pre-write something, we pre-record something. You know, we draw something, we put it on the web, we put it in a file. And we use a recommender system, some smart filter, to figure out what to retrieve for you. And so we were a pre-recording, human pre-recording, and file retrieving system. That’s what a computer is, largely.  
我认为英伟达的增长极有可能，在我看来，甚至是不可避免的。让我解释一下原因。我们是历史上最大的计算机公司。单凭这一点就足以引出一个问题：为什么？当然，原因有两个。首先，是两个基础性的技术原因。第一个原因是，计算机已经从基于检索的文件检索系统发展成为……几乎所有东西都是文件……我们预先编写内容，预先录制内容。你知道，我们画一些东西，把它放到网上，然后保存到一个文件中。我们使用推荐系统，或者某种智能过滤器，来确定应该为你检索什么。所以，我们曾经是一个预先录制、人工预先录制、然后检索文件的系统。这在很大程度上就是计算机的本质。

Jensen Huang 黄仁森 To now, AI computers are contextually aware, which means that it has to process and generate tokens in real time. So we went from a retrieval-based computing system to a generative-based computing system. We’re gonna need a lot more processing in this new world than in the old world. We need a lot of storage in the old world. We need a lot of computation in this new world. And so that’s the first part of it. We fundamentally changed computing and the way how computing is done. The only thing that would cause it to go back……  
如今，人工智能计算机已经具备上下文感知能力，这意味着它必须实时处理和生成词元。因此，我们从基于检索的计算系统转向了基于生成的计算系统。在这个新世界里，我们需要比旧世界多得多的处理能力。旧世界需要大量的存储空间，而新世界需要大量的计算能力。这就是第一部分。我们从根本上改变了计算以及计算的方式。唯一可能导致它倒退的因素是……

Jensen Huang 黄仁森 is if this way of computation, this way of computing generating information that’s contextually relevant, situationally aware, that is grounded on new insight before it generates information, this computation-intensive way of doing computing would only go back if it’s not effective. So if… For the last 10, 15 years while working on deep learning, if at any single moment I would have come to the conclusion that, “You know what? This is not gonna work out. I think this is a dead end.” Or, “It’s not gonna scale, it’s not gonna solve this modality, not gonna be used in this application.” Then, of course, I would feel very differently about it, but I think the last five years has given me more confidence than the previous ten years.  
也就是说，这种计算方式，这种生成与上下文相关、感知情境、并在生成信息之前就基于新洞察的信息的计算方式，这种计算密集型的计算方式，只有在无效的情况下才会被放弃。所以，如果……在过去 10 到 15 年从事深度学习研究的过程中，如果我曾经得出过这样的结论：“你知道吗？这行不通。我觉得这是条死路。”或者，“它无法扩展，它解决不了这种模态的问题，它无法用于这种应用。”那么，当然，我对它的看法会截然不同。但我认为，过去五年比之前的十年给了我更大的信心。

Jensen Huang 黄仁森 The second idea is computers, because it was a storage system, it was largely a warehouse. We’re now building factories. Warehouses don’t make much money. Factories directly correlates with the company’s revenues. And so, the computer did two things. Not only did it change the way it did it, its purpose in the world changed. It’s no longer a computer, it’s a factory. It’s a factory, it’s used for generation of revenues. We’re now seeing not only is this factory generating products, commodities that people want to consume, we’re seeing that the commodities are so interesting, so valuable to so many different audiences that the tokens are starting to segment, like iPhones. You have free tokens, you have premium tokens, and you have several tokens in the middle.  
第二个想法是计算机，因为它最初是一个存储系统，很大程度上是一个仓库。而我们现在建造的是工厂。仓库赚不了多少钱，工厂的收益却与公司的收入直接相关。所以，计算机带来了两方面的变化。它不仅改变了工作方式，也改变了其在世界上的用途。它不再仅仅是一台计算机，而是一座工厂。作为一座工厂，它被用来创造收入。我们现在看到的不仅是这座工厂在生产人们想要消费的产品和商品，而且这些商品对众多不同的受众群体来说都极具吸引力和价值，以至于代币也开始像 iPhone 一样进行细分。有免费代币，有高级代币，还有一些介于两者之间的代币。

Jensen Huang 黄仁森 And so intelligence, as it turns out, you know, it’s a scalable product. There’s extremely high intelligence products, tokens that you could… that are used for specialized things, people be willing to pay. You know, the idea that somebody’s willing to pay $1000 per million tokens is just around the corner. It’s not if, it’s only when. And so, so now we’re seeing that the commodity that this factory makes is actually valuable, and is revenue generating and profit generating. Now the question is how many of these factories does the world need? How many tokens does the world need? And how much is society willing to pay for these tokens? And what would happen to the world’s economy if the productivity were to improve so substantially? What would happen…  
事实证明，智能是一种可扩展的产品。市面上存在着一些智能水平极高的产品，比如代币，它们可以用于一些特定用途，人们愿意为此付费。你知道，有人愿意为每百万个代币支付 1000 美元的想法指日可待。这不是会不会发生的问题，而是何时发生的问题。所以，现在我们看到，这家工厂生产的商品实际上是有价值的，而且能够产生收入和利润。现在的问题是，世界需要多少这样的工厂？世界需要多少代币？社会愿意为这些代币支付多少钱？如果生产力大幅提高，世界经济将会发生什么变化？将会发生什么……

Jensen Huang 黄仁森 Are we, are we gonna discover new drugs, new products, new services? And so when you take these things in combination, I am absolutely certain that the world’s GDP is going to accelerate in growth. I’m absolutely certain the percentage of that GDP that will be used for computation will be 100 times more than the past—mm-hmm—because it’s no longer a storage unit. It’s a product generation unit. And so when you look at it in that context and then you back into what is NVIDIA’s, what does NVIDIA sh—what does NVIDIA do and how much of that new economics, new industry would we have to benefit t—to address, I think we’re gonna be a lot, lot bigger.  
我们是否会发现新药、新产品、新服务？综合考虑这些因素，我绝对相信世界 GDP 将会加速增长。我绝对相信用于计算的 GDP 比例将是过去的 100 倍——嗯——因为计算不再是存储单位，而是产品生成单位。所以，从这个角度来看，再回到 NVIDIA 的定位，NVIDIA 的业务是什么，以及我们将如何从这种新的经济模式和产业中受益，我认为我们将发展壮大得多。

Jensen Huang 黄仁森 And then the rest of it, to me, is: is it possible for NVIDIA to be a, you know, $3 trillion revenue company in the near future? The answer is, of course, yes. And the reason for that is because it’s not limited by any physical limits. There’s nothing that I see that says, you know, gosh $3 trillion is not possible. And as it turns out, NVIDIA’s supply chain is—the burden is shared by 200 companies. And the fact that we scale out on the backs of, with the partnership of this ecosystem, the question is: do we have the energy to do so? And surely we will have the energy to do so. And so all of these things combined, that number is just a number, you know?  
对我来说，剩下的问题是：英伟达是否有可能在不久的将来成为一家年收入 3 万亿美元的公司？答案当然是肯定的。原因在于它不受任何物理限制。我没看到任何迹象表明 3 万亿美元的营收是不可能的。事实上，英伟达的供应链——由 200 家公司共同承担——正在蓬勃发展。我们依靠这个生态系统的合作来实现规模扩张，问题是：我们是否有足够的精力做到这一点？答案是肯定的，我们肯定有足够的精力做到这一点。所以，综合所有这些因素，3 万亿美元只是一个数字而已。

Jensen Huang 黄仁森 And I still remember, NVIDIA was a… the first time we crossed a billion dollars, I was reminded of a CEO who told me, “You know, Jensen, it’s theoretically impossible for a fabless semiconductor company to exceed a billion dollars.” And I won’t bore you with why, but of course it’s illogical and there’s a lot of evidence we’re not. And then somebody told me, “You know, Jensen, you’ll never be more than $25 billion because of some other company.” Somebody told me that, “You’ll never be, you know, because…” And so those aren’t principled, first principled reason thinking. And the simple way to think about that is what is it that we make and how large is the opportunity that we can create?  
我还记得，英伟达第一次市值突破十亿美元的时候，一位 CEO 跟我说过：“你知道吗，詹森，理论上来说，一家没有晶圆厂的半导体公司不可能市值超过十亿美元。” 我就不赘述原因了，但当然，这不合逻辑，而且有很多证据表明我们做到了。然后有人跟我说：“你知道吗，詹森，你永远不可能超过 250 亿美元，因为其他公司。” 有人跟我说：“你永远不可能，你知道，因为……” 所以这些都不是基于原则的理性思考。而思考这个问题的简单方法是：我们生产什么？我们能创造多大的机会？

Jensen Huang 黄仁森 Now, NVIDIA is not in the market share business. Almost everything that I just talked about don’t exist. That’s the part that’s hard. You know, if NVIDIA was a $10 billion company trying to take NVIDIA’s share, then it’s easy to see for shareholders that, oh, yeah, if they could just take 10% share, they could be this much larger. But it’s hard for people to imagine how large we could be because there’s nobody I could take share from. You know? And so I think that that’s one of the challenges for the world is the imagination of the future. But I got plenty of time, and I’ll keep reasoning about it, and I’ll keep talking about it, and every single GTC will become more and more real.  
现在，英伟达并不追求市场份额。我刚才提到的几乎所有事情都不存在。这才是难点所在。你知道，如果英伟达是一家市值 100 亿美元的公司，试图抢占英伟达的市场份额，那么股东们很容易理解，哦，是的，如果他们能抢占 10%的市场份额，他们的规模就能扩大这么多。但人们很难想象我们能发展到多大规模，因为我根本无法从任何竞争对手那里抢走市场份额。你明白吗？所以我认为，对未来的想象是世界面临的挑战之一。但我还有很多时间，我会继续思考，继续讨论，每一次 GTC 大会都会让这些设想变得越来越真实。

Jensen Huang 黄仁森 You know, and then more and more people will talk about it, and one of these days, you know, we’ll get there. But I’m 100% we’ll get there.  
你知道，然后越来越多的人会谈论这件事，总有一天，我们会实现的。但我百分之百肯定我们会实现的。

Lex Fridman 莱克斯·弗里德曼 Yeah, this view of you know, token factories essentially, this token per second per watt, and every token having value. Like it’s an actual thing that brings value, and it brings different kinds of value, different amounts of value to different people with value. That’s the actual product—it really could be loosely thought of as the token. And so you have a bunch of token factories. And then it’s very easy, first principles, to imagine a future, given all the potential things that AI can solve, that you’re going to need an exponential number more of token factories.  
是的，这种观点本质上就是代币工厂，每秒每瓦产生一个代币，每个代币都有价值。它就像一个实实在在的东西，能带来价值，而且能为不同的人带来不同类型的价值，不同数量的价值。这就是实际的产品——它其实可以被粗略地理解为代币。所以你就有了一堆代币工厂。然后，从基本原理上很容易想象，考虑到人工智能能够解决的所有潜在问题，未来你需要数量呈指数级增长的代币工厂。

Jensen Huang 黄仁森 Yeah. And what’s really interesting, the reason why I was so excited about it, the iPhone of tokens arrived.  
是的。真正有趣的是，我如此兴奋的原因是，代币的 iPhone 来了。

Lex Fridman 莱克斯·弗里德曼 What do you call it? Wait, are you saying OpenClaw’s iPhone?  
你管它叫什么？等等，你是说 OpenClaw 的 iPhone 吗？

Jensen Huang 黄仁森 Yeah.  
是的。

Lex Fridman 莱克斯·弗里德曼 That’s interesting.  
这很有意思。

Jensen Huang 黄仁森 Agents.  
特工。

Lex Fridman 莱克斯·弗里德曼 Yeah, agents. True.  
是啊，特工们。没错。

Jensen Huang 黄仁森 Agents in general. The iPhone of tokens arrived. It is the fastest-growing application in history. It went straight up. Went straight up.  
总的来说，代理商们。代币界的 iPhone 来了。它是历史上增长速度最快的应用程序。它一路飙升。一路飙升。

Lex Fridman 莱克斯·弗里德曼 That says something.  
这说明了一些问题。

Jensen Huang 黄仁森 Yep, there’s no question OpenClaw is the iPhone of tokens.  
没错，毫无疑问，OpenClaw 就是代币界的 iPhone。

Lex Fridman 莱克斯·弗里德曼 Is there something truly, as you know, something truly special happening from about December, where people have really woke up to the power of Claude Code of Codex, of OpenClaw? I mean, I’m embarrassed to admit that on the way here in the airport, I’ve… It’s the first time I’ve done this in public. I was programming, quote unquote, by talking to my laptop.  
你知道，从去年 12 月开始，是不是真的发生了什么特别的事情，人们真正意识到了 Claude Code 的 Codex 和 OpenClaw 的强大之处？说实话，我都不好意思承认，在来机场的路上，我……这是我第一次在公共场合这么做。我当时正在对着我的笔记本电脑“自言自语”地编程。

Jensen Huang 黄仁森 Yeah, exactly.  
没错，正是如此。

Lex Fridman 莱克斯·弗里德曼 And I was embarrassed because I was pretending like I’m talking to a human colleague. I’m not sure how I feel about the future where everybody- … is walking around talking to their AI, but it’s such an efficient way to get stuff done.  
我当时很尴尬，因为我假装在和一位人类同事交谈。我不确定我对未来那种人人都……到处和人工智能对话的情景作何感想，但这确实是一种非常高效的做事方式。

Jensen Huang 黄仁森 And it’s more likely that your AI is bothering you all the time. And the reason for that is because it’s getting stuff done so fast. It’s reporting back to you, “I got that done.” “You know, what do you want me to do next?” You know, it… That’s the part that I think most people don’t realize is the person who’s gonna be chatting with them, texting them most, is their, is their claws or lobster.  
你的 AI 很可能一直在打扰你。原因在于它完成任务的速度太快了。它会向你汇报：“我已经完成了。”“你知道，接下来你想让我做什么？”你知道，它……我觉得大多数人没有意识到的是，那个经常和他们聊天、给他们发短信的人，其实是他们的爪子或龙虾。

## Leadership under pressure压力下的领导力

Lex Fridman 莱克斯·弗里德曼 What an incredible future. I read that you attribute a lot of your success to your ability to work harder than anyone and withstand more suffering than anyone. So we can list many of the things that entails. I mean, dealing with failure, the cost and engineering problems we’ve talked about. The human problems, uncertainty, responsibility, exhaustion, embarrassment, the near-death company moments that you’ve mentioned but also the pressure. Now, as the CEO of this company that economies and nations strategize around, plan their financial allocations around, plan their AI infrastructure around, how do you deal with this much pressure? What gives you strength, given how many nations and peoples depend on you?  
多么令人振奋的未来！我读到您将自己的成功很大程度上归功于您比任何人都更努力、更能承受苦难。那么，这其中就包含着很多方面。比如，应对失败、我们之前讨论过的成本和工程问题；人际关系问题、不确定性、责任、疲惫、尴尬、您提到的公司濒临倒闭的时刻，以及巨大的压力。作为一家举国上下都围绕其制定战略、规划财政分配、构建人工智能基础设施的公司的首席执行官，您是如何应对如此巨大的压力的？鉴于如此多的国家和人民都依赖着您，是什么赋予了您力量？

Jensen Huang 黄仁森 I’m conscious about the fact that NVIDIA’s success is very important to the United States. We generate enormous amounts of tax revenues. We established technology leadership for our nation. Technology leadership is important for national security. National security not just in one aspect of national security, all aspects of national security. When our country’s more prosperous, we could do a better job with domestic policies and helping social benefits. Because we’re generating so much re-industrialization in the United States, we’re creating mountains of jobs. We’re helping shift how we build things back to the United States in so many different plants, chips, computers, and of course, these AI factories. I’m completely aware that, that…  
我非常清楚英伟达的成功对美国至关重要。它为我们创造了巨额税收，并确立了我们国家的技术领先地位。技术领先地位对国家安全至关重要。这里说的国家安全并非仅仅指某一方面，而是所有方面。当我们的国家更加繁荣时，我们就能在国内政策和社会福利方面做得更好。因为我们在美国推动了大量的再工业化，我们创造了大量的就业机会。我们正在帮助将生产方式从芯片、计算机，当然还有人工智能工厂等众多领域转移回美国。我完全明白这一点……

Jensen Huang 黄仁森 And I have the benefit, and this is a real gift with mainstream investors, teachers, policemen who have somehow, for whatever reason, invested in NVIDIA or because they watched Jim Cramer, bought some stock and now are millionaires.  
我的优势在于，主流投资者、教师、警察，他们不知何故投资了英伟达，或者因为他们看了吉姆·克莱默的节目，买了一些股票，现在都成了百万富翁。这真是一份厚礼。

Jensen Huang 黄仁森 And I am completely aware of that circumstance. I’m aware of the circumstance that NVIDIA is central to a very large network of ecosystem partners behind us and downstream from us. And so the way I deal with that is exactly what I just did. I reason about what is… what is it that we’re doing? What is it causing? What’s the impact that has on other people benefit, you know, positively or even through great burden, for example, to supply chain? And the question is therefore, what are you gonna do about it? In almost everything that I feel, I break it down, I reason about, “Okay, what’s the circumstance? What has changed? What’s hard? And what am I gonna do about it?” And I’m…  
我完全了解这种情况。我知道英伟达在我们背后以及下游拥有一个庞大的生态系统合作伙伴网络，而这个网络的核心地位至关重要。所以我处理这种情况的方式就是我刚才所做的。我会思考……我们正在做什么？它造成了什么后果？它对其他人有什么影响？是积极的，还是会带来巨大的负担，例如对供应链的影响？因此，问题是，你打算怎么做？几乎在我感受到的所有事情中，我都会进行分析，思考：“好吧，情况是什么？发生了什么变化？有什么困难？我打算怎么做？”然后我……

Jensen Huang 黄仁森 I break it down, decompose the problem, and the decomposition of these circumstances turns it into manageable things that I can do. And the only thing that after that I could do is, “Did you do it? Did you either do it or did you get somebody else to do it? And if you didn’t do it, you reasoned that you need to do it, and you didn’t do it, and you didn’t get anybody else to do it, then stop crying about it.”… you know? And so, and so-  
我把问题分解开来，把情况分解成我可以处理的小事。之后我唯一能做的就是：“你做了吗？是你自己做的，还是找别人做的？如果你没做，你觉得你应该做，但你没做，也没找别人做，那就别再抱怨了。”……你懂的？就这样，就这样——

Jensen Huang 黄仁森 so I’m fairly tough on myself. And, but I also break things down so that I don’t panic. I can go to sleep because I’ve made the list of things that needed to be done, and I’ve made sure that everything that could put our company in harm’s way, could put my partners in harm’s way, put our industry in harm’s way, I’ve told somebody. Everything that I feel could put anybody in harm’s way, I’ve told someone. And I’ve told that someone who could do something about it. And so I’ve gotten it off my chest or I’m doing something about it. And so after that, Lex, what else can you do?  
所以我对自己要求很高。而且，我也会把事情分解开来，这样我就不会慌张。我可以安心睡觉，因为我已经列出了需要做的事情清单，并且确保所有可能危及公司、危及合作伙伴、危及整个行业的事情，我都告诉了别人。所有我觉得可能危及任何人的事情，我都告诉了别人。而且我告诉了那些能够解决问题的人。所以，我已经把事情说出来了，或者我正在采取行动。那么，莱克斯，在那之后，你还能做些什么呢？

Lex Fridman 莱克斯·弗里德曼 So given all the insane, intense amount of suffering on the journey of building up NVIDIA, have you hit low points psychologically?  
鉴于在创建 NVIDIA 的过程中所经历的种种疯狂而又巨大的痛苦，你是否在心理上经历过低谷？

Jensen Huang Oh, yeah. Oh, yeah. Sure. All the time. All the time.

Lex Fridman And there-

Jensen Huang All the time

Lex Fridman … you just break down the problem into pieces? See what you could do about it?

Jensen Huang And part of it, Lex, part of it is forgetting. One of the most important attributes of AI learning, as you know, is, right? Systematic forgetting. You need to know when to forget some things. You can’t memorize everything. You can’t keep everything and, you know, you don’t want to carry everything. One of the things that I do very quickly is decompose the problem, I reason about the problem, and I share the load with it. When I say I tell everybody, I’m essentially sharing that burden.

Jensen Huang As quickly as possible. Whatever worries me, tell somebody else. Don’t just keep it. You know, don’t freak them out. Decompose the problem into smaller parts and get people to, and inspire them to be able to go do something about it. But part of it is just forgetting. You know, like, a lot of it is you gotta be tough on yourself. You know, just come on, stop crying about it. Let’s get going. You know? And then you get out of bed. And then the other part is you’re attracted to the next shiny light, the next future, the next opportunity, the next, “Okay, that’s behind us. What’s next?” It’s a lot, I think, you know, you watch this with great athletes. They just worry about the next point. The last point is behind them. The embarrassment, the, you know- … the setback.

Jensen Huang You know, and because I do so much of my job publicly, you know? Lex, you do a fair amount of your job publicly too. And so I do a lot of my job publicly. And so you know, I say a lot of things that seem sensible at the time or funny at the time, mostly it’s just because it’s funny to me at the time. And then, you know, you reflect on it, it’s less funny, but…

Lex Fridman Yeah. No, trust me, I know. But you basically allow yourself to be pulled by the light of the future. Forget the past and just keep-

Jensen Huang That’s right.

Lex Fridman … keep working towards that. I mean, you did say, there’s this kind of famous thing you said that if you knew how hard it would be to build NVIDIA it turned out to be—what is it? A million times more hard than you anticipated—that you wouldn’t do it.

Jensen Huang Yeah, right.

Lex Fridman But isn’t… You know, when I hear that, that’s probably true about everything worth doing, right?

Jensen Huang Exactly. That is, by the way, what I was trying to explain, is that there’s an incredible superpower of having the mind of a child. You know? And I say to myself oftentimes when I look at something, and almost everything my first thought is, “How hard can it be?” You know? And so you get yourself into that mode, how hard could it be? And nobody’s ever done it. It looks gigantic. It’s gonna cost hundreds of billions of dollars. It’s gonna take, you know, all this… And you just go, “Yeah, but how hard could it be?” You know? How hard could it be?

Jensen Huang And so, you gotta get yourself into that state of mind. You don’t wanna actually over-simulate everything and all the setbacks and all the trials and tribulations and all the disappointments. You don’t wanna simulate all that in advance. You don’t wanna know that. You wanna go into a new experience thinking it’s gonna be perfect, it’s gonna be great, it’s gonna be incredibly fun. And then while you’re there, you know, you need to have endurance, you need to have grit, so that when the setbacks actually happen, and those setbacks are gonna surprise you, the disappointments are gonna surprise you, the embarrassments are gonna surprise you, the humiliations are gonna surprise you.

Jensen Huang You just can’t let… Now you just gotta turn on the other bit, which is just forget about it. Move on, keep moving. And to the extent that my assumptions about the future and why the future is gonna manifest, so long as those assumptions and that input doesn’t change or didn’t change materially, then I should expect that the output won’t change. And so my simulated output of the future is still gonna happen. And if it’s still gonna happen, I’m still gonna go after it.

Jensen Huang I believe it’s gonna, you know, and so there’s a combination of two or three human characteristics: the ability to go into an experience fresh-minded, the ability to forget the setbacks, the ability to believe in yourself, you know, to believe what you believe and stay true to that belief. But you’re constantly reevaluating.

Jensen Huang This combination of three, four, five things I think is really important for resilience. And, you know, I’m fortunate that whatever life experiences led to this, I’ve got kind of those four, five things. You know, I’m always curious, always learning. I’m always learning from everybody, you know? I’m always asking my… And because I’m humble about everything, I’m always thinking, “Gosh, they did that so nicely. They did that so wonderfully.” You know, I wonder what they’re thinking through. How do they… So I’m simulating everybody. In a lot of ways, you know, I’m emulating almost everybody I watch, right? You’re empathetic towards everything that they do that you’re observing and respect. And so you’re constantly learning and, you know.  
我认为这三、四、五件事的结合对韧性真的非常重要。你知道，我很幸运，无论是什么样的人生经历造就了现在的我，我都具备了这四、五件事。你知道，我总是充满好奇心，总是不断学习。我总是向所有人学习，你知道吗？我总是问我的……而且因为我对所有事情都保持谦逊，我总是想，“哇，他们做得真好。他们做得太棒了。”你知道，我会想他们在想些什么。他们是怎么……所以我在模仿每个人。在很多方面，你知道，我几乎在模仿我观察的每个人，对吧？你会对他们所做的一切产生共鸣，并尊重他们。所以你会不断地学习，你知道。

Lex Fridman 莱克斯·弗里德曼 You’re now one of the wealthiest people on Earth. One of the most successful humans on Earth. Is it harder to be humble and to be able to… Do you feel the effect of money and power and fame in making it harder for you to sort of be wrong in your own head? Enough to hear out an opinion of somebody else when they disagree with you and learn from them? Those kinds of things.  
你现在是世界上最富有的人之一，也是世界上最成功的人之一。保持谦逊，做到……你是否觉得金钱、权力和名望让你更难承认自己的错误？让你难以倾听与你意见相左的人的观点并从中学习？诸如此类的事情。

Jensen Huang 黄仁森 Surprisingly, no. And I would actually go the other way. Because I do so much of my work publicly, when I’m wrong, pretty much everybody sees it.  
出乎意料的是，不。而且我其实会选择相反的做法。因为我的很多工作都是公开进行的，所以当我犯错时，几乎所有人都能看到。

Lex Fridman 莱克斯·弗里德曼 You get humbled. Fair enough.  
你会感到羞愧。这很公平。

Jensen Huang 黄仁森 And when I’m wrong—when I’m wrong or it didn’t turn out that way or, you know, I mean, most of the things that I say outside I’m fairly certain about. And the reason for that is because it’s gonna impact somebody else and I want to be quite concerned about that and quite circumspect about that. For stuff that I’m reasoning about inside a meeting, you know, a lot of things could turn out differently. And so, but it doesn’t ever stop me from reasoning. The way that I manage and lead, I’m constantly reasoning in front of people. And even when I’m talking to you, you can kind of see me reasoning through things. And I want to make sure that you understand what I’m saying not because I told you-  
当我犯错的时候——当我错了，或者事情没有按预期发展，或者你知道，我的意思是，我在公开场合说的大部分话我都相当肯定。原因在于，这些话会影响到其他人，所以我对此非常关注，也非常谨慎。至于我在会议中思考的事情，你知道，很多事情都可能朝着不同的方向发展。所以，但这从不会阻止我进行思考。我的管理和领导方式，就是不断地在众人面前进行思考。即使是在和你说话的时候，你也能看出我是在思考问题。我希望确保你理解我的意思，不是因为我告诉你——

Jensen Huang 黄仁森 … because I’m so humble about what I’m about to tell you. I kind of show you the steps that I got there. And then you can decide whether you believe what I said in the end. And so I’m doing that all day long in meetings. With all of my employees, I’m constantly reasoning through, “Let me tell you how I see it.” And then I reason through it. It gives everybody the opportunity to intercept and say, “I disagree with that part.” The nice thing about reasoning through things and letting people interact with it is that they don’t have to disagree with your outcome. They can disagree with your reasoning steps. And they could pull me in different directions, and then we can reason forward. And so we’re kind of, you know, a collective path searching method. And it’s really fantastic.  
……因为我对接下来要说的内容非常谦虚。我会先向你们展示我得出结论的步骤。然后你们可以自行判断是否相信我最终的说法。所以我在开会的时候每天都这样做。我和我的所有员工都会不断地进行推理，“让我来告诉你们我的看法。”然后我会进行推理。这让每个人都有机会插话，说“我不同意这部分”。推理并让大家参与讨论的好处在于，他们不必反对你的结论。他们可以反对你的推理步骤。他们可以引导我得出不同的结论，然后我们就可以继续推理下去。所以，我们其实是在进行一种集体探索路径的方法。这真的很棒。

Lex Fridman 莱克斯·弗里德曼 Yeah, you have this way about you of … When you’re explaining stuff, I can feel you actually reasoning on the spot about it with a constant open-mindedness where you could … I could feel like I could steer your thinking. And that’s a—that’s really beautiful that you’ve been able to maintain that after so many years of success, and pain. I think sometimes pain closes you down a bit. And I think to maintain-  
是啊，你身上有种特别的气质……当你解释事情的时候，我能感觉到你一直在即兴思考，而且始终保持着开放的心态，感觉……我甚至觉得我可以引导你的思路。这——这真的很了不起，在经历了这么多年的成功和痛苦之后，你还能保持这种心态。我觉得有时候痛苦会让人变得有些封闭。而要保持这种心态——

Jensen Huang 黄仁森 Yeah. Tolerance for embarrassment, I think is…  
是啊。我觉得，对尴尬的容忍度是……

Lex Fridman 莱克斯·弗里德曼 Yes, that’s… The tolerance… I mean, that’s a real thing. Is many years of embarrassing yourself. Even those meetings knowing that there’s people around you where you declared one idea and it was shown that that idea was wrong- … and be able to admit that and to grow from that. That’s not—that’s very difficult on a human level.  
是的，那就是……这种宽容……我的意思是，这真的很难。它需要多年的自我羞辱。即使是在那些会议上，明知周围都是人，你提出了一个想法，结果却被证明是错的——……然后能够承认错误并从中成长。这——这在人性层面上非常难。

Jensen Huang 黄仁森 Yeah. Well, you know. They knew I was—they knew that recently my first job was cleaning toilets, so.  
是啊。你知道的。他们知道我——他们知道我最近的第一份工作是打扫厕所，所以。

## Video games 电子游戏

Lex Fridman 莱克斯·弗里德曼 I’m glad you maintained that same spirit of Denny’s, the work. I mean, that was beautiful. Your whole journey starting from Denny’s is a beautiful one. Let me ask you about video games. So I’m a big gaming fan. So I have to say thank you to NVIDIA for many years of incredible graphics.  
我很高兴你保持了丹尼餐厅的那种精神，还有你的工作。我的意思是，那真是太棒了。你从丹尼餐厅开始的整个职业生涯都非常精彩。我想问问你关于电子游戏的问题。我是个游戏迷。所以我要感谢 NVIDIA 多年来提供的令人惊叹的图形效果。

Jensen Huang 黄仁森 By the way, GeForce is our still, to this day- … our number one marketing strategy. Right. People learn about NVIDIA while they’re in their teenage years. And then they go to college and they know who NVIDIA is and in the beginning it’s just, you know, playing Call of Duty, Fortnite. And then later they’re using CUDA, and then later they’re using NVIDIA and, you know, Blender and Dassault and Autodesk.  
顺便说一句，GeForce 至今仍然是我们最重要的营销策略。没错。人们在青少年时期就开始了解 NVIDIA。然后他们上了大学，知道 NVIDIA 是谁，一开始只是玩《使命召唤》和《堡垒之夜》之类的游戏。后来他们开始使用 CUDA，再后来他们开始使用 NVIDIA 的产品，比如 Blender、Dassault 和 Autodesk 的产品。

Lex Fridman 莱克斯·弗里德曼 Yeah. I mean, I should say I mentioned to a friend that I’m talking with you. He said, “Oh, they make great gaming GPUs.”  
是啊。我是说，我跟一个朋友提过我在跟你聊天。他说：“哦，他们生产的显卡很棒。”

Jensen Huang 黄仁森 Yeah, exactly.  
没错，正是如此。

Lex Fridman 莱克斯·弗里德曼 It’s like-  
就像——

Jensen Huang 黄仁森 Exactly.  
没错。

Lex Fridman 莱克斯·弗里德曼 You know, there’s more to it, but, yeah, people really love it. It really brought a lot of joy to a lot of people. The hardware really brings these worlds to life. There was some controversy around this with DLSS 5. Can you explain to me the drama around this? I guess people, the gamers online were concerned that it makes games look like AI slop. What do you think of this drama?  
你知道，这其中还有很多原因，但没错，人们真的很喜欢它。它确实给很多人带来了快乐。硬件确实让这些世界栩栩如生。DLSS 5 曾引发一些争议。你能跟我说说这场风波吗？我猜想，网上的玩家担心它会让游戏看起来像人工智能在胡乱操作。你对这场风波有什么看法？

Jensen Huang Yeah. I think their perspective makes sense and I could see where they’re coming from, because I don’t love AI slop myself. You know, all of the AI-generated content increasingly looks similar and they’re all beautiful, and so I’m empathetic towards what they’re thinking. That’s just not what DLSS 5 is trying to do. I showed several examples of it. But DLSS 5 is 3D-conditioned, 3D-guided. It’s ground truth structure data guided. And so the artist determined the geometry. We are completely truthful to the geometry maintained in every single frame. It’s conditioned by the textures, the artistry of the artist. And so every single frame, it enhances but it doesn’t change anything.

Jensen Huang Now, the question is about enhancing. DLSS 5 also lets, because the system is open, you could train your own models to determine, and you could even in the future prompt it. You know, I want it to be a toon shader. I want it to look like this kind of, so you can give it even an example. And it would generate in the style of that, all consistent with the artistry, the style, the intent of the artist. And so all of that is done for the artist, so that they can create something that is more beautiful but still in the style that they want. I think that they got the impression that the games are gonna come out the way the games are, shipped the way they do, and then we’re gonna post-process it. That’s not what DLSS is intended to do.

Jensen Huang DLSS is integrated with the artist, and so it’s about giving the artist the tool of AI, the tool of generative AI. They could decide not to use it, you know?

Lex Fridman I think people are very sensitive to human faces. And we’re now living in this moment, which I think is a, is a beautiful one, which is people are sensitive to AI slop. It puts a mirror to ourselves to help us realize that what we seek is imperfections. What we seek is sometimes not perfect graphics. It helps us understand what we find compelling in the worlds we create. And that’s beautiful. And as long as it’s tools that help us create those worlds-

Jensen Huang Yeah, that’s right.

Lex Fridman … it’s wonderful.

Jensen Huang That’s right. Yet, yet another tool, and they want the generative models to generate the opposite of photo real. Yeah, it’ll do that too. And so it’s just yet another tool. I think the gamers might also appreciate that in the last couple of years, we introduced skin shaders to the game developers. And many of those games have skin shaders that include subsurface scattering that make skin look more skin-like. And so the industries, you know, game developers are looking for more and more tools to express their art. And so this is just yet one more tool, and they get to decide what to use.

Lex Fridman Ridiculous question. What do you think is the greatest or most influential game ever made? Maybe from NVIDIA’s perspective?

Jensen Huang Doom.

Lex Fridman Doom, unquestionably. That was the start of the 3D.

Jensen Huang I would say Doom, from an art, the intersection of the cultural implication as well as the industry, turning a PC into a gaming device. That was a very important moment. Now, of course, flight simulation companies were before it. And but they just didn’t have the popularity that Doom did to have made the industry turn the PC from an office automation tool into a personal computer for families and gamers and things like that. And so Doom was really impactful there. From an actual game technology perspective, I would say Virtua Fighter. And so we’re great friends with both of them, you know?

Lex Fridman And then there’s games more recently—I mean, Cyberpunk 2077, really nice GPU-accelerated graphics. Like-

Jensen Huang Fully ray traced.

Lex Fridman Fully ray traced. Also, I like, I personally, I’m a huge fan of Skyrim, Elder Scrolls, and the, you know, it’s, it’s been released a long, long time ago, but people release mods and-

Jensen Huang We love mods.

Lex Fridman … they create these inc- I mean, it’s like a different game and it just allows me to replay the game over and over. It makes you realize that you can re-experience in a totally new way the world you already love. So-

Jensen Huang That’s right.

Lex Fridman … I do that all the time. One of my favorite things is just walk across Skyrim.

Jensen Huang We created this thing called RTX Mod. Yeah, it’s a modding tool.

Lex Fridman Awesome.

Jensen Huang It allows the community to inject the latest technology into an old game.

Lex Fridman Of course, like what makes a great video game is not just graphics, it’s also story and character development, but-

## AGI timeline

Jensen Huang That’s right

Lex Fridman … beautiful graphics can add to the immersion. The feeling like it’s another place you’re transported to. Ah, what you said, I think accurately, that the AGI timeline question rests on your definition of AGI. So let’s, let me ask you about possible timelines here. Let’s, this ridiculous definition perhaps of what AGI is, but an AI system that’s able to essentially do your job. So, run, no, start, grow, and run a successful technology company that’s worth-

Jensen Huang A good one or a one?

Lex Fridman No. It has to be worth more than a billion, more than a billion dollars. So, you know, you know how hard it is to do all those components. So, how far are we away from that? So, we’re talking about Open-Claude that does all the incredibly complex stuff that are required to, first of all, innovate, to find customers, to sell to them, to manage, to build a team of some agents, some humans, all that kind of stuff. Is this five, 10, 15, 20 years away?

Jensen Huang I think it’s now. I think we’ve achieved AGI.

Lex Fridman Do you think you could have a company run by an AI system like this?

Jensen Huang Possible, and the reason for that is this. You said a billion, and you didn’t say forever. And so for example… It is not out of the question that a Claude was able to create a web service, some interesting little app that all of a sudden, you know, a few billion people used for 50 cents, and then it went out of business again shortly after. Now, we saw a whole bunch of those type of companies during the internet era, and most of those websites were not anything more sophisticated than what Open-Claude could generate today.

Lex Fridman Interesting. Achieve virality and monetize that virality.

Jensen Huang Yeah. It’s just that I don’t know what it is, but I couldn’t have predicted any of those companies at the time either, you know? And –

## Future of programming

Lex Fridman You’re gonna get a lot of people excited with that statement.

Jensen Huang Yeah, no. Yeah.

Lex Fridman It’s like, what do you mean? I can just launch an agent and make a lot of money.

Jensen Huang Well, by the way, it’s happening right now, right? You know that when you go to China you’re gonna see, you’re gonna see a whole bunch of people teaching their, getting their Claudes to try to go out and look for jobs and, you know, do work, make money. And I’m not, I’m not actually… I wouldn’t be surprised if some social thing happened or somebody created a digital influencer, super, super cute, or some social application that, you know, feeds your little Tamagotchi or something like that, and it become out of the blue an instant success. A lot of people use it for a couple of months and it kind of dies away. Now, the odds of 100,000 of those agents building NVIDIA is zero percent.

Jensen Huang And then, and then the one part that I will, I won’t do and I wanna make sure we all do, is to recognize that people are really worried about their jobs. And I just want to remind them that the purpose of your job and the tasks and tools that you use to do your job are related, not the same. I’ve been doing my job for 33 years. I’m the longest running tech CEO in the world, 34 years. And the tools that I’ve used to do my job has changed continuously in the last 34 years, and sometimes quite dramatically, you know, over the course of a couple, two, three years. And the one story that I really wanna make sure that everybody hears is the story that the first job that computer scientists said, AI researchers said was gonna go away was radiology.

Jensen Huang Because computer vision was going to achieve superhuman levels, and it did. CV… Computer vision was superhuman in 2019, 20, maybe maybe a little bit later, 2020?

Jensen Huang Okay? And so it’s been a long time since computer vision has been superhuman. And so the prediction was radiologists would go away because studying radiology scans was a thing of the past. AI will do that. Well, they were absolutely right. Computer vision is completely superhuman. Every radiology platform and package today is driven by AI, and yet the number of radiologists grew. And so the question is why? And we now have a shortage of radiologists in the world. And so, one, the alarmist warning went too far and it scared people from doing this profession that is so important to society. And so it did harm. Now, why was it wrong? The reason why is because the purpose of a radiologist, the purpose is to diagnose disease and help patients and doctors diagnose disease.  
好的？计算机视觉超越人类能力已经很久了。因此，有人预测放射科医生会消失，因为研究放射影像已成为过去式，人工智能会取代他们。事实证明，他们的预测完全正确。计算机视觉已经完全超越了人类。如今，所有放射学平台和软件包都由人工智能驱动，然而放射科医生的数量却在增长。那么问题来了，为什么？现在，全球放射科医生短缺。首先，之前的危言耸听的警告矫枉过正，吓跑了很多人，让他们不敢从事这个对社会至关重要的职业。这造成了伤害。那么，为什么这种警告是错误的呢？原因在于，放射科医生的职责是诊断疾病，帮助患者和医生诊断疾病。

Jensen Huang 黄仁森 And because we’re able to study scans so much faster now, you could study more scans, you could diagnose better, you could in-patient faster, you can see people more. The hospitals are making more money. You have more patients in the hospital. You need more radiologists. I mean, the amazing thing is, it’s so obvious this was gonna happen. The number of software engineers at NVIDIA is gonna grow, not decline. And the reason for that is because the purpose of a software engineer and the task of a software engineer coding are related, not the same. I wanted my software engineers to solve problems. I didn’t care how many lines of code they wrote, you know? But their job, their purpose of their job didn’t change.  
正因为我们现在能够更快地分析扫描结果，所以你可以分析更多的扫描结果，做出更准确的诊断，更快地处理住院病人，接诊更多的病人。医院的收入也随之增加。住院病人更多了，就需要更多的放射科医生。我的意思是，最令人惊讶的是，这一切的发生其实是显而易见的。NVIDIA 的软件工程师数量将会增长，而不是减少。原因在于，软件工程师的职责和编写代码的任务是相关的，但并非完全相同。我希望我的软件工程师能够解决问题。我并不在意他们写了多少行代码，你知道吗？但他们的工作，他们的工作目标，并没有改变。

Jensen Huang 黄仁森 Solving problems, working as a team, diagnosing problems, evaluating the result, looking for new problems to solve, innovation, connecting dots. You know, none of that stuff is gonna go away.  
解决问题、团队合作、诊断问题、评估结果、寻找新的待解决问题、创新、融会贯通。你知道，这些都不会消失。

Lex Fridman 莱克斯·弗里德曼 Do you think it’s possible that… Let’s even take coding. Do you think the number of programmers in the world might increase, not decrease?  
你认为有可能……我们甚至以编程为例。你认为世界上程序员的数量可能会增加而不是减少吗？

Jensen Huang 黄仁森 Yes. And the reason for that is this. What is the definition of coding? I believe it is… The definition of coding, as of today, is simply specifying, specification, and maybe if you want to be rather directive, you could even give it an architecture of the software that you wanted to write. So the question is, how many people could do that? Describe a specification for a computer to go… telling the computer what to go build. How many people? I think we just went from 30 million to probably 1 billion. And so every carpenter in the future will be a coder, except a carpenter with AI is also an architect. They’ve just increased the value that they could deliver to the customer. Their artistry just elevated tremendously.  
是的。原因如下。编码的定义是什么？我认为……就目前而言，编码的定义很简单，就是描述、规范，如果你想更具体一些，甚至可以给它一个你想要编写的软件架构。所以问题是，有多少人能做到这一点？描述一个让计算机执行的规范……告诉计算机要构建什么。有多少人？我认为我们已经从 3000 万增加到了 10 亿。因此，未来每个木匠都会是程序员，只不过拥有人工智能的木匠同时也是架构师。他们只是提高了能够为客户创造的价值。他们的技艺得到了极大的提升。

Jensen Huang 黄仁森 I believe that every accountant is, you know, also your financial analyst, also your financial advisor. So, all of these professions have just been elevated… and if I were a carpenter, I see AI, I would just completely go berserk. You know, the services I can bring to my clients if I were a plumber, completely go berserk.  
我认为每个会计师同时也是你的财务分析师和财务顾问。所以，所有这些职业的地位都得到了提升……如果我是个木匠，看到人工智能，我肯定会欣喜若狂。你知道，如果我是个水管工，我能为客户提供的服务也会让我欣喜若狂。

Lex Fridman 莱克斯·弗里德曼 And the, the people that are currently programmers and software engineers, I think they’re at the cutting edge of understanding intuitively how to communicate with the agents using natural language in order to design the best kind of software.  
我认为，目前从事编程和软件工程的人们，在理解如何使用自然语言与智能体进行直观交流以设计出最好的软件方面，处于最前沿。

Jensen Huang 黄仁森 That’s right, exactly.  
没错，正是如此。

Lex Fridman 莱克斯·弗里德曼 So over time they’ll converge, but I think there’s still value in getting, I think learning how to program, like learning what programming languages are. The old kind of programming, what are good practices for programming languages, what are design principles for programming-  
所以随着时间的推移，它们会趋于一致，但我认为学习编程仍然很有价值，比如学习编程语言是什么。传统的编程方式，编程语言的良好实践是什么，编程的设计原则是什么——

Jensen Huang 黄仁森 That’s right  
没错

Lex Fridman 莱克斯·弗里德曼 … Languages for large software systems?  
……大型软件系统使用的语言？

Jensen Huang 黄仁森 And the reason for that, Lex, and you know, as you’re saying for the audience, I think the goal of, the goal of specification, the artistry of specification, the goal and the artistry of it is going to depend on what problem you’re trying to solve. When I’m thinking, when I’m thinking about giving the company strategies and formulating corporate directions and things that we should do, I describe it at a level that is sufficiently specific that people generally understand the direction and it’s actionable. It’s specific enough that they can take action on it, but I under-specify it on purpose, so that enables 43,000 amazing people to make it even better than I imagined.  
莱克斯，原因就在于此，正如你刚才对观众所说，我认为规范的目标，或者说规范的艺术性，取决于你试图解决的问题。当我思考，当我思考如何为公司制定战略、构建企业方向以及我们应该做的事情时，我会将其描述得足够具体，以便人们能够理解方向并付诸行动。它足够具体，可以让他们采取行动，但我故意让它不够具体，这样才能让 43000 名优秀的员工创造出比我想象中还要好的东西。

Jensen Huang 黄仁森 And so when I’m working with engineers and when I’m working with people, I think about who, what problem am I trying to solve? Who am I working with? And the level of specification, the level of architecture definition relates to that. And so everybody’s going to have to learn how, where in the spectrum of coding they want to be. Writing a specification is coding. And so you might decide to be quite prescriptive because there’s a very specific outcome you’re looking for. You might decide that, you know, this is an area you want to be much more exploratory, and so you might under-specify and enable you to go back and forth with the AI to even push your own boundaries of creativity. And so this artistry of where you are in the spectrum, this is the future of coding.  
所以，当我与工程师合作，与其他人合作时，我会思考：我试图解决什么问题？我的合作伙伴是谁？规范的级别，架构定义的级别，都与此相关。因此，每个人都必须学习如何在编码的光谱中定位自己。编写规范本身就是一种编码。所以，你可能会决定采用非常具体的规范，因为你想要一个非常明确的结果。你也可能决定，你知道，这是一个你想进行更多探索的领域，因此你可能会采用不太具体的规范，以便与人工智能反复沟通，甚至突破你自己的创造力边界。因此，这种在光谱中定位的艺术，就是编码的未来。

Lex Fridman 莱克斯·弗里德曼 But just to linger on it outside of coding, I think a lot of people, rightfully so, are worried about their jobs, have a lot of anxiety about their jobs, especially in the white-collar sector. I don’t think any of us know what to do with tumultuous times that always come when automations and new technology arrives. And I just… First of all, I think we all need to have compassion and the responsibility to feel sort of the burden of what the actual suffering feels like for individual people and families that lose their job. I think whenever you have transformative technology like that’s coming with artificial intelligence, there’s going to be a lot of pain, and I don’t know what to do about that pain.  
但抛开编程不谈，我想说，很多人，理所当然地，都在担心自己的工作，焦虑不安，尤其是在白领领域。自动化和新技术到来时，总会伴随着动荡，我们谁也不知道该如何应对。首先，我认为我们都需要有同情心，有责任去体会那些失去工作的个人和家庭所承受的痛苦。我认为，每当出现像人工智能这样具有变革性的技术时，都会伴随着很多痛苦，而我不知道该如何应对这些痛苦。

Lex Fridman 莱克斯·弗里德曼 Hopefully, it creates much more opportunities for those same people for the same kind of job as the tooling evolves and makes them more productive and makes them more fun, hopefully, as it does in the programming. I have been having so much fun programming, I have to say. Like, I’ve never had this much fun. So hopefully it makes their job, automates the boring parts and makes the creative parts the ones that the human beings are responsible for. But still there’s going to be a lot of pain and suffering.  
希望随着工具的不断发展，它能为这些人创造更多从事同类工作的机会，提高他们的工作效率，也让他们的工作更有趣，就像编程领域一样。我必须说，我编程真的太有趣了。我从来没有这么开心过。所以，希望它能简化他们的工作，自动化那些枯燥乏味的部分，把创造性的部分留给人类。但即便如此，仍然会有很多痛苦和磨难。

Jensen Huang 黄仁森 So my first recommendation before… And this is now how I deal with anxiety. In fact, we just talked about it earlier. Enormous anxiety about the future, enormous anxiety about the pressure, enormous anxiety about uncertainty, I first break it down, and then I’m gonna tell myself, “Okay, there are some things you can do something about, there’s some things you can’t do anything about. But for the stuff that you can do something about, let’s reason, reason about it and let’s go do it.”  
所以我之前的第一个建议是……这也是我现在应对焦虑的方法。事实上，我们刚才也讨论过。对于巨大的未来焦虑、巨大的压力焦虑、巨大的不确定性焦虑，我首先会把它们分解开来，然后告诉自己：“好吧，有些事情你可以做点什么，有些事情你无能为力。但对于那些你可以做点什么的事情，让我们好好思考，好好想想，然后去做。”

Jensen Huang 黄仁森 If we were to hire a new college graduate today, and I have a choice between two, one that has no clue what AI is and one that is expert in using AI, I would hire the one who’s expert in using AI. If I had an accountant, a marketing person, the one that is expert in using AI, supply chain, customer service, a salesperson, business development, a lawyer, I would hire the one who is expert in using AI. And so I would advise that every college student, every teacher should encourage their student to go use AI. Every college student should graduate and be an expert in AI. And everybody, if you’re a carpenter, if you’re an electrician, go use AI. Go see what it can do to transform your current job, elevate yourself.  
如果今天我们要招聘一位应届大学毕业生，而我有两个选择：一个对人工智能一无所知，另一个是人工智能专家，我会选择后者。如果我需要一位会计、一位市场营销人员、一位供应链专家、一位客户服务专家、一位销售人员、一位业务拓展人员、一位律师，我也会选择后者。因此，我建议每位大学生、每位老师都应该鼓励学生去学习和使用人工智能。每位大学生都应该毕业后成为人工智能专家。而且，无论你是木匠还是电工，都应该去学习和使用人工智能。去看看它能如何改变你目前的工作，提升你的职业技能。

Jensen Huang 黄仁森 If I were a farmer, I would absolutely use AI. If I were a pharmacist, I would use AI. I wanna see how, what it could do to elevate my job so that I could be the innovator to revolutionize this industry myself. And so that would be the first thing that I would do. And then I would also help them… It is the case that the technology will dislocate and will eliminate many tasks. And because it will automate it, if your job is the task—then you’re very highly going to be disrupted. If your job’s purpose includes you, certain tasks- … then it’s vital that you go learn how to use AI to automate those tasks. And then there’s the world of spectrum in between.  
如果我是个农民，我肯定会用人工智能。如果我是个药剂师，我也会用人工智能。我想看看它能如何提升我的工作，让我成为革新这个行业的创新者。所以，这会是我做的第一件事。然后我还会帮助他们……这项技术确实会颠覆甚至取代很多工作。因为它会实现自动化，如果你的工作就是完成任务——那么你很可能会受到冲击。如果你的工作目标包括你完成某些特定任务——那么学习如何使用人工智能来自动化这些任务就至关重要。当然，还有介于两者之间的广阔领域。

Lex Fridman 莱克斯·弗里德曼 And by the way, the beautiful thing about AI, so the chatbot versions, is you can break down… You have anxiety and you can break down the problem by talking to it. Like, I’ve recently… It’s really just incredible how much you can think through your life’s problems, and through… And I don’t mean, like, therapy problems. I mean, like, very practically, “Okay, I’m worried about my…” Literally, “I’m worried about my job. What are the skills? What are the steps I need to take?” How do I get better at AI?” Everything you just said, you could literally ask and it’s going to give you- … a point-by-point plan. I mean, it’s just a great life coach, period. This-  
顺便说一句，人工智能（包括聊天机器人版本）最棒的地方在于，你可以把它分解开来……比如，你感到焦虑，你可以通过和它对话来分解问题。就像我最近……它真的太神奇了，你可以用它思考生活中的各种问题，而且……我指的不是那种心理治疗方面的问题。我是说，非常实际的问题，“好吧，我担心我的……”比如，“我担心我的工作。我需要哪些技能？我需要采取哪些步骤？”“我该如何提高我的人工智能水平？”你刚才说的所有问题，你都可以问它，它会给你……一个逐点的计划。我的意思是，它简直就是一个很棒的人生导师，就这么简单。这——

Jensen Huang 黄仁森 I don’t know how to use AI, and the AI goes, “Well, let me show you.”  
我不知道如何使用人工智能，人工智能说：“好吧，让我来教你。”

Lex Fridman 莱克斯·弗里德曼 Exactly. It’s very meta, but it’s- It’s kind of incredible. So people definitely should-  
没错。这很元叙事，但——这简直太不可思议了。所以人们绝对应该——

Jensen Huang 黄仁森 You can’t walk up to Excel and say, “I don’t know how to use Excel.”  
你不能走到 Excel 前说：“我不知道如何使用 Excel。”

Lex Fridman 莱克斯·弗里德曼 Exactly.  
没错。

Jensen Huang 黄仁森 You’re done.  
你完成了。

Lex Fridman 莱克斯·弗里德曼 I mean, that’s really what AI has done for me in all walks of life, is that initial friction of being a beginner of using a thing for the first time. I can literally ask about any single thing, “What are the first steps I need to take?”  
我的意思是，人工智能真正帮助我解决的是它在我生活的方方面面所带来的问题，那就是它消除了初学者第一次使用某样东西时的初始阻力。我可以就任何事情询问：“我需要采取的第一步是什么？”

Jensen Huang 黄仁森 That’s right.  
没错。

Lex Fridman 莱克斯·弗里德曼 And that handholding that it does, removing the friction of all the experiences that the world offers is… You know, like I mentioned to you offline, you mentioned, “I’m going to China and Taiwan.”  
它提供的这种手把手式的服务，消除了世界所提供的所有体验中的摩擦……你知道，就像我私下跟你提到的那样，你提到过，“我要去中国和台湾。”

Jensen Huang 黄仁森 So awesome.  
太棒了。

Lex Fridman 莱克斯·弗里德曼 Just ask, “Where do I-“  
直接问，“我该去哪里——”

Jensen Huang 黄仁森 So excited for you.  
真为你感到高兴。

Lex Fridman 莱克斯·弗里德曼 “Where do I… What do…” “You know, where do I go? How do I…” All of those questions- … immediately answered, and it’s beautiful.  
“我该去哪里……我该怎么办……”“你知道，我该去哪里？我该怎么做……”所有这些问题……都立即得到了解答，这真是太好了。

Jensen Huang 黄仁森 Well, when you go to Taiwan, just ask AI… “What are Jensen’s favorite restaurants in Taiwan?” And it’ll actually-  
嗯，当你去台湾的时候，直接问人工智能……“Jensen 在台湾最喜欢的餐厅有哪些？”它实际上会——

Lex Fridman 莱克斯·弗里德曼 You don’t know?  
你不知道吗？

Jensen Huang 黄仁森 Oh, yeah.  
哦，是的。

Lex Fridman 莱克斯·弗里德曼 Is it accurate? Okay. All right.  
准确吗？好的。好的。

Jensen Huang 黄仁森 It’s all over Taiwan.  
台湾到处都是。

Lex Fridman 莱克斯·弗里德曼 Well, you’re a rockstar over there. And like we also mentioned offline, maybe our paths will cross, which would be really wonderful in computing.  
嗯，你在那边可是个大明星。就像我们之前在线下也提到过的，也许我们会在计算机领域相遇，那可真是太棒了。

Jensen Huang 黄仁森 COMPUTEX. NVIDIA GTC Taiwan.  
电脑。 NVIDIA GTC 台湾。

## Consciousness 意识

Lex Fridman 莱克斯·弗里德曼 Do you think there’s some things about human nature, about human consciousness that is fundamentally non-computational? Maybe something a chip, no matter how powerful, can never replicate?  
你认为人类本性、人类意识中是否存在一些本质上无法用计算来解释的东西？也许是芯片无论多么强大都永远无法复制的东西？

Jensen Huang 黄仁森 I don’t know if the chip will ever get nervous. And that’s the, you know, of course, the conditions by which that causes anxiety or nervousness or whatever emotion. I believe that AI will be able to recognize those and understand those. I don’t think my chips will feel those. And therefore, the… How that anxiety, how that feeling, how that excitement, how that, how that, you know… All of those feelings manifest in human performance. For example, extremely amazing human performance, athletic performance, you know, average or lesser than average. That entire spectrum of human performance that comes out of exactly the same circumstances for different people, manifesting a different outcome, manifesting a different performance.  
我不知道芯片会不会感到紧张。当然，你知道，引发焦虑、紧张或其他情绪的条件是什么。我相信人工智能能够识别并理解这些情绪。我不认为我的芯片会感受到这些。因此，焦虑、紧张、兴奋等等这些情绪是如何体现在人类表现中的。例如，极其出色的人类表现、运动表现，以及平均水平或低于平均水平的表现。在完全相同的条件下，不同的人会表现出不同的结果，展现出不同的表现，这就是人类表现的整个光谱。

Jensen Huang 黄仁森 I don’t think there’s anything about anything that we’re building that would suggest that two different computers being presented with all of exactly the same context would perfo- Of course, it would produce statistically different outcomes, but it’s not because it felt different.  
我不认为我们正在构建的任何东西会表明，两台不同的计算机在完全相同的上下文中会表现出不同的性能——当然，它会产生统计上不同的结果，但这并不是因为感觉不同。

Lex Fridman 莱克斯·弗里德曼 Yeah, the subjective… Boy, there’s something truly special about the subjective experience that we humans feel. Like I mentioned to you, I was pretty nervous talking to you. Like I mentioned to you, that, the hope, the fear, the anxiety, and just life itself, the richness of life. How amazing everything is. How deeply we fall in love, how deeply our hearts get broken, how afraid we are of death and how much pain we feel when our loved ones pass away. All of that, the whole thing. I know it’s very hard to- … think AI being able to… A computational device being able to do that. But there’s so many mysteries about this whole thing that we’re yet to uncover, that I am open to be surprised. I’ve been surprised a lot over the past-  
是啊，主观感受……哎，我们人类的主观体验真是太特别了。就像我刚才跟你说的，跟你说话的时候我挺紧张的。就像我刚才说的，希望、恐惧、焦虑，还有生活本身，生活的丰富多彩。一切都如此奇妙。我们坠入爱河的程度，我们心碎的程度，我们对死亡的恐惧，以及亲人离世时我们感受到的痛苦。所有这一切，所有的一切。我知道这很难……想象人工智能能够……一个计算设备能够做到这一点。但关于这一切，还有太多我们尚未揭开的谜团，所以我乐于接受惊喜。过去这些年，我经历过很多惊喜——

Lex Fridman 莱克斯·弗里德曼 … few months and few years. Scaling can create some incredible miracles in the space of intelligence. It has been truly marvelous to watch, so I’m open to surprise.  
……几个月，几年。规模化可以在智能领域创造一些不可思议的奇迹。亲眼见证这一切真是令人惊叹，所以我对未来充满期待。

Jensen Huang 黄仁森 And it’s just really important to break down what is intelligence. You know, the word, that word we use all the time, it’s not a mysterious word. Intelligence has a meaning, you know?  
所以，真正重要的是要弄清楚什么是智力。你知道，我们经常使用的这个词，它并不是一个神秘的词。智力是有含义的，你知道吗？

Jensen Huang 黄仁森 And it’s a system that… You know, it’s something that we do that includes perception and understanding and reasoning and the ability to do plan. And, you know, that loop, that loop, is the… Fundamentally what intelligence is. Intelligence is not one word that is exactly equal to humanity. And that’s, I think it’s really important to separate the two. We have two words for that. I’m not… I don’t over-fantasize about, and I don’t over-romanticize about intelligence. Intelligence is… And people have heard me say it before, I actually think intelligence is a commodity. I’m surrounded by intelligent people. And I’m surrounded by intelligent people more intelligent than I am in each one of the spaces that they’re in.  
这是一个系统……你知道，它包含了感知、理解、推理和计划能力。你知道，这个循环，这个循环，从根本上来说，就是智能的本质。智能并不是一个词就能完全等同于人性。我认为区分这两者非常重要。我们有两个词来描述它们。我不会……我不会对智能抱有过高的幻想，也不会过度浪漫化它。智能是……人们以前也听我说过，我其实认为智能是一种商品。我身边都是聪明人。而且在他们所处的各个领域，都有比我更聪明的人。

Jensen Huang 黄仁森 And yet, I have a role in that circle. It’s actually kind of interesting. They’re more educated than I am. They went to better schools than I did. They’re deeper in any of the fields that they’re in. All of them. I have 60 of them. They’re all superhuman to me. And somehow, I’m sitting in the middle orchestrating all 60 of them. And so you gotta ask yourself… What is it about a dishwasher that allows that dishwasher to sit in the middle of superhumans? Does that make sense?  
然而，我在这个圈子里也扮演着一个角色。这其实挺有意思的。他们比我更有学识，上的学校也比我好，在各自的领域都比我更精通。他们每个人都比我强。我有六十个这样的人。在我眼里，他们个个都是超人。而我，不知怎的，就坐在中间，统领着这六十个人。所以你得问问自己……一个洗碗工究竟有什么魔力，能让他在一群超人中间游刃有余？这说得通吗？

Jensen Huang 黄仁森 And so, but that’s my point. My point is intelligence is a functional thing. Humanity is not specified functionally. It’s a much, much bigger word. And our life experience, our tolerance for pain, our determination, those are different words than intelligence. And so the thing that I wanna help the audience understand, if I could give them one thing, is intelligence is a word that we’ve elevated to a very high form over time.  
所以，这就是我的观点。我的观点是，智力是一种功能性的东西。而人性并非以功能性来定义的。它是一个远比智力宽泛得多的概念。我们的人生经历、我们对痛苦的承受能力、我们的决心，这些都与智力是不同的概念。因此，如果我只能给听众一个明确的答案，那就是智力这个词，随着时间的推移，我们把它提升到了一个非常高的概念。

Lex Fridman 莱克斯·弗里德曼 The word we should really elevate is humanity.  
我们真正应该提升的词是人性。

Jensen Huang 黄仁森 Character, humanity.  
品格，人性。

Lex Fridman 莱克斯·弗里德曼 All those things.  
所有这些事情。

Jensen Huang 黄仁森 All of those things. Compassion, generosity, all of the things that you say just now, I believe those are superhuman powers. And that now intelligence is gonna be commoditized. Because we’ve spoken about it, the most important thing is your education. Now, even when they said the most important thing is your education, when you went to school, there’s more than just knowledge that you gained.  
所有这些品质。同情心、慷慨，你刚才说的所有这些，我相信都是超人的力量。而现在，智慧却要被商品化了。因为我们之前讨论过，最重要的就是你的教育。但是，即使他们说最重要的就是你的教育，当你上学的时候，你获得的也不仅仅是知识。

Jensen Huang 黄仁森 And so, but unfortunately, our society had put everything into one single word, and life is more than one word. And I’m just telling you, my life would suggest that being lower on the intelligence curve than everybody around me doesn’t change the fact I’m the most successful. And so, and I think that kind of is—I’m trying to hopefully to inspire everybody else—that don’t let this democratization of intelligence, this commoditization of intelligence, cause you anxiety. You should be inspired by that.  
所以，但不幸的是，我们的社会把一切都简化成了一个词，而生活远不止一个词。我只想说，我的经历表明，即使我的智力水平比周围的人低，也改变不了我是最成功的人这一事实。所以，我认为——我希望能够激励大家——不要让智力的民主化、智力的商品化让你感到焦虑。你应该从中汲取力量。

Lex Fridman 莱克斯·弗里德曼 Yeah. I think AI will help us celebrate humans more. And certainly humanity and human first, and I think what makes this world incredible is humans forever will be so, and just AI is this incredible tool that makes us-  
是的。我认为人工智能会帮助我们更加赞美人类。当然，首先是人性，我认为这个世界之所以如此精彩，是因为人类将永远如此，而人工智能只是一个不可思议的工具，它让我们——

Jensen Huang 黄仁森 That’s exactly right.  
完全正确。

Lex Fridman 莱克斯·弗里德曼 … humans more powerful.  
……人类更强大。

Jensen Huang 黄仁森 That’s exactly right.  
完全正确。

## Mortality 死亡

Lex Fridman 莱克斯·弗里德曼 So much of the success of NVIDIA and the lives of millions of people that I mentioned depend on you. But you’re just one human, like we mentioned, a mortal like all of us. Do you think about your mortality? Are you afraid of death?  
英伟达的成功以及我刚才提到的数百万人的生活都取决于你。但你也只是个普通人，就像我们刚才说的，和我们所有人一样，终有一死。你会思考死亡吗？你会害怕死亡吗？

Jensen Huang 黄仁森 I really don’t wanna die. I have a great life. I have a great family. I have really important work. This is not a once in a lifetime experience suggests that it has been experienced by many people, just not one person. This is a once in a humanity experience, what I’m going through. NVIDIA is one of the most consequential technology companies in history. We’re doing very important work. I take it very seriously. And so some of the things that of course are practical things, like how do we think about succession planning? And I’m famous in saying that I don’t believe in succession planning.  
我真的不想死。我的生活很美好，我有一个幸福的家庭，我还有一份非常重要的工作。这并非“一生一次”的经历，并非暗示很多人都经历过，而是指我正在经历的，这是人类历史上独一无二的事件。英伟达是历史上最具影响力的科技公司之一，我们正在从事非常重要的工作，我对此非常认真。当然，也有一些实际问题需要考虑，比如我们应该如何进行继任计划？我曾公开表示我不相信继任计划。

Lex Fridman 莱克斯·弗里德曼 Man.  
男人。

Jensen Huang 黄仁森 And the reason for that isn’t because I’m immortal. The reason for that is because if you’re worried about succession planning, if you’re worried all that anxiety of succession planning, then what should you do about it? Then you break it all the way back down. The most important thing you should do today, if you care about the future of your company, post you, is to pass on knowledge, information, insight, skills, experience as often and continuously as you can, which is the reason why I continuously reason about everything in front of my team. Every single meeting is a reasoning meeting. Every moment I spend inside a company, outside a company is about passing on knowledge to people as fast as I can.  
原因并非因为我永生不死。而是因为，如果你担心继任计划，如果你为此焦虑不已，那么你应该怎么做呢？那就把所有问题都归结到最根本的层面。如果你关心公司的未来，关心你之后的未来，那么你今天最重要的事情就是尽可能频繁、持续地传承知识、信息、洞察力、技能和经验。这就是为什么我总是当着团队的面讲解所有事情。每一次会议都是一次讲解会议。我在公司内外的每一分每一秒，都是为了尽快地将知识传递给他人。

Jensen Huang 黄仁森 Nothing I learn ever sits on my desk longer than, you know, a fraction of a second. I’m passing that information, that knowledge—oh my gosh, this is cool. Before I even finish learning all of it myself, I’m already pointing it to somebody else. “Get on this. This is so cool. You’re gonna wanna learn this.” And so I’m constantly passing knowledge, empowering people, elevating the capability of everybody around me, so that the outcome that I seek, that I hope for, is that I die on the job, you know? And hopefully I die on the job instantaneously, you know? And there’s no long periods of suffering, you know? It’s, uh –  
我学到的东西，放在桌上的时间从来不会超过一瞬间。我会把这些信息、这些知识——天哪，这太酷了！——传递出去。我还没完全掌握，就已经把它推荐给别人了。“快去学这个。这太酷了。你肯定也想学。” 所以我不断地传递知识，赋能他人，提升周围每个人的能力，这样我追求的、我所期盼的，就是我能死在工作岗位上，你知道吗？最好是瞬间死在工作岗位上，你知道吗？这样就不会有长时间的痛苦，你知道吗？嗯——

Lex Fridman 莱克斯·弗里德曼 Well, from a fan perspective, given your extremely enormous positive impact on civilization, of course, I hope you keep going. But also it’s just fun to watch what NVIDIA is doing, you know. It’s just the rate of innovation. And I’m a huge fan of engineering. There’s so much incredible engineering continuously being done by NVIDIA. It’s just fun to watch. It’s a celebration of humanity, a celebration of great builders, a celebration of great engineering. So, it represents something special. So I hope you and NVIDIA keep going. What gives you hope about this whole thing we got going on, about humanity, about the future of humanity? When you look out, when you think about the future quite a bit, when you look out 10, 20, 50, 100 years from now, what gives you hope?  
嗯，从粉丝的角度来看，鉴于你对人类文明的巨大积极影响，我当然希望你继续前进。而且，看着英伟达的所作所为也很有趣，你知道的。他们的创新速度令人惊叹。我本人也是工程学的忠实拥趸。英伟达一直在进行着许多令人难以置信的工程项目。看着他们不断取得成就，真的令人兴奋。这不仅是对人类的赞颂，也是对伟大创造者的赞颂，更是对伟大工程的赞颂。所以，它代表着一些特别的东西。因此，我希望你和英伟达继续前进。是什么让你对我们正在做的事情、对人类、对人类的未来充满希望？当你展望未来，当你思考未来 10 年、20 年、50 年、100 年后的事情时，是什么让你充满希望？

Jensen Huang 黄仁森 I’ve always had a great confidence in the kindness, the generosity, the compassion, the human capacity. I’ve always been extremely confident of that. Sometimes more so than I should. And I get taken advantage of, but it doesn’t ever cause me not to. I start with always that people want to do good. People want to help others. And vastly, I am proven right. Constantly proven right. And often it exceeds my expectations. And so I have complete confidence in the human capacity. I think the things that give me incredible hope is what I see now as possible, and as I extrapolate based on the things that we’re doing, what will very likely happen.  
我一直对人的善良、慷慨、同情心和能力充满信心。我一直对此深信不疑。有时甚至过于自信。我有时会被人利用，但这从不会让我改变想法。我始终相信，人们都渴望行善，都渴望帮助他人。而且，事实证明我的想法是正确的。不断地被证明是正确的。而且，结果往往超出我的预期。因此，我对人的能力充满信心。我认为，真正让我充满希望的是，我看到了现在的可能性，以及基于我们正在做的事情，我推断出未来很可能发生的事情。

Jensen Huang 黄仁森 And that there’s so many things that we wanna solve. There’s so many problems we wanna solve. There’s so many things that we wanna build. There’s so many good things that we wanna do that are now within our reach, and within the reach of my lifetime. You just can’t possibly not be romantic about that. You know what I’m saying? O-  
我们有很多事情想解决，有很多问题想解决，有很多东西想建造，有很多好事想做，而且这些好事现在触手可及，在我有生之年就能实现。你不可能不为此感到浪漫。你明白我的意思吗？

Lex Fridman 莱克斯·弗里德曼 What an exciting time to be alive. Like, truly-  
生活在这样一个激动人心的时代真是太棒了。真的——

Jensen Huang 黄仁森 How can-  
如何-

Lex Fridman 莱克斯·弗里德曼 … truly so.  
……确实如此。

Jensen Huang 黄仁森 How can you not be romantic about that? The fact that there is a—it’s a reasonable thing to expect the end of disease. It’s a reasonable thing to expect. It’s a reasonable thing to expect that pollution will be drastically reduced. It’s a reasonable thing to expect that traveling at the speed of light is actually in our future. And then, you know, not for long distances, but short distances. You know, and people ask me how. Well, first of all, very soon, I’m gonna put a humanoid on a spaceship, and it’s gonna be, you know, my humanoid, and we’re gonna send it out as soon as possible, and it’s gonna keep improving and enhancing along the flight.  
你怎么能不为此感到浪漫呢？疾病的终结是可以合理预期的。污染大幅减少也是可以合理预期的。光速旅行真的会成为现实，这同样是可以合理预期的。而且，你知道，不是长途旅行，而是短途旅行。人们问我怎么做。嗯，首先，很快，我就会把一个人形机器人送上宇宙飞船，你知道，就是我设计的那个，我们会尽快把它送出去，它会在飞行过程中不断改进和增强。

Jensen Huang 黄仁森 And then when it’s time, all of my consciousness has already been—you know, so much of my life has been uploaded in the internet. Take all my inbox, take everything that I’ve done, everything I’ve said. You know, it’s been collected and becoming my AI. And I’m just, when the time comes, we’ll just send that at the speed of light, catch up with my robot.  
然后，当那一刻到来时，我的所有意识都已经——你知道，我生命中的很多东西都上传到了互联网上。把我所有的收件箱、我做过的一切、我说过的一切都上传到互联网上。你知道，它们都被收集起来，变成了我的人工智能。而我，只是，当那一刻到来时，我们会以光速发送它们，让我的机器人追上我。

Lex Fridman 莱克斯·弗里德曼 Oh, that’s brilliant. I mean, but for me, that’s sorta application-focused. But also, for me, the curiosity-maxing perspective, I just, all of those mysteries. There’s so much- … fascinating scientific questions there.  
哦，太棒了。我的意思是，对我来说，这有点过于注重应用了。但同时，对我来说，从激发好奇心的角度来看，所有这些谜团……那里有太多……引人入胜的科学问题。

Jensen Huang 黄仁森 Understanding the biological machine is right around the corner. It’s, it’s not 10 years. It’s five years probably.  
了解生物机器指日可待。不是十年，可能五年就够了。

Lex Fridman 莱克斯·弗里德曼 And then your biological machine, the, the human mind and cracking physics, theoretical physics open. It’s so exciting.  
然后，你的生物机器，人类的思维，以及破解物理学，理论物理学的大门就此开启。这太令人兴奋了。

Jensen Huang 黄仁森 Explaining consciousness, that one would be awesome.  
解释意识，那将是一件很棒的事。

Lex Fridman 莱克斯·弗里德曼 And it’s all within our reach. Jensen, thank you so much for everything you’ve done over the years. Thank you for everything you’re doing for the world. Thank you for being who you are. I can tell you’re a great human being, and I wish you incredible success this year. I can’t wait. As a fan, I can’t wait to see what you do next, and hopefully I’ll see you in Taiwan and thank you so much for talking today.  
这一切触手可及。Jensen，非常感谢你这些年来所做的一切。感谢你为世界所做的一切。感谢你就是你。我能感受到你是一个很棒的人，祝你今年取得巨大的成功。我迫不及待了。作为你的粉丝，我迫不及待地想看看你接下来的动向，希望能在台湾见到你。非常感谢你今天接受我的采访。

Jensen Huang 黄仁森 Thank you, Lex. I had a great time. And also, if I could just say one more thing. And thank you for all the interviews that you do, the depth, the respect that you go through with and the research that you do to reveal, you know, for all of us the amazing people that you’ve interviewed over the years. I’ve enjoyed them immensely. And as an innovator, to have created this long form, unbelievable, and yet, you know, it’s just captivating. So anyways, thank you for everything you do.  
谢谢你，莱克斯。我玩得很开心。还有，如果可以的话，我想再说一句。感谢你做的所有采访，感谢你深入的采访，感谢你对受访者的尊重和细致的研究，感谢你为我们展现了这些年来你采访过的那些杰出人物。我非常喜欢这些采访。作为一名创新者，你能创造出这种长篇访谈形式，真是令人难以置信，而且它真的非常引人入胜。总之，感谢你所做的一切。

Lex Fridman 莱克斯·弗里德曼 It means the world. Thank you, Jensen.  
这对我意义重大。谢谢你，詹森。

Jensen Huang 黄仁森 Thank you, Lex.  
谢谢你，莱克斯。

Lex Fridman 莱克斯·弗里德曼 Thank you for listening to this conversation with Jensen Huang. To support this podcast, please check out our sponsors in the description, where you can also find links to contact me, ask questions, give feedback, and so on. And now, let me leave you with some words from Alan Kay. “The best way to predict the future is to invent it.” Thank you for listening, and hope to see you next time.  
感谢您收听与黄建生的对话。为了支持本播客，请查看简介中的赞助商信息，您也可以在那里找到联系我、提问、反馈等的链接。现在，我想用艾伦·凯的一句话来结束今天的节目：“预测未来的最佳方式就是创造未来。”感谢您的收听，希望下次再见。