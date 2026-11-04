/* ============================================================
   DATOS DEL SITIO  —  edita aquí para meter tus proyectos
   ------------------------------------------------------------
   • PROJECTS  → tarjetas del menú lateral (todas las páginas) y grid de /all
   • ABOUT     → contenido de la página "About me" (entrada del sitio)
   • SITE      → textos globales (reloj, wordmark, etc.)

   Idiomas: cualquier texto puede ser un string (sale igual en EN y ES)
   o { en: "...", es: "..." } para traducirlo (ver assets/js/i18n.js).

   Para añadir un proyecto:
     1) añade una entrada a PROJECTS con un `slug` único
     2) (opcional) añade el caso completo en assets/js/case-studies.js
        con la misma clave `slug`.  Si no lo añades, la ficha
        project.html?p=slug muestra una versión mínima automática.
   ============================================================ */

/* helper: ruta de una imagen. Usa rutas de la carpeta public/
   (p. ej. "work/mi-proyecto/foto.jpg") o URLs completas: se devuelven
   tal cual. El segundo parámetro (ancho) se ignora. */
export function img(file) {
  return file || "";
}

export const SITE = {
  wordmark: "David Bayón Mateo",
  clockCity: "Madrid",
  clockTz: "Europe/Madrid",
  aboutBlurb: "David Bayón Mateo is a Graphic and Multimedia Designer based in Madrid.",
};

/* ---------- Proyectos (menú lateral + grid /all) ----------
   type: "internal" → abre project.html?p=<slug>
   type: "external" → abre `url` en otra pestaña
   cover: media de la ficha mínima si aún no hay caso de estudio (si falta, usa el thumb)
   card:  carpeta de assets/cards/ con el diseño de la tarjeta del menú
   cardKeep: colores del diseño SVG que no pasan a gris con el ratón sobre el contenido
*/
export const PROJECTS = [
  { slug: "dandad-new-blood", card: "dandad-new-blood", cardKeep: ["#ffd100", "#19191f"], title: "D&AD New Blood Awards", desc: { en: "Monotype x Penguin awareness campaign", es: "Campaña de concienciación para Monotype x Penguin" }, thumb: "work/dandad-new-blood/monotype-logo-icon.png" },
  { slug: "yeezy-slide", card: "yeezy-slide", title: "Yeezy Slide YS-01", desc: { en: "Making 3D visuals for a product launch", es: "Creando visuales 3D para el lanzamiento de un producto" }, thumb: "work/yeezy-slide/yeezy-yzy-logo-icon.jpg" },
  { slug: "legacy-virgil-abloh", card: "legacy-virgil-abloh", title: "Legacy", desc: { en: "Editorial fanzine dedicated to Virgil Abloh", es: "Fanzine editorial dedicado a Virgil Abloh" }, thumb: "work/legacy-virgil-abloh/legacy-fanzine-pattern-icon.jpg" },
  { slug: "goodmorning-coffee", card: "goodmorning-coffee", title: "GoodMorning Coffee", desc: { en: "Building a coffee sub-brand with its own packaging for GoodNews", es: "Construcción de una submarca de café con packaging propio para GoodNews" }, thumb: "work/goodmorning-coffee/goodmorning-coffee-smiley-icon.png" },
  { slug: "vino-claro", card: "vino-claro", title: "Vino Claro", desc: { en: "Packaging design for a wine that's a little different", es: "Diseño de packaging para un vino un poco diferente" }, thumb: "work/vino-claro/vino-claro-bottle-icon.jpg" },
  { slug: "kaotiko-mural", card: "kaotiko-mural", title: "Kaotiko", desc: { en: "Painting a mural in the Madrid store to go with the new identity", es: "Pintando un mural en la tienda de Madrid para acompañar la nueva identidad" }, thumb: "work/kaotiko-mural/kaotiko-logo-icon.jpg" },
  { slug: "bambata-ss25", card: "bambata-ss25", title: { en: "Bambata SS/25 Campaign", es: "Campaña SS/25 Bambata" }, desc: { en: "Creating the communication for the new summer T-shirts", es: "Haciendo la comunicación de las nuevas camisetas de verano" }, thumb: "work/bambata-ss25/bambata-logo-icon.jpg" },
  { slug: "bambata-aw", card: "bambata-aw", title: { en: "Bambata A/W Campaign", es: "Campaña A/W Bambata" }, desc: { en: "Creating the autumn/winter collection from scratch", es: "Creando la colección de otoño-invierno desde cero" }, thumb: "work/bambata-aw/bambata-aw-helmet-icon.jpg", cover: { type: "video", src: "work/bambata-aw/bambata-aw-helmet-campaign-film.mp4", ratio: "4 / 5", button: true, loop: false } },
  { slug: "bambata-photography", card: "bambata-photography", title: { en: "Bambata Photography Project", es: "Proyecto de fotografía Bambata" }, desc: { en: "Defining the photographic style of the mountain campaign", es: "Definiendo el estilo fotográfico de la campaña de montaña" }, thumb: "work/bambata-photography/bambata-photography-climber-icon.jpg", cover: { type: "video", src: "work/bambata-photography/bambata-photography-mountain-campaign-film.mp4", ratio: "16 / 9", button: true, loop: false } },
  { slug: "vogue-backstage", card: "vogue-backstage", title: "Vogue Backstage", desc: { en: "Designing the Vogue universe and its immersive fashion event in Madrid", es: "Diseñando el universo de Vogue y su evento inmersivo de moda en Madrid" }, thumb: "work/vogue-backstage/vogue-backstage-logo-icon.jpg" },
  { slug: "basse", card: "basse", title: "BASSE", desc: { en: "Branding for a line of canned wine cocktails", es: "Branding para una línea de cócteles de vino en lata" }, thumb: "work/basse/basse-spritz-can-in-ice.png" },
  { slug: "halfway-magazine", card: "halfway-magazine", title: "Halfway Magazine", desc: { en: "Editorial design for a magazine about unfinished ideas", es: "Diseño editorial para una revista sobre ideas inacabadas" }, thumb: "work/halfway-magazine/halfway-magazine-logo-variations.jpg" },
  { slug: "sony-music-display", card: "sony-music-display", title: { en: "Sony Music Display Stand", es: "Expositor Sony Music" }, desc: { en: "Designing an in-store display stand for Sony Music", es: "Diseño de un expositor en tienda para Sony Music" }, thumb: "work/sony-music-display/sony-music-publishing-logo.svg" },
].map((p) => ({ type: "internal", ...p }));

