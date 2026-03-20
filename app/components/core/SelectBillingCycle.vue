<template>
    <USelectMenu v-model="modelValue" :items="options" value-key="value" placeholder="Selecione o ciclo de faturação"
        class="w-full" />
</template>

<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import type { BillingCycle } from '~/types';

const modelValue = defineModel<BillingCycle>()

const options: SelectMenuItem[] = [
    { label: 'Nenhum', value: 'NONE' },
    { label: 'Diário', value: 'DAY' },
    { label: 'Mensal', value: 'MONTH' },
    { label: 'Anual', value: 'YEAR' }
]
</script>
