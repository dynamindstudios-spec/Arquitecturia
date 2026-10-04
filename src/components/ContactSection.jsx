import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Clock, 
  Compass, 
  MessageSquare, 
  ArrowRight, 
  ExternalLink,
  Navigation,
  Shield,
  Layers,
  Sparkles,
  Building2,
  Trees,
  Landmark,
  Check,
  FileText,
  User,
  AlertCircle,
  X,
  Calendar,
  Video
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRANDING_DATA } from '../data/brandingData';
import { storageService } from '../services/storageService';
import { Reveal } from './Reveal';
import { useTranslation } from '../hooks/useTranslation';

// Carga diferida del generador editorial de 8 páginas
const ExecutiveDossierGenerator = React.lazy(() => import('./ExecutiveDossierGenerator'));

// 1. Opciones de Tenencia del Lote / Terreno (Pregunta Mandatoria)
const getLotOwnershipOptions = (lang) => [
  {
    id: 'propio',
    label: lang === 'EN' ? 'Titled Own Lot' : lang === 'FR' ? 'Terrain avec Titre de Propriété' : 'Lote Propio Escriturado',
    sublabel: lang === 'EN' ? 'I have registered title and clear deed' : lang === 'FR' ? 'Titre de propriété et acte notarié en règle' : 'Cuento con matrícula y título al día',
    icon: '🏡'
  },
  {
    id: 'proceso',
    label: lang === 'EN' ? 'In Acquisition Process' : lang === 'FR' ? 'En Cours d’Acquisition' : 'En Proceso de Compra',
    sublabel: lang === 'EN' ? 'Promissory purchase agreement or closing' : lang === 'FR' ? 'Promesse de vente ou clôture d’acte' : 'Promesa de compraventa o escrituración',
    icon: '📐'
  },
  {
    id: 'busqueda',
    label: lang === 'EN' ? 'Searching for Land' : lang === 'FR' ? 'En Recherche de Terrain' : 'Buscando Terreno',
    sublabel: lang === 'EN' ? 'I need technical guidance to assess land' : lang === 'FR' ? 'Conseil technique requis pour évaluer la parcelle' : 'Requiero asesoría técnica para evaluar predio',
    icon: '🔍'
  },
  {
    id: 'condominio',
    label: lang === 'EN' ? 'Gated Community / Parcel' : lang === 'FR' ? 'Lot en Copropriété / Lotissement' : 'Lote en Condominio / Parcelación',
    sublabel: lang === 'EN' ? 'Private gated development with bylaws' : lang === 'FR' ? 'Domaine fermé avec règlement d’urbanisme' : 'Desarrollo campestre cerrado con reglamento',
    icon: '🏗️'
  }
];

// 2. Municipios y Sectores Estratégicos del Eje Cafetero
const getMunicipalityOptions = (lang) => [
  'Armenia',
  'Circasia',
  'Salento / Filandia',
  'Pereira / Cerritos',
  'Manizales',
  'Montenegro / Quimbaya',
  'La Tebaida',
  'Valle del Cauca',
  lang === 'EN' ? 'Other Region' : lang === 'FR' ? 'Autre Secteur' : 'Otro Sector'
];

// 3. Condición Topográfica del Terreno
const getTopographyOptions = (lang) => [
  { id: 'plano', label: lang === 'EN' ? 'Flat / Gentle' : lang === 'FR' ? 'Plat / Faux-plat' : 'Plano / Semi-plano', sublabel: lang === 'EN' ? '< 10% slope' : lang === 'FR' ? '< 10% de pente' : '< 10% pendiente' },
  { id: 'ondulado', label: lang === 'EN' ? 'Rolling / Moderate' : lang === 'FR' ? 'Ondulé / Modéré' : 'Ondulado / Suave', sublabel: lang === 'EN' ? '10% – 25% slope' : lang === 'FR' ? '10% – 25% de pente' : '10% – 25% pendiente' },
  { id: 'quebrado', label: lang === 'EN' ? 'Steep / Ridge View' : lang === 'FR' ? 'Accidenté / Belvédère' : 'Quebrado / Mirador', sublabel: lang === 'EN' ? '> 25% mountain vista' : lang === 'FR' ? '> 25% vue panoramique' : '> 25% vista a cordillera' },
  { id: 'definir', label: lang === 'EN' ? 'To be surveyed' : lang === 'FR' ? 'À définir' : 'Por definir', sublabel: lang === 'EN' ? 'Under topographical survey' : lang === 'FR' ? 'Étude géométrique en cours' : 'En estudio topográfico' }
];

