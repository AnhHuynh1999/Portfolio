# Feature Specification: Portfolio UI & Feature Upgrade

**Feature Branch**: `update-ui`
**Created**: 2026-11-27
**Status**: Draft
**Input**: User description: "Nâng cấp giao diện và tính năng cho web"

## Context

The portfolio has Home (hero, intro, skills, experience, featured projects, contact), Projects (list + detail pages, upgraded in feature 001), and About. Gaps found in the current site:

- **The contact form is fake**: it shows a "sent" confirmation but the message goes nowhere. Every message a recruiter writes is silently lost.
- The contact form's labels are Vietnamese-only even when the site is in English.
- An unknown address (e.g. `/abc`) shows no "page not found" screen.
- Every page has the same browser-tab title, and sharing a link on Facebook/Zalo/LinkedIn shows no preview image or description. The page language is always declared as English.
- The visual style has grown section by section (spacing, card styles, headings and motion vary between sections).

## Clarifications

### Session 2026-11-27

- Q: Should the redesign polish the current "glass/aurora" style or adopt a new direction? → A: Keep the glass/aurora identity; unify and polish it (Option A).
- Q: Which new features should be added? → A: Command palette (Ctrl+K), testimonials, and live GitHub activity (Options B, C, D).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor's message actually reaches the owner (Priority: P1)

A recruiter fills in the contact form and presses Send. The owner receives the message (name, email, subject, content) and can reply to the sender's email directly. The visitor sees an honest result: success only when the message was delivered, and a clear error with a fallback (copy email) when it was not.

**Why this priority**: Today the form loses every message while claiming success. It is the only functional bug that directly costs job opportunities.

**Independent Test**: Submit the form on the deployed site; the message arrives in the owner's inbox within 1 minute and "reply" goes to the sender.

**Acceptance Scenarios**:

1. **Given** a filled form with a valid email, **When** the visitor presses Send, **Then** the owner receives the message and the visitor sees a success state.
2. **Given** the delivery service is unreachable, **When** the visitor presses Send, **Then** the visitor sees an error, their text is kept in the form, and the owner's email is offered to copy.
3. **Given** a missing name, invalid email, or empty message, **When** the visitor presses Send, **Then** the specific field is flagged and nothing is sent.
4. **Given** an automated bot submits the form, **When** it fills the hidden trap field or submits repeatedly, **Then** the message is not delivered.

---

### User Story 2 - A consistent, polished look across the whole site (Priority: P2)

A visitor moving from Home to Projects to About experiences one coherent design: the same heading style, spacing rhythm, card style, button style and motion everywhere, in both light and dark mode, on phone and desktop.

**Why this priority**: First impression drives whether a recruiter keeps reading; inconsistency reads as unfinished work.

**Independent Test**: Review every page at 375 px and 1440 px in light and dark mode against the shared style rules; no section deviates.

**Acceptance Scenarios**:

1. **Given** any two sections, **When** compared, **Then** section headings, spacing and card styles follow the same rules.
2. **Given** a phone at 375 px width, **When** any page is viewed, **Then** nothing scrolls horizontally and all tap targets are at least 44 px.
3. **Given** the visitor's system asks for reduced motion, **When** pages load, **Then** decorative animation is turned off.
4. **Given** light mode, **When** any text is shown, **Then** it meets normal contrast requirements (4.5:1 for body text).

**Visual direction**: Keep the current "glass/aurora" identity and refine it: unify and polish, with no new visual language.

---

### User Story 3 - Shared links look good and tabs are named (Priority: P3)

When the owner pastes the portfolio or a project link into Facebook, Zalo or LinkedIn, a preview appears with a title, short description and image. Each page has its own browser-tab title (e.g. "Chia Tiền — Bảo Anh"), in the current language.

**Why this priority**: The owner shares links in applications and chats; a bare URL with no preview gets fewer clicks.

**Independent Test**: Paste the home URL and one project URL into a link-preview checker; both show title, description and image. Navigate between pages; the tab title changes.

**Acceptance Scenarios**:

