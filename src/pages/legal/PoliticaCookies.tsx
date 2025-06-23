import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import { Home as HomeIcon, Cookie as CookieIcon, Edit, Trash2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cookies } from 'react-cookie-consent';
import { cn } from "@/lib/utils";
import SeoTags from '@/components/SeoTags';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface CookieInfo {
  name: string;
  providerKey: string;
  purposeKey: string;
  durationKey: string;
  typeKey: 'necessary' | 'analytics' | 'marketing' | 'functional' | 'preferences';
}

const GA_MEASUREMENT_ID = "G-KF8SBMFJMQ"; 

const PoliticaCookies = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key, { lng: currentLang })}`;

  const siteCookies: CookieInfo[] = [
    { name: "alvaroStrategyCookieConsent", providerKey: "cookies_policy_page.provider_own", purposeKey: "cookies_policy_page.cookie1_purpose", durationKey: "cookies_policy_page.cookie1_duration", typeKey: "necessary" },
    { name: "_ga", providerKey: "cookies_policy_page.provider_third", purposeKey: "cookies_policy_page.cookie2_purpose", durationKey: "cookies_policy_page.cookie2_duration", typeKey: "analytics" },
    { name: `_ga_${GA_MEASUREMENT_ID}`, providerKey: "cookies_policy_page.provider_third", purposeKey: "cookies_policy_page.cookie3_purpose", durationKey: "cookies_policy_page.cookie3_duration", typeKey: "analytics" },
  ];

  const domain = "https://alvarostrategy.com"; 
  const pageTitle = t('cookies_policy_page.meta_title');
  const pageDescription = t('cookies_policy_page.meta_description');

  const [consentGiven, setConsentGiven] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const consent = Cookies.get("alvaroStrategyCookieConsent");
    setConsentGiven(consent === 'true');
  }, []);

  const handleWithdrawConsent = () => {
    Cookies.remove("alvaroStrategyCookieConsent", { path: '/' }); 
    localStorage.removeItem('cookieConsent');
    const cookieDomain = `.${window.location.hostname.replace(/^www\./, '')}`;
    Cookies.remove("_ga", { path: '/', domain: cookieDomain });
    Cookies.remove(`_ga_${GA_MEASUREMENT_ID}`, { path: '/', domain: cookieDomain });
    setConsentGiven(false);
    alert(t('cookies_policy_page.consent_withdraw_alert'));
    window.location.reload(); 
  };

  const getCookieTypeClassName = (typeKey: string) => {
    switch (typeKey) {
      case 'necessary': return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case 'analytics': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
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
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('cookies_policy_page.breadcrumb')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <header className="mb-8 sm:mb-10 text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <CookieIcon className="w-4 h-4 mr-2"/>
                {t('cookies_policy_page.badge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 leading-tight">
              {t('cookies_policy_page.title')}
            </h1>
          </header>

          <article className="prose prose-base sm:prose-lg max-w-none dark:prose-invert 
                            prose-headings:font-semibold prose-headings:text-gray-800 dark:prose-headings:text-slate-200 
                            prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-4 prose-p:leading-relaxed
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                            prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                            prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1
                            prose-table:border prose-table:dark:border-slate-700 prose-th:p-2 prose-th:border prose-th:dark:border-slate-700 prose-td:p-2 prose-td:border prose-td:dark:border-slate-700">

            <p><Trans i18nKey="cookies_policy_page.intro_p1">...<Link to={getPath('routes.privacy_policy')}>...</Link>...</Trans></p>
            <p>{t('cookies_policy_page.intro_p2')}</p>
            <p><Trans i18nKey="cookies_policy_page.intro_p3">...<Link to={getPath('routes.privacy_policy')}>...</Link>...</Trans></p>
            <p>{t('cookies_policy_page.intro_p4', { domain })}</p>
            
            <div className="my-6 p-4 border border-dashed border-gray-300 dark:border-slate-700 rounded-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Edit className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />{t('cookies_policy_page.consent_management_title')}</h3>
                {consentGiven === undefined && <p className="text-sm text-gray-500 dark:text-slate-400">{t('cookies_policy_page.consent_loading')}</p>}
                {consentGiven === true && <p className="text-sm text-green-700 dark:text-green-400">{t('cookies_policy_page.consent_given')}</p>}
                {consentGiven === false && <p className="text-sm text-amber-700 dark:text-amber-400">{t('cookies_policy_page.consent_withdrawn')}</p>}
                <Button onClick={handleWithdrawConsent} variant="outline" size="sm" className="mt-3 text-red-600 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/30">
                    <Trash2 className="w-4 h-4 mr-2" /> {t('cookies_policy_page.consent_withdraw_button')}
                </Button>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">{t('cookies_policy_page.consent_withdraw_note')}</p>
            </div>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('cookies_policy_page.what_are_cookies_title')}</h2>
                <p>{t('cookies_policy_page.what_are_cookies_p1')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('cookies_policy_page.how_we_use_cookies_title')}</h2>
                <p>{t('cookies_policy_page.how_we_use_cookies_p1')}</p>
                <p>{t('cookies_policy_page.how_we_use_cookies_p2')}</p>
                <p>{t('cookies_policy_page.how_we_use_cookies_p3')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">{t('cookies_policy_page.types_of_cookies_title')}</h2>
                <p>{t('cookies_policy_page.types_of_cookies_p1')}</p>
                <ul>
                    <li><strong>{t('cookies_policy_page.type_essential_title')}</strong> {t('cookies_policy_page.type_essential_desc')}</li>
                    <li><strong>{t('cookies_policy_page.type_analytics_title')}</strong> <Trans i18nKey="cookies_policy_page.type_analytics_desc"><strong className="text-sm">...</strong></Trans></li>
                    <li><strong>{t('cookies_policy_page.type_functional_title')}</strong> <Trans i18nKey="cookies_policy_page.type_functional_desc"><strong className="text-sm">...</strong></Trans></li>
                    <li><strong>{t('cookies_policy_page.type_preferences_title')}</strong> {t('cookies_policy_page.type_preferences_desc')}</li>
                    <li><strong>{t('cookies_policy_page.type_marketing_title')}</strong> {t('cookies_policy_page.type_marketing_desc')}</li>
                </ul>
                
                <div className="my-8 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-3">{t('cookies_policy_page.cookie_list_title')}</h3>
                    <p className="text-sm mb-4 text-gray-600 dark:text-slate-400">{t('cookies_policy_page.cookie_list_desc')}</p>
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-800">
                            <tr>
                                <th className="text-left p-2">{t('cookies_policy_page.cookie_table_name')}</th>
                                <th className="text-left p-2">{t('cookies_policy_page.cookie_table_provider')}</th>
                                <th className="text-left p-2">{t('cookies_policy_page.cookie_table_purpose')}</th>
                                <th className="text-left p-2">{t('cookies_policy_page.cookie_table_duration')}</th>
                                <th className="text-left p-2">{t('cookies_policy_page.cookie_table_type')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siteCookies.map(cookie => (
                                <tr key={cookie.name} className="border-b dark:border-slate-700">
                                    <td className="p-2 font-mono text-xs">{cookie.name}</td>
                                    <td className="p-2">{t(cookie.providerKey)}</td>
                                    <td className="p-2">{t(cookie.purposeKey)}</td>
                                    <td className="p-2">{t(cookie.durationKey)}</td>
                                    <td className="p-2"><Badge variant="secondary" className={cn(getCookieTypeClassName(cookie.typeKey))}>{t(`cookies_policy_page.cookie_type_${cookie.typeKey}`)}</Badge></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     <p className="text-xs text-gray-500 dark:text-slate-500 mt-3"><i>{t('cookies_policy_page.cookie_note')}</i></p>
                </div>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl mb-3">{t('cookies_policy_page.how_to_control_title')}</h2>
                <p>{t('cookies_policy_page.how_to_control_p1')}</p>
                <p>{t('cookies_policy_page.how_to_control_p2')}</p>
                <p>
                  <Trans i18nKey="cookies_policy_page.how_to_control_p3">
                    ...<a href="https://www.wikipedia.org" target="_blank" rel="noopener noreferrer nofollow">...</a>...<a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer nofollow">...</a>...
                  </Trans>
                </p>
            </section>
          </article>
        </motion.div>
      </div>
    </>
  );
};

export default PoliticaCookies;