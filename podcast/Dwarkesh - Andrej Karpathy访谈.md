# Andrej Karpathy 访谈 - 关于 AI、教育和未来
## Andrej Karpathy Interview - On AI, Education, and the Future

> 来源: Dwarkesh Podcast | Source: Dwarkesh Podcast
> 日期: 2024年 | Date: 2024
> 嘉宾: Andrej Karpathy | Guest: Andrej Karpathy

---

## 01:00:30 - 训练数据的困境 / The Training Data Problem

**Andrej Karpathy**

Here's the issue, the training data is the internet, which is really terrible. There's a huge amount of gains to be made because the internet is terrible. Even the internet, when you and I think of the internet, you're thinking of like The Wall Street Journal. That's not what this is. When you're looking at a pre-training dataset in the frontier lab and you look at a random internet document, it's total garbage. I don't even know how this works at all. It's some like stock tickers, symbols, it's a huge amount of slop and garbage from like all the corners of the internet. It's not like your Wall Street Journal article, that's extremely rare. So because the internet is so terrible, we have to build really big models to compress all that. Most of that compression is memory work instead of cognitive work.

这里的问题是，训练数据是互联网，这真的太糟糕了。因为互联网太差了，所以还有巨大的提升空间。即使是我们想到的互联网，你也会想到《华尔街日报》之类的。但实际上不是这样的。当你在前沿实验室看预训练数据集时，你看到的随机互联网文档完全是垃圾。我都不知道这怎么运作的。有些是股票代码、符号，是互联网上各个角落的大量垃圾和废话。不像你的《华尔街日报》文章，那是非常罕见的。所以因为互联网太差了，我们不得不构建非常大的模型来压缩所有这些。大多数压缩是记忆工作而不是认知工作。

But what we really want is the cognitive part, delete the memory. I guess what I'm saying is that we need intelligent models to help us refine even the pre-training set to just narrow it down to the cognitive components. Then I think you get away with a much smaller model because it's a much better dataset and you could train it on it. But probably it's not trained directly on it, it's probably distilled from a much better model still.

但我们真正想要的是认知部分，删除记忆。我想说的是，我们需要智能模型来帮助我们优化预训练集，只保留认知部分。这样你就可以用一个更小的模型，因为它是一个好得多的数据集，你可以用它来训练。但可能它不是直接在上面训练的，而是从一个更好的模型蒸馏而来的。

---

## 01:02:01 - 模型规模的极限 / The Limits of Model Scale

**Dwarkesh Patel**

Yeah. If you look at the trend over the last few years of just finding low-hanging fruit and going from trillion plus models to models that are literally two orders of magnitude smaller in a matter of two years and having better performance, it makes me think the sort of core of intelligence might be even way, way smaller. Plenty of room at the bottom, to paraphrase Feynman.

是的。如果你看看过去几年的趋势，从万亿参数模型到在两年内小两个数量级但性能更好的模型，这让我觉得智能的核心可能甚至更小。套用费曼的话来说：底部还有大量空间。

**Andrej Karpathy**

I feel like I'm already contrarian by talking about a billion parameter cognitive core and you're outdoing me. Maybe we could get a little bit smaller. I do think that practically speaking, you want the model to have some knowledge. You don't want it to be looking up everything because then you can't think in your head. You're looking up way too much stuff all the time. Some basic curriculum needs to be there for knowledge, but it doesn't have esoteric knowledge.

我觉得我已经够反动了，说十亿参数的认知核心，你却比我更激进。也许我们可以再小一点。确实，实际上你希望模型有一些知识。你不希望它查一切东西，因为那样你就无法在脑中思考。你总是在查找太多东西。一些基础课程需要有知识，但它不必是晦涩的知识。

---

## 01:03:14 - 前沿模型的未来 / The Future of Frontier Models

**Andrej Karpathy**

