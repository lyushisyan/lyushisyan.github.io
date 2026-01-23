---
layout: post
title: First-Principles-Based PBTE Method
date: 2025-02-16 06:36:10
description: An introduction to the First-Principles Phonon Boltzmann Transport Equation (PBTE) method, covering DFT, lattice dynamics, and thermal conductivity calculations.
tags: pbte phonon dft boltzmann-transport thermal-conductivity
categories: calculation
related_posts: true
toc:
  sidebar: left
---

In microscale and nanoscale heat conduction, size effects mainly involve two key length scales: **phonon wavelength** and **mean free path (MFP)**.

* If the system’s characteristic size is much larger than the phonon MFP, heat conduction is in the **macroscopic diffusive regime**, and the classical heat diffusion equation is applicable.
* If the size is comparable to the phonon MFP, **classical size effects** and **ballistic phonon transport** must be considered. In this case, the **Boltzmann Transport Equation (BTE)** should be used to describe energy transport.
* If the size further shrinks to the scale of the phonon wavelength, **wave characteristics of phonons** become important.

The **First-Principles Phonon Boltzmann Transport Equation (PBTE)** method is essentially a combination of the following three techniques:

* **First-principles method (ab initio method)**: A numerical method for solving the **Schrödinger equation**.
* **Lattice dynamics method**: A method to compute phonon dispersion and relaxation times based on interatomic force constants (IFCs).
* **Boltzmann Transport Equation (BTE)**: A heat transport model that uses phonon dispersion and relaxation time as inputs to calculate the system’s total thermal conductivity.


## 1. First-Principles Methods

First-principles (ab initio) methods refer to techniques that solve the electronic structure and atomic interactions of materials within the framework of quantum mechanics, using **minimal empirical parameters**. They are primarily based on numerical solutions to the Schrödinger equation, yielding properties such as ground-state electron density, band structure, total energy, and other physical quantities.
In solid-state physics and materials science, first-principles methods are typically based on **Density Functional Theory (DFT)**. As the full many-body Schrödinger equation is difficult to solve directly, DFT provides an efficient way to handle many-body problems via the electron density and is widely applied to metals, semiconductors, insulators, molecules, and surfaces.

### 1.1 Basic Concept of Density Functional Theory

The core concepts of DFT originate from the Hohenberg-Kohn theorem and the Kohn-Sham equation:

1. The **Hohenberg-Kohn theorem** states that all ground-state physical quantities of a system are functionals of the electron density \$\rho(\mathbf{r})\$, i.e., the Hamiltonian and energy of the system are uniquely determined by the electron density.
2. The **Kohn-Sham equation** maps the real many-electron system to an auxiliary system of non-interacting electrons, using an appropriate **exchange-correlation potential** to approximate electron–electron interactions. The multi-body problem thus becomes solving a set of single-particle-like equations:

$$
\left[ -\frac{\hbar^2}{2m}\nabla^2 + V_\text{ext}(\mathbf{r}) + V_\text{H}(\mathbf{r}) + V_\text{xc}(\mathbf{r}) \right] \phi_i(\mathbf{r}) = \epsilon_i \phi_i(\mathbf{r})
$$

Where:

* \$V_\text{ext}(\mathbf{r})\$: Coulomb potential from atomic nuclei
* \$V_\text{H}(\mathbf{r})\$: classical Hartree potential
* \$V_\text{xc}(\mathbf{r})\$: exchange-correlation potential that includes all complex many-body effects

In practice, one must choose an exchange-correlation functional (e.g., LDA, GGA, or hybrid functionals) and adopt a method to treat real and reciprocal space (e.g., pseudopotentials, PAW, APW+lo, etc.).

### 1.2 Obtaining Interatomic Force Constants (IFCs) from DFT

A crucial step in thermal conductivity calculations is determining the **interatomic force constants (IFCs)** of the material. These constants are used to construct the dynamical matrix and calculate lattice dynamical properties such as phonon dispersion and phonon lifetimes. IFCs can be obtained from first-principles calculations using two main methods:

#### 1.2.1 Density Functional Perturbation Theory (DFPT)

In the DFPT framework, small periodic perturbations are applied to the periodic structure, and the linearized Kohn-Sham equations are solved to obtain the first-, second-, or third-order responses of the potential energy with respect to atomic displacements.

* DFPT can directly calculate IFCs and phonon modes in \$\mathbf{q}\$-space.
* Both second-order (harmonic) and third-order (anharmonic) IFCs can be obtained for phonon dispersion and scattering analysis.

