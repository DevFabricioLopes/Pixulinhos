import React, { useState } from 'react';
import { Upload, Copy, Trash2, Image as ImageIcon, Search, Check } from 'lucide-react';
import { MediaItem } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { uploadToStorage } from '../../../lib/supabase';

interface MediaManagerTabProps {
  mediaItems: MediaItem[];
  onShowToast: (msg: string) => void;
}

export const MediaManagerTab: React.FC<MediaManagerTabProps> = ({ mediaItems, onShowToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicUrl = await uploadToStorage(file, 'pixulinhos-media');
        const newItem: MediaItem = {
          id: 'media-' + Date.now() + '-' + i,
          fileName: file.name,
          url: publicUrl,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          dimensions: '1000x1000',
          uploadedAt: new Date().toLocaleDateString('pt-BR'),
          category: 'geral'
        };
        cmsStore.addMediaItem(newItem);
      }
      onShowToast(`${files.length} arquivo(s) enviado(s) para a mídia!`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    onShowToast('Link da imagem copiado!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaItems.filter(m => {
    const title = m.fileName || m.name || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Biblioteca de Mídias & Arquivos</h2>
          <p className="text-xs text-gray-500">Gerencie todas as fotos, logotipos e banners em um único lugar</p>
        </div>

        <label className="px-5 py-3 bg-[#FF3B7A] text-white font-extrabold text-xs rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2 cursor-pointer transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Enviando...' : 'Fazer Upload de Imagens'}</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar mídias por nome..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF3B7A]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-[#FFFDF9] rounded-2xl border border-pink-100 p-2.5 space-y-2 relative group shadow-xs">
            <img src={item.url} alt={item.fileName || item.name || 'Mídia'} className="w-full h-28 object-cover rounded-xl border border-pink-100" />
            <div>
              <p className="font-bold text-[11px] text-[#231F40] truncate">{item.fileName || item.name || 'Mídia sem nome'}</p>
              <p className="text-[10px] text-gray-400">{item.fileSize || item.createdAt || 'Mídia'}</p>
            </div>

            <div className="flex items-center gap-1 justify-between pt-1 border-t">
              <button
                onClick={() => handleCopy(item.url, item.id)}
                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[10px] font-bold flex items-center gap-1"
                title="Copiar URL da Imagem"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir imagem "${item.fileName || item.name || 'Mídia'}"?`)) {
                    cmsStore.deleteMediaItem(item.id);
                    onShowToast('Mídia removida');
                  }
                }}
                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
