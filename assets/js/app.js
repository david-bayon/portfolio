/* ============================================================
   David Bayón Mateo — portafolio · lógica de la interfaz
   ============================================================ */
import { PROJECTS, ABOUT, SITE, img } from "./data.js";
import { CASE_STUDIES } from "./case-studies.js";
import { ARCHIVE } from "./archive.js";
import { LANGS, lang, locale, setLang, t, ui } from "./i18n.js";

/* ---------- helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* limpiezas a ejecutar al cambiar de página en la navegación SPA
   (intervalos, listeners globales, overlays…) */
let pageCleanups = [];
const onCleanup = (fn) => pageCleanups.push(fn);
function runCleanups() {
  pageCleanups.forEach((fn) => {
    try { fn(); } catch (e) { /* noop */ }
  });
  pageCleanups = [];
}
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k === "text") n.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null) continue;
    n.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return n;
};
const projectHref = (p) =>
  p.type === "external" ? p.slug : `project.html?p=${encodeURIComponent(p.slug)}`;
const isExternal = (p) => p.type === "external";

/* móvil (mismo corte que main.css): el menú es una pantalla propia, la lista de
   proyectos de index.html; al abrir algo se oculta y queda "Ver menos" para volver */
const MOBILE = matchMedia("(max-width: 656px)");
const TOUCH = !matchMedia("(hover: hover) and (pointer: fine)").matches;

const ARROW = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none"><path fill="currentColor" d="M10.4 0v7.8H9.1V2.3L1.4 10l-1-1 7.8-7.7H2.6V0h7.8Z"/></svg>`;
const DOWNLOAD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="14.02" viewBox="0 0 11 14.02"><path fill="currentColor" d="M5.5,14.02L-.02,8.5l.92-.92,3.89,3.89V.58h1.41l-.07,10.96,3.96-3.96.92.92-5.52,5.52Z"/></svg>`;
const PIN_ICON = `<svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 3.5C9.49 3.5 11.5 5.51 11.5 8c0 .59-.22 1.36-.6 2.21-.37.85-.89 1.74-1.44 2.55-.55.81-1.13 1.53-1.62 2.03-.25.26-.46.45-.64.58-.09.06-.15.1-.2.12-.03.02-.03.02-.03.02s0 0-.03-.02c-.05-.02-.11-.06-.2-.12a4.6 4.6 0 0 1-.64-.58c-.49-.5-1.07-1.22-1.62-2.03-.55-.81-1.07-1.7-1.44-2.55C2.72 9.36 2.5 8.59 2.5 8 2.5 5.51 4.51 3.5 7 3.5Z" stroke="currentColor"/><circle cx="7" cy="8" r="1" fill="currentColor"/></svg>`;
const CLOSE_ICON = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.875 5.875L14.125 14.125M14.125 5.875L5.875 14.125" stroke="currentColor" vector-effect="non-scaling-stroke" stroke-width="1.5"/></svg>`;


/* Construye el <div class="nav__inner"> completo (idéntico en todas las páginas) */
function navHTML() {
  /* botón de idioma: las dos banderas, la del idioma actual resaltada */
  const flags = Object.entries(LANGS)
    .map(([code, l]) => `<span class="nav__lang__flag${code === lang ? " is-active" : ""}" lang="${code}">${l.flag}</span>`)
    .join("");
  return `
  <div class="nav__inner">
    <header class="nav__top">
      <div class="nav__top__inner">
        <div class="nav__top__top">
          <div class="nav__top__top__left">
            <a href="all.html" class="page__button"><p>${ui("archive")}</p></a>
            <a href="about.html" class="page__button nav__about__button"><p>${ui("aboutMe")}</p></a>
            <button type="button" class="page__button nav__lang" aria-label="${ui("switchLang")}" title="${ui("switchLang")}">${flags}</button>
          </div>
          <div class="nav__top__top__right">
            <div class="nav__light__mode"><div class="nav__light__mode__knob"></div></div>
          </div>
        </div>
        <div class="nav__top__bottom">
          <a href="index.html" class="page__button"><div class="page__button__icon__back"></div><p>${ui("showLess")}</p></a>
        </div>
      </div>
    </header>
    <nav class="nav__cards" id="nav-cards"></nav>
  </div>`;
}

/* ============================================================
   TEMA (claro / oscuro)
   ============================================================ */
function initTheme() {
  const root = document.documentElement;
  /* lo elegido con el interruptor manda; si no hay nada se sigue el modo del
     dispositivo, también si cambia con la web abierta */
  const system = matchMedia("(prefers-color-scheme: dark)");
  const current = () => {
    const mode = localStorage.getItem("color-mode") || "system";
    return mode !== "system" ? mode : system.matches ? "dark" : "light";
  };
  apply(current());
  root.classList.add("visible");
  system.addEventListener("change", () => apply(current()));

  function apply(m) {
    root.classList.remove("dark", "light");
    root.classList.add(m);
    root.classList.toggle("has-link-arrow", false);
  }
  window.__toggleTheme = () => {
    const next = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("color-mode", next);
    apply(next);
  };
}

/* ============================================================
   Device class (hover disponible o táctil)
   ============================================================ */
function initDeviceClass() {
  document.documentElement.classList.add(TOUCH ? "device-touch" : "device-mouse");
}

/* ============================================================
   RELOJ del nav
   ============================================================ */
/* pinta fecha + hora en cualquier elemento [data-clock] (p.ej. la card Contact del About) */
function initClock() {
  const tick = () => {
    const targets = $$("[data-clock]");
    if (!targets.length) return;
    const now = new Date();
    const day = now.toLocaleDateString(locale, { weekday: "long", timeZone: SITE.clockTz });
    const md = now.toLocaleDateString(locale, { month: "long", day: "numeric", timeZone: SITE.clockTz });
    const time = now.toLocaleTimeString("en-GB", { hour12: false, timeZone: SITE.clockTz });
    targets.forEach((p) => (p.innerHTML = `${day}, ${md}<br>${SITE.clockCity}, ${time}`));
  };
  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   NAV lateral — tarjetas de proyecto
   ============================================================ */
/* diseño de cada tarjeta: el primer archivo de assets/cards/<card>/ (ver data.js) */
const CARD_FILES = import.meta.glob("../cards/*/*.{jpg,jpeg,png,webp,gif,avif,svg,mp4,webm,mov,JPG,JPEG,PNG,WEBP,GIF,SVG,MP4,MOV}", {
  eager: true,
  query: "?url",
  import: "default",
});
function cardFile(p) {
  const key = Object.keys(CARD_FILES).sort().find((k) => k.split("/")[2] === p.card);
  return key && { src: CARD_FILES[key], video: /\.(mp4|webm|mov)$/i.test(key), svg: /\.svg$/i.test(key) };
}
function cardDesign(f, eager) {
  if (!f.video) return el("img", { src: f.src, alt: "", loading: eager ? "eager" : "lazy" });
  const v = el("video", { muted: "", loop: "", playsinline: "", preload: "none", "data-lazy": "1", "data-autoplay": "1" },
    el("source", { "data-src": f.src }));
  v.muted = true;
  return v;
}

/* versión "apagada" de un diseño SVG (ratón sobre el contenido), como un logo a
   una tinta: sin el fondo, lo que va sobre el fondo en el gris del logo y lo que va
   encima de otra forma de otro color, en el gris de la tarjeta (hueco), alternando */
const hexRGB = (c) => {
  let h = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c || "")?.[1];
  if (!h) return null;
  if (h.length === 3) h = h.replace(/./g, "$&$&");
  return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
};
const paintDecl = (s) => Object.fromEntries([...(s || "").matchAll(/(fill|stroke)\s*:\s*([^;]+)/g)].map(([, k, v]) => [k, v.trim()]));
/* imagen incrustada (p. ej. un PNG con el fondo dentro): los píxeles del color del
   fondo se vuelven transparentes; el resto queda como silueta para #card-mute */
