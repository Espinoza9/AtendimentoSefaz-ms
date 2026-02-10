"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Plus, X, Upload, Clock, FileText, Trash2, Edit2, ExternalLink, Eye, Download, Search } from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";

interface DocumentItem {
    id: string;
    name: string;
    url?: string;
    type?: string;
}

interface ServiceCard {
    id: number;
    order: number;
    title: string;
    description: string;
    link?: string;
    date: string;
    documents: DocumentItem[];
    active: boolean;
}

const initialServices: ServiceCard[] = [
    {
        id: 1,
        order: 1,
        title: "Carta de Serviço - Atendimento ao Cidadão",
        description: "Informações sobre serviços de atendimento presencial e online.",
        date: "3 de fev, 2026",
        documents: [{ id: "1", name: "Guia de Atendimento.pdf" }],
        link: "https://www.ms.gov.br/financas-e-impostos/analise",
        active: true
    },
    {
        id: 2,
        order: 2,
        title: "Atestado de inexistência para fins de diferimento do ICMS",
        description: "Solicitação de atestado para empresas com incentivos fiscais.",
        date: "3 de fev, 2026",
        documents: [],
        link: "https://www.ms.gov.br/empresa-industria-e-comercio/atestado",
        active: false
    },
    {
        id: 3,
        order: 3,
        title: "Carta de Serviço - Isenção de IPVA para PCD",
        description: "Requisitos e formulários para solicitação de isenção.",
        date: "2 de fev, 2026",
        documents: [{ id: "2", name: "Formulario_PCD.pdf" }],
        link: "https://www.ms.gov.br/servicos/ipva-pcd",
        active: true
    },
    {
        id: 4,
        order: 4,
        title: "Emissão de Nota Fiscal Avulsa Eletrônica (NFA-e)",
        description: "Orientação para emissão de nota avulsa para pessoas físicas.",
        date: "1 de fev, 2026",
        documents: [],
        link: "https://www.ms.gov.br/financas/nfa-e",
        active: true
    },
    {
        id: 5,
        order: 5,
        title: "Cadastro de Produtor Rural (CAP)",
        description: "Procedimentos para inscrição e atualização cadastral.",
        date: "30 de jan, 2026",
        documents: [{ id: "3", name: "Lista_Documentos_CAP.pdf" }],
        link: "https://www.ms.gov.br/produtor-rural",
        active: false
    },
    {
        id: 6,
        order: 6,
        title: "Parcelamento de Débitos Fiscais",
        description: "Regras para parcelamento de dívidas ativas e não inscritas.",
        date: "28 de jan, 2026",
        documents: [],
        link: "https://www.ms.gov.br/parcelamento",
        active: true
    },
    {
        id: 7,
        order: 7,
        title: "Carta de Serviço - ITCD",
        description: "Guia completo sobre o Imposto de Transmissão Causa Mortis e Doação.",
        date: "25 de jan, 2026",
        documents: [{ id: "4", name: "Manual_ITCD.pdf" }, { id: "5", name: "Tabela_Aliquotas.pdf" }],
        link: "https://www.ms.gov.br/impostos/itcd",
        active: true
    },
    {
        id: 8,
        order: 8,
        title: "Consulta de Cadastros Suspensos",
        description: "Verificação de situação cadastral de contribuintes.",
        date: "20 de jan, 2026",
        documents: [],
        link: "https://www.ms.gov.br/consultas/sintegra",
        active: true
    },
    {
        id: 9,
        order: 9,
        title: "Restituição de ICMS - Substituição Tributária",
        description: "Procedimentos para solicitar ressarcimento de valores pagos a maior.",
        date: "15 de jan, 2026",
        documents: [{ id: "6", name: "Modelo_Requerimento.doc" }],
        link: "https://www.ms.gov.br/icms-st",
        active: true
    },
    {
        id: 10,
        order: 10,
        title: "Carta de Serviço - Nota Fiscal de Consumidor Eletrônica (NFC-e)",
        description: "Informações técnicas e legislação para varejistas.",
        date: "10 de jan, 2026",
        documents: [],
        link: "https://www.nfe.ms.gov.br",
        active: true
    },
    {
        id: 11,
        order: 11,
        title: "Diferimento de ICMS na Importação",
        description: "Normas para concessão de diferimento em operações de importação.",
        date: "5 de jan, 2026",
        documents: [{ id: "7", name: "Decreto_Importacao.pdf" }],
        link: "https://www.ms.gov.br/legislacao",
        active: true
    },
    {
        id: 12,
        order: 12,
        title: "Cadastro de Transportadoras",
        description: "Registro obrigatório para empresas de transporte de cargas.",
        date: "2 de jan, 2026",
        documents: [],
        link: "https://www.ms.gov.br/transportes",
        active: true
    },
    {
        id: 13,
        order: 13,
        title: "Carta de Serviço - Benefícios Fiscais",
        description: "Programas de incentivo fiscal disponíveis no estado.",
        date: "28 de dez, 2025",
        documents: [{ id: "8", name: "Guia_Incentivos_2026.pdf" }],
        link: "https://www.ms.gov.br/beneficios",
        active: true
    },
    {
        id: 14,
        order: 14,
        title: "Manual de Integração - API de Consulta",
        description: "Documentação técnica para desenvolvedores e contadores.",
        date: "20 de dez, 2025",
        documents: [{ id: "9", name: "Swagger_API.json" }, { id: "10", name: "Exemplos_Integracao.zip" }],
        link: "https://api.sefaz.ms.gov.br/docs",
        active: true
    },
];

