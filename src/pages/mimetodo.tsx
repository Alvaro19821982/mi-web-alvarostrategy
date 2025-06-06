import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft, 
  Zap,
  Target,
  DollarSign,
  TrendingUp,
  Heart,
  Rocket,
  SearchCheck,
  BarChart3,
  Home as HomeIcon, 
  Briefcase,        
  Award,
  Lightbulb, 
  BookOpen as BlogIconFile, 
  UserCircle as QuienSoyIcon 
} from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Helmet } from 'react-helmet-async';
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
const gentleFadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 }, 
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
};

// --- DATOS DE LA PÁGINA "MI MÉTODO" ---
const metodoFases = [ // Renombrado de metodoPacprePasos a metodoFases
  {
    letra: "P",
    titulo: "PRODUCTO / MARCA",
    subtitulo: "La radiografía sin anestesia que necesitas.",
    descripcionCorta: "Análisis profundo de tu negocio, mercado y audiencia para definir tu propuesta de valor única y tu métrica norte.",
    icono: <SearchCheck className="w-8 h-8 sm:w-10" />,
    colorBase: "blue-600",
    textColorClass: "text-blue-600", 
    bgColorClass: "bg-blue-600",    
    hoverBgColorClass: "hover:bg-blue-700",
    borderColorClass: "border-blue-600",
    path: "/mi-metodo/producto-marca",
    mainKeyword: "Análisis de producto y estrategia de marca"
  },
  {
    letra: "A",
    titulo: "ADQUISICIÓN",
    subtitulo: "Atraer clientes que pagan, no mirones.",
    descripcionCorta: "Implementación de SEO multiplataforma, marketing de contenidos estratégico y IA para construir tu audiencia cualificada.",
    icono: <Target className="w-8 h-8 sm:w-10" />,
    colorBase: "indigo-600",
    textColorClass: "text-indigo-600",
    bgColorClass: "bg-indigo-600",
    hoverBgColorClass: "hover:bg-indigo-700",
    borderColorClass: "border-indigo-600",
    path: "/mi-metodo/adquisicion",
    mainKeyword: "Estrategias de adquisición de clientes"
  },
  {
    letra: "C",
    titulo: "CONVERSIÓN",
    subtitulo: "Que cada visita valga su peso en oro.",
    descripcionCorta: "Optimización de la tasa de conversión (CRO), mejora de UX/UI enfocado a ventas y copywriting persuasivo.",
    icono: <DollarSign className="w-8 h-8 sm:w-10" />,
    colorBase: "purple-600",
    textColorClass: "text-purple-600",
    bgColorClass: "bg-purple-600",
    hoverBgColorClass: "hover:bg-purple-700",
    borderColorClass: "border-purple-600",
    path: "/mi-metodo/conversion",
    mainKeyword: "Optimización de conversiones y experiencia de usuario"
  },
  {
    letra: "P",
    titulo: "PROGRESIÓN",
    subtitulo: "Más pasta por cada cliente. Simple.",
    descripcionCorta: "Estrategias efectivas de upselling, cross-selling y optimización del valor medio del pedido (AOV) para maximizar ingresos.",
    icono: <TrendingUp className="w-8 h-8 sm:w-10" />,
    colorBase: "pink-600",
    textColorClass: "text-pink-600",
    bgColorClass: "bg-pink-600",
    hoverBgColorClass: "hover:bg-pink-700",
    borderColorClass: "border-pink-600",
    path: "/mi-metodo/progresion",
    mainKeyword: "Aumento del ticket medio y valor del cliente"
  },
  {
    letra: "R",
    titulo: "RECURRENCIA",
    subtitulo: "El tesoro escondido: que vuelvan sin que les persigas.",
    descripcionCorta: "Diseño de programas de lealtad, email marketing automatizado que fideliza y estrategias para potenciar el customer lifetime value (CLTV).",
    icono: <Heart className="w-8 h-8 sm:w-10" />,
    colorBase: "red-600",
    textColorClass: "text-red-600",
    bgColorClass: "bg-red-600",
    hoverBgColorClass: "hover:bg-red-700",
    borderColorClass: "border-red-600",
    path: "/mi-metodo/recurrencia",
    mainKeyword: "Fidelización de clientes y marketing de retención"
  },
  {
    letra: "E",
    titulo: "ESCALABILIDAD",
    subtitulo: "Crecer con cabeza (y con beneficios).",
    descripcionCorta: "Implementación de sistemas, automatización inteligente con IA y análisis de datos para un crecimiento empresarial sólido y sostenible.",
    icono: <Rocket className="w-8 h-8 sm:w-10" />,
    colorBase: "orange-600",
    textColorClass: "text-orange-600",
    bgColorClass: "bg-orange-600",
    hoverBgColorClass: "hover:bg-orange-700",
    borderColorClass: "border-orange-600",
    path: "/mi-metodo/escalabilidad",
    mainKeyword: "Estrategias de escalabilidad y automatización de negocios"
  }
];

