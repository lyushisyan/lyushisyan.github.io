---
layout: post
title: "声子频率为什么会随温度变化？——从准简谐近似到自洽声子理论"
lang: zh
translation_key: temperature-dependent-phonon-frequencies
permalink: /zh/blog/2026/09/11/temperature-dependent-phonon-frequencies/
date: 2026-09-11 12:00:00
last_modified_at: 2026-09-11
reading_time: "16 min"
description: "解释普通简谐声子为何没有显式温度依赖，以及热膨胀、四阶非简谐重整化和三阶 bubble 自能如何共同产生有限温度声子频移与线宽。"
tags: theory phonon anharmonicity
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

很多第一性原理声子计算只给出一条声子色散：在平衡结构上计算一次，随后便把它用于 300 K、500 K，甚至更高温度。可是温度升高后，晶体会热膨胀，原子振幅会增大，声子之间的相互作用也会增强。声子频率为什么还能保持不变？

答案是，常规计算得到的通常是**固定结构和固定二阶力常数下的简谐频率**。温度没有被遗漏在某个输入参数里，而是被排除在模型之外。有限温度声子需要区分至少两类机制：

1. 温度改变平衡结构，进而改变简谐频率；
2. 即使结构保持不变，非简谐热涨落仍会重整化声子能量并产生谱线展宽。

准简谐近似（quasiharmonic approximation，QHA）主要描述第一类机制；自洽声子理论（self-consistent phonon theory，SCP/SCPH）及声子自能则处理第二类机制。本文从这一分工出发，说明温度怎样进入声子频率，以及频移、线宽和寿命为什么必须加以区分。

这也补充了前面关于[第一性原理 PBTE 工作流]({{ '/zh/blog/2025/02/16/abinitio-bte/' | relative_url }})和[声子 Wigner 输运]({{ '/zh/blog/2026/06/21/phonon-wave-particle-wigner-transport/' | relative_url }})的讨论：输运计算中的速度、散射率和相干贡献，都建立在所采用的声子谱之上。

## 简谐频率为什么没有显式温度

在参考结构附近，Born–Oppenheimer 势能可按原子位移展开：

$$
U
=
U_0
+\frac{1}{2!}\sum_{ij}\Phi_{ij}^{(2)}u_i u_j
+\frac{1}{3!}\sum_{ijk}\Phi_{ijk}^{(3)}u_i u_j u_k
+\frac{1}{4!}\sum_{ijkl}\Phi_{ijkl}^{(4)}u_i u_j u_k u_l
+\cdots .
$$

常规简谐计算只保留二阶力常数 $\Phi^{(2)}$。由它构造动力学矩阵

