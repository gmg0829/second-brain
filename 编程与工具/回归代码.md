---
title: "A Return to Code"
source: "https://nav.al/code"
author:
  - "[[Naval]]"
published: 2026-04-29
created: 2026-04-29
description: "You’re listening to the Naval Podcast. This is Nivi, his regular co-host. Today we’re going to talk about vibe coding.     Let me tee up the conversation with a tweet from Naval from March 23rd: “AI coding agents can now deliver one-shot custom apps straight to your phone. It’s the beginning of the end for the iPhone’s dominance.” More"
tags:
  - "clippings"
---
**Nivi:** You’re listening to the Naval Podcast. This is Nivi, his regular co-host. Today we’re going to talk about vibe coding.  
**尼维：** 您正在收听的是海军播客。我是尼维，他的常驻搭档。今天我们要聊聊氛围编码。

## A Return to Coding 重返编程

**Nivi:** Let me tee up the conversation with a tweet from Naval [from March 23rd](https://x.com/naval/status/2036285641462595898): “AI coding agents can now deliver one-shot custom apps straight to your phone. It’s the beginning of the end for the iPhone’s dominance.”  
**Nivi：** 让我先引用 Naval [3 月 23 日](https://x.com/naval/status/2036285641462595898) 的一条推文来引出这个话题：“人工智能编码代理现在可以将一次性定制应用程序直接发送到你的手机上。这是 iPhone 统治地位走向终结的开始。”

Do you want to talk about what you’re building and how you’re distributing it?  
你想谈谈你正在开发的产品以及你是如何分发的吗？

**Naval:** Well, yeah, let me talk about vibe coding and how I got into it.  
**Naval：** 嗯，是的，让我来谈谈氛围编码以及我是如何接触到它的。

So around December of 2025, the coding agents in AI hit an inflection point with the release of [Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5). And people started using it and were like, “Wow—this is an agent that stays on track, can build apps soup to nuts, can solve thorny problems, and really feels like having a junior programmer at your disposal who’s fast, essentially free, and ready to please.”  
因此，大约在 2025 年 12 月，随着 [Claude Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5) 的发布，人工智能领域的编码代理迎来了一个转折点。人们开始使用它，并惊叹道：“哇——这是一个能够保持方向、能够从头到尾构建应用程序、能够解决棘手问题的代理，而且真的感觉就像拥有一个随时待命的初级程序员，他速度快、基本上免费，而且乐于助人。”

That was an inflection point, and I was reading all the hype on Twitter, but this time it felt real. I’ve tried the coding agents in the past with some mixed results, but this time I really got into it. And I haven’t seriously coded in decades. I have a computer science degree; I understand computer architecture and networking, a little bit of chips, algorithms, et cetera.  
那是一个转折点，我当时在推特上看到各种宣传，但这次感觉很真实。我以前也尝试过编程代理，效果有好有坏，但这次我真的投入进去了。我已经几十年没认真写过代码了。我拥有计算机科学学位；我了解计算机体系结构和网络，也略懂芯片、算法等等。

But I haven’t seriously coded in a long time.  
但我已经很久没有认真写代码了。

And the activation energy to writing code is really high. You have to hook up all these different services to each other. Everything from [GitHub](https://github.com/) to maybe some backend—you’re doing [Vercel](https://vercel.com/) or [Firebase](https://firebase.google.com/) or [Railway](https://railway.app/) or whatever—and just lots of things to connect together.  
编写代码的启动能量非常高。你必须把所有这些不同的服务连接起来。从 [GitHub](https://github.com/) 到后端——比如 [Vercel](https://vercel.com/) 、 [Firebase](https://firebase.google.com/) 、 [Railway](https://railway.app/) 等等——需要连接的东西太多了。

You have to know lots of jargon—lots of tools. And the AI now makes it really easy. So I started with [Claude Code](https://www.anthropic.com/claude-code) like everybody else. I’ve also used [Codex](https://openai.com/codex) for some of the thornier bug solving and deep problems, and I immediately got addicted. It was incredibly fun. And so: what’s changed? Well, the agents are really working.  
你必须了解很多专业术语——很多工具。而人工智能现在让这一切变得非常简单。所以，我和其他人一样，一开始也用的是 [Claude Code](https://www.anthropic.com/claude-code) 。我还用 [Codex](https://openai.com/codex) 解决过一些棘手的 bug 和深奥的问题，我立刻就上瘾了。它真的非常有趣。那么：现在有什么变化呢？嗯，智能体真的非常有效。

These are not just coding assists now—where you ask it to solve a specific problem, it gives you a pile of code, and then you cut and paste that into your [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment), your development environment. Rather, you open up a terminal— [CLI](https://en.wikipedia.org/wiki/Command-line_interface), as they call it—the command line interface. It’s all text-based, which is what these things are really good at, because they’re trained on text tokens in the first place. It’s running [Unix](https://en.wikipedia.org/wiki/Unix) inside or underneath. And these agents really know Unix because if you look at all the code out there that they were trained on—sitting on GitHub or elsewhere or [Stack Overflow](https://stackoverflow.com/) —most of it was Unix.  
现在这些工具不再只是简单的代码辅助工具——你让它解决某个特定问题，它就给你一堆代码，然后你再复制粘贴到你的集成开发环境 [（IDE）](https://en.wikipedia.org/wiki/Integrated_development_environment) 里。现在，你需要打开一个终端——也就是他们所说的命令行界面 [（CLI）](https://en.wikipedia.org/wiki/Command-line_interface) 。它完全基于文本，而这正是这些工具的优势所在，因为它们最初就是基于文本标记进行训练的。它们内部或底层运行的是 [Unix 系统](https://en.wikipedia.org/wiki/Unix) 。这些智能体非常了解 Unix，因为如果你查看它们训练所用的所有代码——无论是在 GitHub、其他平台还是 [Stack Overflow](https://stackoverflow.com/) 上——你会发现其中大部分都是 Unix 代码。

And most of the modern OSes are really Unix underneath anyway. macOS is famously [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution). So underneath these are all Unix, which is all text in, text out. So these agents are just long-lived coding AIs that are connected to Unix at a core level. They’re connected to the Unix shell so that they can execute commands. They’re connected to the file system through basic Unix commands.  
而且大多数现代操作系统底层实际上都是 Unix。众所周知，macOS 是 [基于 BSD 的](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution) 。所以，它们的底层都是 Unix，也就是文本输入、文本输出。这些代理程序本质上是长期运行的编码人工智能，它们的核心与 Unix 系统相连。它们连接到 Unix shell 以便执行命令，并通过基本的 Unix 命令连接到文件系统。

They can call all the Unix commands like [grep](https://en.wikipedia.org/wiki/Grep) and [awk](https://en.wikipedia.org/wiki/AWK) and [sed](https://en.wikipedia.org/wiki/Sed) and pipe and so on—all these operators that daisy chain into each other. They can run [cron](https://en.wikipedia.org/wiki/Cron) jobs so they can be long-lived; and they can spawn more shells and more tasks as needed.  
它们可以调用所有 Unix 命令，例如 [grep](https://en.wikipedia.org/wiki/Grep) 、 [awk](https://en.wikipedia.org/wiki/AWK) 、 [sed](https://en.wikipedia.org/wiki/Sed) 和 pipe 等等——所有这些操作符都可以相互串联。它们可以运行 [cron](https://en.wikipedia.org/wiki/Cron) 任务，从而实现长时间运行；并且可以根据需要生成更多 shell 和更多任务。

## The Personal App Store 个人应用商店

**Naval:** It’s very addictive because—normally, with coding, coding can be really fun once you get into it.  
**海军：** 这很容易让人上瘾，因为——通常来说，一旦你开始编程，编程就会变得非常有趣。

But getting into it, the activation energy is really high. But now all of a sudden you don’t have to know all the tools and all the commands. These things speak English. AIs are incredible translators. And one of their core use cases early on was machine translation. They were tested on translating. But now they’re translating from Python and C and Lisp and Rust, and all of these various programming dialects and all of these specialized commands—and they’re communicating in English, and they’re very forgiving in their communication.  
但要真正上手，启动成本确实很高。不过现在突然之间，你不再需要掌握所有工具和命令。这些机器会说英语。人工智能是出色的翻译器。它们早期的核心应用之一就是机器翻译。它们最初接受的是翻译测试。但现在，它们可以翻译 Python、C、Lisp、Rust 以及各种不同的编程语言方言和各种专用命令——而且它们用英语交流，沟通起来也非常宽容。

So, you can use different words; you can make spelling mistakes; you can explain things your own way. But if you have a basic understanding of computer architecture and networking and programming—and it doesn’t take a lot, it can be very basic, actually, very high-level, I should say; not basic in the sense that it’s simplistic, but basic in the sense that it’s high-level—then you can go very, very far.  
所以，你可以用不同的词语；你可以拼写错误；你可以用自己的方式解释事情。但是，如果你对计算机体系结构、网络和编程有基本的了解——其实这并不需要太多，可以非常基础，或者说非常高层次；这里说的基础不是指简单，而是指高层次——那么你就能走得很远很远。

And so just for fun, I tried building a bunch of different apps and I started by one-shotting particular apps that I wanted. One-shotting meaning: I just give it a description and it gives me back an app. Then I started improving from there. So I actually built my own little app store, which is an app store just for me.  
于是，出于好玩，我尝试开发了一系列不同的应用。一开始，我做的是“一键生成”我想要的特定应用。所谓“一键生成”，就是我只需输入一个描述，它就能生成一个应用。然后，我开始在此基础上不断改进。最终，我搭建了一个属于我自己的小型应用商店，一个完全供我自己使用的应用商店。

I can ask it for an app; it can deliver that app to my app store, which is a webpage, and eventually I made it into an app itself that lives on my iPhone. And then I can download those apps with one click, and I can give upgrades like you do with the App Store.  
我可以向它请求一个应用；它可以将这个应用上传到我的应用商店（一个网页），最终我把它变成一个安装在我 iPhone 上的应用。然后我就可以一键下载这些应用，并且可以像在 App Store 里一样进行更新。

So, if I want a new app, for example, that tracks my workouts—and I have this; I built a custom tracking app for just my workouts exactly the way I like it—so I can say:  
所以，例如，如果我想要一个可以追踪我锻炼情况的新应用——而我已经有了一个；我专门为我的锻炼情况构建了一个定制的追踪应用，完全符合我的喜好——所以我可以说：

“Hey, use the functionality of [Tonal](https://tonal.com/) and [Ladder](https://www.joinladder.com/); follow Apple’s human interface guidelines to make it look like an Apple app; track my workouts the following way—here’s a text log of my last few workouts—and make it easy for me to re-enter new ones and to adjust them; build me pretty graphs and charts to track my progress; add in whatever other features you can think of—calculate strength scores; read scientific papers to figure out what the right way to do strength scores by body part is; do a human body diagram so it can just show which muscles are bigger, which are smaller; connect to Apple Health to do my heart rate stuff.”  
“嘿，使用 [Tonal](https://tonal.com/) 和 [Ladder](https://www.joinladder.com/) 的功能；遵循苹果的人机界面指南，让它看起来像一个苹果应用；用以下方式追踪我的锻炼——这是我最近几次锻炼的文字记录——并让我可以轻松地重新输入新的锻炼记录并进行调整；为我生成漂亮的图表来追踪我的进度；添加你能想到的任何其他功能——计算力量评分；阅读科学论文，找出按身体部位计算力量评分的正确方法；制作人体结构图，以便显示哪些肌肉更大，哪些肌肉更小；连接到 Apple Health 来监测我的心率。”

So I didn’t put all of this in one prompt, but I put a lot of it in one prompt, and I immediately got a working app delivered to my personal app store. By the way, the personal app store is a little bit of a joke. It’s real in the sense that it’s my personal app store: it looks like an app store and my apps get delivered into it.  
所以我并没有把所有内容都放在一个提示里，但我把很多内容都放在了一个提示里，然后我立刻就收到一个可以运行的应用程序，并把它发布到了我的个人应用商店里。顺便说一下，这个个人应用商店其实有点儿戏。从某种意义上说，它是真的，因为它确实是我的个人应用商店：它看起来像个应用商店，我的应用也会发布到那里。

But obviously it’s not for wide distribution because Apple gates that. Apple will not let you build apps that can be downloaded on anyone’s iPhone. You have to key them against your specific devices. So with my friends and family, I can deliver them apps; I can’t yet deliver them to everybody. However, this whole experience is incredibly addictive.  
但显然，这些应用无法广泛分发，因为苹果公司对此进行了限制。苹果不允许你开发可以供任何人的 iPhone 下载的应用。你必须将它们与你的特定设备绑定。所以，我可以把应用分享给我的朋友和家人；但我目前还不能分享给所有人。不过，这种体验真的非常令人上瘾。

You can get extremely customized tuned apps for you. Now, does this mean that normal apps don’t have a place? No, of course they have a place. Those apps that cover the broad use cases—they’re going to be the best-of-breeds. Someone’s hand-tuned them and slaved over them. So you’re not going to beat that if your use case is covered by one of the broad use cases.  
你可以获得高度定制化的应用。但这是否意味着普通应用就没有存在的价值了呢？当然不是，它们仍然有存在的意义。那些涵盖广泛应用场景的应用——它们无疑是同类应用中的佼佼者。它们经过了精心的调校和反复的打磨。所以，如果你的应用场景恰好包含在某个广泛应用场景中，那么你很难找到比它们更好的应用。

But when you want something truly custom or private—these are great for niche apps that only you would want. Or when you want to tune them to your specific use case, this is going to be incredible.  
但如果你想要真正定制化或私密的体验——这些功能非常适合只有你才会使用的小众应用。或者，当你想要根据你的特定使用场景进行调整时，它们将带来惊人的效果。

## Vibe Coding Is a Video Game With Real-World RewardsVibe Coding 是一款有现实世界奖励的电子游戏

**Naval:** And it’s very addictive—because like in a video game, the way a video game is designed is that it keeps you hooked by giving you feedback and rewards for doing work.  
**海军：** 而且它非常容易上瘾——因为就像电子游戏一样，电子游戏的设计方式是通过给予你反馈和奖励来让你沉迷其中。

And it’s always at the edge of your capability. So as you get better, the video game gets harder. It’s not so hard that it’s frustrating, but it’s not so easy that it’s boring. So you’re always operating at the edge of your capability with a video game and getting these rewards. But those rewards are fake, and the video game is bounded. It’s created by other humans. It’s sort of a fake little world, and deep down you kind of know that. So you’re just figuring out the rules of the game. And then once you’ve figured out the rules of the game, it’s boring.  
它总是挑战你的极限。所以随着你技术的提高，游戏难度也会增加。它不会难到让人沮丧，也不会简单到让人觉得无聊。因此，你在玩这款游戏时总是处于能力的极限，并从中获得奖励。但这些奖励是虚假的，游戏本身也是有限的。它是由其他人创造的。它就像一个虚构的小世界，而你内心深处其实也明白这一点。所以你只是在摸索游戏的规则。一旦你摸索出了规则，游戏就变得无聊了。

Except with vibe coding, it’s unbounded because now you’ve got a [Turing machine](https://en.wikipedia.org/wiki/Turing_machine) running underneath. You can build anything. The objective is created by you and can keep expanding, so it kind of never fills up completely. And it has real-world relevance. It’s not just some fake world for fake people or fake games that you’re solving, so it’s way more interesting. So vibe coding has one-shotted a whole bunch of my friends who have disappeared into vibe coding the apps they’ve wanted.  
但 Vibe 编程不一样，它没有限制，因为底层运行的是 [图灵机](https://en.wikipedia.org/wiki/Turing_machine) 。你可以构建任何东西。目标由你设定，并且可以不断扩展，所以它永远不会完全填满。而且它与现实世界相关。它不仅仅是一个虚构的世界，里面住着虚构的人，或者你在解决一些虚构的游戏，所以它更有趣。因此，Vibe 编程让我的很多朋友都沉迷其中，他们用 Vibe 编程开发自己想要的应用程序。

But it really, really helps to have a clear direction. You have to know what you want—that’s actually the hardest thing—and having a very clear vision of it. And I have that, because it’s a particular app that I was obsessed with for about a year called [Airchat](https://techcrunch.com/2024/04/13/airchat-launch/) —which I built with a team—and it was a social messenger for people to talk through voice and video.  
但拥有清晰的方向真的非常非常重要。你必须知道自己想要什么——这其实是最难的——并且要对它有一个非常清晰的愿景。而我恰恰拥有这种愿景，因为我曾经痴迷于一款名为 [Airchat 的](https://techcrunch.com/2024/04/13/airchat-launch/) 应用——它是由我和一个团队共同开发的——这款应用是一款社交通讯工具，人们可以通过语音和视频进行交流。

It didn’t quite work, so we sold it off, got the investors their money back, and got the team some nice packages. But I remember that experience as being exhilarating because I was building a product that I wanted and I was working with a brilliant team.  
这个项目最终没能成功，所以我们把它卖掉了，让投资者收回了投资，也给团队成员争取到了不错的待遇。但我仍然记得那段经历，因为它令人兴奋，因为我当时正在打造自己想要的产品，而且和一支才华横溢的团队一起工作。

But I had to work through a team to do it. I had eight or nine engineers, depending on the day, and we worked pretty hard for nine to 12 months, and we shipped a couple of variations. But with vibe coding, I am basically rebuilding that app. I’m rebuilding from scratch. But the key now is: I’m rebuilding it exactly the way that I want it. There’s no compromises.  
但当时我需要一个团队来完成这项工作。我当时有八九个工程师，人数视情况而定，我们努力工作了九到十二个月，最终发布了几个版本。但使用 Vibe 编码，我基本上是在重建这个应用。我从零开始重建。但关键在于：我要完全按照我想要的方式重建它。没有任何妥协。

And normally, in the act of building anything with a team, there’s always compromises—even if you are not aware of them. Even if you’re the dictator in charge, which you rarely are, you still have to just accommodate other people. You can’t say, “Move this icon left. Now move it right. No, move it back. No, move it back again.”  
通常情况下，在团队合作开发任何东西的过程中，总会有妥协——即使你没有意识到这一点。即使你是独裁者（这种情况很少见），你仍然需要迁就其他人。你不能说：“把这个图标往左移。现在往右移。不行，再往后移。不行，再往后移。”

You can’t do that. You’ll annoy the engineer. You can’t demand things where you don’t have a reasonable justification—where it’s just a gut feel or an intuition. But the beauty with an AI coding agent is there’s none of that.  
你不能那样做。你会惹恼工程师。你不能在没有合理理由的情况下提出要求——仅仅凭感觉或直觉是不行的。但人工智能编码代理的妙处就在于，它完全不存在这些问题。

It’s like a self-driving car. You don’t feel self-conscious in a self-driving car because there isn’t a driver sitting there. The same way, with an autonomous coding agent, you don’t feel self-conscious about your own idiosyncrasies. So you can create exactly the thing that you want.  
这就像一辆自动驾驶汽车。坐在自动驾驶汽车里，你不会感到不自在，因为没有司机坐在那里。同样，有了自主编程代理，你也不会因为自己的怪癖而感到尴尬。因此，你可以创造出你真正想要的东西。

I think one of the nice benefits of vibe coding is that—although we may not see like super high-quality code (at least not in this generation), and the architecture needs a lot of work, and these things may have security holes, and they may be hard to scale—the prototyping that you’re going to get, the individual apps you’re going to get, is going to be very fast and they’re going to be true to the vision of the creator. There’s going to be no compromises.  
我认为 Vibe 编码的一个优点是——尽管我们可能无法看到超高质量的代码（至少在这一代是如此），架构也需要大量改进，而且这些应用可能存在安全漏洞，难以扩展——但你最终得到的原型和单个应用速度会非常快，并且能够忠实地体现创建者的愿景。不会有任何妥协。

So you may end up with more things like [*Minecraft*](https://www.minecraft.net/) —which [Notch](https://x.com/notch) famously coded by himself—where there was one person’s vision. And it may have looked weird because like, “What is this blocky graphics? It’s like a huge step backwards.”  
所以最终可能会出现更多像 [*《我的世界》*](https://www.minecraft.net/) 这样的游戏——众所周知，这款游戏是由 [Notch](https://x.com/notch) 独自一人编写的——它体现了一个人的愿景。而它看起来可能很奇怪，因为人们会想：“这是什么像素化的画面？简直是倒退了一大步。”

But he didn’t have to compromise. He didn’t have to communicate with anybody or explain to anybody why he wanted it that way. So I think it expands the scope of discovery.  
但他无需妥协。他无需与任何人沟通，也无需向任何人解释他为何如此行事。所以我认为这拓宽了探索的范围。

It’s also incredibly fun. It takes the number of people who might have built apps from like 0.1 percent to one or two or three percent in the populace. Don’t get me wrong—the majority of people are not going to code their own apps. For the majority of people, computers are sort of this magic black box and who knows what was going on in there anyway. So the fact that it’s become 10x or 100x easier still doesn’t mean anything to them. It’s still a black box.  
它也真的非常有趣。它让可能开发过应用程序的人数比例从大约 0.1% 提升到了 1%、2% 甚至 3%。别误会我的意思——大多数人不会自己编写应用程序。对大多数人来说，电脑就像一个神秘的黑匣子，谁知道里面到底发生了什么。所以，即使开发应用程序的难度降低了 10 倍甚至 100 倍，对他们来说也毫无意义。它仍然是一个黑匣子。

But for the people who are creative, who are self-motivated, and who are articulate and have a good vision, you can code now. There’s nobody standing in between you and your prototype.  
但对于那些富有创造力、积极主动、表达能力强且有远见的人来说，现在就可以开始编写代码了。没有人能阻挡你实现你的原型。

And yes, if you go to market with a high-functioning app and you need to scale to a lot of users and all of that, then you want to recruit a great team and you want to get real engineers on board, and you’re probably going to have to rewrite the whole thing. But if you’re experimenting, you’re prototyping, you’re getting to market, there’s nothing better.  
没错，如果你带着一款功能强大的应用上市，并且需要扩展到大量用户等等，那么你就需要组建一支优秀的团队，需要真正的工程师加入，而且你可能不得不重写整个程序。但如果你只是在做实验、做原型、准备上市，那就没有比这更好的方法了。

## Pure Software Is Uninvestable纯软件不值得投资

**Naval:** There’s never been a better time to be alive as a creator of software.  
**Naval：** 对于软件开发者来说，现在是前所未有的好时代。

Now, are the same market opportunities still there? That’s a big question. They’re shifting very, very fast. It may be the case that the big companies are vulnerable because now anyone can create software.  
那么，同样的市场机遇是否依然存在？这是一个大问题。市场变化非常迅速。大型公司可能反而会变得脆弱，因为现在任何人都可以开发软件。

It may be the case that they have more of an advantage because they have distribution. They can just fill all the gaps with all the software they can dream up. But I actually think this is a renaissance for individual software creators.  
或许他们的确更有优势，因为他们拥有分销渠道。他们可以凭借自己的想象力，用各种软件填补所有空白。但我认为这实际上是个人软件开发者的一次复兴。

Now, one other tweet that I put out was something like, “There’s no market for venture-backed software anymore,” or, “Pure software is not venture investable anymore.”  
还有一条推文的内容是：“风险投资支持的软件已经没有市场了”，或者“纯软件不再能获得风险投资了”。

**Nivi:** I think it was like, “ [Pure software is rapidly becoming uninvestable](https://x.com/naval/status/2027981651012473197),” if I remember correctly.  
**Nivi：** 我记得当时好像是这么说的，“ [纯软件正在迅速变得不值得投资](https://x.com/naval/status/2027981651012473197) ”。

**Naval:** Yeah, that’s a watered-down version of what I really wanted to say, which is that pure software is uninvestable. I would just full stop right there. If your whole advantage is like, “Hey, I’m building cool software that other people don’t know how to build,” I think that’s uninvestable.  
**纳瓦尔：** 是啊，这其实是我真正想说的简化版，我真正想说的是，纯软件开发不值得投资。我就此打住吧。如果你唯一的优势是“嘿，我正在开发别人不会开发的炫酷软件”，我认为这是不值得投资的。

And it’s uninvestable for two reasons.  
它不值得投资，原因有二。

One is they can just hack it together today. And the second is the coding agents are getting better so quickly that within a year, or even less, they’ll probably be building scalable software with good architecture. So I think we’re going to see leaps and bounds improvements. That genie is out of the bottle.  
第一，他们现在就能凑合着用。第二，编码代理的进步速度如此之快，一年之内，甚至更短的时间内，他们可能就能构建出架构良好、可扩展的软件。所以我认为我们将看到飞跃式的进步。潘多拉的魔盒已经打开了。

So if you’re a venture investor now, you’re looking for hardware, you’re looking for network effects, you’re looking for AI models. And I would argue that training AI models *is* the new building software for however long that lasts until autoresearch and autotraining starts working.  
所以，如果你现在是一名风险投资者，你会关注硬件、网络效应和人工智能模型。我认为，在自动研究和自动训练真正发挥作用之前，训练人工智能模型 *就像是* 新一代的软件开发。

But I think vibe coding, it’s more fun than playing video games. It’s more productive. It’s more constructive. It has better feedback loops. You build something you want. You’re at the bleeding edge of technology. You may even make some money or career out of it—although careers are kind of dead—but you may make an interesting opportunity out of it. And you learn a lot about computers just by doing.  
但我认为，用编程的方式比玩电子游戏更有趣，效率更高，更有建设性，反馈机制也更完善。你可以打造自己想要的东西，站在技术的最前沿。你甚至可能从中赚到钱或发展事业——尽管现在“事业”这个词似乎已经过时了——但你或许能从中获得一些有趣的机会。而且，你还能在实践中学到很多关于计算机的知识。

I’ve seen kids who are vibe coding. It’s hard to get kids to program. You can throw [Swift Playgrounds](https://www.apple.com/swift/playgrounds) and [ScratchJr](https://www.scratchjr.org/) and all of that at them and hope that they pick up coding. But if you throw vibe coding at them, they’re going to get instant feedback and instant rewards. Maybe along the way they’ll pick up fundamentals because these things still require some skill to operate.  
我见过一些孩子在进行“感觉编程”（vibe coding）。让孩子们学习编程很难。你可以给他们 [Swift Playgrounds](https://www.apple.com/swift/playgrounds) 、 [ScratchJr](https://www.scratchjr.org/) 之类的工具，然后指望他们能学会编程。但如果你让他们体验“感觉编程”，他们就能立即获得反馈和奖励。或许在这个过程中，他们还能掌握一些基础知识，因为这些工具的操作仍然需要一定的技巧。

And in the process of operating them, you’ll be forced to figure out the command line; and you’ll be forced to figure out how basic computer architecture works; and you’ll be forced to figure out concepts like caching, and backing off in a network, and sharing streams, and writing to disk; and latency versus bandwidth trade-offs, et cetera, and all of those things. So you’ll be forced to learn some basics of computer algorithms and architecture. And it’s just a fun way to go. I’ve been up late nights, probably spending a couple hours every night—the time that used to go into reading, or doomscrolling, or playing video games—is all now in vibe coding. In fact, that’s why I haven’t been active on X recently. I’ve been completely missing on X because I’m buried in Claude and Codex.  
在操作这些程序的过程中，你将被迫学习命令行；你将被迫了解计算机的基本架构；你将被迫理解缓存、网络退避、流共享、磁盘写入等概念；以及延迟与带宽的权衡等等。因此，你将被迫学习一些计算机算法和架构的基础知识。而且，这本身就是一种很有趣的学习方式。我最近经常熬夜，可能每晚都要花上几个小时——以前用来读书、浏览负面新闻或玩电子游戏的时间——现在全都投入到编程中了。事实上，这就是我最近没怎么在 X 上活跃的原因。我完全没怎么在 X 上露面，因为我埋头研究 Claude 和 Codex。

## A Place for Each Model每个模型都有其专属位置

**Nivi:** AI has gotten so surprisingly resourceful that whenever I get a response that isn’t surprisingly resourceful, I just assume they’re not feeding it enough tokens.  
**Nivi：** 人工智能已经变得如此足智多谋，以至于每当我收到一个不够足智多谋的回复时，我都会认为他们没有给它足够的令牌。

The most interesting thing to me about agents is their ability to error correct and learn—how people have it watch YouTube videos at night or go out onto the internet and try and learn about the tasks they’ve been instructed to perform during the day.  
对我来说，智能体最有趣的地方在于它们能够纠正错误和学习——就像人们晚上看 YouTube 视频或上网学习他们白天被指示执行的任务一样。

So these agents are going out and error correcting and improving their skills. Likewise, the innovation of thinking in AI models is also an application of error correcting, where you take the next token prediction process and turn it into a pseudo-thinking process that can error correct as it goes through each step in the thought process.  
因此，这些智能体会不断进行错误纠正，提升自身技能。同样，人工智能模型思维的创新也是错误纠正的一种应用，它将下一个词元的预测过程转化为一种伪思维过程，使其能够在思考过程的每个步骤中进行错误纠正。

Getting rid of hallucinations was also an error correction process.  
消除幻觉也是一个纠错过程。

So I wonder what’s going to be the next application of error correction in AI? One random thought I had, and I’m sure people are working on it, is applying error correction to agents working together—agents working with other agents. Because one of the important ways that people learn and improve is by working with and talking to other people.  
所以我想知道，人工智能中纠错技术的下一个应用领域会是什么？我突然想到一个主意（我相信肯定有人正在研究），那就是将纠错技术应用于协同工作的智能体——也就是智能体之间相互协作的智能体。因为人们学习和进步的重要途径之一就是与他人合作和交流。

**Naval:** I’m not sure the analogy applies that well, because [AI is jagged intelligence](https://x.com/karpathy/status/1816531576228053133), as they say, where it’s incredibly smart at some things and incredibly dumb at others. And it’s structured very differently than humans in that when you’re using Claude, you’re using the same AI model—even if you have 10 instances of it running. So 10 of them talking to each other doesn’t really improve its thinking in the same way that 10 humans talking to each other do, because those humans are trained on 10 different datasets.  
**纳瓦尔：** 我不确定这个比喻是否恰当，因为 [人工智能的智能是参差不齐的](https://x.com/karpathy/status/1816531576228053133) ，正如他们所说，它在某些方面非常聪明，而在另一些方面却非常愚笨。而且它的结构与人类截然不同，当你使用克劳德时，你使用的是同一个人工智能模型——即使你运行了 10 个实例。因此，10 个实例之间的交流并不会像 10 个人之间的交流那样提升它们的思维能力，因为 10 个人接受的是 10 个不同的数据集的训练。

Humans are just inherently very creative and think out of bounds. Whereas the AI agents are trained on the same data distribution. They’re literally running the same model. It’s like 10 people with the same brain and the same dataset talking to each other. Sure, just through thermodynamics they might have some different ideas and come up with something slightly different, but they’re generally going to think the same. So all you’re doing when your 10 agents are talking to each other is you’re just throwing 10 times as many tokens at the problem. It’s like saying take 10 times as long if you need to.  
人类天生就极富创造力，思维跳脱常规。而人工智能代理则基于相同的数据分布进行训练，它们运行的实际上是同一个模型。这就好比十个拥有相同大脑、使用相同数据集的人互相交流。当然，由于热力学原理，他们可能会产生一些不同的想法，得出略有不同的结果，但总体而言，他们的思路是一致的。所以，当你的十个代理互相交流时，你所做的就是用十倍的算法来解决问题。这就像说，如果需要，就花十倍的时间。

Now there are different models like Codex, and [Gemini](https://gemini.google.com/), and [Grok Code](https://grok.com/), which are trained slightly differently. Not that different, but they’re slightly different. And so they might have some different insights.  
现在有像 Codex、 [Gemini](https://gemini.google.com/) 和 [Grok Code](https://grok.com/) 这样不同的模型，它们的训练方式略有不同。差别不大，但确实存在细微差别。因此，它们可能会得出一些不同的结论。

Claude has really good visual presentation through a system called [Artifacts](https://www.anthropic.com/news/artifacts) and Claude is very good at talking to me at the level that I’m at. So it’s very tuned to figure out from your question and your conversation what you’re capable of understanding and what level you’re asking the question at. It’s very good at meeting you at that level.  
Claude 通过一套名为 [Artifacts](https://www.anthropic.com/news/artifacts) 的系统，拥有非常出色的视觉呈现能力。而且，Claude 非常善于用我能理解的方式与我交流。它能够根据你的问题和对话，准确判断你的理解能力以及你提问的层次。它非常擅长与你进行有效的沟通。

[ChatGPT](https://chatgpt.com/) is still the OG. It’s very good all around.  
[ChatGPT](https://chatgpt.com/) 依然是元老级的，各方面都非常出色。

Gemini is very good at search because it has the Google crawl underneath. It’s a frustrating product—it’s constantly timing out on the app and losing the connection and forgetting the plot. But it’s very fast and it’s got a great search index. So if the question I’m asking is really a search question underneath, then I use Gemini.  
Gemini 的搜索功能非常强大，因为它底层使用了 Google 的爬虫技术。但它也有一些令人沮丧的地方——应用经常超时、连接断开，甚至会忘记剧情。不过，它的速度很快，而且拥有强大的搜索索引。所以，如果我提出的问题本质上是一个搜索问题，我就会使用 Gemini。

Gemini also has access to YouTube. So if you think your answer is lying in a YouTube video—and there’s a lot of YouTube videos—then Gemini has the data advantage of YouTube. So Gemini is really getting by on data advantages. It doesn’t feel like the best model to me, but it has the best underlying data.  
Gemini 还能访问 YouTube。所以，如果你认为答案就在某个 YouTube 视频里——YouTube 上的视频可真不少——那么 Gemini 就拥有了 YouTube 的数据优势。因此，Gemini 的确是靠数据优势起步的。在我看来，它并非最佳模型，但它拥有最优质的底层数据。

And then [Grok](https://grok.com/) is the one I can count on to tell me the truth. It’s like the least neutered, least nerfed. It’s got access to X, so it’s very good at news. And it’s very good at technical problems. So if you’re asking a deep, difficult problem in the scientific/mathematical domain, then I think Grok is actually quite good—not that the others aren’t, but I just think Grok is standout there. And that reflects the biases of the companies that created them and trained them and are driving them.  
然后， [Grok](https://grok.com/) 是我唯一可以信赖的、会告诉我真相的机器人。它就像是被阉割得最少、削弱得最少的机器人。它能访问 X，所以非常擅长新闻报道。它也非常擅长解决技术问题。因此，如果你在科学/数学领域提出一个深奥、复杂的问题，我认为 Grok 实际上相当出色——并不是说其他机器人不好，只是我认为 Grok 在这方面表现突出。而这反映了创建、训练和运营这些机器人的公司的偏见。

Currently all four of the leading frontier models have a place.  
目前，四款领先的前沿车型均有其市场地位。

## AI Is Eager to Please人工智能渴望取悦

**Naval:** I do use them against each other. So for example, I wire it up with my GitHub so that every time I’m submitting a new piece of code—say that’s written by Claude—then Codex and Gemini automatically fire in every pull request.  
**Naval：** 我的确会将它们结合起来使用。例如，我将它们与我的 GitHub 连接起来，这样每次我提交一段新代码时——比如说 Claude 写的——Codex 和 Gemini 就会在每个拉取请求中自动触发。

It’s misnamed, but it’s when you actually push code into your main repository and you’re basically saying this is ready for review and this is ready to get merged into the main codebase. So you’ve been working locally in a piece of code, let’s say with Claude, and then you push it into the main repository, so you file a pull request. Well, you can set it up so that other agents like Gemini and Codex and Grok automatically fire and review the pull request.  
虽然名字不太准确，但实际上就是将代码推送到主代码库，相当于声明这段代码已准备好接受审核，可以合并到主代码库中。比如，你用 Claude 在本地编写了一段代码，然后将其推送到主代码库，也就是提交了一个拉取请求 (Pull Request)。你可以设置让 Gemini、Codex 和 Grok 等工具自动触发并审核这个拉取请求。

Then they say, “Oh, well you should change this thing about the architecture,” and so on. That’s a way of getting them to sort of communicate with each other, to have a council—a roundtable of AIs. But I haven’t found that to be as useful as you might think. There’s still a lot of groupthink with these AIs. If you’re coding with them and you push towards an answer—for example, if you think you know what the answer is—it is rare that they will contradict you. You’d have to be pretty wrong for them to contradict you.  
然后它们会说：“哦，你应该修改一下架构上的这个地方”，等等。这是一种让它们彼此沟通、形成一个委员会——一个人工智能圆桌会议——的方法。但我发现它并没有你想象的那么有用。这些人工智能仍然存在严重的群体思维。如果你和它们一起编写代码，并且你倾向于给出某个答案——例如，如果你认为你知道答案是什么——它们很少会反驳你。除非你错得离谱，否则它们不会反驳你。

They’re trying to please you, and I don’t think they have any long-lived theory of mind of their own. So they’re always kind of morphing towards you, and they’re going to find the answer that you are looking for. So if you think the answer is in a certain area and you push the models even slightly, all of them will find roughly the same answer because you’re leading them to the answer. They’re very easily led around.  
它们试图取悦你，而且我认为它们自身并没有什么持久的思维理论。所以它们总是会向你靠拢，最终找到你想要的答案。因此，如果你认为答案在某个特定领域，即使你稍微引导一下这些模型，它们最终都会找到大致相同的答案，因为你在引导它们找到答案。它们很容易被牵着鼻子走。

One of the things I’ve noticed is that as the codebase has gotten more complex and larger, it becomes more difficult to manage because it doesn’t all fit into the model’s context window anymore. The models can only hold a certain amount of data in their heads. And right now the state of the art is about a million tokens, which will be considered laughable in the future.  
我注意到的一点是，随着代码库变得越来越复杂和庞大，管理起来也越来越困难，因为所有内容都无法完全容纳在模型的上下文窗口中。模型的“大脑”只能存储一定量的数据。而目前最先进的技术大约能存储一百万个令牌，这在未来将会显得微不足道。

You can approximate that by thinking that is a million words, and that’s because of the transformer attention mechanism underneath which, for it to properly work, the problem is a square of the number of tokens in the context. So if it’s a million tokens, that means the context window is like in the order of complexity of a trillion tokens because it’s the square of a million.  
你可以把它近似理解为一百万个单词，这是因为底层 Transformer 的注意力机制，为了使其正常工作，上下文中的词元数量是其平方。所以，如果是一百万个词元，那就意味着上下文窗口的复杂度大约是万亿个词元，因为它是一百万的平方。

So the context window runs out as your codebase gets larger. The models can’t keep all of it in memory anymore. So they start making guesses, approximations, they start compacting the context window. They start losing the plot. They get lost. They start fixing the wrong thing. They fix the same bug five times. They go do a quick patch in the architecture when the problem lies somewhere else, and you have to guide them.  
随着代码库规模的扩大，上下文窗口会逐渐耗尽。模型无法再将所有信息都保存在内存中。因此，它们开始进行猜测和近似计算，开始压缩上下文窗口。它们开始偏离主题，迷失方向。它们开始修复错误的地方。它们会反复修复同一个 bug 五次。当问题出在其他地方时，它们会匆忙地对架构进行修补，这时你不得不引导它们。

So as you are dealing with a more and more complex codebase, it falls upon the operator to provide the guidance to say, “Actually here, I think we should just re-architect that whole thing.”  
因此，随着代码库变得越来越复杂，操作员有责任提供指导，比如“实际上，我认为我们应该重新设计整个架构”。

And they will do some incredibly boneheaded things. Like if you are not paying attention and just text is scrolling by, occasionally they’ll patch a bug just by eliminating the use case or destroying the feature in the first place. Or they’ll do something that is clearly a hack and you kind of have to stop them and say, “Hey, that’s a hack.”  
他们还会做一些极其愚蠢的事情。比如，如果你没注意，只是文字滚动浏览，他们有时会通过直接移除某个用例或彻底删除某个功能来修复 bug。或者他们会做一些明显是临时拼凑的改动，你不得不阻止他们，告诉他们：“嘿，这是临时拼凑的。”

And by the way, I do this all the time.  
顺便说一句，我经常这样做。

I’ll stop the model. And I’ll say, “No, that’s a hack. That’s a patch. Go fix it at an architectural level.” And what’s funny is the model will always say, “Oh, I’m sorry. You’re right. That was a hack.”  
我会停止模型运行，然后说：“不行，那是权宜之计，那是补丁，得从架构层面修复。” 有趣的是，模型总是会说：“哦，对不起，你说得对，那是权宜之计。”

Even if that wasn’t a hack, the model will say, “You’re right. That was a hack.”  
即使那不是黑客行为，模型也会说：“你说得对，那确实是黑客行为。”

So the model is always trying to please you, and it doesn’t know any better. In that sense, it’s a little bit like a dog. It’s better than you at catching that duck if you’re duck hunting with a dog, but it’s still a dog. So if you point it at a bird that’s not a duck, it might take that bird down instead. So you do have to guide it. It does require a lot of operational oversight.  
所以这个模型总是试图取悦你，它自己却不知道更好的选择。从这个意义上讲，它有点像狗。如果你带着狗去猎鸭，它肯定比你更擅长捕捉鸭子，但它毕竟还是狗。所以如果你把它指向的不是鸭子，它可能会误捕那只鸟。因此，你必须引导它。它确实需要大量的操作监督。

So, long-winded way of saying, you still have to guide these models. Them talking to each other isn’t going to fix the problem. And you do have to get involved in the architecture, the debugging, the features, and pay close attention. But this combo right now of human operator combined with state-of-the-art coding model can yield incredible results.  
简而言之，你仍然需要引导这些模型。它们之间相互通信并不能解决问题。你确实需要参与架构设计、调试和功能开发，并密切关注。但目前这种人机协作与最先进的编码模型相结合的方式，可以产生惊人的效果。

You can already completely one-shot simple apps. So like a basic task list, a basic video game clone—you can one-shot them: one prompt and you get something that’s reasonably good coming out the other end.  
你已经可以一次性完成一些简单的应用程序。比如一个基本的任务清单，或者一个基本的电子游戏克隆版——你都可以一次性完成：只需一个提示，就能得到一个相当不错的成品。

So you can see where this is headed. Eventually, once they have enough data, they will be able to one-shot very complex apps, and that’s a whole different world that we’re going to get into.  
所以你应该能看出事情的发展方向。最终，一旦他们掌握了足够的数据，就能一次性攻破非常复杂的应用程序，那将是我们即将进入的一个完全不同的领域。

## Why Math and Coding? 为什么选择数学和编程？

**Naval:** Now in terms of what is it about coding that makes them uniquely good at it?  
**海军：** 那么，究竟是什么让编程如此特别，使他们如此擅长编程呢？

It’s just there’s tons and tons of data, and when you’re training the model, it’s very easy to verify, “Hey, did you do a good job or not?” Because the code has to compile. It has to execute. And you can have simple tests that are pre-written on the other side to say, “Did the code you wrote pass the test? Did it do the thing you’re supposed to do?”  
问题在于数据量非常庞大，在训练模型时，很容易验证“你做得好不好？”。因为代码必须能够编译，必须能够执行。而且，你可以在另一端预先编写一些简单的测试，来检验“你写的代码是否通过了测试？它是否实现了你预期的功能？”

So coding turns out to be one of those things that it’s actually quite easy to train models on.  
事实证明，编程是那种很容易用来训练模型的东西之一。

Mathematics is actually similar in that you have a ton of data—you have a lot of solved problems—and you can verify the output very easily. So in domains where we have a lot of data and you have good verification—self-driving is another one of those. These models do extremely well.  
数学其实与之类似，它拥有海量数据——大量已解决的问题——而且可以非常容易地验证结果。因此，在那些拥有大量数据且验证机制完善的领域——自动驾驶就是其中之一——这些模型表现非常出色。

In areas where you don’t have a lot of data, which are brand new fields, the models are not going to do well, and that’s still an opportunity for humans and creativity. Then domains where it’s hard to verify, for example, in creative writing—like who determines what’s good creative writing versus what’s not, what’s slop versus what’s not—then these models don’t do as well because you can’t easily run a closed loop where they’re just outputting huge amounts of content and then that content is being immediately algorithmically graded without having to have humans in the loop saying, “This is good, this is bad.”  
在数据量匮乏的新兴领域，模型表现不佳，但这仍然为人类和创造力提供了机会。而在创意写作等难以验证的领域——比如谁来评判什么是好的创意写作，什么是不好的，什么是粗制滥造的——这些模型也难以发挥作用，因为很难构建一个闭环系统，让模型能够输出大量内容，然后立即由算法进行评分，而无需人工干预，判断“这是好的，这是坏的”。

For example, if you’re trying to do creative writing with these models, they’re going to output huge amounts of content. They can output infinite essays. Who’s to say it’s good on the other side? Even if you hire some low-wage people to sit around call center style and say, “this is good” or “this is bad,” it’s only as good as their taste.  
例如，如果你尝试用这些模型进行创意写作，它们会产出海量的内容。它们可以写出无穷无尽的文章。但谁又能保证这些文章的质量呢？即使你雇佣一些低薪人员像客服中心员工那样坐在那里，评头论足“这个好”或“这个差”，最终的质量也仅仅取决于他们的品味。

I think one of the reasons why these coding models got really good recently—there’s multiple; one is they’re doing sort of almost recursive training where like one model is helping improve the next one—but I think the bigger reason might just be that a lot of the best software engineers started using these models in the last few months and their taste is now feeding back in. So you’re getting access to their code plus their taste as to what’s good and what’s not.  
我认为这些编码模型最近变得如此优秀的原因有很多——其中之一是它们采用了一种近乎递归的训练方式，即一个模型帮助改进下一个模型——但我认为更重要的原因可能是，许多顶尖的软件工程师在过去几个月里开始使用这些模型，他们的经验现在也反馈了出来。因此，你不仅能获得他们的代码，还能获得他们对模型优劣的判断。

You need high-taste feedback loops to improve these models. And those are harder to develop than they look.  
你需要高质量的反馈机制来改进这些模型。而建立这样的机制比看起来要难得多。

In certain domains it’s tractable and in other domains it’s hard to see how it happens.  
在某些领域，这种现象很容易解释；而在其他领域，则很难理解它是如何发生的。

## The Beginning of the End of Apple’s Dominance苹果霸权走向终结的开端

**Naval:** So the obvious stuff is, yeah, you go and you build your app. Great. Less obvious stuff that’s like just one level more advanced, which will be laughably simple to a software engineer but it’s kind of fun for a non-engineer or someone who hasn’t coded in a long time to think about.  
**纳瓦尔：** 所以显而易见的事情就是，你去开发你的应用程序。很好。还有一些不太明显的事情，比如更高级一点的事情，对软件工程师来说可能简单得可笑，但对于非工程师或很久没写代码的人来说，思考这些事情会很有趣。

One is I built my own app store. So if I want an app, I literally open up Claude on my phone. I can operate a remote terminal, which is running on my desktop, or I can just use Claude in the cloud.  
第一点是我自己搭建了一个应用商店。所以如果我想要一个应用，我只需在手机上打开 Claude 即可。我可以操作运行在我电脑上的远程终端，或者直接使用云端的 Claude。

It can connect to [Xcode](https://developer.apple.com/xcode).  
它可以连接到 [Xcode](https://developer.apple.com/xcode) 。

I give it a two-line description. It builds me an app. It ships it to my app store. I open my app store app. The app is sitting there. I click install. 30 seconds later, I have a working app on my phone.  
我给它写了两行描述。它就帮我生成了一个应用。然后把它上传到我的应用商店。我打开应用商店，应用就在那里。我点击安装。30秒后，我的手机上就安装好了一个可以运行的应用。

That’s magical. You can literally be at dinner with someone having a conversation, they describe some app they want, you can describe it to Claude, and five minutes later you’re showing them that app on your phone.  
这太神奇了。你可以和别人一起吃饭聊天，他们描述一下想要的应用，你把应用描述给克劳德听，五分钟后你就能在手机上给他们展示那个应用了。

That’s why I say it’s kind of the beginning of the end for Apple, because Apple relies on their OS and their apps being better than everybody else’s. The hardware, yes, it’s better, but it doesn’t support their margins and their monopoly, or pseudo-monopoly. So when all your communication starts going through Claude, or through Codex, or through some other agent, when all you’re doing all day long is instead of opening an Uber app, you’re saying, “Call me an Uber,” or instead of opening a workout app, you’re saying, “Where’s my workout app? Track my workout. Make no mistakes,” right?

Then you are just communicating with the agent, and when that happens, then the need for a phone becomes much smaller and smaller.  
这样一来，你只需要与经纪人沟通，而当这种情况发生时，对手机的需求就会越来越小。

Maybe there’s a few banking apps and government apps that haven’t ported and don’t have the proper APIs. But these agents don’t even need APIs. They can figure out and create their own APIs on the fly.  
或许有一些银行应用和政府应用尚未移植，也没有合适的 API。但这些代理甚至不需要 API。他们可以随时自行摸索并创建 API。

The use case stops being your interfacing with your iPhone or your Android phone. Instead, you’re just interfacing with the AI model. And now Apple is using Gemini, which is Google’s AI model. So what’s the difference? I might as well just use an Android phone, because all I need at that point is I need a screen, I need battery, and I need connectivity. And Android’s got that just fine.  
使用场景不再是你与 iPhone 或安卓手机的交互，而是你与人工智能模型的交互。现在苹果使用的是 Gemini，也就是谷歌的人工智能模型。那么区别在哪儿呢？我干脆直接用安卓手机得了，因为到了那个时候，我需要的只是屏幕、电池和网络连接。而安卓手机这三点都完全满足。

And then the apps and user interfaces are being created on the fly for what I need. And yes, for certain things, there will always be best-of-breed user interfaces and you’ll want some familiarity. But even the era of tap, tap, tap, upgrade your system software, drag this over here, hunt for that button, type into that field, all that is going away. It should all be conversational. It should all be agentic. And in that world, Apple loses a lot of its advantages, and then it’s competing purely on, “Oh yeah, we have the best chips and we have the best integrated hardware.”  
然后，应用程序和用户界面会根据我的需求即时创建。没错，某些方面总会有最佳的用户界面，你也会想要一些熟悉感。但即使是过去那种点击、点击、点击，升级系统软件，把这个拖到这里，寻找那个按钮，在那个字段里输入内容的时代，所有这些都将消失。一切都应该更像对话，一切都应该更主动。在这样的世界里，苹果失去了很多优势，最终只能依靠“哦，对了，我们拥有最好的芯片和最好的集成硬件”来竞争。

But that’s not the same margins as Apple of today. That’s more like the margins that Samsung or Lenovo makes, which is not the margins that Apple wants to have. As a consequence, I think its market cap will compress.  
但这和苹果如今的利润率不一样。这更像是三星或联想的利润率，而这并非苹果想要的利润率。因此，我认为它的市值将会缩水。

I think Apple giving up on AI will go down as the biggest strategic mistake in the tech industry of this decade, and it’s the beginning of the end of Apple’s dominance. These companies can exist for a long time and make lots of money—like Microsoft is more valuable than it’s ever been. But Microsoft Windows has kind of lost the battle because they missed the mobile phone wave. They stuck to Windows OS and they didn’t upgrade to a touchscreen-based native OS designed for phones from the ground up, and they didn’t focus on the consumer. They were too focused at the enterprise level. So Apple surpassed them and is now one of the most valuable companies in the world. I think it used to be the most valuable. It might be Nvidia at this moment.  
我认为苹果放弃人工智能将成为本世纪科技行业最大的战略失误，也是苹果霸主地位走向终结的开始。这些公司可以长期存在并赚取巨额利润——比如微软的市值就达到了前所未有的高度。但微软 Windows 在某种程度上已经败下阵来，因为它错过了移动互联网的浪潮。它固守 Windows 操作系统，没有升级到专为手机从零开始设计的、基于触摸屏的原生操作系统，也没有关注消费者市场。它过于专注于企业级市场。因此，苹果超越了它，如今已成为全球市值最高的公司之一。我认为它曾经是最有价值的公司。目前，最有价值的可能是英伟达。

The same way I think Apple will get surpassed. I think their future growth is capped because they’re now captive on AI and they’re behind. Unless they manage to turn the AI ship around, I think Apple has capped growth long term, and is in “trouble.” Not in the sense that it won’t be valuable, but it’ll be a lot less valuable than it could have been.  
我认为苹果也会被超越，原因也一样。我认为他们未来的增长已经达到极限，因为他们现在被人工智能束缚，而且落后于其他公司。除非他们能够扭转人工智能的颓势，否则我认为苹果的长期增长已经停滞不前，并且陷入了“困境”。这并非意味着它不再有价值，而是说它的价值会远低于它原本应有的水平。

## Coding Agents As Customer Service Reps编码员担任客户服务代表

**Naval:** The other thing is within the app that I’m building, I have a bug reporting infrastructure, where if someone sees a bug, they tap on a button, the bug sends the logs up and the bug files into a server. And then I have Claude go every 24 hours through all the bug reports and it just fixes them all, by itself, without my having to intervene. And it puts all the fixes into side branches for me to review. And then all I have to do is just review the fixes and say, “Ah, that wasn’t really a bug. That wasn’t a good fix. Don’t ship that.”  
**Naval：** 还有一点，在我正在开发的应用程序中，我有一个错误报告机制。如果有人发现错误，他们只需点击一个按钮，错误报告系统就会将日志和错误文件发送到服务器。然后，Claude 会每 24 小时处理一次所有错误报告，并自动修复所有错误，无需我干预。它会将所有修复程序放到单独的分支中供我审核。这样，我只需要审核这些修复程序，然后说：“啊，这其实不是个错误。这个修复方案不好。不要发布它。”

“Oh, that looks good. Makes sense. Ship it.”  
“哦，看起来不错。挺合理的。发货吧。”

I’m just the final gate that decides on what goes out there. Eventually you can see apps being built that way by features, where the users will ask for features, they’ll vote on features, and then there’ll be some tastemaker or maintainer in the cloud who’ll look at that and say, “No, the users don’t know what they want.”  
我只是最终决定哪些内容可以发布的最后一道关卡。最终你会看到应用程序以这种方式构建：用户提出功能需求，他们对功能进行投票，然后云端的一些决策者或维护者会查看这些投票结果，然后说：“不，用户不知道他们想要什么。”

Or, “Oh, that makes a lot of sense. We should fix that or change that.”  
或者，“哦，这很有道理。我们应该解决这个问题或做出改变。”

So I think even software development will become a collaborative process with the users and the agents will be handling all of it. Because in a sense, the agents can do perfect customer service. If your customer service was perfect, your customer service person would also be an incredible coder and would be indefatigable. They would be up 24/7. They would be writing code, fixing bugs, responding to people, and they would have no ego if they wrote a lot of code to fix a bug, and then you just threw it all away. So I just find that kind of a feature very compelling. You truly can have one-person, two-person software companies now that can scale to millions upon millions of users and make billions upon billions of dollars.  
所以我认为，软件开发最终也会变成一个与用户协作的过程，而客服人员将负责处理所有相关事宜。因为从某种意义上说，客服人员可以提供完美的客户服务。如果你的客户服务完美无缺，那么你的客服人员也应该是一位技术精湛、不知疲倦的程序员。他们会全天候待命，编写代码、修复漏洞、回复用户，即使他们为了修复一个漏洞而编写了大量代码，最终却被你全部丢弃，他们也不会感到沮丧。因此，我认为这种特性非常吸引人。现在，你真的可以拥有一个由一两个人组成的软件公司，能够扩展到数百万用户，并创造数十亿美元的收入。

That has happened already in the past with people like Notch and [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto), and very small teams like the original Instagram team that just made a huge dent with very few people, or the original WhatsApp team. But I think you’re going to see it more and more now.  
过去已经发生过类似的事情，比如 Notch 和 [中本聪](https://en.wikipedia.org/wiki/Satoshi_Nakamoto) ，以及像最初的 Instagram 团队（人数很少，却取得了巨大的成就）或最初的 WhatsApp 团队。但我认为，这种情况以后会越来越普遍。