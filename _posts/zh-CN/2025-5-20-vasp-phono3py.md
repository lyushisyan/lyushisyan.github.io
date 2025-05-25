---
layout: distill
title: VASP + Phono3py 计算热导率
date: 2025-5-20 23:36:10
categories: Calculation
tabs: true
map: true

toc:
  - name: 1. 生成带有位移的超胞的 `POSCAR` 文件
  - name: 2. 运行 VASP 对每个超胞进行力计算
  - name: 3. 收集力计算结果
  - name: 4. 创建 `fc2.hdf` 和 `fc3.hdf`
  - name: 5. 热导率计算

---

VASP 是第一性原理软件。
Phono3py可以通过**三阶力常数**计算**声子-声子相互作用**。从而计算晶格热导率、声子寿命/谱线宽度、自能的虚部（最低阶近似）、联合态密度（JDOS）和加权联合态密度（w-JDOS）。

## 1. 生成带有位移的超胞的 `POSCAR` 文件
以金刚石结构的硅（Si）为例，原胞的 `POSCAR-unitcell` 文件如下

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

基于该原胞，生成带有位移的 2×2×2 超胞用于计算二阶力常数（fc2）和三阶力常数（fc3）

```
phono3py -d --dim 2 2 2 -c POSCAR-unitcell
```

该命令将生成 111 个位移结构，保存在 `phono3py_disp.yaml` 中，并创建 111 个结构文件 `POSCAR-00XXX`（XXX 从 000 到 110）。

如果要在二阶力常数（fc2）计算中使用比三阶力常数（fc3）计算更大的超胞尺寸：

```
phono3py -d --dim-fc2 4 4 4 --dim 2 2 2 -c POSCAR-unitcell
```

在这种情况下，还会创建 `POSCAR_FC2-xxxxx` 文件。

## 2. 运行 VASP 对每个超胞进行力计算

为了计算超胞中原子所受的力，`POSCAR-xxxxx`（以及 `POSCAR_FC2-xxxxx`，如果存在）被用作 VASP 计算。同时还需要为每个位移超胞提供 `KPOINTS`、`POTCAR` 和 `INCAR` 文件。

让每个超胞的力计算都在名为 `disp-xxxxx`（以及 `disp_fc2-xxxxx`）的文件夹下执行，其中 xxxxx 是序号，也就是说，每个 `disp-XXXXX` 文件夹都将包含一组 VASP 输入文件，执行完 VASP 计算后 ，计算结果存在 `disp-XXXXX` 文件夹下的 `vasprun.xml` 文件中。

因此我们写下列脚本来完成这些操作：

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

```bash
#!/bin/bash

P=$(pwd)

for i in $(seq -f "%05g" 1 111); do
    DIR="$P/disp-$i"
    cd "$DIR" || continue
    echo "Running disp-$i..."

    # 清理旧日志
    rm -f OUTCAR vasprun.xml log.vasp

    # 执行 VASP 并捕获退出码
    mpirun -np 16 vasp_std > log.vasp 2>&1
    exit_code=$?

    if [[ $exit_code -ne 0 ]]; then
        echo -e "❌ disp-$i FAILED (exit code $exit_code)"
    elif grep -q "F= " log.vasp; then
        echo -e "✅ disp-$i completed successfully"
    else
        echo -e "⚠️  disp-$i might be incomplete (check log.vasp)"
    fi

    cd "$P"
done
```

## 3. 收集力计算结果

计算 fc3 和 fc2 所需要的力集合（force sets）按如下方式创建：

```bash
phono3py --cf3 disp-{00001..00057}/vasprun.xml
```

此命令将生成：`FORCES_FC3` 

如果使用较大的超胞进行 fc2 计算时，`FORCES_FC2` 通过下列命令创建：

```bash
phono3py --cf2 disp_fc2-{00001..00002}/vasprun.xml
```

## 4. 创建 `fc2.hdf` 和 `fc3.hdf`

```
phono3py --fc-symmetry
```

`--fc-symmetry` 使 `fc3` 和 `fc2` 对称化。
`fc2.hdf5` 和 `fc3.hdf5` 由 `FORCES_FC3`（以及可选的 `FORCES_FC2`）和 `phono3py_disp.yaml` 创建。

此步骤并非必需，但使用 `--fc3` 和 `--fc2` 选项从这些文件中读取力常数时，可以避免每次运行时都计算 `fc2` 和 `fc3`。

## 5. 热导率计算

一个热导率计算的示例命令如下：

```
phono3py --mesh 11 11 11 --br
```

该计算可能会耗费较长时间。`--thm` 选项表示使用**四面体方法**来执行布里渊区积分以计算声子寿命，这是默认方式。
你也可以使用 `--sigma` 选项指定展开宽度（smearing width）作为替代方法。

在上述命令中，程序会对多个网格点上的声子寿命进行串行计算。
由于不同网格点之间的计算彼此独立、无需通信，因此可以将其分开计算。处理步骤如下：

#### 第一步：获取不可约网格点（ir_grid points）

首先运行以下命令，并加上 `--wgp` 选项来生成不可约网格点信息：

```
phono3py --fc3 --fc2 --mesh 11 11 11 --br --wgp
```

该命令将生成 `ir_grid_points.yaml` 文件，其中包含所有 **不可约 q 点** 的信息。你可以使用以下命令查看其网格索引：

```
grep grid_point: ir_grid_points.yaml | awk '{printf("%d ", $3)}'
```

输出可能如下所示：

```
0 1 2 3 4 5 12 13 14 15 16 17 18 19 20 21 24 25 26 27 28 29 30 31 36 37 38 39 40 41 48 49 50 51 60 61 148 149 150 151 160 161 162 163 164 165 172 173 174 175 184 185 297 298 309 310
```

#### 第二步：计算部分不可约网格点上的声子寿命

你可以先计算前 10 个不可约网格点上的声子寿命，并将其存入 `gamma` 文件中，命令如下：

```
phono3py --mesh 11 11 11 --br --write-gamma --gp 0 1 2 3 4 5 12 13 14 15
```



#### 第三步：完成所有网格点计算后，合并结果

当你完成了对所有不可约网格点（如 0, 1, ..., 310）上的声子寿命计算后，使用 `--read-gamma` 选项合并它们：

```
phono3py --fc3 --fc2 --mesh 11 11 11 --br --read-gamma
```

如果该命令顺利运行完毕，之前为每个网格点单独生成的 `.hdf5` 文件就不再需要，可以安全删除。

