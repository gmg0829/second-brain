# DHH's new way of writing code
# DHH 的新编程方式

**Podcast**: The Pragmatic Engineer
**播客**: The Pragmatic Engineer
**Published**: 2026-04-09
**发布日期**: 2026-04-09
**Source**: https://podwise.ai/dashboard/episodes/7725884
**来源**: https://podwise.ai/dashboard/episodes/7725884
**Processed**: 2026-04-10
**处理日期**: 2026-04-10

---

## Summary
## 摘要

David Heinemeier Hansson (DHH), creator of Ruby on Rails and co-founder of 37signals, discusses how AI tools are reshaping software development. DHH details 37signals' "agent-first" approach, where AI agents handle initial coding drafts, reviewed and refined by experienced developers. He emphasizes that AI empowers senior engineers, enabling them to tackle ambitious projects previously deemed impractical, such as optimizing the fastest 1% of requests. DHH also stresses the importance of beautiful code and design, arguing that aesthetics are crucial for correctness and user satisfaction. While acknowledging potential anxieties around AI's impact on programmer roles, he maintains that skilled developers who embrace AI will become more valuable, focusing on product vision, communication, and system oversight.

David Heinemeier Hansson（DHH），Ruby on Rails 的创造者、37signals 的联合创始人，讨论了 AI 工具如何重塑软件开发。DHH 详细介绍了 37signals 的"智能体优先"方法论，即由 AI 智能体处理初始代码草稿，再由资深开发者审查和打磨。他强调，AI 赋能了资深工程师，使他们能够挑战此前被认为不切实际的雄心勃勃的项目，例如优化那最快的 1% 的请求。DHH 还强调美的代码和设计的重要性，认为美学对于正确性和用户满意度至关重要。在承认人们对 AI 影响程序员角色的潜在焦虑的同时，他坚持认为拥抱 AI 的熟练开发者将变得更有价值，专注于产品愿景、沟通和系统监督。

**Takeaways:**
**核心要点：**

1. The combination of agent harnesses and frontier models has unlocked a new paradigm where AI can produce code that meets the high aesthetic and functional standards of experienced developers, leading to its seamless integration into existing projects.
1. 智能体框架与前沿模型的结合开启了一个新范式：AI 生成的代码能够满足资深开发者的高美学和功能标准，从而实现与现有项目的无缝集成。

2. The most significant benefit of AI lies in its capacity to explore previously unconsidered projects and ideas, expanding the scope of what is possible rather than merely improving existing processes.
2. AI 最显著的受益在于其探索此前从未考虑过的项目和想法的能力，它扩大了可能性的边界，而不仅仅是在现有流程上做改进。

3. Senior developers are currently experiencing the greatest gains from AI acceleration due to their ability to critically assess agent outputs, ensure code quality, and redirect AI efforts effectively.
3. 资深开发者目前从 AI 加速中获益最多，因为他们有能力批判性地评估智能体的输出、确保代码质量，并有效地引导 AI 的工作方向。

4. Taste and beautiful software are not merely aesthetic preferences but are intrinsically linked to correctness and functionality, contributing significantly to user happiness and overall product success.
4. 品味与美的软件不仅仅是美学偏好，而是与正确性和功能性内在关联，对用户幸福感和整体产品成功贡献巨大。

5. The most effective approach to product development involves small teams composed of designers who also function as product managers and developers, fostering a deep understanding of the medium and enabling more coherent and innovative outcomes.
5. 最有效的产品开发方法是小团队，由兼任产品经理和开发者的设计师组成，这培养了对媒介的深刻理解，并产生更加连贯和创新的成果。

6. The industry may have reached "peak programmer" in terms of compensation and demand, as AI tools enable smaller teams to accomplish more, shifting the constraint value towards product management, customer empathy, and business acumen.
6. 在薪酬和需求方面，行业可能已达到"程序员巅峰"，因为 AI 工具使更小的团队能完成更多工作，约束价值正在向产品管理、客户共情和商业敏锐度转移。

7. The Unix philosophy of building small, interoperable tools is validated by AI agents, as CLIs and APIs enable agents to orchestrate complex workflows across different systems.
7. Unix 构建小型、可互操作工具的哲学得到了 AI 智能体的验证，因为 CLI 和 API 使智能体能够跨不同系统编排复杂工作流。

8. The most successful AI integration occurs when it enhances the enjoyment and satisfaction of developers, creating a "super mech suit" effect that amplifies their capabilities rather than replacing their creativity.
8. 最成功的 AI 整合发生在它提升开发者乐趣和满意度的时候，创造出一种"超级机械战甲"效应，放大他们的能力而非取代他们的创造力。

---

## Chapters
## 章节

### [00:00] Chapter 1: Valuing Software Engineering as a Craft: Aesthetics and Correctness
### [00:00] 第1章：将软件工程视为工艺：美学与正确性

The conversation begins with a discussion on the value of software engineering as a craft. Speaker 2 emphasizes the importance of aesthetics, suggesting that "when something is beautiful, it's likely to be correct." This principle is seen as applicable across various domains, including mathematics and physics.

对话从讨论软件工程作为工艺的价值开始。Speaker 2 强调美学的重要性，提出"当一个东西很美时，它很可能是正确的"。这一原则被认为适用于数学和物理等各个领域。

### [00:15] Chapter 2: AI's Impact on Software Development: Ambition, Workload, and Shifting Perspectives
### [00:15] 第2章：AI 对软件开发的影响：雄心、工作量和视角转变

The discussion shifts to the impact of AI on software development, noting how AI tools are enabling teams to tackle projects they wouldn't have considered before. There's a tension between the increased effectiveness AI provides and the harder work individuals are doing. The conversation touches on a "180 turn" towards AI-first approaches and how AI tools are making teams more ambitious. Ruby on Rails and Linux are highlighted as being well-suited for working with AI agents.

讨论转向 AI 对软件开发的影响，注意到 AI 工具如何使团队能够承接他们此前不会考虑的项目。AI 带来的效率提升与个人付出的更大工作量之间存在张力。对话涉及向"AI 优先"方法的"180 度转变"，以及 AI 工具如何使团队更加雄心勃勃。Ruby on Rails 和 Linux 被强调为非常适合与 AI 智能体协作。

### [01:42] Chapter 3: From Ruby on Rails to Omarchy: Building for Personal Itch and Business Application
### [01:42] 第3章：从 Ruby on Rails 到 Omarchy：为个人需求和商业应用而构建

The conversation transitions to the background of the guest, David Heinemeier Hansson (DHH), and his projects, including Ruby on Rails and Omarchy, a new Linux distribution. DHH explains how both projects started from "scratching his own itch" and resonated with a larger community. He notes that Ruby on Rails is experiencing a renaissance due to its token efficiency, making it suitable for agent workflows. DHH also discusses how 37signals uses both Ruby on Rails and Omarchy for their business, emphasizing the advantage of developers being closer to the production environment.

对话过渡到嘉宾 David Heinemeier Hansson（DHH）的背景及其项目，包括 Ruby on Rails 和一个新 Linux 发行版 Omarchy。DHH 解释了两个项目如何从"挠自己的痒"开始，并引起了更广泛社区的共鸣。他指出 Ruby on Rails 正在经历复兴，因为它具有很高的 token 效率，适合智能体工作流。DHH 还讨论了 37signals 如何在业务中使用 Ruby on Rails 和 Omarchy，强调开发者更接近生产环境的优势。

