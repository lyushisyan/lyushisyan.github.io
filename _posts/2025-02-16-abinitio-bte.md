---
layout: post
title: "From First Principles to Lattice Thermal Conductivity: The PBTE Method"
lang: en
translation_key: abinitio-bte
permalink: /blog/2025/02/16/abinitio-bte/
date: 2025-02-16 06:36:10
last_updated: 2026-06-21
reading_time: "18 min"
description: "A physically grounded guide to first-principles phonon Boltzmann transport, connecting DFT, interatomic force constants, collision operators, numerical convergence, and lattice thermal conductivity."
tags: method phonon thermal-transport
categories: calculation
related_posts: true
featured: false
toc:
  sidebar: left
---

Predicting lattice thermal conductivity from an atomic structure requires more than computing a phonon dispersion and assigning a lifetime to each mode. The central task is to determine how a temperature gradient drives the phonon population away from equilibrium, how scattering redistributes that perturbation across mode space, and which parts of the resulting heat current survive.

The first-principles phonon Boltzmann transport equation (PBTE) method connects three levels of description:

1. **Electronic structure** determines the potential-energy surface and its derivatives.
2. **Lattice dynamics** converts those derivatives into phonon frequencies, eigenvectors, velocities, and interaction matrix elements.
3. **The linearized PBTE** determines the non-equilibrium phonon distribution and the lattice thermal-conductivity tensor.

The method is powerful because it exposes microscopic transport mechanisms rather than returning only a fitted bulk number. It is not, however, exact or parameter-free in an absolute sense. Its predictions depend on the electronic-structure approximation, numerical convergence, the order at which anharmonicity is truncated, and whether the phonon quasiparticle picture is valid.

This article complements the earlier discussions of [the emergence of Fourier's law]({{ '/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }}) and [Normal versus Umklapp scattering]({{ '/blog/2026/06/20/normal-umklapp-collective-heat-flow/' | relative_url }}). Here the focus is methodological: how does an atomic structure become a prediction of $\boldsymbol\kappa$?

## 1. Scope of the first-principles PBTE

The conventional PBTE workflow is designed primarily for near-equilibrium lattice heat transport in periodic crystals whose vibrations can be described by reasonably well-defined phonon quasiparticles.

Its natural output is the intrinsic lattice thermal conductivity of a bulk crystal, possibly augmented by isotope, defect, electron--phonon, or boundary-scattering models. It is especially useful for answering questions such as:

- Which frequencies, wave vectors, and polarizations carry most of the heat?
- Which scattering channels limit the conductivity?
- How does $\kappa$ vary with temperature, isotope composition, or crystal direction?
- What phonon mean-free-path spectrum underlies the bulk result?
- How different are the relaxation-time and full collision-operator solutions?

The method does not automatically describe an interface, a finite device, or strongly nonlocal heat flow. Those problems require additional boundary conditions or transport formalisms even when the bulk phonon properties come from first principles.

## 2. What “first principles” contributes

In this context, first-principles calculations do not simply “solve the Schrödinger equation.” In practice, density functional theory (DFT) provides an approximate electronic ground-state energy and atomic forces for a chosen exchange-correlation functional, pseudopotential or all-electron treatment, basis set, and Brillouin-zone sampling.

The Kohn--Sham equations are

$$
\left[
-\frac{\hbar^2}{2m_e}\nabla^2
+V_{\mathrm{ext}}(\boldsymbol r)
+V_{\mathrm H}[\rho](\boldsymbol r)
+V_{\mathrm{xc}}[\rho](\boldsymbol r)
\right]
\phi_i(\boldsymbol r)
=\varepsilon_i\phi_i(\boldsymbol r).
$$

For lattice dynamics, the most important result is not usually the electronic band structure itself, but an accurate local representation of the Born--Oppenheimer potential-energy surface near the relevant atomic configurations.

The phrase “without empirical fitting” should therefore be used carefully. Standard DFT-based PBTE calculations may not fit thermal conductivity to experiment, but they still contain modeling choices and approximations. The exchange-correlation functional, equilibrium volume, pseudopotential, treatment of long-range electrostatics, and magnetic or relativistic effects can all propagate into the phonon spectrum and scattering rates.

