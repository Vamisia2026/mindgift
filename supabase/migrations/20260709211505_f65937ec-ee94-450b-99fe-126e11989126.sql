
CREATE TABLE public.survey_results (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  screening jsonb NOT NULL,
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  journey jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommendation jsonb NOT NULL DEFAULT '{}'::jsonb,
  product_link_us text,
  product_link_uk text,
  sheets_synced_at timestamptz
);

GRANT INSERT, UPDATE ON public.survey_results TO anon, authenticated;
GRANT ALL ON public.survey_results TO service_role;

ALTER TABLE public.survey_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a survey result"
  ON public.survey_results FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can mark their own row as synced"
  ON public.survey_results FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
