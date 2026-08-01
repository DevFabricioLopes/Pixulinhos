import React from 'react';
import { Star, CheckCircle, Heart, Quote } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-[#FF3B7A] text-xs font-extrabold uppercase tracking-widest shadow-xs">
            <Heart className="w-4 h-4 fill-[#FF3B7A]" /> Amor de Mãe em Depoimentos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold text-[#231F40]">
            Muitas mamães felizes
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Mais de 10.000 mamães, papais e vovós que confiaram na Pixulinhos para vestir seus maiores tesouros.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative p-6 rounded-3xl bg-[#FFFDF9] border-2 border-pink-100/80 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-pink-200/60 pointer-events-none" />

              <div className="space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-pink-100 flex items-center gap-3">
                <img
                  src={rev.photo}
                  alt={rev.authorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FF3B7A]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-[#231F40] truncate">{rev.authorName}</h4>
                    {rev.verifiedPurchase && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#00BFA5] flex-shrink-0" title="Compra Verificada" />
                    )}
                  </div>
                  <p className="text-xs text-[#FF3B7A] font-medium">{rev.babyInfo}</p>
                  {rev.productName && (
                    <p className="text-[10px] text-gray-400 truncate">Comprou: {rev.productName}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
