<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { Service } from '~/types';

const props = defineProps<{
  modelValue: Service[]
}>()

const emit = defineEmits(['update:modelValue'])

const { data, isPending: pending } = useQuery({
  queryKey: ['services'],
  queryFn: () => $fetch<Service[]>('/api/services/proposal')
})

const searchQuery = ref('')

const filteredData = computed(() => {
  if (!data.value) return []
  if (!searchQuery.value) return data.value

  const query = searchQuery.value.toLowerCase()
  return data.value.filter(service =>
    service.name?.toLowerCase().includes(query)
    || service.description?.toLowerCase().includes(query)
  )
})

const toggleScope = (service: Service) => {
  const newScope = [...props.modelValue]
  const index = newScope.findIndex(s => s.uuid === service.uuid)
  if (index === -1) {
    newScope.push(service)
  } else {
    newScope.splice(index, 1)
  }
  emit('update:modelValue', newScope)
}
</script>

<template>
  <div class="flex flex-col gap-8 py-4">
    <div class="flex flex-col gap-2">
      <h3 class="text-4xl font-black tracking-tight">
        Definir <span class="text-[#00FF88]">Escopo</span>
      </h3>
      <p class="text-white/60 max-w-2xl">
        Selecione os serviços especializados de QA necessários para o seu ecossistema digital.
        É permitido selecionar várias opções para uma cobertura completa.
      </p>
    </div>
    <div class="w-full">
      <UInput v-model="searchQuery" icon="i-heroicons-magnifying-glass"
        placeholder="Pesquisar serviços por nome ou descrição..." size="xl" />
    </div>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div v-for="i in 4" :key="i"
        class="p-8 rounded-2xl border bg-[#111111] border-white/5 flex flex-col gap-6 animate-pulse">
        <div class="flex justify-between items-start">
          <div class="w-16 h-16 rounded-xl bg-white/5" />
          <div class="w-6 h-6 rounded-full border-2 border-white/10" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="h-6 bg-white/5 rounded w-1/2" />
          <div class="h-4 bg-white/5 rounded w-3/4 mt-2" />
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div v-if="filteredData.length === 0" class="col-span-1 md:col-span-2 text-center text-white/40 py-8">
        Nenhum serviço encontrado para "{{ searchQuery }}"
      </div>
      <div v-for="option in filteredData" :key="option.uuid" @click="toggleScope(option)"
        class="p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-6" :class="[
          modelValue.some(s => s.uuid === option.uuid)
            ? 'bg-[#121212] border-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.1)] scale-[1.01]'
            : 'bg-[#111111] border-white/5 hover:border-white/20'
        ]">
        <div class="flex justify-between items-start">
          <div class="p-4 rounded-xl bg-[#00FF88]/10 text-[#00FF88]">
            <UIcon :name="option.icon || 'i-lucide-check-circle'" class="w-8 h-8" />
          </div>
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
            :class="modelValue.some(s => s.uuid === option.uuid) ? 'bg-[#00FF88] border-[#00FF88]' : 'border-white/20'">
            <UIcon v-if="modelValue.some(s => s.uuid === option.uuid)" name="i-lucide-check" class="w-4 h-4 text-black" />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h4 class="text-xl font-bold">{{ option.name }}</h4>
          <p class="text-sm text-white/40 leading-relaxed">{{ option.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>