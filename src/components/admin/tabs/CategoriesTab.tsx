import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Layers, Sparkles } from 'lucide-react';
import { Category } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';

interface CategoriesTabProps {
  categories: Category[];
  onShowToast: (msg: string) => void;
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({ categories, onShowToast }) => {
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (editingCategory.id) {
      cmsStore.updateCategory(editingCategory as Category);
      onShowToast('Categoria atualizada com sucesso!');
    } else {
      const slug = (editingCategory.name || 'Nova')
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const newCat: Category = {
        id: 'cat-' + Date.now(),
        name: editingCategory.name || 'Nova Categoria',
        slug: slug,
        order: categories.length + 1,
        description: editingCategory.description || '',
        icon: editingCategory.icon || 'Sparkles',
        isActive: editingCategory.isActive ?? true,
        isFeatured: editingCategory.isFeatured ?? false,
        metaTitle: editingCategory.metaTitle,
        metaDescription: editingCategory.metaDescription
      };
      cmsStore.addCategory(newCat);
      onShowToast('Nova categoria criada sem alterar código!');
    }
    setEditingCategory(null);
  };

  const handleReorder = (index: number, direction: 'up' | 'down') => {
    const list = [...categories];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const updated = list.map((c, i) => ({ ...c, order: i + 1 }));
    cmsStore.saveCategories(updated);
    onShowToast('Ordem das categorias reordenada!');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Gerenciador de Categorias</h2>
          <p className="text-xs text-gray-500">Crie e ordene seções do catálogo e carrosséis automatizados</p>
        </div>

        <button
          onClick={() => setEditingCategory({
            name: '',
            description: '',
            icon: 'Sparkles',
            isActive: true,
            isFeatured: false
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Categoria</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((cat, idx) => (
          <div key={cat.id} className="flex items-center justify-between p-4 bg-[#FFFDF9] border border-pink-100 rounded-2xl shadow-xs">
            
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-2xl bg-pink-100 text-[#FF3B7A] text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#231F40] uppercase">{cat.name}</h4>
                  <span className="text-[10px] bg-gray-100 text-gray-600 font-mono px-1.5 py-0.5 rounded">/{cat.slug}</span>
                  {cat.isFeatured && (
                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-extrabold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Destaque
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{cat.description || 'Sem descrição cadastrada'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleReorder(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-lg text-gray-600"
                title="Subir Posição"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleReorder(idx, 'down')}
                disabled={idx === categories.length - 1}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-lg text-gray-600"
                title="Descer Posição"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => setEditingCategory(cat)}
                className="p-1.5 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-lg"
                title="Editar Categoria"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir a categoria "${cat.name}"?`)) {
                    cmsStore.deleteCategory(cat.id);
                    onShowToast('Categoria excluída!');
                  }
                }}
                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                title="Excluir Categoria"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-brand font-bold text-[#231F40]">
              {editingCategory.id ? 'Editar Categoria' : 'Criar Nova Categoria'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-bold text-[#231F40]">
              <div>
                <label className="block mb-1">Nome da Categoria</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="ex: MANTAS & NANINHAS"
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Descrição Curta</label>
                <input
                  type="text"
                  value={editingCategory.description || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="ex: Aconchego e quentinho para os dias frios"
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.isActive ?? true}
                    onChange={e => setEditingCategory({ ...editingCategory, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Categoria Visível</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.isFeatured ?? false}
                    onChange={e => setEditingCategory({ ...editingCategory, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Destaque no Menu</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600 shadow-md"
                >
                  Salvar Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
