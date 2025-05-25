---
layout: distill
title: 电子和声子的兰道尔理论
date: 2025-3-05 6:36:10
categories: Physics
tabs: true
map: true

toc:
  - name: 1. Landauer 理论与热流描述
  - name: 2. 从波矢求和到积分形式
  - name: 3. 模态数与半波长解释
  - name: 4. 热导与频谱热导

---

在纳米尺度的热输运问题中，如何从微观角度准确地描述电子或声子在两个接触区（热库）之间的热流是研究热点。Landauer 理论最初主要用于分析电子在量子导线中的输运，后来这一思想被推广到分析诸如声子等玻色子体系，进一步揭示了纳米或微纳结构中的输运本质。   
- **电子（费米子）**：遵循费米-狄拉克分布。一个量子态中最多容纳两个电子（自旋简并）。化学势 $\mu$ 对电子输运起着关键作用。   
- **声子（玻色子）**：遵循玻色-爱因斯坦分布。一个量子态中可以容纳无限多个声子（无自旋简并，通常也不需要化学势 $\mu=0$）。   

## 1. Landauer 理论与热流描述   
Landauer 理论在热传输中的核心观点是：**输运过程可以被理解为量子态在相对简短的器件区域内的散射或透射**，而输运的上限由可用的模态（传播通道）数目以及这些模态可通过器件的概率（即透射函数 $\tau(\mathbf{k})$）所决定。 

一个简单的物理图像是：   
- 将器件看成一个散射区域，左侧热库和右侧热库的分布函数不同。   
- 若某个波矢 $\mathbf{k}$ 对应的粒子可向右传播（$k_x > 0$），则有一部分粒子从左库传到右库；反之，$k_x < 0$ 则可从右库传到左库。   
- 最终的净热流等于“从左到右的热流”减去“从右到左的热流”。   

从左侧热库流向右侧热库的热流密度（单位：$\text{W}/\text{m}^{d-1}$）一般可写为：
$$
J_{Q,L\to R}(T_1) = \frac{1}{L^d}\sum_p\sum_{\mathbf{k};k_x>0} v_{gx,p}(\mathbf{k}) \tau_p(\mathbf{k}) [E_{i,p}(\mathbf{k}) - \mu][f_i^0(E_{i,p}(\mathbf{k}), T_1) + c_0]
$$
其中变量含义如下：   
- $v_{gx,p}$：声子在 $x$ 方向的群速度分量；   
- $\tau_p(\mathbf{k})$：透射函数，表示声子穿过器件的概率；   
- $E_{i,p}$：粒子能量；   
- $f_i^0$：平衡态分布函数；   
- $\mu$：化学势；   
- $c_0$：零点能修正项。   
   
类似地，可以写出从右热库到左热库的热流表达式，两者相加可得**净热流**：   
$$
J_{Q,\text{net}} = \frac{1}{L^d}\sum_p\sum_{\mathbf{k};k_x>0} v_{gx,p} \tau_p [E_{i,p} - \mu][f_i^0(T_1) - f_i^0(T_2)]
$$
$c_0$ 零点能在净热流中相互抵消，说明它对热输运没有净贡献。 

## 2. 从波矢求和到积分形式   
为了更清晰地进行分析，通常将波矢求和形式转换为积分形式（Landauer 积分）。不同维度下的积分形式如下：   
#### 一维系统（1D）：   
$$
J_{Q,\text{net}} = \sum_p \int_0^\infty \frac{v_{g,p} \tau_p [E_{i,p}(k) - \mu]}{2\pi} [f_i^0(T_1) - f_i^0(T_2)] dk
$$
#### 二维系统（2D）：   
$$
J_{Q,\text{net}} = \sum_p\int_{-\pi/2}^{\pi/2}\int_0^\infty\frac{v_{g,p}\cos\theta\tau_p [E_{i,p}(k)-\mu]}{4\pi^2}[f_i^0(T_1)-f_i^0(T_2)]kdkd\theta 
$$
$$
= \frac{1}{2\pi^2}\sum_p\int_0^\infty v_{g,p}\tau_p [E_{i,p}(k)-\mu] [f_i^0(T_1)-f_i^0(T_2)]kdk
$$
#### 三维系统（3D）：   
$$
J_{Q,\text{net}} = \sum_p\int_0^{2\pi}\int_{0}^{\pi/2}\int_0^\infty\frac{v_{g,p}\cos\theta\tau_p [E_{i,p}(k)-\mu]}{8\pi^3} \nonumber \times[f_i^0(T_1)-f_i^0(T_2)]k^2dk\sin\theta d\theta d \varphi 
$$
$$
= \frac{1}{8\pi^2}\sum_p\int_0^\infty v_{g,p}\tau_p [E_{i,p}(k)-\mu] [f_i^0(T_1)-f_i^0(T_2)]k^2dk
$$
其中角度变量 $\theta$ 表示波矢方向与传输方向 $x$ 的夹角。分析中常假设透射函数与方向无关。   

