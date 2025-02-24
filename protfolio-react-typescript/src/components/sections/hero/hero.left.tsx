import './hero.scss'
import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'
import ResizeButton from '@/components/sections/resizeButton'
import { AiFillFire } from 'react-icons/ai'
import { MdFileDownload } from 'react-icons/md'
import Socialmedia from '@/components/sections/socialMedia'
import openInNewTab from '@/helpers/openTab'

interface IProps {
  scrollToExperienceSection: () => void
}
const HeroLeft = (props: IProps) => {
  const { t } = useTranslation()

  const handleDownloadCV = () => {
    openInNewTab('https://drive.google.com/file/d/1GcWrg0EzjCvtzq4ySH6ir882OHTFVUuh/view?usp=sharing')
  }
  return (
    <div className='hero-left'>
      <h3>
        Hi There!{' '}
        <span className='wave' role='img' aria-labelledby='wave'>
          👋🏻
        </span>
      </h3>
      <h3 style={{ paddingTop: '10px', paddingBottom: '5px' }}>
        I'M &nbsp; <strong className='brand-red'>{t('appHeader.brand')}</strong>
      </h3>
      <Typewriter
        options={{
          strings: ['Software Developer', 'Freelancer', 'MERN Stack Developer', 'Open Source Contributor'],
          autoStart: true,
          loop: true,
          deleteSpeed: 50,
          wrapperClassName: 'brand-green'
        }}
      />
      <div className='mt-md-6 mt-3 mb-md-5 mb-2'>
        <Socialmedia />
      </div>
      <div className='d-md-flex d-none gap-4'>
        <ResizeButton
          onClick={props.scrollToExperienceSection}
          btnText={t('heroSection.exp')}
          btnIcons={<AiFillFire style={{ color: 'orange' }} />}
          btnStyle={{
            background: 'unset',
            border: '1px solid var(--border-hero-right)',
            color: 'var(--text-white-1)'
          }}
        />
        <ResizeButton btnText={t('heroSection.cv')} onClick={handleDownloadCV} btnIcons={<MdFileDownload />} />
      </div>
    </div>
  )
}

export default HeroLeft
