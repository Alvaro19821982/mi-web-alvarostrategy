import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, UserCircle, Tag, ArrowRight, Home as HomeIcon, BookOpen as BlogIconFile } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { blogPosts, BlogPost as BlogPostType } from '@/lib/blogData'; // Asegúrate que blogData está bien importado
import NotFound from './NotFound';
import { Helmet } from 'react-helmet-async';
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


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const stripHtml = (html: string): string => {
  if (typeof document !== "undefined") {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  return html; 
};

const getUnsplashImageUrlPost = (photoId: string, width: number = 1200, height: number = 630) => {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=80&auto=format&fm=webp`;
};

const generateArticleSchema = (post: BlogPostType, domain: string, postAbsoluteUrl: string) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": { "@type": "WebPage", "@id": postAbsoluteUrl },
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": getUnsplashImageUrlPost(post.image, 1200, 630),
      "width": 1200,
      "height": 630,
      "caption": post.imageAlt 
    },
    "author": { "@type": "Person", "name": "Álvaro Fernández de Celis", "url": `${domain}/quien-soy` },
    "publisher": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "logo": { "@type": "ImageObject", "url": `${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp` } // Logo de la organización
    },
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.lastModified || post.date).toISOString(),
    "articleSection": post.category, // Sección del artículo
    "articleBody": stripHtml(post.content).substring(0, 1000) + "...", 
    "keywords": post.tags.join(", ")
  };
  return JSON.stringify(schema);
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  
  if (!post) { return <NotFound />; }

  const domain = "https://alvarostrategy.com"; 
  const postAbsoluteUrl = `${domain}/blog/${post.slug}`;
  const articleSchemaJson = generateArticleSchema(post, domain, postAbsoluteUrl);

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Blog AlvaroStrategy`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link rel="canonical" href={postAbsoluteUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postAbsoluteUrl} />
        <meta property="og:image" content={getUnsplashImageUrlPost(post.image, 1200, 630)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post.imageAlt} />
        <meta property="og:site_name" content="AlvaroStrategy Blog" />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:modified_time" content={new Date(post.lastModified || post.date).toISOString()} />
        <meta property="article:author" content={`${domain}/quien-soy`} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={getUnsplashImageUrlPost(post.image, 1200, 630)} />
        <meta name="twitter:image:alt" content={post.imageAlt} />
        <script type="application/ld+json">{articleSchemaJson}</script>
      </Helmet>

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
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-xs sm:text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <HomeIcon className="h-3 w-3 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                      <Link to="/blog" className="text-xs sm:text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <BlogIconFile className="h-3 w-3 mr-1.5" />
                        Blog
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={`/blog/categoria/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {post.category}
                        </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                   {/* <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbPage className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-200 truncate max-w-[150px] sm:max-w-xs">
                        {post.title}
                      </BreadcrumbPage>
                  </BreadcrumbItem> TODO: Considerar si añadir el título del post aquí o es demasiado largo */}
                </BreadcrumbList>
              </Breadcrumb>
          </motion.div>

          <motion.header variants={fadeInUp} className="mb-6 md:mb-8">
             <div className="mb-3 sm:mb-4">
                <Link to={`/blog/categoria/${post.category.toLowerCase().replace(/\s+/g, '-')}`} aria-label={`Ver todos los artículos de la categoría ${post.category}`}>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-xs sm:text-sm font-medium transition-colors">
                        {post.category}
                    </Badge>
                </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 dark:text-slate-400 gap-x-4 gap-y-1 sm:gap-x-6">
              <div className="flex items-center" title="Fecha de publicación">
                <CalendarDays className="w-3.5 h-3.5 mr-1" /> {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center" title={`Autor: ${post.author}`}>
                <UserCircle className="w-3.5 h-3.5 mr-1" />
                <Link to="/quien-soy" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">{post.author}</Link>
              </div>
            </div>
             {post.tags && post.tags.length > 0 && (
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-2 gap-y-1 items-center">
                  <Tag className="w-3.5 h-3.5 mr-1 text-gray-400 dark:text-slate-500" />
                {post.tags.map(tag => (
                    <Link key={tag} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} aria-label={`Ver todos los artículos con la etiqueta ${tag}`}>
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">#{tag}</Badge>
                    </Link>
                ))}
              </div>
            )}
          </motion.header>

          {post.image && (
            <motion.img
              variants={fadeInUp}
              src={getUnsplashImageUrlPost(post.image)}
              alt={post.imageAlt} 
              className="w-full h-auto max-h-[450px] sm:max-h-[500px] object-cover rounded-lg sm:rounded-xl shadow-lg mb-8 md:mb-10"
              loading="lazy"
              width="1024"
              height="576"
            />
          )}
          
          <motion.div
            variants={fadeInUp}
            className="prose prose-base sm:prose-lg max-w-none 
                       dark:prose-invert 
                       prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-slate-100 prose-headings:scroll-mt-20
                       prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-5 prose-p:leading-relaxed sm:prose-p:leading-loose
                       prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-a:break-words
                       prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                       prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400 prose-blockquote:my-6 prose-blockquote:py-1 prose-blockquote:px-4
                       prose-li:my-1 prose-ul:pl-5 prose-ol:pl-5
                       prose-img:rounded-md prose-img:shadow-md
                       prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-100 prose-code:dark:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
                       prose-pre:bg-slate-800 prose-pre:dark:bg-slate-800 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-8 sm:my-12 md:my-16 dark:bg-slate-700" />

          <motion.div variants={fadeInUp} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border dark:border-slate-700">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-blue-500 dark:border-blue-400">
                <AvatarImage src={`${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp`} alt={post.author} />
                <AvatarFallback>{post.author.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Escrito por</p>
                <Link to="/quien-soy" className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.author}
                </Link>
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 leading-snug">
                    Consultor SEO y estratega en IA. Ayudo a negocios a crecer online con estrategias que funcionan. <Link to="/quien-soy" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">Saber más</Link>.
                </p>
            </div>
          </motion.div>

          {relatedPosts.length > 0 && (
            <motion.section variants={fadeInUp} className="mt-12 md:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center sm:text-left">
                También te podría interesar:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.slug} className="group bg-white dark:bg-slate-800/70 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col">
                     <Link to={`/blog/${relatedPost.slug}`} className="block" aria-label={`Leer ${relatedPost.title}`}>
                        <img
                            src={getUnsplashImageUrlPost(relatedPost.image, 600, 338)}
                            alt={relatedPost.imageAlt} 
                            className="w-full h-40 sm:h-44 object-cover group-hover:opacity-90 transition-opacity"
                            loading="lazy"
                            width="600"
                            height="338"
                        />
                     </Link>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <Link to={`/blog/categoria/${relatedPost.category.toLowerCase().replace(/\s+/g, '-')}`} className="inline-block mb-1.5">
                        <Badge variant="secondary" className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50">
                            {relatedPost.category}
                        </Badge>
                      </Link>
                      <CardTitle className="text-md font-semibold text-gray-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                        <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 flex-grow mb-3">
                        {relatedPost.excerpt}
                      </CardDescription>
                       <Link to={`/blog/${relatedPost.slug}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-auto self-start">
                        Leer más <ArrowRight className="inline w-3 h-3"/>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>
          )}

          <motion.div variants={fadeInUp} className="mt-12 md:mt-16 pt-8 border-t border-gray-200 dark:border-slate-700 text-center">
            <p className="text-lg text-gray-700 dark:text-slate-200 mb-6">
                ¿Te ha resultado útil este artículo? ¿Quieres aplicar estas ideas o una estrategia completa a tu negocio?
            </p>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 font-bold rounded-xl shadow-lg"
              onClick={() => navigate('/contacto', { state: { subject: `Consulta sobre el artículo: ${post.title}` } })}
              aria-label="Contactar para hablar sobre este artículo o tu estrategia"
            >
              Hablemos y diseñemos tu estrategia
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/blog')} className="group text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Volver a todos los artículos del blog
            </Button>
          </motion.div>

        </motion.article>
      </div>
    </>
  );
};

export default BlogPost;