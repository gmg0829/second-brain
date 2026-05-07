---
title: AI Trends in 2025
video_id: _bbuRFT2l-Q
channel: Gaurav Sen
url: https://www.youtube.com/watch?v=_bbuRFT2l-Q
original_language: en
transcript_source: /home/gaominggang/workspace/youtube-transcript/gaurav-sen/ai-trends-in-2025/transcript.md
summary_language: zh
generated_at: 2026-04-30
---

# AI Trends in 2025
2025年AI趋势分析

## 内容概要

本视频是Gaurav Sen在2025年初录制的一年趋势预测与回顾分析。与常规论文解读不同，这期视频以**预测性分析**为主线，分三个层面展开：当前趋势、市场力量驱动因素、以及可能的未来走向。视频的核心论点是：**大语言模型的Scaling（规模扩展）红利已明显递减，炒作泡沫正在消退，企业正在从"追求智能"转向"追求成本优化"，而真正有价值的路径是构建企业专属模型和等待新架构突破。**

---

## 核心观点

### 1. 三大当前趋势

**趋势一：大模型Scaling回报递减**

从GPT-3.5 → GPT-4 → GPT-4.5 → GPT-5，每一次迭代的智能提升都越来越小，但成本却持续攀升。不仅是GPT，Gemini、DeepSeek、Llama等所有主流模型都面临同样问题：模型参数量越来越大，但实际智能提升不成比例。这种**边际效益递减**是整个行业面临的根本性挑战。

**趋势二：成本优化成为核心诉求**

由于智能提升已不再是主要卖点，各公司开始将焦点转向**降低使用成本**。企业用户越来越精明——他们发现通过提供领域特定知识（domain knowledge），即使是小型语言模型（Small Language Models）也能表现良好，这让成本更低的方案变得更具吸引力。Netflix等中型企业开始自行训练定制化模型，而非直接调用OpenAI等提供的大模型API。

**趋势三：企业专属模型（Company-Specific Models）崛起**

越来越多的企业开始构建自己的基础模型（foundation models），而非依赖通用大模型：

- **NASA**：预测森林火灾、冰川移动、洪水追踪
- **Swiggy**（印度外卖平台）：用户订餐偏好预测
- **Netflix**：推荐系统优化

这些模型有三个共同优势：①成本远低于通用大模型；②完全自主可控；③训练数据质量更高（企业私有数据）。

### 2. 市场力量分析

**LLM炒作热度从100降至50**

Gaurav Sen用"炒作评分"量化了AI热潮的消退轨迹：

| 时间节点 | 代表事件 | 炒作评分（满分100） |
|---------|---------|------------------|
| 2022年 | ChatGPT (GPT-3.5)发布，全行业震惊 | 100（峰值） |
| 2023年 | GPT-4发布，多模态能力显著提升 | 仍高 |
| 2024年 | GPT-4.5发布，与GPT-4差距极小 | 开始下降 |
| 2025年 | GPT-5发布，仅成本降低 | 约50 |

炒作消退的根本原因是：**企业实际使用后发现LLM的局限性**——AI会幻觉（hallucinate）、无法自主设定目标（lack of goal-setting）、并且不够可靠（inconsistent），远非AGI（通用人工智能）。

**数据瓶颈**

训练大模型的数据正在枯竭。互联网公开数据（网页、博客、视频等）是训练语料的主要来源，但这些数据的增长速率已经赶不上模型对数据的需求。虽然应用层在增长（更多App被构建），但没有新的数据和新技术（算法突破）来持续喂养模型，pipeline正在面临断裂。

**Sam Altman被自己的工程师打脸**

视频提到了一个重要细节：Sam Altman曾问自己的首席数据工程师，"GPT到第60版是否能实现AGI？"而这位工程师明确回答："我不认为GPT能做到。"（I do not think GPT is going to do it.）这意味着即使OpenAI内部也承认，仅靠Scaling无法通往AGI。

### 3. LLM的根本性缺陷

视频深入剖析了当前大语言模型为什么不可能达到AGI：

- **幻觉问题（Hallucination）**：模型会一本正经地胡说八道
- **无目标设定能力（No Goal Setting）**：AI甚至连子目标（subgoal）都难以定义
- **缺乏内部逻辑一致性（Internal Inconsistency）**：当让模型从A到B，再追问A1/A2/A3等中间步骤时，模型无法解释这些子步骤之间的逻辑关系，因为它根本不理解这些步骤，只是记住了A→B的映射
- **能量效率远不及人类**：人脑的能耗远低于大模型，但智能表现却全面超越

### 4. 未来预测

**预测一：更多AI工程师将被雇佣（与"AI取代工程师"相反）**

由于没有新模型发布（截至2026年），企业已经看清了现有技术的能力边界，会招募更多工程师来填补AI无法覆盖的工作缺口。软件工程师的"被取代"窗口实际上被推迟了。

**预测二：新架构研究正在进行，但尚未成熟**

