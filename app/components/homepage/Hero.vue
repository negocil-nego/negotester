<template>
    <div class="flex flex-col lg:flex-row-reverse items-center justify-between max-w-6xl mx-auto lg:gap-10">
        <div class="self-start m-auto">
            <DotLottieVue autoplay loop src="/development-on-desktop.lottie" />
        </div>
        <div>
            <div
                class="font-display text-center md:text-left text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
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
</template>
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>