---
layout: page
title: MMMSEC-2023
description: Mathematical modeling of thermal conductivity of nanowires (in Russian)
img: assets/img/talk1/MMMSEC_Page1.png
importance: 1
category: in Russian
images:
  compare: true
  slider: true
---

## <center> МАТЕМАТИЧЕСКОЕ МОДЕЛИРОВАНИЕ ТЕПЛОПРОВОДНОСТИ НАНОНИТЕЙ – ПЕРСПЕКТИВНЫХ КОМПОНЕНТОВ ПОЛУПРОВОДНИКОВОЙ ПРОМЫШЛЕННОСТИ </center>

<center> Лю Шисян, Баринов Александр Алексеевич </center>

<center> МГТУ им. Н.Э. Баумана, г. Москва </center>

**Аннотация.** В работе рассматривается теплопроводность перспективных компонентов полупроводниковой промышленности – нанонитей. Предложена математическая модель, учитывающая влияние диаметра, шероховатости поверхности, а также температуры на теплопроводность нанонитей. Верификация модели проведена на основе сравнения с известными экспериментальными данными.

**Ключевые слова:** теплопроводность, размерный эффект, плотность состояний, нанонить, шероховатость.

## <center> MATHEMATICAL MODELING OF THERMAL CONDUCTIVITY IN NANOWIRES – PROSPECTIVE COMPONENTS OF THE SEMICONDUCTOR INDUSTRY </center>

<center> S. Liu, A. A. Barinov </center>

**Abstract.** The paper considers the thermal conductivity of prospective components of the semiconductor industry – nanowires. We introduce a mathematical model that takes into account the influence of diameter, surface roughness, and temperature on the thermal conductivity of nanowires. Verification of the model was carried out due to comparison with known experimental data.

**Key words:** thermal conductivity, size effect, density of states, nanowires, roughness.

### Введение

Нанонити являются широко распространенным объектом научных исследований и опытных разработок в области полупроводниковой промышленности, оптоэлектроники и пр. в связи с их уникальными свойствами. Так экспериментальные исследования показали, что теплопроводность кремниевых (Si) нанонитей примерно на два порядка ниже, чем у массивных образцов [1]. Выделим следующие факторы, определяющие уникальные свойства нанонитей. Во-первых, влияние квантового размерного эффекта на дисперсию фононов, которое определяет набор возможных состояний фононного газа в низкоразмерных структурах, качественно отличающееся от массивного твердого тела. Во-вторых, наличие размерного эффекта, когда диффузию фононов определяет именно рассеяние на границе образца, а не внутренние процессы взаимодействия. В-третьих, это морфология поверхности нанонитей, т.е. учет шероховатости границ реального образца.

### Математическая модель

Изложение модели расчета теплопроводности приведем на примере кремниевых нанонитей. Начнем с учета квантового размерного эффекта для плотности состояний фононов в нанонитях. На основе модели упругой среды разработан программный код [2] для расчета дисперсионных соотношений $$\omega_i(k)$$ фононов в нанонитях кренмия (рис. 1) и построены плотности состояний для различных диаметров нанонитей (рис. 2), которые можно выразить как интеграл по первой зоне Бриллюэна.

$$
\text{DOS}(\omega) = \frac{1}{8\pi^3}\int_{BZ}\delta(\omega_i(k)-\omega)d^3k
$$

где $$\delta (x)$$  – дельта-функция Дирака. Из рис. 2 видно, что при увеличении диаметра нанонитей, их DOS стремится к DOS для массивного образца (3D).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk1/fig1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk1/fig2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Рис. 1. Дисперсионные соотношения в кремниевых нанонитях диаметром 2.7 нм. Рис. 2. Функция плотности состояний в нанонитях кремния и массивном образце.
</div>


Широко используемым методом учета размерного эффекта при расчете теплопроводности нитей является кинетическая модель Фукса-Зондхаймера [3]. Решая транспортное уравнение Больцмана (без внешних сил и источников) в приближении времени релаксации, можно получить общее выражение для теплопроводности:

$$
\kappa = \frac{1}{3}\sum_s\int_{\omega_{\text{min},s}}^{\omega_{\text{max},s}}\hbar\omega\frac{d\overline n(\omega,T)}{dT}\cdot\text{DOS}(\omega)\cdot\boldsymbol v^2\cdot F(\text{Kn},p) d\omega
$$

где $$ s $$ обозначает суммирование по различным поляризациям (LA и двум LA) фононов.  $$ \overline n $$ – равновесное распределение Бозе-Эйнштейна. Вклад во время релаксации  $$ \tau $$ вносят: фонон-фононное взаимодействие $$ \tau_{ph} $$, рассеяние на дефектах $$ \tau_{imp} $$  и на границах $$ \tau_b $$ :  $$ \tau^{-1} = \tau_{ph}^{-1} +\tau_{imp}^{-1} +\tau_{b}^{-1}  $$ , которые подробно описаны в работе [3]. Функция $$ F(Kn,p) $$  [3] непосредственно учитывает размерный эффект и показывает, во сколько раз длина свободного пробега фононов в нанонитях меньше, чем у массивного образца. 

Учет морфологии поверхности образца в (2) проводится через параметр зеркального отражения $$ p $$                                , который напрямую связан со среднеквадратичной шероховатостью $$ \sigma $$ [3]:

$$
p(k,\sigma,\theta) = \exp(-4k^2\sigma^2\cos^2\theta)
$$

где $$ k $$ – волновое число фонона, $$ \theta $$ – угол отражения фонона от шероховатой границы.

На основании представленной модели проведен расчет теплопроводности кремниевых нанонитей. На рис. 3(а) видно, что при температуре 300 К по мере увеличения диаметра нанонитей теплопроводность постепенно стремится к теплопроводности массивного кремния. На рис. 3(б) представлена характерная зависимость теплопроводности нанонитей кремния от температуры. Результаты расчет на рис. 3(а) и 3(б) хорошо согласуются с экспериментальными данными [1].

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk1/fig3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk1/fig4.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Рис. 3. Теплопроводность кремниевых нанонитей: (a) в зависимости от диаметра при 300К для разных среднеквадратичных шероховатостей: 0.05, 0.1 и 5 нм; (б) от температуры для диаметров 37, 56 и 115 нм.
</div>

### Выводы

Разработана математическая модель для расчета теплопроводности кремниевых нанонитей в зависимости от их диаметра, шероховатости поверхности и температуры. Сравнение с известными экспериментальными данными показало хорошую предсказательную силу модели.

### Список использованных источников

1. Li D. et al. Thermal conductivity of individual silicon nanowires // Appl. Phys. Lett. 2003. Vol. 83, no. 14, pp. 2934–2936.
2. Лю Ш., Баринов А. А. Свидетельство о гос. регистрации программы для ЭВМ № 2023617833 РФ. Программа для решения дисперсионных соотношений в нитях.
3. Лю Ш., Баринов А. А. Расчет теплопроводности кремниевых нанонитей с учетом граничных эффектов // Материалы РНКТ-8. 2022. Т. 2, С. 287-290.

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
