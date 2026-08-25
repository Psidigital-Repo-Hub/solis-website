/**
 * Downloads the site photography from Unsplash into /public/images.
 *
 * Images are stored locally rather than hot-linked, so the site has no
 * runtime dependency on a third-party CDN and `next/image` can optimise
 * them. Crops are requested at the aspect ratio each slot needs, so the
 * layout never relies on CSS to rescue a badly proportioned source.
 *
 *   node scripts/fetch-photos.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "images");
const manifest = JSON.parse(
  readFileSync(join(root, "scripts", "photos.manifest.json"), "utf8"),
);

const QUALITY = 72;
const force = process.argv.includes("--force");

mkdirSync(out, { recursive: true });

/** Builds an imgix URL for the exact crop a slot needs. */
function url({ id, w, h, crop = "center" }) {
  const params = new URLSearchParams({
    ixlib: "rb-4.0.3",
    fm: "jpg",
    q: String(QUALITY),
    w: String(w),
    h: String(h),
    fit: "crop",
    crop,
    auto: "format",
  });
  return `https://images.unsplash.com/${id}?${params}`;
}

async function download(spec) {
  const file = join(out, `${spec.file}.jpg`);

  if (existsSync(file) && !force) {
    return { file: spec.file, status: "cached" };
  }

  const response = await fetch(url(spec), {
    headers: { "User-Agent": "solis-medical-site/1.0" },
  });

  if (!response.ok) {
    return { file: spec.file, status: `HTTP ${response.status}`, failed: true };
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  // A valid JPEG starts with FF D8 FF. Anything else is an error page.
  if (buffer.length < 2000 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return { file: spec.file, status: "not a JPEG", failed: true };
  }

  writeFileSync(file, buffer);
  return {
    file: spec.file,
    status: `${(buffer.length / 1024).toFixed(0)} KB`,
  };
}

const jobs = [
  ...manifest.scenes.map((s) => ({ ...s })),
  ...manifest.portraits.map((p) => ({ ...p, w: 720, h: 900, crop: "faces,center" })),
  ...manifest.avatars.map((a) => ({ ...a, w: 240, h: 240, crop: "faces,center" })),
];

console.log(`Fetching ${jobs.length} photos…`);

const results = [];
// Modest concurrency — enough to be quick, polite enough not to be throttled.
const batchSize = 6;
for (let i = 0; i < jobs.length; i += batchSize) {
  const batch = jobs.slice(i, i + batchSize);
  results.push(...(await Promise.all(batch.map(download))));
}

let bytes = 0;
for (const result of results) {
  if (result.failed) console.log(`  FAILED  ${result.file} — ${result.status}`);
  const kb = Number.parseInt(result.status, 10);
  if (!Number.isNaN(kb)) bytes += kb;
}

const failed = results.filter((r) => r.failed);
const cached = results.filter((r) => r.status === "cached").length;

console.log(
  `${results.length - failed.length}/${results.length} ok` +
    (cached ? ` (${cached} cached)` : "") +
    (bytes ? ` — ${(bytes / 1024).toFixed(1)} MB downloaded` : ""),
);

if (failed.length) process.exit(1);