I don't have a super strong prediction. The labs are just being practical. They have a flops budget and a cost budget. It just turns out that pre-training is not where you want to put most of your flops or your cost. That's why the models have gotten smaller. They are a bit smaller, the pre-training stage is smaller, but they make it up in reinforcement learning, mid-training, and all this stuff that follows. They're just being practical in terms of all the stages and how you get the most bang for the buck.

我没有很强的预测。实验室们只是很实际。他们有浮点运算预算和成本预算。事实证明，预训练不是你想要投入大部分浮点运算或成本的地方。这就是为什么模型变小了。预训练阶段变小了，但他们通过强化学习、中期训练和后续所有东西来弥补。他们在各阶段都很实际，想的是如何让每一分钱花得更有价值。

---

## 01:06:25 - AGI 会融入 2% 的 GDP 增长 / AGI Will Blend Into 2% GDP Growth

**Andrej Karpathy**

I see it as a progression of automation in society. Extrapolating the trend of computing, there will be a gradual automation of a lot of things, and superintelligence will an extrapolation of that. We expect more and more autonomous entities over time that are doing a lot of the digital work and then eventually even the physical work some amount of time later. Basically I see it as just automation, roughly speaking.

我认为这是社会自动化的进程。推算计算的趋势，很多东西会逐渐自动化，超级智能会是其延伸。我们期望随着时间推移有越来越多的自主实体做大量数字工作，然后最终甚至在某种程度上做体力工作。基本上，我认为这只是自动化的延伸。

But one of the things that people do is invent new things, which I would just put into the automation if that makes sense.

但人们做的事情之一是发明新东西，如果说得通的话，我会把它归入自动化。

---

## 01:17:36 - 超级智能 / Superintelligence

**Andrej Karpathy**

I think it will. It is fundamentally automation, but it will be extremely foreign. It will look really strange. Like you mentioned, we can run all of this on a computer cluster and much faster.

我觉得会。它本质上是自动化，但会非常陌生。看起来会很奇怪。就像你说的，我们可以在计算机集群上运行所有这些，而且快得多。

Some of the scenarios that I start to get nervous about when the world looks like that is this gradual loss of control and understanding of what's happening. I think that's the most likely outcome, that there will be a gradual loss of understanding. We'll gradually layer all this stuff everywhere, and there will be fewer and fewer people who understand it. Then there will be a gradual loss of control and understanding of what's happening. That to me seems the most likely outcome of how all this stuff will go down.

当世界变成那样时，一些开始让我紧张的场景是逐渐失去对正在发生事情的控制和理解。我认为最可能的结果是逐渐失去理解。我们会逐渐把所有东西层层叠加到各处越来越少人理解。然后会逐渐失去对正在发生事情的控制和理解。在我看来，这似乎是最可能的结果。

---

## 01:42:55 - 为什么自动驾驶花了这么久 / Why Self-Driving Took So Long

**Andrej Karpathy**

One thing I will almost instantly push back on is that this is not even near done, in a bunch of ways that I'm going to get to. Self-driving is very interesting because it's definitely where I get a lot of my intuitions because I spent five years on it. It has this entire history where the first demos of self-driving go all the way to the 1980s. You can see a demo from CMU in 1986. There's a truck that's driving itself on roads.

我几乎立即要反驳的是，这甚至还没完成，从很多方面来说都是如此自动驾驶非常有趣，因为我花了五年时间，它确实给了我很多直觉。它的历史可以追溯到 1980 年代自动驾驶的第一次演示。你可以看到卡内基梅隆大学 1986 年的演示，有一辆卡车自己在路上行驶。

Fast forward. When I was joining Tesla, I had a very early demo of Waymo. It basically gave me a perfect drive in 2014 or something like that, so a perfect Waymo drive a decade ago. It took us around Palo Alto and so on because I had a friend who worked there. I thought it was very close and then it still took a long time.

快进到当我加入特斯拉时，我有一个非常早期的 Waymo 演示。它在 2014 年左右给了我一次完美的驾驶，所以十年前就是一次完美的 Waymo 驾驶。它载着我在帕洛阿尔托周围行驶，因为我有一个在那里工作的朋友。我以为非常接近了，但仍然花了很长时间。

For some kinds of tasks and jobs and so on, there's a very large demo-to-product gap where the demo is very easy, but the product is very hard. It's especially the case in cases like self-driving where the cost of failure is too high.

对于某些类型的任务和工作等，演示到产品的差距非常大，演示很容易，但产品非常困难。在自动驾驶这种情况下尤其如此，因为失败的成本太高。

---

## 01:56:20 - 教育的未来 / The Future of Education

**Andrej Karpathy**

The easiest way I can describe it is we're trying to build the Starfleet Academy. I don't know if you've watched Star Trek. Starfleet Academy is this elite institution for frontier technology, building spaceships, and graduating cadets to be the pilots of these spaceships and whatnot. So I just imagine an elite institution for technical knowledge and a kind of school that's very up-to-date and a premier institution.

我能描述它的最简单方式是：我们试图建造星际舰队学院。我不知道你是否看过《星际迷航》。星际舰队学院是一所前沿技术的精英机构，制造飞船，毕业的学员成为这些飞船的飞行员等等。所以我想象的是一个技术知识的精英机构，一种非常与时俱进的一流学校。

---

## 02:14:58 - 如何教好技术内容 / How to Teach Technical Content Well

**Andrej Karpathy**

That's a pretty broad topic. There are 10-20 tips and tricks that I semi-consciously do probably. But a lot of this comes from my physics background. I really, really did enjoy my physics background. I have a whole rant on how everyone should learn physics in early school education because early school education is not about accumulating knowledge or memory for tasks later in the industry. It's about booting up a brain. Physics uniquely boots up the brain the best because some of the things that they get you to do in your brain during physics is extremely valuable later.

这是一个相当广泛的话题。我可能半自觉地做了 10-20 个技巧。但很多都来自我的物理学背景。我真的非常喜欢我的物理学背景。我有一整套关于为什么每个人都应该在早期学校教育中学习物理的论点，因为早期学校教育不是为了积累知识或为后来的行业任务记忆。而是启动大脑。物理学是启动大脑最好的方式，因为在物理学中让你在大脑中做的一些事情后来非常有价值。

The idea of building models and abstractions and understanding that there's a first-order approximation that describes most of the system, but then there're second-order, third-order, fourth-order terms that may or may not be present. The idea that you're observing a very noisy system, but there are these fundamental frequencies that you can abstract away.

构建模型和抽象的概念，理解存在一个描述系统大部分的一阶近似，但还有二阶、三阶、四阶项可能存在或不存在。你观察一个非常嘈杂的系统，但存在你可以抽象掉的基本频率。

---

## 02:18:41 - 从二元组到 Transformer / From Bigrams to Transformer

**Dwarkesh Patel**

It also makes the learning experience so much more motivated. Your tutorial on the transformer begins with bigrams, literally a lookup table from, "Here's the word right now, or here's the previous word, here's the next word." It's literally just a lookup table.

这也让学习体验更有动力。你关于 Transformer 的教程从二元组开始，字面上就是一个查找表，"这是现在的词，或者这是前一个词，这是下一个词。"字面上就是一个查找表。

**Andrej Karpathy**

That's the essence of it, yeah.

是的，这就是本质。

**Dwarkesh Patel**

It's such a brilliant way, starting with a lookup table and then going to a transformer. Each piece is motivated. Why would you add that? Why would you add the next thing? You could memorize the attention formula, but having an understanding of why every single piece is relevant, what problem it solves.

这是一种如此巧妙的方式，从查找表开始，然后到 Transformer。每一部分都有动机。为什么你要加那个？为什么你要加下一个？你可以记住注意力公式，但为什么要理解每一个部分的相关性，它解决什么问题。

**Andrej Karpathy**

You're presenting the pain before you present a solution, and how clever is that? You want to take the student through that progression. There are a lot of other small things that make it nice and engaging and interesting. Always prompting the student.

你在展示解决方案之前先展示痛点，这有多聪明？你想让学生经历这个过程。还有很多其他小细节让它变得很好、很吸引人、很有趣。总是提示学生。

