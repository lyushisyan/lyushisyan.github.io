---
title: News
description: "Academic news, awards, invited talks, and research activities by Shixian Liu."
permalink: /news/
hide_title: true
---
{% assign sorted_news = site.data.news | sort: "date" | reverse %}
{% assign latest_news = sorted_news | first %}
{% assign oldest_news = sorted_news | last %}

<section class="listing-hero news-hero" aria-labelledby="news-heading">
  <p class="listing-hero-eyebrow">Academic activity</p>
  <h1 id="news-heading">News</h1>
  <p class="listing-hero-summary">
    Selected awards, invited talks, seminars, and research activities in thermophysics and computational materials science.
  </p>
  <div class="listing-hero-meta" aria-label="News summary">
    <span><strong>{{ sorted_news.size }}</strong> updates</span>
    <span><strong>{{ oldest_news.date | date: "%Y" }}–Present</strong> timeline</span>
  </div>
</section>

<ol class="news-timeline">
  {% for item in sorted_news %}
    {% assign news_text = item.text | default: item.title %}
    <li class="news-timeline-item">
      <span class="news-timeline-marker" aria-hidden="true"></span>
      <article class="news-card">
        <header class="news-card-header">
          <time datetime="{{ item.date }}">{{ item.date | date: "%B %d, %Y" }}</time>
          {% if item.type %}<span class="news-type">{{ item.type }}</span>{% endif %}
        </header>
        <p class="news-card-title">{{ news_text }}</p>
        {% if item.detail %}
          <a class="news-card-link" href="{{ item.detail | relative_url }}" target="_blank" rel="noopener noreferrer">View detail <span aria-hidden="true">↗</span></a>
        {% elsif item.link %}
          {% if item.link contains '://' %}
            <a class="news-card-link" href="{{ item.link }}" target="_blank" rel="noopener noreferrer">View detail <span aria-hidden="true">↗</span></a>
          {% else %}
            <a class="news-card-link" href="{{ item.link | relative_url }}" target="_blank" rel="noopener noreferrer">View detail <span aria-hidden="true">↗</span></a>
          {% endif %}
        {% endif %}
      </article>
    </li>
  {% endfor %}
</ol>
