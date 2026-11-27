import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fold, matches } from './search.ts'

test('fold strips Vietnamese accents and đ', () => {
  assert.equal(fold('Chia Tiền Đặt Lịch'), 'chia tien dat lich')
})

test('chia tien matches Chia Tiền', () => {
  assert.equal(matches('chia tien', 'Chia Tiền'), true)
})

test('ĐẶT matches đặt lịch', () => {
  assert.equal(matches('ĐẶT', 'đặt lịch khám'), true)
})

test('empty query matches everything', () => {
  assert.equal(matches('   ', 'anything'), true)
})

test('keywords are searched; no false match', () => {
  assert.equal(matches('nestjs', 'Link Gọn', ['NestJS', 'backend']), true)
  assert.equal(matches('python', 'Link Gọn', ['NestJS', 'backend']), false)
  assert.equal(matches('chia xyz', 'Chia Tiền'), false)
})
