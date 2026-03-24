<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const open = ref(false);
const activeStep = ref(0);

const items = ref<StepperItem[]>([
  {
    title: 'PLANO',
    icon: 'i-lucide-credit-card',
    slot: 'plan'
  },
  {
    title: 'ESCOPO',
    icon: 'i-lucide-layers',
    slot: 'scope'
  },
  {
    title: 'USUÁRIO',
    icon: 'i-lucide-user',
    slot: 'user'
  },
  {
    title: 'ASSETS',
    icon: 'i-lucide-file-up',
    slot: 'assets'
  }
])

const form = reactive({
  plan: 'basico',
  scope: [] as string[],
  userInfo: {
    fullName: '',
    email: '',
    phone: '',
    organization: ''
  },
  assets: {
    systemUrl: ''
  }
})

const nextStep = () => {
  if (activeStep.value < items.value.length - 1) {
    activeStep.value++
  } else {
    console.log('Form submitted:', form)
    open.value = false
  }
}

const prevStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--
  }
}
</script>

<template>
  <div class="flex justify-center">
    <UButton color="primary" variant="solid"
      class="px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform" @click="open = true">
      Quero solicitar um orçamento
    </UButton>

    <UModal v-model:open="open" title="Proposta de Orçamento"
      description="Preencha os campos abaixo para solicitar um orçamento" fullscreen :ui="{
        content: 'bg-[#0A0A0A] text-white',
        header: 'border-b border-white/10 p-6',
        body: 'p-0 flex flex-col h-full overflow-hidden'
      }">
      <template #body>
        <div class="flex flex-col h-full bg-[#0A0A0A]">
          <div class="py-6 px-4 md:px-20 border-b border-white/5 bg-[#0D0D0D]">
            <UStepper :items="items" class="w-full" />
          </div>

          <div class="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
            <div class="mx-auto w-full h-full flex flex-col">
              <transition name="fade" mode="out-in">
                <div :key="activeStep" class="flex-1">
                  <HomepageProposalStepPlan v-if="activeStep === 0" v-model="form.plan" />
                  <HomepageProposalStepScope v-if="activeStep === 1" v-model="form.scope" />
                  <HomepageProposalStepUser v-if="activeStep === 2" v-model="form.userInfo" />
                  <HomepageProposalStepAssets v-if="activeStep === 3" v-model="form.assets" />
                </div>
              </transition>
            </div>
          </div>

          <div class="p-6 md:px-10 border-t border-white/5 bg-[#0D0D0D] flex justify-between items-center">
            <UButton v-if="activeStep > 0" color="neutral" variant="ghost" icon="i-lucide-chevron-left"
              @click="prevStep" class="hover:bg-white/5 text-white/60">
              Anterior
            </UButton>
            <div v-else />

            <div class="flex items-center gap-6">
              <span v-if="activeStep === 1" class="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                {{ form.scope.length }} items SELECTED
              </span>
              <UButton trailing-icon="i-lucide-chevron-right"
                class="bg-[#00FF88] hover:bg-[#00DDAA] text-black font-bold px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(0,255,136,0.3)] transition-all active:scale-95"
                @click="nextStep">
                {{ activeStep === items.length - 1 ? 'FINALIZAR' : 'Continuar' }}
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
