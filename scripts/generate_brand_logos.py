"""
generate_brand_logos.py
Genera los activos gráficos PNG de alta resolución con transparencia
para la nueva identidad de ArquitecturIA (Navbar, Emblema, Favicon, etc.)
"""
import os
from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public"))

def draw_monogram(draw, offset_x, offset_y, scale, color=(184, 222, 216, 255), core_color=(245, 245, 245, 255)):
    """
    Dibuja el monograma minimalista de ArquitecturIA:
    Un pórtico monumental en forma de 'A' con dintel cantilever y núcleo vertical 'I'.
    """
    # Escalar coordenadas base de 100x100
    def pt(x, y):
        return (offset_x + x * scale, offset_y + y * scale)
    
    # Pylon izquierdo y derecho (Triángulo exterior con hueco)
    p_top = pt(50, 10)
    p_bl = pt(14, 88)
    p_bl_in = pt(30, 88)
    p_apex_in = pt(50, 44)
    p_br_in = pt(70, 88)
    p_br = pt(86, 88)

    # Polígono Pylon Izquierdo
    draw.polygon([p_top, pt(42, 10), pt(14, 88), pt(28, 88), pt(46, 44), pt(50, 44)], fill=color)
    # Polígono Pylon Derecho
    draw.polygon([p_top, pt(58, 10), pt(86, 88), pt(72, 88), pt(54, 44), pt(50, 44)], fill=color)
    # Apex cap
    draw.polygon([pt(42, 10), pt(58, 10), pt(50, 20)], fill=color)

    # Dintel Cantilever Horizontal
    x1, y1 = pt(20, 56)
    x2, y2 = pt(80, 64)
    draw.rounded_rectangle([x1, y1, x2, y2], radius=int(2 * scale), fill=color)

    # Núcleo vertical 'I' (Fisura de luz arquitectónica)
    ix1, iy1 = pt(47.5, 24)
    ix2, iy2 = pt(52.5, 46)
    draw.rounded_rectangle([ix1, iy1, ix2, iy2], radius=int(1.5 * scale), fill=core_color)

    # Coordenada / Golden ratio dot
    dot_r = 3.2 * scale
    dcx, dcy = pt(50, 75)
    draw.ellipse([dcx - dot_r, dcy - dot_r, dcx + dot_r, dcy + dot_r], fill=core_color)

def generate_navbar_logo():
    """Genera logo horizontal con isotipo + wordmark ArquitecturIA (840x160 a 2x DPR)"""
    w, h = 900, 160
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Dibujar isotipo a la izquierda
    draw_monogram(draw, offset_x=20, offset_y=15, scale=1.3, color=(184, 222, 216, 255), core_color=(245, 245, 245, 255))

    # Línea divisoria arquitectónica
    div_x = 180
    draw.line([(div_x, 35), (div_x, 125)], fill=(184, 222, 216, 90), width=3)

    # Tipografía
    font_large = None
    font_sub = None
    font_paths = [
        "C:/Windows/Fonts/Montserrat-Bold.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf"
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font_large = ImageFont.truetype(fp, 52)
                font_sub = ImageFont.truetype(fp, 18)
                break
            except Exception:
                pass
    
    if font_large is None:
        font_large = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Texto ARQUITECTUR + IA
    text_x = 210
    draw.text((text_x, 38), "ARQUITECTUR", font=font_large, fill=(245, 245, 245, 255))
    
    # Calcular ancho de ARQUITECTUR para posicionar IA
    bbox = draw.textbbox((text_x, 38), "ARQUITECTUR", font=font_large)
    ia_x = bbox[2] + 4
    draw.text((ia_x, 38), "IA", font=font_large, fill=(184, 222, 216, 255))

    # Subtítulo ATELIER COMPUTACIONAL
    draw.text((text_x + 2, 100), "ATELIER DE ARQUITECTURA & DISEÑO", font=font_sub, fill=(184, 222, 216, 210))

    out_path = os.path.join(PUBLIC_DIR, "logo-navbar.png")
    img.save(out_path, "PNG")
    print(f"[OK] Generado: {out_path}")

    # Guardar también como logo sin fondo
    out_sin_fondo = os.path.join(PUBLIC_DIR, "logo sin fondo.png")
    img.save(out_sin_fondo, "PNG")
    print(f"[OK] Generado: {out_sin_fondo}")

def generate_monogram_emblems():
    """Genera el monograma aislado cuadrado de alta definición (600x600)"""
    size = 600
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    draw_monogram(draw, offset_x=50, offset_y=50, scale=5.0, color=(184, 222, 216, 255), core_color=(255, 255, 255, 255))

    out_s = os.path.join(PUBLIC_DIR, "logo-s-sin-fondo.png")
    img.save(out_s, "PNG")
    print(f"[OK] Generado: {out_s}")

    out_3d = os.path.join(PUBLIC_DIR, "logo-3d.png")
    img.save(out_3d, "PNG")
    print(f"[OK] Generado: {out_3d}")

    out_fav = os.path.join(PUBLIC_DIR, "favicon.png")
    fav = img.resize((64, 64), Image.Resampling.LANCZOS)
    fav.save(out_fav, "PNG")
    print(f"[OK] Generado: {out_fav}")

if __name__ == "__main__":
    generate_navbar_logo()
    generate_monogram_emblems()
