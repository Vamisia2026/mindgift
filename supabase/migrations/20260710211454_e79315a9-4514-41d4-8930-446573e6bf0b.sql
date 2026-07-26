DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='survey_results' LOOP
    EXECUTE format('DROP POLICY %I ON public.survey_results', p.policyname);
  END LOOP;
END $$;

GRANT INSERT ON public.survey_results TO anon, authenticated;
GRANT ALL ON public.survey_results TO service_role;

ALTER TABLE public.survey_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_survey_results"
  ON public.survey_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);