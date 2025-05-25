---

layout: distill
title: Training Neural-Evolution Machine Learning Potentials
date: 2025-04-17 23:36:10
categories: Machine-Learning
tabs: true
map: true

toc:
  - name: 1. From Coordinates to Descriptor Vectors
  - name: 2. From Descriptors to Site Energy
  - name: 3. Training the Machine Learning Potential

---

Classical interatomic potentials play a critical role in atomic simulations by enabling efficient calculation of various material properties. Machine learning-based interatomic potentials can achieve quantum-level accuracy while significantly reducing computational cost.

To date, a variety of machine learning models have been used to construct interatomic potentials, including:

* Artificial neural networks [Phys. Rev. Lett. 98, 146401 (2007)]
* Gaussian regression [Phys. Rev. Lett. 104, 136403 (2010)]
* Linear regression [J. Comput. Phys. 285, 316 (2015)]

For any model, many fitting parameters need to be determined by training on quantum mechanical data. This abundance of parameters gives machine learning potentials their superior interpolation capability over traditional empirical potentials.

However, finding an optimized set of parameters is not easy. Traditional training of neural network potentials relies on gradient descent, which can get trapped in local minima of the loss function and result in suboptimal solutions.

A better approach is based on **evolutionary algorithms**, a global search method. When combined with neural networks, this is referred to as **neuroevolution**.

The state-of-the-art evolutionary algorithm, **separable natural evolution strategies** (SNES), is particularly suitable for evolving large-scale neural networks.
[J. Mach. Learn. Res. 15, 949 (2014)]

Although evolutionary algorithms are less likely to get stuck in local minima, these population-based methods require many evaluations of the loss function per iteration and are usually more computationally expensive than gradient-based methods.

## 1. From Coordinates to Descriptor Vectors

In machine learning potentials, the site energy \$U_i\$ is not modeled directly as a function of relative coordinates \${\mathbf r_{ij}}\$, but rather as a function of a **high-dimensional descriptor vector**, whose components are invariant to spatial translation, 3D rotation and inversion, and permutation of identical atoms.

Numerous descriptors have been proposed, such as:

* Behler’s symmetry functions [J. Chem. Phys. 134, 074106 (2011)]
* Smooth overlap of atomic positions (SOAP) [Phys. Rev. B 87, 184115 (2013)]
* Bispectrum [Phys. Rev. Lett. 104, 136403 (2010)]
* Coulomb matrix [Phys. Rev. Lett. 108, 058301 (2012)]
* Moment tensor [Multiscale Model. Simul. 14, 1153 (2016)]
* Atomic cluster expansions [Phys. Rev. B 99, 014104 (2019)]
* Embedded atom descriptor [J. Phys. Chem. Lett. 10, 4962 (2019)]
* Gaussian moments [J. Chem. Theory Comput. 16, 5410 (2020)]
* Atomic permutationally invariant polynomials [Mach. Learn.: Sci. Technol. 1, 015004 (2020)]

Several libraries implement these descriptors:
[Comput. Phys. Commun. 207, 310 (2016)]
[Comput. Phys. Commun. 247, 106949 (2020)]
[Mach. Learn.: Sci. Technol. 2, 027001 (2021)]

An overview of atomic environment descriptors can be found in: [J. Chem. Phys. 150, 154110 (2019)]

### 1.1 Single-Component Systems

The following descriptors are inspired by **Behler’s symmetry functions** and **optimized SOAP**.

For a central atom \$i\$ in a single-component system, a set of **radial descriptor components** (\$n \geq 0\$) is defined as:

$$
q_n^i = \sum_{j\neq i} g_n(r_{ij}) \tag{1}
$$

And a set of **angular descriptor components** (\$n \geq 0\$ and \$l \geq 1\$):

$$
q_{nl}^i = \sum_{j\neq i}\sum_{k\neq i} g_n(r_{ij}) g_n(r_{ik}) P_l(\cos\theta_{ijk}) \tag{2}
$$

where \$P_l(\cos\theta_{ijk})\$ is the Legendre polynomial of degree \$l\$, and \$\theta_{ijk}\$ is the angle formed between bonds \$ij\$ and \$ik\$.

The function \$g_n(r_{ij})\$ is a **radial function**, defined using the Chebyshev polynomials of the first kind as a function of \$x \equiv 2(r_{ij}/r_c − 1)^2 − 1\$:

