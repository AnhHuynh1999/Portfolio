import { IProjectItem } from '@/helpers/data'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

interface IProps extends IProjectItem {
  currentLanguage: 'vi' | 'en'
}

const ProjectCard = (props: IProps) => {
  const { t } = useTranslation()
  const description = props.description[props.currentLanguage] || props.description.vi

  return (
    <div className='col-12 col-md-6 col-lg-4 mb-4'>
      <div className='project-modern-card'>
        {/* Project Thumbnail Image */}
        <div className='project-img-wrapper'>
          <img src={props.imgPath} alt={props.title} />
          <span className='project-badge-tag'>{props.category}</span>
        </div>

        {/* Card Body */}
        <div className='project-card-body'>
          <h3 className='project-title'>{props.title}</h3>
          <p className='project-desc'>{description}</p>

          {/* Tech Stack Tags */}
          <div className='d-flex flex-wrap mb-3'>
            {props.tags.map((tag, idx) => (
              <span key={idx} className='tech-tag-pill'>
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='project-actions'>
            {props.demoLink && (
              <a href={props.demoLink} target='_blank' rel='noreferrer' className='btn btn-glow-primary'>
                <FaExternalLinkAlt size={13} />
                <span>{t('project.liveDemo')}</span>
              </a>
            )}

            {props.githubLink && (
              <a href={props.githubLink} target='_blank' rel='noreferrer' className='btn btn-glass-secondary'>
                <FaGithub size={15} />
                <span>{t('project.viewCode')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
