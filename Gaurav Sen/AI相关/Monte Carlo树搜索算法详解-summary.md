---
title: "What is Monte Carlo Tree Search? - Artificial Intelligence"
video_id: "hmQogtp6-fs"
channel: "Gaurav Sen"
url: "https://www.youtube.com/watch?v=hmQogtp6-fs"
description: "Monte Carlo Tree Search is a search technique in Artificial Intelligence. This has recently been used by Artificial Intelligence Programs like AlphaGo, to play against the world's top Go players. Monte Carlo methods have been used for decades to predict outcomes probabilistically."
language: zh
---

# 什么是蒙特卡洛树搜索（Monte Carlo Tree Search）？

## 视频标题
What is Monte Carlo Tree Search? - Artificial Intelligence

## 视频ID
hmQogtp6-fs

## 频道
Gaurav Sen

## 原始URL
https://www.youtube.com/watch?v=hmQogtp6-fs

---

## 内容概要

本视频由Gaurav Sen讲解，系统性地介绍了蒙特卡洛树搜索（MCTS）这一人工智能领域的搜索技术。MCTS是一种启发式搜索算法，近年来因AlphaGo战胜世界顶级围棋选手而闻名。与传统的Minimax树配合Alpha-Beta剪枝的确定性方法不同，MCTS采用概率方法寻找最优走法，具有实现简单、灵活性高的特点。视频通过信任网络（Trust Networks）的类比和具体的博弈树示例，深入浅出地阐述了MCTS的核心概念、工作流程以及与Alpha-Beta剪枝的对比。

---

## 核心观点

1. **概率驱动而非规则驱动**：与Minimax和Alpha-Beta剪枝使用确定性的启发式评估不同，MCTS通过概率统计方法评估棋局状态，不依赖于人工设定的估值函数。

2. **探索与利用的平衡（Exploration vs Exploitation）**：MCTS的核心在于平衡两个相互矛盾的目标——利用（Exploitation）指将计算资源集中在已知的高价值节点上；探索（Exploration）指偶尔尝试尚未充分评估的节点，以避免错过潜在的最优解。

3. **四步迭代流程**：选择（Selection）→ 扩展（Expansion）→ 模拟（Simulation）→ 回传（Back Propagation），形成闭环迭代。

4. **先验知识与经验数据的融合**：通过UCB1等公式将专家的先验知识与实际模拟结果动态融合，随模拟次数增加，先验知识的权重逐渐降低。

5. **适用场景**：适合那些评估函数难以定义、搜索空间巨大的博弈场景，如围棋、象棋、电竞游戏等。

---

## 关键术语

| 术语 | 英文 | 解释 |
|------|------|------|
| 蒙特卡洛树搜索 | Monte Carlo Tree Search (MCTS) | 一种启发式搜索算法，通过随机模拟评估棋局 |
| 信任网络 | Trust Networks | 用信任值比喻节点优劣的树形结构 |
| 利用 | Exploitation | 将资源集中在已知高价值节点上的策略 |
| 探索 | Exploration | 尝试未知或低评估节点的策略 |
| 选择 | Selection | MCTS第一步，从根节点向下选择最优子节点 |
| 扩展 | Expansion | 添加新节点到搜索树中 |
| 模拟 | Simulation/Playout | 从叶节点随机推演到游戏结束 |
| 回传 | Back Propagation | 将模拟结果沿着路径回传更新节点统计 |
| UCB1公式 | Upper Confidence Bound 1 | 平衡探索与利用的数学公式 |
| 先验知识 | Prior Knowledge/Domain Knowledge | 专家对棋局的经验判断 |
| Alpha-Beta剪枝 | Alpha-Beta Pruning | 传统 Minimax 算法的优化技术 |
| 伪随机 | Pseudo-random | 用简单启发式引导的随机选择 |

---

## 关键语录

> "Monte Carlo seems a lot more fuzzy in the sense that it does things based on probabilities — it's difficult to tell what the outcome will be."

> "You might miss out some good nodes if you completely ignore them, just because they haven't been explored enough yet."

> "Exploration is not writing off a node as useless — because they might have good opportunities down there."

> "If you are investing too much time in one place, you should explore a little more, but you should spend more time where it matters — and that's why you have the denominator in the formula."

> "The more experiments you do about it, the less you care about what an expert says — because you are becoming more of an expert yourself."

---

## 应用场景/案例

1. **AlphaGo**：DeepMind开发的围棋AI，使用MCTS配合深度神经网络，击败了世界顶级围棋选手李世石和柯洁。

2. **编程竞赛**：HackerEarth和Codingame等平台举办的人工智能游戏竞赛中，MCTS被广泛用作AI bot的开发基础。

3. **即时战略游戏AI**：如《星际争霸》等复杂游戏中的AI对手设计。

4. **棋类游戏通用框架**：作为Minimax+Alpha-Beta的有效替代方案，尤其在难以设计评估函数的场景中表现优异。

5. **视频中演示的具体博弈树**：红色方与蓝色方交替走棋，通过统计胜率（5/7、3/4等）而非固定估值来选择最优走法。

---

## 技术细节补充

### 选择公式（UCB1变体）
```
选择分数 = 节点胜率 + C × sqrt(log(父节点访问次数)/当前节点访问次数) + 先验概率因子
```
其中：
- 节点胜率反映利用价值
- 第二项（探索项）随着访问次数增加而衰减
- 先验概率因子融入专家知识，随模拟次数增加逐渐降低权重

### 与Alpha-Beta的对比
- Alpha-Beta：需要为每个棋局位置设定具体的启发式估值，搜索深度受限于计算资源
- MCTS：通过大量随机模拟来估计胜率，无需人工估值，但结果具有概率性（同一初始状态多次运行可能得到不同结果）
