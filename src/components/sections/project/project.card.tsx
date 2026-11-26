import { ImgHTMLAttributes, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { IProjectItem } from '@/helpers/data'
import fallbackImg from '@/assets/logo.png'
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaLock } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget
  if (img.dataset.fallback) return
  img.dataset.fallback = '1'
  img.src = fallbackImg
}

export const ProjectImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img loading='lazy' decoding='async' {...props} onError={handleImgError} />
)

// Only renders links that really belong to the project (FR-009).
export const ProjectLinks = ({ project }: { project: IProjectItem }) => {
  const { t } = useTranslation()
  return (
    <>
      {project.demoLink && (
        <a href={project.demoLink} target='_blank' rel='noreferrer' className='btn btn-glass-secondary'>
          <FaExternalLinkAlt size={13} aria-hidden />
          <span>{t('project.liveDemo')}</span>
        </a>
      )}
      {project.privateSource ? (
        <span className='btn btn-glass-secondary project-private-label' aria-disabled='true'>
          <FaLock size={13} aria-hidden />
          <span>{t('project.privateSource')}</span>
        </span>
      ) : (
        project.githubLink && (
          <a href={project.githubLink} target='_blank' rel='noreferrer' className='btn btn-glass-secondary'>
            <FaGithub size={15} aria-hidden />
            <span>{t('project.viewCode')}</span>
          </a>
        )
      )}
    </>
  )
}

interface IProps extends IProjectItem {
  currentLanguage: 'vi' | 'en'
  activeTag?: string | null
  onTagClick?: (tag: string) => void
}

const ProjectCard = (props: IProps) => {
  const { t } = useTranslation()
  const description = props.description[props.currentLanguage] || props.description.vi
  const detailUrl = `/project/${props.slug}`

  return (
    <div className='col-12 col-md-6 col-lg-4 mb-4'>
      <article className='project-modern-card'>
        {/* Project Thumbnail Image */}
        <div className='project-img-wrapper'>
          <ProjectImage src={props.imgPath} alt={props.title} />
          <span className='project-badge-tag'>{props.category}</span>
          {props.featured && <span className='project-featured-tag'>{t('project.featured')}</span>}
        </div>

        {/* Card Body */}
        <div className='project-card-body'>
          <h3 className='project-title'>
            <Link to={detailUrl}>{props.title}</Link>
          </h3>
          <p className='project-desc'>{description}</p>

          {/* Tech Stack Tags — clickable filters on the projects page */}
          <div className='d-flex flex-wrap mb-3'>
            {props.tags.map((tag) =>
              props.onTagClick ? (
                <button
                  key={tag}
                  type='button'
                  className={`tech-tag-pill tech-tag-btn ${props.activeTag === tag ? 'active' : ''}`}
                  aria-pressed={props.activeTag === tag}
                  onClick={() => props.onTagClick?.(tag)}
                >
                  {tag}
                </button>
              ) : (
                <span key={tag} className='tech-tag-pill'>
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Action Buttons */}
          <div className='project-actions'>
            <Link
              to={detailUrl}
              className='btn btn-glow-primary'
              aria-label={`${t('project.viewDetail')}: ${props.title}`}
            >
              <span>{t('project.viewDetail')}</span>
              <FaArrowRight size={12} aria-hidden />
            </Link>
            <ProjectLinks project={props} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProjectCard
