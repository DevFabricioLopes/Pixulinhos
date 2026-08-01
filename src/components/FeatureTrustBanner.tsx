import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export const FeatureTrustBanner: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white text-[#231F40] p-8 sm:p-12 shadow-xl shadow-pink-100/60 border-2 border-pink-100">
          
          {/* Decorative subtle background overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-50/60 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/50 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            
            {/* Badge & Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-[#FF3B7A] border border-pink-200 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xs">
                <Sparkles className="w-4 h-4 fill-[#FF3B7A]" />
                <span>Padrão de Excelência Pixulinhos</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-brand font-bold tracking-tight text-[#231F40]">
                Feito para <span className="text-[#FF3B7A]">momentos inesquecíveis</span>
              </h2>
              <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                Cada roupinha é desenvolvida pensando no bem-estar, na delicadeza da pele e nas memórias doces dos primeiros anos do seu bebê.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-2 text-left">
              
              {/* Item 1: 100% Algodão */}
              <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-300 space-y-2 group">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 text-[#FF3B7A] flex items-center justify-center font-extrabold text-2xl shadow-xs group-hover:scale-105 transition-transform">
                  ☁️
                </div>
                <h3 className="text-lg font-brand font-bold text-[#231F40] pt-2 group-hover:text-[#FF3B7A] transition-colors">
                  100% Algodão
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Confeccionado em 100% algodão de altíssima qualidade. Toque extremamente suave, macio e respirável.
                </p>
              </div>

              {/* Item 2: Antialérgico */}
              <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-300 space-y-2 group">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 text-[#FF3B7A] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-[#FF3B7A]" />
                </div>
                <h3 className="text-lg font-brand font-bold text-[#231F40] pt-2 group-hover:text-[#FF3B7A] transition-colors">
                  Antialérgico
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Botões livres de níquel, costuras macias externas e corantes naturais seguros para pele sensível.
                </p>
              </div>

              {/* Item 3: Conforto Premium */}
              <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-300 space-y-2 group">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 text-[#FF3B7A] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Award className="w-7 h-7 text-[#FF3B7A]" />
                </div>
                <h3 className="text-lg font-brand font-bold text-[#231F40] pt-2 group-hover:text-[#FF3B7A] transition-colors">
                  Conforto Premium
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Modelagem anatômica que garante liberdade de movimentos e praticidade máxima para as trocas diárias.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
