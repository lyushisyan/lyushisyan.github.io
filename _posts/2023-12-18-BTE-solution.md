---
layout: post
title: Approximate Solutions of the Boltzmann Transport Equation (BTE)
date: 2023-12-18 00:32:13
description: The BTE can be approximately solved using three methods: the iterative method, the variational method, and the relaxation time approximation.
tags: physics theory
categories: study
tabs: true
---


The Boltzmann Transport Equation (BTE) can be approximately solved using three methods: the iterative method, the variational method, and the relaxation time approximation.

## Linearized BTE

The probability density distribution function, $$f_\lambda(\boldsymbol r)$$, describes the likelihood of finding particles in a particular state around the position $$\boldsymbol r$$.

The value of $$f_\lambda(\boldsymbol r)$$ changes due to three factors:  
i) If the distribution function has a nonzero gradient, the number of particles in the region changes proportionally to the gradient and the particle velocity $$\boldsymbol v$$. This is called the diffusion term.  
ii) If an external force acts on the system, particles move accordingly.  
iii) Particle interactions, such as scattering, modify the distribution. This is called the interaction term or scattering term.

In equilibrium (or steady-state conditions), the value of the distribution function is constant at every point. Thus, the rate of change of the distribution due to all three terms must sum to zero:

$$
\dot f_\lambda(\boldsymbol r) = \dot f_\lambda(\boldsymbol r)_\text{diff} + \dot f_\lambda(\boldsymbol r)_\text{ext} + \dot f_\lambda(\boldsymbol r)_\text{scatt} = 0
$$

The diffusion term can be understood in a reference frame moving with the particles. Due to particle motion, the distribution $$f_\lambda(\boldsymbol r)$$ at time $$t$$ evolves to $$f_\lambda(\boldsymbol r+\boldsymbol v t)$$:

$$
\dot f_\lambda(\boldsymbol r)_\text{diff} = -\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda(\boldsymbol r)}{\partial \boldsymbol r}
$$

The external force term $$\dot f_\lambda(\boldsymbol r)_\text{ext}$$ depends on the type of particle considered. For example, electrons may be affected by forces arising from electric or magnetic fields. Since we are interested in phonons, this external force term can be considered zero.

The scattering term describes the effects of interactions between particles or between particles and lattice defects, which can change the states of the particles. This term modifies the particle states and can be divided into the following probabilities:  
- $$P_{\lambda\lambda_1}$$: A single phonon changes state, e.g., due to scattering by lattice defects.  
- $$P_{\lambda\lambda_1\lambda_2}$$: Three-phonon processes.  
- Higher-order terms (e.g., four-phonon interactions $$P_{\lambda\lambda_1\lambda_2\lambda_3}$$).

The scattering term can be expressed as:

$$
-\dot f_\lambda(\boldsymbol r)_\text{scatt} = \sum_{\lambda_1}P_{\lambda\lambda_1} + \sum_{\lambda_1\lambda_2}P_{\lambda\lambda_1\lambda_2} + \sum_{\lambda_1\lambda_2\lambda_3}P_{\lambda\lambda_1\lambda_2\lambda_3} + \dots
$$

Each process's net probability represents the difference between the rates of particles leaving a state and entering it:

$$
P_{\lambda\lambda_1} = f_\lambda(1 \pm f_{\lambda_1})L_\lambda^{\lambda_1} - (1 \pm f_\lambda)f_{\lambda_1}L^\lambda_{\lambda_1}
$$

Here, $$L$$ is the intrinsic transition probability, and the $$\pm$$ sign corresponds to bosons and fermions, respectively.

For fermions, transitions are prohibited if the initial state is unoccupied or the final state is already occupied, reflecting the Pauli exclusion principle. In contrast, bosons impose no such limitation on the number of particles in the final state. 

In fact, the transition probability increases if particles are already present in the final state—a phenomenon called stimulated emission. Mathematically, this results from the normalization conditions of the creation and annihilation operators for bosons.

Similarly, the three-phonon scattering probability can be expressed as:

$$
P_{\lambda\lambda_1\lambda_2} = f_\lambda f_{\lambda_1}(1 \pm f_{\lambda_2})L_{\lambda\lambda_1}^{\lambda_2} - (1 \pm f_\lambda)(1 \pm f_{\lambda_1})f_{\lambda_2}L^{\lambda\lambda_1}_{\lambda_2} \\
+ \frac{1}{2}[f_\lambda(1 \pm f_{\lambda_1})(1 \pm f_{\lambda_2})L^{\lambda_1\lambda_2}_{\lambda} - (1 \pm f_\lambda)f_{\lambda_1}f_{\lambda_2}L_{\lambda_1\lambda_2}^{\lambda}]
$$

