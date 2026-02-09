"use client";

import { Header } from "@/components/Header";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    LabelList,
} from "recharts";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";

// Mock Data
const qualityData = [
    { name: "01", dec: 2000, jan: 3000 },
    { name: "05", dec: 2500, jan: 3500 },
    { name: "10", dec: 2200, jan: 3200 },
    { name: "15", dec: 2800, jan: 4200 },
    { name: "20", dec: 2400, jan: 3800 },
    { name: "25", dec: 3000, jan: 4500 },
    { name: "30", dec: 2800, jan: 4000 },
];

const gradeDistribution = [
    { name: "1", value: 842 },
    { name: "2", value: 310 },
    { name: "3", value: 1257 },
    { name: "4", value: 3200 },
    { name: "5", value: 5145 },
];

const positiveHighlights = [
    { name: "Auto de Lançamento e Imposição de Multa", score: 4.8 },
    { name: "Análise de Obrigações Socioeconômicas", score: 4.8 },
    { name: "Auto de Cientificação (Prorrogação de Prazo)", score: 4.8 },
    { name: "Atestado de Inexistência (Diferimento ICMS)", score: 4.7 },
    { name: "Auto de Lançamento e Multa (Mod. 1)", score: 4.6 },
];

const attentionPoints = [
    { name: "Autorização Inclusão de Franqueadora", score: 2.4 },
    { name: "Autorização Diferimento ICMS Milho e Soja", score: 2.8 },
    { name: "Autorizacao Controle Empresas Interdependentes", score: 3.0 },
    { name: "Autorização Armazenagem Álcool/Açúcar", score: 3.1 },
    { name: "Autorização Concessão/Renovação Diferimento", score: 3.3 },
];

const csatGaugeData = [
    { value: 85, color: "#4B5563" },
    { value: 15, color: "#E5E7EB" },
];

