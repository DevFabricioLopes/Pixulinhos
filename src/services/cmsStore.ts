import {
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
  Order,
  CMSStats
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_BANNERS,
  INITIAL_INSPIRE_POSTS,
  INITIAL_LOOK_BUNDLES,
  INITIAL_REVIEWS,
  INITIAL_FAQS,
  INITIAL_HOME_SECTIONS,
  INITIAL_MEDIA,
  INITIAL_SITE_SETTINGS
} from '../data/initialData';
import { getSupabase } from '../lib/supabase';

const KEYS = {
  PRODUCTS: 'pixulinhos_products',
  CATEGORIES: 'pixulinhos_categories',
  BANNERS: 'pixulinhos_banners',
  INSPIRE: 'pixulinhos_inspire',
  BUNDLES: 'pixulinhos_bundles',
  REVIEWS: 'pixulinhos_reviews',
  FAQS: 'pixulinhos_faqs',
  HOME_SECTIONS: 'pixulinhos_home_sections',
  MEDIA: 'pixulinhos_media',
  SETTINGS: 'pixulinhos_settings',
  ORDERS: 'pixulinhos_orders'
};

export const notifyCMSUpdate = () => {
  window.dispatchEvent(new Event('pixulinhos_cms_update'));
};

function getLocal<T>(key: string, fallback: T): T {
  try {
    let raw = localStorage.getItem(key);
    if (!raw) return fallback;

    // Sanitize any legacy 'Egípcio' text
    if (raw.includes('Egípcio') || raw.includes('egípcio') || raw.includes('Egipcio') || raw.includes('egipcio')) {
      raw = raw
        .replaceAll('Algodão Egípcio', '100% Algodão')
        .replaceAll('algodão egípcio', '100% algodão')
        .replaceAll('Algodão Egipcio', '100% Algodão')
        .replaceAll('algodão egipcio', '100% algodão')
        .replaceAll('Egípcio', '100% Algodão')
        .replaceAll('egípcio', '100% algodão');
      localStorage.setItem(key, raw);
    }

    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyCMSUpdate();
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export const cmsStore = {
  // --------------------------------------------------------------------------
  // PRODUCTS CRUD
  // --------------------------------------------------------------------------
  getProducts: (): Product[] => {
    const products = getLocal<Product[]>(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    let updated = false;

    const existingIds = new Set(products.map((p) => p.id));
    let merged = products.map((p) => {
      const initP = INITIAL_PRODUCTS.find((ip) => ip.id === p.id);
      if (initP && initP.images && initP.images.length > (p.images?.length || 0)) {
        updated = true;
        return {
          ...p,
          images: initP.images,
          mainImage: p.mainImage || initP.images[0]
        };
      }
      return p;
    });

    for (const initP of INITIAL_PRODUCTS) {
      if (!existingIds.has(initP.id)) {
        merged.push(initP);
        updated = true;
      }
    }

    if (updated) {
      setLocal(KEYS.PRODUCTS, merged);
    }

    return merged;
  },
  saveProducts: (products: Product[]): void => {
    setLocal(KEYS.PRODUCTS, products);
  },
  addProduct: (product: Product): void => {
    const list = cmsStore.getProducts();
    const newProd = { ...product, createdAt: new Date().toISOString() };
    cmsStore.saveProducts([newProd, ...list]);
    
    // Async sync to Supabase
    const supabase = getSupabase();
    if (supabase) {
      supabase.from('products').insert({
        id: newProd.id,
        sku: newProd.sku,
        name: newProd.name,
        slug: newProd.slug || newProd.name.toLowerCase().replace(/\s+/g, '-'),
        price: newProd.price,
        original_price: newProd.originalPrice,
        discount_percentage: newProd.discountPercentage || 0,
        installments: newProd.installments,
        stock: newProd.stock ?? 99,
        weight: newProd.weight,
        dimensions: newProd.dimensions,
        category_id: newProd.categoryId,
        brand: newProd.brand,
        main_image: newProd.images[0] || '',
        images: newProd.images,
        sizes: newProd.sizes,
        colors: newProd.colors,
        description: newProd.description,
        short_description: newProd.shortDescription,
        details: newProd.details,
        is_new: newProd.isNew ?? true,
        is_featured: newProd.isFeatured ?? false,
        is_promotion: newProd.isPromotion ?? false,
        is_active: newProd.isActive ?? true,
        rating: newProd.rating ?? 5.0,
        review_count: newProd.reviewCount ?? 1
      }).then(({ error }) => {
        if (error) console.warn('Supabase product insert error:', error.message);
      });
    }
  },
  updateProduct: (updated: Product): void => {
    const list = cmsStore.getProducts().map(p => p.id === updated.id ? updated : p);
    cmsStore.saveProducts(list);

    const supabase = getSupabase();
    if (supabase) {
      supabase.from('products').update({
        name: updated.name,
        price: updated.price,
        original_price: updated.originalPrice,
        category_id: updated.categoryId,
        main_image: updated.images[0] || '',
        images: updated.images,
        sizes: updated.sizes,
        colors: updated.colors,
        description: updated.description,
        is_new: updated.isNew,
        is_featured: updated.isFeatured,
        is_promotion: updated.isPromotion,
        is_active: updated.isActive ?? true
      }).eq('id', updated.id).then(({ error }) => {
        if (error) console.warn('Supabase product update error:', error.message);
      });
    }
  },
  deleteProduct: (id: string): void => {
    const list = cmsStore.getProducts().filter(p => p.id !== id);
    cmsStore.saveProducts(list);

    const supabase = getSupabase();
    if (supabase) {
      supabase.from('products').delete().eq('id', id).then(({ error }) => {
        if (error) console.warn('Supabase product delete error:', error.message);
      });
    }
  },
  duplicateProduct: (id: string): Product | null => {
    const list = cmsStore.getProducts();
    const target = list.find(p => p.id === id);
    if (!target) return null;

    const copy: Product = {
      ...target,
      id: 'prod-' + Date.now(),
      sku: target.sku ? `${target.sku}-COPY` : `PX-COPY-${Date.now().toString().slice(-4)}`,
      name: `${target.name} (Cópia)`
    };
    cmsStore.addProduct(copy);
    return copy;
  },

  // --------------------------------------------------------------------------
  // CATEGORIES CRUD
  // --------------------------------------------------------------------------
  getCategories: (): Category[] => {
    const cats = getLocal<Category[]>(KEYS.CATEGORIES, INITIAL_CATEGORIES);
    return [...cats].sort((a, b) => a.order - b.order);
  },
  saveCategories: (categories: Category[]): void => {
    setLocal(KEYS.CATEGORIES, categories);
  },
  addCategory: (category: Category): void => {
    const list = cmsStore.getCategories();
    const newCat = { ...category, isActive: category.isActive ?? true };
    cmsStore.saveCategories([...list, newCat]);

    const supabase = getSupabase();
    if (supabase) {
      supabase.from('categories').insert({
        id: newCat.id,
        name: newCat.name,
        slug: newCat.slug,
        description: newCat.description,
        icon: newCat.icon,
        order_index: newCat.order,
        is_active: newCat.isActive
      }).then(({ error }) => {
        if (error) console.warn('Supabase category insert error:', error.message);
      });
    }
  },
  updateCategory: (updated: Category): void => {
    const list = cmsStore.getCategories().map(c => c.id === updated.id ? updated : c);
    cmsStore.saveCategories(list);

    const supabase = getSupabase();
    if (supabase) {
      supabase.from('categories').update({
        name: updated.name,
        slug: updated.slug,
        description: updated.description,
        order_index: updated.order,
        is_active: updated.isActive ?? true
      }).eq('id', updated.id).then(({ error }) => {
        if (error) console.warn('Supabase category update error:', error.message);
      });
    }
  },
  deleteCategory: (id: string): void => {
    const list = cmsStore.getCategories().filter(c => c.id !== id);
    cmsStore.saveCategories(list);

    const supabase = getSupabase();
    if (supabase) {
      supabase.from('categories').delete().eq('id', id).then(({ error }) => {
        if (error) console.warn('Supabase category delete error:', error.message);
      });
    }
  },

  // --------------------------------------------------------------------------
  // BANNERS CRUD
  // --------------------------------------------------------------------------
  getBanners: (): Banner[] => {
    return getLocal<Banner[]>(KEYS.BANNERS, INITIAL_BANNERS);
  },
  saveBanners: (banners: Banner[]): void => {
    setLocal(KEYS.BANNERS, banners);
  },
  addBanner: (banner: Banner): void => {
    const list = cmsStore.getBanners();
    cmsStore.saveBanners([banner, ...list]);
  },
  updateBanner: (updated: Banner): void => {
    const list = cmsStore.getBanners().map(b => b.id === updated.id ? updated : b);
    cmsStore.saveBanners(list);
  },
  deleteBanner: (id: string): void => {
    const list = cmsStore.getBanners().filter(b => b.id !== id);
    cmsStore.saveBanners(list);
  },

  // --------------------------------------------------------------------------
  // INSPIRE POSTS CRUD
  // --------------------------------------------------------------------------
  getInspirePosts: (): InspirePost[] => {
    return getLocal<InspirePost[]>(KEYS.INSPIRE, INITIAL_INSPIRE_POSTS);
  },
  saveInspirePosts: (posts: InspirePost[]): void => {
    setLocal(KEYS.INSPIRE, posts);
  },
  addInspirePost: (post: InspirePost): void => {
    const list = cmsStore.getInspirePosts();
    cmsStore.saveInspirePosts([post, ...list]);
  },
  updateInspirePost: (updated: InspirePost): void => {
    const list = cmsStore.getInspirePosts().map(p => p.id === updated.id ? updated : p);
    cmsStore.saveInspirePosts(list);
  },
  deleteInspirePost: (id: string): void => {
    const list = cmsStore.getInspirePosts().filter(p => p.id !== id);
    cmsStore.saveInspirePosts(list);
  },

  // --------------------------------------------------------------------------
  // LOOK BUNDLES CRUD
  // --------------------------------------------------------------------------
  getLookBundles: (): LookBundle[] => {
    return getLocal<LookBundle[]>(KEYS.BUNDLES, INITIAL_LOOK_BUNDLES);
  },
  saveLookBundles: (bundles: LookBundle[]): void => {
    setLocal(KEYS.BUNDLES, bundles);
  },
  addLookBundle: (bundle: LookBundle): void => {
    const list = cmsStore.getLookBundles();
    cmsStore.saveLookBundles([bundle, ...list]);
  },
  updateLookBundle: (updated: LookBundle): void => {
    const list = cmsStore.getLookBundles().map(b => b.id === updated.id ? updated : b);
    cmsStore.saveLookBundles(list);
  },
  deleteLookBundle: (id: string): void => {
    const list = cmsStore.getLookBundles().filter(b => b.id !== id);
    cmsStore.saveLookBundles(list);
  },

  // --------------------------------------------------------------------------
  // REVIEWS CRUD
  // --------------------------------------------------------------------------
  getReviews: (): Review[] => {
    return getLocal<Review[]>(KEYS.REVIEWS, INITIAL_REVIEWS);
  },
  saveReviews: (reviews: Review[]): void => {
    setLocal(KEYS.REVIEWS, reviews);
  },
  addReview: (review: Review): void => {
    const list = cmsStore.getReviews();
    cmsStore.saveReviews([review, ...list]);
  },
  updateReview: (updated: Review): void => {
    const list = cmsStore.getReviews().map(r => r.id === updated.id ? updated : r);
    cmsStore.saveReviews(list);
  },
  deleteReview: (id: string): void => {
    const list = cmsStore.getReviews().filter(r => r.id !== id);
    cmsStore.saveReviews(list);
  },

  // --------------------------------------------------------------------------
  // FAQS CRUD
  // --------------------------------------------------------------------------
  getFaqs: (): FAQ[] => {
    const list = getLocal<FAQ[]>(KEYS.FAQS, INITIAL_FAQS);
    return [...list].sort((a, b) => a.order - b.order);
  },
  saveFaqs: (faqs: FAQ[]): void => {
    setLocal(KEYS.FAQS, faqs);
  },
  addFaq: (faq: FAQ): void => {
    const list = cmsStore.getFaqs();
    cmsStore.saveFaqs([...list, faq]);
  },
  updateFaq: (updated: FAQ): void => {
    const list = cmsStore.getFaqs().map(f => f.id === updated.id ? updated : f);
    cmsStore.saveFaqs(list);
  },
  deleteFaq: (id: string): void => {
    const list = cmsStore.getFaqs().filter(f => f.id !== id);
    cmsStore.saveFaqs(list);
  },

  // --------------------------------------------------------------------------
  // HOME SECTIONS (Home Builder)
  // --------------------------------------------------------------------------
  getHomeSections: (): HomeSection[] => {
    const sections = getLocal<HomeSection[]>(KEYS.HOME_SECTIONS, INITIAL_HOME_SECTIONS);
    return [...sections].sort((a, b) => a.order - b.order);
  },
  saveHomeSections: (sections: HomeSection[]): void => {
    setLocal(KEYS.HOME_SECTIONS, sections);
  },

  // --------------------------------------------------------------------------
  // MEDIA LIBRARY
  // --------------------------------------------------------------------------
  getMediaItems: (): MediaItem[] => {
    return getLocal<MediaItem[]>(KEYS.MEDIA, INITIAL_MEDIA);
  },
  saveMediaItems: (items: MediaItem[]): void => {
    setLocal(KEYS.MEDIA, items);
  },
  addMediaItem: (item: MediaItem): void => {
    const list = cmsStore.getMediaItems();
    cmsStore.saveMediaItems([item, ...list]);
  },
  deleteMediaItem: (id: string): void => {
    const list = cmsStore.getMediaItems().filter(m => m.id !== id);
    cmsStore.saveMediaItems(list);
  },

  // --------------------------------------------------------------------------
  // SITE SETTINGS
  // --------------------------------------------------------------------------
  getSettings: (): SiteSettings => {
    return getLocal<SiteSettings>(KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  },
  saveSettings: (settings: SiteSettings): void => {
    setLocal(KEYS.SETTINGS, settings);

    const supabase = getSupabase();
    if (supabase) {
      supabase.from('site_settings').upsert({
        id: 1,
        store_name: settings.storeName,
        whatsapp_number: settings.whatsappNumber,
        top_announcement: settings.topAnnouncement,
        hero_title: settings.heroTitle,
        hero_subheadline: settings.heroSubheadline,
        hero_badge_text: settings.heroBadgeText,
        instagram_url: settings.instagramUrl,
        facebook_url: settings.facebookUrl,
        store_address: settings.storeAddress
      }).then(({ error }) => {
        if (error) console.warn('Supabase settings update error:', error.message);
      });
    }
  },

  // --------------------------------------------------------------------------
  // ORDERS (Future Module 20 Placeholder)
  // --------------------------------------------------------------------------
  getOrders: (): Order[] => {
    return getLocal<Order[]>(KEYS.ORDERS, []);
  },
  addOrder: (order: Order): void => {
    const list = cmsStore.getOrders();
    setLocal(KEYS.ORDERS, [order, ...list]);
  },

  // --------------------------------------------------------------------------
  // CALCULATE CMS STATS FOR DASHBOARD OVERVIEW
  // --------------------------------------------------------------------------
  getStats: (): CMSStats => {
    const products = cmsStore.getProducts();
    const categories = cmsStore.getCategories();
    const banners = cmsStore.getBanners();
    const lookBundles = cmsStore.getLookBundles();
    const reviews = cmsStore.getReviews();
    const inspirePosts = cmsStore.getInspirePosts();
    const faqs = cmsStore.getFaqs();

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalBanners: banners.length,
      totalLookBundles: lookBundles.length,
      totalReviews: reviews.length,
      totalInspirePosts: inspirePosts.length,
      totalFaqs: faqs.length,
      hiddenProductsCount: products.filter(p => p.isActive === false).length,
      promotionProductsCount: products.filter(p => p.isPromotion || (p.originalPrice && p.originalPrice > p.price)).length,
      outOfStockProductsCount: products.filter(p => p.stock === 0).length,
      missingImageCount: products.filter(p => !p.images || p.images.length === 0 || !p.images[0]).length,
    };
  },

  // --------------------------------------------------------------------------
  // ASYNC SYNC FROM SUPABASE DATABASE (IF AVAILABLE)
  // --------------------------------------------------------------------------
  syncFromSupabase: async (): Promise<boolean> => {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      // Fetch Products
      const { data: prods, error: pErr } = await supabase.from('products').select('*');
      if (!pErr && prods && prods.length > 0) {
        const mappedProducts: Product[] = prods.map((p: any) => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          slug: p.slug,
          price: Number(p.price),
          originalPrice: p.original_price ? Number(p.original_price) : undefined,
          discountPercentage: p.discount_percentage,
          installments: p.installments,
          stock: p.stock,
          weight: p.weight,
          dimensions: p.dimensions,
          categoryId: p.category_id || 'cat-body',
          brand: p.brand,
          mainImage: p.main_image,
          images: p.images || [p.main_image],
          videoUrl: p.video_url,
          sizes: p.sizes || ['RN', 'P', 'M', 'G'],
          colors: p.colors || [],
          description: p.description || '',
          shortDescription: p.short_description,
          details: p.details || [],
          isNew: p.is_new,
          isFeatured: p.is_featured,
          isPromotion: p.is_promotion,
          isActive: p.is_active ?? true,
          rating: Number(p.rating || 5.0),
          reviewCount: p.review_count || 1
        }));
        cmsStore.saveProducts(mappedProducts);
      }

      // Fetch Categories
      const { data: cats, error: cErr } = await supabase.from('categories').select('*').order('order_index');
      if (!cErr && cats && cats.length > 0) {
        const mappedCats: Category[] = cats.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          icon: c.icon,
          order: c.order_index,
          isActive: c.is_active ?? true
        }));
        cmsStore.saveCategories(mappedCats);
      }

      // Fetch Banners
      const { data: bans, error: bErr } = await supabase.from('banners').select('*');
      if (!bErr && bans && bans.length > 0) {
        const mappedBanners: Banner[] = bans.map((b: any) => ({
          id: b.id,
          title: b.title,
          subtitle: b.subtitle,
          buttonText: b.button_text,
          buttonLink: b.button_link,
          image: b.image,
          mobileImage: b.mobile_image,
          badgeText: b.badge_text,
          categorySlug: b.category_slug,
          priority: b.priority,
          active: b.active ?? true
        }));
        cmsStore.saveBanners(mappedBanners);
      }

      notifyCMSUpdate();
      return true;
    } catch (e) {
      console.warn('Failed to sync from Supabase:', e);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // RESET DEMO DATA
  // --------------------------------------------------------------------------
  resetAll: (): void => {
    localStorage.removeItem(KEYS.PRODUCTS);
    localStorage.removeItem(KEYS.CATEGORIES);
    localStorage.removeItem(KEYS.BANNERS);
    localStorage.removeItem(KEYS.INSPIRE);
    localStorage.removeItem(KEYS.BUNDLES);
    localStorage.removeItem(KEYS.REVIEWS);
    localStorage.removeItem(KEYS.FAQS);
    localStorage.removeItem(KEYS.HOME_SECTIONS);
    localStorage.removeItem(KEYS.MEDIA);
    localStorage.removeItem(KEYS.SETTINGS);
    localStorage.removeItem(KEYS.ORDERS);
    notifyCMSUpdate();
  }
};