// 4. Tipologías Arquitectónicas
const getProjectTypes = (lang) => [
  { id: 'campestre', label: lang === 'EN' ? 'Luxury Country Estate' : lang === 'FR' ? 'Résidence de Campagne de Prestige' : 'Residencia Campestre de Lujo', icon: '🏡', desc: lang === 'EN' ? 'Single-family passive bioclimatic residence' : lang === 'FR' ? 'Habitation unifamiliale bioclimatique et passive' : 'Vivienda unifamiliar bioclimática y pasiva' },
  { id: 'turismo', label: lang === 'EN' ? 'Boutique Hotel / Signature Glamping' : lang === 'FR' ? 'Hôtel Boutique / Glamping Signature' : 'Hotel Boutique / Glamping de Autor', icon: '🏨', desc: lang === 'EN' ? 'High-status hospitality and vacation rentals' : lang === 'FR' ? 'Hospitalité et villégiature à haut standing' : 'Hospitality y rentas turísticas de alto estatus' },
  { id: 'comercial', label: lang === 'EN' ? 'Commercial / Healthcare / Mixed-Use' : lang === 'FR' ? 'Édifice Commercial / Santé / Mixte' : 'Edificio Comercial / Salud / Mixto', icon: '🏢', desc: lang === 'EN' ? 'Corporate headquarters, clinics or flagship retail' : lang === 'FR' ? 'Sièges d’entreprise, cabinets médicaux ou commerces' : 'Sedes corporativas, consultorios o retail' },
  { id: 'remodelacion', label: lang === 'EN' ? 'Comprehensive Remodel & NSR-10 Reinforcement' : lang === 'FR' ? 'Rénovation Majeure & Renfort Parasismique' : 'Remodelación Integral & Refuerzo', icon: '📐', desc: lang === 'EN' ? 'Signature intervention under NSR-10 seismic code' : lang === 'FR' ? 'Intervention sous la norme parasismique NSR-10' : 'Intervención de autor bajo norma NSR-10' }
];

// 5. Rangos de Área Construida
const getAreaRanges = (lang) => [
  { id: 'compact', label: '< 350 m²', sublabel: lang === 'EN' ? 'Compact villa' : lang === 'FR' ? 'Villa compacte' : 'Villa compacta' },
  { id: 'signature', label: '350 – 650 m²', sublabel: lang === 'EN' ? 'Signature estate' : lang === 'FR' ? 'Résidence signature' : 'Residencia insignia' },
  { id: 'estate', label: '650 – 1.200 m²', sublabel: lang === 'EN' ? 'Country manor' : lang === 'FR' ? 'Propriété de campagne' : 'Finca campestre' },
  { id: 'master', label: '> 1.200 m²', sublabel: lang === 'EN' ? 'Masterplan / Complex' : lang === 'FR' ? 'Masterplan / Complexe' : 'Masterplan / Complejo' }
];

// 6. Rangos de Inversión Proyectada
const INVESTMENT_TIERS = [
  { id: 'tier1', label: '$800M – $1.500M COP', usd: '~ $200K – $380K USD' },
  { id: 'tier2', label: '$1.500M – $3.000M COP', usd: '~ $380K – $750K USD' },
  { id: 'tier3', label: '$3.000M – $6.000M COP', usd: '~ $750K – $1.5M USD' },
  { id: 'tier4', label: 'Más de $6.000M COP', usd: 'Ultra Lujo / Institucional' }
];

// 7. Horizonte de Tiempo de Inicio
const getTimelineOptions = (lang) => [
  { id: 'inmediato', label: lang === 'EN' ? 'Immediate (< 3 months)' : lang === 'FR' ? 'Immédiat (< 3 mois)' : 'Inmediato (< 3 meses)', icon: '⚡' },
  { id: 'corto', label: lang === 'EN' ? 'Short Term (3 – 6 months)' : lang === 'FR' ? 'Court Terme (3 – 6 mois)' : 'Corto Plazo (3 – 6 meses)', icon: '⏱️' },
  { id: 'mediano', label: lang === 'EN' ? 'Mid Term (6 – 12 months)' : lang === 'FR' ? 'Moyen Terme (6 – 12 mois)' : 'Mediano Plazo (6 – 12 meses)', icon: '📅' },
  { id: 'planeacion', label: lang === 'EN' ? 'Planning (> 1 year)' : lang === 'FR' ? 'Planification (> 1 an)' : 'Planeación (> 1 año)', icon: '🎯' }
];

