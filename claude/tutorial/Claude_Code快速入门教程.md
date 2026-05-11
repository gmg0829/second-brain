---
title: "Claude Code 快速入门教程 - 完整指南"
sourceTitle: "Mastering Claude Code in 30 minutes"
sourceUrl: "https://www.youtube.com/watch?v=SUysp3sJHbA"
description: "Learn how to set up and use Claude Code, an AI-powered agentic coding tool by Anthropic"
date: 2025-01-15
tags: ["Claude Code", "AI Coding", "Tutorial"]
---

# Claude Code 快速入门教程

> 视频来源: [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=SUysp3sJHbA)

---

## 第一部分：课程介绍

All right then gang. In this course, we're going to be diving into claude code which is an AI powered agentic coding tool created by Enthropic which you can use to analyze, plan, write and edit code within your projects.

好了，朋友们，在这门课程中，我们将深入学习 Claude Code，这是由 Anthropic 创建的人工智能代理编程工具，你可以用它来分析、计划、编写和编辑项目中的代码。

Similar to other agentic coding tools like copilot or cursor or windsurf.

它类似于其他代理编程工具，如 Copilot、Cursor 或 Windsurf。

But whereas those other tools typically come with a user interface embedded within code editors themselves, claude code lives directly in the terminal and we interact with it through the terminal.

但与其他工具通常内置于代码编辑器中的用户界面不同，Claude Code 直接在终端中运行，我们通过终端与它交互。

And that means it can integrate with your existing development workflow a little more seamlessly without forcing you to switch your IDE.

这意味着它可以更无缝地集成到你现有的开发工作中，而无需强制你切换 IDE。

On top of that, you can use cloud code within GitHub workflows to automate code reviews on pull requests to provide feedback as well as have it work independently on open issues in your repository.

此外，你可以在 GitHub 工作流中使用 Claude Code 来自动化代码审查，在 Pull Request 上提供反馈，还可以让它独立处理仓库中的开放问题。

I also think it sets itself apart in its ability to really understand the codebase of whatever project I use it on.

我还认为它的独特之处在于能够真正理解我使用的任何项目的代码库。

And in my own personal experience, I found the code it generates to be more tailored and appropriate on a project by project basis.

根据我个人的经验，我发现它生成的代码更加量身定制，更适合每个项目。

So, in this series, we'll be diving into how to set up Claude Code on your computer, how to provide it context and learn about your codebase, have it generate code for us in a targeted and specific way, and we'll also set it to work on our GitHub repo to work autonomously on simple issues and books.

所以，在这个系列中，我们将深入探讨如何在电脑上设置 Claude Code，如何向它提供上下文并了解你的代码库，让它为我们有针对性地生成代码，还会让它在我们的 GitHub 仓库中独立处理简单的问题和任务。

On top of that, we'll be looking at MCP servers to provide additional tools to Claude code, custom commands for common tasks, and we'll even try spinning up a sub agent to work alongside Claude.

此外，我们还将了解 MCP 服务器，为 Claude Code 提供额外的工具，自定义常见任务的命令，甚至尝试创建一个子代理与 Claude 一起工作。

And just to clarify, this will not be a VI coding course where we just let the AI loose to code everything for us.

需要澄清的是，这不是一个"放手让 AI 帮我们写所有代码"的课程。

In my opinion, that's not a productive workflow, and it can lead to more bugs, sloppy code, and technical debt, making the code much harder to maintain in the future.

我认为这不是一个高效的工作流程，会导致更多 bug、代码质量差和技术债务，使代码在未来更难维护。

So, we'll be taking a more hands-on approach, coding alongside Claude on tasks and features, which are more narrow and focused in scope, and also checking the work it does as we go.

所以，我们将采取更亲力亲为的方式，与 Claude 一起处理范围更窄、更集中的任务和功能，并在进行过程中检查它的工作。

And I feel this approach generally keeps the code cleaner, less buggy, and I stay fully in the loop and in control, dipping into the code to make manual changes where I need or want to.

我觉得这种方法通常能使代码更干净、bug 更少，而且我能完全掌握和控制局面，在需要或想要的时候手动修改代码。

Anyway, before we do anything, we'll need to install Cloud Code and sign up for a plan.

总之，在做任何事情之前，我们需要安装 Claude Code 并注册一个订阅计划。

---

## 第二部分：安装 Claude Code

