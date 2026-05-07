# System Design of a Delivery System like Zomato

**视频ID**: nHh3DnjnPig
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=nHh3DnjnPig

## 内容概要

本视频由Gaurav Sen与Keerti Purswani合作完成，深入分析了外卖/配送系统（如Zomato、Swiggy、亚马逊配送）的系统设计。视频聚焦于两个核心问题：配送员匹配（Matching）和配送追踪（Tracking）。当餐厅接受订单后，系统需要完成两件事：一是为订单匹配合适的配送员，二是实时追踪配送员位置。

**容量估算**：以孟买为例，每天处理约100万单配送，假设每位配送员每天能完成10单，则每个城市需要约10万名（1 lakh）配送员。

**匹配算法**：匹配配送员时需要考虑多个因素：配送时间（ETA）、配送员评分、公平性（避免某些配送员过度疲劳而其他人在闲置）。系统通过内存缓存存储所有活跃配送员的数据（包括位置、评分、当日已完成配送数），而不是每次查询都访问数据库。匹配时，系统会按照地理围栏（Geo-fence）筛选出附近100-150名配送员，然后分批次通知（如先通知10名），一旦有人接受即确认分配，否则继续通知下一批次。

**追踪系统**：追踪的核心挑战在于配送员位置每2-3秒就需要更新一次。传统轮询（Polling）方式需要反复建立连接，效率低下。视频推荐使用WebSocket维持持久连接：配送员与骑手管理服务（Rider Management Service）建立持久连接，整个班次期间连接保持活跃，位置更新通过同一连接推送，无需反复建立HTTP连接。

**整体架构**：用户端（客户端）通过API获取骑手位置；骑手管理服务负责维护所有骑手的实时位置和状态；消息通知服务负责向候选骑手发送配送通知；数据库层采用SQL存储骑手信息、评分和订单数据，但匹配逻辑全部在内存中完成以保证低延迟。

## 核心观点

- 配送系统的核心挑战是匹配（匹配哪个配送员）和追踪（实时位置更新）
- 匹配需要综合考虑ETA、骑手评分、公平性和地理位置
- 内存缓存是匹配服务的关键：避免每次匹配都查询数据库
- 地理围栏（Geo-fence）将城市划分为小区域，每个区域维护一个骑手池
- WebSocket适合追踪场景：位置高频更新，持久连接比反复轮询更高效
- 数据库采用范式化设计分离骑手ID、位置、评分、订单等数据

## 关键术语

- **骑手管理服务（Rider Management Service）**：负责骑手的实时位置更新和持久连接维护
- **地理围栏（Geo-fence）**：基于地理区域划分的管理单元，每个围栏维护其范围内的活跃骑手
- **WebSocket**：双向持久通信协议，适合高频位置更新场景
- **匹配算法（Matching Algorithm）**：综合ETA、评分、公平性等因素选择最佳配送员
- **ETA（Estimated Time of Arrival）**：预计到达时间
- **长轮询（Long Polling）**：客户端发起请求后服务器保持连接直到有新数据，与WebSocket相比开销更大
- **Lakh**：印度计数单位，1 lakh = 10万

## 关键语录

> "Matching is about time — the most important factor is how much time is it going to take for the delivery partner to get food from the restaurant to your house."

> "We should do all matching in memory. If possible, we should just pull up all the riders who are active and keep them all in memory, and whenever a person asks for a delivery executive to a restaurant, we will see in our memory, run through lists, and then pick the best."

> "WebSocket is the best bet — because it is every 2-3 seconds, you can have a persistent connection and you can keep sending the request on over the same persistent connection. You can save up instead of building the connection again and again."
