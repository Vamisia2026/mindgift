UPDATE public.age_mapping SET min_age = 6 WHERE group_key = 'age-child';
INSERT INTO public.age_mapping (group_key, min_age, max_age) VALUES ('age-preschool', 0, 5) ON CONFLICT (group_key) DO NOTHING;
INSERT INTO public.macro_area_eligible_age_groups (macro_area_id, age_group) VALUES
  ('ma36', 'age-preschool'), ('ma37', 'age-preschool'), ('ma39', 'age-preschool'), ('ma49', 'age-preschool'),
  ('ma36', 'age-child'), ('ma37', 'age-child'), ('ma38', 'age-child'), ('ma39', 'age-child'), ('ma46', 'age-child'), ('ma49', 'age-child')
ON CONFLICT DO NOTHING;