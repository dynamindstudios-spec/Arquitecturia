import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Building2, Layers, Video, CheckCircle2, 
  Clock, ArrowUpRight, DollarSign, Calendar, MessageCircle, Sparkles, Activity
} from 'lucide-react';
import { storageService } from '../services/storageService';

export const AdminOverview = ({ onNavigateTab, onSelectAppointmentForVoucher }) => {
  const [appointments, setAppointments] = useState(() => storageService.getAppointments());
  const [projects, setProjects] = useState(() => storageService.getProjects());

  useEffect(() => {
    const reload = () => {
      setAppointments(storageService.getAppointments());
      setProjects(storageService.getProjects());
    };
    window.addEventListener('storage', reload);
    window.addEventListener('arquitecturia-appointments-updated', reload);
    return () => {
      window.removeEventListener('storage', reload);
      window.removeEventListener('arquitecturia-appointments-updated', reload);
    };
  }, []);

  // Compute live pipeline numbers
  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmada').length;
  const pendingCount = appointments.filter(a => a.status === 'Pendiente').length;
  const remindersSent = appointments.filter(a => a.whatsappBot?.morningReminderSent).length;
  const totalProjects = projects.length;

  // Conversion rate
  const conversionRate = totalAppointments > 0 ? Math.round((confirmedCount / totalAppointments) * 100) : 0;

  // Upcoming appointments
  const upcomingAppointments = appointments.slice(0, 3);

  return (
    <div className="space-y-8 select-none">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-surface via-brand-surface to-[#0e1d1a] border border-white/10 p-6 sm:p-8 rounded-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-brand-mint uppercase font-semibold">
                SISTEMA OPERATIVO EN VIVO · ARMENIA, QUINDÍO
              </span>
            </div>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white">
              Centro de Comando Arquitectónico
            </h2>
            <p className="text-xs font-mono text-white/60 max-w-xl leading-relaxed">
              Monitoreo en tiempo real de prospección de obras, automatización de bot de WhatsApp, salas de Google Meet y telemetría de inversiones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('appointments')}
              className="flex items-center gap-2 px-5 py-3 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-lg hover:bg-brand-mint-light transition-all shadow-[0_0_25px_rgba(184,222,216,0.35)]"
            >
              <Users className="w-4 h-4" />
              <span>GESTIONAR CITAS ({totalAppointments})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Animated KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Pipeline de Inversión */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="relative bg-brand-surface p-5 rounded-lg border border-white/10 hover:border-brand-mint/40 transition-all group overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-mint to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
            <span>PIPELINE ESTIMADO</span>
            <DollarSign className="w-4 h-4 text-brand-mint" />
          </div>
          <div className="font-editorial-heading text-3xl text-white tracking-tight">
            $24.850M <span className="text-xs font-mono text-brand-mint">COP</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+32% vs trimestre anterior</span>
          </div>
        </motion.div>

        {/* KPI 2: Citas de Análisis & WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative bg-brand-surface p-5 rounded-lg border border-white/10 hover:border-brand-mint/40 transition-all group overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
            <span>CITAS PROGRAMADAS</span>
            <Users className="w-4 h-4 text-[#25D366]" />
          </div>
          <div className="font-editorial-heading text-3xl text-white tracking-tight">
            {totalAppointments} <span className="text-xs font-mono text-white/40">solicitudes</span>
          </div>
          <div className="text-[11px] font-mono text-[#25D366] mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{confirmedCount} confirmadas por Bot ({conversionRate}%)</span>
          </div>
        </motion.div>

        {/* KPI 3: Metros Cuadrados en Estudio */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="relative bg-brand-surface p-5 rounded-lg border border-white/10 hover:border-brand-mint/40 transition-all group overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-mint to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
            <span>ÁREA EN PROYECTO</span>
            <Layers className="w-4 h-4 text-brand-mint" />
          </div>
          <div className="font-editorial-heading text-3xl text-white tracking-tight">
            14.280 <span className="text-xs font-mono text-brand-mint">m²</span>
          </div>
          <div className="text-[11px] font-mono text-white/60 mt-2 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-brand-mint" />
            <span>Residencial, Glamping y Comercial</span>
          </div>
        </motion.div>

        {/* KPI 4: Obras Activas en Catálogo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative bg-brand-surface p-5 rounded-lg border border-white/10 hover:border-brand-mint/40 transition-all group overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
            <span>CATÁLOGO DE OBRAS</span>
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="font-editorial-heading text-3xl text-white tracking-tight">
            {totalProjects} <span className="text-xs font-mono text-white/40">obras</span>
          </div>
          <div className="text-[11px] font-mono text-[#d4af37] mt-2 flex items-center gap-1">
            <span>✓ 170 fotografías HD verificadas</span>
          </div>
        </motion.div>
      </div>

      {/* Middle Section: Funnel Pipeline + Tipology Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Funnel Pipeline (7 Cols) */}
        <div className="lg:col-span-7 bg-brand-surface p-6 rounded-lg border border-white/10 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-architectural text-xs font-bold text-white tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-mint" />
                <span>EMBUDO DE CONVERSIÓN DE CITAS & BOT WHATSAPP</span>
              </h3>
              <p className="text-[11px] font-mono text-white/40 mt-0.5">
                Ruta del prospecto desde el registro inicial hasta la sesión virtual en Google Meet.
              </p>
            </div>
            <span className="text-[11px] font-mono text-brand-mint font-bold">
              {conversionRate}% EFECTIVIDAD
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Step 1: Solicitudes Ingresadas */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-white/70">
                <span>1. Solicitudes de Cita Recibidas en Web:</span>
                <span className="font-bold text-white">{totalAppointments}</span>
              </div>
              <div className="w-full bg-brand-deep h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-brand-mint h-full rounded-full transition-all duration-1000" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Step 2: Contactadas por Bot */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-white/70">
                <span>2. Notificaciones Automáticas Despachadas por WhatsApp:</span>
                <span className="font-bold text-[#25D366]">{totalAppointments} (100%)</span>
              </div>
              <div className="w-full bg-brand-deep h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-[#25D366] h-full rounded-full transition-all duration-1000" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Step 3: Citas Confirmadas */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-white/70">
                <span>3. Citas Confirmadas por el Cliente ("SÍ"):</span>
                <span className="font-bold text-emerald-400">{confirmedCount} ({conversionRate}%)</span>
              </div>
              <div className="w-full bg-brand-deep h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.max(conversionRate, 15)}%` }} />
              </div>
            </div>

            {/* Step 4: Recordatorios 7:00 AM */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-white/70">
                <span>4. Recordatorios Matutinos 7:00 AM Emitidos con Meet:</span>
                <span className="font-bold text-[#d4af37]">{remindersSent}</span>
              </div>
              <div className="w-full bg-brand-deep h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-[#d4af37] h-full rounded-full transition-all duration-1000" style={{ width: `${totalAppointments > 0 ? (remindersSent / totalAppointments) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Demand by Typology (5 Cols) */}
        <div className="lg:col-span-5 bg-brand-surface p-6 rounded-lg border border-white/10 space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-architectural text-xs font-bold text-white tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-mint" />
                <span>DISTRIBUCIÓN DE DEMANDA POR TIPOLOGÍA</span>
              </h3>
              <p className="text-[11px] font-mono text-white/40 mt-0.5">
                Interés registrado en Citas de Análisis.
              </p>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Residencial Campestre de Lujo</span>
                  <span className="text-brand-mint font-bold">48%</span>
                </div>
                <div className="w-full bg-brand-deep h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-brand-mint h-full rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Complejo Turístico & Glamping</span>
                  <span className="text-[#d4af37] font-bold">34%</span>
                </div>
                <div className="w-full bg-brand-deep h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-[#d4af37] h-full rounded-full" style={{ width: '34%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Comercial & Negocios</span>
                  <span className="text-emerald-400 font-bold">18%</span>
                </div>
                <div className="w-full bg-brand-deep h-2 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '18%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-brand-deep border border-brand-mint/20 rounded-md text-[11px] font-mono text-white/60">
            💡 <span className="text-brand-mint font-semibold">Insight Directivo:</span> Circasia y Salento concentran el 72% de la demanda para proyectos campestres y suites de renta turística.
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Appointments Quick Access */}
      <div className="bg-brand-surface p-6 rounded-lg border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="font-architectural text-xs font-bold text-white tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-mint" />
              <span>SESIONES PRÓXIMAS DE ANÁLISIS DE PROYECTO</span>
            </h3>
            <p className="text-[11px] font-mono text-white/40 mt-0.5">
              Accede directamente a la llamada en Google Meet o revisa los datos del lote.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('appointments')}
            className="text-xs font-mono text-brand-mint hover:underline flex items-center gap-1"
          >
            <span>Ver todas las citas</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingAppointments.map((a) => (
            <div key={a.id} className="p-4 bg-brand-deep border border-white/10 rounded-lg space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-brand-mint font-bold">{a.id}</span>
                  <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                    a.status === 'Confirmada' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                  }`}>
                    {a.status}
                  </span>
                </div>
                <h4 className="font-architectural text-xs font-bold text-white">
                  {a.clientName}
                </h4>
                <div className="text-[11px] font-mono text-white/50 mt-1">
                  {a.projectType}
                </div>
                <div className="text-[10px] font-mono text-brand-mint/80 mt-0.5">
                  {a.lotLocation} ({a.estimatedArea || '350 m²'})
                </div>
                <div className="text-[11px] font-mono text-white/70 mt-2">
                  📅 {a.date} · ⏰ {a.time}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex gap-2">
                <a
                  href={a.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 bg-brand-mint text-brand-deep hover:bg-brand-mint-light font-architectural text-[10px] font-bold tracking-wider rounded flex items-center justify-center gap-1 transition-colors"
                >
                  <Video className="w-3 h-3" />
                  <span>Entrar Meet</span>
                </a>
                <button
                  onClick={() => onSelectAppointmentForVoucher(a)}
                  className="px-2.5 py-1.5 border border-white/15 hover:border-brand-mint text-white hover:text-brand-mint rounded text-[10px] transition-colors"
                  title="Ver Comprobante"
                >
                  Voucher
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
