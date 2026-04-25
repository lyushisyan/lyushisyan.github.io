---
layout: post
title: 基于第一性原理的 PBTE 方法
lang: zh
translation_key: abinitio-bte
permalink: /zh/blog/2025/02/16/abinitio-bte/
date: 2025-02-16 06:36:10
description: 第一性原理声子玻尔兹曼输运方程（PBTE）方法简介，涵盖 DFT、晶格动力学与热导率计算。
tags: theory phonon
categories: calculation
related_posts: true
toc:
  sidebar: left
---

在微纳尺度热传导中，尺寸效应主要涉及两个关键长度尺度：**声子波长**和**平均自由程（MFP）**。

* 若系统特征尺寸远大于声子 MFP，热传导处于**宏观扩散区**，经典热扩散方程适用。
* 若尺寸与声子 MFP 可比，需考虑**经典尺寸效应**和**弹道声子输运**。此时应使用**玻尔兹曼输运方程（BTE）**描述能量输运。
* 若尺寸进一步缩小到声子波长量级，**声子的波动特性**变得重要。

**第一性原理声子玻尔兹曼输运方程（PBTE）**方法本质上是以下三种技术的结合：

* **第一性原理方法（ab initio 方法）**：求解**薛定谔方程**的数值方法。
* **晶格动力学方法**：基于原子间力常数（IFCs）计算声子色散和弛豫时间的方法。
* **玻尔兹曼输运方程（BTE）**：以声子色散和弛豫时间为输入，计算系统总热导率的热输运模型。


## 1. 第一性原理方法

第一性原理（ab initio）方法是指在量子力学框架内求解材料电子结构和原子相互作用的方法，使用**最少的经验参数**。主要基于薛定谔方程的数值解，得到基态电子密度、能带结构、总能量等物理量。
在固体物理和材料科学中，第一性原理方法通常基于**密度泛函理论（DFT）**。由于完整的多体薛定谔方程难以直接求解，DFT 通过电子密度高效处理多体问题，广泛应用于金属、半导体、绝缘体、分子和表面。

### 1.1 密度泛函理论的基本概念

DFT 的核心概念源于 Hohenberg-Kohn 定理和 Kohn-Sham 方程：

1. **Hohenberg-Kohn 定理**指出，系统的所有基态物理量都是电子密度 $\rho(\mathbf{r})$ 的泛函，即哈密顿量和能量由电子密度唯一确定。
2. **Kohn-Sham 方程**将真实的多电子系统映射到一个非相互作用电子的辅助系统，使用适当的**交换关联势**来近似电子-电子相互作用。多体问题因此转化为求解一组类似单粒子的方程：

$$
\left[ -\frac{\hbar^2}{2m}\nabla^2 + V_\text{ext}(\mathbf{r}) + V_\text{H}(\mathbf{r}) + V_\text{xc}(\mathbf{r}) \right] \phi_i(\mathbf{r}) = \epsilon_i \phi_i(\mathbf{r})
$$

其中：

* $V_\text{ext}(\mathbf{r})$：原子核的库仑势
* $V_\text{H}(\mathbf{r})$：经典 Hartree 势
* $V_\text{xc}(\mathbf{r})$：包含所有复杂多体效应的交换关联势

实际计算中需要选择交换关联泛函（如 LDA、GGA 或杂化泛函），并采用处理实空间和倒空间的方法（如赝势、PAW、APW+lo 等）。

### 1.2 从 DFT 获取原子间力常数（IFCs）

热导率计算的关键步骤之一是确定材料的**原子间力常数（IFCs）**。这些常数用于构建动力学矩阵，计算声子色散和声子寿命等晶格动力学性质。IFCs 可通过以下两种主要的第一性原理方法获得：

#### 1.2.1 密度泛函微扰理论（DFPT）

在 DFPT 框架中，对周期结构施加小的周期性微扰，求解线性化的 Kohn-Sham 方程，获得势能对原子位移的一阶、二阶或三阶响应。

* DFPT 可直接在 $\mathbf{q}$ 空间计算 IFCs 和声子模式。
* 二阶（谐波）和三阶（非谐波）IFCs 均可获取，用于声子色散和散射分析。

