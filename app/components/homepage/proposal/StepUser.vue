<script setup lang="ts">
import { z } from 'zod'
import { useProposalStore } from '~/stores/useProposalStore'

const proposalStore = useProposalStore()

const schema = z.object({
  fullName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.email('Introduza um e-mail válido'),
  phone: z.string().optional(),
  organization: z.string().min(2, 'O nome da organização é obrigatório').optional().or(z.literal('')),
  description: z.string().optional()
})
</script>

<template>
  <div class="flex flex-col gap-6 w-full max-w-4xl mx-auto py-2">
    <div class="flex flex-col gap-1.5 border-b border-white/10 pb-4">
      <h3 class="text-3xl md:text-4xl font-black tracking-tight text-white">
        Representante da <span class="text-[#00FF88]">Auditoria</span>
      </h3>
      <p class="text-white/60 text-sm md:text-base">
        Quem será o contacto principal para esta auditoria de precisão?
      </p>
    </div>

    <UForm :schema="schema" :state="proposalStore.userInfo" class="pt-2 space-y-6 w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <UFormField name="fullName" class="w-full flex flex-col gap-1">
          <template #label>
            <span class="text-xs font-bold uppercase tracking-widest text-white/70">Nome Completo</span>
          </template>
          <UInput v-model="proposalStore.userInfo.fullName" icon="i-heroicons-user" placeholder="Ex: João Silva"
            size="xl" class="w-full"
            :ui="{ base: 'w-full bg-[#111111] border-white/5 focus:ring-[#00FF88] transition-colors' }" />
        </UFormField>

        <UFormField name="organization" class="w-full flex flex-col gap-1">
          <template #label>
            <span class="text-xs font-bold uppercase tracking-widest text-white/70">Organização</span>
          </template>
          <UInput v-model="proposalStore.userInfo.organization" icon="i-heroicons-building-office"
            placeholder="Empresa Exemplo" size="xl" class="w-full"
            :ui="{ base: 'w-full bg-[#111111] border-white/5 focus:ring-[#00FF88] transition-colors' }" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <UFormField name="email" class="w-full flex flex-col gap-1">
          <template #label>
            <span class="text-xs font-bold uppercase tracking-widest text-white/70">E-mail Corporativo</span>
          </template>
          <UInput v-model="proposalStore.userInfo.email" type="email" icon="i-heroicons-envelope"
            placeholder="joao@empresa.com" size="xl" class="w-full"
            :ui="{ base: 'w-full bg-[#111111] border-white/5 focus:ring-[#00FF88] transition-colors' }" />
        </UFormField>

        <UFormField name="phone" class="w-full flex flex-col gap-1">
          <template #label>
            <span class="text-xs font-bold uppercase tracking-widest text-white/70">Telefone</span>
          </template>
          <UInput v-model="proposalStore.userInfo.phone" type="tel" icon="i-heroicons-phone"
            placeholder="+244 900 000 000" size="xl" class="w-full"
            :ui="{ base: 'w-full bg-[#111111] border-white/5 focus:ring-[#00FF88] transition-colors' }" />
        </UFormField>
      </div>

      <UFormField name="description" class="w-full flex flex-col gap-1">
        <template #label>
          <span class="text-xs font-bold uppercase tracking-widest text-white/70">Descrição / Necessidades</span>
        </template>
        <UTextarea v-model="proposalStore.userInfo.description"
          placeholder="Conte-nos brevemente as principais expectativas, desafios ou detalhes adicionais..." :rows="3"
          size="xl" class="w-full"
          :ui="{ base: 'w-full bg-[#111111] border-white/5 focus:ring-[#00FF88] transition-colors' }" />
      </UFormField>
    </UForm>

    <div class="mt-2 p-4 rounded-xl bg-[#00FF88]/5 border border-[#00FF88]/20 flex items-center gap-4">
      <div class="p-2 rounded-lg bg-[#00FF88]/10 text-[#00FF88] shrink-0">
        <UIcon name="i-lucide-bell" class="w-5 h-5" />
      </div>
      <div class="flex flex-col">
        <p class="font-bold text-[#00FF88] text-sm">Estado da Auditoria em Tempo Real</p>
        <p class="text-xs text-white/60 mt-0.5 leading-relaxed">
          Ao fornecer estes dados, concorda em ser notificado(a) sobre atualizações urgentes de QA por email/telefone.
        </p>
      </div>
    </div>
  </div>
</template>