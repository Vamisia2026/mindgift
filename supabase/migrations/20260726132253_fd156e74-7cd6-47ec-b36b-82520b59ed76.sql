DROP POLICY IF EXISTS "anon_insert_survey_results" ON public.survey_results;

CREATE POLICY "anon_insert_survey_results"
ON public.survey_results
FOR INSERT
TO anon, authenticated
WITH CHECK (
  jsonb_typeof(screening) = 'object'
  AND jsonb_typeof(tags) = 'array'
  AND jsonb_typeof(journey) = 'array'
  AND jsonb_typeof(recommendation) = 'object'
  AND pg_column_size(screening) < 32768
  AND pg_column_size(tags) < 32768
  AND pg_column_size(journey) < 65536
  AND pg_column_size(recommendation) < 32768
  AND (product_link_us IS NULL OR (length(product_link_us) < 2048 AND product_link_us ~ '^https://'))
  AND (product_link_uk IS NULL OR (length(product_link_uk) < 2048 AND product_link_uk ~ '^https://'))
  AND sheets_synced_at IS NULL
);