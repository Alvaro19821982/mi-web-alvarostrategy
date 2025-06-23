// src/pages/servicios/EstrategiaDigitalIntegral.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SeoTags from '@/components/SeoTags';
import {
    ArrowRight, Lightbulb, Check, BarChart3, Cog, Users, Shield, Target, TrendingUp, Zap, Search, Brain, Home as HomeIcon, Scaling, CheckCircle, Briefcase
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15, ease: "easeOut" } }
};

interface ServiceDetailItem {
  icon: React.ReactElement;
  titleKey: string;
  descriptionKey: string;
  linkKey?: string; // Cambiado a clave de ruta
  colorClass?: string;
}

const EstrategiaDigitalIntegral = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const serviceIncludes: ServiceDetailItem[] = [
    { icon: <Search className="w-6 h-6"/>, titleKey: "service_edi.include1_title", descriptionKey: "service_edi.include1_desc", colorClass: "text-blue-600"},
    { icon: <Target className="w-6 h-6"/>, titleKey: "service_edi.include2_title", descriptionKey: "service_edi.include2_desc", colorClass: "text-sky-600"},
    { icon: <Cog className="w-6 h-6"/>, titleKey: "service_edi.include3_title", descriptionKey: "service_edi.include3_desc", linkKey: "routes.method", colorClass: "text-indigo-600" },
    { icon: <TrendingUp className="w-6 h-6"/>, titleKey: "service_edi.include4_title", descriptionKey: "service_edi.include4_desc", colorClass: "text-purple-600"},
    { icon: <Brain className="w-6 h-6"/>, titleKey: "service_edi.include5_title", descriptionKey: "service_edi.include5_desc", colorClass: "text-fuchsia-600"},
    { icon: <BarChart3 className="w-6 h-6"/>, titleKey: "service_edi.include6_title", descriptionKey: "service_edi.include6_desc", colorClass: "text-pink-600"},
    { icon: <Users className="w-6 h-6"/>, titleKey: "service_edi.include7_title", descriptionKey: "service_edi.include7_desc", colorClass: "text-rose-600"},
  ];

  const serviceBenefits = [
    { icon: <CheckCircle className="text-green-500 dark:text-green-400 w-7 h-7" />, titleKey: "service_edi.benefit1_title", descriptionKey: "service_edi.benefit1_desc" },
    { icon: <TrendingUp className="text-green-500 dark:text-green-400 w-7 h-7" />, titleKey: "service_edi.benefit2_title", descriptionKey: "service_edi.benefit2_desc" },
    { icon: <Scaling className="text-green-500 dark:text-green-400 w-7 h-7" />, titleKey: "service_edi.benefit3_title", descriptionKey: "service_edi.benefit3_desc" },
    { icon: <Shield className="text-green-500 dark:text-green-400 w-7 h-7" />, titleKey: "service_edi.benefit4_title", descriptionKey: "service_edi.benefit4_desc" },
    { icon: <Zap className="text-green-500 dark:text-green-400 w-7 h-7" />, titleKey: "service_edi.benefit5_title", descriptionKey: "service_edi.benefit5_desc" },
    { icon: <Lightbulb className="text-green-500 dark:text-green-400 w-7 h-7" />, titleKey: "service_edi.benefit6_title", descriptionKey: "service_edi.benefit6_desc" },
  ];
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('service_edi.meta_title'),
    "serviceType": "Consultoría en Estrategia Digital",
    "description": t('service_edi.meta_description'),
    "url": `https://alvarostrategy.com${location.pathname}`,
    "provider": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "url": `https://alvarostrategy.com/${currentLang}`
    },
  };

  return (
    <>
      <SeoTags
        title={t('service_edi.meta_title')}
        description={t('service_edi.meta_description')}
        pathname={location.pathname}
      />
       <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup, null, 2)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-20 lg:py-28 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                <Lightbulb className="w-4 h-4 mr-2 inline-block" /> {t('service_edi.header_badge')}
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black leading-tight mt-4 mb-5 sm:mb-6">
              {t('service_edi.header_title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl lg:text-2xl text-blue-100/90 dark:text-blue-200/90 mb-8 sm:mb-10 max-w-3xl mx-auto">
              {t('service_edi.header_subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="group bg-white text-blue-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate(getPath('routes.contact'), { state: { subject: "Interesado en Estrategia Digital Integral" }})}
                aria-label={t('service_edi.header_cta_button')}
              >
                {t('service_edi.header_cta_button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-10 md:mb-12">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />{t('nav.home')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                      <Link to={getPath('routes.services')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {t('nav.services')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('service_edi.breadcrumb')}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-12 md:mb-16 lg:mb-20">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-5 sm:mb-6">
                {t('service_edi.intro_title')}
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-md sm:text-lg text-gray-600 dark:text-slate-300 text-center max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed sm:leading-loose">
                <Trans i18nKey="service_edi.intro_p1">...<strong className="font-semibold text-blue-600 dark:text-blue-400">...</strong>...</Trans>
              </motion.p>
              <motion.div variants={fadeInUp} className="bg-blue-50 dark:bg-blue-900/30 p-6 sm:p-8 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700/50">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center">
                    <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 mr-2.5 flex-shrink-0"/>{t('service_edi.solution_title')}
                </h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed sm:leading-loose">
                  <Trans i18nKey="service_edi.solution_desc">...<strong className="font-semibold">...</strong>...</Trans>
                </p>
              </motion.div>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-12 md:mb-16 lg:mb-20">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                <Trans i18nKey="service_edi.includes_title">...<span className="text-blue-600 dark:text-blue-400">...</span>...</Trans>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
                {serviceIncludes.map((item) => (
                  <motion.div key={item.titleKey} variants={fadeInUp} className="flex items-start space-x-3 sm:space-x-4">
                    <div className={cn("flex-shrink-0 p-2.5 sm:p-3 rounded-full shadow-sm bg-opacity-10 dark:bg-opacity-20", item.colorClass?.replace("text-", "bg-"))}>
                      {React.cloneElement(item.icon, {className: cn("w-5 h-5 sm:w-6 sm:h-6", item.colorClass)})}
                    </div>
                    <div>
                      <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-1">{t(item.titleKey)}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed sm:leading-loose">
                        {t(item.descriptionKey)}
                        {item.linkKey && (
                          <Link to={getPath(item.linkKey)} className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm ml-1 font-medium group/link inline-flex items-center">
                            {t('service_edi.include3_link_text')}
                            <ArrowRight className="w-3 h-3 ml-0.5 group-hover/link:translate-x-0.5 transition-transform"/>
                          </Link>
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-12 md:mb-16 lg:mb-20">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                <Trans i18nKey="service_edi.benefits_title">...<span className="text-green-600 dark:text-green-400">...</span></Trans>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {serviceBenefits.map((benefit) => (
                  <motion.div key={benefit.titleKey} variants={fadeInUp} className="h-full flex">
                    <Card className="h-full bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-5 sm:p-6 border-l-4 border-green-500 dark:border-green-400 w-full">
                      <div className="flex items-start mb-3 sm:mb-4">
                        {benefit.icon}
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">{t(benefit.titleKey)}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed sm:leading-loose">{t(benefit.descriptionKey)}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-12 md:mb-16 lg:mb-20 bg-white dark:bg-slate-800/70 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border dark:border-slate-700/50">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 text-center mb-8 sm:mb-10">
                <Trans i18nKey="service_edi.isForYou_title">...<span className="text-blue-600 dark:text-blue-400">...</span>...</Trans>
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-slate-200 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"/>{t('service_edi.isForYou_yes_title')}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 space-y-1.5 text-sm sm:text-base pl-1 leading-relaxed">
                    <li>{t('service_edi.isForYou_yes_item1')}</li>
                    <li>{t('service_edi.isForYou_yes_item2')}</li>
                    <li>{t('service_edi.isForYou_yes_item3')}</li>
                    <li>{t('service_edi.isForYou_yes_item4')}</li>
                    <li>{t('service_edi.isForYou_yes_item5')}</li>
                  </ul>
                </div>
                <div className="mt-6 md:mt-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-slate-200 mb-3 flex items-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-500 dark:text-red-400 flex-shrink-0"/>{t('service_edi.isForYou_no_title')}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 space-y-1.5 text-sm sm:text-base pl-1 leading-relaxed">
                    <li>{t('service_edi.isForYou_no_item1')}</li>
                    <li>{t('service_edi.isForYou_no_item2')}</li>
                    <li>{t('service_edi.isForYou_no_item3')}</li>
                    <li>{t('service_edi.isForYou_no_item4')}</li>
                    <li>{t('service_edi.isForYou_no_item5')}</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl shadow-2xl text-center">
              <Scaling className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 sm:mb-6 opacity-80" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">{t('service_edi.finalCta_title')}</h2>
              <p className="text-md sm:text-lg lg:text-xl text-blue-100/90 dark:text-blue-200/90 mb-8 max-w-2xl mx-auto leading-relaxed sm:leading-loose">{t('service_edi.finalCta_desc')}</p>
              <Button
                size="lg"
                className="group bg-white text-blue-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate(getPath('routes.contact'), { state: { subject: "Solicitud de Propuesta: Estrategia Digital Integral" }})}
                aria-label={t('service_edi.finalCta_button')}
              >
                {t('service_edi.finalCta_button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
              <p className="text-sm text-blue-200/80 dark:text-blue-300/80 mt-6 italic">{t('service_edi.finalCta_note')}</p>
            </motion.section>

            <motion.div variants={fadeInUp} className="mt-12 md:mt-16 text-center">
                 <Button size="sm" variant="ghost" asChild className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <Link to={getPath('routes.services')}>
                        <Briefcase className="w-4 h-4 mr-2" /> {t('service_edi.view_all_services_button')}
                    </Link>
                </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstrategiaDigitalIntegral;