---
title: "Robotics' End Game: Nvidia's Jim Fan"
source: https://www.youtube.com/watch?v=3Y8aq_ofEVs
channel: Sequoia Capital
date: AI Ascent 2026
duration: 20分3秒
cover: images/cover.jpg
description: "Jim Fan, Nvidia 嵌入式自主研究团队负责人, 提出机器人学正在进入终局——而且 playbook 已经写好。他提出"大平行"理论：机器人学正遵循 LLM 的路径（预训练→推理→自动研究），但用世界模型替代语言模型、用自我中心视频替代遥操作、用世界动作模型替代 VLA 范式。"
---

# Robotics' End Game: Nvidia's Jim Fan

**来源**：Sequoia Capital AI Ascent 2026
**嘉宾**：Jim Fan（Nvidia 嵌入式自主研究团队负责人）
**视频长度**：20分3秒，10个章节

---

## 一、核心主旨：大平行（The Great Parallel）

> "如果你不能在比赛中打败他们，就加入他们。"

Jim Fan 认为机器人学正在**完整复制 LLM 的成功路径**，只是换了具体形式：

| LLM 阶段 | 机器人学对应 |
|---------|-------------|
| GPT-3：预训练（下一个 token 预测） | **Video World Models**：预测下一个物理世界状态 |
| InstructGPT：监督微调对齐 | **Action Fine-tuning**：对齐所有可能未来状态 onto 机器人动作 |
| 01：强化学习推理 | **DreamZero**：用 RL carry 最后一步 |
| Auto Research：加速整个循环 | **DreamDojo**：大规模并行 RL 系统 |

### 终局游戏的两大战略

```
1. 模型战略（Model Strategy）
2. 数据战略（Data Strategy）
```

---

## 二、模型战略

### 2.1 为什么 VLA 失败

过去 3 年主导范式：**VLA（Vision-Language-Action Models）**——如 Pi 和 Groot。

但实际上这些模型是 **LVA**（Language-heavy Vision-Action）：
- 大部分参数用于语言 → 语言是一等公民
- 视觉和动作是配角
- **对名词编码能力强，但对物理学和动词能力弱**

经典反例（VLA 论文）：
> "Move the Coke can to a picture of Taylor Swift"
> 能泛化到从没见过的人，但这不是我们想要的预训练能力。

### 2.2 Video World Models 作为预训练

**Veo-3 等视频模型**在预测下一帧像素时，自发学会了很多物理规律：
- 重力、浮力
- 光照、反射、折射
- 视觉规划（maze 解决）

> "这些不是代码编写的——物理规律是规模化预测下一个像素时自发涌现的。"

Jim 称之为 **"physics slop"**——最爱的例子：Veo-3 发现"如果你不看着，几何是可选的"。

### 2.3 DreamZero：世界动作模型（WAM）

**DreamZero** = 新一类策略模型

- **输入**：自然语言指令
- **工作方式**：梦见未来几秒的世界 + 动作，然后执行
- 视觉和动作现在是**一等公民**
- zero-shot 解决训练中从未见过的动词任务

核心洞察：
- 如果视频预测 work → 动作就 work
- 如果视频 hallucinate → 动作就 fail

> "DreamZero 是我们迈向开放词汇机器人提示的第一步——我们称之为 World Action Models（WAM）。"

**VLA 安息吧。世界动作模型万岁。**

---

## 三、数据战略

### 3.1 遥操作的问题

过去 3 年是遥操作黄金时代——但有根本物理限制：

| | 遥操作 |
|---|--------|
| **上限** | 每机器人每天 24 小时（实际上约 3 小时） |
| **现实** | 机器人经常罢工、发脾气 |

> "Bill Dally（Nvidia 首席科学家）亲自做遥操作——以他的工资，这是我们数据集里有史以来最贵的遥操作轨迹。"

### 3.2 UMI：通用操作接口

**UMI（Universal Manipulation Interface）**——用机器人执行器直接戴在手上，绕过机器人身体收集数据。催生了**两家独角兽**（Genesis 和 Sunday）。

### 3.3 Dex UMI：外骨骼数据手套

将 UMI 理念扩展到**五指灵巧手**：

```
人类直接收集（最快）  ←→  外骨骼（DEX UMI）  ←→  遥操作（最慢、最难）
```

- 训练 0 遥操作数据 → 完全自主策略
- 打破"每机器人每天 24 小时"的诅咒

### 3.4 EgoScale：自我中心视频预训练

**EgoScale** 的核心数据：

| 数据类型 | 数量 |
|---------|------|
| 预训练（人类自我中心视频） | **21,000 小时** |
| 动作微调（精密 mocap 数据手套） | **50 小时** |
| 遥操作 | **4 小时**（< 0.1%） |

- 21K 小时 in-the-wild 自我中心视频
- 零机器人数据预训练
- 预测手部关节和手腕姿态
- 然后 action fine-tuning 到 22 自由度灵巧手机器人手

