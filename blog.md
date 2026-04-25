---
title: Blog
permalink: /blog/
---
{% assign sorted_tags = site.tags | sort %}

{% if sorted_tags.size > 0 %}
<div class="blog-tag-cloud-wrap">
  <p class="blog-tag-cloud-title">Browse by Tag</p>
  <div id="blog-tag-cloud" class="blog-tag-cloud" role="group" aria-label="Blog tags">
    <button type="button" class="blog-tag-chip is-active" data-tag="all">All</button>
    {% for tag_item in sorted_tags %}
      {% assign tag_name = tag_item[0] %}
      {% assign tag_posts = tag_item[1] %}
      <button type="button"
        class="blog-tag-chip"
        data-tag="{{ tag_name | slugify }}">
        {{ tag_name }} <span class="blog-tag-count">{{ tag_posts.size }}</span>
      </button>
    {% endfor %}
  </div>
  <p id="blog-filter-status" class="blog-filter-status">Showing all posts.</p>
</div>
{% endif %}

{% if site.posts.size > 0 %}
<ul id="blog-post-list" class="item-list">
  {% for post in site.posts %}
    {% capture post_tags_slug %}
      {% for tag in post.tags %}
        {{ tag | slugify }} 
      {% endfor %}
    {% endcapture %}
    <li>
      <article class="blog-post-item" data-tags="{{ post_tags_slug | strip }}">
        <div class="blog-post-toc-row">
          <a class="blog-post-toc-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span class="blog-post-toc-dots" aria-hidden="true"></span>
          <span class="blog-post-toc-date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </div>
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
          <a class="blog-read-link" href="{{ post.url | relative_url }}">Read article →</a>
        </div>
      </article>
    </li>
  {% endfor %}
</ul>
{% else %}
<p>No posts yet. Add Markdown files under <code>_posts/</code>.</p>
{% endif %}

<script>
  (function () {
    var cloud = document.getElementById("blog-tag-cloud");
    var postList = document.getElementById("blog-post-list");
    var status = document.getElementById("blog-filter-status");
    if (!cloud || !postList) return;

    var chips = Array.prototype.slice.call(cloud.querySelectorAll(".blog-tag-chip"));
    var items = Array.prototype.slice.call(postList.querySelectorAll(".blog-post-item"));
    function updateStatus(activeTag, visibleCount) {
      if (!status) return;
      if (activeTag === "all") {
        status.textContent = "Showing all posts.";
        return;
      }
      status.textContent = "Showing " + visibleCount + " post(s) for tag: " + activeTag + ".";
    }

    function setActiveChip(tag) {
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.getAttribute("data-tag") === tag);
      });
    }

    function filterByTag(tag) {
      var visible = 0;
      items.forEach(function (item) {
        var raw = item.getAttribute("data-tags") || "";
        var tags = raw.split(/\s+/).filter(Boolean);
        var show = tag === "all" || tags.indexOf(tag) !== -1;
        item.parentElement.style.display = show ? "" : "none";
        if (show) visible += 1;
      });
      setActiveChip(tag);
      updateStatus(tag, visible);
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
