import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = process.cwd();
const siteRoot = path.resolve(process.argv[2] || '_site');
const styles = new Set();

function readPages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) readPages(file);
    if (!entry.isFile() || !file.endsWith('.html')) continue;
    for (const [link] of fs.readFileSync(file, 'utf8').matchAll(/<link\b[^>]*>/gi)) {
      if (!/\brel=["']stylesheet["']/i.test(link)) continue;
      const href = link.match(/\bhref=["']([^"']+)["']/i)?.[1];
      if (!href?.startsWith('/assets/css/')) continue;
      styles.add(decodeURIComponent(href.split(/[?#]/)[0]).slice(1));
    }
  }
}

readPages(siteRoot);
if (!styles.size) throw new Error('No local stylesheets found in the built pages.');
for (const relativePath of styles) {
  const source = path.join(sourceRoot, relativePath);
  const built = path.join(siteRoot, relativePath);
  if (!fs.existsSync(source) || !fs.existsSync(built)) {
    throw new Error(`Missing stylesheet: ${relativePath}`);
  }
  if (!fs.readFileSync(source).equals(fs.readFileSync(built))) {
    throw new Error(`Stylesheet was changed or overwritten during the build: ${relativePath}`);
  }
}
console.log(`Checked ${styles.size} referenced stylesheets: built files match source files.`);
