// src/pages/servicios/EstrategiaDigitalIntegral.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ArrowRight,
    Lightbulb,
    Check,
    BarChart3,
    Cog,
    Users,
    Shield,
    Target,
    TrendingUp,
    Zap,
    Search,
    Brain,
    ShoppingCart, // Podría usarse para beneficios relacionados con ventas
    Home as HomeIcon, // Para Breadcrumbs
    Scaling,
    CheckCircle,
    Briefcase // Para enlace a todos los servicios
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
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

interface ServiceDetailItem {
  icon: React.ReactElement;
  title: string;
  description: string;
  link?: string;
  colorClass?: string;
}

const serviceIncludes: ServiceDetailItem[] = [
  { icon: <Search className="w-6 h-6"/>, title: "Diagnóstico 360º y auditoría inicial", description: "Análisis profundo de tu situación actual digital (DAFO), competencia directa e indirecta, y oportunidades de mercado no explotadas.", colorClass: "text-blue-600"},
  { icon: <Target className="w-6 h-6"/>, title: "Definición de objetivos SMART y KPIs clave", description: "Establecemos metas claras, medibles, alcanzables, relevantes y temporales (SMART), alineadas con tus objetivos de negocio y definimos los indicadores de rendimiento (KPIs) para medir el éxito.", colorClass: "text-sky-600"},
  { icon: <Cog className="w-6 h-6"/>, title: "Desarrollo de la estrategia con nuestro método probado", description: "Aplicamos nuestro framework integral (Producto/Marca, Adquisición, Conversión, Progresión, Recurrencia y Escalabilidad) como hoja de ruta.", link:"/mi-metodo", colorClass: "text-indigo-600" },
  { icon: <TrendingUp className="w-6 h-6"/>, title: "Integración estratégica de SEO avanzado", description: "Desde la arquitectura web, optimización técnica y SEO semántico hasta la creación de contenido E-E-A-T y la construcción de autoridad de dominio sostenible.", colorClass: "text-purple-600"},
  { icon: <Brain className="w-6 h-6"/>, title: "Aplicación táctica de inteligencia artificial", description: "Identificamos y aplicamos soluciones de IA para optimizar procesos de marketing y ventas, personalizar la experiencia de usuario, analizar grandes volúmenes de datos y mejorar la eficiencia operativa general.", colorClass: "text-fuchsia-600"},
  { icon: <BarChart3 className="w-6 h-6"/>, title: "Plan de acción detallado y hoja de ruta trimestral", description: "Te entregamos un plan de trabajo claro con acciones priorizadas, cronograma estimado y responsables para cada etapa, revisable trimestralmente.", colorClass: "text-pink-600"},
  { icon: <Users className="w-6 h-6"/>, title: "Implementación asistida, formación y seguimiento continuo", description: "Te acompañamos en la ejecución de la estrategia, formamos a tu equipo si es necesario, y realizamos un seguimiento continuo de los KPIs para asegurar el cumplimiento de los objetivos y realizar ajustes proactivos.", colorClass: "text-rose-600"},
];

const serviceBenefits: { title: string; description: string; icon: React.ReactElement }[] = [
    { icon: <CheckCircle className="text-green-500 dark:text-green-400 w-7 h-7" />, title: "Claridad y enfoque estratégico", description: "Una hoja de ruta detallada que alinea todas tus acciones de marketing digital hacia objetivos de negocio comunes y medibles." },
    { icon: <TrendingUp className="text-green-500 dark:text-green-400 w-7 h-7" />, title: "Crecimiento sostenible y rentable", description: "Estrategias diseñadas para el largo plazo, enfocadas en un crecimiento real de ingresos, beneficios y cuota de mercado." },
    { icon: <Scaling className="text-green-500 dark:text-green-400 w-7 h-7" />, title: "Optimización de la inversión (ROI)", description: "Maximizamos el retorno de cada euro invertido en marketing digital, eliminando gastos innecesarios y enfocándonos en las acciones de mayor impacto." },
    { icon: <Shield className="text-green-500 dark:text-green-400 w-7 h-7" />, title: "Ventaja competitiva duradera", description: "Te posicionamos por delante de tu competencia con una estrategia integral sólida, diferenciada y difícil de replicar." },
    { icon: <Zap className="text-green-500 dark:text-green-400 w-7 h-7" />, title: "Adaptabilidad y preparación futura", description: "Construimos una base estratégica y tecnológica flexible que te permite adaptarte a los cambios del mercado y las nuevas tecnologías emergentes." },
    { icon: <Lightbulb className="text-green-500 dark:text-green-400 w-7 h-7" />, title: "Toma de decisiones informada", description: "Acceso a datos y análisis relevantes para tomar decisiones de negocio y marketing basadas en evidencia, no en intuiciones." },
];

