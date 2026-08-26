-- ==============================================================================
-- PIXULINHOS CMS - SUPABASE DATABASE SCHEMA
-- SECURITY: public can read CMS content; only users marked as admins can write.
-- Keep this file in GitHub as the canonical database backup/migration reference.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- CMS TABLES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'cat-' || uuid_generate_v4(), name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE, description TEXT, image TEXT, icon VARCHAR(100),
  order_index INT NOT NULL DEFAULT 0, is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE, meta_title VARCHAR(255), meta_description TEXT,
  meta_keywords VARCHAR(255), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), deleted_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'prod-' || uuid_generate_v4(), sku VARCHAR(100), name VARCHAR(255) NOT NULL,
  slug VARCHAR(255), price NUMERIC(10,2) NOT NULL DEFAULT 0.00, original_price NUMERIC(10,2), discount_percentage INT DEFAULT 0,
  installments VARCHAR(100) DEFAULT 'até 6x sem juros', stock INT NOT NULL DEFAULT 99, weight NUMERIC(6,2) DEFAULT 0.20,
  dimensions JSONB DEFAULT '{"length": 20, "width": 15, "height": 5}', category_id VARCHAR(255) REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id VARCHAR(255), brand VARCHAR(100) DEFAULT 'Pixulinhos', main_image TEXT NOT NULL, images JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_url TEXT, sizes JSONB NOT NULL DEFAULT '["RN","P","M","G"]'::jsonb, colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT NOT NULL, short_description TEXT, details JSONB NOT NULL DEFAULT '[]'::jsonb, is_new BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE, is_promotion BOOLEAN DEFAULT FALSE, is_bestseller BOOLEAN DEFAULT FALSE, is_exclusive BOOLEAN DEFAULT FALSE,
  is_launch BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE, order_index INT DEFAULT 0, rating NUMERIC(3,2) DEFAULT 5.0,
  review_count INT DEFAULT 1, related_product_ids JSONB DEFAULT '[]'::jsonb, meta_title VARCHAR(255), meta_description TEXT,
  meta_keywords VARCHAR(255), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), deleted_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS banners (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'banner-' || uuid_generate_v4(), title VARCHAR(255) NOT NULL, subtitle TEXT,
  button_text VARCHAR(100) DEFAULT 'Ver Coleção', button_link VARCHAR(255), image TEXT NOT NULL, mobile_image TEXT,
  badge_text VARCHAR(100), category_slug VARCHAR(255), priority INT DEFAULT 1, start_date DATE, end_date DATE,
  is_featured BOOLEAN DEFAULT FALSE, active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), deleted_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS inspire_posts (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'inspire-' || uuid_generate_v4(), baby_name VARCHAR(100) NOT NULL, age VARCHAR(50) NOT NULL,
  city VARCHAR(100), image TEXT NOT NULL, product_name VARCHAR(255), product_id VARCHAR(255) REFERENCES products(id) ON DELETE SET NULL,
  caption TEXT, likes INT DEFAULT 0, date VARCHAR(100), is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), deleted_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS look_bundles (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'look-' || uuid_generate_v4(), title VARCHAR(255) NOT NULL, theme VARCHAR(100), cover_image TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL, original_price NUMERIC(10,2), savings_text VARCHAR(100), description TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb, related_product_ids JSONB DEFAULT '[]'::jsonb, order_index INT DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'rev-' || uuid_generate_v4(), author_name VARCHAR(100) NOT NULL, baby_info VARCHAR(100),
  rating INT NOT NULL DEFAULT 5, comment TEXT NOT NULL, photo TEXT, product_name VARCHAR(255), verified_purchase BOOLEAN DEFAULT TRUE,
  date VARCHAR(100), is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS faqs (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'faq-' || uuid_generate_v4(), question TEXT NOT NULL, answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'Geral', order_index INT DEFAULT 0, is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS home_sections (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'sec-' || uuid_generate_v4(), section_key VARCHAR(100) NOT NULL UNIQUE, title VARCHAR(255), subtitle TEXT,
  order_index INT NOT NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1, store_name VARCHAR(255) DEFAULT 'Pixulinhos', logo_url TEXT, favicon_url TEXT,
  whatsapp_number VARCHAR(50) DEFAULT '5548991147392', phone_number VARCHAR(50), email VARCHAR(100),
  store_address TEXT DEFAULT 'Florianópolis / SC • Entregamos para todo o Brasil com amor', map_embed_url TEXT,
  top_announcement TEXT DEFAULT '🚚 FRETE GRÁTIS para todo o Brasil em compras acima de R$ 199 • Parcelamos em até 6x sem juros! 💚',
  hero_title TEXT DEFAULT 'Roupas que vestem carinho e abraçam cada momento do seu bebê',
  hero_subheadline TEXT DEFAULT 'Peças em 100% Algodão Egípcio, hipoalergênicas, com toque de nuvem e design autoral feito para encantar mamães e papais.',
  hero_badge_text VARCHAR(255) DEFAULT '✨ Coleção Doce Infância 2026', footer_text TEXT, instagram_url TEXT DEFAULT 'https://instagram.com',
  tiktok_url TEXT, facebook_url TEXT DEFAULT 'https://facebook.com', pinterest_url TEXT, exchange_policy TEXT, privacy_policy TEXT,
  terms_policy TEXT, cookies_policy TEXT, global_meta_title VARCHAR(255) DEFAULT 'Pixulinhos - Roupas que Vestem Carinho',
  global_meta_description TEXT DEFAULT 'Moda infantil em Algodão Egípcio, Saída Maternidade, Bodys e Macacões.',
  global_meta_keywords VARCHAR(255) DEFAULT 'roupa de bebê, saída maternidade, algodão egípcio, body bebê', google_analytics_id VARCHAR(100),
  meta_pixel_id VARCHAR(100), gtm_id VARCHAR(100), custom_header_scripts TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS media_library (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'media-' || uuid_generate_v4(), name VARCHAR(255) NOT NULL, url TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'image', size INT DEFAULT 0, folder VARCHAR(100) DEFAULT 'Geral', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(255) PRIMARY KEY DEFAULT 'ord-' || uuid_generate_v4(), customer_name VARCHAR(255) NOT NULL, customer_email VARCHAR(255),
  customer_phone VARCHAR(50), items JSONB NOT NULL DEFAULT '[]'::jsonb, total_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pendente', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- ADMIN ACCESS CONTROL
-- Add the UUID of the Supabase Auth user you created to this table.
-- This is intentionally NOT seeded with a password or secret.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can read own admin record" ON admin_users;
CREATE POLICY "Admins can read own admin record" ON admin_users FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.is_pixulinhos_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;
REVOKE ALL ON FUNCTION public.is_pixulinhos_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_pixulinhos_admin() TO authenticated;

-- ------------------------------------------------------------------------------
-- UPDATED_AT TRIGGERS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['categories','products','banners','inspire_posts','look_bundles','reviews','faqs','home_sections','site_settings'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_updated_at ON %I', t, t);
    EXECUTE format('CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t, t);
  END LOOP;
END $$;

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(order_index);
CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(active);

-- ------------------------------------------------------------------------------
-- RLS: public SELECT; admin-only INSERT/UPDATE/DELETE
-- ------------------------------------------------------------------------------
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['categories','products','banners','inspire_posts','look_bundles','reviews','faqs','home_sections','site_settings','media_library'] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow public read on %s" ON %I', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow public all on %s" ON %I', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "Admin write on %s" ON %I', t, t);
    EXECUTE format('CREATE POLICY "Allow public read on %s" ON %I FOR SELECT TO anon, authenticated USING (true)', t, t);
    EXECUTE format('CREATE POLICY "Admin write on %s" ON %I FOR ALL TO authenticated USING (public.is_pixulinhos_admin()) WITH CHECK (public.is_pixulinhos_admin())', t, t);
  END LOOP;
END $$;

-- Orders are private/admin-only; public storefront must not read customer data.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on orders" ON orders;
DROP POLICY IF EXISTS "Allow public all on orders" ON orders;
DROP POLICY IF EXISTS "Admin access on orders" ON orders;
CREATE POLICY "Admin access on orders" ON orders FOR ALL TO authenticated USING (public.is_pixulinhos_admin()) WITH CHECK (public.is_pixulinhos_admin());

-- ------------------------------------------------------------------------------
-- STORAGE SECURITY
-- Buckets should be created as PUBLIC for storefront image delivery:
-- pixulinhos-media, pixulinhos-products, pixulinhos-banners
-- Upload/update/delete is restricted to authenticated admins.
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admin upload Pixulinhos storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin update Pixulinhos storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete Pixulinhos storage" ON storage.objects;
CREATE POLICY "Admin upload Pixulinhos storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin());
CREATE POLICY "Admin update Pixulinhos storage" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin()) WITH CHECK (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin());
CREATE POLICY "Admin delete Pixulinhos storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin());

-- IMPORTANT: after creating the Auth user, run once in Supabase SQL Editor:
-- INSERT INTO public.admin_users (user_id) VALUES ('SEU-UUID-DO-USUARIO-AUTH') ON CONFLICT DO NOTHING;
