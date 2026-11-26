-- Additive Lab 6 prototype. Requires the reviewed Lab 5 migration first.
-- Fictional development data only; never apply classroom seeds to production.
BEGIN;
ALTER TABLE public.properties ADD COLUMN sponsor_latitude double precision,
  ADD COLUMN sponsor_longitude double precision,
  ADD CONSTRAINT properties_sponsor_point CHECK (
    (sponsor_latitude IS NULL AND sponsor_longitude IS NULL) OR
    (sponsor_latitude IS NOT NULL AND sponsor_longitude IS NOT NULL AND
     sponsor_latitude BETWEEN -90 AND 90 AND sponsor_longitude BETWEEN -180 AND 180));
-- Ordinary owners cannot alter these new fields; trusted operators supply only
-- approved fictional/approved-source page geography, never a viewer's location.
GRANT SELECT(sponsor_latitude,sponsor_longitude) ON public.properties TO anon,authenticated;

CREATE TABLE public.sponsor_campaigns (
  sponsor_id text PRIMARY KEY REFERENCES public.sponsors(sponsor_id) ON DELETE CASCADE,
  is_active boolean NOT NULL DEFAULT false,
  placements text[] NOT NULL CHECK (cardinality(placements)>0 AND array_ndims(placements)=1
    AND array_position(placements,NULL) IS NULL AND placements <@ ARRAY['property-card','property-detail']::text[]),
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  priority integer NOT NULL DEFAULT 0 CHECK(priority BETWEEN 0 AND 100),
  zip_codes text[] NOT NULL DEFAULT '{}',
  center_latitude double precision,
  center_longitude double precision,
  radius_miles double precision,
  internal_notes text NOT NULL DEFAULT '',
  CONSTRAINT campaign_dates CHECK(isfinite(starts_at) AND isfinite(ends_at) AND starts_at<ends_at
    AND starts_at=date_trunc('milliseconds',starts_at) AND ends_at=date_trunc('milliseconds',ends_at)),
  CONSTRAINT campaign_point CHECK (
    (center_latitude IS NULL AND center_longitude IS NULL AND radius_miles IS NULL) OR
    (center_latitude IS NOT NULL AND center_longitude IS NOT NULL AND radius_miles IS NOT NULL
      AND center_latitude BETWEEN -90 AND 90 AND center_longitude BETWEEN -180 AND 180
      AND radius_miles>0 AND radius_miles<=100)),
  CONSTRAINT campaign_coverage CHECK(cardinality(zip_codes)>0 OR radius_miles IS NOT NULL)
);
CREATE FUNCTION public.lab6_check_zips() RETURNS trigger LANGUAGE plpgsql
SET search_path=pg_catalog AS $$ BEGIN
  IF cardinality(NEW.zip_codes)>100 OR COALESCE(array_ndims(NEW.zip_codes),0)>1
    OR EXISTS (SELECT 1 FROM unnest(NEW.zip_codes) z WHERE z IS NULL OR z !~ '^[0-9]{5}(-[0-9]{4})?$')
  THEN RAISE EXCEPTION 'Invalid campaign ZIP configuration' USING ERRCODE='23514'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER sponsor_campaign_zip_check BEFORE INSERT OR UPDATE ON public.sponsor_campaigns
FOR EACH ROW EXECUTE FUNCTION public.lab6_check_zips();
REVOKE ALL ON FUNCTION public.lab6_check_zips() FROM PUBLIC,anon,authenticated;
ALTER TABLE public.sponsor_campaigns ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.sponsor_campaigns FROM PUBLIC,anon,authenticated;
GRANT SELECT(sponsor_id,is_active,placements,starts_at,ends_at,priority,zip_codes,center_latitude,center_longitude,radius_miles)
  ON public.sponsor_campaigns TO anon,authenticated;
GRANT ALL ON public.sponsor_campaigns TO service_role;
CREATE POLICY campaigns_eligible_public ON public.sponsor_campaigns FOR SELECT TO anon,authenticated
USING(is_active AND starts_at<=now() AND now()<ends_at AND EXISTS (
  SELECT 1 FROM public.sponsors s WHERE s.sponsor_id=sponsor_campaigns.sponsor_id AND s.status='approved' AND s.is_active));

CREATE VIEW public.sponsor_eligible_candidates WITH(security_invoker=true) AS
SELECT c.sponsor_id,s.business_name,s.website_url,s.status,
  (c.is_active AND s.is_active) AS active,c.placements,c.starts_at,c.ends_at,
  c.priority,c.zip_codes,c.center_latitude,c.center_longitude,c.radius_miles
