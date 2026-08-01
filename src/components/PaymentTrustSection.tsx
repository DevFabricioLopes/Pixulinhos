import React from 'react';
import { ShieldCheck, Truck, Lock, HeartHandshake, CreditCard, Sparkles } from 'lucide-react';

export const PaymentTrustSection: React.FC = () => {
  return (
    <section className="py-10 bg-[#FFFDF9] border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-pink-100 text-[#FF3B7A]">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#231F40]">Envio para todo Brasil</h4>
            <p className="text-[11px] text-gray-500">Com código de rastreamento direto no WhatsApp</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-teal-100 text-[#00BFA5]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#231F40]">100% Antialérgico</h4>
            <p className="text-[11px] text-gray-500">100% Algodão Egípcio e toque aveludado</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-purple-100 text-[#7C4DFF]">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#231F40]">Compra Segura</h4>
            <p className="text-[11px] text-gray-500">Atendimento e pagamentos 100% garantidos</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-amber-100 text-[#B45309]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-[#231F40]">Atendimento Humanizado</h4>
            <p className="text-[11px] text-gray-500">Consultoras prontas para tirar dúvidas</p>
          </div>
        </div>

        {/* Formas de Pagamento Trust Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-pink-100 shadow-md text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <CreditCard className="w-4 h-4 text-[#FF3B7A]" />
            <span>Formas de Pagamento Aceitas</span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Facilitamos o pagamento direto no WhatsApp no momento da finalização do pedido com total segurança.
          </p>

          {/* Payment Icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
            {/* PIX */}
            <div className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-[#00BFA5] font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm">
              <span className="text-base">⚡</span> PIX (Desconto Especial)
            </div>

            {/* Visa */}
            <div className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-xs sm:text-sm shadow-sm">
              VISA
            </div>

            {/* Mastercard */}
            <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 font-extrabold text-xs sm:text-sm shadow-sm">
              Mastercard
            </div>

            {/* Elo */}
            <div className="px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-xs sm:text-sm shadow-sm">
              Elo
            </div>

            {/* Mercado Pago */}
            <div className="px-4 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 font-extrabold text-xs sm:text-sm shadow-sm">
              Mercado Pago
            </div>

            {/* Parcelamento */}
            <div className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-200 text-[#7C4DFF] font-extrabold text-xs sm:text-sm shadow-sm">
              Parcelamento em até 6x
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