async function muteRaster(n, bg) {
  const src = n.getAttribute("href") || n.getAttribute("xlink:href") || "";
  if (!bg || !src.startsWith("data:")) return;
  /* onload y no img.decode(): decode() puede quedarse esperando con la pestaña en 2º plano */
  const img = new Image();
  await new Promise((ok, ko) => {
    img.onload = ok;
    img.onerror = ko;
    img.src = src;
  });
  /* la silueta gris se calcula a 1000 px como mucho (en la tarjeta se ve a ~130 px):
     con la foto entera, una de 4500 × 3000 bloqueaba la página casi medio segundo.
     La versión en color sigue usando la imagen original. */
  const k = Math.min(1, 1000 / Math.max(img.naturalWidth, img.naturalHeight));
  const c = el("canvas", { width: Math.round(img.naturalWidth * k), height: Math.round(img.naturalHeight * k) });
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const d = ctx.getImageData(0, 0, c.width, c.height);
  const px = d.data;
  for (let i = 0; i < px.length; i += 4)
    px[i + 3] *= Math.min(1, Math.max(0, (Math.hypot(px[i] - bg[0], px[i + 1] - bg[1], px[i + 2] - bg[2]) - 20) / 120));
  ctx.putImageData(d, 0, 0);
  n.setAttribute("href", c.toDataURL());
}
/* los diseños SVG se pintan en línea, en color y en gris, con el mismo encuadre:
   con <img>, Safari ignora object-fit en un SVG sin ancho/alto y las dos capas
   no coincidían */
