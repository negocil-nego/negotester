<template>
    <USelectMenu v-model="modelValue" :items="options" value-key="value" placeholder="Selecione o ciclo de faturação"
        class="w-full" />
</template>

<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import type { BillingCycle } from '~/types';
import { billingCycleMap } from '~/types/select';

const modelValue = defineModel<BillingCycle>()

const options: SelectMenuItem[] = Object.entries(billingCycleMap).map(([value, label]) => ({
    label,
    value: value as BillingCycle
}));
</script>
