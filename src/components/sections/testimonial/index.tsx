import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaQuoteLeft } from 'react-icons/fa'
import { ITestimonial, TESTIMONIALS } from '@/helpers/data'

const LONG_QUOTE = 400

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0].toUpperCase())
    .join('')

const TestimonialCard = ({ item }: { item: ITestimonial }) => {
  const { t, i18n } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const quote = item.quote[lang] || item.quote.vi
  const role = item.role[lang] || item.role.vi
  const long = quote.length > LONG_QUOTE

  return (
    <figure className='glass-card testimonial-card p-4 h-100 mb-0 d-flex flex-column'>
      <FaQuoteLeft className='testimonial-quote-icon' aria-hidden />
      <blockquote className={`testimonial-quote ${long && !expanded ? 'is-clamped' : ''}`}>{quote}</blockquote>
      {long && (
        <button
          type='button'
          className='testimonial-more'
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {t(expanded ? 'testimonial.readLess' : 'testimonial.readMore')}
        </button>
      )}
      <figcaption className='d-flex align-items-center gap-3 mt-auto pt-3'>
        {item.avatar ? (
          <img src={item.avatar} alt='' className='testimonial-avatar' width={48} height={48} loading='lazy' />
        ) : (
          <span className='testimonial-avatar testimonial-initials' aria-hidden>
            {initials(item.name)}
          </span>
        )}
        <div className='min-w-0'>
          <div className='fw-bold'>
            {item.link ? (
              <a href={item.link} target='_blank' rel='noopener noreferrer'>
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </div>
          <div className='testimonial-role'>
            {role} · {t(`testimonial.${item.relation}`)}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}

const Testimonial = () => {
  const { t } = useTranslation()
  if (TESTIMONIALS.length === 0) return null

  return (
    <div id='testimonials' className='my-5 py-md-4'>
      <div className='section-header'>
        <div className='section-badge'>{t('testimonial.badge')}</div>
        <h2 className='section-title'>{t('testimonial.title')}</h2>
        <p className='section-subtitle'>{t('testimonial.subtitle')}</p>
      </div>
      <Row className='g-4'>
        {TESTIMONIALS.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4}>
            <TestimonialCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Testimonial
