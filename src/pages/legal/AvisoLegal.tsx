import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { Home as HomeIcon, FileText } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const AvisoLegal = () => {
  const domain = "https://alvarostrategy.com"; 
  const pageUrl = `${domain}/aviso-legal`;
  const pageTitle = "Aviso legal y condiciones de uso | AlvaroStrategy";
  const pageDescription = "Consulta el aviso legal y las condiciones de uso del sitio web de AlvaroStrategy, titularidad de Álvaro Fernández de Celis.";

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
        { "@type": "ListItem", "position": 2, "name": "Aviso legal" }
      ]
    },
    "mainEntity": {
        "@type": "LegalNotice", 
        "headline": "Aviso legal y condiciones de uso de AlvaroStrategy.com",
        "provider": {
            "@type": "Person", 
            "name": "Álvaro Fernández de Celis",
            "url": domain,
            "identifier": "71441246A", 
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Avenue de Hockey 1",
                "addressLocality": "Woluwe Saint Pierre",
                "postalCode": "1150", // Por favor, verifica este código postal
                "addressCountry": "BE" 
            },
            "email": "alvaro@ignovadigital.com" 
        }
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
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Aviso legal</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <header className="mb-8 sm:mb-10 text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <FileText className="w-4 h-4 mr-2"/>
                Información legal {/* Corregido mayúscula */}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 leading-tight">
              Aviso legal y condiciones de uso
            </h1>
          </header>

          <article className="prose prose-base sm:prose-lg max-w-none dark:prose-invert 
                            prose-headings:font-semibold prose-headings:text-gray-800 dark:prose-headings:text-slate-200 
                            prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-4 prose-p:leading-relaxed
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                            prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                            prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-slate-400">
            
            <section className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h2 className="text-xl sm:text-2xl mb-3">Identificación y titularidad</h2>
              <p>A continuación se exponen los datos identificativos del titular del sitio web:</p>
              <ul>
                <li><strong>Titular:</strong> Álvaro Fernández de Celis</li>
                <li><strong>NIF/DNI:</strong> 71441246A</li>
                <li><strong>Domicilio:</strong> Avenue de Hockey 1, 1150 Woluwe Saint Pierre, Bélgica</li>
                <li><strong>Correo electrónico:</strong> alvaro@ignovadigital.com {/* TODO: USER: Confirmar si este es el email de contacto legal o usar hola@alvarostrategy.com */}</li>
                <li><strong>Sitio web:</strong> {domain}</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl mb-3">Condiciones de uso</h2>
              <p>La utilización de este sitio web te otorga la condición de usuario, e implica la aceptación completa de todas las cláusulas y condiciones de uso incluidas en las páginas:</p>
              <ul>
                <li>Aviso legal (esta página)</li>
                <li><Link to="/politica-privacidad">Política de privacidad</Link></li>
                <li><Link to="/politica-cookies">Política de cookies</Link></li>
              </ul>
              <p>Si no estás conforme con todas y cada una de estas cláusulas y condiciones te abstendrás de utilizar este sitio web.</p>
              <p>El acceso a esta web no supone, en modo alguno, el inicio de una relación comercial con AlvaroStrategy o Álvaro Fernández de Celis.</p>
              <p>A través de este sitio web, facilitamos el acceso y la utilización de diversos contenidos que Álvaro Fernández de Celis o sus colaboradores han publicado por medio de internet.</p>
              <p>A tal efecto, te obligas y comprometes a NO utilizar cualquiera de los contenidos del sitio web con fines o efectos ilícitos, prohibidos en este aviso legal o por la legislación vigente, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los contenidos, los equipos informáticos o los documentos, archivos y toda clase de contenidos almacenados en cualquier equipo informático propios o contratados por Álvaro Fernández de Celis, de otros usuarios o de cualquier usuario de internet.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Medidas de seguridad</h2>
                <p>Los datos personales que me facilites pueden ser almacenados en bases de datos automatizadas o no, cuya titularidad corresponde en exclusiva a Álvaro Fernández de Celis, quien asume todas las medidas de índole técnica, organizativa y de seguridad que garantizan la confidencialidad, integridad y calidad de la información contenida en las mismas de acuerdo con lo establecido en la normativa vigente en protección de datos.</p>
                <p>No obstante, debes ser consciente de que las medidas de seguridad de los sistemas informáticos en internet no son enteramente fiables y que, por tanto, no podemos garantizar la inexistencia de virus u otros elementos que puedan producir alteraciones en los sistemas informáticos (software y hardware) del usuario o en sus documentos electrónicos y ficheros contenidos en los mismos aunque ponemos todos los medios necesarios y tomamos las medidas de seguridad oportunas para evitar la presencia de estos elementos dañinos.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Tratamiento de datos personales</h2>
                <p>Puedes consultar toda la información relativa al tratamiento de datos personales en la página de <Link to="/politica-privacidad">política de privacidad</Link>.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Contenidos</h2>
                <p>Álvaro Fernández de Celis ha obtenido la información, el contenido multimedia y los materiales incluidos en el sitio web de fuentes que considero fiables, pero, si bien he tomado todas las medidas razonables para asegurar que la información contenida es correcta, no garantizo que sea exacta, completa o actualizada. Álvaro Fernández de Celis declina expresamente cualquier responsabilidad por error u omisión en la información contenida en las páginas de este sitio web.</p>
                <p>Queda prohibido transmitir o enviar a través del sitio web cualquier contenido ilegal o ilícito, virus informáticos, o mensajes que, en general, afecten o violen derechos del titular o de terceros.</p>
                <p>Los contenidos de {domain} tienen únicamente una finalidad informativa y bajo ninguna circunstancia deben usarse ni considerarse como oferta de venta, solicitud de una oferta de compra ni recomendación para realizar cualquier otra operación, salvo que así se indique expresamente.</p>
                <p>Álvaro Fernández de Celis se reserva el derecho a modificar, suspender, cancelar o restringir el contenido de {domain}, los vínculos o la información obtenida a través del sitio web, sin necesidad de previo aviso.</p>
                <p>Álvaro Fernández de Celis no será responsable de los daños y perjuicios que pudieran derivarse de la utilización de la información del sitio web.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Política de cookies</h2>
                <p>En la página <Link to="/politica-cookies">política de cookies</Link> puedes consultar toda la información relativa a la política de recogida y tratamiento de las cookies.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Enlaces a otros sitios web</h2>
                <p>Desde {domain} podremos proporcionar acceso a sitios web de terceros mediante enlaces con la finalidad exclusiva de informarte sobre la existencia de otras fuentes de información en internet en las que podrás ampliar los datos ofrecidos por este sitio web.</p>
                <p>Estos enlaces a otros sitios web no suponen en ningún caso una sugerencia o recomendación para que visites las páginas web de destino, que están fuera de nuestro control, por lo que Álvaro Fernández de Celis no es responsable del contenido de los sitios web vinculados ni del resultado que obtengas al seguir los enlaces.</p>
                <p>Asimismo, Álvaro Fernández de Celis no responde de los links o enlaces ubicados en los sitios web vinculados a los que te proporciona acceso.</p>
                <p>El establecimiento del enlace no implica en ningún caso la existencia de relaciones entre AlvaroStrategy y el propietario del sitio en el que se establezca el enlace, ni la aceptación o aprobación por nuestra parte de sus contenidos o servicios.</p>
                <p>Si accedes a un sitio web externo desde un enlace que encuentres en {domain} deberás leer la propia política de privacidad del otro sitio web que puede ser diferente de la de este sitio web.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Propiedad intelectual e industrial</h2>
                <p>Todos los derechos están reservados.</p>
                <p>Todo acceso a este sitio web está sujeto a las siguientes condiciones: la reproducción, almacenaje permanente y la difusión de los contenidos o cualquier otro uso que tenga finalidad pública o comercial queda expresamente prohibida sin el consentimiento previo expreso y por escrito de Álvaro Fernández de Celis.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Limitación de responsabilidad</h2>
                <p>Álvaro Fernández de Celis declina cualquier responsabilidad en caso de que existan interrupciones o un mal funcionamiento de los servicios o contenidos ofrecidos en internet, cualquiera que sea su causa. Asimismo, Álvaro Fernández de Celis no se hace responsable por caídas de la red, pérdidas de negocio a consecuencia de dichas caídas, suspensiones temporales de fluido eléctrico o cualquier otro tipo de daño indirecto que te pueda ser causado por causas ajenas al titular.</p>
                <p>Antes de tomar decisiones y/o acciones con base a la información incluida en el sitio web, te recomiendo comprobar y contrastar la información recibida con otras fuentes.</p>
            </section>

            <section>
                <h2 className="text-xl sm:text-2xl mb-3">Contacto</h2>
                <p>En caso de que tengas cualquier duda acerca de estas condiciones legales o quieras realizar cualquier comentario sobre este sitio web, puedes enviar un mensaje de correo electrónico a la dirección <a href={`mailto:${"alvaro@ignovadigital.com"}`}>alvaro@ignovadigital.com</a> o usar cualquier otro método de contacto disponible en nuestra página de <Link to="/contacto">contacto</Link>.</p> {/* TODO: USER: Confirmar email de contacto legal */}
            </section>

          </article>
        </motion.div>
      </div>
    </>
  );
};

export default AvisoLegal;