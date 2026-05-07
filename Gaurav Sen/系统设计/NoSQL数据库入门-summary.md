---
title: Introduction to NoSQL databases
channel: Gaurav Sen
url: "https://www.youtube.com/watch?v=xQnIN9bW0og"
description: NoSQL is a popular database storage method. It keeps data as key-value pairs. The advantages and disadvantages of NoSQL compared with RDBMS (which uses SQL) are discussed here, using the Cassandra architecture as an example.
language: en
summary_language: zh
---

# NoSQL 数据库入门

## 概述

NoSQL 是一类流行的数据库存储方案，其核心是将数据以**键值对（Key-Value）**的形式保存为 JSON 文档块（blob）。与使用 SQL 的传统关系型数据库（RDBMS）相比，NoSQL 在扩展性、写性能和 Schema 灵活性方面有显著优势，但也存在一致性、关联查询等方面的固有局限。本视频以 **Cassandra** 架构为具体案例，系统讲解了 NoSQL 的适用场景与核心机制。

---

## 一、SQL vs NoSQL：数据组织方式的根本差异

### 1.1 关系型数据库的数据存储

以"用户"为例，传统 SQL 表结构大致如下：

| ID  | Name     | AddressID | Age | Role    |
|-----|----------|-----------|-----|---------|
| 1   | John Doe | 23        | 30  | Staff   |

地址信息存储在独立的 `Address` 表中，通过 `AddressID = 23` 外键关联。查询用户完整信息需要 **JOIN** 操作：

```sql
SELECT * FROM User u
JOIN Address a ON u.AddressID = a.ID
WHERE u.ID = 1;
```

### 1.2 NoSQL 的数据存储

相同数据在 NoSQL 中以一个**自包含的 JSON 对象**存储：

```json
{
  "id": 1,
  "name": "John Doe",
  "address": {
    "id": 23,
    "city": "Munich",
    "country": "Germany",
    "district": null
  },
  "age": 30,
  "role": "Staff"
}
```

`district` 为空时，**根本不存储该字段**，而 SQL 中该列必须存在（NULL 值）。这是 NoSQL Schema 灵活性的直接体现。

---

## 二、NoSQL 的四大核心优势

### 2.1 数据就近存储（写优化）

用户注册时，所有字段（姓名、地址、年龄、角色）几乎**同时提交**，NoSQL 将整个 JSON blob 视为一个写入单元，无需拆分成多个表、通过外键关联、再执行 JOIN。

- **INSERT**：一次写入完成，无需多表操作
- **SELECT \*（查全量用户数据）**：直接读取 blob，无需多表 JOIN

在 SQL 中，查询用户完整信息需要先查主表、再查地址表、再合并——这一过程在 NoSQL 中被简化为一次磁盘顺序读取。

### 2.2 Schema 灵活性（免 ALTER TABLE）

向 SQL 表添加一个新列（如 `salary`）是**高成本操作**：

- 需要对整张表加锁
- 需要维护数据一致性
- 老数据该列全部填充 NULL 或默认值

在 NoSQL 中，新属性可以**立即添加**，老用户记录完全不受影响，Schema 不对记录做任何约束——NoSQL 只认 JSON 文档，不关心缺不缺字段。

### 2.3 水平分片内置（Horizontal Partitioning）

NoSQL 数据库在设计时就预期大规模扩展请求：

- 将数据通过**哈希函数**分散到多个节点
- 每个节点承担总数据量的约 1/N
- 相比垂直扩容（升级单机硬件），水平扩容更经济、更可靠

这使得"NoSQL 天生支持扩容"成为可能。

### 2.4 内置聚合能力

NoSQL 用户通常期望从数据中提取**聚合指标**（metrics）：

- 平均年龄
- 总薪资
- 分布统计

这些查询模式与 NoSQL 的列存储结构高度契合，数据就在记录内部，聚合计算直接在本地完成。

---

## 三、NoSQL 的四大劣势

### 3.1 更新操作天然不友好

NoSQL 对**写放大（Write Amplification）**友好，但对**原地更新（In-Place Update）**支持较差。更新需要：

1. 读取整个 blob
2. 修改目标字段
3. 写回整个 blob

若频繁更新同一个 blob 的不同字段，性能会显著下降。

