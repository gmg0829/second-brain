# What is low-level design?
**视频ID**: n5BSpsfSJ4s
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=n5BSpsfSJ4s
## 内容概要
本期视频介绍了低层次设计（Low-Level Design，LLD）的核心方法论，解释了为什么低层次设计对工程师将业务需求转化为代码至关重要。Gaurav 指出，大多数系统设计面试课程只关注高层架构，而忽略了将设计落地到代码的关键步骤。视频提出了一个三步流程，帮助工程师在面试和实际工作中完成从需求到代码的稳步推进。

第一步是记录系统中不同角色（Actor）可以执行的操作，这一步通过用例图（Use Case Diagram）来实现——这是收集需求最关键的环节。第二步是为每个抽象概念（对象）标注其状态（State）和行为（Behavior），通过类图（Class Diagram）来呈现；状态即类中的变量或数据库中的数据条目，行为即对象的方法（如 `user.returnBook()` 会修改用户状态）。第三步是定义对象之间复杂的交互行为，这部分由活动图（Activity Diagram）来完成，但在很多简单场景下是可选的。完成以上三步后，最终根据类图和活动图编写代码。

## 核心观点
- 低层次设计的目的是让工程师能够系统化地将业务需求映射为具体代码，而非凭直觉编码
- 用例图是收集需求的核心工具，需首先明确系统中有哪些角色、各自能执行什么操作
- 类图是低层次设计的核心产出，状态（变量）和行为（方法）必须在图中清晰定义
- 活动图用于描述复杂行为流程，在简单场景下可省略，复杂场景下能避免设计返工
- 遵循这一流程编码，代码会更高效、更易于扩展，因为你在编码前已经完成了规划
- 这一方法并非创新，而是 UML  diagrams 在软件工程中应用了几十年的成熟实践

## 关键术语
- **Low-Level Design（低层次设计/LLD）**: 将高层系统设计细化为具体类、接口、方法和交互的设计阶段
- **Use Case Diagram（用例图）**: 描述系统参与者和用例之间关系的图，记录角色及其可执行操作
- **Class Diagram（类图）**: 描述类的结构（属性/状态）和行为（方法）的 UML 图
- **Activity Diagram（活动图）**: 描述复杂业务流程或对象交互顺序的 UML 图
- **State（状态）**: 对象的数据属性，如类中的成员变量或数据库中的记录字段
- **Behavior（行为）**: 对象的方法，如 `user.returnBook()` 修改用户状态
- **UML（统一建模语言）**: 软件工程中用于可视化、规范、构建和文档化系统构件的标准建模语言

## 关键语录
> "The purpose of low-level design is to let engineers map business requirements to code."

> "State is the variables that you usually have in a class or the data entries that you have in a database, behaviors are things that you do with it."

> "If you follow this process you will code much better, much faster, and much cleaner — because you have planned your way through."