#### 1.2.2 有限位移法（FDM）

在该方法中，对超胞中的原子施加小位移（如 0.01 Å），利用能量或力的变化计算二阶及高阶 IFCs：

* 需要足够大的超胞以确保跨边界相互作用可忽略。
* 需要计算多个不同位移的构型以提取完整的 IFCs。

两种方法均依赖 DFT 层面的力或能量计算。由于声子性质对计算精度敏感，需仔细选择交换关联泛函、平面波截断能和 k 点网格以确保 IFCs 的准确性。

## 2. 谐波与非谐波晶格动力学

在**谐波晶格动力学**中，使用二阶 IFCs 获得声子色散关系 $\omega_\lambda(\mathbf{q})$。一旦色散已知，可计算每个声子模式 $\lambda$ 的比热容。
声子群速度定义为频率对波矢的梯度：$\mathbf{v}_\lambda = \nabla_\mathbf{q} \omega_\lambda$
**弛豫时间** $\tau_\lambda$ 通过**非谐波晶格动力学**获得，涉及二阶和高阶 IFCs。

### 2.1 色散关系

对于平衡位置附近小位移的周期性晶体，总势能 $U$ 可展开为泰勒级数：

$$
U = U_0 + \frac{1}{2!} \sum_{ij}\sum_{\alpha\beta} \Phi_{ij}^{\alpha\beta} u_i^\alpha u_j^\beta + \frac{1}{3!} \sum_{ijk}\sum_{\alpha\beta\gamma} \Psi_{ijk}^{\alpha\beta\gamma} u_i^\alpha u_j^\beta u_k^\gamma + \mathcal{O}(u^4)
$$

其中：

* $U_0$：平衡态势能
* $u_{i}^\alpha$：原子 $i$ 在 $\alpha$ 方向的位移
* $\Phi_{ij}^{\alpha\beta}$：二阶 IFCs（谐波）
* $\Psi_{ijk}^{\alpha\beta\gamma}$：三阶 IFCs（非谐波）
* $\mathcal{O}(u^4)$：高阶项

由于力平衡，一阶项为零。忽略高阶项即得谐波近似。

若原子 $i$ 属于第 $l$ 个单胞的第 $b$ 个原子，$j$ 属于第 $l'$ 个单胞，运动方程为：

$$
m_b\frac{d^2 u_{lb}^\alpha (t)}{d t^2} = -\sum_{l'b',\beta} \Phi_{lb,l'b'}^{\alpha\beta} u_{l'b'}^{\beta} (t)
$$

假设平面波解：

$$
u_{lb}^\alpha (t) = \frac{1}{\sqrt{m_b}}\Lambda_\lambda e_{b,\lambda}^\alpha e^{i(\mathbf q\cdot\mathbf R_l - \omega_\lambda t)}
$$

代入得本征值方程：

$$
\omega_\lambda^2 \mathbf e _{b,\lambda} = \mathbf D_{bb'}^{\alpha\beta}(\textbf q) \textbf e_{b,\lambda}
$$

其中**动力学矩阵**为：

$$
\mathbf D_{bb'}^{\alpha\beta}(\textbf q) =\frac{1}{\sqrt{m_bm_{b'}}}\sum_{l'}\Phi_{0b,l'b'}^{\alpha\beta} e^{i\mathbf q\cdot(\mathbf R_{l'} - \mathbf R_0)}
$$

求解得声子色散 $\omega_\lambda(\mathbf{q})$ 及对应本征矢 $\{e_{b,\lambda}^\alpha\}$。

### 2.2 声子散射机制与弛豫时间

在实际材料中，声子因各种散射机制具有有限寿命。在 BTE 框架中，这些机制表示为**散射率** $\Gamma_\lambda$ 或等价地**弛豫时间** $\tau_\lambda$。

#### 2.2.1 声子-声子散射

在非金属中，主导散射为**声子-声子相互作用**，即非谐波晶格效应。量子力学中，晶体哈密顿量分为谐波和非谐波部分。
三阶散射（三声子过程）包括组合和分裂过程。需满足能量和动量守恒（包括倒逆过程）：

