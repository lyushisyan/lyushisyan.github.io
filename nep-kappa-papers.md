---
title: NEP-kappa Papers
description: "Software, method, and application papers associated with the NEP-kappa phonon-transport framework."
permalink: /software/nep-kappa-papers/
hide_title: true
extra_css:
  - /assets/css/components/listing.css
  - /assets/css/components/software-papers.css
---
<section class="listing-hero software-papers-hero" aria-labelledby="software-papers-heading">
  <a class="software-papers-back" href="{{ '/software/' | relative_url }}"><span aria-hidden="true">←</span> Software</a>
  <p class="listing-hero-eyebrow">NEP-kappa</p>
  <h1 id="software-papers-heading">Papers</h1>
  <p class="listing-hero-summary">Software and method papers for NEP-kappa, followed by research that applies its NEP-based phonon workflow.</p>
  <div class="software-papers-actions">
    <a class="software-paper-button software-paper-button-primary" href="https://github.com/lyushisyan/NEP-kappa" target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span></a>
    <a class="software-paper-button" href="https://nep-kappa.readthedocs.io" target="_blank" rel="noopener noreferrer">Documentation <span aria-hidden="true">↗</span></a>
  </div>
</section>

{% assign paper_groups = "software,applications" | split: "," %}
{% for group_name in paper_groups %}
  {% assign paper_items = site.data.nepkappa_papers[group_name] %}
  <section class="software-paper-section" aria-labelledby="paper-group-{{ group_name }}-heading">
    <div class="software-paper-section-heading">
      {% if group_name == "software" %}
        <p class="software-paper-section-index">01</p>
        <div>
          <h2 id="paper-group-{{ group_name }}-heading">Software and method papers</h2>
          <p>The papers that introduce the framework and its computational methodology.</p>
        </div>
      {% else %}
        <p class="software-paper-section-index">02</p>
        <div>
          <h2 id="paper-group-{{ group_name }}-heading">Research using NEP-kappa</h2>
          <p>Studies that apply the framework or its NEP-based phonon workflow.</p>
        </div>
      {% endif %}
    </div>

    <div class="software-paper-list">
      {% for item in paper_items %}
        {% assign paper = site.data.publications | where: "key", item.publication_key | first %}
        {% if paper %}
          <article class="software-paper-card" id="{{ paper.key }}">
            <div class="software-paper-number" aria-hidden="true">{{ forloop.index | prepend: "0" | slice: -2, 2 }}</div>
            <div class="software-paper-content">
              {% if item.label %}<p class="software-paper-label">{{ item.label }}</p>{% endif %}
              <h3><a href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener noreferrer">{{ paper.title }}</a></h3>
              <p class="software-paper-authors">{{ paper.authors_html }}</p>
              <p class="software-paper-venue">
                <em>{{ paper.journal }}</em>{% if paper.volume != "" %}, <strong>{{ paper.volume }}</strong>{% endif %}{% if paper.pages != "" %}, {{ paper.pages }}{% endif %} ({{ paper.year }})
              </p>
              <p class="software-paper-note">{{ item.note }}</p>
              <div class="software-paper-links">
                <a class="software-paper-button" href="https://doi.org/{{ paper.doi }}" target="_blank" rel="noopener noreferrer">DOI <span aria-hidden="true">↗</span></a>
                {% if paper.pdf %}
                  <a class="software-paper-button" href="{{ paper.pdf | relative_url }}" target="_blank" rel="noopener noreferrer">{% if paper.journal == "arXiv preprint" %}Preprint{% else %}Accepted Manuscript{% endif %}</a>
                {% endif %}
                <a class="software-paper-details" href="{{ '/publications/' | relative_url }}#{{ paper.key }}">Publication details <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </article>
        {% endif %}
      {% endfor %}
    </div>
  </section>
{% endfor %}