The factor $$\frac{1}{2}$$ accounts for indistinguishable interactions between states $$\lambda_1$$ and $$\lambda_2$$, as their exchange represents the same process.

Expressions for four-particle processes can also be written similarly.

Phonons in an infinite periodic solid are described by two variables: the reciprocal lattice vector $$\boldsymbol q$$ and the phonon branch index $$s$$. Thus, the summations over all states in the above equations involve integration over the Brillouin zone and summation over branch indices.

The BTE is a nonlinear integro-differential equation, and analytical solutions are essentially impossible. The first step in simplification is to linearize the BTE:

$$
f_\lambda = f_\lambda^0 - \Phi_\lambda \frac{\partial f_\lambda^0}{\partial E_\lambda}
$$

Here, $$f_\lambda^0$$ is the equilibrium Bose-Einstein distribution function, whose derivative is easy to calculate. $$E_\lambda$$ represents the energy of the state, and $$\Phi_\lambda$$ is a perturbation to the distribution function, assumed to be small.

Additionally, we assume that every point in space $$\boldsymbol r$$ maintains local equilibrium, but the temperature may vary spatially. This means $$\Phi_\lambda$$ depends on the position $$\boldsymbol r$$ only through temperature. Consequently, the diffusion term can be rewritten as:

$$
-\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda(\boldsymbol r)}{\partial \boldsymbol r} \approx -\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda^0}{\partial T}\nabla T
$$

Substituting the linearized BTE into the expressions for $$P$$ yields the generalized form:

$$
-\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda^0}{\partial T}\nabla T = \frac{1}{k_BT} \Bigg\{ \sum_{\lambda_1} (\Phi_\lambda - \Phi_{\lambda_1})\Lambda_\lambda^{\lambda_1} 
+ \sum_{\lambda_1\lambda_2} \Big[ (\Phi_\lambda + \Phi_{\lambda_1} - \Phi_{\lambda_2})\Lambda_{\lambda\lambda_1}^{\lambda_2} 
+ \frac{1}{2} (\Phi_\lambda - \Phi_{\lambda_1} - \Phi_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2} \Big] \Bigg\}
$$

This equation is quite general and applies to both electrons and phonons in solids. All details of particle interactions are encapsulated in the parameters, and the exact forms of these parameters do not affect the solution methods discussed in the next section.

## Iterative Solution

The iterative solution applies only to the BTE for three-phonon processes:

$$
-\frac{E_\lambda}{k_BT^2}f_\lambda^0(1+f_\lambda^0)\boldsymbol v \cdot\nabla T = \frac{1}{k_BT}\left\{ \sum_{\lambda_1\lambda_2}\left[(\Phi_\lambda+\Phi_{\lambda_1}-\Phi_{\lambda_2})\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}(\Phi_\lambda-\Phi_{\lambda_1}-\Phi_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2}\right] \right\}
$$

Representing the perturbation to the distribution function as $$\Phi_\lambda = \boldsymbol F_\lambda \cdot \nabla T$$ and substituting it into the equation gives:

$$
-f_\lambda^0(1+f_\lambda^0) E_\lambda \boldsymbol v_\lambda - T \sum_{\lambda_1\lambda_2}\left[(\boldsymbol F_\lambda+\boldsymbol F_{\lambda_1}-\boldsymbol F_{\lambda_2})\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}(\boldsymbol F_\lambda-\boldsymbol F_{\lambda_1}-\boldsymbol F_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2}\right] = 0
$$

Rearranging terms for $$\boldsymbol F_\lambda$$, we obtain:

$$
-f_\lambda^0(1+f_\lambda^0) E_\lambda \boldsymbol v_\lambda - T \sum_{\lambda_1\lambda_2}\left[(\boldsymbol F_{\lambda_1}-\boldsymbol F_{\lambda_2})\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}(-\boldsymbol F_{\lambda_1}-\boldsymbol F_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2}\right] = T \boldsymbol F_\lambda \sum_{\lambda_1\lambda_2}\left[\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}\Lambda_{\lambda}^{\lambda_1\lambda_2}\right]
$$

