// vite.config.ts ------------------------------------------------------------
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from 'lovable-tagger'
import sitemap from 'vite-plugin-sitemap'
import { blogPosts } from './src/lib/blogData'

// Utilidad para slugs
const toUrlSlug = (txt: string) => txt.toLowerCase().replace(/\s+/g, '-')

export default defineConfig(({ mode }) => {
  /* -------------------- rutas base y dinámicas -------------------- */
  const staticRoutes = [
    '/', '/servicios', '/mi-metodo', '/quien-soy', '/contacto', '/blog',
    '/servicios/estrategia-digital-integral', '/servicios/consultoria-seo',
    '/servicios/consultoria-ia',
    '/mi-metodo/producto-marca', '/mi-metodo/adquisicion',
    '/mi-metodo/conversion', '/mi-metodo/progresion',
    '/mi-metodo/recurrencia', '/mi-metodo/escalabilidad',
    '/aviso-legal', '/politica-privacidad', '/politica-cookies',
  ]

  const categories  = [...new Set(blogPosts.map(p => p.category))]
  const tags        = [...new Set(blogPosts.flatMap(p => p.tags))]

  const postRoutes      = blogPosts.map(p => `/blog/${p.slug}`)
  const categoryRoutes  = categories.map(c => `/blog/categoria/${toUrlSlug(c)}`)
  const tagRoutes       = tags.map(t => `/blog/tag/${toUrlSlug(t)}`)
  const allRoutes       = [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes]

  /* -------------------- utilidades -------------------- */
  const mapValues = <T>(routes: string[], value: () => T): Record<string, T> =>
    routes.reduce((o, r) => { o[r] = value(); return o }, {} as Record<string, T>)

  /* -------------------- metadatos sitemap -------------------- */
  const changefreq = {
    ...mapValues(['/', '/blog'], () => 'daily'),
    ...mapValues(postRoutes,     () => 'weekly'),
    ...mapValues(categoryRoutes, () => 'weekly'),
    ...mapValues(tagRoutes,      () => 'weekly'),
    ...mapValues(['/servicios', '/mi-metodo', '/quien-soy'], () => 'monthly'),
  }

  const priority = {
    '/': 1,
    '/blog': 0.9,
    ...mapValues(postRoutes,     () => 0.8),
    ...mapValues(categoryRoutes, () => 0.7),
    ...mapValues(tagRoutes,      () => 0.6),
    ...mapValues(['/servicios', '/mi-metodo'], () => 0.8),
    '/quien-soy': 0.7,
  }

  // 👉 AHORA con Date, no string
  const lastmod = {
    ...mapValues(['/', '/blog', '/servicios', '/mi-metodo', '/quien-soy'], () => new Date()),
    ...blogPosts.reduce<Record<string, Date>>((o, p) => {
      o[`/blog/${p.slug}`] = new Date(p.lastModified ?? p.date)
      return o
    }, {}),
    ...mapValues(categoryRoutes, () => new Date()),
    ...mapValues(tagRoutes,      () => new Date()),
  }

  /* -------------------- configuración Vite -------------------- */
  return {
    server: { host: '::', port: 8080 },

    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      sitemap({
        hostname: 'https://alvarostrategy.com',
        dynamicRoutes: allRoutes,
        changefreq,
        priority,
        lastmod,                         // <— ahora tipado correcto
        robots: [{ userAgent: '*', allow: '/' }],
        readable: true,
      }),
    ].filter(Boolean),

    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  }
})
