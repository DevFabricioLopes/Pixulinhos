import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Category, Product } from '../types';
import { ProductCard } from './ProductCard';

interface NetflixCatalogProps {
  categories: Category[];
  products: Product[];
  activeCategory: string | null;
  onSelectCategory: (categorySlug: string) => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  whatsappNumber: string;
}

export const NetflixCatalog: React.FC<NetflixCatalogProps> = ({
  categories,
  products,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  whatsappNumber
}) => {
  // If user filtered by a specific category, show that category row or filtered grid
  const displayCategories = activeCategory
    ? categories.filter(c => c.slug === activeCategory)
    : categories;

  return (
    <section id="catalog-section" className="py-10 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-[#B45309] text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Catálogo Inteligente
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold text-[#231F40]">
          Nossas Coleções de Carinho
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Deslize pelas categorias e descubra os looks mais doces e confortáveis para o seu bebê.
        </p>
      </div>

      {/* Render Netflix Rows */}
      {displayCategories.map((category) => {
        // Filter products belonging to this category slug or matching special conditions
        const categoryProducts = products.filter(p => {
          if (category.slug === 'promocoes') return p.isPromotion;
          if (category.slug === 'lancamentos') return p.isNew;
          return p.categoryId === category.id || p.categoryId === `cat-${category.slug}`;
        });

        if (categoryProducts.length === 0) return null;

        return (
          <NetflixRow
            key={category.id}
            category={category}
            products={categoryProducts}
            onSeeAll={() => onSelectCategory(category.slug)}
            onSelectProduct={onSelectProduct}
            onToggleWishlist={onToggleWishlist}
            wishlistIds={wishlistIds}
            whatsappNumber={whatsappNumber}
          />
        );
      })}
    </section>
  );
};

interface NetflixRowProps {
  category: Category;
  products: Product[];
  onSeeAll: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  whatsappNumber: string;
}

const NetflixRow: React.FC<NetflixRowProps> = ({
  category,
  products,
  onSeeAll,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
  whatsappNumber
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 group/row relative">
      {/* Category Row Header */}
      <div className="flex items-center justify-between border-b border-pink-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF3B7A] inline-block animate-pulse"></span>
          <h3 className="text-xl sm:text-2xl font-brand font-bold text-[#231F40] uppercase tracking-wide">
            {category.name}
          </h3>
          <span className="text-xs font-bold text-[#FF3B7A] bg-pink-50 px-2.5 py-0.5 rounded-full">
            {products.length} {products.length === 1 ? 'look' : 'looks'}
          </span>
        </div>

        <button
          onClick={onSeeAll}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-[#FF3B7A] hover:text-[#7C4DFF] transition-colors group/link"
        >
          <span>Ver tudo</span>
          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-30 p-3 rounded-full bg-white text-[#231F40] hover:text-[#FF3B7A] shadow-xl border border-pink-100 opacity-0 group-hover/row:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-30 p-3 rounded-full bg-white text-[#231F40] hover:text-[#FF3B7A] shadow-xl border border-pink-100 opacity-0 group-hover/row:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal Scrollable Items */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
