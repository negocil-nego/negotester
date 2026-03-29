<script setup lang="ts">
import type { PlanServiceResponse } from '~/types/response'

defineProps<{
  modelValue: PlanServiceResponse
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-8 py-4 w-full">
    <HomepagePlan :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" />
  </div>
</template>
