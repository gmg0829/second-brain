     MySQL复制延迟终结者：AliSQL 高效AI诊断和四大内核级优化
==================================

原创 子堪 阿里云开发者 2026-03-25 08:30 浙江

> 原文地址: [https://mp.weixin.qq.com/s/5oCDtaIiHle-zXnoTzNoig](https://mp.weixin.qq.com/s/5oCDtaIiHle-zXnoTzNoig)

![](https://mmbiz.qpic.cn/mmbiz_jpg/Z6bicxIx5naJS3jH0GsPia2jMQpWuuYdvLdT74eHstYzm1yYxmas3LTHhYfbS5lPaREY75yMWFLTsibyEAnqcps6g/640?wx_fmt=jpeg&from=appmsg)

阿里妹导读

  

MySQL主从复制延迟严重损害实例可用性和只读实例时效性。AliSQL引入AI诊断能力，轻松定位延迟原因；针对线上最典型的四类场景，AliSQL 提供了内核级的优化，彻底消除复制延迟。

复制延迟问题

对于MySQL数据库来说，搭建主备架构增强可用性，搭建只读实例增强扩展性，都是刚需中的刚需；这二者都依赖于 MySQL 基于 Binlog 的逻辑复制。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1wA5E5z8uF4PVjEWoleVjPV35GuBtbTDRBDrWXEBWUsRBMlXte1NOb5VQPcK0kbKdL4nMhGicYZDNLVQztDCUTX4x0qRXVLrvU0/640?wx_fmt=png&from=appmsg)

在MySQL中，主库会以事务维度，将被修改的所有数据记录到 Binlog 中，并传输到从库；从库收到 Binlog 后，将修改应用到自己的表上。正常情况下，从主库提交事务到从库应用完成的时间差要很短，以保证从库的数据的时效性；但是在一些业务场景中，这个时间差可能拉长到分钟甚至小时级，严重影响从库数据时效，这就是复制延迟问题。

用 AliSQL，解决“复制延迟”界的“顽疾”

MySQL 复制延迟的成因很多，其中有些场景可以通过堆资源，改配置等方式扛过去；但有些“顽疾”场景，只能通过深度的内核优化来根除。在MySQL中，最典型，线上最常见的“顽疾”场景有以下四类：

1\. 大表 DDL

2\. 大事务

3\. 批量数据处理业务（例如低峰期进行的数据整理，导入，删除等）

4\. 小事务高并发业务（例如节假日或大促时的业务高峰期等）

我们在一个未开启复制延迟优化的AliSQL实例上，验证这四种业务场景下的复制延迟情况。

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1z3YIG51E9ntheibfzofeibR3QMUEb0g8ib6JiaSb0nHCNfyOG5PlLIXzMNChZA23tZduHXWtVkSNMAibNibZgs2driavP0v76McbskiaA/640?wx_fmt=png&from=appmsg)

如上图所示，依次执行一张大表的 optimize table；一个 500 万行的 insert 大事务；一个批量数据清理任务（用4个并发，每个sql 删除1万行数据）；一个小事务高并发的业务场景（sysbench 的 write\_only 脚本，512并发，9万TPS）。可以看到这四段测试都触发了只读实例的复制延迟。

用 RDS AI 助手来诊断这四段复制延迟，如下图所示。

 ![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1zBSXwJHrgV0Ky6k0biayGiaJ3z5icAD5gxdZiakULZPQLxS5zI3Fc4MPceKWexGMGmNB8FjyFAmJVHNS9MiclGtgkdnq3un9C0c3SU/640?wx_fmt=png&from=appmsg)![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1xkRPJckYMFwib8SypwFhHMOAtFfM9wkf1qG0vFcib0kibVBqGhoSvLPbP1gNjoIYEgxtazUzI7xWXmdS61nba3QnyFYIN9km6N9w/640?wx_fmt=png&from=appmsg)![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1x7icUic6EriaheARReVl901DicZ89nPycviajObek88AFgy0ARiaoeg8Z4jBuwznDJpKuKbcCNFExkMWfgu7v1PUx1a4XQ7VADFxOWM/640?wx_fmt=png&from=appmsg) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1xWtAdxEySvFeSYuBFia6SzFxFUcZrnIzWqKx5RjzrDicRebuF7FHOPWhCwItAHtox51w5MMPKNmyQWHDibQfGl4nDzlTG0V9wPLQ/640?wx_fmt=png&from=appmsg)

