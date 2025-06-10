import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

interface CookieInfo {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: 'Necesaria' | 'Analítica' | 'Marketing' | 'Funcional' | 'Preferencias';
}

// === ID de Google Analytics ===
// Definido aquí para ser usado en la tabla y en la función de borrado
const GA_MEASUREMENT_ID = "G-KF8SBMFJMQ"; 

const siteCookies: CookieInfo[] = [
  { 
    name: "alvaroStrategyCookieConsent", 
    provider: "AlvaroStrategy.com (Propia)", 
    purpose: "Almacena el estado del consentimiento de cookies del usuario para el dominio actual.", 
    duration: "150 días",
    type: "Necesaria"
  },
  { 
    name: "_ga", 
    provider: "Google Analytics (Terceros)", 
    purpose: "Se usa para distinguir a los usuarios y generar datos estadísticos sobre cómo utilizan el sitio web. La información se recopila de forma anónima.", 
    duration: "2 años",
    type: "Analítica"
  },
  { 
    name: `_ga_${GA_MEASUREMENT_ID}`, // <<< MODIFICADO: Usando el ID real
    provider: "Google Analytics (Terceros)", 
    purpose: "Se usa para persistir el estado de la sesión.", 
    duration: "2 años",
    type: "Analítica"
  },
  // TODO: USER: Añadir otras cookies que tu sitio utilice tras una auditoría
];