/* ---------- About me ---------- */
export const ABOUT = {
  hero: "about/david-bayon-mateo-graphic-designer-madrid-poster.jpg",
  heroVideo: "about/david-bayon-mateo-graphic-designer-madrid.mp4",
  studioText: {
    en: "Hi, my name is David Bayón and I've just graduated in Graphic and Multimedia Design. I currently live in Madrid.<br><br>Over these years I've learned that good design starts with a solid strategy, always knowing why and who you're designing for, and above all paying attention to the small details that make the difference.<br><br>Here you can browse a selection of my work. Hope you like it!",
    es: "Hola, me llamo David Bayón y acabo de graduarme en diseño gráfico y multimedia. Actualmente vivo en Madrid.<br><br>Durante estos años he aprendido que un buen diseño comienza con una estrategia sólida, sabiendo siempre para qué y para quién se diseña, y sobre todo dándole importancia a los pequeños detalles que marcan la diferencia.<br><br>Aquí puedes ojear mi selección de trabajos. ¡Espero que te guste!",
  },
  contact: [
    { label: { en: "New Business", es: "Nuevos proyectos" }, value: "david.bayon.mateo@gmail.com", href: "mailto:david.bayon.mateo@gmail.com" },
    /* URLs limpias (sin ?hl= ni ?isSelfProfile=): en móvil iOS/Android las abren
       directamente en la app de Instagram / LinkedIn si está instalada. */
    { label: { en: "Social", es: "Redes" }, links: [{ value: "Instagram", href: "https://www.instagram.com/davidb.mateo/" }, { value: "LinkedIn", href: "https://www.linkedin.com/in/david-bayon-mateo-7b85a4239/" }] },
  ],
  /* Education / Languages / Volunteering / Experience comparten formato:
     title, date, team (centro u organización), location y href opcionales.
     Orden: de más reciente a más antiguo (lo que sigue en curso primero). */
  education: [
    { title: { en: "Bilingual BA in Graphic and Multimedia Design", es: "Grado bilingüe en Diseño Gráfico y Multimedia" }, date: { en: "Sep 2022 – 2026", es: "sept. 2022 – 2026" }, team: { en: "UDIT University, Madrid", es: "UDIT, Madrid" } },
    { title: { en: "AI: Claude 101, Claude Cowork and Claude Code", es: "IA: Claude 101, Claude Cowork y Claude Code" }, date: "2026", team: "Anthropic" },
    { title: { en: "Videography / DaVinci Resolve Course", es: "Curso de videografía / DaVinci Resolve" }, date: { en: "Dec 2023 – Apr 2024", es: "dic. 2023 – abr. 2024" }, team: "RBG Escuela" },
    { title: { en: "Programming: Arduino, Unity and Scratch", es: "Programación: Arduino, Unity y Scratch" }, date: "2018 – 2019", team: { en: "Sindormir.net and Camp Tecnológico · 56 h of Arduino (basic, motors, intermediate)", es: "Sindormir.net y Camp Tecnológico · 56 h de Arduino (básico, motores, intermedio)" } },
  ],
  /* Languages: title = idioma, date = nivel, team = certificado y contexto */
  languages: [
    { title: { en: "Spanish", es: "Español" }, date: { en: "Native", es: "Nativo" }, team: "" },
    { title: { en: "English", es: "Inglés" }, date: "B2", team: { en: "Cambridge Linguaskill 2023 · Listening C1 · Bilingual degree · School terms in Ireland", es: "Cambridge Linguaskill 2023 · Comprensión auditiva C1 · Grado bilingüe · Estancias escolares en Irlanda" } },
    { title: { en: "French", es: "Francés" }, date: "B1", team: "Institut Français de Madrid, 2018 – 2022" },
  ],
  volunteering: [
    { title: { en: "Volunteer, Arcores and Cáritas", es: "Voluntario, Arcores y Cáritas" }, date: { en: "Sep 2021 – 2022", es: "sept. 2021 – 2022" }, team: { en: "Santa Irene Parish", es: "Parroquia Santa Irene" } },
    { title: { en: "Solidarity Group", es: "Grupo solidario" }, date: "2020 – 2022", team: "Colegio Agustiniano" },
  ],
  /* Experience (title = puesto, team = organización y resultados, location opcional) */
  events: [
    { title: { en: "Co-Founder & Creative Director, Bambata", es: "Cofundador y director creativo, Bambata" }, date: { en: "2024 – Present", es: "2024 – actualidad" }, team: { en: "Clothing brand · 300+ units sold · 3,000 Instagram followers", es: "Marca de ropa · Más de 300 unidades vendidas · 3.000 seguidores en Instagram" } },
    { title: { en: "Junior Designer Intern, Hugin and Munin", es: "Prácticas de diseñador junior, Hugin and Munin" }, date: { en: "Feb 2025 – May 2025", es: "feb. 2025 – may. 2025" }, team: { en: "Design and communication studio · Hitachi, UNHCR, Beatriz Hoteles", es: "Estudio de diseño y comunicación · Hitachi, ACNUR, Beatriz Hoteles" } },
    { title: { en: "Youth Leisure Instructor, Scout Group 284", es: "Monitor de ocio y tiempo libre, Grupo Scout 284" }, date: { en: "Sep 2023 – Sep 2026", es: "sept. 2023 – sept. 2026" }, team: { en: "Certified by CEYFE – La Salle · Member of the group since 2012", es: "Titulado por CEYFE – La Salle · Miembro del grupo desde 2012" } },
  ],
};
