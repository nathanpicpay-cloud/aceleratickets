import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { Event, EventCategory, TicketType } from '../types';
import { Button } from '../components/Button';

// Mock Data
const events: Event[] = [
  {
    id: '1',
    title: 'Startup Summit 2024',
    description: 'Participe da maior conferência de startups da América Latina.',
    location: 'São Paulo, SP',
    date: '2024-11-15',
    time: '09:00',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    organizer: 'Tech Ventures',
    category: EventCategory.BUSINESS,
    batches: [{ id: 'b1', name: 'Lote Antecipado', price: 150, quantity: 100, sold: 50, type: TicketType.PAID }]
  },
  {
    id: '2',
    title: 'React Universe Conf',
    description: 'Mergulhe fundo no ecossistema React e novidades do futuro.',
    location: 'Remoto / Online',
    date: '2024-12-01',
    time: '14:00',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    organizer: 'JS Community',
    category: EventCategory.TECH,
    batches: [{ id: 'b2', name: 'Entrada Geral', price: 0, quantity: 500, sold: 300, type: TicketType.FREE }]
  },
  {
    id: '3',
    title: 'Jazz no Parque',
    description: 'Uma noite de jazz suave, boa comida e vibrações incríveis.',
    location: 'Parque Ibirapuera, SP',
    date: '2024-10-20',
    time: '18:00',
    imageUrl: 'https://picsum.photos/800/400?random=3',
    organizer: 'Cultura da Cidade',
    category: EventCategory.MUSIC,
    batches: [{ id: 'b3', name: 'Área VIP', price: 80, quantity: 200, sold: 20, type: TicketType.PAID }]
  }
];

export const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Cinematic Background Image with heavy overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
            style={{ animationDuration: '20s' }}
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
            alt="Multidão"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-[#030712]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/50 to-[#030712]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-md mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
            <span className="text-xs font-bold text-primary-200 tracking-widest uppercase">Viva o momento</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Descubra o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-200 to-secondary-400 text-glow">Extraordinário</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 animate-fade-in-up font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Eventos curados para o público de vanguarda. Shows, workshops e experiências imersivas que definem o futuro.
          </p>
          
          <div className="mt-12 w-full max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-[0_0_50px_-10px_rgba(6,182,212,0.15)]">
              <div className="flex-grow flex items-center px-4 bg-black/20 rounded-xl border border-white/5 focus-within:bg-black/40 focus-within:border-primary-500/50 transition-all">
                <Search className="h-5 w-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Buscar eventos, artistas..." 
                  className="w-full p-4 bg-transparent focus:outline-none text-white placeholder-slate-600 font-medium"
                />
              </div>
              <div className="flex-shrink-0 flex items-center px-4 bg-black/20 rounded-xl border border-white/5 sm:w-48 focus-within:bg-black/40 focus-within:border-primary-500/50 transition-all mt-2 sm:mt-0">
                <MapPin className="h-5 w-5 text-slate-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Localização" 
                  className="w-full p-4 bg-transparent focus:outline-none text-white placeholder-slate-600 font-medium"
                />
              </div>
              <Button size="lg" className="w-full sm:w-auto mt-2 sm:mt-0 h-full min-h-[56px] rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Explorar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="relative z-10 -mt-8 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel rounded-full p-2 inline-flex gap-2 overflow-x-auto max-w-full no-scrollbar mx-auto left-0 right-0 justify-center backdrop-blur-xl">
                {['Todos', 'Música', 'Tecnologia', 'Negócios', 'Workshops', 'Esportes', 'Arte'].map((cat, i) => (
                    <button 
                        key={cat} 
                        className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                            i === 0 
                            ? 'bg-primary-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-primary-400/50' 
                            : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-10">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Em Alta</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            </div>
            <Link to="/search" className="text-primary-400 hover:text-primary-300 text-sm font-bold flex items-center gap-2 group uppercase tracking-wider">
                Ver Todos <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Link key={event.id} to={`/event/${event.id}`} className="group block h-full perspective-1000">
              <div 
                className="glass-card rounded-[2rem] overflow-hidden h-full flex flex-col relative group-hover:border-primary-500/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                    <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-90" />
                    <div className="absolute top-4 right-4 glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-primary-300 uppercase tracking-widest backdrop-blur-md border border-primary-500/20 shadow-lg">
                        {event.category}
                    </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow relative -mt-12 z-10">
                  <div className="bg-[#0f172a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl">
                      <p className="text-xs font-bold text-primary-400 mb-2 flex items-center gap-2 uppercase tracking-wider">
                          <Calendar className="h-3 w-3" />
                          {new Date(event.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} • {event.time}
                      </p>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors leading-tight mb-2">{event.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{event.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 px-2 flex items-center justify-between">
                     <div className="flex items-center text-slate-500 text-xs font-medium">
                        <MapPin className="h-3 w-3 mr-1.5" />
                        <span className="truncate max-w-[150px]">{event.location}</span>
                     </div>
                     <div className="flex items-center gap-3">
                         <span className="text-sm text-slate-500 line-through opacity-50"></span>
                         <span className="font-bold text-lg text-white group-hover:text-glow transition-all">
                            {event.batches[0].price === 0 ? 'Grátis' : `R$ ${event.batches[0].price}`}
                         </span>
                     </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};