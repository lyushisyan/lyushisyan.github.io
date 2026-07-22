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
{% assign lead_publications = site.data.publications | where: "self_lead", true %}

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
      <span class="publication-stat-value">{{ lead_publications.size }}</span>
      <span class="publication-stat-label">First / Corresponding</span>
    </div>
    <a class="publication-stat publication-stat-link" href="{{ site.data.site_stats.scholar_url }}" target="_blank" rel="noopener noreferrer" aria-label="View current citations on Google Scholar">
      <span class="publication-stat-value">{{ site.data.site_stats.citations }} <span class="publication-stat-arrow" aria-hidden="true">↗</span></span>
      <span class="publication-stat-label">Citations</span>
    </a>
    <a class="publication-stat publication-stat-link" href="{{ site.data.site_stats.scholar_url }}" target="_blank" rel="noopener noreferrer" aria-label="View current H-index on Google Scholar">
      <span class="publication-stat-value">{{ site.data.site_stats.h_index }} <span class="publication-stat-arrow" aria-hidden="true">↗</span></span>
      <span class="publication-stat-label">H-index</span>
    </a>
    <a class="publication-stat publication-stat-link" href="{{ '/assets/bibliography/publications-download.bib' | relative_url }}" download="publications.bib" aria-label="Download publications as BibTeX">
      <span class="publication-stat-value">BibTeX <span class="publication-stat-arrow" aria-hidden="true">↓</span></span>
      <span class="publication-stat-label">Download</span>
    </a>
  </div>
  <p class="publication-stats-updated">Google Scholar metrics updated {{ site.data.site_stats.updated | date: "%B %d, %Y" }}.</p>
</section>

<div class="publication-filter" role="group" aria-label="Filter publications by author role">
  <span class="publication-filter-label">Show</span>
  <button class="publication-filter-button is-active" type="button" data-publication-filter="all" aria-pressed="true">All</button>
  <button class="publication-filter-button" type="button" data-publication-filter="lead" aria-pressed="false">Only First / Corresponding</button>
</div>

<nav class="publication-year-toc" aria-label="Publication years">
  <p class="publication-year-toc-title">Browse by year</p>
  <div class="publication-year-toc-links">
    {% for group in publication_groups %}
      <a class="publication-year-link" href="#publications-{{ group.name }}" data-publication-year="{{ group.name }}">
        {{ group.name }} <span class="publication-year-link-count">{{ group.items.size }}</span>
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

<script>
  (() => {
    const filterButtons = document.querySelectorAll('[data-publication-filter]');
    const yearGroups = document.querySelectorAll('.publication-year-group');

    if (!filterButtons.length || !yearGroups.length) return;

    const applyFilter = (filter) => {
      filterButtons.forEach((button) => {
        const isActive = button.dataset.publicationFilter === filter;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      yearGroups.forEach((group) => {
        const cards = group.querySelectorAll('.publication-card');
        let visibleCount = 0;

        cards.forEach((card) => {
          const isVisible = filter === 'all' || card.dataset.authorRole === 'lead';
          card.hidden = !isVisible;
          if (isVisible) visibleCount += 1;
        });

        group.hidden = visibleCount === 0;
        const count = group.querySelector('.publication-year-count');
        if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? 'paper' : 'papers'}`;

        const year = group.id.replace('publications-', '');
        const yearLink = document.querySelector(`[data-publication-year="${year}"]`);
        if (yearLink) {
          yearLink.hidden = visibleCount === 0;
          const yearLinkCount = yearLink.querySelector('.publication-year-link-count');
          if (yearLinkCount) yearLinkCount.textContent = visibleCount;
        }
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => applyFilter(button.dataset.publicationFilter));
    });
  })();
</script>
