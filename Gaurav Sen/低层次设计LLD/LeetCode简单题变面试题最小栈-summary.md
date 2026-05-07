# Tricky LeetCode EASY problem turns into LLD interview - Minimum Stack

**视频ID**: a2JuhPVLNo8
**频道**: Gaurav Sen
**原始URL**: https://www.youtube.com/watch?v=a2JuhPVLNo8

## 内容概要

本视频是一场模拟编程面试，由Gaurav Sen对候选人Harshit Sharma进行45分钟的Minimum Stack问题面试。题目看似简单（设计一个栈，同时支持O(1)的push、pop、peek和getMin操作），但实际解决过程中暴露出多个层次的设计思考，最终延伸到了并发控制与水平扩展等LLD高阶主题。

面试开始，候选人快速理解了问题：普通栈可以实现push/pop/peek为O(1)，但getMin若遍历整个栈则为O(n)。首先探索了各种数据结构方案：使用最小堆虽然可以让getMin为O(1)，但push/pop会退化为O(log n)；使用二叉搜索树可以让所有操作达到O(log n)，但对于栈这种简单数据结构来说过于复杂。面试官适时引导："这是计算机科学中最著名的取舍——用更多内存换取时间"。

候选人的关键洞察是：只需要记录最小值的"历史"即可。具体方案是维护两个栈——一个普通栈存储所有元素，一个"最小栈"仅在遇到比当前最小值更小的元素时才压入。当pop时，如果弹出值等于最小栈栈顶，最小栈也同步pop。这样getMin永远返回最小栈栈顶，所有操作都是O(1)。面试中通过大量白板画图逐步验证了这个逻辑。

编码阶段实现了这个方案。涉及的关键细节包括：空栈时的边界条件处理（初始minStack指针为-1或特殊值）、peek和getMin只读不写因此是只读操作、push和pop会修改状态因此需要处理边界溢出等。

面试后半段进入了更深入的LLD维度：能否用O(1)辅助空间实现？（可以通过数学技巧：存储actualValue - currentMin，而非直接存储值，这样只用一个变量就能恢复原始值。）随后的并发讨论更是打开了新世界：多个线程同时操作时，push/pop是写操作需要互斥锁，peek/getMin是读操作可以并行（读写锁模式）；如果扩展到多个用户/多组栈，每组栈绑定独立线程执行即可保证隔离性。面试官最后总结："任何简单问题，都可以通过并发和扩展变成复杂问题。"

## 核心知识点

- **Minimum Stack设计**：双栈方案（主栈 + 最小栈），所有操作O(1)时间复杂度
- **空间换时间思想**：通过额外存储最小值历史，实现O(1)查询
- **O(1)辅助空间技巧**：存储差值（value - min）而非原值，通过数学运算恢复
- **读写锁并发模型**：写操作需要互斥锁，读操作可并行（多个读者）
- **多栈水平扩展**：每组栈绑定独立线程，实现并发隔离

## 设计模式/方法

- **双栈追踪法**：用额外栈记录极值变化历史，pop时同步更新
- **数学编码技巧**：用差值存储实现常量空间
- **读写锁模式**：区分读写操作实现并发安全与性能平衡

## 关键语录

> "This is the most famous trade-off in our computer science — more memory in exchange for time."
> （这是计算机科学中最著名的取舍——用更多内存换取时间。）

> "Any simple problem can be made complex through scale, concurrency, and just by duplicating the data structure."
> （任何简单问题，都可以通过规模、并发、以及复制数据结构本身，变得复杂。）
