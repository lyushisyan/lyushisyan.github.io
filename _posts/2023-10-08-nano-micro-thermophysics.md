---
layout: post
title: Microscopic Description of Thermophysics
date: 2023-10-08 00:32:13
description: A microscopic view of heat transfer, covering energy carriers, distribution functions, and fundamental constants.
tags: heat-transfer physics thermodynamics microscopic
categories: physics
related_posts: true
toc:
  sidebar: left
---

The macroscopic energy conservation equation in heat transfer describes the storage, transport (conduction $k$, convection $u$, and radiation $r$), and conversion of thermal energy into other forms of energy.

## Energy Conservation Equation

$$
\nabla\cdot \boldsymbol q=-\rho c_p\frac{\partial T}{\partial t}+\sum_{i,j}\dot s_{i-j},
\nabla\cdot \boldsymbol q=\frac{\int_{\Delta A}(\boldsymbol q\cdot\boldsymbol s_{\boldsymbol n})dA}{\Delta V \to 0}
$$

Here, $\rho c_p\frac{\partial T}{\partial t}$ is referred to as sensible heat storage, and $\dot s_{i-j}$ is the rate of energy conversion due to interactions between energy carriers $i$ and $j$, determined by their properties and frequency of interaction.

The heat flux vector $\boldsymbol q$ is the sum of conduction, convection, and radiation heat flux vectors:

$$
\boldsymbol q = \boldsymbol q_k + \boldsymbol q_u + \boldsymbol q_r
$$

**Conduction heat flux vector** $\boldsymbol q_k$ is the negative product of thermal conductivity $k$ and temperature gradient $\nabla T$, according to Fourier's law:

$$
\boldsymbol q_k = -k\nabla T
$$

**Convection heat flux vector** $\boldsymbol q_u$ is the product of $\rho c_p$, local velocity vector $\boldsymbol u$, and temperature $T$:

$$
\boldsymbol q_u = \rho c_p\boldsymbol u T
$$

**Radiative heat flux vector** $\boldsymbol q_r$ is the integral over space and electromagnetic spectrum of the product of unit vector $\boldsymbol s$ and directional spectral intensity $I_{ph,\omega}$:

$$
\boldsymbol q_r  = 2\pi\int_0^\infty\int_{-1}^1\boldsymbol s I_{ph,\omega}d\mu d\omega
$$

## Primary Energy Carriers

Four types of energy carriers—**phonons** ($p$), **electrons** ($e$), **fluid particles** ($f$), and **photons** ($ph$)—form the microscopic basis for thermal energy storage, transport, and interaction.

### Phonons

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_1.png" zoomable=true caption="Figure 1: Phonons" class="w-75" %}
</div>

* Phonons are quantized vibrational modes in a rigid atomic lattice.
* Long-wavelength phonons cause sound propagation in solids, hence the name "phonons."
* Phonons determine many physical properties of materials, including heat capacity and thermal/electrical conductivity (phonons transport heat in insulators).
* In classical mechanics, lattice vibrations decompose into nonlocal normal modes.
* Quantum mechanically, these modes exhibit particle-like behavior—hence phonons are **quasiparticles**.
* As particles, phonons are **bosons** with zero spin, and their energy $E_p=\hbar\omega_p$ is the sum of kinetic and potential energies.
* Phonons come in two types: **acoustic** ($A$) and **optical** ($O$).
* Acoustic phonons decrease in frequency with increasing wavelength and correspond to lattice sound waves. Longitudinal and transverse types are abbreviated $LA$ and $TA$.
* Optical phonons arise in lattices with multiple atoms per unit cell and are excited by light in ionic crystals: $LO$ and $TO$ indicate longitudinal and transverse types.

### Electrons

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_2.png" zoomable=true caption="Figure 2: Electrons" class="w-75" %}
</div>

* Electrons are negatively charged **subatomic particles** with spin $1/2$—they are **fermions**.
* The electron's antiparticle is the **positron**, with the same mass and spin but opposite charge.
* Electrons exhibit both wave and particle properties, making them **quasiparticles**.
* Bound electrons appear as **standing waves**, observable experimentally.
* Electrons in solids include core and outer electrons. Core electrons are tightly bound and do not participate in bonding.
* Outer electrons, including **conduction** and **valence** electrons, are farther from the nucleus.
* Quantum mechanically, electrons are described by the **Dirac equation**.
* Their energy includes potential energy (binding energy) and kinetic energy (velocity-related).

### Fluid Particles

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_3.png" zoomable=true caption="Figure 3: Fluid Particles" class="w-75" %}
</div>

* Gases and liquids consist of atoms or molecules (fluid particles), which can be neutral or charged and are in **random motion**.
* Their energy includes potential, electronic, and kinetic components.
* In **ideal gases**, particle collisions are **elastic**, and intermolecular forces are negligible.
* Maxwell–Boltzmann distribution for ideal gases can be derived via statistical mechanics and energy symmetry principles.
* Liquid particles have sufficient kinetic energy to stretch but not overcome intermolecular forces. As temperature rises, they gain enough energy to become gases.

### Photons

<div class="text-center">
  {% include figure.liquid path="assets/img/blog/thermophysics_4.png" zoomable=true caption="Figure 4: Photons" class="w-75" %}
</div>

