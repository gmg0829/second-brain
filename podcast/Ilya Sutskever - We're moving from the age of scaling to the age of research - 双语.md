# Ilya Sutskever — We're moving from the age of scaling to the age of research
# Ilya Sutskever — 我们正从Scaling时代转向研究时代

> Author: Dwarkesh Patel | 作者: Dwarkesh Patel  
> Date: Nov 25, 2025 | 日期: 2025年11月25日

---

## (00:00:00) – Explaining model jaggedness

**Ilya Sutskever:** You know what's crazy? That all of this is real.

**Dwarkesh Patel:** Meaning what?

**Ilya Sutskever:** Don't you think so? All this AI stuff and all this Bay Area… that it's happening. Isn't it straight out of science fiction?

**Dwarkesh Patel:** Another thing that's crazy is how normal the slow takeoff feels. The idea that we'd be investing 1% of GDP in AI, I feel like it would have felt like a bigger deal, whereas right now it just feels...

**Ilya Sutskever:** We get used to things pretty fast, it turns out. But also it's kind of abstract. What does it mean? It means that you see in the news, that such and such company announced such and such dollar amount. That's all you see. It's not really felt in any other way so far.

---

(00:00:00) – 解释模型的"参差不齐"

**Ilya Sutskever:** 你知道最疯狂的是什么吗？这一切都是真的。

**Dwarkesh Patel:** 什么意思？

**Ilya Sutskever:** 你不觉得这很疯狂吗？所有这些 AI 的东西，整个湾区……它正在发生。这难道不是直接从科幻小说里出来的吗？

**Dwarkesh Patel:** 另一件疯狂的事情是，这种缓慢的起飞感觉多么正常。我们要投资 GDP 的 1% 在 AI 上，我觉得这应该感觉是件更大的事，但 Right now it just feels...

**Ilya Sutskever:** 事实证明，我们很快就会习惯这些事情。但这也有点抽象。这是什么意思？意思是你在新闻中看到，某家公司宣布了某笔难以理解的金额。你看到的就这些。目前为止，它还没有以任何其他方式被真正感受到。

---

**Dwarkesh Patel:** Should we actually begin here? I think this is an interesting discussion.

**Ilya Sutskever:** Sure.

**Dwarkesh Patel:** I think your point, about how from the average person's point of view nothing is that different, will continue being true even into the singularity.

**Ilya Sutskever:** No, I don't think so.

**Dwarkesh Patel:** Okay, interesting.

**Ilya Sutskever:** The thing which I was referring to not feeling different is, okay, such and such company announced some difficult-to-comprehend dollar amount of investment. I don't think anyone knows what to do with that. But I think the impact of AI is going to be felt. AI is going to be diffused through the economy. There'll be very strong economic forces for this, and I think the impact is going to be felt very strongly.

---

**Dwarkesh Patel:** 我们应该从这里开始吗？我觉得这是一个有趣的讨论。

**Ilya Sutskever:** 当然。

**Dwarkesh Patel:** 我觉得你的观点是，从普通人的角度来看，没有什么不同的，这种感觉即使到奇点也会继续是真的。

**Ilya Sutskever:** 不，我不这么认为。

**Dwarkesh Patel:** 好吧，有趣。

**Ilya Sutskever:** 我所指的感觉没有什么不同的事情是，好吧，某家公司宣布了一笔难以理解的金额的投资。我觉得没有人知道该怎么做这件事。但我认为 AI 的影响将会被感受到。AI 将通过经济扩散。将会为此出现非常强大的经济力量，我认为影响将会被强烈感受到。

---

**Dwarkesh Patel:** When do you expect that impact? I think the models seem smarter than their economic impact would imply.