// 8. Modalidad de Atención Técnica
const getModalityOptions = (lang) => [
  { id: 'presencial', label: lang === 'EN' ? 'In-Person at ArquitecturIA Atelier' : lang === 'FR' ? 'En Présentiel à l’Atelier ArquitecturIA' : 'Presencial en Atelier ArquitecturIA', sublabel: lang === 'EN' ? 'Armenia, Quindío · Headquarters' : lang === 'FR' ? 'Armenia, Quindío · Siège Central' : 'Armenia, Quindío · Sede Central' },
  { id: 'virtual', label: lang === 'EN' ? 'Google Meet Video Conference' : lang === 'FR' ? 'Visioconférence Google Meet' : 'Videollamada Google Meet', sublabel: lang === 'EN' ? 'National or International Clients' : lang === 'FR' ? 'Clients Nationaux ou Internationaux' : 'Nacional o Extranjero' },
  { id: 'whatsapp', label: lang === 'EN' ? 'Direct WhatsApp Consultation' : lang === 'FR' ? 'Échange Direct sur WhatsApp' : 'Contacto Directo por WhatsApp', sublabel: lang === 'EN' ? 'Chat with Technical Direction' : lang === 'FR' ? 'Dialogue avec la Direction Technique' : 'Chat con Dirección Técnica' }
];

