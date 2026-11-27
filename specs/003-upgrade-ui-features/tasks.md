# Tasks: Portfolio UI & Feature Upgrade

**Input**: Design documents from `specs/003-upgrade-ui-features/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: The plan asks for `node --test` checks on the two pure helpers (validation, accent folding). Everything else is verified through `quickstart.md`.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup

- [X] T001 Change the rewrite source in `vercel.json` to `/((?!api/).*)` so `/api/*` reaches functions (research R3)
- [X] T002 [P] Add a `"test": "node --test src/helpers/*.test.ts"` script to `package.json`

---

## Phase 2: Foundational (blocks all stories)

- [X] T003 Persist the language in `src/i18n.ts`: `lng` = `localStorage.lang` (try/catch) or `'vi'`. On `languageChanged`, save it to `localStorage.lang` and set `document.documentElement.lang`; also set it once at init (R5)
- [X] T004 [P] Create `src/pages/not-found.tsx`: a heading, a short text and two links (Home `/`, Projects `/project`) using the existing `section-title` and `btn-glow-primary` classes, with i18n keys `notFound.title`, `notFound.desc`, `notFound.home` and `notFound.projects`
- [X] T005 Add the `notFound.*`, `contact.form.*`, `contact.errors.*`, `palette.*`, `github.*`, `testimonial.*` and `titles.*` keys to `src/locales/vi/translation.json` and `src/locales/en/translation.json`

**Checkpoint**: the language survives a reload, and `<html lang>` follows the switch.

---

## Phase 3: User Story 1 — Messages actually reach the owner (P1) 🎯 MVP

**Goal**: the contact form delivers to the owner's inbox and only reports real success.
**Independent Test**: quickstart checks 3–7.

- [X] T006 [P] [US1] Create `src/helpers/contact.ts` exporting `validateContact(input)` → `{ ok: true, value } | { ok: false, errors }`, with codes `required` / `invalid` / `tooLong`. Rules (data-model): name "required, trimmed, 1–100 chars"; email "required, ≤ 254 chars, matches `^[^\s@]+@[^\s@]+\.[^\s@]+$`"; subject "optional, ≤ 150 chars"; message "required, trimmed, 1–5,000 chars". No imports, so the function can use it too
- [X] T007 [P] [US1] Create `src/helpers/contact.test.ts` (node:test + assert) covering valid input, a missing name, `a@b`, a 5,001-char message and a 151-char subject
- [X] T008 [US1] Create `api/contact.ts` exporting `async function POST(request: Request)` per `contracts/contact-api.md`:
  - return 413 when the body is over 16 KB;
  - run `validateContact`, returning 400 with the errors;
  - honeypot `website` non-empty → 200 and nothing sent;
  - in-memory rate limit of 3 sends per 10 min per `x-forwarded-for` IP, returning 429, with a `ponytail:` comment about the per-instance ceiling;
  - a missing `RESEND_API_KEY` or `CONTACT_TO` → 503;
  - `fetch('https://api.resend.com/emails')` with `from: 'Portfolio <onboarding@resend.dev>'`, `to`, `reply_to` = the sender, subject `[Portfolio] <subject||'Tin nhắn mới'> — <name>`, and a plain `text` body;
  - non-2xx or a thrown error → 502; success → 200 `{ ok: true }`
- [X] T009 [US1] Rewrite the submit in `src/components/sections/contact/index.tsx`:
  - validate client-side with `validateContact` and show per-field errors (`is-invalid` plus `aria-describedby`) translated through `contact.errors.*`;
  - add a visually hidden honeypot input `website` (tabIndex -1, autocomplete off);
  - `POST /api/contact`, disable the button and show a spinner while pending;
  - show success and clear the form only on 200; on any other status keep the text and show the translated error plus a copy-email button;
  - replace the hardcoded Vietnamese labels and placeholders with `t('contact.form.*')`
- [X] T010 [US1] Run `npm test` and `npm run build`; confirm both pass

**Checkpoint**: after deploying with the env vars set, quickstart check 3 passes.

---

## Phase 4: User Story 2 — Consistent, polished look (P2)

**Goal**: one glass/aurora design language with no deviations, accessible in both themes.
**Independent Test**: quickstart check 14.

- [X] T011 [US2] Audit `src/styles/global.scss` and the section SCSS files (`hero.scss`, `introduction.scss`, `skill.scss`, `glow-card.scss`). List the section header, padding, card radius/border and button variants actually used, and pick one of each, keeping the existing tokens
- [X] T012 [US2] In `src/styles/global.scss`, add shared section spacing tokens (e.g. `--section-gap`) and one `.section-header` block (badge, title, subtitle). Make every section component in `src/components/sections/*/index.tsx` use it
- [X] T013 [US2] Unify cards in `src/styles/global.scss`: one radius, the `--bg-glass-card` background, the `--border-subtle` border, one hover. Remove one-off overrides in the section SCSS that conflict with it
- [X] T014 [US2] Unify buttons in `src/styles/global.scss`: `btn-glow-primary` plus one secondary outline variant, `min-height: 44px`, and one `:focus-visible` outline using `--border-active`. Apply them to the hero, contact, project and detail buttons
- [X] T015 [US2] Light-mode contrast in `src/styles/global.scss`: set `--text-muted` to around `#64748b` (≥ 4.5:1 on white) and check `--text-secondary` and the badge colors
- [X] T016 [US2] Add `@media (prefers-reduced-motion: reduce)` in `src/styles/global.scss` that stops the aurora blobs, the marquee, keyframe animations and transitions. In `src/components/sections/hero/hero.left.tsx`, show the static first line instead of the typewriter when `matchMedia('(prefers-reduced-motion: reduce)')` matches; disable the tilt the same way in its component
- [X] T017 [US2] At 375 px in both themes, check every page for horizontal overflow and tap targets under 44 px, and fix them in `src/styles/global.scss` and the section SCSS (header toggle, footer icons, filter chips, social icons)
- [X] T018 [US2] Hide the CV button in `src/components/sections/hero/hero.left.tsx` when `CV_LINK` is empty (R10)

