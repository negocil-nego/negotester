<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui'

const { data: plans, pending, error } = await useFetch<PricingPlanProps[]>('/api/plan-services')
</script>

<template>
    <div class="py-12 md:px-10 lg:max-w-10/12 m-auto" id="plans">
        <div class="flex flex-col justify-center items-center gap-2 mb-5 md:mb-10">
            <div class="font-display text-xl md:text-2xl lg:text-4xl font-bold leading-tight tracking-tight mb-6">
                <span>Escolha o plano ideal </span>
                <span class="text-primary">para o seu negócio</span>
            </div>
            <p class="text-hero-muted text-md max-w-xl leading-relaxed text-center">
                Planos flexíveis e acessíveis para atender às necessidades do seu negócio, com preços que cabem no seu
                bolso e recursos que impulsionam o seu negócio, escolha o plano ideal para o seu negócio.
            </p>
        </div>
        <div v-if="pending" class="flex justify-center items-center py-20">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin w-8 h-8 text-primary" />
        </div>

        <div v-else-if="error" class="text-center text-red-500 py-10">
            <p>Ocorreu um erro ao carregar os planos.</p>
        </div>

        <div v-else-if="plans && plans.length === 0" class="text-center text-gray-500 py-10">
            <p>Nenhum plano encontrado.</p>
        </div>

        <UPricingPlans v-else :plans="plans" />
    </div>
</template>