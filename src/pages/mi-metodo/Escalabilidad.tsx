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
    Rocket,
    Settings,
    Users,
    Cpu,
    Network,
    ShieldCheck,
    BarChartBig,
    Lightbulb,
    MessageSquare,
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

interface ScalabilityPillar {
    title: string;
    icon: React.ReactElement;
    description: string;
    details?: string[];
    colorClass?: string;
}

const scalabilityPillars: ScalabilityPillar[] = [
    {
        title: "Optimización y automatización de procesos",
        icon: <Settings className="w-7 h-7"/>,
        description: "Identificamos cuellos de botella y automatizamos tareas repetitivas (marketing, ventas, operaciones, administrativas) mediante herramientas de RPA e IA para liberar tiempo y recursos valiosos.",
        details: ["Implementación de RPA (Robotic Process Automation)", "Automatización de flujos de trabajo con IA", "Optimización de la cadena de suministro y logística", "Sistemas de gestión de proyectos eficientes"],
        colorClass: "text-orange-600"
    },
    {
        title: "Análisis de datos para decisiones estratégicas",
        icon: <BarChartBig className="w-7 h-7"/>,
        description: "Implementamos sistemas de business intelligence (BI) y análisis avanzado para monitorizar KPIs clave en tiempo real, identificar tendencias, predecir escenarios y tomar decisiones informadas que impulsen el crecimiento sostenible.", // Corregido mayúscula
        details: ["Cuadros de mando personalizados", "Análisis predictivo y prescriptivo", "Cultura 'data-driven'"],
        colorClass: "text-amber-500"
    },
    {
        title: "Desarrollo de equipos y delegación efectiva",
        icon: <Users className="w-7 h-7"/>,
        description: "Estructuramos equipos de alto rendimiento, definimos roles y responsabilidades claras, y fomentamos una cultura de delegación y 'ownership' para que el negocio pueda crecer sin depender exclusivamente de los fundadores.",
        colorClass: "text-yellow-500"
    },
    {
        title: "Tecnología e infraestructura escalable",
        icon: <Cpu className="w-7 h-7"/>,
        description: "Aseguramos que la tecnología subyacente (plataforma web, CRM, ERP, APIs, etc.) pueda soportar un mayor volumen de usuarios, datos y transacciones sin perder rendimiento, seguridad ni estabilidad.",
        details: ["Arquitecturas cloud flexibles (AWS, Google Cloud)", "Microservicios y APIs robustas", "Planes de contingencia y DRP"],
        colorClass: "text-lime-500"
    },
    {
        title: "Modelos de negocio flexibles y expansibles",
        icon: <Network className="w-7 h-7"/>,
        description: "Evaluamos y adaptamos el modelo de negocio para permitir la expansión a nuevos mercados geográficos, la diversificación inteligente de productos/servicios o la adopción de modelos de ingresos más escalables (ej. SaaS, suscripciones, licencias).",
        colorClass: "text-green-500"
    },
    {
        title: "Gestión financiera y de recursos sólida",
        icon: <ShieldCheck className="w-7 h-7"/>,
        description: "Establecemos una planificación financiera robusta, una gestión eficiente del flujo de caja (cashflow) y una optimización continua de la asignación de recursos para asegurar la rentabilidad y la salud financiera durante las fases de crecimiento acelerado.",
        colorClass: "text-emerald-500"
    },
];