1. **Given** the home or a project link, **When** shared, **Then** the preview shows title, description and an image.
2. **Given** any page, **When** opened, **Then** the tab title names that page, and the declared page language matches the selected language.

---

### User Story 4 - Quick command palette (Priority: P3)

A visitor presses Ctrl+K (⌘K on Mac), or taps a search button in the header on a phone, and a quick-jump box opens. Typing filters a list of pages, projects and actions (download CV, copy email, switch theme or language). Pressing Enter runs the chosen item.

**Independent Test**: Press Ctrl+K on any page, type "chia", press Enter, and the Chia Tiền detail page opens. Doing the same with the keyboard alone and with touch alone both work.

**Acceptance Scenarios**:

1. **Given** any page, **When** Ctrl+K or ⌘K is pressed, or the header button is tapped, **Then** the palette opens with the search box focused.
2. **Given** a typed query, **When** results show, **Then** they match accent-insensitively ("chia tien" finds "Chia Tiền") and the arrow keys plus Enter choose an item.
3. **Given** the palette is open, **When** Esc is pressed or the visitor clicks outside it, **Then** it closes and focus returns to where it was.
4. **Given** no results, **When** shown, **Then** a "nothing found" message appears.

---

### User Story 5 - Testimonials from colleagues and clients (Priority: P3)

A recruiter reads short quotes from people who have worked with the owner. Each quote shows the person's name, role or company and their relationship to the owner (for example teammate or client), and can optionally include a photo and a link to their profile.

**Independent Test**: With 3 entries added, the Home page shows them in both languages. With 0 entries, the section is not shown at all.

**Acceptance Scenarios**:

1. **Given** testimonials exist, **When** Home loads, **Then** they appear with name, role and quote, readable on a 375 px phone.
2. **Given** no testimonials exist, **When** Home loads, **Then** the section and its menu or palette entries are hidden; no empty box and no fake quotes are shown.
3. **Given** an entry without a photo, **When** shown, **Then** initials are displayed instead.

---

### User Story 6 - Live GitHub activity (Priority: P3)

A visitor sees proof that the owner is actively coding: the most recently updated public repositories (name, description, main language, stars, last updated) and a short activity summary, linking out to GitHub.

**Independent Test**: Push to any public repo, reload the site within an hour, and that repo appears first. Block GitHub in the browser and the section shows a friendly fallback with a link to the GitHub profile while the rest of the page still works.

**Acceptance Scenarios**:

1. **Given** GitHub is reachable, **When** the section loads, **Then** up to 6 recently updated public repos are shown, excluding forks.
2. **Given** GitHub is unreachable or rate-limited, **When** the section loads, **Then** a fallback with a profile link is shown and no error is visible elsewhere on the page.
3. **Given** a slow connection, **When** loading, **Then** placeholders hold the layout steady and nothing jumps when data arrives.

---

### User Story 7 - Lost visitors find their way (Priority: P4)

A visitor opening a broken or mistyped link sees a friendly "page not found" screen in the site's style with links back to Home and Projects.

**Independent Test**: Open `/does-not-exist`; the not-found screen shows with working links.

**Acceptance Scenarios**:

1. **Given** an unknown address, **When** opened, **Then** a not-found screen appears inside the normal header/footer.
2. **Given** an unknown project slug, **When** opened, **Then** the same not-found treatment is used.

### Edge Cases

