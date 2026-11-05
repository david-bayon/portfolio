/* ============================================================
   CASOS DE ESTUDIO COMPLETOS
   ------------------------------------------------------------
   La clave del objeto = `slug` del proyecto en data.js
   project.html?p=<slug>  renderiza esto.

   Un "slice" es uno de:
     { t:"media", ratio:"3 / 2", media:{type:"image"|"video", src},
       layout?:"split"|"split-rows"|"position-left"|"position-right"|"landscape-small",
       button?:true, loop?:false,   // button:true → no autoplay, botón ▶ · loop:false → no se repite
       position?:"86% 50%" }        // imagen o vídeo: qué parte se ve al recortarlo al ratio (object-position)
     { t:"text2", featured?:true, alignRight?:true,
       cards:[ {h:"Título", body:"HTML"} , ... ] }   // 1 o 2 tarjetas
     { t:"text", h, body, author? }  // bloque de texto centrado

   `src`: ruta relativa a public/ sin barra inicial
   (work/mi-proyecto/foto.jpg) o URL completa.

   credits: HTML de los créditos, sin título (la web pone
   «Credits» / «Créditos» arriba según el idioma).
   creditsTitle: false → quita ese título en ese proyecto.
   downloadUrl: enlace de la card «Descargar imágenes» (sin él no sale).

   Idiomas: h / body / projectInfo / credits pueden ser un string
   (sale igual en EN y ES) o { en: "...", es: "..." }.
   ============================================================ */

/* títulos y textos que se repiten, ya traducidos */
const CHALLENGE = { en: "The Challenge", es: "El reto" };
const SOLUTION = { en: "The Solution", es: "La solución" };
const PH_TITLE = { en: "Placeholder Title", es: "Título provisional" };
const PH_BODY = {
  en: "Placeholder body copy — replace this with the final text for this section.",
  es: "Texto provisional: sustitúyelo por el texto final de esta sección.",
};

