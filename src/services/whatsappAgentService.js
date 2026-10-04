// Servicio del Motor Inteligente de WhatsApp Bot
// ArquitecturIA Atelier · Automatización de Calificación, Disponibilidad, Agendamiento y Cancelación en Tiempo Real

import { storageService } from './storageService';

export const whatsappAgentService = {
  // =========================================================================
  // 1. PROCESADOR DE MENSAJES ENTRANTES (NLP LIGERO DETERMINISTA)
  // =========================================================================
  processMessage: (incomingText, sessionContext = {}) => {
    const text = (incomingText || '').trim();
    const lower = text.toLowerCase();
    const appointments = storageService.getAppointments();
    const chatbotSettings = storageService.getChatbotSettings();

    // Contexto de sesión conversacional (para flujo multi-paso)
    const context = {
      step: sessionContext.step || 'idle',
      leadData: sessionContext.leadData || {},
      ...sessionContext
    };

    let reply = '';
    let actionTaken = null; // 'APPOINTMENT_CREATED', 'APPOINTMENT_CANCELLED', 'APPOINTMENT_RESCHEDULED', 'INFO_PROVIDED', 'QUALIFYING'
    let nextStep = 'idle';

    // -----------------------------------------------------------------------
    // INTENCIÓN 1: CANCELAR CITA / ANULAR AGENDA
    // -----------------------------------------------------------------------
    if (
      lower.includes('cancelar') || 
      lower.includes('anular') || 
      lower.includes('no puedo asistir') || 
      lower.includes('cancelación')
    ) {
      // Buscar código de cita en el texto (ej. CITA-9412 o 9412)
      const matchId = text.match(/CITA-\d{4}/i) || text.match(/\b\d{4}\b/);
      let targetApp = null;

      if (matchId) {
        const idSearch = matchId[0].toUpperCase().startsWith('CITA-') ? matchId[0].toUpperCase() : `CITA-${matchId[0]}`;
        targetApp = appointments.find(a => a.id.toUpperCase() === idSearch);
      } else if (context.leadData?.phone) {
        targetApp = appointments.find(a => (a.clientPhone || '').replace(/\D/g, '').includes(context.leadData.phone.replace(/\D/g, '')));
      } else {
        // Tomar la última cita activa de la lista como candidata si no especifica ID
        targetApp = appointments.find(a => a.status === 'Confirmada' || a.status === 'Pendiente');
      }

      if (targetApp) {
        storageService.updateAppointmentStatus(targetApp.id, 'Cancelada');
        actionTaken = 'APPOINTMENT_CANCELLED';
        reply = `Comprendido. Tu cita técnica *${targetApp.id}* programada para el *${targetApp.date}* a las *${targetApp.time}* ha sido *cancelada exitosamente* en nuestro sistema del Atelier.\n\nSi deseas reprogramarla para otra fecha o cuando tengas nuevos avances de tu lote, escríbeme en cualquier momento. Estamos para servirte.`;
      } else {
        reply = `Con gusto te asisto en la cancelación de tu cita. Por favor indícame el código de radicado de tu cita (por ejemplo: *CITA-9412*) o tu número telefónico registrado para ubicarla en la agenda del Atelier.`;
        nextStep = 'awaiting_cancel_code';
      }

      return {
        reply,
        actionTaken,
        nextContext: { ...context, step: nextStep }
      };
    }

    // -----------------------------------------------------------------------
    // INTENCIÓN 2: CONSULTAR DISPONIBILIDAD DE AGENDA
    // -----------------------------------------------------------------------
    if (
      lower.includes('disponibilidad') || 
      lower.includes('disponible') || 
      lower.includes('horarios') || 
      lower.includes('qué días') || 
      lower.includes('que dias') || 
      lower.includes('agenda libre')
    ) {
      // Generar 3 slots inteligentes de atención técnica
      const d1 = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
      const d2 = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
      const d3 = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];

      reply = `Actualmente nuestra Dirección Técnica cuenta con los siguientes cupos disponibles para Evaluación de Proyecto:\n\n` +
        `📅 *1. ${d1}* · 10:00 AM (Presencial o Google Meet)\n` +
        `📅 *2. ${d2}* · 03:30 PM (Presencial o Google Meet)\n` +
        `📅 *3. ${d3}* · 11:00 AM (Presencial o Google Meet)\n\n` +
        `Para agendar uno de estos cupos, indícame la opción que prefieres y si ya cuentas con lote propio en el Eje Cafetero.`;

      return {
        reply,
        actionTaken: 'AVAILABILITY_CHECKED',
        nextContext: { ...context, step: 'awaiting_slot_selection' }
      };
    }

    // -----------------------------------------------------------------------
    // INTENCIÓN 3: REPROGRAMAR CITA
    // -----------------------------------------------------------------------
    if (
      lower.includes('reprogramar') || 
      lower.includes('cambiar fecha') || 
      lower.includes('cambiar hora') || 
      lower.includes('aplazar')
    ) {
      const activeApp = appointments.find(a => a.status === 'Confirmada' || a.status === 'Pendiente');
      const newDate = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

      if (activeApp) {
        storageService.rescheduleAppointment(activeApp.id, newDate, '04:00 PM');
        actionTaken = 'APPOINTMENT_RESCHEDULED';
        reply = `¡Cita reprogramada con éxito! Tu sesión *${activeApp.id}* con la Dirección Técnica ha sido trasladada para el *${newDate}* a las *04:00 PM*.\n\nEnlace de acceso a la sala: ${activeApp.meetUrl}`;
      } else {
        reply = `Para reprogramar tu cita, por favor indícame tu código de radicado (ej: *CITA-9412*) y la nueva fecha o jornada en la que deseas atender la reunión técnica.`;
        nextStep = 'awaiting_reschedule_info';
      }

      return {
        reply,
        actionTaken,
        nextContext: { ...context, step: nextStep }
      };
    }

    // -----------------------------------------------------------------------
    // INTENCIÓN 4: AGENDAR NUEVA CITA / CALIFICAR LEAD
    // -----------------------------------------------------------------------
    if (
      lower.includes('agendar') || 
      lower.includes('cita') || 
      lower.includes('reunion') || 
      lower.includes('reunión') || 
      lower.includes('evaluar proyecto') ||
      lower.includes('tengo un lote') ||
      lower.includes('quiero construir')
    ) {
      // Detección heurística de lote propio
      const hasLot = lower.includes('lote propio') || lower.includes('tengo lote') || lower.includes('mi lote')
        ? 'Lote Propio Escriturado'
        : lower.includes('buscando lote') || lower.includes('sin lote')
        ? 'Buscando Terreno'
        : 'Por Definir / En Estudio';

      // Detección de municipio
      let mun = 'Armenia / Quindío';
      if (lower.includes('circasia')) mun = 'Circasia, Quindío';
      else if (lower.includes('salento')) mun = 'Salento, Quindío';
      else if (lower.includes('filandia')) mun = 'Filandia, Quindío';
      else if (lower.includes('pereira') || lower.includes('cerritos')) mun = 'Pereira / Cerritos';
      else if (lower.includes('manizales')) mun = 'Manizales, Caldas';
      else if (lower.includes('quimbaya')) mun = 'Quimbaya, Quindío';

      // Si el mensaje trae suficientes datos o solicita agendamiento directo
      if (lower.includes('opcion 1') || lower.includes('opción 1') || lower.includes('10:00') || lower.includes('3:30') || lower.includes('confirmar')) {
        const clientName = context.leadData?.name || 'Cliente Inversionista';
        const clientPhone = context.leadData?.phone || '+57 300 890 2400';
        const assignDate = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

        const newApp = storageService.addAppointment({
          clientName,
          clientPhone,
          clientEmail: 'contacto.whatsapp@inversionista.com',
          projectType: 'Residencial Campestre de Lujo',
          lotLocation: mun,
          hasLot,
          estimatedArea: '350 – 650 m²',
          investmentTier: '$1.500M – $3.000M COP',
          date: assignDate,
          time: '10:00 AM',
          modality: 'Presencial en Atelier ArquitecturIA / Google Meet',
          notes: `Radicado creado automáticamente por el Agente WhatsApp Bot. Solicitud: "${text}"`,
          status: 'Confirmada'
        });

        actionTaken = 'APPOINTMENT_CREATED';
        reply = `🏛️ *¡Cita Técnica Agendada Exitosamente!*\n\n` +
          `📋 *Radicado:* ${newApp.id}\n` +
          `👤 *Titular:* ${clientName}\n` +
          `🏡 *Condición Terreno:* ${hasLot} (${mun})\n` +
          `📅 *Fecha:* ${assignDate} · 10:00 AM\n` +
          `📍 *Lugar:* Atelier ArquitecturIA (Armenia, Quindío)\n` +
          `💻 *Enlace Google Meet:* ${newApp.meetUrl}\n\n` +
          `El registro ya está activo en nuestro Dashboard administrativo. Un arquitecto directivo estará esperándote puntualmente. Si necesitas modificarla o cancelarla, solo indícalo aquí.`;

        return {
          reply,
          actionTaken,
          appointmentCreated: newApp,
          nextContext: { step: 'idle', leadData: {} }
        };
      }

      // Si está en etapa de preguntas de calificación
      reply = `Con el mayor gusto. En ArquitecturIA Atelier estructuramos proyectos de alto estatus en el Paisaje Cultural Cafetero.\n\n` +
        `Para preparar la información técnica antes de reunirnos, por favor compárteme:\n` +
        `1️⃣ ¿Cuentas con *lote propio* o estás en proceso de búsqueda?\n` +
        `2️⃣ ¿En qué *municipio o sector* se ubica el terreno?\n` +
        `3️⃣ ¿Qué *área aproximada* de construcción tienes proyectada?\n\n` +
        `Puedes responder en un solo mensaje o por partes y coordinamos de inmediato la fecha de atención.`;

      return {
        reply,
        actionTaken: 'QUALIFYING',
        nextContext: { ...context, step: 'collecting_lot_info' }
      };
    }

    // -----------------------------------------------------------------------
    // INTENCIÓN 5: PRECIOS PARAMÉTRICOS & COSTOS POR M²
    // -----------------------------------------------------------------------
    if (
      lower.includes('costo') || 
      lower.includes('cuanto cuesta') || 
      lower.includes('cuánto cuesta') || 
      lower.includes('metro cuadrado') || 
      lower.includes('m2') || 
      lower.includes('precio') || 
      lower.includes('presupuesto')
    ) {
      reply = `Nuestras obras arquitectónicas se estructuran entre *$4.8M y $8.2M COP por m²* construida, según la especificación técnica elegida:\n\n` +
        `▫️ *Alto Estatus:* Concreto visto cepillado, ventanería piso-techo y estructura NSR-10.\n` +
        `▫️ *Signature ArquitecturIA:* Encofrado fenólico de matriz limpia, maderas teka curadas y bioclimática pasiva.\n` +
        `▫️ *Ultra Lujo Monolítico:* Piedras de cantera, mármol travertino, voladizos suspendidos y domótica integral.\n\n` +
        `¿Tienes un terreno propio en el que desees estimar el presupuesto de obra?`;

      return {
        reply,
        actionTaken: 'INFO_PROVIDED',
        nextContext: { ...context, step: 'awaiting_lot_interest' }
      };
    }

    // -----------------------------------------------------------------------
    // RESPUESTA POR DEFECTO / BIENVENIDA DEL CONCIERGE WHATSAPP
    // -----------------------------------------------------------------------
    reply = `Hola, bienvenido a *ArquitecturIA Atelier*. Soy el Agente Técnico Automatizado del Atelier en Armenia, Quindío.\n\n` +
      `¿En qué puedo orientarte hoy?\n` +
      `▫️ Escribe *\"Disponibilidad\"* para ver fechas de reunión técnica.\n` +
      `▫️ Escribe *\"Agendar Cita\"* para evaluar tu lote o terreno.\n` +
      `▫️ Escribe *\"Costos m²\"* para conocer el rango de inversión.\n` +
      `▫️ Escribe *\"Cancelar Cita\"* si deseas anular una sesión previa.`;

    return {
      reply,
      actionTaken: 'GREETING_PROVIDED',
      nextContext: { ...context, step: 'idle' }
    };
  }
};