**最惊人的发现：发现了灵巧度的神经 scaling law**
- log-linear 数学关系（6 年后终于有了语言模型的 scaling law 版）
- 预训练小时数 vs 验证损失，完美曲线

### 3.5 数据战略图谱

```
X 轴：机器人硬件对齐度
Y 轴：可扩展性

遥操作                    → 最不可扩展
数据可穿戴设备             → 数十万小时
自我中心视频（如果 FSD 飞轮）→ 轻松 1000 万小时+/年
```

**预测**：
- 1-2 年内，遥操作将降至可以忽略
- 数据可穿戴设备将大爆发
- 最终主流：自我中心视频

### 3.6 物理世界的 Real-to-Sim

**Digital Cousins**：
- iPhone 拍照 → 3D 世界扫描 → 提取所有物体
- 在经典物理模拟器中自动综合
- 所有物体都是可交互的
- 无限增强模拟中的变体

### 3.7 DreamDojo：神经模拟器

将视频世界模型变成**完整的神经模拟器**：

- 输入：连续动作信号
- 输出：下一帧 RGB + 传感器状态（实时）
- **没有一个像素是真实的**
- 纯数据驱动学习力学，无物理方程，无图形引擎

**最终后训练范式**：
```
大规模并行 RL 系统
= 少量真实机器人站
+ 图形核心跑世界扫描
+ 重推理计算跑世界模型

→ compute now = environment now = data
```

---

## 四、Roadmap：三个待解锁成就

Jim Fan 用文明（Civilization）游戏比喻技术树——机器人学还有**三个成就待解锁**：

### 成就一：物理图灵测试（2-3 年）

- 在广泛任务中，你无法区分是人类还是机器人完成任务
- **不是**醉酒状态下的人类（那种图灵测试还早）
- 单位能耗产出：机器人得做到和人类一样的 pose

### 成就二：物理 API

- 机器人舰队可以通过 API 和命令行配置
- Opus 9.0 编排
- 实现**熄灯工厂**（lights-out factories）——输入 markdown 设计文件，输出完全组装的产品
- 自动化化学/生物学/医学的 wet labs

### 成就三：物理 Auto Research

- 机器人开始设计、改进、制造下一代机器人
- 超越人类可能的迭代速度

---

## 五、金句摘录

| # | 金句 |
|---|------|
| 1 | "If you can't beat them, join them. The great parallel, copying the LLM success." |
| 2 | "Physics emerge by predicting the next blob of pixels at scale." |
| 3 | "VOAs are great at encoding knowledge and nouns, but not so much at physics and verbs." |
| 4 | "Rest in peace VOAs. Long live world action models." |
| 5 | "It's able to zero-shot solve tasks and verbs that it has never seen in training." |
| 6 | "If the video prediction works, the action works. If the video hallucinates, the action fails." |
| 7 | "We were able to break the curse of 24 hours per robot per day." |
| 8 | "We discovered this neural scaling law for dexterity. It's a very clean log-linear mathematical equation." |
| 9 | "In the next year or two, we'll see teleop dropping to almost negligible amount." |
| 10 | "Compute now equals environment now equals data. The more you buy, the more you save." |
| 11 | "Our generation was born too late to explore the Earth and too early to explore the stars, but we are born just in time to solve robotics." |

---

## 六、关键数据点

| 指标 | 数值 |
|------|------|
| EgoScale 预训练数据 | 21,000 小时人类自我中心视频 |
| EgoScale 遥操作数据 | 4 小时（< 0.1%） |
| EgoScale 动作微调数据 | 50 小时 mocap 数据手套 |
| 机器人手自由度 | 22 DOF |
| 物理图灵测试预计时间 | 2-3 年 |
| 终局完成预计时间 | 2040 年（95% 信心） |
| AlexNet → AI Ascent | 14 年（2012 → 2026） |
| 视频时长 | 20 分 3 秒 |

---

## 七、技术路径对比

| 维度 | LLM 路径 | 机器人学对应 |
|------|---------|-------------|
| 预训练 | 下一个 token（语言） | 下一个像素（视频世界模型） |
| 对齐微调 | SFT | Action Fine-tuning |
| 推理扩展 | RL（01/02） | DreamZero（World Action Models） |
| 数据收集 | 互联网文本 | 自我中心视频（EgoScale） |
| 模拟 | - | DreamDojo（神经物理引擎） |
| 最终阶段 | Auto Research | Physical Auto Research |

---

## 八、主题分类标签

`Nvidia` `Jim Fan` `Robotics` `The Great Parallel` `World Action Models` `DreamZero` `EgoScale` `DreamDojo` `VLA` `UMI` `Dex UMI` `Physical Turing Test` `Physical API` `Sequoia Capital` `AI Ascent 2026` `Scaling Laws` `Digital Cousins` `Real-to-Sim` `End Game`
