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
    Heart,
    Repeat,
    Users,
    Mail,
    Gift,
    Award,
    MessageCircle, // No se usa directamente, pero podría ser útil para iconos de comunidad
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

interface RecurrenceStrategy {
    title: string;
    icon: React.ReactElement;
    description: string;
    details?: string[];
    colorClass?: string;
}

const recurrenceStrategies: RecurrenceStrategy[] = [
    {
        title: "Email marketing estratégico y automatizado",
        icon: <Mail className="w-7 h-7"/>,
        description: "Diseño e implementación de flujos automatizados (bienvenida, post-compra, recuperación de carritos abandonados, reactivación) y campañas de email marketing segmentadas que fidelizan, educan y generan ventas recurrentes.",
        details: ["Segmentación avanzada de la base de datos", "Automatización de flujos (flows) clave", "Campañas personalizadas y de valor", "Tests A/B continuos para optimizar aperturas y clics"],
        colorClass: "text-red-600"
    },
    {
        title: "Programas de lealtad y fidelización efectivos",
        icon: <Gift className="w-7 h-7"/>,
        description: "Creación de sistemas de puntos, recompensas exclusivas, niveles de cliente VIP y beneficios especiales diseñados para incentivar la repetición de compra, el engagement y el sentimiento de pertenencia a la marca.",
        details: ["Sistemas de puntos acumulables", "Beneficios exclusivos para miembros", "Gamificación y retos"],
        colorClass: "text-rose-500"
    },
    {
        title: "Maximización del valor del ciclo de vida del cliente (CLTV)",
        icon: <Heart className="w-7 h-7"/>,
        description: "Implementación de estrategias transversales enfocadas en aumentar el valor total que un cliente aporta a tu negocio durante toda su relación contigo, desde la primera compra hasta la última.",
        details: ["Análisis predictivo de comportamiento", "Estrategias de retención proactivas", "Personalización de la oferta a largo plazo"],
        colorClass: "text-pink-600"
    },
    {
        title: "Construcción y gestión de comunidad",
        icon: <Users className="w-7 h-7"/>,
        description: "Fomentar la interacción, el diálogo y el sentido de pertenencia alrededor de tu marca a través de grupos exclusivos (Discord, Telegram, foros privados), webinars o eventos, convirtiendo clientes en verdaderos embajadores.",
        colorClass: "text-orange-500"
    },
    {
        title: "Experiencia post-venta excepcional y proactiva",
        icon: <Award className="w-7 h-7"/>,
        description: "Asegurar un soporte al cliente eficiente y empático, realizar un seguimiento post-compra personalizado y mantener una comunicación que haga sentir valorado al cliente incluso mucho después de la transacción inicial.",
        colorClass: "text-amber-500"
    },
    {
        title: "Desarrollo de modelos de ingresos recurrentes",
        icon: <Repeat className="w-7 h-7"/>,
        description: "Exploración, diseño e implementación de modelos de negocio basados en suscripción, membresías, compras programadas o servicios continuados que aseguren un flujo de ingresos más predecible y escalable.",
        colorClass: "text-red-700"
    },
];


