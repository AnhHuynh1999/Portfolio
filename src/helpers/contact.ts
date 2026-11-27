// Shared by the browser form and api/contact.ts — keep it import-free.
export type ContactField = 'name' | 'email' | 'subject' | 'message'
export type ContactError = 'required' | 'invalid' | 'tooLong'
export interface ContactValue {
  name: string
  email: string
  subject: string
  message: string
}
export type ContactResult =
  | { ok: true; value: ContactValue }
  | { ok: false; errors: Partial<Record<ContactField, ContactError>> }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(input: unknown): ContactResult {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const str = (k: string) => (typeof raw[k] === 'string' ? (raw[k] as string).trim() : '')
  const value: ContactValue = {
    name: str('name'),
    email: str('email'),
    subject: str('subject'),
    message: str('message')
  }
  const errors: Partial<Record<ContactField, ContactError>> = {}

  if (!value.name) errors.name = 'required'
  else if (value.name.length > 100) errors.name = 'tooLong'

  if (!value.email) errors.email = 'required'
  else if (value.email.length > 254) errors.email = 'tooLong'
  else if (!EMAIL_RE.test(value.email)) errors.email = 'invalid'

  if (value.subject.length > 150) errors.subject = 'tooLong'

  if (!value.message) errors.message = 'required'
  else if (value.message.length > 5000) errors.message = 'tooLong'

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value }
}
