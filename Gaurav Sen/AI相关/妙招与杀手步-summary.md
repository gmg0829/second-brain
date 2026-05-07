---
title: "Killer Moves - Artificial Intelligence"
video_id: "i35ErvsbdgQ"
channel: "Gaurav Sen"
url: "https://www.youtube.com/watch?v=i35ErvsbdgQ"
description: "The alpha-beta algorithm can be enhanced using Killer moves. The idea and implementation is discussed here."
language: zh
---

# 杀手走法（Killer Moves）

## 视频标题
Killer Moves - Artificial Intelligence

## 视频ID
i35ErvsbdgQ

## 频道
Gaurav Sen

## 原始URL
https://www.youtube.com/watch?v=i35ErvsbdgQ

---

## 内容概要

本视频由Gaurav Sen讲解，介绍了Alpha-Beta剪枝算法的重要优化技术——杀手走法启发式（Killer Moves Heuristic）。视频的核心思想是：在某些特定局面中，某步走法即使在没有良好估值的情况下，也极有可能导致对手无法有效应对（即产生Cutoff/剪枝）。通过记录这些"杀手走法"，在类似局面中优先搜索它们，可以大幅提高Alpha-Beta剪枝的效率。视频通过X和O的示例（类似井字棋）展示了杀手走法如何在同一移动编号的不同棋局状态下发挥作用，并给出了详细的实现思路，包括杀手走法列表的数据结构设计、移动权重管理以及与Alpha-Beta评估函数的集成方式。实践表明，加入杀手走法后程序的性能提升非常显著——这也是真实象棋引擎（如象棋机器）中广泛使用的技术。

---

## 核心观点

1. **杀手走法的定义**：在某一移动编号（Move Number）下，能够在多种不同棋局状态下都产生Cutoff的走法——即无论对手如何应对，这步棋都非常危险/强大。

2. **利用上下文信息而非估值排序**：Alpha-Beta通常按估值排序走法（强者优先），但杀手走法利用"跨局部的上下文信息"来优先搜索——即之前遇到过的、能产生Cutoff的走法，在新的类似局面中也值得优先检验。

3. **杀手走法列表的数据结构**：为每个移动深度维护一个列表（通常大小为2），记录在该深度曾经产生Cutoff的走法。列表按权重排序，高权重优先。

4. **权重管理**：走法被尝试后，若产生了Cutoff则增加权重，若未能产生Cutoff则减少权重，权重为负时从列表中移除。

5. **性能收益显著但不影响算法复杂度**：杀手走法不影响Alpha-Beta的理论复杂度上界，但能大幅提升实践中产生Cutoff的概率，从而实际搜索节点数大幅减少。

---

## 关键术语

| 术语 | 英文 | 解释 |
|------|------|------|
| 杀手走法 | Killer Move | 在某移动深度上能跨场景产生Cutoff的强走法 |
| 杀手走法启发式 | Killer Moves Heuristic | 利用历史Cutoff信息优化搜索顺序的技术 |
| Cutoff/剪枝 | Cutoff | Alpha-Beta中因边界条件提前终止搜索 |
| 移动编号 | Move Number/Depth | 搜索深度层级的编号 |
| 历史启发式 | History Heuristic | 杀手走法的进阶版本，按全局成功次数排序 |
| 权重 | Weight | 杀手走法列表中每个走法的优先级权重 |

---

## 关键语录

> "In many games, one particular move for a given scenario is so strong that irrespective of what your reply is, that move is the best."

> "The concept is: irrespective of the scenario, for this particular move, we should evaluate something which is very dangerous to us first."

> "What you are essentially doing is keeping a sorted list over here — so you can keep a heap, but then there's so few moves actually that usually I prefer to just keep it in a sorted list itself."

> "The performance benefits it gives practically are pretty high."

---

## 应用场景/案例

1. **象棋引擎**：所有顶级象棋引擎（如Stockfish）都使用杀手走法或其进阶版本（历史启发式）来提升搜索效率。

2. **视频演示的X和O游戏**：O在位置(3,1)走了一步棋，X在之前类似局面中发现(3,1)是杀手走法，因此在当前局面中优先尝试该走法，导致O的很多走法被Cutoff。

3. **编程竞赛AI**：在HackerRank/Codingame等平台的AI游戏竞赛中，杀手走法是提升排名的有效手段。

4. ** Othello / Reversi**：同样适用，尤其是终局阶段某些走法具有决定性影响。

---

## 技术细节补充

### 杀手走法列表结构
```
KillerMoves[depth] = [
  {move: (3,1), weight: 2},
  {move: (2,5), weight: 1}
]
```
通常每个深度只保留2个杀手走法就足够。

### 与Alpha-Beta的集成流程
1. **GetMoves阶段**：获取所有可能走法 → 按估值排序 → **将杀手走法追加到列表顶部** → 返回有序走法列表
2. **Evaluate阶段**：对每个走法进行递归评估 → 若产生Cutoff（Alpha >= Beta）→ **更新杀手走法列表**（增加权重或新增条目）

### 杀手走法与历史启发式的区别
- **杀手走法**：按深度（Move Number）分别记录，每个深度独立
- **历史启发式**：不分深度，记录每个走法在所有局部的全局Cutoff成功次数，排序更简单但需要更多存储

### 实现伪代码要点
```
if (alpha >= beta):  # 产生Cutoff
    if move in KillerMoves[depth]:
        increase_weight(move)
    else:
        add_to_killer_list(move)
else:  # 无Cutoff
    if move is killer and expected cutoff but didn't happen:
        decrease_weight(move)
```
