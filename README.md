# David Bayón Mateo — portafolio

Portafolio de David Bayón Mateo, diseñador gráfico y multimedia en Madrid, hecho con
**HTML + CSS + JavaScript vanilla** y empaquetado con **[Vite](https://vitejs.dev)**.
Todo el contenido (proyectos, casos de estudio, archivo y página *About*) vive en 3
ficheros de datos que se editan sin tocar la maquetación.

---

## Requisitos

- [Node.js](https://nodejs.org) 18 o superior (incluye `npm`).

## Puesta en marcha

```bash
npm install        # solo la primera vez
npm run dev        # servidor de desarrollo con recarga en caliente → http://localhost:5173
```

| Comando           | Qué hace                                                                  |
| ----------------- | ------------------------------------------------------------------------- |
| `npm run dev`     | Servidor local con hot-reload. Ideal para editar.                        |
| `npm run build`   | Genera el sitio estático optimizado en `dist/`.                          |
| `npm run preview` | Sirve `dist/` tal cual quedará en producción → http://localhost:4173     |

`dist/` usa rutas relativas (`base: "./"` en `vite.config.js`), así que funciona
subiéndolo a cualquier hosting estático (Netlify, GitHub Pages, un subdirectorio…).

---

## Estructura

```
index.html          Móvil: portada con la lista de proyectos. Escritorio: muestra About
all.html            Archivo: piezas sueltas en columnas
about.html          About  ← página de entrada (logo y ✕ de /all llevan aquí)
project.html        Plantilla única de caso de estudio → project.html?p=<slug>

assets/
  css/
    main.css         TODO el CSS del sitio (tokens, temas, animaciones, responsive)
    fonts.css        Tipografías (SF Pro con fallback al sistema; ver más abajo)
  js/
    data.js          ← PROYECTOS, ABOUT, SITE                  (edita aquí)
    case-studies.js  ← CASOS DE ESTUDIO completos por slug     (edita aquí)
    archive.js       ← ARCHIVO de /all: textos y orden         (edita aquí)
    i18n.js          Idioma EN/ES: textos fijos de la interfaz + botón de banderas.
                     En los datos, un texto traducido es { en: "...", es: "..." }
    app.js           Lógica de UI (nav, reloj, tema, reveal, vídeos, lightbox, render)
  archive/           Piezas sueltas de /all; una subcarpeta = una tarjeta
  cards/<proyecto>/  Diseño de la tarjeta de cada proyecto en el menú lateral
public/              Se copia tal cual a la raíz de la web
  about/             Vídeo y póster de About
  work/<proyecto>/   Imágenes y vídeos de cada caso de estudio
media-src/           Originales locales: ni se suben a git ni se publican
vite.config.js       Config de Vite (4 páginas de entrada)
```

Cada proyecto usa el mismo nombre en todas partes: su `slug` (la URL), `public/work/`,
`assets/cards/` y `media-src/`.

No hay framework: `app.js` lee los datos y construye el DOM en el cliente.
Las 4 páginas (`home`, `all`, `about`, `project`) comparten el mismo `assets/js/app.js`;
cada una se distingue por el atributo `data-page` de su `<body>`.

En móvil (hasta 656 px) el menú es una pantalla propia: la lista de proyectos de
`index.html`. Al abrir un proyecto o About se oculta y queda «Ver menos» para volver.
En escritorio `index.html` muestra About y el menú se queda fijo a la izquierda.

---

## Cómo meter tus trabajos

### 1. Añadir un proyecto a la lista (menú lateral)

Edita **`assets/js/data.js`** → array `PROJECTS`. Añade un objeto:

```js
{
  slug: "mi-proyecto",                        // identificador y URL: project.html?p=mi-proyecto
  card: "mi-proyecto",                        // carpeta de assets/cards/ con su tarjeta
  title: "Mi Proyecto",
  desc: { en: "One line about the work", es: "Una frase sobre el trabajo" },
  thumb: "work/mi-proyecto/mi-proyecto-icon.jpg", // miniatura de la ficha en móvil
}
```

- `cover` (opcional): media de la ficha mínima mientras el proyecto no tenga caso de
  estudio, con `type`, `src` y `ratio`. Si falta, se usa `thumb`.
- Para un enlace externo en lugar de un caso de estudio:

  ```js
  { slug: "https://ejemplo.com", type: "external", title: "…", desc: "…", thumb: "…" }
  ```

### 2. Añadir el caso de estudio completo

Edita **`assets/js/case-studies.js`** → objeto `CASE_STUDIES`. La clave debe ser el
mismo `slug` que pusiste en `data.js`:

```js
"mi-proyecto": {
  downloadUrl: "https://…",         // opcional: botón "Download Project Images"
  slices: [
    { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/mi-proyecto/mi-proyecto-cover.jpg" } },
    { t: "text2", featured: true, cards: [
      { h: "The Challenge", body: "Texto en HTML…" },
      { h: "The Solution",  body: "Texto en HTML…" },
    ] },
    { t: "media", ratio: "3 / 2", media: { type: "video", src: "https://…/video.mp4" } },
    { t: "text", h: "Un titular", body: "Cita o párrafo", author: "— Nombre" },
  ],
  projectInfo: "<p>HTML con la ficha del proyecto…</p>",
  credits: "<p>…</p>",              // sin título: la web pone «Credits» / «Créditos»
}
```

Tipos de *slice*:

| `t`       | Para qué sirve                          | Campos                                                              |
| --------- | -------------------------------------- | ----------------------------------------------------------------- |
| `media`   | Imagen o vídeo a pantalla completa     | `ratio`, `media:{type,src}`, `layout?`, `button?`                 |
| `text2`   | 1 o 2 tarjetas de texto lado a lado    | `cards:[{h,body}]`, `featured?`, `alignRight?`                    |
| `text`    | Bloque de texto centrado / cita        | `h?`, `body`, `author?`                                           |

`layout` de `media` admite (combinables): `split`, `split-rows`,
`position-left`, `position-right`, `landscape-small`.
`button: true` en un vídeo lo deja pausado con botón ▶ en vez de autoplay.

> Si un proyecto de `data.js` **no** tiene entrada en `case-studies.js`, su página
> `project.html?p=<slug>` se genera igualmente con una ficha mínima (cover + descripción).

### 3. Editar el *About*

Todo en `assets/js/data.js`:

- `ABOUT` — contenido de `about.html`: vídeo, presentación, contacto, formación,
  idiomas, voluntariado y experiencia.
- `SITE` — textos globales (wordmark, ciudad y zona horaria del reloj del nav).

### 4. Añadir piezas al archivo (`/all`)

Suelta el archivo en `assets/archive/` y añade su texto y su posición en
`assets/js/archive.js`. El comentario del principio de ese fichero explica cada opción.

---

## Imágenes y vídeos

1. Crea `public/work/<proyecto>/` y mete ahí tus archivos. Vite copia `public/` tal
   cual a la raíz del sitio.
2. En los datos, usa la ruta **sin barra inicial**: `src: "work/mi-proyecto/foto.jpg"`.
   Con `/work/…` el sitio funcionaría en local, pero no en GitHub Pages, que lo sirve
   desde una subcarpeta (`/portfolio/`).

**Nombres de archivo** (SEO): minúsculas, en inglés, sin espacios ni tildes, con la
marca y lo que se ve: `vino-claro-bottle-mockup-red-wine-front.jpg`. Las miniaturas de
la ficha en móvil acaban en `-icon`, y los fotogramas de secuencias van en `frames/`.

Los medios se sirven a calidad original: no se recomprimen ni se reescalan. Solo se
permiten optimizaciones sin pérdida (mismo resultado píxel a píxel).

---

## Tipografías

El sitio pide **SF Pro** (la tipografía de Apple). En un Mac se renderiza nativa
gracias al fallback `-apple-system` / `system-ui`, así que no hace falta nada más.
Si quieres incrustarla para que se vea igual en Windows/Linux, coloca los `.woff2`
en `public/font/` y descomenta los bloques `@font-face` de `assets/css/fonts.css`.

---

## Temas (claro / oscuro)

El botón del nav alterna la clase `dark` / `light` en `<html>` y guarda la
preferencia en `localStorage["color-mode"]`. Sin preferencia guardada se sigue el
modo claro u oscuro del dispositivo, también si cambia con la web abierta.
Un script en el `<head>` de cada página lo aplica antes de pintar para evitar el parpadeo. Los colores se definen como variables CSS en `assets/css/main.css`.
