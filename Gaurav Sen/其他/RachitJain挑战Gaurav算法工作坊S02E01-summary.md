# AlgoWorkout: @RachitJain challenges Gaurav 😱 S02 E01

**视频ID**: b2UNMZkXAh0
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=b2UNMZkXAh0

## 内容概要

这是AlgoWorkout系列第二季第一期，Rachit Jain向Gaurav发起挑战。问题是这样的：John在大学食堂，食堂有N个朋友，第i个朋友在时刻ti到达食堂并停留di时间。John最多只能在食堂待m分钟（不超过10秒太夸张了，实际是m分钟），他希望在此期间见到尽可能多的朋友。问题是：John应该选择什么时间进入食堂，才能见到最多朋友？

朴素解法是枚举每个可能的进入时刻，然后计算该时刻能遇到的朋友数量，时间复杂度O(n²)。但这在N很大时无法通过。

优化思路一：只考虑关键时刻。John的进入/退出时刻只可能是某个朋友的开始时间ti或结束时间(ti+di)。将所有这样的时刻排序后，只在这些关键时刻进行检查，可以将计算量从n²减少到n log n（每次用二分查找计算有多少朋友在该时刻之后到达）。

优化思路二（更优雅）：**Sweep Line + 时间平移**。将每个朋友的"有效时间窗口"重新定义为[ti, ti+di+m]——即如果John在时刻ti进入，他能见到该朋友的前提条件是：进入时刻≤朋友的到达时刻（ti）且离开时刻≥朋友的到达时刻（ti）。这等价于朋友的时间窗口与John的停留时间[entry, entry+m]有交集。

更巧妙的方法是：将所有结束时间加上m，得到新的"有效结束时间"ti+di+m。然后用标准的Sweep Line算法——将每个朋友表示为一个进入事件（+1）和一个退出事件（-1），按时间排序后遍历，动态维护当前在食堂的人数。在每个进入事件发生时，检查当前计数是否更新最大值的逻辑是：当前人数 = 已经进入的人数 - 已经离开的人数，其中"离开"是用新的有效结束时间判断的。这个算法的时间复杂度是O(n log n)，因为只需要排序操作。

## 核心观点/知识点

- **关键时刻枚举**：只需考虑朋友到达和离开的时刻，而非所有实数点
- **Sweep Line算法**：将时间轴上的事件（进入/退出）排序后线性扫描，O(n)计算最大并发
- **时间平移技巧**：将结束时间平移m单位后，可以用简单的加减法判断某人是否在John停留期间仍在食堂
- **问题重定义**：将"在m分钟内见到"的问题重定义为"时间窗口是否有交集"
- **两种方法对比**：朴素O(n²) → 关键时刻+二分O(n log n) → Sweep Line O(n log n)
- **代码实现**：用数组存储所有事件（时间、类型），排序后遍历，维护当前人数计数器

## 关键语录

> "What we are effectively doing is keeping that spirit alive for the next m seconds. So instead of imagining the intervals as [S, E] what we should do is we should pass home that indicators of [S, E+m]."

> "The only hard thing is the proof like proving that this works and the logic is sound because what we are doing is we are actively along meeting everybody's timeline."
