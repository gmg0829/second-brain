# Low level Design interview: Zomato System Design

**视频ID**: F13kHddazzo
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=F13kHddazzo

## 内容概要

本视频是一场模拟低层次设计面试，围绕类似Zomato的外卖配送系统展开。核心问题是：当订单状态发生变化时，如何高效且可扩展地通知各个相关方（顾客、餐厅、配送员等）。面试过程涵盖需求澄清、类结构设计、以及编码实现等多个维度。

面试开始于需求澄清阶段。关键的两个API是：获取订单状态（getStatus）和分配配送员（assignDeliveryExecutive）。获取状态可以是任何人调用——顾客查询、系统更新、或配送员自己查询。分配配送员则需要考虑多个参数，包括配送员到达餐厅的时间、是否已被占用等。面试官与候选人深入讨论了分配策略：一种是类似Uber的广播模式（向所有附近配送员发送请求，谁先接受谁获得订单），另一种是顺序分配模式（Zomato实际采用的方式，因为配送员是公司员工而非第三方，必须接受分配）。最终选择了顺序分配模式，同时优化为等待食物快做好时才开始分配。

代码实现阶段，候选人创建了Order类来存储订单相关信息，包括订单状态、餐厅信息等。状态变更日志（deliveryProcess）单独作为一类建模，因为它本质上是一个带有时间戳的消息列表。更重要的是，设计引入了**观察者模式（Observer Pattern）**——当订单状态发生变化时，Order类通知所有注册的观察者（如SMSService、EmailService等），每个观察者只需实现Observer接口的update方法。这种设计的核心优势是**开闭原则**：新增支付服务只需实现Observer接口即可订阅订单事件，无需修改Order类本身。

面试尾声还讨论了并发场景。当多个订单同时到达、多个配送员需要被通知时，系统如何处理？面试官引导候选人思考**连接池/对象池（Connection Pool / Object Pool）模式**——对于数据库连接、HTTP连接或SMS通知发送等重量级资源，不应该每次使用时都创建和销毁，而应该维护一个复用池。

## 核心知识点

- **观察者模式（Observer Pattern）**：用于解耦事件生产者与消费者，新增订阅者无需修改发布者代码
- **对象池模式（Object Pool Pattern）**：复用重量级对象（如数据库连接、通知服务），避免重复创建销毁的开销
- **订单状态建模**：将订单状态变更日志（deliveryProcess）作为独立实体建模，本质是一个时间戳+消息的列表
- **分配配送员策略**：顺序分配 vs 广播接受模式；以及延迟分配（等食物快做好时再分配）的产品决策
- **接口设计原则**：通过抽象接口（Observer）实现系统可扩展性

## 设计模式/方法

- **观察者模式（Observer Pattern）**：当一个对象的状态发生变化时，自动通知所有依赖它的其他对象。本质是发布-订阅机制。
- **对象池模式（Object Pool）**：管理可重用对象的集合，避免频繁的创建和销毁开销。
- **顺序分配 vs 广播模式**：根据业务特性（配送员是员工 vs 第三方）选择合适的需求分配策略。

## 关键语录

> "Observer pattern is something that I have in mind but would you use it for... the way in which this state information whenever there's a change is going to be sent to classes which are interested in this order."
> （我心中有观察者模式的想法，但你会用它来……每当状态发生变化时，这种状态信息会被发送给对该订单感兴趣的那些类。）

> "If a new service comes up which is payment service and it wants to know that the order status if it goes to cancel then and only then I want I'm interested but it doesn't matter, you just implement this interface right and then one restart of the code and you're sorted."
> （如果出现了一个新的支付服务，它想知道订单状态——只有当订单取消时它才感兴趣——但没关系，你只需实现这个接口，然后重启一次代码就搞定了。）
