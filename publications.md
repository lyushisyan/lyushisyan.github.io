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
  <h1 id="publications-heading">Publications</h1>
  <p class="publication-hero-summary">Papers on phonon transport, thermal physics, and computational materials science.</p>

  <div class="publication-overview" aria-label="Publication summary">
    <div class="publication-output">
      <p class="publication-total"><strong>{{ site.data.publications.size }}</strong> papers</p>
      <p class="publication-lead-total"><strong>{{ lead_publications.size }}</strong> as first or corresponding author</p>
    </div>
    <div class="publication-scholar-summary" role="group" aria-labelledby="publication-scholar-source">
      <p id="publication-scholar-source" class="publication-scholar-source"><a href="{{ site.data.site_stats.scholar_url }}" target="_blank" rel="noopener noreferrer">Google Scholar</a></p>
      <dl class="publication-scholar-metrics">
        <div class="publication-stat">
          <dt class="publication-stat-label">Citations</dt>
          <dd class="publication-stat-value">{{ site.data.site_stats.citations }}</dd>
        </div>
        <div class="publication-stat">
          <dt class="publication-stat-label">h-index</dt>
          <dd class="publication-stat-value">{{ site.data.site_stats.h_index }}</dd>
        </div>
      </dl>
      <p class="publication-stats-updated">Updated <time datetime="{{ site.data.site_stats.updated }}">{{ site.data.site_stats.updated | date: "%d %b %Y" }}</time></p>
    </div>
  </div>
  <div class="publication-hero-support">
    <a class="text-link publication-bibtex-download" href="{{ '/assets/bibliography/publications-download.bib' | relative_url }}" download="publications.bib">Download BibTeX</a>
  </div>
</section>

<div class="publication-filter" role="group" aria-label="Filter publications by author role">
  <span class="publication-filter-label">Show</span>
  <button class="publication-filter-button is-active" type="button" data-publication-filter="all" aria-pressed="true">All</button>
  <button class="publication-filter-button" type="button" data-publication-filter="lead" aria-pressed="false">Only First / Corresponding</button>
</div>

<nav class="publication-year-toc" aria-label="Publication years">
  <div class="publication-year-toc-links" role="tablist" aria-label="Filter publications by year">
    {% for group in publication_groups %}
      <button class="publication-year-link" type="button" role="tab" id="publication-tab-{{ group.name }}" aria-controls="publications-{{ group.name }}" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" tabindex="{% if forloop.first %}0{% else %}-1{% endif %}" data-publication-year="{{ group.name }}">
        {{ group.name }} <span class="publication-year-link-count">{{ group.items.size }}</span>
      </button>
    {% endfor %}
  </div>
</nav>

<div class="publication-list">
  {% for group in publication_groups %}
    <section id="publications-{{ group.name }}" class="publication-year-group" role="tabpanel" aria-labelledby="publication-tab-{{ group.name }}"{% unless forloop.first %} hidden{% endunless %}>
      <div class="publication-year-heading-row">
        <h2 id="publications-{{ group.name }}-heading" class="publication-year-heading">{{ group.name }}</h2>
        <span class="publication-year-count">{{ group.items.size }} {% if group.items.size == 1 %}paper{% else %}papers{% endif %}</span>
      </div>
      {% for publication in group.items %}
        {% include publication-card.html publication=publication %}
      {% endfor %}
    </section>
  {% endfor %}
  <p class="publication-empty" role="status" hidden>No first- or corresponding-author papers for this year.</p>
</div>

<script>
  (() => {
    const filterButtons = document.querySelectorAll('[data-publication-filter]');
    const yearGroups = Array.from(document.querySelectorAll('.publication-year-group'));
    const yearButtons = Array.from(document.querySelectorAll('[data-publication-year]'));
    const emptyMessage = document.querySelector('.publication-empty');

    if (!yearButtons.length || !yearGroups.length) return;

    const yearFromHash = () => yearGroups.find((group) => `#${group.id}` === window.location.hash)?.id.replace('publications-', '');
    let selectedYear = yearFromHash() || yearButtons[0].dataset.publicationYear;
    let authorFilter = 'all';

    const render = () => {
      filterButtons.forEach((button) => {
        const active = button.dataset.publicationFilter === authorFilter;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      yearGroups.forEach((group) => {
        const year = group.id.replace('publications-', '');
        const selected = year === selectedYear;
        let visibleCount = 0;
        group.querySelectorAll('.publication-card').forEach((card) => {
          const matchesAuthor = authorFilter === 'all' || card.dataset.authorRole === 'lead';
          card.hidden = !matchesAuthor;
          if (matchesAuthor) visibleCount += 1;
        });
        group.hidden = !selected;
        const count = group.querySelector('.publication-year-count');
        if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? 'paper' : 'papers'}`;
        const button = yearButtons.find((item) => item.dataset.publicationYear === year);
        button.setAttribute('aria-selected', String(selected));
        button.setAttribute('tabindex', selected ? '0' : '-1');
        button.querySelector('.publication-year-link-count').textContent = visibleCount;
        if (selected && emptyMessage) emptyMessage.hidden = visibleCount !== 0;
      });
    };

    const selectYear = (year) => {
      selectedYear = year;
      render();
      // Update the shareable URL without scrolling to an anchor.
      window.history.replaceState(null, '', `#publications-${year}`);
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        authorFilter = button.dataset.publicationFilter;
        render();
      });
    });
    yearButtons.forEach((button, index) => {
      button.addEventListener('click', () => selectYear(button.dataset.publicationYear));
      button.addEventListener('keydown', (event) => {
        let nextIndex;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % yearButtons.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + yearButtons.length) % yearButtons.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = yearButtons.length - 1;
        else return;
        event.preventDefault();
        const nextButton = yearButtons[nextIndex];
        selectYear(nextButton.dataset.publicationYear);
        nextButton.focus();
      });
    });
    window.addEventListener('hashchange', () => {
      selectedYear = yearFromHash() || yearButtons[0].dataset.publicationYear;
      render();
    });
    render();
  })();
</script>
