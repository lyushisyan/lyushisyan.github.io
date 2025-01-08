---
layout: distill
title: LAMMPS 非平衡分子动力学计算热导率
date: 2024-01-19 23:36:10
tags: MD-simulations
categories: Method
giscus_comments: true
tabs: true
map: true

toc:
  -name: 热导率模拟方法
  -name: NEMD原理
  -name: 建模方式
  -name: 冷热源设置方式
  -name: 热流计算
  -name: 温度梯度计算

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
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

## 热导率模拟方法

- 平衡分子动力学（EMD）（Green-Kubo）
- 非平衡分子动力学（NEMD）（傅里叶定律）
- 反扰动动力学（rNEMD）(Muller-Plathe)

采用非平衡分子动力学（NEMD）的方法进行模拟，通过在材料结构外部施加热流扰动，达到稳定后统计结构中的温度分布，进而计算得出材料的热导率。

傅里叶定律：

$$
\kappa=-\frac{J}{A\times\nabla T}
$$

$J$ — 热流； $A$ — 传热面积； $\nabla T$ — 温度梯度

热流 $J$ 计算公式：

$$
J=\frac{\partial E}{\partial t}
$$

$E$ — 输入的能量； $t$ — 输入时间

温度梯度计算公式：

$$
\nabla T=\frac{\partial T}{\partial x}
$$

$T$ — 温度； $x$ — 传热方向位移

## 热导建模

（1）固定边界建模方式：

<div class="row">
    <div class="col-md-8 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/lammps-kappa1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

（2）周期性边界建模方式

<div class="row">
    <div class="col-md-8 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/lammps-kappa2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

## 冷热源设置方式

1. **fix langevin**

```jsx
fix           3 Hot langevin 400 400 0.05 14565 tally yes
fix           4 Cold langevin 200 200 0.05 16576 tally yes
```

1. **fix heat**

```jsx
fix           hot all heat 1 10 region hot
fix           cold all heat 1 -10 region cold
```

1. **fix ehex**

```jsx
fix           hot all ehex 1 10 region hot
fix           cold all ehex 1 -1- region cold
```

## 热流计算

**fix langevin**

```jsx
fix           3 Hot langevin 400 400 0.05 14565 tally yes
fix           4 Cold langevin 200 200 0.05 16576 tally yes
variable      EL equal f_3
variable      ER equal f_4
fix           E_out all print 2000 "${Time} ${EL} ${ER}" file
              &Ener_equ.dat title "Time E1 E2" screen no
```

## 温度梯度计算

```jsx
compute       ke1 all ke/atom
variable      kb equal 8.625e-5
variable      temp1 atom c_ke1/1.5/${kb}
# 分块设置
compute       18 all chunk/atom bin/1d x lower ${Dscale}
              units reduced
fix           11 all ave/chunk 1 10000000 10000000 18 v_temp1 file temp_equ.dat
```