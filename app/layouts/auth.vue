<template>
    <div class="flex min-h-screen">
        <div class="absolute top-2 px-8 lg:px-20 z-10">
            <NuxtLink :to="backTo" class="flex gap-1 items-center">
                <Icon name="lucide:circle-arrow-left" />
                <span>voltar</span>
            </NuxtLink>
        </div>
        <div class="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-20 relative">
            <slot name="header" />
            <slot name="form" />
            <div class="my-6 flex items-center gap-3">
                <div class="h-px flex-1 bg-border" />
                <span class="text-xs text-muted-foreground">OU</span>
                <div class="h-px flex-1 bg-border" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                <button v-for="provider in socialProviders" :key="provider.name" type="button"
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-card py-2.5 text-sm font-medium transition hover:bg-muted"
                    @click="$emit('social-login', provider.name)">
                    <Icon :name="provider.icon" class="text-base" />
                    {{ provider.label }}
                </button>
            </div>
            <slot name="footer" />
        </div>
        <div
            class="hidden flex-col justify-between bg-gradient-to-br from-[hsl(180,40%,20%)] to-[hsl(200,50%,12%)] p-12 text-white lg:flex lg:w-1/2">
            <slot name="hero" />
        </div>
    </div>
</template>

<script setup lang="ts">
// Props
interface Props {
    backTo?: string
}

withDefaults(defineProps<Props>(), {
    backTo: '/'
})

// Social providers configuration
const socialProviders = [
    {
        name: 'google',
        icon: 'simple-icons:google',
        label: 'Continue with Google'
    },
    {
        name: 'apple',
        icon: 'simple-icons:apple',
        label: 'Continue with Apple'
    }
]

defineEmits(['social-login'])
</script>