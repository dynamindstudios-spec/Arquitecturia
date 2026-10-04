import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, Mail, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROJECTS_DATA } from '../data/projectsData';
import { storageService } from '../services/storageService';
import { PrintableVoucher } from './PrintableVoucher';

export const VipBookingModal = ({ initialProject = '', onClose }) => {
  const [step, setStep] = useState(1);
  const [projectInterest, setProjectInterest] = useState(initialProject || 'Casa Nogales');
  const [modality, setModality] = useState('Sala de Ventas Armenia');
  const [date, setDate] = useState('2026-09-28');
  const [time, setTime] = useState('10:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [investmentTier, setInvestmentTier] = useState('$800M - $1.500M COP');
  const [purpose, setPurpose] = useState('Residencia Principal / Entrega Inmediata');
  const [notes, setNotes] = useState('');
  const [createdBooking, setCreatedBooking] = useState(null);
  const [showVoucher, setShowVoucher] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
  ];

  const modalities = [
    {
      id: 'Sala de Ventas Armenia',
      title: 'Sala de Ventas Central',
      detail: 'Presentación de maquetas, planos y muestras de materiales en Armenia'
    },
    {
      id: 'Recorrido en Obra Guiado',
      title: 'Recorrido en Obra Guiado',
      detail: 'Visita técnica presencial al lote o proyecto con arquitecto residente'
    },
    {
      id: 'Videollamada Privada VIP',
      title: 'Videollamada Privada VIP',
      detail: 'Para inversionistas nacionales o en el exterior (Miami, Madrid, Bogotá)'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
      setErrorMsg('Por favor completa los campos de nombre, teléfono y correo.');
      return;
    }

    const bookingData = {
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      projectInterest,
      modality,
      date,
      time,
      investmentTier,
      purpose,
      notes: notes.trim(),
      status: 'Confirmada'
    };

    const saved = storageService.addBooking(bookingData);
    setCreatedBooking(saved);
    setStep(5); // Success state

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b8ded8', '#d3ece7', '#ffffff', '#c5a880']
      });
    } catch (err) {
      console.log('Confetti effect executed');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-brand-deep border border-brand-mint/30 shadow-2xl p-6 sm:p-10 text-white"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-brand-mint uppercase block">
              SISTEMA DE ATENCIÓN PATRIMONIAL
            </span>
            <h3 className="font-editorial-heading text-2xl sm:text-3xl text-white">
              Agendamiento VIP
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/5 text-xs font-mono text-white/50">
            <span className={step >= 1 ? 'text-brand-mint font-semibold' : ''}>1. Obra</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-brand-mint font-semibold' : ''}>2. Modalidad</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-brand-mint font-semibold' : ''}>3. Horario</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-brand-mint font-semibold' : ''}>4. Datos</span>
          </div>
        )}

        {/* Step 1: Project Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <label className="block text-xs font-architectural tracking-wider text-brand-mint">
              SELECCIONA LA OBRA O PROYECTO DE TU INTERÉS:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-2">
              {PROJECTS_DATA.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProjectInterest(p.title)}
                  className={`p-3 text-left border flex items-center gap-3 transition-all ${
                    projectInterest === p.title
                      ? 'border-brand-mint bg-brand-mint/10 text-white shadow-[0_0_10px_rgba(184,222,216,0.2)]'
                      : 'border-white/10 hover:border-white/30 text-white/70'
                  }`}
                >
                  <img src={p.coverLocal} alt={p.title} className="w-10 h-10 object-cover" />
                  <div className="truncate">
                    <div className="text-xs font-architectural truncate">{p.title}</div>
                    <div className="text-[10px] font-mono text-white/40">{p.category} · {p.area}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-colors font-architectural text-xs tracking-wider font-semibold flex items-center justify-center gap-2"
            >
              <span>CONTINUAR A MODALIDAD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Modality */}
        {step === 2 && (
          <div className="space-y-6">
            <label className="block text-xs font-architectural tracking-wider text-brand-mint">
              MODALIDAD DE ATENCIÓN:
            </label>
            <div className="space-y-3">
              {modalities.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModality(m.id)}
                  className={`w-full p-4 text-left border transition-all ${
                    modality === m.id
                      ? 'border-brand-mint bg-brand-mint/10 text-white'
                      : 'border-white/10 hover:border-white/30 text-white/70'
                  }`}
                >
                  <div className={`text-xs font-architectural font-bold ${modality === m.id ? 'text-brand-mint' : 'text-white'}`}>
                    {m.title}
                  </div>
                  <div className="text-[11px] font-body text-white/60 mt-1">
                    {m.detail}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-6 border border-white/20 hover:border-white text-xs font-architectural"
              >
                ATRÁS
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-colors font-architectural text-xs tracking-wider font-semibold"
              >
                CONTINUAR A HORARIO
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Slot */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-2">
                FECHA DE VISITA:
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-brand-surface border border-white/10 px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-brand-mint"
              />
            </div>

            <div>
              <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-2">
                HORA PREFERENTE:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`py-2.5 text-center border font-mono text-xs transition-colors ${
                      time === slot
                        ? 'border-brand-mint bg-brand-mint text-brand-deep font-bold'
                        : 'border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-6 border border-white/20 hover:border-white text-xs font-architectural"
              >
                ATRÁS
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-colors font-architectural text-xs tracking-wider font-semibold"
              >
                CONTINUAR A DATOS PERSONALES
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Client Info Form */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-900/40 border border-red-500 text-xs text-red-200 font-mono">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
                NOMBRE COMPLETO / TITULAR DE LA VISITA *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej. Dr. Mauricio Montoya"
                className="w-full bg-brand-surface border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-mint font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
                  CORREO ELECTRÓNICO *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="inversionista@empresa.com"
                  className="w-full bg-brand-surface border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-mint font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
                  TELÉFONO / WHATSAPP *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+57 300 000 0000"
                  className="w-full bg-brand-surface border border-white/10 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-mint font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
                  RANGO ESTIMADO DE INVERSIÓN
                </label>
                <select
                  value={investmentTier}
                  onChange={(e) => setInvestmentTier(e.target.value)}
                  className="w-full bg-brand-surface border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-mint font-mono"
                >
                  <option value="$500M - $800M COP">$500M - $800M COP</option>
                  <option value="$800M - $1.500M COP">$800M - $1.500M COP</option>
                  <option value="$1.500M - $3.000M COP">$1.500M - $3.000M COP</option>
                  <option value="Más de $3.000M COP">Más de $3.000M COP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
                  PROPÓSITO PRINCIPAL
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-brand-surface border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-mint font-mono"
                >
                  <option value="Residencia Principal / Campestre">Residencia Principal</option>
                  <option value="Inversión Turística / Rentas Cortas">Inversión Turística</option>
                  <option value="Local Comercial / Corporativo">Local Comercial / Negocios</option>
                  <option value="Lote / Construcción a Medida">Construcción a Medida</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-architectural tracking-wider text-brand-mint mb-1">
                NOTAS O REQUERIMIENTOS ESPECIALES (OPCIONAL)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Interesado en terraza bioclimática y materiales de teka..."
                className="w-full bg-brand-surface border border-white/10 px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-mint font-mono resize-none"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="py-3 px-6 border border-white/20 hover:border-white text-xs font-architectural"
              >
                ATRÁS
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-colors font-architectural text-xs tracking-wider font-semibold"
              >
                CONFIRMAR & GENERAR PASE VIP
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Success & Ticket View */}
        {step === 5 && (
          <div className="space-y-6 text-center py-4">
            {!showVoucher ? (
              <>
                <div className="w-16 h-16 bg-brand-mint/20 text-brand-mint border border-brand-mint mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-brand-mint tracking-widest uppercase">
                    CITA VIP REGISTRADA EXITOSAMENTE
                  </span>
                  <h3 className="font-editorial-heading text-3xl text-white">
                    ¡Nos Vemos en {createdBooking?.projectInterest}!
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    Hemos reservado tu espacio en {createdBooking?.modality} para el día <strong className="text-white">{createdBooking?.date}</strong> a las <strong className="text-white">{createdBooking?.time}</strong>.
                  </p>
                </div>

                <div className="bg-brand-surface p-4 border border-brand-mint/20 text-left font-mono text-xs space-y-1.5 max-w-md mx-auto">
                  <div className="flex justify-between text-white/50">
                    <span>Código de Reserva:</span>
                    <span className="text-brand-mint font-bold">{createdBooking?.id}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Titular:</span>
                    <span className="text-white">{createdBooking?.clientName}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Teléfono:</span>
                    <span className="text-white">{createdBooking?.clientPhone}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={() => setShowVoucher(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-mint text-brand-deep hover:bg-brand-mint-light transition-colors font-architectural text-xs font-semibold"
                  >
                    <Printer className="w-4 h-4" />
                    <span>VER PASE VIP IMPRIMIBLE (PDF / QR)</span>
                  </button>

                  <a
                    href={`https://wa.me/573008902400?text=Hola%20ArquitecturIA,%20acabo%20de%20agendar%20la%20cita%20VIP%20${createdBooking?.id}%20para%20${encodeURIComponent(createdBooking?.projectInterest)}%20el%20${createdBooking?.date}%20a%20las%20${createdBooking?.time}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-brand-mint/40 hover:border-brand-mint text-brand-mint font-architectural text-xs"
                  >
                    <span>NOTIFICAR POR WHATSAPP</span>
                  </a>
                </div>
              </>
            ) : (
              <div className="pt-2">
                <PrintableVoucher
                  booking={createdBooking}
                  onPrint={handlePrint}
                  onClose={() => setShowVoucher(false)}
                />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
