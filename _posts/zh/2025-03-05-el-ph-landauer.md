---
layout: post
title: 电子与声子的 Landauer 理论
lang: zh
translation_key: el-ph-landauer
permalink: /zh/blog/2025/03/05/el-ph-landauer/
date: 2025-03-05 06:36:10
description: 纳米尺度热输运中 Landauer 理论的详细探讨，比较电子与声子输运机制、模式计数与谱热导。
tags: theory phonon thermal-transport
categories: physics
related_posts: true
toc:
  sidebar: left
---

在纳米尺度热输运中，如何从微观角度准确描述两个热库之间的电子或声子热流已成为研究热点。Landauer 理论最初用于分析量子线中的电子输运，但后来这一概念被扩展到声子等玻色子系统，揭示了纳米或微/纳结构中输运的本质。

* **电子（费米子）**：遵循 Fermi-Dirac 分布。每个量子态最多容纳两个电子（自旋简并）。化学势 $\mu$ 在电子输运中起关键作用。
* **声子（玻色子）**：遵循 Bose-Einstein 分布。每个量子态可容纳无限多个声子（无自旋简并，通常 $\mu = 0$）。

## 1. Landauer 理论与热流描述

Landauer 理论在热输运中的核心思想是：**输运过程可理解为量子态在相对短的器件区域中被散射或透射**，输运的上限由可用模式数（输运通道）和这些模式透过器件的概率（即透射函数 $\tau(\mathbf{k})$）决定。

简单的物理图像：

* 器件被视为散射区域，左右热库具有不同的分布函数。
* 对于波矢 $\mathbf{k}$，若 $k_x > 0$，粒子从左向右传播；反之，若 $k_x < 0$，从右向左运动。
* 净热流等于"左到右热流"减去"右到左热流"。

从左热库到右热库的热流密度（单位：W/m$^{d-1}$）一般写为：

$$
J_{Q,L\to R}(T_1) = \frac{1}{L^d}\sum_p\sum_{\mathbf{k};k_x>0} v_{gx,p}(\mathbf{k}) \tau_p(\mathbf{k}) [E_{i,p}(\mathbf{k}) - \mu][f_i^0(E_{i,p}(\mathbf{k}), T_1) + c_0]
$$

其中：

* $v_{gx,p}$：$x$ 方向群速度分量；
* $\tau_p(\mathbf{k})$：透射函数；
* $E_{i,p}$：粒子能量；
* $f_i^0$：平衡分布函数；
* $\mu$：化学势；
* $c_0$：零点能修正。

类似地，可写出从右到左的热流，**净热流**为：

$$
J_{Q,\text{net}} = \frac{1}{L^d}\sum_p\sum_{\mathbf{k};k_x>0} v_{gx,p} \tau_p [E_{i,p} - \mu][f_i^0(T_1) - f_i^0(T_2)]
$$

注意零点能 $c_0$ 在净热流中抵消，因此无净贡献。

## 2. 从 k 空间求和到积分形式

为便于分析，通常将 k 空间求和转换为积分（Landauer 积分）。形式因维度而异：

### 一维系统：

$$
J_{Q,\text{net}} = \sum_p \int_0^\infty \frac{v_{g,p} \tau_p [E_{i,p}(k) - \mu]}{2\pi} [f_i^0(T_1) - f_i^0(T_2)] dk
$$

### 二维系统：

$$
J_{Q,\text{net}} = \sum_p\int_{-\pi/2}^{\pi/2}\int_0^\infty\frac{v_{g,p}\cos\theta\tau_p [E_{i,p}(k)-\mu]}{4\pi^2}[f_i^0(T_1)-f_i^0(T_2)]kdkd\theta
$$

$$
:= \frac{1}{2\pi^2}\sum_p\int_0^\infty v_{g,p}\tau_p [E_{i,p}(k)-\mu] [f_i^0(T_1)-f_i^0(T_2)]kdk
$$

### 三维系统：

$$
J_{Q,\text{net}} = \sum_p\int_0^{2\pi}\int_{0}^{\pi/2}\int_0^\infty\frac{v_{g,p}\cos\theta\tau_p [E_{i,p}(k)-\mu]}{8\pi^3} [f_i^0(T_1)-f_i^0(T_2)]k^2dk\sin\theta d\theta d\varphi
$$

$$
:= \frac{1}{8\pi^2}\sum_p\int_0^\infty v_{g,p}\tau_p [E_{i,p}(k)-\mu] [f_i^0(T_1)-f_i^0(T_2)]k^2dk
$$

角度 $\theta$ 表示波矢与输运方向 $x$ 的夹角。通常假设 $\tau$ 与方向无关。

