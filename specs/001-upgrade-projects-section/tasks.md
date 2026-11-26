# Tasks: Nâng cấp phần Dự án (Projects) của Portfolio

**Input**: `specs/001-upgrade-projects-section/spec.md` (incl. Clarifications 2026-11-26)
**Plan**: `plan.md` was not generated — tech context below was read directly from the codebase.
**Tests**: Not requested in the spec → no automated test tasks. Verification = `npm run lint`, `npm run build`, and the manual checks listed per story.

## Tech context (from codebase)

- React 18 + TypeScript, Vite, `react-router-dom` v7 (`createBrowserRouter` in `src/main.tsx`), `react-bootstrap`, `react-i18next` (`src/locales/{vi,en}/translation.json`), SCSS in `src/styles/global.scss`, icons from `react-icons`.
- Project data is static: `IProjectItem` + `PROJECTS` in `src/helpers/data.ts`.
- The same `<Project />` section (`src/components/sections/project/index.tsx`) renders on the home page (`src/pages/home.tsx`) and on `/project` (`src/pages/project.tsx`).
- Deep links already work in production: `vercel.json` rewrites every path to `/`.
- No new dependencies: use `useSearchParams` (filters in the URL), `<ScrollRestoration />` (scroll position on Back), native `loading="lazy"`, the `onError` image fallback, CSS `line-clamp`, and `@media (prefers-reduced-motion)`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: US1–US4 map to the user stories in spec.md

---

## Phase 1: Setup

- [X] T001 Run `npm run lint` and `npm run build` from the repo root and record any pre-existing errors, so that new regressions can be told apart from old ones (no file changes)

---

## Phase 2: Foundational (blocks all stories)

**Purpose**: data shape and translation keys shared by US1–US4.

- [X] T002 Extend `IProjectItem` in `src/helpers/data.ts`:
  - Add required `slug: string`. It must be unique, kebab-case ASCII, and is used in `/project/<slug>`.
  - Add optional fields: `period?: string`, `role?: { vi: string; en: string }`, `overview?: { vi: string; en: string }`, `features?: { vi: string[]; en: string[] }`, `outcomes?: { vi: string[]; en: string[] }`, `screenshots?: string[]` and `privateSource?: boolean`.
  - Make `githubLink` and `demoLink` optional (`?: string`).
  - Required per FR-001a: `title`, `description` (vi + en), `tags`, `imgPath`.
- [X] T003 Update the `PROJECTS` entries in `src/helpers/data.ts`:
  - Add slugs: `xcel-edtech`, `mobile-app-ecosystem`, `enterprise-cloud-hub`.
  - Remove every `githubLink`/`demoLink` that points to the generic profile `https://github.com/AnhHuynh1999` instead of the project itself (FR-009, SC-003). Keep `https://xcel.vn/` as Xcel's demo.
  - Do not invent the optional content fields; the owner fills them in later.
- [X] T004 [P] Add the new i18n keys under `project` in both `src/locales/vi/translation.json` and `src/locales/en/translation.json`:
  - `viewDetail` ("Xem chi tiết" / "View details"), `viewAll` ("Xem tất cả dự án" / "View all projects"), `back` ("Quay lại danh sách" / "Back to projects")
  - `notFound` ("Không tìm thấy dự án" / "Project not found")
  - `empty` ("Không có dự án phù hợp" / "No matching projects"), `clearFilters` ("Xóa bộ lọc" / "Clear filters")
  - `privateSource` ("Mã nguồn riêng tư" / "Private source")
  - `role`, `period`, `overview`, `features`, `outcomes`, `techStack`, `screenshots` (section headings in both languages)

**Checkpoint**: `npm run build` passes and the site still renders as before.

---

## Phase 3: User Story 1 – Xem chi tiết một dự án (P1) 🎯 MVP

**Goal**: each project has its own page at `/project/<slug>`. It shows only the fields that have data, and Back returns to the list with the same filters and scroll position.
**Independent test**: open `/project/xcel-edtech` directly, then switch the language to EN; the content changes language. Then open the list, scroll down, open a card, and press browser Back; the scroll position is restored. Open `/project/does-not-exist`; a not-found message and a link back are shown.

- [X] T005 [US1] Create `src/pages/project.detail.tsx`:
  - Read `slug` via `useParams` and find the project with `PROJECTS.find((p) => p.slug === slug)`.
  - If no project matches, render `t('project.notFound')` and a `<Link to='/project'>` back link.
  - Otherwise render, inside a react-bootstrap `<Container>`:
    - the title as `<h1>`, the category badge and the featured badge
    - the hero image (`imgPath`, with alt = title)
    - Optional sections, each rendered only when its field has data (FR-001a; no empty headings): `period`, `role`, `overview` (fall back to `description`), `features`, `outcomes`, `screenshots` (lazy-loaded `<img>` grid with descriptive alt).
    - the tech tags
    - the demo/source buttons
  - Text uses `field[lang] || field.vi`, the same fallback as `project.card.tsx`.
  - Reuse the existing classes `section-badge`, `tech-tag-pill`, `btn-glow-primary` and `btn-glass-secondary`.