Okay, then. So, I'm on the Cloud Code homepage, and if you scroll down a little bit, you're eventually going to see an npm command we can run to install it on our computer.

好的，我现在在 Claude Code 的主页上，如果你向下滚动一点，最终会看到一个 npm 命令，我们可以用它来安装到电脑上。

Now, it used to be that on Windows you would have to install it via WSL, but now you don't have to, and you can just run this command directly in your Windows terminal, so copy that for later.

以前在 Windows 上需要通过 WSL 安装，但现在不需要了，你可以直接在 Windows 终端中运行这个命令，所以先复制下来备用。

You'll also need to sign up for an account and choose a pricing plan, which you can do right here on the pricing page.

你还需要注册一个账号并选择定价计划，你可以在定价页面完成。

So, you can use Claude Code with a pro plan or a max plan.

所以，你可以使用 Pro 计划或 Max 计划来使用 Claude Code。

The free plan gives you access to the Claude models on the web and the desktop app, but not Claude Code itself, at least not at the time of recording this video.

免费计划让你可以访问网页版和桌面版的 Claude 模型，但不能使用 Claude Code，至少在录制这个视频时是这样的。

The pro plan is $17 a month and for that you get some fairly decent usage limits which reset I think every 5 hours and you do also get a warning when you're nearly reaching your limit.

Pro 计划每月 17 美元，你会获得相当不错的使用限额，我想每 5 小时重置一次，当你接近限额时也会收到警告。

You also get access to more models like Sonic 4 and Opus 4.1 but the Opus model does eat through your limits much faster.

你还可以使用更多模型，如 Sonic 4 和 Opus 4.1，但 Opus 模型消耗限额的速度要快得多。

So I default to Sonic for most things.

所以我默认使用 Sonic 做大多数事情。

The Max plan is way more expensive but it gives you more usage and access to all the latest features as they ship.

Max 计划贵得多，但它提供更多使用量和最新功能。

So sign up, choose a plan and then crack open your terminal.

所以注册一个账号，选择计划，然后打开你的终端。

All right then. So inside a terminal now we want to run that command we just copied npm install g to install this globally at anthropicai/claude code.

好的，现在在终端中，我们运行刚才复制的命令，用 npm install -g 来全局安装 anthropicai/claude-code。

So press enter to install this.

按回车键安装。

Okay. And then the next thing you want to do once you've installed that is navigate to a project that you want to work with claude on.

好的，安装完成后，你需要导航到你想要与 Claude 一起工作的项目。

So I've already navigated to this one called shinobi.

我已经导航到这个名为 shinobi 的项目。

This is what we're going to be using for this course.

这是我们这门课程要用的项目。

And then you can type claude and press enter.

然后输入 claude 并按回车。

And this starts up a claude session inside this project for you.

这会在这个项目中为你启动一个 Claude 会话。

Now, when you first start using Claude, the first time you use it, it's going to ask you a few questions.

现在，当你第一次使用 Claude 时，它会问你几个问题。

It's going to ask you for a mode.

它会询问你想要的模式。

So, I'm going to go for dark mode.

所以，我选择深色模式。

And then it's going to say you can log in using the console account, which is API usage, or with a subscription.

然后它会说你可以使用控制台账号（API 使用量）或订阅登录。

Now, I showed you those plans a moment ago, and I've already got a pro subscription.

刚才我给你看了那些计划，我已经有一个 Pro 订阅了。

So, I'm going to sign up with this sign in rather, and that's going to open a browser for you, which I'm going to authorize off screen.

所以，我用这个登录方式登录，它会为你打开一个浏览器，我会在后台授权。

And now you can see it says login successful. Press enter to continue.

现在你看到显示登录成功，按回车继续。

And then it says here Claude can make mistakes. So always review Claude's responses especially code.

然后它会说 Claude 可能会犯错误，所以一定要审查 Claude 的回复，尤其是代码。

And it says due to prompt injection risks only use it with code you trust.

它还说由于提示注入风险，只在你信任的代码上使用它。

All right. So press enter to continue.

好的，按回车继续。

And then when you first start Claude in a particular project, it's going to ask you if you trust the files in the folder.

然后当你第一次在某个项目中启动 Claude 时，它会问你是否信任该文件夹中的文件。

Yes, I do.

是的，我信任。

And now we can start chatting with Claude.

