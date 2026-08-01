import React, { useState } from 'react';
import { Sparkles, MessageCircle, CheckCircle2, ChevronRight, PackageCheck, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LookBundle } from '../types';

interface LooksCompletosProps {
  bundles: LookBundle[];
  whatsappNumber: string;
}

export const LooksCompletosSection: React.FC<LooksCompletosProps> = ({ bundles, whatsappNumber }) => {
  const [selectedBundle, setSelectedBundle] = useState<LookBundle | null>(bundles[0] || null);

  const activeBundle = selectedBundle || bundles[0];

  if (!activeBundle) return null;

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      console.log('Confetti');
    }
  };

  const whatsappMessage = `Olá 😊
Gostaria de comprar o kit de LOOK COMPLETO "${activeBundle.title}" na Pixulinhos!

Peças inclusas no kit:
${activeBundle.items.map(item => `• ${item.name} (${item.type})`).join('\n')}

Valor do Kit Completo: R$ ${activeBundle.price.toFixed(2).replace('.', ',')}
Por favor, gostaria de consultar os tamanhos disponíveis!`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-purple-50/30 to-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100 text-[#7C4DFF] text-xs font-extrabold uppercase tracking-widest shadow-xs">
            <Layers className="w-4 h-4" /> Kits Especiais Coordenados
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold text-[#231F40]">
            Monte o enxoval perfeito
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Combine todas as peças essenciais de uma só vez com visual harmonioso, tecidos nobres e economia garantida.
          </p>
        </div>

        {/* Theme Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {bundles.map((bundle) => {
            const isSelected = activeBundle.id === bundle.id;
            return (
              <button
                key={bundle.id}
                onClick={() => setSelectedBundle(bundle)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#7C4DFF] text-white shadow-lg shadow-purple-200 scale-105'
                    : 'bg-white border border-purple-100 text-[#231F40] hover:bg-purple-50 hover:text-[#7C4DFF]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{bundle.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Look Feature Card */}
        <div className="bg-white rounded-3xl border-2 border-purple-100 p-6 sm:p-8 lg:p-10 shadow-xl shadow-purple-100/50 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Cover Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-purple-50 shadow-md border border-purple-100">
                <img
                  src={activeBundle.coverImage}
                  alt={activeBundle.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#7C4DFF] shadow-sm flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4" />
                  <span>{activeBundle.items.length} Peças Inclusas</span>
                </div>
              </div>
            </div>

            {/* Right: Items Checklist & CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-extrabold text-[#FF3B7A] uppercase tracking-wider">
                  Combo Exclusivo Pixulinhos
                </span>
                <h3 className="text-2xl sm:text-4xl font-brand font-bold text-[#231F40] mt-1">
                  {activeBundle.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {activeBundle.description}
                </p>
              </div>

              {/* Items list */}
              <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
                <p className="text-xs font-extrabold text-[#2E266E] uppercase tracking-wider">
                  O que vem neste Kit Completo:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeBundle.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-purple-100 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00BFA5] flex-shrink-0" />
                      <div className="text-xs font-bold text-[#231F40] truncate">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-purple-600 font-semibold block">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-100">
                <div>
                  <div className="text-xs text-gray-400 font-medium">Valor total das {activeBundle.items.length} peças:</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-brand font-bold text-[#7C4DFF]">
                      R$ {activeBundle.price.toFixed(2).replace('.', ',')}
                    </span>
                    {activeBundle.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        R$ {activeBundle.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#00BFA5] font-extrabold">
                    ✓ Economia garantida de montagem do kit completo!
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-base shadow-xl shadow-green-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>💚 Quero esse Look Completo</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
