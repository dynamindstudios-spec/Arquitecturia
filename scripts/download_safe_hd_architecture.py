"""
download_safe_hd_architecture.py
Descarga y optimiza fotografías de arquitectura contemporánea en alta definición
desde colecciones de uso comercial seguro (Unsplash Architecture Collection).
Guarda los activos localmente en public/extracted/arquitecturia/assets/
"""
import os
import urllib.request
import time
from PIL import Image

TARGET_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "extracted", "arquitecturia", "assets"))
os.makedirs(TARGET_DIR, exist_ok=True)

# Curaduría de 36 imágenes de arquitectura de alta gama (villas, concreto, madera, torres, ecoturismo)
SAFE_IMAGES = {
    # Hero Slides
    "hero-residence-1.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    "hero-residence-2.jpg": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
    "hero-residence-3.jpg": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85",
    "hero-pavilion.jpg": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85",
    "hero-villa-pool.jpg": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=85",
    "hero-cliff-home.jpg": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1920&q=85",
    "hero-concrete-tower.jpg": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85",
    "hero-zen-patio.jpg": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=85",

    # Studio & Atelier (Preloader & Manifesto)
    "studio-architecture-atelier.jpg": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
    "studio-drafting-models.jpg": "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1600&q=85",
    "studio-site-inspection.jpg": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85",
    "studio-parametric-render.jpg": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",

    # Proyectos Comerciales
    "comercial-tower-lumina.jpg": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    "comercial-pavilion-kroma.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    "comercial-hub-zenith.jpg": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
    "comercial-atrium-glass.jpg": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85",
    "comercial-facade-geometric.jpg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    "comercial-concrete-office.jpg": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
    "comercial-night-lighting.jpg": "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1600&q=85",
    "comercial-auditorium.jpg": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85",
    "comercial-retail-plaza.jpg": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85",
    "comercial-corporate-entry.jpg": "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85",
    "comercial-cantilever.jpg": "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1600&q=85",

    # Proyectos Residenciales
    "residencial-villa-aethelgard.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    "residencial-monolito-andino.jpg": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    "residencial-casa-eter.jpg": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    "residencial-casa-nogal.jpg": "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85",
    "residencial-san-rafael.jpg": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    "residencial-altos-cordillera.jpg": "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    "residencial-palma-real.jpg": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",

    # Proyectos Turismo / Ecoturismo
    "turismo-santuario-bioclimatico.jpg": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    "turismo-villas-delirio.jpg": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    "turismo-canopy-suites.jpg": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
    "turismo-cocora-eco-lodge.jpg": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85",
    "turismo-quindio-reserve.jpg": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
    "turismo-cloud-forest-pavilion.jpg": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85",

    # Field Log / Bitácora de Obras
    "tracking-concrete-pour.jpg": "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85",
    "tracking-steel-structure.jpg": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
    "tracking-timber-deck.jpg": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print(f"Descargando {len(SAFE_IMAGES)} activos HD de arquitectura legalmente seguros...")

for filename, url in SAFE_IMAGES.items():
    filepath = os.path.join(TARGET_DIR, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 10000:
        print(f" [SKIP] {filename} ya existe ({os.path.getsize(filepath)} bytes)")
        continue

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=25) as response:
            data = response.read()
            with open(filepath, "wb") as f:
                f.write(data)
        
        # Validar imagen con PIL
        with Image.open(filepath) as img:
            w, h = img.size
            print(f" [OK] {filename} -> {w}x{h} ({os.path.getsize(filepath)} bytes)")
        time.sleep(0.15)
    except Exception as e:
        print(f" [ERROR] Error en {filename}: {e}")

print("Completado.")
