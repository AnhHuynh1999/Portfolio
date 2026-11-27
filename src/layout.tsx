import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from 'components/layout/app.header'
import AppFooter from 'components/layout/app.footer'
import ScrollToTop from 'components/share/scroll-to-top'
import CommandPalette from 'components/share/command-palette'

// Detail and NotFound pages set their own titles.
const TITLE_KEYS: Record<string, string> = {
  '/': 'titles.home',
  '/project': 'titles.projects',
  '/about': 'titles.about'
}

const Layout = () => {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Ctrl/⌘+K opens the palette from anywhere, even inside form fields (their text is untouched).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const key = TITLE_KEYS[pathname.replace(/\/+$/, '') || '/']
    if (key) document.title = t(key)
  }, [pathname, t, i18n.language])

  return (
    <div className='position-relative min-vh-100 d-flex flex-column'>
      {/* Ambient Aurora Glows */}
      <div className='ambient-mesh-glow'>
        <div className='aurora-blob aurora-blob-1'></div>
        <div className='aurora-blob aurora-blob-2'></div>
        <div className='aurora-blob aurora-blob-3'></div>
        <div className='grid-overlay'></div>
      </div>

      <AppHeader onOpenPalette={() => setPaletteOpen(true)} />
      <main className='flex-grow-1 position-relative' style={{ zIndex: 1, paddingTop: '5.5rem' }}>
        <Outlet />
      </main>
      <AppFooter />
      <ScrollToTop />
      <ScrollRestoration />
      <CommandPalette show={paletteOpen} onHide={() => setPaletteOpen(false)} />
    </div>
  )
}

export default Layout
