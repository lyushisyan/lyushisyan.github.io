---
layout: distill
title: Thermal Conductivity Simulation Using NEMD (LAMMPS)
date: 2024-01-19 23:36:10
categories: Method
tabs: true
map: true

toc:
  - name: Thermal Conductivity Simulation Methods
  - name: NEMD Principles
  - name: Modeling Approach
  - name: Heat Source and Sink Setup
  - name: Heat Flux Calculation
  - name: Temperature Gradient Calculation

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
    font-family: sans-serif;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

## Thermal Conductivity Simulation Methods

- Equilibrium Molecular Dynamics (EMD) (Green-Kubo)
- Non-Equilibrium Molecular Dynamics (NEMD) (Fourier's Law)
- Reverse Perturbation Dynamics (rNEMD) (Muller-Plathe)

The simulation uses the NEMD method, which applies an external heat flux disturbance to the material. Once a steady state is reached, the temperature distribution within the structure is analyzed to compute the thermal conductivity of the material.

Fourier's Law:

$$
\kappa = -\frac{J}{A \times \nabla T}
$$

where:
- \( J \) — Heat flux
- \( A \) — Heat transfer area
- \( \nabla T \) — Temperature gradient

Heat flux \( J \) is calculated as:

$$
J = \frac{\partial E}{\partial t}
$$

where:
- \( E \) — Input energy
- \( t \) — Input time

The temperature gradient is calculated as:

$$
\nabla T = \frac{\partial T}{\partial x}
$$

where:
- \( T \) — Temperature
- \( x \) — Displacement along the heat transfer direction

## Modeling Approach

1. **Fixed boundary modeling:**

<div class="row">
    <div class="col-md-8 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/lammps-kappa1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

2. **Periodic boundary modeling:**

<div class="row">
    <div class="col-md-8 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/lammps-kappa2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

## Heat Source and Sink Setup

1. **Using `fix langevin`:**

```jsx
fix           3 Hot langevin 400 400 0.05 14565 tally yes
fix           4 Cold langevin 200 200 0.05 16576 tally yes
```

2. **Using `fix heat`:**

```jsx
fix           hot all heat 1 10 region hot
fix           cold all heat 1 -10 region cold
```

3. **Using `fix ehex`:**

```jsx
fix           hot all ehex 1 10 region hot
fix           cold all ehex 1 -1 region cold
```

## Heat Flux Calculation

**Using `fix langevin`:**

```jsx
fix           3 Hot langevin 400 400 0.05 14565 tally yes
fix           4 Cold langevin 200 200 0.05 16576 tally yes
variable      EL equal f_3
variable      ER equal f_4
fix           E_out all print 2000 "${Time} ${EL} ${ER}" file Ener_equ.dat title "Time E1 E2" screen no
```

## Temperature Gradient Calculation

```jsx
compute       ke1 all ke/atom
variable      kb equal 8.625e-5
variable      temp1 atom c_ke1/1.5/${kb}
# Define chunks
compute       18 all chunk/atom bin/1d x lower ${Dscale} units reduced
fix           11 all ave/chunk 1 10000000 10000000 18 v_temp1 file temp_equ.dat
```