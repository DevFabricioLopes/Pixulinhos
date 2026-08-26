import {
  Category, Product, Banner, InspirePost, LookBundle, Review, FAQ,
  HomeSection, SiteSettings, MediaItem, Order, CMSStats
} from '../types';
import {
  INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_BANNERS, INITIAL_INSPIRE_POSTS,
  INITIAL_LOOK_BUNDLES, INITIAL_REVIEWS, INITIAL_FAQS, INITIAL_HOME_SECTIONS,
  INITIAL_MEDIA, INITIAL_SITE_SETTINGS
} from '../data/initialData';
import { getSupabase } from '../lib/supabase';

const KEYS = {
  PRODUCTS: 'pixulinhos_products', CATEGORIES: 'pixulinhos_categories', BANNERS: 'pixulinhos_banners',
  INSPIRE: 'pixulinhos_inspire', BUNDLES: 'pixulinhos_bundles', REVIEWS: 'pixulinhos_reviews',
  FAQS: 'pixulinhos_faqs', HOME_SECTIONS: 'pixulinhos_home_sections', MEDIA: 'pixulinhos_media',
  SETTINGS: 'pixulinhos_settings', ORDERS: 'pixulinhos_orders'
};

export const notifyCMSUpdate = () => window.dispatchEvent(new Event('pixulinhos_cms_update'));

function getLocal<T>(key: string, fallback: T): T {
  try {
    let raw = localStorage.getItem(key);
    if (!raw) return fallback;
    if (/Eg[ií]pcio|eg[ií]pcio/i.test(raw)) {
      raw = raw.replaceAll('Algodão Egípcio', '100% Algodão').replaceAll('algodão egípcio', '100% algodão')
        .replaceAll('Algodão Egipcio', '100% Algodão').replaceAll('algodão egipcio', '100% algodão')
        .replaceAll('Egípcio', '100% Algodão').replaceAll('egípcio', '100% algodão');
      localStorage.setItem(key, raw);
    }
    return JSON.parse(raw);
  } catch { return fallback; }
}
function setLocal<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); notifyCMSUpdate(); } catch (e) { console.error(e); }
}
function fire<T>(operation: PromiseLike<{ error: any }>, key: string, value: T, message: string) {
  operation.then(({ error }) => {
    if (error) { console.error(message, error.message); return; }
    setLocal(key, value);
  }).catch(e => console.error(message, e));
}
function sb() { return getSupabase(); }

const mapProduct = (p: any): Product => ({
  id:p.id, sku:p.sku, name:p.name, slug:p.slug, price:Number(p.price), originalPrice:p.original_price == null ? undefined : Number(p.original_price),
  discountPercentage:p.discount_percentage, installments:p.installments, stock:p.stock, weight:p.weight, dimensions:p.dimensions,
  categoryId:p.category_id || 'cat-body', brand:p.brand, mainImage:p.main_image, images:p.images || [p.main_image], videoUrl:p.video_url,
  sizes:p.sizes || ['RN','P','M','G'], colors:p.colors || [], description:p.description || '', shortDescription:p.short_description,
  details:p.details || [], isNew:p.is_new, isFeatured:p.is_featured, isPromotion:p.is_promotion, isActive:p.is_active ?? true,
  rating:Number(p.rating || 5), reviewCount:p.review_count || 1
});
const productRow = (p: Product) => ({
  id:p.id, sku:p.sku, name:p.name, slug:p.slug || p.name.toLowerCase().replace(/\s+/g,'-'), price:p.price,
  original_price:p.originalPrice, discount_percentage:p.discountPercentage || 0, installments:p.installments, stock:p.stock ?? 99,
  weight:p.weight, dimensions:p.dimensions, category_id:p.categoryId, brand:p.brand, main_image:p.images?.[0] || p.mainImage || '',
  images:p.images || [], sizes:p.sizes || [], colors:p.colors || [], description:p.description || '', short_description:p.shortDescription,
  details:p.details || [], is_new:p.isNew ?? true, is_featured:p.isFeatured ?? false, is_promotion:p.isPromotion ?? false,
  is_active:p.isActive ?? true, rating:p.rating ?? 5, review_count:p.reviewCount ?? 1
});

