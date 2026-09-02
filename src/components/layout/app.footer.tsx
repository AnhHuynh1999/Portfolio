import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { APP_DATA } from '@/helpers/data'
import { FaGithub, FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaHeart, FaTelegram } from 'react-icons/fa'

const AppFooter = () => {
  const { t } = useTranslation()

  return (
    <footer className='app-footer-modern'>
      <Container>
        <Row className='align-items-center gy-4'>
          <Col md={4} className='text-center text-md-start'>
            <div className='footer-brand'>{APP_DATA.NAME}</div>
            <p className='mb-0 text-muted' style={{ fontSize: '0.875rem' }}>
              {APP_DATA.ROLE} &bull; {APP_DATA.LOCATION}
            </p>
          </Col>

          <Col md={4} className='text-center'>
            <div className='d-flex justify-content-center flex-wrap gap-2'>
              <Link className='footer-nav-link' to='/'>
                {t('appHeader.home')}
              </Link>
              <span className='text-muted'>&bull;</span>
              <Link className='footer-nav-link' to='/project'>
                {t('appHeader.project')}
              </Link>
              <span className='text-muted'>&bull;</span>
              <Link className='footer-nav-link' to='/about'>
                {t('appHeader.about')}
              </Link>
            </div>
          </Col>

          <Col md={4}>
            <div className='d-flex justify-content-center justify-content-md-end gap-2'>
              <a
                href={APP_DATA.GITHUB_URL}
                target='_blank'
                rel='noreferrer'
                className='social-icon-btn github'
                title='GitHub'
              >
                <FaGithub size={18} />
              </a>
              <a
                href={APP_DATA.FACEBOOK_URL}
                target='_blank'
                rel='noreferrer'
                className='social-icon-btn facebook'
                title='Facebook'
              >
                <FaFacebook size={18} />
              </a>
              <a
                href={APP_DATA.INSTAGRAM_URL}
                target='_blank'
                rel='noreferrer'
                className='social-icon-btn instagram'
                title='Instagram'
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={APP_DATA.YOUTUBE_URL}
                target='_blank'
                rel='noreferrer'
                className='social-icon-btn youtube'
                title='YouTube'
              >
                <FaYoutube size={18} />
              </a>
              <a
                href={APP_DATA.TIKTOK_URL}
                target='_blank'
                rel='noreferrer'
                className='social-icon-btn tiktok'
                title='TikTok'
              >
                <FaTiktok size={18} />
              </a>
              <a
                href={APP_DATA.TELEGRAM_URL}
                target='_blank'
                rel='noreferrer'
                className='social-icon-btn telegram'
                title='Telegram'
              >
                <FaTelegram size={18} />
              </a>
            </div>
          </Col>
        </Row>

        <div className='section-divider my-4'></div>

        <div className='text-center text-muted' style={{ fontSize: '0.85rem' }}>
          {t('footer.rights')} &copy; {new Date().getFullYear()}{' '}
          <strong className='text-primary'>{APP_DATA.NAME}</strong>. {t('footer.madeWith')}{' '}
          <FaHeart className='pulse-heart mx-1' /> {t('footer.inVietnam')}.
        </div>
      </Container>
    </footer>
  )
}

export default AppFooter