async function cardSVG(src, ns, keep = [], withGray = true) {
  const raw = await (await fetch(src)).text();
  /* ids con prefijo: varios SVG en línea en la misma página no deben pisarse
     (comillas ' o ": al hacer el build, Vite incrusta los SVG pequeños con ') */
  const parse = (pre) => {
    const s = new DOMParser().parseFromString(raw.replace(/(\bid=["']|url\(#|href=["']#)/g, `$1${pre}-`), "image/svg+xml").documentElement;
    if (s.localName !== "svg" || s.querySelector("parsererror")) throw new Error("svg");
    return s;
  };
  /* clases con prefijo para que el <style> del SVG no afecte a los demás */
  const scope = (s) => {
    for (const st of s.querySelectorAll("style"))
      st.textContent = st.textContent.replace(/[^{}]+\{/g, (sel) => sel.replace(/\.(-?[_a-zA-Z][\w-]*)/g, `.${ns}-$1`));
    s.querySelectorAll("[class]").forEach((n) =>
      n.setAttribute("class", n.getAttribute("class").trim().split(/\s+/).map((c) => `${ns}-${c}`).join(" ")));
    s.setAttribute("preserveAspectRatio", "xMidYMid slice"); // = object-fit: cover
    s.setAttribute("aria-hidden", "true");
    return document.adoptNode(s);
  };
  const color = scope(parse(`${ns}c`));
  if (!withGray) return { color };
  const svg = parse(`${ns}g`);

  /* colores por clase, como los exporta Illustrator (<style> .cls-N { fill… }) */
  const styles = [...svg.querySelectorAll("style")];
  const rules = {};
  for (const st of styles)
    for (const [, sel, body] of st.textContent.matchAll(/([^{}]+)\{([^}]*)\}/g))
      for (const [, cls] of sel.matchAll(/\.([\w-]+)/g)) rules[cls] = { ...rules[cls], ...paintDecl(body) };
  const paint = (n, prop) => {
    for (let e = n; e && e !== svg.parentNode; e = e.parentElement) {
      const v = paintDecl(e.getAttribute("style"))[prop] ||
        (e.getAttribute("class") || "").split(/\s+/).map((c) => rules[c]?.[prop]).filter(Boolean).pop() ||
        e.getAttribute(prop);
      if (v && v !== "inherit") return v;
    }
    return prop === "fill" ? "#000" : "none";
  };

  const shapes = [...svg.querySelectorAll("path, rect, polygon, polyline, circle, ellipse, line, text, image")]
    .filter((n) => !n.closest("defs, clipPath, mask, pattern, symbol, marker"));
  /* fondo = primer rect que cubre todo el viewBox */
  const [, , vw, vh] = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
  const full = (n, a, v) => /%$/.test(n.getAttribute(a)) || parseFloat(n.getAttribute(a)) >= v * 0.98;
  const bg = shapes[0]?.localName === "rect" && full(shapes[0], "width", vw) && full(shapes[0], "height", vh) ? shapes.shift() : null;
  const bgFill = bg && paint(bg, "fill");
  bg?.remove();
  const fills = shapes.map((n) => (n.localName === "image" ? "image" : paint(n, "fill")));
  const strokes = shapes.map((n) => paint(n, "stroke"));
  scope(svg);

  /* qué forma va encima de cuál (sólo hace falta si el logo tiene varios colores) */
  let boxes = [];
  if (new Set(fills.filter((f) => f !== bgFill)).size > 1) {
    const probe = el("div", { style: "position:absolute;left:-10000px;top:0;width:400px;visibility:hidden" }, svg);
    document.body.append(probe);
    boxes = shapes.map((n) => n.getBoundingClientRect());
    probe.remove();
  }
  const inside = (a, b) => a.left >= b.left - 0.01 && a.top >= b.top - 0.01 && a.right <= b.right + 0.01 && a.bottom <= b.bottom + 0.01;
  const hole = [];
  shapes.forEach((n, i) => {
    let under = -1;
    if (boxes.length) for (let j = i - 1; j >= 0; j--) if (inside(boxes[i], boxes[j])) { under = j; break; }
    hole[i] = fills[i] === bgFill || (under >= 0 && (fills[i] === fills[under] ? hole[under] : !hole[under]));
    if (keep.some((c) => c.toLowerCase() === fills[i].toLowerCase())) return; // cardKeep: conserva su color
    const tone = hole[i] ? "var(--card-gray)" : "var(--card-logo)";
    if (fills[i] === "image") n.style.filter = "url(#card-mute)";
    else if (fills[i] !== "none") n.style.fill = tone;
    if (strokes[i] !== "none") n.style.stroke = tone;
  });
  await Promise.all(shapes.filter((n) => n.localName === "image").map((n) => muteRaster(n, hexRGB(bgFill))));
  return { color, gray: svg };
}

function mountNav() {
  const navRoot = $("#nav");
  if (!navRoot) return;
  navRoot.innerHTML = navHTML();

  const wrap = $("#nav-cards");
  if (!wrap) return;

  /* filtro para las imágenes dentro de los SVG: su silueta en el gris del logo */
  document.body.insertAdjacentHTML("beforeend",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="card-mute" color-interpolation-filters="sRGB"><feFlood style="flood-color:var(--card-logo)"/><feComposite in2="SourceAlpha" operator="in"/></filter></svg>`);

  PROJECTS.forEach((p, i) => {
    const file = cardFile(p);
    const design = file && el("div", { class: "nav__card__design" }, file.svg ? null : cardDesign(file, i < 8));
    /* la versión en gris sólo se ve al pasar el ratón: en táctil no se construye */
    const mute = file?.svg && !TOUCH ? el("div", { class: "nav__card__mute" }) : null;
    if (file?.svg)
      cardSVG(file.src, `c${i}`, p.cardKeep, !!mute)
        .then(({ color, gray }) => { design.append(color); mute?.append(gray); })
        .catch(() => design.append(cardDesign(file, i < 8))); // si no se puede leer, como imagen
    const card = el("div", { class: "nav__card" + (design ? " has-design" : "") + (mute ? " has-mute" : ""), style: `z-index:${PROJECTS.length - i}` },
      el("a",
        {
          href: projectHref(p),
          class: "nav__card__inner",
          ...(isExternal(p) ? { rel: "noopener noreferrer", target: "_blank" } : {}),
          ...(!isExternal(p) && p.slug === new URLSearchParams(location.search).get("p")
            ? { "aria-current": "page", class: "nav__card__inner router-link-active router-link-exact-active" }
            : {}),
        },
        el("div", { class: "nav__card__bg" }),
        design,
        mute,
        el("div", { class: "nav__card__info" },
          el("h2", { text: t(p.title) }),
          el("p", { text: t(p.desc) })))
    );
    wrap.append(card);
  });
  wrap.append(el("div", { class: "nav__card__end" }));
}

/* ============================================================
   REVEAL on scroll
   ============================================================ */
let revealObserver;
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$("[data-reveal]").forEach((n) => n.classList.add("is-in"));
    return;
  }
  revealObserver ||= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          revealObserver.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  $$("[data-reveal]:not(.is-in)").forEach((n) => revealObserver.observe(n));
  // failsafe
  setTimeout(() => $$("[data-reveal]:not(.is-in)").forEach((n) => {
    const r = n.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) n.classList.add("is-in");
  }), 1200);
}

/* ============================================================
   VIDEOS — carga perezosa + autoplay en viewport
   ============================================================ */
function initVideos(scope = document) {
  const vids = $$("video[data-lazy]", scope);
  if (!vids.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target;
        if (e.isIntersecting) {
          if (!v.dataset.loaded) {
            v.querySelectorAll("source").forEach((s) => { s.src = s.dataset.src; });
            v.load();
            v.dataset.loaded = "1";
            v.addEventListener("loadeddata", () => v.classList.add("is-loaded"), { once: true });
          }
          if (v.hasAttribute("data-autoplay")) v.play().catch(() => {});
        } else if (!v.paused) {
          /* se sale de pantalla mientras reproduce (autoplay o iniciado a
             mano con el botón ▶) → se detiene */
          v.pause();
          v.closest(".video-wrapper")?.querySelector(".play-btn")?.classList.add("is-visible");
        }
      }
    },
    { rootMargin: "200px 0px" }
  );
  vids.forEach((v) => io.observe(v));
}

/* ============================================================
   FALLBACK de viewport — red de seguridad si IntersectionObserver
   no dispara (navegadores incrustados, pestañas en 2º plano, etc.)
   ============================================================ */
let viewportSweep = null;
function initViewportFallback() {
  let ticking = false;
  const sweep = () => {
    ticking = false;
    const vh = innerHeight;
    $$("[data-reveal]:not(.is-in)").forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) n.classList.add("is-in");
    });
    $$("video[data-lazy]").forEach((v) => {
      const r = v.getBoundingClientRect();
      const inView = r.top < vh + 250 && r.bottom > -250;
      if (!inView) {
        if (!v.paused) {
          v.pause();
          v.closest(".video-wrapper")?.querySelector(".play-btn")?.classList.add("is-visible");
        }
        return;
      }
      if (!v.dataset.loaded) {
        v.querySelectorAll("source").forEach((s) => { if (s.dataset.src) s.src = s.dataset.src; });
        v.load();
        v.dataset.loaded = "1";
        v.addEventListener("loadeddata", () => v.classList.add("is-loaded"), { once: true });
      }
      if (v.hasAttribute("data-autoplay") && v.paused) v.play().catch(() => {});
    });
  };
  viewportSweep = sweep;
  const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } };
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", kick, { passive: true });
  requestAnimationFrame(sweep);
  setTimeout(sweep, 600);
}

function videoNode({ src, ratio, autoplay = true, button = false, loop = true, position, onExpand }) {
  const v = el("video", {
    class: "", muted: autoplay ? "" : null, playsinline: "", loop: loop ? "" : null, preload: "none",
    "data-lazy": "1", ...(autoplay ? { "data-autoplay": "1" } : {}),
    style: `aspect-ratio:${ratio || "3 / 2"}` + (position ? `;object-position:${position}` : ""),
  });
  if (autoplay) v.muted = true;
  v.append(el("source", { "data-src": src, type: "video/mp4" }));
  if (!button) return v;
  const wrap = el("div", { class: "video-wrapper is-clickable" }, v,
    el("div", { class: "play-btn is-visible", html: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon icon-play"><path d="M8 5v14l11-7z"/></svg>` }));
  wrap.addEventListener("click", () => {
    if (v.paused) { v.muted = false; v.play(); wrap.querySelector(".play-btn").classList.remove("is-visible"); }
    else { v.pause(); wrap.querySelector(".play-btn").classList.add("is-visible"); }
  });
  v.addEventListener("ended", () => wrap.querySelector(".play-btn").classList.add("is-visible"));
  /* ⛶ → en grande dentro de la web (lightbox, como en el archivo), sigue
     desde donde iba; el de la página se para para que no suenen los dos */
  if (onExpand) wrap.append(el("button", {
    class: "fs-btn", type: "button", "aria-label": t({ en: "View full size", es: "Ver en grande" }),
    html: `<svg viewBox="0 0 24 24" fill="currentColor" class="icon"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,
    onclick: (e) => {
      e.stopPropagation();
      v.pause();
      wrap.querySelector(".play-btn").classList.add("is-visible");
      onExpand(v.currentTime);
    },
  }));
  return wrap;
}

function frameLoopNode({ frames, ratio, intervalMs = 500 }) {
  const image = el("img", { src: img(frames[0], 748), alt: "", loading: "lazy", decoding: "async", class: "preload", style: `aspect-ratio:${ratio || "3 / 2"}` });
  let i = 0;
  const t = setInterval(() => {
    i = (i + 1) % frames.length;
    image.src = img(frames[i], 748);
  }, intervalMs);
  onCleanup(() => clearInterval(t));
  return image;
}

function iframeNode({ src }) {
  return el("iframe", {
    src, loading: "lazy", allow: "camera", title: ui("interactive"),
    style: "width:100%;height:100%;border:0;display:block;",
  });
}

/* ============================================================
   LIGHTBOX de galería
   Se pasa pulsando: en la mitad derecha a la siguiente y en la
   izquierda a la anterior. Con ratón el cursor es una flecha que
   apunta hacia donde va a pasar. En móvil no se pasa: tocar no hace
   nada y se sale con la X.
   { navClose: true } → la X va en el nav, arriba a la derecha de la
   ventana, y el nav queda por encima del lightbox (archivo).
   ============================================================ */
const CHEVRON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>`;

/* Reparte las imágenes de una carpeta ([ancho, alto] de cada una) en filas
   para un hueco de W × H, con 8px entre ellas. Devuelve filas de
   [índice, ancho, alto].
   • Móvil: una columna a todo el ancho; el lightbox se desplaza.
   • Todas verticales (u horizontales): todas del mismo tamaño, hasta 4 por
     fila (3 si son horizontales; 3/2 en tablet).
   • Mezcladas: cada fila llena el ancho, con sus imágenes al mismo alto y
     proporcionales a su forma; se corta la fila cuando ronda el alto que
     tendría una fila llena de verticales.
   Nunca más grandes que su tamaño real ni, fuera del móvil, que la pantalla. */
const ROW_GAP = 8;
function groupRows(sizes, W, H) {
  const ratio = sizes.map(([w, h]) => w / h);
  if (MOBILE.matches) return ratio.map((r, i) => {
    const w = Math.min(W, sizes[i][0]);
    return [[i, w, w / r]];
  });
  const capV = innerWidth <= 1024 ? 3 : 4;
  const capH = capV - 1;
  const fit = (row) => (W - ROW_GAP * (row.length - 1)) / row.reduce((s, i) => s + ratio[i], 0);
  const limit = (row) => Math.min(H, ...row.map((i) => sizes[i][1]));
  const all = ratio.map((_, i) => i);
  const vertical = ratio.every((r) => r <= 1);
  let rows = [];
  if (vertical || ratio.every((r) => r > 1)) {
    const per = Math.ceil(all.length / Math.ceil(all.length / (vertical ? capV : capH)));
    for (let k = 0; k < all.length; k += per) rows.push(all.slice(k, k + per));
    const h = Math.min(...rows.map((row) => Math.min(fit(row), limit(row))));
    return rows.map((row) => row.map((i) => [i, ratio[i] * h, h]));
  }
  const target = (W - ROW_GAP * (capV - 1)) / (capV / Math.SQRT2);
  let row = [];
  for (const i of all) {
    const next = [...row, i];
    if (row.length && fit(next) < target && fit(row) - target < target - fit(next)) {
      rows.push(row); // sin esta imagen la fila queda más cerca del alto buscado
      row = [i];
    } else row = next;
    if (fit(row) <= target) { rows.push(row); row = []; }
  }
  if (row.length) rows.push(row);
  return rows.map((row) => {
    const h = Math.min(fit(row), limit(row));
    return row.map((i) => [i, ratio[i] * h, h]);
  });
}

function initLightbox(items, { navClose = false, mediaClose = false } = {}) {
  if (!items.length) return;
  let idx = 0;
  const multi = items.length > 1;
  const stage = el("div", { class: "lightbox__stage" });
  const cursor = el("div", { class: "lightbox__cursor", "aria-hidden": "true", html: CHEVRON });
  const navRight = navClose ? $(".nav__top__top__right") : null;
  const closeBtn = mediaClose ? null : el("button", {
    class: navRight ? "nav__top__top__gallery__mode nav__lightbox__close" : "page__button__close lightbox__close",
    "aria-label": ui("close"), html: CLOSE_ICON, onclick: close,
  });
  const box = el("div", { class: "lightbox" + (multi ? " has-cursor" : "") }, navRight ? null : closeBtn, multi ? cursor : null, stage);
  navRight?.append(closeBtn);
  /* proyectos en móvil: esta X ocupa el sitio de "Ver menos" (ver main.css) */
  const backClose = mediaClose
    ? el("button", { class: "nav__top__bottom__close", type: "button", "aria-label": ui("close"), html: CLOSE_ICON, onclick: close })
    : null;
  if (backClose) $(".nav__top__bottom")?.append(backClose);
  document.body.append(box);

  /* proyectos: la X va sobre la propia foto o vídeo, arriba a la derecha */
  const show = (media) => stage.append(mediaClose
    ? el("div", { class: "lightbox__media" }, media,
        el("button", { class: "lightbox__media__close", type: "button", "aria-label": ui("close"), html: CLOSE_ICON, onclick: close }))
    : media);

  let relayout = null; // recoloca la carpeta abierta al cambiar el tamaño de la ventana
  function render(start = 0) {
    stage.innerHTML = "";
    stage.scrollTop = 0;
    relayout = null;
    const it = items[idx];
    if (it.type === "video") {
      /* loop: false en el caso (p. ej. Bambata) → en grande tampoco se repite */
      const v = el("video", { src: it.src, controls: "", autoplay: "", loop: it.loop === false ? null : "", playsinline: "" });
      if (start) v.currentTime = start; // abierto desde ⛶: sigue donde iba
      show(v);
    } else if (it.type === "group") {
      /* carpeta: en filas (groupRows); cada imagen con su medida, así no salta
         al cargar. Sin medidas, van seguidas y bajan de fila si no caben */
      const imgs = it.images.map((src) => el("img", { src: img(src, 2000), alt: "" }));
      if (!it.sizes?.every(Boolean)) return stage.append(el("div", { class: "lightbox__rows" }, el("div", { class: "lightbox__row is-wrap" }, ...imgs)));
      const wrap = el("div", { class: "lightbox__rows" });
      stage.append(wrap);
      relayout = () => {
        const cs = getComputedStyle(stage);
        const W = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const H = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        wrap.replaceChildren(...groupRows(it.sizes, W, H).map((row) =>
          el("div", { class: "lightbox__row" }, ...row.map(([i, w, h]) => {
            imgs[i].style.width = `${w}px`;
            imgs[i].style.height = `${h}px`;
            return imgs[i];
          }))));
      };
      relayout();
    } else {
      show(el("img", { src: img(it.src, 2000), alt: "" }));
    }
  }
  let pageY = 0;
  function open(i, start) {
    idx = i;
    pageY = scrollY;
    render(start);
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    navRight?.classList.add("has-gallery");
    moveCursor();
  }
  function close() {
    box.classList.remove("is-open");
    stage.innerHTML = "";
    document.body.style.overflow = "";
    document.body.classList.remove("lightbox-open");
    navRight?.classList.remove("has-gallery");
    cursor.classList.remove("is-visible");
    /* debajo el nav suelta sus botones y la página se recoloca; Safari mueve
       el scroll al abrir y no al cerrar → se vuelve a donde estaba */
    scrollTo({ top: pageY, behavior: "instant" });
  }
  function go(d) { idx = (idx + d + items.length) % items.length; render(); }

  /* la flecha sigue al ratón y mira a la izquierda en la mitad izquierda;
     se esconde encima del nav, de la X y de los vídeos */
  let mouse = null;
  function moveCursor() {
    if (!multi || !mouse || !box.classList.contains("is-open")) return;
    const under = document.elementFromPoint(mouse.x, mouse.y);
    cursor.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    cursor.classList.toggle("is-prev", mouse.x < innerWidth / 2);
    cursor.classList.toggle("is-visible", box.contains(under) && !under.closest("video, .lightbox__close, .lightbox__media__close"));
  }
  const onMove = (e) => { mouse = { x: e.clientX, y: e.clientY }; moveCursor(); };
  const onLeave = () => cursor.classList.remove("is-visible");
  document.addEventListener("mousemove", onMove);
  document.documentElement.addEventListener("mouseleave", onLeave);

  const onResize = () => { if (box.classList.contains("is-open")) relayout?.(); };
  addEventListener("resize", onResize);
  const onKey = (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };
  document.addEventListener("keydown", onKey);
  box.addEventListener("click", (e) => {
    if (e.target.closest("video, .lightbox__close, .lightbox__media__close")) return;
    if (multi && !MOBILE.matches) go(e.clientX < innerWidth / 2 ? -1 : 1);
    else if (e.target === box) close();
  });
  onCleanup(() => {
    removeEventListener("resize", onResize);
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("mousemove", onMove);
    document.documentElement.removeEventListener("mouseleave", onLeave);
    box.remove();
    closeBtn?.remove();
    backClose?.remove();
    document.body.style.overflow = "";
    document.body.classList.remove("lightbox-open");
    navRight?.classList.remove("has-gallery");
  });
  return { open };
}

/* ============================================================
   ARCHIVO ("Show all projects") — imágenes propias en columnas
   (a pantalla completa cada una ocupa según su forma, ver archive.js);
   al pinchar una se abre en grande (lightbox), no el proyecto.
   Arriba sólo quedan los botones del nav (sin tarjetas de proyecto).
   Las carpetas enseñan sólo su portada y en grande se ven todas a su
   tamaño, en filas (en móvil, en una columna); los vídeos van en bucle sin sonido y en grande empiezan
   desde el principio con sonido.
   Todo sale de assets/archive/ (ver archive.js).
   ============================================================ */
function renderAll() {
  const c = $("#content");
  const container = el("div", { class: "page__container all" });

  const grid = el("div", { class: "case__studies__cards" });

  /* lightbox con todo el archivo; cada carpeta es un solo paso */
  const lightboxItems = [];
  let lightbox;

  const cardEls = ARCHIVE.map((a) => {
    const title = t(a.title);
    const desc = t(a.desc);
    const start = lightboxItems.length;
    /* la caja de cada tamaño (data-size) tiene alto fijo en el CSS: no salta al cargar */
    let media;
    if (a.type === "video") {
      media = el("video", { muted: "", loop: "", playsinline: "", preload: "none", "data-lazy": "1", "data-autoplay": "1" },
        el("source", { "data-src": a.src }));
      media.muted = true;
      lightboxItems.push({ type: "video", src: a.src });
    } else {
      lightboxItems.push(a.images ? { type: "group", images: a.images, sizes: a.sizes } : { type: "image", src: a.src });
      media = el("img", { src: a.src, alt: title, loading: "lazy", decoding: "async", class: "preload" });
    }
    const activate = () => lightbox?.open(start);
    return el("div", {
      class: "case__studies__card archive__card grid-item", role: "button", tabindex: "0",
      "aria-label": ui("viewLarge", { title }), "data-reveal": "", "data-size": a.size, style: a.ratio ? `--ratio:${a.ratio}` : null,
      onclick: activate, onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } },
    },
      el("div", { class: "case__studies__card__media" }, media),
      el("h2", { text: title }),
      desc ? el("p", { text: desc }) : null);
  });
  lightbox = initLightbox(lightboxItems, { navClose: true });

  grid.append(...cardEls);
  container.append(grid);
  c.append(container);

  /* masonry por filas sobre CSS grid: el CSS pone las columnas (4, 3 o 1) y
     cuántas ocupa cada tarjeta; aquí cada una va al hueco libre más alto, en
     filas de 1px. Tras colocar cada tarjeta, las columnas que acaban cerca (a
     menos de ROW_SNAP de una columna de ancho) se igualan: las imágenes vecinas
     empiezan a la misma altura aunque sus textos de debajo midan distinto */
  const ROW_SNAP = 0.3;
  let lastWidth = 0;
  function layoutRows() {
    if (!cardEls.length) return;
    lastWidth = grid.clientWidth;
    cardEls.forEach((card) => { card.style.gridArea = ""; }); // medir con el ancho de las columnas actuales
    const tracks = getComputedStyle(grid).gridTemplateColumns.split(" ");
    const snap = parseFloat(tracks[0]) * ROW_SNAP;
    const gap = parseFloat(getComputedStyle(cardEls[0]).marginBottom);
    const placed = cardEls.map((card) => ({
      card,
      span: Math.min(tracks.length, parseInt(getComputedStyle(card).gridColumnEnd.replace("span ", ""), 10) || 1),
      height: Math.ceil(card.getBoundingClientRect().height + gap),
    }));
    let bottoms = tracks.map(() => 0); // dónde acaba cada columna
    placed.forEach(({ card, span, height }) => {
      let col = 0;
      let top = Infinity;
      for (let c = 0; c + span <= bottoms.length; c++) {
        const y = Math.max(...bottoms.slice(c, c + span));
        if (y < top) { top = y; col = c; }
      }
      card.style.gridColumnStart = col + 1;
      card.style.gridRowStart = top + 1;
      card.style.gridRowEnd = `span ${height}`;
      bottoms.fill(top + height, col, col + span);
      const ends = [...new Set(bottoms)].sort((x, y) => y - x);
      bottoms = bottoms.map((end) => ends.find((e) => e >= end && e - end <= snap));
    });
  }
  layoutRows();
  const ro = new ResizeObserver(() => { if (grid.clientWidth !== lastWidth) layoutRows(); });
  ro.observe(grid);
  document.fonts?.ready.then(layoutRows);
  onCleanup(() => ro.disconnect());

  requestAnimationFrame(() => {
    container.classList.remove("loading");
    $$("img.preload", grid).forEach((im) => im.complete ? im.classList.add("loaded") : im.addEventListener("load", () => im.classList.add("loaded"), { once: true }));
  });
  initVideos(container);
  initReveal();
}

/* ============================================================
   ABOUT US
   ============================================================ */
function renderAbout() {
  const c = $("#content");
  const A = ABOUT;
  const container = el("div", { class: "page__container" });

  const heroMedia = A.heroVideo
    ? el("video", { src: A.heroVideo, muted: "", autoplay: "", loop: "", playsinline: "", preload: "auto", poster: img(A.hero, 1200) })
    : el("img", { src: img(A.hero, 1200), alt: "", loading: "eager" });
  if (A.heroVideo) heroMedia.muted = true;
  container.append(el("div", { class: "page__card about__hero" }, heroMedia));

  const left = el("div", { class: "about__content__left" });
  const right = el("div", { class: "about__content__right" });
  container.append(el("div", { class: "about__content" }, left, right));

  /* studio text */
  left.append(el("div", { class: "page__card about__our__studio", "data-reveal": "" },
    el("h2", { text: ui("aboutMe") }),
    el("div", { class: "about__our__studio__text", html: t(A.studioText) })));

  /* get in touch (mobile) */
  left.append(el("div", { class: "about__getintouch" },
    el("a", { href: "mailto:david.bayon.mateo@gmail.com", class: "page__button white small-border-radius" }, el("p", { text: ui("getInTouch") }))));

  /* ---- right column ---- */
  /* en móvil abrimos en la misma pestaña: así el sistema pasa el enlace a la app (universal/app links) */
  const linkTarget = matchMedia("(pointer: coarse)").matches ? null : "_blank";
  const contact = el("div", { class: "page__card about__contact", "data-reveal": "" }, el("h2", { text: ui("contact") }),
    el("p", { class: "about__contact__clock", "data-clock": "" }));
  A.contact.forEach((item) => {
    const p = el("p");
    if (item.links) {
      item.links.forEach((l, i) => {
        if (i) p.append(el("span", { class: "separator", text: " / " }));
        p.append(el("a", { href: l.href, target: linkTarget, html: `${l.value} ${ARROW}` }));
      });
    } else {
      p.append(el("a", { href: item.href, target: linkTarget, html: `${item.value} ${ARROW}` }));
    }
    contact.append(el("div", { class: "about__contact__item" }, el("h3", { text: t(item.label) }), p));
  });
  right.append(contact);

  /* Education y Experience comparten el mismo formato de card (lista con scroll) */
  function timelineCard(title, items, compact = false) {
    const inner = el("div", { class: "about__agenda__inner" }, el("h2", { text: title }));
    const list = el("div", { class: "about__agenda__items" });
    items.forEach((ev) => {
      const tag = ev.href ? "a" : "div";
      list.append(el(tag, { class: "about__agenda_item" + (ev.href ? " has-link" : ""), ...(ev.href ? { href: ev.href, target: "_blank", rel: "noopener noreferrer" } : {}) },
        el("div", { class: "about__agenda__item__header" },
          el("div", { class: "about__agenda__item__title" }, el("h3", { text: t(ev.title) }), el("p", { text: t(ev.date) })),
          el("p", { class: "about__agenda__item__team", text: t(ev.team) })),
        ev.location ? el("div", { class: "about__agenda__item__location", html: `${PIN_ICON}<p>${t(ev.location)}</p>` }) : null));
    });
    inner.append(list);
    const card = el("div", { class: "page__card about__agenda hide-top-indicator hide-bottom-indicator" + (compact ? " is-compact" : ""), "data-reveal": "" }, inner);
    scrollIndicators(card, inner);
    return card;
  }
  right.append(timelineCard(ui("languages"), A.languages, true));
  right.append(timelineCard(ui("volunteering"), A.volunteering, true));
  /* Education y Experience van en la columna izquierda, debajo de Team */
  left.append(timelineCard(ui("education"), A.education, true));
  left.append(timelineCard(ui("experience"), A.events, true));

  c.append(container);

  startLocationClocks();
  initReveal();

  if (location.hash === "#updates") right.scrollIntoView({ behavior: "smooth" });
}

function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }

function scrollIndicators(card, inner) {
  const upd = () => {
    card.classList.toggle("hide-top-indicator", inner.scrollTop <= 2);
    card.classList.toggle("hide-bottom-indicator", inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 2);
  };
  inner.addEventListener("scroll", upd, { passive: true });
  setTimeout(upd, 60);
}

function startLocationClocks() {
  const tick = () => {
    $$(".about__location__info__clock").forEach((clk) => {
      const tz = clk.dataset.tz;
      const now = new Date();
      const parts = now.toLocaleTimeString("en-GB", { hour12: false, timeZone: tz }).split(":").map(Number);
      const [h, m] = parts;
      const mm = clk.querySelector(".hand.minute");
      const hh = clk.querySelector(".hand.hour");
      if (mm) mm.style.transform = `translate(-50%) rotate(${m * 6}deg)`;
      if (hh) hh.style.transform = `translate(-50%) rotate(${(h % 12) * 30 + m * 0.5}deg)`;
    });
  };
  tick();
  const t = setInterval(tick, 20000);
  onCleanup(() => clearInterval(t));
}

/* ============================================================
   FICHA DE PROYECTO
   ============================================================ */
function renderProject() {
  const c = $("#content");
  const slug = new URLSearchParams(location.search).get("p");
  const project = PROJECTS.find((p) => p.slug === slug);
  const cs = CASE_STUDIES[slug];

  if (!project) {
    c.append(el("div", { class: "page__container" }, el("div", { class: "error" },
      el("p", { class: "error__title", text: ui("notFound") }),
      el("p", { class: "error__message", text: ui("notFoundMsg") }),
      el("a", { href: "about.html", class: "page__button" }, el("p", { text: ui("backHome") })))));
    return;
  }
  const title = t(project.title);
  const desc = t(project.desc);
  document.title = `${title} | ${SITE.wordmark}`;

  const container = el("div", { class: "page__container" });
  const list = el("div", { class: "case__study__list" });

  /* mini-card (visible sólo en móvil) */
  list.append(el("div", { class: "nav__card" },
    el("div", { class: "nav__card__inner" },
      el("div", { class: "nav__card__img" }, el("img", { src: img(project.thumb, 144), alt: title })),
      el("div", { class: "nav__card__info" }, el("h2", { text: title }), el("p", { text: desc })))));

  const slices = el("div", { class: "case__study__slices" });
  list.append(slices);

  /* galería para el lightbox */
  const galleryItems = [];

  /* ---- secuencias de fotogramas ligadas al scroll (scrub) ----
     media: { type:"frames", dir:"/…/frames/", first, last, step, pad,
              anchor,           // fotograma que se muestra…
              anchorAt,         // …cuando el progreso por la ventana = este valor (0 entra · 0.5 centrado · 1 sale)
              pxPerFrame }      // píxeles de scroll que avanzan 1 fotograma ("velocidad del scroll") */
  const frameScrubbers = [];
  const mountFrameScrub = (section, m) => {
    const pad = m.pad || 4;
    const first = m.first ?? 0;
    const last = m.last ?? 0;
    const step = m.step || 1;
    const anchor = m.anchor ?? Math.round((first + last) / 2);
    const anchorAt = m.anchorAt ?? 0.5;
    const pxPerFrame = m.pxPerFrame || 4;
    const ext = m.ext || ".jpg";
    const url = (n) => `${m.dir}frame-${String(n).padStart(pad, "0")}${ext}`;
    const snap = (n) => {
      n = Math.max(first, Math.min(last, Math.round(n)));
      return first + Math.round((n - first) / step) * step;
    };
    /* fetchpriority:"high" en el <img> visible para que el navegador no lo
       deje esperando detrás de la cola de precarga (eso es lo que provoca
       el parpadeo al scrollear rápido: el frame que hace falta AHORA se
       queda en cola tras cientos de peticiones de fondo) */
    const image = el("img", { src: url(snap(anchor)), alt: "", decoding: "async", fetchpriority: "high" });
    section.append(image);

    /* precarga en cola con concurrencia limitada (no las ~300 peticiones de
       golpe) y prioridad baja, para no competir con el frame en pantalla */
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 500));
    idle(() => {
      const pending = [];
      for (let n = first; n <= last; n += step) pending.push(n);
      const MAX_CONCURRENT = 4;
      let active = 0;
      const pump = () => {
        while (active < MAX_CONCURRENT && pending.length) {
          const n = pending.shift();
          active++;
          const pre = new Image();
          pre.fetchPriority = "low";
          pre.onload = pre.onerror = () => { active--; pump(); };
          pre.src = url(n);
        }
      };
      pump();
    });

    let cur = -1;
    frameScrubbers.push(() => {
      const r = section.getBoundingClientRect();
      const vh = innerHeight || document.documentElement.clientHeight;
      const W = r.height + vh;
      if (W <= 0) return;
      const p = (vh - r.top) / W;               // 0 = entrando por abajo · 1 = saliendo por arriba
      const n = snap(anchor + (p - anchorAt) * (W / pxPerFrame));
      if (n !== cur) { cur = n; image.src = url(n); }
    });
  };

  const addMedia = (s) => {
    /* la pieza interactiva necesita la cámara y en los móviles no funciona: ni se carga */
    if (s.media.type === "iframe" && TOUCH) return;
    const layout = s.layout || "";
    const item = el("div", { class: `case__study__gallery__item ${layout}`.trim(), "data-reveal": "" });
    const inner = el("div", { class: "case__study__gallery__item__inner", "data-aspect-ratio": s.ratio });
    const section = el("section", { class: "page__card case__study__media has-gallery" + (s.ratio === "0.75" || String(s.ratio).includes("3 / 4") ? " portrait" : "") + (layout.includes("landscape-small") ? " landscape-small" : ""), style: `aspect-ratio:${s.ratio}` });

    let mediaIndex = galleryItems.length;
    if (s.media.type === "video") {
      section.append(videoNode({ src: s.media.src, ratio: s.ratio, autoplay: !s.button, button: !!s.button, loop: s.loop !== false, position: s.position,
        onExpand: (time) => lb && lb.open(mediaIndex, time) }));
      galleryItems.push({ type: "video", src: s.media.src, loop: s.loop !== false });
    } else if (s.media.type === "frames") {
      mountFrameScrub(section, s.media);
    } else if (s.media.type === "iframe") {
      section.append(iframeNode({ src: s.media.src }));
    } else if (s.media.type === "frameloop") {
      section.append(frameLoopNode({ frames: s.media.frames, ratio: s.ratio, intervalMs: s.media.intervalMs }));
      galleryItems.push({ type: "image", src: s.media.frames[0] });
    } else {
      section.append(el("img", { src: img(s.media.src, 748), alt: "", loading: "lazy", decoding: "async", class: "preload", ...(s.position ? { style: `object-position:${s.position}` } : {}) }));
      galleryItems.push({ type: "image", src: s.media.src });
    }
    if (!s.button && s.media.type !== "frames" && s.media.type !== "iframe") {
      section.style.cursor = "pointer";
      section.addEventListener("click", () => lb && lb.open(mediaIndex));
    }
    inner.append(section);
    item.append(inner);
    slices.append(item);
  };

  const addText2 = (s) => {
    const item = el("div", { class: "case__study__gallery__item", "data-reveal": "" });
    const inner = el("section", { class: "case__study__gallery__item__inner page__cards case__study__media__texts2" + (s.featured ? " featured" : "") + (s.alignRight ? " align-to-right" : "") });
    s.cards.forEach((card) => {
      inner.append(el("section", { class: "page__card case__study__media__text__text2" },
        el("h2", { text: t(card.h) }),
        el("div", { class: "case__study__media__text__text__text2", html: t(card.body) })));
    });
    item.append(inner);
    slices.append(item);
  };

  const addText = (s) => {
    const item = el("div", { class: "case__study__gallery__item", "data-reveal": "" });
    item.append(el("section", { class: "page__card case__study__text" },
      el("div", { class: "case__study__text__inner" },
        s.h ? el("h2", { text: t(s.h) }) : null,
        el("p", { class: "case__study__text__text", html: t(s.body) }),
        s.author ? el("p", { class: "case__study__text__author", text: t(s.author) }) : null)));
    slices.append(item);
  };

  let lb = null;

  if (cs) {
    cs.slices.forEach((s) => {
      if (s.t === "media") addMedia(s);
      else if (s.t === "text2") addText2(s);
      else if (s.t === "text") addText(s);
    });
  } else {
    /* sin caso completo → ficha mínima automática */
    addMedia({ t: "media", ratio: project.cover?.ratio || "3 / 2", button: project.cover?.button, loop: project.cover?.loop, media: project.cover || { type: "image", src: project.thumb } });
    addText2({ t: "text2", featured: true, cards: [{ h: title, body: desc + "<br><br>" + ui("addCaseStudy", { slug: project.slug }) }] });
  }

  lb = initLightbox(galleryItems, { mediaClose: true });

  /* info + credits */
  const info = el("div", { class: "case__study__info" });
  const infoLeft = el("div", { class: "case__study__info__left" });
  infoLeft.append(el("div", { class: "page__card case__study__info__project__information" },
    el("h2", { text: ui("projectInfo") }),
    el("div", { class: "case__study__info__project__information__text", html: t(cs?.projectInfo) || `<p>${desc}</p>` })));

  const infoRight = el("div", { class: "case__study__info__right" });
  infoRight.append(el("div", { class: "page__card case__study__info__credits" },
    el("div", { class: "case__study__info__credits__inner", html: `${cs?.creditsTitle === false ? "" : `<h2>${ui("credits")}</h2>`}${t(cs?.credits) || ""}` })));
  if (cs?.downloadUrl) {
    infoRight.append(el("div", { class: "page__card case__study__info__project__images" },
      el("h2", { text: ui("projectImages") }),
      el("a", { href: cs.downloadUrl, target: "_blank", rel: "noopener noreferrer", html: `${ui("downloadImages")} ${DOWNLOAD_ICON}` })));
  }

  info.append(infoLeft, infoRight);
  container.append(list, info);
  c.append(container);

  /* scrub de secuencias de fotogramas: se recalcula en cada scroll/resize,
     pero como mucho una vez por frame de pantalla (rAF). Sin el throttle,
     un scroll rápido dispara el evento "scroll" muchas más veces de las
     que la pantalla puede pintar, y el <img> va cambiando de fotograma
     más rápido de lo que se ve — eso es el parpadeo/flash. Al no haber
     scroll, no avanza; hacia arriba retrocede. */
  if (frameScrubbers.length) {
    let raf = 0;
    const run = () => { raf = 0; for (const fn of frameScrubbers) fn(); };
    const kick = () => { if (!raf) raf = requestAnimationFrame(run); };
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick, { passive: true });
    kick();
    onCleanup(() => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    });
  }

  initVideos(container);
  initReveal();
}

