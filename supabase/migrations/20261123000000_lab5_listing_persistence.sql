-- Lab 5: additive persistence; development only until reviewed and authorized.
-- Based on retained Studio attempt 02, corrected after local/Gemini review.
-- Existing midterm migration and protected profiles are preserved.
BEGIN;

-- 1. Helper trigger functions (namespaced for Lab 5)
CREATE OR REPLACE FUNCTION public.lab5_set_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := clock_timestamp();
    NEW.updated_at := clock_timestamp();
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.created_at := OLD.created_at;
    NEW.updated_at := clock_timestamp();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.lab5_enforce_property_invariants()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
DECLARE
  jwt_role text := NULLIF(current_setting('request.jwt.claim.role', true), '');
  is_client_role boolean := (current_user IN ('anon', 'authenticated') OR jwt_role IN ('anon', 'authenticated'));
  distinct_amenities integer;
BEGIN
  -- Reject duplicate amenities (matches listing.ts validateListingBundle uniqueness)
  SELECT pg_catalog.count(DISTINCT a)
    INTO distinct_amenities
    FROM pg_catalog.unnest(NEW.amenities) AS a;

  IF distinct_amenities <> pg_catalog.cardinality(NEW.amenities) THEN
    RAISE EXCEPTION 'Duplicate values in amenities are not allowed.' USING ERRCODE = '23514';
  END IF;

  IF is_client_role THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.status NOT IN ('draft', 'pending') THEN
        RAISE EXCEPTION 'Clients may only create draft or pending properties.' USING ERRCODE = '42501';
      END IF;
      IF NEW.approved_at IS NOT NULL OR NEW.approved_by IS NOT NULL THEN
        RAISE EXCEPTION 'Clients cannot set approval metadata.' USING ERRCODE = '42501';
      END IF;
    ELSIF TG_OP = 'UPDATE' THEN
      IF NEW.owner_id IS DISTINCT FROM OLD.owner_id THEN
        RAISE EXCEPTION 'Ownership transfer is not permitted.' USING ERRCODE = '42501';
      END IF;
      IF OLD.status NOT IN ('draft', 'pending') THEN
        RAISE EXCEPTION 'Approved or suspended properties cannot be modified by owners.' USING ERRCODE = '42501';
      END IF;
      IF NEW.status NOT IN ('draft', 'pending') THEN
        RAISE EXCEPTION 'Owners cannot approve or suspend properties.' USING ERRCODE = '42501';
      END IF;
      IF NEW.approved_at IS DISTINCT FROM OLD.approved_at
         OR NEW.approved_by IS DISTINCT FROM OLD.approved_by THEN
        RAISE EXCEPTION 'Approval metadata is server-managed.' USING ERRCODE = '42501';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.lab5_enforce_sponsor_invariants()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
DECLARE
  jwt_role text := NULLIF(current_setting('request.jwt.claim.role', true), '');
  is_client_role boolean := (current_user IN ('anon', 'authenticated') OR jwt_role IN ('anon', 'authenticated'));
BEGIN
  IF is_client_role THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.status NOT IN ('draft', 'pending') OR NEW.is_active IS DISTINCT FROM false THEN
        RAISE EXCEPTION 'Clients may only create unapproved inactive sponsors.' USING ERRCODE = '42501';
      END IF;
      IF NEW.approved_at IS NOT NULL OR NEW.approved_by IS NOT NULL THEN
        RAISE EXCEPTION 'Clients cannot set approval metadata.' USING ERRCODE = '42501';
      END IF;
    ELSIF TG_OP = 'UPDATE' THEN
      IF NEW.owner_id IS DISTINCT FROM OLD.owner_id THEN
        RAISE EXCEPTION 'Ownership transfer is not permitted.' USING ERRCODE = '42501';
      END IF;
      IF OLD.status NOT IN ('draft', 'pending') THEN
        RAISE EXCEPTION 'Approved or suspended sponsors cannot be modified by owners.' USING ERRCODE = '42501';
      END IF;
      IF NEW.status NOT IN ('draft', 'pending') OR NEW.is_active IS DISTINCT FROM false THEN
        RAISE EXCEPTION 'Owners cannot approve, suspend, or activate sponsors.' USING ERRCODE = '42501';
      END IF;
      IF NEW.approved_at IS DISTINCT FROM OLD.approved_at
         OR NEW.approved_by IS DISTINCT FROM OLD.approved_by THEN
        RAISE EXCEPTION 'Approval metadata is server-managed.' USING ERRCODE = '42501';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- 2. Tables (reusing existing public.profiles; Lab 3 compatible IDs per design.md)
