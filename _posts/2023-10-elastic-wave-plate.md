The paper studies wave propagation based on solving the **elastic equations for a continuous medium**.

In a plate, waves can be classified into longitudinal waves ($$ \text{P waves} $$) and shear waves ($$ \text{S waves} $$). $$ \text{S waves} $$ are further divided into $$ \text{SH waves} $$ and $$ \text{SV waves} $$.

![Plate](plate.png)

Assuming that the propagation direction of the wave is along the $$ x $$-axis, a particle vibrating along the $$ x $$-axis is called a $$ \text{P wave} $$, along the $$ y $$-axis is an $$ \text{SH wave} $$, and along the $$ z $$-axis is an $$ \text{SV wave} $$.

$$ \text{SV waves} $$ and $$ \text{P waves} $$ couple into $$ \text{Rayleigh-Lamb waves} $$ under stress-free boundary conditions on the plate surface.

## Elastic Wave Equation

In the approximation of a continuous medium, considering the elastic wave propagating in the plate along the $$ x $$-direction, the wave equation is:

$$
\mu\Delta\vec u+(\lambda+\mu)\nabla(\nabla\vec u) = \rho \frac{\partial^2 \vec u}{\partial t^2}
$$

where $$ \vec u $$ is the displacement vector; $$ \lambda + \mu $$ are the Lame constants, which depend on the elastic properties of the medium; $$ \rho $$ is the density of the medium.

All solutions to the wave equation can be expressed as a combination of a scalar potential $$ \varphi $$ and a vector potential $$ \vec\psi $$:

$$
\vec u =\text{grad }\varphi + \text{rot }\vec\psi
$$

---

## Dispersion Relation of SH Waves

In $$ \text{SH waves} $$, atomic displacement occurs along the $$ y $$-axis, meaning the displacement vector is $$ \vec u = (0,u_y,0) $$.

Thus, the wave equation for $$ \text{SH waves} $$ is:

$$
\frac{\partial^2 u_y}{\partial x^2}+\frac{\partial^2 u_y}{\partial z^2} = \frac{1}{c_t^2}\frac{\partial^2 u_y}{\partial t^2}
$$

where $$ c_t=\sqrt{\mu/\rho} $$ is the velocity of shear waves.

The solution is:

$$
u_y=(A_1\sin\beta z + A_2\cos\beta z)e^{i(\xi x-\omega t)}
$$

where $$ \xi $$ is the projection of the wave vector along the $$ x $$-axis; $$ \omega $$ is the frequency; $$ \beta $$ is the projection of the wave vector along the $$ z $$-axis, which satisfies:

$$
\beta^2+\xi^2=\frac{\omega^2}{c_t^2}
$$

We consider a stress-free surface on the plate, so the boundary condition is:

$$
\tau_{zy} =\mu\frac{\partial u_y}{\partial z}=0,~~y=\pm b
$$

Substituting the solution of the wave equation into the boundary conditions, we get:

$$
A_1\cos\beta b - A_2\sin\beta b =0 \\ A_1\cos\beta b + A_2\sin\beta b =0
$$

From this, we obtain the frequency equation:

$$
\cos\beta b\sin \beta b=0
$$

This equation is satisfied when:

$$
\beta b = n\pi/2~~~(n=0,1,2,3,...)
$$

The dispersion relation of $$ \text{SH waves} $$ is:

$$
\omega^2=c_t^2\left[\xi^2+\left(n\pi/2b\right)^2\right]
$$

![SH Wave Dispersion](DS_SH.png)

---

## Dispersion Relation of Rayleigh-Lamb Waves

Consider the coexistence of $$ \text{P waves} $$ and $$ \text{SV waves} $$ in a plate of thickness $$ 2b $$ with stress-free boundaries.

Since atomic motion is independent of the $$ y $$-coordinate, the displacement vector is $$ \vec u = (u_x, 0, u_z) $$, with the scalar potential $$ \varphi $$ and vector potential $$ \vec\psi = (0,\psi_y,0) $$.

The wave equations for $$ \text{Rayleigh-Lamb waves} $$ are:

$$
\frac{\partial^2 \varphi}{\partial x^2}+\frac{\partial^2 \varphi}{\partial y^2}=\frac{1}{c_l^2}\frac{\partial \varphi}{\partial t^2}
$$

$$
\frac{\partial^2 \psi_y}{\partial x^2}+\frac{\partial^2 \psi_y}{\partial y^2}=\frac{1}{c_t^2}\frac{\partial \psi_y}{\partial t^2}
$$

where $$ c_l=\sqrt{(\lambda+2\mu)/\rho} $$ is the velocity of compressional waves; $$ c_t=\sqrt{\mu/\rho} $$ is the velocity of shear waves.

The solutions to the wave equations are:

$$
\varphi=(A\sin\alpha z+B\cos\alpha z)e^{i(\xi x-\omega t)}
$$

$$
\psi_y=i(C\sin\beta z+ D\cos\beta z)e^{i(\xi x-\omega t)}
$$

