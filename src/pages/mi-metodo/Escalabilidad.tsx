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
    Rocket,
    Settings,
    Users,
    Cpu,
    Network,
    ShieldCheck,
    BarChartBig,
    Lightbulb,
    MessageSquare,
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

interface ScalabilityPillar {
    titleKey: string;
    icon: React.ReactElement;
    descriptionKey: string;
    detailKeys?: string[];
    colorClass?: string;
}

const Escalabilidad = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const scalabilityPillars: ScalabilityPillar[] = [
    { titleKey: "method_scalability.pillar1_title", icon: <Settings className="w-7 h-7"/>, descriptionKey: "method_scalability.pillar1_desc", detailKeys: ["method_scalability.pillar1_d1", "method_scalability.pillar1_d2", "method_scalability.pillar1_d3", "method_scalability.pillar1_d4"], colorClass: "text-orange-600" },
    { titleKey: "method_scalability.pillar2_title", icon: <BarChartBig className="w-7 h-7"/>, descriptionKey: "method_scalability.pillar2_desc", detailKeys: ["method_scalability.pillar2_d1", "method_scalability.pillar2_d2", "method_scalability.pillar2_d3"], colorClass: "text-amber-500" },
    { titleKey: "method_scalability.pillar3_title", icon: <Users className="w-7 h-7"/>, descriptionKey: "method_scalability.pillar3_desc", colorClass: "text-yellow-500" },
    { titleKey: "method_scalability.pillar4_title", icon: <Cpu className="w-7 h-7"/>, descriptionKey: "method_scalability.pillar4_desc", detailKeys: ["method_scalability.pillar4_d1", "method_scalability.pillar4_d2", "method_scalability.pillar4_d3"], colorClass: "text-lime-500" },
    { titleKey: "method_scalability.pillar5_title", icon: <Network className="w-7 h-7"/>, descriptionKey: "method_scalability.pillar5_desc", colorClass: "text-green-500" },
    { titleKey: "method_scalability.pillar6_title", icon: <ShieldCheck className="w-7 h-7"/>, descriptionKey: "method_scalability.pillar6_desc", colorClass: "text-emerald-500" },
  ];

  const pageTitle = t('method_scalability.meta_title');
  const pageDescription = t('method_scalability.meta_description');

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
        { "@type": "ListItem", "position": 3, "name": t('method_scalability.breadcrumb') }
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
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white dark:from-orange-600 dark:via-orange-700 dark:to-red-600"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to={getPath('routes.method')} className="inline-flex items-center text-orange-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    {t('method_scalability.back_to_method')}
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                {t('method_scalability.phase_badge')}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-orange-300 dark:text-orange-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">E</span>
              {t('method_scalability.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-orange-100/90 dark:text-orange-200/90 mb-3 font-semibold"
            >
              {t('method_scalability.subtitle')}
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-orange-200/80 dark:text-orange-300/80 max-w-3xl mx-auto"
            >
              {t('method_scalability.intro')}
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-escalabilidad">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        {t('nav.home')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={getPath('routes.method')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        {t('methodPage.breadcrumb')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('method_scalability.breadcrumb')}</BreadcrumbPage>
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
                         prose-a:text-orange-600 dark:prose-a:text-orange-400 hover:prose-a:text-orange-700 dark:hover:prose-a:text-orange-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-orange-500 dark:prose-blockquote:border-orange-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100"> 
                <Rocket className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-orange-700 dark:text-orange-400 flex-shrink-0" />
                {t('method_scalability.section1_title')}
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                <Trans i18nKey="method_scalability.section1_p1">
                    ...<strong className="text-orange-600 dark:text-orange-400">...</strong>...<strong className="text-orange-600 dark:text-orange-400">...</strong>...
                </Trans>
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3"> 
                {t('method_scalability.section1_blockquote')}
              </blockquote>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose"> 
                {t('method_scalability.section1_p2')}
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
                 <Trans i18nKey="method_scalability.section2_title">Pilares fundamentales de la <span className="text-orange-600 dark:text-orange-400">escalabilidad empresarial</span></Trans>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {scalabilityPillars.map((pillar) => (
                  <motion.div key={pillar.titleKey} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", pillar.colorClass)}>
                           {React.cloneElement(pillar.icon, {className: cn(pillar.icon.props.className, pillar.colorClass ? '' : 'text-orange-600 dark:text-orange-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {t(pillar.titleKey)}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-3 flex-grow">{t(pillar.descriptionKey)}</p>
                        {pillar.detailKeys && pillar.detailKeys.length > 0 && (
                            <div className="mt-auto pt-3 border-t border-gray-200/30 dark:border-slate-700/50">
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5">Ejemplos / Claves:</CardDescription>
                                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-slate-400 space-y-1">
                                    {pillar.detailKeys.map(detailKey => <li key={detailKey}>{t(detailKey)}</li>)}
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
              className="mt-12 md:mt-16 lg:mt-20 text-center p-6 sm:p-8 bg-gradient-to-r from-slate-200 via-gray-100 to-slate-200 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 rounded-xl shadow-xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">
                {t('method_scalability.cta_section_title')}
              </h3>
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                {t('method_scalability.cta_section_desc')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" asChild className="group bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to={getPath('routes.contact')} state={{ subject: t('method_scalability.cta_section_button1') }}> 
                    {t('method_scalability.cta_section_button1')}
                    <MessageSquare className="ml-2 w-5 h-5"/>
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="group border-orange-500 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/40 hover:text-orange-700 dark:hover:text-orange-300 w-full sm:w-auto transition-all duration-300">
                    <Link to={getPath('routes.service_edi')}>
                        {t('method_scalability.cta_section_button2')}
                        <Lightbulb className="ml-2 w-5 h-5" />
                    </Link>
                </Button>
              </div>
               <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                    <Link to={getPath('routes.method_recurrence')} aria-label={t('method_scalability.cta_section_button_prev')}>
                        <ArrowLeft className="mr-2 w-4 h-4" /> {t('method_scalability.cta_section_button_prev')}
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

export default Escalabilidad;