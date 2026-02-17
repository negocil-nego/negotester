<template>
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
            <UCard v-for="service in data" :key="service.id" variant="soft">
                <template #header>
                    <div class="flex items-center gap-2">
                        <Icon v-if="service.icon" :name="service.icon" class="text-base text-primary" size="34" />
                        <div class="font-display text-md font-bold">{{ service.name }}</div>
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
</template>

<script setup lang="ts">
import type { Category } from '~/types';
const { data } = await useFetch<Category[]>('/api/categories');
</script>