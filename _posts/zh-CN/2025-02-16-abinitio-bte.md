---
layout: distill
title: 基于第一性原理的 PBTE 方法
date: 2025-2-16 6:36:10
categories: Heat-conduction Calculation
tabs: true
map: true

toc:
  - name: 1. 第一性原理方法
  - name: 2. 简谐与非简谐晶格动力学
  - name: 3. 热导率与玻尔兹曼输运方程（BTE）
  - name: 4. 计算流程与软件

---

微纳尺度热传导中的尺寸效应主要涉及两个关键长度尺度：**声子的波长**和**平均自由程（MFP）**。   
若系统的特征尺寸远大于声子的 MFP，则热传导处于**宏观扩散输运**机制中，此时经典的热扩散方程适用；   
若特征尺寸与声子的 MFP 相当，则需考虑**经典尺寸效应**，即**声子弹道输运现象**，此时应采用玻尔兹曼输运方程（BTE）描述能量传输；   
若特征尺寸进一步缩小至与声子波长相当，则需考虑声子的**波动性特征**。   
   
**第一性原理的 PBTE（Phonon Boltzmann Transport Equation，声子玻尔兹曼输运方程）**其实就是将下面三个计算方法的结合：   
- **第一性原理方法（first-principles method 或 ab initio method）** 是指一种用于数值求解**薛定谔方程**的方法。   
- **晶格动力学方法（lattice dynamics）**，是指通过原子间力常数（IFCs）计算声子色散关系和弛豫时间的方法。   
- **玻尔兹曼输运方程（BTE）** 则是通过将声子色散关系和弛豫时间作为输入，计算体系总热导率的热传输模型。   
   
## 1. 第一性原理方法

第一性原理（first-principles）方法，又称从头算（ab initio）方法，指在量子力学框架下，通过**最少**的经验参数来求解材料中的电子结构、原子间相互作用等微观信息。它主要基于对薛定谔方程（或相应的有效方程）的数值解，从而得到材料的基态电子密度、能带结构、总能量以及其他相关物理性质。   
在固体物理与材料科学中，第一性原理方法大多以 密度泛函理论（Density Functional Theory, DFT）为基础。由于完整的多体薛定谔方程难以直接求解，DFT 提供了一种在电子密度空间中处理多体问题的有效途径，被广泛应用于各种体系（如金属、半导体、绝缘体，以及分子、表面等）中。 

### 1.1 密度泛函理论的基本思想

密度泛函理论的核心思想源自于 Hohenberg-Kohn 定理和 Kohn-Sham 方程：   
1. **Hohenberg-Kohn 定理**指出，体系基态的所有物理量都可以视为电子密度 $\rho(\mathbf{r})$ 的泛函；也就是说，只要知道体系的基态电子密度，就能唯一确定体系的哈密顿量和能量等信息。   
2. **Kohn-Sham 方程**将真实多电子体系映射为一个关于独立电子的辅助体系，通过一个合适的交换-关联势（exchange-correlation potential）来近似地描述真实电子间的相互作用。这样，求解含有电子-电子相互作用的多体问题，就转化为求解一组类单电子方程：   

$$
\left[ -\frac{\hbar^2}{2m}\nabla^2 + V_\text{ext}(\mathbf{r}) + V_\text{H}(\mathbf{r}) + V_\text{xc}(\mathbf{r}) \right] \phi_i(\mathbf{r}) = \epsilon_i \phi_i(\mathbf{r})
$$

其中：   
- $V_\text{ext}(\mathbf{r})$ 为原子核对电子的库仑势；   
- $V_\text{H}(\mathbf{r})$ 为经典 Hartree 库仑势；   
- $V_\text{xc}(\mathbf{r})$ 为交换-关联势，包含所有复杂的多体效应。   

在实际计算中，人们需要选用适当的交换-关联泛函（如局域密度近似 LDA、广义梯度近似 GGA 以及更高阶杂化泛函等），并结合赝势（pseudopotential）或全电子方法（如 PAW、APW+lo）等来有效处理实空间和动量空间。 

