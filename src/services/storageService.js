// Storage Service for ArquitecturIA Atelier
// Manages Project Analysis Appointments, WhatsApp Bot Automation, Projects CRUD, CMS and Atmosphere

import { PROJECTS_DATA } from '../data/projectsData';
import { TRACKING_PROJECTS_DATA } from '../data/trackingData';
import { syncAppointmentToCloud, fetchCloudAppointments, isSupabaseConnected } from './supabaseClient';

const STORAGE_KEYS = {
  APPOINTMENTS: 'arquitecturia_project_appointments_v2',
  CUSTOM_PROJECTS: 'arquitecturia_custom_projects_v4',
  TRACKING_PROJECTS: 'arquitecturia_tracking_projects_v2',
  CMS: 'arquitecturia_cms_content_v2',
  SOCIAL_LINKS: 'arquitecturia_social_links_v1',
  CHATBOT_SETTINGS: 'arquitecturia_chatbot_settings_v1',
  PUBLIC_ATMOSPHERE: 'arquitecturia_public_atmosphere_id',
  CREDS: 'arquitecturia_admin_creds_v1',
  SESSION: 'arquitecturia_admin_session_v1',
  THEME: 'arquitecturia_theme_tokens_v1',
  CONTACTS: 'arquitecturia_contacts_submissions_v1'
};

