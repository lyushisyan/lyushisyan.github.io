---
layout: distill
title: 使用 VASP 进行结构优化计算
date: 2024-12-01 23:36:10
categories: Calculation
tabs: true
map: true

toc:
  - name: 1. 输入文件
  - name: 2. 输出文件
  - name: 3. 优化过程与收敛性判断


---

## 1. 输入文件
输入文件为 vasp 的四个基础文件：`INCAR`  `POSCAR`  `POTCAR`  `KPOINTS`

### 1.1 `INCAR` 的参数设置

```bash
System = Si-film    # 体系名称，可以随意定义，用于标记当前计算体系

# 作业控制（Job Control）
ISTART = 0          # 初始状态设置：
                    # 0 从头开始计算
                    # 1 从已有的 WAVECAR 文件读取初始电子波函数
                    # 2 从 WAVECAR 和 CHGCAR 文件读取初始波函数和电子密度
ISPIN = 1           # 自旋极化选项：
                    # 1 无自旋极化（适用于非磁性材料）
                    # 2 自旋极化（适用于磁性材料）
ICHARGE = 2         # 初始电子密度选择：
                    # 2 从 POTCAR 提供的静态电子密度开始计算
                    # 1 从头生成电子密度
LWAVE = .FALSE.     # 是否输出 WAVECAR 文件：
                    # .TRUE. 输出（存储波函数数据）
                    # .FALSE. 不输出（节省磁盘空间）
LCHARG = .FALSE.    # 是否输出 CHGCAR 文件：
                    # .TRUE. 输出（存储静态电荷密度）
                    # .FALSE. 不输出（节省磁盘空间）
ISYM = 0            # 对称性设置：
                    # 0 关闭对称性（适用于含缺陷或非对称结构）
                    # 1 或 2 保留对称性操作

# 电子弛豫设置（Electronic Relaxation）
ENCUT = 500         # 平面波截断能量，单位 eV，决定计算精度和效率
ISMEAR = 0          # 展宽方法：
                    # -5 (四电子系统)、0 (高斯展宽，适合半导体)、1 或 2 (费米展宽)
SIGMA = 0.05        # 展宽宽度（单位 eV），推荐值为 0.01 ~ 0.1
EDIFF = 1E-08       # SCF 收敛准则：两次迭代能量变化小于 1E-08 eV 时停止
NELMIN = 6          # 最小电子迭代次数，确保基础收敛过程
NELM = 300          # 最大电子迭代次数，避免迭代死循环
GGA = PE            # 泛函选择，采用 PBE（Perdew-Burke-Ernzerhof）交换-相关泛函
LREAL = .FALSE.     # 动量空间计算，提高精度但增加计算量
ADDGRID = .TRUE.    # 启用附加 FFT 网格，提升数值精度
ALGO = N            # 电子弛豫算法：
                    # Normal（标准模式）、Fast 或 VeryFast（加速模式）
PREC = Accurate     # 精度设置：
                    # Accurate（高精度）、Normal 或 Low（初步测试用）

# 离子弛豫设置（Ionic Relaxation）
ISIF = 2            # 晶格优化选项：
                    # 2 仅优化原子位置，不改变晶格参数
                    # 3 优化原子和晶格形状
EDIFFG = -0.01      # 离子收敛准则：
                    # 负值基于力（单位 eV/Å）
                    # 正值基于能量
IBRION = 2          # 离子弛豫算法：
                    # 2 使用共轭梯度算法（适用于大多数优化任务）
POTIM = 0.5         # 时间步长，控制优化过程速度
NSW = 200           # 最大离子优化步数

# 并行控制（Parallel Control）
NPAR = 4            # FFT 网格的并行维度（推荐值为 sqrt(总核数)）
KPAR = 2            # k 点的并行处理数（总核数应为 NPAR × KPAR × NCORE 的整数倍）
NCORE = 12          # 每个任务的并行核数
```


在结构优化中，`INCAR` 中的关键参数包括 `IBRION` ，`ISIF`，`NSW`，`EDIFF` 和 `EDIFFG`

#### 1.1.1 `IBRION` 常用设置及适用场景

##### (1) 单点能计算
- **`IBRION = -1`**  
**用途**：适用于单点能量计算，例如固定晶格、电子结构计算或 DOS 分析。
**注意**：在设置 `NSW > 0` 时不要使用，否则会浪费计算资源。

