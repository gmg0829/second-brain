# The painfully outdated practice of software interviews

**视频ID**: Pu46rRtd1MQ
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=Pu46rRtd1MQ

## 内容概要

本视频是 Gaurav Sen 对软件行业面试流程的深度反思和倡议。他指出，当前的面试方法已经过时且存在严重问题——工程师平均需要花费三个月时间来准备面试，而准备的内容（DSA 算法题）与实际工作几乎完全无关。

视频回顾了软件面试的历史演变：2000年代，面试主要考察编程语言知识和概念，如 volatile 关键字含义、异常处理等，属于知识型考察，没有实际技能演示。2013年左右，远程代码执行技术成熟，LeetCode/HackerRank 等平台兴起，面试转为在平台上解答算法题，可以设置时间限制检验效率，这看似公平可量化，但实际上加剧了问题——编程变成了一种应试技巧，真正的工程师反而可能因为不熟悉这些"脑筋急转弯"式的题目而被淘汰。

到了2024年，这种方法已经彻底失效。Gaurav 指出，问一个工程师"你城市里有多少加油站"这样的估算问题和实际工作毫无关系，虽然看似客观，但完全没有考量工作场所能力。工程师花费三个月准备的技能——二分搜索、排序算法——在实际工作中几乎用不到，但公司真正需要的技能——故障恢复、并发编程、API 设计——却从未被测试。

Gaurav 认为需要一场变革：应该用自动化测试工具来考核候选人的实际工程能力，比如：系统是否在故障时不会崩溃（Fault Tolerance）、是否能正确处理并发（Concurrency）、是否能设计 API 契约并实现它（API Design）、是否有真正的效率意识（而非时间复杂度上的小聪明）。他正在 InterviewReady 平台上开发两类工具：Software Judge（代码需要处理超时、重试、错误传播等真实场景）和 System Design Judge（让候选人设计完整系统并理解每个组件的适用场景）。

## 核心观点

- 当前软件面试最大的问题：工程师花三个月准备的技能在实际工作中几乎无用，而真正重要的技能（故障容错、并发、API设计）从未被测试
- 面试演变历程：2000s知识型 → 2013年LeetCode算法型 → 2024年需要根本性变革
- 时间复杂度不等于实际效率——实际效率涉及并发、网络资源利用等更复杂的考量
- 公司真正需要考核的能力：Fault Tolerance（数据库崩溃时能否重试）、Concurrency（并发编程）、API Design（契约设计与实现）、Practical Efficiency（真实场景下的效率）
- 解决方案需要满足两个条件：自动化（可扩展、无偏见）和与工作相关（测试真实工程能力）
- 自动化工具不仅能帮候选人自我练习，也能帮公司节省成本——因为招来的人能直接上手工作

## 关键语录

> "The average preparation time for software interviewers is three months. Three months is a quarter of a year."

> "There's little to no relevance that computer programming has to your daily work."

> "You are a computer programmer. There are people who leave their job because what you test them on is not relevant to the job."

> "We like writing binary search, so spend the next three months not training us."

> "Practical efficiency is very, very different. I'm talking about literally value programs or concurrency. None of that is tested right now in engineering."