$$
g_n(r_{ij}) = \frac{T_n(x)+1}{2} f_c(r_{ij}) \tag{3}
$$

Here, \$x\$ ranges from -1 to 1.

The function \$f_c(r_{ij})\$ is a **cutoff function**:

$$
f_c(r_{ij}) =
\begin{cases}
(1+\cos(\pi r_{ij}/r_c))/2 &\quad r\leq r_c \\
0 &\quad r > r_c \\
\end{cases} \tag{4}
$$

Note that radial functions are used in both radial and angular descriptors:

* Radial components are expanded up to \$n_\text{max}^\text R\$, i.e., \$n = 0, 1, ..., n_\text{max}^\text R\$
* Angular components are expanded up to \$n_\text{max}^\text A\$ in radial terms and up to \$l_\text{max}\$ in angular terms

The dimension of the full descriptor vector is:

$$
N_\text{des} = (n_\text{max}^{\text R} + 1) + (n_\text{max}^{\text A} + 1) l_\text{max} \tag{5}
$$

Note: cutoff radii for radial and angular components can differ, denoted \$r_c^\text R\$ and \$r_c^\text A\$.

* Radial components capture longer-range interactions (e.g., Coulomb and van der Waals),
* Angular components capture mid-range interactions.

### 1.2 Multi-Component Systems

The above discussion omits atom species. For multi-component systems, descriptors are constructed by:

* Multiplying terms in Eq. (1) with weights like \$Z_j\$
* Multiplying terms in Eq. (2) with weights like \$Z_jZ_k\$

This method is used in the PyXtal_FF package and applies to all implemented descriptors.

With our definition of \$g_n(r_{ij})\$ in Eq. (3), the cutoff function is modified as: \$f_c(r_{ij})Z_j\$ or \$f_c(r_{ij})\sqrt{Z_iZ_j}\$.

## 2. From Descriptors to Site Energy

In machine learning potentials, the site energy is modeled as a function of descriptor components:

$$
U_i = U_i(\{q_{nl}^i\}) \tag{6}
$$

This is a multivariable scalar function.

Different machine learning models have been used to construct this function, including **neural networks**, **Gaussian regression**, and **linear regression**. In NEP, we choose a **feedforward neural network**.

The descriptor vector forms the input layer, and the site energy is the output layer. One or more hidden layers may lie in between.

Let \$q_\nu^i\$ be the descriptor vector (merging \$n\$ and \$l\$ into \$\nu\$). Let \$x_\mu\$ denote the hidden layer neuron states (\$1 \leq \mu \leq N_\text{neu}\$).

Then the hidden layer state is computed as:

$$
x_\mu = \tanh\left(\sum_{\nu=1}^{N_\text{des}} w_{\mu\nu}^{(1)} q_\nu^i - b_\mu^{(1)}\right) \tag{7}
$$

Here, \$w_{\mu\nu}^{(1)}\$ is the weight between input \$\nu\$ and neuron \$\mu\$, and \$b_\mu^{(1)}\$ is the bias.

We use the hyperbolic tangent as the activation function.

The output (site energy) is computed as a linear combination of hidden neurons:

$$
U_i = \sum_{\mu=1}^{N_\text{neu}} w_\mu^{(2)} x_\mu - b^{(2)} \tag{8}
$$

## 3. Training the Machine Learning Potential

### 3.1 Defining the Loss Function

The goal is to determine the weights and biases that minimize a **loss function** measuring error between the ML-predicted quantities (energy, forces, stress) and quantum target data.

Let \$\mathbf z\$ be the vector of all network parameters, of dimension \$N_\text{par}\$. For a single-hidden-layer network:

$$
N_\text{par} = (N_\text{des}+2)N_\text{neu} + 1 \tag{9}
$$

The **loss function** \$L\$ is a function of \$\mathbf z\$:

$$
L = L(\mathbf z) \tag{10}
$$

Training becomes a **real-valued optimization problem**:

$$
\mathbf z^* = \min L(\mathbf z) \tag{11}
$$

Here, \$\mathbf z^\*\$ are the optimal parameters.

The total loss combines several weighted terms:

* Energy loss \$L_\text{e}(\mathbf z)\$
* Force loss \$L_\text{f}(\mathbf z)\$
* Stress loss \$L_\text{v}(\mathbf z)\$
* Regularization losses \$L_1(\mathbf z)\$ and \$L_2(\mathbf z)\$