### 1.2 从 DFT 获取原子间力常数（IFCs）

在研究热导时，关键的一步是获取材料的**原子间力常数（interatomic force constants, IFCs）**。这些力常数用于构造动力学矩阵并计算晶格动力学性质（如声子色散关系、声子寿命等）。从第一性原理出发，人们常用以下两种主流方法来获取 IFCs：   

#### 1.2.1 线性响应方法（Density Functional Perturbation Theory, DFPT）

在密度泛函微扰理论框架下，对晶体的周期性结构施加一个小的周期性扰动，求解线性化的 Kohn-Sham 方程，从而直接得到势能对原子位移的一阶、二阶甚至三阶响应。   
- DFPT 具备在声子波矢空间中直接计算各种力常数和声子模的优点，且无需在实空间中进行大规模有限位移计算。   
- 通过 DFPT 可获得二阶（简谐）和三阶（非简谐）原子间力常数，为后续的声子色散和散射分析打下基础。   

#### 1.2.2 有限位移法（Finite Displacement Method, FDM）

在有限位移法中，通过在超胞（supercell）模型中对某个原子施加小的离散位移（例如 0.01 Å），计算体系总能量或力的变化，从而数值求解二阶或更高阶 IFCs。   
- 需要构造足够大的超胞，以保证相互作用在边界处衰减到可以忽略；   
- 需要对各种不同位移构型做多次能量/力计算，以提取完整的二阶或三阶 IFCs。   
   
无论是 DFPT 还是有限位移法，都需要在 DFT 水平上做能量或力的计算。由于声子性质对计算精度相当敏感，需要在计算流程中仔细选择交换-关联泛函、平面波截断能（plane-wave cutoff）、$\mathbf{k}$-点采样密度等，以确保得到高精度的原子间力常数。 

## 2. 简谐与非简谐晶格动力学   

在简谐晶格动力学（harmonic lattice dynamics）中，通过二阶原子间力常数（IFCs）可以获得声子的色散关系 $\omega_\lambda(\mathbf{q})$。一旦得到了色散关系，就可以计算每一个声子模 $\lambda$ 的比热容。   
声子模 $\lambda$ 的群速度定义为频率对倒易空间坐标的梯度：$\mathbf{v}_\lambda = \nabla_\mathbf{q} \omega_\lambda$   
声子的**弛豫时间** $\tau_\lambda$ 需要通过 **非简谐晶格动力学（anharmonic lattice dynamics）** 计算获得，该计算需要使用二阶（简谐）与高阶（非简谐）IFCs。

### **2.1 色散关系**   

对于一个周期性晶体，若原子在平衡位置附近仅发生小幅度振动，则体系总势能 $U$ 可以展开为泰勒级数：

$$
U = U_0 + \frac{1}{2!} \sum_{ij}\sum_{\alpha\beta} \Phi_{ij}^{\alpha\beta} u_i^\alpha u_j^\beta + \frac{1}{3!} \sum_{ijk}\sum_{\alpha\beta\gamma} \Psi_{ijk}^{\alpha\beta\gamma} u_i^\alpha u_j^\beta u_k^\gamma + \mathcal{O}(u^4)
$$

其中：   
- $U_0$：平衡态势能；   
- $u_{i}^\alpha$：第 $i$ 个原子在 $\alpha$ 方向的位移；   
- $\Phi_{ij}^{\alpha\beta}$：二阶原子间力常数（harmonic IFCs）；   
- $\Psi_{ijk}^{\alpha\beta\gamma}$：三阶原子间力常数（anharmonic IFCs）；   
- $\mathcal{O}(u^4)$：更高阶项。   

由于在平衡态时对任意原子 $i$ 都有 $\mathbf F_i = -\nabla_i U = 0$，因此在势能展开中不会出现一次项。若在**简谐近似**下忽略所有高于二阶的项，则势能只保留二阶 IFCs，可以得到运动方程。

