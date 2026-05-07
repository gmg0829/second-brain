---
title: "Stanford CME295 Transformers & LLMs | Lecture 4 - LLM Training"
source: "Stanford Online"
url: "https://www.youtube.com/watch?v=VlA_jt_3Qc4"
duration: "01:47:27 (6447秒)"
description: "本讲涵盖LLM训练的全流程：预训练（Next Token Prediction）、缩放定律（Chinchilla定律）、FLOPs计算、训练优化技术（ZeRO数据并行、模型并行、Flash Attention）、量化与混合精度训练、有监督微调（SFT）、指令调优（Instruction Tuning）、参数高效微调（LoRA）以及QLoRA。课程由Afshine Amidi和Shervine Amidi主讲。"
---

## 一句话核心主旨

LLM训练是一个分阶段、多层次优化的系统工程，从海量数据的预训练（预测下一个Token）开始，通过缩放定律指导模型与数据规模的最优配比，借助分布式训练与Flash Attention等工程优化降低算力门槛，再通过指令调优和参数高效微调技术（LoRA/QLoRA）将通用语言模型适配为可用的助手。

---

## 逐章详解

### 1. Introduction（课程引入与期中期末说明）

本节主要面向学生说明课程后勤事项：期中考试定于下周五（3:30-5:00），范围涵盖Lecture 1-4，为选择题加自由问答题格式，闭卷、无计算器、可带作弊纸条（仅供学习使用）。期末考试安排在12月10日晚7:00-8:30，范围为Lecture 5-9。课程回顾了上节内容：MoE（稀疏/稠密混合专家）架构的作用是在不增加推理成本的前提下扩展模型规模；以及三种推理解码方法——Greedy Decoding（取最高概率Token）、Beam Search（维护Top-K序列）和Sampling（按概率分布采样，Temperature控制分布锐度）；还有KV Cache等推理优化技术。本讲正式开始LLM训练的核心内容。

### 2. Pretraining（预训练）

预训练是LLM训练中最昂贵的阶段，其核心思想来自**迁移学习（Transfer Learning）**——不从头训练，而是从一个在大规模数据上预训练好的模型出发，再针对具体任务进行适配。预训练的任务是**Next Token Prediction**（预测下一个Token），训练数据来源极广：Common Crawl（每月约30亿网页的存档）、Wikipedia、Reddit等社交媒体、GitHub和Stack Overflow等代码平台，覆盖英语、其他语言以及各类编程语言。规模在数千亿到数万亿Token量级——GPT-3训练了3000亿Token，Llama 3训练了15万亿Token。预训练阶段模型是Decoder-Only Transformer（占比超过90%），模型在海量文本上迭代学习语言的通用结构和代码的语法模式。

### 3. FLOPs, FLOPS（算力单位区分）

这两个概念常被混淆，需要严格区分：

- **FLOPs（小写s）** = Floating Point Operations（浮点操作数），是计算量的单位，训练一个大语言模型通常需要约10²⁵ FLOPs，与Token数量和模型参数量的乘积成线性关系（O(Tokens × Parameters)），也与具体架构（密集/稀疏）相关。
- **FLOPS（全大写S）** = Floating Point Operations Per Second（每秒浮点操作数），是硬件算力速度的衡量标准，例如H100 GPU针对不同精度（FP64/FP32/FP16/BF16）有不同的FLOPS数值（从34 TFLOPS到数千TFLOPS不等）。

理解这两个指标对于估算训练成本和硬件需求至关重要。

### 4. Scaling Laws, Chinchilla Law（缩放定律与Chinchilla定律）

2020年的论文"Scaling Laws for Neural Language Models"通过大量实验揭示了模型性能随计算量、数据规模和模型规模的单调提升规律。关键发现：**更大的模型具有更高的样本效率**（Sample Efficient）——处理相同数量的Token时，大模型的表现优于小模型。然而算力并非无限，人们希望在固定算力预算下找到模型规模与训练数据规模的最优配比。**Chinchilla定律**给出了答案：训练数据量应约为模型参数量的20倍。例如GPT-3有1750亿参数却只训练了300亿Token，按照Chinchilla定律属于"训练不足"。不同模型架构（尤其MoE vs 密集模型）可能需要根据自身Setup重新拟合缩放曲线，Llama 3团队就通过小规模实验外推确定了适合自身的最优参数-Token配比。预训练还面临三大挑战：成本高昂（数百万至数亿美元不等）、知识截断日期（Knowledge Cutoff Date，模型无法知晓截断日期之后发生的事件）以及生成内容可能抄袭训练数据（Plagiarism问题）。

