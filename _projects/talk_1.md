---
layout: page
title: MMMSEC-2023
description: with background image
img: assets/img/12.jpg
importance: 1
category: work
images:
  compare: true
  slider: true
---

# <center>ВЛИЯНИЕ МОРФОЛОГИИ ПОВЕРХНОСТИ НА ЭФФЕКТИВНУЮ ТЕПЛОПРОВОДНОСТЬ НАНОНИТЕЙ</center>
---

[[Shixian Liu]], [[A.A. Barinov]]
Московский государственный технический университет имени Н. Э. Баумана,
105005, Москва, я Бауманская ул., д. 5, стр.1

---

Нанонити являются перспективным структурным элементом в наноэлектронике, оптоэлектронике и нанофотонике. При этом возникает проблема обеспечения стабильности теплофизических свойств. Так в работе показано, что при рассмотрении теплопроводности нанонитей необходимо учитывать влияние следующих определяющих факторов: диаметра $d$ (размерного эффекта), шероховатости (граничного эффекта), температуры $T$  и дисперсионных свойств фононов.

За основу расчета взята кинетическая модель теплопроводности Фукса-Зондхаймера для нитей  . [^1] При этом, во-первых, рассмотрена дисперсия фононов – модель тонкого стержня. Во-вторых, учет влияние рассеяния на границах построен на подходе Казимира-Займана-Соффера [^2]. То есть для описания свойств поверхности вводится комплексный параметр $p$, характеризующий долю фононов отраженных зеркально/диффузно от поверхности со средней квадратичной шероховатостью $\sigma$: $p(k,\theta,\sigma)=\exp(-4k^2\sigma^2\cos\theta^2)$, где $k$ – волновое число фононов; $\theta$ – угол между импульсом фонона и нормалью к идеализированной гладкой поверхности.



Разработан комплекс программ, позволяющий проводить оценку и прогнозирование теплопроводности нанонитей в зависимости от морфологии поверхности, оказывающей определяющее влияние на теплоперенос. Проведена валидация путем сравнения с экспериментальными данными [^3] по теплопроводности кремниевых нанонитей с диаметрами 37 нм, 56 нм и 115 нм в диапазоне температур от 100 до 350К (рис. 1). При этом использованные в расчете значения  хорошо согласуются с технологическими характеристиками реальных поверхностей нитей.

![1#centre|400](https://raw.githubusercontent.com/ShiXianLiu/Picture-Notes/main/7b_wire.png)

<center>Рис. 1. Эффективная теплопроводность кремниевых нанонитей.</center>



[^1]: Chantrenne P. et al. An analytical model for the thermal conductivity of silicon nanostructures // J. Appl. Phys. (2005) **97**, no. 10, p. 104318. [[2005_Chantrenne_J Appl Phys]]
[^2]: Soffer S.B. Statistical Model for the Size Effect in Electrical Conduction // J. Appl. Phys. (1967) **38**, no. 4., p. 1710–1715. [[1967_Soffer_J Appl Phys]]
[^3]: Li D. et al. Thermal conductivity of individual silicon nanowires // Appl. Phys. Lett. (2003) **83**, no. 14, p. 2934–2936. [[2003_Li_Appl Phys Lett]]

## Slides

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page1.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page2.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page3.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page4.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page5.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page6.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page7.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page8.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page9.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page10.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page11.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page12.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page13.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk1/MMMSEC_Page14.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>