CREATE TABLE public.properties (
  property_id text PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state char(2) NOT NULL,
  country char(2) NOT NULL DEFAULT 'US',
  zip_code text NOT NULL,
  price numeric NOT NULL,
  currency char(3) NOT NULL DEFAULT 'USD',
  price_period text NOT NULL DEFAULT 'month',
  property_type text NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms numeric NOT NULL,
  square_feet integer NOT NULL,
  amenities text[] NOT NULL DEFAULT '{}'::text[],
  image_path text NOT NULL,
  image_alt text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  approved_at timestamptz NULL,
  approved_by uuid NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT properties_id_format CHECK (property_id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(property_id) >= 3),
  CONSTRAINT properties_title_valid CHECK (title ~ '\S' AND char_length(title) >= 5),
  CONSTRAINT properties_street_valid CHECK (street ~ '\S'),
  CONSTRAINT properties_city_valid CHECK (city ~ '\S'),
  CONSTRAINT properties_state_valid CHECK (state ~ '^[A-Z]{2}$'),
  CONSTRAINT properties_country_us CHECK (country = 'US'),
  CONSTRAINT properties_zip_valid CHECK (zip_code ~ '^[0-9]{5}(?:-[0-9]{4})?$'),
  -- Unconstrained NUMERIC scale prevents silent rounding of 12.345 -> 12.35
  CONSTRAINT properties_price_valid CHECK (price >= 0 AND price <= 99999999.99 AND price = round(price, 2)),
  CONSTRAINT properties_currency_usd CHECK (currency = 'USD'),
  CONSTRAINT properties_period_month CHECK (price_period = 'month'),
  CONSTRAINT properties_type_enum CHECK (property_type IN ('apartment', 'studio', 'house', 'condo', 'townhouse')),
  CONSTRAINT properties_bedrooms_nonnegative CHECK (bedrooms >= 0),
  -- Unconstrained NUMERIC scale prevents silent rounding of 1.54 -> 1.5
  CONSTRAINT properties_bathrooms_half_steps CHECK (bathrooms >= 0 AND bathrooms <= 99 AND (bathrooms * 2) = trunc(bathrooms * 2)),
  CONSTRAINT properties_sqft_positive CHECK (square_feet > 0),
  CONSTRAINT properties_amenities_enum CHECK (
    COALESCE(pg_catalog.array_ndims(amenities), 0) <= 1
    AND pg_catalog.array_position(amenities, NULL) IS NULL
    AND amenities <@ ARRAY['parking', 'laundry', 'elevator', 'balcony', 'garden', 'air_conditioning']::text[]
  ),
  CONSTRAINT properties_image_allowlist CHECK (
    image_path IN ('/images/maple-court.svg', '/images/cedar-studio.svg', '/images/willow-house.svg')
  ),
  CONSTRAINT properties_image_alt_valid CHECK (image_alt ~ '\S' AND char_length(image_alt) >= 10),
  CONSTRAINT properties_status_enum CHECK (status IN ('draft', 'pending', 'approved', 'suspended')),
  CONSTRAINT properties_approval_consistency CHECK ((status = 'approved') = (approved_at IS NOT NULL))
);

CREATE TABLE public.sponsors (
  sponsor_id text PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  business_name text NOT NULL,
  website_url text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  is_active boolean NOT NULL DEFAULT false,
  approved_at timestamptz NULL,
  approved_by uuid NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT sponsors_id_format CHECK (sponsor_id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND char_length(sponsor_id) >= 3),
  CONSTRAINT sponsors_name_valid CHECK (business_name ~ '\S' AND char_length(business_name) >= 3),
  CONSTRAINT sponsors_url_fictional_https CHECK (
    website_url ~ '^https://(?:[a-z0-9-]+\.)?example\.(?:com|org|net)/?$'
  ),
  CONSTRAINT sponsors_status_enum CHECK (status IN ('draft', 'pending', 'approved', 'suspended')),
  CONSTRAINT sponsors_active_requires_approved CHECK (NOT is_active OR status = 'approved'),
  CONSTRAINT sponsors_approval_consistency CHECK ((status = 'approved') = (approved_at IS NOT NULL))
);

