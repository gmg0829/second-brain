# AI Prompt Engineering: A Deep Dive

> 来源: YouTube 视频字幕 | 视频: AI prompt engineering: A deep dive
> 参与者: Alex (Anthropic Developer Relations), David Hershey (Anthropic 客户技术), Amanda Askell (Anthropic Fine-tuning), Zack Witten (Anthropic Prompt Engineer)

---

**00:00:00 - 00:00:03**

- Basically, this entire roundtable session here

基本上，这次圆桌讨论

**00:00:03 - 00:00:06**

- is just gonna be focused mainly on prompt engineering.

主要会集中在提示工程上。

**00:00:06 - 00:00:10**

- A variety of perspectives at this table around prompting

圆桌上有各种不同的视角来看待提示

**00:00:10 - 00:00:11**

- from a research side, from a consumer side,

从研究角度、消费者角度

**00:00:11 - 00:00:13**

- and from the enterprise side.

以及企业角度。

**00:00:13 - 00:00:16**

- And I want to just get the whole wide range of opinions

我想让大家各抒己见

**00:00:16 - 00:00:18**

- because there's a lot of them.

因为观点真的很多。

**00:00:18 - 00:00:20**

- And just open it up to discussion

我们就开放讨论

**00:00:20 - 00:00:24**

- and explore what prompt engineering really is

来探讨提示工程到底是什么

**00:00:24 - 00:00:25**

- and what it's all about.

以及它的意义所在。

**00:00:25 - 00:00:28**

- And yeah, we'll just take it from there.

那我们就正式开始吧。

**00:00:28 - 00:00:30**

- So maybe we can go around the horn with intros.

我们可以轮流自我介绍。

**00:00:30 - 00:00:32**

- I can kick it off. I'm Alex.

我先来。我是 Alex。

**00:00:32 - 00:00:35**

- I lead Developer Relations here at Anthropic.

我在 Anthropic 负责开发者关系。

**00:00:35 - 00:00:36**

- Before that,

在此之前

**00:00:36 - 00:00:39**

- I was technically a prompt engineer at Anthropic.

我其实是 Anthropic 的提示工程师。

**00:00:39 - 00:00:41**

- I worked on our prompt engineering team,

我在提示工程团队工作

**00:00:43 - 00:00:45**

- and did a variety of roles spanning

做过很多不同的角色

**00:00:45 - 00:00:48**

- from a solutions architect type of thing,

从解决方案架构师类型的工作

**00:00:48 - 00:00:51**

- to working on the research side.

到研究方面的工作。

**00:00:51 - 00:00:53**

- So with that, maybe I can hand it over to David.

那么接下来交给 David。

**00:00:53 - 00:00:56**

- Heck, yeah. My name's David Hershey.

好的。我叫 David Hershey。

**00:00:56 - 00:00:59**

- I work with customers mostly at Anthropic

我主要在 Anthropic 与客户合作

**00:00:59 - 00:01:02**

- on a bunch of stuff technical,

处理各种技术问题

**01:02 - 01:04**

- I help people with finetuning,

帮助人们进行微调

**00:01:04 - 00:01:06**

- but also just a lot of the generic things

还有很多一般性的问题

**00:01:06 - 00:01:08**

- that make it hard to adopt language models of prompting.

让人们在使用语言模型和提示时感到困难。

**00:01:08 - 00:01:11**

- And just like how to build systems with language models,

以及如何用语言模型构建系统

**00:01:11 - 00:01:14**

- but spend most of my time working with customers.

不过我大部分时间都花在客户身上。

**00:01:14 - 00:01:16**

- Cool. I'm Amanda Askell.

好的。我是 Amanda Askell。

**00:01:16 - 00:01:19**

- I lead one of the Finetuning teams at Anthropic,

我负责 Anthropic 的一个微调团队

**00:01:19 - 00:01:23**

- where I guess I try to make Claude be honest and kind.

我努力让 Claude 保持诚实和友善。

**00:01:24 - 00:01:26**

- Yeah.

是的。

**00:01:26 - 00:01:27**

- My name is Zack Witten.

我叫 Zack Witten。

**00:01:27 - 00:01:30**

- I'm a Prompt Engineer at Anthropic.

我是 Anthropic 的提示工程师。

**00:01:30 - 00:01:32**

- Alex and I always argue about who the first one was.

Alex 和我总是争论谁才是第一个

**00:01:32 - 00:01:33**

- He says it's him, I say it's me.

他说是他，我说是me。

**00:01:33 - 00:01:35**

- Contested.

有争议。

