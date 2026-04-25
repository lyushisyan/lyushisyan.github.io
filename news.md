---
title: News
permalink: /news/
---
{% assign sorted_news = site.data.news | sort: "date" | reverse %}

<ul class="item-list">
  {% for item in sorted_news %}
    {% assign news_text = item.text | default: item.title %}
    <li>
      <div class="item-date">{{ item.date }}</div>
      <div><strong>{{ news_text }}</strong>
      {% if item.detail %}
        <a class="pub-btn news-detail-link" href="{{ item.detail | relative_url }}" target="_blank" rel="noopener noreferrer">Detail</a>
      {% elsif item.link %}
        {% if item.link contains '://' %}
          <a class="pub-btn news-detail-link" href="{{ item.link }}" target="_blank" rel="noopener noreferrer">Detail</a>
        {% else %}
          <a class="pub-btn news-detail-link" href="{{ item.link | relative_url }}" target="_blank" rel="noopener noreferrer">Detail</a>
        {% endif %}
      {% endif %}
      </div>
    </li>
  {% endfor %}
</ul>
