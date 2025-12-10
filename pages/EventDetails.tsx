import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Share2, ShieldCheck, CreditCard, Smartphone, X } from 'lucide-react';
import { Button } from '../components/Button';
import { TicketType } from '../types';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  // Mock data for the specific event
  const event = {
    title: 'Startup Summit 2024',
    description: 'Junte-se à maior conferência de startups da América Latina. Conecte-se com investidores, fundadores e líderes da indústria. Teremos mais de 50 palestrantes discutindo IA, SaaS, Fintech e muito mais. Food trucks e happy hour de networking incluídos.',
    location: 'Expo Center Norte, São Paulo',
    date: 'Sexta, 15 Nov, 2024',
    time: '09:00 - 20:00',
    price: 150,
    organizer: 'Tech Ventures',
    image: 'https://picsum.photos/1200/500?random=1'
  };

  const totalPrice = event.price * ticketCount;

  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      {/* Immersive Hero Image */}
      <div className="h-[70vh] w-full relative overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover animate-pulse-slow" style={{ animationDuration: '30s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="inline-block glass-panel text-primary-300 text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest backdrop-blur-xl border border-primary-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                Negócios & Tech
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tighter text-glow max-w-4xl">{event.title}</h1>
            <p className="text-slate-300 text-lg flex items-center gap-2 font-light">
                Apresentado por <span className="text-white font-bold border-b-2 border-primary-500 pb-0.5">{event.organizer}</span>
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-10 mb-10 gap-8">
                    <div className="flex items-center gap-5">
                        <div className="bg-primary-500/10 p-4 rounded-2xl text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                            <Calendar className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1.5">Data</p>
                            <p className="font-bold text-white text-xl">{event.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-primary-500/10 p-4 rounded-2xl text-primary-400 border border-primary-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                            <Clock className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1.5">Horário</p>
                            <p className="font-bold text-white text-xl">{event.time}</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Sobre este evento</h2>
                <div className="prose prose-invert prose-lg text-slate-300 leading-relaxed font-light">
                    <p>{event.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <h2 className="text-3xl font-bold text-white mt-16 mb-8 tracking-tight">Localização</h2>
                <div className="flex items-start gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-primary-500 mt-1" />
                    <p className="text-slate-200 text-xl font-medium">{event.location}</p>
                </div>
                {/* Mock Map */}
                <div className="w-full h-80 bg-slate-800/50 rounded-3xl border border-white/5 flex items-center justify-center text-slate-500 text-sm relative overflow-hidden group cursor-pointer shadow-inner">
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-46.6333,-23.5505,12,0/800x400?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity grayscale hover:grayscale-0 duration-500"></div>
                    <span className="relative z-10 glass-panel px-6 py-3 rounded-full font-bold text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md hover:scale-105 transition-transform">Ver Mapa Interativo</span>
                </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card rounded-[2rem] p-8 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-white tracking-tight">Ingressos</h3>
                    <div className="text-slate-400 cursor-pointer hover:text-white transition-colors bg-white/5 p-2.5 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <Share2 className="h-5 w-5" />
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="border border-primary-500/50 bg-gradient-to-br from-primary-900/20 to-secondary-900/20 rounded-2xl p-6 relative overflow-hidden group transition-all hover:bg-primary-900/30 hover:border-primary-500/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                        <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg uppercase tracking-wider">Vendendo Rápido</div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-white text-lg">Lote Antecipado</span>
                            <span className="font-black text-2xl text-primary-400 text-glow-sm">R$ {event.price}</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-6 font-medium">Acesso total a todas as áreas + coffee break.</p>
                        
                        <div className="flex items-center justify-between bg-black/40 rounded-xl p-1.5 w-full max-w-[140px] border border-white/10 ml-auto">
                            <button 
                                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold text-lg"
                            >-</button>
                            <span className="font-bold text-white">{ticketCount}</span>
                            <button 
                                onClick={() => setTicketCount(ticketCount + 1)}
                                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-bold text-lg"
                            >+</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 py-6 mb-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 font-medium">Total</span>
                        <span className="text-4xl font-black text-white tracking-tighter text-glow-sm">R$ {totalPrice}</span>
                    </div>
                    <p className="text-xs text-slate-500 text-right">Taxas incluídas</p>
                </div>

                <Button className="w-full text-lg py-5 shadow-[0_0_25px_rgba(6,182,212,0.3)] font-bold rounded-2xl" onClick={() => setIsCheckoutOpen(true)}>
                    Comprar Agora
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    Protegido por Blockchain
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-[#030712]/90 backdrop-blur-md transition-opacity" aria-hidden="true" onClick={() => setIsCheckoutOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom glass-panel rounded-3xl text-left overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-white/10 relative">
              <div className="px-6 pt-8 pb-6 sm:p-8 relative">
                <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                    <X className="h-5 w-5" />
                </button>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-3xl leading-6 font-black text-white mb-8 tracking-tight" id="modal-title">Pagamento</h3>
                    
                    <div className="bg-gradient-to-r from-white/5 to-transparent p-6 rounded-2xl mb-8 border-l-4 border-primary-500">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold text-white uppercase tracking-wide">{event.title}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-slate-400">{ticketCount}x Lote Antecipado</span>
                            <span className="text-lg font-bold text-primary-400">R$ {totalPrice}</span>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Dados Pessoais</label>
                            <input type="text" className="mb-4 block w-full bg-[#030712] border border-white/10 rounded-xl shadow-inner focus:ring-primary-500 focus:border-primary-500 text-white p-4 placeholder-slate-700 transition-all font-medium" placeholder="Nome Completo" />
                            <input type="email" className="block w-full bg-[#030712] border border-white/10 rounded-xl shadow-inner focus:ring-primary-500 focus:border-primary-500 text-white p-4 placeholder-slate-700 transition-all font-medium" placeholder="Endereço de E-mail" />
                        </div>

                        <div className="pt-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Método de Pagamento</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-2 border-primary-500 bg-primary-900/20 p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.2)] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Smartphone className="h-7 w-7 text-primary-400 mb-2 relative z-10" />
                                    <span className="text-sm font-bold text-white relative z-10">PIX</span>
                                </div>
                                <div className="border border-white/10 bg-white/5 hover:bg-white/10 p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all opacity-60 hover:opacity-100">
                                    <CreditCard className="h-7 w-7 text-slate-300 mb-2" />
                                    <span className="text-sm font-bold text-slate-300">Cartão</span>
                                </div>
                            </div>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 px-6 py-6 sm:px-8 sm:flex sm:flex-row-reverse border-t border-white/5 backdrop-blur-md">
                <Button className="w-full sm:w-auto sm:ml-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)] border-none text-base py-3 px-8" onClick={() => alert("Pagamento simulado com sucesso!")}>
                  Pagar R$ {totalPrice}
                </Button>
                <Button variant="ghost" className="w-full sm:w-auto mt-3 sm:mt-0 text-slate-400 hover:text-white" onClick={() => setIsCheckoutOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};