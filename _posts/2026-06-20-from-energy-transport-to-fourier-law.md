---
layout: post
title: "From Microscopic Transport to Fourier's Law: When Does It Work—or Fail?"
lang: en
translation_key: microscopic-energy-transport-fourier-law
permalink: /blog/2026/06/20/from-energy-transport-to-fourier-law/
date: 2026-03-13 12:00:00
last_updated: 2026-06-20
reading_time: "12 min"
description: "A microscopic account of Fourier's law as a local constitutive relation, the scale separations it requires, and practical criteria for recognizing its breakdown."
tags: theory thermal-transport nonequilibrium
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

Fourier's law is one of the most successful constitutive relations in physics:

$$
\boldsymbol q=-\boldsymbol\kappa\nabla T.
$$

It says that the heat-flux density $\boldsymbol q$ is proportional and opposite to the local temperature gradient. The law works extraordinarily well at macroscopic scales, but it is not a fundamental conservation law. It is an emergent, near-equilibrium relation whose validity depends on length, time, scattering, and the possibility of defining a local temperature.

This distinction matters. When Fourier's law fails, energy is not violated. What fails is the assumption that the heat flux at one point and one instant is determined only by the temperature gradient at that same point and instant.

## From conservation to a local constitutive law

Local energy conservation is

$$
\frac{\partial u}{\partial t}+\nabla\cdot\boldsymbol q=s,
$$

where $u$ is the energy density and $s$ is the volumetric heating rate. This equation does not specify how energy is transported. The missing physics is supplied by a constitutive relation for $\boldsymbol q$.

If the material is close to local equilibrium, $u$ can be written as a function of a local temperature. For a small temperature interval,

$$
du=C_V\,dT,
$$

where $C_V$ is the volumetric heat capacity. Combining energy conservation with Fourier's law gives the heat equation,

$$
C_V\frac{\partial T}{\partial t}
=\nabla\cdot(\boldsymbol\kappa\nabla T)+s.
$$

The logical chain is therefore

$$
\text{energy conservation}
+\text{local equilibrium}
+\text{Fourier constitutive law}
\Longrightarrow \text{heat equation}.
$$

Only the first term in this chain is fundamental. The other two require physical justification.

To see why that constitutive law has a limited domain, begin with the microscopic heat flux.

In a dielectric crystal, heat is carried mainly by collective lattice excitations. In the phonon quasiparticle picture, a mode $\lambda=(\boldsymbol q,j)$ has frequency $\omega_\lambda$, group velocity $\boldsymbol v_\lambda$, and occupation $n_\lambda$. The heat flux is

$$
\boldsymbol q
=\frac{1}{V}\sum_\lambda
\hbar\omega_\lambda\boldsymbol v_\lambda\,\delta n_\lambda,
$$

where $\delta n_\lambda=n_\lambda-n_\lambda^0$ is the deviation from the equilibrium Bose--Einstein distribution.

The distribution is governed by the phonon Boltzmann transport equation (BTE),

$$
\frac{\partial n_\lambda}{\partial t}
+\boldsymbol v_\lambda\cdot\nabla n_\lambda
=\left.\frac{\partial n_\lambda}{\partial t}\right|_{\mathrm{coll}}.
$$

The left-hand side describes drift through space; the collision operator describes scattering among phonons and with isotopes, defects, electrons, and boundaries. Fourier's law appears only after the BTE is linearized near equilibrium and the microscopic non-equilibrium distribution is reduced to a response proportional to $\nabla T$.

In the relaxation-time approximation,

$$
\boldsymbol\kappa
=\frac{1}{V}\sum_\lambda
C_\lambda\,
\boldsymbol v_\lambda\otimes\boldsymbol v_\lambda\,
\tau_\lambda,
$$

where $C_\lambda$ and $\tau_\lambda$ are the modal heat capacity and relaxation time. For an isotropic medium, the familiar kinetic estimate follows:

$$
\kappa\simeq\frac{1}{3}C_V\bar v\Lambda,
$$

with a representative mean free path $\Lambda=\bar v\tau$. This equation is useful, but a real material has a broad spectrum of mean free paths rather than a single $\Lambda$.

