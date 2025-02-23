import ProjectCard from '@/components/sections/project/project.card'
import { PROJECTS } from '@/helpers/data'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Project = () => {
  const { t, i18n } = useTranslation()
  return (
    <>
      <Row>
        <Col xs={12}>
          {i18n.resolvedLanguage === 'en' ? (
            <h3 className='text-center'>
              {t('project.myRecent')}
              <span className='brand-red'> {t('project.works')}</span>
            </h3>
          ) : (
            <h3 className='text-center'>
              <span className='brand-red'> {t('project.works')}</span> &nbsp;
              {t('project.myRecent')}
            </h3>
          )}
          <h6 className='text-center mb-md-5 mb-2'>{t('project.description')}.</h6>
        </Col>
      </Row>
      <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </Row>
    </>
  )
}

export default Project
