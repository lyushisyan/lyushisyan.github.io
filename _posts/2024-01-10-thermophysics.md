---
layout: post
title: Microscopic Description of Thermal Physics
date: 2024-01-01 00:32:13
description: This method is based on Density Functional Perturbation Theory.
tags: Physics Theory
categories: study
tabs: true
---

The macroscopic energy conservation equation in heat transfer describes the storage, transfer (thermal conduction $$k$$, thermal convection $$u$$, and thermal radiation $$r$$), and conversion of thermal energy with other forms of energy.

1. **Energy Conservation**:

$$
\nabla\cdot \boldsymbol q=-\rho c_p\frac{\partial T}{\partial t}+\sum_{i,j}\dot s_{i-j},
\nabla\cdot \boldsymbol q=\frac{\int_{\Delta A}(\boldsymbol q\cdot\boldsymbol s_{\boldsymbol n})dA}{\Delta V \to 0}
$$

Here, $\rho c_p\frac{\partial T}{\partial t}$ is referred to as sensible heat storage, and $\dot s_{i-j}$ represents the energy conversion rate of thermal energy, determined by the nature and frequency of interactions between energy carriers $i$ and $j$.

1. **Heat Flux Vector**:

$$
\boldsymbol q = \boldsymbol q_k + \boldsymbol q_u + \boldsymbol q_r
$$

The heat flux vector $\boldsymbol q$ is the sum of conductive, convective, and radiative heat flux vectors.

**Conductive Heat Flux Vector**:
$$
\boldsymbol q_k = -k\nabla T
$$

The conductive heat flux vector $\boldsymbol q_k$ is the negative product of the thermal conductivity $k$ and the temperature gradient $\nabla T$, which follows Fourier's law of heat conduction.

**Convective Heat Flux Vector**:
$$
\boldsymbol q_u = \rho c_p\boldsymbol u T
$$

The convective heat flux vector $\boldsymbol q_u$ is the product of $\rho c_p$, the local velocity vector $\boldsymbol u$, and the temperature $T$.

**Radiative Heat Flux Vector**:
$$
\boldsymbol q_r  = 2\pi\int_0^\infty\int_{-1}^1\boldsymbol s I_{ph,\omega}d\mu d\omega
$$

The radiative heat flux vector $\boldsymbol q_r$ is the spatial and spectral integral of the product of the unit vector $\boldsymbol s$ and the directional spectral radiative intensity $I_{ph,\omega}$.

## Main Energy Carriers

The four main energy carriers are **phonons** ($p$), **electrons** ($e$), **fluid particles** ($f$), and **photons** ($ph$). These carriers form the microscopic model for the storage, transfer, and interaction of thermal energy.

### 1. Phonons

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Phonons are quantized vibrational modes occurring in rigid atomic lattices.
- The properties of long-wavelength phonons result in the generation of sound in solids, hence the name "phonons."
- Phonons determine many physical properties of materials, including heat capacity and thermal/electrical conductivity (the propagation of phonons governs heat conduction in insulators).
- In classical mechanics, any lattice vibration can be decomposed into a superposition of non-localized normal vibrational modes.
- When these modes are analyzed using quantum mechanics, they exhibit particle-like properties (wave-particle duality). Thus, phonons are **quasiparticles**.
- When treated as particles, phonons are **bosons** with zero spin. The phonon energy $E_p = \hbar\omega_p$ is the sum of its potential and kinetic energy, where $\hbar = h/2\pi$ and $h$ is Planck's constant.
- Phonons are categorized into two types: **acoustic phonons** (denoted A) and **optical phonons** (denoted O).
  - **Acoustic phonons** have frequencies that decrease with increasing wavelength, corresponding to sound waves in the lattice. **Longitudinal** and **transverse** acoustic phonons are usually abbreviated as LA and TA, respectively.
  - **Optical phonons** occur in lattices with multiple atoms per unit cell. They are called "optical" because they can be easily excited by light in ionic crystals. Optical phonons are typically abbreviated as LO and TO, representing **longitudinal** and **transverse** types, respectively.


### Electrons

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Electrons are negatively charged **subatomic particles**. Electrons have a spin of 1/2 and are classified as **fermions**.
- The antiparticle of the electron is the **positron**, which has the same charge, mass, and spin magnitude as the electron but an opposite charge polarity.
- Electrons exhibit both particle and wave characteristics and are therefore considered **quasiparticles**. Electrons bound to atomic nuclei behave as **standing waves** and can be observed.
- In solids, electrons are categorized into core and valence electrons:
  - **Core electrons** do not participate in bonding and are considered to always move with the nucleus.
  - **Valence electrons** are further divided into conduction (or free) electrons and **bonding electrons**.