##### (2) 结构优化
- **`IBRION = 1`**（RMM-DIIS）  
**用途**：适用于势能面光滑、体系较简单的优化。  
**限制**：对于复杂或不稳定的势能面，可能导致收敛问题。

- **`IBRION = 2`**（共轭梯度）  
**用途**：最常用的优化方法，适合大多数体系。  
**优点**：对势能面陡峭的复杂体系表现较好。

- **`IBRION = 3`**（阻尼分子动力学）  
**用途**：优化路径可能振荡或不稳定时，可通过阻尼修正来避免发散。

##### (3) 分子动力学模拟
- **`IBRION = 0`**  
**用途**：用于研究体系在不同温度下的动态行为，例如扩散、振动模式、温度效应。

##### (4) 声子计算

a. **有限差分法**   **`IBRION = 5, 6`**  
计算声子模式的有限差分方法，其中：
- **`5`**：不考虑对称性，适合缺陷或低对称性结构。
- **`6`**：利用对称性加速计算，适合对称性较高的体系。

b. **微扰理论（DFPT）** **`IBRION = 7, 8`**  
通过密度泛函微扰理论（DFPT）计算声子模式，其中：
- **`7`**：无对称性优化，适用于复杂或低对称性结构。
- **`8`**：利用对称性优化计算，更高效。

#### 1.1.2 `ISIF` 常用设置及适用场景

- 未设置 `ISIF` 时：
默认值为 `ISIF=2`，即优化原子位置但不改变晶胞形状和体积。

- 当 `IBRION=0`（分子动力学）或 `LHFCALC=.TRUE.`（混合泛函计算）时：
默认值为 `ISIF=0`，仅优化原子位置。

- `ISIF = 2`（**最常用**）
优化内容： 优化原子位置，不改变晶胞形状和体积。
适用场景： 二维材料、已知晶格常数、表面或界面体系。

- `ISIF = 3`（**体材料优化**）
优化内容： 优化原子位置、晶胞形状和体积。
适用场景： 体材料结构优化、全方位晶格弛豫。

- `ISIF = 4`（**固定体积优化**）
优化内容： 优化原子位置和晶胞形状，但体积固定。
适用场景： 压力测试或固定体积弛豫。

- `ISIF = 6`（**仅优化晶胞**）
优化内容： 优化晶胞形状和体积，不优化原子位置。
适用场景： 测试晶胞参数或晶格变形分析。

- `ISIF = 0`（**位置优化，无应力计算**）
优化内容： 仅优化原子位置，不计算应力。
适用场景： 固定晶胞的优化。

#### 1.1.3 `NSW`，`EDIFF` 和 `EDIFFG` 的设置规律

| 参数       | 功能             | 初步优化    | 高精度优化   | 单点计算  |
| -------- | -------------- | ------- | ------- | ----- |
| `NSW`    | 最大离子步数         | 100-200 | 200-500 | 0     |
| `EDIFF`  | SCF 迭代收敛准则（eV） | 1e-05   | 1e-08   | 1e-06 |
| `EDIFFG` | 离子优化收敛准则（eV/Å） | -0.1    | -0.01   | 无需设置  |

### 1.2 `POSCAR` 的示例

下面是描述了硅晶体结构的 `POSCAR` 文件示例：


```bash
Si-bulk   # 系统名称，可自定义
1.0          # 全局尺度因子（可以用于缩放晶格）
   5.430    0.000    0.000  # 晶格向量 a
   0.000    5.430    0.000  # 晶格向量 b
   0.000    0.000    5.430  # 晶格向量 c
Si           # 原子种类
2            # 每种原子的个数
Direct       # 坐标类型（Direct：分数坐标；Cartesian：笛卡尔坐标）
  0.000  0.000  0.000  # 原子 1 的坐标
  0.250  0.250  0.250  # 原子 2 的坐标
```

下面是描述硅薄膜（Si-film）的 `POSCAR` 文件示例：
假设薄膜沿 $x$ 和 $𝑦$ 方向为周期性，沿 $z$ 方向有限（需要设置真空层）

```bash
Si Thin Film                            
   1.00000000000000     
     5.4299999999999997    0.0000000000000000    0.0000000000000000
     0.0000000000000000    5.4299999999999997    0.0000000000000000
     0.0000000000000000    0.0000000000000000   20.8599999999999994
   Si
    16
Selective dynamics  # 启用 Selective dynamics
Direct
0.000000 0.000000 0.200000 F F F  # 三个方向固定
0.500000 0.500000 0.200000 T T F  # z 方向固定，x 和 y 方向可移动
0.500000 0.000000 0.330153 T T T  # 三个方向可移动
0.000000 0.500000 0.330153 T T T
0.250000 0.250000 0.265077 T T T
0.750000 0.750000 0.265077 T T T
0.750000 0.250000 0.395230 T T T
0.250000 0.750000 0.395230 T T T
0.000000 0.000000 0.460307 T T T
0.500000 0.500000 0.460307 T T T
0.500000 0.000000 0.590460 T T T
0.000000 0.500000 0.590460 T T T
0.250000 0.250000 0.525384 T T T
0.750000 0.750000 0.525384 T T T
0.750000 0.250000 0.655537 T T T
0.250000 0.750000 0.655537 T T T
```

### 1.3 `KPOINTS` 的书写方式

#### (1) Monkhorst-Pack 网格
Monkhorst-Pack 网格是一种均匀分布的 k 点网格，常用于周期性晶体的电子结构计算。

```bash
Automatic k-point generation   # 自动生成 k 点的方式（注释）
0                              # 忽略 k 点总数，采用自动生成
Monkhorst-Pack                 # 选择 Monkhorst-Pack 网格
4 4 4                          # k 点网格密度，分别表示 x、y、z 方向的分布
0 0 0                          # 网格偏移，0 表示不偏移
```

**适用场景**：周期性晶体，优化、DOS 计算、电子结构分析等。

#### (2) Gamma 网格
Gamma 网格以 Gamma 点为中心，更适合小体系或非对称晶格。

```bash
Automatic k-point generation   # 自动生成 k 点的方式（注释）
0                              # 忽略 k 点总数，采用自动生成
Gamma                          # 选择 Gamma 点中心网格
4 4 4                          # k 点网格密度，分别表示 x、y、z 方向的分布
0 0 0                          # 网格偏移，0 表示不偏移
```

**适用场景**：小体系、非对称晶格或需要快速计算的优化任务。

### 1.4 `POTCAR` 的使用

`POTCAR` 包含了计算所需的赝势（pseudopotential）信息，用于描述体系中的原子种类及其相关的物理属性。

VASP 提供多种类型的赝势，包括：
- `POT_GGA_PAW`：使用 GGA 泛函的 PAW 赝势。
- `POT_LDA_PAW`：使用 LDA 泛函的 PAW 赝势。

**生成 POTCAR 文件**：根据体系中的原子种类 (比如 Si 和 H)，逐个合并赝势文件：

```bash
cat /POT_GGA_PAW/POTCAR_Si /POT_GGA_PAW/POTCAR_H > POTCAR
```

- `POTCAR` 文件中的泛函类型应与 `INCAR` 文件中设置的泛函一致
- `POTCAR` 文件中原子顺序必须与 `POSCAR` 文件中元素顺序一致

## 2. 输出文件

主要输出文件有：`CONTCAR`  `OSZICAR`  `OUTCAR`  `XDATCAR` `vasprun.xml`

### 2.1 `CONTCAR` 文件

**内容：**
- 优化结束后的晶体结构，记录最新的原子坐标和晶格参数。

**格式：**
- 文件格式与 `POSCAR` 相同，可以直接用作新的 `POSCAR` 文件继续计算。

**用途：**
- 查看最终优化后的晶体结构。
- 用作进一步的计算（如能带、态密度等）。

### 2.2 `OSZICAR` 文件

**内容：** 简要记录 SCF（自洽场）迭代的能量变化。
- 每步 SCF 迭代的能量（`E0`、`dE`）。
- 自洽场（SCF）是否收敛的信息。
- 优化时每一离子步的总能量变化。

**用途：**
- 快速查看 SCF 计算或优化是否成功收敛。
- 判断是否需要调整 `EDIFF` 或优化步骤。

### 2.3 `OUTCAR` 文件

**内容：** 最详细的输出文件，包含优化和计算的全程信息。
- 计算参数：电子弛豫、迭代信息、收敛准则等。
- 优化步骤：每步的能量、力、应力、原子坐标等。
- 总能量：每一步 SCF 的自由能（Free energy）。
- 力和应力：各方向的力（单位 eV/Å）和应力张量。
- 电荷密度信息（如果有相关设置）。