**00:01:35 - 00:01:38**

- I used to work a lot with individual customers,

我以前经常与个人客户合作

**00:01:38 - 00:01:40**

- kind of the same way David does now.

和 David 现在的方式差不多。

**00:01:40 - 00:01:44**

- And then as we brought more solutions architects to the team,

后来当我们团队引入了更多解决方案架构师后

**00:01:44 - 00:01:46**

- I started working on things

我开始做一些

**00:01:46 - 00:01:50**

- that are meant to raise the overall levels of ambient prompting in society,

旨在提高社会整体提示水平的事情

**00:01:50 - 00:01:53**

- I guess, like the prompt generator

比如提示生成器

**00:01:53 - 00:01:55**

- and the various educational materials that people use.

和各种教育材料。

**00:01:59 - 00:02:02**

- Nice, cool. Well, thanks guys for all coming here.

很好，酷。感谢大家来参加。

**00:02:02 - 00:02:05**

- I'm gonna start with a very broad question

我想先问一个非常宽泛的问题

**00:02:05 - 00:02:07**

- just so we have a frame

这样我们可以有个框架

**00:02:07 - 00:02:09**

- going into the rest of our conversations here.

来引导接下来的讨论。

**00:02:09 - 00:02:14**

- What is prompt engineering? Why is it engineering?

什么是提示工程？为什么叫"工程"？

**00:02:14 - 00:02:15**

- What's prompt, really?

提示到底是什么？

**00:02:15 - 00:02:17**

- If anyone wants to kick that off,

如果有人想率先发言

**00:02:17 - 00:02:19**

- give your own perspective on it,

分享自己的看法

**00:02:19 - 00:02:21**

- feel free to take the rein here.

可以自由发言。

**00:02:21 - 00:02:23**

- I feel like we have a prompt engineer. It's his job.

我觉得我们这里有位提示工程师。这是他的工作。

**00:02:24 - 00:02:27**

- We're all prompt engineers in our own form.

我们每个人都是以自己的方式做提示工程。

**00:02:27 - 00:02:28**

- But one of us has a job.

但我们中间只有一个人有这份工作。

**00:02:28 - 00:02:30**

- Yeah. Zack, maybe since it's in your title.

对的。Zack，既然你title里有这个

**00:02:30 - 00:02:34**

- One of us has a job, but the other three don't have jobs.

我们中间有一个人有这份工作，但其他三个没有。

**00:02:35 - 00:02:37**

- I guess I feel like prompt engineering

我觉得提示工程是

**00:02:37 - 00:02:40**

- is trying to get the model to do things,

试图让模型做事情

**00:02:40 - 00:02:42**

- trying to bring the most out of the model.

试图充分发挥模型的潜力。

**00:02:42 - 00:02:46**

- Trying to work with the model to get things done

试图与模型合作完成事情

**00:02:46 - 00:02:49**

- that you wouldn't have been able to do otherwise.

那些你原本做不到的事情。

**00:02:49 - 00:02:52**

- So a lot of it is just clear communicating.

所以很大程度上就是清晰沟通。

**00:02:52 - 00:02:55**

- I think at heart,

我觉得本质上

**00:02:55 - 00:02:57**

- talking to a model is a lot like talking to a person.

和模型对话很像和人对对话。

**00:02:57 - 00:02:59**

- And getting in there

深入了解

**00:02:59 - 00:03:02**

- and understanding the psychology of the model,

理解模型的心理

**00:03:02 - 00:03:06**

- which Amanda is the world's most expert person in the world.

这方面 Amanda 是世界顶级专家。

**00:03:08 - 00:03:10**

- Well, I'm gonna keep going on you.

好吧，我继续追问你

**00:03:10 - 00:03:12**

- Why is engineering in the name?

为什么名字里有"工程"？

**00:03:13 - 00:03:14**

- Yeah.

是的

**00:03:14 - 00:03:18**

- I think the engineering part comes from the trial and error.

我觉得"工程"部分来自于反复试验

**00:03:18 - 00:03:23**

- So one really nice thing about talking to a model

所以和模型对话的一个很好的地方

**00:03:23 - 00:03:24**

- that's not like talking to a person,

和跟人对话不一样

**00:03:24 - 00:03:25**

- is you have this restart button.

是你有这个重启按钮

**00:03:25 - 00:03:28**

- This giant go back to square zero

可以完全回到起点

**00:03:28 - 00:03:29**

- where you just start from the beginning.

从头开始

**00:03:29 - 00:03:30**

- And what that gives you the ability to do

这让你能够做

