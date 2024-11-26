# Microscopic Description of Thermal Physics

The macroscopic energy conservation equation in heat transfer describes the storage, transfer (thermal conduction $$k$$, thermal convection $$u$$, and thermal radiation $$r$$), and conversion of thermal energy with other forms of energy.

## 1. Energy Conservation

$$
\nabla\cdot \boldsymbol q=-\rho c_p\frac{\partial T}{\partial t}+\sum_{i,j}\dot s_{i-j},
\nabla\cdot \boldsymbol q=\frac{\int_{\Delta A}(\boldsymbol q\cdot\boldsymbol s_{\boldsymbol n})dA}{\Delta V \to 0}
$$

Here, $$\rho c_p\frac{\partial T}{\partial t}$$ is referred to as sensible heat storage, and $$\dot s_{i-j}$$ is the energy conversion rate of thermal energy determined by the nature and frequency of interactions between energy carriers $$i$$ and $$j$$.

## 2. Heat Flux Vector

$$
\boldsymbol q = \boldsymbol q_k + \boldsymbol q_u + \boldsymbol q_r
$$

The heat flux vector $$\boldsymbol q$$ is the sum of conductive, convective, and radiative heat flux vectors.

### Conductive Heat Flux Vector
$$
\boldsymbol q_k = -k\nabla T
$$

The conductive heat flux vector $$\boldsymbol q_k$$ is the negative product of the thermal conductivity $k$ and the temperature gradient $$\nabla T$$, which follows Fourier's law of heat conduction.

### Convective Heat Flux Vector
$$
\boldsymbol q_u = \rho c_p\boldsymbol u T
$$

The convective heat flux vector $$\boldsymbol q_u$$ is the product of $$\rho c_p$$, the local velocity vector $$\boldsymbol u$$, and the temperature $$T$$.

### Radiative Heat Flux Vector
$$
\boldsymbol q_r  = 2\pi\int_0^\infty\int_{-1}^1\boldsymbol s I_{ph,\omega}d\mu d\omega
$$

The radiative heat flux vector $$\boldsymbol q_r$$ is the integral of the product of the unit vector $$\boldsymbol s$$ and the directional spectral radiative intensity $$I_{ph,\omega}$$ over space and the electromagnetic spectrum.

## Main Energy Carriers

The four main energy carriers, **phonons** ($$p$$), **electrons** ($$e$$), **fluid particles** ($$f$$), and **photons** ($$ph$$), constitute the microscopic model of thermal energy storage, transfer, and interaction.

### 1. Phonons

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Phonons are quantized vibrational modes occurring in rigid atomic lattices.
- The properties of long-wavelength phonons give rise to sound in solids, hence the name phonons.
- Phonons determine many physical properties of materials, including heat capacity and thermal/electrical conductivity (phonon propagation governs heat conduction in insulators).
- In classical mechanics, any lattice vibration can be decomposed into a superposition of non-localized normal vibrational modes.
- When analyzed using quantum mechanics, these modes exhibit particle-like properties (wave-particle duality), making phonons **quasiparticles**.
- As particles, phonons are classified as **bosons** with zero spin. The energy of a phonon is $E_p=\hbar\omega_p$, where $\hbar= h/2\pi$, and $h$ is Planck’s constant.
- There are two types of phonons: **acoustic phonons** (A) and **optical phonons** (O).
  - **Acoustic phonons** have frequencies that decrease with increasing wavelength and correspond to sound waves in the lattice. **Longitudinal** and **transverse** acoustic phonons are abbreviated as LA and TA, respectively.
  - **Optical phonons** occur in lattices with multiple atoms per unit cell. They are named optical because they can be excited by light in ionic crystals. Longitudinal optical (LO) and transverse optical (TO) phonons are the two main types.

### 2. Electrons

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Electrons are negatively charged **subatomic particles** with a spin of 1/2, classified as **fermions**.
- The electron’s antiparticle is the **positron**, which has the same charge, mass, and spin but an opposite charge.
- Electrons exhibit particle and wave characteristics, qualifying them as **quasiparticles**. Electrons bound to atoms behave as **standing waves**.
- In solids, electrons are categorized into core and valence electrons:
  - **Core electrons** do not participate in bonding and are considered stationary with the nucleus.
  - **Valence electrons** are further divided into conduction (free) electrons and those involved in bonding.
- The energy of an electron includes both **potential energy** (associated with binding) and **kinetic energy** (associated with motion).

### 3. Fluid Particles

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_3.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Gases and liquids are composed of atoms or molecules, broadly termed **fluid particles**, which are in constant random motion.
- Fluid particle energy comprises potential energy, electronic energy, and kinetic energy.
- In **ideal gases**, collisions are **elastic**, and intermolecular attractions are negligible.
- For liquids, particles have sufficient kinetic energy to stretch intermolecular forces but not to completely overcome them. When the temperature of a liquid increases, its velocity increases, and the particles may overcome all intermolecular forces to transition into the gas phase.

### 4. Photons

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/blog/thermophysics_4.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

- Photons are quantum excitations of the electromagnetic field and fundamental particles in quantum electrodynamics.
- According to quantum mechanics, photons exhibit both wave and particle properties.
- Photons have zero **rest mass** but finite energy. As per general relativity, photons are affected by gravity due to their energy.
- Photons are classified as **bosons** with spin 1. Individual photons are circularly polarized due to their unit spin.
- Photon energy is given by:
  $$
  E_{ph} = \hbar \omega_{ph}
  $$
  where $\omega_{ph}$ is the angular frequency, and $\hbar$ is the reduced Planck constant.

## Energy Distribution Functions

In a system composed of many particles, the observed **macroscopic state** (ensemble average) is related to the probabilities of each **microscopic state** (described by energy distribution functions).

$$
\left \langle \phi \right \rangle=\sum_if_i\phi_i
$$

Probability distribution functions determine the energy and transport properties of carriers.

The equilibrium distribution function $f_i^0$ represents the most probable distribution of microscopic states under unperturbed conditions:

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

## Particles, Waves, and Quasiparticles

### Particles

Particles are **discrete** entities with localized energy in finite spatial boundaries. Movement to different locations requires motion governed by kinematic laws.

### Waves

Waves are **non-localized**, distributing energy over space and time. Wave behavior is characterized by frequency, wavelength, and phase.

### Quasiparticles

Quasiparticles exhibit wave-particle duality and are represented by **wave packets**, which are superpositions of plane waves.

## Contributions to Heat Transfer Physics

Thermal energy is transferred via **conduction** (phonons, electrons, fluid particles), **convection** (fluid particles), and **radiation** (photons).

Contributors include:

- **Boltzmann**: Statistical mechanics, Boltzmann constant.
- **Maxwell**: Electromagnetic theory.
- **Planck**: Energy quantization.
- **Schrödinger**: Quantum wave mechanics.


## Fundamental Constants

### Boltzmann Constant
$$
k_\text B=1.38065\times10^{-23} ~ \text J/\text K
$$

### Planck Constant
$$
h=6.626069\times10^{-34} ~ \text J\cdot \text s, \quad \hbar = h/2\pi
$$

### Atomic Units

- Atomic length:
  $$
  r_\text B = 5.2918\times 10^{-11}~ \text m
  $$
- Atomic time:
  $$
  \tau_a = 2.4189\times 10^{-17} ~ \text s
  $$
- Atomic energy:
  $$
  4.3597\times10^{-18}\text J=27.211~ \text{eV}
  $$
- Atomic velocity:
  $$
  2.1877 \times 10^6~ \text m/\text s
  $$
