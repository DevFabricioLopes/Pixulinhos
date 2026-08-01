import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { FAQ } from '../types';

interface FAQSectionProps {
  faqs: FAQ[];
  whatsappNumber?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, whatsappNumber }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const activeFaqs = faqs.filter((f) => f.isActive !== false);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Olá! Estava lendo as dúvidas frequentes e gostaria de tirar uma dúvida sobre meu pedido.'
  )}`;

  return (
    <section className="py-12 sm:py-20 bg-[#FFFDF9] border-t border-pink-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-[#00BFA5] text-xs font-extrabold uppercase tracking-widest shadow-xs">
            <HelpCircle className="w-4 h-4 text-[#00BFA5]" /> Suporte & Transparência
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold text-[#231F40]">
            Dúvidas frequentes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Tudo o que você precisa saber sobre tamanhos, trocas, prazos de entrega, pagamentos e a qualidade de nosso algodão.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {activeFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? 'border-[#FF3B7A] shadow-md ring-2 ring-pink-100'
                    : 'border-pink-100 hover:border-pink-200 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#231F40] text-sm sm:text-base focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-pink-50 text-[#FF3B7A] text-xs font-extrabold shrink-0">
                      {faq.category || 'Dúvida'}
                    </span>
                    <span className="font-brand text-base sm:text-lg text-[#231F40]">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#FF3B7A] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#FF3B7A] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-pink-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA fallback */}
        {whatsappNumber && (
          <div className="p-6 rounded-3xl bg-pink-50/70 border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-brand font-bold text-[#231F40] text-base">Ainda tem alguma dúvida?</h4>
              <p className="text-xs text-gray-500 mt-1">Nossas consultoras estão prontas para te atender no WhatsApp.</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Tirar Dúvidas pelo WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
};
