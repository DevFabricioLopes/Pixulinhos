import React from 'react';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';
import { InspirePost } from '../types';

interface InspireSectionProps {
  posts: InspirePost[];
  whatsappNumber: string;
}

export const InspireSection: React.FC<InspireSectionProps> = ({ posts, whatsappNumber }) => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FFFDF9] via-pink-50/40 to-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-[#FF3B7A] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#FF3B7A]" /> Mães & Bebês Real
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold text-[#231F40]">
            💕 Inspire-se
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Veja a fofura real de bebês vestindo Pixulinhos. Escolha o seu look favorito e garanta o mesmo para o seu amor!
          </p>
        </div>

        {/* Pinterest Masonry / Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const whatsappText = `Olá 😊\nVi a foto do fofíssimo bebê ${post.babyName} (${post.age}) na seção "Inspire-se" usando o look "${post.productName}".\n\nGostaria de comprar esse mesmo look!`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            return (
              <div
                key={post.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-md hover:shadow-2xl hover:shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              >
                {/* Photo Area */}
                <div className="relative aspect-[4/5] bg-pink-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt={`${post.babyName} usando ${post.productName}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#231F40] shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF3B7A]" />
                    <span>{post.babyName}, {post.age}</span>
                  </div>

                  {/* Likes pill */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#FF3B7A] shadow-sm flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#FF3B7A]" />
                    <span>{post.likes}</span>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                  {/* Bottom Text inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs text-amber-200 font-bold uppercase tracking-wider">Look Usado:</p>
                    <p className="text-sm font-extrabold line-clamp-1">{post.productName}</p>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="p-4 bg-white flex items-center justify-between gap-3">
                  <div className="text-xs text-gray-500 font-medium">
                    Inspirado na fofura de {post.babyName}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold shadow-md shadow-green-100 flex items-center gap-2 transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>💚 Eu Quero Esse Look</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
