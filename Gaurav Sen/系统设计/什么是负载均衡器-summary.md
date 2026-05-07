# Software Systems: What is a load balancer?

**视频ID**: NwR9Lq8qn8c
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=NwR9Lq8qn8c

## 内容概要

本视频是Gaurav Sen系统设计系列的开篇，介绍了负载均衡（Load Balancer）的基本概念。负载均衡的核心思想是将工作负载均匀地分配到一组资源（通常是服务器）上，以确保没有任何单一资源因负载过重而"过热"崩溃。视频从软件工程师编写API并对外提供服务的场景出发，解释了为什么需要负载均衡：当用户量从单个客户端增长到全球规模时，单台计算机无法承受无限增长的连接数、内存和IO压力。

视频首先介绍了垂直扩展（Scale Up）的概念——即购买更强大的计算机来替代现有服务器。然而，垂直扩展存在明显的天花板：即使是超级计算机也有性能上限，对于Google、Meta或支付网关这类大规模应用，单台超级计算机无法满足需求。因此，水平扩展（Scale Out）成为必然选择——通过增加更多计算机来分散负载。但水平扩展带来了新的挑战：如何决定将请求路由到哪台服务器？这正是负载均衡器需要解决的问题。

负载均衡器作为一个专门的路由组件，位于客户端和服务器之间（或服务器内部各层之间），其核心功能是为每个传入请求决定最终的目标服务器。好的负载均衡策略能带来两大好处：一是故障隔离，当某台计算机故障时，其影响范围（blast radius）有限，最多损失一半负载；二是资源高效利用，避免出现某些服务器排队拥堵而其他服务器闲置浪费的情况。

## 核心观点

- 垂直扩展（购买更大计算机）有性能上限，不适合超大规模应用
- 水平扩展（增加更多计算机）需要配合负载均衡才能高效工作
- 负载均衡的核心目标：均匀分配负载、降低故障影响范围、提高资源利用率
- 负载均衡不仅存在于客户端与服务器之间，也存在于服务器内部各层之间
- 实际生产环境通常采用混合策略，在不同层级使用不同的负载均衡算法

## 关键术语

- **负载均衡（Load Balancing）**：将工作负载均匀分配到多个资源上的技术
- **垂直扩展（Vertical Scaling/Scale Up）**：通过升级单机硬件（更多CPU、内存、存储）来提升容量
- **水平扩展（Horizontal Scaling/Scale Out）**：通过增加机器数量来提升整体容量
- **热点（Hot）**：某台服务器因负载过重导致请求排队、响应时间增加的状态
- **爆炸半径（Blast Radius）**：系统故障影响的范围大小
- **Round Robin（轮询算法）**：按顺序将请求依次分配给每台服务器的简单算法
- **Geo-distributed Load Balancing（地理分布负载均衡）**：根据用户地理位置将请求路由到最近的数据中心
- **Least Connections（最少连接算法）**：将请求发送到当前连接数最少的服务器

## 关键语录

> "If you have a computer which fails then the blast radius is low. The worst case computer crash is not very bad. Okay, you lose at most half the load."

> "If you have a lot of requests going to a single computer, that computer is considered hot because there's a lot of requests which get queued up, that queue wait time increases, while in the rest of the computers it's green, there's nothing happening there."

> "Load balancing is a fundamental concept of computer science. It comes up at every layer of the distributed system."
