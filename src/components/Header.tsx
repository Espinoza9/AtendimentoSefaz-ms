"use client";

import { ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        G
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">Gabriela Souza</p>
                        <p className="text-xs text-gray-500">gabrielasouza@digix.com.br</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Menu className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
