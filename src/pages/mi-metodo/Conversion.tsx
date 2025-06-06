import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ArrowRight,
    ArrowLeft,
    DollarSign,
    CheckSquare,
    Users,
    Target,
    Filter, 
    ShoppingCart,
    Mail,
    TrendingUp,
    Eye,
    Lightbulb,
    Home as HomeIcon
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
};

interface ConversionElement {
    title: string;
    icon: React.ReactElement;
    description: string;
    details?: string[];
    colorClass?: string;
}

const conversionElements: ConversionElement[] = [
    {
        title: "Optimización de la tasa de conversión (CRO)",
        icon: <TrendingUp className="w-7 h-7"/>,
        description: "Análisis y mejora continua de cada punto de contacto para maximizar el porcentaje de visitantes que realizan la acción deseada (venta, lead, etc.).",
        details: ["Tests A/B y multivariante continuos", "Análisis de mapas de calor y grabaciones de sesión", "Optimización de la UX/UI basada en datos"],
        colorClass: "text-purple-600"
    },
    {
        title: "Diseño de embudos de venta efectivos",
        icon: <Filter className="w-7 h-7"/>,
        description: "Creación y optimización de funnels de conversión lógicos que guían al usuario de forma natural desde el interés inicial hasta la compra o acción final deseada.",
        details: ["Definición de etapas del embudo", "CTAs claros en cada paso", "Reducción de puntos de fricción"],
        colorClass: "text-fuchsia-600"
    },
    {
        title: "Fichas de producto que venden",
        icon: <ShoppingCart className="w-7 h-7"/>,
        description: "Desarrollo de páginas de producto con contenido emocional y técnico optimizado, imágenes y vídeos de alta calidad, y todos los elementos clave para resolver dudas y fomentar la decisión de compra.",
        details: ["Copywriting persuasivo y técnico", "Fotografía/vídeo de producto profesional", "Prueba social (reseñas, valoraciones)", "Información logística clara (envío, devoluciones)"],
        colorClass: "text-pink-600"
    },
    {
        title: "Microconversiones estratégicas",
        icon: <CheckSquare className="w-7 h-7"/>,
        description: "Identificación y fomento de acciones intermedias valiosas (descarga de lead magnets, suscripción a newsletter, añadir a favoritos) que cultivan la relación y acercan al usuario a la conversión principal.",
        colorClass: "text-rose-600"
    },
    {
        title: "Email marketing para conversión y recuperación",
        icon: <Mail className="w-7 h-7"/>,
        description: "Implementación de flujos automatizados (recuperación de carrito abandonado, secuencias de bienvenida post-registro) y campañas segmentadas para nutrir leads y cerrar ventas.",
        details: ["Automatización de carritos abandonados", "Secuencias de bienvenida y onboarding", "Campañas de oferta segmentadas y personalizadas"],
        colorClass: "text-red-600"
    },
    {
        title: "Psicología de la conversión aplicada",
        icon: <Users className="w-7 h-7"/>,
        description: "Aplicación ética de principios de persuasión, prueba social (testimonios, casos de éxito), escasez y urgencia controlada para mejorar la toma de decisiones del usuario y facilitar la conversión.",
        colorClass: "text-orange-600"
    },
];


