
DROP POLICY IF EXISTS "Anyone can mark their own row as synced" ON public.survey_results;
REVOKE UPDATE ON public.survey_results FROM anon, authenticated;
