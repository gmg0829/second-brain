# Claude Code 项目初始化与使用教程（中英对照）

原文来源：YouTube 视频
主题：Claude Code 项目设置与使用教程

---

## [00:02] 初始化 Claude Code

Okay then. So now we've got Claude Code set up and running inside this project.

好的，现在我们已经在项目中设置好并运行了 Claude Code。

I would like to start using it to make some changes to the code and working on new components. But before we do that, it's always a good idea when you're starting to use the forward/init command to initialize a claude.md file inside the project root.

我想开始使用它来对代码进行一些修改并开发新的组件。但在我们这样做之前，当你开始使用 forward/init 命令在项目根目录初始化 claude.md 文件时，这总是一个好主意。

And when we do this, claude scans the entire codebase. It looks at the folder structure, how we start the application, any state management we use, etc. the whole Shazam so that it gets a good feel for the project, where everything goes and how it should code new features in the future.

当我们这样做时，Claude 会扫描整个代码库。它查看文件夹结构、如何启动应用程序、我们使用的任何状态管理等等，整套流程让它对项目有很好的了解，了解所有东西的位置以及将来如何编写新功能。

Then it summarizes all of that and it dumps the information into a claude.md file in a structured human readable format. Then whenever we have an active session with claude code to either ask about our project code or to make changes to the code, it uses that claude.md file as context and guidance.

然后它总结所有这些，并将信息以结构化、易于阅读的格式输入 claude.md 文件。然后，每当我们有与 Claude Code 的活动会话来询问我们的项目代码或对代码进行更改时，它会使用该 claude.md 文件作为上下文和指导。

It's almost like a mini documentation of your code for claw to use whenever it's trying to figure out the best way to implement something or to give feedback.

它就像一个关于你的代码的小型文档，当它试图找出实现某事的最佳方式或给出反馈时可以使用。

---

## [00:30] 执行初始化命令

So then I'm going to press enter now to run this command and see what it comes up with.

所以现在我要按回车运行这个命令，看看它会生成什么。

And you can see as it's doing this, it's created a little to-do list for itself. It's going to explore the repository, analyze the package.json and the source code. It's going to check for existing documentation files. And then finally, it's going to create this claw.md file at the bottom. And you can see that it's kind of checking things off as it does it.

你可以看到它正在这样做，它为自己创建了一个待办事项列表。它将探索存储库，分析 package.json 和源代码。它将检查现有的文档文件。然后最后，它将在底部创建这个 claude.md 文件。你可以看到它在执行时有点在逐项检查。

So, it's really good to see the progress of what it's doing in between all that. It's reading the files. It's searching for things. So, yeah, it's doing a real extensive kind of task.

所以，看到它在这之间所做的工作的进度真的很好。它在读取文件，在搜索东西。所以，是的，它正在做一个真正广泛的任务。

---

## [01:43] 查看生成的 Claude.md 文件

All right. Then, so now once it's done all that, you can see it's created this plan. And if we scroll right to the bottom, it's asking us, do you want to create this claw.md file? And I'm going to select yes.

好的。那么，现在一旦它完成了所有这些，你可以看到它创建了这个计划。如果我们滚动到最底部，它在问我们，你想创建这个 claude.md 文件吗？我要选择是。

So then it goes ahead to create that file, which we can see in the root of the project directory now.

然后它继续创建这个文件，我们现在可以在项目目录的根目录中看到它。

So let's open that up over here and see what it looks like. So you can see this file provides guidance to claude code when working with code in this repository.

让我们在这里打开它，看看它是什么样子。你可以看到这个文件为 Claude Code 在这个存储库中处理代码时提供了指导。

So it's got some different development commands that it's found from the package.json thing right here. It's got an architecture overview. So it says what it is briefly. It's a Nex.js15 blog application. You can see the different things we're using inside it. So React 19, Tailwind, V4, uh, Vest, etc.

所以它有一些从 package.json 中找到的不同开发命令。它有一个架构概述。所以它简要说明了它是什么。这是一个 Next.js 15 博客应用程序。你可以看到我们在其中使用的不同东西。所以是 React 19、Tailwind、V4、Vest 等等。

