import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CalendarDays, UserCircle, Tag as TagIcon, Home as HomeIcon, BookOpen as BlogIconFile, ArrowLeft } from "lucide-react"; // TagIcon para tags
import { motion, Variants } from 'framer-motion';
import { blogPosts, BlogPost as BlogPostType } from '@/lib/blogData';
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

const getUnsplashImageUrlBlog = (photoId: string, width: number = 800, height: number = 450) => {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=75&auto=format&fm=webp`;
};

const formatCategoryOrTagName = (slug: string): string => {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const BlogTagPage = () => {
  const navigate = useNavigate();
  const { tagSlug } = useParams<{ tagSlug: string }>();

  if (!tagSlug) return <NotFound />;

  const tagName = formatCategoryOrTagName(tagSlug);
  
  const displayedPosts = blogPosts.filter(post => 
    post.tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-')).includes(tagSlug)
  );

  const domain = "https://alvarostrategy.com";
  const pageUrl = `${domain}/blog/tag/${tagSlug}`;
  const pageTitle = `Artículos etiquetados con "${tagName}" | Blog AlvaroStrategy`;
  const pageDescription = `Encuentra todos los posts y artículos etiquetados con "${tagName}". Contenido especializado de AlvaroStrategy.`;

  if (displayedPosts.length === 0) {
    // Manejo si no hay posts para este tag
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="noindex, follow" /> {/* IMPORTANTE: NOINDEX para páginas de tag */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-4 sm:px-6"
        >
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                      Inicio
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <BlogIconFile className="h-3.5 w-3.5 mr-1.5" />
                      Blog
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Tag: {tagName}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.header
            variants={fadeInUp}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <Badge className="mb-5 sm:mb-6 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 text-sm sm:text-base font-semibold rounded-lg shadow-sm cursor-default">
              <TagIcon className="w-5 h-5 mr-2 inline-block" /> Etiqueta del blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 leading-tight mb-4">
              Artículos con la etiqueta: <span className="text-purple-600 dark:text-purple-400">{tagName}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explora todos los posts que hemos etiquetado con "{tagName}".
            </p>
          </motion.header>

          {displayedPosts.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
            >
              {displayedPosts.map((post) => (
                <motion.div key={post.slug} variants={fadeInUp} className="h-full flex">
                  <Card className="group bg-white dark:bg-slate-800/70 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border border-gray-200/70 dark:border-slate-700/50 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5">
                    <Link to={`/blog/${post.slug}`} className="block" aria-label={`Leer más sobre ${post.title}`}>
                      <img
                        src={getUnsplashImageUrlBlog(post.image)}
                        alt={post.imageAlt}
                        className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width="800"
                        height="450"
                      />
                    </Link>
                    <CardHeader className="p-5 sm:p-6">
                       <div className="mb-2.5 sm:mb-3">
                          <Link to={`/blog/categoria/${post.category.toLowerCase().replace(/\s+/g, '-')}`} aria-label={`Ver todos los artículos de la categoría ${post.category}`}>
                            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-xs sm:text-sm font-medium transition-colors">
                              {post.category}
                            </Badge>
                          </Link>
                        </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                       <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mt-2 space-x-3">
                          <div className="flex items-center" title="Fecha de publicación">
                              <CalendarDays className="w-3.5 h-3.5 mr-1" /> {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                          <div className="flex items-center" title={`Autor: ${post.author}`}>
                              <UserCircle className="w-3.5 h-3.5 mr-1" /> {post.author}
                          </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-6 pt-0 flex-grow flex flex-col">
                      <CardDescription className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow">
                        {post.excerpt}
                      </CardDescription>
                      <div className="mt-auto">
                        {/* No mostramos los tags de nuevo ya que estamos en una página de tag */}
                        <Button asChild variant="link" className="group text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 px-0 font-semibold">
                          <Link to={`/blog/${post.slug}`}>
                            Leer artículo completo
                            <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              Actualmente no hay artículos con la etiqueta "{tagName}". Vuelve pronto.
            </motion.p>
          )}
           <motion.div variants={fadeInUp} className="mt-12 text-center">
                <Button onClick={() => navigate("/blog")} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Volver a todos los artículos
                </Button>
            </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default BlogTagPage;