---
layout: post
title: VASP Structure Optimization
date: 2024-12-01 23:36:10
description: A comprehensive guide to structure optimization using VASP, covering input parameters, file formats, output analysis, and convergence strategies.
tags: vasp dft structure-optimization calculation
categories: calculation
related_posts: true
toc:
  sidebar: left
---

## 1. Input Files
The input files for VASP are the four basic files: `INCAR`, `POSCAR`, `POTCAR`, `KPOINTS`.

### 1.1 `INCAR` Parameter Settings

```bash
System = Si-film    # System name, can be freely defined to identify the current calculation system.

# Job Control
ISTART = 0          # Initial state setup:
                    # 0 Start calculation from scratch.
                    # 1 Read initial wavefunctions from WAVECAR file.
                    # 2 Read wavefunctions and charge density from WAVECAR and CHGCAR files.
ISPIN = 1           # Spin polarization options:
                    # 1 Non-spin-polarized (for non-magnetic materials).
                    # 2 Spin-polarized (for magnetic materials).
ICHARGE = 2         # Initial charge density selection:
                    # 2 Start from static charge density provided by POTCAR.
                    # 1 Generate charge density from scratch.
LWAVE = .FALSE.     # Output WAVECAR file:
                    # .TRUE. Output (store wavefunction data).
                    # .FALSE. Do not output (save disk space).
LCHARG = .FALSE.    # Output CHGCAR file:
                    # .TRUE. Output (store static charge density).
                    # .FALSE. Do not output (save disk space).
ISYM = 0            # Symmetry settings:
                    # 0 Disable symmetry (for systems with defects or asymmetric structures).
                    # 1 or 2 Preserve symmetry operations.

# Electronic Relaxation
ENCUT = 500         # Plane-wave cutoff energy (eV), determines calculation precision and efficiency.
ISMEAR = 0          # Smearing method:
                    # -5 (tetrahedron method for metals), 0 (Gaussian smearing for semiconductors), 1 or 2 (Fermi smearing).
SIGMA = 0.05        # Smearing width (eV), recommended values: 0.01 ~ 0.1.
EDIFF = 1E-08       # SCF convergence criterion: stops if energy change between iterations is less than 1E-08 eV.
NELMIN = 6          # Minimum number of electronic iterations to ensure basic convergence.
NELM = 300          # Maximum number of electronic iterations to avoid iteration loops.
GGA = PE            # Functional choice, using PBE (Perdew-Burke-Ernzerhof) exchange-correlation functional.
LREAL = .FALSE.     # Reciprocal space calculations, increases precision but adds computational cost.
ADDGRID = .TRUE.    # Enable additional FFT grid for improved numerical accuracy.
ALGO = N            # Electronic relaxation algorithm:
                    # Normal (standard mode), Fast, or VeryFast (accelerated modes).
PREC = Accurate     # Precision settings:
                    # Accurate (high precision), Normal, or Low (for initial tests).

# Ionic Relaxation
ISIF = 2            # Lattice optimization options:
                    # 2 Optimize atomic positions only, keep lattice parameters fixed.
                    # 3 Optimize both atomic positions and lattice shape.
EDIFFG = -0.01      # Ionic convergence criterion:
                    # Negative values based on force (eV/\u00c5).
                    # Positive values based on energy.
IBRION = 2          # Ionic relaxation algorithm:
                    # 2 Conjugate gradient algorithm (suitable for most optimization tasks).
POTIM = 0.5         # Time step, controls optimization speed.
NSW = 200           # Maximum number of ionic steps.

# Parallel Control
NPAR = 4            # FFT grid parallelization dimension (recommended: sqrt(total cores)).
KPAR = 2            # Number of parallel k-points (total cores should be divisible by NPAR \u00d7 KPAR \u00d7 NCORE).
NCORE = 12          # Number of cores per task.
```

For structural optimization, key parameters in `INCAR` include `IBRION`, `ISIF`, `NSW`, `EDIFF`, and `EDIFFG`.

