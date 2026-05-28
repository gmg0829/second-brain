# Claude Code 高效工作流：Explore → Plan → Code → Commit

## 概述

这是关于 Claude Code 最核心的工作流程介绍视频。视频强调的核心观点是：**在使用 Claude Code 时，应该先探索（Explore）、再计划（Plan）、然后编码（Code）、最后提交（Commit）**。跳过前两步直接让 AI 写代码，会导致后续更多的修正工作。

## 核心工作流详解

### 1. Explore（探索）

在进入计划模式之前，可以先让 Claude 探索代码库，了解项目结构和技术栈。

- 方式：不进入 Plan 模式，直接让 Claude 探索代码库
- 目的：为后续的规划提供足够的上下文背景
- 价值：让 Claude 理解项目的架构、依赖和模式

### 2. Plan（计划）——最关键的一步

**进入 Plan 模式**：按住 `Shift + Tab`，直到看到文本输入框下出现 Plan Mode 选项。

Plan 模式的核心限制：**Claude 无法编辑文件，只能读取文件进行调研**。

**使用示例**：
> "我需要在图片上传管道中添加 WebP 转换功能。请找出应该在管道的哪个位置实现、是否需要新的依赖，以及如何实现。"

Claude 会：
- 读取相关文件
- 进行必要的网络搜索
- 给出一个可操作的计划

**Plan 模式的优势**：
- 所有修正都发生在代码编写**之前**，避免返工
- 可以在计划阶段要求 Claude 补充或修改某些部分
- Claude 会保留整个推理过程，帮助后续决策
- Claude 在制定计划时会建立"成功标准"，这为后续评估结果提供了依据

**技巧**：
- 制定计划时，明确写出"成功标准"，让 Claude 知道什么是正确答案
- 添加能帮助 Claude 完成目标的工具（如浏览器扩展、测试框架等）
- 如果项目有测试套件，确保 Claude 可以持续运行验证
- 如果 Claude 反复遇到相同问题，让它把解决方案记录到 `CLAUDE.md` 文件中

### 3. Code（编码）

计划批准后，Claude 会开始执行文件编辑工作。

- 可以设置：**自动接受文件编辑** 或 **每次编辑前询问**
- Claude 在执行过程中可能会遇到障碍，需要你适时纠正方向
- Plan 模式的额外好处：保留了"如何得到这个结果"的推理上下文，帮助 Claude 在后续步骤中做出更好的决策

### 4. Commit（提交）

代码测试满意后，进入提交流程。

**提交前的最佳实践**：
1. **运行 sub-agent 代码审查**（Sub-agent Code Review），让另一个 Claude 审查你的代码
2. **让 Claude 生成符合你团队风格的 commit 信息**

### 5. 重复迭代

 rinse and repeat（冲水重复）——不断循环这个流程，持续改进代码。

## 完整流程总结

| 阶段 | 作用 |
|------|------|
| **Explore** | 提供 Claude 理解项目所需的上下文 |
| **Plan** | 制定 Claude 用来判断成功与否的行动计划 |
| **Code** | 你和 Claude 在最终确定计划成果前的反复沟通 |
| **Commit** | 审查和推送代码，进入下一个功能开发 |

## 关键 Takeaway

> If you take one thing away about Claude Code, let it be this workflow: **explore, plan, code, and commit**. Without this, most people jump straight to pasting in Claude to write code, which means more course correcting later on.

遵循 Explore → Plan → Code → Commit 工作流，能显著提升 Claude Code 的使用效率，减少后期返工，获得更高质量的代码输出。
