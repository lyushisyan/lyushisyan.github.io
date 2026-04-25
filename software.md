---
title: Software
permalink: /software/
---
{% for project in site.data.software %}
<article class="card software-card">
  <div class="software-logo-wrap">
    {% if project.logo %}
      <img class="software-logo" src="{{ project.logo | relative_url }}" alt="{{ project.name }} logo">
    {% endif %}
  </div>
  <div class="software-body">
    <h2 class="software-name">{{ project.name }}</h2>
    <p class="software-description">{{ project.description }}</p>
    <div class="software-links">
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
