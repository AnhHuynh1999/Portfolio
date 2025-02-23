import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import viFlag from '../../assets/svg/language/vi.svg'
import enFlag from '../../assets/svg/language/en.svg'
import { Link, NavLink } from 'react-router-dom'
import { MdNightlight, MdOutlineLightMode } from 'react-icons/md'
import { userCurrentApp } from '../context/app.context'
import { useTranslation } from 'react-i18next'

type ThemeContextType = 'light' | 'dark'

const AppHeader = () => {
  const { theme, setTheme } = userCurrentApp()
  const { t, i18n } = useTranslation()
  const handleMode = (mode: ThemeContextType) => {
    localStorage.setItem('theme', mode)
    document.documentElement.setAttribute('data-bs-theme', mode)
    setTheme(mode)
  }
  const renderFlag = (language: string) => {
    return <img style={{ height: 20, width: 20 }} src={language === 'en' ? enFlag : viFlag} alt={language} />
  }
  return (
    <Navbar expand='lg' data-bs-theme={theme} id='bg-body-tertiary' style={{ zIndex: 1 }}>
      <Container>
        <Link className='navbar-brand' to='/'>
          <span className='brand-green'>{t('appHeader.brand')}</span>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink className='nav-link' to={'/'}>
              {t('appHeader.home')}
            </NavLink>
            <NavLink className='nav-link' to={'/project'}>
              {t('appHeader.project')}
            </NavLink>
            <NavLink className='nav-link' to={'/about'}>
              {t('appHeader.about')}
            </NavLink>
          </Nav>
          <Nav className='ms-auto'>
            <div className='nav-link' style={{ cursor: 'pointer' }}>
              {theme === 'light' ? (
                <MdOutlineLightMode style={{ fontSize: 20 }} onClick={() => handleMode('dark')} />
              ) : (
                <MdNightlight style={{ fontSize: 20 }} onClick={() => handleMode('light')} />
              )}{' '}
            </div>
            <NavDropdown title={renderFlag(i18n.resolvedLanguage!)}>
              <div onClick={() => i18n.changeLanguage('en')} className='dropdown-item d-flex gap-2 align-items-center'>
                <img style={{ height: 20, width: 20 }} src={enFlag} alt='english'></img>English
              </div>
              <div onClick={() => i18n.changeLanguage('vi')} className='dropdown-item d-flex gap-2 align-items-center'>
                <img style={{ height: 20, width: 20 }} src={viFlag} alt='vietnamese'></img>Tiếng Việt
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppHeader
