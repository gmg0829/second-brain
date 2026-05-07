---
title: "How NETFLIX onboards new content: Video Processing at scale 🎥"
channel: Gaurav Sen
url: "https://www.youtube.com/watch?v=x9Hrn0oNmJM"
description: "Everyday, #Netflix handles billions of requests regarding movies, trailers and other video content. Delivering at such a large scale needs an #engineering marvel. This #video will talk about how Netflix is able to onboard new video content onto their platform. We go from video chunking to collating 4 second shots into scenes."
language: en
summary_language: zh
---

# Netflix 如何上线新内容：视频处理规模化揭秘

## 概述

Netflix 每天处理**数十亿次**视频请求，涵盖电影、剧集预告片和各种视频内容。能以如此大规模稳定交付，是一个工程学上的壮举。本视频系统讲解了 Netflix 将一部新电影或剧集从上传到面向全球用户可观看这一完整流程中的核心工程决策，重点涵盖：**多格式多分辨率转码、场景化分块（Shot-based chunking）、稀疏/密集影片差异化缓存策略、Amazon S3 存储**，以及 Netflix 最具创新性的 **OpenConnect CDN 架构**。

---

## 一、核心挑战：格式与分辨率的排列组合

### 1.1 Codec（编码器）：同一视频的多种画质

视频文件有多种**编码格式**，本质是对同一原始视频数据的不同压缩方式：

| 画质等级 | 压缩质量 | 文件大小 | 适用场景 |
|---------|---------|---------|---------|
| High Quality（如 H.264/HEVC） | 最低损耗 | 体积最大（1GB+） | 高带宽用户，追求最高画质 |
| Medium Quality | 中等损耗 | 体积中等 | 中等带宽 |
| Low Quality | 高损耗 | 体积最小 | 低带宽或移动网络 |

Codec（编码器）本质上是一种**有损压缩算法**，通过丢弃人眼不易察觉的数据来减小文件体积。用户网络条件越好，Netflix 就提供编码质量越高的版本。

### 1.2 分辨率的多版本适配

同一视频还需要针对不同显示设备生成多个分辨率版本：

- **手机屏幕**：480p 足够，1080p 浪费带宽
- **笔记本屏幕**：720p / 1080p
- **智能电视**：多种分辨率

### 1.3 版本数量的爆炸性增长

若视频格式数为 **F**，分辨率数为 **R**，则一部电影最终需要生成 **F × R** 个独立版本。这是一个排列组合问题，也是 Netflix 视频处理管道必须并行化的根本原因。

### 1.4 新编码技术带来的重编码红利

当 Netflix 工程师研发出更优的压缩算法时（如从 6GB 压缩到 1GB），需要**对所有历史影片重新编码**。这个过程非常耗时，不能交给单台机器处理——这正是分布式并行处理的动机。

---

## 二、视频分块（Chunking）：从大文件到可并行处理的小单元

### 2.1 为什么不能单文件串行处理

一部两小时的电影若作为单一文件处理：

- 单一处理器需要数十小时才能完成所有格式/分辨率的转码
- 处理中途若机器宕机，全部进度丢失，需从头再来
- 无法量化进度，也无法弹性扩展

### 2.2 最初方案：按时间等分切片

最初 Netflix 将视频按**固定时长**切分（如每段 3 分钟），这样各处理器工作量均等，便于调度。但这里有一个致命问题：

> 假设《速度与激情》中，第 3 分钟刚好是追逐戏的关键帧，按 3 分钟切分会把这个画面**硬生生截断**在两个分块的边界**。

用户观看时在这个边界点击跳转，会触发 API 请求新片段，产生明显卡顿，用户体验极差。

### 2.3 改进方案：基于场景（Scene）的分块

Netflix 改为**按场景（Scene）而非按时长**切分视频：

- **Shot（镜头）**：约 4 秒的最小单元，语义上是一个不间断的连续画面
- **Scene（场景）**：由多个 Shot 组成的完整戏剧单元（如一段汽车追逐戏）
- **Chunk（块）**：每个 4 秒的 Shot 作为最小处理单元

这样用户无论跳转到哪个时间点，请求的都是一个**语义完整的场景块**，而不会是硬切在动作高潮点。

### 2.4 分块处理的调度模型

```
原始电影文件
    ↓ 拆分为 N 个 4 秒 Shot
Shot A → [处理器1] → A.mp4@720p + A.mp4@480p + A.avi@720p + ...
Shot B → [处理器2] → B.mp4@720p + B.mp4@480p + B.avi@720p + ...
Shot C → [处理器3] → C.mp4@720p + ...
...
```

**每个处理器每处理一个组合（1个 Shot × 1种格式 × 1种分辨率）**视为一个独立任务。这种并行化使转码时间从数十小时缩短到数十分钟。

---

## 三、稀疏影片 vs 密集影片：预测算法驱动的缓存策略

Netflix 的推荐算法会根据用户行为将影片分为两类：

### 3.1 稀疏影片（Sparse Movie）