### 5. Training Optimizations Overview（训练优化概述）

预训练涉及数十亿至千亿参数级别的模型和海量数据，必然需要多GPU分布式训练。一个训练步骤包含：①**Forward Pass**（前向传播）产生激活值（Activations）需要存入内存；②**Backward Pass**（反向传播）计算梯度（Gradients）也需要存储；③**Weight Update**（权重更新）使用Adam优化器（维护一阶矩和二阶矩的移动平均）也需要存储相应状态。这些存储需求全部集中在每块GPU约80GB的HBM内存中，显得极其紧张。因此需要**数据并行（Data Parallelism）**和**模型并行（Model Parallelism）**两大类方法将负载分散到多块GPU上。

### 6. Data Parallelism with ZeRO（数据并行与ZeRO优化）

**Data Parallelism（DP）**将训练数据分片到不同GPU，每个GPU保留一份模型副本独立进行前向/反向传播，再通过GPU间通信聚合梯度并更新。需要存储的内容在每个GPU上存在大量冗余——模型参数、梯度和优化器状态在所有GPU上完全相同。**ZeRO（Zero Redundancy Optimizer）**的核心思想是**分片（Sharding）**：ZeRO-Stage 1只分片优化器状态（内存降至约1/4）；ZeRO-Stage 2进一步分片梯度；ZeRO-Stage 3分片模型参数（实现无冗余）。代价是通信成本增加，但显著降低了每GPU的内存负担。这是大模型训练中非常核心的技术。

### 7. Model Parallelism（模型并行）

模型并行在单个批次内并行化操作，而不是像数据并行那样将数据分开处理。主要技术包括：**Expert Parallelism**（将MoE模型中的不同专家放置在不同GPU上）、**Tensor Parallelism**（将大的矩阵乘法切割到不同GPU上减小单卡内存需求）和**Pipeline Parallelism**（将模型的不同层分配到不同GPU，如GPU1负责第1-3层，GPU2负责第4-6层等）。模型并行与数据并行通常会结合使用，构成混合并行策略。

### 8. Flash Attention（Flash Attention）

Flash Attention由斯坦福团队2022年提出，是一种利用GPU内存层级特性（**HBM**大容量但慢速 vs **SRAM**小容量但高速，约10倍速度差距）来加速注意力计算并减少内存读写的**精确**算法（不做任何近似）。标准Attention实现需要在HBM中反复读写矩阵（Q、K、V），造成大量数据传输瓶颈。Flash Attention的**核心 Trick**是利用Softmax的**行级独立性**——Softmax可以对矩阵的各个子块分别计算，最终通过正确的缩放因子合并结果。具体做法是**Tiling（分块）**：将Q/K/V矩阵切分为小块送入SRAM，在高速 SRAM上完成完整的注意力计算后再写回HPM。这样只需一次HBM读取和一次写入，大幅减少数据移动。Flash Attention还包含**Recomputation（重计算）**策略——在反向传播时不保存所有激活值，而是利用快速的前向/反向计算重新推导，将HBM读写从约40次降至约4次（近10倍减少），同时运行时长也显著缩短（这是极为罕见的"既省内存又提速度"的效果）。Flash Attention已经发展出FlashAttention-2、FlashAttention-3等多个版本，针对新GPU架构持续优化，目前已是训练大模型的标配技术。

### 9. Quantization（量化）

量化是将权重精度从高精度浮点数（如FP32）转换为低精度表示（如FP16、BF16、INT8等）以节省内存和加速计算的技术。浮点数由**符号位、指数位和尾数位（Mantissa）**编码，不同精度格式占用不同的比特数。FP16只用16bit，是FP32的一半内存；FP64精度最高但计算速度最慢（如H100上FP64仅34 TFLOPS，而FP16可达数千TFLOPS）。量化后模型占用内存大幅下降，硬件计算速度也更快，是推理侧最重要的优化手段之一。常见的量化方法包括**零点量化（Zero-point Quantization）**和**ABSMax量化**等。

### 10. Mixed Precision Training（混合精度训练）