* Photons are quantum excitations of the electromagnetic field and are part of the Standard Model of particle physics.
* Quantum mechanically, photons exhibit wave properties.
* Although photons have **zero rest mass**, they carry finite energy and are affected by gravity (relativity).
* Photons are **bosons** with spin 1 and exhibit circular polarization.
* Electromagnetic fields consist of **monochromatic plane waves** characterized by frequency $f_{ph}$, wavelength $\lambda_{ph}$, and speed $u_{ph}$.
* Quantum energy: $E_{ph} = \hbar \omega_{ph}$; momentum: $\boldsymbol p_{ph} = \hbar \boldsymbol\kappa_{ph}$.
* In vacuum, photon dispersion is linear—proportional to **Planck's constant**.
* Matter excitations have nonlinear dispersion, so they travel slower than light.

## Energy Distribution Function

In multi-particle systems, the observed **macroscopic state** (ensemble average) is linked to each particle's **microscopic state** (position and momentum) through the probability of occurrence (energy distribution function):

$$
\left \langle \phi \right \rangle=\sum_if_i\phi_i
$$

Probability distribution functions determine carrier energy and transport characteristics. They allow modeling of temperature-dependent lattice and electronic heat capacity, gas kinetic energy, and blackbody radiation.

Equilibrium distribution $f_i^0$ describes the most likely distribution of microstates in the absence of perturbations:

* **Bose–Einstein distribution** (phonons, photons)

$$
f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text BT})-1}
$$

* **Fermi–Dirac distribution** (electrons)

$$
f_i^0 = \frac{1}{\exp(\frac{E_i-\mu}{k_\text BT})+1}
$$

* **Maxwell–Boltzmann distribution** (ideal gas molecules)

$$
f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text BT})}
$$

Deviations from equilibrium underpin carrier transport—**Boltzmann transport theory**.

## Particles, Waves, and Quasiparticles

### Particles

Particles are **discrete**; their energy is localized in finite regions. To reach different positions, particles must move according to kinematic laws.

Interactions follow simple rules like conservation of energy and momentum in elastic collisions. When unperturbed, particles move **ballistically**.

### Waves

Waves are not finite entities. Their energy is distributed across space and time. Waves propagate indefinitely, with phase analysis revealing their speed. Waves are described by frequency and wavelength.

### Quasiparticles

Quasiparticles (phonons, electrons, photons) exhibit both particle and wave nature and are described as wave packets—a superposition of plane waves with different wavelengths.

This dual nature is called **wave–particle duality**.

The classical distinction between particles and waves blurs for quasiparticles. Their behavior is part wave theory, part particle theory.

## Contributions to Heat Transfer Physics

Heat is a form of energy manifested as molecular motion and is transferred between bodies via **conduction** (phonons, electrons, fluid particles), **convection** (fluid particles), and **radiation** (photons).

Key physical foundations:

* **Boltzmann**: Proposed that heat capacity, entropy, and thermodynamics arise from atomic motion; introduced Boltzmann constant $k_B$ and co-developed energy equipartition theorem.
* **Maxwell**: Founded electromagnetic theory of light; contributed to kinetic gas theory, molecular physics, thermodynamics.
* **Planck**: Discovered energy is **quantized**, postulating discrete energy quanta $h\nu$.
* **Bohr**: Suggested atoms absorb/emit quantum energy matching energy level differences.
* **Pauli**: Formulated **Pauli exclusion principle**: no two electrons can occupy the same state.
* **Schrödinger**: Derived wave function (probability wave) equation foundational to **quantum wave mechanics**.
* **Fermi**: Developed method (with Dirac) for particles following Pauli principle—**Fermi statistics**.
* **Green & Kubo**: Developed **fluctuation–dissipation theorem** for transport coefficients.
* **Ziman**: Applied variational method to phonon transport.
* **Callaway & Holland**: Modeled lattice thermal conductivity via **single-mode relaxation time**.

## Fundamental Constants and Fine Structure Scale

### Boltzmann Constant

$$
k_\text B=1.38065\times10^{-23} ~ \text J/\text K
$$

Relates mean thermal energy of carriers (phonons, electrons, photons, fluids) to absolute temperature $T$.

Used to normalize carrier energy: $k_\text BT$.

In statistical mechanics: entropy $S=k_\text BN\ln Z$, with $Z$ as the partition function.

In kinetic theory: each degree of freedom has energy $k_\text BT/2$ (equipartition).

### Planck Constant

$$
h=6.626069\times10^{−34} ~ \text J\cdot \text s
$$

In quantum mechanics: energy = frequency $\times$ $h$.

Reduced Planck constant: $\hbar = h/2\pi$.

Quantizes physical properties and appears in Heisenberg uncertainty principle: $\Delta p_x \Delta x \le \hbar/2$.

### Atomic Units

Four constants define atomic units: $\hbar$, $m_e$, Coulomb constant $1/4\pi\varepsilon_0$, electron charge $e_c$.

* Atomic length:

$$
r_\text B = \frac{4\pi\varepsilon_0\hbar^2}{m_e e_c^2}=5.2918\times 10^{-11}~ \text m
$$

* Atomic time:

$$
\tau_a=\frac{m_er_\text B^2}{\hbar} = 2.4189\times 10^{-17} ~ \text s
$$

* Atomic energy:

$$
\frac{e_c^2}{4\pi\varepsilon_0r_\text B}=4.3597\times10^{-18}\text J=27.211~ \text{eV}
$$

* Atomic velocity:

$$
\frac{r_\text B}{\tau_a} = 2.1877 \times 10^6~ \text m/\text s
$$

* Atomic dipole moment:

$$
e_cr_\text B=8.4783\times 10^{-30}~ \text C\cdot\text m
$$

---

**References:**

Kaviany M. *Heat Transfer Physics*, 2008