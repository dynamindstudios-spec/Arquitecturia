import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, ArrowRight, Video, MessageCircle, Copy, ExternalLink, Sparkles, Building, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storageService } from '../services/storageService';
import { generateGoogleCalendarUrl, dispatchAppointmentWebhook } from '../services/webhookService';
import { useTranslation } from '../hooks/useTranslation';

export const AppointmentModal = ({ initialProject = '', onClose }) => {
  const { t, language } = useTranslation();
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState(initialProject || 'Residencial Campestre de Lujo');
  const [lotLocation, setLotLocation] = useState('Armenia / Eje Cafetero');
  const [estimatedArea, setEstimatedArea] = useState('350 m²');
  const [investmentTier, setInvestmentTier] = useState('$800M - $1.500M COP');
  const [hasLot, setHasLot] = useState('yes'); // 'yes' | 'process' | 'looking'
  const [lotTopography, setLotTopography] = useState('plano'); // 'plano' | 'suave' | 'ladera'
  const [hasWaterBuffer, setHasWaterBuffer] = useState('no'); // 'no' | 'yes' | 'unknown'
  const [modality, setModality] = useState(language === 'EN' ? 'Virtual Meeting via Google Meet' : language === 'FR' ? 'Réunion Virtuelle via Google Meet' : 'Reunión Virtual vía Google Meet');
  // Dynamic default date: 2 business days from today
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(getDefaultDate());
  const [time, setTime] = useState('10:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [createdAppointment, setCreatedAppointment] = useState(null);
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [botConfirmed, setBotConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const projectTypes = [
    { 
      id: 'Residencial Campestre de Lujo', 
      label: language === 'EN' ? 'Country Residence' : language === 'FR' ? 'Résidence de Campagne' : 'Residencial Campestre', 
      desc: language === 'EN' ? 'High-end custom single-family architectural design' : language === 'FR' ? 'Villa d’architecte sur mesure de haut standing' : 'Vivienda unifamiliar de alta gama y diseño a medida' 
    },
    { 
      id: 'Edificación Comercial & Negocios', 
      label: language === 'EN' ? 'Commercial & Corporate' : language === 'FR' ? 'Commercial & Espaces Pro' : 'Comercial & Negocios', 
      desc: language === 'EN' ? 'Retail, corporate offices, restaurants, and business hubs' : language === 'FR' ? 'Boutiques, bureaux d’entreprise et restaurants' : 'Locales, oficinas, centros corporativos y restaurantes' 
    },
    { 
      id: 'Complejo Turístico & Cabañas Boutique', 
      label: language === 'EN' ? 'Hospitality & Eco-Resort' : language === 'FR' ? 'Complexe Touristique & Suites' : 'Complejo Turístico', 
      desc: language === 'EN' ? 'Glampings, boutique suites, and luxury hospitality' : language === 'FR' ? 'Glamping, suites et hébergements hôteliers d’auteur' : 'Glampings, suites y alojamientos hoteleros de autor' 
    },
    { 
      id: 'Remodelación & Ampliación Estructural', 
      label: language === 'EN' ? 'Luxury Renovation' : language === 'FR' ? 'Rénovation Haut de Gamme' : 'Remodelación de Alta Gama', 
      desc: language === 'EN' ? 'Spatial transformation and seismic NSR-10 retrofitting' : language === 'FR' ? 'Transformation spatiale et renfort structural parasismique' : 'Transformación y refuerzo estructural NSR-10' 
    }
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
      setErrorMsg('Por favor completa tu nombre, teléfono WhatsApp y correo electrónico.');
      return;
    }

    const appointmentData = {
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      projectType,
      referenceProject: initialProject || '',
      hasLot,
      lotTopography,
      hasWaterBuffer,
      lotLocation: lotLocation.trim(),
      estimatedArea: estimatedArea.trim(),
      investmentTier,
      modality,
      date,
      time,
      notes: notes.trim(),
      status: 'Pendiente'
    };

    const saved = storageService.addAppointment(appointmentData);
    setCreatedAppointment(saved);
    setStep(4); // Success & WhatsApp Bot Screen

    // Dispatch webhook for WhatsApp Cloud API & Google Meet synchronization
    if (saved) {
      dispatchAppointmentWebhook(saved).catch(err => console.warn('[Webhook error]:', err));
    }

    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#b8ded8', '#d3ece7', '#ffffff', '#d4af37']
      });
    } catch (err) {}
  };

  const handleCopyMeet = () => {
    if (createdAppointment?.meetUrl) {
      navigator.clipboard.writeText(createdAppointment.meetUrl);
      setCopiedMeet(true);
      setTimeout(() => setCopiedMeet(false), 2500);
    }
  };

  const handleSimulateBotConfirm = () => {
    if (createdAppointment?.id) {
      storageService.updateAppointmentStatus(createdAppointment.id, 'Confirmada');
      setBotConfirmed(true);
    }
  };

  // WhatsApp numbers formatting with international Colombian prefix fallback
  const rawPhone = (createdAppointment?.clientPhone || '').replace(/\D/g, '');
  const cleanClientPhone = rawPhone.length === 10 && rawPhone.startsWith('3') ? `57${rawPhone}` : rawPhone;

  const whatsappDirectMsg = language === 'EN'
    ? `Hello ${createdAppointment?.clientName}, your Project Analysis Appointment with ArquitecturIA Architecture Atelier has been scheduled for ${createdAppointment?.date} at ${createdAppointment?.time}.\n\nGoogle Meet link: ${createdAppointment?.meetUrl}\n\nReply YES to confirm your attendance.`
    : language === 'FR'
    ? `Bonjour ${createdAppointment?.clientName}, votre Rendez-vous d’Étude de Projet avec ArquitecturIA Atelier d Architecture a été programmé pour le ${createdAppointment?.date} à ${createdAppointment?.time}.\n\nLien Google Meet : ${createdAppointment?.meetUrl}\n\nRépondez OUI pour confirmer votre présence.`
    : `Hola ${createdAppointment?.clientName}, tu Cita para Análisis de Proyecto con ArquitecturIA Atelier ha sido agendada para el ${createdAppointment?.date} a las ${createdAppointment?.time}.\n\nEnlace de Google Meet: ${createdAppointment?.meetUrl}\n\nResponde SI para confirmar tu asistencia.`;

  const whatsappStudioMsg = language === 'EN'
    ? `Hello ArquitecturIA Architecture Atelier, I have registered Appointment ${createdAppointment?.id} for ${createdAppointment?.clientName} on ${createdAppointment?.date} at ${createdAppointment?.time}. Google Meet link: ${createdAppointment?.meetUrl}`
    : language === 'FR'
    ? `Bonjour ArquitecturIA Atelier d Architecture, je viens d’enregistrer le Rendez-vous ${createdAppointment?.id} pour ${createdAppointment?.clientName} le ${createdAppointment?.date} à ${createdAppointment?.time}. Lien Google Meet : ${createdAppointment?.meetUrl}`
    : `Hola ArquitecturIA Atelier, acabo de registrar la Cita ${createdAppointment?.id} a nombre de ${createdAppointment?.clientName} para el ${createdAppointment?.date} a las ${createdAppointment?.time}. Enlace de Google Meet: ${createdAppointment?.meetUrl}`;

  const whatsappDirectUrl = createdAppointment
    ? `https://wa.me/${cleanClientPhone}?text=${encodeURIComponent(whatsappDirectMsg)}`
    : '#';

  const whatsappStudioUrl = createdAppointment
    ? `https://wa.me/573008902400?text=${encodeURIComponent(whatsappStudioMsg)}`
    : '#';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-2xl bg-brand-deep border border-brand-mint/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-lg p-6 sm:p-10 text-white overflow-hidden"
      >
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-brand-mint uppercase block font-semibold">
              DIAGNÓSTICO ARQUITECTÓNICO & FACTIBILIDAD
            </span>
            <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white mt-0.5">
              {t('contact.title')}
            </h3>
            <p className="text-xs font-mono text-white/50 mt-1">
              {t('contact.subtitle')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors rounded-md"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reference Project Banner if triggered from a specific work */}
        {initialProject && step < 4 && (
          <div className="mb-6 p-3 bg-brand-surface border border-brand-mint/30 rounded-md flex items-center justify-between text-xs font-mono">
            <span className="text-white/60">
              {language === 'EN' ? 'Reference commission or inspiration:' : language === 'FR' ? 'Œuvre de référence ou inspiration :' : 'Obra de referencia o inspiración:'}
            </span>
            <span className="text-brand-mint font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {initialProject}
            </span>
          </div>
        )}

        {/* Step Indicator (Centered, Compact & Harmonious) */}
        {step < 4 && (
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 mb-8 pb-3 border-b border-white/10 text-xs font-mono">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              step === 1 ? 'bg-brand-mint/15 text-brand-mint border border-brand-mint/30 font-semibold' : step > 1 ? 'text-brand-mint/80' : 'text-white/40'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-brand-mint text-brand-deep font-bold' : 'bg-white/10 text-white/50'}`}>1</span>
              <span>{language === 'EN' ? 'Project' : language === 'FR' ? 'Projet' : 'Proyecto'}</span>
            </div>

            <span className="text-white/20 font-bold">→</span>

            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              step === 2 ? 'bg-brand-mint/15 text-brand-mint border border-brand-mint/30 font-semibold' : step > 2 ? 'text-brand-mint/80' : 'text-white/40'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-brand-mint text-brand-deep font-bold' : 'bg-white/10 text-white/50'}`}>2</span>
              <span>{language === 'EN' ? 'Schedule & Meet' : language === 'FR' ? 'Date & Visio' : 'Fecha & Meet'}</span>
            </div>

            <span className="text-white/20 font-bold">→</span>

            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              step === 3 ? 'bg-brand-mint/15 text-brand-mint border border-brand-mint/30 font-semibold' : 'text-white/40'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-brand-mint text-brand-deep font-bold' : 'bg-white/10 text-white/50'}`}>3</span>
              <span>{language === 'EN' ? 'Contact' : language === 'FR' ? 'Coordonnées' : 'Datos'}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="p-3 mb-6 bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono rounded-md">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Project Type & Location */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-3">
                {language === 'EN' ? '1. PROJECT TYPOLOGY:' : language === 'FR' ? '1. TYPOLOGIE DU PROJET :' : '1. TIPO DE PROYECTO A INICIAR:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-3.5 text-left border rounded-md transition-all ${
                      projectType === type.id
                        ? 'border-brand-mint bg-brand-surface shadow-[0_0_15px_rgba(184,222,216,0.25)]'
                        : 'border-white/10 hover:border-white/30 bg-brand-surface/40'
                    }`}
                  >
                    <div className="font-architectural text-xs font-bold text-white mb-1">
                      {type.label}
                    </div>
                    <div className="text-[11px] font-mono text-white/50 leading-relaxed">
                      {type.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">
                  {language === 'EN' ? 'Land / Lot Location:' : language === 'FR' ? 'Localisation du Terrain :' : 'Ubicación del Lote o Terreno:'}
                </label>
                <div className="flex items-center gap-2 bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md">
                  <MapPin className="w-4 h-4 text-brand-mint" />
                  <input
                    type="text"
                    value={lotLocation}
                    onChange={(e) => setLotLocation(e.target.value)}
                    placeholder={language === 'EN' ? 'E.g., Armenia, Circasia, Pereira...' : language === 'FR' ? 'Ex : Armenia, Circasia, Pereira...' : 'Ej: Armenia, Circasia, Pereira...'}
                    className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">
                  {language === 'EN' ? 'Estimated Built Area:' : language === 'FR' ? 'Surface Construite Estimée :' : 'Área Aproximada a Construir:'}
                </label>
                <div className="flex items-center gap-2 bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md">
                  <Layers className="w-4 h-4 text-brand-mint" />
                  <input
                    type="text"
                    value={estimatedArea}
                    onChange={(e) => setEstimatedArea(e.target.value)}
                    placeholder="Ej: 350 m²"
                    className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>

            {/* Terrain Pre-Qualifier & Topography Section */}
            <div className="p-4 bg-brand-surface/70 border border-brand-mint/20 rounded-md space-y-4">
              <div>
                <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-2">
                  {language === 'EN' ? 'PRE-QUALIFICATION: DO YOU CURRENTLY OWN A LOT?' : language === 'FR' ? 'PRÉ-QUALIFICATION : POSSÉDEZ-VOUS DÉJÀ UN TERRAIN ?' : 'PRE-CALIFICACIÓN: ¿CUENTAS YA CON LOTE PROPIO?'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasLot('yes')}
                    className={`py-2 px-3 text-xs font-mono rounded-[3px] border transition-all text-center cursor-pointer ${
                      hasLot === 'yes'
                        ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-sm'
                        : 'bg-brand-deep/80 text-white/70 border-white/10 hover:border-brand-mint/40'
                    }`}
                  >
                    {language === 'EN' ? '✓ Yes, I own land' : language === 'FR' ? '✓ Oui, terrain acquis' : '✓ Sí, cuento con lote'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasLot('process')}
                    className={`py-2 px-3 text-xs font-mono rounded-[3px] border transition-all text-center cursor-pointer ${
                      hasLot === 'process'
                        ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-sm'
                        : 'bg-brand-deep/80 text-white/70 border-white/10 hover:border-brand-mint/40'
                    }`}
                  >
                    {language === 'EN' ? '⏳ Purchasing in progress' : language === 'FR' ? '⏳ En cours d’achat' : '⏳ En proceso de compra'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasLot('looking')}
                    className={`py-2 px-3 text-xs font-mono rounded-[3px] border transition-all text-center cursor-pointer ${
                      hasLot === 'looking'
                        ? 'bg-brand-mint text-brand-deep font-bold border-brand-mint shadow-sm'
                        : 'bg-brand-deep/80 text-white/70 border-white/10 hover:border-brand-mint/40'
                    }`}
                  >
                    {language === 'EN' ? '🔍 Seeking ArquitecturIA scouting' : language === 'FR' ? '🔍 Recherche accompagnement' : '🔍 Busco lote con asesoría'}
                  </button>
                </div>
              </div>

              {/* Conditional Topography Selector if user has land or is buying */}
              {(hasLot === 'yes' || hasLot === 'process') && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <label className="block text-[11px] font-mono tracking-wider text-white/80">
                    {language === 'EN' ? 'Relief & Topography (For Preliminary Structural NSR-10 Brief):' : language === 'FR' ? 'Relief & Topographie (Pour note préliminaire NSR-10) :' : 'Relieve y Topografía (Para pre-análisis estructural NSR-10):'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setLotTopography('plano')}
                      className={`p-2.5 text-left rounded-[3px] border transition-all cursor-pointer ${
                        lotTopography === 'plano'
                          ? 'border-brand-mint bg-brand-deep text-white font-bold'
                          : 'border-white/10 bg-brand-deep/50 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-architectural text-brand-mint">Plano (0 - 5%)</span>
                      <span className="text-[10px] font-mono text-white/50 block mt-0.5">Mínimo movimiento de tierras</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLotTopography('suave')}
                      className={`p-2.5 text-left rounded-[3px] border transition-all cursor-pointer ${
                        lotTopography === 'suave'
                          ? 'border-brand-mint bg-brand-deep text-white font-bold'
                          : 'border-white/10 bg-brand-deep/50 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-architectural text-brand-mint">Ladera Suave (5 - 20%)</span>
                      <span className="text-[10px] font-mono text-white/50 block mt-0.5">Terrazas y visuales panorámicas</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLotTopography('ladera')}
                      className={`p-2.5 text-left rounded-[3px] border transition-all cursor-pointer ${
                        lotTopography === 'ladera'
                          ? 'border-brand-mint bg-brand-deep text-white font-bold'
                          : 'border-white/10 bg-brand-deep/50 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-architectural text-brand-mint">Ladera / Escarpe (&gt; 20%)</span>
                      <span className="text-[10px] font-mono text-white/50 block mt-0.5">Estructura palafítica o voladizo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light font-architectural text-xs font-bold tracking-wider rounded-md shadow-lg transition-colors cursor-pointer"
              >
                <span>{language === 'EN' ? 'CONTINUE TO SCHEDULE' : language === 'FR' ? 'CONTINUER VERS LES HORAIRES' : 'CONTINUAR A HORARIOS'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Date, Time & Meet Modality */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-3">
                {language === 'EN' ? '2. MEETING MODALITY:' : language === 'FR' ? '2. MODALITÉ DU RENDEZ-VOUS :' : '2. MODALIDAD DE LA CITA:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModality('Reunión Virtual vía Google Meet')}
                  className={`p-4 border rounded-md text-left transition-all cursor-pointer ${
                    modality.includes('Meet')
                      ? 'border-brand-mint bg-brand-surface shadow-[0_0_15px_rgba(184,222,216,0.25)]'
                      : 'border-white/10 bg-brand-surface/40 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2 text-brand-mint font-architectural text-xs font-bold mb-1">
                    <Video className="w-4 h-4" />
                    <span>{language === 'EN' ? 'VIRTUAL GOOGLE MEET' : language === 'FR' ? 'GOOGLE MEET VIRTUEL' : 'GOOGLE MEET VIRTUAL'}</span>
                  </div>
                  <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                    {language === 'EN'
                      ? 'Interactive video conference with link automatically generated upon booking.'
                      : language === 'FR'
                      ? 'Visioconférence interactive avec lien généré automatiquement dès confirmation.'
                      : 'Videoconferencia interactiva con enlace generado automáticamente al registrar la cita.'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('Presencial en Atelier ArquitecturIA (Armenia)')}
                  className={`p-4 border rounded-md text-left transition-all cursor-pointer ${
                    modality.includes('Presencial')
                      ? 'border-brand-mint bg-brand-surface shadow-[0_0_15px_rgba(184,222,216,0.25)]'
                      : 'border-white/10 bg-brand-surface/40 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2 text-brand-mint font-architectural text-xs font-bold mb-1">
                    <Building className="w-4 h-4" />
                    <span>{language === 'EN' ? 'CENTRAL STUDIO (ARMENIA)' : language === 'FR' ? 'STUDIO CENTRAL (ARMENIA)' : 'ESTUDIO CENTRAL (ARMENIA)'}</span>
                  </div>
                  <p className="text-[11px] font-mono text-white/50 leading-relaxed">
                    {language === 'EN'
                      ? 'In-person meeting at our design desk with architectural principals and material samples.'
                      : language === 'FR'
                      ? 'Accueil personnalisé à l’atelier avec les architectes associés et matériauthèque.'
                      : 'Atención en mesa de diseño con los directores de arquitectura y muestras físicas de materiales.'}
                  </p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">
                  {language === 'EN' ? 'Preferred Date:' : language === 'FR' ? 'Date Souhaitée :' : 'Fecha Preferida:'}
                </label>
                  <div className="flex items-center gap-2 bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md focus-within:border-brand-mint">
                    <Calendar className="w-4 h-4 text-brand-mint" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 1);
                        setDate(d.toISOString().split('T')[0]);
                      }}
                      className="px-2 py-1 text-[10px] font-mono border border-white/10 hover:border-brand-mint/40 bg-brand-surface/60 text-white/70 hover:text-white rounded transition-colors cursor-pointer"
                    >
                      {language === 'EN' ? 'Tomorrow' : language === 'FR' ? 'Demain' : 'Mañana'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        setDate(d.toISOString().split('T')[0]);
                      }}
                      className="px-2 py-1 text-[10px] font-mono border border-white/10 hover:border-brand-mint/40 bg-brand-surface/60 text-white/70 hover:text-white rounded transition-colors cursor-pointer"
                    >
                      {language === 'EN' ? '+3 Days' : language === 'FR' ? '+3 Jours' : 'En 3 Días'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 7);
                        setDate(d.toISOString().split('T')[0]);
                      }}
                      className="px-2 py-1 text-[10px] font-mono border border-white/10 hover:border-brand-mint/40 bg-brand-surface/60 text-white/70 hover:text-white rounded transition-colors cursor-pointer"
                    >
                      {language === 'EN' ? 'Next Week' : language === 'FR' ? 'Sem. Proch.' : 'Próx. Semana'}
                    </button>
                  </div>
                </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5">
                  {language === 'EN' ? 'Session Time:' : language === 'FR' ? 'Heure de la Session :' : 'Hora de la Sesión:'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2 text-[11px] font-mono rounded-md border transition-all cursor-pointer ${
                        time === slot
                          ? 'border-brand-mint bg-brand-mint text-brand-deep font-bold'
                          : 'border-white/10 hover:border-white/30 text-white/70 bg-brand-surface/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white cursor-pointer"
              >
                {language === 'EN' ? '← Back' : language === 'FR' ? '← Retour' : '← Volver'}
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light font-architectural text-xs font-bold tracking-wider rounded-md shadow-lg transition-colors cursor-pointer"
              >
                <span>{language === 'EN' ? 'CONTINUE TO CONTACT' : language === 'FR' ? 'CONTINUER VERS COORDONNÉES' : 'CONTINUAR A TUS DATOS'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Client Details Form */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-white/70 mb-1">
                  {language === 'EN' ? 'Full Name:' : language === 'FR' ? 'Nom Complet :' : 'Nombre Completo:'}
                </label>
                <div className="flex items-center gap-2 bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md">
                  <User className="w-4 h-4 text-brand-mint" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={language === 'EN' ? 'E.g., Charles Edwards' : language === 'FR' ? 'Ex : Charles Dupont' : 'Ej: Ing. Carlos Morales'}
                    className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">
                    {language === 'EN' ? 'WhatsApp / Mobile (with country code):' : language === 'FR' ? 'WhatsApp / Téléphone (indicatif pays) :' : 'WhatsApp / Celular (con código de país):'}
                  </label>
                  <div className="flex items-center gap-2 bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md">
                    <Phone className="w-4 h-4 text-brand-mint" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+57 300 123 4567"
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">
                    {language === 'EN' ? 'Email Address:' : language === 'FR' ? 'Adresse E-mail :' : 'Correo Electrónico:'}
                  </label>
                  <div className="flex items-center gap-2 bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md">
                    <Mail className="w-4 h-4 text-brand-mint" />
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="contacto@arquitecturia.co"
                      className="bg-transparent text-xs font-mono text-white focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">
                  {language === 'EN' ? 'Estimated Investment Tier:' : language === 'FR' ? 'Fourchette Budgétaire :' : 'Rango Estimado de Presupuesto:'}
                </label>
                <select
                  value={investmentTier}
                  onChange={(e) => setInvestmentTier(e.target.value)}
                  className="w-full bg-brand-surface border border-white/15 px-3 py-2.5 rounded-md text-xs font-mono text-white focus:outline-none cursor-pointer"
                >
                  <option value="$500M - $1.000M COP">
                    {language === 'EN' ? '$500M - $1,000M COP (~$125K - $250K USD)' : language === 'FR' ? '500M - 1 000M COP (~125k€ - 250k€)' : '$500M - $1.000M COP (Obra Inicial)'}
                  </option>
                  <option value="$1.000M - $2.500M COP">
                    {language === 'EN' ? '$1,000M - $2,500M COP (~$250K - $625K USD)' : language === 'FR' ? '1 000M - 2 500M COP (~250k€ - 625k€)' : '$1.000M - $2.500M COP (Residencial de Alta Gama)'}
                  </option>
                  <option value="Más de $2.500M COP">
                    {language === 'EN' ? 'Over $2,500M COP (~$625K+ USD)' : language === 'FR' ? 'Plus de 2 500M COP (+625k€)' : 'Más de $2.500M COP (Proyectos Corporativos / Turísticos)'}
                  </option>
                  <option value="Inversión en USD (Extranjero)">
                    {language === 'EN' ? 'Foreign Investment (USD / International)' : language === 'FR' ? 'Investissement International (USD / Devises)' : 'Inversión en USD (Inversionista Internacional)'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">
                  {language === 'EN' ? 'Initial requirements or notes (Optional):' : language === 'FR' ? 'Détails ou exigences initiales (Optionnel) :' : 'Detalles o requerimientos iniciales (Opcional):'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'EN' ? 'E.g., Sloped country lot, 4 master bedrooms, infinity pool...' : language === 'FR' ? 'Ex : Terrain en pente, 4 chambres, piscine à débordement...' : 'Ej: Lote campestre en pendiente, deseo 4 habitaciones y piscina sin fin...'}
                  className="w-full bg-brand-surface border border-white/15 p-2.5 rounded-md text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white cursor-pointer"
              >
                {language === 'EN' ? '← Back' : language === 'FR' ? '← Retour' : '← Volver'}
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light font-architectural text-xs font-bold tracking-wider rounded-md shadow-[0_0_20px_rgba(184,222,216,0.35)] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === 'EN' ? 'SCHEDULE MEETING & ACTIVATE BOT' : language === 'FR' ? 'PLANIFIER LE RENDEZ-VOUS & ACTIVER LE BOT' : 'PROGRAMAR CITA & ACTIVAR BOT'}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success & WhatsApp Bot Automation Screen */}
        {step === 4 && createdAppointment && (
          <div className="space-y-6 text-left">
            {/* Header Success State */}
            <div className="p-4 bg-brand-surface border border-brand-mint/40 rounded-md flex items-center gap-3 shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-brand-mint shrink-0" />
              <div>
                <h4 className="font-architectural text-xs font-bold text-white tracking-wider">
                  {language === 'EN' ? `COMMISSION SCHEDULED SUCCESSFULLY! (REF: ${createdAppointment.id})` : language === 'FR' ? `RENDEZ-VOUS PLANIFIÉ AVEC SUCCÈS ! (REF: ${createdAppointment.id})` : `¡CITA PROGRAMADA EXITOSAMENTE! (REF: ${createdAppointment.id})`}
                </h4>
                <p className="text-[11px] font-mono text-brand-mint/90 mt-0.5">
                  {createdAppointment.clientName} · {createdAppointment.date} {language === 'EN' ? 'at' : language === 'FR' ? 'à' : 'a las'} {createdAppointment.time}
                </p>
              </div>
            </div>

            {/* Google Meet Generated Link Box */}
            <div className="p-4 bg-brand-deep border border-white/15 rounded-md space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/60 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-brand-mint" />
                  {language === 'EN' ? 'VIRTUAL MEETING ROOM:' : language === 'FR' ? 'SALLE VIRTUELLE :' : 'SALA DE REUNIÓN VIRTUAL:'}
                </span>
                <span className="text-brand-mint font-bold">GOOGLE MEET</span>
              </div>
              
              <div className="flex items-center justify-between gap-2 p-2.5 bg-black/60 border border-white/10 rounded-md font-mono text-xs">
                <span className="text-brand-mint truncate">{createdAppointment.meetUrl}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyMeet}
                    className="p-1.5 hover:bg-white/10 rounded text-white/70 hover:text-white cursor-pointer"
                    title={language === 'EN' ? 'Copy link' : language === 'FR' ? 'Copier le lien' : 'Copiar enlace'}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={createdAppointment.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light rounded flex items-center gap-1 text-[10px] font-bold px-2.5 cursor-pointer"
                  >
                    <span>{language === 'EN' ? 'Join' : language === 'FR' ? 'Rejoindre' : 'Entrar'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              {copiedMeet && (
                <span className="text-[10px] font-mono text-emerald-400 block">
                  {language === 'EN' ? '✓ Link copied to clipboard' : language === 'FR' ? '✓ Lien copié dans le presse-papiers' : '✓ Enlace copiado al portapapeles'}
                </span>
              )}
            </div>

            {/* WhatsApp Bot Simulation Card */}
            <div className="p-4 bg-[#0a1e17] border border-[#25D366]/40 rounded-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-xs font-mono font-bold text-[#25D366] uppercase tracking-wider">
                    {language === 'EN' ? 'ARQUITECTURIA CONCIERGE BOT ACTIVE' : language === 'FR' ? 'BOT WHATSAPP ARQUITECTURIA ACTIF' : 'BOT DE WHATSAPP ARQUITECTURIA ACTIVO'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50">
                  {language === 'EN' ? (botConfirmed ? 'STATUS: CONFIRMED ✓' : 'AWAITING REPLY') : language === 'FR' ? (botConfirmed ? 'STATUT : CONFIRMÉ ✓' : 'EN ATTENTE DE RÉPONSE') : (botConfirmed ? 'ESTADO: CONFIRMADA ✓' : 'ESPERANDO RESPUESTA')}
                </span>
              </div>

              <p className="text-xs font-mono text-white/80 leading-relaxed bg-black/40 p-3 rounded border border-white/5">
                {language === 'EN' ? (
                  <>
                    "Hello <span className="text-brand-mint">{createdAppointment.clientName}</span>, we have received your request for an Architectural Project Analysis with ArquitecturIA Architecture Atelier for <span className="text-brand-mint">{createdAppointment.date}</span> at <span className="text-brand-mint">{createdAppointment.time}</span>.<br />
                    Your Google Meet link is: <span className="text-[#25D366] underline">{createdAppointment.meetUrl}</span>.<br />
                    <span className="text-white/60">Would you like to confirm your session? Reply YES to confirm.</span>"
                  </>
                ) : language === 'FR' ? (
                  <>
                    "Bonjour <span className="text-brand-mint">{createdAppointment.clientName}</span>, nous avons bien reçu votre demande d’Étude de Projet Architectural avec ArquitecturIA Atelier d Architecture pour le <span className="text-brand-mint">{createdAppointment.date}</span> à <span className="text-brand-mint">{createdAppointment.time}</span>.<br />
                    Votre lien Google Meet : <span className="text-[#25D366] underline">{createdAppointment.meetUrl}</span>.<br />
                    <span className="text-white/60">Souhaitez-vous confirmer ? Répondez OUI pour confirmer.</span>"
                  </>
                ) : (
                  <>
                    "Hola <span className="text-brand-mint">{createdAppointment.clientName}</span>, hemos recibido tu solicitud de Cita para Análisis de Proyecto con ArquitecturIA Atelier para el día <span className="text-brand-mint">{createdAppointment.date}</span> a las <span className="text-brand-mint">{createdAppointment.time}</span>.<br />
                    Tu enlace de Google Meet es: <span className="text-[#25D366] underline">{createdAppointment.meetUrl}</span>.<br />
                    <span className="text-white/60">¿Deseas confirmar tu cita? Responde SI para confirmar.</span>"
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-[10px] font-mono text-white/50">
                  {language === 'EN' ? '⏰ Morning reminder scheduled for 7:00 AM on session day.' : language === 'FR' ? '⏰ Rappel matinal programmé à 7h00 le jour du rendez-vous.' : '⏰ Recordatorio matutino programado para las 7:00 AM el día de la cita.'}
                </span>

                <div className="flex gap-2 w-full sm:w-auto">
                  {!botConfirmed ? (
                    <button
                      type="button"
                      onClick={handleSimulateBotConfirm}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-[#25D366] text-black font-mono text-xs font-bold rounded hover:bg-[#20b857] transition-colors cursor-pointer"
                    >
                      {language === 'EN' ? 'Simulate "YES" (Confirm)' : language === 'FR' ? 'Simuler la Réponse "OUI" (Confirmer)' : 'Simular Respuesta "SÍ" (Confirmar)'}
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-[#25D366] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {language === 'EN' ? 'Appointment Confirmed in System' : language === 'FR' ? 'Rendez-vous Confirmé dans le Système' : 'Cita Confirmada en Sistema'}
                    </span>
                  )}

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 border border-[#25D366]/40 hover:bg-[#25D366]/10 text-[#25D366] rounded flex items-center gap-1.5 text-xs font-mono"
                    title={language === 'EN' ? 'Open WhatsApp' : language === 'FR' ? 'Ouvrir WhatsApp' : 'Abrir WhatsApp'}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Clean Action Bar (Google Calendar + Finish) */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-white/10">
              {createdAppointment && (
                <a
                  href={generateGoogleCalendarUrl(createdAppointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 border border-brand-mint/40 hover:bg-brand-mint/10 text-brand-mint text-xs font-architectural tracking-wider flex items-center justify-center gap-2 rounded-md transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-mint" />
                  <span>{language === 'EN' ? 'ADD TO GOOGLE CALENDAR' : language === 'FR' ? 'AJOUTER À GOOGLE AGENDA' : 'AÑADIR A GOOGLE CALENDAR'}</span>
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light text-xs font-architectural tracking-wider font-bold rounded-md transition-colors shadow-md cursor-pointer ml-auto"
              >
                {language === 'EN' ? 'FINISH & CLOSE' : language === 'FR' ? 'TERMINER ET FERMER' : 'FINALIZAR'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
