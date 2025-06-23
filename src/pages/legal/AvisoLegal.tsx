// src/pages/legal/AvisoLegal.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { routesConfig } from '@/routes';
import { Helmet } from 'react-helmet-async';
import SeoTags from '@/components/SeoTags';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Home as HomeIcon, FileText as FileTextIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const LegalNoticePage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;

  const getPath = (key: string) => {
    const route = routesConfig.find(r => r.key === key);
    if (!route || !route.paths || !(currentLang in route.paths)) {
      return `/${currentLang}`;
    }
    const path = route.paths[currentLang as keyof typeof route.paths];
    return `/${currentLang}/${path}`;
  };

  const domain = "alvarostrategy.com";
  const email = "alvaro@ignovadigital.com";

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // CORRECCIÓN: Crear un array con los datos para poder filtrarlos
  const identificationData = [
    { label: t('legal_notice_page.section1_item1_label'), value: t('legal_notice_page.section1_item1_value') },
    { label: t('legal_notice_page.section1_item2_label'), value: t('legal_notice_page.section1_item2_value') },
    { label: t('legal_notice_page.section1_item3_label'), value: t('legal_notice_page.section1_item3_value') },
    { label: t('legal_notice_page.section1_item4_label'), value: <a href={`mailto:${email}`}>{email}</a> },
    { label: t('legal_notice_page.section1_item5_label'), value: <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">{domain}</a> },
  ].filter(item => item.label && item.value); // Filtramos los elementos que no tienen valor

  return (
    <>
      <SeoTags
        title={t('legal_notice_page.meta_title')}
        description={t('legal_notice_page.meta_description')}
        pathname={location.pathname}
      />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/${currentLang}`} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                    <HomeIcon className="h-4 w-4 mr-1.5" />{t('nav.home')}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">{t('legal_notice_page.breadcrumb')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <header className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            <FileTextIcon className="w-4 h-4 mr-2" />{t('legal_notice_page.badge')}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900">{t('legal_notice_page.title')}</h1>
        </header>

        <div className="prose prose-lg max-w-none mx-auto text-gray-700">
          <section id="identificacion">
            <h2>{t('legal_notice_page.section1_title')}</h2>
            <p>{t('legal_notice_page.section1_p1')}</p>
            <ul>
              {/* CORRECCIÓN: Mapeamos los datos filtrados para no renderizar líneas vacías */}
              {identificationData.map((item, index) => (
                 <li key={index}><strong>{item.label}</strong> {item.value}</li>
              ))}
            </ul>
          </section>

          <section id="condiciones-uso">
            <h2>{t('legal_notice_page.section2_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('legal_notice_page.section2_p1', {
              link1: `<a href='${getPath('legal_notice')}' class='text-blue-600 hover:underline'>${t('legal_notice_page.section2_link1')}</a>`,
              link2: `<a href='${getPath('privacy_policy')}' class='text-blue-600 hover:underline'>${t('legal_notice_page.section2_link2')}</a>`,
              link3: `<a href='${getPath('cookies_policy')}' class='text-blue-600 hover:underline'>${t('legal_notice_page.section2_link3')}</a>`,
            })}} />
            <p>{t('legal_notice_page.section2_p2')}</p>
            <p>{t('legal_notice_page.section2_p3')}</p>
            <p>{t('legal_notice_page.section2_p4')}</p>
            <p>{t('legal_notice_page.section2_p5')}</p>
          </section>

           <section id="seguridad">
            <h2>{t('legal_notice_page.section3_title')}</h2>
            <p>{t('legal_notice_page.section3_p1')}</p>
            <p>{t('legal_notice_page.section3_p2')}</p>
          </section>

          <section id="datos-personales">
            <h2>{t('legal_notice_page.section4_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('legal_notice_page.section4_p1', {
                 link1: `<a href='${getPath('privacy_policy')}' class='text-blue-600 hover:underline'>${t('privacy_policy_page.breadcrumb')}</a>`
            })}} />
          </section>

          <section id="contenidos">
            <h2>{t('legal_notice_page.section5_title')}</h2>
            <p>{t('legal_notice_page.section5_p1')}</p>
            <p>{t('legal_notice_page.section5_p2')}</p>
            <p>{t('legal_notice_page.section5_p3', { domain })}</p>
            <p>{t('legal_notice_page.section5_p4', { domain })}</p>
            <p>{t('legal_notice_page.section5_p5')}</p>
          </section>

          <section id="cookies">
            <h2>{t('legal_notice_page.section6_title')}</h2>
             <p dangerouslySetInnerHTML={{ __html: t('legal_notice_page.section6_p1', {
                 link1: `<a href='${getPath('cookies_policy')}' class='text-blue-600 hover:underline'>${t('cookies_policy_page.breadcrumb')}</a>`
            })}} />
          </section>

          <section id="enlaces-externos">
            <h2>{t('legal_notice_page.section7_title')}</h2>
            <p>{t('legal_notice_page.section7_p1', { domain })}</p>
            <p>{t('legal_notice_page.section7_p2')}</p>
            <p>{t('legal_notice_page.section7_p3')}</p>
            <p>{t('legal_notice_page.section7_p4')}</p>
            <p>{t('legal_notice_page.section7_p5', { domain })}</p>
          </section>

          <section id="propiedad-intelectual">
            <h2>{t('legal_notice_page.section8_title')}</h2>
            <p>{t('legal_notice_page.section8_p1')}</p>
            <p>{t('legal_notice_page.section8_p2')}</p>
          </section>

          <section id="limitacion-responsabilidad">
            <h2>{t('legal_notice_page.section9_title')}</h2>
            <p>{t('legal_notice_page.section9_p1')}</p>
            <p>{t('legal_notice_page.section9_p2')}</p>
          </section>

          <section id="contacto-legal">
            <h2>{t('legal_notice_page.section10_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('legal_notice_page.section10_p1', {
              email,
              link1: `<a href='mailto:${email}' class='text-blue-600 hover:underline'>${email}</a>`,
              link2: `<a href='${getPath('contact')}' class='text-blue-600 hover:underline'>${t('nav.contact')}</a>`
            })}} />
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default LegalNoticePage;