#### 1.2.2 Finite Displacement Method (FDM)

In this method, small displacements (e.g., 0.01 Å) are applied to atoms in a supercell, and the resulting changes in energy or forces are used to compute second-order and higher-order IFCs:

* A sufficiently large supercell is required to ensure negligible interaction across boundaries.
* Multiple configurations with different displacements must be computed to extract complete IFCs.

Both methods rely on DFT-level force or energy calculations. Since phonon properties are sensitive to calculation accuracy, careful choices of exchange-correlation functional, plane-wave cutoff energy, and k-point mesh are necessary to ensure accurate IFCs.

## 2. Harmonic and Anharmonic Lattice Dynamics

In **harmonic lattice dynamics**, the second-order IFCs are used to obtain the phonon dispersion relation \$\omega_\lambda(\mathbf{q})\$. Once dispersion is known, specific heat of each phonon mode \$\lambda\$ can be computed.
The phonon group velocity is defined as the gradient of the frequency with respect to wave vector: \$\mathbf{v}*\lambda = \nabla*\mathbf{q} \omega_\lambda\$
The **relaxation time** \$\tau_\lambda\$ is obtained through **anharmonic lattice dynamics**, which involves both second- and higher-order IFCs.

### 2.1 Dispersion Relation

For a periodic crystal with small displacements around equilibrium, the total potential energy \$U\$ can be expanded as a Taylor series:

$$
U = U_0 + \frac{1}{2!} \sum_{ij}\sum_{\alpha\beta} \Phi_{ij}^{\alpha\beta} u_i^\alpha u_j^\beta + \frac{1}{3!} \sum_{ijk}\sum_{\alpha\beta\gamma} \Psi_{ijk}^{\alpha\beta\gamma} u_i^\alpha u_j^\beta u_k^\gamma + \mathcal{O}(u^4)
$$

Where:

* \$U_0\$: potential energy at equilibrium
* \$u_{i}^\alpha\$: displacement of atom \$i\$ in direction \$\alpha\$
* \$\Phi_{ij}^{\alpha\beta}\$: second-order IFCs (harmonic)
* \$\Psi_{ijk}^{\alpha\beta\gamma}\$: third-order IFCs (anharmonic)
* \$\mathcal{O}(u^4)\$: higher-order terms

Due to force equilibrium, first-order terms are absent. Neglecting higher-order terms leads to the harmonic approximation.

If atom \$i\$ belongs to the \$b\$-th atom in the \$l\$-th unit cell and \$j\$ is in the \$l'\$-th cell, the equation of motion becomes:

$$
m_b\frac{d^2 u_{lb}^\alpha (t)}{d t^2} = -\sum_{l'b',\beta} \Phi_{lb,l'b'}^{\alpha\beta} u_{l'b'}^{\beta} (t)
$$

Assuming plane wave solutions:

$$
u_{lb}^\alpha (t) = \frac{1}{\sqrt{m_b}}\Lambda_\lambda e_{b,\lambda}^\alpha e^{i(\mathbf q\cdot\mathbf R_l - \omega_\lambda t)}
$$

Substituting gives the eigenvalue equation:

$$
\omega_\lambda^2 \mathbf e _{b,\lambda} = \mathbf D_{bb'}^{\alpha\beta}(\textbf q) \textbf e_{b,\lambda}
$$

Where the **dynamical matrix** is:

$$
\mathbf D_{bb'}^{\alpha\beta}(\textbf q) =\frac{1}{\sqrt{m_bm_{b'}}}\sum_{l'}\Phi_{0b,l'b'}^{\alpha\beta} e^{i\mathbf q\cdot(\mathbf R_{l'} - \mathbf R_0)}
$$

Solving gives the phonon dispersion \$\omega_\lambda(\mathbf{q})\$ and corresponding eigenvectors \${e_{b,\lambda}^\alpha}\$.

### 2.2 Phonon Scattering Mechanisms and Relaxation Time

In real materials, phonons have finite lifetimes due to various scattering mechanisms. Within the BTE framework, these are expressed as **scattering rates** \$\Gamma_\lambda\$ or equivalently **relaxation times** \$\tau_\lambda\$.

#### 2.2.1 Phonon-Phonon Scattering

