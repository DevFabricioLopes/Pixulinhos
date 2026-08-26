import React from 'react';
import { Heart, MessageCircle, Instagram, MapPin, ArrowUp, Github } from 'lucide-react';
import { PixulinhosLogo } from './PixulinhosLogo';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin?: () => void;
  onSelectCategory: (categorySlug: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#5B21B6] text-gray-900 pt-10 pb-8 border-t-4 border-[#FF3B7A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* White Inner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-purple-100/80">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
            
            {/* Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="inline-block">
                <PixulinhosLogo size="md" showSubtitle={true} showHanger={true} />
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
                Vestimos os momentos mais doces do seu bebê com roupas em 100% Algodão, bordados delicados e o carinho que sua família merece.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-pink-50 hover:bg-[#FF3B7A] text-[#FF3B7A] hover:text-white transition-colors border border-pink-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-900">Coleções Especiais</h4>
              <ul className="space-y-2 text-xs text-gray-800 font-medium">
                <li>
                  <button onClick={() => onSelectCategory('saida-maternidade')} className="hover:text-[#FF3B7A] transition-colors">
                    ✨ Saída Maternidade
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('body')} className="hover:text-[#FF3B7A] transition-colors">
                    ☁️ Bodys 100% Algodão
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('macacoes')} className="hover:text-[#FF3B7A] transition-colors">
                    🐰 Macacões & Plush
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('vestidos')} className="hover:text-[#FF3B7A] transition-colors">
                    🌸 Vestidos Rodadinhos
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('promocoes')} className="hover:text-[#FF3B7A] transition-colors">
                    🏷️ Promoções Especiais
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Hours */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-900">Atendimento Humanizado</h4>
              <div className="space-y-2 text-xs text-gray-800">
                <p className="flex items-center justify-center md:justify-start gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#FF3B7A] shrink-0" />
                  <span>{settings.storeAddress}</span>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2 font-semibold">
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp: (48) 99114-7392</span>
                </p>
                <p className="text-[11px] text-gray-600">
                  Segunda a Sexta: 08:00 às 17:00
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de tirar uma dúvida com a equipe Pixulinhos.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Falar com Atendente</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar inside White Card */}
          <div className="pt-6 mt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p className="flex items-center gap-1 font-medium">
                <span>© 2026 PIXULINHOS. Feito com</span>
                <Heart className="w-3.5 h-3.5 fill-[#FF3B7A] text-[#FF3B7A]" />
                <span>para o seu bebê.</span>
              </p>

              <span className="hidden sm:inline text-gray-300">•</span>

              <a
                href="https://github.com/DevFabricioLopes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-purple-900 hover:text-[#FF3B7A] transition-colors font-semibold bg-purple-50 px-3 py-1 rounded-full border border-purple-200"
              >
                <span>Desenvolvido por Fabricio Lopes</span>
                <Github className="w-4 h-4 text-purple-700" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF3B7A] hover:bg-[#e02e6b] text-white text-[11px] font-extrabold shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Voltar ao Topo</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