**00:03:30 - 00:03:34**

- that you don't have, is a truly start from scratch

你本来没有的，就是真正从零开始

**00:03:34 - 00:03:38**

- and try out different things in an independent way,

独立尝试不同的事情

**00:03:38 - 00:03:40**

- so that you don't have interference from one to the other.

这样它们之间不会互相干扰

**00:03:40 - 00:03:43**

- And once you have that ability to experiment

一旦你有了这种实验的能力

**00:03:43 - 00:03:45**

- and to design different things,

能够设计不同的东西

**00:03:45 - 00:03:48**

- that's where the engineering part has the potential

这就是工程部分潜力所在

**00:03:48 - 00:03:49**

- to come in.

体现出来

**00:03:49 - 00:03:53**

- So what you're saying is as you're writing these prompts,

所以你说的就是当你写这些提示时

**00:03:53 - 00:03:55**

- you're typing in a message to Claude or in the API

你在给 Claude 或 API 发送消息

**00:03:55 - 00:03:56**

- or whatever it is.

或其他什么

**00:03:57 - 00:04:00**

- Being able to go back and forth with the model

能够与模型来回交互

**00:04:00 - 00:04:02**

- and to iterate on this message,

迭代这条消息

**00:04:02 - 00:04:06**

- and revert back to the clean slate every time,

每次都回到干净的状态

**00:04:06 - 00:04:08**

- that process is the engineering part.

这个过程就是工程部分

**00:04:08 - 00:04:13**

- This whole thing is prompt engineering all in one.

整个就是完整的提示工程

**00:04:13 - 00:04:15**

- There's another aspect of it too,

还有另一个方面

**00:04:15 - 00:04:19**

- which is integrating the prompts within your system as a whole.

就是将提示整合到你的整个系统中

**00:04:19 - 00:04:21**

- And David has done a ton of work with customers integrating.

David 和客户集成方面做了很多工作

**00:04:26 - 00:04:28**

- A lot of times it's not just as simple

很多时候并不像

**00:04:28 - 00:04:30**

- as you write one prompt and you give it to the model

你写一个提示然后给模型那么简单

**00:04:30 - 00:04:30**

- and you're done.

就完成了

**00:04:30 - 00:04:32**

- In fact, it's anything but. It's like way more complicated.

实际上远非如此。它要复杂得多

**00:04:34 - 00:04:36**

- I think of prompts as the way

我认为提示是

**00:04:36 - 00:04:38**

- that you program models a little bit,

你编程模型的方式

**00:04:38 - 00:04:40**

- that makes it too complicated.

这让它变得很复杂

**00:04:40 - 00:04:41**

- 'Cause I think Zack is generally right

因为我觉得 Zack 说得对

**00:04:41 - 00:04:45**

- that it's just talking clearly is the most important thing.

清晰说话才是最重要的

**00:04:45 - 00:04:47**

- But if you think about it a little bit

但如果你稍微想一想

**00:04:47 - 00:04:49**

- as programming a model, you have to think about

作为给模型编程，你要考虑

**00:04:49 - 00:04:51**

- where data comes from, what data you have access to.

数据从哪里来，你能访问什么数据

**00:04:51 - 00:04:53**

- So if you're doing RAG or something,

所以如果你在做 RAG 或类似的

**00:04:53 - 00:04:56**

- what can I actually use and do and pass to a model?

我实际上能用什么、做什么、传给模型什么？

**00:04:57 - 00:05:02**

- You have to think about trade-offs in latency

你必须考虑延迟的权衡

**00:05:02 - 00:05:03**

- and how much data you're providing and things like that.

以及你提供了多少数据之类的事情

**00:05:03 - 00:05:04**

- There's enough systems thinking

有足够的系统思维

**00:05:04 - 00:05:07**

- that goes into how you actually build around a model.

涉及到你如何围绕模型构建

**00:05:07 - 00:05:08**

- I think a lot of that's also the core

我觉得很多这些也是核心

**00:05:08 - 00:05:13**

- of why it maybe deserves its own carve-out as a thing

为什么它可能值得独立成为一个领域

**00:05:13 - 00:05:16**

- to reason about separately from just a software engineer

与软件工程师分开来考虑

**00:05:16 - 00:05:17**

- or a PM or something like that.

或产品经理之类的

**00:05:17 - 00:05:18**

- It's kind of its own domain

它有自己的领域

**00:05:18 - 00:05:20**

- of how to reason about these models.

如何思考这些模型

**00:05:20 - 00:05:24**

- Is a prompt in this sense then natural language code?

