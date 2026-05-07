# Caching in distributed systems: A friendly introduction

**视频ID**: zw7VwIlkPPc
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=zw7VwIlkPPc

## 内容概要

本视频是Gaurav Sen系统设计系列中关于缓存的入门教程。缓存是计算机科学的基本概念，任何大规模分布式系统都存在多种形式的缓存，且常常位于关键路径上。视频通过一个具体的例子——用户请求Instagram动态信息流（News Feed）——来解释缓存的工作原理和价值。

在原始场景中，用户请求经历以下延迟：用户到服务器100毫秒，服务器到数据库10毫秒，数据库返回10毫秒，服务器返回用户100毫秒，总计220毫秒。如果引入缓存，同样的查询可以降至1毫秒，整体延迟可降至约202毫秒，节省近10%的时间。对于移动端设备，如果在本地也缓存已获取的信息，响应时间可从200毫秒降至仅2毫秒。

缓存的核心思想是通过存储来减少重复工作：对于相同或相似的请求，不必每次都重新计算或查询数据库，直接从本地内存返回已存储的结果即可。缓存的查询速度远快于数据库，因为缓存在内存中而数据库涉及磁盘IO。但缓存也有局限性：无法将整个大型数据库（TB/PB级别）全部放入内存，必须选择性地存储最频繁访问的数据。

工程师需要思考两个核心问题：一是当缓存中的数据更新时如何处理（写入策略）；二是当缓存满时应该驱逐哪些数据（置换策略）。视频以YouTube视频突然爆火为例说明了置换策略的必要性：新视频成为热点时，需要将某个旧数据从缓存中移除以腾出空间。

## 核心观点

- 缓存通过存储避免重复计算和数据库查询来显著降低延迟
- 缓存位置可以是内存（服务器本地）、数据库自身缓存，或独立的分布式缓存服务器
- 实际生产系统中通常三种缓存方案同时使用
- 缓存策略（写入策略和置换策略）的选择直接影响系统性能
- 缓存命中率（Cache Hit Ratio）是衡量缓存效率的关键指标

## 关键术语

- **缓存（Cache）**：存储频繁访问数据的高速内存，减少重复计算和数据库查询
- **缓存命中率（Cache Hit Ratio）**：请求能从缓存直接满足的比例，越高越好
- **缓存未命中（Cache Miss）**：请求在缓存中找不到数据，需要查询数据库
- **抖动（Thrashing）**：缓存不断进行驱逐和加载有用数据，导致系统性能反而下降的现象
- **最终一致性（Eventual Consistency）**：缓存数据与数据库（真实数据源）之间存在的暂时不一致状态
- **写入策略（Write Policies）**：包括Write-through（写穿）、Write-back（写回）、Write-around（绕写）三种
- **置换策略（Replacement Policies）**：包括LRU（最近最少使用）、LFU（最不经常使用）、分段LRU等

## 关键语录

> "The whole idea behind caching is reducing repeatable work through storage. Instead of doing the same computation again and again, you store it in local memory, give it back as a response."

> "Usually caches are much faster to query than a database because caches are closer to your system."

> "The problem is eventual consistency. If you have a copy of data then the copy has to be updated along with the original source of truth."

> "Concluding this introduction to caching — basically they save time, but the caching policy matters and the placement of the cache matters. Depending on your system, you need to make the right choices."
