---
layout: post
title: "声子的粒子性与波动性：Wigner 输运方程如何统一两种图像"
lang: zh
translation_key: phonon-wave-particle-wigner-transport
permalink: /zh/blog/2026/06/21/phonon-wave-particle-wigner-transport/
date: 2026-06-21 12:00:00
last_updated: 2026-06-21
reading_time: "16 min"
description: "从声子布居与模式相干出发，解释粒子图像何时有效、何时需要 Wigner 输运方程，以及热导率如何分解为布居与相干贡献。"
tags: theory phonon wigner-transport
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

声子常被称为晶格振动的量子，也常被当作携带能量并发生散射的准粒子。这两种说法并不矛盾，但它们强调的物理信息不同。

在声子玻尔兹曼输运方程中，每个模式具有频率、群速度、布居和寿命，热流来自大量声子的漂移。这是粒子图像。可是晶格振动本质上是波，不同本征模式之间可以保持相位关系、发生杂化，并通过非对角相干传递能量。当这些相干不能在输运时间尺度内忽略时，只追踪每个模式“有多少声子”就不再充分。

前面的文章分别讨论了[傅里叶定律的尺度极限]({{ '/zh/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }})、[Normal 与 Umklapp 碰撞]({{ '/zh/blog/2026/06/20/normal-umklapp-collective-heat-flow/' | relative_url }})以及[第一性原理 PBTE 工作流]({{ '/zh/blog/2025/02/16/abinitio-bte/' | relative_url }})。本文只沿着另一条主线展开：当声子布居不足以描述热输运时，Wigner 方程怎样把粒子传播与波动相干放进同一个动力学框架？

## 粒子与波不是两个互斥的声子

对周期晶体，谐性动力学矩阵给出本征模式

$$
\lambda=(\boldsymbol q,s),
$$

其中 $\boldsymbol q$ 是波矢，$s$ 是分支。模式具有频率 $\omega_{\boldsymbol q s}$ 和群速度

$$
\boldsymbol v_{\boldsymbol q s}
=\nabla_{\boldsymbol q}\omega_{\boldsymbol q s}.
$$

如果只关心模式布居 $n_{\boldsymbol q s}$，一个声子就表现为能量为 $\hbar\omega_{\boldsymbol q s}$、以群速度传播并被碰撞重新分配的准粒子。传统 PBTE 正是求解这些布居对平衡分布的偏离。

波动性包含更多信息。设 $\hat a_{\boldsymbol q s}$ 是模式的湮灭算符，则单粒子密度矩阵可以写为

$$
N_{ss'}(\boldsymbol q)
=\langle
\hat a_{\boldsymbol q s'}^{\dagger}
\hat a_{\boldsymbol q s}
\rangle.
$$

对角元 $N_{ss}$ 就是模式布居；非对角元 $N_{ss'}$ 则记录两个振动分支之间的相位关联。粒子图像不是“错误的波动理论”，而是密度矩阵在模式表象中近似对角时得到的约化描述。

因此，真正的分界并不是问“声子究竟是粒子还是波”，而是问：**在给定材料、温度和观测尺度下，非对角相干是否能在形成热流之前被安全消去？**

## 为什么只追踪声子布居有时不够

若两个模式的频率相差很大，它们之间的相对相位会快速旋转，长时间平均后非对角贡献通常相互抵消。此时每个模式都可以被清楚区分，布居和寿命构成有效的动力学变量。

问题出现在频率间隔与线宽可比时。用

$$
\Delta\omega_{ss'}
=|\omega_s-\omega_{s'}|,
\qquad
\Gamma_{ss'}=\Gamma_s+\Gamma_{s'},
$$

分别表示模式间隔和总展宽，一个常用的定性判据是

$$
\Delta\omega_{ss'}\lesssim\Gamma_{ss'}.
$$

此时“这是模式 $s$ 的声子还是模式 $s'$ 的声子”不再能在散射时间内被清楚分辨。复杂晶胞会产生密集声子支，局域共振会形成平坦或近简并模，强非谐性会增大线宽，无序则会进一步削弱传播模的独立性；这些因素都可能使模式相干进入热流。

这并不意味着线宽越大，波动贡献就一定越强。相干项来自模式混合、频率失谐与退相干之间的竞争：线宽太窄时，频率不同的模式会因快速相位旋转而平均掉；线宽过宽时，相干本身又会迅速衰减。最显著的交叉通常出现在间隔与展宽处于相近量级时。

从这个角度看，传统声子气体模型适合能带稀疏、模式可辨识且准粒子寿命足够长的晶体；复杂晶体和无序固体则可能需要同时追踪布居与相干。两者之间不是一道材料类别的硬边界，而是由声子谱和线宽共同控制的连续过渡。

## Wigner 输运方程保留了什么

Wigner 描述把密度矩阵从纯粹的模式空间扩展到相空间，定义随位置、波矢和时间变化的矩阵分布

$$
\boldsymbol N(\boldsymbol r,\boldsymbol q,t).
$$

在温度变化尺度远大于晶胞、但又不预先丢弃分支间相干的条件下，声子 Wigner 输运方程可以写成

$$
\frac{\partial\boldsymbol N}{\partial t}
+i[\boldsymbol\Omega,\boldsymbol N]
+\frac{1}{2}\sum_{\alpha}
\left\{
\boldsymbol V^{\alpha},
\frac{\partial\boldsymbol N}{\partial r_{\alpha}}
\right\}
=
\left.\frac{\partial\boldsymbol N}{\partial t}\right|_{\mathrm{coll}}.
$$

这里 $\boldsymbol\Omega(\boldsymbol q)$ 是频率矩阵，$\boldsymbol V^{\alpha}(\boldsymbol q)$ 是速度算符，方括号和花括号分别表示对易子与反对易子。

这个方程的逻辑非常紧凑。第一项描述分布随时间变化；对易子

$$
i[\boldsymbol\Omega,\boldsymbol N]
$$

描述不同频率模式之间的相位进动；反对易子项描述能量在实空间中的传播，并同时包含对角群速度与非对角速度矩阵元；右端碰撞项则负责布居弛豫、模式再布居和相干退相干。

热流也不再只由对角布居给出。其矩阵形式可示意写为

$$
J^{\alpha}
=\frac{\hbar}{2VN_q}
\sum_{\boldsymbol q,ss'}
(\omega_s+\omega_{s'})
V^{\alpha}_{ss'}
N_{s's}.
$$

当 $s=s'$ 时，它退化为熟悉的“模式能量乘群速度乘非平衡布居”；当 $s\neq s'$ 时，热流来自不同振动分支之间的相干及非对角速度矩阵元。这正是 Wigner 方程能够同时容纳粒子与波动贡献的原因。

## 两种热导率怎样从同一个方程出现

在线性响应下，Wigner 方程给出的热导率可以组织为

$$
\boldsymbol\kappa
=\boldsymbol\kappa_{\mathrm P}
+\boldsymbol\kappa_{\mathrm C},
$$

其中 $\boldsymbol\kappa_{\mathrm P}$ 来自密度矩阵对角元的布居传播，$\boldsymbol\kappa_{\mathrm C}$ 来自非对角元的相干传输。

布居项在适当极限下回到 PBTE：热容、群速度和由碰撞算符确定的平均自由位移共同产生热流。它强调声子沿能带传播，在碰撞之间携带能量。

相干项则包含不同分支之间的速度矩阵元。忽略具体归一化约定，它的模式对贡献具有如下结构：

$$
\kappa_{\mathrm C}^{\alpha\beta}
\sim
\sum_{\boldsymbol q}\sum_{s\ne s'}
A_{ss'}(T)
V_{ss'}^{\alpha}V_{s's}^{\beta}
\frac{\Gamma_s+\Gamma_{s'}}
{(\omega_s-\omega_{s'})^2
+(\Gamma_s+\Gamma_{s'})^2/4},
$$

其中 $A_{ss'}(T)$ 汇集模式能量与平衡布居的热权重。这个类 Lorentz 结构清楚显示：相干贡献需要非零的非对角速度耦合，并在频率间隔与线宽可比时变得重要。

在简单晶体、支数较少且频率间隔远大于线宽时，$\kappa_{\mathrm C}$ 往往很小，Wigner 方程自然回到声子 Boltzmann 图像。随着晶胞变复杂、能带变密或无序增强，$\kappa_{\mathrm P}$ 可以减弱而 $\kappa_{\mathrm C}$ 增强；在相应极限下，这一框架能够连接传播声子的 Boltzmann 输运与无序固体中的 Allen–Feldman 型模间传输。

## 不要把相干、弹道与流体动力学混为一谈

Wigner 相干描述的是同一 $\boldsymbol q$ 附近不同振动分支之间的非对角密度矩阵。声子流体动力学描述的则是大量声子布居在强 Normal 碰撞下形成的集体漂移；即使密度矩阵在分支表象中近似对角，这种集体效应仍然可以存在。前者关心模式相位，后者关心碰撞守恒量，它们是两个不同维度的问题。

弹道输运也不等于波动输运。弹道只表示载流子在器件尺度内很少发生内部散射，一个完全基于对角布居的 Boltzmann 或 Landauer 模型也可以描述弹道热流。反过来，相干贡献可以出现在具有明显散射和有限线宽的体材料中。

对带有纳米柱、局域共振单元或复杂超晶胞的结构，平坦带、避免交叉和近简并模使 Wigner 分析尤其有吸引力。但观察到局域共振，并不能自动推出 $\kappa_{\mathrm C}$ 占主导；还需要检查频率间隔、线宽、非对角速度矩阵元及其热权重。类似地，用分子动力学与粒子 Monte Carlo 的差异定义“波动贡献”是一种针对具体结构的操作性分解，它与 Wigner 热导率中的 $\kappa_{\mathrm C}$ 有联系，却不是无需验证便可直接等同的量。

实际计算因此应沿着一条明确逻辑展开：先由动力学矩阵得到频率、本征矢和完整速度矩阵，再由非谐性获得线宽或更完整的碰撞算符，最后同时求解对角布居与非对角相干，并分别检查 $\kappa_{\mathrm P}$ 和 $\kappa_{\mathrm C}$ 的收敛性。最值得报告的不是一句“声子具有波粒二象性”，而是哪些模式对在什么温度下产生了多大的相干热流，以及这一贡献为什么不能被独立准粒子图像吸收。

Wigner 输运方程的价值正在于此：它没有要求我们在“声子是粒子”与“声子是波”之间作选择，而是明确告诉我们，粒子传播是密度矩阵的对角动力学，波动传输是其非对角动力学；二者只是同一个量子输运问题的不同部分。

## 参考文献

1. E. Wigner, “On the Quantum Correction For Thermodynamic Equilibrium,” *Physical Review* **40**, 749–759 (1932).
2. R. E. Peierls, *Quantum Theory of Solids*, Oxford University Press (1955).
3. P. B. Allen and J. L. Feldman, “Thermal conductivity of disordered harmonic solids,” *Physical Review B* **48**, 12581–12588 (1993).
4. M. Simoncelli, N. Marzari, and F. Mauri, “Unified theory of thermal transport in crystals and glasses,” *Nature Physics* **15**, 809–813 (2019), doi: [10.1038/s41567-019-0520-x](https://doi.org/10.1038/s41567-019-0520-x).
5. M. Simoncelli, N. Marzari, and F. Mauri, “Wigner formulation of thermal transport in solids,” *Physical Review X* **12**, 041011 (2022), doi: [10.1103/PhysRevX.12.041011](https://doi.org/10.1103/PhysRevX.12.041011).
