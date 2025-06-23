// src/pages/legal/PoliticaPrivacidad.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import { Home as HomeIcon, ShieldCheck } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import SeoTags from '@/components/SeoTags';
import { routesConfig } from '@/routes'; // Importamos routesConfig

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PoliticaPrivacidad = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const location = useLocation();

  const getPath = (key: string) => {
    const route = routesConfig.find(r => r.key === key);
    if (!route || !route.paths || !(currentLang in route.paths)) {
      return `/${currentLang}`;
    }
    const path = route.paths[currentLang as keyof typeof route.paths];
    return `/${currentLang}/${path}`;
  };

  const domain = "alvarostrategy.com"; 
  const emailContactoLegal = "alvaro@ignovadigital.com"; 

  const pageTitle = t('privacy_policy_page.meta_title');
  const pageDescription = t('privacy_policy_page.meta_description');

  // CORRECCIÓN: Creamos un array con los datos para poder filtrarlos
  const identificationData = [
    { label: t('legal_notice_page.section1_item1_label'), value: t('legal_notice_page.section1_item1_value') },
    { label: t('legal_notice_page.section1_item2_label'), value: t('legal_notice_page.section1_item2_value') },
    { label: t('legal_notice_page.section1_item3_label'), value: t('legal_notice_page.section1_item3_value') },
    { label: t('legal_notice_page.section1_item4_label'), value: <a href={`mailto:${emailContactoLegal}`}>{emailContactoLegal}</a> },
    { label: t('legal_notice_page.section1_item5_label'), value: <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">{domain}</a> },
  ].filter(item => item.label && item.value);

  return (
    <>
      <SeoTags
        title={pageTitle}
        description={pageDescription}
        pathname={location.pathname}
      />
      
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp} 
          className="max-w-3xl mx-auto px-4 sm:px-6"
        >
          <div className="mb-8 md:mb-10">
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
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('privacy_policy_page.breadcrumb')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <header className="mb-8 sm:mb-10 text-center">
             <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <ShieldCheck className="w-4 h-4 mr-2"/>
                {t('privacy_policy_page.badge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 leading-tight">
              {t('privacy_policy_page.title')}
            </h1>
          </header>

          <article className="prose prose-base sm:prose-lg max-w-none dark:prose-invert 
                            prose-headings:font-semibold prose-headings:text-gray-800 dark:prose-headings:text-slate-200 
                            prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-4 prose-p:leading-relaxed
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                            prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                            prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1">
            
            <p>{t('privacy_policy_page.intro_p1', { domain })}</p>
            <p>{t('privacy_policy_page.intro_p2')}</p>
            <p><Trans i18nKey="privacy_policy_page.intro_p3"><Link to={getPath('legal_notice')}>...</Link></Trans></p>

            <section className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h2 className="text-xl sm:text-2xl mb-3">{t('legal_notice_page.section1_title')}</h2>
               {/* CORRECCIÓN: Usamos el array de datos filtrados para mostrar la información */}
              <ul>
                {identificationData.map((item, index) => (
                    <li key={index}><strong>{item.label}</strong> {item.value}</li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section2_title')}</h2>
              <p>{t('privacy_policy_page.section2_p1')}</p>
              <ul>
                <li><strong>{t('privacy_policy_page.section2_item1_title')}</strong> {t('privacy_policy_page.section2_item1_desc')}</li>
                <li><strong>{t('privacy_policy_page.section2_item2_title')}</strong> {t('privacy_policy_page.section2_item2_desc')}</li>
                <li><strong>{t('privacy_policy_page.section2_item3_title')}</strong> {t('privacy_policy_page.section2_item3_desc')}</li>
                <li><strong>{t('privacy_policy_page.section2_item4_title')}</strong> {t('privacy_policy_page.section2_item4_desc')}</li>
              </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section3_title')}</h2>
                <p>{t('privacy_policy_page.section3_p1', { domain })}</p>
                <ul>
                    <li>{t('privacy_policy_page.section3_item1')}</li>
                </ul>
            </section>
            
            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section4_title')}</h2>
                <p>{t('privacy_policy_page.section4_p1')}</p>
                <ul>
                    <li>{t('privacy_policy_page.section4_item1')}</li>
                    <li>{t('privacy_policy_page.section4_item2')}</li>
                    <li>{t('privacy_policy_page.section4_item3')}</li>
                    <li>{t('privacy_policy_page.section4_item4')}</li>
                </ul>
                <p>{t('privacy_policy_page.section4_p2')}</p>
                <p>{t('privacy_policy_page.section4_p3')}</p>
                <p><Trans i18nKey="privacy_policy_page.section4_p4" values={{ email: emailContactoLegal }}>...<a href={`mailto:${emailContactoLegal}`}>...</a>...</Trans></p>
                <p>{t('privacy_policy_page.section4_p5')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section5_title')}</h2>
                <p><Trans i18nKey="privacy_policy_page.section5_p1"><Link to={getPath('legal_notice')}>...</Link></Trans></p>
                <p>{t('privacy_policy_page.section5_p2')}</p>
                <ul>
                    <li><strong>{t('privacy_policy_page.section5_item1_title')}</strong> {t('privacy_policy_page.section5_item1_desc')}</li>
                </ul>
                <p>{t('privacy_policy_page.section5_p3')}</p>
                 <ul>
                    <li><Trans i18nKey="privacy_policy_page.section5_item2_desc"><Link to={getPath('legal_notice')}>...</Link></Trans></li>
                    <li>{t('privacy_policy_page.section5_item3_desc')}</li>
                    <li><Trans i18nKey="privacy_policy_page.section5_item4_desc"><Link to={getPath('cookies_policy')}>...</Link></Trans></li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section6_title')}</h2>
                <p>{t('privacy_policy_page.section6_p1')}</p>
                <p>{t('privacy_policy_page.section6_p2')}</p>
                <p>{t('privacy_policy_page.section6_p3')}</p>
                <p>{t('privacy_policy_page.section6_p4')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section7_title')}</h2>
                <p>{t('privacy_policy_page.section7_p1')}</p>
                <p>{t('privacy_policy_page.section7_p2')}</p>
            </section>

             <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section8_title')}</h2>
                <p><Trans i18nKey="privacy_policy_page.section8_p1"><Link to={getPath('cookies_policy')}>...</Link></Trans></p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section9_title')}</h2>
                <p>{t('privacy_policy_page.section9_p1')}</p>
                <p>{t('privacy_policy_page.section9_p2')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section10_title')}</h2>
                <p>{t('privacy_policy_page.section10_p1')}</p>
                <ul>
                    <li>{t('privacy_policy_page.section10_item1')}</li>
                </ul>
                <p>{t('privacy_policy_page.section10_p2')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section11_title')}</h2>
                <p>{t('privacy_policy_page.section11_p1')}</p>
            </section>

             <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section12_title')}</h2>
                <p>{t('privacy_policy_page.section12_p1', { domain })}</p>
                <p>{t('privacy_policy_page.section12_p2')}</p>
                <ul>
                    <li>{t('privacy_policy_page.section12_item1')}</li>
                </ul>
                <p>{t('privacy_policy_page.section12_p3')}</p>
                <p>{t('privacy_policy_page.section12_p4')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section13_title')}</h2>
                <p>{t('privacy_policy_page.section13_p1')}</p>
                <p>{t('privacy_policy_page.section13_p2')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section14_title')}</h2>
                <p>{t('privacy_policy_page.section14_p1')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section15_title')}</h2>
                <p><Trans i18nKey="privacy_policy_page.section15_p1" values={{ email: emailContactoLegal }}>...<a href={`mailto:${emailContactoLegal}`}>...</a>...</Trans></p>
                <p>{t('privacy_policy_page.section15_p2')}</p>
            </section>

            <section> 
                <h2 className="text-xl sm:text-2xl mb-3">{t('privacy_policy_page.section16_title')}</h2>
                <p>{t('privacy_policy_page.section16_p1')}</p>
                <p>{t('privacy_policy_page.section16_p2')}</p>
            </section>
          </article>
        </motion.div>
      </div>
    </>
  );
};

export default PoliticaPrivacidad;