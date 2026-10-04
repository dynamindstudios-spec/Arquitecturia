-- ==============================================================================
-- SIMETRÍA GRUPO CONSTRUCTOR · MIGRACIÓN MAESTRA DE BASE DE DATOS SUPABASE
-- Versión: 20260923_simetria_core.sql
-- Arquitectura: PostgreSQL 15+ con Row Level Security (RLS) Obligatorio
-- ==============================================================================

-- 1. EXTENSIONES REQUERIDAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLA: appointments (Citas de Análisis de Proyecto y Protocolo WhatsApp)
CREATE TABLE IF NOT EXISTS public.appointments (
    id VARCHAR(32) PRIMARY KEY DEFAULT ('CITA-' || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 6))),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    client_name VARCHAR(160) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(60) NOT NULL,
    project_type VARCHAR(120) NOT NULL,
    lot_location VARCHAR(200) NOT NULL,
    estimated_area VARCHAR(80) NOT NULL,
    investment_tier VARCHAR(100) NOT NULL,
    modality VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(40) NOT NULL,
    notes TEXT DEFAULT '',
    status VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
    meet_url TEXT NOT NULL,
    whatsapp_bot JSONB NOT NULL DEFAULT '{
        "status": "Mensaje de confirmación enviado",
        "messageSent": true,
        "morningReminderScheduled": true,
        "morningReminderSent": false
    }'::JSONB,
    sync_status VARCHAR(40) NOT NULL DEFAULT 'synced',
    ip_hash VARCHAR(64) DEFAULT NULL
);

-- Índices de alto rendimiento para búsqueda y filtrado
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_client_email ON public.appointments(client_email);

-- 3. TABLA: cms_settings (Configuraciones de Contenido & Branding en Vivo)
CREATE TABLE IF NOT EXISTS public.cms_settings (
    key VARCHAR(80) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by VARCHAR(120) DEFAULT 'admin'
);

-- Inserción de valores iniciales del CMS
INSERT INTO public.cms_settings (key, value, description)
VALUES 
    ('hero_content', '{"heroTitle": "SIMETRÍA", "heroSubtitle": "ARQUITECTURA DE ALTO ESTATUS", "tagline": "Proyectamos y materializamos arquitectura de alto estatus en el Paisaje Cultural Cafetero."}'::JSONB, 'Titulares y subtítulos de portada'),
    ('general_cms', '{"announcement": "Atención personalizada para nuevos proyectos residenciales, comerciales y turísticos en el Eje Cafetero.", "contactPhone": "+57 300 259 6855"}'::JSONB, 'Anuncios y datos de contacto oficiales'),
    ('public_atmosphere', '"zen"'::JSONB, 'Atmósfera cromática activa del frontoffice')
ON CONFLICT (key) DO NOTHING;

-- 4. TABLA: audit_logs (Bitácora de Seguridad & Auditoría Operativa)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    action VARCHAR(80) NOT NULL,
    entity VARCHAR(80) NOT NULL,
    entity_id VARCHAR(80) NOT NULL,
    actor VARCHAR(120) NOT NULL DEFAULT 'system',
    details JSONB DEFAULT '{}'::JSONB
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- 5. TRIGGER AUTOMÁTICO DE ACTUALIZACIÓN (updated_at)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

DROP TRIGGER IF EXISTS trg_appointments_updated_at ON public.appointments;
CREATE TRIGGER trg_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_cms_settings_updated_at ON public.cms_settings;
CREATE TRIGGER trg_cms_settings_updated_at
BEFORE UPDATE ON public.cms_settings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 6. POLÍTICAS DE SEGURIDAD DEFENSIVA (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

-- A. RLS para appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Los usuarios anónimos (visitantes del frontoffice) pueden registrar una nueva cita
CREATE POLICY "Anon clients can insert appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(client_name) >= 3 AND
    char_length(client_phone) >= 7 AND
    client_email LIKE '%@%'
);

-- Solo usuarios administradores autenticados pueden consultar citas
CREATE POLICY "Authenticated admins can select appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (true);

-- Solo administradores autenticados pueden actualizar el estado de citas
CREATE POLICY "Authenticated admins can update appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Solo administradores autenticados pueden eliminar citas
CREATE POLICY "Authenticated admins can delete appointments"
ON public.appointments
FOR DELETE
TO authenticated
USING (true);

-- B. RLS para cms_settings
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;

-- Todos pueden leer el CMS público (para pintar el frontoffice)
CREATE POLICY "Public read cms_settings"
ON public.cms_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Solo administradores autenticados pueden modificar el CMS
CREATE POLICY "Admins update cms_settings"
ON public.cms_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- C. RLS para audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Solo lectura e inserción para administradores y funciones del sistema
CREATE POLICY "Admins manage audit_logs"
ON public.audit_logs
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Otorgar permisos a los roles Data API de Supabase
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO authenticated;
GRANT SELECT ON public.cms_settings TO anon, authenticated;
GRANT ALL ON public.cms_settings TO authenticated;
GRANT ALL ON public.audit_logs TO authenticated;
