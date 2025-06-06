import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Target, Users, TrendingUp, Zap, Shield, Award, Star,
  Clock, Lightbulb, Rocket, Trophy, Heart, AlertTriangle,
  HelpCircle, TrendingDown, Briefcase, Speaker, Brain, BookOpen, UserCircle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
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

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- DATOS CONSTANTES ---
const growthData = [
  { month: 'Ene', before: 20, after: 45, projection: 55 },
  { month: 'Feb', before: 25, after: 52, projection: 68 },
  { month: 'Mar', before: 22, after: 68, projection: 85 },
  { month: 'Abr', before: 28, after: 78, projection: 95 },
  { month: 'May', before: 30, after: 95, projection: 120 },
  { month: 'Jun', before: 35, after: 120, projection: 145 }
];

const resultsData = [
  { name: 'Tráfico Web', value: 150, color: '#3b82f6', description: '+150% más visitantes' },
  { name: 'Conversiones', value: 230, color: '#22d3ee', description: '+230% más ventas' },
  { name: 'ROI', value: 180, color: '#8b5cf6', description: '+180% retorno' }
];

type StepColor = "blue" | "indigo" | "purple" | "pink" | "red" | "orange";

const interactiveSteps = [
  {
    letter: "P",
    title: "PRODUCTO/MARCA",
    subtitle: "Sin filtros ni mentiras piadosas",
    description: "Primero, destripamos tu negocio. ¿Qué vendes? ¿A quién? ¿Qué te hace diferente? ¿Cuáles son tus números reales y a dónde quieres llegar? Sin paños calientes. Aquí encontramos tu Métrica Norte (la que de verdad importa para hacer caja).",
    color: "blue" as StepColor,
    image: "photo-1486718448742-163732cd1544", 
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    letter: "A",
    title: "ADQUISICIÓN",
    subtitle: "Atraer a los que SÍ compran, no a curiosos",
    description: "Con SEO/SEM del bueno (del que trae clientes, no solo visitas) y la IA trabajando para ti, hacemos que te encuentren los que tienen la cartera lista. Nos olvidamos de inflar números para que el informe parezca bonito. Queremos gente que convierta, que pague. Construimos TU audiencia, para que no dependas de que el algoritmo de turno se levante de buen humor. Menos costes por cliente nuevo, más rentabilidad.",
    color: "indigo" as StepColor,
    image: "photo-1493397212122-2b85dda8106b", 
    icon: <Target className="w-6 h-6" />
  },
  {
    letter: "C",
    title: "CONVERSIÓN",
    subtitle: "Que el \"me interesa\" se convierta en \"toma mi dinero\"",
    description: "De nada sirve atraer si luego se van por donde han venido. Optimizamos cada rincón de tu presencia online para que el que llegue, compre. O al menos, dé el primer paso para hacerlo. Cada clic, cada página, cada botón tiene que currar para ti.",
    color: "purple" as StepColor,
    image: "photo-1649972904349-6e44c42644a7", 
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    letter: "P",
    title: "PROGRESIÓN",
    subtitle: "Que cada cliente te deje MÁS dinero",
    description: "No nos conformamos con una venta. Hacemos que cada cliente que ya te ha comprado, compre más o compre más caro. Upselling, cross-selling... llámalo X, pero el objetivo es que tu ticket medio suba como la espuma.",
    color: "pink" as StepColor,
    image: "photo-1581091226825-a6a2a5aee158", 
    icon: <Trophy className="w-6 h-6" />
  },
  {
    letter: "R",
    title: "RECURRENCIA",
    subtitle: "El verdadero tesoro: que vuelvan una y otra vez",
    description: "Aquí está la pasta de verdad. Un cliente que repite es oro puro. Email marketing que no parece spam, programas que hacen que tus clientes se sientan especiales... Hacemos que quieran volver a comprarte sin que tengas que perseguirlos. Esto dispara el valor de cada cliente a largo plazo.",
    color: "red" as StepColor,
    image: "photo-1488590528505-98d2b5aba04b", 
    icon: <Heart className="w-6 h-6" />
  },
  {
    letter: "E",
    title: "ESCALABILIDAD",
    subtitle: "Crecer sin morir en el intento y con beneficios",
    description: "Atamos todos los cabos para que tu negocio crezca de forma sólida, constante y, sobre todo, rentable. Que puedas dormir tranquilo sabiendo que la máquina funciona.",
    color: "orange" as StepColor,
    image: "photo-1487058792275-0ad4aaf24ca7", 
    icon: <Rocket className="w-6 h-6" />
  }
];

