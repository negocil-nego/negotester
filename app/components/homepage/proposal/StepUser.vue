<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    fullName: string
    email: string
    phone: string
    organization: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const updateField = (field: string, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
  <div class="flex flex-col gap-8 py-4">
    <div class="flex flex-col gap-2">
      <h3 class="text-4xl font-black tracking-tight">Audit <span class="text-[#00FF88]">Representative</span></h3>
      <p class="text-white/60 max-w-2xl">Who will be the primary contact for this precision audit?</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mt-8">
      <UFormGroup label="FULL IDENTITY" class="text-xs font-bold tracking-widest text-white/30">
        <UInput
          :model-value="modelValue.fullName"
          @update:model-value="updateField('fullName', $event)"
          placeholder="e.g. Alexander Vance"
          variant="none"
          class="bg-[#111111] border border-white/5 hover:border-white/20 focus:border-[#00FF88]/50 p-4 rounded-xl text-white font-medium"
        />
      </UFormGroup>
      <UFormGroup label="CORPORATE EMAIL" class="text-xs font-bold tracking-widest text-white/30">
        <UInput
          :model-value="modelValue.email"
          @update:model-value="updateField('email', $event)"
          placeholder="vance@digitalauditor.com"
          variant="none"
          class="bg-[#111111] border border-white/5 hover:border-white/20 focus:border-[#00FF88]/50 p-4 rounded-xl text-white font-medium"
        />
      </UFormGroup>
      <UFormGroup label="DIRECT LINE" class="text-xs font-bold tracking-widest text-white/30">
        <UInput
          :model-value="modelValue.phone"
          @update:model-value="updateField('phone', $event)"
          placeholder="+1 (555) 000-0000"
          variant="none"
          class="bg-[#111111] border border-white/5 hover:border-white/20 focus:border-[#00FF88]/50 p-4 rounded-xl text-white font-medium"
        />
      </UFormGroup>
      <UFormGroup label="ORGANIZATION" class="text-xs font-bold tracking-widest text-white/30">
        <UInput
          :model-value="modelValue.organization"
          @update:model-value="updateField('organization', $event)"
          placeholder="Global Editorial Tech"
          variant="none"
          class="bg-[#111111] border border-white/5 hover:border-white/20 focus:border-[#00FF88]/50 p-4 rounded-xl text-white font-medium"
        />
      </UFormGroup>
    </div>

    <div class="mt-8 p-6 rounded-2xl bg-[#00FF88]/5 border border-[#00FF88]/10 flex items-start gap-4">
      <div class="p-3 rounded-xl bg-[#00FF88]/10 text-[#00FF88]">
        <UIcon name="i-lucide-bell" class="w-6 h-6" />
      </div>
      <div class="flex flex-col gap-1">
        <p class="font-bold text-[#00FF88]">Real-time Audit Status</p>
        <p class="text-sm text-white/60">By providing these details, you agree to receive critical QA milestone alerts via your corporate email and direct line.</p>
      </div>
    </div>
  </div>
</template>