export const cmsStore = {
  getProducts: (): Product[] => getLocal(KEYS.PRODUCTS, INITIAL_PRODUCTS),
  saveProducts: (v: Product[]) => setLocal(KEYS.PRODUCTS, v),
  addProduct: (p: Product): void => {
    const n={...p,createdAt:new Date().toISOString()}; const s=sb();
    if (!s) return setLocal(KEYS.PRODUCTS,[n,...cmsStore.getProducts()]);
    fire(s.from('products').upsert(productRow(n)),KEYS.PRODUCTS,[n,...cmsStore.getProducts()],'Supabase product insert error');
  },
  updateProduct: (p: Product): void => {
    const s=sb(), next=cmsStore.getProducts().map(x=>x.id===p.id?p:x);
    if (!s) return setLocal(KEYS.PRODUCTS,next);
    fire(s.from('products').update(productRow(p)).eq('id',p.id),KEYS.PRODUCTS,next,'Supabase product update error');
  },
  deleteProduct: (id: string): void => {
    const next=cmsStore.getProducts().filter(x=>x.id!==id), s=sb();
    if (!s) return setLocal(KEYS.PRODUCTS,next);
    fire(s.from('products').delete().eq('id',id),KEYS.PRODUCTS,next,'Supabase product delete error');
  },
  duplicateProduct: (id: string): Product|null => { const p=cmsStore.getProducts().find(x=>x.id===id); if(!p)return null; const c={...p,id:'prod-'+Date.now(),sku:p.sku?`${p.sku}-COPY`:`PX-COPY-${Date.now().toString().slice(-4)}`,name:`${p.name} (Cópia)`}; cmsStore.addProduct(c); return c; },

  getCategories: (): Category[] => [...getLocal(KEYS.CATEGORIES,INITIAL_CATEGORIES)].sort((a,b)=>a.order-b.order),
  saveCategories: (v: Category[]) => setLocal(KEYS.CATEGORIES,v),
  addCategory: (c: Category): void => { const n={...c,isActive:c.isActive??true},next=[...cmsStore.getCategories(),n],s=sb(); if(!s)return setLocal(KEYS.CATEGORIES,next); fire(s.from('categories').upsert({id:n.id,name:n.name,slug:n.slug,description:n.description,icon:n.icon,order_index:n.order,is_active:n.isActive}),KEYS.CATEGORIES,next,'Supabase category insert error'); },
  updateCategory: (c: Category): void => { const next=cmsStore.getCategories().map(x=>x.id===c.id?c:x),s=sb(); if(!s)return setLocal(KEYS.CATEGORIES,next); fire(s.from('categories').update({name:c.name,slug:c.slug,description:c.description,icon:c.icon,order_index:c.order,is_active:c.isActive??true}).eq('id',c.id),KEYS.CATEGORIES,next,'Supabase category update error'); },
  deleteCategory: (id: string): void => { const next=cmsStore.getCategories().filter(x=>x.id!==id),s=sb(); if(!s)return setLocal(KEYS.CATEGORIES,next); fire(s.from('categories').delete().eq('id',id),KEYS.CATEGORIES,next,'Supabase category delete error'); },

  getBanners: (): Banner[] => getLocal(KEYS.BANNERS,INITIAL_BANNERS),
  saveBanners: (v: Banner[]) => { const s=sb(); if(!s)return setLocal(KEYS.BANNERS,v); fire(s.from('banners').upsert(v.map((b:any)=>({id:b.id,title:b.title,subtitle:b.subtitle,button_text:b.buttonText,button_link:b.buttonLink,image:b.image,mobile_image:b.mobileImage,badge_text:b.badgeText,category_slug:b.categorySlug,priority:b.priority??1,active:b.active??true})),{onConflict:'id'}),KEYS.BANNERS,v,'Supabase banners save error'); },
  addBanner: (b: Banner): void => cmsStore.saveBanners([b,...cmsStore.getBanners()]),
  updateBanner: (b: Banner): void => cmsStore.saveBanners(cmsStore.getBanners().map(x=>x.id===b.id?b:x)),
  deleteBanner: (id: string): void => { const next=cmsStore.getBanners().filter(x=>x.id!==id),s=sb(); if(!s)return setLocal(KEYS.BANNERS,next); fire(s.from('banners').delete().eq('id',id),KEYS.BANNERS,next,'Supabase banner delete error'); },

  getInspirePosts: (): InspirePost[] => getLocal(KEYS.INSPIRE,INITIAL_INSPIRE_POSTS),
  saveInspirePosts: (v: InspirePost[]) => { const s=sb(); if(!s)return setLocal(KEYS.INSPIRE,v); fire(s.from('inspire_posts').upsert(v.map((p:any)=>({id:p.id,baby_name:p.babyName,age:p.age,city:p.city,image:p.image,product_name:p.productName,product_id:p.productId,caption:p.caption,likes:p.likes??0,date:p.date,is_active:p.isActive??true})),{onConflict:'id'}),KEYS.INSPIRE,v,'Supabase inspire save error'); },
  addInspirePost: (p: InspirePost) => cmsStore.saveInspirePosts([p,...cmsStore.getInspirePosts()]),
  updateInspirePost: (p: InspirePost) => cmsStore.saveInspirePosts(cmsStore.getInspirePosts().map(x=>x.id===p.id?p:x)),
  deleteInspirePost: (id:string) => { const next=cmsStore.getInspirePosts().filter(x=>x.id!==id),s=sb(); if(!s)return setLocal(KEYS.INSPIRE,next); fire(s.from('inspire_posts').delete().eq('id',id),KEYS.INSPIRE,next,'Supabase inspire delete error'); },

  getLookBundles: (): LookBundle[] => getLocal(KEYS.BUNDLES,INITIAL_LOOK_BUNDLES),
  saveLookBundles: (v: LookBundle[]) => { const s=sb(); if(!s)return setLocal(KEYS.BUNDLES,v); fire(s.from('look_bundles').upsert(v.map((b:any)=>({id:b.id,title:b.title,theme:b.theme,cover_image:b.coverImage,price:b.price,original_price:b.originalPrice,savings_text:b.savingsText,description:b.description,items:b.items||[],related_product_ids:b.relatedProductIds||[],order_index:b.order??0,is_active:b.isActive??true})),{onConflict:'id'}),KEYS.BUNDLES,v,'Supabase bundles save error'); },
  addLookBundle:(b:LookBundle)=>cmsStore.saveLookBundles([b,...cmsStore.getLookBundles()]),
  updateLookBundle:(b:LookBundle)=>cmsStore.saveLookBundles(cmsStore.getLookBundles().map(x=>x.id===b.id?b:x)),
  deleteLookBundle:(id:string)=>{const next=cmsStore.getLookBundles().filter(x=>x.id!==id),s=sb();if(!s)return setLocal(KEYS.BUNDLES,next);fire(s.from('look_bundles').delete().eq('id',id),KEYS.BUNDLES,next,'Supabase bundle delete error');},

  getReviews: (): Review[] => getLocal(KEYS.REVIEWS,INITIAL_REVIEWS),
  saveReviews: (v: Review[]) => { const s=sb(); if(!s)return setLocal(KEYS.REVIEWS,v); fire(s.from('reviews').upsert(v.map((r:any)=>({id:r.id,author_name:r.authorName,baby_info:r.babyInfo,rating:r.rating,comment:r.comment,photo:r.photo,product_name:r.productName,verified_purchase:r.verifiedPurchase??true,date:r.date,is_active:r.isActive??true})),{onConflict:'id'}),KEYS.REVIEWS,v,'Supabase reviews save error'); },
  addReview:(r:Review)=>cmsStore.saveReviews([r,...cmsStore.getReviews()]),
  updateReview:(r:Review)=>cmsStore.saveReviews(cmsStore.getReviews().map(x=>x.id===r.id?r:x)),
  deleteReview:(id:string)=>{const next=cmsStore.getReviews().filter(x=>x.id!==id),s=sb();if(!s)return setLocal(KEYS.REVIEWS,next);fire(s.from('reviews').delete().eq('id',id),KEYS.REVIEWS,next,'Supabase review delete error');},

  getFaqs: (): FAQ[] => [...getLocal(KEYS.FAQS,INITIAL_FAQS)].sort((a,b)=>a.order-b.order),
  saveFaqs: (v: FAQ[]) => { const s=sb(); if(!s)return setLocal(KEYS.FAQS,v); fire(s.from('faqs').upsert(v.map((f:any)=>({id:f.id,question:f.question,answer:f.answer,category:f.category,order_index:f.order??0,is_active:f.isActive??true})),{onConflict:'id'}),KEYS.FAQS,v,'Supabase FAQ save error'); },
  addFaq:(f:FAQ)=>cmsStore.saveFaqs([...cmsStore.getFaqs(),f]),
  updateFaq:(f:FAQ)=>cmsStore.saveFaqs(cmsStore.getFaqs().map(x=>x.id===f.id?f:x)),
  deleteFaq:(id:string)=>{const next=cmsStore.getFaqs().filter(x=>x.id!==id),s=sb();if(!s)return setLocal(KEYS.FAQS,next);fire(s.from('faqs').delete().eq('id',id),KEYS.FAQS,next,'Supabase FAQ delete error');},

  getHomeSections: (): HomeSection[] => [...getLocal(KEYS.HOME_SECTIONS,INITIAL_HOME_SECTIONS)].sort((a,b)=>a.order-b.order),
  saveHomeSections: (v: HomeSection[]) => { const s=sb(); if(!s)return setLocal(KEYS.HOME_SECTIONS,v); fire(s.from('home_sections').upsert(v.map((x:any)=>({id:x.id,section_key:x.sectionKey,title:x.title,subtitle:x.subtitle,order_index:x.order,is_active:x.isActive??true,config:x.config||{}})),{onConflict:'id'}),KEYS.HOME_SECTIONS,v,'Supabase home sections save error'); },

  getMediaItems: (): MediaItem[] => getLocal(KEYS.MEDIA,INITIAL_MEDIA),
  saveMediaItems: (v: MediaItem[]) => { const s=sb(); if(!s)return setLocal(KEYS.MEDIA,v); fire(s.from('media_library').upsert(v.map((m:any)=>({id:m.id,name:m.name,url:m.url,type:m.type||'image',size:m.size||0,folder:m.folder||'Geral'})),{onConflict:'id'}),KEYS.MEDIA,v,'Supabase media save error'); },
  addMediaItem:(m:MediaItem)=>cmsStore.saveMediaItems([m,...cmsStore.getMediaItems()]),
  deleteMediaItem:(id:string)=>{const next=cmsStore.getMediaItems().filter(x=>x.id!==id),s=sb();if(!s)return setLocal(KEYS.MEDIA,next);fire(s.from('media_library').delete().eq('id',id),KEYS.MEDIA,next,'Supabase media delete error');},

  getSettings: (): SiteSettings => getLocal(KEYS.SETTINGS,INITIAL_SITE_SETTINGS),
  saveSettings: (v: SiteSettings): void => { const s=sb(); if(!s)return setLocal(KEYS.SETTINGS,v); fire(s.from('site_settings').upsert({id:1,store_name:v.storeName,whatsapp_number:v.whatsappNumber,top_announcement:v.topAnnouncement,hero_title:v.heroTitle,hero_subheadline:v.heroSubheadline,hero_badge_text:v.heroBadgeText,instagram_url:v.instagramUrl,facebook_url:v.facebookUrl,store_address:v.storeAddress},{onConflict:'id'}),KEYS.SETTINGS,v,'Supabase settings save error'); },

  getOrders: (): Order[] => getLocal(KEYS.ORDERS,[]),
  addOrder: (o: Order): void => { const s=sb(),next=[o,...cmsStore.getOrders()]; if(!s)return setLocal(KEYS.ORDERS,next); fire(s.from('orders').insert({id:o.id,customer_name:(o as any).customerName,customer_email:(o as any).customerEmail,customer_phone:(o as any).customerPhone,items:(o as any).items||[],total_amount:(o as any).totalAmount,status:(o as any).status||'Pendente'}),KEYS.ORDERS,next,'Supabase order save error'); },

  getStats: (): CMSStats => { const p=cmsStore.getProducts(),c=cmsStore.getCategories(),b=cmsStore.getBanners(),l=cmsStore.getLookBundles(),r=cmsStore.getReviews(),i=cmsStore.getInspirePosts(),f=cmsStore.getFaqs(); return {totalProducts:p.length,totalCategories:c.length,totalBanners:b.length,totalLookBundles:l.length,totalReviews:r.length,totalInspirePosts:i.length,totalFaqs:f.length,hiddenProductsCount:p.filter(x=>x.isActive===false).length,promotionProductsCount:p.filter(x=>x.isPromotion||(x.originalPrice&&x.originalPrice>x.price)).length,outOfStockProductsCount:p.filter(x=>x.stock===0).length,missingImageCount:p.filter(x=>!x.images?.length||!x.images[0]).length}; },

  syncFromSupabase: async (): Promise<boolean> => {
    const s=sb(); if(!s)return false;
    try {
      const [p,c,b,i,l,r,f,h,m,set] = await Promise.all([
        s.from('products').select('*'),s.from('categories').select('*').order('order_index'),s.from('banners').select('*'),
        s.from('inspire_posts').select('*'),s.from('look_bundles').select('*').order('order_index'),s.from('reviews').select('*'),
        s.from('faqs').select('*').order('order_index'),s.from('home_sections').select('*').order('order_index'),s.from('media_library').select('*'),s.from('site_settings').select('*').eq('id',1).maybeSingle()
      ]);
      if(!p.error&&p.data)setLocal(KEYS.PRODUCTS,p.data.map(mapProduct));
      if(!c.error&&c.data)setLocal(KEYS.CATEGORIES,c.data.map((x:any)=>({id:x.id,name:x.name,slug:x.slug,description:x.description,image:x.image,icon:x.icon,order:x.order_index,isActive:x.is_active})));
      if(!b.error&&b.data)setLocal(KEYS.BANNERS,b.data.map((x:any)=>({id:x.id,title:x.title,subtitle:x.subtitle,buttonText:x.button_text,buttonLink:x.button_link,image:x.image,mobileImage:x.mobile_image,badgeText:x.badge_text,categorySlug:x.category_slug,priority:x.priority,active:x.active})));
      if(!i.error&&i.data)setLocal(KEYS.INSPIRE,i.data.map((x:any)=>({id:x.id,babyName:x.baby_name,age:x.age,city:x.city,image:x.image,productName:x.product_name,productId:x.product_id,caption:x.caption,likes:x.likes,date:x.date,isActive:x.is_active})));
      if(!l.error&&l.data)setLocal(KEYS.BUNDLES,l.data.map((x:any)=>({id:x.id,title:x.title,theme:x.theme,coverImage:x.cover_image,price:Number(x.price),originalPrice:x.original_price==null?undefined:Number(x.original_price),savingsText:x.savings_text,description:x.description,items:x.items||[],relatedProductIds:x.related_product_ids||[],order:x.order_index,isActive:x.is_active})));
      if(!r.error&&r.data)setLocal(KEYS.REVIEWS,r.data.map((x:any)=>({id:x.id,authorName:x.author_name,babyInfo:x.baby_info,rating:x.rating,comment:x.comment,photo:x.photo,productName:x.product_name,verifiedPurchase:x.verified_purchase,date:x.date,isActive:x.is_active})));
      if(!f.error&&f.data)setLocal(KEYS.FAQS,f.data.map((x:any)=>({id:x.id,question:x.question,answer:x.answer,category:x.category,order:x.order_index,isActive:x.is_active})));
      if(!h.error&&h.data)setLocal(KEYS.HOME_SECTIONS,h.data.map((x:any)=>({id:x.id,sectionKey:x.section_key,title:x.title,subtitle:x.subtitle,order:x.order_index,isActive:x.is_active,config:x.config||{}})));
      if(!m.error&&m.data)setLocal(KEYS.MEDIA,m.data);
      if(!set.error&&set.data){const x:any=set.data;setLocal(KEYS.SETTINGS,{...INITIAL_SITE_SETTINGS,storeName:x.store_name,whatsappNumber:x.whatsapp_number,topAnnouncement:x.top_announcement,heroTitle:x.hero_title,heroSubheadline:x.hero_subheadline,heroBadgeText:x.hero_badge_text,instagramUrl:x.instagram_url,facebookUrl:x.facebook_url,storeAddress:x.store_address});}
      notifyCMSUpdate(); return true;
    } catch(e){console.error('Failed to sync from Supabase:',e);return false;}
  },

  resetAll: (): void => { Object.values(KEYS).forEach(k=>localStorage.removeItem(k)); notifyCMSUpdate(); }
};

// Hydrate the browser cache from Supabase when the app starts. Supabase remains the source of truth.
if (typeof window !== 'undefined') void cmsStore.syncFromSupabase();
