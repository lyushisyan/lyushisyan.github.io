---
layout: distill
title: 热传递的经典动力学理论
date: 2023-04-26 00:32:13
tags: Heat-conduction
categories: Theory
tabs: true
giscus_comments: true
map: true

toc:
  - name: 经典动力学
  - name: 电介质中的传热
  - name: 金属中的传热
  - name: 玻尔兹曼方程
  - name: 傅里叶方程
  - name: 总结

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

## 经典动力学

假设一个分子移动的总路径为 $$L$$，那么它在能量转移过程中占据的总体积为 $$\pi d^2L$$（$$d$$ 为分子的直径），该体积中的分子总数为 $$\pi n d^2 L$$（$$n$$ 为分子密度），所以该分子的碰撞次数为 $$\pi n d^2 L$$。

两次碰撞之间的平均距离 $$\Lambda$$ 等于总路径 $$L$$ 与碰撞次数的比率：
$$
\Lambda = \frac{L}{n \pi d^2 L} = \frac{1}{n \sigma}
$$

其中 $$\sigma$$ 是碰撞截面。

<div class="row">
    <div class="col-md-6 text-center">
        {% include figure.liquid loading="eager" path="assets/img/blog/meanlength.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

代入理想气体分子的密度 $$n = \frac{p}{k_B T}$$：
$$
\Lambda = \frac{k_B T}{p \sigma}
$$

基于动力学理论，计算理想气体中的热流。设 $$\varepsilon$$ 为气体的内能，则一个分子的热流为：
$$
q_x = \frac{1}{2} v_x [\varepsilon(x - \Lambda_x) - \varepsilon(x + \Lambda_x)]
$$

其中 $$x$$ 是坐标；$$v_x$$ 是速度的 $$x$$-分量。

展开为泰勒级数，我们得到：
$$
q_x = -v_x \Lambda_x \frac{\text{d}\varepsilon}{\text{dx}} \approx -(\cos^2\theta) v \Lambda \frac{\text{d}\varepsilon}{\text{dx}}
$$

通过全角度积分，得到总热流：
$$
q_x = -\frac{1}{2\pi} v \Lambda \frac{\text{d}\varepsilon}{\text{dx}}
\left[\int_{\varphi=0}^{2\pi}\int_{\theta=0}^{\pi/2}\cos^2\theta\sin\theta\text{d}\theta\text{d}\varphi\right] \frac{\text{d}\varepsilon}{\text{dT}} \frac{\text{dT}}{\text{dx}}
\approx -\frac{1}{3} C v \Lambda \frac{\text{dT}}{\text{dx}}
$$

由此得到气体热导率的表达式：
$$
\lambda \approx \frac{1}{3} C v \Lambda
$$

它与热容量 $$C$$、分子速度 $$v$$ 和平均自由程 $$\Lambda$$ 成正比。

## 电介质中的传热

电介质中的热量传递由声子负责，声子是振动能量量子 $$\hbar \omega$$。
声子气体的热导率可以使用上述关系式计算：
$$
\lambda_{ph} = \frac{1}{3} C_{ph} v_s \Lambda_{\Sigma}
$$

声子散射的主要机制：
- 声子-边界散射（$$b$$）；
- 声子-杂质散射（$$imp$$）；
- 声子-声子散射（$$ph$$）。

根据马蒂森规则，我们有：
$$
\Lambda_{\Sigma}^{-1} = \Lambda_{ph}^{-1} + \Lambda_{imp}^{-1} + \Lambda_{b}^{-1}
$$

<div class="row text-center">
    <div class="col-md-6">
        {% include figure.liquid loading="eager" path="assets/img/blog/classic1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-md-6">
        {% include figure.liquid loading="eager" path="assets/img/blog/classic2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

## 金属中的传热

考虑电子气体（金属）的热导率。根据动力学理论，像对于声子一样：
$$
\lambda_{e} = \frac{1}{3} C_{e} v_F \Lambda_{e}
$$

金属中的电子被声子、缺陷和边界散射。根据 Matthiessen 规则：
$$
\frac{1}{\Lambda_e} = \frac{1}{\Lambda_{ph}} + \frac{1}{\Lambda_d} + \frac{1}{\Lambda_b}
$$

## 玻尔兹曼方程

热力学平衡状态可以通过平衡分布函数 $$f(\varepsilon, T)$$（麦克斯韦-玻尔兹曼、玻色-爱因斯坦、费米-狄拉克）来描述，它取决于能量、温度和化学势。

如果系统中的热力学平衡被破坏，则系统的状态由非平衡分布函数描述，除了能量、温度和化学势，它还可能取决于各个载流子的坐标和动量。

在封闭系统中，由于内部弛豫过程，非平衡分布会向趋于平衡分布的方向变化。玻尔兹曼方程描述这种非平衡分布函数的变化：

$$
\frac{\partial f}{\partial t} + \vec v \cdot \nabla_{\vec r} f + \vec F \cdot \nabla_{\vec p} f = \left(\frac{\partial f}{\partial t}\right)_\text{st}
$$

如果碰撞项 $$(\partial f/\partial t)_\text{st}$$ 已知，则该方程有意义。

## 傅里叶方程

在宏观系统中，傅里叶定律决定了在没有宏观运动的情况下的传热，其形式为：
$$
\vec q = -\lambda \nabla T
$$

传热方程为：
$$
\rho C_p \frac{\partial T}{\partial t} = -\nabla \vec q
$$

代入傅里叶定律，得到：
$$
\rho C_p \frac{\partial T}{\partial t} = \lambda \nabla^2 T
$$

引入热扩散系数，得到：
$$
\frac{1}{a} \frac{\partial T}{\partial t} = \nabla^2 T
$$

## 总结

- 宏观物体传热性质与特征长度和特征时间相关，分别与平均自由程和弛豫时间相比较。
- 玻尔兹曼方程适用于稀薄系统。
- 对于特征尺寸与载流子的波长相当的系统，需要采用波动性质的分析方法。
