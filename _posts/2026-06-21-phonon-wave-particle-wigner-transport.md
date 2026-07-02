---
layout: post
title: "Particle and Wave Nature of Phonon Transport: A Wigner-Equation View"
lang: en
translation_key: phonon-wave-particle-wigner-transport
permalink: /blog/2026/06/21/phonon-wave-particle-wigner-transport/
date: 2026-05-20 12:00:00
last_updated: 2026-06-21
reading_time: "13 min"
description: "How phonon populations and intermode coherences encode particle-like and wave-like heat transport, and how the Wigner equation unifies both contributions."
tags: theory phonon wigner-transport
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

Phonons are described both as quanta of lattice vibration and as quasiparticles that carry energy and scatter. These statements are compatible, but they retain different information.

The phonon Boltzmann equation assigns each mode a frequency, group velocity, population, and lifetime. Heat current arises from the drift of those populations. This is the particle picture. Yet lattice vibrations are waves: distinct eigenmodes can retain phase relationships, hybridize, and exchange energy through off-diagonal coherences. When those coherences survive on the transport time scale, knowing only how many phonons occupy each mode is no longer sufficient.

The earlier articles treated the [scale limits of Fourier's law]({{ '/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }}), [Normal and Umklapp collisions]({{ '/blog/2026/06/20/normal-umklapp-collective-heat-flow/' | relative_url }}), and the [first-principles PBTE workflow]({{ '/blog/2025/02/16/abinitio-bte/' | relative_url }}). This article follows a different thread: when populations are insufficient, how does the Wigner equation place particle propagation and wave coherence in one kinetic framework?

## A phonon is not forced to choose between particle and wave

For a periodic crystal, the harmonic dynamical matrix defines eigenmodes

$$
\lambda=(\boldsymbol q,s),
$$

with wave vector $\boldsymbol q$, branch index $s$, frequency $\omega_{\boldsymbol q s}$, and group velocity

$$
\boldsymbol v_{\boldsymbol q s}
=\nabla_{\boldsymbol q}\omega_{\boldsymbol q s}.
$$

If the only dynamical variable is the population $n_{\boldsymbol q s}$, a phonon behaves as a quasiparticle with energy $\hbar\omega_{\boldsymbol q s}$ that propagates at its group velocity and is redistributed by collisions. The conventional PBTE solves for the departure of these populations from equilibrium.

The wave description retains more. With $\hat a_{\boldsymbol q s}$ the annihilation operator of a normal mode, define the single-particle density matrix