We've got a project structure, which is quite nice. So it knows that when it's creating new files, hopefully where to put those files. Uh, we've got some data architecture right here. So it knows that we're using Higgraph for the content. And down here we've got information about the styling. Um, we've got a testing setup right here and some additional development notes as well.

我们有一个项目结构，这很好。所以它知道在创建新文件时，应该把那些文件放在哪里。嗯，我们这里有一些数据架构。所以它知道我们使用 Hygraph 来管理内容。在这里我们有关于样式的信息。嗯，我们这里有测试设置和一些额外的开发笔记。

So, this is quite comprehensive. It gives Cloud Code now a good guide as to what we're doing. And whenever we make changes, it can use this guide.

所以，这是相当全面的。它为 Claude Code 现在提供了一个很好的指南，了解我们在做什么。每当我们进行更改时，它可以使用这个指南。

---

## [03:00] 手动编辑 Claude.md

Since I'd already started this project before Claude Code got involved, it was able to scan my existing codebase and pick up on a lot of things. So, it could make a detailed Claude file based on the code I've got.

由于在 Claude Code 参与之前我已经启动了这个项目，它能够扫描我现有的代码库并获取很多东西。所以，它可以根据我的代码制作一个详细的 Claude 文件。

But if you're starting with a brand new project with virtually no setup files or code, then it's going to have much less to work with. And the claw.md file is probably not going to have much in it.

但是，如果你从一个几乎没有任何设置文件或代码的全新项目开始，那么它将没有什么可用的。claude.md 文件可能里面没有多少内容。

But in that case, you can manually go into the file and edit it yourself to outline any highlevel project structures you're going to put in place, any tools, packages, or frameworks you're going to be using, your code style preferences, and just basically an overall summary of the application.

但在这种情况下，你可以手动进入文件并自己编辑它，以概述你将建立的高级项目结构、你将使用的任何工具、包或框架、你的代码风格偏好，以及基本上应用程序的总体摘要。

And you can just update it as you go then. And that last bit is important whether you're starting with a new project or an existing one because you should keep this file updated if you change your file structure, any packages you use, or anything else outlined inside this file.

然后你可以随着进度更新它。无论你是从新项目还是现有项目开始，最后这一点都很重要，因为如果更改文件结构、你使用的任何包或此文件中概述的任何其他内容，你应该保持此文件更新。

If you don't, then claude code might not automatically pick up on those changes, and it could go off in a completely different direction when you ask it to do something.

如果你不这样做，Claude Code 可能不会自动获取这些变化，当你要求它做某事时，它可能会走向完全不同的方向。

Anyway, this Claude MD file now gets added to the session context automatically so that Claude can refer to it when it makes changes.

无论如何，这个 Claude.md 文件现在会自动添加到会话上下文中，这样 Claude 在进行更改时可以参考它。

And you'll find that keeping an up-to-date Claude file like this leads to much better code generations.

你会发现保持这样的最新 Claude 文件会带来更好的代码生成。

---

## [04:12] 创建新的 Hook

So then now that we have this file, let's ask Claude code to do something and see if it sticks to the guidance. So what I would like Claude Co to do for us is make a new hook which is going to store the user's theme preference based on whatever theme they have when they toggle that little icon in the top right hand corner.

那么现在我们有了这个文件，让我们让 Claude Code 做些什么，看看它是否遵守指导。我希望 Claude Code 为我们做的是创建一个新的 hook，用于存储用户的首选主题，基于他们在右上角切换那个小图标时的主题。

Now I noticed that inside the clawed file over here, we don't reference a hooks folder. So this would be a good opportunity to just update this file so that Claude code knows where to create hooks.

现在我注意到在这个 claude 文件中，我们没有引用 hooks 文件夹。所以这是一个很好的机会来更新这个文件，让 Claude Code 知道在哪里创建 hooks。

So I'm going to save this inside the project structure bit right here where it says all hooks reusable hooks go inside this hooks folder.

所以我要把它保存在项目结构这里，上面说所有可复用的 hooks 都放在这个 hooks 文件夹中。

So now if I ask Claude code to make a hook hopefully it's going to place inside that folder. All right then.

