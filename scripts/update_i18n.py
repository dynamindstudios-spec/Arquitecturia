"""
update_i18n.py
Actualiza todas las cadenas de i18nService.js a ArquitecturIA
"""
with open('src/services/i18nService.js', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    ('simetria_lang', 'arquitecturia_lang'),
    ('simetria-language-changed', 'arquitecturia-language-changed'),
    ('Simetría Grupo Constructor · Soporte Multilingüe Nativo Reactivo', 'ArquitecturIA Atelier · Soporte Multilingüe Nativo Reactivo'),
    ("alt: 'Simetría Grupo Constructor'", "alt: 'ArquitecturIA — Atelier de Arquitectura'"),
    ("alt: 'Simetría Construction Group'", "alt: 'ArquitecturIA — Architecture Atelier'"),
    ("alt: 'Simetría Groupe Constructeur'", "alt: 'ArquitecturIA — Atelier d Architecture'"),
    ('NORMA SIMETRÍA', 'ESTÁNDAR ARQUITECTURIA'),
    ('SIMETRÍA CODE', 'ARQUITECTURIA STANDARD'),
    ('NORME SIMETRÍA', 'NORME ARQUITECTURIA'),
    ('Cada proyecto de Simetría nace como una sinapsis', 'Cada obra de ArquitecturIA nace como una sinapsis'),
    ('Every Simetría commission begins as a synapse', 'Every ArquitecturIA commission begins as a synapse'),
    ('Chaque projet de Simetría naît comme une synapse', 'Chaque projet d ArquitecturIA naît comme une synapse'),
    ("specSignature: 'Signature Simetría'", "specSignature: 'Firma ArquitecturIA'"),
    ("specSignature: 'Simetría Signature'", "specSignature: 'ArquitecturIA Signature'"),
    ('dirección técnica de Simetría', 'dirección técnica de ArquitecturIA'),
    ('Simetría technical stewardship', 'ArquitecturIA technical stewardship'),
    ('la direction technique de Simetría', 'la direction technique d ArquitecturIA'),
    ("teamStudio: 'SIMETRÍA GRUPO CONSTRUCTOR'", "teamStudio: 'ARQUITECTURIA ATELIER'"),
    ("teamStudio: 'SIMETRÍA CONSTRUCTION GROUP'", "teamStudio: 'ARQUITECTURIA ATELIER'"),
    ("teamStudio: 'SIMETRÍA GROUPE CONSTRUCTEUR'", "teamStudio: 'ARQUITECTURIA ATELIER'"),
    ("title: 'CONCIERGE SIMETRÍA'", "title: 'CONCIERGE ARQUITECTURIA'"),
    ("title: 'SIMETRÍA CONCIERGE'", "title: 'ARQUITECTURIA CONCIERGE'"),
    ('Bienvenido a Simetría Grupo Constructor.', 'Bienvenido a ArquitecturIA Atelier.'),
    ('Welcome to Simetría Construction Group.', 'Welcome to ArquitecturIA Atelier.'),
    ('Bienvenue chez Simetría Groupe Constructeur.', 'Bienvenue chez ArquitecturIA Atelier.'),
    ("agentBadge: 'AGENTE SIMETRÍA'", "agentBadge: 'CONCIERGE ARQUITECTURIA'"),
    ("agentBadge: 'SIMETRÍA AGENT'", "agentBadge: 'ARQUITECTURIA CONCIERGE'"),
    ("agentBadge: 'AGENT SIMETRÍA'", "agentBadge: 'CONCIERGE ARQUITECTURIA'"),
    ('En Simetría proyectamos obras residenciales', 'En ArquitecturIA proyectamos obras residenciales'),
    ('At Simetría, we design and build premier', 'At ArquitecturIA, we design and build premier'),
    ('Simetría conçoit des projets résidentiels', 'ArquitecturIA conçoit des projets résidentiels'),
    ('© 2026 Simetría Grupo Constructor S.A.S. Todos los derechos reservados.', '© 2026 ArquitecturIA Atelier S.A.S. Todos los derechos reservados.'),
    ('© 2026 Simetría Construction Group S.A.S. All rights reserved.', '© 2026 ArquitecturIA Atelier S.A.S. All rights reserved.'),
    ('© 2026 Simetría Groupe Constructeur S.A.S. Tous droits réservés.', '© 2026 ArquitecturIA Atelier S.A.S. Tous droits réservés.')
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/services/i18nService.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('[OK] i18nService.js updated cleanly')