const Recurrencia = () => {
  const navigate = useNavigate(); // No se usa, mantenido por si acaso

  const domain = "https://alvarostrategy.com"; 
  const metodoPageUrl = `${domain}/mi-metodo`;
  const pageUrl = `${metodoPageUrl}/recurrencia`;
  const pageTitle = "Fase R: recurrencia – fidelizando clientes para un crecimiento sostenido"; // Corregido mayúsculas
  const pageDescription = "Descubre la fase de recurrencia de nuestra estrategia. Implementamos email marketing, programas de lealtad y optimización del CLTV para que tus clientes no solo vuelvan, sino que se conviertan en promotores.";

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
        { "@type": "ListItem", "position": 3, "name": "Fase R: recurrencia" } // Corregido mayúsculas
      ]
    },
     "mainEntity": {
        "@type": "Article",
        "headline": "Estrategias de recurrencia y fidelización: cómo convertir clientes en fans", // Corregido mayúsculas
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
        "datePublished": "2024-01-19", // Fecha ejemplo
        "dateModified": new Date().toISOString().split('T')[0],
        "articleBody": "La fase de recurrencia de nuestra estrategia se centra en construir relaciones a largo plazo con los clientes existentes para fomentar la lealtad y las compras repetidas. Se abordan estrategias como el email marketing avanzado, programas de fidelización efectivos, la optimización del valor del ciclo de vida del cliente (CLTV), la construcción y gestión de comunidades online, y la creación de experiencias post-venta memorables. El objetivo es transformar clientes satisfechos en defensores activos de la marca y asegurar un flujo de ingresos predecible y creciente.",
        "keywords": "recurrencia de clientes, fidelización, lealtad de marca, email marketing, CLTV, customer lifetime value, programas de lealtad, comunidad online, experiencia post-venta"
    },
    "significantLink": [
        `${metodoPageUrl}/progresion`,
        `${metodoPageUrl}/escalabilidad`
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
        <meta property="og:image" content={`${domain}/images/og-recurrencia-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-recurrencia-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-red-600 via-red-700 to-rose-600 text-white dark:from-red-700 dark:via-red-800 dark:to-rose-700"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to="/mi-metodo" className="inline-flex items-center text-red-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a nuestro método
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                FASE 5 DE NUESTRA ESTRATEGIA
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-red-300 dark:text-red-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">R</span>
              Recurrencia
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-red-100/90 dark:text-red-200/90 mb-3 font-semibold"
            >
              El verdadero tesoro: que vuelvan una y otra vez (y compren más).
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-red-200/80 dark:text-red-300/80 max-w-3xl mx-auto"
            >
              Aquí es donde se encuentra la rentabilidad a largo plazo. Un cliente que repite y se siente valorado no solo es oro puro, sino tu mejor marketing. Optimizamos el <strong className="font-semibold text-white">valor del ciclo de vida del cliente (CLTV)</strong> para construir un flujo de ingresos predecible, creciente y sostenible.
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-recurrencia">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/mi-metodo" className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        Nuestro método
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Fase R: recurrencia</BreadcrumbPage>
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
                         prose-a:text-red-600 dark:prose-a:text-red-400 hover:prose-a:text-red-700 dark:hover:prose-a:text-red-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-red-500 dark:prose-blockquote:border-red-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-red-700 dark:text-red-400 flex-shrink-0" />
                Lo importante no es solo que venga, es que se quede y vuelva (encantado)
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Adquirir un cliente nuevo es, en la mayoría de los mercados, significativamente más costoso y complejo que retener a uno existente. La fase de <strong className="text-red-600 dark:text-red-400">recurrencia</strong> se enfoca precisamente en esto: en construir relaciones sólidas, valiosas y duraderas que no solo aseguren compras repetidas, sino que conviertan a tus clientes satisfechos en <strong className="text-red-600 dark:text-red-400">auténticos defensores y promotores de tu marca</strong>.
              </p>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Un cliente leal no solo gasta más a lo largo del tiempo (incrementando el CLTV), sino que también reduce tus costes de marketing al generar boca a boca positivo y referencias. Es la base de un crecimiento verdaderamente sostenible y rentable.
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                "El email marketing, cuando se hace bien (con estrategia, segmentación y valor, no spam), es una de las herramientas más poderosas para impactar en la conversión, la progresión y, fundamentalmente, en la recurrencia. Trabajar y cuidar tu propia audiencia te da el control y la capacidad de construir relaciones, no solo transacciones."
              </blockquote>
               <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                Esta fase busca crear un círculo virtuoso: clientes felices que compran más, con mayor frecuencia, y que además atraen a nuevos clientes.
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
                Estrategias clave para fomentar la <span className="text-red-600 dark:text-red-400">recurrencia y lealtad</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {recurrenceStrategies.map((strategy) => (
                  <motion.div key={strategy.title} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", strategy.colorClass)}>
                           {React.cloneElement(strategy.icon, {className: cn(strategy.icon.props.className, strategy.colorClass ? '' : 'text-red-600 dark:text-red-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {strategy.title}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 flex-grow">{strategy.description}</p>
                        {strategy.details && strategy.details.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-gray-200/30 dark:border-slate-700/50">
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5">Puntos clave:</CardDescription>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                    {strategy.details.map(detail => <li key={detail}>{detail}</li>)}
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
                Con clientes leales y recurrentes, tu negocio está preparado para el crecimiento exponencial y la verdadera escalabilidad sostenible.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to="/mi-metodo/progresion" aria-label="Volver a la fase de progresión"> {/* Corregido mayúsculas */}
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Fase anterior (progresión) {/* Corregido mayúsculas */}
                    </Link>
                </Button>
                <Button size="lg" asChild className="group bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to="/mi-metodo/escalabilidad" aria-label="Continuar a la fase de escalabilidad"> {/* Corregido mayúsculas */}
                    Ir a la fase de escalabilidad (E) {/* Corregido mayúsculas */}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
              </div>
               <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    <Link to="/contacto" state={{ subject: "Consulta sobre la Fase de Recurrencia" }}>
                        <Lightbulb className="w-4 h-4 mr-2" /> ¿Preguntas sobre recurrencia? {/* Corregido mayúsculas */}
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

export default Recurrencia;