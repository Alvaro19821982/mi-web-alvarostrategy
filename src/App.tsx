import React, { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Shadcn UI and other providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


// Iconos
import {
  ArrowRight, Menu, X, TrendingUp, Mail, Phone, Briefcase, Award, Send, BookOpen,
  Home, Cog, User, Lightbulb, SearchCheck, Cpu, BookUser,
  CheckSquare, DollarSign, Heart, Rocket, Users, FileText, Loader2 // Añadido Loader2 para el fallback
} from "lucide-react";

// --- PÁGINAS (Lazy Loaded) ---
const Index = lazy(() => import('./pages/index'));
const QuienSoy = lazy(() => import('./pages/quiensoy'));
const MiMetodo = lazy(() => import('./pages/mimetodo'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogCategoriaPage = lazy(() => import('./pages/BlogCategoriaPage'));
const BlogTagPage = lazy(() => import('./pages/BlogTagPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Servicios = lazy(() => import('./pages/Servicios'));
// const CasosDeExito = lazy(() => import('./pages/CasosDeExito')); // Comentado
const Contacto = lazy(() => import('./pages/Contacto'));
const EstrategiaDigitalIntegral = lazy(() => import('./pages/servicios/EstrategiaDigitalIntegral'));
const ConsultoriaSeo = lazy(() => import('./pages/servicios/ConsultoriaSeo'));
const ConsultoriaIa = lazy(() => import('./pages/servicios/ConsultoriaIa'));
// const Formacion = lazy(() => import('./pages/servicios/Formacion')); // Comentado
const ProductoMarca = lazy(() => import('./pages/mi-metodo/ProductoMarca'));
const Adquisicion = lazy(() => import('./pages/mi-metodo/Adquisicion'));
const Conversion = lazy(() => import('./pages/mi-metodo/Conversion'));
const Progresion = lazy(() => import('./pages/mi-metodo/Progresion'));
const Recurrencia = lazy(() => import('./pages/mi-metodo/Recurrencia'));
const Escalabilidad = lazy(() => import('./pages/mi-metodo/Escalabilidad'));
const AvisoLegal = lazy(() => import('./pages/legal/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/legal/PoliticaPrivacidad'));
const PoliticaCookies = lazy(() => import('./pages/legal/PoliticaCookies'));

// Import del ErrorBoundary
import ErrorBoundary from './components/ui/ErrorBoundary'; 

// Import del Banner de Cookies con React.lazy (ya estaba)
const CookieConsentBanner = lazy(() => import('./components/ui/CookieConsentBanner'));


const queryClient = new QueryClient();

// Un componente simple de fallback para Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
  </div>
);

interface NavItem {
  label: string;
  path: string;
  sectionId?: string;
  icon: React.ReactElement;
}

interface SubNavItem {
  title: string;
  href: string;
  description: string;
  icon: React.ReactElement;
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: React.ReactElement }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`
          }
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && React.cloneElement(icon, { className: "w-4 h-4 mr-2"})}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // location y navRef no se usan en este componente tal como está, pero los dejo por si los necesitas más adelante
  // const location = useLocation(); 
  const navRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);


  const handleNavigate = (path: string, sectionId?: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    setTimeout(() => {
      if (sectionId && path === '/') { 
        navigate(path, { state: { scrollTo: sectionId } });
      } else {
        navigate(path); 
      }
    }, mobileMenuOpen ? 100 : 0); 
  };

  const mainNavItems: NavItem[] = [
    { label: "Quién Soy", path: "/quien-soy", icon: <User className="w-5 h-5 mr-2" /> },
    { label: "Blog", path: "/blog", icon: <BookOpen className="w-5 h-5 mr-2" /> },
    { label: "Contacto", path: "/contacto", icon: <Mail className="w-5 h-5 mr-2" /> },
  ];

  const servicesSubItems: SubNavItem[] = [
    { title: "Estrategia Digital Integral", href: "/servicios/estrategia-digital-integral", description: "Plan maestro, SEO e IA para tu éxito.", icon: <Lightbulb /> },
    { title: "Consultoría SEO Avanzada", href: "/servicios/consultoria-seo", description: "Domina Google y multiplica tu tráfico cualificado.", icon: <SearchCheck /> },
    { title: "Consultoría IA para Negocios", href: "/servicios/consultoria-ia", description: "Optimiza, automatiza y crece con IA práctica.", icon: <Cpu /> },
  ];

  const methodSubItems: SubNavItem[] = [
    { title: "Fase P: Producto/Marca", href: "/mi-metodo/producto-marca", description: "Cimentando el éxito de tu estrategia.", icon: <SearchCheck/> },
    { title: "Fase A: Adquisición", href: "/mi-metodo/adquisicion", description: "Atracción inteligente de clientes.", icon: <Users/> },
    { title: "Fase C: Conversión", href: "/mi-metodo/conversion", description: "Transformando visitantes en clientes.", icon: <DollarSign/> },
    { title: "Fase P: Progresión", href: "/mi-metodo/progresion", description: "Maximizando el valor de cada cliente.", icon: <TrendingUp/> },
    { title: "Fase R: Recurrencia", href: "/mi-metodo/recurrencia", description: "Fidelizando para un crecimiento sostenido.", icon: <Heart/> },
    { title: "Fase E: Escalabilidad", href: "/mi-metodo/escalabilidad", description: "Creciendo con beneficios y sin morir.", icon: <Rocket/> },
  ];


  return (
    <nav ref={navRef} className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg border-b border-blue-800/50 sticky top-0 z-[1000] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center">
          <Link
            to="/"
            onClick={(e) => { e.preventDefault(); handleNavigate('/', 'inicio'); }}
            className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
            aria-label="AlvaroStrategy Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              AlvaroStrategy
            </div>
          </Link>

          <div className="flex-grow flex justify-center">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem className="group/menuitem relative">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}
                      className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-3 py-2 text-sm"
                    >
                      Inicio
                    </Link>
                  </NavigationMenuLink>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full"></span>
                </NavigationMenuItem>

                <NavigationMenuItem className="group/menuitem relative">
                  <NavigationMenuTrigger className="text-blue-100 hover:text-white bg-transparent hover:bg-blue-600/30 data-[active]:bg-blue-600/30 data-[state=open]:bg-blue-600/30 focus:bg-blue-600/30 font-medium text-sm px-3 py-2">
                    Servicios
                  </NavigationMenuTrigger>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full group-data-[state=open]/menuitem:w-full"></span>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50/50 via-slate-50 to-blue-100/70 p-6 no-underline outline-none focus:shadow-md hover:bg-blue-100/80"
                            to="/servicios"
                            onClick={(e) => { e.preventDefault(); handleNavigate("/servicios");}}
                          >
                            <Briefcase className="h-6 w-6 text-blue-600" />
                            <div className="mb-2 mt-4 text-lg font-medium text-gray-900">
                              Todos los servicios
                            </div>
                            <p className="text-sm leading-tight text-gray-700">
                              Descubre cómo podemos impulsar tu negocio con nuestra gama completa de soluciones.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {servicesSubItems.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon} onClick={(e) => { e.preventDefault(); handleNavigate(item.href);}}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem className="group/menuitem relative">
                  <NavigationMenuTrigger className="text-blue-100 hover:text-white bg-transparent hover:bg-blue-600/30 data-[active]:bg-blue-600/30 data-[state=open]:bg-blue-600/30 focus:bg-blue-600/30 font-medium text-sm px-3 py-2">
                    Nuestro método
                  </NavigationMenuTrigger>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full group-data-[state=open]/menuitem:w-full"></span>
                  <NavigationMenuContent>
                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                       <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-50/50 via-slate-50 to-indigo-100/70 p-6 no-underline outline-none focus:shadow-md hover:bg-indigo-100/80"
                            to="/mi-metodo"
                             onClick={(e) => { e.preventDefault(); handleNavigate("/mi-metodo");}}
                          >
                            <Cog className="h-6 w-6 text-indigo-600" />
                            <div className="mb-2 mt-4 text-lg font-medium text-gray-900">
                              Nuestro método probado
                            </div>
                            <p className="text-sm leading-tight text-gray-700">
                              Nuestra hoja de ruta paso a paso para el crecimiento sostenible de tu negocio.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {methodSubItems.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon} onClick={(e) => { e.preventDefault(); handleNavigate(item.href);}}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {mainNavItems.map((item) => (
                   <NavigationMenuItem key={item.label} className="group/menuitem relative">
                     <NavigationMenuLink asChild>
                      <Link
                        to={item.path}
                        onClick={(e) => { e.preventDefault(); handleNavigate(item.path, item.sectionId);}}
                        className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-3 py-2 text-sm"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                    <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full"></span>
                  </NavigationMenuItem>
                ))}

              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex items-center ml-auto flex-shrink-0">
            <div className="hidden lg:flex items-center">
              <Button
                  className="bg-white text-blue-700 hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-xs sm:text-sm font-semibold"
                  onClick={() => handleNavigate('/contacto')}
                >
                  Sesión Gratuita
              </Button>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-3"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-content"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu-content" className="lg:hidden mt-4 pt-4 pb-3 border-t border-blue-600/50 animate-fade-in-down bg-gradient-to-br from-blue-700 to-indigo-800 shadow-xl rounded-b-lg absolute w-full left-0 px-2 z-[999]">
            <div className="flex flex-col space-y-1">
                <Link
                  to="/"
                  className="text-blue-100 hover:text-white transition-colors font-medium px-3 py-3 rounded-md hover:bg-white/10 text-base flex items-center"
                  onClick={(e) => { e.preventDefault(); handleNavigate("/", "inicio");}}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Inicio
              </Link>

              <div className="text-blue-100 font-medium px-3 py-3 text-base flex items-center">
                <Briefcase className="w-5 h-5 mr-2"/> Servicios
              </div>
              {servicesSubItems.map(subItem => (
                 <Link key={`mobile-service-${subItem.title}`} to={subItem.href} className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(subItem.href);}}>
                   {React.cloneElement(subItem.icon, {className: "w-4 h-4 mr-2"})} {subItem.title}
                </Link>
              ))}
               <Link to="/servicios" className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm font-bold flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate("/servicios");}}>
                   Ver todos los servicios
                </Link>

              <div className="text-blue-100 font-medium px-3 py-2.5 text-base flex items-center mt-1">
                <Cog className="w-5 h-5 mr-2"/> Nuestro método
              </div>
              {methodSubItems.map(subItem => (
                 <Link key={`mobile-method-${subItem.title}`} to={subItem.href} className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(subItem.href);}}>
                    {React.cloneElement(subItem.icon, {className: "w-4 h-4 mr-2"})} {subItem.title}
                </Link>
              ))}
               <Link to="/mi-metodo" className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm font-bold flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate("/mi-metodo");}}>
                   Visión general del método
                </Link>

              {mainNavItems.map((item) => (
                <Link
                  key={`mobile-main-${item.label}`}
                  to={item.path}
                  className="text-blue-100 hover:text-white transition-colors font-medium px-3 py-3 rounded-md hover:bg-white/10 text-base flex items-center"
                  onClick={(e) => { e.preventDefault(); handleNavigate(item.path, item.sectionId);}}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              <Button
                className="w-full mt-4 bg-white text-blue-700 hover:bg-gray-200 px-6 py-3.5 rounded-full transition-all duration-300 shadow-md text-base font-semibold flex items-center justify-center"
                onClick={() => handleNavigate('/contacto')}
              >
                <Send className="w-4 h-4 mr-2" />
                Sesión Gratuita
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  // location no se usa aquí, pero lo dejo por si acaso
  // const location = useLocation(); 

  const handleFooterNavigate = (path: string, sectionId?: string) => {
    if (sectionId && path === '/') {
        navigate(path, { state: { scrollTo: sectionId } });
    } else {
        navigate(path);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/5 to-indigo-900/5 opacity-60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12 text-center md:text-left">
          <div className="lg:col-span-2">
            <div
              onClick={() => handleFooterNavigate('/', 'inicio')}
              className="inline-flex items-center justify-center md:justify-start space-x-2.5 sm:space-x-3 mb-4 sm:mb-5 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                AlvaroStrategy
              </div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 px-4 md:px-0">
              Tu partner en estrategia digital integral para crecer de verdad. Construimos marcas que venden, conectan y dominan su sector.
            </p>
            <div className="flex space-x-3 justify-center md:justify-start">
              <a href="mailto:alvaro@ignovadigital.com" aria-label="Enviar email" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800/70 rounded-lg flex items-center justify-center hover:bg-blue-600/50 transition-colors group">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-white transition-colors" />
              </a>
              <a href="tel:+34661542847" aria-label="Llamar por teléfono" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800/70 rounded-lg flex items-center justify-center hover:bg-blue-600/50 transition-colors group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold mb-3 sm:mb-4 text-md sm:text-lg text-gray-200">Navegación</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><Link to="/servicios" onClick={() => handleFooterNavigate('/servicios')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />Servicios</Link></li>
              <li><Link to="/mi-metodo" onClick={() => handleFooterNavigate('/mi-metodo')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />Nuestro método</Link></li>
              <li><Link to="/quien-soy" onClick={() => handleFooterNavigate('/quien-soy')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />Quién Soy</Link></li>
            </ul>
          </div>
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold mb-3 sm:mb-4 text-md sm:text-lg text-gray-200">Recursos y Legal</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><Link to="/blog" onClick={() => handleFooterNavigate('/blog')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />Blog</Link></li>
              <li><Link to="/contacto" onClick={() => handleFooterNavigate('/contacto')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />Contacto</Link></li>
              <li className="pt-2 mt-2 border-t border-gray-700/30"><Link to="/aviso-legal" onClick={() => handleFooterNavigate('/aviso-legal')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><FileText className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-blue-300 transition-colors" />Aviso Legal</Link></li>
              <li><Link to="/politica-privacidad" onClick={() => handleFooterNavigate('/politica-privacidad')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><FileText className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-blue-300 transition-colors" />Política de Privacidad</Link></li>
              <li><Link to="/politica-cookies" onClick={() => handleFooterNavigate('/politica-cookies')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><FileText className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-blue-300 transition-colors" />Política de Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700/60 pt-6 sm:pt-10 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {currentYear} AlvaroStrategy.com. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ScrollToSectionOnLoad = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const elementId = location.state.scrollTo;
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const { scrollTo, ...restOfState } = location.state || {};
          navigate(location.pathname + location.search + location.hash, {
            replace: true,
            state: Object.keys(restOfState).length > 0 ? restOfState : undefined
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (!location.hash) { 
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash, location.state, navigate]); // location.state y navigate también son dependencias

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <>
        <ScrollToSectionOnLoad />
        <Navigation />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/mi-metodo" element={<MiMetodo />} />
              <Route path="/quien-soy" element={<QuienSoy />} />
              <Route path="/contacto" element={<Contacto />} />
              
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/categoria/:categoriaSlug" element={<BlogCategoriaPage />} />
              <Route path="/blog/tag/:tagSlug" element={<BlogTagPage />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              <Route path="/servicios/estrategia-digital-integral" element={<EstrategiaDigitalIntegral />} />
              <Route path="/servicios/consultoria-seo" element={<ConsultoriaSeo />} />
              <Route path="/servicios/consultoria-ia" element={<ConsultoriaIa />} />
              
              <Route path="/mi-metodo/producto-marca" element={<ProductoMarca />} />
              <Route path="/mi-metodo/adquisicion" element={<Adquisicion />} />
              <Route path="/mi-metodo/conversion" element={<Conversion />} />
              <Route path="/mi-metodo/progresion" element={<Progresion />} />
              <Route path="/mi-metodo/recurrencia" element={<Recurrencia />} />
              <Route path="/mi-metodo/escalabilidad" element={<Escalabilidad />} />

              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/politica-cookies" element={<PoliticaCookies />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ErrorBoundary fallback={null}> {/* Puedes poner un fallback más elaborado si quieres */}
          <Suspense fallback={null}> {/* Fallback para el banner de cookies si tarda */}
            <CookieConsentBanner />
          </Suspense>
        </ErrorBoundary>
      </>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;