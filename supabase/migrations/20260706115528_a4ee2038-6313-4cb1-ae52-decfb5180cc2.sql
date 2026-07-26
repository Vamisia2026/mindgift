
DROP TABLE IF EXISTS public.option_variants CASCADE;
DROP TABLE IF EXISTS public.options CASCADE;
DROP TABLE IF EXISTS public.levels CASCADE;
DROP TABLE IF EXISTS public.macro_area_eligible_relationships CASCADE;
DROP TABLE IF EXISTS public.macro_area_eligible_age_groups CASCADE;
DROP TABLE IF EXISTS public.macro_areas CASCADE;
DROP TABLE IF EXISTS public.screening_options CASCADE;
DROP TABLE IF EXISTS public.screening_questions CASCADE;
DROP TABLE IF EXISTS public.bond_modifiers CASCADE;
DROP TABLE IF EXISTS public.occasion_multipliers CASCADE;
DROP TABLE IF EXISTS public.budget_bases CASCADE;
DROP TABLE IF EXISTS public.age_mapping CASCADE;

CREATE TABLE public.age_mapping (group_key TEXT PRIMARY KEY, min_age INTEGER NOT NULL, max_age INTEGER NOT NULL);
GRANT SELECT ON public.age_mapping TO anon, authenticated;
GRANT ALL ON public.age_mapping TO service_role;
ALTER TABLE public.age_mapping ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read age_mapping" ON public.age_mapping FOR SELECT USING (true);

CREATE TABLE public.budget_bases (relationship_key TEXT PRIMARY KEY, min_budget NUMERIC NOT NULL, max_budget NUMERIC NOT NULL);
GRANT SELECT ON public.budget_bases TO anon, authenticated;
GRANT ALL ON public.budget_bases TO service_role;
ALTER TABLE public.budget_bases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read budget_bases" ON public.budget_bases FOR SELECT USING (true);

CREATE TABLE public.occasion_multipliers (occasion_key TEXT PRIMARY KEY, multiplier NUMERIC NOT NULL);
GRANT SELECT ON public.occasion_multipliers TO anon, authenticated;
GRANT ALL ON public.occasion_multipliers TO service_role;
ALTER TABLE public.occasion_multipliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read occasion_multipliers" ON public.occasion_multipliers FOR SELECT USING (true);

CREATE TABLE public.bond_modifiers (modifier_key TEXT PRIMARY KEY, modifier NUMERIC NOT NULL);
GRANT SELECT ON public.bond_modifiers TO anon, authenticated;
GRANT ALL ON public.bond_modifiers TO service_role;
ALTER TABLE public.bond_modifiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read bond_modifiers" ON public.bond_modifiers FOR SELECT USING (true);

CREATE TABLE public.screening_questions (id TEXT PRIMARY KEY, sort_order INTEGER NOT NULL, question TEXT NOT NULL, input_type TEXT NOT NULL, min_value INTEGER, max_value INTEGER, backend_field TEXT);
GRANT SELECT ON public.screening_questions TO anon, authenticated;
GRANT ALL ON public.screening_questions TO service_role;
ALTER TABLE public.screening_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read screening_questions" ON public.screening_questions FOR SELECT USING (true);

CREATE TABLE public.screening_options (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL REFERENCES public.screening_questions(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  target TEXT,
  base_tier TEXT REFERENCES public.budget_bases(relationship_key),
  multiplier_key TEXT REFERENCES public.occasion_multipliers(occasion_key),
  modifier_key TEXT REFERENCES public.bond_modifiers(modifier_key)
);
GRANT SELECT ON public.screening_options TO anon, authenticated;
GRANT ALL ON public.screening_options TO service_role;
ALTER TABLE public.screening_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read screening_options" ON public.screening_options FOR SELECT USING (true);

CREATE TABLE public.macro_areas (id TEXT PRIMARY KEY, sort_order INTEGER NOT NULL, title TEXT NOT NULL);
GRANT SELECT ON public.macro_areas TO anon, authenticated;
GRANT ALL ON public.macro_areas TO service_role;
ALTER TABLE public.macro_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read macro_areas" ON public.macro_areas FOR SELECT USING (true);

CREATE TABLE public.macro_area_eligible_age_groups (
  macro_area_id TEXT NOT NULL REFERENCES public.macro_areas(id) ON DELETE CASCADE,
  age_group TEXT NOT NULL REFERENCES public.age_mapping(group_key),
  PRIMARY KEY (macro_area_id, age_group)
);
GRANT SELECT ON public.macro_area_eligible_age_groups TO anon, authenticated;
GRANT ALL ON public.macro_area_eligible_age_groups TO service_role;
ALTER TABLE public.macro_area_eligible_age_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read macro_area_eligible_age_groups" ON public.macro_area_eligible_age_groups FOR SELECT USING (true);

CREATE TABLE public.macro_area_eligible_relationships (
  macro_area_id TEXT NOT NULL REFERENCES public.macro_areas(id) ON DELETE CASCADE,
  relationship_key TEXT NOT NULL REFERENCES public.budget_bases(relationship_key),
  PRIMARY KEY (macro_area_id, relationship_key)
);
GRANT SELECT ON public.macro_area_eligible_relationships TO anon, authenticated;
GRANT ALL ON public.macro_area_eligible_relationships TO service_role;
ALTER TABLE public.macro_area_eligible_relationships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read macro_area_eligible_relationships" ON public.macro_area_eligible_relationships FOR SELECT USING (true);

CREATE TABLE public.levels (
  id TEXT PRIMARY KEY,
  macro_area_id TEXT NOT NULL REFERENCES public.macro_areas(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL,
  question TEXT NOT NULL
);
GRANT SELECT ON public.levels TO anon, authenticated;
GRANT ALL ON public.levels TO service_role;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read levels" ON public.levels FOR SELECT USING (true);

CREATE TABLE public.options (
  id TEXT PRIMARY KEY,
  level_id TEXT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL,
  tag TEXT NOT NULL,
  label TEXT NOT NULL
);
GRANT SELECT ON public.options TO anon, authenticated;
GRANT ALL ON public.options TO service_role;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read options" ON public.options FOR SELECT USING (true);

CREATE TABLE public.option_variants (
  id TEXT PRIMARY KEY,
  option_id TEXT NOT NULL REFERENCES public.options(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL,
  variant_text TEXT NOT NULL
);
GRANT SELECT ON public.option_variants TO anon, authenticated;
GRANT ALL ON public.option_variants TO service_role;
ALTER TABLE public.option_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read option_variants" ON public.option_variants FOR SELECT USING (true);

INSERT INTO public.age_mapping VALUES
  ('age-toddler', 0, 5),
  ('age-child', 6, 12),
  ('age-teen', 13, 17),
  ('age-young-adult', 18, 25),
  ('age-adult', 26, 45),
  ('age-mature', 46, 65),
  ('age-senior', 66, 120);

INSERT INTO public.budget_bases VALUES
  ('partner', 150, 250),
  ('close-friend-family', 100, 150),
  ('line-manager-supervisor', 80, 120),
  ('coworker-client-acquaintance', 50, 100);

INSERT INTO public.occasion_multipliers VALUES
  ('major-milestone', 1.5),
  ('regular-celebration', 1.0),
  ('casual-gesture', 0.6);

INSERT INTO public.bond_modifiers VALUES
  ('deeply-care-remember-me', 0.2),
  ('great-impression-professional-distance', 0.0),
  ('formal-duty-tasteful-present', -0.15);