const DEFAULT_APPOINTMENTS = [
  {
    id: 'CITA-9412',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    clientName: 'Dr. Alejandro Restrepo',
    clientEmail: 'alejandro.restrepo@inversionesandinas.co',
    clientPhone: '+57 312 456 7890',
    projectType: 'Residencial Campestre de Lujo',
    lotLocation: 'Circasia, Quindío (Lote 2.400 m²)',
    estimatedArea: '480 m²',
    investmentTier: '$1.200M - $1.800M COP',
    modality: 'Reunión Virtual vía Google Meet',
    date: '2026-09-26',
    time: '10:00 AM',
    notes: 'Cuenta con topografía semiquebrada y vista a la cordillera. Requiere análisis bioclimático.',
    status: 'Confirmada',
    meetUrl: 'https://meet.google.com/sim-arc-qnd',
    whatsappBot: {
      status: 'Confirmada por WhatsApp',
      messageSent: true,
      lastMessage: 'Hola Dr. Alejandro Restrepo, su Cita para Análisis de Proyecto ha sido confirmada para el 2026-09-26 a las 10:00 AM.',
      morningReminderScheduled: true,
      morningReminderSent: false,
      confirmedAt: new Date(Date.now() - 3600000 * 20).toISOString()
    }
  },
  {
    id: 'CITA-9413',
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    clientName: 'Carolina Gómez & Mauricio Zuluaga',
    clientEmail: 'carolina.gomez@grupozuluaga.com',
    clientPhone: '+57 310 987 6543',
    projectType: 'Complejo Turístico & Cabañas Boutique',
    lotLocation: 'Salento, Quindío (Finca El Mirador)',
    estimatedArea: '850 m²',
    investmentTier: '$2.000M - $3.500M COP',
    modality: 'Presencial en Atelier ArquitecturIA (Armenia)',
    date: '2026-09-28',
    time: '03:30 PM',
    notes: 'Interés en 6 módulos habitacionales de madera teka y concreto con alta rentabilidad hotelera.',
    status: 'Pendiente',
    meetUrl: 'https://meet.google.com/sim-tur-sal',
    whatsappBot: {
      status: 'Mensaje de confirmación enviado',
      messageSent: true,
      lastMessage: 'Hola Carolina Gómez, tienes una Cita para Análisis de Proyecto programada para el 2026-09-28 a las 03:30 PM. ¿Deseas confirmar tu cita? Responde SI para confirmar.',
      morningReminderScheduled: true,
      morningReminderSent: false
    }
  },
  {
    id: 'CITA-9414',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    clientName: 'Felipe Santamaría',
    clientEmail: 'fsantamaria@capitalpartners.com.co',
    clientPhone: '+57 315 223 3445',
    projectType: 'Edificación Comercial & Negocios',
    lotLocation: 'Avenida Centenario, Armenia',
    estimatedArea: '620 m²',
    investmentTier: 'Más de $3.000M COP',
    modality: 'Reunión Virtual vía Google Meet',
    date: '2026-09-29',
    time: '11:00 AM',
    notes: 'Inversionista residente en Miami. Requiere análisis de retorno y factibilidad estructural NSR-10.',
    status: 'Confirmada',
    meetUrl: 'https://meet.google.com/sim-com-arm',
    whatsappBot: {
      status: 'Confirmada por WhatsApp',
      messageSent: true,
      lastMessage: 'Hola Felipe Santamaría, confirmación recibida con éxito. Te esperamos en Meet: https://meet.google.com/sim-com-arm.',
      morningReminderScheduled: true,
      morningReminderSent: true,
      confirmedAt: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  }
];

const DEFAULT_CMS = {
  heroTitle: 'ARQUITECTURIA',
  heroSubtitle: 'ARQUITECTURA DE ALTO ESTATUS',
  tagline: 'Proyectamos y materializamos arquitectura de alto estatus en el Paisaje Cultural Cafetero.',
  announcement: 'Atención personalizada para nuevos proyectos residenciales, comerciales y turísticos en el Eje Cafetero.',
  contactPhone: '+57 300 890 2400',
  contactEmail: 'contacto@arquitecturia.co',
  whatsappNumber: '573008902400',
  pillarsHeadline: 'Pilares de Creación',
  pillarsSubhead: 'Nuestra práctica se fundamenta en principios constructivos innegociables que desafían la arquitectura descartable.'
};

const DEFAULT_SOCIAL_LINKS = {
  whatsappUrl: 'https://wa.me/573008902400?text=Hola%20ArquitecturIA,%20deseo%20asesor%C3%ADa%20para%20un%20nuevo%20proyecto.',
  instagramUrl: 'https://instagram.com/arquitecturia.studio',
  phone: '+57 300 890 2400',
  mapsUrl: 'https://maps.google.com/?q=Armenia,+Quindio,+Colombia',
  linkedinUrl: 'https://linkedin.com/company/arquitecturia-atelier',
  address: 'Armenia, Quindío · Cordillera Central de Colombia'
};

const DEFAULT_CHATBOT_SETTINGS = {
  enabled: true,
  agentName: 'Concierge Arquitectónico ArquitecturIA',
  welcomeMessage: 'Bienvenido a ArquitecturIA Atelier. Soy tu Asesor Arquitectónico Virtual. ¿En qué obra, tipología o plan de inversión deseas profundizar hoy?',
  systemPrompt: 'Eres el Asesor Arquitectónico Virtual de ArquitecturIA Atelier en Armenia, Quindío. Tu tono es sofisticado, sobrio, técnico y de alto estatus. Promueves la arquitectura honesta (concreto visto fenólico, maderas nobles curadas, NSR-10) e invitas a agendar una Cita para Análisis de Proyecto.',
  costPerM2Min: 4800000,
  costPerM2Max: 8200000,
  faqs: [
    {
      id: 'faq-1',
      question: '¿Cuál es el costo estimado por metro cuadrado?',
      answer: 'Nuestras obras se estructuran entre $4.8M y $8.2M COP por m² según especificación técnica (concreto visto, teka curada, mármol travertino y ventanería 3.2m).'
    },
    {
      id: 'faq-2',
      question: '¿Cómo funciona la Cita para Análisis de Proyecto?',
      answer: 'Coordinamos una sesión virtual vía Google Meet o presencial en nuestro estudio de Armenia para evaluar topografía del lote, normativa urbanística y presupuesto preliminar.'
    },
    {
      id: 'faq-3',
      question: '¿Qué tipologías desarrollan?',
      answer: 'Estructuramos proyectos residenciales campestres de lujo, complejos turísticos y suites boutique de alta rentabilidad, y edificaciones comerciales en el Eje Cafetero.'
    }
  ]
};
/**
 * Normalizador inteligente de URLs de imágenes y medios.
 * Detecta enlaces compartidos de Google Drive y los convierte automáticamente
 * en un stream directo de imagen en alta resolución (hasta 1600px).
 * También preserva URLs web directas (https://...) y rutas de assets locales (/extracted/...).
 */
export const normalizeMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  // Detecta URLs de Google Drive:
  // - https://drive.google.com/file/d/ID/view?usp=sharing
  // - https://drive.google.com/open?id=ID
  // - https://docs.google.com/file/d/ID
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]+)/;
  const match = trimmed.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
  }
  return trimmed;
};

