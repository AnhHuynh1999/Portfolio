import { APP_DATA } from '@/helpers/data'
import { FaFacebook, FaGithub, FaInstagram, FaTiktok, FaYoutube, FaTelegram } from 'react-icons/fa'

const Socialmedia = () => {
  return (
    <div className='d-flex align-items-center flex-wrap gap-3'>
      <a
        className='social-icon-btn github'
        target='_blank'
        rel='noreferrer'
        href={APP_DATA.GITHUB_URL}
        title='GitHub Profile'
      >
        <FaGithub size={20} />
      </a>
      <a
        className='social-icon-btn facebook'
        target='_blank'
        rel='noreferrer'
        href={APP_DATA.FACEBOOK_URL}
        title='Facebook Profile'
      >
        <FaFacebook size={20} />
      </a>
      <a
        className='social-icon-btn instagram'
        target='_blank'
        rel='noreferrer'
        href={APP_DATA.INSTAGRAM_URL}
        title='Instagram Profile'
      >
        <FaInstagram size={20} />
      </a>
      <a
        className='social-icon-btn youtube'
        target='_blank'
        rel='noreferrer'
        href={APP_DATA.YOUTUBE_URL}
        title='YouTube Channel'
      >
        <FaYoutube size={20} />
      </a>
      <a
        className='social-icon-btn tiktok'
        target='_blank'
        rel='noreferrer'
        href={APP_DATA.TIKTOK_URL}
        title='TikTok Profile'
      >
        <FaTiktok size={20} />
      </a>
      <a
        className='social-icon-btn telegram'
        target='_blank'
        rel='noreferrer'
        href={APP_DATA.TELEGRAM_URL}
        title='Telegram Chat'
      >
        <FaTelegram size={20} />
      </a>
    </div>
  )
}

export default Socialmedia
