import fs from 'fs';

const projects = JSON.parse(fs.readFileSync('public/extracted/simetria/all_projects_manifest.json', 'utf8'));

const dossier = {
  brandName: "Simetría Grupo Constructor",
  tagline: "Arquitectura y Diseño",
  quote: "Crear es la única forma de resistir la fugacidad de nuestra existencia; al crear seguimos habitando el mundo, aunque sea un poco más.",
  about: {
    badge: "01",
    title: "Simetría",
    description: "Estudio de arquitectura, diseño y construcción de alto estatus. Proyectos residenciales de lujo, comerciales de vanguardia y complejos turísticos con una visión contemporánea y atemporal en el Eje Cafetero y Colombia.",
    stats: [
      { number: "50+", label: "Proyectos Realizados" },
      { number: "12", label: "Años de Trayectoria" },
      { number: "8", label: "Premios de Arquitectura" },
      { number: "100%", label: "Materialidad Noble" }
    ],
    teamPhoto: "/extracted/simetria/assets/foto-7-BUhdoSwb.jpg"
  },
  contact: {
    email: "simetria.gc@gmail.com",
    phone: "+57 300 2596855",
    whatsapp: "573002596855",
    city: "Armenia, Quindío, Colombia",
    coordinates: {
      lat: 4.532563,
      lng: -75.671684,
      googleMapsUrl: "https://maps.google.com/?q=4.532563,-75.671684"
    },
    instagram: "https://www.instagram.com/simetria_gc/?hl=es",
    instagramHandle: "@simetria_gc"
  },
  visualIdentity: {
    archetype: "ARCHITECTURAL_MONOLITH",
    morphology: "SHARP_ORTHOGONAL",
    colorPalette: {
      dark: "#424242",
      darkDeep: "#1a1a1a",
      darkBlack: "#0d0d0d",
      mint: "#b8ded8",
      mintLight: "#d3ece7",
      mintHover: "#9ed2ca",
      gray: "#666666",
      grayLight: "#a3a3a3",
      surfaceLight: "#f5f5f5",
      accentBronze: "#c5a880",
      accentGold: "#d4af37"
    },
    typography: {
      display: "Montserrat, serif, sans-serif",
      displayWeight: "900",
      body: "Montserrat, sans-serif",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    },
    logos: {
      mint: "/extracted/simetria/logo-mint.png",
      horizontal: "/extracted/simetria/logo-horizontal.png",
      gray: "/extracted/simetria/logo-gray.png",
      default: "/extracted/simetria/logo.png"
    }
  },
  categories: [
    "Todos",
    "Residencial",
    "Comercial",
    "Turismo"
  ],
  totalProjects: projects.length,
  projects
};

fs.writeFileSync('public/extracted/simetria/branding_dossier.json', JSON.stringify(dossier, null, 2), 'utf8');
console.log('Branding dossier saved successfully!');
