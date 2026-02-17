<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  description: z.string().min(2, 'Descrição muito curta')
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  description: ''
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: `New customer ${event.data.name} added`, color: 'success' })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Nova categoria" description="Adicione uma nova categoria ao sistema">
    <UButton label="Nova categoria" icon="i-lucide-plus" />

    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Nome" placeholder="Nome da categoria" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Descrição" placeholder="Descrição da categoria" name="description">
          <UTextarea v-model="state.description" :rows="5" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton label="Cancelar" color="neutral" variant="subtle" @click="open = false" />
          <UButton label="Criar" color="primary" variant="solid" type="submit" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
