# Data Model: Portfolio UI & Feature Upgrade

No database. Static data lives in `src/helpers/data.ts`; transient data lives in requests or the browser.

## ContactMessage (request body of `POST /api/contact`)

| Field | Type | Rule |
|---|---|---|
| name | string | required, trimmed, 1–100 chars |
| email | string | required, ≤ 254 chars, matches `^[^\s@]+@[^\s@]+\.[^\s@]+$` |
| subject | string | optional, ≤ 150 chars |
| message | string | required, trimmed, 1–5,000 chars |
| website | string | honeypot. Must be empty; when non-empty the server reports 200 but sends nothing |

The client and the server use the same `validateContact(input) → { ok: true, value } | { ok: false, errors: { [field]: code } }`. Error codes: `required`, `invalid`, `tooLong`. The UI maps each code to a translated message.

## ITestimonial (`TESTIMONIALS` in data.ts)

| Field | Type | Rule |
|---|---|---|
| id | number | unique |
| name | string | required |
| role | `TI18n` | role/company, vi + en |
| relation | `'teammate' \| 'manager' \| 'client' \| 'mentor'` | translated label |
| quote | `TI18n` | required, vi + en |
| avatar | string? | image import; falls back to initials |
| link | string? | profile URL, opens in a new tab |

`TESTIMONIALS.length === 0` hides the section and its palette entry.

## RepoSummary (derived from the GitHub response, cached in sessionStorage `gh:repos` with a timestamp)

| Field | Source |
|---|---|
| name | `name` |
| description | `description` (omitted if null) |
| language | `language` (omitted if null) |
| stars | `stargazers_count` |
| pushedAt | `pushed_at` (shown relative, localized with `Intl.RelativeTimeFormat`) |
| url | `html_url` |

Filter: `!fork`, sorted by `pushed_at` descending, first 6 kept. The cache is used when younger than 3,600 s.

## PaletteItem (built at runtime from routes, `PROJECTS` and actions)

| Field | Type |
|---|---|
| id | string |
| group | `'page' \| 'project' \| 'action'` |
| label | string (current language) |
| keywords | string[] (tags, slug, category) |
| run | `() => void` (navigate / copy email / toggle theme / switch language / open CV) |

Items whose source is unavailable are dropped: the CV action when `CV_LINK` is empty, and the testimonials page anchor when there are none.
