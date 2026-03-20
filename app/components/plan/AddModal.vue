<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { BillingCycle, Plan } from '~/types'
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const props = defineProps<{ plan?: Plan }>()

const schema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  price: z.number().min(0, 'O preço não pode ser negativo'),
  description: z.string().min(5, 'Adicione uma descrição detalhada'),
  billingCycle: z.enum(['DAY', 'MONTH', 'YEAR', 'NONE'] as BillingCycle[])
})

type Schema = z.output<typeof schema>

const open = defineModel<boolean>('open', { default: false })
const isEditing = computed(() => !!props.plan)

const state = reactive({
  name: '',
  price: 0,
  description: '',
  billingCycle: 'NONE' as BillingCycle
})

watch(open, (isOpen) => {
  if (isOpen) {
    if (props.plan) {
      Object.assign(state, {
        name: props.plan.name,
        price: props.plan.price,
        description: props.plan.description,
        billingCycle: props.plan.billingCycle
      })
    } else {
      Object.assign(state, { name: '', price: 0, description: '', billingCycle: 'NONE' })
    }
  } else {
    Object.assign(state, { name: '', price: 0, description: '', billingCycle: 'NONE' })
  }
})

const toast = useToast()
const queryClient = useQueryClient()

const { mutate, isPending: loading } = useMutation({
  mutationFn: (newPlan: Schema) => {
    if (isEditing.value && props.plan?.id) {
      return $fetch(`/api/plans/${props.plan.id}`, { method: 'PATCH', body: newPlan })
    }
    return $fetch('/api/plans', { method: 'POST', body: newPlan })
  },
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({ queryKey: ['plans'] })

    const action = isEditing.value ? 'atualizado' : 'criado'

    toast.add({ title: 'Sucesso', description: `Plano ${variables.name} ${action}`, color: 'success' })

    open.value = false

    Object.assign(state, { name: '', price: 0, description: '', billingCycle: 'NONE' })
  },
  onError: (error: any) => {
    toast.add({ title: 'Erro', description: error.statusMessage || 'Erro ao criar plano', color: 'error' })
  }
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  mutate(event.data)
}
</script>

<template>
  <div>
    <UButton v-if="!isEditing" label="Novo Plano" icon="i-lucide-plus" @click="open = true" />

    <UModal v-model:open="open" :title="isEditing ? 'Editar Plano de Serviço' : 'Novo Plano de Serviço'"
      :description="isEditing ? 'Atualize os detalhes do plano' : 'Configure os detalhes do preço e faturação'">
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
            <UButton :label="isEditing ? 'Guardar' : 'Criar Plano'" color="primary" variant="solid" type="submit"
              :loading="loading" />
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
