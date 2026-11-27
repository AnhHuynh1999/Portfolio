// Accent-insensitive matching so "chia tien" finds "Chia Tiền". Import-free for node --test.
export const fold = (s: string) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase()

export const matches = (query: string, label: string, keywords: string[] = []) => {
  const words = fold(query).split(/\s+/).filter(Boolean)
  if (!words.length) return true
  const hay = fold([label, ...keywords].join(' '))
  return words.every((w) => hay.includes(w))
}
