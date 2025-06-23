// src/pages/servicios/ConsultoriaSeo.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SeoTags from '@/components/SeoTags';
import {
    ArrowRight, SearchCheck, ShieldCheck, BarChartHorizontalBig, Zap, Lightbulb, Check, Users, Cog, PenTool, Link2, MapPin, Store, Cpu, Home as HomeIcon, Briefcase
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15, ease: "easeOut" } }
};

interface SeoPillar {
  icon: React.ReactElement;
  titleKey: string;
  descriptionKey: string;
  detailsKeys: string[];
  colorClass?: string;
}

const ConsultoriaSeo = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const seoPillarsData: SeoPillar[] = [
    { icon: <Cog className="w-7 h-7"/>, titleKey: "service_seo.pillar1_title", descriptionKey: "service_seo.pillar1_desc", detailsKeys: ["pillar1_details_item1", "pillar1_details_item2", "pillar1_details_item3", "pillar1_details_item4"], colorClass: "text-indigo-600 dark:text-indigo-400" },
    { icon: <PenTool className="w-7 h-7"/>, titleKey: "service_seo.pillar2_title", descriptionKey: "service_seo.pillar2_desc", detailsKeys: ["pillar2_details_item1", "pillar2_details_item2", "pillar2_details_item3"], colorClass: "text-sky-600 dark:text-sky-400"},
    { icon: <Lightbulb className="w-7 h-7"/>, titleKey: "service_seo.pillar3_title", descriptionKey: "service_seo.pillar3_desc", detailsKeys: ["pillar3_details_item1", "pillar3_details_item2", "pillar3_details_item3"], colorClass: "text-purple-600 dark:text-purple-400"},
    { icon: <Link2 className="w-7 h-7"/>, titleKey: "service_seo.pillar4_title", descriptionKey: "service_seo.pillar4_desc", detailsKeys: ["pillar4_details_item1", "pillar4_details_item2", "pillar4_details_item3"], colorClass: "text-fuchsia-600 dark:text-fuchsia-400"},
    { icon: <MapPin className="w-7 h-7"/>, titleKey: "service_seo.pillar5_title", descriptionKey: "service_seo.pillar5_desc", detailsKeys: ["pillar5_details_item1", "pillar5_details_item2", "pillar5_details_item3"], colorClass: "text-pink-600 dark:text-pink-400"},
    { icon: <Store className="w-7 h-7"/>, titleKey: "service_seo.pillar6_title", descriptionKey: "service_seo.pillar6_desc", detailsKeys: ["pillar6_details_item1", "pillar6_details_item2", "pillar6_details_item3"], colorClass: "text-rose-600 dark:text-rose-400"},
    { icon: <Cpu className="w-7 h-7"/>, titleKey: "service_seo.pillar7_title", descriptionKey: "service_seo.pillar7_desc", detailsKeys: ["pillar7_details_item1", "pillar7_details_item2", "pillar7_details_item3"], colorClass: "text-red-600 dark:text-red-400"},
  ];

  const methodologySteps = [
    { titleKey: "service_seo.methodology_step1_title", descriptionKey: "service_seo.methodology_step1_desc" },
    { titleKey: "service_seo.methodology_step2_title", descriptionKey: "service_seo.methodology_step2_desc" },
    { titleKey: "service_seo.methodology_step3_title", descriptionKey: "service_seo.methodology_step3_desc" },
    { titleKey: "service_seo.methodology_step4_title", descriptionKey: "service_seo.methodology_step4_desc" }
  ];

  const whyUsData = [
    { icon: <ShieldCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />, titleKey: "service_seo.why_us_item1_title", descriptionKey: "service_seo.why_us_item1_desc" },
    { icon: <Zap className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />, titleKey: "service_seo.why_us_item2_title", descriptionKey: "service_seo.why_us_item2_desc" },
    { icon: <Users className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-3" />, titleKey: "service_seo.why_us_item3_title", descriptionKey: "service_seo.why_us_item3_desc" }
  ];
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('service_seo.header_title'),
    "serviceType": "Consultoría en Optimización para Motores de Búsqueda (SEO)",
    "description": t('service_seo.meta_description'),
    "url": `https://alvarostrategy.com${location.pathname}`,
  };

  return (
    <>
      <SeoTags
        title={t('service_seo.meta_title')}
        description={t('service_seo.meta_description')}
        pathname={location.pathname}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup, null, 2)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white dark:from-indigo-700 dark:via-purple-800 dark:to-pink-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
              <Badge className="bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                <SearchCheck className="w-4 h-4 mr-2 inline-block" /> {t('service_seo.header_badge')}
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black leading-tight mb-5 sm:mb-6">
              {t('service_seo.header_title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl lg:text-2xl text-indigo-100/90 dark:text-indigo-200/90 mb-8 sm:mb-10 max-w-3xl mx-auto">
              <Trans i18nKey="service_seo.header_subtitle">...<strong className="font-semibold text-white">...</strong>...</Trans>
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button
                size="lg"
                className="group bg-white text-indigo-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate(getPath('routes.contact'), { state: { subject: t('service_seo.header_title') }})}
                aria-label={t('service_seo.header_cta_button')}
              >
                {t('service_seo.header_cta_button')}
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
                      <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />{t('nav.home')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                     <BreadcrumbLink asChild>
                      <Link to={getPath('routes.services')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('nav.services')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('service_seo.breadcrumb')}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
            
            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-10 md:mb-12 lg:mb-16 text-center prose prose-base sm:prose-lg max-w-3xl mx-auto prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-slate-100 prose-p:text-gray-600 dark:prose-p:text-slate-300 prose-p:mb-5 sm:prose-p:mb-6 prose-p:leading-relaxed sm:prose-p:leading-loose prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300 prose-strong:text-gray-800 dark:prose-strong:text-slate-100">
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
                <Trans i18nKey="service_seo.intro_title">...<span className="block sm:inline">...</span></Trans>
              </h2>
              <p>
                <Trans i18nKey="service_seo.intro_p1">...<strong className="font-semibold text-indigo-600 dark:text-indigo-400">...</strong>...</Trans>
              </p>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-12 md:mb-16 lg:mb-20">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                <Trans i18nKey="service_seo.pillars_title">...<span className="text-indigo-600 dark:text-indigo-400">...</span></Trans>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {seoPillarsData.map((pillar) => (
                  <motion.div key={pillar.titleKey} variants={fadeInUp} className="h-full flex">
                    <Card className="h-full bg-white dark:bg-slate-800/70 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-5 sm:p-6 border-t-4 border-indigo-500 dark:border-indigo-400 w-full flex flex-col">
                      <div className="flex justify-center mb-4">
                        {React.cloneElement(pillar.icon, {className: cn("w-8 h-8", pillar.colorClass)})}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 text-center">{t(pillar.titleKey)}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed text-center flex-grow">{t(pillar.descriptionKey)}</p>
                      {pillar.detailsKeys.length > 0 && (
                        <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                          <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mb-1.5 text-center font-medium">{t('service_seo.pillar1_details_title')}:</CardDescription>
                          <ul className="text-xs text-gray-500 dark:text-slate-400 space-y-1 text-center">
                            {pillar.detailsKeys.map(detailKey => <li key={detailKey}>{t(`service_seo.${detailKey}`)}</li>)}
                          </ul>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mb-12 md:mb-16 lg:mb-20">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100 text-center mb-10 md:mb-12 lg:mb-16">
                <Trans i18nKey="service_seo.methodology_title">...<span className="text-indigo-600 dark:text-indigo-400">...</span>...</Trans>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {methodologySteps.map((step, index) => (
                  <motion.div key={step.titleKey} variants={fadeInUp} className="flex flex-col items-center text-center bg-white dark:bg-slate-800/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-indigo-500 dark:bg-indigo-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold mb-4 shadow-md">{index + 1}</div>
                    <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">{t(step.titleKey)}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{t(step.descriptionKey)}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-12 md:mb-16 lg:mb-20 bg-indigo-50 dark:bg-indigo-900/30 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-indigo-200 dark:border-indigo-700/50">
              <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-300 text-center mb-8 sm:mb-10">{t('service_seo.why_us_title')}</motion.h2>
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
                {whyUsData.map((item) => (
                    <motion.div variants={fadeInUp} key={item.titleKey} className="flex flex-col items-center p-4">
                        {item.icon}
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">{t(item.titleKey)}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">{t(item.descriptionKey)}</p>
                    </motion.div>
                ))}
              </div>
            </motion.section>
            
            <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl shadow-2xl text-center">
              <BarChartHorizontalBig className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5 sm:mb-6 opacity-80" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">{t('service_seo.finalCta_title')}</h2>
              <p className="text-md sm:text-lg lg:text-xl text-indigo-100/90 dark:text-indigo-200/90 mb-8 max-w-2xl mx-auto leading-relaxed sm:leading-loose">{t('service_seo.finalCta_desc')}</p>
              <Button
                size="lg"
                className="group bg-white text-indigo-700 hover:bg-gray-100 dark:bg-slate-100 dark:hover:bg-slate-200 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                onClick={() => navigate(getPath('routes.contact'), { state: { subject: t('service_seo.header_title') }})}
                aria-label={t('service_seo.finalCta_button')}
              >
                {t('service_seo.finalCta_button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
              <p className="text-sm text-indigo-200/80 dark:text-indigo-300/80 mt-6 italic">{t('service_seo.finalCta_note')}</p>
            </motion.section>
            
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mt-12 md:mt-16 text-center">
                 <Button size="sm" variant="ghost" asChild className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
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

export default ConsultoriaSeo;