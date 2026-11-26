# Implementation Plan: Two New Portfolio Projects

**Branch**: `update-ui` (portfolio) + `main` in two new repos | **Date**: 2026-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-new-portfolio-projects/spec.md`

## Summary

Build two small, original, deployable web apps and list them in the portfolio:

- **Bình Chọn** (`binh-chon` repo) — live polls: create a poll, share a 6-character code/QR, audience votes once per browser, results refresh on every screen within 2 s.
- **Link Gọn** (`link-gon` repo) — link shortener with analytics: short link → interstitial page (destination domain, 3 s auto-continue) → destination; private stats dashboard of human clicks with bot/preview visits filtered.

Both reuse the proven *Chia Tiền* architecture (Next.js App Router + Server Actions + plain SQL on Neon/PGlite, no accounts, capability links). Live updates use lightweight polling of a tiny JSON endpoint (see [research.md](./research.md) R1). The portfolio gets two new entries with covers.

## Technical Context

**Language/Version**: TypeScript 5.9, Node 26 (local), Node LTS on Vercel
**Primary Dependencies**: Next.js 16, React 19, `@neondatabase/serverless`, `@electric-sql/pglite` (local dev DB), `qrcode` (Bình Chọn only)
**Storage**: PostgreSQL — Neon in production, PGlite (WASM Postgres in `./.pglite`) locally
**Testing**: `node --test` on pure logic modules (no framework); manual E2E via browser per [quickstart.md](./quickstart.md)
**Target Platform**: Vercel (serverless functions + daily Cron), modern mobile & desktop browsers
**Project Type**: Two independent web applications + one data update in the existing portfolio SPA
**Performance Goals**: results visible on all screens ≤ 2 s after a vote (SC-002); interstitial page ≤ 1 s (SC-005)
**Constraints**: free tiers (Vercel Hobby, Neon free); no WebSocket server; no user accounts; no new chart or UI libraries
**Scale/Scope**: portfolio traffic — tens of concurrent voters per poll, hundreds of clicks per link

## Constitution Check

*No `.specify/memory/constitution.md` exists. Gates below are the conventions established by previous work in this repo and *Chia Tiền*.*

| Gate | Status |
|------|--------|
| Fewest dependencies — only add one when a few lines cannot do it (`qrcode` justified: QR encoding is non-trivial) | ✅ |
| Validate all input at the trust boundary (server actions / route handlers) | ✅ planned per contract |
| Core logic has one runnable test file (`node --test`) | ✅ planned |
| Accessible, responsive at 375 px, light/dark | ✅ FR-S1 |
| Private capability links are unguessable and `noindex` | ✅ FR-S2 |
| Portfolio data stays static in `src/helpers/data.ts`, bilingual | ✅ FR-S5 |

Post-design re-check: ✅ no violations; no Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-new-portfolio-projects/
├── plan.md              # This file
├── research.md          # Phase 0 decisions
├── data-model.md        # Phase 1 entities & SQL
├── quickstart.md        # Phase 1 validation guide
├── contracts/
│   ├── binh-chon.md     # routes, actions, JSON endpoint
│   └── link-gon.md      # routes, actions, cron endpoint
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code

```text
D:\orca\binh-chon\                 # new repo AnhHuynh1999/binh-chon
├── app/
│   ├── page.tsx                   # create poll + demo button
│   ├── actions.ts                 # createPoll, createDemo
│   ├── p/[code]/page.tsx          # vote page (voter) + results after voting
│   ├── p/[code]/actions.ts        # vote
│   ├── p/[code]/live.tsx          # client: polling results view
│   ├── m/[key]/page.tsx           # presenter screen: big code, QR, live results, open/close
│   ├── m/[key]/actions.ts         # setOpen
│   ├── api/polls/[code]/route.ts  # GET results JSON (polled)
│   └── api/cron/cleanup/route.ts  # daily 90-day cleanup
├── lib/db.ts  lib/polls.ts  lib/logic.ts  lib/logic.test.ts
└── vercel.json                    # cron schedule

D:\orca\link-gon\                  # new repo AnhHuynh1999/link-gon
├── app/
│   ├── page.tsx                   # shorten form + demo button
│   ├── actions.ts                 # createLink, createDemo
│   ├── [code]/route.ts            # record click + interstitial HTML
│   ├── s/[key]/page.tsx           # stats dashboard (SVG charts)
│   └── api/cron/cleanup/route.ts
├── lib/db.ts  lib/links.ts  lib/logic.ts  lib/logic.test.ts
└── vercel.json

D:\orca\Portfolio\update-ui\       # existing portfolio
├── src/helpers/data.ts            # +2 IProjectItem entries
└── src/assets/project/binh-chon.svg, link-gon.svg
```

**Structure Decision**: two separate repositories (each project stands alone on GitHub and Vercel, matching how the portfolio links projects), each a single Next.js app. `lib/db.ts` is copied from *Chia Tiền* rather than shared — two repos, ~50 lines, no package worth publishing.

## Delivery Order

1. Bình Chọn (P1) → local verify → user creates repo + Vercel project + Neon → deploy verify.
2. Link Gọn (P2) → same.
3. Portfolio entries (P3) → build → push to `main`.

## Complexity Tracking

None.