- [X] T006 [US1] In `src/pages/project.detail.tsx`, set `document.title` to the project title in a `useEffect` (FR-002) and restore the previous title on unmount.
- [X] T007 [US1] Add a back control in `src/pages/project.detail.tsx`:
  - If `location.key !== 'default'` (the user came from inside the site), call `navigate(-1)`. The previous URL then keeps its filters and `<ScrollRestoration />` restores the scroll (FR-003).
  - Otherwise `navigate('/project')`.
- [X] T008 [US1] Register the route `{ path: '/project/:slug', element: <ProjectDetailPage /> }` next to `/project` in the `Layout` children in `src/main.tsx`.
- [X] T009 [US1] Add `<ScrollRestoration />` from `react-router-dom` inside `src/layout.tsx`, next to `<ScrollToTop />`. New pages then start at the top, and Back restores the old position.
- [X] T010 [US1] Link cards to their detail page in `src/components/sections/project/project.card.tsx`:
  - Wrap the title in `<Link to={`/project/${props.slug}`}>`.
  - Add a "View details" (`t('project.viewDetail')`) button-link to the same URL in `project-actions`.
  - Keep the external links as `<a target='_blank' rel='noreferrer'>`.
- [X] T011 [P] [US1] Add styles for the detail page (`.project-detail-*`: hero image, section spacing, screenshot grid of 1 column on mobile and 2 at ≥768px, and the back button) in `src/styles/global.scss`. Match the existing `project-modern-card` glass/glow look.

**Checkpoint**: US1 is fully usable on its own. This is the MVP.

---

## Phase 4: User Story 2 – Lọc theo danh mục / công nghệ (P2)

**Goal**: the category list comes from the data and shows counts. The user can filter by a single tech tag, and both filters live in the URL.
**Independent test**:
- Open `/project?category=Fullstack&tech=React`; only matching projects show.
- Reload the page; the filters persist.
- Open `/project?category=Foo`; the page shows as "All".
- Pick a combination with no results; the empty state and "Clear filters" appear.

- [X] T012 [US2] Replace `useState('all')` with `useSearchParams` in `src/components/sections/project/index.tsx` (FR-005a):
  - Read `category` and `tech`.
  - A `category` that is not in the derived category list is treated as `'all'`. A `tech` that is not in the union of all project `tags` is treated as unset.
  - Write filter changes with `setSearchParams(next, { replace: true })`. Filter clicks then don't pile up history entries, and Back from a detail page lands on the filtered list.
- [X] T013 [US2] In `src/components/sections/project/index.tsx`, derive the category tabs from `PROJECTS` (FR-004):
  - Build the list from the unique `category` values, in first-seen order.
  - Label each tab with `t('project.' + category.toLowerCase())` plus its count, e.g. `Fullstack (2)`.
  - The "All" tab shows the total count.
- [X] T014 [US2] Add the tech filter in `src/components/sections/project/index.tsx` (FR-005):
  - Show a row of tag pills built from the unique tags, sorted alphabetically.
  - Clicking a tag sets `tech`. Clicking the active tag clears it, and selecting another tag replaces it.
  - Results must match both the category and the tech filter.
- [X] T015 [US2] Make the tag pills inside each card clickable in `src/components/sections/project/project.card.tsx`. Turn them into `<button type='button'>`s that call a new optional prop `onTagClick?(tag)`. Pass the setter from `index.tsx`, and leave the pills inert when the prop is absent (e.g. on the home page).
- [X] T016 [US2] Add the empty state in `src/components/sections/project/index.tsx` (FR-006). When the filtered list is empty, render `t('project.empty')` and a "Clear filters" button (`t('project.clearFilters')`) that calls `setSearchParams({})`.
- [X] T017 [P] [US2] Add styles for the tech filter row (horizontal wrap, active state reusing `.filter-tab-btn.active` colors), tag buttons (reset the native button look so they keep the current `.tech-tag-pill` style) and the empty state in `src/styles/global.scss`.

**Checkpoint**: US2 works on `/project` without depending on US3 or US4.

---

## Phase 5: User Story 3 – Trang chủ chỉ hiện dự án nổi bật (P2)

**Goal**: the home page shows at most 3 featured projects, with no filters and a "View all projects" call to action. `/project` lists featured projects first.
**Independent test**: the home page shows ≤3 cards, no filter row and a "View all" link to `/project`. On `/project`, featured cards come first and carry a "Featured" badge.

- [X] T018 [US3] Add the prop `featuredOnly?: boolean` to `Project` in `src/components/sections/project/index.tsx`. When it is true:
  - Use `PROJECTS.filter((p) => p.featured).slice(0, 3)`, falling back to `PROJECTS.slice(0, 3)` when there are no featured projects.
  - Hide the category and tech filters and skip URL params entirely.
  - Render a `<Link to='/project'>` with `t('project.viewAll')` below the grid.
