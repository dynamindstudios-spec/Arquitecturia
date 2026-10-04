import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HardHat, 
  FileText, 
  Camera, 
  Phone, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { Reveal } from '../components/Reveal';
import { useTranslation } from '../hooks/useTranslation';

export const ClientProjectTracker = ({ onReturnHome }) => {
  const { t, language } = useTranslation();
  const [trackingProjects, setTrackingProjects] = useState(() => storageService.getTrackingProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContract, setSelectedContract] = useState(() => storageService.getTrackingProjects()[0] || null);
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [errorSearch, setErrorSearch] = useState('');

  // Escuchar actualizaciones dinámicas de obras desde el DSB
  useEffect(() => {
    const handleUpdate = () => {
      const updated = storageService.getTrackingProjects();
      setTrackingProjects(updated);
      if (selectedContract) {
        const refreshed = updated.find(p => p.contractCode === selectedContract.contractCode);
        if (refreshed) setSelectedContract(refreshed);
      }
    };
    window.addEventListener('arquitecturia-tracking-updated', handleUpdate);
    return () => window.removeEventListener('arquitecturia-tracking-updated', handleUpdate);
  }, [selectedContract]);

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorSearch('');
    const q = searchQuery.trim().toLowerCase().replace(/\s+/g, '');
    if (!q) return;

    const found = trackingProjects.find(
      p => p.contractCode.toLowerCase().replace(/-/g, '').includes(q.replace(/-/g, '')) ||
           p.clientPhone.includes(q) ||
           p.clientName.toLowerCase().includes(q)
    );

    if (found) {
      setSelectedContract(found);
      setSearchQuery('');
    } else {
      setErrorSearch('No se encontró ninguna obra con el contrato o teléfono ingresado. Intenta con los accesos directos demo.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-deep text-white pt-24 pb-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto select-none">
      
      {/* Top Navigation Bar for Tracker Portal */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 px-3 py-1.5 bg-brand-surface hover:bg-white/10 text-white/70 hover:text-brand-mint text-xs font-architectural tracking-wider rounded-md border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>VOLVER AL SITIO COMERCIAL</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-brand-mint uppercase font-semibold">
            PORTAL PRIVADO DE SEGUIMIENTO EN VIVO · ARQUITECTURIA
          </span>
        </div>
      </div>

      {/* Contract Search & Demo Switcher Bar */}
      <div className="p-6 bg-brand-surface/90 border border-brand-mint/30 rounded-[4px] shadow-2xl mb-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-brand-mint uppercase font-bold block mb-1">
              CONSULTA PRIVADA DE CONTRATO
            </span>
            <h2 className="font-editorial-heading text-2xl sm:text-3xl text-white">
              Seguimiento de Obra en Tiempo Real
            </h2>
            <p className="text-xs text-white/60 font-body mt-1">
              Ingresa tu código de contrato de construcción o número telefónico registrado:
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej: SIM-2024-001 o 312..."
                className="w-full bg-brand-deep border border-white/20 focus:border-brand-mint px-4 py-2.5 pl-9 text-xs font-mono text-white placeholder-white/40 rounded-[3px] outline-none"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light font-architectural text-xs font-bold rounded-[3px] transition-colors cursor-pointer"
            >
              CONSULTAR
            </button>
          </form>
        </div>

        {errorSearch && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono rounded-[3px]">
            {errorSearch}
          </div>
        )}

        {/* Quick Demo Contract Switches */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-white/40 uppercase text-[10px] mr-1">Contratos Activos:</span>
          {trackingProjects.map((p) => (
            <button
              key={p.contractCode}
              type="button"
              onClick={() => {
                setSelectedContract(p);
                setErrorSearch('');
              }}
              className={`px-3 py-1.5 rounded-[3px] border transition-all cursor-pointer ${
                selectedContract?.contractCode === p.contractCode
                  ? 'border-brand-mint bg-brand-mint/15 text-brand-mint font-bold shadow-sm'
                  : 'border-white/10 bg-brand-deep/60 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <span>{p.contractCode} · {p.projectTitle} ({p.overallProgress}%)</span>
            </button>
          ))}
        </div>
      </div>

      {selectedContract ? (
        <div className="space-y-12">
          {/* Main Contract Hero Overview */}
          <div className="relative rounded-[4px] bg-brand-surface border border-brand-mint/30 overflow-hidden shadow-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-brand-mint text-brand-deep font-mono text-[10px] font-bold rounded-[2px]">
                    CONTRATO: {selectedContract.contractCode}
                  </span>
                  <span className="px-2.5 py-1 bg-brand-deep border border-brand-mint/30 text-brand-mint font-mono text-[10px] rounded-[2px]">
                    {selectedContract.statusBadge}
                  </span>
                </div>

                <div>
                  <h1 className="font-editorial-heading text-3xl sm:text-5xl text-white">
                    {selectedContract.projectTitle}
                  </h1>
                  <p className="text-xs sm:text-sm text-brand-mint font-mono mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedContract.location}</span>
                  </p>
                </div>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-brand-deep/80 border border-white/5 rounded-[3px]">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">PROPIETARIO</span>
                    <span className="text-xs font-semibold text-white block truncate">{selectedContract.clientName}</span>
                  </div>

                  <div className="p-3 bg-brand-deep/80 border border-white/5 rounded-[3px]">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">ÁREA TOTAL</span>
                    <span className="text-xs font-semibold text-brand-mint block">{selectedContract.area}</span>
                  </div>

                  <div className="p-3 bg-brand-deep/80 border border-white/5 rounded-[3px]">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">FECHA INICIO</span>
                    <span className="text-xs font-semibold text-white block">{selectedContract.startDate}</span>
                  </div>

                  <div className="p-3 bg-brand-deep/80 border border-white/5 rounded-[3px]">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">ENTREGA ESTIMADA</span>
                    <span className="text-xs font-semibold text-brand-mint block">{selectedContract.estimatedDelivery}</span>
                  </div>
                </div>

                {/* Overall Progress Gauge */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-end font-mono">
                    <span className="text-xs uppercase tracking-wider text-white/70">AVANCE FÍSICO GLOBAL CERTIFICADO:</span>
                    <span className="text-2xl font-editorial-heading text-brand-mint font-bold">{selectedContract.overallProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-brand-deep rounded-full overflow-hidden border border-white/10 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedContract.overallProgress}%` }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-brand-mint-dark via-brand-mint to-white rounded-full shadow-[0_0_15px_#b8ded8]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Resident Card & Direct WhatsApp Action */}
              <div className="lg:col-span-5 p-6 bg-brand-deep/90 border border-white/10 rounded-[4px] space-y-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="p-3 bg-brand-surface text-brand-mint rounded-[3px] border border-brand-mint/20">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase block">RESIDENTE TÉCNICO DE OBRA</span>
                    <h3 className="font-architectural text-xs font-bold text-white tracking-wider">
                      {selectedContract.residentArchitect}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-white/70 font-body leading-relaxed font-light">
                  Tu obra cuenta con supervisión técnica permanente y ensayos certificados bajo norma NSR-10. Ante cualquier consulta directa sobre especificaciones o comités, puedes enlazar con el residente.
                </p>

                <a
                  href={`https://wa.me/${selectedContract.residentPhone}?text=Hola%20Ingeniero,%20deseo%20consultar%20el%20estado%20de%20mi%20contrato%20${selectedContract.contractCode}%20(${encodeURIComponent(selectedContract.projectTitle)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-architectural text-xs font-bold tracking-wider rounded-md transition-all shadow-md cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>CONTACTAR AL RESIDENTE VÍA WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 1: Detailed Work Breakdown Structure (Fases de Obra) */}
          <section className="space-y-6">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-brand-mint uppercase tracking-widest font-bold block">
                FASE CONTRACTUAL EN TIEMPO REAL
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                Cronograma & Desglose por Etapas Constructivas
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedContract.phases.map((phase) => (
                <div 
                  key={phase.id}
                  className="p-5 bg-brand-surface border border-white/10 hover:border-brand-mint/40 rounded-[4px] space-y-4 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[2px] ${
                      phase.progress === 100 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                        : phase.progress > 0 
                        ? 'bg-brand-mint/20 text-brand-mint border border-brand-mint/40' 
                        : 'bg-white/5 text-white/40'
                    }`}>
                      {phase.status}
                    </span>
                    <span className="text-xs font-mono text-white/40">{phase.date}</span>
                  </div>

                  <h4 className="font-architectural text-xs font-bold text-white tracking-wider leading-relaxed">
                    {phase.name}
                  </h4>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/50">Avance:</span>
                      <span className="text-brand-mint font-bold">{phase.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-deep rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${phase.progress}%` }}
                        className={`h-full ${phase.progress === 100 ? 'bg-emerald-400' : 'bg-brand-mint'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Chronological Field Log & Real Site Photography */}
          <section className="space-y-6">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-mint uppercase tracking-widest font-bold block">
                  REGISTRO FOTOGRÁFICO DE RESIDENCIA
                </span>
                <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                  Bitácora Cronológica de Obra
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">
                {selectedContract.fieldLog.length} Reportes Técnicos
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedContract.fieldLog.map((log) => (
                <div 
                  key={log.id}
                  className="group bg-brand-surface border border-white/10 hover:border-brand-mint/40 rounded-[4px] overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div 
                    onClick={() => setActivePhotoModal(log)}
                    className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black"
                  >
                    <img 
                      src={log.image} 
                      alt={log.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-brand-deep/80 backdrop-blur-xs text-[10px] font-mono text-brand-mint px-2 py-0.5 rounded-[2px]">
                      {log.date}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-architectural text-xs font-bold text-white tracking-wider mb-2">
                        {log.title}
                      </h4>
                      <p className="font-body text-xs text-white/70 leading-relaxed font-light">
                        {log.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setActivePhotoModal(log)}
                      className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-mono text-brand-mint hover:underline cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Ver Fotografía en Alta Resolución</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Official Technical Committee Minutes */}
          <section className="space-y-6">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-brand-mint uppercase tracking-widest font-bold block">
                AUDITORÍA & TRANSPARENCIA
              </span>
              <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                Minuta del Último Comité Técnico de Obra
              </h3>
            </div>

            <div className="p-6 sm:p-8 bg-brand-surface/90 border border-brand-mint/20 rounded-[4px] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-architectural text-sm font-bold text-white tracking-wider">
                    {selectedContract.latestCommittee.number}
                  </h4>
                  <span className="text-xs font-mono text-brand-mint">
                    Fecha de Sesión: {selectedContract.latestCommittee.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Acta Aprobada por Interventoría</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-2">MIEMBROS PARTICIPANTES:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedContract.latestCommittee.attendees.map((att, i) => (
                    <span key={i} className="text-xs font-mono text-white/80 bg-brand-deep px-3 py-1 rounded-[2px] border border-white/10">
                      {att}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-brand-mint uppercase block font-bold">DECISIONES Y ACUERDOS TÉCNICOS:</span>
                <ul className="space-y-2 text-xs text-white/80 font-body font-light leading-relaxed">
                  {selectedContract.latestCommittee.decisions.map((dec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-mint font-bold">•</span>
                      <span>{dec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-brand-deep border border-brand-mint/20 rounded-[3px]">
                <span className="text-[10px] font-mono text-brand-mint uppercase block font-semibold mb-1">
                  PRÓXIMO HITO EN CRONOGRAMA:
                </span>
                <p className="text-xs text-white/90 font-mono">
                  {selectedContract.latestCommittee.nextMilestone}
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* Lightbox for Field Log Photos */}
      {activePhotoModal && (
        <div 
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-brand-deep border border-brand-mint/40 rounded-[4px] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-brand-mint">{activePhotoModal.date}</span>
                <h4 className="font-architectural text-xs font-bold text-white">{activePhotoModal.title}</h4>
              </div>
              <button 
                onClick={() => setActivePhotoModal(null)}
                className="p-1.5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[16/10] bg-black">
              <img src={activePhotoModal.image} alt={activePhotoModal.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-4 bg-brand-surface text-xs text-white/80 font-body">
              {activePhotoModal.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
