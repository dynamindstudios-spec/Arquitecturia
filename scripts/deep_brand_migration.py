"""
deep_brand_migration.py
Barrido integral y quirúrgico de todas las cadenas de texto, eventos,
rutas de imágenes, correos y tokens de Simetría hacia ArquitecturIA
en toda la base de código de src/
"""
import glob, os

REPLACEMENTS = [
    # Cadenas de empresa
    ('Simetría Grupo Constructor', 'ArquitecturIA Atelier'),
    ('Simetria Grupo Constructor', 'ArquitecturIA Atelier'),
    ('Simetría Construction Group', 'ArquitecturIA Architecture Atelier'),
    ('Simetria Construction Group', 'ArquitecturIA Architecture Atelier'),
    ('Simetría Groupe Constructeur', 'ArquitecturIA Atelier d Architecture'),
    ('Simetria Groupe Constructeur', 'ArquitecturIA Atelier d Architecture'),
    ('SIMETRÍA GRUPO CONSTRUCTOR', 'ARQUITECTURIA ATELIER'),
    ('SIMETRIA GRUPO CONSTRUCTOR', 'ARQUITECTURIA ATELIER'),
    ('Estudio Simetría', 'Atelier ArquitecturIA'),
    ('Estudio Simetria', 'Atelier ArquitecturIA'),
    ('Taller de Arquitectura Simetría', 'Atelier ArquitecturIA'),
    ('Taller de Arquitectura Simetria', 'Atelier ArquitecturIA'),
    ('Simetría Atelier', 'ArquitecturIA Atelier'),
    ('Simetria Atelier', 'ArquitecturIA Atelier'),
    ('SIMETRÍA ATELIER', 'ARQUITECTURIA ATELIER'),
    ('SIMETRIA ATELIER', 'ARQUITECTURIA ATELIER'),
    ('Simetría GC', 'ArquitecturIA'),
    ('Simetria GC', 'ArquitecturIA'),
    ('SIMETRÍA GC', 'ARQUITECTURIA'),
    ('SIMETRIA GC', 'ARQUITECTURIA'),
    ('ADN SIMETRÍA', 'ADN ARQUITECTURIA'),
    ('NORMA SIMETRÍA', 'ESTÁNDAR ARQUITECTURIA'),
    ('SIMETRÍA CODE', 'ARQUITECTURIA STANDARD'),
    ('NORME SIMETRÍA', 'NORME ARQUITECTURIA'),
    ('SELLO DIGITAL SIMETRÍA', 'SELLO DIGITAL ARQUITECTURIA'),
    ('AUTORIZACIÓN SIMETRÍA', 'AUTORIZACIÓN ARQUITECTURIA'),
    ('AUTORISATION SIMETRÍA', 'AUTORISATION ARQUITECTURIA'),
    ('SIMETRÍA AUTHORIZATION', 'ARQUITECTURIA AUTHORIZATION'),
    ('Director de Proyecto Simetría', 'Director de Proyecto ArquitecturIA'),
    ('Simetría Project Director', 'ArquitecturIA Project Director'),
    ('Directeur de Projet Simetría', 'Directeur de Projet ArquitecturIA'),
    ('Simetría Voice Core', 'ArquitecturIA Voice Core'),
    ('Concierge Simetría', 'Concierge ArquitecturIA'),
    ('CONCIERGE SIMETRÍA', 'CONCIERGE ARQUITECTURIA'),
    ('AGENTE SIMETRÍA', 'CONCIERGE ARQUITECTURIA'),
    ('Simetría WhatsApp Bot', 'ArquitecturIA Concierge Bot'),
    ('SIMETRÍA WHATSAPP BOT', 'ARQUITECTURIA CONCIERGE BOT'),
    ('Simetría Obra Arquitectónica', 'ArquitecturIA Obra Arquitectónica'),

    # Textos específicos
    ('Simetría Arquitectura', 'ArquitecturIA Atelier'),
    ('Simetria Arquitectura', 'ArquitecturIA Atelier'),
    ('Simetría', 'ArquitecturIA'),
    ('Simetria', 'ArquitecturIA'),
    ('SIMETRÍA', 'ARQUITECTURIA'),
    ('SIMETRIA', 'ARQUITECTURIA'),

    # Correos y dominios
    ('simetria.gc@gmail.com', 'contacto@arquitecturia.co'),
    ('contacto@simetriagc.com', 'contacto@arquitecturia.co'),
    ('contacto@simetriagrupoconstructor.com', 'contacto@arquitecturia.co'),
    ('client@simetria.com', 'contacto@arquitecturia.co'),
    ('www.simetriagc.com', 'www.arquitecturia.co'),
    ('https://instagram.com/simetria.gc', 'https://instagram.com/arquitecturia.studio'),
    ('https://www.instagram.com/simetria_gc/?hl=es', 'https://www.instagram.com/arquitecturia.studio'),
    ('@simetria_gc', '@arquitecturia.studio'),
    ('https://linkedin.com/company/simetria-grupo-constructor', 'https://linkedin.com/company/arquitecturia-atelier'),
    ('573002596855', '573008902400'),
    ('+57 300 259 6855', '+57 300 890 2400'),
    ('+57 300 2596855', '+57 300 890 2400'),

    # Eventos
    ('simetria-appointments-updated', 'arquitecturia-appointments-updated'),
    ('simetria-tracking-updated', 'arquitecturia-tracking-updated'),
    ('simetria-atmosphere-change', 'arquitecturia-atmosphere-change'),
    ('simetria-socials-updated', 'arquitecturia-socials-updated'),
    ('simetria-contacts-updated', 'arquitecturia-contacts-updated'),
    ('simetria-chatbot-updated', 'arquitecturia-chatbot-updated'),
    ('simetria-language-changed', 'arquitecturia-language-changed'),

    # Storage Keys
    ('simetria_project_appointments_v2', 'arquitecturia_project_appointments_v2'),
    ('simetria_custom_projects_v4', 'arquitecturia_custom_projects_v4'),
    ('simetria_tracking_projects_v2', 'arquitecturia_tracking_projects_v2'),
    ('simetria_cms_content_v2', 'arquitecturia_cms_content_v2'),
    ('simetria_social_links_v1', 'arquitecturia_social_links_v1'),
    ('simetria_chatbot_settings_v1', 'arquitecturia_chatbot_settings_v1'),
    ('simetria_public_atmosphere_id', 'arquitecturia_public_atmosphere_id'),
    ('simetria_admin_creds_v1', 'arquitecturia_admin_creds_v1'),
    ('simetria_admin_session_v1', 'arquitecturia_admin_session_v1'),
    ('simetria_theme_tokens_v1', 'arquitecturia_theme_tokens_v1'),
    ('simetria_contacts_submissions_v1', 'arquitecturia_contacts_submissions_v1'),
    ('simetria_custom_atmosphere_colors', 'arquitecturia_custom_atmosphere_colors'),
    ('simetria_atmosphere_id', 'arquitecturia_atmosphere_id'),
    ('simetria_audio_enabled', 'arquitecturia_audio_enabled'),
    ('simetria_audio_volume', 'arquitecturia_audio_volume'),
    ('simetria_lang', 'arquitecturia_lang'),

    # Rutas de imágenes hacia los nuevos activos seguros
    ('/extracted/simetria/assets/exterior-BUZccq5_.jpg', '/extracted/arquitecturia/assets/hero-residence-1.jpg'),
    ('/extracted/simetria/assets/vista-nocturna-CC-TyK1y.jpg', '/extracted/arquitecturia/assets/hero-concrete-tower.jpg'),
    ('/extracted/simetria/assets/detalle-columnas-COk-1YjM.jpg', '/extracted/arquitecturia/assets/tracking-concrete-pour.jpg'),
    ('/extracted/simetria/assets/pasillo-madera-Bnmywne8.jpg', '/extracted/arquitecturia/assets/tracking-timber-deck.jpg'),
    ('/extracted/simetria/assets/detalle-madera-F_4ufQfU.jpg', '/extracted/arquitecturia/assets/tracking-timber-deck.jpg'),
    ('/extracted/simetria/assets/detalle-piedra-Czuj0e1Y.jpg', '/extracted/arquitecturia/assets/turismo-villas-delirio.jpg'),
    ('/extracted/simetria/assets/ventanal-mobiliario-BWVBpBmT.jpg', '/extracted/arquitecturia/assets/comercial-atrium-glass.jpg'),
    ('/extracted/simetria/assets/foto-7-Babynr_D.jpg', '/extracted/arquitecturia/assets/tracking-steel-structure.jpg'),
    ('/extracted/simetria/assets/foto-7-BUhdoSwb.jpg', '/extracted/arquitecturia/assets/studio-architecture-atelier.jpg'),
    ('/extracted/simetria/assets/foto-15-DHw98ztK.jpg', '/extracted/arquitecturia/assets/studio-drafting-models.jpg'),
    ('/extracted/simetria/assets/columna-persona-Dx4wcpjB.jpg', '/extracted/arquitecturia/assets/hero-cliff-home.jpg'),
    ('/extracted/simetria/logo-mint.png', '/logo-navbar.png'),
    ('/extracted/simetria/logo-horizontal.png', '/logo-navbar.png'),
    ('/extracted/simetria/logo-gray.png', '/logo-navbar.png'),
    ('/extracted/simetria/logo.png', '/logo-navbar.png')
]

file_patterns = [
    'src/services/*.js',
    'src/components/*.jsx',
    'src/pages/*.jsx',
    'src/*.jsx',
    'src/*.js'
]

updated_count = 0
for pat in file_patterns:
    for fpath in glob.glob(pat):
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()

            changed = False
            for old, new in REPLACEMENTS:
                if old in content:
                    content = content.replace(old, new)
                    changed = True

            if changed:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"[UPDATED] {fpath}")
                updated_count += 1
        except Exception as e:
            print(f"[ERROR] {fpath}: {e}")

print(f"\n[FINISH] {updated_count} archivos actualizados exitosamente.")
