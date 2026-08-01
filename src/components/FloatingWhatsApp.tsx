import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : '5511999999999';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Olá! Vim pelo site Pixulinhos e gostaria de mais informações.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp-btn"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-lg hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Falar no WhatsApp"
      title="Atendimento via WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle className="w-6 h-6 fill-white text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
      </div>
    </a>
  );
};