Introducing a new variable:

$$
Q_\lambda = \sum_{\lambda_1\lambda_2}\left[\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}\Lambda_{\lambda}^{\lambda_1\lambda_2}\right]
$$

Rearranging terms leads to the self-consistent equation:

$$
\boldsymbol F_\lambda = -\frac{f_\lambda^0(1+f_\lambda^0) E_\lambda \boldsymbol v_\lambda}{TQ_\lambda} + \frac{1}{Q_\lambda}\sum_{\lambda_1\lambda_2}\left[(\boldsymbol F_{\lambda_2}-\boldsymbol F_{\lambda_1})\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}(\boldsymbol F_{\lambda_1}+\boldsymbol F_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2}\right]
$$

The numerical solution to this equation can be obtained iteratively:

$$
\boldsymbol F_\lambda^{i+1} = \boldsymbol F_\lambda^0 + \frac{1}{Q_\lambda}\sum_{\lambda_1\lambda_2}\left[(\boldsymbol F_{\lambda_2}^i-\boldsymbol F_{\lambda_1}^i)\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}(\boldsymbol F_{\lambda_1}^i+\boldsymbol F_{\lambda_2}^i)\Lambda_{\lambda}^{\lambda_1\lambda_2}\right], \quad i=1,2,3,\dots
$$

### Initial Conditions

The initial conditions are:

$$
\boldsymbol F_\lambda^0 = -\frac{f_\lambda^0(1+f_\lambda^0) E_\lambda \boldsymbol v_\lambda}{TQ_\lambda}, \quad \boldsymbol F_\lambda^1 = 0
$$

Once $$\boldsymbol F_\lambda^{i+1} \approx \boldsymbol F_\lambda^i$$ within a specified tolerance, the solution is considered self-consistent, and the iteration terminates.

### Thermal Conductivity

Using Fourier's law:

$$
\boldsymbol q = -\kappa \nabla T
$$

The heat flux $$\boldsymbol q$$ can be expressed in terms of the distribution function:

$$
\boldsymbol q = \sum_\lambda E_\lambda \boldsymbol v_\lambda f_\lambda = \sum_\lambda E_\lambda \boldsymbol v_\lambda \left(f_\lambda^0-\Phi_\lambda\frac{\partial f_\lambda^0}{\partial E_\lambda}\right) \\
= \sum_\lambda E_\lambda \boldsymbol v_\lambda \frac{f_\lambda^0(1+f_\lambda^0)}{k_BT}\boldsymbol F_\lambda\cdot\nabla T
$$

The thermal conductivity tensor is then:

$$
\hat{\boldsymbol \kappa} = \sum_\lambda E_\lambda \frac{f_\lambda^0(1+f_\lambda^0)}{k_BT}\boldsymbol v_\lambda \otimes \boldsymbol F_\lambda
$$

## Variational Method

The linearized BTE in its canonical form is:

$$
\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda^0}{\partial T}\nabla T = \frac{1}{k_BT}\left\{\sum_{\lambda_1}(\Phi_\lambda-\Phi_{\lambda_1})\Lambda_\lambda^{\lambda_1} + \sum_{\lambda_1\lambda_2}\left[(\Phi_\lambda+\Phi_{\lambda_1}-\Phi_{\lambda_2})\Lambda_{\lambda\lambda_1}^{\lambda_2}+\frac{1}{2}(\Phi_\lambda-\Phi_{\lambda_1}-\Phi_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2}\right] \right\}
$$

Rewriting it in operator form:

$$
X = P\Phi
$$

Here, $$P$$ is a linear operator that satisfies the conditions of symmetry and positive definiteness:

$$
\langle \Psi, P\Phi \rangle = \langle \Phi, P\Psi \rangle
$$

$$
\langle \Phi, P\Phi \rangle > 0, \quad \text{for any } \Phi
$$

where $$\langle \cdot, \cdot \rangle$$ represents the scalar product between two functions.

### Variational Principle

The variational principle states that the function $$\Phi$$ (the exact solution to the BTE) maximizes $$\langle \Phi, P\Phi \rangle$$. This can be shown using another function $$\Psi$$ that satisfies $$\langle \Psi, X \rangle = \langle \Psi, P\Psi \rangle$$ (not the solution of BTE itself):

$$
0 \leq \langle (\Phi-\Psi), P(\Phi-\Psi) \rangle = \langle \Phi, P\Phi \rangle - \langle \Psi, P\Psi \rangle
$$

