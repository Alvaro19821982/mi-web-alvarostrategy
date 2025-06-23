// scripts/build-blog.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const rootDirectory = process.cwd();
const contentDir = path.join(rootDirectory, 'src', 'content', 'blog');
const publicDir = path.join(rootDirectory, 'public');
const outputFile = path.join(publicDir, 'blog-data.json');

const supportedLangs = ['es', 'en', 'fr'];
const blogData = {};

// AÑADIDO: Función slugify para consistencia con el sitemap
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

console.log('🚀 Iniciando construcción de datos del blog...');

supportedLangs.forEach(lang => {
  const langDirectory = path.join(contentDir, lang);
  
  if (!fs.existsSync(langDirectory)) {
    console.warn(`- Directorio no encontrado para el idioma: ${lang}, saltando.`);
    blogData[lang] = [];
    return;
  }

  const fileNames = fs.readdirSync(langDirectory).filter(file => file.endsWith('.md'));
  console.log(`- Encontrados ${fileNames.length} posts para el idioma [${lang}]`);

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(langDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = marked(content);

    // CORRECCIÓN: Transformar las etiquetas de string a objetos { key, name }
    const processedTags = (data.tags ?? []).map((tagName: string) => ({
      key: slugify(tagName),
      name: tagName
    }));

    return {
      slug,
      content: htmlContent,
      title: data.title ?? 'Sin Título',
      excerpt: data.excerpt ?? '',
      image: data.image ?? '/images/placeholder.svg',
      imageAlt: data.imageAlt ?? 'Imagen del post',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      lastModified: data.lastModified ? new Date(data.lastModified).toISOString() : undefined,
      author: data.author ?? 'Autor Anónimo',
      category: data.category ?? 'Sin Categoría',
      categoryKey: data.categoryKey ?? 'general',
      tags: processedTags, // MODIFICADO: Usar las etiquetas procesadas
      translationKey: data.translationKey ?? slug,
    };
  });
  
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  blogData[lang] = posts;
});

fs.writeFileSync(outputFile, JSON.stringify(blogData, null, 2));

console.log(`✅ Datos del blog construidos exitosamente en: ${outputFile}`);