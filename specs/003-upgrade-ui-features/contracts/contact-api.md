# Contract: `POST /api/contact`

**Request**: `Content-Type: application/json`, body = [ContactMessage](../data-model.md#contactmessage-request-body-of-post-apicontact).

| Status | Body | When |
|---|---|---|
| 200 | `{ "ok": true }` | Resend accepted the email, or the honeypot was filled (silently dropped) |
| 400 | `{ "ok": false, "errors": { "email": "invalid" } }` | validation failed (same codes as the client) |
| 405 | — | method is not POST |
| 413 | `{ "ok": false }` | body larger than 16 KB |
| 429 | `{ "ok": false, "error": "rateLimited" }` | more than 3 sends from this IP within 10 minutes |
| 502 | `{ "ok": false, "error": "delivery" }` | Resend returned non-2xx or the request failed |
| 503 | `{ "ok": false, "error": "notConfigured" }` | `RESEND_API_KEY` or `CONTACT_TO` is missing |

**Email sent**:
- `from`: `Portfolio <onboarding@resend.dev>`
- `to`: `CONTACT_TO`
- `reply_to`: sender email
- `subject`: `[Portfolio] <subject or "Tin nhắn mới">` — <name>
- `text` body: name, email, subject, message

User text goes only into the plain-text body, never into HTML.

**Client behavior**: the Send button is disabled while a request is pending. Only a 200 shows success and clears the form. Any other status keeps the text and shows the translated error plus the copy-email fallback.
