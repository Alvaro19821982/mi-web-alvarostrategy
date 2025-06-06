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
    TrendingUp,
    ShoppingBag,
    Gift,
    PlusCircle,
    Layers,
    Award,
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

interface ProgressionStrategy {
    title: string;
    icon: React.ReactElement;
    description: string;
    examples?: string[];
    colorClass?: string; 
}

const progressionStrategies: ProgressionStrategy[] = [
    {
        title: "Upselling inteligente y ético",
        icon: <PlusCircle className="w-7 h-7"/>,
        description: "Ofrecer al cliente, en el momento adecuado, una versión superior, más completa o con mayores beneficios del producto o servicio que ya le interesa o ha adquirido, demostrando el valor adicional.",
        examples: ["Versiones premium de software con más funcionalidades", "Habitaciones de hotel con mejores vistas o servicios incluidos", "Menús degustación más completos en restaurantes"],
        colorClass: "text-pink-600"
    },
    {
        title: "Cross-selling estratégico y relevante",
        icon: <ShoppingBag className="w-7 h-7"/>,
        description: "Sugerir productos o servicios complementarios que realmente añaden valor a la compra principal del cliente, mejorando su experiencia global y solucionando necesidades relacionadas.",
        examples: ["Accesorios imprescindibles para un dispositivo electrónico recién comprado", "Productos de cuidado específicos para un artículo de moda adquirido", "Servicios de mantenimiento o configuración adicionales a una consultoría principal"],
        colorClass: "text-rose-500" 
    },
    {
        title: "Optimización del valor medio del pedido (AOV)",
        icon: <TrendingUp className="w-7 h-7"/>,
        description: "Implementar tácticas probadas como umbrales para envío gratuito, ofertas por volumen o paquetes de productos cuidadosamente diseñados para incentivar una mayor inversión por transacción.",
        examples: ["Envío gratuito a partir de X€", "Descuento por la compra de 3 o más unidades", "Packs 'todo en uno' con ligero descuento"], // Corregido mayúscula
        colorClass: "text-red-500"
    },
    {
        title: "Presentación clara de variantes y opciones",
        icon: <Layers className="w-7 h-7"/>,
        description: "Asegurar que el cliente conozca de forma sencilla todas las variantes disponibles (tamaño, color, modelo, capacidad) y opciones de personalización que puedan aumentar el valor y la adecuación de su compra.",
        colorClass: "text-fuchsia-500"
    },
    {
        title: "Mejora cualitativa continua de la oferta",
        icon: <Award className="w-7 h-7"/>,
        description: "Incrementar progresivamente el valor percibido (y real) del producto/servicio mediante mejoras en calidad, características innovadoras, presentación cuidada o un servicio post-venta excepcional, justificando un precio premium.",
        colorClass: "text-purple-500"
    },
    {
        title: "Programas de valor añadido y bundles",
        icon: <Gift className="w-7 h-7"/>,
        description: "Ofrecer servicios o productos adicionales de alto valor percibido, a menudo como 'bonus' o en paquetes (bundles), que complementen la compra principal, aumenten la satisfacción y el gasto total del cliente.",
        colorClass: "text-violet-500"
    },
];


