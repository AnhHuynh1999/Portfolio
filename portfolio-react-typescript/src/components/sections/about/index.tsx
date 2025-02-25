import AnimitionLottie from '@/components/share/animation-lottie'
import design from 'assets/lottie/design.json'
import contact from 'assets/lottie/contact.json'
import cms from 'assets/lottie/cms.json'
import { Col, Row } from 'react-bootstrap'
import { EDUCATIONS } from '@/helpers/data'
import GlowCard from '@/components/share/glow-card'
import blurImg from 'assets/svg/blur.svg'
import { userCurrentApp } from '@/components/context/app.context'
import { useTranslation } from 'react-i18next'
import { FaGraduationCap } from 'react-icons/fa'
import Divider from '@/components/sections/divider'
import Socialmedia from '@/components/sections/socialMedia'

type TLanguage = 'vi' | 'en'

const About = () => {
  const { t, i18n } = useTranslation()
  const { theme } = userCurrentApp()
  const currentLanguage = i18n.resolvedLanguage as TLanguage

  return (
    <>
      <Row>
        <Col md={6} xs={12}>
          {currentLanguage === 'vi' ? (
            <h3 className=' text-center mb-md-5 mb-2'>
              <span className='brand-red'> Tôi</span> Là Ai
            </h3>
          ) : (
            <h3 className=' text-center mb-md-5 mb-2'>
              Know Who <span className='brand-red'> I'M</span>
            </h3>
          )}

          <div>
            <div>
              <p> {t('about.description1')}.</p>
              <p> {t('about.description2')}.</p>
              <p> {t('about.description3')}.</p>
            </div>
          </div>
          <div>
            <p>{t('about.description4')}</p>
            <ul>
              <li>{t('about.description5')}</li>
              <li>{t('about.description6')}</li>
              <li>{t('about.description7')}</li>
            </ul>
          </div>
          <div>
            <p className='text-center brand-red'>"Pursuing Your Dreams Is How You Become Homeless ~.~"</p>
            <p className='text-center brand-red'>--Jimmy O Yang</p>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <AnimitionLottie animationPath={cms} width='80%' />
        </Col>
      </Row>
      <Row>
        <Col md={6} xs={12} className='d-none d-md-flex align-items-center justify-content-center mt-md-5 mt-3'>
          <AnimitionLottie animationPath={design} width='80%' />
        </Col>
        <Col md={6} xs={12} className='mt-md-5 mt-3'>
          <div className='d-flex flex-column align-items-center gap-3'>
            <div>
              <h4 className='text-center brand-red'>{t('about.education')}</h4>
            </div>
            <div className='d-flex flex-column gap-5'>
              {EDUCATIONS.map((education) => (
                <GlowCard key={education.id} identifier={`glow-container-experience-${education.id}`}>
                  <div className='p-3 relative'>
                    {theme === 'dark' && (
                      <img
                        style={{ position: 'absolute', bottom: 0, opacity: 0.8 }}
                        src={blurImg}
                        width={'100%'}
                        height={200}
                        alt='Hero'
                      />
                    )}
                    <div className='experience-container'>
                      <div className='duration-text'>
                        <p>{education.duration[currentLanguage]}</p>
                      </div>
                      <div className='details'>
                        <div className='icon'>
                          <FaGraduationCap size={36} />
                        </div>
                        <div className='info'>
                          <p className='title'>{education.title[currentLanguage]}</p>
                          <p className='company'>{education.company[currentLanguage]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col md={6} xs={12} className=' mt-md-5 mt-3'>
          <h3 className='mb-md-5 mb-2'>{t('about.findmeon')} </h3>
          <Socialmedia />
        </Col>
        <Col className='d-flex flex-column align-items-center justify-content-center' md={6} xs={12}>
          <AnimitionLottie animationPath={contact} width='80%' />
          <h4 className='text-center'>{t('about.contact')}</h4>
        </Col>
      </Row>
      <div className='mb-5'></div>
    </>
  )
}

export default About
