---
title: Teaching
description: "Three lectures on numerical simulation methods, with Russian Beamer slides and Jupyter notebooks."
permalink: /teaching/
hide_title: true
extra_css:
  - /assets/css/components/listing.css
  - /assets/css/components/teaching.css
---
<section class="listing-hero teaching-hero" aria-labelledby="teaching-heading">
  <h1 id="teaching-heading">Teaching</h1>
  <p class="listing-hero-summary">Numerical simulation methods · Three lectures.</p>
  <div class="teaching-hero-bottom">
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
          <h2 class="teaching-course-title">
            <span class="teaching-lang-en">{{ course.title }}</span>
            <span class="teaching-lang-ru">{{ course.title_ru | default: course.subtitle | default: course.title }}</span>
          </h2>
        </div>
      </header>

      <p class="teaching-course-overview">
        <span class="teaching-lang-en">{{ course.overview }}</span>
        <span class="teaching-lang-ru">{{ course.overview_ru | default: course.overview }}</span>
      </p>

      {% if course.topics %}
        <div class="teaching-syllabus">
          <h3><span class="teaching-lang-en">Syllabus & materials</span><span class="teaching-lang-ru">Программа и материалы</span></h3>
          <ol class="teaching-topic-list">
            {% for topic in course.topics %}
              <li>
                <span class="teaching-topic-number">{{ topic.num }}</span>
                <span class="teaching-topic-name"><span class="teaching-lang-en">{{ topic.topic }}</span><span class="teaching-lang-ru">{{ topic.topic_ru | default: topic.topic }}</span></span>
                {% capture topic_material_links %}
                  {% for material in topic.materials %}
                    {% if material.url and material.url != "" and material.url != "#" %}
                      <a class="teaching-topic-link download-link" href="{{ material.url | relative_url }}"{% if material.kind == 'notebook' %} download{% else %} target="_blank" rel="noopener noreferrer"{% endif %}{% if material.language %} hreflang="{{ material.language }}"{% endif %} aria-label="{{ topic.topic | escape }} — {{ material.name | escape }}">{% if material.kind == 'notebook' %}{% include link-icon.html name='code' %}{% else %}{% include link-icon.html name='download' %}{% endif %} {{ material.name }}</a>
                    {% endif %}
                  {% endfor %}
                {% endcapture %}
                {% assign topic_material_links = topic_material_links | strip %}
                {% if topic_material_links != "" %}<div class="teaching-topic-materials">{{ topic_material_links }}</div>{% endif %}
              </li>
            {% endfor %}
            {% if course.homeworks %}{% for homework in course.homeworks %}
              <li class="teaching-homework-row">
                <span class="teaching-topic-number">HW</span>
                <span class="teaching-topic-name"><span class="teaching-lang-en">{{ homework.title | default: "Homework" }}</span><span class="teaching-lang-ru">{{ homework.title_ru | default: "Домашнее задание" }}</span></span>
                <a class="teaching-topic-link download-link" href="{% if homework.url contains '://' %}{{ homework.url }}{% else %}{{ homework.url | relative_url }}{% endif %}" target="_blank" rel="noopener noreferrer" aria-label="PDF — {{ homework.title | default: 'Homework' | escape }}">{% include link-icon.html name='download' %} PDF</a>
              </li>
            {% endfor %}{% endif %}
          </ol>
        </div>
      {% endif %}

      {% if course.repository %}
        <footer class="teaching-card-footer">
          <a class="resource-link" href="{{ course.repository }}" target="_blank" rel="noopener noreferrer">{% include link-icon.html name='code' %}<span class="teaching-lang-en">Course repository</span><span class="teaching-lang-ru">Репозиторий курса</span></a>
        </footer>
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
