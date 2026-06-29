---
layout: post
title: "How Do Rough Boundaries Reshape Phonon Transport in Nanostructures?"
lang: en
translation_key: rough-boundaries-phonon-transport
permalink: /blog/2026/06/22/rough-boundaries-phonon-transport/
date: 2026-06-22 12:00:00
last_updated: 2026-06-22
reading_time: "11 min"
description: "How roughness amplitude, correlation length, and spatial spectrum selectively scatter phonons—and when a single specularity parameter ceases to describe the boundary."
tags: phonon boundary-scattering nanostructure roughness
categories: physics
related_posts: true
featured: true
toc:
  sidebar: left
---

When the transverse size of a nanostructure approaches or falls below phonon mean free paths, a reduction in thermal conductivity may appear inevitable: phonons reach a boundary before traveling far through the material. That explanation tells us why boundaries matter, but not **how a particular boundary transforms heat flow**.

Two silicon nanowires with the same diameter, length, material, and temperature can exhibit markedly different thermal conductivities because their surface morphologies differ. Transport is controlled not only by size, nor by the vague statement that a surface is “rough,” but by how the length scales of that roughness match phonon wavelength, incidence angle, and propagation direction.

Earlier articles discussed the [limits of Fourier's law]({{ '/blog/2026/06/20/from-energy-transport-to-fourier-law/' | relative_url }}) and the [particle and wave descriptions of phonons]({{ '/blog/2026/06/21/phonon-wave-particle-wigner-transport/' | relative_url }}). This article narrows the question to a real-space boundary. Starting from the Casimir picture, it asks why roughness cannot generally be compressed into one frequency-independent scattering rate, and what strong conductivity suppression does—and does not—reveal about the underlying mechanism.

## A boundary is not a constant correction to bulk scattering

In a bulk material, the transport length of a phonon mode is mainly set by anharmonic, isotope, and defect scattering. A nanostructure introduces a geometric length scale. In a simplified kinetic form,

$$
\kappa
=\frac{1}{3}\int
C(\omega)v(\omega)\Lambda_{\mathrm{eff}}(\omega)
\,\mathrm d\omega,
$$

where $C$, $v$, and $\Lambda_{\mathrm{eff}}$ are the frequency-resolved heat capacity, group velocity, and effective mean free path. If different events are approximated as independent and stochastic, one often writes

$$
\frac{1}{\Lambda_{\mathrm{eff}}(\omega)}
\simeq
\frac{1}{\Lambda_{\mathrm{bulk}}(\omega)}
+\frac{1}{\Lambda_{\mathrm B}(\omega)}.
$$

For a fully diffuse boundary, $\Lambda_{\mathrm B}$ is typically of the order of the transverse dimension. This is the core of the Casimir picture: when every boundary encounter erases the incoming propagation direction, geometry limits the average distance gained along the heat-flow direction.

This benchmark is not a universal lower-bound theorem for every rough structure. Specular reflection preserves part of the momentum parallel to the boundary and can weaken boundary limitation. Conversely, constrictions, protrusions, or correlated corrugations can force a phonon through repeated reflections, making its net axial advance shorter than a single transverse crossing. The resulting transport length can fall below a simple Casimir estimate even when each event remains describable with particle trajectories.

“Smaller means lower conductivity” is therefore only the first layer of the picture. The real calculation must determine how the boundary redistributes phonons of different frequencies and directions.

## Roughness is a set of spatial scales, not one number

The most frequently quoted surface descriptor is the root-mean-square roughness $\eta$. It measures the height variation but says nothing about how rapidly the height changes. Two surfaces can have the same $\eta$: one may undulate slowly, while the other contains densely spaced, sharp features. They will not act identically on the same phonon.

A lateral correlation length $L_c$ is also needed, or more generally the height correlation function

$$
C(\boldsymbol r)
=\langle h(\boldsymbol r_0)
h(\boldsymbol r_0+\boldsymbol r)\rangle.
$$

Its Fourier transform is the roughness power spectral density $S(\boldsymbol q)$. Boundary scattering changes the wave vector parallel to the surface, and the required transfer

$$
\Delta\boldsymbol q_{\parallel}
=\boldsymbol q'_{\parallel}-\boldsymbol q_{\parallel}
$$

must be supplied by a spatial Fourier component of the surface. Scattering strength is therefore controlled not only by how large the height fluctuations are, but by whether $S(\Delta\boldsymbol q_{\parallel})$ has weight at the required wave vector. Roughness is selective: one morphology may strongly backscatter part of the phonon spectrum while barely affecting another part.

In the common Ziman–Soffer approximation, the probability of specular reflection for a phonon of wavelength $\lambda$ incident at angle $\theta$ from the surface normal is often written

$$
p(\lambda,\theta)
=\exp\!\left[
-\frac{16\pi^2\eta^2\cos^2\theta}{\lambda^2}
\right].
$$

The expression conveys two important ideas: long-wavelength phonons average over small features more effectively, and grazing incidence tends to remain more specular. Yet it retains only roughness amplitude explicitly; it does not fully encode correlation length, periodicity, or the angular distribution after reflection. Replacing the entire real surface by a constant $p$ removes even the wavelength and incidence-angle selectivity.

In our work on unsmooth silicon nanowires, a Soffer specularity parameter within a Fuchs–Sondheimer framework was used to examine how diameter, temperature, and technologically realistic surface roughness jointly affect conductivity. A subsequent reflection model for a periodically rough boundary included both phase loss and angular deviation and showed that the high-frequency specularity need not vary monotonically with frequency. The lesson is not simply that one complicated formula should replace a simpler one. It is that **once a boundary has definite spatial structure, reflection is jointly controlled by wavelength, amplitude, period, and incidence angle.**

## From diffuse reflection to multiple scattering, interference, and localization

Boundary transport naturally sits between particle and wave descriptions. In the particle picture, phonons travel at their group velocities and change direction at a boundary according to specular or diffuse reflection probabilities. Monte Carlo methods can track large ensembles of these flights and are particularly effective for isolating how constrictions, repeated encounters, and nonlocal transport suppress the axial heat current.

When roughness dimensions are comparable to phonon wavelengths and phase survives between successive encounters, random redirection is no longer sufficient. Roughness can mix transverse modes and produce coherent backscattering. Periodic or quasiperiodic features can create stop bands and local resonances. A sufficiently long, phase-coherent disordered structure may develop localization tendencies. In these regimes the boundary changes not just a mean free path, but potentially the vibrational states that can propagate through the structure.

Very low thermal conductivity—or an inferred mean free path shorter than the transverse dimension—does not by itself demonstrate Anderson localization. Repeated geometric reflections, necking, amorphous surface layers, oxidation, defects, and contact resistance can generate similar macroscopic signatures. “Below the Casimir limit” first tells us that a single diffuse encounter is an inadequate model; it does not uniquely identify the missing microscopic mechanism.

It is also useful to separate two meanings of coherence. In the [Wigner transport equation]({{ '/blog/2026/06/21/phonon-wave-particle-wigner-transport/' | relative_url }}), coherence primarily refers to off-diagonal density-matrix elements between vibrational branches near the same wave vector. Boundary-induced interference instead links propagation paths or wave vectors coupled by the surface. Both are wave phenomena, but they are not interchangeable observables.

## Determining what the rough boundary actually does

A reliable analysis should not begin by fitting an “effective roughness.” It should build an evidence chain from morphology to spectrum and then to transport. The boundary height field should be measured or constructed, with at least $\eta$, $L_c$, and the power spectral density reported. Phonon wavelengths, intrinsic mean free paths, device dimensions, and roughness scales can then be compared to determine whether ray-like reflection, wave scattering, or a crossover between them is expected.

The model should match the question. Frequency- and angle-resolved Boltzmann or Monte Carlo approaches can test directional redistribution, repeated reflection, and the ballistic-to-diffusive crossover. Atomistic molecular dynamics naturally includes reconstruction, nonlinearity, and atomic disorder, although classical statistics and finite scales require care. Green-function, lattice-dynamical, and wave-packet methods are better suited to identifying transmission dips, mode conversion, resonances, and localization lengths. If several models reproduce the same total conductivity, mode-resolved transmission, length dependence, and temperature dependence are needed to distinguish their mechanisms.

A rough boundary should ultimately not be summarized as “one more scattering rate.” It is a structure with a spatial spectrum. It selects phonon wavelengths and directions, correlates successive reflections, and under suitable conditions reshapes the vibrational modes themselves. Nanostructure size tells us how often a phonon meets the boundary; the boundary's statistics and geometry determine how much direction, phase, and ability to propagate remain after that encounter.

## References

1. H. B. G. Casimir, “Note on the conduction of heat in crystals,” *Physica* **5**, 495–500 (1938), doi: [10.1016/S0031-8914(38)80162-2](https://doi.org/10.1016/S0031-8914(38)80162-2).
2. S. B. Soffer, “Statistical model for the size effect in electrical conduction,” *Journal of Applied Physics* **38**, 1710–1715 (1967), doi: [10.1063/1.1709746](https://doi.org/10.1063/1.1709746).
3. P. Martin, Z. Aksamija, E. Pop, and U. Ravaioli, “Impact of phonon-surface roughness scattering on thermal conductivity of thin Si nanowires,” *Physical Review Letters* **102**, 125503 (2009), doi: [10.1103/PhysRevLett.102.125503](https://doi.org/10.1103/PhysRevLett.102.125503).
4. J. Sadhu and S. Sinha, “Room-temperature phonon boundary scattering below the Casimir limit,” *Physical Review B* **84**, 115450 (2011), doi: [10.1103/PhysRevB.84.115450](https://doi.org/10.1103/PhysRevB.84.115450).
5. C. Blanc, A. Rajabpour, S. Volz, T. Fournier, and O. Bourgeois, “Phonon heat conduction in corrugated silicon nanowires below the Casimir limit,” *Applied Physics Letters* **103**, 043109 (2013), doi: [10.1063/1.4816590](https://doi.org/10.1063/1.4816590).
6. S. Liu, A. A. Barinov, F. Yin, and V. I. Khvesyuk, “Determination of thermal properties of unsmooth Si nanowires,” *Chinese Physics Letters* **41**, 016301 (2024), doi: [10.1088/0256-307X/41/1/016301](https://doi.org/10.1088/0256-307X/41/1/016301).
7. F. Yin, S. Liu, A. A. Barinov, and V. I. Khvesyuk, “An enhanced framework for wave reflection from a periodically rough boundary,” *Physica B: Condensed Matter* **716**, 417743 (2025), doi: [10.1016/j.physb.2025.417743](https://doi.org/10.1016/j.physb.2025.417743).
