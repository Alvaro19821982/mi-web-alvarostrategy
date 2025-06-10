// src/components/ui/CookieConsentBanner.tsx
import React from 'react';
import OriginalCookieConsent from "react-cookie-consent";
import { Link } from 'react-router-dom';

// Definimos el tipo para el objeto de consentimiento que onConsentChange espera
type ConsentPayload = {
  analytics?: boolean;
  marketing?: boolean;
};

// Definimos las props que nuestro componente CookieConsentBanner aceptará
interface CookieConsentBannerProps {
  onConsentChange: (consent: ConsentPayload) => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onConsentChange }) => {

  const handleAccept = () => {
    // Cuando el usuario hace clic en "Aceptar", informamos a App.tsx
    // que el consentimiento para 'analytics' ha sido otorgado.
    onConsentChange({ analytics: true });
  };

  const handleDecline = () => {
    // Cuando el usuario hace clic en "Rechazar", informamos a App.tsx
    // que el consentimiento ha sido denegado.
    onConsentChange({ analytics: false });
  };

  return (
    <OriginalCookieConsent
      // Props de configuración
      location="bottom"
      cookieName="alvaroStrategyCookieConsent" // Nombre de la cookie que guarda la decisión ("true" o "false")
      expires={150} // 150 días de duración para la cookie

      // Props de control de acciones
      onAccept={handleAccept}
      onDecline={handleDecline}
      enableDeclineButton // Habilitamos el botón de rechazar

      // Desactivamos los estilos en línea de la librería para usar Tailwind
      disableStyles={true}

      // Clases de Tailwind para los contenedores
      containerClasses="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm text-white p-4 sm:p-5 shadow-2xl border-t border-slate-700 z-[9999] animate-fade-in-up"
      contentClasses="flex items-center justify-between flex-wrap gap-4"
      
      // Clases para los botones
      buttonClasses="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-transform hover:scale-105"
      buttonText="Aceptar"
      declineButtonClasses="bg-slate-700 text-slate-200 font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors hover:bg-slate-600"
      declineButtonText="Rechazar"
    >
      {/* Contenido del banner */}
      <div className="text-sm leading-relaxed text-slate-200 flex-grow mr-4">
        Utilizamos cookies propias y de terceros para analizar la navegación y mejorar tu experiencia. Al aceptar, das tu consentimiento para el uso de cookies de análisis. Puedes obtener más información en nuestra{" "}
        <Link to="/politica-cookies" className="font-semibold underline hover:text-blue-400 transition-colors">
          política de cookies
        </Link>.
      </div>
    </OriginalCookieConsent>
  );
};

export default CookieConsentBanner;