## 3. Interatomic force constants: derivatives of the energy surface

Let $u_{lb}^{\alpha}$ be the displacement of atom $b$ in unit cell $l$ along Cartesian direction $\alpha$. Expanding the potential energy around equilibrium gives

$$
U=U_0
+\frac{1}{2!}\sum_{lb,l'b'}\sum_{\alpha\beta}
\Phi_{lb,l'b'}^{\alpha\beta}
u_{lb}^{\alpha}u_{l'b'}^{\beta}
+\frac{1}{3!}\sum_{lb,l'b',l''b''}\sum_{\alpha\beta\gamma}
\Psi_{lb,l'b',l''b''}^{\alpha\beta\gamma}
u_{lb}^{\alpha}u_{l'b'}^{\beta}u_{l''b''}^{\gamma}
+\mathcal O(u^4).
$$

The first-order term vanishes at a fully relaxed equilibrium structure. The coefficients are interatomic force constants (IFCs):

$$
\Phi_{ij}^{\alpha\beta}
=\frac{\partial^2 U}
{\partial u_i^{\alpha}\partial u_j^{\beta}},
\qquad
\Psi_{ijk}^{\alpha\beta\gamma}
=\frac{\partial^3 U}
{\partial u_i^{\alpha}\partial u_j^{\beta}\partial u_k^{\gamma}}.
$$

Second-order IFCs determine harmonic phonons. Third-order IFCs generate the leading three-phonon interaction. Fourth- and higher-order terms contribute to frequency renormalization and higher-order scattering, which can be important at elevated temperature or in strongly anharmonic materials.

### 3.1 Finite displacements

In a supercell finite-displacement calculation, selected atoms are displaced and the resulting forces are evaluated. Symmetry reduces the number of required configurations, and the IFCs are obtained from finite differences or regression.

The displacement amplitude must be large enough to overcome numerical force noise but small enough to remain within the intended Taylor expansion. A value near $0.01$ Å is common for harmonic calculations, but it is not universal and should be tested.

Third- and higher-order IFCs require many more displacement patterns. Compressive sensing, systematic regression, and machine-learning potentials can reduce the cost, but they introduce their own training, regularization, and validation requirements.

### 3.2 Density functional perturbation theory

Density functional perturbation theory (DFPT) computes the response to periodic perturbations by solving linearized self-consistent equations. It is particularly established for harmonic phonons, dielectric tensors, and Born effective charges in reciprocal space.

Higher-order response theory exists, but third-order IFC workflows are not equally available or equally convenient in every electronic-structure package. In practice, many PBTE calculations combine DFPT or finite displacements for harmonic IFCs with finite-displacement forces for third-order IFCs.

## 4. Harmonic lattice dynamics

The harmonic equations of motion are

$$
m_b\frac{d^2u_{lb}^{\alpha}}{dt^2}
=-\sum_{l'b'\beta}
\Phi_{lb,l'b'}^{\alpha\beta}u_{l'b'}^{\beta}.
$$

Using a plane-wave form leads to the eigenvalue problem

