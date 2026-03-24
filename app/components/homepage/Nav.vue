<template>
    <header class="fixed top-0 left-0 flex w-full p-5 items-center bg-transparent backdrop-blur-md z-50">
        <div
            class="w-full md:max-w-6xl mx-auto px-6 h-16 flex items-center justify-between border rounded-full gap-10 md:gap-20">
            <div class="md:ml-3">
                <div class="flex justify-start relative">
                    <LogoSite />
                </div>
            </div>
            <section v-if="isMobileOrTablet">
                <UDropdownMenu arrow :items="items" :ui="{
                    content: 'w-max'
                }">
                    <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
                </UDropdownMenu>
            </section>
            <section v-else class="flex items-center gap-10">
                <div>
                    <ul class="gap-2 md:gap-5 hidden md:flex">
                        <li v-for="item in items" :key="item.label">
                            <ULink :to="item.to" class="rounded-full dark:text-white"> {{ item.label }} </ULink>
                        </li>
                    </ul>
                </div>
                <div class="md:mr-3 hidden md:block">
                    <div class="flex gap-2 md:gap-5">
                        <UButton href="/login" class="rounded-full px-5" variant="outline">
                            Entra
                        </UButton>
                        <UButton href="/register" class="rounded-full px-5" variant="outline">
                            Registrar
                        </UButton>
                    </div>
                </div>
            </section>
        </div>
    </header>
</template>
<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { isMobileOrTablet } = useDevice()

const items = ref<DropdownMenuItem[]>([
    {
        label: 'Início',
        icon: 'i-lucide-home',
        to: '#'
    },
    {
        label: 'Serviços',
        icon: 'i-lucide-list',
        to: '#services'
    },
    {
        label: 'Planos',
        icon: 'i-lucide-credit-card',
        to: '#plans'
    },
    {
        label: 'Sobre',
        icon: 'i-lucide-info',
        to: '#about'
    },
    {
        type: 'separator' as const
    },
    {
        label: 'Login',
        icon: 'i-lucide-user',
        to: '/login'
    },
    {
        label: 'Registrar',
        icon: 'i-lucide-user-plus',
        to: '/register'
    }
])
</script>
