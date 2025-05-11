---
layout: distill
title: Classical Dynamic Theory of Heat Transfer
date: 2023-04-26 00:32:13
categories: Theory
tabs: true
map: true

toc:
  - name: Dynamic Theory of Gas Molecules
  - name: Heat Transfer in Dielectrics
  - name: Heat Transfer in Metals
  - name: Boltzmann Equation
  - name: Fourier Equation
  - name: Summary

_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: sans-serif;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

## Dynamic Theory of Gas Molecules

Assuming the total path traveled by a molecule is $$L$$, the total volume it occupies during energy transfer is $\pi d^2L$ ($d$ being the molecular diameter). The total number of molecules in this volume is $\pi n d^2 L$ ($$n$$ being molecular density), so the number of collisions is $\pi n d^2 L$.

The mean distance $$\Lambda$$ between two collisions equals the ratio of the total path $$L$$ to the number of collisions:
$$
\Lambda = \frac{L}{n \pi d^2 L} = \frac{1}{n \sigma}
$$

where $$\sigma$$ is the collision cross-section.

Substituting the ideal gas molecular density $$n = \frac{p}{k_B T}$$:
$$
\Lambda = \frac{k_B T}{p \sigma}
$$

Based on kinetic theory, the heat flux in an ideal gas is calculated. Let $$\varepsilon$$ be the internal energy of the gas, and the heat flux of one molecule is:
$$
q_x = \frac{1}{2} v_x [\varepsilon(x - \Lambda_x) - \varepsilon(x + \Lambda_x)]
$$

where $$x$$ is the coordinate, and $$v_x$$ is the x-component of velocity.

Expanding into a Taylor series, we get:
$$
q_x = -v_x \Lambda_x \frac{\text{d}\varepsilon}{\text{dx}} \approx -\cos^2\theta v \Lambda \frac{\text{d}\varepsilon}{\text{dx}}
$$

Integrating over all angles gives the total heat flux:
$$
q_x = -\frac{1}{2\pi} v \Lambda \frac{\text{d}\varepsilon}{\text{dx}}
\left[\int_{\varphi=0}^{2\pi}\int_{\theta=0}^{\pi/2}\cos^2\theta\sin\theta\text{d}\theta\text{d}\varphi\right] \frac{\text{d}\varepsilon}{\text{dT}} \frac{\text{dT}}{\text{dx}}
\approx -\frac{1}{3} C v \Lambda \frac{\text{dT}}{\text{dx}}
$$

Thus, the expression for gas thermal conductivity is:
$$
\lambda \approx \frac{1}{3} C v \Lambda
$$

It is proportional to the heat capacity $$C$$, molecular velocity $$v$$, and mean free path $$\Lambda$$.

## Heat Transfer in Dielectrics

Heat transfer in dielectrics is carried by phonons, which are quanta of vibrational energy $$\hbar \omega$$. The thermal conductivity of the phonon gas can be calculated using the above formula:
$$
\lambda_{ph} = \frac{1}{3} C_{ph} v_s \Lambda_{\Sigma}
$$

The main scattering mechanisms for phonons are:
- Phonon-boundary scattering ($$b$$);
- Phonon-impurity scattering ($$imp$$);
- Phonon-phonon scattering ($$ph$$).

According to Matthiessen's rule:
$$
\Lambda_{\Sigma}^{-1} = \Lambda_{ph}^{-1} + \Lambda_{imp}^{-1} + \Lambda_{b}^{-1}
$$

<div class="row text-center">
    <div class="col-md-6">
        {% include figure.liquid loading="eager" path="assets/img/blog/classic1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-md-6">
        {% include figure.liquid loading="eager" path="assets/img/blog/classic2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

## Heat Transfer in Metals

Considering the thermal conductivity of electron gas (metals), similar to phonons:
$$
\lambda_{e} = \frac{1}{3} C_{e} v_F \Lambda_{e}
$$

Electrons in metals are scattered by phonons, defects, and boundaries. According to Matthiessen's rule:
$$
\frac{1}{\Lambda_e} = \frac{1}{\Lambda_{ph}} + \frac{1}{\Lambda_d} + \frac{1}{\Lambda_b}
$$

## Boltzmann Equation

The thermodynamic equilibrium state can be described by the equilibrium distribution function $$f(\varepsilon, T)$$ (Maxwell-Boltzmann, Bose-Einstein, or Fermi-Dirac), which depends on energy, temperature, and chemical potential.

If thermodynamic equilibrium is disrupted, the state of the system is described by a non-equilibrium distribution function, which may also depend on the coordinates and momentum of individual carriers in addition to energy, temperature, and chemical potential.

In a closed system, due to internal relaxation processes, the non-equilibrium distribution evolves towards equilibrium. The Boltzmann equation describes this evolution:
$$
\frac{\partial f}{\partial t} + \vec v \cdot \nabla_{\vec r} f + \vec F \cdot \nabla_{\vec p} f = \left(\frac{\partial f}{\partial t}\right)_\text{st}
$$

The equation is meaningful if the collision term $$(\partial f/\partial t)_\text{st}$$ is known.

## Fourier Equation

In macroscopic systems, Fourier's law determines heat transfer in the absence of macroscopic motion:
$$
\vec q = -\lambda \nabla T
$$

The heat transfer equation is:
$$
\rho C_p \frac{\partial T}{\partial t} = -\nabla \vec q
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

- The heat transfer properties of macroscopic objects are related to characteristic length and time, which are compared to mean free path and relaxation time.
- The Boltzmann equation applies to dilute systems.
- For systems where characteristic dimensions are comparable to the wavelength of carriers, wave-like analysis methods are needed.
