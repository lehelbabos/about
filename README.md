# Lehel Babos — portfolio

An Astro portfolio with a homepage, About page, two encrypted case studies, and seven public case studies migrated from Medium. The four general writing articles retain their original Medium links.

## Local editing

Use Node.js 24 (or a supported newer version).

```sh
npm ci
npm run dev
```

Open **http://localhost:4321/**. The page updates when you save. Most homepage edits live in `src/pages/index.astro`; project cards and article links are in `src/data/projects.json` and `src/data/articles.json`. Shared styles live in `src/styles/` and navigation in `src/components/Header.astro`.

The About page is local at `/about/`. About and Read More use that local route. After the homepage finishes loading, an idle background task warms the About HTML, styles, and responsive portrait. It skips this work for data saver and very slow connections.

## Typography

Fonts are self-hosted variable IBM Plex Serif for headings (`675`) and IBM Plex Sans for body copy (`350`), with normal and italic styles. Typography tokens live in `src/styles/story-typography.css`; body copy uses `lg` (18px / 28px), captions and sidenotes use `md` (16px / 24px). The shared case-study text width is 688px, while wide images retain their layout. Body colour is `#515151`; headings use `#323232`.

## Editing a protected study

```sh
npm run studies:unlock
```

Enter the shared case-study password when prompted. This restores the editable source into `.private/studies/`, which Git ignores. Existing local files are kept, so unlocking cannot overwrite your work.

The protected studies use the same reading layout as the public case studies:

- `index.md` — the active story, metadata, image order, captions, and embeds.
- `assets/` — the original screenshots and graphics.
- `content/`, `layout.json`, and `layout.css` — archived source from the original Squarespace migration, kept for reference. Edit `index.md` for current changes.

While the dev server is running, the study URLs show the unlocked local version and reload after edits. New study folders require restarting the dev server. The production build always serves a password screen.

When ready to publish your edits:

```sh
npm run studies:seal
npm run build
npm test
```

Enter the shared password again. Sealing updates a small encrypted reading page in `public/protected/*.json`, individually encrypted images in `public/protected/media/`, and the original editable source in `public/protected/source/`. Commit the whole `public/protected/` folder along with any public layout/code changes. The editable archive is fetched by the local unlock command, not by visitors. **A normal build does not seal private edits automatically.** This explicit step prevents unfinished local drafts from being published accidentally.

Keep the password somewhere you can retrieve it. There is no password reset or server-side recovery mechanism. Changing the password means unlocking with the old password and sealing all studies with the new one; previously distributed copies can still be opened with their original password.

## Writing a case study together

Public case studies live in `src/content/case-studies/*.md`. Edit their Markdown text directly; frontmatter holds the title, original publication date, reading time, description, and Medium source URL. Images live under `public/images/case-studies/<slug>/`. Imported image groups use small HTML figure blocks inside the Markdown so captions and grouping remain editable. All case studies share the reading layout in `src/lib/story-layout.mjs`, responsive styling in `src/styles/public-studies.css`, and image viewer in `src/components/StudyImages.astro`. Typography size/line-height tokens in `src/styles/story-typography.css` follow the SimpleHedge Figma scale while retaining the portfolio fonts. Public pages omit author/date/reading-time rows and Medium attribution; source metadata stays in frontmatter for reference. The site renders these files at build time and needs no Medium service for text or images. The original YouTube video remains an external embed with a direct fallback link.

For a new public study, copy an existing Markdown file, give it a unique `slug` and `projectId`, and start with `draft: true`. Set `draft: false` when ready and add its project card/placement to the homepage. Drafts do not generate pages or appear as local project cards. Build and preview before committing.

For a new **password-protected** study:

```sh
npm run study:new -- project-name
```

This creates `.private/studies/project-name/index.md` from a simple starter. It includes context, your role, the problem, design decisions, outcomes, and reflections. Adapt those headings to the story. All studies use the shared reading layout.

We can work from rough notes, screenshots, and an outline, edit the Markdown together, and review the rendered page locally. Add images to the study's `assets/` folder and use normal Markdown image links. HTML is supported for richer layouts and embeds.

New studies start with `draft: true` and remain outside the published site. When ready, set `draft: false` and run `studies:seal`. Marking a published study as a draft and sealing removes its current published bundle. Old Git history and downloaded copies remain recoverable.

To feature a new study, add its card to `src/data/projects.json` and give it a matching layout position in `src/styles/home-layout.css`. All newly sealed studies get a route automatically. The existing homepage's deliberately staggered composition means adding a card requires choosing its placement.

## Password protection

Protected studies use AES-256-GCM encryption with PBKDF2-SHA-256 (600,000 iterations), random salt, and a unique IV for each bundle. The browser decrypts the files after a visitor enters the password. Each content image is encrypted separately with the same collection key and a unique IV. Lossless WebP is used when it reduces the file size, with original pixels preserved. After unlock, images are fetched and decrypted as they approach the viewport, or immediately when opened in the image viewer. Their temporary browser URLs are revoked when the page is left. Original source files remain in a separate encrypted archive for local editing. One successful password entry automatically unlocks all studies in the collection across pages and tabs in the same browser. A derived decryption key is kept locally for eight hours; the password itself is never stored. After expiry, the browser asks for the password again.

This is intended for selectively sharing portfolio work. It has no server-side rate limiting, user accounts, or per-person revocation. Password strength matters because encrypted bundles are downloadable. Public homepage thumbnails and project names remain public. Figma embeds retain their own Figma permissions and availability.

The plaintext source, drafts, and passwords are never required in GitHub Actions. Only the encrypted bundles are committed. Avoid adding `.private/` or any plaintext study exports to Git, including archive branches.

## Preview the production experience

```sh
npm run build
npm run preview
```

Open the printed preview URL to test the password screen, including while your local editing copy is unlocked. The site uses local fonts and images, with no Squarespace runtime or asset dependency.

## Shared assets and loading

`PortfolioImage.astro` and `src/lib/portfolio-media.ts` generate responsive WebP thumbnails and portraits at build time with Astro's image service. Stable original image URLs remain available for existing references. The first visible image gets eager/high-priority loading; later images and third-party embeds use lazy loading. Public case-study images get smaller responsive variants while original full-size links and animations are retained.

`Icon.astro` and `SocialLinks.astro` reference one hashed SVG sprite shared across pages. The two main text fonts are preloaded and all fonts remain self-hosted with `font-display: swap`. Common grid geometry lives in `src/styles/portfolio-grid.css`; homepage and About placement rules stay in their own stylesheets. Case studies share the reading typography and layout. Page HTML stays static, with small scripts for navigation, prefetching, the image viewer, and encrypted studies.

`tests/loading.test.mjs` checks loading priorities, responsive media paths, shared assets, small encrypted page payloads, and individual image encryption/pixel preservation. Run it through `npm test` after building.

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
