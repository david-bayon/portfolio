/* ============================================================
   Copias ligeras de las imágenes para mostrarlas en la página
   ============================================================
   Las genera scripts/web-images.py en assets/web/, con la ruta y el nombre del
   original. La página usa la copia; el visor (lightbox) abre siempre el original,
   igual que los navegadores sin AVIF y las imágenes que no tengan copia. */
const COPIES = import.meta.glob("../web/**/*.avif", { eager: true, query: "?url", import: "default" });

/* imágenes del archivo: Vite les pone otra URL, aquí se guarda su ruta real */
export const webPaths = new Map();

let avif = false;
const PROBE = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAAFAAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAAgAAAAIAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAAHG1kYXQSAAoFGAA2BCAyCRsAGmmmhAAApA==";

/* hay que saberlo antes de pintar. onload y no img.decode(): decode() puede quedarse
   esperando con la pestaña en 2º plano; si tarda, se sigue con los originales */
export const avifReady = new Promise((done) => {
  const probe = new Image();
  probe.onload = () => { avif = probe.width > 0; done(); };
  probe.onerror = done;
  probe.src = PROBE;
  setTimeout(done, 300);
});

export const web = (src) => {
  if (!avif || !src) return src;
  const path = webPaths.get(src) || src;
  return COPIES[`../web/${path.replace(/\.\w+$/, ".avif")}`] || src;
};
