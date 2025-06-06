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
  Users,
  Target,
  Search,
  MessageSquare,
  Mail,
  Globe,
  BarChart3 as Tv, // Mantenido el alias para consistencia si se usa en otros sitios
  CheckCircle,
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

interface AcquisitionChannel {
    name: string;
    icon: React.ReactElement;
    description: string;
    colorClass?: string;
}

const acquisitionChannels: AcquisitionChannel[] = [
    {
        name: "Buscadores (SEO)",
        icon: <Search className="w-7 h-7"/>,
        description: "Optimización avanzada para motores de búsqueda (Google, Bing) y plataformas emergentes (Perplexity, asistentes IA), enfocada en atraer tráfico orgánico altamente cualificado y con intención.",
        colorClass: "text-indigo-600"
    },
    {
        name: "Marketing de contenidos estratégico",
        icon: <Tv className="w-7 h-7"/>,
        description: "Creación y distribución de contenido de valor (artículos, guías, vídeos, podcasts) que atrae, educa, genera autoridad (E-E-A-T) y posiciona tu marca como referente.",
        colorClass: "text-sky-600"
    },
    {
        name: "Redes sociales orgánicas (RRSS)",
        icon: <Users className="w-7 h-7"/>,
        description: "Estrategias de contenido y comunidad personalizadas para cada plataforma relevante, construyendo presencia, engagement y atrayendo prospectos desde el ámbito social.",
        colorClass: "text-rose-600"
    },
    {
        name: "Email marketing de captación y nutrición",
        icon: <Mail className="w-7 h-7"/>,
        description: "Construcción de listas de suscriptores mediante lead magnets de valor y secuencias de nutrición automatizadas para convertirlos en clientes a medio plazo.",
        colorClass: "text-amber-600"
    },
    {
        name: "SEO multiplataforma y IA conversacional",
        icon: <Globe className="w-7 h-7"/>,
        description: "Presencia optimizada no solo en Google, sino en YouTube, TikTok, Pinterest y preparación para la búsqueda conversacional con asistentes de IA y LLMs.",
        colorClass: "text-purple-600"
    },
    {
        name: "Automatización y chatbots con IA", // Corregido mayúscula
        icon: <MessageSquare className="w-7 h-7"/>,
        description: "Implementación de chatbots inteligentes y asistentes virtuales para cualificar leads, ofrecer soporte instantáneo y guiar a los usuarios 24/7 de forma eficiente.",
        colorClass: "text-teal-600"
    },
];


