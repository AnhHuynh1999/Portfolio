import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { APP_DATA } from '@/helpers/data'
import { validateContact, type ContactError } from '@/helpers/contact'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaCopy, FaCheck } from 'react-icons/fa'
import Socialmedia from '@/components/sections/socialMedia'

type TField = 'name' | 'email' | 'subject' | 'message'
type TStatus = 'idle' | 'sending' | 'sent' | 'failed' | 'rateLimited'
const EMPTY = { name: '', email: '', subject: '', message: '', website: '' }

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<TField, ContactError>>>({})
  const [status, setStatus] = useState<TStatus>('idle')
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name as TField]) setErrors({ ...errors, [name]: undefined })
    if (status === 'failed' || status === 'rateLimited') setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    const result = validateContact(formData)
    if (!result.ok) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...result.value, website: formData.website })
      })
      if (res.ok) {
        setStatus('sent')
        setFormData(EMPTY)
        return
      }
      if (res.status === 400) {
        const data = await res.json().catch(() => null)
        if (data?.errors) {
          setErrors(data.errors)
          setStatus('idle')
          return
        }
      }
      setStatus(res.status === 429 ? 'rateLimited' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(APP_DATA.EMAIL).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const field = (name: TField, required = true) => ({
    id: `contact-${name}`,
    name,
    value: formData[name],
    onChange: handleChange,
    required,
    className: `form-control glass-input${errors[name] ? ' is-invalid' : ''}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined
  })

  const fieldError = (name: TField) =>
    errors[name] && (
      <div id={`contact-${name}-error`} className='invalid-feedback d-block'>
        {t(`contact.errors.${errors[name]}`)}
      </div>
    )

  return (
    <section id='contact-section' className='my-5 py-md-4'>
      <Container>
        {/* Section Header */}
        <div className='section-header'>
          <div className='section-badge'>{t('contact.badge')}</div>
          <h2 className='section-title'>{t('contact.title')}</h2>
          <p className='section-subtitle'>{t('contact.subtitle')}</p>
        </div>

        <Row className='gy-5 align-items-stretch'>
          {/* Left Column: Direct Contact Info */}
          <Col lg={5}>
            <div className='glass-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between'>
              <div>
                <h3 className='fw-bold mb-4' style={{ fontSize: '1.5rem' }}>
                  {t('about.findmeon')}
                </h3>

                {/* Email Card */}
                <div className='d-flex align-items-start gap-3 mb-4'>
                  <div
                    className='social-icon-btn'
                    style={{
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: 'var(--accent-cyan)',
                      borderColor: 'var(--accent-cyan)'
                    }}
                  >
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <div className='text-muted small fw-semibold'>{t('contact.emailLabel')}</div>
                    <div className='fw-bold text-primary mb-1' style={{ fontSize: '0.95rem' }}>
                      {APP_DATA.EMAIL}
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className='btn btn-sm p-0 text-muted d-inline-flex align-items-center gap-1 contact-copy-btn'
                      style={{ fontSize: '0.8rem' }}
                    >
                      {copied ? (
                        <>
                          <FaCheck className='text-success' />
                          <span className='text-success'>{t('contact.copiedEmail')}</span>
                        </>
                      ) : (
                        <>
                          <FaCopy />
                          <span>{t('contact.copyEmail')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone Card */}
                <div className='d-flex align-items-start gap-3 mb-4'>
                  <div
                    className='social-icon-btn'
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--accent-emerald)',
                      borderColor: 'var(--accent-emerald)'
                    }}
                  >
                    <FaPhoneAlt size={16} />
                  </div>
                  <div>
                    <div className='text-muted small fw-semibold'>{t('contact.phoneLabel')}</div>
                    <div className='fw-bold' style={{ fontSize: '0.95rem' }}>
                      {APP_DATA.PHONE}
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className='d-flex align-items-start gap-3 mb-4'>
                  <div
                    className='social-icon-btn'
                    style={{
                      background: 'rgba(236, 72, 153, 0.15)',
                      color: 'var(--accent-pink)',
                      borderColor: 'var(--accent-pink)'
                    }}
                  >
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <div className='text-muted small fw-semibold'>{t('contact.locationLabel')}</div>
                    <div className='fw-bold' style={{ fontSize: '0.95rem' }}>
                      {APP_DATA.LOCATION}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className='pt-3 border-top border-subtle'>
                <div className='text-muted small fw-semibold mb-3'>{t('contact.socialLabel')}</div>
                <Socialmedia />
              </div>
            </div>
          </Col>

          {/* Right Column: Interactive Quick Message Form */}
          <Col lg={7}>
            <div className='glass-card p-4 p-md-5 h-100'>
              <h3 className='fw-bold mb-4' style={{ fontSize: '1.5rem' }}>
                {t('contact.badge')}
              </h3>

              {status === 'sent' ? (
                <div className='contact-result' role='status'>
                  <FaCheckCircle className='text-success mb-3' size={48} aria-hidden />
                  <h4 className='fw-bold text-success mb-2'>{t('contact.form.successTitle')}</h4>
                  <p className='text-muted mb-3'>{t('contact.successMsg')}</p>
                  <button type='button' className='btn-glass-secondary' onClick={() => setStatus('idle')}>
                    {t('contact.sendBtn')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {(status === 'failed' || status === 'rateLimited') && (
                    <div className='alert alert-danger py-3 px-3 small rounded-3 mb-3' role='alert'>
                      <div className='fw-bold mb-1'>{t('contact.form.failTitle')}</div>
                      <div className='mb-2'>
                        {t(status === 'rateLimited' ? 'contact.form.rateLimited' : 'contact.form.failDesc')}{' '}
                        <strong>{APP_DATA.EMAIL}</strong>
                      </div>
                      <button type='button' onClick={handleCopyEmail} className='btn-glass-secondary'>
                        {copied ? <FaCheck aria-hidden /> : <FaCopy aria-hidden />}
                        <span>{t(copied ? 'contact.copiedEmail' : 'contact.copyEmail')}</span>
                      </button>
                    </div>
                  )}

                  {/* Honeypot: hidden from people and screen readers, bots fill it. */}
                  <div className='contact-hp' aria-hidden='true'>
                    <label htmlFor='contact-website'>Website</label>
                    <input
                      id='contact-website'
                      type='text'
                      name='website'
                      tabIndex={-1}
                      autoComplete='off'
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <Row className='gy-3 mb-3'>
                    <Col md={6}>
                      <label htmlFor='contact-name' className='form-label small fw-semibold text-muted mb-1'>
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type='text'
                        autoComplete='name'
                        maxLength={100}
                        {...field('name')}
                        placeholder={t('contact.namePlaceholder')}
                      />
                      {fieldError('name')}
                    </Col>
                    <Col md={6}>
                      <label htmlFor='contact-email' className='form-label small fw-semibold text-muted mb-1'>
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type='email'
                        autoComplete='email'
                        maxLength={254}
                        {...field('email')}
                        placeholder={t('contact.emailPlaceholder')}
                      />
                      {fieldError('email')}
                    </Col>
                  </Row>

                  <div className='mb-3'>
                    <label htmlFor='contact-subject' className='form-label small fw-semibold text-muted mb-1'>
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type='text'
                      maxLength={150}
                      {...field('subject', false)}
                      placeholder={t('contact.form.subjectPlaceholder')}
                    />
                    {fieldError('subject')}
                  </div>

                  <div className='mb-4'>
                    <label htmlFor='contact-message' className='form-label small fw-semibold text-muted mb-1'>
                      {t('contact.form.message')} *
                    </label>
                    <textarea rows={4} {...field('message')} placeholder={t('contact.messagePlaceholder')}></textarea>
                    {fieldError('message')}
                  </div>

                  <button type='submit' className='btn-glow-primary w-100 py-3' disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <span className='spinner-border spinner-border-sm' aria-hidden />
                    ) : (
                      <FaPaperPlane size={16} aria-hidden />
                    )}
                    <span>{t(status === 'sending' ? 'contact.sending' : 'contact.sendBtn')}</span>
                  </button>
                </form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
