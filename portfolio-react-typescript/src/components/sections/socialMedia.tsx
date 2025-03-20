import { APP_DATA } from '@/helpers/data'
import { FaFacebook, FaGithub, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Socialmedia = () => {
  return (
    <div className='my-4 d-flex items-center gap-3'>
      <Link className='highlight' target='_blank' to={APP_DATA.YOUTUBE_URL}>
        <FaYoutube size={30} />
      </Link>
      <Link className='highlight' target='_blank' to={APP_DATA.GITHUB_URL}>
        <FaGithub size={30} />
      </Link>
      <Link className='highlight' target='_blank' to={APP_DATA.FACEBOOK_URL}>
        <FaFacebook size={30} />
      </Link>
      <Link className='highlight' target='_blank' to={APP_DATA.INSTAGRAM_URL}>
        <FaInstagram size={30} />
      </Link>
      <Link className='highlight' target='_blank' to={APP_DATA.TIKTOK_URL}>
        <FaTiktok size={30} />
      </Link>
    </div>
  )
}

export default Socialmedia