### [08:24] Chapter 4: 37signals' Journey: From Web Design Firm to Software Company with Basecamp and Hey.com
### [08:24] 第4章：37signals 的历程：从网页设计公司到拥有 Basecamp 和 Hey.com 的软件公司

DHH recounts the history of 37signals, starting as a web design firm in 1999 and evolving into a software company with the launch of Basecamp in 2004. Basecamp remains their biggest and most important product. The conversation then focuses on Hey.com, their email service launched in 2020, which competes with Gmail. DHH highlights Hey's unique features, such as the screener, which gives users control over who can reach their inbox. He emphasizes the importance of having a "grand why" when building products, drawing on Viktor Frankl's ideas about finding meaning.

DHH 回顾了 37signals 的历史，从1999年的网页设计公司发展到2004年推出 Basecamp 的软件公司。Basecamp 仍然是他们最大和最重要的产品。对话随后聚焦于 Hey.com，这是他们2020年推出的电子邮件服务，与 Gmail 竞争。DHH 强调 Hey 的独特功能，例如 screener，让用户控制谁可以进入他们的收件箱。他强调在构建产品时拥有"伟大为什么"的重要性，借鉴 Viktor Frankl 关于寻找意义的想法。

### [17:55] Chapter 5: Building Hey.com: Small Teams, Shape Up Methodology, and the Role of Designers
### [17:55] 第5章：构建 Hey.com：小团队、Shape Up 方法论和设计师的角色

DHH discusses the development process of Hey.com, emphasizing the use of small teams and a "shape up methodology." He explains that designers at 37signals are not just responsible for aesthetics but also for defining the product specs and implementation. DHH contrasts this approach with larger companies where product managers create specs before developers get involved. He also touches on the disappointment with the direction of Apple's design, noting the loss of "exquisitely designed native Mac applications."

DHH 讨论了 Hey.com 的开发过程，强调小团队和"Shape Up 方法论"的使用。他解释说，37signals 的设计师不仅负责美学，还负责定义产品规格和实施。DHH 将这种方法与大型公司进行对比，后者的产品经理在开发者介入之前就创建规格。他还提到了对苹果设计方向的失望，指出"精心设计的原生 Mac 应用"的流失。

### [27:51] Chapter 6: Valuing Design and Software Craftsmanship: Aesthetics as a Guide to Truth
### [27:51] 第6章：重视设计和软件工艺：美学作为真理的指南

The conversation shifts to the value placed on software engineering and design as crafts. DHH asserts that "when something is beautiful, it's likely to be correct," seeing aesthetics as a guide to truth in various domains. He believes that being surrounded by beautiful, well-functioning objects is key to happiness. DHH also discusses how AI is changing his work, noting that his opinions haven't changed, but the circumstances and facts have.

对话转向软件工程和设计作为工艺的价值。DHH 断言"当一个东西很美时，它很可能是正确的"，将美学视为各领域真理的指南。他认为被美丽的、功能完善的物体包围是幸福的关键。DHH 还讨论了 AI 如何改变他的工作，指出他的观点没有改变，但环境和事实已经改变了。

### [33:44] Chapter 7: From Autocomplete Annoyance to Agent Harness Enthusiasm: A Shift in AI Tool Utility
### [33:44] 第7章：从自动补全的烦恼到智能体框架的热情：AI 工具效用的转变

DHH expresses his initial frustration with early AI models that focused on autocomplete, finding them intrusive and annoying. He contrasts this with his current enthusiasm for agent harnesses, which provide AI with tools and capabilities beyond simple reasoning. DHH highlights Opus 4.5 as a turning point, being the first model that consistently impressed him with the quality of its output and analysis. He notes that this shift occurred around the winter break, with many developers experiencing a collective "shock" at the capabilities of these new tools.

DHH 表达了他对早期专注于自动补全的 AI 模型的最初沮丧，发现它们具有侵入性和烦人性。他将其与目前对智能体框架的热情进行对比，智能体框架为 AI 提供了超越简单推理的工具和能力。DHH 强调 Opus 4.5 是一个转折点，是第一个持续以输出和分析质量令他印象深刻的模型。他指出，这一转变发生在寒假前后，许多开发者对这些新工具的能力经历了集体的"震惊"。

### [40:11] Chapter 8: Agent-First Workflow: From Side Projects to Autonomous Product Sign-Ups
### [40:11] 第8章：智能体优先工作流：从副项目到自主产品注册

DHH describes his current workflow as "agent first on everything," using OpenCode as his main harness. He shares anecdotes about using agents to sign up for products autonomously, including Hey.com and Fizzy, and even inviting an agent to join a Basecamp project. DHH emphasizes the importance of building CLIs to enable agents to interact with various systems, highlighting the Unix philosophy of small, interoperable tools. He expresses excitement and anxiety about the rapid progress of AI, wondering what the future holds.

DHH 将他当前的工作流描述为"一切以智能体为先"，使用 OpenCode 作为他的主要框架。他分享了使用智能体自主注册产品（包括 Hey.com 和 Fizzy）的趣事，甚至邀请一个智能体加入 Basecamp 项目。DHH 强调构建 CLI 以使智能体能够与各种系统交互的重要性，突出了 Unix 小型可互操作工具的哲学。他对 AI 的快速进展表达了兴奋和焦虑，想知道未来会是什么样子。

### [53:15] Chapter 9: Senior vs. Junior Developers in the Age of AI: Shifting Value and the Amazon Outage
### [53:15] 第9章：AI 时代的高级 vs 初级开发者：价值转移与亚马逊宕机

The conversation explores the impact of AI on different levels of software developers, noting that senior developers are currently benefiting the most from AI acceleration. DHH references an Amazon outage analysis that attributed the issue to junior programmers shipping agent-generated code without review. He suggests that as AI improves, it may eventually become capable of shipping working code without human oversight, similar to the progress in self-driving cars.

对话探讨了 AI 对不同层次软件开发者的影响，指出资深开发者目前从 AI 加速中获益最多。DHH 引用了一份亚马逊宕机分析，将问题归因于初级程序员发布了未经审查的智能体生成代码。他建议，随着 AI 的改进，它可能最终能够无需人工监督即可发布可用代码，类似于自动驾驶汽车的进展。

### [01:02:27] Chapter 10: The Exploding Pie: AI's Impact on Ambition and New Project Exploration
### [01:02:27] 第10章：爆炸式增长的饼：AI 对雄心和新项目探索的影响

DHH discusses how AI is leading to an "explosion of the pie," enabling teams to tackle projects they wouldn't have considered before. He shares an example of a "P1" performance optimization project that would have been deemed a "vanity project" in the past. DHH also describes how he uses agents to explore vague ideas and hunches, leading to new insights and ambitions. He emphasizes that the cost of exploring these ideas has dropped dramatically.

DHH 讨论了 AI 如何导致"饼的爆炸式增长"，使团队能够承接他们此前不会考虑的项目。他分享了一个"P1"性能优化项目的例子，这在过去会被认为是"虚荣项目"。DHH 还描述了他如何使用智能体探索模糊的想法和直觉，带来新的见解和雄心。他强调，探索这些想法的成本已经大幅下降。

### [01:11:26] Chapter 11: The Bitter Lesson and Peak Programmer: Navigating the Changing Landscape
### [01:11:26] 第11章：苦涩教训与程序员巅峰：驾驭变化中的格局

DHH discusses the "bitter lesson" and the potential for "peak programmer," suggesting that the demand for traditional programming skills may decline as AI becomes more capable. He emphasizes the importance of product management skills and the ability to figure out what should be built. DHH also notes that the stereotype of programmers who "just want to sit and code" is becoming less relevant.

