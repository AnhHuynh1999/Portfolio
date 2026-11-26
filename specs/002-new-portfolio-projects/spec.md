# Feature Specification: Two New Portfolio Projects

**Feature Branch**: `update-ui`
**Created**: 2026-11-26
**Status**: Draft
**Input**: User description: "Làm thêm 2 dự án mới để thêm vào portfolio"

## Context

The portfolio currently shows 11 projects. The newest, *Chia Tiền*, set the bar: an original idea, a live demo anyone can try without signing up, public source code, and a detail page in the portfolio. The two new projects must meet the same bar and should demonstrate skills the portfolio does not yet show: **real-time interaction** and **data analytics / dashboards**.

Confirmed pair:

- **Project A — "Bình chọn trực tiếp" (Live Poll)**: a presenter creates a poll, shares a short code or QR, and the audience votes from their phones while results update live on every screen.
- **Project B — "Link gọn" (Link Shortener with Analytics)**: create short links and see a dashboard of clicks over time, by referrer, by device and by country.

## Clarifications

### Session 2026-11-26

- Q: Which two projects should be built? → A: Option A — Live Poll + Link Shortener with Analytics.
- Q: How should the link shortener limit phishing abuse? → A: Interstitial page showing the destination domain, auto-continuing after 3 seconds with a "go now" button, plus a per-visitor hourly creation limit.
- Q: How long are polls, links and clicks kept? → A: Polls and links with no activity (no vote / no click) for 90 days are deleted automatically, together with their votes and clicks; a daily cleanup runs.
- Q: How are bot and link-preview visits counted? → A: Detected by user agent, recorded with a bot flag, excluded from all totals and charts; the stats page shows one line "Đã lọc N lượt từ bot/preview".

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Run a live poll in a room (Priority: P1)

A presenter (teacher, meetup host, team lead) creates a poll with a question and 2–6 options, gets a short join code and QR code, and shows the results screen. Audience members open the link on their phones, vote once, and everyone sees the bars move within moments.

**Why this priority**: Real-time behaviour is the most visible skill gap in the portfolio, and a recruiter can verify it in under a minute with two browser tabs.

**Independent Test**: Open the results screen in one tab and the voting page in another; casting a vote updates the results screen without a reload.

**Acceptance Scenarios**:

1. **Given** a presenter on the home page, **When** they enter a question and at least 2 options and create the poll, **Then** they see a results screen with a short join code, a QR code and a shareable link.
2. **Given** an audience member with the join link or code, **When** they choose an option and submit, **Then** their vote is counted and they see a confirmation with the current results.
3. **Given** a results screen is open, **When** any participant votes, **Then** the counts and percentages on every open screen update within 2 seconds without reloading.
4. **Given** an audience member has already voted on a poll, **When** they try to vote again from the same browser, **Then** the app shows the vote they already cast instead of counting a second one.
5. **Given** a presenter, **When** they close the poll, **Then** new votes are rejected and voters see the final results.

---

### User Story 2 - Shorten a link and read its analytics (Priority: P2)

A user pastes a long URL, gets a short link (optionally with a custom alias), shares it, and later opens a dashboard showing how many people clicked, when, from which sites, on which device types and from which countries.

**Why this priority**: Shows data collection, aggregation and charting — the dashboard skill set — in a product that is easy to understand.

**Independent Test**: Create a short link, open it a few times from different browsers, then confirm the dashboard totals and breakdowns match.

**Acceptance Scenarios**:

1. **Given** a valid http(s) URL, **When** the user shortens it, **Then** they receive a short link and a private stats link.
2. **Given** a short link, **When** anyone opens it, **Then** they see a page naming the destination domain, the click is recorded, and they continue to the original URL after 3 seconds or immediately via a "go now" button.
3. **Given** a stats page, **When** the owner opens it, **Then** they see total clicks, a clicks-per-day chart for the last 30 days, and top referrers, device types and countries.
4. **Given** a requested custom alias that is already taken or contains invalid characters, **When** the user submits, **Then** they see a clear message and can choose another.
5. **Given** an input that is not a valid http(s) URL or points to the shortener itself, **When** the user submits, **Then** it is rejected with an explanation.

---

### User Story 3 - Both projects appear in the portfolio (Priority: P3)

A portfolio visitor sees both new projects in the Projects section with a cover image, bilingual (VI/EN) description, feature list, tech tags, a live demo link and a source code link, and can open a detail page for each.

**Why this priority**: The projects only add value to the portfolio once they are listed there; this depends on stories 1 and 2 being deployed.

**Independent Test**: Open `/project`, filter by category, open each new project's detail page and follow both links.

**Acceptance Scenarios**:

1. **Given** the Projects page, **When** a visitor views it in Vietnamese or English, **Then** both new projects show with translated title, description and features.
2. **Given** a new project's card, **When** the visitor clicks the demo link, **Then** the live app opens and works without signing up.

### Edge Cases

