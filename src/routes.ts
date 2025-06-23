import { lazy } from 'react';

// Importa todos tus componentes de página usando lazy loading
const Index = lazy(() => import('./pages/index'));
const QuienSoy = lazy(() => import('./pages/quiensoy'));
const MiMetodo = lazy(() => import('./pages/mimetodo'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogCategoriaPage = lazy(() => import('./pages/BlogCategoriaPage'));
const BlogTagPage = lazy(() => import('./pages/BlogTagPage'));
const Servicios = lazy(() => import('./pages/Servicios'));
const Contacto = lazy(() => import('./pages/Contacto'));
const EstrategiaDigitalIntegral = lazy(() => import('./pages/servicios/EstrategiaDigitalIntegral'));
const ConsultoriaSeo = lazy(() => import('./pages/servicios/ConsultoriaSeo'));
const ConsultoriaIa = lazy(() => import('./pages/servicios/ConsultoriaIa'));
const ProductoMarca = lazy(() => import('./pages/mi-metodo/ProductoMarca'));
const Adquisicion = lazy(() => import('./pages/mi-metodo/Adquisicion'));
const Conversion = lazy(() => import('./pages/mi-metodo/Conversion'));
const Progresion = lazy(() => import('./pages/mi-metodo/Progresion'));
const Recurrencia = lazy(() => import('./pages/mi-metodo/Recurrencia'));
const Escalabilidad = lazy(() => import('./pages/mi-metodo/Escalabilidad'));
const AvisoLegal = lazy(() => import('./pages/legal/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/legal/PoliticaPrivacidad'));
const PoliticaCookies = lazy(() => import('./pages/legal/PoliticaCookies'));

/**
 * NOTA IMPORTANTE:
 * Los valores de los paths (ej: 'about-me', 'services', 'contact') deben coincidir
 * EXACTAMENTE con los que tienes en tus archivos de traducción:
 * `/public/locales/en/translation.json`, `/public/locales/fr/translation.json`, etc.
 * He rellenado los valores con traducciones lógicas, pero DEBES VERIFICARLOS.
 */
export const routesConfig = [
  // Páginas Principales
  { key: 'services', component: Servicios, paths: { es: 'servicios', en: 'services', fr: 'services' } },
  { key: 'method', component: MiMetodo, paths: { es: 'mi-metodo', en: 'my-method', fr: 'ma-methode' } },
  { key: 'whoAmI', component: QuienSoy, paths: { es: 'quien-soy', en: 'about-me', fr: 'qui-suis-je' } },
  { key: 'contact', component: Contacto, paths: { es: 'contacto', en: 'contact', fr: 'contact' } },
  
  // Blog
  { key: 'blog', component: Blog, paths: { es: 'blog', en: 'blog', fr: 'blog' } },
  { key: 'blogPost', component: BlogPost, paths: { es: 'blog/:slug', en: 'blog/:slug', fr: 'blog/:slug' } },
  { key: 'blogCategory', component: BlogCategoriaPage, paths: { es: 'categoria/:categoriaSlug', en: 'category/:categoriaSlug', fr: 'categorie/:categoriaSlug' } },
  { key: 'blogTag', component: BlogTagPage, paths: { es: 'etiqueta/:tagSlug', en: 'tag/:tagSlug', fr: 'tag/:tagSlug' } },

  // Sub-páginas de Servicios
  { key: 'service_edi', component: EstrategiaDigitalIntegral, paths: { es: 'servicios/estrategia-digital-integral', en: 'services/comprehensive-digital-strategy', fr: 'services/strategie-digitale-globale' } },
  { key: 'service_seo', component: ConsultoriaSeo, paths: { es: 'servicios/consultoria-seo', en: 'services/seo-consulting', fr: 'services/consultation-seo' } },
  { key: 'service_ia', component: ConsultoriaIa, paths: { es: 'servicios/consultoria-ia', en: 'services/ai-consulting', fr: 'services/consultation-ia' } },

  // Sub-páginas de Mi Método
  { key: 'method_brand', component: ProductoMarca, paths: { es: 'mi-metodo/producto-marca', en: 'my-method/product-brand', fr: 'ma-methode/produit-marque' } },
  { key: 'method_acquisition', component: Adquisicion, paths: { es: 'mi-metodo/adquisicion', en: 'my-method/acquisition', fr: 'ma-methode/acquisition' } },
  { key: 'method_conversion', component: Conversion, paths: { es: 'mi-metodo/conversion', en: 'my-method/conversion', fr: 'ma-methode/conversion' } },
  { key: 'method_progression', component: Progresion, paths: { es: 'mi-metodo/progresion', en: 'my-method/progression', fr: 'ma-methode/progression' } },
  { key: 'method_recurrence', component: Recurrencia, paths: { es: 'mi-metodo/recurrencia', en: 'my-method/recurrence', fr: 'ma-methode/recurrence' } },
  { key: 'method_scalability', component: Escalabilidad, paths: { es: 'mi-metodo/escalabilidad', en: 'my-method/scalability', fr: 'ma-methode/scalabilite' } },
  
  // Páginas Legales
  { key: 'legal_notice', component: AvisoLegal, paths: { es: 'aviso-legal', en: 'legal-notice', fr: 'mentions-legales' } },
  { key: 'privacy_policy', component: PoliticaPrivacidad, paths: { es: 'politica-de-privacidad', en: 'privacy-policy', fr: 'politique-de-confidentialite' } },
  { key: 'cookies_policy', component: PoliticaCookies, paths: { es: 'politica-de-cookies', en: 'cookies-policy', fr: 'politique-de-cookies' } },
];