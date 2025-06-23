// scripts/build-sitemap.mjs
import fs from 'fs';
import path from 'path';

// --- CONFIGURACIÓN ---
const BASE_URL = 'https://alvarostrategy.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');
const BLOG_DATA_PATH = path.join(PUBLIC_DIR, 'blog-data.json');
const ROUTES_CONFIG_PATH = path.join(process.cwd(), 'src', 'routes.ts');
const SUPPORTED_LANGS = ['es', 'en', 'fr'];
// --------------------

const slugify = (text) => {
  if (!text) return '';
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// CORRECCIÓN: Función mejorada para leer el archivo .ts y extraer el array de configuración
const getRoutesConfig = () => {
  const fileContent = fs.readFileSync(ROUTES_CONFIG_PATH, 'utf-8');
  
  // Expresión regular para encontrar el array, ignorando los imports y el tipado.
  // Busca 'export const routesConfig = [' y captura todo hasta el '];' final.
  const match = fileContent.match(/export const routesConfig\s*=\s*(\[[\s\S]*?\]);/);
  
  if (!match || !match[1]) {
    throw new Error('No se pudo encontrar o parsear routesConfig en routes.ts');
  }

  // Ahora, debemos procesar el texto capturado para que sea un JSON válido.
  // Esto implica quitar los nombres de los componentes (ej. 'component: MiMetodo,')
  // ya que no son válidos en JSON y no los necesitamos en este script.
  let configString = match[1];
  configString = configString.replace(/component:\s*\w+,/g, '');
  
  // Convertimos las comillas simples a dobles para que sea JSON válido
  configString = configString.replace(/'/g, '"');

  // Usamos una función constructora para evaluar el string de forma segura
  return new Function(`return ${configString}`)();
};


const generateSitemap = () => {
  console.log('🚀 Generando sitemap...');
  
  const blogData = readJSONFile(BLOG_DATA_PATH);
  const routesConfig = getRoutesConfig(); // Usamos la nueva función mejorada

  const today = new Date().toISOString().split('T')[0];

  const urlMap = new Map();

  const addUrl = (key, lang, loc, lastmod = today) => {
    if (!urlMap.has(key)) {
      urlMap.set(key, { lastmod, alternates: {} });
    }
    const entry = urlMap.get(key);
    entry.alternates[lang] = loc;
    if (new Date(lastmod) > new Date(entry.lastmod)) {
      entry.lastmod = lastmod;
    }
  };

  // 1. Páginas estáticas (incluida la raíz para hreflang x-default)
  addUrl('home', 'es', `${BASE_URL}/es`);
  addUrl('home', 'en', `${BASE_URL}/en`);
  addUrl('home', 'fr', `${BASE_URL}/fr`);
  
  routesConfig.filter(r => r.paths && !Object.values(r.paths).some(p => p.includes(':')) && r.key !== 'home').forEach(route => {
    SUPPORTED_LANGS.forEach(lang => {
        const pathSegment = route.paths[lang];
        if (pathSegment !== undefined) {
           const loc = `${BASE_URL}/${lang}${(pathSegment ? '/' : '') + pathSegment}`;
           addUrl(route.key, lang, loc);
        }
    });
  });

  // 2. Posts del blog
  SUPPORTED_LANGS.forEach(lang => {
    if (blogData[lang]) {
      blogData[lang].forEach(post => {
        const routeConf = routesConfig.find(r => r.key === 'blogPost');
        if (routeConf && routeConf.paths[lang]) {
            const postPath = routeConf.paths[lang].replace(':slug', post.slug);
            const loc = `${BASE_URL}/${lang}/${postPath}`;
            const lastmod = post.lastModified ? post.lastModified.split('T')[0] : post.date.split('T')[0];
            addUrl(`post-${post.translationKey}`, lang, loc, lastmod);
        }
      });
    }
  });

  // 3. Páginas de categorías y etiquetas
  const categories = new Map();
  const tags = new Map();

  SUPPORTED_LANGS.forEach(lang => {
    if (blogData[lang]) {
        blogData[lang].forEach(post => {
          if (post.category && post.categoryKey) {
            if (!categories.has(post.categoryKey)) categories.set(post.categoryKey, {});
            categories.get(post.categoryKey)[lang] = slugify(post.category);
          }
          if (post.tags) {
            post.tags.forEach(tag => {
                if (!tags.has(tag.key)) tags.set(tag.key, {});
                tags.get(tag.key)[lang] = slugify(tag.name);
            });
          }
        });
    }
  });
  
  categories.forEach((langs, key) => {
    const routeConf = routesConfig.find(r => r.key === 'blogCategory');
    if (routeConf) {
        SUPPORTED_LANGS.forEach(lang => {
          if(langs[lang] && routeConf.paths[lang]) {
              const categoryPath = routeConf.paths[lang].replace(':categoriaSlug', langs[lang]);
              const loc = `${BASE_URL}/${lang}/${categoryPath}`;
              addUrl(`category-${key}`, lang, loc);
          }
        });
    }
  });

  tags.forEach((langs, key) => {
    const routeConf = routesConfig.find(r => r.key === 'blogTag');
    if (routeConf) {
        SUPPORTED_LANGS.forEach(lang => {
          if(langs[lang] && routeConf.paths[lang]) {
              const tagPath = routeConf.paths[lang].replace(':tagSlug', langs[lang]);
              const loc = `${BASE_URL}/${lang}/${tagPath}`;
              addUrl(`tag-${key}`, lang, loc);
          }
        });
    }
  });

  // Construir el XML
  const sitemapEntries = [];
  for (const [key, { lastmod, alternates }] of urlMap.entries()) {
    const canonicalUrl = alternates['es'] || Object.values(alternates)[0];
    
    // Añadir x-default si es la página de inicio
    let alternateLinks = key === 'home' ? `<xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/"/>\n      ` : '';
    
    alternateLinks += Object.entries(alternates)
      .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
      .join('\n      ');

    sitemapEntries.push(`
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${key === 'home' ? '1.0' : '0.8'}</priority>
    ${alternateLinks}
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);

  console.log(`✅ Sitemap generado exitosamente en: ${SITEMAP_PATH}`);
};

generateSitemap();