CREATE TABLE public.property_sponsors (
  property_id text NOT NULL REFERENCES public.properties(property_id) ON DELETE CASCADE,
  sponsor_id text NOT NULL REFERENCES public.sponsors(sponsor_id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),

  PRIMARY KEY (property_id, sponsor_id)
);

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id text NOT NULL REFERENCES public.properties(property_id) ON DELETE RESTRICT,
  requester_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  requester_name text NOT NULL,
  requester_email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT inquiries_name_valid CHECK (requester_name ~ '\S' AND char_length(requester_name) BETWEEN 2 AND 120),
  CONSTRAINT inquiries_email_valid CHECK (requester_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND char_length(requester_email) <= 254),
  CONSTRAINT inquiries_message_valid CHECK (message ~ '\S' AND char_length(message) BETWEEN 10 AND 2000)
);

CREATE INDEX idx_properties_owner_status ON public.properties(owner_id, status);
CREATE INDEX idx_properties_approved ON public.properties(status) WHERE status = 'approved';
CREATE INDEX idx_sponsors_owner_status ON public.sponsors(owner_id, status);
CREATE INDEX idx_sponsors_approved_active ON public.sponsors(status, is_active) WHERE status = 'approved' AND is_active = true;
CREATE INDEX idx_property_sponsors_sponsor ON public.property_sponsors(sponsor_id);
CREATE INDEX idx_inquiries_property ON public.inquiries(property_id);

-- 3. Triggers
CREATE TRIGGER trg_properties_timestamps
  BEFORE INSERT OR UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.lab5_set_timestamps();

CREATE TRIGGER trg_properties_invariants
  BEFORE INSERT OR UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.lab5_enforce_property_invariants();

CREATE TRIGGER trg_sponsors_timestamps
  BEFORE INSERT OR UPDATE ON public.sponsors
  FOR EACH ROW EXECUTE FUNCTION public.lab5_set_timestamps();

CREATE TRIGGER trg_sponsors_invariants
  BEFORE INSERT OR UPDATE ON public.sponsors
  FOR EACH ROW EXECUTE FUNCTION public.lab5_enforce_sponsor_invariants();

-- 4. Default-deny privileges & explicit column grants
REVOKE ALL ON public.properties, public.sponsors, public.property_sponsors, public.inquiries
  FROM PUBLIC, anon, authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Explicit service_role grants for clean bootstrap (mirrors midterm migration)
GRANT ALL ON public.properties, public.sponsors, public.property_sponsors, public.inquiries
  TO service_role;

-- Public anon SELECT includes status (and is_active on sponsors) so cross-table RLS
-- policies on property_sponsors and inquiries can read parent status without 42501,
-- while withholding owner_id, approved_at, approved_by, and updated_at.
GRANT SELECT (
  property_id, title, street, city, state, country, zip_code,
  price, currency, price_period, property_type, bedrooms, bathrooms,
  square_feet, amenities, image_path, image_alt, status, created_at
) ON public.properties TO anon, authenticated;



GRANT INSERT (
  property_id, owner_id, title, street, city, state, country, zip_code,
  price, currency, price_period, property_type, bedrooms, bathrooms,
  square_feet, amenities, image_path, image_alt, status
) ON public.properties TO authenticated;

-- property_id, owner_id, approval fields, and timestamps are immutable via client UPDATE
GRANT UPDATE (
  title, street, city, state, country, zip_code,
  price, currency, price_period, property_type, bedrooms, bathrooms,
  square_feet, amenities, image_path, image_alt, status
), DELETE ON public.properties TO authenticated;

GRANT SELECT (sponsor_id, business_name, website_url, status, is_active, created_at)
  ON public.sponsors TO anon, authenticated;



GRANT INSERT (sponsor_id, owner_id, business_name, website_url, status)
  ON public.sponsors TO authenticated;

GRANT UPDATE (business_name, website_url, status), DELETE
  ON public.sponsors TO authenticated;

GRANT SELECT (property_id, sponsor_id, created_at)
  ON public.property_sponsors TO anon, authenticated;

GRANT INSERT (property_id, sponsor_id), DELETE
  ON public.property_sponsors TO authenticated;

-- Only signed-in clients submit. Owners read own-property inquiries via RLS.
GRANT INSERT (property_id, requester_id, requester_name, requester_email, message)
  ON public.inquiries TO authenticated;

GRANT SELECT ON public.inquiries TO authenticated;

