<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { BillingCycle } from '~/types'

const schema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  price: z.number().min(0, 'O preço não pode ser negativo'),
  description: z.string().min(5, 'Adicione uma descrição detalhada'),
  billingCycle: z.enum(['DAY', 'MONTH', 'YEAR', 'NONE'] as BillingCycle[])
})

type Schema = z.output<typeof schema>

const open = ref(false)

const state = reactive({
  name: '',
  price: 0,
  description: '',
  billingCycle: 'NONE' as BillingCycle
})

const toast = useToast()
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/plans', {
      method: 'POST',
      body: event.data
    })

    toast.add({ title: 'Sucesso', description: `Plano ${event.data.name} criado`, color: 'success' })
    open.value = false

    Object.assign(state, { name: '', price: 0, description: '', billingCycle: 'NONE' })
  } catch (error: any) {
    toast.add({ title: 'Erro', description: error.statusMessage, color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <UButton label="Novo Plano" icon="i-lucide-plus" @click="open = true" />

    <UModal v-model:open="open" title="Novo Plano de Serviço" description="Configure os detalhes do preço e faturação">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Nome do Plano" name="name" required>
            <UInput v-model="state.name" placeholder="Ex: Premium Mensal" class="w-full" />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Preço" name="price" required>
              <UInput v-model.number="state.price" type="number" icon="i-lucide-banknote" class="w-full" />
            </UFormField>

            <UFormField label="Ciclo de Faturação" name="billingCycle" required>
              <CoreSelectBillingCycle v-model="state.billingCycle" />
            </UFormField>
          </div>

          <UFormField label="Descrição do Plano" name="description" required>
            <UTextarea v-model="state.description" :rows="4" placeholder="O que este plano inclui?" class="w-full" />
          </UFormField>

          <div class="flex justify-end gap-2 pt-4">
            <UButton label="Cancelar" color="neutral" variant="subtle" @click="open = false" />
            <UButton label="Criar Plano" color="primary" variant="solid" type="submit" :loading="loading" />
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