const activeButtonThemeClasses: Record<StepColor, string> = {
  blue: "bg-blue-600 text-white ring-blue-400",
  indigo: "bg-indigo-600 text-white ring-indigo-400",
  purple: "bg-purple-600 text-white ring-purple-400",
  pink: "bg-pink-600 text-white ring-pink-400",
  red: "bg-red-600 text-white ring-red-400",
  orange: "bg-orange-600 text-white ring-orange-400",
};

const stepColorRelatedClasses: Record<StepColor, { border: string; bgIcon: string; textIcon: string; textSubtitle: string }> = {
  blue: { border: "border-blue-500", bgIcon: "bg-blue-100", textIcon: "text-blue-600", textSubtitle: "text-blue-600" },
  indigo: { border: "border-indigo-500", bgIcon: "bg-indigo-100", textIcon: "text-indigo-600", textSubtitle: "text-indigo-600" },
  purple: { border: "border-purple-500", bgIcon: "bg-purple-100", textIcon: "text-purple-600", textSubtitle: "text-purple-600" },
  pink: { border: "border-pink-500", bgIcon: "bg-pink-100", textIcon: "text-pink-600", textSubtitle: "text-pink-600" },
  red: { border: "border-red-500", bgIcon: "bg-red-100", textIcon: "text-red-600", textSubtitle: "text-red-600" },
  orange: { border: "border-orange-500", bgIcon: "bg-orange-100", textIcon: "text-orange-600", textSubtitle: "text-orange-600" },
};

const problemsData = [
  {
    icon: <TrendingDown className="w-8 h-8 sm:w-10 md:w-12" />,
    title: "Inviertes en SEO y solo ves humo.",
    description: "Sigues sin aparecer, o peor, atrayendo al cliente equivocado. El ROI no llega.",
  },
  {
    icon: <Users className="w-8 h-8 sm:w-10 md:w-12 opacity-50" />,
    title: "Tus redes sociales son un desierto.",
    description: "Publicaciones sin interacción, likes que no pagan facturas y una comunidad inexistente.",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 sm:w-10 md:w-12" />,
    title: "Quemas dinero en publicidad que no convierte.",
    description: "Costes por clic por las nubes, resultados que se esfuman y la sensación de tirar billetes a una hoguera.",
  },
  {
    icon: <Zap className="w-8 h-8 sm:w-10 md:w-12" />,
    title: "Los 'embudos mágicos' no funcionan para ti.",
    description: "Te prometieron magia, pero la realidad es que la mayoría son un timo bien envuelto que no genera ventas.",
  },
  {
    icon: <Shield className="w-8 h-8 sm:w-10 md:w-12 opacity-60" />,
    title: "Tu marca es invisible o irrelevante.",
    description: "Un logo bonito no es suficiente. Si no te diferencias y no conectas, no vendes.",
  },
  {
    icon: <HelpCircle className="w-8 h-8 sm:w-10 md:w-12" />,
    title: "Tu competencia te está ganando la partida.",
    description: "Acciones de marketing aisladas que no suman, solo restan presupuesto y te dejan atrás.",
  }
];

const whyTrustUsData = [
  {
    icon: <Speaker className="w-7 h-7 sm:w-9 md:w-10 text-blue-600" />,
    title: "Hablamos tu idioma",
    description: "Beneficios. Euros. Clientes. Otros te marean con tecnicismos."
  },
  {
    icon: <Award className="w-7 h-7 sm:w-9 md:w-10 text-blue-600" />,
    title: "Tenemos un MÉTODO probado",
    description: "No vamos dando palos de ciego con la última moda."
  },
  {
    icon: <Star className="w-7 h-7 sm:w-9 md:w-10 text-blue-600" />,
    title: "Construimos tu MARCA",
    description: "Tu activo más valioso: para que no seas uno más del montón, sino LA opción."
  },
  {
    icon: <Brain className="w-7 h-7 sm:w-9 md:w-10 text-blue-600" />,
    title: "Estrategia digital para TU BOLSILLO",
    description: "Son herramientas, no el objetivo. El objetivo es que ganes más. Y si la IA puede automatizar tareas para que ahorres tiempo y costes, la usamos sin piedad."
  },
  {
    icon: <Zap className="w-7 h-7 sm:w-9 md:w-10 text-blue-600" />,
    title: "Automatización inteligente que LIBERA",
    description: "No solo ideas, también sistemas. Implementamos IA para que las tareas repetitivas se hagan solas, ahorrándote un porrón de horas y dinero."
  },
  {
    icon: <CheckCircle className="w-7 h-7 sm:w-9 md:w-10 text-blue-600" />,
    title: "Crecimiento sostenible",
    description: "Estrategias diseñadas para el largo plazo, asegurando que tu éxito no sea flor de un día, sino un jardín que florece constantemente."
  }
];

