---
title: "Software Architecture Guide"
source: "https://martinfowler.com/architecture/"
author:
  - "[[Martin Fowler 马丁·福勒]]"
published: 2019-08-01
created: 2026-04-29
description: "Software Architecture is the important aspects of a software system's internal design, usually its major components and aspects that are hard to change."
tags:
  - "clippings"
---
## Software Architecture Guide软件架构指南

When people in the software industry talk about “architecture”, they refer to a hazily defined notion of the most important aspects of the internal design of a software system. A good architecture is important, otherwise it becomes slower and more expensive to add new capabilities in the future.  
软件行业人士谈到“架构”时，指的是软件系统内部设计中最重要方面的一个模糊概念。良好的架构至关重要，否则未来添加新功能会变得更加缓慢和昂贵。

Like many in the software world, I’ve long been wary of the term “architecture” as it often suggests a separation from programming and an unhealthy dose of pomposity. But I resolve my concern by emphasizing that good architecture is something that supports its own evolution, and is deeply intertwined with programming. Most of my career has revolved about the questions of what good architecture looks like, how teams can create it, and how best to cultivate architectural thinking in our development organizations. This page outlines my view of software architecture and points you to more material about architecture on this site.  
和许多软件从业者一样，我一直对“架构”这个词心存疑虑，因为它常常暗示着架构与编程的割裂，以及一种不健康的自负。但我通过强调优秀的架构能够自我演进，并且与编程紧密相连，从而消除了我的疑虑。我的职业生涯大部分时间都围绕着以下问题展开：优秀的架构是什么样的？团队如何构建它？以及如何在我们的开发组织中更好地培养架构思维？本页概述了我对软件架构的看法，并为您提供了本网站上更多关于架构的资料链接。

A guide to material on martinfowler.com about software architecture.  
martinfowler.com 网站上有关软件架构的资料指南。

## What is architecture? 什么是建筑？

People in the software world have long argued about a definition of architecture. For some it's something like the fundamental organization of a system, or the way the highest level components are wired together. My thinking on this was shaped by [an email exchange with Ralph Johnson](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf), who questioned this phrasing, arguing that there was no objective way to define what was fundamental, or high level and that a better view of architecture was **the shared understanding that the expert developers have of the system design.**  
软件界长期以来一直在争论架构的定义。有些人认为架构是指系统的基本组织结构，或者最高层组件之间的连接方式。我对此的思考源于 [与 Ralph Johnson 的一次邮件交流](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf) 。他对这种说法提出了质疑，认为没有客观的方法来定义什么是基本结构或高层结构，而架构的更佳理解是 **专家开发人员对系统设计的共识。**