Because carriers propagate over finite distances and retain memory, the more general response is nonlocal.

Fourier transport requires several forms of scale separation.

**Local equilibrium.**

A small volume must contain enough internal scattering to relax toward an equilibrium-like distribution. Only then does a single scalar temperature characterize its energy. A strongly non-equilibrium distribution may have a well-defined total energy while not having a unique thermodynamic temperature.

**Separation of length scales.**

Let $L$ be the characteristic scale over which temperature or geometry changes. The Knudsen number is

$$
\mathrm{Kn}=\frac{\Lambda}{L}.
$$

When the heat-carrying mean free paths are much smaller than $L$, carriers lose memory of their previous locations before the macroscopic field changes appreciably. The flux is then approximately local.

**Separation of time scales.**

Let $t_{\mathrm{obs}}$ be the observation or heating time. If the relevant relaxation times satisfy

$$
\tau_\lambda\ll t_{\mathrm{obs}},
$$

the carrier distribution can follow the changing temperature field quasi-statically. At ultrashort times, heat flux retains memory of earlier states.

**Linear response.**

Fourier's law is the first-order response to a weak thermodynamic driving force. If the temperature changes substantially over one mean free path,

$$
\frac{\Lambda|\nabla T|}{T}\not\ll 1,
$$

higher-order and nonlocal effects may become important.

These criteria are spectral: different modes have different $\Lambda_\lambda$ and $\tau_\lambda$. A sample can therefore be diffusive for some phonons and ballistic for others.

## How spatial scale changes heat transport

**Diffusive regime.**

For $\mathrm{Kn}\ll1$, many momentum-randomizing events occur across the characteristic length. The microscopic distribution is close to local equilibrium, thermal conductivity is approximately independent of sample size, and Fourier's law is normally reliable.

**Quasiballistic regime.**

When $\mathrm{Kn}$ is no longer small for a significant part of the heat-carrying spectrum, boundaries and nonlocality suppress the contribution of long-mean-free-path modes. The measured effective conductivity becomes dependent on geometry and experimental length scale.

In this regime it is misleading to ask only, “What is the thermal conductivity of the material?” A better question is, “What conductivity does this material exhibit for this geometry, size, and heating profile?”

**Ballistic regime.**

For $\mathrm{Kn}\gg1$, carriers cross the system with few internal collisions. Transport is controlled by injection from contacts, transmission probabilities, and boundary scattering. A Landauer description is more natural than a local gradient law:

$$
G=\frac{1}{2\pi}\sum_m\int
\hbar\omega\,
\mathcal T_m(\omega)
\frac{\partial n^0}{\partial T},d\omega.
$$

Here $G$ is thermal conductance and $\mathcal T_m$ is the transmission of mode $m$. Conductance, rather than a size-independent conductivity, is the direct transport quantity.

## Temporal memory and interfaces

Fourier's law responds instantaneously to $\nabla T$. This mathematical idealization leads to a diffusion equation with nonzero response at arbitrarily large distance for any $t>0$. It does not imply physically infinite carrier speed; it indicates that microscopic relaxation time has been removed from the model.

A simple extension is the Cattaneo--Vernotte relation,

$$
\tau_q\frac{\partial\boldsymbol q}{\partial t}
+\boldsymbol q=-\boldsymbol\kappa\nabla T,
$$

which introduces heat-flux memory and produces a hyperbolic temperature equation. It can describe finite-time relaxation and wave-like temperature propagation phenomenologically. However, the fitted $\tau_q$ should not automatically be identified with one microscopic phonon lifetime; the microscopic BTE contains an entire spectrum of relaxation processes.

## What variables remain beyond Fourier's description

The criteria above assume that temperature is the only slow variable that must be retained. Two important classes of transport violate that assumption.

First, **collective crystal momentum** can relax much more slowly than local energy. Frequent collisions may then produce hydrodynamic rather than ordinary diffusive transport. The relevant question is what Normal and resistive processes conserve, not simply how often phonons collide. The collision-operator physics, displaced distributions, Poiseuille flow, and second sound are developed separately in [Do Phonon Collisions Always Create Thermal Resistance?]({{ '/blog/2026/06/20/normal-umklapp-collective-heat-flow/' | relative_url }}).

