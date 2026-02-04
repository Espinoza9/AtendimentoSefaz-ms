"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Star, Settings } from "lucide-react";
import { clsx } from "clsx";

const menuItems = [
    {
        name: "Operação",
        href: "/operacao",
        icon: LayoutGrid,
    },
    {
        name: "Avaliação",
        href: "/avaliacao",
        icon: Star,
    },
    {
        name: "Configurações",
        href: "/configuracoes",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col fixed left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="font-bold text-lg text-gray-900">Sefaz Atendimento</span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
