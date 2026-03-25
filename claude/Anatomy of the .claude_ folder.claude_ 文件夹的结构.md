---
title: "Anatomy of the .claude/ folder.claude/ 文件夹的结构"
source: "https://x.com/akshay_pachaar/status/2035341800739877091"
author:
  - "[[Akshay 🚀]]"
published: 2026-03-21
created: 2026-03-24
description:
tags:
  - "clippings"
---
**A complete guide to CLAUDE.md, custom commands, skills, agents, and permissions, and how to set them up properly.CLAUDE.md、自定义命令、技能、代理和权限的完整指南，以及如何正确设置它们。**

Most Claude Code users treat the **.claude folder** like a black box. They know it exists. They've seen it appear in their project root. But they've never opened it, let alone understood what every file inside it does.大多数 Claude Code 用户都把 **.claude 文件夹**当作一个黑盒子。他们知道它的存在，也见过它出现在项目根目录下，但他们从未打开过它，更别提了解里面每个文件的作用了。

That's a missed opportunity.那真是错失良机。

**The .claude folder is the control center for how Claude behaves in your project.** It holds your instructions, your custom commands, your permission rules, and even Claude's memory across sessions. Once you understand what lives where and why, you can configure Claude Code to behave exactly the way your team needs it to.**.claude 文件夹是 Claude 在项目中运行的控制中心。** 它存储着您的指令、自定义命令、权限规则，甚至包括 Claude 在不同会话中的记忆。一旦您了解了每个文件的位置及其用途，就可以配置 Claude Code，使其完全按照团队的需求运行。

This guide walks through the entire anatomy of the folder, from the files you'll use daily to the ones you'll set once and forget.本指南将带您了解文件夹的整个结构，从您每天使用的文件到您设置一次即可不再使用的文件。

# Two folders, not one两个文件夹，不是一个。

Before diving in, one thing worth knowing upfront: there are actually two .claude directories, not one.在深入了解之前，有一件事值得事先了解：实际上有两个 .claude 目录，而不是一个。

The first lives inside your project and the second lives in your home directory:第一个文件位于您的项目目录中，第二个文件位于您的主目录中：

