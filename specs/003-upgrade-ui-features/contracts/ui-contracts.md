# UI Contracts

## Routes

| Path | Page | Tab title (vi / en) | Static preview HTML |
|---|---|---|---|
| `/` | Home | `Bảo Anh — Fullstack Developer` | `dist/index.html` |
| `/project` | Projects | `Dự án — Bảo Anh` / `Projects — Bảo Anh` | `dist/project/index.html` |
| `/project/:slug` | Detail | `<title> \| Bảo Anh` (existing) | `dist/project/<slug>/index.html` |
| `/about` | About | `Giới thiệu — Bảo Anh` / `About — Bảo Anh` | `dist/about/index.html` |
| `*` | NotFound | `Không tìm thấy trang` / `Page not found` | — (SPA fallback) |
| `/love`, `/crush`, `/to-tinh` | unchanged | unchanged | none |

## Preview tags (each static HTML)

`<title>`, `meta[name=description]`, `og:type`, `og:title`, `og:description`, `og:image` (absolute URL to `/og.png`), `og:url`, `twitter:card=summary_large_image`. Project pages use `title` and `description.vi`.

## Keyboard

| Key | Context | Effect |
|---|---|---|
| Ctrl+K / ⌘K | anywhere, including inside inputs | open the palette (form text is kept) |
| ↑ / ↓ | palette | move the active option (`aria-activedescendant`) |
| Enter | palette | run the active option and close |
| Esc / outside click | palette | close and return focus to the opener |

## Language

The language is stored in `localStorage.lang` (`vi` or `en`), and the first-visit default is `vi`. `<html lang>` always equals the current language.

## Home section order

Hero → Introduction → Skills → Experience → Featured projects → **GitHub activity** → **Testimonials** (hidden when empty) → Contact.