$$
D_{\alpha\beta}^{\kappa\kappa'}(\mathbf q)
=
\frac{1}{\sqrt{M_\kappa M_{\kappa'}}}
\sum_l
\Phi_{\alpha\beta}^{(2)}(0\kappa,l\kappa')
e^{i\mathbf q\cdot(\mathbf R_l+\boldsymbol\tau_{\kappa'}-\boldsymbol\tau_\kappa)},
$$

再求解

$$
D(\mathbf q)e_{\mathbf q\nu}
=
\omega_{\mathbf q\nu}^{2}e_{\mathbf q\nu}.
$$

只要参考结构、原子质量和 $\Phi^{(2)}$ 不变，$\omega_{\mathbf q\nu}$ 就不会变化。Bose–Einstein 布居

$$
n_{\mathbf q\nu}(T)
=
\frac{1}
{\exp(\hbar\omega_{\mathbf q\nu}/k_BT)-1}
$$

虽然随温度变化，但在纯简谐模型中，改变布居不会反过来改变频率。零点运动也包含在振动自由能和均方位移中，却不会在纯简谐理论里重整化动力学矩阵。

因此，“0 K 声子色散”通常更准确地说是**在某个零温参考结构上计算的简谐色散**。它不是对真实有限温度谱的声明。

## QHA：温度先改变平衡结构

QHA 保留了每个固定结构上的简谐声子图像，同时允许声子频率随体积变化：

$$
\omega_{\mathbf q\nu}
=
\omega_{\mathbf q\nu}(V).
$$

实际计算会在一组体积 $V_i$ 上分别获得静态能量和声子谱，并构造 Helmholtz 自由能

$$
F(V,T)
=
E_0(V)+F_{\mathrm{ph}}(V,T),
$$

其中

$$
F_{\mathrm{ph}}(V,T)
=
\sum_{\mathbf q\nu}
\left[
\frac{1}{2}\hbar\omega_{\mathbf q\nu}(V)
+k_BT\ln\!\left(
1-e^{-\hbar\omega_{\mathbf q\nu}(V)/k_BT}
\right)
\right].
$$

在给定外压 $P$ 下，应最小化 Gibbs 自由能

$$
G(V,T;P)=F(V,T)+PV.
$$

零外压时，这就退化为寻找 $F(V,T)$ 的最低点。得到平衡体积 $V(T)$ 后，可由已计算的体积依赖声子谱插值出

$$
\omega_{\mathbf q\nu}^{\mathrm{QHA}}(T)
=
\omega_{\mathbf q\nu}[V(T)].
$$

最简单的 QHA 只改变体积；对各向异性材料，还可以用晶格参数或应变作为结构自由度。无论采用哪种形式，其逻辑相同：

$$
T
\longrightarrow
\text{平衡结构}
\longrightarrow
\Phi^{(2)}
\longrightarrow
\omega_{\mathbf q\nu}.
$$

温度通过结构变化间接进入声子频率，而不是在固定结构的动力学矩阵中直接出现。

### 模式 Grüneisen 参数

QHA 中常用模式 Grüneisen 参数衡量频率对体积的敏感性：

$$
\gamma_{\mathbf q\nu}
=
-\frac{V}{\omega_{\mathbf q\nu}}
\frac{\partial\omega_{\mathbf q\nu}}{\partial V}.
$$

若 $\gamma_{\mathbf q\nu}>0$，体积增大通常使该模式软化；若 $\gamma_{\mathbf q\nu}<0$，体积增大可能使其硬化。后者可以对某些材料的低温负热膨胀作出重要贡献。

但 Grüneisen 参数描述的是沿结构坐标的频率变化。它本身不包含固定体积下由声子–声子相互作用产生的内禀温度重整化。

### QHA 的适用边界

QHA 在热膨胀适中、声子准粒子清楚且内禀非简谐修正较弱时通常有效。以下情况需要谨慎：

- 高温下原子振幅很大；
- 存在软模或结构相变；
- 参考结构出现虚频，无法定义稳定的简谐自由能；
- 固定体积下仍观察到明显频移；
- 谱线宽度与模式间隔相当，声子准粒子开始失去清晰定义。

尤其要注意，QHA 只使用不同结构上的二阶力常数。它能够表现非简谐势能导致的热膨胀效应，却没有显式求解高阶力常数引起的声子自能。

## SCPH：用温度相关的有效简谐体系描述非简谐晶体

SCPH 的核心思想是，用一个温度相关的有效动力学矩阵近似真实的非简谐晶体：

$$
D_{\mathrm{eff}}(\mathbf q,T)
e_{\mathbf q\nu}(T)
=
\Omega_{\mathbf q\nu}^{2}(T)
e_{\mathbf q\nu}(T).
$$

这里的 $\Omega_{\mathbf q\nu}(T)$ 是重整化频率。与 QHA 不同，即使保持体积不变，热涨落也能通过高阶力常数改变 $D_{\mathrm{eff}}$。

最直观的例子是一维四阶振子：

$$
U(x)
=
\frac{1}{2}kx^2+\frac{1}{4}\lambda x^4.
$$

用势能曲率的热平均定义有效力常数，可得到

$$
k_{\mathrm{eff}}(T)
=
k+3\lambda\langle x^2\rangle_T,
$$

以及

$$
M\Omega^2(T)
=
k+3\lambda\langle x^2\rangle_T.
$$

而量子谐振子的均方位移又依赖于待求频率：

$$
\langle x^2\rangle_T
=
\frac{\hbar}{2M\Omega(T)}
\coth\!\left[
\frac{\hbar\Omega(T)}{2k_BT}
\right].
$$

于是形成闭环：

$$
\Omega(T)
\longrightarrow
\langle x^2\rangle_T
\longrightarrow
k_{\mathrm{eff}}(T)
\longrightarrow
\Omega(T).
$$

从一个初始频率出发反复更新，直到输入与输出一致，就是“自洽”的含义。这个表达式也显示，即使在 $T=0$，零点涨落仍可能通过四阶非简谐性产生频率重整化。

对真实晶体，上述标量关系推广为模式耦合的矩阵方程。常见的 SCPH 实现以四阶 IFC 的 loop 型贡献为主要自洽项，得到温度相关的有效二阶力常数和本征矢。强非谐材料中在简谐近似下出现的虚频，有时可以通过这种有限温度重整化变为稳定的实频；这并不意味着所有虚频都能被自动“修好”，仍需确认参考相、收敛性和相变物理。

## 三阶非简谐：频移与线宽来自同一个自能

若以热平均后的平衡位置为参考，$\langle u\rangle_T=0$，三阶项不会像四阶项那样通过一次简单的曲率平均留下线性贡献。但两个三阶顶角可以在二阶微扰中形成 bubble 自能。可以把它示意为

$$
\lambda
\longrightarrow
(\lambda_1,\lambda_2)
\longrightarrow
\lambda.
$$

三阶声子自能一般依赖温度和外部频率：

$$
\Sigma_\lambda^{(3)}(\omega,T)
=
\operatorname{Re}\Sigma_\lambda^{(3)}(\omega,T)
+i\operatorname{Im}\Sigma_\lambda^{(3)}(\omega,T).
$$

在弱阻尼、声子准粒子仍然成立的条件下，

$$
\operatorname{Re}\Sigma_\lambda^{(3)}
\longrightarrow
\Delta\Omega_\lambda,
$$

而

$$
-\operatorname{Im}\Sigma_\lambda^{(3)}
\longrightarrow
\Gamma_\lambda,
\qquad
\tau_\lambda\propto\Gamma_\lambda^{-1}.
$$

具体的因子取决于自能和线宽的约定。物理含义则很明确：实部移动谱峰位置，虚部给出展宽和有限寿命。因此，同一个三阶相互作用既能改变声子频率，也能产生三声子散射。

若把 bubble 自能取在 $\omega=0$，得到 static bubble 近似；保留完整的频率依赖则得到动态 bubble，可进一步描述谱峰位置、宽度，甚至强耦合时的非 Lorentz 线形。静态近似适合估计频率修正，却不能保留完整的动力学谱信息。

把四阶效应归入 SCPH、把三阶效应归入 bubble，是一种常见的最低阶组织方式，而不是绝对分工。更高阶项、四声子散射、热膨胀与内禀重整化之间的耦合，都可能在高温或强非谐体系中变得重要。

## 三种频率不要混在一起

讨论“声子频率随温度变化”时，最好明确所指的量：

1. **简谐频率** $\omega_{\mathbf q\nu}$：固定参考结构上由二阶 IFC 得到；
2. **QHA 频率** $\omega_{\mathbf q\nu}[V(T)]$：平衡结构随温度变化后得到；
3. **非简谐重整化频率** $\Omega_{\mathbf q\nu}(T)$：进一步包含固定结构下的声子自能。

实验中的非弹性中子、X 射线或 Raman 测量通常看到有限温度谱函数的峰位和宽度。与实验比较时，只给出一条零温简谐色散往往不够，还应说明是否包含热膨胀、内禀非简谐频移以及仪器或物理线宽。

以 Si 的 X 点 TO 模为例，Masuki 等人的计算显示，QHA、SCPH 以及加入 static bubble 后的频移并不相同；非简谐修正可以与 QHA 项处于相近量级。这说明 QHA 有时能给出合理的总趋势，却不保证每个模式的微观频移都正确。

## 如何选择计算方法

| 目标 | 合适的起点 | 主要输出 | 主要限制 |
|---|---|---|---|
| 稳定晶体的基准声子谱 | 简谐计算 | $\omega_{\mathbf q\nu}$、本征矢 | 无显式温度频移和线宽 |
| 热膨胀及其引起的频移 | QHA | $V(T)$、$\alpha(T)$、$\omega[V(T)]$ | 忽略固定结构下的内禀非简谐重整化 |
| 强非谐频率重整化 | SCPH | $\Omega_{\mathbf q\nu}(T)$、重整化本征矢 | 依赖高阶 IFC、超胞与自洽收敛 |
| 三阶频移与寿命 | SCPH + bubble | 峰位修正、$\Gamma_\lambda(T)$、$\tau_\lambda(T)$ | 动态自能更昂贵，强阻尼时准粒子图像可能失效 |

实际工作中应分别检查电子结构参数、位移超胞、高阶 IFC 截断、$\mathbf q$ 网格和自洽阈值。若模式线宽已经与相邻能带间隔可比，仅报告“重整化频率”也可能不足，需要进一步分析完整谱函数或采用密度矩阵与 Wigner 描述。

声子频率随温度变化并不是给简谐动力学矩阵机械地加上一个温度参数。温度先通过热膨胀改变平衡结构，又通过非简谐热涨落改变有效恢复力和声子自能。QHA、SCPH 与 bubble 修正分别保留了这条因果链上的不同部分：

$$
\boxed{
\text{结构热膨胀}
+
\text{四阶自洽重整化}
+
\text{三阶动态自能}
\;\Longrightarrow\;
\text{有限温度声子谱}
}
$$

## 参考文献

1. S. Wei, C. Li, and M. Y. Chou, “Ab initio calculation of thermodynamic properties of silicon,” *Physical Review B* **50**, 14587–14596 (1994), doi: [10.1103/PhysRevB.50.14587](https://doi.org/10.1103/PhysRevB.50.14587).
2. L.-F. Huang, X.-Z. Lu, E. Tennessen, and J. M. Rondinelli, “An efficient ab-initio quasiharmonic approach for the thermodynamics of solids,” *Computational Materials Science* **120**, 84–93 (2016), doi: [10.1016/j.commatsci.2016.04.012](https://doi.org/10.1016/j.commatsci.2016.04.012).
3. D. S. Kim *et al.*, “Nuclear quantum effect with pure anharmonicity and the anomalous thermal expansion of silicon,” *Proceedings of the National Academy of Sciences* **115**, 1992–1997 (2018), doi: [10.1073/pnas.1707745115](https://doi.org/10.1073/pnas.1707745115).
4. T. Tadano and S. Tsuneyuki, “Self-consistent phonon calculations of lattice dynamical properties in cubic SrTiO$_3$ with first-principles anharmonic force constants,” *Physical Review B* **92**, 054301 (2015), doi: [10.1103/PhysRevB.92.054301](https://doi.org/10.1103/PhysRevB.92.054301).
5. T. Tadano and S. Tsuneyuki, “First-Principles Lattice Dynamics Method for Strongly Anharmonic Crystals,” *Journal of the Physical Society of Japan* **87**, 041015 (2018), doi: [10.7566/JPSJ.87.041015](https://doi.org/10.7566/JPSJ.87.041015).
6. R. Masuki, T. Nomoto, R. Arita, and T. Tadano, “Anharmonic Grüneisen theory based on self-consistent phonon theory: Impact of phonon-phonon interactions neglected in the quasiharmonic theory,” *Physical Review B* **105**, 064112 (2022), doi: [10.1103/PhysRevB.105.064112](https://doi.org/10.1103/PhysRevB.105.064112).
7. J. Bouchet, F. Bottin, D. Antonangeli, and G. Morard, “Sound velocities and thermodynamical properties of hcp iron at high pressure and temperature,” *Journal of Physics: Condensed Matter* **34**, 344002 (2022), doi: [10.1088/1361-648X/ac792f](https://doi.org/10.1088/1361-648X/ac792f).
