---
layout: distill
title: Classical Dynamics Theory of Heat Transfer
date: 2023-10-08 00:32:13
tags: Phonon
categories: Theory
tabs: true
giscus_comments: true
map: true

toc:
  - name: Energy Conservation Equation
  - name: Primary Energy Carriers
  - name: Energy Distribution Function
  - name: Particles, Waves, and Quasiparticles
  - name: Contribution to Heat Transfer Physics
  - name: Fundamental Constants and Fine Structure Scales

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

The macroscopic energy conservation equation in heat transfer describes the storage, transport (conduction $$k$$, convection $$u$$, and radiation $$r$$), and conversion of heat energy to other forms of energy.

## Energy Conservation Equation

$$
\nabla\cdot \boldsymbol q=-\rho c_p\frac{\partial T}{\partial t}+\sum_{i,j}\dot s_{i-j},
\nabla\cdot \boldsymbol q=\frac{\int_{\Delta A}(\boldsymbol q\cdot\boldsymbol s_{\boldsymbol n})dA}{\Delta V \to 0}
$$

Here, $$\rho c_p\frac{\partial T}{\partial t}$$ is called sensible heat storage, and $$\dot s_{i-j}$$ is the rate of energy conversion due to interactions between energy carriers $$i$$ and $$j$$.

The heat flux vector $$\boldsymbol q$$ is the sum of conductive, convective, and radiative heat flux vectors:

$$
\boldsymbol q = \boldsymbol q_k + \boldsymbol q_u + \boldsymbol q_r
$$

**Conductive heat flux vector** $$\boldsymbol q_k$$ is the negative product of thermal conductivity $$k$$ and the temperature gradient $$\nabla T$$, according to Fourier's law of heat conduction:

$$
\boldsymbol q_k = -k\nabla T
$$

**Convective heat flux vector** $$\boldsymbol q_u$$ is the product of $$\rho c_p$$, the local velocity vector $$\boldsymbol u$$, and temperature $$T$$:

$$
\boldsymbol q_u = \rho c_p\boldsymbol u T
$$

**Radiative heat flux vector** $$\boldsymbol q_r$$ is the spatial and spectral integral of the product of unit vector $$\boldsymbol s$$ and directional spectral intensity $$I_{ph,\omega}$$:

$$
\boldsymbol q_r  = 2\pi\int_0^\infty\int_{-1}^1\boldsymbol s I_{ph,\omega}d\mu d\omega
$$

## Primary Energy Carriers

The four primary energy carriers—**phonons** ($$p$$), **electrons** ($$e$$), **fluid particles** ($$f$$), and **photons** ($$ph$$)—form the microscopic model of heat energy storage, transfer, and interaction.

### Phonons

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Phonons are quantized vibrational modes in a rigid atomic lattice.
- The characteristics of long-wavelength phonons lead to sound in solids, hence the name "phonons."
- Phonons determine many material properties, including heat capacity and thermal/electrical conductivity (phonon propagation governs heat conduction in insulators).
- In classical mechanics, any lattice vibration can be decomposed into a superposition of delocalized normal modes.
- When analyzed using quantum mechanics, these modes exhibit particle-like properties (wave-particle duality), making phonons **quasiparticles**.
- Phonons are classified as **bosons** with zero spin. The energy of a phonon $$E_p=\hbar\omega_p$$ is the sum of its potential and kinetic energies, where $$\hbar= h/2\pi$$ and $$h$$ is Planck's constant.
- There are two types of phonons: **acoustic phonons**, denoted by $$A$$, and **optical phonons**, denoted by $$O$$.
- Acoustic phonons have frequencies that decrease with increasing wavelength, corresponding to sound waves in the lattice. **Longitudinal** and **transverse** acoustic phonons are often abbreviated as $$LA$$ and $$TA$$, respectively.
- Optical phonons occur in lattices with multiple atoms per unit cell. They are termed "optical" because they can be easily excited by light in ionic crystals. Optical phonons are usually abbreviated as $$LO$$ (longitudinal) and $$TO$$ (transverse).

### Electrons

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Electrons are negatively charged **subatomic particles**. With a spin of $$1/2$$, electrons are classified as **fermions**.
- The antiparticle of an electron is the **positron**, which has the same charge magnitude, mass, and spin as the electron but with opposite charge.
- Electrons exhibit both particle and wave properties and can be considered **quasiparticles**. Electrons bound to nuclei behave as **standing waves** and can be observed.
- In solids, electrons are categorized into core and valence electrons. Core electrons do not participate in bonding and are considered to always move with the nucleus.
- Valence electrons, further divided into conduction (or free) electrons and **bonding electrons**, are farther from the nucleus.
- In quantum mechanics, electrons are described by the **Dirac equation**.
- Generally, electron energy comprises potential energy (expressed as binding energy) and kinetic energy (expressed in terms of velocity).

