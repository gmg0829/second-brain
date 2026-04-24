---
title: "OpenMythos - Claude Mythos 架构的理论重建"
source: "https://github.com/kyegomez/OpenMythos"
author: "Kye Gomez"
created: 2026-04-21
tags:
  - "looped-transformer"
  - "recurrent-depth-transformer"
  - "claude-mythos"
  - "anthropic"
  - "ai-architecture"
  - "moe"
  - "pytorch"
description: "OpenMythos 是一个基于公开研究文献对 Claude Mythos 架构进行理论重建的开源项目，实现了 Recurrent-Depth Transformer (RDT)"
---

# OpenMythos - Claude Mythos 架构的理论重建

> **免责声明**：OpenMythos 是一个独立的、社区驱动的理论重建，基于公开可用的研究和推测。它与 Anthropic 或其任何专有系统无关、认可或连接。

## 项目概览

| 属性 | 值 |
|---|---|
| **GitHub** | [kyegomez/OpenMythos](https://github.com/kyegomez/OpenMythos) |
| **Stars** | 4,184 |
| **Forks** | 919 |
| **语言** | Python (PyTorch) |
| **创建时间** | 2026-04-18 |
| **许可证** | MIT |

OpenMythos 是一个开源的、理论上的 Claude Mythos 模型实现。它实现了一个**循环深度变换器 (Recurrent-Depth Transformer, RDT)**，包含三个阶段：
- **Prelude（前奏）**：标准Transformer块，运行一次
- **Recurrent Block（循环块）**：循环 T 次（最多 `max_loop_iters`）
- **Coda（终曲）**：标准Transformer块，运行一次

注意力可以在 MLA 和 GQA 之间切换，前馈网络使用稀疏 MoE（混合专家），具有路由专家和共享专家。

---

## 核心架构假设：循环深度变换器

Claude Mythos 被推测为一个**循环深度变换器 (RDT)**，也称为循环变换器 (Looped Transformer, LT)。它不是堆叠数百个不同的层，而是回收一小部分层，在每次前向传播中多次运行相同的权重。

```
输入
  ↓
[Prelude P]        — 标准 transformer 层，运行一次
  ↓
[Recurrent Block R] — 循环 T 次
  ↑_______↓         （隐藏状态 h 每次循环通过输入注入 e 更新）
  ↓
[Coda C]           — 标准 transformer 层，运行一次
  ↓
输出
```

这不是思维链 (Chain-of-Thought)。没有中间token输出。所有这些推理都发生在**单个前向传播内部**，在连续的潜在空间中进行。

---

## 关键技术创新

### 1. 循环块更新规则

在每个循环步骤 t：
- 隐藏状态 `h_t` 通过循环块更新
- 输入注入 `e` 将新的信息融入隐藏状态
- 相同的权重在每次循环中重复使用

### 2. 注意力机制

支持两种注意力类型：
- **MLA (Multi-head Latent Attention)**：多头潜在注意力
- **GQA (Grouped Query Attention)**：分组查询注意力

### 3. 稀疏 MoE（混合专家）

每个 FFN 被替换为细粒度 MoE 层：
- 每个 FFN 分割成许多小型专家（正常大小的 1/m）
- 路由器通过学习亲和度分数选择 top-mK 个专家
- 少量**共享专家**始终激活，无论路由如何
- 路由崩溃通过动态调整的偏置项防止

---

## 训练稳定性问题

循环模型训练著名的**不稳定**。两种失败模式主导：

- **残差爆炸** — 隐藏状态 `h_t` 在循环中无限增长
- **损失尖峰** — 由于注入参数的大谱范数，训练突然发散

### 动力系统视角

将循环视为离散线性时不变 (LTI) 动力系统：

```
h_{t+1} = A·h_t + B·e
```

稳定性完全由 **A 的谱半径** 决定：
- `ρ(A) < 1` → 稳定，收敛
- `ρ(A) ≥ 1` → 不稳定，发散

### 解决方案：Parcae 架构

约束注入参数以**从结构上保证**稳定性：

1. 将 A 参数化为连续负对角矩阵
2. 使用 ZOH/Euler 方案离散化：`A_discrete = exp(Δt · A_continuous)`
3. 通过 `A := Diag(-exp(log_A))` 强制负性，学习标量 `Δt`
4. 这确保 `ρ(A) < 1` 始终成立

---

## 模型变体

预配置规模从 1B 到 1T 参数：

| 变体 | `dim` | 专家数 | `expert_dim` | 循环次数 | 上下文 | 最大输出 |
|---|---|---|---|---|---|---|
| `mythos_1b` | 2048 | 64 | 2048 | 16 | 4k | 4k |
| `mythos_3b` | 3072 | 64 | 4096 | 16 | 4k | 4k |
| `mythos_10b` | 4096 | 128 | 5632 | 24 | 8k | 4k |
| `mythos_50b` | 6144 | 256 | 9728 | 32 | 8k | 4k |
| `mythos_100b` | 8192 | 256 | 13568 | 32 | 1M | 128k |
| `mythos_500b` | 12288 | 512 | 23040 | 48 | 1M | 128k |
| `mythos_1t` | 16384 | 512 | 34560 | 64 | 1M | 128k |

---

## 训练配置

| 特性 | 详情 |
|---|---|
| 优化器 | AdamW |
| 数据集 | `HuggingFaceFW/fineweb-edu` |
| 分词器 | `openai/gpt-oss-20b` via `MythosTokenizer` |
| 并行性 | PyTorch DDP via `torchrun` |
| 精度 | bfloat16 (H100/A100) |
| 学习率调度 | 线性预热 (2000 步) → 余弦衰减 |
| 目标 | 30B tokens |

---

## 深度推理的四大能力

### 1. 系统性泛化 (Systematic Generalization)

普通 transformer 无法组合训练中从未见过的知识。循环 transformer 通过了这个测试。能力通过**三阶段grokking过程**出现：

1. 记忆 — 模型拟合训练分布
2. 分布内泛化 — 模型处理已知的组合
3. 系统泛化 — 模型处理分布外的新颖组合，突然出现

### 2. 深度外推

在 5 跳推理链上训练，测试 10 跳。普通 transformer 失败，循环 transformer 成功 — 通过运行更多推理时循环。

推理时更多循环 = 更深的推理链 = 解决更难的问题

### 3. 潜在思维作为隐式思维链

每个循环迭代是思维链的一步的功能等价物，但在连续潜在空间而非 token 空间中操作。运行 T 个循环的循环模型隐式模拟 T 步 CoT 推理。

此外，连续潜在思维可以同时编码**多个替代下一步**，允许类似广度优先搜索的推理空间探索。

### 4. 无参数爆炸

k 层运行 L 次的循环模型达到 kL 层非循环模型的质量，但只有 k 层参数：

- 内存占用不随推理深度增长
- 推理时计算随循环次数缩放，而非模型大小
- 更深的推理在参数方面是"免费"的

---

## 循环索引嵌入假设

一个关键开放问题是循环块在每次迭代中是**相同**运行还是能够学习不同操作。

**RoPE 类循环索引嵌入**会允许相同参数实现功能不同的操作，每个循环迭代是独立的计算阶段。

---

## 过度思考问题

超过一定深度，过度循环会**降低预测** — 隐藏状态漂移到噪声中。

原始 Universal Transformer 使用**自适应计算时间 (ACT)** 停止机制：每个位置的学习标量动态决定何时停止循环。

---

## 连续深度批处理

循环架构的下游后果：**连续深度批处理**。因为所有 token 共享相同的循环块，模型可以在不同 token 或序列的不同深度退出循环 — 快速处理简单输入，在同一批次中用更多迭代处理困难输入。

理论分析表明 2-3x 的推理吞吐量改进。

---

## 总结：Mythos 可能是什么

| 特性 | 描述 |
|---|---|
| 架构 | 循环深度变换器 (Prelude + 循环块 + Coda) |
| FFN 层 | 推测 MoE — 细粒度专家 + 始终在线共享专家 |
| 参数数量 | 总数非常大；每个 token 激活一小部分（~5% 估计） |
| 推理机制 | 通过迭代潜在更新的隐式多跳 — 步骤之间无 token 输出 |
| 推理时缩放 | 更多循环 = 更深推理，遵循可预测的指数衰减 |
| 训练稳定性 | LTI 约束注入参数，谱半径 < 1 |
| 循环区分 | 可能使用循环索引位置嵌入（类 RoPE） |
| 停止 | 自适应计算时间或学习收敛准则 |
| 缩放律 | 最佳训练将循环和数据一起缩放，而不仅仅是参数 |
| 推理 vs 记忆 | 结构上偏向组合；记忆需要单独处理 |
| 部署 | 连续深度批处理为每个请求启用可变计算 |

---

## 安装和使用

```bash
pip install open-mythos
```

```python
import torch
from open_mythos.main import OpenMythos, MythosConfig

cfg = MythosConfig(
    vocab_size=1000,
    dim=256,
    n_heads=8,
    max_seq_len=128,
    max_loop_iters=4,
)

model = OpenMythos(cfg)
ids = torch.randint(0, cfg.vocab_size, (2, 16))
logits = model(ids, n_loops=4)
out = model.generate(ids, max_new_tokens=8, n_loops=8)
```

---

## 参考论文

- [Loop, Think, & Generalize — Implicit Reasoning in Recurrent Depth Transformers](https://arxiv.org/pdf/2604.07822)
- [Parcae — Scaling Laws for Stable Looped Language Models](https://arxiv.org/abs/2604.12946)
- [Universal Transformers](https://arxiv.org/pdf/1807.03819)
- [Reasoning with Latent Thoughts — On the Power of Looped Transformers](https://arxiv.org/abs/2502.17416)
- [Training Large Language Models to Reason in a Continuous Latent Space](https://arxiv.org/abs/2412.06769)
- [Relaxed Recursive Transformers — Effective Parameter Sharing with Layer-wise LoRA](https://arxiv.org/pdf/2410.20672)
- [Mixture-of-Depths Attention](https://arxiv.org/abs/2603.15619)

---

## 相关资源

### Twitter/X 讨论

- [Why Claude Mythos is so good — looped transformer theory (Sigrid Jin)](https://x.com/realsigridjin/status/2044620031410266276)
- [LT implicit reasoning over parametric knowledge (Yuekun Yao)](https://x.com/yuekun_yao/status/2044229171627639004)
- [Parcae scaling laws (Hayden Prairie)](https://x.com/hayden_prairie/status/2044453231913537927)
- [RoPE-like loop index embedding (davidad)](https://x.com/davidad/status/2044453231913537927)