/**
 * Renders candidate Unsplash photos into a labelled grid and screenshots it,
 * so every image can be reviewed before it is assigned to a slot.
 *
 *   node scripts/contact-sheet.mjs ids.json sheet-1
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";

const idsFile = process.argv[2];
const name = process.argv[3] ?? "sheet";
const ids = JSON.parse(readFileSync(idsFile, "utf8"));

mkdirSync("/tmp/solis-shots/sheets", { recursive: true });

const cells = ids
  .map(
    (id, i) => `
  <figure>
    <img src="https://images.unsplash.com/${id}?w=420&h=300&fit=crop&q=70" alt="" />
    <figcaption>${i} · ${id}</figcaption>
  </figure>`,
  )
  .join("");

const html = `<!doctype html><meta charset="utf-8">
<style>
  body { margin:0; padding:16px; background:#111; font:12px/1.3 ui-monospace,monospace; }
  .grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
  figure { margin:0; background:#000; }
  img { width:100%; height:190px; object-fit:cover; display:block; background:#333; }
  figcaption { color:#8ef; padding:4px 2px; word-break:break-all; }
</style>
<div class="grid">${cells}</div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
await page.setContent(html, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2500);

const failed = await page.evaluate(() =>
  Array.from(document.querySelectorAll("img"))
    .filter((img) => !img.naturalWidth)
    .map((img) => img.src.match(/photo-[a-zA-Z0-9_-]+/)?.[0]),
);

const file = `/tmp/solis-shots/sheets/${name}.png`;
await page.screenshot({ path: file, fullPage: true });
console.log(`sheet: ${file}`);
if (failed.length) console.log("FAILED TO LOAD:", failed.join(", "));

await browser.close();
