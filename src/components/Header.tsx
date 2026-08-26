import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Settings, X, Sparkles } from 'lucide-react';
import { PixulinhosLogo } from './PixulinhosLogo';
import { Category, Product, SiteSettings } from '../types';

interface HeaderProps {
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  activeCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
  onSelectProduct: (product: Product) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  isAdminActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  categories,
  products,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  wishlistCount,
  onOpenWishlist,
  onOpenAdmin,
  isAdminActive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Search filter
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FF3B7A] via-[#7C4DFF] to-[#00BFA5] text-white py-1 px-4 text-center text-xs font-medium tracking-wide shadow-inner flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-200 hidden sm:inline" />
        <span>{settings.topAnnouncement}</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div 
            onClick={() => { onSelectCategory(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <PixulinhosLogo size="md" showSubtitle={true} showHanger={true} />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="O que seu bebê precisa hoje? ex: body, saída maternidade, macacão..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-1.5 bg-white border-2 border-pink-100 focus:border-[#FF3B7A] rounded-full text-xs sm:text-sm text-[#231F40] placeholder-gray-400 focus:outline-none transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-[#FF3B7A] absolute left-3 top-2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Search Dropdown Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden z-50 p-2">
                <div className="text-xs font-semibold text-gray-400 px-3 py-1">PRODUTOS ENCONTRADOS ({searchResults.length})</div>
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-pink-50/60 rounded-xl cursor-pointer transition-colors"
                  >
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#231F40] truncate">{product.name}</p>
                      <p className="text-xs text-[#FF3B7A] font-extrabold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-1.5 rounded-full bg-pink-50 text-[#FF3B7A] hover:bg-pink-100 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp Quick Link Header Button */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de tirar uma dúvida sobre as roupas da Pixulinhos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all transform hover:scale-105 shadow-sm shadow-green-200"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Sacola de Desejos / Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full bg-pink-50 text-[#FF3B7A] hover:bg-pink-100 transition-colors flex items-center justify-center"
              title="Sua Sacola de Desejos"
            >
              <Heart className="w-4 h-4 fill-pink-100" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3B7A] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Toggle Button */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isAdminActive
                  ? 'bg-[#7C4DFF] text-white shadow-md'
                  : 'bg-purple-50 text-[#7C4DFF] hover:bg-purple-100'
              }`}
              title="Painel Administrativo CMS"
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="hidden lg:inline">{isAdminActive ? 'Sair do CMS' : 'Painel Admin'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Expanded Search Bar */}
        {isSearchOpen && (
          <div className="mt-2 md:hidden relative">
            <input
              type="text"
              placeholder="Buscar roupinhas fofas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-1.5 bg-white border-2 border-pink-200 rounded-full text-xs text-[#231F40] focus:outline-none focus:border-[#FF3B7A]"
              autoFocus
            />
            <Search className="w-4 h-4 text-[#FF3B7A] absolute left-3 top-2" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-gray-400">
                <X className="w-4 h-4" />
              </button>
            )}

            {searchResults.length > 0 && (
              <div className="mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden p-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-pink-50 rounded-xl"
                  >
                    <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#231F40] truncate">{product.name}</p>
                      <p className="text-xs text-[#FF3B7A] font-extrabold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Category Navigation Pills */}
        <div className="mt-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3.5 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === null
                ? 'bg-[#FF3B7A] text-white shadow-md shadow-pink-200 scale-105'
                : 'bg-white border border-pink-100 text-[#231F40] hover:bg-pink-50'
            }`}
          >
            ✨ Todos os Looks
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#FF3B7A] text-white shadow-md shadow-pink-200 scale-105'
                    : 'bg-white border border-pink-100 text-[#231F40] hover:bg-pink-50 hover:text-[#FF3B7A]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
