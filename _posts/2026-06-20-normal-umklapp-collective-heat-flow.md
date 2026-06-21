---
layout: post
title: "Do Phonon Collisions Always Create Thermal Resistance? Normal, Umklapp, and Collective Heat Flow"
lang: en
translation_key: normal-umklapp-collective-heat-flow
permalink: /blog/2026/06/20/normal-umklapp-collective-heat-flow/
date: 2026-06-20 13:00:00
last_updated: 2026-06-20
reading_time: "15 min"
description: "Why Normal phonon scattering does not simply behave as thermal resistance, how Umklapp relaxes crystal momentum, and when phonons develop collective hydrodynamic flow."
tags: theory phonon thermal-transport
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

Scattering is often described as the microscopic origin of thermal resistance: a phonon travels, collides, loses memory of its motion, and the heat current decays. This picture is useful, but incomplete. Some phonon collisions conserve the collective crystal momentum and can organize phonons into a drifting state rather than simply destroying their flow.

The central question is therefore not merely **how frequently phonons collide**, but **which quantities a collision conserves and which slow collective motions it relaxes**.

This article builds on [From Microscopic Energy Transport to Fourier's Law]({{ '/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }}) and asks a sharper question: does every phonon collision produce thermal resistance?

## 1. Three-phonon scattering in reciprocal space

Anharmonicity allows phonons to be created and annihilated. For a three-phonon absorption process,

$$
\lambda_1+\lambda_2\rightarrow\lambda_3,
$$

energy and crystal momentum satisfy

$$
\omega_1+\omega_2=\omega_3,
$$

$$
\boldsymbol q_1+\boldsymbol q_2
=\boldsymbol q_3+\boldsymbol G,
$$

where $\boldsymbol G$ is a reciprocal-lattice vector. A decay process obeys the corresponding relations with one incoming and two outgoing phonons.

The distinction between Normal and Umklapp processes is kinematic:

- **Normal (N) process:** $\boldsymbol G=0$.
- **Umklapp (U) process:** $\boldsymbol G\neq0$.

Because wave vectors that differ by $\boldsymbol G$ represent equivalent points in a periodic crystal, both processes conserve crystal momentum modulo a reciprocal-lattice vector. However, only the N process conserves the sum of phonon wave vectors inside the chosen first Brillouin zone.

The familiar picture of an Umklapp event “flipping” the momentum is a useful geometric mnemonic, not a literal mechanical collision between particles. A phonon wave vector is a label of a lattice eigenmode, and crystal momentum is defined only modulo $\boldsymbol G$.

## 2. Crystal momentum is not the same as mechanical momentum

The total phonon crystal momentum may be written schematically as

$$
\boldsymbol P_{\mathrm{cr}}
=\frac{1}{V}\sum_\lambda
\hbar\boldsymbol q_\lambda n_\lambda.
$$

It is a conserved quantity associated with discrete translational symmetry. It should not be confused with the mechanical momentum of the entire crystal, which also includes the motion of the lattice and its center of mass.

The heat current is a different moment of the distribution:

$$
\boldsymbol J_Q
=\frac{1}{V}\sum_\lambda
\hbar\omega_\lambda
\boldsymbol v_\lambda n_\lambda.
$$

Thus, conservation of $\sum_\lambda\hbar\boldsymbol q_\lambda n_\lambda$ does not generally imply conservation of $\boldsymbol J_Q$. The two become proportional only in special cases—for example, within a simplified isotropic model with a single linear acoustic branch. Real crystals contain nonlinear dispersions, several polarizations, optical branches, and anisotropic group velocities.

This is the first important qualification:

> A Normal process conserves total crystal momentum, but it can still redistribute and partially relax heat current because heat current is not generally proportional to crystal momentum.

## 3. What Normal scattering actually does

Normal collisions rapidly exchange energy and momentum among phonon modes while preserving the total energy and crystal momentum. Repeated N scattering does not drive the system directly toward the stationary Bose--Einstein distribution

$$
n_\lambda^0
=\frac{1}{\exp(\hbar\omega_\lambda/k_BT)-1}.
$$

Instead, it drives phonons toward a **displaced Bose--Einstein distribution**,

$$
n_\lambda^{d}
=\frac{1}{
\exp\left[
(\hbar\omega_\lambda
-\hbar\boldsymbol q_\lambda\cdot\boldsymbol u_d)/k_BT
\right]-1},
$$

