import { useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'
import { APP_DATA, CV_LINK, PROJECTS } from '@/helpers/data'
import { matches } from '@/helpers/search'
import openInNewTab from '@/helpers/openTab'
import { useCurrentApp } from '@/components/context/app.context'

type TGroup = 'page' | 'project' | 'action'
interface IPaletteItem {
  id: string
  group: TGroup
  label: string
  hint?: string
  keywords: string[]
  run: () => void
}

const GROUPS: TGroup[] = ['page', 'project', 'action']

const CommandPalette = ({ show, onHide }: { show: boolean; onHide: () => void }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { theme, setTheme } = useCurrentApp()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const items = useMemo<IPaletteItem[]>(() => {
    const go = (path: string) => () => navigate(path)
    const list: IPaletteItem[] = [
      { id: 'home', group: 'page', label: t('appHeader.home'), keywords: ['home', 'trang chu'], run: go('/') },
      {
        id: 'projects',
        group: 'page',
        label: t('appHeader.project'),
        keywords: ['projects', 'du an'],
        run: go('/project')
      },
      { id: 'about', group: 'page', label: t('appHeader.about'), keywords: ['about', 'gioi thieu'], run: go('/about') },
      ...PROJECTS.map<IPaletteItem>((p) => ({
        id: `p-${p.slug}`,
        group: 'project',
        label: p.title,
        hint: p.category,
        keywords: [...p.tags, p.category, p.slug],
        run: go(`/project/${p.slug}`)
      })),
      {
        id: 'copy-email',
        group: 'action',
        label: t('palette.copyEmail'),
        hint: APP_DATA.EMAIL,
        keywords: ['email', 'mail', 'contact', 'lien he'],
        run: () => navigator.clipboard?.writeText(APP_DATA.EMAIL).catch(() => {})
      },
      {
        id: 'theme',
        group: 'action',
        label: t('palette.toggleTheme'),
        keywords: ['theme', 'dark', 'light', 'giao dien', 'toi', 'sang'],
        run: () => {
          const next = theme === 'light' ? 'dark' : 'light'
          localStorage.setItem('theme', next)
          setTheme(next)
        }
      },
      {
        id: 'lang',
        group: 'action',
        label: t('palette.switchLang'),
        keywords: ['language', 'ngon ngu', 'english', 'tieng viet'],
        run: () => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')
      }
    ]
    if (CV_LINK) {
      list.push({
        id: 'cv',
        group: 'action',
        label: t('palette.openCv'),
        keywords: ['cv', 'resume'],
        run: () => openInNewTab(CV_LINK)
      })
    }
    return list
  }, [t, i18n, navigate, theme, setTheme])

  const results = useMemo(() => {
    const found = items.filter((it) => matches(query, it.label, it.keywords))
    // Keep grouped order so arrow keys follow what is on screen.
    return GROUPS.flatMap((g) => found.filter((it) => it.group === g))
  }, [items, query])

  useEffect(() => setActive(0), [query])
  useEffect(() => {
    if (show) setQuery('')
  }, [show])
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const runItem = (it?: IPaletteItem) => {
    if (!it) return
    onHide()
    it.run()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runItem(results[active])
    }
  }

  return (
    <Modal show={show} onHide={onHide} className='command-palette' aria-label={t('palette.open')}>
      <div className='palette-search'>
        <FaSearch aria-hidden className='palette-search-icon' />
        <input
          autoFocus
          role='combobox'
          aria-expanded='true'
          aria-controls='palette-list'
          aria-autocomplete='list'
          aria-label={t('palette.open')}
          aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
          placeholder={t('palette.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <kbd className='palette-kbd'>Esc</kbd>
      </div>
      <ul id='palette-list' role='listbox' ref={listRef} className='palette-list'>
        {results.length === 0 && <li className='palette-empty'>{t('palette.empty')}</li>}
        {results.map((it, i) => (
          <li key={it.id} role='presentation'>
            {(i === 0 || results[i - 1].group !== it.group) && (
              <div className='palette-group' aria-hidden>
                {t(`palette.${it.group}`)}
              </div>
            )}
            <div
              id={`palette-${it.id}`}
              role='option'
              aria-selected={i === active}
              className='palette-item'
              onMouseMove={() => setActive(i)}
              onClick={() => runItem(it)}
            >
              <span>{it.label}</span>
              {it.hint && <span className='palette-hint'>{it.hint}</span>}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export default CommandPalette
