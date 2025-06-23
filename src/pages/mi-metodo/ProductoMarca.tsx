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
  Search,
  Lightbulb,
  Scaling,
  CheckCircle,
  Target,
  DollarSign,
  BarChart3,
  Users,
  Briefcase,
  FileText,
  AlertTriangle,
  Cog,
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

interface ContextItem {
    categoryKey: string;
    icon: React.ReactElement;
    introKey?: string;
    questionKeys: string[];
    pointKeys?: string[];
    colorClass?: string;
}

const ProductoMarca = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const location = useLocation();
  const navigate = useNavigate();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const contextItemsData: ContextItem[] = [
    { categoryKey: "method_brand.context_item1_category", icon: <Scaling className="w-7 h-7"/>, introKey: "method_brand.context_item1_intro", questionKeys: ["method_brand.context_item1_q1"], pointKeys: ["method_brand.context_item1_p1", "method_brand.context_item1_p2", "method_brand.context_item1_p3", "method_brand.context_item1_p4"], colorClass: "text-blue-600" },
    { categoryKey: "method_brand.context_item2_category", icon: <FileText className="w-7 h-7"/>, introKey: "method_brand.context_item2_intro", questionKeys: ["method_brand.context_item2_q1", "method_brand.context_item2_q2", "method_brand.context_item2_q3", "method_brand.context_item2_q4"], colorClass: "text-sky-600" },
    { categoryKey: "method_brand.context_item3_category", icon: <AlertTriangle className="w-7 h-7"/>, introKey: "method_brand.context_item3_intro", questionKeys: ["method_brand.context_item3_q1", "method_brand.context_item3_q2"], colorClass: "text-amber-600" },
    { categoryKey: "method_brand.context_item4_category", icon: <Target className="w-7 h-7"/>, introKey: "method_brand.context_item4_intro", questionKeys: ["method_brand.context_item4_q1", "method_brand.context_item4_q2", "method_brand.context_item4_q3"], colorClass: "text-green-600" },
    { categoryKey: "method_brand.context_item5_category", icon: <Briefcase className="w-7 h-7"/>, introKey: "method_brand.context_item5_intro", questionKeys: ["method_brand.context_item5_q1", "method_brand.context_item5_q2", "method_brand.context_item5_q3"], pointKeys: ["method_brand.context_item5_p1", "method_brand.context_item5_p2", "method_brand.context_item5_p3", "method_brand.context_item5_p4", "method_brand.context_item5_p5", "method_brand.context_item5_p6", "method_brand.context_item5_p7", "method_brand.context_item5_p8"], colorClass: "text-teal-600" },
    { categoryKey: "method_brand.context_item6_category", icon: <Users className="w-7 h-7"/>, introKey: "method_brand.context_item6_intro", questionKeys: ["method_brand.context_item6_q1", "method_brand.context_item6_q2", "method_brand.context_item6_q3"], pointKeys: ["method_brand.context_item6_p1", "method_brand.context_item6_p2", "method_brand.context_item6_p3", "method_brand.context_item6_p4", "method_brand.context_item6_p5", "method_brand.context_item6_p6", "method_brand.context_item6_p7"], colorClass: "text-purple-600" },
    { categoryKey: "method_brand.context_item7_category", icon: <Cog className="w-7 h-7"/>, introKey: "method_brand.context_item7_intro", questionKeys: ["method_brand.context_item7_q1", "method_brand.context_item7_q2", "method_brand.context_item7_q3"], pointKeys: ["method_brand.context_item7_p1", "method_brand.context_item7_p2", "method_brand.context_item7_p3", "method_brand.context_item7_p4", "method_brand.context_item7_p5", "method_brand.context_item7_p6"], colorClass: "text-slate-600" },
    { categoryKey: "method_brand.context_item8_category", icon: <DollarSign className="w-7 h-7"/>, introKey: "method_brand.context_item8_intro", questionKeys: ["method_brand.context_item8_q1", "method_brand.context_item8_q2", "method_brand.context_item8_q3", "method_brand.context_item8_q4"], colorClass: "text-lime-600" },
  ];

  const pageTitle = t('method_brand.meta_title');
  const pageDescription = t('method_brand.meta_description');

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
      "description": t('methodPage.meta_description'),
      "url": `https://alvarostrategy.com${getPath('routes.method')}`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": t('nav.home'), "item": `https://alvarostrategy.com/${currentLang}` },
        { "@type": "ListItem", "position": 2, "name": t('methodPage.breadcrumb'), "item": `https://alvarostrategy.com${getPath('routes.method')}` },
        { "@type": "ListItem", "position": 3, "name": t('method_brand.breadcrumb') }
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
          className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div variants={fadeInUp} className="mb-5">
                <Link to={getPath('routes.method')} className="inline-flex items-center text-blue-200 hover:text-white transition-colors group text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                    {t('method_brand.back_to_method')}
                </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-5 sm:mb-6 bg-white/10 dark:bg-white/5 border border-white/20 text-white px-4 py-1.5 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-sm">
                {t('method_brand.phase_badge')}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            >
              <span className="text-blue-300 dark:text-blue-400 text-7xl sm:text-8xl block mb-1 sm:mb-0">P</span>
              {t('method_brand.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-blue-100/90 dark:text-blue-200/90 mb-3 font-semibold"
            >
              {t('method_brand.subtitle')}
            </motion.p>
             <motion.p
              variants={fadeInUp}
              className="text-md sm:text-lg text-blue-200/80 dark:text-blue-300/80 max-w-3xl mx-auto"
            >
              <Trans i18nKey="method_brand.intro">
                Esta es la radiografía sin anestesia que necesitas. Conocer tu negocio, producto y marca a fondo es el primer paso ineludible para definir tu <strong className="font-semibold text-white">métrica norte (NSM)</strong> y trazar una hoja de ruta ganadora.
              </Trans>
            </motion.p>
          </div>
        </motion.section>

        <div className="py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mb-8 md:mb-10"
            >
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${currentLang}`} className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        {t('nav.home')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={getPath('routes.method')} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {t('methodPage.breadcrumb')}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('method_brand.breadcrumb')}</BreadcrumbPage>
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
                         prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300
                         prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                         prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400"
            >
              <h2 className="text-2xl sm:text-3xl flex items-center mb-6 sm:mb-8 dark:text-slate-100"> 
                <Search className="w-7 h-7 sm:w-8 sm:h-8 mr-3 text-blue-700 dark:text-blue-400 flex-shrink-0" />
                {t('method_brand.section1_title')}
              </h2>
              
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                <Trans i18nKey="method_brand.section1_p1">
                    ...<strong className="text-blue-600 dark:text-blue-400">...</strong>...<strong className="text-blue-600 dark:text-blue-400">...</strong>...<strong className="font-semibold">P</strong>...
                </Trans>
              </p>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                {t('method_brand.section1_p2')}
              </p>
              
              <blockquote className="border-l-4 pl-4 sm:pl-6 italic my-6 sm:my-8 py-2 sm:py-3">
                 <Trans i18nKey="method_brand.section1_blockquote">
                    ..."<strong className="font-semibold">BENEFICIO y una MARCA más fuerte</strong>"...
                 </Trans>
              </blockquote>
              <p className="mb-5 sm:mb-6 leading-relaxed sm:leading-loose">
                {t('method_brand.section1_p3')}
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
                <Trans i18nKey="method_brand.section2_title">
                    El contexto inicial <span className="text-blue-600 dark:text-blue-400">define gran parte de la estrategia</span>
                </Trans>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {contextItemsData.map((item) => (
                  <motion.div key={item.categoryKey} variants={fadeInUp} className="h-full flex">
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/70 dark:border-slate-700/50 rounded-xl overflow-hidden w-full bg-white dark:bg-slate-800/70 flex flex-col">
                      <CardHeader className={cn("p-5 sm:p-6 border-b dark:border-slate-700 flex flex-row items-start space-x-3", item.colorClass?.includes('bg-') ? item.colorClass : `bg-slate-50 dark:bg-slate-800`)}>
                        <span className={cn("flex-shrink-0 p-2 bg-opacity-10 rounded-md", item.colorClass?.includes('bg-') ? '' : item.colorClass)}>
                          {React.cloneElement(item.icon, {className: cn(item.icon.props.className, item.colorClass ? '' : 'text-blue-600 dark:text-blue-400')})}
                        </span>
                        <div>
                          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-slate-100">
                            {t(item.categoryKey)}
                          </CardTitle>
                           {item.introKey && <CardDescription className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">{t(item.introKey)}</CardDescription>}
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 sm:p-6 flex-grow">
                        <ul className="space-y-1.5 sm:space-y-2 list-disc list-inside">
                            {item.questionKeys.map((qKey, i) => (
                                <li key={i} className="text-gray-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{t(qKey)}</li>
                            ))}
                        </ul>
                        {item.pointKeys && item.pointKeys.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-slate-700">
                                <h4 className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold mb-2 tracking-wider">{t('context_item_considerations_label', 'Consideraciones / ejemplos:')}</h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {item.pointKeys.map(pKey => (
                                        <Badge key={pKey} variant="secondary" className="text-xs sm:text-sm bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-normal">
                                          {t(pKey)}
                                        </Badge>
                                    ))}
                                </div>
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
                {t('method_brand.cta_text')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" asChild className="group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full sm:w-auto transition-all duration-300 transform hover:scale-105">
                    <Link to={getPath('routes.method_acquisition')} aria-label="Continuar a la Fase de Adquisición">
                    {t('method_brand.cta_button_next')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="group border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full sm:w-auto transition-all duration-300">
                    <Link to={getPath('routes.contact')} state={{ subject: t('method_brand.cta_button_contact') }}>
                        {t('method_brand.cta_button_contact')}
                        <Lightbulb className="ml-2 w-5 h-5 group-hover:text-yellow-400 transition-colors" />
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

export default ProductoMarca;