**Ilya Sutskever:** Yeah. This is one of the very confusing things about the models right now. How to reconcile the fact that they are doing so well on evals? You look at the evals and you go, "Those are pretty hard evals." They are doing so well. But the economic impact seems to be dramatically behind. It's very difficult to make sense of, how can the model, on the one hand, do these amazing things, and then on the other hand, repeat itself twice in some situation? An example would be, let's say you use vibe coding to do something. You go to some place and then you get a bug. Then you tell the model, "Can you please fix the bug?" And the model says, "Oh my God, you're so right. I have a bug. Let me go fix that." And it introduces a second bug. Then you tell it, "You have this new second bug," and it tells you, "Oh my God, how could I have done it? You're so right again," and brings back the first bug, and you can alternate between those. How is that possible? I'm not sure, but it does suggest that something strange is going on.

---

**Dwarkesh Patel:** 你期望这种影响什么时候发生？我觉得这些模型看起来比它们的经济影响所显示的更聪明。

**Ilya Sutskever:** 是的。这是目前模型最令人困惑的事情之一。如何调和它们在评估中做得如此出色这个事实？你看看评估，你会说，"这些评估相当难。"它们做得很好。但经济影响似乎大大落后。很难理解，模型一方面如何能做这些惊人的事情，另一方面在某些情况下会重复自己两次？比如说，你用 vibe coding 做了一些事情。你去了某个地方，然后你遇到了一个 bug。然后你告诉模型，"你能帮我修复这个 bug 吗？"模型说，"哦天哪，你说得对。我有一个 bug。让我去修复它。"然后它引入了第二个 bug。然后你告诉它，"你有这个新的第二个 bug，"它告诉你，"哦天哪，我怎么会这样做？你又说对了，"然后把第一个 bug 带回来，你可以在它们之间交替。这怎么可能？我不确定，但这确实表明有些奇怪的事情正在发生。

---

**Ilya Sutskever:** I have two possible explanations. The more whimsical explanation is that maybe RL training makes the models a little too single-minded and narrowly focused, a little bit too unaware, even though it also makes them aware in some other ways. Because of this, they can't do basic things. But there is another explanation. Back when people were doing pre-training, the question of what data to train on was answered, because that answer was everything. When you do pre-training, you need all the data. So you don't have to think if it's going to be this data or that data. But when people do RL training, they do need to think. They say, "Okay, we want to have this kind of RL training for this thing and that kind of RL training for that thing." From what I hear, all the companies have teams that just produce new RL environments and just add it to the training mix. The question is, well, what are those? There are so many degrees of freedom. There is such a huge variety of RL environments you could produce. One thing you could do, and I think this is something that is done inadvertently, is that people take inspiration from the evals. You say, "Hey, I would love our model to do really well when we release it. I want the evals to look great. What would be RL training that could help on this task?" I think that is something that happens, and it could explain a lot of what's going on.

---

**Ilya Sutskever:** 我有两个可能的解释。更有趣的解释是，也许 RL 训练让模型变得有点过于专注，过于狭隘，即使它在其他方面也让它们变得敏锐。因为这个原因，它们不能做基本的事情。但还有另一个解释。过去人们做预训练时，训练什么数据的问题已经有了答案，因为答案是所有数据。当你做预训练时，你需要所有的数据。所以你不必考虑是这些数据还是那些数据。但当人们做 RL 训练时，他们确实需要思考。他们说，"好吧，我们想要这种事物的 RL 训练和那种事物的 RL 训练。"据我所知，所有公司都有团队专门生产新的 RL 环境，并将其添加到训练混合中。问题是，这些是什么？有太多的自由度。有太多你可以生产的 RL 环境变体。你可以做的的一件事，我觉得这是无意中做的，是人们从评估中获得灵感。你说，"嘿，我很乐意让我们的模型在发布时做得非常好。我希望评估看起来很棒。什么样的 RL 训练可以帮助这个任务？"我觉得这是一件正在发生的事情，它可以解释很多正在发生的事情。

---

## (00:09:39) – Emotions and value functions

