


Assume the total path traveled by a molecule is $$L$$. The total volume occupied during energy transfer is $$\pi d^2L$$ ($$d$$ is the molecule diameter), and the total number of molecules in this volume is $$\pi nd^2L$$ ($$n$$ is the molecular density). Therefore, the number of collisions for the molecule is $$\pi nd^2L$$.

The average distance $$\Lambda$$ between two collisions equals the ratio of the total path $$L$$ to the number of collisions:
$$
\Lambda = \frac{L}{n\pi d^2L} = \frac{1}{n\sigma}
$$
where $$\sigma$$ is the collision cross-section.

![Mean Free Path](meanlength.png)

Substituting the molecular density of an ideal gas $$n = p/(k_BT)$$:
$$
\Lambda = \frac{k_BT}{p\sigma}
$$

Based on kinetic theory, the heat flux in an ideal gas can be calculated. Let $$\varepsilon$$ be the internal energy of the gas. The heat flux of a single molecule is:
$$
q_x = \frac{1}{2}v_x[\varepsilon(x-\Lambda_x) - \varepsilon(x+\Lambda_x)]
$$
where $$x$$ is the coordinate and $$v_x$$ is the $$x$$-component of velocity.

Expanding into a Taylor series, we get:
$$
q_x = -v_x\Lambda_x\frac{\text{d}\varepsilon}{\text{dx}} \approx -(\cos^2\theta)v\Lambda\frac{\text{d}\varepsilon}{\text{dx}}
$$

Integrating over all angles gives the total heat flux:
$$
q_x = -\frac{1}{2\pi}v\Lambda\frac{\text{d}\varepsilon}{\text{dx}}
\left[\int_{\varphi=0}^{2\pi}\int_{\theta=0}^{\pi/2}\cos^2\theta\sin\theta\text{d}\theta\text{d}\varphi\right]\frac{\text{d}\varepsilon}{\text{dT}}\frac{\text{dT}}{\text{dx}}
\approx -\frac{1}{3}Cv\Lambda\frac{\text{dT}}{\text{dx}}
$$

Thus, the expression for the thermal conductivity of a gas is:
$$
\lambda \approx \frac{1}{3}Cv\Lambda
$$
It is proportional to the heat capacity $$C$$, molecular velocity $$v$$, and mean free path $$\Lambda$$.


## Heat Transfer in Dielectrics: Thermal Conductivity of Phonon Gas

In dielectrics, heat transfer is carried out by phonons, which are quantized vibrational energies $$\hbar\omega$$. The thermal conductivity of a phonon gas can be calculated using the same relation:
$$
\lambda_{ph} = \frac{1}{3}C_{ph}v_s\Lambda_{\Sigma}
$$

The primary mechanisms of phonon scattering include:
- Phonon-boundary scattering ($$b$$),
- Phonon-impurity scattering ($$imp$$),
- Phonon-phonon scattering ($$ph$$).

According to Matthiessen's rule:
$$
\Lambda_\Sigma^{-1} = \Lambda_{ph}^{-1} + \Lambda_{imp}^{-1} + \Lambda_b^{-1}
$$

The figure below illustrates the impact of different scattering mechanisms on the mean free path and thermal conductivity across various temperature ranges.

![Thermal Conductivity](lambda.png)


## Heat Transfer in Metals: Thermal Conductivity of Electron Gas

Consider the thermal conductivity of an electron gas (metals). Similar to phonons, based on kinetic theory:
$$
\lambda_{e} = \frac{1}{3}C_{e}v_F\Lambda_{e}
$$

In metals, electrons are scattered by phonons, defects, and boundaries. According to Matthiessen's rule:
$$
\frac{1}{\Lambda_e} = \frac{1}{\Lambda_{ph}} + \frac{1}{\Lambda_d} + \frac{1}{\Lambda_b}
$$


## Boltzmann Equation

The thermodynamic equilibrium state can be described by the equilibrium distribution function $$f(\varepsilon,T)$$ (Maxwell-Boltzmann, Bose-Einstein, or Fermi-Dirac), which depends on energy, temperature, and chemical potential.

If thermodynamic equilibrium is disrupted, the state of the system is described by a nonequilibrium distribution function, which may depend not only on energy, temperature, and chemical potential but also on the positions and momenta of individual carriers.

In a closed system, the nonequilibrium distribution evolves toward equilibrium due to internal relaxation processes. The Boltzmann equation describes the evolution of this nonequilibrium distribution:
$$
\frac{\partial f}{\partial t} + \vec{v} \cdot \nabla_{\vec{r}}f + \vec{F} \cdot \nabla_{\vec{p}}f = \left(\frac{\partial f}{\partial t}\right)_{\text{st}}
$$

The equation is meaningful if the collision term $$\left(\frac{\partial f}{\partial t}\right)_{\text{st}}$$ is known.


## Thermal Conductivity: Fourier's Law

In macroscopic systems, Fourier's law governs heat transfer in the absence of macroscopic motion:
$$
\vec{q} = -\lambda \nabla T
$$

The heat transfer equation is:
$$
\rho C_p \frac{\partial T}{\partial t} = -\nabla \vec{q}
$$

Substituting Fourier's law:
$$
\rho C_p \frac{\partial T}{\partial t} = \lambda \nabla^2 T
$$

Introducing the thermal diffusivity:
$$
\frac{1}{a} \frac{\partial T}{\partial t} = \nabla^2 T
$$


## Summary

- The heat transfer properties of macroscopic objects depend on characteristic lengths and timescales, which are compared to the mean free path and relaxation time, respectively.
- The Boltzmann equation is valid for dilute systems.
- For systems with characteristic dimensions comparable to the carrier wavelength, wave-like properties must be considered.
