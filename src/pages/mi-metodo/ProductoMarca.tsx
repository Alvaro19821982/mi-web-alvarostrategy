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
  Search,
  Lightbulb,
  Scaling,
  CheckCircle,
  Target,
  DollarSign,
  BarChart3,
  Users,
  Briefcase,
  FileText,
  AlertTriangle,
  Cog,
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

interface ContextItem {
    category: string;
    icon: React.ReactElement;
    intro?: string;
    questions: string[];
    points?: string[];
    colorClass?: string;
}

const contextItemsData: ContextItem[] = [
    {
        category: "Nivel de estado de la marca",
        icon: <Scaling className="w-7 h-7"/>,
        intro: "Comprender la madurez actual de tu marca es fundamental para establecer expectativas realistas y estrategias adecuadas.",
        questions: ["¿En qué fase se encuentra la marca actualmente en el mercado?"],
        points: ["Temprana (lanzamiento/poca tracción)", "Crecimiento (tracción media/reconocimiento)", "Madura (establecida/líder)", "Escalable (potencial de expansión)"],
        colorClass: "text-blue-600"
    },
    {
        category: "Contexto inicial: fortalezas y debilidades (DAFO)",
        icon: <FileText className="w-7 h-7"/>,
        intro: "Un análisis DAFO (debilidades, amenazas, fortalezas, oportunidades) honesto nos da una visión clara del punto de partida.",
        questions: ["¿Cuáles son las fortalezas internas clave de la marca/producto?", "¿Qué debilidades internas necesitan ser abordadas?", "¿Qué oportunidades externas podemos capitalizar?", "¿Qué amenazas externas debemos mitigar?"],
        colorClass: "text-sky-600"
    },
    {
        category: "Recursos y líneas rojas",
        icon: <AlertTriangle className="w-7 h-7"/>,
        intro: "Definir los límites y capacidades desde el inicio evita sorpresas y asegura que la estrategia sea viable.",
        questions: ["¿Con qué recursos profesionales (equipo, habilidades) y económicos contamos?", "¿Cuáles son las líneas rojas innegociables (éticas, legales, de marca)?"],
        colorClass: "text-amber-600"
    },
    {
        category: "Objetivos de la marca (SMART)",
        icon: <Target className="w-7 h-7"/>,
        intro: "Los objetivos deben ser específicos, medibles, alcanzables, relevantes y de tiempo limitado (SMART) para guiar la estrategia.",
        questions: ["¿Cuáles son los objetivos de negocio principales a corto, medio y largo plazo?", "¿Cómo se traducen estos en objetivos de marketing digital?", "¿Existen micro-objetivos o KPIs intermedios para medir el progreso?"],
        colorClass: "text-green-600"
    },
    {
        category: "Tipología del proyecto y modelo de negocio",
        icon: <Briefcase className="w-7 h-7"/>,
        intro: "El tipo de proyecto y cómo genera ingresos influye directamente en las tácticas a emplear.",
        questions: [
            "¿A qué tipo de proyecto nos enfrentamos (e-commerce, servicios, SaaS, contenido, etc.)?",
            "¿Cuáles son sus características principales y diferenciadores?",
            "¿Cómo se monetiza principalmente el proyecto?",
        ],
        points: ["Servicios B2B/B2C", "Tiendas online (dropshipping, stock propio)", "Portales clasificados", "Sitios con marca personal fuerte", "Marketing de afiliación", "Blog profesional/medio", "Nichos de Adsense/publicidad", "Otros modelos híbridos"],
        colorClass: "text-teal-600"
    },
    {
        category: "Nicho de mercado y competencia",
        icon: <Users className="w-7 h-7"/>,
        intro: "Entender el ecosistema donde compites es vital para encontrar tu espacio y diferenciarte.",
        questions: [
            "¿En qué sector o nicho de mercado vamos a competir?",
            "¿Cómo son las SERPs (resultados de búsqueda) para las palabras clave principales? ¿Muy competidas, informacionales, transaccionales?",
            "¿Quiénes son los principales competidores directos e indirectos y qué están haciendo bien (o mal)?",
        ],
        points: ["Salud y bienestar", "Tecnología y software", "Formación y educación", "Viajes y turismo", "Servicios locales (cerrajeros, etc.)", "Moda y belleza", "Alimentación y recetas"],
        colorClass: "text-purple-600"
    },
    {
        category: "Tecnología web y plataforma",
        icon: <Cog className="w-7 h-7"/>,
        intro: "La base tecnológica puede ser un facilitador o un obstáculo. Es crucial conocerla.",
        questions: ["¿Qué CMS o framework se utiliza (WordPress, Shopify, desarrollo a medida, etc.)?", "¿Cómo está estructurada la web a nivel de URLs e indexación actual?", "¿Existen limitaciones técnicas conocidas que puedan afectar al SEO o la experiencia de usuario?"],
        points: ["WordPress + Page Builders", "Shopify / BigCommerce", "Prestashop / Magento", "React / Angular / Vue", "Desarrollo a medida (PHP, Python, etc.)", "Headless CMS"],
        colorClass: "text-slate-600"
    },
     {
        category: "Buyer persona y márgenes de beneficio",
        icon: <DollarSign className="w-7 h-7"/>,
        intro: "Conocer a tu cliente ideal y la rentabilidad de tus ofertas es clave para priorizar esfuerzos.",
        questions: [
            "¿Quién es tu cliente ideal (buyer persona)? Demografía, necesidades, puntos de dolor, motivaciones.",
            "¿Cuáles son los diferentes niveles de consciencia de tus potenciales clientes y cómo es su customer journey?",
            "¿Dónde existen los mayores márgenes de beneficio (productos, servicios, tipos de cliente)?",
            "¿En qué productos, servicios o listados de contenido debemos poner el foco principal para maximizar el ROI?"
        ],
        colorClass: "text-lime-600"
    },
];