如果晶体中第 $i$ 个原子是第 $l$ 个晶胞中的第 $b$ 个原子，而 $j$ 对应于晶胞 $l'$ 中的第 $b'$ 个原子，那么根据牛顿第二定律，有：   

$$
m_b\frac{d^2 u_{lb}^\alpha (t)}{d t^2} = -\sum_{l'b',\beta} \Phi_{lb,l'b'}^{\alpha\beta} u_{l'b'}^{\beta} (t)
$$

其中：   
- $m\_b$：为同一晶胞中第 $b$ 个原子的质量；   
- $u_{lb}^\alpha (t)$：在第 $l$ 个晶胞中、第 $b$ 个原子沿 $\alpha$ 方向的位移。   
   
若假设解的形式为**平面波**：   

$$
u_{lb}^\alpha (t) = \frac{1}{\sqrt{m_b}}\Lambda_\lambda e_{b,\lambda}^\alpha e^{i(\mathbf q\cdot\mathbf R_l - \omega_\lambda t)}
$$

将解代入运动方程，可得到如下形式的特征值方程：   

$$
\omega_\lambda^2 \mathbf e _{b,\lambda} = \mathbf D_{bb'}^{\alpha\beta}(\textbf q) \textbf e_{b,\lambda}
$$

其中，$\mathbf D(\mathbf{q})$ 是所谓**的 D 型动力学**矩阵，其表达式为：   

$$
\mathbf D_{bb'}^{\alpha\beta}(\textbf q) =\frac{1}{\sqrt{m_bm_{b'}}}\sum_{l'}\Phi_{0b,l'b'}^{\alpha\beta} e^{i\mathbf q\cdot(\mathbf R_{l'} - \mathbf R_0)}
$$

求解特征值问题，就可以得到声子色散关系 $\omega\_\lambda(\mathbf{q})$，以及相应的特征向量 $\{e\_{b,\lambda}^\alpha\}$。   

### **2.2 声子散射机制与弛豫时间**  

在实际材料中，声子不会无限传播而无损耗，而是会因各种散射机制而出现有限的传播寿命。在玻尔兹曼输运方程（BTE）框架下，这些散射过程常被归纳进一个总的**散射率 **$\Gamma\_\lambda$ 或等效的**弛豫时间**$\tau\_\lambda$。
   
### 2.2.1 声子-声子散射  

在非金属晶体中，最主要的散射通常来自**声子-声子相互作用**，亦即晶格的非简谐振动效应。其理论根源在于势能展开中的三阶、四阶及更高阶项。   
量子力学框架下，晶体哈密顿量可分为简谐项与非简谐项两部分。通常先对简谐部分做近似求解（将每个正常模视为量子简谐振子），再将非简谐相互作用作为微扰来处理。   

三声子散射是最常见且主导的非简谐散射类型：一个声子可以与另一个声子“湮灭并产生”第三个声子（组合过程），或者一个声子“衰变”成两个声子（拆分过程）。当声子波矢 $\mathbf{q}$, $\mathbf{q}'$ 和 $\mathbf{q}''$ 以及相应模频率 $\omega\_\lambda$，$\omega\_{\lambda'}$ 和 $\omega\_{\lambda''}$ 满足能量和动量守恒（含 Umklapp 过程）时，就会发生三声子散射。 

用 $\lambda$ 表示声子模 （由波矢 $\mathbf{q}$ 和声子分支 $s$ 组成）。三声子过程的跃迁概率为：   

