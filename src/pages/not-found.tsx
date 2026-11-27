import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('titles.notFound')
  }, [t, i18n.language])

  return (
    <Container className='not-found text-center py-5'>
      <div className='section-header'>
        <div className='section-badge'>404</div>
        <h1 className='section-title'>{t('notFound.title')}</h1>
        <p className='section-subtitle'>{t('notFound.desc')}</p>
      </div>
      <div className='d-flex flex-wrap justify-content-center gap-3'>
        <Link to='/' className='btn-glow-primary'>
          {t('notFound.home')}
        </Link>
        <Link to='/project' className='btn-glass-secondary'>
          {t('notFound.projects')}
        </Link>
      </div>
    </Container>
  )
}

export default NotFoundPage