通过引入态密度（DOS），可将 k 空间积分转换为频率 $\omega$ 或能量 $E$ 的积分。

### 对于声子：

使用频率 DOS $D(\omega)$ 和 $E = \hbar\omega$（$\mu = 0$）：

* **一维：**

$$
J_{Q,\text{ph}} = \frac{1}{2} \sum_p \int_0^\infty v_{g,p} D_{\text{1D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

* **二维：**

$$
J_{Q,\text{ph}} = \frac{1}{\pi} \sum_p \int_0^\infty v_{g,p} D_{\text{2D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

* **三维：**

$$
J_{Q,\text{ph}} = \frac{1}{4} \sum_p \int_0^\infty v_{g,p} D_{\text{3D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

### 对于电子：

化学势 $\mu$ 不为零，使用能量 DOS $D(E)$：

* **一维：**

$$
J_{Q,\text{el}} = \frac{1}{2} \sum_p \int_0^\infty v_{g,p} D_{\text{1D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

* **二维：**

$$
J_{Q,\text{el}} = \frac{1}{\pi} \sum_p \int_0^\infty v_{g,p} D_{\text{2D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

* **三维：**

$$
J_{Q,\text{el}} = \frac{1}{4} \sum_p \int_0^\infty v_{g,p} D_{\text{3D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

## 3. 模式数与半波长解释

为将定量分析与直观理解结合，Landauer 理论引入了**模式数**的概念。

该概念也可用于分析**热流** $Q$（单位：瓦特），即**热流密度** $J_Q$ 与"截面积"的乘积：

* 对于一维：面积为 1（或忽略）；
* 对于二维：面积为接触宽度 $W$；
* 对于三维：面积为接触截面积 $A$。

### 3.1 声子热流的一般表达式

对于声子，热流（或热功率）的一般表达式为：

$$
Q_{\text{ph}} = \frac{1}{2\pi} \int_0^\infty M(\omega)\tau(\omega)\hbar\omega [f_\text{BE}^0(T_1) - f_\text{BE}^0(T_2)]\,d\omega
$$

其中：

* $M(\omega)$ 是**模式数**，表示频率 $\omega$ 处每单位截面积中可容纳的半波长（λ/2）数目；
* $\tau(\omega)$ 是透射函数；
* $f_\text{BE}^0$ 是 Bose-Einstein 分布函数。

### 3.2 不同维度的模式数

模式数随维度变化：

* **一维：**

$$
M(\omega) = M_{\text{1D}}(\omega)
$$

* **二维：**

$$
M(\omega) = W \cdot M_{\text{2D}}(\omega)
$$

* **三维：**

$$
M(\omega) = A \cdot M_{\text{3D}}(\omega)
$$

通过比较 $J_Q(\text{1D})=Q$、$J_Q(\text{2D})=Q/W$、$J_Q(\text{3D})=Q/A$ 与热流密度表达式，可推导模式密度 $M(\omega)$ 与态密度 $D(\omega)$ 之间的关系：

$$
M_{\text{1D}}(\omega) = 1 = \pi v_g(\omega) D_{\text{1D}}(\omega)
$$

$$
M_{\text{2D}}(\omega) = \frac{K(\omega)}{\pi} = \pi \cdot \frac{2v_g(\omega)}{\pi} D_{\text{2D}}(\omega)
$$

$$
M_{\text{3D}}(\omega) = \frac{K^2(\omega)}{4\pi} = \pi \cdot \frac{v_g(\omega)}{2} D_{\text{3D}}(\omega)
$$

其中 $v_g(\omega)$ 为群速度，$K(\omega)$ 为波矢大小。

已知**声子 DOS**为：

$$
D_{\text{1D}}(\omega) = \frac{1}{\pi v_g(\omega)}
$$

$$
D_{\text{2D}}(\omega) = \frac{K(\omega)}{2\pi v_g(\omega)}
$$

$$
D_{\text{3D}}(\omega) = \frac{K^2(\omega)}{2\pi^2 v_g(\omega)}
$$

代入模式数表达式：

$$
M_{\text{1D}}(\omega) = \pi v_g(\omega) \cdot \frac{1}{\pi v_g(\omega)} = 1
$$

$$
M_{\text{2D}}(\omega) = W \cdot \pi \cdot \left[ \frac{2v_g(\omega)}{\pi} \right] \cdot \frac{K(\omega)}{2\pi v_g(\omega)}
$$

$$
M_{\text{3D}}(\omega) = A \cdot \pi \cdot \left[ \frac{v_g(\omega)}{2} \right] \cdot \frac{K^2(\omega)}{2\pi^2 v_g(\omega)}
$$

### 3.3 空间平均群速度的物理意义

上述方括号中的项表示给定频率下**空间平均的 x 方向群速度**：

* **一维**：仅沿 x 方向运动，平均值即 $v_g$ 本身；
* **二维**：$\cos\theta$ 在半圆上的平均值为 $2/\pi$，因此 $\langle v_{gx} \rangle = 2v_g/\pi$；
* **三维**：$\cos\theta$ 在半球上的平均值为 $1/2$，因此 $\langle v_{gx} \rangle = v_g/2$。

### 3.4 半波长的几何解释

模式数 $M(\omega)$ 也可几何解释为截面上可容纳的半波长数目：

* **一维**中，每个频率只有一个传播模式；
* **二维**中，接触宽度 $W$ 可被分为半波长段；
* **三维**中，接触面积 $A$ 被这些半波单元填满。

$$
(\text{一维}) :\quad M(\omega)=1
$$

$$
(\text{二维}) :\quad M(\omega) = \frac{W}{\lambda/2}
$$

$$
(\text{三维}) :\quad M(\omega) = \frac{A}{4/\pi(\lambda/2)^2}
$$

### 3.5 电子的类似分析

对于电子，类似分析得到能量积分形式的热流为：

$$
Q_{\text{el}} = \frac{1}{\pi\hbar} \int_0^\infty M(E) \tau(E)(E - \mu)[f_\text{FD}^0(T_1) - f_\text{FD}^0(T_2)]\,dE
$$

根据 Lundstrom 和 Jeong（2013），对于抛物线型能带的电子，模式数为：

$$
(\text{一维}) :\quad M_\text{1D}(E) = H(E - E_c)
$$

$$
(\text{二维}) :\quad M(E) = W \cdot g_v \cdot \frac{\sqrt{2m^*(E - E_c)}}{\pi\hbar} \cdot H(E - E_c)
$$

$$
(\text{三维}) :\quad M(E) = A \cdot g_v \cdot \frac{m^*(E - E_c)}{2\pi\hbar^2} \cdot H(E - E_c)
$$

其中：

* $H(E - E_c)$ 为 Heaviside 阶跃函数（只有导带底以上的电子有贡献）；
* $g_v$ 为谷简并度；
* $m^*$ 为有效质量；
* $E_c$ 为导带底。

---

## 4. 热导与谱热导

### 4.1 热导

**热导** $G_Q$ 定义为每单位温差的熱流：

$$
G_Q = \frac{Q}{T_1 - T_2}
$$

对于小温差，微分形式为：

$$
G_Q(T) = \frac{Q(T + \delta T/2, T - \delta T/2)}{\delta T}
$$

#### 对于声子：

$$
G_Q(T) = \frac{1}{2\pi} \int_0^\infty M(\omega) \tau(\omega) \hbar\omega \frac{\partial f_\text{BE}^0}{\partial T} \, d\omega
$$

#### 对于电子：

$$
G_Q(T) = \frac{1}{\pi\hbar} \int_0^\infty M(E) \tau(E) (E - \mu) \frac{\partial f_\text{FD}^0}{\partial T} \, dE
$$

其中 $M$ 为模式数，$\tau$ 为透射函数，$f^0$ 为平衡分布。

### 4.2 谱热导

$G_Q$ 的被积函数表示**每个频率或能量对热导的贡献**，称为**谱热导** $G_Q'$：

* **对于声子：**

$$
G_Q'(\omega, T) = \frac{1}{2\pi} M(\omega) \tau(\omega) \hbar\omega \frac{\partial f_\text{BE}^0}{\partial T}
$$

* **对于电子：**

$$
G_Q'(E, T) = \frac{1}{\pi\hbar} M(E) \tau(E) (E - \mu) \frac{\partial f_\text{FD}^0}{\partial T}
$$

这些函数表明，能量输运能力取决于可用模式数 $M$ 和热灵敏度 $\partial f / \partial T$。

为简化分析，可除以 $k_B$、$M$ 等常数定义**归一化谱热导**，假设**理想透射** $\tau = 1$：

$$
\tilde G_Q' = \frac{G_Q'}{C_0k_BM\tau} = (f_i^0)^2e^xx^2
$$

其中 $x = \hbar\omega / k_B T$ 为无量纲能量。

在**声子情况**中，对于低频模式，归一化热导趋近于 1——表明**每个模式在低频时贡献相等**，直到能量超过热能 $k_BT$。

在**电子情况**中，由于**Pauli 不相容原理**，低能模式贡献很小：电子必须热激发越过费米能级，因此大部分贡献来自 $E \approx \mu$ 附近的状态。
