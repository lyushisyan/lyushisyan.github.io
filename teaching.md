---
title: Teaching
description: "Course materials and schedules for numerical simulation methods and nanoscale thermal physics taught by Shixian Liu."
permalink: /teaching/
hide_title: true
---
{% assign lecture_count = 0 %}
{% for course in site.data.teaching %}
  {% assign lecture_count = lecture_count | plus: course.topics.size %}
{% endfor %}

<section class="listing-hero teaching-hero" aria-labelledby="teaching-heading">
  <p class="listing-hero-eyebrow">Courses & materials</p>
  <h1 id="teaching-heading">Teaching</h1>
  <p class="listing-hero-summary">Course outlines, lecture materials, and schedules for scientific computing and nanoscale thermal physics.</p>
  <div class="teaching-hero-bottom">
    <div class="listing-hero-meta" aria-label="Teaching summary">
      <span><strong>{{ site.data.teaching.size }}</strong> courses</span>
      <span><strong>{{ lecture_count }}</strong> lectures</span>
      <span><strong>EN · RU</strong> bilingual materials</span>
    </div>
    <div id="teaching-lang-toggle" class="teaching-lang-toggle" role="group" aria-label="Language switcher">
      <button type="button" class="pub-btn teaching-lang-btn" data-lang="ru" aria-pressed="false">RU</button>
      <button type="button" class="pub-btn teaching-lang-btn is-active" data-lang="en" aria-pressed="true">EN</button>
    </div>
  </div>
</section>

<div id="teaching-page" class="teaching-course-grid" data-teaching-lang="en">
  {% for course in site.data.teaching %}
    <article class="teaching-index-card">
      <header class="teaching-card-header">
        <div>
          <p class="teaching-course-number">
            <span class="teaching-lang-en">Course {{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
            <span class="teaching-lang-ru">Курс {{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
          </p>
          <h2 class="teaching-course-title">
            <span class="teaching-lang-en">{{ course.title }}</span>
            <span class="teaching-lang-ru">{{ course.title_ru | default: course.subtitle | default: course.title }}</span>
          </h2>
        </div>
        {% if course.term or course.term_ru %}
          <span class="teaching-term-badge">
            <span class="teaching-lang-en">{{ course.term }}</span>
            <span class="teaching-lang-ru">{{ course.term_ru | default: course.term }}</span>
          </span>
        {% endif %}
      </header>

      <p class="teaching-course-overview">
        <span class="teaching-lang-en">{{ course.overview }}</span>
        <span class="teaching-lang-ru">{{ course.overview_ru | default: course.overview }}</span>
      </p>

      <div class="teaching-card-meta">
        {% if course.year %}<span><strong><span class="teaching-lang-en">Year</span><span class="teaching-lang-ru">Год</span></strong>{{ course.year }}</span>{% endif %}
        {% if course.time or course.time_ru %}<span><strong><span class="teaching-lang-en">Time</span><span class="teaching-lang-ru">Время</span></strong><span class="teaching-lang-en">{{ course.time }}</span><span class="teaching-lang-ru">{{ course.time_ru | default: course.time }}</span></span>{% endif %}
        {% if course.location or course.location_ru %}<span><strong><span class="teaching-lang-en">Location</span><span class="teaching-lang-ru">Место</span></strong><span class="teaching-lang-en">{{ course.location }}</span><span class="teaching-lang-ru">{{ course.location_ru | default: course.location }}</span></span>{% endif %}
      </div>

      {% if course.topics %}
        <div class="teaching-syllabus">
          <h3><span class="teaching-lang-en">Syllabus & materials</span><span class="teaching-lang-ru">Программа и материалы</span></h3>
          <ol class="teaching-topic-list">
            {% for topic in course.topics %}
              <li>
                <span class="teaching-topic-number">{{ topic.num }}</span>
                <span class="teaching-topic-name"><span class="teaching-lang-en">{{ topic.topic }}</span><span class="teaching-lang-ru">{{ topic.topic_ru | default: topic.topic }}</span></span>
                {% if topic.materials %}{% for material in topic.materials %}{% if material.url and material.url != "#" %}<a class="teaching-topic-link" href="{{ material.url | relative_url }}" target="_blank" rel="noopener noreferrer">PDF</a>{% endif %}{% endfor %}{% endif %}
              </li>
            {% endfor %}
            {% if course.homeworks %}{% for homework in course.homeworks %}
              <li class="teaching-homework-row">
                <span class="teaching-topic-number">HW</span>
                <span class="teaching-topic-name"><span class="teaching-lang-en">{{ homework.title | default: "Homework" }}</span><span class="teaching-lang-ru">{{ homework.title_ru | default: "Домашнее задание" }}</span></span>
                <a class="teaching-topic-link" href="{% if homework.url contains '://' %}{{ homework.url }}{% else %}{{ homework.url | relative_url }}{% endif %}" target="_blank" rel="noopener noreferrer">PDF</a>
              </li>
            {% endfor %}{% endif %}
          </ol>
        </div>
      {% endif %}

      {% if course.repository %}
        <footer class="teaching-card-footer"><a href="{{ course.repository }}" target="_blank" rel="noopener noreferrer"><span class="teaching-lang-en">Course repository</span><span class="teaching-lang-ru">Репозиторий курса</span> <span aria-hidden="true">↗</span></a></footer>
      {% endif %}
    </article>
  {% endfor %}
</div>

<script>
  (function () {
    var page = document.getElementById("teaching-page");
    var toggle = document.getElementById("teaching-lang-toggle");
    if (!page || !toggle) return;

    var buttons = Array.prototype.slice.call(toggle.querySelectorAll(".teaching-lang-btn"));
    function setLang(lang) {
      var next = lang === "en" ? "en" : "ru";
      page.setAttribute("data-teaching-lang", next);
      buttons.forEach(function (btn) {
        var active = btn.getAttribute("data-lang") === next;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      document.documentElement.setAttribute("lang", next);
      try { window.localStorage.setItem("teaching-language", next); } catch (error) {}
    }

    toggle.addEventListener("click", function (event) {
      var btn = event.target.closest(".teaching-lang-btn");
      if (!btn) return;
      setLang(btn.getAttribute("data-lang"));
    });

    var savedLanguage = "";
    try { savedLanguage = window.localStorage.getItem("teaching-language") || ""; } catch (error) {}
    setLang(savedLanguage === "ru" ? "ru" : "en");
  })();
</script>
