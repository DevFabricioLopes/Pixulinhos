import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, HelpCircle } from 'lucide-react';
import { FAQ } from '../../../types';
import { cmsStore } from '../../../services/cmsStore';

interface FAQTabProps {
  faqs: FAQ[];
  onShowToast: (msg: string) => void;
}

export const FAQTab: React.FC<FAQTabProps> = ({ faqs, onShowToast }) => {
  const [editingFaq, setEditingFaq] = useState<Partial<FAQ> | null>(null);

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    if (editingFaq.id) {
      cmsStore.updateFaq(editingFaq as FAQ);
      onShowToast('Pergunta atualizada!');
    } else {
      const newFaq: FAQ = {
        id: 'faq-' + Date.now(),
        question: editingFaq.question || 'Nova Pergunta',
        answer: editingFaq.answer || 'Resposta para a pergunta...',
        category: editingFaq.category || 'Geral',
        order: faqs.length + 1,
        isActive: editingFaq.isActive ?? true
      };
      cmsStore.addFaq(newFaq);
      onShowToast('Nova pergunta adicionada ao FAQ!');
    }
    setEditingFaq(null);
  };

  const handleReorder = (index: number, direction: 'up' | 'down') => {
    const list = [...faqs];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const updated = list.map((f, i) => ({ ...f, order: i + 1 }));
    cmsStore.saveFaqs(updated);
    onShowToast('Ordem do FAQ reordenada!');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-brand font-bold text-[#231F40]">Módulo FAQ (Perguntas Frequentes)</h2>
          <p className="text-xs text-gray-500">Cadastre perguntas ilimitadas com categorias e ordenação</p>
        </div>

        <button
          onClick={() => setEditingFaq({
            question: '',
            answer: '',
            category: 'Produtos & Tecidos',
            isActive: true
          })}
          className="px-4 py-2.5 bg-[#FF3B7A] text-white text-xs font-extrabold rounded-2xl hover:bg-pink-600 shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Pergunta</span>
        </button>
      </div>

      {/* List of FAQs */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="p-4 bg-[#FFFDF9] border border-pink-100 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-[#7C4DFF] text-[11px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-extrabold">
                  {faq.category}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#231F40]">{faq.question}</h4>
              <p className="text-xs text-gray-600">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleReorder(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-lg text-gray-600"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleReorder(idx, 'down')}
                disabled={idx === faqs.length - 1}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 rounded-lg text-gray-600"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => setEditingFaq(faq)}
                className="p-1.5 bg-purple-50 text-[#7C4DFF] hover:bg-purple-100 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (confirm(`Excluir pergunta?`)) {
                    cmsStore.deleteFaq(faq.id);
                    onShowToast('Pergunta excluída!');
                  }
                }}
                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-brand font-bold text-[#231F40]">
              {editingFaq.id ? 'Editar Pergunta' : 'Nova Pergunta FAQ'}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs font-bold text-[#231F40]">
              <div>
                <label className="block mb-1">Categoria da Pergunta</label>
                <select
                  value={editingFaq.category || 'Produtos & Tecidos'}
                  onChange={e => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                >
                  <option value="Produtos & Tecidos">Produtos & Tecidos</option>
                  <option value="Entrega & Frete">Entrega & Frete</option>
                  <option value="Trocas & Devoluções">Trocas & Devoluções</option>
                  <option value="Pagamentos">Pagamentos</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Pergunta *</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={e => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="ex: Como funciona a garantia e primeira troca grátis?"
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A]"
                />
              </div>

              <div>
                <label className="block mb-1">Resposta Detalhada *</label>
                <textarea
                  required
                  value={editingFaq.answer || ''}
                  onChange={e => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full p-2.5 border border-pink-100 rounded-xl focus:border-[#FF3B7A] h-24"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF3B7A] text-white font-extrabold rounded-xl hover:bg-pink-600 shadow-md"
                >
                  Salvar Pergunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