DHH 讨论了"苦涩教训"和"程序员巅峰"的可能性，暗示随着 AI 变得更加能干，对传统编程技能的需求可能会下降。他强调产品管理技能和确定应该构建什么的能力很重要。DHH 还指出，"只想坐着写代码"的程序员刻板印象正变得越来越无关紧要。

### [01:23:35] Chapter 12: Hiring the Best: Beyond Skills to Taste, Judgment, and Craftsmanship
### [01:23:35] 第12章：雇用最优秀的人：超越技能到品味、判断和工艺

The conversation shifts to the challenges of hiring the best software engineers in the age of AI. DHH admits that 37signals hasn't "cracked it" and that their "batting average" for hires is only slightly better than 50-50. He emphasizes the importance of standing out, following instructions, and putting in effort. DHH also stresses that working hard, even at a "shitty place," is crucial for developing skills and building a reputation.

对话转向在 AI 时代雇用最优秀软件工程师的挑战。DHH 承认 37signals 并未"破解它"，他们雇用的"打击率"仅略好于 50-50。他强调脱颖而出、遵循指示和付出努力的重要性。DHH 还强调，即使在"糟糕的地方"，努力工作对于培养技能和建立声誉也至关重要。

### [01:31:46] Chapter 13: The Golden Age of Programming: Overwork, Bootcamps, and the Value of Good Programmers
### [01:31:46] 第13章：编程的黄金时代：过度工作、训练营和优秀程序员的价值

DHH reflects on the "golden age of programming" and the misconception that one could be a great programmer without truly liking programming. He suggests that this era is over and that those who are truly passionate and skilled are now more valuable than ever. DHH also notes that he is enjoying his time as a programmer more than ever, thanks to the new capabilities provided by AI.

DHH 反思了"编程的黄金时代"，以及一个人可以不喜欢编程却成为伟大程序员这一误解。他认为这个时代已经结束，那些真正有热情和有技能的人现在比以往任何时候都更有价值。DHH 还指出，由于 AI 提供的新能力，他作为程序员享受的时光比以往任何时候都多。

### [01:36:03] Chapter 14: Balancing AI Enthusiasm with Health and Well-being: A Sustainable Approach
### [01:36:03] 第14章：平衡 AI 热情与健康：可持续的方法

DHH acknowledges the tension between the excitement of AI and the risk of overwork. He emphasizes the importance of maintaining a balance, prioritizing sleep, health, and diet. DHH cautions against treating AI as a "limited sale" and encourages a sustainable approach. He concludes by sharing his deep love of computers and his excitement about the future of software development.

DHH 承认 AI 的兴奋与过度工作的风险之间的张力。他强调保持平衡的重要性，优先考虑睡眠、健康和饮食。DHH 警告不要把 AI 当作"限时特卖"来对待，并鼓励采取可持续的方法。他最后分享了对计算机的深厚热爱以及对软件开发未来的兴奋。

---

## Highlights
## 高亮片段

1. [00:05] "I mean, I think aesthetics is truth. When something is beautiful, it's likely to be correct."
1. [00:05] "我的意思是，我认为美学就是真理。当一个东西很美时，它很可能是正确的。"

2. [03:31] "That all the ideas in the world may be taken and doesn't matter because your spin on it isn't."
2. [03:31] "世界上所有的想法都可能被拿走，但没关系，因为你的独特视角才是最重要的。"

3. [31:44] "This is how we should see ourselves as craftspeople, that we care about polishing it until there are no splinters left."
3. [31:44] "我们应该把自己看作工匠，我们关心的是把它打磨到没有任何毛刺残留。"

4. [53:26] "And also a little bit anxious about where it's all going to go. And it's in that tension that I and probably anyone else who's been pilled on this live, right?"
4. [53:26] "也对未来走向有一点焦虑。就在这种张力中，我和可能所有深入其中的人一样，对吧？"

5. [01:17:10] "I do actually think if I was going to bet we've seen peak programmer. In terms of the learned guild of programmers who went to either school or spend 15 hours getting really good at it."
5. [01:17:10] "我实际上真的认为，如果我要赌的话，我们已经看到了程序员的巅峰。从那些经过科班训练或花15000小时变得非常优秀的人组成的行会来看。"

6. [01:31:04] "And if you think your place of employment is not worthy of your best, You're cheating yourself."
6. [01:31:04] "如果你认为你的工作单位不值得你全力以赴，你是在欺骗自己。"

7. [01:43:35] "It is the mission itself. It is the satisfaction. It is the affirmation of being a human that I'm not just a blob laying around."
7. [01:43:35] "这就是使命本身。这就是满足感。这是对作为人类的确认，证明我不只是一团懒肉。"

---

## Q&A

**Q1: How is AI changing how you work, and how do you think it's changing your craft, especially given that you hire people who care about design and software quality?**
**问题1：AI 如何改变你的工作方式？考虑到你雇用关心设计和软件质量的人，你认为它如何改变你的工艺？**

A1: I don't actually think my opinions have changed, but the circumstances and facts have. ChatGPT was a clear marker on the timeline. I found the early models, with autocomplete and copilot, infuriating. It felt like it wouldn't let me finish a sentence. But I retained my enthusiasm for the general direction of travel. The amazement to me was as a tutor model, as a pair programmer who doesn't drive. It was amazing to have ChatGPT and the other models just be there for like, I don't understand this fully.
回答1：我实际上不认为我的观点改变了，但环境和事实已经改变了。ChatGPT 是时间线上的一个清晰标记。我发现早期的模型，包括自动补全和 copilot，令人恼火。它感觉不让我完成一个句子。但我对前进方向保持了热情。让我惊叹的是作为导师模型，作为一个不驾驶的结对程序员。有 ChatGPT 和其他模型在那里真是太神奇了，对于我不完全理解的东西。

**Q2: Given that you could have retired a long time ago, what keeps you building and getting up every day to open your terminal, now with agents, and what are you excited about looking ahead?**
**问题2：考虑到你很久以前就可以退休了，是什么让你继续构建、每天起床打开终端（现在有了智能体），你对未来感到兴奋的是什么？**

A2: My drive continues to be a deep love of computers. This is simply the best way, the most fun way to spend my time. I could spend my time on a lot of things. I do spend my time on a lot of things. I don't just do computers. I drive race cars. I take lots of time off. I have three kids. But if I'm going to fill eight hours every day with an activity, my best bet is computers. And it has been so since I was literally five years old. I want to play with computers. I'm going to continue to do that. And then even more specifically, After the last three months, I'm leaning in hard now with agent accessibility.
回答2：我的驱动力始终是对计算机的深厚热爱。这只是最好的方式，最有趣的方式来度过我的时间。我可以把时间花在很多事情上。我确实把时间花在很多事情上。我不只是用电脑。我开赛车。我休息很多时间。我有三个孩子。但如果我要每天八小时从事一项活动，我的最佳选择是电脑。从我五岁起就是这样。我想玩电脑。我会继续这样做。然后更具体地说，在过去三个月里，我正在大力投入智能体可访问性。

**Q3: How are you finding keeping a balance, stepping away, especially given the importance of sleep, and how are you dealing with the consuming nature of AI?**
**问题3：你如何保持平衡、抽身离开，特别是考虑到睡眠的重要性，你如何应对 AI 的消耗性？**

