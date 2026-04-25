---
layout: post
title: 态密度（DOS）计算的数值方法
lang: zh
translation_key: dos-method
permalink: /zh/blog/2024/10/05/dos-method/
date: 2024-10-05 23:36:10
description: 态密度（DOS）计算的数值方法概述，包括根采样法、线性外推法（GR/GGR 方法）和线性插值法。
tags: theory phonon
categories: calculation
related_posts: true
toc:
  sidebar: left
---

晶格动力学研究中最重要的物理量之一是态密度（DOS），定义为频率范围 $\omega$ 到 $\omega + d\omega$ 内简正模式的数目。

DOS 的表达式为：

$$
\text{DOS}(\omega) = \frac{V}{8\pi^3} \sum_s \int \frac{dS_\omega}{|\Delta_{\boldsymbol k}\omega_s|}
$$

其中 $S_\omega$ 为等频率面。

## 根采样法

这是最简单的方法（也称为直方图统计法）：

$$
\text{DOS}(\omega) = \frac{V}{8\pi^3} \sum_{\boldsymbol qs} \delta(\omega - \omega(\boldsymbol qs))
$$

使用该方法，可以统计 $\Delta\omega$ 内的模式数来获得态密度。然而，该方法需要布里渊区中大量的 $\boldsymbol k$ 点（网格需要足够密）才能得到准确结果。

## 线性外推法

GR 方法将第一布里渊区的不可约部分均匀划分为简单立方网格，网格点 $\boldsymbol k_c$ 间距为 $2b$。每个 $\boldsymbol k_c$ 点位于小立方体的中心。从包含每个 $\boldsymbol k_c$ 的小立方体中提取"所有"频率，对所有立方体的贡献求和得到完整的频率分布。

$\boldsymbol k_c$ 处的本征频率为 $\omega(\boldsymbol k_c)$。假设在每个小立方体内线性外推成立，等频率面可表示为垂直于 $\nabla\omega(\boldsymbol k_c)$ 的平行平面。两组平行平面之间的体积元 $dV$ 对应 $\omega$ 和 $\omega + d\omega$ 之间的频率数。当 $dV$ 趋近于零时，可近似为

$$
dV = Sd k_\perp
$$

其中 $S$ 为平面在立方体内的截面积，$d k_\perp$ 为体积元的厚度。

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/GR_method.png" zoomable=true caption="图 1：线性外推法（GR 方法）" class="w-75" %}
</div>

接下来考虑这组等频率面在立方体内的截面积。首先假设等频率面法线的三个方向余弦为 $l_1$、$l_2$ 和 $l_3$，按降序排列。

对于距 $\boldsymbol k_c$ 距离为 $h$ 的任意截面，截面积记为 $S(h)$。它满足 $S(h) = S(-h)$，因此只需考虑半个立方体（$h > 0$）。

按升序列出该半部分四个角点到过立方体中心平面的距离：

$$h_1 = b|l_1 - l_2 - l_3|$$
$$h_2 = b(l_1 - l_2 + l_3)$$
$$h_3 = b(l_1 + l_2 - l_3)$$
$$h_4 = b(l_1 + l_2 + l_3)$$

在第一个范围 $(0 \leq h \leq h_1)$ 内，根据 $(l_1 - l_2 - l_3)$ 的符号有两种可能。若符号为正，截面为平行四边形，面积为

$$
S(h) = \frac{4b^2}{l_1}
$$

若为负，截面为六边形，面积为

$$
S(h) = \frac{2b^2(l_1 l_2 + l_2 l_3 + l_3 l_1) - (h^2 + b^2)}{l_1 l_2 l_3}
$$

在第二个范围 $(h_1 \leq h \leq h_2)$ 内，形状为五边形，面积为

$$
S(h) = \frac{2b^2(l_1 l_2 + 3l_2 l_3 + l_3 l_1) - bh(-l_1 + l_2 + l_3) - \frac{1}{2}(h^2 + b^2)}{l_1 l_2 l_3}
$$

在第三个范围 $(h_2 \leq h \leq h_3)$ 内，形状为四边形，面积为

$$
S(h) = \frac{2b^2 l_3(l_1 + l_2) - bhl_3}{l_1 l_2 l_3}
$$

