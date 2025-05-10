---
layout: default
title: 📝 博客
permalink: /blog/
nav: true
nav_order: 1
---

<div class="post">

  <h1><strong>📝 博客 </strong></h1>

  <style>
    .timeline {
      position: relative;
      margin: 2em 0;
      padding-left: 40px;
      border-left: 2px solid #ccc;
    }
    .timeline-entry {
      position: relative;
      margin-bottom: 2em;
    }
    .timeline-entry::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 5px;
      width: 12px;
      height: 12px;
      background: #4DBBD5;
      border-radius: 50%;
      border: 2px solid white;
    }
    .timeline-entry h3 {
      margin: 0 0 0.5em;
      font-size: 1.2rem;
      color: #333;
    }
    .timeline-entry ul {
      margin: 0;
      padding-left: 1em;
      list-style: none;
    }
    .timeline-entry li {
      margin-bottom: 0.5em;
    }
    .timeline-entry a {
      font-weight: bold;
      text-decoration: none;
      color: #2a7ae2;
    }
    .timeline-entry a:hover {
      text-decoration: underline;
    }
    .timeline-date {
      color: #888;
      font-size: 0.9rem;
    }
  </style>

  <div class="timeline">
    {% assign posts_by_year = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
    {% for year in posts_by_year %}
    <div class="timeline-entry">
      <h3>{{ year.name }}</h3>
      <ul>
        {% for post in year.items %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="timeline-date">· {{ post.date | date: "%Y-%m-%d" }}</span>
          {% if post.description %}
            <div style="color: #666; font-size: 0.9rem;">{{ post.description }}</div>
          {% endif %}
        </li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
  </div>

</div>