那么提示在这种意义上是自然语言代码吗？

**00:05:24 - 00:05:26**

- Is it a higher level of abstraction

它是一个更高层次的抽象

**00:05:26 - 00:05:28**

- or is it a separate thing?

还是独立的东西？

**00:05:28 - 00:05:33**

- I think trying to get too abstract with a prompt is a way

我觉得把提示弄得太抽象是

**00:05:33 - 00:05:37**

- to overcomplicate a thing, because I think,

过度复杂化一件事，因为我觉得

**00:05:37 - 00:05:38**

- we're gonna get into it, but more often than not,

我们会谈到的，但通常情况下

**00:05:38 - 00:05:39**

- the thing you wanna do

你想做的事情

**00:05:39 - 00:05:42**

- is just write a very clear description of a task,

就是写一个非常清晰的任务描述

**00:05:42 - 00:05:45**

- not try to build crazy abstractions or anything like that.

而不是试图构建疯狂的抽象之类的

**00:05:47 - 00:05:51**

- But that said, you are compiling the set of instructions

但话说回来，你在编译一系列指令

**00:05:51 - 00:05:54**

- and things like that into outcomes a lot of times.

等等之类的东西变成结果

**00:05:54 - 00:05:57**

- So precision and a lot the things

所以精确性还有很多

**00:05:57 - 00:06:00**

- you think about with programming about version control

你编程时想到的版本控制

**00:06:00 - 00:06:01**

- and managing what it looked like

和管理它过去的样子

**00:06:01 - 00:06:03**

- back then when you had this experiment.

当你做这个实验的时候

**00:06:03 - 00:06:06**

- And tracking your experiment and stuff like that,

追踪你的实验等等

**00:06:06 - 00:06:11**

- that's all just equally important to code.

这些和写代码一样重要

**00:06:11 - 00:06:15**

- So it's weird to be in this paradigm where written text,

所以在这种范式下很奇怪，书面文字

**00:06:15 - 00:06:18**

- like a nice essay that you wrote is something

比如你写的一篇好文章

**00:06:18 - 00:06:21**

- that's looked like the same thing as code.

看起来和代码一样

**00:06:22 - 00:06:25**

- But it is true that now we write essays

但现在我们确实在写文章

**00:06:25 - 00:06:27**

- and treat them code, and I think that's actually correct.

并把它们当作代码，我觉得这其实是对的

**00:06:27 - 00:06:29**

- Yeah. Okay, interesting.

好的。有趣

**00:06:29 - 00:06:31**

- So maybe piggybacking off of that,

那么也许接着这个话题

**00:06:32 - 00:06:36**

- we've loosely defined what prompt engineering is.

我们大致定义了什么是提示工程

**00:06:36 - 00:06:38**

- So what makes a good prompt engineer?

那么什么造就一个好的提示工程师？

**00:06:38 - 00:06:41**

- Maybe, Amanda, I'll go to you for this,

Amanda，也许这个问题你来说

**00:06:41 - 00:06:43**

- since you're trying to hire prompt engineers

因为你在研究领域招聘提示工程师

**00:06:43 - 00:06:44**

- more so in a research setting.

而且是在研究设置中

**00:06:45 - 00:06:46**

- What does that look like?

那是什么样的？

**00:06:46 - 00:06:49**

- What are you looking for in that type of person?

你在找什么样的人？

**00:06:49 - 00:06:50**

- Yeah, good question.

好问题

**00:06:50 - 00:06:55**

- I think it's a mix of like Zack said, clear communication,

我觉得就像 Zack 说的，清晰沟通

**00:06:55 - 00:06:58**

- so the ability to just clearly state things,

能够清晰表达事情

**00:06:58 - 00:07:00**

- clearly understand tasks,

清晰理解任务

**00:07:00 - 00:07:03**

- think about and describe concepts really well.

很好地思考和描述概念

**00:07:03 - 00:07:05**

- That's the writing component, I think.

这是写作部分，我觉得

**00:07:05 - 00:07:08**

- I actually think that being a good writer

我实际上觉得做一个好作家

**00:07:08 - 00:07:12**

- is not as correlated with being a good prompt engineer

和做一个好的提示工程师

**00:07:12 - 00:07:13**

- as people might think.

人们想象的那么相关

**00:07:13 - 00:07:15**

- So I guess I've had this discussion with people

所以我想我和人们讨论过这个

**00:07:15 - 00:07:16**

- 'cause I think there's some argument as like,

因为我觉得有争论

**00:07:16 - 00:07:19**

