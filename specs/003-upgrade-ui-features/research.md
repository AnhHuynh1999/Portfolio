# Research: Portfolio UI & Feature Upgrade

## R1 — Contact delivery

- **Decision**: `api/contact.ts` is a Vercel Function. It validates the input, drops honeypot hits, rate-limits, then sends a `POST https://api.resend.com/emails` with `from: "Portfolio <onboarding@resend.dev>"`, `to: CONTACT_TO`, and `reply_to: <sender>`. It returns 200 only when Resend returns 2xx.
- **Rationale**: Resend's free tier can send from its shared domain to the account owner's own address, which is exactly this use case. It needs no domain setup, the secret stays on the server, and plain `fetch` means no SDK.
- **Env**: `RESEND_API_KEY` and `CONTACT_TO` (owner's email), both set by the owner in Vercel. When either is missing, the function returns 503, so the form shows its error state and never a false success.
- **Alternatives**: Web3Forms or Formspree (client-side key, no server validation); EmailJS (key in the bundle); SMTP via nodemailer (adds a dependency and needs Gmail app passwords).

## R2 — Rate limit (FR-004)

- **Decision**: an in-memory `Map<ipHash, timestamps[]>` inside the function allows 3 messages per 10 minutes. The honeypot field is named `website`. The client disables the Send button while a request is pending.
- **Ceiling**: the counter lives per function instance and resets on a cold start. `ponytail:` comment in code; the upgrade path is Upstash or a Vercel KV counter if spam actually shows up.

## R3 — `/api` routing

- **Decision**: change the `vercel.json` rewrite source to `/((?!api/).*)`. Without this, the SPA catch-all would swallow `/api/contact`.
- Vercel checks the filesystem before rewrites, so the generated `dist/project/<slug>/index.html` (R4) is served directly.

## R4 — Link previews (FR-009)

- **Decision**: a Vite plugin hook, `closeBundle`, does the following:
  - loads `src/helpers/data.ts` through `server.ssrLoadModule`, where image imports resolve harmlessly;
  - writes `dist/project/<slug>/index.html`, `dist/project/index.html` and `dist/about/index.html` as copies of `dist/index.html`;
  - replaces `<title>`, `description`, `og:*` and `twitter:*` in each copy.
- The shared image is `public/og.png` (1200×630 PNG). Project covers are SVG, which Facebook and LinkedIn do not render, so the spec assumption allowing one shared image applies.
- `og:url` uses the production origin: env `SITE_URL`, defaulting to the current Vercel domain.
- **Alternatives**: prerendering with a headless browser (heavy); an edge middleware that injects tags (more moving parts); react-helmet (crawlers do not run it anyway).

## R5 — Titles & language (FR-008)

- **Decision**:
  - `i18n.ts`: `lng: localStorage.lang || 'vi'`, plus an `on('languageChanged')` handler that saves the choice and sets `document.documentElement.lang`.
  - `layout.tsx`: a small effect that maps the route to a title key. The detail page keeps its existing title effect.
- **Finding**: the language is currently not persisted, so it resets to English on every reload. This plan fixes that.
- **Open default**: the owner and the audience are Vietnamese, so the default for first-time visitors becomes `vi`. Change it to `en` in `i18n.ts` if recruiters are international.

## R6 — Command palette (FR-011)

- **Decision**: a react-bootstrap `Modal`, which already handles the focus trap, Esc, outside clicks and restoring focus. It contains an `<input role="combobox">` and a `role="listbox"`. A global `keydown` listener opens it on (Ctrl or Meta) + K, and a header button opens it on touch screens.
- **Accent folding**: `s.normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/gi,'d').toLowerCase()`, then a substring match on the label and keywords.
- **Alternatives**: cmdk or kbar (new dependencies for something under 150 lines).

## R7 — GitHub activity (FR-013)

- **Decision**:
  - The client calls `GET https://api.github.com/users/AnhHuynh1999/repos?sort=pushed&per_page=30` (CORS is allowed), drops forks and keeps the first 6.
  - The result is cached in `sessionStorage` for 1 hour.
  - The fetch only starts when the section scrolls near view (`IntersectionObserver`), so it does not affect the initial load (SC-009).
  - Skeleton cards reserve a fixed height, so nothing jumps when data arrives.
- The activity summary uses the same response: "N public repos · last push X ago". No second API call.
- **Rate limit**: 60 requests/hour applies per visitor IP, which is fine for one visitor, and the cache covers repeat visits. A 403 or a network error shows the fallback with a profile link.
- **Alternatives**: a server proxy with CDN cache (only worth it if the limit is actually hit); the GitHub GraphQL API (needs a token).

## R8 — Testimonials (FR-012)

- **Decision**: a `TESTIMONIALS: ITestimonial[] = []` array in `data.ts`. The section renders `null` when the array is empty, and the palette and menu entries are filtered out the same way. Missing photos fall back to initials from the name. Long quotes are clamped with CSS `line-clamp: 5` and have a toggle.

## R9 — Style unification (FR-006, FR-007)

- **Decision**: audit `global.scss` (1,400 lines) and the section SCSS, then normalize to the tokens that already exist:
  - one `.section-header` pattern, using the existing badge, title and subtitle classes;
  - one section spacing scale;
  - one card radius and border built from `--bg-glass-card` and `--border-subtle`;
  - one button family (`btn-glow-primary` and a secondary).
- Add `@media (prefers-reduced-motion: reduce)` to stop aurora, marquee, typewriter, tilt and transitions; `:focus-visible` outlines; a 44 px minimum on tap targets.
- Check light-mode `--text-muted` (`#94a3b8` on white is 2.6:1, which fails) and darken it to about `#64748b` (4.8:1).

## R10 — CV link (FR-014 regression found)

- **Finding**: `CV_LINK = ''`, so "Download CV" opens a blank tab today.
- **Decision**: hide the CV button and the palette action while `CV_LINK` is empty. The owner pastes a link to restore them.