**Ilya Sutskever:** What does it say about the role of our built-in emotions in making us a viable agent, essentially? To connect to your question about pre-training, maybe if you are good enough at getting everything out of pre-training, you could get that as well. But that's the kind of thing which seems... Well, it may or may not be possible to get that from pre-training.

**Dwarkesh Patel:** What is "that"? Clearly not just directly emotion. It seems like some almost value function-like thing which is telling you what the end reward for any decision should be. You think that doesn't sort of implicitly come from pre-training?

**Ilya Sutskever:** I think it could. I'm just saying it's not 100% obvious.

---

(00:09:39) – 情绪和价值函数

**Ilya Sutskever:** 这对我们内置情绪在使我们成为可行的主体方面的角色说明了什么？联系到你关于预训练的问题，也许如果你足够擅长从预训练中获得一切，你也可以得到那一切。但这类事情似乎……好吧，从预训练中是否可能获得那一切还不太确定。

**Dwarkesh Patel:** "那"是什么？显然不仅仅是直接的情感。它似乎是某种几乎是价值函数的东西，告诉你任何决定的最终奖励应该是什么。你认为这不会隐含地来自预训练？

**Ilya Sutskever:** 我觉得可以。我只是说这不是 100% 明显的。

---

**Ilya Sutskever:** When people do reinforcement learning, the way reinforcement learning is done right now, how do people train those agents? You have your neural net and you give it a problem, and then you tell the model, "Go solve it." The model takes maybe thousands, hundreds of thousands of actions or thoughts or something, and then it produces a solution. The solution is graded. And then the score is used to provide a training signal for every single action in your trajectory. That means that if you are doing something that goes for a long time—if you're training a task that takes a long time to solve—it will do no learning at all until you come up with the proposed solution.

---

**Ilya Sutskever:** 当人们做强化学习时，现在强化学习的方式是怎样的？人们如何训练这些 agent？你有一个神经网络，你给它一个问题，然后你告诉模型，"去解决它。"模型可能需要数千、数十万次动作或想法，然后产生一个解决方案。解决方案被评分。然后分数被用来为你的轨迹中的每一个动作提供训练信号。这意味着如果你正在做一件需要很长时间的事情——如果你正在训练一个需要很长时间才能解决的任务——在你提出解决方案之前，它根本不会学习。

---

**The value function** says something like, "Maybe I could sometimes, not always, tell you if you are doing well or badly." The notion of a value function is more useful in some domains than others. For example, when you play chess and you lose a piece, I messed up. You don't need to play the whole game to know that what I just did was bad, and therefore whatever preceded it was also bad. The value function lets you short-circuit the wait until the very end.

**价值函数**会说一些类似的事情，"也许我有时可以，不是总是，告诉你做得怎么样。"价值函数的概念在某些领域比其他领域更有用。例如，当你下棋丢了一个子，我搞砸了。你不需要下完整盘棋才知道我刚才做得不好，因此之前的那些步也不好。价值函数让你短路，等待直到最后。

---

## (00:18:49) – What are we scaling?

**Ilya Sutskever:** Companies love this because it gives you a very low-risk way of investing your resources. It's much harder to invest your resources in research. Compare that. If you research, you need to be like, "Go forth researchers and research and come up with something", versus get more data, get more compute. You know you'll get something from pre-training. Indeed, it looks like, based on various things some people say on Twitter, maybe it appears that Gemini have found a way to get more out of pre-training. At some point though, pre-training will run out of data. The data is very clearly finite. What do you do next? Either you do some kind of souped-up pre-training, a different recipe from the one you've done before, or you're doing RL, or maybe something else.

---

(00:18:49) – 我们在扩展什么？

