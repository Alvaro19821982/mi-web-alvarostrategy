import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

// Definimos los idiomas soportados. La clave es lo que usaremos en la URL (/es, /en, /fr)
// y el valor es el locale completo que usaremos para la etiqueta lang del HTML.
export const supportedLngs = {
  es: 'es-ES',
  en: 'en',
  fr: 'fr-BE',
};

i18n
  // Carga las traducciones desde un backend (en nuestro caso, desde la carpeta /public/locales)
  .use(HttpApi)
  // Pasa la instancia de i18n a react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    // Idioma por defecto si la detección falla o el idioma no está soportado
    fallbackLng: 'es',
    // Lista de idiomas soportados para que i18next los conozca
    supportedLngs: Object.keys(supportedLngs),
    
    // Nombres de los namespaces (archivos de traducción). Usaremos uno llamado 'translation'
    ns: ['translation'],
    defaultNS: 'translation',

    // Opciones para el backend que carga los archivos
    backend: {
      // Ruta a los archivos de traducción. {{lng}} será el código de idioma (es, en, fr)
      // y {{ns}} será el namespace (translation).
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Desactiva los logs de i18next en producción para no ensuciar la consola
    debug: process.env.NODE_ENV === 'development',

    // Configuración para react-i18next
    react: {
      // Usar Suspense para esperar a que las traducciones se carguen
      useSuspense: true,
    },
    
    interpolation: {
      // React ya escapa los valores por defecto, por lo que no es necesario para i18next
      escapeValue: false, 
    },
  });

export default i18n;