export const storageService = {
  // =========================================================================
  // 1. APPOINTMENTS (Citas para Análisis de Proyecto & WhatsApp Bot)
  // =========================================================================
  getAppointments: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
        return DEFAULT_APPOINTMENTS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_APPOINTMENTS;
    }
  },

  // Backwards compatibility alias
  getBookings: () => {
    return storageService.getAppointments();
  },

  addAppointment: (data) => {
    try {
      const current = storageService.getAppointments();
      const code = Math.random().toString(36).substring(2, 6);
      const meetUrl = `https://meet.google.com/sim-${code}-${Math.random().toString(36).substring(2, 5)}`;
      const cleanPhone = (data.clientPhone || '').replace(/\D/g, '');
      const clientName = data.clientName || 'Cliente';

      const whatsappMessage = `Hola ${clientName}, hemos recibido tu solicitud de Cita para Análisis de Proyecto con ArquitecturIA Atelier para el día ${data.date || 'próximo'} a las ${data.time || 'hora acordada'}. Tu enlace de Google Meet es: ${meetUrl}. ¿Deseas confirmar tu cita? Responde SI para confirmar.`;

      const newAppointment = {
        id: `CITA-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: 'Pendiente',
        meetUrl,
        whatsappBot: {
          status: 'Mensaje de confirmación enviado',
          messageSent: true,
          lastMessage: whatsappMessage,
          morningReminderScheduled: true,
          morningReminderSent: false,
          dispatchedAt: new Date().toISOString()
        },
        ...data
      };

      const updated = [newAppointment, ...current];
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: newAppointment }));
      }

      // Background cloud sync (fire-and-forget, zero blocking)
      syncAppointmentToCloud(newAppointment).catch(e => console.warn('[Supabase Sync]:', e));

      return newAppointment;
    } catch (err) {
      console.error('Error adding appointment:', err);
      return null;
    }
  },

  addBooking: (booking) => {
    return storageService.addAppointment(booking);
  },

  getContacts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addContact: (data) => {
    try {
      const current = storageService.getContacts();
      const newContact = {
        id: `RAD-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: 'Nuevo Lead Calificado',
        ...data
      };
      const updated = [newContact, ...current];
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-contacts-updated', { detail: newContact }));
      }
      return newContact;
    } catch (err) {
      console.error('Error adding contact submission:', err);
      return null;
    }
  },

  updateAppointmentStatus: (id, newStatus) => {
    try {
      const current = storageService.getAppointments();
      let updatedTarget = null;
      const updated = current.map(item => {
        if (item.id === id) {
          const isConfirm = newStatus === 'Confirmada';
          updatedTarget = {
            ...item,
            status: newStatus,
            whatsappBot: {
              ...item.whatsappBot,
              status: isConfirm ? 'Confirmada por WhatsApp' : item.whatsappBot?.status,
              confirmedAt: isConfirm ? new Date().toISOString() : item.whatsappBot?.confirmedAt
            }
          };
          return updatedTarget;
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updated }));
      }

      // Background cloud sync
      if (updatedTarget) {
        syncAppointmentToCloud(updatedTarget).catch(e => console.warn('[Supabase Status Sync]:', e));
      }

      return updated;
    } catch (err) {
      console.error('Error updating appointment status:', err);
      return null;
    }
  },

  updateBookingStatus: (id, newStatus) => {
    return storageService.updateAppointmentStatus(id, newStatus);
  },

  cancelAppointment: (id, reason = 'Cancelada por solicitud del cliente vía WhatsApp') => {
    return storageService.updateAppointmentStatus(id, 'Cancelada');
  },

  rescheduleAppointment: (id, newDate, newTime) => {
    try {
      const current = storageService.getAppointments();
      let updatedTarget = null;
      const updated = current.map(item => {
        if (item.id === id) {
          updatedTarget = {
            ...item,
            date: newDate || item.date,
            time: newTime || item.time,
            status: 'Confirmada',
            whatsappBot: {
              ...item.whatsappBot,
              status: 'Reprogramada por WhatsApp',
              rescheduledAt: new Date().toISOString()
            }
          };
          return updatedTarget;
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updated }));
      }
      return updatedTarget;
    } catch (err) {
      console.error('Error rescheduling appointment:', err);
      return null;
    }
  },

  // Simulates or triggers WhatsApp Morning Reminder (7:00 AM)
  sendMorningReminder: (id) => {
    try {
      const current = storageService.getAppointments();
      const updated = current.map(item => {
        if (item.id === id) {
          return {
            ...item,
            whatsappBot: {
              ...item.whatsappBot,
              status: 'Recordatorio Matutino Enviado (7:00 AM)',
              morningReminderSent: true,
              lastMessage: `Buenos días ${item.clientName}, hoy es tu Cita para Análisis de Proyecto a las ${item.time}. Enlace de Google Meet: ${item.meetUrl}.`,
              reminderSentAt: new Date().toISOString()
            }
          };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updated }));
      }
      return updated;
    } catch (err) {
      console.error('Error sending morning reminder:', err);
      return null;
    }
  },

  deleteAppointment: (id) => {
    try {
      const current = storageService.getAppointments();
      const updated = current.filter(b => b.id !== id);
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updated }));
      }
      return updated;
    } catch (err) {
      console.error('Error deleting appointment:', err);
      return null;
    }
  },

  deleteBooking: (id) => {
    return storageService.deleteAppointment(id);
  },

  // Archivar cita para no saturar la agenda, preservando el historial de intereses
  archiveAppointment: (id, archiveNotes = '') => {
    try {
      const current = storageService.getAppointments();
      let updatedTarget = null;
      const updated = current.map(item => {
        if (item.id === id) {
          updatedTarget = {
            ...item,
            status: 'Archivada',
            archiveNotes: archiveNotes || item.archiveNotes || 'Archivada para seguimiento comercial futuro',
            archivedAt: new Date().toISOString()
          };
          return updatedTarget;
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updated }));
      }
      return updatedTarget;
    } catch (err) {
      console.error('Error archiving appointment:', err);
      return null;
    }
  },

  unarchiveAppointment: (id) => {
    try {
      const current = storageService.getAppointments();
      let updatedTarget = null;
      const updated = current.map(item => {
        if (item.id === id) {
          updatedTarget = {
            ...item,
            status: 'Pendiente',
            archivedAt: null
          };
          return updatedTarget;
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updated }));
      }
      return updatedTarget;
    } catch (err) {
      console.error('Error unarchiving appointment:', err);
      return null;
    }
  },

  // =========================================================================
  // 1.1 SEGUIMIENTO DE OBRAS ACTIVAS & CIERRE DE TRATOS (CLIENT TRACKER)
  // =========================================================================
  getTrackingProjects: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRACKING_PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TRACKING_PROJECTS, JSON.stringify(TRACKING_PROJECTS_DATA));
        return TRACKING_PROJECTS_DATA;
      }
      return JSON.parse(data);
    } catch {
      return TRACKING_PROJECTS_DATA;
    }
  },

  saveTrackingProjects: (projects) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRACKING_PROJECTS, JSON.stringify(projects));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-tracking-updated', { detail: projects }));
      }
      return projects;
    } catch (err) {
      console.error('Error saving tracking projects:', err);
      return null;
    }
  },

  // Convierte una cita en una Obra Activa oficial con contrato de seguimiento
  convertAppointmentToActiveProject: (appointmentId, projectPayload = {}) => {
    try {
      const appointments = storageService.getAppointments();
      const targetAppt = appointments.find(a => a.id === appointmentId);
      if (!targetAppt) throw new Error('Cita no encontrada');

      const existingTracking = storageService.getTrackingProjects();
      const year = new Date().getFullYear();
      const nextNum = String(existingTracking.length + 1).padStart(3, '0');
      const contractCode = projectPayload.contractCode || `SIM-${year}-${nextNum}`;
      const cleanPhone = (targetAppt.clientPhone || '').replace(/\D/g, '');

      const newTrackingProject = {
        contractCode,
        clientPhone: cleanPhone || '3000000000',
        clientName: projectPayload.clientName || targetAppt.clientName,
        projectTitle: projectPayload.projectTitle || `Residencia Campestre · ${targetAppt.clientName}`,
        location: projectPayload.location || targetAppt.lotLocation || 'Armenia, Quindío · Eje Cafetero',
        area: projectPayload.area || targetAppt.estimatedArea || '380 m²',
        startDate: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
        estimatedDelivery: projectPayload.estimatedDelivery || `Diciembre ${year + 1}`,
        residentArchitect: projectPayload.residentArchitect || 'Arq. Director Residente ArquitecturIA',
        residentPhone: '573008902400',
        overallProgress: projectPayload.initialProgress || 5,
        statusBadge: 'EN EJECUCIÓN · ACTA DE INICIO SUSCRITA',
        coverImage: projectPayload.coverImage || '/extracted/arquitecturia/assets/hero-residence-1.jpg',
        phases: [
          { id: 'p1', name: 'Preliminares, Replanteo Topográfico & Cerramiento', progress: 80, status: 'En Ejecución', date: 'Fase Inicial' },
          { id: 'p2', name: 'Cimentación, Zapatas & Muros de Contención NSR-10', progress: 0, status: 'Programado', date: 'Próxima Fase' },
          { id: 'p3', name: 'Estructura Portante & Placas de Concreto Visto', progress: 0, status: 'Programado', date: 'Pendiente' },
          { id: 'p4', name: 'Mampostería, Redes Hidrosanitarias & Eléctricas', progress: 0, status: 'Programado', date: 'Pendiente' },
          { id: 'p5', name: 'Acabados Nobles, Ventanería & Maderas Tropicales', progress: 0, status: 'Programado', date: 'Pendiente' }
        ],
        fieldLog: [
          {
            id: `log-${Date.now()}`,
            date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
            title: 'Suscripción de Contrato & Replanteo de Obra',
            description: `Se protocolizó con éxito el contrato ${contractCode} con ${targetAppt.clientName}. Inicio de labores de topografía preliminar y adecuación de vías internas del lote.`,
            image: '/extracted/arquitecturia/assets/hero-residence-1.jpg'
          }
        ],
        latestCommittee: {
          date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
          number: 'Comité de Apertura Contractual N° 01',
          attendees: ['Gerencia General ArquitecturIA', 'Dirección de Obra', targetAppt.clientName],
          decisions: [
            'Firma de acta de inicio y aprobación de cronograma maestro.',
            'Asignación de clave de seguimiento para el portal de clientes.',
            'Coordinación de despacho de campamento de obra.'
          ],
          nextMilestone: 'Acta de replanteo topográfico y excavación de zapatas.'
        }
      };

      // 1. Guardar en seguimiento
      const updatedTracking = [newTrackingProject, ...existingTracking];
      storageService.saveTrackingProjects(updatedTracking);

      // 2. Actualizar estado de la cita a 'Cerrada · Obra Activa'
      const updatedAppointments = appointments.map(a => {
        if (a.id === appointmentId) {
          return {
            ...a,
            status: 'Cerrada · Obra Activa',
            contractCode,
            closedAt: new Date().toISOString(),
            closureNotes: `Negocio cerrado con éxito. Asignado a Obra de Seguimiento con código ${contractCode}.`
          };
        }
        return a;
      });
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updatedAppointments));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-appointments-updated', { detail: updatedAppointments }));
      }

      return {
        success: true,
        contractCode,
        project: newTrackingProject
      };
    } catch (err) {
      console.error('Error converting appointment to active project:', err);
      return { success: false, error: err.message };
    }
  },

  // =========================================================================
  // 2. PROJECTS CRUD (Publicar y Editar Proyectos desde el DSB)
  // =========================================================================
  getProjects: () => {
    try {
      const storedRaw = localStorage.getItem(STORAGE_KEYS.CUSTOM_PROJECTS);
      if (!storedRaw) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_PROJECTS, JSON.stringify(PROJECTS_DATA));
        return PROJECTS_DATA;
      }
      const stored = JSON.parse(storedRaw);
      if (!Array.isArray(stored) || stored.length === 0) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_PROJECTS, JSON.stringify(PROJECTS_DATA));
        return PROJECTS_DATA;
      }

      // Merge strategy: Always guarantee that all 24 canonical projects have their official full galleries,
      // while preserving any user-added custom projects or edited details
      const canonicalMap = new Map(PROJECTS_DATA.map(p => [p.id, p]));
      const userCustomProjects = stored.filter(p => !canonicalMap.has(p.id));

      const mergedCanonical = PROJECTS_DATA.map(canonicalProj => {
        const userEdit = stored.find(p => p.id === canonicalProj.id);
        if (!userEdit) return canonicalProj;
        return {
          ...canonicalProj,
          ...userEdit,
          // Always ensure the full official galleries are never wiped or reduced by old state
          coverLocal: userEdit.coverLocal || canonicalProj.coverLocal,
          galleryLocal: (userEdit.galleryLocal && userEdit.galleryLocal.length >= canonicalProj.galleryLocal.length)
            ? userEdit.galleryLocal
            : canonicalProj.galleryLocal,
          totalImages: Math.max(userEdit.totalImages || 0, canonicalProj.totalImages || canonicalProj.galleryLocal.length)
        };
      });

      const fullMerged = [...mergedCanonical, ...userCustomProjects];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PROJECTS, JSON.stringify(fullMerged));
      return fullMerged;
    } catch {
      return PROJECTS_DATA;
    }
  },

  saveProject: (projectData) => {
    try {
      const current = storageService.getProjects();
      const existsIndex = current.findIndex(p => p.id === projectData.id);

      const normalizedCover = normalizeMediaUrl(projectData.coverLocal);
      const normalizedGallery = Array.isArray(projectData.galleryLocal)
        ? projectData.galleryLocal.map(normalizeMediaUrl)
        : (normalizedCover ? [normalizedCover] : ['/extracted/arquitecturia/assets/hero-concrete-tower.jpg']);

      const normalizedData = {
        ...projectData,
        coverLocal: normalizedCover || '/extracted/arquitecturia/assets/hero-concrete-tower.jpg',
        galleryLocal: normalizedGallery.length ? normalizedGallery : ['/extracted/arquitecturia/assets/hero-concrete-tower.jpg']
      };

      let updated;
      if (existsIndex >= 0) {
        // Edit existing project
        updated = [...current];
        updated[existsIndex] = {
          ...updated[existsIndex],
          ...normalizedData,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Create new project
        const newId = projectData.id || `obra-${Date.now().toString().slice(-4)}`;
        const newProject = {
          ...normalizedData,
          id: newId,
          createdAt: new Date().toISOString()
        };
        updated = [newProject, ...current];
      }

      localStorage.setItem(STORAGE_KEYS.CUSTOM_PROJECTS, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('Error saving project:', err);
      return null;
    }
  },

  deleteProject: (id) => {
    try {
      const current = storageService.getProjects();
      const updated = current.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PROJECTS, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('Error deleting project:', err);
      return null;
    }
  },

  // =========================================================================
  // 3. CMS & ZONAS DE LA PÁGINA (Titulares, Subtítulos y Canales)
  // =========================================================================
  getCms: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CMS);
      return data ? { ...DEFAULT_CMS, ...JSON.parse(data) } : DEFAULT_CMS;
    } catch {
      return DEFAULT_CMS;
    }
  },

  saveCms: (content) => {
    try {
      const current = storageService.getCms();
      const merged = { ...current, ...content, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(merged));
      return merged;
    } catch (err) {
      console.error('Error saving CMS content:', err);
      return null;
    }
  },

  // =========================================================================
  // 4. ATMÓSFERA OFICIAL DEL INDEX (Configurable desde el DSB)
  // =========================================================================
  getPublicAtmosphere: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PUBLIC_ATMOSPHERE) || 'zen';
    } catch {
      return 'zen';
    }
  },

  setPublicAtmosphere: (atmosphereId) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PUBLIC_ATMOSPHERE, atmosphereId);
      localStorage.setItem('arquitecturia_atmosphere_id', atmosphereId);
      return true;
    } catch (err) {
      console.error('Error setting public atmosphere:', err);
      return false;
    }
  },

  // =========================================================================
  // 5. MASTER SECURITY CREDENTIALS & SESSION
  // =========================================================================
  getCredentials: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CREDS);
      return data ? JSON.parse(data) : { username: 'admin', password: '12345678' };
    } catch {
      return { username: 'admin', password: '12345678' };
    }
  },

  updateCredentials: (username, password) => {
    try {
      const creds = { username, password, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.CREDS, JSON.stringify(creds));
      return true;
    } catch {
      return false;
    }
  },

  getSession: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSession: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
        user,
        loggedInAt: new Date().toISOString()
      }));
    } catch (err) {
      console.error(err);
    }
  },

  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getThemeTokens: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.THEME);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveThemeTokens: (tokens) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(tokens));
    } catch (err) {
      console.error(err);
    }
  },

  // =========================================================================
  // 6. SOCIAL LINKS & OFFICIAL CHANNELS
  // =========================================================================
  getSocialLinks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SOCIAL_LINKS);
      return data ? { ...DEFAULT_SOCIAL_LINKS, ...JSON.parse(data) } : DEFAULT_SOCIAL_LINKS;
    } catch {
      return DEFAULT_SOCIAL_LINKS;
    }
  },

  saveSocialLinks: (links) => {
    try {
      const current = storageService.getSocialLinks();
      const merged = { ...current, ...links, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.SOCIAL_LINKS, JSON.stringify(merged));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-socials-updated', { detail: merged }));
      }
      return merged;
    } catch (err) {
      console.error('Error saving social links:', err);
      return null;
    }
  },

  // =========================================================================
  // 7. CHATBOT ARCHITECTURAL CONCIERGE TRAINER
  // =========================================================================
  getChatbotSettings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHATBOT_SETTINGS);
      return data ? { ...DEFAULT_CHATBOT_SETTINGS, ...JSON.parse(data) } : DEFAULT_CHATBOT_SETTINGS;
    } catch {
      return DEFAULT_CHATBOT_SETTINGS;
    }
  },

  saveChatbotSettings: (settings) => {
    try {
      const current = storageService.getChatbotSettings();
      const merged = { ...current, ...settings, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.CHATBOT_SETTINGS, JSON.stringify(merged));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arquitecturia-chatbot-updated', { detail: merged }));
      }
      return merged;
    } catch (err) {
      console.error('Error saving chatbot settings:', err);
      return null;
    }
  }
};
