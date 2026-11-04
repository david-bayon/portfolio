/* ============================================================
   ARCHIVO  —  imágenes de la página "Show all projects" (/all)
   ------------------------------------------------------------
   • Suelta imágenes o vídeos en  assets/archive/  y aparecen solos.
   • Carpetas: las imágenes de una subcarpeta se juntan en una sola
     tarjeta, p. ej. assets/archive/mi-proyecto/xxx.png → una tarjeta.
     La tarjeta enseña sólo la portada; al pulsarla se abren todas
     las de la carpeta en grande, en filas (en móvil, en una
     columna) y con 8px entre ellas.
     Portada: pon  cover: "nombre-del-archivo.png"  en ARCHIVE_TEXT
     con el nombre de la carpeta como clave; si no, es la primera.
     Si en Finder las has colocado a mano, pon también
     order: ["a.jpg", "b.png", …]  (las que falten van detrás).
   • Vídeos (.mp4, .webm, .mov): en bucle y sin sonido; al pulsar
     se abren en grande, desde el principio y con sonido.
   • Texto de debajo (título + descripción): en ARCHIVE_TEXT, con el
     nombre del archivo o de la carpeta como clave; title/desc pueden ser
     un texto o { en: "...", es: "..." }. Si una pieza no está ahí, el
     texto sale de su nombre, con un _ entre los dos:
     «Marca_Descripción.png» (las carpetas igual; sin _ sólo hay título).
     Para traducir esos textos sacados del nombre, añádelos a ARCHIVE_I18N
     ({ es, en }; name: "tal cual" si en el nombre está escrito distinto).
   • Nombres: minúsculas, sin espacios ni tildes y con lo que se ve, para
     el SEO: marca-pieza-detalle.jpg. Dentro de una carpeta van por orden
     alfabético: numéralas (-01-, -02-…) si importa cuál va antes.
   • Orden de las tarjetas: el de ARCHIVE_ORDER (más abajo), con los
     nombres tal cual están en Finder; lo que no esté ahí va detrás, por
     orden alfabético. Si renombras algo, cámbialo también ahí.
     Dentro de una carpeta: alfabético, o el de su order.
   • Tamaño: cada pieza va en una caja fija según su forma (TALL / WIDE /
     PANORAMIC, más abajo) y la imagen la llena, recortando lo que sobre.
     La base es el alto de una vertical (1 columna, formato A). A pantalla
     completa: vertical, 1 columna; horizontal, 2 columnas y el mismo alto;
     muy vertical, 1 columna y 1,5 veces el alto; muy apaisada, 3 columnas
     y sin recortar (con su propia proporción). En pantallas más pequeñas
     todas ocupan una columna.
   ============================================================ */
