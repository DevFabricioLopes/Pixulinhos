import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Upload, CheckCircle2 } from 'lucide-react';
import { Review } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { uploadToStorage } from '../../../lib/supabase';

interface ReviewsTabProps {
  reviews: Review[];
  onShowToast: (msg: string) => void;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, onShowToast }) => {
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    if (editingReview.id) {
      cmsStore.updateReview(editingReview as Review);
      onShowToast('Depoimento atualizado!');
    } else {
      const newReview: Review = {
        id: 'rev-' + Date.now(),
        authorName: editingReview.authorName || 'Cliente Pixulinhos',
        babyInfo: editingReview.babyInfo || 'Mamãe satisfeita',
        rating: Number(editingReview.rating) || 5,
        comment: editingReview.comment || 'Produtos de extrema qualidade e entrega super rápida!',
        photo: editingReview.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        productName: editingReview.productName || 'Saída Maternidade',
        verifiedPurchase: editingReview.verifiedPurchase ?? true,
        date: editingReview.date || 'Recente',
        isActive: editingReview.isActive ?? true
      };
      cmsStore.addReview(newReview);
      onShowToast('Nova avaliação cadastrada!');
    }
    setEditingReview(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToStorage(file, 'pixulinhos-media');
      setEditingReview(prev => ({ ...prev, photo: url }));
      onShowToast('Foto do perfil enviada!');
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
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Módulo Avaliações de Clientes</h2>
          <p className="text-xs text-gray-500">Gerencie depoimentos reais, notas e selos de compra verificada</p>
        </div>

        <button
          onClick={() => setEditingReview({
            authorName: '',
            babyInfo: 'Mãe do bebê',
            rating: 5,
            comment: '',
            verifiedPurchase: true,
            date: 'Há 2 dias',
            isActive: true
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Avaliação</span>
        </button>
      </div>

      {/* List of Reviews */}
      <div className="space-y-3">
        {reviews.map(rev => (
          <div key={rev.id} className="p-4 bg-[#FFFDF9] border border-pink-100 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="flex items-start gap-3">
              <img src={rev.photo} alt={rev.authorName} className="w-12 h-12 rounded-full object-cover border border-pink-200 shadow-xs flex-shrink-0" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#231F40]">{rev.authorName}</h4>
                  <span className="text-xs text-gray-400">• {rev.babyInfo}</span>
                  {rev.verifiedPurchase && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                    </span>
                  )}
                </div>
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-600 italic">"{rev.comment}"</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => setEditingReview(rev)}
                className="p-2 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-xl"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir avaliação de "${rev.authorName}"?`)) {
                    cmsStore.deleteReview(rev.id);
                    onShowToast('Avaliação excluída!');
                  }
                }}
                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-brand font-bold text-[#231F40]">
              {editingReview.id ? 'Editar Avaliação' : 'Cadastrar Avaliação'}
            </h3>

            <form onSubmit={handleSaveReview} className="space-y-3 text-xs font-bold text-[#231F40]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Nome do Cliente *</label>
                  <input
                    type="text"
                    required
                    value={editingReview.authorName || ''}
                    onChange={e => setEditingReview({ ...editingReview, authorName: e.target.value })}
                    placeholder="ex: Camila Rodrigues"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">Info do Bebê *</label>
                  <input
                    type="text"
                    required
                    value={editingReview.babyInfo || ''}
                    onChange={e => setEditingReview({ ...editingReview, babyInfo: e.target.value })}
                    placeholder="ex: Mãe da Maitê, 2 meses"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Nota (1 a 5 estrelas)</label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={e => setEditingReview({ ...editingReview, rating: parseInt(e.target.value) })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  >
                    <option value={5}>5 Estrelas ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Estrelas ⭐⭐⭐⭐</option>
                    <option value={3}>3 Estrelas ⭐⭐⭐</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Data / Período</label>
                  <input
                    type="text"
                    value={editingReview.date || ''}
                    onChange={e => setEditingReview({ ...editingReview, date: e.target.value })}
                    placeholder="ex: Há 3 dias"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Foto da Mãe ou Bebê</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={editingReview.photo || ''}
                    onChange={e => setEditingReview({ ...editingReview, photo: e.target.value })}
                    className="flex-1 p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                  <label className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer font-bold flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-1">Depoimento em Texto *</label>
                <textarea
                  required
                  value={editingReview.comment || ''}
                  onChange={e => setEditingReview({ ...editingReview, comment: e.target.value })}
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-20"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600 shadow-md"
                >
                  Salvar Depoimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
