import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import viFlag from 'assets/svg/language/vi.svg'
import enFlag from 'assets/svg/language/en.svg'
import { Link, NavLink } from 'react-router-dom'
import { MdNightlight, MdOutlineLightMode } from 'react-icons/md'
import { FaPaperPlane } from 'react-icons/fa'
import { useCurrentApp } from '../context/app.context'
import { useTranslation } from 'react-i18next'
import logo from 'assets/logo.png'

type ThemeContextType = 'light' | 'dark'

const AppHeader = () => {
  const { theme, setTheme } = useCurrentApp()
  const { t, i18n } = useTranslation()

  const handleMode = (mode: ThemeContextType) => {
    localStorage.setItem('theme', mode)
    document.documentElement.setAttribute('data-bs-theme', mode)
    setTheme(mode)
  }

  const renderFlag = (language: string) => {
    return (
      <span className='d-inline-flex align-items-center gap-2'>
        <img
          style={{ height: 18, width: 18, borderRadius: '50%', objectFit: 'cover' }}
          src={language === 'en' ? enFlag : viFlag}
          alt={language}
        />
        <span className='text-uppercase fw-semibold' style={{ fontSize: '0.8rem' }}>
          {language}
        </span>
      </span>
    )
  }

  return (
    <header className='navbar-floating-wrapper'>
      <Navbar expand='lg' data-bs-theme={theme} className='navbar-glass-island'>
        <Container fluid className='px-0'>
          <Link className='navbar-brand-logo' to='/'>
            <img src={logo} alt='Bao Anh Logo' />
            <span className='navbar-brand-title'>{t('appHeader.brand')}</span>
          </Link>

          <Navbar.Toggle aria-controls='main-navbar-nav' className='border-0 shadow-none' />

          <Navbar.Collapse id='main-navbar-nav'>
            <Nav className='mx-auto gap-1 my-2 my-lg-0'>
              <NavLink className='nav-link-item' to='/'>
                {t('appHeader.home')}
              </NavLink>
              <NavLink className='nav-link-item' to='/project'>
                {t('appHeader.project')}
              </NavLink>
              <NavLink className='nav-link-item' to='/about'>
                {t('appHeader.about')}
              </NavLink>
            </Nav>

            <div className='d-flex align-items-center gap-3 ms-lg-2 mt-3 mt-lg-0'>
              {/* Theme Toggle */}
              <button
                className='theme-toggle-btn'
                onClick={() => handleMode(theme === 'light' ? 'dark' : 'light')}
                aria-label='Toggle theme'
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? (
                  <MdNightlight size={20} className='text-primary' />
                ) : (
                  <MdOutlineLightMode size={20} className='text-warning' />
                )}
              </button>

              {/* Language Switcher */}
              <NavDropdown
                className='language-dropdown'
                title={renderFlag(i18n.resolvedLanguage || 'vi')}
                id='language-nav-dropdown'
              >
                <div
                  onClick={() => i18n.changeLanguage('vi')}
                  className={`dropdown-item ${i18n.resolvedLanguage === 'vi' ? 'lang-item-active' : ''}`}
                >
                  <img style={{ height: 18, width: 18, borderRadius: '50%' }} src={viFlag} alt='Tiếng Việt' />
                  <span>Tiếng Việt</span>
                </div>
                <div
                  onClick={() => i18n.changeLanguage('en')}
                  className={`dropdown-item ${i18n.resolvedLanguage === 'en' ? 'lang-item-active' : ''}`}
                >
                  <img style={{ height: 18, width: 18, borderRadius: '50%' }} src={enFlag} alt='English' />
                  <span>English</span>
                </div>
              </NavDropdown>

              {/* Contact CTA */}
              <a
                href='#contact-section'
                className='btn-glow-primary d-none d-sm-inline-flex'
                style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
              >
                <FaPaperPlane size={13} />
                <span>{t('appHeader.contactMe')}</span>
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default AppHeader
