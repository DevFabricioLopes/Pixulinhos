import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Upload, Image as ImageIcon } from 'lucide-react';
import { Banner, Category } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { uploadToStorage } from '../../../lib/supabase';

interface BannersTabProps {
  banners: Banner[];
  categories: Category[];
  onShowToast: (msg: string) => void;
}

export const BannersTab: React.FC<BannersTabProps> = ({ banners, categories, onShowToast }) => {
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    if (editingBanner.id) {
      cmsStore.updateBanner(editingBanner as Banner);
      onShowToast('Banner atualizado!');
    } else {
      const newBanner: Banner = {
        id: 'banner-' + Date.now(),
        title: editingBanner.title || 'Novo Banner',
        subtitle: editingBanner.subtitle || '',
        buttonText: editingBanner.buttonText || 'Ver Coleção',
        buttonLink: editingBanner.buttonLink || '#catalog-section',
        image: editingBanner.image || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
        mobileImage: editingBanner.mobileImage || editingBanner.image,
        badgeText: editingBanner.badgeText || '✨ NOVIDADE',
        categorySlug: editingBanner.categorySlug || '',
        priority: Number(editingBanner.priority) || 1,
        active: editingBanner.active ?? true
      };
      cmsStore.addBanner(newBanner);
      onShowToast('Novo banner adicionado!');
    }
    setEditingBanner(null);
  };

  const handleFileUpload = async (file: File, isMobile = false) => {
    setIsUploading(true);
    try {
      const publicUrl = await uploadToStorage(file, 'pixulinhos-banners');
      if (isMobile) {
        setEditingBanner(prev => ({ ...prev, mobileImage: publicUrl }));
      } else {
        setEditingBanner(prev => ({ ...prev, image: publicUrl }));
      }
      onShowToast('Imagem enviada com sucesso!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleBannerActive = (banner: Banner) => {
    cmsStore.updateBanner({ ...banner, active: !banner.active });
    onShowToast(banner.active ? 'Banner desativado' : 'Banner ativado!');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Gerenciador de Banners Promocionais</h2>
          <p className="text-xs text-gray-500">Configure os destaques do topo e carrosséis da Landing Page</p>
        </div>

        <button
          onClick={() => setEditingBanner({
            title: '',
            subtitle: '',
            buttonText: '💚 Ver Coleção',
            badgeText: '✨ LANÇAMENTO',
            active: true,
            priority: banners.length + 1
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Banner</span>
        </button>
      </div>

      {/* Banners List */}
      <div className="space-y-4">
        {banners.map((b, idx) => (
          <div key={b.id} className="p-4 bg-[#FFFDF9] border border-pink-100 rounded-3xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={b.image}
                alt={b.title}
                className="w-24 h-16 object-cover rounded-2xl border border-pink-200 shadow-xs flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-pink-100 text-[#FF3B7A] rounded-md text-[10px] font-extrabold">
                    {b.badgeText || 'Destaque'}
                  </span>
                  {!b.active && (
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-md text-[10px] font-extrabold flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Inativo
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-[#231F40]">{b.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-1">{b.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => toggleBannerActive(b)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  b.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}
                title={b.active ? 'Desativar Banner' : 'Ativar Banner'}
              >
                {b.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{b.active ? 'Ativo' : 'Oculto'}</span>
              </button>

              <button
                onClick={() => setEditingBanner(b)}
                className="p-2 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-xl"
                title="Editar Banner"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir o banner "${b.title}"?`)) {
                    cmsStore.deleteBanner(b.id);
                    onShowToast('Banner excluído');
                  }
                }}
                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl"
                title="Excluir Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* EDIT / CREATE BANNER MODAL */}
      {editingBanner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-brand font-bold text-[#231F40]">
              {editingBanner.id ? 'Editar Banner' : 'Adicionar Novo Banner'}
            </h3>

            <form onSubmit={handleSaveBanner} className="space-y-4 text-xs font-bold text-[#231F40]">
              <div>
                <label className="block mb-1">Título Principal do Banner</label>
                <input
                  type="text"
                  required
                  value={editingBanner.title || ''}
                  onChange={e => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  placeholder="ex: Coleção Saída Maternidade Inesquecível"
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Subtítulo / Descrição</label>
                <textarea
                  value={editingBanner.subtitle || ''}
                  onChange={e => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  placeholder="ex: Peças em 100% Algodão Egípcio bordadas com amor."
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Selo / Badge de Destaque</label>
                  <input
                    type="text"
                    value={editingBanner.badgeText || ''}
                    onChange={e => setEditingBanner({ ...editingBanner, badgeText: e.target.value })}
                    placeholder="ex: ✨ LANÇAMENTO EXCLUSIVO"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">Texto do Botão CTA</label>
                  <input
                    type="text"
                    value={editingBanner.buttonText || ''}
                    onChange={e => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
                    placeholder="ex: 🛍️ Ver Coleção"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Imagem Desktop (URL ou Upload)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={editingBanner.image || ''}
                    onChange={e => setEditingBanner({ ...editingBanner, image: e.target.value })}
                    className="flex-1 p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                  <label className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer flex items-center gap-1 font-bold">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], false)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingBanner.active ?? true}
                    onChange={e => setEditingBanner({ ...editingBanner, active: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Banner Ativo no Site</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600 shadow-md"
                >
                  {isUploading ? 'Enviando...' : 'Salvar Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