A3: Eight hours a night is the best investment you can make in your own cognitive capacity. If you go from the eight to the six, I go like, well, I'm going to be awake for, in that case, 18 hours. What is the drag I'm going to carry for all those 18 hours for getting one more hour, two more hours by cutting back on the sleep? It is such a bad piece of math. The last thing you should trade is sleep and then you should not trade your health. You should not try to save the three hours a week of working out to do more agent work. That's a very poor trade.
回答3：每晚八小时睡眠是你对自己的认知能力可以做的最佳投资。如果你从八小时减到六小时，我就会想，好吧，在这种情况下，我要醒着18小时。为了多睡一两个小时而减少睡眠，我在那18小时里要承受多大的拖累？这是一个很糟糕的数学题。你最不应该牺牲的是睡眠，然后你不应该牺牲你的健康。你不应该试图节省每周锻炼的三小时来做更多的智能体工作。这是一个非常糟糕的交易。

**Q4: How do you think about designers, given that you think of designers a little bit different than potentially the rest of the industry does?**
**问题4：你如何看待设计师？考虑到你认为自己对设计师的看法与业界其他人可能略有不同？**

A4: Designers at 37signals are not just here to make a spec look pretty. They're here to find what the specs should be. They're product managers in many ways. They are the finders of the how and the why, in many cases, deducing, in some cases, customer feedback, in other cases, just pure intuition and distilling that into what should we build and how should it work. And then on top of that, they're also responsible for building it. They're responsible for doing the CSS. They're responsible for doing the HTML. They're quite often responsible, at least dabbling in the JavaScript and the Ruby code to get to something functional.
回答4：37signals 的设计师不只是让规格看起来漂亮。他们在这里是为了发现规格应该是什么。他们在很多方面也是产品经理。他们是"如何"和"为什么"的发现者，在许多情况下，是从客户反馈中推导，有时只是纯粹直觉，并将其提炼为我们应该构建什么以及它应该如何工作。然后除此之外，他们还负责构建它。他们负责做 CSS。他们负责做 HTML。他们经常负责，至少涉猎 JavaScript 和 Ruby 代码，以获得一些功能性的东西。

**Q5: What advice do you give to people who want to be the best software engineer in this age right now?**
**问题5：你给现在想成为最优秀软件工程师的人什么建议？**

A5: Get as good as you can get and put in as much effort as you can and work with someone. Some people have this notion in their head that if they work at a place they consider shitty, they shouldn't try. You're shooting your own feet, buddy. If you show up at the shitty pairs of work and we can be objectively In unison about that, that it is a shitty place of work. And you then go like, well, I should just try to skirt. I should just try to goof off. I should just try to read X or Reddit all day. There is no shortcut here. You simply just have to be good and you will not get good if you do not practice.
回答5：尽可能好，尽可能努力，与人合作。有些人脑子里有这样一种观念，如果他们在他们认为糟糕的地方工作，他们不应该尝试。你在搬起石头砸自己的脚，伙计。如果你出现在那个糟糕的工作场所，而我们可以客观地一致认为那是一个糟糕的工作场所。然后你会说，好吧，我应该试着偷懒。我应该试着打发时间。我应该试着整天看 X 或 Reddit。这里没有捷径。你必须变得优秀，如果你不练习，你就不会变得优秀。

**Q6: If I'm a software engineer right now and I'm worried about the future, what should I do to make sure that I'm at a place where things are going to be better?**
**问题6：如果我现在是一名软件工程师，我担心未来，我应该怎么做才能确保我处于一个会变得更好的地方？**

A6: You want to be at a place where you want to either get out of a cost center or become really valuable there. Obviously, you know, brush up your skills. And also, I'm wondering if the shape of Software engineers who will be hired will be changing because if I just look back from the 90s, even if you look at the movies, you saw the stereotypes. They were the nerds who didn't talk to anyone, but they knew how to code. They knew how to do assembly. And then we went in the 2000s. It was still based on languages. And over time, I think in the 2010s, startups started to not hire for languages, but just hire for algorithms because you could learn the stuff.
回答6：你希望在一个要么走出成本中心要么在那里变得非常有价值的地方。显然，你知道，提升你的技能。我也在想，雇用的软件工程师的形态是否会改变，因为如果我回顾90年代，即使你看电影，也会看到刻板印象。他们是不同任何人说话的极客，但他们知道如何编码。他们知道如何做汇编。然后我们进入了2000年代。它仍然基于语言。随着时间的推移，我认为在2010年代，初创公司开始不再按语言雇用，而只按算法雇用，因为你可以通过学习掌握这些东西。

**Q7: How is your view on AI changed, because the last time you talked in length about this, that was on Lex Friedman's podcast, and you were still rightfully so very skeptical of AI?**
**问题7：你对 AI 的看法是如何改变的？因为你上次详细讨论这个是在 Lex Friedman 的播客上，而且你有理由对 AI 非常怀疑？**

A7: This is a nuanced point and maybe it's self-serving, but I don't actually think my opinions have changed. What have changed is the circumstances and the facts, which is something I called out on that show and in many other writings was right from the get-go, I could see that we had something new and novel here that was going to change things.
回答7：这是一个微妙的观点，可能有点自利，但我不实际上认为我的观点改变了。改变的是环境和事实，这是我在那场节目中以及许多其他著作中指出的，从一开始我就看到我们在这里有一些新的、特别的东西，将会改变一切。

**Q8: How is the work and satisfaction of junior engineers changing with AI?**
**问题8：初级工程师的工作和满意度如何随着 AI 改变？**

A8: The most Successful and applicable agent acceleration that I've seen at 37signal has been from the most senior people. The people who are able to validate whether what the agent produces is suitable to be deployed to millions of people. Whenever it's mission critical for something of that nature, we cannot yet rely on the agents to I bet it at all and junior programmers are not capable of figuring it out. Therefore, their role is suddenly more tenuous than it was six, nine months ago because a senior programmer can't and this is why senior programmers are getting so much more acceleration.
回答8：我在 37signals 看到的最成功和最适用的智能体加速来自最资深的人。那些能够验证智能体生成的内容是否适合部署给数百万人使用的人。每当涉及到对那种性质的任务关键系统时，我们还无法依赖智能体，初级程序员也无法弄清楚。因此，他们的角色突然比六、九个月前更加不稳定，因为高级程序员不能——这就是为什么高级程序员获得了如此多的加速。

**Q9: How is AI changing how you work?**
**问题9：AI 如何改变你的工作方式？**

A9: My daily work is agent first on everything. I use OpenCode as my main harness. I also use Claude Code a little bit. They unfortunately got that early lead. Opus is currently the best model. So then they started thinking a little bit in that like the game is single match instead of thinking it's multiple rounds and yanked their subscription from OpenCode. So if you want to Use your Mac subscription. You kind of have to use their harness, which. I don't love it. I think it's a mistake.
回答9：我的日常工作一切以智能体为先。我使用 OpenCode 作为我的主要框架。我也稍微使用 Claude Code。他们不幸取得了早期领先。Opus 目前是最佳模型。所以他们开始认为比赛是单场而不是多轮，并从 OpenCode 撤销了订阅。所以如果你想使用你的 Mac 订阅。你必须使用他们的框架。我不喜欢它。我认为这是一个错误。

**Q10: You feel that you very much value software engineering as a craft, which is very obvious, but what I'm sensing is your valuing design user experience design, software design, building stuff that feels good, may that be software, hardware, you also value that as a craft and you look for it, these two things, do I sense this correctly?**
**问题10：你觉得自己非常重视软件工程作为工艺，这很明显，但我感觉到的是你重视设计、用户体验设计、软件设计、构建感觉良好的东西，无论是软件还是硬件，你也将其视为工艺并寻找它，这两件事，我的感知正确吗？**

