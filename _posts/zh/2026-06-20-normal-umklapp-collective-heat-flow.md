---
layout: post
title: "声子碰撞一定产生热阻吗？Normal 与 Umklapp"
lang: zh
translation_key: normal-umklapp-collective-heat-flow
permalink: /zh/blog/2026/06/20/normal-umklapp-collective-heat-flow/
date: 2026-06-20 13:00:00
last_updated: 2026-06-20
description: "解释 Normal 声子散射为何不能简单等同于热阻、Umklapp 如何弛豫晶格动量，以及声子何时形成集体流体动力学输运。"
tags: theory phonon thermal-transport
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

散射经常被描述为热阻的微观来源：声子传播、发生碰撞、逐渐失去运动记忆，热流随之衰减。这个图像很有用，却并不完整。一部分声子碰撞会守恒集体晶格动量，使声子形成具有漂移速度的集体状态，而不是简单地破坏热流。

因此，真正关键的问题不只是**声子碰撞得有多频繁**，而是**碰撞守恒什么物理量，又使哪些缓慢的集体运动发生弛豫**。

[上一篇文章]({{ '/zh/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }})只把集体动量视为傅里叶定律之外的一种额外慢变量；本文不再重复一般的非傅里叶判据，而是专门追问这种集体动量怎样在碰撞中建立、传递和耗散。

## 碰撞的运动学与守恒量

晶格非谐性允许声子的产生和湮灭。对于三声子吸收过程

$$
\lambda_1+\lambda_2\rightarrow\lambda_3,
$$

能量和晶格动量满足

$$
\omega_1+\omega_2=\omega_3,
$$

$$
\boldsymbol q_1+\boldsymbol q_2
=\boldsymbol q_3+\boldsymbol G,
$$

其中 $\boldsymbol G$ 是倒格矢。一个声子衰变成两个声子的过程满足相应的能量和晶格动量关系。

Normal 与 Umklapp 过程的区别首先是运动学上的：

- **Normal（N）过程：** $\boldsymbol G=0$；
- **Umklapp（U）过程：** $\boldsymbol G\neq0$。

由于相差一个倒格矢的波矢在周期晶格中等价，两种过程都满足模倒格矢意义下的晶格动量守恒。但只有 N 过程守恒选定第一布里渊区内声子波矢之和。

常见的“Umklapp 使动量翻转”图像是一种有用的几何记忆方式，但不能把它理解成经典粒子之间的机械碰撞。声子波矢是晶格本征模式的标记，而晶格动量本来就只在模 $\boldsymbol G$ 的意义下定义。

但在讨论“动量是否守恒”之前，必须先分清晶格动量与机械动量。

声子总晶格动量可示意性地写成

$$
\boldsymbol P_{\mathrm{cr}}
=\frac{1}{V}\sum_\lambda
\hbar\boldsymbol q_\lambda n_\lambda.
$$

它是与离散平移对称性相关的守恒量，不能与整个晶体的机械动量混淆。后者还包括晶格及其质心运动。

热流则是声子分布的另一个矩：

$$
\boldsymbol J_Q
=\frac{1}{V}\sum_\lambda
\hbar\omega_\lambda
\boldsymbol v_\lambda n_\lambda.
$$

因此，$\sum_\lambda\hbar\boldsymbol q_\lambda n_\lambda$ 守恒并不普遍意味着 $\boldsymbol J_Q$ 守恒。只有在一些特殊模型中，例如单一线性色散声学支的各向同性近似下，两者才近似成正比。真实晶体通常具有非线性色散、多种极化、光学支和各向异性群速度。

由此得到第一个重要限定：

> Normal 过程守恒总晶格动量，但它仍然可能重新分配并部分弛豫热流，因为热流通常并不与晶格动量成正比。

## Normal 与阻性过程把分布推向何处

Normal 碰撞在声子模式之间快速交换能量和动量，同时守恒总能量与晶格动量。反复发生的 N 散射不会直接把系统推向静止的玻色–爱因斯坦分布

$$
n_\lambda^0
=\frac{1}{\exp(\hbar\omega_\lambda/k_BT)-1}.
$$

它趋向的是一个**位移玻色–爱因斯坦分布**：

$$
n_\lambda^{d}
=\frac{1}{
\exp\left[
(\hbar\omega_\lambda
-\hbar\boldsymbol q_\lambda\cdot\boldsymbol u_d)/k_BT
\right]-1},
$$

其中 $\boldsymbol u_d$ 是集体漂移参数。倒空间中的分布位移对应非零的集体晶格动量。

从这个意义上说，N 过程类似于流体分子之间守恒动量的碰撞。这类碰撞建立局域平衡和黏性，却不会单独使一个整体运动的流体停止。

这个类比也揭示了一个容易忽视的事实：频繁的 N 碰撞可以让单个声子模式的寿命很短，同时保持集体载热漂移具有很长的寿命。因此，谱学线宽或单模寿命不能自动等同于输运弛豫时间。

Normal 过程建立漂移分布之后，真正决定稳态热阻的是哪些机制能够破坏这一漂移。

如果一种过程能够弛豫与热流重叠的缓慢集体运动，它就是阻性过程。常见机制包括：

- Umklapp 散射；
- 同位素和缺陷散射；
- 将动量传递给另一子系统的电子–声子散射；
- 漫反射边界散射；
- 其他能够从漂移声子分布中移除晶格动量的机制。

U 过程通常具有热阻性，因为声子系统会向晶格传递一个倒格矢对应的晶格动量。但“发生 U 过程”并不等于“产生一个固定大小的热阻”。一个散射事件的实际作用取决于参与模式、这些模式对热流的贡献，以及完整耦合碰撞算符的结构。

更精确地说，热阻与熵产生以及受驱动非平衡分布的衰减有关，而不只是与碰撞次数有关。

## 为什么必须看碰撞算符

线性化后的稳态声子 BTE 可以示意性写成

$$
\boldsymbol b=\boldsymbol\Omega\boldsymbol f,
$$

其中 $\boldsymbol b$ 是温度梯度产生的驱动项，$\boldsymbol f$ 表示各模式的非平衡响应，$\boldsymbol\Omega$ 是线性化碰撞算符。热导率具有如下结构：

$$
\kappa\sim
\langle\boldsymbol b,
\boldsymbol\Omega^{-1}\boldsymbol b\rangle.
$$

这个表达式包含了问题的核心物理。$\boldsymbol\Omega$ 的本征矢是声子布居的集体组合；守恒定律会产生零衰减或缓慢衰减的本征模式。如果热流驱动与某个慢模高度重叠，热导率就会很大。

单模弛豫时间近似把 $\boldsymbol\Omega$ 替换成对角矩阵，给每个声子分配一个相互独立的寿命。这会丢失由非对角耦合产生的模式再布居和集体漂移。当阻性散射占主导时，这个近似可能足够；当 N 散射很强时，它可能明显低估热导率。

因此，迭代求解 BTE 不只是数值精度上的修正，它恢复了模式之间的耦合响应。

Callaway 图像可以把这个算符结构压缩成两种不同的弛豫趋势。

Callaway 图像把碰撞分成两种趋势：

$$
\left.\frac{\partial n_\lambda}{\partial t}\right|_N
\sim-\frac{n_\lambda-n_\lambda^d}{\tau_{N,\lambda}},
$$

$$
\left.\frac{\partial n_\lambda}{\partial t}\right|_R
\sim-\frac{n_\lambda-n_\lambda^0}{\tau_{R,\lambda}}.
$$

N 过程使分布趋向漂移态 $n^d$，阻性过程则使其趋向静止平衡态 $n^0$。两者之间的竞争决定声子主要表现为独立准粒子，还是形成集体流体。

这个模型非常适合解释物理，但现代第一性原理碰撞算符并不一定能够被两个标量弛豫时间完全表示。

## 从尺度窗口到可观测信号

定义代表性长度

$$
\ell_N=v\tau_N,
\qquad
\ell_R=v\tau_R,
$$

其中 $\ell_N$ 是建立集体局域平衡所需的长度，$\ell_R$ 是集体动量被破坏的长度。对于宽度为 $W$ 的通道，可以示意性地区分三个区间。

**当 $W\ll\ell_N$ 时，输运接近弹道。**

在足够多的 N 碰撞建立漂移局域分布之前，声子已经到达边界，因此输运主要由边界注入和透射决定。

**当 $\ell_N\ll W\ll\ell_R$ 时，流体动力学窗口打开。**

大量 N 碰撞建立局域集体平衡，而阻性散射在器件尺度上仍然很弱。动量在声子内部重新分配，并主要在边界处损失，此时可能形成具有黏性的 Poiseuille 型热流。

**当 $W\gg\ell_R$ 时，阻性过程恢复扩散行为。**

阻性事件在样品内部就破坏了集体漂移，足够大的尺度上重新得到局域傅里叶输运。

这些不等式是输运区间图，而不是严格的普适分界。真实声子谱包含不同的速度和弛豫长度，边界镜面性也会显著改变过渡位置。

尺度不等式本身还不是实验结论，它必须落到可观测信号上。

强 N 散射可以产生独立声子气体图像无法解释的现象。

**Poiseuille 热流。**

守恒动量的碰撞会在通道横向重新分配动量。如果动量主要在边界处损失，热流在通道中心最大、靠近边界减小，类似黏性流体的速度分布。

**第二声。**

当动量弛豫足够慢时，温度和热流可以作为阻尼波传播，而不是单调扩散。N 过程帮助建立支持这种集体模式的漂移局域状态，阻性过程则使第二声衰减。

**非单调尺寸效应。**

从弹道区间进入流体动力学区间时，系统可能出现 Knudsen 极小值，或在有限尺寸范围内出现有效热导率随宽度超弹道增长的行为。具体特征取决于几何结构和散射谱。

这些现象并不能仅由“N 散射没有热阻”一句话推出，而来自 N、阻性散射与边界时间尺度之间的层级关系。

## 如何避免误判并建立证据链

**“每次碰撞都会降低热导率。”**

错误。守恒动量的碰撞可以建立集体局域平衡并重新分配动量，而不直接破坏漂移。

**“Normal 散射永远不会弛豫热流。”**

一般情况下也不正确。N 过程守恒的是晶格动量，而不是热流。对于非线性、多支色散，两者并不成正比。

**“Umklapp 散射率就是输运热阻。”**

不完整。U 散射是重要的动量弛豫机制，但热导率取决于完整碰撞算符如何作用于受驱动分布。

**“寿命最短的声子决定热输运。”**

未必。短的单模寿命可能源于快速 N 再分配，而集体漂移仍然可以很长寿。

避免这些误区之后，还需要把“可能存在集体效应”提升为一条可以检验的证据链。

RTA 与完整 PBTE 的差异只能作为线索，不能单独证明声子流体动力学。更有说服力的判定需要把四类证据连起来：

1. **算符证据：** 热流驱动是否与碰撞算符的慢集体本征模显著重叠；
2. **尺度证据：** 是否存在 $\ell_N\ll W\ll\ell_R$ 的几何窗口，并说明边界镜面性如何改变动量损失；
3. **谱证据：** 结论是否对长波声子、细密 $\boldsymbol q$ 网格和稀少阻性过程充分收敛；
4. **可观测证据：** 模型是否同时预测 Poiseuille 型横向热流、第二声或非单调尺寸效应，而不仅是较大的体热导率。

这一节关心的是“如何识别集体流”，而不是重新介绍从 DFT、IFC 到热导率的完整计算流程；后者见[《从第一性原理到晶格热导率：PBTE 方法》]({{ '/zh/blog/2025/02/16/abinitio-bte/' | relative_url }})。

这些证据最终回到文章开头的问题：声子碰撞一定产生热阻吗？**不一定。**

Normal 散射守恒晶格动量，可以使声子趋向具有集体漂移的分布。它通常重新分配热流，而不是直接消除热流；必须存在阻性机制，才能破坏这种漂移并产生与稳态热阻相关的熵。

但“Normal 散射对热阻完全没有影响”同样错误。热流通常不等于晶格动量，而且 N 过程会重塑阻性过程所作用的非平衡分布。因此，它能够深刻改变热导率，甚至使系统进入完全不同的输运区间。

正确的物理层级是

$$
\text{碰撞运动学}
\rightarrow
\text{守恒量}
\rightarrow
\text{缓慢集体模式}
\rightarrow
\text{热阻}.
$$

仅仅统计碰撞次数是不够的。真正需要问的是：这些碰撞守恒什么？

## 参考文献

1. R. E. Peierls, “Zur kinetischen Theorie der Wärmeleitung in Kristallen,” *Annalen der Physik* **395**, 1055–1101 (1929).
2. J. Callaway, “Model for Lattice Thermal Conductivity at Low Temperatures,” *Physical Review* **113**, 1046–1051 (1959).
3. J. M. Ziman, *Electrons and Phonons*, Oxford University Press (1960).
4. R. A. Guyer and J. A. Krumhansl, “Thermal Conductivity, Second Sound, and Phonon Hydrodynamic Phenomena in Nonmetallic Crystals,” *Physical Review* **148**, 778–788 (1966).
5. M. Omini and A. Sparavigna, “Beyond the isotropic-model approximation in the theory of thermal conductivity,” *Physical Review B* **53**, 9064–9073 (1996).
6. A. Cepellotti *et al.*, “Phonon hydrodynamics in two-dimensional materials,” *Nature Communications* **6**, 6400 (2015).
7. S. Lee *et al.*, “Hydrodynamic phonon transport in suspended graphene,” *Nature Communications* **6**, 6290 (2015).
8. S. Huberman *et al.*, “Observation of second sound in graphite at temperatures above 100 K,” *Science* **364**, 375–379 (2019).