const Progresion = () => {
  const navigate = useNavigate(); // No se usa, mantenido por si acaso

  const domain = "https://alvarostrategy.com"; 
  const metodoPageUrl = `${domain}/mi-metodo`;
  const pageUrl = `${metodoPageUrl}/progresion`;
  const pageTitle = "Fase P: progresión – maximizando el valor de cada cliente"; // Corregido mayúsculas
  const pageDescription = "Explora la fase de progresión de nuestra estrategia. Aplicamos upselling, cross-selling y optimización del AOV para que cada cliente aumente su inversión y satisfacción.";

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
        { "@type": "ListItem", "position": 3, "name": "Fase P: progresión" } // Corregido mayúsculas
      ]
    },
     "mainEntity": {
        "@type": "Article",
        "headline": "Estrategias de progresión: cómo aumentar el valor medio de pedido y la rentabilidad por cliente", // Corregido mayúsculas
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
        "datePublished": "2024-01-18", // Fecha ejemplo
        "dateModified": new Date().toISOString().split('T')[0],
        "articleBody": "La fase de progresión en nuestra estrategia se enfoca en aumentar el valor de cada transacción y el valor total que un cliente aporta durante su ciclo de vida. Esto se logra mediante estrategias como el upselling inteligente, cross-selling relevante, la optimización del valor medio del pedido (AOV), la presentación efectiva de variantes y opciones de producto/servicio, la mejora cualitativa continua de la oferta y el diseño de programas de valor añadido y bundles atractivos. El objetivo es incrementar la rentabilidad por cliente de manera sostenible, sin aumentar necesariamente los costes de adquisición y mejorando la satisfacción general del cliente.",
        "keywords": "progresión del cliente, upselling, cross-selling, AOV, valor medio de pedido, aumentar rentabilidad, estrategias de ventas, valor añadido"
    },
    "significantLink": [
        `${metodoPageUrl}/conversion`,  
        `${metodoPageUrl}/recurrencia` 
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
        <meta property="og:image" content={`${domain}/images/og-progresion-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-progresion-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 text-white dark:from-pink-600 dark:via-pink-700 dark:to-red-600"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to="/mi-metodo" className="inline-flex items-center text-pink-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a nuestro método
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                FASE 4 DE NUESTRA ESTRATEGIA
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-pink-300 dark:text-pink-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">P</span>
              Progresión
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-pink-100/90 dark:text-pink-200/90 mb-3 font-semibold"
            >
              Más ingresos por cada cliente. Así de simple.
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-pink-200/80 dark:text-pink-300/80 max-w-3xl mx-auto"
            >
              Conseguir un cliente nuevo siempre tiene un coste. ¿Por qué conformarse con una sola venta o un ticket bajo? En esta fase, nos enfocamos en que cada cliente que ya ha confiado en ti te deje <strong className="font-semibold text-white">MÁS ingresos</strong>, aumentando de forma inteligente tu <strong className="font-semibold text-white">valor medio de pedido (AOV)</strong>.
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-progresion">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/mi-metodo" className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        Nuestro método
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Fase P: progresión</BreadcrumbPage>
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
                         prose-a:text-pink-600 dark:prose-a:text-pink-400 hover:prose-a:text-pink-700 dark:hover:prose-a:text-pink-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-pink-500 dark:prose-blockquote:border-pink-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-pink-700 dark:text-pink-400 flex-shrink-0" />
                Impactar en cada fase del usuario para aumentar el AOV y la rentabilidad
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Una vez que un cliente ha superado la barrera de la primera conversión y ha decidido comprar o contratar tus servicios, ¡nuestro trabajo no ha terminado! De hecho, es donde se desbloquea un enorme potencial de crecimiento. La fase de <strong className="text-pink-600 dark:text-pink-400">progresión</strong> se centra en <strong className="text-pink-600 dark:text-pink-400">maximizar el valor de esa transacción inicial y de las futuras interacciones</strong> con ese cliente que ya te conoce y confía en ti.
              </p>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                No se trata de presionar o forzar ventas innecesarias, sino de presentar de forma inteligente y oportuna oportunidades relevantes que mejoren la experiencia del cliente, resuelvan necesidades adicionales y, como consecuencia directa, incrementen significativamente el ticket medio (AOV) y la rentabilidad por cliente.
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                "El objetivo es que tu ticket medio suba como la espuma, pero de forma orgánica y aportando valor. Esto se logra mediante estrategias inteligentes de upselling, cross-selling, una presentación optimizada de tus productos y servicios, y la creación de ofertas irresistibles que el cliente perciba como una oportunidad."
              </blockquote>
               <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Aumentar el AOV es una de las formas más rápidas y eficientes de mejorar la rentabilidad general de tu negocio, ya que aprovechas el coste de adquisición que ya has invertido en ese cliente.
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
                Estrategias clave para la <span className="text-pink-600 dark:text-pink-400">progresión del cliente</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {progressionStrategies.map((strategy) => (
                  <motion.div key={strategy.title} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", strategy.colorClass)}>
                           {React.cloneElement(strategy.icon, {className: cn(strategy.icon.props.className, strategy.colorClass ? '' : 'text-pink-600 dark:text-pink-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {strategy.title}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 flex-grow">{strategy.description}</p>
                        {strategy.examples && strategy.examples.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-gray-200/30 dark:border-slate-700/50">
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5">Ejemplos:</CardDescription>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                    {strategy.examples.map(example => <li key={example}>{example}</li>)}
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
              className="mt-12 md:mt-16 lg:mt-20 text-center"
            >
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Una vez que hemos optimizado el valor de cada transacción, el siguiente paso fundamental es asegurar que esos clientes satisfechos vuelvan una y otra vez.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to="/mi-metodo/conversion" aria-label="Volver a la fase de conversión"> {/* Corregido mayúsculas */}
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Fase anterior (conversión) {/* Corregido mayúsculas */}
                    </Link>
                </Button>
                <Button size="lg" asChild className="group bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to="/mi-metodo/recurrencia" aria-label="Continuar a la fase de recurrencia"> {/* Corregido mayúsculas */}
                    Ir a la fase de recurrencia (R) {/* Corregido mayúsculas */}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
              </div>
              <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300">
                    <Link to="/contacto" state={{ subject: "Consulta sobre la Fase de Progresión" }}>
                        <Lightbulb className="w-4 h-4 mr-2" /> ¿Preguntas sobre progresión? {/* Corregido mayúsculas */}
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

export default Progresion;