所以现在如果我让 Claude Code 创建一个 hook，希望它会放在那个文件夹里。好的。

So you can see we don't actually have a hooks folder at the moment but hopefully Claude Code will create that as well.

所以你可以看到我们目前实际上没有 hooks 文件夹，但希望 Claude Code 也会创建它。

I'm going to open up the terminal and then I'm going to ask it to create this new hook. I will say can you create a hook to store the users's theme preference in when they toggle the theme on the site and I will say store the value in local storage for next time and then I'm also going to say don't use the hook anywhere yet because claw code has this habit of if it creates a new feature, hook, component, whatever it might be, it wants to use that hook somewhere in your project.

我要打开终端，然后让它创建这个新 hook。我说你可以创建一个 hook 来存储用户的主题偏好，当他们在网站上切换主题时，我会说把值存储在本地存储中以供下次使用，然后我还说要 yet 不要在任何地方使用这个 hook，因为 Claude Code 有这样的习惯，如果它创建一个新功能、hook、组件，不管是什么，它都想在你的项目中的某个地方使用那个 hook。

So, a lot of the time I add this at the end to make sure it doesn't do that. So, I'm going to press enter.

所以很多时候我在最后添加这个以确保它不会那样做。所以，我要按回车。

The only thing I'm really concerned with at the moment is to test whether claude code looks at that claw.md file and creates the hook in the correct folder.

目前我唯一真正关心的是测试 Claude Code 是否查看那个 claude.md 文件并在正确的文件夹中创建 hook。

---

## [04:55] 查看创建的 Hook

Okay, so it looks like it's come up with some code. And if we take a look at this over here, you can see it wants to place it inside the hooks folder. All right.

好的，看起来它已经生成了一些代码。如果我们在这里看一下，你可以看到它想把它放在 hooks 文件夹里。好的。

So, if we open this up a little bit, this is the hook it's created right here. And again, I'm not going to examine the code too much. I would normally, if this was something I was working on, I would definitely examine the code, but for now, I'm just going to say yes.

所以，如果我们稍微打开一点，这是它在这里创建的 hook。同样，我不会过多检查代码。通常，如果这是我在做的事情，我肯定会检查代码，但现在，我只会说是。

I'm going to accept that change. And you can see it's created the hooks folder and it's created the use theme file within the folder. Awesome.

我要接受这个更改。你可以看到它创建了 hooks 文件夹，并在文件夹中创建了 useTheme 文件。太棒了。

---

## [06:24] 使用 # 符号添加记忆

You can also add a memory to the claw MD file directly from the chat session by using a hash symbol. For example, I could add a hash then say something like when making new page components, always add a link to that page in the header.

你也可以通过使用哈希符号直接从聊天会话向 claude.md 文件添加记忆。例如，我可以添加一个哈希然后说一些类似"在创建新的页面组件时，始终在页眉中添加该页面的链接"的内容。

And you can see down here as I type that it's telling us it's going to memorize what we're telling it because we added that hash. And the long and short of that is that it's going to place this instruction inside the claw.md file for future reference.

你可以看到当我输入时，它告诉我们它会记住我们告诉它的内容，因为我们添加了那个哈希。简而言之，它会将这个指令放在 claude.md 文件中以供将来参考。

So that now whenever it creates a page component, it should hopefully create a header link for it too.

所以现在每当它创建一个页面组件时，它也应该创建一个页眉链接。

Now when we hit enter, we're going to see a few options. We can save it to project memory which is into the claude.md file we just created for this project.

现在当我们按回车时，我们将看到几个选项。我们可以将其保存到项目记忆中，即我们刚刚为此项目创建的 claude.md 文件。

You could save it to local project memory in the same root folder but with the local part added to the file name. And you can also save it to global memory which is to a global claude file stored in the root claude folder on your computer which the installation added for us.

你可以将其保存到同一根文件夹中的本地项目内存，但在文件名中添加了本地部分。你也可以将其保存到全局记忆中，即存储在计算机根目录 claude 文件夹中的全局 claude 文件，安装时为我们添加的。

So project memory is what gets set up when we run the forward/init command to create this claw.nd file in the root of the project.

