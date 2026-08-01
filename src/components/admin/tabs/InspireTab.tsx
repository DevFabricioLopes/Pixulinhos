import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Heart, Upload } from 'lucide-react';
import { InspirePost, Product } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { uploadToStorage } from '../../../lib/supabase';

interface InspireTabProps {
  inspirePosts: InspirePost[];
  products: Product[];
  onShowToast: (msg: string) => void;
}

export const InspireTab: React.FC<InspireTabProps> = ({ inspirePosts, products, onShowToast }) => {
  const [editingPost, setEditingPost] = useState<Partial<InspirePost> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (editingPost.id) {
      cmsStore.updateInspirePost(editingPost as InspirePost);
      onShowToast('Foto Inspire-se atualizada!');
    } else {
      const newPost: InspirePost = {
        id: 'inspire-' + Date.now(),
        babyName: editingPost.babyName || 'Bebê Pixulinhos',
        age: editingPost.age || '3 meses',
        city: editingPost.city || '',
        image: editingPost.image || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
        productName: editingPost.productName || 'Look Pixulinhos',
        likes: Number(editingPost.likes) || Math.floor(Math.random() * 300) + 100,
        isActive: editingPost.isActive ?? true,
        caption: editingPost.caption || ''
      };
      cmsStore.addInspirePost(newPost);
      onShowToast('Nova foto adicionada à galeria Inspire-se!');
    }
    setEditingPost(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToStorage(file, 'pixulinhos-media');
      setEditingPost(prev => ({ ...prev, image: url }));
      onShowToast('Foto enviada com sucesso!');
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
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Módulo Inspire-se (Galeria do Cliente)</h2>
          <p className="text-xs text-gray-500">Gerencie as fotos e depoimentos visuais de bebês usando os looks</p>
        </div>

        <button
          onClick={() => setEditingPost({
            babyName: '',
            age: '',
            city: '',
            productName: '',
            likes: 250,
            isActive: true
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Foto</span>
        </button>
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {inspirePosts.map(post => (
          <div key={post.id} className="bg-[#FFFDF9] rounded-2xl border border-pink-100 p-3 space-y-2 relative group shadow-xs">
            <img src={post.image} alt={post.babyName} className="w-full h-40 object-cover rounded-xl border border-pink-100" />
            <div>
              <h4 className="font-bold text-xs text-[#231F40]">{post.babyName} ({post.age})</h4>
              <p className="text-[11px] text-pink-600 font-bold truncate">{post.productName}</p>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>{post.likes} curtidas</span>
              </div>
            </div>

            <div className="flex items-center gap-1 justify-end pt-1 border-t">
              <button
                onClick={() => setEditingPost(post)}
                className="p-1 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-md"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir foto de ${post.babyName}?`)) {
                    cmsStore.deleteInspirePost(post.id);
                    onShowToast('Foto removida!');
                  }
                }}
                className="p-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-brand font-bold text-[#231F40]">
              {editingPost.id ? 'Editar Foto Inspire-se' : 'Adicionar Foto na Galeria'}
            </h3>

            <form onSubmit={handleSavePost} className="space-y-3 text-xs font-bold text-[#231F40]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Nome do Bebê *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.babyName || ''}
                    onChange={e => setEditingPost({ ...editingPost, babyName: e.target.value })}
                    placeholder="ex: Helena"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">Idade *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.age || ''}
                    onChange={e => setEditingPost({ ...editingPost, age: e.target.value })}
                    placeholder="ex: 3 meses"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Nome do Produto Utilizado</label>
                <input
                  type="text"
                  required
                  value={editingPost.productName || ''}
                  onChange={e => setEditingPost({ ...editingPost, productName: e.target.value })}
                  placeholder="ex: Kit Saída Maternidade Princesa"
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Imagem da Galeria</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={editingPost.image || ''}
                    onChange={e => setEditingPost({ ...editingPost, image: e.target.value })}
                    className="flex-1 p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                  <label className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer font-bold flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600"
                >
                  Salvar Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
