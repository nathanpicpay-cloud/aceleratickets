import React, { useState } from 'react';
import { 
  Server, 
  Database, 
  CreditCard, 
  Shield, 
  Activity, 
  Lock,
  Zap,
  Radio,
  EyeOff,
  Globe,
  Brain,
  CheckCircle,
  AlertCircle,
  Save,
  LayoutTemplate
} from 'lucide-react';
import { Button } from '../components/Button';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: 'infra' | 'security' | 'financial' | 'frontend' | 'ai';
}

export const AdminMaster: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState(98);
  const [activeTab, setActiveTab] = useState<'database' | 'payments' | 'security'>('database');
  
  // Mock States for Configuration
  const [dbConfig, setDbConfig] = useState({ url: '', type: 'postgres' });
  const [paymentConfig, setPaymentConfig] = useState({ provider: 'stripe', apiKey: '', webhook: '' });
  
  // Full Structural Checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Infraestrutura & Backend
    { id: 'inf-1', label: 'Conexão Banco de Dados (Postgres)', completed: false, category: 'infra' },
    { id: 'inf-2', label: 'Variáveis de Ambiente (.env)', completed: true, category: 'infra' },
    { id: 'inf-3', label: 'Storage Bucket (Imagens)', completed: false, category: 'infra' },
    { id: 'inf-4', label: 'Backup Automático Diário', completed: false, category: 'infra' },

    // Segurança (SecOps)
    { id: 'sec-1', label: 'Certificado SSL/TLS (HTTPS)', completed: true, category: 'security' },
    { id: 'sec-2', label: 'Firewall de Aplicação (WAF)', completed: false, category: 'security' },
    { id: 'sec-3', label: 'JWT Secret Rotation', completed: true, category: 'security' },
    { id: 'sec-4', label: 'Proteção contra DDOS', completed: true, category: 'security' },

    // Financeiro (FinTech)
    { id: 'fin-1', label: 'Gateway Provider Ativo', completed: false, category: 'financial' },
    { id: 'fin-2', label: 'Webhook Endpoint Validado', completed: false, category: 'financial' },
    { id: 'fin-3', label: 'Split de Pagamento Configurado', completed: false, category: 'financial' },
    { id: 'fin-4', label: 'Anti-fraude Ativado', completed: true, category: 'financial' },

    // Frontend & Experience
    { id: 'ux-1', label: 'SEO Metatags Globais', completed: true, category: 'frontend' },
    { id: 'ux-2', label: 'Analytics Tracking (Pixel)', completed: false, category: 'frontend' },
    { id: 'ux-3', label: 'Responsividade Mobile Check', completed: true, category: 'frontend' },
    { id: 'ux-4', label: 'Favicon & Assets Otimizados', completed: true, category: 'frontend' },

    // Inteligência Artificial
    { id: 'ai-1', label: 'Google Gemini API Key', completed: true, category: 'ai' },
    { id: 'ai-2', label: 'Prompt Safety Filters', completed: true, category: 'ai' },
    { id: 'ai-3', label: 'Limite de Tokens Configurado', completed: false, category: 'ai' },
  ]);

  // Derived Progress
  const progress = Math.round((checklist.filter(i => i.completed).length / checklist.length) * 100);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'infra': return <Server className="h-3 w-3 text-blue-400" />;
      case 'security': return <Shield className="h-3 w-3 text-red-400" />;
      case 'financial': return <CreditCard className="h-3 w-3 text-green-400" />;
      case 'frontend': return <LayoutTemplate className="h-3 w-3 text-pink-400" />;
      case 'ai': return <Brain className="h-3 w-3 text-purple-400" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'infra': return 'Infraestrutura Core';
      case 'security': return 'Segurança & Acesso';
      case 'financial': return 'Módulo Financeiro';
      case 'frontend': return 'UX & Client Side';
      case 'ai': return 'Motor de I.A.';
      default: return 'Geral';
    }
  };

  const handleSave = (section: string) => {
    // Simulate API Call & Update Checklist
    setTimeout(() => {
      setChecklist(prev => prev.map(item => {
        if (section === 'database' && item.id === 'inf-1') return { ...item, completed: true };
        if (section === 'payments' && item.id === 'fin-1') return { ...item, completed: true };
        return item;
      }));
    }, 800);
  };

  // Group items for rendering
  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const categoryOrder = ['infra', 'security', 'financial', 'ai', 'frontend'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                <Lock className="h-6 w-6 text-red-500 animate-pulse" />
             </div>
             <span className="text-xs font-bold text-red-500 uppercase tracking-widest border border-red-500/30 px-3 py-1 rounded-full bg-red-500/5 flex items-center gap-2">
                <EyeOff className="h-3 w-3" /> Secure Node Access
             </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Master Control <span className="text-slate-600">#ROOT</span></h1>
          <p className="text-slate-400 mt-2 font-light">Acesso restrito. Todas as ações são logadas.</p>
        </div>

        {/* System Health Widget */}
        <div className="glass-panel p-4 rounded-2xl flex items-center gap-6 border-l-4 border-l-green-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
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
           <div className="flex space-x-2 bg-white/5 p-1 rounded-xl w-fit backdrop-blur-md border border-white/5 overflow-x-auto max-w-full">
              {[
                { id: 'database', label: 'Infra', icon: Database },
                { id: 'payments', label: 'Gateway', icon: CreditCard },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'ai', label: 'Intelligence', icon: Brain },
              ].map(tab => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${
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
           <div className="glass-card rounded-3xl p-8 min-h-[500px] relative overflow-hidden border border-white/10 shadow-2xl">
              
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

              {activeTab === 'database' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                         <Database className="h-5 w-5 text-primary-400" /> Configuração de Dados
                      </h3>
                      <span className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20 font-bold uppercase flex items-center gap-1">
                         <AlertCircle className="h-3 w-3" /> Pending Restart
                      </span>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Banco</label>
                         <select className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none appearance-none cursor-pointer">
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
                           className="w-full bg-[#030712] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-mono text-sm shadow-inner" 
                         />
                         <Lock className="absolute right-4 top-3.5 h-4 w-4 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">As credenciais são criptografadas (AES-256) antes do armazenamento.</p>
                   </div>
                   
                   <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                      <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">Replicação Regional</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">A replicação automática para regiões de failover está desativada. Ative para garantir alta disponibilidade (HA).</p>
                      </div>
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
                         <div key={provider} className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${paymentConfig.provider.toLowerCase() === provider.toLowerCase() ? 'bg-primary-500/10 border-primary-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/5'}`} onClick={() => setPaymentConfig({...paymentConfig, provider})}>
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
                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-mono text-sm shadow-inner" 
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Webhook Secret</label>
                      <input 
                        type="password" 
                        placeholder="whsec_..."
                        className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none font-mono text-sm shadow-inner" 
                      />
                   </div>

                   <div className="pt-4 border-t border-white/5 flex justify-end">
                      <Button onClick={() => handleSave('payments')} className="shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                         <Save className="h-4 w-4 mr-2" /> Atualizar Gateway
                      </Button>
                   </div>
                </div>
              )}
              
               {(activeTab === 'security' || activeTab === 'ai') && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col items-center justify-center h-80 text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center border border-white/5 relative">
                            {activeTab === 'security' ? <Shield className="h-10 w-10 text-slate-500" /> : <Brain className="h-10 w-10 text-purple-500" />}
                            <div className="absolute inset-0 rounded-full bg-slate-500/10 blur-xl"></div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{activeTab === 'security' ? 'Security Hub' : 'AI Engine Core'}</h3>
                            <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                                {activeTab === 'security' 
                                    ? 'Logs de auditoria, rotação de chaves e firewall WAF estão ativos e monitorando anomalias.' 
                                    : 'Integração com Gemini 2.5 Flash ativa. Ajuste a temperatura e os tokens de saída nas configurações avançadas.'}
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                            Ver Logs Detalhados
                        </Button>
                    </div>
                </div>
              )}

           </div>
        </div>

        {/* Sidebar: Checklist & Launch Status */}
        <div className="lg:col-span-1 space-y-6">
           
           {/* Readiness Card */}
           <div className="glass-panel p-6 rounded-3xl relative overflow-hidden border-t border-white/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
              <h3 className="text-lg font-bold text-white mb-2">Launch Readiness</h3>
              <p className="text-xs text-slate-400 mb-4">Complete as etapas estruturais para liberar o deploy.</p>
              
              <div className="mb-2 flex justify-between items-end">
                 <span className="text-4xl font-black text-white">{progress}%</span>
                 <span className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-1.5">System Go</span>
              </div>
              
              <div className="w-full bg-slate-800/50 rounded-full h-2 mb-6 overflow-hidden">
                 <div 
                    className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${progress}%` }}
                 >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]"></div>
                 </div>
              </div>

              {progress === 100 ? (
                  <Button className="w-full bg-green-600 hover:bg-green-500 border-none shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse font-bold tracking-wide">
                     <Zap className="h-4 w-4 mr-2" /> INICIAR DEPLOY
                  </Button>
              ) : (
                  <Button disabled variant="secondary" className="w-full opacity-50 cursor-not-allowed border border-white/5">
                     Aguardando Configuração
                  </Button>
              )}
           </div>

           {/* Interactive Structural Checklist */}
           <div className="glass-card rounded-3xl border border-white/5 flex flex-col max-h-[600px] shadow-2xl">
              <div className="p-6 border-b border-white/5 bg-black/20">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary-400" /> Checklist Estrutural
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">Status global dos setores operacionais</p>
              </div>
              
              <div className="overflow-y-auto custom-scrollbar p-4 space-y-6">
                 {categoryOrder.map((catKey) => {
                     const items = groupedChecklist[catKey];
                     if (!items) return null;

                     return (
                        <div key={catKey} className="space-y-2">
                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 pl-2 mb-2 flex items-center gap-2">
                              {getCategoryIcon(catKey)}
                              {getCategoryLabel(catKey)}
                           </h4>
                           <div className="space-y-1">
                                {items.map(item => (
                                    <div key={item.id} className="group flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/10 transition-all cursor-default">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                                                item.completed 
                                                ? 'bg-green-500 border-green-500 text-black shadow-[0_0_8px_rgba(34,197,94,0.3)]' 
                                                : 'border-slate-600 bg-transparent'
                                            }`}>
                                                {item.completed && <CheckCircle className="h-3 w-3" />}
                                            </div>
                                            <span className={`text-xs font-medium transition-colors ${item.completed ? 'text-slate-300' : 'text-slate-400 group-hover:text-white'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        {!item.completed && (
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                        )}
                                    </div>
                                ))}
                           </div>
                        </div>
                     );
                 })}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};