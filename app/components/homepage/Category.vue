<template>
    <div class="max-w-6xl mx-auto flex flex-col gap-5 justify-center items-center text-center">
        <div class="flex flex-col justify-center items-center gap-2 mb-5">
            <div class="font-display text-xl md:text-2xl lg:text-4xl font-bold leading-tight tracking-tight mb-6">
                <span>Os nossos </span>
                <span class="text-primary">serviços </span>
                <span>para o seu negócio</span>
            </div>
            <p class="text-hero-muted text-md max-w-xl leading-relaxed text-center">
                Serviços especializados em QA, consultoria, documentação técnica à medida do seu projeto.
            </p>
        </div>
        <div :class="{
            'grid grid-cols-1 gap-4 md:gap-6 lg:gap-15': true,
            'lg:grid-cols-4': data!.length % 4 == 0,
            'lg:grid-cols-3': data!.length % 3 == 0
        }">
            <div v-for="category in data" :key="category.id" variant="soft"
                class="md:w-[450px] mx-auto p-5 rounded-2xl flex flex-col gap-5 md:justify-between">
                <div class="flex flex-col items-center gap-2">
                    <Icon v-if="category.icon" :name="category.icon" class="text-base text-primary" size="40" />
                    <div class="font-display text-md font-bold">
                        {{ category.name }}
                    </div>
                </div>
                <div class="text-sm my-2 text-center md:px-10">{{ category.description }}</div>
                <div class="flex items-center gap-2 justify-center">
                    <UButton variant="outline" class="lg:p-4 rounded-full md:min-w-[200px] md:justify-center">
                        Solicitar
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types"

const { data } = await useFetch<Category[]>("/api/categories")
</script>
