-- Version B: exact five-table persistence model. Apply only to a clean development
-- Supabase project after reviewing existing public tables. No production seed data.
BEGIN;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'merchant', 'provider', 'client')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) >= 3),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~* '^[a-z0-9-]+$'),
  active_status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title TEXT NOT NULL CHECK (char_length(title) >= 5),
  hourly_rate NUMERIC(10, 2) NOT NULL CHECK (hourly_rate >= 0),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes >= 15),
  coverage_radius_miles INTEGER NOT NULL CHECK (coverage_radius_miles > 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.service_category_mappings (
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  client_email TEXT NOT NULL CHECK (client_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  requested_date DATE NOT NULL,
  notes TEXT NOT NULL CHECK (char_length(notes) >= 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX services_provider_id_idx ON public.services(provider_id);
CREATE INDEX bookings_service_id_idx ON public.bookings(service_id);
CREATE INDEX mappings_category_id_idx ON public.service_category_mappings(category_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Explicitly undo default privileges (including Supabase defaults). No client
-- may create or change its own profile/role. Provisioning is a trusted admin task.
REVOKE ALL ON public.profiles, public.service_categories, public.services,
  public.service_category_mappings, public.bookings FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON public.profiles TO authenticated;
GRANT SELECT ON public.service_categories, public.service_category_mappings TO anon, authenticated;
GRANT SELECT (id, title, hourly_rate, duration_minutes, coverage_radius_miles, status, created_at)
  ON public.services TO anon;
GRANT SELECT ON public.services TO authenticated;
GRANT INSERT (provider_id, title, hourly_rate, duration_minutes, coverage_radius_miles, status)
  ON public.services TO authenticated;
-- Ownership, IDs and timestamps are immutable through unprivileged UPDATE.
GRANT UPDATE (title, hourly_rate, duration_minutes, coverage_radius_miles, status), DELETE
  ON public.services TO authenticated;
GRANT INSERT (service_id, client_email, requested_date, notes) ON public.bookings TO anon, authenticated;
GRANT SELECT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.profiles, public.service_categories, public.services,
  public.service_category_mappings, public.bookings TO service_role;

CREATE POLICY profiles_self_read ON public.profiles FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid()));

CREATE POLICY categories_active_read ON public.service_categories FOR SELECT TO anon, authenticated
  USING (active_status = true);

CREATE POLICY services_public_read ON public.services FOR SELECT TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY services_provider_read ON public.services FOR SELECT TO authenticated
  USING (provider_id = (SELECT auth.uid()) AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role IN ('merchant', 'provider')
  ));

CREATE POLICY services_provider_insert ON public.services FOR INSERT TO authenticated
  WITH CHECK (provider_id = (SELECT auth.uid()) AND status = 'draft' AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role IN ('merchant', 'provider')
  ));

CREATE POLICY services_provider_update ON public.services FOR UPDATE TO authenticated
  USING (provider_id = (SELECT auth.uid()) AND status IN ('draft', 'suspended') AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role IN ('merchant', 'provider')
  ))
  WITH CHECK (provider_id = (SELECT auth.uid()) AND status IN ('draft', 'suspended') AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role IN ('merchant', 'provider')
  ));

CREATE POLICY services_provider_delete ON public.services FOR DELETE TO authenticated
  USING (provider_id = (SELECT auth.uid()) AND status IN ('draft', 'suspended') AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = (SELECT auth.uid()) AND p.role IN ('merchant', 'provider')
  ));

CREATE POLICY mappings_approved_read ON public.service_category_mappings FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.services s WHERE s.id = service_id AND s.status = 'approved'));

-- Per the explicit examination rule, public and authenticated callers can insert
-- for any existing service. They receive no booking-read policy from inserting.
CREATE POLICY bookings_public_insert ON public.bookings FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY bookings_provider_read ON public.bookings FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.services s JOIN public.profiles p ON p.id = s.provider_id
    WHERE s.id = service_id AND s.provider_id = (SELECT auth.uid()) AND p.role IN ('merchant', 'provider')
  ));

-- Admin oversight is intentionally service_role execution, which bypasses RLS.
-- A client-supplied role or a profile marked admin never grants that credential.
COMMIT;
