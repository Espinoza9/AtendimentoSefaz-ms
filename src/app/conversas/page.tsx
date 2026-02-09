"use client";

import { Header } from "@/components/Header";
import {
    Search,
    Filter,
    TrendingUp,
    Smile,
    Frown,
    Meh,
    Angry,
    AlertCircle,
    Clock,
    Star,
    ChevronLeft,
    ChevronRight,
    X,
    Headset,
    Send
} from "lucide-react";
import { clsx } from "clsx";
import { useState, useMemo } from "react";

const conversations = [
    {
        id: "1",
        sentiment: "Crítico",
        sentimentColor: "text-red-500",
        sentimentBg: "bg-red-50 dark:bg-red-500/10",
        status: "Em andamento",
        statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10",
        theme: "2ª via de boleto",
        time: "Hoje, 12:03",
        contact: "(67) 988**-1290",
        rating: null,
        protocol: "123456",
        isOnline: true,
        history: [
            { id: 1, sender: "user", text: "Não estou conseguindo emitir a guia para o pagamento de ICMS. O sistema dá erro 502.", time: "12:03" },
            { id: 2, sender: "bot", text: "Oi! 👋 Sou a Dina, sua assistente virtual de atendimento da Sefaz MS. Vou verificar sua solicitação.", time: "12:03" },
            { id: 3, sender: "bot", text: "Sinto muito pelo inconveniente. O erro 502 geralmente é temporário. Você já tentou limpar o cache do seu navegador ou utilizar uma aba anônima?", time: "12:04" },
            { id: 4, sender: "user", text: "Já tentei de tudo! Preciso pagar isso hoje e o sistema de vocês não funciona. Quero falar com um atendimento humano agora!", time: "12:05", emotion: "irritated" },
            { type: "system", text: "Usuário solicitou transbordo humano" }
        ]
    },
    {
        id: "2", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Cobrança indevida", time: "Hoje, 12:03", contact: "(21) 997**-4451", rating: 4, protocol: "654321", isOnline: false,
        history: [
            { id: 1, sender: "user", text: "Bom dia! Recebi uma cobrança de ICMS referente ao mês de dezembro, mas já realizei o pagamento.", time: "11:45" },
            { id: 2, sender: "bot", text: "Olá! 👋 Sou a Dina, assistente virtual da Sefaz MS. Vou verificar essa situação para você. Pode me informar o número do protocolo de pagamento?", time: "11:46" },
            { id: 3, sender: "user", text: "Claro, o número é 2024-DEC-78542", time: "11:47" },
            { id: 4, sender: "bot", text: "Perfeito! Localizei seu pagamento. Verifico que houve um atraso na compensação bancária. O débito já foi baixado do sistema e você receberá um e-mail de confirmação em até 24h.", time: "11:49" },
            { id: 5, sender: "user", text: "Maravilha! Muito obrigado pela ajuda rápida!", time: "11:50" },
            { id: 6, sender: "bot", text: "Por nada! Fico feliz em ajudar. Caso tenha outras dúvidas, estou à disposição. Tenha um ótimo dia! 😊", time: "11:51" }
        ]
    },
    {
        id: "3", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Locais de Atendimento", time: "Hoje, 12:02", contact: "(67) 984**-3321", rating: 5, protocol: "789012", isOnline: false,
        history: [
            { id: 1, sender: "user", text: "Boa tarde, gostaria de saber o endereço da agência mais próxima de Campo Grande.", time: "10:30" },
            { id: 2, sender: "bot", text: "Boa tarde! 👋 A Agência Fazendária mais próxima fica na Av. Fernando Corrêa da Costa, 858 - Centro. Horário de funcionamento: segunda a sexta, das 7h30 às 13h30.", time: "10:31" },
            { id: 3, sender: "user", text: "Preciso levar algum documento específico?", time: "10:32" },
            { id: 4, sender: "bot", text: "Sim! Para atendimento presencial, leve: RG, CPF e comprovante de residência. Se for representante de empresa, também é necessário o contrato social e procuração.", time: "10:33" },
            { id: 5, sender: "user", text: "Perfeito, muito obrigada!", time: "10:34" },
            { id: 6, sender: "bot", text: "Disponha! Se precisar de mais informações, pode contar comigo. Tenha uma ótima tarde! 🙌", time: "10:34" }
        ]
    },
    {
        id: "4", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Expirado", statusColor: "text-gray-500 bg-gray-100 dark:bg-gray-500/10", theme: "Cancelamento de NF", time: "Hoje, 12:02", contact: "(67) 991**-9902", rating: 0, protocol: "345678", isOnline: false,
        history: [
            { id: 1, sender: "user", text: "Preciso cancelar uma nota fiscal emitida com dados incorretos.", time: "09:15" },
            { id: 2, sender: "bot", text: "Olá! Posso ajudar com isso. Qual o número da NF-e que deseja cancelar?", time: "09:16" },
            { id: 3, sender: "user", text: "NF 000.456.789", time: "09:17" },
            { id: 4, sender: "bot", text: "Localizei a nota. O prazo para cancelamento direto já expirou (24h). Você precisará emitir uma NF-e de estorno. Posso orientá-lo no processo?", time: "09:18" }
        ]
    },
    {
        id: "5", sentiment: "Irritado", sentimentColor: "text-orange-500", sentimentBg: "bg-orange-50 dark:bg-orange-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Cobrança indevida", time: "Hoje, 12:02", contact: "(67) 976**-3834", rating: null, protocol: "901234", isOnline: true,
        history: [
            { id: 1, sender: "user", text: "Estou recebendo cobranças de um veículo que já vendi há 2 anos!", time: "11:00" },
            { id: 2, sender: "bot", text: "Olá! Lamento pelo transtorno. Para resolver, preciso do número do Renavam e do CRV de transferência.", time: "11:01" },
            { id: 3, sender: "user", text: "Já enviei esses documentos 3 vezes e nada foi resolvido! Isso é um absurdo!", time: "11:02", emotion: "irritated" },
            { id: 4, sender: "bot", text: "Entendo sua frustração e peço desculpas. Vou abrir um chamado prioritário para análise imediata. Um analista entrará em contato em até 2h úteis.", time: "11:03" },
            { id: 5, sender: "user", text: "Espero que resolvam dessa vez, porque vou procurar meus direitos!", time: "11:04", emotion: "irritated" }
        ]
    },
    {
        id: "6", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Processo interno", time: "Hoje, 12:01", contact: "(67) 997**-0707", rating: 5, protocol: "567890", isOnline: false,
        history: [
            { id: 1, sender: "user", text: "Qual o prazo para resposta de um processo de restituição de ICMS?", time: "08:45" },
            { id: 2, sender: "bot", text: "Bom dia! O prazo médio para análise de processos de restituição é de 60 a 90 dias úteis, contados a partir do protocolo completo da documentação.", time: "08:46" },
            { id: 3, sender: "user", text: "E como acompanho o andamento?", time: "08:47" },
            { id: 4, sender: "bot", text: "Você pode acompanhar pelo Portal do Contribuinte em www.sefaz.ms.gov.br, na aba 'Meus Processos'. Basta fazer login com seu certificado digital ou senha gov.br.", time: "08:48" },
            { id: 5, sender: "user", text: "E se o prazo for ultrapassado?", time: "08:49" },
            { id: 6, sender: "bot", text: "Se o prazo for ultrapassado, você pode abrir uma reclamação através da Ouvidoria ou pelo e-mail ouvidoria@sefaz.ms.gov.br. Seu caso será analisado com prioridade.", time: "08:50" },
            { id: 7, sender: "user", text: "Quais documentos comprovam que protocolei corretamente?", time: "08:51" },
            { id: 8, sender: "bot", text: "O recibo de protocolo eletrônico é o comprovante oficial. Você pode baixá-lo a qualquer momento no Portal do Contribuinte, na seção 'Protocolos Realizados'.", time: "08:52" },
            { id: 9, sender: "user", text: "Existe algum valor mínimo para solicitar restituição?", time: "08:53" },
            { id: 10, sender: "bot", text: "Sim! O valor mínimo para pedidos de restituição é de R$ 100,00. Valores inferiores podem ser utilizados como crédito em próximas obrigações.", time: "08:54" },
            { id: 11, sender: "user", text: "Como funciona o uso como crédito?", time: "08:55" },
            { id: 12, sender: "bot", text: "O crédito fica disponível em sua conta corrente fiscal. Você pode utilizá-lo para abater ICMS devido em operações futuras. O saldo é atualizado automaticamente.", time: "08:56" },
            { id: 13, sender: "user", text: "Muito obrigado pelas informações detalhadas!", time: "08:57" },
            { id: 14, sender: "bot", text: "Por nada! Fico feliz em ajudar. Qualquer outra dúvida, estou à disposição. Tenha um ótimo dia! ✨", time: "08:58" }
        ]
    },

    {
        id: "7", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Dúvidas sobre ICMS", time: "Hoje, 11:58", contact: "(67) 992**-1122", rating: 4, protocol: "112233", isOnline: false,
        history: [
            { id: 1, sender: "user", text: "Qual a alíquota de ICMS para produtos eletrônicos vendidos para outros estados?", time: "10:00" },
            { id: 2, sender: "bot", text: "Olá! Para operações interestaduais, a alíquota é de 12% para estados do Sul e Sudeste, e 7% para demais regiões. Há também o DIFAL a considerar.", time: "10:01" },
            { id: 3, sender: "user", text: "E se o cliente for consumidor final?", time: "10:02" },
            { id: 4, sender: "bot", text: "Para consumidor final não contribuinte, aplica-se a alíquota interestadual e o DIFAL é partilhado. Em 2026, 100% do DIFAL vai para o estado de destino.", time: "10:03" },
            { id: 5, sender: "user", text: "Entendi, obrigado pela explicação detalhada!", time: "10:04" }
        ]
    },
    {
        id: "8", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Consulta NFe", time: "Hoje, 11:55", contact: "(67) 981**-3344", rating: null, protocol: "445566", isOnline: true,
        history: [
            { id: 1, sender: "user", text: "Como faço para consultar uma NF-e usando a chave de acesso?", time: "11:50" },
            { id: 2, sender: "bot", text: "Você pode consultar pelo Portal Nacional da NF-e: www.nfe.fazenda.gov.br. Basta inserir a chave de 44 dígitos no campo de consulta.", time: "11:51" },
            { id: 3, sender: "user", text: "A página está fora do ar...", time: "11:52" },
            { id: 4, sender: "bot", text: "Verificando... Realmente há uma instabilidade no portal federal. Alternativamente, você pode consultar pelo nosso portal estadual em www.sefaz.ms.gov.br/nfe", time: "11:53" }
        ]
    },
    {
        id: "9", sentiment: "Crítico", sentimentColor: "text-red-500", sentimentBg: "bg-red-50 dark:bg-red-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Erro no sistema", time: "Hoje, 11:52", contact: "(67) 993**-5566", rating: null, protocol: "778899", isOnline: true,
        history: [
            { id: 1, sender: "user", text: "O sistema de emissão de NF-e está retornando erro de timeout constantemente!", time: "11:40" },
            { id: 2, sender: "bot", text: "Olá! Lamento pelo inconveniente. Estamos cientes de uma instabilidade no webservice. A equipe técnica está trabalhando na solução.", time: "11:41" },
            { id: 3, sender: "user", text: "Isso está me causando prejuízo! Tenho caminhões parados esperando nota!", time: "11:42", emotion: "irritated" },
            { id: 4, sender: "bot", text: "Entendo a urgência. Como contingência, você pode emitir em modo offline (NFC-e) ou utilizar o SCAN. Posso orientá-lo?", time: "11:43" },
            { id: 5, sender: "user", text: "Minha empresa não está habilitada para SCAN!", time: "11:44", emotion: "irritated" },
            { type: "system", text: "Usuário solicitou transbordo humano" }
        ]
    },
    { id: "10", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Agendamento", time: "Hoje, 11:50", contact: "(67) 994**-7788", rating: 5, protocol: "990011", isOnline: false, history: [] },
    { id: "11", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Expirado", statusColor: "text-gray-500 bg-gray-100 dark:bg-gray-500/10", theme: "Certidão Negativa", time: "Hoje, 11:48", contact: "(67) 995**-9900", rating: 0, protocol: "223344", isOnline: false, history: [] },
    { id: "12", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Parcelamento", time: "Hoje, 11:45", contact: "(67) 996**-1122", rating: 4, protocol: "556677", isOnline: false, history: [] },
    { id: "13", sentiment: "Irritado", sentimentColor: "text-orange-500", sentimentBg: "bg-orange-50 dark:bg-orange-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Reclamação", time: "Hoje, 11:42", contact: "(67) 997**-3344", rating: null, protocol: "889900", isOnline: true, history: [] },
    { id: "14", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Informações gerais", time: "Hoje, 11:40", contact: "(67) 998**-5566", rating: 5, protocol: "112244", isOnline: false, history: [] },
    { id: "15", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Atualização cadastral", time: "Hoje, 11:38", contact: "(67) 999**-7788", rating: 3, protocol: "335566", isOnline: false, history: [] },
    { id: "16", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Emissão de guia", time: "Hoje, 11:35", contact: "(67) 991**-8899", rating: 5, protocol: "778811", isOnline: false, history: [] },
    { id: "17", sentiment: "Crítico", sentimentColor: "text-red-500", sentimentBg: "bg-red-50 dark:bg-red-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Sistema lento", time: "Hoje, 11:32", contact: "(67) 992**-0011", rating: null, protocol: "990022", isOnline: true, history: [] },
    { id: "18", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Consulta débitos", time: "Hoje, 11:30", contact: "(67) 993**-2233", rating: 4, protocol: "112255", isOnline: false, history: [] },
    { id: "19", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Expirado", statusColor: "text-gray-500 bg-gray-100 dark:bg-gray-500/10", theme: "Dúvidas IPVA", time: "Hoje, 11:28", contact: "(67) 994**-4455", rating: 0, protocol: "334466", isOnline: false, history: [] },
    { id: "20", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Restituição", time: "Hoje, 11:25", contact: "(67) 995**-6677", rating: 5, protocol: "556688", isOnline: false, history: [] },
    { id: "21", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Dúvida Simples", time: "Hoje, 11:20", contact: "(67) 996**-1122", rating: null, protocol: "112299", isOnline: true, history: [] },
    { id: "22", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Atualização de dados", time: "Hoje, 11:15", contact: "(67) 997**-3344", rating: 5, protocol: "334400", isOnline: false, history: [] },
    { id: "23", sentiment: "Crítico", sentimentColor: "text-red-500", sentimentBg: "bg-red-50 dark:bg-red-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Erro de Acesso", time: "Hoje, 11:10", contact: "(67) 998**-5566", rating: null, protocol: "556611", isOnline: true, history: [] },
    { id: "24", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Informação Tributária", time: "Hoje, 11:05", contact: "(67) 999**-7788", rating: 4, protocol: "778822", isOnline: false, history: [] },
    { id: "25", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Expirado", statusColor: "text-gray-500 bg-gray-100 dark:bg-gray-500/10", theme: "Consulta Processo", time: "Hoje, 11:00", contact: "(67) 991**-9900", rating: 0, protocol: "990033", isOnline: false, history: [] },
    { id: "26", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Parcelamento IPVA", time: "Hoje, 10:55", contact: "(67) 992**-1133", rating: 5, protocol: "113344", isOnline: false, history: [] },
    { id: "27", sentiment: "Irritado", sentimentColor: "text-orange-500", sentimentBg: "bg-orange-50 dark:bg-orange-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Reclamação Atendimento", time: "Hoje, 10:50", contact: "(67) 993**-3355", rating: null, protocol: "335566", isOnline: true, history: [] },
    { id: "28", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Elogio", time: "Hoje, 10:45", contact: "(67) 994**-5577", rating: 5, protocol: "557788", isOnline: false, history: [] },
    { id: "29", sentiment: "Neutro", sentimentColor: "text-gray-500", sentimentBg: "bg-gray-50 dark:bg-gray-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "Simples Nacional", time: "Hoje, 10:40", contact: "(67) 995**-7799", rating: 4, protocol: "779900", isOnline: false, history: [] },
    { id: "30", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Fechado", statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", theme: "Dúvida ITCD", time: "Hoje, 10:35", contact: "(67) 996**-9911", rating: 5, protocol: "991122", isOnline: false, history: [] },
    { id: "31", sentiment: "Crítico", sentimentColor: "text-red-500", sentimentBg: "bg-red-50 dark:bg-red-500/10", status: "Em andamento", statusColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10", theme: "Sistema Indisponível", time: "Hoje, 10:30", contact: "(67) 997**-1133", rating: null, protocol: "113344", isOnline: true, history: [] },
    { id: "32", sentiment: "Positivo", sentimentColor: "text-green-500", sentimentBg: "bg-green-50 dark:bg-green-500/10", status: "Resolvido", statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10", theme: "CAD-ICMS", time: "Hoje, 10:25", contact: "(67) 998**-3355", rating: 4, protocol: "335566", isOnline: false, history: [] },
];


export default function ConversasPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const itemsPerPage = 6;

    const [allConversations, setAllConversations] = useState<any>(conversations);
    const [assumedConversations, setAssumedConversations] = useState<Set<string>>(new Set());
    const [messageInput, setMessageInput] = useState("");

    const filteredConversations = useMemo(() => {
        return allConversations.filter((c: any) =>
            c.contact.includes(searchQuery) ||
            c.protocol.includes(searchQuery) ||
            c.theme.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, allConversations]);

    const totalPages = Math.ceil(filteredConversations.length / itemsPerPage);
    const paginatedConversations = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredConversations.slice(start, start + itemsPerPage);
    }, [filteredConversations, currentPage]);

    const selectedConv = useMemo(() => {
        return allConversations.find((c: any) => c.id === selectedConvId) || null;
    }, [selectedConvId, allConversations]);

    const handleAssumirConversa = () => {
        if (!selectedConvId) return;

        const attendantName = "Kerah Datto";
        const initialMessage = `👤 **Atendimento humano iniciado**\nOlá! Meu nome é **${attendantName}** e, a partir de agora, sou eu quem continuará seu atendimento.\nPode me contar melhor o que está acontecendo?`;

        setAssumedConversations(prev => new Set(prev).add(selectedConvId));
        setAllConversations((prev: any[]) => prev.map((conv: any) => {
            if (conv.id === selectedConvId) {
                return {
                    ...conv,
                    history: [
                        ...conv.history,
                        {
                            id: conv.history.length + 1,
                            sender: "bot",
                            text: initialMessage,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                    ]
                };
            }
            return conv;
        }));
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedConvId) return;

        setAllConversations((prev: any[]) => prev.map((conv: any) => {
            if (conv.id === selectedConvId) {
                return {
                    ...conv,
                    history: [
                        ...conv.history,
                        {
                            id: conv.history.length + 1,
                            sender: "bot",
                            text: messageInput,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                    ]
                };
            }
            return conv;
        }));
        setMessageInput("");
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#080B14] transition-colors duration-300">
            <Header />

            <main className="flex-1 flex flex-col p-8 space-y-6 max-w-[1600px] mx-auto w-full min-h-0">

                {/* TOP SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-shrink-0">
                    <div className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Atendimentos em Andamento</h3>
                            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-100 dark:border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Ao vivo
                            </span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">142</span>
                            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                <TrendingUp className="w-4 h-4" />
                                12% <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium ml-1">vs. hora anterior</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Sentimento Geral</h3>
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Smile className="w-6 h-6" />
                            </div>
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Positivo</h4>
                        <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full flex overflow-hidden">
                            <div className="h-full bg-red-400 w-[15%]" />
                            <div className="h-full bg-orange-400 w-[20%]" />
                            <div className="h-full bg-yellow-400 w-[25%]" />
                            <div className="h-full bg-emerald-500 flex-1" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#121826] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">Solicitação de Transbordo Humano</h3>
                            <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">5</span>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                <Clock className="w-4 h-4" />
                                <span className="text-gray-400 font-medium">Tempo da fila de espera</span>
                                <span className="text-blue-600 dark:text-blue-400 ml-1">2min</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MONITORING SECTION */}
                <div className="flex-1 bg-white dark:bg-[#121826] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col min-h-0">

                    <div className="p-5 border-b border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Monitoramento em Tempo Real</h2>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-2 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm">
                                <Filter className="w-4 h-4" />
                                Filtrar
                            </button>
                            <div className="relative w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar por contato, protocolo ou tema"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border-none rounded-xl text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-slate-900/40 text-[11px] font-black text-gray-500 dark:text-slate-500 uppercase tracking-widest text-left">
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Termômetro</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Status</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Tema</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Data e Hora</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Contato</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Avaliação</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Protocolo</th>
                                    <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {paginatedConversations.length > 0 ? paginatedConversations.map((conv: any) => (
                                    <tr key={conv.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center", conv.sentimentBg)}>
                                                    {conv.sentiment === "Crítico" && <Frown className={clsx("w-4 h-4", conv.sentimentColor)} />}
                                                    {conv.sentiment === "Positivo" && <Smile className={clsx("w-4 h-4", conv.sentimentColor)} />}
                                                    {conv.sentiment === "Neutro" && <Meh className={clsx("w-4 h-4", conv.sentimentColor)} />}
                                                    {conv.sentiment === "Irritado" && <Angry className={clsx("w-4 h-4", conv.sentimentColor)} />}
                                                </div>
                                                <span className={clsx("text-sm font-bold", conv.sentimentColor)}>{conv.sentiment}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={clsx("px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider", conv.statusColor)}>
                                                {conv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">{conv.theme}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-500">{conv.time}</td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight">{conv.contact}</td>
                                        <td className="px-6 py-4">
                                            {conv.rating === null ? (
                                                <span className="text-gray-300 dark:text-white/10 text-xl font-bold">-</span>
                                            ) : conv.rating === 0 ? (
                                                <span className="text-xs text-gray-400 dark:text-slate-600 font-medium">Sem avaliação</span>
                                            ) : (
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={clsx("w-3.5 h-3.5", i < (conv.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-slate-800")} />
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-400 dark:text-slate-600">#{conv.protocol}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => setSelectedConvId(conv.id)}
                                                className="px-4 py-2 text-xs font-black bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-95 shadow-sm"
                                            >
                                                Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-20 text-center text-gray-500 dark:text-slate-500 font-medium">
                                            Nenhuma conversa encontrada para "{searchQuery}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-slate-900/40 flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-500 dark:text-slate-500">
                            Mostrando <span className="text-slate-900 dark:text-white font-black">{paginatedConversations.length}</span> de <span className="text-slate-900 dark:text-white font-black">{filteredConversations.length}</span> resultados
                        </p>
                        <div className="flex items-center gap-0.5 border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
                            <button onClick={() => setCurrentPage(1)} className={clsx("w-9 h-9 flex items-center justify-center text-sm font-medium transition-colors border-r border-gray-200 dark:border-white/10", currentPage === 1 ? "bg-blue-600 text-white" : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5")}>1</button>
                            {totalPages >= 2 && <button onClick={() => setCurrentPage(2)} className={clsx("w-9 h-9 flex items-center justify-center text-sm font-medium transition-colors border-r border-gray-200 dark:border-white/10", currentPage === 2 ? "bg-blue-600 text-white" : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5")}>2</button>}
                            {totalPages >= 3 && <button onClick={() => setCurrentPage(3)} className={clsx("w-9 h-9 flex items-center justify-center text-sm font-medium transition-colors border-r border-gray-200 dark:border-white/10", currentPage === 3 ? "bg-blue-600 text-white" : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5")}>3</button>}
                            {totalPages > 4 && <span className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 dark:text-slate-600 border-r border-gray-200 dark:border-white/10">...</span>}
                            {totalPages > 3 && <button onClick={() => setCurrentPage(totalPages)} className={clsx("w-9 h-9 flex items-center justify-center text-sm font-medium transition-colors border-r border-gray-200 dark:border-white/10", currentPage === totalPages ? "bg-blue-600 text-white" : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5")}>{totalPages}</button>}
                            <button className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 border-r border-gray-200 dark:border-white/10" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}><ChevronLeft className="w-4 h-4" /></button>
                            <button className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </main>

            {/* CHAT DETAILS SIDE SHEET */}
            {selectedConv && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setSelectedConvId(null)} />
                    <div className="relative w-full max-w-xl bg-white dark:bg-[#0B0F1A] h-screen shadow-2xl flex flex-col border-l dark:border-white/5 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 dark:border-white/5 flex items-start justify-between flex-shrink-0">
                            <div className="flex flex-col gap-1.5 flex-1 mr-6">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedConv.contact}</h3>
                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium border border-emerald-100 dark:border-emerald-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Online
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 w-full text-xs text-gray-500 dark:text-slate-500">
                                    <span className="text-left">Status: <span className="text-orange-500 font-medium">{selectedConv.status}</span></span>
                                    <span className="text-center">Tema: <span className="text-slate-700 dark:text-slate-300 font-medium">{selectedConv.theme}</span></span>
                                    <span className="text-right">Protocolo: <span className="text-slate-700 dark:text-slate-300 font-medium">{selectedConv.protocol}</span></span>
                                </div>
                            </div>
                            <button onClick={() => setSelectedConvId(null)} className="p-1.5 text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto p-5 bg-white dark:bg-[#0B0F1A]">
                            <div className="text-center mb-6">
                                <span className="text-xs text-gray-400 dark:text-slate-500">{selectedConv.time}</span>
                            </div>
                            <div className="space-y-4">

                                {selectedConv.history.length > 0 ? selectedConv.history.map((msg: any, idx: number) => {
                                    if (msg.type === "system") {
                                        return (
                                            <div key={idx} className="flex justify-center my-6">
                                                <span className="px-4 py-2 rounded-full border border-red-200 dark:border-red-500/20 text-red-500 dark:text-red-400 text-xs font-medium">{msg.text}</span>
                                            </div>
                                        );
                                    }
                                    const isBot = msg.sender === "bot";
                                    return (
                                        <div key={idx} className={clsx("flex flex-col", isBot ? "items-start" : "items-end")}>
                                            <div className={clsx("max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line", isBot ? "bg-gray-100 dark:bg-[#1a1f2e] text-gray-800 dark:text-gray-200 rounded-tl-sm" : "bg-[#1B4D89] text-white rounded-tr-sm")}>
                                                {msg.text.split(/\*\*(.*?)\*\*/g).map((part: string, index: number) =>
                                                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                                                )}
                                            </div>
                                            <span className="text-[10px] text-gray-400 dark:text-slate-500 mt-1.5 px-1">{msg.time}</span>
                                            {msg.emotion === "irritated" && (
                                                <div className="mt-2 flex items-center gap-1.5 text-red-500 dark:text-red-400">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-medium">Sentimento irritado detectado</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }) : (
                                    <div className="h-full flex items-center justify-center flex-col text-gray-400 gap-2 opacity-50 py-20">
                                        <Headset className="w-12 h-12" />
                                        <p className="text-sm font-medium">Nenhum histórico disponível</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-5 border-t border-gray-100 dark:border-white/5 space-y-2 bg-white dark:bg-[#0B0F1A] flex-shrink-0">
                            {assumedConversations.has(selectedConv.id) ? (
                                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Digite uma mensagem..."
                                        className="flex-1 p-3 bg-gray-50 dark:bg-[#121826] border-none rounded-xl text-sm dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        disabled={!messageInput.trim()}
                                        className="p-3 bg-[#1B4D89] hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <button
                                        onClick={handleAssumirConversa}
                                        className="w-full bg-[#1B4D89] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                                    >
                                        <Headset className="w-5 h-3" />
                                        Assumir conversa
                                    </button>
                                    <p className="text-[11px] text-center text-gray-400 dark:text-slate-500">Ao assumir o Chatbot será desativado para este usuário.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

