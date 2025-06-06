// src/pages/CasosDeExitoPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Award, Star, TrendingUp, CheckCircle, Briefcase } from "lucide-react";

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

interface CaseStudyItem {
  slug: string; // Para la URL
  clientTypeOrLogo: string; // Podría ser el nombre del tipo de cliente si no hay logo, o la URL del logo
  isLogoUrl?: boolean; // True si clientTypeOrLogo es una URL de imagen
  title: string;
  metrics: {
    before: string;
    after: string;
    improvement: string; // Ej: "+150%"
    label: string; // Ej: "Ventas Online"
  }[];
  servicesUsed: string[]; // Ej: ["SEO Avanzado", "Método P.A.C.P.R.E."]
  testimonialQuote?: string; // Opcional: una cita corta del testimonio
  imageUnsplashId: string; // ID de la imagen de Unsplash para el caso
}

// DATOS DE EJEMPLO - REEMPLAZAR CON TUS CASOS REALES
const caseStudiesData: CaseStudyItem[] = [
  {
    slug: "aumento-ventas-ecommerce-moda",
    clientTypeOrLogo: "E-commerce de Moda",
    title: "Aumento del 156% en Ventas para E-commerce de Moda con Método P.A.C.P.R.E.",
    metrics: [
      { before: "2.500€/mes", after: "6.400€/mes", improvement: "+156%", label: "Ingresos" },
      { before: "1.2%", after: "3.1%", improvement: "+158%", label: "Tasa Conversión" },
    ],
    servicesUsed: ["Estrategia Digital Integral", "SEO Avanzado"],
    testimonialQuote: "Transformaron nuestro negocio. Los resultados hablan por sí solos.",
    imageUnsplashId: "photo-1523275335684-37898b6baf30" // Imagen genérica de producto
  },
  {
    slug: "liderazgo-seo-consultora-b2b",
    clientTypeOrLogo: "Consultora Tecnológica B2B",
    title: "Liderazgo SEO y Generación de Leads Cualificados para Consultora B2B",
     metrics: [
      { before: "N/A", after: "+350%", improvement: "+350%", label: "Tráfico Orgánico" },
      { before: "5/mes", after: "25/mes", improvement: "+400%", label: "Leads Cualificados" },
    ],
    servicesUsed: ["Consultoría SEO", "Marketing de Contenidos"],
    imageUnsplashId: "photo-1556761175-5973dc0f32e7" // Imagen de oficina moderna
  },
  {
    slug: "optimización-ia-saas",
    clientTypeOrLogo: "Empresa SaaS",
    title: "Optimización de Procesos con IA Reduce Costes en un 30% para Empresa SaaS",
    metrics: [
      { before: "N/A", after: "-30%", improvement: "-30%", label: "Costes Operativos" },
      { before: "4h/día", after: "30min/día", improvement: "-87%", label: "Tiempo Tareas Manuales" },
    ],
    servicesUsed: ["Consultoría IA", "Automatización"],
    testimonialQuote: "La implementación de IA ha sido un antes y un después en nuestra eficiencia.",
    imageUnsplashId: "photo-1504384308090-c894fdcc538d" // Imagen tecnológica/abstracta
  }
];

