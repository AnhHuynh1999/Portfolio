import { Container, Row, Col } from 'react-bootstrap'
import HeroLeft from 'components/sections/hero/hero.left'
import HeroRight from 'components/sections/hero/hero.right'
import Introduction from '@/components/sections/introduction'
import Experience from '@/components/sections/experience'
import Skill from '@/components/sections/skill'
import Project from '@/components/sections/project'
import Contact from '@/components/sections/contact'
import { useRef } from 'react'

const HomePage = () => {
  const expRef = useRef<HTMLElement>(null)

  const scrollToExperienceSection = () => {
    expRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='homepage-screen'>
      {/* 1. Hero Section */}
      <section className='hero-section py-4 py-md-5'>
        <Container>
          <Row className='align-items-center gy-5'>
            <Col xs={12} lg={6}>
              <HeroLeft scrollToExperienceSection={scrollToExperienceSection} />
            </Col>
            <Col xs={12} lg={6}>
              <HeroRight />
            </Col>
          </Row>
        </Container>
      </section>

      <div className='section-divider'></div>

      {/* 2. Key Metrics & Introduction Section */}
      <section className='py-4'>
        <Container>
          <Introduction />
        </Container>
      </section>

      <div className='section-divider'></div>

      {/* 3. Skills Showcase */}
      <section className='py-4'>
        <Container>
          <Skill />
        </Container>
      </section>

      <div className='section-divider'></div>

      {/* 4. Experience Timeline */}
      <section ref={expRef} className='py-4'>
        <Container>
          <Experience />
        </Container>
      </section>

      <div className='section-divider'></div>

      {/* 5. Featured Projects */}
      <section className='py-4'>
        <Container>
          <Project />
        </Container>
      </section>

      <div className='section-divider'></div>

      {/* 6. Contact & Quick Connect */}
      <section className='py-4'>
        <Container>
          <Contact />
        </Container>
      </section>
    </div>
  )
}

export default HomePage
