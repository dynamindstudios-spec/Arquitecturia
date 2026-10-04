// Servicio de Generación de Dossier Técnico BIM & Memoria de Viabilidad
// ArquitecturIA Atelier · Cuaderno de Obra de 8 Páginas Editorial

import { BRANDING_DATA } from '../data/brandingData';

export const dossierPdfService = {
  // Construir el dossier completo a partir de los datos de un radicado o proyecto
  buildDossierPayload: (leadData = {}) => {
    const radId = leadData.radId || leadData.id || `RAD-SIM-${Math.floor(1000 + Math.random() * 9000)}`;
    const clientName = leadData.clientName || 'Inversionista Patrimonial';
    const lotLocation = leadData.lotLocation || 'Armenia, Quindío';
    const topography = leadData.topography || 'Ondulado / Suave (10% – 25% pendiente)';
    const projectType = leadData.projectType || 'Residencia Campestre de Lujo';
    const estimatedArea = leadData.estimatedArea || '450 m²';
    const investmentTier = leadData.investmentTier || '$1.500M – $3.000M COP';
    const timeline = leadData.timeline || 'Corto Plazo (3 – 6 meses)';
    const dateStr = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

    // Cálculo paramétrico de áreas
    const totalAreaNum = parseInt(estimatedArea.replace(/\D/g, '')) || 450;
    const socialArea = Math.round(totalAreaNum * 0.38);
    const privateArea = Math.round(totalAreaNum * 0.34);
    const terracesArea = Math.round(totalAreaNum * 0.18);
    const servicesArea = Math.round(totalAreaNum * 0.10);

    return {
      metadata: {
        radId,
        dateStr,
        clientName,
        clientPhone: leadData.clientPhone || '+57 300 000 0000',
        clientEmail: leadData.clientEmail || 'inversionista@patrimonio.com',
        gps: BRANDING_DATA.gps.coordinates,
        altitude: BRANDING_DATA.gps.altitude,
        department: BRANDING_DATA.gps.region
      },
      page1_cover: {
        title: 'ESTUDIO PRELIMINAR DE VIABILIDAD ARQUITECTÓNICA & NSR-10',
        subtitle: 'Memoria Descriptiva, Estructuración Bioclimática y Análisis Geotécnico de Implantación',
        atelier: 'ARQUITECTURIA ATELIER · TALLER DE ARQUITECTURA',
        radId,
        clientName,
        year: '2026'
      },
      page2_territory: {
        title: '01. CARACTERIZACIÓN TERRITORIAL & GEOTECNIA',
        lotLocation,
        topography,
        soilType: 'Cenizas Volcánicas Andisoles sobre Formación Armenia',
        bearingCapacity: 'qa = 1.2 – 1.6 kg/cm² a 1.80 m de profundidad',
        seismicZone: 'Zona de Amenaza Sísmica Alta (Aa = 0.25, Av = 0.25)',
        hydrogeology: 'Presencia de freático profundo con requerimiento de geodrenes perimetrales continuos.'
      },
      page3_program: {
        title: '02. PROGRAMA ARQUITECTÓNICO & BALANCE DE ÁREAS',
        totalArea: `${totalAreaNum} m²`,
        areas: [
          { space: 'Área Social Diáfana (Salón, Comedor, Cocina Abierta)', m2: `${socialArea} m²`, pct: '38%' },
          { space: 'Zona Privada (Master Suite + 3 Habitaciones con Baño)', m2: `${privateArea} m²`, pct: '34%' },
          { space: 'Terrazas Cubiertas, Deck en Teka & Espejo de Agua', m2: `${terracesArea} m²`, pct: '18%' },
          { space: 'Zonas Técnicas, Cuarto de Máquinas & Parqueaderos', m2: `${servicesArea} m²`, pct: '10%' }
        ]
      },
      page4_materials: {
        title: '03. ESPECIFICACIÓN DE MATERIALES NOBLES SIGNATURE',
        items: [
          { name: 'Concreto Visto Fenólico f’c = 28 MPa', desc: 'Encofrado de autor con formaleta fenólica sellada. Textura mate con juntas vivas a 45°.' },
          { name: 'Madera Teka Curada de Bosque Sostenible', desc: 'Tratamiento hidrófugo con aceites naturales para resistir pluviosidad cordillerana.' },
          { name: 'Ventanería Serie Europea con Rotura Térmica', desc: 'Aluminio anodizado negro mate con vidrio laminado acústico 4+4 PVB.' },
          { name: 'Piedra Natural de Cantera Local', desc: 'Muros de acento rústico que anclan la edificación a la ladera del Eje Cafetero.' }
        ]
      },
      page5_timeline: {
        title: '04. CRONOGRAMA DE 6 FASES CONSTRUCTIVAS NSR-10',
        phases: [
          { phase: 'Fase 0: Factibilidad y Título', duration: '3 semanas', desc: 'Estudio de suelos, levantamiento topográfico y consulta de POT.' },
          { phase: 'Fase 1: Diseño Bioclimático', duration: '6 semanas', desc: 'Volumetría, simulación heliodón y anteproyecto 3D.' },
          { phase: 'Fase 2: Licencias & Cálculo NSR-10', duration: '8 semanas', desc: 'Cálculo estructural, planos de curaduría y licenciamiento.' },
          { phase: 'Fase 3: Estructura & Obra Gris', duration: '18 semanas', desc: 'Cimentación, vaciado de pórticos y mampostería confinada.' },
          { phase: 'Fase 4: Acabados de Autor', duration: '12 semanas', desc: 'Carpintería, ventanería, pisos, griferías y domótica.' },
          { phase: 'Fase 5: Entrega Llave en Mano', duration: '3 semanas', desc: 'Comisionamiento de redes, bitácora as-built y acta final.' }
        ]
      },
      page6_finances: {
        title: '05. ESTRUCTURACIÓN FINANCIERA & FLUJO DE INVERSIÓN',
        investmentTier,
        costPerM2: '$3.800.000 – $4.600.000 COP / m²',
        milestones: [
          { concept: 'Separación & Contrato de Diseño (Fases 0 y 1)', pct: '15%' },
          { concept: 'Cálculo Estructural & Licenciamiento (Fase 2)', pct: '15%' },
          { concept: 'Inicio de Obra Gris & Cimentación (Fase 3)', pct: '30%' },
          { concept: 'Avance de Estructura & Cerramientos (Fase 3/4)', pct: '25%' },
          { concept: 'Liquidación Final & Entrega Llave en Mano (Fase 5)', pct: '15%' }
        ]
      },
      page7_implanting: {
        title: '06. ESQUEMA VECTORIAL DE IMPLANTACIÓN SOLAR',
        notes: [
          'Orientación del eje mayor: Este-Oeste para minimizar radiación en fachadas cortas.',
          'Aleros perimetrales de 1.80 m garantizan sombra cenital completa entre las 10:30 y las 14:00.',
          'Vientos dominantes encauzados hacia patio central bioclimático para renovación por tiro térmico.'
        ]
      },
      page8_signoff: {
        title: '07. DIRECTIVA TÉCNICA & PROTOCOLO DE CITA',
        director: 'Arq. Andrés Echeverri · Director General de Diseño',
        structuralEngineer: 'Arq. Mateo Restrepo · Especialista en Estructuras NSR-10',
        siteManager: 'Arq. Santiago Londoño · Director de Construcción',
        contactEmail: BRANDING_DATA.contact.email,
        contactPhone: BRANDING_DATA.contact.phoneFormatted,
        disclaimer: 'Documento técnico emitido para fines de estructuración preliminar de proyecto. Sujeto a levantamiento topográfico definitivo y perforaciones de suelo en sitio.'
      }
    };
  }
};
