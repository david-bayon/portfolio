/* ============================================================
   IDIOMA (EN / ES)
   ------------------------------------------------------------
   • Cualquier texto de data.js / case-studies.js / archive.js
     puede ser un string normal (sale igual en los dos idiomas)
     o un objeto { en: "...", es: "..." }.
   • Los textos fijos de la interfaz están en UI, aquí abajo.
   • Idioma inicial: el que eligió el visitante con el botón de
     banderas; si nunca lo pulsó, el de su navegador (español →
     ES, cualquier otro → EN).
   ============================================================ */
export const LANGS = {
  en: { flag: "🇬🇧", locale: "en-US", label: "English" },
  es: { flag: "🇪🇸", locale: "es-ES", label: "Español" },
};

const STORAGE_KEY = "lang";

function detectLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored in LANGS) return stored;
  } catch (e) { /* almacenamiento bloqueado */ }
  return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
}

export const lang = detectLang();
export const locale = LANGS[lang].locale;

/* guarda el idioma y recarga para volver a pintar todo en ese idioma */
export function setLang(next) {
  try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* noop */ }
  location.reload();
}

/* t(): devuelve el texto en el idioma actual (o en inglés si falta) */
export const t = (v) => (v && typeof v === "object" ? v[lang] ?? v.en : v);

/* textos fijos de la interfaz */
const UI = {
  archive: { en: "Archive", es: "Archivo" },
  work: { en: "Work", es: "Trabajos" },
  aboutMe: { en: "About me", es: "Sobre mí" },
  showLess: { en: "Show Less", es: "Ver menos" },
  switchLang: { en: "Cambiar a español", es: "Switch to English" },
  close: { en: "Close", es: "Cerrar" },
  previous: { en: "Previous", es: "Anterior" },
  next: { en: "Next", es: "Siguiente" },
  interactive: { en: "Interactive experience", es: "Experiencia interactiva" },
  viewLarge: { en: "View {title} full size", es: "Ver {title} en grande" },
  getInTouch: { en: "Get in Touch", es: "Ponte en contacto" },
  skills: { en: "Skills", es: "Habilidades" },
  services: { en: "Services", es: "Servicios" },
  contact: { en: "Contact", es: "Contacto" },
  languages: { en: "Languages", es: "Idiomas" },
  volunteering: { en: "Volunteering", es: "Voluntariado" },
  education: { en: "Education", es: "Formación" },
  experience: { en: "Experience", es: "Experiencia" },
  notFound: { en: "Project not found", es: "Proyecto no encontrado" },
  notFoundMsg: { en: "That project doesn't exist yet. Add it in assets/js/data.js.", es: "Ese proyecto todavía no existe. Añádelo en assets/js/data.js." },
  backHome: { en: "Back home", es: "Volver al inicio" },
  addCaseStudy: {
    en: "Add the full case study in <em>assets/js/case-studies.js</em> with the key <strong>{slug}</strong>.",
    es: "Añade el caso completo en <em>assets/js/case-studies.js</em> con la clave <strong>{slug}</strong>.",
  },
  projectInfo: { en: "Project Information", es: "Información del proyecto" },
  credits: { en: "Credits", es: "Créditos" },
  projectImages: { en: "Project Images", es: "Imágenes del proyecto" },
  downloadImages: { en: "Download Project Images", es: "Descargar imágenes del proyecto" },
};

/* ui("viewLarge", { title: "Yeezy" }) → "View Yeezy full size" */
export function ui(key, vars = {}) {
  return t(UI[key]).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