A10: It's truth. When something is beautiful, it's likely to be correct. I think this is true in mathematics. This is true in physics. This is true in a lot of different domains that when you arrive at something that has the correct aesthetic quality, it's like we have an intuition that guides us towards that level of beauty because it also happens to be correct and noble and something to aspire for.
回答10：这是真理。当一个东西很美时，它很可能是正确的。我认为这在数学中是正确的。在物理中也是正确的。在许多不同的领域，当你在一个具有正确美学质量的事物上时，就好像我们有一种直觉引导我们达到那种美，因为它恰好也是正确的、高尚的、值得追求的。

**Q11: How has the creator of Ruby on Rails changed how we build software now with AI agents?**
**问题11：Ruby on Rails 的创造者如何改变了我们现在使用 AI 智能体构建软件的方式？**

A11: What have changed is the circumstances and the facts, which is something I called out on that show and in many other writings was right from the get-go, I could see that we had something new and novel here that was going to change things. ChatGPT, its launch, what, three years ago, was clearly and obviously, even at the time, something you would mark on a timeline. You're like, here are all the important things that happened in the history of computer science or the world. Yoinks. There is the launch of ChatGPT.
回答11：改变的是环境和事实，这是我在那场节目中以及许多其他著作中指出的，从一开始我就看到我们在这里有一些新的、特别的东西，将会改变一切。ChatGPT，三年前发布，即使在当时，也显然是你会在时间线上标记的东西。你会说，在计算机科学或世界的历史上所有重要的事情中，有 ChatGPT 的发布。

**Q12: I wonder if there's a part of AI about the impact of doing work that we would have not done before.**
**问题12：我想知道 AI 是否有一部分关于我们从未做过的工作的影响。**

A12: That's the kicker for me. That's the fact that the pie is just exploding right now. It's not growing. It's exploding. The number of projects we have tackled internally that we would never even have contemplated starting on are legion. Jeremy, one of our most agent accelerated people, went like, what about P1? What about the floor? Can we fix the floor?
回答12：这就是关键。就是饼正在爆炸式增长。不是在增长，是在爆炸。我们内部承担的项目数量，我们从未考虑过开始的，简直不计其数。Jeremy，我们最具智能体加速的人之一，说：P1 怎么样？地板怎么样？我们可以修地板吗？

**Q13: How is AI changing the craft?**
**问题13：AI 如何改变工艺？**

A13: The biggest revelation, actually. More than even the capacity of the agents is my enjoyment running them. When I was on that Lex interview last summer, I was talking about, you know what, I don't want to be a project manager for agents because I had the mental model of a project manager of humans. And I thought like, that's not what I enjoy. I don't want to be that far away from the production. I want to be in the mix. I want to have my hands in the code.
回答13：最大的启示，实际上。比智能体的能力更重要的是我运行它们的乐趣。当我在去年夏天的 Lex 采访中时，我在说，你知道吗，我不想成为智能体的项目经理，因为我有人类项目经理的心理模型。我觉得那不是我所享受的。我不想离生产那么远。我想融入其中。我想亲手接触代码。

**Q14: What is it going to look like when AI takes the jump that FSD did over the same period of time?**
**问题14：当 AI 取得 FSD 在同一时间段内取得的飞跃时，会是什么样子？**

A14: I also think you can go completely crazy trying to just sit and soak in all of that. This is what I tried to do over the past year ago. I'm really excited for where this is going, but I'm also going to deal with what's possible today and what's enjoyable today and what we do right now. I'm not going to try to plan what my life looks like 12 months from now when maybe we do have AGI or we don't. Now, there are other people who do that very well.
回答14：我也认为你可以完全疯狂地只是坐在那里沉浸在这一切中。这是我在去年尝试做的。我对未来走向非常兴奋，但我也将处理今天可能的、今天愉快的以及我们现在做的事情。我不会试图计划12个月后我的生活会是什么样子，也许我们有 AGI，也许没有。现在有其他人在做这件事，做得很好。

**Q15: What is your daily work now?**
**问题15：你现在每天的工作是什么？**

A15: My daily work is agent first on everything. I use OpenCode as my main harness. I also use Claude Code a little bit. They unfortunately got that early lead. Opus is currently the best model. So then they started thinking a little bit in that like the game is single match instead of thinking it's multiple rounds and yanked their subscription from OpenCode. So if you want to Use your Mac subscription. You kind of have to use their harness, which. I don't love it. I think it's a mistake. But leave that be for a second. And let's just celebrate the fact that they have the best model.
回答15：我的日常工作一切以智能体为先。我使用 OpenCode 作为我的主要框架。我也稍微使用 Claude Code。他们不幸取得了早期领先。Opus 目前是最佳模型。所以他们开始认为比赛是单场而不是多轮，并从 OpenCode 撤销了订阅。所以如果你想使用你的 Mac 订阅。你必须使用他们的框架。我不喜欢它。我认为这是一个错误。但先不说这个。让我们庆祝他们拥有最佳模型这一事实。

**Q16: Why Ruby on Rails and Linux could become even more popular than they are today as they are both well suited working with AI agents?**
**问题16：为什么 Ruby on Rails 和 Linux 可能变得比今天更受欢迎，因为它们都非常适合与 AI 智能体协作？**

A16: Ruby on Rails is having a little bit of a renaissance now that it is one of the most token efficient ways of building web apps. It's ideally suited for The agent workflows we're dealing with now. We'll see how long that lasts. Maybe all the agents are going to be writing machine code or assembler in about five minutes. So maybe that comes to an end. But for the moment, token efficiency still matters. And it still matters whether the agents produce code that humans are able to read and verify.
回答16：Ruby on Rails 正在经历一点复兴，因为它是最 token 高效的构建 Web 应用的方式之一。它非常适合我们目前处理的智能体工作流。我们看看这会持续多久。也许所有智能体将在大约五分钟内开始编写机器代码或汇编。所以这可能会结束。但目前，token 效率仍然重要。智能体生成的代码人类能够阅读和验证这一点仍然重要。

**Q17: Why taste and beautiful software are becoming more important and why both standout designers and engineers who care about the craft could become more in demand and many more.**
**问题17：为什么品味和美的软件变得越来越重要？为什么杰出的设计师和关心工艺的工程师可能会更受欢迎？**

A17: It's truth. When something is beautiful, it's likely to be correct. I think this is true in mathematics. This is true in physics. This is true in a lot of different domains that when you arrive at something that has the correct aesthetic quality, it's like we have an intuition that guides us towards that level of beauty because it also happens to be correct and noble and something to aspire for.
回答17：这是真理。当一个东西很美时，它很可能是正确的。我认为这在数学中是正确的。在物理中也是正确的。在许多不同的领域，当你在一个具有正确美学质量的事物上时，就好像我们有一种直觉引导我们达到那种美，因为它恰好也是正确的、高尚的、值得追求的。

**Q18: The way projects would start there is you take the product manager who works with maybe half a designer and comes up with a spec. And then developers get involved later. And what I'm hearing, what is very novel to me, is you take one or two designers and a developer.**
**问题18：项目开始的方式通常是产品经理与大约半个设计师合作，提出规格。然后开发者稍后参与。我听到的对我来说很新颖的是，你带上一两个设计师和一个开发者。**