/* ============================================================
   NAVEGACIÓN SPA — sólo cambia #content (con fade), el rail
   lateral (#nav) permanece intacto
   ============================================================ */
const TITLES = {
  all: `${ui("archive")} | ${SITE.wordmark}`,
  about: `${ui("aboutMe")} | ${SITE.wordmark}`,
  project: SITE.wordmark,
};
const TEMPLATES = { all: "all", about: "about", project: "uid" };

/* portada sólo en móvil: en escritorio, cualquier ruta desconocida (incl. index.html) cae en About */
function pageFromPath(pathname) {
  const file = pathname.split("/").pop();
  if (file === "all.html") return "all";
  if (file === "about.html") return "about";
  if (file === "project.html") return "project";
  return MOBILE.matches ? "home" : "about";
}

/* pinta la página actual dentro de #content (sin tocar el rail) */
function mountPage(page) {
  runCleanups();
  const content = $("#content");
  content.innerHTML = "";

  document.body.dataset.page = page;
  document.body.dataset.template = TEMPLATES[page] || page;
  document.documentElement.setAttribute("data-template", TEMPLATES[page] || page);
  document.title = TITLES[page] || SITE.wordmark;

  if (page === "all") renderAll();
  else if (page === "about") renderAbout();
  else if (page === "project") renderProject();

  updateNavActive();

  wirePreload();
  if (viewportSweep) { requestAnimationFrame(viewportSweep); setTimeout(viewportSweep, 600); }
  if (navCardScrollUpdate) navCardScrollUpdate();
}

