/**
 * Generates the fictional partner wordmarks used in the referral-network
 * strip. These are invented organisations, so they are drawn rather than
 * sourced — no real brand marks appear anywhere on the site.
 *
 * Site photography is handled separately by scripts/fetch-photos.mjs.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "images", "logos");

const marks = {
  ring: `<circle cx="30" cy="36" r="15" fill="none" stroke="#6b7688" stroke-width="5"/>`,
  chevron: `<path d="M15 44 L30 26 L45 44" fill="none" stroke="#6b7688" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  cross: `<path d="M30 22 V50 M16 36 H44" stroke="#6b7688" stroke-width="6" stroke-linecap="round"/>`,
  hex: `<path d="M30 21 L43 28.5 L43 43.5 L30 51 L17 43.5 L17 28.5 Z" fill="none" stroke="#6b7688" stroke-width="4.5" stroke-linejoin="round"/>`,
  wave: `<path d="M15 40 C22 28 26 48 33 36 C38 27 41 42 46 34" fill="none" stroke="#6b7688" stroke-width="5" stroke-linecap="round"/>`,
  leaf: `<path d="M30 21 C43 27 43 45 30 51 C17 45 17 27 30 21 Z M30 24 V48" fill="none" stroke="#6b7688" stroke-width="4.5" stroke-linejoin="round"/>`,
};

function logo(label, mark) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 72" width="260" height="72" role="img">
  ${marks[mark] ?? marks.ring}
  <text x="58" y="45" font-family="Manrope, Segoe UI, sans-serif" font-size="23" font-weight="700" letter-spacing="-0.5" fill="#6b7688">${label}</text>
</svg>`;
}

const partners = [
  ["Northvale Health", "ring"],
  ["Beacon Care", "chevron"],
  ["Cedarline", "cross"],
  ["Meridian Group", "hex"],
  ["Harbourpoint", "wave"],
  ["Alder & Rowe", "leaf"],
];

mkdirSync(out, { recursive: true });

for (const [label, mark] of partners) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  writeFileSync(join(out, `${slug}.svg`), logo(label, mark));
}

console.log(`Generated ${partners.length} partner wordmarks in public/images/logos`);
