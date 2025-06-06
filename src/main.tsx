// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <<< NUEVO IMPORT

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HelmetProvider> {/* <<< NUEVO ENVOLTORIO */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider> {/* <<< NUEVO ENVOLTORIO */}
  </React.StrictMode>
);