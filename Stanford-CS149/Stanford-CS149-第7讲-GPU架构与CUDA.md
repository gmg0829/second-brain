# Stanford CS149 并行计算 - 第七讲：GPU架构与CUDA编程

## 课程概述

本讲探讨**CUDA编程抽象**及其在现代GPU上的实现方式。

## GPU计算的历史演进

现代GPU计算源于游戏产业。NVIDIA、AMD等公司最初为运行《Quake》等游戏而生产GPU，如今已发展成为万亿美元级别的计算平台，规模远超Intel。本讲回顾这一技术演进历程。

## CUDA编程模型

CUDA是NVIDIA提供的GPU编程语言，与**ispc**（Intel SPMD Program Compiler）高度相似——ispc的出现本身就是为了在CPU上实现类似CUDA的编程体验。CUDA的编程模型对有多线程和SIMD经验的开发者来说非常熟悉。

## 核心概念

GPU计算的核心思想**并非新概念**，而是经典并行计算思想的大规模部署：

- **多线程（Multi-threading）**：大规模并行线程管理
- **SIMD（Single Instruction Multiple Data）**：单指令多数据执行模型
- **多核执行（Multi-core Execution）**：在GPU架构中的实现

## 讲座目标

理解CUDA代码如何在现代GPU硬件上高效执行，掌握从软件抽象到硬件实现的映射关系。

---
*来源：Stanford CS149 Parallel Computing 2023 Lecture 7*