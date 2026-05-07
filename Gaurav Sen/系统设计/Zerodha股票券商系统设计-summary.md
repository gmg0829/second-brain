# Zerodha Stock Broker System Design with Keerti Purswani
**视频ID**: DH2-vDPFiE4
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=DH2-vDPFiE4

## 内容概要

Zerodha 是印度最大的股票券商应用之一，在用户与证券交易所（NSE 印度国家证券交易所、BSE 孟买证券交易所）之间充当中介角色。Zerodha 不匹配买卖双方，只将订单提交给交易所，由交易所完成撮合。视频详细讨论了这个股票经纪系统的高层设计，包括核心服务划分、实时价格更新机制、订单执行流程、缓存策略、数据库选型以及容量估算等关键系统设计问题。Gaurav Sen 与 Keerti Purswani 两位系统设计专家通过白板画图的方式，完整推导出了一个可运行的股票经纪系统架构。

## 核心观点

- **股票券商的中介本质**：Zerodha 只是一个中介，将用户订单提交给交易所（NSE/BSE），由交易所完成撮合，不需要自己匹配买卖双方
- **风险验证服务的重要性**：验证服务（Validation Service）是整个系统中极其关键的一环。Gaurav 举了 Facebook IPO 的案例——某公司因为没有验证服务、订单重试机制导致银行损失巨大，整个 IPO 失败。验证服务需要在 10-20 纳秒内完成资金和持仓检查
- **订单执行与订单跟踪分离**：将 Order Executor（与交易所通信）和 Order Tracker（轮询交易所获取订单状态）分开，使得核心的下单功能不会因为数据库更新延迟而受影响
- **服务边界划分的工程考量**：服务拆分不是越多越好，需要权衡测试复杂度、部署独立性和业务耦合度。视频中讨论了"Order Manager + Validation Service + Order Executor"是否应该合并的问题，最终认为按职责分离更安全
- **写穿透缓存策略**：Zerodha 使用 Redis 作为写穿透缓存（Write-Through Cache），先用 Redis 响应查询，Redis 失败才回退到数据库，保证低延迟
- **一致性哈希实现水平扩展**：使用 Redis Cluster 的 Consistent Hashing 算法来实现缓存分片，便于扩缩容
- **事件驱动架构的延迟权衡**：对于 Watchlist 这种读多写少但需要实时更新的场景，虽然事件驱动架构会增加延迟，但因为交易员决策周期是秒级而非毫秒级，最终一致性（Eventual Consistency）完全可以接受
- **批量推送优化带宽**：Watchlist 服务需要将多个股票的更新合并成一次推送，避免对手机用户造成带宽压力

## 关键术语

- **Market Order（市价单）**：按当前市场价格立即成交的订单，成交速度快
- **Limit Order（限价单）**：设定目标价格的订单，只有价格达到触发条件时才执行，可能需要数天
- **GTT（Good Till Triggered）**：一种长期有效的触发订单，市场关闭后仍可执行
- **Order Book（订单簿）**：显示订单级别信息，一个订单可能拆分为多笔交易
- **Trade Book（交易记录）**：显示交易级别信息，反映实际成交情况
- **Market Depth（市场深度）**：显示某股票所有挂单的数量和价格，帮助用户决定买入/卖出时机
- **Watchlist（自选股）**：用户关注的股票列表，打开 APP 首先看到的界面
- **Price Tracker（价格追踪服务）**：从交易所实时获取所有股票价格的服务，通过 WebSocket 维持长连接
- **Order Tracker（订单跟踪服务）**：持续轮询交易所获取_pending 订单状态的服务
- **Validation Service（验证服务）**：检查用户是否有足够资金或股票的服务，也包括 KYC 等合规检查
- **Write-Through Cache（写穿透缓存）**：写入时同时更新缓存和数据库，保证强一致性
- **Consistent Hashing（一致性哈希）**：Redis Cluster 使用的分片算法，便于水平扩展
- **NSE/BSE**：印度国家证券交易所和孟买证券交易所

## 关键语录

> "entire banks with hundreds of employees are sometimes gone overnight because of this... without any warning"

> "validation service must be extremely fast also people interested that was like 2012 or 2014. and that's when validation services became a thing"

> "the responsibility of this particular service is going to be to place the order to The Exchange and in return of that we are going to get a list of transactions"

> "I don't think we should be risking the service going down because of some other reasons like DB or cash or anything else and there should be a service that is placing the orders to The Exchange"

> "for watchlist, eventual consistency should be good enough here because by the time you are getting the data it's too old, that takes many seconds so adding a few more milliseconds is not going to hurt"

> "traders do make decisions in terms of seconds but not milliseconds so if you are a millisecond person you are the algorithm"

## 系统架构总结

### 核心服务（6个）

1. **Price Tracker（价格追踪服务）**：通过 WebSocket 与交易所保持长连接，接收实时价格更新（10K 股票 × 50 字节/更新），通过消息队列分发给所有订阅者（Watchlist、Portfolio、Order Executor 等）
2. **Order Manager（订单管理服务）**：接收用户下单请求（买入/卖出、股票名称、数量、价格、订单类型）
3. **Validation Service（验证服务）**：检查用户资金/持仓是否足够、KYC 合规检查，是整个系统的安全闸门
4. **Order Executor（订单执行服务）**：负责与交易所通信提交订单，获取交易所返回的交易结果（可能市价单立即成交，限价单需要等待触发）
5. **Order Tracker（订单跟踪服务）**：维护_pending 订单数据库，持续轮询交易所获取未完成订单的状态，订单完成后更新 Trade Book 和 Portfolio，然后从_pending 数据库删除
6. **Portfolio Service（投资组合服务）**：管理用户的持仓和资金余额

### 数据库选型

- **SQL 数据库（MySQL）**：用于 Order Book、Trade Book、Portfolio 等事务性数据，需要强一致性支持
- **Redis 缓存**：用于 Watchlist、Portfolio 查询的加速，采用写穿透策略，Redis 集群使用一致性哈希分片
- **NoSQL（可选）**：Watchlist 本身数据结构简单（Key-Value），如果追求极致性能可以用 NoSQL 替代 SQL

### 容量估算

- **用户规模**：1 百万用户
- **Watchlist 查询**：每天数百万次请求，主要集中在开盘时间（9:30-15:30）
- **Price Tracker**：10K 只股票，每只 50 字节，每次更新约 500KB 消息体
- **水平扩展**：按用户 ID 奇偶分片到不同服务器

### 通信协议

- **Price Tracker ↔ Exchange**：WebSocket 长连接（需要双向实时通信）
- **内部服务间通信**：TCP（考虑重试机制）
- **Watchlist 实时更新**：可用事件驱动 + 消息队列，也可用 TCP 直连（延迟优先场景）
- **UDP 可能性**：对于纯价格展示场景可用 UDP（不关心丢包和顺序）

### 订单提交流程

1. 用户通过 APP 提交订单 → Order Manager
2. Order Manager → Validation Service（检查资金/持仓）
3. Validation → User Management Service（获取用户信息）
4. 验证通过 → Order Executor
5. Order Executor → Exchange（提交订单）
6. Exchange 返回 → Order Tracker（进入_pending 状态）
7. Order Tracker 轮询 → Exchange（获取状态更新）
8. 订单完成 → 更新 Trade Book、Portfolio
