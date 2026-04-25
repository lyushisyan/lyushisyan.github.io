---
layout: post
title: 热传导的经典动理论
lang: zh
translation_key: classical-kinetic-theory
permalink: /zh/blog/2023/04/26/classical-kinetic-theory/
date: 2023-04-26 00:32:13
description: 经典动理论、声子输运与宏观传热方程的概述。
tags: theory thermal-transport
categories: physics
related_posts: true
toc:
  sidebar: left
---

## 气体动理论

在经典动理论中，考虑一个分子运动的总路程为 $L$。它扫过的有效体积为 $\pi d^2 L$，其中 $d$ 为分子直径。若气体分子数密度为 $n$，则该体积内的分子数为 $\pi n d^2 L$，即碰撞次数为：

$$
N = \pi n d^2 L
$$

两次碰撞之间的平均自由程 $\Lambda$ 为：

$$
\Lambda = \frac{L}{N} = \frac{L}{\pi n d^2 L} = \frac{1}{n \sigma}
$$

其中 $\sigma = \pi d^2$ 为碰撞截面。

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/meanlength.png" zoomable=true caption="图 1：平均自由程示意图" class="w-75" %}
</div>

代入理想气体关系 $n = \frac{p}{k_B T}$：

$$
\Lambda = \frac{k_B T}{p \sigma}
$$

为计算单个分子的热流，假设其内能为 $\varepsilon$，$x$ 方向速度分量为 $v_x$。单位时间内的能量传递近似为：

$$
q_x = \frac{1}{2} v_x \left[\varepsilon(x - \Lambda_x) - \varepsilon(x + \Lambda_x)\right]
$$

用泰勒级数展开并忽略高阶项：

$$
q_x \approx -v_x \Lambda_x \frac{\mathrm{d} \varepsilon}{\mathrm{d}x} \approx -(\cos^2\theta) v \Lambda \frac{\mathrm{d} \varepsilon}{\mathrm{d}x}
$$

对所有方向积分（假设各向同性），总热流为：

$$
q_x = -\frac{1}{2\pi} v \Lambda \frac{\mathrm{d} \varepsilon}{\mathrm{d}x}
\left[\int_0^{2\pi} \mathrm{d}\varphi \int_0^{\pi/2} \cos^2\theta \sin\theta \, \mathrm{d}\theta \right] \frac{\mathrm{d} \varepsilon}{\mathrm{d}T} \frac{\mathrm{d}T}{\mathrm{d}x}
$$

化简得：

$$
q_x \approx -\frac{1}{3} C v \Lambda \frac{\mathrm{d}T}{\mathrm{d}x}
$$

由此得到热导率为：

$$
\lambda = \frac{1}{3} C v \Lambda
$$

这表明热导率与比热容 $C$、分子速度 $v$ 和平均自由程 $\Lambda$ 成正比。

## 介电体中的热传导

在绝缘体或半导体等介电体中，热量由**声子**（晶格振动的量子化）承载。每个声子的能量为 $\hbar \omega$，其中 $\omega$ 为振动频率。

声子热导率类似地表示为：

$$
\lambda_{ph} = \frac{1}{3} C_{ph} v_s \Lambda_{\Sigma}
$$

其中：
- $C_{ph}$ 为声子系统的比热容；
- $v_s$ 为等效声速；
- $\Lambda_{\Sigma}$ 为等效平均自由程。

主要声子散射机制包括：
- 边界散射（$b$）；
- 杂质散射（$imp$）；
- 声子-声子散射（$ph$）。

根据**Matthiessen 定则**，总逆平均自由程为各贡献之和：

$$
\Lambda_{\Sigma}^{-1} = \Lambda_{ph}^{-1} + \Lambda_{imp}^{-1} + \Lambda_{b}^{-1}
$$

<div class="row">
  <div class="col-md-6 text-center">
    {% include figure.liquid 
      path="assets/img/blog/classic1.png" 
      zoomable=true 
      caption="图 2：不同散射机制对平均自由程的影响" 
      class="img-fluid w-100" %}
  </div>
  <div class="col-md-6 text-center">
    {% include figure.liquid 
      path="assets/img/blog/classic2.png" 
      zoomable=true 
      caption="图 3：散射机制对热导率的影响" 
      class="img-fluid w-100" %}
  </div>
</div>

## 金属中的热传导

在金属中，热量主要由自由电子承载。电子气的热导率为：

$$
\lambda_{e} = \frac{1}{3} C_{e} v_F \Lambda_{e}
$$

其中：
- $C_e$ 为电子比热容；
- $v_F$ 为费米速度；
- $\Lambda_e$ 为电子平均自由程。

同样使用 Matthiessen 定则：

$$
\frac{1}{\Lambda_e} = \frac{1}{\Lambda_{ph}} + \frac{1}{\Lambda_d} + \frac{1}{\Lambda_b}
$$

## 玻尔兹曼输运方程

在微观层面，热输运由粒子分布函数描述。平衡态下：
- **Maxwell–Boltzmann 分布**（经典气体）；
- **Bose–Einstein 分布**（如声子）；
- **Fermi–Dirac 分布**（如电子）。

远离平衡态时，分布函数变为 $f(\vec{r}, \vec{p}, t)$，遵循**玻尔兹曼输运方程**：

$$
\frac{\partial f}{\partial t} + \vec v \cdot \nabla_{\vec r} f + \vec F \cdot \nabla_{\vec p} f = \left(\frac{\partial f}{\partial t}\right)_\text{st}
$$

其中右侧碰撞项 $\left(\partial f / \partial t\right)_{\text{st}}$ 描述系统向平衡态的弛豫过程。

## 傅里叶方程

在宏观层面，经典的**傅里叶定律**描述稳态热传导：

$$
\vec q = -\lambda \nabla T
$$

代入能量守恒得热扩散方程：

$$
\rho C_p \frac{\partial T}{\partial t} = -\nabla \cdot \vec q
$$

即：

$$
\rho C_p \frac{\partial T}{\partial t} = \lambda \nabla^2 T
\quad \Rightarrow \quad \frac{\partial T}{\partial t} = a \nabla^2 T
$$

其中 $a = \frac{\lambda}{\rho C_p}$ 为热扩散率，描述温度扰动在介质中的传播特性。

## 总结

- 热输运不仅取决于比热容、速度和平均自由程等内禀属性，还与特征尺寸和时间尺度有关。
- 当系统尺寸小于平均自由程时，傅里叶定律失效；应使用玻尔兹曼方程或分子动力学方法。
- 当系统尺寸与载流子波长相当时，波动效应主导，需要基于波动的模型（如声子干涉或局域化理论）。
