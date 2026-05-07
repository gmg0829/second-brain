# System Design: Live Streaming Events like ESPN and Hotstar

**视频ID**: yKgWAHqmAwk
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=yKgWAHqmAwk

## 内容概要

本视频讲解了类似 ESPN 和 Disney Hotstar 这类直播平台的核心系统设计。与 Netflix 等点播平台不同，直播系统必须在视频正在传输的同时进行实时处理，无法等到完整视频上传完毕后再开始转码工作。视频内容围绕一个完整的直播视频流处理流水线展开，从协议选择、传输、转码任务分发、分布式存储到最终向终端用户分发，覆盖了直播系统中最关键的技术决策点。

整个架构的核心挑战在于如何在保证视频质量的前提下实现实时处理。与点播场景不同，直播流的每一个数据包都至关重要——如果在源头就出现质量下降，这个缺陷会一路放大到用户端，最终呈现为极差的观看体验。因此直播系统必须在"速度"和"可靠性"之间找到平衡点，而这直接影响了传输协议的选择。

## 核心观点

- 直播场景必须采用流式处理而非批量处理，视频流必须边传输边处理
- RTMP 协议（基于 TCP）是直播视频采集端的标准协议，因为它提供可靠的传输保证，不会丢包，这对于保持源视频高质量至关重要
- 原始视频流需要进行多重备份存储以防止灾难性数据丢失
- 转换服务将单一的高质量源视频转码为多种分辨率（720p、360p 等）和多种格式（MPEG-DASH、HLS），以适配形形色色的客户端设备
- 转码任务数量庞大——每种分辨率和每种编码格式的组合都对应一个独立任务，可能产生数百个并行任务
- 转码任务通过消息队列解耦，转码服务发布任务到队列，worker 节点自主拉取并执行任务，完成后将结果持久化到分布式文件系统
- 任务完成后 worker 发布事件通知，而不是直接在队列中传输视频数据，因为视频体积庞大不适合放在消息队列中
- 这种发布-订阅模式实现了生产端（转码服务）和消费端（worker 集群）的完全解耦，两者可各自按独立节奏运行

## 关键术语

- **RTMP (Real-Time Messaging Protocol)**：基于 TCP 的流媒体传输协议，被 Facebook Live、YouTube Live 等平台广泛采用，优势是可靠无丢包，劣势是比 UDP 慢
- **MPEG-DASH**：一种自适应比特率流媒体协议，允许客户端根据网络状况动态调整视频质量
- **HLS (HTTP Live Streaming)**：苹果推出的 HTTP 直播流协议，同样支持多码率自适应
- **转码 (Transcoding)**：将视频从一种编码格式或分辨率转换为另一种，本质上是 CPU 密集型的计算任务
- **消息队列 (Message Queue)**：实现服务间解耦和异步通信的中间件，直播场景中用于分发转码任务
- **分布式文件系统 (Distributed File System)**：用于存储海量视频数据的可扩展存储系统，如 HDFS 或对象存储
- **发布-订阅模式 (Pub/Sub)**：一种消息传递模式，发布者不直接调用订阅者，而是通过主题/队列间接通信，实现时间解耦

## 关键语录

> "you can't wait for the whole video to end and then you know you have it in one place and then start converting like in netflix you can afford to do that you can actually ask the uploaders to upload the full video before you start processing over here it's not a possibility so you have to take it as a stream"

> "tcp is usually slower it gives you reliability it gives you no data loss it gives you ordering and that's the reason why it is slow however this video is super important you can't actually afford to lose some packets over here"

> "it's much better would be to actually persist in some file storage which is distributed file storage the results of your task once you're done you just publish an event that hey i'm done so subscribers who are going to be actually pulling these videos and then feeding it to the end users can pull from this queue"
