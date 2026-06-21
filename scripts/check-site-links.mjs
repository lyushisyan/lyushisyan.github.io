import fs from "node:fs";
import path from "node:path";

const siteRoot = path.resolve(process.argv[2] || "_site");

if (!fs.existsSync(siteRoot)) {
  console.error(`Built site not found: ${siteRoot}`);
  process.exit(1);
}

function collectHtmlFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(filePath, files);
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(filePath);
  }
  return files;
}

function resolveLocalTarget(htmlFile, rawUrl) {
  if (/^(?:[a-z]+:)?\/\//i.test(rawUrl)) return null;
  if (/^(?:mailto|tel|data|javascript):/i.test(rawUrl)) return null;
  if (rawUrl.startsWith("#")) return null;

  const cleanUrl = rawUrl.split(/[?#]/, 1)[0];
  if (!cleanUrl) return null;

  let decodedUrl;
  try {
    decodedUrl = decodeURI(cleanUrl);
  } catch {
    return { error: `invalid URL encoding: ${rawUrl}` };
  }

  const candidate = decodedUrl.startsWith("/")
    ? path.join(siteRoot, decodedUrl)
    : path.resolve(path.dirname(htmlFile), decodedUrl);

  if (!candidate.startsWith(siteRoot)) {
    return { error: `path escapes built site: ${rawUrl}` };
  }

  const alternatives = [candidate];
  if (decodedUrl.endsWith("/")) alternatives.push(path.join(candidate, "index.html"));
  if (!path.extname(candidate)) {
    alternatives.push(`${candidate}.html`, path.join(candidate, "index.html"));
  }

  return alternatives.some((target) => fs.existsSync(target))
    ? null
    : { error: `missing target: ${rawUrl}` };
}

const failures = [];
const htmlFiles = collectHtmlFiles(siteRoot);

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const result = resolveLocalTarget(htmlFile, match[1]);
    if (result) {
      failures.push(`${path.relative(siteRoot, htmlFile)}: ${result.error}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Found ${failures.length} broken local link(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files: no broken local links.`);