const Conversion = () => {
  const navigate = useNavigate(); // Mantenido por si es necesario para futuros CTAs

  const domain = "https://alvarostrategy.com"; 
  const metodoPageUrl = `${domain}/mi-metodo`;
  const pageUrl = `${metodoPageUrl}/conversion`;
  const pageTitle = "Fase C: conversión – transformando visitantes en clientes rentables"; // Corregido mayúsculas
  const pageDescription = "Descubre la fase de conversión de nuestra estrategia. Optimizamos cada punto de contacto, desde fichas de producto hasta email marketing y UX, para maximizar tus ventas y el ingreso por conversión (RPC).";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "inLanguage": "es-ES",
    "isPartOf": {
      "@type": "WebPage",
      "@id": metodoPageUrl,
      "name": "Nuestro método: tu hoja de ruta para el crecimiento digital sostenible", // Corregido mayúsculas
      "url": metodoPageUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Nuestro método", "item": metodoPageUrl },
        { "@type": "ListItem", "position": 3, "name": "Fase C: conversión" } // Corregido mayúsculas
      ]
    },
     "mainEntity": {
        "@type": "Article",
        "headline": "Optimización de la conversión: cómo transformar el interés en ingresos", // Corregido mayúsculas
         "author": {
            "@type": "Person",
            "name": "Álvaro Fernández de Celis", 
            "url": `${domain}/quien-soy`
        },
        "publisher": {
            "@type": "Organization",
            "name": "AlvaroStrategy",
            "logo": {
                "@type": "ImageObject",
                "url": `${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp` 
            }
        },
        "datePublished": "2024-01-17", // Fecha ejemplo
        "dateModified": new Date().toISOString().split('T')[0],
        "articleBody": "La fase de conversión de nuestra estrategia se enfoca en maximizar la eficiencia de cada visita, transformando el interés generado en la fase de adquisición en acciones tangibles y rentables. Se abordan elementos clave como la optimización de la tasa de conversión (CRO), el diseño de embudos de venta efectivos, la optimización de fichas de producto que venden, la identificación y fomento de microconversiones estratégicas, el email marketing orientado a la conversión y recuperación, y la aplicación ética de la psicología de la persuasión. El objetivo es mejorar el ingreso por conversión (RPC) y la experiencia general del usuario.",
        "keywords": "optimización de la conversión, CRO, embudos de venta, fichas de producto, microconversiones, email marketing, psicología de ventas, experiencia de usuario, UX, UI"
    },
    "significantLink": [
        `${metodoPageUrl}/adquisicion`,
        `${metodoPageUrl}/progresion`,
        `${domain}/servicios` // Enlace a la página general de servicios
    ]
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
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${domain}/images/og-conversion-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-conversion-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white dark:from-purple-700 dark:via-purple-800 dark:to-pink-700"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to="/mi-metodo" className="inline-flex items-center text-purple-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a nuestro método
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                FASE 3 DE NUESTRA ESTRATEGIA
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-purple-300 dark:text-purple-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">C</span>
              Conversión
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-purple-100/90 dark:text-purple-200/90 mb-3 font-semibold"
            >
              Que el "me interesa" se convierta en "toma mi dinero".
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-purple-200/80 dark:text-purple-300/80 max-w-3xl mx-auto"
            >
              Cada visita es una oportunidad. En esta fase, optimizamos cada rincón de tu presencia online para que quien llegue, compre (o dé el siguiente paso crucial). La métrica clave aquí es el <strong className="font-semibold text-white">ingreso por conversión (RPC)</strong> y la tasa de conversión general.
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-conversion">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/mi-metodo" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Nuestro método
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Fase C: conversión</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-10 md:mb-12 prose prose-base sm:prose-lg max-w-none 
                         prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-slate-100 
                         prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-5 sm:prose-p:mb-6 prose-p:leading-relaxed sm:prose-p:leading-loose
                         prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:text-purple-700 dark:hover:prose-a:text-purple-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-purple-500 dark:prose-blockquote:border-purple-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400
                         prose-blockquote:my-6 sm:prose-blockquote:my-8 prose-blockquote:py-2 sm:prose-blockquote:py-3"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100">
                <DollarSign className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-purple-700 dark:text-purple-400 flex-shrink-0" />
                De nada sirve atraer si luego se van por donde han venido
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Atraer tráfico cualificado gracias a una sólida fase de adquisición es solo la mitad de la batalla. La verdadera magia (y la rentabilidad que buscamos) ocurre cuando esos visitantes realizan la acción que deseamos: una compra, el envío de un formulario, una suscripción, una descarga de valor, etc. En esta fase crucial de <strong className="text-purple-600 dark:text-purple-400">conversión</strong>, nos centramos obsesivamente en <strong className="text-purple-600 dark:text-purple-400">maximizar la eficiencia de cada visita</strong>, transformando el interés generado en acción tangible y medible.
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                "Cada interacción del usuario es una oportunidad para una microconversión. No todas las visitas terminarán en una venta inmediata, pero cada paso positivo (ver un vídeo clave, leer un caso de estudio, añadir al carrito) nos acerca más al objetivo final. Esto influye directamente en el <strong className="font-semibold">ingreso por conversión (RPC)</strong> y, a la larga, en el valor medio de pedido (AOV)."
              </blockquote>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Optimizamos cada elemento, desde la claridad de tus mensajes y la usabilidad de tu web, hasta la persuasión de tus llamadas a la acción (CTAs) y la confianza que transmite tu marca en cada punto de contacto.
              </p>
            </motion.section>

            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="mb-10 md:mb-12"
            >
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                Elementos clave de la <span className="text-purple-600 dark:text-purple-400">fase de conversión</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {conversionElements.map((element) => (
                  <motion.div key={element.title} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", element.colorClass)}>
                           {React.cloneElement(element.icon, {className: cn(element.icon.props.className, element.colorClass ? '' : 'text-purple-600 dark:text-purple-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {element.title}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 flex-grow">{element.description}</p>
                        {element.details && element.details.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-gray-200/30 dark:border-slate-700/50">
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                    {element.details.map(detail => <li key={detail}>{detail}</li>)}
                                </ul>
                            </div>
                        )}
                      </CardContent>
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
              className="mb-10 md:mb-12 p-6 sm:p-8 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 rounded-xl shadow-lg"
            >
                <h3 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4 text-center sm:text-left flex items-center">
                    <Eye className="w-7 h-7 mr-2 flex-shrink-0"/>Foco en la experiencia de usuario (UX/UI) y el diseño web crítico
                </h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed sm:leading-loose mb-3">
                    Una experiencia de usuario fluida, intuitiva y agradable es absolutamente fundamental para la conversión. No se trata solo de que la web "se vea bonita", sino de que <strong className="text-purple-600 dark:text-purple-400">funcione impecablemente</strong> para el usuario. Esto incluye desde la velocidad de carga de la página (WPO), la facilidad de navegación, la claridad y persuasión de los CTAs (Call To Action), hasta un diseño visual atractivo y profesional que genere confianza y credibilidad instantánea.
                </p>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed sm:leading-loose">
                    Nos aseguramos de que cada elemento esté optimizado para <strong className="text-purple-600 dark:text-purple-400">eliminar fricciones innecesarias, resolver dudas proactivamente y facilitar la decisión del usuario</strong>, guiándole hacia la conversión deseada sin que apenas lo note.
                </p>
                 <div className="mt-6 text-center sm:text-left">
                    <Button variant="link" asChild className="px-0 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium group">
                        <Link to="/servicios" aria-label="Descubre más sobre nuestros servicios de optimización y diseño"> 
                            Descubre cómo nuestros servicios impulsan la conversión
                            <ArrowRight className="inline w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform"/>
                        </Link>
                    </Button>
                </div>
            </motion.section>
            
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 md:mt-16 lg:mt-20 text-center"
            >
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Con una estrategia de conversión sólida y optimizada, estamos listos para el siguiente nivel: hacer que cada cliente que ya ha confiado en ti, te deje más dinero.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to="/mi-metodo/adquisicion" aria-label="Volver a la fase de adquisición"> {/* Corregido mayúsculas */}
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Fase anterior (adquisición) {/* Corregido mayúsculas */}
                    </Link>
                </Button>
                <Button size="lg" asChild className="group bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to="/mi-metodo/progresion" aria-label="Continuar a la fase de progresión"> {/* Corregido mayúsculas */}
                    Ir a la fase de progresión (P) {/* Corregido mayúsculas */}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
              </div>
              <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                    <Link to="/contacto" state={{ subject: "Consulta sobre la Fase de Conversión" }}>
                        <Lightbulb className="w-4 h-4 mr-2" /> ¿Preguntas sobre conversión? {/* Corregido mayúsculas */}
                    </Link>
                </Button>
               </div>
            </motion.section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Conversion;