import React, { useState, useEffect } from 'react';
import {
  X, RefreshCw, Check, Lock, LayoutDashboard, Package, Layers, Image,
  Heart, Sparkles, Star, HelpCircle, Layout, FolderOpen, Search, Settings
} from 'lucide-react';
import { Category, Product, Banner, InspirePost, LookBundle, Review, FAQ, HomeSection, SiteSettings, MediaItem } from '../../types';
import { cmsStore } from '../../services/cmsStore';
import { getSupabase, isSupabaseConfigured } from '../../lib/supabase';

// Sub-tabs
import { DashboardOverviewTab } from './tabs/DashboardOverviewTab';
import { BannersTab } from './tabs/BannersTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { ProductsTab } from './tabs/ProductsTab';
import { InspireTab } from './tabs/InspireTab';
import { BundlesTab } from './tabs/BundlesTab';
import { ReviewsTab } from './tabs/ReviewsTab';
import { FAQTab } from './tabs/FAQTab';
import { HomeBuilderTab } from './tabs/HomeBuilderTab';
import { SettingsTab } from './tabs/SettingsTab';
import { MediaManagerTab } from './tabs/MediaManagerTab';
import { SEOTab } from './tabs/SEOTab';

interface AdminDashboardProps {
  onClose: () => void;
  products: Product[];
  categories: Category[];
  banners: Banner[];
  inspirePosts: InspirePost[];
  lookBundles: LookBundle[];
  reviews: Review[];
  settings: SiteSettings;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose, products, categories, banners, inspirePosts, lookBundles, reviews, settings
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const supabase = getSupabase();

  type TabType = 'dashboard' | 'products' | 'categories' | 'banners' | 'inspire' | 'bundles' | 'reviews' | 'faqs' | 'home_builder' | 'media' | 'seo' | 'settings';
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>(cmsStore.getFaqs());
  const [homeSections, setHomeSections] = useState<HomeSection[]>(cmsStore.getHomeSections());
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(cmsStore.getMediaItems());
  const [successMsg, setSuccessMsg] = useState('');
  const isSupabaseConnected = isSupabaseConfigured();

  useEffect(() => {
    let mounted = true;
    const restoreSession = async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (mounted && data.session) setIsAuthenticated(true);
    };
    restoreSession();
    if (!supabase) return () => { mounted = false; };
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsAuthenticated(!!session);
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, [supabase]);

