---
layout: post
title: "NEP-kappa v1.1: From YAML Configuration to Lattice Thermal Conductivity"
lang: en
translation_key: nep-kappa-v1-1-guide
permalink: /blog/2026/07/06/nep-kappa-v1-1-guide/
date: 2026-07-06 12:00:00
last_updated: 2026-07-06
reading_time: "13 min"
description: "A practical guide to NEP-kappa v1.1: install the CLI, configure YAML input, and run relaxation, force constants, thermal conductivity, and plotting stages."
tags: NEP-kappa tutorial phonon thermal-transport
categories: calculation
related_posts: true
featured: true
toc:
  sidebar: left
---

Beginning with v1.1, NEP-kappa is no longer a calculation script driven by a plain-text parameter file. It is a lattice-thermal-transport workflow with a unified command-line interface and structured YAML input. Structure relaxation, force-constant generation, thermal-conductivity calculation, and plotting can be run independently or chained together with one command.

The visible change is from

```bash
python nepkappa.py input.txt
```

to

```bash
nepkappa run input.yaml
```

but the more important changes are clearer parameter organization, reproducible workflows, and explicit dependencies between stages. This guide starts from installation, runs the first bulk-Si example, and explains the settings that most often cause confusion for bulk, film, and nanowire calculations.

- Source code: [GitHub release v1.1.0](https://github.com/lyushisyan/NEP-kappa/releases/tag/v1.1.0)
- Documentation: [NEP-kappa documentation](https://nep-kappa.readthedocs.io)

## What changed in v1.1?

The new release uses the `nepkappa` command throughout and provides seven main entry points:

```text
info      validate and display the resolved configuration
relax     relax the input structure
fc        generate second- and third-order force constants
kappa     solve for lattice thermal conductivity
plot      process results and create figures
run       execute relax, fc, and kappa in sequence
compare   compare DFT and NEP results
```

Forces can be evaluated with either NEP or VASP. Force constants can be generated through finite displacements or fitted with HiPhive. The same workflow can therefore cover fast potential-based calculations, DFT reference calculations, and systematic comparisons between them.

## Installation and environment checks

An isolated Conda environment is recommended:

```bash
conda create -n nepkappa-env python=3.10 -y
conda activate nepkappa-env

git clone https://github.com/lyushisyan/NEP-kappa.git
cd NEP-kappa
python -m pip install -e .
```

The `-e` flag installs the repository in editable mode, so local source changes take effect without reinstalling. Verify the command, package version, and phono3py installation:

```bash
nepkappa --help
nepkappa --version
python -c "import phono3py; print(phono3py.__version__)"
```

NEP-kappa v1.1 supports `phono3py>=4.0.1`. An older environment can be updated with:

```bash
python -m pip install --upgrade phono3py
python -m pip install --upgrade -e .
```

## Run the smallest complete example first

The bundled bulk-Si example is the safest starting point. Validate its YAML file without launching a calculation:

```bash
nepkappa info examples/1-bulk-nep-rta.yaml
```

`info` checks required fields and prints the configuration that will actually be used. If it succeeds, run the workflow and then create the figures:

```bash
nepkappa run examples/1-bulk-nep-rta.yaml
nepkappa plot examples/1-bulk-nep-rta.yaml
```

`run` performs relaxation, force-constant generation, and thermal-conductivity calculation in sequence. Plotting remains a separate step, allowing figures to be adjusted without repeating expensive calculations. It is best to run this example unchanged before replacing the structure, NEP potential, supercells, q-point mesh, or temperature range.

## A representative YAML file

The following configuration uses the NEP backend and finite displacements for a bulk material:

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

Each section has one responsibility. `structure` describes geometry and dimensionality; `calculator` selects the force backend; `relaxation` and `force-constant` control preprocessing; `kappa` configures the transport calculation; `plot` contains only post-processing options; and `output` defines the result directory.

## Force backends and force-constant routes

For an NEP calculation, specify the potential file:

```yaml
calculator:
  name: nep
  nep_model: potentials/Si_Bulk_Fan.txt
```

For VASP, provide commands and paths that exist on the target machine:

```yaml
calculator:
  name: vasp
  vasp_command: mpirun -np 24 /path/to/vasp_std
  vasp_path: /path/to/vasp_std
  potcar_path: /path/to/potpaw_PBE.64
```

If both `vasp_command` and `vasp_path` are set, the full command takes precedence. Paths in examples are placeholders; the MPI launcher, executable, and POTCAR library must be adapted to the server.

Finite displacements are enabled with `use_hiphive: false`:

```yaml
force-constant:
  dim-fc2: [3, 3, 3]
  dim-fc3: [3, 3, 3]
  use_hiphive: false
```

Larger systems can instead use HiPhive fitting:

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

These parameters control the number of rattled structures, displacement standard deviation, minimum interatomic distance, and fitting cutoffs. They are system-dependent convergence parameters, not universal defaults. A successful fit also writes `hiphive_model.fcp` alongside `fc2.hdf5` and `fc3.hdf5`.

## Understanding the conductivity settings

`mesh` is the phono3py q-point mesh. Denser meshes are usually more reliable and more expensive, so production results require a mesh-convergence test.

`temps` accepts either one temperature or an evenly spaced range:

```yaml
temps: [300]            # 300 K only
temps: [100, 1000, 50]  # 100–1000 K in 50 K steps
```

Two values, or a list of four or more discrete temperatures, are not accepted. `method: rta` is faster and suitable for testing and routine analysis, whereas `method: lbte` solves the full linearized BTE at greater cost. `isotope` toggles isotope scattering, `bfmp` is the boundary mean free path in micrometers, and `wigner` enables Wigner transport.

If `phono3py_disp.yaml`, `fc2.hdf5`, and `fc3.hdf5` already exist, a new mesh, temperature range, or scattering setting does not require regenerating force constants:

```bash
nepkappa kappa input.yaml
```

## Effective volume for films and nanowires

Low-dimensional models contain vacuum. Normalizing by the entire simulation-cell volume therefore dilutes thermal conductivity and volumetric heat capacity. A film needs an effective thickness and vacuum direction:

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

`effective_thickness` is given in Å. A nanowire instead requires an effective cross-sectional area and periodic axis:

```yaml
structure:
  poscar: path/to/POSCAR_wire
  dimensionality: 1
  effective_area: 100.0
  periodic_axis: z
```

`effective_area` is in Å². These corrections are applied only to data and figures generated by `plot` and `compare`; the original phono3py `kappa-m*.hdf5` file is not modified. Thickness and area should follow a physical geometric definition rather than being adjusted to reproduce a target conductivity.

## Stage-by-stage execution and dependencies

The complete workflow can be written explicitly as:

```bash
nepkappa info input.yaml
nepkappa relax input.yaml
nepkappa fc input.yaml
nepkappa kappa input.yaml
nepkappa plot input.yaml
```

When `relaxation.enabled: true`, a standalone `fc` step reads `POSCAR_relaxed` from the result directory, so `relax` must be completed first. Use `nepkappa run input.yaml` when you do not want to manage this dependency manually.

The advantage of separate stages is avoiding repeated work. Existing force constants can be reused for a new `kappa` calculation, while existing HDF5 results can be replotted after changing temperature, components, layout, or DPI.

## Output files and DFT–NEP comparison

A complete calculation typically produces:

```text
run.log
POSCAR_relaxed
phono3py_disp.yaml
fc2.hdf5
fc3.hdf5
kappa-m*.hdf5
plots/
```

The `kappa-m*.hdf5` file is the main phono3py transport output, and its name normally reflects the q-point mesh. `plots/` contains dispersion, density of states, volumetric heat capacity, group velocity, lifetime, conductivity, and combined figures. `run.log` records the resolved configuration, terminal output, and stage timings.

To test whether an NEP reproduces DFT phonon and transport properties, prepare a separate comparison file:

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

Then run:

```bash
nepkappa compare examples/compare.yaml
```

Both result directories should contain `phono3py_disp.yaml`, `fc2.hdf5`, and `kappa-m*.hdf5`. Figures and logs are written to `compare_dir/plots` and `compare_dir/compare.log`. Low-dimensional comparisons also need consistent effective-thickness or cross-sectional-area settings.

## Common problems and practical advice

If the `nepkappa` command is missing, verify the active environment and editable installation:

```bash
conda activate nepkappa-env
python -m pip install -e .
which nepkappa
```

For phono3py errors, check the installed version and run `nepkappa info input.yaml` to separate dependency failures from configuration errors. For VASP failures, check `vasp_command`, the executable, and `potcar_path` first, because the paths in sample files are placeholders.

Small supercells and a coarse mesh are useful for testing the workflow:

```yaml
force-constant:
  dim-fc2: [2, 2, 2]
  dim-fc3: [2, 2, 2]

kappa:
  mesh: [11, 11, 11]
```

A successful run is not a converged result. Production calculations should test the force-constant supercells and q-point mesh independently. Each task should also use a separate `result_dir` to avoid overwriting previous outputs.

## Summary

NEP-kappa v1.1 organizes structures, forces, force constants, BTE solution, and analysis into a workflow that can be inspected, split into stages, and reproduced. The recommended first run is deliberately simple:

```bash
nepkappa info examples/1-bulk-nep-rta.yaml
nepkappa run examples/1-bulk-nep-rta.yaml
nepkappa plot examples/1-bulk-nep-rta.yaml
```

Run the bundled example first, change one class of parameters at a time, and perform convergence tests for both supercells and q-point meshes. YAML then becomes more than a new input syntax: it becomes the center of a reproducible calculation.

## References

If you use NEP-kappa in research, please cite:

F. Yin et al., “Accelerated phonon transport calculations for nanostructures: Combining neuroevolution potentials and compressed sensing,” *Journal of Applied Physics* **139**, 135103 (2026).

If you use the silicon-nanowire NEP potential distributed with the project, please also cite:

K. Xu et al., “Critical Size Transitions in Silicon Nanowires: Amorphization, Phonon Hydrodynamics, and Thermal Conductivity,” *The Journal of Physical Chemistry Letters* **16**, 8580–8587 (2025).
