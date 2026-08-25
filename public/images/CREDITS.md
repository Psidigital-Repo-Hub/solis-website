# Photography credits

All photographs in this directory come from [Unsplash](https://unsplash.com)
and are used under the [Unsplash License](https://unsplash.com/license),
which permits commercial use without permission.

They are downloaded and served locally by `npm run photos`, driven by
`scripts/photos.manifest.json`. That manifest is the source of truth: it
records the Unsplash photo id, the requested crop, and the alt text for
every file.

## Before public deployment

**Photographer attribution is incomplete.** Attribution is not required by
the Unsplash License, but it is customary and it is the right thing to do.
Unsplash's search and metadata endpoints are behind bot protection and
reject unauthenticated clients, so photographer names could not be resolved
automatically during the build.

To complete this properly:

1. Register an application at <https://unsplash.com/developers> (free) and
   obtain an Access Key.
2. For each `id` in `scripts/photos.manifest.json`, call
   `GET /photos/:id` and read `user.name` and `links.html`.
3. Record the photographer and photo URL against each entry here.

Note that the ids in the manifest are the CDN ids (`photo-1609220136736-…`).
The API expects the short public id, which the API response will also
return — resolving one from the other is part of step 2.

## Partner logos

`logos/*.svg` are **not** from Unsplash. They are invented wordmarks for
fictional organisations, drawn by `scripts/generate-logos.mjs`. No real
brand marks appear anywhere on this site.

## Selection notes

Every photo was reviewed visually before being assigned to a slot, and alt
text was written from the actual image rather than inferred from the
filename. Two candidates were rejected during review because they contained
real organisations' branding, which would falsely imply an affiliation:

- an ambulance carrying "American Medical Response" livery
- a hospital exterior with "Mayo Clinic" signage
- a clinician whose coat badge legibly read "Urologic Oncology Branch"

If you swap any photograph, apply the same check at the size the image is
actually displayed — a badge that is illegible on a card may be readable in
a hero. `npm run photos:textaudit scenes` renders every photo at its real
display width for exactly this purpose.

### Known caveat

`doctor-tomas-varga.jpg` shows a clinician whose scrub top carries a small
embroidered name and role. It is not an organisation and it is not legible
at the sizes the portrait is used (max 320px wide), but it does not match the
fictional name attached to it. Worth replacing if you commission real
portraits.

## Finding replacements

Unsplash's search is behind bot protection and rejects scripted clients, so
candidate ids cannot be discovered automatically. To choose new photos:

1. Browse <https://unsplash.com> in a normal browser and collect photo ids
   from the CDN URLs (`images.unsplash.com/photo-…`).
2. `npm run photos:candidates -- ids.json sheet-name` renders them into a
   labelled grid so you can review them together before committing.
3. Add the chosen id and its alt text to the manifest, then
   `npm run photos` and `npm run alt:sync`.