混合精度训练的核心思想是在不同计算环节使用不同精度的浮点表示，兼顾内存节省与精度保持。典型策略是：**权重保持FP32高精度**（避免误差累积）；**前向/反向传播的矩阵运算使用FP16低精度**（加速降内存）；**权重更新仍使用FP32**（梯度更新需要高精度以避免精度的逐次累积误差）。直觉解释：数据本身带有噪声，不需要极高尾数精度；但模型权重是长期累积的信息载体，高精度对防止误差传播至关重要。实验表明混合精度训练性能几乎不下降，但能显著节省内存并加速。不同层可能需要不同的精度策略，具体配置因模型和硬件而异。

### 11. Supervised Finetuning（SFT，有监督微调）

预训练让模型学会"语言是怎么构成的"，但模型不知道"如何成为一个有用的助手"。以一个具体例子说明：用户问"我的泰迪熊能放洗衣机洗吗？"——预训练模型可能会输出一段描述泰迪熊材质和洗衣机原理的文字，而不是直接回答"可以/不可以"或给出实用建议，因为它只是在做Next Token Prediction，而非在扮演助手角色。**SFT的核心转变**是从"预测通用语料的下一个Token"变为"在给定输入（Instruction）后预测有帮助的响应"。SFT使用**输入-输出对（Instruction-Response Pairs）**作为训练数据，只在输出部分计算损失（Input部分不进行Teacher Forcing，而是直接作为条件）。这与预训练的任务形式有本质区别——预训练是从BOS Token开始逐Token预测，而SFT是从Instruction开始预测后续。SFT的数据集规模比预训练小数个数量级（GPT-3用了约13K示例，Llama 3用了约10M示例，但每个示例约1000 Token），质量要求更高（通常需要人工专家编写或LLM生成后人工/LLM审核）。

### 12. Instruction Tuning（指令调优）

Instruction Tuning是SFT的一个子类别，专门针对"让模型能够响应用户指令"这一目标。数据通常来自多个类别的任务：故事写作、诗歌创作、列表生成、解释说明、数学推理、代码编写等**Assistant Dialogues**类型。数据来源经历了从纯人工编写（专家语言学家撰写Instruction和最优Response）到LLM辅助生成（用高性能模型生成Response，再人工或LLM审查质量）的演变。SFT数据集还需要包含**Safety数据**——教模型拒绝回答有害问题（Harmless）和学会适度保守表达（Hedging，避免绝对化陈述）。评估方面，MMLU（大规模多任务语言理解）是通用语言理解的主流基准；GSM8K（高中数学8K题）是数学推理基准；代码生成有专门的代码基准。但存在**Benchmark饱和与污染问题**——模型可能在测试任务相关的辅助数据上训练后刷分，真正的泛化能力难以衡量。Chatbot Arena（Elo排名）通过用户众包比较两个模型的响应质量来排名，但存在初始噪声、易被对抗性操纵（通过让模型在自我介绍中声称自己是某特定模型就能影响排名）等缺陷。Alignment（对齐）= SFT + Preference Tuning（RLHF/DPO等），使模型行为符合人类偏好和安全性要求。Emerging的概念还有**Mid Training**（介于预训练和微调之间，用任务相关数据以预训练目标继续训练）。

### 13. Parameter-Efficient Finetuning with LoRA（参数高效微调之LoRA）

全量微调所有参数在实践中极其昂贵。**LoRA（Low-Rank Adaptation）**的核心思想是将权重更新ΔW分解为两个低秩矩阵的乘积：**W = W₀ + BA**，其中W₀是冻结的预训练权重，B和A是待训练的矩阵，r（Rank）通常取很小的值（如4-16），而W的维度是数百到数千。这意味着参数量从O(d²)降至O(2dr)，通常减少2-3个数量级。训练时W₀冻结，只更新B和A；推理时将BA加到W₀上得到适应任务的权重。LoRA最初只应用于Attention矩阵，但后续研究（几周前的博客研究）发现**FFN（前馈网络）块才是LoRA效果最显著的位置**，如今通常同时在Attention和FFN中放置LoRA。实证发现：LoRA需要更高的学习率（通常是全量微调的10倍）；LoRA在较大Batch Size下表现不佳（可能因为矩阵乘积的训练动态与全矩阵不同）。其他参数高效微调方法还包括**Prefix Tuning**和**Adapters**（但不如LoRA常用）。LoRA中的Rank r是设计超参数，可以通过网格搜索或直接使用社区实践值（如r=4或r=8）。

### 14. QLoRA（量化LoRA）