export const ARCHIVE_TEXT = {
  "beatriz-hoteles-restaurant-menus": { title: "Beatriz Hoteles", desc: { en: "Menu layout and design for the hotel restaurants", es: "Maquetación y diseño de cartas para los restaurantes del hotel" } },
  "four-design-studio-identity": { title: "FOUR", desc: { en: "Identity for a design studio", es: "Identidad para un estudio de diseño" } },
  "ifema-zhang-yimou-exhibition-posters": { title: "IFEMA Zhang Yimou", desc: { en: "Communication and user experience for an immersive exhibition at IFEMA", es: "Comunicación y experiencia de usuario para una exhibición inmersiva en IFEMA" } },
  "ifema-zhang-yimou-exhibition-tickets": { title: "IFEMA Zhang Yimou", desc: { en: "Tickets for an immersive exhibition at IFEMA", es: "Entradas para una exhibición inmersiva en IFEMA" } },
  "under-armour-la-2028-campaign": { title: "Under Armour", desc: { en: "Advertising campaign for the LA 2028 Olympics", es: "Campaña de publicidad para las Olimpiadas LA 2028" } },
  "cold-culture-nyc-pop-up-campaign": { title: "Cold Culture", desc: { en: "Social media campaign for the New York pop-up", es: "Campaña de redes sociales para la pop-up en Nueva York" } },
  "museum-of-art-design-event-poster.jpg": { title: "Museum of Art & Design", desc: { en: "Advertising poster for an event", es: "Cartel publicitario para un evento" } },
  "bambata-collectible-packaging-flyer-horizontal.jpg": { title: "BAMBATA", desc: { en: "Collectible packaging flyer", es: "Flyer coleccionable para el packaging" } },
  "un-international-workers-day-poster.jpg": { title: { en: "UN", es: "ONU" }, desc: { en: "Advertising poster for International Workers' Day", es: "Cartel publicitario para el Día Internacional del Trabajador" } },
  "cold-culture-nyc-tee-graphic.jpg": { title: "Cold Culture", desc: { en: "T-shirt graphic", es: "Gráfica para camiseta" } },
  "museum-of-art-design-event-invitation": { title: "Museum of Art & Design", desc: { en: "Event invitation card", es: "Tarjeta de invitación para un evento" } },
  "kigo-japanese-restaurant-identity-booking-app.webp": { title: "KIGO", desc: { en: "Identity and web booking system for a Japanese restaurant", es: "Identidad y sistema de reservas web para un restaurante japonés" } },
  "starbucks-valentines-day-poster.jpg": { title: "Starbucks", desc: { en: "Advertising poster for Valentine's Day", es: "Cartel publicitario para San Valentín" } },
  "bambata-tee-graphic.jpg": { title: "BAMBATA", desc: { en: "T-shirt graphic", es: "Gráfica para camiseta" } },
  "the-north-face-700-poster.png": { title: "The North Face", desc: { en: "Advertising poster for the 700 model", es: "Cartel publicitario para el modelo 700" } },
  "wilson-3d-display-animation.mp4": { title: "Wilson", desc: { en: "3D animation for an advertising display", es: "Animación 3D para un display publicitario" } },
  "bambata-collectible-packaging-flyer-vertical.png": { title: "BAMBATA", desc: { en: "Collectible packaging flyer", es: "Flyer coleccionable para el packaging" } },
  "look-for-the-bright-side-of-a-job-book-cover.jpg": { title: "Look for the Bright side of a job", desc: { en: "Book cover for Manuel García", es: "Portada de libro para Manuel García" } },
  "beatriz-hoteles-sports-bar-identity.png": { title: "Beatriz Hoteles", desc: { en: "Identity for a sports bar inside the hotel", es: "Identidad para un bar de deportes dentro del hotel" } },
};

export const ARCHIVE_ORDER = [
  "beatriz-hoteles-restaurant-menus",
  "four-design-studio-identity",
  "ifema-zhang-yimou-exhibition-posters",
  "ifema-zhang-yimou-exhibition-tickets",
  "under-armour-la-2028-campaign",
  "cold-culture-nyc-pop-up-campaign",
  "museum-of-art-design-event-poster.jpg",
  "bambata-collectible-packaging-flyer-horizontal.jpg",
  "un-international-workers-day-poster.jpg",
  "cold-culture-nyc-tee-graphic.jpg",
  "museum-of-art-design-event-invitation",
  "kigo-japanese-restaurant-identity-booking-app.webp",
  "starbucks-valentines-day-poster.jpg",
  "bambata-tee-graphic.jpg",
  "the-north-face-700-poster.png",
  "wilson-3d-display-animation.mp4",
  "bambata-collectible-packaging-flyer-vertical.png",
  "look-for-the-bright-side-of-a-job-book-cover.jpg",
  "beatriz-hoteles-sports-bar-identity.png",
];

export const ARCHIVE_I18N = [];

/* texto del nombre → { es, en } de ARCHIVE_I18N (o el texto tal cual si no está) */
const plain = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
const I18N = new Map(ARCHIVE_I18N.flatMap((p) => [p.name, p.es, p.en].filter(Boolean).map((s) => [plain(s), p])));
const translate = (s) => (s && I18N.get(plain(s))) || s;

const files = import.meta.glob("../archive/**/*.{jpg,jpeg,png,webp,gif,avif,mp4,webm,mov,JPG,JPEG,PNG,WEBP,MP4,MOV}", {
  eager: true,
  query: "?url",
  import: "default",
});

/* [ancho, alto] de cada archivo, leído al construir la web (plugin media-size
   de vite.config.js): cada tarjeta sabe su proporción antes de cargar */
