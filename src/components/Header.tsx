"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Calendar, ChevronDown, LayoutGrid, Star, MessageSquare, Database } from "lucide-react";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
    { name: "Operação", href: "/operacao", icon: LayoutGrid },
    { name: "Avaliações", href: "/avaliacao", icon: Star },
    { name: "Conversas", href: "/conversas", icon: MessageSquare },
    { name: "Base de Dados", href: "/configuracoes", icon: Database },
];

export function Header() {
    const pathname = usePathname();

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("Janeiro/26");
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return false;

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme === "dark";

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });


    // Initialize theme
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);


    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };


    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return (
        <header className="h-16 bg-[#1B4D89] flex items-center justify-between px-6 sticky top-0 z-50 text-white shadow-lg">
            {/* LEFT: LOGO AREA */}
            <div className="flex items-center gap-5">
                <Image
                    src="/logo-sefaz.svg"
                    alt="SEFAZ MS - Gestão do Atendimento"
                    width={200}
                    height={40}
                    className="h-10 w-auto object-contain brightness-0 invert"
                />
            </div>

            {/* CENTER: NAVIGATION */}
            <nav className="flex items-center bg-black/10 rounded-xl p-1 gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all",
                                isActive
                                    ? "bg-white text-[#1B4D89] shadow-sm"
                                    : "text-white/80 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <item.icon className={clsx("w-4 h-4", isActive ? "text-[#1B4D89]" : "text-white/60")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* RIGHT: TOOLS & PROFILE */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
                    >
                        {isDark ? <Sun className="w-5 h-5 fill-current" /> : <Moon className="w-5 h-5 fill-current" />}
                    </button>

                    <div className="relative">
                        <div
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl text-sm font-bold cursor-pointer hover:bg-white/20 transition-all border border-white/10 shadow-inner"
                        >
                            <Calendar className="w-4 h-4" />
                            <span>{selectedDate}</span>
                            <ChevronDown className={clsx("w-4 h-4 transition-transform duration-200", isCalendarOpen && "rotate-180")} />
                        </div>

                        {isCalendarOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 p-2 text-gray-800 dark:text-gray-100 animate-in fade-in zoom-in-95 duration-200">
                                <div className="max-h-60 overflow-y-auto grid grid-cols-1 gap-1 custom-scrollbar">
                                    {months.map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => {
                                                setSelectedDate(`${m}/26`);
                                                setIsCalendarOpen(false);
                                            }}
                                            className={clsx(
                                                "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all text-gray-700 dark:text-gray-200",
                                                selectedDate.startsWith(m)
                                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                    : "hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                            )}
                                        >
                                            {m} 2026
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-8 w-[1px] bg-white/20 mx-1" />

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right">
                        <p className="text-[13px] font-bold leading-none">Kerah Datto</p>
                        <p className="text-[11px] text-white/60 mt-1">Administrador</p>
                    </div>
                    <div className="relative group cursor-pointer">
                        <Image
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                            alt="User"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-xl border-2 border-white/20 shadow-md group-hover:border-white transition-all object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1B4D89] rounded-full" />
                    </div>
                </div>
            </div>
        </header>
    );
}
