"use client";

import { Header } from "@/components/Header";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from "recharts";

const volumeData = [
    { time: "20:00", value: 30 },
    { time: "20:00", value: 45 },
    { time: "20:00", value: 25 },
    { time: "20:00", value: 40 },
    { time: "20:00", value: 30 },
    { time: "20:00", value: 42 },
    { time: "20:00", value: 38 },
];

const usersData = [
    { time: "20:00", value: 10 },
    { time: "20:00", value: 25 },
    { time: "20:00", value: 15 },
    { time: "20:00", value: 30 },
    { time: "20:00", value: 20 },
    { time: "20:00", value: 28 },
    { time: "20:00", value: 25 },
];

const channelData = [
    { name: "Whatsapp", value: 55, color: "#000000" },
];

export default function OperacaoPage() {
    return (
        <div className="flex flex-col h-full bg-gray-50">
            <Header
                title="Tela Operação"
                subtitle="Acompanhe o volume de atendimentos, canais e métricas operacionais"
            />

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* TOTAL VOLUME */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">TOTAL VOLUME</h3>
                    <p className="text-4xl font-bold text-gray-900 mb-6">55</p>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* VOLUME POR CANAL */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">VOLUME POR CANAL</h3>
                    <div className="flex items-center justify-around">
                        <div className="relative w-40 h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={channelData}
                                        innerRadius={55}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {channelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold">55</span>
                                <span className="text-[10px] uppercase text-gray-500">Atendimentos</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                            <span className="text-sm font-medium text-gray-700">Whatsapp</span>
                            <span className="text-sm font-bold text-gray-900 ml-auto">100% (55)</span>
                        </div>
                    </div>
                </div>

                {/* USUÁRIOS ÚNICOS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">USUÁRIOS ÚNICOS</h3>
                    <p className="text-4xl font-bold text-gray-900 mb-6">0</p>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={usersData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CONVERSAS PENDENTES */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">CONVERSAS PENDENTES</h3>
                        <div className="flex items-baseline gap-2 mt-4">
                            <p className="text-4xl font-bold text-gray-900">0</p>
                            <span className="text-sm text-gray-500">(0.0% do total)</span>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                            Atenção Operacional
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                            Existem conversas que precisam de finalização manual ou revisão.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