export default function ConfiguracoesPage() {
    const [services, setServices] = useState<ServiceCard[]>(initialServices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceCard | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all'); // NEW
    const [searchTerm, setSearchTerm] = useState(""); // NEW
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        order: "",
        title: "",
        link: "",
        description: "",
        documents: [] as DocumentItem[],
        active: true // NEW
    });

    const [editingDocId, setEditingDocId] = useState<string | null>(null);
    const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

    const handleOpenModal = (service?: ServiceCard) => {
        if (service) {
            setEditingService(service);
            setFormData({
                order: service.order.toString(),
                title: service.title,
                link: service.link || "",
                description: service.description,
                documents: service.documents,
                active: service.active // NEW
            });
        } else {
            setEditingService(null);
            setFormData({
                order: (services.length + 1).toString(),
                title: "",
                link: "",
                description: "",
                documents: [],
                active: true // NEW
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const now = new Date();
        const dateStr = `${now.getDate()} de ${now.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}, ${now.getFullYear()}`;

        if (editingService) {
            setServices(services.map(s =>
                s.id === editingService.id
                    ? {
                        ...s,
                        order: Number(formData.order),
                        title: formData.title,
                        link: formData.link,
                        description: formData.description,
                        documents: formData.documents,
                        active: formData.active // NEW
                    }
                    : s
            ));
        } else {
            setServices([
                ...services,
                {
                    id: Date.now(),
                    order: Number(formData.order),
                    title: formData.title,
                    link: formData.link,
                    description: formData.description,
                    date: dateStr,
                    documents: formData.documents,
                    active: formData.active // NEW
                }
            ]);
        }
        handleCloseModal();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const newDoc: DocumentItem = {
                        id: Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        url: reader.result as string,
                        type: file.type
                    };
                    setFormData(prev => ({
                        ...prev,
                        documents: [...prev.documents, newDoc]
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleRenameDoc = (id: string, newName: string) => {
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.map(doc => doc.id === id ? { ...doc, name: newName } : doc)
        }));
    };

    const handleDelete = (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta carta de serviço?")) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    // Filter Logic
    const filteredServices = services.filter(service => {
        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'active' ? service.active : !service.active);
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const activeCount = services.filter(s => s.active).length;
    const inactiveCount = services.filter(s => !s.active).length;

    return (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#080B14] transition-colors duration-300 overflow-hidden">
            <Header />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Base de Dados</h2>
                        <p className="text-gray-500 mt-2 font-medium">Gerencie as cartas de serviço e as bases de conhecimento do sistema</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex bg-white dark:bg-[#121826] p-1 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={clsx("px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2", filterStatus === 'all' ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-slate-300")}
                            >
                                Todas
                                <span className={clsx("text-xs px-1.5 py-0.5 rounded-md", filterStatus === 'all' ? "bg-blue-100 dark:bg-blue-500/30" : "bg-gray-100 dark:bg-slate-800")}>
                                    {services.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setFilterStatus('active')}
                                className={clsx("px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2", filterStatus === 'active' ? "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-slate-300")}
                            >
                                Ativas
                                <span className={clsx("text-xs px-1.5 py-0.5 rounded-md", filterStatus === 'active' ? "bg-emerald-100 dark:bg-emerald-500/30" : "bg-gray-100 dark:bg-slate-800")}>
                                    {activeCount}
                                </span>
                            </button>
                            <button
                                onClick={() => setFilterStatus('inactive')}
                                className={clsx("px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2", filterStatus === 'inactive' ? "bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-slate-300")}
                            >
                                Inativas
                                <span className={clsx("text-xs px-1.5 py-0.5 rounded-md", filterStatus === 'inactive' ? "bg-orange-100 dark:bg-orange-500/30" : "bg-gray-100 dark:bg-slate-800")}>
                                    {inactiveCount}
                                </span>
                            </button>
                        </div>

                        {/* SEARCH BAR */}
                        <div className="relative min-w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Pesquisar cartas "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#121826] border border-gray-100 dark:border-white/5 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-slate-200 dark:placeholder:text-slate-600 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#1B4D89] text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm font-medium active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        Adicionar Carta
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.length === 0 ? (
                        <div className="col-span-full p-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Nenhuma carta de serviço encontrada com este filtro.</p>
                        </div>
                    ) : (
                        filteredServices
                            .sort((a, b) => a.order - b.order)
                            .map((service) => (
                                <div
                                    key={service.id}
                                    className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md dark:hover:border-white/10 transition-all group relative cursor-pointer"
                                    onClick={() => handleOpenModal(service)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={clsx("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider", service.active ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-orange-50 text-orange-600 border border-orange-100")}>
                                                {service.active ? "Ativo" : "Inativo"}
                                            </span>
                                            <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                ORDEM #{service.order}
                                            </span>
                                            <div className="hidden group-hover:flex items-center gap-1">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOpenModal(service); }}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(service.id); }}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-gray-900 dark:text-slate-100 font-bold text-lg mb-2 line-clamp-2 leading-snug">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-slate-400 text-sm mb-3 line-clamp-3 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {service.link && (
                                        <a
                                            href={service.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors mb-4"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            {service.link}
                                        </a>
                                    )}


                                    <div className="pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500 text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span>{service.date}</span>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition hover:bg-blue-100 dark:hover:bg-blue-500/20">
                                            <FileText className="w-3.5 h-3.5" />
                                            {service.documents.length} anexo{service.documents.length !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>

            {/* SIDE SHEET OVERLAY */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] animate-in fade-in duration-300"
                        onClick={handleCloseModal}
                    />
                    <div className="relative w-full max-w-md bg-white dark:bg-[#121826] h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
                        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                                    {editingService ? "Editar Carta" : "Nova Carta"}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Preencha os dados abaixo para adicionar uma nova carta à base de conhecimento.</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Ordem</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={e => setFormData({ ...formData, order: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-slate-900/50 border-none dark:border dark:border-white/5 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium dark:text-slate-100"
                                        required
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Título</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Carta de Serviço - IPVA"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-slate-900/50 border-none dark:border dark:border-white/5 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-slate-100 dark:placeholder:text-slate-600"
                                        required
                                    />
                                    {formData.title && formData.title.length < 3 && (
                                        <p className="text-red-500 text-[11px] mt-1.5">Título deve ter pelo menos 3 caracteres</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Link Externo (Opcional)</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border-none dark:border dark:border-white/5 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-slate-100 dark:placeholder:text-slate-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">Descrição</label>
                                <textarea
                                    rows={4}
                                    placeholder="Descreva o conteúdo desta carta..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-slate-900/50 border-none dark:border dark:border-white/5 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all resize-none dark:text-slate-100 dark:placeholder:text-slate-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Documentos</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    multiple
                                />
                                {formData.documents.length > 0 && (
                                    <div className="mb-4 space-y-2">
                                        {formData.documents.map((doc, index) => (
                                            <div key={doc.id} className="flex items-center justify-between bg-blue-50 dark:bg-blue-500/10 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
                                                <div
                                                    className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 font-medium truncate pr-2 flex-1 cursor-pointer"
                                                    onClick={() => setEditingDocId(doc.id)}
                                                >
                                                    <FileText className="w-4 h-4 flex-shrink-0" />
                                                    {editingDocId === doc.id ? (
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            value={doc.name}
                                                            onChange={(e) => handleRenameDoc(doc.id, e.target.value)}
                                                            onBlur={() => setEditingDocId(null)}
                                                            onKeyDown={(e) => e.key === 'Enter' && setEditingDocId(null)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-500/50 rounded px-1.5 py-0.5 text-blue-700 dark:text-blue-300 w-full focus:outline-none focus:ring-1 focus:ring-blue-400"
                                                        />
                                                    ) : (
                                                        <span
                                                            className="truncate hover:underline decoration-dotted decoration-blue-400 dark:decoration-blue-500 underline-offset-4"
                                                            onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); }}
                                                        >
                                                            {doc.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); }}
                                                        className="text-blue-400 hover:text-blue-600 transition-colors p-1"
                                                        title="Visualizar"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setEditingDocId(doc.id === editingDocId ? null : doc.id); }}
                                                        className="text-blue-400 hover:text-blue-600 transition-colors p-1"
                                                        title="Renomear"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, documents: formData.documents.filter((_, i) => i !== index) }); }}
                                                        className="text-blue-400 hover:text-red-500 transition-colors p-1"
                                                        title="Excluir"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-all">
                                        <Upload className="w-6 h-6 text-gray-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-slate-200">Clique para selecionar um arquivo ou arraste e solte</p>
                                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-wider">Extensões permitidas</p>
                                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                                        {['.csv', '.doc', '.docx', '.txt', '.pdf', '.xlsx', '.xls', '.ppt', '.pptx', '.json', '.xml', '.zip', '.png', '.jpg', '.svg'].map(ext => (
                                            <span key={ext} className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">{ext}</span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-4 leading-relaxed">
                                        Tamanho máximo: 10MB para .pdf; 5MB para demais
                                    </p>
                                </div>
                            </div>
                        </form>

                        <div className="p-6 border-t border-gray-100 flex gap-3">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="flex-1 px-4 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
                            >
                                {editingService ? "Salvar Alterações" : "Criar Carta"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PREVIEW MODAL */}
            {previewDoc && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#121826] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border dark:border-white/5">
                        <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/40">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-slate-100 leading-none">{previewDoc.name}</h4>
                                    <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-medium">Pré-visualização do Documento</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setPreviewDoc(null)}
                                className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 flex flex-col items-center justify-center bg-white dark:bg-[#121826] min-h-[400px]">
                            {previewDoc.url && (previewDoc.type?.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i.test(previewDoc.name)) ? (
                                <div className="w-full flex justify-center">
                                    <Image
                                        src={previewDoc.url}
                                        alt={previewDoc.name}
                                        width={800}
                                        height={500}
                                        className="max-w-full max-h-[500px] object-contain rounded-xl shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-500"
                                    />
                                </div>
                            ) : previewDoc.url && (previewDoc.type === 'application/pdf' || /\.pdf$/i.test(previewDoc.name)) ? (
                                <div className="w-full h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg">
                                    <iframe
                                        src={previewDoc.url}
                                        className="w-full h-full"
                                        title={previewDoc.name}
                                    />
                                </div>
                            ) : previewDoc.url && (previewDoc.type?.startsWith('text/') || /\.(txt|csv|json|xml|log|md)$/i.test(previewDoc.name)) ? (
                                <div className="w-full h-[500px] rounded-xl overflow-auto border border-gray-200 dark:border-white/10 shadow-lg bg-gray-50 dark:bg-slate-900 p-6">
                                    <iframe
                                        src={previewDoc.url}
                                        className="w-full h-full"
                                        title={previewDoc.name}
                                    />
                                </div>
                            ) : previewDoc.url && /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(previewDoc.name) ? (
                                <div className="w-full h-[500px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg">
                                    <iframe
                                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewDoc.url)}`}
                                        className="w-full h-full"
                                        title={previewDoc.name}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-inner">
                                        <FileText className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <p className="text-gray-900 font-bold text-lg mb-2">Visualização Indisponível</p>
                                    <p className="text-gray-500 text-sm text-center max-w-xs leading-relaxed">
                                        O arquivo <span className="text-blue-600 font-medium">&quot;{previewDoc.name}&quot;</span> foi carregado, mas este tipo de arquivo não suporta pré-visualização direta.
                                    </p>
                                </>
                            )}

                            <div className="mt-10 flex gap-3 w-full justify-center">
                                {previewDoc.url && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const link = document.createElement('a');
                                            link.href = previewDoc.url!;
                                            link.download = previewDoc.name;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Baixar Arquivo
                                    </button>
                                )}
                                <button
                                    onClick={() => setPreviewDoc(null)}
                                    className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sefaz MS - Sistema de Atendimento</span>
                            <span className="text-[10px] text-gray-400 font-bold">{new Date().toLocaleDateString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
