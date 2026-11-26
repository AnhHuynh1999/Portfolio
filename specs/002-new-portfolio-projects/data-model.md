# Data Model: Two New Portfolio Projects

All tables are created idempotently at first connection (see research R10). Times are `timestamptz`.

## Bình Chọn

### polls

| Field | Type | Rules |
|-------|------|-------|
| id | serial PK | |
| code | text UNIQUE | 6 chars, alphabet in research R3 |
| manage_key | text UNIQUE | 128-bit base64url, only in presenter link |
| question | text | 1–200 chars (FR-A1) |
| options | text[] | 2–6 items, each 1–80 chars, trimmed, non-empty |
| is_open | boolean | default `true` |
| created_at | timestamptz | default `now()` |
| last_activity_at | timestamptz | default `now()`; bumped on vote and open/close |

### votes

| Field | Type | Rules |
|-------|------|-------|
| poll_id | int FK → polls ON DELETE CASCADE | |
| voter_id | text | value of `vid` cookie |
| option_idx | smallint | `0 ≤ option_idx < cardinality(options)` (checked in action) |
| created_at | timestamptz | |
| | PK (poll_id, voter_id) | one vote per browser (FR-A3, R2) |

**State**: `open ⇄ closed` (only via manage key, FR-A5). Votes are rejected while closed. Deleted after 90 days without activity (FR-S6).

**Derived**: `counts[i] = count(*) WHERE option_idx = i`; `percent[i] = round(counts[i] / total * 100)` with 0 when total = 0.

## Link Gọn

### links

| Field | Type | Rules |
|-------|------|-------|
| id | serial PK | |
| code | text UNIQUE | random 6 chars `[a-z0-9]`, or custom alias `^[a-z0-9-]{3,30}$` lowercased, not starting/ending with `-`, not reserved (`api`, `s`, `_next`, `favicon.ico`, `robots.txt`) |
| url | text | http/https only, ≤ 2048 chars, host ≠ the app's own host (FR-B5) |
| stats_key | text UNIQUE | 128-bit base64url |
| creator_hash | text NULL | sha256(ip+salt)[0..16]; NULL for demo links (R7) |
| created_at | timestamptz | |
| last_activity_at | timestamptz | bumped on each click |

### clicks

| Field | Type | Rules |
|-------|------|-------|
| id | bigserial PK | |
| link_id | int FK → links ON DELETE CASCADE | indexed with created_at |
| created_at | timestamptz | |
| referrer | text NULL | hostname only |
| device | text | `mobile` \| `tablet` \| `desktop` |
| country | text NULL | ISO-2 |
| is_bot | boolean | R6 |

**Derived (human clicks only, `is_bot = false`)**: total; per day for the last 30 days (zero-filled); top 5 referrers / devices / countries. Separately: `filtered = count(*) WHERE is_bot`.

**Lifecycle**: created → clicked (activity) → deleted after 90 days without clicks (FR-S6).

## Portfolio

`IProjectItem` (existing, `src/helpers/data.ts`) — two new entries, ids 12 and 13, category `Fullstack`, with `githubLink`, `demoLink`, bilingual `description` / `features` / `overview`, `role`, `period: '2026'`, cover SVGs.
