---
layout: post
title: "粗糙边界如何改变纳米结构中的声子输运？"
lang: zh
translation_key: rough-boundaries-phonon-transport
permalink: /zh/blog/2026/06/22/rough-boundaries-phonon-transport/
date: 2026-06-22 12:00:00
last_updated: 2026-06-22
reading_time: "12 min"
description: "从边界受限平均自由程出发，解释粗糙度振幅、相关长度与空间频谱如何选择性散射声子，以及何时必须超越单一镜面反射系数。"
tags: phonon boundary-scattering nanostructure roughness
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

当纳米结构的横向尺寸小于或接近声子平均自由程时，热导率下降似乎是一件理所当然的事：声子还没来得及在材料内部走多远，就已经撞上边界。但这个解释只回答了“边界为什么重要”，还没有回答更关键的问题——**边界以什么方式改变热流？**

两个直径相同、长度相近、材料和温度也相同的硅纳米线，可以因为表面形貌不同而表现出明显不同的热导率。决定输运的并不只是几何尺寸，也不是一个笼统的“表面很粗糙”，而是粗糙起伏与声子波长、入射角和传播方向之间的尺度匹配。

前面的文章讨论了[傅里叶定律何时失效]({{ '/zh/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }})以及[声子的粒子性与波动性]({{ '/zh/blog/2026/06/21/phonon-wave-particle-wigner-transport/' | relative_url }})。本文把问题收紧到真实空间的边界：从 Casimir 图像出发，逐步说明为什么粗糙度不能被压缩成一个与频率无关的散射率，以及实验或模拟中观察到的强热导抑制究竟能够说明什么。

## 边界不是体散射之外的一个常数修正

在体材料中，某一声子模式的输运长度主要由非谐、同位素和缺陷散射决定。进入纳米结构后，边界提供了新的长度尺度。用简化的动理学形式表示，晶格热导率可以写成

$$
\kappa
=\frac{1}{3}\int
C(\omega)v(\omega)\Lambda_{\mathrm{eff}}(\omega)
\,\mathrm d\omega,
$$

其中 $C$、$v$ 和 $\Lambda_{\mathrm{eff}}$ 分别是频率分辨的热容、群速度和有效平均自由程。若把不同过程近似看成独立随机事件，常用 Matthiessen 形式

$$
\frac{1}{\Lambda_{\mathrm{eff}}(\omega)}
\simeq
\frac{1}{\Lambda_{\mathrm{bulk}}(\omega)}
+\frac{1}{\Lambda_{\mathrm B}(\omega)}.
$$

对完全漫反射的边界，$\Lambda_{\mathrm B}$ 通常与结构的横向尺寸同量级，这就是 Casimir 图像的核心。它给出了很有用的基准：当声子每次到达边界后都丢失原来的传播方向，几何尺寸会限制其沿热流方向的平均前进距离。

但这个基准不是所有粗糙边界的下限定理。首先，镜面反射不会完全破坏平行动量，边界限制可能弱于完全漫反射；其次，带有收缩、凸起或相关起伏的边界可以让声子连续多次反射，使其沿轴向的净位移比单次跨越尺寸更短。此时，即使每一次反射仍能用粒子轨迹描述，有效输运长度也可能低于简单 Casimir 估计。

因此，“尺寸越小，热导率越低”只是第一层图像。真正需要计算的是不同频率和传播方向的声子到达边界后，被怎样重新分配。

## 粗糙度不是一个数字，而是一组空间尺度

描述表面时最常给出的量是均方根粗糙度 $\eta$。它刻画高度起伏有多大，却没有告诉我们这些起伏变化得多快。两条表面可以具有相同的 $\eta$：一条缓慢起伏，另一条密布尖锐小尺度结构；它们对同一声子的作用不会相同。

还需要一个横向相关长度 $L_c$，以及更完整的高度相关函数

$$
C(\boldsymbol r)
=\langle h(\boldsymbol r_0)
h(\boldsymbol r_0+\boldsymbol r)\rangle.
$$

它的傅里叶变换是粗糙度功率谱密度 $S(\boldsymbol q)$。边界散射要求声子在平行于表面的方向改变波矢，而所需的动量差

$$
\Delta\boldsymbol q_{\parallel}
=\boldsymbol q'_{\parallel}-\boldsymbol q_{\parallel}
$$

必须由表面的空间频率提供。因此，散射强弱并不只由表面“有多粗”决定，还取决于 $S(\Delta\boldsymbol q_{\parallel})$ 是否在相应波矢处具有足够权重。这是一种选择性耦合：某种粗糙形貌可以强烈反散射一部分声子，却几乎不影响另一部分声子。

在常用的 Ziman–Soffer 近似中，具有波长 $\lambda$、以相对法线角 $\theta$ 入射的声子，其镜面反射概率常写成

$$
p(\lambda,\theta)
=\exp\!\left[
-\frac{16\pi^2\eta^2\cos^2\theta}{\lambda^2}
\right].
$$

这个表达式传达了两个重要物理事实：长波声子更容易把细小起伏平均掉，掠入射也更容易保持镜面性。但它只显式保留了粗糙度振幅，没有完整描述相关长度、周期性和散射后的角分布。把整条真实表面压缩成一个常数 $p$，会进一步抹去频率与入射角的选择性。

在我们关于非光滑硅纳米线的工作中，Soffer 镜面参数与 Fuchs–Sondheimer 框架被用于研究直径、温度和真实表面粗糙度如何共同影响热导率。随后针对周期粗糙边界的反射模型进一步同时考虑了反射波的相位损失与角度偏转，并显示镜面概率在高频区未必随频率单调变化。这里的要点不是要用一个更复杂的公式替换一个简单公式，而是：**一旦边界具有明确的空间结构，反射就由波长、振幅、周期和入射角共同决定。**

## 从漫反射到多重散射、干涉与局域化

边界问题天然处在粒子与波两种描述的交界处。在粒子图像中，声子沿群速度传播，在边界处按照镜面或漫反射概率改变方向。蒙特卡洛方法能够追踪大量这样的飞行与反射事件，特别适合回答几何收缩、多次碰撞和非局域输运如何降低轴向热流。

当粗糙结构的尺度与声子波长可比，而且相位在多次边界作用之间仍能保持时，只有随机改向就不够了。粗糙度可以耦合横向模、产生相干背散射；周期或准周期起伏可以形成带隙和局域共振；足够长且相干的无序结构还可能出现局域化趋势。此时边界改变的不只是平均自由程，也可能改变结构允许哪些振动态传播。

不过，观察到热导率很低，甚至推导出平均自由程低于横向尺寸，并不能单独证明 Anderson 局域化。多重几何反射、颈缩、非晶表层、表面氧化、缺陷以及接触热阻都可能产生类似的宏观结果。所谓“低于 Casimir 极限”首先说明简单的一次漫反射图像不充分，而不是自动指定了唯一的微观机制。

这里还需要区分两种“相干”。[Wigner 输运方程]({{ '/zh/blog/2026/06/21/phonon-wave-particle-wigner-transport/' | relative_url }})中的相干主要指同一波矢附近不同振动分支之间的非对角密度矩阵；粗糙边界引起的干涉则发生在被边界连接的传播路径或波矢之间。两者都源于波动性，但不是同一个可直接互换的物理量。

## 如何判断粗糙边界真正做了什么

可靠的分析不应从拟合一个“有效粗糙度”开始，而应建立从形貌到谱、再到输运的证据链。首先测量或构造边界高度场，至少报告 $\eta$、$L_c$ 和功率谱密度，而不是只给一个平均粗糙度。随后比较声子波长、体平均自由程、结构尺寸和粗糙度尺度，判断系统更接近射线式反射、波动散射还是二者交叉的区域。

模型的选择也应与问题对应。频率和角度相关的 Boltzmann 或蒙特卡洛模型适合检验边界重定向、多次反射和弹道—扩散过渡；原子级分子动力学能够自然包含表面重构、非线性和原子无序，但经典统计与有限尺度需要谨慎处理；格林函数、晶格动力学或波包方法则更适合直接寻找透射谷、模转换、共振与局域化长度。若不同层次的模型都能解释同一条总热导率曲线，模式分辨透射、长度依赖和温度依赖才是区分机制的关键。

最终，粗糙边界的作用不应被概括为“额外增加一个散射率”。它是一个具有空间频谱的结构，会选择声子的波长和方向，会改变连续反射之间的相关性，在适当条件下还会重塑振动模式本身。纳米结构的尺寸告诉我们声子多久遇到一次边界；边界的统计与几何结构，则决定这次相遇之后，热流还保留多少方向、相位和传播能力。

## 参考文献

1. H. B. G. Casimir, “Note on the conduction of heat in crystals,” *Physica* **5**, 495–500 (1938), doi: [10.1016/S0031-8914(38)80162-2](https://doi.org/10.1016/S0031-8914(38)80162-2).
2. S. B. Soffer, “Statistical model for the size effect in electrical conduction,” *Journal of Applied Physics* **38**, 1710–1715 (1967), doi: [10.1063/1.1709746](https://doi.org/10.1063/1.1709746).
3. P. Martin, Z. Aksamija, E. Pop, and U. Ravaioli, “Impact of phonon-surface roughness scattering on thermal conductivity of thin Si nanowires,” *Physical Review Letters* **102**, 125503 (2009), doi: [10.1103/PhysRevLett.102.125503](https://doi.org/10.1103/PhysRevLett.102.125503).
4. J. Sadhu and S. Sinha, “Room-temperature phonon boundary scattering below the Casimir limit,” *Physical Review B* **84**, 115450 (2011), doi: [10.1103/PhysRevB.84.115450](https://doi.org/10.1103/PhysRevB.84.115450).
5. C. Blanc, A. Rajabpour, S. Volz, T. Fournier, and O. Bourgeois, “Phonon heat conduction in corrugated silicon nanowires below the Casimir limit,” *Applied Physics Letters* **103**, 043109 (2013), doi: [10.1063/1.4816590](https://doi.org/10.1063/1.4816590).
6. S. Liu, A. A. Barinov, F. Yin, and V. I. Khvesyuk, “Determination of thermal properties of unsmooth Si nanowires,” *Chinese Physics Letters* **41**, 016301 (2024), doi: [10.1088/0256-307X/41/1/016301](https://doi.org/10.1088/0256-307X/41/1/016301).
7. F. Yin, S. Liu, A. A. Barinov, and V. I. Khvesyuk, “An enhanced framework for wave reflection from a periodically rough boundary,” *Physica B: Condensed Matter* **716**, 417743 (2025), doi: [10.1016/j.physb.2025.417743](https://doi.org/10.1016/j.physb.2025.417743).
