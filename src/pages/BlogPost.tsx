// src/pages/BlogPost.tsx (Código completo con optimización de imagen LCP)
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, UserCircle, Tag as TagIcon, ArrowRight, Home as HomeIcon, BookOpen as BlogIconFile, Loader2 } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { getBlogPostBySlug, getBlogPosts, BlogPost as BlogPostType, getAllPostsFromAllLanguages } from '@/lib/blogData';
import NotFound from './NotFound';
import { useTranslation } from 'react-i18next';
import SeoTags from '@/components/SeoTags';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSetAlternateLinks } from '../context/AlternateLinksContext';
import { supportedLngs } from '../i18n';
import { routesConfig } from '../routes';
import { slugify } from '@/lib/utils';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const setAlternateLinks = useSetAlternateLinks();

  const getPath = (key: string, params?: Record<string, string>) => {
    const routeConfig = routesConfig.find(r => r.key === key);
    if (!routeConfig) return `/${currentLang}`;
    
    let path = routeConfig.paths[currentLang as keyof typeof routeConfig.paths];
    if (!path) return `/${currentLang}`;

    if (params) {
      for (const paramName in params) {
        path = path.replace(`:${paramName}`, params[paramName]);
      }
    }
    return `/${currentLang}/${path}`;
  };

  useEffect(() => {
    const fetchPostData = async () => {
      if (!slug) {
        setIsLoading(false);
        setAlternateLinks(null);
        return;
      }
      
      setIsLoading(true);
      setAlternateLinks(null);

      const currentPost = await getBlogPostBySlug(slug, currentLang);
      setPost(currentPost);

      if (currentPost) {
        const allLanguagesPosts = await getAllPostsFromAllLanguages();
        const alternates: Record<string, string> = {};

        Object.keys(supportedLngs).forEach(langKey => {
          if (allLanguagesPosts[langKey]) {
            const translatedPost = allLanguagesPosts[langKey].find(p => p.translationKey === currentPost.translationKey);
            if (translatedPost) {
              const blogRouteConfig = routesConfig.find(r => r.key === 'blogPost');
              if (blogRouteConfig) {
                let translatedPath = blogRouteConfig.paths[langKey as keyof typeof blogRouteConfig.paths];
                if (translatedPath) {
                  translatedPath = translatedPath.replace(':slug', translatedPost.slug);
                  alternates[langKey] = `/${langKey}/${translatedPath}`;
                }
              }
            }
          }
        });
        setAlternateLinks(alternates);

        const postsInCurrentLang = await getBlogPosts(currentLang);
        const related = postsInCurrentLang
          .filter(p => p.slug !== currentPost.slug && (p.category === currentPost.category || p.tags.some(tag => currentPost.tags.map(t => t.key).includes(tag.key))))
          .slice(0, 2);
        setRelatedPosts(related);
      }
      
      setIsLoading(false);
    };

    fetchPostData();
    window.scrollTo(0, 0);

    return () => {
      setAlternateLinks(null);
    };
  }, [slug, currentLang, setAlternateLinks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <SeoTags
        title={`${post.title} | ${t('nav.blog')} | AlvaroStrategy`}
        description={post.excerpt}
        pathname={location.pathname}
        imageUrl={post.image}
      />
      
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 py-12 sm:py-16 md:py-20">
        <motion.article
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl mx-auto px-4 sm:px-6"
        >
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
            <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link to={`/${currentLang}`} className="text-xs sm:text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><> <HomeIcon className="h-3 w-3 mr-1.5" />{t('nav.home')} </></Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild><Link to={getPath('blog')} className="text-xs sm:text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><> <BlogIconFile className="h-3 w-3 mr-1.5" />{t('nav.blog')} </></Link></BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xs sm:text-sm text-gray-700 dark:text-slate-200 line-clamp-1">{post.category}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
          </motion.div>

          <motion.header variants={fadeInUp} className="mb-6 md:mb-8">
             <div className="mb-3 sm:mb-4">
                <Link to={getPath('blogCategory', { categoriaSlug: slugify(post.category) })}>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-xs sm:text-sm font-medium transition-colors">{post.category}</Badge>
                </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 dark:text-slate-400 gap-x-4 gap-y-1 sm:gap-x-6">
              <div className="flex items-center" title={t('blog_content.date_label')}>
                <CalendarDays className="w-3.5 h-3.5 mr-1" /> {new Date(post.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center" title={`${t('blog_content.author_label')} ${post.author}`}>
                <UserCircle className="w-3.5 h-3.5 mr-1" />
                <Link to={getPath('whoAmI')} className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">{post.author}</Link>
              </div>
            </div>
             {post.tags && post.tags.length > 0 && (
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-2 gap-y-1 items-center">
                  <TagIcon className="w-3.5 h-3.5 mr-1 text-gray-400 dark:text-slate-500" />
                {post.tags.map(tag => (
                    <Link key={tag.key} to={getPath('blogTag', { tagSlug: slugify(tag.name) })}>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">#{tag.name}</Badge>
                    </Link>
                ))}
              </div>
            )}
          </motion.header>

          {post.image && (
            // MODIFICACIÓN: Añadido fetchpriority="high" y loading="eager" a la imagen LCP.
            <motion.img 
              variants={fadeInUp} 
              src={post.image} 
              alt={post.imageAlt} 
              className="w-full h-auto max-h-[450px] sm:max-h-[500px] object-cover rounded-lg sm:rounded-xl shadow-lg mb-8 md:mb-10" 
              width="1024" 
              height="576"
              fetchPriority="high"
              loading="eager"
            />
          )}
          
          <motion.div
            variants={fadeInUp}
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-8 sm:my-12 md:my-16 dark:bg-slate-700" />

          <motion.div variants={fadeInUp} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border dark:border-slate-700">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-500 dark:border-blue-400">
                <AvatarImage src="/images/Alvaro%20Fernandez%20de%20Celis.webp" alt={post.author} />
                <AvatarFallback>{post.author.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">{t('blog_content.post_written_by')}</p>
                <Link to={getPath('whoAmI')} className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.author}
                </Link>
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 leading-snug">
                    {t('blog_content.post_author_bio')} <Link to={getPath('whoAmI')} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{t('blog_content.post_author_link')}</Link>.
                </p>
            </div>
          </motion.div>

          {relatedPosts.length > 0 && (
            <motion.section variants={fadeInUp} className="mt-12 md:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center sm:text-left">
                {t('blog_content.related_posts_title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.slug} className="group bg-white dark:bg-slate-800/70 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col">
                     <Link to={getPath('blogPost', { slug: relatedPost.slug })} className="block" aria-label={`${t('blog_content.read_more')} ${relatedPost.title}`}>
                        <img src={relatedPost.image} alt={relatedPost.imageAlt} className="w-full h-40 sm:h-44 object-cover group-hover:opacity-90 transition-opacity" loading="lazy" width="600" height="338"/>
                     </Link>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <Link to={getPath('blogCategory', { categoriaSlug: slugify(relatedPost.category) })} className="inline-block mb-1.5">
                        <Badge variant="secondary" className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50">{relatedPost.category}</Badge>
                      </Link>
                      <CardTitle className="text-md font-semibold text-gray-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                        <Link to={getPath('blogPost', { slug: relatedPost.slug })}>{relatedPost.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 flex-grow mb-3">
                        {relatedPost.excerpt}
                      </CardDescription>
                       <Link to={getPath('blogPost', { slug: relatedPost.slug })} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-auto self-start">
                            <> {t('blog_content.read_more')} <ArrowRight className="inline w-3 h-3"/> </>
                       </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          <motion.div variants={fadeInUp} className="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-slate-700 text-center">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 font-bold rounded-xl shadow-lg"
              onClick={() => navigate(getPath('contact'), { state: { subject: t('blog_content.post_cta_subject', { postTitle: post.title }) } })}
            >
              <>
                {t('blog_content.post_cta_button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate(getPath('blog'))} className="group text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300">
              <>
                <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                {t('blog_content.back_to_all_articles')}
              </>
            </Button>
          </motion.div>
        </motion.article>
      </div>
    </>
  );
};

export default BlogPost;