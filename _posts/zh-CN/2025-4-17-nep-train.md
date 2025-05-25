---
layout: distill
title: 训练神经进化机器学习势
date: 2025-4-17 23:36:10
categories: Machine-Learning
tabs: true
map: true

toc:
  - name: 1. 从坐标到描述符向量
  - name: 2. 从描述符到位能
  - name: 3. 训练机器学习势

---

经典的原子间势能在原子模拟中起着关键作用，可以高效计算材料的各种性质。
基于机器学习模型构建的原子间势能能够在大幅减少计算时间的情况下，达到与量子力学相当的精度。

目前，已经通过多种模型构建过机器学习势，包括：
- 人工神经网络 [Phys.Rev.Lett. 98, 146401 (2007)]
- 高斯回归 [Phys.Rev.Lett. 104, 136403 (2010)]
- 线性回归 [J. Comput. Phys. 285, 316 (2015)]

对于任何模型，都需要通过用量子力学数据训练模型来确定许多拟合参数。大量的拟合参数是机器学习势能相较于传统经验势能具有优越插值能力的基础。

然而，找到一组优化的参数并非易事。神经网络势能的传统训练方法基于梯度下降，可能会陷入模型损失函数的局部最小值，从而导致次优解。

更好的训练方法基于**进化算法**，这种全局搜索方法与神经网络结合被称为**神经进化**。

最先进的进化算法，**可分离自然进化策略**，非常适合用于演化大规模神经网络。
[J. Mach. Learn. Res. 15, 949 (2014)] 

尽管进化算法不太可能陷入局部最小值，但这些基于种群的方法需要在一次迭代内多次评估损失函数，通常比基于梯度下降的算法计算量更大。

## 1. 从坐标到描述符向量

在机器学习势函数中，位置势能 $U_i$ 并不是直接作为相对坐标 $\{\mathbf r_{ij}\}$ 的函数进行建模，而是作为**高维描述符向量**的函数，该向量的分量对于空间平移、三维旋转和反演以及相同种类原子的排列是不变的。

已经提出了许多描述符，例如：
- Behler 的对称函数 (Behler’s symmetry functions) [J. Chem. Phys. 134, 074106 (2011)]
- 平滑原子位置重叠 (smooth overlap of atomic positions (SOAP)) [Phys.Rev.B 87, 184115 (2013)]
- 双谱 (bispectrum) [Phys.Rev.Lett. 104, 136403 (2010)]
- 库仑矩阵 (Coulomb matrix) [Phys. Rev. Lett. 108, 058301 (2012)]
- 矩张量 (moment tensor) [Multis. Model. Simul. 14, 1153 (2016)]
- 原子簇展开 (atomic cluster expansions) [Phys.Rev.B 99, 014104 (2019).]
- 嵌入原子描述符 (embedded atom descriptor) [J. Phys. Chem. Lett. 10, 4962 (2019)]
- 高斯矩 (Gaussian moments) [J. Chem. Theory Comput. 16, 5410 (2020)]
- 原子置换不变多项式 (atomic permutationally invariant polynomials) [Mach. Learn.: Sci. Technol. 1, 015004 (2020)]

还有一些库实现了各种描述符。
[Comput. Phys. Commun. 207, 310 (2016)]
[Comput. Phys. Commun. 247, 106949 (2020)]
[Mach. Learn.: Sci. Technol. 2, 027001 (2021)]

不同的原子环境描述符在这里： [J. Chem. Phys. 150, 154110 (2019)]

### 1.1 单组分系统

下面介绍的描述符受到**Behler的对称函数**和**优化版SOAP**的启发。

对于单组分系统中的中心原子 $i$，我们定义了一组**径向描述符分量** ($n\geq 0$)

$$
q_n^i = \sum_{j\neq i} g_n(r_{ij}) \tag{1}
$$

以及一组**角度描述符分量** ($n\geq 0$ 且 $n\geq 1$)

$$
q_{nl}^i = \sum_{j\neq i}\sum_{k\neq i} g_n(r_{ij}) g_n(r_{ik}) P_l(\cos\theta_{ijk}) \tag{2}
$$

其中，$P_l(\cos\theta_{ijk})$ 是 $l$ 阶的 Legendre 多项式，$\theta_{ijk}$ 是由 $ij$ 和 $ik$ 键所形成的夹角。

