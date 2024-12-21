---
layout: distill
title: Dispersion Relations of Elastic Waves in Circular Rods
date: 2023-07-01 00:32:13
tags: Wave
categories: Theory
tabs: true
giscus_comments: true
map: true

toc:
  - name: Elastic Equations in Circular Rods
  - name: Torsional Waves
  - name: Longitudinal Waves
  - name: Flexural Waves
  - name: Numerical Solution

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

## Elastic Equations in Circular Rods

The general equation of elastic wave motion:

$$
\mu \nabla^2\vec u=(\lambda+\mu)\nabla(\nabla\cdot\vec u)=\rho\frac{\partial^2\vec u}{\partial t^2}
$$

where $\vec u$ is the displacement vector, $\lambda$ and $\mu$ are the Lamé constants characterizing the elastic properties of the medium, $\rho$ is the density, and $t$ is time.

Expressing the displacement vector $\vec u$ as a combination of a scalar potential $\varphi$ and a vector potential $\vec\psi$:

$$
\vec u=\nabla\varphi+\nabla\times\vec\psi
$$

Substituting the displacement vector into the elastic wave equation gives:

$$
\nabla^2\varphi=\frac{1}{c_l^2}\frac{\partial^2\varphi}{\partial t^2},~
\nabla^2\vec\psi=\frac{1}{c_t^2}\frac{\partial^2\vec\psi}{\partial t^2}
$$

where $c_l=\sqrt{(\lambda+2\mu)/\rho}$ is the speed of compressional waves and $c_t=\sqrt{\mu/\rho}$ is the speed of shear waves.

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/wire.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

In cylindrical coordinates, the displacement components are:

$$

u_r=\frac{\partial\varphi}{\partial r}+\frac{1}{r}\frac{\partial\psi_z}{\partial\theta}-\frac{\partial\psi_\theta}{\partial z} \\
u_\theta=\frac{1}{r}\frac{\partial\varphi}{\partial\theta}+\frac{\partial\psi_r}{\partial z}-\frac{\partial\psi_z}{\partial r} \\
u_z=\frac{\partial\varphi}{\partial z}+\frac{1}{r}\frac{\partial(\psi_\theta r)}{\partial r}-\frac{1}{r}\frac{\partial\psi_r}{\partial\theta}
$$

The stresses are:

$$
\tau_{rr}=\lambda\left(\frac{\partial u_r}{\partial r}+\frac{u_r}{r}+\frac{1}{r}\frac{\partial u_\theta}{\partial\theta}+\frac{\partial u_z}{\partial z}\right)+2\mu\frac{\partial u_r}{\partial r}\\
\tau_{r\theta}=\mu\left(\frac{\partial u_\theta}{\partial r}-\frac{u_\theta}{r}+\frac{1}{r}\frac{\partial u_r}{\partial\theta}\right)  \\
\tau_{rz}=\mu\left(\frac{\partial u_r}{\partial z}+\frac{\partial u_z}{\partial r}\right)
$$

Considering an infinitely long solid circular rod with radius $a$ and stress-free boundary conditions at the surface:

$$
\tau_{rr}=\tau_{r\theta}=\tau_{rz}=0,~~~r=a
$$

## Torsional Waves

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/wire-T.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

Torsional waves only involve the circumferential displacement component $u_\theta$:

$$
u_\theta=\frac{1}{\beta}BJ_1(\beta r)\exp[i(\xi z-\omega t)]
$$

From the boundary conditions, the frequency equation for torsional waves is:

$$
\beta a\cdot J_0(\beta a)-2J_1(\beta a)=0
$$

Dispersion relation:

$$
\omega^2=c_t^2(\xi^2+\beta^2)
$$

Introducing dimensionless variables $\overline\alpha=\alpha a$, $\overline\beta=\beta a$, $\overline\xi=\xi a$, and $\Omega=\omega a/c_t$, the non-dimensional dispersion relation becomes:

$$
\Omega^2=\overline\xi^2+\overline\beta^2
$$

## Flexural Waves

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/wire-F.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

For flexural waves, all three displacement components must be considered:

$$
u_r=\left[A\frac{\partial}{\partial r}J_1(\alpha r)+\frac{B}{r}J_1(\beta r)+ikCJ_2(\beta r)\right]\cos(\theta)\exp[i(\xi z-\omega t)] \\
u_\theta=\left[-\frac{A}{r}J_1(\alpha r)+ikCJ_2(\beta r)-B\frac{\partial}{\partial r}J_1(\beta r)\right]\cos(\theta)\exp[i(\xi z-\omega t)]\\
u_z=\left[ikAJ_1(\alpha r)-\frac{C}{r}\frac{\partial}{\partial r}[rJ_2(\beta r)]-\frac{C}{r}J_2(\beta r)\right]\cos(\theta)\exp[i(\xi z-\omega t)]
$$

From the boundary conditions, the frequency equation for flexural waves is:

