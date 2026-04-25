---
title: About
permalink: /about/
extra_css:
  - /assets/css/about.css
---
{% assign about = site.data.about %}
{% assign latest_news = site.data.news | sort: "date" | reverse | slice: 0, 3 %}

<section class="card about-hero">
  <div class="about-hero-media">
    <img class="about-avatar" src="{{ about.hero.avatar | relative_url }}" alt="{{ about.hero.name }}">
  </div>
  <div class="about-hero-content">
    <p class="about-role">{{ about.hero.role }}</p>
    <h2 class="about-name">{{ about.hero.name }}</h2>
    {% for paragraph in about.hero.paragraphs %}
      <p>{{ paragraph }}</p>
    {% endfor %}
    <div class="about-action-links">
      {% if about.hero.cv_url %}
        <a class="pub-btn" href="{{ about.hero.cv_url | relative_url }}" target="_blank" rel="noopener noreferrer">
          {{ about.hero.cv_label | default: "Download CV" }}
        </a>
      {% endif %}
      {% if about.hero.social_links %}
        {% for item in about.hero.social_links %}
          <a class="pub-btn" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.value | default: item.label }}</a>
        {% endfor %}
      {% endif %}
    </div>
    <div class="about-interest-chips">
      {% for interest in about.hero.interests %}
        <span class="about-chip">{{ interest }}</span>
      {% endfor %}
    </div>
  </div>
</section>

<section class="card about-panel">
  <h3>Professional Experience</h3>
  <ul class="about-timeline">
    {% for item in about.experience %}
      <li>
        <div class="about-time">{{ item.time }}</div>
        <div class="about-detail">{{ item.detail }}</div>
      </li>
    {% endfor %}
  </ul>
</section>

<section class="card about-panel">
  <h3>Education</h3>
  <ul class="about-timeline">
    {% for item in about.education %}
      <li>
        <div class="about-time">{{ item.time }}</div>
        <div class="about-detail">{{ item.detail }}</div>
      </li>
    {% endfor %}
  </ul>
</section>

<section class="card about-panel">
  <h3>Latest News</h3>
  <ul class="about-timeline">
    {% for item in latest_news %}
      {% assign news_text = item.text | default: item.title %}
      <li>
        <div class="about-time">{{ item.date | date: "%b %Y" }}</div>
        <div class="about-detail">{{ news_text }}</div>
      </li>
    {% endfor %}
  </ul>
  <p><a class="elegant-link" href="{{ '/news/' | relative_url }}">View all news</a></p>
</section>

<section class="card about-panel">
  <h3>Selected Publications</h3>
  <p id="about-selected-status" class="meta">Loading selected publications from BibTeX...</p>
  <ol id="about-selected-list" class="about-featured-pubs"></ol>
  <p><a class="elegant-link" href="{{ '/publications/' | relative_url }}">View full publication list</a></p>
  <script src="{{ '/assets/js/about-selected.js?v=20260425' | relative_url }}"
    data-bib-url="{{ '/assets/bibliography/publications.bib' | relative_url }}"
    data-site-base="{{ site.baseurl }}"></script>
</section>

<section class="card about-panel">
  <h3>Software</h3>
  {% for project in site.data.software %}
    <article class="about-software-item">
      <img class="about-software-logo" src="{{ project.logo | relative_url }}" alt="{{ project.name }} logo">
      <div>
        <p class="about-software-name">{{ project.name }}</p>
        <p class="about-software-desc">{{ project.description }}</p>
        <div class="about-software-links">
          {% if project.link %}
            <a class="pub-btn" href="{{ project.link }}" target="_blank" rel="noopener noreferrer">Repository</a>
          {% endif %}
          {% if project.docs %}
            <a class="pub-btn" href="{{ project.docs }}" target="_blank" rel="noopener noreferrer">Documentation</a>
          {% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</section>