AI 助手查看了监控，解析binlog并结合实例进行分析，最终诊断出了四段延迟的根本原因，并给出了解决延迟问题的优化建议。

我们在 AliSQL 实例上，按AI助手的建议打开AliSQL的四项复制延迟优化（DDL实时复制，大事务实时复制，中等事务并行复制优化，小事务打包优化）。

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1zRqouEoYicDrnkRs4SNzeBTwDjIgNwwCJoj4KA5BkBEI346fiaiaibEMrC3E8atZmg3jYtShGUGxCZbiaoCMJVpiafibsN2Wh3UZIzlI/640?wx_fmt=png&from=appmsg)

再次测试这四个业务场景，如上图所示，优化开启后复制延迟消失。对比优化前后的CPU利用率图可以看到，大表DDL和大事务在从库上提早开始执行，避免了复制延迟；批量数据处理和高并发业务场景的CPU利用率都有提升，这是因为它们的复制并发度提高了，从库吞吐显著提升，避免了复制延迟。

抽丝剥茧，复制延迟的诊断与优化

上章提到的四种复制延迟问题，RDS AI 助手如何准确诊断出原因？AliSQL 内核又如何进行了优化？本章将说明四种延迟问题的成因，诊断和优化方法。

**大事务和DDL**

### 延迟原因

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1wC6E1AcekCO2xqLDYHg7n2ZqcFxLEAEggVsnSx4dSfeoiaiaw4Alrib4cBL2pyMz9IdMiaOzwwZRSLpQpRBawdaEmK0zCJgplyZ4E/640?wx_fmt=png&from=appmsg)

大事务和DDL是MySQL中最典型的复制延迟问题，其原理如上图所示。在MySQL中，大事务和DDL都是在提交时写binlog，随后才会被传输到从库并应用。因此，大事务和DDL在从库执行多久，就会产生多久的复制延迟。

### 诊断方法

大事务和DDL在从库执行期间，从库的复制延迟计算方法为`now - 主库提交时间`。大事务和DDL在主库提交时间是固定的，因此其复制延迟每秒一定增加1，复制延迟曲线一定是一条斜率为1的直线。

当复制延迟曲线的斜率为1时，延迟的原因大概率是大事务或DDL；这时，只需要解析延迟开始的时刻主库上的binlog，如果找到大事务或DDL，就能确定延迟的原因，找到导致延迟的具体业务。

### AliSQL 实时复制优化

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1yicydf0pyiaalukgYkfc2YtEOU3Dox46CR9FRu3bJMCiciaM1VNt0yqHE5FAMeviaeouuicUhjHW0TptIv6cpTRiclbyQ7c7mcy6AAT8/640?wx_fmt=png&from=appmsg)

为了解决大事务和DDL导致的复制延迟，AliSQL 引入了实时复制优化。如上图所示，将大事务和DDL的 binlog 内容在其执行期间就传输到从库，并实时的在从库执行，当大事务或DDL在主库提交时，只需通知从库一起提交，就可以做到零延迟；如果大事务或DDL在主库回滚，只需通知从库一起回滚，不影响主从复制。

通过这个优化，AliSQL彻底解决了大事务和DDL的复制延迟问题！

**小事务高并发业务**

### 延迟原因

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1wJkQ24Qvhwr5bQdDux2eVGr1hgJjOjboWQePLUTyoicdJ7yhFSiaUEHoDwpKhMroeRFqiaQgXECdUyvCYpx5OB6QMKqx3uGe0kw0/640?wx_fmt=png&from=appmsg)

很多业务在高峰期会以较高的并发度更新数据库，当主库业务的并发度高于从库应用的并发度时，就可能导致从库的事务吞吐不如主库，产生复制延迟。造成从库并发度不够的因素有哪些，我们按顺序来讲解。

#### 1\. Worker 线程数

从库的 worker 线程数量如果很少，并发度肯定上不去，这是最基础的条件。worker线程的数量由 slave\_parallel\_workers 参数控制。

#### 2\. 事务可并发度

当worker线程充足时，两个事务在从库能否并发应用，取决于这两个事务有没有修改同一行数据。在MySQL 中，可以选择三种方法判断两个事务是否可以并发，分别是：是否修改同一个库，是否在主库同时提交，是否修改同一行（writeset）。后两种方法仅在MySQL 5.7及以上版本支持。

