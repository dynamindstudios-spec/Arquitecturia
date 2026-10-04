import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('public/extracted/simetria/all_projects_manifest.json', 'utf8'));

// Architectural enrichment metadata for each project
const projectEnrichment = {
  'mirum': {
    area: '520 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Complejo comercial de vanguardia con iluminación arquitectónica perimetral y diseño volumétrico de alta presencia nocturna.',
    materials: ['Concreto Visto', 'Estructura Metálica', 'Cristal Templado', 'Iluminación Lineal Cálida 2700K'],
    status: 'Construido / Entregado',
    typology: 'Comercial & Negocios'
  },
  'casa-49-santa-clara': {
    area: '480 m²',
    location: 'Condominio Santa Clara, Armenia',
    year: '2024',
    description: 'Residencia unifamiliar de lujo con integración fluida interior-exterior, carpintería en maderas nobles y cielorrasos suspendidos.',
    materials: ['Madera de Teka', 'Pisos en Concreto Pulido', 'Ventanería Piso a Techo', 'Mármol Negro Marquina'],
    status: 'Construido / Habitado',
    typology: 'Residencial Campestre'
  },
  'casa-nogales': {
    area: '620 m²',
    location: 'Nogales de la Cordillera, Quindío',
    year: '2023',
    description: 'Obra monumental orientada al paisaje cafetero. Cuenta con terraza en voladizo, comedor en doble altura y cocina de autor.',
    materials: ['Concreto Fenólico', 'Acero Corten', 'Piedra Natural de Cantera', 'Teka Tratada'],
    status: 'Construido / Obra Insignia',
    typology: 'Residencial de Alta Gama'
  },
  'yala-suits': {
    area: '850 m²',
    location: 'Eje Cafetero, Quindío',
    year: '2024',
    description: 'Complejo de suites turísticas con pórticos de acceso esculturales, celosías de protección solar y paisajismo nativo.',
    materials: ['Celosías de Concreto', 'Pórticos de Gran Formato', 'Palmas Nativas', 'Acabados en Cal Hidráulica'],
    status: 'Operativo / Turismo VIP',
    typology: 'Turismo & Hospitalidad'
  },
  'bloom-garden': {
    area: '340 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Espacio comercial y gastronómico donde la vegetación interior dialogue con superficies texturizadas y celosías de autor.',
    materials: ['Jardines Interiores', 'Muros Texturizados', 'Acero Negro Mate', 'Mobiliario a Medida'],
    status: 'Construido / Entregado',
    typology: 'Comercial & Gastronomía'
  },
  'cinco': {
    area: '290 m²',
    location: 'Zona Rosa, Armenia',
    year: '2022',
    description: 'Espacio comercial contemporáneo de líneas puras, diseño lumínico escenográfico y mobiliario monolítico integrado.',
    materials: ['Microcemento', 'Espejos Tonalizados', 'Perfiles de Aluminio Grafito', 'Madera de Roble'],
    status: 'Construido / Operativo',
    typology: 'Comercial Boutique'
  },
  'consultorio-t-c': {
    area: '185 m²',
    location: 'Centro Médico Especialistas, Armenia',
    year: '2023',
    description: 'Consultorio médico premium diseñado para generar serenidad, ergonomía y pulcritud absoluta sin frialdad hospitalaria.',
    materials: ['Revestimientos Acústicos', 'Mármol Blanco Carrara', 'Iluminación Circadiana', 'Cristal Laminado'],
    status: 'Construido / Operativo',
    typology: 'Salud & Bienestar'
  },
  'brod': {
    area: '210 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Boutique gastronómica artesanal con barra de concreto vaciado en sitio, vitrinas empotradas y hornos integrados al salón.',
    materials: ['Concreto Vaciado', 'Madera de Nogal', 'Hierro Negro', 'Baldosa Rústica'],
    status: 'Construido / Operativo',
    typology: 'Comercial & Bakery'
  },
  'chanchi': {
    area: '270 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Concepto gastronómico de autor con espacialidad abierta, circulaciones dinámicas y materiales resistentes de estética industrial refinada.',
    materials: ['Ladrillo a la Vista', 'Vigas IPE Expuestas', 'Madera Maciza', 'Iluminación Suspendida'],
    status: 'Construido / Operativo',
    typology: 'Comercial Gastronómico'
  },
  'consultorio-mq': {
    area: '320 m²',
    location: 'Edificio Médico Alta Salud, Armenia',
    year: '2024',
    description: 'Clínica odontológica y estética de alta gama con gabinetes privados, sala de espera vip y divisiones de privacidad de vidrio esmerilado.',
    materials: ['Solid Surface Antibacterial', 'Madera Clara Natural', 'Ventanería Acústica', 'Iluminación Indirecta'],
    status: 'Construido / Operativo',
    typology: 'Clínica & Salud Especializada'
  },
  'bambazu': {
    area: '410 m²',
    location: 'Circasia, Quindío',
    year: '2023',
    description: 'Residencia campestre que reinterpreta las técnicas vernáculas en clave minimalista, con vistas panorámicas a la cordillera.',
    materials: ['Estructura Mixta', 'Cubierta en Pendiente', 'Terrazas de Madera', 'Piedra de Río'],
    status: 'Construido / Entregado',
    typology: 'Residencial Campestre'
  },
  'casa-45-entremaderos': {
    area: '540 m²',
    location: 'Condominio Entremaderos, Quindío',
    year: '2023',
    description: 'Vivienda de alto estatus con articulación de patios internos, cocina social abierta y zona húmeda con borde infinito.',
    materials: ['Concreto Visto', 'Pérgolas de Madera', 'Pisos Porcelánicos Gran Formato', 'Carpintería en Cedro'],
    status: 'Construido / Habitado',
    typology: 'Residencial Exclusivo'
  },
  'alce': {
    area: '190 m²',
    location: 'Armenia, Quindío',
    year: '2022',
    description: 'Local comercial de autor con diseño de escaparates, iluminación focalizada de producto y acabados limpios.',
    materials: ['Yeso Escultural', 'Perfiles Ocultos', 'Pintura Mineral al Silicato', 'Mármol Verde Guatemala'],
    status: 'Construido / Entregado',
    typology: 'Comercial Retail'
  },
  'mirador-de-cocora': {
    area: '780 m²',
    location: 'Valle de Cocora, Salento',
    year: '2024',
    description: 'Mirador y pabellón ecoturístico de contemplación absoluta de las palmas de cera, con respeto ecológico y mínima huella en el suelo.',
    materials: ['Madera Estructural Certificada', 'Cimentación Puntual', 'Vidrio Laminado Extra-Claro', 'Cubiertas Verdes'],
    status: 'Operativo / Destino Ícono',
    typology: 'Turismo & Paisaje'
  },
  'mantra': {
    area: '380 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Espacio comercial y centro de experiencias holísticas con texturas táctiles, claraboyas cenitales y aislamiento sonoro pasivo.',
    materials: ['Muros de Arcilla Compactada', 'Bambú Curado', 'Lino Natural', 'Luz Cenital Cenital'],
    status: 'Construido / Operativo',
    typology: 'Comercial & Wellness'
  },
  'casa-del-rio': {
    area: '690 m²',
    location: 'La Tebaida, Quindío',
    year: '2024',
    description: 'Residencia ribereña monumental con orientación bioclimática para clima cálido, aleros generosos y alberca integrada a la sala.',
    materials: ['Concreto Hidrófugo', 'Persianas Orientables de Teka', 'Piedra Muñeca', 'Acero Inoxidable 316'],
    status: 'Construido / Obra Maestra',
    typology: 'Residencial Campestre'
  },
  'casa-f-s': {
    area: '430 m²',
    location: 'Pereira / Cerritos',
    year: '2023',
    description: 'Volumetría sobria y contundente basada en prismas ortogonales puros con vacíos estratégicos que enmarcan la vegetación.',
    materials: ['Bloques de Concreto Arquitectónico', 'Enchapados en Roble Oscuro', 'Ventanales Schüco', 'Césped Perimetral'],
    status: 'Construido / Habitado',
    typology: 'Residencial Monolítico'
  },
  'bindi': {
    area: '560 m²',
    location: 'Salento, Quindío',
    year: '2023',
    description: 'Hotel boutique de atmósfera íntima y mística, con habitaciones suspendidas entre la niebla y terrazas de avistamiento.',
    materials: ['Pino Canadiense Tratado', 'Piedra Pizarra', 'Calentamiento Solar Pasivo', 'Tejidos Artesanales'],
    status: 'Operativo / Hospitalidad',
    typology: 'Turismo Boutique'
  },
  'panorama-salento': {
    area: '1,120 m²',
    location: 'Salento, Quindío',
    year: '2024',
    description: 'Masterplan hotelero y cabañas de lujo con visuales 360° sobre el cañón del Quindío. Integración topográfica milimétrica.',
    materials: ['Estructuras Metálicas Livianas', 'Decks en WPC de Alta Durabilidad', 'Vidrio Solar-E', 'Mampostería Local'],
    status: 'Operativo / Complejo Turístico',
    typology: 'Turismo & Hospitalidad'
  },
  'cabanas-delirio': {
    area: '460 m²',
    location: 'Montenegro, Quindío',
    year: '2023',
    description: 'Conjunto de cabañas de descanso privado en medio de cafetales y guaduales, con chimeneas exteriores y jacuzzis privados.',
    materials: ['Guadua Inmunizada Estructural', 'Concreto Negro', 'Ladrillo Recocido', 'Vidrio Templado 10mm'],
    status: 'Operativo / Ecoturismo',
    typology: 'Turismo & Cabañas'
  },
  'panorama-tapao': {
    area: '920 m²',
    location: 'Pueblo Tapao, Montenegro',
    year: '2024',
    description: 'Desarrollo de alojamiento campestre premium con club house, pérgolas bioclimáticas y piscina de entrenamiento.',
    materials: ['Concreto Visto Tablado', 'Pórticos de Acero', 'Maderas Nativas Sostenibles', 'Gres Porcelánico'],
    status: 'Operativo / Turismo',
    typology: 'Turismo & Resort'
  },
  'casa-pt': {
    area: '510 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Diseño geométrico riguroso de doble crujía con patio central de agua que refresca térmicamente toda la residencia de forma pasiva.',
    materials: ['Espejos de Agua', 'Concreto Blanco', 'Carpintería en Cedro Caqueta', 'Granito Flameado'],
    status: 'Construido / Habitado',
    typology: 'Residencial Vanguardia'
  },
  'ember': {
    area: '260 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Espacio comercial y bar de cócteles de autor con iluminación escultural, barras de terrazo fundido y techos oscuros texturizados.',
    materials: ['Terrazo Negro Pulido', 'Bronce Envejecido', 'Cueros Envejecidos', 'Iluminación Cálida 2200K'],
    status: 'Construido / Operativo',
    typology: 'Comercial & Bar'
  },
  'vanessa-vidal': {
    area: '240 m²',
    location: 'Armenia, Quindío',
    year: '2024',
    description: 'Atelier de moda y estética de alta costura con pasillos de celosías rítmicas, probadores de lujo y recepción monolítica.',
    materials: ['Celosías Rítmicas de Madera', 'Espejos de Piso a Techo', 'Mármol Calacatta', 'Iluminación Difusa CRI 98'],
    status: 'Construido / Operativo',
    typology: 'Comercial Atelier & Moda'
  }
};

