---
layout: post
title: "NEP-kappa v1.1 使用指南：从 YAML 配置到晶格热导率"
lang: zh
translation_key: nep-kappa-v1-1-guide
permalink: /zh/blog/2026/07/06/nep-kappa-v1-1-guide/
date: 2026-07-06 12:00:00
last_updated: 2026-07-06
reading_time: "14 min"
description: "NEP-kappa v1.1 入门教程：安装命令行工具、编写 YAML 配置，并分阶段完成结构弛豫、力常数、热导率和绘图计算。"
tags: NEP-kappa tutorial phonon thermal-transport
categories: calculation
related_posts: true
featured: true
toc:
  sidebar: left
---

从 v1.1 开始，NEP-kappa 不再只是一个由参数文本驱动的计算脚本，而是一个具有统一命令行入口和 YAML 配置文件的晶格热输运工作流。结构弛豫、力常数生成、热导率计算与结果绘图既可以依次执行，也可以通过一条命令串联起来。

这一变化看似只是把

```bash
python nepkappa.py input.txt
```

换成了

```bash
nepkappa run input.yaml
```

实际带来的好处是更清晰的参数组织、更容易复现的计算流程，以及更明确的阶段依赖。本文从安装开始，介绍如何跑通第一个 bulk Si 示例，并说明体材料、薄膜和纳米线计算中最容易混淆的设置。

