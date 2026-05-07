# Zerodha Stock Broker System Design with @KeertiPurswani
**视频ID**: DH2-vDPFiE4
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=DH2-vDPFiE4
## 内容概要
本期视频是一场模拟系统设计面试，由 Gaurav Sen 与 Keerti Purswani 共同完成，主题是设计 Zerodha 股票经纪应用的高层架构。Zerodha 是印度最大的折扣经纪商之一，连接散户投资者与国家证券交易所（NSE）和孟买证券交易所（BSE）。视频从产品需求分析开始，逐步深入到技术架构设计，涵盖多个关键系统设计概念。

首先讨论了应用的核心功能：自选股列表、市场深度查看、股票行情分析、买卖股票、投资组合管理，以及订单簿和交易簿的维护。然后进入系统设计阶段，分析了市价单（Market Order）和限价单（Limit Order）的区别与处理逻辑，讨论了实时股价更新的高并发需求、WebSocket 推送 vs 轮询的选型、容量估算，以及服务边界的划分策略。视频还探讨了消息队列在订单处理中的作用、全局缓存的设计，以及 TCP 与 UDP 在行情数据传输中的取舍。

## 核心观点
- 股票经纪系统需要处理实时行情推送，WebSocket 是连接客户端与服务器的主流方案，需考虑容量规划以应对高并发
- 订单管理系统需保证高可靠性和低延迟，限价单需要与交易所系统深度集成，市价单则相对简单
- 消息队列（如 Kafka）在解耦订单处理流程中发挥关键作用，但引入消息队列会增加系统复杂度和成本
- 交易所为了公平性，会确保所有经纪商的网络线缆长度相同，以最小化行情延迟——这是一个真实的有趣细节
- 监听列表（Watchlist）的设计需考虑数据一致性与更新延迟的取舍，通常采用最终一致性模型
- 系统边界划分（Service Boundary）应基于业务领域和团队职责，而非纯粹的技术分层

## 关键术语
- **Order Book（订单簿）**: 记录所有未成交订单的系统，包括价格、数量和订单类型
- **Trade Book（交易簿）**: 记录所有已成交交易的系统，与订单簿共同构成交易核心数据
- **Market Order（市价单）**: 以当前市场价格立即执行的订单，成交价格不确定
- **Limit Order（限价单）**: 指定价格的订单，只在价格达到指定值时执行
- **Market Depth（市场深度）**: 显示各价位上的买卖盘数量，帮助投资者了解市场供需
- **WebSocket**: 双向实时通信协议，适用于股票行情等低延迟推送场景
- **Message Queue（消息队列）**: 解耦服务异步通信的中间件，确保消息可靠传递
- **NSE/BSE**: 印度国家证券交易所和孟买证券交易所

## 关键语录
> "Exchanges strive for fairness by ensuring equal wire lengths for all brokers to minimize the latency of updates."

> "Market orders involve buying or selling at the current market price, while limit orders allow users to set a specific price at which we want to buy or sell stocks."

> "Message queues aren't free" — 引入消息队列虽然能解耦系统，但会带来额外的复杂性和运维成本。