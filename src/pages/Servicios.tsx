import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Briefcase, Lightbulb, Search, Brain, BookUser, HelpCircle, MessageSquareHeart, Home as HomeIcon, Cog, UserCircle as QuienSoyIcon, BookOpen as BlogIconFile } from "lucide-react"; 
import { cn } from "@/lib/utils"; 

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
};

interface ServiceItem {
  icon: React.ReactElement;
  title: string;
  description: React.ReactNode; 
  link: string;
  linkText: string;
  badgeText?: string;
  colorClass: "blue" | "indigo" | "purple";
}

const serviceColorClasses = {
  blue: {
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconText: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    border: "border-blue-500 dark:border-blue-600",
    button: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
  },
  indigo: {
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconText: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700",
    border: "border-indigo-500 dark:border-indigo-600",
    button: "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-indigo-500 dark:hover:text-white"
  },
  purple: {
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconText: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700",
    border: "border-purple-500 dark:border-purple-600",
    button: "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:text-purple-400 dark:border-purple-500 dark:hover:bg-purple-500 dark:hover:text-white"
  },
};

const servicesData: ServiceItem[] = [
  {
    icon: <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Estrategia digital integral",
    description: (
      <>
        Desarrollamos tu hoja de ruta completa hacia el éxito online, integrando{" "}
        <Link to="/mi-metodo" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          nuestro método probado
        </Link>
        , SEO avanzado e IA para resultados medibles y sostenibles.
      </>
    ),
    link: "/servicios/estrategia-digital-integral",
    linkText: "Detalles de estrategia digital",
    colorClass: "blue"
  },
  {
    icon: <Search className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Consultoría SEO avanzada",
    description: "Dominamos el SEO técnico, semántico y la optimización E-E-A-T para convertir tu web en una autoridad, multiplicar tu tráfico orgánico cualificado y posicionarte como referente indiscutible en tu sector.",
    link: "/servicios/consultoria-seo",
    linkText: "Detalles de consultoría SEO",
    colorClass: "indigo"
  },
  {
    icon: <Brain className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Consultoría en IA para negocios",
    description: "Implementamos soluciones de inteligencia artificial prácticas para automatizar procesos, personalizar la experiencia de cliente, tomar decisiones basadas en datos e impulsar la eficiencia operativa de tu empresa.",
    link: "/servicios/consultoria-ia",
    linkText: "Detalles de consultoría IA",
    colorClass: "purple"
  },
  {
    icon: <BookUser className="w-7 h-7 sm:w-8 sm:h-8" />,
    title: "Formación personalizada y talleres prácticos",
    description: "Capacitamos a tu equipo con formación y talleres a medida en estrategia digital, SEO e IA. Esta sección está en desarrollo, visita nuestra página de inicio para una visión general de nuestra filosofía.",
    link: "/", 
    linkText: "Saber más sobre nosotros",
    badgeText: "PRÓXIMAMENTE",
    colorClass: "blue"
  }
];

