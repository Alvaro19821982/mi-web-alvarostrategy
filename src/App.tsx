// src/App.tsx (Código completo con la corrección de scroll lateral)
import React, { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams, Outlet, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { supportedLngs } from './i18n';
import { routesConfig } from './routes';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ArrowRight, Menu, X, TrendingUp, Mail, Phone, Briefcase, Award, Send, BookOpen, Home, Cog, User, Lightbulb, SearchCheck, Cpu, Users, DollarSign, Heart, Rocket, FileText, Loader2 } from "lucide-react";
import ErrorBoundary from './components/ui/ErrorBoundary';
import { AlternateLinksProvider } from './context/AlternateLinksContext';
import ScrollToTopButton from './components/ui/ScrollToTopButton'; 

const Index = lazy(() => import('./pages/index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CookieConsentBanner = lazy(() => import('./components/ui/CookieConsentBanner'));

const queryClient = new QueryClient();
const GA_MEASUREMENT_ID = "G-KF8SBMFJMQ";
const CLARITY_PROJECT_ID = "rwqvg37hja";

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
  </div>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: React.ReactElement }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`} {...props}>
          <div className="flex items-center text-sm font-medium leading-none">
            {icon && React.cloneElement(icon, { className: "w-4 h-4 mr-2" })}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navRef = useRef<HTMLElement>(null);
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
    useEffect(() => { const handleClickOutside = (event: MouseEvent) => { if (navRef.current && !navRef.current.contains(event.target as Node) && mobileMenuOpen) { setMobileMenuOpen(false); } }; if (mobileMenuOpen) document.addEventListener("mousedown", handleClickOutside); else document.removeEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, [mobileMenuOpen]);
    const handleNavigate = (path: string, sectionId?: string) => { if (mobileMenuOpen) setMobileMenuOpen(false); setTimeout(() => { if (sectionId && (path === `/${currentLang}` || path === `/${currentLang}/`)) { navigate(path, { state: { scrollTo: sectionId } }); } else { navigate(path); } }, mobileMenuOpen ? 100 : 0); };
    const getPath = (key: string) => { const route = routesConfig.find(r => r.key === key); if (!route || !route.paths || !(currentLang in route.paths)) { return `/${currentLang}`; } const path = route.paths[currentLang as keyof typeof route.paths]; return `/${currentLang}/${path}`; };
    const mainNavItems = [ { label: t('nav.whoAmI'), path: getPath('whoAmI'), icon: <User className="w-5 h-5 mr-2" /> }, { label: t('nav.blog'), path: getPath('blog'), icon: <BookOpen className="w-5 h-5 mr-2" /> }, { label: t('nav.contact'), path: getPath('contact'), icon: <Mail className="w-5 h-5 mr-2" /> }, ];
    const servicesSubItems = [ { title: t('nav.service_edi_title'), href: getPath('service_edi'), description: t('nav.service_edi_desc'), icon: <Lightbulb /> }, { title: t('nav.service_seo_title'), href: getPath('service_seo'), description: t('nav.service_seo_desc'), icon: <SearchCheck /> }, { title: t('nav.service_ia_title'), href: getPath('service_ia'), description: t('nav.service_ia_desc'), icon: <Cpu /> }, ];
    const methodSubItems = [ { title: t('nav.method_brand_title'), href: getPath('method_brand'), description: t('nav.method_brand_desc'), icon: <SearchCheck /> }, { title: t('nav.method_acquisition_title'), href: getPath('method_acquisition'), description: t('nav.method_acquisition_desc'), icon: <Users /> }, { title: t('nav.method_conversion_title'), href: getPath('method_conversion'), description: t('nav.method_conversion_desc'), icon: <DollarSign /> }, { title: t('nav.method_progression_title'), href: getPath('method_progression'), description: t('nav.method_progression_desc'), icon: <TrendingUp /> }, { title: t('nav.method_recurrence_title'), href: getPath('method_recurrence'), description: t('nav.method_recurrence_desc'), icon: <Heart /> }, { title: t('nav.method_scalability_title'), href: getPath('method_scalability'), description: t('nav.method_scalability_desc'), icon: <Rocket /> }, ];

    return (
    <header ref={navRef} className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg border-b border-blue-800/50 sticky top-0 z-[1000] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center">
          <Link to={`/${currentLang}`} onClick={(e) => { e.preventDefault(); handleNavigate(`/${currentLang}`, 'inicio'); }} className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0" aria-label="AlvaroStrategy Home">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity"> AlvaroStrategy </div>
          </Link>
          <nav className="flex-grow flex justify-center">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem className="group/menuitem relative">
                  <NavigationMenuLink asChild>
                    <Link to={`/${currentLang}`} onClick={(e) => { e.preventDefault(); handleNavigate(`/${currentLang}`); }} className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-3 py-2 text-sm">
                      {t('nav.home')}
                    </Link>
                  </NavigationMenuLink>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full"></span>
                </NavigationMenuItem>
                <NavigationMenuItem className="group/menuitem relative">
                  <NavigationMenuTrigger className="text-blue-100 hover:text-white bg-transparent hover:bg-blue-600/30 data-[active]:bg-blue-600/30 data-[state=open]:bg-blue-600/30 focus:bg-blue-600/30 font-medium text-sm px-3 py-2">
                    {t('nav.services')}
                  </NavigationMenuTrigger>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full group-data-[state=open]/menuitem:w-full"></span>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50/50 via-slate-50 to-blue-100/70 p-6 no-underline outline-none focus:shadow-md hover:bg-blue-100/80" to={getPath('services')} onClick={(e) => { e.preventDefault(); handleNavigate(getPath('services')); }}>
                            <>
                              <Briefcase className="h-6 w-6 text-blue-600" />
                              <div className="mb-2 mt-4 text-lg font-medium text-gray-900">{t('nav.allServices')}</div>
                              <p className="text-sm leading-tight text-gray-700">{t('nav.allServicesDesc')}</p>
                            </>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {servicesSubItems.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon} onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}>{item.description}</ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="group/menuitem relative">
                  <NavigationMenuTrigger className="text-blue-100 hover:text-white bg-transparent hover:bg-blue-600/30 data-[active]:bg-blue-600/30 data-[state=open]:bg-blue-600/30 focus:bg-blue-600/30 font-medium text-sm px-3 py-2">
                    {t('nav.method')}
                  </NavigationMenuTrigger>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full group-data-[state=open]/menuitem:w-full"></span>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-50/50 via-slate-50 to-indigo-100/70 p-6 no-underline outline-none focus:shadow-md hover:bg-indigo-100/80" to={getPath('method')} onClick={(e) => { e.preventDefault(); handleNavigate(getPath('method')); }}>
                             <>
                              <Cog className="h-6 w-6 text-indigo-600" />
                              <div className="mb-2 mt-4 text-lg font-medium text-gray-900">{t('nav.methodProven')}</div>
                              <p className="text-sm leading-tight text-gray-700">{t('nav.methodProvenDesc')}</p>
                            </>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {methodSubItems.map((item) => (
                        <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon} onClick={(e) => { e.preventDefault(); handleNavigate(item.href); }}>{item.description}</ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.label} className="group/menuitem relative">
                    <NavigationMenuLink asChild>
                      <Link to={item.path} onClick={(e) => { e.preventDefault(); handleNavigate(item.path); }} className="text-blue-100 hover:text-white transition-colors duration-300 font-medium px-3 py-2 text-sm">
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                    <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-sky-300 transition-all duration-300 group-hover/menuitem:w-full"></span>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="flex items-center ml-auto flex-shrink-0">
            <div className="hidden lg:flex items-center space-x-2">
              <LanguageSwitcher />
              <Button className="bg-white text-blue-700 hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-xs sm:text-sm font-semibold" onClick={() => handleNavigate(getPath('contact'))}>
                {t('nav.freeSession')}
              </Button>
            </div>
            <div className="lg:hidden flex items-center">
              <LanguageSwitcher />
              <button onClick={toggleMobileMenu} className="p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-1" aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu-content">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
        <div id="mobile-menu-content" className="lg:hidden mt-4 pt-4 pb-3 border-t border-blue-600/50 animate-fade-in-down bg-gradient-to-br from-blue-700 to-indigo-800 shadow-xl rounded-b-lg absolute w-full left-0 px-2 z-[999]">
          <div className="flex flex-col space-y-1">
            <Link to={`/${currentLang}`} className="text-blue-100 hover:text-white transition-colors font-medium px-3 py-3 rounded-md hover:bg-white/10 text-base flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(`/${currentLang}`, "inicio"); }}>
              <>
                <Home className="w-5 h-5 mr-2" />{t('nav.home')}
              </>
            </Link>
            <div className="text-blue-100 font-medium px-3 py-3 text-base flex items-center">
              <Briefcase className="w-5 h-5 mr-2" /> {t('nav.services')}
            </div>
            {servicesSubItems.map(subItem => (
              <Link key={`mobile-service-${subItem.title}`} to={subItem.href} className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(subItem.href); }}>
                <>
                  {React.cloneElement(subItem.icon, {className: "w-4 h-4 mr-2"})} {subItem.title}
                </>
              </Link>
            ))}
            <Link to={getPath('services')} className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm font-bold flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(getPath('services')); }}>
              {t('nav.allServices')}
            </Link>
            <div className="text-blue-100 font-medium px-3 py-2.5 text-base flex items-center mt-1">
              <Cog className="w-5 h-5 mr-2"/> {t('nav.method')}
            </div>
            {methodSubItems.map(subItem => (
              <Link key={`mobile-method-${subItem.title}`} to={subItem.href} className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(subItem.href); }}>
                <>
                  {React.cloneElement(subItem.icon, {className: "w-4 h-4 mr-2"})} {subItem.title}
                </>
              </Link>
            ))}
            <Link to={getPath('method')} className="text-blue-200 hover:text-white pl-10 pr-3 py-2.5 rounded-md hover:bg-white/10 text-sm font-bold flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(getPath('method')); }}>
              {t('nav.methodProven')}
            </Link>
            {mainNavItems.map((item) => (
              <Link key={`mobile-main-${item.label}`} to={item.path} className="text-blue-100 hover:text-white transition-colors font-medium px-3 py-3 rounded-md hover:bg-white/10 text-base flex items-center" onClick={(e) => { e.preventDefault(); handleNavigate(item.path); }}>
                <>
                  {item.icon} {item.label}
                </>
              </Link>
            ))}
            <Button className="w-full mt-4 bg-white text-blue-700 hover:bg-gray-200 px-6 py-3.5 rounded-full transition-all duration-300 shadow-md text-base font-semibold flex items-center justify-center" onClick={() => handleNavigate(getPath('contact'))}>
              <>
                <Send className="w-4 h-4 mr-2" />{t('nav.freeSession')}
              </>
            </Button>
          </div>
        </div>)}
      </div>
    </header>
  );
};

const Footer = () => {
    const { t, i18n } = useTranslation(); const currentLang = i18n.language; const currentYear = new Date().getFullYear(); const navigate = useNavigate(); const handleFooterNavigate = (path: string, sectionId?: string) => { if (sectionId && path === `/${currentLang}`) { navigate(path, { state: { scrollTo: sectionId } }); } else { navigate(path); } }; const getPath = (key: string) => { const route = routesConfig.find(r => r.key === key); if (!route || !route.paths || !(currentLang in route.paths)) { return `/${currentLang}`; } const path = route.paths[currentLang as keyof typeof route.paths]; return `/${currentLang}/${path}`; }; return ( <footer className="bg-gray-900 text-white py-10 sm:py-16 lg:py-20 relative overflow-hidden"> <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/5 to-indigo-900/5 opacity-60"></div> <div className="relative max-w-7xl mx-auto px-4 sm:px-6"> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12 text-center md:text-left"> <div className="lg:col-span-2"> <div onClick={() => handleFooterNavigate(`/${currentLang}`, 'inicio')} className="inline-flex items-center justify-center md:justify-start space-x-2.5 sm:space-x-3 mb-4 sm:mb-5 cursor-pointer group"> <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"> <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> </div> <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity"> AlvaroStrategy </div> </div> <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 px-4 md:px-0"> {t('footer.tagline')} </p> <div className="flex space-x-3 justify-center md:justify-start"> <a href="mailto:alvaro@ignovadigital.com" aria-label="Enviar email" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800/70 rounded-lg flex items-center justify-center hover:bg-blue-600/50 transition-colors group"> <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-white transition-colors" /> </a> <a href="tel:+34627519521" aria-label="Llamar por teléfono" className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800/70 rounded-lg flex items-center justify-center hover:bg-blue-600/50 transition-colors group"> <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-white transition-colors" /> </a> </div> </div> <div className="mt-6 md:mt-0"> <h4 className="font-semibold mb-3 sm:mb-4 text-md sm:text-lg text-gray-200">{t('footer.navigation')}</h4> <ul className="space-y-2 text-gray-400 text-xs sm:text-sm"> <li><Link to={getPath('services')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />{t('nav.services')}</Link></li> <li><Link to={getPath('method')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />{t('nav.method')}</Link></li> <li><Link to={getPath('whoAmI')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />{t('nav.whoAmI')}</Link></li> </ul> </div> <div className="mt-6 md:mt-0"> <h4 className="font-semibold mb-3 sm:mb-4 text-md sm:text-lg text-gray-200">{t('footer.resources_legal')}</h4> <ul className="space-y-2 text-gray-400 text-xs sm:text-sm"> <li><Link to={getPath('blog')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />{t('nav.blog')}</Link></li> <li><Link to={getPath('contact')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><ArrowRight className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-500 group-hover:text-blue-300 transition-colors" />{t('nav.contact')}</Link></li> <li className="pt-2 mt-2 border-t border-gray-700/30"><Link to={getPath('legal_notice')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><FileText className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-blue-300 transition-colors" />{t('footer.legal_notice')}</Link></li> <li><Link to={getPath('privacy_policy')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><FileText className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-blue-300 transition-colors" />{t('footer.privacy_policy')}</Link></li> <li><Link to={getPath('cookies_policy')} className="hover:text-blue-300 transition-colors flex items-center group justify-center md:justify-start"><FileText className="w-3 h-3 sm:w-3.5 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-blue-300 transition-colors" />{t('footer.cookies_policy')}</Link></li> </ul> </div> </div> <div className="border-t border-gray-700/60 pt-6 sm:pt-10 text-center"> <p className="text-gray-500 text-xs sm:text-sm"> {t('footer.copyright', { year: currentYear })} </p> </div> </div> </footer> );
};

const LanguageLayout = () => {
  const { i18n } = useTranslation(); const location = useLocation(); const lang = location.pathname.split('/')[1]; useEffect(() => { if (lang && i18n.language !== lang && Object.keys(supportedLngs).includes(lang)) { i18n.changeLanguage(lang); } }, [lang, i18n]); if (!lang || !Object.keys(supportedLngs).includes(lang)) { return <Navigate to="/404" replace />; } const htmlLang = supportedLngs[lang as keyof typeof supportedLngs];
  // --- MODIFICACIÓN DE LAYOUT PARA PREVENIR SCROLL HORIZONTAL ---
  return (<div className="flex flex-col min-h-screen overflow-x-hidden"> <Helmet><html lang={htmlLang} /></Helmet> <ScrollToSectionOnLoad /> <Navigation /> <main className="flex-grow"><Outlet /></main> <ScrollToTopButton /> <Footer /> </div>);
};

const LanguageRedirector = () => {
  const userLanguages = navigator.language || (navigator as any).userLanguage; let finalLang = 'es'; if (userLanguages.startsWith('fr')) finalLang = 'fr'; else if (userLanguages.startsWith('en')) finalLang = 'en'; return <Navigate to={`/${finalLang}`} replace />;
};

const ScrollToSectionOnLoad = () => {
    const location = useLocation(); const navigate = useNavigate(); useEffect(() => { if (location.state?.scrollTo) { const elementId = location.state.scrollTo; const timer = setTimeout(() => { const element = document.getElementById(elementId); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); const { scrollTo, ...restOfState } = location.state || {}; navigate(location.pathname + location.search + location.hash, { replace: true, state: Object.keys(restOfState).length > 0 ? restOfState : undefined }); } }, 100); return () => clearTimeout(timer); } else if (!location.hash) { window.scrollTo(0, 0); } }, [location.pathname, location.search, location.hash, location.state, navigate]); return null;
};

const trackPageViewGA4 = (path: string) => {
    if (typeof (window as any).gtag === 'function') { (window as any).gtag('config', GA_MEASUREMENT_ID, { page_path: path }); }
};

type ConsentObject = { analytics?: boolean; [key: string]: boolean | undefined; };

const FinalApp = () => {
  const location = useLocation();
  const [cookieConsent, setCookieConsent] = useState<ConsentObject>({ analytics: false });
  const { i18n } = useTranslation();

  useEffect(() => { const savedConsent = localStorage.getItem('cookieConsent'); if (savedConsent) { try { setCookieConsent(JSON.parse(savedConsent)); } catch (error) { console.error("Error parsing cookie consent", error); } } }, []);
  useEffect(() => { if (cookieConsent.analytics) { trackPageViewGA4(location.pathname + location.search); } }, [location, cookieConsent.analytics]);
  const handleConsentChangeCallback = useCallback((newConsent: ConsentObject) => { localStorage.setItem('cookieConsent', JSON.stringify(newConsent)); setCookieConsent(newConsent); }, []);
  if (!i18n.isInitialized) { return <LoadingFallback />; }

  return (
    <AlternateLinksProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster />
            <>
              <Helmet>
                {cookieConsent.analytics && (
                  <>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
                    <script>
                      {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_MEASUREMENT_ID}');`}
                    </script>
                    <script type="text/javascript">
                      {`(function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
                    </script>
                  </>
                )}
              </Helmet>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<LanguageRedirector />} />
                  <Route path="/404" element={<NotFound />} />
                  {Object.keys(supportedLngs).map((lang) => (
                    <Route path={`/${lang}`} element={<LanguageLayout />} key={lang}>
                      <Route index element={<Index />} />
                      {routesConfig.map((route) => {
                        const path = route.paths[lang as keyof typeof route.paths];
                        if (!path) return null;
                        return ( <Route key={`${lang}-${route.key}`} path={path} element={<route.component />} /> );
                      })}
                    </Route>
                  ))}
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
              <ErrorBoundary fallback={<div>Algo salió mal. Por favor, recarga la página.</div>}>
                <Suspense fallback={null}>
                  <CookieConsentBanner onConsentChange={handleConsentChangeCallback} />
                </Suspense>
              </ErrorBoundary>
            </>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </AlternateLinksProvider>
  );
};

export default FinalApp;