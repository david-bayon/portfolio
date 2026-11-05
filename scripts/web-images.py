#!/usr/bin/env python3
"""Copias ligeras en AVIF para mostrar las imágenes en la página.

Lee public/work/ y assets/archive/ y escribe la copia en assets/web/, con la misma
ruta y el mismo nombre. Los originales no se tocan: el visor sigue abriéndolos.
Solo rehace lo que haya cambiado y deja sin copia lo que no salga más ligero, así
que basta con volver a lanzarlo al añadir imágenes:

    python3 scripts/web-images.py

Necesita Pillow 11.3 o posterior (trae AVIF).
"""
import io
import os
from multiprocessing import Pool

from PIL import Image, ImageCms, ImageOps

Image.MAX_IMAGE_PIXELS = None  # las de Sony miden 12500 × 8334

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "web")
SOURCES = {"work": os.path.join(ROOT, "public", "work"), "archive": os.path.join(ROOT, "assets", "archive")}
SKIP_DIRS = {os.path.join("dandad-new-blood", d) for d in ("frames", "interactive")}  # fotogramas: ya van en WebP sin pérdida, más ligero que AVIF
WIDTH = 2060  # 1029 px en pantalla × 2 (retina)
QUALITY = 86  # por debajo se pierde el grano de las fotos
MIN_SAVING = 0.9  # la copia debe pesar menos del 90 % del original


def to_rgb(src):
    """Imagen lista para codificar y el perfil de color que debe acompañarla."""
    icc = src.info.get("icc_profile")
    im = ImageOps.exif_transpose(src)
    if im.mode == "CMYK":  # AVIF no guarda CMYK: pasa a sRGB con su propio perfil
        cmyk = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        im = ImageCms.profileToProfile(
            im, cmyk, ImageCms.createProfile("sRGB"), outputMode="RGB",
            renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC, flags=ImageCms.Flags.BLACKPOINTCOMPENSATION,
        )
        return im, None
    alpha = im.mode in ("RGBA", "LA", "PA") or "transparency" in src.info
    return im.convert("RGBA" if alpha else "RGB"), icc


def shrink(im):
    if im.width <= WIDTH:
        return im
    size = (WIDTH, round(im.height * WIDTH / im.width))
    if im.mode == "RGBA":  # premultiplicado: sin halo en los bordes transparentes
        return im.convert("RGBa").resize(size, Image.LANCZOS).convert("RGBA")
    return im.resize(size, Image.LANCZOS)


def convert(job):
    src_path, out_path = job
    with Image.open(src_path) as src:
        im, icc = to_rgb(src)
        im = shrink(im)
    im.info.pop("exif", None)  # sin datos de cámara; la orientación ya está aplicada
    buffer = io.BytesIO()
    im.save(buffer, "AVIF", quality=QUALITY, speed=5, max_threads=3, **({"icc_profile": icc} if icc else {}))
    original = os.path.getsize(src_path)
    if buffer.tell() >= original * MIN_SAVING:
        if os.path.exists(out_path):
            os.remove(out_path)
        return original, 0, src_path
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as out:
        out.write(buffer.getvalue())
    return original, buffer.tell(), src_path


def jobs():
    for name, base in SOURCES.items():
        for folder, dirs, files in os.walk(base):
            dirs[:] = [d for d in dirs if os.path.relpath(os.path.join(folder, d), base) not in SKIP_DIRS]
            for file in files:
                if not file.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                    continue
                src = os.path.join(folder, file)
                rel = os.path.relpath(src, base)
                out = os.path.join(OUT, name, os.path.splitext(rel)[0] + ".avif")
                if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
                    yield src, out


if __name__ == "__main__":
    todo = list(jobs())
    done = saved = kept = 0
    # de dos en dos: las más grandes ocupan mucha memoria al abrirlas
    with Pool(2, maxtasksperchild=8) as pool:
        for original, copy, path in pool.imap_unordered(convert, todo, chunksize=1):
            done += 1
            if copy:
                saved += original - copy
            else:
                kept += 1
                print("sin copia (no aligera):", os.path.relpath(path, ROOT))
            print(f"\r{done}/{len(todo)}", end="", flush=True)
    print(f"\n{done - kept} copias, {saved / 1e6:.0f} MB menos; {kept} se quedan con el original")
