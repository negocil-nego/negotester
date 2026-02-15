import { QA_TEST } from "./categories";

export const SERVICES = [
    {
        id: 1,
        title: "Teste de Unidade (Unit Testing)",
        description: "Verifica o comportamento correto de unidades atômicas de código (funções, métodos, classes) de forma isolada, utilizando mocks/stubs para dependências externas. Foco em cobertura de lógica interna e contratos de interface.",
        icon: "lucide:shield-check",
        category: QA_TEST,
        price: 150000
    },
    {
        id: 2,
        title: "Teste de Integração (Integration Testing)",
        description: "Valida a interação correta entre módulos, serviços ou camadas (ex: API ↔ banco de dados, microserviço A ↔ B), identificando falhas em contratos de interface, serialização, transações e comunicação entre componentes.",
        icon: "lucide:plug-connected",
        category: QA_TEST,
        price: 150000
    },
    {
        id: 3,
        title: "Teste de Sistema (System Testing)",
        description: "Testa o sistema completo em ambiente controlado que simula produção, validando o atendimento integral aos requisitos funcionais e não funcionais especificados no escopo do projeto.",
        icon: "lucide:box",
        category: QA_TEST,
        price: 150000
    },
    {
        id: 4,
        title: "Teste de Aceitação / UAT",
        description: "Realizado preferencialmente pelo cliente ou usuário final (ou proxy), valida se o produto entregue atende às necessidades de negócio, critérios de aceitação e fluxos de uso real em ambiente de staging ou pré-produção.",
        icon: "lucide:user-check",
        category: QA_TEST,
        price: 170000
    },
    {
        id: 5,
        title: "Teste de Regressão (Regression Testing)",
        description: "Garante que funcionalidades previamente validadas continuam funcionando após alterações (novas features, correções, refatorações). Altamente recomendado para automação em pipelines CI/CD.",
        icon: "lucide:refresh-cw",
        category: QA_TEST,
        price: 130000
    },
    {
        id: 6,
        title: "Teste End-to-End (E2E)",
        description: "Simula o fluxo completo do usuário real através de toda a stack da aplicação (frontend → backend → banco → integrações externas), geralmente utilizando ferramentas como Cypress, Playwright ou Selenium.",
        icon: "lucide:route",
        category: QA_TEST,
        price: 250000
    },
    {
        id: 7,
        title: "Teste de Performance / Load / Stress",
        description: "Avalia tempo de resposta, throughput, escalabilidade e pontos de ruptura sob diferentes níveis de carga (normal, pico, estresse), identificando gargalos de CPU, memória, banco, rede ou concorrência.",
        icon: "lucide:activity",
        category: QA_TEST,
        price: 200000
    },
    {
        id: 8,
        title: "Teste de Segurança (Security Testing)",
        description: "Identifica vulnerabilidades conhecidas (OWASP Top 10) como injeção, autenticação fraca, exposição de dados sensíveis, falhas de autorização, XSS, CSRF, insecure deserialization, entre outros.",
        icon: "lucide:lock",
        category: QA_TEST,
        price: 210000
    },
    {
        id: 9,
        title: "Teste de API",
        description: "Valida contratos de API (REST/GraphQL/gRPC), status codes, schemas de resposta/requisição, autenticação (OAuth, JWT, API Keys), paginação, rate limiting, idempotência e tratamento de erros.",
        icon: "lucide:api",
        category: QA_TEST,
        price: 180000
    },
    {
        id: 10,
        title: "Teste Exploratório",
        description: "Abordagem não roteirizada e criativa para descoberta de defeitos em cenários não cobertos por casos de teste formais, combinando experiência do testador, heurísticas e charters de teste.",
        icon: "lucide:search",
        category: QA_TEST,
        price: 190000
    },
    {
        id: 11,
        title: "Teste de Compatibilidade",
        description: "Garante comportamento consistente em diferentes combinações de navegadores, versões, dispositivos, sistemas operacionais, resoluções de tela, orientações e redes (3G/4G/Wi-Fi).",
        icon: "lucide:monitor-smartphone",
        category: QA_TEST,
        price: 260000
    },
    {
        id: 12,
        title: "Teste de Acessibilidade (WCAG)",
        description: "Verifica conformidade com padrões WCAG 2.1/2.2 (níveis A/AA), incluindo navegação por teclado, leitores de tela (NVDA, VoiceOver), contraste, legendas, texto alternativo, foco visível e semântica HTML.",
        icon: "lucide:eye",
        category: QA_TEST,
        price: 220000
    },
    {
        id: 13,
        title: "Teste Visual / Visual Regression",
        description: "Compara snapshots pixel-a-pixel ou perceptual de telas para detectar alterações indesejadas no layout, cores, fontes ou posicionamento após alterações de código ou design system.",
        icon: "lucide:image",
        category: QA_TEST,
        price: 165000
    }
];
