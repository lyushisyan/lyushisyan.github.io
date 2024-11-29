



Approximate Solutions of the Boltzmann Transport Equation (BTE)

The Boltzmann Transport Equation (BTE) can be approximately solved using three methods: the iterative method, the variational method, and the relaxation time approximation.

---

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

### Diffusion Term
The diffusion term can be understood in a reference frame moving with the particles. Due to particle motion, the distribution $$f_\lambda(\boldsymbol r)$$ at time $$t$$ evolves to $$f_\lambda(\boldsymbol r+\boldsymbol v t)$$:

$$
\dot f_\lambda(\boldsymbol r)_\text{diff} = -\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda(\boldsymbol r)}{\partial \boldsymbol r}
$$

### External Force Term
The external force term $$\dot f_\lambda(\boldsymbol r)_\text{ext}$$ depends on the type of particle considered. For example, electrons may be affected by forces arising from electric or magnetic fields. Since we are interested in phonons, this external force term can be considered zero.

### Scattering Term
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

### Three-Phonon Processes
Similarly, the three-phonon scattering probability can be expressed as:

$$
P_{\lambda\lambda_1\lambda_2} = f_\lambda f_{\lambda_1}(1 \pm f_{\lambda_2})L_{\lambda\lambda_1}^{\lambda_2} - (1 \pm f_\lambda)(1 \pm f_{\lambda_1})f_{\lambda_2}L^{\lambda\lambda_1}_{\lambda_2} \\
+ \frac{1}{2}[f_\lambda(1 \pm f_{\lambda_1})(1 \pm f_{\lambda_2})L^{\lambda_1\lambda_2}_{\lambda} - (1 \pm f_\lambda)f_{\lambda_1}f_{\lambda_2}L_{\lambda_1\lambda_2}^{\lambda}]
$$

The factor $$\frac{1}{2}$$ accounts for indistinguishable interactions between states $$\lambda_1$$ and $$\lambda_2$$, as their exchange represents the same process.

Expressions for four-particle processes can also be written similarly.

---

### Phonons in Periodic Solids
Phonons in an infinite periodic solid are described by two variables: the reciprocal lattice vector $$\boldsymbol q$$ and the phonon branch index $$s$$. Thus, the summations over all states in the above equations involve integration over the Brillouin zone and summation over branch indices.

---

### Linearization of the BTE
The BTE is a nonlinear integro-differential equation, and analytical solutions are essentially impossible. The first step in simplification is to linearize the BTE:

$$
f_\lambda = f_\lambda^0 - \Phi_\lambda \frac{\partial f_\lambda^0}{\partial E_\lambda}
$$

Here, $$f_\lambda^0$$ is the equilibrium Bose-Einstein distribution function, whose derivative is easy to calculate. $$E_\lambda$$ represents the energy of the state, and $$\Phi_\lambda$$ is a perturbation to the distribution function, assumed to be small.

Additionally, we assume that every point in space $$\boldsymbol r$$ maintains local equilibrium, but the temperature may vary spatially. This means $$\Phi_\lambda$$ depends on the position $$\boldsymbol r$$ only through temperature. Consequently, the diffusion term can be rewritten as:

$$
-\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda(\boldsymbol r)}{\partial \boldsymbol r} \approx -\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda^0}{\partial T}\nabla T
$$

### Generalized Linearized BTE
Substituting the linearized BTE into the expressions for $$P$$ yields the generalized form:

$$
-\boldsymbol v_\lambda \cdot \frac{\partial f_\lambda^0}{\partial T}\nabla T = \frac{1}{k_BT}\left\{\sum_{\lambda_1}(\Phi_\lambda - \Phi_{\lambda_1})\Lambda_\lambda^{\lambda_1} + \sum_{\lambda_1\lambda_2}\left[(\Phi_\lambda + \Phi_{\lambda_1} - \Phi_{\lambda_2})\Lambda_{\lambda\lambda_1}^{\lambda_2} + \frac{1}{2}(\Phi_\lambda - \Phi_{\lambda_1} - \Phi_{\lambda_2})\Lambda_{\lambda}^{\lambda_1\lambda_2}\right] \right\}
$$

This equation is quite general and applies to both electrons and phonons in solids. All details of particle interactions are encapsulated in the parameters, and the exact forms of these parameters do not affect the solution methods discussed in the next section.


