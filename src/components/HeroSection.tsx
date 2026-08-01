import React from 'react';
import { MessageCircle, Sparkles, ShieldCheck, Truck, HeartHandshake, Star } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroSectionProps {
  settings: SiteSettings;
  onExploreClick: () => void;
  onSelectCategory?: (categorySlug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onExploreClick, onSelectCategory }) => {
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    'Olá 😊\nEstou navegando no site da Pixulinhos e gostaria de comprar a Coleção Doce Infância 2026 para meu bebê!'
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF7ED]/50 to-[#FAF6F0] py-10 sm:py-14 lg:py-20">
      {/* Background Decorative Blob Shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-[#FF3B7A] text-xs sm:text-sm font-extrabold shadow-xs animate-pulse-subtle">
              <Sparkles className="w-4 h-4 fill-[#FF3B7A]" />
              <span>{settings.heroBadgeText || '✨ Coleção Doce Infância 2026'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-brand font-bold text-[#231F40] leading-tight sm:leading-none tracking-tight">
              Coleção <span className="text-[#FF3B7A] underline decoration-amber-300 decoration-wavy decoration-2">Doce Infância 2026</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Conforto, carinho e qualidade para os primeiros momentos do seu bebê
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              {/* Primary Button */}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-[#FF3B7A] hover:bg-[#e02e6b] text-white text-base sm:text-lg font-extrabold shadow-lg shadow-pink-200 hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>Comprar Coleção</span>
              </button>

              {/* Secondary Category Button */}
              <button
                onClick={() => onSelectCategory ? onSelectCategory('saida-maternidade') : onExploreClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4.5 rounded-full bg-white border-2 border-pink-200 hover:border-[#FF3B7A] text-[#231F40] hover:text-[#FF3B7A] text-base font-bold shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Ver Saídas Maternidade</span>
              </button>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-4 border-t border-pink-100/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-2xl border border-pink-100 shadow-sm">
                <div className="p-2 rounded-xl bg-pink-100 text-[#FF3B7A]">
                  <Star className="w-4 h-4 fill-[#FF3B7A]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#231F40]">5.0 ★★★★★</div>
                  <div className="text-[11px] text-gray-500">+10.000 mamães felizes</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-2xl border border-pink-100 shadow-sm">
                <div className="p-2 rounded-xl bg-teal-100 text-[#00BFA5]">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#231F40]">Frete para todo Brasil</div>
                  <div className="text-[11px] text-gray-500">Envio rápido e seguro</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-white/80 p-2.5 rounded-2xl border border-pink-100 shadow-sm">
                <div className="p-2 rounded-xl bg-purple-100 text-[#7C4DFF]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#231F40]">Atendimento Humanizado</div>
                  <div className="text-[11px] text-gray-500">Por especialistas em enxoval</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Feature with Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* White Frame Card wrapper */}
            <div className="relative w-full max-w-md bg-white p-3 sm:p-4 rounded-3xl shadow-xl border-4 border-white shadow-pink-200/40 transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
              
              {/* Main Baby Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-pink-50 flex items-center justify-center">
                {settings.heroImage !== '' ? (
                  <img
                    src={settings.heroImage || "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80"}
                    alt="Bebê sorrindo com roupinha fofa da Pixulinhos - Coleção Doce Infância 2026"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center text-pink-400 p-6 text-center border-2 border-dashed border-pink-200">
                    <Sparkles className="w-10 h-10 mb-2" />
                    <p className="font-brand font-bold text-sm text-[#231F40]">Imagem Removida</p>
                    <p className="text-xs text-gray-400 mt-1">Adicione uma imagem no Painel Admin em Configurações</p>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                <div className="absolute bottom-3 left-3 right-3 text-white bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/50 text-[#231F40]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#FF3B7A] uppercase tracking-wider">Lançamento Exclusivo</p>
                      <p className="text-sm font-extrabold">Look Nuvenzinha 100% Algodão</p>
                    </div>
                    <span className="px-2.5 py-1 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-full shadow-xs">
                      RN ao 3
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill 1 */}
              <div className="absolute -top-4 -left-4 bg-white px-4 py-2 rounded-full shadow-lg border border-pink-100 flex items-center gap-2 animate-float">
                <span className="text-lg">☁️</span>
                <span className="text-xs font-extrabold text-[#231F40]">100% Algodão</span>
              </div>

              {/* Floating Pill 2 */}
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-pink-100 flex items-center gap-2 animate-float-delayed">
                <ShieldCheck className="w-4 h-4 text-[#00BFA5]" />
                <span className="text-xs font-extrabold text-[#231F40]">Antialérgico & Seguro</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
