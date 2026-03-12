# Software 2.0
# 软件2.0

> Author / 作者: Andrej Karpathy
> Source / 来源: karpathy.medium.com
> Date / 日期: 2019年

---

## 第一部分：什么是Software 2.0？/ What is Software 2.0?

| English | 中文 |
|---------|------|
| I sometimes see the term "Software 2.0" in posts on the internet. | 我有时在网上看到"Software 2.0"这个术语。 |
| To me, it represents a quiet revolution. | 对我来说，它代表着一场静默的革命。 |
| But the term is relatively vague. | 但这个术语相对模糊。 |
| Software 1.0 is what we all know - explicit instructions written in a programming language. | 软件1.0是我们都知道的——用编程语言编写的明确指令。 |
| Software 2.0 is the entire stack where these instructions are partially replaced by a neural network. | 软件2.0是整个堆栈，这些指令被神经网络部分取代。 |

---

## 第二部分：核心概念 / Core Concept

| English | 中文 |
|---------|------|
| In the conventional "Software 1.0" stack, the human programmer is responsible for creating the source code. | 在传统的"软件1.0"堆栈中，程序员负责创建源代码。 |
| The code is then compiled into an executable that performs the desired task. | 代码然后被编译成可执行程序，执行所需的任务。 |
| In the new "Software 2.0" paradigm, the human programmer does not write the code or its detailed rules. | 在新的"软件2.0"范式中，程序员不编写代码或其详细规则。 |
| Instead, the human provides the dataset that describes the problem. | 相反，人类提供描述问题的数据集。 |
| The neural network (the "model") learns the rules from the data. | 神经网络（"模型"）从数据中学习规则。 |

---

## 第三部分：两种软件的对比 / Comparison

| Aspect / 方面 | Software 1.0 | Software 2.0 |
|----------------|--------------|--------------|
| Code / 代码 | Human-written explicit code | Neural network learns from data |
| | 人类编写的明确代码 | 神经网络从数据学习 |
| Process / 过程 | Specify instructions | Define objective + data |
| | 指定指令 | 定义目标+数据 |
| Development / 开发 | Programmers write rules | Dataset defines the function |
| | 程序员编写规则 | 数据集定义功能 |
| Optimization / 优化 | Human manually optimize | Gradient descent |
| | 人类手动优化 | 梯度下降 |

---

## 第四部分：例子 / Examples

| English | 中文 |
|---------|------|
| In Computer Vision, we used to write edge detection filters (Sobel, Canny, etc.). | 在计算机视觉中，我们过去常写边缘检测滤波器（Sobel、Canny等）。 |
| Today, we train convolutional neural networks on a dataset and they automatically learn the features. | 今天，我们在数据集上训练卷积神经网络，它们自动学习特征。 |
| In Speech Recognition, we used to design features (MFCC). | 在语音识别中，我们过去设计特征（MFCC）。 |
| Now, we use deep neural networks that learn features directly from raw audio. | 现在，我们使用深度神经网络直接从原始音频学习特征。 |
| In Natural Language Processing, we used to design word embeddings. | 在自然语言处理中，我们过去设计词嵌入。 |
| Now, we use learned embeddings (BERT, etc.) that capture semantic meaning. | 现在，我们使用学习到的嵌入（BERT等）来捕捉语义。 |

---

## 第五部分：优势 / Advantages

| English | 中文 |
|---------|------|
| **Computational efficiency / 计算效率** | |
| A convolutional neural network can be 10x more computationally efficient than hand-written code. | 卷积神经网络比手写代码效率高10倍。 |
| Because the same computation is repeated billions of times with simple matrix multiplications. | 因为相同的计算用简单的矩阵乘法重复数十亿次。 |
| **Generalization / 泛化** | |
| The neural network learns from data, so it generalizes better to new situations. | 神经网络从数据学习，所以它能更好地泛化到新情况。 |
| Unlike hand-written code that only handles cases the programmer thought of. | 不像手写代码只处理程序员想到的情况。 |
| **Continuous learning / 持续学习** | |
| You can easily improve a neural network by adding more data. | 你可以通过添加更多数据轻松改进神经网络。 |
| Traditional code requires rewriting rules manually. | 传统代码需要手动重写规则。 |

---

## 第六部分：挑战 / Challenges

| English | 中文 |
|---------|------|
| **Interpretability / 可解释性** | |
| Neural networks are "black boxes." We don't fully understand how they work. | 神经网络是"黑盒"。我们不完全理解它们如何工作。 |
| This is a problem for debugging and safety-critical applications. | 这对于调试和安全关键应用来说是个问题。 |
| **Robustness / 鲁棒性** | |
| Neural networks can be fooled by adversarial examples. | 神经网络可以被对抗样本欺骗。 |
| Small changes to input can cause big changes to output. | 对输入的小改动会导致输出的重大变化。 |
| **Computational cost / 计算成本** | |
| Training neural networks requires massive compute resources. | 训练神经网络需要大量计算资源。 |

---

## 第七部分：未来展望 / Future Outlook

| English | 中文 |
|---------|------|
| "Software 2.0" doesn't replace "Software 1.0." | "软件2.0"不会取代"软件1.0"。 |
| Instead, they work together in a hybrid stack. | 相反，它们在混合堆栈中一起工作。 |
| The human writes the scaffolding, and the neural network fills in the details. | 人类编写脚手架，神经网络填充细节。 |
| The role of the programmer is evolving. | 程序员的角色正在演变。 |
| Instead of writing explicit rules, they curate datasets and validate results. | 他们不再编写明确的规则，而是策划数据集和验证结果。 |

---

## 总结 / Summary

| English | 中文 |
|---------|------|
| Software 2.0 is when we replace explicit programming with learning from data. | 软件2.0是用从数据学习取代明确编程的时候。 |
| Neural networks learn to solve problems instead of being explicitly programmed. | 神经网络学习解决问题，而不是被明确编程。 |
| This approach is more efficient, generalizes better, and scales with data. | 这种方法更高效，更好地泛化，并随着数据扩展。 |
| The future of programming is data + gradients. | 编程的未来是数据+梯度。 |

---

## 经典语录 / Quotes

| English | 中文 |
|---------|------|
| "Software 2.0 is the entire stack where explicit instructions are replaced by neural networks." | "软件2.0是整个堆栈，明确指令被神经网络取代。" |
| "The code we write is becoming less important. The data is becoming more important." | "我们写的代码变得越来越不重要。数据变得越来越重要。" |

---

> Source / 来源: Andrej Karpathy - Software 2.0 (2019)