### 3.2 一致性无保证（ACID 缺失）

两个节点可能持有**同一 ID 的不同数据版本**：

- 没有 ACID 事务保证
- 金融系统（需要强一致性）**不能**使用 NoSQL 存储交易数据
- NoSQL 优先保证**可用性（Availability）**，在一致性与可用性之间选择了后者

### 3.3 读取非最优（列剪裁效率低）

若要查询所有用户的"年龄"字段：

- SQL：直接定位到 `age` 列，顺序读取
- NoSQL：**必须**读取每条记录的完整 blob，再从中过滤出 `age` 字段

这导致 NoSQL 在**单列读取**场景下效率低于关系型数据库。

### 3.4 关联关系与 JOIN 难题

- **关系不内含**：NoSQL 没有外键约束，无法在数据库层强制引用完整性
- **JOIN 全靠手动**：连接两个 NoSQL 表需要：
  1. 遍历所有目标 blob
  2. 找到 JOIN 列
  3. 再次遍历匹配
  4. 手动合并

这是 NoSQL 设计哲学与关系型的根本分歧：**以文档为边界，而非以关系为边界**。

---

## 四、Cassandra 架构详解

### 4.1 集群结构与一致性哈希

Cassandra 集群由多个节点组成，每个节点负责一定范围的数据：

```
节点1: [0, 200)        → key 哈希值 0-199
节点2: [200, 400)      → key 哈希值 200-399
节点3: [400, 600)      → key 哈希值 400-599
节点4: [600, 800)      → key 哈希值 600-799
节点5: [800, 1000)     → key 哈希值 800-999
```

- 写入请求的 Key 先经**哈希函数**映射到数值
- 哈希值落在哪个范围，就路由到对应节点
- 均匀的哈希函数保证各节点**负载均衡**（各承担约 20% 请求）

### 4.2 哈希函数不均匀的灾难

若哈希函数设计不佳（如 `<100 → 0，≥100 → 1`），会导致**数据倾斜（Hot Spot）**：

- 0-500 的请求几乎全部落入节点 1
- 节点 1 过载崩溃 → 整个集群不可用

### 4.3 多级分片（Multi-Level Sharding）

当单一哈希函数无法解决数据倾斜时，可采用**多层哈希**：

```
第一层（按国家哈希）
  └─ 印度用户 → 二级集群（5个节点，内部均匀哈希）
  └─ 美国用户 → 二级集群（5个节点，内部均匀哈希）
```

典型案例如 Google Maps：节日期间印度用户激增，单层哈希会导致印度节点过载，多级分片可以有效分散热点。

### 4.4 数据复制（Replica）

重要数据需要在多个节点保存副本：

- **复制因子（Replication Factor）= 2**：主节点 + 顺时针下一个节点同时存储
- 写入时同步向所有副本写入
- 读取时可从任一副本读取（提升读取吞吐）

```
Key 落在节点2 → 节点2为主副本，节点3（顺时针下一节点）为副本
Key 落在节点5 → 节点5为主副本，节点1为副本
```

---

## 五、分布式共识：Quorum 机制

### 5.1 问题：副本数据不同步

考虑以下场景：

1. 向节点 5 写入数据（ Replication Factor = 3，要求节点 5、1、2 都要写入）
2. 节点 5 写入成功，但节点 1、2 由于网络延迟**尚未写入**
3. 立即发起读取，节点 5 恰好宕机
4. 请求路由到节点 1 → 返回"用户不存在"

这给用户造成了困惑：明明刚注册，却提示不存在。

### 5.2 Quorum 的核心思想

**Quorum = 多数节点同意的值 = 真相**

- **Replication Factor（N）** = 3（总副本数）
- **Quorum（W）** = 2（需要多少节点同意才能确认写入成功）

当 `W > N/2`（即多数）时，读请求只需检查多数副本即可获得一致答案：

- 节点 1 返回：有数据（但还在传播中，可能过期）
- 节点 2 返回：有数据（版本号较旧）
- 节点 5 宕机

系统在多数节点同意的基础上，选择**时间戳最新**的值返回——这是 Cassandra 处理并发写入的核心逻辑。

### 5.3 Quorum 的风险

若 `Quorum = 2` 且 Replication Factor = 3：

