# MiniMax-M2 深度解析

> 模型地址: https://github.com/MiniMax-AI/MiniMax-M2
> HuggingFace: https://huggingface.co/MiniMaxAI/MiniMax-M2
> Stars: 2,562 | 参数规模: 230B total / 10B active (MoE) | 发布时间: 2025-10-25

---

## 一、核心定位

MiniMax-M2 是 MiniMax 公司发布的 MoE 大语言模型，专门针对 coding 和 agentic workflows 优化。

slogan: "Mini model built for Max coding & agentic workflows"

核心理念: 用 10B 激活参数达到接近前沿模型的 coding/agent 能力，同时降低延迟和成本。

```
总参数量:     230B
激活参数:     10B (每次前向只激活 8/256 个 experts)
上下文长度:   196,608 tokens
发布:        2025-10-25
```

---

## 二、架构解析

### 2.1 MoE 配置 — 核心创新

```json
"num_local_experts": 256        // 256 个专家
"num_experts_per_tok": 8        // 每 token 路由到 8 个专家
"scoring_func": "sigmoid"        // 用 sigmoid 而非 softmax
"shared_moe_mode": "sigmoid"
"router_aux_loss_coef": 0.001    // 负载均衡辅助损失
"use_routing_bias": true
"router_jitter_noise": 0.0
```

#### Sigmoid Routing — 与所有主流框架的根本差异

Softmax routing (Llama/Mixtral):

score_i = softmax(w_i dot x)
-> 所有 expert 得分之和 = 1.0，每个 expert 的得分是"相对"优势

Sigmoid routing (MiniMax-M2):

score_i = sigma(w_i dot x) = 1 / (1 + exp(-w_i dot x))
-> 每个 expert 独立映射到 (0, 1)
-> 8 个 expert 得分之和可以是任意值

Sigmoid 的核心优势:

1. 独立评分 -- 每个 expert 独立判断"我是否擅长这个 token"
2. 真正的 top-K -- 不受归一化影响，真正选择得分最高的 K 个 expert
3. 训练稳定性 -- sigmoid 梯度更平滑，避免 softmax 的"赢者通吃"
4. 负载均衡 -- 更容易通过辅助 loss 平衡 expert 使用率

规模对比:

- Llama 4: 16 experts
- Mixtral 8x7B: 8 experts
- MiniMax-M2: 256 experts

### 2.2 注意力机制

```json
"num_attention_heads": 48           // Query heads
"num_key_value_heads": 8             // KV heads (GQA)
"head_dim": 128                      // 每 head 的 dimension
"hidden_size": 3072                   // = 48 * 64
"qk_norm_type": "per_layer"          // 每层独立 QK Norm
"use_qk_norm": true
```

GQA（Grouped Query Attention）:

- 48 个 Q heads 分成 8 组，每 6 个 Q head 共享 1 个 KV head
- 标准 MHA 需要 48 个 KV heads，GQA 只需 8 个
- KV cache 从 48 份降到 8 份，显存大幅减少

QK Norm（Per-Layer）:

每层独立的 QK Norm，对 Q/K 应用 RMSNorm，防止注意力分数数值爆炸。类似于 Llama 3 的设计。

### 2.3 Transformer 配置

```json
"num_hidden_layers": 62            // 62 层
"hidden_act": "silu"              // SiLU
"intermediate_size": 1536         // 细粒度 Expert FFN size
"mlp_intermediate_size": 8192    // Shared FFN size
```

MoE + Shared MLP 双路径:

- MoE path: 8/256 experts，每个 expert FFN hidden = 1536
- Shared path: 共享 MLP，FFN hidden = 8192（每个 token 都经过）

每个 Transformer 层有两套 FFN: shared_mlp (8192) + moe_experts (256 x 1536)。

### 2.4 推理优化

```json
"quantization_config": {
  "fmt": "float8_e4m3fn",         // FP8 E4M3 量化
  "quant_method": "fp8",
  "activation_scheme": "dynamic",
  "weight_block_size": [128, 128],
  "modules_to_not_convert": [
    "gate", "e_score_correction_bias", "lm_head"
  ]
}
```

- 权重 block-wise FP8 (128x128 blocks)
- Activation 动态量化
- gate/e_score_correction_bias/lm_head 保持 FP16/BF16 精度
- 230B 模型 FP8 量化后，单机 4x80GB 可运行

### 2.5 位置编码

```json
"rope_theta": 5000000             // 较高的 base frequency
"rotary_dim": 64                   // RoPE 维度
"max_position_embeddings": 196608 // 最大 192K tokens
```

- RoPE 旋转位置编码，支持超长上下文
- theta = 5M，有利于长距离位置编码

---

## 三、MTP（Multi-Token Prediction）

```json
"use_mtp": true,
"num_mtp_modules": 3,
"mtp_transformer_layers": 1
```

3 个 MTP 模块，每层 1 个额外 Transformer 层

1. 训练效率 -- 每个 token 的预测实际包含 N 个后续 token 的嵌入
2. 投机解码加速 -- 推理时用小 MTP 生成候选 token，大模型验证

---

## 四、Chat Template — 工具调用格式

MiniMax-M2 使用 XML 格式的工具调用:

```
<minimax:tool_call>
<invoke name="tool-name">
<parameter name="param-key">param-value
__hermes_rc=$?
printf '__HERMES_FENCE_a9f7b3__'
exit $__hermes_rc
