import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureTrustBanner } from './components/FeatureTrustBanner';
import { FavoritesBannerSection } from './components/FavoritesBannerSection';
import { BannerCarousel } from './components/BannerCarousel';
import { NetflixCatalog } from './components/NetflixCatalog';
import { InspireSection } from './components/InspireSection';
import { LooksCompletosSection } from './components/LooksCompletosSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { PaymentTrustSection } from './components/PaymentTrustSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { Product, Category, Banner, InspirePost, LookBundle, Review, FAQ, SiteSettings, HomeSection } from './types';
import { cmsStore } from './services/cmsStore';
import { installSupabaseCmsPersistence } from './services/supabaseCmsPersistence';

// Install the persistence bridge without changing the existing CMS UI/state model.
installSupabaseCmsPersistence();

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [inspirePosts, setInspirePosts] = useState<InspirePost[]>([]);
  const [lookBundles, setLookBundles] = useState<LookBundle[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(cmsStore.getSettings());
  const [homeSections, setHomeSections] = useState<HomeSection[]>([]);

  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pixulinhos_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const loadStoreData = () => {
    setProducts(cmsStore.getProducts());
    setCategories(cmsStore.getCategories());
    setBanners(cmsStore.getBanners());
    setInspirePosts(cmsStore.getInspirePosts());
    setLookBundles(cmsStore.getLookBundles());
    setReviews(cmsStore.getReviews());
    setFaqs(cmsStore.getFaqs());
    setSettings(cmsStore.getSettings());
    setHomeSections(cmsStore.getHomeSections());
  };

  useEffect(() => {
    loadStoreData();
    cmsStore.syncFromSupabase();

    const handleUpdate = () => {
      loadStoreData();
    };

    window.addEventListener('pixulinhos_cms_update', handleUpdate);
    return () => window.removeEventListener('pixulinhos_cms_update', handleUpdate);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixulinhos_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Could not save wishlist', e);
    }
  }, [wishlistIds]);

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleSelectCategory = (categorySlug: string | null) => {
    setActiveCategorySlug(categorySlug);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const relatedProducts = selectedProduct
    ? products.filter((p) => p.categoryId === selectedProduct.categoryId && p.id !== selectedProduct.id)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#231F40] font-sans selection:bg-pink-200 selection:text-[#FF3B7A]">
      <Header
        settings={settings}
        categories={categories}
        products={products}
        activeCategory={activeCategorySlug}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={(p) => setSelectedProduct(p)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(!isAdminOpen)}
        isAdminActive={isAdminOpen}
      />

      <main className="flex-1 space-y-12 sm:space-y-16 lg:space-y-20 pb-12">
        <HeroSection
          settings={settings}
          onExploreClick={() => handleSelectCategory(null)}
          onSelectCategory={handleSelectCategory}
        />

        <FeatureTrustBanner />

        <FavoritesBannerSection
          products={products}
          onSelectCategory={handleSelectCategory}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {banners.length > 0 && (
          <BannerCarousel
            banners={banners}
            onBannerClick={(slug) => slug && handleSelectCategory(slug)}
          />
        )}

        <NetflixCatalog
          categories={categories}
          products={products}
          activeCategory={activeCategorySlug}
          onSelectCategory={(slug) => setActiveCategorySlug(slug)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          whatsappNumber={settings.whatsappNumber}
        />

        {lookBundles.length > 0 && (
          <LooksCompletosSection
            bundles={lookBundles}
            whatsappNumber={settings.whatsappNumber}
          />
        )}

        {inspirePosts.length > 0 && (
          <InspireSection
            posts={inspirePosts}
            whatsappNumber={settings.whatsappNumber}
          />
        )}

        {reviews.length > 0 && (
          <ReviewsSection reviews={reviews} />
        )}

        <FAQSection
          faqs={faqs}
          whatsappNumber={settings.whatsappNumber}
        />

        <PaymentTrustSection />

        <FinalCTASection settings={settings} />
      </main>

      <Footer
        settings={settings}
        onSelectCategory={handleSelectCategory}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          relatedProducts={relatedProducts}
          onSelectRelated={(p) => setSelectedProduct(p)}
          whatsappNumber={settings.whatsappNumber}
        />
      )}

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveItem={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onClearAll={() => setWishlistIds([])}
        whatsappNumber={settings.whatsappNumber}
      />

      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          products={products}
          categories={categories}
          banners={banners}
          inspirePosts={inspirePosts}
          lookBundles={lookBundles}
          reviews={reviews}
          settings={settings}
        />
      )}

      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
