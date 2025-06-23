// src/pages/Contacto.tsx (Código completo con correcciones)
import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SeoTags from '@/components/SeoTags';
import {
    Mail,
    Phone,
    Send,
    CalendarCheck,
    Info,
    Home as HomeIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      staggerChildren: 0.1,
      delayChildren: 0.15,
      ease: "easeOut"
    }
  }
};

const Contacto = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const getPath = (key: string) => `/${currentLang}/${t(key)}`;

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: location.state?.subject || "",
    message: "",
    _replyto: ""
  });
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [formStatus, setFormStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/meokeeqj";

  useEffect(() => {
    if (location.state?.subject && location.state.subject !== contactForm.subject) {
      setContactForm(prev => ({ ...prev, subject: location.state.subject }));
    }
  }, [location.state?.subject, contactForm.subject]);


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
        ...prev,
        [name]: value,
        ...(name === 'email' && { _replyto: value })
    }));
  }, []);

  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyPolicyAccepted) {
      setFormStatus({ message: t('contactPage.form_privacy_error'), type: 'error' });
      return;
    }

    setFormStatus({ message: t('contactPage.form_status_sending'), type: '' });
    try {
      const formDataToSend = { ...contactForm };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        setFormStatus({ message: t('contactPage.form_status_success'), type: 'success' });
        setContactForm({ name: "", email: "", phone: "", subject: "", message: "", _replyto: "" });
        setPrivacyPolicyAccepted(false);
        if (location.state?.subject) {
          navigate(location.pathname, { replace: true, state: {} });
        }
      } else {
        const data = await response.json();
        if (data.errors) {
          const errorMessage = data.errors.map((error: { field?: string, code?: string, message: string }) => error.message).join(", ");
          throw new Error(errorMessage);
        }
        throw new Error(t('contactPage.form_status_error_generic'));
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setFormStatus({ message: `${t('contactPage.form_status_error_prefix')}${error.message || t('contactPage.form_status_error_default')}`, type: 'error' });
    }
  }, [contactForm, privacyPolicyAccepted, navigate, location.pathname, location.state?.subject, FORMSPREE_ENDPOINT, t]);

  const pageTitle = t('contactPage.meta_title');
  const pageDescription = t('contactPage.meta_description');
  const userEmail = "alvaro@ignovadigital.com";
  // --- MODIFICACIÓN DE TELÉFONOS ---
  // He reemplazado las variables únicas de teléfono por un array de objetos
  // para poder mostrar ambos números de forma estructurada.
  const phoneNumbers = [
    { display: "+34 627 519 521", href: "+34627519521", label: t('contactPage.other_contact_phone_label_spain', { defaultValue: "Teléfono (España)"}) },
    { display: "+32 486 523 995", href: "+32486523995", label: t('contactPage.other_contact_phone_label_belgium', { defaultValue: "Teléfono (Bélgica)"}) }
  ];
  // --- FIN DE MODIFICACIÓN ---
  const calendlyLink = "https://calendly.com/a-fernandez82/30min";

  return (
    <>
      <SeoTags
        title={pageTitle}
        description={pageDescription}
        pathname={location.pathname}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/30 to-indigo-100/20 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/20 text-gray-800 dark:text-slate-200 py-12 sm:py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-4 sm:px-6"
        >
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-8 md:mb-10">
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
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">{t('contactPage.breadcrumb')}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

          <motion.header
            variants={fadeInUp}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <Send className="w-5 h-5 mr-2 inline-block" /> {t('contactPage.header_badge')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              {t('contactPage.header_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
              {t('contactPage.header_subtitle')}
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
          </motion.header>

          <motion.div
            variants={staggerContainer}
            className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <Card className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200/60 dark:border-slate-700/50">
                <CardHeader className="p-6 sm:p-8 border-b border-gray-200/60 dark:border-slate-700">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-blue-600 dark:text-blue-400" />
                    {t('contactPage.form_title')}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    {t('contactPage.form_subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-5 sm:space-y-6">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">{t('contactPage.form_name_label')} <span className="text-red-500">*</span></Label>
                      <Input type="text" name="name" id="name" placeholder={t('contactPage.form_name_placeholder')} value={contactForm.name} onChange={handleInputChange} required className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">{t('contactPage.form_email_label')} <span className="text-red-500">*</span></Label>
                      <Input type="email" name="email" id="email" placeholder={t('contactPage.form_email_placeholder')} value={contactForm.email} onChange={handleInputChange} required className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                     <div>
                      <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">{t('contactPage.form_phone_label')}</Label>
                      <Input type="tel" name="phone" id="phone" placeholder={t('contactPage.form_phone_placeholder')} value={contactForm.phone} onChange={handleInputChange} className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">{t('contactPage.form_subject_label')}</Label>
                      <Input type="text" name="subject" id="subject" placeholder={t('contactPage.form_subject_placeholder')} value={contactForm.subject} onChange={handleInputChange} className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">{t('contactPage.form_message_label')} <span className="text-red-500">*</span></Label>
                      <Textarea name="message" id="message" rows={5} placeholder={t('contactPage.form_message_placeholder')} value={contactForm.message} onChange={handleInputChange} required className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 min-h-[120px]" />
                    </div>
                    <div className="flex items-start space-x-2.5 sm:space-x-3">
                      <Checkbox
                        id="privacyPolicy"
                        checked={privacyPolicyAccepted}
                        onCheckedChange={(checked) => setPrivacyPolicyAccepted(checked as boolean)}
                        className="mt-0.5 border-gray-400 dark:border-slate-500 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                        aria-label={t('contactPage.form_privacy_label', { returnObjects: true })[0]}
                      />
                      <Label htmlFor="privacyPolicy" className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-snug">
                        <Trans i18nKey="contactPage.form_privacy_label">
                          ...<Link to={getPath('routes.privacy_policy')} className="text-blue-600 dark:text-blue-400 hover:underline">...</Link>...<Link to={getPath('routes.legal_notice')} className="text-blue-600 dark:text-blue-400 hover:underline">...</Link>...
                        </Trans> <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:py-3.5 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                      disabled={formStatus.message === t('contactPage.form_status_sending')}
                      aria-label={t('contactPage.form_submit_button')}
                    >
                      <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      {formStatus.message === t('contactPage.form_status_sending') ? t('contactPage.form_sending_button') : t('contactPage.form_submit_button')}
                    </Button>
                    {formStatus.message && (
                      <p className={`mt-4 text-sm text-center font-medium ${formStatus.type === 'success' ? 'text-green-600 dark:text-green-400' : formStatus.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-blue-700 dark:text-blue-300'}`}>
                        {formStatus.message}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6 sm:space-y-8">
              <Card className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/60 dark:border-slate-700/50">
                <CardHeader className="p-5 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                    <CalendarCheck className="w-6 h-6 mr-2.5 sm:mr-3 text-blue-600 dark:text-blue-400" />
                    {t('contactPage.calendly_title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6 pt-0 sm:pt-0">
                  <p className="text-gray-600 dark:text-slate-300 mb-4 text-sm sm:text-base leading-relaxed">
                    {t('contactPage.calendly_desc')}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all hover:scale-[1.02]"
                  >
                    <a href={calendlyLink} target="_blank" rel="noopener noreferrer" aria-label={t('contactPage.calendly_button')}>
                      <CalendarCheck className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      {t('contactPage.calendly_button')}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/60 dark:border-slate-700/50">
                <CardHeader className="p-5 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                     <Info className="w-6 h-6 mr-2.5 sm:mr-3 text-indigo-600 dark:text-indigo-400" />
                    {t('contactPage.other_contact_title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm sm:text-base p-5 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-slate-200 block">{t('contactPage.other_contact_email_label')}</span>
                      <a href={`mailto:${userEmail}`} className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">{userEmail}</a>
                    </div>
                  </div>
                  {/* --- MODIFICACIÓN DE TELÉFONOS --- */}
                  {/* He mapeado el array de números para mostrarlos dinámicamente. */}
                  {phoneNumbers.map((phone) => (
                    <div key={phone.href} className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-slate-200 block">{phone.label}</span>
                        <a href={`tel:${phone.href}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{phone.display}</a>
                      </div>
                    </div>
                  ))}
                  {/* --- FIN DE MODIFICACIÓN --- */}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.section
            variants={fadeInUp}
            className="mt-12 md:mt-16 lg:mt-20"
          >
            <Card className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 dark:border-slate-700/50">
              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                  <Info className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-blue-600 dark:text-blue-400" />
                  {t('contactPage.next_steps_title')}
                </CardTitle>
                 <CardDescription className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    {t('contactPage.next_steps_subtitle')}
                  </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-slate-300 space-y-3 text-sm sm:text-base leading-relaxed sm:leading-loose p-6 sm:p-8 pt-0 sm:pt-0">
                <p><strong className="text-gray-700 dark:text-slate-100">{t('contactPage.next_steps_step1_title')}</strong> {t('contactPage.next_steps_step1_desc')}</p>
                <p><strong className="text-gray-700 dark:text-slate-100">{t('contactPage.next_steps_step2_title')}</strong> {t('contactPage.next_steps_step2_desc')}</p>
                <p><strong className="text-gray-700 dark:text-slate-100">{t('contactPage.next_steps_step3_title')}</strong> {t('contactPage.next_steps_step3_desc')}</p>
                <p><strong className="text-gray-700 dark:text-slate-100">{t('contactPage.next_steps_step4_title')}</strong> {t('contactPage.next_steps_step4_desc')}</p>
              </CardContent>
            </Card>
          </motion.section>

          <motion.div variants={fadeInUp} className="text-center mt-10 md:mt-12 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            <p>
              <Trans i18nKey="contactPage.form_footer_text">
                ...<Link to={getPath('routes.privacy_policy')} className="text-blue-600 dark:text-blue-400 hover:underline">...</Link>...<Link to={getPath('routes.legal_notice')} className="text-blue-600 dark:text-blue-400 hover:underline">...</Link>.
              </Trans>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
};

export default Contacto;