import { getSupabase } from '../lib/supabase';
import { notifyCMSUpdate } from './cmsStore';

const set = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { console.error('[Pixulinhos CMS] local cache:', error); }
};

export async function hydrateCmsFromSupabase(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    const [categories, products, banners, inspire, bundles, reviews, faqs, homeSections, settings, media] = await Promise.all([
      supabase.from('categories').select('*').order('order_index'),
      supabase.from('products').select('*').order('order_index'),
      supabase.from('banners').select('*').order('priority'),
      supabase.from('inspire_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('look_bundles').select('*').order('order_index'),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('faqs').select('*').order('order_index'),
      supabase.from('home_sections').select('*').order('order_index'),
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('media_library').select('*').order('created_at', { ascending: false }),
    ]);

    if (!categories.error && categories.data) set('pixulinhos_categories', categories.data.map(c => ({ id:c.id,name:c.name,slug:c.slug,order:c.order_index,description:c.description,image:c.image,icon:c.icon,isActive:c.is_active,isFeatured:c.is_featured,metaTitle:c.meta_title,metaDescription:c.meta_description,metaKeywords:c.meta_keywords })));
    if (!products.error && products.data) set('pixulinhos_products', products.data.map(p => ({ id:p.id,sku:p.sku,name:p.name,slug:p.slug,price:Number(p.price),originalPrice:p.original_price == null ? undefined : Number(p.original_price),discountPercentage:p.discount_percentage,installments:p.installments,stock:p.stock,weight:p.weight,dimensions:p.dimensions,categoryId:p.category_id,subcategoryId:p.subcategory_id,brand:p.brand,mainImage:p.main_image,images:p.images || [p.main_image],videoUrl:p.video_url,sizes:p.sizes || [],colors:p.colors || [],description:p.description,shortDescription:p.short_description,details:p.details || [],isNew:p.is_new,isFeatured:p.is_featured,isPromotion:p.is_promotion,isBestSeller:p.is_bestseller,isExclusive:p.is_exclusive,isLaunch:p.is_launch,isActive:p.is_active,orderIndex:p.order_index,rating:Number(p.rating || 5),reviewCount:p.review_count,relatedProductIds:p.related_product_ids || [],metaTitle:p.meta_title,metaDescription:p.meta_description,metaKeywords:p.meta_keywords,createdAt:p.created_at })));
    if (!banners.error && banners.data) set('pixulinhos_banners', banners.data.map(b => ({ id:b.id,title:b.title,subtitle:b.subtitle || '',buttonText:b.button_text || 'Ver Coleção',buttonLink:b.button_link,mobileImage:b.mobile_image,image:b.image,badgeText:b.badge_text,categorySlug:b.category_slug,priority:b.priority,startDate:b.start_date,endDate:b.end_date,isFeatured:b.is_featured,active:b.active })));
    if (!inspire.error && inspire.data) set('pixulinhos_inspire', inspire.data.map(p => ({ id:p.id,babyName:p.baby_name,age:p.age,city:p.city,image:p.image,productName:p.product_name || '',productId:p.product_id,caption:p.caption,likes:p.likes || 0,date:p.date,isActive:p.is_active })));
    if (!bundles.error && bundles.data) set('pixulinhos_bundles', bundles.data.map(b => ({ id:b.id,title:b.title,theme:b.theme || '',coverImage:b.cover_image,price:Number(b.price),originalPrice:b.original_price == null ? undefined : Number(b.original_price),savingsText:b.savings_text,description:b.description || '',items:b.items || [],relatedProductIds:b.related_product_ids || [],order:b.order_index,isActive:b.is_active })));
    if (!reviews.error && reviews.data) set('pixulinhos_reviews', reviews.data.map(r => ({ id:r.id,authorName:r.author_name,babyInfo:r.baby_info || '',rating:r.rating,comment:r.comment,photo:r.photo || '',productName:r.product_name,date:r.date || '',verifiedPurchase:r.verified_purchase,isActive:r.is_active })));
    if (!faqs.error && faqs.data) set('pixulinhos_faqs', faqs.data.map(f => ({ id:f.id,question:f.question,answer:f.answer,category:f.category || 'Geral',order:f.order_index,isActive:f.is_active })));
    if (!homeSections.error && homeSections.data) set('pixulinhos_home_sections', homeSections.data.map(s => ({ id:s.id,sectionKey:s.section_key,title:s.title,subtitle:s.subtitle,order:s.order_index,isActive:s.is_active,config:s.config || {} })));
    if (!settings.error && settings.data) { const s = settings.data; set('pixulinhos_settings', { storeName:s.store_name,logoUrl:s.logo_url,faviconUrl:s.favicon_url,whatsappNumber:s.whatsapp_number,phoneNumber:s.phone_number,email:s.email,storeAddress:s.store_address,mapEmbedUrl:s.map_embed_url,topAnnouncement:s.top_announcement,heroTitle:s.hero_title,heroSubheadline:s.hero_subheadline,heroBadgeText:s.hero_badge_text,footerText:s.footer_text,instagramUrl:s.instagram_url,tiktokUrl:s.tiktok_url,facebookUrl:s.facebook_url,pinterestUrl:s.pinterest_url,exchangePolicy:s.exchange_policy,privacyPolicy:s.privacy_policy,termsPolicy:s.terms_policy,cookiesPolicy:s.cookies_policy,globalMetaTitle:s.global_meta_title,globalMetaDescription:s.global_meta_description,globalMetaKeywords:s.global_meta_keywords,googleAnalyticsId:s.google_analytics_id,metaPixelId:s.meta_pixel_id,gtmId:s.gtm_id,customHeaderScripts:s.custom_header_scripts }); }
    if (!media.error && media.data) set('pixulinhos_media', media.data.map(m => ({ id:m.id,name:m.name,url:m.url,type:m.type,size:m.size,folder:m.folder,createdAt:m.created_at })));

    notifyCMSUpdate();
  } catch (error) {
    console.error('[Pixulinhos CMS] Falha ao carregar conteúdo do Supabase:', error);
  }
}
