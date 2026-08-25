/**
 * Renders every photo at the largest size it is actually displayed at, so
 * embedded signage, badges and logos can be checked for legibility.
 *
 * A real organisation's name readable inside a photo would imply an
 * affiliation this fictional hospital does not have.
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "scripts", "photos.manifest.json"), "utf8"),
);

/** Approximate on-screen width at a 1440px viewport, per slot. */
const renderedWidth = {
  "hero-family": 780,
  consultation: 660,
  partnership: 660,
  technology: 300,
  "care-team": 300,
  "cta-reception": 760,
  "cta-support": 760,
  "about-atrium": 700,
  "about-team": 640,
  "patients-walking": 600,
};
const DEFAULT_SCENE_WIDTH = 640; // service + article images on detail pages

const group = process.argv[2] ?? "scenes";
const items = manifest[group];

mkdirSync("/tmp/solis-shots/sheets", { recursive: true });

const cells = items
  .map((item) => {
    const w = renderedWidth[item.file] ?? DEFAULT_SCENE_WIDTH;
    return `
  <figure style="width:${w}px">
    <img src="file://${join(root, "public", "images", `${item.file}.jpg`)}" style="width:${w}px" />
    <figcaption>${item.file} — displayed ~${w}px wide</figcaption>
  </figure>`;
  })
  .join("");

const html = `<!doctype html><meta charset="utf-8">
<style>
  body { margin:0; padding:16px; background:#111; font:12px/1.4 ui-monospace,monospace; }
  .wrap { display:flex; flex-wrap:wrap; gap:16px; align-items:flex-start; }
  figure { margin:0; }
  img { display:block; height:auto; }
  figcaption { color:#8ef; padding:4px 0; }
</style>
<div class="wrap">${cells}</div>`;

const htmlPath = "/tmp/solis-shots/sheets/_audit.html";
writeFileSync(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const file = `/tmp/solis-shots/sheets/text-audit-${group}.png`;
await page.screenshot({ path: file, fullPage: true });
console.log(file);
await browser.close();