### Fluid Particles

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_3.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Gases and liquids consist of atoms or molecules (generally referred to as fluid particles). Fluid particles can be neutral or charged and are constantly in **random motion**.
- The energy of fluid particles is divided into potential energy, electronic energy, and kinetic energy.
- In an **ideal gas**, collisions between particles are **elastic**, and interparticle attractions are negligible.
- For ideal gases, the Maxwell-Boltzmann distribution can be derived using statistical mechanics (along with concepts of energy distribution and symmetry).
- Fluid particles in liquids have sufficient kinetic energy to stretch interparticle attractions but not overcome them entirely (hence the density of liquids is close to solids). As the liquid temperature rises, particle speed increases, eventually overcoming molecular forces to form gases.

### Photons

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_4.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Photons are quanta of the electromagnetic field and fundamental particles in quantum electrodynamics, forming part of the Standard Model of particle physics.
- According to quantum mechanics, photons exhibit wave properties.
- Photons have **zero rest mass** but finite, well-defined energy. As photons possess energy, general relativity predicts they are affected by gravity.
- With a spin of 1, photons are **bosons**. A single photon is circularly polarized due to its unit spin.
- Generally, the electromagnetic field consists of **plane monochromatic waves** with frequency $$f_{ph}$$ (angular frequency $$\omega_{ph}=2\pi f_{ph}$$), wavelength $$\lambda_{ph}$$, and velocity $$u_{ph}$$.
- The quantum characteristics of electromagnetic waves are described by their energy $$E_{ph} = \hbar \omega_{ph}$$. Photons also have momentum $$\boldsymbol p_{ph} = \hbar \boldsymbol\kappa_{ph}$$, where $$\boldsymbol\kappa_{ph}$$ is the wavevector.
- In a vacuum, the dispersion relation (relationship between angular frequency and wavevector) for photons is linear, with the proportionality constant being **Planck's constant**.
- In matter, excitation involves a nonlinear dispersion relation, where momentum is not proportional to energy. Consequently, particle propagation speeds in a vacuum are slower than the speed of light.

## Energy Distribution Function

In systems composed of multiple particles, the observed **macroscopic state** (ensemble average) relates to the probabilities of each microscopic state (energy distribution function) and the **microscopic states** (positions and momenta) of each particle:

$$
\left \langle \phi \right \rangle=\sum_if_i\phi_i
$$

Probability distribution functions determine carrier energy and transport characteristics.

These particle probability distribution functions enable us to describe the temperature dependence of lattice (phonon) and electronic heat capacity, the relationship between temperature and gas kinetic energy, and blackbody thermal emission of photons.

The equilibrium probability distribution function $$f_i^0$$ gives the most probable distribution of microscopic states under zero perturbation:

- **Bose-Einstein Distribution** (phonons, photons)

$$
 f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text{B}T})-1}
$$

- **Fermi-Dirac Distribution** (electrons)

$$
 f_i^0 = \frac{1}{\exp(\frac{E_i-\mu}{k_\text{B}T})+1}
$$

- **Maxwell-Boltzmann Distribution** (ideal gas molecules)

$$
 f_i^0 = \frac{1}{\exp(\frac{E_i}{k_\text{B}T})}
$$

Deviations from equilibrium distributions are used to analyze transport properties of these carriers, specifically through **Boltzmann transport theory**.

## Particles, Waves, and Quasiparticles

### Particles

Particles are **discrete** entities. Their energy is localized within a finite region of well-defined boundaries. Particles exist in specific locations and must move according to kinematic laws to reach different points in space.

Interactions between particles follow simple laws, such as the conservation of energy and momentum in elastic collisions. In the absence of interactions, particles are termed ballistic particles.

### Waves

Waves cannot be considered finite entities. Their energy is distributed over space and time. Waves can propagate to exist at all locations. Wave phases can be analyzed to determine their speed in space. Waves are specified by frequency and wavelength.

### Quasiparticles

Quasiparticles (including phonons, electrons, and photons) exhibit properties of both particles and waves. They can be described by wave packets, which are localized energy constructs formed by the superposition of many different wavelengths.

In essence, they are simultaneously particles and waves, a concept referred to as **wave-particle duality**.

For quasiparticles, the classical distinction between particles and waves may become blurred. Their behavior partially adheres to wave theory and partially to particle theory.

## Contribution to Heat Transfer Physics

