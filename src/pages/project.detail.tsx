import { ReactNode, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import { APP_DATA, PROJECTS } from '@/helpers/data'
import { ProjectImage, ProjectLinks } from '@/components/sections/project/project.card'
import NotFoundPage from '@/pages/not-found'

type TLanguage = 'vi' | 'en'

const DetailSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className='project-detail-section'>
    <h2 className='project-detail-heading'>{title}</h2>
    {children}
  </section>
)

const ProjectDetailPage = () => {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const lang = (i18n.resolvedLanguage || 'vi') as TLanguage
  const project = PROJECTS.find((p) => p.slug === slug)

  // Per-project page title (FR-002).
  useEffect(() => {
    if (!project) return
    const previous = document.title
    document.title = `${project.title} | ${APP_DATA.NAME}`
    return () => {
      document.title = previous
    }
  }, [project])

  // Came from inside the site → real Back (keeps filters + scroll, FR-003); opened directly → list.
  const goBack = () => (location.key !== 'default' ? navigate(-1) : navigate('/project'))

  if (!project) return <NotFoundPage />

  // Missing translation → Vietnamese; missing field → section hidden (FR-001a).
  const pick = <T,>(field?: { vi: T; en: T }) => field && (field[lang] || field.vi)
  const role = pick(project.role)
  // The lead already shows `description`, so Overview only appears when it adds real content.
  const overview = pick(project.overview)
  const features = pick(project.features)
  const outcomes = pick(project.outcomes)

  return (
    <div className='project-detail py-4 py-md-5'>
      <Container>
        <button type='button' className='btn btn-glass-secondary project-detail-back mb-4' onClick={goBack}>
          <FaArrowLeft size={12} aria-hidden />
          <span>{t('project.back')}</span>
        </button>

        <header className='project-detail-header'>
          <div className='d-flex flex-wrap gap-2 mb-3'>
            <span className='project-detail-chip'>{project.category}</span>
            {project.featured && <span className='project-detail-chip is-featured'>{t('project.featured')}</span>}
          </div>
          <h1 className='project-detail-title'>{project.title}</h1>
          <p className='project-detail-lead'>{pick(project.description)}</p>

          {(project.period || role) && (
            <dl className='project-detail-meta'>
              {project.period && (
                <div>
                  <dt>{t('project.period')}</dt>
                  <dd>{project.period}</dd>
                </div>
              )}
              {role && (
                <div>
                  <dt>{t('project.role')}</dt>
                  <dd>{role}</dd>
                </div>
              )}
            </dl>
          )}

          <div className='project-actions project-detail-actions'>
            <ProjectLinks project={project} />
          </div>
        </header>

        <div className='project-detail-hero'>
          <ProjectImage src={project.imgPath} alt={project.title} loading='eager' />
        </div>

        <Row className='gy-4'>
          <Col lg={8}>
            {overview && (
              <DetailSection title={t('project.overview')}>
                <p>{overview}</p>
              </DetailSection>
            )}
            {!!features?.length && (
              <DetailSection title={t('project.features')}>
                <ul>
                  {features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DetailSection>
            )}
            {!!outcomes?.length && (
              <DetailSection title={t('project.outcomes')}>
                <ul>
                  {outcomes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DetailSection>
            )}
          </Col>
          <Col lg={4}>
            <DetailSection title={t('project.techStack')}>
              <div className='d-flex flex-wrap'>
                {project.tags.map((tag) => (
                  <Link key={tag} to={`/project?tech=${encodeURIComponent(tag)}`} className='tech-tag-pill'>
                    {tag}
                  </Link>
                ))}
              </div>
            </DetailSection>
          </Col>
        </Row>

        {!!project.screenshots?.length && (
          <DetailSection title={t('project.screenshots')}>
            <div className='project-detail-gallery'>
              {project.screenshots.map((src, i) => (
                <ProjectImage key={src} src={src} alt={`${project.title} — ${t('project.screenshots')} ${i + 1}`} />
              ))}
            </div>
          </DetailSection>
        )}
      </Container>
    </div>
  )
}

export default ProjectDetailPage
