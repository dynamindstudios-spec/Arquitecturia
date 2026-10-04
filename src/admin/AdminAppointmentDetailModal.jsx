import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Video, Copy, Check, MessageCircle, MapPin, Calendar, 
  Clock, ShieldCheck, Printer, FileText, CheckCircle2, 
  Archive, RefreshCw, HardHat, Sparkles, AlertCircle, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminAppointmentDetailModal = ({
  appointment,
  isOpen,
  onClose,
  onStatusChange,
  onConvertSuccess,
  onArchiveSuccess,
  onOpenVoucher,
  onOpenDossier
}) => {
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [activeSubView, setActiveSubView] = useState('details'); // 'details' | 'convert_form' | 'archive_form'
  
  // Formulario para Formalizar Obra Activa
  const [projectFormData, setProjectFormData] = useState({
    projectTitle: '',
    contractCode: '',
    location: '',
    area: '',
    residentArchitect: 'Arq. Juan Pablo Valencia (Director Residente)',
    estimatedDelivery: 'Diciembre 2026',
    initialProgress: 5
  });

  // Formulario para Archivar Prospecto
  const [archiveNotes, setArchiveNotes] = useState('');

  if (!isOpen || !appointment) return null;

  const cleanPhone = (appointment.clientPhone || '').replace(/\D/g, '');
  const directWa = `https://wa.me/${cleanPhone.length === 10 && cleanPhone.startsWith('3') ? `57${cleanPhone}` : cleanPhone}?text=${encodeURIComponent(
    `Hola ${appointment.clientName}, te contactamos de ArquitecturIA Atelier respecto a tu Cita para Análisis de Proyecto programada para el ${appointment.date} a las ${appointment.time}.`
  )}`;

  const handleCopyMeet = () => {
    if (!appointment.meetUrl) return;
    navigator.clipboard.writeText(appointment.meetUrl);
    setCopiedMeet(true);
    setTimeout(() => setCopiedMeet(false), 2000);
  };

  const handleInitConvert = () => {
    setProjectFormData({
      projectTitle: `Residencia Campestre · ${appointment.clientName}`,
      contractCode: `SIM-2026-${Math.floor(100 + Math.random() * 900)}`,
      location: appointment.lotLocation || 'Armenia, Quindío · Eje Cafetero',
      area: appointment.estimatedArea || '380 m²',
      residentArchitect: 'Arq. Juan Pablo Valencia (Director Residente)',
      estimatedDelivery: 'Noviembre 2026',
      initialProgress: 5
    });
    setActiveSubView('convert_form');
  };

  const handleSubmitConvert = (e) => {
    e.preventDefault();
    if (onConvertSuccess) {
      onConvertSuccess(appointment.id, projectFormData);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      setActiveSubView('details');
      onClose();
    }
  };

  const handleSubmitArchive = (e) => {
    e.preventDefault();
    if (onArchiveSuccess) {
      onArchiveSuccess(appointment.id, archiveNotes);
      setActiveSubView('details');
      onClose();
    }
  };

  const isClosed = appointment.status === 'Cerrada · Obra Activa';
  const isArchived = appointment.status === 'Archivada';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-brand-deep border border-brand-mint/35 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden text-white flex flex-col my-auto max-h-[92vh]"
        >
          {/* Header de la Ficha Táctica */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-brand-surface/90 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold text-brand-mint bg-brand-mint/10 border border-brand-mint/30 px-2 py-0.5 rounded">
                  {appointment.id}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                  isClosed
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50'
                    : isArchived
                    ? 'bg-zinc-800/80 text-zinc-300 border-zinc-600/50'
                    : appointment.status === 'Confirmada'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-950/40 text-amber-400 border-amber-500/40'
                }`}>
                  {appointment.status}
                </span>
                {appointment.contractCode && (
                  <span className="text-[10px] font-mono bg-brand-mint text-brand-deep font-bold px-2 py-0.5 rounded">
                    CONTRATO: {appointment.contractCode}
                  </span>
                )}
              </div>
              <h2 className="font-editorial-heading text-2xl sm:text-3xl text-white">
                {appointment.clientName}
              </h2>
              <p className="text-xs font-mono text-white/50 mt-0.5">
                {appointment.projectType} · Agendado el {new Date(appointment.createdAt || Date.now()).toLocaleDateString('es-CO')}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CUERPO DEL MODAL (3 VISTAS: DETALLES, FORM CONVERTIR A OBRA, FORM ARCHIVAR) */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            
            {/* SUB-VIEW 1: DETALLES COMPLETOS DE LA CITA */}
            {activeSubView === 'details' && (
              <>
                {/* Banner de Estado de Cierre / Archivo */}
                {isClosed && (
                  <div className="p-4 bg-emerald-950/50 border border-emerald-500/40 rounded-lg text-emerald-200 text-xs font-mono flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <HardHat className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="font-bold block">¡OBRA ACTIVA CONTRATADA!</span>
                        <span className="text-[11px] text-emerald-300/80">Código de Obra: {appointment.contractCode} · Visible en Portal de Seguimiento</span>
                      </div>
                    </div>
                    <a
                      href="/#/seguimiento"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-500 text-brand-deep font-bold rounded text-[11px] hover:bg-emerald-400 transition-colors"
                    >
                      Ver en Seguimiento ↗
                    </a>
                  </div>
                )}

                {isArchived && (
                  <div className="p-3.5 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 text-xs font-mono space-y-1">
                    <span className="text-amber-400 font-bold block">📁 PROSPECTO EN ARCHIVO HISTÓRICO:</span>
                    <p className="text-[11px] text-zinc-400">
                      {appointment.archiveNotes || 'Archivado para seguimiento comercial futuro.'}
                    </p>
                  </div>
                )}

                {/* Grid 2 Columnas: Datos de Contacto y Fecha / Sala Meet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tarjeta de Contacto */}
                  <div className="p-4 bg-brand-surface border border-white/10 rounded-lg space-y-2">
                    <span className="text-[10px] font-mono text-brand-mint uppercase tracking-wider block font-bold">
                      CANALES DE CONTACTO DIRECTO
                    </span>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between text-white/80">
                        <span className="text-white/40">WhatsApp:</span>
                        <span className="font-bold text-white">{appointment.clientPhone}</span>
                      </div>
                      <div className="flex items-center justify-between text-white/80">
                        <span className="text-white/40">Correo:</span>
                        <span className="text-white truncate max-w-[200px]">{appointment.clientEmail}</span>
                      </div>
                      <div className="flex items-center justify-between text-white/80">
                        <span className="text-white/40">Modalidad:</span>
                        <span className="text-brand-mint">{appointment.modality || 'Reunión Virtual Meet'}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex gap-2">
                      <a
                        href={directWa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] rounded text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Abrir WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Tarjeta de Google Meet & Fecha */}
                  <div className="p-4 bg-brand-surface border border-white/10 rounded-lg space-y-2">
                    <span className="text-[10px] font-mono text-brand-mint uppercase tracking-wider block font-bold">
                      SALA VIRTUAL & HORARIO DE ATENCIÓN
                    </span>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between text-white/80">
                        <span className="text-white/40">Fecha Programada:</span>
                        <span className="font-bold text-white">{appointment.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-white/80">
                        <span className="text-white/40">Hora:</span>
                        <span className="font-bold text-brand-mint">{appointment.time}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                      <a
                        href={appointment.meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light rounded text-[11px] font-architectural font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>ENTRAR A GOOGLE MEET</span>
                      </a>

                      <button
                        onClick={handleCopyMeet}
                        className="p-2 border border-white/15 hover:border-brand-mint text-white/60 hover:text-brand-mint rounded transition-colors cursor-pointer"
                        title="Copiar enlace de Google Meet"
                      >
                        {copiedMeet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Especificaciones del Terreno & Proyecto */}
                <div className="p-4 bg-brand-surface border border-white/10 rounded-lg space-y-3">
                  <span className="text-[10px] font-mono text-brand-mint uppercase tracking-wider block font-bold">
                    FICHA PRELIMINAR DEL LOTE & ESPECIFICACIONES
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="bg-brand-deep p-2.5 rounded border border-white/5">
                      <span className="text-[10px] text-white/40 block">UBICACIÓN:</span>
                      <span className="font-semibold text-white block mt-0.5 truncate">{appointment.lotLocation || 'En estudio'}</span>
                    </div>

                    <div className="bg-brand-deep p-2.5 rounded border border-white/5">
                      <span className="text-[10px] text-white/40 block">TENENCIA LOTE:</span>
                      <span className="font-semibold text-brand-mint block mt-0.5">{appointment.hasLot || 'Lote Propio'}</span>
                    </div>

                    <div className="bg-brand-deep p-2.5 rounded border border-white/5">
                      <span className="text-[10px] text-white/40 block">ÁREA ESTIMADA:</span>
                      <span className="font-semibold text-white block mt-0.5">{appointment.estimatedArea || '350 m²'}</span>
                    </div>

                    <div className="bg-brand-deep p-2.5 rounded border border-white/5">
                      <span className="text-[10px] text-white/40 block">PRESUPUESTO:</span>
                      <span className="font-semibold text-amber-300 block mt-0.5 truncate">{appointment.investmentTier || '$1.200M - $1.800M'}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="bg-brand-deep p-3 rounded border border-white/5 text-xs font-mono text-white/70">
                      <span className="text-[10px] text-white/40 block mb-1">NOTAS / REQUERIMIENTOS ESPECIALES DEL CLIENTE:</span>
                      <p>{appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* ========================================================================= */}
                {/* 🎯 ZONA MAESTRA DE DECISIÓN POST-REUNIÓN (CIERRE VS ARCHIVO) */}
                {/* ========================================================================= */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-architectural tracking-wider text-white font-bold">
                      RESOLUCIÓN DE LA REUNIÓN:
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      Acción operativa post-videollamada
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* BOTÓN 1: CERRAR VENTA & ASIGNAR OBRA */}
                    {!isClosed ? (
                      <button
                        onClick={handleInitConvert}
                        className="py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-architectural text-xs font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer group"
                      >
                        <HardHat className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                        <span>🏆 CERRAR VENTA & ASIGNAR OBRA</span>
                      </button>
                    ) : (
                      <div className="py-3 px-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-xs rounded-lg flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>OBRA FORMALIZADA</span>
                      </div>
                    )}

                    {/* BOTÓN 2: ARCHIVAR PROSPECTO */}
                    {!isArchived ? (
                      <button
                        onClick={() => setActiveSubView('archive_form')}
                        className="py-3 px-4 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-600/50 text-zinc-300 font-architectural text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <Archive className="w-4 h-4 text-zinc-400" />
                        <span>📁 ARCHIVAR CON HISTORIAL</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onStatusChange && onStatusChange(appointment.id, 'Pendiente')}
                        className="py-3 px-4 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 text-amber-300 font-mono text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>DESARCHIVAR / REACTIVAR CITA</span>
                      </button>
                    )}
                  </div>

                  {/* Acciones Secundarias: Dossier PDF y Voucher */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onOpenDossier && onOpenDossier(appointment)}
                      className="flex-1 py-2 px-3 bg-brand-surface hover:bg-brand-surface/80 border border-white/15 hover:border-amber-400/50 text-amber-300 rounded text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Expedir Memoria Técnica BIM (8 Págs)</span>
                    </button>

                    <button
                      onClick={() => onOpenVoucher && onOpenVoucher(appointment)}
                      className="py-2 px-3 bg-brand-surface hover:bg-brand-surface/80 border border-white/15 hover:border-brand-mint text-white/80 hover:text-brand-mint rounded text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Comprobante</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* SUB-VIEW 2: FORMULARIO DE CONVERTIR EN OBRA ACTIVA */}
            {activeSubView === 'convert_form' && (
              <form onSubmit={handleSubmitConvert} className="space-y-4 animate-fade-in">
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">
                  <span className="font-architectural text-xs font-bold text-emerald-400 block mb-1">
                    PROTOCOLIZAR CIERRE Y ASIGNAR PROYECTO
                  </span>
                  <p className="text-[11px] font-mono text-white/70">
                    Al confirmar, esta cita se registrará automáticamente como un contrato activo en el Portal Privado de Seguimiento de Obras (/#/seguimiento) de ArquitecturIA.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-white/50 block mb-1">TÍTULO OFICIAL DE LA OBRA:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.projectTitle}
                      onChange={(e) => setProjectFormData({ ...projectFormData, projectTitle: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded focus:border-brand-mint outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 block mb-1">CÓDIGO DE CONTRATO PRIVADO:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.contractCode}
                      onChange={(e) => setProjectFormData({ ...projectFormData, contractCode: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-brand-mint font-bold rounded focus:border-brand-mint outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 block mb-1">UBICACIÓN EXACTA DEL LOTE:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.location}
                      onChange={(e) => setProjectFormData({ ...projectFormData, location: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded focus:border-brand-mint outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 block mb-1">ÁREA TOTAL CONSTRUIDA:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.area}
                      onChange={(e) => setProjectFormData({ ...projectFormData, area: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded focus:border-brand-mint outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 block mb-1">ARQUITECTO DIRECTOR ASIGNADO:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.residentArchitect}
                      onChange={(e) => setProjectFormData({ ...projectFormData, residentArchitect: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded focus:border-brand-mint outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-white/50 block mb-1">PLAZO ESTIMADO DE ENTREGA:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.estimatedDelivery}
                      onChange={(e) => setProjectFormData({ ...projectFormData, estimatedDelivery: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded focus:border-brand-mint outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSubView('details')}
                    className="px-4 py-2 border border-white/20 text-white/60 hover:text-white rounded text-xs font-mono cursor-pointer"
                  >
                    Volver a Detalles
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-brand-deep font-architectural text-xs font-bold rounded shadow-lg transition-colors cursor-pointer"
                  >
                    CONFIRMAR & PROTOCOLIZAR OBRA
                  </button>
                </div>
              </form>
            )}

            {/* SUB-VIEW 3: FORMULARIO DE ARCHIVAR PROSPECTO */}
            {activeSubView === 'archive_form' && (
              <form onSubmit={handleSubmitArchive} className="space-y-4 animate-fade-in">
                <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg">
                  <span className="font-architectural text-xs font-bold text-amber-400 block mb-1">
                    ARCHIVAR CITA CON HISTORIAL DE INTERESES
                  </span>
                  <p className="text-[11px] font-mono text-white/70">
                    Si el negocio no se cerró de inmediato, archívalo indicando los motivos o la fecha tentativa de reactivación. La información no se borrará y podrás consultarla en cualquier momento.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 block mb-1">
                    BITÁCORA DE INTERESES & MOTIVO DE SEGUIMIENTO:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={archiveNotes}
                    onChange={(e) => setArchiveNotes(e.target.value)}
                    placeholder="Ej: El cliente quedó muy interesado en el modelo Guayacán de 420m², pero debe esperar el desembolso de un crédito bancario en diciembre 2026. Volver a contactar en 60 días."
                    className="w-full bg-brand-surface border border-white/15 p-3 text-xs font-mono text-white rounded focus:border-brand-mint outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSubView('details')}
                    className="px-4 py-2 border border-white/20 text-white/60 hover:text-white rounded text-xs font-mono cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white font-architectural text-xs font-bold rounded shadow-lg transition-colors cursor-pointer"
                  >
                    ARCHIVAR CITA
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
