---
layout: post
title: 热物理的微观描述
lang: zh
translation_key: nano-micro-thermophysics
permalink: /zh/blog/2023/10/08/nano-micro-thermophysics/
date: 2023-10-08 00:32:13
description: 传热的微观视角，涵盖能量载流子、分布函数与基本常数。
tags: theory thermal-transport
categories: physics
related_posts: true
toc:
  sidebar: left
---

传热学中的宏观能量守恒方程描述了热能的储存、传输（传导 $k$、对流 $u$ 和辐射 $r$）以及热能与其他形式能量之间的转换。

## 能量守恒方程

$$
\nabla\cdot \boldsymbol q=-\rho c_p\frac{\partial T}{\partial t}+\sum_{i,j}\dot s_{i-j},
\nabla\cdot \boldsymbol q=\frac{\int_{\Delta A}(\boldsymbol q\cdot\boldsymbol s_{\boldsymbol n})dA}{\Delta V \to 0}
$$

其中，$\rho c_p\frac{\partial T}{\partial t}$ 称为显热储存项，$\dot s_{i-j}$ 为能量载流子 $i$ 和 $j$ 之间相互作用导致的能量转换速率，由其性质和相互作用频率决定。

热流矢量 $\boldsymbol q$ 为传导、对流和辐射热流矢量之和：

$$
\boldsymbol q = \boldsymbol q_k + \boldsymbol q_u + \boldsymbol q_r
$$

**传导热流矢量** $\boldsymbol q_k$ 为热导率 $k$ 与温度梯度 $\nabla T$ 的负乘积，遵循傅里叶定律：

$$
\boldsymbol q_k = -k\nabla T
$$

**对流热流矢量** $\boldsymbol q_u$ 为 $\rho c_p$、局部速度矢量 $\boldsymbol u$ 和温度 $T$ 的乘积：

$$
\boldsymbol q_u = \rho c_p\boldsymbol u T
$$

**辐射热流矢量** $\boldsymbol q_r$ 为单位矢量 $\boldsymbol s$ 与方向光谱强度 $I_{ph,\omega}$ 乘积在空间和电磁波谱上的积分：

$$
\boldsymbol q_r  = 2\pi\int_0^\infty\int_{-1}^1\boldsymbol s I_{ph,\omega}d\mu d\omega
$$

## 主要能量载流子

四类能量载流子——**声子**（$p$）、**电子**（$e$）、**流体粒子**（$f$）和**光子**（$ph$）——构成热能储存、传输和相互作用的微观基础。

### 声子

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_1.png" zoomable=true caption="图 1：声子" class="w-75" %}
</div>

* 声子是刚性原子晶格中量子化的振动模式。
* 长波长声子引起固体中的声音传播，因此得名"声子"。
* 声子决定了材料的许多物理性质，包括比热容和热导率/电导率（声子在绝缘体中传输热量）。
* 在经典力学中，晶格振动可分解为非局域简正模式。
* 在量子力学中，这些模式表现出粒子行为——因此声子是**准粒子**。
* 作为粒子，声子是自旋为零的**玻色子**，其能量 $E_p=\hbar\omega_p$ 为动能和势能之和。
* 声子分为两类：**声学支**（$A$）和**光学支**（$O$）。
* 声学声子的频率随波长增大而降低，对应晶格声波。纵波和横波分别记为 $LA$ 和 $TA$。
* 光学声子出现在每个单胞含多个原子的晶格中，在离子晶体中可被光激发：$LO$ 和 $TO$ 分别表示纵波和横波类型。

### 电子

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_2.png" zoomable=true caption="图 2：电子" class="w-75" %}
</div>

* 电子是自旋为 $1/2$ 的带负电**亚原子粒子**——属于**费米子**。
* 电子的反粒子是**正电子**，质量和自旋相同但电荷相反。
* 电子同时具有波动性和粒子性，因此是**准粒子**。
* 束缚电子表现为**驻波**，可在实验中观测。
* 固体中的电子包括芯电子和外层电子。芯电子束缚紧密，不参与成键。
* 外层电子包括**传导电子**和**价电子**，距原子核较远。
* 量子力学中，电子由**狄拉克方程**描述。
* 其能量包括势能（结合能）和动能（与速度相关）。

### 流体粒子

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_3.png" zoomable=true caption="图 3：流体粒子" class="w-75" %}
</div>

* 气体和液体由原子或分子（流体粒子）组成，可以带电或不带电，处于**随机运动**状态。
* 其能量包括势能、电子能和动能分量。
* 在**理想气体**中，粒子碰撞为**弹性碰撞**，分子间力可忽略。
* 理想气体的 Maxwell–Boltzmann 分布可通过统计力学和能量对称性原理推导。
* 液体粒子具有足够的动能来拉伸但不能克服分子间力。随着温度升高，它们获得足够能量而成为气体。

### 光子

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_4.png" zoomable=true caption="图 4：光子" class="w-75" %}
</div>

