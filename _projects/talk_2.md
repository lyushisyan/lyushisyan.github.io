---
layout: page
title: MIPT-66
description: Determination of harmonic properties of phonons in graphene based on the lattice dynamics method (in Russian)
img: assets/img/talk2/MIPT_Page1.png
importance: 2
category: in Russian
images:
  compare: true
  slider: true
---

## ОПРЕДЕЛЕНИЕ ГАРМОНИЧЕСКИХ СВОЙСТВ ФОНОНОВ В ГРАФЕНЕ НА ОСНОВЕ МЕТОДА ДИНАМИКИ РЕШЕТКИ

<center> Ш. Лю, А.А. Баринов, В.И. Хвесюк </center>

<center> Московский государственный технический университет имени Н. Э. Баумана </center>

Разработка достоверных и надежных методов расчета и прогнозирования свойств графена является актуальной задачей в области как фундаментальных, так и прикладных исследований и разработок. 

Графен имеет двумерную гексагональную кристаллическую решетку, поэтому теоретической основой для изучения гармонических свойств является рассмотрение динамики решетки [1]. При этом важным расчетным параметром являются межатомные силовые константы [2]. Так в элементарной ячейке графена находятся два атома, которые обозначим как $$a$$ и $$b$$, тогда динамическое характеристическое уравнение для определения дисперсии можно выразить как

$$
\begin{bmatrix}
\boldsymbol D_{aa}(\boldsymbol k) & \boldsymbol D_{ab}(\boldsymbol k) \\
\boldsymbol D_{ba}(\boldsymbol k) & \boldsymbol D_{bb}(\boldsymbol k)
\end{bmatrix}
\begin{bmatrix}
\boldsymbol A_{a}\\
\boldsymbol A_{b}
\end{bmatrix} = \omega^2(\boldsymbol k)
\begin{bmatrix}
\boldsymbol A_{a}\\
\boldsymbol A_{b}
\end{bmatrix}
$$

где $$\boldsymbol D_{aa}$$ , $$\boldsymbol D_{ab}$$ , $$\boldsymbol D_{ba}$$ и $$\boldsymbol D_{bb}$$ — динамические матрицы размера 3x3, которые определяются с помощью преобразования Фурье межатомных силовых констант. Для упрощения задачи рассматривается взаимодействие только между пятью ближайшими атомами (модель 5NNFC [3]), и используются эмпирические межатомные силовые константы [4], полученные путем аппроксимации результатов *ab initio*. Элементы тензора силовых констант каждого ближайшего соседа по оси $$x$$​​ приведены в таблице 1.

Таблица 1. Параметры силовых констант по оси $$x$$ для графена, Н/м [4]

|                           |     Радиальная     |     Плоскостная     |     Внеплоскостная     |
| ------------------------- | :----------------: | :-----------------: | :--------------------: |
| Первый ближайший сосед    |      414.644       |       134.903       |         99.063         |
| Второй ближайший сосед    |       64.680       |       -48.770       |         -7.883         |
| Третий ближайший сосед    |      -48.322       |       63.254        |         8.267          |
| Четвертый ближайший сосед |       9.036        |        2.067        |         -8.347         |
| Пятый ближайший сосед     |       16.582       |        2.660        |         1.762          |


Путем численного моделирования в Matlab рассчитаны координаты пяти соседних атомов графена с центром в атомах ($$a$$ и $$b$$) элементарной ячейки, а также силовые константы между всеми соседними атомами и центральными атомоми ($$a$$ и $$b$$​). Полученные динамические матрицы для центральных атомов подставляются в уравнение (1) для определения собственных значений – квадрата частоты фонона. Результаты расчета дисперсионных соотношений для фононов в графене представлены на рис. 1.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk2/fig1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Рис. 1. Полные дисперсионные соотношения фононов в графене для различных мод.
</div>

Далее, чтобы определить фононную плотность состояний с достаточной точностью, необходимо получить данные для $$\omega(\boldsymbol ks)$$ в большом количестве $$\boldsymbol k$$-точек (здесь мы учитывали почти 3000) в неприводимой части первой зоны Бриллюэна. В данной работе фононная плотность состояний   определяется методом отбора корней согласно выражению

$$
g(\omega)=\sum_s\frac{A}{4\pi^2}\sum_{\boldsymbol k s}\delta(\omega-\omega(\boldsymbol ks))
$$

где, $$\delta$$ — дельта-функция Дирака, $$s$$ представляет различные фононные моды, а именно ZA, TA, LA, ZO, TO и LO – изгибная, поперечная и продольная / акустическа и оптическая, соответственно (см. рис. 1). Полученная плотность фононных состояний представлена на рис. 2(а). Видно, что мода ZA имеет ненулевую плотность состояний при $$\omega=0$$ , поскольку она имеет квадратичную дисперсию вблизи точки Γ. При этом в диапазоне частот $$\omega\in[0,8\cdot10^{13} \text{rad}/\text s]$$ плотность состояний ZA значительно больше, чем у мод TA и LA, поэтому мода ZA имеет наибольшее число фононов.

На основе анализа плотности состояний фононов в графене проведем расчет теплоемкости согласно выражению

$$
C_v(T) = k_B\int_{\omega_{\text{min}}}^{\omega_{\text{max}}}\left(\frac{\hbar\omega}{k_BT}\right)^2\overline n(\omega,T)[\overline n(\omega,T)+1]\cdot g(\omega) d\omega
$$

где, $$\overline n = [\exp(\hbar\omega/k_BT)-1]^{-1}$$ — распределение Бозе-Эйнштейна, $$k_B$$ — постоянная Больцмана, $$\hbar\omega$$ — уровень энергии, связанный с фононным состоянием, $$T$$ — абсолютная температура. 

На рис. 2(б) представлены вклад различных мод $$s$$​ в теплоемкость графена и сравнение суммарной теплоемкости с экспериментальными данными [5].

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk2/fig2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/talk2/fig3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Рис. 2. (а) Плотность фононных состояний в графене; (б) Теплоемкость графена в зависимости от температуры.
</div>

Показано, что в низкочастотной области число фононов в ZA-моде значительно больше, чем у других мод, тем самым доказывая, что мода ZA играет уникальную роль в графене и важную роль в теплофизических свойствах (теплоемкости при температурах порядка и ниже температуры Дебая).

### Литература

1. *Srivastava G.P.* The Physics of Phonons. 2nd ed. Boca Raton: CRC Press, 2022. 434 p.
2. *Saito R., Dresselhaus G., Dresselhaus M.S.* Physical properties of carbon nanotubes. Repr. London: Imperial College Press, 2012. 259 p.
3. *Хвесюк В.И., Лю Ш., Инь Ф.* Расчет теплоемкости двумерного графена с учетом полных дисперсионных соотношений // Математическое моделирование в материаловедении электронных компонентов. МММЭК-2023 : Материалы V международной конференции. Москва: ООО "МАКС Пресс", 2023. С. 115–118.
4. *Mohr M.* [et al.]. Phonon dispersion of graphite by inelastic x-ray scattering // Phys. Rev. B. 2007. V. 76(3). P. 035439.
5. *Mann S.* [et al.]. Thermodynamic properties of pure and doped (B, N) graphene // RSC Adv. 2016. V. 6(15). P. 12158–12168.

## Slides

<swiper-container keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page1.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page2.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page3.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page4.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page5.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page6.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page7.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page8.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page9.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page10.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page11.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page12.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page13.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/talk2/MIPT_Page14.png" class="img-fluid rounded z-depth-1" %}</swiper-slide>
</swiper-container>
