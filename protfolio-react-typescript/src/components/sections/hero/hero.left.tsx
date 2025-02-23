import './hero.scss'
import Typewriter from 'typewriter-effect'
import { Link } from 'react-router-dom'
import { LuYoutube } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import ResizeButton from '@/components/sections/resizeButton'
import { AiFillFire } from 'react-icons/ai'
import { MdFileDownload } from 'react-icons/md'
import { APP_DATA } from '@/helpers/data'
import { DiGithub } from 'react-icons/di'
import { FaFacebook, FaGithub, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

interface IProps {
  scrollToExperienceSection: () => void
}
const HeroLeft = (props: IProps) => {
  const { t } = useTranslation()

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
        <div className='my-4 d-flex items-center gap-3'>
          <Link className='highlight' to={APP_DATA.YOUTUBE_URL}>
            <FaYoutube size={30} />
          </Link>
          <Link className='highlight' to={APP_DATA.GITHUB_URL}>
            <FaGithub size={30} />
          </Link>
          <Link className='highlight' to={APP_DATA.FACEBOOK_URL}>
            <FaFacebook size={30} />
          </Link>
          <Link className='highlight' to={APP_DATA.INSTAGRAM_URL}>
            <FaInstagram size={30} />
          </Link>
          <Link className='highlight' to={APP_DATA.TIKTOK_URL}>
            <FaTiktok size={30} />
          </Link>
        </div>
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
        <ResizeButton btnText={t('heroSection.cv')} btnIcons={<MdFileDownload />} />
      </div>
    </div>
  )
}

export default HeroLeft
