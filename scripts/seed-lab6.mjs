// SQL generation only: requires fictional Lab 5 seed in dedicated development DB.
process.stdout.write(`-- Fictional development campaign seed. Inspect; never apply to production.
BEGIN;
DO $$ BEGIN
 IF EXISTS(SELECT 1 FROM public.sponsor_campaigns) OR EXISTS(SELECT 1 FROM public.properties WHERE sponsor_latitude IS NOT NULL)
 THEN RAISE EXCEPTION 'Requires empty campaign/context fixture'; END IF;
 IF (SELECT count(*) FROM public.sponsors WHERE sponsor_id IN ('example-maintenance','example-gardens') AND status='approved' AND is_active)<>2
 OR (SELECT count(*) FROM public.properties WHERE property_id IN ('maple-court-apartment','cedar-window-studio','cedar-garden-townhouse') AND status='approved')<>3
 THEN RAISE EXCEPTION 'Requires fictional Lab 5 fixture first'; END IF;
END $$;
UPDATE public.properties SET sponsor_latitude=35.01,sponsor_longitude=35 WHERE property_id='cedar-window-studio';
INSERT INTO public.sponsor_campaigns(sponsor_id,is_active,placements,starts_at,ends_at,priority,zip_codes,center_latitude,center_longitude,radius_miles,internal_notes) VALUES
('example-maintenance',true,ARRAY['property-card','property-detail'],date_trunc('milliseconds',now()-interval '1 day'),date_trunc('milliseconds',now()+interval '30 days'),1,ARRAY['90001'],NULL,NULL,NULL,'Fictional internal note, never public'),
('example-gardens',true,ARRAY['property-card','property-detail'],date_trunc('milliseconds',now()-interval '1 day'),date_trunc('milliseconds',now()+interval '30 days'),1,ARRAY[]::text[],35,35,3,'Synthetic coordinates, not ZIP centroids');
COMMIT;
`);
