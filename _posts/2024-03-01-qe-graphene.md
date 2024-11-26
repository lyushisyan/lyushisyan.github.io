---
layout: post
title: Phonon dispersion calculation for Graphene using QE
date: 2024-05-01 00:32:13
description: This method is based on Density Functional Perturbation Theory.
tags: DFT code
categories: study
tabs: true
---

In **Quantum Espresso**, phonon dispersion is computed using the `ph.x` program, which is based on **Density Functional Perturbation Theory**.

#### (1) Perform SCF calculation to obtain the self-consistent electronic ground state energy using `pw.x`.

- **SCF input file (`scf.graphene.in`)**

```bash
&control
  calculation = 'scf'
  restart_mode = 'from_scratch'
  pseudo_dir = './pseudos/'
  outdir = './out/'
  prefix = 'graphene'
/
&system
  ibrav = 4
  celldm(1) = 4.654
  celldm(3) = 6.0
  nat = 2
  ntyp = 1
  ecutwfc = 60.0
  ecutrho = 600.0
  assume_isolated = '2D'
/
&electrons
  conv_thr = 1.0e-8
/
ATOMIC_SPECIES
  C 12.0107 C.pbe-n-kjpaw_psl.1.0.0.UPF
ATOMIC_POSITIONS alat
  C 0.00000 0.00000 0.00000
  C 0.00000 0.57735 0.00000
K_POINTS {automatic}
  8 8 1 0 0 0
```

- **Execute SCF calculation**

```bash
mpirun -np 4 pw.x -i scf.grap.in > scf.grap.out
```

#### (2) Compute the dynamical matrix on a uniform grid of q-points using `ph.x`.

- **Input file (`ph.graphene.in`)**

```bash
&INPUTPH
  tr2_ph = 1.0d-15
  amass(1) = 12.0107
  ldisp = .true.
  nq1 = 6
  nq2 = 6
  nq3 = 1
  outdir = './out/'
  prefix = 'graphene'
  fildyn = 'graphene.dyn'
/
```

- **Perform the computation**

```bash
mpirun -np 4 ph.x -i ph.graphene.in > ph.graphene.out
```

- **Output files**

`graphene.dyn0` contains coordinates of the q-point grid.

`graphene.dyn1-N` contains the force constants in $\boldsymbol q$-space.

#### (3) Perform inverse Fourier transform of the dynamical matrix to obtain the real-space force constants using `q2r.x`.

- **Input file (`q2r.graphene.in`)**

```bash
&INPUT
  fildyn = 'graphene.dyn'
  zasr = 'simple'
  flfrc = 'graphene661.fc'
/
```

- **Execute the calculation**

```bash
mpirun -np 4 q2r.x -i q2r.graphene.in > q2r.graphene.out
```

- **Output file**

`Si661.fc` contains the interatomic force constants in real space for a 6*6*1 supercell.

#### (4) Perform Fourier transform of the real-space components using `matdyn.x` to obtain the dynamical matrix at any q-point.

- **Input file (`matdyn.graphene.in`)**

```bash
&INPUT
  asr = 'simple'
  flfrc = 'graphene661.fc'
  flfrq = 'graphene.freq'
  q_in_band_form = .true.
  loto_2d = .true.
/
4
0.00000000 0.00000000 0.0   80
0.00000000 0.57735027 0.0   40
0.33333333 0.577

35027 0.0   60
0.00000000 0.00000000 0.0   1
```

- **Execute the calculation**

```bash
mpirun -np 4 matdyn.x -i matdyn.graphene.in > matdyn.graphene.out
```

Then, visualize the results using the generated `graphene.freq.gp` file.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/disp_grap.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