在第四个范围 $(h_3 \leq h \leq h_4)$ 内，形状为四边形，面积为

$$
S(h) = \frac{[b(l_1 + l_2 + l_3) - h]^2}{2l_1 l_2 l_3}
$$

这些表达式及其导数在各自边界处连续，$S(h)$ 在整个范围内积分等于立方体体积。

对整个立方体做线性外推得到频率变化：

$$
\Omega = \omega(\boldsymbol k_c) \pm h\nabla\omega(\boldsymbol k_c)
$$

其中 $0 \leq h \leq h_4$。

为构建 $\text{DOS}(\omega)$，定义函数 $g_s(\boldsymbol k_c, \omega)$，即以 $\boldsymbol k_c$ 为中心的整个立方体线性外推得到的频率分布：

$$
g_s(\boldsymbol k_c, \omega) = CW(\boldsymbol k_c) S_s(h)dh = CW(\boldsymbol k_c) S_s(w) \frac{d\omega}{|\nabla\omega(\boldsymbol k_c)|}
$$

其中 $\omega(\boldsymbol k_c) - h_4\nabla\omega(\boldsymbol k_c) \leq \omega \leq \omega(\boldsymbol k_c) + h_4\nabla\omega(\boldsymbol k_c)$。

$C$ 为归一化常数，$W(\boldsymbol k_c)$ 为点 $\boldsymbol k_c$ 的对称性权重因子。

最终，完整的态密度为：

$$
\text{DOS}(\omega) = \sum_{\boldsymbol k_c, s} g_s(\boldsymbol k_c, \omega)
$$

GR 方法有两个实际困难：
(i) 需要先计算梯度 $\nabla\omega(\boldsymbol k_c)$。
(ii) 由于立方体通常不能精确贴合布里渊区，需要确定不可约区内立方体的统计权重。

## 线性外推法的推广

GGR 方法的核心思想是通过仿射变换将平行六面体形状的布里渊区转换为立方体，使原 GR 方法适用于任何晶格。

BZ 是由三个倒格矢 $\boldsymbol b_i (i = 1, 2, 3)$ 定义的平行六面体。$\boldsymbol k$ 点沿三个基矢 $\boldsymbol b_i$ 均匀分布。

仿射变换将平行六面体 BZ 的 $\boldsymbol k$ 基转换为 $\boldsymbol t = (t_1, t_2, t_3)$ 立方基：

$$
\boldsymbol k = \boldsymbol b_1 t_1 + \boldsymbol b_2 t_2 + \boldsymbol b_3 t_3
$$

其中 $t_1, t_2, t_3 \in [0, 1]$。

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/GGR.png" zoomable=true caption="图 2：线性外推法的推广（GGR 方法）" class="w-75" %}
</div>

两种基的体积元满足 $dV_k = \det(B)dV_t = \Omega dV_t$，其中 $\Omega$ 为 BZ 体积。

将 $\text{DOS}(\omega)$（等频率面 $S_\omega$ 上的积分）从 $\boldsymbol k$ 基变换到 $\boldsymbol t$ 立方基：

$$
\text{DOS}(\omega) = \frac{1}{\Omega} \sum_s \int_{S_\omega} \frac{dS_k}{|\Delta_{\boldsymbol k}\omega_s|} = \sum_s \int_{S_\omega} \frac{dS_t}{|\Delta_{\boldsymbol t}\omega_s|}
$$

## 线性插值法

不可约部分被划分为多个等体积四面体。四面体每个顶点处的声子频率已知，四面体内部任意位置 $\boldsymbol k$ 的声子频率 $\nabla\omega(\boldsymbol k)$ 可通过线性插值获得：

$$
\omega(\boldsymbol k) = a_1\omega(\boldsymbol k_1) + a_2\omega(\boldsymbol k_2) + a_3\omega(\boldsymbol k_3) + a_4\omega(\boldsymbol k_4)
$$

其中 $a_i$ 为四面体顶点的权重系数，满足 $a_1 + a_2 + a_3 + a_4 = 1$。这些权重取决于点 $\boldsymbol k$ 在四面体内部的位置。

四面体方法只需要粗网格上 $\omega(\boldsymbol k_i)$ 的分布，不需要频率梯度（群速度）。

然而，在能带交叉或简并点处，线性插值会引入误差。
