import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Banner } from '../types';

interface BannerCarouselProps {
  banners: Banner[];
  onBannerClick: (categorySlug?: string) => void;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, onBannerClick }) => {
  const activeBanners = banners.filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const current = activeBanners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-teal-500 text-white shadow-xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover object-center filter brightness-50 transition-all duration-700 ease-in-out scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-2xl space-y-4">
          {current.badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 border border-white/30 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.badgeText}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-brand font-bold leading-tight drop-shadow-md">
            {current.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-100 font-normal leading-relaxed line-clamp-3">
            {current.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={() => onBannerClick(current.categorySlug)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#231F40] hover:bg-pink-50 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <span>{current.buttonText}</span>
            </button>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/30 hover:bg-white/60 text-white backdrop-blur-md transition-all"
              aria-label="Banner Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/30 hover:bg-white/60 text-white backdrop-blur-md transition-all"
              aria-label="Próximo Banner"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir para banner ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
