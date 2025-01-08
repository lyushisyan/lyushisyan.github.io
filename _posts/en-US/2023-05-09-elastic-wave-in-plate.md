---
layout: distill
title: Dispersion Relations of Elastic Waves in Plates
date: 2023-05-09 00:32:13
tags: Solid-State-Physics
categories: Theory
tabs: true
giscus_comments: true
map: true

toc:
  - name: Elastic Wave Equation
  - name: Dispersion Relation of SH Waves
  - name: Dispersion Relation of Rayleigh-Lamb Waves
  - name: Symmetric Waves
  - name: Antisymmetric Waves
  - name: Group Velocity and Phase Velocity

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

This article studies the wave propagation process based on solving the **elastic equations of a continuous medium**.

In plates, waves can be divided into longitudinal waves (**P** waves) and transverse waves (**S** waves), with **S** waves further classified into **SH** waves and **SV** waves.

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/elsplate_1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

Assuming the wave propagates along the $x$-axis:
- Displacement in the $x$ direction corresponds to **P waves**.
- Displacement in the $y$ direction corresponds to **SH waves**.
- Displacement in the $z$ direction corresponds to **SV waves**.

**SV waves** and **P waves** couple under the stress-free conditions of a plate surface to form **Rayleigh-Lamb waves**.

## Elastic Wave Equation

In the approximation of a continuous medium, considering elastic waves propagating along the $$x$$ direction in a plate, the wave equation is:
$$
\mu\Delta\vec u+(\lambda+\mu)\nabla(\nabla\vec u) = \rho \frac{\partial^2 \vec u}{\partial t^2}
$$

where $$\vec u$$ is the displacement vector, $$\lambda + \mu$$ are Lamé constants (dependent on the medium's elastic properties), and $$\rho$$ is the medium density.

The solutions to the wave equation can be expressed as a combination of scalar potential $$\varphi$$ and vector potential $$\vec\psi$$:
$$
\vec u =\text{grad }\varphi + \text{rot }\vec\psi
$$

## Dispersion Relation of SH Waves

In SH waves, atomic displacement occurs in the $$y$$ direction, i.e., the displacement vector is $$\vec u = (0,u_y,0)$$.

Thus, the wave equation for SH waves is:
$$
\frac{\partial^2 u_y}{\partial x^2}+\frac{\partial^2 u_y}{\partial z^2} = \frac{1}{c_t^2}\frac{\partial^2 u_y}{\partial t^2}
$$

where $$c_t=\sqrt{\mu/\rho}$$ is the shear wave velocity.

The solution is:
$$
u_y=(A_1\sin\beta z + A_2\cos\beta z)e^{i(\xi x-\omega t)}$$

where $$\xi$$ is the wave vector projection along the $$x$$-axis, $$\omega$$ is the frequency, and $$\beta$$ is the wave vector projection along the $$z$$-axis, satisfying:
$$
\beta^2+\xi^2=\frac{\omega^2}{c_t^2}
$$

Considering stress-free boundary conditions on the plate surfaces, $$\tau_{zy} =\mu\frac{\partial u_y}{\partial z}=0$$ at $$y=\pm b$$, the solution yields:
$$
A_1\cos\beta b-A_2\sin\beta b =0 \quad \text{and} \quad A_1\cos\beta b+A_2\sin\beta b =0
$$

Thus, the frequency equation is:
$$
\cos\beta b\sin \beta b=0
$$

This equation is satisfied when:
$$
\beta b = n\pi/2~~~(n=0,1,2,3,...)
$$

The dispersion relation for SH waves is then:
$$
\omega^2=c_t^2\left[\xi^2+\left(n\pi/2b\right)^2\right]
$$

## Dispersion Relation of Rayleigh-Lamb Waves

Considering the simultaneous presence of P and SV waves in a plate of thickness $$2b$$ with stress-free boundaries:
- The displacement vector is $$\vec u = (u_x,0,u_z)$$.
- Scalar potential $$\psi$$ and vector potential $$\vec\psi=(0,\psi_y,0)$$ are used.

The wave equations for Rayleigh-Lamb waves are:
$$
\frac{\partial^2 \varphi}{\partial x^2}+\frac{\partial^2 \varphi}{\partial y^2}=\frac{1}{c_l^2}\frac{\partial \varphi}{\partial t^2}
$$
$$
\frac{\partial^2 \psi_y}{\partial x^2}+\frac{\partial^2 \psi_y}{\partial y^2}=\frac{1}{c_t^2}\frac{\partial \psi_y}{\partial t^2}
$$

where $$c_l=\sqrt{(\lambda+2\mu)/\rho}$$ is the longitudinal wave velocity and $$c_t=\sqrt{\mu/\rho}$$ is the shear wave velocity.

The solutions are:
$$
\varphi=(A\sin\alpha z+B\cos\alpha z)e^{i(\xi x-\omega t)}
$$
$$
\psi_y=i(C\sin\beta z+ D\cos\beta z)e^{i(\xi x-\omega t)}
$$

Symmetric and antisymmetric waves are treated separately.

### Symmetric Waves

For symmetric waves ($$A=D=0$$):
$$
\frac{\tan\beta b}{\tan\alpha b} = -\frac{4\alpha\beta \xi^2}{(\xi^2-\beta^2)^2}
$$

### Antisymmetric Waves

For antisymmetric waves ($$B=C=0$$):
$$
\frac{\tan\beta b}{\tan\alpha b} = -\frac{(\xi^2-\beta^2)^2}{4\alpha\beta \xi^2}
$$

### Rayleigh-Lamb Frequency Equation

Combining symmetric and antisymmetric cases:
$$
F(\alpha,\beta,\xi) = \frac{\tan\beta b}{\tan\alpha b} + \left(\frac{4\alpha\beta \xi^2}{(\xi^2-\beta^2)^2}\right)^{\pm 1} = 0
$$

## Group Velocity and Phase Velocity

The phase velocity is the propagation velocity of the wave phase:
$$
v_p=\frac{\omega}{k}
$$

The group velocity is the velocity at which energy is transmitted in the medium:
$$
v_g=\frac{\partial\omega}{\partial k}
$$
