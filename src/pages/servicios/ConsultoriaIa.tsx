// src/pages/servicios/ConsultoriaIa.tsx
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
    Cpu,
    Brain,
    Zap,
    MessageCircle,
    BarChart2,      // Usado en iaApplicationsData
    CheckCircle,
    Users,
    Cog,
    Shield,
    Lightbulb,
    Home as HomeIcon,
    Briefcase,
    SearchCheck,
    PenTool,
    BarChart3      // ICONO CORREGIDO/AÑADIDO A IMPORTACIÓN (reemplaza BarChartHorizontalBig)
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
      delayChildren: 0.15,
      ease: "easeOut"
    }
  }
};

interface IaApplication {
  icon: React.ReactElement;
  title: string;
  description: string;
  examples?: string[];
  colorClass?: string;
}

const iaApplicationsData: IaApplication[] = [
  { icon: <Zap className="w-7 h-7"/>, title: "Automatización inteligente de procesos (RPA y AI)", description: "Liberamos tu tiempo y reducimos errores humanos automatizando tareas repetitivas en marketing, ventas, atención al cliente, operaciones y administración con soluciones de IA a medida.", examples: ["Clasificación inteligente de correos", "Gestión automatizada de pedidos", "Chatbots de soporte de primer nivel", "Generación automática de informes"], colorClass: "text-purple-600 dark:text-purple-400"},
  { icon: <MessageCircle className="w-7 h-7"/>, title: "IA para optimizar marketing digital y ventas", description: "Implementamos personalización avanzada de la experiencia de usuario en tiempo real, chatbots que cualifican y convierten, optimización inteligente de campañas publicitarias (PPC), y 'lead scoring' predictivo para maximizar tu ROI.", examples: ["Personalización web 1:1", "Chatbots conversacionales 24/7", "Optimización de puja en Google Ads", "Predicción de 'churn rate' y LTV"], colorClass: "text-pink-600 dark:text-pink-400"},
  { icon: <Brain className="w-7 h-7"/>, title: "IA para creación y optimización de contenido estratégico", description: "Utilizamos la IA como un potente asistente en la generación de ideas de contenido innovador, análisis semántico profundo para SEO, personalización de mensajes a gran escala y optimización de la legibilidad y el impacto de cada pieza de contenido.", examples: ["Generación de borradores y esquemas", "Análisis de sentimiento y tono", "Optimización SEO avanzada de textos", "Traducción automática de alta calidad"], colorClass: "text-rose-600 dark:text-rose-400"},
  { icon: <BarChart2 className="w-7 h-7"/>, title: "Análisis avanzado y 'business intelligence' con IA", description: "Implementamos soluciones de análisis predictivo, segmentación de clientes mucho más precisa y accionable, y detección temprana de tendencias de mercado para que tomes decisiones estratégicas basadas en datos sólidos y no en meras intuiciones.", examples: ["Modelos predictivos de demanda", "Segmentación avanzada de clientes por comportamiento", "Detección de anomalías y oportunidades", "Análisis de 'big data' para insights de negocio"], colorClass: "text-red-600 dark:text-red-400"},
  { icon: <Users className="w-7 h-7"/>, title: "Mejora de la experiencia de cliente (CX) con IA", description: "Diseñamos e implementamos soluciones de IA para ofrecer soporte proactivo y personalizado 24/7, recomendaciones de productos o servicios ultra-relevantes, y una comprensión más profunda de las necesidades, expectativas y frustraciones de tus clientes para fidelizarlos.", examples: ["Sistemas de recomendación inteligentes", "Análisis de la voz del cliente (VoC)", "Soporte técnico predictivo y automatizado"], colorClass: "text-orange-600 dark:text-orange-400"},
  { icon: <Shield className="w-7 h-7"/>, title: "IA para ciberseguridad y detección de fraude", description: "Aplicamos modelos de IA para fortalecer la seguridad de tus activos digitales, detectar patrones de fraude de forma temprana y proteger los datos de tu empresa y tus clientes de forma proactiva.", examples: ["Detección de intrusiones", "Análisis de comportamiento anómalo", "Prevención de fraude en transacciones"], colorClass: "text-amber-600 dark:text-amber-400"},
];