- Visitor double-clicks Send: only one message is delivered.
- Very long message (over 5,000 characters): rejected with a clear limit message, text preserved.
- Visitor is offline: error state, text preserved.
- Language switched while the form has errors: the error messages switch language too.
- Ctrl+K pressed while typing in the contact form: the palette opens without losing the form text.
- A GitHub repo with no description or no language: the field is omitted and the card is not left blank.
- A very long testimonial (over 400 characters): clamped, with a "read more" option.
- Personal pages (`/love`, `/crush`, `/to-tinh`) keep their own look and are excluded from the redesign and from link previews.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The contact form MUST deliver name, email, subject and message to the owner's inbox, with the sender's email set as the reply address.
- **FR-002**: The form MUST show success only after delivery is confirmed; on failure it MUST keep the entered text and offer the owner's email to copy.
- **FR-003**: The form MUST validate required fields (name, valid email, message ≤ 5,000 characters) per field, before sending.
- **FR-004**: The form MUST block basic spam (hidden trap field and at most 3 messages per visitor per 10 minutes) and prevent duplicate sends from repeated clicks.
- **FR-005**: All visible text on the contact form, not-found page and new features MUST be available in Vietnamese and English.
- **FR-006**: The site MUST apply one shared set of style rules (heading, spacing, card, button, motion) to every page except the personal pages.
- **FR-007**: Every page MUST have no horizontal scroll at 375 px, tap targets ≥ 44 px, visible keyboard focus, and must honor reduced-motion preferences.
- **FR-008**: Each page MUST set its own tab title in the current language, and the declared page language MUST follow the language switch.
- **FR-009**: The home page and each project page MUST provide link-preview information (title, description, image) readable by social platforms.
- **FR-010**: Unknown addresses and unknown project slugs MUST show a not-found screen with links to Home and Projects.
- **FR-011**: A command palette MUST open with Ctrl+K or ⌘K and from a visible header button. It MUST list pages, every project, and the actions download CV, copy email, toggle theme and switch language, with accent-insensitive search and full keyboard operation.
- **FR-012**: Testimonials MUST show name, role or company, relationship and quote (vi/en), with an optional photo and profile link. The section MUST be hidden entirely when there are no entries, and only real, owner-supplied quotes may be shown.
- **FR-013**: The GitHub section MUST show up to 6 most recently updated public non-fork repos of the owner (name, description, language, stars, last updated), refreshed at least hourly. It MUST degrade to a profile link when data is unavailable.
- **FR-014**: Existing behavior MUST keep working: theme toggle, language switch, project filters and detail pages, CV download, email copy.

### Key Entities

- **Contact message**: sender name, sender email, optional subject, message body, time sent. Delivered to the owner; the site does not need to keep a copy.
- **Testimonial**: author name, role/company, relationship, quote (vi + en), optional photo, optional profile link.
- **Repository summary**: name, description, main language, stars, last updated, link. Read from GitHub and never stored by the owner.
- **Palette item**: label (vi/en), group (page / project / action), keywords, target.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of valid test messages sent from the live site arrive in the owner's inbox within 1 minute.
- **SC-002**: 0 cases where the visitor sees "sent" but the owner did not receive the message.
- **SC-003**: Every page scores at least 95 for accessibility and SEO, and at least 85 for performance on a mobile audit.
- **SC-004**: Home and at least one project link show a full preview (title, description, image) in a standard link-preview checker.
- **SC-005**: 0 pages with horizontal scrolling at 375 px width in either theme.
- **SC-006**: A first-time visitor can find and send a message to the owner in under 1 minute from landing on Home.
- **SC-007**: From any page, a visitor reaches any project in 3 keystrokes or fewer after opening the palette (e.g. Ctrl+K, "chi", Enter).
- **SC-008**: When GitHub is unreachable, 0 visible errors occur outside the GitHub section, and the page's audit scores stay within the SC-003 thresholds.
- **SC-009**: Adding the GitHub and testimonial sections lowers the Home mobile performance score by no more than 5 points.

## Assumptions

- The owner is fine with a free third-party delivery service sending form messages to their existing email address; no message storage or admin inbox on the site.
- The site stays a single bilingual (vi/en) site with the existing pages; no account system.
- Link previews for project pages may be served from pre-generated per-page information; one shared preview image for all pages is acceptable if project covers are not suitable.
- Personal pages (`/love`, `/crush`, `/to-tinh`) are out of the redesign.
- The owner supplies real testimonial text and has permission from each person to publish it. Until then, the section stays hidden.
- The GitHub section uses the owner's public account (AnhHuynh1999) and public data only; no token is exposed to visitors.

## Out of Scope

- Blog/CMS, admin dashboard, user accounts, analytics dashboards.
- Rewriting project content or the About story.
- Changing the hosting setup.
