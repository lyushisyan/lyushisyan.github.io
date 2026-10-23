---
title: NEP-kappa Papers
description: "Software, method, and application papers associated with the NEP-kappa phonon-transport framework."
permalink: /software/nep-kappa-papers/
hide_title: true
extra_css:
  - /assets/css/components/software-papers.css
---
<header class="software-papers-header">
  <a class="software-papers-back" href="{{ '/software/' | relative_url }}"><span aria-hidden="true">←</span> Software</a>
  <h1>NEP-kappa Papers</h1>
</header>

{% assign paper_groups = "software,applications" | split: "," %}
{% for group_name in paper_groups %}
  {% assign paper_items = site.data.nepkappa_papers[group_name] %}
  <section class="software-paper-section" aria-labelledby="paper-group-{{ group_name }}-heading">
    {% if group_name == "software" %}
      <h2 id="paper-group-{{ group_name }}-heading">Software and method papers</h2>
    {% else %}
      <h2 id="paper-group-{{ group_name }}-heading">Research using NEP-kappa</h2>
    {% endif %}

    <ol class="software-paper-list" reversed>
      {% for item in paper_items reversed %}
        {% assign paper = nil %}
        {% if item.publication_key %}
          {% assign paper = site.data.publications | where: "key", item.publication_key | first %}
        {% endif %}
        {% assign citation_authors = item.authors_html | default: paper.authors_html %}
        {% assign citation_title = item.title | default: paper.title %}
        {% assign citation_journal = item.journal | default: paper.journal %}
        {% assign citation_volume = item.volume | default: paper.volume %}
        {% assign citation_pages = item.pages | default: paper.pages %}
        {% assign citation_year = item.year | default: paper.year %}
        {% assign citation_doi = item.doi | default: paper.doi %}
        {% if citation_title %}
          <li{% if item.publication_key %} id="{{ item.publication_key }}"{% endif %}>
            {{ citation_authors }}.
            <strong>{{ citation_title }}</strong>.
            <em>{{ citation_journal }}</em>{% if citation_volume != "" %} <strong>{{ citation_volume }}</strong>{% endif %}{% if citation_pages != "" %}, {{ citation_pages }}{% endif %} ({{ citation_year }}).
            <a class="software-paper-doi" href="https://doi.org/{{ citation_doi }}" target="_blank" rel="noopener noreferrer">https://doi.org/{{ citation_doi }}</a>
          </li>
        {% endif %}
      {% endfor %}
    </ol>
  </section>
{% endfor %}
