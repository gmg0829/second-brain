# Stanford CS149 第四讲：并行编程基础

## 概述

本讲聚焦**并行程序设计范式**，探讨如何将串行程序转换为并行程序，涵盖并行编程模型、OpenMP、并行性识别、性能考量等核心主题。

---

## 并行编程模型

### Fork-Join 模型

```
         主线程
           |
    ------ fork
   /    \    \
  T1    T2    T3      ← 并行执行
   \    /    /
    ------ join
           |
       合并结果
```

- **Fork**：主线程分叉出多个并行 worker
- **Join**：worker 完成后合并回主线程
- **特点**：嵌套并行，支持递归分解

### 线程 vs 进程

| 维度 | 线程 | 进程 |
|------|------|------|
| 内存 | 共享地址空间 | 独立地址空间 |
| 创建开销 | 小 | 大 |
| 通信 | 共享内存 | IPC |
| 同步 | 轻量锁/原子操作 | 消息传递 |

---

## OpenMP 与并行循环

### 基本语法

```c
#pragma omp parallel for
for (int i = 0; i < N; i++) {
    a[i] = compute(b[i]);
}
```

- 编译器自动将循环迭代分配给线程
- **数据私有化**：循环变量 `i` 自动私有化
- **归约**：支持 `reduction(+: sum)` 模式

### gang/worker 模型（ISPC 示例）

```c
// ISPC: gang size = 8
foreach (i = 0; i < N; i++) {
    // 8 个 program instance 并行执行
    // 每个 instance 有唯一的 programIndex
    result[programIndex] = process(data[i]);
}
```

---

## 数据并行 vs 任务并行

### 数据并行（Data Parallelism）

**核心思想**：相同操作作用于不同数据元素

```c
// 数据并行：每个元素独立计算
#pragma omp parallel for
for (int i = 0; i < N; i++)
    out[i] = sin(in[i]);
```

- **特点**：规则迭代，易于并行化
- **内存访问模式**决定性能（连续访问 > 跳跃访问）

### 任务并行（Task Parallelism）

**核心思想**：不同任务并行执行

```c
// 任务并行：独立子任务
#pragma omp task
processA();

#pragma omp task
processB();
```

- **特点**：灵活，但需显式管理依赖
- **Fork-Join 是典型任务并行模型**

---

## 可并行化工作识别

### Amdahl 定律

$$S_{latency} = \frac{1}{(1 - p) + \frac{p}{N}}$$

- $p$ = 可并行化比例
- $N$ = 处理器数量
- **关键**：找到程序的串行瓶颈

### 并行化步骤

1. **识别独立工作**：无数据依赖的迭代/代码块
2. **分析依赖关系**：WAW、WAR、RAW
3. **划分粒度**：细粒度（循环级）vs 粗粒度（函数级）
4. **处理同步**：最小化锁竞争

---

## 竞态条件与同步基础

### 竞态条件（Race Condition）

```c
// 有竞态：多个线程同时写
#pragma omp parallel for
for (int i = 0; i < N; i++)
    total += compute(a[i]);  // ❌ 竞态

// 无竞态：使用归约
#pragma omp parallel for reduction(+: total)
for (int i = 0; i < N; i++)
    total += compute(a[i]);  // ✓ 安全
```

### 同步原语

| 原语 | 用途 | 开销 |
|------|------|------|
| `barrier` | 强制所有线程同步 | 高 |
| `atomic` | 单操作原子更新 | 中 |
| `critical` | 互斥访问临界区 | 高 |
| `reduction` | 并行归约 | 低 |

---

## 并行程序性能考量

### 内存带宽与缓存

- **连续访问**利用 cache line，效率高
- **跳跃访问**触发多次 cache miss，效率低
- 向量加载：一次加载多个 cache line

### SIMD 向量化

- Gang size = SIMD 宽度时效率最优
- 编译器自动向量化（如 ISPC）
- 手动向量化：`__m256`, `AVX` intrinsics

### 负载均衡

```c
// 块划分：每个线程连续块
for (int i = tid * chunk; i < (tid+1) * chunk; i++)

// 交错划分：线程轮流处理
for (int i = tid; i < N; i += num_threads)
```

- **块划分**→ 内存访问局部性好
- **交错划分**→ 负载均衡好（但可能 cache 不友好）

---

## 总结

| 概念 | 关键点 |
|------|--------|
| Fork-Join | 嵌套并行，动态创建线程 |
| OpenMP | `#pragma omp` 声明式并行 |
| 数据并行 | 相同操作作用于不同数据 |
| 任务并行 | 不同任务并行执行 |
| 同步 | 最小化临界区，降低开销 |
| 性能 | 关注内存局部性、负载均衡 |

**核心原则**：保持并行工作足够大，最小化同步开销，让编译器/运行时做优化决策。
