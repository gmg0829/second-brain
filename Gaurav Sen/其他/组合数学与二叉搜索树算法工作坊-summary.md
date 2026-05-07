# AlgoWorkout: Combinatorics and Binary Search Trees 💪

**视频ID**: fXZ5YGalS2w
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=fXZ5YGalS2w

## 内容概要

这道算法题探讨的是：当给定一个数组用于构建二叉搜索树（BST）时，有多少种不同的排列顺序能够产生完全相同的BST结构？换言之，给定数组[2, 0, -1, 4, 3, 7, 1, 8]按顺序插入BST后，问题是找出所有满足以下条件的排列——将这些排列逐一插入BST后，得到的树结构（包括每个节点的位置）完全相同。

Gaurav在视频中展示了一个关键洞察：**每个子树的根节点是固定不变的**。例如，如果4是某个子树的根，那么无论其左右子树内部如何排列，4始终是这个子树的根。这意味着我们不能随意交换同一路径上的节点——例如8和7都在根到最右边的路径上，它们不能交换位置，因为改变顺序会改变树的结构。

然而，**同一节点的左右子树内部顺序是固定的，但两个子树的节点可以相互穿插**。以节点4为例：其左子树包含3，右子树包含7和8。3必须始终在4的左边，7和8必须始终在4的右边且它们的相对顺序固定（7在8左边）。但3、7、8三个节点可以按任意顺序排列——[4, 3, 7, 8]、[4, 7, 3, 8]、[4, 7, 8, 3]都是合法排列。

推广到一般情况：对于任意节点，若其左子树有m个节点、右子树有n个节点，则总排列方式为C(m+n, m)——从m+n个位置中选择m个给左子树（剩下的给右子树）。而左右子树内部各自还有自己的排列方式。因此递归公式为：f(node) = f(left) × f(right) × C(m+n, m)，其中空节点返回1作为基本情况。

## 核心观点/知识点

- **BST构建的唯一性**：给定数组按顺序插入BST的结果是唯一的
- **子树根节点固定**：不能通过交换改变子树根节点的位置，否则树结构会改变
- **路径节点不可交换**：位于同一条到根路径上的节点不能交换顺序
- **左右子树可穿插**：左右子树的节点可以任意顺序穿插排列，只要各自内部顺序保持
- **组合数学核心**：在m+n个位置中选m个放左子树节点，方案数为C(m+n, m)
- **递归求解**：利用左右子树的对称性，从叶子向上递归计算每棵子树的合法排列数
- **卡特兰数联系**：当所有节点都只有一棵子树时（如链状结构），答案为1而非卡特兰数

## 关键语录

> "The root node of every subtree is fixed. You cannot change the root node of a subtree, otherwise the BST structure would change."

> "The ordering amongst left and right subtrees is independent - you can interleave them in any way you like, but the ordering within each subtree must remain fixed."

> "For any node with left size m and right size n, the number of ways to interleave is C(m+n, m) - choose m positions for left subtree nodes from m+n total positions."