const PoliticaCookies = () => {
  const domain = "https://alvarostrategy.com"; 
  const pageUrl = `${domain}/politica-cookies`;
  const pageTitle = "Política de cookies | AlvaroStrategy";
  const pageDescription = "Información sobre el uso de cookies en el sitio web de AlvaroStrategy. Conoce qué cookies utilizamos, su finalidad y cómo puedes gestionarlas.";

  const [consentGiven, setConsentGiven] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const consent = Cookies.get("alvaroStrategyCookieConsent");
    if (consent === "true") {
        setConsentGiven(true);
    } else if (consent === "false") {
        setConsentGiven(false);
    } else {
        setConsentGiven(undefined);
    }
  }, []);

  // <<< FUNCIÓN MODIFICADA >>>
  const handleWithdrawConsent = () => {
    // 1. Elimina la cookie de la librería que recuerda la decisión (true/false)
    Cookies.remove("alvaroStrategyCookieConsent", { path: '/' }); 

    // 2. ELIMINA EL ESTADO GUARDADO EN LOCALSTORAGE (¡CAMBIO CLAVE!)
    // Esto asegura que App.tsx no crea que todavía hay consentimiento.
    localStorage.removeItem('cookieConsent');

    // 3. Intenta eliminar las cookies de tracking específicas
    const cookieDomain = `.${window.location.hostname.replace(/^www\./, '')}`;
    Cookies.remove("_ga", { path: '/', domain: cookieDomain });
    Cookies.remove(`_ga_${GA_MEASUREMENT_ID}`, { path: '/', domain: cookieDomain }); // Usando el ID real

    // 4. Actualiza la UI y recarga para mostrar el banner
    setConsentGiven(false);
    alert("Tu consentimiento para las cookies ha sido retirado. El banner volverá a aparecer para que puedas actualizar tus preferencias.");
    window.location.reload(); 
  };
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "url": pageUrl,
    "description": pageDescription,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Política de cookies" }
      ]
    },
     "mainEntity": { 
        "@type": "Article",
        "headline": "Política de cookies de AlvaroStrategy.com",
        "author": {
            "@type": "Person",
            "name": "Álvaro Fernández de Celis",
            "url": `${domain}/quien-soy`
        },
        "publisher": {
            "@type": "Organization",
            "name": "AlvaroStrategy",
            "logo": {
                "@type": "ImageObject",
                "url": `${domain}/images/Alvaro%20Fernandez%20de%20Celis.webp`
            }
        },
        "dateModified": "2025-06-06" 
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>
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
                    <Link to="/" className="text-sm flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                      Inicio
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Política de cookies</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <header className="mb-8 sm:mb-10 text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <CookieIcon className="w-4 h-4 mr-2"/>
                Información sobre cookies
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 leading-tight">
              Política de cookies
            </h1>
          </header>

          <article className="prose prose-base sm:prose-lg max-w-none dark:prose-invert 
                            prose-headings:font-semibold prose-headings:text-gray-800 dark:prose-headings:text-slate-200 
                            prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-4 prose-p:leading-relaxed
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                            prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                            prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1
                            prose-table:border prose-table:dark:border-slate-700 prose-th:p-2 prose-th:border prose-th:dark:border-slate-700 prose-td:p-2 prose-td:border prose-td:dark:border-slate-700">

            <p>Esta política de cookies explica qué son las cookies, los tipos que puede haber en mi web y cómo las uso; es decir, la información que recopilo usando cookies, cómo se usa esa información y cómo tú puedes controlar las preferencias de cookies. Para obtener más información sobre cómo uso, almaceno y mantengo seguros tus datos personales, consulta mi <Link to="/politica-privacidad">política de privacidad</Link>.</p>
            <p>Siempre, en cualquier momento puedes cambiar o retirar tu consentimiento de la declaración de cookies de este sitio web.</p>
            <p>Puedes obtener más información sobre quién soy, cómo puedes comunicarte conmigo y cómo mi sitio web procesa los datos personales en la <Link to="/politica-privacidad">política de privacidad</Link>.</p>
            <p>Tu consentimiento se aplica exclusivamente al siguiente dominio: {domain}</p>
            
            <div className="my-6 p-4 border border-dashed border-gray-300 dark:border-slate-700 rounded-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><Edit className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />Gestionar consentimiento de cookies</h3>
                {consentGiven === undefined && <p className="text-sm text-gray-500 dark:text-slate-400">Cargando estado del consentimiento...</p>}
                {consentGiven === true && <p className="text-sm text-green-700 dark:text-green-400">Has aceptado el uso de cookies en nuestro sitio.</p>}
                {consentGiven === false && <p className="text-sm text-amber-700 dark:text-amber-400">No has aceptado (o has retirado) el consentimiento para cookies no esenciales. El banner podría volver a aparecer para que puedas actualizar tus preferencias.</p>}
                <Button onClick={handleWithdrawConsent} variant="outline" size="sm" className="mt-3 text-red-600 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/30">
                    <Trash2 className="w-4 h-4 mr-2" /> Retirar/Modificar mi consentimiento
                </Button>
                <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">Al retirar el consentimiento, el banner podría volver a aparecer para que puedas seleccionar tus preferencias.</p>
            </div>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">¿Qué son las cookies?</h2>
                <p>Las cookies son pequeños archivos de texto (código) que todas las webs usan para almacenar pequeños fragmentos de información. Se almacenan en tu dispositivo cuando cualquier sitio web (el mío incluido) se carga en tu navegador. Estas cookies ayudan a hacer que el sitio web funcione correctamente, hacerlo más seguro, brindar una mejor experiencia al usuario, comprender cómo funciona el sitio web y analizar qué funciona, qué no funciona y dónde necesita mejorar.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">¿Cómo uso las cookies?</h2>
                <p>Como la mayoría de los servicios en línea, mi sitio web utiliza cookies propias y de terceros para varios propósitos. Las cookies de origen son principalmente necesarias para que el sitio web funcione correctamente y no recopilan ninguno de tus datos de identificación personal.</p>
                <p>Las cookies de terceros utilizadas mientras navegas en mi sitio web son principalmente para comprender cómo funciona dicho sitio web, cómo interactúas con él, mantener los servicios que te ofrezco seguros, y en general, brindarte una mejor y mejorada experiencia de usuario que ayude a acelerar tus interacciones futuras cuando vuelvas por aquí. Por ejemplo, si has aceptado nuestro aviso de cookies, usamos una cookie para recordar tu preferencia y no volverte a mostrar el banner en cada visita durante un tiempo.</p>
                <p>Si utilizamos cookies de análisis (como Google Analytics), esto se hará únicamente si has otorgado tu consentimiento, y los datos se recopilan de forma agregada y anónima para ayudarnos a mejorar el sitio.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">¿Qué tipos de cookies uso?</h2>
                <p>A continuación, se describen los tipos generales de cookies que podrían utilizarse en este sitio web:</p>
                <ul>
                    <li><strong>Esenciales / técnicas:</strong> Algunas cookies son esenciales para que puedas experimentar la funcionalidad completa de mi sitio web (ej. recordar tu consentimiento de cookies, seguridad). Permiten mantener las sesiones de los usuarios y prevenir cualquier amenaza a la seguridad. No recopilan ni almacenan ninguna información personal tuya.</li>
                    <li><strong>Analíticas / de rendimiento:</strong> Estas cookies almacenan información como el número de visitantes al sitio web, el número de visitantes únicos, las páginas del sitio web que se han visitado, la fuente de la visita, etc. Estos datos (recopilados de forma anónima si son de terceros como Google Analytics) me ayudan a comprender y analizar el rendimiento de mi sitio web y dónde necesita mejorar. <strong className="text-sm">Solo se activarán si otorgas tu consentimiento.</strong></li>
                    <li><strong>Funcionales:</strong> Son las cookies que ayudan a determinadas funcionalidades no esenciales de mi sitio web. Estas funcionalidades pueden incluir incrustar contenido como vídeos o compartir contenido del sitio web en plataformas de redes sociales. <strong className="text-sm">Solo se activarán si otorgas tu consentimiento para ellas o interactúas con dichas funcionalidades.</strong></li>
                    <li><strong>De preferencias:</strong> Estas cookies me ayudan a almacenar tu configuración y preferencias de navegación, como las preferencias de idioma, para que tengas una experiencia mejor y más eficiente en futuras visitas al sitio web.</li>
                    <li><strong>De marketing / publicidad:</strong> Actualmente, este sitio web no utiliza cookies de marketing de terceros para mostrar anuncios personalizados. Si en el futuro se implementaran, se te informaría y se solicitaría tu consentimiento explícito.</li>
                </ul>
                
                <div className="my-8 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-3">Listado detallado de cookies utilizadas:</h3>
                    <p className="text-sm mb-4 text-gray-600 dark:text-slate-400">A continuación, se presenta un listado de las cookies que este sitio puede utilizar. Es importante que sepas que esta lista puede variar y te recomendamos revisarla periódicamente.</p>
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-800">
                            <tr>
                                <th className="text-left p-2">Nombre</th>
                                <th className="text-left p-2">Proveedor</th>
                                <th className="text-left p-2">Propósito</th>
                                <th className="text-left p-2">Duración</th>
                                <th className="text-left p-2">Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siteCookies.map(cookie => (
                                <tr key={cookie.name} className="border-b dark:border-slate-700">
                                    <td className="p-2 font-mono text-xs">{cookie.name}</td>
                                    <td className="p-2">{cookie.provider}</td>
                                    <td className="p-2">{cookie.purpose}</td>
                                    <td className="p-2">{cookie.duration}</td>
                                    <td className="p-2"><Badge variant={cookie.type === "Necesaria" ? "default" : "secondary"} className={cn(cookie.type === "Necesaria" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", cookie.type === "Analítica" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" )}>{cookie.type}</Badge></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     <p className="text-xs text-gray-500 dark:text-slate-500 mt-3"><i><strong>Nota:</strong> Esta tabla es representativa. Debes realizar una auditoría de cookies de tu sitio para asegurar que esta lista sea completa y precisa, especialmente si integras servicios de terceros.</i></p>
                </div>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl mb-3">¿Cómo puedes controlar las preferencias de cookies?</h2>
                <p>Como se mencionó, al visitar mi sitio web por primera vez, se te presenta un banner donde puedes aceptar el uso de cookies. Si deseas cambiar tus preferencias después de haber aceptado, puedes hacer clic en el botón "Retirar/Modificar mi consentimiento" disponible en esta página. Esto eliminará la cookie de consentimiento y te permitirá tomar una nueva decisión cuando el banner vuelva a aparecer (es posible que necesites recargar la página o borrar la caché del navegador para ver el cambio inmediatamente).</p>
                <p>Además de esto, todos los navegadores modernos proporcionan diferentes métodos para que puedas bloquear y eliminar las cookies utilizadas por los sitios web. Puedes cambiar la configuración de tu navegador para bloquear/eliminar las cookies. Generalmente encontrarás estas opciones en el menú de 'opciones' o 'preferencias' de tu navegador.</p>
                <p>Para obtener más información sobre cómo administrar y eliminar cookies, puedes visitar sitios informativos como <a href="https://www.wikipedia.org" target="_blank" rel="noopener noreferrer nofollow">wikipedia.org</a> o <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer nofollow">www.allaboutcookies.org</a>.</p>
            </section>
          </article>
        </motion.div>
      </div>
    </>
  );
};

export default PoliticaCookies;