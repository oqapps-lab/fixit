insert into public.repair_templates (
  id,
  code,
  title,
  status,
  summary,
  impact,
  impact_description,
  severity,
  time_estimate,
  time_unit,
  progress,
  stage_label,
  tools,
  route_options_json
)
values (
  'rp-002',
  'REF: RP-002',
  'Roof Leak',
  'Active Repair',
  'Structural breach identified in North-West quadrant. Moisture penetration detected in sub-layer.',
  '$450',
  'Calculated based on local material costs and standard labor rates for a localized patch repair.',
  'moderate',
  '4-6',
  'Hours',
  0.35,
  '0/1 STAGE COMPLETE · 35%',
  array['Sealant', 'Ladder', 'Trowel'],
  '[
    {"key":"diy","label":"DIY","price":"$15","meta":"DIY · 15 MIN","recommended":false},
    {"key":"hybrid","label":"Hybrid","price":"$45","meta":"HYBRID · 45 MIN","recommended":true},
    {"key":"pro","label":"Full Pro","price":"$180","meta":"FULL PRO · 2 HOURS","recommended":false}
  ]'::jsonb
)
on conflict (id) do update
set
  code = excluded.code,
  title = excluded.title,
  status = excluded.status,
  summary = excluded.summary,
  impact = excluded.impact,
  impact_description = excluded.impact_description,
  severity = excluded.severity,
  time_estimate = excluded.time_estimate,
  time_unit = excluded.time_unit,
  progress = excluded.progress,
  stage_label = excluded.stage_label,
  tools = excluded.tools,
  route_options_json = excluded.route_options_json;

insert into public.repair_activities (id, title, price, sort_order)
values
  ('k-1', 'Kitchen Tap Replacement', '$145.00', 10),
  ('k-2', 'Bathroom Tile Grout', '$320.00', 20),
  ('k-3', 'Living Room Hinge', '$55.00', 30)
on conflict (id) do update
set
  title = excluded.title,
  price = excluded.price,
  sort_order = excluded.sort_order;