  useEffect(() => {
    const handleUpdate = () => {
      setFaqs(cmsStore.getFaqs());
      setHomeSections(cmsStore.getHomeSections());
      setMediaItems(cmsStore.getMediaItems());
    };
    window.addEventListener('pixulinhos_cms_update', handleUpdate);
    return () => window.removeEventListener('pixulinhos_cms_update', handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setLoginError('Supabase não está configurado. Verifique as variáveis da Vercel.');
      return;
    }
    if (!emailInput.trim() || !passwordInput) {
      setLoginError('Informe o e-mail e a senha.');
      return;
    }
    setIsLoggingIn(true);
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email: emailInput.trim(), password: passwordInput });
    if (error) setLoginError('E-mail ou senha incorretos.');
    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-pink-100 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-[#7C4DFF] flex items-center justify-center mx-auto shadow-inner"><Lock className="w-8 h-8" /></div>
          <div>
            <h2 className="text-2xl font-brand font-bold text-[#231F40]">CMS Pixulinhos 2.0</h2>
            <p className="text-xs text-gray-500 mt-1">Entre com o e-mail e a senha do Supabase</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="E-mail administrativo" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full text-center py-3 border-2 border-pink-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#7C4DFF]" autoFocus />
            <input type="password" placeholder="Senha do Supabase" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full text-center py-3 border-2 border-pink-200 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#7C4DFF]" />
            {loginError && <p className="text-xs text-red-500 font-bold">{loginError}</p>}
            <button disabled={isLoggingIn} type="submit" className="w-full py-3.5 bg-[#7C4DFF] text-white font-extrabold rounded-2xl hover:bg-purple-700 shadow-lg transition-all disabled:opacity-60">{isLoggingIn ? 'Entrando...' : 'Acessar Painel'}</button>
          </form>
          <button onClick={onClose} className="text-xs text-gray-400 hover:underline">Voltar à loja pública</button>
        </div>
      </div>
    );
  }

  const stats = cmsStore.getStats();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#130E26]/90 backdrop-blur-md flex flex-col font-sans">
      {successMsg && <div className="fixed top-5 right-5 z-50 bg-[#00BFA5] text-white px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs sm:text-sm flex items-center gap-2 animate-bounce"><Check className="w-5 h-5" /><span>{successMsg}</span></div>}
      <div className="bg-[#1C1738] text-white px-4 sm:px-8 py-4 flex items-center justify-between border-b border-purple-800/80 shadow-md">
        <div className="flex items-center gap-3"><div className="p-2.5 rounded-2xl bg-[#FF3B7A] text-white font-extrabold text-xs tracking-wider shadow-md">PIXULINHOS 2.0</div><div><h1 className="text-lg sm:text-2xl font-brand font-bold flex items-center gap-2"><span>Painel Administrativo Completo</span><span className="hidden sm:inline-block px-2 py-0.5 bg-purple-900/60 text-purple-300 text-[10px] rounded-md font-mono border border-purple-700">100% Gerenciável</span></h1><p className="text-xs text-purple-200 hidden sm:block">Altere produtos, categorias, banners e seções em tempo real sem editar código</p></div></div>
        <div className="flex items-center gap-2 sm:gap-3"><button onClick={() => { if (confirm('Deseja restaurar todos os dados e conteúdos para o estado inicial de demonstração?')) { cmsStore.resetAll(); showToast('Dados restaurados para o padrão inicial!'); } }} className="px-3 py-2 rounded-xl bg-red-900/40 text-red-200 hover:bg-red-800 text-xs font-bold transition-colors flex items-center gap-1.5" title="Restaurar Dados Iniciais"><RefreshCw className="w-3.5 h-3.5" /><span className="hidden md:inline">Restaurar Demo</span></button><button onClick={handleLogout} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold">Sair</button><button onClick={onClose} className="p-2 sm:p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors" title="Voltar à loja pública"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button></div>
      </div>
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            ['dashboard', LayoutDashboard, 'Dashboard'], ['products', Package, `Produtos (${products.length})`], ['categories', Layers, `Categorias (${categories.length})`], ['banners', Image, `Banners (${banners.length})`], ['bundles', Sparkles, `Looks Completos (${lookBundles.length})`], ['inspire', Heart, `Inspire-se (${inspirePosts.length})`], ['reviews', Star, `Avaliações (${reviews.length})`], ['faqs', HelpCircle, `FAQ (${faqs.length})`], ['home_builder', Layout, 'Home Builder'], ['media', FolderOpen, `Mídias (${mediaItems.length})`], ['seo', Search, 'SEO & Google'], ['settings', Settings, 'Configurações & Supabase']
          ].map(([id, Icon, label]) => <button key={id as string} onClick={() => setActiveTab(id as TabType)} className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === id ? 'bg-[#FF3B7A] text-white shadow-lg scale-105' : 'bg-white/90 text-gray-700 hover:bg-white'}`}><Icon className="w-4 h-4" /><span>{label as string}</span></button>)}
        </div>
        {activeTab === 'dashboard' && <DashboardOverviewTab stats={stats} products={products} categories={categories} banners={banners} isSupabaseConnected={isSupabaseConnected} onNavigateTab={(tab) => setActiveTab(tab)} onOpenNewProduct={() => { setActiveTab('products'); setEditingProduct({ name: '', price: 59.90, categoryId: categories[0]?.id || 'cat-body', sizes: ['RN', 'P', 'M', 'G'], colors: [{ name: 'Padrão', hex: '#FFB3C6' }], images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'], description: 'Roupinha super macia em Algodão Egípcio.', details: ['100% Algodão', 'Gola expansível'], isNew: true }); }} onOpenNewCategory={() => { setActiveTab('categories'); setEditingCategory({ name: '', description: '' }); }} onOpenNewBanner={() => setActiveTab('banners')} />}
        {activeTab === 'products' && <ProductsTab products={products} categories={categories} onShowToast={showToast} editingProduct={editingProduct} setEditingProduct={setEditingProduct} />}
        {activeTab === 'categories' && <CategoriesTab categories={categories} onShowToast={showToast} />}
        {activeTab === 'banners' && <BannersTab banners={banners} categories={categories} onShowToast={showToast} />}
        {activeTab === 'inspire' && <InspireTab inspirePosts={inspirePosts} products={products} onShowToast={showToast} />}
        {activeTab === 'bundles' && <BundlesTab lookBundles={lookBundles} onShowToast={showToast} />}
        {activeTab === 'reviews' && <ReviewsTab reviews={reviews} onShowToast={showToast} />}
        {activeTab === 'faqs' && <FAQTab faqs={faqs} onShowToast={showToast} />}
        {activeTab === 'home_builder' && <HomeBuilderTab sections={homeSections} onShowToast={showToast} />}
        {activeTab === 'media' && <MediaManagerTab mediaItems={mediaItems} onShowToast={showToast} />}
        {activeTab === 'seo' && <SEOTab settings={settings} onShowToast={showToast} />}
        {activeTab === 'settings' && <SettingsTab settings={settings} onShowToast={showToast} />}
      </div>
    </div>
  );
};