其中效果最好的方法是writeset，它引入了一个哈希表，来计算事务是否修改同一行数据。大部分日常业务场景中，事务间的数据冲突并不大，开启writeset后可并发度都很高。Writeset 在一些coner case（如无主键，外键表等）中也存在一定的局限性，本文不展开。

#### 3\. 复制链路上的性能瓶颈

当我们有了足够多的worker线程，并且开启writeset功能获得了足够的可并发度，我们就具备了提升从库并发度的前提条件，但最后能否真的高并发度复制，还要看从库IO，SQL和Worker线程的吞吐。

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1yWVOoyS94b6RaG5bWzUBjUyMGeXibQUxdaryz72SPze9IPCZ3JibjTEkhicogZxLQvFMHjVAIVaNuY0cDmBgL839GmzZAS6sGYdo/640?wx_fmt=png&from=appmsg)

熟悉MySQL的朋友会知道，多线程复制中有IO，SQL和Worker三类线程，IO线程负责从主库收取binlog event；SQL线程负责将收到的binlog event分发给Worker线程；Worker线程有多个，负责并行应用事务。其中，IO线程和SQL线程，SQL线程和Worker线程之间都存在由锁保护的等待和通知操作，高并发时，这些锁很容易成为性能瓶颈。

在MySQL的binlog中，一个dml事务会由多个event组成，包括gtid，query，table map，row和xid event。以 sysbench write\_only 这个常用的测试脚本为例，该脚本一个事务中会更新2行，插入1行，删除1行；体现在binlog中，一个事务就有11个event。开启AliSQL的主库性能优化后，write\_only 脚本的峰值TPS为8.8万，即从库每秒要应用97万个binlog event，极端情况下每秒要加锁300万次。这样频率的加锁，即便锁内处理很快，也会带来巨大性能瓶颈。

### 诊断方法

MySQL 的 `SHOW SLAVE STATUS`命令中的`Slave_SQL_Running_State`列，会反馈出SQL线程的状态，是我们诊断这类问题的利器。

1\. 当woker线程数不够时，SQL线程会经常处于等待空闲worker的状态；此时执行`SHOW SLAVE STATUS`命令，通常会看到：

    Slave_SQL_Running_State: Waiting for replica workers to process their queues

2\. 当事务可并发度不够时，SQL线程会经常处于等待事务依赖关系状态，此时执行`SHOW SLAVE STATUS`命令，通常会看到：

    Slave_SQL_Running_State: Waiting for dependent transaction to commit

此时我们就要检查主库参数，开启writeset；如果writeset已经开启了，那说明主库当前业务的可并发度确实很低，例如批量数据处理业务（下一节将详细讲解），外键表的业务或者热点更新业务等。

3\. 当Worker线程和可并发度都充足时，IO和SQL线程的吞吐就成为复制的瓶颈。在延迟期间执行`SHOW SLAVE STATUS`命令，如果是IO线程吞吐瓶颈，通常会看到：

    Slave_SQL_Running_State: Replica has read all relay log; waiting for more updates

很好理解，如果有延迟的情况下没有新的relay log可读，那一定是IO线程慢了。如果是SQL线程吞吐瓶颈，通常会看到：

    Slave_SQL_Running_State: Reading event from the relay log

这个状态包含了SQL线程大部分工作内容，读relay log和大部分锁等待都包含在这个状态中。

当看到上述两个状态时，复制的瓶颈很可能在IO和SQL线程的吞吐上，此时可以解析binlog，查看每秒钟的事务数和binlog event数来辅助判断，如果每秒有几万个事务，并且有几十万甚至上百万的binlog event，就可以确定是小事务高并发导致的复制延迟问题。

### AliSQL 高并发复制优化

针对小事务高并发的延迟问题，AliSQL从两方面进行了优化：

1\. AliSQL针对性的优化了复制多个线程之间的加锁逻辑，比MySQL原生复制逻辑减少了30%以上的加锁次数。

2\. AliSQL引入了小事务打包优化，能够合并同一个事务内的多个event的加锁动作，显著减少加锁次数。

通过这两项优化，高并发场景下AliSQL从库的吞吐可以高于主库，小事务高并发场景的复制延迟问题彻底解决。

**批量数据处理**

### 延迟原因

很多业务会在凌晨或其他低峰期进行数据删除，整理或者导入等工作，每天都要处理数百万甚至数千万行数据。通常情况下，开发会用小批量多并发的方式进行处理，这样处理速度快，并且可以灵活调整批量和并发的大小，控制对数据库的影响。

