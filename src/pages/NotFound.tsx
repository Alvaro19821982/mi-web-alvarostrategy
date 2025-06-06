import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Home,
    Compass,
    FileText,
    MessageSquare,
    AlertTriangle,
    Search,
    Lightbulb,
    // ArrowRight // No se usa directamente aquí
} from "lucide-react";
import { Input } from "@/components/ui/input"; 

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
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    console.error(
      `Error 404: El usuario intentó acceder a la ruta inexistente: ${location.pathname}${location.search}${location.hash}` // Corregido mayúscula y mensaje
    );
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `https://www.google.com/search?q=site:alvarostrategy.com+${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  const pageTitle = "Página no encontrada (error 404) | AlvaroStrategy"; // Corregido mayúscula
  const pageDescription = "¡Vaya! Parece que la página que buscas no existe o ha sido movida. No te preocupes, te ayudamos a encontrar lo que necesitas."; // Corregido mayúscula

  const mainPages = [
    { label: "Inicio", path: "/", icon: <Home className="w-5 h-5 mr-2" /> },
    { label: "Nuestro método", path: "/mi-metodo", icon: <Compass className="w-5 h-5 mr-2" /> },
    { label: "Servicios", path: "/servicios", icon: <Lightbulb className="w-5 h-5 mr-2" /> },
    { label: "Blog", path: "/blog", icon: <FileText className="w-5 h-5 mr-2" /> },
    { label: "Contacto", path: "/contacto", icon: <MessageSquare className="w-5 h-5 mr-2" /> },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex, nofollow" /> 
      </Helmet>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/30 to-indigo-100/20 text-gray-800 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/20 dark:text-slate-200 p-4 sm:p-6"
      >
        <motion.div
          variants={fadeInUp}
          className="text-center bg-white dark:bg-slate-800/70 p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl max-w-xl w-full"
        >
          <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500 dark:text-orange-400 mx-auto mb-6" />
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-slate-100 mb-3">
            ¡Vaya! Página no encontrada.
          </h2>
          <p className="text-gray-600 dark:text-slate-300 mb-8 text-md sm:text-lg leading-relaxed">
            Parece que la página a la que intentas acceder (`{location.pathname}`) no existe, ha sido movida o quizás hubo un pequeño error al escribir la URL. ¡No te preocupes, suele pasar!
          </p>

          <motion.div variants={fadeInUp} className="mb-8">
            <p className="text-gray-700 dark:text-slate-200 mb-3 font-semibold">¿Qué te gustaría hacer ahora?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainPages.map((page) => (
                <Button
                  key={page.label}
                  variant="outline"
                  className="group border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:text-blue-600 w-full justify-start text-left"
                  onClick={() => navigate(page.path)}
                >
                  {React.cloneElement(page.icon, { className: "w-5 h-5 mr-3 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform"})}
                  {page.label}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <p className="text-gray-700 dark:text-slate-200 mb-3 font-semibold">O intenta buscar en el sitio:</p>
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Ej: estrategia digital, SEO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
                aria-label="Buscar en el sitio"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                <Search className="w-5 h-5 mr-0 sm:mr-2" />
                <span className="hidden sm:inline">Buscar</span>
              </Button>
            </form>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Si crees que esto es un error o no encuentras lo que buscas, no dudes en <Link to="/contacto" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">contactarnos</Link>.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 text-center">
            <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                AlvaroStrategy
            </Badge>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;