**用途：**
- 用于分析优化过程是否收敛，以及收敛过程中能量和力的变化。

### 2.4 `XDATCAR` 文件

**内容：**
- 优化或分子动力学（MD）过程中的每个离子步的原子坐标。

**用途：**
- 分析原子在优化过程中的移动路径。
- 对结构变化进行轨迹分析。

### 2.5 `vasprun.xml` 文件

以 XML 格式记录的所有计算数据，便于解析和后处理。

**内容：**
- 电子迭代、离子优化过程中的所有参数和结果。
- 能量、力、应力、原子坐标等数据。

**用途：**
- 需要使用工具（如 `pymatgen` 或 `ASE`）提取关键信息。

---

## 3. 优化过程与收敛性判断

### 3.1 优化过程

1. **初始化结构：**
   - 通过 `POSCAR` 文件提供初始结构。
   - 配置优化条件的 `POTCAR`、`KPOINTS` 和 `INCAR` 文件。

2. **逐步优化：**
   - 每一步离子优化后，重新计算体系的总能量、原子受力和晶格应力。
   - 优化会持续到满足收敛准则（如 `EDIFFG`），或达到最大步数 `NSW`。

3. **更新结构：**
   - 每一步优化的中间结果存储在 `XDATCAR` 文件中。
   - 优化完成后的最终结构保存至 `CONTCAR` 文件。

### 3.2 收敛性的判断方法

优化过程是否收敛，可通过以下方式判断：

1. **`OUTCAR` 文件：**
   - 检查每个原子的受力是否小于 |`EDIFFG`|。
   - 总能量变化是否小于 `EDIFF`。

2. **`OSZICAR` 文件：**
   - 查看 SCF 迭代的能量变化（`E0` 和 `dE`）。
   - 判断 SCF 是否稳定收敛。

3. **`CONTCAR` 文件：**
   - 提取最终优化的原子位置和晶格参数。
   - 如果优化未收敛，`CONTCAR` 保存的是最后一步的结构。

4. **借助工具：**
   - 使用 `pymatgen` 或 `ASE` 等工具解析 `vasprun.xml` 文件，判断优化收敛性。

### 3.3 常见问题与解决方法

#### **3.3.1 SCF 不收敛**

**问题：** SCF 迭代过程中能量振荡或发散。

**可能原因：**
- 初始电子密度设置不合理。
- 截断能量（`ENCUT`）不足。

**解决方法：**
- 增大 SCF 最大迭代次数：设置 `NELM=200`。
- 提高截断能量：将 `ENCUT` 提高至 520 eV 或更高。

#### **3.3.2 优化不收敛**

**问题：** 优化迭代达到最大步数（`NSW`），但力或能量未满足收敛准则。

**可能原因：**
- 初始结构远离势能最低点。
- 收敛准则（`EDIFFG`）过于严格。
- 优化步长（`POTIM`）过大。

**解决方法：**
- 提供合理的初始结构，或通过外部工具预优化初始结构。
- 放宽收敛准则：将 `EDIFFG` 从 `-0.01` 调整为 `-0.02`。
- 降低优化步长：将 `POTIM` 从 `0.5` 调整为 `0.2`。

#### **3.3.3 优化过程振荡**

**问题：** 优化过程中能量和力反复波动，难以稳定收敛。

**可能原因：**
- 优化步长（`POTIM`）设置过大。
- 优化算法不适合当前体系。

**解决方法：**
- 减小优化步长：将 `POTIM` 设置为 `0.2` 或更小。
- 更换优化算法：
  - 使用共轭梯度法：设置 `IBRION=2`。
  - 使用阻尼分子动力学法：设置 `IBRION=3`。

#### **3.3.4 优化过程发散**

**问题：** 优化中结构严重变形，能量大幅增加。

**可能原因：**
- 原子间距过小，初始结构设置不合理。
- 真空层不足（适用于低维体系，如薄膜或纳米结构）。
- 错误的赝势文件。

**解决方法：**
- 确保合理的初始原子间距，避免原子间过近。
- 增加真空层：对低维体系，设置真空层厚度至少为 15 Å。
- 检查 `POTCAR` 文件，确保赝势与原子种类匹配。