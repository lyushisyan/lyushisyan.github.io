---
layout: post
title: "Why Do Phonon Frequencies Change with Temperature? From QHA to Self-Consistent Phonons"
lang: en
translation_key: temperature-dependent-phonon-frequencies
permalink: /blog/2026/09/11/temperature-dependent-phonon-frequencies/
date: 2026-09-11 12:00:00
last_modified_at: 2026-09-11
reading_time: "13 min"
description: "Why harmonic phonons have no explicit temperature dependence, and how thermal expansion, quartic self-consistent renormalization, and cubic bubble self-energy produce finite-temperature shifts and linewidths."
tags: theory phonon anharmonicity
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

Many first-principles calculations produce a single phonon dispersion at the equilibrium structure and then use it at 300 K, 500 K, or even higher temperatures. That may seem surprising. As temperature rises, a crystal expands, atomic displacements grow, and phonon–phonon interactions become stronger. Why should the frequencies remain unchanged?

The calculation usually returns **harmonic frequencies for a fixed structure and a fixed set of second-order force constants**. Temperature is not a missing input parameter; the physical mechanisms that create temperature dependence have been excluded from the model. At least two effects must be distinguished:

1. temperature changes the equilibrium structure and therefore its harmonic frequencies;
2. even at fixed structure, anharmonic fluctuations renormalize phonon energies and broaden their spectral peaks.

The quasiharmonic approximation (QHA) primarily describes the first effect. Self-consistent phonon theory (SCP/SCPH) and phonon self-energies address the second. This article follows that division to explain how temperature enters a phonon spectrum and why frequency shift, linewidth, and lifetime are related but different quantities.

The discussion complements the earlier guides to the [first-principles PBTE workflow]({{ '/blog/2025/02/16/abinitio-bte/' | relative_url }}) and [Wigner phonon transport]({{ '/blog/2026/06/21/phonon-wave-particle-wigner-transport/' | relative_url }}). Velocities, scattering rates, and intermode coherence all depend on which phonon spectrum is used.

## Why harmonic frequencies have no explicit temperature

Near a reference structure, the Born–Oppenheimer potential energy can be expanded in atomic displacements:

$$
U
=
U_0
+\frac{1}{2!}\sum_{ij}\Phi_{ij}^{(2)}u_i u_j
+\frac{1}{3!}\sum_{ijk}\Phi_{ijk}^{(3)}u_i u_j u_k
+\frac{1}{4!}\sum_{ijkl}\Phi_{ijkl}^{(4)}u_i u_j u_k u_l
+\cdots .
$$

A conventional harmonic calculation retains only the second-order force constants $\Phi^{(2)}$. They define the dynamical matrix

