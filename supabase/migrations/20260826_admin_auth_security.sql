-- PIXULINHOS - ADMIN AUTH SECURITY MIGRATION
-- Safe/idempotent: creates only the missing admin access layer.
-- Does NOT drop or delete existing CMS data.

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read own admin record" ON public.admin_users;
CREATE POLICY "Admins can read own admin record"
  ON public.admin_users FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.is_pixulinhos_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION public.is_pixulinhos_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_pixulinhos_admin() TO authenticated;

-- Protect existing CMS tables without changing their data.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'categories','products','banners','inspire_posts','look_bundles',
    'reviews','faqs','home_sections','site_settings','media_library'
  ] LOOP
    IF to_regclass(format('public.%I', t)) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('DROP POLICY IF EXISTS "Pixulinhos public read %s" ON public.%I', t, t);
      EXECUTE format('DROP POLICY IF EXISTS "Pixulinhos admin write %s" ON public.%I', t, t);
      EXECUTE format('CREATE POLICY "Pixulinhos public read %s" ON public.%I FOR SELECT TO anon, authenticated USING (true)', t, t);
      EXECUTE format('CREATE POLICY "Pixulinhos admin write %s" ON public.%I FOR ALL TO authenticated USING (public.is_pixulinhos_admin()) WITH CHECK (public.is_pixulinhos_admin())', t, t);
    END IF;
  END LOOP;
END $$;

-- Orders contain customer information: admin only.
DO $$
BEGIN
  IF to_regclass('public.orders') IS NOT NULL THEN
    ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Pixulinhos admin orders" ON public.orders;
    CREATE POLICY "Pixulinhos admin orders" ON public.orders FOR ALL TO authenticated
      USING (public.is_pixulinhos_admin()) WITH CHECK (public.is_pixulinhos_admin());
  END IF;
END $$;

-- Storage: admins can manage the Pixulinhos media buckets.
DROP POLICY IF EXISTS "Pixulinhos admin storage insert" ON storage.objects;
DROP POLICY IF EXISTS "Pixulinhos admin storage update" ON storage.objects;
DROP POLICY IF EXISTS "Pixulinhos admin storage delete" ON storage.objects;

CREATE POLICY "Pixulinhos admin storage insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin());
CREATE POLICY "Pixulinhos admin storage update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin())
  WITH CHECK (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin());
CREATE POLICY "Pixulinhos admin storage delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('pixulinhos-media','pixulinhos-products','pixulinhos-banners') AND public.is_pixulinhos_admin());

-- After this migration succeeds, register ONLY the Auth user's UUID:
-- INSERT INTO public.admin_users (user_id)
-- VALUES ('5b3dee81-5856-4c75-b0f3-3bf638ff836c')
-- ON CONFLICT DO NOTHING;
