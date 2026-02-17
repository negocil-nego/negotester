<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  description: z.string().min(2, 'Descrição muito curta'),
  icon: z.string().min(2, 'Icone muito curto').optional(),
  image: z.instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Arquivo inválido'
    )
    .optional(),
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  description: '',
  image: undefined
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
        <UFormField label="Imagem" placeholder="Imagem da categoria" name="image">
          <UFileUpload color="neutral" accept="image/*" label="Arrasta e solta a imagem"
            description="SVG, PNG, JPG or GIF (max. 2MB)" class="w-full min-h-25" highlight v-model="state.image" />
        </UFormField>
        <UFormField label="Nome" placeholder="Nome da categoria" name="name" required>
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Icone" placeholder="Icone da categoria" name="icon">
          <!-- <UInput v-model="state.icon" class="w-full" /> -->
          <CoreInputIcon />
        </UFormField>
        <UFormField label="Descrição" placeholder="Descrição da categoria" name="description" required>
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
