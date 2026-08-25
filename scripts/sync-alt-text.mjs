/**
 * Propagates alt text from the photo manifest into the source.
 *
 * `scripts/photos.manifest.json` is the source of truth for what each
 * photograph shows. Swapping a photo there must not leave stale alt text
 * describing the previous image, so this rewrites every alt string that sits
 * alongside an `/images/<name>.jpg` reference.
 *
 *   node scripts/sync-alt-text.mjs          report drift
 *   node scripts/sync-alt-text.mjs --write  apply it
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "scripts", "photos.manifest.json"), "utf8"),
);

const altByFile = new Map();
for (const group of ["scenes", "portraits"]) {
  for (const item of manifest[group] ?? []) {
    if (item.alt) altByFile.set(item.file, item.alt);
  }
}

const write = process.argv.includes("--write");

/** The three shapes an alt string takes next to an image reference. */
const patterns = [
  // image: "/images/x.jpg",\n imageAlt: "…"
  /(image:\s*"\/images\/([a-z0-9-]+)\.jpg",\s*\n\s*imageAlt:\s*)"((?:[^"\\]|\\.)*)"/g,
  // src: "/images/x.jpg",\n alt: "…"
  /(src:\s*"\/images\/([a-z0-9-]+)\.jpg",\s*\n\s*alt:\s*)"((?:[^"\\]|\\.)*)"/g,
  // <Image src="/images/x.jpg" … alt="…" />
  /(src="\/images\/([a-z0-9-]+)\.jpg"\s*\n(?:\s*[a-zA-Z]+(?:=\{[^}]*\}|="[^"]*")?\s*\n)*?\s*alt=)"((?:[^"\\]|\\.)*)"/g,
];

const files = globSync("src/**/*.{ts,tsx}", { cwd: root });
const drift = [];

for (const rel of files) {
  const path = join(root, rel);
  const original = readFileSync(path, "utf8");
  let updated = original;

  for (const pattern of patterns) {
    updated = updated.replace(pattern, (match, head, name, current) => {
      const wanted = altByFile.get(name);
      if (!wanted || wanted === current) return match;
      // An empty alt is a deliberate call that the image is decorative —
      // it sits inside an aria-hidden wrapper and must stay silent.
      if (current === "") return match;
      drift.push({ file: relative(root, path), name, current, wanted });
      return `${head}"${wanted}"`;
    });
  }

  if (updated !== original && write) writeFileSync(path, updated);
}

if (drift.length === 0) {
  console.log("Alt text is in sync with the manifest.");
} else {
  for (const d of drift) {
    console.log(`${d.file}  [${d.name}]`);
    console.log(`   was:  ${d.current}`);
    console.log(`   now:  ${d.wanted}`);
  }
  console.log(
    `\n${drift.length} alt string${drift.length === 1 ? "" : "s"} ${write ? "updated" : "out of sync (run with --write)"}`,
  );
  if (!write) process.exit(1);
}
