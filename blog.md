---
title: Blog
description: "Technical notes by Shixian Liu on phonon transport, thermophysics, DFT, molecular dynamics, and scientific computing."
permalink: /blog/
lang: en
hide_title: true
extra_css:
  - /assets/css/components/listing.css
  - /assets/css/components/blog.css
---
{% assign blog_posts = site.posts | where_exp: "post", "post.lang != 'zh'" %}
{% assign featured_posts = blog_posts | where: "featured", true %}
{% assign tags_csv = "" %}
{% for post in blog_posts %}
  {% for tag in post.tags %}
    {% assign tags_csv = tags_csv | append: tag | append: "||" %}
  {% endfor %}
{% endfor %}
{% assign sorted_tags = tags_csv | split: "||" | uniq | sort %}

<div class="blog-page-narrow">
<section class="listing-hero blog-hero" aria-labelledby="blog-heading">
  <p class="listing-hero-eyebrow">Research notes</p>
  <h1 id="blog-heading">Blog</h1>
  <p class="listing-hero-summary">Physics-first essays on phonon transport, nonequilibrium heat flow, and computational materials science.</p>
  <div class="blog-hero-bottom">
    <div class="listing-hero-meta" aria-label="Blog summary">
      <span><strong>{{ blog_posts.size }}</strong> essays</span>
      <span><strong>{{ featured_posts.size }}</strong> featured</span>
    </div>
    <div class="blog-language-switch" role="group" aria-label="Blog language switch">
      <a class="pub-btn is-active" href="{{ '/blog/' | relative_url }}">EN</a>
      <a class="pub-btn" href="{{ '/zh/blog/' | relative_url }}">中文</a>
    </div>
  </div>
</section>

{% if sorted_tags.size > 0 %}
<div class="blog-tag-cloud-wrap">
  <div id="blog-tag-cloud" class="blog-tag-cloud" role="group" aria-label="Blog tags">
    <button type="button" class="blog-tag-chip is-active" data-tag="all">All</button>
    {% for tag_name in sorted_tags %}
      {% assign clean_tag = tag_name | strip %}
      {% if clean_tag != "" %}
        {% assign tag_count = 0 %}
        {% for post in blog_posts %}
          {% if post.tags contains clean_tag %}
            {% assign tag_count = tag_count | plus: 1 %}
          {% endif %}
        {% endfor %}
        <button type="button"
          class="blog-tag-chip"
          data-tag="{{ clean_tag | slugify }}">
          {{ clean_tag }} <span class="blog-tag-count">{{ tag_count }}</span>
        </button>
      {% endif %}
    {% endfor %}
  </div>
</div>
{% endif %}

{% if blog_posts.size > 0 %}
<ul id="blog-post-list" class="item-list">
  {% for post in blog_posts %}
    {% capture post_tags_slug %}
      {% for tag in post.tags %}
        {{ tag | slugify }} 
      {% endfor %}
    {% endcapture %}
    <li>
      <article class="blog-post-item" data-tags="{{ post_tags_slug | strip }}">
        <div class="blog-post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% if post.reading_time %}<span class="blog-post-meta-dot">·</span><span>{{ post.reading_time }} read</span>{% endif %}
          {% if post.featured %}<span class="blog-featured-label">Featured</span>{% endif %}
        </div>
        <h2 class="blog-post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        {% if post.description %}<p class="blog-post-excerpt">{{ post.description }}</p>{% endif %}
        <div class="blog-post-footer">
          <div class="blog-post-tags">
            {% for tag in post.tags %}
              <button type="button"
                class="blog-post-tag"
                data-tag="{{ tag | slugify }}">
                {{ tag }}
              </button>
            {% endfor %}
          </div>
          <a class="blog-read-link" href="{{ post.url | relative_url }}">Read essay <span aria-hidden="true">→</span></a>
        </div>
      </article>
    </li>
  {% endfor %}
</ul>
{% else %}
<p>No posts yet. Add Markdown files under <code>_posts/</code>.</p>
{% endif %}
</div>

<script>
  (function () {
    var cloud = document.getElementById("blog-tag-cloud");
    var postList = document.getElementById("blog-post-list");
    if (!cloud || !postList) return;

    var chips = Array.prototype.slice.call(cloud.querySelectorAll(".blog-tag-chip"));
    var items = Array.prototype.slice.call(postList.querySelectorAll(".blog-post-item"));

    function setActiveChip(tag) {
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.getAttribute("data-tag") === tag);
      });
    }

    function filterByTag(tag) {
      items.forEach(function (item) {
        var raw = item.getAttribute("data-tags") || "";
        var tags = raw.split(/\s+/).filter(Boolean);
        var show = tag === "all" || tags.indexOf(tag) !== -1;
        item.parentElement.style.display = show ? "" : "none";
      });
      setActiveChip(tag);
    }

    cloud.addEventListener("click", function (event) {
      var chip = event.target.closest(".blog-tag-chip");
      if (!chip) return;
      filterByTag(chip.getAttribute("data-tag") || "all");
    });

    postList.addEventListener("click", function (event) {
      var btn = event.target.closest(".blog-post-tag");
      if (!btn) return;
      var tag = btn.getAttribute("data-tag");
      if (!tag) return;
      filterByTag(tag);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    filterByTag("all");
  })();
</script>