QLoRA将量化技术与LoRA结合，在保持LoRA高效微调优势的同时进一步降低显存占用。其核心做法是：将对预训练权重W₀**量化到NF4格式**（Normal Float 4，一种针对权重呈正态分布假设的分位数量化方法，比固定区间量化更高效），以极低精度存储（大幅降低内存）；而LoRA的A和B矩阵以**BF16全精度**训练更新；推理时将量化权重反量化后与训练好的BA矩阵相加得到最终权重。QLoRA还使用了**Double Quantization**（对量化过程中的缩放因子进行第二次量化）进一步节省内存。QLoRA实现了约**16倍**的VRAM节省，使得在消费级GPU上微调大模型成为可能，是让大模型微调民主化的关键技术。

---

## 金句摘录

| 序号 | 原文 | 解读 |
|------|------|------|
| 1 | "The goal of transfer learning is to not always start from scratch. If you have a new task, it's to start with some pre-trained model." | 迁移学习的核心价值——站在巨人肩膀上，而非从零开始 |
| 2 | "The more compute you have, the better your model learns about predicting the next token. Same for dataset size. So the more the bigger your training set, the better it is. And the bigger your model, the better it is." | 缩放定律的核心发现——算力、数据量、模型规模三者的单调提升关系 |
| 3 | "Bigger models tend to be more sample efficient. So for an equal amount of tokens that is processed, you will have a better performance with a bigger model compared to a smaller one." | 大模型样本效率的优势——用相同的Token，大模型学得更好 |
| 4 | "If you have an amount of training set size that's about 20 times the model size, then you're spending your compute in an optimal way." | Chinchilla定律的精髓——20倍Token/参数比是最优算力分配 |
| 5 | "Memory is not unlimited. Memory is limited. And so here what we have in front of us is the description of a GPU. H100, which is a very good GPU. And you will see that in that description, there's a line on GPU memory. So GPU memory is your amount of memory per GPU. It's 80 gig for this one. It's quite large. So it's on the order of tens of gigabytes. So you need to store all these things in 80 GB, which is not a lot." | 工程现实：硬件显存瓶颈与理想算力需求之间的巨大鸿沟 |
| 6 | "With flash attention, you do more operations, but you also see fewer read and writes from the HBM. So it was 40× in the standard way and then 4× with flash attention. It's like almost a 10× reduction. But then you see that the runtime is also smaller." | Flash Attention的惊人效果：更多计算操作却反而更快（因为避免了内存访问瓶颈） |
| 7 | "You do more FLOPs, but you also save memory and you're faster. You're basically having everything — it's the best of all worlds." | 描述Flash Attention带来的"全赢"效果——省内存、提速度二者兼得 |
| 8 | "In this setup, the input is not a location where you would predict the next token. You would not do teacher forcing on it, but rather start from this input and then predict the next token onwards." | SFT与预训练任务形式的本质区别——从输入条件开始生成，而非从零预测 |
| 9 | "Pre-training is a lot of data. You want to learn about general characteristics about language, and SFT is more about aligning the goal of the model to being suited for your tasks. Typically very high quality datasets and much more concise and precise in terms of number." | 预训练与SFT的数据规模与目的差异 |
| 10 | "The combination of fine-tuning and preference tuning which comes after pre-training is what we call alignment of the model." | Alignment（对齐）的精确定义——SFT + Preference Tuning |
| 11 | "LoRA decomposes the fine-tuning between the weights of the pre-trained model and additional weights that it decomposes into a low rank multiplication." | LoRA的核心机制——低秩分解，将参数量从O(d²)降到O(2dr) |

---

## 关键数据点

| 数据 | 数值 | 说明 |
|------|------|------|
| GPT-3 预训练Token数 | 3000亿（300B） | 预训练数据规模 |
| Llama 3 预训练Token数 | 15万亿（15T） | 更大规模预训练 |
| GPT-3 参数规模 | 1750亿（175B） | Chinchilla定律视角下严重训练不足 |
| Chinchilla最优 Token/参数比 | 20:1 | 给定算力下的最优数据/模型配比 |
| 预训练FLOPs量级 | 10²⁵ FLOPs | 训练一个大语言模型的总计算量 |
| H100 GPU内存 | 80 GB | 当前顶级GPU的单卡内存 |
| H100 FP64算力 | 34 TFLOPS | 最高精度但最慢 |
| H100 FP16/BF16算力 | 数千 TFLOPS | 主流训练精度对应的算力 |
| Flash Attention HBM读写减少 | 约10倍（40次→4次） | 标准Attention vs Flash Attention |
| SFT数据量 GPT-3 | 约13,000条示例 | 与预训练数据量相差数个数量级 |
| SFT数据量 Llama 3 | 约10,000,000条示例 | Llama 3的指令微调规模 |
| LoRA典型Rank r | 4-16（常取4或8） | 远小于原始权重维度（数百至数千） |
| QLoRA VRAM节省 | 约16倍 | 量化+LoRA结合的显存压缩效果 |
| QLoRA量化格式 | NF4（Normal Float 4） | 针对正态分布权重的分位数量化 |
| LoRA学习率设置 | 全量微调的10倍 | 经验性发现，需要更高学习率补偿低秩限制 |
| 课程总时长 | 01:47:27（6447秒） | 约107分钟 |
| Common Crawl网页存档 | 每月约30亿网页 | 预训练主要数据来源之一 |

