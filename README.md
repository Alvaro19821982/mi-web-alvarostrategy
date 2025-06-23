# AlvaroStrategy.com - Sitio Web Corporativo

Este es el repositorio para el sitio web oficial de AlvaroStrategy.com, un portafolio y blog profesional construido con tecnologías modernas, enfocado en el rendimiento, el SEO y una experiencia de usuario multilingüe.

## Descripción del Proyecto

El sitio web sirve como una plataforma para mostrar los servicios de consultoría en SEO e Inteligencia Artificial de Álvaro Fernández de Celis. Incluye un sistema de blog dinámico gestionado a través de archivos Markdown, soporte para múltiples idiomas (español, inglés y francés) y está optimizado para un excelente posicionamiento en buscadores.

## Stack Tecnológico

-   **Framework:** [React](https://react.dev/) con [Vite](https://vitejs.dev/)
-   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/)
-   **Enrutamiento:** [React Router](https://reactrouter.com/)
-   **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
-   **Internacionalización (i18n):** [i18next](https://www.i18next.com/)
-   **Gestión de Contenido del Blog:** Archivos Markdown con `gray-matter`.
-   **Scripts de Construcción:** Node.js

## Características Principales

-   **Soporte Multilingüe (i18n):** Contenido y rutas totalmente traducidas para español, inglés y francés.
-   **Blog Dinámico:** Los artículos del blog se generan a partir de archivos Markdown, facilitando la creación y gestión de contenido.
-   **Generación Automática de Sitemap:** Un script personalizado (`build-sitemap.mjs`) crea un `sitemap.xml` completo y optimizado para SEO, incluyendo etiquetas `hreflang` para todas las páginas y todos los idiomas.
-   **Optimización SEO Avanzada:**
    -   Componente `SeoTags` para gestionar metaetiquetas (title, description, canonical, OG).
    -   Generación de `robots.txt` optimizado.
    -   Configuración de servidor segura y de alto rendimiento a través de `.htaccess`.
-   **Diseño Responsivo:** Totalmente adaptable a dispositivos móviles, tabletas y ordenadores de escritorio.

## Estructura del Proyecto

-   `public/`: Contiene los assets estáticos, incluyendo `robots.txt`, el `sitemap.xml` generado, y los archivos de traducción en `public/locales/`.
-   `scripts/`: Contiene los scripts de Node.js que se ejecutan durante el proceso de construcción.
    -   `build-blog.mjs`: Lee los archivos Markdown y crea `public/blog-data.json`.
    -   `build-sitemap.mjs`: Genera el `sitemap.xml` a partir de las rutas y el blog.
-   `src/`: Contiene todo el código fuente de la aplicación React.
    -   `src/components/`: Componentes reutilizables de la aplicación.
    -   `src/content/blog/`: La raíz del contenido del blog, organizado en carpetas por idioma (`es`, `en`, `fr`).
    -   `src/pages/`: Los componentes que representan cada página de la aplicación.
    -   `src/lib/`: Funciones de utilidad y lógica de datos.
    -   `src/routes.ts`: Archivo central de configuración de rutas.

## Puesta en Marcha (Desarrollo Local)

1.  **Requisitos Previos:** Asegúrate de tener instalado Node.js (versión 20 o superior recomendada).

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:8080`.

## Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo de Vite con Hot Module Replacement (HMR).
-   `npm run build:blog`: Ejecuta el script para generar `public/blog-data.json` a partir de los archivos `.md`.
-   `npm run build:sitemap`: Ejecuta el script para generar `public/sitemap.xml`.
-   `npm run build`: Comando principal para producción. Ejecuta `build:blog`, `build:sitemap`, comprueba los tipos con TypeScript (`tsc`) y finalmente empaqueta la aplicación con Vite.
-   `npm run lint`: Analiza el código en busca de errores y problemas de estilo.
-   `npm run preview`: Inicia un servidor local para previsualizar la build de producción.

## Flujo de Trabajo para Añadir Contenido

### Para Añadir un Nuevo Post en el Blog

1.  **Crear Archivos Markdown:** Crea un archivo `.md` para cada idioma en su respectiva carpeta (`/es`, `/en`, `/fr`) dentro de `src/content/blog/`.
2.  **Usar `translationKey`:** Asegúrate de que los tres archivos compartan la misma `translationKey` en el `frontmatter` para que el sistema pueda enlazarlos.
3.  **Definir `categoryKey`:** Asigna una `categoryKey` que sea idéntica en los tres idiomas para la misma categoría.
4.  **Añadir Etiquetas:** Usa la estructura `key`/`name` para las etiquetas, asegurando que la `key` sea la misma para etiquetas conceptualmente idénticas en diferentes idiomas.
5.  **Reconstruir la Aplicación:** Ejecuta `npm run build` para que los cambios se reflejen en los datos del blog y en el sitemap antes de desplegar. Para desarrollo, `npm run dev` suele ser suficiente para ver los cambios en la página.