const processSteps = [
    { title: "Diagnóstico IA y detección de oportunidades", description: "Analizamos en profundidad tu negocio, procesos actuales y datos disponibles para identificar las áreas donde la inteligencia artificial puede generar un mayor impacto positivo y un ROI claro y medible.", icon: <SearchCheck className="w-8 h-8 mb-3 text-purple-500 dark:text-purple-400"/> },
    { title: "Diseño de la solución y estrategia de IA", description: "Creamos una estrategia de implementación de IA a medida, seleccionando o desarrollando las herramientas, algoritmos y modelos más adecuados para tus necesidades específicas, objetivos de negocio y presupuesto.", icon: <PenTool className="w-8 h-8 mb-3 text-purple-500 dark:text-purple-400"/> },
    { title: "Implementación, integración y pruebas exhaustivas", description: "Desplegamos la solución de IA, la integramos de forma fluida y eficiente con tus sistemas y procesos existentes (CRM, ERP, web), y realizamos pruebas rigurosas para asegurar su correcto funcionamiento, fiabilidad y seguridad.", icon: <Cog className="w-8 h-8 mb-3 text-purple-500 dark:text-purple-400"/> },
    // ICONO CORREGIDO AQUÍ
    { title: "Medición de resultados y optimización continua", description: "Monitorizamos de cerca el rendimiento de las soluciones de IA implementadas, medimos los KPIs clave definidos en la estrategia y ajustamos los modelos de forma iterativa para asegurar la máxima efectividad y una mejora constante de los resultados.", icon: <BarChart3 className="w-8 h-8 mb-3 text-purple-500 dark:text-purple-400"/> }
];