const sizes = import.meta.glob("../archive/**/*.{jpg,jpeg,png,webp,gif,avif,mp4,webm,mov,JPG,JPEG,PNG,WEBP,MP4,MOV}", {
  eager: true,
  query: "?size",
  import: "default",
});

const IS_VIDEO = /\.(mp4|webm|mov)$/i;

const TALL = 0.6; // ancho / alto por debajo de esto → muy vertical (p. ej. las entradas de IFEMA)
const WIDE = 1; // por encima → horizontal
const PANORAMIC = 2.5; // por encima → muy apaisada (p. ej. el flyer horizontal de Bambata)

/* size: la caja de la pieza en la cuadrícula (las medidas, en main.css) */
function withSize(entry, size) {
  const r = (entry.ratio = size ? size[0] / size[1] : null);
  entry.size = !r ? "vertical" : r < TALL ? "tall" : r > PANORAMIC ? "panoramic" : r > WIDE ? "wide" : "vertical";
  return entry;
}

/* "Título_Descripción.png" → título y descripción (más _ dentro de la descripción
   cuentan como espacios); normalize: macOS guarda las tildes descompuestas */
function withText(entry, key) {
  const [name, ...desc] = key.normalize().replace(/\.(jpe?g|png|webp|gif|avif|mp4|webm|mov)$/i, "").split("_");
  const text = ARCHIVE_TEXT[key] || {};
  entry.title = text.title || translate(name.trim().charAt(0).toUpperCase() + name.trim().slice(1));
  entry.desc = text.desc || translate(desc.join(" ").trim());
  return entry;
}

/* cada archivo suelto es una tarjeta ({ type: "image" | "video", src });
   las imágenes de una misma carpeta van juntas ({ type: "group", src: portada, images, sizes });
   todas llevan ratio (ancho / alto, o null) y span (columnas a pantalla completa) */
const folders = new Map();
const rank = new Map(); // imagen de carpeta → posición en su order (las que no estén, detrás)
const sizeOf = new Map(); // imagen de carpeta → [ancho, alto], para la portada
export const ARCHIVE = [];
const keyOf = new Map(); // tarjeta → nombre del archivo o carpeta, para ARCHIVE_ORDER
Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .forEach(([path, src]) => {
    const rel = path.replace("../archive/", "").split("/");
    const file = rel.pop();
    const folder = rel.join("/");
    if (IS_VIDEO.test(file) || !folder) {
      const entry = withSize(withText({ type: IS_VIDEO.test(file) ? "video" : "image", src }, file), sizes[path]);
      keyOf.set(entry, file);
      return ARCHIVE.push(entry);
    }
    const name = rel[rel.length - 1].normalize().trim(); // macOS guarda las tildes descompuestas; trim: espacios sueltos al final del nombre
    if (!folders.has(folder)) {
      const entry = withText({ type: "group", images: [] }, name);
      folders.set(folder, entry);
      keyOf.set(entry, name);
      ARCHIVE.push(entry);
    }
    const entry = folders.get(folder);
    entry.images.push(src);
    if (file.normalize() === ARCHIVE_TEXT[name]?.cover?.normalize()) entry.src = src;
    const order = (ARCHIVE_TEXT[name]?.order || []).map((f) => f.normalize());
    const pos = order.indexOf(file.normalize());
    rank.set(src, pos < 0 ? order.length : pos);
    sizeOf.set(src, sizes[path]);
  });
folders.forEach((entry) => {
  entry.images.sort((a, b) => rank.get(a) - rank.get(b)); // estable: el resto sigue alfabético
  entry.src ||= entry.images[0];
  entry.sizes = entry.images.map((src) => sizeOf.get(src));
  withSize(entry, sizeOf.get(entry.src));
});

/* orden de las tarjetas: ARCHIVE_ORDER primero, el resto detrás (sort estable: alfabético) */
const ORDER = ARCHIVE_ORDER.map(plain);
const rankOf = (entry) => {
  const i = ORDER.indexOf(plain(keyOf.get(entry)));
  return i < 0 ? ORDER.length : i;
};
ARCHIVE.sort((a, b) => rankOf(a) - rankOf(b));
