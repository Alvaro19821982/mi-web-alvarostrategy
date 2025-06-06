// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Fallback UI opcional
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Error Boundary caught an error:", error, errorInfo);
    // Aquí podrías enviar el error a Sentry, LogRocket, etc.
  }

  public render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback.
      // Si se proporciona un fallback, úsalo, sino null para no renderizar nada.
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      // Opcional: Un mensaje de error genérico si no se proporciona fallback
      // console.warn("CookieConsentBanner o una de sus dependencias falló en cargarse. El banner no se mostrará.");
      return null; // No renderiza nada si falla y no hay fallback específico
    }

    return this.props.children;
  }
}

export default ErrorBoundary;