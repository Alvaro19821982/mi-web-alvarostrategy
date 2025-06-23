import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
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
  BookOpen as BlogIconFile, 
  UserCircle as QuienSoyIcon,
  Cog
} from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SeoTags from '@/components/SeoTags';
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
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" } }
};

const MiMetodo = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const navigateToContact = () => {
    navigate(getPath('routes.contact'), { state: { subject: "Interesado en aplicar nuestro método" } });
  };
  
  const metodoFases = [
    { letra: "P", icono: <SearchCheck className="w-8 h-8 sm:w-10" />, colorBase: "blue-600", textColorClass: "text-blue-600", bgColorClass: "bg-blue-600", hoverBgColorClass: "hover:bg-blue-700", borderColorClass: "border-blue-600", pathKey: "routes.method_brand" },
    { letra: "A", icono: <Target className="w-8 h-8 sm:w-10" />, colorBase: "indigo-600", textColorClass: "text-indigo-600", bgColorClass: "bg-indigo-600", hoverBgColorClass: "hover:bg-indigo-700", borderColorClass: "border-indigo-600", pathKey: "routes.method_acquisition" },
    { letra: "C", icono: <DollarSign className="w-8 h-8 sm:w-10" />, colorBase: "purple-600", textColorClass: "text-purple-600", bgColorClass: "bg-purple-600", hoverBgColorClass: "hover:bg-purple-700", borderColorClass: "border-purple-600", pathKey: "routes.method_conversion" },
    { letra: "P", icono: <TrendingUp className="w-8 h-8 sm:w-10" />, colorBase: "pink-600", textColorClass: "text-pink-600", bgColorClass: "bg-pink-600", hoverBgColorClass: "hover:bg-pink-700", borderColorClass: "border-pink-600", pathKey: "routes.method_progression" },
    { letra: "R", icono: <Heart className="w-8 h-8 sm:w-10" />, colorBase: "red-600", textColorClass: "text-red-600", bgColorClass: "bg-red-600", hoverBgColorClass: "hover:bg-red-700", borderColorClass: "border-red-600", pathKey: "routes.method_recurrence" },
    { letra: "E", icono: <Rocket className="w-8 h-8 sm:w-10" />, colorBase: "orange-600", textColorClass: "text-orange-600", bgColorClass: "bg-orange-600", hoverBgColorClass: "hover:bg-orange-700", borderColorClass: "border-orange-600", pathKey: "routes.method_scalability" }
  ];

  const preFooterLinksMethod = [
    { labelKey: "methodPage.prefooter_link1_label", pathKey: "routes.services", icon: <Briefcase className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />, descriptionKey: "methodPage.prefooter_link1_desc" },
    { labelKey: "methodPage.prefooter_link2_label", pathKey: "routes.whoAmI", icon: <QuienSoyIcon className="w-8 h-8 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />, descriptionKey: "methodPage.prefooter_link2_desc" },
    { labelKey: "methodPage.prefooter_link3_label", pathKey: "routes.blog", icon: <BlogIconFile className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />, descriptionKey: "methodPage.prefooter_link3_desc" },
  ];

  const viewportSettings = { once: true, amount: 0.15 }; 
  const pageUrl = `https://alvarostrategy.com${location.pathname}`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('methodPage.meta_title'),
    "description": t('methodPage.meta_description'),
    "url": pageUrl,
    "inLanguage": i18n.language,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": t('nav.home'), "item": `https://alvarostrategy.com/${currentLang}` }, 
        { "@type": "ListItem", "position": 2, "name": t('methodPage.breadcrumb') }
      ]
    },
  };

  return (
    <>
      <SeoTags
        title={t('methodPage.meta_title')}
        description={t('methodPage.meta_description')}
        pathname={location.pathname}
      />
      <Helmet>
        <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={gentleFadeIn} className="mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/${currentLang}`} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <HomeIcon className="h-4 w-4 mr-1.5" />{t('nav.home')}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-gray-700 dark:text-slate-200">{t('methodPage.breadcrumb')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.header variants={gentleFadeIn} initial="hidden" whileInView="visible" viewport={viewportSettings} className="text-center mb-12 md:mb-16 lg:mb-20">
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <Zap className="w-5 h-5 mr-2 inline-block" />{t('methodPage.badge')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-5 sm:mb-6">
              {t('methodPage.title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              <Trans i18nKey="methodPage.subtitle">
                ...<strong className="font-semibold text-gray-700 dark:text-slate-100">...</strong>...<strong className="text-blue-600 dark:text-blue-400">...</strong>...
              </Trans>
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
          </motion.header>

          <motion.section variants={gentleFadeIn} initial="hidden" whileInView="visible" viewport={viewportSettings} className="mb-12 md:mb-16 lg:mb-20 px-0 sm:px-2">
            <Card className="bg-white dark:bg-slate-800/70 shadow-2xl border-t-4 border-blue-600 dark:border-blue-500 rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-800 p-6 sm:p-8">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                  <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-blue-600 dark:text-blue-400" />{t('methodPage.why_method_title')}
                </CardTitle>
                <CardDescription className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mt-2">
                  <Trans i18nKey="methodPage.why_method_desc">
                    ...<strong className="text-red-600 dark:text-red-400">...</strong>...<strong className="text-gray-800 dark:text-slate-100">...</strong>...
                  </Trans>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 text-md sm:text-lg text-gray-700 dark:text-slate-300 space-y-5 leading-relaxed">
                <p><Trans i18nKey="methodPage.why_method_p1">...<strong className="font-semibold text-gray-800 dark:text-slate-100">...</strong>...</Trans></p>
                <p><Trans i18nKey="methodPage.why_method_p2">...<strong className="font-semibold text-gray-800 dark:text-slate-100">...</strong>...</Trans></p>
                <p><Trans i18nKey="methodPage.why_method_p3">...<strong className="font-semibold text-gray-800 dark:text-slate-100">...</strong>...</Trans></p>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-16 md:mb-20 lg:mb-24">
            <motion.h2 variants={gentleFadeIn} className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
              <Trans i18nKey="methodPage.phases_title">Desglose de cada fase de nuestra <span className={`bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent`}>estrategia</span></Trans>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {metodoFases.map((paso, index) => (
                <motion.div key={index} variants={gentleFadeIn} className="h-full">
                  <Card className={cn("group bg-white dark:bg-slate-800/70 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl border-t-4 overflow-hidden flex flex-col h-full transform hover:-translate-y-1.5", paso.borderColorClass)}>
                    <CardHeader className="p-6 items-center text-center">
                      <div className={cn("inline-flex p-3 sm:p-4 rounded-full mb-4 group-hover:scale-110 transition-transform", `${paso.bgColorClass.replace('bg-', 'bg-opacity-10 dark:bg-opacity-20').replace('-600', '-100 dark:bg-slate-700')}`)}>
                        {React.cloneElement(paso.icono, {className: cn(paso.icono.props.className, paso.textColorClass)})}
                      </div>
                      <CardTitle className={cn("text-xl sm:text-2xl font-black", paso.textColorClass)}>
                        <span className="text-4xl sm:text-5xl block mb-1">{paso.letra}</span>{t(`methodPage.phase${index + 1}_title`)}
                      </CardTitle>
                      <p className={`text-sm sm:text-md font-semibold text-gray-500 dark:text-slate-400 mt-1`}>{t(`methodPage.phase${index + 1}_subtitle`)}</p>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex-grow flex flex-col text-center">
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                        {t(`methodPage.phase${index + 1}_desc`)} <span className="font-medium">{t(`methodPage.phase${index + 1}_keyword`) && `(Clave: ${t(`methodPage.phase${index + 1}_keyword`)})`}</span>
                      </p>
                      <div className="mt-auto">
                        <Button asChild className={cn("group/button w-full font-semibold text-white transition-all duration-300", paso.bgColorClass, paso.hoverBgColorClass)}>
                          <Link to={getPath(paso.pathKey)} aria-label={`Profundizar en la fase ${paso.letra}: ${t(`methodPage.phase${index + 1}_title`)}`}>
                            {t('methodPage.explore_phase_button', { letter: paso.letra })}
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

          <motion.section variants={gentleFadeIn} initial="hidden" whileInView="visible" viewport={viewportSettings} className="my-16 md:my-20 lg:my-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12">{t('methodPage.prefooter_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
              {preFooterLinksMethod.map(item => (
                <motion.div variants={gentleFadeIn} key={item.pathKey}>
                  <Card className="h-full group bg-white dark:bg-slate-800/50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 items-center text-center transform hover:-translate-y-1">
                    {item.icon}
                    <h3 className="font-semibold text-lg text-gray-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{t(item.labelKey)}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 flex-grow">{t(item.descriptionKey)}</p>
                    <Button asChild variant="outline" className="mt-auto group/button border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400">
                      <Link to={getPath(item.pathKey)}>
                        {t('servicesPage.prefooter_button')}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={gentleFadeIn} initial="hidden" whileInView="visible" viewport={viewportSettings} className="text-center mt-12 md:mt-16 lg:mt-20 py-10 sm:py-12 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 dark:from-slate-800 dark:via-gray-800/80 dark:to-slate-900 rounded-2xl shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">{t('methodPage.cta_title')}</h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              <Trans i18nKey="methodPage.cta_desc">...<strong className="font-semibold text-blue-600 dark:text-blue-400">...</strong>...</Trans>
            </p>
            <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 w-full sm:w-auto" onClick={navigateToContact} aria-label="Contactar para implementar el nuestro método.">
              {t('methodPage.cta_button')}
              <ArrowRight className="ml-2.5 w-6 h-6 sm:ml-3 sm:w-7 sm:h-7 group-hover:translate-x-1.5 transition-transform" />
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 italic">{t('methodPage.cta_note')}</p>
          </motion.section>
        </motion.div>
      </div>
    </>
  );
};

export default MiMetodo;