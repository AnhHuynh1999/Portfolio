import { createContext, useContext, useEffect, useState } from 'react'

interface ContextType {
  theme: string
  lang: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
  setLang: React.Dispatch<React.SetStateAction<string>>
}
const AppContext = createContext<ContextType>({
  theme: 'light',
  lang: 'en',
  setTheme: () => {},
  setLang: () => {}
})

const userCurrentApp = () => {
  const currentAppContext = useContext(AppContext)
  return currentAppContext
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
  const [lang, setLang] = useState<string>('en')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [])

  return <AppContext.Provider value={{ theme, lang, setTheme, setLang }}>{children}</AppContext.Provider>
}
export { AppContextProvider, userCurrentApp }