/* marca la tarjeta del rail que apunta a project.html?p=<slug> (null → ninguna) */
function markNavCard(slug) {
  $$("#nav-cards a.nav__card__inner").forEach((a) => {
    a.classList.remove("router-link-active", "router-link-exact-active");
    a.removeAttribute("aria-current");
  });
  if (!slug) return;
  for (const a of $$("#nav-cards .nav__card > a.nav__card__inner")) {
    const u = new URL(a.href, location.href);
    if (u.pathname.endsWith("project.html") && u.searchParams.get("p") === slug) {
      a.classList.add("router-link-active", "router-link-exact-active");
      a.setAttribute("aria-current", "page");
      break;
    }
  }
}

/* marca la tarjeta / botón activo del rail según la ruta actual */
function updateNavActive() {
  const page = document.body.dataset.page;
  markNavCard(page === "project" ? new URLSearchParams(location.search).get("p") : null);
  /* en el archivo el botón "Archive" pasa a "Work" y vuelve a los trabajos */
  const showAll = $(".nav__top__top .page__button");
  if (showAll) {
    showAll.href = page !== "all" ? "all.html" : MOBILE.matches ? "index.html" : "about.html";
    showAll.firstElementChild.textContent = ui(page === "all" ? "work" : "archive");
  }
  const aboutBtn = $(".nav__about__button");
  if (aboutBtn) aboutBtn.classList.toggle("router-link-active", page === "about");
}

