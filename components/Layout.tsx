import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ticket, Menu, X, PlusCircle, Settings } from 'lucide-react';
import { Button } from './Button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary-500 selection:text-white font-sans">
      
      {/* Efeitos de Fundo (Ambient Light) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-900/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary-900/10 blur-[150px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-primary-600/5 blur-[100px] transform -translate-x-1/2"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary-500 blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-black p-2 rounded-xl border border-white/10 group-hover:border-primary-500/50 transition-colors">
                        <Ticket className="h-6 w-6 text-primary-400" />
                    </div>
                </div>
                <span className="font-bold text-2xl tracking-tighter text-white group-hover:text-glow transition-all duration-300">
                    Acelera<span className="text-primary-400">Tickets</span>
                </span>
              </Link>
              <div className="hidden sm:ml-12 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive('/') 
                    ? 'border-primary-500 text-white text-glow-sm' 
                    : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  Eventos
                </Link>
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive('/dashboard') 
                    ? 'border-primary-500 text-white text-glow-sm' 
                    : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  Painel
                </Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:gap-4">
               <Link to="/admin">
                  <button className={`p-2 rounded-lg transition-colors ${isActive('/admin') ? 'text-primary-400 bg-primary-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`} title="Admin Master">
                     <Settings className="h-5 w-5" />
                  </button>
               </Link>
               <Link to="/create-event">
                <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-300">
                   <PlusCircle className="h-4 w-4" />
                   Criar Evento
                </Button>
               </Link>
              <Button size="sm" variant="primary" className="shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">Entrar</Button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden glass-panel border-t border-white/10 animate-fade-in">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                    isActive('/') 
                    ? 'bg-primary-500/10 border-primary-500 text-primary-400' 
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Eventos
              </Link>
              <Link
                to="/dashboard"
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                    isActive('/dashboard') 
                    ? 'bg-primary-500/10 border-primary-500 text-primary-400' 
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Painel
              </Link>
              <Link
                to="/create-event"
                className="block pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-slate-400 hover:bg-white/5 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Criar Evento
              </Link>
               <Link
                to="/admin"
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                    isActive('/admin') 
                    ? 'bg-primary-500/10 border-primary-500 text-primary-400' 
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Master
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#02040a] relative z-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-8 md:order-2">
            <span className="text-slate-500 hover:text-primary-400 cursor-pointer transition-colors text-xs uppercase tracking-widest font-semibold">Termos</span>
            <span className="text-slate-500 hover:text-primary-400 cursor-pointer transition-colors text-xs uppercase tracking-widest font-semibold">Privacidade</span>
            <span className="text-slate-500 hover:text-primary-400 cursor-pointer transition-colors text-xs uppercase tracking-widest font-semibold">Ajuda</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-slate-600">
              &copy; 2024 Acelera Tickets. Projetado para o futuro.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};