import React from 'react';
import { X, Trash2, MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  whatsappNumber: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveItem,
  onClearAll,
  whatsappNumber
}) => {
  if (!isOpen) return null;

  const totalValue = wishlistProducts.reduce((acc, p) => acc + p.price, 0);

  const whatsappMessage = `Olá 😊
Gostaria de encomendar minha Sacola de Desejos da Pixulinhos!

Itens selecionados (${wishlistProducts.length}):
${wishlistProducts.map((p, idx) => `${idx + 1}. ${p.name} - R$ ${p.price.toFixed(2).replace('.', ',')}`).join('\n')}

Valor Total: R$ ${totalValue.toFixed(2).replace('.', ',')}
Gostaria de verificar a disponibilidade de tamanhos!`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-[#FFFDF9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-pink-100 text-[#FF3B7A]">
              <Heart className="w-5 h-5 fill-[#FF3B7A]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231F40]">Sua Sacola de Desejos</h3>
              <p className="text-xs text-gray-500">{wishlistProducts.length} {wishlistProducts.length === 1 ? 'item salvo' : 'itens salvos'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-3">
              <Heart className="w-16 h-16 stroke-1 text-pink-200" />
              <p className="text-sm font-bold text-[#231F40]">Sua sacola de desejos está vazia</p>
              <p className="text-xs text-gray-500">Clique no coraçãozinho dos looks que você amou para salvar aqui!</p>
            </div>
          ) : (
            wishlistProducts.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFFDF9] border border-pink-100 shadow-sm">
                <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#231F40] truncate">{item.name}</h4>
                  <p className="text-xs font-extrabold text-[#FF3B7A]">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout via WhatsApp */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-pink-100 bg-[#FFFDF9] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-600">Total Estimado:</span>
              <span className="text-lg font-brand font-bold text-[#FF3B7A]">
                R$ {totalValue.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Enviar Sacola para o WhatsApp</span>
            </a>

            <button
              onClick={onClearAll}
              className="w-full text-center text-xs text-gray-400 hover:text-red-500 underline py-1"
            >
              Esvaziar Sacola
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