$$
J_1(\overline\alpha)J_1^2(\overline\beta)
\begin{vmatrix}
\overline\xi^2-\overline\beta^2+4-2\Psi_\alpha & 2\overline\xi(\overline\beta^2-2+\Psi_\beta) & 2\Psi_\beta-4 \\
4-2\Psi_\alpha & 2\overline\xi(\Psi_\beta-2) & \overline\beta^2-4+2\Psi_\beta \\
2\overline\xi(\Psi_\alpha-1) & (\overline\beta^2-\overline\xi^2)(\Psi_\beta-1) & \overline\xi
\end{vmatrix}
=0
$$

$$
\Psi_\alpha = \overline\alpha J_0(\overline\alpha)/J_1(\overline\alpha)\\
\Psi_\beta = \overline\beta J_0(\overline\beta)/J_1(\overline\beta)
$$

Non-dimensional dispersion relation:

$$
\Omega^2=\overline\xi^2+\overline\beta^2 = (c_l/c_t)^2(\overline\xi^2+\overline\alpha^2)
$$

<div class="row">
    <div class="col-md-12 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/DS-wire-F.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

## Numerical Solution

Depending on whether $\alpha$ is real or imaginary, the solutions can be divided into two regions:

Region I: $\omega > c_l\xi$, $\alpha$ is real.

Region II: $\omega < c_l\xi$, $\alpha$ is imaginary, replaced by $i\alpha'$ (where $\alpha'^2 = -\alpha^2$).

For different regions, the following root-finding method is used:

1. At the smallest wavenumber, two sets of roots are determined by sweeping.

2. Based on the initial roots, the equation is solved layer by layer using an adaptive approach.

<div class="row">
    <div class="col-md-12 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/mathmethod.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

#### MATLAB Code for Adaptive Layer-by-Layer Root-Finding in Region I

```matlab
function [alphaX] = FindrealrootsL(Fun_real,XiX,alpha01,alpha02)
modei = length(alpha01);
N = length(XiX);
alphaX = zeros(modei,N);
exreal = zeros(modei,N);
alphaX(:,1) = alpha01';
alphaX(:,2) = alpha02';
NUM = zeros(modei,N);
for im = 1:modei
    delta = 1e-5;
    for ik = 3:N
        Fun_real_N = @(alpha) Fun_real(XiX(ik),alpha);
        num = 0;
        alphaleft(im) = 2*alphaX(im,ik-1) - alphaX(im,ik-2) + delta;
        alpharight(im) = 2*alphaX(im,ik-1) - alphaX(im,ik-2) - delta;
        while Fun_real_N(alphaleft(im))*Fun_real_N(alpharight(im)) > 0
            alphaleft(im) = alphaleft(im)+delta*(2*num);
            alpharight(im) = alpharight(im)+delta*(2*num);
            if Fun_real_N(alphaleft(im))*Fun_real_N(alpharight(im)) < 0
                break
            end
            alphaleft(im) = alphaleft(im)-delta*(2*num+1);
            alpharight(im) = alpharight(im)-delta*(2*num+1);
            num = num + 1;
        end
        NUM(im,ik) = num;
        [x, ~, exitflag, ~] = fzero(Fun_real_N,[alphaleft(im) alpharight(im)]);
        alphaX(im,ik) = x;
        exreal(im,ik) = exitflag;
        if exitflag == -5
            num = 0;
            Fun_real_N = @(alpha) Fun_real_N(alpha)/(alpha-x);
            while Fun_real_N(alphaleft(im))*Fun_real_N(alpharight(im)) > 0
                alphaleft(im) = alphaleft(im)+delta*(2*num);
                alpharight(im) = alpharight(im)+delta*(2*num);
                if Fun_real_N(alphaleft(im))*Fun_real_N(alpharight(im)) < 0
                    break
                end
                alphaleft(im) = alphaleft(im)-delta*(2*num+1);
                alpharight(im) = alpharight(im)-delta*(2*num+1);
                num = num + 1;
            end
            NUM(im,ik) = num;
            [x, ~, exitflag, ~] = fzero(Fun_real_N,[alphaleft(im) alpharight(im)]);
            alphaX(im,ik) = x;
            exreal(im,ik) = exitflag;
        end
    end
end
end
```

#### MATLAB Code for Adaptive Layer-by-Layer Root-Finding in Region II

```matlab
function [NUMi,alphaiX] = FindimagerootsL(Fun_image,alphai0,XiX,XiXX)
XiXX = [0 XiXX];
modei = length(XiXX);
N = length(XiX);
delta =1e-4;
alphaleft = alphai0(1)*ones(1,modei)-delta;
alpharight = alphai0(1)*ones(1,modei)+delta;
alphaiX = zeros(modei,N);
for im = 1:modei
    for ik = 1:N
        if XiX(ik) >= XiXX(im)
            Fun_image_N = @(alpha) Fun_image(XiX(ik),alpha);
            num = 0;
            while Fun_image_N(alphaleft(im))*Fun_image_N(alpharight(im)) >= 0 
                alphaleft(im) = alphaleft(im)+delta*(num-1);
                alpharight(im) = alpharight(im)+delta*(num-1);
                if Fun_image_N(alphaleft(im))*Fun_image_N(alpharight(im)) < 0
                    break
                end
            end
            NUMi(im,ik) = num;
            alphaiX(im,ik) = fzero(Fun_image_N,[alphaleft(im) alpharight(im)]);
        end
    end  
end
end
```