const ProductoMarca = () => {
  const navigate = useNavigate(); // No se usa directamente, pero es buena práctica mantenerlo si hay CTAs futuros

  const domain = "https://alvarostrategy.com"; 
  const metodoPageUrl = `${domain}/mi-metodo`;
  const pageUrl = `${metodoPageUrl}/producto-marca`;
  const pageTitle = "Fase P: Producto y marca – cimientos de tu estrategia digital"; // Corregido uso de mayúsculas
  const pageDescription = "Descubre la fase inicial de nuestra estrategia: análisis de producto y marca. Definimos tu estado, contexto, recursos y objetivos para construir una base sólida para el éxito online.";

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
      "name": "Nuestro método: tu hoja de ruta para el crecimiento digital sostenible", // Corregido uso de mayúsculas
      "description": "Un sistema integral diseñado para transformar tu negocio online con SEO e IA.",
      "url": metodoPageUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Nuestro método", "item": metodoPageUrl },
        { "@type": "ListItem", "position": 3, "name": "Fase P: producto y marca" } // Corregido uso de mayúsculas
      ]
    },
    "mainEntity": {
        "@type": "Article",
        "headline": "Análisis de producto y marca: el primer paso crucial de nuestra estrategia", // Corregido uso de mayúsculas
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
        "datePublished": "2024-01-15", // Fecha de ejemplo, ajusta a la real
        "dateModified": new Date().toISOString().split('T')[0], // Fecha actual
        "articleBody": "Esta fase inicial de nuestra estrategia se centra en un análisis exhaustivo del producto o servicio, la marca existente, el mercado objetivo, la audiencia ideal y los objetivos de negocio. Es la base fundamental para definir la métrica norte (NSM) y desarrollar una propuesta de valor única y diferenciadora. Se exploran el estado actual de la marca, el contexto inicial mediante un análisis DAFO, los recursos disponibles y las líneas rojas, los objetivos SMART, la tipología del proyecto y su modelo de negocio, el nicho de mercado y la competencia, la tecnología web empleada, así como el perfil detallado del buyer persona junto con los márgenes de beneficio asociados a cada oferta."
    },
    "significantLink": [
        `${metodoPageUrl}/adquisicion`
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
        <meta property="og:image" content={`${domain}/images/og-producto-marca-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-producto-marca-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to="/mi-metodo" className="inline-flex items-center text-blue-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a nuestro método
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                FASE 1 DE NUESTRA ESTRATEGIA
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-blue-300 dark:text-blue-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">P</span>
              Producto y marca
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-blue-100/90 dark:text-blue-200/90 mb-3 font-semibold"
            >
              Los cimientos de tu éxito digital: entender para construir.
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-blue-200/80 dark:text-blue-300/80 max-w-3xl mx-auto"
            >
              Esta es la radiografía sin anestesia que necesitas. Conocer tu negocio, producto y marca a fondo es el primer paso ineludible para definir tu <strong className="font-semibold text-white">métrica norte (NSM)</strong> y trazar una hoja de ruta ganadora.
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mb-8 md:mb-10"
            >
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
                      <Link to="/mi-metodo" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Nuestro método
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Fase P: producto y marca</BreadcrumbPage>
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
                         prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100"> 
                <Search className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-blue-700 dark:text-blue-400 flex-shrink-0" />
                Conocer el producto es conocer la marca y el negocio al completo
              </h2>
              
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Antes de lanzar cualquier campaña de marketing o ajustar una sola línea de código, es crucial sumergirse y entender a la perfección el <strong className="text-blue-600 dark:text-blue-400">"qué vendes", "a quién se lo vendes", "por qué te deberían elegir a ti"</strong> y, sobre todo, <strong className="text-blue-600 dark:text-blue-400">"hacia dónde quieres llevar tu negocio"</strong>. Esta fase inicial, la <strong className="font-semibold">P</strong> de producto/marca, es donde desenterramos los cimientos sobre los que construiremos toda tu estrategia digital.
              </p>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Ignorar esta etapa es como construir un rascacielos sobre arena. Sin una base sólida aquí, cualquier esfuerzo posterior se tambaleará. El objetivo primordial es identificar tu <strong>métrica norte (North Star Metric - NSM)</strong>: aquel indicador único que verdaderamente refleja el valor que tu producto o servicio principal entrega a tus clientes y que, por ende, se convierte en la brújula que guiará todas nuestras decisiones estratégicas y tácticas. No se trata de acumular "me gustas" o visitas vacías, sino de definir el motor real de tu crecimiento.
              </p>
              
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                "La obsesión por el impacto real en el negocio —traducido en <strong className="font-semibold">BENEFICIO y una MARCA más fuerte</strong>— nace de esta fase. No nos interesan las métricas de vanidad, sino entender la salud real, el potencial de rentabilidad y los verdaderos diferenciadores de tu proyecto."
              </blockquote>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Este análisis nos permite no solo entender tu oferta actual, sino también identificar oportunidades de mejora, nuevos ángulos de comunicación y posibles extensiones de producto o servicio que quizás no habías considerado. Es un trabajo de arqueología empresarial: desenterrar el oro que ya tienes.
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
                El contexto inicial <span className="text-blue-600 dark:text-blue-400">define gran parte de la estrategia</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {contextItemsData.map((item) => (
                  <motion.div key={item.category} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3", item.colorClass?.includes('bg-') ? item.colorClass : `bg-slate-50 dark:bg-slate-800`)}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", item.colorClass?.includes('bg-') ? '' : item.colorClass)}>
                          {React.cloneElement(item.icon, {className: cn(item.icon.props.className, item.colorClass ? '' : 'text-blue-600 dark:text-blue-400')})}
                        </span>
                        <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {item.category}
                          </CardTitle>
                           {item.intro && <CardDescription className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">{item.intro}</CardDescription>}
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow">
                        <ul className="space-y-1.5 sm:space-y-2 list-disc list-inside">
                            {item.questions.map((q, i) => (
                                <li key={i} className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{q}</li>
                            ))}
                        </ul>
                        {item.points && item.points.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-slate-700">
                                <h4 className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold mb-2 tracking-wider">Consideraciones / ejemplos:</h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {item.points.map(p => (
                                        <Badge key={p} variant="secondary" className="text-xs sm:text-sm bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-normal">
                                          {p}
                                        </Badge>
                                    ))}
                                </div>
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
              className="mt-12 md:mt-16 lg:mt-20 text-center"
            >
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Con una comprensión profunda de tu producto, marca y contexto, hemos sentado las bases. Ahora estamos listos para avanzar y definir cómo atraer a tu audiencia ideal.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" asChild className="group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to="/mi-metodo/adquisicion" aria-label="Continuar a la Fase de Adquisición">
                    Ir a la fase de adquisición (A)
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to="/contacto" state={{ subject: "Consulta sobre la fase de producto/marca" }}> {/* Corregido mayúsculas */}
                        ¿Dudas sobre esta fase? Contacta
                        <Lightbulb className="ml-2 w-5 h-5 group-hover:text-yellow-400 transition-colors" />
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

export default ProductoMarca;