export default function AvaliacaoPage() {
    const [timeRange, setTimeRange] = useState<'7' | '15' | '30'>('7');

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#080B14] transition-colors duration-300 overflow-hidden">
            <Header />

            <div className="flex-1 p-6 flex gap-4 overflow-hidden min-h-0 bg-slate-50 dark:bg-[#080B14]">
                {/* LEFT COLUMN: METRICS + RANKINGS */}
                <div className="flex-1 flex flex-col gap-4 min-h-0">
                    {/* Top Metrics Row */}
                    <div className="grid grid-cols-2 gap-4 flex-shrink-0">
                        <SimpleMetricCard
                            title="Total Avaliações"
                            value="10.405"
                            trend="+5%"
                            trendUp={true}
                            className="h-[120px]"
                        />
                        <SimpleMetricCard
                            title="Sem Avaliação"
                            value="52%"
                            trend="-10%"
                            trendUp={false}
                            className="h-[120px]"
                        />
                    </div>
                    {/* Rankings Section (Moves UP now) */}
                    <div className="flex-1 flex flex-col gap-4 min-h-0">
                        <RankingCard
                            title="Destaques Positivos"
                            items={positiveHighlights}
                            titleColor="text-emerald-600"
                            scoreBg="bg-emerald-50 text-emerald-600"
                            timeRange={timeRange}
                            setTimeRange={setTimeRange}
                        />
                        <RankingCard
                            title="Pontos de Atenção"
                            items={attentionPoints}
                            titleColor="text-red-500"
                            scoreBg="bg-red-50 text-red-500"
                            timeRange={timeRange}
                            setTimeRange={setTimeRange}
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: CHARTS + DISTRIBUTION */}
                <div className="flex-1 flex flex-col gap-4 min-h-0">
                    {/* Top Charts Row */}
                    <div className="grid grid-cols-2 gap-4 flex-shrink-0">
                        {/* CSAT GLOBAL */}
                        <div className="bg-white dark:bg-[#121826] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col h-[240px]">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-slate-500 mb-2 font-sans text-center">CSAT Global</h3>
                            <div className="flex-1 relative min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={csatGaugeData}
                                            cx="50%"
                                            cy="85%"
                                            innerRadius={60}
                                            outerRadius={85}
                                            startAngle={180}
                                            endAngle={0}
                                            paddingAngle={0}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {csatGaugeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-6">
                                    <span className="text-3xl font-black text-gray-900 dark:text-white">85%</span>
                                    <div className="flex items-center text-[10px] text-emerald-500 font-bold mt-1">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        5%
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* QUALIDADE */}
                        <div className="bg-white dark:bg-[#121826] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col h-[240px]">
                            <h3 className="text-xs font-bold text-gray-500 dark:text-slate-500 mb-2 font-sans">Qualidade</h3>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={qualityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorDec" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#D1D5DB" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#D1D5DB" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorJan" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="dec" stroke="#D1D5DB" fill="url(#colorDec)" strokeWidth={3} />
                                        <Area type="monotone" dataKey="jan" stroke="#9CA3AF" fill="url(#colorJan)" strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Distribution Section */}
                    <div className="bg-white dark:bg-[#121826] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col min-h-0 h-full">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 mb-6 font-sans">Distribuição de Notas</h3>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={gradeDistribution} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={({ x, y, payload }) => (
                                            <g transform={`translate(${x},${y})`}>
                                                <text x={0} y={15} fill="#6B7280" fontSize={11} fontWeight="bold" textAnchor="middle">{payload.value}</text>
                                                <path d="M5,5 L10,0 L15,5 L12.5,10 L15,15 L10,12.5 L5,15 L7.5,10 L5,5" fill="#FBBF24" transform="scale(0.5) translate(5, 12)" />
                                            </g>
                                        )}
                                    />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                                        <LabelList
                                            dataKey="value"
                                            position="top"
                                            offset={12}
                                            formatter={(value: unknown) => {
                                                const val = value as string | number;
                                                if (typeof val === 'number' && val > 1000) return (val / 1000).toFixed(3);
                                                return (val ?? '').toString();
                                            }}
                                            style={{ fill: '#6B7280', fontSize: 12, fontWeight: 'bold' }}
                                        />
                                        {gradeDistribution.map((entry, index) => (
                                            <Cell key={index} fill={index >= 3 ? "#9CA3AF" : "#4B5563"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SimpleMetricCard({ title, value, trend, trendUp, className }: { title: string, value: string, trend: string, trendUp: boolean, className?: string }) {
    return (
        <div className={clsx("bg-white dark:bg-[#121826] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-center", className)}>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-500 mb-2">{title}</span>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-gray-900 dark:text-slate-100">{value}</span>
                <div className={clsx("flex items-center text-[11px] font-bold mb-1", trendUp ? "text-emerald-500" : "text-red-400")}>
                    {trendUp ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                    {trend}
                </div>
            </div>
        </div>
    );
}

interface RankingItem {
    name: string;
    score: number;
}

interface RankingCardProps {
    title: string;
    items: RankingItem[];
    titleColor: string;
    scoreBg: string;
    timeRange: '7' | '15' | '30';
    setTimeRange: (val: '7' | '15' | '30') => void;
}

function RankingCard({ title, items, titleColor, scoreBg, timeRange, setTimeRange }: RankingCardProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredItems = items.filter((item: RankingItem) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-[#121826] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col flex-1 min-h-0 h-full">
            <div className="flex flex-col gap-4 mb-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <h3 className={clsx("text-base font-bold font-sans", titleColor)}>{title}</h3>
                    <div className="flex bg-gray-50 dark:bg-slate-800 rounded-lg p-0.5 border border-gray-100 dark:border-white/5">
                        {['7 dias', '15 dias', '30 dias'].map(t => (
                            <button
                                key={t}
                                onClick={() => setTimeRange(t.split(' ')[0] as '7' | '15' | '30')}
                                className={clsx(
                                    "px-2 py-0.5 text-[9px] font-bold rounded-md transition-all",
                                    timeRange === t.split(' ')[0] ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar por título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/20 dark:text-slate-200"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col justify-between py-1">
                {filteredItems.length > 0 ? (
                    filteredItems.slice(0, 5).map((item: RankingItem, index: number) => (
                        <div key={index} className="flex items-center text-sm py-2">
                            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                <span className="text-gray-700 dark:text-slate-300 font-bold truncate">{item.name}</span>
                                <div className="flex-1 border-b border-gray-100 dark:border-slate-800 mx-2 h-0 translate-y-[2px]" />
                            </div>
                            <div className={clsx("px-3 py-1 rounded-md text-[10px] font-black min-w-[36px] text-center", scoreBg)}>
                                {item.score.toFixed(1)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center text-xs text-gray-400 font-bold italic">
                        Nenhum serviço encontrado
                    </div>
                )}
            </div>
        </div>
    );
}