export const ContactSection = ({ initialProject = '' }) => {
  const { t, language } = useTranslation();

  // Opciones Dinámicas Reactivas al Idioma
  const lotOwnershipOptions = getLotOwnershipOptions(language);
  const municipalityOptions = getMunicipalityOptions(language);
  const topographyOptions = getTopographyOptions(language);
  const projectTypes = getProjectTypes(language);
  const areaRanges = getAreaRanges(language);
  const timelineOptions = getTimelineOptions(language);
  const modalityOptions = getModalityOptions(language);

  // Estados de Calificación
  const [referenceProject, setReferenceProject] = useState(initialProject);
  const [selectedLotOwnership, setSelectedLotOwnership] = useState('propio');
  const [selectedMunicipality, setSelectedMunicipality] = useState('Armenia');
  const [customSector, setCustomSector] = useState('');
  const [selectedTopography, setSelectedTopography] = useState('ondulado');
  const [selectedType, setSelectedType] = useState('campestre');
  const [selectedArea, setSelectedArea] = useState('350 – 650 m²');
  const [selectedInvestment, setSelectedInvestment] = useState('$1.500M – $3.000M COP');
  const [selectedTimeline, setSelectedTimeline] = useState('Corto Plazo (3 – 6 meses)');
  const [selectedModality, setSelectedModality] = useState('Presencial en Atelier ArquitecturIA');

  // Datos Personales
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Estados de Envío y Feedback
  const [sentData, setSentData] = useState(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const formCardRef = useRef(null);

  // Sincronizar referencia si cambia initialProject
  useEffect(() => {
    if (initialProject) {
      setReferenceProject(initialProject);
    }
  }, [initialProject]);

  const handleMouseMove = (e) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getSelectedLotLabel = () => {
    const found = lotOwnershipOptions.find(o => o.id === selectedLotOwnership);
    return found ? found.label : selectedLotOwnership;
  };

  const getSelectedTypeLabel = () => {
    const found = projectTypes.find(o => o.id === selectedType);
    return found ? found.label : selectedType;
  };

  const getSelectedTopographyLabel = () => {
    const found = topographyOptions.find(o => o.id === selectedTopography);
    return found ? `${found.label} (${found.sublabel})` : selectedTopography;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const radId = `RAD-SIM-${Math.floor(1000 + Math.random() * 9000)}`;
    const lotLabel = getSelectedLotLabel();
    const typeLabel = getSelectedTypeLabel();
    const topoLabel = getSelectedTopographyLabel();
    const locationCombined = `${selectedMunicipality}${customSector ? ` (${customSector})` : ''}`;

    const submissionPayload = {
      radId,
      createdAt: new Date().toISOString(),
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      hasLot: lotLabel,
      lotLocation: locationCombined,
      topography: topoLabel,
      projectType: typeLabel,
      estimatedArea: selectedArea,
      investmentTier: selectedInvestment,
      timeline: selectedTimeline,
      modality: selectedModality,
      referenceProject: referenceProject || null,
      notes: formData.message || 'Sin observaciones adicionales.',
      status: 'Calificado · Pendiente Revisión'
    };

    setTimeout(() => {
      // 1. Guardar en Directorio de Contactos
      storageService.addContact(submissionPayload);

      // 2. Guardar en Directorio de Citas / Obras del Dashboard para seguimiento del Arquitecto
      storageService.addAppointment({
        id: radId,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        projectType: typeLabel,
        lotLocation: `${locationCombined} · ${lotLabel}`,
        hasLot: lotLabel,
        topography: topoLabel,
        estimatedArea: selectedArea,
        investmentTier: selectedInvestment,
        timeline: selectedTimeline,
        modality: selectedModality,
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '10:00 AM',
        notes: `${referenceProject ? `[Ref: ${referenceProject}] ` : ''}${formData.message || ''}`,
        status: 'Pendiente'
      });

      // 3. Disparo de confeti festivo arquitectónico
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#B8DED8', '#FFFFFF', '#D4AF37', '#2A3B37']
        });
      } catch (err) {
        console.log('Confetti triggered');
      }

      setLoading(false);
      setSentData(submissionPayload);
    }, 600);
  };

  // Construir mensaje de WhatsApp pre-formateado para envío directo
  const buildWhatsAppUrl = (data) => {
    if (!data) return BRANDING_DATA.contact.whatsappUrl;
    const cleanPhone = (BRANDING_DATA.contact.phone || '573008902400').replace(/\D/g, '');
    const text = 
`*SOLICITUD DE CALIFICACIÓN ARQUITECTÓNICA · ARQUITECTURIA ATELIER*
━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Radicado:* ${data.radId}
👤 *Titular:* ${data.clientName}
📞 *Teléfono:* ${data.clientPhone}
✉️ *Email:* ${data.clientEmail}
${data.referenceProject ? `✨ *Obra Referencia:* ${data.referenceProject}\n` : ''}
🏡 *Tenencia Terreno:* ${data.hasLot}
📍 *Ubicación Predio:* ${data.lotLocation}
⛰️ *Topografía:* ${data.topography}
🏛️ *Tipología:* ${data.projectType}
📐 *Área Estimada:* ${data.estimatedArea}
💰 *Rango Inversión:* ${data.investmentTier}
⏱️ *Plazo de Inicio:* ${data.timeline}
🤝 *Modalidad:* ${data.modality}
📝 *Notas:* ${data.notes}
━━━━━━━━━━━━━━━━━━━━━━━━━
_Deseo coordinar la evaluación técnica preliminar con la dirección del Atelier._`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section 
      id="contacto" 
      className="relative py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10 overflow-hidden select-none"
    >
      {/* 1. Atmospheric Ambient Lighting & Blueprint Matrix */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(184,222,216,0.08),transparent_75%)]" 
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(184, 222, 216, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(184, 222, 216, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />



      {/* 3. Main Master Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Direct Tactical Channels & Geographic Anchor */}
        <Reveal direction="left" delay={0.1} className="lg:col-span-5 space-y-7">
          <div>
            <span className="text-[11px] font-mono text-brand-mint tracking-[0.25em] uppercase font-bold block mb-2">
              ESTRUCTURACIÓN DE PROYECTOS
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-5xl text-white leading-tight">
              {t('contact.leftTitle')}
            </h2>
            <p className="font-body text-sm text-white/75 mt-3 leading-relaxed font-light">
              {t('contact.leftDesc')}
            </p>
          </div>

          {/* Tactical Contact Cards with Dimensional Depth */}
          <div className="space-y-3.5">
            {/* Channel 1: WhatsApp & Phone */}
            <a
              href={BRANDING_DATA.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 bg-brand-surface/80 hover:bg-brand-surface border border-white/10 hover:border-brand-mint/60 rounded-[4px] transition-all duration-300 shadow-md hover:shadow-[0_10px_25px_rgba(184,222,216,0.12)] cursor-pointer"
            >
              <div className="p-3 bg-brand-deep text-brand-mint group-hover:scale-105 group-hover:bg-brand-mint group-hover:text-brand-deep transition-all duration-300 rounded-[3px] border border-white/10 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase block">
                    {t('contact.phoneLabel')}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-brand-mint transition-colors" />
                </div>
                <span className="text-white font-semibold text-sm sm:text-base font-mono block mt-0.5 group-hover:text-brand-mint transition-colors">
                  {BRANDING_DATA.contact.phoneDisplay}
                </span>
                <span className="text-[11px] text-brand-mint/70 font-mono block mt-1">
                  {language === 'EN' ? 'Direct line & WhatsApp technical advisor' : language === 'FR' ? 'Ligne directe & Concierge WhatsApp' : 'Línea de dirección & Asesoría técnica directa'}
                </span>
              </div>
            </a>

            {/* Channel 2: Official Corporate Email */}
            <a
              href={`mailto:${BRANDING_DATA.contact.email}`}
              className="group flex items-start gap-4 p-5 bg-brand-surface/80 hover:bg-brand-surface border border-white/10 hover:border-brand-mint/60 rounded-[4px] transition-all duration-300 shadow-md hover:shadow-[0_10px_25px_rgba(184,222,216,0.12)] cursor-pointer"
            >
              <div className="p-3 bg-brand-deep text-brand-mint group-hover:scale-105 group-hover:bg-brand-mint group-hover:text-brand-deep transition-all duration-300 rounded-[3px] border border-white/10 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase block">
                    {t('contact.emailLabel')}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-brand-mint transition-colors" />
                </div>
                <span className="text-white font-semibold text-xs sm:text-sm font-mono block mt-0.5 truncate group-hover:text-brand-mint transition-colors">
                  {BRANDING_DATA.contact.email}
                </span>
                <span className="text-[11px] text-white/60 font-mono block mt-1">
                  {language === 'EN' ? 'Technical briefs & RFP submissions' : language === 'FR' ? 'Dossiers techniques et propositions' : 'Recepción técnica de memorias y pliegos'}
                </span>
              </div>
            </a>

            {/* Channel 3: Interactive Cartographic Topography Card */}
            <div className="p-5 bg-brand-surface/90 border border-white/15 rounded-[4px] space-y-4 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-deep text-brand-mint rounded-[3px] border border-white/10">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase block">
                      {language === 'EN' ? 'TOPOGRAPHY & COORDINATES' : language === 'FR' ? 'COORDONNÉES GÉOGRAPHIQUES' : 'COORDENADAS DEL ATELIER'}
                    </span>
                    <span className="font-architectural text-sm font-bold text-white">
                      Armenia, Quindío · Colombia
                    </span>
                  </div>
                </div>

                <a
                  href={BRANDING_DATA.gps.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-deep hover:bg-brand-mint hover:text-brand-deep text-brand-mint text-[10px] font-mono rounded-[2px] border border-brand-mint/30 transition-all cursor-pointer"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Stylized Vector Topographic Preview */}
              <div className="relative h-24 rounded-[3px] overflow-hidden bg-brand-deep border border-white/10 flex items-center justify-between px-4">
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,20 Q100,5 200,30 T400,10" fill="none" stroke="#B8DED8" strokeWidth="1" />
                  <path d="M0,45 Q150,70 300,35 T600,55" fill="none" stroke="#B8DED8" strokeWidth="1" />
                  <path d="M0,75 Q80,95 250,60 T500,80" fill="none" stroke="#B8DED8" strokeWidth="1" />
                </svg>

                <div className="relative z-10 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-brand-mint text-xs font-mono font-bold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>4.5428° N, 75.6692° W</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/60 block">
                    Altitud: 1.480 msnm · Cordillera Central
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-80" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-mint" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Hours & Social Signature */}
          <div className="p-4 bg-brand-deep/80 border border-white/10 rounded-[3px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-white/70">
              <Clock className="w-4 h-4 text-brand-mint" />
              <span>Lun – Vie: 8:00 AM – 6:00 PM</span>
            </div>

            <a
              href={BRANDING_DATA.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-brand-mint hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span>{BRANDING_DATA.contact.instagramHandle}</span>
            </a>
          </div>
        </Reveal>

        {/* Right Column: High-Status Architectural Admissions & Qualification Form */}
        <Reveal direction="right" delay={0.2} className="lg:col-span-7">
          <div 
            ref={formCardRef}
            onMouseMove={handleMouseMove}
            className="relative p-6 sm:p-9 bg-brand-surface/95 backdrop-blur-xl border border-brand-mint/35 rounded-[4px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden group"
          >
            {/* Interactive Cursor Light Spot */}
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-70"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184, 222, 216, 0.08), transparent 80%)`
              }}
            />

            {/* SCREEN: SOLICITUD ENVIADA / RADICADO GENERADO */}
            {sentData ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6 relative z-10"
              >
                <div className="w-16 h-16 bg-brand-mint/20 text-brand-mint border border-brand-mint mx-auto flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(184,222,216,0.35)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-brand-mint bg-brand-deep px-3 py-1 rounded border border-brand-mint/30 inline-block font-bold">
                    {t('contact.successRadicado')} {sentData.radId}
                  </span>
                  <h3 className="font-editorial-heading text-3xl text-white">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-xs text-white/75 font-body max-w-lg mx-auto font-light leading-relaxed">
                    {t('contact.successDesc')}
                  </p>
                </div>

                {/* Resumen Ficha de Calificación */}
                <div className="bg-brand-deep/90 border border-white/10 rounded-[4px] p-5 text-left font-mono text-xs max-w-lg mx-auto space-y-2.5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">{t('contact.summaryTitular')}</span>
                    <span className="text-white font-bold">{sentData.clientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">{t('contact.summaryTenure')}</span>
                    <span className="text-brand-mint font-bold">{sentData.hasLot}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">{t('contact.summaryLoc')}</span>
                    <span className="text-white">{sentData.lotLocation} ({sentData.topography})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">{t('contact.summaryType')}</span>
                    <span className="text-white">{sentData.projectType} · {sentData.estimatedArea}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">{t('contact.summaryBudget')}</span>
                    <span className="text-brand-mint font-bold">{sentData.investmentTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">{t('contact.summaryModality')}</span>
                    <span className="text-white">{sentData.modality}</span>
                  </div>
                </div>

                {/* Acciones Finales: Enlace 1-Clic WhatsApp Directivo & Dossier BIM */}
                <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
                  <a
                    href={buildWhatsAppUrl(sentData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-md hover:bg-brand-mint-light transition-all shadow-[0_0_25px_rgba(184,222,216,0.3)] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('contact.openWaBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsDossierOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-brand-surface hover:bg-white/10 text-brand-mint font-architectural text-xs font-bold tracking-wider rounded-md border border-brand-mint/40 hover:border-brand-mint transition-all shadow-[0_0_15px_rgba(184,222,216,0.15)] cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-brand-mint" />
                    <span>{language === 'EN' ? 'VIEW PRELIMINARY BIM DOSSIER (PDF)' : language === 'FR' ? 'CONSULTER LE DOSSIER BIM (PDF)' : 'DESCARGAR DOSSIER PRELIMINAR BIM (PDF)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSentData(null);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 bg-brand-deep/80 text-white/80 hover:text-white border border-white/10 hover:border-white/30 font-architectural text-xs tracking-wider rounded-md transition-all cursor-pointer"
                  >
                    {t('contact.submitAnotherBtn')}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* FORMULARIO MAESTRO DE CALIFICACIÓN DE PROYECTO */
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Cabecera del Formulario */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-brand-mint uppercase font-bold">
                      {t('contact.qualificationBadge')}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      {t('contact.qualificationStep')}
                    </span>
                  </div>
                  <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white mt-1">
                    {t('contact.qualificationTitle')}
                  </h3>
                  <p className="text-xs text-white/60 font-body mt-1 font-light leading-relaxed">
                    {t('contact.qualificationDesc')}
                  </p>
                </div>

                {/* Badge Si viene de un proyecto de referencia */}
                {referenceProject && (
                  <div className="p-3 bg-brand-mint/10 border border-brand-mint/30 rounded-[3px] flex items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2 text-brand-mint">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>
                        {t('contact.referenceCommission')} <strong className="text-white">{referenceProject}</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReferenceProject('')}
                      className="text-white/40 hover:text-white p-1"
                      title="Quitar referencia"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* ============================================================== */}
                {/* PREGUNTA MANDATORIA 1: TENENCIA DEL LOTE / TERRENO PROPIO */}
                {/* ============================================================== */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-architectural tracking-wider text-brand-mint flex items-center gap-1.5 font-bold">
                      <span>{t('contact.q1Label')}</span>
                    </label>
                    <span className="text-[10px] font-mono text-white/40">{t('contact.requiredBadge')}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {lotOwnershipOptions.map((opt) => {
                      const isSelected = selectedLotOwnership === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedLotOwnership(opt.id)}
                          className={`p-3 text-left rounded-[3px] border transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-[0_0_15px_rgba(184,222,216,0.3)]'
                              : 'bg-brand-deep/80 text-white/75 border-white/10 hover:border-brand-mint/50 hover:text-white'
                          }`}
                        >
                          <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                          <div className="min-w-0">
                            <span className="font-architectural text-xs block leading-snug">
                              {opt.label}
                            </span>
                            <span className={`text-[10px] font-mono block mt-0.5 ${isSelected ? 'text-brand-deep/80' : 'text-white/45'}`}>
                              {opt.sublabel}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ============================================================== */}
                {/* PREGUNTA 2: UBICACIÓN DEL PREDIO & TOPOGRAFÍA */}
                {/* ============================================================== */}
                <div className="space-y-3 pt-1 border-t border-white/10">
                  <label className="text-xs font-architectural tracking-wider text-brand-mint flex items-center gap-1.5 font-bold">
                    <span>{t('contact.q2Label')}</span>
                  </label>

                  {/* Selector rápido de Municipios del Eje Cafetero */}
                  <div className="flex flex-wrap gap-1.5">
                    {municipalityOptions.map((mun) => {
                      const isSelected = selectedMunicipality === mun;
                      return (
                        <button
                          key={mun}
                          type="button"
                          onClick={() => setSelectedMunicipality(mun)}
                          className={`px-2.5 py-1.5 rounded-[3px] border font-mono text-[11px] transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-brand-mint/25 border-brand-mint text-brand-mint font-bold shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                              : 'bg-brand-deep/60 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {mun}
                        </button>
                      );
                    })}
                  </div>

                  {/* Input libre de Sector / Condominio / Vereda */}
                  <input
                    type="text"
                    value={customSector}
                    onChange={(e) => setCustomSector(e.target.value)}
                    placeholder={t('contact.sectorPlaceholder')}
                    className="w-full bg-brand-deep/90 border border-white/15 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint/40 px-3.5 py-2.5 text-xs text-white placeholder-white/35 font-mono rounded-[3px] transition-all outline-none"
                  />

                  {/* Topografía Selector */}
                  <div className="pt-1">
                    <span className="block text-[11px] font-mono text-white/50 mb-1.5">
                      {t('contact.topographyLabel')}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {topographyOptions.map((topo) => {
                        const isSelected = selectedTopography === topo.id;
                        return (
                          <button
                            key={topo.id}
                            type="button"
                            onClick={() => setSelectedTopography(topo.id)}
                            className={`p-2 text-center rounded-[3px] border font-mono text-[11px] cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                                : 'bg-brand-deep/60 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            <span className="block font-semibold">{topo.label}</span>
                            <span className={`text-[9px] block ${isSelected ? 'text-brand-deep/80' : 'text-white/40'}`}>
                              {topo.sublabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* PREGUNTA 3: TIPOLOGÍA & PROGRAMA DE ÁREAS */}
                {/* ============================================================== */}
                <div className="space-y-2.5 pt-1 border-t border-white/10">
                  <label className="text-xs font-architectural tracking-wider text-brand-mint flex items-center gap-1.5 font-bold">
                    <span>{t('contact.q3Label')}</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectTypes.map((pt) => {
                      const isSelected = selectedType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setSelectedType(pt.id)}
                          className={`p-2.5 text-left rounded-[3px] border transition-all text-xs cursor-pointer flex items-center gap-2.5 ${
                            isSelected
                              ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-[0_0_15px_rgba(184,222,216,0.25)]'
                              : 'bg-brand-deep/80 text-white/70 border-white/10 hover:border-brand-mint/40 hover:text-white'
                          }`}
                        >
                          <span className="text-lg">{pt.icon}</span>
                          <div className="min-w-0">
                            <span className="font-architectural text-[11px] block leading-tight">
                              {pt.label}
                            </span>
                            <span className={`text-[9px] font-mono block truncate ${isSelected ? 'text-brand-deep/80' : 'text-white/40'}`}>
                              {pt.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selector de Rango de Área */}
                  <div className="pt-1.5">
                    <span className="block text-[11px] font-mono text-white/50 mb-1.5">
                      {t('contact.areaCoveredLabel')}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {areaRanges.map((ar) => {
                        const isSelected = selectedArea === ar.label;
                        return (
                          <button
                            key={ar.id}
                            type="button"
                            onClick={() => setSelectedArea(ar.label)}
                            className={`py-2 px-2 text-center rounded-[3px] border font-mono text-[11px] cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-mint/20 border-brand-mint text-brand-mint font-bold shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                                : 'bg-brand-deep/60 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            <span className="block">{ar.label}</span>
                            <span className="text-[9px] text-white/40 block">{ar.sublabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* PREGUNTA 4: RANGO DE INVERSIÓN & HORIZONTE DE TIEMPO */}
                {/* ============================================================== */}
                <div className="space-y-2.5 pt-1 border-t border-white/10">
                  <label className="text-xs font-architectural tracking-wider text-brand-mint flex items-center gap-1.5 font-bold">
                    <span>{t('contact.q4Label')}</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INVESTMENT_TIERS.map((tier) => {
                      const isSelected = selectedInvestment === tier.label;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedInvestment(tier.label)}
                          className={`p-2.5 text-left rounded-[3px] border font-mono text-[11px] cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-mint/20 border-brand-mint text-brand-mint font-bold shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                              : 'bg-brand-deep/60 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span className="block font-semibold">{tier.label}</span>
                          <span className="text-[10px] text-white/40 block">{tier.usd}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Horizonte de Tiempo */}
                  <div className="pt-1.5">
                    <span className="block text-[11px] font-mono text-white/50 mb-1.5">
                      {t('contact.timelineLabel')}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timelineOptions.map((tl) => {
                        const isSelected = selectedTimeline === tl.label;
                        return (
                          <button
                            key={tl.id}
                            type="button"
                            onClick={() => setSelectedTimeline(tl.label)}
                            className={`py-2 px-2 text-center rounded-[3px] border font-mono text-[10px] cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                                : 'bg-brand-deep/60 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            <span className="block text-xs mb-0.5">{tl.icon}</span>
                            <span className="block leading-tight">{tl.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* PREGUNTA 5: MODALIDAD DE ATENCIÓN TÉCNICA */}
                {/* ============================================================== */}
                <div className="space-y-2 pt-1 border-t border-white/10">
                  <label className="text-xs font-architectural tracking-wider text-brand-mint flex items-center gap-1.5 font-bold">
                    <span>{t('contact.q5Label')}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {modalityOptions.map((mod) => {
                      const isSelected = selectedModality === mod.label;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setSelectedModality(mod.label)}
                          className={`p-2.5 text-left rounded-[3px] border font-mono text-[11px] cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                              : 'bg-brand-deep/60 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span className="block font-semibold">{mod.label}</span>
                          <span className={`text-[9px] block ${isSelected ? 'text-brand-deep/80' : 'text-white/40'}`}>
                            {mod.sublabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ============================================================== */}
                {/* DATOS DEL CLIENTE / TITULAR */}
                {/* ============================================================== */}
                <div className="space-y-3.5 pt-2 border-t border-white/10">
                  <span className="text-xs font-architectural tracking-wider text-brand-mint block font-bold">
                    {t('contact.q6Label')}
                  </span>

                  {/* Nombre Completo */}
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">
                      {t('contact.nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('contact.namePlaceholder')}
                      className="w-full bg-brand-deep/90 border border-white/15 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 font-mono rounded-[3px] transition-all outline-none"
                    />
                  </div>

                  {/* Dual Column: Teléfono y Correo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-white/60 mb-1">
                        {t('contact.phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+57 300 000 0000"
                        className="w-full bg-brand-deep/90 border border-white/15 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 font-mono rounded-[3px] transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-white/60 mb-1">
                        {t('contact.emailLabelField')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('contact.emailPlaceholder')}
                        className="w-full bg-brand-deep/90 border border-white/15 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 font-mono rounded-[3px] transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Memorias / Visión del Proyecto */}
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">
                      {t('contact.visionLabel')}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('contact.visionPlaceholder')}
                      className="w-full bg-brand-deep/90 border border-white/15 focus:border-brand-mint focus:ring-1 focus:ring-brand-mint/40 px-3.5 py-2.5 text-xs text-white placeholder-white/30 font-mono resize-none rounded-[3px] transition-all outline-none"
                    />
                  </div>
                </div>

                {/* BOTÓN DE ACCIÓN PRINCIPAL */}
                <div className="space-y-3 pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-all duration-300 font-architectural text-xs tracking-wider font-bold rounded-md shadow-[0_0_25px_rgba(184,222,216,0.3)] disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? t('contact.submittingBtnForm') : t('contact.submitBtnForm')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <a
                      href={BRANDING_DATA.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/50 hover:text-brand-mint transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-brand-mint" />
                      <span>{t('contact.preferDirectWa')}</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* MODAL EJECUTIVO: MEMORIA TÉCNICA & DOSSIER BIM DE 8 PÁGINAS (CARGA DIFERIDA) */}
      <React.Suspense fallback={null}>
        <ExecutiveDossierGenerator
          isOpen={isDossierOpen}
          onClose={() => setIsDossierOpen(false)}
          leadData={sentData}
        />
      </React.Suspense>
    </section>
  );
};
