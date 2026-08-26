import { getSupabase } from '../lib/supabase';
import { cmsStore, notifyCMSUpdate } from './cmsStore';
import type {
  Category,
  Product,
  Banner,
  InspirePost,
  LookBundle,
  Review,
  FAQ,
  HomeSection,
  SiteSettings,
  MediaItem,
} from '../types';

let installed = false;

const report = (operation: string, error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[Pixulinhos CMS] ${operation}:`, message);
};

/**
 * Keeps the existing local CMS behavior intact while mirroring every admin
 * mutation to Supabase. This is intentionally installed only by the admin
 * dashboard, so normal storefront rendering is unaffected.
 */
export function installSupabaseCmsPersistence(): void {
  if (installed) return;
  installed = true;

  const supabase = getSupabase();
  if (!supabase) {
    console.warn('[Pixulinhos CMS] Supabase is not configured; using local CMS only.');
    return;
  }

  const original = {
    saveProducts: cmsStore.saveProducts,
    addProduct: cmsStore.addProduct,
    updateProduct: cmsStore.updateProduct,
    deleteProduct: cmsStore.deleteProduct,
    saveCategories: cmsStore.saveCategories,
    addCategory: cmsStore.addCategory,
    updateCategory: cmsStore.updateCategory,
    deleteCategory: cmsStore.deleteCategory,
    saveBanners: cmsStore.saveBanners,
    addBanner: cmsStore.addBanner,
    updateBanner: cmsStore.updateBanner,
    deleteBanner: cmsStore.deleteBanner,
    saveInspirePosts: cmsStore.saveInspirePosts,
    addInspirePost: cmsStore.addInspirePost,
    updateInspirePost: cmsStore.updateInspirePost,
    deleteInspirePost: cmsStore.deleteInspirePost,
    saveLookBundles: cmsStore.saveLookBundles,
    addLookBundle: cmsStore.addLookBundle,
    updateLookBundle: cmsStore.updateLookBundle,
    deleteLookBundle: cmsStore.deleteLookBundle,
    saveReviews: cmsStore.saveReviews,
    addReview: cmsStore.addReview,
    updateReview: cmsStore.updateReview,
    deleteReview: cmsStore.deleteReview,
    saveFaqs: cmsStore.saveFaqs,
    addFaq: cmsStore.addFaq,
    updateFaq: cmsStore.updateFaq,
    deleteFaq: cmsStore.deleteFaq,
    saveHomeSections: cmsStore.saveHomeSections,
    saveMediaItems: cmsStore.saveMediaItems,
    addMediaItem: cmsStore.addMediaItem,
    deleteMediaItem: cmsStore.deleteMediaItem,
    saveSettings: cmsStore.saveSettings,
  };

  const productRow = (p: Product) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    slug: p.slug || p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-'),
    price: p.price,
    original_price: p.originalPrice ?? null,
    discount_percentage: p.discountPercentage ?? 0,
    installments: p.installments ?? null,
    stock: p.stock ?? 0,
    weight: p.weight ?? null,
    dimensions: p.dimensions ?? null,
    category_id: p.categoryId ?? null,
    brand: p.brand ?? 'Pixulinhos',
    main_image: p.images?.[0] || p.mainImage || '',
    images: p.images ?? [],
    sizes: p.sizes ?? [],
    colors: p.colors ?? [],
    description: p.description ?? '',
    short_description: p.shortDescription ?? null,
    details: p.details ?? [],
    is_new: p.isNew ?? false,
    is_featured: p.isFeatured ?? false,
    is_promotion: p.isPromotion ?? false,
    is_bestseller: p.isBestSeller ?? false,
    is_active: p.isActive ?? true,
    rating: p.rating ?? 5,
    review_count: p.reviewCount ?? 0,
  });

  const categoryRow = (c: Category) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? null,
    icon: c.icon ?? null,
    order_index: c.order ?? 0,
    is_active: c.isActive ?? true,
    is_featured: c.isFeatured ?? false,
    meta_title: c.metaTitle ?? null,
    meta_description: c.metaDescription ?? null,
  });

  const bannerRow = (b: Banner) => ({
    id: b.id,
    title: b.title,
    subtitle: b.subtitle ?? null,
    button_text: b.buttonText ?? null,
    button_link: b.buttonLink ?? null,
    image: b.image,
    mobile_image: b.mobileImage ?? null,
    badge_text: b.badgeText ?? null,
    category_slug: b.categorySlug ?? null,
    priority: b.priority ?? 0,
    active: b.active ?? true,
  });

  const inspireRow = (p: InspirePost) => ({
    id: p.id,
    baby_name: p.babyName,
    age: p.age,
    city: p.city ?? null,
    image: p.image,
    product_name: p.productName ?? null,
    product_id: p.productId ?? null,
    caption: p.caption ?? null,
    likes: p.likes ?? 0,
    date: p.date ?? null,
    is_active: p.isActive ?? true,
  });

  const bundleRow = (b: LookBundle) => ({
    id: b.id,
    title: b.title,
    theme: b.theme ?? null,
    cover_image: b.coverImage,
    price: b.price,
    original_price: b.originalPrice ?? null,
    savings_text: b.savingsText ?? null,
    description: b.description ?? null,
    items: b.items ?? [],
    related_product_ids: b.relatedProductIds ?? [],
    order_index: b.order ?? 0,
    is_active: b.isActive ?? true,
  });

  const reviewRow = (r: Review) => ({
    id: r.id,
    author_name: r.authorName,
    baby_info: r.babyInfo ?? null,
    rating: r.rating ?? 5,
    comment: r.comment,
    photo: r.photo ?? null,
    product_name: r.productName ?? null,
    verified_purchase: r.verifiedPurchase ?? true,
    date: r.date ?? null,
    is_active: r.isActive ?? true,
  });

  const faqRow = (f: FAQ) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category ?? 'Geral',
    order_index: f.order ?? 0,
    is_active: f.isActive ?? true,
  });

  const sectionRow = (s: HomeSection) => ({
    id: s.id,
    section_key: s.key,
    title: s.title ?? null,
    subtitle: s.subtitle ?? null,
    order_index: s.order ?? 0,
    is_active: s.isActive ?? true,
    config: s.config ?? {},
  });

  const mediaRow = (m: MediaItem) => ({
    id: m.id,
    name: m.name,
    url: m.url,
    type: m.type ?? 'image',
    size: m.size ?? 0,
    folder: m.folder ?? 'Geral',
  });

  cmsStore.saveProducts = (items) => {
    original.saveProducts(items);
    void supabase.from('products').upsert(items.map(productRow), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('salvar produtos', error);
    });
  };

  cmsStore.addProduct = (item) => {
    original.addProduct(item);
    void supabase.from('products').upsert(productRow(item), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('adicionar produto', error);
    });
  };

  cmsStore.updateProduct = (item) => {
    original.updateProduct(item);
    void supabase.from('products').upsert(productRow(item), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('atualizar produto', error);
    });
  };

  cmsStore.deleteProduct = (id) => {
    original.deleteProduct(id);
    void supabase.from('products').delete().eq('id', id).then(({ error }) => {
      if (error) report('excluir produto', error);
    });
  };

  cmsStore.saveCategories = (items) => {
    original.saveCategories(items);
    void supabase.from('categories').upsert(items.map(categoryRow), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('salvar categorias', error);
    });
  };
  cmsStore.addCategory = (item) => {
    original.addCategory(item);
    void supabase.from('categories').upsert(categoryRow(item), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('adicionar categoria', error);
    });
  };
  cmsStore.updateCategory = (item) => {
    original.updateCategory(item);
    void supabase.from('categories').upsert(categoryRow(item), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('atualizar categoria', error);
    });
  };
  cmsStore.deleteCategory = (id) => {
    original.deleteCategory(id);
    void supabase.from('categories').delete().eq('id', id).then(({ error }) => {
      if (error) report('excluir categoria', error);
    });
  };

  cmsStore.saveBanners = (items) => {
    original.saveBanners(items);
    void supabase.from('banners').upsert(items.map(bannerRow), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('salvar banners', error);
    });
  };
  cmsStore.addBanner = (item) => {
    original.addBanner(item);
    void supabase.from('banners').upsert(bannerRow(item), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('adicionar banner', error);
    });
  };
  cmsStore.updateBanner = (item) => {
    original.updateBanner(item);
    void supabase.from('banners').upsert(bannerRow(item), { onConflict: 'id' }).then(({ error }) => {
      if (error) report('atualizar banner', error);
    });
  };
  cmsStore.deleteBanner = (id) => {
    original.deleteBanner(id);
    void supabase.from('banners').delete().eq('id', id).then(({ error }) => {
      if (error) report('excluir banner', error);
    });
  };

  const wireCrud = <T,>(
    key: 'inspire_posts' | 'look_bundles' | 'reviews' | 'faqs',
    methods: {
      save: (items: T[]) => void;
      add: (item: T) => void;
      update: (item: T) => void;
      remove: (id: string) => void;
    },
    originalMethods: typeof methods,
    row: (item: T) => Record<string, unknown>,
  ) => {
    methods.save = (items) => {
      originalMethods.save(items);
      void supabase.from(key).upsert(items.map(row), { onConflict: 'id' }).then(({ error }) => {
        if (error) report(`salvar ${key}`, error);
      });
    };
    methods.add = (item) => {
      originalMethods.add(item);
      void supabase.from(key).upsert(row(item), { onConflict: 'id' }).then(({ error }) => {
        if (error) report(`adicionar ${key}`, error);
      });
    };
    methods.update = (item) => {
      originalMethods.update(item);
      void supabase.from(key).upsert(row(item), { onConflict: 'id' }).then(({ error }) => {
        if (error) report(`atualizar ${key}`, error);
      });
    };
    methods.remove = (id) => {
      originalMethods.remove(id);
      void supabase.from(key).delete().eq('id', id).then(({ error }) => {
        if (error) report(`excluir ${key}`, error);
      });
    };
  };

  const inspireMethods = {
    save: original.saveInspirePosts,
    add: original.addInspirePost,
    update: original.updateInspirePost,
    remove: original.deleteInspirePost,
  };
  wireCrud('inspire_posts', {
    save: (items) => { original.saveInspirePosts(items as InspirePost[]); },
    add: (item) => { original.addInspirePost(item as InspirePost); },
    update: (item) => { original.updateInspirePost(item as InspirePost); },
    remove: (id) => { original.deleteInspirePost(id); },
  }, inspireMethods, inspireRow as (item: InspirePost) => Record<string, unknown>);
  cmsStore.saveInspirePosts = (items) => { original.saveInspirePosts(items); void supabase.from('inspire_posts').upsert(items.map(inspireRow), { onConflict: 'id' }).then(({ error }) => { if (error) report('salvar inspire_posts', error); }); };
  cmsStore.addInspirePost = (item) => { original.addInspirePost(item); void supabase.from('inspire_posts').upsert(inspireRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('adicionar inspire_posts', error); }); };
  cmsStore.updateInspirePost = (item) => { original.updateInspirePost(item); void supabase.from('inspire_posts').upsert(inspireRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('atualizar inspire_posts', error); }); };
  cmsStore.deleteInspirePost = (id) => { original.deleteInspirePost(id); void supabase.from('inspire_posts').delete().eq('id', id).then(({ error }) => { if (error) report('excluir inspire_posts', error); }); };

  cmsStore.saveLookBundles = (items) => { original.saveLookBundles(items); void supabase.from('look_bundles').upsert(items.map(bundleRow), { onConflict: 'id' }).then(({ error }) => { if (error) report('salvar look_bundles', error); }); };
  cmsStore.addLookBundle = (item) => { original.addLookBundle(item); void supabase.from('look_bundles').upsert(bundleRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('adicionar look_bundles', error); }); };
  cmsStore.updateLookBundle = (item) => { original.updateLookBundle(item); void supabase.from('look_bundles').upsert(bundleRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('atualizar look_bundles', error); }); };
  cmsStore.deleteLookBundle = (id) => { original.deleteLookBundle(id); void supabase.from('look_bundles').delete().eq('id', id).then(({ error }) => { if (error) report('excluir look_bundles', error); }); };

  cmsStore.saveReviews = (items) => { original.saveReviews(items); void supabase.from('reviews').upsert(items.map(reviewRow), { onConflict: 'id' }).then(({ error }) => { if (error) report('salvar reviews', error); }); };
  cmsStore.addReview = (item) => { original.addReview(item); void supabase.from('reviews').upsert(reviewRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('adicionar review', error); }); };
  cmsStore.updateReview = (item) => { original.updateReview(item); void supabase.from('reviews').upsert(reviewRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('atualizar review', error); }); };
  cmsStore.deleteReview = (id) => { original.deleteReview(id); void supabase.from('reviews').delete().eq('id', id).then(({ error }) => { if (error) report('excluir review', error); }); };

  cmsStore.saveFaqs = (items) => { original.saveFaqs(items); void supabase.from('faqs').upsert(items.map(faqRow), { onConflict: 'id' }).then(({ error }) => { if (error) report('salvar faqs', error); }); };
  cmsStore.addFaq = (item) => { original.addFaq(item); void supabase.from('faqs').upsert(faqRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('adicionar faq', error); }); };
  cmsStore.updateFaq = (item) => { original.updateFaq(item); void supabase.from('faqs').upsert(faqRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('atualizar faq', error); }); };
  cmsStore.deleteFaq = (id) => { original.deleteFaq(id); void supabase.from('faqs').delete().eq('id', id).then(({ error }) => { if (error) report('excluir faq', error); }); };

  cmsStore.saveHomeSections = (items) => { original.saveHomeSections(items); void supabase.from('home_sections').upsert(items.map(sectionRow), { onConflict: 'id' }).then(({ error }) => { if (error) report('salvar home_sections', error); }); };

  cmsStore.saveMediaItems = (items) => { original.saveMediaItems(items); void supabase.from('media_library').upsert(items.map(mediaRow), { onConflict: 'id' }).then(({ error }) => { if (error) report('salvar media_library', error); }); };
  cmsStore.addMediaItem = (item) => { original.addMediaItem(item); void supabase.from('media_library').upsert(mediaRow(item), { onConflict: 'id' }).then(({ error }) => { if (error) report('adicionar media_library', error); }); };
  cmsStore.deleteMediaItem = (id) => { original.deleteMediaItem(id); void supabase.from('media_library').delete().eq('id', id).then(({ error }) => { if (error) report('excluir media_library', error); }); };

  cmsStore.saveSettings = (settings: SiteSettings) => {
    original.saveSettings(settings);
    void supabase.from('site_settings').upsert({
      id: 1,
      store_name: settings.storeName,
      whatsapp_number: settings.whatsappNumber,
      top_announcement: settings.topAnnouncement,
      hero_title: settings.heroTitle,
      hero_subheadline: settings.heroSubheadline,
      hero_badge_text: settings.heroBadgeText,
      instagram_url: settings.instagramUrl,
      facebook_url: settings.facebookUrl,
      store_address: settings.storeAddress,
    }, { onConflict: 'id' }).then(({ error }) => {
      if (error) report('salvar site_settings', error);
    });
  };

  notifyCMSUpdate();
}
