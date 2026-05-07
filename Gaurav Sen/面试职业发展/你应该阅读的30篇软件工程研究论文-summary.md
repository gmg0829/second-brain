# 30 [Software Engineering] research papers you should read

**视频ID**: kVP1qM9zgaA
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=kVP1qM9zgaA

## 内容概要

本视频是 Gaurav Sen 在阅读了约100篇软件工程领域的白皮书后，筛选出的最值得阅读的30篇论文排名。这些论文大多来自 Google 和 Meta（Facebook），涵盖了分布式系统、数据存储、数据分析、缓存、机器学习等核心技术领域。视频按照重要性从低到高排序，每篇论文都给出了简要介绍和推荐理由。

排名第30位的是 "Scalability at what COST"，这是一篇关于扩展性的论文，挑战了分布式系统的一些常见假设，指出许多图算法在单机上的性能实际上优于分布式环境，是一篇适合入门的好论文。第29位是 Google 的"静默数据损坏检测"论文，讨论硬件错误检测。第28位是 Facebook 的 Prophet 预测系统，探讨如何对数百万级指标进行实时异常检测。第27位是 Google 的 Napa 数据仓库分析解决方案。第26位是 Facebook 的 Cubrick OLAP 分析处理系统。

第25位是 Facebook 的近实时服务器监控和根因分析论文——当服务器出现问题时，如何快速检测并追溯根本原因（如著名的"五个为什么"分析方法）。第24位是 Presto，Facebook 的"万能SQL引擎"，可以在各种不同数据存储上运行 SQL 查询。第23位是 Apple 的 Foundation DB，这是一个完美支持事务的 NoSQL 数据库，属于"NewSQL"范畴，其测试方法非常创新。第22位是 Google 的 F1 Lightning，融合了事务处理和分析处理的混合数据库。

第21位是 LinkedIn 唯一入选的论文，讨论如何在 LinkedIn 高效计算社交图谱中的连接距离，通过缓存策略优化避免跨机器通信。第20位是 TensorFlow，引用数千次的经典论文。第19位是"The Monolith Strikes Back"，指出单体架构并非一无是处，有时候单体比微服务更合适，与第30篇论文形成呼应。第18位是 YouTube 的 HALP CDN 优化系统，讨论如何通过机器学习优化 ISP 级别的缓存策略。第17位是 Google 的 Monarch 时序内存数据库，即使在 Spanner 等系统故障时仍能独立响应查询。第16位是 Google 的 Dapper 分布式追踪系统，用于追踪请求在微服务间的调用链路。第15位是 Facebook 的 GorillaDB 高性能时序内存数据库。第14位是 Google 的 Zanzibar 权限认证系统，包含了请求合并、请求对冲等大量实用优化技术。第13位是 Facebook 的 Memcache 缓存系统，涵盖了从初创到成熟公司全周期的缓存演进，被 Twitter、Uber 等公司广泛借鉴。第12位是 SIEVE 缓存淘汰算法，比 LRU 更简单但更高效，结合了 LRU 和 LFU 的优点。第11位是 Twitter 数百个内存缓存的分析研究，揭示了缓存性能与过期时间、对象大小、写入频率等因素的关系，超出 eviction policy 本身。第10位是 Amazon 的 Firecracker 虚拟化技术，是 Lambda 无服务器计算的基础。第9位是 Google 的 Spanner 分布式数据库，涉及分布式一致性这一困难主题。

前三名分别是：第8位 Google 的 Dremel（大数据交互式分析的基础，启发了 Apache Impala 和 Google BigQuery）、第7位 Google File System（可能是世界上最受欢迎的软件工程论文，开启了 nosql 时代）、第6位 BigTable（在 GFS 基础上构建的 NoSQL 存储）。第5位是 Meta 的 Hive 数据仓库解决方案。第4位是 Google 的 Pregel 图处理系统，用于 PageRank 等图算法。第3位是 Meta 的 TAO（Associations and Objects），Facebook 级别的图数据库，在 Memcache 基础上构建。

前两名论文都以"易读但见解深刻"著称：第2位是 Google 关于 CDN 性能优化的论文，揭示了连接 CDN 并不等于快速——排队延迟和物理路径同样重要。第1位是 Google 的 Backend Subsetting 负载均衡算法，用于 Google 的 Autopilot 自动驾驶负载均衡系统，在 Google 规模下优化路由算法可节省数百万美元。

## 核心观点

- 这30篇论文中大多数来自 Google 和 Meta（Facebook），反映了顶级科技公司在软件工程领域的最佳实践
- 数据存储和数据分析类论文占比最高，这反映当前行业对数据基础设施的重视程度
- 机器学习在软件工程中最实用的落地场景是异常检测（Anomaly Detection），如 Prometheus、Monarch 等系统
- 缓存系统的优化远比想象中复杂，涉及 eviction policy、过期策略、对象大小、写入频率等多维度因素
- 单体架构（Monolith）在某些场景下优于微服务，不要为了微服务而微服务
- 论文排名靠后的主要原因是阅读难度较低或知识已被广泛普及，并非价值低
- Spanner 等分布式一致性论文虽然难度高，但对于理解现代分布式系统至关重要

## 关键语录

> "Despite all of the years, decades of cache optimization researchers have not given up and have discovered simple optimizations which tend to outperform really complex machine learning techniques."

> "When you're thinking of serverless, when you're thinking of Lambda in AWS, you want to run your code without assigning a server to it — how does that work for Amazon?"

> "Optimizing their load balancing algorithms can save them millions of dollars."

> "I think as software engineers it's really worth your time" to read these papers.
