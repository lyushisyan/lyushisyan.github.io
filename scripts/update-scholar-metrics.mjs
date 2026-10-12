import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const statsPath = process.env.SITE_STATS_PATH || path.join(root, "_data/site_stats.yml");
const publicationsPath = process.env.PUBLICATIONS_PATH || path.join(root, "_data/publications.json");
const citationsPath = process.env.SCHOLAR_CITATIONS_PATH || path.join(root, "_data/scholar_citations.json");
const apiKey = process.env.SERPAPI_API_KEY;
const authorId = process.env.GOOGLE_SCHOLAR_AUTHOR_ID || "bLVSRuUAAAAJ";
const fixturePath = process.env.SCHOLAR_METRICS_FIXTURE;

function metricFromTable(table, name) {
  const value = table.find((row) => row?.[name])?.[name]?.all;
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Google Scholar response does not contain a valid ${name}.all value.`);
  }
  return value;
}

function replaceYamlInteger(source, key, value) {
  const pattern = new RegExp(`^${key}:\\s*\\d+\\s*$`, "m");
  if (!pattern.test(source)) throw new Error(`Missing integer field ${key} in _data/site_stats.yml.`);
  return source.replace(pattern, `${key}: ${value}`);
}

function normalizeTitle(title) {
  return String(title || "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function titleTokens(title) {
  return new Set(
    String(title || "")
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .toLocaleLowerCase("en")
      .match(/[\p{L}\p{N}]+/gu) || [],
  );
}

function titleSimilarity(left, right) {
  const leftTokens = titleTokens(left);
  const rightTokens = titleTokens(right);
  if (!leftTokens.size || !rightTokens.size) return 0;
  let overlap = 0;
  for (const token of leftTokens) if (rightTokens.has(token)) overlap += 1;
  return (2 * overlap) / (leftTokens.size + rightTokens.size);
}

function citationCount(article) {
  const value = article?.cited_by?.value;
  if (value === undefined || value === null || value === "") return 0;
  const normalizedValue = typeof value === "string" ? value.replaceAll(",", "").trim() : value;
  const numericValue = typeof normalizedValue === "string" && /^\d+$/.test(normalizedValue)
    ? Number(normalizedValue)
    : normalizedValue;
  if (!Number.isSafeInteger(numericValue) || numericValue < 0) {
    throw new Error(`Invalid citation count for Google Scholar article: ${article?.title || "unknown"}.`);
  }
  return numericValue;
}

function matchArticles(publications, articles) {
  const matches = new Map();
  const usedArticleIndexes = new Set();
  const exactIndexes = new Map();

  articles.forEach((article, index) => {
    const normalized = normalizeTitle(article?.title);
    if (!normalized) return;
    const existingIndex = exactIndexes.get(normalized);
    if (existingIndex === undefined || citationCount(article) > citationCount(articles[existingIndex])) {
      exactIndexes.set(normalized, index);
    }
  });

  for (const publication of publications) {
    const articleIndex = exactIndexes.get(normalizeTitle(publication.title));
    if (articleIndex === undefined || usedArticleIndexes.has(articleIndex)) continue;
    matches.set(publication.key, articles[articleIndex]);
    usedArticleIndexes.add(articleIndex);
  }

  for (const publication of publications) {
    if (matches.has(publication.key)) continue;
    const candidates = articles
      .map((article, index) => ({ article, index, score: titleSimilarity(publication.title, article?.title) }))
      .filter(({ index }) => !usedArticleIndexes.has(index))
      .sort((a, b) => b.score - a.score);
    const best = candidates[0];
    const runnerUp = candidates[1];
    if (!best || best.score < 0.86 || (runnerUp && best.score - runnerUp.score < 0.08)) continue;
    matches.set(publication.key, best.article);
    usedArticleIndexes.add(best.index);
  }

  return matches;
}

function shanghaiDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function getScholarData() {
  if (fixturePath) return JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  if (!apiKey) throw new Error("SERPAPI_API_KEY is required.");

  const url = new URL("https://serpapi.com/search.json");
  url.search = new URLSearchParams({
    engine: "google_scholar_author",
    author_id: authorId,
    hl: "en",
    num: "100",
    api_key: apiKey,
  });

  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`SerpApi request failed with HTTP ${response.status}.`);
  const data = await response.json();
  if (data.error) throw new Error(`SerpApi error: ${data.error}`);
  return data;
}

const data = await getScholarData();
const table = data?.cited_by?.table;
if (!Array.isArray(table)) throw new Error("Google Scholar response is missing cited_by.table.");
if (!Array.isArray(data?.articles)) throw new Error("Google Scholar response is missing articles.");

const citations = metricFromTable(table, "citations");
const hIndex = metricFromTable(table, "h_index");
let stats = fs.readFileSync(statsPath, "utf8");
stats = replaceYamlInteger(stats, "citations", citations);
stats = replaceYamlInteger(stats, "h_index", hIndex);
const updatedPattern = /^updated:\s*["']?\d{4}-\d{2}-\d{2}["']?\s*$/m;
if (!updatedPattern.test(stats)) throw new Error("Missing date field updated in _data/site_stats.yml.");
stats = stats.replace(updatedPattern, `updated: "${shanghaiDate()}"`);
fs.writeFileSync(statsPath, stats);

const publications = JSON.parse(fs.readFileSync(publicationsPath, "utf8"));
if (!Array.isArray(publications)) throw new Error("_data/publications.json must contain an array.");
const matches = matchArticles(publications, data.articles);
const scholarUrl = `https://scholar.google.com/citations?user=${encodeURIComponent(authorId)}&hl=en`;
const perPublication = Object.fromEntries(
  publications.map((publication) => {
    const article = matches.get(publication.key);
    return [
      publication.key,
      {
        count: article ? citationCount(article) : 0,
        url: article?.cited_by?.link || article?.link || scholarUrl,
      },
    ];
  }),
);
fs.writeFileSync(citationsPath, `${JSON.stringify(perPublication, null, 2)}\n`);

const unmatched = publications.filter((publication) => !matches.has(publication.key));
console.log(
  `Updated Google Scholar metrics: ${citations} citations, h-index ${hIndex}; matched ${matches.size}/${publications.length} publications.`,
);
if (unmatched.length) {
  console.warn(`No Google Scholar profile match (shown as Cited by 0): ${unmatched.map(({ key }) => key).join(", ")}`);
}
