// Webhook & Calendar Integration Service
// ArquitecturIA Atelier · Automatización de Citas y Google Meet

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/appointment-webhook`
  : '';

/**
 * Dispara el webhook serverless para envío de WhatsApp Cloud API y Google Meet
 */
export async function dispatchAppointmentWebhook(appointment) {
  if (!EDGE_FUNCTION_URL || EDGE_FUNCTION_URL.includes('your-project')) {
    // Retorno de simulación controlada para entorno offline / local
    return {
      success: true,
      simulated: true,
      message: 'WhatsApp Cloud API HSM simulated & Morning Reminder Scheduled at 7:00 AM',
      meetUrl: appointment.meetUrl
    };
  }

  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || ''}`
      },
      body: JSON.stringify(appointment)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, error: errData.error || `HTTP ${res.status}` };
    }

    return await res.json();
  } catch (err) {
    console.warn('[Webhook Dispatch Fallback]: Running local offline', err);
    return { success: true, offline: true, meetUrl: appointment.meetUrl };
  }
}

/**
 * Genera un enlace directo para añadir la Cita a Google Calendar con 1 solo clic
 */
export function generateGoogleCalendarUrl(appointment) {
  if (!appointment || !appointment.date) return '#';

  const title = encodeURIComponent(`Cita Análisis de Proyecto · ArquitecturIA Atelier (${appointment.id})`);
  const details = encodeURIComponent(
    `Reunión de Análisis de Proyecto Arquitectónico con ArquitecturIA Atelier.\n\n` +
    `👤 Cliente: ${appointment.clientName}\n` +
    `📞 Teléfono: ${appointment.clientPhone}\n` +
    `📍 Ubicación / Modalidad: ${appointment.modality || 'Reunión Virtual'}\n` +
    `📐 Tipología: ${appointment.projectType}\n` +
    `🔗 Enlace de Google Meet: ${appointment.meetUrl}\n\n` +
    `Norma Sismorresistente NSR-10 · Arquitectura Bioclimática & Pasiva.`
  );
  const location = encodeURIComponent(appointment.meetUrl || 'Atelier ArquitecturIA · Armenia, Quindío');

  // Convert date and time to ISO format (e.g. 2026-09-28 and 10:00 AM)
  const dateParts = appointment.date.split('-'); // YYYY, MM, DD
  let hour = 10;
  let minute = 0;

  if (appointment.time) {
    const timeMatch = appointment.time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      minute = parseInt(timeMatch[2], 10);
      const ampm = (timeMatch[3] || '').toUpperCase();
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
    }
  }

  // Construct UTC start & end timestamps (60 minutes duration)
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const pad = (n) => String(n).padStart(2, '0');
  // Formato Google Calendar: YYYYMMDDTHHmmssZ
  const startTimeStr = `${year}${month}${day}T${pad(hour)}${pad(minute)}00`;
  const endHour = hour + 1;
  const endTimeStr = `${year}${month}${day}T${pad(endHour)}${pad(minute)}00`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeStr}/${endTimeStr}&details=${details}&location=${location}`;
}