---

## Phase 5: User Story 3 — Named tabs and link previews (P3)

**Goal**: each page has its own title, and shared links render a preview.
**Independent Test**: quickstart checks 2, 11 and 12.

- [X] T019 [US3] In `src/layout.tsx`, add an effect on `useLocation().pathname` plus the language that sets `document.title` from `titles.home`, `titles.projects` and `titles.about`. Skip `/project/:slug`, whose page already sets its title, and let NotFound set `titles.notFound` itself
- [X] T020 [P] [US3] Create `public/og.png` (1200×630) in the glass/aurora style with the name and "Fullstack Developer": write an SVG to the scratchpad and screenshot it at 1200×630 in Chrome
- [X] T021 [US3] Update `index.html`:
  - set `lang="vi"`;
  - add `meta name="description"`, `og:type`, `og:title`, `og:description`, `og:image` (absolute `${SITE_URL}/og.png`), `og:url` and `twitter:card=summary_large_image`, using `%SITE_URL%`-style placeholders that the plugin fills
- [X] T022 [US3] Add an inline `previewPages()` plugin in `vite.config.ts`:
  - in `closeBundle`, create a Vite server (`middlewareMode`, `appType: 'custom'`) and `ssrLoadModule('/src/helpers/data.ts')` to get `PROJECTS` and `APP_DATA`;
  - read `dist/index.html` and write `dist/project/index.html`, `dist/about/index.html` and `dist/project/<slug>/index.html`, replacing the title, description, `og:title`, `og:description` and `og:url` (projects use `title` and `description.vi`);
  - `SITE_URL` comes from `process.env.SITE_URL`, defaulting to the production domain;
  - close the server afterwards
- [X] T023 [US3] Run `npm run build` and confirm `dist/project/chia-tien/index.html` has `og:title` "Chia Tiền", and that `/project/chia-tien` still hydrates in `npm run preview`

---

## Phase 6: User Story 4 — Command palette (P3)

**Goal**: Ctrl+K or ⌘K, or the header button, jumps anywhere.
**Independent Test**: quickstart check 8.

- [X] T024 [P] [US4] Create `src/helpers/search.ts` exporting `fold(s)` (NFD, strip `\p{M}`, `đ`→`d`, lowercase) and `matches(query, label, keywords)`
- [X] T025 [P] [US4] Create `src/helpers/search.test.ts` covering `chia tien` matching "Chia Tiền", `ĐẶT` matching "đặt lịch", an empty query matching everything, and no false match
- [X] T026 [US4] Create `src/components/share/command-palette.tsx`:
  - a react-bootstrap `Modal` holding `input role="combobox"`, `aria-controls`, `aria-activedescendant` and a `ul role="listbox"` grouped into page, project and action;
  - items: pages (Home, Projects, About), every `PROJECTS` entry (keywords = tags + category + slug), and the actions copy email, toggle theme (via `useCurrentApp` and `localStorage.theme`), switch language, and open CV (only if `CV_LINK`);
  - ↑/↓ move the active item and Enter runs it and closes; show `palette.empty` when nothing matches;
  - export an `open` state hook
- [X] T027 [US4] Mount the palette in `src/layout.tsx` with a global `keydown` listener, (Ctrl or Meta) + K → `preventDefault()` and open; it works inside inputs and keeps their text
- [X] T028 [US4] Add a search icon button (`aria-label` = `palette.open`, ≥ 44 px) to `src/components/layout/app.header.tsx`, visible on all sizes, that opens the palette, with a `Ctrl K` hint on desktop

---

## Phase 7: User Story 5 — Testimonials (P3)

