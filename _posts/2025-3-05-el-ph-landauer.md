---
layout: post
title: Landauer Theory for Electrons and Phonons
date: 2025-03-05 06:36:10
description: A detailed exploration of Landauer theory in nanoscale thermal transport, comparing electron and phonon transport mechanisms, mode counting, and spectral conductance.
tags: landauer-theory phonon electron thermal-transport physics
categories: physics
related_posts: true
toc:
  sidebar: left
---

In nanoscale thermal transport, how to accurately describe the heat flow of electrons or phonons between two reservoirs (thermal baths) from a microscopic perspective has become a research hotspot. Landauer theory was initially proposed to analyze electron transport in quantum wires, but later this concept was extended to bosonic systems like phonons, revealing the essence of transport in nano- or micro/nano-structures.

* **Electrons (fermions):** Follow the Fermi-Dirac distribution. Each quantum state can accommodate at most two electrons (spin degeneracy). The chemical potential \$\mu\$ plays a key role in electron transport.
* **Phonons (bosons):** Follow the Bose-Einstein distribution. Each quantum state can contain an unlimited number of phonons (no spin degeneracy, and typically \$\mu = 0\$).

## 1. Landauer Theory and Heat Flow Description

The core idea of Landauer theory in heat transport is: **the transport process can be understood as quantum states being scattered or transmitted through a relatively short device region**, and the upper limit of transport is determined by the number of available modes (transport channels) and the probability that these modes can transmit through the device (i.e., transmission function \$\tau(\mathbf{k})\$).

A simple physical picture is:

* The device is treated as a scattering region with different distribution functions in the left and right thermal reservoirs.
* For a wave vector \$\mathbf{k}\$ with \$k_x > 0\$, particles propagate from left to right; conversely, if \$k_x < 0\$, they move from right to left.
* The net heat flow equals "left-to-right heat flow" minus "right-to-left heat flow."

The heat flux density from the left to the right reservoir (unit: W/m\$^{d-1}\$) is generally written as:

$$
J_{Q,L\to R}(T_1) = \frac{1}{L^d}\sum_p\sum_{\mathbf{k};k_x>0} v_{gx,p}(\mathbf{k}) \tau_p(\mathbf{k}) [E_{i,p}(\mathbf{k}) - \mu][f_i^0(E_{i,p}(\mathbf{k}), T_1) + c_0]
$$

where:

* \$v_{gx,p}\$: group velocity component in the \$x\$ direction;
* \$\tau_p(\mathbf{k})\$: transmission function;
* \$E_{i,p}\$: particle energy;
* \$f_i^0\$: equilibrium distribution function;
* \$\mu\$: chemical potential;
* \$c_0\$: zero-point energy correction.

Similarly, the heat flow from right to left can be written, and the **net heat flow** is:

$$
J_{Q,\text{net}} = \frac{1}{L^d}\sum_p\sum_{\mathbf{k};k_x>0} v_{gx,p} \tau_p [E_{i,p} - \mu][f_i^0(T_1) - f_i^0(T_2)]
$$

Note that the zero-point energy \$c_0\$ cancels out in the net heat flow and thus has no net contribution.

## 2. From k-Space Summation to Integral Form

For better analysis, the k-space summation is often converted into an integral (Landauer integral). The forms differ with dimensionality:

### 1D System:

$$
J_{Q,\text{net}} = \sum_p \int_0^\infty \frac{v_{g,p} \tau_p [E_{i,p}(k) - \mu]}{2\pi} [f_i^0(T_1) - f_i^0(T_2)] dk
$$

### 2D System:

$$
J_{Q,\text{net}} = \sum_p\int_{-\pi/2}^{\pi/2}\int_0^\infty\frac{v_{g,p}\cos\theta\tau_p [E_{i,p}(k)-\mu]}{4\pi^2}[f_i^0(T_1)-f_i^0(T_2)]kdkd\theta
$$

$$
= \frac{1}{2\pi^2}\sum_p\int_0^\infty v_{g,p}\tau_p [E_{i,p}(k)-\mu] [f_i^0(T_1)-f_i^0(T_2)]kdk
$$

### 3D System:

$$
J_{Q,\text{net}} = \sum_p\int_0^{2\pi}\int_{0}^{\pi/2}\int_0^\infty\frac{v_{g,p}\cos\theta\tau_p [E_{i,p}(k)-\mu]}{8\pi^3} [f_i^0(T_1)-f_i^0(T_2)]k^2dk\sin\theta d\theta d\varphi
$$

$$
= \frac{1}{8\pi^2}\sum_p\int_0^\infty v_{g,p}\tau_p [E_{i,p}(k)-\mu] [f_i^0(T_1)-f_i^0(T_2)]k^2dk
$$

Angle \$\theta\$ denotes the angle between the wave vector and the transport direction \$x\$. It's often assumed that \$\tau\$ is direction-independent.

By introducing the density of states (DOS), the k-space integral can be converted into an integral over frequency \$\omega\$ or energy \$E\$.

