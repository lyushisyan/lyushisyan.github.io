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
  <p>Software papers and research using NEP-kappa.</p>
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

    <div class="software-paper-list">
      {% for item in paper_items %}
        {% assign paper = site.data.publications | where: "key", item.publication_key | first %}
        {% if paper %}
          <article class="software-paper-card" id="{{ paper.key }}">
            <h3><a href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener noreferrer">{{ paper.title }}</a></h3>
            <p class="software-paper-authors">{{ paper.authors_html }}</p>
            <p class="software-paper-venue">
              <em>{{ paper.journal }}</em>{% if paper.volume != "" %}, <strong>{{ paper.volume }}</strong>{% endif %}{% if paper.pages != "" %}, {{ paper.pages }}{% endif %} ({{ paper.year }})
            </p>
            <div class="software-paper-links">
              <a href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener noreferrer">DOI</a>
              {% if paper.pdf %}
                <a href="{{ paper.pdf | relative_url }}" target="_blank" rel="noopener noreferrer">{% if paper.journal == "arXiv preprint" %}Preprint{% else %}Accepted Manuscript{% endif %}</a>
              {% endif %}
            </div>
          </article>
        {% endif %}
      {% endfor %}
    </div>
  </section>
{% endfor %}
