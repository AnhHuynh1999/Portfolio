# Contract: Bình Chọn (live poll)

## Pages

| Route | Who | Shows |
|-------|-----|-------|
| `/` | anyone | create form, "join by code" input, demo button, 90-day notice |
| `/p/{code}` | voter | question + options (radio) if not voted and open; otherwise live results with "your vote" marker; "closed" badge when closed. `noindex` not required (public by code) |
| `/m/{manageKey}` | presenter | big join code, QR (SVG) of `/p/{code}`, copy link, live results, Open/Close toggle. `noindex` |
| `/p/{unknown}`, `/m/{unknown}` | anyone | not-found page mentioning 90-day removal |

`{code}` is matched case-insensitively (uppercased before lookup).

## Server Actions

| Action | Input | Validation | Effect / Result |
|--------|-------|------------|-----------------|
| `createPoll(form)` | `question`, `options[]` (form lines) | FR-A1 limits, trimmed, empty lines dropped, duplicates (case-insensitive) rejected | insert poll → redirect `/m/{manageKey}`; errors returned `{ error, …values }` |
| `createDemo()` | — | — | poll "Bạn thích ngôn ngữ nào nhất?" with 4 options and ~12 seeded votes → redirect `/m/{manageKey}` |
| `setOpen(manageKey, open)` | boolean | key exists | update `is_open`, bump activity |

## JSON endpoint (polled every 1.5 s)

`GET /api/polls/{code}` → `200`

```json
{ "open": true, "total": 17, "counts": [5, 9, 3], "myVote": 1 }
```

- `myVote` is derived from the `vid` cookie (`null` if not voted).

`POST /api/polls/{code}` with `{ "option": i }` → casts a vote (implementation note: moved here from a server action so the client and the load test share one endpoint).

- Sets the httpOnly `vid` cookie if missing; `INSERT … ON CONFLICT DO NOTHING` (re-votes are ignored) and bumps `last_activity_at`.
- `200` → same JSON as GET; `400 {error:'invalid'}` when `i` is out of range; `409 {error:'closed'}` when closed; `404` unknown code.
- `404 { "error": "not_found" }` for unknown code.
- `Cache-Control: no-store`.

## Cron

`GET /api/cron/cleanup` with `Authorization: Bearer $CRON_SECRET` → `200 { "deleted": n }`; otherwise `401`.
Deletes polls where `last_activity_at < now() - interval '90 days'` (votes cascade). Scheduled daily in `vercel.json`.
