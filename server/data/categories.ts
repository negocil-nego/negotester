import type { Category } from "../../app/types"

export const QA_TEST: Category = {
    id: 1,
    title: "QA & Testes de Software",
    description: "Testes automatizados, manuais, de performance e segurança. Garantimos que o seu produto chega ao mercado sem falhas.",
    icon: `lucide:app-window`,
}

export const CONSULTING: Category = {
    id: 2,
    title: "Consultoria de Software",
    description: "Análise de arquitetura, revisão de código, otimização de processos e estratégia tecnológica para o seu negócio.",
    icon: `lucide:clipboard-list`,
}

export const TEAMS: Category = {
    id: 3,
    title: "Equipas de Desenvolvimento",
    description: "Contratação e gestão de equipas dedicadas de programadores seniores, prontas para integrar o seu projeto.",
    icon: `lucide:users`,
}

export const DOCUMENTATION: Category = {
    id: 4,
    title: "Documentação Técnica",
    description: "Criação e manutenção de documentação de projetos, APIs, manuais de utilizador e guias técnicos de alta qualidade.",
    icon: `lucide:file-text`,
}

export const CATEGORIES = [
    QA_TEST,
    CONSULTING,
    TEAMS,
    DOCUMENTATION,
]