$$
D_{\alpha\beta}^{\kappa\kappa'}(\mathbf q)
=
\frac{1}{\sqrt{M_\kappa M_{\kappa'}}}
\sum_l
\Phi_{\alpha\beta}^{(2)}(0\kappa,l\kappa')
e^{i\mathbf q\cdot(\mathbf R_l+\boldsymbol\tau_{\kappa'}-\boldsymbol\tau_\kappa)},
$$

whose eigenvalue problem is

$$
D(\mathbf q)e_{\mathbf q\nu}
=
\omega_{\mathbf q\nu}^{2}e_{\mathbf q\nu}.
$$

If the reference structure, atomic masses, and $\Phi^{(2)}$ remain fixed, so do the frequencies $\omega_{\mathbf q\nu}$. The Bose–Einstein population

$$
n_{\mathbf q\nu}(T)
=
\frac{1}
{\exp(\hbar\omega_{\mathbf q\nu}/k_BT)-1}
$$

does depend on temperature, but changing the population does not feed back into the dynamical matrix in a purely harmonic model. Zero-point motion contributes to the vibrational free energy and mean-square displacement, yet it does not renormalize a strictly harmonic spectrum.

A “0 K phonon dispersion” is therefore more precisely a **harmonic dispersion calculated at a chosen zero-temperature reference structure**. It is not a statement that the real finite-temperature spectrum must be identical.

## QHA: temperature first changes the equilibrium structure

QHA retains a harmonic description at every fixed structure while allowing the frequencies to vary with volume:

$$
\omega_{\mathbf q\nu}
=
\omega_{\mathbf q\nu}(V).
$$

A typical calculation evaluates static energies and phonon spectra for several volumes $V_i$, then constructs the Helmholtz free energy

$$
F(V,T)
=
E_0(V)+F_{\mathrm{ph}}(V,T),
$$

with

$$
F_{\mathrm{ph}}(V,T)
=
\sum_{\mathbf q\nu}
\left[
\frac{1}{2}\hbar\omega_{\mathbf q\nu}(V)
+k_BT\ln\!\left(
1-e^{-\hbar\omega_{\mathbf q\nu}(V)/k_BT}
\right)
\right].
$$

At external pressure $P$, the equilibrium volume minimizes the Gibbs free energy

$$
G(V,T;P)=F(V,T)+PV.
$$

At zero pressure this reduces to finding the minimum of $F(V,T)$. Once $V(T)$ is known, the temperature-dependent QHA spectrum is interpolated from the volume-dependent calculations:

$$
\omega_{\mathbf q\nu}^{\mathrm{QHA}}(T)
=
\omega_{\mathbf q\nu}[V(T)].
$$

The simplest QHA varies only volume. Generalized treatments can use lattice parameters or strain coordinates for anisotropic materials. The causal chain is the same:

$$
T
\longrightarrow
\text{equilibrium structure}
\longrightarrow
\Phi^{(2)}
\longrightarrow
\omega_{\mathbf q\nu}.
$$

Temperature acts through structural relaxation rather than appearing directly in a fixed-structure dynamical matrix.

### Mode Grüneisen parameters

The mode Grüneisen parameter measures the sensitivity of a phonon frequency to volume:

$$
\gamma_{\mathbf q\nu}
=
-\frac{V}{\omega_{\mathbf q\nu}}
\frac{\partial\omega_{\mathbf q\nu}}{\partial V}.
$$

A positive $\gamma_{\mathbf q\nu}$ usually means that expansion softens the mode. A negative value means that expansion can harden it; such modes can contribute strongly to low-temperature negative thermal expansion in some materials.

The Grüneisen parameter describes motion along a structural coordinate. It does not by itself contain the intrinsic temperature renormalization produced by phonon–phonon interactions at fixed volume.

### Where QHA becomes insufficient

QHA often works well when thermal expansion is moderate, phonon quasiparticles are well defined, and intrinsic anharmonic corrections are small. It requires care when

- atomic displacements become large at high temperature;
- soft modes or structural phase transitions are present;
- the reference structure has imaginary harmonic modes and therefore no stable harmonic free energy;
- substantial shifts remain at fixed volume;
- linewidths become comparable to neighboring mode spacings.

QHA uses second-order force constants evaluated at different structures. It can capture expansion generated by an anharmonic energy landscape, but it does not explicitly solve the phonon self-energy produced by higher-order force constants.

## SCPH: a temperature-dependent effective harmonic system

SCPH replaces the original harmonic problem by an effective one whose dynamical matrix depends on temperature:

$$
D_{\mathrm{eff}}(\mathbf q,T)
e_{\mathbf q\nu}(T)
=
\Omega_{\mathbf q\nu}^{2}(T)
e_{\mathbf q\nu}(T).
$$

The eigenvalues $\Omega_{\mathbf q\nu}(T)$ are renormalized phonon frequencies. Unlike QHA frequencies, they can change at fixed volume because thermal fluctuations enter through higher-order force constants.

A one-dimensional quartic oscillator makes the self-consistency transparent:

$$
U(x)
=
\frac{1}{2}kx^2+\frac{1}{4}\lambda x^4.
$$

A thermal average of the curvature gives

$$
k_{\mathrm{eff}}(T)
=
k+3\lambda\langle x^2\rangle_T,
$$

so that

$$
M\Omega^2(T)
=
k+3\lambda\langle x^2\rangle_T.
$$

The quantum mean-square displacement depends on the unknown effective frequency:

$$
\langle x^2\rangle_T
=
\frac{\hbar}{2M\Omega(T)}
\coth\!\left[
\frac{\hbar\Omega(T)}{2k_BT}
\right].
$$

This creates a closed loop:

$$
\Omega(T)
\longrightarrow
\langle x^2\rangle_T
\longrightarrow
k_{\mathrm{eff}}(T)
\longrightarrow
\Omega(T).
$$

Starting from a trial frequency, the calculation updates each quantity until input and output agree. The same expression shows that quartic anharmonicity can renormalize a frequency through zero-point fluctuations even at $T=0$.

In a real crystal, the scalar relation becomes a matrix equation coupling phonon modes. Common SCPH implementations treat the loop contribution from fourth-order interatomic force constants self-consistently, yielding temperature-dependent effective second-order force constants and eigenvectors. An imaginary harmonic mode in a strongly anharmonic phase can sometimes become a stable real-frequency excitation after finite-temperature renormalization. This is not an automatic cure for every imaginary mode: the reference phase, force-constant convergence, and phase-transition physics must still be checked.

## Cubic anharmonicity: one self-energy produces shifts and linewidths

If displacements are measured from the thermally averaged equilibrium position, $\langle u\rangle_T=0$, the cubic term does not survive a simple first-order curvature average in the way the quartic term does. Two cubic vertices can, however, combine at second order to form a bubble self-energy. Schematically,

$$
\lambda
\longrightarrow
(\lambda_1,\lambda_2)
\longrightarrow
\lambda.
$$

The cubic phonon self-energy depends on temperature and external frequency:

$$
\Sigma_\lambda^{(3)}(\omega,T)
=
\operatorname{Re}\Sigma_\lambda^{(3)}(\omega,T)
+i\operatorname{Im}\Sigma_\lambda^{(3)}(\omega,T).
$$

For a weakly damped, well-defined phonon quasiparticle,

$$
\operatorname{Re}\Sigma_\lambda^{(3)}
\longrightarrow
\Delta\Omega_\lambda,
$$

while

$$
-\operatorname{Im}\Sigma_\lambda^{(3)}
\longrightarrow
\Gamma_\lambda,
\qquad
\tau_\lambda\propto\Gamma_\lambda^{-1}.
$$

Exact prefactors depend on the self-energy and linewidth convention. The physical distinction is robust: the real part moves the spectral peak, while the imaginary part gives its width and finite lifetime. The same cubic interaction therefore changes phonon frequencies and produces three-phonon scattering.

Evaluating the bubble self-energy at $\omega=0$ gives the static-bubble approximation. Retaining its full frequency dependence gives the dynamic bubble, which can describe peak positions, widths, and even non-Lorentzian line shapes when coupling becomes strong. A static correction is useful for estimating frequency shifts but discards the full dynamical spectral information.

Organizing fourth-order effects as an SCPH loop and third-order effects as a bubble is a common lowest-order treatment rather than an absolute division. Higher-order terms, four-phonon scattering, and coupling between thermal expansion and intrinsic renormalization can all matter at high temperature or in strongly anharmonic systems.

## Three meanings of “phonon frequency”

A statement that phonon frequencies change with temperature should specify which quantity is meant:

1. **Harmonic frequency** $\omega_{\mathbf q\nu}$: obtained from second-order IFCs at a fixed reference structure;
2. **QHA frequency** $\omega_{\mathbf q\nu}[V(T)]$: obtained after the equilibrium structure changes with temperature;
3. **Anharmonically renormalized frequency** $\Omega_{\mathbf q\nu}(T)$: includes the fixed-structure phonon self-energy.

Inelastic neutron, x-ray, and Raman experiments usually probe the peak positions and widths of a finite-temperature spectral function. A single zero-temperature harmonic dispersion is often insufficient for comparison. One should state whether thermal expansion, intrinsic anharmonic shifts, and instrumental or physical linewidths have been included.

For the transverse-optical mode at the X point of silicon, calculations by Masuki and co-workers show that QHA, SCPH, and SCPH plus a static bubble give different temperature shifts. Intrinsic anharmonic corrections can be comparable to the QHA contribution. QHA may therefore reproduce an overall trend without accurately describing the microscopic shift of every mode.

## Choosing a method

| Goal | Reasonable starting point | Main output | Main limitation |
|---|---|---|---|
| Baseline spectrum of a stable crystal | Harmonic calculation | $\omega_{\mathbf q\nu}$ and eigenvectors | No explicit temperature shift or linewidth |
| Thermal expansion and its frequency shift | QHA | $V(T)$, $\alpha(T)$, and $\omega[V(T)]$ | Omits intrinsic fixed-structure renormalization |
| Strong anharmonic frequency renormalization | SCPH | $\Omega_{\mathbf q\nu}(T)$ and renormalized eigenvectors | Requires converged higher-order IFCs and self-consistency |
| Cubic shifts and lifetimes | SCPH plus bubble | Peak shifts, $\Gamma_\lambda(T)$, and $\tau_\lambda(T)$ | Dynamic self-energies are expensive; quasiparticles may fail under strong damping |

Practical calculations should test electronic-structure settings, displacement supercells, higher-order IFC cutoffs, $\mathbf q$ meshes, and self-consistency thresholds separately. If a linewidth is already comparable to the spacing between neighboring branches, a single “renormalized frequency” may also be inadequate; the full spectral function or a density-matrix and Wigner description may be needed.

Temperature dependence is therefore not created by attaching a temperature parameter to the harmonic dynamical matrix. Temperature changes the equilibrium structure through thermal expansion and modifies effective restoring forces and phonon self-energies through anharmonic fluctuations. QHA, SCPH, and bubble corrections retain different parts of this causal chain:

$$
\boxed{
\text{thermal expansion}
+
\text{quartic self-consistent renormalization}
+
\text{cubic dynamical self-energy}
\;\Longrightarrow\;
\text{finite-temperature phonon spectrum}
}
$$

## References

1. S. Wei, C. Li, and M. Y. Chou, “Ab initio calculation of thermodynamic properties of silicon,” *Physical Review B* **50**, 14587–14596 (1994), doi: [10.1103/PhysRevB.50.14587](https://doi.org/10.1103/PhysRevB.50.14587).
2. L.-F. Huang, X.-Z. Lu, E. Tennessen, and J. M. Rondinelli, “An efficient ab-initio quasiharmonic approach for the thermodynamics of solids,” *Computational Materials Science* **120**, 84–93 (2016), doi: [10.1016/j.commatsci.2016.04.012](https://doi.org/10.1016/j.commatsci.2016.04.012).
3. D. S. Kim *et al.*, “Nuclear quantum effect with pure anharmonicity and the anomalous thermal expansion of silicon,” *Proceedings of the National Academy of Sciences* **115**, 1992–1997 (2018), doi: [10.1073/pnas.1707745115](https://doi.org/10.1073/pnas.1707745115).
4. T. Tadano and S. Tsuneyuki, “Self-consistent phonon calculations of lattice dynamical properties in cubic SrTiO$_3$ with first-principles anharmonic force constants,” *Physical Review B* **92**, 054301 (2015), doi: [10.1103/PhysRevB.92.054301](https://doi.org/10.1103/PhysRevB.92.054301).
5. T. Tadano and S. Tsuneyuki, “First-Principles Lattice Dynamics Method for Strongly Anharmonic Crystals,” *Journal of the Physical Society of Japan* **87**, 041015 (2018), doi: [10.7566/JPSJ.87.041015](https://doi.org/10.7566/JPSJ.87.041015).
6. R. Masuki, T. Nomoto, R. Arita, and T. Tadano, “Anharmonic Grüneisen theory based on self-consistent phonon theory: Impact of phonon-phonon interactions neglected in the quasiharmonic theory,” *Physical Review B* **105**, 064112 (2022), doi: [10.1103/PhysRevB.105.064112](https://doi.org/10.1103/PhysRevB.105.064112).
7. J. Bouchet, F. Bottin, D. Antonangeli, and G. Morard, “Sound velocities and thermodynamical properties of hcp iron at high pressure and temperature,” *Journal of Physics: Condensed Matter* **34**, 344002 (2022), doi: [10.1088/1361-648X/ac792f](https://doi.org/10.1088/1361-648X/ac792f).