$$
N_{ss'}(\boldsymbol q)
=\langle
\hat a_{\boldsymbol q s'}^{\dagger}
\hat a_{\boldsymbol q s}
\rangle.
$$

Its diagonal elements $N_{ss}$ are mode populations. Its off-diagonal elements $N_{ss'}$ encode phase correlations between vibrational branches. The particle picture is therefore not an alternative to wave mechanics; it is the reduced description obtained when the density matrix is effectively diagonal in the mode basis.

The useful question is not whether a phonon “really is” a particle or a wave. It is whether off-diagonal coherence can be eliminated before the heat current is formed at the material, temperature, and observation scale of interest.

## When populations cease to be sufficient

Two modes with widely separated frequencies accumulate relative phase rapidly. Their off-diagonal contribution usually averages away over transport times, leaving distinguishable modes whose populations and lifetimes are effective kinetic variables.

The separation becomes ambiguous when the mode spacing is comparable to the linewidth. Define

$$
\Delta\omega_{ss'}
=|\omega_s-\omega_{s'}|,
\qquad
\Gamma_{ss'}=\Gamma_s+\Gamma_{s'}.
$$

A useful qualitative warning sign is

$$
\Delta\omega_{ss'}\lesssim\Gamma_{ss'}.
$$

Within one scattering time, the system can no longer sharply resolve whether the excitation belongs to branch $s$ or $s'$. Large unit cells create dense phonon manifolds, local resonances produce flat or nearly degenerate bands, strong anharmonicity broadens the modes, and disorder weakens the identity of propagating quasiparticles. Each route can make coherence relevant to heat flow.

This does not mean that increasing linewidth always strengthens wave transport. Coherence reflects competition among mode mixing, frequency detuning, and dephasing. If linewidths are extremely narrow, separated modes average out through rapid relative phase rotation; if dephasing is too strong, coherence itself dies quickly. The crossover is most pronounced when spacing and broadening become comparable.

The phonon-gas model is thus natural for crystals with sparse, well-resolved bands and long-lived quasiparticles. Complex crystals and disordered solids may require populations and coherences together. This is a continuous spectral crossover, not a rigid division between classes of materials.

## What the Wigner transport equation retains

The Wigner description extends the density matrix into phase space through a matrix distribution

$$
\boldsymbol N(\boldsymbol r,\boldsymbol q,t).
$$

For temperature fields that vary slowly on the scale of a unit cell, but without discarding interbranch coherence, the phonon Wigner transport equation can be written as

$$
\frac{\partial\boldsymbol N}{\partial t}
+i[\boldsymbol\Omega,\boldsymbol N]
+\frac{1}{2}\sum_{\alpha}
\left\{
\boldsymbol V^{\alpha},
\frac{\partial\boldsymbol N}{\partial r_{\alpha}}
\right\}
=
\left.\frac{\partial\boldsymbol N}{\partial t}\right|_{\mathrm{coll}}.
$$

$\boldsymbol\Omega(\boldsymbol q)$ is the frequency matrix, $\boldsymbol V^{\alpha}(\boldsymbol q)$ is the velocity operator, and square and curly brackets denote a commutator and anticommutator.

The first term evolves the distribution in time. The commutator

$$
i[\boldsymbol\Omega,\boldsymbol N]
$$

describes phase precession between modes of different frequency. The anticommutator transports energy in real space and contains both diagonal group velocities and off-diagonal velocity matrix elements. The collision term relaxes and repopulates the diagonal populations while also dephasing the coherences.

The heat current is likewise a matrix quantity. Schematically,

$$
J^{\alpha}
=\frac{\hbar}{2VN_q}
\sum_{\boldsymbol q,ss'}
(\omega_s+\omega_{s'})
V^{\alpha}_{ss'}
N_{s's}.
$$

For $s=s'$, this is the familiar mode energy times group velocity times non-equilibrium population. For $s\ne s'$, heat current is carried through coherence between branches and off-diagonal velocity matrix elements. Both forms are present in the same equation.

## How two conductivity channels emerge from one equation

In linear response, the Wigner solution can be organized as

$$
\boldsymbol\kappa
=\boldsymbol\kappa_{\mathrm P}
+\boldsymbol\kappa_{\mathrm C},
$$

where $\boldsymbol\kappa_{\mathrm P}$ is the population contribution and $\boldsymbol\kappa_{\mathrm C}$ is the coherence contribution.

The population term reduces to the PBTE in its proper limit: heat capacities, group velocities, and collision-controlled mean free displacements determine the current. It represents energy carried by phonons propagating along bands between collisions.

The coherence term contains interbranch velocity matrix elements. Omitting convention-dependent prefactors, the contribution of a mode pair has the structure

$$
\kappa_{\mathrm C}^{\alpha\beta}
\sim
\sum_{\boldsymbol q}\sum_{s\ne s'}
A_{ss'}(T)
V_{ss'}^{\alpha}V_{s's}^{\beta}
\frac{\Gamma_s+\Gamma_{s'}}
{(\omega_s-\omega_{s'})^2
+(\Gamma_s+\Gamma_{s'})^2/4},
$$

where $A_{ss'}(T)$ contains the thermal weights from mode energies and equilibrium populations. The Lorentzian-like factor makes the physical condition transparent: coherence needs nonzero off-diagonal velocity coupling and becomes important when frequency separation and linewidth are comparable.

In a simple crystal with few branches and well-separated frequencies, $\kappa_{\mathrm C}$ is often small and the Wigner equation naturally reduces to phonon Boltzmann transport. As unit cells become more complex, bands become denser, or disorder increases, $\kappa_{\mathrm P}$ can weaken while $\kappa_{\mathrm C}$ grows. In the corresponding limits, the framework connects propagating-phonon Boltzmann transport with Allen–Feldman-like intermode transfer in disordered solids.

## Coherence is not the same as ballistic or hydrodynamic transport

Wigner coherence is off-diagonal in the branch indices near a given $\boldsymbol q$. Phonon hydrodynamics instead concerns collective drift of many populations under strong momentum-conserving Normal collisions. Hydrodynamic behavior can occur while the density matrix remains nearly diagonal in branch space. One problem concerns intermode phase; the other concerns collision invariants.

Ballistic transport is also not synonymous with wave transport. Ballistic means that carriers undergo few internal collisions across the device; a diagonal-population Boltzmann or Landauer model can describe it. Conversely, coherence can contribute in bulk materials with substantial scattering and finite linewidths.

Nanopillars, local resonators, and complex supercells create flat bands, avoided crossings, and near-degenerate modes, making Wigner analysis attractive. Yet observing a local resonance does not prove that $\kappa_{\mathrm C}$ dominates. One must examine frequency spacing, linewidths, off-diagonal velocity elements, and their thermal weights. Likewise, defining a “wave contribution” from the difference between molecular dynamics and particle Monte Carlo is an operational decomposition for a specific structure. It is related to, but not automatically identical with, the coherence conductivity $\kappa_{\mathrm C}$ of the Wigner framework.

A practical calculation should therefore follow a clear chain. The dynamical matrix provides frequencies, eigenvectors, and the full velocity matrix. Anharmonicity supplies linewidths or a more complete collision operator. The diagonal populations and off-diagonal coherences are then solved together, and $\kappa_{\mathrm P}$ and $\kappa_{\mathrm C}$ must each be converged. The scientifically useful result is not the statement that phonons have wave–particle duality, but which pairs of modes carry how much coherent heat at a given temperature and why that current cannot be absorbed into an independent-quasiparticle picture.

The value of the Wigner equation is precisely that it does not force a choice between “phonons are particles” and “phonons are waves.” Particle propagation is the diagonal dynamics of the density matrix; wave-like transport is its off-diagonal dynamics. They are two sectors of one quantum transport problem.

## References

1. E. Wigner, “On the Quantum Correction For Thermodynamic Equilibrium,” *Physical Review* **40**, 749–759 (1932).
2. R. E. Peierls, *Quantum Theory of Solids*, Oxford University Press (1955).
3. P. B. Allen and J. L. Feldman, “Thermal conductivity of disordered harmonic solids,” *Physical Review B* **48**, 12581–12588 (1993).
4. M. Simoncelli, N. Marzari, and F. Mauri, “Unified theory of thermal transport in crystals and glasses,” *Nature Physics* **15**, 809–813 (2019), doi: [10.1038/s41567-019-0520-x](https://doi.org/10.1038/s41567-019-0520-x).
5. M. Simoncelli, N. Marzari, and F. Mauri, “Wigner formulation of thermal transport in solids,” *Physical Review X* **12**, 041011 (2022), doi: [10.1103/PhysRevX.12.041011](https://doi.org/10.1103/PhysRevX.12.041011).