$$
\Gamma_{\lambda\lambda'\lambda''}^{\pm} = \frac{\hbar\pi}{4}\begin{Bmatrix}n_{\lambda'}-n_{\lambda''} \\ n_{\lambda'} + n_{\lambda''}+1 \end{Bmatrix} \frac{\delta(\omega_\lambda\pm\omega_{\lambda'} - \omega_{\lambda''})}{\omega_{\lambda}\omega_{\lambda'}\omega_{\lambda''}}|V_{\lambda\lambda'\lambda''}^{\pm}|^2\Delta_{\mathbf{G}, \,\mathbf{q}\pm \mathbf{q}' - \mathbf{q}''}
$$

其中：   
- $\Delta\_{\mathbf{G}, \,\mathbf{q}\pm \mathbf{q}' - \mathbf{q}''}$ 表示动量守恒（含 Umklapp 矢量 G\mathbf{G}G）的 Kronecker delta；   
- $\delta(\cdot)$ 表示能量守恒的 Dirac delta；   
- $\pm$ 分别对应**组合** ($\omega\_\lambda + \omega\_{\lambda'} = \omega\_{\lambda''}$）和**拆分**（$\omega\_\lambda = \omega\_{\lambda'} + \omega\_{\lambda''}$）两类过程；   
- $\|V^{\pm\lambda,\lambda',\lambda''}\|^2$ 为三阶非简谐相互作用矩阵元，取决于所涉及的三个声子的特征向量和三阶 IFCs。   
   
### 2.2.2 声子-杂质散射   
当晶体中存在不同质量或不同类型的原子（如同位素、点缺陷等）时，会导致局部力常数或质量分布的微扰。   
散射率通常用下述经验公式近似：   

$$
\Gamma_{\lambda\lambda'} = \frac{\pi \omega_\lambda^2}{2}\delta(\omega_\lambda - \omega_{\lambda'})\sum_bg(b) |\mathbf e_{b,\lambda}^*\cdot \mathbf e_{b,\lambda'}|^2
$$

其中，$g(b)=\sum\_s f\_s(b)(1-\frac{m\_{b,s}}{\overline{m}\_b})^2$。$f\_s$ 是杂质原子 $s$ 的浓度。平均质量为 $\overline m\_b = \sum\_s f\_s(b) m\_{b,s}$ 。$N\_0$ 为波矢 $\mathbf q$ 点的数量。 

## 3. 热导率与玻尔兹曼输运方程（BTE）  

### 3.1 热导率   

根据傅里叶定律，材料的热导率 $\kappa$ 描述其传热能力，定义为：   

$$
\mathbf J = -\kappa \nabla T
$$

其中，$\mathbf{J}$ 是热流矢量，$\nabla T$ 是温度梯度。若材料具有各向异性，热导率 $\kappa$ 是一个张量。   
若要从微观层面（如声子特性）来预测 $\kappa$，通常需要使用玻尔兹曼输运方程（BTE）来描述声子群体在有限温度梯度下的非平衡分布。若假设系统处于稳态，且温度梯度足够小，可将 **BTE 线性化**，得到下式：   

$$
-\mathbf v_\lambda \nabla T \frac{\partial n_\lambda^0}{\partial T} = \frac{n_\lambda'}{\tau_\lambda}
$$

其中 $n\_\lambda' = n\_\lambda - n\_\lambda^0$，即偏离平衡态的部分。   
$n\_\lambda$ 为声子模 $\lambda$ 的分布函数，   
$n\_\lambda^0$ 表示平衡态（玻色-爱因斯坦）分布，   
$n\_\lambda'$ 即偏离平衡态的微扰部分，   
$\tau\_\lambda$ 为该声子模的弛豫时间，   
$\mathbf{v}\_\lambda$ 为声子模的群速度。   
声子是玻色子，其平衡态分布服从 **玻色-爱因斯坦统计**：   

$$
n_\lambda^0 = \frac{1}{\exp\left(\frac{\hbar \omega_\lambda}{k_B T}\right) - 1}
$$

其中，$\hbar$ 是约化普朗克常数，$k\_B$ 是玻尔兹曼常数，$\omega\_\lambda$ 表示声子模的频率，$T$ 表示温度。   
由声子贡献的热流（忽略电子热导等其他贡献）可写为   

$$
\mathbf J = \frac{1}{V} \sum_\lambda \hbar\omega_\lambda \mathbf v_\lambda n_\lambda
$$

其中，$V$ 是系统体积，可以通过单位胞体积 $\Omega$ 与波矢 $\mathbf{q}$ 的总数 $N\_0$ 得到：$V = N\_0 \cdot \Omega$。   
将上式与傅里叶定律 $J^\beta = -\kappa^{\alpha\beta} \frac{\partial T}{\partial \alpha}$ 进行对比，可以得到热导率张量的表达式：   

$$
\kappa^{\alpha\beta} = \frac{1}{V}\sum_\lambda \hbar\omega_\lambda \frac{\partial n_\lambda^0}{\partial T} v_\lambda^\alpha v_\lambda^\beta \tau_\lambda = \sum_\lambda c_\lambda v_\lambda^\alpha v_\lambda^\beta \tau_\lambda
$$

其中， $c\_\lambda = \frac{\hbar\omega\_\lambda}{V}\frac{\partial n\_\lambda^0}{\partial T}$ 为单个声子模的体积比热容。   
若材料近似各向同性，则可进一步简化为   

$$
\kappa = \frac{1}{3V}\sum_\lambda \hbar\omega_\lambda \frac{\partial n_\lambda^0}{\partial T} |\mathbf v_\lambda|^2 \tau_\lambda
$$

### 3.2 **单模弛豫时间近似（SMRTA）** 

**单模弛豫时间近似（SMRTA）** 方法的假设是：在求解某一声子模 $\lambda$ 的偏离分布时，其他所有模都保持在平衡分布 $n\_{\lambda'}^0$。，即：   

$$
\begin{cases}
n_\lambda = n_\lambda^0 + n_\lambda' \\
n_{\lambda'} = n_{\lambda'}^0 \\
n_{\lambda''} = n_{\lambda''}^0
\end{cases}
$$

这会简化三声子散射项的计算，只需关注声子模 $\lambda$ 自身对平衡态的偏离。   
单模弛豫时间近似下的弛豫时间：   
   

$$
\frac{1}{\tau_\lambda^0} = \sum_{\lambda'\lambda''}^+ \Gamma_{\lambda\lambda'\lambda''}^+ + \sum_{\lambda'\lambda''}^- \frac{1}{2} \Gamma_{\lambda\lambda'\lambda''}^- + \sum_{\lambda'}\Gamma_{\lambda\lambda'}
$$

其中，上标 0 表示此弛豫时间是基于 SMRTA 获得的第零近似解。  

### 3.3 迭代解法   

为了克服 SMRTA 的局限性，可采用 **全迭代方法（Full Iterative Method）** 来求解 BTE。   
在这种方法中，当计算某声子模 $\lambda$ 的偏离分布时，其他声子模 $\lambda'$ 也允许偏离平衡态，因而多声子模之间的散射耦合需要自洽求解。   

$$
\begin{cases}
n_\lambda = n_\lambda^0 + n_\lambda' \\
n_{\lambda'} = n_{\lambda'}^0 + n_{\lambda'}' \\
n_{\lambda''} = n_{\lambda''}^0 + n_{\lambda''}''
\end{cases}
$$

**初始猜测**   
常以 SMRTA 给出的 $\tau\_\lambda^0$ 作为第零次近似。   
**自洽迭代**   
将所有声子模的偏离量耦合起来写成一个方程组，通过迭代求解，直到收敛。这样能更精确地体现三声子 Normal 过程所导致的“声子再分配”效应。   

$$
\tau_\lambda = \tau_\lambda^0 + \tau_\lambda^0 \Delta_\lambda
$$

$$
\Delta_\lambda = \sum_{\lambda'\lambda''}^+ \Gamma_{\lambda\lambda'\lambda''}^+ (\xi_{\lambda\lambda''}\tau_{\lambda''} - \xi_{\lambda\lambda'}\tau_{\lambda'}) \\ + \sum_{\lambda'\lambda''}^- \frac{1}{2} \Gamma_{\lambda\lambda'\lambda''}^-(\xi_{\lambda\lambda''}\tau_{\lambda''} + \xi_{\lambda\lambda'}\tau_{\lambda'}) \\+ \sum_{\lambda'}\Gamma_{\lambda\lambda'}\xi_{\lambda\lambda'}\tau_{\lambda'}
$$

由于全迭代方法包含更多相互作用细节，对高热导率材料或低温下 N 过程活跃的体系，往往能得到更准确的结果。不过，它对计算资源的需求也更高，算法实现更复杂。   


## 4. 计算流程与软件   

计算声子热导率的一般流程包括以下几个关键步骤：

### （1）提取原子间力常数（IFCs）   

原子间力常数是进行晶格动力学和热输运计算的基础数据，可通过以下三种方式获得：   
- **经典势函数**：适用于结构简单、已有成熟势函数的材料；   
- **机器学习势（ML potentials）**：近年来快速发展，可兼顾精度和效率；   
- **第一性原理方法（First-Principles/DFT）**：最常用，能在无任何经验参数的前提下精确描述材料的基态性质，因此被广泛用于非简谐晶格动力学计算。   
   
准确提取 IFCs 并非易事，目前主要有两种方法：   
- **有限位移法（Finite Displacement Method）**：对超胞中原子施加微小扰动，结合差分法从获得的原子力中提取 IFCs。该方法适用于经典势、机器学习势以及第一性原理计算；   
- **密度泛函微扰理论（DFPT）**：一种基于线性响应的严格方法，能直接从第一性原理中计算 IFCs，但仅适用于 DFT 框架。   
   
### （2）截断与对称性修正  

理论上，IFC 可存在于晶体中任意两个原子之间。但在实际计算中，通常需要人为设定**截断半径**，只保留一定距离内的相互作用。因此，需要测试不同截断范围对热导率结果的影响。   
此外，由于数值噪声与截断带来的误差，从第一性原理获得的 IFCs 通常不完全满足 **平移不变性（translational invariance）** 等晶体对称性。这种不变性对于热导率预测至关重要，必须对 IFCs 做微小修正，以强制满足相应对称性。  

### （3）计算声子热导率   

在获得二阶和三阶 IFCs 后，可使用**非简谐晶格动力学**方法结合 **玻尔兹曼输运方程（BTE）** 计算热导率。常用的求解方式包括：   
- **单模弛豫时间近似（SMRTA）**：假设除目标声子模外其他模处于平衡态，计算简单，适用于快速估算；   
- **全迭代解法（Iterative Solution）**：考虑所有声子模之间的相互影响，能更准确地反映三声子 N 过程的贡献，适用于高导热或低温系统。   
   
该方法**无需任何拟合参数**，仅依赖材料的初始原子结构即可预测热导率，具有高度的通用性和准确性。大量研究表明，该方法预测结果与实验数据高度一致。   

### （4）数值误差与适用范围   

尽管该方法非常强大，但仍可能受到以下数值因素的影响：   
- 三阶 IFC 的精度依赖于 DFT 本身的收敛性、计算泛函以及位移步长的选择；   
- IFC 截断距离的选取可能引入系统性误差；   
- 第一布里渊区内数值积分精度（如 $\mathbf{q}$-点网格密度）也会影响最终热导率的准确性。   
   
即便如此，该方法仍被广泛认为是目前预测晶格热导率最可靠的理论工具之一。它不仅可以输出**总热导率**，还可获得**模分辨热导率贡献**，并进一步用于研究界面热导、纳米结构热输运等复杂体系。   

### （5）软件工具与接口  

目前已有多个开源软件包可实现上述流程，包括：**ShengBTE**，**phono3py** 等；   
这些工具通常可与主流第一性原理软件包（如 **VASP**、**Quantum ESPRESSO**、**ABINIT** 等）良好对接，实现从结构优化到 IFC 提取、再到热导率预测的自动化计算流程。   