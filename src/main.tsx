import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'styles/global.scss'
import Layout from '@/layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from 'pages/home.tsx'
import '@/i18n.ts'
import { AppContextProvider } from 'components/context/app.context'
import NotFoundPage from './pages/not-found.tsx'

// Home is eager (first paint); other pages load on demand to keep the main bundle small.
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default
})
const lovePage = page(() => import('./pages/love.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/project', lazy: page(() => import('pages/project.tsx')) },
      { path: '/project/:slug', lazy: page(() => import('pages/project.detail.tsx')) },
      { path: '/about', lazy: page(() => import('./pages/about.tsx')) },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  {
    path: '/love',
    lazy: lovePage
  },
  {
    path: '/crush',
    lazy: lovePage
  },
  {
    path: '/to-tinh',
    lazy: lovePage
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
)
