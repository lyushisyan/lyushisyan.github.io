---
title: Software
description: "Open-source scientific software developed by Shixian Liu for thermal transport and computational materials research."
permalink: /software/
hide_title: true
extra_css:
  - /assets/css/components/listing.css
  - /assets/css/components/software.css
---
<section class="listing-hero software-hero" aria-labelledby="software-heading">
  <p class="listing-hero-eyebrow">Scientific computing</p>
  <h1 id="software-heading">Software</h1>
  <p class="listing-hero-summary">Open-source tools and reproducible workflows for phonon transport, lattice thermal conductivity, and computational materials research.</p>
  <div class="listing-hero-meta" aria-label="Software summary">
    <span><strong>{{ site.data.software.size }}</strong> open-source project{% if site.data.software.size != 1 %}s{% endif %}</span>
    <span><strong>Code · Docs · Paper</strong> research-ready resources</span>
  </div>
</section>

<div class="software-grid">
  {% for project in site.data.software %}
  <article class="software-card">
    <div class="software-logo-wrap">
      {% if project.logo %}
        <img class="software-logo" src="{{ project.logo | relative_url }}" alt="{{ project.name }} logo">
      {% else %}
        <div class="software-mark" aria-label="{{ project.mark_label | default: project.name }}">
          <span class="software-mark-wave" aria-hidden="true"></span>
          <strong>{{ project.mark | default: project.name | slice: 0, 2 }}</strong>
          <small>{{ project.name }}</small>
        </div>
      {% endif %}
    </div>
    <div class="software-body">
      <div class="software-heading-row">
        <div>
          <p class="software-kicker">Research workflow</p>
          <h2 class="software-name">{{ project.name }}</h2>
        </div>
        {% if project.status %}<span class="software-status">{{ project.status }}</span>{% endif %}
      </div>
      <p class="software-description">{{ project.description }}</p>
      {% if project.tags %}
        <div class="software-tags" aria-label="Project topics">
          {% for tag in project.tags %}<span>{{ tag }}</span>{% endfor %}
        </div>
      {% endif %}
      <div class="software-links">
        {% if project.link %}
          <a class="software-link software-link-primary" href="{{ project.link }}" target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span></a>
        {% endif %}
        {% if project.docs %}
          <a class="software-link" href="{{ project.docs }}" target="_blank" rel="noopener noreferrer">Documentation <span aria-hidden="true">↗</span></a>
        {% endif %}
        {% if project.paper %}
          <a class="software-link" href="{{ project.paper }}" target="_blank" rel="noopener noreferrer">Paper <span aria-hidden="true">↗</span></a>
        {% endif %}
      </div>
    </div>
  </article>
  {% endfor %}
</div>
