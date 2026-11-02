# Lehel Babos — portfolio

An Astro portfolio that recreates the Squarespace homepage and About page and migrates the Indeed Connect and TableCheck Reservations case studies. Other projects and articles keep their original Medium links.

## Local editing

Use Node.js 24 (or a supported newer version).

```sh
npm ci
npm run dev
```

Open **http://localhost:4321/**. The page updates when you save. Most homepage edits live in `src/pages/index.astro`; project cards and article links are in `src/data/projects.json` and `src/data/articles.json`. Shared styles live in `src/styles/` and navigation in `src/components/Header.astro`.

The About page is local at `/about/`. About and Read More use that local route. Astro prefetches it after initial page load; the portrait and shared styling are prepared in the background too.

## Editing a protected study

```sh
npm run studies:unlock
```

Enter the shared case-study password when prompted. This restores the editable source into `.private/studies/`, which Git ignores. Existing local files are kept, so unlocking cannot overwrite your work.

The migrated studies contain:

- `content/*.md` — individual text sections, written in Markdown.
- `assets/` — the original screenshots and graphics.
- `layout.json` — the order, image references, embeds, and original grid placement.
- `layout.css` — the responsive layout captured from the original page.

While the dev server is running, the study URLs show the unlocked local version and reload after edits. New study folders require restarting the dev server. The production build always serves a password screen.

When ready to publish your edits:

```sh
npm run studies:seal
npm run build
npm test
```

Enter the shared password again. Sealing updates `public/protected/*.json` with encrypted page content, images, and editable source. Commit those encrypted files along with any public layout/code changes. **A normal build does not seal private edits automatically.** This explicit step prevents unfinished local drafts from being published accidentally.

Keep the password somewhere you can retrieve it. There is no password reset or server-side recovery mechanism. Changing the password means unlocking with the old password and sealing all studies with the new one; previously distributed copies can still be opened with their original password.

## Writing a case study together

```sh
npm run study:new -- project-name
```

This creates `.private/studies/project-name/index.md` from a simple starter. It includes context, your role, the problem, design decisions, outcomes, and reflections. Adapt those headings to the story. New studies use a shared reading layout; migrated studies retain their original layouts.

We can work from rough notes, screenshots, and an outline, edit the Markdown together, and review the rendered page locally. Add images to the study's `assets/` folder and use normal Markdown image links. HTML is supported for richer layouts and embeds.

New studies start with `draft: true` and remain outside the published site. When ready, set `draft: false` and run `studies:seal`. Marking a published study as a draft and sealing removes its current published bundle. Old Git history and downloaded copies remain recoverable.

To feature a new study, add its card to `src/data/projects.json` and give it a matching layout position in `src/styles/home-layout.css`. All newly sealed studies get a route automatically. The existing homepage's deliberately staggered composition means adding a card requires choosing its placement.

## Password protection

Protected studies use AES-256-GCM encryption with PBKDF2-SHA-256 (600,000 iterations), random salt, and a unique IV for each bundle. The browser decrypts the files after a visitor enters the password. Full-size images are included in the encrypted bundle and become temporary browser URLs after unlock. One successful password entry automatically unlocks all studies in the collection across pages and tabs in the same browser. A derived decryption key is kept locally for eight hours; the password itself is never stored. After expiry, the browser asks for the password again.

This is intended for selectively sharing portfolio work. It has no server-side rate limiting, user accounts, or per-person revocation. Password strength matters because encrypted bundles are downloadable. Public homepage thumbnails and project names remain public. Figma embeds retain their own Figma permissions and availability.

The plaintext source, drafts, and passwords are never required in GitHub Actions. Only the encrypted bundles are committed. Avoid adding `.private/` or any plaintext study exports to Git, including archive branches.

## Preview the production experience

```sh
npm run build
npm run preview
```

Open the printed preview URL to test the password screen, including while your local editing copy is unlocked. The site uses local fonts and images, with no Squarespace runtime or asset dependency.

## Publishing

The repository uses **master**, not main. GitHub Pages uses GitHub Actions. Every push to `master` builds, tests, and publishes `dist/`.

The production configuration targets **https://www.lehelbabos.com/** at the domain root. GitHub Pages must have `www.lehelbabos.com` configured as its custom domain. At Namecheap, `www` points to `lehelbabos.github.io` via CNAME; the four apex A records point to GitHub Pages so `lehelbabos.com` redirects to `www`. Email records stay independent of web hosting.

For a deployment without the custom domain, override `SITE_URL=https://lehelbabos.github.io` and `SITE_BASE=/about` when building, and remove the custom domain from Pages. These environment overrides also support temporary previews under a different base path.

## Archive and rollback

The exact pre-migration Git snapshot is preserved at:

- Branch: `archive/pre-astro-2026-11-02`
- Tag: `pre-astro-2026-11-02`
- Commit: `8a7513c88dd1c3641a59acaab6b235ebc1ddaec9`

Existing history and Git LFS references are preserved. To restore the old deployment, use a reviewable restore commit from that snapshot and return the Pages source to `master:/docs`.