#### 1.1.1 Common `IBRION` Settings and Applications

##### (1) Single-Point Energy Calculation
- **`IBRION = -1`**  
**Usage**: Used for single-point energy calculations such as fixed lattice, electronic structure, or DOS analysis.  
**Note**: Avoid setting `NSW > 0` to prevent wasting resources.

##### (2) Structure Optimization
- **`IBRION = 1`** (RMM-DIIS)  
**Usage**: Suitable for smooth potential energy surfaces in simple systems.  
**Limitation**: May encounter convergence issues for complex or unstable surfaces.

- **`IBRION = 2`** (Conjugate Gradient)  
**Usage**: Most commonly used method, suitable for most systems.  
**Advantage**: Performs well for steep and complex surfaces.

- **`IBRION = 3`** (Damped Molecular Dynamics)  
**Usage**: Stabilizes optimization paths that oscillate or diverge.

##### (3) Molecular Dynamics
- **`IBRION = 0`**  
**Usage**: For studying dynamic behavior of systems at different temperatures, such as diffusion or vibrational modes.

##### (4) Phonon Calculations

a. **Finite Difference Method** **`IBRION = 5, 6`**  
Calculates phonon modes using finite difference:
- **`5`**: Without symmetry, suitable for defective or low-symmetry structures.
- **`6`**: Exploits symmetry for efficient calculations in high-symmetry systems.

b. **Perturbation Theory (DFPT)** **`IBRION = 7, 8`**  
Calculates phonon modes using density functional perturbation theory (DFPT):
- **`7`**: Without symmetry optimization, suitable for low-symmetry structures.
- **`8`**: Utilizes symmetry for faster computation.

#### 1.1.2 Common `ISIF` Settings and Applications

- Default value (if not set): `ISIF = 2` (Optimize atomic positions only, keep lattice shape and volume fixed).

- Special Cases:
  - `IBRION = 0` (molecular dynamics) or `LHFCALC = .TRUE.` (hybrid functional): `ISIF = 0`.

- **`ISIF = 2` (Most Common)**  
Optimizes atomic positions only, suitable for 2D materials, fixed lattice constants, or surface/interface systems.

- **`ISIF = 3` (Bulk Optimization)**  
Optimizes atomic positions, lattice shape, and volume, suitable for bulk material relaxations.

- **`ISIF = 4` (Fixed Volume Optimization)**  
Optimizes atomic positions and lattice shape while keeping the volume fixed, useful for pressure tests.

- **`ISIF = 6` (Lattice-Only Optimization)**  
Optimizes lattice shape and volume without relaxing atomic positions, useful for testing lattice parameters.

- **`ISIF = 0` (Position Optimization, No Stress Calculation)**  
Optimizes atomic positions without calculating stress, for fixed cell optimizations.

#### 1.1.3 Recommended Settings for `NSW`, `EDIFF`, and `EDIFFG`

| Parameter | Function                       | Initial Optimization | High-Precision Optimization | Single Point |
|-----------|--------------------------------|-----------------------|-----------------------------|--------------|
| `NSW`     | Max ionic steps                | 100-200               | 200-500                     | 0            |
| `EDIFF`   | SCF convergence (eV)          | 1e-05                 | 1e-08                       | 1e-06        |
| `EDIFFG`  | Ionic convergence (eV/\u00c5)      | -0.1                  | -0.01                       | Not required |

### 1.2 Example `POSCAR`

Below is an example `POSCAR` file describing the structure of bulk silicon:

```bash
Si-bulk   # System name, customizable
1.0       # Global scaling factor (can be used to scale the lattice)
   5.430    0.000    0.000  # Lattice vector a
   0.000    5.430    0.000  # Lattice vector b
   0.000    0.000    5.430  # Lattice vector c
Si           # Atom types
2            # Number of atoms for each type
Direct       # Coordinate type (Direct: fractional; Cartesian: cartesian)
  0.000  0.000  0.000  # Coordinates for atom 1
  0.250  0.250  0.250  # Coordinates for atom 2
```

