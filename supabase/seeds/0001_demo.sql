-- Demo seed for user 74486022-50c3-4049-a591-ab2f535894ae (demo@fixit.test / demo12345)
do $$
declare
  uid uuid := '74486022-50c3-4049-a591-ab2f535894ae';
begin
  -- profile prefilled
  update profiles set
    display_name = 'Amanda Demo',
    home_kind = 'house',
    home_year_built = 1998,
    home_zip = '80203',
    rooms = array['kitchen','bath','living','bedroom','attic']::room_kind[]
  where id = uid;

  -- 6 estimates mirroring mock/estimates.ts
  insert into estimates (user_id, code, title, room, category, diy_price, hybrid_price, pro_price, chosen_mode, actual_paid, severity, diagnosis, savings_vs_pro, status, captured_at) values
    (uid,'EST-2026-0421-RL','Roof Leak — NW Quadrant','attic','roof',15,45,450,'hybrid',null,'moderate','Structural breach in NW quadrant. Sub-layer moisture penetration. Patch repair viable.',405,'in-progress','2026-04-21 14:08+00'),
    (uid,'EST-2026-0418-AM','Attic Moisture Sensor Alert','attic','roof',35,80,220,null,null,'low','Humidity reading 12% above seasonal norm. Likely ventilation — monitor first.',0,'draft','2026-04-18 10:22+00'),
    (uid,'EST-2026-0402-TG','Bathroom Tile Grout','bath','walls',32,120,320,'diy',28,'low','Grout haze + minor lift along tub edge. Regrouting + re-caulk resolves.',292,'completed','2026-04-02 19:47+00'),
    (uid,'EST-2026-0325-TR','Kitchen Tap Replacement','kitchen','plumbing',145,220,380,'diy',145,'low','Single-lever cartridge fatigued. Swap with direct replacement, 30–40 min.',235,'completed','2026-03-25 08:15+00'),
    (uid,'EST-2026-0310-HG','Living Room Hinge','living','walls',8,40,95,'diy',8,'low','Lower hinge pin walked out. Replace pin, align door, re-torque.',87,'completed','2026-03-10 13:05+00'),
    (uid,'EST-2026-0228-DW','Dishwasher Pump Failure','kitchen','appliance',75,180,340,'hybrid',175,'moderate','Drain pump seizing under load. Part swap straightforward; hose-work is trickier.',165,'completed','2026-02-28 09:30+00');

  -- mark roof leak + grout as saved
  update estimates set is_saved = true where user_id = uid and code in ('EST-2026-0421-RL','EST-2026-0402-TG');

  -- one repair guide for the active roof leak
  insert into repairs (user_id, estimate_id, code, title, status, summary, impact, impact_description, severity, time_estimate, time_unit, progress, stage_label, tools, routes)
  select uid, id, 'REF: RP-002', 'Roof Leak', 'Active Repair',
    'Structural breach identified in North-West quadrant. Moisture penetration detected in sub-layer.',
    '$450',
    'Calculated based on local material costs and standard labor rates for a localized patch repair.',
    'moderate', '4-6', 'Hours', 0.35, '0/1 STAGE COMPLETE · 35%',
    array['Sealant','Ladder','Trowel'],
    '[
      {"key":"diy","label":"DIY","price":"$15","meta":"DIY · 15 MIN"},
      {"key":"hybrid","label":"Hybrid","price":"$45","meta":"HYBRID · 45 MIN","recommended":true},
      {"key":"pro","label":"Full Pro","price":"$180","meta":"FULL PRO · 2 HOURS"}
    ]'::jsonb
  from estimates where user_id = uid and code = 'EST-2026-0421-RL';

  -- room metadata
  insert into room_metadata (user_id, room, meta, last_inspected_at) values
    (uid, 'kitchen', '{"faucet":"Moen 7294","dishwasher":"Bosch SHPM78Z55N","filter":"Under-sink Pro"}'::jsonb, '2026-04-19 10:00+00'),
    (uid, 'bath',    '{"toilet":"Toto Drake","showerhead":"Hansgrohe 28457001"}'::jsonb, '2026-04-15 08:30+00'),
    (uid, 'attic',   '{"insulation":"R-49 fibreglass","ventilation":"Ridge + soffit"}'::jsonb, '2026-04-21 14:00+00');

  -- maintenance tasks
  insert into maintenance_tasks (user_id, title, season, due_date) values
    (uid, 'Inspect roof for spring-thaw damage',          'spring', '2026-04-30'),
    (uid, 'Flush water heater sediment',                  'spring', '2026-05-10'),
    (uid, 'Service A/C condenser coils',                  'summer', '2026-06-05'),
    (uid, 'Clean dryer vent end-to-end',                  'fall',   '2026-09-20'),
    (uid, 'Test smoke + CO detectors',                    'fall',   '2026-10-01'),
    (uid, 'Reverse ceiling fans + check window seals',    'winter', '2026-11-15');

  -- notifications inbox
  insert into notifications (user_id, title, body, meta, tone, created_at) values
    (uid,'Attic Moisture Detected','Sensor 04 spiked 12% over seasonal norm at 14:32.','SENSOR 04 · 12 MINS AGO','warn',  now() - interval '12 minutes'),
    (uid,'HVAC Filter Optimal','30 days remaining on current filter.','SYSTEM CHECK · 2 HRS AGO','success', now() - interval '2 hours'),
    (uid,'Roof Inspection Recommended','Structural breach detected — schedule repair within 7 days.','EST-2026-0421-RL · 1 DAY AGO','danger', now() - interval '1 day'),
    (uid,'New seasonal task','Inspect roof for spring-thaw damage — due Apr 30.','SPRING TASK · 2 DAYS AGO','info', now() - interval '2 days'),
    (uid,'Saved $292','Bathroom Tile Grout DIY beat the pro quote.','EST-2026-0402-TG · 3 WEEKS AGO','success', now() - interval '3 weeks'),
    (uid,'Welcome to FixIt','Snap your first photo to get an instant estimate.','ONBOARDING · WELCOME','info', now() - interval '5 weeks');

  -- referrals — bump invited count
  update referrals set invited_count = 2, earned_count = 2 where user_id = uid;
end $$;
