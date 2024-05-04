---
layout: post
title: a post with typograms
date: 2024-04-29 23:36:10
description: this is what included typograms code could look like
tags: formatting diagrams
categories: sample-posts
typograms: true
---

**Phono3py** is a software for calculating phonon-phonon interactions and related properties using supercell methods.

#### 1. Read the `input.in` file and create a supercell

```visual-basic
phono3py --qe -d --dim="4 4 1" -c graphene.in
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4fbb40-5534-4655-a1f2-a4f143834851/8cb20b73-4152-4248-98b8-7faa958e7ac4/Untitled.png)

The `**supercell-xxx.in**` file obtained here only contains the lattice structure of the supercell, which needs to be combined with the `**header.in**` file in the next step to form a new input file.

#### 2. Use QE to perform self-consistent field (SCF) calculations

运行下列 `**pwrun.sh**` 文件，对不同位移下的所有超胞 `**graphene-xxx.in**` 文件进行 scf 计算

```visual-basic
#！/bin/bash

for i in {00001..00170};
do
	cat header.in supercell-$i.in > input/graphene-$i.in;
	mpirun -np 4 pw.x input/graphene-$i.in > output/graphene-$i.out
done
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4fbb40-5534-4655-a1f2-a4f143834851/624b0521-1755-41e9-a7bd-8ad42bc277ce/Untitled.png)

#### 3. Use **phono3py** to collect forces on atoms in **QE** calculation results 'FORCE_FC3'

```visual-basic
phono3py --qe --cf3 output/graphene-{00001..00170}.out
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4fbb40-5534-4655-a1f2-a4f143834851/fdddd9af-d83a-4773-8f5e-f7129bcc5b64/Untitled.png)

#### 4. Calculate third-order and second-order force constants

```visual-basic
phono3py --sym-fc
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4fbb40-5534-4655-a1f2-a4f143834851/5a8b378c-6e6c-47d2-87af-980f493d2bc9/Untitled.png)

#### 5. Calculate lattice thermal conductivity

```visual-basic
phono3py --mesh="11 11 1" --fc3 --fc2 --br
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/cf4fbb40-5534-4655-a1f2-a4f143834851/84f9d768-e766-4902-8a0a-f3af75f9b86e/Untitled.png)

```python
In [1]: import h5py
In [2]: f = h5py.File("kappa-m111111.hdf5")
In [3]: list(f)
Out[3]:
['frequency',
'gamma',
'group_velocity',
'gv_by_gv',
'heat_capacity',
'kappa',
'kappa_unit_conversion',
'mesh',
'mode_kappa',
'qpoint',
'temperature',
'weight']
```