- A poll link is opened after the poll was closed or deleted → show final results or a clear "not found" page.
- A voter's connection drops → the voting page still works by submitting normally, and results refresh when the connection returns.
- Many votes arrive at the same moment → no vote is lost or double-counted.
- A short link that does not exist → a friendly not-found page, not an error.
- Bots and link previews (chat apps fetching the URL) → recorded with a bot flag and excluded from all totals and charts; the stats page shows how many were filtered.
- Someone tries to shorten a malicious or self-referencing URL → self-references are rejected; every link shows the real destination domain on an interstitial page before continuing, and creation is capped at 10 links per visitor per hour.
- A poll or short link is opened after being removed for 90 days of inactivity → the same friendly "not found" page, which mentions inactive items are removed after 90 days.
- A visitor loses the private stats link → it cannot be recovered (stated clearly on creation, like Chia Tiền group links).

## Requirements *(mandatory)*

### Functional Requirements — Project A (Live Poll)

- **FR-A1**: Users MUST be able to create a poll with a question (1–200 characters) and 2–6 options (1–80 characters each) without creating an account.
- **FR-A2**: Each poll MUST get a short join code (6 characters, easy to read aloud), a shareable link and a QR code.
- **FR-A3**: Voters MUST be able to vote for exactly one option per poll, limited to one vote per browser.
- **FR-A4**: Results (counts and percentages) MUST update on all open screens within 2 seconds of a vote, without reloading.
- **FR-A5**: Only the poll creator (holder of a private manage link) MUST be able to close or reopen voting.
- **FR-A6**: The home page MUST offer a one-click demo poll so visitors can try it alone.

### Functional Requirements — Project B (Link Shortener)

- **FR-B1**: Users MUST be able to shorten any valid http(s) URL without an account, with an optional custom alias (3–30 letters, digits or hyphens).
- **FR-B2**: Opening a short link MUST record the click time, referrer, device type and country, then show an interstitial page displaying the destination domain that continues to the original URL automatically after 3 seconds, with a "go now" button to continue immediately.
- **FR-B3**: Each link MUST have a private, unguessable stats link shown once at creation.
- **FR-B4**: The stats page MUST show total clicks, clicks per day for the last 30 days, and the top 5 referrers, device types and countries — all counting human clicks only. Visits identified as bots or link previews (by user agent) MUST be excluded from these figures and reported as a single "Đã lọc N lượt từ bot/preview" line.
- **FR-B5**: The system MUST reject URLs that point to the shortener itself and limit link creation to 10 links per visitor per hour, showing a clear message when the limit is reached.
- **FR-B6**: The home page MUST offer a demo link with pre-filled sample clicks so the dashboard is never empty for visitors.

### Functional Requirements — Shared

- **FR-S1**: Both apps MUST be usable on a 375 px wide phone screen with no horizontal scrolling, and support light and dark themes.
- **FR-S2**: Both apps MUST keep private links (manage/stats) out of search engines.
- **FR-S3**: Each project MUST have a public source repository with a README explaining what it does and how to run it locally.
- **FR-S4**: Each project MUST include automated tests for its core logic (vote counting; click aggregation and URL/alias validation).
- **FR-S5**: The portfolio MUST list both projects with cover image, bilingual description and features, tech tags, demo and source links, and a detail page.
- **FR-S6**: Polls and short links with no activity (no vote, no click, no edit) for 90 days MUST be deleted automatically together with their votes and clicks, by a cleanup that runs at least once a day; the creation page MUST state this.

### Key Entities

- **Poll**: question, options, join code, open/closed state, creation time, last activity time, private manage key.
- **Vote**: poll, chosen option, voter identity (per browser), time.
- **Short Link**: original URL, alias/code, private stats key, creation time, last activity time.
- **Click**: link, time, referrer, device type, country, bot flag.
- **Portfolio Project entry**: existing portfolio data item, extended with the two new projects.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can create a poll and cast a vote from a second device in under 60 seconds.
- **SC-002**: With 50 simulated voters voting within 10 seconds, the final count equals exactly 50 and every open results screen shows it within 2 seconds of the last vote.
- **SC-003**: A first-time visitor can shorten a link and open its stats page in under 30 seconds.
- **SC-004**: After 20 human clicks and 5 link-preview visits, every dashboard total and breakdown counts exactly 20, and the filtered line shows 5.
- **SC-005**: The interstitial page for a short link appears in under 1 second in normal conditions, and the visitor reaches the destination within 4 seconds without any action (or immediately with "go now").
- **SC-006**: Both demos work for a visitor who has no account and has never visited before, on desktop and on a 375 px phone.
- **SC-007**: Both projects appear on the portfolio's Projects page in VI and EN, with working demo and source links.

## Assumptions

- Same delivery model as *Chia Tiền*: new public repositories under the AnhHuynh1999 GitHub account (created by the user), deployed on the user's existing hosting account with a managed database; the user performs account-level steps (repo creation, hosting import, database connection).
- No user accounts; private capabilities are granted by unguessable links, which is acceptable for demo-scale portfolio apps.
- One vote per browser is a convenience limit, not fraud-proof voting; sufficient for classroom/meetup use.
- Country is derived from the request's network location at country level only; no personal data or full IP addresses are stored.
- UI language is Vietnamese (matching *Chia Tiền*); portfolio entries are bilingual.
- Free-tier hosting and database limits are sufficient for portfolio traffic.

## Out of Scope

- Accounts, teams, or editing a poll after votes are cast.
- Multiple-choice, ranked or open-text poll questions; quizzes with scoring.
- Paid plans, custom domains for short links, link expiry, or editing a link's destination.
- Real-screenshot covers (illustrated covers are used, as for existing projects).
