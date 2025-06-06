// src/lib/blogData.ts

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastModified?: string; // AÑADIDO: Opcional
  author: string;
  image: string;         // ID de Unsplash
  imageAlt: string;      // AÑADIDO: Obligatorio y descriptivo para SEO
  excerpt: string;
  category: string;
  tags: string[];
  content: string;       // Contenido completo del artículo (HTML como string)
}

export const blogPosts: BlogPost[] = [
  {
    slug: "desmitificando-seo-lo-que-nadie-te-cuenta",
    title: "Desmitificando el SEO: lo que NADIE te cuenta para dominar Google (y tu mercado)", // Capitalización corregida
    date: "2025-06-10",
    // lastModified: "2025-06-11", // Ejemplo si lo actualizas
    author: "Álvaro Fernández de Celis", // Cambiado para consistencia y E-E-A-T
    image: "photo-1551288049-bebda4e38f71",
    imageAlt: "Consultor SEO analizando gráficos de rendimiento web y datos de posicionamiento.", // TEXTO ALT DESCRIPTIVO Y CON KEYWORDS
    excerpt: "Olvídate de los trucos de gurú y las métricas de vanidad. El SEO real va de entender a tu cliente y darle lo que busca para que Google te ame (y te envíe clientes que pagan)...",
    category: "SEO",
    tags: ["SEO", "estrategia digital", "posicionamiento web", "Google"], // Keywords en minúscula
    content: `
      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">Hablemos claro: el 90% de lo que lees sobre SEO por ahí es paja. O peor, consejos de la señorita Pepis que funcionaban en 2010. Si estás aquí es porque quieres resultados, no palmaditas en la espalda por tener muchas visitas que no convierten una mierda.</p>
      
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mt-8 mb-4">El SEO no es magia negra (aunque algunos lo vendan así)</h2>
      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">El verdadero SEO es una mezcla de ciencia, arte y, sobre todo, ENTENDER A TU PUTO CLIENTE. ¿Qué busca? ¿Qué necesita? ¿Qué le quita el sueño? Si respondes a eso mejor que tu competencia, Google te pondrá una alfombra roja. Si no, seguirás siendo el fantasma de la ópera en las SERPs.</p>
      <ul class="list-disc list-inside space-y-2 mb-6 text-lg leading-relaxed sm:leading-loose pl-5">
        <li><strong>Investigación de palabras clave que VENDEN:</strong> No las que solo traen curiosos.</li>
        <li><strong>Contenido que responde y convierte:</strong> Útil para el usuario, optimizado para el robot.</li>
        <li><strong>SEO técnico sin fisuras:</strong> Tu web tiene que ir como un tiro y ser un libro abierto para Google.</li>
        <li><strong>Link building inteligente y ético:</strong> Enlaces que suman autoridad, no que te meten en un jardín.</li>
      </ul>

      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mt-8 mb-4">Métricas que importan (y las que solo sirven para inflar egos)</h2>
      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">¿Posición media? ¿Número de keywords en top 10? Bonito para el informe, pero ¿y la caja? Nos centramos en el tráfico que convierte, en cómo el SEO impacta en tu CAC, tu LTV y, al final, en tu BENEFICIO. Lo demás, es para entretener a los que no saben de esto.</p>
      
      <blockquote class="border-l-4 border-blue-600 dark:border-blue-400 pl-4 sm:pl-6 italic text-gray-700 dark:text-slate-300 my-6 sm:my-8 py-2 text-xl">
        "El SEO que no se traduce en más dinero en tu bolsillo, es un hobby caro, muy caro."
      </blockquote>

      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">Si estás listo para dejar de jugar a las casitas con tu SEO y quieres una estrategia que te ponga donde tienes que estar (delante de tus clientes y de tu competencia), <a href="/contacto" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline">hablemos</a>. Pero sin rodeos, ¿eh? Que el tiempo es oro y las oportunidades no esperan.</p>
    `,
  },
  {
    slug: "ia-marketing-estrategias-reales-para-empresas-listas",
    title: "IA en marketing: menos humo, más estrategias REALES para empresas listas", // Capitalización corregida
    date: "2025-06-18",
    // lastModified: "2025-06-19", // Ejemplo
    author: "Álvaro Fernández de Celis",
    image: "photo-1620712943543-bcc4688e7485",
    imageAlt: "Visualización abstracta de redes neuronales y datos procesados por inteligencia artificial para marketing.", // TEXTO ALT DESCRIPTIVO Y CON KEYWORDS
    excerpt: "La inteligencia artificial está en boca de todos, pero pocos saben cómo usarla para ganar más pasta de verdad. Aquí te cuento cómo la IA puede ser tu mejor aliada (o tu peor pesadilla si la usas mal)...",
    category: "Inteligencia Artificial",
    tags: ["IA", "marketing digital", "automatización", "estrategia empresarial"], // Keywords en minúscula
    content: `
      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">Que sí, que la IA es la polla. Pero seamos honestos, la mayoría de las empresas la están usando para hacer el idiota o, peor aún, para complicarse la vida. ¿Quieres saber cómo usar la IA para que TRABAJE PARA TI y no al revés? Sigue leyendo.</p>

      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mt-8 mb-4">La IA no es un botón mágico (aunque te lo vendan así)</h2>
      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">No vas a instalar ChatGPT y empezar a forrarte. La IA es una herramienta, y como toda herramienta, necesitas saber CÓMO y PARA QUÉ usarla. Bien usada, te puede ahorrar un porrón de horas, optimizar tus campañas hasta niveles insospechados y darte insights que ni te imaginas. Mal usada, es un pozo sin fondo de tiempo y dinero.</p>
      <ul class="list-disc list-inside space-y-2 mb-6 text-lg leading-relaxed sm:leading-loose pl-5">
        <li><strong>Automatización inteligente:</strong> Tareas repetitivas que se hacen solas (y mejor que un humano aburrido).</li>
        <li><strong>Personalización a escala masiva:</strong> Hablarle a cada cliente como si fuera el único, pero a miles a la vez.</li>
        <li><strong>Análisis predictivo:</strong> Anticiparte a lo que va a pasar en tu mercado (y tomar ventaja antes que nadie).</li>
        <li><strong>Creación de contenido asistida:</strong> Ideas y borradores en minutos, no en días (pero siempre con tu toque maestro y validación humana).</li>
      </ul>

      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-slate-100 mt-8 mb-4">¿Dónde aplicar IA para ver resultados YA (y no en el año 3000)?</h2>
      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">En lugar de fliparte con lo último de OpenAI que aún está en pañales para el mundo real, céntrate en aplicaciones prácticas: optimizar tus anuncios de Google Ads, segmentar mucho mejor tus campañas de email marketing, analizar el feedback de tus clientes para mejorar productos, predecir qué productos se venderán más o qué clientes están a punto de largarse... Ahí es donde la IA te da una ventaja competitiva REAL y medible.</p>
      
      <blockquote class="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4 sm:pl-6 italic text-gray-700 dark:text-slate-300 my-6 sm:my-8 py-2 text-xl">
        "La IA es como un becario superdotado que no duerme, no cobra horas extra y no se queja. Pero necesita un jefe (tú o yo) que sepa qué coño pedirle y cómo interpretar lo que entrega."
      </blockquote>

      <p class="mb-5 sm:mb-6 text-lg leading-relaxed sm:leading-loose">La IA no va a reemplazar tu estrategia, la va a POTENCIAR hasta límites que hoy te parecen imposibles. Si quieres saber cómo integrar la IA de forma inteligente y rentable en tu marketing para dejar de hacer el primo y empezar a ver resultados tangibles, <a href="/contacto" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold underline">agenda una sesión estratégica</a>. Te aseguro que te volará la cabeza (para bien).</p>
    `,
  },
  // Añade aquí el resto de tus posts con las propiedades 'imageAlt' y opcionalmente 'lastModified'
];