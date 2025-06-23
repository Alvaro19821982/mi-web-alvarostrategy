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
  Users,
  Target,
  Search,
  MessageSquare,
  Mail,
  Globe,
  BarChart3 as Tv,
  CheckCircle,
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

interface AcquisitionChannel {
    nameKey: string;
    icon: React.ReactElement;
    descriptionKey: string;
    colorClass?: string;
}

const Adquisicion = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const acquisitionChannels: AcquisitionChannel[] = [
    { nameKey: "method_acquisition.channel1_name", icon: <Search className="w-7 h-7"/>, descriptionKey: "method_acquisition.channel1_desc", colorClass: "text-indigo-600" },
    { nameKey: "method_acquisition.channel2_name", icon: <Tv className="w-7 h-7"/>, descriptionKey: "method_acquisition.channel2_desc", colorClass: "text-sky-600" },
    { nameKey: "method_acquisition.channel3_name", icon: <Users className="w-7 h-7"/>, descriptionKey: "method_acquisition.channel3_desc", colorClass: "text-rose-600" },
    { nameKey: "method_acquisition.channel4_name", icon: <Mail className="w-7 h-7"/>, descriptionKey: "method_acquisition.channel4_desc", colorClass: "text-amber-600" },
    { nameKey: "method_acquisition.channel5_name", icon: <Globe className="w-7 h-7"/>, descriptionKey: "method_acquisition.channel5_desc", colorClass: "text-purple-600" },
    { nameKey: "method_acquisition.channel6_name", icon: <MessageSquare className="w-7 h-7"/>, descriptionKey: "method_acquisition.channel6_desc", colorClass: "text-teal-600" },
  ];
  
  const pageTitle = t('method_acquisition.meta_title');
  const pageDescription = t('method_acquisition.meta_description');

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
        { "@type": "ListItem", "position": 3, "name": t('method_acquisition.breadcrumb') }
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
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white dark:from-indigo-700 dark:via-indigo-800 dark:to-purple-800"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to={getPath('routes.method')} className="inline-flex items-center text-indigo-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    {t('method_acquisition.back_to_method')}
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                {t('method_acquisition.phase_badge')}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-indigo-300 dark:text-indigo-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">A</span>
              {t('method_acquisition.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-indigo-100/90 dark:text-indigo-200/90 mb-3 font-semibold"
            >
              {t('method_acquisition.subtitle')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-indigo-200/80 dark:text-indigo-300/80 max-w-3xl mx-auto"
            >
             <Trans i18nKey="method_acquisition.intro">
                ...<strong className="font-semibold text-white">...</strong>...<strong className="font-semibold text-white">...</strong>...
             </Trans>
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20 main-content-acquisition">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        {t('nav.home')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={getPath('routes.method')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('methodPage.breadcrumb')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('method_acquisition.breadcrumb')}</BreadcrumbPage>
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
                         prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-indigo-500 dark:prose-blockquote:border-indigo-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-indigo-700 dark:text-indigo-400 flex-shrink-0" />
                {t('method_acquisition.section1_title')}
              </h2>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                <Trans i18nKey="method_acquisition.section1_p1">
                    ...<strong className="text-indigo-600 dark:text-indigo-400">...</strong>...
                </Trans>
              </p>
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                 <Trans i18nKey="method_acquisition.section1_blockquote">
                    ..."<strong className="font-semibold">...</strong>"...
                 </Trans>
              </blockquote>
              <h3 className="mt-8 sm:mt-10 mb-5 sm:mb-6 text-xl sm:text-2xl font-semibold dark:text-slate-100">{t('method_acquisition.section1_subtitle')}</h3>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                <Trans i18nKey="method_acquisition.section1_p2">
                    ...<strong className="text-indigo-600 dark:text-indigo-400">...</strong>...
                </Trans>
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
                <Trans i18nKey="method_acquisition.section2_title">Canales y estrategias de <span className="text-indigo-600 dark:text-indigo-400">adquisición que implementamos</span></Trans>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {acquisitionChannels.map((channel) => (
                  <motion.div key={channel.nameKey} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3 bg-slate-50 dark:bg-slate-800")}>
                         <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", channel.colorClass)}>
                           {React.cloneElement(channel.icon, {className: cn(channel.icon.props.className, channel.colorClass ? '' : 'text-indigo-600 dark:text-indigo-400')})}
                         </span>
                         <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {t(channel.nameKey)}
                          </CardTitle>
                         </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow">
                        <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{t(channel.descriptionKey)}</p>
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
              className="mb-10 md:mb-12 p-6 sm:p-8 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 rounded-xl shadow-lg"
            >
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 text-center sm:text-left">
                    {t('method_acquisition.section3_title')}
                </h3>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-5">
                    <Trans i18nKey="method_acquisition.section3_p1">
                      ...<strong className="text-indigo-600 dark:text-indigo-400">...</strong>...
                    </Trans>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm sm:text-base text-gray-700 dark:text-slate-300 mb-5">
                    {Array.from({ length: 9 }, (_, i) => `method_acquisition.section3_platform${i + 1}`).map(key => (
                        <div key={key} className="flex items-start">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5 sm:mt-1"/> 
                            <span>{t(key)}</span>
                        </div>
                    ))}
                </div>
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
                    <Trans i18nKey="method_acquisition.section3_p2">
                      ...<strong className="text-indigo-600 dark:text-indigo-400">...</strong>...
                    </Trans>
                </p>
            </motion.section>
            
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-12 md:mt-16 lg:mt-20 text-center"
            >
              <p className="text-md sm:text-lg text-gray-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                {t('method_acquisition.cta_text')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                 <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to={getPath('routes.method_brand')} aria-label={t('method_acquisition.cta_button_prev')}>
                        <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        {t('method_acquisition.cta_button_prev')}
                    </Link>
                </Button>
                <Button size="lg" asChild className="group bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to={getPath('routes.method_conversion')} aria-label={t('method_acquisition.cta_button_next')}>
                    {t('method_acquisition.cta_button_next')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
              </div>
               <div className="mt-8">
                 <Button size="sm" variant="ghost" asChild className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                    <Link to={getPath('routes.contact')} state={{ subject: t('method_acquisition.cta_button_contact') }}>
                        <Lightbulb className="w-4 h-4 mr-2" /> {t('method_acquisition.cta_button_contact')}
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

export default Adquisicion;