const Escalabilidad = () => {
  const navigate = useNavigate(); // No se usa directamente, pero se mantiene por si acaso

  const domain = "https://alvarostrategy.com"; 
  const metodoPageUrl = `${domain}/mi-metodo`;
  const pageUrl = `${metodoPageUrl}/escalabilidad`;
  const pageTitle = "Fase E: escalabilidad – crecimiento sólido, constante y rentable"; // Corregido mayúsculas
  const pageDescription = "Culmina nuestra estrategia con la fase de escalabilidad. Construimos sistemas y procesos para un crecimiento exponencial y sostenible, asegurando que tu negocio prospere a largo plazo.";

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
        { "@type": "ListItem", "position": 3, "name": "Fase E: escalabilidad" } // Corregido mayúsculas
      ]
    },
     "mainEntity": {
        "@type": "Article",
        "headline": "Escalabilidad empresarial: cómo preparar tu negocio para un crecimiento sin límites", // Corregido mayúsculas
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
        "datePublished": "2024-01-20", // Fecha de ejemplo
        "dateModified": new Date().toISOString().split('T')[0],
        "articleBody": "La fase de escalabilidad es la culminación de nuestra estrategia digital integral, donde se establecen los sistemas y procesos para que el negocio crezca de forma eficiente, sostenible y rentable. Se enfoca en la optimización y automatización de procesos clave, el análisis de datos para la toma de decisiones informadas, el desarrollo de equipos autónomos y competentes, la implementación de una infraestructura tecnológica adecuada y adaptable, la exploración de modelos de negocio flexibles y expansibles, y una gestión financiera sólida. El objetivo es construir una 'máquina de crecimiento' robusta y que permita al negocio prosperar a largo plazo.",
        "keywords": "escalabilidad empresarial, crecimiento sostenible, automatización de procesos, análisis de datos, business intelligence, desarrollo de equipos, infraestructura tecnológica, modelos de negocio escalables, gestión financiera"
    },
    "significantLink": [
        `${metodoPageUrl}/recurrencia`,
        `${domain}/contacto`,
        `${domain}/servicios/estrategia-digital-integral`
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
        <meta property="og:image" content={`${domain}/images/og-escalabilidad-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-escalabilidad-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white dark:from-orange-600 dark:via-orange-700 dark:to-red-600"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to="/mi-metodo" className="inline-flex items-center text-orange-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    Volver a nuestro método
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                FASE 6 DE NUESTRA ESTRATEGIA
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-orange-300 dark:text-orange-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">E</span>
              Escalabilidad
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-orange-100/90 dark:text-orange-200/90 mb-3 font-semibold"
            >
              Crecer con cabeza, con beneficios y sin morir en el intento.
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-orange-200/80 dark:text-orange-300/80 max-w-3xl mx-auto"
            >
              Esta es la culminación: atamos todos los cabos para que tu negocio no solo crezca, sino que lo haga de forma sólida, constante y, sobre todo, rentable. Es la fase donde la estabilidad y el crecimiento planificado definen tu camino hacia el éxito duradero.
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-escalabilidad">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/mi-metodo" className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        Nuestro método
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Fase E: escalabilidad</BreadcrumbPage>
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
                         prose-a:text-orange-600 dark:prose-a:text-orange-400 hover:prose-a:text-orange-700 dark:hover:prose-a:text-orange-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-orange-500 dark:prose-blockquote:border-orange-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100"> 
                <Rocket className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-orange-700 dark:text-orange-400 flex-shrink-0" />
                Construyendo la máquina de crecimiento: sistemas para la expansión
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose"> 
                De nada sirve tener un producto increíble, una marca que atrae, clientes que convierten y una base leal que repite, si tu negocio no está intrínsecamente preparado para manejar y sostener ese éxito a mayor escala. La fase de <strong className="text-orange-600 dark:text-orange-400">escalabilidad</strong> consiste precisamente en <strong className="text-orange-600 dark:text-orange-400">establecer los sistemas, procesos, la tecnología y la estructura organizativa necesaria para crecer de manera eficiente, sostenible y rentable</strong>, sin que la calidad del producto o servicio se vea comprometida, ni te ahogues en tu propio crecimiento por falta de previsión.
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3"> 
                "El objetivo final de toda nuestra estrategia es que puedas dormir tranquilo sabiendo que la 'máquina' funciona de forma autónoma y eficiente, que tu negocio es robusto, adaptable a los cambios del mercado y, sobre todo, que es cada vez más rentable a medida que crece. Es la diferencia entre un autoempleo estresante y una empresa que prospera."
              </blockquote>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose"> 
                Esta fase es la que realmente transforma un buen negocio en una gran empresa, capaz de expandir su impacto y sus beneficios de forma exponencial.
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
                Pilares fundamentales de la <span className="text-orange-600 dark:text-orange-400">escalabilidad empresarial</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {scalabilityPillars.map((pillar) => (
                  <motion.div key={pillar.title} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", pillar.colorClass)}>
                           {React.cloneElement(pillar.icon, {className: cn(pillar.icon.props.className, pillar.colorClass ? '' : 'text-orange-600 dark:text-orange-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {pillar.title}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 flex-grow">{pillar.description}</p>
                        {pillar.details && pillar.details.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-gray-200/30 dark:border-slate-700/50">
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5">Ejemplos / Claves:</CardDescription>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                    {pillar.details.map(detail => <li key={detail}>{detail}</li>)}
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
              className="mt-12 md:mt-16 lg:mt-20 text-center p-6 sm:p-8 bg-gradient-to-r from-slate-200 via-gray-100 to-slate-200 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 rounded-xl shadow-xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                Tu negocio está listo para el siguiente nivel.
              </h3>
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Con todas las fases de nuestra estrategia digital integral optimizadas y trabajando en sinergia, has construido una base sólida para alcanzar nuevas cotas de éxito y un crecimiento que perdure en el tiempo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" asChild className="group bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to="/contacto" state={{ subject: "Quiero escalar mi negocio con vuestra estrategia integral" }}> 
                    Hablemos de tu proyecto de escalabilidad
                    <MessageSquare className="ml-2 w-5 h-5"/>
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="group border-orange-500 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/40 hover:text-orange-700 dark:hover:text-orange-300 w-full sm:w-auto transition-all duration-300">
                    <Link to="/servicios/estrategia-digital-integral">
                        Nuestros servicios de estrategia
                        <Lightbulb className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
              </div>
               <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                    <Link to="/mi-metodo/recurrencia" aria-label="Volver a la fase de recurrencia"> {/* Corregido mayúsculas */}
                        <ArrowLeft className="mr-2 w-4 h-4" /> Volver a fase de recurrencia (R) {/* Corregido mayúsculas */}
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

export default Escalabilidad;