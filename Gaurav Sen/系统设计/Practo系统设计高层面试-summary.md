# High Level Design Interview: Practo System Design

**视频ID**: F3ZL3k6n1UY
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=F3ZL3k6n1UY

## 内容概要

本视频是一场完整的高层系统设计模拟面试，由 Gaurav Sen 主持，候选人 Shreyansh Goyal（Tekion 公司 SDE2）受邀设计 Practo——一款类似印度"挂号网"的在线医疗咨询应用。面试全程约40分钟，涵盖了 Practo 三大核心功能模块的设计：预约医生面诊、在线视频问诊、以及药品配送。整场面试严格按照系统设计面试的标准流程推进：先明确功能需求和非功能需求，再做容量估算，然后深入各个模块的数据库选型、API 设计和微服务拆分。

面试中 Gaurav 扮演面试官角色，不断追问和简化需求，引导候选人深入技术细节。Shreyansh 在设计中展现了扎实的系统设计功底：在药品配送模块正确选择了 Google S2 库进行地理位置搜索；在视频问诊模块选择了 WebRTC 协议而非流媒体协议；在即时预约匹配场景中巧妙使用了消息队列和发布-订阅模式。面试还讨论了分库分表、日志系统（ELK Stack）和 slot locking 等高级话题。

## 核心观点

- **功能需求**三大模块：预约医生面诊（固定时段预约）、在线视频问诊（即时匹配医生）、药品配送（上传处方购药）
- **非功能需求**：高可用性优先、最终一致性可接受（同一地区用户最终看到相同数据）、容错性（故障时系统继续运行）、低延迟
- **容量估算**：假设印度10亿人口中约1000万日活用户，其中1%每天成功预约面诊（约10K人次），50%购买药品，另有无需问诊直接购药的用户
- **药品配送设计**：使用 Google S2 库处理地理位置搜索（而非传统的四叉树或希尔伯特曲线自建方案），将2D经纬度坐标映射为1D值以便高效范围查询；配送门店和用户的距离通过欧几里得距离计算
- **配送调度优化**：配送人员自行拉取附近门店的配送任务（将匹配问题卸载给配送员），而非系统主动推送，减少实时追踪的复杂度
- **视频问诊技术选型**：采用 WebRTC 协议（点对点实时通信），而非 RTMP 等流媒体协议，因为问诊是双向小范围通信而非广播式直播
- **日志与历史记录**：使用 ELK Stack（Elasticsearch、Logstash、Kibana）存储所有用户事件日志，可用于调试和生成用户历史记录；通过 session ID 关联用户行为日志
- **即时预约匹配（Instant Consultation）**：用户在30秒或1分钟内发起问诊请求，系统通过消息队列发布需求，在线的且符合条件的医生接收通知后响应，匹配成功后建立视频房间
- **预约 Slot Locking**：多人同时抢订同一时段时需要锁机制，类似 BookMyShow 电影票预订但复杂度更低（用户量级和座位数相对较少）
- **数据库选型**：用户/医生结构化数据使用 RDBMS（如 MySQL）；药品搜索使用 Elasticsearch 实现全文搜索和分片

## 关键术语

- **S2 Library（Google S2 地理空间库）**：将地球表面编码为64位整数的库，支持高效的范围查询和最近邻搜索，比传统四叉树更适合处理全球规模的地理位置数据
- **Slot Locking（时段锁定）**：防止多人同时抢订同一预约时段的并发控制机制，确保一个时段只能被一个用户成功预订
- **WebRTC（Web Real-Time Communication）**：浏览器原生支持的点对点实时通信协议，适合视频通话场景，开销远低于 RTMP
- **ELK Stack**：Elasticsearch + Logstash + Kibana 的日志采集、存储、可视化组合，是分布式系统日志处理的行业标准方案
- **Geo-hashing（地理哈希）**：将经纬度编码为字符串的技术，使得地理位置可以按前缀进行范围查询
- **RDBMS vs NoSQL**：结构化关系数据（用户档案、医生排班）用 RDBMS；地理位置数据用专门的空间索引；药品搜索用 Elasticsearch
- **发布-订阅模式（Pub/Sub）**：在线医生监听消息队列，患者发起请求后消息推送给所有在线医生，先响应者获得匹配

## 关键语录

> "so basically for the location based database that I can think of is like the locations are actually a 2D claim like we had the locations in 2D claim basically I think here I have to let me draw so I'm thinking of a Port tree as of now we are actually having a 2D plane and the locations are in 2D plane and pod tree would be best for having the 2D plane"

> "if you book an appointment then yes you have to tell that I want to book an appointment from this time to this time but there are certain things which are just I have an Ailment, I want to be looked at right now Consultancy happens so that is what I'm looking at"

> "booking appointments with doctors I think is fine Basic idea you're almost setting a calendar invite you're basically making sure that 30 minutes before you send a reminder you tell the doctor that hey your calendar is booked"

> "it's a little like bookmyshow it's a little less complex because obviously you have lesser users also trying to book the same slot plus you have lesser seats and all that"
