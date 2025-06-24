// src/components/SeoTags.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAlternateLinks } from '../context/AlternateLinksContext';

interface SeoTagsProps {
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string; 
  isHomePage?: boolean;
}

const SeoTags: React.FC<SeoTagsProps> = ({ title, description, pathname, imageUrl, isHomePage = false }) => {
  const alternateLinks = useAlternateLinks();
  const baseUrl = "https://alvarostrategy.com";
  
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  const finalImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : `${baseUrl}/temp-opengraph.png`;

  return (
    <Helmet>
      {/* --- Etiquetas SEO Fundamentales --- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* --- Etiqueta Canónica --- */}
      <link rel="canonical" href={canonicalUrl} />

      {/* --- Etiquetas Open Graph (para Facebook, LinkedIn, etc.) --- */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={finalImageUrl} />
      
      {/* --- Etiquetas Twitter Card --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImageUrl} />

      {/* --- Etiquetas hreflang para internacionalización --- */}
      {/* Renderiza dinámicamente las versiones de idioma que le llegan por contexto */}
      {alternateLinks && Object.entries(alternateLinks).map(([lang, href]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={`${baseUrl}${href}`} />
      ))}
      
      {/* CORRECCIÓN: La lógica de x-default ahora vive en el componente superior (LanguageLayout) */}
      {/* y se pasa a través del contexto junto con los otros alternateLinks. */}
      {/* Aquí solo se renderiza si viene en el objeto 'alternateLinks'. */}
    </Helmet>
  );
};

export default SeoTags;