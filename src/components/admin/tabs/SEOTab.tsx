import React, { useState } from 'react';
import { Search, Globe, Share2, Save, Eye } from 'lucide-react';
import { SiteSettings } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';

interface SEOTabProps {
  settings: SiteSettings;
  onShowToast: (msg: string) => void;
}

export const SEOTab: React.FC<SEOTabProps> = ({ settings, onShowToast }) => {
  const [metaTitle, setMetaTitle] = useState(settings.seoMetaTitle || 'Pixulinhos | Roupas Infantis em Algodão Egípcio');
  const [metaDesc, setMetaDesc] = useState(settings.seoMetaDescription || 'Descubra a coleção de Saída Maternidade, Bodies e Macacões Pixulinhos. O máximo conforto e carinho para o seu bebê.');
  const [keywords, setKeywords] = useState('roupa infantil, saída maternidade, algodão egípcio, body bebê, enxoval bebê');
  const [ogImage, setOgImage] = useState(settings.seoOgImage || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80');

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...settings,
      seoMetaTitle: metaTitle,
      seoMetaDescription: metaDesc,
      seoOgImage: ogImage
    };
    cmsStore.saveSettings(updated);
    onShowToast('Configurações de SEO salvas!');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      <div>
        <h2 className="text-xl font-brand font-bold text-[#231F40]">Gerenciador de SEO & Compartilhamento Social</h2>
        <p className="text-xs text-gray-500">Otimize a presença no Google, WhatsApp e redes sociais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form */}
        <form onSubmit={handleSaveSEO} className="space-y-4 text-xs font-bold text-[#231F40]">
          <div>
            <label className="block mb-1">Meta Title (Título no Google) *</label>
            <input
              type="text"
              required
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
              className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
            />
            <p className="text-[10px] text-gray-400 mt-1">{metaTitle.length}/60 caracteres recomendados</p>
          </div>

          <div>
            <label className="block mb-1">Meta Description (Resumo no Google) *</label>
            <textarea
              required
              value={metaDesc}
              onChange={e => setMetaDesc(e.target.value)}
              className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-24"
            />
            <p className="text-[10px] text-gray-400 mt-1">{metaDesc.length}/160 caracteres recomendados</p>
          </div>

          <div>
            <label className="block mb-1">Palavras-chave (Keywords Sep. por Vírgula)</label>
            <input
              type="text"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
            />
          </div>

          <div>
            <label className="block mb-1">Imagem OpenGraph (Preview WhatsApp/Redes)</label>
            <input
              type="url"
              required
              value={ogImage}
              onChange={e => setOgImage(e.target.value)}
              className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#FF3B7A] text-white font-extrabold text-xs rounded-2xl hover:bg-pink-600 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Parâmetros de SEO</span>
          </button>
        </form>

        {/* Live Previews */}
        <div className="space-y-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Simulação do Card em Tempo Real</h4>

          {/* Google Search Result Preview */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>https://pixulinhos.com.br</span>
            </div>
            <h3 className="text-base text-blue-800 font-medium hover:underline cursor-pointer">{metaTitle}</h3>
            <p className="text-xs text-gray-600 line-clamp-2">{metaDesc}</p>
          </div>

          {/* WhatsApp / Social Card Preview */}
          <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-emerald-200 space-y-2">
            <p className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
              <Share2 className="w-3 h-3" /> Preview WhatsApp & Redes Sociais
            </p>
            <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-gray-200">
              <img src={ogImage} alt="Preview" className="w-full h-36 object-cover" />
              <div className="p-3 space-y-1">
                <h5 className="font-bold text-xs text-gray-900 line-clamp-1">{metaTitle}</h5>
                <p className="text-[11px] text-gray-500 line-clamp-2">{metaDesc}</p>
                <p className="text-[9px] text-gray-400 font-mono">PIXULINHOS.COM.BR</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
