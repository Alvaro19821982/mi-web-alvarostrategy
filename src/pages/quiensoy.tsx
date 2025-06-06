import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Brain, Briefcase, Linkedin, ExternalLink, UserCircle, Home as HomeIcon } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
      ease: "easeOut"
    }
  }
};

const QuienSoy = () => {
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate('/contacto', { state: { subject: "Interesado en saber más sobre AlvaroStrategy" } });
  };

  const domain = "https://alvarostrategy.com"; 
  const pageUrl = `${domain}/quien-soy`;
  const pageTitle = "Quién soy: Álvaro Fernández de Celis - Consultor SEO e IA";
  const pageDescription = "Conoce a Álvaro Fernández de Celis, consultor SEO y experto en IA. Descubre mi filosofía de trabajo, formación y cómo puedo ayudarte a transformar tu negocio online con estrategias que generan resultados reales.";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Álvaro Fernández de Celis",
      "alternateName": "AlvaroStrategy",
      "url": pageUrl,
      "image": `${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp`,
      "jobTitle": "Consultor SEO y Estratega en Inteligencia Artificial",
      "worksFor": {
        "@type": "Organization",
        "name": "AlvaroStrategy"
      },
      "description": "Consultor especializado en SEO avanzado y la aplicación práctica de la Inteligencia Artificial para ayudar a negocios a crecer de forma sostenible y rentable. Mi enfoque se basa en estrategias personalizadas, trabajo duro y una obsesión por los resultados medibles.",
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "BigSchool",
          "sameAs": "https://thebigschool.com/"
        }
      ],
      "knowsAbout": ["SEO", "Inteligencia Artificial", "Estrategia Digital", "Marketing de Contenidos", "CRO", "Analítica Web", "Growth Hacking"],
      "sameAs": [
        "https://www.linkedin.com/in/alvarofernandezdecelis/",
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Quién soy" }
      ]
    }
  };

  return (
    <>
    <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={`${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp`} />
        <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
        </script>
    </Helmet>
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6"
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
                <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Quién soy</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </motion.div>

        <motion.header
          variants={fadeInUp}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
            <UserCircle className="w-5 h-5 mr-2 inline-block" /> Un tipo diferente de consultor
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight">
            Detrás de la estrategia, <span className="whitespace-nowrap">hay un profesional</span>
          </h1>
        </motion.header>

        <motion.section
          variants={fadeInUp}
          className="bg-white dark:bg-slate-800/70 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border-t-4 border-blue-500 dark:border-blue-400 mb-12 md:mb-16"
        >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 sm:mb-8">
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-blue-500/50 dark:border-blue-400/50 shadow-lg">
                    <AvatarImage src="/images/Alvaro%20Fernandez%20de%20Celis.webp" alt="Álvaro Fernández de Celis - Consultor SEO e IA" />
                    <AvatarFallback>AFC</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">Álvaro Fernández de Celis</h2>
                    <p className="text-md sm:text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">Consultor SEO y estratega en inteligencia artificial</p>
                    <Button asChild variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900 group">
                        <a href="https://www.linkedin.com/in/alvarofernandezdecelis/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Perfil de LinkedIn de Álvaro Fernández de Celis">
                            <Linkedin className="w-4 h-4 mr-2"/> Ver perfil en LinkedIn <ExternalLink className="w-3 h-3 ml-1.5 opacity-70 group-hover:opacity-100"/>
                        </a>
                    </Button>
                </div>
            </div>

          <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert prose-p:mb-5 prose-p:leading-relaxed prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
            <p>
              A ver, que no te voy a soltar el rollo de siempre. No soy el típico consultor que te vende humo con powerpoints llenos de gráficos que ni entiendes ni te sirven para una mierda.
            </p>
            <p>
              Soy el tipo que se arremanga, se mete en el barro contigo y no para hasta que tu negocio <strong className="font-semibold">empieza a facturar lo que tiene que facturar.</strong> Ni más, ni menos.
            </p>
            <p>
              ¿Mi secreto? No hay secretos. Hay <strong className="font-semibold">trabajo duro, un método que funciona (el que te cuento en "<Link to="/mi-metodo" className="font-semibold hover:underline">nuestro método probado</Link>", por si no lo has visto) y una obsesión por los resultados.</strong> Resultados que se ven en tu cuenta bancaria, no en métricas de vanidad.
            </p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
        </motion.section>

        <motion.section
          variants={fadeInUp}
          className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 dark:from-blue-700 dark:via-indigo-800 dark:to-purple-900 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl text-white mb-12 md:mb-16"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold flex flex-col sm:flex-row items-center justify-center">
              <Briefcase className="w-8 h-8 mr-0 mb-2 sm:mb-0 sm:mr-3 flex-shrink-0" />
              <span>Formación que se traduce en RESULTADOS</span>
            </h2>
            <p className="text-lg sm:text-xl text-blue-200/90 dark:text-blue-300/90 mt-1 sm:mt-2 font-medium">
              (Para ti, claro. Y para tu negocio)
            </p>
          </div>

          <p className="text-md sm:text-lg mb-8 leading-relaxed text-blue-100/90 dark:text-blue-200/90 prose prose-invert max-w-none prose-strong:text-white">
            No he salido de debajo de una piedra. Detrás de cada estrategia, de cada consejo, hay horas de estudio, de pruebas, de errores (de los que se aprende, ojo) y, sí, también formación de la buena, <strong className="font-semibold">verificable y aplicada</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            
            <Card className="bg-white/10 dark:bg-white/5 p-5 sm:p-6 rounded-xl backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 flex flex-col">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-400/50 rounded-full mr-3 ring-1 ring-blue-300/70">
                      <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-white">Máster en SEO profesional</CardTitle>
                </div>
                <CardDescription className="text-sm text-blue-200/80 dark:text-blue-300/80">Por BigSchool</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0 text-sm sm:text-base text-blue-100/90 dark:text-blue-200/90 leading-relaxed flex-grow flex flex-col">
                <p className="mb-3">
                  Para que tu web no sea un fantasma en los motores de búsqueda. Para que te encuentren los que tienen la cartera lista, no los curiosos. Dominando desde la técnica más profunda hasta la estrategia de contenidos que realmente convierte.
                </p>
                
                <div className="mt-auto"> 
                  <img src="/images/Titulo%20de%20Master%20de%20SEO%20de%20BigSchool%20Alvaro%20Fernandez%20de%20Celis.webp" alt="Título Máster SEO Alvaro Fernández de Celis" className="rounded-md shadow-md border border-blue-300/30 max-h-60 object-contain mx-auto mb-3" loading="lazy" width="300" height="212"/>
                </div>
              </CardContent>
              <CardFooter className="p-0 mt-auto pt-4"> 
                <Button asChild variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 group">
                    <a href="https://credsverse.com/credentials/490463f5-50ba-4e64-8f46-0cb92d1325a2" target="_blank" rel="noopener noreferrer nofollow" aria-label="Ver credencial del Máster en SEO en Credsverse">
                        Ver credencial <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80 group-hover:opacity-100"/>
                    </a>
                </Button>
              </CardFooter>
            </Card>

            
            <Card className="bg-white/10 dark:bg-white/5 p-5 sm:p-6 rounded-xl backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300 flex flex-col">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-indigo-400/50 rounded-full mr-3 ring-1 ring-indigo-300/70">
                      <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-white">Máster en IA aplicada a negocios</CardTitle>
                </div>
                <CardDescription className="text-sm text-blue-200/80 dark:text-blue-300/80">Por BigSchool</CardDescription>
              </CardHeader>
              
              <CardContent className="p-0 text-sm sm:text-base text-blue-100/90 dark:text-blue-200/90 leading-relaxed flex-grow flex flex-col">
                <p className="mb-3">
                  La IA no es (solo) el futuro, es el AHORA. La uso para optimizar procesos, automatizar tareas repetitivas y, sobre todo, para que ganes más invirtiendo menos tiempo y dinero. Decisiones basadas en datos, no en corazonadas.
                </p>
                 
                <div className="mt-auto">
                  <img src="/images/Titulo%20de%20Master%20de%20IA%20de%20BigSchool%20Alvaro%20Fernandez%20de%20Celis.webp" alt="Título Máster IA Alvaro Fernández de Celis" className="rounded-md shadow-md border border-indigo-300/30 max-h-60 object-contain mx-auto mb-3" loading="lazy" width="300" height="212"/>
                </div>
              </CardContent>
              <CardFooter className="p-0 mt-auto pt-4"> 
                <Button asChild variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 group">
                    <a href="https://credsverse.com/credentials/6e5619ae-a882-4caf-bb71-06bc1c86894b" target="_blank" rel="noopener noreferrer nofollow" aria-label="Ver credencial del Máster en IA en Credsverse">
                        Ver credencial <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80 group-hover:opacity-100"/>
                    </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <p className="text-md sm:text-lg text-center leading-relaxed text-blue-100/90 dark:text-blue-200/90 prose prose-invert max-w-none prose-strong:text-white">
            Y sí, <strong className="font-semibold">puedes verificar cada título cuando quieras</strong>, que aquí no vendemos diplomas de "Academia Pajarito". Lo que ofrezco son estrategias que funcionan porque están fundamentadas en conocimiento sólido y experiencia práctica.
          </p>
        </motion.section>

        <motion.section variants={fadeInUp} className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-slate-100 mb-6">
            ¿Listo para una estrategia sin humo y con resultados?
          </h2>
          <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Si estás harto de consultores que te cuentan milongas y no entregan resultados, si quieres una estrategia clara, directa al grano y que te haga ganar más mientras duermes más tranquilo, entonces estamos en la misma sintonía.
          </p>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 w-full sm:w-auto"
            onClick={navigateToContact}
            aria-label="Contactar para hablar sobre tu proyecto"
          >
            Hablemos sin rodeos (es gratis)
            <ArrowRight className="ml-2 w-5 h-5 sm:ml-2.5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
          </Button>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-4 italic">
            Si buscas más de lo mismo o soluciones mágicas, mejor sigue buscando. Aquí hay trabajo y estrategia.
          </p>
        </motion.section>

      </motion.div>
    </div>
    </>
  );
};

export default QuienSoy;