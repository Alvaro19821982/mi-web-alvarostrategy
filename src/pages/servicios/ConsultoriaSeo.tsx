// src/pages/servicios/ConsultoriaSeo.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ArrowRight,
    ArrowLeft, // Para el botón de "Fase Anterior" en el futuro, o para "Volver a Servicios"
    SearchCheck, // Icono principal del servicio
    ShieldCheck,
    BarChartHorizontalBig,
    Zap,
    Lightbulb,
    Check,
    Users,
    Cog,          // Para SEO Técnico
    PenTool,      // Para Contenido y Semántica
    Link2,        // Para Link Building / Autoridad
    MapPin,       // Para SEO Local
    Store,        // Para SEO E-commerce
    Cpu,          // Para IA en SEO
    Home as HomeIcon, // Para Breadcrumbs
    Briefcase     // Para enlace a todos los servicios
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 }, // Reducido y para suavizar
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } // Más rápido
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Más sutil
      delayChildren: 0.15, // Ligero retraso inicial
      ease: "easeOut"
    }
  }
};

interface SeoPillar {
  icon: React.ReactElement;
  title: string;
  description: string;
  details?: string[];
  colorClass?: string;
}

// Textos con capitalización corregida
const seoPillarsData: SeoPillar[] = [
  { icon: <Cog className="w-7 h-7"/>, title: "SEO técnico impecable y WPO", description: "Auditoría completa, optimización de la velocidad de carga (WPO), arquitectura web mobile-first, mejora de la indexabilidad, implementación de datos estructurados avanzados (schema.org) y planificación y ejecución de migraciones SEO seguras.", details: ["Core Web Vitals y PageSpeed", "Schema.org avanzado y entidades", "Internacionalización (hreflang)", "Gestión de logs y rastreo"], colorClass: "text-indigo-600 dark:text-indigo-400" },
  { icon: <PenTool className="w-7 h-7"/>, title: "SEO semántico y arquitectura de contenido", description: "Investigación profunda de entidades y su relación con el 'knowledge graph' de Google, desarrollo de mapas tópicos (topic clusters), creación de clústeres de contenido temáticos y optimización para la 'autoría algorítmica' y E-E-A-T.", details: ["Topic clusters y páginas pilar", "Análisis de entidades y atributos", "Optimización semántica de contenidos"], colorClass: "text-sky-600 dark:text-sky-400"},
  { icon: <Lightbulb className="w-7 h-7"/>, title: "Estrategias de contenido SEO que convierten", description: "Desarrollo de 'content briefs' semánticos y detallados, creación y optimización de contenido de alto impacto (texto, visual, interactivo) que responde a la intención de búsqueda del usuario en cada etapa del 'customer journey'.", details: ["Contenido para cada etapa del funnel", "Formatos multimedia y rich content", "Actualización y 'evergreen content'"], colorClass: "text-purple-600 dark:text-purple-400"},
  { icon: <Link2 className="w-7 h-7"/>, title: "Construcción de autoridad y E-E-A-T", description: "Estrategias de 'link building' ético y de alta calidad (no compramos enlaces), 'digital PR' efectivo y gestión proactiva de la reputación online para fortalecer tu Experiencia, Pericia, Autoridad y Confianza (E-E-A-T) ante Google y tus usuarios.", details: ["Link earning y outreach cualificado", "Menciones de marca y 'brand building'", "Gestión de reseñas y reputación online"], colorClass: "text-fuchsia-600 dark:text-fuchsia-400"},
  { icon: <MapPin className="w-7 h-7"/>, title: "SEO local avanzado", description: "Optimización exhaustiva y continua de Google Business Profile (GBP), gestión de citaciones locales NAP (Nombre, Dirección, Teléfono) consistentes, estrategia de contenido geolocalizado relevante y generación de reseñas locales auténticas.", details: ["Optimización GBP avanzada y posts", "NAP consistency y citaciones clave", "Local landing pages y contenido geoespecífico"], colorClass: "text-pink-600 dark:text-pink-400"},
  { icon: <Store className="w-7 h-7"/>, title: "SEO para e-commerce", description: "Optimización avanzada de fichas de producto y páginas de categoría, diseño de arquitectura web específica para tiendas online, enlazado interno estratégico, gestión eficiente de la navegación por facetas (filtros) y URLs parametrizadas.", details: ["SEO para categorías y productos", "Optimización de filtros y faceted search", "Gestión de URLs y contenido duplicado"], colorClass: "text-rose-600 dark:text-rose-400"},
  { icon: <Cpu className="w-7 h-7"/>, title: "IA aplicada al SEO y automatización inteligente", description: "Uso estratégico de herramientas de inteligencia artificial para análisis predictivo de tendencias de búsqueda, automatización de tareas SEO repetitivas (ej. meta-descripciones), generación asistida de ideas de contenido y optimización continua de estrategias a gran escala.", details: ["Análisis de logs con IA", "Automatización de reportes y alertas", "Generación de meta-descripciones asistida por IA"], colorClass: "text-red-600 dark:text-red-400"},
];

