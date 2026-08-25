/**
 * Contact sheet of the downloaded photography, rendered at each slot's real
 * aspect ratio so crops (especially faces) can be checked before use.
 *
 *   node scripts/local-sheet.mjs scenes|portraits|avatars
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "scripts", "photos.manifest.json"), "utf8"),
);

const group = process.argv[2] ?? "scenes";
const items = manifest[group];
const cols = group === "avatars" ? 6 : 4;
const cellH = group === "portraits" ? 300 : group === "avatars" ? 160 : 190;

mkdirSync("/tmp/solis-shots/sheets", { recursive: true });

const cells = items
  .map(
    (item) => `
  <figure>
    <img src="file://${join(root, "public", "images", `${item.file}.jpg`)}" alt="" />
    <figcaption>${item.file}</figcaption>
  </figure>`,
  )
  .join("");

const html = `<!doctype html><meta charset="utf-8">
<style>
  body { margin:0; padding:14px; background:#111; font:11px/1.3 ui-monospace,monospace; }
  .grid { display:grid; grid-template-columns:repeat(${cols},1fr); gap:10px; }
  figure { margin:0; }
  img { width:100%; height:${cellH}px; object-fit:cover; display:block; background:#333; }
  figcaption { color:#8ef; padding:3px 1px; }
</style>
<div class="grid">${cells}</div>`;

// The page itself is loaded from disk so that its origin is file:// and it
// is therefore allowed to read the local images.
const htmlPath = "/tmp/solis-shots/sheets/_sheet.html";
writeFileSync(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const file = `/tmp/solis-shots/sheets/local-${group}.png`;
await page.screenshot({ path: file, fullPage: true });
console.log(file);
await browser.close();
