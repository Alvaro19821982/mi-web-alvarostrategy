// src/components/CookieConsentBanner.tsx
import React from 'react';
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Link } from 'react-router-dom';

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom" // Posición del banner (bottom, top, float-bottom-left, etc.)
      buttonText="Aceptar"
      cookieName="alvaroStrategyCookieConsent" // Nombre de la cookie que guarda el consentimiento
      style={{
        background: "#2B373B", // Fondo oscuro como en tu ejemplo
        color: "#FFFFFF",
        fontSize: "13px",
        textAlign: "left", // Alineación del texto principal
        padding: "15px 20px",
        alignItems: "center", // Para centrar verticalmente si el contenedor es flex
        zIndex: 9999, // Asegurar que esté por encima de otros elementos
      }}
      buttonStyle={{
        background: "#8A2BE2", // Un color púrpura como en tu ejemplo para el botón
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "20px", // Botón redondeado
        padding: "10px 25px",
        margin: "0px 15px", // Espacio alrededor del botón
      }}
      expires={150} // Días hasta que la cookie expire y se vuelva a preguntar
      debug={true}
      // onAccept={() => { // Función que se ejecuta al aceptar
      //   alert("¡Gracias por aceptar las cookies!");
      //   // Aquí podrías inicializar scripts de tracking como Google Analytics si solo se cargan tras el consentimiento
      // }}
      // onDecline={() => { // Función si implementas un botón de "Rechazar"
      //   alert("Has rechazado las cookies no esenciales.");
      // }}
      // enableDeclineButton // Si quieres un botón de "Rechazar"
      // declineButtonText="Rechazar"
      // declineButtonStyle={{ background: "#4A5568", borderRadius: "20px", padding: "10px 20px" }}
    >
      Utilizamos cookies propias y de terceros para ofrecerte la mejor experiencia en nuestra web y analizar la navegación.
      Puedes aprender más sobre qué cookies utilizamos o desactivarlas en los{" "}
      {/*
        NOTA: El enlace a "ajustes" es más complejo de implementar con esta librería básica.
        Generalmente, se enlaza a la política de cookies donde se explica cómo el usuario puede gestionarlas
        desde su navegador.
        Si necesitas un panel de configuración de cookies granular, necesitarías una solución más avanzada
        o construirla tú mismo.
      */}
      <Link to="/politica-cookies" className="underline hover:text-blue-300 transition-colors">
        ajustes (política de cookies)
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieConsentBanner;