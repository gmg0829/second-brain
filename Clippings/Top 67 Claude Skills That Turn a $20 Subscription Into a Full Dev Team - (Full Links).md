---
title: "Top 67 Claude Skills That Turn a $20 Subscription Into a Full Dev Team - (Full Links)67 项 Claude 技能，助您将 20 美元的订阅变成一支完整的开发团队——（完整链接）"
source: "https://x.com/polydao/status/2044317956893471081"
author:
  - "[[@polydao]]"
published: 2026-04-15
created: 2026-04-16
description: "Most people use Claude like a $20 autocomplete大多数人把 Claude 当作​​一个价值 20 美元的自动补全工具来用。They type. They get an answer. They move on> They have ..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HF6WmyBXkAErpHd?format=jpg&name=large)

> Most people use Claude like a $20 autocomplete大多数人把 Claude 当作​​一个价值 20 美元的自动补全工具来用。

They type. They get an answer. They move on > They have no idea Claude can run an entire dev team - architect, reviewer, debugger, docs writer - all at once他们打字。他们得到答案。他们继续。 他们根本不知道克劳德可以同时管理整个开发团队——架构师、代码审查员、调试员、文档撰写员——所有角色都能胜任。

**They just don't know skills exist他们根本不知道技能的存在。**

\> The difference? **Skills.**区别在哪？ **在于技能。**

**67 of them. With full install commands. Sorted by use case.其中 67 个。包含完整的安装命令。按使用场景排序。**

## What Claude skills actually are克劳德的技能究竟是什么？

**A skill is a folder with a** **SKILL.md** **file that tells Claude exactly how to do a specific type of work:** step-by-step process, constraints, examples, and any helper scripts or templates**技能文件夹包含一个** **SKILL.md** **文件，该文件详细说明了 Claude 如何完成特定类型的工作：** 包括分步流程、限制条件、示例以及任何辅助脚本或模板。

Instead of re-explaining your process every session, you install that process once as a skill and reuse it forever与其每次都重新解释你的流程，不如将流程一次性培养成一项技能，然后永久重复使用。

![Image](https://pbs.twimg.com/media/HF6kCqTaoAA0L3f?format=png&name=large)

**Install commands use this format:安装命令使用以下格式：**

```text
npx skills@latest add mattpocock/skills/[skill-name]
```

**Key repos:关键存储库：**

- Official Anthropic skills: [github.com/anthropics/skills](https://github.com/anthropics/skills)官方人类技能： [github.com/anthropics/skills](https://github.com/anthropics/skills)
- Matt Pocock personal skills (15k stars): [github.com/mattpocock/skills](https://github.com/mattpocock/skills)Matt Pocock 的个人技能（15k 星）： [github.com/mattpocock/skills](https://github.com/mattpocock/skills)
- Community marketplace (66k+ skills): [skillsmp.com](https://skillsmp.com/)社区市场（66000+ 技能）： [skillsmp.com](https://skillsmp.com/)

# Meta skills - managing your AI workspace元技能 - 管理您的 AI 工作区

These skills help you build, test, and organize every other skill这些技能有助于你构建、测试和组织其他所有技能。

![Image](https://pbs.twimg.com/media/HF6jbvTWUAAjLdf?format=jpg&name=large)

## Skill Creator技能创建者

- **What it does:** Benchmarks Claude on your task, then helps you draft and iterate new skills based on real runs.**它的功能：** 对 Claude 进行任务基准测试，然后根据实际运行情况帮助你制定和迭代新技能。
- **Use it when:** You want to turn a messy workflow into one clean SKILL.md.**适用场景：当**您想要将混乱的工作流程简化为一个清晰的 SKILL.md 文件时。
- **Link:** [github.com/anthropics/skills/tree/main/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)**关联：** [github.com/anthropics/skills/tree/main/skills/skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)

**How to use:使用方法：**

1. Describe your workflow in bullet points请用要点描述您的工作流程
2. Ask Skill Creator to propose a first SKILL.md请技能创建者提出第一个 SKILL.md 文件。
3. Run 3-5 test prompts, inspect failures, and let it refine the instructions运行 3-5 次测试提示，检查失败原因，并让程序改进指令。

## Write a Skill写一项技能

- **What it does:** Guides Claude to write new skills with proper structure, progressive disclosure, and bundled resources**其功能：** 指导克劳德以正确的结构、循序渐进的方式阐述新技能，并提供相应的资源。
- This is the right way to create skills that don't break over time这是培养不会随着时间推移而失效的技能的正确方法。
- **Link:** [github.com/mattpocock/skills/tree/main/write-a-skill](https://github.com/mattpocock/skills/tree/main/write-a-skill)**关联：** [github.com/mattpocock/skills/tree/main/write-a-skill](https://github.com/mattpocock/skills/tree/main/write-a-skill)
- **Install:安装：**

```text
npx skills@latest add mattpocock/skills/write-a-skill
```

Use it when Skill Creator gives you a raw draft and you need to clean up the structure当技能生成器给你一个原始草稿，而你需要清理结构时，可以使用它。

## Find Skills寻找技能

- **What it does:** Searches public marketplaces like SkillsMP for skills that match your use case.**它的功能：** 在 SkillsMP 等公共市场中搜索符合您使用场景的技能。
- **Example marketplace:** [skillsmp.com](https://skillsmp.com/)**示例市场：** [skillsmp.com](https://skillsmp.com/)

> **Tip:** Treat "finding skills" like package management. Before you write a new skill, search for existing ones and fork them**提示：** 像管理软件包一样管理“查找技能”。在编写新技能之前，先搜索已有的技能并进行分支。

# Planning and design skills规划和设计技能

![Image](https://pbs.twimg.com/media/HF6c4ouXsAAICgG?format=jpg&name=large)

These skills stop you from building the wrong thing.这些技能可以防止你造出错误的东西。

## Grill Me烤肉

- **Purpose:** Forces Claude to ask relentless clarifying questions about your feature, one question at a time, until every branch of the decision tree is resolved.**目的：** 迫使 Claude 不断地提出关于你的功能的澄清问题，一次一个问题，直到决策树的每个分支都得到解决。
- **Use it for:** New features, refactors, risky migrations.**适用于：** 新功能、重构、高风险迁移。
- **Install:** npx skills@latest add mattpocock/skills/grill-me**安装：** npx skills@latest 添加 mattpocock/skills/grill-me
- **Link:** [github.com/mattpocock/skills/tree/main/grill-me](https://github.com/mattpocock/skills/tree/main/grill-me)**关联：** [github.com/mattpocock/skills/tree/main/grill-me](https://github.com/mattpocock/skills/tree/main/grill-me)

You will get questions about data models, edge cases, failure modes, existing systems. Answer patiently once instead of firefighting later你会遇到关于数据模型、边界情况、故障模式和现有系统的问题。请耐心一次性解答，而不是之后疲于奔命地救火。

## Write a PRD编写产品需求文档 (PRD)

- **Purpose:** Creates a PRD through an interactive interview, codebase exploration, and module design. Files it as a GitHub issue.**目的：** 通过互动式访谈、代码库探索和模块设计创建产品需求文档 (PRD)，并将其作为 GitHub 问题提交。
- **Install:** npx skills@latest add mattpocock/skills/write-a-prd**安装：** npx skills@latest 添加 mattpocock/skills/write-a-prd
- **Link:** [github.com/mattpocock/skills/tree/main/write-a-prd](https://github.com/mattpocock/skills/tree/main/write-a-prd)**关联：** [github.com/mattpocock/skills/tree/main/write-a-prd](https://github.com/mattpocock/skills/tree/main/write-a-prd)

**Ask it to:请它问：**

- Capture goals, non-goals, user stories记录目标、非目标和用户故事
- Enumerate success metrics and constraints列举成功指标和限制条件
- Link to existing systems you'll touch链接到您将接触到的现有系统

## PRD to PlanPRD 计划

- **Purpose:** Turns a PRD into a multi-phase implementation plan using tracer-bullet vertical slices. This is not just task breakdown - it gives you the sequence that actually reduces integration risk.**目的：** 利用追踪弹道垂直切片，将产品需求文档 (PRD) 转化为多阶段实施计划。这不仅仅是任务分解，它还能提供真正降低集成风险的实施顺序。
- **Install:** npx skills@latest add mattpocock/skills/prd-to-plan**安装：** npx skills@latest 添加 mattpocock/skills/prd-to-plan
- **Link:** [github.com/mattpocock/skills/tree/main/prd-to-plan](https://github.com/mattpocock/skills/tree/main/prd-to-plan)**关联：** [github.com/mattpocock/skills/tree/main/prd-to-plan](https://github.com/mattpocock/skills/tree/main/prd-to-plan)

The difference from PRD to Issues: a plan is ordered and staged, issues are independent. Use both产品需求文档 (PRD) 与问题清单的区别在于：计划是按顺序和阶段划分的，而问题是独立的。两者都需要使用。

## PRD to IssuesPRD 到问题

- Purpose: Breaks a PRD into independently-grabbable GitHub issues with vertical slices and blocking relationships.目的：将 PRD 分解为可独立获取的 GitHub 问题，并进行垂直切片和阻塞关系划分。
- Install: npx skills@latest add mattpocock/skills/prd-to-issues安装： npx skills@latest add mattpocock/skills/prd-to-issues
- Link: [github.com/mattpocock/skills/tree/main/prd-to-issues](https://github.com/mattpocock/skills/tree/main/prd-to-issues)关联： [github.com/mattpocock/skills/tree/main/prd-to-issues](https://github.com/mattpocock/skills/tree/main/prd-to-issues)

**Tell it:告诉它：**

- "Use PRD to Issues on the PRD above. Output GitHub issues grouped by epic with blockers stated explicitly"“使用上述 PRD 生成 Issues。输出 GitHub Issues，并按 Epic 分组，同时明确列出阻塞原因。”

## Design an Interface设计界面

- Purpose: Generates multiple radically different interface designs for a module using parallel sub-agents.目的：使用并行子代理为模块生成多个截然不同的界面设计。
- Install: npx skills@latest add mattpocock/skills/design-an-interface安装： npx skills@latest add mattpocock/skills/design-an-interface
- Link: [github.com/mattpocock/skills/tree/main/design-an-interface](https://github.com/mattpocock/skills/tree/main/design-an-interface)关联： [github.com/mattpocock/skills/tree/main/design-an-interface](https://github.com/mattpocock/skills/tree/main/design-an-interface)

Not just one design - you get 3-5 competing options with different tradeoffs. Pick the one that makes sense for your constraints不止一种设计方案——您有 3-5 种相互竞争的选择，每种方案各有优缺点。选择最符合您限制条件的方案。

## Request Refactor Plan请求重构计划

- Purpose: Creates a detailed refactor plan with tiny commits via user interview, then files it as a GitHub issue.目的：通过用户访谈创建包含少量提交的详细重构计划，然后将其作为 GitHub 问题提交。
- Install: npx skills@latest add mattpocock/skills/request-refactor-plan安装： npx skills@latest add mattpocock/skills/request-refactor-plan
- Link: [github.com/mattpocock/skills/tree/main/request-refactor-plan](https://github.com/mattpocock/skills/tree/main/request-refactor-plan)关联： [github.com/mattpocock/skills/tree/main/request-refactor-plan](https://github.com/mattpocock/skills/tree/main/request-refactor-plan)

# Code development skills代码开发技能

![Image](https://pbs.twimg.com/media/HF6dVPnaEAAF9tu?format=jpg&name=large)

These skills turn Claude into a disciplined engineering partner, not a code autocomplete toy.这些技能使克劳德成为一名严谨的工程合作伙伴，而不是一个代码自动补全的玩具。

## TDD测试驱动开发

- Purpose: Forces a strict test-first, red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.目的：强制执行严格的测试优先、红-绿-重构循环。每次只构建一个垂直切片的功能或修复一个垂直切片的错误。
- Install: npx skills@latest add mattpocock/skills/tdd安装： npx skills@latest add mattpocock/skills/tdd
- Link: [github.com/mattpocock/skills/tree/main/tdd](https://github.com/mattpocock/skills/tree/main/tdd)关联： [github.com/mattpocock/skills/tree/main/tdd](https://github.com/mattpocock/skills/tree/main/tdd)

**You get:您将获得：**

- Failing tests first首先测试失败
- Then minimal code to pass them然后编写最少的代码来传递它们
- Then a refactor pass, still under tests然后是一次重构，仍在测试中

## Triage Issue分诊问题

- Purpose: Investigates a bug by exploring the codebase, identifies the root cause, and files a GitHub issue with a TDD-based fix plan.目的：通过探索代码库来调查错误，确定根本原因，并在 GitHub 上提交一个基于 TDD 的修复计划。
- Install: npx skills@latest add mattpocock/skills/triage-issue安装： npx skills@latest add mattpocock/skills/triage-issue
- Link: [github.com/mattpocock/skills/tree/main/triage-issue](https://github.com/mattpocock/skills/tree/main/triage-issue)关联： [github.com/mattpocock/skills/tree/main/triage-issue](https://github.com/mattpocock/skills/tree/main/triage-issue)

This is the "I have no idea why this is broken" skill. It does the detective work first, then gives you a structured plan to fix it properly这是“我不知道为什么会坏”的技能。它首先会进行故障排查，然后为你提供一个结构化的修复方案。

## QA质量保证

- Purpose: Runs a full QA pass over a feature with issue breakdown that includes blocking relationships.目的：对某个功能进行完整的质量保证测试，并分析问题，包括阻塞关系。
- Install: npx skills@latest add mattpocock/skills/qa安装： npx skills@latest add mattpocock/skills/qa
- Link: [github.com/mattpocock/skills/tree/main/qa](https://github.com/mattpocock/skills/tree/main/qa)关联： [github.com/mattpocock/skills/tree/main/qa](https://github.com/mattpocock/skills/tree/main/qa)

**Use it before every PR:每次提交 PR 之前都要使用它：**

- Surface all edge cases表面所有边缘情况
- Get issues filed and ordered by what blocks what按阻塞原因归档并排序问题
- Ship without regressions无倒退的船舶

## Improve Codebase Architecture改进代码库架构

- Purpose: Explores a codebase for architectural improvement opportunities, focusing on deepening shallow modules and improving testability.目的：探索代码库的架构改进机会，重点是深化浅层模块和提高可测试性。
- Install: npx skills@latest add mattpocock/skills/improve-codebase-architecture安装： npx skills@latest add mattpocock/skills/improve-codebase-architecture
- Link: [github.com/mattpocock/skills/tree/main/improve-codebase-architecture](https://github.com/mattpocock/skills/tree/main/improve-codebase-architecture)关联： [github.com/mattpocock/skills/tree/main/improve-codebase-architecture](https://github.com/mattpocock/skills/tree/main/improve-codebase-architecture)

**Ask it to:请它问：**

- Identify hotspots识别热点
- Propose 2-3 refactor strategies提出 2-3 个重构策略
- Detail risk, effort, and impact for each详细说明每项风险、工作量和影响。

## Migrate to Shoehorn迁徙到鞋拔子

- Purpose: Migrates test files from as type assertions to [@total](https://x.com/@total)\-typescript/shoehorn - Matt Pocock's own TypeScript library目的：将测试文件从断言类型迁移到 [@全部的](https://x.com/@total) \-typescript/shoehorn - Matt Pocock 自己的 TypeScript 库
- Install: npx skills@latest add mattpocock/skills/migrate-to-shoehorn安装： npx skills@latest add mattpocock/skills/migrate-to-shoehorn
- Link: [github.com/mattpocock/skills/tree/main/migrate-to-shoehorn](https://github.com/mattpocock/skills/tree/main/migrate-to-shoehorn)关联： [github.com/mattpocock/skills/tree/main/migrate-to-shoehorn](https://github.com/mattpocock/skills/tree/main/migrate-to-shoehorn)

This is niche but extremely useful if you work in TypeScript and want type-safe test code. It's also a great template for writing migration skills for your own tools虽然比较小众，但如果你使用 TypeScript 并希望编写类型安全的测试代码，这将非常有用。它也是编写自定义工具迁移技能的绝佳模板。

## Scaffold Exercises脚手架练习

- Purpose: Creates exercise directory structures with sections, problems, solutions, and explainers.目的：创建包含章节、问题、答案和解释的练习目录结构。
- Install: npx skills@latest add mattpocock/skills/scaffold-exercises安装： npx skills@latest add mattpocock/skills/scaffold-exercises
- Link: [github.com/mattpocock/skills/tree/main/scaffold-exercises](https://github.com/mattpocock/skills/tree/main/scaffold-exercises)关联： [github.com/mattpocock/skills/tree/main/scaffold-exercises](https://github.com/mattpocock/skills/tree/main/scaffold-exercises)

**Perfect for:非常适合：**

- Building course content构建课程内容
- Creating onboarding materials for your team为您的团队创建入职材料
- Documenting complex systems as interactive exercises将复杂系统记录为交互式练习

## Auto-Commit Messages自动提交消息

- **Purpose:** Reads your staged diff and generates a conventional commit message with type, scope, and body**用途：** 读取暂存的差异并生成包含类型、范围和正文的规范提交消息。
- **Use it when:** You're tired of writing "fix stuff" at 2am**适用场景：** 凌晨两点厌倦了写“修复问题”的时候
- **Install:** npx skills@latest add anthropics/skills/auto-commit**安装：** npx skills@latest add anthropics/skills/auto-commit
- **Link:** [github.com/anthropics/skills/tree/main/skills/auto-commit](https://github.com/anthropics/skills/tree/main/skills/auto-commit)**关联：** [github.com/anthropics/skills/tree/main/skills/auto-commit](https://github.com/anthropics/skills/tree/main/skills/auto-commit)

## Code Review代码审查

- Purpose: Gives you a systematic review for security, performance, error handling, and architecture.目的：对安全性、性能、错误处理和架构进行系统性审查。
- Link: [github.com/anthropics/skills](https://github.com/anthropics/skills) (search Code Review)关联： [github.com/anthropics/skills](https://github.com/anthropics/skills) （搜索代码审查）

**You can ask for:您可以要求：**

- "Security-first review"“安全第一审查”
- "Performance-first review"“绩效优先评估”
- Or a full checklist pass或者通过全部检查清单

![Image](https://pbs.twimg.com/media/HF6dvytasAE6mnh?format=jpg&name=large)

## Systematic Debugging系统调试

- Origin: From the Superpowers repo来源：来自 Superpowers 仓库
- Purpose: A 4-phase debugging methodology that forbids random "just try changing stuff" edits.目的：一种 4 阶段调试方法，禁止随意进行“随便修改”的编辑。
- Link: [github.com/obra/superpowers/tree/main/skills/systematic-debugging](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging)关联： [github.com/obra/superpowers/tree/main/skills/systematic-debugging](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging)

**Typical flow:典型流程：**

1. Reproduce and create the smallest failing test复现问题并创建最小的失败测试用例
2. Narrow the root cause缩小根本原因的范围
3. Apply a single fix只需一次修复即可
4. Verify with tests and logs通过测试和日志进行验证

## Brainstorming头脑风暴

- Purpose: Turns raw feature ideas into detailed flows and architectures using Socratic questioning目的：运用苏格拉底式提问法，将初步的功能构想转化为详细的流程图和架构。
- Use it pre-implementation: data shape design, API surface, failure and rollback story在实施前使用它：数据结构设计、API 接口、故障和回滚方案
- Link: [github.com/obra/superpowers/tree/main/skills/brainstorming](https://github.com/obra/superpowers/tree/main/skills/brainstorming)关联： [github.com/obra/superpowers/tree/main/skills/brainstorming](https://github.com/obra/superpowers/tree/main/skills/brainstorming)

## Change Log Generator变更日志生成器

- Purpose: Reads your commits and produces human-readable or developer-focused change logs用途：读取您的提交记录并生成易于人类阅读或面向开发人员的变更日志。
- Use it for: Releases, internal updates, investor summaries用途：新闻稿、内部更新、投资者摘要
- Link: [github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator](https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator)关联： [github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator](https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator)

## Simplification Cascade简化级联

- Purpose: Identifies convoluted logic and rewrites it into smaller, composable pieces目的：识别复杂的逻辑并将其重写为更小、更可组合的片段。
- Best for: Legacy "god functions" that nobody wants to touch最适合：无人愿意触碰的遗留“上帝函数”。
- Link: [mcpmarket.com/tools/skills/simplification-cascades-1](https://mcpmarket.com/tools/skills/simplification-cascades-1)关联： [mcpmarket.com/tools/skills/simplification-cascades-1](https://mcpmarket.com/tools/skills/simplification-cascades-1)

## Superpowers超级大国

- What it is: A full suite of battle-tested skills for TDD, debugging, refactoring, and execution它是什么：一套完整的、经过实战检验的 TDD、调试、重构和执行技能。
- Link: [github.com/obra/superpowers](https://github.com/obra/superpowers)关联： [github.com/obra/superpowers](https://github.com/obra/superpowers)

Use it as your default "engineering brain" layer将其用作你的默认“工程大脑”层

## React Best PracticesReact 最佳实践

- Purpose: Enforces Vercel/Next.js style best practices in your React code目的：在您的 React 代码中强制执行 Vercel/Next.js 风格的最佳实践
- Use it when: Migrating to Next, cleaning up a legacy React app, or training junior devs适用场景：迁移到 Next 版本、清理旧版 React 应用或培训初级开发人员
- Link: [github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)关联： [github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)

## File Search文件搜索

- Purpose: Teaches Claude to use tools like ripgrep and ast-grep to navigate large codebases fast目的：教会 Claude 使用 ripgrep 和 ast-grep 等工具快速浏览大型代码库。
- Link: [github.com/massgen/massgen](https://github.com/massgen/massgen)关联： [github.com/massgen/massgen](https://github.com/massgen/massgen)

## Context Optimization上下文优化

- Purpose: Reduces context size and token bills while keeping the important stuff目的：在保留重要内容的同时，减少上下文大小和令牌账单。
- Link: [github.com/muratcankoylan/agent-skills-for-context-engineering](https://github.com/muratcankoylan/agent-skills-for-context-engineering)关联： [github.com/muratcankoylan/agent-skills-for-context-engineering](https://github.com/muratcankoylan/agent-skills-for-context-engineering)

# Tooling and setup skills工具和设置技能

> These are the "do this once, forget about it forever" skills这些都是“一次完成，终身无需操心”的技能。

## Setup Pre-Commit设置预提交

- Purpose: Sets up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests目的：为 Husky 提交前钩子配置 lint-staged、Prettier、类型检查和测试。
- Install: npx skills@latest add mattpocock/skills/setup-pre-commit安装： npx skills@latest add mattpocock/skills/setup-pre-commit
- Link: [github.com/mattpocock/skills/tree/main/setup-pre-commit](https://github.com/mattpocock/skills/tree/main/setup-pre-commit)关联： [github.com/mattpocock/skills/tree/main/setup-pre-commit](https://github.com/mattpocock/skills/tree/main/setup-pre-commit)

Run this on every new repo. Your future self will thank you.在每个新仓库上运行此命令。未来的你会感谢自己的。

![Image](https://pbs.twimg.com/media/HF6eF7easAE2iEA?format=jpg&name=large)

## Git Guardrails for Claude CodeClaude Code 的 Git Guardrails

- Purpose: Sets up Claude Code hooks that block dangerous git commands - push, reset --hard, clean, etc. - before they execute目的：设置 Claude Code 钩子，在危险的 Git 命令（例如 push、reset --hard、clean 等）执行之前将其阻止。
- Install: npx skills@latest add mattpocock/skills/git-guardrails-claude-code安装： npx skills@latest add mattpocock/skills/git-guardrails-claude-code
- Link: [github.com/mattpocock/skills/tree/main/git-guardrails-claude-code](https://github.com/mattpocock/skills/tree/main/git-guardrails-claude-code)关联： [github.com/mattpocock/skills/tree/main/git-guardrails-claude-code](https://github.com/mattpocock/skills/tree/main/git-guardrails-claude-code)

This is not optional if you use Claude Code on production repos. Claude is fast and helpful until it isn't. This skill is your safety net如果你在生产代码库中使用 Claude Code，那么这项技能必不可少。Claude Code 速度快、功能强大，但并非总是如此。这项技能就是你的安全保障。

## Dependency Auditor依赖性审计员

- **Purpose:** Scans your package.json for outdated, vulnerable, or abandoned packages and outputs a prioritized fix list**用途：** 扫描 package.json 文件 ，查找过时、存在漏洞或已弃用的软件包，并输出按优先级排序的修复列表。
- **Use it when:** Your repo hasn't been touched in 6 months and you're scared to npm audit**适用情况：** 你的代码仓库已经 6 个月没更新了，而且你不敢使用 npm audit 命令。
- **Install:** npx skills@latest add ComposioHQ/awesome-claude-skills/dependency-auditor**安装：** npx skills@latest add ComposioHQ/awesome-claude-skills/dependency-auditor
- **Link:** [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)**关联：** [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

## Git Work TreesGit 工作树

- Purpose: Manages safe feature development on isolated branches without breaking your main project目的：在隔离的分支上安全地进行功能开发，而不会破坏主项目。
- Use it when: You need isolated experimental branches or parallel features适用场景：需要隔离的实验分支或并行功能时。

# Issue and project management skills问题和项目管理技能

## GitHub TriageGitHub 分类

- **Purpose:** Triages incoming GitHub issues with an agent brief and out-of-scope documentation so Claude knows exactly what to investigate and what to skip**目的：** 根据代理简报和超出范围的文档，对收到的 GitHub 问题进行分类，以便 Claude 确切地知道需要调查什么以及可以跳过什么。
- **Install:** npx skills@latest add mattpocock/skills/github-triage**安装：** npx skills@latest 添加 mattpocock/skills/github-triage
- Link: [github.com/mattpocock/skills/tree/main/github-triage](https://github.com/mattpocock/skills/tree/main/github-triage)关联： [github.com/mattpocock/skills/tree/main/github-triage](https://github.com/mattpocock/skills/tree/main/github-triage)

**Use it to:可用于：**

- Process large issue backlogs fast快速处理大量积压问题
- Label and categorize automatically自动贴标签和分类
- Route issues to the right person or epic将问题路由给合适的人或史诗级人物

![Image](https://pbs.twimg.com/media/HF6enlbXAAAkTJ9?format=jpg&name=large)

# Writing and knowledge skills写作和知识技能

## Edit Article编辑文章

- Purpose: Edits and improves articles by restructuring sections, improving clarity, and tightening prose目的：通过重组章节、提高清晰度和精简文风来编辑和改进文章。
- Install: npx skills@latest add mattpocock/skills/edit-article安装： npx skills@latest add mattpocock/skills/edit-article
- Link: [github.com/mattpocock/skills/tree/main/edit-article](https://github.com/mattpocock/skills/tree/main/edit-article)关联： [github.com/mattpocock/skills/tree/main/edit-article](https://github.com/mattpocock/skills/tree/main/edit-article)

This is not "clean up grammar". It restructures arguments, cuts filler, and sharpens the point of each section这并非“语法清理”。它重组论点，删减冗余内容，并使每个部分的要点更加清晰。

## Ubiquitous Language 普遍语言

- Purpose: Extracts a DDD-style ubiquitous language glossary from the current conversation目的：从当前对话中提取领域驱动设计（DDD）风格的普适语言词汇表。
- Install: npx skills@latest add mattpocock/skills/ubiquitous-language安装： npx skills@latest add mattpocock/skills/ubiquitous-language
- Link: [github.com/mattpocock/skills/tree/main/ubiquitous-language](https://github.com/mattpocock/skills/tree/main/ubiquitous-language)关联： [github.com/mattpocock/skills/tree/main/ubiquitous-language](https://github.com/mattpocock/skills/tree/main/ubiquitous-language)

**Why it matters:重要性：**

- Every team has private vocabulary: "event", "order", "user" mean different things to different people每个团队都有自己的专属词汇：“事件”、“订单”、“用户”对不同的人来说意味着不同的东西。
- This skill forces Claude to surface and define your domain language before any code is written这项技能迫使克劳德在编写任何代码之前，先找出并定义你的领域语言。
- Your codebase, docs, and conversations then share the same words for the same things这样一来，你的代码库、文档和对话中就会出现对同一事物使用相同词汇的情况。

## API Documentation GeneratorAPI 文档生成器

- **Purpose:** Reads your routes and generates OpenAPI / Swagger docs with examples, error codes, and auth requirements**用途：** 读取您的路由并生成包含示例、错误代码和身份验证要求的 OpenAPI/Swagger 文档。
- **Use it when:** You shipped the API but never wrote the docs**在以下情况下使用：** 你发布了 API 但从未编写文档
- **Install:** npx skills@latest add ComposioHQ/awesome-claude-skills/api-docs-generator**安装：** npx skills@latest add ComposioHQ/awesome-claude-skills/api-docs-generator
- **Link:** [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)**关联：** [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

Paste it into your README or host it on Swagger UI. Takes 30 seconds.将其粘贴到您的 README 文件中，或将其托管在 Swagger UI 上。只需 30 秒。

## Content Researcher内容研究员

- Purpose: Learns your writing style, then drafts long-form blogs and newsletters with real citations目的：学习你的写作风格，然后撰写带有真实引用的长篇博客文章和新闻稿。
- Use it to: Clone your Twitter tone into longer posts, produce SEO blog posts用途：将您的 Twitter 语气复制到更长的文章中，制作 SEO 博客文章
- Link: [github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md)关联： [github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md)

## Obsidian Vault黑曜石金库

- Purpose: Searches, creates, and manages notes in an Obsidian vault with wikilinks and index notes用途：在 Obsidian 保险库中搜索、创建和管理笔记，包括维基链接和索引笔记。
- Install: npx skills@latest add mattpocock/skills/obsidian-vault安装： npx skills@latest add mattpocock/skills/obsidian-vault
- Link: [github.com/mattpocock/skills/tree/main/obsidian-vault](https://github.com/mattpocock/skills/tree/main/obsidian-vault)关联： [github.com/mattpocock/skills/tree/main/obsidian-vault](https://github.com/mattpocock/skills/tree/main/obsidian-vault)

Different from the Kepano Obsidian skill which auto-tags. This one is interactive - it navigates your vault, creates new notes, and maintains link consistency.与 Kepano Obsidian 的自动标记技能不同，这个技能是交互式的——它可以浏览你的资料库、创建新笔记并保持链接的一致性。

**Also available:** [github.com/kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) - the auto-tagging variant**另有其他选择：** [github.com/kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) - 自动标记变体

![Image](https://pbs.twimg.com/media/HF6fyMkbwAAG7NV?format=jpg&name=large)

# UI, design, and frontend skillsUI、设计和前端技能

## Frontend Design前端设计

- Purpose: Guides Claude to produce modern, clean UI目的：指导 Claude 创建现代、简洁的用户界面
- Link: [github.com/anthropics/skills/tree/main/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)关联： [github.com/anthropics/skills/tree/main/skills/frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)

## Awesome-design超棒的设计

- Purpose: Uses markdown templates inspired by Notion, Figma, etc to structure your UI thinking用途：使用受 Notion、Figma 等启发而开发的 Markdown 模板来构建您的 UI 设计思路。
- Use it for: Landing pages, dashboards, settings pages用途：落地页、仪表盘、设置页面
- Link: [github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)关联： [github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

## Theme Factory主题工厂

- Purpose: Generates complete color palettes and themes from a single text prompt用途：根据单个文本提示生成完整的调色板和主题
- Link: [github.com/anthropics/skills/tree/main/skills/theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory)关联： [github.com/anthropics/skills/tree/main/skills/theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory)

Workflow:工作流程：

1. Describe your brand: "calm fintech, trust, dark accent"描述一下你的品牌：“冷静的金融科技，值得信赖，深沉的语调”
2. Get palette with tokens使用令牌获取调色板
3. Apply to Tailwind / CSS variables应用于 Tailwind / CSS 变量

## Canvas Design画布设计

- Purpose: Turns text prompts into social media graphics, posters, and covers用途：将文本提示转换为社交媒体图片、海报和封面
- Link: [github.com/anthropics/skills/tree/main/skills/canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design)关联： [github.com/anthropics/skills/tree/main/skills/canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design)

## Web Artifacts Builder

- Purpose: Builds interactive dashboards, calculators, and tools from natural language用途：利用自然语言构建交互式仪表盘、计算器和工具
- Link: [github.com/anthropics/skills/tree/main/skills/web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder)关联： [github.com/anthropics/skills/tree/main/skills/web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder)

## Algorithmic Art算法艺术

- Purpose: Uses p5.js for generative and algorithmic visuals用途：使用 p5.js 实现生成式和算法视觉效果
- Link: [github.com/anthropics/skills/tree/main/skills/algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art)关联： [github.com/anthropics/skills/tree/main/skills/algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art)

## Brand Guidelines品牌指南

- Purpose: Enforces your brand system across all new components目的：在所有新组件中强化您的品牌体系
- Link: [github.com/anthropics/skills/tree/main/skills/brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines)关联： [github.com/anthropics/skills/tree/main/skills/brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines)

![Image](https://pbs.twimg.com/media/HF6gOf0WgAAu8Wv?format=jpg&name=large)

# Business, sales, and marketing skills商业、销售和营销技能

## Domain Name Brainstormer域名创意集思广益

- Purpose: Generates product names and checks domain availability用途：生成产品名称并检查域名可用性
- Use it when: Launching new apps or micro-brands适用场景：推出新应用或微型品牌
- Link: [github.com/Microck/ordinary-claude-skills/tree/main/skills\_all/domain-name-brainstormer](https://github.com/Microck/ordinary-claude-skills/tree/main/skills_all/domain-name-brainstormer)关联： [github.com/Microck/ordinary-claude-skills/tree/main/skills\_all/domain-name-brainstormer](https://github.com/Microck/ordinary-claude-skills/tree/main/skills_all/domain-name-brainstormer)

## Stripe IntegrationStripe 集成

- Purpose: Sets up secure payment flows, webhooks, and subscriptions without rookie API mistakes目的：设置安全的支付流程、Webhook 和订阅，避免新手 API 错误。
- Link: [github.com/wshobson/agents/tree/main/plugins/payment-processing/skills/stripe-integration](https://github.com/wshobson/agents/tree/main/plugins/payment-processing/skills/stripe-integration)关联： [github.com/wshobson/agents/tree/main/plugins/payment-processing/skills/stripe-in​​tegration](https://github.com/wshobson/agents/tree/main/plugins/payment-processing/skills/stripe-integration)

## Lead Research Assistant首席研究助理

- Purpose: Finds target companies and decision-makers based on your ICP目的：根据您的理想客户画像 (ICP) 寻找目标公司和决策者。
- Use it for: B2B outreach lists, partnership hunting用途：B2B 推广名单、寻找合作伙伴
- Link: [github.com/ComposioHQ/awesome-claude-skills/blob/master/lead-research-assistant/SKILL.md](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/lead-research-assistant/SKILL.md)关联： [github.com/ComposioHQ/awesome-claude-skills/blob/master/lead-research-assistant/SKILL.md](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/lead-research-assistant/SKILL.md)

## Marketing Skills营销技巧

- What it is: 20+ skills for CRO, copywriting, email flows, etc内容包括：20多项转化率优化、文案撰写、邮件流程等方面的技能
- Link: [github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)关联： [github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

## Claude SEO

- Purpose: Full technical SEO audit, schema, and on-page optimization.目的：全面技术 SEO 审核、结构化数据和页面优化。
- Link: [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)关联： [github.com/AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)

## Idea Mining / YouTube Weekly Roundup创意挖掘 / YouTube 每周精选

- Purpose: Scrapes your comments, competitor videos, and niche trends into a weekly idea bank + SWOT PDF用途：每周收集您的评论、竞争对手视频和细分市场趋势，并生成一份包含 SWOT 分析 PDF 的创意库。
- Link: [https://github.com/AgriciDaniel/claude-youtube](https://github.com/AgriciDaniel/claude-youtube)关联： [https://github.com/AgriciDaniel/claude-youtube](https://github.com/AgriciDaniel/claude-youtube)
- Install: npx skills@latest add AgriciDaniel/claude-youtube安装： npx skills@latest add AgriciDaniel/claude-youtube

![Image](https://pbs.twimg.com/media/HF6g2TZXYAA6mBJ?format=jpg&name=large)

# Media generation skills媒体制作技能

## Image Generator图像生成器

- Purpose: Connects to external APIs like Nano Banana Pro for photo-quality images用途：连接到 Nano Banana Pro 等外部 API，以获取照片级图像。
- Nano Banana Pro: [github.com/feedtailor/ccskill-nanobanana](https://github.com/feedtailor/ccskill-nanobanana)Nano Banana Pro： [github.com/feedtailor/ccskill-nanobanana](https://github.com/feedtailor/ccskill-nanobanana)
- Nano Banana 2: [github.com/kingbootoshi/nano-banana-2-skill](https://github.com/kingbootoshi/nano-banana-2-skill)纳米香蕉 2： [github.com/kingbootoshi/nano-banana-2-skill](https://github.com/kingbootoshi/nano-banana-2-skill)

## Local Image Gen局部图像基因

- Purpose: Runs a local Python script to generate avatars and icons用途：运行本地 Python 脚本以生成头像和图标
- Link: [github.com/jezweb/claude-skills/blob/main/plugins/design-assets/skills/ai-image-generator/SKILL.md](https://github.com/jezweb/claude-skills/blob/main/plugins/design-assets/skills/ai-image-generator/SKILL.md)关联： [github.com/jezweb/claude-skills/blob/main/plugins/design-assets/skills/ai-image-generator/SKILL.md](https://github.com/jezweb/claude-skills/blob/main/plugins/design-assets/skills/ai-image-generator/SKILL.md)

## Image Optimizer图像优化器

- Purpose: Resizes and converts images to WebP for fast web performance用途：调整图像大小并将其转换为 WebP 格式，以提高网页浏览速度。
- Link: [mcpmarket.com/tools/skills/image-optimizer](https://mcpmarket.com/tools/skills/image-optimizer)关联： [mcpmarket.com/tools/skills/image-optimizer](https://mcpmarket.com/tools/skills/image-optimizer)

## Remotion Best Practices情绪管理最佳实践

- Purpose: Encodes best practices for using Remotion to generate video and motion graphics.目的：记录使用 Remotion 生成视频和动态图形的最佳实践。
- Link: [github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion)关联： [github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion)

## Emotion情感

- Purpose: Scripted, programmatic video animations用途：脚本化、程序化的视频动画
- Link: [github.com/wilwaldon/Claude-Code-Video-Toolkit](https://github.com/wilwaldon/Claude-Code-Video-Toolkit)关联： [github.com/wilwaldon/Claude-Code-Video-Toolkit](https://github.com/wilwaldon/Claude-Code-Video-Toolkit)

![Image](https://pbs.twimg.com/media/HF6hIzoXcAA6Iqu?format=jpg&name=large)

# Office, documents, and productivity skills办公、文档和生产力技能

## PDF ProcessingPDF 处理

- Purpose: Extracts tables, fills forms, merges PDFs用途：提取表格、填写表单、合并 PDF
- Link: [github.com/anthropics/skills/tree/main/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf)关联： [github.com/anthropics/skills/tree/main/skills/pdf](https://github.com/anthropics/skills/tree/main/skills/pdf)

## DOCX

- Purpose: Edits Word docs with tracked changes and formatting intact用途：编辑 Word 文档，保留修订痕迹和格式。
- Link: [github.com/anthropics/skills/tree/main/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx)关联： [github.com/anthropics/skills/tree/main/skills/docx](https://github.com/anthropics/skills/tree/main/skills/docx)

## PPTX

- Purpose: Creates and edits slide decks, layouts, and speaker notes用途：创建和编辑幻灯片、布局和演讲者备注
- Link: [github.com/anthropics/skills/tree/main/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx)关联： [github.com/anthropics/skills/tree/main/skills/pptx](https://github.com/anthropics/skills/tree/main/skills/pptx)

## XLSX

- Purpose: Writes formulas, pivot tables, and charts from plain English目的：用简单的英语编写公式、数据透视表和图表
- Link: [github.com/anthropics/skills/tree/main/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx)关联： [github.com/anthropics/skills/tree/main/skills/xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx)

## Excel MCP ServerExcel MCP 服务器

- Purpose: Manipulates Excel files directly via MCP, no desktop Excel required用途：通过 MCP 直接操作 Excel 文件，无需桌面版 Excel。
- Link: [github.com/haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server)关联： [github.com/haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server)

## Doc Co-Authoring文档共同创作

- Purpose: Real-time collaborative writing between you and Claude目的：你和克劳德之间的实时协作写作
- Link: [github.com/anthropics/skills/tree/main/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring)关联： [github.com/anthropics/skills/tree/main/skills/doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring)

## NotebookLM IntegrationNotebookLM 集成

- Purpose: Bridges Claude with Google's NotebookLM for summaries and flashcards目的：将 Claude 与 Google 的 NotebookLM 连接起来，用于生成摘要和记忆卡片。
- Link: [github.com/PleasePrompto/notebooklm-skill](https://github.com/PleasePrompto/notebooklm-skill)关联： [github.com/PleasePrompto/notebooklm-skill](https://github.com/PleasePrompto/notebooklm-skill)

## GWS (Google Workspace)GWS（Google Workspace）

- Purpose: Automates Google Calendar, Drive, Docs用途：自动化管理 Google 日历、云端硬盘和文档
- Use cases: Reschedule meetings, organize shared drives, generate docs from templates使用场景：重新安排会议、整理共享驱动器、从模板生成文档
- Link: [https://github.com/googleworkspace/cli](https://github.com/googleworkspace/cli)关联： [https://github.com/googleworkspace/cli](https://github.com/googleworkspace/cli)

![Image](https://pbs.twimg.com/media/HF6hqdsXoAAcftJ?format=jpg&name=large)

# Multi-agent orchestration and web surfing多智能体编排和网络浏览

## Stochastic Multi-Agent Consensus随机多智能体共识

- Purpose: Spawns many sub-agents to solve the same problem and aggregates their answers目的：生成多个子智能体来解决同一个问题，并汇总它们的答案。
- Use it for: Strategy decisions, architecture choices, risk analysis用途：战略决策、架构选择、风险分析
- Link: [github.com/hungv47/meta-skills](https://github.com/hungv47/meta-skills)关联： [github.com/hungv47/meta-skills](https://github.com/hungv47/meta-skills)

## Model-chat (Debate)模型聊天（辩论）

- Purpose: Puts multiple Claude instances into a debate to stress-test ideas目的：将多个克劳德实例置于辩论中，以检验各种观点。
- Use it when: You're choosing between 2-3 big bets适用情况：当你在2-3个大赌注之间做出选择时
- Link: [github.com/tommasinigiovanni/conclave](https://github.com/tommasinigiovanni/conclave)关联： [github.com/tommasinigiovanni/conclave](https://github.com/tommasinigiovanni/conclave)

## Custom YT Search自定义 YouTube 搜索

- Purpose: Searches and analyzes YouTube content autonomously目的：自主搜索和分析 YouTube 内容
- Link: [github.com/ZeroPointRepo/youtube-skills/blob/main/README.md](https://github.com/ZeroPointRepo/youtube-skills/blob/main/README.md)关联： [github.com/ZeroPointRepo/youtube-skills/blob/main/README.md](https://github.com/ZeroPointRepo/youtube-skills/blob/main/README.md)

## Playwright CLI剧作家 CLI

- Purpose: Controls a real browser via Playwright for UI regression checks and funnel walkthroughs用途：通过 Playwright 控制真实浏览器，进行 UI 回归检查和流程演练。
- Link: [github.com/microsoft/playwright](https://github.com/microsoft/playwright)关联： [github.com/microsoft/playwright](https://github.com/microsoft/playwright)

## Firecrawl Skill火行技能

- Purpose: Scrapes structured data from hostile or complex sites that block naive scrapers目的：从恶意或复杂的网站抓取结构化数据，这些网站会阻止普通的抓取工具。
- Link: [github.com/mendableai/firecrawl](https://github.com/mendableai/firecrawl)关联： [github.com/mendableai/firecrawl](https://github.com/mendableai/firecrawl)

![Image](https://pbs.twimg.com/media/HF6iHpWXwAAipSI?format=jpg&name=large)

## How to wire this into your workflow如何将其融入您的工作流程

1. **Start with meta skills** - Install Write a Skill and Skill Creator so you can build and fix skills properly from day one.**首先从元技能入手** ——安装 Write a Skill 和 Skill Creator，这样你就可以从一开始就正确地构建和修复技能。
2. **Add planning skills first** - Grill Me, Write a PRD, PRD to Plan, PRD to Issues, Design an Interface. These prevent 80% of rework.**首先要培养规划技能** ——比如“问我问题”、“编写产品需求文档”、“根据产品需求文档制定计划”、“根据产品需求文档创建问题清单”以及“设计界面”。这些措施可以避免 80% 的返工。
3. **Lock in code safety** - Git Guardrails, Setup Pre-Commit, TDD, Systematic Debugging, Triage Issue. Install these on every repo.**确保代码安全** ——Git Guardrails、设置预提交、TDD、系统化调试、问题分类。在每个代码仓库中都安装这些工具。
4. **Add Superpowers as your engineering base -** [github.com/obra/superpowers](https://github.com/obra/superpowers)**将超级大国作为你的工程基础 -** [github.com/obra/superpowers](https://github.com/obra/superpowers)
5. **Layer business skills on top** - Marketing Skills, Claude SEO, Lead Research, Content Researcher.**在此基础上叠加商业技能** ——营销技能、Claude SEO、潜在客户研究、内容研究。
6. **Use SkillsMP to fill gaps** - [skillsmp.com](https://skillsmp.com/) - when you hit a new problem, search before you build**使用 SkillsMP 来弥补技能差距** \- [skillsmp.com](https://skillsmp.com/) - 当你遇到新问题时，先搜索再构建。

![Image](https://pbs.twimg.com/media/HF6iRLtWMAAp6SN?format=png&name=large)

## Save this before you forget保存此内容，以免忘记

You just got the full Claude skill stack - planning, coding, design, marketing, docs, media, and multi-agent orchestration in one place您现在拥有了 Claude 的全部技能——规划、编码、设计、营销、文档、媒体和多代理编排，尽在一个平台。

Most people will skim this, close the tab, and go back to prompting Claude like it's 2024大多数人会快速浏览一下，关掉标签页，然后像2024年那样继续催促克劳德。

**Don't be that person别做那样的人**

- Bookmark this page right now立即将此页面添加到书签
- Copy the full link index into your own doc将完整的链接索引复制到您自己的文档中。
- Pick one skill from each section and install it today从每个部分选择一项技能，并立即安装。
- Come back in a week when you realize you can't work without them一周后当你意识到没有他们你根本无法工作时再来吧。

If this saved you time - repost it. Someone on your timeline is still writing 500-word prompts to get what a single SKILL.md does automatically如果这篇文章帮你节省了时间，请转发。你时间线上的某些人还在写 500 字的提示信息，试图达到一个简单的 SKILL.md 文件就能自动完成的效果。
