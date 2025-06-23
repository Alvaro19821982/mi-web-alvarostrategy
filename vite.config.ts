// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// No necesitamos más la lógica de sitemap aquí, se ha movido a /scripts

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Se ha eliminado el plugin de sitemap y la lógica de generación de rutas de aquí.
    // Nuestro script 'npm run build:sitemap' ahora se encarga de todo.
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});