* 光子是电磁场的量子激发，属于粒子物理标准模型。
* 量子力学中，光子具有波动特性。
* 虽然光子的**静止质量为零**，但携带有限能量并受引力影响（相对论效应）。
* 光子是自旋为 1 的**玻色子**，具有圆偏振特性。
* 电磁场由频率 $f_{ph}$、波长 $\lambda_{ph}$ 和速度 $u_{ph}$ 表征的**单色平面波**组成。
* 量子能量：$E_{ph} = \hbar \omega_{ph}$；动量：$\boldsymbol p_{ph} = \hbar \boldsymbol\kappa_{ph}$。
* 真空中，光子色散为线性——与**普朗克常数**成正比。
* 物质激发具有非线性色散，传播速度低于光速。

## 能量分布函数

在多粒子系统中，观测到的**宏观态**（系综平均）通过概率（能量分布函数）与每个粒子的**微观态**（位置和动量）联系起来：

$$
\left \langle \phi \right \rangle=\sum_if_i\phi_i
$$

概率分布函数决定了载流子的能量和输运特性，可用于建模温度相关的晶格和电子比热容、气体动能以及黑体辐射。

平衡分布 $f_i^0$ 描述无扰动时微观态的最可能分布：

* **Bose–Einstein 分布**（声子、光子）

$$
f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text BT})-1}
$$

* **Fermi–Dirac 分布**（电子）

$$
f_i^0 = \frac{1}{\exp(\frac{E_i-\mu}{k_\text BT})+1}
$$

* **Maxwell–Boltzmann 分布**（理想气体分子）

$$
f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text BT})}
$$

对平衡态的偏离是载流子输运的基础——**玻尔兹曼输运理论**。

## 粒子、波与准粒子

### 粒子

粒子是**离散的**；其能量局域在有限区域。要到达不同位置，粒子必须按运动学规律移动。

相互作用遵循简单规则，如弹性碰撞中的能量和动量守恒。未受扰动时，粒子做**弹道运动**。

### 波

波不是有限实体。其能量分布在空间和时间中。波可以无限传播，通过相位分析可得其速度。波由频率和波长描述。

### 准粒子

准粒子（声子、电子、光子）同时表现出粒子性和波动性，描述为波包——不同波长的平面波的叠加。

这种双重性质称为**波粒二象性**。

粒子与波的经典区分在准粒子上变得模糊。其行为既包含波动理论，也包含粒子理论。

## 对传热物理学的贡献

热是分子运动所表现的一种能量形式，通过**传导**（声子、电子、流体粒子）、**对流**（流体粒子）和**辐射**（光子）在物体间传递。

关键物理学奠基人：

* **玻尔兹曼**：提出比热容、熵和热力学源于原子运动；引入玻尔兹曼常数 $k_B$，共同发展了能量均分定理。
* **麦克斯韦**：创立光的电磁理论；对气体动理论、分子物理学和热力学作出重要贡献。
* **普朗克**：发现能量是**量子化的**，提出离散能量量子 $h\nu$。
* **玻尔**：提出原子吸收/发射与能级差匹配的量子能量。
* **泡利**：提出**泡利不相容原理**：不能有两个电子占据相同状态。
* **薛定谔**：推导出波函数（概率波）方程，奠定了**量子波动力学**基础。
* **费米**：与狄拉克共同发展了遵循泡利原理的粒子统计方法——**费米统计**。
* **Green & Kubo**：发展了输运系数的**涨落-耗散定理**。
* **Ziman**：将变分法应用于声子输运。
* **Callaway & Holland**：通过**单模弛豫时间**模型计算晶格热导率。

## 基本常数与精细结构尺度

### 玻尔兹曼常数

$$
k_\text B=1.38065\times10^{-23} ~ \text J/\text K
$$

将载流子（声子、电子、光子、流体）的平均热能与绝对温度 $T$ 联系起来。

用于归一化载流子能量：$k_\text BT$。

在统计力学中：熵 $S=k_\text BN\ln Z$，其中 $Z$ 为配分函数。

在动理论中：每个自由度的能量为 $k_\text BT/2$（能量均分）。

### 普朗克常数

$$
h=6.626069\times10^{−34} ~ \text J\cdot \text s
$$

在量子力学中：能量 = 频率 $\times$ $h$。

约化普朗克常数：$\hbar = h/2\pi$。

使物理量量子化，出现在海森堡不确定性原理中：$\Delta p_x \Delta x \le \hbar/2$。

### 原子单位

四个常数定义原子单位：$\hbar$、$m_e$、库仑常数 $1/4\pi\varepsilon_0$、电子电荷 $e_c$。

* 原子长度：

$$
r_\text B = \frac{4\pi\varepsilon_0\hbar^2}{m_e e_c^2}=5.2918\times 10^{-11}~ \text m
$$

* 原子时间：

$$
\tau_a=\frac{m_er_\text B^2}{\hbar} = 2.4189\times 10^{-17} ~ \text s
$$

* 原子能量：

$$
\frac{e_c^2}{4\pi\varepsilon_0r_\text B}=4.3597\times10^{-18}\text J=27.211~ \text{eV}
$$

* 原子速度：

$$
\frac{r_\text B}{\tau_a} = 2.1877 \times 10^6~ \text m/\text s
$$

* 原子偶极矩：

$$
e_cr_\text B=8.4783\times 10^{-30}~ \text C\cdot\text m
$$

---

**参考文献：**

Kaviany M. *Heat Transfer Physics*, 2008