const getUnsplashImageUrl = (photoId: string, width: number = 400, height: number = 220) => {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=75`;
};

const CaseStudyCard: React.FC<{ caseStudy: CaseStudyItem }> = ({ caseStudy }) => {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Card className="group bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5">
        <Link to={`/casos-de-exito/${caseStudy.slug}`} className="block">
          <img
            src={getUnsplashImageUrl(caseStudy.imageUnsplashId)}
            alt={`Caso de éxito: ${caseStudy.title}`}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <CardHeader className="p-5 sm:p-6">
          {caseStudy.isLogoUrl ? (
            <img src={caseStudy.clientTypeOrLogo} alt="Logo del cliente" className="h-8 mb-3" />
          ) : (
            <p className="text-sm font-semibold text-blue-600 mb-1">{caseStudy.clientTypeOrLogo}</p>
          )}
          <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
            <Link to={`/casos-de-exito/${caseStudy.slug}`}>
              {caseStudy.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 pt-0 flex-grow flex flex-col">
          <div className="space-y-3 mb-4">
            {caseStudy.metrics.map(metric => (
              <div key={metric.label} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{metric.label}:</span>
                <span className="font-bold text-gray-700">{metric.improvement}</span>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1.5">Servicios Clave:</h4>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.servicesUsed.map(service => (
                <Badge key={service} variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          {caseStudy.testimonialQuote && (
             <blockquote className="text-xs italic text-gray-500 border-l-2 border-blue-500 pl-3 mb-5">
              "{caseStudy.testimonialQuote}"
            </blockquote>
          )}
          <div className="mt-auto">
            <Button asChild variant="outline" className="group w-full sm:w-auto font-semibold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
              <Link to={`/casos-de-exito/${caseStudy.slug}`}>
                Leer Caso Completo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CasosDeExitoPage = () => {
  const navigate = useNavigate();

   const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Casos de Éxito - Resultados Reales con AlvaroStrategy",
    "description": "Descubre cómo hemos ayudado a negocios como el tuyo a alcanzar resultados tangibles con nuestras estrategias de SEO, IA y marketing digital.",
    "url": "https://alvarostrategy.com/casos-de-exito",
     "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://alvarostrategy.com/" },
        { "@type": "ListItem", "position": 2, "name": "Casos de Éxito" }
      ]
    },
    // ItemList para los casos de éxito (versión resumida)
    // Los detalles completos irían en el schema de cada página de caso individual
    "mainEntity": {
        "@type": "ItemList",
        "name": "Proyectos Destacados",
        "itemListElement": caseStudiesData.map((cs, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": { // Podría ser CreativeWork o Article (tipo Report)
                "@type": "Article", 
                "headline": cs.title,
                "url": `https://alvarostrategy.com/casos-de-exito/${cs.slug}`,
                 // "image": getUnsplashImageUrl(cs.imageUnsplashId, 1200, 630), // Opcional: imagen principal
                // "provider": { "@type": "Organization", "name": "AlvaroStrategy" }
            }
        }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Casos de Éxito: Resultados Comprobados - AlvaroStrategy</title>
        <meta name="description" content="Explora nuestros casos de éxito y comprueba cómo hemos ayudado a empresas a crecer con estrategias de SEO, IA y marketing digital efectivas." />
        <link rel="canonical" href="https://alvarostrategy.com/casos-de-exito" />
         <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 text-gray-800 py-16 sm:py-20 lg:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-4 sm:px-6"
        >
          {/* --- ENCABEZADO --- */}
          <motion.header
            variants={fadeInUp}
            className="text-center mb-12 md:mb-20"
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <Award className="w-5 h-5 mr-2 inline-block" /> Resultados que Inspiran
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-emerald-700 to-green-700 bg-clip-text text-transparent leading-tight mb-4">
              Resultados Reales: Así Hemos Ayudado a Negocios Como el Tuyo
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              No creemos en las promesas vacías. Creemos en los datos, en el crecimiento medible y en la transformación tangible de los negocios con los que colaboramos. Explora nuestros éxitos.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto mt-8 rounded-full"></div>
          </motion.header>

          {/* --- FILTROS (Placeholder - Implementación futura si es necesaria) --- */}
          {/* 
          <motion.div variants={fadeInUp} className="mb-10 md:mb-12 flex flex-wrap gap-3 justify-center">
            <Button variant="outline" className="bg-white">Todos</Button>
            <Button variant="outline" className="bg-white">Por Sector</Button>
            <Button variant="outline" className="bg-white">Por Servicio</Button>
            <Button variant="outline" className="bg-white">Por Problema Resuelto</Button>
          </motion.div>
          */}

          {/* --- GRID DE CASOS DE ÉXITO --- */}
          {caseStudiesData.length > 0 ? (
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }} // Trigger when a small part is visible
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 md:mb-24"
            >
              {caseStudiesData.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </motion.section>
          ) : (
            <motion.p variants={fadeInUp} className="text-center text-lg text-gray-600 py-12">
              Estamos preparando nuestros casos de éxito más recientes. ¡Vuelve pronto para ver resultados increíbles!
            </motion.p>
          )}
          

          {/* --- TESTIMONIOS DESTACADOS (Placeholder - Podrías usar el mismo componente de la home) --- */}
          {/*
          <motion.section 
            variants={fadeInUp} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="py-12 border-t border-b border-gray-200/70"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10 md:mb-16">
              Testimonios que <span className="text-emerald-600">Avalan Nuestro Trabajo</span>
            </h2>
            <div className="text-center text-gray-500">(Sección de testimonios destacados aquí)</div>
          </motion.section>
          */}

          {/* --- CTA FINAL --- */}
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mt-12 md:mt-20"
          >
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-emerald-500" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-5">
              ¿Quieres ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
              Si estás listo para llevar tu negocio al siguiente nivel y obtener resultados como estos, es el momento de hablar.
            </p>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              onClick={() => navigate('/contacto', { state: { subject: "Interesado en ser un Caso de Éxito" } })}
            >
              Hablemos de tu Proyecto
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </motion.section>

        </motion.div>
      </div>
    </>
  );
};

export default CasosDeExitoPage;