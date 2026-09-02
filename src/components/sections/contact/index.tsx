import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { APP_DATA } from '@/helpers/data'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaCopy, FaCheck } from 'react-icons/fa'
import Socialmedia from '@/components/sections/socialMedia'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError(true)
      return
    }

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(APP_DATA.EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

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
                      className='btn btn-sm p-0 text-muted d-inline-flex align-items-center gap-1'
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

              {submitted ? (
                <div
                  className='p-4 text-center rounded-4 my-auto'
                  style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-emerald)' }}
                >
                  <FaCheckCircle className='text-success mb-3' size={48} />
                  <h4 className='fw-bold text-success mb-2'>Thành công!</h4>
                  <p className='text-muted mb-0'>{t('contact.successMsg')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className='alert alert-danger py-2 px-3 small rounded-3 mb-3'>{t('contact.errorMsg')}</div>
                  )}

                  <Row className='gy-3 mb-3'>
                    <Col md={6}>
                      <label className='form-label small fw-semibold text-muted mb-1'>Họ và tên</label>
                      <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.namePlaceholder')}
                        className='form-control'
                        style={{
                          background: 'var(--bg-glass-input)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-primary)',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1rem'
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <label className='form-label small fw-semibold text-muted mb-1'>Email</label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.emailPlaceholder')}
                        className='form-control'
                        style={{
                          background: 'var(--bg-glass-input)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-primary)',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1rem'
                        }}
                      />
                    </Col>
                  </Row>

                  <div className='mb-3'>
                    <label className='form-label small fw-semibold text-muted mb-1'>Chủ đề</label>
                    <input
                      type='text'
                      name='subject'
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t('contact.subjectPlaceholder')}
                      className='form-control'
                      style={{
                        background: 'var(--bg-glass-input)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-primary)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem'
                      }}
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='form-label small fw-semibold text-muted mb-1'>Nội dung tin nhắn</label>
                    <textarea
                      name='message'
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      className='form-control'
                      style={{
                        background: 'var(--bg-glass-input)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-primary)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem'
                      }}
                    ></textarea>
                  </div>

                  <button type='submit' className='btn-glow-primary w-100 py-3'>
                    <FaPaperPlane size={16} />
                    <span>{t('contact.sendBtn')}</span>
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
