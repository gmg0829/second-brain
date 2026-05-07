---
title: "Structured-Prompt-Driven Development (SPDD)"
source: "https://martinfowler.com/articles/structured-prompt-driven/"
author:
  - "[[Wei Zhang 张伟]]"
  - "[[Jessie Jie Xia 夏洁]]"
published: 2026-04-28
created: 2026-04-29
description: "A structured approach to using prompts to guide AI-assisted programming."
tags:
  - "clippings"
---
## Structured-Prompt-Driven Development (SPDD)结构化提示驱动开发（SPDD）

How to make LLM-assisted changes governable, reviewable, and reusable  
如何使 LLM 辅助的变更可管理、可审查和可重用

Once a team adopts AI coding assistants, the first gains show up at the individual level: one developer can draft, modify, and refactor code much faster than before. But delivery speed is rarely limited by typing. When you look at the full delivery lifecycle, from requirements through release, new friction appears:  
一旦团队采用 AI 编码助手，最先体现在个人层面：开发人员编写、修改和重构代码的速度比以往快得多。但交付速度很少受限于打字速度。从需求分析到最终发布，整个交付生命周期中会出现新的瓶颈：

- Ambiguous requirements become code quickly, and misunderstandings scale with them.  
	模糊的需求会迅速转化为代码，误解也会随之加剧。
- Reviews have to process more change, and inconsistency becomes easier to introduce.  
	评论需要处理更多变化，因此更容易出现不一致的情况。
- More integration and testing issues surface because “generated” doesn't mean “aligned.”  
	因为“生成”并不意味着“对齐”，所以出现了更多的集成和测试问题。
- Production risk is harder to reason about when the volume of change rises.  
	当变化量增大时，生产风险就更难判断。

So yes, local speed improves. But that doesn't automatically translate into system-level throughput. It's like buying a Ferrari and driving it on muddy roads: the engine is powerful, but your arrival time is determined by road conditions and traffic. In our experience, the real question isn't “How do we generate more code?” It's how do we make AI-generated changes governable, reviewable, and reusable, so teams get faster and safer?  
所以，没错，本地速度确实提升了。但这并不意味着系统级吞吐量也会随之提高。这就像买了一辆法拉利，却在泥泞的道路上行驶：引擎动力强劲，但到达目的地的时间取决于路况和交通状况。根据我们的经验，真正的问题不是“如何生成更多代码？”，而是如何让 AI 生成的变更可控、可审查、可复用，从而让团队的工作更高效、更安全？

That led our Thoughtworks internal IT teams (Global IT Services) to a method and workflow we now call Structured Prompt-Driven Development (SPDD). SPDD aims to turn AI assistance from personal efficiency into an organization-level capability that scales, without trading away quality.  
这促使 Thoughtworks 内部 IT 团队（全球 IT 服务）开发出一种我们现在称之为“结构化提示驱动开发”（SPDD）的方法和工作流程。SPDD 旨在将 AI 辅助从提升个人效率转变为可扩展的组织级能力，同时又不牺牲质量。

