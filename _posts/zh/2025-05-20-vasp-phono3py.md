---
layout: post
title: 使用 VASP + Phono3py 计算热导率
lang: zh
translation_key: vasp-phono3py
permalink: /zh/blog/2025/05/20/vasp-phono3py/
date: 2025-05-20 23:36:10
description: 使用 VASP 和 Phono3py 计算晶格热导率的逐步指南，涵盖超胞生成、力计算和 BTE 求解。
tags: tutorial phonon
categories: calculation
related_posts: true
featured: true
toc:
  sidebar: left
---

VASP 是第一性原理模拟软件。
Phono3py 可通过**三阶力常数**计算**声子-声子相互作用**，从而计算晶格热导率、声子寿命/线宽、自能虚部（最低阶近似）、联合态密度（JDOS）和加权 JDOS（w-JDOS）。

## 1. 生成位移超胞（`POSCAR` 文件）

以金刚石结构硅（Si）为例，原胞 `POSCAR-unitcell` 如下：

```
 Si
   1.0
     5.4335600309153529    0.0000000000000000    0.0000000000000000
     0.0000000000000000    5.4335600309153529    0.0000000000000000
     0.0000000000000000    0.0000000000000000    5.4335600309153529
 Si
   8
Direct
   0.8750000000000000 0.8750000000000000 0.8750000000000000
   0.8750000000000000 0.3750000000000000 0.3750000000000000
   0.3750000000000000 0.8750000000000000 0.3750000000000000
   0.3750000000000000 0.3750000000000000 0.8750000000000000
   0.1250000000000000 0.1250000000000000 0.1250000000000000
   0.1250000000000000 0.6250000000000000 0.6250000000000000
   0.6250000000000000 0.1250000000000000 0.6250000000000000
   0.6250000000000000 0.6250000000000000 0.1250000000000000
```

基于该原胞，生成 2×2×2 位移超胞用于计算二阶（fc2）和三阶（fc3）力常数：

```
phono3py -d --dim 2 2 2 -c POSCAR-unitcell
```

这将生成 111 个位移结构，存储在 `phono3py_disp.yaml` 中，并创建 111 个 `POSCAR-00XXX` 文件（XXX 从 000 到 110）。

若 fc2 计算需要比 fc3 更大的超胞：

```
phono3py -d --dim-fc2 4 4 4 --dim 2 2 2 -c POSCAR-unitcell
```

此时还会创建 `POSCAR_FC2-xxxxx` 文件。

## 2. 使用 VASP 计算每个超胞的力

为计算每个位移超胞中的原子力，将 `POSCAR-xxxxx`（以及适用时的 `POSCAR_FC2-xxxxx`）作为 VASP 输入。每个位移超胞还需要 `KPOINTS`、`POTCAR` 和 `INCAR`。

在名为 `disp-xxxxx`（和 `disp_fc2-xxxxx`）的文件夹中运行每个计算，xxxxx 为索引。每个文件夹包含输入文件，结果保存在该文件夹中的 `vasprun.xml` 文件内。

使用以下脚本准备输入文件夹：

```bash
#!/bin/bash

P=$(pwd)

for i in $(seq -f "%05g" 1 111); do
	dir="disp-$i"
	mkdir -p "$dir"
	cd "$dir" || continue
	cp "$P"/INCAR "$P"/KPOINTS "$P"/POTCAR .
	cp "$P"/POSCAR-"$i" POSCAR
	echo "Prepared $dir"
	cd "$P"
done
```

然后运行 VASP 计算：

```bash
#!/bin/bash

P=$(pwd)

for i in $(seq -f "%05g" 1 111); do
    DIR="$P/disp-$i"
    cd "$DIR" || continue
    echo "Running disp-$i..."

    # 清除旧日志
    rm -f OUTCAR vasprun.xml log.vasp

    # 运行 VASP 并捕获退出码
    mpirun -np 16 vasp_std > log.vasp 2>&1
    exit_code=$?

    if [[ $exit_code -ne 0 ]]; then
        echo -e "disp-$i FAILED (exit code $exit_code)"
    elif grep -q "F= " log.vasp; then
        echo -e "disp-$i completed successfully"
    else
        echo -e "disp-$i might be incomplete (check log.vasp)"
    fi

    cd "$P"
done
```

## 3. 收集力计算结果

收集 fc3 和 fc2 的力集：

```bash
phono3py --cf3 disp-{00001..00057}/vasprun.xml
```

这会生成 `FORCES_FC3` 文件。

若 fc2 使用了更大的超胞，则用以下命令收集力：

```bash
phono3py --cf2 disp_fc2-{00001..00002}/vasprun.xml
```

## 4. 创建 `fc2.hdf` 和 `fc3.hdf`

```
phono3py --fc-symmetry
```

`--fc-symmetry` 选项对 fc3 和 fc2 进行对称化。该命令使用 `FORCES_FC3`，可选 `FORCES_FC2` 和 `phono3py_disp.yaml` 生成 `fc2.hdf5` 和 `fc3.hdf5`。

虽然可选，但使用 `--fc3` 和 `--fc2` 标志可直接加载这些文件，无需每次重新计算力常数。

## 5. 热导率计算

计算热导率的典型命令：

```
phono3py --mesh 11 11 11 --br
```

这可能需要很长时间。`--thm` 标志（四面体法）是布里渊区积分的默认方法。也可以使用 `--sigma` 指定展宽宽度。

上述命令串行计算多个 q 点上的声子寿命。由于每个点相互独立，可按网格点并行化：

### 步骤 1：获取不可约网格点

首先生成不可约 q 点信息：

```
phono3py --fc3 --fc2 --mesh 11 11 11 --br --wgp
```

这会创建 `ir_grid_points.yaml`。查看网格点索引：

```
grep grid_point: ir_grid_points.yaml | awk '{printf("%d ", $3)}'
```

示例输出：

```
0 1 2 3 4 5 12 13 14 15 16 17 18 19 20 21 24 25 26 27 28 29 30 31 36 37 38 39 40 41 48 49 50 51 60 61 148 149 150 151 160 161 162 163 164 165 172 173 174 175 184 185 297 298 309 310
```

### 步骤 2：计算部分网格点的声子寿命

计算前 10 个不可约 q 点的声子寿命并存储到 `gamma`：

```
phono3py --mesh 11 11 11 --br --write-gamma --gp 0 1 2 3 4 5 12 13 14 15
```

### 步骤 3：完成后合并 Gamma 文件

所有不可约 q 点（如 0, 1, ..., 310）计算完毕后，使用以下命令合并：

```
phono3py --fc3 --fc2 --mesh 11 11 11 --br --read-gamma
```

如果成功，可安全删除每个 q 点的单独 `.hdf5` 文件。
