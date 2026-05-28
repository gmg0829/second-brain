# FDE playbook：AI 创业公司的前线工程师模式

**视频标题**：The FDE Playbook for AI Startups with Bob McGrew
**来源**：Y Combinator（The Lightcone）
**嘉宾**：Bob McGrew（PayPal 早期工程师 → Palantir 高管 → OpenAI 首席研究官，曾领导 ChatGPT/GPT-4/o1 的开发）

---

## 一、谁是 Bob McGrew

Bob McGrew 是一位横跨三个时代的建设者：

- **PayPal 早期工程师**：见证了从 0 到 1 的创业早期
- **Palantir 高管**：在那里发明并落地了 Forward Deployed Engineer（FDE）模式
- **OpenAI 首席研究官**：领导了 ChatGPT、GPT-4 和 o1 推理模型的研发
- **现任**：美国陆军预备役中校，加入了陆军 2011 分遣队，参与陆军数字化转型

---

## 二、什么是 FDE（前线部署工程师）

> **定义**：FDE 是一位技术工程师，驻扎在客户现场，填补"产品能做什么"和"客户真正需要什么"之间的 gap。

### FDE 的核心工作方式

1. 带着产品 Demo 拜访新客户
2. 客户说"这完全不对"，FDE 问"那你希望它怎么改？"
3. FDE 在现场快速记录、构建、迭代
4. 把"碎石路"（临时解决方案）修好
5. 产品团队将其抽象为"高速公路"（可复用的通用能力）

### FDE vs 传统销售驱动的产品发现

| 维度 | 销售驱动 | FDE 驱动 |
|------|----------|-----------|
| 信息来源 | 外部沟通 | 内部深度参与 |
| 解决问题的方式 | 客户描述的问题 | 亲临现场观察到的真实痛点 |
| 迭代速度 | 慢，反馈链条长 | 快，原地验证 |

---

## 三、Palantir 如何发明 FDE 模式

### 背景：卖给情报机构的特殊困境

Palantir 最早的软件是卖给**间谍**的。问题是：你根本不认识间谍，间谍也不会告诉你他们做什么。

### 解决方案：Demo 驱动 + 现场定制

- Stephen Cohen（Palantir 创始人）带着 Demo 去见情报客户
- 客户说"这完全不相干"，他问"那你希望怎么改？"
- 客户开始提需求，他当场记录

### 关键洞察

传统的 Crossing the Chasm 思维是：
> 发现产品市场契合后 → 拥抱距离感 → 标准化复制

但 Palantir 发现他们的市场**根本不适用这种模式**——每个客户的需求都略有不同（情报、反恐、执法、军事……）。

于是 Shyam Sankar（Palantir CTO）发明了 FDE 策略：

> **不要把客户需求看成问题，而要把"在每个客户现场做定制"变成一种可规模化的竞争优势。**

### FDE 的核心飞轮

```
客户现场 FDE 做定制
        ↓
产品团队从多个 FDE 案例中抽象出通用能力
        ↓
下一个客户使用通用能力，降低 FDE 成本
        ↓
FDE 可以做更复杂、更值钱的工作
        ↓
合同变大，循环往复
```

---

## 四、Echo 团队和 Delta 团队

Palantir 的 FDE 组织分成两类角色：

### Echo 团队（嵌入式分析师）

- 驻扎客户现场，与用户深度沟通
- 找到"这个客户最关键的问题是什么"
- 同时也是客户关系管理者
- **画像**：来自目标领域的专家（如前军官、医疗从业者），但必须是"叛逆者/异见者"——他们深刻理解现状的不足，才能推动变革

### Delta 团队（FDE 软件工程师）

- 快速原型开发能力极强，能"吃痛"（eating pain）
- 写的代码可能第一版就要扔掉
- **画像**：不是完美主义工匠，而是能快速交付结果的人

> **FDE 工作体验 ≈ 创始人体验**：你在每个客户现场都是一个小型创始人，但手上有强大的产品杠杆。

---

## 五、FDE 不是咨询，而是平台

### 区分 FDE 和咨询的关键指标

**财务模型**：

- 早期部署可能亏钱
- 随着产品在客户现场越来越适配，所需的 FDE 人数下降
- 同时 FDE 在解锁更高价值的用例
- **成本效益比持续下降，最终转正**（通常需要 1 年或更久）

### 如何防止 FDE 模式退化成"纯咨询"

核心纪律：

1. **FDE 必须在 CEO 前 5 大优先事项上工作**——如果不在优先级上，企业不会陪你走过漫长的定制化过程
2. **产品团队负责抽象**：FDE 修"碎石路"，产品团队修"高速公路"
3. **定期拉多个客户的 FDE 一起参与产品设计会议**——让不同客户看到的相似工作流帮助识别通用模式
4. **FDE 和产品团队激励对齐**：FDE 修路，产品团队铺路，两者目标一致才能协作

### Palantir Ontology 的诞生故事

最经典的例子：最初他们讨论"应该有人表、钱表、这表那表"——但这在跨客户部署时完全不合理。

最终决定：

> 把数据库 schema 设计为极度通用的**对象（objects）、属性（properties）、链接（links）**，具体类型由每个客户现场的 FDE 来定义。

---

## 六、为什么 AI 公司现在疯狂采用 FDE 模式

### 核心原因：没有现成产品可抄

