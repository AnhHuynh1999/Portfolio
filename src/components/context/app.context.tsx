import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = 'light' | 'dark'
interface ContextType {
  theme: ThemeContextType
  setTheme: (v: ThemeContextType) => void
}
const AppContext = createContext<ContextType>({
  theme: 'light',
  setTheme: () => {}
})

const useCurrentApp = () => {
  const currentAppContext = useContext(AppContext)
  return currentAppContext
}

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeContextType>((localStorage.getItem('theme') as ThemeContextType) || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }, [theme])

  return <AppContext.Provider value={{ theme, setTheme }}>{children}</AppContext.Provider>
}

export { AppContextProvider, useCurrentApp, useCurrentApp as userCurrentApp }
