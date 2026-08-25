/**
 * Accessibility audit.
 *
 * Runs axe-core against every route at desktop and mobile widths, and adds
 * a heading-order check that axe reports only as "best practice".
 */
import { chromium } from "playwright";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/cardiology",
  "/doctors",
  "/doctors/amara-osei",
  "/appointments",
  "/articles",
  "/articles/understanding-blood-pressure-numbers",
  "/contact",
  "/facilities",
  "/definitely-not-a-page",
];

const widths = [
  { width: 1440, height: 900, label: "desktop" },
  { width: 390, height: 844, label: "mobile" },
];

const browser = await chromium.launch();
let totalViolations = 0;
const summary = [];

for (const { width, height, label } of widths) {
  for (const route of routes) {
    // Reduced motion renders every element at its settled opacity and
    // position, so contrast is measured against real colours rather than
    // a mid-transition blend.
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    // The dev overlay is not part of the product.
    await page.addStyleTag({
      content: "nextjs-portal,[data-nextjs-toast]{display:none!important}",
    });

    await page.addScriptTag({ path: axePath });

    const result = await page.evaluate(async () => {
      // @ts-expect-error injected global
      return await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
        },
        resultTypes: ["violations"],
      });
    });

    const headingIssues = await page.evaluate(() => {
      const levels = Array.from(
        document.querySelectorAll("main h1, main h2, main h3, main h4"),
      ).map((el) => Number(el.tagName[1]));
      const problems = [];
      const h1Count = document.querySelectorAll("main h1").length;
      if (h1Count !== 1) problems.push(`main has ${h1Count} h1 elements`);
      for (let i = 1; i < levels.length; i += 1) {
        if (levels[i] - levels[i - 1] > 1) {
          problems.push(`heading jumps h${levels[i - 1]} → h${levels[i]}`);
        }
      }
      return problems;
    });

    const violations = result.violations ?? [];
    totalViolations += violations.length;

    if (violations.length || headingIssues.length) {
      summary.push(`\n${label} ${route}`);
      for (const v of violations) {
        summary.push(
          `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})`,
        );
        for (const node of v.nodes.slice(0, 3)) {
          summary.push(`      ${node.target.join(" ")}`);
          if (node.failureSummary) {
            summary.push(
              `      ${node.failureSummary.split("\n").slice(1, 3).join(" | ")}`,
            );
          }
        }
      }
      for (const h of headingIssues) {
        totalViolations += 1;
        summary.push(`  [heading-order] ${h}`);
      }
    }

    await page.close();
  }
}

if (summary.length) {
  console.log(summary.join("\n"));
} else {
  console.log("No violations found.");
}
console.log(
  `\n${routes.length * widths.length} page renders audited — ${totalViolations} issue${totalViolations === 1 ? "" : "s"}`,
);

await browser.close();
process.exit(totalViolations ? 1 : 0);
