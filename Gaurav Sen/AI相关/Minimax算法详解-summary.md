---
title: "What is the Minimax Algorithm? - Artificial Intelligence"
video_id: "KU9Ch59-4vw"
channel: "Gaurav Sen"
url: "https://www.youtube.com/watch?v=KU9Ch59-4vw"
description: "The minimax algorithm is one of the oldest artificial intelligence algorithms ever. It uses a simple zero sum rule to find which player will win from a current position."
language: zh
---

# 什么是Minimax算法？

## 视频标题
What is the Minimax Algorithm? - Artificial Intelligence

## 视频ID
KU9Ch59-4vw

## 频道
Gaurav Sen

## 原始URL
https://www.youtube.com/watch?v=KU9Ch59-4vw

---

## 内容概要

本视频由Gaurav Sen讲解，系统介绍了Minimax算法——人工智能领域最古老且最基础的博弈搜索算法之一。视频以红蓝双方交替走棋的博弈树为示例，阐述了零和博弈（Zero-Sum Game）的核心原理：正整数对红方有利，负整数对蓝方有利。Minimax通过递归的最大化与最小化操作，从叶子节点逐层回溯评估，最终确定当前局面的分数及最优走法。视频还解释了为何真实博弈中需要启发式评估函数（Heuristics）来代替不可计算到底的终端节点——尤其在象棋等复杂游戏中，不可能搜索到终局，因此需要启发式函数来判断局势优劣。该算法是Alpha-Beta剪枝和迭代深化（Iterative Deepening）等更高级算法的基础。

---

## 核心观点

1. **零和博弈的数学建模**：将博弈结果映射到整数轴上——正无穷为红方必胜，负无穷为蓝方必胜，中间值为和局或中间局势。Minimax将两名玩家的意图对抗建模为数学最优化问题。

2. **递归极小化极大**：红方（最大化玩家）选择子节点中的最大值；蓝方（最小化玩家）选择子节点中的最小值。递归执行至叶子节点，再逐层回溯。

3. **深度优先搜索**：从根节点出发，深度优先遍历所有子树，直到所有叶子节点都有评估值，再逐层回溯计算父节点的值。

4. **启发式评估的必要性**：在真实复杂游戏中（如象棋），不可能搜索到终局，因此需要设计启发式函数——返回正数表示先手占优，返回负数表示后手占优。

5. **算法基础地位**：Minimax是Alpha-Beta剪枝、迭代深化等高级搜索算法的基石，其思想贯穿整个游戏AI领域。

---

## 关键术语

| 术语 | 英文 | 解释 |
|------|------|------|
| Minimax算法 | Minimax Algorithm | 零和博弈中通过最大化/最小化选择最优走法的递归算法 |
| 零和博弈 | Zero-Sum Game | 一方所得即为另一方所失的博弈类型 |
| 博弈树 | Game Tree | 表示博弈过程所有可能状态的树形结构 |
| 最大化节点 | Maximizing Node | 试图获得最高分数的玩家节点（红方） |
| 最小化节点 | Minimizing Node | 试图获得最低分数的玩家节点（蓝方） |
| 启发式评估 | Heuristic Evaluation | 对非终端节点进行快速估值，估算局势优劣 |
| 深度优先搜索 | DFS (Depth-First Search) | 沿单一路径深入到底再回溯的搜索策略 |
| 终端节点 | Terminal Node | 游戏结束（胜/负/和）的叶子节点 |
| Alpha-Beta剪枝 | Alpha-Beta Pruning | Minimax的优化算法，通过剪枝减少搜索量 |

---

## 关键语录

> "Positive infinity would be a win for white, negative infinity would be a loss for white."

> "The players are fighting against each other. They have just three possibilities: it's either red, blue, or a draw — and they are of course going for the maximum that they can."

> "Mathematically red is trying to maximize their score — you can think of red as positive infinity. And blue is trying to minimize the score which is negative infinity."

> "In most cases you are not going to see a clear positive infinity or negative infinity — you know, terminal node which says that I won or I lost. So you need heuristics."

> "It is just a function which tells you whether the first player is winning or the second player is winning. If the second player is winning it returns a negative number; if the first player is winning it returns a positive number."

---

## 应用场景/案例

1. **国际象棋AI**：Deep Blue使用优化版Minimax配合强大的估值函数，战胜了世界冠军卡斯帕罗夫。

2. **西洋象棋 Othello / Reversi**：Minimax配合Alpha-Beta剪枝，是早期游戏AI的典型应用。

3. **井字棋（Tic-Tac-Toe）**：搜索空间足够小，可以直接搜索到终局，无需启发式。

4. **围棋AI**（早期）：在MCTS出现之前，基于Minimax和其变体的方法是主流。

5. **视频演示的具体博弈树**：红蓝双方交替走棋，叶子节点有-3、7、2、-1、-7、8等分值，递归后整棵树的评估值为2（红方获胜）。

---

## 技术细节补充

### Minimax工作流程
1. 从根节点开始，深度优先递归至叶子节点
2. 叶子节点返回具体评估值（胜负或启发式分数）
3. 递归回溯：若为最大化层（红方），取子节点最大值；若为最小化层（蓝方），取子节点最小值
4. 依次逐层向上，最终根节点的值即为当前局面的最优评估

### 整数轴表示
```
负无穷 ←——————————————————→ 0 ←——————————————————→ 正无穷
  蓝方必胜                              平局                            红方必胜
```

### 启发式函数设计原则
- 返回正数：先手（白方/红方）占优
- 返回负数：后手（黑方/蓝方）占优
- 绝对值越大，优势越明显
- 示例（象棋）：计算双方子力价值差、棋子位置加成、王的安全程度等

### 复杂度
对于分支因子为b、深度为d的博弈树，Minimax需要访问的节点数为 **O(b^d)**，这正是Alpha-Beta剪枝要解决的问题。