There's a lot of small things like that are important and a lot of good educators will do this. How would you solve this? I'm not going to present the solution before you guess. That would be wasteful. That's a little bit of a... I don't want to swear but it's a dick move towards you to present you with the solution before I give you a shot to try to come up with it yourself.

有很多这样的小细节很重要，很多好老师会这样做。你会怎么解决？我不会在你猜之前展示解决方案。那会浪费。我不想骂人，但在你尝试自己找出解决方案之前把答案给你，这是一种很差劲的行为。

---

## 02:21:19 - 解释事物的最佳方式 / The Best Way to Explain Things

**Andrej Karpathy**

Another trick that just works astoundingly well. If somebody writes a paper or a blog post or an announcement, it is in 100% of cases that just the narration or the transcription of how they would explain it to you over lunch is way more, not only understandable, but actually also more accurate and scientific, in the sense that people have a bias to explain things in the most abstract, jargon-filled way possible and to clear their throat for four paragraphs before they explain the central idea. But there's something about communicating one-on-one with a person which compels you to just say the thing.

另一个效果惊人的技巧。如果有人写论文、博客文章或公告，在 100% 的情况下，他们午餐时如何向你解释的叙述或转录不仅更容易理解，实际上也更准确和科学，因为人们有一种倾向，用尽可能抽象、充满术语的方式解释事物，在解释核心想法之前先清清嗓子。但一对一的交流有一些东西迫使你直接说出重点。

---

## 02:23:20 - 学习策略 / Learning Strategies

**Andrej Karpathy**

I don't know that I have unique tips and tricks, to be honest. It's a painful process. One thing that has always helped me quite a bit is—I had a small tweet about this—learning things on demand is pretty nice. Learning depth-wise. I do feel you need a bit of alternation of learning depth-wise, on demand—you're trying to achieve a certain project that you're going to get a reward from—and learning breadth-wise, which is just, "Oh, let's do whatever 101, and here's all the things you might need." Which is a lot of school—does breadth-wise learning, like, "Oh, trust me, you'll need this later," that kind of stuff. Okay, I trust you. I'll learn it because I guess I need it. But I love the kind of learning where you'll get a reward out of doing something, and you're learning on demand.

说实话，我不确定我有什么独特的技巧。这是一个痛苦的过程。一件一直帮了我很多的事情是——我发过一条关于这个的推文——按需学习非常好。深度学习。我确实觉得你需要交替进行深度学习和按需学习——你试图完成一个会得到回报的项目——和广度学习，也就是"哦，让我们做某个 101 课程，这是你可能需要的所有东西。"这就是很多学校做的广度学习，比如说"哦，相信我，你以后会需要这个的。"好的，我相信你。我会学它因为我觉得我需要它。但我喜欢那种你会从做某事中得到回报的学习，你按需学习。

The other thing that I've found extremely helpful. This is an aspect where education is a bit more selfless, but explaining things to people is a beautiful way to learn something more deeply. This happens to me all the time. It probably happens to other people too because I realize if I don't really understand something, I can't explain it. I'm trying and I'm like, "Oh, I don't understand this." It's so annoying to come to terms with that. You can go back and make sure you understood it. It fills these gaps of your understanding. It forces you to come to terms with them and to reconcile them.

我发现的另一件非常有帮助的事情。这是一个教育方面有点无私的部分，但向别人解释是更深层次学习某事的绝佳方式。这种情况经常发生在我身上。可能其他人也会，因为我知道如果我不真正理解某事，我就无法解释它。我尝试着然后我说"哦，我不懂这个。"接受这一点太烦人了。你可以回去确保你理解了。它填补了你理解的空白。它迫使你接受它们并调和它们。

I love to re-explain things and people should be doing that more as well. That forces you to manipulate the knowledge and make sure that you know what you're talking about when you're explaining it.

我喜欢重新解释事情，人们也应该更多地这样做。它迫使你运用知识，确保你在解释时知道自己在说什么。
