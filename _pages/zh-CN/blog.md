---
layout: default
title: 博客
permalink: /blog/
nav: true
nav_order: 1
---

<div class="post">

  <h1><strong>{{ page.title }} </strong></h1>
  <h2 style="margin-top: 1.5em; font-size: 1.6rem;">
    <strong>Tags </strong>
  </h2>

  <div class="tag-category-list" style="text-align: left;">
    <ul class="p-0 m-0">
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.categories %}
        {% assign category_name = category[0] %}
        {% assign posts_in_category = category[1] %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i>
          <a href="{{ category_name | slugify | prepend: '/blog/category/' | relative_url }}">
            {{ category_name }} ({{ posts_in_category | size }})
          </a>
        </li>
      {% endfor %}
    </ul>
  </div>

  <h2 style="margin-top: 1.5em; font-size: 1.6rem;">
    <strong>Archives </strong>
  </h2>

  <style>
    .timeline {
      position: relative;
      margin: 2em 0;
      padding-left: 40px;
      border-left: 2px solid #ccc;
    }
    .timeline-entry {
      position: relative;
      padding-left: 14px;
      margin-bottom: 2em;
    }
    .timeline-entry::before {
      content: '';
      position: absolute;
      left: -16px;
      top: 3px;
      width: 14px;
      height: 14px;
      background: #4DBBD5;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 0 6px rgba(77, 187, 213, 0.8);
      transition: transform 0.3s ease;
    }

    .timeline-entry:hover::before {
      transform: scale(1.3);
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
