// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from 'vite-plugin-sitemap'; // Solo importar el default
import { blogPosts } from './src/lib/blogData';

const toUrlSlug = (text: string): string => {
  if (!text) return '';
  return text.toLowerCase().replace(/\s+/g, '-');
}

export default defineConfig(({ mode }) => {
  const categories = [...new Set(blogPosts.map(post => post.category).filter(Boolean as any as (value: string | undefined) => value is string))];
  const tags = [...new Set(blogPosts.flatMap(post => post.tags || []).filter(Boolean as any as (value: string | undefined) => value is string))];

  // Lista simple de rutas dinámicas (solo URLs como strings)
  const dynamicRoutePaths: string[] = [
    ...blogPosts.map(post => `/blog/${post.slug}`),
    ...categories.map(category => `/blog/categoria/${toUrlSlug(category)}`),
    ...tags.map(tag => `/blog/tag/${toUrlSlug(tag)}`),
  ];

  // Lista de rutas estáticas (solo URLs como strings)
  const staticRoutePaths: string[] = [
    '/',
    '/servicios',
    '/mi-metodo',
    '/quien-soy',
    '/contacto',
    '/blog',
    '/servicios/estrategia-digital-integral',
    '/servicios/consultoria-seo',
    '/servicios/consultoria-ia',
    '/mi-metodo/producto-marca',
    '/mi-metodo/adquisicion',
    '/mi-metodo/conversion',
    '/mi-metodo/progresion',
    '/mi-metodo/recurrencia',
    '/mi-metodo/escalabilidad',
    '/aviso-legal',
    '/politica-privacidad',
    '/politica-cookies',
  ];

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
      sitemap({
        hostname: 'https://alvarostrategy.com',
        // dynamicRoutes solo debe contener un array de strings (las URLs)
        dynamicRoutes: [...staticRoutePaths, ...dynamicRoutePaths],
        robots: [{ userAgent: '*', allow: '/' }],
        // Si el plugin tiene opciones globales para changefreq, priority, lastmod,
        // podrías intentar ponerlas aquí, pero no garantizo que funcionen o que
        // sean válidas para ESTE plugin específico sin causar errores.
        // Ejemplo (¡puede que estas opciones no existan o den error!):
        // changefreq: 'weekly',
        // priority: 0.7,
        // lastmod: new Date(),
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});