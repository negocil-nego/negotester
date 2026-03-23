<template>
    <div class="max-w-7xl mx-auto px-6 md:px-8">
        <div class="text-center mb-20">
            <h2 class="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Como <span class="text-primary-container">Funciona</span>
            </h2>
            <p class="text-on-surface-variant max-w-2xl mx-auto">
                Um processo humano rigoroso para garantir a perfeição técnica do seu produto.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div v-for="(step, idx) in steps" :key="step.id" class="relative group">
                <div class="mb-8 relative">
                    <div
                        class="w-16 h-16 rounded-2xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center group-hover:border-primary-container/50 transition-colors">
                        <span class="text-primary-container font-headline font-black text-2xl">{{ step.id }}</span>
                    </div>
                    <div v-if="idx < steps.length - 1"
                        class="hidden lg:block absolute top-1/2 left-full w-full h-[1px] bg-gradient-to-r from-primary-container/30 to-transparent -translate-y-1/2 z-0" />
                </div>
                <h3 class="text-xl font-headline font-bold mb-3">{{ step.title }}</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed">{{ step.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const steps = [
    {
        id: "01",
        title: "Briefing & Setup",
        desc: "Entendemos o seu projeto e definimos os fluxos críticos que precisam de atenção prioritária.",
    },
    {
        id: "02",
        title: "Navegação Especializada",
        desc: "Nossos auditores navegam no seu sistema como usuários reais, sem scripts engessados ou automações.",
    },
    {
        id: "03",
        title: "Relatórios Detalhados",
        desc: "Você recebe um relatório completo com vídeos e prints de cada bug ou melhoria encontrada pela equipe.",
    },
    {
        id: "04",
        title: "Validação Final",
        desc: "Após as correções, realizamos um novo ciclo para garantir que tudo esteja impecável e pronto para o lançamento.",
    },
]
</script>