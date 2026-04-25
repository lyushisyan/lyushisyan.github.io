(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeSpace(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cleanDisplay(value) {
    return normalizeSpace(value).replace(/[{}]/g, "");
  }

  function normalizeDoi(value) {
    return normalizeSpace(value)
      .replace(/[{}]/g, "")
      .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
      .replace(/^doi:\s*/i, "")
      .toLowerCase();
  }

  function formatAuthorMarkers(text) {
    return String(text || "")
      .replace(/\$\^#\$/g, "<sup>#</sup>")
      .replace(/\^#/g, "<sup>#</sup>")
      .replace(/†/g, "<sup>#</sup>");
  }

  function getYear(fields) {
    var raw = fields.year || fields.date || "";
    var match = String(raw).match(/\d{4}/);
    return match ? Number(match[0]) : 0;
  }

  function formatAuthors(authors) {
    if (!authors) return "";
    return String(authors)
      .split(/\s+and\s+/i)
      .map(function (author) {
        var cleaned = cleanDisplay(author);
        var parts = cleaned.split(",").map(normalizeSpace).filter(Boolean);
        if (parts.length <= 1) return formatAuthorMarkers(escapeHtml(cleaned));

        var lastName = parts[0];
        var firstAndMiddle = parts.slice(1).join(" ");
        return formatAuthorMarkers(escapeHtml(normalizeSpace(firstAndMiddle + " " + lastName)));
      })
      .filter(Boolean)
      .join(", ");
  }

  function extractEntryBlocks(bibText) {
    var blocks = [];
    var i = 0;

    while (i < bibText.length) {
      if (bibText[i] !== "@") {
        i += 1;
        continue;
      }

      var start = i;
      var open = bibText.indexOf("{", i);
      if (open === -1) break;

      var depth = 0;
      var end = -1;
      for (var j = open; j < bibText.length; j += 1) {
        if (bibText[j] === "{") depth += 1;
        if (bibText[j] === "}") depth -= 1;
        if (depth === 0) {
          end = j;
          break;
        }
      }

      if (end !== -1) {
        blocks.push(bibText.slice(start, end + 1));
        i = end + 1;
      } else {
        break;
      }
    }

    return blocks;
  }

  function parseBibEntry(block) {
    var entryMatch = block.match(/^@\s*(\w+)\s*\{\s*([^,]+),([\s\S]*)\}$/i);
    if (!entryMatch) return null;

    var body = entryMatch[3].trim();
    var fields = {};
    var i = 0;

    while (i < body.length) {
      while (i < body.length && /[\s,]/.test(body[i])) i += 1;
      if (i >= body.length) break;

      var keyStart = i;
      while (i < body.length && /[A-Za-z0-9_\-]/.test(body[i])) i += 1;
      var key = body.slice(keyStart, i).toLowerCase();
      if (!key) break;

      while (i < body.length && /\s/.test(body[i])) i += 1;
      if (body[i] !== "=") {
        while (i < body.length && body[i] !== ",") i += 1;
        continue;
      }
      i += 1;
      while (i < body.length && /\s/.test(body[i])) i += 1;

      var value = "";
      if (body[i] === "{") {
        i += 1;
        var depth = 1;
        var start = i;
        while (i < body.length && depth > 0) {
          if (body[i] === "{") depth += 1;
          if (body[i] === "}") depth -= 1;
          i += 1;
        }
        value = body.slice(start, i - 1);
      } else if (body[i] === '"') {
        i += 1;
        var qStart = i;
        while (i < body.length && body[i] !== '"') i += 1;
        value = body.slice(qStart, i);
        if (body[i] === '"') i += 1;
      } else {
        var vStart = i;
        while (i < body.length && body[i] !== ",") i += 1;
        value = body.slice(vStart, i);
      }

      fields[key] = normalizeSpace(value);

      while (i < body.length && body[i] !== ",") i += 1;
      if (body[i] === ",") i += 1;
    }

    return {
      type: entryMatch[1].toLowerCase(),
      key: normalizeSpace(entryMatch[2]),
      fields: fields,
      raw: block.trim(),
    };
  }

  function parseBibTeX(bibText) {
    return extractEntryBlocks(bibText)
      .map(parseBibEntry)
      .filter(function (entry) {
        return entry && entry.fields && entry.fields.title;
      });
  }

  function buildBibTeXForDisplay(entry) {
    var fields = entry.fields || {};
    var keys = ["title", "author", "journal", "volume", "number", "pages", "year", "doi"];
    var lines = [];

    keys.forEach(function (key) {
      var value = normalizeSpace(fields[key] || "");
      if (!value) return;
      lines.push("  " + key + "={" + value + "},");
    });

    if (lines.length > 0) {
      lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
    }

    return ["@" + entry.type + "{" + entry.key + ",", lines.join("\n"), "}"]
      .filter(Boolean)
      .join("\n");
  }

  function resolvePath(pathValue, basePath) {
    if (!pathValue) return "";
    if (/^(https?:)?\/\//i.test(pathValue) || pathValue.indexOf("data:") === 0) return pathValue;

    var cleanBase = (basePath || "").replace(/\/$/, "");
    var cleanPath = String(pathValue).replace(/^\/+/, "");
    if (cleanBase) return cleanBase + "/" + cleanPath;
    return "/" + cleanPath;
  }

  function hasDirectoryPath(value) {
    return String(value).indexOf("/") !== -1;
  }

  function buildPaperLink(fields) {
    if (fields.link) return fields.link;
    if (fields.website) return fields.website;
    if (fields.paper) return fields.paper;
    if (fields.url) return fields.url;
    if (fields.doi) return "https://doi.org/" + normalizeDoi(fields.doi);
    return "";
  }

  function buildPdfLink(fields, basePath) {
    var raw = fields.pdf || fields.file || "";
    if (!raw) return "";
    if (/^(https?:)?\/\//i.test(raw)) return raw;
    if (hasDirectoryPath(raw)) return resolvePath(raw, basePath);
    return resolvePath("assets/pdf/" + raw, basePath);
  }

  function buildPreviewPath(fields, fallbackPreview, basePath) {
    var raw = fields.preview || "";
    if (!raw) return fallbackPreview;
    if (/^(https?:)?\/\//i.test(raw)) return raw;
    if (hasDirectoryPath(raw)) return resolvePath(raw, basePath);
    return resolvePath("assets/img/publication_preview/" + raw, basePath);
  }

  function renderEntry(entry, fallbackPreview, basePath) {
    var fields = entry.fields;
    var title = cleanDisplay(fields.title || "Untitled");
    var authors = formatAuthors(fields.author || "");
    var venue = cleanDisplay(fields.journal || fields.booktitle || fields.venue || "");
    var year = cleanDisplay(fields.year || "");
    var volume = cleanDisplay(fields.volume || "");
    var number = cleanDisplay(fields.number || "");
    var pages = cleanDisplay(fields.pages || "");

    var preview = buildPreviewPath(fields, fallbackPreview, basePath);
    var linkUrl = buildPaperLink(fields);
    var pdfLink = buildPdfLink(fields, basePath);
    var abstractText = cleanDisplay(fields.abstract || "");
    var bibtexText = buildBibTeXForDisplay(entry);
    var normalizedDoi = normalizeDoi(fields.doi || "");
    var impactFactor = cleanDisplay(fields.if || fields.impact_factor || fields.jif || "");
    var scopusQuartile = cleanDisplay(fields.scopus || fields.scopus_quartile || fields.quartile || fields.q || "");
    var impactFactorText = impactFactor || "--";
    var scopusQuartileText = scopusQuartile || "--";
    var safeKey = entry.key ? entry.key.replace(/[^A-Za-z0-9_\-]/g, "_") : "entry";

    var absPanelId = "abs-" + safeKey;
    var bibPanelId = "bib-" + safeKey;
    var venueMetaParts = [];
    if (venue) venueMetaParts.push('<em>' + escapeHtml(venue) + '</em>');
    if (year) venueMetaParts.push(escapeHtml(year));
    if (volume) venueMetaParts.push("Vol. " + escapeHtml(volume));
    if (number) venueMetaParts.push("No. " + escapeHtml(number));
    if (pages) venueMetaParts.push("Pages " + escapeHtml(pages));
    var venueMetaLine = venueMetaParts.join(", ");

    return [
      '<article class="card publication-card">',
      '<img class="publication-preview" src="' + escapeHtml(preview) + '" alt="Preview for ' + escapeHtml(title) + '" loading="lazy">',
      '<div class="publication-body">',
      '<strong>' + escapeHtml(title) + '</strong><br>',
      (authors ? authors + '<br>' : ""),
      '<p class="publication-venue-line">' + venueMetaLine + '</p>',
      '<div class="publication-controls">',
      '<span class="publication-tag"><span class="publication-tag-label">IF</span><span class="publication-tag-value">' + escapeHtml(impactFactorText) + '</span></span>',
      '<span class="publication-tag"><span class="publication-tag-label">Scopus</span><span class="publication-tag-value">' + escapeHtml(scopusQuartileText) + '</span></span>',
      '<span class="publication-tag publication-citation"' + (normalizedDoi ? ' data-doi="' + escapeHtml(normalizedDoi) + '"' : "") + '><span class="publication-tag-label">Cited by</span><span class="publication-tag-value">--</span></span>',
      (linkUrl
        ? '<a class="pub-btn" href="' + escapeHtml(linkUrl) + '" target="_blank" rel="noopener noreferrer">Link</a>'
        : '<span class="pub-btn is-disabled" aria-disabled="true">Link</span>'),
      '<button type="button" class="pub-btn publication-toggle" data-target="' + absPanelId + '" aria-expanded="false">Abstract</button>',
      '<button type="button" class="pub-btn publication-toggle" data-target="' + bibPanelId + '" aria-expanded="false">BibTeX</button>',
      (pdfLink
        ? '<a class="pub-btn" href="' + escapeHtml(pdfLink) + '" target="_blank" rel="noopener noreferrer">Preview</a>'
        : '<span class="pub-btn is-disabled" aria-disabled="true">Preview</span>'),
      '</div>',
      '<div class="publication-detail" id="' + absPanelId + '">',
      (abstractText ? '<p>' + escapeHtml(abstractText) + '</p>' : '<p>No abstract available for this entry.</p>'),
      '</div>',
      '<div class="publication-detail bibtex" id="' + bibPanelId + '">',
      '<pre>' + escapeHtml(bibtexText) + '</pre>',
      '</div>',
      '</div>',
      '</article>',
    ].join("");
  }

  function bindPublicationActions(list) {
    list.addEventListener("click", function (event) {
      var trigger = event.target.closest(".publication-toggle");
      if (!trigger) return;

      var targetId = trigger.getAttribute("data-target");
      if (!targetId) return;

      var panel = document.getElementById(targetId);
      if (!panel) return;

      var open = panel.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  async function fetchOpenAlexCitedByCount(doi) {
    if (!doi) return null;
    var endpoint = "https://api.openalex.org/works/https://doi.org/" + encodeURIComponent(doi) + "?select=cited_by_count";

    try {
      var response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return null;

      var payload = await response.json();
      if (typeof payload.cited_by_count === "number") return payload.cited_by_count;
    } catch (error) {
      return null;
    }

    return null;
  }

  async function hydrateOpenAlexCitationCounts(list) {
    if (!list) return;

    var citationTags = Array.prototype.slice.call(list.querySelectorAll(".publication-citation[data-doi]"));
    if (citationTags.length === 0) return;

    var doiToTags = {};
    citationTags.forEach(function (tag) {
      var doi = normalizeSpace(tag.getAttribute("data-doi") || "");
      if (!doi) return;
      if (!doiToTags[doi]) doiToTags[doi] = [];
      doiToTags[doi].push(tag);
    });

    var doiList = Object.keys(doiToTags);
    for (var i = 0; i < doiList.length; i += 1) {
      var doi = doiList[i];
      var citedBy = await fetchOpenAlexCitedByCount(doi);
      var displayCount = (typeof citedBy === "number") ? String(citedBy) : "--";

      doiToTags[doi].forEach(function (tag) {
        var valueEl = tag.querySelector(".publication-tag-value");
        if (valueEl) valueEl.textContent = displayCount;
      });
    }
  }

  function getYearLabel(entry) {
    var year = getYear(entry.fields);
    if (year >= 2025) return String(year);
    return "Older";
  }

  function getYearSectionId(yearLabel) {
    return "year-" + String(yearLabel).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  }

  function renderYearToc(entries, toc) {
    if (!toc) return;

    var yearLabels = [];
    entries.forEach(function (entry) {
      var label = getYearLabel(entry);
      if (yearLabels.indexOf(label) === -1) yearLabels.push(label);
    });

    if (yearLabels.length <= 1) {
      toc.innerHTML = "";
      return;
    }

    toc.innerHTML = [
      '<p class="publication-year-toc-title">By Year</p>',
      '<div class="publication-year-toc-links">',
      yearLabels.map(function (label) {
        var sectionId = getYearSectionId(label);
        return '<a class="publication-year-link" href="#' + escapeHtml(sectionId) + '">' + escapeHtml(label) + '</a>';
      }).join(""),
      '</div>',
    ].join("");
  }

  function renderEntriesByYear(entries, fallbackPreview, siteBase) {
    var grouped = {};
    var yearLabels = [];

    entries.forEach(function (entry) {
      var label = getYearLabel(entry);
      if (!grouped[label]) {
        grouped[label] = [];
        yearLabels.push(label);
      }
      grouped[label].push(entry);
    });

    return yearLabels.map(function (label) {
      var sectionId = getYearSectionId(label);
      return [
        '<section class="publication-year-group" id="' + escapeHtml(sectionId) + '">',
        '<h2 class="publication-year-heading">' + escapeHtml(label) + '</h2>',
        grouped[label].map(function (entry) {
          return renderEntry(entry, fallbackPreview, siteBase);
        }).join(""),
        '</section>',
      ].join("");
    }).join("");
  }

  async function init() {
    var list = document.getElementById("publication-list");
    var status = document.getElementById("publication-status");
    var yearToc = document.getElementById("publication-year-toc");
    if (!list) return;

    var script = document.currentScript || document.querySelector('script[src*="publications.js"]');
    var bibUrl = script ? script.getAttribute("data-bib-url") : "";
    var fallbackPreview = script ? script.getAttribute("data-fallback-preview") : "";
    var siteBase = script ? script.getAttribute("data-site-base") : "";
    function setStatus(message) {
      if (status) status.textContent = message;
    }

    if (!bibUrl) {
      setStatus("BibTeX path not configured.");
      return;
    }

    try {
      var response = await fetch(bibUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load BibTeX file.");

      var bibText = await response.text();
      var entries = parseBibTeX(bibText).sort(function (a, b) {
        return getYear(b.fields) - getYear(a.fields);
      });

      if (entries.length === 0) {
        setStatus("No publications found in BibTeX.");
        return;
      }

      renderYearToc(entries, yearToc);
      list.innerHTML = renderEntriesByYear(entries, fallbackPreview, siteBase);

      bindPublicationActions(list);

      var images = list.querySelectorAll(".publication-preview");
      images.forEach(function (img) {
        img.addEventListener("error", function () {
          if (fallbackPreview) img.src = fallbackPreview;
        });
      });

      hydrateOpenAlexCitationCounts(list).catch(function () {});

      setStatus("Loaded " + entries.length + " publications from BibTeX.");
    } catch (error) {
      setStatus("Failed to load publications from BibTeX.");
      list.innerHTML = "";
    }
  }

  init();
})();
