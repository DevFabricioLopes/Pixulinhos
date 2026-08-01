import React from 'react';
import { Heart, Sparkles, MessageCircle, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  whatsappNumber: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onToggleWishlist,
  isWishlisted,
  whatsappNumber
}) => {
  const whatsappMsg = `Olá 😊\nVi o produto "${product.name}" no site da Pixulinhos e gostaria de encomendar!`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="group relative flex-none w-60 sm:w-64 md:w-72 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start">
        {product.isNew && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#FF3B7A] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Novo
          </span>
        )}
        {product.isPromotion && product.originalPrice && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#00BFA5] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-400 hover:text-[#FF3B7A] hover:bg-white transition-all shadow-sm"
        aria-label="Adicionar aos favoritos"
      >
        <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#FF3B7A] text-[#FF3B7A]' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/5] bg-pink-50/50 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="p-3 rounded-full bg-white text-[#231F40] hover:bg-pink-50 font-bold text-xs shadow-lg flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <Eye className="w-4 h-4 text-[#FF3B7A]" />
            <span>Ver Detalhes</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
              <span>★ {product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount || 12})</span>
            </div>
          )}

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-extrabold text-[#231F40] group-hover:text-[#FF3B7A] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Available Sizes Pills */}
          <div className="flex items-center gap-1 mt-2 flex-wrap">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="px-1.5 py-0.5 rounded bg-pink-50 text-[10px] font-bold text-[#FF3B7A]">
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-gray-400 font-bold">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-pink-50 flex items-center justify-between gap-2">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="text-base font-extrabold text-[#FF3B7A]">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
            <span className="text-[10px] text-gray-500 block">3x R$ {(product.price / 3).toFixed(2).replace('.', ',')}</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
            title="Pedir no WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">Eu Quero</span>
          </a>
        </div>
      </div>
    </div>
  );
};
