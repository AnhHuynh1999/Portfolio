import { SKILLS_DATA } from '@/helpers/data'
import SkillImage from '@/helpers/skill.image'
import { Col, Row } from 'react-bootstrap'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'

const Skill = () => {
  const { t } = useTranslation()
  return (
    <Row className='skills-container'>
      <Col xs={12} className='my-3 my-md-5'>
        <div className='text-center'>
          <h3>{t('skill.title')}</h3>
        </div>
      </Col>
      <Col xs={12} className='skills-marquee'>
        <Marquee
          gradient={false}
          speed={50}
          pauseOnClick={true}
          pauseOnHover={true}
          delay={0}
          play={true}
          direction='left'
        >
          {SKILLS_DATA.map((skill, id) => (
            <div className='skill-item' key={id}>
              <div className='skill-card'>
                <img width={40} height={40} src={SkillImage(skill)} alt={skill} />
                <p className='skill-name'>{skill}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </Col>
    </Row>
  )
}

export default Skill
