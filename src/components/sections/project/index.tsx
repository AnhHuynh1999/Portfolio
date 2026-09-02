import { useState } from 'react'
import ProjectCard from '@/components/sections/project/project.card'
import { PROJECTS } from '@/helpers/data'
import { Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

type TLanguage = 'vi' | 'en'

const Project = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage || 'vi') as TLanguage
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { key: 'all', label: t('project.all') },
    { key: 'Fullstack', label: t('project.fullstack') },
    { key: 'Mobile', label: t('project.mobile') }
  ]

  const filteredProjects =
    selectedCategory === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === selectedCategory)

  return (
    <section className='my-5 py-md-4'>
      {/* Section Header */}
      <div className='section-header'>
        <div className='section-badge'>{t('project.badge')}</div>
        <h2 className='section-title'>{t('project.title')}</h2>
        <p className='section-subtitle'>{t('project.description')}</p>
      </div>

      {/* Category Filter Tabs */}
      <div className='filter-tabs-wrapper mb-4'>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-tab-btn ${selectedCategory === cat.key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <Row className='gy-4'>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} currentLanguage={currentLanguage} />
        ))}
      </Row>
    </section>
  )
}

export default Project