$$
\sum_{b'\beta}
D_{bb'}^{\alpha\beta}(\boldsymbol q)
e_{b'\beta}^{\lambda}
=\omega_{\lambda}^2
e_{b\alpha}^{\lambda},
$$

where $\lambda=(\boldsymbol q,j)$ labels a wave vector and phonon branch. The dynamical matrix is

$$
D_{bb'}^{\alpha\beta}(\boldsymbol q)
=\frac{1}{\sqrt{m_bm_{b'}}}
\sum_{l'}
\Phi_{0b,l'b'}^{\alpha\beta}
\exp\!\left[i\boldsymbol q\cdot
(\boldsymbol R_{l'}-\boldsymbol R_0)\right].
$$

Diagonalization gives the phonon frequencies $\omega_\lambda$ and eigenvectors $\boldsymbol e_\lambda$. The group velocity is

$$
\boldsymbol v_\lambda=\nabla_{\boldsymbol q}\omega_\lambda.
$$

The modal heat capacity is

$$
C_\lambda
=\hbar\omega_\lambda
\frac{\partial n_\lambda^0}{\partial T},
\qquad
n_\lambda^0
=\frac{1}{\exp(\hbar\omega_\lambda/k_BT)-1}.
$$

Before any transport calculation, the harmonic model should reproduce basic physical constraints. Imaginary modes may indicate a genuinely unstable structure, an unconverged calculation, an inappropriate reference phase, or broken invariance in the fitted IFCs. They should not simply be removed without diagnosis.

## 5. Anharmonicity and phonon scattering

Third-order IFCs determine matrix elements $V_{\lambda\lambda'\lambda''}$ for three-phonon absorption and decay. Allowed processes satisfy energy conservation and crystal-momentum selection rules:

$$
\omega_\lambda+\omega_{\lambda'}=\omega_{\lambda''},
\qquad
\boldsymbol q+\boldsymbol q'
=\boldsymbol q''+\boldsymbol G,
$$

or

$$
\omega_\lambda=\omega_{\lambda'}+\omega_{\lambda''},
\qquad
\boldsymbol q
=\boldsymbol q'+\boldsymbol q''+\boldsymbol G.
$$

Fermi's golden rule gives rates with the schematic structure

$$
\Gamma^{(3)}
\propto
|V_{\lambda\lambda'\lambda''}|^2
\times\text{occupation factors}
\times\delta(\Delta\omega)
\times\Delta_{\boldsymbol q,\boldsymbol G}.
$$

The energy delta function must be integrated numerically on a discrete $\boldsymbol q$ mesh, using a broadening scheme or a tetrahedron-like treatment. The result can be sensitive to mesh density and integration parameters.

Isotope scattering is commonly treated as elastic mass-disorder scattering. Defects, boundaries, electrons, and four-phonon interactions require additional models or matrix elements. Adding rates with Matthiessen's rule can be useful, but it can obscure mode coupling and correlations when the underlying collision mechanisms are not independent.

## 6. From equilibrium phonons to the linearized PBTE

Under a small temperature gradient, write the phonon distribution as

$$
n_\lambda
=n_\lambda^0
-\frac{\partial n_\lambda^0}{\partial T}
\boldsymbol F_\lambda\cdot\nabla T,
$$

where $\boldsymbol F_\lambda$ is the unknown vector mean-free-displacement response. The heat flux is determined by the non-equilibrium part:

$$
\boldsymbol J_Q
=-\frac{1}{V}\sum_\lambda
C_\lambda\boldsymbol v_\lambda
(\boldsymbol F_\lambda\cdot\nabla T).
$$

Comparison with $J_Q^{\alpha}=-\kappa^{\alpha\beta}\nabla_\beta T$ gives

$$
\kappa^{\alpha\beta}
=\frac{1}{V}\sum_\lambda
C_\lambda v_\lambda^{\alpha}F_\lambda^{\beta}.
$$

The response $\boldsymbol F$ is found from a linear system whose schematic form is

$$
\sum_{\lambda'}
\Omega_{\lambda\lambda'}
\boldsymbol F_{\lambda'}
=\boldsymbol v_\lambda.
$$

$\boldsymbol\Omega$ is the linearized collision operator. Its diagonal terms describe loss from a mode; its off-diagonal terms describe repopulation of other modes. The precise normalization of $\boldsymbol\Omega$, the driving term, and $\boldsymbol F$ varies among derivations and software packages, but the physical content is the same: thermal conductivity is controlled by the inverse collision operator projected onto the heat-current-carrying response.

## 7. RTA versus the full collision-operator solution

In the single-mode relaxation-time approximation (RTA), the off-diagonal mode coupling is neglected:

$$
\boldsymbol F_\lambda^{\mathrm{RTA}}
=\tau_\lambda\boldsymbol v_\lambda.
$$

The conductivity becomes

$$
\kappa_{\mathrm{RTA}}^{\alpha\beta}
=\frac{1}{V}\sum_\lambda
C_\lambda v_\lambda^{\alpha}
v_\lambda^{\beta}\tau_\lambda.
$$

For an isotropic material this reduces to the familiar kinetic form

$$
\kappa_{\mathrm{RTA}}
=\frac{1}{3V}\sum_\lambda
C_\lambda |\boldsymbol v_\lambda|^2\tau_\lambda.
$$

RTA is inexpensive and often physically informative, but it treats every scattering event as an independent tendency toward the stationary equilibrium distribution. It therefore misses much of the collective repopulation produced by momentum-conserving Normal processes.

Iterative, variational, or direct solvers retain the coupled collision operator. The difference between the full solution and RTA is especially important when Normal scattering is strong, although a large difference alone does not prove hydrodynamic transport. As discussed in the previous article, one must also examine the slow collective modes, resistive length scales, boundaries, and experimental geometry.

## 8. A defensible computational workflow

A reliable PBTE calculation is a sequence of convergence and validation problems, not a single command.

### 8.1 Relax the reference structure

Converge the equilibrium volume, cell shape, atomic positions, and—where relevant—magnetic state. Residual stress or forces alter the harmonic spectrum and can strongly affect low-frequency modes.

### 8.2 Converge the electronic calculation

Test the basis cutoff, electronic $\boldsymbol k$ mesh, smearing scheme, self-consistency threshold, pseudopotential or PAW dataset, and exchange-correlation functional. Convergence should be judged using forces, stress, and phonon-sensitive observables, not total energy alone.

### 8.3 Determine harmonic IFCs

Choose a supercell or reciprocal-space grid that captures the interaction range. Check translational and rotational invariance, acoustic modes near $\Gamma$, non-analytic corrections in polar materials, and agreement with measured or independently calculated dispersions when available.

### 8.4 Determine anharmonic IFCs

Converge supercell size, displacement magnitude, interaction cutoff, and regression settings. Enforce symmetry and sum rules carefully: corrections should reduce numerical noise without concealing an inadequate supercell or incomplete model.

### 8.5 Construct the collision operator

Include the scattering mechanisms required by the material and temperature range. Three-phonon plus isotope scattering is a common baseline, not a universal endpoint. Four-phonon scattering, temperature-renormalized phonons, electron--phonon scattering, defects, or boundaries may be necessary.

### 8.6 Solve and converge the PBTE

Converge the phonon $\boldsymbol q$ mesh, energy-conservation integration, and iterative-solver tolerance. Compare RTA and full solutions, and inspect tensor symmetry as well as scalar averages.

### 8.7 Validate more than total conductivity

Agreement in total $\kappa$ can result from compensating errors. Whenever possible, compare several quantities:

- phonon dispersion and density of states,
- mode Grüneisen parameters,
- heat capacity,
- phonon linewidths or lifetimes,
- temperature dependence of $\kappa$,
- directional anisotropy,
- and cumulative conductivity versus frequency or mean free path.

## 9. The numerical error budget

PBTE results should be reported with a convergence narrative. The dominant uncertainty can arise at several levels.

| Level | Typical source of uncertainty | Useful diagnostic |
| --- | --- | --- |
| Electronic structure | Functional, volume, pseudopotential, $\boldsymbol k$ mesh | Forces, stress, elastic constants, phonon frequencies |
| Harmonic IFCs | Supercell, long-range electrostatics, sum rules | Acoustic modes, dispersion, group velocities |
| Anharmonic IFCs | Displacement size, cutoff, regression, supercell | Grüneisen parameters, linewidth stability |
| BZ integration | $\boldsymbol q$ mesh, broadening or tetrahedra | $\kappa$ versus mesh and integration parameter |
| Collision physics | Missing four-phonon, electron, defect, or boundary terms | Temperature trend and mode-resolved rates |
| Transport model | RTA, iterative PBTE, coherence neglected | RTA/full comparison and mode-overlap analysis |

Reporting only the final value—for example, “$\kappa=150$ W m$^{-1}$ K$^{-1}$”—does not establish predictive accuracy. A convincing result shows that the important intermediate physics is stable and interpretable.

## 10. When the conventional PBTE is not enough

The standard phonon-gas PBTE relies on separable quasiparticle populations. It may need extension when:

- the sample size is comparable to important mean free paths and transport is nonlocal;
- boundaries and contacts control the distribution;
- anharmonicity strongly renormalizes frequencies with temperature;
- four-phonon scattering is comparable to three-phonon scattering;
- electron--phonon coupling contributes appreciably to phonon resistance;
- nearly degenerate modes carry heat through inter-mode coherence;
- or disorder is strong enough that propagating phonons are no longer the only useful excitations.

Finite devices may require spatially resolved BTE, Monte Carlo, deterministic transport, or Landauer approaches. Strongly anharmonic crystals may require self-consistent phonons or temperature-dependent effective potentials. Complex crystals and disordered solids may require a Wigner or density-matrix treatment that includes off-diagonal coherences.

The appropriate question is therefore not “Is PBTE accurate?” in isolation, but “Does the chosen PBTE contain the slow variables and scattering mechanisms relevant to this material, temperature, and geometry?”

## 11. Software as an implementation, not a substitute for validation

Widely used tools include **phonopy/phono3py**, **ShengBTE**, and related interfaces to electronic-structure codes such as VASP, Quantum ESPRESSO, ABINIT, and others. They automate important algebra and data handling, but they cannot decide whether an IFC cutoff is adequate, an imaginary mode is physical, or an omitted scattering mechanism matters.

A reproducible calculation should record at least:

- software versions and relevant compilation options,
- electronic-structure inputs and pseudopotential identifiers,
- relaxed structure,
- supercell matrices and displacement amplitudes,
- IFC cutoffs and fitting procedure,
- $\boldsymbol k$ and $\boldsymbol q$ meshes,
- integration and solver settings,
- and convergence data for the reported observables.

The goal is not merely to rerun the workflow, but to make the physical approximations auditable.

## 12. What the method really predicts

The first-principles PBTE is best understood as a chain of controlled reductions:

$$
\text{electronic ground state}
\longrightarrow
\text{energy derivatives and IFCs}
\longrightarrow
\text{phonon modes and interactions}
\longrightarrow
\text{collision operator}
\longrightarrow
\text{non-equilibrium distribution}
\longrightarrow
\boldsymbol\kappa.
$$

Each arrow introduces numerical choices and physical assumptions. The strength of the method is that those choices can be tested systematically and that the final conductivity can be decomposed into interpretable microscopic contributions.

The deepest result is not a single value of $\kappa$. It is an explanation of which excitations carry heat, which collisions destroy or redistribute their collective motion, and why a macroscopic transport coefficient emerges from the atomic-scale dynamics.

## References

1. S. Baroni, S. de Gironcoli, A. Dal Corso, and P. Giannozzi, “Phonons and related crystal properties from density-functional perturbation theory,” *Reviews of Modern Physics* **73**, 515–562 (2001).
2. D. A. Broido, M. Malorny, G. Birner, N. Mingo, and D. A. Stewart, “Intrinsic lattice thermal conductivity of semiconductors from first principles,” *Applied Physics Letters* **91**, 231922 (2007).
3. K. Esfarjani, G. Chen, and H. T. Stokes, “Heat transport in silicon from first-principles calculations,” *Physical Review B* **84**, 085204 (2011).
4. M. Omini and A. Sparavigna, “Beyond the isotropic-model approximation in the theory of thermal conductivity,” *Physical Review B* **53**, 9064–9073 (1996).
5. L. Chaput, “Direct solution to the linearized phonon Boltzmann equation,” *Physical Review Letters* **110**, 265506 (2013).
6. W. Li, J. Carrete, N. A. Katcho, and N. Mingo, “ShengBTE: A solver of the Boltzmann transport equation for phonons,” *Computer Physics Communications* **185**, 1747–1758 (2014).
7. A. Togo, L. Chaput, and I. Tanaka, “Distributions of phonon lifetimes in Brillouin zones,” *Physical Review B* **91**, 094306 (2015).
8. M. Simoncelli, N. Marzari, and F. Mauri, “Unified theory of thermal transport in crystals and glasses,” *Nature Physics* **15**, 809–813 (2019).