export const CASE_STUDIES = {
  /* ================= D&AD New Blood Awards (Monotype x Penguin) ================= */
  "dandad-new-blood": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/dandad-new-blood/monotype-penguin-ai-campaign-cover.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "For the 2026 D&AD New Blood Awards, Monotype and Penguin asked for a type-led idea about how reading is changing. The goal was to use typography to bring the way we consume words closer to the way we feel them.",
          es: "Para los D&AD New Blood Awards 2026, Monotype y Penguin pedían una idea con la tipografía como protagonista sobre cómo está cambiando la lectura. El objetivo era usarla para acercar la forma en que consumimos las palabras a la forma en que las sentimos.",
        } },
        { h: SOLUTION, body: {
          en: "Our insight: more and more people rely on AI tools to read and write for them, sometimes without reviewing what they get back. That habit puts distance between people and the act of communicating. We need to interact with what we generate with AI, and read it, to give it meaning. The campaign makes that literal with interactive posters, scattered letters that fall into place as you walk closer to them.",
          es: "Nuestro insight: cada vez más personas dejan que herramientas de IA lean y escriban por ellas, a veces sin revisar la información que reciben. Esa costumbre crea distancia entre las personas y el propio acto de comunicarse. Necesitamos interactuar con lo que generamos con IA y leerlo para darle significado. La campaña lo interpreta de forma literal con pósteres interactivos, letras dispersas que encuentran su sitio a medida que te acercas a ellas.",
        } },
      ] },
      { t: "media", ratio: "832 / 464", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-dandad-awards-motion.mp4" } },
      { t: "media", ratio: "3 / 2", media: { type: "iframe", src: "work/dandad-new-blood/interactive/index.html" } },
      { t: "text2", cards: [
        {
          h: { en: "From Movement to Type", es: "Del movimiento a la tipografía" },
          body: {
            en: "To bring the interaction to the street, we combined code written in p5.js with TouchDesigner and an Xbox Kinect that scans the space in real time. We divided the area in front of the poster into active zones. When someone moves through them, the letters start to move and reorder themselves until the message comes together.",
            es: "Para llevar la interacción a la calle, combinamos código en p5.js con TouchDesigner y una Kinect de Xbox que escanea el espacio en tiempo real. Dividimos la zona frente al póster en áreas activas. Cuando alguien se mueve por ellas, las letras del cartel se ponen en movimiento y se reordenan hasta formar el mensaje.",
          },
        },
      ] },
      { t: "media", ratio: "1600 / 792", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-color-system-motion.mp4" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-ai-poster-interaction-left.mp4" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-ai-poster-interaction-right.mp4" } },
      { t: "text2", cards: [
        {
          h: { en: "Penguin's Colors, Monotype's Type", es: "Colores de Penguin, tipografía de Monotype" },
          body: {
            en: "We took the campaign to different formats and places, from street posters to exhibition spaces and motion pieces. We stayed true to Penguin's look, with flat color backgrounds that recall its color-coded covers, and used different typefaces to show the range of Monotype's type work.",
            es: "Llevamos la campaña a distintos formatos y lugares, desde carteles en la calle hasta espacios expositivos y piezas en movimiento. Fuimos fieles a la estética de Penguin, con fondos de color plano que recuerdan a sus portadas clasificadas por colores, y usamos tipografías distintas que representan el trabajo tipográfico de Monotype.",
          },
        },
      ] },
      { t: "media", ratio: "16 / 9", media: { type: "frames", dir: "work/dandad-new-blood/frames/", pad: 4, ext: ".webp", first: 0, last: 289, step: 1, anchor: 279, anchorAt: 0.5, pxPerFrame: 2.65 } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/dandad-new-blood/monotype-penguin-ai-poster-bike-mockup.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/dandad-new-blood/monotype-penguin-ai-poster-blue-left.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/dandad-new-blood/monotype-penguin-ai-poster-lettering-right.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-ai-poster-bike-mockup-motion.mp4" } },
      { t: "media", ratio: "2048 / 1556", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-ai-poster-exhibition-motion.mp4" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/dandad-new-blood/monotype-penguin-ai-poster-orange-left.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/dandad-new-blood/monotype-penguin-ai-poster-turquoise-right.png" } },
      { t: "media", ratio: "16 / 9", media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-ai-poster-process-motion.mp4" } },
      { t: "text2", cards: [
        {
          h: { en: "Taking the Message Further", es: "Llevar el mensaje más lejos" },
          body: {
            en: "We made a motion video to explain the campaign on social media, where it could reach more people. In it we lay out the problem, that more and more people let AI read and write for them, to raise awareness beyond the posters.",
            es: "Hicimos un vídeo de motion para explicar la campaña en redes sociales, donde podía llegar a más gente. En él contamos el problema, que cada vez más personas dejan que la IA lea y escriba por ellas, para concienciar al público más allá de los carteles.",
          },
        },
      ] },
      { t: "media", ratio: "16 / 9", button: true, media: { type: "video", src: "work/dandad-new-blood/monotype-penguin-dandad-campaign-film.mp4" } },
    ],
    projectInfo: {
      en: `<p>The brief asked us to rethink reading through typography, and our insight pointed to a growing distance: people let AI read and write for them without reviewing the result. We chose interactive posters in public space because they make the reader take part. The text becomes legible when someone gets close, the same way AI-generated content gains meaning when a person reads it.</p>
<p>The scattered letters stand for text with no one behind it. To keep the focus on type, as the brief required, we kept Penguin's flat color backgrounds and set the pieces in different Monotype typefaces, so each poster reads as the work of both brands. The posters reach whoever walks past, so we added a motion video for social media to take the problem to the screens where people read most.</p>
<p>We used an Xbox Kinect because it scans the space in real time without anyone touching the poster: walking past is enough. With TouchDesigner and code written in p5.js, we turned that movement into the motion of the letters. We designed the posters in Illustrator and animated the social media video in After Effects.</p>`,
      es: `<p>El brief pedía repensar la lectura a través de la tipografía, y nuestro insight apuntaba a una distancia cada vez mayor: la gente deja que la IA lea y escriba por ella sin revisar el resultado. Elegimos pósteres interactivos en el espacio público porque hacen participar al lector. El texto se vuelve legible cuando alguien se acerca, igual que el contenido generado con IA cobra sentido cuando una persona lo lee.</p>
<p>Las letras dispersas representan un texto sin nadie detrás. Para mantener el foco en la tipografía, como pedía el brief, respetamos los fondos de color plano de Penguin y compusimos las piezas con distintas tipografías de Monotype, para que cada póster se lea como un trabajo de las dos marcas. Los carteles llegan a quien pasa por delante, así que añadimos un vídeo de motion para redes sociales y llevamos el problema a las pantallas, donde hoy más se lee.</p>
<p>Usamos una Kinect de Xbox porque escanea el espacio en tiempo real sin que nadie toque el póster: basta con pasar por delante. Con TouchDesigner y código en p5.js convertimos esos desplazamientos en el movimiento de las letras. Diseñamos los carteles en Illustrator y animamos el vídeo para redes en After Effects.</p>`,
    },
    credits: {
      en: `<h2>Team</h2>
<p>Alba del Moral<br>Robi Falgan<br>Lucía Antón<br>David Bayón</p>
<h2>Skills</h2>
<p>Strategy:<br>Brief analysis, insight and concept</p>
<p>Design:<br>Art direction, typography and poster design</p>
<p>Interaction:<br>Creative coding and real-time motion tracking</p>
<p>Motion:<br>Motion design for social media</p>
<h2>Software</h2>
<p>Illustrator:<br>Poster design</p>
<p>After Effects:<br>Motion video for social media</p>
<p>TouchDesigner:<br>Real-time interaction</p>
<p>p5.js:<br>Creative coding</p>`,
      es: `<h2>Equipo</h2>
<p>Alba del Moral<br>Robi Falgan<br>Lucía Antón<br>David Bayón</p>
<h2>Habilidades</h2>
<p>Estrategia:<br>Análisis del brief, insight y concepto</p>
<p>Diseño:<br>Dirección de arte, tipografía y diseño de carteles</p>
<p>Interacción:<br>Programación creativa y detección de movimiento en tiempo real</p>
<p>Motion:<br>Motion design para redes sociales</p>
<h2>Software</h2>
<p>Illustrator:<br>Diseño de los carteles</p>
<p>After Effects:<br>Vídeo de motion para redes sociales</p>
<p>TouchDesigner:<br>Interacción en tiempo real</p>
<p>p5.js:<br>Programación creativa</p>`,
    },
  },

  /* ================= Yeezy Slide YS-01 ================= */
  "yeezy-slide": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/yeezy-slide/yeezy-logo.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "Yeezy designed its new slide around simplicity and comfort. For the launch, the brand wanted a campaign that showed both without giving up its modern, avant-garde look.",
          es: "Yeezy diseñó su nueva chancla en torno a la simplicidad y la comodidad. Para el lanzamiento, la marca quería una campaña que mostrara ambas cosas sin renunciar a su estética moderna y vanguardista.",
        } },
        { h: SOLUTION, body: {
          en: "I built the visuals around the slide's minimalist design and kept the focus on its shape and its ridged sole. Yeezy doesn't push a sales message, so I left the pitch out and trusted the design to move people on its own.",
          es: "Construí los visuales a partir del diseño minimalista de la chancla y mantuve el foco en su forma y en su suela estriada. Yeezy no lanza mensajes de venta, así que dejé fuera cualquier argumento comercial y confié en que el diseño conmoviera por sí solo.",
        } },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/yeezy-slide/yeezy-slide-3d-render-side-view.png" } },
      { t: "media", ratio: "720 / 1080", media: { type: "image", src: "work/yeezy-slide/yeezy-slide-3d-render-three-quarter.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/yeezy-slide/yeezy-slide-3d-render-sole-closeup.png" } },
      { t: "media", ratio: "720 / 1080", layout: "split", media: { type: "image", src: "work/yeezy-slide/yeezy-slide-3d-render-circle-composition.png" } },
      { t: "media", ratio: "720 / 1080", layout: "split", button: true, media: { type: "video", src: "work/yeezy-slide/yeezy-slide-3d-product-animation.mp4" } },
    ],
    projectInfo: {
      en: `<p>Yeezy keeps its products stripped back and says little about them. For the launch of the YS-01 slide, I had to create a vertical campaign for social media that showed the slide's simplicity and comfort without losing the brand's modern, avant-garde look.</p>
<p>I worked in phases. First I analyzed the competition and ran a market study to see how other brands launch footwear and where Yeezy could stand apart. Then I studied Yeezy itself: its visual codes and the way it presents product. I didn't make a single design decision until I had closed both phases.</p>
<p>Most of the launches I analyzed lean on models and lifestyle shoots. Yeezy prefers silence, so I went the other way. I cut the palette down to black and soft gray and left the slide floating in an empty space, with no people or setting to compete with it. I used diffused light and matte materials to bring out the softness of the foam, and framed the ridged sole in close-ups until it read more like sculpture than footwear. Holding back like this matches how Yeezy already communicates, and it gave me the clearest way to show comfort and simplicity.</p>
<p>I modeled the slide in Cinema 4D and did all the animation work there: morphing, lighting and materials. I rendered it with Redshift. With the morphing, I bent and reshaped the form to suggest the slide's cushioning and flexibility without adding a line of copy.</p>
<p>I composed each frame for vertical format, because people would watch the campaign on their phones. I edited the video and did the sound design in Premiere Pro, looking for a rhythm that would hold attention in the feed.</p>`,
      es: `<p>Yeezy reduce sus productos a lo esencial y habla poco de ellos. Para el lanzamiento de la chancla YS-01 tenía que crear una campaña en vertical para redes sociales que mostrara su simplicidad y su comodidad sin perder la estética moderna y vanguardista de la marca.</p>
<p>Trabajé por fases. Primero analicé a la competencia e hice un estudio de mercado para ver cómo lanzan calzado otras marcas y en qué podía diferenciarse Yeezy. Después estudié la propia marca: sus códigos visuales y su manera de presentar el producto. No tomé ninguna decisión de diseño hasta cerrar las dos fases.</p>
<p>La mayoría de los lanzamientos que analicé se apoyan en modelos y en sesiones de estilo de vida. Yeezy prefiere el silencio, así que fui en la dirección contraria. Reduje la paleta al negro y a un gris suave y dejé la chancla flotando en un espacio vacío, sin personas ni escenarios que compitan con ella. Usé luz difusa y materiales mate para sacar la suavidad de la espuma, y encuadré la suela estriada en primeros planos hasta que pareciera más una escultura que un calzado. Contenerme así encaja con la forma en que Yeezy ya se comunica y me dio la manera más clara de enseñar comodidad y simplicidad.</p>
<p>Modelé la chancla en Cinema 4D y allí hice todo el trabajo de animación: morphing, iluminación y materiales. Después la rendericé con Redshift. Con el morphing doblé y transformé la forma para sugerir la amortiguación y la flexibilidad de la chancla sin añadir ni una línea de texto.</p>
<p>Compuse cada plano para formato vertical, porque la gente iba a ver la campaña en el móvil. Edité el vídeo e hice el diseño de sonido en Premiere Pro, buscando un ritmo que retuviera la atención en el feed.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Research:<br>Market research, competitor analysis, brand analysis</p>
<p>Design:<br>Art direction</p>
<p>3D:<br>Modeling, animation, morphing, lighting, materials and rendering</p>
<p>Post-production:<br>Video editing and sound design</p>
<h2>Software</h2>
<p>Cinema 4D:<br>Modeling, animation, morphing, lighting and materials</p>
<p>Redshift:<br>Rendering</p>
<p>Premiere Pro:<br>Video editing and sound design</p>`,
      es: `<h2>Habilidades</h2>
<p>Investigación:<br>Estudio de mercado, análisis de la competencia, análisis de marca</p>
<p>Diseño:<br>Dirección de arte</p>
<p>3D:<br>Modelado, animación, morphing, iluminación, materiales y render</p>
<p>Postproducción:<br>Edición de vídeo y diseño de sonido</p>
<h2>Software</h2>
<p>Cinema 4D:<br>Modelado, animación, morphing, iluminación y materiales</p>
<p>Redshift:<br>Render</p>
<p>Premiere Pro:<br>Edición de vídeo y diseño de sonido</p>`,
    },
  },

  /* ================= Legacy (fanzine sobre Virgil Abloh) ================= */
  "legacy-virgil-abloh": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "frameloop", intervalMs: 400, frames: [
        "work/legacy-virgil-abloh/frames/legacy-fanzine-logo-frame-01.jpg",
        "work/legacy-virgil-abloh/frames/legacy-fanzine-logo-frame-02.jpg",
        "work/legacy-virgil-abloh/frames/legacy-fanzine-logo-frame-03.jpg",
        "work/legacy-virgil-abloh/frames/legacy-fanzine-logo-frame-04.jpg",
        "work/legacy-virgil-abloh/frames/legacy-fanzine-logo-frame-05.jpg",
        "work/legacy-virgil-abloh/frames/legacy-fanzine-logo-frame-06.jpg",
      ] } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "I wanted to make a personal tribute to Virgil Abloh, in memory of his death and of the work and collaborations he built over his career.",
          es: "Quería hacer un proyecto personal en homenaje a Virgil Abloh, en memoria de su muerte y de los trabajos y colaboraciones que construyó a lo largo de su carrera.",
        } },
        { h: SOLUTION, body: {
          en: "I designed a personal fanzine that combines color and images into a magazine aesthetic. Across the spreads I borrowed styles Virgil worked with, from the Off-White quotation marks and orange to the Louis Vuitton rainbow and the gold of <em>Watch the Throne</em>, and reinterpreted them in my own way.",
          es: "Diseñé un fanzine personal que combina color e imágenes con una estética de revista. A lo largo de sus páginas tomé estilos con los que trabajó Virgil, desde las comillas y el naranja de Off-White hasta el arcoíris de Louis Vuitton y el dorado de <em>Watch the Throne</em>, y los reinterpreté a mi manera.",
        } },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-cover-mockup.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-spread-virgil-workshop.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-spread-off-white.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-spread-louis-vuitton-ss21.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-spread-louis-vuitton.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-spread-gold.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/legacy-virgil-abloh/legacy-fanzine-spread-pioneer-x-virgil.png" } },
    ],
    projectInfo: {
      en: `<p>Legacy is a personal fanzine I made in tribute to Virgil Abloh. I chose the zine format because it comes from the street and youth culture he started in, and he said he designed for the seventeen-year-old version of himself.</p>
<p>Virgil moved between distant worlds, so I gave each chapter its own palette to mark the jump from Off-White to Louis Vuitton or Kanye West. To show that one person connects them, I repeated his quotation marks and an orange band across the spreads. I paired a classic serif with a bold sans serif to echo the mix of luxury and streetwear he built his career on.</p>
<p>I designed the visuals in Photoshop, where I did the photo and color work, and laid out the fanzine in InDesign to keep those repeated elements consistent from page to page.</p>`,
      es: `<p>Legacy es un fanzine personal que hice en homenaje a Virgil Abloh. Elegí el formato fanzine porque nace de la cultura callejera y juvenil en la que él empezó, y Virgil decía que diseñaba para su versión de diecisiete años.</p>
<p>Virgil se movía entre mundos alejados, así que di a cada capítulo su propia paleta para marcar el salto de Off-White a Louis Vuitton o a Kanye West. Para que se vea que una misma persona los une, repetí sus comillas y una franja naranja en todas las dobles páginas. Combiné una serif clásica con una sans serif gruesa para reflejar la mezcla de lujo y streetwear sobre la que construyó su carrera.</p>
<p>Diseñé los visuales en Photoshop, donde hice el trabajo de fotografía y color, y maqueté el fanzine en InDesign para mantener esos elementos iguales de una página a otra.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Research:<br>Visual research and referencing</p>
<p>Design:<br>Art direction, editorial design</p>
<p>Image:<br>Photo retouching, color treatment and collage</p>
<p>Layout:<br>Grid, typography and page composition</p>
<h2>Software</h2>
<p>Photoshop:<br>Visuals, photo retouching and color</p>
<p>InDesign:<br>Layout and typography</p>`,
      es: `<h2>Habilidades</h2>
<p>Investigación:<br>Investigación visual y búsqueda de referencias</p>
<p>Diseño:<br>Dirección de arte, diseño editorial</p>
<p>Imagen:<br>Retoque fotográfico, tratamiento de color y collage</p>
<p>Maquetación:<br>Retícula, tipografía y composición de página</p>
<h2>Software</h2>
<p>Photoshop:<br>Visuales, retoque fotográfico y color</p>
<p>InDesign:<br>Maquetación y tipografía</p>`,
    },
  },

  /* ================= GoodMorning Coffee ================= */
  "goodmorning-coffee": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/goodmorning-coffee/goodmorning-coffee-logo-lockup.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "GoodNews needed a coffee sub-brand for its online store, with higher-caffeine blends for the morning and a more premium customer in mind. It also needed structural packaging that could show all the new flavors.",
          es: "GoodNews necesitaba una submarca de café para su tienda online, con cafés de más cafeína para la mañana y pensada para un cliente más premium. También necesitaba un packaging estructural que mostrara todos los nuevos sabores.",
        } },
        { h: SOLUTION, body: {
          en: "I designed the sub-brand with a less minimalist look than GoodNews so you can tell it apart from the brand's other coffees. I kept what GoodNews stands for and took the design somewhere more elegant and premium.",
          es: "Diseñé la submarca con una línea menos minimalista que la de GoodNews para que la distingas de sus otros cafés. Mantuve lo que representa la marca y llevé el diseño hacia algo más elegante y premium.",
        } },
      ] },
      { t: "media", ratio: "0.75", layout: "split", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-logo-animation.mp4" } },
      { t: "media", ratio: "0.75", layout: "split", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-wordmark-animation.mp4" } },
      { t: "text2", cards: [
        {
          h: { en: "From the Bathroom to Breakfast", es: "Del baño al desayuno" },
          body: {
            en: "I designed a structural box that holds six samples, one per flavor. For the outside, I thought about what you do when you get up: go to the bathroom, then make coffee with breakfast. So I covered it in Mediterranean bathroom tiles, cheerful and elegant. I curved the main box like a bathtub to give it a clean, edgeless look and make opening it feel more premium.",
            es: "Diseñé una caja estructural con seis muestras, una por sabor. Para el exterior pensé en lo que haces al levantarte: pasar por el baño y después prepararte el café del desayuno. Por eso la cubrí con baldosas de baño de estilo mediterráneo, alegres y elegantes. Curvé la caja principal como una bañera para darle una estética limpia, sin aristas, y que abrirla se sienta más premium.",
          },
        },
      ] },
      { t: "media", ratio: "842 / 595", media: { type: "image", src: "work/goodmorning-coffee/goodmorning-coffee-large-box-dieline.jpg" } },
      { t: "media", ratio: "16 / 9", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-box-dieline-animation.mp4" } },
      { t: "media", ratio: "3 / 2", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-tile-pattern-animation.mp4" } },
      { t: "text2", cards: [
        {
          h: { en: "From Flat to 3D", es: "Del plano al 3D" },
          body: {
            en: "Once I'd finished the design, I modeled the packaging in 3D and made a series of videos to promote the new flavors. In them the dieline folds into the box, and the main box opens to reveal the six samples, each with its own tile and color. You see how the packaging works before you hold it.",
            es: "Con el diseño cerrado, modelé el packaging en 3D y preparé unos vídeos para promocionar los nuevos sabores. En ellos el troquel se pliega hasta formar la caja, y la principal se abre para enseñar las seis muestras, cada una con su baldosa y su color. Así ves cómo funciona el packaging antes de tenerlo en las manos.",
          },
        },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-box-folding-animation.mp4" } },
      { t: "media", ratio: "3 / 2", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-packaging-beans-animation.mp4" } },
      { t: "media", ratio: "3 / 2", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-boxes-falling-animation.mp4" } },
      { t: "media", ratio: "3 / 2", media: { type: "video", src: "work/goodmorning-coffee/goodmorning-coffee-box-opening-animation.mp4" } },
    ],
    projectInfo: {
      en: `<p>GoodMorning is a GoodNews sub-brand for its online store, with higher-caffeine coffees for a more premium customer. I moved it away from GoodNews's minimalism so you can tell the two brands apart, and tied it to your morning routine through bathroom tiles.</p>
<p>After the research, I drew the logo and the tile patterns in Illustrator and designed the packaging dieline there too. Each of the six flavors has its own tile and color, so you can recognize them at a glance. Before moving to 3D, I laser-cut the dieline in cardboard to check that the measurements matched.</p>
<p>The coffee sells online, so you can't pick the box up in a shop. I modeled, textured, lit and animated the packaging in Cinema 4D to show you how it opens and what's inside.</p>`,
      es: `<p>GoodMorning es una submarca de GoodNews para su tienda online, con cafés de más cafeína pensados para un cliente más premium. La alejé del minimalismo de GoodNews para que distingas las dos marcas, y la conecté con tu rutina de la mañana a través de las baldosas de baño.</p>
<p>Después de la investigación, dibujé el logo y los patrones de azulejos en Illustrator, y también diseñé allí el troquel del packaging. Cada uno de los seis sabores tiene su propia baldosa y su color para que los reconozcas de un vistazo. Antes de pasar al 3D, corté el troquel en cartón con una cortadora láser para comprobar que las medidas encajaban.</p>
<p>El café se vende online, así que no puedes coger la caja en una tienda. Modelé, texturicé, iluminé y animé el packaging en Cinema 4D para enseñarte cómo se abre y qué guarda dentro.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Research:<br>Market and brand research</p>
<p>Branding:<br>Logo design and tile patterns</p>
<p>Packaging:<br>Structural design, dieline and laser-cut prototype</p>
<p>3D:<br>Modeling, texturing, lighting and animation</p>
<h2>Software</h2>
<p>Illustrator:<br>Logo, tile patterns and packaging dieline</p>
<p>Cinema 4D:<br>Modeling, texturing, lighting and animation</p>`,
      es: `<h2>Habilidades</h2>
<p>Investigación:<br>Investigación de mercado y de marca</p>
<p>Branding:<br>Diseño de logotipo y patrones de azulejos</p>
<p>Packaging:<br>Diseño estructural, troquel y prototipo con corte láser</p>
<p>3D:<br>Modelado, texturizado, iluminación y animación</p>
<h2>Software</h2>
<p>Illustrator:<br>Logotipo, patrones de azulejos y troquel del packaging</p>
<p>Cinema 4D:<br>Modelado, texturizado, iluminación y animación</p>`,
    },
  },

  /* ================= Vino Claro ================= */
  "vino-claro": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/vino-claro/vino-claro-bottle-mockup-white-wine-front.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "Vino Claro is a wine brand that celebrates purity and transparency in every bottle. It needed packaging that explored the idea of clarity, playing with transparency in both the materials and the visuals.",
          es: "Vino Claro es una marca de vino que celebra la pureza y la transparencia en cada botella. Necesitaba un packaging que explorara el concepto de claridad y jugara con la transparencia tanto en los materiales como en los elementos visuales.",
        } },
        { h: SOLUTION, body: {
          en: "I created a label built on the values the brand wanted to convey. I also wanted to set the wine apart from the competition with a design that breaks from what you see on the wine shelf and gives it a personality of its own.",
          es: "Creé una etiqueta a partir de los valores que la marca quería transmitir. También quise separar el vino de la competencia con un diseño que rompiera con lo que ves en la estantería, y que le diera personalidad propia.",
        } },
      ] },
      { t: "media", ratio: "2480 / 2911", media: { type: "image", src: "work/vino-claro/vino-claro-front-label-white-wine.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Two Layers of Type", es: "Dos capas de tipografía" },
          body: {
            en: "I set the name twice: in solid black type and, on top, in glassy letters you can see through, like the wine itself. On the white wine the letters take a cool blue tone; for the red, I shifted it to violet.",
            es: "Compuse el nombre dos veces: en una tipografía negra y sólida y, encima, en letras de cristal que dejan ver lo que hay detrás, como el propio vino. En el blanco las letras tienen un tono azul frío; para el tinto cambié la tonalidad a violeta.",
          },
        },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/vino-claro/vino-claro-bottle-mockup-red-wine-front.jpg" } },
      { t: "media", ratio: "2480 / 2911", media: { type: "image", src: "work/vino-claro/vino-claro-front-label-red-wine.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Clear on the Back, Too", es: "Claro también por detrás" },
          body: {
            en: "On the back label, I swapped the glass effect for big black type cropped at the edges. The year and the type of wine take up most of the space, and below them I state where the grapes come from and that it's a natural wine with no sulfites. I wanted the brand's transparency to show in the information too.",
            es: "En la etiqueta trasera pasé del cristal a una tipografía negra, grande y recortada en los bordes. El año y el tipo de vino ocupan casi todo el espacio, y debajo cuento sin rodeos de dónde sale la uva y que es un vino natural sin sulfitos. Quería que la transparencia de la marca también se notara en la información.",
          },
        },
      ] },
      { t: "media", ratio: "575 / 675", layout: "split", media: { type: "image", src: "work/vino-claro/vino-claro-back-label-red-wine.jpg" } },
      { t: "media", ratio: "575 / 675", layout: "split", media: { type: "image", src: "work/vino-claro/vino-claro-back-label-white-wine.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/vino-claro/vino-claro-bottle-mockup-white-wine-back.jpg" } },
    ],
    projectInfo: {
      en: `<p>Vino Claro is a natural wine with no sulfites, made from grapes grown in the Parque Natural de la Mata, in Alicante. I wanted it to stand apart from the other wines on the shelf, so I moved away from the look of a traditional label to give it a personality of its own.</p>
<p>I started from the name itself: <em>claro</em> means clear, like the wine and like what the brand says. I layered glassy, see-through letters over solid black type to play with transparency the way the brand does, and shifted the tone from blue to violet to tell the white from the red.</p>
<p>On the back, I set the information in large, plain type so you can read it at a glance. I created the glass effect of the letters in Photoshop and built the typography and layout of both labels in Illustrator.</p>`,
      es: `<p>Vino Claro es un vino natural sin sulfitos, hecho con uva cultivada en el Parque Natural de la Mata, en Alicante. Quería que se distinguiera del resto de vinos de la estantería, así que me alejé de la estética de la etiqueta tradicional para darle personalidad propia.</p>
<p>Partí del propio nombre: claro, como el vino y como lo que cuenta la marca. Superpuse letras de cristal transparentes sobre una tipografía negra y sólida para jugar con la transparencia igual que la marca, y cambié el tono de azul a violeta para diferenciar el blanco del tinto.</p>
<p>En la trasera compuse la información con una tipografía grande y directa para que la leas de un vistazo. Creé el efecto de cristal de las letras en Photoshop y construí la tipografía y la maquetación de las dos etiquetas en Illustrator.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Branding:<br>Art direction and label design</p>
<p>Typography:<br>Lettering and type composition</p>
<p>Image:<br>Glass effect and mockups</p>
<h2>Software</h2>
<p>Photoshop:<br>Glass effect of the lettering</p>
<p>Illustrator:<br>Typography and label layout</p>`,
      es: `<h2>Habilidades</h2>
<p>Branding:<br>Dirección de arte y diseño de etiquetas</p>
<p>Tipografía:<br>Lettering y composición tipográfica</p>
<p>Imagen:<br>Efecto de cristal y mockups</p>
<h2>Software</h2>
<p>Photoshop:<br>Efecto de cristal de las letras</p>
<p>Illustrator:<br>Tipografía y maquetación de las etiquetas</p>`,
    },
  },

  /* ================= Kaotiko ================= */
  "kaotiko-mural": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "1170 / 878", media: { type: "image", src: "work/kaotiko-mural/kaotiko-mural-fuencarral-store-madrid.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "Kaotiko had changed its identity and launched a new logo. The brand wanted to drop the old look of its store on Calle Fuencarral, in Madrid, and give it one that matched the new identity, with an octopus wrapping around the wall.",
          es: "Kaotiko había cambiado su identidad y estrenaba un logo nuevo. La marca quería dejar atrás el estilo antiguo de su tienda en la calle Fuencarral de Madrid y darle uno acorde a la nueva identidad, con un pulpo que rodeara el muro.",
        } },
        { h: SOLUTION, body: {
          en: "Illustrator Lucía Alcázar and I designed a mural that covers the whole wall. We added the new logo and painted the illustration at full scale with the octopus included.",
          es: "Con la ilustradora Lucía Alcázar diseñamos un mural que ocupa toda la pared. Añadimos el nuevo logo y pintamos la ilustración a escala real con el pulpo incluido.",
        } },
      ] },
      { t: "media", ratio: "3508 / 2480", media: { type: "image", src: "work/kaotiko-mural/kaotiko-mural-wall-preparation.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/kaotiko-mural/kaotiko-mural-lettering-fuencarral-store.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/kaotiko-mural/kaotiko-mural-painting-facade-madrid.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Illustration Style", es: "Estilo de ilustración" },
          body: {
            en: "Kaotiko approved the project so that Lucía Alcázar's personal style could blend with its new identity. On the wall, her comic characters keep their clean lines and flat colors, like the boy in the green tracksuit sitting on the K of the logo. My role was to help her with the illustration and its proportions, and to paint alongside her. Sharing this project with her meant a lot to me.",
            es: "Kaotiko aprobó el proyecto para que el estilo personal de Lucía Alcázar se mezclara con su nueva identidad. En la pared, sus personajes de cómic conservan su línea limpia y sus colores planos, como el chico del chándal verde sentado sobre la K del logo. Mi papel fue ayudarla con la ilustración y sus proporciones, y pintar a su lado. Compartir este proyecto con ella me hizo especial ilusión.",
          },
        },
      ] },
      { t: "media", ratio: "1170 / 882", media: { type: "image", src: "work/kaotiko-mural/kaotiko-mural-finished-octopus-character.jpg" } },
      { t: "media", ratio: "1170 / 882", media: { type: "image", src: "work/kaotiko-mural/kaotiko-mural-store-corner-logo.jpg" } },
    ],
    projectInfo: {
      en: `<p>Kaotiko had a new identity and wanted people to see it on the street, starting with its store on Calle Fuencarral, one of Madrid's busiest shopping streets. The storefront was where most people would first meet the new brand, so we planned a mural that took over the whole wall.</p>
<p>We built the composition on the K of the new logo, using it as the structure and letting Lucía Alcázar's characters live on top of it, so her style and the identity read as one. The octopus wraps around the corner so you can see the mural from both sides of the street.</p>
<p>First we prepared the wall, then we transferred the design at full scale. I helped her with the illustration and its proportions so it worked on a wall that size, and we painted the mural together.</p>`,
      es: `<p>Kaotiko estrenaba identidad y quería que se viera en la calle, empezando por su tienda de Fuencarral, una de las calles más comerciales de Madrid. La fachada era el sitio donde más gente iba a encontrarse con la marca nueva, así que planteamos un mural que ocupara todo el muro.</p>
<p>Construimos la composición sobre la K del nuevo logo: la usamos como estructura y dejamos que los personajes de Lucía Alcázar vivieran encima, para que su estilo y la identidad se leyeran como una sola cosa. El pulpo rodea la esquina para que el mural se vea desde los dos lados de la calle.</p>
<p>Primero preparamos la pared y después trasladamos el diseño a escala real. Yo la ayudé con la ilustración y sus proporciones para que funcionara en un muro de ese tamaño, y pintamos el mural juntos.</p>`,
    },
    credits: {
      en: `<h2>Team</h2>
<p><a href="https://luciaalcazar.com" target="_blank" rel="noopener noreferrer">Lucía Alcázar</a><br>David Bayón</p>
<h2>Skills</h2>
<p>Mural painting:<br>Scaling the design to the wall and painting at full size</p>
<p>Illustration:<br>Drawing support and proportions</p>
<p>Branding:<br>Bringing the new identity to the store</p>`,
      es: `<h2>Equipo</h2>
<p><a href="https://luciaalcazar.com" target="_blank" rel="noopener noreferrer">Lucía Alcázar</a><br>David Bayón</p>
<h2>Habilidades</h2>
<p>Muralismo:<br>Escalado del diseño a la pared y pintura a tamaño real</p>
<p>Ilustración:<br>Apoyo en el dibujo y las proporciones</p>
<p>Branding:<br>Aplicación de la nueva identidad en la tienda</p>`,
    },
  },

  /* ================= Bambata SS/25 ================= */
  "bambata-ss25": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "16 / 9", button: true, loop: false, media: { type: "video", src: "work/bambata-ss25/bambata-ss25-surf-campaign-film.mp4" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "Bambata needed a campaign to sell its basic T-shirts over the summer.",
          es: "Bambata necesitaba una campaña para vender sus camisetas básicas en verano.",
        } },
        { h: SOLUTION, body: {
          en: "I built the campaign around surfing to communicate the brand's own style. I wanted to create a niche, a sense of belonging among people who enjoy the sport in summer.",
          es: "Construí la campaña alrededor del surf para comunicar el estilo propio de la marca. Quería crear un sentimiento de nicho y de pertenencia entre quienes disfrutan de este deporte en verano.",
        } },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-surfer-in-water.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-wetsuit-santander-portrait.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-wetsuit-product.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Exclusive Piece", es: "Pieza exclusiva" },
          body: {
            en: "For the launch, I produced a custom wetsuit with the Bambata logo. With it, I took the brand into the water, where the people this campaign speaks to surf, and paired the T-shirts with a one-off piece to tell the brand's story through surfing.",
            es: "Para el lanzamiento produje un neopreno personalizado con el logo de Bambata. Con él llevé la marca al agua, donde surfea la gente a la que habla la campaña, y sumé a las camisetas una pieza única para contar la historia de la marca desde el surf.",
          },
        },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-surfboard-in-water.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-surfer-cave-silhouette.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-white-tee-rock-portrait.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-white-tee-back.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-black-tee-cave-portrait.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-ss25/bambata-ss25-black-tee-front.jpg" } },
    ],
    projectInfo: {
      en: `<p>Bambata is my personal brand. I started it in 2024 to complement my design degree with a real project.</p>
<p>For the SS/25 campaign, I chose surfing as the common thread because I wanted to aim the basic T-shirts at a specific community. I shot the photos and video in Santander, where I spend my summers surfing.</p>
<p>I edited and colored the photos in Lightroom, and cut the video and did the color grading in DaVinci Resolve.</p>`,
      es: `<p>Bambata es mi marca personal. La creé en 2024 para complementar mi formación como diseñador con un proyecto real.</p>
<p>Para la campaña SS/25 elegí el surf como hilo conductor, porque quería dirigir las camisetas básicas a una comunidad concreta. Hice la sesión de fotos y vídeo en Santander, donde paso el verano y surfeo.</p>
<p>Edité y coloreé las fotos en Lightroom, y monté el vídeo e hice el color grading en DaVinci Resolve.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Art direction:<br>Campaign concept, photo shoot, video shoot</p>
<p>Product:<br>Basic T-shirts, custom wetsuit</p>
<p>Post-production:<br>Photo editing, video editing, color grading</p>
<h2>Software</h2>
<p>Lightroom:<br>Photo editing and color</p>
<p>DaVinci Resolve:<br>Video editing and color grading</p>`,
      es: `<h2>Habilidades</h2>
<p>Dirección de arte:<br>Concepto de campaña, sesión de fotos, sesión de vídeo</p>
<p>Producto:<br>Camisetas básicas, neopreno personalizado</p>
<p>Postproducción:<br>Edición de fotos, montaje de vídeo, color grading</p>
<h2>Software</h2>
<p>Lightroom:<br>Edición y color de las fotos</p>
<p>DaVinci Resolve:<br>Montaje y color grading del vídeo</p>`,
    },
  },

  /* ================= Bambata A/W ================= */
  "bambata-aw": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "4961 / 3508", media: { type: "image", src: "work/bambata-aw/bambata-aw-chrome-logo.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "Bambata was launching an autumn/winter collection built from scratch and needed a campaign with a story of its own. We had to shoot it with a large team and little time.",
          es: "Bambata lanzaba una colección de otoño-invierno creada desde cero y necesitaba una campaña con historia propia. Teníamos que rodarla con un equipo grande y poco tiempo.",
        } },
        { h: SOLUTION, body: {
          en: "We built the campaign around motorsport: a classic car, plus a helmet and a racing suit customized with the Bambata logo. We shot the video with cameras fixed to the car and added a photo shoot across Madrid's art galleries for social media.",
          es: "Construimos la campaña alrededor del mundo del motor: un coche clásico, y un casco y un mono de carreras personalizados con el logo de Bambata. Rodamos el vídeo con cámaras fijadas al coche y lo completamos con una sesión de fotos por galerías de arte de Madrid para redes.",
        } },
      ] },
      { t: "media", ratio: "842 / 595", media: { type: "image", src: "work/bambata-aw/bambata-aw-helmet-views.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-aw/bambata-aw-helmet-white-overalls-sky.png" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-aw/bambata-aw-helmet-road-portrait.png" } },
      { t: "text2", cards: [
        {
          h: { en: "Helmet and Racing Suit", es: "Casco y mono de carreras" },
          body: {
            en: "We vinyl-wrapped the helmet and the racing suit with the Bambata logo in black on white. With those details, we turned the model into the brand's driver and tied the clothes, the classic car and the shoot into one story.",
            es: "Vinilamos el casco y el mono de carreras con el logo de Bambata en negro sobre blanco. Con esos detalles convertimos al modelo en el piloto de la marca y unimos la ropa, el coche clásico y el rodaje en una misma historia.",
          },
        },
      ] },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-aw/bambata-aw-grey-tee-lookbook.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-aw/bambata-aw-grey-hoodie-lookbook.png" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-aw/bambata-aw-white-tee-lookbook.png" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "image", src: "work/bambata-aw/bambata-aw-black-tee-lookbook.jpg" } },
      { t: "media", ratio: "4 / 5", layout: "split", media: { type: "frameloop", intervalMs: 500, frames: [
        "work/bambata-aw/frames/bambata-aw-black-print-hoodie.png",
        "work/bambata-aw/frames/bambata-aw-pink-print-hoodie.png",
        "work/bambata-aw/frames/bambata-aw-white-tee.jpg",
        "work/bambata-aw/frames/bambata-aw-grey-tee.jpg",
        "work/bambata-aw/frames/bambata-aw-black-tee.jpg",
      ] } },
      { t: "media", ratio: "4 / 5", layout: "split", button: true, loop: false, media: { type: "video", src: "work/bambata-aw/bambata-aw-helmet-campaign-film.mp4" } },
    ],
    projectInfo: {
      en: `<p>This is the most challenging project I've worked on. An acquaintance lent us a classic car to shoot the campaign, we rented filming gear and magnets to fix the cameras to the bodywork, and we shot it all against the clock.</p>
<p>Before the shoot, we prepared the styling for the T-shirts and sweatshirts, customized a helmet and a racing suit with vinyl, and added a pair of noise-cancelling headphones.</p>
<p>For social media, we did a second shoot in Madrid: we spent a whole day touring art galleries with six models and the camera, photographing the T-shirts in each space.</p>
<p>Some things didn't go as planned, but we learned how to coordinate a large team with a lot of details and little time, and we got a final result we're proud of. We designed the T-shirts in Illustrator, edited the photos in Lightroom and cut the video in DaVinci Resolve.</p>`,
      es: `<p>Es el proyecto más exigente que he hecho. Un conocido nos dejó su coche clásico para grabar la campaña, alquilamos un equipo de grabación y unos imanes para fijar las cámaras a la carrocería, y lo rodamos todo con el tiempo justo.</p>
<p>Antes del rodaje preparamos el estilismo de las camisetas y las sudaderas, personalizamos un casco y un mono de carreras con vinilo, y sumamos unos cascos de cancelación de ruido.</p>
<p>Para redes hicimos otra sesión en Madrid: pasamos un día entero recorriendo galerías de arte con seis modelos y la cámara, fotografiando las camisetas en cada espacio.</p>
<p>Algunas cosas no salieron como queríamos, pero aprendimos a coordinar un equipo grande, con muchos detalles y poco tiempo, y conseguimos un resultado final del que estamos orgullosos. Diseñamos las camisetas en Illustrator, editamos las fotos en Lightroom y montamos el vídeo en DaVinci Resolve.</p>`,
    },
    credits: {
      en: `<h2>Team</h2>
<p>Creative direction:<br>David Bayón</p>
<p>Photography:<br>Alba del Moral</p>
<p>Team management and locations:<br>Iacopo Ferrari</p>
<p>Styling:<br>María Ferré</p>
<h2>Skills</h2>
<p>Art direction:<br>Campaign concept, video shoot, photo shoot</p>
<p>Production:<br>Team coordination, locations, filming gear</p>
<p>Product:<br>T-shirt and sweatshirt design, vinyl-customized helmet and racing suit</p>
<p>Post-production:<br>Photo editing, video editing</p>
<h2>Software</h2>
<p>Illustrator:<br>T-shirt design</p>
<p>Lightroom:<br>Photo editing</p>
<p>DaVinci Resolve:<br>Video editing</p>`,
      es: `<h2>Equipo</h2>
<p>Dirección creativa:<br>David Bayón</p>
<p>Fotografía:<br>Alba del Moral</p>
<p>Gestión del equipo y localizaciones:<br>Iacopo Ferrari</p>
<p>Estilismo:<br>María Ferré</p>
<h2>Habilidades</h2>
<p>Dirección de arte:<br>Concepto de campaña, rodaje, sesión de fotos</p>
<p>Producción:<br>Coordinación de equipo, localizaciones, equipo de grabación</p>
<p>Producto:<br>Diseño de camisetas y sudaderas, casco y mono de carreras personalizados con vinilo</p>
<p>Postproducción:<br>Edición de fotos, montaje de vídeo</p>
<h2>Software</h2>
<p>Illustrator:<br>Diseño de las camisetas</p>
<p>Lightroom:<br>Edición de las fotos</p>
<p>DaVinci Resolve:<br>Montaje del vídeo</p>`,
    },
  },

  /* ================= Bambata Photography ================= */
  "bambata-photography": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "16 / 9", button: true, loop: false, media: { type: "video", src: "work/bambata-photography/bambata-photography-mountain-campaign-film.mp4" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "Bambata was launching a new collection and needed to define the photographic style of its campaign, aimed at a young community that goes to the mountains.",
          es: "Bambata lanzaba una nueva colección y necesitaba definir el estilo fotográfico de su campaña pensado para una comunidad joven que sale a la montaña.",
        } },
        { h: SOLUTION, body: {
          en: "I took the shoot to a real ascent of Gran Paradiso, in Italy, and photographed the climb as it happened, with direct flash and reportage framing, from the night start with headlamps to the first light on the snow. For the video, I put together footage from this trip and from other mountain trips. Several expeditions together show the mountains as a habit of young people, and the collection speaks to that community.",
          es: "Llevé la sesión a una ascensión real al Gran Paradiso, en Italia, y fotografié la subida tal y como ocurrió, con flash directo y encuadres de reportaje, desde la salida de noche con frontales hasta la primera luz sobre la nieve. Para el vídeo junté fragmentos de este viaje y de otras salidas a la montaña. Varias expediciones juntas muestran la montaña como una costumbre de gente joven, y la colección habla a esa comunidad.",
        } },
      ] },
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/bambata-photography/bambata-photography-climber-night-portrait.jpg" } },
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/bambata-photography/bambata-photography-ice-axe-night-climb.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/bambata-photography/bambata-photography-mountaineer-dusk-portrait.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/bambata-photography/bambata-photography-team-snow-night.png" } },
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/bambata-photography/bambata-photography-night-climb-headlamp.png" } },
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/bambata-photography/bambata-photography-ski-goggles-portrait.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/bambata-photography/bambata-photography-ice-wall-portrait.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/bambata-photography/bambata-photography-lake-sunset-portrait.png" } },
    ],
    projectInfo: {
      en: `<p>I traveled to Italy to climb Gran Paradiso, at 4,061 meters, and shoot Bambata's new mountain collection there. I wanted the campaign to show the clothes in the conditions they are made for, so I photographed them during the ascent.</p>
<p>The climb started at night, with headlamps, and I chose direct flash to keep that darkness and cold in the pictures. Close reportage framing, with people on the move, gives the campaign the tone of an expedition diary.</p>
<p>I wanted to highlight the young community behind these activities, so in the campaign video I mixed footage from this trip with clips from other mountain trips. I edited the photos in Lightroom and cut the video in DaVinci Resolve.</p>`,
      es: `<p>Viajé a Italia para subir el Gran Paradiso, de 4.061 metros, y hacer allí la sesión de la nueva colección de montaña de Bambata. Quería que la campaña mostrara la ropa en las condiciones para las que está hecha, así que la fotografié durante la ascensión.</p>
<p>La subida empezó de noche, con frontales, y elegí el flash directo para mantener esa oscuridad y ese frío en las fotos. Los encuadres de reportaje, cerca de la gente y en movimiento, dan a la campaña el tono de un diario de expedición.</p>
<p>Quería destacar a la comunidad joven que hace estas actividades, así que en el vídeo de la campaña mezclé fragmentos de este viaje con los de otras salidas a la montaña. Edité las fotos en Lightroom y monté el vídeo en DaVinci Resolve.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Art direction:<br>Photographic style, campaign concept</p>
<p>Photography:<br>Photo shoot during the ascent</p>
<p>Video:<br>Campaign video with footage from several mountain trips</p>
<p>Production:<br>Trip to Italy, Gran Paradiso ascent</p>
<p>Post-production:<br>Photo editing, video editing</p>
<h2>Software</h2>
<p>Lightroom:<br>Photo editing</p>
<p>DaVinci Resolve:<br>Campaign video editing</p>`,
      es: `<h2>Habilidades</h2>
<p>Dirección de arte:<br>Estilo fotográfico, concepto de campaña</p>
<p>Fotografía:<br>Sesión de fotos durante la ascensión</p>
<p>Vídeo:<br>Vídeo de campaña con fragmentos de varias salidas a la montaña</p>
<p>Producción:<br>Viaje a Italia, ascensión al Gran Paradiso</p>
<p>Postproducción:<br>Edición de fotos, montaje de vídeo</p>
<h2>Software</h2>
<p>Lightroom:<br>Edición de las fotos</p>
<p>DaVinci Resolve:<br>Montaje del vídeo de campaña</p>`,
    },
  },

  /* ================= Vogue Backstage ================= */
  "vogue-backstage": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-talks-stage.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "We had to design and create a full event for Vogue in Madrid. We focused on the user experience, from the moment someone discovers the event to the moment they share it.",
          es: "Teníamos que diseñar y crear un evento completo para Vogue en Madrid. Nos centramos en la experiencia de usuario, desde que alguien descubre el evento hasta que lo comparte.",
        } },
        { h: SOLUTION, body: {
          en: "We designed the creative process nobody sees behind each issue. We planned the event as an interactive museum where you learn from industry leaders in talks and workshops. You live the magazine from the inside in immersive spaces.",
          es: "Diseñamos el proceso creativo que nadie ve detrás de cada número. Planteamos el evento como un museo interactivo donde aprendes de referentes del sector en charlas y talleres. Vives la revista por dentro en espacios inmersivos.",
        } },
      ] },
      { t: "media", ratio: "595 / 842", layout: "split", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-poster.jpg" } },
      { t: "media", ratio: "595 / 842", layout: "split", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-bus-stop-poster.jpg" } },
      { t: "media", ratio: "4 / 3", media: { type: "video", src: "work/vogue-backstage/vogue-backstage-event-pass-animation.mp4" } },
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-horizontal-banner.jpg" } },
      { t: "media", ratio: "4 / 3", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-billboard-mockup.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "User Experience and Merchandising", es: "Experiencia de usuario y merchandising" },
          body: {
            en: "We wanted the visit to feel worth sharing. We kept ticket sales in a single app to remove friction, used price anchoring to raise the average spend and turned merchandising into a content engine.",
            es: "Queríamos que la visita diera ganas de contarla. Concentramos la venta de entradas en una sola app para quitar fricción, usamos el anclaje de precios para subir el ticket medio y convertimos el merchandising en motor de contenido.",
          },
        },
      ] },
      { t: "media", ratio: "595 / 842", layout: "split", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-newspaper-mockup.png" } },
      { t: "media", ratio: "595 / 842", layout: "split", media: { type: "image", src: "work/vogue-backstage/vogue-backstage-branded-food-bag.png" } },
      { t: "media", ratio: "4 / 3", media: { type: "video", src: "work/vogue-backstage/vogue-backstage-mobile-ticketing-animation.mp4" } },
    ],
    projectInfo: {
      en: `<p>Our audience follows fashion on social media, and an event that tours the country depends on that audience to carry it from one city to the next. We designed the route, the merchandising and the hashtags around photos people want to share, so each visitor helps us reach the next.</p>
<p>We picked Fever because it has the reach and the trust a new event lacks, and it handles capacity, door scanning and refunds. We added email and a CRM to stay in touch with each person before, during and after their visit, and between cities.</p>
<p>We designed the graphics in Illustrator, built the mockups in Photoshop and animated the digital touchpoints in After Effects.</p>`,
      es: `<p>Nuestro público sigue la moda en redes sociales, y un evento que recorre el país depende de ese público para llegar de una ciudad a otra. Diseñamos el recorrido, el merchandising y los hashtags pensando en fotos que la gente quiera compartir, para que cada asistente nos ayude a llegar al siguiente.</p>
<p>Elegimos Fever porque tiene el alcance y la confianza que le faltan a un evento nuevo, y se encarga de los aforos, el escaneo en puerta y las devoluciones. Añadimos email y un CRM para acompañar a cada persona antes, durante y después de su visita, y entre ciudades.</p>
<p>Diseñamos la gráfica en Illustrator, montamos los mockups en Photoshop y animamos los puntos de contacto digitales en After Effects.</p>`,
    },
    credits: {
      en: `<h2>Team</h2>
<p>Lucía Antón<br>David Bayón<br>Lucía Bilantuono<br>Valeria Cabrera</p>
<h2>Skills</h2>
<p>Interactive marketing:<br>Try-on filters, challenges and chatbot</p>
<p>Future trends:<br>AI, e-commerce and automation</p>
<p>Motion:<br>Digital touchpoint animation</p>
<h2>Software</h2>
<p>Illustrator:<br>Graphics and posters</p>
<p>Photoshop:<br>Mockups</p>
<p>After Effects:<br>Animation</p>`,
      es: `<h2>Equipo</h2>
<p>Lucía Antón<br>David Bayón<br>Lucía Bilantuono<br>Valeria Cabrera</p>
<h2>Habilidades</h2>
<p>Marketing interactivo:<br>Filtros de prueba virtual, retos y chatbot</p>
<p>Tendencias futuras:<br>IA, e-commerce y automatización</p>
<p>Motion:<br>Animación de los puntos de contacto digitales</p>
<h2>Software</h2>
<p>Illustrator:<br>Gráfica y carteles</p>
<p>Photoshop:<br>Mockups</p>
<p>After Effects:<br>Animación</p>`,
    },
  },

  /* ================= BASSE (cócteles de vino en lata) =================
     Mete el contenido en public/work/basse/ y añade aquí los slices
     (rutas tipo "work/basse/archivo.jpg"). */
  "basse": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/basse/basse-canned-cocktails-lineup.png" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "BASSE needed an identity for a line of canned drinks. What set it apart was the drink inside: cocktails, ready to open and pour straight from the can.",
          es: "BASSE necesitaba una identidad para una línea de bebidas en lata. Lo que la diferenciaba era lo que había dentro: cócteles listos para abrir y servir desde la propia lata.",
        } },
        { h: SOLUTION, body: {
          en: "I gave the cans a refined design with references to fine cocktail bars and an elegant label, so you read it as a cocktail before you open it. I also created a set of images that put the brand itself in the spotlight.",
          es: "Di a las latas un diseño refinado, con referencias a la coctelería más fina y una etiqueta elegante, para que la leas como un cóctel antes de abrirla. También creé unas imágenes que ponen a la propia marca en el centro de atención.",
        } },
      ] },
      { t: "media", ratio: "2304 / 1724", media: { type: "image", src: "work/basse/basse-royale-can-with-glass.jpg" } },
      { t: "media", ratio: "2 / 3", layout: "split", media: { type: "image", src: "work/basse/basse-spritz-can-in-ice.png" } },
      { t: "media", ratio: "2 / 3", layout: "split", media: { type: "image", src: "work/basse/basse-clerico-pouring-cocktail.png" } },
      { t: "media", ratio: "2 / 3", layout: "split", media: { type: "image", src: "work/basse/basse-three-cans-blue-floor.png" } },
      { t: "media", ratio: "2 / 3", layout: "split", media: { type: "image", src: "work/basse/basse-spritz-can-back.png" } },
    ],
    projectInfo: {
      en: `<p>On the shelf, cans sit next to beer and soft drinks, quick drinks you don't think twice about. BASSE puts cocktails in a can, so the identity had to tell you at a glance that this is a different kind of drink.</p>
<p>I took my references from fine cocktail bars and carried them onto an elegant label, so the can holds the same care as a cocktail served at the bar. The campaign puts the brand first, so you remember the name along with the drink.</p>
<p>I designed the identity and laid out the labels in Illustrator, and made the mockups in Photoshop.</p>`,
      es: `<p>En la estantería, las latas conviven con la cerveza y los refrescos, bebidas rápidas en las que no piensas dos veces. BASSE mete cócteles en una lata, así que la identidad tenía que decirte de un vistazo que es otro tipo de bebida.</p>
<p>Tomé las referencias de la coctelería más fina y las llevé a una etiqueta elegante, para que la lata transmita el mismo cuidado que un cóctel servido en barra. La campaña pone la marca por delante, para que recuerdes el nombre junto a la bebida.</p>
<p>Diseñé la identidad y maqueté las etiquetas en Illustrator, e hice los mockups en Photoshop.</p>`,
    },
    credits: {
      en: `<h2>Skills</h2>
<p>Branding:<br>Visual identity and label design</p>
<p>Communication:<br>Brand campaign</p>
<p>Image:<br>Mockups</p>
<h2>Software</h2>
<p>Illustrator:<br>Identity design and label layout</p>
<p>Photoshop:<br>Mockups</p>`,
      es: `<h2>Habilidades</h2>
<p>Branding:<br>Identidad visual y diseño de etiquetas</p>
<p>Comunicación:<br>Campaña de marca</p>
<p>Imagen:<br>Mockups</p>
<h2>Software</h2>
<p>Illustrator:<br>Diseño de la identidad y maquetación de las etiquetas</p>
<p>Photoshop:<br>Mockups</p>`,
    },
  },

  /* ================= Halfway Magazine =================
     Proyecto final de Taller de Proyectos (UDIT 2025), en equipo → textos en plural.
     Imágenes: HALFWAY-xx.jpg tal cual las exportó David (05 y 06 no se usan). */
  "halfway-magazine": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-logo-variations.jpg" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "We had to create a magazine from scratch around a different, innovative theme.",
          es: "Teníamos que crear una revista desde cero con una temática diferente e innovadora.",
        } },
        { h: SOLUTION, body: {
          en: "We decided to make a magazine that celebrates the unfinished. Halfway starts from one thought: something doesn't have to be perfect or finished before you show it. The beauty of half-done things is that people get to enjoy the process.",
          es: "Decidimos hacer una revista que elogiara lo inacabado. Halfway parte de una reflexión: algo no tiene por qué ser perfecto ni estar acabado para darlo a conocer. Lo bonito de las cosas a medio hacer es que la gente puede disfrutar del proceso.",
        } },
      ] },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-print-mockup.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-laptop-mockup.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-cover-spread.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Collage as Communication", es: "Comunicar con collage" },
          body: {
            en: "On the graphic side, we turned the concept into collage: split images and fragments that break out of the frame, so each page looks like a half-formed idea. Each social media post is a half-built collage, a loose piece of Halfway that invites you to complete the idea. We kept the magazine's ironic, provocative tone so the campaign spoke to readers the same way its pages do.",
            es: "En lo gráfico, trasladamos el concepto al collage: imágenes partidas y fragmentos que se salen del encuadre, para que cada página se vea como una idea a medio formar. Cada publicación en redes es un collage a medio construir, una pieza suelta de Halfway que te invita a completar la idea. Mantuvimos el tono irónico y provocador de la revista para que la campaña hablara al lector igual que sus páginas.",
          },
        },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-collage-power-plant-spread.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-spread-yellow-mockup.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-spread-blue-mockup.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Collage Experiments", es: "Experimentación de collages" },
          body: {
            en: "These are some of the collages we created to present the magazine's articles.",
            es: "Estos son algunos de los collages que creamos para exponer los artículos de la revista.",
          },
        },
      ] },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-collage-fruit-hills.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-collage-portrait-wireframe.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-collage-sky-windows.jpg" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/halfway-magazine/halfway-magazine-collage-pyramid-sky.jpg" } },
    ],
    projectInfo: {
      en: `<p>Halfway (0.5) celebrates the unfinished. We tend to wait until something is perfect before we show it, and along the way we lose the sketch, the doubt and the mistake. We wanted to give them a place, because half-done things let you enjoy the process.</p>
<p>We carried that idea into every decision. The name and the 0.5 speak of stopping halfway. We chose print because it makes you read without rushing and enjoy the journey, and collage because an image made of fragments looks like an idea under construction.</p>
<p>I handled the collage-based identity, the logo and the communication. I made the collages in Photoshop and designed the logo and the campaign in Illustrator, and we laid out the magazine in InDesign.</p>`,
      es: `<p>Halfway (0,5) elogia lo inacabado. Solemos esperar a que algo esté perfecto para enseñarlo, y por el camino perdemos el boceto, la duda y el error. Quisimos darles un sitio, porque en las cosas a medio hacer puedes disfrutar del proceso.</p>
<p>Llevamos esa idea a cada decisión. El nombre y el 0,5 hablan de quedarse a mitad de camino. Elegimos el papel porque te invita a leer sin prisa y a disfrutar del recorrido, y el collage porque una imagen hecha de fragmentos se ve como una idea en construcción.</p>
<p>Yo me encargué de la identidad de collages, el logotipo y la comunicación. Hice los collages en Photoshop y diseñé el logotipo y la campaña en Illustrator, y maquetamos la revista en InDesign.</p>`,
    },
    credits: {
      en: `<h2>Team</h2>
<p>Julia Conti<br>Emma Agatielo<br>Myriam Romero<br>David Bayón</p>
<h2>Skills</h2>
<p>Visual identity:<br>Collage-based art direction<br>Logo and symbol<br>Social media campaign</p>
<h2>Software</h2>
<p>Photoshop:<br>Collages</p>
<p>Illustrator:<br>Logo and campaign</p>
<p>InDesign:<br>Magazine layout</p>`,
      es: `<h2>Equipo</h2>
<p>Julia Conti<br>Emma Agatielo<br>Myriam Romero<br>David Bayón</p>
<h2>Habilidades</h2>
<p>Identidad visual:<br>Dirección de arte con collage<br>Logotipo y símbolo<br>Campaña para redes sociales</p>
<h2>Software</h2>
<p>Photoshop:<br>Collages</p>
<p>Illustrator:<br>Logotipo y campaña</p>
<p>InDesign:<br>Maquetación de la revista</p>`,
    },
  },

  /* ================= Expositor Sony Music =================
     Renders en PNG a 12500×8334 tal cual los exportó David. */
  "sony-music-display": {
    creditsTitle: false,
    slices: [
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-engraved-logo-detail.png" } },
      { t: "text2", featured: true, cards: [
        { h: CHALLENGE, body: {
          en: "We had to design a stand for Sony Music Publishing, a brand focused on making and distributing music. The display needed to present the DJ's vinyl records in an attractive way and carry the brand's identity.",
          es: "Teníamos que diseñar un stand para Sony Music Publishing, una marca centrada en la creación y la difusión de música. El expositor debía presentar los vinilos del DJ de forma atractiva y transmitir la identidad de la marca.",
        } },
        { h: SOLUTION, body: {
          en: "We treated the stand as an extension of that identity. We gave the sides and dividers a wavy profile, like a sound wave, so the piece conveys movement, experimentation and sonic presence. We designed it as flat panels that slot into each other and engraved the logo on the top. The DJ's records sit in the gaps between the waves.",
          es: "Planteamos el expositor como una extensión de esa identidad. Dimos a los laterales y a las divisiones un perfil ondulado, como una onda de sonido, para que el mueble transmita movimiento, experimentación y presencia sonora. Lo resolvimos con piezas planas que encajan por ranuras y grabamos el logo en la tapa. Los vinilos del DJ van en los huecos que dejan las ondas.",
        } },
      ] },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-flat-pieces.png" } },
      { t: "media", ratio: "3 / 2", media: { type: "image", src: "work/sony-music-display/sony-music-display-technical-drawing.jpg" } },
      { t: "text2", cards: [
        {
          h: { en: "Doppler Effect", es: "Efecto Doppler" },
          body: {
            en: "We based the stand on the Doppler effect, as a visual metaphor for sound in motion. We used geometry that suggests compression and expansion: a sound wave compresses as its source moves toward you and expands as it moves away. We wanted a dynamic piece that would reinforce the energy of the music and keep the DJ's records at the center.",
            es: "Basamos el expositor en el efecto Doppler como metáfora visual del sonido en movimiento. Usamos geometrías que sugieren compresión y expansión: una onda sonora se comprime cuando la fuente se acerca a ti y se expande cuando se aleja. Queríamos una pieza dinámica que reforzara la energía de la música y dejara los vinilos del DJ en el centro.",
          },
        },
      ] },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-exploded-views.png" } },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-3d-render-dj-booth.png" } },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-3d-render-showroom.png" } },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-wood-model.png" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/sony-music-display/sony-music-display-front-view.jpg" } },
      { t: "media", ratio: "3 / 4", layout: "split", media: { type: "image", src: "work/sony-music-display/sony-music-display-side-profile.jpg" } },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-curves-closeup.png" } },
      { t: "media", ratio: "12500 / 8334", media: { type: "image", src: "work/sony-music-display/sony-music-display-top-detail.png" } },
    ],
    projectInfo: {
      en: `<p>Sony Music Publishing is a brand focused on making and distributing music. We designed a stand to present the DJ's vinyl records and treated it as an extension of the brand's innovative identity: a piece that conveys movement, experimentation and sonic presence.</p>
<p>We started from the Doppler effect. The curves of the sides and dividers tighten and open up like a sound wave moving toward you and away from you, and the records sit in the gaps between them. We engraved the logo on the top. In the renders we show the stand in the blue of the logo, with the records inside and the DJ behind it.</p>
<p>We built a half-scale model and laser-cut the pieces in MDF so they all slot into each other. We drew the technical plans in Illustrator and modeled and rendered the stand in Cinema 4D.</p>`,
      es: `<p>Sony Music Publishing es una marca centrada en la creación y la difusión de música. Diseñamos un stand para presentar los vinilos del DJ y lo planteamos como una extensión de la identidad innovadora de la marca: un soporte que transmite movimiento, experimentación y presencia sonora.</p>
<p>Partimos del efecto Doppler. Las curvas de los laterales y de las divisiones se cierran y se abren como una onda sonora que se acerca a ti y se aleja, y los vinilos van en los huecos que quedan entre ellas. Grabamos el logo en la tapa. En los renders presentamos el mueble en el azul del logo, con los vinilos dentro y el DJ detrás.</p>
<p>Construimos una maqueta a la mitad de la escala real y cortamos las piezas en DM con láser para que todas encajaran entre sí. Dibujamos los planos técnicos en Illustrator y modelamos y renderizamos el stand en Cinema 4D.</p>`,
    },
    credits: {
      en: `<h2>Team</h2>
<p>Alfonso Rodríguez<br>Valeria Cabrera<br>David Bayón</p>
<h2>Skills</h2>
<p>Product design:<br>Concept and structural design of the stand</p>
<p>Prototyping:<br>Half-scale model in laser-cut MDF</p>
<p>3D:<br>Modeling and rendering</p>
<p>Technical drawing:<br>Plans and dimensions</p>
<h2>Software</h2>
<p>Illustrator:<br>Technical plans</p>
<p>Cinema 4D:<br>Modeling and rendering</p>`,
      es: `<h2>Equipo</h2>
<p>Alfonso Rodríguez<br>Valeria Cabrera<br>David Bayón</p>
<h2>Habilidades</h2>
<p>Diseño de producto:<br>Concepto y diseño estructural del stand</p>
<p>Prototipado:<br>Maqueta a escala 1:2 en DM cortado con láser</p>
<p>3D:<br>Modelado y render</p>
<p>Dibujo técnico:<br>Planos y cotas</p>
<h2>Software</h2>
<p>Illustrator:<br>Planos técnicos</p>
<p>Cinema 4D:<br>Modelado y render</p>`,
    },
  },
};