现在我们可以开始和 Claude 聊天了。

So just try asking it about your current project.

试着问问它关于你当前项目的情况。

That's what I'm going to do.

我打算这样做。

And this is good if you ever start work on a project that you've not worked on before.

这对于你开始一个以前没做过的项目很有帮助。

It could be your friends or colleagues.

可能是你的朋友或同事的项目。

You can just say, can you provide me with a summary of what this project is and press enter.

你可以说"你能给我一个这个项目的概要吗"，然后按回车。

And you can see right now it's reading different files.

现在你可以看到它正在读取不同的文件。

It's looking at the codebase.

它在查看代码库。

And now it's come with a response.

现在它给出了回复。

So you can see it's a simple blog application built as a starter project for a claude code crash course which is pretty cool.

所以你可以看到这是一个简单的博客应用，是作为 Claude Code 速成课程的入门项目，非常酷。

It's detected that from my readme file.

它从我的 README 文件中检测到了这一点。

I think it's a nextjs based web application that serves as a practical learning platform for AI assisted development.

我认为这是一个基于 Next.js 的 Web 应用，作为 AI 辅助开发的实践学习平台。

So there's a text stack here uh learning focus areas etc.

所以这里有技术栈、学习重点等。

Now, personally, I like to see the code that I'm working on as Claude or any other coding tool makes changes to it because then I can easily check any edited or new code and also go into the weeds myself to work on the code manually when I want or need to.

就我个人而言，我喜欢看到 Claude 或其他编码工具对我正在处理的代码所做的更改，因为我可以轻松检查任何编辑或新代码，也可以自己深入研究，在需要或想要时手动处理代码。

So, for this series, I'm going to be running Claude Code in the terminal within VS Code.

所以，在这个系列中，我将在 VS Code 的终端中运行 Claude Code。

And when we run the Claude command inside here, Claude is automatically going to install the Claude Code extension for VS Code.

当我们在里面运行 Claude 命令时，Claude 会自动为 VS Code 安装 Claude Code 扩展。

And that allows it to integrate more seamlessly within the editor by adding a few extra features like diff viewing, adding text selection as context, um some keyboard shortcuts, and also active tab awareness so that Claude can see exactly what file we're working on.

这让它能够更无缝地集成到编辑器中，添加一些额外功能，如差异视图、将文本选择作为上下文、一些键盘快捷键，以及活动标签页感知，这样 Claude 可以准确看到我们正在处理的文件。

Now, if the extension doesn't automatically get installed, then you can manually install it by coming to the extensions tab and searching for Claude Code.

如果扩展没有自动安装，你可以手动到扩展标签页搜索并安装 Claude Code。

Anyway, I've got that same Shinobi project open in VS Code, which is the project I'm going to be working on for the duration of this course.

总之，我在 VS Code 中打开了同样的 Shinobi 项目，这是我在这门课程期间要做的项目。

And the first thing I'm going to do is run the project by opening the new terminal over here and then typing npm run dev.

我要做的第一件事是通过在这里打开新终端，然后输入 npm run dev 来运行项目。

That's going to spin up a local dev server.

这将启动一个本地开发服务器。

So, we can preview this thing in a browser using localhost port 3000.

所以，我们可以在浏览器中使用 localhost 端口 3000 预览它。

So, then on the homepage, we've got two buttons right here.

然后在主页上，这里有两个按钮。

One to go to the blog and one to go to the preview page for new UI components.

一个去博客，一个去新 UI 组件的预览页面。

So, if we go to the preview page, first of all, you can see that I've already added a few different things to this page like headings, regular text, button components, etc.

所以，如果我们去预览页面，首先你可以看到我已经在页面上添加了一些不同的东西，如标题、普通文本、按钮组件等。

And during this course, I'm going to get Claude Code to make some more reusable UI components for me and then add them to this page so that we can preview them before we use them in the actual project.

在这门课程中，我将让 Claude Code 为我制作更多可重用的 UI 组件，然后把它们添加到这个页面，这样我们可以在实际项目使用之前预览它们。

Now, if we go back and then go to the blog section, we can see a really simple blog design where we list out a bunch of blogs and they're all coming from High Graph, which is a headless CMS, and also a sidebar over here with some dummy data inside it.

