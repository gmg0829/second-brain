# NoSQL 数据库入门

## 内容概要

本视频系统性地介绍了 NoSQL 数据库的核心理念、优缺点，并以 Cassandra 架构为具体案例，深入讲解了 NoSQL 在实际分布式系统中的工作原理。视频从 SQL 与 NoSQL 的本质区别出发，探讨了 NoSQL 的四大优势（数据聚合、Schema 灵活性、水平分区内置支持、为聚合而生）和四大劣势（更新不友好、一致性缺失、关系不隐式、JOIN困难），最后通过 Cassandra 的集群架构、哈希分区、Quorum 共识机制和 SSTable Compaction 等核心概念，展示了 NoSQL 数据库在工程实践中的具体实现。

## 核心知识点

**1. SQL vs NoSQL：数据存储的本质差异**

SQL 数据库将数据拆分到多个关联表中，通过外键维护关系（如 User 表的 address_id 指向 Address 表）；NoSQL 则将所有相关数据聚合成一个 JSON blob 整体存储（address 作为嵌套对象直接内嵌在 User 对象中）。这种差异导致：SQL 的 `SELECT *` 需要 JOIN 多表才能获取完整用户信息，而 NoSQL 可以直接读取整个 blob，I/O 效率更高。

**2. NoSQL 的四大优势**

- **写优化（Write-Optimized）**：用户注册时通常一次性写入所有字段（name + address + age + role），NoSQL 的 blob 存储模式匹配这种"全写入"模式，可以一次 API 调用完成整条记录写入，避免了跨表事务的开销
- **Schema 灵活性**：新增字段（如 salary）时，SQL 需要 ALTER TABLE 加锁维护一致性，代价高昂；而 NoSQL 的 JSON blob 完全忽略 Schema，新老数据可以共存，无需迁移
- **水平分区内置支持**：NoSQL 从设计之初就面向大规模扩展，数据通过哈希函数均匀分布到多个节点，支持水平扩容的同时注重可用性（Availability）
- **为聚合而生**：NoSQL 通常用于存储需要频繁进行聚合查询的数据（如平均年龄、总薪资），适合做指标分析和智能数据挖掘

**3. NoSQL 的四大劣势**

- **更新不友好**：大量更新场景下，每次更新可能涉及整个 blob 的重写，效率不如只更新特定字段的 SQL
- **一致性缺失（ACID 不保证）**：同一数据的多个副本可能出现在不同节点上，导致"脏读"——事务性操作（如金融转账）无法依赖 NoSQL
- **关系不隐式**：SQL 通过外键约束隐式维护表间关系，而 NoSQL 没有内置的引用完整性强制机制，应用层必须自行管理
- **JOIN 困难**：跨表的 JOIN 在 NoSQL 中需要手动实现，先遍历所有数据块再逐个合并，没有任何数据库内置的优化支持

**4. Cassandra 架构：哈希分区与负载均衡**

Cassandra 集群由多个节点组成，每个请求通过哈希函数（hash(key) → 数值）映射到特定节点，数值落在哪个范围就由哪个节点处理。如果哈希函数分布均匀，请求会等概率落在任意节点，实现理想的负载均衡。但如果哈希函数不均匀（如 <100 映射到 0，>100 映射到 1），则会导致热点节点，进而使整个集群过载。解决方案包括：使用更好的哈希函数，或者采用多层分片（multi-level sharding）—— 第一层哈希分发到子集群，第二层用不同的哈希函数再次打散。

**5. 数据复制与冗余**

Cassandra 默认在哈希环上顺时针方向选择 N 个后继节点作为副本（Replication Factor = N）。以 RF=3 为例，写入节点 5 时，数据会自动复制到节点 5、1、2。读取时，任意一个拥有副本的节点都可以响应，实现读取加速。同时，只要不是所有副本节点同时宕机，数据就不会丢失。

**6. Quorum 共识机制**

分布式系统中，并发写入可能导致不同节点上的数据版本不一致。Quorum 是一种"多数投票"机制：设定 Quorum 值 Q，当至少 Q 个节点对某个值达成一致时，该值才被视为"真理"。例如 RF=3、Q=2 时，需要至少 2 个节点同意才能完成读取或写入。如果节点 5 宕机，客户端去节点 1 读取 — 节点 1 返回"数据不存在"（尚未同步），节点 2 返回"数据是 John"（已同步），则取最新时间戳的版本返回。Q 值越大一致性越强但可用性越低，Q 值越小可用性越高但一致性越弱，这正是 CAP 定理的体现。

**7. SSTable 与 Compaction**

Cassandra 的写入机制：所有写请求先以日志形式顺序追加到内存（MemTable），这是极快的顺序写操作。内存写满后定期刷盘成 SSTable（Sorted String Table）—— 一个按键排序、不可变的持久化文件。由于每次更新（如修改姓名）都会生成新的 SSTable 记录，相同 key 的多个版本会散布在多个 SSTable 中，造成存储空间浪费。Compaction 过程类似归并排序（Merge Sort），将多个 SSTable 合并，用最新时间戳覆盖旧值，释放重复记录占用的空间。删除操作通过 Tombstone（墓碑标记）实现：写入一个墓碑记录，Compaction 时遇到墓碑则物理删除该记录的所有版本。

## 设计模式/方法

- **日志结构存储（Log-Structured Storage）**：利用顺序写的性能优势，先写内存再批量刷盘，避免随机 I/O
- **不可变数据文件（SSTable）**：写入即可变世界的思路简化了并发控制，Compaction 在后台异步合并
- **时间戳版本控制（Last-Write-Wins）**：通过时间戳解决并发冲突，无需分布式锁
- **墓碑标记删除（Tombstone）**：软删除机制，在 Compaction 时才真正物理删除，避免写入放大
- **一致性级别可调（Tunable Consistency）**：通过 Quorum Q 值在一致性和可用性之间做工程权衡

## 关键语录

> "Because select star is so common and because you need all the data relevant to a user all the time, this means that this entire blob will also be pulled out all the time. So that means insertions and retrievals require the whole blob. So why not keep it together?"

> "Whenever you're doing a new attribute addition... over here, if there's something that you're adding, which you don't need for all the older users, what you can do is just start adding them straight away. Because the schema doesn't care."

> "It's not that scalability demands a NoSQL database. There are certain scenarios when these databases tend to do well."

> "What Cassandra should be doing is returning a database error so that the application knows that there's something wrong in the database... So to do that, what we need is some sort of distributed consensus."

> "Quorum is a way in which multiple nodes who are related to a particular query accept a particular value or they come upon or decide or vote for a particular value."

> "The sorted string table is immutable. So every time Cassandra has some data in its memory, it flushes it into a new sorted string table. Later on, like a batch process, you are going to be compacting these SSTs to optimize for space."

## 总结

本视频是 NoSQL 数据库的入门佳作，从理念到实践形成完整闭环。通过 Cassandra 这一具体实现，视频展示了 NoSQL 并非"万能药"，而是针对特定场景（高写入、数据聚合、Schema 频繁变更、需大规模水平扩展）优化的技术选型。同时，Quorum 和 Compaction 等概念的引入也提醒我们：NoSQL 的简洁写入背后，是复杂的分布式一致性机制和后台维护任务的支撑。理解这些底层细节，才能在系统设计面试中做出正确的是否使用 NoSQL 的判断。
