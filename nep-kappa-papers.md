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

    <ol class="software-paper-list">
      {% for item in paper_items %}
        {% assign paper = site.data.publications | where: "key", item.publication_key | first %}
        {% if paper %}
          <li id="{{ paper.key }}">
            {{ paper.authors_html }}.
            <a class="software-paper-title" href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener noreferrer">{{ paper.title }}</a>.
            <em>{{ paper.journal }}</em>{% if paper.volume != "" %} <strong>{{ paper.volume }}</strong>{% endif %}{% if paper.pages != "" %}, {{ paper.pages }}{% endif %} ({{ paper.year }}).
            <a class="software-paper-doi" href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener noreferrer">https://doi.org/{{ paper.doi }}</a>
          </li>
        {% endif %}
      {% endfor %}
    </ol>
  </section>
{% endfor %}
