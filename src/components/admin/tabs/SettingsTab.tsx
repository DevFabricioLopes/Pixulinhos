import React, { useState } from 'react';
import { Save, Database, Key, Globe, Phone, FileText, BarChart2, Upload, Trash2, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { SiteSettings } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';
import { getSupabaseCredentials, saveSupabaseCredentials, getSupabase, uploadToStorage } from '../../../lib/supabase';

interface SettingsTabProps {
  settings: SiteSettings;
  onShowToast: (msg: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onShowToast }) => {
  const [form, setForm] = useState<SiteSettings>(settings);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  
  const currentCreds = getSupabaseCredentials();
  const [supaUrl, setSupaUrl] = useState(currentCreds.url);
  const [supaKey, setSupaKey] = useState(currentCreds.key);
  const [supaTesting, setSupaTesting] = useState(false);
  const [supaStatus, setSupaStatus] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.saveSettings(form);
    onShowToast('Configurações salvas com sucesso!');
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHero(true);
    try {
      const publicUrl = await uploadToStorage(file, 'pixulinhos-media');
      const updatedForm = { ...form, heroImage: publicUrl };
      setForm(updatedForm);
      cmsStore.saveSettings(updatedForm);
      onShowToast('Nova imagem enviada e salva com sucesso!');
    } catch (err) {
      console.error(err);
      onShowToast('Erro ao fazer upload da imagem.');
    } finally {
      setIsUploadingHero(false);
    }
  };

  const handleDeleteHeroImage = () => {
    if (confirm('Tem certeza que deseja excluir a imagem da Coleção Doce Infância 2026?')) {
      const updatedForm = { ...form, heroImage: '' };
      setForm(updatedForm);
      cmsStore.saveSettings(updatedForm);
      onShowToast('Imagem excluída com sucesso!');
    }
  };

  const handleRestoreDefaultHeroImage = () => {
    const defaultUrl = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80';
    const updatedForm = { ...form, heroImage: defaultUrl };
    setForm(updatedForm);
    cmsStore.saveSettings(updatedForm);
    onShowToast('Imagem padrão restaurada!');
  };

  const handleSaveSupabaseCredentials = async () => {
    setSupaTesting(true);
    setSupaStatus(null);
    try {
      saveSupabaseCredentials(supaUrl, supaKey);
      const client = getSupabase();
      if (!client) {
        setSupaStatus('Erro: URL ou Chave inválidas.');
      } else {
        const { error } = await client.from('categories').select('count', { count: 'exact', head: true });
        if (error) {
          setSupaStatus(`Erro ao conectar com Supabase: ${error.message}`);
        } else {
          setSupaStatus('Conexão com Supabase estabelecida com sucesso!');
          cmsStore.syncFromSupabase();
          onShowToast('Conectado ao Supabase!');
        }
      }
    } catch (err: any) {
      setSupaStatus(`Exceção: ${err.message || 'Erro desconhecido'}`);
    } finally {
      setSupaTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* SUPABASE CONNECTION CARD */}
      <div className="bg-[#1C1738] text-white rounded-3xl p-6 shadow-xl border border-purple-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#7C4DFF] text-white rounded-2xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-brand font-bold">Conexão com Banco de Dados Supabase</h3>
            <p className="text-xs text-purple-200">Insira a URL e Anon Key do seu projeto no Supabase para sincronização em tempo real</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          <div>
            <label className="block text-purple-200 mb-1">SUPABASE URL</label>
            <input
              type="text"
              value={supaUrl}
              onChange={e => setSupaUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-[#7C4DFF]"
            />
          </div>

          <div>
            <label className="block text-purple-200 mb-1">SUPABASE ANON KEY</label>
            <input
              type="password"
              value={supaKey}
              onChange={e => setSupaKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-[#7C4DFF]"
            />
          </div>
        </div>

        {supaStatus && (
          <div className={`p-3 rounded-xl text-xs font-bold ${
            supaStatus.includes('sucesso') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
          }`}>
            {supaStatus}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleSaveSupabaseCredentials}
            disabled={supaTesting}
            className="px-6 py-2.5 bg-[#7C4DFF] hover:bg-purple-600 text-white rounded-xl font-extrabold text-xs shadow-md transition-all"
          >
            {supaTesting ? 'Testando Conexão...' : 'Salvar & Testar Conexão Supabase'}
          </button>
        </div>
      </div>

      {/* STORE SETTINGS FORM */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
        <h2 className="text-xl font-brand font-bold text-[#231F40]">Configurações Gerais da Loja Pixulinhos</h2>

        <form onSubmit={handleSaveSettings} className="space-y-6 text-xs font-bold text-[#231F40]">
          
          {/* Section 1: Contacts & Store Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-brand font-bold text-[#FF3B7A] border-b pb-1">1. Contatos e Redes Sociais</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">WhatsApp para Vendas (Com código de país 55 e DDD)</label>
                <input
                  type="text"
                  required
                  value={form.whatsappNumber}
                  onChange={e => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="5548991147392"
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Telefone de Atendimento</label>
                <input
                  type="text"
                  value={form.phoneNumber || ''}
                  onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                  placeholder="(48) 99114-7392"
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">E-mail de Suporte</label>
                <input
                  type="email"
                  value={form.email || ''}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="contato@pixulinhos.com.br"
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={form.instagramUrl}
                  onChange={e => setForm({ ...form, instagramUrl: e.target.value })}
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Endereço Físico / Texto do Rodapé</label>
              <input
                type="text"
                value={form.storeAddress}
                onChange={e => setForm({ ...form, storeAddress: e.target.value })}
                className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
              />
            </div>
          </div>

          {/* Section 2: Banner Top & Hero Texts */}
          <div className="space-y-4">
            <h4 className="text-sm font-brand font-bold text-[#FF3B7A] border-b pb-1">2. Textos do Topo & Hero Principal</h4>

            <div>
              <label className="block mb-1">Aviso no Topo do Site (Faixa de Anúncios)</label>
              <input
                type="text"
                value={form.topAnnouncement}
                onChange={e => setForm({ ...form, topAnnouncement: e.target.value })}
                className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Selo / Badge do Hero</label>
                <input
                  type="text"
                  value={form.heroBadgeText}
                  onChange={e => setForm({ ...form, heroBadgeText: e.target.value })}
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Título do Hero</label>
                <input
                  type="text"
                  value={form.heroTitle}
                  onChange={e => setForm({ ...form, heroTitle: e.target.value })}
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Subheadline do Hero</label>
              <textarea
                value={form.heroSubheadline}
                onChange={e => setForm({ ...form, heroSubheadline: e.target.value })}
                className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-20"
              />
            </div>

            {/* Hero Image Management Box for Coleção Doce Infância 2026 */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50/70 to-purple-50/70 rounded-2xl border border-pink-200/80 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h5 className="font-brand font-bold text-sm text-[#231F40] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#FF3B7A]" />
                    <span>Imagem ao lado da "Coleção Doce Infância 2026" (Hero)</span>
                  </h5>
                  <p className="text-[11px] text-gray-500 font-normal">
                    Gerencie a foto exibida em destaque ao lado do título da coleção no topo do site.
                  </p>
                </div>

                {form.heroImage !== undefined && form.heroImage !== '' && (
                  <button
                    type="button"
                    onClick={handleDeleteHeroImage}
                    className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Excluir Imagem</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Image Preview */}
                <div className="sm:col-span-4 flex justify-center">
                  <div className="relative aspect-[4/5] w-36 bg-white rounded-2xl border-2 border-pink-200 overflow-hidden shadow-sm flex items-center justify-center">
                    {form.heroImage ? (
                      <img src={form.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="p-3 text-center text-gray-400 text-[11px] font-bold">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 text-gray-300" />
                        <span>Sem Imagem</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & URL Input */}
                <div className="sm:col-span-8 space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">URL da Imagem (Edição manual)</label>
                    <input
                      type="text"
                      value={form.heroImage || ''}
                      onChange={e => setForm({ ...form, heroImage: e.target.value })}
                      placeholder="https://sua-imagem.com/foto.jpg"
                      className="w-full p-2.5 bg-white border border-pink-100 rounded-xl text-xs font-mono focus:border-[#FF3B7A] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <label className="px-4 py-2.5 bg-[#FF3B7A] hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{isUploadingHero ? 'Enviando Imagem...' : 'Upload de Nova Foto (Dispositivo)'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleHeroImageUpload}
                        disabled={isUploadingHero}
                      />
                    </label>

                    {(!form.heroImage || form.heroImage === '') && (
                      <button
                        type="button"
                        onClick={handleRestoreDefaultHeroImage}
                        className="px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                        <span>Restaurar Padrão</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Analytics & Pixels */}
          <div className="space-y-4">
            <h4 className="text-sm font-brand font-bold text-[#FF3B7A] border-b pb-1">3. Integrações de Analytics & Pixel</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Google Analytics (GA4 ID)</label>
                <input
                  type="text"
                  value={form.googleAnalyticsId || ''}
                  onChange={e => setForm({ ...form, googleAnalyticsId: e.target.value })}
                  placeholder="G-XXXXXXX"
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Meta Pixel ID (Facebook)</label>
                <input
                  type="text"
                  value={form.metaPixelId || ''}
                  onChange={e => setForm({ ...form, metaPixelId: e.target.value })}
                  placeholder="1234567890"
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Google Tag Manager ID</label>
                <input
                  type="text"
                  value={form.gtmId || ''}
                  onChange={e => setForm({ ...form, gtmId: e.target.value })}
                  placeholder="GTM-XXXXXXX"
                  className="w-full p-3 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#FF3B7A] text-white font-extrabold text-sm rounded-2xl hover:bg-pink-600 shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Salvar Todas as Configurações da Loja</span>
          </button>

        </form>
      </div>

    </div>
  );
};