$$
u_x=i\{\xi(A\sin\alpha z+B\cos\alpha z)+\beta(C\cos\beta z-D\sin\beta z)\}e^{i(\xi x-\omega t)}
$$

$$
u_z=\{\alpha(A\cos\alpha z-B\sin\alpha z)+\xi(C\sin\beta z+ D\cos\beta z)\}e^{i(\xi x-\omega t)}
$$

Boundary conditions are:

$$
\tau_{zz} = \tau_{xz} =0,~~~z=\pm b
$$

We now consider both symmetric and antisymmetric cases.

---

### **Symmetric Waves**

Apply $$ A=D=0 $$, then the displacements are:

$$
u_x=i(B\xi\cos\alpha z+ C\beta\cos\beta z)e^{i(\xi x-\omega t)}
$$

$$
u_z=(-B\alpha\sin\alpha z + C\xi\sin\beta z)e^{i(\xi x-\omega t)}
$$

The boundary conditions for $$ \tau_{zz} $$ and $$ \tau_{xz} $$ are:

$$
(\xi^2-\beta^2)B\cos\alpha b+2\xi\beta C\cos\beta b=0 \\ \pm i\left[-2\alpha \xi B\sin\alpha b+(\xi^2-\beta^2)C\sin\beta b\right]=0
$$

The frequency equation for symmetric waves propagating in the plate is:

$$
\frac{\tan\beta b}{\tan\alpha b} = -\frac{4\alpha\beta \xi^2}{(\xi^2-\beta^2)^2}
$$

![Symmetric Wave Dispersion](DS_L.png)

---

### **Antisymmetric Waves**

Apply $$ B=C=0 $$, then the displacements are:

$$
u_x=i(\xi A\sin\alpha z-\beta D\sin\beta z) e^{i(\xi x-\omega t)}
$$

$$
u_z=(\alpha A\cos\alpha z + \xi D\cos\beta z)e^{i(\xi x-\omega t)}
$$

The boundary conditions for $$ \tau_{zz} $$ and $$ \tau_{xz} $$ simplify to:

$$
\pm \left[(\xi^2-\beta^2)A\sin\alpha b -2\beta \xi D \sin\beta b\right]=0 \\ 2\alpha \xi A\cos\alpha b-(\beta^2-\xi^2) D\cos\beta b = 0
$$

The frequency equation for antisymmetric waves propagating in the plate is:

$$
\frac{\tan\beta b}{\tan\alpha b} = -\frac{(\xi^2-\beta^2)^2}{4\alpha\beta \xi^2}
$$

![Antisymmetric Wave Dispersion](DS_F.png)

---

### Rayleigh-Lamb Frequency Equation

Combining the frequency equations for symmetric and antisymmetric waves, we get:

$$
F(\alpha,\beta,\xi)=\frac{\tan\beta b}{\tan\alpha b} +\left\{\frac{4\alpha\beta \xi^2}{(\xi^2-\beta^2)^2}\right\}^{\pm 1}=0
$$

We know:

$$
\alpha^2=\omega^2/c_l^2-\xi^2=\xi^2(c^2/c_l^2 - 1) \\ \beta^2=\omega^2/c_t^2-\xi^2=\xi^2(c^2/c_t^2 - 1)
$$

It can be seen that $$ \alpha $$ and $$ \beta $$ can be real, zero, or imaginary. The frequency equation changes accordingly:

**Region I:** $$ \xi>\omega/c_t $$ (also expressed as: $$ c<c_l,c_t $$)

Replace $$ \alpha $$, $$ \beta $$ in the frequency equation with $$ i\alpha' $$, $$ i\beta' $$ (where $$ \alpha'^2=-\alpha^2,~\beta'^2=-\beta^2 $$):

$$
\frac{\tan\beta' b}{\tan\alpha' b} =-\left\{\frac{4\alpha'\beta' \xi^2}{(\xi^2-\beta'^2)^2}\right\}^{\pm 1}
$$

**Region II:** $$ \omega/c_t>\xi>\omega/c_l $$ (also expressed as: $$ c_t<c<c_l $$)

Replace $$ \alpha $$ in the frequency equation with $$ i\alpha' $$ (where $$ \alpha'^2=-\alpha^2 $$):

$$
\frac{\tan\beta b}{\tan\alpha' b} =-\left\{\frac{4\alpha'\beta \xi^2}{(\xi^2-\beta^2)^2}\right\}^{\pm 1}
$$

**Region III:** $$ \xi<\omega/c_l $$ (also expressed as: $$ c>c_l $$)

The frequency equation matches Equation (37):

$$
\frac{\tan\beta b}{\tan\alpha b} =-\left\{\frac{4\alpha\beta \xi^2}{(\xi^2-\beta^2)^2}\right\}^{\pm 1}
$$

---

## Group Velocity and Phase Velocity

**Phase velocity** is the velocity at which the phase of the wave propagates in a given direction:

$$
v_p=\frac{\omega}{k}
$$

![Phase Velocity](vp_wave.png)

**Group velocity** is the velocity at which energy is transmitted through the medium:

$$
v_g=\frac{\partial\omega}{\partial k}
$$

![Group Velocity](vg_wave.png)
