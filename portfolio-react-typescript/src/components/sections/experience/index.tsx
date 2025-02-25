import { Col, Row } from 'react-bootstrap'
import experienceJSON from 'assets/lottie/laptop-fe.json'
import AnimitionLottie from '@/components/share/animation-lottie'
import { EXPERIENCES } from '@/helpers/data'
import GlowCard from '@/components/share/glow-card'
import { useTranslation } from 'react-i18next'
import { userCurrentApp } from '@/components/context/app.context'
import blurImg from 'assets/svg/blur.svg'
import { BsPersonWorkspace } from 'react-icons/bs'

type TLanguage = 'vi' | 'en'
const Experience = () => {
  const { t, i18n } = useTranslation()
  const { theme } = userCurrentApp()
  const currentLanguage = i18n.resolvedLanguage as TLanguage
  return (
    <Row className='md-5'>
      <Col xs={12} className='my-3 my-md-5'>
        <div className='text-center'>
          <h3>{t('experience.title')}</h3>
        </div>
      </Col>
      <Col md={6} xs={12} className='d-flex align-items-center justify-content-center'>
        <AnimitionLottie animationPath={experienceJSON} width='50%' />
      </Col>
      <Col md={6} xs={12}>
        <div className='d-flex flex-column gap-5'>
          {EXPERIENCES.map((experience) => (
            <GlowCard key={experience.id} identifier={`glow-container-experience-${experience.id}`}>
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
                    <p>{experience.duration[currentLanguage]}</p>
                  </div>
                  <div className='details'>
                    <div className='icon'>
                      <BsPersonWorkspace size={36} />
                    </div>
                    <div className='info'>
                      <p className='title'>{experience.title[currentLanguage]}</p>
                      <p className='company'>{experience.company[currentLanguage]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </Col>
    </Row>
  )
}
export default Experience
