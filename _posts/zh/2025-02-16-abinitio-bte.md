---
layout: post
title: "从第一性原理到晶格热导率：PBTE 方法"
lang: zh
translation_key: abinitio-bte
permalink: /zh/blog/2025/02/16/abinitio-bte/
date: 2025-02-16 06:36:10
last_updated: 2026-06-21
reading_time: "22 min"
description: "从物理角度系统介绍第一性原理声子玻尔兹曼输运方法，连接 DFT、原子间力常数、碰撞算符、数值收敛与晶格热导率。"
tags: method phonon thermal-transport
categories: calculation
related_posts: true
featured: false
toc:
  sidebar: left
---

从原子结构预测晶格热导率，并不只是计算声子色散，再为每个模式指定一个寿命。真正的核心问题是：温度梯度如何使声子布居偏离平衡，散射如何在模式空间中重新分配这种偏离，以及最终有哪些热流分量能够保留下来。

第一性原理声子玻尔兹曼输运方程（PBTE）连接了三个描述层次：

1. **电子结构**决定势能面及其对原子位移的导数；
2. **晶格动力学**将这些导数转化为声子频率、本征矢、群速度和相互作用矩阵元；
3. **线性化 PBTE**确定非平衡声子分布以及晶格热导率张量。

这一方法的优势在于，它不仅给出一个拟合的体材料数值，还能揭示微观输运机制。但它并非绝对意义上的精确或“无参数”方法。预测结果依赖电子结构近似、数值收敛、非谐展开的截断阶数，以及声子准粒子图像是否成立。

