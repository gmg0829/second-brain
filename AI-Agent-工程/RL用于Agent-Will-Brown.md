# RL for Agents | Will Brown (Morgan Stanley)

## 概述

本次演讲来自 AI Engineer Summit 2025 Agent Engineering Session，演讲者 Will Brown 是摩根士丹利的机器学习研究员，曾在哥伦比亚大学从事多智能体强化学习理论的研究。演讲主要探讨强化学习（RL）对 AI Agent 的意义，分析当前技术瓶颈与未来发展方向。

演讲核心观点：当前 LLM 已经很好地解决了 Chatbots 和 Reasoners 问题（对应 OpenAI 五级框架的一、二级），但要迈向第三级——真正的 Agents（能够执行长期、复杂任务的自主系统），传统的 Prompt Engineering 和工作流编排已显不足，强化学习可能是突破的关键。

---

## Agents vs Pipelines（工作流）的本质区别

| 维度 | Pipelines（工作流） | Agents（智能体） |
|------|---------------------|------------------|
| **自主程度** | 低，通常需要人类频繁介入 | 高，能够独立运行较长时间 |
| **决策方式** | 预定义的决策树，调用顺序固定 | 通过探索-反馈机制自主学习策略 |
| **反馈循环** | 紧耦合，用户全程把控 | 松耦合，系统自主优化 |
| **典型例子** | Cursor, Windsurf, Replit, 搜索工具 | Devon, Operator, OpenAI Deep Research |
| **运行时间** | 通常秒级到分钟级 | 可达数十分钟以上 |
| **优化方式** | Prompt 调优、规则调整 | RL 持续自我改进 |

当前大多数所谓 "Agent" 实际上更接近 Pipelines：用户通过界面交互，指定任务，系统快速执行并返回结果。真正能够离开用户执行超过 10 分钟的自主 Agent 屈指可数，业界仍在探索如何规模化复制这类能力。

---

## OpenAI 五级推理框架

```
Level 1: Chatbots        → 对话式问答，固定交互
Level 2: Reasoners       → 深度推理（o1/o3, R1, Grok-3, Gemini 等）
Level 3: Agents          → 自主行动，执行长期复杂任务  ← 当前探索阶段
Level 4: Innovators      → 创新发现，科学研究
Level 5: Organizations   → 组织级自主运行
```

现状总结：
- Level 1 (Chatbots)：已相当成熟，广泛应用
- Level 2 (Reasoners)：o1、o3、R1、Grok-3 等模型表现优异，长思维链自然涌现
- Level 3 (Agents)：仍在探索中，主要通过链式调用底层 LLM 实现，辅以 Prompt Engineering、Tool Calling、Human-in-the-Loop

---

## 为什么预训练 Scaling 正在遭遇瓶颈

### 预训练的局限

- **数据效率递减**：虽然 loss 仍在下降，但边际收益越来越小
- **RLHF 的天花板**：RLHF 擅长打造"友好的聊天机器人"，但无法持续推动模型向更高智能演进
- **合成数据的蒸馏局限**：合成数据非常适合将大模型知识蒸馏到小模型（让小模型保持高性能），但单独依赖合成数据无法实现能力的持续突破

### 突破方向：强化学习 + 验证机制

单纯的合成数据 generation 不够，需要在循环中加入：
- **Rejection Sampling（拒绝采样）**：生成多个答案，只保留正确的
- **Verification in the Loop（环内验证）**：用验证器检查输出质量
- **Test-Time Scaling（测试时 scaling）**：o1、o3、R1 的核心技术

这正是 RL 发挥关键作用的地方——它不依赖人工标注数据，且确实有效。

---

## DeepSeek R1 的突破性意义

2024 年底 DeepSeek 发布 R1 模型和技术论文，是领域的里程碑事件：

### R1 的核心机制

```
问题输入 → 模型生成多个解法路径 → 验证器评分 → RL 更新模型策略
        → 反复迭代 → 模型学会更长思维链 + 自我纠正
```

