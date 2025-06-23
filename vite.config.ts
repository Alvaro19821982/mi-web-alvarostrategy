import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { readFileSync } from 'fs'; // Importamos el módulo 'fs' de Node

// Plugin simple para inyectar el CSS crítico
const injectCriticalCss = () => {
  return {
    name: 'inject-critical-css',
    transformIndexHtml(html: string) {
      const criticalCss = readFileSync(path.resolve(__dirname, 'public/critical.css'), 'utf-8');
      return html.replace(
        '<style>/* Contenido de public/critical.css irá aquí durante el build */</style>',
        `<style>${criticalCss}</style>`
      );
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectCriticalCss()], // Añadimos el nuevo plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})