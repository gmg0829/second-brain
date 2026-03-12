# The Bitter Lesson
# 痛苦的教训

> Author / 作者: Rich Sutton
> Date / 日期: March 13, 2019

---

## 第一段 / Paragraph 1

| English | 中文 |
|---------|------|
| The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin. | 从70年的人工智能研究中可以吸取的最大教训是，利用计算力的通用方法最终是最有效的，而且差距很大。 |
| The ultimate reason for this is Moore's law, or rather its generalization of continued exponentially falling cost per unit of computation. | 这最终的原因是摩尔定律，或者更确切地说，是其推广——计算成本持续指数级下降。 |
| Most AI research has been conducted as if the computation available to the agent were constant (in which case leveraging human knowledge would be one of the only ways to improve performance) | 大多数人工智能研究都是在假设智能体可用的计算力是恒定的情况下进行的（在这种情况下，利用人类知识是提高性能的唯一方法之一） |
| but, over a slightly longer time than a typical research project, massively more computation inevitably becomes available. | 但是，在比典型研究项目稍长的时间内，大量的计算力不可避免地变得可用。 |
| Seeking an improvement that makes a difference in the shorter term, researchers seek to leverage their human knowledge of the domain | 寻求在短期内产生影响的改进，研究人员试图利用他们对领域的人类知识 |
| but the only thing that matters in the long run is the leveraging of computation. | 但从长远来看，唯一重要的是利用计算力。 |
| These two need not run counter to each other, but in practice they tend to. | 这两者不必相互抵触，但在实践中它们往往是这样。 |
| Time spent on one is time not spent on the other. | 花在其中一个上的时间就是不能花在另一个上的时间。 |
| There are psychological commitments to investment in one approach or the other. | 对一种方法或另一种方法的投入有心理承诺。 |
| And the human-knowledge approach tends to complicate methods in ways that make them less suited to taking advantage of general methods leveraging computation. | 而且人类知识方法往往会以使方法变得不适合利用通用计算力的方式复杂化。 |

---

## 第二段 - 计算机象棋 / Paragraph 2 - Computer Chess

| English | 中文 |
|---------|------|
| In computer chess, the methods that defeated the world champion, Kasparov, in 1997, were based on massive, deep search. | 在计算机象棋中，1997年击败世界冠军卡斯帕罗夫的方法是基于大规模深度搜索。 |
| At the time, this was looked upon with dismay by the majority of computer-chess researchers who had pursued methods that leveraged human understanding of the special structure of chess. | 当时，大多数追求利用人类对象棋特殊结构理解的方法的计算机象棋研究人员对此感到沮丧。 |
| When a simpler, search-based approach with special hardware and software proved vastly more effective, these human-knowledge-based chess researchers were not good losers. | 当一种更简单的、基于搜索的方法配合特殊硬件和软件被证明非常有效时，这些基于人类知识的象棋研究人员不是好的失败者。 |
| They said that "brute force" search may have won this time, but it was not a general strategy, and anyway it was not how people played chess. | 他们说"暴力"搜索可能这次赢了，但它不是一种通用策略，不管怎样，这不是人们下象棋的方式。 |
| These researchers wanted methods based on human input to win and were disappointed when they did not. | 这些研究人员希望基于人类输入的方法获胜，当他们没有做到时感到失望。 |

---

## 第三段 - 计算机围棋 / Paragraph 3 - Computer Go

| English | 中文 |
|---------|------|
| A similar pattern of research progress was seen in computer Go, only delayed by a further 20 years. | 在计算机围棋中看到了类似的研究进展模式，只是再晚了20年。 |
| Enormous initial efforts went into avoiding search by taking advantage of human knowledge, or of the special features of the game | 巨大的初始努力被用于利用人类知识或游戏的特殊特征来避免搜索 |
| but all those efforts proved irrelevant, or worse, once search was applied effectively at scale. | 但所有这些努力被证明是无关紧要的，或者更糟，一旦搜索被有效大规模应用。 |
| Also important was the use of learning by self play to learn a value function (as it was in many other games and even in chess, although learning did not play a big role in the 1997 program that first beat a world champion). | 同样重要的是利用自我对弈来学习价值函数（在许多其他游戏中，甚至在象棋中也是如此，尽管学习在1997年击败世界冠军的程序中没有发挥重要作用）。 |
| Learning by self play, and learning in general, is like search in that it enables massive computation to be brought to bear. | 自我对弈学习和一般学习，类似于搜索，因为它可以使大量的计算力发挥作用。 |
| Search and learning are the two most important classes of techniques for utilizing massive amounts of computation in AI research. | 搜索和学习是利用人工智能研究中大量计算力的两种最重要的技术类别。 |

---

## 第四段 - 语音识别 / Paragraph 4 - Speech Recognition

| English | 中文 |
|---------|------|
| In speech recognition, there was an early competition, sponsored by DARPA, in the 1970s. | 在语音识别方面，1970年代有一个由DARPA赞助的早期竞赛。 |
| Entrants included a host of special methods that took advantage of human knowledge---knowledge of words, of phonemes, of the human vocal tract, etc. | 参赛者包括许多利用人类知识的特殊方法——关于单词、音素、人声等方面的知识。 |
| On the other side were newer methods that were more statistical in nature and did much more computation, based on hidden Markov models (HMMs). | 另一方面是更新的方法，本质上更统计性，利用更多计算力，基于隐马尔可夫模型（HMMs）。 |
| Again, the statistical methods won out over the human-knowledge-based methods. | 同样，统计方法战胜了基于人类知识的方法。 |
| This led to a major change in all of natural language processing, gradually over decades, where statistics and computation came to dominate the field. | 这导致了整个自然语言处理领域的重大变化，在几十年间逐渐发生，统计和计算开始主导该领域。 |
| The recent rise of deep learning in speech recognition is the most recent step in this consistent direction. | 语音识别中深度学习的兴起是这一持续方向的最新一步。 |
| Deep learning methods rely even less on human knowledge, and use even more computation, together with learning on huge training sets, to produce dramatically better speech recognition systems. | 深度学习方法更少依赖人类知识，使用更多计算力，结合对大型训练集的学习，产生明显更好的语音识别系统。 |