- v1.1 代码：[GitHub release v1.1.0](https://github.com/lyushisyan/NEP-kappa/releases/tag/v1.1.0)
- 项目文档：[NEP-kappa documentation](https://nep-kappa.readthedocs.io)

## v1.1 改变了什么？

新版统一使用 `nepkappa` 命令，并提供七个主要入口：

```text
info      检查并显示最终采用的配置
relax     弛豫输入结构
fc        生成二阶和三阶力常数
kappa     求解晶格热导率
plot      处理数据并绘图
run       依次运行 relax、fc 和 kappa
compare   对比 DFT 与 NEP 结果
```

力计算后端可以选择 NEP 或 VASP；力常数既可以使用有限位移法，也可以通过 HiPhive 拟合。这使同一个工作流能够覆盖快速势函数计算、DFT 参考计算以及两者之间的系统对比。

## 安装与环境检查

建议在独立的 Conda 环境中安装，以免与已有的声子计算环境冲突：

```bash
conda create -n nepkappa-env python=3.10 -y
conda activate nepkappa-env

git clone https://github.com/lyushisyan/NEP-kappa.git
cd NEP-kappa
python -m pip install -e .
```

`-e` 表示 editable 安装；修改本地源码后不必再次安装。完成后检查命令、版本和 `phono3py`：

```bash
nepkappa --help
nepkappa --version
python -c "import phono3py; print(phono3py.__version__)"
```

NEP-kappa v1.1 适配 `phono3py>=4.0.1`。若环境中仍是旧版本，可以更新后重新执行 editable 安装：

```bash
python -m pip install --upgrade phono3py
python -m pip install --upgrade -e .
```

## 先跑通最小示例

第一次使用时，最稳妥的起点是仓库自带的 bulk Si 示例。先用 `info` 验证 YAML，而不真正启动计算：

```bash
nepkappa info examples/1-bulk-nep-rta.yaml
```

它会读取配置、检查必填项，并显示程序最终采用的参数。确认无误后运行：

```bash
nepkappa run examples/1-bulk-nep-rta.yaml
nepkappa plot examples/1-bulk-nep-rta.yaml
```

其中 `run` 会依次完成结构弛豫、力常数生成和热导率计算；绘图单独执行，方便在不重复昂贵计算的情况下调整图像。初次上手时，建议先原样跑通这个例子，再逐步替换结构、NEP 势、超胞、q 点网格和温度范围。

## 一份典型的 YAML 配置

下面是一份使用 NEP 后端和有限位移法计算体材料热导率的基本配置：

```yaml
structure:
  poscar: examples/POSCAR_bulk
  dimensionality: 3

calculator:
  name: nep
  nep_model: potentials/Si_Bulk_Fan.txt

relaxation:
  enabled: true

force-constant:
  dim-fc2: [3, 3, 3]
  dim-fc3: [3, 3, 3]
  use_hiphive: false

kappa:
  mesh: [21, 21, 21]
  temps: [100, 1000, 50]
  method: rta
  isotope: false
  bfmp: 1.0e6
  wigner: false

plot:
  layout: both
  path: seekpath
  tau: total
  kappa: all
  temperature: 300
  dpi: 300

output:
  progress: true
  result_dir: results/1-bulk-nep-rta
```

配置被分成几个职责明确的模块：`structure` 描述几何与维度，`calculator` 决定如何求力，`relaxation` 和 `force-constant` 控制前处理，`kappa` 设置输运求解，`plot` 只管理后处理，而 `output` 指定结果目录。

## 力计算与力常数路线

使用 NEP 势时只需指定模型：

```yaml
calculator:
  name: nep
  nep_model: potentials/Si_Bulk_Fan.txt
```

若使用 VASP，则需要给出服务器上真实可用的运行命令和赝势路径：

```yaml
calculator:
  name: vasp
  vasp_command: mpirun -np 24 /path/to/vasp_std
  vasp_path: /path/to/vasp_std
  potcar_path: /path/to/potpaw_PBE.64
```

当 `vasp_command` 与 `vasp_path` 同时存在时，程序优先使用前者。示例路径不能直接照搬，尤其是 `POTCAR` 库位置和 MPI 启动方式。

有限位移法由 `use_hiphive: false` 启用，核心参数是二阶、三阶力常数超胞：

```yaml
force-constant:
  dim-fc2: [3, 3, 3]
  dim-fc3: [3, 3, 3]
  use_hiphive: false
```

较大体系也可以采用 HiPhive 拟合：

```yaml
force-constant:
  dim-fc2: [4, 4, 1]
  dim-fc3: [4, 4, 1]
  use_hiphive: true
  n_structures: 500
  rattle_std: 0.03
  min_dist: 2.2
  cutoffs: [5.0, 4.0]
```

这里分别控制随机扰动结构数量、位移标准差、允许的最小原子间距和拟合截断半径。它们并非通用常数，需要针对具体体系测试。拟合成功后，结果目录除 `fc2.hdf5` 和 `fc3.hdf5` 外还会保存 `hiphive_model.fcp`。

## 热导率参数如何理解

`mesh` 是 phono3py 使用的 q 点网格。更密的网格通常更可靠，也更昂贵，因此正式结果必须检查 mesh 收敛性。

`temps` 只接受一种温度或一个等间隔范围：

```yaml
temps: [300]            # 仅计算 300 K
temps: [100, 1000, 50]  # 100–1000 K，步长 50 K
```

不要写两个值，也不要直接列出四个以上的离散温度。`method: rta` 计算较快，适合测试和常规分析；`method: lbte` 求解完整线性化 BTE，成本更高。`isotope` 控制同位素散射，`bfmp` 是以微米为单位的边界平均自由程，`wigner` 则控制是否启用 Wigner transport。

如果已有 `phono3py_disp.yaml`、`fc2.hdf5` 和 `fc3.hdf5`，只想更换 mesh、温度或散射选项，无需重新生成力常数：

```bash
nepkappa kappa input.yaml
```

## 薄膜与纳米线的有效体积

低维结构包含真空层，直接用整个模拟盒子的体积归一化会“稀释”热导率和体积热容。薄膜需要给出有效厚度与真空方向：

```yaml
structure:
  poscar: examples/POSCAR_film
  dimensionality: 2
  effective_thickness: 10.0
  vacuum_axis: z

force-constant:
  dim-fc2: [4, 4, 1]
  dim-fc3: [4, 4, 1]

kappa:
  mesh: [21, 21, 1]
```

`effective_thickness` 的单位是 Å。纳米线则需要有效横截面积和周期方向：

```yaml
structure:
  poscar: path/to/POSCAR_wire
  dimensionality: 1
  effective_area: 100.0
  periodic_axis: z
```

`effective_area` 的单位是 Å²。这些有效体积修正仅作用于 `plot` 和 `compare` 生成的数据与图，不会改写 phono3py 原始的 `kappa-m*.hdf5` 文件。有效厚度或面积应来自实际结构定义，而不是为匹配目标热导率而调整。

## 分阶段运行与依赖关系

完整流程可以显式写成：

```bash
nepkappa info input.yaml
nepkappa relax input.yaml
nepkappa fc input.yaml
nepkappa kappa input.yaml
nepkappa plot input.yaml
```

当 `relaxation.enabled: true` 时，单独执行 `fc` 会读取结果目录中的 `POSCAR_relaxed`，所以必须先完成 `relax`。如果不想手动处理依赖，直接使用 `nepkappa run input.yaml` 更安全。

分阶段运行的价值在于避免重复计算：已有力常数时可单独重算 `kappa`；已有 HDF5 结果时，可以修改绘图温度、分量、布局或 DPI 后只执行 `plot`。

## 输出文件与 DFT–NEP 对比

一次完整计算通常生成：

```text
run.log
POSCAR_relaxed
phono3py_disp.yaml
fc2.hdf5
fc3.hdf5
kappa-m*.hdf5
plots/
```

`kappa-m*.hdf5` 是 phono3py 的核心输运结果；文件名通常反映 q 点网格。`plots/` 包含色散、态密度、体积热容、群速度、弛豫时间、热导率和组合图。`run.log` 保存解析后的配置、终端输出与阶段耗时。

要验证 NEP 是否合理复现 DFT 的声子和输运性质，可以准备独立的 `compare.yaml`：

```yaml
reference:
  dft_dir: results/dft
  label: DFT

candidate:
  nep_dir: results/nep
  label: NEP

compare:
  compare_dir: comparison

plot:
  layout: both
  path: seekpath
  tau: total
  temperature: 300
  kappa: all
  dpi: 300
```

然后运行：

```bash
nepkappa compare examples/compare.yaml
```

两个结果目录都应包含 `phono3py_disp.yaml`、`fc2.hdf5` 和 `kappa-m*.hdf5`。对比图与日志分别写入 `compare_dir/plots` 和 `compare_dir/compare.log`。低维结构还需要在对比配置中提供一致的有效厚度或横截面积。

## 常见问题与实用建议

如果找不到 `nepkappa`，先确认环境和安装位置：

```bash
conda activate nepkappa-env
python -m pip install -e .
which nepkappa
```

如果 phono3py 报错，先检查版本，再运行 `nepkappa info input.yaml` 区分依赖问题与配置问题。VASP 任务失败时，优先确认 `vasp_command`、可执行文件和 `potcar_path`，因为示例中的服务器路径只是占位符。

测试流程时可以暂时使用较小的超胞和较粗的网格：

```yaml
force-constant:
  dim-fc2: [2, 2, 2]
  dim-fc3: [2, 2, 2]

kappa:
  mesh: [11, 11, 11]
```

但“能够运行”不等于“结果收敛”。正式计算至少要分别检查力常数超胞和 q 点网格，并为每项任务设置独立的 `result_dir`，避免覆盖已有结果。

## 小结

NEP-kappa v1.1 把结构、力、力常数、BTE 求解和结果分析组织成了可检查、可拆分、可重复的命令行工作流。最推荐的新手路径很简单：

```bash
nepkappa info examples/1-bulk-nep-rta.yaml
nepkappa run examples/1-bulk-nep-rta.yaml
nepkappa plot examples/1-bulk-nep-rta.yaml
```

先让官方示例完整通过，再一次只修改一类参数，并为超胞与 q 点网格做收敛性测试。这样，YAML 不只是输入格式的变化，而会成为整个计算过程可复现性的中心。

## 引用

如果在研究中使用 NEP-kappa，请引用：

F. Yin et al., “Accelerated phonon transport calculations for nanostructures: Combining neuroevolution potentials and compressed sensing,” *Journal of Applied Physics* **139**, 135103 (2026).

如果使用项目提供的硅纳米线 NEP 势函数，也建议引用：

K. Xu et al., “Critical Size Transitions in Silicon Nanowires: Amorphization, Phonon Hydrodynamics, and Thermal Conductivity,” *The Journal of Physical Chemistry Letters* **16**, 8580–8587 (2025).