- 节点 1、2 都未完成写入时，读请求会得到**错误的"用户不存在"**
- 这种 race condition 概率很低，但不等于零
- NoSQL 选择**接受这种小概率不一致**，换取高可用性

---

## 六、SSTable 与 MemTable 存储机制

### 6.1 写入流程

```
写入请求 → MemTable（内存中的 WAL） → 定期刷盘 → SSTable（永久存储）
```

- **MemTable**：内存中的有序缓冲区，按写入顺序记录（类似日志）
- 写入操作是**顺序追加**（Sequential Write），无需随机寻址，因此极快
- 当 MemTable 达到阈值时，刷盘为 **SSTable（Sorted String Table）**

### 6.2 SSTable 的特点

SSTable 是**不可变（Immutable）**的有序键值存储：

- Key 在 SSTable 内**全局有序**
- 每次刷盘生成一个新的 SSTable 文件
- 由于不可变，写入无需考虑并发控制，非常适合顺序 I/O

### 6.3 来自 BigTable 的启发

SSTable 概念源自 Google 的 **BigTable** 论文，是现代分布式存储系统（ScyllaDB、Elasticsearch、Cassandra）的共同基石。

---

## 七、Compaction 压缩合并

### 7.1 重复记录问题

随着时间推移，同一 Key 可能出现多个版本（因为每次更新都会生成新 SSTable）：

```
SSTable 1: key=1 → John Doe（第一天写入）
SSTable 3: key=1 → John M. Doe（第三天更新，生成新 SSTable）
```

这会导致**存储空间浪费**：同一个 Key 存了多份。

### 7.2 Compaction 机制

Compaction 将多个 SSTable **按 Key 归并排序（Merge Sort）**：

```
Input:  SSTable A [key=1@T1, key=2@T1]  +  SSTable B [key=1@T3, key=3@T3]
Output: SSTable C [key=1@T3(最新), key=2@T1, key=3@T3]
```

- 归并过程是 **O(N) 时间复杂度**，空间复杂度为 O(M+N)
- 同一 Key 的多个版本只保留**时间戳最新**的那条
- 执行后旧 SSTable 被丢弃，释放空间

这就是 Cassandra 和 Elasticsearch 等系统持续后台运行的**空间优化机制**。

---

## 八、Tombstone（墓碑）机制

### 8.1 删除的特殊处理

SSTable 不可变，意味着**删除操作无法就地抹除数据**。Cassandra 的处理方式是：

1. 在目标记录位置写入一个 **Tombstone（墓碑标记）**
2. Tombstone 包含删除时间戳
3. 后续 Compaction 时，遇到 Tombstone 则该 Key 的所有历史版本**统一清理**

### 8.2 读取时遇到 Tombstone

- 若 Tombstone 的时间戳是最新 → 该记录被视为**已删除**
- 读取时返回"记录不存在"（而非报错）
- 若尝试对一个已有 Tombstone 的 Key 做更新 → 抛出异常

---

## 九、总结：NoSQL 适用判断框架

| 维度 | 适合 NoSQL | 适合 SQL |
|------|-----------|---------|
| 数据形态 | 大 blob / JSON 文档 | 规范化多表 |
| 更新频率 | 写入密集，读多写少 | 频繁更新局部字段 |
| 扩展需求 | 海量数据，需水平扩展 | 数据量可控 |
| 一致性要求 | 最终一致即可 | 强一致性（ACID）|
| 关联查询 | 少 JOIN，简单 Key-Value | 多表 JOIN 复杂 |
| 典型场景 | 日志、用户画像、实时分析 | 金融、订单、库存 |

**反例**：YouTube、Stack Overflow、Instagram —— 这些产品虽有海量数据，但它们的**数据关联性强、更新频繁、强一致性要求高**，因此仍然选择关系型数据库。

---

## 视频信息

- **时长**：约 26 分 16 秒
- **章节**：
  - 00:00 Intro
  - 01:08 NoSQL explanation and comparison
  - 10:27 Cassandra Architecture
  - 18:00 Quorum
  - 21:30 Compaction of SST tables
- **相关视频**：分片（Sharding）、负载均衡（Load Balancing）、Tim Sort（Merge Sort 算法）
