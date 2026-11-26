# Contract: Link Gọn (link shortener + analytics)

## Pages / handlers

| Route | Who | Behaviour |
|-------|-----|-----------|
| `/` | anyone | URL input, optional alias, demo button, 90-day + "stats link cannot be recovered" notice. After create: short link + stats link with copy buttons |
| `/{code}` (Route Handler) | anyone | unknown → `404` HTML page. Known → record click (R6), bump activity, return `200` HTML interstitial: destination **domain** prominent, full URL small, `meta refresh 3s`, "Đi ngay" link, `noindex`, `Referrer-Policy: no-referrer`, `Cache-Control: no-store` |
| `/s/{statsKey}` | owner | total human clicks, 30-day column chart, top 5 referrers / devices / countries, "Đã lọc N lượt từ bot/preview", link to the short URL. `noindex` |

## Server Actions

| Action | Input | Validation | Effect / Result |
|--------|-------|------------|-----------------|
| `createLink(form)` | `url`, `alias?` | URL parses, `http:`/`https:`, ≤ 2048 chars, host ≠ own host; alias `^[a-z0-9-]{3,30}$` (lowercased), no leading/trailing `-`, not reserved, not taken; rate limit 10/hour per `creator_hash` | insert → return `{ shortUrl, statsUrl }`; errors `{ error, …values }` with specific messages (invalid URL, self link, alias taken, alias invalid, limit reached) |
| `createDemo()` | — | exempt from rate limit | link to the project's GitHub repo with ~150 seeded clicks spread over 30 days (mixed referrers/devices/countries) + ~10 bot visits → redirect `/s/{statsKey}` |

## Cron

`GET /api/cron/cleanup` with `Authorization: Bearer $CRON_SECRET` → `200 { "deleted": n }`; otherwise `401`.
Deletes links where `last_activity_at < now() - interval '90 days'` (clicks cascade).

## Environment

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` / `POSTGRES_URL` | Neon (set by Vercel integration) |
| `CRON_SECRET` | set by user in Vercel; Vercel Cron sends it as Bearer token |
| `CREATOR_SALT` | optional; salt for `creator_hash` (falls back to `CRON_SECRET`) |