### For Phonons:

Using frequency DOS \$D(\omega)\$ and \$E = \hbar\omega\$ with \$\mu = 0\$:

* **1D:**

$$
J_{Q,\text{ph}} = \frac{1}{2} \sum_p \int_0^\infty v_{g,p} D_{\text{1D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

* **2D:**

$$
J_{Q,\text{ph}} = \frac{1}{\pi} \sum_p \int_0^\infty v_{g,p} D_{\text{2D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

* **3D:**

$$
J_{Q,\text{ph}} = \frac{1}{4} \sum_p \int_0^\infty v_{g,p} D_{\text{3D}}(\omega) \tau_p(\omega) \hbar\omega [f_{\text{BE}}^0(T_1) - f_{\text{BE}}^0(T_2)] d\omega
$$

### For Electrons:

With nonzero chemical potential \$\mu\$ and energy DOS \$D(E)\$:

* **1D:**

$$
J_{Q,\text{el}} = \frac{1}{2} \sum_p \int_0^\infty v_{g,p} D_{\text{1D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

* **2D:**

$$
J_{Q,\text{el}} = \frac{1}{\pi} \sum_p \int_0^\infty v_{g,p} D_{\text{2D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

* **3D:**

$$
J_{Q,\text{el}} = \frac{1}{4} \sum_p \int_0^\infty v_{g,p} D_{\text{3D}}(E) \tau_p(E) (E - \mu) [f_{\text{FD}}^0(T_1) - f_{\text{FD}}^0(T_2)] dE
$$

## 3. Number of Modes and Half-Wavelength Interpretation

To combine quantitative analysis with intuitive understanding, the Landauer theory introduces the concept of **number of modes**.

This idea can also be used to analyze **heat flow** $Q$ (in watts), which is the product of **heat flux density** $J_Q$ and "cross-sectional area":

* For 1D: the area is 1 (or ignored);
* For 2D: the area is the contact width $W$;
* For 3D: the area is the contact cross-sectional area $A$.

### 3.1 General Expression for Phonon Heat Flow

For phonons, the general expression for heat flow (or thermal power) is:

$$
Q_{\text{ph}} = \frac{1}{2\pi} \int_0^\infty M(\omega)\tau(\omega)\hbar\omega [f_\text{BE}^0(T_1) - f_\text{BE}^0(T_2)]\,d\omega
$$

where:

* $M(\omega)$ is the **number of modes**, representing the number of half-wavelengths (λ/2) of phonons per unit cross-sectional area at frequency $\omega$;
* $\tau(\omega)$ is the transmission function;
* $f_\text{BE}^0$ is the Bose-Einstein distribution function.

### 3.2 Number of Modes in Different Dimensions

The number of modes varies with dimensionality:

* **1D:**

$$
M(\omega) = M_{\text{1D}}(\omega)
$$

* **2D:**

$$
M(\omega) = W \cdot M_{\text{2D}}(\omega)
$$

* **3D:**

$$
M(\omega) = A \cdot M_{\text{3D}}(\omega)
$$

By comparing the relations $J_Q(1D)=Q$, $J_Q(2D)=Q/W$, $J_Q(3D)=Q/A$ with the expressions for heat flux density, we can derive the relationship between mode density $M(\omega)$ and density of states $D(\omega)$:

$$
M_{\text{1D}}(\omega) = 1 = \pi v_g(\omega) D_{\text{1D}}(\omega)
$$

$$
M_{\text{2D}}(\omega) = \frac{K(\omega)}{\pi} = \pi \cdot \frac{2v_g(\omega)}{\pi} D_{\text{2D}}(\omega)
$$

$$
M_{\text{3D}}(\omega) = \frac{K^2(\omega)}{4\pi} = \pi \cdot \frac{v_g(\omega)}{2} D_{\text{3D}}(\omega)
$$

Here, $v_g(\omega)$ is the group velocity, and $K(\omega)$ is the wave vector magnitude.

We know the **phonon DOS** is:

$$
D_{\text{1D}}(\omega) = \frac{1}{\pi v_g(\omega)}
$$

$$
D_{\text{2D}}(\omega) = \frac{K(\omega)}{2\pi v_g(\omega)}
$$

$$
D_{\text{3D}}(\omega) = \frac{K^2(\omega)}{2\pi^2 v_g(\omega)}
$$

Substituting these into the expressions for number of modes:

$$
M_{\text{1D}}(\omega) = \pi v_g(\omega) \cdot \frac{1}{\pi v_g(\omega)} = 1
$$

$$
M_{\text{2D}}(\omega) = W \cdot \pi \cdot \left[ \frac{2v_g(\omega)}{\pi} \right] \cdot \frac{K(\omega)}{2\pi v_g(\omega)}
$$

$$
M_{\text{3D}}(\omega) = A \cdot \pi \cdot \left[ \frac{v_g(\omega)}{2} \right] \cdot \frac{K^2(\omega)}{2\pi^2 v_g(\omega)}
$$

### 3.3 Physical Meaning of Spatially Averaged Group Velocity

The terms in square brackets above represent the **spatially averaged x-direction group velocity** at a given frequency:

* **1D**: Only motion along x-direction, so the average is $v_g$ itself;
* **2D**: Average of $\cos\theta$ over a semicircle is $2/\pi$, thus $\langle v_{gx} \rangle = 2v_g/\pi$;
* **3D**: Average of $\cos\theta$ over a hemisphere is $1/2$, thus $\langle v_{gx} \rangle = v_g/2$.

### 3.4 Geometric Interpretation Using Half-Wavelength

The number of modes $M(\omega)$ can also be interpreted geometrically as the number of half-wavelengths fitting into the cross-section:

* In **1D**, there’s only 1 propagating mode per frequency;
* In **2D**, the contact width $W$ can be divided into half-wavelength sections;
* In **3D**, the contact area $A$ is filled with these half-wave units.

$$
(\text{1D}) :\quad M(\omega)=1
$$

$$
(\text{2D}) :\quad M(\omega) = \frac{W}{\lambda/2}
$$

$$
(\text{3D}) :\quad M(\omega) = \frac{A}{4/\pi(\lambda/2)^2}
$$

### 3.5 Similar Analysis for Electrons

For electrons, a similar analysis gives the energy-integrated thermal flow as:

$$
Q_{\text{el}} = \frac{1}{\pi\hbar} \int_0^\infty M(E) \tau(E)(E - \mu)[f_\text{FD}^0(T_1) - f_\text{FD}^0(T_2)]\,dE
$$

According to Lundstrom and Jeong (2013), for electrons with a parabolic band, the number of modes is:

$$
(\text{1D}) :\quad M_\text{1D}(E) = H(E - E_c)
$$

$$
(\text{2D}) :\quad M(E) = W \cdot g_v \cdot \frac{\sqrt{2m^*(E - E_c)}}{\pi\hbar} \cdot H(E - E_c)
$$

$$
(\text{3D}) :\quad M(E) = A \cdot g_v \cdot \frac{m^*(E - E_c)}{2\pi\hbar^2} \cdot H(E - E_c)
$$

Where:

* $H(E - E_c)$ is the Heaviside function (only electrons above the conduction band minimum contribute);
* $g_v$ is valley degeneracy;
* $m^*$ is the effective mass;
* $E_c$ is the conduction band minimum.

---

## 4. Thermal Conductance and Spectral Conductance

### 4.1 Thermal Conductance

**Thermal conductance** $G_Q$ is defined as heat flow per unit temperature difference:

$$
G_Q = \frac{Q}{T_1 - T_2}
$$

For small temperature differences, the differential form is:

$$
G_Q(T) = \frac{Q(T + \delta T/2, T - \delta T/2)}{\delta T}
$$

#### For Phonons:

$$
G_Q(T) = \frac{1}{2\pi} \int_0^\infty M(\omega) \tau(\omega) \hbar\omega \frac{\partial f_\text{BE}^0}{\partial T} \, d\omega
$$

#### For Electrons:

$$
G_Q(T) = \frac{1}{\pi\hbar} \int_0^\infty M(E) \tau(E) (E - \mu) \frac{\partial f_\text{FD}^0}{\partial T} \, dE
$$

Here, $M$ is the number of modes, $\tau$ is the transmission function, and $f^0$ is the equilibrium distribution.

### 4.2 Spectral Conductance

The integrand of $G_Q$ represents the **contribution to thermal conductance at each frequency or energy**, known as the **spectral conductance** $G_Q'$:

* **For Phonons:**

$$
G_Q'(\omega, T) = \frac{1}{2\pi} M(\omega) \tau(\omega) \hbar\omega \frac{\partial f_\text{BE}^0}{\partial T}
$$

* **For Electrons:**

$$
G_Q'(E, T) = \frac{1}{\pi\hbar} M(E) \tau(E) (E - \mu) \frac{\partial f_\text{FD}^0}{\partial T}
$$

These functions show that the energy transport capacity depends on both the number of available modes $M$ and the thermal sensitivity $\partial f / \partial T$.

To simplify analysis, one can define a **normalized spectral conductance** by dividing out constants like $k_B$, $M$, and assuming **ideal transmission** $\tau = 1$:

$$
\tilde G_Q' = \frac{G_Q'}{C_0k_BM\tau} = (f_i^0)^2e^xx^2
$$

with $x = \hbar\omega / k_B T$ as the dimensionless energy.

In the **phonon case**, for low-frequency modes, the normalized conductance approaches 1 — indicating that **each mode contributes equally** at low frequencies, until the energy exceeds thermal energy $k_BT$.

In the **electron case**, low-energy modes contribute little due to the **Pauli exclusion principle**: electrons must be thermally excited across the Fermi level, so most contribution comes from states near $E \approx \mu$.