然而，MySQL的并行复制逻辑对这种业务非常不友好，执行此类定时任务时经常会出现复制延迟，严重的甚至到第二天定时任务开始前，第一天任务产生的延迟都还没追齐。为什么跑批这么容易延迟呢？

![](https://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1x0N1owZa6qRTN0eWfGlj7oNPPtRp49D8tzaXv0hqknqcAIvporGxl7y2qZszItKGKV2qibvA4rDCsN0ZoOCUAJnTq6c1TExXPE/640?wx_fmt=png&from=appmsg)

在执行批量数据处理期间，实例上主要有两种事务，一种是批量数据处理的中等大小事务，一般一个事务内处理几千行数据；另一种是普通业务的小事务，大部分实例上，即便在低峰期还是会有一定量的普通业务，只是业务压力较小。两种事务会交叉存在于binlog文件中，当两个中等事务中间夹着多个小事务，并且这些小事务修改了同行数据时，两个中等事务就无法并发执行了。

如上图例子中，Trx2和Trx5是批量数据处理的中等事务；Trx3和Trx4是普通业务的小事务，并且修改了同一行数据。SQL线程在分发这些事务时，Trx2 和 Trx3都可以正常分发，Trx4则需等待Trx3及之前的所有事务都提交后，才能分发；这导致Trx5的分发是到了Trx2提交后才进行的，进而导致Trx2和Trx5无法并行应用。

因此，在批量数据处理期间，经常看到从库上并发度非常低，甚至很多时刻只有一个worker在工作，几乎退化成了单线程应用，导致复制延迟问题。

### 诊断方法

清楚原理后，诊断此问题就很容易了。

第一步，我们解析延迟期间的binlog，统计一个binlog内修改千行以上的中等事务和修改百行以内的小事务的数量；如果中等事务和小事务数量都不少，就要进一步判断其并行度。

第二步：判断binlog中每两个相邻的中等事务是否能够并行执行（中等事务之间是否有相互依赖的小事务），如果有很多的相邻的中等事务无法并行执行，复制就会退化为串行，进而导致复制延迟问题。

### AliSQL 中等事务复制优化

![](https://mmbiz.qpic.cn/sz_mmbiz_png/j7RlD5l5q1zOS6k04rLC4TUbbWkWHLv9gh0ECmwaiaNnkSlzOZGFKxtvBmQ97v2XdwwNNHmSNZm231aMibXC6M9qwm31cf4PuNA78udkiaemhk/640?wx_fmt=png&from=appmsg)

为了优化这个场景，AliSQL 将原本在SQL线程中的，阻塞后续事务分发的等待逻辑，放到了worker线程中。这样一来，如果有少量修改同行的小事务分布在中等事务之间，这些小事务会在worker线程中等待依赖的事务提交，而不是在SQL线程中等待，阻塞其他事务的分发。这样一来，这些没有冲突的中等事务也就能够并发起来了。

附录：RDS AI 助手诊断流程视频

![](http://mmbiz.qpic.cn/mmbiz_png/j7RlD5l5q1zsMO0HEywEjicRXGH5MTLyLhxbAz1qQ3U4jPFnrdGQbFPOXKYT6A4D6R48bZNzIAHDcCNyLTRBO4bnd0UrLrEtD2lWB6gKr6EE/0?wx_fmt=png) 阿里云开发者

 ![](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3C!-- Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE --%3E%3Cg fill='none' stroke='%23888888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/g%3E%3C/svg%3E) 阅读![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.154 6.797l-.177 2.758h4.009c1.346 0 2.359 1.385 2.155 2.763l-.026.148-1.429 6.743c-.212.993-1.02 1.713-1.977 1.783l-.152.006-13.707-.006c-.553 0-1-.448-1-1v-8.58a1 1 0 0 1 1-1h2.44l1.263-.03.417-.018.168-.015.028-.005c1.355-.315 2.39-2.406 2.58-4.276l.01-.16.022-.572.022-.276c.074-.707.3-1.54 1.08-1.883 2.054-.9 3.387 1.835 3.274 3.62zm-2.791-2.52c-.16.07-.282.294-.345.713l-.022.167-.019.224-.023.604-.014.204c-.253 2.486-1.615 4.885-3.502 5.324l-.097.018-.204.023-.181.012-.256.01v8.218l9.813.004.11-.003c.381-.028.72-.304.855-.709l.034-.125 1.422-6.708.02-.11c.099-.668-.354-1.308-.87-1.381l-.098-.007h-5.289l.26-4.033c.09-1.449-.864-2.766-1.594-2.446zM7.5 11.606l-.21.005-2.241-.001v8.181l2.45.001v-8.186z' fill='%23000'/%3E%3C/svg%3E) 赞 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cpath d='M0 0h24v24H0z'/%3E    %3Cpath fill='%23576B95' d='M13.707 3.288l7.171 7.103a1 1 0 0 1 .09 1.32l-.09.1-7.17 7.104a1 1 0 0 1-1.705-.71v-3.283c-2.338.188-5.752 1.57-7.527 5.9-.295.72-1.02.713-1.177-.22-1.246-7.38 2.952-12.387 8.704-13.294v-3.31a1 1 0 0 1 1.704-.71zm-.504 5.046l-1.013.16c-4.825.76-7.976 4.52-7.907 9.759l.007.287c1.594-2.613 4.268-4.45 7.332-4.787l1.581-.132v4.103l6.688-6.623-6.688-6.623v3.856z'/%3E  %3C/g%3E%3C/svg%3E) 分享 ![](data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'%3E  %3Cdefs%3E    %3Cpath id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-a' d='M0 0h24v24H0z'/%3E  %3C/defs%3E  %3Cg fill='none' fill-rule='evenodd'%3E    %3Cmask id='a62bde5b-af55-42c8-87f2-e10e8a48baa0-b' fill='%23fff'%3E      %3Cuse xlink:href='%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-a'/%3E    %3C/mask%3E    %3Cg mask='url(%23a62bde5b-af55-42c8-87f2-e10e8a48baa0-b)'%3E      %3Cg transform='translate(0 -2.349)'%3E        %3Cpath d='M0 2.349h24v24H0z'/%3E        %3Cpath fill='%23576B95' d='M16.45 7.68c-.954 0-1.94.362-2.77 1.113l-1.676 1.676-1.853-1.838a3.787 3.787 0 0 0-2.63-.971 3.785 3.785 0 0 0-2.596 1.112 3.786 3.786 0 0 0-1.113 2.687c0 .97.368 1.938 1.105 2.679l7.082 6.527 7.226-6.678a3.787 3.787 0 0 0 .962-2.618 3.785 3.785 0 0 0-1.112-2.597A3.687 3.687 0 0 0 16.45 7.68zm3.473.243a4.985 4.985 0 0 1 1.464 3.418 4.98 4.98 0 0 1-1.29 3.47l-.017.02-7.47 6.903a.9.9 0 0 1-1.22 0l-7.305-6.73-.008-.01a4.986 4.986 0 0 1-1.465-3.535c0-1.279.488-2.56 1.465-3.536A4.985 4.985 0 0 1 7.494 6.46c1.24-.029 2.49.4 3.472 1.29l.01.01L12 8.774l.851-.85.01-.01c1.046-.951 2.322-1.434 3.59-1.434 1.273 0 2.52.49 3.472 1.442z'/%3E      %3C/g%3E    %3C/g%3E  %3C/g%3E%3C/svg%3E) 推荐 ![](data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22.242 7a2.5 2.5 0 0 0-2.5-2.5h-14a2.5 2.5 0 0 0-2.5 2.5v8.5a2.5 2.5 0 0 0 2.5 2.5h2.5v1.59a1 1 0 0 0 1.707.7l1-1a.569.569 0 0 0 .034-.03l1.273-1.273a.6.6 0 0 0-.8-.892v-.006L9.441 19.1l.001-2.3h-3.7l-.133-.007A1.3 1.3 0 0 1 4.442 15.5V7l.007-.133A1.3 1.3 0 0 1 5.742 5.7h14l.133.007A1.3 1.3 0 0 1 21.042 7v4.887a.6.6 0 1 0 1.2 0V7z' fill='%23000' fill-opacity='.9'/%3E%3Crect x='14.625' y='16.686' width='7' height='1.2' rx='.6' fill='%23000' fill-opacity='.9'/%3E%3Crect x='18.725' y='13.786' width='7' height='1.2' rx='.6' transform='rotate(90 18.725 13.786)' fill='%23000' fill-opacity='.9'/%3E%3C/svg%3E) 留言