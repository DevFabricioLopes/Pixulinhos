import { getSupabase } from '../lib/supabase';
import { cmsStore } from './cmsStore';
import type { Category, Product, Banner, InspirePost, LookBundle, Review, FAQ, HomeSection, SiteSettings, MediaItem } from '../types';

let installed = false;
const report = (op: string, error: unknown) => console.error(`[Pixulinhos CMS] ${op}:`, error instanceof Error ? error.message : error);

export function installSupabaseCmsPersistence(): void {
  if (installed) return;
  installed = true;
  const supabase = getSupabase();
  if (!supabase) return;

  const original = {
    saveProducts: cmsStore.saveProducts, addProduct: cmsStore.addProduct, updateProduct: cmsStore.updateProduct, deleteProduct: cmsStore.deleteProduct,
    saveCategories: cmsStore.saveCategories, addCategory: cmsStore.addCategory, updateCategory: cmsStore.updateCategory, deleteCategory: cmsStore.deleteCategory,
    saveBanners: cmsStore.saveBanners, addBanner: cmsStore.addBanner, updateBanner: cmsStore.updateBanner, deleteBanner: cmsStore.deleteBanner,
    saveInspirePosts: cmsStore.saveInspirePosts, addInspirePost: cmsStore.addInspirePost, updateInspirePost: cmsStore.updateInspirePost, deleteInspirePost: cmsStore.deleteInspirePost,
    saveLookBundles: cmsStore.saveLookBundles, addLookBundle: cmsStore.addLookBundle, updateLookBundle: cmsStore.updateLookBundle, deleteLookBundle: cmsStore.deleteLookBundle,
    saveReviews: cmsStore.saveReviews, addReview: cmsStore.addReview, updateReview: cmsStore.updateReview, deleteReview: cmsStore.deleteReview,
    saveFaqs: cmsStore.saveFaqs, addFaq: cmsStore.addFaq, updateFaq: cmsStore.updateFaq, deleteFaq: cmsStore.deleteFaq,
    saveHomeSections: cmsStore.saveHomeSections,
    saveMediaItems: cmsStore.saveMediaItems, addMediaItem: cmsStore.addMediaItem, deleteMediaItem: cmsStore.deleteMediaItem,
    saveSettings: cmsStore.saveSettings,
  };

  const productRow = (p: Product) => ({
    id:p.id, sku:p.sku, name:p.name,
    slug:p.slug || p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,'-'),
    price:p.price, original_price:p.originalPrice ?? null, discount_percentage:p.discountPercentage ?? 0,
    installments:p.installments ?? null, stock:p.stock ?? 0, weight:p.weight ?? null, dimensions:p.dimensions ?? null,
    category_id:p.categoryId ?? null, brand:p.brand ?? 'Pixulinhos', main_image:p.images?.[0] || p.mainImage || '',
    images:p.images ?? [], sizes:p.sizes ?? [], colors:p.colors ?? [], description:p.description ?? '',
    short_description:p.shortDescription ?? null, details:p.details ?? [], is_new:p.isNew ?? false,
    is_featured:p.isFeatured ?? false, is_promotion:p.isPromotion ?? false, is_bestseller:p.isBestSeller ?? false,
    is_exclusive:p.isExclusive ?? false, is_launch:p.isLaunch ?? false, is_active:p.isActive ?? true,
    order_index:p.orderIndex ?? 0, rating:p.rating ?? 5, review_count:p.reviewCount ?? 0,
    related_product_ids:p.relatedProductIds ?? [], meta_title:p.metaTitle ?? null, meta_description:p.metaDescription ?? null, meta_keywords:p.metaKeywords ?? null,
  });
  const categoryRow = (c: Category) => ({ id:c.id, name:c.name, slug:c.slug, description:c.description ?? null, image:c.image ?? null, icon:c.icon ?? null, order_index:c.order ?? 0, is_active:c.isActive ?? true, is_featured:c.isFeatured ?? false, meta_title:c.metaTitle ?? null, meta_description:c.metaDescription ?? null, meta_keywords:c.metaKeywords ?? null });
  const bannerRow = (b: Banner) => ({ id:b.id, title:b.title, subtitle:b.subtitle ?? null, button_text:b.buttonText ?? null, button_link:b.buttonLink ?? null, image:b.image, mobile_image:b.mobileImage ?? null, badge_text:b.badgeText ?? null, category_slug:b.categorySlug ?? null, priority:b.priority ?? 0, start_date:b.startDate ?? null, end_date:b.endDate ?? null, is_featured:b.isFeatured ?? false, active:b.active ?? true });
  const inspireRow = (p: InspirePost) => ({ id:p.id, baby_name:p.babyName, age:p.age, city:p.city ?? null, image:p.image, product_name:p.productName ?? null, product_id:p.productId ?? null, caption:p.caption ?? null, likes:p.likes ?? 0, date:p.date ?? null, is_active:p.isActive ?? true });
  const bundleRow = (b: LookBundle) => ({ id:b.id, title:b.title, theme:b.theme ?? null, cover_image:b.coverImage, price:b.price, original_price:b.originalPrice ?? null, savings_text:b.savingsText ?? null, description:b.description ?? null, items:b.items ?? [], related_product_ids:b.relatedProductIds ?? [], order_index:b.order ?? 0, is_active:b.isActive ?? true });
  const reviewRow = (r: Review) => ({ id:r.id, author_name:r.authorName, baby_info:r.babyInfo ?? null, rating:r.rating ?? 5, comment:r.comment, photo:r.photo ?? null, product_name:r.productName ?? null, verified_purchase:r.verifiedPurchase ?? true, date:r.date ?? null, is_active:r.isActive ?? true });
  const faqRow = (f: FAQ) => ({ id:f.id, question:f.question, answer:f.answer, category:f.category ?? 'Geral', order_index:f.order ?? 0, is_active:f.isActive ?? true });
  const sectionRow = (s: HomeSection) => ({ id:s.id, section_key:s.sectionKey, title:s.title ?? null, subtitle:s.subtitle ?? null, order_index:s.order ?? 0, is_active:s.isActive ?? true, config:s.config ?? {} });
  const mediaRow = (m: MediaItem) => ({ id:m.id, name:m.name || m.fileName || 'Mídia', url:m.url, type:m.type ?? 'image', size:m.size ?? 0, folder:m.folder ?? 'Geral' });

  cmsStore.saveProducts = items => { original.saveProducts(items); void supabase.from('products').upsert(items.map(productRow),{onConflict:'id'}).then(({error})=>error&&report('salvar produtos',error)); };
  cmsStore.addProduct = item => { original.addProduct(item); void supabase.from('products').upsert(productRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar produto',error)); };
  cmsStore.updateProduct = item => { original.updateProduct(item); void supabase.from('products').upsert(productRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar produto',error)); };
  cmsStore.deleteProduct = id => { original.deleteProduct(id); void supabase.from('products').delete().eq('id',id).then(({error})=>error&&report('excluir produto',error)); };

  cmsStore.saveCategories = items => { original.saveCategories(items); void supabase.from('categories').upsert(items.map(categoryRow),{onConflict:'id'}).then(({error})=>error&&report('salvar categorias',error)); };
  cmsStore.addCategory = item => { original.addCategory(item); void supabase.from('categories').upsert(categoryRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar categoria',error)); };
  cmsStore.updateCategory = item => { original.updateCategory(item); void supabase.from('categories').upsert(categoryRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar categoria',error)); };
  cmsStore.deleteCategory = id => { original.deleteCategory(id); void supabase.from('categories').delete().eq('id',id).then(({error})=>error&&report('excluir categoria',error)); };

  cmsStore.saveBanners = items => { original.saveBanners(items); void supabase.from('banners').upsert(items.map(bannerRow),{onConflict:'id'}).then(({error})=>error&&report('salvar banners',error)); };
  cmsStore.addBanner = item => { original.addBanner(item); void supabase.from('banners').upsert(bannerRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar banner',error)); };
  cmsStore.updateBanner = item => { original.updateBanner(item); void supabase.from('banners').upsert(bannerRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar banner',error)); };
  cmsStore.deleteBanner = id => { original.deleteBanner(id); void supabase.from('banners').delete().eq('id',id).then(({error})=>error&&report('excluir banner',error)); };

  cmsStore.saveInspirePosts = items => { original.saveInspirePosts(items); void supabase.from('inspire_posts').upsert(items.map(inspireRow),{onConflict:'id'}).then(({error})=>error&&report('salvar Inspire',error)); };
  cmsStore.addInspirePost = item => { original.addInspirePost(item); void supabase.from('inspire_posts').upsert(inspireRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar Inspire',error)); };
  cmsStore.updateInspirePost = item => { original.updateInspirePost(item); void supabase.from('inspire_posts').upsert(inspireRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar Inspire',error)); };
  cmsStore.deleteInspirePost = id => { original.deleteInspirePost(id); void supabase.from('inspire_posts').delete().eq('id',id).then(({error})=>error&&report('excluir Inspire',error)); };

  cmsStore.saveLookBundles = items => { original.saveLookBundles(items); void supabase.from('look_bundles').upsert(items.map(bundleRow),{onConflict:'id'}).then(({error})=>error&&report('salvar Looks',error)); };
  cmsStore.addLookBundle = item => { original.addLookBundle(item); void supabase.from('look_bundles').upsert(bundleRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar Look',error)); };
  cmsStore.updateLookBundle = item => { original.updateLookBundle(item); void supabase.from('look_bundles').upsert(bundleRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar Look',error)); };
  cmsStore.deleteLookBundle = id => { original.deleteLookBundle(id); void supabase.from('look_bundles').delete().eq('id',id).then(({error})=>error&&report('excluir Look',error)); };

  cmsStore.saveReviews = items => { original.saveReviews(items); void supabase.from('reviews').upsert(items.map(reviewRow),{onConflict:'id'}).then(({error})=>error&&report('salvar avaliações',error)); };
  cmsStore.addReview = item => { original.addReview(item); void supabase.from('reviews').upsert(reviewRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar avaliação',error)); };
  cmsStore.updateReview = item => { original.updateReview(item); void supabase.from('reviews').upsert(reviewRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar avaliação',error)); };
  cmsStore.deleteReview = id => { original.deleteReview(id); void supabase.from('reviews').delete().eq('id',id).then(({error})=>error&&report('excluir avaliação',error)); };

  cmsStore.saveFaqs = items => { original.saveFaqs(items); void supabase.from('faqs').upsert(items.map(faqRow),{onConflict:'id'}).then(({error})=>error&&report('salvar FAQ',error)); };
  cmsStore.addFaq = item => { original.addFaq(item); void supabase.from('faqs').upsert(faqRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar FAQ',error)); };
  cmsStore.updateFaq = item => { original.updateFaq(item); void supabase.from('faqs').upsert(faqRow(item),{onConflict:'id'}).then(({error})=>error&&report('atualizar FAQ',error)); };
  cmsStore.deleteFaq = id => { original.deleteFaq(id); void supabase.from('faqs').delete().eq('id',id).then(({error})=>error&&report('excluir FAQ',error)); };

  cmsStore.saveHomeSections = items => { original.saveHomeSections(items); void supabase.from('home_sections').upsert(items.map(sectionRow),{onConflict:'id'}).then(({error})=>error&&report('salvar Home Builder',error)); };

  cmsStore.saveMediaItems = items => { original.saveMediaItems(items); void supabase.from('media_library').upsert(items.map(mediaRow),{onConflict:'id'}).then(({error})=>error&&report('salvar mídias',error)); };
  cmsStore.addMediaItem = item => { original.addMediaItem(item); void supabase.from('media_library').upsert(mediaRow(item),{onConflict:'id'}).then(({error})=>error&&report('adicionar mídia',error)); };
  cmsStore.deleteMediaItem = id => { original.deleteMediaItem(id); void supabase.from('media_library').delete().eq('id',id).then(({error})=>error&&report('excluir mídia',error)); };

  cmsStore.saveSettings = settings => {
    original.saveSettings(settings);
    void supabase.from('site_settings').upsert({
      id:1, store_name:settings.storeName, logo_url:settings.logoUrl ?? null, favicon_url:settings.faviconUrl ?? null,
      whatsapp_number:settings.whatsappNumber, phone_number:settings.phoneNumber ?? null, email:settings.email ?? null,
      store_address:settings.storeAddress, map_embed_url:settings.mapEmbedUrl ?? null, top_announcement:settings.topAnnouncement,
      hero_title:settings.heroTitle, hero_subheadline:settings.heroSubheadline, hero_badge_text:settings.heroBadgeText,
      footer_text:settings.footerText ?? null, instagram_url:settings.instagramUrl, tiktok_url:settings.tiktokUrl ?? null,
      facebook_url:settings.facebookUrl, pinterest_url:settings.pinterestUrl ?? null, exchange_policy:settings.exchangePolicy ?? null,
      privacy_policy:settings.privacyPolicy ?? null, terms_policy:settings.termsPolicy ?? null, cookies_policy:settings.cookiesPolicy ?? null,
      global_meta_title:settings.globalMetaTitle ?? null, global_meta_description:settings.globalMetaDescription ?? null,
      global_meta_keywords:settings.globalMetaKeywords ?? null, google_analytics_id:settings.googleAnalyticsId ?? null,
      meta_pixel_id:settings.metaPixelId ?? null, gtm_id:settings.gtmId ?? null, custom_header_scripts:settings.customHeaderScripts ?? null,
    },{onConflict:'id'}).then(({error})=>error&&report('salvar configurações',error));
  };
}
