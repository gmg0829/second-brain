---
title: Stanford CS149 第12讲 - 内存一致性
description: 宽松一致性模型及其动机，acquire/release 语义
language: zh
---

# Stanford CS149 第12讲 - 内存一致性

## 内存一致性 vs 缓存一致性

- **缓存一致性 (Cache Coherence)**：保证同一地址的所有读写操作可被排序，且读返回最后一次写入的值
- **内存一致性 (Memory Consistency)**：定义多核内存访问的全局顺序语义

## 顺序一致性 (Sequential Consistency, SC)

程序顺序与操作顺序一致——每个线程按代码顺序执行，所有线程的操作交织排序。

## 宽松一致性模型

- **TSO (Total Store Order)**：允许写缓冲 (write buffer)，读可跳过缓冲中的写
- **PC (Processor Consistency)**：进一步放松
- 常见模式：**acquire/release** 语义用于同步

## 内存操作重排类型

| 符号 | 含义 |
|------|------|
| WX→RY | 线程X写 → 线程Y读 |
| RX→RY | 读后读重排 |
| RX→WY | 读后写重排 |
| WX→WY | 写后写重排 |

## 写缓冲与性能权衡

- 写缓冲隐藏内存延迟，提升吞吐量
- 代价：破坏 SC 语义，需内存屏障 (memory barrier) 纠正

## 程序员期望与同步

- 期望：代码按程序顺序执行
- 实际：多核处理器可重排操作
- 解决：同步原语 (locks, barriers) 提供确定性