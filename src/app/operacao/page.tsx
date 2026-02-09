"use client";

import { Header } from "@/components/Header";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";

// Mock Data
const volumeData = [
    { name: "Jan 01", ai: 1200, human: 400 },
    { name: "Jan 05", ai: 1900, human: 600 },
    { name: "Jan 10", ai: 1500, human: 500 },
    { name: "Jan 13", ai: 1705, human: 450 },
    { name: "Jan 15", ai: 2100, human: 700 },
    { name: "Jan 20", ai: 1800, human: 550 },
    { name: "Jan 25", ai: 2400, human: 800 },
];

const failuresData = [
    { name: "IPVA", value: 305, color: "#111827" },
    { name: "ICMS", value: 237, color: "#4B5563" },
    { name: "NF-e", value: 209, color: "#6B7280" },
    { name: "Certidões", value: 73, color: "#9CA3AF" },
    { name: "CADIN", value: 54, color: "#D1D5DB" },
    { name: "Outros", value: 21, color: "#E5E7EB" },
];

const themesData = [
    { name: "Atendimentos pela IA", value: 25, color: "#9CA3AF" }, // Medium Gray
    { name: "Atendimentos pela IA", value: 15, color: "#6B7280" }, // Darker Gray
    { name: "Atendimentos pela IA", value: 15, color: "#111827" }, // Black
    { name: "Atendimentos pela IA", value: 15, color: "#D1D5DB" }, // Lighter Gray
    { name: "Atendimentos pela IA", value: 15, color: "#E5E7EB" }, // Lightest Gray
    { name: "Outros", value: 15, color: "#F3F4F6" },               // Very Light Gray
];

const sparklineData1 = [
    { value: 10 }, { value: 15 }, { value: 12 }, { value: 20 }, { value: 18 }, { value: 25 }, { value: 22 }
];
const sparklineData2 = [
    { value: 20 }, { value: 18 }, { value: 22 }, { value: 15 }, { value: 25 }, { value: 20 }, { value: 28 }
];
const sparklineData3 = [
    { value: 30 }, { value: 25 }, { value: 28 }, { value: 32 }, { value: 26 }, { value: 35 }, { value: 30 }
];
const sparklineData4 = [
    { value: 15 }, { value: 20 }, { value: 18 }, { value: 12 }, { value: 22 }, { value: 15 }, { value: 18 }
];

export default function OperacaoPage() {
    const [timeRange, setTimeRange] = useState<'7' | '15' | '30'>('7');

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#080B14] transition-colors duration-300 overflow-hidden">
            <Header />

            <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">

                {/* TOP METRICS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total de Atendimentos"
                        value="21.548"
                        trend="+12%"
                        trendUp={true}
                        data={sparklineData1}
                    />
                    <MetricCard
                        title="Usuários Únicos"
                        value="8,500"
                        trend="+5%"
                        trendUp={true}
                        data={sparklineData2}
                    />
                    <MetricCard
                        title="Tempo Médio de Resposta"
                        value="1m 45s"
                        trend="-10%"
                        trendUp={true} // Green because lower time is usually good
                        data={sparklineData3}
                    />
                    <MetricCard
                        title="Mensagens por Conversa"
                        value="6"
                        trend="-8%"
                        trendUp={false}
                        data={sparklineData4}
                    />
                </div>

                {/* CHARTS ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">

                    {/* VOLUME DE ATENDIMENTOS - Takes up larger space if needed, or equal */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#121826] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200">Volume de Atendimentos</h3>
                            <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-0.5">
                                {['7 dias', '15 dias', '30 dias'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTimeRange(t.split(' ')[0] as '7' | '15' | '30')}
                                        className={clsx(
                                            "px-2 py-1 text-[10px] font-bold rounded-md transition-all",
                                            timeRange === t.split(' ')[0] ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-slate-300"
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e5e7eb" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#e5e7eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="ai" name="Atendimentos pela IA" stackId="1" stroke="#6b7280" fill="url(#colorAi)" />
                                    <Area type="monotone" dataKey="human" name="Transbordo para Humano" stackId="1" stroke="#d1d5db" fill="url(#colorHuman)" />
                                    <Legend iconType="rect" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* FALHAS DE RESPOSTA */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#121826] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-8">Falhas de Resposta</h3>
                        <div className="flex-1 w-full min-h-0 space-y-6 overflow-y-auto pr-2">
                            {failuresData.map((item) => (
                                <div key={item.name} className="flex flex-col gap-2">
                                    <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-slate-400">
                                        <span>{item.name}</span>
                                        <span className="text-gray-900 dark:text-slate-200">{item.value}</span>
                                    </div>
                                    <div className="w-full bg-gray-50 dark:bg-slate-800 h-8 rounded-lg overflow-hidden">
                                        <div
                                            className="h-full rounded-lg transition-all duration-500"
                                            style={{
                                                width: `${(item.value / 305) * 100}%`,
                                                backgroundColor: item.color
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TEMAS COM MAIOR VOLUME */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#121826] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-6 font-sans">Temas com Maior Volume de Atendimentos</h3>
                        <div className="flex-1 w-full min-h-[250px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={themesData}
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {themesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">21.548</span>
                                <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">Atendimentos</span>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4">
                            {themesData.map((item, index) => (
                                <div key={index} className="flex items-center text-sm">
                                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                        <div className="w-3 h-3 rounded-[3px] flex-shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-gray-500 dark:text-slate-400 font-bold truncate">{item.name}</span>
                                        <div className="flex-1 border-b border-gray-200 dark:border-slate-700 border-solid mx-3 h-0 opacity-40 translate-y-[2px]" />
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-slate-200 ml-2">35%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, trend, trendUp, data }: { title: string, value: string, trend: string, trendUp: boolean, data: { value: number }[] }) {
    return (
        <div className="bg-white dark:bg-[#121826] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
            <h3 className="text-xs font-bold text-gray-500 dark:text-slate-500 mb-4 uppercase tracking-wide">{title}</h3>
            <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">{value}</span>
                <div className={clsx("flex items-center text-xs font-bold px-2 py-1 rounded", trendUp ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" : "text-red-500 bg-red-50 dark:bg-red-500/10")}>
                    {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {trend}
                </div>
            </div>
            <div className="h-16 w-full absolute bottom-0 left-0 right-0 opacity-20">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#000" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#000" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#333"
                            strokeWidth={2}
                            fill={`url(#grad-${title})`}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
