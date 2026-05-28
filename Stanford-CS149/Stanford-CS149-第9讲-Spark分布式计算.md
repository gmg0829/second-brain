# Stanford CS149 第九讲：基于 Spark 的分布式数据并行计算

## 课程信息
- **标题**：Distributed Data-Parallel Computing Using Spark
- **主题**：Producer-consumer locality、RDD 抽象、Spark 实现与调度
- **来源**：Stanford Online CS149 2023 Lecture 9

## 核心内容

### 背景回顾
本讲承接前几章内容：从单核 SIMD 优化、ISPC / 线程编程，到 GPU CUDA 数据并行，现在扩展到**多台独立操作系统实例**组成的分布式计算机编程。

### Spark 编程模型
- 核心问题：如何让数据并行模型扩展到**数十万核心**，并高效运行
- 数据处理是分布式计算的主要场景，**数据不丢失**是刚性需求
- 采用**函数式数据并行原语**作为分布式编程的核心抽象

### 关键挑战
1. **扩展性**：数据并行程序如何高效利用海量分布式核心
2. **容错**：节点故障时如何优雅恢复，保证数据不丢失
3. **局部性**：生产者-消费者局部性（Producer-Consumer Locality）优化

### 技术要点
- **RDD（Resilient Distributed Datasets）**：弹性分布式数据集，是 Spark 的核心抽象
- **Spark 实现与调度**：如何将逻辑数据流映射到物理执行资源
- 函数式设计天然支持透明容错与并行执行

## 总结
Spark 通过 RDD 抽象，将数据并行编程思想从单机器扩展到分布式集群，兼顾扩展性、容错性与局部性优化，是大数据处理的主流选择。
