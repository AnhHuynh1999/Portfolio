# Tasks: Two New Portfolio Projects

**Input**: Design documents from `specs/002-new-portfolio-projects/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Requested by FR-S4 — one `node --test` file per app for core logic, written before the logic it covers.

**Paths**: relative to `D:\orca\`. `binh-chon/` and `link-gon/` are new repos; `Portfolio/update-ui/` is the existing portfolio. Reference implementation for conventions: `chia-tien/`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on unfinished tasks)
- **[Story]**: US1 = Bình Chọn, US2 = Link Gọn, US3 = portfolio entries

---

## Phase 1: Setup

**Purpose**: create both app skeletons (same toolchain as `chia-tien/`).

- [X] T001 [P] Create `binh-chon/` with `git init -b main`, `package.json` (`"type": "module"`, scripts `dev`/`build`/`start`/`test: node --test lib/*.test.ts`), deps `next@latest react@latest react-dom@latest @neondatabase/serverless @electric-sql/pglite qrcode`, dev deps `typescript@5 @types/react @types/react-dom @types/node @types/qrcode`; copy `tsconfig.json`, `next.config.ts` (serverExternalPackages: PGlite) and `.gitignore` from `chia-tien/`; set git user from `Portfolio/update-ui` config
- [X] T002 [P] Create `link-gon/` the same way as T001 but without `qrcode` / `@types/qrcode`

---

## Phase 2: Foundational (blocks the story phases of its own app)

- [X] T003 [P] Copy `chia-tien/lib/db.ts` to `binh-chon/lib/db.ts` and replace `SCHEMA` with tables `polls` (id serial PK; code text UNIQUE NOT NULL; manage_key text UNIQUE NOT NULL; question text NOT NULL; options text[] NOT NULL; is_open boolean NOT NULL DEFAULT true; created_at, last_activity_at timestamptz NOT NULL DEFAULT now()) and `votes` (poll_id int REFERENCES polls ON DELETE CASCADE; voter_id text; option_idx smallint NOT NULL; created_at timestamptz DEFAULT now(); PRIMARY KEY (poll_id, voter_id)) per data-model.md
- [X] T004 [P] Copy `chia-tien/lib/db.ts` to `link-gon/lib/db.ts` and replace `SCHEMA` with `links` (id serial PK; code text UNIQUE NOT NULL; url text NOT NULL; stats_key text UNIQUE NOT NULL; creator_hash text NULL; created_at, last_activity_at timestamptz NOT NULL DEFAULT now()) and `clicks` (id bigserial PK; link_id int REFERENCES links ON DELETE CASCADE; created_at timestamptz NOT NULL DEFAULT now(); referrer text NULL; device text NOT NULL; country text NULL; is_bot boolean NOT NULL) plus index `clicks (link_id, created_at)`
- [X] T005 [P] Create `binh-chon/app/layout.tsx` + `binh-chon/app/globals.css` from `chia-tien/app/` (brand "Bình Chọn", mark "✓", accent #6366f1 light / #818cf8 dark, footer link to `https://github.com/AnhHuynh1999/binh-chon`) and `binh-chon/app/not-found.tsx` mentioning that inactive polls are removed after 90 days
- [X] T006 [P] Create `link-gon/app/layout.tsx` + `link-gon/app/globals.css` from `chia-tien/app/` (brand "Link Gọn", mark "↗", accent #0ea5e9 light / #38bdf8 dark, footer link to `https://github.com/AnhHuynh1999/link-gon`) and `link-gon/app/not-found.tsx` mentioning the 90-day removal

**Checkpoint**: each app builds (`npm run build`) with an empty home page.

---

## Phase 3: User Story 1 — Live poll (Priority: P1) 🎯 MVP

**Goal**: create a poll, vote once per browser, results update on every screen ≤ 2 s.
**Independent Test**: quickstart.md → "Bình Chọn" scenarios 1–6.

### Tests (write first, must fail)

- [X] T007 [US1] Write `binh-chon/lib/logic.test.ts` covering: `newJoinCode()` returns 6 chars from `ABCDEFGHJKMNPQRSTUVWXYZ23456789`; `parsePollInput(question, optionsText)` enforces question 1–200 chars, 2–6 options of 1–80 chars, trims, drops empty lines, rejects case-insensitive duplicates; `tally(optionCount, rows)` returns zero-filled `counts`, `total`, and `percents` that are 0 when total is 0

### Implementation

- [X] T008 [US1] Implement `newJoinCode`, `parsePollInput`, `tally` in `binh-chon/lib/logic.ts` until T007 passes (`npm test`)
- [X] T009 [US1] Implement `binh-chon/lib/polls.ts`: `createPoll(question, options)` (retry ≤ 5 on code collision; manage_key = randomBytes(16) base64url), `getPollByCode(code)` (uppercase lookup), `getPollByKey(key)`, `results(pollId, voterId?)` → `{open,total,counts,myVote}`, `castVote(pollId, voterId, idx)` (`INSERT … ON CONFLICT DO NOTHING` + bump `last_activity_at`), `setOpen(key, open)`, `deleteInactive()` (`last_activity_at < now() - interval '90 days'`)
- [X] T010 [US1] Implement `binh-chon/app/actions.ts`: `createPollAction` (validate via `parsePollInput`, return `{error, question, options}` on failure, redirect `/m/{manageKey}` on success) and `createDemoAction` (poll "Bạn thích ngôn ngữ lập trình nào nhất?" with TypeScript/Python/Go/Rust and ~12 seeded votes using random voter ids)
- [X] T011 [US1] Implement `binh-chon/app/page.tsx` + `binh-chon/app/home-client.tsx`: hero, create form (question input, options textarea one-per-line, `useActionState`, values kept on error), "join by code" form navigating to `/p/{CODE}`, demo button, note "Bình chọn không có hoạt động trong 90 ngày sẽ tự xóa"
- [X] T012 [US1] Implement `binh-chon/app/api/polls/[code]/route.ts`: `GET` → `results()` JSON with `Cache-Control: no-store`, `myVote` from `vid` cookie, `404 {error:'not_found'}`
- [X] T013 [US1] Implement `binh-chon/app/p/[code]/live.tsx` (client): `useLiveResults(code, initial)` polling the endpoint every 1.5 s while `document.visibilityState === 'visible'`, refetch immediately on `visibilitychange` to visible, skip state update when `total` and `open` unchanged; `<ResultBars>` showing option, count, percent bar, "Bạn chọn" marker, `aria-live="polite"` total
- [X] T014 [US1] Implement `binh-chon/app/p/[code]/actions.ts` `voteAction(code, idx)`: read/set httpOnly `vid` cookie (randomBytes(16), 1 year, sameSite lax), reject if poll closed or `idx` outside `0 ≤ idx < options.length`, call `castVote`, return fresh results
- [X] T015 [US1] Implement `binh-chon/app/p/[code]/page.tsx`: server-renders poll; if open and no `myVote` → radio list + "Bình chọn" button (client form calling `voteAction`, then switches to results); else live results; "Đã đóng" badge when closed; `notFound()` for unknown code
- [X] T016 [US1] Implement `binh-chon/app/m/[key]/page.tsx` + `binh-chon/app/m/[key]/actions.ts`: presenter screen with large join code, QR via `qrcode.toString(joinUrl, {type:'svg', margin:1})` inlined, copy-link button, live results (reuse `live.tsx`), Open/Close toggle calling `setOpenAction`; `robots: noindex`; remember poll in localStorage like `chia-tien/app/recent.ts`
- [X] T017 [US1] Implement `binh-chon/app/api/cron/cleanup/route.ts` (401 unless `Authorization: Bearer ${process.env.CRON_SECRET}`; calls `deleteInactive()`; returns `{deleted}`) and `binh-chon/vercel.json` with cron `{"path":"/api/cron/cleanup","schedule":"0 3 * * *"}`
- [X] T018 [US1] Write `binh-chon/scripts/load-test.mjs`: given a base URL and poll code, sends 50 parallel votes with 50 distinct `vid` cookies and asserts the JSON endpoint reports `total === 50` (SC-002)
- [X] T019 [US1] Write `binh-chon/README.md` (what it is, features, stack, run locally, deploy: Neon + `CRON_SECRET`)
- [X] T020 [US1] Verify locally per quickstart.md (two browser contexts, 375 px, dark mode, load test), fix issues, commit; ask user to create repo `AnhHuynh1999/binh-chon`, push, user imports to Vercel + connects Neon + sets `CRON_SECRET`; verify the deployed demo

**Checkpoint**: Bình Chọn live and working on its own.

---

## Phase 4: User Story 2 — Link shortener with analytics (Priority: P2)

**Goal**: short links with interstitial, private stats of human clicks.
**Independent Test**: quickstart.md → "Link Gọn" scenarios 1–6.

### Tests (write first, must fail)

- [X] T021 [US2] Write `link-gon/lib/logic.test.ts` covering: `validateUrl(input, ownHost)` (accepts http/https ≤ 2048 chars; rejects `javascript:`, `ftp:`, garbage, own host); `validateAlias(a)` (`^[a-z0-9-]{3,30}$` after lowercasing, no leading/trailing `-`, rejects reserved `api`, `s`, `_next`, `favicon.ico`, `robots.txt`); `classifyAgent(ua)` (bot for empty UA, `facebookexternalhit/1.1`, `Zalo`, `TelegramBot`, `Slackbot`, `curl/8`; device mobile for iPhone/Android Mobile, tablet for iPad, desktop for Windows Chrome); `refHost(referer)` (strips `www.`, null when missing/invalid); `fillDays(rows, today, 30)` returns 30 consecutive dates with zeros where missing

### Implementation

- [X] T022 [US2] Implement `validateUrl`, `validateAlias`, `classifyAgent`, `refHost`, `fillDays`, `randomCode()` (6 chars `[a-z0-9]`) in `link-gon/lib/logic.ts` until T021 passes
- [X] T023 [US2] Implement `link-gon/lib/links.ts`: `createLink(url, code|null, creatorHash|null)` (random code with retry ≤ 5; alias taken → typed error), `recentCount(creatorHash)` (last hour), `getByCode`, `recordClick(linkId, {referrer, device, country, isBot})` (+ bump `last_activity_at`), `stats(statsKey)` → `{link, total, filtered, days[30], referrers[5], devices[], countries[5]}` using human clicks only, `deleteInactive()`
- [X] T024 [US2] Implement `link-gon/app/actions.ts`: `createLinkAction` (own host from `headers()`, `creator_hash = sha256(ip + (CREATOR_SALT ?? CRON_SECRET ?? 'dev'))[0..16]` from first `x-forwarded-for`, reject when `recentCount ≥ 10` with "Bạn đã tạo 10 link trong 1 giờ qua…", map each validation error to a Vietnamese message, return `{shortUrl, statsUrl}`) and `createDemoAction` (link to `https://github.com/AnhHuynh1999/link-gon`, ~150 human clicks spread over 30 days with weighted referrers facebook.com/zalo.me/google.com/direct, devices, countries VN/US/JP/SG, plus 10 bot clicks; redirect `/s/{statsKey}`)
- [X] T025 [US2] Implement `link-gon/app/page.tsx` + `link-gon/app/home-client.tsx`: URL input, optional alias input with live preview `{host}/{alias}`, submit with `useActionState`, result card with short + stats links and copy buttons, warning "Lưu lại link thống kê — không thể khôi phục", demo button, 90-day note
- [X] T026 [US2] Implement `link-gon/app/[code]/route.ts`: lowercase code, unknown → 404 HTML; else `classifyAgent(user-agent)`, `refHost(referer)`, country `x-vercel-ip-country`, `recordClick`, return HTML interstitial (destination hostname large, full URL small and escaped, `<meta http-equiv="refresh" content="3;url=…">`, "Đi ngay" link, `<meta name="robots" content="noindex">`, headers `Referrer-Policy: no-referrer`, `Cache-Control: no-store`), styled inline with light/dark
- [X] T027 [US2] Implement `link-gon/app/s/[key]/page.tsx` + `link-gon/app/s/[key]/charts.tsx`: total human clicks, short link with copy, 30-day SVG column chart (each bar has `<title>` with date and count, plus visually hidden table), horizontal bar lists for top referrers ("Trực tiếp" for null), devices (Điện thoại/Máy tính bảng/Máy tính), countries (name via `Intl.DisplayNames('vi', {type:'region'})`, "Không rõ" for null), line "Đã lọc N lượt từ bot/preview"; `robots: noindex`; `notFound()` for unknown key
- [X] T028 [US2] Implement `link-gon/app/api/cron/cleanup/route.ts` + `link-gon/vercel.json` exactly like T017
- [X] T029 [US2] Write `link-gon/README.md`
- [X] T030 [US2] Verify locally per quickstart.md (curl with mobile/bot user agents → 20 human + 5 filtered, alias and URL errors, 11th-link limit, 375 px, dark), fix issues, commit; user creates repo `AnhHuynh1999/link-gon`, push, Vercel + Neon + `CRON_SECRET`; verify the deployed demo

**Checkpoint**: Link Gọn live and working on its own.

---

## Phase 5: User Story 3 — Portfolio entries (Priority: P3)

**Goal**: both projects listed with covers, VI/EN content, demo and source links.
**Independent Test**: quickstart.md → "Portfolio".

- [X] T031 [P] [US3] Create cover `Portfolio/update-ui/src/assets/project/binh-chon.svg` (1280×720, style of `chia-tien.svg`: join code card + live result bars, content inside `<g transform="translate(0 -90)">`, no title text)
- [X] T032 [P] [US3] Create cover `Portfolio/update-ui/src/assets/project/link-gon.svg` (same style: short link card + 30-day column chart)
- [X] T033 [US3] Add entries id 12 (`slug: 'binh-chon'`) and id 13 (`slug: 'link-gon'`) to `PROJECTS` in `Portfolio/update-ui/src/helpers/data.ts`, category `Fullstack`, `period: '2026'`, tags, `githubLink`, `demoLink` (deployed URLs from T020/T030), bilingual `description`, `role`, `overview`, `features`; import both covers
- [X] T034 [US3] Run `npx prettier --write src/helpers/data.ts`, `npx tsc --noEmit`, `npm run build` in `Portfolio/update-ui`; check `/project` and both detail pages in VI/EN in the browser; commit and push `HEAD:main`

---

## Phase 6: Polish & Cross-Cutting

- [X] T035 [P] Lighthouse accessibility ≥ 95 on the home page and main screen of both deployed apps; fix contrast/label issues
- [X] T036 [P] Hit `/api/cron/cleanup` on both deployments without the secret (expect 401); locally set one row's `last_activity_at` to 91 days ago and confirm the endpoint deletes it (FR-S6)
- [X] T037 Mark all tasks `[X]` in `specs/002-new-portfolio-projects/tasks.md` and commit the spec folder to the portfolio repo

---

## Dependencies & Execution Order

- **Setup (T001–T002)** → **Foundational** per app (T003, T005 for Bình Chọn; T004, T006 for Link Gọn).
- **US1 (T007–T020)** depends only on T001, T003, T005.
- **US2 (T021–T030)** depends only on T002, T004, T006 — independent of US1 and can run in parallel with it.
- **US3 (T031–T034)**: T031/T032 anytime; T033–T034 need the deployed URLs from T020 and T030.
- **Polish** after the stories it touches.
- Within a story: test file → logic → data layer → actions/endpoints → pages → verify/deploy.
- User-dependent steps (repo creation, Vercel import, Neon, `CRON_SECRET`) sit inside T020 and T030.

## Parallel Opportunities

```text
# Setup & foundation, both apps at once
T001 ‖ T002,  then  T003 ‖ T004 ‖ T005 ‖ T006

# Whole stories in parallel (different repos)
US1 (T007…T020)  ‖  US2 (T021…T030)

# Portfolio covers while apps are being built
T031 ‖ T032
```

## Implementation Strategy

1. **MVP = US1 (Bình Chọn)**: Setup + Foundational for `binh-chon/`, then T007–T020. Stop and validate the deploy — the real-time demo is the highest-value addition.
2. **Increment 2 = US2 (Link Gọn)**: T002, T004, T006, T021–T030.
3. **Increment 3 = US3**: covers and portfolio entries once both demo URLs exist; one portfolio push for both projects.
4. Polish last.
