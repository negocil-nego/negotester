<template>
    <USelectMenu v-model="modelValue" :items="options" value-key="value" placeholder="Selecione o tipo de serviço"
        class="w-full" />
</template>

<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import type { PlanType } from '~/types';
import { planTypeMap } from '~/types/select';

const modelValue = defineModel<PlanType>()

const options: SelectMenuItem[] = Object.entries(planTypeMap).map(([value, label]) => ({
    label,
    value: value as PlanType
}));
</script>
