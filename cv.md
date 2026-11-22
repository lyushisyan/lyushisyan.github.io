---
title: CV
description: "Education and academic experience of Shixian Liu."
permalink: /cv/
hide_title: true
extra_css:
  - /assets/css/components/listing.css
  - /assets/css/components/cv.css
---
<header class="listing-hero">
  <h1>Curriculum vitae</h1>
  <p class="listing-hero-summary">{{ site.data.about.hero.name }} · {{ site.data.about.hero.affiliation }}</p>
  <p><a class="download-link" href="{{ site.data.about.hero.cv_url | relative_url }}" target="_blank" rel="noopener noreferrer">{% include link-icon.html name='download' %} Download full CV</a></p>
</header>
<section class="cv-section" aria-labelledby="cv-experience">
  <h2 id="cv-experience">Academic experience</h2>
  <dl class="cv-records">{% for item in site.data.about.experience %}<div><dt>{{ item.time }}</dt><dd>{{ item.detail }}</dd></div>{% endfor %}</dl>
</section>
<section class="cv-section" aria-labelledby="cv-education">
  <h2 id="cv-education">Education</h2>
  <dl class="cv-records">{% for item in site.data.about.education %}<div><dt>{{ item.time }}</dt><dd>{{ item.detail }}</dd></div>{% endfor %}</dl>
</section>
<section class="cv-section" aria-labelledby="cv-interests">
  <h2 id="cv-interests">Research interests</h2>
  <ul>{% for item in site.data.about.hero.interests %}<li>{{ item }}</li>{% endfor %}</ul>
</section>
<p class="cv-more">See also <a href="{{ '/publications/' | relative_url }}">publications</a>, <a href="{{ '/software/' | relative_url }}">research software</a>, and <a href="{{ '/teaching/' | relative_url }}">teaching</a>.</p>
