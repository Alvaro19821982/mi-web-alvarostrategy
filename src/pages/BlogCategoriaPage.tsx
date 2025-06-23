// src/pages/BlogCategoriaPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CalendarDays, UserCircle, Home as HomeIcon, BookOpen as BlogIconFile, FolderKanban, ArrowLeft, Loader2, Tag as TagIconLucide } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { getBlogPosts, BlogPost as BlogPostType } from '@/lib/blogData';
import { useTranslation } from 'react-i18next';
import SeoTags from '@/components/SeoTags';
import { Helmet } from 'react-helmet-async';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NotFound from './NotFound';
import { useSetAlternateLinks } from '../context/AlternateLinksContext';
import { supportedLngs } from '../i18n';
import { routesConfig } from '../routes';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

const formatCategoryName = (slug: string): string => {
  if (!slug) return '';
  return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const BlogCategoriaPage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  const { categoriaSlug } = useParams<{ categoriaSlug: string }>();

  const [displayedPosts, setDisplayedPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const setAlternateLinks = useSetAlternateLinks();

  const getPath = (key: string, params?: Record<string, string>) => {
    const routeConfig = routesConfig.find(r => r.key === key);
    if (!routeConfig) {
        console.warn(`[BlogCategoriaPage] Route config not found for key: ${key}`);
        return `/${currentLang}`;
    }
    
    let path = routeConfig.paths[currentLang as keyof typeof routeConfig.paths];
    if (!path) {
        console.warn(`[BlogCategoriaPage] Path not found for lang ${currentLang} and key: ${key}`);
        return `/${currentLang}`;
    }

    if (params) {
      for (const paramName in params) {
        path = path.replace(`:${paramName}`, params[paramName]);
      }
    }
    return `/${currentLang}/${path}`;
  };

  useEffect(() => {
    const loadDataForCategoryPage = async () => {
      if (!categoriaSlug) {
        setIsLoading(false);
        setAlternateLinks(null);
        return;
      }
      setIsLoading(true);
      setAlternateLinks(null);

      const formattedName = formatCategoryName(categoriaSlug);
      setCategoryName(formattedName);
      
      try {
        const posts = await getBlogPosts(currentLang);
        const filteredPosts = posts.filter(post => 
          post.category.toLowerCase().replace(/\s+/g, '-') === categoriaSlug
        );
        setDisplayedPosts(filteredPosts);

        const alternates: Record<string, string> = {};
        const categoryRouteConfig = routesConfig.find(r => r.key === 'blogCategory');

        if (categoryRouteConfig) {
            Object.keys(supportedLngs).forEach(langKey => {
                const pathTemplate = categoryRouteConfig.paths[langKey as keyof typeof categoryRouteConfig.paths];
                if (pathTemplate) {
                    alternates[langKey] = `/${langKey}/${pathTemplate.replace(':categoriaSlug', categoriaSlug)}`;
                }
            });
            setAlternateLinks(alternates);
        } else {
            console.warn("Route config for 'blogCategory' not found for alternate links generation.");
        }

      } catch (error) {
        console.error("Error fetching data for BlogCategoriaPage:", error);
        setDisplayedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDataForCategoryPage();
     return () => { 
        setAlternateLinks(null);
    };
  }, [categoriaSlug, currentLang, setAlternateLinks, i18n.language]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>;
  }

  if (!categoriaSlug || !categoryName) { 
    return <NotFound />;
  }
  
  const pageTitle = t('blog_content.category_page_title', { categoryName: categoryName });
  const pageDescription = t('blog_content.category_page_desc', { categoryName: categoryName });

  return (
    <>
      <SeoTags
        title={pageTitle}
        description={pageDescription}
        pathname={location.pathname}
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
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
                      <> <HomeIcon className="h-3.5 w-3.5 mr-1.5" /> {t('nav.home')} </>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={getPath('blog')} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                     <> <BlogIconFile className="h-3.5 w-3.5 mr-1.5" /> {t('nav.blog')} </>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{categoryName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.header variants={fadeInUp} className="text-center mb-10 md:mb-12 lg:mb-16">
             <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <> <FolderKanban className="w-5 h-5 mr-2 inline-block" /> {t('blog_content.category_badge')} </>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              {t('blog_content.category_page_title', { categoryName: categoryName })}
            </h1>
            <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('blog_content.category_header_subtitle', { categoryName: categoryName })}
            </p>
          </motion.header>

          {displayedPosts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
            >
              {displayedPosts.map((post) => (
                <motion.div key={`${post.slug}-${currentLang}`} variants={fadeInUp} className="h-full flex">
                    <Card className="group bg-white dark:bg-slate-800/70 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-slate-700/50 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5">
                    <Link to={getPath('blogPost', { slug: post.slug })} className="block" aria-label={`${t('blog_content.read_full_article')} ${post.title}`}>
                      <img src={post.image} alt={post.imageAlt} className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="800" height="450"/>
                    </Link>
                    <CardHeader className="p-5 sm:p-6">
                      <div className="mb-2.5 sm:mb-3">
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium">
                          {post.category}
                        </Badge>
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
                            <TagIconLucide className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500"/>
                            {post.tags.map(tag => (
                              <Link key={tag} to={getPath('blogTag', { tagSlug: tag.toLowerCase().replace(/\s+/g, '-') })} aria-label={`Ver todos los artículos con la etiqueta ${tag}`}>
                                  <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">#{tag}</Badge>
                              </Link>
                            ))}
                          </div>
                        )}
                         <Button asChild variant="link" className="group text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-0 font-semibold self-start">
                          <Link to={getPath('blogPost', { slug: post.slug })}>
                            <> {t('blog_content.read_full_article')} <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" /> </>
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
              {t('blog_content.category_empty_state', { categoryName: categoryName })}
            </motion.p>
          )}
           <motion.div variants={fadeInUp} className="mt-12 text-center">
                <Button onClick={() => navigate(getPath('blog'))} variant="outline" className="group">
                    <> <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> {t('blog_content.back_to_all_articles')} </>
                </Button>
            </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogCategoriaPage;