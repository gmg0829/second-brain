# Introduction to NoSQL databases

**视频ID**: xQnIN9bW0og
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=xQnIN9bW0og

## 内容概要

本视频是Gaurav Sen对NoSQL数据库的系统性介绍，以Cassandra架构为具体案例，对比分析了NoSQL与RDBMS（关系型数据库）的优劣。视频强调了NoSQL并不是银弹——它有明确的适用场景和不适用场景，理解这些对于架构设计至关重要。视频深入讨论了NoSQL的核心机制，包括分片（sharding）、冗余、负载均衡、Compaction等关键概念，帮助观众理解NoSQL数据库如何实现高效扩展。

视频前半部分解释了NoSQL的基本原理。与关系型数据库将数据存储在具有行列的表中不同，NoSQL将数据存储为键值对（Key-Value pairs），这种简单直接的存储方式为水平扩展提供了便利。NoSQL的设计初衷是处理海量数据和高并发访问，通过将数据分散到多个节点（分片），系统可以线性扩展处理能力。同时，NoSQL通过数据复制实现冗余，保证在节点故障时服务不中断。负载均衡器负责将请求分发到不同的节点，确保没有单一节点成为瓶颈。

视频后半部分深入Cassandra架构的具体实现。Cassandra使用Quorum机制来保证数据一致性——通过设置读取和写入的副本数阈值，系统可以在强一致性和可用性之间做出权衡。Compaction是理解Cassandra等基于SSTable的存储引擎的关键概念：随着时间推移，SSTable文件会积累越来越多的碎片，通过Compaction过程合并清理，读取性能才能保持最优。Gaurav还讨论了不同的Compaction策略（Size-tiered、Leveled等）及其对写入和读取性能的影响。

## 核心观点/知识点

- **NoSQL vs RDBMS**：NoSQL以键值对存储，适合海量数据和高并发；RDBMS以表格存储，适合需要强事务一致性的场景
- **水平扩展能力**：NoSQL通过分片将数据分散到多个节点，理论上可以无限扩展
- **数据冗余**：多副本复制确保节点故障时服务连续性，是高可用的基础
- **负载均衡**：将请求均匀分发到多个节点，避免单点过载
- **Cassandra Quorum机制**：通过设置读写副本数阈值，在一致性和可用性之间取得平衡
- **Quorum计算**：读quorum + 写quorum > 副本数N，确保读写必然有交集
- **SSTable结构**：Cassandra使用SSTable作为存储格式，是一种不可变的排序字符串表
- **Compaction必要性**：随着数据更新，SSTable会积累删除标记和过期数据，需要定期合并清理
- **Compaction策略选择**：Size-tiered适合写多读少的场景，Leveled适合读多写少的场景
- **NoSQL适用场景**：海量数据、高并发访问、需要水平扩展、可以接受最终一致性的应用
- **NoSQL不适用场景**：需要强事务一致性、复杂查询、关系数据建模——这些仍是RDBMS的优势

## 关键语录

> "NoSQL和RDBMS各有其用武之地，理解何时使用哪种技术是架构师的基本功——NoSQL不是万能银弹。"

> "Quorum机制的核心洞察是：读quorum + 写quorum大于副本数，确保读写必然有交集，这是分布式一致性的关键。"

> "Compaction是SSTable存储引擎的核心维护操作，没有它，读取性能会随着碎片积累而持续下降。"