引入态密度，将波矢空间积分转化为频率 $\omega$ 或能量 $E$ 空间积分，更便于物理解释与工程计算。   
#### 对于声子：   
引入频率态密度 $D(\omega)$，并使用 $\hbar\omega = E$，由于 $\mu = 0$，热流密度为：   
- **一维：**
$$
J_{Q,\text{ph}} = \frac{1}{2} \sum_p \int_0^\infty v_{g,p} D_{\text{1D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$
- **二维：**   
$$
J_{Q,\text{ph}} = \frac{1}{\pi} \sum_p \int_0^\infty v_{g,p} D_{\text{2D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$
- **三维：**   
$$
J_{Q,\text{ph}} = \frac{1}{4} \sum_p \int_0^\infty v_{g,p} D_{\text{3D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

#### 对于电子：   
电子存在非零化学势 $\mu$，引入能量态密度 $D(E)$，则电子热流密度为：   
- **一维：** 
$$
J_{Q,\text{el}} = \frac{1}{2} \sum_p \int_0^\infty v_{g,p} D_{\text{1D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$
- **二维：**
$$
J_{Q,\text{el}} = \frac{1}{\pi} \sum_p \int_0^\infty v_{g,p} D_{\text{2D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$
- **三维：**   
$$
J_{Q,\text{el}} = \frac{1}{4} \sum_p \int_0^\infty v_{g,p} D_{\text{3D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

## 3. 模态数与半波长解释 
为了将定量分析与直观理解结合起来，Landauer 理论中引入了**模态数（number of modes）** 的概念。

我们将其方法借用来分析**热流** $Q$（单位为瓦特），即**热流密度** $J_Q$ 与“面积”的乘积：   
- 对于 1D：面积为 1（或不考虑面积）；   
- 对于 2D：面积为接触宽度 $W$；   
- 对于 3D：面积为接触横截面积 $A$。   
   
### 3.1 声子的热流通式   
对于声子，热流（或热功率）的一般表达式为：   
$$
Q_{\text{ph}} = \frac{1}{2\pi} \int_0^\infty M(\omega)\tau(\omega)\hbar\omega [f_\text{BE}^0(T_1) - f_\text{BE}^0(T_2)]\,d\omega
$$
其中：   
- $M(\omega)$ 是**模态数（number of modes）**，代表单位横截面积内，频率为 $\omega$ 的声子半波长（$\lambda/2$）的个数；   
- $\tau(\omega)$ 是透射函数；   
- $f_\text{BE}^0$ 是 Bose-Einstein 分布函数。

### 3.2 不同维度下的模态数   
模态数随维度的不同而变化：   
- **一维：**   
$$
M(\omega) = M_{\text{1D}}(\omega)
$$
- **二维：**   
$$
M(\omega) = W \cdot M_{\text{2D}}(\omega)
$$
- **三维：**   
$$
M(\omega) = A \cdot M_{\text{3D}}(\omega)
$$
通过 $J_Q(1D)=Q$，$J_Q(2D)=Q/W$，$J_Q(3D)=Q/A$ 与热流密度表达式的对比，可以推导出不同维度下的模态密度 $M(\omega)$ 与态密度 $D(\omega)$ 的关系：   
$$
M_{\text{1D}}(\omega) = 1 = \pi v_g(\omega) D_{\text{1D}}(\omega)
$$
$$
M_{\text{2D}}(\omega) = \frac{K(\omega)}{\pi} = \pi \cdot \frac{2v_g(\omega)}{\pi} D_{\text{2D}}(\omega)
$$
$$
M_{\text{3D}}(\omega) = \frac{K^2(\omega)}{4\pi} = \pi \cdot \frac{v_g(\omega)}{2} D_{\text{3D}}(\omega)
$$
其中 $v_g(\omega)$ 是群速度，$K(\omega)$ 是波矢模长。   
我们知道，声子的**频率态密度**为：   
$$
D_{\text{1D}}(\omega) = \frac{1}{\pi v_g(\omega)}
$$
$$
D_{\text{2D}}(\omega) = \frac{K(\omega)}{2\pi v_g(\omega)}
$$
$$
D_{\text{3D}}(\omega) = \frac{K^2(\omega)}{2\pi^2 v_g(\omega)}
$$
将上面的态密度代入模态数表达式后，得到如下的结果：   
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
上述表达式中出现的中括号项，如下所示：   
- $[2v_g/\pi]$（2D）；
- $[v_g/2]$（3D）；
   
实际上是某一频率下的 **群速度在 $x$ 方向的空间平均值**：   
- **1D**：只能沿 x 方向运动，故平均值即为 $v_g$ 本身；   
- **2D**：在正半圆范围内积分 $\cos\theta$ 的平均值为 $2/\pi$，故得到 $\langle v_{gx} \rangle = 2v_g/\pi$；   
- **3D**：在正半球表面上积分 $\cos\theta$ 的平均值为 $1/2$，故得到 $\langle v_{gx} \rangle = v_g/2$。   
   
### 3.4 与半波长的几何解释   
模态数 $M(\omega)$ 还可以用**波长**来解释，即在横截面中能容纳的“半波长”数量（每个模态等价于一个半波）。   
在 1D 中，每个频率仅对应 1 个可能传播的模式；   
在 2D 中，可把横向宽度 $W$ 分为若干个“半波”段；   
在 3D 中，则是一个截面积 $A$ 的“半波”填充。三维情况下，那些几何因子（例如 $4/\pi$）出现在球坐标或圆截面积分的结果中。   
$$
(\text{1D}) :\quad M(\omega)=1
$$
$$
(\text{2D}) :\quad M(\omega) = \frac{W}{\lambda/2}
$$
$$
(\text{3D}) :\quad M(\omega) = \frac{A}{4/\pi(\lambda/2)^2}
$$

### 3.5 对电子的类似分析   
对电子进行类似分析时，热流（以能量积分形式）为：   
$$
Q_{\text{el}} = \frac{1}{\pi\hbar} \int_0^\infty M(E) \tau(E)(E - \mu)[f_\text{FD}^0(T_1) - f_\text{FD}^0(T_2)]\,dE
$$
其中，Lundstrom 和 Jeong（2013）对具有抛物型能带的电子模态数 $M(E)$ 给出如下表达： 
$$
(\text{1D}) :\quad M_\text{1D}(E) = H(E - E_c)
$$
$$
(\text{2D}) :\quad M(E) = W \cdot g_v \cdot \frac{\sqrt{2m^(E - E_c)}}{\pi\hbar} \cdot H(E - E_c)
$$
$$
(\text{3D}) :\quad M(E) = A \cdot g_v \cdot \frac{m^(E - E_c)}{2\pi\hbar^2} \cdot H(E - E_c)
$$
其中：   
- $H(E - E_c)$ 是 Heaviside 函数，表示电子必须处于导带以上；   
- $g_v$ 是能带简并度；   
- $m^*$ 是电子的有效质量；   
- $E_c$ 是导带底。   

## 4. 热导与频谱热导   
### 4.1 热导 
**热导** $G_Q$ 是单位温差下的热流率 $Q$，定义为：
$$
G_Q = \frac{Q}{T_1 - T_2}
$$
当温差很小时，我们可以使用微分形式来表示热导：   
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
这里，$M$ 是模态数，$\tau$ 是透射函数，$f^0$ 是平衡态分布函数，$\mu$ 是化学势。   

### 4.2 频谱热导 Spectral Conductance   
热导的积分被积项（即积分内的函数）描述了**每个频率或能量点对总热导的贡献**，称为**频谱热导 $G_Q'$**： 
- **声子：**   
$$
G_Q'(\omega, T) = \frac{1}{2\pi} M(\omega) \tau(\omega) \hbar\omega \frac{\partial f_\text{BE}^0}{\partial T}
$$
- **电子：**   
$$
G_Q'(E, T) = \frac{1}{\pi\hbar} M(E) \tau(E) (E - \mu) \frac{\partial f_\text{FD}^0}{\partial T}
$$
这些函数表明，在不同频率（或能量）下，模态数 $M$ 和分布导数 $\frac{\partial f}{\partial T}$ 共同决定了能量传导的强度和频谱分布。

为了简化分析，我们可以将热导 $G_Q$ **归一化**为单位模态数（mode）的导热能力。模态数 $M$ 通常依赖于系统的色散关系（即态密度的形式）。如果我们进一步假设**理想透射**（即 $\tau = 1$），那么可以定义一个**归一化频谱热导**，如下式所示：   
$$
\tilde G_Q' = \frac{G_Q'}{C_0k_BM\tau} = (f_i^0)^2e^xx^2
$$
其中 $x = \hbar\omega / k_B T$ 是无量纲能量。 

声子情况：
对于低频声子，归一化热导趋于 1，这说明**每一个模态在低频下对热导的贡献几乎相同**，直到声子能量超过“热能” $k_BT$ 为止。

电子情况：   
对于低能电子模态，其对热导的贡献很小，这是因为**费米-狄拉克分布中的泡利不相容原理**使得低能电子难以参与热输运。换句话说，热激发能量不足以将这些电子提升到更高能态（即接近费米能级 $E \approx \mu$）。因此，电子的热响应主要来自费米能附近电子态的重新分布。   
   
