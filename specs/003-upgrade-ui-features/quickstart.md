# Quickstart: Validate the UI & Feature Upgrade

## Prerequisites

- `npm install`
- For the contact form: a free Resend account. In Vercel → Project → Settings → Environment Variables, set `RESEND_API_KEY` and `CONTACT_TO` (the email the Resend account signed up with).
- Locally, `vercel dev` runs the `/api` function. Plain `npm run dev` serves only the SPA, so the form shows its error state there.

## Checks

| # | Scenario | Steps | Expected |
|---|---|---|---|
| 1 | Helpers | `node --test src/helpers/*.test.ts` | all pass |
| 2 | Build | `npm run build` | succeeds; `dist/project/chia-tien/index.html` contains `og:title` "Chia Tiền" |
| 3 | Contact happy path (US1) | on the deployment, send a message | mail arrives within 1 min; Reply goes to the sender; form shows success |
| 4 | Contact validation | empty name, `a@b`, 5,001-char message | per-field errors in the current language; nothing sent |
| 5 | Contact failure | DevTools → block `/api/contact`, then Send | error shown, text kept, copy-email offered |
| 6 | Spam | `curl` 4 valid POSTs within 10 min; one POST with `website` filled | 4th → 429; the honeypot one returns 200 but no mail arrives |
| 7 | Not configured | preview deploy without env | 503 → error state, never success |
| 8 | Palette (US4) | Ctrl+K → type `chia tien` → Enter | Chia Tiền detail opens; Esc closes and restores focus; works on a phone via the header button |
| 9 | GitHub (US6) | load Home, scroll to the section | ≤ 6 non-fork repos, newest push first; block `api.github.com` → fallback link, no other errors |
| 10 | Testimonials (US5) | `TESTIMONIALS = []` → no section; add 3 → shown in vi/en, initials when there is no avatar | |
| 11 | Titles/lang (US3) | navigate Home → Projects → About; switch language; reload | tab title changes; `<html lang>` follows; language survives the reload |
| 12 | Previews | paste home and one project URL into opengraph.xyz or the Facebook Sharing Debugger | title, description and image shown |
| 13 | 404 (US7) | `/abc`, `/project/abc` | not-found screen with Home and Projects links |
| 14 | Style (US2) | every page at 375 / 1440 px, light and dark; OS reduced motion on | no horizontal scroll; consistent headings and cards; animations stop |
| 15 | Audit | Lighthouse mobile on `/`, `/project`, one detail page, `/about` | Perf ≥ 85, A11y ≥ 95, SEO ≥ 95 |
| 16 | Regression | theme toggle, project filters, detail Back, copy email | unchanged |