let navToken = 0;
let navigated = false; // se ha cambiado de página sin recargar
function spaNavigate(target, push) {
  navigated = true;
  const url = new URL(target, location.href);
  const dest = url.pathname + url.search;
  if (push && dest === location.pathname + location.search) return;

  const content = $("#content");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = reduce ? 0 : 500;
  const token = ++navToken; // una nav nueva anula la anterior en curso

  /* la tarjeta pulsada se marca ya desde el clic (sin esperar al fade): así, si el
     ratón pasa al contenido, se queda en color mientras las demás pasan a gris */
  markNavCard(url.pathname.endsWith("project.html") ? url.searchParams.get("p") : null);
  content.classList.add("is-leaving"); // fade-out
  /* móvil: entrar o salir de la portada también funde la lista y "Ver menos" */
  const nav = $("#nav");
  const isHome = (page) => page === "home";
  nav.classList.toggle("is-switching", isHome(document.body.dataset.page) !== isHome(pageFromPath(url.pathname)));

  setTimeout(() => {
    if (token !== navToken) return;
    if (push) history.pushState({ spa: true }, "", dest);
    mountPage(pageFromPath(location.pathname));
    window.scrollTo(0, 0);
    void content.offsetWidth; // reflow con el contenido nuevo aún a opacity 0
    setTimeout(() => {
      if (token !== navToken) return;
      content.classList.remove("is-leaving"); // fade-in
      nav.classList.remove("is-switching");
    }, 20);
  }, wait);
}

