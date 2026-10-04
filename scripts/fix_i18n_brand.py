with open('src/services/i18nService.js', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    "group: 'GRUPO',\n      constructor: 'CONSTRUCTOR',\n      subtitle: 'GRUPO CONSTRUCTOR'",
    "group: 'ATELIER',\n      constructor: 'COMPUTACIONAL',\n      subtitle: 'ATELIER DE ARQUITECTURA'"
)

c = c.replace(
    "group: 'CONSTRUCTION',\n      constructor: 'GROUP',\n      subtitle: 'CONSTRUCTION GROUP'",
    "group: 'ATELIER',\n      constructor: 'COMPUTATIONAL',\n      subtitle: 'ARCHITECTURE ATELIER'"
)

c = c.replace(
    "group: 'GROUPE',\n      constructor: 'CONSTRUCTEUR',\n      subtitle: 'GROUPE CONSTRUCTEUR'",
    "group: 'ATELIER',\n      constructor: 'COMPUTATIONNEL',\n      subtitle: 'ATELIER D ARCHITECTURE'"
)

with open('src/services/i18nService.js', 'w', encoding='utf-8') as f:
    f.write(c)

print('[OK] Updated brand tokens in i18nService.js')
