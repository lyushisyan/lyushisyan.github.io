---
title: Publications
description: "Peer-reviewed publications by Shixian Liu on phonon transport, thermal physics, and computational materials science."
permalink: /publications/
math: true
hide_title: true
extra_css:
  - /assets/css/components/publications.css
---
{% assign publication_groups = site.data.publications | group_by: "year" %}
{% assign first_or_cofirst_publications = site.data.publications | where: "self_first_or_cofirst", true %}
{% assign corresponding_publications = site.data.publications | where: "self_corresponding", true %}

<section class="publication-hero" aria-labelledby="publications-heading">
  <p class="publication-hero-eyebrow">Research output</p>
  <h1 id="publications-heading">Publications</h1>
  <p class="publication-hero-summary">Browse published papers and citation data.</p>

  <div class="publication-stat-grid" aria-label="Publication summary">
    <div class="publication-stat">
      <span class="publication-stat-value">{{ site.data.publications.size }}</span>
      <span class="publication-stat-label">Papers</span>
    </div>
    <div class="publication-stat">
      <span class="publication-stat-value">{{ first_or_cofirst_publications.size }} / {{ corresponding_publications.size }}</span>
      <span class="publication-stat-label">First or co-first / corresponding</span>
    </div>
    <a class="publication-stat publication-stat-link" href="{{ site.data.site_stats.scholar_url }}" target="_blank" rel="noopener noreferrer" aria-label="View current citations on Google Scholar">
      <span class="publication-stat-value">{{ site.data.site_stats.citations }} <span class="publication-stat-arrow" aria-hidden="true">↗</span></span>
      <span class="publication-stat-label">Citations</span>
    </a>
    <a class="publication-stat publication-stat-link" href="{{ site.data.site_stats.scholar_url }}" target="_blank" rel="noopener noreferrer" aria-label="View current H-index on Google Scholar">
      <span class="publication-stat-value">{{ site.data.site_stats.h_index }} <span class="publication-stat-arrow" aria-hidden="true">↗</span></span>
      <span class="publication-stat-label">H-index</span>
    </a>
  </div>
  <p class="publication-stats-updated">Google Scholar metrics updated {{ site.data.site_stats.updated | date: "%B %d, %Y" }}.</p>

  <div class="publication-resource-links">
    <a class="publication-resource-link publication-resource-link-primary" href="{{ site.data.site_stats.scholar_url }}" target="_blank" rel="noopener noreferrer">
      Google Scholar <span aria-hidden="true">↗</span>
    </a>
    <a class="publication-resource-link" href="{{ '/assets/bibliography/publications-download.bib' | relative_url }}" download="publications.bib">
      Download BibTeX <span aria-hidden="true">↓</span>
    </a>
  </div>
</section>

<nav class="publication-year-toc" aria-label="Publication years">
  <p class="publication-year-toc-title">Browse by year</p>
  <div class="publication-year-toc-links">
    {% for group in publication_groups %}
      <a class="publication-year-link" href="#publications-{{ group.name }}">
        {{ group.name }} <span>{{ group.items.size }}</span>
      </a>
    {% endfor %}
  </div>
</nav>

<div class="publication-list">
  {% for group in publication_groups %}
    <section id="publications-{{ group.name }}" class="publication-year-group" aria-labelledby="publications-{{ group.name }}-heading">
      <div class="publication-year-heading-row">
        <h2 id="publications-{{ group.name }}-heading" class="publication-year-heading">{{ group.name }}</h2>
        <span class="publication-year-count">{{ group.items.size }} {% if group.items.size == 1 %}paper{% else %}papers{% endif %}</span>
      </div>
      {% for publication in group.items %}
        {% include publication-card.html publication=publication %}
      {% endfor %}
    </section>
  {% endfor %}
</div>
