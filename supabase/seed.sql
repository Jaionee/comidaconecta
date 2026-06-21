-- =============================================================
-- SEED DATA - ComidaConecta MVP
-- =============================================================
-- Ejecutar después de la migración inicial.
-- Crea un admin por defecto y datos de prueba.
-- =============================================================

-- NOTA: El usuario admin debe crearse primero en Supabase Auth
-- (email: admin@comidaconecta.es, contraseña: Admin123!)
-- Luego ejecutar este SQL con el UUID del usuario.

-- =============================================================
-- 1. CREAR PERFIL ADMIN (reemplaza el UUID)
-- =============================================================
INSERT INTO profiles (id, email, role, name, created_at)
VALUES (
  'REEMPLAZA_CON_UUID_DEL_ADMIN',
  'admin@comidaconecta.es',
  'admin',
  'Administrador ComidaConecta',
  now()
) ON CONFLICT (id) DO NOTHING;

-- =============================================================
-- 2. CREAR COMERCIO DE PRUEBA
-- =============================================================
-- Primero crear un usuario auth de prueba en Supabase dashboard
-- email: panaderia@test.com, pass: Test1234!
-- Luego reemplazar el UUID

INSERT INTO profiles (id, email, role, name, phone, created_at)
VALUES (
  'REEMPLAZA_CON_UUID_DEL_COMERCIO',
  'panaderia@test.com',
  'commerce',
  'Panadería Bilbao',
  '+34 600 111 222',
  now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO commerces (user_id, business_name, business_type, email, phone, city, address, contact_person, status, created_at)
VALUES (
  'REEMPLAZA_CON_UUID_DEL_COMERCIO',
  'Panadería Bilbao Centro',
  'bakery',
  'panaderia@test.com',
  '+34 600 111 222',
  'Bilbao',
  'Calle Ejemplo 12',
  'María López',
  'active',
  now()
) ON CONFLICT DO NOTHING;

-- =============================================================
-- 3. CREAR ONG DE PRUEBA
-- =============================================================
-- email: comedor@test.com, pass: Test1234!

INSERT INTO profiles (id, email, role, name, phone, created_at)
VALUES (
  'REEMPLAZA_CON_UUID_DEL_NGO',
  'comedor@test.com',
  'ngo',
  'Comedor Social Bilbao',
  '+34 600 333 444',
  now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO ngos (user_id, organization_name, tax_id, email, phone, city, address, contact_person, status, food_needs, created_at)
VALUES (
  'REEMPLAZA_CON_UUID_DEL_NGO',
  'Comedor Social Bilbao',
  'G12345678',
  'comedor@test.com',
  '+34 600 333 444',
  'Bilbao',
  'Calle Solidaridad 5',
  'Ana Martínez',
  'active',
  ARRAY['Pan y bollería', 'Frutas y verduras', 'Comida preparada'],
  now()
) ON CONFLICT DO NOTHING;

-- =============================================================
-- 4. CREAR DONACIONES DE PRUEBA
-- =============================================================
-- Asumiendo que el comercio de prueba tiene id = UUID de comercio
-- y que profiles ya existe

DO $$
DECLARE
  v_commerce_id UUID := 'REEMPLAZA_CON_UUID_DEL_COMERCIO';
  v_ngo_id UUID := 'REEMPLAZA_CON_UUID_DEL_NGO';
BEGIN
  -- Donación 1: disponible
  INSERT INTO donations (commerce_id, title, description, quantity_text, estimated_servings, category, pickup_address, pickup_deadline, status, created_at)
  VALUES (v_commerce_id, 'Excedente de pan artesano', 'Pan del día sin vender. Variedad de barras, chapatas y molletes.', 'Aprox. 15 kg', 60, 'Pan', 'Calle Ejemplo 12, Bilbao', now() + interval '2 days', 'available', now());

  -- Donación 2: disponible
  INSERT INTO donations (commerce_id, title, description, quantity_text, estimated_servings, category, pickup_address, pickup_deadline, status, created_at)
  VALUES (v_commerce_id, 'Bollería variada', 'Croissants, napolitanas y ensaimadas de hoy. En perfecto estado.', 'Aprox. 8 kg', 40, 'Bollería', 'Calle Ejemplo 12, Bilbao', now() + interval '1 day', 'available', now() - interval '1 hour');

  -- Donación 3: ya reservada por ONG
  INSERT INTO donations (commerce_id, title, description, quantity_text, estimated_servings, category, pickup_address, pickup_deadline, status, created_at)
  VALUES (v_commerce_id, 'Empanadas y quiches', 'Empanadas de atún y verduras, quiches de espinacas. Empaquetadas.', 'Aprox. 6 kg', 30, 'Comida preparada', 'Calle Ejemplo 12, Bilbao', now() + interval '3 days', 'reserved', now() - interval '2 hours');

  INSERT INTO reservations (donation_id, ngo_id, status, reserved_at)
  VALUES (
    (SELECT id FROM donations WHERE title = 'Empanadas y quiches' LIMIT 1),
    v_ngo_id,
    'reserved',
    now()
  );

  -- Donación 4: completada (historial)
  INSERT INTO donations (commerce_id, title, description, quantity_text, estimated_servings, category, pickup_address, pickup_deadline, status, created_at)
  VALUES (v_commerce_id, 'Tartas de ayer', 'Tartas de manzana y chocolate del día anterior. Perfectas para consumir.', '3 tartas', 24, 'Repostería', 'Calle Ejemplo 12, Bilbao', now() - interval '1 day', 'collected', now() - interval '3 days');

  INSERT INTO reservations (donation_id, ngo_id, status, reserved_at, picked_up_at, collected_at)
  VALUES (
    (SELECT id FROM donations WHERE title = 'Tartas de ayer' LIMIT 1),
    v_ngo_id,
    'collected',
    now() - interval '3 days',
    now() - interval '2 days',
    now() - interval '1 day'
  );
END $$;

-- =============================================================
-- 5. VERIFICAR DATOS
-- =============================================================
SELECT '✅ Admin' as tipo, email, role FROM profiles WHERE role = 'admin';
SELECT '✅ Comercio' as tipo, business_name, status FROM commerces;
SELECT '✅ ONG' as tipo, organization_name, status FROM ngos;
SELECT '✅ Donaciones' as tipo, title, status FROM donations;
SELECT '✅ Reservas' as tipo, status, COUNT(*) as total FROM reservations GROUP BY status;
