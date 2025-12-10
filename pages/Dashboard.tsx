import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { SalesMetric, ChartData } from '../types';

const mockMetrics: SalesMetric[] = [
  { name: 'Receita Total', value: 124500, change: 12.5, isPositive: true },
  { name: 'Ingressos Vendidos', value: 1240, change: 8.2, isPositive: true },
  { name: 'Eventos Ativos', value: 4, change: 0, isPositive: true },
  { name: 'Conversão', value: 3.2, change: -1.1, isPositive: false },
];

const mockChartData: ChartData[] = [
  { name: 'Seg', revenue: 4000, tickets: 240 },
  { name: 'Ter', revenue: 3000, tickets: 139 },
  { name: 'Qua', revenue: 2000, tickets: 98 },
  { name: 'Qui', revenue: 2780, tickets: 308 },
  { name: 'Sex', revenue: 1890, tickets: 480 },
  { name: 'Sab', revenue: 2390, tickets: 380 },
  { name: 'Dom', revenue: 3490, tickets: 430 },
];

const StatCard: React.FC<{ metric: SalesMetric; icon: React.ReactNode }> = ({ metric, icon }) => (
  <div className="glass-card rounded-2xl p-6 group hover:border-primary-500/30 transition-all duration-300 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary-500/20 transition-all"></div>
    <div className="flex items-center justify-between relative z-10">
      <div className="flex-shrink-0 bg-white/5 p-3 rounded-xl text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
        {icon}
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border ${metric.isPositive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
        {metric.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {Math.abs(metric.change)}%
      </div>
    </div>
    <div className="mt-4 relative z-10">
      <dt className="text-sm font-medium text-slate-400 truncate tracking-wide">{metric.name}</dt>
      <dd>
        <div className="text-3xl font-bold text-white mt-1 group-hover:text-glow transition-all tracking-tight">
          {metric.name.includes('Receita') ? `R$ ${metric.value.toLocaleString('pt-BR')}` : metric.value}
        </div>
      </dd>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Painel de Controle</h1>
            <p className="mt-1 text-sm text-slate-400">Visão geral em tempo real do seu império.</p>
        </div>
        <div className="flex gap-3">
            <button className="glass-panel px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" /> Exportar
            </button>
            <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all border border-white/10">
                Nova Campanha
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard metric={mockMetrics[0]} icon={<DollarSign className="h-6 w-6" />} />
        <StatCard metric={mockMetrics[1]} icon={<TicketIcon className="h-6 w-6" />} />
        <StatCard metric={mockMetrics[2]} icon={<Calendar className="h-6 w-6" />} />
        <StatCard metric={mockMetrics[3]} icon={<TrendingUp className="h-6 w-6" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                Visão de Receita
            </h2>
            <select className="text-sm bg-black/30 border border-white/10 rounded-lg text-slate-300 focus:ring-primary-500 focus:border-primary-500 p-2 outline-none cursor-pointer hover:bg-black/50 transition-colors">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockChartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} tickFormatter={(value) => `R$${value}`} />
                <Tooltip 
                    contentStyle={{ borderRadius: '16px', background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#22d3ee', fontWeight: 600 }}
                    cursor={{ stroke: 'rgba(34, 211, 238, 0.5)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" style={{ filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-500 to-primary-500"></div>
          <h2 className="text-lg font-bold text-white mb-6">Vendas Recentes</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-white/5">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="py-4 hover:bg-white/5 px-2 rounded-xl transition-colors -mx-2 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30 group-hover:border-green-500/60 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
                         <span className="text-green-400 font-bold text-xs">PS</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white group-hover:text-primary-300 transition-colors">Compra de Ingresso</p>
                      <p className="truncate text-xs text-slate-500">Tech Conference 2024</p>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-bold text-green-400 ring-1 ring-inset ring-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        +R$ 150
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
                <button className="w-full py-3 rounded-xl border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white hover:border-primary-500/30 transition-all uppercase tracking-wide">
                    Ver Histórico Completo
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component wrapper
const TicketIcon: React.FC<any> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="M13 5v2"/>
    <path d="M13 17v2"/>
    <path d="M13 11v2"/>
  </svg>
);