Heat is a form of energy manifested as the motion of material molecules, capable of being transferred from one body to another through **conduction** (via phonons, electrons, and fluid particles), **convection** (via fluid particles), and **radiation** (via photons).

The fields most relevant to heat transfer physics include:
- Atomic/Molecular Dynamics;
- Solid-State (Condensed Matter) and Fluid Physics;
- Electromagnetics;
- Quantum Optics.

- **Boltzmann** proposed that heat capacity, entropy, and other thermodynamic properties result from the collective behavior of atoms, which can be treated using mechanics and statistics. He introduced the Boltzmann constant $$k_B$$ and, with Maxwell, proposed the **equipartition theorem**.
- **Maxwell** developed the electromagnetic theory of light and contributed to gas dynamics, molecular physics, and thermodynamics.
- **Planck** discovered that energy exists in **discrete** units, later called "quanta." He hypothesized that the energy absorbed or emitted by an object must be in multiples of $$h\nu$$, where $$\nu$$ is photon frequency.
- **Bohr** hypothesized that atoms could only absorb and emit **quantum energy** corresponding to differences between energy levels while studying the hydrogen spectrum.
- **Pauli** formulated the rules of atomic structure (commonly called the **Pauli exclusion principle**), stating that no two or more electrons in an atom can occupy the same state.
- **Schrödinger** formulated the equation describing the probability waves (or **wave functions**) governing small particle motion and specified how these waves change under external influences, laying the foundation of **quantum wave mechanics**.
- **Fermi** devised a method to calculate the behavior of particle systems adhering to the Pauli exclusion principle, later known as **Fermi statistics**. Dirac independently developed an equivalent theory.
- **Green and Kubo** developed the **fluctuation-dissipation theorem** for transport coefficients.
- **Ziman** variationally treated nonequilibrium phonon transport properties.
- **Callaway and Holland** formulated (and solved) the **single-mode relaxation time model** for lattice thermal conductivity.

## Fundamental Constants and Fine Structure Scales

### Boltzmann Constant

$$
 k_\text{B}=1.38065\times10^{-23} ~ \text J/\text K
$$

Defines the relationship between the average thermal energy of an energy carrier (phonon, electron, photon, or fluid particle) and its absolute temperature $$T$$.

When energy carriers are treated as particles, this thermal energy $$k_\text{B}T$$ is used to normalize their energy.

In statistical mechanics, the entropy $$S$$ of a system with $$N$$ particles is defined as $$S=k_\text{B}N\ln Z$$, where $$Z$$ is the partition function, describing the probability distribution of available energy states under given macroscopic constraints.

In dynamical theory, energy equipartition assigns $$k_\text{B}T/2$$ of energy to each degree of freedom of motion.

### Planck Constant

$$
 h=6.626069\times10^{−34} ~ \text J\cdot \text s
$$

According to quantum mechanics, the energy of a body is the product of its frequency $$\nu$$ and $$h$$.

The reduced Planck constant (also known as the Dirac constant) is $$\hbar = h/2\pi$$.

The Planck constant describes quantization, where certain physical properties of primary energy carriers appear in discrete amounts rather than as a continuous range of values.

The Planck constant also appears in the Heisenberg uncertainty principle, which states that the uncertainties $$\Delta x$$ in position and $$\Delta p_x$$ in momentum measurement along the same direction satisfy $$\Delta p_x \Delta x \le \hbar/2$$.

### Atomic Units

Four fundamental constants—the reduced Planck constant $$\hbar$$, electron mass $$m_e$$, Coulomb electrostatic constant $$1/4\pi\varepsilon_0$$ (where $$\varepsilon_0$$ is the permittivity of free space), and electron charge $$e_c$$—define atomic units:

- Atomic length:

$$
 r_\text{B} = \frac{4\pi\varepsilon_0\hbar^2}{m_e e_c^2}=5.2918\times 10^{-11}~ \text m
$$

- Atomic time:

$$
 \tau_a=\frac{m_er_\text{B}^2}{\hbar} = 2.4189\times 10^{-17} ~ \text s
$$

- Atomic energy:

$$
 \frac{e_c^2}{4\pi\varepsilon_0r_\text{B}}=4.3597\times10^{-18}\text J=27.211~ \text{eV}
$$

- Atomic velocity:	

$$
 \frac{r_\text{B}}{\tau_a} = 2.1877 \times 10^6~ \text m/\text s
$$

- Atomic dipole moment:

$$
 e_cr_\text{B}=8.4783\times 10^{-30}~ \text C\cdot\text m
$$

---

**References:**

Kaviany M *Heat Transfer Physics* 2008
