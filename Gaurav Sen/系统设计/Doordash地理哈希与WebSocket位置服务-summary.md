# System Design of Doordash: Geo-Hashing and WebSockets for Location Based Services
**视频ID**: iRhSAR3ldTw
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=iRhSAR3ldTw

## 内容概要

这是一个 Gaurav Sen 与 Jordan（@jordanhasnolife5163）联合录制的 Doordash 系统设计面试题详解视频。Doordash 是美国的外卖配送平台，类似于印度的 Swiggy 和 Zomato。其核心业务逻辑是：用户从餐厅下单，系统匹配附近的外卖员（Dahsers）去取餐并配送到用户手中。视频详细讨论了如何利用 Geo-Hashing（地理哈希）算法对地理位置进行分片存储，以及如何使用 WebSocket/WebRTC 等技术实现司机位置的实时追踪。两人通过模拟系统设计面试的形式，从功能需求分析、容量估算、API 设计、数据存储选型、Geo-Hashing 原理、一致性哈希等多个维度完整推导出了一个外卖配送平台的核心架构。

## 核心观点

- **匹配优化的关键洞察**：餐厅到用户之间的距离对所有订单都是相同的（常数），因此系统只需要优化外卖员到餐厅这段距离。通过 Geo-Hashing 快速找到距离餐厅最近的外卖员是整个系统的核心问题
- **Geo-Hashing 的递归分片原理**：Geo-Hashing 将二维地理空间递归划分为更小的矩形区块，每个区块用一个哈希前缀表示（如 qr42 → qr42a、qr42b）。外层大区块的哈希是内层小区块的前缀，这使得区块在数据库中按 B-Tree 或 Sorted Set 排序时，相邻区域自然聚集在一起，支持高效的范围查询和二分搜索
- **边界邻近查询的处理**：Geo-Hashing 在边界处的点可能属于相邻区块。解决方案是同时查询目标区块及其相邻的 9 个区块（3×3 矩阵），只要每个区块的面积大于你需要查询的半径，就能保证不漏掉任何邻近点
- **Redis Sorted Set 实现地理索引**：在 Redis 中使用 GeoHash 命令将餐厅的经纬度转换为 GeoHash 并存储在 Sorted Set 中，通过 ZRANGEBYSCORE 等命令可以高效地执行邻近搜索
- **用户数据 vs 地理数据的存储分离**：用户表使用 MySQL（单主复制）存储账户信息；而地理位置数据需要频繁的读/写和范围查询，使用 Redis Sorted Set 进行内存存储以保证低延迟
- **容量估算**：10M 日活用户，每天 10M 订单，500K 外卖员。每个用户存储几百字节的用户信息，用户表约 5GB 存储空间
- **WebRTC 用于实时追踪的讨论**：Jordan 提出了使用 WebRTC 直接在用户和司机之间建立 P2P 连接来追踪位置的想法，但 Gaurav 认为对于外卖追踪场景这是过度工程化（overkill）的解决方案，因为不需要那么高的实时性
- **推送 vs 拉取的权衡**：外卖员位置更新可以由司机 APP 推送（Push）到服务器，也可以由用户 APP 定期拉取（Pull）。推送模式使用 WebSocket 或 SSE 实现，延迟更低但复杂度更高

## 关键术语

- **Geo-Hashing（地理哈希）**：将经纬度坐标转换为字符串哈希值的算法，递归划分地理空间为网格，每个网格有唯一的前缀编码，相邻区域在前缀上具有公共前缀
- **Dasher（外卖员）**：Doordash 平台对配送司机的称呼
- **Geo-Sharded Database（地理分片数据库）**：按地理位置对数据进行分区存储的数据库，每个分区只负责特定地理区域内的数据
- **Redis Sorted Set（Redis 有序集合）**：Redis 的数据结构，按分数排序存储元素，用于实现地理索引
- **WebSocket**：一种双向实时通信协议，适用于需要服务器和客户端持续交换数据的场景
- **SSE（Server-Sent Events）**：服务器推送事件的技术，客户端可以接收服务器发送的事件流
- **WebRTC（Web Real-Time Communication）**：点对点实时通信技术，适合低延迟场景但实现复杂度高
- **一致性哈希（Consistent Hashing）**：用于数据分片的算法，节点加入/离开时只影响邻近节点，减少数据迁移
- **ACID Transactions**：原子性、一致性、隔离性、持久性的数据库事务保证
- **LSM Architecture（Log-Structured Merge Tree）**： Cassandra 使用的数据结构，适合写入密集型场景
- **Zookeeper/etcd**：分布式协调服务，用于 Leader 选举和故障转移

## 关键语录

> "the distance from the restaurant to the customer is going to be constant so we just want to find someone nearby"

> "every single inner box is the outer box plus one character using a typical index of a database like a B-Tree where you're able to sort between two ranges of keys means that between the key qr42 and the key qr43 I know that all of the locations within that bigger bounding box are going to be located there"

> "because databases are specifically purposed such that when keys are sorted you can quickly find things"

> "the point is is that you would go ahead and call this service to get the geohash for a corresponding lat long and that way you can put each restaurant in the proper partition indexed by that geohash"

## 系统架构总结

### 核心功能需求

1. **用户下单**：用户选择餐厅和菜品，提交订单（包含餐厅 ID、用户地址等）
2. **匹配外卖员**：找到距离餐厅最近的外卖员来承接配送任务
3. **实时位置追踪**：用户能看到外卖员位置，外卖员能看到用户位置

### 容量估算

- **日活用户**：10M
- **每日订单**：10M（人均每天 1 单）
- **外卖员数量**：500K（假设每个外卖员每天完成 20 单）
- **用户表存储**：~5GB（每用户几百字节）

### API 端点

- **POST /createAccount**：创建用户账户
- **POST /placeOrder**：下单，包含餐厅 ID、用户坐标等信息
- **WebSocket / SSE**：实时推送司机位置给用户

### 数据库选型

- **MySQL（单主复制）**：存储用户账户信息，支持 ACID 事务，便于未来扩展支付功能
- **Redis Sorted Set（地理索引）**：存储餐厅和外卖员的地理位置，支持高效的邻近搜索
- **可选用 Cassandra**：如果使用 NoSQL，LSM 架构 + Masterless 复制能提供更快的写入性能

### Geo-Hashing 工作流程

1. **餐厅入驻**：获取餐厅的经纬度坐标
2. **坐标转哈希**：调用 GeoHash 服务将经纬度转换为 GeoHash 字符串
3. **索引存储**：将餐厅信息按 GeoHash 前缀存入 Redis Sorted Set
4. **邻近搜索**：当有新订单时，用餐厅坐标搜索附近的外卖员
   - 将用户坐标转换为 GeoHash
   - 在 Redis 中执行范围查询（同时查询周边 9 个区块）
   - 按距离排序返回结果
   - 选择最近的空闲外卖员接单

### 实时位置追踪方案

- **方案一（推荐）**：WebSocket 或 SSE，由服务器作为中介转发位置更新
- **方案二（不推荐）**：WebRTC P2P 直连，对于外卖追踪场景过于复杂，属于 Overkill

### 一致性哈希

当系统需要水平扩展时，使用 Consistent Hashing 确保新节点加入/离开时只影响邻近节点，避免大量数据迁移
