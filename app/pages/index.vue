<template>
    <div class="h-screen">
        <!-- Header -->
        <header
            class="absolute top-0 left-0 right-0 bg-hero text-hero-foreground sticky top-0 z-50 border-b border-hero-foreground/10 backdrop-blur-sm bg-hero/95">
            <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div class="flex justify-start relative">
                    <Logo />
                </div>
                <div class="flex gap-2 md:gap-5">
                    <UButton href="/login" class="rounded-full">
                        Entra
                    </UButton>
                    <UButton href="/register" class="rounded-full">
                        Registrar
                    </UButton>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="bg-hero mx-auto px-6 text-hero-foreground relative">
            <div class="absolute inset-0 opacity-[0.04]" :style="{
                backgroundImage: 'linear-gradient(hsl(120 100% 100%) 1px, transparent 2px), linear-gradient(90deg, hsl(120 100% 100%) 2px, transparent 2px)',
                backgroundSize: '60px 60px'
            }" />
            <div class="flex flex-col lg:flex-row-reverse items-center justify-between max-w-6xl mx-auto lg:gap-10">
                <div class="self-start m-auto">
                    <DotLottieVue style="height: 450px; width: 450px" autoplay loop
                        src="/development-on-desktop.lottie" />
                </div>
                <div>
                    <div class="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
                        <span>Software com </span>
                        <span class="text-primary">qualidade <br /> </span>
                        <span>garantida.</span>
                    </div>
                    <p class="text-hero-muted text-md md:text-lg max-w-xl mb-6 leading-relaxed">
                        Serviços especializados em QA, consultoria, documentação técnica e contratação de equipas de
                        desenvolvimento à medida do seu projeto.
                    </p>
                    <div class="flex flex-col md:flex-row gap-2 md:gap-4">
                        <UButton color="primary" variant="solid">
                            Contacte-nos
                        </UButton>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section class="bg-hero-foreground text-hero-foreground mx-auto">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 ">
                    <div class="font-display text-xl md:text-2xl font-bold leading-tight tracking-tight mb-6">
                        <span>Os nossos </span>
                        <span class="text-primary">serviços </span>
                        <span>para o seu negócio.</span>
                    </div>
                    <p class="text-hero-muted text-md  max-w-xl mb-10 leading-relaxed">
                        Serviços especializados em QA, consultoria, documentação técnica e contratação de equipas de
                        desenvolvimento à medida do seu projeto.
                    </p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    <UCard v-for="service in services" :key="service.title" variant="soft">
                        <template #header>
                            <div class="flex items-center gap-2">
                                <Icon :name="service.icon" class="text-base text-primary" size="34" />
                                <div class="font-display text-md font-bold">{{ service.title }}</div>
                            </div>
                        </template>
                        <span class="text-sm">{{ service.description }}</span>
                        <template #footer>
                            <div class="flex items-center gap-2  justify-start">
                                <UButton color="primary" size="sm" variant="outline">Ver mais</UButton>
                                <UButton color="primary" size="sm" variant="soft">Solicitar</UButton>
                            </div>
                        </template>
                    </UCard>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <section class="max-w-6xl mx-auto md:py-20">
            <UFooterColumns :columns="columns">
                <template #right>
                    <UFormField name="email" label="Subscrição no nosso newsletter" size="lg">
                        <UInput type="email" class="w-full">
                            <template #trailing>
                                <UButton type="submit" size="xs" color="neutral" label="Subscrever" />
                            </template>
                        </UInput>
                    </UFormField>
                </template>
            </UFooterColumns>
        </section>
    </div>
</template>
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import type { FooterColumn } from '@nuxt/ui';


const services = [
    {
        title: "QA & Testes de Software",
        description: "Testes automatizados, manuais, de performance e segurança. Garantimos que o seu produto chega ao mercado sem falhas.",
        icon: `lucide:app-window`,
    },
    {
        title: "Consultoria de Software",
        description: "Análise de arquitetura, revisão de código, otimização de processos e estratégia tecnológica para o seu negócio.",
        icon: `lucide:clipboard-list`,
    },
    {
        title: "Equipas de Desenvolvimento",
        description: "Contratação e gestão de equipas dedicadas de programadores seniores, prontas para integrar o seu projeto.",
        icon: `lucide:users`,
    },
    {
        title: "Documentação Técnica",
        description: "Criação e manutenção de documentação de projetos, APIs, manuais de utilizador e guias técnicos de alta qualidade.",
        icon: `lucide:file-text`,
    }
];

const columns: FooterColumn[] = [
    {
        label: 'Community',
        children: [
            {
                label: 'Nuxters',
                to: 'https://nuxters.nuxt.com',
                target: '_blank'
            },
            {
                label: 'Video Courses',
                to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
                target: '_blank'
            },
            {
                label: 'Nuxt on GitHub',
                to: 'https://github.com/nuxt',
                target: '_blank'
            }
        ]
    },
    {
        label: 'Solutions',
        children: [
            {
                label: 'Nuxt Content',
                to: 'https://content.nuxt.com/',
                target: '_blank'
            },
            {
                label: 'Nuxt DevTools',
                to: 'https://devtools.nuxt.com/',
                target: '_blank'
            },
            {
                label: 'Nuxt Image',
                to: 'https://image.nuxt.com/',
                target: '_blank'
            },
            {
                label: 'Nuxt UI',
                to: 'https://ui.nuxt.com/',
                target: '_blank'
            }
        ]
    }
]
</script>