| 传统 SaaS | AI Agent |
|-----------|---------|
| 有明确的现有产品类别 | **没有在位产品** |
| 可以对比竞品 | 不知道市场边界在哪 |
| 产品市场契合后可以标准化复制 | 需要**持续的产品发现** |
| 客户知道自己要什么 | 客户也不知道 AI 能解决什么 |

> Bob 原话："With AI agents, there is no incumbent product. And so that's why you're seeing the FDE model taking off, because there's so much product discovery to do."

### AI 领域 FDE 的本质

> **"doing things that don't scale at scale"**——在大规模上做那些本来不该规模化的东西。

YC 经典建议是创业早期"做那些不能规模化的事"；FDE 模式则是**在每个新客户身上重复这种早期探索**，但每次都把学到的变成产品的一部分。

---

## 七、定价和成功指标

### FDE 模式下的定价逻辑

**传统 SaaS 定价**：按座位、按用量、按订阅

**FDE 定价**：按**成果（outcome）**定价

- 卖的不是软件安装，而是"解决了某个问题"
- 合同会从小开始，逐步增大（Land and Expand）
- 价格灵活，因为价值可量化

### 两个核心 KPI

1. **合同规模**（Contract Size）
   - 不是客户数量，而是单个客户的合同价值
   - FDE 模式天然驱动合同变大

2. **产品杠杆**（Product Leverage）
   - FDE 用你的产品交付结果，**是否越来越容易**？
   - 如果每新进一个工程师才能多做一家客户，说明产品杠杆没有提升
   - 产品杠杆提升 = FDE 越来越能不用拉人就能交付更高价值

---

## 八、Demo 驱动开发

Palantir 早期只有一个 Demo：**阻止恐怖分子行动**。

每集成一个新功能（如 histogram、地图），都必须回答：

> "这个功能怎么融入那个反恐 Demo？让分析师用起来？"

### Demo 驱动 vs 功能开发

| 功能开发思维 | Demo 驱动思维 |
|------------|-------------|
| 这个功能本身够不够好？ | 这个功能在真实工作流中是否必需？ |
| 独立验证每个 feature | 让客户看到就想"抢过来用" |
| 功能组合后体验可能很糟糕 | 必须保证功能切换路径顺畅 |

Bob 承认自己早期经常犯错——产品团队认为很酷的功能，FDE 并不买账，因为"用起来工作量太大"。

---

## 九、给 AI 创业者的建议

### 最成功的 FDE 公司，都有 Palantir 背景的人

> "The startups most successful doing the FD model have people from Palantir running the FD model."

### 常见误区

1. **误以为 FDE = 派工程师去客户现场**
   - 实际上是整套组织设计和文化
2. **误以为可以跳过学习直接复制
   - FDE 的判断力、定价能力、抽象能力都需要实战训练
3. **过早停止定制**
   - "可以每个客户做定制"只要你的合同规模在增长，就不用急着抽象

### 关于何时该从定制转向抽象

Bob 的高分辨率建议：

- 看**合同规模是否在增长**——在增长就继续做定制
- 看**产品杠杆是否在提升**——FDE 是否不用拉新工程师就能交付更多价值
- 如果两个都在涨，就**不要急着抽象**

---

## 十、Bob 的新角色：美国陆军预备役

Bob 加入美国陆军 2011 分遣队，担任中校。

### 角色本质

- 不是外部顾问，而是**真正的军官**
- 参加了基础训练，通过了陆军体能测试
- 参与陆军的数字化转型——从伊拉克/阿富汗的反恐战争，转向乌克兰战争和太平洋大规模作战

### FDE 经验在军队的应用

- 高级将领已有转型意识，知道需要改变
- 但 20 年的惯性很大
- FDE 团队帮助发现具体问题、推动解决

---

## 十一、AI 创业机会

### Bob 的判断：AI 能力会飞速进步，但采纳速度严重滞后

> 从 GPT-4（2024年4月）到 o3（2025年4月），能力进步极快。但企业的实际采纳远低于预期。

### 机会所在

**差距 = AI 能做的 vs 客户能用的之间的鸿沟**

这个鸿沟需要：
- 人类创造力
- 探索和落地工作
- 对客户真实痛点的理解

> "OpenAI 是产品团队，AI 创业公司是 FDE——把 AI 研究室的成果落地到真实世界。"

---

## 十二、金句摘录

> "The FD model effectively is doing things that don't scale at scale."

> "If you're in a business where you can just scale and treat all customers the same, that's an amazing gift. Don't do the FD strategy."

> "You're selling that you have solved a problem."

> "In the product market fit strategy, you want to be doing less work for every customer. In the FD strategy, you want to be doing more valuable work for every customer."

> "The startups most successful doing the FD model have people from Palantir running the FD model."

---

## 章节索引

- `00:29` 从 PayPal 到 Palantir 到 OpenAI
- `02:19` 前线部署工程师的角色定义
- `03:19` Palantir 如何发明 FDE
- `07:56` 现场产品发现 vs 销售驱动
- `09:51` Echo 团队和 Delta 团队详解
- `13:34` FDE 作为创始人训练场
- `14:35` 咨询还是真正的软件？
- `17:54` Palantir Ontology 的诞生
- `23:04` 为什么 AI 公司采纳 FDE
- `36:17` 成功指标（合同规模 + 产品杠杆）
- `41:14` Demo 驱动开发
- `44:56` 加入美国陆军预备役
- `47:43` AI 创业者的机会
