import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, Users, Building2, Settings, Shield, LogOut, 
  Search, CheckCircle2, Clock, XCircle, Trash2, Printer, Plus, Eye, MapPin,
  Video, Copy, ExternalLink, MessageCircle, BellRing, Sparkles, Edit3, Globe,
  Layers, DollarSign, Image as ImageIcon, Check, RefreshCw, Activity, ArrowRight,
  FileText
} from 'lucide-react';
import { storageService, normalizeMediaUrl } from '../services/storageService';
import { AdminOverview } from './AdminOverview';
import { AdminSettingsHub } from './AdminSettingsHub';
import { WhatsAppAgentConsole } from './WhatsAppAgentConsole';
import { AdminAppointmentDetailModal } from './AdminAppointmentDetailModal';
import { PrintableVoucher } from '../components/PrintableVoucher';

// Carga diferida del Dossier Ejecutivo BIM
const ExecutiveDossierGenerator = React.lazy(() => import('../components/ExecutiveDossierGenerator'));

export const AdminDashboard = ({ onLogout, onReturnHome }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, appointments, calendar, projects, settings
  const [role, setRole] = useState('admin'); // 'admin' or 'staff'
  const [appointments, setAppointments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointmentForVoucher, setSelectedAppointmentForVoucher] = useState(null);
  const [selectedAppointmentForDetail, setSelectedAppointmentForDetail] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState('all'); // 'all' | 'active' | 'closed' | 'archived'
  const [selectedLeadForDossier, setSelectedLeadForDossier] = useState(null);
  const [copiedMeetId, setCopiedMeetId] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [appointmentSubTab, setAppointmentSubTab] = useState('directory'); // 'directory' | 'bot_console'

  // Project CRUD Modal State (Enriched with Architecture Team, Leader, Date & Phase)
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: 'Residencial Campestre',
    area: '',
    location: 'Armenia, Quindío',
    investmentTier: '$1.200M - $1.800M COP',
    coverLocal: '',
    driveFolderUrl: '',
    description: '',
    year: '2026',
    assignedTeam: 'Célula Alpha (Residencial Campestre)',
    projectLeader: 'Arq. Andrés Echeverri (Director de Diseño)',
    assignedDate: new Date().toISOString().split('T')[0],
    currentPhase: 'Fase 1: Diseño Bioclimático',
    progressPercentage: 25,
    fieldNotes: ''
  });

  useEffect(() => {
    loadAppointments();
    loadProjects();

    const handleStorageChange = () => {
      loadAppointments();
      loadProjects();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('arquitecturia-appointments-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('arquitecturia-appointments-updated', handleStorageChange);
    };
  }, []);

  const loadAppointments = () => {
    setAppointments(storageService.getAppointments());
  };

  const loadProjects = () => {
    setProjects(storageService.getProjects());
  };

  const showFeedback = (msg) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    storageService.updateAppointmentStatus(id, newStatus);
    loadAppointments();
    showFeedback(`Cita ${id} actualizada a: ${newStatus}`);
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm(`¿Deseas cancelar la cita ${id}? El cliente y el Atelier serán notificados.`)) {
      storageService.cancelAppointment(id);
      loadAppointments();
      showFeedback(`Cita ${id} marcada como Cancelada.`);
    }
  };

  const handleRescheduleAppointment = (id) => {
    const newDate = window.prompt('Ingresa la nueva fecha para la cita (YYYY-MM-DD):', new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
    if (!newDate) return;
    const newTime = window.prompt('Ingresa la nueva franja horaria (ej: 10:00 AM, 03:30 PM):', '10:00 AM');
    if (!newTime) return;

    storageService.rescheduleAppointment(id, newDate, newTime);
    loadAppointments();
    showFeedback(`¡Cita ${id} reprogramada con éxito para el ${newDate} a las ${newTime}!`);
  };

  const handleSendMorningReminder = (id) => {
    storageService.sendMorningReminder(id);
    loadAppointments();
    showFeedback(`¡Recordatorio matutino 7:00 AM disparado con éxito para ${id}!`);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro de cita de análisis?')) {
      storageService.deleteAppointment(id);
      loadAppointments();
      showFeedback(`Registro ${id} eliminado.`);
    }
  };

  const handleCopyMeet = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedMeetId(id);
    setTimeout(() => setCopiedMeetId(null), 2500);
  };

  const handleConvertAppointment = (id, projectPayload) => {
    const res = storageService.convertAppointmentToActiveProject(id, projectPayload);
    if (res.success) {
      loadAppointments();
      loadProjects();
      showFeedback(`🏆 ¡Obra formalizada con éxito! Contrato ${res.contractCode} activado.`);
    } else {
      showFeedback(`Error al formalizar obra: ${res.error}`);
    }
  };

  const handleArchiveAppointment = (id, notes) => {
    storageService.archiveAppointment(id, notes);
    loadAppointments();
    showFeedback(`📁 Cita archivada en el historial con sus notas de seguimiento.`);
  };

  const handleUnarchiveAppointment = (id) => {
    storageService.unarchiveAppointment(id);
    loadAppointments();
    showFeedback(`Cita desarchivada y reactivada en el pipeline activo.`);
  };

  // Project CRUD Handlers
  const handleOpenNewProject = () => {
    setEditingProject(null);
    setProjectFormData({
      title: '',
      category: 'Residencial Campestre',
      area: '380 m²',
      location: 'Armenia, Quindío',
      investmentTier: '$1.000M - $1.800M COP',
      coverLocal: '/extracted/arquitecturia/assets/hero-residence-1.jpg',
      driveFolderUrl: '',
      description: 'Estructura en concreto visto fenólico y ventanería piso-techo con alta bioclimática.',
      year: '2026',
      assignedTeam: 'Célula Alpha (Residencial Campestre)',
      projectLeader: 'Arq. Andrés Echeverri (Director de Diseño)',
      assignedDate: new Date().toISOString().split('T')[0],
      currentPhase: 'Fase 1: Diseño Bioclimático',
      progressPercentage: 15,
      fieldNotes: 'Inicio de replanteo y levantamiento de modelo bioclimático.'
    });
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectFormData({
      title: proj.title || '',
      category: proj.category || 'Residencial Campestre',
      area: proj.area || '',
      location: proj.location || '',
      investmentTier: proj.investmentTier || '$1.200M COP',
      coverLocal: proj.coverLocal || '',
      driveFolderUrl: proj.driveFolderUrl || '',
      description: proj.description || '',
      year: proj.year || '2026',
      assignedTeam: proj.assignedTeam || 'Célula Alpha (Residencial Campestre)',
      projectLeader: proj.projectLeader || 'Arq. Andrés Echeverri (Director de Diseño)',
      assignedDate: proj.assignedDate || new Date().toISOString().split('T')[0],
      currentPhase: proj.currentPhase || 'Fase 3: Estructura & Obra Gris',
      progressPercentage: proj.progressPercentage ?? 50,
      fieldNotes: proj.fieldNotes || ''
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectFormData.title.trim()) return;

    const normalizedCover = normalizeMediaUrl(projectFormData.coverLocal);
    const dataToSave = {
      ...projectFormData,
      coverLocal: normalizedCover || '/extracted/arquitecturia/assets/hero-residence-1.jpg',
      id: editingProject ? editingProject.id : `obra-${Date.now().toString().slice(-4)}`
    };

    storageService.saveProject(dataToSave);
    loadProjects();
    setProjectModalOpen(false);
    showFeedback(editingProject ? '¡Proyecto actualizado con éxito!' : '¡Nuevo proyecto publicado en el catálogo!');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('¿Deseas retirar esta obra del inventario de proyectos?')) {
      storageService.deleteProject(id);
      loadProjects();
      showFeedback('Proyecto retirado del inventario.');
    }
  };

  // KPIs
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmada').length;
  const pendingCount = appointments.filter(a => a.status === 'Pendiente').length;
  const closedCount = appointments.filter(a => a.status === 'Cerrada · Obra Activa').length;
  const archivedCount = appointments.filter(a => a.status === 'Archivada').length;
  const remindersSentCount = appointments.filter(a => a.whatsappBot?.morningReminderSent).length;

  const filteredAppointments = appointments.filter(a => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = (
      (a.clientName || '').toLowerCase().includes(q) ||
      (a.projectType || '').toLowerCase().includes(q) ||
      (a.clientPhone || '').toLowerCase().includes(q) ||
      (a.lotLocation || '').toLowerCase().includes(q) ||
      (a.id || '').toLowerCase().includes(q)
    );

    if (!matchesSearch) return false;

    if (appointmentFilter === 'active') {
      return a.status === 'Pendiente' || a.status === 'Confirmada';
    }
    if (appointmentFilter === 'closed') {
      return a.status === 'Cerrada · Obra Activa';
    }
    if (appointmentFilter === 'archived') {
      return a.status === 'Archivada';
    }
    return true; // 'all'
  });

  return (
    <div className="relative min-h-screen bg-brand-deep text-white flex flex-col md:flex-row select-none overflow-x-hidden">
      {/* Background Cinematic Video Loop with Subtle Transparency (Atmospheric & Non-Intrusive) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          src="/videos/hero_scrolly_complete.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 filter saturate-150 contrast-110 blur-[6px] scale-105"
        />
        <div className="absolute inset-0 bg-brand-deep/85 backdrop-blur-2xl" />
        
        {/* Dynamic Background Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(184, 222, 216, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(184, 222, 216, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px'
          }}
        />
        {/* Top Ambient Lighting Aura */}
        <div className="absolute -top-40 right-20 w-[55vw] h-[55vw] rounded-full blur-[160px] bg-brand-mint/10 pointer-events-none" />
      </div>

      {/* 1. Tactical Left Sidebar */}
      <aside className="relative z-10 w-full md:w-64 bg-brand-surface/92 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-6 shadow-2xl">
        <div>
          {/* Brand header with Official Logo Sin Fondo (Clean, Zero Text) */}
          <div className="flex items-center justify-center sm:justify-start mb-6 pb-4 border-b border-white/10">
            <img
              src="/logo sin fondo.png"
              alt="ArquitecturIA Atelier"
              className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(184,222,216,0.35)]"
            />
          </div>

          {/* User Role Card & Switcher */}
          <div className="bg-brand-deep p-3.5 border border-white/10 rounded-lg mb-6 shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1">
              <span>OPERADOR EN TURNO:</span>
            </div>
            <div className="font-bold text-xs text-brand-mint flex items-center gap-1.5">
              <span>{role === 'admin' ? '👑 Director General' : '👤 Asesor Comercial'}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/5 flex gap-2">
              <button
                onClick={() => setRole('admin')}
                className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
                  role === 'admin' ? 'border-brand-mint text-brand-mint bg-brand-mint/10 font-bold' : 'border-white/10 text-white/40 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setRole('staff')}
                className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors ${
                  role === 'staff' ? 'border-brand-mint text-brand-mint bg-brand-mint/10 font-bold' : 'border-white/10 text-white/40 hover:text-white'
                }`}
              >
                Asesor
              </button>
            </div>
          </div>

          {/* Navigation Menu (EXACTLY 5 CANONICAL SECTIONS) */}
          <nav className="space-y-1.5 font-architectural text-xs tracking-wider">
            {/* Section 1: Overview */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Resumen Ejecutivo</span>
            </button>

            {/* Section 2: Appointments & WhatsApp */}
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'appointments'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Citas & WhatsApp ({appointments.length})</span>
            </button>

            {/* Section 3: Calendar */}
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'calendar'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agenda & Salas</span>
            </button>

            {/* Section 4: Projects Catalog */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                activeTab === 'projects'
                  ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Obras & Proyectos ({projects.length})</span>
            </button>

            {/* Section 5: Unified Settings Hub */}
            {role === 'admin' ? (
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                  activeTab === 'settings'
                    ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Configuración Sistema</span>
              </button>
            ) : (
              <div className="p-3 text-[10px] font-mono text-white/40 border border-white/5 rounded-lg mt-2">
                🔒 Configuración restringida a Dirección General.
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <button
            onClick={onReturnHome}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono text-white/70 hover:text-brand-mint border border-white/10 hover:border-brand-mint rounded-lg transition-colors"
          >
            <span>Ver Sitio Comercial</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="relative z-10 flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Global Feedback Banner */}
        {actionSuccessMsg && (
          <div className="mb-6 p-3 bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-mono rounded-lg flex items-center gap-2 shadow-xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* 1. RESUMEN EJECUTIVO & PIPELINE VIVO */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <AdminOverview
                onNavigateTab={setActiveTab}
                onSelectAppointmentForVoucher={setSelectedAppointmentForVoucher}
              />
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 2. CITAS DE ANÁLISIS & BOT WHATSAPP */}
          {/* ========================================================================= */}
          {activeTab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header & Sub-Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="font-editorial-heading text-3xl text-white">
                    Citas de Análisis & Agente de WhatsApp
                  </h2>
                  <p className="text-xs font-mono text-white/50 mt-1">
                    Gestión omnicanal: IA conversacional para calificación, agendamiento y cancelaciones en tiempo real.
                  </p>
                </div>

                {/* Sub-tab Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-brand-surface border border-white/10 rounded-lg">
                  <button
                    onClick={() => setAppointmentSubTab('directory')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all flex items-center gap-2 ${
                      appointmentSubTab === 'directory'
                        ? 'bg-brand-mint text-brand-deep font-bold shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Directorio & Leads ({appointments.length})</span>
                  </button>

                  <button
                    onClick={() => setAppointmentSubTab('bot_console')}
                    className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all flex items-center gap-2 ${
                      appointmentSubTab === 'bot_console'
                        ? 'bg-[#25D366] text-black font-bold shadow-md shadow-[#25D366]/20'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Simulador Bot En Vivo</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tab View 1: SIMULADOR AGENTE BOT WHATSAPP EN VIVO */}
              {appointmentSubTab === 'bot_console' ? (
                <WhatsAppAgentConsole onAppointmentChanged={loadAppointments} />
              ) : (
                /* Sub-Tab View 2: DIRECTORIO DE CITAS & LEADS */
                <div className="space-y-6">
                  {/* Filters & Search Toolbar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Segmented Filter */}
                    <div className="flex items-center gap-1.5 p-1 bg-brand-surface border border-white/10 rounded-lg overflow-x-auto text-xs font-mono">
                      <button
                        onClick={() => setAppointmentFilter('all')}
                        className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                          appointmentFilter === 'all'
                            ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        Todas ({totalCount})
                      </button>

                      <button
                        onClick={() => setAppointmentFilter('active')}
                        className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                          appointmentFilter === 'active'
                            ? 'bg-brand-mint text-brand-deep font-bold shadow-sm'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        Activas ({confirmedCount + pendingCount})
                      </button>

                      <button
                        onClick={() => setAppointmentFilter('closed')}
                        className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                          appointmentFilter === 'closed'
                            ? 'bg-emerald-500 text-brand-deep font-bold shadow-sm'
                            : 'text-emerald-400 hover:text-white'
                        }`}
                      >
                        <span>🏆 Obras Cerradas ({closedCount})</span>
                      </button>

                      <button
                        onClick={() => setAppointmentFilter('archived')}
                        className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                          appointmentFilter === 'archived'
                            ? 'bg-zinc-700 text-white font-bold shadow-sm'
                            : 'text-white/40 hover:text-white'
                        }`}
                      >
                        <span>📁 Archivadas ({archivedCount})</span>
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por cliente, radicado o lote..."
                        className="w-full bg-brand-surface border border-white/10 px-3 py-2.5 pl-9 text-xs font-mono text-white focus:outline-none focus:border-brand-mint rounded-lg"
                      />
                      <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* KPI Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-brand-surface p-4 border border-white/10 rounded-lg shadow-lg">
                      <span className="text-[10px] font-mono text-white/50 uppercase block">TOTAL REGISTROS</span>
                      <span className="font-editorial-heading text-3xl text-white mt-1 block">{totalCount}</span>
                    </div>
                    <div className="bg-brand-surface p-4 border border-emerald-500/20 rounded-lg shadow-lg">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase block">CONFIRMADAS</span>
                      <span className="font-editorial-heading text-3xl text-emerald-400 mt-1 block">{confirmedCount}</span>
                    </div>
                    <div className="bg-brand-surface p-4 border border-teal-500/30 rounded-lg shadow-lg bg-teal-950/10">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block flex items-center gap-1">
                        <span>🏆 OBRAS CONTRATADAS</span>
                      </span>
                      <span className="font-editorial-heading text-3xl text-emerald-300 mt-1 block">{closedCount}</span>
                    </div>
                    <div className="bg-brand-surface p-4 border border-zinc-700/50 rounded-lg shadow-lg">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase block">HISTORIAL ARCHIVADO</span>
                      <span className="font-editorial-heading text-3xl text-zinc-300 mt-1 block">{archivedCount}</span>
                    </div>
                  </div>

                  {/* Appointments Table */}
                  <div className="bg-brand-surface border border-white/10 rounded-lg overflow-x-auto shadow-xl">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-brand-deep text-white/50 text-[10px] tracking-wider uppercase">
                          <th className="p-3.5">Ref</th>
                          <th className="p-3.5">Cliente & Contacto</th>
                          <th className="p-3.5">Nuevo Proyecto & Terreno</th>
                          <th className="p-3.5">Google Meet & Fecha</th>
                          <th className="p-3.5">Estado WhatsApp Bot</th>
                          <th className="p-3.5 text-right">Acciones Tácticas</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-white/40">
                              No hay solicitudes de citas que coincidan con la búsqueda.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((a) => {
                            const cleanPhone = (a.clientPhone || '').replace(/\D/g, '');
                            const directWa = `https://wa.me/${cleanPhone.length === 10 && cleanPhone.startsWith('3') ? `57${cleanPhone}` : cleanPhone}?text=${encodeURIComponent(
                              `Hola ${a.clientName}, te escribimos de ArquitecturIA Atelier respecto a tu Cita para Análisis de Proyecto para el ${a.date} a las ${a.time}.\n\nTu enlace de Google Meet es: ${a.meetUrl}`
                            )}`;

                            return (
                              <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="p-3.5 font-bold text-brand-mint align-top">
                                  <button
                                    onClick={() => setSelectedAppointmentForDetail(a)}
                                    className="hover:underline text-left cursor-pointer flex items-center gap-1"
                                    title="Ver Ficha Completa & Decisión"
                                  >
                                    <span>{a.id}</span>
                                  </button>
                                </td>
                                <td className="p-3.5 align-top">
                                  <button
                                    onClick={() => setSelectedAppointmentForDetail(a)}
                                    className="font-semibold text-white hover:text-brand-mint text-left cursor-pointer transition-colors block"
                                    title="Ver Ficha Completa & Decisión"
                                  >
                                    {a.clientName}
                                  </button>
                                  <div className="text-[11px] text-white/60 flex items-center gap-1.5 mt-0.5">
                                    <span>{a.clientPhone}</span>
                                  </div>
                                  <div className="text-[10px] text-white/40">{a.clientEmail}</div>
                                </td>
                                <td className="p-3.5 align-top">
                                  <div className="text-white font-medium">{a.projectType}</div>
                                  <div className="text-[11px] text-brand-mint/90 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span>{a.lotLocation || 'Lote en estudio'} · {a.estimatedArea || '350 m²'}</span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[9px] bg-brand-deep px-1.5 py-0.5 rounded text-brand-mint border border-brand-mint/30">
                                      {a.hasLot || 'Lote Propio'}
                                    </span>
                                    <span className="text-[10px] text-white/40">{a.investmentTier}</span>
                                  </div>
                                </td>
                                <td className="p-3.5 align-top space-y-1">
                                  <div className="text-white font-medium">{a.date} · <span className="text-brand-mint">{a.time}</span></div>
                                  <div className="flex items-center gap-1.5 pt-1">
                                    <a
                                      href={a.meetUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2 py-0.5 bg-brand-mint/10 border border-brand-mint/30 hover:border-brand-mint text-brand-mint rounded flex items-center gap-1 text-[10px]"
                                      title="Abrir Google Meet"
                                    >
                                      <Video className="w-3 h-3" />
                                      <span>Entrar Meet</span>
                                    </a>
                                    <button
                                      onClick={() => handleCopyMeet(a.id, a.meetUrl)}
                                      className="p-1 hover:bg-white/10 text-white/50 hover:text-white rounded"
                                      title="Copiar enlace Meet"
                                    >
                                      {copiedMeetId === a.id ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </td>
                                <td className="p-3.5 align-top">
                                  <div className="space-y-1">
                                    <span
                                      className={`px-2 py-0.5 text-[10px] font-bold uppercase inline-flex items-center gap-1 rounded border ${
                                        a.status === 'Cerrada · Obra Activa'
                                          ? 'bg-teal-950/60 text-emerald-300 border-teal-500/50'
                                          : a.status === 'Archivada'
                                          ? 'bg-zinc-800/80 text-zinc-300 border-zinc-600/50'
                                          : a.status === 'Confirmada'
                                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                                          : a.status === 'Cancelada'
                                          ? 'bg-red-950/40 text-red-400 border-red-500/40'
                                          : 'bg-amber-950/40 text-amber-400 border-amber-500/40'
                                      }`}
                                    >
                                      <span className={`w-1.5 h-1.5 rounded-full ${
                                        a.status === 'Cerrada · Obra Activa' ? 'bg-emerald-400' : a.status === 'Confirmada' ? 'bg-emerald-400' : a.status === 'Cancelada' ? 'bg-red-400' : a.status === 'Archivada' ? 'bg-zinc-400' : 'bg-amber-400 animate-pulse'
                                      }`} />
                                      {a.status}
                                    </span>
                                    
                                    <div className="text-[10px] font-mono text-white/50 flex items-center gap-1">
                                      {a.whatsappBot?.morningReminderSent ? (
                                        <span className="text-[#25D366] font-bold">✓ Recordatorio 7:00 AM Enviado</span>
                                      ) : (
                                        <span>⏰ Recordatorio 7:00 AM Programado</span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3.5 text-right align-top">
                                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                    {/* Botón Maestro: Ficha Táctica & Cierre */}
                                    <button
                                      onClick={() => setSelectedAppointmentForDetail(a)}
                                      title="Abrir Ficha Táctica: Cierre de Obra, Meet y Archivo"
                                      className="px-2.5 py-1 bg-brand-mint/15 hover:bg-brand-mint/25 border border-brand-mint/40 text-brand-mint rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>Ficha & Cierre</span>
                                    </button>
                                    {/* Simulate Bot Confirm (If pending) */}
                                    {a.status !== 'Confirmada' && a.status !== 'Cancelada' && (
                                      <button
                                        onClick={() => handleStatusChange(a.id, 'Confirmada')}
                                        title="Simular respuesta 'SÍ' de cliente (Marcar Confirmada)"
                                        className="px-2 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/40 rounded text-[10px] flex items-center gap-1"
                                      >
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Confirmar</span>
                                      </button>
                                    )}

                                    {/* Reschedule Button */}
                                    {a.status !== 'Cancelada' && (
                                      <button
                                        onClick={() => handleRescheduleAppointment(a.id)}
                                        title="Reprogramar fecha y hora de cita"
                                        className="p-1.5 text-sky-400 hover:bg-sky-950/30 border border-sky-500/20 rounded"
                                      >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                      </button>
                                    )}

                                    {/* Cancel Button */}
                                    {a.status !== 'Cancelada' && (
                                      <button
                                        onClick={() => handleCancelAppointment(a.id)}
                                        title="Cancelar Cita"
                                        className="p-1.5 text-amber-400 hover:bg-amber-950/30 border border-amber-500/20 rounded"
                                      >
                                        <XCircle className="w-3.5 h-3.5" />
                                      </button>
                                    )}

                                    {/* Trigger Morning 7:00 AM Reminder */}
                                    {!a.whatsappBot?.morningReminderSent && a.status !== 'Cancelada' && (
                                      <button
                                        onClick={() => handleSendMorningReminder(a.id)}
                                        title="Disparar recordatorio matutino de las 7:00 AM ahora"
                                        className="px-2 py-1 bg-[#0a1e17] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 rounded text-[10px] flex items-center gap-1"
                                      >
                                        <BellRing className="w-3 h-3" />
                                        <span>Enviar 7 AM</span>
                                      </button>
                                    )}

                                    {/* Open WhatsApp Chat */}
                                    <a
                                      href={directWa}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 text-[#25D366] hover:bg-[#25D366]/10 border border-[#25D366]/30 rounded"
                                      title="Abrir Chat de WhatsApp"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>

                                    {/* Print Voucher */}
                                    <button
                                      onClick={() => setSelectedAppointmentForVoucher(a)}
                                      title="Ver Comprobante Imprimible"
                                      className="p-1.5 text-brand-mint hover:bg-brand-mint/10 border border-brand-mint/30 rounded"
                                    >
                                      <Printer className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Expedir Dossier Ejecutivo BIM (8 Páginas) */}
                                    <button
                                      onClick={() => setSelectedLeadForDossier({
                                        radId: a.id,
                                        clientName: a.clientName,
                                        clientEmail: a.clientEmail,
                                        clientPhone: a.clientPhone,
                                        projectType: a.projectType,
                                        lotLocation: a.lotLocation,
                                        hasLot: a.hasLot,
                                        topography: a.topography,
                                        estimatedArea: a.estimatedArea,
                                        investmentTier: a.investmentTier,
                                        timeline: a.timeline,
                                        modality: a.modality,
                                        notes: a.notes
                                      })}
                                      title="Expedir Dossier Ejecutivo BIM (8 Páginas A4)"
                                      className="p-1.5 text-amber-300 hover:bg-amber-400/10 border border-amber-400/30 rounded"
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Delete */}
                                    <button
                                      onClick={() => handleDeleteAppointment(a.id)}
                                      title="Eliminar Cita"
                                      className="p-1.5 text-red-400 hover:bg-red-950/30 border border-red-500/20 rounded"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 3. AGENDA & SALAS */}
          {/* ========================================================================= */}
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-editorial-heading text-3xl text-white">
                  Disponibilidad & Agenda de Citas de Análisis
                </h2>
                <p className="text-xs font-mono text-white/50 mt-1">
                  Visualización de franjas horarias y ocupación para Google Meet y Estudio Armenia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['2026-09-26', '2026-09-28', '2026-09-29'].map((day) => {
                  const dayAppointments = appointments.filter(a => a.date === day);
                  return (
                    <div key={day} className="bg-brand-surface p-5 border border-white/10 rounded-lg space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="font-architectural text-xs font-bold text-brand-mint">
                          {day}
                        </span>
                        <span className="font-mono text-[11px] text-white/40">
                          {dayAppointments.length} citas programadas
                        </span>
                      </div>

                      <div className="space-y-2">
                        {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'].map((slot) => {
                          const booked = dayAppointments.find(a => a.time === slot);
                          return booked ? (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedAppointmentForDetail(booked)}
                              className="w-full p-3 rounded-lg border border-brand-mint/50 bg-brand-mint/10 hover:bg-brand-mint/20 text-white text-xs font-mono flex items-center justify-between transition-all cursor-pointer shadow-md group text-left"
                              title="Haz clic para ver la ficha completa, entrar a Meet o formalizar obra / archivar"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-mint group-hover:scale-125 transition-transform" />
                                <span className="font-bold text-white">{slot}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-[11px] text-brand-mint font-bold truncate block max-w-[130px] group-hover:underline">
                                  {booked.clientName}
                                </span>
                                <span className="text-[9px] text-white/50 block">
                                  {booked.status} · Ficha ↗
                                </span>
                              </div>
                            </button>
                          ) : (
                            <div
                              key={slot}
                              className="p-3 rounded-lg border border-white/5 bg-brand-deep text-white/30 text-xs font-mono flex items-center justify-between"
                            >
                              <span className="font-bold">{slot}</span>
                              <span className="text-[10px] text-emerald-400">DISPONIBLE</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 4. OBRAS & PROYECTOS (CRUD) */}
          {/* ========================================================================= */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-editorial-heading text-3xl text-white">
                    Inventario de Obras & Gestor de Proyectos
                  </h2>
                  <p className="text-xs font-mono text-white/50 mt-1">
                    Publica nuevas obras, edita especificaciones o actualiza fotografías para el catálogo comercial.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewProject}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-mint text-brand-deep font-architectural text-xs font-bold tracking-wider rounded-lg shadow-lg hover:bg-brand-mint-light transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>PUBLICAR NUEVO PROYECTO</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="bg-brand-surface border border-white/10 p-4 rounded-lg flex flex-col justify-between space-y-3 shadow-xl">
                    <div className="flex gap-3">
                      <img
                        src={p.coverLocal || '/extracted/arquitecturia/assets/hero-residence-1.jpg'}
                        alt={p.title}
                        className="w-20 h-20 object-cover flex-shrink-0 rounded-md border border-white/10"
                      />
                      <div className="truncate space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-brand-mint uppercase bg-brand-deep px-1.5 py-0.5 rounded">
                            {p.category}
                          </span>
                        </div>
                        <h4 className="font-architectural text-xs font-bold text-white truncate">
                          {p.title}
                        </h4>
                        <div className="text-[11px] font-mono text-white/50">{p.area || '350 m²'} · {p.location || 'Armenia'}</div>
                        <div className="text-[10px] font-mono text-brand-mint/70">{p.investmentTier || '$1.200M COP'}</div>
                      </div>
                    </div>

                    <p className="text-[11px] font-mono text-white/60 line-clamp-2 leading-relaxed">
                      {p.description || 'Estructura vanguardista en el Eje Cafetero.'}
                    </p>

                    {/* Architectural Cell Designation & Progress Telemetry */}
                    <div className="p-2.5 bg-brand-deep/80 rounded border border-white/5 space-y-1.5 font-mono text-[10px]">
                      <div className="flex items-center justify-between text-brand-mint">
                        <span className="font-bold flex items-center gap-1">
                          🏛️ {p.assignedTeam || 'Célula Alpha (Residencial)'}
                        </span>
                        <span className="text-white/40">{p.assignedDate || '2026-09-24'}</span>
                      </div>
                      <div className="text-white/70 truncate">
                        👤 {p.projectLeader || 'Arq. Andrés Echeverri'}
                      </div>
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[9px]">
                          <span className="text-white/50">{p.currentPhase || 'Fase 1: Diseño Bioclimático'}</span>
                          <span className="text-brand-mint font-bold">{p.progressPercentage ?? 25}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-brand-mint h-full rounded-full transition-all duration-500"
                            style={{ width: `${p.progressPercentage ?? 25}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                      <span className="text-[10px] text-white/40">ID: {p.id}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleOpenEditProject(p)}
                          className="p-1.5 hover:bg-white/10 text-brand-mint border border-brand-mint/30 rounded flex items-center gap-1 text-[10px]"
                          title="Editar Proyecto"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1.5 hover:bg-red-950/40 text-red-400 border border-red-500/20 rounded"
                          title="Eliminar Proyecto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 5. CONFIGURACIÓN DEL SISTEMA (HUB UNIFICADO) */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && role === 'admin' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <AdminSettingsHub onShowFeedback={showFeedback} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Project Creation / Editing */}
        {projectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-brand-deep border border-brand-mint/40 rounded-xl p-6 sm:p-8 text-white space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-brand-mint uppercase font-semibold">
                    CATÁLOGO & INVENTARIO DE OBRAS
                  </span>
                  <h3 className="font-editorial-heading text-2xl text-white mt-0.5">
                    {editingProject ? 'Editar Obra & Célula Asignada' : 'Publicar Nuevo Proyecto'}
                  </h3>
                </div>
                <button
                  onClick={() => setProjectModalOpen(false)}
                  className="p-1.5 hover:bg-white/10 text-white/50 hover:text-white rounded-md"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-brand-mint mb-1">Nombre de la Obra:</label>
                    <input
                      type="text"
                      required
                      value={projectFormData.title}
                      onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                      placeholder="Ej: Casa 52 La Reserva"
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-mint mb-1">Categoría / Tipología:</label>
                    <select
                      value={projectFormData.category}
                      onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                    >
                      <option value="Residencial Campestre">Residencial Campestre</option>
                      <option value="Edificación Comercial">Edificación Comercial</option>
                      <option value="Turismo & Glamping">Turismo & Glamping</option>
                      <option value="Remodelación & Refuerzo">Remodelación & Refuerzo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-brand-mint mb-1">Área (m²):</label>
                    <input
                      type="text"
                      value={projectFormData.area}
                      onChange={(e) => setProjectFormData({ ...projectFormData, area: e.target.value })}
                      placeholder="Ej: 420 m²"
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-mint mb-1">Ubicación:</label>
                    <input
                      type="text"
                      value={projectFormData.location}
                      onChange={(e) => setProjectFormData({ ...projectFormData, location: e.target.value })}
                      placeholder="Ej: Armenia, Quindío"
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-mint mb-1">Presupuesto Estimado:</label>
                    <input
                      type="text"
                      value={projectFormData.investmentTier}
                      onChange={(e) => setProjectFormData({ ...projectFormData, investmentTier: e.target.value })}
                      placeholder="Ej: $1.400M COP"
                      className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                    />
                  </div>
                </div>

                {/* Section: Architecture Cell Designation */}
                <div className="p-3.5 bg-brand-surface border border-brand-mint/25 rounded-lg space-y-3">
                  <div className="text-[10px] font-mono text-brand-mint uppercase tracking-wider font-bold">
                    🏛️ DESIGNACIÓN DE CÉLULA & EQUIPO TÉCNICO
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 mb-1">Célula de Arquitectura:</label>
                      <select
                        value={projectFormData.assignedTeam}
                        onChange={(e) => setProjectFormData({ ...projectFormData, assignedTeam: e.target.value })}
                        className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                      >
                        <option value="Célula Alpha (Residencial Campestre)">Célula Alpha (Residencial Campestre)</option>
                        <option value="Célula Beta (Hospitality & Glamping)">Célula Beta (Hospitality & Glamping)</option>
                        <option value="Célula Gamma (Comercial & Salud)">Célula Gamma (Comercial & Salud)</option>
                        <option value="Célula Delta (Remodelación & Refuerzo NSR-10)">Célula Delta (Remodelación & Refuerzo NSR-10)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/70 mb-1">Arquitecto Líder:</label>
                      <select
                        value={projectFormData.projectLeader}
                        onChange={(e) => setProjectFormData({ ...projectFormData, projectLeader: e.target.value })}
                        className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                      >
                        <option value="Arq. Andrés Echeverri (Director de Diseño)">Arq. Andrés Echeverri (Director de Diseño)</option>
                        <option value="Arq. Valentina Morales (Coordinadora Bioclimática)">Arq. Valentina Morales (Coordinadora Bioclimática)</option>
                        <option value="Arq. Mateo Restrepo (Cálculo NSR-10 & Estructura)">Arq. Mateo Restrepo (Cálculo NSR-10 & Estructura)</option>
                        <option value="Arq. Santiago Londoño (Director de Obra)">Arq. Santiago Londoño (Director de Obra)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 mb-1">Fecha de Asignación:</label>
                      <input
                        type="date"
                        value={projectFormData.assignedDate}
                        onChange={(e) => setProjectFormData({ ...projectFormData, assignedDate: e.target.value })}
                        className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 mb-1">Fase Actual del Proyecto:</label>
                      <select
                        value={projectFormData.currentPhase}
                        onChange={(e) => setProjectFormData({ ...projectFormData, currentPhase: e.target.value })}
                        className="w-full bg-brand-deep border border-white/15 px-3 py-2 text-white rounded-md"
                      >
                        <option value="Fase 0: Factibilidad y Lote">Fase 0: Factibilidad y Lote</option>
                        <option value="Fase 1: Diseño Bioclimático">Fase 1: Diseño Bioclimático</option>
                        <option value="Fase 2: Licencias & Cálculo NSR-10">Fase 2: Licencias & Cálculo NSR-10</option>
                        <option value="Fase 3: Estructura & Obra Gris">Fase 3: Estructura & Obra Gris</option>
                        <option value="Fase 4: Acabados de Autor">Fase 4: Acabados de Autor</option>
                        <option value="Fase 5: Entrega & Llave en Mano">Fase 5: Entrega & Llave en Mano</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1 text-[11px]">
                      <label className="text-white/70">Progreso de Ejecución:</label>
                      <span className="text-brand-mint font-bold">{projectFormData.progressPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={projectFormData.progressPercentage}
                      onChange={(e) => setProjectFormData({ ...projectFormData, progressPercentage: Number(e.target.value) })}
                      className="w-full accent-brand-mint cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Notas de Campo & Bitácora Interna:</label>
                    <textarea
                      rows={2}
                      value={projectFormData.fieldNotes}
                      onChange={(e) => setProjectFormData({ ...projectFormData, fieldNotes: e.target.value })}
                      placeholder="Hitos de cimentación, aprobaciones de curaduría, notas técnicas..."
                      className="w-full bg-brand-deep border border-white/15 p-2.5 text-white rounded-md text-xs resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-brand-mint font-bold">Imagen Portada (Asset Local, Web o Google Drive):</label>
                    <span className="text-[10px] text-brand-mint bg-brand-mint/10 border border-brand-mint/30 px-2 py-0.5 rounded font-mono">
                      ⚡ Google Drive Auto-Convert
                    </span>
                  </div>
                  <input
                    type="text"
                    value={projectFormData.coverLocal}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProjectFormData({ ...projectFormData, coverLocal: normalizeMediaUrl(val) });
                    }}
                    placeholder="https://drive.google.com/file/d/... o /extracted/arquitecturia/assets/..."
                    className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                  />
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    💡 <strong className="text-white/60">Soporte directo de Google Drive:</strong> Puedes pegar enlaces compartidos de Google Drive (<code className="text-brand-mint">drive.google.com/file/d/...</code>) y el sistema los convierte en streaming directo de alta definición. Asegúrate de que el archivo tenga permiso <em>"Cualquier persona con el enlace puede ver"</em>.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-brand-mint">Carpeta Google Drive con Planos / Fotos HD (Opcional):</label>
                    <span className="text-[10px] text-white/40 font-mono">Enlace compartido</span>
                  </div>
                  <input
                    type="url"
                    value={projectFormData.driveFolderUrl || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, driveFolderUrl: e.target.value })}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full bg-brand-surface border border-white/15 px-3 py-2 text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-brand-mint mb-1">Memoria Descriptiva & Materiales:</label>
                  <textarea
                    rows={2}
                    value={projectFormData.description}
                    onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                    placeholder="Muros en concreto visto, carpintería en teka y ventanería piso-techo..."
                    className="w-full bg-brand-surface border border-white/15 p-2.5 text-white rounded-md text-xs resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-4 py-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white rounded-md"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-mint text-brand-deep font-architectural text-xs font-bold rounded-md hover:bg-brand-mint-light transition-colors"
                  >
                    {editingProject ? 'GUARDAR CAMBIOS' : 'PUBLICAR EN CATÁLOGO'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Voucher Modal inside DSB */}
        {selectedAppointmentForVoucher && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <PrintableVoucher
              booking={{
                ...selectedAppointmentForVoucher,
                projectInterest: selectedAppointmentForVoucher.projectType || 'Nuevo Proyecto'
              }}
              onPrint={() => window.print()}
              onClose={() => setSelectedAppointmentForVoucher(null)}
            />
          </div>
        )}

        {/* Modal Expedición Dossier Ejecutivo BIM (8 Páginas A4 - Carga Diferida) */}
        <React.Suspense fallback={null}>
          <ExecutiveDossierGenerator
            isOpen={!!selectedLeadForDossier}
            onClose={() => setSelectedLeadForDossier(null)}
            leadData={selectedLeadForDossier}
          />
        </React.Suspense>

        {/* Modal Táctico de Detalle de Cita, Cierre de Obra & Archivo */}
        <AdminAppointmentDetailModal
          appointment={selectedAppointmentForDetail}
          isOpen={!!selectedAppointmentForDetail}
          onClose={() => setSelectedAppointmentForDetail(null)}
          onStatusChange={handleStatusChange}
          onConvertSuccess={handleConvertAppointment}
          onArchiveSuccess={handleArchiveAppointment}
          onOpenVoucher={(appt) => {
            setSelectedAppointmentForDetail(null);
            setSelectedAppointmentForVoucher(appt);
          }}
          onOpenDossier={(appt) => {
            setSelectedAppointmentForDetail(null);
            setSelectedLeadForDossier({
              radId: appt.id,
              clientName: appt.clientName,
              clientEmail: appt.clientEmail,
              clientPhone: appt.clientPhone,
              projectType: appt.projectType,
              lotLocation: appt.lotLocation,
              hasLot: appt.hasLot,
              topography: appt.topography,
              estimatedArea: appt.estimatedArea,
              investmentTier: appt.investmentTier,
              timeline: appt.timeline,
              modality: appt.modality,
              notes: appt.notes
            });
          }}
        />
      </main>
    </div>
  );
};
