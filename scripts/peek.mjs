/** Viewport-only screenshot at a given scroll offset, for quick diagnosis. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const route = process.argv[2] ?? "/";
const width = Number(process.argv[3] ?? 1440);
const scrollY = Number(process.argv[4] ?? 0);
const name = process.argv[5] ?? "peek";

mkdirSync("/tmp/solis-shots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: Math.round(width * 0.62) },
  deviceScaleFactor: 1,
});

await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await page.waitForTimeout(1200);

const file = `/tmp/solis-shots/${name}.png`;
await page.screenshot({ path: file });
console.log(file);

const info = await page.evaluate(() => ({
  bodyHeight: document.body.scrollHeight,
  heroText: document.querySelector("h1")?.textContent ?? "NO H1",
  heroOpacity: (() => {
    const h1 = document.querySelector("h1");
    if (!h1) return "n/a";
    const wrap = h1.closest("[style]");
    return wrap ? wrap.getAttribute("style") : getComputedStyle(h1).opacity;
  })(),
}));
console.log(JSON.stringify(info, null, 2));

await browser.close();
