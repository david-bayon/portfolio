import { defineConfig } from "vite";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { imageSize } from "image-size";

/* `archivo?size` → [ancho, alto] tal y como se ve (fotos y vídeos mp4/mov),
   o null si no se puede leer. Lo usa assets/js/archive.js para saber la
   proporción de cada imagen antes de que cargue. */
function mediaSize() {
  return {
    name: "media-size",
    enforce: "pre",
    load(id) {
      const [file, query] = id.split("?");
      if (query !== "size") return;
      return `export default ${JSON.stringify(readSize(file))};`;
    },
  };
}

function readSize(file) {
  try {
    const buf = readFileSync(file);
    if (/\.(mp4|mov)$/i.test(file)) return videoSize(buf);
    const { width, height, orientation } = imageSize(buf);
    return orientation >= 5 ? [height, width] : [width, height]; // EXIF: girada 90°
  } catch {
    return null;
  }
}

/* mp4/mov: ancho y alto (16.16) de la primera pista 'tkhd' con imagen; si su
   matriz la gira 90° (vídeo vertical de móvil) se dan la vuelta */
function videoSize(buf) {
  for (let i = buf.indexOf("tkhd"); i >= 4; i = buf.indexOf("tkhd", i + 4)) {
    const v = i + 4; // versión
    if (buf.readUInt32BE(i - 4) !== (buf[v] === 1 ? 104 : 92)) continue; // no es una caja tkhd
    const m = v + 4 + (buf[v] === 1 ? 32 : 20) + 16; // matriz
    const w = buf.readUInt32BE(m + 36) / 65536;
    const h = buf.readUInt32BE(m + 40) / 65536;
    if (w && h) return buf.readInt32BE(m) === 0 ? [h, w] : [w, h];
  }
  return null;
}

export default defineConfig({
  // rutas relativas → funciona abriendo /dist en cualquier carpeta o subdominio
  base: "./",
  plugins: [mediaSize()],
  server: {
    port: 5173,
    open: "/index.html",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        all: resolve(__dirname, "all.html"),
        about: resolve(__dirname, "about.html"),
        project: resolve(__dirname, "project.html"),
      },
    },
  },
});