- [X] T019 [US3] Pass `featuredOnly` to the `<Project />` used in `src/pages/home.tsx`, in section 5, "Featured Projects".
- [X] T020 [US3] Sort the full list in `src/components/sections/project/index.tsx` (FR-008):
  - When `featuredOnly` is false, show featured projects first, then the rest.
  - Use a stable sort (`Array.prototype.sort` is stable), so each group keeps its declaration order.
- [X] T021 [US3] Show the featured badge in `src/components/sections/project/project.card.tsx`. When `props.featured`, render a `t('project.featured')` badge on the image wrapper, next to the existing `project-badge-tag`, and add its style in `src/styles/global.scss`.

**Checkpoint**: the home page is short; `/project` keeps full functionality.

---

## Phase 6: User Story 4 – Thẻ dự án rõ ràng, nhất quán (P3)

**Goal**: links are honest, broken images fall back cleanly, card heights are even, and cards respect reduced motion and keyboard use.
**Independent test**:
- A project with no `demoLink` shows no demo button.
- A project with `privateSource` shows a "Private source" label instead of a link.
- Point `imgPath` at a missing file; the fallback image shows.
- With OS reduce motion on, there is no hover zoom.
- Tab through the cards; the focus outline is visible.

- [X] T022 [US4] Show honest links in `src/components/sections/project/project.card.tsx` and `src/pages/project.detail.tsx` (FR-009):
  - Render the demo button only when `demoLink` is set.
  - Render the source button only when `githubLink` is set and `privateSource` is not true.
  - When `privateSource` is true, render a non-link label with `t('project.privateSource')`.
- [X] T023 [US4] Add an image fallback in `src/components/sections/project/project.card.tsx` and `src/pages/project.detail.tsx` (FR-010):
  - Add `loading='lazy'` to the images.
  - Add `onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback }}`, with `fallback` imported from the existing `src/assets/logo.png`.
- [X] T024 [P] [US4] Clamp the description and handle motion and focus in `src/styles/global.scss`:
  - Clamp `.project-desc` to 3 lines with `display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`.
  - Make `.project-modern-card` `height: 100%` so cards in a row are equal height.
  - Add `:focus-visible` outlines for card links, filter tabs and tag buttons.
  - Add `@media (prefers-reduced-motion: reduce)`, which disables the card and image hover transforms and transitions (FR-012).

**Checkpoint**: all four stories are complete.

---

## Phase 7: Polish & Cross-Cutting

- [X] T025 Run `npm run lint` and `npm run prettier`, then fix any new issues in the touched files (`src/helpers/data.ts`, `src/components/sections/project/*`, `src/pages/project.detail.tsx`, `src/main.tsx`, `src/layout.tsx`, `src/pages/home.tsx`, `src/styles/global.scss`, `src/locales/*/translation.json`).
- [X] T026 Run `npm run build`; it must pass with zero TypeScript errors (check that `githubLink`/`demoLink` are now optional everywhere they are read).
- [X] T027 Run the manual checks with `npm run dev`:
  - every story's "Independent test" above
  - the layout at widths 360px, 768px and 1280px: 1, 2 and 3 columns (FR-013)
  - VI/EN switching on both the list and a detail page; the filters and the current project stay put
- [X] T028 Do a keyboard-only pass over `/project` and `/project/xcel-edtech` (Tab, Enter, Space on tabs, tags, cards and back), and run a Lighthouse accessibility audit on both pages (SC-006).

---

## Dependencies

- Phase 1 → Phase 2 → stories. T002–T004 block every story.
- US1 (T005–T011) is independent; it is the MVP.
- US2 (T012–T017) and US3 (T018–T021) both edit `src/components/sections/project/index.tsx`. Do them one after the other (US2 first), not in parallel.
- US4 (T022–T023) touches `src/pages/project.detail.tsx`, so it runs after US1. T024 is CSS-only and can run any time after Phase 2.
- Phase 7 runs after the stories you plan to ship.

## Parallel opportunities

- T004 (locales) can run alongside T002–T003 (data.ts).
- In US1: T011 (SCSS) can run alongside T005–T010.
- In US2: T017 (SCSS) can run alongside T012–T016.
- T024 (SCSS) can run alongside any non-SCSS task after Phase 2. Several SCSS tasks touch `global.scss`, so append to the end of the project block to avoid merge conflicts.

## Implementation strategy

1. **MVP**: Phase 1 + 2 + US1 (T001–T011). Each project gets a shareable detail page, then ship it.
2. **Increment 2**: US2 filters plus US3 for the home page; together they give a better home page and a better project list.
3. **Increment 3**: US4 card polish, then Phase 7.
4. Fill in the optional content (`role`, `period`, `overview`, `features`, `outcomes`, `screenshots`) in `src/helpers/data.ts` at any time; the sections appear automatically.