where $\boldsymbol u_d$ is a collective drift parameter. The displacement in reciprocal space represents a nonzero collective crystal momentum.

In this sense, N processes are analogous to momentum-conserving collisions among molecules in a fluid. Such collisions create local equilibrium and viscosity; they do not, by themselves, bring a moving fluid to rest.

This analogy also explains a subtle point: frequent N collisions can make individual phonon mean free paths short while allowing a collective heat-carrying drift to remain long-lived. A linewidth or single-mode lifetime is therefore not automatically a transport relaxation time.

## 4. What makes a process resistive?

A process is resistive if it relaxes the slow collective motion that overlaps with the heat current. Important mechanisms include

- Umklapp scattering,
- isotope and defect scattering,
- electron--phonon scattering when momentum is transferred to another subsystem,
- diffuse boundary scattering,
- and other mechanisms that remove crystal momentum from the drifting phonon distribution.

Umklapp processes are usually resistive because the phonon system transfers a reciprocal-lattice momentum to the lattice. Nevertheless, “U process” and “a fixed amount of thermal resistance” are not synonyms. The effect of an event depends on the participating modes, their heat-current contributions, and the full coupled collision operator.

Thermal resistance is most precisely connected to entropy production and decay of the driven non-equilibrium distribution—not merely to the number of scattering events.

## 5. The collision operator, not a list of lifetimes

After linearization, the steady phonon BTE can be written schematically as

$$
\boldsymbol b=\boldsymbol\Omega\boldsymbol f,
$$

where $\boldsymbol b$ is the temperature-gradient driving term, $\boldsymbol f$ describes the non-equilibrium modal response, and $\boldsymbol\Omega$ is the linearized collision operator. Thermal conductivity has the structure

$$
\kappa\sim
\langle \boldsymbol b,
\boldsymbol\Omega^{-1}\boldsymbol b\rangle.
$$

This expression contains the essential physics. The eigenvectors of $\boldsymbol\Omega$ are collective combinations of phonon populations. Conservation laws generate zero or slowly decaying eigenvectors. If the heat-current driving term overlaps strongly with one of these slow modes, thermal conductivity becomes large.

The single-mode relaxation-time approximation replaces $\boldsymbol\Omega$ by a diagonal matrix. It assigns each phonon an independent lifetime and therefore loses much of the repopulation and collective-drift physics created by off-diagonal couplings. This approximation can be adequate when resistive scattering dominates, but it may substantially underestimate conductivity when N scattering is strong.

The iterative BTE solution is not merely a numerical refinement. It restores the coupled response between modes.

## 6. Two relaxation tendencies

The Callaway picture separates two tendencies:

$$
\left.\frac{\partial n_\lambda}{\partial t}\right|_{N}
\sim-\frac{n_\lambda-n_\lambda^d}{\tau_{N,\lambda}},
$$

$$
\left.\frac{\partial n_\lambda}{\partial t}\right|_{R}
\sim-\frac{n_\lambda-n_\lambda^0}{\tau_{R,\lambda}}.
$$

N processes relax the distribution toward the drifting state $n^d$, whereas resistive processes relax it toward the stationary state $n^0$. The competition between these tendencies determines whether phonons behave mainly as independent quasiparticles or as a collective fluid.

This model is physically illuminating, although a modern first-principles collision operator need not be exactly representable by two scalar relaxation times.

## 7. From ballistic motion to phonon hydrodynamics

Define representative lengths

$$
\ell_N=v\tau_N,
\qquad
\ell_R=v\tau_R,
$$

where $\ell_N$ is the distance needed to establish collective local equilibrium and $\ell_R$ is the distance over which collective momentum is destroyed. For a channel of width $W$, three regimes can be distinguished schematically:

### Ballistic: $W\ll\ell_N$

Phonons reach the boundary before enough N collisions occur to establish a local drifting distribution. Boundary injection and transmission dominate.

### Hydrodynamic: $\ell_N\ll W\ll\ell_R$

Many N collisions establish local collective equilibrium, while resistive scattering remains weak across the device. Momentum is redistributed internally and is lost mainly at boundaries. A viscous, Poiseuille-like heat-flow profile can emerge.

### Diffusive: $W\gg\ell_R$

Resistive events destroy the collective drift well inside the sample. Local Fourier behavior is recovered at sufficiently large scales.

These inequalities are a regime map rather than sharp universal boundaries. A real phonon spectrum contains many velocities and relaxation lengths, and boundary specularity can substantially shift the crossover.