$$
\Gamma_{\lambda\lambda'\lambda''}^{\pm} = \frac{\hbar\pi}{4}\begin{Bmatrix}n_{\lambda'}-n_{\lambda''} \\ n_{\lambda'} + n_{\lambda''}+1 \end{Bmatrix} \frac{\delta(\omega_\lambda\pm\omega_{\lambda'} - \omega_{\lambda''})}{\omega_{\lambda}\omega_{\lambda'}\omega_{\lambda''}}|V_{\lambda\lambda'\lambda''}^{\pm}|^2\Delta_{\mathbf{G}, \,\mathbf{q}\pm \mathbf{q}' - \mathbf{q}''}
$$

#### 2.2.2 声子-杂质散射

由杂质（如同位素、缺陷）引起的质量或成键微扰：

$$
\Gamma_{\lambda\lambda'} = \frac{\pi \omega_\lambda^2}{2}\delta(\omega_\lambda - \omega_{\lambda'})\sum_bg(b) |\mathbf e_{b,\lambda}^*\cdot \mathbf e_{b,\lambda'}|^2
$$

其中 $g(b) = \sum_s f_s(b)(1 - \frac{m_{b,s}}{\overline{m}_b})^2$，$\overline{m}_b = \sum_s f_s(b) m_{b,s}$。

## 3. 热导率与玻尔兹曼输运方程（BTE）

### 3.1 热导率

根据傅里叶定律，热导率 $\kappa$ 表征材料导热的能力：

$$
\mathbf{J} = -\kappa \nabla T
$$

其中 $\mathbf{J}$ 为热流矢量，$\nabla T$ 为温度梯度。在各向异性材料中，$\kappa$ 为张量。

要从声子性质预测 $\kappa$，需用 BTE 描述小温度梯度下的非平衡声子分布。假设稳态和小梯度条件，线性化 BTE 为：

$$
-\mathbf{v}_\lambda \nabla T \frac{\partial n_\lambda^0}{\partial T} = \frac{n_\lambda'}{\tau_\lambda}
$$

其中：

* $n_\lambda = n_\lambda^0 + n_\lambda'$ 为声子分布
* $n_\lambda^0$ 为平衡 Bose–Einstein 分布
* $n_\lambda'$ 为对平衡态的偏离
* $\tau_\lambda$ 为弛豫时间
* $\mathbf{v}_\lambda$ 为模式 $\lambda$ 的群速度

Bose–Einstein 分布：

$$
n_\lambda^0 = \frac{1}{\exp\left(\frac{\hbar \omega_\lambda}{k_B T}\right) - 1}
$$

声子贡献的热流：

$$
\mathbf{J} = \frac{1}{V} \sum_\lambda \hbar\omega_\lambda \mathbf{v}_\lambda n_\lambda
$$

其中 $V = N_0 \cdot \Omega$ 为总体积（$\Omega$ = 单胞体积，$N_0$ = $\mathbf{q}$ 点数）。与傅里叶定律比较得热导率张量：

$$
\kappa^{\alpha\beta} = \frac{1}{V}\sum_\lambda \hbar\omega_\lambda \frac{\partial n_\lambda^0}{\partial T} v_\lambda^\alpha v_\lambda^\beta \tau_\lambda = \sum_\lambda c_\lambda v_\lambda^\alpha v_\lambda^\beta \tau_\lambda
$$

其中 $c_\lambda = \frac{\hbar\omega_\lambda}{V}\frac{\partial n_\lambda^0}{\partial T}$ 为模式热容量。
对于各向同性系统：

$$
\kappa = \frac{1}{3V}\sum_\lambda \hbar\omega_\lambda \frac{\partial n_\lambda^0}{\partial T} |\mathbf{v}_\lambda|^2 \tau_\lambda
$$

### 3.2 单模弛豫时间近似（SMRTA）

SMRTA 假设除模式 $\lambda$ 外的所有声子模式保持平衡：

$$
\begin{cases}
n_\lambda = n_\lambda^0 + n_\lambda' \\
n_{\lambda'} = n_{\lambda'}^0 \\
n_{\lambda''} = n_{\lambda''}^0
\end{cases}
$$

SMRTA 弛豫时间为：

$$
\frac{1}{\tau_\lambda^0} = \sum_{\lambda'\lambda''}^+ \Gamma_{\lambda\lambda'\lambda''}^+ + \sum_{\lambda'\lambda''}^- \frac{1}{2} \Gamma_{\lambda\lambda'\lambda''}^- + \sum_{\lambda'}\Gamma_{\lambda\lambda'}
$$

上标 0 表示这是零阶近似。

### 3.3 迭代求解法

为克服 SMRTA 的局限性，**全迭代法**自洽求解 BTE：

$$
\begin{cases}
n_\lambda = n_\lambda^0 + n_\lambda' \\
n_{\lambda'} = n_{\lambda'}^0 + n_{\lambda'}' \\
n_{\lambda''} = n_{\lambda''}^0 + n_{\lambda''}'
\end{cases}
$$

**初始猜测**：
使用 SMRTA 的 $\tau_\lambda^0$。

**自洽迭代**：
对所有 $n_\lambda'$ 形成耦合方程组并迭代至收敛。

弛豫时间变为：

$$
\tau_\lambda = \tau_\lambda^0 + \tau_\lambda^0 \Delta_\lambda
$$

$$
\Delta_\lambda = \sum_{\lambda'\lambda''}^+ \Gamma_{\lambda\lambda'\lambda''}^+ (\xi_{\lambda\lambda''}\tau_{\lambda''} - \xi_{\lambda\lambda'}\tau_{\lambda'}) \\ + \sum_{\lambda'\lambda''}^- \frac{1}{2} \Gamma_{\lambda\lambda'\lambda''}^-(\xi_{\lambda\lambda''}\tau_{\lambda''} + \xi_{\lambda\lambda'}\tau_{\lambda'}) \\+ \sum_{\lambda'}\Gamma_{\lambda\lambda'}\xi_{\lambda\lambda'}\tau_{\lambda'}
$$

该方法包含更详细的相互作用，更好地捕捉**Normal 过程引起的声子再分配**，尤其在高热导率或低温系统中表现优异。但计算量也更大。

## 4. 计算流程与软件

计算声子热导率的一般流程包括：

### (1) 提取原子间力常数（IFCs）

IFCs 是晶格动力学和热输运的基础。可通过以下方式获得：

* **经典势**：适用于已知势函数的简单结构
* **机器学习势（MLPs）**：近年发展，平衡精度与效率
* **第一性原理（DFT）**：最常用且无经验参数的最准确方法

两种主要提取方法：

* **有限位移法**：在超胞中施加小位移，利用数值微分获取 IFCs（支持经典/ML/DFT）。
* **DFPT**：DFT 框架内的微扰方法；直接在倒空间计算 IFCs。

### (2) 截断与对称性修正

理论上 IFCs 存在于所有原子对之间。实际中需施加**截断半径**。应测试不同截断的影响。

此外，由于数值噪声和截断，计算得到的 IFCs 可能违反**平移不变性**或晶体对称性。必须进行修正以确保热导率计算准确。

### (3) 计算热导率

利用二阶和三阶 IFCs，结合**非谐波晶格动力学**和**BTE**：

* **SMRTA**：快速估计
* **全迭代求解**：更准确，尤其适用于高 $\kappa$ 或低温系统

该方法**不需要拟合参数**，只需初始原子结构。具有高度预测性，已得到广泛实验验证。

### (4) 数值误差与适用性

尽管该方法优势明显，但对以下因素仍然敏感：

* DFT 收敛性、泛函选择和位移大小
* IFC 截断半径
* 布里渊区积分网格（q 网格）

尽管如此，PBTE 被认为是预测晶格热导率最可靠的方法之一。它不仅能给出**总 $\kappa$**，还能给出**模式分辨的贡献**，使界面热导和纳米尺度输运研究成为可能。

### (5) 软件与接口

多个开源软件包支持此工作流程：

* **ShengBTE**
* **phono3py**

这些软件与主要的第一性原理代码集成良好：

* **VASP**
* **Quantum ESPRESSO**
* **ABINIT**

它们实现了从结构优化到 IFC 提取和热导率预测的端到端自动化工作流程。
