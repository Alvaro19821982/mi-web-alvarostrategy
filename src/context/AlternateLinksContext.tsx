// src/context/AlternateLinksContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define el tipo de datos que almacenará nuestro contexto
type AlternateLinks = Record<string, string>;

// Creamos dos contextos: uno para leer los datos y otro para actualizarlos.
// Esto es una optimización para evitar re-renderizados innecesarios.
const AlternateLinksContext = createContext<AlternateLinks | null>(null);
const SetAlternateLinksContext = createContext<React.Dispatch<React.SetStateAction<AlternateLinks | null>>>(() => {});

// Creamos el "Proveedor" que envolverá nuestra aplicación.
export const AlternateLinksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alternateLinks, setAlternateLinks] = useState<AlternateLinks | null>(null);

  return (
    <AlternateLinksContext.Provider value={alternateLinks}>
      <SetAlternateLinksContext.Provider value={setAlternateLinks}>
        {children}
      </SetAlternateLinksContext.Provider>
    </AlternateLinksContext.Provider>
  );
};

// Creamos hooks personalizados para facilitar el uso del contexto
export const useAlternateLinks = () => {
  return useContext(AlternateLinksContext);
};

export const useSetAlternateLinks = () => {
  return useContext(SetAlternateLinksContext);
};