所以项目记忆是当我们运行 forward/init 命令在项目根目录创建 claude.md 文件时设置的。

And this file is meant to be tracked by version control and pushed to your remote repository so that any other developers working on the project have the same clawed file with the same guidance for clawed code for this project.

这个文件应该由版本控制跟踪并推送到你的远程存储库，以便任何其他在该项目上工作的开发人员都有相同的 claude 文件，为这个项目提供相同的 Claude Code 指导。

And that means any memories or information in this file should be specific to the project. For example, folder structure, naming conventions, tests, frameworks, etc.

这意味着该文件中的任何记忆或信息都应该是特定于项目的。例如，文件夹结构、命名约定、测试、框架等。

The local project memory is a file meant for your own personal guidance and preferences when it comes to working with claude code. So, for example, outlining any kind of personal tooling you might use that isn't necessarily something other developers working on the same project would use.

本地项目记忆是一个文件，用于你个人在使用 Claude Code 时的指导和偏好。例如，概述你可能使用的任何个人工具，不一定是同一项目上的其他开发人员会使用的。

And this file wouldn't be pushed to the remote repository and it would just be local to you inside this project.

这个文件不会推送到远程存储库，它只对你在这个项目中本地可见。

And finally, user memory is your personal guidance to Claude when it comes to all projects you work on. So any tools you use globally across many projects or any personal code style preferences that you have would go in that file.

最后，用户记忆是当你处理所有项目时对 Claude 的个人指导。因此，你在全球许多项目中使用的任何工具或你拥有的任何个人代码风格偏好都会进入该文件。

And again, this would just be for you on your computer, but it would be for every project that Claude Code runs in.

同样，这只是在你电脑上的，但它对 Claude Code 运行的每个项目都适用。

For now, we're just going to add this to the project memory, meaning it should get added to the claude.md file that we already have.

现在，我们只是将其添加到项目记忆中，意味着它应该被添加到我们已有的 claude.md 文件中。

So, if I close this off and open this file up, we should be able to see at the bottom that new memory has been added.

所以，如果我关闭这个并打开这个文件，我们应该能够在底部看到添加了新的记忆。

And you can see right here, when making new page components, always add a link to that page in the header.

你可以在这里看到，在创建新的页面组件时，始终在页眉中添加该页面的链接。

---

## [08:52] 测试记忆功能

So, now we're going to test this out. So, I'm going to open code backup, and I'm going to paste in a prompt, which says, can you add a new about page with only an H2 title and a single line of Lauram as contact uh content rather?

所以，现在我们要测试这个。我要打开代码备份，然后粘贴一个提示，它说，你能添加一个新的 about 页面，只有一个 H2 标题和一行 Lauram Ipsum 作为联系内容吗？

So, press enter. Hopefully, it's going to read that instruction in the claw. MD file as well and create a link for us.

所以，按回车。希望它也会在 claude.md 文件中读取该指令并为我们创建一个链接。

And you can see in its to-dos, it says right here, add about page link to the header navigation. So, it knows about that.

你可以在它的待办事项中看到，它在这里说，将 about 页面链接添加到页眉导航。所以，它知道这一点。

All right. So, I'm just going to accept these changes. Again, normally you should check this, but for the sake of this tutorial, I'm just going to accept this.

好的。所以，我就要接受这些更改。再次，通常你应该检查这个，但为了这个教程，我就要接受这个。

And again, it's asking for permission to edit the file, the layout file this time to add a new link. Again, I'm going to press yes. You can do this.

再次，它请求编辑文件的权限，这次是 layout 文件以添加新链接。再次，我要按是的。你可以这样做。

And then another change to the layout file, which I'm going to accept as well.

然后是 layout 文件的另一个更改，我也要接受。

Okay. And now it's done. So if I close this off, open up app and then we can see this about page and inside there we have an H2 title and just a single line of Lauram Ipsum. Awesome.

好的。现在完成了。所以如果我关闭这个，打开 app，然后我们可以看到这个 about 页面，里面有一个 H2 标题和只是一行 Lauram Ipsum。太棒了。

