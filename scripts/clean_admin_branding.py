"""
clean_admin_branding.py
Limpia y actualiza todos los componentes de src/admin a ArquitecturIA
"""
import os

files_to_process = [
    'src/admin/AdminAppointmentDetailModal.jsx',
    'src/admin/AdminDashboard.jsx',
    'src/admin/AdminOverview.jsx',
    'src/admin/AdminSettingsHub.jsx',
    'src/admin/LiveThemeCustomizer.jsx',
    'src/admin/WhatsAppAgentConsole.jsx'
]

replacements = [
    ('simetria-appointments-updated', 'arquitecturia-appointments-updated'),
    ('simetria-atmosphere-change', 'arquitecturia-atmosphere-change'),
    ('/extracted/simetria/assets/vista-nocturna-CC-TyK1y.jpg', '/extracted/arquitecturia/assets/hero-residence-1.jpg'),
    ('o /extracted/simetria/assets/...', 'o /extracted/arquitecturia/assets/...'),
    ('Simetría Grupo Constructor', 'ArquitecturIA Atelier'),
    ('Simetria Grupo Constructor', 'ArquitecturIA Atelier'),
    ('Simetría', 'ArquitecturIA'),
    ('Simetria', 'ArquitecturIA'),
    ("Simetria's", "ArquitecturIA's")
]

for rel_path in files_to_process:
    full_path = os.path.abspath(rel_path)
    if not os.path.exists(full_path):
        print(f"[SKIP] No existe: {rel_path}")
        continue
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False
    for old, new in replacements:
        if old in content:
            content = content.replace(old, new)
            changed = True

    if changed:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[OK] Actualizado: {rel_path}")
    else:
        print(f"[NOOP] Sin cambios en: {rel_path}")

print("Proceso de src/admin completado.")
