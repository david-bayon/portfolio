#!/usr/bin/env python3
"""Aligera las imágenes PNG incrustadas en los SVG de las tarjetas del menú.

Las pasa a WebP con el mismo encuadre: en la tarjeta se ven a unos 150 px, así que
900 px de lado sobran incluso en un móvil de pantalla densa. No toca lo vectorial,
la transparencia ni el perfil de color. Sobrescribe el SVG: guarda antes el original
en media-src/<proyecto>/tarjeta-original/.

    python3 scripts/web-cards.py assets/cards/<card>/<card>-card.svg
"""
import base64
import io
import re
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

SIDE = 900
QUALITY = 90
PNG = re.compile(r'data:image/png;base64,([^"\']+)')


def lighter(match):
    raw = base64.b64decode(match.group(1))
    with Image.open(io.BytesIO(raw)) as src:
        icc = src.info.get("icc_profile")
        im = src.convert("RGBA")
    k = SIDE / max(im.size)
    if k < 1:  # premultiplicado: sin halo en los bordes transparentes
        size = (round(im.width * k), round(im.height * k))
        im = im.convert("RGBa").resize(size, Image.LANCZOS).convert("RGBA")
    buffer = io.BytesIO()
    im.save(buffer, "WEBP", quality=QUALITY, method=6, alpha_quality=100, **({"icc_profile": icc} if icc else {}))
    if buffer.tell() >= len(raw) * 0.9:
        return match.group(0)
    return "data:image/webp;base64," + base64.b64encode(buffer.getvalue()).decode()


for path in sys.argv[1:]:
    with open(path, encoding="utf-8") as file:
        svg = file.read()
    light = PNG.sub(lighter, svg)
    with open(path, "w", encoding="utf-8") as file:
        file.write(light)
    print(f"{path}: {len(svg) / 1e3:.0f} → {len(light) / 1e3:.0f} KB")
