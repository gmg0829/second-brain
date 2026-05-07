# Find the distance between friends/connections - LinkedIn System Design

**视频ID**: OXLDI8gibPw
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=OXLDI8gibPw

## 内容概要

本视频是Gaurav Sen与Keerti Purswani合作完成的LinkedIn系统设计实战分析，聚焦于LinkedIn如何计算用户之间的连接度数（一度、二度、三度连接）。视频从一个容量估算开始：LinkedIn拥有约10亿用户，每个用户平均有约1000个一度连接，这1000个连接中的每个人又各自连接着1000人，因此二度连接就达到100万，而三度连接则理论上可达10亿——几乎覆盖整个用户基础。

面对如此庞大的数据量，简单粗暴的SQL嵌套查询虽然思路直接，但复杂度为O(n²)，对于100万级别的二度连接查询来说需要数百毫秒，而且每秒可能有数千次查询同时发生，这会导致需要数百台服务器来处理，代价极其高昂。BFS（图广度优先搜索）是解决最短路径问题的经典算法，但在一度O(n)、二度O(n²)、三度O(n³)的复杂度面前，即使是BFS也需要优化。

视频重点介绍了双向BFS（Bidirectional BFS）算法：不是从起点一直搜索到目标，而是同时从起点和终点各自向前搜索，当两边的搜索路径相遇时，就找到了最短路径。这种方法将复杂度从O(n⁴)降低到O(n²)。以Keerti想查询与Gaurav的连接度数为例，双向BFS从两人各自的一度连接开始搜索，如果在中间层找到共同节点，就能计算出准确的连接度数。

然而即使优化了算法复杂度，每次查询都从数据库读取连接数据仍然非常昂贵。因此需要引入缓存：将用户的二度连接预先计算并存储在缓存中，这样可以省去O(n²)中读取数据的开销。考虑到数据量巨大（10亿用户×百万级连接），单个缓存无法存储所有数据，必须进行分片（Sharding），按照用户ID将数据分散到多个缓存节点。

缓存面临的挑战包括：节点故障会导致该节点服务的所有分片数据丢失；为了解决这个问题，视频介绍了基于集合覆盖（Set Cover Problem）的副本策略——优先选择包含最多二度连接用户的缓存节点进行查询，尽量减少需要访问的节点数量。副本复制因子取决于业务需求：如果只需要容错恢复，副本因子为1（主从架构）即可；如果还需要降低读取延迟，则需要地理分布式部署多个副本。

关于何时计算连接数据：一度连接实时更新；当用户接受新的连接请求时，需要立即更新双方的二度连接；对于删除连接这类操作，由于复杂度较高（需要级联更新多个用户的连接关系），通常采用最终一致性（Eventual Consistency）机制，通过后台任务异步处理。

## 核心观点

- LinkedIn的连接度数问题本质上是社交网络图中最短路径搜索问题
- 双向BFS将复杂度从O(n⁴)降低到O(n²)，是处理此类问题的标准算法优化
- 缓存二度连接数据可以避免每次查询都访问数据库，大幅降低延迟
- 由于数据量巨大，必须对缓存进行分片（按用户ID分片）
- 副本策略用于解决节点故障和降低读取延迟问题
- 副本数量的选择：容错需求用1-2个副本，低延迟需求则需要地理分布式部署

## 关键术语

- **一度连接（First-degree Connection）**：直接好友/联系人
- **二度连接（Second-degree Connection）**：好友的好友
- **三度连接（Third-degree Connection）**：好友的好友的好友
- **BFS（广度优先搜索）**：图遍历算法，用于寻找最短路径
- **双向BFS（Bidirectional BFS）**：从起点和终点同时搜索，在中间相遇，复杂度更低
- **分片（Sharding）**：将数据分散存储到多个节点
- **集合覆盖问题（Set Cover Problem）**：优化问题，最小化访问节点数量同时覆盖所有需要的分片
- **LRU缓存（Least Recently Used）**：最近最少使用缓存置换策略
- **副本因子（Replication Factor）**：数据被复制的份数
- **Neo4j**：主流图数据库，适合社交网络关系存储

## 关键语录

> "Third degree basically becomes our entire user base — yes, everyone."

> "The bidirectional BFS brings down the order complexity from order n⁴ to order n²."

> "Repliation solves that problem — it is helping us with latency."

> "Additions are easy comparatively, removals are a little more complex. Maybe we want to do this like with an eventual consistent thing which is a background job that's constantly running."
