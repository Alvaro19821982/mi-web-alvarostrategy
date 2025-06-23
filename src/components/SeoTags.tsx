// src/components/SeoTags.tsx (Código completo con Canonical y Hreflang)
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAlternateLinks } from '../context/AlternateLinksContext';

interface SeoTagsProps {
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string; 
}

const SeoTags: React.FC<SeoTagsProps> = ({ title, description, pathname, imageUrl }) => {
  const alternateLinks = useAlternateLinks();
  const baseUrl = "https://alvarostrategy.com";
  
  // MODIFICACIÓN: Construcción de la URL canónica absoluta
  // Esta es la corrección clave. Nos aseguramos de que siempre sea una URL completa.
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  // Si no se proporciona una imagen específica, usamos la imagen OpenGraph por defecto.
  const finalImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : `${baseUrl}/temp-opengraph.png`;

  return (
    <Helmet>
      {/* --- Etiquetas SEO Fundamentales --- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* --- Etiqueta Canónica --- */}
      {/* MODIFICACIÓN: Añadida la etiqueta canónica autorreferencial y absoluta. */}
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

      {/* --- MODIFICACIÓN: Etiquetas hreflang para internacionalización --- */}
      {/* Este bloque se renderiza dinámicamente si hay versiones alternativas de la página. */}
      {alternateLinks && Object.entries(alternateLinks).map(([lang, href]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={`${baseUrl}${href}`} />
      ))}
    </Helmet>
  );
};

export default SeoTags;