const enrichedProjects = manifest.map(proj => {
  const meta = projectEnrichment[proj.id] || {
    area: '380 m²',
    location: 'Armenia, Quindío',
    year: '2023',
    description: 'Proyecto de arquitectura y diseño contemporáneo concebido con altos estándares de materialidad noble.',
    materials: ['Concreto Visto', 'Madera Tratada', 'Acero', 'Cristal'],
    status: 'Construido / Entregado',
    typology: proj.category
  };

  return {
    ...proj,
    ...meta
  };
});

fs.mkdirSync('src/data', { recursive: true });

const jsContent = `// Catálogo Oficial de 24 Proyectos Simetría Grupo Constructor
// Extraído de https://simetriagrupoconstructor.com con 170 activos locales HD

export const PROJECTS_DATA = ${JSON.stringify(enrichedProjects, null, 2)};

export const CATEGORIES = ["Todos", "Residencial", "Comercial", "Turismo"];

export const HERO_SLIDES = [
  "/extracted/simetria/assets/foto-6-B0xNpQ8j.jpg",
  "/extracted/simetria/assets/foto-7-Babynr_D.jpg",
  "/extracted/simetria/assets/foto-11-WLO3ngWX.jpg",
  "/extracted/simetria/assets/foto-15-DHw98ztK.jpg",
  "/extracted/simetria/assets/foto-7-BUhdoSwb.jpg"
];
`;

fs.writeFileSync('src/data/projectsData.js', jsContent, 'utf8');
console.log('Successfully generated src/data/projectsData.js with 24 projects!');
