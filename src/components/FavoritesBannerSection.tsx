import React from 'react';
import { Flame, Rocket, Tag, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FavoritesBannerSectionProps {
  products: Product[];
  onSelectCategory: (categorySlug: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const FavoritesBannerSection: React.FC<FavoritesBannerSectionProps> = ({
  products,
  onSelectCategory,
  onSelectProduct,
}) => {
  const bestSellers = products.filter((p) => p.isBestSeller || p.isFeatured).slice(0, 3);
  const newLaunches = products.filter((p) => p.isNew || p.isLaunch).slice(0, 3);
  const promotions = products.filter((p) => p.isPromotion).slice(0, 3);

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-pink-50/30 to-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-[#FF3B7A] text-xs font-extrabold uppercase tracking-widest shadow-xs">
            <Heart className="w-4 h-4 fill-[#FF3B7A]" /> Destaques Especiais
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold text-[#231F40]">
            Os favoritos das mamães
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Descubra os looks mais desejados e recomendados por milhares de famílias apaixonadas pela Pixulinhos.
          </p>
        </div>

        {/* 3 Highlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Mais Vendidos */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-extrabold text-xs">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>Mais Vendidos</span>
                </div>
                <span className="text-xs text-amber-600 font-bold">Top Escolhas</span>
              </div>

              <h3 className="text-xl font-brand font-bold text-[#231F40]">
                Os Queridinhos do Mês
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                As peças que nunca saem do carrinho de quem busca o melhor enxoval.
              </p>

              {/* Mini Preview items */}
              <div className="space-y-2 pt-2">
                {bestSellers.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center gap-3 p-2 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 border border-amber-100 cursor-pointer transition-colors"
                  >
                    <img
                      src={prod.mainImage || prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#231F40] truncate">{prod.name}</p>
                      <p className="text-xs font-extrabold text-[#FF3B7A]">
                        R$ {prod.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectCategory('body')}
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Todos os Mais Vendidos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Lançamentos */}
          <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-50 text-[#7C4DFF] font-extrabold text-xs">
                  <Rocket className="w-4 h-4 text-[#7C4DFF]" />
                  <span>Lançamentos</span>
                </div>
                <span className="text-xs text-purple-600 font-bold">Coleção 2026</span>
              </div>

              <h3 className="text-xl font-brand font-bold text-[#231F40]">
                Novidades Quentinhas
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Estampas exclusivas e modelagens fofas acabadas de sair do atelier.
              </p>

              {/* Mini Preview items */}
              <div className="space-y-2 pt-2">
                {newLaunches.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center gap-3 p-2 rounded-2xl bg-purple-50/40 hover:bg-purple-100/60 border border-purple-100 cursor-pointer transition-colors"
                  >
                    <img
                      src={prod.mainImage || prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover border border-purple-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#231F40] truncate">{prod.name}</p>
                      <p className="text-xs font-extrabold text-[#7C4DFF]">
                        R$ {prod.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectCategory('lancamentos')}
              className="w-full py-3 rounded-2xl bg-[#7C4DFF] hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explorar Lançamentos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Promoções */}
          <div className="bg-white rounded-3xl p-6 border-2 border-pink-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-pink-50 text-[#FF3B7A] font-extrabold text-xs">
                  <Tag className="w-4 h-4 text-[#FF3B7A]" />
                  <span>Promoções</span>
                </div>
                <span className="text-xs text-pink-600 font-bold">Até 30% OFF</span>
              </div>

              <h3 className="text-xl font-brand font-bold text-[#231F40]">
                Oportunidades Imperdíveis
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Garanta roupinhas premium com descontos especiais por tempo limitado.
              </p>

              {/* Mini Preview items */}
              <div className="space-y-2 pt-2">
                {promotions.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center gap-3 p-2 rounded-2xl bg-pink-50/40 hover:bg-pink-100/60 border border-pink-100 cursor-pointer transition-colors"
                  >
                    <img
                      src={prod.mainImage || prod.images[0]}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover border border-pink-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#231F40] truncate">{prod.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#FF3B7A]">
                          R$ {prod.price.toFixed(2).replace('.', ',')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            R$ {prod.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectCategory('promocoes')}
              className="w-full py-3 rounded-2xl bg-[#FF3B7A] hover:bg-[#e02e6b] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Promoções Especiais</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