---

## 第五段 - 计算机视觉 / Paragraph 5 - Computer Vision

| English | 中文 |
|---------|------|
| In computer vision, there has been a similar pattern. | 在计算机视觉中，也有类似的模式。 |
| Early methods conceived of vision as searching for edges, or generalized cylinders, or in terms of SIFT features. | 早期方法将视觉概念化为搜索边缘，或广义圆柱体，或SIFT特征。 |
| But today all this is discarded. | 但今天所有这些都被抛弃了。 |
| Modern deep-learning neural networks use only the notions of convolution and certain kinds of invariances, and perform much better. | 现代深度学习神经网络只使用卷积和某些不变性的概念，表现得好得多。 |

---

## 第六段 - 核心教训 / Paragraph 6 - Core Lesson

| English | 中文 |
|---------|------|
| This is a big lesson. | 这是一个重要的教训。 |
| As a field, we still have not thoroughly learned it, as we are continuing to make the same kind of mistakes. | 作为一个领域，我们还没有彻底学习它，因为我们继续犯同样的错误。 |
| To see this, and to effectively resist it, we have to understand the appeal of these mistakes. | 要看到这一点，并有效地抵制它，我们必须理解这些错误的吸引力。 |
| We have to learn the bitter lesson that building in how we think we think does not work in the long run. | 我们必须学习这个痛苦的教训——按照我们认为的方式思考的方式构建——从长远来看是行不通的。 |
| The bitter lesson is based on the historical observations that 1) AI researchers have often tried to build knowledge into their agents | 痛苦的教训是基于历史观察：1）人工智能研究人员经常试图将知识构建到他们的智能体中 |
| 2) this always helps in the short term, and is personally satisfying to the researcher, but | 2）这总是在短期内有所帮助，并且让研究人员个人感到满足，但 |
| 3) in the long run it plateaus and even inhibits further progress, and | 3）从长远来看它停滞不前，甚至阻碍进一步进步，而且 |
| 4) breakthrough progress eventually arrives by an opposing approach based on scaling computation by search and learning. | 4）突破性进展最终通过基于搜索和学习的缩放计算的对立方法到来。 |
| The eventual success is tinged with bitterness, and often incompletely digested, because it is success over a favored, human-centric approach. | 最终成功的程度带有痛苦，而且往往不完全被消化，因为这是对一种流行的、以人为中心的方法的成功。 |

---

## 第七段 - 应该学到的 / Paragraph 7 - What Should Be Learned

| English | 中文 |
|---------|------|
| One thing that should be learned from the bitter lesson is the great power of general purpose methods | 从痛苦教训中应该学到的一件事是通用方法的巨大力量 |
| of methods that continue to scale with increased computation even as the available computation becomes very great. | 即使可用的计算变得非常巨大，这些方法仍然能够随着计算增加而继续扩展。 |
| The two methods that seem to scale arbitrarily in this way are search and learning. | 似乎以这种方式无限扩展的两种方法是搜索和学习。 |
| The second general point to be learned from the bitter lesson is that the actual contents of minds are tremendously, irredeemably complex | 从痛苦教训中应该学到的第二个普遍观点是，心灵的实际内容是巨大的、不可救药的复杂 |
| we should stop trying to find simple ways to think about the contents of minds | 我们应该停止尝试找到关于心灵内容的简单思维方式 |
| such as simple ways to think about space, objects, multiple agents, or symmetries. | 比如关于空间、物体、多个代理或对称性的简单思维方式。 |
| All these are part of the arbitrary, intrinsically-complex, outside world. | 所有这些都是任意的、本质上复杂的外部世界的一部分。 |
| They are not what should be built in, as their complexity is endless | 它们不是应该被构建进去的东西，因为它们的复杂性是无穷的 |
| instead we should build in only the meta-methods that can find and capture this arbitrary complexity. | 相反，我们只应该构建可以发现和捕获这种任意复杂性的元方法。 |
| Essential to these methods is that they can find good approximations, but the search for them should be by our methods, not by us. | 这些方法的关键在于它们可以找到好的近似，但寻找它们应该是我们的方法，而不是我们。 |
| We want AI agents that can discover like we can, not which contain what we have discovered. | 我们想要像我们一样能发现的AI智能体，而不是包含我们已经发现的东西。 |
| Building in our discoveries only makes it harder to see how the discovering process can be done. | 构建我们的发现只是更难看到发现过程是如何完成的。 |

---

## 总结 / Summary

| English | 中文 |
|---------|------|
| General methods that leverage computation are the most effective | 利用计算力的通用方法是最有效的 |
| Human knowledge helps short-term but hinders long-term progress | 人类知识有助于短期但阻碍长期进步 |
| Search and learning are the two most important techniques | 搜索和学习是两种最重要的技术 |
| Build meta-methods, not human knowledge into AI | 构建元方法，而不是人类知识，到AI中 |

---

> Source / 来源: Rich Sutton - The Bitter Lesson (2019)
