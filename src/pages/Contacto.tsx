import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Mail,
    Phone,
    Send,
    CalendarCheck,
    Info,
    Home as HomeIcon,
    // ArrowRight, // No se usa directamente aquí, pero podría si añades más CTAs
    // Briefcase // No se usa directamente aquí
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { cn } from "@/lib/utils"; // No se usa cn directamente en este archivo


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
  const navigate = useNavigate();
  const location = useLocation();

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
      setFormStatus({ message: 'Debes aceptar la política de privacidad para continuar.', type: 'error' });
      return;
    }
    
    setFormStatus({ message: 'Enviando mensaje...', type: '' });
    try {
      const formDataToSend = { 
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        subject: contactForm.subject,
        message: contactForm.message,
        _replyto: contactForm.email 
      };

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        setFormStatus({ message: '¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.', type: 'success' });
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
        throw new Error('Error al enviar el formulario a Formspree.');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setFormStatus({ message: `Hubo un error al enviar tu mensaje: ${error.message || 'Por favor, inténtalo de nuevo más tarde.'}`, type: 'error' });
    }
  }, [contactForm, privacyPolicyAccepted, navigate, location.pathname, location.state?.subject, FORMSPREE_ENDPOINT]);

  const domain = "https://alvarostrategy.com"; 
  const pageUrl = `${domain}/contacto`;
  const pageTitle = "Contacto - Hablemos de tu estrategia digital | AlvaroStrategy";
  const pageDescription = "Contacta con Álvaro Fernández de Celis para una sesión estratégica gratuita y descubre cómo podemos impulsar tu negocio con SEO, inteligencia artificial y marketing digital efectivo.";

  const userEmail = "alvaro@ignovadigital.com";
  const userPhone = "+34661542847";
  const userPhoneDisplay = "+34 661 542 847";


  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "inLanguage": "es-ES",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Contacto" }
      ]
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "AlvaroStrategy",
      "url": domain,
      "logo": `${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp`, 
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": userPhone,
          "contactType": "customer support", 
          "areaServed": "ES", // Podría ser ["ES", "BE"]
          "availableLanguage": ["Spanish", "English"],
          "contactOption": ["TollFree", "HearingImpairedSupported"] // Opcional, ajustar si aplica
        },
        {
          "@type": "ContactPoint",
          "email": userEmail,
          "contactType": "customer support",
          "availableLanguage": ["Spanish", "English"]
        }
      ],
    },
    "potentialAction": {
        "@type": "CommunicateAction",
        "name": "Enviar consulta o solicitar sesión estratégica",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": pageUrl
        }
    }
  };

  const calendlyLink = "https://calendly.com/a-fernandez82/30min";


  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${domain}/images/og-contacto-alvarostrategy.webp`} /> 
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${domain}/images/twitter-contacto-alvarostrategy.webp`} /> 
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

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
                      <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        Inicio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Contacto</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>

          <motion.header
            variants={fadeInUp}
            className="text-center mb-10 md:mb-12 lg:mb-16"
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-xl cursor-default">
              <Send className="w-5 h-5 mr-2 inline-block" /> ¡Conectemos!
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-slate-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight mb-4">
              Hablemos: ¿listo para impulsar tu negocio?
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
              Estoy aquí para ayudarte a trazar la estrategia que tu negocio necesita para despegar. Completa el formulario de consulta o utiliza mis datos de contacto directo. ¡Espero tu mensaje para empezar a construir juntos!
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
                    Envíanos tu consulta
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Rellena los campos y te responderé lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-5 sm:space-y-6">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Nombre completo <span className="text-red-500">*</span></Label>
                      <Input type="text" name="name" id="name" placeholder="Tu nombre y apellidos" value={contactForm.name} onChange={handleInputChange} required className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Email <span className="text-red-500">*</span></Label>
                      <Input type="email" name="email" id="email" placeholder="tu@emaildeempresa.com" value={contactForm.email} onChange={handleInputChange} required className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                     <div>
                      <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Teléfono (opcional)</Label>
                      <Input type="tel" name="phone" id="phone" placeholder="Tu número de teléfono" value={contactForm.phone} onChange={handleInputChange} className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Asunto</Label>
                      <Input type="text" name="subject" id="subject" placeholder="Ej: Consulta estrategia SEO, Propuesta IA..." value={contactForm.subject} onChange={handleInputChange} className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">Tu mensaje <span className="text-red-500">*</span></Label>
                      <Textarea name="message" id="message" rows={5} placeholder="Cuéntame sobre tu proyecto, tus desafíos actuales y tus objetivos a futuro..." value={contactForm.message} onChange={handleInputChange} required className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 min-h-[120px]" />
                    </div>
                    <div className="flex items-start space-x-2.5 sm:space-x-3">
                      <Checkbox
                        id="privacyPolicy"
                        checked={privacyPolicyAccepted}
                        onCheckedChange={(checked) => setPrivacyPolicyAccepted(checked as boolean)}
                        className="mt-0.5 border-gray-400 dark:border-slate-500 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                        aria-label="Aceptar política de privacidad"
                      />
                      <Label htmlFor="privacyPolicy" className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-snug">
                        He leído y acepto la <Link to="/politica-privacidad" className="text-blue-600 dark:text-blue-400 hover:underline">política de privacidad</Link> y el <Link to="/aviso-legal" className="text-blue-600 dark:text-blue-400 hover:underline">aviso legal</Link>. <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:py-3.5 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                      disabled={formStatus.message === 'Enviando mensaje...'}
                      aria-label="Enviar mensaje y solicitar sesión"
                    >
                      <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      {formStatus.message === 'Enviando mensaje...' ? 'Enviando...' : 'Enviar mensaje y solicitar sesión'}
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
                    Agenda tu sesión directamente
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 sm:p-6 pt-0 sm:pt-0">
                  <p className="text-gray-600 dark:text-slate-300 mb-4 text-sm sm:text-base leading-relaxed">
                    Si prefieres, puedes reservar directamente una sesión estratégica gratuita de 30 minutos en mi calendario:
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all hover:scale-[1.02]"
                  >
                    <a href={calendlyLink} target="_blank" rel="noopener noreferrer" aria-label="Reservar sesión estratégica gratuita en Calendly">
                      <CalendarCheck className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                      Reservar sesión en Calendly
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/60 dark:border-slate-700/50">
                <CardHeader className="p-5 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
                     <Info className="w-6 h-6 mr-2.5 sm:mr-3 text-indigo-600 dark:text-indigo-400" />
                    Otros datos de contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm sm:text-base p-5 sm:p-6 pt-0 sm:pt-0">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-slate-200 block">Email:</span>
                      <a href={`mailto:${userEmail}`} className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">{userEmail}</a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                     <div>
                      <span className="font-semibold text-gray-700 dark:text-slate-200 block">Teléfono:</span>
                      <a href={`tel:${userPhone.replace(/\s+/g, '')}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{userPhoneDisplay}</a>
                    </div>
                  </div>
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
                  ¿Qué sucede después de contactarnos?
                </CardTitle>
                 <CardDescription className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Nuestro compromiso es ofrecerte una respuesta clara y los siguientes pasos bien definidos.
                  </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-slate-300 space-y-3 text-sm sm:text-base leading-relaxed sm:leading-loose p-6 sm:p-8 pt-0 sm:pt-0">
                <p><strong className="text-gray-700 dark:text-slate-100">1. Recepción y respuesta rápida:</strong> Recibirás una confirmación automática de tu mensaje. Personalmente, revisaré tu consulta y me comprometo a responderte en un plazo máximo de 24-48 horas laborables.</p>
                <p><strong className="text-gray-700 dark:text-slate-100">2. Sesión estratégica (si aplica):</strong> Si has solicitado una sesión gratuita o si tu consulta lo requiere para entender mejor tus necesidades, coordinaremos una videollamada de 30-45 minutos. Este es el momento para que me cuentes todo sobre tu proyecto y tus objetivos.</p>
                <p><strong className="text-gray-700 dark:text-slate-100">3. Propuesta personalizada:</strong> Basado en nuestra conversación y el análisis inicial, si considero que puedo ayudarte a alcanzar tus metas, te prepararé una propuesta detallada y transparente. Esta incluirá los próximos pasos, las acciones recomendadas, un cronograma estimado y la inversión requerida.</p>
                <p><strong className="text-gray-700 dark:text-slate-100">4. ¡A trabajar juntos!</strong> Si decides seguir adelante y confías en mi método y experiencia, ¡nos pondremos manos a la obra para impulsar tu negocio hacia el éxito que merece!</p>
              </CardContent>
            </Card>
          </motion.section>
          
          <motion.div variants={fadeInUp} className="text-center mt-10 md:mt-12 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            <p>Al enviar este formulario, aceptas nuestra <Link to="/politica-privacidad" className="text-blue-600 dark:text-blue-400 hover:underline">política de privacidad</Link> y nuestro <Link to="/aviso-legal" className="text-blue-600 dark:text-blue-400 hover:underline">aviso legal</Link>.</p>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
};

export default Contacto;