现在，如果我们返回然后去博客部分，我们可以看到一个非常简单的博客设计，列出一系列博客，它们都来自 Hygraph（一个无头 CMS），这里还有一个包含一些假数据的侧边栏。

There's also a light and dark mode, which we can toggle with this little icon in the header.

还有浅色和深色模式，我们可以用标题中的这个小图标切换。

So, this is the project we're going to be working on with Claude Code, but you can use whatever project that you want.

所以，这是我们要用 Claude Code 做的项目，但你也可以用任何你想要的项目。

It doesn't really matter.

没什么大不了的。

What I would say is to begin with, make sure it's a throwaway project in case things go horribly wrong or at least use version control so you can get rid of any unwanted changes.

我想说的是，开始时确保这是一个可丢弃的项目，以防万一出问题，或者至少使用版本控制，这样你可以删除任何不需要的更改。

---

## 第三部分：配置 Claude Code

All right, so before we move on and start doing any real work with Claude Code, I just want to set up a few things.

好的，在继续用 Claude Code 做实际工作之前，我想先设置几件事。

First, I'm going to use a special command Claude Code gives to us, which is forward slash terminal setup.

首先，我将使用 Claude Code 给我们的一个特殊命令，即 /terminal setup。

And when we run this command, it's going to install the shift plus enter keybinding for new lines when we're chatting with Claude code.

当我们运行这个命令时，它会安装 Shift + Enter 键绑定，这样我们在与 Claude Code 聊天时可以换行。

So if you wanted to start a new line in the chat window, you'd press shift and enter.

所以如果你想在聊天窗口中开始新行，你需要按 Shift 和 Enter。

Next, to make sure I don't end up wrecking this starter project, I'm going to ask Claude to switch to a new branch called Claude edits.

其次，为了确保我不会毁掉这个入门项目，我将要求 Claude 切换到一个名为 claude-edits 的新分支。

And Claude can do this, by the way.

顺便说一下，Claude 可以做到这一点。

It has knowledge about your local git repository and it can run bash commands to do things like stage and commit changes, switch branches, merge branches, and even resolve conflicts.

它了解你的本地 git 仓库，可以运行 bash 命令来执行暂存和提交更改、切换分支、合并分支，甚至解决冲突。

And you can also ask it about commits or branches or changes made between commits.

你还可以询问它关于提交、分支或提交之间更改的信息。

And it's going to be able to look that up for you.

它能够为你查找这些信息。

Anyway, when we tell it to do any of these things, it's going to show us the bash command it wants to run and ask us for permission to run it.

总之，当我们告诉它做这些事情时，它会向我们展示它想要运行的 bash 命令，并请求我们许可运行它。

We'll say yes for now to let it run that command and then we'll end up on that new branch so that we can start making some edits.

我们先说"是"让它运行那个命令，然后我们会在那个新分支上，这样我们就可以开始进行一些编辑了。

So now we've got cla uh claude code installed, configured, and ready to go inside VS Code.

所以现在我们已经在 VS Code 中安装、配置好 Claude Code 并准备好使用了。

In the next lesson, we're going to start making some actual code edits, and we'll also talk about adding memory to Claude using a claude.md file.

在下一节课中，我们将开始进行一些实际的代码编辑，还要讨论如何使用 claude.md 文件为 Claude 添加记忆功能。

And by the way, if you want early access to the entire course, you can get it now on the net.dev site.

顺便说一下，如果你想提前访问整个课程，你现在可以在 net.dev 网站上获取。

So I will leave this link down below the video.

我会在视频下方留下这个链接。

You can buy the course for $3 or if you want you can sign up for a Net Ninja Pro subscription which is just $9 a month and for that you get access to all of my courses.

你可以花 3 美元购买这门课程，或者如果你愿意，你可以注册 Net Ninja Pro 订阅，每月只需 9 美元，你可以访问我的所有课程。

You get early access to every course as well plus access to my premium masterclass courses too.

你还可以提前访问每门课程，以及我的 premium 大师课程。

So the first month is half price when you use this promo code down here and I will leave this link down below the video so you can go ahead and sign up.

所以第一个月是半价，当你使用这里的促销码时，我会在视频下方留下这个链接，这样你就可以注册了。

Otherwise my friends, I'm going to see you in the next lesson.

否则，朋友们，我们下节课见。

Heat. Hey, Heat.

（音乐声）

Heat. Heat.

（音乐声）

Nat.

（音乐声）
