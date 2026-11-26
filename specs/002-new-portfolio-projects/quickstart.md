# Quickstart & Validation: Two New Portfolio Projects

## Prerequisites

- Node ≥ 22, npm. No database install (PGlite stores data in `./.pglite`).
- For deploy: GitHub repos `AnhHuynh1999/binh-chon` and `AnhHuynh1999/link-gon` (created by the user), Vercel projects with Neon connected, `CRON_SECRET` set.

## Run locally

```bash
cd D:/orca/binh-chon && npm install && npm test && npm run build && npx next start -p 3457
cd D:/orca/link-gon  && npm install && npm test && npm run build && npx next start -p 3458
```

## Validation scenarios

### Bình Chọn ([contract](./contracts/binh-chon.md))

1. Home → create "Ăn gì trưa nay?" with 3 options → lands on presenter page with 6-char code and QR. *(US1-AS1)*
2. Open `/p/{code}` in a second browser profile → vote → sees confirmation + results. Presenter tab shows the vote within 2 s without reload. *(AS2, AS3, SC-002)*
3. Reload the voter tab → shows "your vote" instead of the form; voting again via the API does not change `total`. *(AS4)*
4. Presenter closes the poll → voter page shows "closed" with final results; a vote attempt returns `closed`. *(AS5)*
5. Concurrency: send 50 votes with 50 distinct `vid` cookies in parallel (script in tasks) → `total` = 50 exactly. *(SC-002)*
6. Demo button → presenter page with seeded results. *(FR-A6)*

### Link Gọn ([contract](./contracts/link-gon.md))

1. Shorten `https://github.com/AnhHuynh1999` → get short + stats links. *(US2-AS1)*
2. Open the short link → interstitial shows `github.com`, continues after ~3 s; "Đi ngay" works. *(AS2, SC-005)*
3. Alias `portfolio` twice → second gives "alias taken"; alias `a_b` → invalid; URL `javascript:alert(1)` and a URL to the app itself → rejected. *(AS4, AS5)*
4. 20 normal visits (`curl -A "Mozilla/5.0 (iPhone…)"` etc.) + 5 with `-A "facebookexternalhit/1.1"` → stats total 20, filtered line 5, device split correct. *(SC-004)*
5. 11th link from the same visitor within an hour → "limit reached". *(FR-B5)*
6. Demo button → dashboard with 30-day chart filled. *(FR-B6)*

### Both

- At 375 px width: no horizontal scroll; light and dark themes readable. *(FR-S1)*
- `GET /api/cron/cleanup` without the secret → 401; with it → 200. Row with `last_activity_at` set to 91 days ago is deleted. *(FR-S6)*
- `npm test` passes in each repo. *(FR-S4)*

### Portfolio

- `npm run build` passes; `/project` lists both projects in VI and EN with demo + source links; detail pages render. *(US3, SC-007)*
