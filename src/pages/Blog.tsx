import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CalendarDays, UserCircle, Tag, Home as HomeIcon, BookOpen as BlogIconFile } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { blogPosts, BlogPost as BlogPostType } from '@/lib/blogData'; // Asegúrate que blogData está bien importado
import { Helmet } from 'react-helmet-async';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const Blog = () => {
  const navigate = useNavigate();
  const displayedPosts = blogPosts; // Asumiendo que blogPosts ya está ordenado como deseas

  const domain = "https://alvarostrategy.com"; 
  const pageUrl = `${domain}/blog`;
  const pageTitle = "Blog de estrategia digital, SEO e IA | AlvaroStrategy";
  const pageDescription = "Descubre artículos, guías y reflexiones sobre SEO avanzado, inteligencia artificial aplicada a negocios y estrategias de marketing digital que generan resultados reales.";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "logo": {
        "@type": "ImageObject",
        "url": `${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp` 
      }
    },
    "blogPost": blogPosts.slice(0, 5).map(post => ({ // Tomar los primeros 5 como ejemplo
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${pageUrl}/${post.slug}`, // URL absoluta del post
      "image": getUnsplashImageUrlBlog(post.image, 1200, 630), // Usar una imagen representativa
      "datePublished": new Date(post.date).toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": `${domain}/quien-soy`
      },
      "description": post.excerpt
    }))
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" /> {/* Asegurar indexación */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" /> {/* O 'blog' si es más apropiado */}
        <meta property="og:image" content={`${domain}/images/og-blog-alvarostrategy.webp`} /> {/* Imagen genérica para la página del blog */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-blog-alvarostrategy.webp`} /> {/* Imagen genérica para Twitter */}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
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
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Blog</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

        <motion.header
          variants={fadeInUp}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
            <BlogIconFile className="w-5 h-5 mr-2 inline-block" /> Ideas frescas, estrategias claras
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
            El blog que NO te da la chapa
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
            Aquí no encontrarás refritos ni teorías de salón. Solo estrategias probadas, ideas que funcionan y un poco de "sin pelos en la lengua" para que tu negocio despegue de una vez por todas.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
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
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                       {post.tags && post.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2 items-center">
                          <Tag className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500"/>
                          {post.tags.map(tag => (
                            <Link key={tag} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} aria-label={`Ver todos los artículos con la etiqueta ${tag}`}>
                                <Badge variant="outline" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">#{tag}</Badge>
                            </Link>
                          ))}
                        </div>
                      )}
                      <Button asChild variant="link" className="group text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-0 font-semibold">
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
            Todavía no hemos publicado nada en el blog. ¡Pero estamos en ello, no te creas! Vuelve pronto para encontrar contenido de valor.
          </motion.p>
        )}

        <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mt-16 md:mt-20 lg:mt-24 py-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-slate-100 mb-4">
            ¿Listo para que te explote la cabeza (de ideas y estrategias)?
          </h2>
          <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed sm:leading-loose">
            Si lo que has leído te resuena y quieres una estrategia digital que te haga ganar más y dormir mejor, es hora de que hablemos.
          </p>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            onClick={() => navigate('/contacto', { state: { subject: "Interesado en estrategia digital (desde el Blog)"}})}
            aria-label="Contactar para hablar sobre estrategia digital"
          >
            Hablemos sin compromiso
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </motion.section>

      </motion.div>
    </div>
    </>
  );
};

export default Blog;