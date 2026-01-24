---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post">

  {% assign blog_name_size = site.blog_name | size %}
  {% assign blog_description_size = site.blog_description | size %}

  {% if blog_name_size > 0 or blog_description_size > 0 %}
  <div class="header-bar text-center mb-1 mt-2" style="border-bottom: none;"> 
    <h1 class="font-weight-bold" style="margin-bottom: 0.5rem;">{{ site.blog_name }}</h1> 
    <h6 class="text-muted font-weight-light">{{ site.blog_description }}</h6>
  </div>
  {% endif %}

  {% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}
  <div class="tag-category-list mb-5 mt-1 text-center" style="border: none;">
    
    {% if site.display_categories.size > 0 %}
    <div class="d-flex flex-wrap justify-content-center mb-3" style="gap: 10px;">
      {% for category in site.display_categories %}
        <a class="badge badge-light border text-dark p-2" href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}" style="margin: 2px;">
          <i class="fa-solid fa-tag fa-sm"></i> {{ category }}
        </a>
      {% endfor %}
    </div>
    {% endif %}
    
    {% if site.display_tags.size > 0 %}
    <div class="d-flex flex-wrap justify-content-center" style="gap: 10px;">
      {% for tag in site.display_tags %}
        <a class="badge badge-light border text-secondary p-2" href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}" style="margin: 2px;">
          <i class="fa-solid fa-hashtag fa-sm"></i> {{ tag }}
        </a>
      {% endfor %}
    </div>
    {% endif %}

  </div>
  {% endif %}

  {% assign featured_posts = site.posts | where: "featured", "true" %}
  {% if featured_posts.size > 0 %}
  <div class="container featured-posts mb-5">
    <h3 class="mb-4 pl-3" style="border-left: 4px solid var(--global-theme-color); line-height: 1;">Featured</h3>
    
    {% assign is_even = featured_posts.size | modulo: 2 %}
    <div class="row row-cols-1 row-cols-md-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
      {% for post in featured_posts %}
      <div class="col mb-4">
        <a href="{{ post.url | relative_url }}" class="text-decoration-none">
          <div class="card h-100 hoverable shadow-sm" style="border-radius: 10px; border: none;">
            <div class="card-body">
              <div class="float-right text-danger">
                <i class="fa-solid fa-thumbtack fa-xs"></i>
              </div>
              <h4 class="card-title text-dark font-weight-bold">{{ post.title }}</h4>
              <p class="card-text text-muted" style="font-size: 0.9rem;">{{ post.description }}</p>

              {% if post.external_source == blank %}
                {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
              {% else %}
                {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
              {% endif %}
              {% assign year = post.date | date: "%Y" %}

              <p class="post-meta text-muted small mt-3 mb-0 text-uppercase" style="letter-spacing: 0.5px;">
                {{ read_time }} min read &nbsp; &middot; &nbsp; {{ year }}
              </p>
            </div>
          </div>
        </a>
      </div>
      {% endfor %}
    </div>
  </div>
  <hr class="mb-5">
  {% endif %}

  <ul class="post-list list-unstyled">

    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}

    {% for post in postlist %}

    {% if post.external_source == blank %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% else %}
      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
    {% endif %}
    {% assign year = post.date | date: "%Y" %}
    {% assign tags = post.tags | join: "" %}
    {% assign categories = post.categories | join: "" %}

    <li class="mb-0 py-4 post-item hover-row" style="border-bottom: none;">
      
      {% if post.thumbnail %}
      <div class="row align-items-center">
        <div class="col-sm-8 pr-sm-4">
      {% else %}
      <div class="row">
        <div class="col-12">
      {% endif %}
          
          <h3 class="mb-2">
            {% if post.redirect == blank %}
              <a class="post-title text-dark font-weight-bold" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {% elsif post.redirect contains '://' %}
              <a class="post-title text-dark font-weight-bold" href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
              <svg width="1.5rem" height="1.5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
                <path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            {% else %}
              <a class="post-title text-dark font-weight-bold" href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
            {% endif %}
          </h3>

          <div class="post-meta text-muted mb-2 small text-uppercase" style="letter-spacing: 0.05em; font-size: 0.8rem;">
            {{ read_time }} min read 
            &nbsp; &middot; &nbsp;
            {{ post.date | date: '%B %d, %Y' }}
            {% if post.external_source %}
            &nbsp; &middot; &nbsp; {{ post.external_source }}
            {% endif %}
          </div>

          <p class="post-description text-secondary mb-2">
            {{ post.description }}
          </p>

          <div class="post-tags small">
            {% if tags != "" %}
              {% for tag in post.tags %}
              <a class="text-muted mr-2" href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">
                <i class="fa-solid fa-hashtag fa-xs"></i> {{ tag }}
              </a>
              {% endfor %}
            {% endif %}
          </div>

        </div>

        {% if post.thumbnail %}
        <div class="col-sm-4 mt-3 mt-sm-0">
          <a href="{{ post.url | relative_url }}">
            <img class="img-fluid rounded shadow-sm hover-zoom" src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}" style="object-fit: cover; width: 100%; height: 180px;">
          </a>
        </div>
        {% endif %}
      </div>
    </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}

</div>

<style>
  /* 基础 Hover 动画 */
  .hoverable {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s;
  }
  .hoverable:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
  }
  
  /* 标题颜色 Hover */
  .post-title:hover {
    color: var(--global-theme-color) !important;
    text-decoration: none;
  }
  
  /* 图片缩放 */
  .hover-zoom {
    transition: transform 0.2s;
  }
  .hover-zoom:hover {
    transform: scale(1.02);
  }
  
  /* 徽章样式 */
  .badge-light {
    background-color: #f8f9fa;
    font-weight: 500;
  }
  .badge-light:hover {
    background-color: #e2e6ea;
    text-decoration: none;
  }

  /* --- 新增样式 --- */

  /* 列表项 Hover 背景效果 (支持暗黑模式) */
  .hover-row {
    transition: background-color 0.2s ease;
    border-radius: 8px; /* 圆角矩形背景 */
    padding-left: 1rem; /* 防止背景贴边 */
    padding-right: 1rem;
    margin-left: -1rem; /* 视觉补偿，保持文字对齐 */
    margin-right: -1rem;
  }
  .hover-row:hover {
    background-color: rgba(0, 0, 0, 0.05); /* 极淡的灰色背景 */
  }
  /* 暗黑模式下的 Hover 背景 */
  body.dark .hover-row:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
</style>