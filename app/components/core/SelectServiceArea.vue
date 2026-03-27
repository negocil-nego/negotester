<template>
    <USelectMenu v-model="modelValue" :items="options" value-key="value" placeholder="Selecione a área de atuação"
        class="w-full" />
</template>

<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'
import type { ServiceArea } from '~/types';
import { serviceAreaOptions } from '~/types/select';

const modelValue = defineModel<ServiceArea>()

const options: SelectMenuItem[] = Object.entries(serviceAreaOptions).map(([value, label]) => ({
    label,
    value: value as ServiceArea
}));
</script>
