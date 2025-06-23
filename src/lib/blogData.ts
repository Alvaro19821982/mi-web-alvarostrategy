// src/lib/blogData.ts

export interface Tag {
  key: string;
  name: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  date: string;
  lastModified?: string;
  author: string;
  category: string;
  categoryKey: string; // AÑADIDO
  tags: Tag[];
  translationKey: string;
}

let blogDataCache: Record<string, BlogPost[]> | null = null;

async function loadBlogData(): Promise<Record<string, BlogPost[]>> {
  if (blogDataCache) {
    return blogDataCache;
  }
  
  try {
    const response = await fetch('/blog-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    blogDataCache = data;
    return data;
  } catch (error) {
    console.error("Error crítico al cargar o procesar blog-data.json:", error);
    return {}; 
  }
}

export async function getBlogPosts(lang: string): Promise<BlogPost[]> {
  const allData = await loadBlogData();
  return allData[lang] || [];
}

export async function getAllPostsFromAllLanguages(): Promise<Record<string, BlogPost[]>> {
  return await loadBlogData();
}

export async function getBlogPostBySlug(slug: string, lang: string): Promise<BlogPost | null> {
  const postsForLang = await getBlogPosts(lang);
  const post = postsForLang.find(p => p.slug === slug);
  return post || null;
}