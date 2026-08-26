import React from 'react';

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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] text-white p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/40"
      aria-label="Falar no WhatsApp"
      title="Atendimento via WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.983zm11.458-7.067c-.079-.132-.288-.211-.605-.369-.317-.159-1.874-.925-2.164-1.032-.29-.106-.501-.159-.712.159-.211.317-.818 1.032-.977 1.218-.159.185-.317.212-.634.053-.317-.159-1.34-.494-2.553-1.576-.944-.842-1.582-1.882-1.767-2.199-.185-.317-.02-.488.139-.646.143-.143.317-.37.476-.555.159-.185.212-.317.317-.529.106-.212.053-.396-.026-.555-.079-.159-.712-1.719-.977-2.354-.257-.619-.519-.536-.712-.546l-.608-.01c-.211 0-.555.079-.846.396-.29.317-1.11 1.085-1.11 2.646 0 1.561 1.137 3.07 1.295 3.282.159.212 2.238 3.418 5.423 4.793.758.328 1.349.524 1.81.67.761.241 1.453.207 2.001.125.611-.092 1.874-.766 2.138-1.507.264-.741.264-1.375.185-1.507z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
      </div>
    </a>
  );
};