const ConsultoriaIa = () => {
  const navigate = useNavigate();

  const domain = "https://alvarostrategy.com"; // TODO: USER: Confirmar dominio final
  const pageUrl = `${domain}/servicios/consultoria-ia`;
  const pageTitle = "Consultoría en IA para negocios: optimiza, automatiza y crece con inteligencia artificial";
  const pageDescription = "Descubre cómo la inteligencia artificial puede transformar tu empresa. Ofrecemos consultoría en IA práctica y rentable para automatización de procesos, marketing, ventas y análisis de datos avanzados.";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consultoría en Inteligencia Artificial para Negocios",
    "serviceType": "Consultoría en Inteligencia Artificial",
    "description": pageDescription,
    "url": pageUrl,
    "mainEntityOfPage": pageUrl,
    "provider": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "url": domain,
      "logo": `${domain}/images/logo/logo-light-theme.png` // TODO: USER: Confirmar path del logo y dominio
    },
    "areaServed": {
      "@type": "Country",
      "name": "ES"
    },
    "serviceOutput": [
        {"@type": "Report", "name": "Diagnóstico de Oportunidades de IA"},
        {"@type": "Report", "name": "Estrategia de Implementación de IA Personalizada"},
        {"@type": "CreativeWork", "name": "Desarrollo e Integración de Soluciones de IA (si aplica)"},
        {"@type": "Report", "name": "Plan de Formación y Capacitación en IA para Equipos"},
        {"@type": "Report", "name": "Informes de Rendimiento y Optimización Continua de IA"}
    ],
    "keywords": "consultoría IA, inteligencia artificial para empresas, IA en negocios, automatización con IA, IA para marketing, IA para ventas, análisis de datos con IA, machine learning, transformación digital con IA, soluciones IA, experto IA",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Consultoría en Inteligencia Artificial",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consultoría en IA para Negocios",
            "url": pageUrl
          }
        }
      ]
    },
    "potentialAction": {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${domain}/contacto?servicio=consultoria-ia&utm_source=schema&utm_medium=servpage_ia&utm_campaign=solicitud_ia`,
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/IOSPlatform", "http://schema.org/AndroidPlatform"]
        },
        "name": "Solicitar Sesión de Descubrimiento sobre IA"
    }
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
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content={`${domain}/images/og-consultoria-ia.webp`} /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        {/* <meta name="twitter:image" content={`${domain}/images/twitter-consultoria-ia.webp`} /> */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-20 lg:py-28 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white dark:from-purple-700 dark:via-pink-700 dark:to-red-600"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
              <Badge className="bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                <Cpu className="w-4 h-4 mr-2 inline-block" /> IA práctica y rentable para tu negocio
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black leading-tight mb-5 sm:mb-6"
            >
              Consultoría en IA para negocios
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl lg:text-2xl text-purple-100/90 dark:text-purple-200/90 mb-8 sm:mb-10 max-w-3xl mx-auto"
            >
              Optimiza procesos, automatiza tareas, personaliza experiencias y toma decisiones más inteligentes. La IA no es (solo) el futuro, es la <strong className="font-semibold text-white">herramienta estratégica que tu negocio necesita AHORA</strong> para crecer y diferenciarse de forma decisiva.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="group bg-white text-purple-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate('/contacto', { state: { subject: "Interesado en consultoría IA para negocios" }})}
                aria-label="Descubrir el potencial de la inteligencia artificial para tu empresa"
              >
                Descubre el potencial de la IA
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
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                      <Link to="/servicios" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        Servicios
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Consultoría en IA para negocios</BreadcrumbPage>
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
                         prose-a:text-purple-600 dark:prose-a:text-purple-400 hover:prose-a:text-purple-700 dark:hover:prose-a:text-purple-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
                La inteligencia artificial ya no es ciencia ficción. <span className="block sm:inline">Es tu próxima (y actual) ventaja competitiva.</span>
              </h2>
              <p>
                Muchas empresas todavía ven la inteligencia artificial como algo excesivamente complejo, costoso o lejano a su realidad diaria. Nosotros te la acercamos, desmitificándola e identificando <strong className="font-semibold text-purple-600 dark:text-purple-400">aplicaciones prácticas, medibles y rentables</strong> que puedes comenzar a implementar desde hoy para optimizar radicalmente tus operaciones, comprender mejor a tus clientes, superar a tu competencia y liberar el verdadero potencial de tus recursos humanos y económicos.
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
                ¿Cómo puede la IA transformar <span className="text-purple-600 dark:text-purple-400">específicamente tu negocio</span>?
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {iaApplicationsData.map((app) => (
                  <motion.div key={app.title} variants={fadeInUp} className="h-full flex">
                    <Card className="h-full bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-5 sm:p-6 border-t-4 border-purple-500 dark:border-purple-400 w-full flex flex-col">
                       <div className="flex justify-center mb-4 sm:mb-5">
                        {React.cloneElement(app.icon, {className: cn("w-8 h-8", app.colorClass)})}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 text-center">{app.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed text-center flex-grow">{app.description}</p>
                       {app.examples && app.examples.length > 0 && (
                            <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5 text-center font-medium">Casos de uso:</CardDescription>
                                <ul className="text-xs text-gray-500 dark:text-slate-400 space-y-1 text-center">
                                    {app.examples.map(example => <li key={example}>{example}</li>)}
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
                Nuestro proceso de consultoría e <span className="text-purple-600 dark:text-purple-400">implementación de IA</span>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {processSteps.map((step, index) => (
                  <motion.div key={step.title} variants={fadeInUp} className="flex flex-col items-center text-center bg-white dark:bg-slate-800/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-purple-600 dark:bg-purple-700 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold mb-4 shadow-md">
                      {index + 1}
                    </div>
                    <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">{step.title}</h3>
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
              className="mb-12 md:mb-16 lg:mb-20 bg-purple-50 dark:bg-purple-900/30 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-purple-200 dark:border-purple-700/50"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-300 text-center mb-8 sm:mb-10">
                ¿Por qué confiar en AlvaroStrategy para tu estrategia de IA?
              </h2>
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div className="flex flex-col items-center p-4">
                  <Lightbulb className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">Enfoque práctico y rentable</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">Nos centramos en soluciones de IA que generan un ROI tangible y medible, no en proyectos de investigación abstractos o modas pasajeras.</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <Cog className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">Comprensión profunda del negocio</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">Entendemos tus necesidades de negocio específicas y cómo la IA puede resolver problemas reales, optimizar costes y abrir nuevas oportunidades.</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">Integración estratégica y ética</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">Capacidad para integrar la IA con tu estrategia digital global (SEO, contenidos, CRO) y siempre con un enfoque ético y responsable.</p>
                </div>
              </div>
            </motion.section>
            
            {/* TODO: Descomentar y adaptar cuando la página de Casos de Éxito y su contenido estén listos.
            <motion.section className="mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                Casos de uso y éxito en <span className="text-purple-600 dark:text-purple-400">implementación de IA</span>
              </h2>
              {/* Aquí irían los mini-casos de éxito específicos de IA *}
            </motion.section>
            */}

            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl shadow-2xl text-center"
            >
              <Brain className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 sm:mb-6 opacity-80" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">
                ¿Listo para que la IA impulse tu crecimiento y eficiencia?
              </h2>
              <p className="text-md sm:text-lg lg:text-xl text-purple-100/90 dark:text-purple-200/90 mb-8 max-w-2xl mx-auto leading-relaxed sm:leading-loose">
                Hablemos sobre tus desafíos actuales y exploremos juntos cómo la inteligencia artificial puede convertirse en tu mayor aliada estratégica para llevar tu negocio al siguiente nivel de rendimiento.
              </p>
              <Button
                size="lg"
                className="group bg-white text-purple-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate('/contacto', { state: { subject: "Sesión de descubrimiento IA para mi negocio" }})}
                aria-label="Agendar sesión de descubrimiento sobre IA para tu negocio"
              >
                Agenda tu sesión de descubrimiento IA
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </motion.section>

            <motion.div variants={fadeInUp} className="mt-12 md:mt-16 text-center">
                 <Button size="sm" variant="ghost" asChild className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
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

export default ConsultoriaIa;