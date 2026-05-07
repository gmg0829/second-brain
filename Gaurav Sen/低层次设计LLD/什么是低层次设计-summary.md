# What is low-level design?

**视频ID**: n5BSpsfSJ4s
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=n5BSpsfSJ4s

## 内容概要

本视频是Gaurav Sen系统设计课程的开篇介绍，讲解了低层次设计（Low-Level Design，简称LLD）的核心概念与实践方法。低层次设计的目标是让工程师能够将业务需求清晰地映射为代码实现，这是一个结构化、系统化的过程。

整个设计流程分为三个核心步骤：第一步是识别系统中不同角色（Actor）可以执行的操作，这一步最为关键，会用到用例图（Use Case Diagram）来记录；第二步是为每个操作定义所需的状态（State）和行为（Behavior），这些会通过类图（Class Diagram）来呈现，状态即类中的变量或数据库中的数据条目，行为即类的方法；第三步是定义复杂对象之间的交互行为，这通过活动图（Activity Diagram）来完成，但这步是可选的。

视频强调，这个方法并非创新发明，而是软件工程领域沿用已久的UML建模方法的简化应用。如果按照这个流程严格执行，代码质量会明显提升——开发速度更快、代码更整洁、更高效、更易于扩展。整个课程的后续视频都将遵循这个框架。

## 核心知识点

- **用例图（Use Case Diagram）**：用于记录系统中各个角色可以执行的操作，是需求收集阶段最重要的工具
- **类图（Class Diagram）**：描述对象的属性（状态）和方法（行为），是LLD的核心产出物
- **活动图（Activity Diagram）**：用于建模复杂行为的流程，属于可选步骤
- **UML建模方法**：低层次设计的理论基础，是软件工程中的经典方法
- **State与Behavior的区别**：State是对象持有的数据，Behavior是对象执行的操作

## 设计模式/方法

视频介绍的低层次设计三步法：
1. **识别操作（Actions）** → 用例图
2. **定义状态与行为（State & Behavior）** → 类图
3. **建模复杂行为（Complex Behaviors）** → 活动图（可选）

## 关键语录

> "The purpose of low-level design is to let engineers map business requirements to code."
> （低层次设计的目的是让工程师能够将业务需求映射为代码。）

> "If you follow this process you will code much better, much faster and much cleaner."
> （如果你遵循这个流程，你的代码会更好、更快、更整洁。）
