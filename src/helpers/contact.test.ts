import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateContact } from './contact.ts'

const good = { name: ' An ', email: 'an@example.com', subject: '', message: 'Hello' }

test('valid input is trimmed and accepted', () => {
  const r = validateContact(good)
  assert.deepEqual(r, { ok: true, value: { name: 'An', email: 'an@example.com', subject: '', message: 'Hello' } })
})

test('missing name → required', () => {
  assert.deepEqual(validateContact({ ...good, name: '   ' }), { ok: false, errors: { name: 'required' } })
})

test('a@b → invalid email', () => {
  assert.deepEqual(validateContact({ ...good, email: 'a@b' }), { ok: false, errors: { email: 'invalid' } })
})

test('5,001-char message → tooLong', () => {
  assert.deepEqual(validateContact({ ...good, message: 'x'.repeat(5001) }), {
    ok: false,
    errors: { message: 'tooLong' }
  })
  assert.equal(validateContact({ ...good, message: 'x'.repeat(5000) }).ok, true)
})

test('151-char subject → tooLong', () => {
  assert.deepEqual(validateContact({ ...good, subject: 's'.repeat(151) }), {
    ok: false,
    errors: { subject: 'tooLong' }
  })
})

test('non-object input reports every required field', () => {
  assert.deepEqual(validateContact(null), {
    ok: false,
    errors: { name: 'required', email: 'required', message: 'required' }
  })
})
