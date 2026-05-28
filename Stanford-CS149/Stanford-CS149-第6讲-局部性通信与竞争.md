# Stanford CS149 并行计算 - 第六讲：性能优化 II：局部性、通信与竞争

## 课程信息

- **标题**: Performance Optimization II: Locality, Communication, and Contention
- **频道**: Stanford Online
- **URL**: https://www.youtube.com/watch?v=Mhdny2JNhmc
- **关键词**: Message passing, async vs. blocking sends/receives, pipelining, increasing arithmetic intensity, avoiding contention

## 内容概要

本讲是软件与性能优化系列 Lectures 的第二部分（在第六讲），下一讲将进入 GPU 编程，第八讲则讨论数据并行思维。

### 核心主题

1. **局部性优化（Locality Optimization）**
   - 优化数据访问模式，提高缓存命中率

2. **通信最小化（Communication Minimization）**
   - 减少处理器间的数据交换开销
   - 异步 vs 阻塞发送/接收的权衡

3. **竞争减少（Contention Reduction）**
   - 避免多处理器访问共享资源时的瓶颈

4. **内存层级优化（Memory Hierarchy Optimization）**
   - 利用寄存器、L1/L2/L3 缓存、内存的层级结构

5. **流水线并行（Pipelining）**
   - 通过流水线化任务提高指令级并行

6. **算术强度提升（Increasing Arithmetic Intensity）**
   - 最大化计算与内存访问的比值

### 知识点

- Message passing 模型中的异步通信机制
- 阻塞与非阻塞 send/receive 的性能差异
- 通过流水线重叠通信与计算
- 负载均衡与减少同步开销的平衡策略

> ⚠️ **注意**: 此摘要基于课程标题和描述生成，原始 Transcript 文件内容不完整。如需更详细的中文讲义笔记，建议参考课程官方 PDF 或补充完整 Transcript。