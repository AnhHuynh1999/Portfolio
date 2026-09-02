import About from '@/components/sections/about'
import { Container } from 'react-bootstrap'

const AboutPage = () => {
  return (
    <div className='about-page-container py-4 py-md-5'>
      <Container>
        <About />
      </Container>
    </div>
  )
}

export default AboutPage
