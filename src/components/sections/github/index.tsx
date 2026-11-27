import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaRegStar, FaCodeBranch } from 'react-icons/fa'
import { APP_DATA } from '@/helpers/data'

const USER = 'AnhHuynh1999'
const CACHE_KEY = 'gh:repos'
const TTL_MS = 3600 * 1000

interface IRepo {
  name: string
  description?: string
  language?: string
  stars: number
  pushedAt: string
  url: string
}
interface IGithubData {
  total: number
  repos: IRepo[]
}
interface IGithubRepoResponse {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  html_url: string
  fork: boolean
}

const readCache = (): IGithubData | null => {
  try {
    const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null')
    return c && Date.now() - c.t < TTL_MS ? c.data : null
  } catch {
    return null
  }
}

const load = async (): Promise<IGithubData> => {
  const cached = readCache()
  if (cached) return cached
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`),
    fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=30`)
  ])
  if (!userRes.ok || !reposRes.ok) throw new Error(`github ${userRes.status}/${reposRes.status}`)
  const user = await userRes.json()
  const list: IGithubRepoResponse[] = await reposRes.json()
  const repos = list
    .filter((r) => !r.fork)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, 6)
    .map<IRepo>((r) => ({
      name: r.name,
      description: r.description ?? undefined,
      language: r.language ?? undefined,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      url: r.html_url
    }))
  const data = { total: user.public_repos ?? repos.length, repos }
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }))
  } catch {
    /* storage blocked: just refetch next time */
  }
  return data
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60]
]
const relative = (iso: string, lang: string) => {
  const secs = (new Date(iso).getTime() - Date.now()) / 1000
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  for (const [unit, size] of UNITS) {
    if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit)
  }
  return rtf.format(0, 'minute')
}

const GithubActivity = () => {
  const { t, i18n } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [data, setData] = useState<IGithubData | null>(null)

  // Fetch only when the section is about to scroll into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setState('loading')
        load()
          .then((d) => {
            setData(d)
            setState('ok')
          })
          .catch(() => setState('error'))
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className='my-5 py-md-4'>
      <div className='section-header'>
        <div className='section-badge'>{t('github.badge')}</div>
        <h2 className='section-title'>{t('github.title')}</h2>
        <p className='section-subtitle'>{t('github.subtitle')}</p>
      </div>

      {state === 'error' ? (
        <div className='glass-card p-4 text-center'>
          <p className='text-muted mb-3'>{t('github.fallback')}</p>
          <a href={APP_DATA.GITHUB_URL} target='_blank' rel='noopener noreferrer' className='btn-glass-secondary'>
            <FaGithub aria-hidden />
            <span>{t('github.viewProfile')}</span>
          </a>
        </div>
      ) : (
        <>
          {data && data.repos.length > 0 && (
            <p className='github-summary text-center'>
              {t('github.summary', { count: data.total, when: relative(data.repos[0].pushedAt, i18n.language) })}
            </p>
          )}
          <Row className='g-4' aria-busy={state !== 'ok'}>
            {(data?.repos ?? Array.from({ length: 6 }, () => null)).map((repo, i) => (
              <Col key={repo?.name ?? i} xs={12} md={6} lg={4}>
                {repo ? (
                  <article className='glass-card github-card p-4 h-100'>
                    <h3 className='github-card-title'>
                      <FaCodeBranch aria-hidden />
                      <a href={repo.url} target='_blank' rel='noopener noreferrer'>
                        {repo.name}
                      </a>
                    </h3>
                    {repo.description && <p className='github-card-desc'>{repo.description}</p>}
                    <div className='github-card-meta'>
                      {repo.language && (
                        <span>
                          <span className='github-lang-dot' aria-hidden />
                          {repo.language}
                        </span>
                      )}
                      <span>
                        <FaRegStar aria-hidden /> {repo.stars}{' '}
                        <span className='visually-hidden'>{t('github.stars')}</span>
                      </span>
                      <span>
                        {t('github.pushed')} {relative(repo.pushedAt, i18n.language)}
                      </span>
                    </div>
                  </article>
                ) : (
                  <div className='glass-card github-card p-4 h-100 placeholder-glow' aria-hidden>
                    <span className='placeholder col-7 mb-3 rounded' />
                    <span className='placeholder col-12 mb-2 rounded' />
                    <span className='placeholder col-9 mb-4 rounded' />
                    <span className='placeholder col-5 rounded' />
                  </div>
                )}
              </Col>
            ))}
          </Row>
          {data && (
            <div className='text-center mt-4'>
              <a href={APP_DATA.GITHUB_URL} target='_blank' rel='noopener noreferrer' className='btn-glass-secondary'>
                <FaGithub aria-hidden />
                <span>{t('github.viewProfile')}</span>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GithubActivity
