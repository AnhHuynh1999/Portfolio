import { Col, Row } from 'react-bootstrap'
import experienceJSON from 'assets/lottie/laptop-fe.json'
import AnimitionLottie from '@/components/share/animation-lottie'
import { EXPERIENCES } from '@/helpers/data'
import { useTranslation } from 'react-i18next'
import { BsPersonWorkspace, BsBriefcaseFill } from 'react-icons/bs'
import { FaMapMarkerAlt } from 'react-icons/fa'

type TLanguage = 'vi' | 'en'

const Experience = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage || 'vi') as TLanguage

  return (
    <section className='my-5 py-md-4'>
      {/* Section Header */}
      <div className='section-header'>
        <div className='section-badge'>{t('experience.badge')}</div>
        <h2 className='section-title'>{t('experience.title')}</h2>
        <p className='section-subtitle'>{t('experience.subtitle')}</p>
      </div>

      <Row className='align-items-center gy-5'>
        {/* Left Column: Lottie Animation Illustration */}
        <Col lg={5} xs={12} className='d-none d-lg-flex flex-column align-items-center justify-content-center'>
          <div className='position-sticky' style={{ top: '6rem' }}>
            <div
              className='p-4 text-center rounded-4'
              style={{
                background: 'var(--bg-glass-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <AnimitionLottie animationPath={experienceJSON} width='90%' />
              <div className='mt-3'>
                <h5 className='mb-1 fw-bold text-primary'>{t('experience.title')}</h5>
                <p className='text-muted small mb-0'>{t('experience.subtitle')}</p>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Column: Modern Glowing Timeline */}
        <Col lg={7} xs={12}>
          <div className='timeline-wrapper'>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className='timeline-item'>
                {/* Glowing Milestone Marker */}
                <div className='timeline-marker'>
                  <BsBriefcaseFill size={14} />
                </div>

                {/* Timeline Card */}
                <div className='timeline-content'>
                  <div className='timeline-header'>
                    <h3 className='timeline-title'>{exp.title[currentLanguage]}</h3>
                    <span className='timeline-duration'>{exp.duration[currentLanguage]}</span>
                  </div>

                  <div className='d-flex align-items-center flex-wrap gap-3 mb-3'>
                    <div className='timeline-company d-flex align-items-center gap-2 mb-0'>
                      <BsPersonWorkspace size={16} />
                      <span>{exp.company[currentLanguage]}</span>
                    </div>

                    {exp.location && (
                      <div className='d-flex align-items-center gap-1 text-muted small'>
                        <FaMapMarkerAlt size={12} className='text-danger' />
                        <span>{exp.location[currentLanguage]}</span>
                      </div>
                    )}
                  </div>

                  {/* Responsibilities & Achievements */}
                  {exp.description && exp.description[currentLanguage] && (
                    <ul className='timeline-bullets'>
                      {exp.description[currentLanguage].map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack Tags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className='d-flex flex-wrap mt-3 pt-2 border-top border-subtle'>
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className='tech-tag-pill'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default Experience
