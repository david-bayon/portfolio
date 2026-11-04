# Diseños de las tarjetas del menú

Cada carpeta es una tarjeta del menú lateral. Suelta dentro **un** archivo con el diseño
y sustituye a la tarjeta actual: ocupa la tarjeta entera y, al pasar el ratón, se funde
al gris con el título y la descripción centrados.

- Formatos: jpg, png, webp, avif, gif, svg, mp4, webm, mov (los vídeos van en bucle y sin sonido).
- Tamaño: la tarjeta mide 98 px de alto y entre 368 y 400 px de ancho según la pantalla
  (proporción ~4:1). Exporta a 2× o 3× para pantallas retina.
  El diseño se recorta en modo *cover*, así que deja aire en los bordes.
- Con el ratón sobre el contenido, todas las tarjetas pasan al mismo gris menos la del proyecto
  abierto, que se queda en color. Si el diseño es SVG,
  el logo se queda en un gris algo más oscuro: se quita el primer rectángulo a sangre (el fondo)
  y lo que va encima de otra forma de otro color se recorta como hueco. Si es imagen o vídeo,
  se funde al gris liso.
- Para que algún color del SVG no pase a gris, añádelo en `cardKeep` del proyecto en
  `assets/js/data.js` (p. ej. el D&AD: `cardKeep: ["#ffd100", "#19191f"]`).
- Si hay varios archivos en una carpeta, se usa el primero por orden alfabético.
- Carpeta vacía → la tarjeta se queda gris con el texto centrado.

| Carpeta | Proyecto |
| --- | --- |
| `dandad-new-blood` | D&AD New Blood Awards |
| `yeezy-slide` | Yeezy Slide YS-01 |
| `legacy-virgil-abloh` | Legacy |
| `goodmorning-coffee` | GoodMorning Coffee |
| `vino-claro` | Vino Claro |
| `kaotiko-mural` | Kaotiko |
| `bambata-ss25` | Bambata SS/25 |
| `bambata-aw` | Bambata A/W |
| `bambata-photography` | Bambata Photography project |
| `vogue-backstage` | Vogue Backstage |
| `basse` | BASSE |
| `halfway-magazine` | Halfway Magazine |
| `sony-music-display` | Expositor Sony Music |

La relación carpeta ↔ proyecto está en `assets/js/data.js` (campo `card`).
