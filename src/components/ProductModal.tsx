import React, { useState } from 'react';
import { X, Heart, MessageCircle, Check, ShieldCheck, Truck, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  relatedProducts: Product[];
  onSelectRelated: (product: Product) => void;
  whatsappNumber: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onToggleWishlist,
  isWishlisted,
  relatedProducts,
  onSelectRelated,
  whatsappNumber
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'P');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Padrão');
  const [showSizeChart, setShowSizeChart] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  };

  // WhatsApp order text format
  const whatsappText = `Olá 😊
Vi este produto no site da Pixulinhos.
Gostaria de comprar este look.

Produto: ${product.name}
Tamanho: ${selectedSize}
Cor: ${selectedColor}
Preço: R$ ${product.price.toFixed(2).replace('.', ',')}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      {/* Modal Card Wrapper */}
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Close & Wishlist Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-pink-100 bg-white">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-pink-100 text-[#FF3B7A] text-xs font-extrabold">
              {product.isNew ? '✨ Lançamento' : '❤️ Look Selecionado'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2.5 rounded-full border transition-all ${
                isWishlisted
                  ? 'bg-pink-100 border-pink-200 text-[#FF3B7A]'
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-[#FF3B7A]'
              }`}
              title="Favoritar"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#FF3B7A]' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-[#FF3B7A] transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Left: Product Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 shadow-sm">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Gallery Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-[#FF3B7A] scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Buying Info */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h1 className="text-2xl sm:text-3xl font-brand font-bold text-[#231F40] leading-tight">
                  {product.name}
                </h1>
                
                {product.rating && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-amber-400 text-sm font-bold">
                      ★★★★★ <span className="ml-1 text-xs text-[#231F40]">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-400">• {product.reviewCount || 24} avaliações de mamães</span>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-teal-50 border border-pink-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-brand font-extrabold text-[#FF3B7A]">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-[#2E266E] mt-1">
                  💳 Em até 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#231F40] uppercase tracking-wider">
                    Selecione o Tamanho: <span className="text-[#FF3B7A]">{selectedSize}</span>
                  </label>

                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-xs font-bold text-[#FF3B7A] hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" /> Guia de Tamanhos
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-[#FF3B7A] text-white border-[#FF3B7A] shadow-md shadow-pink-200 scale-105'
                            : 'bg-white border-pink-100 text-[#231F40] hover:border-[#FF3B7A]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-[#231F40] uppercase tracking-wider">
                    Cor / Estampa: <span className="text-[#FF3B7A]">{selectedColor}</span>
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((col) => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-purple-100 text-[#7C4DFF] border-[#7C4DFF] shadow-sm'
                              : 'bg-white border-gray-200 text-[#231F40] hover:border-purple-300'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: col.hex }}
                          ></span>
                          <span>{col.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GIANT CTA BUTTON FOR WHATSAPP */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-green-200 transition-all transform hover:scale-102 flex items-center justify-center gap-3 animate-pulse-subtle"
                >
                  <MessageCircle className="w-7 h-7 fill-white" />
                  <span>💚 Eu Quero Esse Look</span>
                </a>
                <p className="text-[11px] text-center text-gray-500 mt-2">
                  Atendimento via WhatsApp • Você será redirecionado para falar diretamente com nossa equipe.
                </p>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-pink-100 space-y-2">
                <h4 className="text-xs font-extrabold text-[#231F40] uppercase tracking-wider">Detalhes do Produto</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{product.description}</p>
                {product.details && (
                  <ul className="space-y-1 text-xs text-gray-600 pt-1">
                    {product.details.map((dt, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00BFA5]" />
                        <span>{dt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-gray-500">
                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-pink-100">
                  <ShieldCheck className="w-4 h-4 text-[#00BFA5]" />
                  <span>100% Antialérgico</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-pink-100">
                  <Truck className="w-4 h-4 text-[#FF3B7A]" />
                  <span>Envio Garantido</span>
                </div>
              </div>

            </div>

          </div>

          {/* Size Chart Modal / Accordion */}
          {showSizeChart && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-[#231F40] space-y-2">
              <div className="font-extrabold text-sm flex items-center gap-1.5 text-amber-800">
                <Sparkles className="w-4 h-4" /> Tabela de Medidas Aproximadas
              </div>
              <div className="grid grid-cols-4 gap-2 text-center bg-white p-3 rounded-xl border border-amber-200 font-medium">
                <div><span className="font-bold text-[#FF3B7A]">RN:</span> 0 a 1 Mês</div>
                <div><span className="font-bold text-[#FF3B7A]">P:</span> 1 a 3 Meses</div>
                <div><span className="font-bold text-[#FF3B7A]">M:</span> 3 a 6 Meses</div>
                <div><span className="font-bold text-[#FF3B7A]">G:</span> 6 a 9 Meses</div>
                <div><span className="font-bold text-[#FF3B7A]">GG:</span> 9 a 12 Meses</div>
                <div><span className="font-bold text-[#FF3B7A]">1:</span> 12 a 18 Meses</div>
                <div><span className="font-bold text-[#FF3B7A]">2:</span> 2 Anos</div>
                <div><span className="font-bold text-[#FF3B7A]">3:</span> 3 Anos</div>
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-pink-100 space-y-4">
              <h3 className="text-lg font-brand font-bold text-[#231F40]">Combine com outros looks carinhosos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedProducts.slice(0, 4).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="cursor-pointer group p-2 rounded-2xl bg-white border border-pink-100 hover:border-[#FF3B7A] transition-all"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-pink-50 mb-2">
                      <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs font-bold text-[#231F40] truncate">{rel.name}</p>
                    <p className="text-xs font-extrabold text-[#FF3B7A]">R$ {rel.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