const Adquisicion = () => {
  const navigate = useNavigate(); // No se usa, pero mantenido por si acaso

  const domain = "https://alvarostrategy.com"; 
  const metodoPageUrl = `${domain}/mi-metodo`;
  const pageUrl = `${metodoPageUrl}/adquisicion`;
  const pageTitle = "Fase A: adquisición – atracción inteligente de clientes ideales"; // Corregido mayúsculas
  const pageDescription = "Explora la fase de adquisición de nuestra estrategia digital. Implementamos SEO multiplataforma, marketing de contenidos e IA para atraer un flujo constante de clientes cualificados y construir tu audiencia propia.";

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
      "description": "Un sistema integral diseñado para transformar tu negocio online con SEO e IA.",
      "url": metodoPageUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Nuestro método", "item": metodoPageUrl },
        { "@type": "ListItem", "position": 3, "name": "Fase A: adquisición" } // Corregido mayúsculas
      ]
    },
     "mainEntity": {
        "@type": "Article",
        "headline": "Estrategias de adquisición: cómo atraer a tu cliente ideal en el entorno digital actual", // Corregido mayúsculas
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
        "datePublished": "2024-01-16", // Fecha de ejemplo
        "dateModified": new Date().toISOString().split('T')[0],
        "articleBody": "La fase de adquisición de nuestra estrategia se centra en atraer tráfico cualificado y potenciales clientes hacia los activos digitales de la marca. Abordamos los desafíos actuales de la captación y la importancia de construir audiencias propias. Detallamos canales clave como SEO en buscadores, marketing de contenidos estratégico, presencia optimizada en redes sociales, email marketing de captación, SEO multiplataforma y el uso efectivo de IA conversacional y chatbots. El objetivo primordial es optimizar el coste de adquisición de cliente (CAC) y generar un flujo constante y sostenible de leads de calidad.",
        "keywords": "adquisición de clientes, estrategias de marketing digital, SEO, marketing de contenidos, redes sociales, email marketing, IA en marketing, generación de leads, CAC"
    },
    "significantLink": [
        `${metodoPageUrl}/producto-marca`,
        `${metodoPageUrl}/conversion`
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
        <meta property="og:image" content={`${domain}/images/og-adquisicion-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-adquisicion-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white dark:from-indigo-700 dark:via-indigo-800 dark:to-purple-800"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to="/mi-metodo" className="inline-flex items-center text-indigo-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a nuestro método
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                FASE 2 DE NUESTRA ESTRATEGIA
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-indigo-300 dark:text-indigo-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">A</span>
              Adquisición
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-indigo-100/90 dark:text-indigo-200/90 mb-3 font-semibold"
            >
              Atraer clientes que pagan, no simples mirones.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-indigo-200/80 dark:text-indigo-300/80 max-w-3xl mx-auto"
            >
             El objetivo aquí es claro: llevar un flujo constante de <strong className="font-semibold text-white">potenciales clientes cualificados</strong> hacia tus activos digitales (tu web, tu lista de correo, tus perfiles clave). La métrica fundamental que optimizamos es el <strong className="font-semibold text-white">coste de adquisición de cliente (CAC)</strong>, buscando la máxima eficiencia.
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-acquisition">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
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
                      <Link to="/mi-metodo" className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Nuestro método
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Fase A: adquisición</BreadcrumbPage>
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
                         prose-p:text-gray-700 dark:prose-p:text-slate-300
                         prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-indigo-500 dark:prose-blockquote:border-indigo-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-indigo-700 dark:text-indigo-400 flex-shrink-0" />
                El desafío de la adquisición hoy: más allá del ruido
              </h2>
              
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Atraer la atención de potenciales clientes es, hoy más que nunca, un campo de batalla. Los canales orgánicos se diversifican y exigen mayor especialización, los costes publicitarios tienden al alza y la inteligencia artificial, aunque increíblemente potente, ya no es una ventaja competitiva por sí sola, sino una herramienta base. Las grandes marcas con presupuestos ingentes consolidan su cuota de mercado, y <strong className="text-indigo-600 dark:text-indigo-400">la verdadera guerra no es solo por clics, sino por la ATENCIÓN relevante y sostenida</strong>. Es el principal objetivo estratégico de toda marca que aspire a crecer.
              </p>
              
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                "Un marketing digital enfocado únicamente en generar picos de atención momentáneos no fideliza clientes, no mejora tus beneficios netos ni incrementa el valor intrínseco de tu marca a largo plazo. Necesitamos tender un puente sólido: una <strong className="font-semibold">estrategia digital de marca</strong> que convierta esa atención en un activo tangible."
              </blockquote>
              
              
              <h3 className="mt-8 sm:mt-10 mb-5 sm:mb-6 text-xl sm:text-2xl font-semibold dark:text-slate-100">Construye en terreno propio: tu audiencia, tu activo más valioso</h3>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                La clave para una adquisición sostenible y rentable es sencilla en concepto, pero exigente en ejecución: dejar de depender exclusivamente de los caprichos de algoritmos de terceros (Google, Meta, TikTok) y <strong className="text-indigo-600 dark:text-indigo-400">trabajar activamente en construir, gestionar y nutrir tus propios canales de audiencia</strong>. Hablamos de tu lista de correo, tus comunidades directas, tus suscriptores de contenido premium. Esto te otorga control, reduce tu dependencia externa, disminuye la volatilidad y te permite establecer relaciones directas, personalizadas y mucho más duraderas con quienes realmente importan.
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
                Canales y estrategias de <span className="text-indigo-600 dark:text-indigo-400">adquisición que implementamos</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {acquisitionChannels.map((channel) => (
                  <motion.div key={channel.name} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                         <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", channel.colorClass)}>
                           {React.cloneElement(channel.icon, {className: cn(channel.icon.props.className, channel.colorClass ? '' : 'text-indigo-600 dark:text-indigo-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {channel.name}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{channel.description}</p>
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
              className="mb-10 md:mb-12 p-6 sm:p-8 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 rounded-xl shadow-lg"
            >
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 text-center sm:text-left">
                    La evolución del SEO: multiplataforma, semántico y profesional
                </h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-5">
                    La adquisición de tráfico orgánico cualificado es un maratón, no un sprint, y el terreno de juego está en constante evolución. Ya no basta con optimizar para un solo buscador o un único tipo de contenido.
                    Nuestra <strong className="text-indigo-600 dark:text-indigo-400">estrategia de SEO multiplataforma</strong> se anticipa y adapta, considerando:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm sm:text-base text-gray-700 dark:text-slate-300 mb-5">
                    {[
                        "Google (tradicional y SGE con IA)", // Corregido mayúscula
                        "Perplexity AI y otros buscadores conversacionales",
                        "SearchGPT, Copilot y LLMs integrados",
                        "Optimización para AI Overviews (AIO)",
                        "SEO para TikTok y Shorts",
                        "SEO para Pinterest e imágenes",
                        "SEO para YouTube y vídeo",
                        "Optimización para podcasts y audio", // Corregido mayúscula
                        "Presencia en directorios y mercados nicho"
                     ].map(platform => (
                        <div key={platform} className="flex items-start">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5 sm:mt-1"/> 
                            <span>{platform}</span>
                        </div>
                    ))}
                </div>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
                    Un <strong className="text-indigo-600 dark:text-indigo-400">estratega digital de marca profesional</strong> no solo conoce estas plataformas, sino que sabe discernir en cuáles invertir tiempo y recursos para maximizar la visibilidad y la captación efectiva del público objetivo de cada negocio. La IA es nuestra aliada para analizar datos, personalizar y escalar, no un sustituto de la estrategia.
                </p>
            </motion.section>
            
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 md:mt-16 lg:mt-20 text-center"
            >
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Una vez que hemos establecido un flujo constante de prospectos cualificados, el siguiente desafío es transformar ese interés en acción.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                 <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to="/mi-metodo/producto-marca" aria-label="Volver a la fase de producto y marca"> {/* Corregido mayúscula */}
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Fase anterior (producto y marca) {/* Corregido mayúscula */}
                    </Link>
                </Button>
                <Button size="lg" asChild className="group bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to="/mi-metodo/conversion" aria-label="Continuar a la fase de conversión"> {/* Corregido mayúscula */}
                    Ir a la fase de conversión (C) {/* Corregido mayúscula */}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
              </div>
               <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                    <Link to="/contacto" state={{ subject: "Consulta sobre la Fase de Adquisición" }}>
                        <Lightbulb className="w-4 h-4 mr-2" /> ¿Preguntas sobre adquisición? {/* Corregido mayúscula */}
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

export default Adquisicion;