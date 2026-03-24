<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    systemUrl: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const updateUrl = (value: string) => {
  emit('update:modelValue', { ...props.modelValue, systemUrl: value })
}
</script>

<template>
  <div class="flex flex-col gap-8 py-4">
    <div class="flex flex-col gap-2">
      <h3 class="text-4xl font-black tracking-tight">Final <span class="text-[#00FF88]">Assets</span></h3>
      <p class="text-white/60 max-w-2xl">Upload documentation and technical details for analysis.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div
        class="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-[#00FF88]/50 transition-colors cursor-pointer group bg-[#111111]">
        <div class="p-4 rounded-full bg-[#00FF88]/10 text-[#00FF88] group-hover:scale-110 transition-transform">
          <UIcon name="i-lucide-file-text" class="w-8 h-8" />
        </div>
        <div class="text-center">
          <p class="font-bold">Click to upload or drag & drop</p>
          <p class="text-xs text-white/40">Maximum file size: 25MB (PDF only)</p>
        </div>
      </div>

      <div
        class="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-[#00FF88]/50 transition-colors cursor-pointer group bg-[#111111]">
        <div class="p-4 rounded-full bg-[#00FF88]/10 text-[#00FF88] group-hover:scale-110 transition-transform">
          <UIcon name="i-lucide-video" class="w-8 h-8" />
        </div>
        <div class="text-center">
          <p class="font-bold">Drop your MP4/MOV here</p>
          <p class="text-xs text-white/40">Max duration: 60 seconds</p>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <UFormGroup label="SYSTEM URL" class="text-xs font-bold tracking-widest text-white/30">
        <UInput :model-value="modelValue.systemUrl" @update:model-value="updateUrl($event)"
          placeholder="https://staging.yourproject.com" variant="none"
          class="bg-[#111111] border border-white/5 hover:border-white/20 focus:border-[#00FF88]/50 p-4 rounded-xl text-white font-medium" />
        <template #hint>
          <span class="text-[10px] text-white/30 italic">Provide the staging or live environment link for audit
            access.</span>
        </template>
      </UFormGroup>
    </div>
  </div>
</template>
