---
title: "What is the Alpha Beta algorithm? - Artificial Intelligence"
video_id: "Sim2mJDZ5Ec"
channel: "Gaurav Sen"
url: "https://www.youtube.com/watch?v=Sim2mJDZ5Ec"
description: "This tutorial explains what Alpha-Beta Pruning is and how it helps reduce the branching factor in a game tree. The technique is extensively used to program artificial intelligence for playing games."
language: zh
---

# 什么是Alpha-Beta剪枝算法？

## 视频标题
What is the Alpha Beta algorithm? - Artificial Intelligence

## 视频ID
Sim2mJDZ5Ec

## 频道
Gaurav Sen

## 原始URL
https://www.youtube.com/watch?v=Sim2mJDZ5Ec

---

## 内容概要

本视频由Gaurav Sen讲解，系统介绍了Alpha-Beta剪枝算法，这是人工智能领域用于游戏博弈树搜索的核心优化技术。视频以Minimax算法为前提，详细解释了Alpha-Beta两个参数如何通过数学证明来"剪掉"那些无需评估的树枝节点，从而在不改变最终结果的前提下大幅减少计算量。通过具体的博弈树实例，视频展示了Alpha和Beta如何在深度优先搜索过程中动态更新边界，最终实现约25%的分支因子节省，使得搜索深度得以增加，AI程序因而变得更加强大。该算法曾被Deep Blue等知名程序采用，在国际象棋领域战胜过人类大师。

---

## 核心观点

1. **剪枝的本质是数学证明**：如果一个节点在数学上可以被证明永远不会被需要，就完全不必评估它——这是Alpha-Beta剪枝的核心哲学。

2. **Alpha与Beta的对抗性边界**：Alpha是第一个玩家（最大化者）能接受的最低分数底线；Beta是第二个玩家（最小化者）愿意给出的最高分数上限。当两者交叉（即Alpha > Beta）时，该分支可以立即剪枝。

3. **巨大的计算节省**：若分支因子减半，深度为5时，计算量可从32,000降至约1,000，节省约97%；实际比赛中使用良好启发式可节省约25%的分支因子。

4. **深度优先搜索配合递归**：Alpha和Beta参数沿着DFS路径逐层传递和更新，每个节点根据其角色（最大化或最小化）只更新对应的参数。

5. **实践价值极高**：实现Alpha-Beta剪枝的投入产出比极佳，是Minimax算法之后最重要的优化手段，甚至可能让AI程序多搜索一层深度，从而击败更多对手。

---

## 关键术语

| 术语 | 英文 | 解释 |
|------|------|------|
| Alpha-Beta剪枝 | Alpha-Beta Pruning | 通过两个边界参数剪除无用树枝的优化算法 |
| 最小最大化 | Minimax | 两名玩家交替最大化/最小化评分的博弈算法 |
| 分支因子 | Branching Factor | 每个节点平均可扩展的子节点数量 |
| Alpha值 | Alpha | 最大化玩家当前能接受的最低分数 |
| Beta值 | Beta | 最小化玩家当前愿意给出的最高分数 |
| 深度优先搜索 | DFS (Depth-First Search) | 按深度优先遍历博弈树的策略 |
| 启发式评估 | Heuristic Evaluation | 对非终止节点进行快速估值 |
| 剪枝 | Pruning | 跳过不需要评估的节点 |
| 边界交叉 | Alpha > Beta | 触发剪枝的条件 |

---

## 关键语录

> "If a node can mathematically be proven to never need to be evaluated, then don't evaluate it."

> "Alpha means: what is the minimum amount that I can take. Beta means: what is the maximum that I have to give."

> "The first player will always take more if they have a choice, and the second player will always give less if they have a choice."

> "When you have a branching factor of 8 and a depth of 5, if you reduce the branching factor by 50 percent, the computation reduces from 32,000 to about 1,000 — that's about 97 percent savings."

> "If you have 25% savings, and you can go an extra depth, your program gets much much stronger."

---

## 应用场景/案例

1. **国际象棋AI**：Deep Blue使用Alpha-Beta剪枝配合强大的评估函数，战胜了国际象棋世界冠军卡斯帕罗夫。

2. **编程竞赛**：AI游戏类竞赛（HackerRank、HackerEarth、Codingame等平台）中，所有使用Minimax的参赛程序几乎都集成了Alpha-Beta剪枝。

3. **围棋AI**（部分实现）：在MCTS之前，Alpha-Beta及其变体是围棋AI的主流方法。

4. **其他二人零和博弈**：如象棋、西洋跳棋、奥赛罗（Othello）等需要向前搜索的博弈场景。

---

## 技术细节补充

### Alpha-Beta初始值
- Alpha初始值 = **负无穷大**（第一个玩家尚未确定最低可接受分数）
- Beta初始值 = **正无穷大**（第二个玩家尚未确定最高愿给分数）

### 剪枝触发条件
当在某个节点发现 **Alpha（最小可接受）> Beta（最大愿给出）** 时，意味着：
- 最大化玩家要求的最低分数，已经超过了最小化玩家愿意提供的最高分数
- 双方都在最优 play，该节点永远不可能在实际博弈中到达
- **立即剪枝，不再继续向下搜索**

### 节省计算量的量化示例
```
分支因子 = 8，深度 = 5
无剪枝：8^5 = 32,768
节省25%后：6^5 ≈ 7,776
节省50%后：4^5 = 1,024
```
若能节省25%分支因子并多搜索一层深度（从深度5到深度6），实际节省约85%的计算量。

### 与Monte Carlo Tree Search的对比
- Alpha-Beta：需要明确的估值函数，结果确定性高，依赖启发式质量
- MCTS：无需人工估值，通过随机模拟评估，但结果具有概率性
- 视频建议：若启发式质量高，选Alpha-Beta；若估值函数难以设计，选MCTS