函数 $g_n(r_{ij})$ 是**径向函数**，我们选择将其表示为变量 $x\equiv2(r_{ij}/r_c − 1)^2−1$ 的第一类 Chebyshev 多项式：

$$
g_n(r_{ij}) = \frac{T_n(x)+1}{2} f_c(r_{ij}) \tag{3}
$$

变量 $x$ 被定义为取值范围从 -1 到 1 。

函数 $f_c(r_{ij})$ 是一个**截断函数**

$$
f_c(r_{ij}) =
\begin{cases}
\left (1+\cos\left (\pi r_{ij}/{r_c}\right)\right) /2 &\quad r\leq r_c \\  
0 &\quad r > r_c\\
\end{cases}  \tag{4}
$$

请注意，径向函数同时用于描述符的径向和角向分量中。
- 在径向分量中，径向展开达到给定阶数 $n_\text{max}^{\text R}$，即 $n = 0, 1,..., n_\text{max}^{\text R}$。
- 对于角向分量，径向展开达到 $n_\text{max}^{\text A}$，即 $n = 0, 1,..., n_\text{max}^{\text A}$，角向展开达到 $l_\text{max}$，即 $l = 1,...,l_\text{max}$。

完整的描述符向量的维度为

$$
N_\text{des} = (n_\text{max}^{\text R} + 1) + (n_\text{max}^{\text A} + 1) l_\text{max} \tag{5}
$$

请注意，径向和角向分量的截断半径不一定相同，分别用 $r_c^\text R$ 和 $r_c^\text A$ 表示可以取不同的值。
- 径向分量可用于表示相对较长程的相互作用（例如库仑和范德华相互作用），
- 而角向分量主要描述中程相互作用。

### 1.2 多组分系统

在上述讨论中，我们忽略了原子种类。
对于多组分系统，构建描述符的方法是：
- 将公式 (1) 中的项乘以权重因子，如 $Z_j$
- 将公式 (2) 中的项乘以权重因子，例如 $Z_jZ_k$
该方法已被采用在 PyXtal_FF 包中，并应用于其中实现的所有描述符。

基于我们在公式 (3) 中对 $g_n(r_{ij})$ 的定义，这将导致截断函数的修改：$f_c(r_{ij})$ 变为 $f_c(r_{ij})Z_j$ 或者 $f_c(r_{ij})\sqrt{Z_iZ_j}$ 。

## 2. 从描述符到位能

在机器学习势中，位能被视作描述符分量集合 $\{q_{nl}^i\}$ 的函数

$$
U_i=U_i({q_{nl}^i}) \tag{6}
$$

这是一个多变量标量函数。

不同的机器学习模型已被用于构建这个多变量函数，包括**神经网络**、**高斯回归**和**线性回归**。在NEP中，我们选择**前馈神经网络**作为机器学习模型。

描述符向量作为神经网络的输入层，位能量作为输出层。在两者之间，可以有一个或多个隐藏层的神经元（节点）。

描述符向量作为输入层与（第一）隐藏层相连。为便于表述，我们将两个标签 $n$ 和 $l$ 合并为一个单一标签 $\nu = (nl)$，并将原子 $i$ 的描述符向量表示为 $q_\nu^i$（$1\leq \nu \leq N_\text{des}$）。

隐藏层的状态也可以表示为一个向量 $x_\mu (1\leq\mu\leq N_\text{neu})$，其中 $N_\text{neu}$ 是隐藏层中神经元的数量。

隐藏层状态向量通过线性与非线性变换的组合从输入向量得到。

$$
x_\mu = \tanh\left(\sum_{\nu=1}^{N_\text{des}}w_{\mu\nu}^{(1)}q_\nu^i - b_\mu^{(1)}\right) \tag{7}
$$

其中 $w_{\mu\nu}^{(1)}$ 是神经元 $x_\mu$ 和 $q_\nu^i$ 之间的连接权重，$b_\mu^{(1)}$ 是神经元 $x_\mu$ 的偏置。

我们选择双曲正切函数作为隐藏层中的非线性变换，也称为**激活函数**。

输出层的状态，即位点能量，被计算为隐藏层状态向量的线性组合

$$
U_i = \sum_{\mu=1}^{N_\text{neu}}w_{\mu}^{(2)}x_\mu - b^{(2)} \tag{8}
$$