A18: We very much do. Designers at 37signals are not just here to make a spec look pretty. They're here to find what the specs should be. They're product managers in many ways. They are the finders of the how and the why, in many cases, deducing, in some cases, customer feedback, in other cases, just pure intuition and distilling that into what should we build and how should it work. And then on top of that, they're also responsible for building it. They're responsible for doing the CSS. They're responsible for doing the HTML.
回答18：我们确实这样做。37signals 的设计师不只是让规格看起来漂亮。他们在这里是为了发现规格应该是什么。他们在很多方面也是产品经理。他们是"如何"和"为什么"的发现者，在许多情况下是从客户反馈中推导，有时只是纯粹直觉，并将其提炼为我们应该构建什么以及它应该如何工作。然后除此之外，他们还负责构建它。他们负责做 CSS。他们负责做 HTML。

**Q19: You were still rightfully so very skeptical of AI. It was a different set of tools that didn't work as well. And I think you went there bashing it pretty hard. But things have changed since.**
**问题19：你仍然有理由对 AI 非常怀疑。那是一套不太好用的不同工具。我认为你当时猛烈抨击了它。但事情从那以后已经改变了。**

A19: This is a nuanced point and maybe it's self-serving, but I don't actually think my opinions have changed. What have changed is the circumstances and the facts, which is something I called out on that show and in many other writings was right from the get-go, I could see that we had something new and novel here that was going to change things.
回答19：这是一个微妙的观点，可能有点自利，但我不实际上认为我的观点改变了。改变的是环境和事实，这是我在那场节目中以及许多其他著作中指出的，从一开始我就看到我们在这里有一些新的、特别的东西，将会改变一切。

**Q20: There's something with this as well, where you really don't believe it. We can talk about this. Whoever's not tried it or not had that aha moment, I don't think we can convince them.**
**问题20：关于这件事也有一点，就是你真的不相信它。我们可以谈谈这个。无论谁没有尝试过或没有过那种顿悟时刻，我认为我们无法说服他们。**

A20: This is another one of those cases where words just are not effective. You need to sit down in front of open code or whatever harness that you use. Use one of the frontier models. Start with that. Start with Opus. I'd say start with Opus. It's the best frontier model. Other models are better at other things, blah, blah. But if you're just going to work on a piece of code and you want to see what the current frontier is, and if you, I mean, I'd be shocked if any of your listeners haven't done it already. But if there should be some left, now is the time.
回答20：这是另一个言语无效的案例。你需要坐在 OpenCode 或你使用的任何框架前。使用一个前沿模型。从那个开始。从 Opus 开始。我会说从 Opus 开始。这是最好的前沿模型。其他模型在其他事情上更好，等等。但如果你只是要处理一段代码，你想看看当前的前沿是什么，而且如果你的听众还没有做过，我会很震惊。但如果还有一些没做过的，现在就是时候了。

---

## Keywords
## 关键词

Ruby on Rails, Linux, Omarchy, Basecamp, Hey.com, Shape Up, Electron, The Bitter Lesson, Screener, Opus, Agent acceleration

Ruby on Rails, Linux, Omarchy, Basecamp, Hey.com, Shape Up, Electron, 苦涩教训, Screener, Opus, 智能体加速

---

## Mind Map
## 思维导图

# DHH's new way of writing code
# DHH 的新编程方式

## [00:00] Part 1: Craftsmanship, AI Impact, and Origins
## [00:00] 第1部分：工艺、AI 影响与起源

### [00:00] Valuing Software Engineering as a Craft: Aesthetics and Correctness
### [00:00] 将软件工程视为工艺：美学与正确性
- Software engineering is highly valued as a craft.
- 软件工程作为工艺被高度重视。
- Aesthetics is linked to truth.
- 美学与真理相连。
- Beautiful design often indicates correctness.
- 美的设计通常表示正确性。
- This principle applies across various domains like mathematics and physics.
- 这一原则适用于数学和物理等各个领域。

### [00:15] AI's Impact on Software Development: Ambition, Workload, and Shifting Perspectives
### [00:15] AI 对软件开发的影响：雄心、工作量和视角转变
- AI enables tackling previously unconsidered projects
  - Optimizing even the fastest requests
- AI 使承接先前未考虑的项目成为可能
  - 优化即使是最快的请求
- AI can lead to increased workload for those fully engaged
  - Intoxicating impact of effective agent supervision
- AI 会导致完全投入的人增加工作量
  - 有效智能体监督的令人陶醉的影响
- DHH's shift to "AI-first" approach
  - From skepticism to embracing AI tools
- DHH 向"AI 优先"方法的转变
  - 从怀疑到拥抱 AI 工具
- Potential for Ruby on Rails and Linux to gain popularity
  - Due to compatibility with AI agents
- Ruby on Rails 和 Linux 获得普及的潜力
  - 由于与 AI 智能体的兼容性

### [01:42] From Ruby on Rails to Omarchy: Building for Personal Itch and Business Application
### [01:42] 从 Ruby on Rails 到 Omarchy：为个人需求和商业应用而构建
- Importance of taste and beautiful software
  - Standout designers and engineers are in demand
- 品味和美软件的重要性
  - 杰出的设计师和工程师需求量很大
- Building Omarchy Linux distribution
  - Created as a summer project, gaining traction despite a crowded market
  - Personal spin matters, even with existing ideas
- 构建 Omarchy Linux 发行版
  - 作为夏季项目创建，尽管市场竞争激烈但正在获得关注
  - 个人视角很重要，即使对于已有的想法也是如此
- Ruby on Rails development
  - Created to scratch a personal itch while building Basecamp
  - Token efficiency makes it suitable for agent workflows
- Ruby on Rails 开发
  - 在构建 Basecamp 时为了解决个人需求而创建
  - Token 效率使其适合智能体工作流
- Applying hobby projects to business
  - 37signals built on Ruby on Rails for 20+ years
  - Transitioning developers to Omarchy Linux for development
- 将业余项目应用于业务
  - 37signals 基于 Ruby on Rails 构建了 20+ 年
  - 将开发者过渡到 Omarchy Linux 进行开发
- Advantages of using Linux for development
  - Closer to the production environment
  - Familiarity with tools
  - Contributes to the company's own distribution
- 使用 Linux 进行开发的优势
  - 更接近生产环境
  - 熟悉工具
  - 为公司自己的发行版做出贡献

### [08:24] 37signals' Journey: From Web Design Firm to Software Company with Basecamp and Hey.com
### [08:24] 37signals 的历程：从网页设计公司到拥有 Basecamp 和 Hey.com 的软件公司
- 37signals' origins and evolution
  - Founded in 1999 as a web design firm
  - Transitioned to software with Basecamp in 2004
  - Basecamp remains their most successful product
- 37signals 的起源和演变
  - 1999 年作为网页设计公司成立
  - 2004 年推出 Basecamp 转型为软件公司
  - Basecamp 仍然是他们最成功的产品
- Launching Hey.com to challenge Gmail's dominance
  - Aimed to fix frustrations with existing email systems
  - Faced initial challenges with Apple App Store approval
  - Achieved success due to Apple's unexpected coverage
- 推出 Hey.com 挑战 Gmail 的主导地位
  - 旨在解决现有电子邮件系统的挫败感
  - 最初面临 Apple App Store 批准的挑战
  - 由于 Apple 意外的报道而获得成功
- Hey's approach to email management
  - Features a "screener" to control inbox access
  - Aims to eliminate unwanted sales outreach
  - Focuses on creating a pleasurable email experience
- Hey 的电子邮件管理方法
  - 具有"筛选器"功能来控制收件箱访问
  - 旨在消除不需要的销售推广
  - 专注于创造愉快的电子邮件体验
- The importance of a "grand why" in product development
  - Provides motivation to overcome challenges
  - Helps define the product's purpose and impact
