# Stanford CS149 Lecture 10: 高效在 GPU 上运行深度神经网络

**主题：** DNN 层调度、卷积→矩阵乘法映射、Transformer、层融合

---

## 1. DNN 计算基础

深度神经网络（Neuron Networks）本质是对大数据张量进行连续的**线性运算 + 非线性激活**。每一层接收上一层的输出张量，经权重矩阵变换后输出，再传入下一层。

**常见层类型：**
- **全连接层（FC Layer）**：矩阵-向量乘法 y = W·x
- **卷积层（Conv Layer）**：在图像/特征图上滑动卷积核
- **Transformer Layer**：自注意力 + 前馈网络的组合

---

## 2. 卷积 → 矩阵乘法（Im2Col）

**核心思想：将卷积操作转化为矩阵乘法（GEMM）。**

对输入张量 X（H×W×C）展开成矩阵（每列对应一个卷积窗口），将卷积核展开成矩阵，通过一次矩阵乘即可完成卷积。PyTorch/TensorFlow 的底层 cuBLAS 库正是这样做的——只要能转化为矩阵乘法，就能利用高度优化的 BLAS 库。

**为什么重要：** 现代 GPU 的 Tensor Core 专门为矩阵乘法设计，16 位浮点下达 300 TFLOPs，远超通用 32 位精度下的 5 TFLOPs。

---

## 3. GPU 内存层次与优化

GPU 存储呈金字塔结构：**寄存器 → Shared Memory → L1/L2 Cache → HBM（显存）**。矩阵分块（blocking/tiling）策略是将数据放入 Shared Memory，减少对 HBM 的访问次数。

关键优化手段：
- **数据预取（Prefetch）**：提前将下一块数据加载到寄存器
- **Bank Conflict 规避**：合理安排 Shared Memory 访问模式
- **异步执行**：Overlap 计算与数据传输

---

## 4. Tensor Core 与混合精度

Tensor Core 是 GPU 上执行矩阵乘法的专用硬件单元，一条指令完成矩阵-矩阵乘法。以 Nvidia Ampere 架构为例：
- **FP32 通用计算**：~5 TFLOPs
- **FP16 矩阵乘法**：~300 TFLOPs（提升约 60 倍）

训练中常用 FP16/BF16，推理时可用 INT8/FP8 做量化加速。

---

## 5. Transformers 与 Layer Fusion

Transformer 层由多个子操作组成（MatMul → Softmax → MatMul → Add → LayerNorm），编译器可将多个小操作**融合**为单个 kernel，减少中间结果的显存读写，显著提升端到端吞吐。

cuDNN 的 `fusedConvReLU` 和 `fusedNorm` 接口就是典型例子。

---

## 6. Batch Size 与 GPU 利用率

当 batch 较小时，GPU 计算资源浪费严重——可能只能利用 20-30%。通过调整 batch 填充（padding）到 GPU 友好的大小，配合 Tensor Core 的矩阵运算，可大幅提升利用率。

---

**总结：** 高效 GPU 评估 DNN 的核心在于——**将计算转化为矩阵乘法 + 利用分块策略优化内存访问 + 通过层融合减少访存 + 使用 Tensor Core 混合精度加速**。