The total loss is:

$$
L(\mathbf z) = \lambda_\text{e} L_\text{e} + \lambda_\text{f} L_\text{f} + \lambda_\text{v} L_\text{v} + \lambda_1 L_1 + \lambda_2 L_2 \tag{12}
$$

* **Energy loss** (RMSE):

$$
L_\text{e}(\mathbf z) = \left( \frac{1}{N_\text{str}} \sum_{n=1}^{N_\text{str}} (U^\text{NEP}(n,\mathbf z) - U^\text{tar}(n))^2 \right)^{1/2} \tag{13}
$$

$$
U = \sum_i U_i \tag{14}
$$

* **Force loss** (RMSE):

$$
L_\text{f}(\mathbf z) = \left( \frac{1}{3N} \sum_{i=1}^{3N} (\mathbf F_i^\text{NEP} - \mathbf F_i^\text{tar})^2 \right)^{1/2} \tag{15}
$$

$$
\mathbf F_i = \sum_{j\neq i} \mathbf F_{ij} \tag{16}
$$

$$
\mathbf F_{ij} = \frac{\partial U_i}{\partial \mathbf r_{ij}} - \frac{\partial U_j}{\partial \mathbf r_{ji}} \tag{17}
$$

* **Stress loss** (RMSE):

$$
L_\text{v}(\mathbf z) = \left( \frac{1}{6N_\text{str}} \sum_{n=1}^{N_\text{str}} \sum_{\mu\nu} (W^\text{NEP}_{\mu\nu}(n) - W^\text{tar}_{\mu\nu}(n))^2 \right)^{1/2} \tag{18}
$$

$$
\mathbf W_i = \sum_{j\neq i} \mathbf r_{ij} \otimes \frac{\partial U_j}{\partial \mathbf r_{ji}} \tag{19}
$$

* **Regularization terms**:

$$
L_1(\mathbf z) = \frac{1}{N_\text{par}} \sum_{n=1}^{N_\text{par}} |z_n| \tag{20}
$$

$$
L_2(\mathbf z) = \left( \frac{1}{N_\text{par}} \sum_{n=1}^{N_\text{par}} z_n^2 \right)^{1/2} \tag{21}
$$

Regularization helps prevent overfitting by keeping weights small.

Recommended weights:

* \$\lambda_\text{e} = \lambda_\text{f} = \lambda_\text{v} = 1\$ for eV/atom (energy), eV/Å (force)
* Tune \$\lambda_1\$, \$\lambda_2\$ for balance between overfitting and underfitting

### 3.2 Separable Natural Evolution Strategies as Training Algorithm

SNES is a derivative-free black-box optimizer that follows the **natural gradient** of the loss function.

**Workflow**:

1. **Initialization**:
   Create an initial search distribution with mean \$\mathbf m\$ and standard deviation \$\mathbf s\$ (e.g., \$\mathbf m \in \[-0.5, 0.5]\$, \$\mathbf s = 0.1\$)

2. **Iterations** for \$N_\text{gen}\$ generations:

* a. Generate population of candidate solutions:

$$
\mathbf z_k \leftarrow \mathbf m + \mathbf s \odot \mathbf r_k \tag{22}
$$

where \$\mathbf r_k\$ is drawn from a standard normal distribution.

* b. Evaluate all \$L(\mathbf z_k)\$ and sort candidates

* c. Update natural gradients:

$$
\nabla_{\mathbf m} \mathbf J \leftarrow \sum_k u_k \mathbf r_k \tag{23}
$$

$$
\nabla_{\mathbf s} \mathbf J \leftarrow \sum_k u_k (\mathbf r_k \odot \mathbf r_k - 1) \tag{24}
$$

where \$u_k\$ are rank-based utility values.

* d. Update search distribution:

$$
\mathbf m \leftarrow \mathbf m + \eta_\mathbf{m} (\mathbf s \odot \nabla_{\mathbf m} \mathbf J) \tag{25}
$$

$$
\mathbf s \leftarrow \mathbf s + \exp\left(\frac{\eta_\mathbf{s}}{2} \nabla_{\mathbf s} \mathbf J\right) \tag{25}
$$

where \$\eta_\mathbf{m}\$ and \$\eta_\mathbf{s}\$ are learning rates.