### 关键发现

- **长思维链是涌现（Emergent）行为**，而非人工编程写入：模型在 RL 过程中自发发现"先思考再回答"是更好的策略
- **不是靠 10,000 个 token 的人工推理数据训练出来的**，而是通过 RL 让模型自己学到
- **本质就是 Explore & Exploit**：尝试不同解法，强化有效的，丢弃无效的

### 开源影响

- R1 论文首次公开披露了构建 o1 类模型的具体算法和工程细节
- 开源社区随即掀起复现热潮和知识蒸馏（小模型也能获得推理能力）

---

## GRPO 算法详解

GRPO（Group Relative Policy Optimization）是 DeepSeek 使用的核心 RL 算法，概念简洁但极其有效：

### 算法流程

```
1. 给定一个 Prompt
2. 采样 N 个不同的 Completion（多个答案）
3. 对这 N 个答案分别打分
4. 告诉模型：多模仿高分答案，少模仿低分答案
```

### 形式化表达

```python
# GRPO 核心更新规则（简化版）
for each prompt:
    responses = [model.generate(prompt) for _ in range(N)]
    scores = [reward_model(response) for response in responses]

    # 计算相对优势：比较同组内不同答案的相对分数
    advantages = normalize(scores - mean(scores))

    # 策略更新：增大高分答案的概率，降低低分答案的概率
    model.update(advantages)
```

### 与传统 RLHF 的区别

| 对比维度 | RLHF | GRPO |
|----------|------|------|
| 反馈来源 | 人工标注的偏好数据 → 训练 Reward Model | 直接用任务指标（答案对错）打分 |
| 数据需求 | 需要大量人工标注，成本高 | 只关心最终结果是否正确 |
| 可扩展性 | 受限于人工数据产量 | 可自动化生成合成数据 |
| 适用场景 | 对话风格、人类偏好 | 有明确对错标准的任务（数学、代码） |

---

## Rubric Engineering（评分规则工程）

演讲者提出的核心概念，指设计 Reward 评分规则的艺术：

### 基本思想

- 传统观点：Reward 就是"答案对不对"（二元判断）
- Rubric Engineering：Reward 可以更精细，设计多维度评分规则

### 实践案例

```python
# 基础版：二元 reward
reward = 1.0 if answer == correct_answer else 0.0

# Rubric Engineering 版：多维度 reward
reward = 0.0
if follows_xml_format:      reward += 0.1  # 遵循 XML 结构
if uses_integer_tag:        reward += 0.1  # 使用正确的标签格式
if has_reasoning_content:   reward += 0.2  # 有推理过程
if final_answer_correct:    reward += 0.6  # 最终答案正确
```

### 设计原则

- **奖励格式遵循**：让模型学会正确的输出结构
- **部分信用分配**：答案方向对但未完全正确也给分，引导模型学习中间步骤
- **使用 LLM 作为 Judge**：用更强的模型自动评判输出质量
- **谨防 Reward Hacking**：模型可能"作弊"获得高 reward 而非真正学到技能

### Reward Hacking 的风险

模型可能找到评分漏洞，例如：
- 生成看似合理但实际无意义的推理过程来骗取"有推理内容"的分数
- 关键解法：确保 Reward 信号真实反映任务目标，设计难以绕过的评测机制

---

## OpenAI Deep Research 的案例分析

### 技术特点

- **端到端强化学习训练**：OpenAI 官方确认
- **工具调用能力强**：单次任务最多调用上百次浏览器/网络查询
- **成果质量高**：对于复杂研究型任务表现令人印象深刻

### 现存局限

- 不能像 AGI 那样在代码仓库中自主工作
- 复杂软件工程任务能力不足
- 对分布外（Out-of-Distribution）任务表现下滑
- 需要大量手动计算的表格任务仍容易出错

### 启示