![](https://martinfowler.com/architecture/ralph.png)

Ralph Johnson, speaking at QCon  
拉尔夫·约翰逊在 QCon 上发表讲话

A second common style of definition for architecture is that it's “the design decisions that need to be made early in a project”, but Ralph complained about this too, saying that it was more like **the decisions you wish you could get right early in a project**.  
建筑的第二个常见定义是“需要在项目早期做出的设计决策”，但拉尔夫对此也颇有微词，他说这更像是 **你希望在项目早期就能做出的正确决策** 。

His conclusion was that **“Architecture is about the important stuff. Whatever that is”**. On first blush, that sounds trite, but I find it carries a lot of richness. It means that the heart of thinking architecturally about software is to decide what is important, (i.e. what is architectural), and then expend energy on keeping those architectural elements in good condition. For a developer to become an architect, they need to be able to recognize what elements are important, recognizing what elements are likely to result in serious problems should they not be controlled.  
他的结论是： **“建筑关乎重要的东西，无论那是什么。”** 乍听之下，这似乎有些老套，但我发现它蕴含着丰富的内涵。 这意味着，从架构角度思考软件的核心在于决定什么是…… 重要的是（即什么是建筑），然后把精力花在维护这些方面。 建筑构件状况良好。对于开发商而言，要成为一名建筑师， 他们需要能够识别哪些要素是重要的，识别哪些 这些因素若不加以控制，很可能导致严重问题。

[![](https://martinfowler.com/architecture/ieee-arch.png)](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)

Ralph's email formed the core of [my column for IEEE software](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf), which discussed the meaning of software architecture and the role of an architect.  
拉尔夫的邮件构成了 [我为 IEEE 软件杂志撰写的专栏文章](https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf) 的核心内容，该专栏探讨了软件的含义。 建筑学及建筑师的角色。

## Why does architecture matter?为什么建筑如此重要？

Architecture is a tricky subject for the customers and users of software products - as it isn't something they immediately perceive. But a poor architecture is a major contributor to the growth of cruft - elements of the software that impede the ability of developers to understand the software. Software that contains a lot of cruft [is much harder to modif](https://martinfowler.com/articles/is-quality-worth-cost.html) y, leading to features that arrive more slowly and with more defects.  
对于软件产品的客户和用户来说，架构是一个棘手的话题，因为它并非他们能够立即感知到的东西。然而，糟糕的架构是导致软件冗余代码（即那些阻碍开发人员理解软件的元素）大量堆积的主要原因。包含大量冗余代码的软件 [更难修改](https://martinfowler.com/articles/is-quality-worth-cost.html) ，导致新功能发布速度更慢，缺陷也更多。

[![](https://martinfowler.com/articles/is-quality-worth-cost/card.png)](https://martinfowler.com/articles/is-quality-worth-cost.html)

This situation is counter to our usual experience. We are used to something that is “high quality” as something that costs more. For some aspects of software, such as the user-experience, this can be true. But when it comes to the architecture, and other aspects of internal quality, this relationship is reversed. **High internal quality leads to faster delivery of new features**, because there is less cruft to get in the way.  
这种情况与我们通常的经验相反。我们习惯于认为“高质量”的东西价格更高。对于软件的某些方面，例如用户体验，这可能是事实。但就架构和其他内部质量而言，这种关系恰恰相反。 **高质量的内部架构能够更快地交付新功能** ，因为阻碍功能的冗余更少。

While it is true that we can sacrifice quality for faster delivery in the short term, before the build up of cruft has an impact, people underestimate how quickly the cruft leads to an overall slower delivery. While this isn't something that can be objectively measured, experienced developers reckon that **attention to internal quality pays off in weeks not months.**  
虽然短期内为了加快交付速度可以牺牲一些质量，但人们往往低估了冗余代码积累造成整体交付速度下降的速度。尽管这种影响无法客观衡量，但经验丰富的开发人员认为， **重视内部质量能在几周内而非几个月内带来回报。**

[![](https://martinfowler.com/articles/is-quality-worth-cost/both.png)](https://martinfowler.com/articles/is-quality-worth-cost.html)

[Read more… 阅读更多…](https://martinfowler.com/articles/is-quality-worth-cost.html)

[![](https://martinfowler.com/architecture/oscon.png)](https://martinfowler.com/videos.html#2015-oscon)

At OSCON in 2015 I gave a [brief talk](https://martinfowler.com/videos.html#2015-oscon) (14 min) on what architecture is and why it matters.  
在 2015 年的 OSCON 大会上，我做了一个 [简短的演讲](https://martinfowler.com/videos.html#2015-oscon) （14 分钟），内容是关于什么是架构以及为什么架构很重要。

---

## Application Architecture应用架构

The important decisions in software development vary with the scale of the context that we're thinking about. A common scale is that of an application, hence “application architecture”.  
软件开发中的重要决策会随着我们所考虑的场景规模而变化。一个常见的规模是应用程序，因此有了“应用程序架构”的概念。

The first problem with defining application architecture is that there's no clear definition of what an application is. My view is that [applications are a social construction](https://martinfowler.com/bliki/ApplicationBoundary.html):  
定义应用程序架构的第一个问题是： 目前对于“应用程序”的定义并不明确。我的观点是： [应用程序是一种社会建构](https://martinfowler.com/bliki/ApplicationBoundary.html) ：

- A body of code that's seen by developers as a single unit  
	开发者视为一个整体的代码块
- A group of functionality that business customers see as a single unit  
	企业客户将一组功能视为一个整体。
- An initiative that those with the money see as a single budget  
	那些掌握资金的人将这项举措视为单一预算。

Such a loose definition leads to many potential sizes of an application, varying from a few to a few hundred people on the development team. (You'll notice I look at size as the amount of people involved, which I feel is the most useful way of measuring such things.) The key difference between this and enterprise architecture is that there is a significant degree of unified purpose around the social construction.  
这种宽泛的定义导致应用程序的规模可能千差万别，开发团队的人员规模从几人到几百人不等。（你会注意到，我把规模定义为参与人数，我认为这是衡量此类事情最有效的方法。）这与企业架构的关键区别在于，前者在社会建构方面具有高度统一的目标。

---

## Enterprise Architecture 企业架构

While application architecture concentrates on the architecture within some form of notional application boundary, enterprise architecture looks architecture across a large enterprise. Such an organization is usually too large to group all its software in any kind of cohesive grouping, thus requiring coordination across teams with many codebases, that have developed in isolation from each other, with funding and users that operate independently of each other.  
应用架构侧重于某种概念性应用边界内的架构，而企业架构则着眼于大型企业的整体架构。这类组织通常规模庞大，无法将所有软件整合到任何统一的架构中，因此需要协调多个团队，这些团队拥有众多代码库，彼此独立开发，资金和用户也各自独立运作。

Much of enterprise architecture is about understanding what is worth the costs of central coordination, and what form that coordination should take. At one extreme is a central architecture group that must approve all architectural decision for every software system in the enterprise. Such groups slow down decision making and cannot truly understand the issues across such a wide portfolio of systems, leading to poor decision-making. But the other extreme is no coordination at all, leading to teams duplicating effort, inability for different system to inter-operate, and a lack of skills development and cross-learning between teams.  
企业架构的很大一部分在于理解集中协调的成本是否值得，以及这种协调应该采取何种形式。一种极端情况是设立一个中央架构小组，要求其审批企业中每个软件系统的所有架构决策。这样的小组会拖慢决策速度，并且无法真正理解如此庞大的系统组合中存在的问题，从而导致决策失误。而另一种极端情况是完全没有协调，这会导致团队重复劳动、不同系统之间无法互操作，以及团队之间缺乏技能发展和交叉学习。

Like most people with an agile mindset, I prefer to err on the side of decentralization, so will head closer to the rocks of chaos rather than suffocating control. But being on that side of the channel still means we have to avoid the rocks, and a way to maximize local decision making in a way that minimizes the real costs involved.  
和大多数具有敏捷思维的人一样，我倾向于去中心化，宁愿靠近混乱的边缘，也不愿陷入窒息的控制。但即便如此，我们仍然需要避开障碍，找到一种方法，在最大程度上赋予本地决策权，同时尽可能降低实际成本。