Example POSCAR File for Silicon Thin Film (Si-film):

```bash
Si Thin Film                            
   1.00000000000000     
     5.4299999999999997    0.0000000000000000    0.0000000000000000
     0.0000000000000000    5.4299999999999997    0.0000000000000000
     0.0000000000000000    0.0000000000000000   20.8599999999999994
   Si
    16
Selective dynamics  # Enable Selective Dynamics
Direct
0.000000 0.000000 0.200000 F F F  # Fixed in all three directions
0.500000 0.500000 0.200000 T T F  # Fixed in z-direction, free in x and y
0.500000 0.000000 0.330153 T T T  # Free in all directions
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

### 1.3 KPOINTS File

#### (1) Monkhorst-Pack Grid
Monkhorst-Pack grids provide a uniform k-point distribution for periodic crystal calculations.

```bash
Automatic k-point generation   # Automatic k-point generation method (comment)
0                              # Ignore total k-point count, use automatic generation
Monkhorst-Pack                 # Choose Monkhorst-Pack grid
4 4 4                          # Grid density in x, y, z directions
0 0 0                          # No grid shift
```

**Use Case:** Periodic crystals, optimization, DOS calculations, and electronic structure analysis.

#### (2) Gamma Grid
Gamma grids center the k-point grid at the Gamma point, suitable for small or asymmetric lattices.

```bash
Automatic k-point generation   # Automatic k-point generation method (comment)
0                              # Ignore total k-point count, use automatic generation
Gamma                          # Choose Gamma-centered grid
4 4 4                          # Grid density in x, y, z directions
0 0 0                          # No grid shift
```

**Use Case:** Small systems, asymmetric lattices, or fast calculation optimization tasks.

### 1.4 POTCAR File Usage

POTCAR contains pseudopotential information required to describe atomic properties in the system.

#### VASP Provides Multiple Types of Pseudopotentials:
- **POT_GGA_PAW:** PAW pseudopotentials with GGA functional.
- **POT_LDA_PAW:** PAW pseudopotentials with LDA functional.

#### Generating the POTCAR File:
For a system with atoms like Si and H, concatenate the pseudopotential files:

```bash
cat /POT_GGA_PAW/POTCAR_Si /POT_GGA_PAW/POTCAR_H > POTCAR
```

- Ensure the functional type in POTCAR matches the INCAR settings.
- Maintain the atom order in POTCAR consistent with the element order in POSCAR.

## 2. Output Files

### 2.1 CONTCAR File

**Content:** Optimized crystal structure, including updated atomic coordinates and lattice parameters.
**Format:** Same as POSCAR, can directly serve as input for further calculations.
**Use Case:**
- Review the final optimized crystal structure.
- Use for further calculations (e.g., band structure, DOS).

### 2.2 OSZICAR File

**Content:**
- Brief record of SCF (Self-Consistent Field) iteration energy changes.
- Energy (E0, dE) for each SCF step.
- Convergence information for SCF.
- Total energy changes per ion step during optimization.

**Use Case:**
- Quickly check SCF calculation or optimization convergence.
- Decide if adjustments to EDIFF or optimization steps are necessary.

### 2.3 OUTCAR File

**Content:**
- Most detailed output file with complete calculation history.
- Includes parameters like electronic relaxation, iteration info, convergence criteria, etc.
- Energy, force, stress, atomic coordinates for each optimization step.
- Charge density info (if applicable).

**Use Case:**
- Analyze convergence details and energy/force variations during optimization.

### 2.4 XDATCAR File

**Content:**
- Atomic coordinates for each ionic step during optimization or molecular dynamics (MD).

**Use Case:**
- Analyze atomic movement paths during optimization.
- Perform trajectory analysis for structural changes.

### 2.5 vasprun.xml File

**Content:** XML-formatted record of all calculation data, suitable for parsing and post-processing.
- Includes electronic iteration, ionic optimization parameters, and results.
- Data for energy, force, stress, atomic coordinates, etc.

**Use Case:**
- Extract key information using tools like pymatgen or ASE.

## 3. Optimization Process and Convergence Criteria

### 3.1 Optimization Process

1. **Initialization of the Structure:**
   - The initial structure is provided through the `POSCAR` file.
   - The optimization conditions are configured using the `POTCAR`, `KPOINTS`, and `INCAR` files.

2. **Stepwise Optimization:**
   - After each ionic optimization step, the total energy, atomic forces, and lattice stress of the system are recalculated.
   - The optimization continues until convergence criteria (e.g., `EDIFFG`) are satisfied or the maximum number of steps (`NSW`) is reached.

3. **Structure Updates:**
   - Intermediate results of each optimization step are stored in the `XDATCAR` file.
   - The final structure after optimization is saved in the `CONTCAR` file.

### 3.2 Convergence Criteria

The convergence of the optimization process can be determined using the following methods:

1. **`OUTCAR` File:**
   - Check whether the force on each atom is less than |`EDIFFG`|.
   - Verify whether the total energy change is less than `EDIFF`.

2. **`OSZICAR` File:**
   - Review the energy changes (`E0` and `dE`) during the SCF iterations.
   - Determine whether the SCF process has stabilized and converged.

3. **`CONTCAR` File:**
   - Extract the final optimized atomic positions and lattice parameters.
   - If the optimization has not converged, the `CONTCAR` file contains the structure from the last step.

4. **Using Tools:**
   - Use tools like `pymatgen` or `ASE` to parse the `vasprun.xml` file and evaluate convergence.

### 3.3 Common Issues and Solutions

#### **3.3.1 SCF Not Converging**

**Issue:** SCF iterations show energy oscillations or divergence.

**Possible Causes:**
- The initial electronic density is poorly set.
- Insufficient cutoff energy (`ENCUT`).

**Solutions:**
- Increase the maximum number of SCF iterations by setting `NELM=200`.
- Raise the cutoff energy: increase `ENCUT` to 520 eV or higher.

#### **3.3.2 Optimization Not Converging**

**Issue:** Optimization reaches the maximum steps (`NSW`) but does not meet convergence criteria for force or energy.

**Possible Causes:**
- The initial structure is far from the energy minimum.
- Convergence criteria (`EDIFFG`) are too strict.
- The optimization step size (`POTIM`) is too large.

**Solutions:**
- Provide a reasonable initial structure or pre-optimize using external tools.
- Relax the convergence criteria: adjust `EDIFFG` from `-0.01` to `-0.02`.
- Reduce the optimization step size: adjust `POTIM` from `0.5` to `0.2`.

#### **3.3.3 Oscillations During Optimization**

**Issue:** Energy and forces oscillate repeatedly during optimization, preventing stable convergence.

**Possible Causes:**
- The optimization step size (`POTIM`) is too large.
- The optimization algorithm is unsuitable for the system.

**Solutions:**
- Decrease the optimization step size: set `POTIM` to `0.2` or smaller.
- Change the optimization algorithm:
  - Use the conjugate gradient method by setting `IBRION=2`.
  - Use damped molecular dynamics by setting `IBRION=3`.

#### **3.3.4 Divergence During Optimization**

**Issue:** Severe deformation of the structure occurs during optimization, leading to significant energy increases.

**Possible Causes:**
- Atomic distances are too short due to an unreasonable initial structure.
- Inadequate vacuum spacing (for low-dimensional systems such as thin films or nanostructures).
- Incorrect pseudopotential files.

**Solutions:**
- Ensure reasonable initial atomic distances to avoid overly close atoms.
- Increase the vacuum spacing: for low-dimensional systems, set the vacuum layer thickness to at least 15 Å.
- Verify the `POTCAR` file to ensure the pseudopotential matches the atomic species.

