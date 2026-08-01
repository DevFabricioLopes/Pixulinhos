import React, { useState } from 'react';
import { Layout, ArrowUp, ArrowDown, Eye, EyeOff, Sparkles, Check } from 'lucide-react';
import { HomeSection } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';

interface HomeBuilderTabProps {
  sections: HomeSection[];
  onShowToast: (msg: string) => void;
}

export const HomeBuilderTab: React.FC<HomeBuilderTabProps> = ({ sections, onShowToast }) => {
  const [localSections, setLocalSections] = useState<HomeSection[]>(sections);

  const handleToggleActive = (idx: number) => {
    const updated = [...localSections];
    updated[idx].isActive = !updated[idx].isActive;
    setLocalSections(updated);
  };

  const handleReorder = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= localSections.length) return;

    const updated = [...localSections];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    // reindex
    const reindexed = updated.map((s, i) => ({ ...s, order: i + 1 }));
    setLocalSections(reindexed);
  };

  const handleTitleChange = (idx: number, newTitle: string) => {
    const updated = [...localSections];
    updated[idx].title = newTitle;
    setLocalSections(updated);
  };

  const handleSave = () => {
    cmsStore.saveHomeSections(localSections);
    onShowToast('Estrutura da Home salva com sucesso! Veja a Landing Page atualizada.');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF3B7A]" />
            <h2 className="text-xl font-brand font-bold text-[#231F40]">Home Builder (Montador de Seções Estilo Shopify)</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">Reordene, ative, desative e personalize os títulos de cada bloco da Landing Page</p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[#FF3B7A] text-white font-extrabold text-xs rounded-2xl hover:bg-pink-600 shadow-lg flex items-center gap-2 transition-all"
        >
          <Check className="w-4 h-4" />
          <span>Salvar Layout da Home</span>
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {localSections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              sec.isActive
                ? 'bg-[#FFFDF9] border-pink-100 shadow-xs'
                : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="w-8 h-8 rounded-2xl bg-pink-100 text-[#FF3B7A] text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <div className="flex-1">
                <input
                  type="text"
                  value={sec.title || sec.sectionKey}
                  onChange={e => handleTitleChange(idx, e.target.value)}
                  className="font-bold text-sm text-[#231F40] bg-transparent border-b border-transparent hover:border-pink-300 focus:border-[#FF3B7A] focus:outline-none px-1"
                />
                <p className="text-[11px] text-gray-400 font-mono">Chave: {sec.sectionKey}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleToggleActive(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  sec.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {sec.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{sec.isActive ? 'Visível' : 'Oculto'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleReorder(idx, 'up')}
                disabled={idx === 0}
                className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-xl text-gray-700"
                title="Subir Bloco"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleReorder(idx, 'down')}
                disabled={idx === localSections.length - 1}
                className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-xl text-gray-700"
                title="Descer Bloco"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
