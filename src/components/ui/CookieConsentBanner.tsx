// src/components/ui/CookieConsentBanner.tsx
import React, { useEffect } from 'react';
import OriginalCookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { Link } from 'react-router-dom';

// Definimos el tipo para el objeto de consentimiento que onConsentChange espera
type ConsentPayload = {
  analytics?: boolean;
  marketing?: boolean;
  [key: string]: boolean | undefined;
};

// Definimos las props que nuestro componente CookieConsentBanner aceptará
interface CookieConsentBannerProps {
  onConsentChange: (consent: ConsentPayload) => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onConsentChange }) => {

  useEffect(() => {
    // Comprobar si el consentimiento ya fue dado a través de la cookie de esta librería
    // alvaroStrategyCookieConsent es el cookieName que has definido abajo.
    const consentAlreadyGiven = getCookieConsentValue("alvaroStrategyCookieConsent") === "true";

    if (consentAlreadyGiven) {
      // Si la cookie de `react-cookie-consent` indica que ya se aceptó,
      // llamamos a onConsentChange para asegurar que el estado de App.tsx
      // y localStorage reflejen este consentimiento para 'analytics'.
      onConsentChange({ analytics: true });
    }
    // La dependencia onConsentChange es importante para que si la función cambia (poco probable si está en useCallback),
    // se re-evalúe, aunque principalmente este efecto es para el montaje inicial.
  }, [onConsentChange]);

  const handleAccept = () => {
    // Cuando el usuario hace clic en "Aceptar" en ESTE banner:
    // 1. La librería `react-cookie-consent` guardará su propia cookie ("alvaroStrategyCookieConsent").
    // 2. Llamamos a `onConsentChange` para informar a App.tsx.
    // Asumimos que "Aceptar" en este banner simple implica consentimiento para 'analytics'.
    onConsentChange({ analytics: true });
    // console.log("Cookies aceptadas a través del banner."); // Para depuración
  };

  return (
    <OriginalCookieConsent
      location="bottom"
      buttonText="Aceptar"
      cookieName="alvaroStrategyCookieConsent" // Nombre de la cookie que guarda el consentimiento
      style={{
        background: "#1f2937", // Un gris oscuro, ajusta si prefieres #2B373B
        color: "#FFFFFF",
        fontSize: "14px",
        textAlign: "left",
        padding: "18px 25px",
        alignItems: "center",
        zIndex: 9999,
        borderTop: "1px solid #374151" // Un borde sutil
      }}
      buttonStyle={{
        background: "#6d28d9", // Púrpura (similar a indigo-600 o purple-600 de Tailwind)
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "600", // semibold
        borderRadius: "8px", // md
        padding: "10px 25px",
        // margin: "0px 15px", // Eliminado para mejor alineación con flex
      }}
      contentStyle={{
        flexGrow: 1, // Para que el texto ocupe el espacio disponible
        margin: "0px",
        marginRight: "20px" // Espacio entre texto y botón
      }}
      expires={180} // 6 meses
      debug={true} // Quitar para producción, útil para desarrollo para que siempre aparezca
      onAccept={handleAccept}
      // Si quisieras un botón de rechazar y manejar esa lógica:
      // enableDeclineButton
      // declineButtonText="Rechazar"
      // onDecline={() => {
      //   onConsentChange({ analytics: false, marketing: false });
      //   console.log("Cookies rechazadas a través del banner.");
      // }}
      // declineButtonStyle={{ background: "#4A5568", borderRadius: "8px", padding: "10px 20px", fontWeight: "600" }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 auto', marginRight: '20px', marginBottom: '10px' }}>
          Utilizamos cookies propias y de terceros para ofrecerte la mejor experiencia en nuestra web y analizar la navegación.
          Puedes aprender más sobre qué cookies utilizamos o desactivarlas en nuestra{" "}
          <Link to="/politica-cookies" className="underline hover:text-blue-400 transition-colors font-semibold">
            política de cookies
          </Link>
          .
        </div>
        {/* El botón se renderiza por la librería, no es necesario ponerlo aquí explícitamente si usas buttonText */}
      </div>
    </OriginalCookieConsent>
  );
};

export default CookieConsentBanner;