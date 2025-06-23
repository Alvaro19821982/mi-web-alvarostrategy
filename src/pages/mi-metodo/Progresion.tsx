import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; 
import SeoTags from '@/components/SeoTags';
import {
    ArrowRight,
    ArrowLeft,
    TrendingUp,
    ShoppingBag,
    Gift,
    PlusCircle,
    Layers,
    Award,
    Lightbulb,      
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

interface ProgressionStrategy {
    titleKey: string;
    icon: React.ReactElement;
    descriptionKey: string;
    exampleKeys?: string[];
    colorClass?: string; 
}

const Progresion = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const progressionStrategies: ProgressionStrategy[] = [
    { titleKey: "method_progression.strategy1_title", icon: <PlusCircle className="w-7 h-7"/>, descriptionKey: "method_progression.strategy1_desc", exampleKeys: ["method_progression.strategy1_ex1", "method_progression.strategy1_ex2", "method_progression.strategy1_ex3"], colorClass: "text-pink-600" },
    { titleKey: "method_progression.strategy2_title", icon: <ShoppingBag className="w-7 h-7"/>, descriptionKey: "method_progression.strategy2_desc", exampleKeys: ["method_progression.strategy2_ex1", "method_progression.strategy2_ex2", "method_progression.strategy2_ex3"], colorClass: "text-rose-500" },
    { titleKey: "method_progression.strategy3_title", icon: <TrendingUp className="w-7 h-7"/>, descriptionKey: "method_progression.strategy3_desc", exampleKeys: ["method_progression.strategy3_ex1", "method_progression.strategy3_ex2", "method_progression.strategy3_ex3"], colorClass: "text-red-500" },
    { titleKey: "method_progression.strategy4_title", icon: <Layers className="w-7 h-7"/>, descriptionKey: "method_progression.strategy4_desc", colorClass: "text-fuchsia-500" },
    { titleKey: "method_progression.strategy5_title", icon: <Award className="w-7 h-7"/>, descriptionKey: "method_progression.strategy5_desc", colorClass: "text-purple-500" },
    { titleKey: "method_progression.strategy6_title", icon: <Gift className="w-7 h-7"/>, descriptionKey: "method_progression.strategy6_desc", colorClass: "text-violet-500" },
  ];
  
  const pageTitle = t('method_progression.meta_title');
  const pageDescription = t('method_progression.meta_description');

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": `https://alvarostrategy.com${location.pathname}`,
    "inLanguage": i18n.language,
    "isPartOf": {
      "@type": "WebPage",
      "@id": `https://alvarostrategy.com${getPath('routes.method')}`,
      "name": t('methodPage.meta_title'),
      "url": `https://alvarostrategy.com${getPath('routes.method')}`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": t('nav.home'), "item": `https://alvarostrategy.com/${currentLang}` },
        { "@type": "ListItem", "position": 2, "name": t('methodPage.breadcrumb'), "item": `https://alvarostrategy.com${getPath('routes.method')}` },
        { "@type": "ListItem", "position": 3, "name": t('method_progression.breadcrumb') }
      ]
    },
  };

  return (
    <>
      <SeoTags
        title={pageTitle}
        description={pageDescription}
        pathname={location.pathname}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-pink-500 via-pink-600 to-red-500 text-white dark:from-pink-600 dark:via-pink-700 dark:to-red-600"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to={getPath('routes.method')} className="inline-flex items-center text-pink-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    {t('method_progression.back_to_method')}
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                {t('method_progression.phase_badge')}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-pink-300 dark:text-pink-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">P</span>
              {t('method_progression.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-pink-100/90 dark:text-pink-200/90 mb-3 font-semibold"
            >
              {t('method_progression.subtitle')}
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-pink-200/80 dark:text-pink-300/80 max-w-3xl mx-auto"
            >
                <Trans i18nKey="method_progression.intro">
                    ...<strong className="font-semibold text-white">...</strong>...<strong className="font-semibold text-white">...</strong>...
                </Trans>
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-progresion">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        {t('nav.home')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={getPath('routes.method')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        {t('methodPage.breadcrumb')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('method_progression.breadcrumb')}</BreadcrumbPage>
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
                         prose-a:text-pink-600 dark:prose-a:text-pink-400 hover:prose-a:text-pink-700 dark:hover:prose-a:text-pink-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-pink-500 dark:prose-blockquote:border-pink-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100">
                <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-pink-700 dark:text-pink-400 flex-shrink-0" />
                {t('method_progression.section1_title')}
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                <Trans i18nKey="method_progression.section1_p1">
                    ...<strong className="text-pink-600 dark:text-pink-400">...</strong>...<strong className="text-pink-600 dark:text-pink-400">...</strong>...
                </Trans>
              </p>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                {t('method_progression.section1_p2')}
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                {t('method_progression.section1_blockquote')}
              </blockquote>
               <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                {t('method_progression.section1_p3')}
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
                 <Trans i18nKey="method_progression.section2_title">Estrategias clave para la <span className="text-pink-600 dark:text-pink-400">progresión del cliente</span></Trans>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {progressionStrategies.map((strategy) => (
                  <motion.div key={strategy.titleKey} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", strategy.colorClass)}>
                           {React.cloneElement(strategy.icon, {className: cn(strategy.icon.props.className, strategy.colorClass ? '' : 'text-pink-600 dark:text-pink-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {t(strategy.titleKey)}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 flex-grow">{t(strategy.descriptionKey)}</p>
                        {strategy.exampleKeys && strategy.exampleKeys.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-gray-200/30 dark:border-slate-700/50">
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5">{t('method_progression.examples_label')}</CardDescription>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                    {strategy.exampleKeys.map(exampleKey => <li key={exampleKey}>{t(exampleKey)}</li>)}
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
              className="mt-12 md:mt-16 lg:mt-20 text-center"
            >
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                {t('method_progression.cta_text')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to={getPath('routes.method_conversion')} aria-label={t('method_progression.cta_button_prev')}>
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        {t('method_progression.cta_button_prev')}
                    </Link>
                </Button>
                <Button size="lg" asChild className="group bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to={getPath('routes.method_recurrence')} aria-label={t('method_progression.cta_button_next')}>
                    {t('method_progression.cta_button_next')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
              </div>
              <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300">
                    <Link to={getPath('routes.contact')} state={{ subject: t('method_progression.cta_button_contact') }}>
                        <Lightbulb className="w-4 h-4 mr-2" /> {t('method_progression.cta_button_contact')}
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

export default Progresion;