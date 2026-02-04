"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

interface ServiceCard {
    id: number;
    order: number;
    title: string;
    link: string;
}

const initialServices: ServiceCard[] = [
    {
        id: 1,
        order: 1,
        title: "Análise das obrigações socioeconômicas pactuadas em Termo de Acordo",
        link: "https://www.ms.gov.br/financas-e-impostos/analise"
    },
    {
        id: 2,
        order: 2,
        title: "Atestado de inexistência para fins de diferimento do ICMS",
        link: "https://www.ms.gov.br/empresa-industria-e-comercio/atestado"
    },
    {
        id: 3,
        order: 3,
        title: "Auto de cientificação (ACT) - prorrogação de prazo",
        link: "https://www.ms.gov.br/financas-e-impostos/auto"
    },
];

export default function ConfiguracoesPage() {
    const [services, setServices] = useState<ServiceCard[]>(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceCard | null>(null);

    // Form State
    const [formData, setFormData] = useState({ order: "", title: "", link: "" });

    const handleOpenModal = (service?: ServiceCard) => {
        if (service) {
            setEditingService(service);
            setFormData({
                order: service.order.toString(),
                title: service.title,
                link: service.link
            });
        } else {
            setEditingService(null);
            setFormData({ order: (services.length + 1).toString(), title: "", link: "" });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            setServices(services.map(s =>
                s.id === editingService.id
                    ? { ...s, order: Number(formData.order), title: formData.title, link: formData.link }
                    : s
            ));
        } else {
            setServices([
                ...services,
                {
                    id: Date.now(),
                    order: Number(formData.order),
                    title: formData.title,
                    link: formData.link
                }
            ]);
        }
        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta carta de serviço?")) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <Header
                title="Configurações"
                subtitle="Gerencie as cartas de serviço e outras configurações do sistema"
            />

            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Cartas de Serviço</h2>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar Carta
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 w-16 font-semibold text-gray-700">Ord</th>
                                <th className="p-4 font-semibold text-gray-700">Nome do Serviço</th>
                                <th className="p-4 font-semibold text-gray-700">Link de Acesso</th>
                                <th className="p-4 w-24 font-semibold text-gray-700 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        Nenhuma carta de serviço cadastrada.
                                    </td>
                                </tr>
                            ) : (
                                services
                                    .sort((a, b) => a.order - b.order)
                                    .map((service) => (
                                        <tr key={service.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-gray-600 font-medium">{service.order}</td>
                                            <td className="p-4 text-gray-900">{service.title}</td>
                                            <td className="p-4">
                                                <a
                                                    href={service.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline flex items-center gap-1 text-sm truncate max-w-[300px]"
                                                >
                                                    {service.link}
                                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                </a>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(service)}
                                                        className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service.id)}
                                                        className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {editingService ? "Editar Carta de Serviço" : "Nova Carta de Serviço"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Serviço</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link de Acesso</label>
                                <input
                                    type="url"
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                >
                                    {editingService ? "Salvar Alterações" : "Adicionar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
