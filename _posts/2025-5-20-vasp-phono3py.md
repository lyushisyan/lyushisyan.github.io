---
layout: post
title: Thermal Conductivity Calculation using VASP + Phono3py
date: 2025-05-20 23:36:10
description: A step-by-step guide to calculating lattice thermal conductivity using VASP and Phono3py, covering supercell generation, force calculations, and BTE solutions.
tags: vasp phono3py thermal-conductivity phonon
categories: calculation
related_posts: true
toc:
  sidebar: left
---

VASP is a first-principles simulation software.
Phono3py can calculate **phonon-phonon interactions** through **third-order force constants**. This allows the computation of lattice thermal conductivity, phonon lifetimes/linewidths, the imaginary part of self-energy (lowest-order approximation), joint density of states (JDOS), and weighted JDOS (w-JDOS).

## 1. Generate Displaced Supercells (`POSCAR` files)

Taking diamond-structured silicon (Si) as an example, the primitive cell `POSCAR-unitcell` looks like:

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

Based on this unit cell, generate 2×2×2 supercells with displacements for calculating second-order (fc2) and third-order (fc3) force constants:

```
phono3py -d --dim 2 2 2 -c POSCAR-unitcell
```

This generates 111 displaced structures, stored in `phono3py_disp.yaml`, and creates 111 `POSCAR-00XXX` files (XXX from 000 to 110).

To use a larger supercell for fc2 calculation than for fc3:

```
phono3py -d --dim-fc2 4 4 4 --dim 2 2 2 -c POSCAR-unitcell
```

In this case, `POSCAR_FC2-xxxxx` files will also be created.

## 2. Run VASP to Calculate Forces for Each Supercell

To compute the atomic forces in each displaced supercell, use the `POSCAR-xxxxx` (and `POSCAR_FC2-xxxxx` if applicable) as inputs to VASP. Each displacement supercell also requires `KPOINTS`, `POTCAR`, and `INCAR`.

Run each calculation in folders named `disp-xxxxx` (and `disp_fc2-xxxxx`), where xxxxx is the index. Each folder contains the input files, and the results will be saved in the `vasprun.xml` file inside that folder.

Use the following script to prepare input folders:

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

Then run the VASP calculations:

```bash
#!/bin/bash

P=$(pwd)

for i in $(seq -f "%05g" 1 111); do
    DIR="$P/disp-$i"
    cd "$DIR" || continue
    echo "Running disp-$i..."

    # Clean old logs
    rm -f OUTCAR vasprun.xml log.vasp

    # Run VASP and capture exit code
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

## 3. Collect Force Calculation Results

To collect the force sets for fc3 and fc2, use:

```bash
phono3py --cf3 disp-{00001..00057}/vasprun.xml
```

This generates the `FORCES_FC3` file.

If larger supercells are used for fc2, collect forces with:

```bash
phono3py --cf2 disp_fc2-{00001..00002}/vasprun.xml
```

## 4. Create `fc2.hdf` and `fc3.hdf`

```
phono3py --fc-symmetry
```

The `--fc-symmetry` option symmetrizes fc3 and fc2. This command uses `FORCES_FC3`, optionally `FORCES_FC2`, and `phono3py_disp.yaml` to generate `fc2.hdf5` and `fc3.hdf5`.

Although optional, using the `--fc3` and `--fc2` flags allows loading these files directly without recalculating force constants each time.

## 5. Thermal Conductivity Calculation

A typical command for computing thermal conductivity:

```
phono3py --mesh 11 11 11 --br
```

This may take a long time. The `--thm` flag (tetrahedron method) is the default for Brillouin zone integration. You can alternatively use `--sigma` to specify a smearing width.

The above command computes phonon lifetimes serially over multiple q-points. Since each point is independent, you can parallelize across grid points:

### Step 1: Get Irreducible Grid Points

First, generate irreducible q-point info with:

```
phono3py --fc3 --fc2 --mesh 11 11 11 --br --wgp
```

This creates `ir_grid_points.yaml`. View the grid point indices with:

```
grep grid_point: ir_grid_points.yaml | awk '{printf("%d ", $3)}'
```

Example output:

```
0 1 2 3 4 5 12 13 14 15 16 17 18 19 20 21 24 25 26 27 28 29 30 31 36 37 38 39 40 41 48 49 50 51 60 61 148 149 150 151 160 161 162 163 164 165 172 173 174 175 184 185 297 298 309 310
```

### Step 2: Compute Phonon Lifetimes for Subset of Grid Points

Calculate phonon lifetimes at the first 10 irreducible q-points and store in `gamma`:

```
phono3py --mesh 11 11 11 --br --write-gamma --gp 0 1 2 3 4 5 12 13 14 15
```

### Step 3: Merge Gamma Files After Completion

Once all irreducible q-points (e.g., 0, 1, ..., 310) are computed, merge them using:

```
phono3py --fc3 --fc2 --mesh 11 11 11 --br --read-gamma
```

If successful, the individual `.hdf5` files for each q-point can be safely deleted.
