import AnimitionLottie from '@/components/share/animation-lottie'
import design from 'assets/lottie/design.json'
import contact from 'assets/lottie/contact.json'
import cms from 'assets/lottie/cms.json'
import { Col, Row } from 'react-bootstrap'
import { EDUCATIONS, APP_DATA } from '@/helpers/data'
import { useTranslation } from 'react-i18next'
import { FaGraduationCap, FaQuoteLeft } from 'react-icons/fa'
import Socialmedia from '@/components/sections/socialMedia'

type TLanguage = 'vi' | 'en'

const About = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage || 'vi') as TLanguage

  return (
    <div className='my-4'>
      {/* 1. Bio & Story Showcase */}
      <section className='mb-5 pb-md-4'>
        <div className='section-header'>
          <div className='section-badge'>{t('about.badge')}</div>
          <h2 className='section-title'>{t('about.title')}</h2>
        </div>

        <Row className='align-items-center gy-5'>
          <Col lg={7} xs={12}>
            <div className='glass-card p-4 p-md-5'>
              <h3 className='fw-bold mb-3' style={{ fontSize: '1.4rem' }}>
                <span className='gradient-text'>{APP_DATA.NAME}</span> &bull; {APP_DATA.ROLE}
              </h3>
              <p className='intro-lead-text mb-3'>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
              <p>{t('about.description3')}</p>

              <div
                className='my-4 p-3 rounded-4 position-relative'
                style={{ background: 'rgba(139, 92, 246, 0.08)', borderLeft: '4px solid var(--accent-purple)' }}
              >
                <FaQuoteLeft className='text-primary opacity-50 mb-2' size={20} />
                <p className='fst-italic fw-semibold mb-1 text-primary' style={{ fontSize: '0.95rem' }}>
                  {t('about.quote')}
                </p>
                <div className='small text-muted text-end'>&mdash; {APP_DATA.NAME}</div>
              </div>
            </div>
          </Col>

          <Col lg={5} xs={12} className='text-center'>
            <div className='glass-card p-4'>
              <AnimitionLottie animationPath={cms} width='85%' />
            </div>
          </Col>
        </Row>
      </section>

      {/* 2. Education Timeline Section */}
      <section className='my-5 py-md-4'>
        <div className='section-header'>
          <div className='section-badge'>{t('education.badge')}</div>
          <h2 className='section-title'>{t('education.title')}</h2>
          <p className='section-subtitle'>{t('education.subtitle')}</p>
        </div>

        <Row className='align-items-center gy-5'>
          <Col lg={5} className='d-none d-lg-flex justify-content-center'>
            <div className='glass-card p-4 text-center w-100'>
              <AnimitionLottie animationPath={design} width='85%' />
            </div>
          </Col>

          <Col lg={7} xs={12}>
            <div className='timeline-wrapper'>
              {EDUCATIONS.map((edu) => (
                <div key={edu.id} className='timeline-item'>
                  <div className='timeline-marker'>
                    <FaGraduationCap size={16} />
                  </div>

                  <div className='timeline-content'>
                    <div className='timeline-header'>
                      <h4 className='timeline-title'>{edu.title[currentLanguage]}</h4>
                      <span className='timeline-duration'>{edu.duration[currentLanguage]}</span>
                    </div>

                    <div className='timeline-company mb-2'>{edu.company[currentLanguage]}</div>

                    {edu.major && <p className='text-secondary mb-0 small'>{edu.major[currentLanguage]}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>

      {/* 3. Connect & Reach Out */}
      <section className='my-5 pt-4'>
        <div className='glass-card p-4 p-md-5'>
          <Row className='align-items-center gy-4'>
            <Col lg={7} xs={12}>
              <h3 className='fw-bold mb-2'>{t('about.findmeon')}</h3>
              <p className='text-secondary mb-4'>
                Kết nối với tôi qua các nền tảng mạng xã hội hoặc dự án nguồn mở để trao đổi công việc và ý tưởng công
                nghệ.
              </p>
              <Socialmedia />
            </Col>

            <Col lg={5} xs={12} className='text-center'>
              <AnimitionLottie animationPath={contact} width='65%' />
            </Col>
          </Row>
        </div>
      </section>
    </div>
  )
}

export default About
