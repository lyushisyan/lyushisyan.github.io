(function () {
  function normalizeSpace(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cleanDisplay(value) {
    return normalizeSpace(value).replace(/[{}]/g, "");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatAuthorMarkers(text) {
    return String(text || "")
      .replace(/\$\^#\$/g, "<sup>#</sup>")
      .replace(/\^#/g, "<sup>#</sup>")
      .replace(/†/g, "<sup>#</sup>");
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

  function getYear(fields) {
    var raw = fields.year || fields.date || "";
    var match = String(raw).match(/\d{4}/);
    return match ? Number(match[0]) : 0;
  }

  function isTruthy(value) {
    var v = cleanDisplay(value).toLowerCase();
    return v === "true" || v === "1" || v === "yes" || v === "y";
  }

  function hasDirectoryPath(value) {
    return String(value).indexOf("/") !== -1;
  }

  function resolvePath(pathValue, basePath) {
    if (!pathValue) return "";
    if (/^(https?:)?\/\//i.test(pathValue) || pathValue.indexOf("data:") === 0) return pathValue;

    var cleanBase = (basePath || "").replace(/\/$/, "");
    var cleanPath = String(pathValue).replace(/^\/+/, "");
    if (cleanBase) return cleanBase + "/" + cleanPath;
    return "/" + cleanPath;
  }

  function buildPaperLink(fields) {
    if (fields.link) return fields.link;
    if (fields.website) return fields.website;
    if (fields.paper) return fields.paper;
    if (fields.url) return fields.url;
    if (fields.doi) return "https://doi.org/" + fields.doi.replace(/^https?:\/\/doi.org\//i, "");
    return "";
  }

  function buildPdfLink(fields, basePath) {
    var raw = fields.pdf || fields.file || "";
    if (!raw) return "";
    if (/^(https?:)?\/\//i.test(raw)) return raw;
    if (/^\//.test(raw)) return resolvePath(raw, basePath);

    var cleanRaw = normalizeSpace(raw)
      .replace(/^\/+/, "");

    if (/^assets\//i.test(cleanRaw)) return resolvePath(cleanRaw, basePath);
    if (/^papers\//i.test(cleanRaw)) return resolvePath("assets/pdf/" + cleanRaw, basePath);
    return resolvePath("assets/pdf/papers/" + cleanRaw, basePath);
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
      fields: fields
    };
  }

  function parseBibTeX(bibText) {
    return extractEntryBlocks(bibText)
      .map(parseBibEntry)
      .filter(function (entry) {
        return entry && entry.fields && entry.fields.title;
      });
  }

  function renderPaper(entry, basePath) {
    var fields = entry.fields;
    var title = cleanDisplay(fields.title || "Untitled");
    var authors = formatAuthors(fields.author || "");
    var venue = cleanDisplay(fields.journal || fields.booktitle || fields.venue || "");
    var year = cleanDisplay(fields.year || "");
    var volume = cleanDisplay(fields.volume || "");
    var number = cleanDisplay(fields.number || "");
    var pages = cleanDisplay(fields.pages || "");
    var abstractText = cleanDisplay(fields.abstract || "");
    var bibtexText = buildBibTeXForDisplay(entry);
    var linkUrl = buildPaperLink(fields);
    var pdfLink = buildPdfLink(fields, basePath);
    var impactFactor = cleanDisplay(fields.if || fields.impact_factor || fields.jif || "");
    var scopusQuartile = cleanDisplay(fields.scopus || fields.scopus_quartile || fields.quartile || fields.q || "");
    var impactFactorText = impactFactor || "--";
    var scopusQuartileText = scopusQuartile || "--";
    var safeKey = entry.key ? entry.key.replace(/[^A-Za-z0-9_\-]/g, "_") : "entry";
    var absPanelId = "about-abs-" + safeKey;
    var bibPanelId = "about-bib-" + safeKey;

    var metaParts = [];
    if (venue) metaParts.push("<em>" + escapeHtml(venue) + "</em>");
    if (volume) metaParts.push("Vol. " + escapeHtml(volume));
    if (number) metaParts.push("No. " + escapeHtml(number));
    if (pages) metaParts.push(escapeHtml(pages));
    if (year) metaParts.push("(" + escapeHtml(year) + ")");

    return [
      "<li>",
      '<article class="about-pub-item">',
      '<p class="about-pub-title">' + escapeHtml(title) + "</p>",
      (authors ? '<p class="about-pub-authors">' + authors + "</p>" : ""),
      (metaParts.length > 0 ? '<p class="about-pub-meta">' + metaParts.join(", ") + "</p>" : ""),
      '<div class="publication-controls">',
      '<span class="publication-tag"><span class="publication-tag-label">IF</span><span class="publication-tag-value">' + escapeHtml(impactFactorText) + "</span></span>",
      '<span class="publication-tag"><span class="publication-tag-label">Scopus</span><span class="publication-tag-value">' + escapeHtml(scopusQuartileText) + "</span></span>",
      (linkUrl
        ? '<a class="pub-btn" href="' + escapeHtml(linkUrl) + '" target="_blank" rel="noopener noreferrer">Link</a>'
        : '<span class="pub-btn is-disabled" aria-disabled="true">Link</span>'),
      '<button type="button" class="pub-btn publication-toggle" data-target="' + absPanelId + '" aria-expanded="false">Abstract</button>',
      '<button type="button" class="pub-btn publication-toggle" data-target="' + bibPanelId + '" aria-expanded="false">BibTeX</button>',
      (pdfLink
        ? '<a class="pub-btn" href="' + escapeHtml(pdfLink) + '" target="_blank" rel="noopener noreferrer">Preview</a>'
        : '<span class="pub-btn is-disabled" aria-disabled="true">Preview</span>'),
      "</div>",
      '<div class="publication-detail" id="' + absPanelId + '">',
      (abstractText ? "<p>" + escapeHtml(abstractText) + "</p>" : "<p>No abstract available for this entry.</p>"),
      "</div>",
      '<div class="publication-detail bibtex" id="' + bibPanelId + '">',
      "<pre>" + escapeHtml(bibtexText) + "</pre>",
      "</div>",
      "</article>",
      "</li>"
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

  async function init() {
    var list = document.getElementById("about-selected-list");
    var status = document.getElementById("about-selected-status");
    if (!list || !status) return;

    var script = document.currentScript || document.querySelector('script[src*="about-selected.js"]');
    var bibUrl = script ? script.getAttribute("data-bib-url") : "";
    var siteBase = script ? script.getAttribute("data-site-base") : "";
    if (!bibUrl) {
      status.textContent = "BibTeX path not configured.";
      return;
    }

    try {
      var response = await fetch(bibUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load BibTeX.");
      var bibText = await response.text();
      var selected = parseBibTeX(bibText)
        .filter(function (entry) {
          return isTruthy(entry.fields.selected);
        })
        .sort(function (a, b) {
          return getYear(b.fields) - getYear(a.fields);
        })
        .slice(0, 3);

      if (selected.length === 0) {
        status.textContent = "No selected publications found in BibTeX.";
        list.innerHTML = "";
        return;
      }

      list.innerHTML = selected.map(function (entry) {
        return renderPaper(entry, siteBase);
      }).join("");
      bindPublicationActions(list);
      status.textContent = "";
    } catch (error) {
      status.textContent = "Failed to load selected publications.";
      list.innerHTML = "";
    }
  }

  init();
})();