-- Returns only whether the current Auth identity owns this property. No arbitrary
-- user argument, no metadata return, pinned search_path; ordinary clients cannot
-- replace this function. Required by cross-table owner policies with narrow grants.
CREATE FUNCTION public.lab5_owns_property(target_property_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = pg_catalog
AS $$ SELECT EXISTS (SELECT 1 FROM public.properties p
  WHERE p.property_id = target_property_id AND p.owner_id = (SELECT auth.uid())) $$;
REVOKE ALL ON FUNCTION public.lab5_owns_property(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.lab5_owns_property(text) TO authenticated;

-- 5. Enable Default-Deny RLS & Policies
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- PROPERTIES
CREATE POLICY properties_public_read_approved
  ON public.properties FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY properties_owner_read_own
  ON public.properties FOR SELECT
  TO authenticated
  USING (owner_id = (SELECT auth.uid()));

CREATE POLICY properties_owner_insert_unapproved
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
    AND approved_at IS NULL
    AND approved_by IS NULL
  );

CREATE POLICY properties_owner_update_unapproved
  ON public.properties FOR UPDATE
  TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
  )
  WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
    AND approved_at IS NULL
    AND approved_by IS NULL
  );

CREATE POLICY properties_owner_delete_unapproved
  ON public.properties FOR DELETE
  TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
  );

-- SPONSORS
CREATE POLICY sponsors_public_read_approved_active
  ON public.sponsors FOR SELECT
  TO anon, authenticated
  USING (status = 'approved' AND is_active = true);

CREATE POLICY sponsors_owner_read_own
  ON public.sponsors FOR SELECT
  TO authenticated
  USING (owner_id = (SELECT auth.uid()));

CREATE POLICY sponsors_owner_insert_unapproved
  ON public.sponsors FOR INSERT
  TO authenticated
  WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
    AND is_active = false
    AND approved_at IS NULL
    AND approved_by IS NULL
  );

CREATE POLICY sponsors_owner_update_unapproved
  ON public.sponsors FOR UPDATE
  TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
  )
  WITH CHECK (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
    AND is_active = false
    AND approved_at IS NULL
    AND approved_by IS NULL
  );

CREATE POLICY sponsors_owner_delete_unapproved
  ON public.sponsors FOR DELETE
  TO authenticated
  USING (
    owner_id = (SELECT auth.uid())
    AND status IN ('draft', 'pending')
  );

-- PROPERTY_SPONSORS
CREATE POLICY property_sponsors_public_read_visible
  ON public.property_sponsors FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.property_id = property_sponsors.property_id
        AND p.status = 'approved'
    )
    AND EXISTS (
      SELECT 1 FROM public.sponsors s
      WHERE s.sponsor_id = property_sponsors.sponsor_id
        AND s.status = 'approved'
        AND s.is_active = true
    )
  );

CREATE POLICY property_sponsors_owner_read_own
  ON public.property_sponsors FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.property_id = property_sponsors.property_id
        AND public.lab5_owns_property(p.property_id)
    )
  );

CREATE POLICY property_sponsors_owner_insert_unapproved
  ON public.property_sponsors FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.property_id = property_sponsors.property_id
        AND public.lab5_owns_property(p.property_id)
        AND p.status IN ('draft', 'pending')
    )
    AND EXISTS (
      SELECT 1 FROM public.sponsors s
      WHERE s.sponsor_id = property_sponsors.sponsor_id
        AND s.status = 'approved'
        AND s.is_active = true
    )
  );

CREATE POLICY property_sponsors_owner_delete_unapproved
  ON public.property_sponsors FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.property_id = property_sponsors.property_id
        AND public.lab5_owns_property(p.property_id)
        AND p.status IN ('draft', 'pending')
    )
  );

-- INQUIRIES
CREATE POLICY inquiries_client_insert_approved_property
  ON public.inquiries FOR INSERT
  TO authenticated
  WITH CHECK (
    requester_id = (SELECT auth.uid()) AND EXISTS (
      SELECT 1 FROM public.profiles WHERE id = (SELECT auth.uid()) AND role = 'client'
    ) AND
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.property_id = inquiries.property_id
        AND p.status = 'approved'
    )
  );

CREATE POLICY inquiries_owner_read_own_property
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.properties p
      WHERE p.property_id = inquiries.property_id
        AND public.lab5_owns_property(p.property_id)
    )
  );

-- Trigger functions are not general-purpose client RPCs.
REVOKE ALL ON FUNCTION public.lab5_set_timestamps(),
  public.lab5_enforce_property_invariants(), public.lab5_enforce_sponsor_invariants()
  FROM PUBLIC, anon, authenticated;
COMMIT;