- 产品开发中"伟大为什么"的重要性
  - 提供克服挑战的动力
  - 有助于定义产品的目的和影响

## [17:55] Part 2: Design Methodology and AI Evolution
## [17:55] 第2部分：设计方法论与 AI 演变

### [17:55] Building Hey.com: Small Teams, Shape Up Methodology, and the Role of Designers
### [17:55] 构建 Hey.com：小团队、Shape Up 方法论和设计师的角色
- Small teams for initial product development
  - Start with one programmer and one or two designers
  - Avoid large teams in uncertain directions
- 初始产品开发的小团队
  - 从一个程序员和一两个设计师开始
  - 在不确定的方向上避免大团队
- Designer's role extends beyond aesthetics
  - Designers are product managers, shaping specs
  - Responsible for CSS, HTML, and JavaScript
- 设计师的角色超出美学
  - 设计师是产品经理，制定规格
  - 负责 CSS、HTML 和 JavaScript
- Understanding the medium is crucial
  - Designers should know the properties of the internet's "fabric" (CSS, HTML)
  - Similar to knowing properties of gold in jewelry design
- 理解媒介至关重要
  - 设计师应该了解互联网"织物"的属性（CSS、HTML）
  - 类似于了解珠宝设计中金的属性
- Native applications vs. web-based applications
  - Native Mac applications losing their authentic feel
  - Web development gaining attention, improving quality
- 原生应用 vs 基于 Web 的应用
  - 原生 Mac 应用失去其 authentic 感觉
  - Web 开发获得关注，质量提高
- Industry trends are shifting
  - Agent acceleration empowers designers
  - Realization that individuals can build valuable products with better tools
- 行业趋势正在转变
  - 智能体加速赋能设计师
  - 认识到个人可以使用更好的工具构建有价值的产品

### [27:51] Valuing Design and Software Craftsmanship: Aesthetics as a Guide to Truth
### [27:51] 重视设计和软件工艺：美学作为真理的指南
- Smaller teams are better due to communication cost savings.
- 由于沟通成本节约，小团队更好。
- Valuing software engineering as a craft includes user experience and design.
- 重视软件工程作为工艺包括用户体验和设计。
- Beauty in design often correlates with correctness and enhances happiness.
  - Surrounding oneself with well-functioning objects reduces anxiety.
- 设计中的美通常与正确性相关并增强幸福感。
  - 被功能完善的物体包围可以减少焦虑。
- Ruby is favored for its beautiful code and balance between focus and broad scope.
- Ruby 因其美丽的代码以及专注和广泛范围之间的平衡而受到青睐。
- AI's emergence is a significant event, but core opinions remain unchanged.
  - ChatGPT's launch marked a turning point in computer interaction.
  - AI's intelligence is evident, regardless of its origin.
- AI 的出现是一个重要事件，但核心观点保持不变。
  - ChatGPT 的发布标志着计算机交互的转折点。
  - AI 的智能是显而易见的，无论其来源如何。

### [33:44] From Autocomplete Annoyance to Agent Harness Enthusiasm: A Shift in AI Tool Utility
### [33:44] 从自动补全的烦恼到智能体框架的热情：AI 工具效用的转变
- Early AI autocomplete tools were frustrating
  - Constant guessing and interruptions disrupted thought process
  - Acceleration felt like a nuisance due to frequent errors
- 早期 AI 自动补全工具令人沮丧
  - 不断的猜测和中断扰乱思维过程
  - 由于频繁错误，加速感觉像是一种困扰
- Shift towards using AI as a tutor or pair programmer was more effective
  - Asking questions and seeking explanations for code
  - Similar to using Google or Stack Overflow for problem-solving
- 转向将 AI 用作导师或结对程序员更有效
  - 提问并寻求代码解释
  - 类似于使用 Google 或 Stack Overflow 来解决问题
- Agent harnesses and improved models (Opus 4.5) marked a turning point
  - AI with tools like Bash and internet access
  - High-quality code generation requiring minimal alteration
- 智能体框架和改进的模型（Opus 4.5）标志着转折点
  - 具有 Bash 和互联网访问等工具的 AI
  - 高质量代码生成，只需最小修改
- Importance of code aesthetics and style parity
  - AI-generated code should match the quality and style of human developers
- 代码美学和风格一致性的重要性
  - AI 生成的代码应该匹配人类开发者的质量和风格
- Agent-first approach to new projects
  - Starting projects with AI agents has become the new standard
- 智能体优先的新项目方法
  - 使用 AI 智能体启动项目已成为新标准

### [40:11] Agent-First Workflow: From Side Projects to Autonomous Product Sign-Ups
### [40:11] 智能体优先工作流：从副项目到自主产品注册
- **The "Aha" Moment**: Late November/early December was a pivotal time when many experienced a collective shock and realization of AI's potential.
- **"顿悟"时刻**：11 月底/12 月初是一个关键时刻，许多人经历了对 AI 潜力的集体震惊和认识。
- **Agent Autonomy**: Witnessing AI agents autonomously sign up for services like Hey.com and Fizzy was startling and eye-opening.
- **智能体自主性**：目睹 AI 智能体自主注册 Hey.com 和 Fizzy 等服务令人震惊和 eye-opening。
- **Shift to Agent-First**: The speaker's workflow has shifted from code-first to agent-first, where agents draft code and the speaker reviews/alters it.
- **转向智能体优先**：演讲者的工作流已从代码优先转变为智能体优先，智能体起草代码，演讲者审查/修改。
- **Relevance of Unix Philosophy**: The Unix philosophy of small, interoperable tools is validated by CLIs, enabling agents to connect various services.
- **Unix 哲学的相关性**：小型可互操作工具的 Unix 哲学通过 CLI 得到验证，使智能体能够连接各种服务。
- **Practical Application**: Agents can now handle tasks like checking errors in Sentry, posting write-ups to Basecamp, and creating pull requests in GitHub.
- **实际应用**：智能体现在可以处理在 Sentry 检查错误、向 Basecamp 发布文章和在 GitHub 创建拉取请求等任务。
- **Call to Action**: Experience AI's capabilities firsthand with personal products and tasks to understand its potential and implications.
- **行动号召**：通过个人产品和任务亲身体验 AI 的能力，以了解其潜力和影响。

## [53:15] Part 3: Industry Challenges and Changing Roles
## [53:15] 第3部分：行业挑战和角色变化

### [53:15] Senior vs. Junior Developers in the Age of AI: Shifting Value and the Amazon Outage
### [53:15] AI 时代的高级 vs 初级开发者：价值转移与亚马逊宕机
- AI's rapid progress is upending understanding of what's possible with computers.
- AI 的快速进展正在颠覆对计算机可能性的理解。
- Senior developers currently benefit most from AI
  - They can validate AI-generated code for production deployment.
  - AI assists them in code review and redirection, increasing productivity.
- 资深开发者目前从 AI 获益最多
  - 他们可以验证用于生产部署的 AI 生成代码。
  - AI 协助他们进行代码审查和重定向，提高生产力。
- AI's potential to become "senior" in coding is compared to self-driving cars.
  - Self-driving cars now perform better than humans in many situations.
- AI 成为编码"资深"者的潜力与自动驾驶汽车相比。
  - 自动驾驶汽车现在在许多情况下比人类表现更好。
- Internal systems and specialized landscapes within companies affect AI adoption.
  - Senior engineers may need time to adapt to new systems when moving companies.
- 公司内部系统和专业环境影响 AI 采用。
  - 资深工程师在换公司时可能需要时间适应新系统。
