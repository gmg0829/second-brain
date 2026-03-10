# Andrej Karpathy：大型语言模型入门总结

> 来源：[YouTube - Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g)
> 嘉宾：Andrej Karpathy（OpenAI 创始成员，前特斯拉 AI 总监）
> 日期：2024年

## 核心要点

### 什么是 LLM？

**大型语言模型 (Large Language Model)** 是经过训练的神经网络，能够根据给定的文本预测下一个 token（词元）。

**训练过程：**
1. **预训练** - 在海量互联网文本上训练，预测下一个 token
2. **微调** - 在高质量数据上进行监督学习和人类反馈对齐

### Tokenization（分词）

- 将文本转换为 token（词元）
- 常见方法：BPE（Byte Pair Encoding）、WordPiece
- 一个 token ≈ 0.75 个英文单词
- GPT-4 使用 32k token 词汇表

### Transformer 架构

- **核心组件**：Multi-Head Attention + Feed Forward Network
- **自注意力机制**：让每个 token 关注其他所有 token
- **位置编码**：为序列添加位置信息
- **残差连接**：帮助训练深层网络

### 训练数据规模

| 模型 | 训练 token 数 |
|------|--------------|
| GPT-3 | 300B |
| GPT-4 | 13T (估计) |
| LLaMA 2 | 2T |

### 涌现能力

当模型规模足够大时，会出现**涌现能力**：
- 零样本学习
- 思维链推理
- 指令跟随
- 代码编写

### 提示工程 (Prompt Engineering)

**基础技巧：**
1. **Few-shot** - 给几个示例
2. **思维链** - "Let me think step by step"
3. **角色扮演** - "You are a helpful assistant"

**高级技巧：**
- **ReAct** - 结合推理和行动
- **Self-Consistency** - 多次采样取多数
- **Tree of Thoughts** - 探索多种思路

### LLM 的局限

1. **幻觉** - 生成虚假信息
2. **知识截止** - 不了解最新信息
3. **上下文限制** - 有限的上下文窗口
4. **计算成本** - 推理需要大量 GPU
5. **偏见** - 可能反映训练数据中的偏见

### Agent 系统

LLM 作为 Agent 时的组件：
- **Tool Use** - 调用外部工具（搜索、代码执行）
- **Memory** - 短期记忆（上下文）+ 长期记忆（向量数据库）
- **Planning** - 任务分解和规划
- **Reflection** - 自我反思和改进

### RAG (检索增强生成)

结合外部知识库：
1. 将文档转换为向量
2. 检索相关文档
3. 将检索结果加入 prompt
4. 生成回答

### 开源模型生态

- **LLaMA** - Meta 开源
- **Mistral** - 高性能
- **Falcon** - 阿布扎比
- **Qwen** - 阿里巴巴

### 未来展望

1. **多模态** - 图像、音频、视频理解
2. **长上下文** - 百万级 token 窗口
3. **Agent 架构** - 更强大的任务执行能力
4. **模型蒸馏** - 小模型也能有大能力
5. **自定义模型** - 个人专属 AI

## 精彩语录

> "LLM 就像一个超级强大的压缩器，把互联网上的知识压缩到了神经网络权重中"

> "AI 不会取代程序员，但使用 AI 的程序员会取代不会使用 AI 的程序员"

> "提示工程不是魔法，而是理解模型行为的方式"

> "最重要的技能是学会如何与 AI 有效沟通"

## 相关资源

- [Karpathy 的 makemore 教程](https://www.youtube.com/watch?v=PaCmpygFfXo)
- [Karpathy 的神经网络入门](https://cs231n.github.io/)
- [nanoGPT 代码库](https://github.com/karpathy/nanoGPT)

---
*🦞 由 OpenClaw 整理*