Second, **intermode coherence** may survive on the transport time scale. A population-only BTE may then need a density-matrix or Wigner extension. The point needed here is narrower: whether Fourier's law emerges macroscopically and which microscopic variables are required to compute its conductivity are distinct questions.

Spatial nonlocality becomes especially visible near an interface, where incident carriers from the two sides generally have different non-equilibrium distributions.

At an interface, incident carriers from the two materials can have different non-equilibrium distributions. A temperature discontinuity may appear even in steady state:

$$
\Delta T=R_K q_n,
$$

where $R_K$ is the thermal boundary resistance and $q_n$ is the normal heat flux. The jump does not violate energy conservation. It shows that a bulk local conductivity is insufficient to describe transmission across an atomically thin region.

Near a strongly scattering interface, the apparent temperature may also depend on how it is defined—from local energy, a probe response, or a fitted distribution. “Temperature at a point” is itself a coarse-grained concept outside local equilibrium.

## How to decide, and what the decision means

Before applying Fourier's law, ask four questions:

1. **Can a local temperature be defined?**  
   If internal equilibration is weak, solve for carrier distributions rather than assuming local equilibrium.

2. **Are the important mean free paths much smaller than the device and heating length scales?**  
   If not, include ballistic boundary transport or solve the BTE.

3. **Are the relaxation times much shorter than the experimental time scale?**  
   If not, include temporal memory or a frequency-dependent response.

4. **Do momentum-conserving or coherent processes dominate?**  
   If so, hydrodynamic or Wigner descriptions may be required.

As an illustration, suppose a group of heat-carrying modes has $\Lambda\sim100$ nm. In a $10\ \mu$m structure, its Knudsen number is about $10^{-2}$ and its contribution is likely diffusive. In a 100 nm structure, $\mathrm{Kn}\sim1$ and boundary-sensitive transport is expected. This estimate is diagnostic, not a universal cutoff, because the complete mean-free-path spectrum and boundary conditions matter.

The regime map leads to a final distinction: “failure of Fourier's law” can mean several different things.

There are at least three distinct possibilities:

1. **Temperature fails as a local state variable.** The distribution is too far from local equilibrium.
2. **The constitutive relation becomes nonlocal in space or time.** Flux depends on nearby gradients or on its history.
3. **Thermal conductivity ceases to be an intrinsic bulk number.** The measured response depends on size, contacts, geometry, and heating profile.

These should not be conflated. A material can have a meaningful local temperature but a nonlocal heat flux; it can also obey an effective Fourier law macroscopically even when its microscopic carriers are partly coherent.

The enduring value of Fourier's law is therefore not that it is universally fundamental, but that it is the correct hydrodynamic limit of a wide class of microscopic transport processes. Understanding heat conduction means knowing both why that limit emerges and when the system has not yet reached it.

## References

1. J. Fourier, *Théorie analytique de la chaleur*, Firmin Didot, Paris (1822).
2. R. E. Peierls, “Zur kinetischen Theorie der Wärmeleitung in Kristallen,” *Annalen der Physik* **395**, 1055–1101 (1929).
3. J. M. Ziman, *Electrons and Phonons*, Oxford University Press (1960).
4. R. A. Guyer and J. A. Krumhansl, “Solution of the Linearized Phonon Boltzmann Equation,” *Physical Review* **148**, 766–778 (1966).
5. R. A. Guyer and J. A. Krumhansl, “Thermal Conductivity, Second Sound, and Phonon Hydrodynamic Phenomena in Nonmetallic Crystals,” *Physical Review* **148**, 778–788 (1966).
6. G. Chen, *Nanoscale Energy Transport and Conversion*, Oxford University Press (2005).
7. A. Cepellotti *et al.*, “Phonon hydrodynamics in two-dimensional materials,” *Nature Communications* **6**, 6400 (2015).
8. M. Simoncelli, N. Marzari, and F. Mauri, “Unified theory of thermal transport in crystals and glasses,” *Nature Physics* **15**, 809–813 (2019).
