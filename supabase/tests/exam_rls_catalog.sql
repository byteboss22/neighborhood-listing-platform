-- Read-only administrative evidence query. Run in the development project's
-- Supabase SQL Editor and retain the five-row result (no credentials included).
WITH required(table_name) AS (
  VALUES ('profiles'), ('service_categories'), ('services'),
    ('service_category_mappings'), ('bookings')
)
SELECT
  required.table_name,
  c.oid IS NOT NULL AS table_exists,
  COALESCE(c.relrowsecurity, false) AS rls_enabled,
  (SELECT count(*) FROM pg_catalog.pg_policy p WHERE p.polrelid = c.oid) AS policy_count
FROM required
LEFT JOIN pg_catalog.pg_namespace n ON n.nspname = 'public'
LEFT JOIN pg_catalog.pg_class c ON c.relnamespace = n.oid
  AND c.relname = required.table_name AND c.relkind IN ('r', 'p')
ORDER BY required.table_name;
