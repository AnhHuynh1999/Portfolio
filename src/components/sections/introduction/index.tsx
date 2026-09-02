import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Tilt from 'react-parallax-tilt'
import avatar from 'assets/svg/avatar.svg'
import { STATS_DATA, APP_DATA } from '@/helpers/data'
import { FaGamepad, FaFutbol, FaPlane, FaCode } from 'react-icons/fa'
import './introduction.scss'

type TLanguage = 'vi' | 'en'

const Introduction = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage || 'vi') as TLanguage

  return (
    <section className='my-5 py-md-4'>
      {/* Key Metrics / Stats Banner */}
      <div className='stats-grid'>
        {STATS_DATA.map((item) => (
          <div key={item.id} className='stats-card'>
            <div className='stats-number'>{item.number}</div>
            <p className='stats-label'>{item.label[currentLanguage]}</p>
          </div>
        ))}
      </div>

      {/* Main Introduction Section */}
      <Row className='align-items-center gy-5 mt-4'>
        <Col xs={12} lg={7}>
          <div className='section-badge'>{t('introSection.badge')}</div>
          <h2 className='section-title mb-4'>
            {i18n.resolvedLanguage === 'en' ? (
              <>
                Let Me <span className='gradient-text'>Introduce</span> Myself
              </>
            ) : (
              <>
                Đam Mê Kiến Tạo <span className='gradient-text'>Sản Phẩm Số</span> Chất Lượng
              </>
            )}
          </h2>

          <div className='intro-story-content'>
            <p className='intro-lead-text'>{t('introSection.subheading')}</p>

            <p>{t('introSection.heading1')}</p>

            <p>
              {t('introSection.heading2')} <strong className='text-highlight'>JavaScript, TypeScript</strong>,{' '}
              {t('introSection.heading4')}.
            </p>

            <p>
              {t('introSection.heading5')} <strong className='text-highlight'>React, Next.js</strong>{' '}
              {t('introSection.and')} <strong className='text-highlight'>Node.js (NestJS / Express)</strong>.
            </p>
          </div>

          {/* Hobbies Badges */}
          <div className='mt-4 pt-2'>
            <h5 className='mb-3' style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('introSection.hobbiesTitle')}:
            </h5>
            <div className='d-flex flex-wrap gap-2'>
              <div className='hobby-pill'>
                <FaGamepad className='text-primary' />
                <span>{t('about.description5')}</span>
              </div>
              <div className='hobby-pill'>
                <FaFutbol className='text-success' />
                <span>{t('about.description6')}</span>
              </div>
              <div className='hobby-pill'>
                <FaPlane className='text-warning' />
                <span>{t('about.description7')}</span>
              </div>
              <div className='hobby-pill'>
                <FaCode className='text-danger' />
                <span>Open Source & Tech</span>
              </div>
            </div>
          </div>
        </Col>

        {/* 3D Tilt Avatar & Bio Showcase */}
        <Col xs={12} lg={5} className='text-center'>
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            transitionSpeed={1000}
            scale={1.03}
            className='tilt-avatar-card-wrapper'
          >
            <div className='bio-avatar-card'>
              <div className='avatar-circle-glow'>
                <img src={avatar} alt={`${APP_DATA.NAME} Avatar`} className='avatar-img' />
              </div>
              <div className='bio-avatar-info mt-3'>
                <h4 className='mb-1'>{APP_DATA.NAME}</h4>
                <p className='text-muted mb-0' style={{ fontSize: '0.9rem' }}>
                  {APP_DATA.ROLE}
                </p>
                <div className='mt-3 d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill status-mini-tag'>
                  <span className='pulse-dot'></span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Vietnam (GMT+7)</span>
                </div>
              </div>
            </div>
          </Tilt>
        </Col>
      </Row>
    </section>
  )
}

export default Introduction
