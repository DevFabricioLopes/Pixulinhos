import React from 'react';
import {
  Package,
  Layers,
  Image,
  Heart,
  Sparkles,
  Star,
  HelpCircle,
  EyeOff,
  Tag,
  AlertTriangle,
  TrendingUp,
  Plus,
  ArrowRight,
  Database,
  CheckCircle2
} from 'lucide-react';
import { Product, Category, Banner, CMSStats } from '../../../types';

interface DashboardOverviewTabProps {
  stats: CMSStats;
  products: Product[];
  categories: Category[];
  banners: Banner[];
  isSupabaseConnected: boolean;
  onNavigateTab: (tab: any) => void;
  onOpenNewProduct: () => void;
  onOpenNewCategory: () => void;
  onOpenNewBanner: () => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({
  stats,
  products,
  categories,
  banners,
  isSupabaseConnected,
  onNavigateTab,
  onOpenNewProduct,
  onOpenNewCategory,
  onOpenNewBanner
}) => {
  return (
    <div className="space-y-6">
      
      {/* Database Connection Badge Banner */}
      <div className={`p-4 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border shadow-sm ${
        isSupabaseConnected
          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
          : 'bg-amber-50/80 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${isSupabaseConnected ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-brand font-bold text-sm">
              {isSupabaseConnected ? 'Conectado ao Supabase PostgreSQL' : 'Modo Cache Local (Aguardando Supabase)'}
            </h4>
            <p className="text-xs opacity-80">
              {isSupabaseConnected
                ? 'Todos os seus dados estão sincronizados em tempo real com a nuvem Supabase.'
                : 'O CMS está funcionando perfeitamente em modo local. Para conectar com seu Supabase, insira as credenciais na aba Configurações.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('settings')}
          className="px-4 py-2 bg-white rounded-xl text-xs font-extrabold shadow-xs hover:shadow transition-all whitespace-nowrap"
        >
          {isSupabaseConnected ? 'Ver Status Supabase' : 'Configurar Supabase'}
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        <div
          onClick={() => onNavigateTab('products')}
          className="bg-white p-4 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Produtos</span>
            <div className="p-2 rounded-xl bg-pink-50 text-[#FF3B7A] group-hover:scale-110 transition-transform">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#231F40]">{stats.totalProducts}</p>
          <p className="text-[11px] text-gray-400 mt-1">Cadastrados no catálogo</p>
        </div>

        <div
          onClick={() => onNavigateTab('categories')}
          className="bg-white p-4 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Categorias</span>
            <div className="p-2 rounded-xl bg-purple-50 text-[#7C4DFF] group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#231F40]">{stats.totalCategories}</p>
          <p className="text-[11px] text-gray-400 mt-1">Carrosséis automáticos</p>
        </div>

        <div
          onClick={() => onNavigateTab('banners')}
          className="bg-white p-4 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Banners</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Image className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#231F40]">{stats.totalBanners}</p>
          <p className="text-[11px] text-gray-400 mt-1">Destaques ativos</p>
        </div>

        <div
          onClick={() => onNavigateTab('bundles')}
          className="bg-white p-4 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Looks / Kits</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#231F40]">{stats.totalLookBundles}</p>
          <p className="text-[11px] text-gray-400 mt-1">Kits de desconto</p>
        </div>

        <div
          onClick={() => onNavigateTab('inspire')}
          className="bg-white p-4 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Inspire-se</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#231F40]">{stats.totalInspirePosts}</p>
          <p className="text-[11px] text-gray-400 mt-1">Fotos na galeria</p>
        </div>

        <div
          onClick={() => onNavigateTab('reviews')}
          className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">Avaliações</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#231F40]">{stats.totalReviews}</p>
          <p className="text-[11px] text-gray-400 mt-1">Depoimentos reais</p>
        </div>

      </div>

      {/* Quick Action Hub & Health Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions Panel */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-brand font-bold text-lg text-[#231F40]">Ações Rápidas</h3>
            <span className="text-xs font-bold text-gray-400">Atalhos</span>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={onOpenNewProduct}
              className="w-full p-3.5 bg-pink-50 hover:bg-pink-100 text-[#FF3B7A] rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4" />
                <span>Cadastrar Novo Produto</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewCategory}
              className="w-full p-3.5 bg-purple-50 hover:bg-purple-100 text-[#7C4DFF] rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4" />
                <span>Criar Nova Categoria</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewBanner}
              className="w-full p-3.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Plus className="w-4 h-4" />
                <span>Adicionar Novo Banner</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('home_builder')}
              className="w-full p-3.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>Organizar Seções da Home (Shopify Builder)</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Catalog Health & Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-brand font-bold text-lg text-[#231F40]">Saúde do Catálogo & Alertas</h3>
            <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">Diagnóstico</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gray-200 text-gray-700">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#231F40]">{stats.hiddenProductsCount}</p>
                <p className="text-xs text-gray-500 font-medium">Produtos ocultos / inativos</p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-800">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-amber-900">{stats.promotionProductsCount}</p>
                <p className="text-xs text-amber-700 font-medium">Produtos em promoção com desconto</p>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-200 text-red-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-red-900">{stats.outOfStockProductsCount}</p>
                <p className="text-xs text-red-700 font-medium">Itens sem estoque (Estoque = 0)</p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-200 text-[#7C4DFF]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#231F40]">{stats.totalFaqs}</p>
                <p className="text-xs text-gray-500 font-medium">Perguntas no FAQ da Loja</p>
              </div>
            </div>

          </div>

          {/* Recent Additions List */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Últimos Produtos Cadastrados</h4>
            <div className="divide-y divide-gray-100">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={p.images[0]} alt={p.name} className="w-8 h-8 rounded-lg object-cover border" />
                    <span className="font-bold text-[#231F40] truncate max-w-[200px] sm:max-w-[300px]">{p.name}</span>
                  </div>
                  <span className="font-extrabold text-[#FF3B7A]">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
