# Solis Medical Center

A production-grade marketing and patient-information site for a fictional
hospital, built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

> **This is demonstration content.** Solis Medical Center is not a real
> organisation. Clinicians, outcome figures, accreditations and contact
> details are placeholders, and nothing on the site is medical advice.
> Replace all content before any public deployment.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all routes prerender statically) |
| `npm run verify` | `lint` → `typecheck` → `build` |
| `npm run photos` | Download site photography from Unsplash (see Images) |
| `npm run logos` | Redraw the fictional partner wordmarks |
| `npm run qa:shots -- /doctors 390 mobile` | Screenshot a route in viewport-sized panels; reports console errors and horizontal overflow |
| `npm run qa:a11y` | axe-core audit (WCAG 2.1/2.2 AA) across every route at two widths |
| `npm run qa:interact` | Drives the drawer, forms, directory, keyboard focus and reduced motion |
| `npm run qa:sheet scenes` | Contact sheet of the downloaded photography |

The QA scripts need the dev server running.

---

## Design system

The visual language is defined once in `src/app/globals.css` and consumed
through Tailwind tokens. Nothing is styled ad hoc.

**Palette** — a royal medical blue (`brand`), a clinical green used only for
icon badges (`clinic`), and a cool blue-grey ink scale. Light-only by
design: this is a bright clinical surface, not a themeable app shell.

> `ink-400` is an icon, border and placeholder tone. It does not reach 4.5:1
> on white and must never be used for body text — use `ink-500` or darker.

**Type** — Manrope for headings and UI, Open Sans for long-form reading,
both self-hosted via `next/font`. The scale lives in the `.type-*` classes
(`type-display`, `type-h1` … `type-caption`) rather than in per-component
font sizes.

**Geometry** — the chevron is the signature. It appears as clip-path photo
masks (`.clip-hero`, `.clip-feature`, `.clip-notch`, `.clip-band`), as
oversized section watermarks, and in the logo. Below `md` the masks reduce
to a single upward notch so faces are never cropped by a diagonal.

**Radii** are deliberately tight — 4px buttons, 8px cards.

---

## Architecture

```
src/
├── app/                    Routes, metadata, sitemap, robots, error states
├── components/
│   ├── ui/                 Button, Field, Card, Icon registry
│   ├── layout/             Container, Section, masks, patterns, animation
│   ├── navigation/         Header, mobile drawer, nav config, logo
│   ├── sections/           Composed homepage/page sections
│   ├── doctors|articles|services|appointments|contact/
├── lib/
│   ├── data/               Typed content modules
│   ├── validations/        Zod schemas
│   └── site.ts             Organisation-level facts
└── types/                  Domain types
```

**Server-first.** Only genuinely interactive pieces are client components:
the header, mobile drawer, forms, the doctor directory, the resource tabs,
the audience switcher, and the animation wrappers. Every page prerenders.

**Content is separated from presentation.** `src/lib/data/*` returns the
same shapes a CMS or Supabase table would, so swapping the source is a
change of loader rather than of view. `src/types/index.ts` is the contract.

---

## Accessibility

Audited with axe-core against WCAG 2.1/2.2 AA across every route at desktop
and mobile widths — currently **0 violations**, plus a heading-order check
that axe treats only as best practice.

- Semantic landmarks, a skip link, one `h1` per page, no heading jumps.
  Card headings take a `headingAs` prop so a card under a page `h1` renders
  `h2` rather than `h3`.
- Forms wire label, helper text and error via ids; a failed submit renders
  an error summary that takes focus and links to each field. Errors are
  conveyed by icon, text and colour together.
- `prefers-reduced-motion` is honoured throughout: every animated component
  renders its final state directly rather than degrading to a stalled
  transform, and counters show their settled value.
- Focus is visible everywhere, and the nav dropdown opens on focus, admits
  focus into the panel, and closes on `Escape`.

---

## Images

Photography is sourced from [Unsplash](https://unsplash.com) under the
Unsplash License and **stored locally** in `public/images/` — the site has no
runtime dependency on a third-party CDN, and `next/image` optimises the files
itself.

`scripts/photos.manifest.json` is the source of truth. Each entry maps a
local filename to an Unsplash photo id, the exact crop that slot needs, and
the alt text describing what the photo actually shows.

```bash
npm run photos            # download anything missing
npm run photos -- --force # re-download everything
npm run qa:sheet scenes   # contact sheet: scenes | portraits | avatars
```

Crops are requested at each slot's aspect ratio (`fit=crop`, `crop=faces`
where a face matters), so the layout never depends on CSS to rescue a badly
proportioned source. Total weight is about 4 MB across 51 images.

**To swap a photograph:** change its `id` in the manifest, delete the local
file, and re-run `npm run photos`. Update the `alt` in the same entry, then
`npm run qa:sheet` to check the crop.

> **Check embedded text at display size.** A photo may contain signage,
> badges or logos naming a real organisation, which would falsely imply an
> affiliation. `node scripts/text-audit.mjs scenes` renders every photo at
> the width it is actually displayed at so this can be judged properly.
> Three candidates were rejected on this basis — see
> [public/images/CREDITS.md](public/images/CREDITS.md), which also covers
> the outstanding photographer attribution.

Partner logos (`public/images/logos/`) are invented wordmarks for fictional
organisations, drawn by `npm run logos`. They are the only SVGs served
through `next/image`, which is why `dangerouslyAllowSVG` remains set in
`next.config.ts`.

---

## Backend readiness

Nothing is wired to a backend yet, and no patient data is persisted or
written to browser storage.

- `submitRequest` in `components/appointments/appointment-form.tsx` and
  `sendEnquiry` in `components/contact/contact-form.tsx` are the only two
  transport functions. Replace their bodies to go live.
- **Re-run the Zod schema on the server.** Client validation is a courtesy,
  not a control.
- Submitting an email ending in `@fail.test` triggers the error state, so
  the failure path stays reviewable.

Security headers (`nosniff`, `SAMEORIGIN`, `Referrer-Policy`,
`Permissions-Policy`) are set in `next.config.ts`.

---

## Deployment

Optimised for Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production origin so
canonical URLs, Open Graph tags, the sitemap and `robots.txt` resolve
correctly — it falls back to a placeholder domain otherwise.
