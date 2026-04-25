---
title: Home
permalink: /
extra_css:
  - /assets/css/about.css
---
{% assign about = site.data.about %}

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
