<script setup lang="ts">
const currentYear = new Date().getFullYear();

const services = [
    {
        title: "QA & Testes de Software",
        description: "Testes automatizados, manuais, de performance e segurança. Garantimos que o seu produto chega ao mercado sem falhas.",
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>`,
    },
    {
        title: "Consultoria de Software",
        description: "Análise de arquitetura, revisão de código, otimização de processos e estratégia tecnológica para o seu negócio.",
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>`,
    },
    {
        title: "Equipas de Desenvolvimento",
        description: "Contratação e gestão de equipas dedicadas de programadores seniores, prontas para integrar o seu projeto.",
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
    },
    {
        title: "Documentação Técnica",
        description: "Criação e manutenção de documentação de projetos, APIs, manuais de utilizador e guias técnicos de alta qualidade.",
        icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      <path d="M8 7h6"/>
      <path d="M8 11h8"/>
    </svg>`,
    },
];

const stats = [
    { value: "150+", label: "Projetos entregues" },
    { value: "98%", label: "Taxa de satisfação" },
    { value: "40+", label: "Especialistas" },
    { value: "8+", label: "Anos de experiência" },
];

const steps = [
    { num: "01", title: "Análise", desc: "Avaliamos o seu projeto e identificamos necessidades." },
    { num: "02", title: "Planeamento", desc: "Definimos estratégia, equipa e cronograma." },
    { num: "03", title: "Execução", desc: "Implementamos com agilidade e qualidade." },
    { num: "04", title: "Entrega", desc: "Validamos resultados e garantimos suporte contínuo." },
];

const team = [
    {
        name: "Ana Rodrigues",
        role: "QA Lead",
        bio: "12 anos de experiência em testes automatizados e gestão de qualidade.",
        initials: "AR",
    },
    {
        name: "Carlos Silva",
        role: "CTO & Consultor",
        bio: "Especialista em arquitetura de software e transformação digital.",
        initials: "CS",
    },
    {
        name: "Maria Santos",
        role: "Tech Writer",
        bio: "Documentação técnica clara e acessível para equipas e utilizadores.",
        initials: "MS",
    },
    {
        name: "João Ferreira",
        role: "Dev Team Lead",
        bio: "Gestão de equipas ágeis e entrega de projetos de alta complexidade.",
        initials: "JF",
    },
    {
        name: "Sofia Mendes",
        role: "QA Engineer",
        bio: "Automação de testes, CI/CD e garantia de qualidade contínua.",
        initials: "SM",
    },
    {
        name: "Ricardo Alves",
        role: "Full-Stack Dev",
        bio: "Desenvolvimento web moderno com foco em performance e escalabilidade.",
        initials: "RA",
    },
];

const footerLinks = {
    servicos: [
        { label: "QA & Testes", href: "#servicos" },
        { label: "Consultoria", href: "#servicos" },
        { label: "Equipas", href: "#servicos" },
        { label: "Documentação", href: "#servicos" },
    ],
    empresa: [
        { label: "Sobre Nós", href: "#equipa" },
        { label: "Equipa", href: "#equipa" },
        { label: "Processo", href: "#servicos" },
        { label: "Contacto", href: "#contacto" },
    ],
};
</script>

<template>
    <div class="min-h-screen">
        <!-- Header -->
        <header
            class="bg-hero text-hero-foreground sticky top-0 z-50 border-b border-hero-foreground/10 backdrop-blur-sm bg-hero/95">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div class="font-display font-bold text-xl">QualityDev</div>
                <nav class="hidden md:flex items-center gap-8 text-sm text-hero-muted">
                    <a href="#servicos" class="hover:text-hero-foreground transition-colors">Serviços</a>
                    <a href="#equipa" class="hover:text-hero-foreground transition-colors">Equipa</a>
                    <a href="#contacto" class="hover:text-hero-foreground transition-colors">Contacto</a>
                </nav>
                <a href="#contacto"
                    class="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Fale Connosco
                </a>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="bg-hero text-hero-foreground relative overflow-hidden">
            <div class="absolute inset-0 opacity-[0.04]" :style="{
                backgroundImage: 'linear-gradient(hsl(220 80% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 80% 50%) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }" />
            <div class="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div class="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div class="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
                <div class="max-w-3xl">
                    <div
                        class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
                        <span class="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        Qualidade &middot; Consultoria &middot; Equipas &middot; Documentação
                    </div>

                    <h1 class="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                        Software com
                        <span class="text-primary">qualidade</span>
                        <br />
                        garantida.
                    </h1>

                    <p class="text-hero-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                        Serviços especializados em QA, consultoria, documentação técnica e contratação de equipas de
                        desenvolvimento à medida do seu projeto.
                    </p>

                    <div class="flex flex-wrap gap-4">
                        <a href="#servicos"
                            class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Nossos Serviços
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m6 17 5-5-5-5" />
                                <path d="m13 17 5-5-5-5" />
                            </svg>
                        </a>
                        <a href="#contacto"
                            class="inline-flex items-center gap-2 border border-hero-muted/30 text-hero-foreground px-6 py-3 rounded-lg font-medium hover:bg-hero-foreground/5 transition-colors">
                            Fale Connosco
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="servicos" class="py-20 md:py-28 max-w-6xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-primary font-medium text-sm uppercase tracking-widest mb-3">Serviços</p>
                <h2 class="font-display text-3xl md:text-4xl font-bold mb-4">O que fazemos</h2>
                <p class="text-muted-foreground max-w-lg mx-auto">
                    Soluções completas para garantir a excelência do seu software em todas as fases.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="service in services" :key="service.title"
                    class="group bg-card border border-border rounded-xl p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                    <div class="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                        v-html="service.icon" />
                    <h3 class="font-display text-lg font-semibold mb-3">{{ service.title }}</h3>
                    <p class="text-muted-foreground text-sm leading-relaxed">{{ service.description }}</p>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="bg-hero text-hero-foreground py-16 relative overflow-hidden">
            <div class="absolute inset-0 opacity-[0.03]" :style="{
                backgroundImage: 'radial-gradient(circle, hsl(220 80% 50%) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }" />
            <div class="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div v-for="stat in stats" :key="stat.label" class="text-center">
                    <div class="font-display text-3xl md:text-4xl font-bold text-primary mb-2">{{ stat.value }}</div>
                    <div class="text-hero-muted text-sm">{{ stat.label }}</div>
                </div>
            </div>
        </section>

        <!-- Process Section -->
        <section class="py-20 md:py-28 max-w-6xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-primary font-medium text-sm uppercase tracking-widest mb-3">Processo</p>
                <h2 class="font-display text-3xl md:text-4xl font-bold mb-4">Como trabalhamos</h2>
                <p class="text-muted-foreground max-w-lg mx-auto">
                    Um processo claro e transparente do início ao fim.
                </p>
            </div>

            <div class="grid md:grid-cols-4 gap-6">
                <div v-for="(step, index) in steps" :key="step.num" class="relative">
                    <div v-if="index < steps.length - 1"
                        class="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                    <div class="font-display text-5xl font-bold text-primary/15 mb-3">{{ step.num }}</div>
                    <h3 class="font-display text-lg font-semibold mb-2">{{ step.title }}</h3>
                    <p class="text-muted-foreground text-sm leading-relaxed">{{ step.desc }}</p>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section id="equipa" class="py-20 md:py-28 bg-secondary/50">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-16">
                    <p class="text-primary font-medium text-sm uppercase tracking-widest mb-3">Equipa</p>
                    <h2 class="font-display text-3xl md:text-4xl font-bold mb-4">Conheça a nossa equipa</h2>
                    <p class="text-muted-foreground max-w-lg mx-auto">
                        Profissionais experientes e apaixonados por tecnologia e qualidade.
                    </p>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="member in team" :key="member.name"
                        class="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/15 transition-all duration-300 group">
                        <div class="flex items-center gap-4 mb-4">
                            <div
                                class="w-14 h-14 rounded-full bg-hero text-primary font-display font-bold text-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                {{ member.initials }}
                            </div>
                            <div>
                                <h3 class="font-display font-semibold text-lg">{{ member.name }}</h3>
                                <p class="text-primary text-sm font-medium">{{ member.role }}</p>
                            </div>
                        </div>
                        <p class="text-muted-foreground text-sm leading-relaxed">{{ member.bio }}</p>
                        <div class="flex gap-3 mt-4 pt-4 border-t border-border">
                            <a href="#" class="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="#" class="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="GitHub">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section id="contacto" class="py-20 md:py-28 max-w-6xl mx-auto px-6">
            <div class="bg-hero text-hero-foreground rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
                <div class="absolute inset-0 opacity-[0.03]" :style="{
                    backgroundImage: 'radial-gradient(circle, hsl(220 80% 50%) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }" />
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div class="relative">
                    <h2 class="font-display text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
                    <p class="text-hero-muted max-w-md mx-auto mb-8">
                        Fale connosco e descubra como podemos elevar a qualidade do seu software.
                    </p>
                    <a href="mailto:contacto@exemplo.com"
                        class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Contactar
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-hero text-hero-foreground border-t border-hero-foreground/10">
            <div class="max-w-6xl mx-auto px-6 py-16">
                <div class="grid md:grid-cols-4 gap-10 mb-12">
                    <!-- Brand -->
                    <div class="md:col-span-2">
                        <div class="font-display font-bold text-2xl mb-4">QualityDev</div>
                        <p class="text-hero-muted text-sm leading-relaxed max-w-sm mb-6">
                            Garantimos a qualidade do seu software com serviços especializados de QA, consultoria,
                            documentação técnica e equipas dedicadas.
                        </p>
                        <div class="flex gap-4">
                            <a href="#"
                                class="w-9 h-9 rounded-lg bg-hero-foreground/5 border border-hero-foreground/10 flex items-center justify-center text-hero-muted hover:text-primary hover:border-primary/30 transition-colors"
                                aria-label="LinkedIn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-9 h-9 rounded-lg bg-hero-foreground/5 border border-hero-foreground/10 flex items-center justify-center text-hero-muted hover:text-primary hover:border-primary/30 transition-colors"
                                aria-label="GitHub">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>
                            <a href="mailto:contacto@exemplo.com"
                                class="w-9 h-9 rounded-lg bg-hero-foreground/5 border border-hero-foreground/10 flex items-center justify-center text-hero-muted hover:text-primary hover:border-primary/30 transition-colors"
                                aria-label="Email">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Links -->
                    <div>
                        <h4 class="font-display font-semibold text-sm uppercase tracking-widest mb-4">Serviços</h4>
                        <ul class="space-y-3">
                            <li v-for="link in footerLinks.servicos" :key="link.label">
                                <a :href="link.href"
                                    class="text-hero-muted text-sm hover:text-hero-foreground transition-colors">
                                    {{ link.label }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-display font-semibold text-sm uppercase tracking-widest mb-4">Empresa</h4>
                        <ul class="space-y-3">
                            <li v-for="link in footerLinks.empresa" :key="link.label">
                                <a :href="link.href"
                                    class="text-hero-muted text-sm hover:text-hero-foreground transition-colors">
                                    {{ link.label }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom bar -->
                <div
                    class="border-t border-hero-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-hero-muted">
                    <p>&copy; {{ currentYear }} QualityDev. Todos os direitos reservados.</p>
                    <div class="flex gap-6">
                        <a href="#" class="hover:text-hero-foreground transition-colors">Política de Privacidade</a>
                        <a href="#" class="hover:text-hero-foreground transition-colors">Termos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>