import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const bibPath = path.join(root, "assets/bibliography/publications.bib");
const outputPath = path.join(root, "_data/publications.json");
const downloadBibPath = path.join(root, "assets/bibliography/publications-download.bib");

function normalizeSpace(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function cleanDisplay(value) {
  return normalizeSpace(value).replace(/[{}]/g, "");
}

function cleanMathText(value) {
  return normalizeSpace(value)
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractEntryBlocks(bibText) {
  const blocks = [];
  let i = 0;

  while (i < bibText.length) {
    if (bibText[i] !== "@") {
      i += 1;
      continue;
    }

    const start = i;
    const open = bibText.indexOf("{", i);
    if (open === -1) break;

    let depth = 0;
    let end = -1;
    for (let j = open; j < bibText.length; j += 1) {
      if (bibText[j] === "{") depth += 1;
      if (bibText[j] === "}") depth -= 1;
      if (depth === 0) {
        end = j;
        break;
      }
    }

    if (end === -1) break;
    blocks.push(bibText.slice(start, end + 1));
    i = end + 1;
  }

  return blocks;
}

function parseEntry(block) {
  const match = block.match(/^@\s*(\w+)\s*\{\s*([^,]+),([\s\S]*)\}$/i);
  if (!match) return null;

  const body = match[3].trim();
  const fields = {};
  let i = 0;

  while (i < body.length) {
    while (i < body.length && /[\s,]/.test(body[i])) i += 1;
    if (i >= body.length) break;

    const keyStart = i;
    while (i < body.length && /[A-Za-z0-9_-]/.test(body[i])) i += 1;
    const key = body.slice(keyStart, i).toLowerCase();
    if (!key) break;

    while (i < body.length && /\s/.test(body[i])) i += 1;
    if (body[i] !== "=") {
      while (i < body.length && body[i] !== ",") i += 1;
      continue;
    }

    i += 1;
    while (i < body.length && /\s/.test(body[i])) i += 1;

    let value = "";
    if (body[i] === "{") {
      i += 1;
      let depth = 1;
      const start = i;
      while (i < body.length && depth > 0) {
        if (body[i] === "{") depth += 1;
        if (body[i] === "}") depth -= 1;
        i += 1;
      }
      value = body.slice(start, i - 1);
    } else if (body[i] === '"') {
      i += 1;
      const start = i;
      while (i < body.length && body[i] !== '"') i += 1;
      value = body.slice(start, i);
      if (body[i] === '"') i += 1;
    } else {
      const start = i;
      while (i < body.length && body[i] !== ",") i += 1;
      value = body.slice(start, i);
    }

    fields[key] = normalizeSpace(value);
    while (i < body.length && body[i] !== ",") i += 1;
    if (body[i] === ",") i += 1;
  }

  return { type: match[1].toLowerCase(), key: normalizeSpace(match[2]), fields, raw: block.trim() };
}

function formatAuthors(authorField) {
  return String(authorField || "")
    .split(/\s+and\s+/i)
    .map((rawAuthor) => {
      const equalContribution = /\$\^#\$|\^#|†/.test(rawAuthor);
      const corresponding = /\*/.test(rawAuthor);
      const cleaned = cleanDisplay(rawAuthor)
        .replace(/\$\^#\$|\^#|†/g, "")
        .replace(/\*/g, "")
        .trim();
      const parts = cleaned.split(",").map(normalizeSpace).filter(Boolean);
      const display = parts.length > 1 ? `${parts.slice(1).join(" ")} ${parts[0]}` : cleaned;
      const isSelf = /(^|\s)Shixian\s+Liu$/i.test(display);
      const name = isSelf
        ? `<strong class="publication-self">${escapeHtml(display)}</strong>`
        : escapeHtml(display);
      const markers = `${equalContribution ? '<sup title="Equal contribution">#</sup>' : ""}${corresponding ? '<sup title="Corresponding author">*</sup>' : ""}`;
      return name + markers;
    })
    .filter(Boolean)
    .join(", ");
}

function identifySelfRoles(authorField) {
  const authors = String(authorField || "").split(/\s+and\s+/i);
  let firstOrCofirst = false;
  let corresponding = false;

  authors.forEach((rawAuthor, index) => {
    const equalContribution = /\$\^#\$|\^#|†/.test(rawAuthor);
    const hasCorrespondingMarker = /\*/.test(rawAuthor);
    const cleaned = cleanDisplay(rawAuthor)
      .replace(/\$\^#\$|\^#|†/g, "")
      .replace(/\*/g, "")
      .trim();
    const parts = cleaned.split(",").map(normalizeSpace).filter(Boolean);
    const display = parts.length > 1 ? `${parts.slice(1).join(" ")} ${parts[0]}` : cleaned;
    const isSelf = /(^|\s)Shixian\s+Liu$/i.test(display);

    if (!isSelf) return;
    firstOrCofirst = index === 0 || equalContribution;
    corresponding = hasCorrespondingMarker;
  });

  return { firstOrCofirst, corresponding };
}

function normalizeDoi(value) {
  return normalizeSpace(value)
    .replace(/[{}]/g, "")
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "");
}

function resolvePdf(value) {
  const raw = normalizeSpace(value || "").replace(/^\/+/, "");
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^assets\//i.test(raw)) return `/${raw}`;
  if (/^papers\//i.test(raw)) return `/assets/pdf/${raw}`;
  return `/assets/pdf/papers/${raw}`;
}

function resolvePreview(value) {
  const raw = normalizeSpace(value || "").replace(/^\/+/, "");
  if (!raw) return "/assets/img/papers/phonon-preview.svg";
  if (/^https?:\/\//i.test(raw)) return raw;
  const originalPath = raw.includes("/") ? `/${raw}` : `/assets/img/publication_preview/${raw}`;
  const webpPath = originalPath.replace(/\.(png|jpe?g)$/i, ".webp");
  if (webpPath !== originalPath && fs.existsSync(path.join(root, webpPath.replace(/^\//, "")))) {
    return webpPath;
  }
  return originalPath;
}

function buildCitationBibtex(entry) {
  const fields = entry.fields;
  const author = normalizeSpace(fields.author || "")
    .replace(/\$\^#\$|\^#|†/g, "")
    .replace(/\*/g, "");
  const title = cleanMathText(fields.title || "")
    .replace(/\\\(|\\\)/g, "");
  const citationFields = [
    ["author", author],
    ["title", title],
    ["journal", normalizeSpace(fields.journal || fields.booktitle || "")],
    ["volume", normalizeSpace(fields.volume || "")],
    ["pages", normalizeSpace(fields.pages || "")],
    ["year", normalizeSpace(fields.year || "")],
    ["doi", normalizeDoi(fields.doi || "")],
  ].filter(([, value]) => value);

  const lines = citationFields.map(([key, value], index) => {
    const suffix = index === citationFields.length - 1 ? "" : ",";
    return `  ${key}={${value}}${suffix}`;
  });
  return [`@${entry.type}{${entry.key},`, ...lines, "}"].join("\n");
}

const bibText = fs.readFileSync(bibPath, "utf8");
const publications = extractEntryBlocks(bibText)
  .map(parseEntry)
  .filter((entry) => entry?.fields?.title)
  .map((entry, index) => {
    const fields = entry.fields;
    const doi = normalizeDoi(fields.doi || "");
    const selfRoles = identifySelfRoles(fields.author);
    return {
      key: entry.key,
      order: index,
      type: entry.type,
      title: cleanMathText(fields.title),
      authors_html: formatAuthors(fields.author),
      journal: cleanDisplay(fields.journal || fields.booktitle || fields.venue || ""),
      abbreviation: cleanDisplay(fields.abbr || ""),
      year: Number((fields.year || "").match(/\d{4}/)?.[0] || 0),
      volume: cleanDisplay(fields.volume || ""),
      number: cleanDisplay(fields.number || ""),
      pages: cleanDisplay(fields.pages || ""),
      abstract: cleanMathText(fields.abstract || ""),
      preview: resolvePreview(fields.preview),
      pdf: resolvePdf(fields.pdf || fields.file),
      doi,
      link: fields.html || fields.link || fields.url || (doi ? `https://doi.org/${doi}` : ""),
      impact_factor: cleanDisplay(fields.if || fields.impact_factor || fields.jif || ""),
      scopus: cleanDisplay(fields.scopus || fields.scopus_quartile || fields.quartile || fields.q || ""),
      selected: /^(true|1|yes|y)$/i.test(cleanDisplay(fields.selected || "")),
      self_first_or_cofirst: selfRoles.firstOrCofirst,
      self_corresponding: selfRoles.corresponding,
      bibtex: buildCitationBibtex(entry),
    };
  })
  .sort((a, b) => b.year - a.year || a.order - b.order);

fs.writeFileSync(outputPath, `${JSON.stringify(publications, null, 2)}\n`);
fs.writeFileSync(downloadBibPath, `${publications.map((publication) => publication.bibtex).join("\n\n")}\n`);
console.log(`Wrote ${publications.length} publications to ${path.relative(root, outputPath)}`);
console.log(`Wrote citation-only BibTeX to ${path.relative(root, downloadBibPath)}`);