- **Contrastive Learning（对比学习）**：已有研究
- **Diffusion-based Models（扩散模型）**：已有应用
- **JEAP（Yann LeCun的联合嵌入预测架构）**：最有希望的下一代架构方向，能够解决LLM缺乏内部一致性的问题，且用少量数据训练效果就很好，还能构建世界模型（world model）。但目前仍处于概念验证阶段（proof of concept），尚未替代LLM。

**预测三：误导性营销将被追责**

Gaurav Sen在视频末尾发出了强烈批评，点名了两类不当营销：

1. **Benchmark作弊**：OpenAI等公司宣称的"Codeforces 99.8百分位"成绩是假的或严重误导的——因为当Gaurav Sen实际使用这些模型参加竞赛时，表现极差。可能的作弊方式：50-100次提交取最优、用多模型并行提交取最佳结果、或有人类辅助。
2. **社交媒体毒性**：AI领域KOL（Sam Altman、Mark Zuckerberg、Elon Musk等）为了流量和利益，在Joe Rogan等节目上散布"AI将在几年内取代人类"等耸人听闻的言论，利用人们对AI的恐惧牟利。

Gaurav Sen特别赞扬了**Yann LeCun和Geoffrey Hinton**，认为他们是真正负责任的AI研究者，在描述AI能力时始终保持克制和准确。

---

## 关键术语

| 英文 | 中文 |
|------|------|
| Scaling | 规模扩展（增大模型参数/训练数据） |
| ROI (Return on Investment) | 投资回报率 |
| Diminishing Returns | 边际效益递减 |
| Small Language Model (SLM) | 小型语言模型 |
| Company-Specific Model | 企业专属模型 |
| Foundation Model | 基础模型 |
| Hallucination | 幻觉（AI生成虚假信息） |
| Multimodal Capabilities | 多模态能力 |
| Domain Knowledge | 领域知识 |
| AGI (Artificial General Intelligence) | 通用人工智能 |
| Contrastive Learning | 对比学习 |
| Diffusion-based Models | 扩散模型 |
| JEAP (Joint Embedding Predictive Architecture) | 联合嵌入预测架构 |
| World Model | 世界模型 |
| Benchmark | 基准测试 |
| Prompt Engineering | 提示工程 |
| Proof of Concept | 概念验证阶段 |
| Toxicity | 毒性（此处指误导性舆论） |

---

## 关键语录

> "The return on investment from scaling large language models is lower and lower and lower."
> （大规模扩展大语言模型的投资回报率越来越低。）

> "Cost considerations more than intelligence."
> （现在考虑的是成本，而不是智能。）

> "Companies are building their own models trained on company specific data — and this is really helping companies do well."
> （企业正在基于自有数据训练自己的模型——这确实帮助企业做得很好。）

> "The hype around LLMs has gone down from 100 to maybe 50. Half the hype that you had earlier."
> （围绕大语言模型的炒作从100分降到了大约50分。仅为之前的一半。）

> "They hallucinate. So they're unreliable. They cannot set their own goals. They require handholding."
> （AI会幻觉，所以它们不可靠。它们无法设定自己的目标。它们需要手把手引导。）

> "Even GPT-60 is not going to be replacing a human. So I'm going to be AGI."
> （即使GPT-60也不打算取代人类。所以通往AGI还有很长的路要走。）

> "I think the benchmarks claimed by large language models are fake or highly misleading. It's bullshit."
> （我认为大语言模型宣称的基准测试成绩是假的或严重误导的。这是胡扯。）

> "Yann LeCun and Geoffrey Hinton are assets to humanity, especially during trying times."
> （Yann LeCun和Geoffrey Hinton是人类宝贵的财富，尤其是在艰难时刻。）

---

## 应用场景 / 案例

### 企业AI战略决策框架

1. **不要盲目追逐最大最新的模型**：成本高，智能提升有限
2. **考虑构建企业专属模型**：用私有领域数据微调小型模型，往往比直接调用GPT更高效且成本更低
3. **评估AI的真实能力边界**：AI擅长生成草稿、模板、 boilerplate代码，但不擅长复杂业务逻辑推理和需要长期规划的任务

### 工程师个人发展建议

- **学习AI工程技能（Prompt Engineering、Context Engineering）仍然有价值**：因为企业会更加依赖会用AI的人，而不是被AI替代
- **不要被"工程师将被取代"的言论误导**：至少在2030年之前，实际情况是更多AI工程师将被需求
- **关注下一代架构方向**：如JEAP等新架构可能在5-10年内带来真正的突破

### 识别AI领域误导信息

三个警示信号：
1. **Benchmark成绩异常高**（如"99.8百分位"）但实际使用体验差距大——很可能是作弊或过度优化
2. **时间线很近且充满末日论**（如"几年内取代人类"）——利用恐惧心理博取流量
3. **地缘政治/商业竞争词汇过多**（"中国vs美国AI竞争"等）——营销大于技术事实

---

*本摘要由AI生成，基于视频英文Transcript整理*