// TODO: Descomentar y actualizar cuando la página de Casos de Éxito esté lista.
/*
const miniCaseStudies = [
    {
        slug: "caso-ecommerce-moda", // Esto debería coincidir con el slug real del caso de éxito
        title: "E-commerce de Moda Duplica Ventas en 6 Meses",
        result: "+115% Ventas",
        description: "Implementación completa de nuestra estrategia integral con foco en SEO avanzado y optimización de la conversión (CRO)."
    },
    {
        slug: "caso-saas-b2b-crecimiento",
        title: "Empresa SaaS B2B Aumenta Leads Cualificados en un 80%",
        result: "+80% Leads",
        description: "Estrategia digital integral centrada en marketing de contenidos B2B, SEO técnico y automatización de marketing con IA."
    }
];
*/

const EstrategiaDigitalIntegral = () => {
  const navigate = useNavigate();

  const domain = "https://alvarostrategy.com"; // TODO: USER: Confirmar dominio final
  const pageUrl = `${domain}/servicios/estrategia-digital-integral`;
  const pageTitle = "Servicio de estrategia digital integral: Tu plan maestro para el éxito online";
  const pageDescription = "Descubre nuestro servicio de estrategia digital integral. Aplicamos un método probado, SEO avanzado e inteligencia artificial para crear y ejecutar tu plan de éxito online sostenible y rentable.";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Servicio de Estrategia Digital Integral",
    "serviceType": "Consultoría en Estrategia Digital",
    "description": pageDescription,
    "url": pageUrl,
    "mainEntityOfPage": pageUrl,
    "provider": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "url": domain,
      "logo": `${domain}/images/logo/logo-light-theme.png` // TODO: USER: Confirmar path del logo
    },
    "areaServed": {
      "@type": "Country",
      "name": "ES" // Especificar si es global o más específico
    },
    "serviceOutput": [ // ¿Qué entrega el servicio?
        {"@type": "Report", "name": "Diagnóstico Digital 360º"},
        {"@type": "Report", "name": "Plan de Estrategia Digital Personalizado"},
        {"@type": "Action", "name": "Implementación y Seguimiento de Estrategia"}
    ],
    "keywords": "estrategia digital, consultoría de marketing digital, plan de marketing online, SEO integral, IA en marketing, crecimiento de negocio online, transformación digital",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Consultoría AlvaroStrategy",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Estrategia Digital Integral",
            "url": pageUrl
          }
          // Podrías añadir "priceSpecification" si tienes precios fijos o rangos
        }
      ]
    },
    "potentialAction": {
        "@type": "ReserveAction", // O "OrderAction" si es una compra directa
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${domain}/contacto?servicio=estrategia-digital-integral&utm_source=schema&utm_medium=servpage_edi`,
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform"
          ]
        },
        "name": "Solicitar Propuesta para Estrategia Digital Integral"
    }
    // Considerar añadir "review" o "aggregateRating" si hay testimonios directamente en esta página.
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
        <meta property="og:type" content="website" /> {/* O 'article' si la página es muy extensa como un artículo */}
        {/* <meta property="og:image" content={`${domain}/images/og-estrategia-digital.webp`} /> */} {/* TODO: USER: Imagen OG específica */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        {/* <meta name="twitter:image" content={`${domain}/images/twitter-estrategia-digital.webp`} /> */} {/* TODO: USER: Imagen Twitter específica */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-20 lg:py-28 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
              <Badge className="bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                <Lightbulb className="w-4 h-4 mr-2 inline-block" /> Servicio Estrella
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black leading-tight mb-5 sm:mb-6"
            >
              Servicio de estrategia digital integral
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl lg:text-2xl text-blue-100/90 dark:text-blue-200/90 mb-8 sm:mb-10 max-w-3xl mx-auto"
            >
              Tu plan maestro para el éxito online sostenible. Unimos nuestro método probado, SEO de vanguardia e inteligencia artificial para crear e implementar una hoja de ruta que transforma tu negocio y dispara tus resultados.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="group bg-white text-blue-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate('/contacto', { state: { subject: "Interesado en Estrategia Digital Integral" }})}
                aria-label="Solicitar propuesta personalizada para Estrategia Digital Integral"
              >
                Solicita tu propuesta personalizada
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
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                      <Link to="/servicios" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Servicios
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Estrategia digital integral</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-5 sm:mb-6">
                ¿Cansado de tácticas aisladas sin resultados tangibles?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-md sm:text-lg text-gray-600 dark:text-slate-300 text-center max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed sm:leading-loose">
                Muchas empresas invierten en acciones de marketing digital sueltas y descoordinadas (un poco de redes, algo de SEO, anuncios puntuales...) sin una visión global que las cohesione. Esto, inevitablemente, se traduce en dinero desperdiciado, esfuerzos duplicados y oportunidades de crecimiento perdidas. Una <strong className="font-semibold text-blue-600 dark:text-blue-400">estrategia digital integral</strong> es la diferencia fundamental entre "hacer cosas en internet" y "lograr objetivos de negocio medibles y consistentes".
              </motion.p>
              <motion.div variants={fadeInUp} className="bg-blue-50 dark:bg-blue-900/30 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700/50">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center">
                    <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 mr-2.5 flex-shrink-0"/>Nuestra solución: un plan maestro coherente y efectivo
                </h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed sm:leading-loose">
                  Nuestro servicio de estrategia digital integral te proporciona una hoja de ruta clara, personalizada y <strong className="font-semibold">orientada 100% a resultados</strong>. Analizamos tu negocio en profundidad (DAFO digital, competencia, audiencia), definimos objetivos realistas y ambiciosos, y creamos un plan de acción detallado que integra todas las piezas clave de tu ecosistema digital – desde el SEO técnico y semántico, la aplicación inteligente de la IA, hasta la optimización de la conversión en cada punto de contacto y la fidelización de clientes – para asegurar que cada esfuerzo, cada euro invertido, contribuya directamente a tu crecimiento, rentabilidad y al fortalecimiento de tu marca.
                </p>
              </motion.div>
            </motion.section>

            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-12 md:mb-16 lg:mb-20"
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                ¿Qué incluye nuestro servicio de <span className="text-blue-600 dark:text-blue-400">estrategia digital integral</span>?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
                {serviceIncludes.map((item) => (
                  <motion.div key={item.title} variants={fadeInUp} className="flex items-start space-x-3 sm:space-x-4">
                    <div className={cn("flex-shrink-0 p-2.5 sm:p-3 rounded-full shadow-sm bg-opacity-10 dark:bg-opacity-20", item.colorClass?.replace("text-", "bg-"))}>
                      {React.cloneElement(item.icon, {className: cn("w-5 h-5 sm:w-6 sm:h-6", item.colorClass)})}
                    </div>
                    <div>
                      <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed sm:leading-loose">
                        {item.description}
                        {item.link && (
                            <Link to={item.link} className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm ml-1 font-medium group/link inline-flex items-center">
                                (Saber más <ArrowRight className="w-3 h-3 ml-0.5 group-hover/link:translate-x-0.5 transition-transform"/>)
                            </Link>
                        )}
                      </p>
                    </div>
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
                Beneficios clave de nuestra <span className="text-green-600 dark:text-green-400">consultoría estratégica</span>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {serviceBenefits.map((benefit) => (
                  <motion.div key={benefit.title} variants={fadeInUp} className="h-full flex">
                    <Card className="h-full bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-5 sm:p-6 border-l-4 border-green-500 dark:border-green-400 w-full">
                      <div className="flex items-start mb-3 sm:mb-4">
                        {React.cloneElement(benefit.icon, { className: "w-7 h-7 sm:w-8 sm:h-8 mr-3 flex-shrink-0" })}
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">{benefit.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed sm:leading-loose">{benefit.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mb-12 md:mb-16 lg:mb-20 bg-white dark:bg-slate-800/70 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border dark:border-slate-700/50"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 text-center mb-8 sm:mb-10">
                ¿Es este servicio de estrategia <span className="text-blue-600 dark:text-blue-400">para ti</span>?
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-slate-200 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"/>Este servicio es ideal si:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 space-y-1.5 text-sm sm:text-base pl-1 leading-relaxed">
                    <li>Buscas una visión estratégica integral y a largo plazo, no soluciones parche ni tácticas aisladas.</li>
                    <li>Quieres entender cómo todas las piezas del marketing digital (SEO, IA, Contenidos, CRO) encajan para tu negocio específico.</li>
                    <li>Necesitas un plan de acción claro, priorizado y accionable para crecer de forma sostenible y rentable.</li>
                    <li>Estás listo para invertir en construir una base digital sólida que genere resultados consistentes y crecientes.</li>
                    <li>Valoras un partner estratégico que se involucre en tus objetivos y hable el lenguaje de negocio (ROI, beneficio).</li>
                  </ul>
                </div>
                <div className="mt-6 md:mt-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-slate-200 mb-3 flex items-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-500 dark:text-red-400 flex-shrink-0"/>Quizás no sea el adecuado si:
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 space-y-1.5 text-sm sm:text-base pl-1 leading-relaxed">
                    <li>Buscas resultados milagrosos o crecimiento exponencial de la noche a la mañana sin esfuerzo.</li>
                    <li>Prefieres implementar tácticas sueltas o "probar cosas" sin una estrategia que las respalde y mida.</li>
                    <li>No estás dispuesto a implicarte activamente en el proceso de definición estratégica y toma de decisiones.</li>
                    <li>Cuentas con un presupuesto de marketing extremadamente limitado que no permite una inversión estratégica.</li>
                    <li>No estás abierto a revisar y, si es necesario, transformar aspectos de tu modelo de negocio online.</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* TODO: Descomentar esta sección cuando la página de Casos de Éxito y su contenido estén listos. 
            <motion.section
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="mb-12 md:mb-16 lg:mb-20"
            >
                <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                    Resultados que hemos logrado con <span className="text-blue-600 dark:text-blue-400">estrategias digitales integrales</span>
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    {miniCaseStudies.map((cs) => (
                        <motion.div key={cs.slug} variants={fadeInUp} className="h-full flex">
                            <Card className="group bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden h-full flex flex-col w-full">
                                <CardHeader className="bg-slate-50 dark:bg-slate-800 p-5 sm:p-6">
                                    <Badge className="mb-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">{cs.result}</Badge>
                                    <CardTitle className="text-md sm:text-lg font-semibold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {cs.title} 
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 sm:p-6 flex-grow">
                                    <p className="text-sm text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">{cs.description}</p>
                                </CardContent>
                                {/* 
                                // TODO: Activar este enlace cuando la página de casos de éxito exista
                                <div className="p-5 pt-0 mt-auto">
                                     <Button asChild variant="link" className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 px-0 font-semibold text-sm">
                                        <Link to={`/casos-de-exito/${cs.slug}`}> 
                                            Ver Caso Completo <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform"/>
                                        </Link>
                                    </Button>
                                </div>
                                *}
                            </Card>
                        </motion.div>
                    ))}
                </div>
                {/*
                // TODO: Activar este botón cuando la página de casos de éxito exista
                <motion.div variants={fadeInUp} className="text-center mt-10 sm:mt-12">
                    <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/40 dark:hover:text-blue-300">
                        <Link to="/casos-de-exito">Ver Todos los Casos de Éxito</Link>
                    </Button>
                </motion.div>
                *}
            </motion.section>
            */}

            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl shadow-2xl text-center"
            >
              <Scaling className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 sm:mb-6 opacity-80" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">
                ¿Listo para definir y ejecutar tu estrategia digital ganadora?
              </h2>
              <p className="text-md sm:text-lg lg:text-xl text-blue-100/90 dark:text-blue-200/90 mb-8 max-w-2xl mx-auto leading-relaxed sm:leading-loose">
                La inversión en una estrategia digital integral se adapta a la complejidad, ambición y necesidades específicas de tu negocio. No creemos en paquetes estándar porque cada empresa es única. Por eso, ofrecemos soluciones 100% personalizadas.
              </p>
              <Button
                size="lg"
                className="group bg-white text-blue-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate('/contacto', { state: { subject: "Solicitud de Propuesta: Estrategia Digital Integral" }})}
                aria-label="Solicitar propuesta a medida para Estrategia Digital Integral"
              >
                Solicita tu propuesta a medida
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
              <p className="text-sm text-blue-200/80 dark:text-blue-300/80 mt-6 italic">
                Comencemos con una sesión estratégica gratuita para analizar tu situación y definir cómo podemos ayudarte.
              </p>
            </motion.section>

            <motion.div variants={fadeInUp} className="mt-12 md:mt-16 text-center">
                 <Button size="sm" variant="ghost" asChild className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
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

export default EstrategiaDigitalIntegral;