其中 $w_{\mu}^{(2)}$ 是神经元 $U_i$ 和 $x_\mu$ 之间的连接权重，$b^{(2)}$ 是神经元 $U_i$ 的偏置。

## 3. 训练机器学习势

### 3.1 定义损失函数

训练的目的是确定神经网络中的一组权重和偏置，以使**损失函数**最小化。
**损失函数**量化了来自机器学习势计算出的量（能量、力和应力）与训练集中对应的量之间的误差，而训练集中的数据通常是通过量子力学计算准备的。

我们将神经网络中的一组参数表示为向量 $\mathbf z$，其维度为参数的总数 $N_\text{par}$。对于具有单个隐藏层的神经网络

$$
N_\text{par} = (N_\text{des}+2)N_\text{neu} + 1 \tag{9}
$$

我们可以将**损失函数**表示为**神经网络参数**的函数

$$
L = L(\mathbf z) \tag{10}
$$

并将其训练过程表述为一个**实值优化问题**

$$
\mathbf z^* = \min L(\mathbf z) \tag{11}
$$

这里的 $\mathbf z^*$ 是一组最优参数。

损失函数由几部分的加权和组成，我们分别定义了能量、力和应力的损失函数，记为 $L_\text{e}(\mathbf z)$、$L_\text{f}(\mathbf z)$ 和 $L_\text{v}(\mathbf z)$。

此外，我们还考虑了正则化项的损失函数，记为 $L_1(\mathbf z)$ 和 $L_2(\mathbf z)$。

总损失函数被定义为所有这些单独的损失函数的加权和：

$$
L(\mathbf z) = \lambda_\text{e}L_\text{e}(\mathbf z) + \lambda_\text{f}L_\text{f}(\mathbf z) + \lambda_\text{v}L_\text{v}(\mathbf z) + \lambda_1L_1(\mathbf z) + \lambda_2L_2(\mathbf z) \tag{12}
$$

- **能量损失函数**定义为以下均方根误差（RMSE）：

$$
L_\text{e}(\mathbf z) = \left( \frac{1}{N_\text{str}} \sum_{n=1}^{N_\text{str}} (U^\text{NEP}(n,\mathbf z)-U^\text{tar}(n))^2 \right)^{1/2} \tag{13}
$$

其中 $N_\text{str}$ 是训练数据集中结构的总数，$U^\text{tar}(n)$ 是第 $n$ 个结构的单原子的目标能量，$U^\text{NEP}(n, \mathbf z)$ 是使用参数为 $\mathbf z$ 的 NEP 势计算出的相应能量。

系统的能量 $U$ 的定义为  

$$
U = \sum_i U_i \tag{14}
$$

其中，原子 $i$ 的位点能量 $U_i$ 为 $U_i = U_i(\{\mathbf r_{ij}\})$，$\mathbf r_{ij}$ 是原子 $i$ 到原子 $j$ 的相对位置 $\mathbf r_{ij} \equiv \mathbf r_j - \mathbf r_i$。

- **力的损失函数**定义为以下均方根误差：

$$
L_\text{f}(\mathbf z) = \left( \frac{1}{3N} \sum_{i=1}^{3N} (\mathbf F^\text{NEP}_i(\mathbf z)-\mathbf F^\text{tar}_i)^2 \right)^{1/2} \tag{15}
$$

其中 $N$ 是训练数据集中原子的总数，$\mathbf F^\text{tar}_i$ 和 $\mathbf F^\text{NEP}_i(\mathbf z)$ 分别是第 $i$ 个原子的目标力和使用参数 $\mathbf z$ 从 NEP 势计算出的力。

力的表达式为

$$
\mathbf F_i = \sum_{j\neq i} \mathbf F_{ij} \tag{16}
$$

$$
\mathbf F_{ij} = -\mathbf F_{ji} = \frac{\partial U_i}{\partial \mathbf r_{ij}} - \frac{\partial U_j}{\partial \mathbf r_{ji}} \tag{17}
$$

这里，$\mathbf F_{ij}$ 为原子 $j$ 作用在原子 $i$ 上的力。

- **应力损失函数**被定义为以下均方根误差：

$$
L_\text{v}(\mathbf z) = \left( \frac{1}{6N_\text{str}} \sum_{n=1}^{N_\text{str}} \sum_{\mu\nu} (W^\text{NEP}_{\mu\nu}(n,\mathbf z)-W^\text{tar}_{\mu\nu}(n))^2 \right)^{1/2} \tag{18}
$$

其中，$$W^\text{tar}_{\mu\nu}(n)$$ 和 $$W^\text{NEP}_{\mu\nu}(n,\mathbf z)$$ 分别表示第 $$n$$ 个结构的单原子应力张量的 $$\mu\nu$$ 目标分量和通过 NEP 势能计算得到的该分量。

应力的表达式为

$$
\mathbf W_i = \sum_{j\neq i} \mathbf r_{ij} \otimes \frac{\partial U_j}{\partial \mathbf r_{ji}} \tag{19}
$$

- **正则化损失函数**

$$
L_1(\mathbf z) = \frac{1}{N_\text{par}} \sum_{n=1}^{N_\text{par}}|z_n| \tag{20}
$$

$$
L_2(\mathbf z) = \left(\frac{1}{N_\text{par}} \sum_{n=1}^{N_\text{par}}z_n^2\right)^{1/2} \tag{21}
$$

这种正则化可以通过促使权重参数的绝对值比没有正则化时更小，从而帮助防止过拟合。

公式(12)中权重参数的值显然取决于相关量的单位：
- 在使用以电子伏特每原子(eV/atom)为能量和应力单位、以电子伏特每埃(eV/Å)为力的单位时，$\lambda_\text{e} = \lambda_\text{f} = \lambda_\text{v} =1$ 是一个非常好的选择。
- 正则化项的权重参数 $\lambda_1$ 和 $\lambda_2$ 需要调整，以保持过度拟合与欠拟合之间的良好平衡。

### 3.2 可分离的自然进化策略作为训练算法

这是一种遵循损失函数的自然梯度来更新解群搜索分布的实值进化优化原理方法。

它可以被视为一种无导数的黑箱优化器，非常适合最小化公式(12)中的复杂损失函数。

我们训练算法的工作流程如下：  

（1）**初始化**
在解空间（维度为 $N_\text{par}$）中创建一个初始搜索分布，其均值向量为 $\textbf m$，标准差向量为 $\mathbf s$。
$\textbf m$ 的各分量可以在 $−1/2$ 到 $1/2$ 之间均匀选择的随机数，而 $\mathbf s$ 的各分量可以选择为常数，如0.1。

（2）**循环迭代** $N_\text{gen}$ 代：  
 - a. 基于当前的 $\textbf m$ 和 $\textbf s$ 创建解的群 $\mathbf z_k (1 \leq k \leq N_\text{pop})$ （符号 $\odot$ 表示元素级乘法）

$$
\mathbf z_k \leftarrow \textbf m + \textbf s \odot \mathbf r_k \tag{22}
$$

其中种群规模为 $N_\text{pop}$，$\mathbf r_k$ 是一组均值为 0 方差为 1 的高斯分布随机数。

- b. 评估种群中所有个体解 $\mathbf z_k$ 的损失函数 $L(\mathbf z_k)$，并根据损失函数值从小到大对它们进行排序

- c. 更新自然梯度：

$$
\nabla_{\mathbf m} \mathbf J \leftarrow \sum_{k=1}^{N_\text{pop}}u_k\mathbf r_k \tag{23}
$$

$$
\nabla_{\mathbf s} \mathbf J \leftarrow \sum_{k=1}^{N_\text{pop}}u_k (\mathbf r_k \odot \mathbf r_k - 1) \tag{24}
$$

其中 $u_k$ 是一组基于排名的效用值，用于引导种群向更优个体解的方向演化。

- d. 更新搜索分布的均值和标准差：

$$
\textbf m \leftarrow \textbf m + \eta_{\mathbf m} (\textbf s \odot \mathbf \nabla_{\mathbf m} \mathbf J) \tag{25}
$$

$$
\textbf s \leftarrow \textbf s + \exp (\frac{\eta_\mathbf{s}}{2} \nabla_{\mathbf s} \mathbf J) \tag{25}
$$

其中，$\eta_{\mathbf m}$ 和 $\eta_{\mathbf s}$ 可以分别理解为 $\mathbf m$ 和 $\mathbf s$ 的学习率。