- In quantum mechanics, electrons are described by the **Dirac equation**.
- Generally, an electron's energy consists of **potential energy** (associated with bond energy) and **kinetic energy** (associated with velocity).


### Fluid Particles

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_3.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Gases and liquids are composed of atoms or molecules, broadly referred to as **fluid particles**. Fluid particles can be neutral or charged and are in constant **random motion**.
- The energy of fluid particles includes potential energy, electronic energy, and kinetic energy.
- In **ideal gases**, collisions between particles are **elastic**, and the intermolecular attractive forces can be neglected.
- For ideal gases, the Maxwell-Boltzmann distribution can be derived using statistical mechanics (along with concepts of energy distribution and symmetry).
- Liquid particles have sufficient kinetic energy to stretch intermolecular forces but cannot completely overcome them (thus, liquids have densities close to those of solids). As the temperature of a liquid increases, its velocity increases, and the kinetic energy becomes large enough to overcome all intermolecular forces, allowing particles to move freely and transition into the gas phase.


### Photons

<div class="row mt-3">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_4.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Photons are quantized excitations of the electromagnetic field and fundamental particles in quantum electrodynamics. They are part of the Standard Model of particle physics.
- According to quantum mechanics, photons exhibit wave-like properties.
- Photons have **zero rest mass** but finite and well-defined energy. Due to their energy, photons are influenced by gravity, as predicted by general relativity.
- Photons have a spin of 1 and are classified as **bosons**. Individual photons are circularly polarized due to their unit spin.
- In general, an electromagnetic field consists of **plane monochromatic waves** with a frequency $f_{ph}$ (angular frequency $\omega_{ph} = 2\pi f_{ph}$), wavelength $\lambda_{ph}$, and speed $u_{ph}$.
- The quantum nature of electromagnetic waves is given by their energy $E_{ph} = \hbar \omega_{ph}$. Photons also have momentum $\boldsymbol p_{ph} = \hbar \boldsymbol\kappa_{ph}$, where $\boldsymbol\kappa_{ph}$ is the wave vector.
- In a vacuum, the dispersion relation (the relationship between angular frequency and wave vector) for photons is linear, with the proportionality constant being the **Planck constant**.
- For excitations in matter, the dispersion relation becomes nonlinear, and the momentum is no longer proportional to energy. Thus, these particles propagate in a vacuum at speeds slower than the speed of light.

## Energy Distribution Functions

In a system composed of multiple particles, the observed **macroscopic state** (ensemble average) is related to the probabilities of each microscopic state (described by energy distribution functions) and the **microscopic state** (position and momentum) of each particle.

$$
\left \langle \phi \right \rangle=\sum_if_i\phi_i
$$

Probability distribution functions are used to determine the energy and transport properties of carriers.

These particle probability distribution functions allow us to describe the temperature dependence of the heat capacity of lattices (phonons) and electrons, the relationship between temperature and kinetic energy in gases, and the blackbody radiation of photons.

The equilibrium probability distribution function $f_i^0$ represents the most probable distribution of microscopic states under undisturbed conditions.

- **Bose-Einstein Distribution** (phonons, photons):
  $$
  f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text BT})-1}
  $$

- **Fermi-Dirac Distribution** (electrons):
  $$
  f_i^0 = \frac{1}{\exp(\frac{E_i-\mu}{k_\text BT})+1}
  $$

- **Maxwell-Boltzmann Distribution** (ideal gas molecules):
  $$
  f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text BT})}
  $$

Deviations from equilibrium distributions are used to analyze the transport properties of these carriers, which is the foundation of **Boltzmann transport theory**.


## Particles, Waves, and Quasiparticles

### Particles

Particles are **discrete** entities. Their energy is localized in a finite region with well-defined boundaries. Particles exist at specific locations, and to reach different points in space, they must move according to the laws of kinematics.

Interactions between particles follow simple laws, such as conservation of energy and momentum in elastic collisions. Particles without interactions are referred to as ballistic particles.

### Waves

Waves cannot be considered finite entities. Their energy is distributed over space and time. Waves propagate until they occupy all positions. The phase of a wave can be analyzed to determine its velocity in space. Waves are characterized by frequency and wavelength.

### Quasiparticles

Quasiparticles (including phonons, electrons, and photons) exhibit both particle-like and wave-like properties. They can be described using wave packets, which are localized energy distributions formed by the superposition of many plane waves of different wavelengths.

In a sense, they are simultaneously both particles and waves, a concept known as **wave-particle duality**.

For quasiparticles, the classical distinction between particles and waves may become blurred. Their behavior can be partially described using wave theory and partially using particle theory.


## Contributions to Heat Transfer Physics