const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const colors = serviceColorClasses[service.colorClass as keyof typeof serviceColorClasses] || serviceColorClasses.blue; 
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Card className={cn(
        "group bg-white dark:bg-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border-t-4 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5",
        colors.border 
      )}>
        <CardHeader className="p-6 sm:p-8">
          <div className="flex items-center mb-4">
            <div className={cn("p-3 rounded-full mr-4 shadow-md group-hover:scale-110 transition-transform", colors.iconBg)}>
              {React.cloneElement(service.icon, { 
                className: cn(service.icon.props.className, colors.iconText) 
              })}
            </div>
            {service.badgeText && (
              <Badge variant="secondary" className={cn("ml-auto text-xs sm:text-sm font-semibold text-white", colors.badgeBg)}>
                {service.badgeText}
              </Badge>
            )}
          </div>
          <CardTitle className={cn("text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 transition-colors group-hover:text-opacity-80", colors.iconText)}>
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-0 flex-grow flex flex-col">
          <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
            {service.description} 
          </CardDescription>
          <div className="mt-auto">
            <Button asChild variant="outline" className={cn("group w-full sm:w-auto font-semibold transition-all", colors.button)}>
              <Link to={service.link}>
                {service.linkText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const preFooterLinks = [
  { label: "Nuestro método probado", href: "/mi-metodo", icon: <Cog className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />, description: "Descubre el sistema paso a paso que utilizamos para impulsar negocios." },
  { label: "Conoce mi filosofía", href: "/quien-soy", icon: <QuienSoyIcon className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />, description: "Averigua más sobre mi enfoque y cómo trabajo con mis clientes." },
  { label: "Ideas y estrategias en el blog", href: "/blog", icon: <BlogIconFile className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />, description: "Artículos con consejos prácticos sobre SEO, IA y marketing digital." },
];


const ServiciosPage = () => {
  const navigate = useNavigate();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Servicios de consultoría: estrategia digital, SEO e IA - AlvaroStrategy",
    "description": "Impulsa tu negocio con nuestros servicios de consultoría: estrategia digital de alto impacto, SEO avanzado e IA aplicada para atraer clientes y maximizar tu rentabilidad.",
    "url": "https://alvarostrategy.com/servicios",
    "inLanguage": "es-ES",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://alvarostrategy.com/" },
        { "@type": "ListItem", "position": 2, "name": "Servicios" }
      ]
    },
    "mainEntity": {
      "@type": "OfferCatalog",
      "name": "Catálogo de servicios de AlvaroStrategy",
      "itemListElement": servicesData
        .filter(service => service.link !== "/") 
        .map(service => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.title,
            "url": `https://alvarostrategy.com${service.link}`, 
            "description": typeof service.description === 'string' ? service.description : "Consulta nuestra web para más detalles." 
          }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alvarostrategy.com/images/Alvaro%20Fernandez%20de%20Celis.webp" 
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Servicios de consultoría: estrategia digital, SEO e IA - AlvaroStrategy</title>
        <meta name="description" content="Impulsa tu negocio con nuestros servicios de consultoría: estrategia digital de alto impacto, SEO avanzado e IA aplicada para atraer clientes y maximizar tu rentabilidad." />
        <link rel="canonical" href="https://alvarostrategy.com/servicios" /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-4 sm:px-6"
        >
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <HomeIcon className="h-4 w-4 mr-1.5" />
                      Inicio
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-gray-700 dark:text-slate-200">Servicios</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.header
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <Briefcase className="w-5 h-5 mr-2 inline-block" /> Tus soluciones estratégicas
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              Servicios de consultoría para impulsar tu negocio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Combinamos estrategia digital de alto impacto, SEO de vanguardia e inteligencia artificial aplicada para ofrecerte soluciones que transforman tu presencia online, atraen clientes cualificados y maximizan tu rentabilidad de forma sostenible.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
          </motion.header>

          <motion.section
            variants={staggerContainer} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12">
              Nuestras áreas de <span className="text-blue-600 dark:text-blue-400">expertise</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {servicesData.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </motion.section>

{/* ====== BLOQUE PRE-FOOTER CAMBIADO PARA DEPURAR whileInView ====== */}
<motion.section
  variants={fadeInUp}
  initial="hidden"
  animate="visible" // CAMBIADO DE whileInView
  // viewport={{ once: true, amount: 0.1 }} // COMENTADO TEMPORALMENTE
  className="my-16 md:my-20 lg:my-24"
>
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12">
    Explora otras áreas de nuestra estrategia
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
    { preFooterLinks.map(item => (
      <motion.div 
        variants={fadeInUp} 
        key={item.href}
        initial="hidden" // Añadido para que cada tarjeta también anime
        animate="visible" // CAMBIADO DE whileInView
        // viewport={{ once: true, amount: 0.1 }} // COMENTADO TEMPORALMENTE
      >
         <Card className="h-full group bg-white dark:bg-slate-800/50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 items-center text-center transform hover:-translate-y-1">
          {item.icon}
          <h3 className="font-semibold text-lg text-gray-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {item.label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 flex-grow">{item.description}</p>
          <Button asChild variant="outline" className="mt-auto group/button border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400">
              <Link to={item.href}>
                  Saber más
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
              </Link>
          </Button>
        </Card>
      </motion.div>
    ))}
  </div>
</motion.section>
{/* ======================================== */}

          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-8 sm:p-10 lg:p-14 rounded-2xl shadow-2xl text-center"
          >
            <HelpCircle className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 text-sky-300" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              ¿No sabes por dónde empezar o qué servicio es el adecuado para ti?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              No te preocupes, es normal. Cada negocio es un mundo. Por eso te ofrezco una sesión estratégica GRATUITA para analizar tu situación y recomendarte el camino más efectivo.
            </p>
            <Button
              size="lg"
              className="group bg-white text-blue-700 hover:bg-gray-200 px-7 py-3.5 sm:px-9 sm:py-4 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => navigate('/contacto', { state: { subject: "Solicitud de sesión estratégica gratuita desde página de servicios" } })}
            >
              <MessageSquareHeart className="mr-2 w-5 h-5 sm:w-5 sm:h-5" />
              Agenda tu sesión gratuita
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Button>
            <p className="text-sm text-blue-200/80 mt-5 italic">
              Sin compromiso, solo valor y claridad para tu proyecto.
            </p>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
};

export default ServiciosPage;