FROM public.sponsor_campaigns c JOIN public.sponsors s USING(sponsor_id)
WHERE c.is_active AND s.status='approved' AND s.is_active AND c.starts_at<=now() AND now()<c.ends_at;
REVOKE ALL ON public.sponsor_eligible_candidates FROM PUBLIC,anon,authenticated;
GRANT SELECT ON public.sponsor_eligible_candidates TO anon,authenticated,service_role;

-- Same synthetic great-circle geometry policy as the pure selector.
CREATE FUNCTION public.lab6_distance_miles(a_lat double precision,a_lon double precision,
  b_lat double precision,b_lon double precision) RETURNS double precision
LANGUAGE sql IMMUTABLE STRICT SET search_path=pg_catalog AS $$
  SELECT CASE WHEN a_lat=b_lat AND (abs(a_lat)=90 OR a_lon=b_lon OR abs(a_lon-b_lon)=360)
  THEN 0 ELSE 3958.7613*2*asin(sqrt(least(1.0,greatest(0.0,
    power(sin(radians(b_lat-a_lat)/2),2)+cos(radians(a_lat))*cos(radians(b_lat))*power(sin(radians(b_lon-a_lon)/2),2))))) END
$$;
REVOKE ALL ON FUNCTION public.lab6_distance_miles(double precision,double precision,double precision,double precision) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lab6_distance_miles(double precision,double precision,double precision,double precision) TO anon,authenticated,service_role;

CREATE FUNCTION public.lab6_candidates_for_property(target_property_id text,target_placement text)
RETURNS SETOF public.sponsor_eligible_candidates LANGUAGE sql STABLE SECURITY INVOKER
SET search_path=pg_catalog AS $$
  SELECT c.* FROM public.sponsor_eligible_candidates c JOIN public.properties p
    ON p.property_id=target_property_id AND p.status='approved'
  WHERE target_placement=ANY(c.placements) AND (
    EXISTS(SELECT 1 FROM unnest(c.zip_codes) z WHERE split_part(z,'-',1)=split_part(p.zip_code,'-',1)) OR
    (c.radius_miles IS NOT NULL AND p.sponsor_latitude IS NOT NULL AND p.sponsor_longitude IS NOT NULL AND
      public.lab6_distance_miles(c.center_latitude,c.center_longitude,p.sponsor_latitude,p.sponsor_longitude)
      <=c.radius_miles+least(1e-9,c.radius_miles*1e-9)))
$$;
REVOKE ALL ON FUNCTION public.lab6_candidates_for_property(text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lab6_candidates_for_property(text,text) TO anon,authenticated,service_role;

CREATE TABLE public.sponsor_impressions (
  event_id uuid PRIMARY KEY,
  sponsor_id text NOT NULL REFERENCES public.sponsors(sponsor_id) ON DELETE CASCADE,
  placement text NOT NULL CHECK(placement IN ('property-card','property-detail')),
  page_context text NOT NULL DEFAULT 'property' CHECK(page_context='property'),
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
ALTER TABLE public.sponsor_impressions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.sponsor_impressions FROM PUBLIC,anon,authenticated;
GRANT ALL ON public.sponsor_impressions TO service_role;
-- Only this narrow insert capability is exposed. No read/UPDATE/DELETE privilege,
-- no arbitrary PII/timestamp/page payload and no property/viewer ID is persisted.
CREATE FUNCTION public.lab6_record_impression(target_event_id uuid,target_sponsor_id text,
  target_property_id text,target_placement text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog AS $$ BEGIN
  IF target_event_id IS NULL OR target_placement IS NULL
     OR target_placement NOT IN ('property-card','property-detail') OR NOT EXISTS (
    SELECT 1 FROM public.lab6_candidates_for_property(target_property_id,target_placement) c
    WHERE c.sponsor_id=target_sponsor_id AND c.starts_at<=clock_timestamp() AND clock_timestamp()<c.ends_at)
  THEN RAISE EXCEPTION 'Placement unavailable' USING ERRCODE='42501'; END IF;
  INSERT INTO public.sponsor_impressions(event_id,sponsor_id,placement)
    VALUES(target_event_id,target_sponsor_id,target_placement) ON CONFLICT(event_id) DO NOTHING;
END $$;
REVOKE ALL ON FUNCTION public.lab6_record_impression(uuid,text,text,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.lab6_record_impression(uuid,text,text,text) TO anon,authenticated;
COMMIT;
