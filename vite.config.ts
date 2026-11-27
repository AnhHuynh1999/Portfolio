import { defineConfig, createServer, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'
import tsConfigPaths from 'vite-tsconfig-paths'

const SITE_URL = (process.env.SITE_URL || 'https://portfolio-two-azure-14.vercel.app').replace(/\/+$/, '')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Crawlers don't run JS, so each shareable route gets its own static HTML with the right preview tags.
function previewPages(): Plugin {
  return {
    name: 'preview-pages',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    apply: 'build',
    async closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
      const server = await createServer({
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
        logLevel: 'error',
        optimizeDeps: { noDiscovery: true, include: [] }
      })
      try {
        const { PROJECTS } = await server.ssrLoadModule('/src/helpers/data.ts')
        const page = (route: string, title: string, description: string) => {
          const t = esc(title)
          const d = esc(description)
          const html = base
            .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
            .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
            .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
            .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
            .replace(/(<meta property="og:url" content=")[^"]*/, `$1${SITE_URL}${route}`)
          const dir = path.join(dist, route)
          fs.mkdirSync(dir, { recursive: true })
          fs.writeFileSync(path.join(dir, 'index.html'), html)
        }
        page(
          '/project',
          'Dự án — Bảo Anh',
          'Các dự án thực tế: ứng dụng web, API và mobile do Bảo Anh thiết kế và lập trình.'
        )
        page(
          '/about',
          'Giới thiệu — Bảo Anh',
          'Bảo Anh — Kỹ sư phần mềm Fullstack, hơn 4 năm kinh nghiệm với React, Node.js và NestJS.'
        )
        for (const p of PROJECTS as { slug: string; title: string; description: { vi: string } }[]) {
          page(`/project/${p.slug}`, `${p.title} | Bảo Anh`, p.description.vi)
        }
      } finally {
        await server.close()
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), previewPages()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
