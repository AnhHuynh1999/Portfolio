import { validateContact } from '../src/helpers/contact.js'

const MAX_BODY = 16 * 1024
const WINDOW_MS = 10 * 60 * 1000
const MAX_SENDS = 3
// ponytail: per-instance memory, so the limit resets on cold start and isn't shared across instances; move to KV/Upstash if spam gets through.
const sends = new Map<string, number[]>()

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

export async function POST(request: Request) {
  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY) return json(413, { ok: false })

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
  } catch {
    body = {}
  }

  const result = validateContact(body)
  if (!result.ok) return json(400, { ok: false, errors: result.errors })

  // Honeypot: bots fill every field. Pretend success, send nothing.
  if (typeof body.website === 'string' && body.website.trim()) return json(200, { ok: true })

  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
  const now = Date.now()
  const recent = (sends.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_SENDS) return json(429, { ok: false, error: 'rateLimited' })

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  if (!key || !to) return json(503, { ok: false, error: 'notConfigured' })

  const { name, email, subject, message } = result.value
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject || 'Tin nhắn mới'} — ${name}`,
        text: `Tên: ${name}\nEmail: ${email}\nChủ đề: ${subject || '(không có)'}\n\n${message}`
      })
    })
    if (!res.ok) {
      console.error('resend failed', res.status, await res.text())
      return json(502, { ok: false, error: 'delivery' })
    }
  } catch (err) {
    console.error('resend error', err)
    return json(502, { ok: false, error: 'delivery' })
  }

  recent.push(now)
  sends.set(ip, recent)
  return json(200, { ok: true })
}
