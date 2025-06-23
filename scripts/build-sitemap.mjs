// scripts/build-sitemap.mjs
import fs from 'fs';
import path from 'path';

// --- CONFIGURACIÓN ---
const BASE_URL = 'https://alvarostrategy.com';
// Coloca la ruta a tu archivo blog-data.json
const BLOG_DATA_PATH = path.resolve(process.cwd(), 'public/blog-data.json');
// La salida será en la carpeta public, para que Vite lo copie a la raíz del build
const SITEMAP_OUTPUT_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');

// Replicamos la configuración de rutas y slugs para poder usarla en Node.js
// Es crucial que esto se mantenga sincronizado con tu `src/routes.ts`
const routesConfig = [
    { key: 'services', paths: { es: 'servicios', en: 'services', fr: 'services' } },
    { key: 'method', paths: { es: 'mi-metodo', en: 'my-method', fr: 'ma-methode' } },
    { key: 'whoAmI', paths: { es: 'quien-soy', en: 'about-me', fr: 'qui-suis-je' } },
    { key: 'contact', paths: { es: 'contacto', en: 'contact', fr: 'contact' } },
    { key: 'blog', paths: { es: 'blog', en: 'blog', fr: 'blog' } },
    { key: 'blogPost', dynamic: 'slug', paths: { es: 'blog/:slug', en: 'blog/:slug', fr: 'blog/:slug' } },
    { key: 'blogCategory', dynamic: 'categoriaSlug', paths: { es: 'categoria/:categoriaSlug', en: 'category/:categoriaSlug', fr: 'categorie/:categoriaSlug' } },
    { key: 'blogTag', dynamic: 'tagSlug', paths: { es: 'etiqueta/:tagSlug', en: 'tag/:tagSlug', fr: 'tag/:tagSlug' } },
    { key: 'service_edi', paths: { es: 'servicios/estrategia-digital-integral', en: 'services/comprehensive-digital-strategy', fr: 'services/strategie-digitale-globale' } },
    { key: 'service_seo', paths: { es: 'servicios/consultoria-seo', en: 'services/seo-consulting', fr: 'services/consultation-seo' } },
    { key: 'service_ia', paths: { es: 'servicios/consultoria-ia', en: 'services/ai-consulting', fr: 'services/consultation-ia' } },
    { key: 'method_brand', paths: { es: 'mi-metodo/producto-marca', en: 'my-method/product-brand', fr: 'ma-methode/produit-marque' } },
    { key: 'method_acquisition', paths: { es: 'mi-metodo/adquisicion', en: 'my-method/acquisition', fr: 'ma-methode/acquisition' } },
    { key: 'method_conversion', paths: { es: 'mi-metodo/conversion', en: 'my-method/conversion', fr: 'ma-methode/conversion' } },
    { key: 'method_progression', paths: { es: 'mi-metodo/progresion', en: 'my-method/progression', fr: 'ma-methode/progression' } },
    { key: 'method_recurrence', paths: { es: 'mi-metodo/recurrencia', en: 'my-method/recurrence', fr: 'ma-methode/recurrence' } },
    { key: 'method_scalability', paths: { es: 'mi-metodo/escalabilidad', en: 'my-method/scalability', fr: 'ma-methode/scalabilite' } },
    { key: 'legal_notice', paths: { es: 'aviso-legal', en: 'legal-notice', fr: 'mentions-legales' } },
    { key: 'privacy_policy', paths: { es: 'politica-de-privacidad', en: 'privacy-policy', fr: 'politique-de-confidentialite' } },
    { key: 'cookies_policy', paths: { es: 'politica-de-cookies', en: 'cookies-policy', fr: 'politique-de-cookies' } },
];
const supportedLngs = ['es', 'en', 'fr'];

// --- HELPERS ---
const slugify = (text) => {
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/\s+/g, '-') // Reemplazar espacios con -
        .replace(/[^\w-]+/g, '') // Quitar caracteres no alfanuméricos
        .replace(/--+/g, '-') // Reemplazar múltiples - con uno solo
        .replace(/^-+/, '').replace(/-+$/, ''); // Quitar - del principio y final
};