And then if we go to the layout page which it's edited. Hopefully it's added a link right here. So it's added it to this nav. So it says about right here.

然后如果我们转到它编辑的 layout 页面。希望它在这里添加了一个链接。所以它添加到了这个导航中。所以它在这里说 about。

Now let's try this out in a browser. Okay. So yes, it has done that. You can see the about link here. And if we click on that, we go to the about page.

现在让我们在浏览器中试试这个。好的。是的，它做到了。你可以看到这里的 about 链接。如果我们点击它，我们就会进入 about 页面。

Now you can see also retrospectively it's added these other two links which I didn't ask it to do. And this is one of the things I've noticed about clawed code. Sometimes like I mentioned before it sometimes likes to do things beyond the scope of what you've asked it to do.

现在你也可以看到 retrospectively 它添加了另外两个我没有要求它做的链接。这是我注意到 Claude Code 的事情之一。有时就像我之前提到的，它有时喜欢做超出你要求范围的事情。

So it is important to maybe tell claw code look don't do this just do this. And that could be something you add to your claude.md file.

所以也许告诉 Claude Code "不要这样做，只做这个"是很重要的。这可能是你添加到 claude.md 文件中的东西。

---

## [10:30] 关于本地记忆的说明

Now just really quickly I do want to mention that on the Claude code docs they say that the local memory is being deprecated in favor of importing unttracked files within the project level memory to provide that personal context to Claude.

现在我真的想快速提一下，Claude Code 文档说本地记忆正在被弃用，取而代之的是在项目级记忆 中导入未跟踪的文件，以向 Claude 提供个人上下文。

And I'll show you how to import and reference files later in the course. But at the time of recording this video, the local option still shows in the terminal when you use the memory hashtag shortcut to add new memories.

我会在课程的后面展示如何导入和引用文件。但在录制这个视频时，本地选项仍然在终端中显示，当你使用记忆标签快捷键添加新记忆时。

Another way you can access your memory files is by using the memory command which is just forward slash memory.

另一种访问记忆文件的方式是使用 memory 命令，也就是 forward slash memory。

And by the way, if it isn't already obvious, when I say memory files, I'm just talking about the claw.md files, whether they're project local or global.

顺便说一下，如果还不明显的话，当我说记忆文件时，我只是在谈论 claude.md 文件，无论是项目本地还是全局的。

But anyway, when you use this memory command, claude code's going to ask you which memory file you want to open and edit. So you can select any of these and press enter to open that file up.

但无论如何，当你使用这个 memory 命令时，Claude Code 会问你想打开和编辑哪个记忆文件。所以你可以选择其中任何一个并按回车打开该文件。

For example, if I select the project memory, it's going to open up the claw.md file right here in VS Code so that I can edit it directly myself.

例如，如果我选择项目记忆，它会在 VS Code 中打开 claude.md 文件，这样我就可以直接编辑它。

---

## [11:30] 总结

So then just to summarize, it's always good practice to use the forward/init command when you bring claud code into a project because it gives Claude the chance to learn about the codebase and outline any structural patterns, frameworks, libraries, naming conventions, etc. in a claude file.

所以总结一下，当你将 Claude Code 引入项目时，使用 forward/init 命令总是一个好习惯，因为它让 Claude 有机会了解代码库，并在 claude 文件中概述任何结构模式、框架、库、命名约定等。

That file is then used by Claude as context automatically when it makes decisions about your project in the future and it can be added to your remote repository so that other developers working on the project have access to it as well for their own workflow using clawed code.

该文件随后被 Claude 自动用作上下文，当它对未来关于你的项目做出决策时，并且可以将其添加到你的远程存储库，以便其他在该项目上工作的开发人员也可以使用 Claude Code 为他们自己的工作流程访问它。

Finally, it's not something you should just create and then forget about, but rather keep on top of edit and update when things change within your project. That way, you're always keeping Claude in the loop, and you'll find its work to be much more in line with your project's existing current code and structure.

最后，这不是你只是创建然后忘记的东西，而是当项目中的事情发生变化时，保持更新和编辑。这样，你总是让 Claude 保持循环，你会发现它的工作更符合你项目现有的当前代码和结构。
