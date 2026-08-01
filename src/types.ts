export interface ColorOption {
  name: string;
  hex: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  sku?: string;
  name: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  installments?: string;
  stock?: number;
  weight?: number;
  dimensions?: Dimensions;
  categoryId: string;
  subcategoryId?: string;
  brand?: string;
  mainImage?: string;
  images: string[];
  videoUrl?: string;
  sizes: string[];
  colors: ColorOption[];
  description: string;
  shortDescription?: string;
  details: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isPromotion?: boolean;
  isBestSeller?: boolean;
  isExclusive?: boolean;
  isLaunch?: boolean;
  isActive?: boolean;
  orderIndex?: number;
  rating?: number;
  reviewCount?: number;
  relatedProductIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  description?: string;
  image?: string;
  icon?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  image: string;
  mobileImage?: string;
  badgeText?: string;
  categorySlug?: string;
  priority?: number;
  startDate?: string;
  endDate?: string;
  isFeatured?: boolean;
  active: boolean;
}

export interface InspirePost {
  id: string;
  babyName: string;
  age: string;
  city?: string;
  image: string;
  productName: string;
  productId?: string;
  caption?: string;
  likes: number;
  date?: string;
  isActive?: boolean;
}

export interface BundleItem {
  name: string;
  type: string; // e.g. "Body", "Calça", "Faixa", "Touca", "Manta"
  image?: string;
}

export interface LookBundle {
  id: string;
  title: string;
  theme: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  savingsText?: string;
  description: string;
  items: BundleItem[];
  relatedProductIds?: string[];
  isActive?: boolean;
  order?: number;
}

export interface Review {
  id: string;
  authorName: string;
  babyInfo: string;
  rating: number;
  comment: string;
  photo: string;
  productName?: string;
  verifiedPurchase: boolean;
  date: string;
  isActive?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export interface HomeSection {
  id: string;
  sectionKey:
    | 'hero'
    | 'banners'
    | 'netflix_catalog'
    | 'inspire'
    | 'bundles'
    | 'reviews'
    | 'faq'
    | 'payment_trust'
    | 'final_cta'
    | 'custom_html';
  title?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  config?: Record<string, any>;
}

export interface SiteSettings {
  storeName: string;
  logoUrl?: string;
  faviconUrl?: string;
  whatsappNumber: string;
  phoneNumber?: string;
  email?: string;
  storeAddress: string;
  mapEmbedUrl?: string;
  topAnnouncement: string;
  heroTitle: string;
  heroSubheadline: string;
  heroBadgeText: string;
  heroImage?: string;
  footerText?: string;
  instagramUrl: string;
  tiktokUrl?: string;
  facebookUrl: string;
  pinterestUrl?: string;
  exchangePolicy?: string;
  privacyPolicy?: string;
  termsPolicy?: string;
  cookiesPolicy?: string;
  globalMetaTitle?: string;
  globalMetaDescription?: string;
  globalMetaKeywords?: string;
  googleAnalyticsId?: string;
  metaPixelId?: string;
  gtmId?: string;
  customHeaderScripts?: string;
}

export interface MediaItem {
  id: string;
  name?: string;
  fileName?: string;
  url: string;
  type?: 'image' | 'video' | 'icon' | 'pdf';
  size?: number;
  fileSize?: string;
  dimensions?: string;
  folder?: string;
  category?: string;
  createdAt?: string;
  uploadedAt?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'Pendente' | 'Pago' | 'Enviado' | 'Entregue' | 'Cancelado';
  createdAt: string;
}

export interface WishlistItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
}

export interface CMSStats {
  totalProducts: number;
  totalCategories: number;
  totalBanners: number;
  totalLookBundles: number;
  totalReviews: number;
  totalInspirePosts: number;
  totalFaqs: number;
  hiddenProductsCount: number;
  promotionProductsCount: number;
  outOfStockProductsCount: number;
  missingImageCount: number;
}