## 8. Observable signatures of collective flow

Strong N scattering can produce phenomena that cannot be understood as a gas of independently relaxing phonons:

### Poiseuille heat flow

Momentum-conserving collisions redistribute momentum across a channel. With momentum loss at the walls, the heat-flux profile can become largest at the center and suppressed near the boundaries, analogous to viscous fluid flow.

### Second sound

If momentum relaxes slowly enough, temperature and heat flux can propagate as a damped wave rather than diffuse monotonically. N processes help establish the local drifting state that supports this collective mode; resistive processes damp it.

### Non-monotonic size dependence

Moving from ballistic to hydrodynamic transport can produce a Knudsen minimum or a faster-than-ballistic growth of effective conductivity with width over a limited range. The precise signature depends on geometry and scattering spectra.

None of these effects follows from the statement “N scattering is non-resistive” alone. They arise from the hierarchy of N, resistive, and boundary time scales.

## 9. Four common misconceptions

### “Every collision lowers thermal conductivity”

False. Momentum-conserving collisions can establish collective local equilibrium and redistribute momentum without directly destroying the drift.

### “Normal scattering never relaxes heat current”

Also false in general. It conserves crystal momentum, not heat current. With nonlinear, multibranch dispersions, the two are not proportional.

### “Umklapp rate is the transport resistance”

Incomplete. U scattering is an important momentum-relaxing mechanism, but conductivity depends on how the complete collision operator acts on the driven distribution.

### “The shortest phonon lifetime controls heat transport”

Not necessarily. A short single-mode lifetime can result from rapid N redistribution while a collective drift remains long-lived.

## 10. Consequences for first-principles calculations

When N processes are important, several computational choices become physically significant:

1. **Compare RTA and iterative BTE results.** A large difference signals strong mode repopulation and possible collective transport.
2. **Separate scattering channels.** Inspect N, U, isotope, defect, and boundary contributions rather than only total linewidths.
3. **Converge long-wavelength modes carefully.** Hydrodynamic transport is often sensitive to fine $\boldsymbol q$ meshes and rare resistive events.
4. **Do not equate linewidth with transport relaxation.** Spectroscopic decay and heat-current decay probe different projections of the collision operator.
5. **Include geometry explicitly.** A bulk conductivity alone cannot predict Poiseuille flow or boundary-controlled momentum loss.

## 11. The physical answer

Do phonon collisions always create thermal resistance? **No.**

Normal scattering conserves crystal momentum and can drive phonons toward a collectively drifting distribution. It often redistributes heat current rather than directly eliminating it. Resistive mechanisms are needed to destroy that drift and produce entropy associated with steady thermal resistance.

But the stronger statement “Normal scattering has no effect on thermal resistance” is also wrong. Heat current is not generally identical to crystal momentum, and N processes reshape the non-equilibrium distribution on which resistive processes act. They can therefore change thermal conductivity profoundly and even create an entirely different transport regime.

The correct hierarchy is

$$
\text{collision kinematics}
\rightarrow
\text{conserved quantities}
\rightarrow
\text{slow collective modes}
\rightarrow
\text{thermal resistance}.
$$

Counting collisions is not enough. One must ask what the collisions conserve.

## References

1. R. E. Peierls, “Zur kinetischen Theorie der Wärmeleitung in Kristallen,” *Annalen der Physik* **395**, 1055–1101 (1929).
2. J. Callaway, “Model for Lattice Thermal Conductivity at Low Temperatures,” *Physical Review* **113**, 1046–1051 (1959).
3. J. M. Ziman, *Electrons and Phonons*, Oxford University Press (1960).
4. R. A. Guyer and J. A. Krumhansl, “Thermal Conductivity, Second Sound, and Phonon Hydrodynamic Phenomena in Nonmetallic Crystals,” *Physical Review* **148**, 778–788 (1966).
5. M. Omini and A. Sparavigna, “Beyond the isotropic-model approximation in the theory of thermal conductivity,” *Physical Review B* **53**, 9064–9073 (1996).
6. A. Cepellotti *et al.*, “Phonon hydrodynamics in two-dimensional materials,” *Nature Communications* **6**, 6400 (2015).
7. S. Lee *et al.*, “Hydrodynamic phonon transport in suspended graphene,” *Nature Communications* **6**, 6290 (2015).
8. S. Huberman *et al.*, “Observation of second sound in graphite at temperatures above 100 K,” *Science* **364**, 375–379 (2019).
