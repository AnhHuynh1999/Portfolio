# Research: Two New Portfolio Projects

## R1 — Live result updates on serverless hosting

- **Decision**: Client polls `GET /api/polls/[code]` every 1.5 s while the tab is visible (pauses on `visibilitychange`, resumes immediately on focus). Response is tiny (`{open, total, counts[]}`) and the client skips re-render when `total` and `open` are unchanged. The voter's own vote updates their screen immediately from the action result.
- **Rationale**: Meets "≤ 2 s on every screen" (SC-002) with zero extra infrastructure. Vercel functions cannot hold WebSockets, and Neon's HTTP driver has no `LISTEN/NOTIFY`. At portfolio scale (≤ ~50 viewers) this is ~35 cheap requests/s at peak, well within free tiers.
- **Alternatives considered**:
  - *Server-Sent Events from a route handler that polls the DB*: same DB load, but keeps a function alive per viewer (billed duration, 300 s limit, reconnect logic). No user-visible gain.
  - *Hosted realtime (Ably / Pusher / Supabase Realtime)*: true push, but another account + secret for the user to manage. Documented as the upgrade path if a poll needs hundreds of viewers.
  - *Separate WebSocket server (Socket.IO on Render/Fly)*: second deployment, cold starts on free tiers.

## R2 — One vote per browser, no lost or double votes

- **Decision**: An httpOnly cookie `vid` (random 16 bytes, 1 year) identifies the voter. `votes` has `PRIMARY KEY (poll_id, voter_id)`; insert uses `ON CONFLICT DO NOTHING`. Counts come from `GROUP BY option_idx` — no counters to race on.
- **Rationale**: The database guarantees exactly-once per voter under concurrency (SC-002). Cookie is a convenience limit, as the spec accepts.
- **Alternatives**: localStorage flag (trivially bypassed, can't be enforced server-side); IP-based (breaks for a classroom behind one NAT).

## R3 — Join codes and capability keys

- **Decision**: Join code = 6 chars from `ABCDEFGHJKMNPQRSTUVWXYZ23456789` (no 0/O/1/I/L), uppercase, unique constraint, regenerate on collision (≤ 5 tries). Manage key / stats key = `randomBytes(16).toString('base64url')`.
- **Rationale**: 31⁶ ≈ 887 M codes — easy to read aloud, collision-safe at this scale. Keys have 128 bits so links can't be guessed.

## R4 — QR code

- **Decision**: `qrcode` package, `toString(url, { type: 'svg' })` on the server, inlined into the presenter page.
- **Rationale**: QR encoding (Reed–Solomon, masking) is not a few-lines job; this is a small, dependency-free, widely used package. Server-side SVG needs no client JS.

## R5 — Interstitial and click recording

- **Decision**: `app/[code]/route.ts` (Route Handler) records the click, then returns a small self-contained HTML page: destination domain in large type, `<meta http-equiv="refresh" content="3;url=…">`, a "Đi ngay" link, `noindex`, `Referrer-Policy: no-referrer`. Unknown code → 404 HTML.
- **Rationale**: Fast (no React render, SC-005), works without JS, and a Route Handler is the right place for a side effect on GET. Showing the domain is the anti-phishing measure chosen in clarification.

## R6 — Bot / preview detection, device type, country, referrer

- **Decision**:
  - Bot: case-insensitive user-agent match on `bot|crawl|spider|slurp|preview|facebookexternalhit|zalo|whatsapp|telegram|slack|discord|skype|curl|wget|python|headless|vercel-screenshot` or an empty UA → stored with `is_bot = true`.
  - Device: `ipad|tablet` → tablet; `mobi|android|iphone` → mobile; else desktop.
  - Country: Vercel `x-vercel-ip-country` header (ISO-2); missing → `null` shown as "Không rõ".
  - Referrer: hostname of `Referer`, `www.` stripped; missing → "Trực tiếp".
- **Rationale**: A regex covers the previews that matter (chat apps in VN: Zalo, Messenger/Facebook, Telegram). No IPs or full UAs stored (privacy assumption in spec).
- **Alternatives**: UA-parsing library (adds weight for 3 buckets); `isbot` package (bigger list, but another dependency — upgrade path if false positives/negatives appear).

## R7 — Rate limit: 10 links per visitor per hour

- **Decision**: `creator_hash = sha256(ip + CREATOR_SALT)` (first 16 hex chars) stored on each link; on create, `SELECT count(*) … WHERE creator_hash = $1 AND created_at > now() - interval '1 hour'`. IP from `x-forwarded-for` (first entry). Demo links are exempt.
- **Rationale**: No extra store (Redis) needed; hashed so raw IPs are never stored.

## R8 — 90-day inactivity cleanup

- **Decision**: `last_activity_at` column on `polls` and `links`, bumped on vote/click/open-close. Vercel Cron (`vercel.json`, daily `0 3 * * *`) calls `/api/cron/cleanup`, authorised by `Authorization: Bearer $CRON_SECRET` (Vercel sends it automatically). Child rows go via `ON DELETE CASCADE`.
- **Rationale**: Hobby plan supports daily crons; one DELETE statement per app.

## R9 — Charts on the stats page

- **Decision**: Hand-written inline SVG: 30-day column chart + horizontal bar lists for referrers/devices/countries. Daily series is filled for days with zero clicks in SQL (`generate_series`).
- **Rationale**: Four simple charts don't justify a chart library; SVG stays crisp, themeable via CSS variables, and accessible with `<title>` per bar plus a visually hidden table.

## R10 — Shared conventions with Chia Tiền

- Copy `lib/db.ts` (Neon in prod via `DATABASE_URL`/`POSTGRES_URL`, PGlite locally, idempotent DDL, fail clearly on Vercel without a DB).
- Same visual language (CSS tokens, light/dark), Vietnamese UI, `node --test` for logic.
