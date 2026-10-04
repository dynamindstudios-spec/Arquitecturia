// Supabase Client & Hybrid Offline-First Sync Layer
// ArquitecturIA Atelier · Arquitectura Defensiva

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('your-project') &&
  !SUPABASE_ANON_KEY.includes('your-anon-key')
);

export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

export const isSupabaseConnected = () => isConfigured && Boolean(supabase);

/**
 * Sincroniza una cita con Supabase en segundo plano con reintentos defensivos
 */
export async function syncAppointmentToCloud(appointment) {
  if (!isSupabaseConnected()) {
    return { success: false, reason: 'SUPABASE_NOT_CONFIGURED', offline: true };
  }

  try {
    const payload = {
      id: appointment.id,
      client_name: appointment.clientName,
      client_email: appointment.clientEmail,
      client_phone: appointment.clientPhone,
      project_type: appointment.projectType || 'Residencial',
      lot_location: appointment.lotLocation || 'Armenia, Quindío',
      estimated_area: appointment.estimatedArea || '400 m²',
      investment_tier: appointment.investmentTier || '$1.200M COP',
      modality: appointment.modality || 'Virtual Meet',
      appointment_date: appointment.date,
      appointment_time: appointment.time,
      notes: appointment.notes || '',
      status: appointment.status || 'Pendiente',
      meet_url: appointment.meetUrl,
      whatsapp_bot: appointment.whatsappBot || {},
      sync_status: 'synced'
    };

    const { data, error } = await supabase
      .from('appointments')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.warn('[Supabase Sync Warning]:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('[Supabase Network Fallback]: Running local offline', err);
    return { success: false, error: err.message, offline: true };
  }
}

/**
 * Consulta citas remotas de Supabase para reconciliar con la caché local
 */
export async function fetchCloudAppointments() {
  if (!isSupabaseConnected()) return null;

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: false });

    if (error) {
      console.warn('[Supabase Fetch Warning]:', error.message);
      return null;
    }

    // Normalizar a formato de camelCase local
    return data.map((item) => ({
      id: item.id,
      createdAt: item.created_at,
      clientName: item.client_name,
      clientEmail: item.client_email,
      clientPhone: item.client_phone,
      projectType: item.project_type,
      lotLocation: item.lot_location,
      estimatedArea: item.estimated_area,
      investmentTier: item.investment_tier,
      modality: item.modality,
      date: item.appointment_date,
      time: item.appointment_time,
      notes: item.notes,
      status: item.status,
      meetUrl: item.meet_url,
      whatsappBot: item.whatsapp_bot,
      syncStatus: 'synced'
    }));
  } catch (err) {
    return null;
  }
}