---

## 概念层级关系

```
LLM训练总流程
│
├── 1. 预训练（Pre-training）
│   ├── 目标：Next Token Prediction
│   ├── 数据：Common Crawl / Wikipedia / Reddit / GitHub / Stack Overflow
│   ├── 规模：数百亿~数万亿Token（GPT-3: 300B, Llama 3: 15T）
│   ├── 缩放定律（Scaling Laws）
│   │   ├── Kaplan et al. (2020)：算力↑ → 性能↑
│   │   └── Chinchilla定律：最优 Token ≈ 20 × Parameters
│   └── 挑战：成本、知识截断日期、Plagiarism
│
├── 2. 训练优化（Training Optimizations）← 支撑预训练
│   ├── 数据并行（Data Parallelism）
│   │   └── ZeRO（Stage 1/2/3）：分片优化器状态/梯度/参数
│   ├── 模型并行（Model Parallelism）
│   │   ├── Expert Parallelism（MoE专家分布）
│   │   ├── Tensor Parallelism（矩阵切分）
│   │   └── Pipeline Parallelism（层间分配）
│   ├── Flash Attention
│   │   ├── HBM vs SRAM的分层存储利用
│   │   ├── Tiling（分块）策略 + Softmax的子块可分离性
│   │   ├── Recomputation（重计算）减少HBM读写
│   │   └── 效果：HBM读写减少~10倍，运行时长也缩短
│   └── 量化与混合精度
│       ├── 量化：FP32 → FP16/BF16/INT8 → NF4
│       └── 混合精度：权重FP32 + 运算FP16 + 更新FP32
│
├── 3. 后训练（Post-training）= Alignment（对齐）
│   │
│   ├── 3a. SFT（Supervised Fine-Tuning）
│   │   ├── 任务：从预训练模型 → 有用助手
│   │   ├── 数据：Instruction-Response对（数千~数百万条）
│   │   ├── 与预训练的区别：只对输出计算损失
│   │   └── 评估：MMLU / GSM8K / 代码基准 / Chatbot Arena
│   │
│   ├── 3b. Instruction Tuning（指令调优）⊂ SFT
│   │   ├── 数据类别：故事写作/诗歌/列表/解释/数学/代码/安全
│   │   ├── 数据来源演变：纯人工 → LLM生成+人工/LLM审核
│   │   └── Alignment = SFT + Preference Tuning
│   │
│   └── 3c. Preference Tuning（RLHF/DPO）← 下节课内容
│
└── 4. 参数高效微调（PEFT）
    ├── LoRA（Low-Rank Adaptation）
    │   ├── W = W₀ + BA，r ≪ d（Rank 4-16）
    │   ├── 参数量降为 O(2dr) vs O(d²)
    │   ├── W₀冻结，只训练A和B
    │   ├── 实证：Attention层有效，但FFN块效果更显著
    │   └── 注意事项：需更高学习率（10×），大Batch表现下降
    │
    └── QLoRA（Quantized LoRA）
        ├── W₀：NF4量化（极低精度，大量节省显存）
        ├── A和B：BF16全精度训练
        ├── Double Quantization（二次量化缩放因子）
        └── 效果：VRAM节省约16倍
```

---

## 主题分类标签

`#预训练` `#NextTokenPrediction` `#ScalingLaws` `#Chinchilla定律` `#FLOPs计算` `#分布式训练` `#ZeRO` `#数据并行` `#模型并行` `#FlashAttention` `#Tiling` `#重计算` `#量化` `#混合精度训练` `#SFT` `#指令调优` `#Alignment` `#LoRA` `#QLoRA` `#参数高效微调` `#PEFT` `#NF4量化` `#迁移学习` `#混合专家` `#Elo排名` `#MMLU` `#Benchmark污染` `#MidTraining` `#PreferenceTuning`
