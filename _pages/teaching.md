---
layout: teaching
permalink: /teaching/
title: Teaching
description: Course materials, lecture notes, and computational resources.
nav: true
nav_order: 3

# 1. 教学理念 (支持 HTML)
teaching_intro: >
  <p class="lead font-weight-normal mb-0">
    I am dedicated to teaching graduate-level courses that integrate <strong style="color: var(--global-theme-color);">fundamental physics</strong> with <strong style="color: var(--global-theme-color);">advanced computational tools</strong>.
  </p>
  <p class="mt-3 mb-0 text-muted">
    My goal is to equip Master's students with the skills to apply Python, Machine Learning, and Ab Initio methods to solve complex thermophysical problems.
  </p>

# 2. 核心技能模块 (列表形式，方便增删)
teaching_modules:
  - title: Numerical Methods
    icon: fa-solid fa-code
    desc: Developing algorithms for solving PDEs, integration, and optimization in physics.
    tags: [Python, C++]
  
  - title: Thermal Physics
    icon: fa-solid fa-temperature-half
    desc: From macroscopic thermodynamics to microscopic phonon transport mechanisms.
    tags: [Phonons, Transport]

  - title: Simulations
    icon: fa-solid fa-microchip
    desc: Hands-on experience with first-principles calculations and MD simulations.
    tags: [DFT, MD, MLIP]

# 3. 课程列表前的介绍语
active_courses_intro: >
  Currently, I serve as an instructor for the following courses at BMSTU:
---

{% include courses.liquid %}