![Image](https://pbs.twimg.com/media/HD70c_tbMAAvhzK?format=jpg&name=large)

**The project-level folder holds team configuration.** You commit it to git. Everyone on the team gets the same rules, the same custom commands, the same permission policies.**项目级文件夹存放团队配置。** 您需要将其提交到 Git。团队中的每个人都会获得相同的规则、相同的自定义命令和相同的权限策略。

The global **~/.claude/** folder holds your personal preferences and machine-local state like session history and auto-memory.全局 **~/.claude/** 文件夹保存您的个人偏好和机器本地状态，例如会话历史记录和自动内存。

# CLAUDE.md: Claude's instruction manualCLAUDE.md：克劳德的使用说明书

This is the most important file in the entire system. When you start a Claude Code session, the first thing it reads is **CLAUDE.md**. It loads it straight into the system prompt and keeps it in mind for the entire conversation.这是整个系统中最重要的文件。启动 Claude Code 会话时，它首先读取的就是 **CLAUDE.md** 文件。它会将该文件直接加载到系统提示符中，并在整个会话过程中保持加载状态。

Simply put: **whatever you write in CLAUDE.md, Claude will follow.**简单来说： **你在 CLAUDE.md 中写什么，Claude 都会照做。**

If you tell Claude to always write tests before implementation, it will. If you say "never use console.log for error handling, always use the custom logger module," it will respect that every time.如果你告诉 Claude 永远在实现之前编写测试，它就会照做。如果你说“永远不要用 console.log 处理错误，一定要用自定义的日志模块”，它每次都会遵守你的指示。

A **CLAUDE.md** at your project root is the most common setup. But you can also have one in **~/.claude/CLAUDE.md** for global preferences that apply across all projects, and even one inside subdirectories for folder-specific rules. Claude reads all of them and combines them.在项目根目录下放置一个 **CLAUDE.md 文件**是最常见的设置。但你也可以在 **~/.claude/CLAUDE.md** 中创建一个文件 ，用于设置适用于所有项目的全局偏好，甚至可以在子目录中创建一个文件，用于设置特定文件夹的规则。Claude 会读取所有这些文件并将它们合并。

What actually belongs in CLAUDE.mdCLAUDE.md 中究竟应该包含哪些内容？

Most people either write too much or too little. Here's what works.大多数人要么写得太多，要么写得太少。以下是行之有效的方法。

## Write:写：

- Build, test, and lint commands (npm run test, make build, etc.)构建、测试和代码检查命令（npm run test、make build 等）
- Key architectural decisions ("we use a monorepo with Turborepo")关键架构决策（“我们使用带有 Turborepo 的 monopo”）
- Non-obvious gotchas ("TypeScript strict mode is on, unused variables are errors")不易察觉的陷阱（“TypeScript 严格模式已开启，未使用的变量会报错”）
- Import conventions, naming patterns, error handling styles导入约定、命名模式、错误处理风格
- File and folder structure for the main modules主要模块的文件和文件夹结构

## Don't write:不要写：

- Anything that belongs in a linter or formatter config任何属于代码检查器或格式化器配置的内容
- Full documentation you can already link to您可以提供完整文档的链接。
- Long paragraphs explaining theory用大段文字解释理论

Keep CLAUDE.md under 200 lines. Files longer than that start eating too much context, and Claude's instruction adherence actually drops.CLAUDE.md 文件长度应控制在 200 行以内。文件过长会丢失过多上下文信息，而且 Claude 对指令的执行率实际上会下降。

Here's a minimal but effective example:以下是一个简单但有效的例子：

```plaintext
# Project: Acme API

## Commands
npm run dev          # Start dev server
npm run test         # Run tests (Jest)
npm run lint         # ESLint + Prettier check
npm run build        # Production build

## Architecture
- Express REST API, Node 20
- PostgreSQL via Prisma ORM
- All handlers live in src/handlers/
- Shared types in src/types/

## Conventions
- Use zod for request validation in every handler
- Return shape is always { data, error }
- Never expose stack traces to the client
- Use the logger module, not console.log

## Watch out for
- Tests use a real local DB, not mocks. Run \`npm run db:test:reset\` first
- Strict TypeScript: no unused imports, ever
```

That's ~20 lines. It gives Claude everything it needs to work productively in this codebase without constant clarification.大约 20 行代码。这足以让 Claude 高效地处理这个代码库，无需不断进行解释。

# CLAUDE.local.md for personal overridesCLAUDE.local.md 用于个人自定义设置

Sometimes you have a preference that's specific to you, not the whole team. Maybe you prefer a different test runner, or you want Claude to always open files using a specific pattern.有时你可能有一些个人偏好，而不是整个团队的偏好。例如，你可能更喜欢使用不同的测试运行器，或者你希望 Claude 始终按照特定的模式打开文件。

Create CLAUDE.local.md in your project root. Claude reads it alongside the main CLAUDE.md, and it's automatically gitignored so your personal tweaks never land in the repo.在项目根目录下创建 CLAUDE.local.md 文件。Claude 会将其与主 CLAUDE.md 文件一起读取，并且它会自动被 .gitignore 忽略，因此您的个人修改永远不会出现在代码仓库中。

![Image](https://pbs.twimg.com/media/HD710uUaQAAppSN?format=jpg&name=large)

# The rules/ folder: modular instructions that scalerules/ 文件夹：可扩展的模块化指令

CLAUDE.md works great for a single project. But once your team grows, you end up with a 300-line CLAUDE.md that nobody maintains and everyone ignores.CLAUDE.md 文件对于单个项目来说效果很好。但是一旦团队壮大，最终就会出现一个 300 行的 CLAUDE.md 文件，无人维护，人人都忽略它。

The rules/ folder solves that.rules/文件夹解决了这个问题。

**Every markdown file inside .claude/rules/ gets loaded alongside your CLAUDE.md automatically.** Instead of one giant file, you split instructions by concern:**.claude/rules/ 目录下的所有 Markdown 文件都会与 CLAUDE.md 文件一起自动加载。** 这样一来，指令就不会合并成一个巨大的文件，而是按关注点进行拆分：

```plaintext
.claude/rules/
├── code-style.md
├── testing.md
├── api-conventions.md
└── security.md
```

Each file stays focused and easy to update. The team member who owns API conventions edits api-conventions.md. The person who owns testing standards edits testing.md. Nobody stomps on each other.每个文件都保持简洁明了，易于更新。负责 API 规范的团队成员编辑 api-conventions.md 文件，负责测试标准的团队成员编辑 testing.md 文件。这样一来，就不会有人互相干扰。

The real power comes from **path-scoped rules**. Add a YAML frontmatter block to a rule file and it only activates when Claude is working with matching files:真正的强大之处在于**路径作用域规则** 。在规则文件中添加 YAML frontmatter 块，它只会在 Claude 处理匹配的文件时才激活：

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/handlers/**/*.ts"
---
# API Design Rules

- All handlers return { data, error } shape
- Use zod for request body validation
- Never expose internal error details to clients
```

Claude won't load this file when it's editing a React component. It only loads when it's working inside src/api/ or src/handlers/. Rules without a paths field load unconditionally, every session.Claude 在编辑 React 组件时不会加载此文件。它仅在 src/api/ 或 src/handlers/ 目录下运行时才会加载。没有路径字段的规则会无条件加载，每次会话都会加载。

This is the right pattern once your CLAUDE.md starts feeling crowded.当你的 CLAUDE.md 文件开始显得拥挤时，这就是正确的模式。

# The commands/ folder: your custom slash commandscommands/ 文件夹：您的自定义斜杠命令

Out of the box, Claude Code has built-in slash commands like **/help** and **/compact**. The **commands/** folder lets you add your own.Claude Code 默认内置了一些斜杠命令，例如 **/help** 和 **/compact** 。 您还可以通过 **commands/** 文件夹添加自己的命令。

**Every markdown file you drop into .claude/commands/ becomes a slash command.放入 .claude/commands/ 目录的每个 markdown 文件都会变成一个斜杠命令。**

A file named **review.md** creates **/project:review**. A file named fix-issue.md creates **/project:fix-issue**. The filename is the command name.名为 **review.md 的**文件会创建 **/project:review 项目** 。名为 fix-issue.md 的文件会创建 **/project:fix-issue 项目** 。文件名即为命令名称。

![Image](https://pbs.twimg.com/media/HD72R4zboAEjp6U?format=jpg&name=large)

Here's a simple example. Create **.claude/commands/review.md**:这里有一个简单的例子。创建 **.claude/commands/review.md** 文件 ：

```markdown
---
description: Review the current branch diff for issues before merging
---
## Changes to Review

!\`git diff --name-only main...HEAD\`

## Detailed Diff

!\`git diff main...HEAD\`

Review the above changes for:
1. Code quality issues
2. Security vulnerabilities
3. Missing test coverage
4. Performance concerns

Give specific, actionable feedback per file.
```

Now run **/project:review** in Claude Code and it automatically injects the real git diff into the prompt before Claude sees it. The **!** backtick syntax runs shell commands and embeds the output. That's what makes these commands genuinely useful instead of just saved text.现在在 Claude Code 中运行 **\`/project:review\`** ，它会在 Claude 读取之前自动将真实的 Git 差异注入到提示符中。\` **!\`** 反引号语法会运行 shell 命令并将输出嵌入其中。这使得这些命令真正有用，而不仅仅是保存的文本。

## Passing arguments to commands向命令传递参数

Use [$ARGUMENTS](https://x.com/search?q=%24ARGUMENTS&src=cashtag_click) to pass text after the command name:使用[参数](https://x.com/search?q=%24ARGUMENTS&src=cashtag_click)在命令名称后添加文本：

```markdown
---
description: Investigate and fix a GitHub issue
argument-hint: [issue-number]
---
Look at issue #$ARGUMENTS in this repo.

!\`gh issue view $ARGUMENTS\`

Understand the bug, trace it to the root cause, fix it, and write a
test that would have caught it.
```

Running **/project:fix-issue 234** feeds issue 234's content directly into the prompt.运行 **/project:fix-issue 234** 会将 issue 234 的内容直接输入到提示符中。

## Personal vs. project commands个人指令与项目指令

Project commands in **.claude/commands/** are committed and shared with your team. For commands you want everywhere regardless of project, put them in **~/.claude/commands/**. Those show up as **/user:command-name** instead.项目命令位于 **\`.claude/commands/\` 目录**下 ，这些命令会被提交并与团队共享。如果您希望所有项目都使用相同的命令，请将其放在 **\`~/.claude/commands/\`** 目录下。这些命令将显示为 **\`/user:command-name\` 的**形式。

A useful personal command: a daily standup helper, a command for generating commit messages following your convention, or a quick security scan.一个实用的个人命令：每日站会助手、按照你的约定生成提交信息的命令，或者快速安全扫描。

# The skills/ folder: reusable workflows on demand技能/文件夹：按需可重用的工作流程

You now know how commands work. Skills look similar on the surface, but the trigger is fundamentally different. Here's the distinction before we go any further:现在你已经了解了命令的工作原理。技能表面上看起来很相似，但触发机制却截然不同。在我们继续深入探讨之前，先来了解一下它们的区别：

![Image](https://pbs.twimg.com/media/HD73p9-bEAAZUSD?format=jpg&name=large)

**Skills are workflows that Claude can invoke on its own**, without you typing a slash command, when the task matches the skill's description. Commands wait for you. Skills watch the conversation and act when the moment is right.**技能是 Claude 可以自动调用的工作流程** ，无需您输入斜杠命令，只要任务与技能描述匹配即可。命令会等待您输入，而技能则会监控对话并在合适的时机采取行动。

Each skill lives in its own subdirectory with a SKILL.md file:每个技能都位于其自身的子目录中，并包含一个 SKILL.md 文件：

```markdown
.claude/skills/
├── security-review/
│   ├── SKILL.md
│   └── DETAILED_GUIDE.md
└── deploy/
    ├── SKILL.md
    └── templates/
        └── release-notes.md
```

The SKILL.md uses YAML frontmatter to describe when to use it:SKILL.md 使用 YAML frontmatter 来描述何时使用该功能：

```markdown
---
name: security-review
description: Comprehensive security audit. Use when reviewing code for
  vulnerabilities, before deployments, or when the user mentions security.
allowed-tools: Read, Grep, Glob
---
Analyze the codebase for security vulnerabilities:

1. SQL injection and XSS risks
2. Exposed credentials or secrets
3. Insecure configurations
4. Authentication and authorization gaps

Report findings with severity ratings and specific remediation steps.
Reference @DETAILED_GUIDE.md for our security standards.
```

When you say "review this PR for security issues," Claude reads the description, recognizes it matches, and invokes the skill automatically. You can also call it explicitly with **/security-review**.当你说“检查此 PR 是否存在安全问题”时，Claude 会读取描述，识别出匹配项，并自动调用该技能。你也可以使用 **/security-review** 显式调用它 。

**The key difference from commands:** skills can bundle supporting files alongside them. The [@DETAILED\_GUIDE](https://x.com/@DETAILED_GUIDE).md reference above pulls in a detailed document that lives right next to SKILL.md. Commands are single files. Skills are packages.**与命令的主要区别**在于：技能可以捆绑支持文件。 [@详细指南](https://x.com/@DETAILED_GUIDE)上面的 .md 引用会加载一个详细的文档，该文档与 SKILL.md 位于同一目录下。命令是单独的文件，技能是软件包。

Personal skills go in **~/.claude/skills/** and are available across all your projects.个人技能位于 **~/.claude/skills/** 目录下 ，可在所有项目中使用。

# The agents/ folder: specialized subagent personas代理人/文件夹：专门的子代理人角色

When a task is complex enough to benefit from a dedicated specialist, you can define a subagent persona in .claude/agents/. Each agent is a markdown file with its own system prompt, tool access, and model preference:当任务复杂到需要专职人员协助时，您可以在 .claude/agents/ 目录中定义子代理角色。每个代理都是一个 Markdown 文件，拥有自己的系统提示符、工具访问权限和模型偏好：

```plaintext
.claude/agents/
├── code-reviewer.md
└── security-auditor.md
```

Here's what a code-reviewer.md looks like:以下是 code-reviewer.md 的示例：

```markdown
---
name: code-reviewer
description: Expert code reviewer. Use PROACTIVELY when reviewing PRs,
  checking for bugs, or validating implementations before merging.
model: sonnet
tools: Read, Grep, Glob
---
You are a senior code reviewer with a focus on correctness and maintainability.

When reviewing code:
- Flag bugs, not just style issues
- Suggest specific fixes, not vague improvements
- Check for edge cases and error handling gaps
- Note performance concerns only when they matter at scale
```

When Claude needs a code review done, it spawns this agent in its own isolated context window. The agent does its work, compresses the findings, and reports back. Your main session doesn't get cluttered with thousands of tokens of intermediate exploration.当 Claude 需要进行代码审查时，它会在独立的上下文窗口中启动这个代理。代理执行代码审查工作，压缩审查结果，然后返回报告。这样，你的主会话就不会被成千上万个中间探索的令牌所淹没。

The tools field restricts what the agent can do. A security auditor only needs Read, Grep, and Glob. It has no business writing files. That restriction is intentional and worth being explicit about.工具字段限制了代理可以执行的操作。安全审计员只需要读取、Grep 和 Glob 功能，它无需写入文件。这种限制是有意为之，值得明确说明。

The model field lets you use a cheaper, faster model for focused tasks. Haiku handles most read-only exploration well. Save Sonnet and Opus for the work that actually needs them.模型字段允许您使用更经济、更快速的模型来处理特定任务。Haiku 可以很好地处理大多数只读探索。Sonnet 和 Opus 则留给真正需要它们的工作。

Personal agents go in **~/.claude/agents/** and are available across all projects.个人代理位于 **~/.claude/agents/** 目录下 ，可在所有项目中使用。

![Image](https://pbs.twimg.com/media/HD76U4QbAAAt7X5?format=jpg&name=large)

# settings.json: permissions and project configsettings.json：权限和项目配置

The **settings.json** file inside **.claude/** controls what Claude is and isn't allowed to do. It's where you define which tools Claude can run, which files it can read, and whether it needs to ask before running certain commands.位于 **.claude/** 目录下的 **settings.json** 文件控制着 Claude 的权限。您可以在此文件中定义 Claude 可以运行哪些工具、可以读取哪些文件，以及在执行某些命令之前是否需要询问。

The complete file looks like this:完整文件如下所示：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Read",
      "Write",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

## Here's what each part does.以下是各部分的功能。

**The** [$schema](https://x.com/search?q=%24schema&src=cashtag_click) **line** enables autocomplete and inline validation in VS Code or Cursor. Always include it.**这** [$schema](https://x.com/search?q=%24schema&src=cashtag_click) **这行代码**可以在 VS Code 或 Cursor 中启用自动完成和内联验证。务必包含它。

**The allow list** contains commands that run without Claude asking for confirmation. For most projects, a good allow list covers:**允许列表**包含无需 Claude 确认即可运行的命令。对于大多数项目而言，一个好的允许列表应涵盖以下内容：

- Bash(npm run \*) or Bash(make \*) so Claude can run your scripts freely使用 Bash(npm run \*) 或 Bash(make \*) 命令，这样 Claude 就可以自由运行你的脚本了。
- Bash(git \*) for read-only git commands使用 Bash(git \*) 执行只读 git 命令
- Read, Write, Edit, Glob, Grep for file operations文件操作的读取、写入、编辑、Glob、Grep 命令

**The deny list** contains commands that are blocked entirely, no matter what. A sensible deny list blocks:**禁止列表**包含无论如何都会被完全阻止的命令。一个合理的禁止列表会阻止：

- Destructive shell commands like rm -rf类似 rm -rf 这样的破坏性 shell 命令
- Direct network commands like curl直接网络命令，例如 curl
- Sensitive files like .env and anything in secrets/敏感文件，例如 .env 文件以及 secrets/ 目录下的任何内容。

**If something isn't in either list, Claude asks before proceeding.** That middle ground is intentional. It gives you a safety net without having to anticipate every possible command upfront.**如果某项内容不在两个列表中，克劳德会在继续操作前询问。** 这种折衷方案是有意为之。它既能提供安全保障，又无需预先预判所有可能的指令。

## settings.local.json for personal overridessettings.local.json 用于自定义设置

Same idea as **CLAUDE.local.md**. Create **.claude/settings.local.json** for permission changes you don't want committed. It's auto-gitignored.与 **CLAUDE.local.md** 的思路相同 。创建 **.claude/settings.local.json 文件** ，用于存放您不想提交的权限更改。它会自动被 .gitignore 忽略。

# The global ~/.claude/ folder全局 ~/.claude/ 文件夹

You don't interact with this folder often, but it's useful to know what's in it.虽然你不经常会用到这个文件夹，但了解它里面有什么内容还是很有用的。

**~/.claude/CLAUDE.md** loads into every Claude Code session, across all your projects. Good place for your personal coding principles, preferred style, or anything you want Claude to remember regardless of which repo you're in.**~/.claude/CLAUDE.md** 文件会在每次 Claude Code 会话中加载，适用于所有项目。这里可以存放你的个人编码原则、偏好风格，或者任何你想让 Claude 记住的内容，无论你当前在哪个代码库中。

**~/.claude/projects/** stores session transcripts and auto-memory per project. Claude Code automatically saves notes to itself as it works: commands it discovers, patterns it observes, architecture insights. These persist across sessions. You can browse and edit them with /memory.**~/.claude/projects/** 目录存储每个项目的会话记录和自动记忆信息。Claude Code 会在运行过程中自动保存笔记：它发现的命令、观察到的模式以及架构见解。这些笔记会在会话之间保留。您可以使用 /memory 命令浏览和编辑它们。

**~/.claude/commands/** and **~/.claude/skills/** hold personal commands and skills available across all projects.**~/.claude/commands/** 和 **~/.claude/skills/** 包含所有项目中可用的个人命令和技能。

You generally don't need to manually manage these. But knowing they exist is handy when Claude seems to "remember" something you never told it, or when you want to wipe a project's auto-memory and start fresh.通常情况下，你不需要手动管理这些设置。但是，了解它们的存在会很有帮助，比如当 Claude 似乎“记住”了你从未告诉过它的事情，或者当你想要清除项目的自动记忆并重新开始时。

## The full picture完整画面

Here's how everything comes together:以下是所有环节如何衔接起来的：

```plaintext
your-project/
├── CLAUDE.md                  # Team instructions (committed)
├── CLAUDE.local.md            # Your personal overrides (gitignored)
│
└── .claude/
    ├── settings.json          # Permissions + config (committed)
    ├── settings.local.json    # Personal permission overrides (gitignored)
    │
    ├── commands/              # Custom slash commands
    │   ├── review.md          # → /project:review
    │   ├── fix-issue.md       # → /project:fix-issue
    │   └── deploy.md          # → /project:deploy
    │
    ├── rules/                 # Modular instruction files
    │   ├── code-style.md
    │   ├── testing.md
    │   └── api-conventions.md
    │
    ├── skills/                # Auto-invoked workflows
    │   ├── security-review/
    │   │   └── SKILL.md
    │   └── deploy/
    │       └── SKILL.md
    │
    └── agents/                # Specialized subagent personas
        ├── code-reviewer.md
        └── security-auditor.md

~/.claude/
├── CLAUDE.md                  # Your global instructions
├── settings.json              # Your global settings
├── commands/                  # Your personal commands (all projects)
├── skills/                    # Your personal skills (all projects)
├── agents/                    # Your personal agents (all projects)
└── projects/                  # Session history + auto-memory
```

# A practical setup to get started一个实用的入门方案

If you're starting from scratch, here's a progression that works well.如果你是从零开始，这里有一个行之有效的进阶方法。

**Step 1.** Run /init inside Claude Code. It generates a starter CLAUDE.md by reading your project. Edit it down to the essentials.**步骤 1.** 在 Claude Code 中运行 /init 命令。它会读取你的项目并生成一个初始的 CLAUDE.md 文件。将其精简到只保留必要内容。

**Step 2.** Add .claude/settings.json with allow/deny rules appropriate for your stack. At minimum, allow your run commands and deny .env reads.**步骤 2.** 添加 .claude/settings.json 文件，并根据您的技术栈配置相应的允许/拒绝规则。至少应允许运行命令，并拒绝读取 .env 文件。

**Step 3.** Create one or two commands for the workflows you do most. Code review and issue fixing are good starting points.**步骤 3.** 为最常用的工作流程创建一到两个命令。代码审查和问题修复是很好的切入点。

**Step 4.** As your project grows and your CLAUDE.md gets crowded, start splitting instructions into .claude/rules/ files. Scope them by path where it makes sense.**第四步：** 随着项目的增长和 CLAUDE.md 文件内容的增多，开始将指令拆分到 .claude/rules/ 文件中。在适当的情况下，按路径限定其作用范围。

**Step 5.** Add a ~/.claude/CLAUDE.md with your personal preferences. This might be something like "always write types before implementations" or "prefer functional patterns over class-based."**步骤 5.** 添加一个 ~/.claude/CLAUDE.md 文件，其中包含您的个人偏好。例如，“始终在实现之前编写类型”或“优先选择函数式模式而不是基于类的模式”。

That's genuinely all you need for 95% of projects. Skills and agents come in when you have recurring complex workflows worth packaging up.对于95%的项目来说，这确实就足够了。只有当涉及到值得打包的、重复性的复杂工作流程时，才需要用到技能和代理。

## The key insight关键见解

The **.claude folder** is really a protocol for telling Claude who you are, what your project does, and what rules it should follow. The more clearly you define that, the less time you spend correcting Claude and the more time it spends doing useful work.**.claude 文件夹**实际上是一个协议，用于告诉 Claude 你是谁、你的项目是做什么的，以及它应该遵循哪些规则。你定义得越清晰，就越少花时间去纠正 Claude，而它就能把更多的时间用于执行有用的工作。

**CLAUDE.md is your highest-leverage file.** Get that right first. Everything else is optimization.**CLAUDE.md 是你最重要的文件。** 务必先确保它正确无误。其他一切都是优化。

Start small, refine as you go, and treat it like any other piece of infrastructure in your project: something that pays dividends every day once it's set up properly.从小处着手，逐步完善，并像对待项目中的其他基础设施一样对待它：一旦设置妥当，它每天都会带来收益。

That's a wrap!拍摄结束！

If you enjoyed reading this.如果你喜欢这篇文章。

Find me → [@akshay\_pachaar](https://x.com/@akshay_pachaar) ✔️找到我 → [@akshay\_pachaar](https://x.com/@akshay_pachaar) ✔️

Every day, I share tutorials and insights on AI, Machine Learning and vibe coding best practices.我每天都会分享关于人工智能、机器学习和 Vibe 编程最佳实践的教程和见解。