**Ilya Sutskever:** 公司喜欢这个，因为它给你一种非常低风险的方式投资你的资源。在研究上投资你的资源要困难得多。比较一下。如果你做研究，你需要像这样，"去吧，研究人员们，去研究并想出一些东西"，而不是获得更多数据，获得更多计算。你知道你会从预训练中得到一些东西。事实上，根据一些人在 Twitter 上说的各种事情，看起来 Gemini 可能已经找到了一种从预训练中获得更多东西的方法。但在某个时候，预训练会耗尽数据。数据显然是非常有限的。你接下来怎么做？要么你做某种增强的预训练，一个与你之前做的不同的方法，或者你做 RL，或者其他什么。

---

## (00:25:13) – Why humans generalize better than models

**Ilya Sutskever:** The thing which I think is the most fundamental is that these models somehow just generalize dramatically worse than people. It's super obvious. That seems like a very fundamental thing.

**Dwarkesh Patel:** So this is the crux: generalization. There are two sub-questions. There's one which is about sample efficiency: why should it take so much more data for these models to learn than humans? There's a second question. Even separate from the amount of data it takes, why is it so hard to teach the thing we want to a model than to a human?

---

(00:25:13) – 为什么人类比模型泛化得更好

**Ilya Sutskever:** 我认为最根本的事情是，这些模型在某种程度上泛化得比人类差得多。这超级明显。这似乎是一件非常根本的事情。

**Dwarkesh Patel:** 所以这是核心：泛化。有两个子问题。一个是关于样本效率的：为什么这些模型学习需要比人类多得多得多的数据？第二个问题是，即使与数据量无关，为什么教模型我们想要的东西比教人类难得多？

---

## (00:35:45) – Straight-shotting superintelligence

**Ilya Sutskever:** Maybe. I think that there is merit to it. I think there's a lot of merit because it's very nice to not be affected by the day-to-day market competition. But I think there are two reasons that may cause us to change the plan. One is pragmatic, if timelines turned out to be long, which they might. Second, I think there is a lot of value in the best and most powerful AI being out there impacting the world. I think this is a meaningfully valuable thing.

---

(00:35:45) – 直击超级智能

**Ilya Sutskever:** 也许。我觉得这有它的优点。我觉得有很多优点，因为不受日常市场竞争的影响非常好。但我认为有两个原因可能会导致我们改变计划。一是务实的，如果时间线很长的话。二是，我认为最好、最强大的 AI 在外面影响世界有很大的价值。我认为这是一件有意义有价值的事情。

---

## (00:46:47) – SSI's model will learn from deployment

**Ilya Sutskever:** The term AGI, why does this term exist? It's a very particular term. Why does it exist? There's a reason. The reason that the term AGI exists is, in my opinion, not so much because it's a very important, essential descriptor of some end state of intelligence, but because it is a reaction to a different term that existed, and the term is narrow AI.

---

(00:46:47) – SSI的模型将从部署中学习

**Ilya Sutskever:** AGI 这个术语，为什么存在这个术语是一个非常特殊的术语。为什么存在？有一个原因。在我看来，AGI 这个术语存在的原因不是因为它是某种智能最终状态的重要基本描述，而是因为它是对另一个已经存在的术语的反应，那个术语是窄 AI。

---

**Ilya Sutskever:** I produce a superintelligent 15-year-old that's very eager to go. They don't know very much at all, a great student, very eager. You go and be a programmer, you go and be a doctor, go and learn. So you could imagine that the deployment itself will involve some kind of a learning trial-and-error period. It's a process, as opposed to you dropping the finished thing.

**Ilya Sutskever:** 我制造了一个超级智能的 15 岁孩子，它非常渴望出发。它几乎什么都不知道，一个伟大的学生，非常渴望。你去做程序员，去做医生，去学习。所以你可以想象部署本身将涉及某种学习试错期。这是一个过程，而不是你放下成品。

---

## (00:55:07) – Alignment

**Ilya Sutskever:** I maintain that most people who work on AI also can't imagine it because it's too different from what people see on a day-to-day basis. I do maintain, here's something which I predict will happen. This is a prediction. I maintain that as AI becomes more powerful, people will change their behaviors. We will see all kinds of unprecedented things which are not happening right now.