In the context of thermal conductivity, the variational principle is commonly expressed as:

$$
\frac{\langle \Phi, P\Phi \rangle}{\langle \Phi, X \rangle^2} = \min
$$

Multiplying the left-hand side of the BTE by $$\Phi$$, we obtain:

$$
-\left\langle \Phi_\lambda, \boldsymbol v_\lambda \frac{\partial f_\lambda^0}{\partial T}\nabla T \right\rangle = \frac{\nabla T}{T}\sum_\lambda \Phi_\lambda \boldsymbol v_\lambda E_\lambda \frac{\partial f_\lambda^0}{\partial E_\lambda} \\
= \frac{\boldsymbol q}{\kappa T}\sum_\lambda \Phi_\lambda \boldsymbol v_\lambda E_\lambda \frac{\partial f_\lambda^0}{\partial E_\lambda} \\
= \frac{1}{\kappa T} \left(\sum_\lambda \Phi_\lambda \boldsymbol v_\lambda E_\lambda \frac{\partial f_\lambda^0}{\partial E_\lambda} \right)^2 \\
= \frac{T}{\kappa} \left(\sum_\lambda \Phi_\lambda \boldsymbol v_\lambda \frac{\partial f_\lambda^0}{\partial T}\right)^2 \\
= \frac{T}{\kappa} \langle \Phi, X \rangle^2 \big|_{\nabla T=1}
$$

Thus, when $$\Phi$$ is the solution of the BTE under a unit temperature gradient, the inverse of the thermal conductivity $$\kappa$$ reaches its minimum.

---

## Relaxation Time Approximation

In this method, the scattering term in the Boltzmann equation is approximated as:

$$
-\dot f_\lambda(\boldsymbol r)_\text{scatt} = \frac{f_\lambda - f_\lambda^0}{\tau_\lambda}
$$

This effectively encapsulates all interaction details for each mode into a single, state-dependent relaxation time.

From the perspective of many-body theory, a small perturbation to the Hamiltonian results in two effects:

- A change in the eigenvalues of the unperturbed Hamiltonian.
- A finite lifetime for these states.

The finite lifetime is typically described by the linewidth of the states under perturbation.

Maradudin and Fein conducted a detailed analysis of many-body perturbation theory for phonons, deriving the following expression for the linewidth:

$$
\Gamma_\lambda = \frac{\pi \hbar}{16N} \sum_{\lambda'\lambda''} |\Gamma_{\lambda\lambda'\lambda''}|^2 \left\{ [f_{\lambda'}^0 + f_{\lambda''}^0 + 1][\delta(E_\lambda - E_{\lambda'} - E_{\lambda''})] \right. \\
\left. + [f_{\lambda'}^0 - f_{\lambda''}^0][\delta(E_\lambda + E_{\lambda'} - E_{\lambda''}) - \delta(E_\lambda - E_{\lambda'} + E_{\lambda''})] \right\}
$$

Here, $$\Gamma_{\lambda\lambda'\lambda''}$$ represents the Fourier transform of the third-order terms in the total energy expansion.

The relaxation time is inversely proportional to the linewidth:

$$
\tau_\lambda = \frac{1}{2\Gamma_\lambda}
$$

Combining this with the previously linearized BTE, the deviation in the distribution function becomes:

$$
f_\lambda - f_\lambda^0 = \boldsymbol v_\lambda \cdot \frac{\partial f_\lambda^0}{\partial T}\nabla T \tau_\lambda
$$

Substituting this into the expression for heat flux and applying Fourier's law, we obtain the thermal conductivity tensor:

$$
\hat{\boldsymbol \kappa} = \sum_\lambda E_\lambda^2 \frac{f_\lambda^0(1+f_\lambda^0)}{k_BT^2} \boldsymbol v_\lambda \otimes \boldsymbol v_\lambda \tau_\lambda
$$

By introducing the modal heat capacity, the expression is rewritten in a more common form:

$$
\hat{\kappa}_{ij} = \sum_\lambda C_{v,\lambda} v_{\lambda,i}v_{\lambda,j} \tau_\lambda
$$

The thermal conductivity obtained using the relaxation time approximation is equivalent to the thermal conductivity obtained from the first iteration of the iterative method. Therefore, the relaxation time approximation is also referred to as the zeroth-order approximation.

