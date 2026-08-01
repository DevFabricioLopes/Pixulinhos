import React, { useState, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Copy, Search, Filter, Eye, EyeOff, Upload,
  Sparkles, Tag, Check, ChevronLeft, ChevronRight, Image as ImageIcon
} from 'lucide-react';
import { Product, Category } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { uploadToStorage } from '../../../lib/supabase';

interface ProductsTabProps {
  products: Product[];
  categories: Category[];
  onShowToast: (msg: string) => void;
  editingProduct: Partial<Product> | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Partial<Product> | null>>;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  categories,
  onShowToast,
  editingProduct,
  setEditingProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'promo'>('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isUploading, setIsUploading] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCatFilter === 'all' || p.categoryId === selectedCatFilter;

      let matchesStatus = true;
      if (statusFilter === 'active') matchesStatus = p.isActive !== false;
      if (statusFilter === 'inactive') matchesStatus = p.isActive === false;
      if (statusFilter === 'promo') matchesStatus = p.isPromotion || (p.originalPrice && p.originalPrice > p.price) || false;

      return matchesQuery && matchesCat && matchesStatus;
    });
  }, [products, searchQuery, selectedCatFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (editingProduct.id) {
      cmsStore.updateProduct(editingProduct as Product);
      onShowToast('Produto atualizado com sucesso!');
    } else {
      const newProd: Product = {
        id: 'prod-' + Date.now(),
        sku: editingProduct.sku || `PX-${Date.now().toString().slice(-6)}`,
        name: editingProduct.name || 'Novo Produto',
        price: Number(editingProduct.price) || 49.90,
        originalPrice: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
        installments: editingProduct.installments || 'até 6x sem juros',
        stock: editingProduct.stock ?? 99,
        weight: editingProduct.weight ?? 0.20,
        categoryId: editingProduct.categoryId || categories[0]?.id || 'cat-body',
        brand: editingProduct.brand || 'Pixulinhos',
        mainImage: editingProduct.images?.[0] || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
        images: editingProduct.images?.length ? editingProduct.images : ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'],
        sizes: editingProduct.sizes || ['RN', 'P', 'M', 'G'],
        colors: editingProduct.colors || [{ name: 'Padrão', hex: '#FFB3C6' }],
        description: editingProduct.description || 'Roupinha super macia em Algodão Egípcio.',
        shortDescription: editingProduct.shortDescription || '',
        details: editingProduct.details || ['100% Algodão', 'Toque macio'],
        isNew: editingProduct.isNew ?? true,
        isFeatured: editingProduct.isFeatured ?? false,
        isPromotion: editingProduct.isPromotion ?? false,
        isBestSeller: editingProduct.isBestSeller ?? false,
        isActive: editingProduct.isActive ?? true,
        rating: 5.0,
        reviewCount: 1
      };
      cmsStore.addProduct(newProd);
      onShowToast('Produto cadastrado com sucesso!');
    }
    setEditingProduct(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const publicUrl = await uploadToStorage(file, 'pixulinhos-products');
      setEditingProduct(prev => {
        const currentImgs = prev?.images || [];
        return {
          ...prev,
          images: [publicUrl, ...currentImgs],
          mainImage: prev?.mainImage || publicUrl
        };
      });
      onShowToast('Foto enviada para a galeria!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleProductActive = (product: Product) => {
    cmsStore.updateProduct({ ...product, isActive: !product.isActive });
    onShowToast(product.isActive ? 'Produto ocultado do site' : 'Produto ativado!');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      {/* Header & New Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Catálogo Profissional de Produtos</h2>
          <p className="text-xs text-gray-500">Gerencie preços, estoque, galeria de imagens e badges</p>
        </div>

        <button
          onClick={() => setEditingProduct({
            name: '',
            sku: `PX-${Math.floor(Math.random() * 900000 + 100000)}`,
            price: 59.90,
            categoryId: categories[0]?.id || 'cat-body',
            sizes: ['RN', 'P', 'M', 'G'],
            colors: [{ name: 'Padrão', hex: '#FFB3C6' }],
            images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'],
            description: 'Roupinha super macia em Algodão Egípcio.',
            details: ['100% Algodão', 'Abotoamento prático'],
            isNew: true,
            isActive: true,
            stock: 50
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Produto</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou SKU..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF3B7A]"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCatFilter}
            onChange={e => { setSelectedCatFilter(e.target.value); setCurrentPage(1); }}
            className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF3B7A]"
          >
            <option value="all">Todas as Categorias ({categories.length})</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
            className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF3B7A]"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Somente Ativos no Site</option>
            <option value="inactive">Somente Inativos / Ocultos</option>
            <option value="promo">Somente Promoções</option>
          </select>
        </div>

      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-pink-50/60 text-[#231F40] font-bold border-b border-pink-100">
              <th className="p-3">Foto</th>
              <th className="p-3">SKU & Nome</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Estoque</th>
              <th className="p-3">Badges</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
            {paginatedProducts.map((p) => {
              const catName = categories.find(c => c.id === p.categoryId)?.name || 'Geral';
              return (
                <tr key={p.id} className={`hover:bg-pink-50/30 ${p.isActive === false ? 'opacity-50 bg-gray-50' : ''}`}>
                  <td className="p-3">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-pink-100 shadow-xs" />
                  </td>
                  <td className="p-3 space-y-0.5">
                    <div className="font-bold text-[#231F40]">{p.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono">SKU: {p.sku || 'N/A'}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md font-bold">{catName}</span>
                  </td>
                  <td className="p-3 space-y-0.5">
                    <div className="font-extrabold text-[#FF3B7A]">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                    {p.originalPrice && (
                      <div className="text-[10px] text-gray-400 line-through">R$ {p.originalPrice.toFixed(2).replace('.', ',')}</div>
                    )}
                  </td>
                  <td className="p-3 font-bold">
                    <span className={`px-2 py-0.5 rounded-md ${
                      (p.stock ?? 50) > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      {p.stock ?? 50} un
                    </span>
                  </td>
                  <td className="p-3 space-x-1">
                    {p.isNew && <span className="px-1.5 py-0.5 bg-pink-100 text-[#FF3B7A] rounded text-[10px] font-bold">Novo</span>}
                    {p.isPromotion && <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">Promo</span>}
                    {p.isFeatured && <span className="px-1.5 py-0.5 bg-purple-100 text-[#7C4DFF] rounded text-[10px] font-bold">Destaque</span>}
                  </td>
                  <td className="p-3 text-right space-x-1.5">
                    <button
                      onClick={() => toggleProductActive(p)}
                      className={`p-1.5 rounded-lg text-xs font-bold ${
                        p.isActive !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                      }`}
                      title={p.isActive !== false ? 'Ocultar do site' : 'Exibir no site'}
                    >
                      {p.isActive !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-1.5 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-lg"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        cmsStore.duplicateProduct(p.id);
                        onShowToast('Produto duplicado com sucesso!');
                      }}
                      className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg"
                      title="Duplicar"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Excluir "${p.name}"?`)) {
                          cmsStore.deleteProduct(p.id);
                          onShowToast('Produto excluído');
                        }
                      }}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2 border-t text-xs font-bold text-gray-500">
        <span>Exibindo {paginatedProducts.length} de {filteredProducts.length} produtos</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EDIT / CREATE PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <h3 className="text-xl font-brand font-bold text-[#231F40]">
              {editingProduct.id ? 'Editar Produto' : 'Cadastrar Novo Produto'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-bold text-[#231F40]">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="ex: Body Algodão Egípcio Nuvenzinha"
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">SKU / Código do Produto</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1">Categoria *</label>
                  <select
                    value={editingProduct.categoryId || categories[0]?.id}
                    onChange={e => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Preço Atual (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>

                <div>
                  <label className="block mb-1">Preço Original / De (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.originalPrice || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Galeria de Imagens (Upload ou URLs)</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Cole a URL da foto..."
                      value={editingProduct.images?.[0] || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, images: [e.target.value, ...(editingProduct.images?.slice(1) || [])] })}
                      className="flex-1 p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                    />
                    <label className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer flex items-center gap-1 font-bold">
                      <Upload className="w-4 h-4" />
                      <span>{isUploading ? '...' : 'Upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>

                  {/* Thumbnail previews */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {editingProduct.images?.map((imgUrl, i) => (
                      <div key={i} className="relative group flex-shrink-0">
                        <img src={imgUrl} alt="" className="w-14 h-14 object-cover rounded-xl border border-pink-200" />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editingProduct.images?.filter((_, idx) => idx !== i);
                            setEditingProduct({ ...editingProduct, images: updated });
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1">Descrição Completa</label>
                <textarea
                  required
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-24"
                />
              </div>

              <div className="flex items-center gap-6 pt-2 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNew || false}
                    onChange={e => setEditingProduct({ ...editingProduct, isNew: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Selo Novidade / Lançamento</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isPromotion || false}
                    onChange={e => setEditingProduct({ ...editingProduct, isPromotion: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Selo Promoção</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isFeatured || false}
                    onChange={e => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Destaque na Home</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isActive ?? true}
                    onChange={e => setEditingProduct({ ...editingProduct, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#FF3B7A] rounded"
                  />
                  <span>Produto Ativo / Visível</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600 shadow-md"
                >
                  Salvar Produto
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