---

(00:55:07) – 对齐

**Ilya Sutskever:** 我坚持认为大多数从事 AI 的人也无法想象它，因为它与人们日常看到的东西太不一样了。我坚持认为，这里有一些我预测将会发生的事情。这是一个预测。我坚持认为，随着 AI 变得更强大，人们将改变他们的行为。我们将看到各种目前没有发生的前所未有的事情。

---

**Ilya Sutskever:** I maintain that there is something that's better to build, and I think that everyone will want that. It's the AI that's robustly aligned to care about sentient life specifically. I think in particular, there's a case to be made that it will be easier to build an AI that cares about sentient life than an AI that cares about human life alone, because the AI itself will be sentient.

---

**Ilya Sutskever:** 我坚持认为有一些东西是更好的来建造，我认为每个人都会想要那个。它是稳健对齐的 AI，特别关心有感知能力的生命。我认为特别是，可以说建造关心有感知能力生命的 AI 比单独关心人类生命的 AI 更容易，因为 AI 本身将是有感知能力的。

---

## (01:18:13) – "We are squarely an age of research company"

**Ilya Sutskever:** The way I would describe it is that there are some ideas that I think are promising and I want to investigate them and see if they are indeed promising or not. It's really that simple. It's an attempt. If the ideas turn out to be correct—these ideas that we discussed around understanding generalization—then I think we will have something worthy. Will they turn out to be correct? We are doing research. We are squarely an "age of research" company. We are making progress. We've actually made quite good progress over the past year, but we need to keep making more progress, more research.

---

(01:18:13) – "我们完全是一家研究时代的公司"

**Ilya Sutskever:** 我会这样描述它，有一些想法我认为很有前景，我想研究它们，看看它们是否确实有前景。真的就这么简单。这是一种尝试。如果这些想法被证明是正确的——这些我们讨论的关于理解泛化的想法——那么我认为我们将有一些有价值的东西。它们会被证明是正确的吗？我们正在做研究。我们完全是一家"研究时代"的公司。我们正在取得进步。实际上我们在过去一年取得了相当好的进展，但我们需要继续取得更多进展，做更多研究。

---

## (01:29:23) – Self-play and multi-agent

**Dwarkesh Patel:** Why is it that if you look at different models, even released by totally different companies trained on potentially non-overlapping datasets, it's actually crazy how similar LLMs are to each other?

**Ilya Sutskever:** Maybe the datasets are not as non-overlapping as it seems.

**Dwarkesh Patel:** But there's some sense in which even if an individual human might be less productive than the future AI, maybe there's something to the fact that human teams have more diversity than teams of AIs might have. How do we elicit meaningful diversity among AIs?

---

(01:29:23) – 自我对弈和多智能体

**Dwarkesh Patel:** 为什么即使是由完全不同的公司训练的、在可能不重叠的数据集上训练的，不同的模型，LLM 之间的相似程度令人疯狂？

**Ilya Sutskever:** 也许数据集并不像看起来那样不重叠。

**Dwarkesh Patel:** 但即使人类个体可能不如未来的 AI 高效，也许人类团队比 AI 团队有更多的多样性这一事实有些道理。我们如何从 AI 中引出有意义的多样性？

---

## (01:32:42) – Research taste

**Dwarkesh Patel:** Final question: What is research taste? You're obviously the person in the world who is considered to have the best taste in doing research in AI. You were the co-author on the biggest things that have happened in the history of deep learning, from AlexNet to GPT-3 to so on. What is it, how do you characterize how you come up with these ideas?

**Ilya Sutskever:** One thing that guides me personally is an aesthetic of how AI should be, by thinking about how people are, but thinking correctly. It's very easy to think about how people are incorrectly, but what does it mean to think about people correctly? I'll give you some examples.

---

(01:32:42) – 研究品味

