import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const statsPath = process.env.SITE_STATS_PATH || path.join(root, "_data/site_stats.yml");
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

const citations = metricFromTable(table, "citations");
const hIndex = metricFromTable(table, "h_index");
let stats = fs.readFileSync(statsPath, "utf8");
stats = replaceYamlInteger(stats, "citations", citations);
stats = replaceYamlInteger(stats, "h_index", hIndex);
const updatedPattern = /^updated:\s*["']?\d{4}-\d{2}-\d{2}["']?\s*$/m;
if (!updatedPattern.test(stats)) throw new Error("Missing date field updated in _data/site_stats.yml.");
stats = stats.replace(updatedPattern, `updated: "${shanghaiDate()}"`);
fs.writeFileSync(statsPath, stats);

console.log(`Updated Google Scholar metrics: ${citations} citations, h-index ${hIndex}.`);