const methodologySteps = [
    { title: "Auditoría y diagnóstico SEO profundo", description: "Realizamos un análisis 360º de tu situación actual para identificar fortalezas, debilidades, oportunidades clave y amenazas en tu presencia orgánica.", icon: <SearchCheck className="w-8 h-8 mb-3 text-indigo-500 dark:text-indigo-400"/> },
    { title: "Estrategia y planificación personalizada", description: "Definimos una hoja de ruta SEO a medida, alineada con tus objetivos de negocio, tu nicho y tus recursos, priorizando acciones de alto impacto.", icon: <PenTool className="w-8 h-8 mb-3 text-indigo-500 dark:text-indigo-400"/> },
    { title: "Implementación y optimización continua", description: "Ejecutamos el plan de acción meticulosamente y realizamos ajustes y optimizaciones constantes basados en datos, rendimiento y cambios en el algoritmo.", icon: <Cog className="w-8 h-8 mb-3 text-indigo-500 dark:text-indigo-400"/> },
    { title: "Medición y reporting transparente", description: "Te mantenemos informado con reportes claros, personalizados y comprensibles sobre el progreso, los resultados obtenidos y los próximos pasos.", icon: <BarChartHorizontalBig className="w-8 h-8 mb-3 text-indigo-500 dark:text-indigo-400"/> }
];