// --- LÓGICA PRINCIPAL ---
async function generateSitemap() {
    console.log("Generando sitemap...");
    const blogData = JSON.parse(fs.readFileSync(BLOG_DATA_PATH, 'utf-8'));

    // Objeto para almacenar URLs por clave única (para agrupar traducciones)
    const urls = {};

    // 1. Páginas estáticas y la página de inicio
    routesConfig.filter(r => !r.dynamic).forEach(route => {
        const key = `static-${route.key}`;
        urls[key] = { lastmod: new Date().toISOString().split('T')[0], alternates: {} };
        supportedLngs.forEach(lang => {
            if (route.paths[lang]) {
                urls[key].alternates[lang] = `/${lang}/${route.paths[lang]}`;
            }
        });
    });

    // Añadir la página de inicio para cada idioma
    urls['static-home'] = { lastmod: new Date().toISOString().split('T')[0], alternates: {} };
    supportedLngs.forEach(lang => {
        urls['static-home'].alternates[lang] = `/${lang}`;
    });

    // 2. Páginas de posts del blog
    Object.keys(blogData).forEach(lang => {
        blogData[lang].forEach(post => {
            const key = `post-${post.translationKey}`;
            if (!urls[key]) {
                urls[key] = { 
                    lastmod: post.lastModified || post.date, 
                    alternates: {} 
                };
            }
            const postRoute = routesConfig.find(r => r.key === 'blogPost');
            if (postRoute && postRoute.paths[lang]) {
                urls[key].alternates[lang] = `/${lang}/${postRoute.paths[lang].replace(':slug', post.slug)}`;
            }
        });
    });

    // 3. Páginas de categorías del blog
    const categoriesByKey = {};
    Object.keys(blogData).forEach(lang => {
      blogData[lang].forEach(post => {
        if (!post.categoryKey) return; // Necesitamos categoryKey
        const key = `category-${post.categoryKey}`;
        if (!categoriesByKey[key]) categoriesByKey[key] = { alternates: {} };
        
        const categoryRoute = routesConfig.find(r => r.key === 'blogCategory');
        if (categoryRoute && categoryRoute.paths[lang]) {
            const categoriaSlug = slugify(post.category);
            categoriesByKey[key].alternates[lang] = `/${lang}/${categoryRoute.paths[lang].replace(':categoriaSlug', categoriaSlug)}`;
        }
      });
    });
    Object.assign(urls, categoriesByKey);


    // 4. Páginas de etiquetas del blog
    const tagsByKey = {};
     Object.keys(blogData).forEach(lang => {
        blogData[lang].forEach(post => {
            post.tags.forEach(tag => {
                const key = `tag-${tag.key}`;
                if (!tagsByKey[key]) tagsByKey[key] = { alternates: {} };
                const tagRoute = routesConfig.find(r => r.key === 'blogTag');
                if (tagRoute && tagRoute.paths[lang]) {
                    tagsByKey[key].alternates[lang] = `/${lang}/${tagRoute.paths[lang].replace(':tagSlug', slugify(tag.name))}`;
                }
            });
        });
    });
    Object.assign(urls, tagsByKey);

    // --- CONSTRUIR EL XML ---
    const sitemapEntries = Object.values(urls).flatMap(urlData =>
        Object.entries(urlData.alternates).map(([lang, path]) => {
            const alternatesXml = Object.entries(urlData.alternates)
                .map(([altLang, altPath]) => `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}${altPath}" />`)
                .join('\n');

            return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${urlData.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${alternatesXml}
  </url>`;
        })
    );
    
    // Eliminar duplicados si los hubiera
    const uniqueSitemapEntries = [...new Set(sitemapEntries)];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${uniqueSitemapEntries.join('\n')}
</urlset>`;

    fs.writeFileSync(SITEMAP_OUTPUT_PATH, sitemap);
    console.log(`Sitemap generado correctamente en ${SITEMAP_OUTPUT_PATH}`);
}

generateSitemap().catch(console.error);