**Goal**: real quotes when they are supplied, nothing otherwise.
**Independent Test**: quickstart check 10.

- [X] T029 [US5] Add `ITestimonial` to `src/helpers/data.ts`: `id`, `name` (required), `role: TI18n`, `relation: 'teammate' | 'manager' | 'client' | 'mentor'`, `quote: TI18n` (required), `avatar?`, `link?`. Add `export const TESTIMONIALS: ITestimonial[] = []`
- [X] T030 [US5] Create `src/components/sections/testimonial/index.tsx`:
  - return `null` when `TESTIMONIALS.length === 0`;
  - otherwise a responsive grid of glass cards with the quote clamped to 5 lines and a "read more" toggle when it exceeds 400 chars;
  - show the name, the role in the current language and the translated relation, an avatar or initials fallback, and an optional profile link (`rel="noopener"`)
- [X] T031 [US5] Add `<Testimonial />` to `src/pages/home.tsx` after the GitHub section, with its divider rendered only when there are testimonials

---

## Phase 8: User Story 6 — Live GitHub activity (P3)

**Goal**: up to 6 fresh repos, with a graceful fallback.
**Independent Test**: quickstart check 9.

- [X] T032 [US6] Create `src/components/sections/github/index.tsx`:
  - an `IntersectionObserver` (`rootMargin` 300px) triggers a single fetch of `https://api.github.com/users/AnhHuynh1999/repos?sort=pushed&per_page=30`;
  - map to RepoSummary, filter `!fork`, sort by `pushed_at` descending, keep 6;
  - cache in `sessionStorage['gh:repos']` as `{ t, data }` for 3,600 s (try/catch);
  - show 6 fixed-height skeleton cards while loading;
  - each card shows the name (link to `html_url`), and the description and language only when present, plus stars and `pushedAt` via `Intl.RelativeTimeFormat(i18n.language)`;
  - a summary line: "N public repos · last push X";
  - on a non-OK response or an error, show `github.fallback` with a link to `APP_DATA.GITHUB_URL`
- [X] T033 [US6] Add `<GithubActivity />` with its divider to `src/pages/home.tsx`, between Featured projects and Testimonials

---

## Phase 9: User Story 7 — Not-found pages (P4)

**Independent Test**: quickstart check 13.

- [X] T034 [US7] Add `{ path: '*', element: <NotFoundPage /> }` to the layout children in `src/main.tsx`
- [X] T035 [US7] Replace the inline not-found block in `src/pages/project.detail.tsx` with `<NotFoundPage />` and remove the unused `project.notFound*` usage

---

## Phase 10: Polish & Cross-Cutting

- [X] T036 Run `npm run lint`, `npm run prettier` and `npm test`; fix the issues
- [ ] T037 Lighthouse mobile on `/`, `/project`, `/project/chia-tien` and `/about`: Performance ≥ 85 and Accessibility/SEO ≥ 95 (SC-003, SC-009). Fix regressions
- [ ] T038 Run all 16 checks in `quickstart.md` locally (`vercel dev` or preview), in both languages and both themes
- [ ] T039 Commit and push to `main`. The owner sets `RESEND_API_KEY` and `CONTACT_TO` in Vercel and redeploys; then verify quickstart checks 3, 6 and 12 on production

**Status (2026-11-27)**:
- T037: Accessibility 96–100 and SEO 100 on all four pages. Performance is **not met**: production LCP is 4.5 s on Slow 4G + 4× CPU, down from about 8 s+ thanks to lazy Lottie and route splitting. The rest is client-side render time; reaching ≥ 85 needs prerendered Home HTML (follow-up feature).
- T038: checks 1, 2, 4, 5, 7, 8, 9, 10 (empty case), 11, 13, 14 and 16 verified on preview and production. Checks 3 and 6 need the Resend env vars. Check 12 needs an external debugger.
- T039: pushed (f959a6e, 1116e46). Waiting for the owner to set RESEND_API_KEY and CONTACT_TO.

---

## Dependencies & Execution Order

- Setup → Foundational → stories. T003 and T005 block all UI stories, and T001 blocks US1 in production.
- The stories are independent of each other, except:
  - US5 and US6 both edit `src/pages/home.tsx`, so do T031 and T033 sequentially;
  - US2 (style) touches components that the others also touch, so finish US2 before US4–US6 to avoid restyling twice.
- Recommended order: US1 → US2 → US3 → US7 → US4 → US6 → US5 → Polish.

## Parallel Examples

- US1: T006 and T007 together, then T008 and T009.
- US3: T020 (image) alongside T019 and T021.
- US4: T024 and T025 together, then T026 → T027 → T028.

## Implementation Strategy

- **MVP = US1**: stops lost messages, which is the only issue that costs opportunities. Ship it first.
- Then US2 and US3 make the site look good and get shared well; then US7; then the three new features.
- Stop after any phase; each one is independently deployable.