用户观看时**不在连续位置停留**，而是跳跃式观看（从一个场景跳到另一个不相关的场景）。说明用户可能在找特定片段，或者视频本身对用户吸引力有限。

Netflix 对稀疏影片采用**按需拉取（On-Demand）**策略：用户请求哪个片段，就只传输哪个片段，不做额外预取。

### 3.2 密集影片（Dense Movie）

用户**线性连续观看**，Netflix 能预测"下一个会被点播的场景"。对这类影片，采用**预测性预取（Proactive Fetching）**：

- 在用户观看当前片段时，后台主动将"接下来最可能被点播"的场景块提前拉到用户设备
- 用户几乎感觉不到任何加载等待

这是 Netflix 推荐算法与视频分发管道深度集成的典型案例。

---

## 四、存储架构：Amazon S3

Netflix 所有视频内容的原始文件和处理后的各版本分块，都存储在 **Amazon S3（Simple Storage Service）**中：

- S3 是**对象存储**，适合存储大量不变（Immutable）的静态文件
- 相比传统数据库，S3 成本极低：
  - 数据库：为更新、事务、索引付出了额外复杂度成本
  - S3：只关心"存"和"取"，没有任何写入更新开销，成本仅为数据库的零头
- 视频文件的特点（写入一次，永不修改，永久读取）与 S3 的设计哲学完美契合

---

## 五、OpenConnect：CDN 就近部署到 ISP

### 5.1 问题的本质：地理延迟

Netflix 的核心服务器集群主要集中在美国。当印度用户请求观看一部宝莱坞电影时：

```
印度用户 → ISP → Netflix美国服务器（跨太平洋往返）→ 高延迟+带宽成本
```

视频是**大流量数据**，往返延迟加上跨洲带宽成本，在数亿用户规模下是不可接受的。

### 5.2 OpenConnect 架构

Netflix 创新地将**缓存服务器直接部署到各国 ISP（互联网服务提供商）机房内部**，称为 **OpenConnect（OC）服务器**：

```
印度用户 → 本地ISP → OpenConnect缓存（已存有宝莱坞新片）
                                         ↓（命中）
                                   极速返回，无跨国带宽消耗
```

OC 服务器本质上是 Netflix 专门定制的**超大硬盘**，预装了海量热门影片分块。当用户请求到达时，ISP 先检查 OC 缓存是否命中：

- **命中（Cache Hit）**：直接本地返回，用户体验极佳（延迟降低，带宽节省）
- **未命中（Cache Miss）**：请求穿透到 Netflix 美国服务器，再返回

### 5.3 惊人的规模效果

> **约 90% 的 Netflix 流量**由 ISP 机房内的 OpenConnect 服务器吸收，只有不到 10% 的请求需要打到 Netflix 源站。

这是一举多得的工程杰作：

| 受益方 | 收益 |
|-------|------|
| 用户 | 延迟大幅降低（本地网络而非跨洋），几乎零缓冲 |
| Netflix | 带宽成本剧降，源站负载骤减 |
| ISP | 网络拥塞减轻，用户以为"自家宽带有料" |

### 5.4 新影片如何同步到 OpenConnect

新影片上线时，Netflix 并非实时推送，而是利用**凌晨低负载窗口**（约 4 AM）批量将新内容的分块写入各 OC 服务器：

1. 影片注册上线，触发转码管道
2. 转码完成后，按分块推送至各区域 OC 服务器
3. OC 服务器接收完毕，用户即可从本地 ISP 缓存获取影片

---

## 六、端到端全流程总结

```
1. 影片上传注册
       ↓
2. 按场景分块（4秒 Shot × N 个）
       ↓
3. 并行转码管道
   Shot A → [720p MP4, 480p AVI, 1080p MP4, ...]
   Shot B → [720p MP4, 480p AVI, 1080p MP4, ...]
   ...
       ↓
4. 各版本分块存入 Amazon S3
       ↓
5. 新片上线时，通过凌晨批量同步推送到各区域 OpenConnect 服务器
       ↓
6. 用户请求
   ├─ 稀疏观看 → 按需拉取所需分块
   └─ 密集观看 → 推荐算法预取下一场景
       ↓
7. OpenConnect 缓存命中 → 本地极速返回（90%流量）
   缓存未命中 → Netflix 源站回源
```

---

## 视频信息

- **时长**：约 10 分 43 秒
- **章节**：
  - 00:00 Problem Description（问题描述）
  - 00:32 Video formats and resolutions（视频格式与分辨率）
  - 03:18 Chunk processing（分块处理）
  - 05:52 Storage（存储）
  - 06:19 OpenConnect for video caching（OpenConnect 视频缓存）
  - 10:13 Summary（总结）
- **参考文章**：
  - Netflix Tech Blog: High Quality Video Encoding at Scale
  - Netflix Tech Blog: Optimized Shot-Based Encodes Now Streaming
  - Netflix Tech Blog: Keystone Real-time Stream Processing Platform