Heat is a form of energy manifested as the motion of particles in matter. It can be transferred from one body to another through **conduction** (via phonons, electrons, and fluid particles), **convection** (via fluid particles), and **radiation** (via photons).

The fields most closely related to heat transfer physics include:
- Atomic/molecular dynamics,
- Solid-state (condensed matter) and fluid-state physics,
- Electromagnetism,
- Quantum optics.

- **Boltzmann** proposed that heat capacity, entropy, and other thermodynamic properties are the result of the behavior of large numbers of atoms, which can be treated using mechanics and statistics. He introduced the Boltzmann constant $k_B$ and, together with Maxwell, proposed the **equipartition theorem**.
- **Maxwell** developed the electromagnetic theory of light and made significant contributions to kinetic theory, molecular physics, and thermodynamics.
- **Planck** discovered that energy exists in **discrete** forms, later called "quanta." He hypothesized that the energy absorbed or emitted by a body must be in multiples of $h\nu$, where $\nu$ is the frequency of the photon.
- **Bohr**, while studying the simplest atomic hydrogen spectrum, proposed that an atom can only absorb and emit **quantized energy** corresponding to the differences between energy levels.
- **Pauli** formulated the rules governing atomic structure (commonly known as the **Pauli exclusion principle**), stating that no two or more electrons in a single atom can occupy the exact same quantum state.
- The **Schrödinger equation** describes the probabilistic wave (or **wave function**) governing the motion of small particles and specifies how these waves are affected by external influences. These wave functions form the basis of **quantum wave mechanics**.
- **Fermi** developed a method for calculating the behavior of particle systems obeying the Pauli exclusion principle, later known as **Fermi statistics**. **Dirac** independently developed an equivalent theory.
- **Green** and **Kubo** developed the **fluctuation-dissipation theorem** for transport coefficients.
- **Ziman** applied variational methods to study nonequilibrium phonon transport properties.
- **Callaway** and **Holland** formulated (and solved) the **single-mode relaxation time model** for lattice thermal conductivity.

## Fundamental Constants and Fine Structure Scale

### Boltzmann Constant

$$
k_\text B=1.38065\times10^{-23} ~ \text J/\text K
$$

The Boltzmann constant is defined as the relationship between the average thermal energy of energy carriers (phonons, electrons, photons, or fluid particles) and their absolute temperature $T$.

When energy carriers are treated as particles, this thermal energy $k_\text BT$ is used to normalize the energy of the carriers.

In statistical mechanics, the entropy $S$ of a system with $N$ particles is defined as:

$$
S=k_\text BN\ln Z
$$

where $Z$ is the partition function, which describes the probability distribution of available energy states under given macroscopic constraints.

In dynamical theory, based on the equipartition of energy, each degree of freedom is assigned an energy of $k_\text BT/2$.


### Planck Constant

$$
h=6.626069\times10^{-34} ~ \text J\cdot \text s
$$

According to quantum mechanics, the energy of an object is the product of its frequency $\nu$ and $h$.

The reduced Planck constant (also known as the Dirac constant) is:

$$
\hbar = \frac{h}{2\pi}
$$

The Planck constant is used to describe quantization, where certain physical properties of primary energy carriers appear in fixed amounts rather than a continuous range of values.

The Planck constant also appears in the Heisenberg uncertainty principle, where the uncertainty in position $\Delta x$ and the uncertainty in momentum $\Delta p_x$ along the same direction are related as:

$$
\Delta p_x \Delta x \le \frac{\hbar}{2}
$$


### Atomic Units

Four fundamental constants—the reduced Planck constant $\hbar$, the electron mass $m_e$, the Coulomb constant $1/4\pi\varepsilon_0$ (where $\varepsilon_0$ is the permittivity of free space), and the electron charge $e_c$—are used to define atomic units.

- **Atomic length**:
  $$
  r_\text B = \frac{4\pi\varepsilon_0\hbar^2}{m_e e_c^2}=5.2918\times 10^{-11}~ \text m
  $$

- **Atomic time**:
  $$
  \tau_a=\frac{m_er_\text B^2}{\hbar} = 2.4189\times 10^{-17} ~ \text s
  $$

- **Atomic energy**:
  $$
  \frac{e_c^2}{4\pi\varepsilon_0r_\text B}=4.3597\times10^{-18}\text J=27.211~ \text{eV}
  $$

- **Atomic velocity**:
  $$
  \frac{r_\text B}{\tau_a} = 2.1877 \times 10^6~ \text m/\text s
  $$

- **Atomic dipole moment**:
  $$
  e_cr_\text B=8.4783\times 10^{-30}~ \text C\cdot\text m
  $$


### References

Kaviany M, *Heat Transfer Physics*, 2008