- "Maybe you just shouldn't have the name engineer in there.

"也许你根本不应该在里面放'工程师'

**00:07:19 - 00:07:21**

- Why isn't it just writer?"

为什么不是"作家"？

**00:07:22 - 00:07:23**

- I used to be more sympathetic to that.

我以前更认同这一点

**00:07:23 - 00:07:27**

- And then, I think, now I'm like what you're actually doing,

然后，我觉得，现在我觉得你实际做的

**00:07:27 - 00:07:31**

- people think that you're writing one thing and you're done.

人们以为你写一个东西就完成了

**00:07:31 - 00:07:34**

- Then I'll be like to get a semi-decent prompt

然后我会说坐下来想一个还算可以的提示

**00:07:34 - 00:07:37**

- when I sit down with the model.

当我坐下来和模型工作时

**00:07:37 - 00:07:38**

- Earlier, I was prompting the model

之前，我在给模型提示

**00:07:38 - 00:07:40**

- and I was just like in a 15-minute span

我在 15 分钟内

**00:07:40 - 00:07:42**

- I'll be sending hundreds of prompts to the model.

会发送数百个提示给模型

**00:07:42 - 00:07:45**

- It's just back and forth, back and forth, back and forth.

就是来回反复

**00:07:45 - 00:07:48**

- So I think it's this willingness to iterate and to look

所以我觉得是这种迭代的意愿

**00:07:48 - 00:07:51**

- and think what is it that was misinterpreted here,

思考什么是被误解的

**00:07:51 - 00:07:52**

- if anything?

如果有什么的话？

**00:07:52 - 00:07:55**

- And then fix that thing.

然后修复它

**00:07:55 - 00:07:57**

- So that ability to iterate.

所以是迭代能力

**00:07:57 - 00:08:01**

- So I'd say clear communication, that ability to iterate.

所以我说是清晰沟通，迭代能力

**00:08:01 - 00:08:03**

- I think also thinking about ways

我觉得还要考虑

**00:08:03 - 00:08:05**

- in which your prompt might go wrong.

你的提示可能出错的方式

**00:08:05 - 00:08:06**

- So if you have a prompt

所以如果你有一个提示

**00:08:06 - 00:08:09**

- that you're going to be applying to say, 400 cases,

要应用到比如说 400 个案例

**00:08:09 - 00:08:11**

- it's really easy to think about the typical case

真的很容易只考虑典型案例

**00:08:11 - 00:08:12**

- that it's going to be applied to,

它会被应用到的

**00:08:12 - 00:08:14**

- to see that it gets the right solution in that case,

看到它在这种情况下得到正确的解决方案

**00:08:14 - 00:08:15**

- and then to move on.

然后就继续

**00:08:15 - 00:08:18**

- I think this is a very classic mistake that people made.

我觉得这是人们常犯的错误

**00:08:19 - 00:08:21**

- What you actually want to do is find the cases

你实际上想做的是找到那些

**00:08:21 - 00:08:23**

- where it's unusual.

不寻常的情况

**00:08:23 - 00:08:25**

- So you have to think about your prompt and be like,

所以你必须思考你的提示，比如

**00:08:25 - 00:08:26**

- "What are the cases where it'd be really unclear to me

"哪些情况下我实在不清楚

**00:08:26 - 00:08:28**

- what I should do in this case?"

我应该怎么做？"

**00:08:28 - 00:08:29**

- So for example, you

比如说

---

*[内容过长，余下部分已截断]*

---

## 总结

这是一个关于 **提示工程（Prompt Engineering）** 的深度圆桌讨论，来自 Anthropic 的四位专家：

- **Alex** - Developer Relations 负责人，前提示工程师
- **David Hershey** - 客户技术专家
- **Amanda Askell** - Fine-tuning 团队负责人
- **Zack Witten** - 提示工程师

### 核心观点

1. **提示工程是什么**
   - 让模型做你想让它做的事
   - 充分发挥模型的潜力
   - 本质是清晰沟通
   - 包含反复试验的过程（这就是"工程"部分）

2. **好提示工程师的特质**
   - 清晰沟通的能力
   - 愿意迭代
   - 考虑提示可能出错的方式
   - 找到不寻常的边界情况

3. **提示 vs 编程**
   - 提示就像用自然语言编程
   - 需要考虑数据来源、系统思维
   - 版本控制等工程实践同样重要

4. **实践建议**
   - 多看好的提示和模型输出
   - 不断练习，与模型对话
   - 尝试让模型做你認為它做不到的事
   - 通过探索模型能力的边界来学习
