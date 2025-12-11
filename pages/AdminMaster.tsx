import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  CreditCard, 
  Shield, 
  Cpu, 
  CheckCircle, 
  AlertCircle, 
  Save, 
  Activity, 
  Lock,
  Zap,
  Radio
} from 'lucide-react';
import { Button } from '../components/Button';

interface SystemModule {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  icon: React.ElementType;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: 'core' | 'payments' | 'security';
}

export const AdminMaster: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState(98);
  const [activeTab, setActiveTab] = useState<'database' | 'payments' | 'security'>('database');
  
  // Mock States for Configuration
  const [dbConfig, setDbConfig] = useState({ url: '', type: 'postgres' });
  const [paymentConfig, setPaymentConfig] = useState({ provider: 'stripe', apiKey: '', webhook: '' });
  
  // Checklist State
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'Conexão com Banco de Dados', completed: false, category: 'core' },
    { id: '2', label: 'Variáveis de Ambiente (ENV)', completed: true, category: 'core' },
    { id: '3', label: 'Gateway de Pagamento Ativo', completed: false, category: 'payments' },
    { id: '4', label: 'Certificado SSL Validado', completed: true, category: 'security' },
    { id: '5', label: 'Firewall de Aplicação (WAF)', completed: false, category: 'security' },
    { id: '6', label: 'Integração IA (Gemini)', completed: true, category: 'core' },
  ]);

  // Derived Progress
  const progress = Math.round((checklist.filter(i => i.completed).length / checklist.length) * 100);

  // Mock Save Functionality
  const handleSave = (section: string) => {
    // Simulate API Call & Update Checklist
    setTimeout(() => {
      setChecklist(prev => prev.map(item => {
        if (section === 'database' && item.id === '1') return { ...item, completed: true };
        if (section === 'payments' && item.id === '3') return { ...item, completed: true };
        return item;
      }));
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="bg-primary-500/10 p-2 rounded-lg border border-primary-500/20">
                <Cpu className="h-6 w-6 text-primary-400 animate-pulse" />
             </div>
             <span className="text-xs font-bold text-primary-500 uppercase tracking-widest border border-primary-500/30 px-3 py-1 rounded-full bg-primary-500/5">
                System Core v1.2
             </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Admin Master Control</h1>
          <p className="text-slate-400 mt-2 font-light">Gerencie integrações críticas e monitore a saúde da infraestrutura.</p>
        </div>

        {/* System Health Widget */}
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-6 border-l-4 border-l-green-500">
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">System Health</p>
              <div className="flex items-end gap-2">
                 <span className="text-3xl font-black text-white">{systemHealth}%</span>
                 <span className="text-green-400 text-xs font-bold mb-1.5 flex items-center gap-1">
                    <Activity className="h-3 w-3" /> Stable
                 </span>
              </div>
           </div>
           <div className="h-10 w-[1px] bg-white/10"></div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Uptime</p>
              <p className="text-xl font-bold text-white">99.9%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Navigation Tabs */}
           <div className="flex space-x-2 bg-white/5 p-1 rounded-xl w-fit backdrop-blur-md border border-white/5">
              {[
                { id: 'database', label: 'Banco de Dados', icon: Database },
                { id: 'payments', label: 'Pagamentos', icon: CreditCard },
                { id: 'security', label: 'Segurança', icon: Shield },
              ].map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                       activeTab === tab.id 
                       ? 'bg-primary-600 text-white shadow-lg' 
                       : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                 >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                 </button>
              ))}
           </div>

           {/* Dynamic Content Area */}
           <div className="glass-card rounded-3xl p-8 min-h-[400px] relative overflow-hidden border border-white/10">
              
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              {activeTab === 'database' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                         <Database className="h-5 w-5 text-primary-400" /> Configuração de Dados
                      </h3>
                      <span className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20 font-bold uppercase">
                         Pending Restart
                      </span>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Banco</label>
                         <select className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none appearance-none">
                            <option value="postgres">PostgreSQL (Recomendado)</option>
                            <option value="mysql">MySQL</option>
                            <option value="mongo">MongoDB</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pool Size</label>
                         <input type="number" defaultValue={20} className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connection String</label>
                      <div className="relative">
                         <input 
                           type="password" 
                           value={dbConfig.url}
                           onChange={(e) => setDbConfig({...dbConfig, url: e.target.value})}
                           placeholder="postgres://user:pass@host:5432/db_name"
                           className="w-full bg-[#030712] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-mono text-sm" 
                         />
                         <Lock className="absolute right-4 top-3.5 h-4 w-4 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">As credenciais são criptografadas antes do armazenamento.</p>
                   </div>

                   <div className="pt-4 border-t border-white/5 flex justify-end">
                      <Button onClick={() => handleSave('database')} className="shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                         <Save className="h-4 w-4 mr-2" /> Salvar Conexão
                      </Button>
                   </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                         <CreditCard className="h-5 w-5 text-secondary-400" /> Gateway de Pagamento
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold uppercase">Modo de Teste</span>
                        <div className="w-10 h-5 bg-primary-600 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-4">
                      {['Stripe', 'MercadoPago', 'Pagar.me'].map(provider => (
                         <div key={provider} className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${paymentConfig.provider.toLowerCase() === provider.toLowerCase() ? 'bg-primary-500/10 border-primary-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/30'}`} onClick={() => setPaymentConfig({...paymentConfig, provider})}>
                            <Radio className={`h-5 w-5 ${paymentConfig.provider.toLowerCase() === provider.toLowerCase() ? 'text-primary-400' : 'text-slate-600'}`} />
                            <span className="font-bold text-sm">{provider}</span>
                         </div>
                      ))}
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">API Key (Production)</label>
                      <input 
                        type="password" 
                        placeholder="sk_live_..."
                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-mono text-sm" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Webhook Secret</label>
                      <input 
                        type="password" 
                        placeholder="whsec_..."
                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-mono text-sm" 
                      />
                   </div>

                   <div className="pt-4 border-t border-white/5 flex justify-end">
                      <Button onClick={() => handleSave('payments')} className="shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                         <Save className="h-4 w-4 mr-2" /> Atualizar Gateway
                      </Button>
                   </div>
                </div>
              )}
              
               {activeTab === 'security' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                            <Shield className="h-8 w-8 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Módulo de Segurança</h3>
                        <p className="text-slate-400 max-w-sm">Configurações avançadas de firewall e permissões estarão disponíveis na versão 2.0 do Core.</p>
                        <Button variant="outline" size="sm">Ver Logs de Acesso</Button>
                    </div>
                </div>
              )}

           </div>
        </div>

        {/* Sidebar: Checklist & Launch Status */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Readiness Card */}
           <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
              <h3 className="text-lg font-bold text-white mb-2">Launch Readiness</h3>
              <p className="text-xs text-slate-400 mb-4">Complete as etapas para liberar o deploy em produção.</p>
              
              <div className="mb-2 flex justify-between items-end">
                 <span className="text-4xl font-black text-white">{progress}%</span>
                 <span className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-1.5">System Go</span>
              </div>
              
              <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
                 <div 
                    className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                 >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                 </div>
              </div>

              {progress === 100 ? (
                  <Button className="w-full bg-green-600 hover:bg-green-500 border-none shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse">
                     <Zap className="h-4 w-4 mr-2" /> INICIAR DEPLOY
                  </Button>
              ) : (
                  <Button disabled variant="secondary" className="w-full opacity-50 cursor-not-allowed">
                     Aguardando Configuração
                  </Button>
              )}
           </div>

           {/* Interactive Checklist */}
           <div className="glass-card rounded-3xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Server className="h-4 w-4" /> Checklist Obrigatório
              </h3>
              
              <div className="space-y-3">
                 {checklist.map((item) => (
                    <div key={item.id} className="group flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                       <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                             item.completed 
                             ? 'bg-green-500 border-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                             : 'border-slate-600 bg-transparent'
                          }`}>
                             {item.completed && <CheckCircle className="h-3.5 w-3.5" />}
                          </div>
                          <span className={`text-sm font-medium transition-colors ${item.completed ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                             {item.label}
                          </span>
                       </div>
                       {!item.completed && (
                          <AlertCircle className="h-4 w-4 text-yellow-500/50 animate-pulse" />
                       )}
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};