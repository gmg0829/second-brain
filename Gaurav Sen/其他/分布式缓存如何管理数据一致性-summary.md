# What are Distributed CACHES and how do they manage DATA CONSISTENCY?

**视频ID**: U3RkDLtS7uY
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=U3RkDLtS7uY

## 内容概要

分布式缓存是系统设计中的核心组件，主要用于提升系统响应速度并减轻数据库压力。本视频首先解释了缓存的基本概念：当用户重复查询相同数据（如个人资料）或需要执行昂贵计算（如计算所有用户的平均年龄）时，将结果存储在缓存中可以避免重复的数据库访问。缓存的本质是通过内存存储（通常使用SSD）来替代磁盘访问，以换取更低的延迟。

然而，缓存并非越大越好。缓存硬件成本远高于普通数据库使用的 commodity 硬件；更重要的是，当缓存数据量过大时，搜索时间会显著增加，反而抵消了缓存带来的性能优势。因此，缓存策略的核心问题变为：如何在有限的缓存空间内，只存储最可能被未来请求访问的数据。这引出了缓存的三大核心策略问题：何时加载数据、何时淘汰数据、以及如何保证数据一致性。

缓存淘汰策略（Eviction Policy）直接决定了缓存的命中率和系统性能。LRU（Least Recently Used）是最广泛使用的策略，将最新访问的数据置于缓存顶部，淘汰底部最久未使用的数据。例如，名人发布了一条热门评论，该评论会被保留在缓存顶部供所有人快速访问；当热度下降后，逐渐被推送到缓存底部直至淘汰。Sliding Window策略是近年来表现更优的方案，Google的Caffeine库实现了这一算法。相比之下，不当的淘汰策略会导致"缓存穿透"（cache thrashing）—— 缓存不断写入又淘汰数据，却从未被真正利用，这比没有缓存还要糟糕。

缓存的一致性问题在分布式环境下尤为严峻。当服务器A更新了数据库中的用户密码，但缓存中的旧数据尚未更新时，其他服务器从缓存获取的仍是过期数据，可能导致用户使用旧密码登录，甚至引发安全隐患。此外，缓存的部署位置也是关键设计决策。本地缓存（嵌入服务器内存）响应最快、实现最简单，但存在单点故障风险（服务器崩溃则缓存丢失）且多服务器间难以保证一致性。全局缓存（如Redis集群）所有服务器共享访问，虽然略微增加网络延迟，但具有更好的容错性和可独立扩展的优势，是大多数场景的首选方案。

## 核心观点/知识点

- **缓存的两大使用场景**：避免重复网络调用（如用户资料重复查询）和避免重复昂贵计算（如统计聚合结果）
- **缓存不能存储所有数据的原因**：硬件成本高（SSD vs 普通磁盘）、数据量过大导致搜索时间增加反而得不偿失
- **LRU策略**：最近最少使用，数据按访问时间排序，新数据置于顶部，淘汰底部最旧数据；适合热点数据集中且访问模式稳定的场景
- **Sliding Window策略**：比LRU性能更优，已被Google Caffeine库实现
- **Thrashing（缓存穿透）**：不当淘汰策略导致缓存不断被写入和驱逐，实际命中率极低，危害大于收益
- **数据一致性挑战**：多服务器环境下，一个节点更新数据库后其他节点缓存仍为旧数据；用户资料问题不大，但密码、财务等关键数据不能容忍
- **本地缓存优缺点**：延迟最低、实现简单，但服务器故障时缓存丢失，多服务器间难以同步
- **全局缓存（如Redis）优缺点**：所有服务器共享，支持独立扩展，容错性更强，但有轻微网络延迟开销
- **Write-Through策略**：先写缓存再写数据库，保证强一致性，但多服务器环境下其他节点缓存仍可能过期
- **Write-Back策略**：先写数据库，再使缓存失效或更新，适合非关键数据，可减少数据库写压力
- **混合策略**：根据数据重要性选择策略——关键数据（密码、财务）用Write-Back确保一致性，非关键数据可用Write-Through换取性能

## 关键语录

> "Why don't you just go and hit the database? Yeah, so you'll be saving on a network call, yes, but a ton of data on the cache is not just expensive, but also counterproductive."

> "The final and most important problem, I'm sure you guys have already realized, is that what about consistency?"

> "So caching is extensively used in system design. So that's it for what caching is and what are its use cases."
