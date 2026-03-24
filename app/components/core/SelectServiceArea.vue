<template>
    <USelectMenu v-model="modelValue" :items="options" value-key="value" placeholder="Selecione a área de atuação"
        class="w-full" />
</template>

<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import type { ServiceArea } from '~/types';

const modelValue = defineModel<ServiceArea>()

const options: SelectMenuItem[] = [
    { label: 'Geral', value: 'GENERAL' },
    { label: 'Proposta', value: 'PROPOSAL' },
]
</script>