const preFooterLinksMethod = [
    { label: "Nuestros servicios detallados", href: "/servicios", icon: <Briefcase className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />, description: "Explora cómo aplicamos nuestro método en cada servicio." },
    { label: "Conoce a Álvaro", href: "/quien-soy", icon: <QuienSoyIcon className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />, description: "El profesional y la filosofía detrás de AlvaroStrategy." },
    { label: "Artículos de estrategia en el blog", href: "/blog", icon: <BlogIconFile className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />, description: "Profundiza en tácticas y conceptos clave de nuestra estrategia." },
];

const MiMetodo = () => {
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate('/contacto', { state: { subject: "Interesado en aplicar nuestro método" } });
  };

  const viewportSettings = { once: true, amount: 0.15 }; 

  const pageUrl = "https://alvarostrategy.com/mi-metodo"; 
  const pageTitle = "Nuestro método: tu hoja de ruta para el crecimiento digital sostenible";
  const pageDescription = "Descubre nuestro sistema de estrategia digital integral (producto/marca, adquisición, conversión, progresión, recurrencia, escalabilidad) diseñado para transformar tu negocio online.";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "inLanguage": "es-ES",
    "publisher": {
        "@type": "Organization",
        "name": "AlvaroStrategy",
        "logo": {
          "@type": "ImageObject",
          "url": "https://alvarostrategy.com/images/Alvaro%20Fernandez%20de%20Celis.webp" 
        }
      },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://alvarostrategy.com/" }, 
        { "@type": "ListItem", "position": 2, "name": "Nuestro método" }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Fases de nuestra estrategia digital",
      "description": "Cada fase de nuestra estrategia aborda un aspecto crucial para el crecimiento de tu negocio online, desde el análisis de producto y marca hasta la escalabilidad operativa y financiera.",
      "itemListElement": metodoFases.map((paso, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage", 
          "url": `https://alvarostrategy.com${paso.path}`, 
          "name": `Fase ${paso.letra}: ${paso.titulo} - Estrategia digital de AlvaroStrategy`,
          "description": paso.descripcionCorta + (paso.mainKeyword ? ` Se enfoca en ${paso.mainKeyword}.` : ""),
        }
      }))
    },
    "significantLink": metodoFases.map(paso => `https://alvarostrategy.com${paso.path}`).concat(["https://alvarostrategy.com/servicios"])
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
        <meta property="og:image" content="https://alvarostrategy.com/images/og-image-mi-metodo.webp" /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} | AlvaroStrategy`} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://alvarostrategy.com/images/twitter-image-mi-metodo.webp" /> 
        <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
        </script>
    </Helmet>
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        
        <motion.div variants={gentleFadeIn} className="mb-6 sm:mb-8">
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
                  <BreadcrumbPage className="font-medium text-gray-700 dark:text-slate-200">Nuestro método</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

        <motion.header
          variants={gentleFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
            <Zap className="w-5 h-5 mr-2 inline-block" /> Tu hoja de ruta probada al éxito
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-5 sm:mb-6">
            Nuestro método de estrategia digital
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Basta de estrategias de humo y tácticas sueltas. Esto no es magia, es un <strong className="font-semibold text-gray-700 dark:text-slate-100">sistema probado paso a paso</strong> para que tu negocio no solo sobreviva, sino que <strong className="text-blue-600 dark:text-blue-400">ARRASA en el entorno digital</strong>. Descubre cómo transformar tu negocio, fase por fase:
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
        </motion.header>

        <motion.section
          variants={gentleFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mb-12 md:mb-16 lg:mb-20 px-0 sm:px-2"
        >
          <Card className="bg-white dark:bg-slate-800/70 shadow-2xl border-t-4 border-blue-600 dark:border-blue-500 rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-800 p-6 sm:p-8">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-blue-600 dark:text-blue-400" />
                ¿Por qué un método y no "probar cosas al azar"?
              </CardTitle>
              <CardDescription className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mt-2">
                Porque "probar cosas" es lo que hace el 99% y así les va. El marketing digital tradicional está <strong className="text-red-600 dark:text-red-400">ROTO</strong>. Se enfocan en métricas de vanidad (likes, visitas vacías) y se olvidan de lo único que importa: <strong className="text-gray-800 dark:text-slate-100">BENEFICIO REAL Y UNA MARCA SÓLIDA</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 text-md sm:text-lg text-gray-700 dark:text-slate-300 space-y-5 leading-relaxed">
              <p>
                Te venden la moto con la última IA milagrosa, el reel viral de moda o el "embudo infalible" que solo funciona en la demo. La realidad es que sin una <strong className="font-semibold text-gray-800 dark:text-slate-100">ESTRATEGIA DIGITAL INTEGRAL</strong> sólida detrás, estás jugando a la lotería con tu presupuesto y tu tiempo.
              </p>
              <p>
                Nuestro método (Análisis de <strong className="text-blue-600 dark:text-blue-400">P</strong>roducto/Marca, Estrategias de <strong className="text-indigo-600 dark:text-indigo-400">A</strong>dquisición, Optimización de la <strong className="text-purple-600 dark:text-purple-400">C</strong>onversión, Planes de <strong className="text-pink-600 dark:text-pink-400">P</strong>rogresión de cliente, Fomento de la <strong className="text-red-600 dark:text-red-400">R</strong>ecurrencia y Diseño para la <strong className="text-orange-600 dark:text-orange-400">E</strong>scalabilidad) no es una ocurrencia. Nace de la <strong className="font-semibold text-gray-800 dark:text-slate-100">obsesión por el impacto real en el negocio</strong> y de años de experiencia destilando qué funciona y qué es puro humo.
              </p>
              <p>
                Esto es como un juego, sí, pero <strong className="font-semibold text-gray-800 dark:text-slate-100">THE ONLINE BUSINESS GAME</strong>. Y en este juego, el orden de los factores SÍ altera el producto final. Hay que saber dónde golpear primero y cómo cada fase del sistema alimenta a la siguiente para un crecimiento exponencial y sostenible.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }} 
            className="mb-16 md:mb-20 lg:mb-24"
        >
            <motion.h2
                variants={gentleFadeIn}
                className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16"
            >
                Desglose de cada fase de nuestra <span className={`bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent`}>estrategia</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {metodoFases.map((paso) => (
                    <motion.div key={paso.titulo} variants={gentleFadeIn} className="h-full">
                        <Card className={cn(
                            "group bg-white dark:bg-slate-800/70 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border-t-4 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5",
                            paso.borderColorClass 
                        )}>
                            <CardHeader className="p-6 items-center text-center">
                                <div className={cn(
                                    "inline-flex p-3 sm:p-4 rounded-full mb-4 group-hover:scale-110 transition-transform",
                                    `${paso.bgColorClass.replace('bg-', 'bg-opacity-10 dark:bg-opacity-20').replace('-600', '-100 dark:bg-slate-700')}` 
                                )}>
                                  {React.cloneElement(paso.icono, {className: cn(paso.icono.props.className, paso.textColorClass)})}
                                </div>
                                <CardTitle className={cn("text-xl sm:text-2xl font-black", paso.textColorClass)}>
                                    <span className="text-4xl sm:text-5xl block mb-1">{paso.letra}</span>
                                    {paso.titulo}
                                </CardTitle>
                                <p className={`text-sm sm:text-md font-semibold text-gray-500 dark:text-slate-400 mt-1`}>{paso.subtitulo}</p>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 flex-grow flex flex-col text-center">
                                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                                    {paso.descripcionCorta} <span className="font-medium">{paso.mainKeyword && `(Clave: ${paso.mainKeyword})`}</span>
                                </p>
                                <div className="mt-auto">
                                    <Button asChild className={cn(
                                        "group/button w-full font-semibold text-white transition-all duration-300",
                                        paso.bgColorClass,
                                        paso.hoverBgColorClass
                                    )}>
                                        <Link to={paso.path} aria-label={`Profundizar en la fase ${paso.letra}: ${paso.titulo}`}>
                                            Explorar fase {paso.letra}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.section>

        
        <motion.section
            variants={gentleFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="my-16 md:my-20 lg:my-24"
        >
             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12">
                Explora otras áreas esenciales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
              { preFooterLinksMethod.map(item => (
                <motion.div variants={gentleFadeIn} key={item.href}>
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
              
               <motion.div variants={gentleFadeIn}>
                 <Card className="h-full group bg-white dark:bg-slate-800/50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 items-center text-center transform hover:-translate-y-1">
                    <Award className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-semibold text-lg text-gray-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      Casos de éxito con esta estrategia
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 flex-grow">Descubre los resultados que hemos logrado (sección próximamente).</p>
                    <Button asChild variant="outline" className="mt-auto group/button border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 hover:text-purple-600 dark:hover:text-purple-400">
                        <Link to="/"> 
                            Volver al inicio
                            <HomeIcon className="ml-2 w-4 h-4 group-hover/button:animate-pulse" />
                        </Link>
                    </Button>
                  </Card>
                </motion.div>
            </div>
        </motion.section>


        <motion.section
          variants={gentleFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="text-center mt-12 md:mt-16 lg:mt-20 py-10 sm:py-12 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 dark:from-slate-800 dark:via-gray-800/80 dark:to-slate-900 rounded-2xl shadow-xl" 
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            ¿Listo para implementar nuestra estrategia en tu negocio?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Nuestra estrategia no es para los que buscan atajos ni soluciones mágicas. Es para los que están <strong className="font-semibold text-blue-600 dark:text-blue-400">decididos a construir un negocio rentable y una marca que DE VERDAD destaque</strong> y perdure.
          </p>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 w-full sm:w-auto"
            onClick={navigateToContact}
            aria-label="Contactar para implementar el nuestro método."
          >
            Hablemos de tu estrategia digital integral
            <ArrowRight className="ml-2.5 w-6 h-6 sm:ml-3 sm:w-7 sm:h-7 group-hover:translate-x-1.5 transition-transform" />
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 italic">
            PD: Si buscas lo mismo de siempre, te deseo suerte. La vas a necesitar. Aquí, buscamos resultados.
          </p>
        </motion.section>

      </motion.div>
    </div>
    </>
  );
};

export default MiMetodo;