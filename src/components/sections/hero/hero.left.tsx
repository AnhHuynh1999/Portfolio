import './hero.scss'
import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'
import { MdFileDownload, MdWorkOutline } from 'react-icons/md'
import Socialmedia from '@/components/sections/socialMedia'
import openInNewTab from '@/helpers/openTab'
import { CV_LINK, APP_DATA } from '@/helpers/data'
import { Link } from 'react-router-dom'

interface IProps {
  scrollToExperienceSection?: () => void
}

const HeroLeft = (props: IProps) => {
  const { t, i18n } = useTranslation()

  const handleDownloadCV = () => {
    openInNewTab(CV_LINK)
  }

  return (
    <div className='hero-left-wrapper'>
      {/* Availability Badge */}
      <div className='status-badge-pulse'>
        <span className='pulse-dot'></span>
        <span>{t('heroSection.available')}</span>
      </div>

      {/* Main Greeting & Name */}
      <div className='hero-greeting'>
        <h3 className='hero-greeting-sub'>
          {t('heroSection.hi')}{' '}
          <span className='wave-emoji' role='img' aria-label='wave'>
            👋
          </span>
        </h3>
        <h1 className='hero-name-title'>
          <span className='gradient-text'>{APP_DATA.NAME}</span>
        </h1>
      </div>

      {/* Dynamic Typewriter Role */}
      <div className='hero-typewriter-container'>
        <Typewriter
          options={{
            strings:
              i18n.resolvedLanguage === 'vi'
                ? [
                    'Kỹ Sư Fullstack Developer',
                    'Chuyên Gia React & Next.js',
                    'Backend NestJS & Node.js',
                    'Kiến Trúc Sư Phần Mềm'
                  ]
                : [
                    'Senior Fullstack Developer',
                    'React & Next.js Specialist',
                    'NestJS & Node.js Engineer',
                    'Solution Architect'
                  ],
            autoStart: true,
            loop: true,
            deleteSpeed: 40,
            delay: 75,
            wrapperClassName: 'hero-typewriter-text'
          }}
        />
      </div>

      {/* Short Bio Description */}
      <p className='hero-bio-desc'>{t('heroSection.description')}</p>

      {/* Social Links */}
      <div className='my-4'>
        <Socialmedia />
      </div>

      {/* Call to Actions */}
      <div className='d-flex flex-wrap gap-3 mt-4'>
        <button onClick={handleDownloadCV} className='btn-glow-primary' title='Download Resume'>
          <MdFileDownload size={20} />
          <span>{t('heroSection.cv')}</span>
        </button>

        {props.scrollToExperienceSection ? (
          <button onClick={props.scrollToExperienceSection} className='btn-glass-secondary' title='View Experience'>
            <MdWorkOutline size={18} />
            <span>{t('heroSection.exp')}</span>
          </button>
        ) : (
          <Link to='/project' className='btn-glass-secondary' title='Explore Projects'>
            <MdWorkOutline size={18} />
            <span>{t('heroSection.projects')}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default HeroLeft
