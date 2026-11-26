import { Link, useSearchParams } from 'react-router-dom'
import ProjectCard from '@/components/sections/project/project.card'
import { PROJECTS, IProjectItem } from '@/helpers/data'
import { Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'

type TLanguage = 'vi' | 'en'
type TCategory = IProjectItem['category']

// Derived once from static data: only categories/tags that actually exist (FR-004, FR-005).
const CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))]
const TECHS = [...new Set(PROJECTS.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b))
// Featured first, declaration order kept inside each group (sort is stable) — FR-008.
const SORTED = [...PROJECTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
const countIn = (category: TCategory) => PROJECTS.filter((p) => p.category === category).length

interface IProps {
  /** Home page mode: up to 3 featured projects, no filters (FR-007). */
  featuredOnly?: boolean
}

const Project = ({ featuredOnly }: IProps) => {
  const { t, i18n } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage || 'vi') as TLanguage
  const [searchParams, setSearchParams] = useSearchParams()

  // Filters live in the URL (FR-005a); unknown values are ignored.
  const rawCategory = searchParams.get('category')
  const category = CATEGORIES.find((c) => c === rawCategory) ?? null
  const rawTech = searchParams.get('tech')
  const tech = rawTech && TECHS.includes(rawTech) ? rawTech : null

  const setFilter = (key: 'category' | 'tech', value: string | null) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true, preventScrollReset: true })
  }
  const toggleTech = (tag: string) => setFilter('tech', tag === tech ? null : tag)
  const clearFilters = () => setSearchParams({}, { replace: true, preventScrollReset: true })

  const featured = PROJECTS.filter((p) => p.featured)
  const projects = featuredOnly
    ? (featured.length ? featured : PROJECTS).slice(0, 3)
    : SORTED.filter((p) => (!category || p.category === category) && (!tech || p.tags.includes(tech)))

  return (
    <section className='my-5 py-md-4'>
      {/* Section Header */}
      <div className='section-header'>
        <div className='section-badge'>{t('project.badge')}</div>
        <h2 className='section-title'>{t('project.title')}</h2>
        <p className='section-subtitle'>{t('project.description')}</p>
      </div>

      {!featuredOnly && (
        <>
          {/* Category Filter Tabs */}
          <div className='filter-tabs-wrapper mb-3'>
            <button
              type='button'
              className={`filter-tab-btn ${!category ? 'active' : ''}`}
              aria-pressed={!category}
              onClick={() => setFilter('category', null)}
            >
              {t('project.all')} <span className='filter-count'>{PROJECTS.length}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type='button'
                className={`filter-tab-btn ${category === c ? 'active' : ''}`}
                aria-pressed={category === c}
                onClick={() => setFilter('category', c)}
              >
                {t(`project.${c.toLowerCase()}`)} <span className='filter-count'>{countIn(c)}</span>
              </button>
            ))}
          </div>

          {/* Tech Filter (single select) */}
          <div className='tech-filter-wrapper mb-4' role='group' aria-label={t('project.filterTech')}>
            {TECHS.map((tag) => (
              <button
                key={tag}
                type='button'
                className={`tech-tag-pill tech-tag-btn ${tech === tag ? 'active' : ''}`}
                aria-pressed={tech === tag}
                onClick={() => toggleTech(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <Row className='gy-4'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              currentLanguage={currentLanguage}
              activeTag={tech}
              onTagClick={featuredOnly ? undefined : toggleTech}
            />
          ))}
        </Row>
      ) : (
        <div className='project-empty-state' role='status'>
          <p>{t('project.empty')}</p>
          <button type='button' className='btn btn-glass-secondary' onClick={clearFilters}>
            {t('project.clearFilters')}
          </button>
        </div>
      )}

      {featuredOnly && (
        <div className='text-center mt-2'>
          <Link to='/project' className='btn btn-glow-primary project-view-all'>
            <span>{t('project.viewAll')}</span>
            <FaArrowRight size={12} aria-hidden />
          </Link>
        </div>
      )}
    </section>
  )
}

export default Project