const ConsultoriaSeo = () => {
  const navigate = useNavigate();

  const domain = "https://alvarostrategy.com"; // TODO: USER: Confirmar dominio final
  const pageUrl = `${domain}/servicios/consultoria-seo`;
  const pageTitle = "Consultoría SEO avanzada: Domina Google y multiplica tu visibilidad online"; // Capitalización corregida
  const pageDescription = "Servicio de consultoría SEO especializada para empresas que buscan resultados. Maximizamos tu tráfico orgánico cualificado y convertimos tu web en referente con SEO técnico, semántico, E-E-A-T, local y para e-commerce."; // Capitalización corregida

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consultoría SEO Avanzada", // Nombre del servicio específico
    "serviceType": "Consultoría en Optimización para Motores de Búsqueda (SEO)", // Tipo de servicio más específico
    "description": pageDescription,
    "url": pageUrl,
    "mainEntityOfPage": pageUrl,
    "provider": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "url": domain,
      "logo": `${domain}/images/logo/logo-light-theme.png` // TODO: USER: Confirmar path del logo y dominio
    },
    "areaServed": { // Define dónde se ofrece el servicio
      "@type": "Country",
      "name": "ES" // España como ejemplo, puede ser "Global" o una lista de países/regiones
    },
    "serviceOutput": [ // ¿Qué entrega concretamente el servicio?
        {"@type": "Report", "name": "Auditoría SEO Técnica Completa y Plan de Corrección"},
        {"@type": "Report", "name": "Estrategia de Contenido SEO y Keyword Research Detallado"},
        {"@type": "Report", "name": "Plan de Link Building Ético y Estrategia de Autoridad"},
        {"@type": "Report", "name": "Informes de Rendimiento SEO Personalizados y Accionables"}
    ],
    "keywords": "consultoría SEO, SEO avanzado, experto SEO, agencia SEO, posicionamiento web, SEO técnico, SEO semántico, E-E-A-T, SEO local, SEO e-commerce, auditoría SEO, estrategia SEO, optimización web", // Palabras clave relevantes
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Consultoría SEO",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", // El servicio ofrecido
            "name": "Consultoría SEO Avanzada",
            "url": pageUrl
          }
          // Podrías añadir "priceSpecification" si tienes precios fijos o rangos
        }
      ]
    },
    "potentialAction": { // Una acción que el usuario puede tomar
        "@type": "CommunicateAction", // O "ReserveAction" si es para una sesión/auditoría agendada
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${domain}/contacto?servicio=consultoria-seo&utm_source=schema&utm_medium=servpage_seo`, // URL con parámetros para seguimiento
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/IOSPlatform", "http://schema.org/AndroidPlatform"]
        },
        "name": "Solicitar Diagnóstico SEO o Propuesta de Consultoría"
    }
    // Considerar "review" o "aggregateRating" si hay testimonios directamente en esta página.
  };

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | AlvaroStrategy`}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" /> {/* Podría ser 'article' si el contenido es muy extenso */}
        {/* <meta property="og:image" content={`${domain}/images/og-consultoria-seo.webp`} /> */} {/* TODO: USER: Imagen OG específica */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        {/* <meta name="twitter:image" content={`${domain}/images/twitter-consultoria-seo.webp`} /> */} {/* TODO: USER: Imagen Twitter específica */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white dark:from-indigo-700 dark:via-purple-800 dark:to-pink-700"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
              <Badge className="bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                <SearchCheck className="w-4 h-4 mr-2 inline-block" /> SEO que transforma negocios
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black leading-tight mb-5 sm:mb-6"
            >
              Consultoría SEO avanzada {/* Capitalización corregida */}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl lg:text-2xl text-indigo-100/90 dark:text-indigo-200/90 mb-8 sm:mb-10 max-w-3xl mx-auto"
            >
              Domina Google y multiplica tu tráfico orgánico cualificado. No solo te hacemos visible, te convertimos en la <strong className="font-semibold text-white">referencia indiscutible de tu sector</strong> con estrategias SEO que generan negocio real y sostenible.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="group bg-white text-indigo-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate('/contacto', { state: { subject: "Interesado en consultoría SEO avanzada" }})} // Capitalización corregida
                aria-label="Solicitar diagnóstico SEO o propuesta de consultoría"
              >
                Solicita tu diagnóstico SEO
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-10 md:mb-12">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                      <Link to="/servicios" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Servicios
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Consultoría SEO avanzada</BreadcrumbPage> {/* Capitalización corregida */}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
            
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-10 md:mb-12 lg:mb-16 text-center prose prose-base sm:prose-lg max-w-3xl mx-auto
                         prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-slate-100 
                         prose-p:text-gray-600 dark:prose-p:text-slate-300 prose-p:mb-5 sm:prose-p:mb-6 prose-p:leading-relaxed sm:prose-p:leading-loose
                         prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8"> {/* Espaciado ajustado */}
                ¿El SEO "básico" ya no te funciona? <span className="block sm:inline">Es hora de evolucionar.</span> {/* Capitalización corregida */}
              </h2>
              <p>
                En un entorno digital cada vez más complejo y competitivo, las tácticas SEO superficiales o anticuadas han dejado de ser efectivas. Para destacar de verdad y capturar a tu audiencia ideal, necesitas un <strong className="font-semibold text-indigo-600 dark:text-indigo-400">enfoque SEO 360º y profesional</strong> que abarque desde la optimización técnica más depurada y la arquitectura web inteligente, hasta la creación de contenido semánticamente rico y la construcción de una autoridad de marca (E-E-A-T) incontestable ante Google y tus usuarios.
              </p>
            </motion.section>

            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                Nuestros pilares de <span className="text-indigo-600 dark:text-indigo-400">consultoría SEO avanzada</span> {/* Capitalización corregida */}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {seoPillarsData.map((pillar) => (
                  <motion.div key={pillar.title} variants={fadeInUp} className="h-full flex">
                    <Card className="h-full bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-5 sm:p-6 border-t-4 border-indigo-500 dark:border-indigo-400 w-full flex flex-col">
                      <div className="flex justify-center mb-4">
                        {React.cloneElement(pillar.icon, {className: cn("w-8 h-8", pillar.colorClass)})}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 text-center">{pillar.title}</h3> {/* Capitalización ya es correcta por ser título */}
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed text-center flex-grow">{pillar.description}</p>
                      {pillar.details && pillar.details.length > 0 && (
                            <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-slate-700/50"> {/* Eliminado mt-4 de aquí */}
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5 text-center font-medium">Incluye:</CardDescription>
                                <ul className="text-xs text-gray-500 dark:text-slate-400 space-y-1 text-center">
                                    {pillar.details.map(detail => <li key={detail}>{detail}</li>)}
                                </ul>
                            </div>
                        )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                Nuestra <span className="text-indigo-600 dark:text-indigo-400">metodología de trabajo</span> SEO probada {/* Capitalización corregida */}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {methodologySteps.map((step, index) => (
                  <motion.div key={step.title} variants={fadeInUp} className="flex flex-col items-center text-center bg-white dark:bg-slate-800/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-indigo-500 dark:bg-indigo-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold mb-4 shadow-md">
                      {index + 1}
                    </div>
                    <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">{step.title}</h3> {/* Capitalización ya es correcta por ser título */}
                    <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mb-12 md:mb-16 lg:mb-20 bg-indigo-50 dark:bg-indigo-900/30 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-indigo-200 dark:border-indigo-700/50"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 text-center mb-8 sm:mb-10">
                ¿Por qué elegir nuestra consultoría SEO? {/* Capitalización corregida */}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div className="flex flex-col items-center p-4">
                  <ShieldCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">Resultados, no solo rankings</h3> {/* Capitalización corregida */}
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">Nos enfocamos en un SEO que impulsa tu negocio: más leads cualificados, más ventas y mayor rentabilidad sostenible.</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <Zap className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">Siempre actualizados y proactivos</h3> {/* Capitalización corregida */}
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">Dominamos los últimos cambios de Google, las tendencias SEO emergentes y las herramientas más efectivas. No esperamos, actuamos.</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <Users className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">Transparencia total y partnership</h3> {/* Capitalización corregida */}
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">Comunicación clara, honesta y constante. Entenderás cada paso de nuestra estrategia y nos verás como una extensión de tu equipo.</p>
                </div>
              </div>
            </motion.section>
            
            {/* TODO: Descomentar y adaptar cuando la página de Casos de Éxito y su contenido estén listos.
            <motion.section className="mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                Éxito demostrado en <span className="text-indigo-600 dark:text-indigo-400">proyectos SEO desafiantes</span>
              </h2>
              {/* Aquí irían los mini-casos de éxito filtrados por SEO *}
            </motion.section>
            */}

            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl shadow-2xl text-center"
            >
              <BarChartHorizontalBig className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 sm:mb-6 opacity-80" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">
                ¿Listo para que tu visibilidad orgánica despegue de verdad? {/* Capitalización corregida */}
              </h2>
              <p className="text-md sm:text-lg lg:text-xl text-indigo-100/90 dark:text-indigo-200/90 mb-8 max-w-2xl mx-auto leading-relaxed sm:leading-loose">
                Nuestros planes de consultoría SEO se adaptan 100% a tus necesidades y ambición, desde auditorías técnicas profundas y estrategias de contenido puntuales hasta un acompañamiento estratégico mensual integral.
              </p>
              <Button
                size="lg"
                className="group bg-white text-indigo-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate('/contacto', { state: { subject: "Solicitud de Diagnóstico SEO Gratuito / Consultoría SEO Avanzada" }})} // Capitalización corregida
                aria-label="Solicitar diagnóstico SEO gratuito o propuesta de consultoría SEO"
              >
                Solicita tu diagnóstico SEO gratuito
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
              <p className="text-sm text-indigo-200/80 dark:text-indigo-300/80 mt-6 italic">
                Descubre el potencial oculto de tu web y cómo podemos ayudarte a dominar los resultados de búsqueda de forma ética y sostenible.
              </p>
            </motion.section>
            
            <motion.div variants={fadeInUp} className="mt-12 md:mt-16 text-center">
                 <Button size="sm" variant="ghost" asChild className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                    <Link to="/servicios">
                        <Briefcase className="w-4 h-4 mr-2" /> Ver todos nuestros servicios
                    </Link>
                </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultoriaSeo;