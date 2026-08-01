import React from 'react';
import { MessageCircle, Heart, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';

interface FinalCTASectionProps {
  settings: SiteSettings;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ settings }) => {
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    'Olá 😊\nEstava navegando pelo site da Pixulinhos e gostaria de ajuda para escolher os melhores looks para meu bebê!'
  )}`;

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-gradient-to-r from-[#FF3B7A] via-[#7C4DFF] to-[#00BFA5] text-white">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-extrabold border border-white/30">
          <Heart className="w-4 h-4 fill-amber-200" />
          <span>Atendimento Personalizado de Mãe para Mãe</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-brand font-bold leading-tight drop-shadow-md">
          Encontrou o look perfeito?
        </h2>

        <p className="text-base sm:text-xl text-pink-50 font-medium max-w-2xl mx-auto leading-relaxed">
          Nossa equipe terá prazer em ajudar você a escolher o melhor look para o seu bebê.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-black/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 animate-pulse-subtle"
          >
            <MessageCircle className="w-7 h-7 fill-white" />
            <span>💚 Eu Quero Esse Look</span>
          </a>
        </div>

        <p className="text-xs text-white/90 font-medium whitespace-pre-line">
          Respondemos rapidinho no WhatsApp!
          Atendimento: Segunda a Sexta das 08h às 17h.
        </p>

      </div>
    </section>
  );
};
