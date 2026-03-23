<template>
    <USelectMenu v-model="modelValue" :items="options" value-key="value" placeholder="Selecione o tipo de serviço"
        class="w-full" />
</template>

<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import type { ServiceType } from '~/types';

const modelValue = defineModel<ServiceType>()

const options: SelectMenuItem[] = [
    { label: 'Gratuito', value: 'FREE' },
    { label: 'Fixo', value: 'FIXED' },
    { label: 'Personalizado', value: 'CUSTOMIZE' }
]
</script>
