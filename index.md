---
title: Home
permalink: /
extra_css:
  - /assets/css/about.css
---
{% assign about = site.data.about %}
{% assign latest_news = site.data.news | sort: "date" | reverse | first %}

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
  <h3>Recent Highlights</h3>
  <div class="home-highlights-grid">
    <article class="home-highlight-item">
      <p class="meta">Latest News</p>
      {% if latest_news %}
        <p class="home-highlight-date">{{ latest_news.date | date: "%b %d, %Y" }}</p>
        <p class="home-highlight-text">{{ latest_news.title | default: latest_news.text }}</p>
      {% else %}
        <p class="home-highlight-text">No news available yet.</p>
      {% endif %}
      <p><a class="elegant-link" href="{{ '/news/' | relative_url }}">View all news</a></p>
    </article>

    <article class="home-highlight-item">
      <p class="meta">Latest Publication</p>
      <p id="home-latest-pub-status" class="meta">Loading latest publication from BibTeX...</p>
      <ol id="home-latest-pub-list" class="about-featured-pubs"></ol>
      <p><a class="elegant-link" href="{{ '/publications/' | relative_url }}">View full publication list</a></p>
    </article>
  </div>
  <script src="{{ '/assets/js/about-selected.js?v=20260428-home-highlights' | relative_url }}"
    data-bib-url="{{ '/assets/bibliography/publications.bib' | relative_url }}"
    data-site-base="{{ site.baseurl }}"
    data-list-id="home-latest-pub-list"
    data-status-id="home-latest-pub-status"
    data-limit="1"
    data-selected-only="false"
    data-empty-text="No publications found in BibTeX."></script>
</section>