本文承接前面关于[傅里叶定律如何从微观输运中出现]({{ '/zh/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }})以及[Normal 与 Umklapp 散射]({{ '/zh/blog/2026/06/20/normal-umklapp-collective-heat-flow/' | relative_url }})的讨论。这里关注的是方法本身：一个原子结构究竟怎样变成对 $\boldsymbol\kappa$ 的预测？

## 1. 第一性原理 PBTE 的适用范围

传统 PBTE 工作流主要用于周期晶体中的近平衡晶格热输运，并假设晶格振动能够由相对明确的声子准粒子描述。

它最自然的输出是体晶体的内禀晶格热导率，也可以进一步加入同位素、缺陷、电子–声子或边界散射模型。PBTE 特别适合回答以下问题：

- 哪些频率、波矢和极化分支携带了主要热流？
- 哪些散射通道限制了热导率？
- 热导率如何随温度、同位素组成或晶向变化？
- 体热导率背后对应怎样的声子平均自由程谱？
- 弛豫时间近似与完整碰撞算符解之间有多大差异？

这一方法不会自动描述界面、有限尺寸器件或强非局域热输运。即使体材料声子性质来自第一性原理，这些问题仍然需要额外的边界条件或其他输运理论。

## 2. “第一性原理”提供了什么

在这里，第一性原理计算不能被简单描述为“求解薛定谔方程”。实际计算通常使用密度泛函理论（DFT），在给定交换关联泛函、赝势或全电子方法、基组以及布里渊区采样的条件下，近似得到电子基态能量和原子受力。

Kohn–Sham 方程为

$$
\left[
-\frac{\hbar^2}{2m_e}\nabla^2
+V_{\mathrm{ext}}(\boldsymbol r)
+V_{\mathrm H}[\rho](\boldsymbol r)
+V_{\mathrm{xc}}[\rho](\boldsymbol r)
\right]
\phi_i(\boldsymbol r)
=\varepsilon_i\phi_i(\boldsymbol r).
$$

对于晶格动力学，最重要的结果通常不是电子能带本身，而是平衡构型附近 Born–Oppenheimer 势能面的准确局域表示。

因此，“不需要经验拟合”这一说法也应谨慎使用。标准 DFT-PBTE 计算通常不会用实验热导率拟合模型，但仍然包含许多建模选择与近似。交换关联泛函、平衡体积、赝势、长程静电相互作用以及磁性或相对论效应，都可能继续影响声子谱和散射率。

## 3. 原子间力常数：势能面的导数

令 $u_{lb}^{\alpha}$ 表示第 $l$ 个晶胞中原子 $b$ 沿笛卡尔方向 $\alpha$ 的位移。在平衡位置附近展开势能：

$$
U=U_0
+\frac{1}{2!}\sum_{lb,l'b'}\sum_{\alpha\beta}
\Phi_{lb,l'b'}^{\alpha\beta}
u_{lb}^{\alpha}u_{l'b'}^{\beta}
+\frac{1}{3!}\sum_{lb,l'b',l''b''}\sum_{\alpha\beta\gamma}
\Psi_{lb,l'b',l''b''}^{\alpha\beta\gamma}
u_{lb}^{\alpha}u_{l'b'}^{\beta}u_{l''b''}^{\gamma}
+\mathcal O(u^4).
$$

对于充分弛豫的平衡结构，一阶项为零。展开系数就是原子间力常数（IFC）：

$$
\Phi_{ij}^{\alpha\beta}
=\frac{\partial^2U}
{\partial u_i^{\alpha}\partial u_j^{\beta}},
\qquad
\Psi_{ijk}^{\alpha\beta\gamma}
=\frac{\partial^3U}
{\partial u_i^{\alpha}\partial u_j^{\beta}\partial u_k^{\gamma}}.
$$

二阶 IFC 决定谐性声子，三阶 IFC 产生最低阶三声子相互作用。四阶及更高阶项会影响频率重整化和高阶散射，在高温或强非谐材料中可能非常重要。

### 3.1 有限位移法

在超胞有限位移计算中，对选定原子施加位移并计算对应受力。晶体对称性可以减少所需构型数量，随后通过有限差分或回归得到 IFC。

位移幅度必须足够大，使受力信号超过数值噪声，同时又必须足够小，以保证处于目标 Taylor 展开的适用区间。谐性计算经常使用接近 $0.01$ Å 的位移，但这不是普适数值，仍应进行测试。

三阶及更高阶 IFC 需要更多位移构型。压缩感知、系统回归和机器学习势可以降低计算成本，但也会引入训练集、正则化和验证等新的要求。

### 3.2 密度泛函微扰理论

密度泛函微扰理论（DFPT）通过求解线性化自洽方程，计算系统对周期微扰的响应。它在谐性声子、介电张量和 Born 有效电荷等倒空间计算中尤其成熟。

虽然也存在高阶响应理论，但不同电子结构软件对三阶 IFC 的支持程度和使用便利性并不相同。实际 PBTE 工作流通常采用 DFPT 或有限位移获得二阶 IFC，再通过有限位移受力提取三阶 IFC。

## 4. 谐性晶格动力学

谐性运动方程为

$$
m_b\frac{d^2u_{lb}^{\alpha}}{dt^2}
=-\sum_{l'b'\beta}
\Phi_{lb,l'b'}^{\alpha\beta}u_{l'b'}^{\beta}.
$$

代入平面波形式后得到本征值方程：

$$
\sum_{b'\beta}
D_{bb'}^{\alpha\beta}(\boldsymbol q)
e_{b'\beta}^{\lambda}
=\omega_\lambda^2e_{b\alpha}^{\lambda},
$$

其中 $\lambda=(\boldsymbol q,j)$ 表示波矢和声子分支。动力学矩阵为

$$
D_{bb'}^{\alpha\beta}(\boldsymbol q)
=\frac{1}{\sqrt{m_bm_{b'}}}
\sum_{l'}
\Phi_{0b,l'b'}^{\alpha\beta}
\exp\!\left[i\boldsymbol q\cdot
(\boldsymbol R_{l'}-\boldsymbol R_0)\right].
$$

对动力学矩阵进行对角化，可以得到声子频率 $\omega_\lambda$ 和本征矢 $\boldsymbol e_\lambda$。群速度定义为

$$
\boldsymbol v_\lambda=\nabla_{\boldsymbol q}\omega_\lambda.
$$

模式热容为

$$
C_\lambda
=\hbar\omega_\lambda
\frac{\partial n_\lambda^0}{\partial T},
\qquad
n_\lambda^0
=\frac{1}{\exp(\hbar\omega_\lambda/k_BT)-1}.
$$

在进行输运计算之前，谐性模型应首先满足基本物理约束。虚频可能意味着结构确实不稳定，也可能来自计算尚未收敛、参考相选择不当或拟合 IFC 破坏了不变性。不能在没有诊断原因的情况下简单删除虚频。

## 5. 非谐性与声子散射

三阶 IFC 决定三声子吸收和衰变过程的矩阵元 $V_{\lambda\lambda'\lambda''}$。允许过程必须满足能量守恒和晶格动量选择定则：

$$
\omega_\lambda+\omega_{\lambda'}=\omega_{\lambda''},
\qquad
\boldsymbol q+\boldsymbol q'
=\boldsymbol q''+\boldsymbol G,
$$

或者

$$
\omega_\lambda=\omega_{\lambda'}+\omega_{\lambda''},
\qquad
\boldsymbol q
=\boldsymbol q'+\boldsymbol q''+\boldsymbol G.
$$

由费米黄金规则得到的散射率具有如下示意结构：

$$
\Gamma^{(3)}
\propto
|V_{\lambda\lambda'\lambda''}|^2
\times\text{布居因子}
\times\delta(\Delta\omega)
\times\Delta_{\boldsymbol q,\boldsymbol G}.
$$

在离散 $\boldsymbol q$ 网格上，能量 delta 函数必须通过展宽方法或类似四面体积分的方法进行数值处理。计算结果可能对网格密度和积分参数十分敏感。

同位素散射通常作为弹性质量无序散射处理。缺陷、边界、电子以及四声子相互作用则需要额外模型或矩阵元。利用 Matthiessen 规则直接相加散射率有时很实用，但当不同碰撞机制并非独立时，它也可能掩盖模式耦合和相关性。

## 6. 从平衡声子到线性化 PBTE

在较小温度梯度下，将声子分布写成

$$
n_\lambda
=n_\lambda^0
-\frac{\partial n_\lambda^0}{\partial T}
\boldsymbol F_\lambda\cdot\nabla T,
$$

其中 $\boldsymbol F_\lambda$ 是待求的矢量平均自由位移响应。热流由非平衡部分决定：

$$
\boldsymbol J_Q
=-\frac{1}{V}\sum_\lambda
C_\lambda\boldsymbol v_\lambda
(\boldsymbol F_\lambda\cdot\nabla T).
$$

与 $J_Q^{\alpha}=-\kappa^{\alpha\beta}\nabla_\beta T$ 比较，得到

$$
\kappa^{\alpha\beta}
=\frac{1}{V}\sum_\lambda
C_\lambda v_\lambda^{\alpha}F_\lambda^{\beta}.
$$

$\boldsymbol F$ 由一个线性方程组确定，其示意形式为

$$
\sum_{\lambda'}
\Omega_{\lambda\lambda'}
\boldsymbol F_{\lambda'}
=\boldsymbol v_\lambda.
$$

$\boldsymbol\Omega$ 是线性化碰撞算符。其对角项描述声子离开某一模式，非对角项描述其他模式的再布居。不同推导和软件对 $\boldsymbol\Omega$、驱动项以及 $\boldsymbol F$ 的归一化定义可能不同，但物理含义一致：热导率由碰撞算符的逆在载热响应方向上的投影决定。

## 7. RTA 与完整碰撞算符解

在单模弛豫时间近似（RTA）中，模式之间的非对角耦合被忽略：

$$
\boldsymbol F_\lambda^{\mathrm{RTA}}
=\tau_\lambda\boldsymbol v_\lambda.
$$

于是热导率为

$$
\kappa_{\mathrm{RTA}}^{\alpha\beta}
=\frac{1}{V}\sum_\lambda
C_\lambda v_\lambda^{\alpha}
v_\lambda^{\beta}\tau_\lambda.
$$

对于各向同性材料，可约化为熟悉的动理学形式：

$$
\kappa_{\mathrm{RTA}}
=\frac{1}{3V}\sum_\lambda
C_\lambda|\boldsymbol v_\lambda|^2\tau_\lambda.
$$

RTA 计算成本低，也便于理解，但它把每个散射事件都视为模式独立地趋向静止平衡分布，因此会丢失动量守恒 Normal 过程产生的大部分集体再布居效应。

迭代、变分或直接求解方法保留完整耦合碰撞算符。当 N 散射很强时，完整解与 RTA 的差异尤其重要。不过，两者之间差异很大并不能单独证明流体动力学输运，还需要分析慢集体模式、阻性长度、边界和实验几何。

## 8. 一个可靠的计算工作流

可信的 PBTE 计算是一系列收敛与验证问题，而不是一条命令。

### 8.1 弛豫参考结构

需要收敛平衡体积、晶胞形状、原子位置以及必要时的磁性状态。残余应力和受力会改变谐性声子谱，并可能显著影响低频模式。

### 8.2 收敛电子结构计算

测试基组截断能、电子 $\boldsymbol k$ 网格、展宽方案、自洽阈值、赝势或 PAW 数据集以及交换关联泛函。收敛性应根据受力、应力和声子敏感量判断，而不应只检查总能量。

### 8.3 确定谐性 IFC

选择能够覆盖相互作用范围的超胞或倒空间网格。检查平移与转动不变性、$\Gamma$ 点附近的声学模式、极性材料中的非解析修正，并在可能时与实验或独立计算的声子色散进行比较。

### 8.4 确定非谐 IFC

收敛超胞尺寸、位移幅度、相互作用截断和回归设置。应谨慎施加对称性和求和规则：修正可以降低数值噪声，但不能用来掩盖过小超胞或不完整模型。

### 8.5 构造碰撞算符

根据材料和温度范围加入必要的散射机制。三声子加同位素散射是常见起点，而不是普适终点。四声子散射、温度重整化声子、电子–声子散射、缺陷或边界效应都可能需要考虑。

### 8.6 求解并收敛 PBTE

收敛声子 $\boldsymbol q$ 网格、能量守恒积分以及迭代求解器阈值。比较 RTA 和完整解，并检查热导率张量对称性，而不只是标量平均值。

### 8.7 验证不止一个总热导率

总热导率与实验吻合也可能来自相互抵消的误差。条件允许时，应同时比较：

- 声子色散和态密度；
- 模式 Grüneisen 参数；
- 热容；
- 声子线宽或寿命；
- 热导率的温度依赖；
- 方向各向异性；
- 以及热导率随频率或平均自由程的累积关系。

## 9. 数值误差预算

PBTE 结果应当附带完整的收敛说明。主要不确定性可能来自多个层次。

| 层次 | 典型不确定性来源 | 有效诊断量 |
| --- | --- | --- |
| 电子结构 | 泛函、体积、赝势、$\boldsymbol k$ 网格 | 受力、应力、弹性常数、声子频率 |
| 谐性 IFC | 超胞、长程静电作用、求和规则 | 声学模式、色散、群速度 |
| 非谐 IFC | 位移幅度、截断、回归、超胞 | Grüneisen 参数、线宽稳定性 |
| 布里渊区积分 | $\boldsymbol q$ 网格、展宽或四面体 | $\kappa$ 随网格及积分参数的变化 |
| 碰撞物理 | 遗漏四声子、电子、缺陷或边界项 | 温度趋势和模式分辨散射率 |
| 输运模型 | RTA、迭代 PBTE、忽略相干 | RTA/完整解比较及模式重叠分析 |

仅报告最终结果，例如“$\kappa=150$ W m$^{-1}$ K$^{-1}$”，并不能证明预测可靠。可信的研究应说明关键中间物理量已经稳定，并具有可解释性。

## 10. 传统 PBTE 何时不够

标准声子气体 PBTE 依赖可分离的准粒子布居。当出现以下情况时，通常需要扩展：

- 样品尺寸与重要平均自由程相当，输运具有非局域性；
- 边界和接触决定载流子分布；
- 非谐性随温度显著重整化声子频率；
- 四声子散射与三声子散射相当；
- 电子–声子耦合显著增加声子热阻；
- 近简并模式通过模式间相干携带热量；
- 无序足够强，使传播声子不再是唯一合适的激发图像。

有限尺寸器件可能需要空间分辨 BTE、Monte Carlo、确定性输运或 Landauer 方法。强非谐晶体可能需要自洽声子或温度相关有效势。复杂晶体和无序固体则可能需要包含非对角相干项的 Wigner 或密度矩阵方法。

因此，更合适的问题不是孤立地问“PBTE 是否准确”，而是问：“当前 PBTE 是否包含了这个材料、温度和几何条件下真正重要的慢变量与散射机制？”

## 11. 软件是实现工具，不能代替验证

常用工具包括 **phonopy/phono3py**、**ShengBTE**，以及它们与 VASP、Quantum ESPRESSO、ABINIT 等电子结构软件的接口。这些软件可以自动完成大量代数运算和数据处理，但不能替研究者判断 IFC 截断是否充分、虚频是否真实，或者遗漏的散射机制是否重要。

可复现计算至少应记录：

- 软件版本及相关编译选项；
- 电子结构输入和赝势标识；
- 弛豫后的结构；
- 超胞矩阵和位移幅度；
- IFC 截断与拟合流程；
- $\boldsymbol k$ 和 $\boldsymbol q$ 网格；
- 积分方法和求解器参数；
- 以及所报告物理量的收敛数据。

可复现性的目标不仅是重新运行同一工作流，还要使其中的物理近似能够被检查。

## 12. 这一方法真正预测了什么

第一性原理 PBTE 最适合被理解为一系列受控约化：

$$
\text{电子基态}
\longrightarrow
\text{能量导数与 IFC}
\longrightarrow
\text{声子模式及相互作用}
\longrightarrow
\text{碰撞算符}
\longrightarrow
\text{非平衡分布}
\longrightarrow
\boldsymbol\kappa.
$$

每一个箭头都会引入数值选择和物理假设。该方法的优势在于，这些选择可以被系统检验，并且最终热导率可以被分解成具有明确意义的微观贡献。

最重要的结果并不是某一个 $\kappa$ 数值，而是解释哪些激发携带热量、哪些碰撞破坏或重新分配它们的集体运动，以及宏观输运系数为什么会从原子尺度动力学中出现。

## 参考文献

1. S. Baroni, S. de Gironcoli, A. Dal Corso, and P. Giannozzi, “Phonons and related crystal properties from density-functional perturbation theory,” *Reviews of Modern Physics* **73**, 515–562 (2001).
2. D. A. Broido, M. Malorny, G. Birner, N. Mingo, and D. A. Stewart, “Intrinsic lattice thermal conductivity of semiconductors from first principles,” *Applied Physics Letters* **91**, 231922 (2007).
3. K. Esfarjani, G. Chen, and H. T. Stokes, “Heat transport in silicon from first-principles calculations,” *Physical Review B* **84**, 085204 (2011).
4. M. Omini and A. Sparavigna, “Beyond the isotropic-model approximation in the theory of thermal conductivity,” *Physical Review B* **53**, 9064–9073 (1996).
5. L. Chaput, “Direct solution to the linearized phonon Boltzmann equation,” *Physical Review Letters* **110**, 265506 (2013).
6. W. Li, J. Carrete, N. A. Katcho, and N. Mingo, “ShengBTE: A solver of the Boltzmann transport equation for phonons,” *Computer Physics Communications* **185**, 1747–1758 (2014).
7. A. Togo, L. Chaput, and I. Tanaka, “Distributions of phonon lifetimes in Brillouin zones,” *Physical Review B* **91**, 094306 (2015).
8. M. Simoncelli, N. Marzari, and F. Mauri, “Unified theory of thermal transport in crystals and glasses,” *Nature Physics* **15**, 809–813 (2019).
