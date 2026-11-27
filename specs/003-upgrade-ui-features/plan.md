# Implementation Plan: Portfolio UI & Feature Upgrade

**Branch**: `update-ui` | **Date**: 2026-11-27 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/003-upgrade-ui-features/spec.md`

## Summary

Make the contact form actually deliver mail, using one Vercel Function that validates and forwards the message to Resend. Unify the existing glass/aurora style through the tokens that already exist in `global.scss`. Add per-page titles, a persisted language and `<html lang>`, build-time link-preview HTML for every route, a 404 route, and three new sections: a Ctrl+K palette, testimonials driven by data, and live GitHub repos fetched client-side. No new runtime npm dependencies.

## Technical Context

**Language/Version**: TypeScript 5, React 18, Vite 6 (existing)
**Primary Dependencies**: react-bootstrap (Modal for the palette), react-i18next, react-router v7. Nothing new.
**Storage**: None on the server. `localStorage` for language; `sessionStorage` for the GitHub cache.
**Backend**: One Vercel Function, `api/contact.ts` (web-standard `POST(request)`), which calls the Resend REST API with `fetch`.
**Testing**: `node --test` on pure helpers (validation, accent-folding). Manual and DevTools checks per `quickstart.md`. Lighthouse.
**Target Platform**: Vercel static hosting plus the function; evergreen browsers; phones at 375 px and up.
**Performance Goals**: mobile Lighthouse Performance ≥ 85, Accessibility and SEO ≥ 95 (SC-003); new sections cost ≤ 5 points (SC-009).
**Constraints**: social crawlers do not run JS, so preview tags must exist in static HTML. The GitHub unauthenticated API allows 60 requests/hour per visitor IP.
**Scale/Scope**: about 5 routes and 13 projects; a personal site with low traffic.

## Constitution Check

No `.specify/memory/constitution.md` exists, so there are no gates. The repo conventions are followed: data lives in `src/helpers/data.ts`, strings live in `src/locales/{vi,en}`, and styles go through the CSS variables in `global.scss`.

## Project Structure

### Documentation (this feature)

```text
specs/003-upgrade-ui-features/
├── plan.md  research.md  data-model.md  quickstart.md
└── contracts/  contact-api.md  ui-contracts.md
```

### Source Code (repository root)

```text
api/contact.ts                       # NEW Vercel Function → Resend
vercel.json                          # rewrite must skip /api/
vite.config.ts                       # NEW tiny plugin: per-route preview HTML
public/og.png                        # NEW 1200×630 shared preview image
src/helpers/contact.ts               # NEW validateContact() (shared by form + function)
src/helpers/search.ts                # NEW fold() accent-insensitive matcher
src/helpers/*.test.ts                # node --test checks for the two helpers
src/helpers/data.ts                  # + TESTIMONIALS, CV_LINK handling
src/i18n.ts                          # persist language, sync <html lang>
src/layout.tsx                       # per-route document.title, palette mount
src/main.tsx                         # + '*' NotFound route
src/pages/not-found.tsx              # NEW
src/components/share/command-palette.tsx      # NEW
src/components/sections/testimonial/index.tsx # NEW
src/components/sections/github/index.tsx      # NEW
src/components/sections/contact/index.tsx     # real submit, i18n labels
src/components/layout/app.header.tsx          # palette button, aria
src/styles/global.scss               # unify section/card/button rules, reduced-motion, focus
src/locales/{vi,en}/translation.json # new strings
```

**Structure Decision**: single SPA plus one serverless function in the existing repo. The detail page keeps its own not-found view and reuses the new `NotFound` component.

## Complexity Tracking

| Choice | Why needed | Simpler alternative rejected because |
|---|---|---|
| A server function for contact | The send key must stay secret, validation must happen at the trust boundary, and a success message must mean the mail was sent | A client-only form service exposes the key and lets us trust only client-side checks |
| A build-time preview HTML plugin | Crawlers do not run JS | A single static `index.html` meta gives every project the same preview (FR-009 fails) |
