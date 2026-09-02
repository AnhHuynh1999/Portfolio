import { useState } from 'react'
import { SKILLS_DATA, SKILL_CATEGORIES } from '@/helpers/data'
import SkillImage from '@/helpers/skill.image'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'
import './skill.scss'

const Skill = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('all')

  const filterTabs = [
    { key: 'all', label: t('skill.all') },
    { key: 'frontend', label: t('skill.frontend') },
    { key: 'backend', label: t('skill.backend') },
    { key: 'tools', label: t('skill.tools') }
  ]

  const getFilteredSkills = () => {
    if (activeTab === 'all') return SKILLS_DATA
    if (activeTab === 'frontend') return SKILL_CATEGORIES[0].skills
    if (activeTab === 'backend') return SKILL_CATEGORIES[1].skills
    if (activeTab === 'tools') return SKILL_CATEGORIES[2].skills
    return SKILLS_DATA
  }

  const displayedSkills = getFilteredSkills()

  return (
    <section className='my-5 py-md-4'>
      {/* Section Header */}
      <div className='section-header'>
        <div className='section-badge'>{t('skill.badge')}</div>
        <h2 className='section-title'>{t('skill.title')}</h2>
        <p className='section-subtitle'>{t('skill.subtitle')}</p>
      </div>

      {/* Category Filter Pills */}
      <div className='filter-tabs-wrapper mb-4'>
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`filter-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Active Filtered Skills */}
      <div className='skills-modern-grid mb-5'>
        {displayedSkills.map((skill, index) => {
          const imgSrc = SkillImage(skill)
          return (
            <div key={`${skill}-${index}`} className='skill-modern-card'>
              <div className='skill-icon-wrapper'>
                {imgSrc ? (
                  <img width={46} height={46} src={imgSrc} alt={skill} />
                ) : (
                  <div className='skill-fallback-icon'>{skill.charAt(0)}</div>
                )}
              </div>
              <span className='skill-label'>{skill}</span>
            </div>
          )
        })}
      </div>

      {/* Infinite Smooth Marquee Showcase */}
      <div className='skills-marquee-container'>
        <div className='marquee-fade-left'></div>
        <Marquee gradient={false} speed={45} pauseOnHover={true} direction='left'>
          {SKILLS_DATA.map((skill, id) => {
            const imgSrc = SkillImage(skill)
            return (
              <div className='marquee-skill-item' key={id}>
                <div className='marquee-skill-pill'>
                  {imgSrc && <img width={28} height={28} src={imgSrc} alt={skill} />}
                  <span>{skill}</span>
                </div>
              </div>
            )
          })}
        </Marquee>
        <div className='marquee-fade-right'></div>
      </div>
    </section>
  )
}

export default Skill