function initSPA() {
  history.replaceState({ spa: true }, "", location.pathname + location.search);

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    const a = e.target.closest("a");
    if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-native"))
      return;
    let u;
    try { u = new URL(a.href, location.href); } catch { return; }
    if (u.origin !== location.origin) return;
    const file = u.pathname.split("/").pop();
    if (!["all.html", "about.html", "project.html", "index.html"].includes(file)) return;

    e.preventDefault();
    spaNavigate(u.pathname + u.search, true);
  });

  addEventListener("popstate", () => {
    spaNavigate(location.pathname + location.search, false);
  });
}

/* ============================================================
   ARRANQUE
   ============================================================ */
function boot() {
  document.documentElement.lang = lang;
  initTheme();
  initDeviceClass();
  mountNav();
  initClock();

  const tgl = $(".nav__light__mode");
  if (tgl) tgl.addEventListener("click", () => window.__toggleTheme());

  /* sólo hay dos idiomas: el botón de banderas alterna entre ellos */
  const langBtn = $(".nav__lang");
  if (langBtn) langBtn.addEventListener("click", () => setLang(lang === "es" ? "en" : "es"));

  /* en móvil se entra por los trabajos, también abriendo about.html (Safari la
     conserva en la pestaña y en sus sugerencias): About sólo se abre con su botón */
  const entryPage = () => {
    const page = pageFromPath(location.pathname);
    if (page !== "about" || !MOBILE.matches || navigated) return page;
    history.replaceState({ spa: true }, "", "index.html");
    return "home";
  };
  mountPage(entryPage());

  /* al girar el móvil cambia el ancho, y Safari puede devolver la pestaña tal como estaba */
  const syncEntry = () => {
    const page = entryPage();
    if (page !== document.body.dataset.page) mountPage(page);
  };
  MOBILE.addEventListener("change", syncEntry);
  addEventListener("pageshow", syncEntry);

  initVideos();
  initViewportFallback();
  initNavCardScroll();
  initSPA();
}

