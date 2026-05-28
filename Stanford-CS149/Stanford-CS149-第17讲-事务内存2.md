# Stanford CS149 第17讲：事务内存 2（Transactional Memory 2）

## 课程概述

本讲继续深入探讨事务内存（Transactional Memory），重点介绍 **STM（软件事务内存）实现细节** 与 **HTM（硬件事务内存）** 两大核心主题。

---

## 核心概念回顾

### 数据版本策略（Data Versioning Policy）

| 策略 | 描述 |
|------|------|
| **Eager（乐观）** | 新数据直接写入原地址，事务提交时通过undo log回滚旧值 |
| **Lazy（悲观）** | 新数据写入私有缓存/日志，直到事务提交时才可见 |

### 冲突检测策略（Conflict Detection Policy）

| 策略 | 描述 |
|------|------|
| **Pessimistic（悲观）** | 每次内存访问时实时检测冲突，可能引发锁等待 |
| **Optimistic（乐观）** | 假设无冲突，事务提交时统一验证读集（Read Set）一致性 |

---

## STM 实现要点

- **读集（Read Set）**：记录事务读取的所有对象及其地址/时间戳
- **写集（Write Set）**：记录事务修改的所有对象及其新值
- **Undo Log**：Eager策略下记录旧值，事务中止时用于恢复
- **时间戳机制**：通过递增时间戳标记对象最新状态
- **验证（Validation）**：提交前检查读集中的对象是否被其他事务修改
- **livelock 处理**：悲观检测下可能出现活锁，需系统介入恢复确保程序向前执行

---

## HTM（硬件事务内存）与 Intel TSX

- **Intel TSX**（Transactional Synchronization Extensions）是Intel在CPU层面实现的事务内存指令集
- HTM 将冲突检测和版本管理下沉到硬件层面，显著降低开销
- **优势**：比STM更低的abort/retry延迟，适合短事务场景
- **局限**：缓存容量有限（一般几十KB），大事务易溢出导致abort
- **Fallback 机制**：HTM失败时可退回软件实现（如Intel Restricted Transactional Memory）

---

## Abort/Retry 机制

当事务发生冲突时的标准处理流程：

1. **检测到冲突** → 中止当前事务
2. **清理现场** → 释放锁、回滚Undo Log、清除读/写集
3. **重试策略** → 指数退避、随机延迟，避免再次冲突
4. **Progress 保证** → 确保系统最终能向前执行

---

## 性能权衡总结

| 维度 | STM | HTM |
|------|-----|-----|
| 开销 | 较高（软件记录） | 低（硬件加速） |
| 事务大小 | 无限制 | 受缓存容量约束 |
| 灵活性 | 高（可定制） | 低（依赖硬件） |
| 适用场景 | 长事务、复杂逻辑 | 短事务、高频场景 |

---

## 关键结论

- 事务内存通过**自动化冲突管理**大幅简化并发编程
- 乐观策略（提交时检测）避免了悲观策略可能出现的活锁
- HTM 是趋势，但需要完善的软件fallback机制保底
- 实际系统往往是 **STM + HTM 混合架构**

> 课程来源：Stanford CS149 I Parallel Computing I 2023，Lecture 17
