<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const scopeOptions = [
  {
    id: 'ux-ui',
    name: 'UX/UI Audit',
    description: 'Comprehensive heuristic evaluation and user flow validation by senior designers.',
    icon: 'i-lucide-eye'
  },
  {
    id: 'accessibility',
    name: 'Digital Accessibility',
    description: 'WCAG 2.1 compliance testing using screen readers and manual keyboard navigation.',
    icon: 'i-lucide-accessibility'
  },
  {
    id: 'location',
    name: 'Location & Language',
    description: 'Localization testing ensuring cultural relevance and linguistic precision globally.',
    icon: 'i-lucide-languages'
  },
  {
    id: 'mobile',
    name: 'Mobile Usability',
    description: 'Real-device testing across iOS and Android ecosystems for seamless performance.',
    icon: 'i-lucide-smartphone'
  }
]

const toggleScope = (id: string) => {
  const newScope = [...props.modelValue]
  const index = newScope.indexOf(id)
  if (index === -1) {
    newScope.push(id)
  } else {
    newScope.splice(index, 1)
  }
  emit('update:modelValue', newScope)
}
</script>

<template>
  <div class="flex flex-col gap-8 py-4">
    <div class="flex flex-col gap-2">
      <h3 class="text-4xl font-black tracking-tight">Define <span class="text-[#00FF88]">Scope</span></h3>
      <p class="text-white/60 max-w-2xl">Select the specialized QA services required for your digital ecosystem. Multiple selections are permitted for full coverage.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div
        v-for="option in scopeOptions"
        :key="option.id"
        @click="toggleScope(option.id)"
        class="p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-6"
        :class="[
          modelValue.includes(option.id)
            ? 'bg-[#121212] border-[#00FF88] shadow-[0_0_20px_rgba(0,255,136,0.1)] scale-[1.01]'
            : 'bg-[#111111] border-white/5 hover:border-white/20'
        ]"
      >
        <div class="flex justify-between items-start">
          <div class="p-4 rounded-xl bg-[#00FF88]/10 text-[#00FF88]">
            <UIcon :name="option.icon" class="w-8 h-8" />
          </div>
          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
            :class="modelValue.includes(option.id) ? 'bg-[#00FF88] border-[#00FF88]' : 'border-white/20'"
          >
            <UIcon v-if="modelValue.includes(option.id)" name="i-lucide-check" class="w-4 h-4 text-black" />
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
