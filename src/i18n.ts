import i18n from 'i18next'
import translationEN from '@/locales/en/translation.json'
import translationVI from '@/locales/vi/translation.json'
import { initReactI18next } from 'react-i18next'

const readLang = () => {
  try {
    const saved = localStorage.getItem('lang')
    return saved === 'en' || saved === 'vi' ? saved : 'vi'
  } catch {
    return 'vi'
  }
}

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem('lang', lng)
  } catch {
    /* storage blocked: language just won't persist */
  }
})

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    vi: { translation: translationVI }
  },
  lng: readLang(),
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // React already escapes
  }
})

document.documentElement.lang = i18n.language

export default i18n
