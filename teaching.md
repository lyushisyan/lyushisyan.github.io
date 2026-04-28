---
title: Teaching
permalink: /teaching/
---
<div id="teaching-lang-toggle" class="teaching-lang-toggle" role="group" aria-label="Language switcher">
  <button type="button" class="pub-btn teaching-lang-btn is-active" data-lang="ru">RU</button>
  <button type="button" class="pub-btn teaching-lang-btn" data-lang="en">EN</button>
</div>

<div id="teaching-page" class="card teaching-table-card" data-teaching-lang="ru">
  <div class="teaching-table-wrap">
    <table class="teaching-table">
      <thead>
        <tr>
          <th><span class="teaching-lang-en">Course</span><span class="teaching-lang-ru">Курс</span></th>
          <th><span class="teaching-lang-en">Content</span><span class="teaching-lang-ru">Содержание</span></th>
          <th><span class="teaching-lang-en">Schedule</span><span class="teaching-lang-ru">Расписание</span></th>
        </tr>
      </thead>
      <tbody>
        {% for course in site.data.teaching %}
          <tr>
            <td>
              <div class="teaching-course-title">
                <span class="teaching-lang-en">{{ course.title }}</span>
                <span class="teaching-lang-ru">{{ course.title_ru | default: course.subtitle | default: course.title }}</span>
              </div>
            </td>
            <td>
              <p class="teaching-course-overview">
                <span class="teaching-lang-en">{{ course.overview }}</span>
                <span class="teaching-lang-ru">{{ course.overview_ru | default: course.overview }}</span>
              </p>
              {% if course.topics %}
                <ul class="teaching-topic-list">
                  {% for topic in course.topics %}
                    <li>
                      <strong>
                        <span class="teaching-lang-en">L{{ topic.num }}:</span>
                        <span class="teaching-lang-ru">Л{{ topic.num }}:</span>
                      </strong>
                      <span class="teaching-lang-en">{{ topic.topic }}</span>
                      <span class="teaching-lang-ru">{{ topic.topic_ru | default: topic.topic }}</span>
                      {% if topic.materials %}
                        {% for material in topic.materials %}
                          {% if material.url and material.url != "#" %}
                            <a class="teaching-topic-link" href="{{ material.url | relative_url }}" target="_blank" rel="noopener noreferrer">PDF</a>
                          {% endif %}
                        {% endfor %}
                      {% endif %}
                    </li>
                  {% endfor %}
                  {% if course.homeworks %}
                    {% for homework in course.homeworks %}
                      <li>
                        <strong>
                          <span class="teaching-lang-en">HW{{ homework.num }}:</span>
                          <span class="teaching-lang-ru">ДЗ{{ homework.num }}:</span>
                        </strong>
                        <span class="teaching-lang-en">{{ homework.title | default: "Homework" }}</span>
                        <span class="teaching-lang-ru">{{ homework.title_ru | default: "Домашнее задание" }}</span>
                        {% if homework.url contains "://" %}
                          <a class="teaching-topic-link" href="{{ homework.url }}" target="_blank" rel="noopener noreferrer">
                            <span class="teaching-lang-en">PDF</span>
                            <span class="teaching-lang-ru">PDF</span>
                          </a>
                        {% else %}
                          <a class="teaching-topic-link" href="{{ homework.url | relative_url }}" target="_blank" rel="noopener noreferrer">
                            <span class="teaching-lang-en">PDF</span>
                            <span class="teaching-lang-ru">PDF</span>
                          </a>
                        {% endif %}
                      </li>
                    {% endfor %}
                  {% endif %}
                </ul>
              {% endif %}
            </td>
            <td>
              <div class="teaching-schedule-lines">
                {% if course.year %}<div>{{ course.year }}</div>{% endif %}
                {% if course.term or course.term_ru %}
                  <div>
                    <span class="teaching-lang-en">{{ course.term }}</span>
                    <span class="teaching-lang-ru">{{ course.term_ru | default: course.term }}</span>
                  </div>
                {% endif %}
                {% if course.time or course.time_ru %}
                  <div>
                    <span class="teaching-lang-en">{{ course.time }}</span>
                    <span class="teaching-lang-ru">{{ course.time_ru | default: course.time }}</span>
                  </div>
                {% endif %}
                {% if course.location or course.location_ru %}
                  <div>
                    <span class="teaching-lang-en">{{ course.location }}</span>
                    <span class="teaching-lang-ru">{{ course.location_ru | default: course.location }}</span>
                  </div>
                {% endif %}
              </div>
            </td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
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
        btn.classList.toggle("is-active", btn.getAttribute("data-lang") === next);
      });
    }

    toggle.addEventListener("click", function (event) {
      var btn = event.target.closest(".teaching-lang-btn");
      if (!btn) return;
      setLang(btn.getAttribute("data-lang"));
    });

    setLang("ru");
  })();
</script>
