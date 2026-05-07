# Hard interview problems #AlgoWorkout with @AlgosWithKartik

**视频ID**: IhglxQhpLMw
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=IhglxQhpLMw

## 内容概要

这是Gaurav与Kartik Arora合作的一道Google面试题，问题是这样的：机器人在一维数轴上从原点出发，有n条指令，每条指令格式为"方向+步长"（如L 50表示向左走50步，R 25表示向右走25步）。现在你可以删除一个连续的子数组（指令序列），目标是让机器人到达离原点尽可能远的位置。问题是：如何删除一个子数组使得机器人走得更远？

首先将问题转化：把L转为-1，R转为+1，得到一个整数数组。那么删除某个子数组后的总位移 = 原数组总和 - 被删除子数组的和。要让机器人向右走尽可能远，就删除一个**和最小的子数组**（负得越多剩下的越大）；要向左走尽可能远，就删除一个**和最大的子数组**（正得越多剩下的越小）。这正是Kadane算法的变体——最小/最大子数组和可以在O(n)内求出。

但题目增加了一个约束条件：**被删除的子数组必须包含相同数量的L和R指令**。即在方向数组中，该子数组的元素和必须为0（+1和-1数量相等）。

Kartik提出的方案是同时维护两个前缀和数组：
1. **值前缀和**（Prefix Sum）：所有元素的累积和
2. **方向前缀和**（Direction Prefix）：将L视为-1、R视为+1后的累积和

一个子数组[j, i]是"合法的"（L和R数量相同）当且仅当direction_prefix[i] = direction_prefix[j-1]。因此，我们可以在方向前缀和相同的所有位置中，选择那个能让值前缀和差最大（或最小）的j来删除。

具体实现：用HashMap记录每个方向前缀和值第一次出现的位置，然后在遍历时检查：对于每个位置i，若direction_prefix[i]已在map中，则以该j为起点的子数组是合法的，其"删除后的位移" = total_sum - (prefix[i] - prefix[j-1])。取所有合法删除中的最大值即为向右最远距离，同理取最小值得到向左最远距离。最终答案是两个距离中绝对值较大的那个。

## 核心观点/知识点

- **问题转化**：将L/R指令转化为-1/+1，删除子数组问题变为删除最小/最大和的子数组
- **Kadane算法**：最小/最大子数组和是Kadane算法的直接应用
- **双向性**：要同时考虑向左和向右两种情况
- **合法性约束**：删除的子数组必须L和R数量相同，即方向前缀和相等
- **两个前缀和**：值前缀和用于计算删除后的位移，方向前缀和用于验证合法性
- **HashMap优化**：用HashMap记录每个方向前缀和值的最早出现位置，将O(n²)的暴力枚举降至O(n)
- **选择最优j**：对于每个i，在所有合法的j中选择让删除后位移最大（或最小）的j

## 关键语录

> "If we want to find a valid subarray with equal L and R, what we need is the direction prefix sum to be zero in that subarray."

> "In a direction array, L is -1 and R is +1, so the sum being zero means L count equals R count."

> "For every position I, we want to find a valid J such that deleting the subarray from J to I gives us the maximum possible displacement. We can use HashMap to track earliest occurrence of each direction prefix sum value."
