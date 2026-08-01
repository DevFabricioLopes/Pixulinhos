import React from 'react';

interface PixulinhosLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showHanger?: boolean;
  className?: string;
}

export const PixulinhosLogo: React.FC<PixulinhosLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showHanger = true,
  className = ''
}) => {
  // Dimension maps
  const scale = {
    sm: 'text-2xl gap-1',
    md: 'text-3xl sm:text-4xl gap-1.5',
    lg: 'text-4xl sm:text-5xl gap-2',
    xl: 'text-5xl sm:text-6xl gap-3'
  }[size];

  const hangerSize = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  // Letter color palette matching the brand logo
  const letters = [
    { char: 'p', color: 'text-[#FF3B7A] bg-pink-100/60 shadow-pink-200' },
    { char: 'i', color: 'text-[#FFC107] bg-amber-100/60 shadow-amber-200' },
    { char: 'x', color: 'text-[#00BFA5] bg-teal-100/60 shadow-teal-200' },
    { char: 'u', color: 'text-[#7C4DFF] bg-purple-100/60 shadow-purple-200' },
    { char: 'l', color: 'text-[#00B0FF] bg-sky-100/60 shadow-sky-200' },
    { char: 'i', color: 'text-[#FFC107] bg-amber-100/60 shadow-amber-200' },
    { char: 'n', color: 'text-[#00BFA5] bg-teal-100/60 shadow-teal-200' },
    { char: 'h', color: 'text-[#7C4DFF] bg-purple-100/60 shadow-purple-200' },
    { char: 'o', color: 'text-[#00B0FF] bg-sky-100/60 shadow-sky-200' },
    { char: 's', color: 'text-[#FF3B7A] bg-pink-100/60 shadow-pink-200' },
  ];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Wooden Hanger & Shirt Graphic if enabled */}
      {showHanger && (
        <div className={`relative mb-1 flex items-center justify-center animate-float ${hangerSize}`}>
          <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-md">
            {/* Wooden Hanger */}
            <path d="M50 12 C 50 2, 60 2, 60 12 C 60 22, 50 22, 50 28 L 15 50 C 12 52, 12 58, 18 58 L 82 58 C 88 58, 88 52, 85 50 L 50 28 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <circle cx="50" cy="20" r="5" fill="#FF3B7A" />
            {/* White T-shirt */}
            <path d="M 30 45 L 20 52 L 28 64 L 35 58 L 35 85 C 35 88, 65 88, 65 85 L 65 58 L 72 64 L 80 52 L 70 45 C 65 50, 35 50, 30 45 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            {/* Heart on t-shirt */}
            <path d="M 50 68 C 50 68, 43 62, 43 57 C 43 54, 46 52, 49 54 C 50 55, 50 55, 51 54 C 54 52, 57 54, 57 57 C 57 62, 50 68, 50 68 Z" fill="#FF3B7A" />
          </svg>
        </div>
      )}

      {/* Main Bubbly Lettering */}
      <div className={`flex items-center font-brand font-bold tracking-tight ${scale}`}>
        {letters.map((item, idx) => (
          <span
            key={idx}
            className={`inline-block transform hover:-translate-y-1 hover:scale-110 transition-all duration-200 ${item.color} drop-shadow-sm`}
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.06)'
            }}
          >
            {item.char}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-1 text-[#2E266E] font-medium text-xs sm:text-sm tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B7A] inline-block animate-ping"></span>
          <span>roupas que vestem carinho</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B7A] inline-block"></span>
        </div>
      )}
    </div>
  );
};
