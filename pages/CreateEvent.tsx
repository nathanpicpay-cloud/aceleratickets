import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Image as ImageIcon, MapPin, Calendar, Clock, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { generateEventDescription } from '../services/geminiService';
import { EventCategory } from '../types';

export const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: EventCategory.TECH,
    date: '',
    time: '',
    location: '',
    keyDetails: '',
    description: '',
    imageUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = useCallback(async () => {
    if (!formData.title || !formData.keyDetails) {
      alert("Por favor, forneça um título e alguns detalhes primeiro.");
      return;
    }

    setLoadingAI(true);
    try {
      const description = await generateEventDescription(formData.title, formData.category, formData.keyDetails);
      setFormData(prev => ({ ...prev, description }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  }, [formData.title, formData.category, formData.keyDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting event:", formData);
    // Simulate API call
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">Criar Novo Evento</h1>
        <p className="text-slate-400 text-lg">Lance sua experiência em minutos com nossa <span className="text-primary-400 font-bold text-glow-sm">Assistente de IA</span>.</p>
        
        {/* Progress Steps */}
        <div className="mt-12 flex justify-center items-center space-x-6">
            <div className={`h-1.5 flex-1 max-w-[100px] rounded-full transition-all duration-700 ${step >= 1 ? 'bg-gradient-to-r from-primary-600 to-primary-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'bg-slate-800'}`}></div>
            <div className={`h-1.5 flex-1 max-w-[100px] rounded-full transition-all duration-700 ${step >= 2 ? 'bg-gradient-to-r from-primary-600 to-primary-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'bg-slate-800'}`}></div>
            <div className={`h-1.5 flex-1 max-w-[100px] rounded-full transition-all duration-700 ${step >= 3 ? 'bg-gradient-to-r from-primary-600 to-primary-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'bg-slate-800'}`}></div>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] p-1 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <form onSubmit={handleSubmit} className="bg-[#0b1121]/50 rounded-[2.2rem] p-8 md:p-12 space-y-8 backdrop-blur-sm relative z-10">
          
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">1</div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Informações Básicas</h2>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Título do Evento</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Summit de Inovação 2024"
                  className="block w-full rounded-2xl bg-[#030712] border border-white/10 text-white shadow-inner focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 transition-all placeholder-slate-700 font-medium text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Categoria</label>
                    <div className="relative">
                        <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="block w-full rounded-2xl bg-[#030712] border border-white/10 text-white shadow-inner focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 appearance-none transition-all font-medium cursor-pointer"
                        >
                        {Object.values(EventCategory).map(cat => (
                            <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                        ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                           <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Localização</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="block w-full pl-12 rounded-2xl bg-[#030712] border border-white/10 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 transition-all placeholder-slate-700 font-medium"
                        placeholder="Expo Center, SP"
                        />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Data</label>
                   <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="block w-full pl-12 rounded-2xl bg-[#030712] border border-white/10 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 transition-all [color-scheme:dark] font-medium cursor-pointer"
                        />
                    </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Horário</label>
                   <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="block w-full pl-12 rounded-2xl bg-[#030712] border border-white/10 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 transition-all [color-scheme:dark] font-medium cursor-pointer"
                        />
                    </div>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <Button type="button" onClick={() => setStep(2)} className="shadow-[0_0_20px_rgba(6,182,212,0.3)]">Próximo Passo <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
               <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">2</div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Detalhes & Magia IA</h2>
                </div>
                <div className="bg-gradient-to-r from-primary-900/40 to-secondary-900/40 px-5 py-2 rounded-full border border-primary-500/30 flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.2)] backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" />
                    <span className="text-xs font-bold text-primary-200 uppercase tracking-widest">IA Powered</span>
                </div>
               </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Destaques / Prompt</label>
                <p className="text-xs text-slate-500 mb-3 font-medium">Alimente a IA com pontos-chave brutos. Ela cuidará da narrativa.</p>
                <textarea
                  name="keyDetails"
                  value={formData.keyDetails}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-2xl bg-[#030712] border border-white/10 text-white shadow-inner focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 transition-all placeholder-slate-700"
                  placeholder="- Palestrante: João Silva&#10;- Tópico: Futuro da IA&#10;- Café grátis e networking"
                />
              </div>

              <div className="relative group">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Descrição Completa</label>
                <div className="absolute top-0 right-0 z-10">
                    <button
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={loadingAI}
                        className="text-xs flex items-center text-primary-400 hover:text-primary-300 font-bold uppercase tracking-widest disabled:opacity-50 transition-colors bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20 hover:bg-primary-500/20"
                    >
                        {loadingAI ? 'Gerando...' : 'Gerar Auto'}
                        {!loadingAI && <Sparkles className="ml-1.5 h-3 w-3" />}
                    </button>
                </div>
                <div className="relative">
                    <div className={`absolute -inset-[1px] bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-1000 ${loadingAI ? 'opacity-70 animate-pulse' : ''}`}></div>
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={8}
                    className="relative block w-full rounded-2xl bg-[#030712] border border-white/10 text-white shadow-inner focus:border-primary-500 focus:ring-1 focus:ring-primary-500 p-5 transition-all placeholder-slate-700 leading-relaxed"
                    placeholder="A IA preencherá isso para você..."
                    />
                </div>
              </div>

              <div className="pt-8 flex justify-between">
                <Button type="button" variant="ghost" onClick={() => setStep(1)}>Voltar</Button>
                <Button type="button" onClick={() => setStep(3)} className="shadow-[0_0_20px_rgba(6,182,212,0.3)]">Próximo Passo <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </div>
          )}

        {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">3</div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Mídia & Revisão</h2>
              </div>
              
              <div className="border-2 border-dashed border-white/10 rounded-3xl p-16 text-center hover:border-primary-500/50 hover:bg-primary-500/5 transition-all cursor-pointer group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-20 h-20 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-primary-500/20 group-hover:text-primary-400 text-slate-500 border border-white/5 group-hover:border-primary-500/30 shadow-lg">
                    <ImageIcon className="h-8 w-8" />
                 </div>
                 <p className="mt-2 text-base font-bold text-white relative z-10">Clique para enviar imagem de capa</p>
                 <p className="text-xs text-slate-500 mt-2 relative z-10 font-medium">SVG, PNG, JPG ou GIF (max. 800x400px)</p>
                 <input type="file" className="hidden" />
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
                  <h3 className="text-sm font-bold text-primary-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" /> Resumo
                  </h3>
                  <div className="text-sm text-slate-300 space-y-4">
                      <p className="flex justify-between border-b border-white/5 pb-3"><span className="text-slate-500">Nome do Evento</span> <span className="font-bold text-white text-base">{formData.title}</span></p>
                      <p className="flex justify-between border-b border-white/5 pb-3"><span className="text-slate-500">Quando</span> <span className="font-bold text-white text-base">{formData.date} às {formData.time}</span></p>
                      <p className="flex justify-between border-b border-white/5 pb-3"><span className="text-slate-500">Onde</span> <span className="font-bold text-white text-base">{formData.location}</span></p>
                  </div>
              </div>

              <div className="pt-8 flex justify-between">
                <Button type="button" variant="ghost" onClick={() => setStep(2)}>Voltar</Button>
                <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-[0_0_25px_rgba(22,163,74,0.4)] border-none text-white px-8">Publicar Evento</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};