/* ============================================================
   NAV CARDS — al acercarse al borde inferior del rail la tarjeta
   se encoge, sube y se apila; el degradado (.nav__card__bg) sólo
   aparece durante esa animación y se apaga al asentarse.
   El rail scrollea por su cuenta (no sigue a la página).
   ============================================================ */
let navCardScrollUpdate = null;
function initNavCardScroll() {
  const nav = $("#nav");
  if (!nav) return;
  const wrap = $("#nav-cards");
  if (!wrap) return;
  const cards = $$(".nav__card", wrap);
  if (!cards.length) return;

  /* las medidas se toman una vez y en cada fotograma sólo se lee nav.scrollTop:
     medir mezclado con las escrituras recalcula la página entera y en móvil vibra */
  const items = cards.map((card) => ({
    inner: card.firstElementChild,
    bg: card.querySelector(".nav__card__bg"),
    top: 0, // respecto al inicio del scroll del rail
    h: 0,
    p: -1, // último progreso escrito (-1: ninguno)
  }));
  let START = 0, RANGE = 1, LIFT = 0, maxScroll = 0;
  let ticking = false;

  /* false si la lista está oculta (móvil, fuera de la portada) */
  const measure = () => {
    if (!wrap.offsetHeight) return false;
    const H = nav.clientHeight;
    const origin = nav.getBoundingClientRect().top - nav.scrollTop;
    // paso entre tarjetas de proyecto (evita la tarjeta "About", de altura distinta)
    const stride =
      cards.length > 2
        ? cards[2].getBoundingClientRect().top - cards[1].getBoundingClientRect().top
        : 106;
    START = H - stride - 44; // empieza a encoger ~150px antes del borde inferior
    RANGE = stride * 2.5;
    LIFT = stride * 2;
    maxScroll = nav.scrollHeight - H;
    items.forEach((it, i) => {
      it.top = cards[i].getBoundingClientRect().top - origin;
      it.h = it.inner?.offsetHeight || 0;
      it.p = -1;
    });
    return true;
  };

  const update = () => {
    ticking = false;
    const y = Math.min(Math.max(nav.scrollTop, 0), maxScroll); // sin el rebote de iOS

    const geo = []; // bordes de cada tarjeta ya movida y encogida
    items.forEach((it, i) => {
      if (!it.inner) return;
      const top = it.top - y;
      const p = Math.min(1, Math.max(0, (top - START) / RANGE));
      const s = 1 - 0.5 * p;
      const bottom = top + it.h - LIFT * p; // transform-origin abajo: la escala no mueve el borde inferior
      geo[i] = { top: bottom - it.h * s, bottom, s, stack: Math.min(1, p * 3) };
      if (p === it.p) return; // sólo se escribe en las que cambian
      it.p = p;
      if (p <= 0) {
        it.inner.style.transform = "";
        it.inner.style.opacity = "";
        if (it.bg) it.bg.style.opacity = "";
        it.inner.style.removeProperty("--stack");
      } else {
        it.inner.style.transform = `translate3d(0, ${(-LIFT * p).toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
        it.inner.style.opacity = Math.min(1, (1 - p) * 3.3).toFixed(3);
        const stack = Math.min(1, p * 3).toFixed(3);
        if (it.bg) it.bg.style.opacity = stack;
        if (!TOUCH) it.inner.style.setProperty("--stack", stack); // el mismo degradado bajo los logos en gris (.nav__card__mute)
      }
    });
    if (TOUCH) return; // la sombra se repinta en cada fotograma: sólo con ratón
    /* sombra sólo donde una tarjeta tapa a la de detrás: una franja en la de detrás
       justo bajo el borde de la de delante (--cover, en px de la propia tarjeta) */
    items.forEach((it, i) => {
      const front = geo[i - 1], back = geo[i];
      if (!it.inner || !back) return;
      const cover = front && back.stack ? (front.bottom - back.top) / back.s : 0;
      if (cover > 0) {
        it.inner.style.setProperty("--shade", back.stack.toFixed(3));
        it.inner.style.setProperty("--cover", `${cover.toFixed(2)}px`);
      } else {
        it.inner.style.removeProperty("--shade");
        it.inner.style.removeProperty("--cover");
      }
    });
  };

  const kick = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  const refresh = () => {
    if (measure()) kick();
  };
  navCardScrollUpdate = refresh;
  addEventListener("resize", refresh, { passive: true });
  nav.addEventListener("scroll", kick, { passive: true });
  if (measure()) update();
}

/* aclara el fade de todas las <img class="preload"> del documento */
function wirePreload(scope = document) {
  const done = (im) => im.classList.add("loaded");
  requestAnimationFrame(() => {
    $$("img.preload", scope).forEach((im) => {
      if (im.complete && im.naturalWidth) done(im);
      else {
        im.addEventListener("load", () => done(im), { once: true });
        im.addEventListener("error", () => done(im), { once: true });
      }
    });
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
