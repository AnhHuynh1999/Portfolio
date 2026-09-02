import { Outlet } from 'react-router-dom'
import AppHeader from 'components/layout/app.header'
import AppFooter from 'components/layout/app.footer'
import ScrollToTop from 'components/share/scroll-to-top'

const Layout = () => {
  return (
    <div className='position-relative min-vh-100 d-flex flex-column'>
      {/* Ambient Aurora Glows */}
      <div className='ambient-mesh-glow'>
        <div className='aurora-blob aurora-blob-1'></div>
        <div className='aurora-blob aurora-blob-2'></div>
        <div className='aurora-blob aurora-blob-3'></div>
        <div className='grid-overlay'></div>
      </div>

      <AppHeader />
      <main className='flex-grow-1 position-relative' style={{ zIndex: 1, paddingTop: '5.5rem' }}>
        <Outlet />
      </main>
      <AppFooter />
      <ScrollToTop />
    </div>
  )
}

export default Layout
