<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Category } from '~/types'

const props = defineProps<{ category?: Category }>()
const open = defineModel<boolean>('open', { default: false })

const justClickedNew = ref(false)
const isEditingInternal = ref(false)
const isEditing = computed(() => isEditingInternal.value)

function onOpenNew() {
  justClickedNew.value = true
  open.value = true
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  description: z.string().min(2, 'Descrição muito curta'),
  icon: z.string().min(2, 'Icone muito curto').optional(),
  image: z.instanceof(File)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Arquivo inválido'
    )
    .optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  description: '',
  icon: '',
  image: undefined
})

watch(open, (isOpen) => {
  if (isOpen) {
    if (justClickedNew.value) {
      justClickedNew.value = false
      isEditingInternal.value = false
      Object.assign(state, { name: '', description: '', icon: '', image: undefined })
    } else if (props.category) {
      isEditingInternal.value = true
      Object.assign(state, {
        name: props.category.name,
        description: props.category.description,
        icon: props.category.icon,
        image: undefined
      })
    } else {
      isEditingInternal.value = false
      Object.assign(state, { name: '', description: '', icon: '', image: undefined })
    }
  } else {
    setTimeout(() => {
      isEditingInternal.value = false
    }, 200)
    Object.assign(state, { name: '', description: '', icon: '', image: undefined })
  }
})

const toast = useToast()
const queryClient = useQueryClient()

const { mutate, isPending: loading } = useMutation({
  mutationFn: (newCategory: Schema) => {
    if (isEditing.value && props.category?.id) {
      return $fetch(`/api/categories/${props.category.id}`, {
        method: 'PATCH',
        body: newCategory
      })
    }
    return $fetch('/api/categories', { method: 'POST', body: newCategory })
  },
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    const action = isEditing.value ? 'atualizada' : 'criada'
    toast.add({ title: 'Sucesso', description: `Categoria ${variables.name} ${action}`, color: 'success' })
    open.value = false
    Object.assign(state, { name: '', description: '', icon: '', image: undefined })
  },
  onError: (error: any) => {
    toast.add({ title: 'Erro', description: error.statusMessage || 'Erro ao guardar categoria', color: 'error' })
  }
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  mutate(event.data)
}
</script>

<template>
  <div>
    <UButton v-if="!isEditing" label="Nova categoria" icon="i-lucide-plus" @click="onOpenNew" />
    <UModal v-model:open="open" :title="isEditing ? 'Editar categoria' : 'Nova categoria'"
      :description="isEditing ? 'Atualize os detalhes da categoria' : 'Adicione uma nova categoria ao sistema'">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Imagem" placeholder="Imagem da categoria" name="image">
            <UFileUpload color="neutral" accept="image/*" label="Arrasta e solta a imagem"
              description="SVG, PNG, JPG or GIF (max. 2MB)" class="w-full min-h-25" v-model="state.image" highlight />
          </UFormField>

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Nome" name="name" required>
              <UInput v-model="state.name" placeholder="Nome da categoria" class="w-full" />
            </UFormField>

            <UFormField label="Icone" name="icon">
              <!-- <CoreInputIcon v-model="state.icon" /> -->
              <UInput v-model="state.icon" placeholder="Icone da categoria" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Descrição" name="description" required>
            <UTextarea v-model="state.description" :rows="3" placeholder="Descrição da categoria" class="w-full" />
          </UFormField>

          <div class="flex justify-end gap-2 pt-2">
            <UButton label="Cancelar" color="neutral" variant="subtle" @click="open = false" />
            <UButton :label="isEditing ? 'Guardar' : 'Criar'" color="primary" variant="solid" type="submit"
              :loading="loading" />
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>