In nonmetals, the dominant scattering is **phonon-phonon interactions**, i.e., anharmonic lattice effects. Quantum mechanically, the crystal Hamiltonian is divided into harmonic and anharmonic parts.
Third-order scattering (three-phonon processes) includes combination and splitting processes. Energy and momentum conservation must be satisfied (including Umklapp processes):

$$
\Gamma_{\lambda\lambda'\lambda''}^{\pm} = \frac{\hbar\pi}{4}\begin{Bmatrix}n_{\lambda'}-n_{\lambda''} \\ n_{\lambda'} + n_{\lambda''}+1 \end{Bmatrix} \frac{\delta(\omega_\lambda\pm\omega_{\lambda'} - \omega_{\lambda''})}{\omega_{\lambda}\omega_{\lambda'}\omega_{\lambda''}}|V_{\lambda\lambda'\lambda''}^{\pm}|^2\Delta_{\mathbf{G}, \,\mathbf{q}\pm \mathbf{q}' - \mathbf{q}''}
$$

#### 2.2.2 Phonon-Impurity Scattering

Caused by mass or bonding perturbations from impurities (e.g., isotopes, defects):

$$
\Gamma_{\lambda\lambda'} = \frac{\pi \omega_\lambda^2}{2}\delta(\omega_\lambda - \omega_{\lambda'})\sum_bg(b) |\mathbf e_{b,\lambda}^*\cdot \mathbf e_{b,\lambda'}|^2
$$

Where \$g(b) = \sum_s f_s(b)(1 - \frac{m_{b,s}}{\overline{m}_b})^2\$ and \$\overline{m}*b = \sum_s f_s(b) m*{b,s}\$.

## 3. Thermal Conductivity and the Boltzmann Transport Equation (BTE)

### 3.1 Thermal Conductivity

According to Fourier's law, the thermal conductivity \$\kappa\$ characterizes the ability of a material to conduct heat:

$$
\mathbf{J} = -\kappa \nabla T
$$

Where \$\mathbf{J}\$ is the heat flux vector and \$\nabla T\$ is the temperature gradient. In anisotropic materials, \$\kappa\$ is a tensor.

To predict \$\kappa\$ from phonon properties, one must use the BTE to describe the non-equilibrium phonon distribution under a small temperature gradient. Assuming steady-state and small gradients, the linearized BTE is:

$$
-\mathbf{v}_\lambda \nabla T \frac{\partial n_\lambda^0}{\partial T} = \frac{n_\lambda'}{\tau_\lambda}
$$

Where:

* \$n_\lambda = n_\lambda^0 + n_\lambda'\$ is the phonon distribution
* \$n_\lambda^0\$ is the equilibrium Bose–Einstein distribution
* \$n_\lambda'\$ is the perturbation from equilibrium
* \$\tau_\lambda\$ is the relaxation time
* \$\mathbf{v}_\lambda\$ is the group velocity of mode \$\lambda\$

The Bose–Einstein distribution:

$$
n_\lambda^0 = \frac{1}{\exp\left(\frac{\hbar \omega_\lambda}{k_B T}\right) - 1}
$$

The heat flux contributed by phonons:

$$
\mathbf{J} = \frac{1}{V} \sum_\lambda \hbar\omega_\lambda \mathbf{v}_\lambda n_\lambda
$$

Where \$V = N_0 \cdot \Omega\$ is the total volume (\$\Omega\$ = unit cell volume, \$N_0\$ = number of \$\mathbf{q}\$-points). Comparing with Fourier's law gives the thermal conductivity tensor:

$$
\kappa^{\alpha\beta} = \frac{1}{V}\sum_\lambda \hbar\omega_\lambda \frac{\partial n_\lambda^0}{\partial T} v_\lambda^\alpha v_\lambda^\beta \tau_\lambda = \sum_\lambda c_\lambda v_\lambda^\alpha v_\lambda^\beta \tau_\lambda
$$

Where \$c_\lambda = \frac{\hbar\omega_\lambda}{V}\frac{\partial n_\lambda^0}{\partial T}\$ is the mode heat capacity.
For isotropic systems:

$$
\kappa = \frac{1}{3V}\sum_\lambda \hbar\omega_\lambda \frac{\partial n_\lambda^0}{\partial T} |\mathbf{v}_\lambda|^2 \tau_\lambda
$$

### 3.2 Single-Mode Relaxation Time Approximation (SMRTA)

The SMRTA assumes that all phonon modes except mode \$\lambda\$ remain in equilibrium:

$$
\begin{cases}
n_\lambda = n_\lambda^0 + n_\lambda' \\
n_{\lambda'} = n_{\lambda'}^0 \\
n_{\lambda''} = n_{\lambda''}^0
\end{cases}
$$

The SMRTA relaxation time becomes:

$$
\frac{1}{\tau_\lambda^0} = \sum_{\lambda'\lambda''}^+ \Gamma_{\lambda\lambda'\lambda''}^+ + \sum_{\lambda'\lambda''}^- \frac{1}{2} \Gamma_{\lambda\lambda'\lambda''}^- + \sum_{\lambda'}\Gamma_{\lambda\lambda'}
$$

Where superscript 0 indicates this is the zero-order approximation.

### 3.3 Iterative Solution

To overcome SMRTA limitations, the **Full Iterative Method** solves the BTE self-consistently:

$$
\begin{cases}
n_\lambda = n_\lambda^0 + n_\lambda' \\
n_{\lambda'} = n_{\lambda'}^0 + n_{\lambda'}' \\
n_{\lambda''} = n_{\lambda''}^0 + n_{\lambda''}'
\end{cases}
$$

**Initial Guess**:
Use \$\tau_\lambda^0\$ from SMRTA.

**Self-Consistent Iteration**:
Form a coupled system of equations for all \$n_\lambda'\$ and iterate until convergence.

The relaxation time becomes:

$$
\tau_\lambda = \tau_\lambda^0 + \tau_\lambda^0 \Delta_\lambda
$$

$$
\Delta_\lambda = \sum_{\lambda'\lambda''}^+ \Gamma_{\lambda\lambda'\lambda''}^+ (\xi_{\lambda\lambda''}\tau_{\lambda''} - \xi_{\lambda\lambda'}\tau_{\lambda'}) \\ + \sum_{\lambda'\lambda''}^- \frac{1}{2} \Gamma_{\lambda\lambda'\lambda''}^-(\xi_{\lambda\lambda''}\tau_{\lambda''} + \xi_{\lambda\lambda'}\tau_{\lambda'}) \\+ \sum_{\lambda'}\Gamma_{\lambda\lambda'}\xi_{\lambda\lambda'}\tau_{\lambda'}
$$

This method includes more detailed interactions and better captures **phonon redistribution** caused by **Normal processes**, especially in high thermal conductivity or low-temperature systems. However, it is also more computationally intensive.

## 4. Computational Workflow and Software

The general workflow for calculating phonon thermal conductivity includes:

### (1) Extract Interatomic Force Constants (IFCs)

IFCs are the basis for lattice dynamics and thermal transport. They can be obtained via:

* **Classical potentials**: for simple structures with known potentials
* **Machine learning potentials (MLPs)**: recent development balancing accuracy and efficiency
* **First-principles (DFT)**: most common and accurate method without empirical parameters

Two main extraction methods:

* **Finite Displacement Method**: Apply small displacements in supercells and use numerical derivatives to obtain IFCs (supports classical/ML/DFT).
* **DFPT**: Perturbative method within DFT framework; directly computes IFCs in reciprocal space.

### (2) Truncation and Symmetry Correction

IFCs theoretically exist between all atomic pairs. In practice, a **cutoff radius** is applied. The impact of different cutoffs should be tested.

Also, due to numerical noise and truncation, computed IFCs may violate **translational invariance** or crystal symmetry. These must be corrected to ensure accurate thermal conductivity.

### (3) Compute Thermal Conductivity

With second- and third-order IFCs, combine **anharmonic lattice dynamics** and **BTE** using:

* **SMRTA**: fast estimation
* **Full Iterative Solution**: more accurate, especially for high-κ or low-T systems

This method requires **no fitting parameters**, only the initial atomic structure. It is highly predictive and widely validated against experiments.

### (4) Numerical Error and Applicability

Despite its strength, this method is still sensitive to:

* DFT convergence, functional choice, and displacement size
* IFC cutoff radius
* Brillouin zone integration grid (q-mesh)

Nevertheless, PBTE is considered one of the most reliable methods for predicting lattice thermal conductivity. It not only yields **total κ**, but also **mode-resolved contributions**, enabling studies of interfacial thermal conductance and nanoscale transport.

### (5) Software and Interfaces

Several open-source packages support this workflow:

* **ShengBTE**
* **phono3py**

These integrate well with major first-principles codes like:

* **VASP**
* **Quantum ESPRESSO**
* **ABINIT**

They enable an end-to-end automated workflow from structure optimization to IFC extraction and thermal conductivity prediction.