![](https://martinfowler.com/articles/structured-prompt-driven/spdd-overview.svg)

Prompts as First-Class Delivery Artifacts  
提示作为一流的交付成果

## What is SPDD? SPDD 是什么？

Structured Prompt-Driven Development (SPDD) is an engineering method that treats prompts as first-class delivery artifacts.  
结构化提示驱动开发 (SPDD) 是一种工程方法，它将提示视为一流的交付成果。

Instead of relying on ad hoc chats, SPDD turns prompts into assets that can be: version controlled, reviewed, reused, and improved over time. Teams use structured prompts to capture requirements, domain language, design intent, constraints, and a task breakdown. Then the LLM generates code within a defined boundary, so output becomes more predictable and easier to validate.  
SPDD 摒弃了临时聊天，将提示信息转化为可进行版本控制、可审查、可重用且可随时间改进的资产。团队使用结构化提示来捕获需求、领域语言、设计意图、约束条件和任务分解。然后，LLM 在定义的范围内生成代码，从而使输出更具可预测性，也更易于验证。

It has two core components  
它有两个核心部件

### The REASONS Canvas 理由画布

The REASONS Canvas is a structure for generating prompts. It forces clarity around requirements, domain model, solution approach, system structure, task decomposition, reusable norms, and safeguards. So the LLM is guided by intent, not guesswork.  
REASONS Canvas 是一种用于生成提示的结构。它能帮助用户明确需求、领域模型、解决方案、系统结构、任务分解、可重用规范和安全措施。因此，LLM 是以意图为导向，而非靠猜测。

The REASONS Canvas is a seven-part structure that guides a prompt from intent → design → execution → governance.  
REASONS Canvas 是一个七部分结构，它指导从意图 → 设计 → 执行 → 治理的整个过程。

![](https://martinfowler.com/articles/structured-prompt-driven/spdd-reason-canvas.svg)

**Abstract parts (intent & design)  
抽象部分（意图和设计）**

- R — Requirements: What problem are we solving, and what is DoD?  
	R — 要求：我们要解决什么问题？什么是国防部？
- E — Entities: Domain entities and relationships.  
	E — 实体：领域实体和关系。
- A — Approach: The strategy of how we'll meet the requirements.  
	A — 方法：我们将如何满足要求的策略。
- S — Structure: Where the change fits in the system; components and dependencies.  
	S — 结构：变更在系统中的位置；组成部分和依赖关系。

**Specific parts (execution)  
具体部分（执行）**

- O — Operations: Break the abstract strategy into concrete, testable implementation steps.  
	O — 操作：将抽象的战略分解为具体的、可测试的实施步骤。

**Common standards parts (governance)  
通用标准部分（治理）**

- N — Norms: Cross-cutting engineering norms (naming, observability, defensive coding, etc.).  
	N — 规范：跨领域的工程规范（命名、可观察性、防御性编码等）。
- S — Safeguards: Non-negotiable boundaries (invariants, performance limits, security rules, etc.).  
	S — 安全保障：不可协商的边界（不变性、性能限制、安全规则等）。

The canvas aligns intent and boundaries before code is generated, moving uncertainty to the left. Because the structured prompt captures the full specification, reviewers reason about a single artifact instead of scattered chat logs and partial diffs. By following the same structure, every prompt becomes governable in the same way. And as domain knowledge and design decisions accumulate in each prompt, they compound individual expertise across iterations and reduce variability across the team.  
画布在代码生成之前就明确了意图和边界，将不确定性提前。由于结构化的提示涵盖了完整的规范，审阅者只需关注单一的工件，而不是分散的聊天记录和零散的差异。遵循相同的结构，每个提示都以相同的方式进行管理。随着领域知识和设计决策在每个提示中不断积累，它们能够增强个人在迭代中的专业知识，并降低团队内部的差异性。

### The SPDD workflow SPDD 工作流程

The workflow brings prompts into the same discipline as code: commit history, review, and quality gates. It also enforces a simple but powerful rule:  
该工作流程将提示信息纳入与代码相同的管理体系：提交历史、代码审查和质量把关。它还强制执行一条简单而强大的规则：

When reality diverges, fix the prompt first — then update the code.  
当实际情况与预期不符时，先修正提示信息，然后再更新代码。

Over time, this changes how teams work. Reviews move away from “spot the bug” toward “check the intent.” Rework becomes more controlled. And successful patterns naturally accumulate into a reusable prompt library that supports AI-First Software Delivery (AIFSD).  
随着时间的推移，这会改变团队的工作方式。评审不再侧重于“发现缺陷”，而是转向“检查意图”。返工变得更加可控。成功的模式自然而然地积累成一个可重用的提示库，从而支持人工智能优先的软件交付（AIFSD）。

If you've known about [Spec-Driven Development](https://en.wikipedia.org/wiki/Spec-driven_development), you'll recognize the same starting point: write the spec clearly first, then let the model implement. SPDD takes a different angle. It treats structured prompts as governed, reusable, versioned team assets (REASONS + workflow) that evolve alongside the code - an approach that Birgitta Böckeler categorizes as a [spec-anchored](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) approach.  
如果你了解 [规范驱动开发（Spec-Driven Development）](https://en.wikipedia.org/wiki/Spec-driven_development) ，你会发现它们的出发点相同：先清晰地编写规范，然后让模型来实现。SPDD 则另辟蹊径。它将结构化的提示视为受控的、可重用的、版本化的团队资产（REASONS + 工作流），这些资产会随着代码的演进而不断更新——Birgitta Böckeler 将这种方法归类为以 [规范为锚点的](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) 方法。

The goal of the SPDD workflow is to turn business input → abstraction → execution → validation → release into a *“closed loop”* 1—and to make sure prompt assets and code evolve together, not separately.  
SPDD 工作流的目标是将业务输入 → 抽象 → 执行 → 验证 → 发布变成一个 *“闭环”* 1 — 并确保提示资产和代码共同演进，而不是各自独立演进。

1: In a one-way pipeline, requirements produce code and the process ends; any later adjustment happens in code alone and the original intent drifts out of date. In SPDD the loop closes on two scales. Within an iteration, feedback flows back: logic corrections update the prompt before the code; refactoring syncs from code back to the prompt — so neither side silently diverges. Across iterations, the accumulated prompt assets — domain models, design decisions, norms, etc. — become the starting context for the next enhancement, so each cycle builds on a governed baseline rather than starting from scratch.

![](https://martinfowler.com/articles/structured-prompt-driven/spdd-workflow.svg)

SPDD workflow SPDD 工作流程

The aim of this workflow is to anchor collaboration on the prompts, so that developers and product owners can avoid repeated cycles of alignment. The prompt sets an explicit boundary for code generation, reducing the randomness of the LLM's non-determinism, making it easier to govern. By treating the structured prompts as first-class artifacts in version control, we turn successful practices into reusable assets, improving consistency and reducing reinvention.  
此工作流程旨在将协作锚定在提示信息上，从而使开发人员和产品负责人避免重复的协调过程。提示信息为代码生成设定了明确的边界，降低了 LLM（生命周期管理）不确定性带来的随机性，使其更易于管理。通过将结构化提示信息作为版本控制中的一等组件，我们将成功的实践转化为可重用的资源，从而提高一致性并减少重复发明。

In practice these steps are carried out through commands provided by [openspdd](https://github.com/gszhangwei/open-spdd), a command-line tool that implements the SPDD workflow. The table below summarizes each command.  
实际上，这些步骤是通过 [openspdd](https://github.com/gszhangwei/open-spdd) 提供的命令来完成的，openspdd 是一个实现了 SPDD 工作流程的命令行工具。下表总结了每个命令。

| Command 命令 | Type 类型 | Purpose 目的 |
| --- | --- | --- |
| [/spdd-story](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/optional/spdd-story.md) | Optional 选修的 | Breaks a large requirement into independent, deliverable user stories following the INVEST principle.   按照 INVEST 原则，将大型需求分解为独立的、可交付的用户故事。 |
| [/spdd-analysis](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/core/spdd-analysis.md) | Core 核 | Extracts domain keywords from requirements, scans relevant code, and produces a strategic analysis covering domain concepts, risks, and design direction.   从需求中提取领域关键词，扫描相关代码，并生成涵盖领域概念、风险和设计方向的战略分析。 |
| [/spdd-reasons-canvas](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/core/spdd-reasons-canvas.md) | Core 核 | Generates the full REASONS Canvas — an executable blueprint from high-level rationale down to method-level operations.   生成完整的 REASONS Canvas——一个从高层原理到方法级操作的可执行蓝图。 |
| [/spdd-generate](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/core/spdd-generate.md) | Core 核 | Reads the Canvas and generates code task by task, strictly following the operations, norms, and safeguards defined in the prompt.   读取 Canvas 并逐个任务生成代码，严格遵循提示中定义的操作、规范和安全措施。 |
| [/spdd-api-test](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/optional/spdd-api-test.md) | Optional 选修的 | Generates a cURL-based API test script with structured test cases covering normal, boundary, and error scenarios.   生成基于 cURL 的 API 测试脚本，其中包含涵盖正常、边界和错误场景的结构化测试用例。 |
| [/spdd-prompt-update](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/core/spdd-prompt-update.md) | Core 核 | Incrementally updates the Canvas when requirements change (requirements → prompt → code).   当需求发生变化时，逐步更新画布（需求→提示→代码）。 |
| [/spdd-sync](https://github.com/gszhangwei/open-spdd/blob/v0.4.9/internal/templates/data/core/spdd-sync.md) | Core 核 | Synchronizes code-side changes (refactoring, fixes) back into the Canvas so the prompt stays an accurate record of the current code (code → prompt).   将代码端更改（重构、修复）同步回 Canvas，以便提示保持当前代码的准确记录（代码 → 提示）。 |

## Enhancing a billing engine with SPDD利用 SPDD 增强计费引擎

A complicated workflow is difficult to understand in the abstract, so we have prepared an example workflow of enhancing an existing software system. This system, and its enhancement, are neccessarily small in order to be comprehensible within a tutorial article. That said the enhancement example is a full end-to-end example: from creating initial requirements, to analyzing business requirements, to generating and reviewing a structured prompt, to producing and verifying code, to final cleanup and testing.  
复杂的流程难以抽象理解，因此我们准备了一个增强现有软件系统的示例流程。为了便于在教程文章中讲解，该系统及其增强部分都比较小巧。尽管如此，该增强示例仍然是一个完整的端到端示例：从创建初始需求、分析业务需求、生成和审查结构化提示、编写和验证代码，到最终的清理和测试。

You can follow along with this example by installing [openspdd](https://github.com/gszhangwei/open-spdd) in your own environment.  
您可以按照此示例的步骤进行操作，方法是安装 在您自己的环境中 [运行 openspdd](https://github.com/gszhangwei/open-spdd) 。

### The current system 当前系统

The current system is a simple billing engine that calculates bills for using a large-language model. It accepts a record that captures how many tokens are used in a session and calculates a bill.  
目前的系统是一个简单的计费引擎，用于计算使用大型语言模型的费用。它接受一条记录，该记录捕获会话中使用的令牌数量，并计算费用。

The complete codebase for this initial version is [available on GitHub](https://github.com/gszhangwei/token-billing/tree/iteration-1-end). The repository includes the [initial requirements story](https://github.com/gszhangwei/token-billing/blob/iteration-1-start/requirements/token-usage-billing-story.md) and [all the SPDD artifacts used to generate it](https://github.com/gszhangwei/token-billing/compare/iteration-1-start...iteration-1-end). For brevity, we don't describe that initial generation here, but it follows essentially the same steps as that for the enhancement. We focus on describing the enhancement because most work on a system are enhancements.  
此初始版本的完整代码库如下： [可在 GitHub 上获取](https://github.com/gszhangwei/token-billing/tree/iteration-1-end) 。该存储库包含 [初始需求故事。](https://github.com/gszhangwei/token-billing/blob/iteration-1-start/requirements/token-usage-billing-story.md) 以及 [用于生成它的所有 SPDD 工件](https://github.com/gszhangwei/token-billing/compare/iteration-1-start...iteration-1-end) 。为简洁起见，我们在此不描述初始生成过程，但它与增强过程基本遵循相同的步骤。我们重点描述增强过程，因为系统的大部分工作都是增强。

### The enhancement 增强

Driven by evolving business requirements and direct user feedback, we are enhancing the billing engine to transition from a static pricing model to a more sophisticated, flexible infrastructure. This update aims to support diverse subscription strategies and variable, model-specific pricing through the following key changes:  
为了满足不断变化的业务需求并收集用户的直接反馈，我们正在改进计费引擎，以从静态定价模式过渡到更复杂、更灵活的基础架构。此次更新旨在通过以下主要变更，支持多样化的订阅策略和基于不同模式的浮动定价：

- API enhancement: update the existing `POST /api/usage` endpoint to accept a new, required `modelId` parameter (e.g., “fast-model”, “reasoning-model”).  
	API 增强：更新现有的 `POST /api/usage` 端点接受一个新的必需的 `modelId` 参数（例如，“fast-model”、“reasoning-model”）。
- Model-aware pricing: shift from a single global rate to dynamic pricing, where costs vary depending on the specific AI model invoked.  
	模型感知定价：从单一的全球价格转向动态定价，成本根据调用的具体 AI 模型而变化。
- Multi-plan billing logic: introduce distinct billing behaviors based on the customer's subscription tier:  
	多套餐计费逻辑：根据客户的订阅级别引入不同的计费方式：
- Standard plan (optimized): retains the global monthly quota, but any overage usage is now calculated using model-specific rates.  
	标准套餐（优化版）：保留每月全球配额，但任何超出配额的使用量现在都将使用特定型号的费率计算。
	- Premium plan (new): operates without a quota limit. It introduces split billing, where prompt tokens and completion tokens are charged separately at different rates depending on the model used.  
	高级套餐（新增）：不设配额限制。该套餐采用分期计费模式，提示代币和完成代币将根据所用模式按不同费率分别收费。
- Architectural scalability: implement an extensible design pattern (such as Strategy or Factory) to cleanly isolate the calculation formulas for different plans, ensuring the system can easily accommodate future pricing models.  
	架构可扩展性：实现可扩展的设计模式（例如策略或工厂），以清晰地隔离不同计划的计算公式，确保系统能够轻松适应未来的定价模型。

*Since this new section encompasses both business requirements and technical details, it is typically completed collaboratively through a pairing session between a PO (or BA) and a developer.  
由于这一新部分涵盖了业务需求和技术细节，因此通常是通过产品负责人（或业务分析师）和开发人员之间的结对编程会议协作完成的。*

### Step 1: Create initial requirements步骤 1：创建初始需求

To kick off the process quickly, we can use the `/spdd-story` 2 command to generate a user story directly based on the enhancement. Generally, user stories are provided by the PO or BA. However, in our workflow, we can transform stories of any form into a consistent format and dimension. As long as there is shared alignment on the final acceptance criteria, this step can be performed by a PO, BA, or developer, depending on the team's flexible division of labor.  
为了快速启动该流程，我们可以使用 `/spdd-story` 2 此命令可直接根据增强功能生成用户故事。通常，用户故事由产品负责人 (PO) 或业务分析师 (BA) 提供。 然而，在我们的工作流程中，我们可以将任何形式的故事转换成一致的格式和维度。 只要对最终验收标准达成共识，这一步骤可以由产品负责人、业务分析师或开发人员执行，具体取决于团队灵活的分工。

2: Since this is an optional command, if it is not available in your local environment, you can generate it by running `openspdd generate spdd-story`.

Instruction:操作说明：

### How spdd-story worksspdd-story 的工作原理

This command breaks a large requirement into independent, deliverable user stories following the INVEST principle (1–5 days of work each). Each story includes acceptance criteria written in business language, ready to serve as input for `/spdd-analysis`.  
此命令将一个大的需求分解成若干个独立的、 按照 INVEST 原则交付的用户故事（1-5 天） 每篇故事都包含以……形式编写的验收标准。 商业语言，可作为输入 `/spdd-analysis` 。

Its purpose is to make large requirements manageable and to ensure a standardized, predictable format for the next steps.  
其目的是使庞大的需求变得可管理，并确保后续步骤采用标准化、可预测的格式。

/spdd-story @ [idea-of-the-enhancement.md](https://github.com/gszhangwei/token-billing/blob/spdd-article-snapshot/requirements/idea-of-the-enhancement.md)  
/spdd-story @ [idea-of-the-enhancement.md](https://github.com/gszhangwei/token-billing/blob/spdd-article-snapshot/requirements/idea-of-the-enhancement.md)

The AI analyzed the enhancement description and split it into two user stories:  
人工智能分析了改进描述，并将其拆分为两个用户故事：

- [Story 1-1 (Standard Plan & model-aware pricing)  
	故事 1-1（标准方案和基于型号的定价）](https://github.com/gszhangwei/token-billing/blob/spdd-article-snapshot/requirements/%5BUser-story-1-1-initial%5DMulti-Plan-Billing-Foundation-%26-Standard-Plan-Model-Aware-Pricing.md)
- [Story 1-2 (Premium Plan split-rate billing)  
	故事 1-2（高级计划分期计费）](https://github.com/gszhangwei/token-billing/blob/spdd-article-snapshot/requirements/%5BUser-story-1-2-initial%5DPremium-Plan-Split-Rate-Billing.md)

The auto-generated stories are detailed enough to serve as a baseline for a formal project. For this walkthrough we consolidate them into a single simplified story so the example stays self-contained.  
自动生成的故事足够详细，可以作为正式项目的基准。为了便于演示，我们将它们合并成一个简化的故事，以确保示例的完整性。

Instruction:操作说明：

Consolidate the following two user stories into a single, simplified story:  
将以下两个用户故事合并成一个更简洁的用户故事：  
@\[User-story-1-1-initial\]Multi-Plan-Billing-Foundation-&-Standard-Plan-Model-Aware-Pricing.md  
@\[User-story-1-2-initial\]Premium-Plan-Split-Rate-Billing.md

Requirements:要求：  
1\. Merge both plans (Standard and Premium) into one coherent story.  
1\. 将标准版和高级版合并成一个连贯的故事。  
2\. Keep only the sections: Background, Business Value, Scope In, Scope Out, and Acceptance Criteria.  
2\. 仅保留以下部分：背景、业务价值、范围界定、范围界定和验收标准。  
3\. Strip implementation-level detail — focus on what the system should do, not how.  
3\. 去除实现层面的细节——关注系统应该做什么，而不是怎么做。  
4\. Acceptance Criteria must use Given/When/Then format with concrete numeric examples.  
4\. 验收标准必须采用“给定/当……时/那么……”的格式，并辅以具体的数值示例。  
5\. Keep the result concise — no more than one page.  
5\. 结果要简洁明了——不超过一页。  
6\. Only keep three high-level ACs.  
6\. 只保留三台高档空调。

Instructions of this kind rarely produce identical text on every run — models and sampling introduce small differences — so we still expect to review and tweak the output before treating it as final. The combined story below is the version we refined for this walkthrough: a deliberately simplified consolidation of the two initial stories.  
此类指令很少每次运行都能生成完全相同的文本——模型和抽样会引入细微差异——因此我们仍然需要在将其视为最终版本之前进行审查和调整。以下合并后的版本是我们为本次演示而优化的：它是最初两个版本有意简化的合并。

### Step 2: Clarify analysis步骤二：明确分析

Before jumping into implementation, the developer reviews the user story to build a shared understanding of what it means in practice. If there are obvious business-level issues, this is the point to align with the BA or PO. In this case the story is clear enough, so we move straight to breaking it down along three dimensions: core logic, scope boundaries, and definition of done.  
在正式实施之前，开发人员会先审阅用户故事，以确保对它在实践中的含义达成共识。如果存在明显的业务层面问题，此时需要与业务分析师 (BA) 或产品负责人 (PO) 进行沟通。在本例中，用户故事已经足够清晰，因此我们可以直接将其分解为三个维度：核心逻辑、范围边界和完成定义。

**Core logic 核心逻辑**

One new required field on the API: `modelId`. The customer now tells us which AI model they used — this is the key that unlocks the right price.  
API 新增了一个必填字段： `modelId` 。客户现在需要告诉我们他们使用了哪个 AI 模型——这是获得正确价格的关键。

- *Standard Plan:* Customer has a monthly token quota. Usage within quota is free. Overage is charged at a model-specific rate (e.g., fast-model $0.01/1K vs. reasoning-model $0.03/1K). Existing quota logic stays; only the rate lookup changes.  
	*标准套餐：* 客户每月享有一定数量的代币配额。配额内的使用免费。超出配额将按特定模型费率收费（例如，快速模型每 1000 个代币收费 0.01 美元，而推理模型每 1000 个代币收费 0.03 美元）。现有配额逻辑保持不变；仅费率计算方式有所改变。
- *Premium Plan:* No quota. Every token is billed from the first one. Prompt tokens and completion tokens are charged separately, each at a model-specific rate. Bill = prompt charge + completion charge. This plan is entirely new.  
	*高级套餐：* 无配额限制。所有代币均从第一个代币开始计费。提示代币和完成代币分别收费，费率根据不同型号而定。账单金额 = 提示费用 + 完成费用。此套餐为全新套餐。
- *Routing:* The system determines the customer's plan and dispatches to the matching billing formula. The design must be easy to extend — Enterprise plans (Story 2) are next.  
	*路由：* 系统会确定客户的套餐计划，并根据相应的计费公式进行调度。该设计必须易于扩展——企业套餐（故事 2）是下一步。

**Scope boundaries 范围边界**

We are only calculating the current bill. We are NOT building customer CRUD, NOT querying historical bills, NOT managing subscriptions, and NOT adding/removing models.  
我们只负责计算当前账单。我们不进行客户数据增删改查，不查询历史账单，不管理订阅，也不添加/删除模型。

**Definition of done 完成的定义**

The following scenarios restate the story's acceptance criteria with the implementation detail the team needs to verify. The fourth item (Response format) is not a new business AC — it captures the non-functional contract the developer adds to make the criteria testable end-to-end.  
以下场景重述了用户故事的验收标准，并附有团队需要验证的实现细节。第四项（响应格式）并非新的业务验收标准，而是开发人员为了使验收标准可进行端到端测试而添加的非功能性约定。

- *Validation:* Missing `modelId` → HTTP 400. Unknown customer → HTTP 404. Negative tokens → HTTP 400. All existing validations remain intact.  
	*验证：* 缺少 `modelId` → HTTP 400。未知客户 → HTTP 404。否定令牌 → HTTP 400。所有现有验证均保持不变。
- *Standard Plan billing:* A customer with a 100K quota and 90K already used submits 30K tokens for fast-model ($0.01/1K). Expected result: 10K covered by quota, 20K overage, charge $0.20. The same request with reasoning-model ($0.03/1K) yields $0.60 — same quota logic, different rate.  
	*标准套餐计费：* 一位拥有 10 万代币配额且已使用 9 万代币的客户提交了 3 万个代币，采用快速计费模式（每千个代币收费 0.01 美元）。预期结果：1 万个代币在配额范围内，超出 2 万个代币，收费 0.20 美元。同样的请求，如果采用推理计费模式（每千个代币收费 0.03 美元），则收费 0.60 美元——配额逻辑相同，但费率不同。
- *Premium Plan billing:* A customer submits 10K prompt tokens + 20K completion tokens for reasoning-model (prompt $0.03/1K, completion $0.06/1K). Expected result: $0.30 + $1.20 = $1.50. No quota, no overage — prompt and completion are billed separately.  
	*高级套餐计费：* 客户提交 1 万个提示令牌和 2 万个完成令牌用于推理模型（提示令牌每 1000 个 0.03 美元，完成令牌每 1000 个 0.06 美元）。预期结果：0.30 美元 + 1.20 美元 = 1.50 美元。无配额限制，无超额费用——提示令牌和完成令牌分别计费。
- *Response format:* HTTP 201 returning bill ID, customer ID, token counts, timestamp, `modelId`, and a plan-appropriate charge breakdown.  
	*响应格式：* HTTP 201 返回账单 ID、客户 ID、令牌计数、时间戳、 `modelId` 和与套餐相符的费用明细。

If all these scenarios pass, we've conquered this story.  
如果所有这些情况都发生，我们就征服了这个故事。

### Step 3: Generate analysis context步骤 3：生成分析背景

With the requirements and scope clarified, we use the `/spdd-analysis` command. By feeding it the business requirements, we instruct the AI to generate a comprehensive analysis context.  
在明确了需求和范围之后，我们使用 `/spdd-analysis` 命令。通过输入业务需求，我们指示 AI 生成全面的分析上下文。

### How spdd-analysis worksSPDD 分析的工作原理

This command extracts domain keywords from the business requirements (e.g. “billing”, “quota”, “plan”) and uses them to scan only the relevant parts of the codebase — not all of it. It identifies existing concepts, new concepts, key business rules, and technical risks.  
此命令从业务需求中提取领域关键词（例如“计费”、“配额”、“计划”），并使用这些关键词扫描代码库中相关的部分，而不是全部代码。它可以识别现有概念、新概念、关键业务规则和技术风险。

The output is a context-rich document covering domain concept recognition, strategic direction, and risk analysis. It serves as input for the next step: generating the REASONS Canvas.  
输出结果是一份内容丰富的文档，涵盖领域概念识别、战略方向和风险分析。它将作为下一步的输入：生成 REASONS 画布。

Instruction:操作说明：

/spdd-analysis @\[User-story-1\]Multi-Plan-Billing-Foundation-&-Model-Aware-Pricing.md

Generated artifact: [the initial analysis context document](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/analysis/GGQPA-001-202603191100-%5BAnalysis%5D-multi-plan-billing-model-aware-pricing.md).  
生成的工件： [初始分析上下文文档](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/analysis/GGQPA-001-202603191100-%5BAnalysis%5D-multi-plan-billing-model-aware-pricing.md) 。

This command produces a strategic-level analysis grounded in actual codebase exploration. The output focuses entirely on the “what” and “why,” deliberately avoiding granular implementation details at this stage. It typically covers:  
此命令基于实际代码库探索，生成战略层面的分析报告。输出结果完全聚焦于“是什么”和“为什么”，刻意避免在此阶段深入细枝末节的实现细节。其通常涵盖以下内容：

- Domain concepts: existing vs. new, relationships, business rules  
	领域概念：现有与新增、关系、业务规则
- Strategic approach: solution direction, design decisions, trade-offs  
	战略方法：解决方案方向、设计决策、权衡取舍
- Risks & gaps: ambiguities, edge cases, technical risks, acceptance-criteria coverage  
	风险与差距：模糊之处、极端情况、技术风险、验收标准覆盖范围

#### Review and refine the analysis context审查并完善分析背景

With our own understanding of the business requirements in mind, we review the generated analysis document—focusing on the areas highlighted in the [alignment](https://martinfowler.com/articles/structured-prompt-driven/alignment.html) skill. This review serves two purposes: confirming that our understanding aligns with the AI's interpretation, and discovering edge cases or boundary scenarios the AI might surface that we hadn't considered.  
结合我们对业务需求的理解，我们审阅生成的分析文档，重点关注 [一致性](https://martinfowler.com/articles/structured-prompt-driven/alignment.html) 技能中突出显示的领域。此次审阅有两个目的：一是确认我们的理解与人工智能的解读一致；二是发现人工智能可能提出的、我们未曾考虑到的极端情况或边界场景。

In this specific instance, the review focused on several critical areas:  
在本次具体案例中，审查重点关注了以下几个关键领域：

- Whether the Strategy Pattern was appropriately considered.  
	战略模式是否得到了恰当的考虑。
- Adherence to the OOP principles established in the existing system, specifically ISP and SRP.  
	遵循现有系统中建立的面向对象编程原则，特别是 ISP 和 SRP。
- The validity of the proposed strategy for adding new fields.  
	所提出的新增字段策略的有效性。
- Identifying edge cases not previously anticipated.  
	识别之前未预料到的极端情况。
- Uncovering potential technical risks.  
	发现潜在的技术风险。

Upon completing the review, the AI's analysis largely aligned with our architectural intent; in fact, its considerations were even more comprehensive than ours in certain areas.  
审查结束后，人工智能的分析结果与我们的架构意图基本一致；事实上，在某些方面，它的考虑甚至比我们的更加全面。

![](https://martinfowler.com/articles/structured-prompt-driven/example-analysis-review.png)

Edge cases and risks from the [analysis document](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/analysis/GGQPA-001-202603191100-%5BAnalysis%5D-multi-plan-billing-model-aware-pricing.md#edge-cases)  
极端情况和风险 [分析文件](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/analysis/GGQPA-001-202603191100-%5BAnalysis%5D-multi-plan-billing-model-aware-pricing.md#edge-cases)

To be transparent, at this stage we only possess a high-level conceptual alignment. While we can quickly envision the implementation for areas where we have prior experience, we cannot completely map out all the granular technical details for the unfamiliar parts right now.  
坦白地说，现阶段我们仅具备高层次的概念框架。对于我们已有经验的领域，我们可以迅速构思实施方案；但对于不熟悉的领域，我们目前还无法完全梳理所有具体的技术细节。

However, that is perfectly fine. The overarching direction is aligned. We can proceed to the next step: observing how the AI “simulates” the concrete implementation details within our established framework and context. Once we have these tangible details, we can uncover deeper, hidden issues and make informed trade-offs based on the actual scenario—adopting the approaches where the benefits outweigh the drawbacks, and discarding the rest.  
然而，这完全没问题。总体方向已经明确。我们可以进入下一步：观察人工智能如何在既定框架和背景下“模拟”具体的实施细节。一旦掌握了这些切实的细节，我们就能发现更深层次的、隐藏的问题，并根据实际情况做出明智的权衡——采纳那些利大于弊的方法，舍弃其余的方法。

Decision: accept the analysis as-is and proceed.  
决定：接受现有分析结果并继续进行。

### Step 4: Generate structured prompt步骤 4：生成结构化提示

### How spdd-reasons-canvas worksspdd-reasons-canvas 的工作原理

This command reads business context (the output of `/spdd-analysis`, or a direct requirements description) and combines it with the current state of the codebase. It then generates a design specification across all seven REASONS dimensions — from “why are we doing this” to “what must we not do.”  
此命令读取业务上下文（以下输出）： `/spdd-analysis` ，或直接需求描述），并将其与当前代码库状态相结合。然后，它生成涵盖所有七个 REASONS 维度的设计规范——从“我们为什么要这样做”到“我们绝对不能做什么”。

The output is an executable blueprint. The Operations section is precise down to method signatures, parameter types, and execution steps.  
输出结果是一个可执行蓝图。“操作”部分非常精确，包括方法签名、参数类型和执行步骤。

Instruction:操作说明：

/spdd-reasons-canvas @GGQPA-001-202603191100-\[Analysis\]-multi-plan-billing-model-aware-pricing.md  
/spdd-reasons-canvas @GGQPA-001-202603191100-\[分析\]-多方案计费模型感知定价.md

Generated artifact: [the initial structured prompt](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/prompt/GGQPA-001-202603191105-%5BFeat%5D-multi-plan-billing-model-aware-pricing.md).  
生成的工件： [初始结构化提示](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/prompt/GGQPA-001-202603191105-%5BFeat%5D-multi-plan-billing-model-aware-pricing.md) 。

By this point, we've already gone through high-level strategy during the analysis phase—so when reviewing the structured prompt, we're not starting from scratch. Instead, we're examining how the AI has translated our shared understanding into the REASONS Canvas structure: from strategy to abstraction to concrete details.  
到目前为止，我们已经在分析阶段完成了高层次的战略规划——因此，在回顾结构化提示时，我们并非从零开始。相反，我们是在考察人工智能如何将我们共同的理解转化为 REASONS Canvas 的结构：从战略到抽象再到具体细节。

Think of it as a progression: the analysis phase gave us strategic clarity; now we're checking whether that clarity has been faithfully carried through into the architectural abstractions and implementation specifics. This is intent alignment at a deeper level—ensuring that before any code is generated, the AI has effectively “simulated” the entire solution within our defined framework. We get to review from a global perspective rather than getting lost in details from the start.  
可以把它看作一个循序渐进的过程：分析阶段让我们明确了战略方向；现在，我们要检查这种清晰的战略方向是否忠实地体现在架构抽象和具体实现中。这是更深层次的意图一致性——确保在生成任何代码之前，人工智能已经有效地在我们定义的框架内“模拟”了整个解决方案。这样，我们就可以从一个全局的角度进行审查，而不是从一开始就陷入细节之中。

Focus the review on the areas highlighted in the [abstraction-first](https://martinfowler.com/articles/structured-prompt-driven/abstraction-first.html) skill. In this case, this foundational context is already embedded in the codebase and the [previous structured prompt](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/prompt/GGQPA-XXX-202603131758-%5BFeat%5D-api-token-usage-billing.md). Consequently, when generating the structured prompt for this iteration, the AI naturally factors in these architectural guidelines and OO principles. As a result, even though the generated content is highly complex, there are remarkably few major issues. We can opt to proceed with generating the code using this structured prompt first, and then conduct a deeper review to identify any potential code-level anomalies later.  
重点审查 [抽象优先](https://martinfowler.com/articles/structured-prompt-driven/abstraction-first.html) 技能中强调的领域。在本例中，这些基础上下文已经嵌入到代码库和 [之前的结构化提示](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/prompt/GGQPA-XXX-202603131758-%5BFeat%5D-api-token-usage-billing.md) 中。因此，在为本次迭代生成结构化提示时，AI 会自然而然地考虑这些架构指南和面向对象原则。结果，即使生成的内容非常复杂，但重大问题却很少。我们可以选择先使用此结构化提示生成代码，然后再进行更深入的审查，以识别任何潜在的代码级异常。

So far, we have reached a strong consensus at the intent level, clarifying both the core problem and the resolution path. While there may be slight omissions in the details, this is not a concern; having aligned on the overall scope with the AI makes local optimizations highly controllable. Now, we transition into the code generation phase.  
目前，我们在意图层面已达成高度共识，明确了核心问题和解决方案。虽然细节上可能存在一些疏漏，但这无关紧要；与人工智能就整体范围达成一致，使得局部优化具有很高的可控性。现在，我们将进入代码生成阶段。

### Step 5: Generate code步骤 5：生成代码

This step is more involved as we are generating the product code, tests, and our reviews have two alternative outcomes.  
这一步骤比较复杂，因为我们需要生成产品代码、测试，而且我们的评审结果有两种不同的选择。

#### Generate product code 生成产品代码

Once our structured prompt is locked in, use it to generate the product code.  
一旦我们的结构化提示确定下来，就用它来生成产品代码。

### How spdd-generate worksspdd-generate 的工作原理

This command reads the REASONS Canvas and generates code task by task, following the order defined in Operations. It strictly adheres to the coding standards in Norms and the constraints in Safeguards — no improvisation, no features beyond what the spec defines.  
此命令读取 REASONS Canvas，并按照 Operations 中定义的顺序逐个任务生成代码。它严格遵守 Norms 中的编码标准和 Safeguards 中的约束——不允许任何即兴发挥，也不允许添加超出规范定义范围的功能。

The core principle: the prompt captures the intent, and the code is the implementation of that intent. Generated code must correspond one-to-one with this specification.  
核心原则：提示信息表达意图，代码实现该意图。生成的代码必须与此规范一一对应。

Instruction:操作说明：

/spdd-generate @GGQPA-001-202603191105-\[Feat\]-multi-plan-billing-model-aware-pricing.md

Generated artifact: [code generated based on the structured prompt](https://github.com/gszhangwei/token-billing/commit/ac3e07b396e3ee8ab54b5a5ab838ff07a6bdd64b).  
生成的工件： [根据结构化提示生成的代码](https://github.com/gszhangwei/token-billing/commit/ac3e07b396e3ee8ab54b5a5ab838ff07a6bdd64b) 。

Thanks to the multiple rounds of logical deduction we did earlier using structured prompts, we approach the code review with a clear focus and set of priorities:  
由于我们之前使用结构化提示进行了多轮逻辑推理，因此我们能够以清晰的重点和优先级进行代码审查：

1. Architecture: does the code strictly follow our expected 3-tier architecture?  
	架构：代码是否严格遵循我们预期的三层架构？
2. Business logic: does the Service layer implementation perfectly align with our initial intent?  
	业务逻辑：服务层的实现是否完全符合我们的最初意图？
3. Scope of change: are the modifications strictly confined to the boundaries defined by the structured prompt, avoiding unrelated changes or scope creep?  
	变更范围：修改是否严格限制在结构化提示所定义的范围内，避免无关的变更或范围蔓延？

In this specific case, thanks to the highly precise context, the generated code largely met our expectations, aside from a few potential “magic numbers.” We will optimize these out once the functional verification is complete.  
在这个特定案例中，由于上下文非常精确，生成的代码基本符合我们的预期，只有少数几个潜在的“魔法数字”例外。我们将在功能验证完成后对这些数字进行优化。

The key takeaway here is: don't worry about making mistakes, and don't stress over not catching every single detail perfectly on the first try. As long as we keep iterating and advancing through the SPDD workflow, there are plenty of opportunities to course-correct. Minor code smells are fine for now—we verify the core functionality first, then circle back to optimize.  
关键在于：不要担心犯错，也不要纠结于第一次没能完美地处理所有细节。只要我们不断迭代并推进 SPDD 工作流程，就有很多机会进行修正。目前一些小的代码异味是可以接受的——我们首先验证核心功能，然后再回头进行优化。

#### Feature verification 功能验证

During feature validation, the SPDD workflow provides the `/spdd-api-test` command to generate functional testing scripts. 3  
在功能验证期间，SPDD 工作流程提供了 `/spdd-api-test` 命令生成功能测试脚本 。3

3: Since this is an optional command, if it is not available in your local environment, you can generate it by running `openspdd generate spdd-api-test`.

### How spdd-api-test worksspdd-api-test 的工作原理

This command extracts API endpoint information from the code implementation or acceptance criteria and generates a cURL-based test script. The script includes a structured test-case table covering normal scenarios, boundary conditions, and error scenarios. When executed, it outputs expected-vs-actual comparison results.  
此命令从代码实现或验收标准中提取 API 端点信息，并生成基于 cURL 的测试脚本。该脚本包含一个结构化的测试用例表，涵盖正常场景、边界条件和错误场景。执行后，脚本会输出预期结果与实际结果的对比。

Instruction:操作说明：

/spdd-api-test

Generated artifact: [the API test script](https://github.com/gszhangwei/token-billing/blob/after-enhancement/scripts/test-api.sh).  
生成的工件： [API 测试脚本](https://github.com/gszhangwei/token-billing/blob/after-enhancement/scripts/test-api.sh) 。

Guided by the defined rules in the command, the AI generates a script that formulates the required test scenarios using curl commands. We can review these AI-generated scenarios in the “TEST CASE OVERVIEW” section of the script.  
根据命令中定义的规则，人工智能会生成一个脚本，该脚本使用 curl 命令构建所需的测试场景。我们可以在脚本的“测试用例概述”部分查看这些由人工智能生成的场景。

![](https://martinfowler.com/articles/structured-prompt-driven/example-script-generation.png)

Generated API Test Script  
生成的 API 测试脚本

Execution: once the script is generated, run it:  
执行：脚本生成后，运行它：

`sh scripts/test-api.sh` 运行脚本/test-api.sh

Result: all functional tests passed successfully.  
结果：所有功能测试均成功通过。

![](https://martinfowler.com/articles/structured-prompt-driven/example-test-results.png)

API Test Results API 测试结果

#### Code review & final adjustments代码审查和最终调整

Thanks to the rigorous intent alignment in the first several steps, the heavy lifting is already done. At this stage, the remaining issues are usually minor logic discrepancies or surface-level code smells.  
由于前几个步骤中严格遵循了意图，最艰巨的工作已经完成。在这个阶段，剩下的问题通常是一些细微的逻辑差异或表面的代码异味。

To maintain precision in our engineering practices, we categorize these final adjustments into two distinct types—based on whether they change the system's observable behavior—and handle them using different strategies within the SPDD workflow:  
为了保持工程实践的精确性，我们将这些最终调整分为两种截然不同的类型——根据它们是否会改变系统的可观察行为——并在 SPDD 工作流程中使用不同的策略来处理它们：

![](https://martinfowler.com/articles/structured-prompt-driven/code-review.svg)

Two responses to code review changes  
对代码审查变更的两种回应

#### Logic corrections (behavior changes)逻辑修正（行为改变）

Strategy: update the prompt first, then generate code. For issues related to business rules or logic mismatches (which inherently change the observable behavior of the software), always update the structured prompt to lock in the correct intent before touching the code. This is an update or bug fix, not a refactoring.  
策略：先更新提示信息，再生成代码。对于与业务规则或逻辑不匹配相关的问题（这些问题本质上会改变软件的可观察行为），务必在修改代码之前更新结构化提示信息，以确保意图正确。这是一次更新或错误修复，而非重构。

For instance, when persisting `modelId` in the bill, we currently allow this field to be nullable. The underlying reason is the need to maintain backward compatibility with historical data, making this workaround a reasonable architectural decision.  
例如，在账单中持久化 `modelId` 时，我们目前允许该字段为空。根本原因在于需要保持与历史数据的向后兼容性，因此这种变通方案是合理的架构选择。

![](https://martinfowler.com/articles/structured-prompt-driven/example-prompt-update-a.png)

Prompt needs update 提示需要更新

However, there is an alternative. If the business stakeholders can confirm what the `modelId` value should be prior to this change, we can unify the system's behavior and eliminate this potential technical debt. Let's assume that, after confirming with the business, the `modelId` for all historical bills should be set to `fast-model`.  
然而，还有另一种方法。如果业务利益相关者能在更改之前确认 `modelId` 值应该是什么，我们就可以统一系统的行为，并消除潜在的技术债务。假设在与业务部门确认后，所有历史账单的 `modelId` 都应该设置为 `fast-model` 。

With this clear intent, we interact with the AI:  
怀着这样的明确意图，我们与人工智能进行互动：

### How spdd-prompt-update worksspdd-prompt-update 的工作原理

This command incrementally updates the existing Canvas. It modifies only the sections affected by the change and preserves everything else. Based on the type of change — new requirement, architectural adjustment, or constraint change — it automatically determines which REASONS dimensions need updating.  
此命令会逐步更新现有画布。它仅修改受更改影响的部分，并保留其他所有内容。根据更改类型（新需求、架构调整或约束更改），它会自动确定哪些 REASONS 维度需要更新。

This differs from `/spdd-sync`: sync flows from code to spec when code has changed; prompt-update flows from requirements to spec when requirements have changed.  
这与 `/spdd-sync` 不同：当代码发生更改时，同步流程从代码流向规范；当需求发生更改时，提示更新流程从需求流向规范。

Instruction:操作说明：

/spdd-prompt-update @GGQPA-001-202603191105-\[Feat\]-multi-plan-billing-model-aware-pricing.md

model\_id is a required field, and its default value is fast-model. Based on this decision, update the corresponding parts of the structured prompt.  
model\_id 为必填字段，其默认值为 fast-model。根据此决定，更新结构化提示的相应部分。

The AI updates the structured prompt based on this instruction.  
人工智能会根据这条指令更新结构化提示。

Updated artifact: [the updated structured prompt](https://github.com/gszhangwei/token-billing/commit/904747b35d4888c51ec46faa533c6605e340cdf5).  
更新后的工件： [更新后的结构化提示](https://github.com/gszhangwei/token-billing/commit/904747b35d4888c51ec46faa533c6605e340cdf5) 。

Once confirmed, use the `/spdd-generate` command to update the corresponding code based on the newly updated structured prompt:  
确认后，使用 `/spdd-generate` 命令根据新更新的结构化提示符更新相应的代码：

/spdd-generate @GGQPA-001-202603191105-\[Feat\]-multi-plan-billing-model-aware-pricing.md

The AI, guided by the rules defined within the `/spdd-generate` command, comprehends the required changes and performs targeted updates exclusively on the affected codebase.  
人工智能在规则的指导下运行，这些规则定义在…… `/spdd-generate` 命令能够理解所需的更改，并专门对受影响的代码库执行有针对性的更新。

Updated artifact: [the updated code](https://github.com/gszhangwei/token-billing/commit/d140a0a2ed01387714f4ecc74604f570c05fb86e).  
更新后的代码： [更新后的代码](https://github.com/gszhangwei/token-billing/commit/d140a0a2ed01387714f4ecc74604f570c05fb86e) 。

It is important to note that we do not regenerate the entire codebase. We continue using the existing structured prompt and the AI handles targeted diffs:  
需要注意的是，我们不会重新生成整个代码库。我们会继续使用现有的结构化提示，由人工智能处理特定差异：

1. Identify the mismatch: notice that the behavior of `modelId` during persistence is inconsistent with the new business requirement (it must be mandatory with a default).  
	找出不匹配之处：注意以下行为 持久化期间的 `modelId` 与新的业务要求不一致（必须是必填项，并具有默认值）。
2. Target the prompt snippet: copy the specific section from the structured prompt that defines the outdated logic.  
	针对提示片段：从结构化提示中复制定义过时逻辑的特定部分。
3. Update the prompt: paste the extracted snippet into the chat alongside the revised business rule, instructing the AI to update the structured prompt first.  
	更新提示：将提取的片段粘贴到聊天中，与修改后的业务规则一起，指示 AI 首先更新结构化提示。
4. Generate targeted code updates: once the prompt reflects the new truth, run `/spdd-generate` pointing to the updated file. The AI automatically performs targeted diffs exclusively on the affected codebase, rather than regenerating everything from scratch.  
	生成针对性代码更新：一旦提示信息反映出新的情况，运行 `/spdd-generate` 命令并指向更新后的文件。AI 会自动仅对受影响的代码库执行针对性的差异比较，而不是从头开始重新生成所有内容。

#### Refactoring (clean code & style)重构（代码整洁与风格）

> “A change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.”  
> “对软件内部结构进行的更改，使其更容易理解且修改成本更低，同时又不改变其可观察的行为。”
> 
> \-- Martin Fowler ——马丁·福勒

Strategy: refactor the code first, then sync back to the prompt. For structural or stylistic issues that do not change observable behavior, instruct the AI to refactor the code directly, and then use a sync command to update the prompt documentation.  
策略：先重构代码，然后同步到提示。对于不会改变可观察行为的结构或风格问题，指示 AI 直接重构代码，然后使用同步命令更新提示文档。

For example, the AI-generated `BillingServiceImpl` class contains some hardcoded magic numbers that need to be extracted into meaningful constants.  
例如，AI 生成的 `BillingServiceImpl` 类包含一些硬编码的魔法数字，需要将其提取为有意义的常量。

```
private int calculateRemainingQuota(String customerId, PricingPlan plan) {
        if (plan.getMonthlyQuota() == null || plan.getMonthlyQuota() == 0) {
            return 0;
        }

        LocalDate currentDate = LocalDate.now(ZoneOffset.UTC);
        LocalDateTime monthStart = currentDate.withDayOfMonth(1).atStartOfDay();
        LocalDateTime monthEnd = currentDate.plusMonths(1).withDayOfMonth(1).atStartOfDay();

        Integer currentMonthUsage = billRepository.sumIncludedTokensUsedForMonth(customerId, monthStart, monthEnd);
        return plan.getMonthlyQuota() - currentMonthUsage;
    }
```

Instruction 1:说明1：

@BillingServiceImpl.java In the calculateRemainingQuota method, there are some magic numbers that need to be processed as constants  
@BillingServiceImpl.java 在 calculateRemainingQuota 方法中，有一些需要作为常量处理的特殊数字。

The AI executes the code refactoring based on this instruction (remember the golden rule: always refactor in small, incremental steps). If the output meets our expectations, we use the `/spdd-sync` command to synchronize these newly updated code details back to their corresponding locations within the structured prompt.  
AI 会根据这条指令执行代码重构。 （记住黄金法则：始终以小步、增量的方式进行重构） 步骤）。如果输出符合我们的预期，我们就使用 `/spdd-sync` 命令将这些新更新的代码详细信息同步回结构化提示符中的相应位置。

Instruction 2:说明 2：

### How spdd-sync worksspdd-sync 的工作原理

This command compares the current code against the Canvas specification, then synchronizes code-side changes (refactoring, bug fixes, new components) back into the Canvas.  
该命令将当前代码与 Canvas 规范进行比较，然后将代码端更改（重构、错误修复、新组件）同步回 Canvas。

The goal is to keep the Canvas as an accurate design document for the current code, rather than an outdated historical record.  
目标是使 Canvas 成为当前代码的准确设计文档，而不是过时的历史记录。

/spdd-sync

The AI summarizes the changes based on the rules defined in the `/spdd-sync` command. It then follows the structural requirements of the REASONS Canvas to write the detailed code description updates back into the corresponding sections of the structured prompt.  
人工智能根据规则总结了这些变化。 `/spdd-sync` 命令。然后，它遵循 REASONS Canvas 的结构要求，将详细的代码描述更新写回结构化提示的相应部分。

Once both commands are executed, we can see all the prompt and code changes [here](https://github.com/gszhangwei/token-billing/commit/56cc47e1ab6d4ec75528be276c92e0e93209bb84).  
两条命令执行完毕后，我们可以 [在这里](https://github.com/gszhangwei/token-billing/commit/56cc47e1ab6d4ec75528be276c92e0e93209bb84) 看到所有的提示符和代码变化。

For any deeper or hidden code smells, simply repeat these steps. The golden rule is to always keep the structured prompt synchronized with your latest codebase.  
对于任何更深层次或隐藏的代码异味，只需重复这些步骤即可。黄金法则是始终保持结构化提示与最新代码库同步。

#### Regression test 回归测试

Once all optimizing is complete, restart the service and run the API test script one more time to ensure no core functionality was broken during the cleanup.  
所有优化完成后，重新启动服务并再次运行 API 测试脚本，以确保在清理过程中没有破坏任何核心功能。

Result: all passed.结果：全部通过。

![](https://martinfowler.com/articles/structured-prompt-driven/example-regression-results.png)

Regression Test Results 回归测试结果

### Step 6: generate unit tests步骤 6：生成单元测试

Functional testing alone is insufficient for robust validation; it acts primarily as an auxiliary check and is not factored into code coverage metrics. The final sign-off on core logic requires comprehensive unit tests. Currently, the SPDD workflow does not have dedicated testing commands finalized (these will be introduced in future iterations). As an interim solution, we utilize a template-driven approach to generate structured prompts for unit testing.  
仅靠功能测试不足以进行稳健的验证；它主要起到辅助检查的作用，并未纳入代码覆盖率指标的考量范围。核心逻辑的最终验收需要全面的单元测试。目前，SPDD 工作流程中尚未最终确定专门的测试命令（这些命令将在未来的版本中引入）。作为过渡方案，我们采用模板驱动的方法来生成结构化的单元测试提示。

#### Generate the initial test prompt生成初始测试提示

We begin by combining the implementation details with our standardized testing template to generate a baseline test prompt.  
首先，我们将实现细节与标准化的测试模板结合起来，生成基准测试提示。

Instruction:操作说明：

Based on the implementation details prompt @GGQPA-001-202603191105-\[Feat\]-multi-plan-billing-model-aware-pricing.md, combined with the template [@TEST-SCENARIOS-TEMPLATE.md](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/template/TEST-SCENARIOS-TEMPLATE.md), please generate a test prompt file.  
请根据实施细节提示 @GGQPA-001-202603191105-\[Feat\]-multi-plan-billing-model-aware-pricing.md，结合模板 [@TEST-SCENARIOS-TEMPLATE.md](https://github.com/gszhangwei/token-billing/blob/after-enhancement/spdd/template/TEST-SCENARIOS-TEMPLATE.md) ，生成测试提示文件。

#### Deduplicate and refine scenarios去重并优化场景

After generating the initial structured test prompt, some of the proposed test scenarios were duplicates of what we already had. To address this, we continued the dialogue, instructing the AI to cross-reference the generated prompt with the existing test suite, identify the genuinely new scenarios, and remove any redundancies.  
在生成初始结构化测试提示后，我们发现部分建议的测试场景与我们已有的场景重复。为了解决这个问题，我们继续与人工智能进行交互，指示它将生成的提示与现有测试套件进行交叉比对，识别出真正的新场景，并删除任何冗余内容。

Instruction:操作说明：

@GGQPA-001-202603191105-\[Test\]-multi-plan-billing-model-aware-pricing.md There are tests that are duplicated with existing ones, compare the relevant tests that exist, and then only add tests for new scenarios  
@GGQPA-001-202603191105-\[Test\]-multi-plan-billing-model-aware-pricing.md 存在一些与现有测试重复的测试，请比较现有相关测试，然后仅针对新场景添加测试。

Updated artifact: [the test structured prompt](https://github.com/gszhangwei/token-billing/commit/c910aede947bfeae12eedeff7991b506d2e015db).  
更新后的工件： [测试结构化提示](https://github.com/gszhangwei/token-billing/commit/c910aede947bfeae12eedeff7991b506d2e015db) 。

#### Generate the unit test code生成单元测试代码

Once the refined test scenarios are reviewed and confirmed, use the finalized test prompt to drive the actual code generation.  
一旦完善的测试场景经过审查和确认，就使用最终确定的测试提示来驱动实际的代码生成。

Instruction:操作说明：

Based on the generated test prompt @GGQPA-001-202603191105-\[Test\]-multi-plan-billing-model-aware-pricing.md, please generate the corresponding unit test code.  
请根据生成的测试提示 @GGQPA-001-202603191105-\[Test\]-multi-plan-billing-model-aware-pricing.md 生成相应的单元测试代码。

Result: all tests passed. [Commit for tests](https://github.com/gszhangwei/token-billing/commit/6461da90fffcff94ab9e1f57c6fb4476dd122922).  
结果：所有测试均通过。 [提交测试](https://github.com/gszhangwei/token-billing/commit/6461da90fffcff94ab9e1f57c6fb4476dd122922) 。

### What this example delivered这个例子说明了什么

This marks the conclusion of a complete SPDD workflow. Through this standardized process, we successfully delivered the following key outcomes:  
这标志着完整的 SPDD 工作流程的完成。通过这一标准化流程，我们成功实现了以下关键成果：

1. A business logic implementation with exceptionally high intent alignment (~99%).  
	业务逻辑实现具有极高的意图一致性（~99%）。
2. Complete engineering transparency, including a clear understanding of the implementation path, technical decisions, and accepted trade-offs.  
	完全的工程透明度，包括对实施路径、技术决策和可接受的权衡取舍的清晰理解。
3. A structured prompt asset tightly synchronized with the current codebase, laying a solid foundation for future iterations.  
	结构化的提示资源与当前代码库紧密同步，为未来的迭代奠定了坚实的基础。
4. Compounding human expertise, fostering a continuous accumulation of developer experience and mental models as we iterate collaboratively with the AI.  
	通过与人工智能协同迭代，不断积累人类专业知识、开发者经验和思维模型。

[View the complete code diff for this enhancement](https://github.com/gszhangwei/token-billing/compare/before-enhancement...after-enhancement) on GitHub.  
在 GitHub 上 [查看此增强功能的完整代码差异](https://github.com/gszhangwei/token-billing/compare/before-enhancement...after-enhancement) 。

We've also prepared a bonus enhancement feature— [Enterprise Plan Volume-Based Tiered Billing](https://github.com/gszhangwei/token-billing/blob/after-enhancement/requirements/%5BUser-story-2%5DEnterprise-Plan-Volume-Based-Tiered-Billing.md). If you're interested in getting some hands-on practice, we highly encourage you to tackle it using the SPDD workflow outlined above.  
我们还准备了一项额外的增强功能 [——企业计划基于使用量的分级计费](https://github.com/gszhangwei/token-billing/blob/after-enhancement/requirements/%5BUser-story-2%5DEnterprise-Plan-Volume-Based-Tiered-Billing.md) 。如果您有兴趣进行一些实际操作，我们强烈建议您使用上面概述的 SPDD 工作流程来尝试一下。

## Three core skills 三大核心技能

SPDD is a material change in how developers build software. In our work we have identified three core skills that they need in order to do their work effectively. These skills reflect where the value of developers is shifting in an AI-assisted world.  
SPDD（软件开发流程驱动的开发）从根本上改变了开发者构建软件的方式。我们的研究发现，开发者需要掌握三项核心技能才能高效完成工作。这些技能体现了在人工智能辅助的世界中，开发者的价值正在发生怎样的转变。

### Abstraction first 抽象优先

design before you generate  
在生成之前进行设计

Before generating any code, you need to be clear about what objects exist, how they collaborate, and where the boundaries are. Without that, AI often sprints on implementation details while the structure falls apart. Unclear responsibilities, duplicated logic, inconsistent interfaces, and the cost shows up later in review and rework.  
在编写任何代码之前，您需要明确存在哪些对象、它们如何协作以及它们的边界在哪里。否则，人工智能往往会在实现细节上投入过多精力，而忽略了整体架构的完整性。职责不清、逻辑重复、接口不一致以及由此带来的成本，最终都会在后续的评审和返工中显现出来。

[read more… 阅读更多…](https://martinfowler.com/articles/structured-prompt-driven/abstraction-first.html)

### Alignment 结盟

lock intent before you write code  
在编写代码之前锁定意图

Before implementation, you need to make “what we will do / what we won't do” explicit, and agree on the standards and hard constraints up front. Otherwise you end up with fast output and slow rework.  
在实施之前，你需要明确“我们将要做什么/我们将不做什么”，并事先就标准和硬性限制达成一致。否则，最终会导致快速产出和缓慢返工。

[read more… 阅读更多…](https://martinfowler.com/articles/structured-prompt-driven/alignment.html)

### Iterative Review 迭代审查

turn output into a controlled loop  
将输出转换为受控回路

You want AI assistance to behave like an engineering process, not a one-shot draft. Without a disciplined review-and-iterate loop, teams either keep forcing the model to patch things until the solution drifts, or they restart repeatedly and lose control of cost and time.  
你希望人工智能辅助像工程流程一样运作，而不是一蹴而就的草稿。如果没有严格的审查和迭代循环，团队要么不断强迫模型修补问题，直到解决方案偏离原有方向；要么反复重头再来，最终失去对成本和时间的控制。

[read more… 阅读更多…](https://martinfowler.com/articles/structured-prompt-driven/iterative-review.html)

## Where SPDD fits SPDD 的适用范围

### Fitness assessment 体能评估

SPDD is an engineering investment. The table below rates how well it pays off by scenario, from highly recommended (5 stars) to not suitable (1 star).  
SPDD 是一项工程投资。下表根据不同场景对其投资回报率进行评级，从强烈推荐（5 星）到不适用（1 星）。

| Rating 等级 | Scenario 设想 | Notes 笔记 |
| --- | --- | --- |
| ★★★★★ | Scaled, standardized delivery   规模化、标准化的交付 | High-repeat business logic that needs long-term maintainability (e.g., building many similar APIs, automating core business workflows).   需要长期维护的高重复性业务逻辑（例如，构建许多类似的 API，自动化核心业务工作流程）。 |
| ★★★★★ | High compliance and hard constraints   高度合规性和严格的限制 | Environments where you must follow regulations, security standards, or strict architectural rules (e.g., financial core systems, multi-channel / multi-client deployments).   必须遵守法规、安全标准或严格的架构规则的环境（例如，金融核心系统、多渠道/多客户端部署）。 |
| ★★★★☆ | Team collaboration and auditability   团队协作和可审计性 | Multi-person delivery where changes must be fully traceable and reviewable end-to-end.   多人交付，变更必须完全可追溯和可审查，贯穿整个流程。 |
| ★★★★☆ | Cross-cutting consistency work   跨领域一致性工作 | Complex refactors where logic must stay tightly synchronized across multiple microservices or different languages.   复杂的重构，其中逻辑必须在多个微服务或不同语言之间保持紧密同步。 |
| ★★☆☆☆ | Firefighting hotfixes 消防热修复 | “Stop the bleeding” production fixes where speed matters more than architectural discipline.   “止血”式生产修复方案，旨在解决速度比架构规范更重要的问题。 |
| ★★☆☆☆ | Exploratory spikes 探索性尖峰 | When the goal is to validate an idea quickly rather than ship production-quality software, SPDD's governance overhead won't pay back.   如果目标是快速验证一个想法，而不是交付生产质量的软件，那么 SPDD 的治理开销就得不偿失了。 |
| ★★☆☆☆ | One-off scripts 一次性脚本 | Disposable data cleanup or temporary scripts where SPDD's upfront cost is too high relative to the value.   一次性数据清理或临时脚本，适用于 SPDD 前期成本相对于其价值过高的情况。 |
| ★☆☆☆☆ | Context black holes 背景黑洞 | When the domain is poorly defined and business rules are unclear, you can't set meaningful boundaries for the model.   当领域定义不明确且业务规则不清楚时，就无法为模型设定有意义的边界。 |
| ★☆☆☆☆ | Pure creative / visual work   纯粹的创意/视觉作品 | Tasks driven by taste and aesthetics rather than logic (e.g., UI visual exploration, marketing copy).   以品味和审美而非逻辑为驱动的任务（例如，用户界面视觉探索、营销文案）。 |

### Trade-offs to consider 需要考虑的权衡因素

**Return on investment 投资回报率**

| Benefit 益处 | Impact 影响 | Speed 速度 | What you get 你将获得什么 |
| --- | --- | --- | --- |
| Determinism 决定论 | High 高的 | Immediate 即时 | Encode logic in a precise spec, which significantly reduces hallucination and “creative” interpretation.   将逻辑编码到精确的规范中，可以显著减少幻觉和“创造性”解释。 |
| Traceability 可追溯性 | High 高的 | Immediate 即时 | Every meaningful change can be traced back to the structured prompt, closing the audit loop.   每一个有意义的变化都可以追溯到结构化的提示，从而形成完整的审核闭环。 |
| Faster reviews 更快的审核 | High 高的 | Short-term 短期 | Code “arrives” closer to team standards, so reviews focus on logic and design, not formatting and cleanup.   代码“最终”更接近团队标准，因此代码审查侧重于逻辑和设计，而不是格式和清理。 |
| Explainability 可解释性 | Medium-High 中高 | Gradual 逐渐地 | Intent and behavior are visible at the natural-language level, lowering the cognitive load for understanding and maintenance.   意图和行为在自然语言层面是可见的，降低了理解和维持的认知负荷。 |
| Safer evolution 更安全的进化 | High 高的 | Long-term 长期 | Well-defined boundaries and stepwise implementation make targeted changes lower-risk and easier to iterate.   明确的界限和分步实施使有针对性的改变风险更低，也更容易迭代。 |

**Upfront investment 前期投资**

| Area 区域 | Barrier 障碍 | Nature 自然 | What it takes 需要什么 |
| --- | --- | --- | --- |
| Mindset shift 思维转变 | High 高的 | Ongoing training 持续培训 | Teams have to adapt to “design first” rather than “code first.”   团队必须适应“先设计后编码”的模式。 |
| Senior expertise up front   前期资深专家 | Medium-High 中高 | Per-feature 按功能 | Engineers who can translate business rules into clean abstractions and design constraints.   能够将业务规则转化为清晰的抽象概念和设计约束的工程师。 |
| Automation tooling 自动化工具 | Medium 中等的 | Infrastructure setup 基础设施搭建 | Without automation, SPDD hits a throughput ceiling and struggles to keep prompts consistent. [openspdd](https://github.com/gszhangwei/open-spdd) runs the workflow in this article—from analysis and structured REASONS prompts through code and optional test support—as repeatable CLI steps, so artifacts stay versioned and reviewable instead of trapped in chat. Larger organizations may still layer a knowledge platform on top to manage and reuse assets at scale.   如果没有自动化，SPDD 的吞吐量会达到瓶颈，并且难以保持提示的一致性。openspdd [将](https://github.com/gszhangwei/open-spdd) 本文中的工作流程（从分析和结构化的 REASONS 提示到代码和可选的测试支持）作为可重复的 CLI 步骤运行，从而使工件保持版本控制和可审查性，而不是滞留在聊天记录中。规模较大的组织可能仍然会在其之上叠加一个知识平台，以便大规模地管理和重用资产。 |

## Closing 关闭

By using the REASONS Canvas, clarifying intent, establishing the right abstractions, breaking work into concrete tasks, and locking in boundaries, we give AI a well-defined space to operate. Within that space, SPDD may not be the shortest path to “generate code quickly,” but it is one of the most reliable ways to ship the right change with confidence.  
通过使用 REASONS Canvas，明确意图，建立恰当的抽象概念，将工作分解为具体任务，并设定边界，我们为 AI 提供了一个定义清晰的运行空间。在这个空间内，SPDD 或许不是“快速生成代码”的最短路径，但它却是确保交付正确变更并充满信心的最可靠方法之一。

It's also fair to say that SPDD shines most in logic-heavy domains. In areas driven by aesthetic judgment, frontend styling, for example, we're still exploring engineering patterns that can be as stable as purely logical construction.  
公平地说，SPDD 在逻辑密集型领域表现最为出色。而在受美学判断驱动的领域，例如前端样式设计，我们仍在探索能够像纯粹逻辑构建一样稳定的工程模式。

The framework in this article is only the “moves.” The real advantage comes from sharpening the meta-skills behind it: abstraction and modelling, systematic analysis, and a deep understanding of the business as a whole. Those are the human strengths that ultimately determine how much value we can get from AI.  
本文所阐述的框架仅仅是“步骤”。真正的优势在于提升其背后的元技能：抽象和建模、系统分析以及对整个业务的深刻理解。这些才是最终决定我们能从人工智能中获得多少价值的人类优势。

In the AI era, software development isn't a contest of model IQ. It's a contest of engineer cognitive bandwidth – how clearly we can think, frame problems, and make decisions.  
在人工智能时代，软件开发不再是模型智商的较量，而是工程师认知能力的较量——我们思考、构建问题和做出决策的清晰度。

We'll close with a quote that captures the spirit of SPDD:  
最后，我们引用一句能体现 SPDD 精神的话：

> “In science, if you know what you are doing, you shouldn't be doing it. In engineering, if you don't know what you are doing, you shouldn't be doing it.”  
> “在科学领域，如果你知道自己在做什么，就不应该去做。在工程领域，如果你不知道自己在做什么，就不应该去做。”
> 
> \-- [Richard W. Hamming](https://www.amazon.com/gp/product/9056995014/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=9056995014&linkCode=as2&tag=martinfowlerc-20)  
> —— [理查德·W·哈明](https://www.amazon.com/gp/product/9056995014/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=9056995014&linkCode=as2&tag=martinfowlerc-20)

---

## Acknowledgements 致谢

We'd like to express our sincere thanks to Martin Fowler. Despite a busy schedule, he invested deeply in this article — from sharpening the narrative structure and clarifying key concepts, to elevating the visual storytelling with improved and new diagrams. His keen eye for detail and commitment to precision profoundly shaped the final result.  
我们衷心感谢马丁·福勒。尽管他日程繁忙，但仍为本文倾注了大量心血——从完善叙事结构、阐明关键概念，到通过改进和新增图表提升视觉叙事效果。他对细节的敏锐洞察力和对精准度的执着追求，对最终成果产生了深远的影响。

We're also deeply grateful to Eric (Ke) Zhou, Wei Sun, Sara Michelazzo, Rebecca Parsons, Matteo Vaccari, May (Ping) Xu, Zhi Wang, Feng Chen and Da Cheng for their thoughtful critique and insights. Your input helped us clarify several key concepts that underpin the methodology.  
我们衷心感谢周克、孙伟、Sara Michelazzo、Rebecca Parsons、Matteo Vaccari、徐萍、王志、陈峰和程达的宝贵意见和深刻见解。你们的反馈帮助我们厘清了方法论中的几个关键概念。

We also want to recognize early practitioners: Jie Wang, Jian Gao, Yixuan Feng, Siyuan Li, Yixuan Li, Biao Tian, Wei Cheng, Qi Huang, and Yulong Li. Thank you for validating SPDD in real projects, and for your patience as the approach matured. Your frontline feedback has been foundational to making SPDD practical and robust.  
我们还要特别感谢早期实践者：王杰、高健、冯一轩、李思远、李一轩、田彪、程伟、黄琦和李玉龙。感谢你们在实际项目中验证了 SPDD，也感谢你们在方法成熟过程中给予的耐心。你们的一线反馈对于 SPDD 的实用性和稳健性至关重要。

Finally, in the spirit of practicing what we preach, this article itself was shaped with the assistance of large language models — Claude 4.5 Sonnet, Claude 4.6 Opus, Gemini 3.1 Pro, and ChatGPT 5.4. We relied on them for prose refinement, structural review, synthesizing suggestions, and as thought partners for continuous learning throughout the writing process. Their contributions are a fitting testament to the very approach this article describes.  
最后，为了践行我们所倡导的理念，本文的撰写也借助了大型语言模型——Claude 4.5 Sonnet、Claude 4.6 Opus、Gemini 3.1 Pro 和 ChatGPT 5.4。我们依靠它们进行文风润色、结构审查、综合建议，并在整个写作过程中将它们作为持续学习的伙伴。它们的贡献恰如其分地印证了本文所描述的方法。

## Footnotes 脚注

1: In a one-way pipeline, requirements produce code and the process ends; any later adjustment happens in code alone and the original intent drifts out of date. In SPDD the loop closes on two scales. Within an iteration, feedback flows back: logic corrections update the prompt before the code; refactoring syncs from code back to the prompt — so neither side silently diverges. Across iterations, the accumulated prompt assets — domain models, design decisions, norms, etc. — become the starting context for the next enhancement, so each cycle builds on a governed baseline rather than starting from scratch.  
1： 在单向流水线中，需求生成代码，流程结束；任何后续调整都仅发生在代码层面，最初的意图也随之过时。在 SPDD（需求驱动开发）中，循环在两个层面上得以实现。在迭代过程中，反馈是双向的：逻辑修正会在代码更新之前更新需求；重构会从代码同步到需求——因此双方都不会悄然偏离。在迭代过程中，积累的需求资源——领域模型、设计决策、规范等——会成为下一次增强的起点，因此每个周期都是在既定的基线基础上构建，而不是从零开始。

2: Since this is an optional command, if it is not available in your local environment, you can generate it by running `openspdd generate spdd-story`.  
2： 由于这是一个可选命令，如果您的本地环境中没有该命令，您可以通过运行 `openspdd generate spdd-story` 来生成它。

3: Since this is an optional command, if it is not available in your local environment, you can generate it by running `openspdd generate spdd-api-test`.  
3： 由于这是一个可选命令，如果它不可用，则 你可以运行以下命令来生成你的本地环境： `openspdd generate spdd-api-test` 。

Significant Revisions 重大修订

*28 April 2026:* initial publication