**Dwarkesh Patel:** 最后一个问题：研究品味是什么？你显然是世界上被认为在 AI 研究方面最有品味的人。你是深度学习历史上最重要事件的合著者，从 AlexNet 到 GPT-3 等等。是什么？你如何描述你想出这些想法的方式？

**Ilya Sutskever:** 指导我个人的一件事是 AI 应该是什么样的美学，通过思考人是什么样的，但正确地思考。思考人是什么样的很容易出错，但正确地思考人是什么意思？让我给你一些例子。

---

**Ilya Sutskever:** The idea of the artificial neuron is directly inspired by the brain, and it's a great idea. Why? Because you say the brain has all these different organs, it has the folds, but the folds probably don't matter. Why do we think that the neurons matter? Because there are many of them. It kind of feels right, so you want the neuron. You want some local learning rule that will change the connections between the neurons. It feels plausible that the brain does it. The idea of the distributed representation. The idea that the brain responds to experience therefore our neural net should learn from experience. The brain learns from experience, the neural net should learn from experience.

---

**Ilya Sutskever:** 人工神经元的想法直接受大脑启发，这是一个伟大的想法。为什么？因为你说大脑有所有这些不同的器官，它有褶皱，但褶皱可能不重要。为什么我们认为神经元重要？因为它们有很多。感觉有点对，所以你想要神经元。你想要一些改变神经元之间连接的局部学习规则。感觉大脑这样做是可信的。分布式表征的想法。大脑对经验做出反应因此我们的神经网络应该从经验学习。大脑从经验学习，神经网络应该从经验学习。

---

**Ilya Sutskever:** You kind of ask yourself, is something fundamental or not fundamental? How things should be. I think that's been guiding me a fair bit, thinking from multiple angles and looking for almost beauty, beauty and simplicity. Ugliness, there's no room for ugliness. It's beauty, simplicity, elegance, correct inspiration from the brain. All of those things need to be present at the same time. The more they are present, the more confident you can be in a top-down belief. The top-down belief is the thing that sustains you when the experiments contradict you.

---

**Ilya Sutskever:** 你会问自己一些事情，是根本的还是非根本的？事情应该如何。我觉得这一直在相当程度上指导着我，从多个角度思考，寻求近乎美的东西，美和简洁。丑陋，没有丑陋的空间。它是美、简洁、优雅、正确的来自大脑的灵感。所有这些需要同时存在。它们存在越多，你就越能相信自上而下的信念。自上而下的信念是当实验与你矛盾时支撑你的东西。

---

## Summary / 总结

### Key Points from Ilya Sutskever:

1. **模型泛化问题**: 模型泛化能力比人类差很多，这是根本性问题

2. **RL 很糟糕**: 强化学习效率很低，像"用吸管吸取监督"

3. **预训练 vs RL**: 预训练是扩展的最佳方式，但数据有限；RL 是未来方向

4. **价值函数**: 人类有情感作为内置价值函数，AI 需要类似的东西

5. **SSI 策略**: 直接瞄准超级智能，通过部署学习

6. **对齐**: 建造关心有感知能力生命的 AI

7. **研究品味**: 美、简洁、优雅、来自大脑的正确灵感

8. **时间线预测**: 5-20 年

---

### Ilya Sutskever 要点：

1. **模型泛化问题**：模型泛化能力比人类差很多，这是根本性问题

2. **RL 很糟糕**：强化学习效率很低，像"用吸管吸取监督"

3. **预训练 vs RL**：预训练是扩展的最佳方式，但数据有限；RL 是未来方向

4. **价值函数**：人类有情感作为内置价值函数，AI 需要类似的东西

5. **SSI 策略**：直接瞄准超级智能，通过部署学习

6. **对齐**：建造关心有感知能力生命的 AI

7. **研究品味**：美、简洁、优雅、来自大脑的正确灵感

8. **时间线预测**：5-20 年
