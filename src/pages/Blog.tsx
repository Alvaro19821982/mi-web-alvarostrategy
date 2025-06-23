// src/pages/Blog.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CalendarDays, UserCircle, Tag as TagIcon, Home as HomeIcon, BookOpen as BlogIconFile, Loader2 } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { getBlogPosts, BlogPost as BlogPostType } from '@/lib/blogData';
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
import { routesConfig } from '../routes';
import { slugify } from '@/lib/utils'; // RUTA CORREGIDA

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

const Blog = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  
  const [displayedPosts, setDisplayedPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPath = (routeKey: string, params?: Record<string, string>) => {
    const routeConf = routesConfig.find(r => r.key === routeKey);
    if (!routeConf) {
      console.warn(`Route with key "${routeKey}" not found in routesConfig.`);
      const fallbackKey = t(`routes.${routeKey}`, { lng: currentLang, defaultValue: routeKey });
      return `/${currentLang}/${fallbackKey}`;
    }
    
    let pathSegment = routeConf.paths[currentLang as keyof typeof routeConf.paths];
    if (!pathSegment) {
        console.warn(`Path for language "${currentLang}" not found for route key "${routeKey}".`);
        const fallbackKey = t(`routes.${routeKey}`, { lng: currentLang, defaultValue: routeKey });
        return `/${currentLang}/${fallbackKey}`;
    }

    if (params) {
      Object.keys(params).forEach(paramName => {
        pathSegment = pathSegment.replace(`:${paramName}`, params[paramName]);
      });
    }
    return `/${currentLang}/${pathSegment}`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await getBlogPosts(currentLang);
        setDisplayedPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts for Blog page:", error);
        setDisplayedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentLang]);

  const pageTitle = t('blog_content.page_title');
  const pageDescription = t('blog_content.page_description');

  return (
    <>
      <SeoTags
        title={pageTitle}
        description={pageDescription}
        pathname={location.pathname}
      />
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-4 sm:px-6"
        >
          <motion.div variants={fadeInUp} className="mb-8 md:mb-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <>
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        {t('nav.home')}
                      </>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('nav.blog')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.header
            variants={fadeInUp}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <>
                <BlogIconFile className="w-5 h-5 mr-2 inline-block" /> {t('blog_content.header_badge')}
              </>
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              {t('blog_content.header_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
              {t('blog_content.header_subtitle')}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
          </motion.header>

          {isLoading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : displayedPosts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
            >
              {displayedPosts.map((post) => (
                <motion.div key={post.slug} variants={fadeInUp} className="h-full flex">
                  <Card className="group bg-white dark:bg-slate-800/70 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-slate-700/50 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5">
                    <Link to={getPath('blogPost', { slug: post.slug })} className="block" aria-label={`${t('blog_content.read_full_article')} ${post.title}`}>
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width="800"
                        height="450"
                      />
                    </Link>
                    <CardHeader className="p-5 sm:p-6">
                      <div className="mb-2.5 sm:mb-3">
                        <Link to={getPath('blogCategory', { categoriaSlug: slugify(post.category) })} aria-label={`Ver todos los artículos de la categoría ${post.category}`}>
                          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-xs sm:text-sm font-medium transition-colors cursor-pointer">
                            {post.category}
                          </Badge>
                        </Link>
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Link to={getPath('blogPost', { slug: post.slug })}>
                          {post.title}
                        </Link>
                      </CardTitle>
                       <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mt-2 space-x-3">
                          <div className="flex items-center" title={t('blog_content.date_label')}>
                              <CalendarDays className="w-3.5 h-3.5 mr-1" /> {new Date(post.date).toLocaleDateString(currentLang, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                          <div className="flex items-center" title={`${t('blog_content.author_label')} ${post.author}`}>
                              <UserCircle className="w-3.5 h-3.5 mr-1" /> {post.author}
                          </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-6 pt-0 flex-grow flex flex-col">
                      <CardDescription className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="mt-auto">
                         {post.tags && post.tags.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2 items-center">
                            <TagIcon className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500"/>
                            {post.tags.map(tag => (
                              <Link key={tag.key} to={getPath('blogTag', { tagSlug: slugify(tag.name) })} aria-label={`Ver todos los artículos con la etiqueta ${tag.name}`}>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">#{tag.name}</Badge>
                              </Link>
                            ))}
                          </div>
                        )}
                        <Button asChild variant="link" className="group text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-0 font-semibold self-start">
                          <Link to={getPath('blogPost', { slug: post.slug })}>
                            <>
                              {t('blog_content.read_full_article')}
                              <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p variants={fadeInUp} className="text-center text-lg text-gray-600 dark:text-slate-400 py-12">
              {t('blog_content.empty_state')}
            </motion.p>
          )}
          
          <motion.section
              variants={fadeInUp}
              className="text-center mt-16 md:mt-20 lg:mt-24 py-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-slate-100 mb-4">
              {t('blog_content.cta_title')}
            </h2>
            <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed sm:leading-loose">
              {t('blog_content.cta_subtitle')}
            </p>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => navigate(getPath('contact'), { state: { subject: "Interesado en estrategia digital (desde el Blog)"}})}
              aria-label={t('blog_content.cta_button')}
            >
              <>
                {t('blog_content.cta_button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </>
            </Button>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
};

export default Blog;