RL 可以解锁新技能、提升自主性，但目前尚未达到"万能 Agent"的水准。第三级 Agents 的实现仍需要大量研究与工程突破。

---

## 自主 Agent 的核心挑战

| 挑战 | 描述 | 可能的解决方向 |
|------|------|---------------|
| **长时序依赖** | 早期决策影响后期结果，信用分配困难 | Hierarchical RL, 蒙特卡洛树搜索 |
| **探索空间庞大** | 百万种可能行动路径，无法穷举 | 环境设计、课程学习 |
| **奖励信号稀疏** | 可能走完整个流程才发现失败 | Hindsight Experience Replay, 好reward shaping |
| **分布漂移** | 训练环境与生产环境差异大 | Domain Randomization |
| **Reward Hacking** | 模型作弊而非真学 | 组合多种验证器、多维度 Reward |
| **样本效率** | RL 通常需要海量交互数据 | Offline RL, 模拟环境加速 |

---

## AI 工程师在 RL 时代的角色转变

### 从 Prompt Engineering 到 Rubric Engineering

当前很多工程师的日常工作（设计 Evals、调试 Prompts）与 RL 时代的核心技能高度重叠：

```
传统 AI Engineering          →    RL 时代的 AI Engineering
─────────────────────────────────────────────────────────
设计 Eval 评测指标          →    设计 Reward Rubric 评分规则
构建 Prompt 引导模型输出     →    构建 Environment 让模型探索学习
优化对话交互体验            →    优化探索策略和信用分配机制
人类反馈偏好标注            →    自动验证器和合成数据生成
```

### 基础设施需求

- **多步骤环境模拟器**：让 Agent 在仿真环境中反复训练
- **高效的 RL 训练框架**：类似 HuggingFace GRPO Trainer
- **好的工具生态**：监控、调试、可视化 RL 训练过程
- **模型供应商的支持**：期待 OpenAI 等提供的 Fine-tuning + RL API

### Fine-Tuning 的回归

- 开源与闭源模型差距已显著缩小
- 小模型经过 RL 调优后可在特定任务上超越大模型
- RL 训练通常需要模型参数可更新（而非只能 API 调用）

---

## 演讲者开源项目：Multi-Step RL Framework

演讲者在 R1 发布后一周内用单个 Python 文件复现了基础 RL 训练流程，引发社区广泛关注。

### 设计理念

- 极简代码（单文件），邀请社区参与修改和扩展
- 封装为 Framework：用户只需定义 Environment + Reward，训练循环自动完成
- 支持多步骤决策场景（而非单轮对话）

### 核心架构

```python
# 用户只需要定义：
class MyEnv:
    def reset(self):         # 初始化环境
        return initial_state

    def step(self, action):  # 执行一步，返回 (next_state, reward, done)
        return next_state, reward, done

# 框架自动完成：
# - 多次 rollout 探索
# - 计算 reward
# - 策略更新
# - 循环迭代直到收敛
```

---

## 关键结论与展望

### 核心洞察

1. **LLM 预训练 Scaling 已遇瓶颈**，数据效率递减是事实
2. **RLHF 可以打造好用的聊天机器人，但无法持续提升智能**
3. **合成数据 + 验证 + RL 才是 o1/R1 类模型的技术突破关键**
4. **RL 的本质是让模型通过"试错-反馈"学会更好的解题策略**，而非人工写死推理路径
5. **长思维链是涌现现象**：模型自己发现"先思考再回答"更有效

### 未来展望

- **RL Agent 生态基础设施将是巨大的机会**：训练框架、环境模拟器、监控工具、Ranking 服务
- **Prompt Engineering 不会消失**：但会演化为 Rubric Engineering + Eval Design
- **Fine-tuning 回归**：开源模型进步让本地 RL 训练成为可能
- **第五级（Organizations）仍是遥远目标**：需要多个 Agent 协作、自主学习和自我改进

---

*来源：AI Engineer Summit 2025, Agent Engineering Session*