const blogPostsData = [
  {
    slug: "guia-seo-semantico-2025",
    title: "SEO semántico en 2025: la guía definitiva para dominar Google",
    category: "SEO Avanzado",
    date: "2025-05-15",
    excerpt: "Descubre cómo el SEO semántico está transformando la optimización y cómo puedes aplicarlo para obtener resultados superiores.",
    imageUnsplashId: "photo-1516245834210-c4c142787355" 
  },
  {
    slug: "ia-automatizacion-marketing-pymes",
    title: "IA y automatización: el dúo dinámico para PYMES que quieren crecer",
    category: "Inteligencia Artificial",
    date: "2025-05-28",
    excerpt: "Aprende a implementar herramientas de IA para automatizar tareas de marketing y ventas, liberando tiempo y optimizando recursos.",
    imageUnsplashId: "photo-1620712943543-bcc4688e7485" 
  }
];

const getUnsplashImageUrl = (photoId: string, width: number = 800, height: number = 400) => {
    return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=75&auto=format&fm=webp`;
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "AlvaroStrategy - Consultor SEO e Inteligencia Artificial",
  "description": "Transforma tu negocio con estrategia digital inteligente, SEO avanzado e IA práctica. Deja de quemar dinero y obtén resultados reales.",
  "url": "https://alvarostrategy.com/", 
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://alvarostrategy.com/" 
  },
  "telephone": "+34661542847",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenue du Hockey 1",
    "addressLocality": "Woluwe Saint Pierre",
    "addressRegion": "Bruselas",
    "postalCode": "1150",
    "addressCountry": "BE" 
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "image": "https://alvarostrategy.com/images/Alvaro%20Fernandez%20de%20Celis.webp",
  "priceRange": "$$$", 
  "potentialAction": {
    "@type": "ReserveAction", 
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://alvarostrategy.com/contacto", 
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/IOSPlatform",
        "http://schema.org/AndroidPlatform"
      ]
    },
    "name": "Agendar sesión estratégica gratuita"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de consultoría en SEO, IA y Estrategia Digital",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Estrategia Digital Integral para Negocios",
          "url": "https://alvarostrategy.com/servicios/estrategia-digital-integral" 
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Consultoría SEO Avanzada y Posicionamiento Web",
          "url": "https://alvarostrategy.com/servicios/consultoria-seo" 
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Consultoría en Inteligencia Artificial para Empresas",
          "url": "https://alvarostrategy.com/servicios/consultoria-ia" 
        }
      }
      // Eliminado Auditoría SEO Técnica y Diseño Web Crítico según instrucciones
    ]
  }
};

// --- COMPONENTES REUTILIZABLES ---
const ResultChart = memo(() => (
  <div className="bg-white/80 backdrop-blur-md p-3 xxs:p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/50 hover:shadow-2xl sm:hover:shadow-3xl transition-shadow duration-500">
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h3 className="text-md sm:text-xl lg:text-2xl font-bold text-gray-900">Resultados</h3>
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs sm:text-sm text-gray-600">En vivo</span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
        <defs>
          <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickMargin={5}/>
        <YAxis stroke="#6b7280" fontSize={12} tickMargin={5}/>
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            boxShadow: '0 4px 10px -3px rgba(0,0,0,0.1)',
            fontSize: '12px'
          }}
        />
        <Area type="monotone" dataKey="before" stroke="#f87171" fillOpacity={1} fill="url(#colorBefore)" strokeWidth={2} name="Antes" />
        <Area type="monotone" dataKey="after" stroke="#60a5fa" fillOpacity={1} fill="url(#colorAfter)" strokeWidth={2.5} name="Con Estrategia" />
      </AreaChart>
    </ResponsiveContainer>
    <div className="flex flex-wrap justify-between items-center mt-4 text-[9px] xxs:text-[10px] sm:text-xs">
      <div className="flex items-center mb-1 sm:mb-0"><div className="w-2.5 h-0.5 sm:w-3 bg-red-400 mr-1 sm:mr-1.5"></div><span className="text-gray-600">Marketing tradicional</span></div>
      <div className="flex items-center mb-1 sm:mb-0"><div className="w-2.5 h-0.5 sm:w-3 bg-blue-400 mr-1 sm:mr-1.5"></div><span className="text-gray-600">Con Estrategia</span></div>
      <div className="flex items-center"><div className="w-2.5 h-0.5 sm:w-3 bg-green-400 mr-1 sm:mr-1.5"></div><span className="text-gray-600">Proyección</span></div>
    </div>
  </div>
));
ResultChart.displayName = "ResultChart";

const MethodStep = memo(({ step, index, active, onClick }: {
  step: typeof interactiveSteps[0];
  index: number;
  active: boolean;
  onClick: (index: number) => void
}) => {
  return (
    <button
      onClick={() => onClick(index)}
      className={`
        px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg
        text-xs sm:text-sm md:text-base font-semibold tracking-tight
        transition-all duration-300 ease-in-out transform hover:scale-105
        focus:outline-none focus:ring-4 whitespace-nowrap
        ${active
          ? `${activeButtonThemeClasses[step.color]} shadow-xl ring-2 ring-offset-2 ring-offset-slate-50`
          : `bg-blue-50 text-blue-700 border-2 border-blue-300 hover:bg-blue-100 hover:border-blue-500 focus:ring-blue-300`}
      `}
      aria-label={`Paso ${index + 1}: ${step.title}`}
    >
      {step.title.toUpperCase()}
    </button>
  );
});
MethodStep.displayName = "MethodStep";


const Index = () => {
  const [activeMethodStep, setActiveMethodStep] = useState(0);
  const methodIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const startMethodCarousel = useCallback(() => {
    if (methodIntervalRef.current) {
      clearInterval(methodIntervalRef.current);
    }
    methodIntervalRef.current = setInterval(() => {
      setActiveMethodStep(prev => (prev + 1) % interactiveSteps.length);
    }, 7000);
  }, []);

  const handleMethodStepClick = useCallback((index: number) => {
    setActiveMethodStep(index);
    startMethodCarousel();
  }, [startMethodCarousel]);

  useEffect(() => {
    startMethodCarousel();
    return () => {
      if (methodIntervalRef.current) {
        clearInterval(methodIntervalRef.current);
      }
    };
  }, [startMethodCarousel]);

  const currentStep = useMemo(() => interactiveSteps[activeMethodStep], [activeMethodStep]);
  const currentStepClasses = useMemo(() => stepColorRelatedClasses[currentStep.color], [currentStep]);

  return (
    <>
      <Helmet>
        <title>AlvaroStrategy - Consultor SEO e Inteligencia Artificial</title>
        <meta name="description" content="Transforma tu negocio con estrategia digital inteligente, SEO avanzado e IA práctica. Deja de quemar dinero y obtén resultados reales." />
        <link rel="canonical" href="https://alvarostrategy.com/" /> 
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </Helmet>
      

      {/* ====== HERO SECTION ====== */}
      <section id="inicio" className="pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-24 lg:pb-24 relative bg-gradient-to-br from-slate-100 via-blue-50/30 to-indigo-100/20">
        <div className="absolute inset-0 opacity-30 sm:opacity-50">
          <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-60 h-60 sm:w-96 sm:h-96 bg-purple-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
          <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 order-1 lg:order-1 text-center sm:text-left overflow-hidden">
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-blue-600 bg-blue-100/70 px-4 py-2 rounded-lg inline-block shadow-sm"
              >
                Consultor SEO e inteligencia artificial
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight"
              >
                Deja de quemar billetes en marketing que no funciona.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="text-base sm:text-md lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed"
              >
                Entiendo tu frustración. Estás aquí porque buscas resultados reales: una marca que crezca y una cuenta bancaria que lo refleje. Olvídate de estrategias que no convierten y del marketing que solo quema tu dinero.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.1}}
                className="space-y-6 sm:space-y-3 mb-8 sm:mb-10 text-base sm:text-md lg:text-lg text-gray-600"
              >
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-3">
                  <Target className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mt-1 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold text-gray-700">Estrategias que SÍ convierten:</strong>
                    <p className="sm:inline"> transformamos tu inversión en beneficios tangibles.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-3">
                  <Rocket className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mt-1 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold text-gray-700">Una marca imparable:</strong>
                    <p className="sm:inline"> hacemos que destaques y te elijan por encima de tu competencia.</p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:space-x-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mt-1 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold text-gray-700">Claridad y resultados medibles:</strong>
                    <p className="sm:inline"> entenderás cada paso y verás el impacto real en tus números.</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col sm:flex-row justify-center sm:justify-start mt-6 sm:mt-10"
              >
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-100 w-full sm:w-auto"
                  onClick={() => navigate('/contacto', { state: { subject: "Solicitud de Sesión Estratégica Gratuita (Desde Hero)" } })}
                >
                  Agenda tu Sesión Estratégica Gratuita
                  <ArrowRight className="ml-2 w-5 h-5 sm:ml-2.5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative lg:col-span-2 order-2 lg:order-2 mx-auto w-full sm:max-w-md lg:max-w-none mt-10 lg:mt-0"
            >
              <ResultChart />
              <div className="absolute -top-1 right-1 xxs:-top-2 xxs:right-0 sm:-top-3 sm:-right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1 xxs:p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg animate-bounce">
                <div className="text-sm xxs:text-base sm:text-xl font-bold">+230%</div>
                <div className="text-[7px] xxs:text-[9px] sm:text-xs">ROI Promedio</div>
              </div>
              <div className="absolute -bottom-1 left-1 xxs:-bottom-2 xxs:left-0 sm:-bottom-2 sm:-left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1.5 xxs:p-2 sm:p-3 rounded-md sm:rounded-lg shadow-md animate-pulse-slow">
                <Clock className="w-3 h-3 xxs:w-4 xxs:h-4 sm:w-6 sm:h-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== "SI ESTÁS CANSADO DE..." (DOLORES DEL CLIENTE) SECTION ====== */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg shadow-lg cursor-default">
              ¿Te suena familiar?
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-black mb-5 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              Si estás cansado de...
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Consultores que no entregan, estrategias sin resultados tangibles, la complejidad del SEO y la IA que parece inalcanzable... Es hora de un cambio.
            </p>
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {problemsData.map((problem, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className="group p-6 sm:p-8 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-blue-400/60 flex flex-col h-full"
                >
                  <CardContent className="p-0 text-center flex flex-col flex-grow items-center">
                    <div className="flex justify-center mb-5 sm:mb-6 p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(problem.icon, {
                        className: `w-8 h-8 sm:w-10 text-white transition-colors duration-300 ${problem.icon.props.className?.replace(/text-\w+-\d+/g, '') || ''}`
                      })}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">
                      {problem.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* ====== "TE PRESENTO UN ENFOQUE DIFERENTE..." (TU PROPUESTA DE VALOR) ====== */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="text-center lg:text-left" variants={fadeInLeft}>
              <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-default self-center lg:self-start">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline-block" /> Jugamos en otra liga
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] xl:text-[3.5rem] font-black mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                No es arrogancia, es la pura verdad.
              </h2>
              <div className="space-y-5 text-gray-700 text-md sm:text-lg leading-relaxed">
                <p>
                  No nos dedicamos a hacer "un poquito de SEO por aqui" o "aplicar esta nueva IA de moda por allá". Eso es jugar a las casitas. <strong className="font-semibold text-blue-600">Nosotros implementamos una estrategia digital para tu marca, de verdad.</strong>.
                </p>
                <p>
                  Una que se traduce en una cosa muy simple: <strong className="font-semibold text-gray-800">más dinero en tu bolsillo y una marca que la gente reconoce y elige.</strong>
                </p>
              </div>
               <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  asChild
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-md transition-all"
                >
                  <Link to="/mi-metodo">
                    Explora Nuestro Método Probado
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-6 sm:space-y-8" variants={fadeInRight}>
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl text-white text-center lg:text-left transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex flex-col lg:flex-row items-center lg:space-x-5">
                  <div className="flex-shrink-0 p-3 bg-white/25 rounded-full mb-4 lg:mb-0 shadow-lg ring-2 ring-white/40 backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg sm:text-xl font-bold mb-1">Tu hoja de ruta al crecimiento</h4>
                    <p className="text-blue-100/90 text-sm sm:text-[0.9rem] max-w-md mx-auto lg:mx-0">
                      Construimos juntos tu camino hacia un éxito digital duradero y rentable, paso a paso.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====== MIS SERVICIOS PRINCIPALES (NUEVA SECCIÓN) ====== */}
      <section id="servicios-home" className="py-16 sm:py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg shadow-md">
              <Briefcase className="w-5 h-5 mr-2 inline-block" /> Soluciones a tu medida
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              Mis servicios principales
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Desde una estrategia digital completa hasta la optimización SEO más avanzada y la aplicación práctica de la IA.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { title: "Estrategia digital integral", description: "Con nuestro sistema como guía, diseñamos tu plan de acción completo para tu éxito online.", link: "/servicios/estrategia-digital-integral", icon: <Lightbulb /> },
              { title: "Consultoría SEO avanzada", description: "Posicionamiento web que atrae tráfico cualificado y convierte visitantes en clientes.", link: "/servicios/consultoria-seo", icon: <TrendingUp /> },
              { title: "Consultoría IA para negocios", description: "Aplicamos la inteligencia artificial para optimizar procesos, personalizar y potenciar tus resultados.", link: "/servicios/consultoria-ia", icon: <Brain /> },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full flex flex-col group hover:border-blue-500 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center text-blue-600 mb-3">
                      {React.cloneElement(service.icon, { className: "w-7 h-7 mr-3 group-hover:scale-110 transition-transform" })}
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-700">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">{service.description}</p>
                    <Button asChild variant="outline" className="mt-auto group/button border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white w-full font-semibold">
                      <Link to={service.link}>
                        Saber más
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Button asChild size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-bold rounded-lg shadow-md">
              <Link to="/servicios">
                Ver todos los servicios
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ====== METHODOLOGY SECTION (Nuestro sistema) ====== */}
      <section id="metodo" className="py-16 sm:py-20 lg:py-28 bg-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg shadow-md">
              🎯 Nuestra metodología probada
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              El mapa hacia una MARCA imparable.
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4 mb-8 sm:mb-10">
              Un sistema paso a paso para construir una marca imparable y rentable. Haz clic en cada fase para descubrir más:
            </p>
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {interactiveSteps.map((step, index) => (
              <MethodStep
                key={step.title + index}
                step={step}
                index={index}
                active={activeMethodStep === index}
                onClick={handleMethodStepClick}
              />
            ))}
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto min-h-[480px] sm:min-h-[500px] md:min-h-[450px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleUp}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMethodStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full z-10"
              >
                <div className={`bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-t-4 ${currentStepClasses.border}`}>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
                    <div className="order-2 md:order-1">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className={`p-1.5 sm:p-2 ${currentStepClasses.bgIcon} ${currentStepClasses.textIcon} rounded-lg mr-2 sm:mr-3 flex-shrink-0`}>
                          {React.cloneElement(currentStep.icon, {className: `w-5 h-5 sm:w-6 sm:h-6 ${currentStepClasses.textIcon}`})}
                        </div>
                        <div>
                          <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-800`}>{currentStep.title}</h3>
                          <p className={`text-sm sm:text-md md:text-lg font-semibold ${currentStepClasses.textSubtitle}`}>{currentStep.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-xs xxs:text-sm sm:text-sm md:text-base">
                        {currentStep.description}
                      </p>
                    </div>
                    <div className="order-1 md:order-2">
                      <img
                        loading="lazy"
                        decoding="async"
                        fetchPriority={activeMethodStep === 0 ? "high" : "low"}
                        width="500"
                        height="350"
                        src={getUnsplashImageUrl(currentStep.image, 500, 350)}
                        alt={currentStep.title}
                        className="w-full h-48 xxs:h-56 sm:h-64 md:h-[350px] object-cover rounded-lg sm:rounded-xl shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto mt-16 sm:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
              <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/70">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Resultados tangibles de nuestro sistema
                </h2>
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={resultsData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={13} dy={5} interval={0} />
                      <YAxis stroke="#6b7280" fontSize={13} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(5px)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          boxShadow: '0 5px 15px -5px rgba(0,0,0,0.1)',
                          fontSize: '14px',
                          padding: '10px 14px',
                        }}
                        cursor={{ fill: 'rgba(230, 240, 254, 0.6)' }}
                        itemStyle={{ fontWeight: 500 }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={55}>
                        {resultsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-3 sm:space-y-5 mt-6 lg:mt-0">
                    {resultsData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 sm:p-5 bg-gradient-to-r from-slate-100 via-blue-50/50 to-indigo-50/30 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center space-x-2.5 sm:space-x-4">
                          <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full shadow-inner flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                          <span className="font-semibold text-gray-800 text-sm sm:text-lg">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg sm:text-2xl font-bold text-gray-800">+{item.value}%</div>
                          <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </motion.div>
          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
              onClick={() => navigate('/contacto', { state: { subject: "Interesado en Estrategia Digital Integral" }})}
            >
              Quiero aplicar este sistema
              <ArrowRight className="ml-2 w-5 h-5 sm:ml-2.5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ====== WHY TRUST US SECTION ====== */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              La diferencia es simple, pero BRUTAL:
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-5 sm:mt-8"></div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {whyTrustUsData.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="bg-white p-5 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl sm:rounded-2xl border-t-4 border-blue-500 transform hover:-translate-y-1.5 h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col flex-grow items-center">
                    <div className="p-3 sm:p-4 bg-blue-100 rounded-full inline-block mb-4 sm:mb-6 ring-2 sm:ring-4 ring-blue-200/50">
                      {React.cloneElement(item.icon, {className: item.icon.props.className || "w-7 h-7 sm:w-9 md:w-10 text-blue-600"})}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base flex-grow">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== CONÓCEME (NUEVA SECCIÓN) ====== */}
      <section id="conoceme-home" className="py-16 sm:py-20 lg:py-28 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
             <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg shadow-md">
              <UserCircle className="w-5 h-5 mr-2 inline-block" /> El profesional detrás de la estrategia
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              Conóceme un poco mejor
            </h2>
          </motion.div>
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="md:col-span-1 flex justify-center">
              <img
                src="/images/Alvaro Fernandez de Celis.webp" 
                alt="Alvaro Fernandez de Celis - Consultor Estrategia Digital, SEO e IA"
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg border-4 border-blue-500"
                loading="lazy"
                width="192"
                height="192"
              />
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Soy Álvaro, y mi pasión es ayudar a negocios como el tuyo a no solo sobrevivir, sino a dominar su sector online. Con un enfoque práctico y una obsesión por los resultados medibles, combino diferentes estrategias de marketing digital para hacer que tu negocio crezca.
              </p>
              <Button asChild size="lg" className="group bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 font-bold rounded-lg shadow-md">
                <Link to="/quien-soy">
                  Más sobre mí y mi filosofía
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== DESDE NUESTRO BLOG (NUEVA SECCIÓN) ====== */}
      <section id="blog-home" className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg shadow-md">
              <BookOpen className="w-5 h-5 mr-2 inline-block" /> Ideas y estrategias
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent leading-tight">
              Desde nuestro blog
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Artículos con estrategias probadas, ideas que funcionan y un poco de "sin pelos en la lengua" para que tu negocio despegue.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {blogPostsData.slice(0,2).map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <Card className="h-full flex flex-col group hover:border-blue-500 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-xl overflow-hidden">
                  <Link to={`/blog/${post.slug}`} className="block" aria-label={`Leer más sobre ${post.title}`}>
                     <img
                        src={getUnsplashImageUrl(post.imageUnsplashId, 800, 400)}
                        alt={post.title} 
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width="800"
                        height="400"
                    />
                  </Link>
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700 text-xs self-start">{post.category}</Badge>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col pt-0">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{post.excerpt}</p>
                    <Button asChild variant="link" className="mt-auto text-blue-600 group/button self-start px-0 font-semibold">
                        <Link to={`/blog/${post.slug}`}>
                            Leer artículo
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
           <motion.div
            className="text-center mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Button asChild size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-bold rounded-lg shadow-md">
              <Link to="/blog">
                Visita nuestro blog completo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer is rendered by App.tsx */}
    </>
  );
};

export default Index;