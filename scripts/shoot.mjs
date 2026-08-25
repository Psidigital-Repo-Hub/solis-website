/**
 * Visual QA harness.
 *
 * Captures a route as a series of viewport-sized panels (rather than one
 * `fullPage` shot, which renders unreliably against `overflow-x: clip`),
 * and reports console errors, failed requests and horizontal overflow.
 *
 *   node scripts/shoot.mjs /            desktop, 1440
 *   node scripts/shoot.mjs /doctors 390 mobile
 */
import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const route = process.argv[2] ?? "/";
const width = Number(process.argv[3] ?? 1440);
const tag = process.argv[4] ?? `w${width}`;
const height = Number(process.argv[5] ?? Math.round(width * 0.64));

const slug = route === "/" ? "home" : route.replace(/\//g, "-").replace(/^-/, "");
const outDir = `/tmp/solis-shots/${slug}-${tag}`;
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
});

const problems = [];
page.on("console", (msg) => {
  if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
});
page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
page.on("requestfailed", (req) =>
  problems.push(`request failed: ${req.url()} — ${req.failure()?.errorText}`),
);

await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 60000 });

// Hide the Next.js dev overlay so it never lands in a review shot.
await page.addStyleTag({
  content: `nextjs-portal, #__next-build-watcher, [data-nextjs-toast] { display: none !important; }`,
});

// Walk the page once so scroll-triggered reveals have all fired.
const total = await page.evaluate(async () => {
  const step = window.innerHeight * 0.75;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, 0);
  return document.body.scrollHeight;
});
await page.waitForTimeout(600);

const overflow = await page.evaluate(() => {
  const doc = document.documentElement;
  if (doc.scrollWidth <= doc.clientWidth + 1) return null;
  const offenders = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.right > doc.clientWidth + 2) {
      offenders.push(
        `<${el.tagName.toLowerCase()} class="${String(el.className).slice(0, 90)}"> right=${Math.round(r.right)}`,
      );
    }
    if (offenders.length > 6) break;
  }
  return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offenders };
});

const panels = Math.ceil(total / height);
for (let i = 0; i < panels; i += 1) {
  await page.evaluate((y) => window.scrollTo(0, y), i * height);
  await page.waitForTimeout(260);
  await page.screenshot({ path: `${outDir}/${String(i).padStart(2, "0")}.png` });
}

console.log(`${panels} panels → ${outDir}  (page height ${total}px)`);
if (overflow) {
  console.log(
    `HORIZONTAL OVERFLOW: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`,
  );
  overflow.offenders.forEach((o) => console.log(`  ${o}`));
} else {
  console.log("no horizontal overflow");
}
if (problems.length) {
  console.log("PROBLEMS:");
  [...new Set(problems)].slice(0, 12).forEach((p) => console.log(`  ${p}`));
} else {
  console.log("no console/network problems");
}

await browser.close();