- AI-driven full self-driving (FSD) in Tesla demonstrates rapid improvement over a short period.
  - FSD went from requiring attention to being highly reliable in 18 months.
- 特斯拉的 AI 驱动全自动驾驶（FSD）在短时间内展示了快速改进。
  - FSD 在 18 个月内从需要注意力变为高度可靠。

### [01:02:27] The Exploding Pie: AI's Impact on Ambition and New Project Exploration
### [01:02:27] 爆炸式增长的饼：AI 对雄心和新项目探索的影响
- Increased enjoyment and productivity using AI agents
  - Feels like controlling a "super mech suit" with multiple arms and screens
  - Hyper-accelerated programming, maintaining aesthetic affinity
- 使用 AI 智能体增加乐趣和生产力
  - 感觉像控制带有多个手臂和屏幕的"超级机械战甲"
  - 超级加速的编程，保持美学亲和力
- AI agents excel at code review and problem-solving
  - Processed 100 PRs in 90 minutes using Claude, merging, improving, or rejecting code
  - Identified issues and solutions beyond the speaker's expertise
- AI 智能体擅长代码审查和解决问题
  - 使用 Claude 在 90 分钟内处理了 100 个 PR，合并、改进或拒绝代码
  - 识别出超出演讲者专业知识的问题和解决方案
- AI enables tackling previously unconsidered projects
  - Optimizing the fastest 1% of requests (P1) led to significant performance improvements
  - Exploring hunches and ideas becomes easier with reduced cost and effort
- AI 使承接先前未考虑的项目成为可能
  - 优化最快的 1% 请求（P1）带来了显著的性能改进
  - 探索直觉和想法变得更容易，成本和精力减少
- Shift in value perception of code
  - Less attachment to code, easier to discard drafts and explore new ideas
  - AI facilitates quick analysis and answers to complex questions
- 代码价值观念的转变
  - 对代码的执着减少，更容易放弃草稿和探索新想法
  - AI 促进快速分析和复杂问题的答案

### [01:11:26] The Bitter Lesson and Peak Programmer: Navigating the Changing Landscape
### [01:11:26] 苦涩教训与程序员巅峰：驾驭变化中的格局
- AI-driven automation changes software development dynamics
  - Implementation becoming less of a constraint
  - Product management and understanding customer needs become more critical
- AI 驱动的自动化改变软件开发动态
  - 实现不再是约束
  - 产品管理和理解客户需求变得更加关键
- Potential shift in software engineering roles and skills
  - Less emphasis on pure coding skills
  - Increased importance of communication, empathy, and product understanding
- 软件工程角色和技能的潜在转变
  - 减少对纯编码技能的强调
  - 沟通、共情和产品理解的重要性增加
- "Peak programmer" era may be ending
  - Fewer programmers needed for the same output
  - Cost pressures in software development, especially in cost centers
- "程序员巅峰"时代可能正在结束
  - 相同的输出需要更少的程序员
  - 软件开发中的成本压力，特别是在成本中心
- Continuous learning and adaptation are crucial for software engineers
  - Staying ahead requires skill development and embracing new technologies
- 持续学习和适应对软件工程师至关重要
  - 保持领先需要技能发展和拥抱新技术
- AI adoption is still in early stages
  - Most companies haven't fully embraced AI's potential
- AI 采用仍处于早期阶段
  - 大多数公司尚未完全拥抱 AI 的潜力
- The stereotype of the coder who just wants to code is fading
  - Need to be better than AI agents to retain that privilege
- 只想着编码的程序员的刻板印象正在消退
  - 需要比 AI 智能体更好才能保留那种特权

## [01:23:35] Part 4: Hiring, Career, and Well-being
## [01:23:35] 第4部分：招聘、职业和健康

### [01:23:35] Hiring the Best: Beyond Skills to Taste, Judgment, and Craftsmanship
### [01:23:35] 雇用最优秀的人：超越技能到品味、判断和工艺
- Hiring is difficult and unpredictable
  - 37signals' hiring batting average is only slightly above 50-50
  - Google's research shows traditional metrics (education, GPA, LeetCode) don't predict employee outcomes
- 招聘是困难和不可预测的
  - 37signals 的招聘打击率仅略高于 50-50
  - Google 的研究表明，传统指标（教育、GPA、LeetCode）无法预测员工成果
- 37signals' hiring process
  - Initial screening eliminates 50-66% of applicants
  - Narrowed down to 20 people for an at-home test
  - At-home test is a real-world coding task
- 37signals 的招聘流程
  - 初步筛选淘汰 50-66% 的申请者
  - 缩小到 20 人进行家庭测试
  - 家庭测试是一个现实世界的编码任务
- Warm referrals are the most successful hiring method
- 温暖的推荐是最成功的招聘方法
- Advice for job seekers
  - Stand out and put in effort
  - Don't assume low odds mean zero chance
  - Do your best work even at a "shitty" job
  - Focus on self-improvement and skill development
- 对求职者的建议
  - 脱颖而出并付出努力
  - 不要认为低概率意味着零机会
  - 即使在"糟糕的"工作中也要尽力做到最好
  - 专注于自我提升和技能发展

### [01:31:46] The Golden Age of Programming: Overwork, Bootcamps, and the Value of Good Programmers
### [01:31:46] 编程的黄金时代：过度工作、训练营和优秀程序员的价値
- Showing up and delivering quality work can lead to unexpected opportunities
- 出现并交付高质量工作可以带来意想不到的机会
- Balancing work-life: Avoiding overwork while still engaging with technology outside work hours
- 平衡工作与生活：在工作之外仍然接触技术的同时避免过度工作
- "Peak programmer" misconception: The idea that minimal effort was enough due to high demand
- "程序员巅峰"的误解：由于高需求而认为最少努力就足够了
- Market correction: High salaries attract more labor, addressing supply shortages
- 市场修正：高薪吸引更多劳动力，解决供应短缺
- AI's impact: Top programmers are now more valuable due to their ability to leverage AI
- AI 的影响：顶级程序员现在因利用 AI 的能力而更有价值
- Increased enjoyment: AI is making programming more enjoyable and efficient for some
- 增加的乐趣：AI 正在使编程对一些人来说更加愉快和高效

### [01:36:03] Balancing AI Enthusiasm with Health and Well-being: A Sustainable Approach
### [01:36:03] 平衡 AI 热情与健康：可持续的方法
- Managing anxiety and uncertainty
  - Focus on "leaning in" and experimenting with AI models
- 管理焦虑和不确定性
  - 专注于"深入"和试验 AI 模型
- Balancing AI integration with well-being
  - Prioritize sleep, health, and diet to avoid burnout
- 平衡 AI 整合与健康
  - 优先考虑睡眠、健康和饮食以避免倦怠
- The enduring importance of purpose and mission
  - Wealth alone doesn't bring fulfillment; meaningful work does
- 目的和使命的持久重要性
  - 仅有钱不会带来满足感；有意义的工作才会
- AI as an enabler, not a replacement
  - Still requires human guidance, taste, and judgment
- AI 作为推动者，而非替代者
  - 仍然需要人类指导、品味和判断
- The evolving role of designers and developers
  - Increased collaboration and overlap in responsibilities
- 设计师和开发者不断演变的角色
  - 协作增加和责任重叠
- The future of software engineering
  - High demand for professionals with coding skills, business sense, and system oversight capabilities
- 软件工程的未来
  - 对具有编码技能、商业意识和系统监督能力的专业人员需求量很大

---

_Note generated by podwise-episode-notes · 2026-04-10_
_Source: https://podwise.ai/dashboard/episodes/7725884_
