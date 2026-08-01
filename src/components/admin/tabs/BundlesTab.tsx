import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Sparkles, Upload } from 'lucide-react';
import { LookBundle, BundleItem } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { uploadToStorage } from '../../../lib/supabase';

interface BundlesTabProps {
  lookBundles: LookBundle[];
  onShowToast: (msg: string) => void;
}

export const BundlesTab: React.FC<BundlesTabProps> = ({ lookBundles, onShowToast }) => {
  const [editingBundle, setEditingBundle] = useState<Partial<LookBundle> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBundle) return;

    const price = Number(editingBundle.price) || 199.90;
    const origPrice = editingBundle.originalPrice ? Number(editingBundle.originalPrice) : price + 40;
    const savings = origPrice > price ? `Economize R$ ${(origPrice - price).toFixed(2).replace('.', ',')}` : '';

    if (editingBundle.id) {
      cmsStore.updateLookBundle({ ...editingBundle, price, originalPrice: origPrice, savingsText: savings } as LookBundle);
      onShowToast('Kit Look Completo atualizado!');
    } else {
      const newBundle: LookBundle = {
        id: 'look-' + Date.now(),
        title: editingBundle.title || 'Novo Look Completo',
        theme: editingBundle.theme || 'Infantil',
        coverImage: editingBundle.coverImage || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
        price: price,
        originalPrice: origPrice,
        savingsText: savings,
        description: editingBundle.description || 'Kit de peças coordenadas em Algodão Egípcio.',
        items: editingBundle.items || [
          { name: 'Body Manga Curta', type: 'Body' },
          { name: 'Calça Culotte', type: 'Calça' },
          { name: 'Touquinha', type: 'Touca' }
        ],
        isActive: editingBundle.isActive ?? true,
        order: lookBundles.length + 1
      };
      cmsStore.addLookBundle(newBundle);
      onShowToast('Novo Kit de Look cadastrado!');
    }
    setEditingBundle(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToStorage(file, 'pixulinhos-media');
      setEditingBundle(prev => ({ ...prev, coverImage: url }));
      onShowToast('Foto do Kit enviada!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Módulo Looks Completos & Kits</h2>
          <p className="text-xs text-gray-500">Cadastre conjuntos promocionais de produtos combinados com desconto</p>
        </div>

        <button
          onClick={() => setEditingBundle({
            title: '',
            theme: 'Safari',
            price: 199.90,
            originalPrice: 249.90,
            description: '',
            items: [{ name: 'Body', type: 'Body' }, { name: 'Calça', type: 'Calça' }],
            isActive: true
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Kit</span>
        </button>
      </div>

      {/* Grid of Bundles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lookBundles.map(bundle => (
          <div key={bundle.id} className="p-4 bg-[#FFFDF9] rounded-3xl border border-pink-100 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
            <img src={bundle.coverImage} alt={bundle.title} className="w-28 h-28 object-cover rounded-2xl border border-pink-100 shadow-xs flex-shrink-0" />
            <div className="space-y-1 flex-1">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-extrabold">
                {bundle.theme || 'Kit Especial'}
              </span>
              <h4 className="font-bold text-sm text-[#231F40]">{bundle.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{bundle.description}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-extrabold text-sm text-[#FF3B7A]">R$ {bundle.price.toFixed(2).replace('.', ',')}</span>
                {bundle.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">R$ {bundle.originalPrice.toFixed(2).replace('.', ',')}</span>
                )}
              </div>
            </div>

            <div className="flex flex-row sm:flex-col gap-2 justify-end w-full sm:w-auto">
              <button
                onClick={() => setEditingBundle(bundle)}
                className="p-2 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir Kit "${bundle.title}"?`)) {
                    cmsStore.deleteLookBundle(bundle.id);
                    onShowToast('Kit excluído!');
                  }
                }}
                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Excluir</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingBundle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-brand font-bold text-[#231F40]">
              {editingBundle.id ? 'Editar Kit' : 'Novo Kit de Look Completo'}
            </h3>

            <form onSubmit={handleSaveBundle} className="space-y-4 text-xs font-bold text-[#231F40]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Título do Kit *</label>
                  <input
                    type="text"
                    required
                    value={editingBundle.title || ''}
                    onChange={e => setEditingBundle({ ...editingBundle, title: e.target.value })}
                    placeholder="ex: Look Safari do Urso"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">Tema / Categoria</label>
                  <input
                    type="text"
                    value={editingBundle.theme || ''}
                    onChange={e => setEditingBundle({ ...editingBundle, theme: e.target.value })}
                    placeholder="ex: Safari"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Preço do Combo (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingBundle.price || ''}
                    onChange={e => setEditingBundle({ ...editingBundle, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">Preço Original / Separado (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingBundle.originalPrice || ''}
                    onChange={e => setEditingBundle({ ...editingBundle, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Imagem Principal do Kit</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={editingBundle.coverImage || ''}
                    onChange={e => setEditingBundle({ ...editingBundle, coverImage: e.target.value })}
                    className="flex-1 p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                  <label className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer font-bold flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-1">Descrição Comercial</label>
                <textarea
                  value={editingBundle.description || ''}
                  onChange={e => setEditingBundle({ ...editingBundle, description: e.target.value })}
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-20"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBundle(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600 shadow-md"
                >
                  Salvar Kit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
