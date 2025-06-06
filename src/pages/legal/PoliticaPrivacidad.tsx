import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PoliticaPrivacidad = () => {
  const domain = "https://alvarostrategy.com"; 
  const pageUrl = `${domain}/politica-privacidad`;
  const pageTitle = "Política de privacidad | AlvaroStrategy";
  const pageDescription = "Consulta nuestra política de privacidad para entender cómo AlvaroStrategy, titularidad de Álvaro Fernández de Celis, trata y protege tus datos personales.";
  
  const emailContactoLegal = "alvaro@ignovadigital.com"; 

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage", // Podría ser también PrivacyPolicy directamente si la página solo contiene eso. WebPage con mainEntity PrivacyPolicy es más robusto.
    "name": pageTitle,
    "url": pageUrl,
    "description": pageDescription,
     "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": domain },
        { "@type": "ListItem", "position": 2, "name": "Política de privacidad" }
      ]
    },
    "mainEntity": {
        "@type": "PrivacyPolicy",
        "headline": "Política de privacidad de AlvaroStrategy.com",
        "provider": { // El proveedor del servicio/sitio web
            "@type": "Person",
            "name": "Álvaro Fernández de Celis",
            "url": domain,
            "identifier": "71441246A",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Avenue de Hockey 1",
                "addressLocality": "Woluwe Saint Pierre",
                "postalCode": "1150", // Verifica este CP
                "addressCountry": "BE"
            },
            "email": emailContactoLegal
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
                  <BreadcrumbPage className="text-sm font-medium text-gray-700 dark:text-slate-200">Política de privacidad</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <header className="mb-8 sm:mb-10 text-center">
             <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <ShieldCheck className="w-4 h-4 mr-2"/>
                Tu privacidad es importante
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-slate-100 leading-tight">
              Política de privacidad
            </h1>
          </header>

          <article className="prose prose-base sm:prose-lg max-w-none dark:prose-invert 
                            prose-headings:font-semibold prose-headings:text-gray-800 dark:prose-headings:text-slate-200 
                            prose-p:text-gray-700 dark:prose-p:text-slate-300 prose-p:mb-4 prose-p:leading-relaxed
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                            prose-strong:text-gray-800 dark:prose-strong:text-slate-100
                            prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1">
            
            <p>En AlvaroStrategy, te informamos sobre nuestra política de privacidad respecto del tratamiento y protección de los datos de carácter personal de los usuarios que puedan ser recabados durante la navegación a través del sitio web {domain}.</p>
            <p>En este sentido, Álvaro Fernández de Celis cumple con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas (RGPD).</p>
            <p>El uso de sitio web implica la aceptación de esta política de privacidad así como las condiciones incluidas en el <Link to="/aviso-legal">aviso legal</Link>.</p>

            <section className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <h2 className="text-xl sm:text-2xl mb-3">Identidad del responsable</h2>
              <ul>
                <li><strong>Titular:</strong> Álvaro Fernández de Celis</li>
                <li><strong>NIF/DNI:</strong> 71441246A</li>
                <li><strong>Domicilio:</strong> Avenue de Hockey 1, 1150 Woluwe Saint Pierre, Bélgica</li>
                <li><strong>Correo electrónico:</strong> {emailContactoLegal}</li>
                <li><strong>Sitio web:</strong> {domain}</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl sm:text-2xl mb-3">Principios aplicados en el tratamiento de datos</h2>
              <p>En el tratamiento de tus datos personales, Álvaro Fernández de Celis aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos (RGPD):</p>
              <ul>
                <li><strong>Principio de licitud, lealtad y transparencia:</strong> El titular siempre requerirá el consentimiento para el tratamiento de los datos personales que puede ser para uno o varios fines específicos sobre los que el titular informará al usuario previamente con absoluta transparencia.</li>
                <li><strong>Principio de minimización de datos:</strong> El titular solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.</li>
                <li><strong>Principio de limitación del plazo de conservación:</strong> El titular mantendrá los datos personales recabados durante el tiempo estrictamente necesario para el fin o los fines del tratamiento. El titular informará al usuario del plazo de conservación correspondiente según la finalidad. En el caso de suscripciones, el titular revisará periódicamente las listas y eliminará aquellos registros inactivos durante un tiempo considerable.</li>
                <li><strong>Principio de integridad y confidencialidad:</strong> Los datos personales recabados serán tratados de tal manera que su seguridad, confidencialidad e integridad esté garantizada. El titular toma las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de sus usuarios por parte de terceros.</li>
              </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Obtención de datos personales</h2>
                <p>Para navegar por {domain} no necesitas facilitar ningún dato personal. Los casos en los que sí proporcionas tus datos personales son los siguientes:</p>
                <ul>
                    <li>Al contactar a través de los formularios de contacto o enviar un correo electrónico.</li>
                    {/* TODO: USER: Confirmar si tienes comentarios <li>Al realizar un comentario en un artículo o página.</li> */}
                    {/* TODO: USER: Confirmar si tienes newsletter <li>Al suscribirte a un boletín de noticias.</li> */}
                </ul>
            </section>
            
            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Derechos</h2>
                <p>Te informamos que sobre tus datos personales tienes derecho a:</p>
                <ul>
                    <li>Solicitar el acceso a los datos almacenados.</li>
                    <li>Solicitar una rectificación o la cancelación.</li>
                    <li>Solicitar la limitación de su tratamiento.</li>
                    <li>Oponerte al tratamiento.</li>
                </ul>
                <p>No puedes ejercitar el derecho a la portabilidad de los datos en este caso.</p>
                <p>El ejercicio de estos derechos es personal y por tanto debe ser ejercido directamente por el interesado, solicitándolo directamente al titular: Álvaro Fernández de Celis, lo que significa que cualquier cliente, suscriptor o colaborador que haya facilitado sus datos en algún momento puede dirigirse a Álvaro Fernández de Celis, y pedir información sobre los datos que AlvaroStrategy tenga almacenados y cómo los ha obtenido, solicitar la rectificación de los mismos, oponerse al tratamiento, limitar su uso o solicitar la cancelación de esos datos en sus ficheros.</p>
                <p>Para ejercitar tus derechos de acceso, rectificación, cancelación y oposición tienes que enviar un correo electrónico a <a href={`mailto:${emailContactoLegal}`}>{emailContactoLegal}</a> junto con la prueba válida en derecho como una fotocopia del D.N.I. o equivalente.</p>
                <p>Tienes derecho a la tutela judicial efectiva y a presentar una reclamación ante la autoridad de control, en este caso, la Agencia Española de Protección de Datos si operas principalmente en España, o la autoridad belga si tu establecimiento principal está allí, si consideras que el tratamiento de datos personales que te conciernen infringe el Reglamento.</p> {/* TODO: USER: Ajustar autoridad de control según tu operación principal */}
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Finalidad del tratamiento de datos personales</h2>
                <p>Cuando te conectas a este sitio web para mandar un correo, te suscribes a un boletín o realizas alguna acción que implique facilitar datos, estás facilitando información de carácter personal de la que Álvaro Fernández de Celis será responsable. Esta información puede incluir datos de carácter personal como pueden ser tu dirección IP, nombre y apellidos, dirección física, dirección de correo electrónico, número de teléfono, y otra información. Al facilitar esta información, das tu consentimiento para que tu información sea recopilada, utilizada, gestionada y almacenada por AlvaroStrategy, sólo como se describe en el <Link to="/aviso-legal">aviso legal</Link> y en la presente política de privacidad.</p>
                <p>Los datos personales y la finalidad del tratamiento por parte del titular será diferente según el sistema de captura de información:</p>
                <ul>
                    <li><strong>Formularios de contacto:</strong> El titular solicita datos personales entre los que pueden estar: nombre y apellidos, dirección de correo electrónico, número de teléfono y consulta/mensaje con la finalidad de responder a las consultas de los usuarios. Por ejemplo, AlvaroStrategy utiliza esos datos para dar respuesta a mensajes, dudas, quejas, comentarios o inquietudes que puedan tener los usuarios relativas a la información incluida en el sitio web, los servicios que se prestan, el tratamiento de sus datos personales, así como cualesquiera otras consultas que el usuario pueda tener y que no estén sujetas a las condiciones del sitio web.</li>
                    {/* TODO: USER: Añadir otras formas de captura si existen (boletín, comentarios, etc.) y su finalidad */}
                </ul>
                <p>Existen otras finalidades por las que el titular tratará datos personales:</p>
                 <ul>
                    <li>Para garantizar el cumplimiento de las condiciones recogidas en el <Link to="/aviso-legal">aviso legal</Link> y en la ley aplicable. Esto puede incluir el desarrollo de herramientas y algoritmos que ayuden a este sitio web a garantizar la confidencialidad de los datos personales que recoge.</li>
                    <li>Para apoyar y mejorar los servicios que ofrece este sitio web.</li>
                    <li>Para analizar la navegación de los usuarios. El titular recogerá otros datos no identificativos que se obtienen mediante el uso de cookies que se descargan en el ordenador del usuario cuando navega por el sitio web cuyas características y finalidad están detalladas en la <Link to="/politica-cookies">política de cookies</Link>.</li>
                    {/* TODO: USER: Si usas redes sociales, detalla cómo gestionas esos datos */}
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Seguridad de los datos personales</h2>
                <p>Para proteger tus datos personales, Álvaro Fernández de Celis toma todas las precauciones razonables y sigue las mejores prácticas de la industria para evitar su pérdida, mal uso, acceso indebido, divulgación, alteración o destrucción de los mismos.</p>
                <p>El sitio web está alojado en {`[Nombre de tu proveedor de Hosting]`}. La seguridad de tus datos está garantizada, ya que toman todas las medidas de seguridad necesarias para ello. Puedes consultar su política de privacidad para tener más información.</p> {/* TODO: USER: Especificar tu proveedor de hosting y enlazar su política si es relevante */}
                <p>AlvaroStrategy informa al usuario de que sus datos personales no serán cedidos a terceras organizaciones, con la salvedad de que dicha cesión de datos esté amparada en una obligación legal o cuando la prestación de un servicio implique la necesidad de una relación contractual con un encargado de tratamiento. En este último caso, solo se llevará a cabo la cesión de datos al tercero cuando AlvaroStrategy disponga del consentimiento expreso del usuario.</p>
                <p>Sin embargo, en algunos casos se pueden realizar colaboraciones con otros profesionales; en esos casos, se requerirá consentimiento al usuario informando sobre la identidad del colaborador y la finalidad de la colaboración. Siempre se realizará con los más estrictos estándares de seguridad.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Contenido de otros sitios web</h2>
                <p>Las páginas de este sitio web pueden incluir contenido incrustado (por ejemplo, vídeos, imágenes, artículos, etc.). El contenido incrustado de otras web se comporta exactamente de la misma manera que si hubieras visitado la otra web.</p>
                <p>Estos sitios web pueden recopilar datos sobre ti, utilizar cookies, incrustar un código de seguimiento adicional de terceros, y supervisar tu interacción usando este código.</p>
            </section>

             <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Política de cookies</h2>
                <p>Para que este sitio web funcione correctamente necesita utilizar cookies, que es una información que se almacena en tu navegador web. En la página <Link to="/politica-cookies">política de cookies</Link> puedes consultar toda la información relativa a la política de recogida, la finalidad y el tratamiento de las cookies.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Legitimación para el tratamiento de datos</h2>
                <p>La base legal para el tratamiento de tus datos es: el consentimiento.</p>
                <p>Para contactar con AlvaroStrategy, suscribirte a un boletín o realizar comentarios en este sitio web tienes que aceptar la presente política de privacidad.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Categorías de datos personales</h2>
                <p>Las categorías de datos personales que trata el titular son:</p>
                <ul>
                    <li>Datos identificativos (nombre, email, teléfono opcional, IP).</li>
                    {/* TODO: USER: Ajustar si recoges otras categorías de datos */}
                </ul>
                <p>No se tratan categorías de datos especialmente protegidos.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Conservación de datos personales</h2>
                <p>Los datos personales que proporciones al titular se conservarán hasta que solicites su supresión.</p>
            </section>

             <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Navegación web</h2>
                <p>Al navegar por {domain} se pueden recoger datos no identificativos, que pueden incluir, la dirección IP, geolocalización, un registro de cómo se utilizan los servicios y sitios, hábitos de navegación y otros datos que no pueden ser utilizados para identificarte.</p>
                <p>El sitio web utiliza los siguientes servicios de análisis de terceros:</p> {/* TODO: USER: Listar y enlazar políticas de privacidad de tus herramientas de analítica (Google Analytics, etc.) */}
                <ul>
                    <li>Google Analytics.</li>
                    {/* <li>Otro servicio.</li> */}
                </ul>
                <p>Utilizamos la información obtenida para obtener datos estadísticos, analizar tendencias, administrar el sitio, estudiar patrones de navegación y para recopilar información demográfica.</p>
                <p>No nos hacemos responsable del tratamiento de los datos personales que realicen las páginas web a las que puedas acceder a través de los distintos enlaces que contiene nuestro sitio web.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Exactitud y veracidad de los datos personales</h2>
                <p>Te comprometes a que los datos facilitados al titular sean correctos, completos, exactos y vigentes, así como a mantenerlos debidamente actualizados.</p>
                <p>Como usuario del sitio web eres el único responsable de la veracidad y corrección de los datos que remitas al sitio exonerando a Álvaro Fernández de Celis de cualquier responsabilidad al respecto.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Aceptación y consentimiento</h2>
                <p>Como usuario del sitio web declaras haber sido informado de las condiciones sobre protección de datos de carácter personal, aceptas y consientes el tratamiento de los mismos por parte de Álvaro Fernández de Celis en la forma y para las finalidades indicadas en esta política de privacidad.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl sm:text-2xl mb-3">Revocabilidad</h2>
                <p>Para ejercitar tus derechos de acceso, rectificación, cancelación y oposición tienes que enviar un correo electrónico a <a href={`mailto:${emailContactoLegal}`}>{emailContactoLegal}</a> junto con la prueba válida en derecho como una fotocopia del D.N.I. o equivalente.</p>
                <p>El ejercicio de estos derechos no incluye ningún dato que Álvaro Fernández de Celis esté obligado a conservar con fines administrativos, legales o de seguridad.</p>
            </section>

            <section> 
                <h2 className="text-xl sm:text-2xl mb-3">Cambios en la política de privacidad</h2>
                <p>Álvaro Fernández de Celis se reserva el derecho a modificar la presente política de privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria.</p>
                <p>Estas políticas estarán vigentes hasta que sean modificadas por otras debidamente publicadas.</p>
            </section>
          </article>
        </motion.div>
      </div>
    </>
  );
};

export default PoliticaPrivacidad;